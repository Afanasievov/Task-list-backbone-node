'use strict';

define(function() {
  const Task = Backbone.Model.extend({
    url: 'tasks'
  });

  return Task;
});
