define ['controllers/mspa', 'backbone', 'uri/URI', 'models/namespace'], (mSpa, Backbone, URI, namespace) ->
  mspa = new mSpa
  uri = URI(window.url)
  console.log uri.subdomain()
  config = 'config'
  if uri.subdomain() != '' && uri.subdomain() != 'www'
    config = config + '-' + uri.subdomain()
  config = config + '.json'
  console.log config
  $.getJSON config, (data) ->
    namespace.data = data
    AppsRouter = Backbone.Router.extend
      routes:
        ":route/:action/:actions" : "route"
        ":route/:action" : "easyRoute"
        "*actions": "defaultRoute"
    app_router = new AppsRouter
    app_router.on 'route:route', (route, action, actions) ->
      mspa.route(route, action, actions)
    app_router.on 'route:easyRoute', (route, action) ->
      mspa.route(route, action)
    app_router.on 'route:defaultRoute', (actions) ->
      mspa.route('default', 'default')
    Backbone.history.start()
