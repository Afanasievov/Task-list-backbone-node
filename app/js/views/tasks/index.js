'use strict';

define([
    'text!templates/tasks/index.html',
    'views/tasks/task',
    'collections/tasks',
    'models/task'
  ],
  function(template, TaskView, Tasks, Task) {
    const TasksIndexView = Backbone.View.extend({
      tagName: 'div',
      className: 'row-fluid',

      template: _.template(template),

      events: {
        'submit .add-task': 'addTask'
      },

      initialize: function() {
        this.children = [];
      },

      addTask: function(e) {
        e.preventDefault();
        const title = this.$el.find('input[name="title"]').val();
        const task = new this.collection.model({
          title: title
        });
        let $el = this.$el.find('#task-list');
        const self = this;
        task.save(
          null, {
            success: function() {
              appendTask(self, $el, task);
            }
          }
        );
      },

      render: function() {
        this.$el.html(this.template());

        let $el = this.$el.find('#task-list');
        const self = this;

        this.collection = new Tasks();
        this.collection.fetch({
          data: {
            tasklist: this.model.get('id')
          },
          success: function() {
            self.collection.each((task => appendTask(self, $el, task)));
          }
        });

        return this;
      }
    });

    function appendTask(context, el, task) {
      const item = new TaskView({ model: task, parentView: context });
      el.append(item.render().el);
      context.children.push(item);
    }

    return TasksIndexView;
  });
