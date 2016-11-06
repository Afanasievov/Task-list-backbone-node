'use strict';

define([
    'text!templates/app.html',
    'views/lists/add',
    'views/lists/edit'
  ],
  function(template, AddListView, EditListView) {
    const AppView = Backbone.View.extend({
      id: 'main',
      tagName: 'div',
      className: 'container-fluid',
      el: 'body',
      template: _.template(template),

      events: {
        'click #add-list-button': 'addList',
        'click #edit-list-button': 'editList'
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
      }
    });

    return AppView;
  });
