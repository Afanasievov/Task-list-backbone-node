'use strict';

define([
  // TODO add stiles to modal_confirm
  'text!templates/modal_delete.html'
],
function(template) {
  const ModalDeleteView = Backbone.View.extend({
    template: _.template(template),

    events: {
      'click #cancel-button': 'cancel',
      'click #delete-button': 'delete'
    },

    initialize: function() {
    },

    render: function() {
      let $el = $(this.el);
      $el.html(this.template(this.model.toJSON()));

      return this;
    },

    cancel: function() {
      this.remove();
    },

    delete: function() {
      this.model.destroy();
      this.remove();
    }

  });

  return ModalDeleteView;
});
