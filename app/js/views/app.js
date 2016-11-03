'use strict';

define([
  'text!templates/app.html'
],
function(template){
  const AppView = Backbone.View.extend({
    id: 'main',
    tagName: 'div',
    className: 'container-fluid',
    el: 'body',
    template: _.template(template),

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return AppView;
});
