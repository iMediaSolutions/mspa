require ['backbone', 'uri/URI'], (Backbone, URI) ->
  $.getJSON 'config.json', (data) ->
    AppsRouter = Backbone.Router.extend
      routes:
        ":route/:action/:actions" : "route"
        ":route/:action" : "easyRoute"
        "*actions": "defaultRoute"
    app_router = new AppsRouter

    app_router.on 'route:route', (route, action, actions) ->
      containers = data.controllers[route].views[action].containers
      uri = new URI.parseQuery(actions)
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + container[1], (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'
     
      modules = data.controllers[route].views[action].modules
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template, (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, uri)

    app_router.on 'route:easyRoute', (route, action) ->
      containers = data.controllers[route].views[action].containers
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + container[1], (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'

      modules = data.controllers[route].views[action].modules
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template, (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, module.actions)

    app_router.on 'route:defaultRoute', (action) ->
      containers = data.controllers.default.views.default.containers
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + container[1], (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'
      modules = data.controllers.default.views.default.modules
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template, (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, module.actions)
    Backbone.history.start()
