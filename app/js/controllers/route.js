define(['controllers/mspa', 'backbone', 'uri/URI', 'models/namespace'], function(mSpa, Backbone, URI, namespace) {
  var config, mspa, uri;

  mspa = new mSpa;
  uri = URI(window.url);
  console.log(uri.subdomain());
  config = 'config';
  if (uri.subdomain() !== '' && uri.subdomain() !== 'www') {
    config = config + '-' + uri.subdomain();
  }
  config = config + '.json';
  console.log(config);
  return $.getJSON(config, function(data) {
    var AppsRouter, app_router;

    namespace.data = data;
    AppsRouter = Backbone.Router.extend({
      routes: {
        ":route/:action/:actions": "route",
        ":route/:action": "easyRoute",
        "*actions": "defaultRoute"
      }
    });
    app_router = new AppsRouter;
    app_router.on('route:route', function(route, action, actions) {
      return mspa.route(route, action, actions);
    });
    app_router.on('route:easyRoute', function(route, action) {
      return mspa.route(route, action);
    });
    app_router.on('route:defaultRoute', function(actions) {
      return mspa.route('default', 'default');
    });
    return Backbone.history.start();
  });
});
