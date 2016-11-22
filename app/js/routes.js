'use strict';

define(function() {
  return Backbone.Router.extend({
    routes: {
      'lists/:id': 'openList'
    },

    openList: (id) => {
      if (bTask.collections.lists && bTask.collections.lists.length) {
        const list = bTask.collections.lists.get(id);
        if (list) {
          list.trigger('select');
        } else {
          console.error('List not found:', id);
        }
      }
    }
  });
});
