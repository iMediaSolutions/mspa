require ['backbone', 'uri/URI', 'models/namespace'], (Backbone, URI, namespace) ->
  uri = URI(window.url)
  console.log uri.subdomain()
  config = 'config'
  if uri.subdomain() != '' && uri.subdomain() != 'www'
    config = config + '-' + uri.subdomain()
  config = config + '.json'
  console.log config
  $.getJSON config, (data) ->
    AppsRouter = Backbone.Router.extend
      routes:
        ":route/:action/:actions" : "route"
        ":route/:action" : "easyRoute"
        "*actions": "defaultRoute"
    app_router = new AppsRouter
    displayHeaderFooter = (route) ->
      $('#header').html('')
      $('#footer').html('')
      modules = data.controllers[route].header.modules
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template + '.html', (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, uri)

      containers = data.controllers[route].header.containers
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          if container[1] != undefined
            $.get 'templates/' + container[1] + '.html', (html) ->
              html = $(html)
              html.attr('id', id)
              $('#' + id + '-pre').replaceWith(html)
              $(document).trigger id
          else
            console.log 'in here'
            html = $('<div></div>')
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'header'
      modules = data.controllers[route].footer.modules
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template + '.html', (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, uri)

      containers = data.controllers[route].footer.containers
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          if $('#' + id).length > 0
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
          else
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          if container[1] != undefined
            $.get 'templates/' + container[1] + '.html', (html) ->
              html = $(html)
              html.attr('id', id)
              $('#' + id + '-pre').replaceWith(html)
              $(document).trigger id
          else
            console.log 'in here'
            html = $('<div></div>')
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'footer'

    app_router.on 'route:route', (route, action, actions) ->
      if namespace.lastTemplate != route
        displayHeaderFooter(route)
        namespace.lastTemplate = route
      modules = data.controllers[route].views[action].modules
      $('#container').html('')
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template + '.html', (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, uri)

      containers = data.controllers[route].views[action].containers
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          if container[1] != undefined
            $.get 'templates/' + container[1] + '.html', (html) ->
              html = $(html)
              html.attr('id', id)
              $('#' + id + '-pre').replaceWith(html)
              $(document).trigger id
          else
            console.log 'in here'
            html = $('<div></div>')
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'


    app_router.on 'route:easyRoute', (route, action) ->
      if namespace.lastTemplate != route
        displayHeaderFooter(route)
        namespace.lastTemplate = route
      $('#container').html('')
      containers = data.controllers[route].views[action].containers
      modules = data.controllers[route].views[action].modules

      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template + '.html', (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, module.actions)
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          if container[1] != undefined
            $.get 'templates/' + container[1] + '.html', (html) ->
              html = $(html)
              html.attr('id', id)
              $('#' + id + '-pre').replaceWith(html)
              $(document).trigger id
          else
            html = $('<div></div>')
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'

    app_router.on 'route:defaultRoute', (action) ->
      if namespace.lastTemplate != 'default'
        displayHeaderFooter('default')
        namespace.lastTemplate = 'default'
      $('#container').html('')
      containers = data.controllers.default.views.default.containers
      modules = data.controllers.default.views.default.modules
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template + '.html', (html) ->
            html = $(html)
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                dataModel.display(id, module.dataSource, module.title, module.actions)
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          if container[1] != undefined
            $.get 'templates/' + container[1] + '.html', (html) ->
              html = $(html)
              html.attr('id', id)
              $('#' + id + '-pre').replaceWith(html)
              $(document).trigger id
          else
            html = $('<div></div>')
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'
    Backbone.history.start()
