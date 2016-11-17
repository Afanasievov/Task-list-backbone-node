'use strict';

define([
  'text!templates/tasks/edit.html',
  'views/modal_delete'
],
 function(template, ModalDeleteView) {
  var TaskEditView = Backbone.View.extend({
    tagName: 'form',
    className: 'well edit-task',
    template: _.template(template),

    events: {
      'submit': 'submit',
      'click .cancel': 'cancel',
      'click .delete-task': 'deleteTask'
    },

    initialize: function() {
      console.log(this.$el);
      console.log(this.$el.parents());
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    submit: function(e) {
      e.preventDefault();

      var title = this.$el.find('input[name="title"]').val(),
        notes = this.$el.find('textarea[name="notes"]').val(),
        status = this.$el.find('input[name="status"]:checked').val();

      this.model.set('title', title);
      this.model.set('notes', notes);

      if (status !== this.model.get('status')) {
        this.model.set('status', status);
        if (status === 'needsAction') {
          this.model.set('completed', null);
        }
      }

      this.model.save();
      return false;
    },

    cancel: function() {
      this.remove();
      return false;
    },

    deleteTask: function() {
      const modal = new ModalDeleteView({ model: this.model });
      this.$el.append(modal.render().el);
    }
  });

  return TaskEditView;
});
