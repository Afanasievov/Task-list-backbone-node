'use strict';

define(['config'], function(config) {
  let app = null;

  function ApiManager(_app) {
    app = _app;
    this.loadGapi();
  }

  _.extend(ApiManager.prototype, Backbone.Events);

  ApiManager.prototype.init = function() {

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

  Backbone.sync = (method, model, options) => {
    // options || (options = {});

    switch (method) {
      case 'create':
        break;

      case 'update':
        break;

      case 'delete':
        break;

      case 'read':
        break;
    }
  };

  return ApiManager;
});
