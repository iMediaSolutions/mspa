define([], function() {
  var BaseModule;

  return BaseModule = (function() {
    function BaseModule() {}

    BaseModule.prototype.display = function(id, url, title, actions) {
      if (actions === void 0) {
        return this.easyRoute(id, url, title);
      } else {
        return this.route(id, url, title, actions);
      }
    };

    BaseModule.prototype.easyRoute = function(id, url, title) {
      console.log('No Easy Route Defined');
      console.log(id);
      console.log(url);
      return console.log(title);
    };

    BaseModule.prototype.route = function(id, url, title, actions) {
      console.log('No route Defined');
      console.log(actions);
      return this.easyRoute(id, url, title);
    };

    return BaseModule;

  })();
});
