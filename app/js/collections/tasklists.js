'use strict';

define([
  'models/tasklist'
],
 function(TaskList){
  const TaskLists = Backbone.Collection.extend({
    model: TaskList,
    url: 'tasklists',
    comparator: function (model) {
      return -model.get('updated');
    }
  });

  return TaskLists;
});
