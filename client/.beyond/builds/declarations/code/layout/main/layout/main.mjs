import * as dependency_0 from '@beyond-js/widgets/render';
import * as dependency_1 from '@beyond-js/kernel/bundle';
import * as dependency_2 from '@beyond-js/kernel/styles';
import * as dependency_3 from '@beyond-js/react-18-widgets/base';
import * as dependency_4 from 'react';

const {Bundle: __Bundle} = dependency_1;
const __pkg = new __Bundle({"module":{"vspecifier":"@essential-js/admin@0.0.1/layout/main"},"type":"widget"}, import.meta.url).package();;

__pkg.dependencies.update([['@beyond-js/widgets/render', dependency_0],['@beyond-js/kernel/styles', dependency_2],['@beyond-js/react-18-widgets/base', dependency_3],['react', dependency_4]]);

brequire('@beyond-js/widgets/render').widgets.register([{"name":"main-layout","vspecifier":"@essential-js/admin@0.0.1/layout/main","is":"layout"}]);

brequire('@beyond-js/kernel/styles').styles.register('@essential-js/admin@0.0.1/layout/main')


const ims = new Map();

/****************************
INTERNAL MODULE: ./controller
****************************/

ims.set('./controller', {hash: 705071867, creator: function (require, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;
var _base = require("@beyond-js/react-18-widgets/base");
var _views = require("./views");
/*bundle*/class Controller extends _base.ReactWidgetController {
  get Widget() {
    return _views.Layout;
  }
}
exports.Controller = Controller;
}});

/*****************************
INTERNAL MODULE: ./views/index
*****************************/

ims.set('./views/index', {hash: 134666018, creator: function (require, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = Layout;
var React = require("react");
function Layout() {
  return React.createElement("main", null, React.createElement("beyond-layout-children", null));
}
}});

__pkg.exports.descriptor = [{"im":"./controller","from":"Controller","name":"Controller"}];

export let Controller;

// Module exports
__pkg.exports.process = function({require, prop, value}) {
    (require || prop === 'Controller') && (Controller = require ? require('./controller').Controller : value);

};
export const __beyond_pkg = __pkg;

export const hmr = new (function () {
    this.on = (event, listener) => void 0;
    this.off = (event, listener) => void 0;
});


__pkg.initialise(ims);
//# sourceMappingURL=layout/main.mjs.map