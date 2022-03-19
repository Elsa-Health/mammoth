var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    init_cjs_shims();
    var l = require_object_assign();
    var n = 60103;
    var p = 60106;
    exports.Fragment = 60107;
    exports.StrictMode = 60108;
    exports.Profiler = 60114;
    var q = 60109;
    var r = 60110;
    var t = 60112;
    exports.Suspense = 60113;
    var u = 60115;
    var v = 60116;
    if (typeof Symbol === "function" && Symbol.for) {
      w = Symbol.for;
      n = w("react.element");
      p = w("react.portal");
      exports.Fragment = w("react.fragment");
      exports.StrictMode = w("react.strict_mode");
      exports.Profiler = w("react.profiler");
      q = w("react.provider");
      r = w("react.context");
      t = w("react.forward_ref");
      exports.Suspense = w("react.suspense");
      u = w("react.memo");
      v = w("react.lazy");
    }
    var w;
    var x = typeof Symbol === "function" && Symbol.iterator;
    function y(a) {
      if (a === null || typeof a !== "object")
        return null;
      a = x && a[x] || a["@@iterator"];
      return typeof a === "function" ? a : null;
    }
    function z(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var B = {};
    function C(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = B;
      this.updater = c || A;
    }
    C.prototype.isReactComponent = {};
    C.prototype.setState = function(a, b) {
      if (typeof a !== "object" && typeof a !== "function" && a != null)
        throw Error(z(85));
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    C.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function D() {
    }
    D.prototype = C.prototype;
    function E(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = B;
      this.updater = c || A;
    }
    var F = E.prototype = new D();
    F.constructor = E;
    l(F, C.prototype);
    F.isPureReactComponent = true;
    var G = { current: null };
    var H = Object.prototype.hasOwnProperty;
    var I = { key: true, ref: true, __self: true, __source: true };
    function J(a, b, c) {
      var e, d = {}, k = null, h = null;
      if (b != null)
        for (e in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
          H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
      var g = arguments.length - 2;
      if (g === 1)
        d.children = c;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        d.children = f;
      }
      if (a && a.defaultProps)
        for (e in g = a.defaultProps, g)
          d[e] === void 0 && (d[e] = g[e]);
      return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
    }
    function K(a, b) {
      return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function L(a) {
      return typeof a === "object" && a !== null && a.$$typeof === n;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var M = /\/+/g;
    function N(a, b) {
      return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
    }
    function O(a, b, c, e, d) {
      var k = typeof a;
      if (k === "undefined" || k === "boolean")
        a = null;
      var h = false;
      if (a === null)
        h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case n:
              case p:
                h = true;
            }
        }
      if (h)
        return h = a, d = d(h), a = e === "" ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", a != null && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
          return a2;
        })) : d != null && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
      h = 0;
      e = e === "" ? "." : e + ":";
      if (Array.isArray(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = e + N(k, g);
          h += O(k, b, c, f, d);
        }
      else if (f = y(a), typeof f === "function")
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
      else if (k === "object")
        throw b = "" + a, Error(z(31, b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
      return h;
    }
    function P(a, b, c) {
      if (a == null)
        return a;
      var e = [], d = 0;
      O(a, e, "", "", function(a2) {
        return b.call(c, a2, d++);
      });
      return e;
    }
    function Q(a) {
      if (a._status === -1) {
        var b = a._result;
        b = b();
        a._status = 0;
        a._result = b;
        b.then(function(b2) {
          a._status === 0 && (b2 = b2.default, a._status = 1, a._result = b2);
        }, function(b2) {
          a._status === 0 && (a._status = 2, a._result = b2);
        });
      }
      if (a._status === 1)
        return a._result;
      throw a._result;
    }
    var R = { current: null };
    function S() {
      var a = R.current;
      if (a === null)
        throw Error(z(321));
      return a;
    }
    var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
    exports.Children = { map: P, forEach: function(a, b, c) {
      P(a, function() {
        b.apply(this, arguments);
      }, c);
    }, count: function(a) {
      var b = 0;
      P(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return P(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!L(a))
        throw Error(z(143));
      return a;
    } };
    exports.Component = C;
    exports.PureComponent = E;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
    exports.cloneElement = function(a, b, c) {
      if (a === null || a === void 0)
        throw Error(z(267, a));
      var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
      if (b != null) {
        b.ref !== void 0 && (k = b.ref, h = G.current);
        b.key !== void 0 && (d = "" + b.key);
        if (a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (f === 1)
        e.children = c;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        e.children = g;
      }
      return {
        $$typeof: n,
        type: a.type,
        key: d,
        ref: k,
        props: e,
        _owner: h
      };
    };
    exports.createContext = function(a, b) {
      b === void 0 && (b = null);
      a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
      a.Provider = { $$typeof: q, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = J;
    exports.createFactory = function(a) {
      var b = J.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: t, render: a };
    };
    exports.isValidElement = L;
    exports.lazy = function(a) {
      return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
    };
    exports.memo = function(a, b) {
      return { $$typeof: u, type: a, compare: b === void 0 ? null : b };
    };
    exports.useCallback = function(a, b) {
      return S().useCallback(a, b);
    };
    exports.useContext = function(a, b) {
      return S().useContext(a, b);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a, b) {
      return S().useEffect(a, b);
    };
    exports.useImperativeHandle = function(a, b, c) {
      return S().useImperativeHandle(a, b, c);
    };
    exports.useLayoutEffect = function(a, b) {
      return S().useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return S().useMemo(a, b);
    };
    exports.useReducer = function(a, b, c) {
      return S().useReducer(a, b, c);
    };
    exports.useRef = function(a) {
      return S().useRef(a);
    };
    exports.useState = function(a) {
      return S().useState(a);
    };
    exports.version = "17.0.2";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var _assign = require_object_assign();
        var ReactVersion = "17.0.2";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        exports.Fragment = 60107;
        exports.StrictMode = 60108;
        exports.Profiler = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        exports.Suspense = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          exports.Fragment = symbolFor("react.fragment");
          exports.StrictMode = symbolFor("react.strict_mode");
          exports.Profiler = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          exports.Suspense = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: 0
        };
        var ReactCurrentOwner = {
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var IsSomeRendererActing = {
          current: false
        };
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner,
          IsSomeRendererActing,
          assign: _assign
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
        }
        function warn(format) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          isMounted: function(publicInstance) {
            return false;
          },
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
            {
              throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        _assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case exports.Fragment:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case exports.Profiler:
              return "Profiler";
            case exports.StrictMode:
              return "StrictMode";
            case exports.Suspense:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentName(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentName(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement2(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (!!(element === null || element === void 0)) {
            {
              throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
          }
          var propName;
          var props = _assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (Array.isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = "" + children;
              {
                {
                  throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                }
              }
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            {
              throw Error("React.Children.only expected to receive a single React element child.");
            }
          }
          return children;
        }
        function createContext(defaultValue, calculateChangedBits) {
          if (calculateChangedBits === void 0) {
            calculateChangedBits = null;
          } else {
            {
              if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
              }
            }
          }
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            _calculateChangedBits: calculateChangedBits,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context,
              _calculateChangedBits: context._calculateChangedBits
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
            thenable.then(function(moduleObject) {
              if (payload._status === Pending) {
                var defaultExport = moduleObject.default;
                {
                  if (defaultExport === void 0) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                  }
                }
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = defaultExport;
              }
            }, function(error2) {
              if (payload._status === Pending) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
          }
          if (payload._status === Resolved) {
            return payload._result;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            _status: -1,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef2(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (render.displayName == null) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function memo2(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (type.displayName == null) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          if (!(dispatcher !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context, unstable_observedBits) {
          var dispatcher = resolveDispatcher();
          {
            if (unstable_observedBits !== void 0) {
              error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
            }
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context, unstable_observedBits);
        }
        function useState(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props, {
                  value: prevLog
                }),
                info: _assign({}, props, {
                  value: prevInfo
                }),
                warn: _assign({}, props, {
                  value: prevWarn
                }),
                error: _assign({}, props, {
                  value: prevError
                }),
                group: _assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case exports.Suspense:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentName(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentName(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (Array.isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement2.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === exports.Fragment) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        {
          try {
            var frozenObject = Object.freeze({});
            /* @__PURE__ */ new Map([[frozenObject, null]]);
            /* @__PURE__ */ new Set([frozenObject]);
          } catch (e) {
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component;
        exports.PureComponent = PureComponent;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef2;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo2;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useEffect = useEffect;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState;
        exports.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// src/visuals/illustrations.tsx
var illustrations_exports = {};
__export(illustrations_exports, {
  BodyViewIllustration: () => BodyViewIllustration,
  HealthSolutionIllustration: () => HealthSolutionIllustration
});
module.exports = __toCommonJS(illustrations_exports);
init_cjs_shims();
var React = __toESM(require_react());
var import_react_native_svg = __toESM(require("react-native-svg"));
var HealthSolutionIllustration = React.memo(React.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ React.createElement(import_react_native_svg.default, __spreadValues({
    viewBox: "0 0 579 633",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: svgRef
  }, props), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M457.12 92h-.25c5.73 8.51 19.61 11.43 27 2.17a14.518 14.518 0 002.93-8.4c-6.45 3.82-22.8 8.1-29.68 6.23z",
    fill: "#442257"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M316.56 60.65c-.12 10.06-.19 21.95 10.55 20.07 7.53-1.33 5.83-14.11 5.6-20.78-.15-4.23-8.22-5.48-8.22-5.48s-7.88 2.4-7.93 6.19z",
    fill: "#FAB550",
    stroke: "#FAB550",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M334 60.49c-5.38-1.46-13.54-1.11-18.82.12-.35-5.25-1-16.28 3.12-19.84 5-4.31 13.76-1.5 14.51 5.55.26 2.11 1.19 14.17 1.19 14.17z",
    fill: "#F15D4A",
    stroke: "#F15D4A",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M340.05 140.79s-1.95-22.66-3.53-33.81c-.87-6.19-2.77-23.66-8.58-22.66-5.81 1-5.22 13.82-6.88 18.07-2 5.08-8.62 10.69-15.09 5M292.81 70.1c-.06-15.66 9.22-23.69 14-26.78 4.78-3.09 10.55-4.31 9.69-9.36-.86-5.05-8.53-5.62-12.24-4.1-5.37 2.2-12.91 6.89-17.14 13.88-4.46 7.38-7.75 12.95-8.11 29.79M304.74 156c-2.74-10.95-5.11-20-5.11-20-4.43-2.67-6.31-3.57-10.6-7.09-8.08-6.63-12.72-16.07-15.27-26-1.84-7.21-.58-15.8 9.06-11.51 5.27 2.35 13.28 16 10.73 22-3.65 8.64-11.17-3.26-12.83-8.39",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M274.14 92.58c-3.52-16.22 11.52-17.46 18.41-7.71 4.72 6.68 15.39 28.54 1 28.54",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M276.21 79.8c2.22-13.23 17.78-11.58 24-1.66 2.42 3.84 13.77 31.71 2.13 30.22M316.65 10.61l-1.17-8.21M342.46 14.13l4.69-5.87M355.58 21.6l4.69-2.35M364.77 55.18l6.45 1.17M344.6 151.57L343 139.8c-7.06 1.93-19.09 8-25.84 11.19-3.83 1.81-12.15 4.66-13.52 8.71-.78 2.39 2.36 15.3 2.36 15.3",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M382.11 280.32s-8.52 12.31-14.26 18.82c-9.37 10.65-36.29 33.44-47.68 8.14-10.06-22.34-10.06-50.26-12.43-74.57-1.34-13.7-2.23-28.42-3.12-42-.52-7.91-2.53-11.59 3.6-16.31 12.44-9.57 28.95-17.36 43.12-24.09 3.74 26.47 8.7 57.1-2.48 82.43 3.28-9.07 6.56-14.15 8.86-13.52 4.13 1.14 2.12 15.68-1.91 25.83 0-13.84 4.43-24.3 10.13-35.26 5.7-10.96 15.44-23.3 24.27-35.37 8.17-11.18 18.76-22.1 31.87-25.9M504.66 93.57c6.93-5 16.64 2.47 11.66 11.62-2.88 5.28-8.13 4.53-13.25 4.23-.56 6.09-2.37 12.76-3.78 18.9-.91 4-3.35 16-3.35 16M444.53 136s2.21-66.49 11.44-99.47M454.39 85.35c1.56 13.15 20.42 20.12 29.47 8.76 2.68-3.36 4.51-10.21 1-13.68-4.06-4-8.36-.8-12.37 1.09-4.76 2.24-11.5 2.89-16.62 1-1.62 1.03-1.28 1.67-1.48 2.83zM457.12 92c6.93 1.91 23.32-2.39 29.72-6.28M404 248.29l-2.33-13.1s33-7.92 43.34-10c.81 3 2.11 12.09 2.11 12.09M460.06 69.42v-4.14",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M455.07 35a23.171 23.171 0 004 5.47c9 8.92 23.28.19 34.09-.07-2.15 4.52-6.39 6.4-7 12.12-.61 5.72 2.09 8.72 5.77 12.81 4 4.49 5.51 7.89 7.26 13.86 1.3 4.46 1.3 11.93 6.77 13.11 4.38-4.05 3.59-15.28 4.54-21.47.92-6 1.22-12 2.07-17.9 1-6.8 4.19-18.5.78-25.05-.65-1.25-2.56-.7-3.08-1.4-.93-1.23-.7-3.22-1.85-4.26-3.69-3.32-9.83-4.22-14.56-5.31-5.29-1.23-9.47-1.51-14.24-4.2-3.25-1.84-5.18-5.83-8.18-.08-2.36-2.91-4.65-5.78-6.51-.29-5.85-7.42-12 2.78-12.76 8.58a24.3 24.3 0 002.9 14.08v0zM497 143.21c-12.41-.56-22.77-1.85-31.81-2.42-7.55-.47-15.23-2.5-22.61-3.41 4.73 6 2.83 19 5.21 26.57 3.33-8 10.2-15.1 13.29-23.12 3.65 9.11 7.72 19.12 9.76 28.81C478.43 160.6 487 149 497 143.21zM458.17 162.42c-1.2 13.95-2.46 57.11-3.13 71.11M485.74 285.22l-6.9-.68s-1.7-31.08-1.34-43.24c8.7-2 22.17-.34 30.42 2.83 1.4 6.63 1.78 35.36 1.78 35.36",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M479.87 284.73c1.23-4.53 7.16-14.79 12.55-14.82 4.64 0 9 5.9 11.25 11.37M493.62 259.81c5.42.95 5.81 9.7-.38 9.28-6.19-.42-5.03-10.23.38-9.28zM494.49 240.59c.381-4.409.534-8.835.46-13.26M480.42 229.56S500 228 508.8 226.71",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M520.21 152.68c7.48 12.25-.67 22.76-7.85 28.61-10.94 8.93-17.54 14.92-29 23.14 11.46-8.22 18.31-5.63 18.64.55.33 6.18-13.28 14.02-25 28.55-3.55 4.4-7.44 9.71-11.19 15.44M423.23 228.65c-3.19-13-6.72-36.59 4.65-32.88-6.68-15.77-11.08-30.33-4.88-47.28 2.59-7 10.83-11.46 18.64-10 0 0-2.84 59-3 86.28M526.58 207.29c-.84 12.82-1.56 21.67-2.92 34.47-1.42 13.45-3.48 30.64-3.48 30.64M302.53 201l1 .2M303.34 209.12a9.38 9.38 0 011.23.61M303.14 216.92a4.831 4.831 0 012 .61M473.03 67.33v-4.15",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M401.86 289.11c8 .78 7.48 10.13 16.37 15.92 3.7 2.42 8.86 1.32 15.08.51l2.62-.39c.05-1.23.11-2.51.18-3.88 3.51 0 15.81-3.26 15.81-3.26l.43-.1c-.14-1.17-.28-2.33-.43-3.46 8.23-1.85 15.5-3.66 21.94-5.34-3.09-10.13-10.73-55.87-10.73-55.87s-32.88 6.86-41.42 8.7c-7 1.51-29.91 8.56-29.91 8.56.89 15.37 7.36 51.17 7.36 51.17l1.29 4.42c-.77-6.78-1.76-17.3 1.41-16.98z",
    fill: "#ABDDDF",
    stroke: "#ABDDDF",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M529 268.57c-5.14 1-11 4.78-12 10.11 4.23 1.37 8.33 3.7 9.54 8.19-8.85-14.3-22.52-4.13-74.62 7.58 1.39 10.63 2.22 23.23 2.86 33.14a242.64 242.64 0 010 30.39s35.22-6.87 52.74-13.27c11.29-4.13 52.62-14.31 60.56-24.14 8.9-11 7.81-34 7.81-62.6s3.12-57.41-4.87-76.45c-6.92-16.46-27.95-26.26-50.85-28.84-5.74-7.37-24.27-7.34-24.27-7.34s-8.29 14.74-10.93 20.48C474.84 188 467.51 206.3 461 229.56",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M451.92 298s-12.3 3.21-15.81 3.26c-.62 11-.12 16.68-.12 27.74 0 8.22-.91 19.68-1.08 27.74L455 354M399.16 301.44c-13.68.74-9.36 21.58-9.36 30.81 0 6.68-.69 13.68 3.25 19.31 4.43 6.34 10.84 5.37 17.93 4.69 7.62-.72 14.64-2.84 21.79-3.94",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M433.31 305.54c-6.22.81-11.38 1.91-15.08-.51-8.89-5.79-8.35-15.14-16.37-15.92-4.25-.42-1 18.56-.88 22M389.8 330.12c.63 2.76 4.85 5.64 8.6 6.14M389.94 342.22c.61 2.46 8.51 5 11 4.91M482.24 353.13l2.18 2.72M490.45 350.73l2.17 3.26M474.52 355.11l2.18 3.27M444.53 355.85s-1.9 71.17-1.95 87.65c-.06 19.19-1 36.94 0 56.18 11 3.28 13.75 4.63 25.45 5.37 13.35.85 42.23 1.29 55.15-2 6.23-1.58 15.87-2.46 20.69-7.16 2.76-2.7 6.27-13.32-1.25-9.49.53-3.08 8.26-13.14-.56-11.45 6.84-18.3 2.67-65.42 3.52-76.49.68-8.71 0-31.9-.06-40.56-.11-7.39 1-24.45 1-24.45",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M407.05 357.81c.14 12.49.29 37.86-.23 50.34-1.17 27.85 1.35 58.06-.13 85.94a141.755 141.755 0 01-17.23 1.06c-9.48 0-18.17-1-20.91-1.06 0-6.79 1-33.63 1.05-40 .13-10.86.4-23.75 1.07-34.55 1.64-26.44 4.84-52.78 6.12-79.21 1.82-37.68 5.84-66 13-102.66 1.25-6.39 11.18-42.78 11.18-42.78M385.79 368.15s-10.39 11.28-14.17 17.64M505.67 505.24s.19 26.91-.08 35.71c-.28 9.27-.14 18.47-.62 27.72-.31 6 .33 13.44.38 20.27.06 7.7-2.93 13.46-11.17 13.9-8.4.45-17 .21-25.42.38-9.5.21-19.9 1.06-29.31-.27-10-1.42-10.86-4.11-11.58-13.13-.87-10.84-1.53-21.61-1.53-32.52a225.68 225.68 0 01.87-23.86c1.42-13.37.41-27.15.31-40.62-.12-14.913-.313-29.823-.58-44.73-.44-24.74 1.11-93.6 1.11-93.6",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M385.67 495.08c-.28 14.27-1.59 29.46.5 43.52 2.09 14.06-.65 28.53.81 42.74.37 3.63-.42 11.35 1.82 14.14 3.13 3.89 17.52 2 22.22 2 5.39 0 17.24.38 17.24.38",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M500 629.29h-65a2.398 2.398 0 01-2.09-2.57 2.255 2.255 0 000-.26 2.88 2.88 0 01.93-2.46c7.52-5.34 19.5-3.22 29.5-4 7.69-.56 17.9-.75 25.52-1.29 3.48-.25 7.37-1 10.68-.24.58 3.18 1.11 7.73.46 10.82z",
    fill: "#442257",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M447.85 626.94h-60a2.879 2.879 0 01-2.87-2.59 2.837 2.837 0 011.28-2.7c9.19-5.88 27.31-3.06 37.33-2.89 9.76.17 13.08-.37 22.71-1.08l1.55 9.26z",
    fill: "#442257",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M389.16 317.07c.49 2.79 4.23 7.13 8 7.13M474.51 374.55c13.06 5.63 22.77 17.91 33.76 26.36M486.47 250.66c1.29-.74 6.24-3.64 6.29-.3 2.24-.71 6.41-2.61 7.31 1.12M191.69 413.86s-.52 13.11-.73 16.75",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M245.4 477.57v-.17a30.85 30.85 0 01-4 .62c-.95.05-1.85.13-2.68.23l.28 1.84c.3 3.47 1.23 9.13 1.23 9.13s-16.06 2.55-40.12 5.16c-24.06 2.61-37.8 4.07-37.8 4.07s-1.15-14.25-1.64-21.16c-.51-7.18-2.15-30.34-2.15-30.34s9.58-2.41 19.24-3.77l1.44-.21c-2.24-1.85-3.35-5.7-4.05-9.58h-.45l-16.18 2.1-.79.1c-1 19.3-1.66 38.63-2.68 56.28a15.261 15.261 0 01-4.07 1.61v0l1.65 14 95-11.17-2.23-18.74z",
    fill: "#ABDDDF",
    stroke: "#ABDDDF",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M232.14 435.87s.7 4.24 1.13 6.69l.05.34c2.42-.38 5.33-.88 7.85-1.29L239.33 426l-52.69 6.33-.88.08c-.24 4.21-.78 7.87-1.88 9.92l.66-.09c1.22-.24 47.6-6.37 47.6-6.37z",
    fill: "#ABDDDF",
    stroke: "#ABDDDF",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M87.27 210.17c5.69 29.66 10.84 41.45 5.2 56.42.8-2.48 4.7-18.61 8-17.87 4.3 1 4.81 17.18 6.18 20.47-1.41-7 1.43-15.46 6.81-21.19 6.7-7.14 32.79-26.58 40.47-32.54 12.51-9.7 23-15.68 34-27.06 0 0 9.3 15.45 13.11 21.87 2.8 4.74 8.85 16.85 8.8 22.21 0 3.11-4.93 6.83-6.78 9.08-5.89 7.14-9.3 12.08-16 18.7-11.24 11.17-25.52 26.06-33.28 33.91-7.76 7.85-17.05 19.9-41.08 29-9.57 3.64-29 7.31-39.83 4.18-10.83-3.13-20-17.24-23-27.27a258.604 258.604 0 01-9.91-48.45",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M200.41 232.11s-10.48 11.08-17.78 18.07c-3.1 3-6 6-9 8.91M180.47 248a40.65 40.65 0 011.17 4.65M188.44 241.56a12.248 12.248 0 00.61 4.5M194.38 235.79c.522.852.887 1.79 1.08 2.77M190.92 190.74l7.48-6 19.46 33.67-8.51 8.73M113 128.34s.95-11.84.79-18c-21.53 13.91-21.83-23.46-.15-17.82.74-2.27 1.14-10.77 1.14-10.77",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M65 164.65c-1.49-10-.81-19.65 5-27.95 9.34-13.32 15-27 17-43.14 1.29-10 5.82-17.32 9.89-26.63 3.15-7.21 4-15.14 7.53-22.25 6.34-12.84 17.82-18.49 31.65-21.2 10-2 26.26-2.1 31 9.41 1.54 3.74 5.57 15.87.69 17.64-3.22 1.16-16.53-8.26-19.81-9.75-4.51 8.52-11.37 15.19-17.22 23.11-3.33 4.52-13.55 17-21.15 20.39M140.05 93.44c2.16 2.17 5.26 4.19 8.48 3.27M22.74 506.28a327.13 327.13 0 01-4.35 39.15c-3.34 18.69-7.14 37-11.68 54.85 11.32.39 23.47-1 35-1.52 8.08-.34 16.81-.25 24.68-.75 6.37-18.69 9.75-44.47 13-64 2-12.15 3.16-19.1 4.48-31.34",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M2.81 630.29h71.44c.22-7.84-3.24-8.83-10.08-9.24-10-.6-20.33-.45-30.33-.55-10-.1-19.67.73-29.3.11l-1.73 9.68z",
    fill: "#442257",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M7.68 620.53l3.31-17.97M52.87 619.42c2.11-7.82 3.14-12.9 4.94-20.74M68.8 590s16.72.9 26.63.61c8.19-.24 27.27-1.15 27.27-1.15s7.22-36.4 9.12-49.4c3.67-25.18 7.3-50.55 8.52-76 1.13-23.47 1.74-38.83 2.92-62.29.69-13.83 3.42-64.16 3.4-77.65a132.973 132.973 0 01-27.56 3.18M105.09 592.22c-2.37 7.92-6.53 22.87-6.53 22.87",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M51.64 626.49h62.7c8.16-14.32-18.21-11.27-60.11-11.27",
    fill: "#442257"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M51.64 626.49h62.7c8.16-14.32-18.21-11.27-60.11-11.27M138.81 494.73c4.23.29 12.64-.54 16.22-2.82 2-34.94 2.69-76.47 7-111.29 2.69-21.6 5.44-100.52 5.44-100.52M146 324.39c11.7-2.45 14.81-8.85 13-19.63-1.58-9.41-.65-14.76-.65-14.76M39.94 377.15c13.52-3 31.87-13.85 40.25-22.3M193.7 253.2c1.53 21.7 2.88 41.38 3.38 49.87 1.77 30.18 3.23 47.6 2.84 77.95-.07 5.37 0 14.85-.95 20-7.16 2.76-32 2.47-37.19 3M193.44 403.05l.26 9.32-31.92 1.49M241.38 478c2.81-.14 9.69-1.95 9.69-1.95-.66-11.41-1.87-23.81-4.7-35.17-3.22.18-15.17 2.59-17.68 2.55 1.24 8.41 5 35.72 5 35.72a38.957 38.957 0 017.69-1.15v0zM217.77 447.86c1 2 .17 5.43.39 7.92.25 2.81 1 5.91 1.55 8.77a90.232 90.232 0 011.73 17.58M208.82 449.31c1.62 10.52 1.42 22.43 4.12 32.53M180.86 452.44c1 2 .17 5.42.39 7.92.25 2.8 1 5.91 1.55 8.77a90.208 90.208 0 011.73 17.57M171.91 453.88c1.62 10.52 1.42 22.44 4.12 32.54M201.08 449.92c-2.95 6.59 1.62 17.22 1.87 24.28.11 3.21 0 6.63 1.06 9.51M190.92 451.41c.37 6.61 1.74 13.43 2.25 20.14.33 4.24-.37 10 1.1 14.05M185.86 419.57c.26 12.11.18 28.36-6.41 23.64-4.11-3-4.59-12.42-5.48-17.41M167 51.39a329.848 329.848 0 01-3.38 54.25c-1.07 7.93-2.49 25.7-4.7 38.15M146.84 77.49l.5-2.97M158.64 77.68l.59-3.33M127 228.65c-6.84-18.32-22.8-39.18-26.28-42.51-6.66-6.37-2.65-18.43 8.94-13.9-7-6.73-24.63-16.08-24.73-20.55-.17-6.76 15.4-15.74 20.78-15.16 9.17 1 14.43 24.51 16.07 31.75 1.64 7.24 8.48 47.37 5.3 67.51",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M107.48 136.54s1.36-4 2.16-7.11c7.1-2.11 18.4 3.22 24.72 5.77 4.91 2 6.17 9.32 6.94 13.78 1.24 7.18 2.8 14.3 3.61 21.55 1.38 12.33 2.49 38.71.93 50.93",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M120.62 157.94c3.16 1.21 6 3.31 9.49 3.44 3.24-5.57 3.59-18.07 4.47-24.58M118.89 320.64c-.4 7.87-11.16 89.27-11.85 97.31-1 11.3-5.25 51.49-6.65 60.13-.63 3.9-2.52 18.91-5.41 22-2.53 2.68-16 3.14-19.6 3.5-10.7 1.08-21.09 1.85-31.52 2.29-14 .59-22.22.77-36.12-.64-5.54-.56-4.27.17-5.07-3.85-.84-4.27 1.32-86.34 1.91-106.57.59-20.23 3.81-45.86 5.68-61.9 1.78-15.28 9-92.14 26.09-126.38 5-9.9 16.16-28.5 23.59-36.77 5.2-5.79 15.3-13.79 25.19-16M165.15 154.28c9.69 12.34 16.49 26.2 18.58 38.19",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M145.84 180.64c3.35-13.71 12-35 18.75-47 3.28 3 6.67 15.4 5.42 19.95-2.49-.55-9.69.62-12.11-.19",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M165.15 205.87s-.1-18.37-1-25.23c-1.08-8.23-2.6-17.84-5-25.55M201 187.06a41.834 41.834 0 007.61-8.94c3.69-5.5 2.36-22.87 7.72-28.18 9.67-8.62 8.87 11 8.41 20.36 12.47-9 22.59-13.25 22.76-1.05 5.66-2.56 7.07 6.53 4.81 10 5.59 3.15 3.46 10 .48 13.32 4.42 4-1 11.58-4.78 14.9a28.181 28.181 0 01-15.13 6.18c-3.23.17-8.68-.2-12-1.75l-4.88 3.23M234.11 182.68c5.32-3.19 11.15-7.5 13.37-13.43M237.61 192.47c4.48-2.7 13-7.72 14.68-13.26M244 200.74a40.409 40.409 0 008.76-8.21M447.79 618.92c-.22-4.76-.09-13.79-.09-13.79M495.66 603.83l-.53 16.09M402.6 618.15c-.19-6.56.81-13 .76-19.53",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}));
var BodyViewIllustration = React.memo(React.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ React.createElement(import_react_native_svg.default, __spreadValues({
    viewBox: "0 0 336 641",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: svgRef
  }, props), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M230.13 64.92c2.22.37 6.63.19 9.58 1.35a5.42 5.42 0 0 1 3.75 5.25c-.26 6.42-8.83 6.51-13.19 8.33-.265 5.614-.165 11.24.3 16.84.36 5-.63 9.25 3.69 12.81 3 2.46 8.58 4.49 12.24 5.26 9.83 2.06 17.59 3.82 27.36 6.61 5.52 1.58 17.32 6.35 22.58 12.29M123.87 124.68c5.27-4.32 13.41-6.15 19.77-8.09a129.972 129.972 0 0 1 13.27-3.32h.09a11.67 11.67 0 0 0 9.52-11.37c.26-36.86 2-50.78 4.73-60.57 2.42-8.73 4-18 7.16-26.37 3.82-10.25 15.54-11.82 25.44-12.45 8.39-.53 17.52.43 24.83 4.75 2.44 1.44 4 5 4.37 7.78",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M241.6 26.7c.15-4.91-2.68-9.28-6.79-10.41a21.71 21.71 0 0 0-8.82-.62c-4.67.78-8.89 9.34-5.07 14.31-7-1.7 1.15 11.22 1.32 12.18.46 2.6-3.28 10.62 2.52 9.63-.52 4.72.39 8.81 3.85 11.82 4.52 3.93 8.1 1.26 9.81-4.66a33.023 33.023 0 0 0 .88-9.94c0-1.2-.73-1.75-.51-3.09.19-1.19 1.88-3.08 2.26-4.45 1.16-4.15.53-9.38.53-13.72 0-.34.01-.69.02-1.05ZM175.38 21.37c-5.09-.89-9.35 5-7.78 9.48-5.4 3.5-2.92 10.44 2.26 11.87M203.48 44.86l.47-3M187.46 55.12c-3.94.3-7.59 1.51-10.32 4.86-2.73 3.35-2.61 7.84-1.38 11.63 1.23 3.79 3.25 7.06 7.11 5.36 2.64-1.16 5-5.1 5.05-7.85.24 2.56 3.72 4.77 6.06 5.08 5.36.71 7.39-5.9 7.27-10.33 3 4 13.4 7.29 12.45-1.2-.3-2.64-2.48-4.34-4.76-5.45-4.45-2.15-16.45-2.49-21.48-2.1ZM193.41 80.22c6.29.61 9.57-2.93 10.89-5.58M155.51 296.88c0-8.71.79-16.67.74-25.17l-12.88-.22c.1 6.16-.74 16.21-.74 23.4M282.82 300.19c1-6.351 1.094-12.812.28-19.19-.48-3.53-1.53-9.3-1.53-9.3l-13.46.37c1.89 9.87.3 19.08 0 29.22M229.51 275.22c9.13 0 29.5-.07 38.6-.26M228.81 297.06c10.36 0 28.32 1.13 38.56.4M283.25 274.8c5.63 0 9.42.25 15 0 2.19-.09 8.77-.62 10.83-.76 0 0 1 17.45.81 21.14-4.88 2.12-10.38 2-15.73 2.35-1.9.13-9.9-.14-9.9-.14M192.27 275.8c-6.46.14-32.64-.39-35.7-1.18",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M155.51 294.31c5.73 1.86 13.42 1.66 19.52 2.21 3.75.35 13.42.39 17.24.24M141.16 293.57c-5.28.38-11-.81-16-1.31 0 0-.22-14.28-.22-19.35M141.16 274.07c-2 0-15.19-.6-15.19-.6M322.19 266.18c3.08 22.7 10.11 81.91 10.92 101.37 1.11 26.55.57 56-10.52 80.9-2.57 5.78-8.88 12.11-12.79 17.06",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M322.09 413.17c0 4.19-1.66 24.83-8.43 25.32M99.69 279.87c-.07 5.44-1.46 37.74-1.91 46.94-1 21.52.32 43.38 1 64.87a291.201 291.201 0 0 0 4.14 39.38c1.55 9 2.83 17.76 6.89 25.93a39.985 39.985 0 0 0 10.37 12.43",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M111.92 427.14c1 3 1.95 21.54 7.52 20.23M126.81 293.63c-1.48 46.59-6.83 91.34-5.5 138.1.32 11.06-1.1 21.89-1.12 32.95-.11 47 1.44 91.89 6.27 138.73.48 4.72-.76 8.25 4 10.27 5.69 2.4 43.3 3.24 51.38 1.41 6.13-1.39 5.54-3.85 6.54-9.77 4.76-28.4 3.73-55.36 5.54-83.71.9-14.15 1.77-54.62 2.33-68.52 1.42-35.49 7.3-125.71 7.87-135.2M198.93 315.28c6.92 3 16.8 2.09 23.92.52M218.43 317.49c0 17.29 1.05 34.55 2.13 51.79.69 11.14.73 22.29 1.62 33.43 2.27 28.39 4.2 57.79 4.34 86.26.18 34.22 1.21 67.36 2.27 101.68.35 11.54-2.24 26.57 6.73 25.91 12.7-.94 57.14 1.14 62-2.3 2.58-1.83 4.27-33.7 5.28-46 2.92-35.09 5.28-72.84 7-108.1 1.34-27.59 1.93-55.13 2.86-82.72.45-13.48-1-27-1.41-40.43-.24-7.64-3.38-40.18-3.38-40.18",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M239.16 629.79c2.27-.22 4.61-.17 6.76-.45 4.519-.438 9.063-.572 13.6-.4 8.83 0 17.66-.36 26.48.24 4 .27 15.69.2 15.91 8.68h-7.57c-4.91.1-9.78 0-14.67.09-11.77.31-23.54-.16-35.26.23-3.08.1-9.51.06-9.51.06 0-2.26 0-5.39.18-7.65a15.822 15.822 0 0 1 4.08-.8ZM181.08 628.51c-2.23-.24-4.53-.19-6.64-.51-4.4-.67-8.94-.47-13.35-.45-8.67.05-17.33.66-26 1.33-3.89.3-15.42-1-15.57 8.57 2.31 1.46 44.93.28 56.44.72 3 .11 9.34.12 9.34.12 0-2.56-.07-6.26-.24-8.81a13.764 13.764 0 0 0-3.98-.97Z",
    fill: "#442257",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "m305 273.13-.15-6.33M224.94 272.18h-28.1a4.57 4.57 0 0 0-4.57 4.57v17.88a4.57 4.57 0 0 0 4.57 4.57h28.1a4.57 4.57 0 0 0 4.57-4.57v-17.88a4.57 4.57 0 0 0-4.57-4.57ZM182 45.2l.47-3M33.03 262.5l-22.81 7.36M40.58 295.83c-6.85 2.44-17.77 5.14-23.74 7.67M28.18 269.71l6.54-1.84M36.92 144.39a242.3 242.3 0 0 0-34.06 17.87M48.48 177.5c-11.4 6-35.11 18.4-35.11 18.4M42.23 172.72a17.7 17.7 0 0 0 4-1.84",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M137.9 265.45c-4.79 3.34-10.12 5.34-15.8 7.12-8 2.48-16 5.27-24 7.59-9.1 2.62-18.66 5.3-27.77 7.64-5.17 1.33-14 3.08-14 3.08l-10 1.43-4-29.81 95.57 2.95Z",
    fill: "#ABDDDF",
    stroke: "#ABDDDF",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M91.53 155.06c-6.46 2.3-12.4 7.28-18.55 10.45-4.08 2.11-8.09 4.51-12.31 6.17 1.57 3.54-6.25 7.8-5.2 1.82.12 1.62-.9 6.23-3.13 6.22-1.76 0-1.9-2.55-2.34-3.9-1.85-5.66-4.62-11-6.67-16.67-1.81-5-4.8-9.59-5.89-14.81-.2-.92-.82-2.69-.4-3.65.75-1.7 4.22-3.23 5.12-.91 0-2.15 2.09-6.19 6.32-4.37 0 0 10-5.86 13.1-7.22a179.934 179.934 0 0 1 24.36-8.84c8.3-2.32 17.36.72 25.61 2 7.51 1.2 15.07 3.09 22.32 5 3.14.81 8.3 2.06 8.44 5.15",
    fill: "#ABDDDF"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M91.53 155.06c-6.46 2.3-12.4 7.28-18.55 10.45-4.08 2.11-8.09 4.51-12.31 6.17 1.57 3.54-6.25 7.8-5.2 1.82.12 1.62-.9 6.23-3.13 6.22-1.76 0-1.9-2.55-2.34-3.9-1.85-5.66-4.62-11-6.67-16.67-1.81-5-4.8-9.59-5.89-14.81-.2-.92-.82-2.69-.4-3.65.75-1.7 4.22-3.23 5.12-.91 0-2.15 2.09-6.19 6.32-4.37 0 0 10-5.86 13.1-7.22a179.934 179.934 0 0 1 24.36-8.84c8.3-2.32 17.36.72 25.61 2 7.51 1.2 15.07 3.09 22.32 5 3.14.81 8.3 2.06 8.44 5.15",
    stroke: "#ABDDDF",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M111.55 121.39c1.8 1.4 17.75 7.74 16.5 9.72",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M89 131.66v2.83c6.55.29 11.7 2.16 11.31 6.21-.26 2.77-6.22 5.59-11.31 7.61V243a33.082 33.082 0 0 1 6.8-.75c6.13 0 5.33 4.74 1.56 8.67-2.45 2.55-5.46 5.5-8.36 8.25v5.07h238.5V131.66H89Z",
    fill: "#442257",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M196.41 194.1c-2.87-2.2-6-4.75-7.53-8-3-6.51-1.53-15.87 7.63-13.8 4.7 1.05 7.32 5 11 7.33 3-5.45 5-12.2 11.78-11.22 6.78.98 6.37 8.64 4.16 15.4a56.935 56.935 0 0 1-8.62 16.07 5.656 5.656 0 0 1-7.21 1.4 106.368 106.368 0 0 1-11.21-7.18Z",
    fill: "#F15D4A",
    stroke: "#F15D4A",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M177.3 180.1c-1.28-5.64-3.6-13.48 3.31-16.5 5.43-2.37 13.49 4.69 16.38-2.92 2.79-7.38-1.55-16.62-9.54-17.68-6.62-.89-20 0-25 5.21-6.45 6.7-2.78 19.14-2 27.17.59 6.28-.81 15.5 3.84 20.52 2.69 2.91 12.79 6.77 16.08 3.16 3.56-3.87-2.13-14.81-3.07-18.96ZM227 159.25c-4-2-8.47-.62-12.11 1-3.64 1.62-8-.79-7.38-6.37.62-5.58 7-11.2 17-12.06 15.23-1.31 28.67 5.82 29.78 21.83.64 9.17.88 24.2-5.39 31.88-2 2.5-8.71 5.86-12.11 5.07-3.4-.79-3.7-4.39-3.86-7.6-.34-7.13.95-14.37.38-21.49a24.342 24.342 0 0 0-1.48-7.23 9.69 9.69 0 0 0-4.83-5.03v0ZM149.79 196.29a67.928 67.928 0 0 0 8.09 8.09M150.74 209.44c2 2.11 3.86 4.19 6.19 5.29M151.69 220.29a15.515 15.515 0 0 0 4.44 3.51M156.35 234a9.547 9.547 0 0 1-3-1.9M267.38 196.29c-1.49 2.66-7 6.5-9.48 8.15M268.48 208.07a23.821 23.821 0 0 1-7.42 6.18M267.16 220.59a38.665 38.665 0 0 1-4.47 3.57M263 233.41a8.715 8.715 0 0 0 1.93-1.06M168.18 242.28c-1.35-6.09-1.56-12.58-1.81-18.8-.16-4.1-1.29-10.8 2.33-13.78 3.19-2.62 6.23-.79 9.56-.21 3 .52 6 0 9-.24 7.18-.48 13.05 4 6.63 9.95-6.22 5.78-12.28 11.34-14.59 19.85-1.68 6.28-9.77 9.32-11.12 3.23ZM205.71 225c-1.31-4.11 1.6-7.19 5.54-8.21 5.49-1.42 10.18 2.9 15.3 3.08 6.45.23 4.14-4.34 4.54-8.2.35-3.43 3.21-4.18 6.47-4 8.74.52 13.88 8.19 14.13 16.36.29 9.25-7.67 17.48-16.45 19.31-7.45 1.56-17.4-1.48-22.54-6.88a31.63 31.63 0 0 1-6.99-11.46v0ZM181.36 255.48c0-9.08 7.76-18.14 15.67-15.79 5.9 1.74 8.73 8.14 14.47 10.06 1.68.56 13.12 1.33 8.86 6.07-1.16 1.29-8.4.44-9.78.44-4.83 0-9.59-.17-14.37-.37-4.78-.2-14.85-.41-14.85-.41Z",
    stroke: "#FAB550",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M70.26 160.22c2.77-2 4.31-5.32 6.81-7.42 1.53-1.27 3.75-1.38 5.56-2.1 3.6-1.42 17.26-5.77 17.66-10 .56-5.8-10.24-7.13-20.26-5.74",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M83.44 264.34c4.05-3.69 9.78-9.12 13.9-13.41 3.77-3.93 4.57-8.65-1.56-8.67-6.13-.02-11.63 2-17.49 3.91-8.63 2.86-17.24 5.43-25.88 8.25-2.65.87-4.24 1.38-6.64.88-1.78-.37-.47-2.14-3.21-1.11a4.221 4.221 0 0 0-2.62 3.79c-2.33-5.77-5.79.37-5.44 3.79.42 4.12 1 7.28 1.6 11.34.81 5.51 1.72 11.37 3.55 16.62.93 2.67 1.89 7.34 4 9.3 3.94 3.74 6.42-1.59 6.43-5.61 1.38 4.57 5.69 1.06 6.23-2.54",
    fill: "#ABDDDF"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M83.44 264.34c4.05-3.69 9.78-9.12 13.9-13.41 3.77-3.93 4.57-8.65-1.56-8.67-6.13-.02-11.63 2-17.49 3.91-8.63 2.86-17.24 5.43-25.88 8.25-2.65.87-4.24 1.38-6.64.88-1.78-.37-.47-2.14-3.21-1.11a4.221 4.221 0 0 0-2.62 3.79c-2.33-5.77-5.79.37-5.44 3.79.42 4.12 1 7.28 1.6 11.34.81 5.51 1.72 11.37 3.55 16.62.93 2.67 1.89 7.34 4 9.3 3.94 3.74 6.42-1.59 6.43-5.61 1.38 4.57 5.69 1.06 6.23-2.54",
    stroke: "#ABDDDF",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ React.createElement(import_react_native_svg.Path, {
    d: "M40.73 256.53c.38 1.64.59 4.73 1.1 5.52M53.63 274.64c.94 3.54 3.35 13 3.59 16.24M237.66 629.86v-12.3M282 628.15c.593-3.977.977-7.983 1.15-12M180.27 628.15v-12M138 629.72V616",
    stroke: "#442257",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BodyViewIllustration,
  HealthSolutionIllustration
});
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
