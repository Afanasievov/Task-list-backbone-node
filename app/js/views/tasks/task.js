'use strict';

define(['text!templates/tasks/task.html'], function(template) {
  const TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'controls well task row',

    template: _.template(template),

    events: {
      'click': 'open',
      'change .check-task': 'toggle'
    },

    initialize: function(options) {
      console.log(this.model);
      this.parentView = options.parentView;
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function(e) {
      const $el = $(this.el);
      $el.data('taskEtag', this.model.get('etag'));
      $el.html(this.template(this.model.toJSON()));
      $el.find('.chech-task')
      .attr('checked', this.model.get('status') === 'completed');
      return this;
    },

    open: function() {
      if (this.parentView.activeTaskView) {
        this.parentView.activeTaskView.close();
      }
      this.$el.addClass('active');
      this.parentView.activeTaskView = this;
      this.parentView.editTask(this.model);
    },

    close: function(e) {
      this.$el.removeClass('active');
    },

    toggle: function() {
      const id = this.model.get('id');
      const $el = this.$el.find('.check-task');
      const isCompleted = this.model.get('completed');

      this.model.set('status', isCompleted ? 'needsAction' : 'completed');
      if (this.model.get('status') === 'needsAction') {
        this.model.set('completed', null);
      }

      this.model.save();
      return false;
    }
  });

  return TaskView;
});
