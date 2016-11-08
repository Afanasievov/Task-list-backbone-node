'use strict';

define(['text!templates/tasks/task.html'], function(template) {
  const TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'controls well task row',

    template: _.template(template),

    events: {
      'click': 'open'
    },

    initialize: function(options) {
      this.parentView = options.parentView;
    },

    render: function(e) {
      const $el = $(this.el);
      $el.data('taskEtag', this.model.get('etag'));
      $el.html(this.template(this.model.toJSON()));
      $el.find('.chech-task')
      .attr('checked', this.model.get('status') === 'completed');
      return this;
    },

    open: function(e) {
      if (this.parentView.activeTaskView) {
        this.parentView.activeTaskView.close();
      }
      this.$el.addClass('active');
      this.parentView.activeTaskView = this;
    },

    close: function(e) {
      this.$el.removeClass('active');
    }
  });

  return TaskView;
});
