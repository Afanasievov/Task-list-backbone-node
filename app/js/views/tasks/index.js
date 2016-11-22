'use strict';

define([
    'text!templates/tasks/index.html',
    'views/tasks/task',
    'views/tasks/edit',
    'collections/tasks',
    'constants/messages'
  ],
  function(template, TaskView, TaskEditView, Tasks, MESSAGES) {
    const TasksIndexView = Backbone.View.extend({
      tagName: 'div',
      className: 'row-fluid',

      template: _.template(template),

      events: {
        'submit .add-task': 'addTask'
      },

      initialize: function() {
        this.children = [];
        this.collection.on('add', this.appendTask, this);
      },

      addTask: function(e) {
        e.preventDefault();
        const titleEl = this.$el.find('input[name="title"]');
        const title = titleEl.val().trim();

        if (!title || this.collection.findWhere({ title: title })) {
          this.$el.find('.add-task-error').text(MESSAGES.DUPLICATE_TITLE);
          setTimeout(() => this.$el.find('.add-task-error').empty(), 1500);
          return false;
        }

        const task = new this.collection.model({
          title: title
        });
        let $el = this.$el.find('#task-list');
        task.save(
          null, {
            success: () => {
              this.collection.add(task);
            }
          }
        );

        titleEl.val('');
      },

      editTask: function(task) {
        if (this.taskEditView) {
          this.taskEditView.remove();
        }
        this.taskEditView = new TaskEditView({
          model: task
        });
        this.$el.find('#selected-task').append(this.taskEditView.render().el);
      },

      render: function() {
        this.$el.html(this.template());

        let $el = this.$el.find('#task-list');

        this.collection.fetch({
          data: {
            tasklist: this.model.get('id')
          },
          success: () => {}
        });

        return this;
      },

      appendTask: function(task) {

        //ignore unsaved tasks
        if (!task.get('id')) {
          return false;
        }

        const item = new TaskView({
          model: task,
          parentView: this
        });
        this.$el.find('#task-list').append(item.render().el);
        this.children.push(item);
      }
    });

    return TasksIndexView;
  });
