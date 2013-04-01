console.log('in here');

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore']
    }
  },
  paths: {
    underscore: '../vendors/underscore',
    backbone: '../vendors/backbone'
  }
});

require(['backbone'], function(Backbone) {
  return console.log(Backbone);
});
