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
        this.collection.comparator = 'updated';
        this.collection.on('add', this.appendTask, this);
      },

      addTask: function(e) {
        e.preventDefault();
        const title = this.$el.find('input[name="title"]');
        const task = new this.collection.model({
          title: title.val()
        });
        let $el = this.$el.find('#task-list');
        const self = this;
        task.save(
          null, {
            success: function() {
              self.collection.add(task);
            }
          }
        );

        title.val('');
      },

      render: function() {
        this.$el.html(this.template());

        let $el = this.$el.find('#task-list');
        const self = this;

        this.collection.fetch({
          data: {
            tasklist: this.model.get('id')
          },
          success: function() {}
        });

        return this;
      },

      appendTask: function (task) {
        const item = new TaskView({ model: task, parentView: this });
        this.$el.find('#task-list').append(item.render().el);
        this.children.push(item);
      }
    });

    return TasksIndexView;
  });
