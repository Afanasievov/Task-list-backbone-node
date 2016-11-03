'use strict';

define([
    'gapi',
    'views/app',
    'views/auth',
    'collections/tasklists'
  ],

  function(ApiManager, AppView, AuthView, TaskLists) {

    const App = function() {
      this.views.app = new AppView();
      this.views.app.render();

      this.views.auth = new AuthView(this);
      this.views.auth.render();

      this.collections.lists = new TaskLists();

      this.connectGapi();
    };

    App.prototype = {
      views: {},
      collections: {},

      connectGapi: function() {
        const self = this;
        this.ApiManager = new ApiManager(this);
        this.ApiManager.on('ready', function() {
          self.collections.lists.fetch({
            data: { userId: '@me' },
            success: function(res) {
              res.models.forEach((model) => console.log(model.get('title')));
            },
            error: function(err) {
              console.error('Collection fetch error:', err);
            }
          });
        });
      }
    };

    return App;
  });
