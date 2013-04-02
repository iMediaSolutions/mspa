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
    underscore: 'js/vendors/underscore',
    backbone: 'js/vendors/backbone',
    route: 'js/controllers/route',
    uri: 'js/vendors/URIjs',
    controllers: 'js/controllers/',
    models: 'js/models/',
    views: 'js/views/'
  }
});

require(['route'], function(Router) {
  return console.log(Router);
});
