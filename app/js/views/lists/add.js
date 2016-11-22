'use strict';

define([
  'models/tasklist',
  'views/lists/edit',
  'constants/messages'
],

(TaskList, EditListView, MESSAGES) => {
  const AddListView = EditListView.extend({
    submit: function(event) {
      event.preventDefault();
      let duplicateModel;

      const title = this.$el.find('input[name="title"]').val();

      duplicateModel = bTask.collections.lists.findWhere({ title: title });
      if (!title || (duplicateModel && duplicateModel !== this.model)) {
        this.$el.find('.edit-task-error').text(MESSAGES.DUPLICATE_TITLE);
        return false;
      }

      this.model.save({ title: title }, {
        success: (model) => {
          bTask.collections.lists.add(model);
          this.remove();
        }
      });
    }
  });

  return AddListView;
});
