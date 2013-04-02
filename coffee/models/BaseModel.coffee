define [], () ->
  class BaseModule
    display: (id, url, title, actions) ->
      if actions == undefined
        this.easyRoute(id, url, title)
      else
        this.route(id, url, title, actions)
    easyRoute: (id, url, title) ->
      console.log 'No Easy Route Defined'
      console.log id
      console.log url
      console.log title
    route: (id, url, title, actions) ->
      console.log 'No route Defined'
      console.log actions
      this.easyRoute(id, url, title)
