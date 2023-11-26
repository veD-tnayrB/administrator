import * as dependency_0 from '@beyond-js/widgets/render';
import * as dependency_1 from '@beyond-js/kernel/bundle';
import * as dependency_2 from '@beyond-js/kernel/styles';
import * as dependency_3 from '@beyond-js/react-18-widgets/page';
import * as dependency_4 from 'react';

const {Bundle: __Bundle} = dependency_1;
const __pkg = new __Bundle({"module":{"vspecifier":"@essential-js/admin@0.0.1/home"},"type":"widget"}, import.meta.url).package();;

__pkg.dependencies.update([['@beyond-js/widgets/render', dependency_0],['@beyond-js/kernel/styles', dependency_2],['@beyond-js/react-18-widgets/page', dependency_3],['react', dependency_4]]);

brequire('@beyond-js/widgets/render').widgets.register([{"name":"home-page","vspecifier":"@essential-js/admin@0.0.1/home","is":"page","route":"/"}]);

brequire('@beyond-js/kernel/styles').styles.register('@essential-js/admin@0.0.1/home')


const ims = new Map();

/****************************
INTERNAL MODULE: ./controller
****************************/

ims.set('./controller', {hash: 1927493790, creator: function (require, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;
var _page = require("@beyond-js/react-18-widgets/page");
var _store = require("./store");
var _views = require("./views");
/*bundle*/class Controller extends _page.PageReactWidgetController {
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
}});

/***********************
INTERNAL MODULE: ./store
***********************/

ims.set('./store', {hash: 1793251939, creator: function (require, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreManager = void 0;
class StoreManager {}
exports.StoreManager = StoreManager;
}});

/*****************************
INTERNAL MODULE: ./views/index
*****************************/

ims.set('./views/index', {hash: 2692426773, creator: function (require, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = View;
var React = require("react");
/*bundle*/function View() {
  return React.createElement("div", {
    className: 'page__container'
  }, React.createElement("h1", null, "My first page using BeyondJS with ", React.createElement("span", {
    className: 'beyond'
  }, "React"), "!"));
}
}});

__pkg.exports.descriptor = [{"im":"./controller","from":"Controller","name":"Controller"},{"im":"./views/index","from":"View","name":"View"}];

export let Controller, View;

// Module exports
__pkg.exports.process = function({require, prop, value}) {
    (require || prop === 'Controller') && (Controller = require ? require('./controller').Controller : value);
    (require || prop === 'View') && (View = require ? require('./views/index').View : value);

};
export const __beyond_pkg = __pkg;

export const hmr = new (function () {
    this.on = (event, listener) => void 0;
    this.off = (event, listener) => void 0;
});


__pkg.initialise(ims);
//# sourceMappingURL=home.browser.mjs.map