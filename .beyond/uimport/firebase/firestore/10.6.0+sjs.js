{"code":"System.register([\"@firebase/util@1.9.3\",\"@firebase/component@0.6.4\",\"@firebase/logger@0.4.0\",\"idb@7.1.1\",\"@firebase/app@0.9.23\",\"@firebase/webchannel-wrapper@0.10.3\",\"@firebase/firestore@4.3.2\"], (_exports, _context) => {\n\nconst bimport = specifier => {\n\tconst dependencies = new Map([[\"@firebase/util\",\"1.9.3\"],[\"@firebase/component\",\"0.6.4\"],[\"@firebase/logger\",\"0.4.0\"],[\"idb\",\"7.1.1\"],[\"@firebase/app\",\"0.9.23\"],[\"@firebase/webchannel-wrapper\",\"0.10.3\"],[\"@firebase/firestore\",\"4.3.2\"],[\"firebase\",\"10.6.0\"]]);\n\treturn globalThis.bimport(globalThis.bimport.resolve(specifier, dependencies));\n};\n\n\nvar dependencies = new Map();\nvar require = dependency => dependencies.get(dependency);\nreturn {\nsetters: [dep => dependencies.set('@firebase/util@1.9.3', dep), dep => dependencies.set('@firebase/component@0.6.4', dep), dep => dependencies.set('@firebase/logger@0.4.0', dep), dep => dependencies.set('idb@7.1.1', dep), dep => dependencies.set('@firebase/app@0.9.23', dep), dep => dependencies.set('@firebase/webchannel-wrapper@0.10.3', dep), dep => dependencies.set('@firebase/firestore@4.3.2', dep)],\nexecute: function() {\n// Prevent esbuild from considering the context to be amd\nconst define = void 0;\nconst module = {};\n\nconst code = (module, require) => {\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {\n      get: () => from[key],\n      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable\n    });\n  }\n  return to;\n};\nvar __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, \"default\"), secondTarget && __copyProps(secondTarget, mod, \"default\"));\nvar __toCommonJS = mod => __copyProps(__defProp({}, \"__esModule\", {\n  value: true\n}), mod);\n\n// .beyond/uimport/firebase/firestore.10.6.0.js\nvar firestore_10_6_0_exports = {};\nmodule.exports = __toCommonJS(firestore_10_6_0_exports);\n\n// node_modules/firebase/firestore/dist/esm/index.esm.js\nvar index_esm_exports = {};\n__reExport(index_esm_exports, require(\"@firebase/firestore@4.3.2\"));\n\n// .beyond/uimport/firebase/firestore.10.6.0.js\n__reExport(firestore_10_6_0_exports, index_esm_exports, module.exports);\n};\n\ncode(module, require);\n_exports(module.exports);\n}}});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5iZXlvbmQvdWltcG9ydC9maXJlYmFzZS9maXJlc3RvcmUuMTAuNi4wLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2ZpcmViYXNlL2ZpcmVzdG9yZS9kaXN0L2VzbS9pbmRleC5lc20uanMiXSwibmFtZXMiOlsiZmlyZXN0b3JlXzEwXzZfMF9leHBvcnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsIl9fdG9Db21tb25KUyIsImluZGV4X2VzbV9leHBvcnRzIiwiX19yZUV4cG9ydCIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSx3QkFBQTtBQUFBQyxNQUFBLENBQUFDLE9BQUEsR0FBQUMsWUFBQSxDQUFBSCx3QkFBQTs7O0FDQUEsSUFBQUksaUJBQUE7QUFBQUMsVUFBQSxDQUFBRCxpQkFBQSxFQUFjRSxPQUFBOzs7QURBZEQsVUFBQSxDQUFBTCx3QkFBQSxFQUFjSSxpQkFBQSxFQUFkSCxNQUFBLENBQUFDLE9BQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii9jbGllbnQvb3V0In0=","dependencies":[{"id":"@firebase/util@1.9.3","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@firebase\\util"},{"id":"@firebase/component@0.6.4","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@firebase\\component"},{"id":"@firebase/logger@0.4.0","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@firebase\\logger"},{"id":"idb@7.1.1","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\idb"},{"id":"@firebase/app@0.9.23","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@firebase\\app"},{"id":"@firebase/webchannel-wrapper@0.10.3","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@firebase\\webchannel-wrapper"},{"id":"@firebase/firestore@4.3.2","path":"C:\\Users\\Bryant\\Documents\\Private Projects\\dashboard-beyond\\client\\node_modules\\@firebase\\firestore"}],"warnings":[]}