define ['models/namespace'],(namespace) ->
  class mSpa
    changeConfig: (config) ->
      String.prototype.endsWith = (suffix) ->
        this.indexOf(suffix, this.length - suffix.length) != -1
      if config.endsWith('.json')
        $.getJSON config, (data) ->
          namespace.data = data
        namespace.data = config
    displayHeaderFooterSidebar: (route) ->
      $('#header').html('')
      $('#footer').html('')
      $('#sidebar').html('')
      this.dHFS(route, 'header')
      this.dHFS(route, 'footer')
      this.dHFS(route, 'sidebar')
    dHFS: (route, loc) ->
      data = namespace.data
      try
        modules = data.controllers[route][loc].modules
        if modules != undefined
          $.each modules, (id, module) ->
            $(document).on module.parentID, () ->
              $(this).unbind module.parentID, arguments.callee
              if $('#' + id).length > 0
                $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
              else
                if module.position == 'top'
                  $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>')
                else
                  $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
              $.get 'templates/' + module.template + '.html', (html) ->
                html = $(html)
                $(html[0]).attr('id', id)
                $('#' + id + '-pre').replaceWith(html)
                $(document).trigger id
                if module.model != undefined
                  requirejs ['models/' + module.model], (Model) -> 
                    dataModel = new Model()
                    dataModel.display(id, module.dataSource, module.title, uri)

          containers = data.controllers[route][loc].containers
          $.each containers, (id, container) ->
            $(document).on container[0], ()->
              $(this).unbind container[0], arguments.callee
              if $('#' + id).length > 0
                $('#' + id).replaceWith('<div id="' + id + '-pre"></div>')
              else
                if (container[2] == 'top')
                  $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>')
                else
                  $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
              if container[1] != undefined && container[1] != ''
                $.get 'templates/' + container[1] + '.html', (html) ->
                  html = $(html)
                  $(html[0]).attr('id', id)
                  $('#' + id + '-pre').replaceWith(html)
                  $(document).trigger id
              else
                console.log 'in here'
                html = $('<div></div>')
                html.attr('id', id)
                $('#' + id + '-pre').replaceWith(html)
                $(document).trigger id
            $(document).trigger 'header'
      catch err
        console.log err

    route: (route, action, actions) ->
      if (route == undefined or route == null)
        route = 'default'
        action = 'default'
      console.log route
      data = namespace.data
      if (route == 'default' && action == 'default')
        reroute = data.controllers[route].views[action].reroute
        console.log reroute
        if (reroute != undefined or route != null)
          window.location = '/#/' + reroute.route + '/' + reroute.action
      if namespace.lastTemplate != route
        this.displayHeaderFooterSidebar(route)
        namespace.lastTemplate = route
      modules = data.controllers[route].views[action].modules
      $('#container').html('')
      $.each modules, (id, module) ->
        $(document).on module.parentID, () ->
          $(this).unbind module.parentID, arguments.callee
          if module.position == 'top'
            $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>')
          else
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>')
          $.get 'templates/' + module.template + '.html', (html) ->
            html = $(html)
            $(html[0]).attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
            if module.model != undefined
              requirejs ['models/' + module.model], (Model) -> 
                dataModel = new Model()
                if actions != undefined and actions != null
                  dataModel.display(id, module.dataSource, module.title, actions)
                else
                  dataModel.display(id, module.dataSource, module.title)

      containers = data.controllers[route].views[action].containers
      $.each containers, (id, container) ->
        $(document).on container[0], ()->
          $(this).unbind container[0], arguments.callee
          if (container[2] == 'top')
            $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>')
          else
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>')
          if container[1] != undefined && container[1] != ''
            $.get 'templates/' + container[1] + '.html', (html) ->
              html = $(html)
              $(html[0]).attr('id', id)
              $('#' + id + '-pre').replaceWith(html)
              $(document).trigger id
          else
            console.log 'in here'
            html = $('<div></div>')
            html.attr('id', id)
            $('#' + id + '-pre').replaceWith(html)
            $(document).trigger id
        $(document).trigger 'container'
