require(['backbone'], function(Backbone) {
  return $.getJSON('config.json', function(data) {
    var AppsRouter, app_router;

    AppsRouter = Backbone.Router.extend({
      routes: {
        ":route/:action/:actions": "route",
        ":route/:action": "easyRoute",
        "*actions": "defaultRoute"
      }
    });
    app_router = new AppsRouter;
    app_router.on('route:route', function(route, action, actions) {
      var containers, modules;

      containers = data.controllers[route].views[action].containers;
      $.each(containers, function(id, container) {
        $(document).on(container[0], function() {
          $(this).unbind(container[0], arguments.callee);
          if ($('#' + id).length > 0) {
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + container[1], function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          });
        });
        return $(document).trigger('container');
      });
      modules = data.controllers[route].views[action].modules;
      return $.each(modules, function(id, module) {
        return $(document).on(module.parentID, function() {
          $(this).unbind(module.parentID, arguments.callee);
          if ($('#' + id).length > 0) {
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + module.template, function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          });
        });
      });
    });
    app_router.on('route:easyRoute', function(route, action) {
      var containers, modules;

      containers = data.controllers[route].views[action].containers;
      $.each(containers, function(id, container) {
        $(document).on(container[0], function() {
          $(this).unbind(container[0], arguments.callee);
          if ($('#' + id).length > 0) {
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + container[1], function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          });
        });
        return $(document).trigger('container');
      });
      modules = data.controllers[route].views[action].modules;
      return $.each(modules, function(id, module) {
        return $(document).on(module.parentID, function() {
          $(this).unbind(module.parentID, arguments.callee);
          if ($('#' + id).length > 0) {
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + module.template, function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          });
        });
      });
    });
    app_router.on('route:defaultRoute', function(action) {
      var containers, modules;

      containers = data.controllers["default"].views["default"].containers;
      $.each(containers, function(id, container) {
        $(document).on(container[0], function() {
          $(this).unbind(container[0], arguments.callee);
          if ($('#' + id).length > 0) {
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + container[1], function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          });
        });
        return $(document).trigger('container');
      });
      modules = data.controllers["default"].views["default"].modules;
      return $.each(modules, function(id, module) {
        console.log(module);
        return $(document).on(module.parentID, function() {
          $(this).unbind(module.parentID, arguments.callee);
          if ($('#' + id).length > 0) {
            $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + module.template, function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          });
        });
      });
    });
    return Backbone.history.start();
  });
});
