'use strict';

define([
  'text!templates/lists/form.html',
  'constants/messages'
],
function(template, MESSAGES) {
  const EditListView = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal well edit-list',
    template: _.template(template),

    events: {
      'submit': 'submit',
      'click .cancel': 'cancel'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      let $el = $(this.el);
      $el.html(this.template(this.model.toJSON()));

      if (!this.model.get('id')) {
        this.$el.find('legend').html('Add List');
      }

      return this;
    },

    submit: function(event) {
      event.preventDefault();
      let duplicateModel;

      const title = this.$el.find('input[name="title"]').val().trim();

      duplicateModel = this.model.collection.findWhere({ title: title });
      if (!title || (duplicateModel && duplicateModel !== this.model)) {
        this.$el.find('.edit-task-error').text(MESSAGES.DUPLICATE_TITLE);
        return false;
      }


      this.model.save({ title: title }, {
        success: () => {
          this.remove();
        }
      });

      return false;
    },

    cancel: function() {
      this.$el.hide();
      return false;
    }
  });

  return EditListView;
});
