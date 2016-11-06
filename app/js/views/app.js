'use strict';

define([
    'text!templates/app.html',
    'views/lists/add',
    'views/lists/edit',
    'views/modal_delete'
  ],
  function(template, AddListView, EditListView, ModalDeleteView) {
    const AppView = Backbone.View.extend({
      id: 'main',
      tagName: 'div',
      className: 'container-fluid',
      el: 'body',
      template: _.template(template),

      events: {
        'click #add-list-button': 'addList',
        'click #edit-list-button': 'editList',
        'click #delete-list-button': 'deleteList'
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

      listForm: function(form) {
        this.$el.find('#list-editor').html(form.render().el);
        form.$el.find('input:first').focus();

        return false;
      },

      addList: function() {
        return this.listForm(
          new AddListView({
            model: new bTask.collections.lists.model({
              title: ''
            })
          })
        );
      },

      editList: function() {
        return this.listForm(
          new EditListView({
            model: bTask.views.activeList.model
          })
        );
      },

      deleteList: function() {
        const modal = new ModalDeleteView({ model: bTask.views.activeList.model });
        this.$el.append(modal.render().el);
      }
    });

    return AppView;
  });
