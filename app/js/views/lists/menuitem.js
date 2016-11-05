'use strict';

define(['text!templates/lists/menuitem.html'], function(template) {
  const ListMenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-menu-item',

    template: _.template(template),

    events: {
      'click': 'open'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      let $el = $(this.el);

      // TODO remove $el.data... if it's unnecessary
      // $el.data('listId', this.model.get('id'));
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    open: function() {
      bTask.models.activeList = this.model;
      return false;
    }
  });

  return ListMenuItemView;
});
