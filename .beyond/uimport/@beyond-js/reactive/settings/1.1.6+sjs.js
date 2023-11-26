{"code":"System.register([\"@beyond-js/kernel@0.1.9/bundle\"], (_exports, _context) => {\n\nconst bimport = specifier => {\n\tconst dependencies = new Map([[\"@beyond-js/kernel\",\"0.1.9\"],[\"@beyond-js/reactive\",\"1.1.6\"]]);\n\treturn globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));\n};\n\n\nvar dependencies = new Map();\nvar require = dependency => dependencies.get(dependency);\nreturn {\nsetters: [dep => dependencies.set('@beyond-js/kernel@0.1.9/bundle', dep)],\nexecute: function() {\n// Prevent esbuild from considering the context to be amd\nconst define = void 0;\nconst module = {};\n\nconst code = (module, require) => {\nvar __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __export = (target, all) => {\n  for (var name in all) __defProp(target, name, {\n    get: all[name],\n    enumerable: true\n  });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {\n      get: () => from[key],\n      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable\n    });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", {\n  value: mod,\n  enumerable: true\n}) : target, mod));\nvar __toCommonJS = mod => __copyProps(__defProp({}, \"__esModule\", {\n  value: true\n}), mod);\n\n// .beyond/uimport/@beyond-js/reactive/settings.1.1.6.js\nvar settings_1_1_6_exports = {};\n__export(settings_1_1_6_exports, {\n  IConfig: () => IConfig,\n  ReactiveConfig: () => ReactiveConfig,\n  TCustomAdapter: () => TCustomAdapter,\n  __beyond_pkg: () => __beyond_pkg,\n  hmr: () => hmr\n});\nmodule.exports = __toCommonJS(settings_1_1_6_exports);\n\n// node_modules/@beyond-js/reactive/settings/settings.browser.mjs\nvar dependency_0 = __toESM(require(\"@beyond-js/kernel@0.1.9/bundle\"), 0);\nvar import_meta = {};\nvar {\n  Bundle: __Bundle\n} = dependency_0;\nvar __pkg = new __Bundle({\n  \"module\": {\n    \"vspecifier\": \"@beyond-js/reactive@1.1.6/settings\"\n  },\n  \"type\": \"ts\"\n}, _context.meta.url).package();\n;\n__pkg.dependencies.update([]);\nvar ims = /* @__PURE__ */new Map();\nims.set(\"./index\", {\n  hash: 3101532363,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.ReactiveConfig = void 0;\n    class ReactiveConfig2 {\n      static #config;\n      static adapter = \"legacy\";\n      static set(config) {\n        this.#config = config;\n        const properties = Object.keys(config);\n        properties.forEach(property => {\n          ReactiveConfig2[property] = config[property];\n        });\n      }\n    }\n    exports.ReactiveConfig = ReactiveConfig2;\n  }\n});\nims.set(\"./interface\", {\n  hash: 2607228355,\n  creator: function (require2, exports) {\n    \"use strict\";\n\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n  }\n});\n__pkg.exports.descriptor = [{\n  \"im\": \"./index\",\n  \"from\": \"ReactiveConfig\",\n  \"name\": \"ReactiveConfig\"\n}, {\n  \"im\": \"./interface\",\n  \"from\": \"TCustomAdapter\",\n  \"name\": \"TCustomAdapter\"\n}, {\n  \"im\": \"./interface\",\n  \"from\": \"IConfig\",\n  \"name\": \"IConfig\"\n}];\nvar ReactiveConfig, TCustomAdapter, IConfig;\n__pkg.exports.process = function ({\n  require: require2,\n  prop,\n  value\n}) {\n  (require2 || prop === \"ReactiveConfig\") && (ReactiveConfig = require2 ? require2(\"./index\").ReactiveConfig : value);\n  (require2 || prop === \"TCustomAdapter\") && (TCustomAdapter = require2 ? require2(\"./interface\").TCustomAdapter : value);\n  (require2 || prop === \"IConfig\") && (IConfig = require2 ? require2(\"./interface\").IConfig : value);\n};\nvar __beyond_pkg = __pkg;\nvar hmr = new function () {\n  this.on = (event, listener) => void 0;\n  this.off = (event, listener) => void 0;\n}();\n__pkg.initialise(ims);\n};\n\ncode(module, require);\n_exports(module.exports);\n}}});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9AYmV5b25kLWpzL3JlYWN0aXZlL3NldHRpbmdzLjEuMS42LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiZXlvbmQtanMvcmVhY3RpdmUvc2V0dGluZ3MvX19zb3VyY2VzL3NldHRpbmdzL2luZGV4LnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BiZXlvbmQtanMvcmVhY3RpdmUvc2V0dGluZ3MvX19zb3VyY2VzL3NldHRpbmdzL2ludGVyZmFjZS50cyJdLCJuYW1lcyI6WyJzZXR0aW5nc18xXzFfNl9leHBvcnRzIiwiX19leHBvcnQiLCJJQ29uZmlnIiwiUmVhY3RpdmVDb25maWciLCJUQ3VzdG9tQWRhcHRlciIsIl9fYmV5b25kX3BrZyIsImhtciIsIm1vZHVsZSIsImV4cG9ydHMiLCJfX3RvQ29tbW9uSlMiLCJSZWFjdGl2ZUNvbmZpZzIiLCJjb25maWciLCJhZGFwdGVyIiwic2V0IiwicHJvcGVydGllcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxzQkFBQTtBQUFBQyxRQUFBLENBQUFELHNCQUFBO0VBQUFFLE9BQUEsRUFBQUEsQ0FBQSxLQUFBQSxPQUFBO0VBQUFDLGNBQUEsRUFBQUEsQ0FBQSxLQUFBQSxjQUFBO0VBQUFDLGNBQUEsRUFBQUEsQ0FBQSxLQUFBQSxjQUFBO0VBQUFDLFlBQUEsRUFBQUEsQ0FBQSxLQUFBQSxZQUFBO0VBQUFDLEdBQUEsRUFBQUEsQ0FBQSxLQUFBQTtBQUFBO0FBQUFDLE1BQUEsQ0FBQUMsT0FBQSxHQUFBQyxZQUFBLENBQUFULHNCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0VrQixNQUFPVSxlQUFBLENBQWM7TUFDdEMsT0FBTyxDQUFBQyxNQUFBO01BQ1AsT0FBT0MsT0FBQSxHQUE4QjtNQUNyQyxPQUFPQyxJQUFJRixNQUFBLEVBQWU7UUFDekIsS0FBSyxDQUFBQSxNQUFBLEdBQVVBLE1BQUE7UUFDZixNQUFNRyxVQUFBLEdBQWFDLE1BQUEsQ0FBT0MsSUFBQSxDQUFLTCxNQUFNO1FBQ3JDRyxVQUFBLENBQVdHLE9BQUEsQ0FBUUMsUUFBQSxJQUFXO1VBQzdCUixlQUFBLENBQWVRLFFBQUEsSUFBWVAsTUFBQSxDQUFPTyxRQUFBO1FBQ25DLENBQUM7TUFDRjs7Ozs7Ozs7SUNYRDs7SUFFQUgsTUFBQSxDQUFBSSxjQUFBLENBQUFYLE9BQUE7TUFDQVksS0FBQTtJQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvY2xpZW50L291dCJ9","dependencies":[{"id":"@beyond-js/kernel@0.1.9/bundle","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@beyond-js\\kernel"}],"warnings":[]}