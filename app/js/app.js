'use strict';

define([
    'gapi',
    'views/app',
    'views/auth',
    'views/lists/menu',
    'collections/tasklists'
  ],

  function(ApiManager, AppView, AuthView, ListMenuView, TaskLists) {

    const App = function() {
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
        const self = this;
        this.ApiManager = new ApiManager(this);
        this.ApiManager.on('ready', function() {
          self.collections.lists.fetch({ add: false, reset: true,
            // data: { userId: '@me' },
            success: (res) => {
            },
            error: function(err) {
              // TODO show error message
              console.error('Collection fetch error:', err);
            }
          });
        });
      }
    };

    return App;
  });
