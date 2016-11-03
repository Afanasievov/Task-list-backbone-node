'use strict';

define('model/tasklist', function(TaskList){
  const TaskLists = Backbone.collection.extend({
    model: TaskList,
    url: 'tasklists'
  });

  return TaskLists;
});
