"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hmr = exports.__beyond_pkg = exports.View = exports.Controller = void 0;
var dependency_0 = require("@beyond-js/widgets/render");
var dependency_1 = require("@beyond-js/kernel/bundle");
var dependency_2 = require("@beyond-js/kernel/styles");
var dependency_3 = require("@beyond-js/react-18-widgets/page");
var dependency_4 = require("react");
const {
  Bundle: __Bundle
} = dependency_1;
const __pkg = new __Bundle({
  "module": {
    "vspecifier": "@essential-js/admin@0.0.1/home"
  },
  "type": "widget"
}).package();
;
__pkg.dependencies.update([['@beyond-js/widgets/render', dependency_0], ['@beyond-js/kernel/styles', dependency_2], ['@beyond-js/react-18-widgets/page', dependency_3], ['react', dependency_4]]);
brequire('@beyond-js/widgets/render').widgets.register([{
  "name": "home-page",
  "vspecifier": "@essential-js/admin@0.0.1/home",
  "is": "page",
  "route": "/"
}]);
brequire('@beyond-js/kernel/styles').styles.register('@essential-js/admin@0.0.1/home');
const ims = new Map();

/****************************
INTERNAL MODULE: ./controller
****************************/

ims.set('./controller', {
  hash: 1927493790,
  creator: function (require, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Controller = void 0;
    var _page = require("@beyond-js/react-18-widgets/page");
    var _store = require("./store");
    var _views = require("./views");
    /*bundle*/
    class Controller extends _page.PageReactWidgetController {
      #store;
      createStore() {
        this.#store = new _store.StoreManager();
        return this.#store;
      }
      get Widget() {
        return _views.View;
      }
      /**
       * this method is executed when the widget is showd
       */
      show() {}
      /**
       * this method is executed when the widget is hidden
       */
      hide() {}
    }
    exports.Controller = Controller;
  }
});

/***********************
INTERNAL MODULE: ./store
***********************/

ims.set('./store', {
  hash: 1793251939,
  creator: function (require, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StoreManager = void 0;
    class StoreManager {}
    exports.StoreManager = StoreManager;
  }
});

/*****************************
INTERNAL MODULE: ./views/index
*****************************/

ims.set('./views/index', {
  hash: 2692426773,
  creator: function (require, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.View = View;
    var React = require("react");
    /*bundle*/
    function View() {
      return React.createElement("div", {
        className: 'page__container'
      }, React.createElement("h1", null, "My first page using BeyondJS with ", React.createElement("span", {
        className: 'beyond'
      }, "React"), "!"));
    }
  }
});
__pkg.exports.descriptor = [{
  "im": "./controller",
  "from": "Controller",
  "name": "Controller"
}, {
  "im": "./views/index",
  "from": "View",
  "name": "View"
}];
let Controller = exports.Controller = void 0,
  View = exports.View = void 0;

// Module exports
__pkg.exports.process = function ({
  require,
  prop,
  value
}) {
  (require || prop === 'Controller') && (exports.Controller = Controller = require ? require('./controller').Controller : value);
  (require || prop === 'View') && (exports.View = View = require ? require('./views/index').View : value);
};
const __beyond_pkg = exports.__beyond_pkg = __pkg;
const hmr = exports.hmr = new function () {
  this.on = (event, listener) => void 0;
  this.off = (event, listener) => void 0;
}();
__pkg.initialise(ims);
//# sourceMappingURL=home.cjs.js.map