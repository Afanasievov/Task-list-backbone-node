'use strict';

define(function() {
  const Task = Backbone.Model.extend({
    url: 'tasks',
    defaults: {
      title: '',
      notes: ''
    }
  });

  return Task;
});
