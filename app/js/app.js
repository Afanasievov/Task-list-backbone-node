'use strict';

define([
    'gapi',
    'routes',
    'views/app',
    'views/auth',
    'views/lists/menu',
    'collections/tasklists'
  ],

  (ApiManager, Routes, AppView, AuthView, ListMenuView, TaskLists) => {

    const App = function() {
      this.routes = new Routes();
      this.views.app = new AppView();
      this.views.app.render();

      this.views.auth = new AuthView(this);
      this.views.auth.render();

      this.collections.lists = new TaskLists();
      this.views.listMenu = new ListMenuView({
        collection: this.collections.lists
      });

      this.connectGapi();
    };

    App.prototype = {
      views: {},
      collections: {},

      connectGapi: function() {
        this.ApiManager = new ApiManager(this);
        this.ApiManager.on('ready', () => {
          this.collections.lists.fetch({ add: false, reset: true,
            success: (res) => {
              Backbone.history.start();
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
