'use strict';

define([
    'gapi'
  ],
  function(ApiManager) {
    const App = function() {
      this.connectGapi();
    };

    App.prototype = {
      connectGapi: function() {
        this.ApiManager = new ApiManager();
      }
    };

    return App;
  });
