"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hmr = exports.__beyond_pkg = exports.Controller = void 0;
var dependency_0 = require("@beyond-js/widgets/render");
var dependency_1 = require("@beyond-js/kernel/bundle");
var dependency_2 = require("@beyond-js/kernel/styles");
var dependency_3 = require("@beyond-js/react-18-widgets/base");
var dependency_4 = require("react");
const {
  Bundle: __Bundle
} = dependency_1;
const __pkg = new __Bundle({
  "module": {
    "vspecifier": "@essential-js/admin@0.0.1/layout/main"
  },
  "type": "widget"
}).package();
;
__pkg.dependencies.update([['@beyond-js/widgets/render', dependency_0], ['@beyond-js/kernel/styles', dependency_2], ['@beyond-js/react-18-widgets/base', dependency_3], ['react', dependency_4]]);
brequire('@beyond-js/widgets/render').widgets.register([{
  "name": "main-layout",
  "vspecifier": "@essential-js/admin@0.0.1/layout/main",
  "is": "layout"
}]);
brequire('@beyond-js/kernel/styles').styles.register('@essential-js/admin@0.0.1/layout/main');
const ims = new Map();

/****************************
INTERNAL MODULE: ./controller
****************************/

ims.set('./controller', {
  hash: 705071867,
  creator: function (require, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Controller = void 0;
    var _base = require("@beyond-js/react-18-widgets/base");
    var _views = require("./views");
    /*bundle*/
    class Controller extends _base.ReactWidgetController {
      get Widget() {
        return _views.Layout;
      }
    }
    exports.Controller = Controller;
  }
});

/*****************************
INTERNAL MODULE: ./views/index
*****************************/

ims.set('./views/index', {
  hash: 134666018,
  creator: function (require, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Layout = Layout;
    var React = require("react");
    function Layout() {
      return React.createElement("main", null, React.createElement("beyond-layout-children", null));
    }
  }
});
__pkg.exports.descriptor = [{
  "im": "./controller",
  "from": "Controller",
  "name": "Controller"
}];
let Controller = exports.Controller = void 0;

// Module exports
__pkg.exports.process = function ({
  require,
  prop,
  value
}) {
  (require || prop === 'Controller') && (exports.Controller = Controller = require ? require('./controller').Controller : value);
};
const __beyond_pkg = exports.__beyond_pkg = __pkg;
const hmr = exports.hmr = new function () {
  this.on = (event, listener) => void 0;
  this.off = (event, listener) => void 0;
}();
__pkg.initialise(ims);
//# sourceMappingURL=layout/main.cjs.js.map