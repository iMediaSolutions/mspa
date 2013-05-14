define(['models/namespace'], function(namespace) {
  var mSpa;

  return mSpa = (function() {
    function mSpa() {}

    mSpa.prototype.changeConfig = function(config) {
      String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };
      if (config.endsWith('.json')) {
        $.getJSON(config, function(data) {
          return namespace.data = data;
        });
        return namespace.data = config;
      }
    };

    mSpa.prototype.displayHeaderFooterSidebar = function(route) {
      $('#header').html('');
      $('#footer').html('');
      $('#sidebar').html('');
      this.dHFS(route, 'header');
      this.dHFS(route, 'footer');
      return this.dHFS(route, 'sidebar');
    };

    mSpa.prototype.dHFS = function(route, loc) {
      var containers, err, modules;

      try {
        modules = data.controllers[route][loc].modules;
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
                $(html[0]).attr('id', id);
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
          containers = data.controllers[route][loc].containers;
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
                  $(html[0]).attr('id', id);
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
      } catch (_error) {
        err = _error;
        return console.log(err);
      }
    };

    mSpa.prototype.route = function(route, action, actions) {
      var containers, data, modules;

      if (route === void 0 || route === null) {
        route = 'default';
        action = 'default';
      }
      if (namespace.lastTemplate !== route) {
        this.displayHeaderFooterSidebar(route);
        namespace.lastTemplate = route;
      }
      data = namespace.data;
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
            $(html[0]).attr('id', id);
            $('#' + id + '-pre').replaceWith(html);
            $(document).trigger(id);
            if (module.model !== void 0) {
              return requirejs(['models/' + module.model], function(Model) {
                var dataModel;

                dataModel = new Model();
                if (actions !== void 0 && actions !== null) {
                  return dataModel.display(id, module.dataSource, module.title, actions);
                } else {
                  return dataModel.display(id, module.dataSource, module.title);
                }
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
              $(html[0]).attr('id', id);
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
    };

    return mSpa;

  })();
});
