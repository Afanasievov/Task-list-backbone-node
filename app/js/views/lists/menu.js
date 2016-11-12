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
      bTask.views.listMenuItems = [];
      return new Promise(resolve => {
        resolve(this.collection.each(model => this.renderMenuItem(model)));
      }).then(() => {
        bTask.views.activeList.$el.removeClass('active');
        bTask.views.activeList = bTask.views.listMenuItems[0];
        bTask.views.activeList.open();
      });
    },

    renderMenuItem: function(listModel) {
      const listView = new ListMenuItemView({ model: listModel });
      $(this.el).append(listView.render().el);
      bTask.views.listMenuItems.push(listView);
      listView.open();
    }
  });

  return ListMenuView;
});
