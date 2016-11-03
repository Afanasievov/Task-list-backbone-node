'use strict';

define(['text!templates/auth.html', function(template){
  const AuthView = Backbone.View.extend({
    el: '#sign-in-container',
    template: _.template(template),

    events: {
      'click #authorize-button': 'auth'
    },

    initialize: function(app) {
      this.app = app;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    auth: function() {
      this.app.ApiManager.checkAuth();
      return false;
    }
  });

  return AuthView;
}]);
