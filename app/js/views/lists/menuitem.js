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

      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    open: function() {
      if (bTask.views.activeList) {
        bTask.views.activeList.$el.removeClass('active');
      }

      bTask.views.activeList = this;
      this.$el.addClass('active');
      return false;
    }
  });

  return ListMenuItemView;
});
