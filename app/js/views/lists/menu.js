'use strict';

define(['views/lists/menuitem'], function(ListMenuItemView) {
  const ListMenuView = Backbone.View.extend({
    el: '.left-nav',
    tagName: 'ul',
    className: 'nav nav-list lists-nav',

    events: {},

    initialize: function() {
      this.collection.on('add', this.renderMenuItem, this);
    },

    renderMenuItem: function(list) {
      const listView = new ListMenuItemView({ model: list });
      console.log(listView);
      $(this.el).append(listView.render().el);
    }
  });

  return ListMenuView;
});
