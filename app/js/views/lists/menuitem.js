'use strict';

define([
  'text!templates/lists/menuitem.html',
  'views/tasks/index'
], function(template, TaskIndexView) {
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

      // Render the tasks
      if (bTask.views.tasksIndexView) {
        bTask.views.tasksIndexView.remove();
      }

      bTask.views.tasksIndexView = new TaskIndexView({
        collection: bTask.collections.tasks,
        model: this.model
      });
      bTask.views.app.$el
        .find('#tasks-container')
        .html(bTask.views.tasksIndexView.render().el);
      return false;
    }
  });

  return ListMenuItemView;
});
