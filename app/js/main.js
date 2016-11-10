'use strict';

// TODO
// 1) forbid duplication of titles (lists and models)
// 2) forbid empty titles 


requirejs.config({
  baseUrl: 'js',

  paths: {
    text: 'lib/text'
  },

  shim: {
    'lib/underscore-min': {
      exports: '_'
    },
    'lib/backbone-min': {
      deps: ['lib/underscore-min', 'lib/jquery-3.1.1.min'],
      exports: 'Backbone'
    },
    'app': {
      deps: ['lib/underscore-min', 'lib/backbone-min']
    }
  }
});

require([
    'app'
  ],

  function(App) {
    window.bTask = new App();
  });
