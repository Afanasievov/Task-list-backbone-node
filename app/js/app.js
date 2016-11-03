'use strict';

define([
    'gapi',
    'views/app',
    'views/auth'
  ],

  function(ApiManager, AppView, AuthView) {

    const App = function() {
      this.views.app = new AppView();
      this.views.app.render();

      this.views.auth = new AuthView(this);
      this.views.auth.render();

      this.connectGapi();
    };

    App.prototype = {
      views: {},

      connectGapi: function() {
        this.ApiManager = new ApiManager(this);
      }
    };

    return App;
  });
