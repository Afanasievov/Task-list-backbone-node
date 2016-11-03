'use strict';

define(function() {
  const TaskList = Backbone.Model.extend({
    url: 'tasklists'
  });

  return TaskList;
});
