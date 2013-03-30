var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/BaseModel'], function(BaseModel) {
  var TestModel, _ref;

  return TestModel = (function(_super) {
    __extends(TestModel, _super);

    function TestModel() {
      _ref = TestModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TestModel.prototype.easyRoute = function() {
      return console.log('it worked!');
    };

    TestModel.prototype.route = function() {
      return console.log('in route');
    };

    return TestModel;

  })(BaseModel);
});
