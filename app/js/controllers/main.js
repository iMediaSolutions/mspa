'use strict';require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore'],
      exports: 'Backbone'
    }
  },
  paths: {
    underscore: '../vendors/underscore',
    backbone: '../vendors/backbone',
    route: 'route',
    uri: '../vendors/URIjs',
    controllers: '../controllers',
    models: '../models',
    views: '../views'
  }
});

require(['route'], function(Router) {
  return console.log(Router);
});
