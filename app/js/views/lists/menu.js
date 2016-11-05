'use strict';

define(['views/lists/menuitem'], function(ListMenuItemView) {
  const ListMenuView = Backbone.View.extend({
    el: '.left-nav',
    tagName: 'ul',
    className: 'nav nav-list lists-nav',

    events: {},

    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.renderMenuItem, this);
    },

    render: function() {
      this.collection.each(model => this.renderMenuItem(model));
    },

    renderMenuItem: function(listModel) {
      const listView = new ListMenuItemView({ model: listModel });
      $(this.el).append(listView.render().el);
      bTask.models.activeList = listModel;      
    }
  });

  return ListMenuView;
});
