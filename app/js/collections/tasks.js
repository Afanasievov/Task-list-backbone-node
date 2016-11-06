'use strict';

define([
  'models/task'
],
 function(Task){
  const Tasks = Backbone.Collection.extend({
    model: Task,
    url: 'tasks'
  });

  return Tasks;
});
