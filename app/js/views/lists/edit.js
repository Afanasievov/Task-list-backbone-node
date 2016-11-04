'use strict';

define(['text!templates/lists/form.html'], function(template) {
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

      const self = this;
      const title = this.$el.find('input[name="title"]').val();

      this.model.save({ title: title }, {
        success: () => {
          self.remove();
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
