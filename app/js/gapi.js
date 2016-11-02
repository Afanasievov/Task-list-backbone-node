'use strict';

define(['config'], function(config) {
  function ApiManager() {
    this.loadGapi();
  }

  _.extend(ApiManager.prototype, Backbone.Events);

  ApiManager.prototype.init = () => {

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
    console.log(authResult);
  }

  handleClientLoad();
};

ApiManager.prototype.loadGapi = function () {
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
  options || (options = {});

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
