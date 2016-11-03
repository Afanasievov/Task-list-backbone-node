'use strict';

define([
  'models/tasklist'
],
 function(TaskList){
  const TaskLists = Backbone.Collection.extend({
    model: TaskList,
    url: 'tasklists'
  });

  return TaskLists;
});
