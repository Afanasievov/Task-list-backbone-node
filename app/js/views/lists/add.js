'use strict';

define([
  'models/tasklist',
  'views/lists/edit'
],

function(TaskList, EditListView) {
  const AddListView = EditListView.extend({
    submit: function(event) {
      event.preventDefault();

      const self = this;
      const title = this.$el.find('input[name="title"]').val();

      this.model.save({ title: title }, {
        success: function(model) {
          bTask.collections.lists.add(model);
          self.remove();
        }
      });
    }
  });

  return AddListView;
});
