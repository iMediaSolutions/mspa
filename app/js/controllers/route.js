require(['backbone', 'uri/URI', 'models/namespace'], function(Backbone, URI, namespace) {
  var config, uri;

  uri = URI(window.url);
  console.log(uri.subdomain());
  config = 'config';
  if (uri.subdomain() !== '' && uri.subdomain() !== 'www') {
    config = config + '-' + uri.subdomain();
  }
  config = config + '.json';
  console.log(config);
  return $.getJSON(config, function(data) {
    var AppsRouter, app_router, displayHeaderFooterSidebar;

    AppsRouter = Backbone.Router.extend({
      routes: {
        ":route/:action/:actions": "route",
        ":route/:action": "easyRoute",
        "*actions": "defaultRoute"
      }
    });
    app_router = new AppsRouter;
    displayHeaderFooterSidebar = function(route) {
      var containers, error, modules;

      $('#header').html('');
      $('#footer').html('');
      $('#sidebar').html('');
      modules = data.controllers[route].header.modules;
      if (modules !== void 0) {
        $.each(modules, function(id, module) {
          return $(document).on(module.parentID, function() {
            $(this).unbind(module.parentID, arguments.callee);
            if ($('#' + id).length > 0) {
              $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
            } else {
              if (module.position === 'top') {
                $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>');
              } else {
                $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
              }
            }
            return $.get('templates/' + module.template + '.html', function(html) {
              html = $(html);
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              $(document).trigger(id);
              if (module.model !== void 0) {
                return requirejs(['models/' + module.model], function(Model) {
                  var dataModel;

                  dataModel = new Model();
                  return dataModel.display(id, module.dataSource, module.title, uri);
                });
              }
            });
          });
        });
        containers = data.controllers[route].header.containers;
        $.each(containers, function(id, container) {
          $(document).on(container[0], function() {
            var html;

            $(this).unbind(container[0], arguments.callee);
            if ($('#' + id).length > 0) {
              $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
            } else {
              if (container[2] === 'top') {
                $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>');
              } else {
                $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
              }
            }
            if (container[1] !== void 0 && container[1] !== '') {
              return $.get('templates/' + container[1] + '.html', function(html) {
                html = $(html);
                html.attr('id', id);
                $('#' + id + '-pre').replaceWith(html);
                return $(document).trigger(id);
              });
            } else {
              console.log('in here');
              html = $('<div></div>');
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              return $(document).trigger(id);
            }
          });
          return $(document).trigger('header');
        });
      }
      try {
        modules = data.controllers[route].footer.modules;
        $.each(modules, function(id, module) {
          return $(document).on(module.parentID, function() {
            $(this).unbind(module.parentID, arguments.callee);
            if ($('#' + id).length > 0) {
              $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
            } else {
              if (module.position === 'top') {
                $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>');
              } else {
                $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
              }
            }
            return $.get('templates/' + module.template + '.html', function(html) {
              html = $(html);
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              $(document).trigger(id);
              if (module.model !== void 0) {
                return requirejs(['models/' + module.model], function(Model) {
                  var dataModel;

                  dataModel = new Model();
                  return dataModel.display(id, module.dataSource, module.title, uri);
                });
              }
            });
          });
        });
        containers = data.controllers[route].footer.containers;
        $.each(containers, function(id, container) {
          $(document).on(container[0], function() {
            var html;

            $(this).unbind(container[0], arguments.callee);
            if ($('#' + id).length > 0) {
              $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
            } else {
              if (container[2] === 'top') {
                $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>');
              } else {
                $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
              }
            }
            if (container[1] !== void 0 && container[1] !== '') {
              return $.get('templates/' + container[1] + '.html', function(html) {
                html = $(html);
                html.attr('id', id);
                $('#' + id + '-pre').replaceWith(html);
                return $(document).trigger(id);
              });
            } else {
              console.log('in here');
              html = $('<div></div>');
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              return $(document).trigger(id);
            }
          });
          return $(document).trigger('footer');
        });
      } catch (_error) {
        error = _error;
        console.log(error);
      }
      try {
        modules = data.controllers[route].sidebar.modules;
        $.each(modules, function(id, module) {
          return $(document).on(module.parentID, function() {
            $(this).unbind(module.parentID, arguments.callee);
            if ($('#' + id).length > 0) {
              $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
            } else {
              if (module.position === 'top') {
                $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>');
              } else {
                $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
              }
            }
            return $.get('templates/' + module.template + '.html', function(html) {
              html = $(html);
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              $(document).trigger(id);
              if (module.model !== void 0) {
                return requirejs(['models/' + module.model], function(Model) {
                  var dataModel;

                  dataModel = new Model();
                  return dataModel.display(id, module.dataSource, module.title, uri);
                });
              }
            });
          });
        });
        containers = data.controllers[route].sidebar.containers;
        return $.each(containers, function(id, container) {
          $(document).on(container[0], function() {
            var html;

            $(this).unbind(container[0], arguments.callee);
            if ($('#' + id).length > 0) {
              $('#' + id).replaceWith('<div id="' + id + '-pre"></div>');
            } else {
              if (container[2] === 'top') {
                $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>');
              } else {
                $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
              }
            }
            if (container[1] !== void 0 && container[1] !== '') {
              return $.get('templates/' + container[1] + '.html', function(html) {
                html = $(html);
                html.attr('id', id);
                $('#' + id + '-pre').replaceWith(html);
                return $(document).trigger(id);
              });
            } else {
              console.log('in here');
              html = $('<div></div>');
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              return $(document).trigger(id);
            }
          });
          return $(document).trigger('sidebar');
        });
      } catch (_error) {
        error = _error;
        return console.log(error);
      }
    };
    app_router.on('route:route', function(route, action, actions) {
      var containers, modules;

      if (namespace.lastTemplate !== route) {
        displayHeaderFooterSidebar(route);
        namespace.lastTemplate = route;
      }
      modules = data.controllers[route].views[action].modules;
      $('#container').html('');
      $.each(modules, function(id, module) {
        return $(document).on(module.parentID, function() {
          $(this).unbind(module.parentID, arguments.callee);
          if (module.position === 'top') {
            $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + module.template + '.html', function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            $(document).trigger(id);
            if (module.model !== void 0) {
              return requirejs(['models/' + module.model], function(Model) {
                var dataModel;

                dataModel = new Model();
                return dataModel.display(id, module.dataSource, module.title, uri);
              });
            }
          });
        });
      });
      containers = data.controllers[route].views[action].containers;
      return $.each(containers, function(id, container) {
        $(document).on(container[0], function() {
          var html;

          $(this).unbind(container[0], arguments.callee);
          if (container[2] === 'top') {
            $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
          }
          if (container[1] !== void 0 && container[1] !== '') {
            return $.get('templates/' + container[1] + '.html', function(html) {
              html = $(html);
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              return $(document).trigger(id);
            });
          } else {
            console.log('in here');
            html = $('<div></div>');
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          }
        });
        return $(document).trigger('container');
      });
    });
    app_router.on('route:easyRoute', function(route, action) {
      var containers, modules;

      if (namespace.lastTemplate !== route) {
        displayHeaderFooterSidebar(route);
        namespace.lastTemplate = route;
      }
      $('#container').html('');
      containers = data.controllers[route].views[action].containers;
      modules = data.controllers[route].views[action].modules;
      $.each(modules, function(id, module) {
        return $(document).on(module.parentID, function() {
          $(this).unbind(module.parentID, arguments.callee);
          if (module.position === 'top') {
            $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + module.template + '.html', function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            $(document).trigger(id);
            if (module.model !== void 0) {
              return requirejs(['models/' + module.model], function(Model) {
                var dataModel;

                dataModel = new Model();
                return dataModel.display(id, module.dataSource, module.title, module.actions);
              });
            }
          });
        });
      });
      return $.each(containers, function(id, container) {
        $(document).on(container[0], function() {
          var html;

          $(this).unbind(container[0], arguments.callee);
          if (container[2] === 'top') {
            $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
          }
          if (container[1] !== void 0 && container[1] !== '') {
            return $.get('templates/' + container[1] + '.html', function(html) {
              html = $(html);
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              return $(document).trigger(id);
            });
          } else {
            html = $('<div></div>');
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          }
        });
        return $(document).trigger('container');
      });
    });
    app_router.on('route:defaultRoute', function(action) {
      var containers, modules;

      if (namespace.lastTemplate !== 'default') {
        displayHeaderFooterSidebar('default');
        namespace.lastTemplate = 'default';
      }
      $('#container').html('');
      containers = data.controllers["default"].views["default"].containers;
      modules = data.controllers["default"].views["default"].modules;
      $.each(modules, function(id, module) {
        return $(document).on(module.parentID, function() {
          $(this).unbind(module.parentID, arguments.callee);
          if (module.position === 'top') {
            $('#' + module.parentID).prepend('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + module.parentID).append('<div id="' + id + '-pre"></div>');
          }
          return $.get('templates/' + module.template + '.html', function(html) {
            html = $(html);
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            $(document).trigger(id);
            if (module.model !== void 0) {
              return requirejs(['models/' + module.model], function(Model) {
                var dataModel;

                dataModel = new Model();
                return dataModel.display(id, module.dataSource, module.title, module.actions);
              });
            }
          });
        });
      });
      return $.each(containers, function(id, container) {
        $(document).on(container[0], function() {
          var html;

          $(this).unbind(container[0], arguments.callee);
          if (container[2] === 'top') {
            $('#' + container[0]).prepend('<div id="' + id + '-pre"></div>');
          } else {
            $('#' + container[0]).append('<div id="' + id + '-pre"></div>');
          }
          if (container[1] !== void 0 && container[1] !== '') {
            return $.get('templates/' + container[1] + '.html', function(html) {
              html = $(html);
              html.attr('id', id);
              $('#' + id + '-pre').replaceWith(html);
              return $(document).trigger(id);
            });
          } else {
            html = $('<div></div>');
            html.attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            return $(document).trigger(id);
          }
        });
        return $(document).trigger('container');
      });
    });
    return Backbone.history.start();
  });
});
