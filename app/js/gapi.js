'use strict';

define(['config'], function(config) {
    let app = null;

    function ApiManager(_app) {
        app = _app;
        this.loadGapi();
    }

    _.extend(ApiManager.prototype, Backbone.Events);

    ApiManager.prototype.init = function() {
        const self = this;

        gapi.client.load('tasks', 'v1', () => {});

        function handleClientLoad() {
            return new Promise((resolve) => resolve(gapi.client.setApiKey))
                .then(() => checkAuth());
        }

        function checkAuth() {
            gapi.auth.authorize({
                    client_id: config.clientId,
                    scope: config.scopes,
                    immediate: true
                },
                handleAuthResult
            );
        }

        function handleAuthResult(authResult) {
            let authTimeout = null;

            if (authResult && !authResult.error) {
                if (authResult.expires_in) {
                    authTimeout = (authResult.expires_in - 5 * 60) * 1000;
                    setTimeout(checkAuth, authTimeout);
                }

                app.views.auth.$el.hide();
                $('#signed-in-container').show();
                self.trigger('ready');
            } else {
                if (authResult && authResult.error) {
                    // TODO: show error
                    console.error('Unable to sign in:', authResult.error);
                }

                app.views.auth.$el.show();
            }
        }

        this.checkAuth = function() {
            gapi.auth.authorize({
                    client_id: config.client_id,
                    scope: config.scopes,
                    immediate: false
                },
                handleAuthResult);
        };

        handleClientLoad();
    };

    ApiManager.prototype.loadGapi = function() {
        const self = this;

        if (typeof gapi !== 'undefined') {
            return this.init();
        }

        require(['https://apis.google.com/js/client.js?onload=define'],
            () => {
                function checkGAPI() {
                    if (gapi && gapi.client) {
                        self.init();
                    } else {
                        setTimeout(checkGAPI, 100);
                    }
                }

                checkGAPI();
            });
    };

    Backbone.sync = (method, model, options = {}) => {
        let requestContent = {};
        let request = null;

        console.log('request', request);
        console.log('method', method);
        console.log('model', model);

        if (method !== 'create') {
            if (model.url === 'tasks') {
                requestContent.task = model.get('id');

            } else if (model.url === 'tasklists') {
                requestContent.tasklist = model.get('id');
            }
        }


        switch (method) {
            case 'create':
                requestContent.resource = model.toJSON();
                requestContent.tasklist = bTask.views.activeList.model.get('id');
                request = gapi.client.tasks[model.url].insert(requestContent);
                Backbone.gapiRequest(request, method, model, options);
                break;

            case 'update':
                requestContent.resource = model.toJSON();
                request = gapi.client.tasks[model.url].update(requestContent);
                Backbone.gapiRequest(request, method, model, options);
                break;

            case 'delete':
                request = gapi.client.tasks[model.url].delete(requestContent);
                Backbone.gapiRequest(request, method, model, options);
                break;

            case 'read':
                request = gapi.client.tasks[model.url].list(options.data);
                Backbone.gapiRequest(request, method, model, options);
                break;
        }
    };

    Backbone.gapiRequest = function(request, method, model, options) {
        let result = null;

        request.execute((res) => {
            if (res.error) {
                if (options.error) {
                    options.error(res);
                }
            } else if (options.success) {
                result = res.items ? res.items : res;
            }
            options.success(result, true, request);
        });
    };

    return ApiManager;
});
