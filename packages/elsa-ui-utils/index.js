var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
        function createElement(type, config, children) {
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
        function forwardRef(render) {
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
        function memo(type, compare) {
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
        function useState2(initialState) {
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
          var element = createElement.apply(this, arguments);
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
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useEffect = useEffect;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState2;
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

// ../data-fns/dist/index.js
var require_dist = __commonJS({
  "../data-fns/dist/index.js"(exports, module2) {
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp2.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
    var __objRest = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      conditions: () => conditions,
      donparMap: () => donparMap2,
      investigation: () => investigation,
      labTests: () => labTests,
      medications: () => medications,
      nextSteps: () => nextSteps_exports,
      symptoms: () => symptoms,
      symptomsLocale: () => symptomsLocale2
    });
    module2.exports = __toCommonJS2(src_exports);
    var nextSteps_exports = {};
    __export2(nextSteps_exports, {
      basic: () => basic,
      extended: () => extended
    });
    var severe_malaria = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "paracetamol-every-4-6-hours-until-symptoms-disappear",
          text: "Paracetamol, every 4-6 hours until symptoms disappear."
        }
      ],
      "test-recommendations": [
        {
          id: "mrdt",
          text: "MRDT"
        }
      ],
      "other-recommendations": "Recommended that patients use insecticide-treated nets (ITNs) ."
    };
    var malaria = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
      refer: false,
      medications: [
        {
          id: "artemether-lumefantrine-alu-first-dose-2-mg-kg-artemether-and-12-mg-kg-lumefantrine-for-uncomplicated-malaria",
          text: "Artemether-Lumefantrine (ALU), first dose, 2mg/kg Artemether and 12mg/kg Lumefantrine, for uncomplicated malaria.   "
        },
        {
          id: "diazepam-0-5-mg-kg-delivered-rectally",
          text: "Diazepam, 0.5mg/kg, delivered rectally"
        }
      ],
      "test-recommendations": [
        {
          id: "mrdt",
          text: "MRDT"
        }
      ],
      "other-recommendations": "Begin patient on ALU/Quinine and document with patient. Give diazepam if convulsing and document."
    };
    var pneumonia = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "amoxycillin-capsule-250-mg-for-over-10-years-given-250-500-mg-every-8-hours-for-5-days",
          text: "Amoxycillin capsule, 250mg. For over 10 years, given 250-500mg every 8 hours for 5 days.  "
        },
        {
          id: "cough-suppressants-as-needed",
          text: "Cough suppressants, as needed."
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          text: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": "If the patient is a smoker, recommend that they stop smoking."
    };
    var tb = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          text: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "gene-xpert",
          text: "GeneXpert"
        },
        {
          id: "sputum-culture",
          text: "Sputum Culture"
        }
      ]
    };
    var coryza = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
      refer: false,
      medications: [
        {
          id: "antihistamines-if-available",
          text: "Antihistamines (If available)"
        },
        {
          id: "paracetamol-syrup-for-children-10-mg-kg-as-needed",
          text: "Paracetamol (syrup for children), 10mg/kg, as needed"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids."
    };
    var sinusitis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience severe pain, difficulty breathing, or excessive and recurrent coughing.",
      refer: false,
      medications: [
        {
          id: "erythromycin",
          text: "Erythromycin"
        },
        {
          id: "nasal-decongestants",
          text: "Nasal Decongestants "
        },
        {
          id: "paracetamol-10-mg-kg-as-needed",
          text: "Paracetamol, 10mg/kg, as needed"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": "Recommend the patient uses a warm compresses to ease pain in the nose and sinuses."
    };
    var bronchiolitis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
      refer: false,
      medications: [
        {
          id: "nonsteroidal-anti-inflammatory-drug",
          text: "Nonsteroidal anti-inflammatory drug"
        },
        {
          id: "nsai-ds",
          text: "(NSAIDs)"
        },
        {
          id: "bronchodilator",
          text: "Bronchodilator"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection."
    };
    var bronchitis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
      refer: false,
      medications: [
        {
          id: "nonsteroidal-anti-inflammatory-drug",
          text: "Nonsteroidal anti-inflammatory drug"
        },
        {
          id: "nsai-ds",
          text: "(NSAIDs)"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          text: "Chest X-Ray (CXR)"
        }
      ],
      "other-recommendations": "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection."
    };
    var gastritis = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days if symptoms worsen.",
      refer: false,
      medications: [
        {
          id: "oral-rehydration-salts",
          text: "Oral rehydration salts"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP) "
        },
        {
          id: "h-pylori-stool-test",
          text: "H Pylori stool test"
        }
      ],
      "other-recommendations": "Recommend that the patient avoid acidic foods or foods that aggravate the pain. Patient should drink a lot of fluids."
    };
    var otitis_externa = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [
        {
          id: "ear-drops",
          text: "Ear drops"
        },
        {
          id: "paracetamol-as-needed",
          text: "Paracetamol, as needed."
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient stays away from swimming or putting water in their ears."
    };
    var supprative_otitis_media = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
      refer: true,
      medications: [
        {
          id: "antibiotic-ear-drops",
          text: "Antibiotic ear drops"
        },
        {
          id: "paracetamol-or-ibuprofen-as-needed",
          text: "Paracetamol or ibuprofen, as needed."
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient observes their symptoms and keeps their ear canal clean. Complications can occur such as loss of hearing."
    };
    var otitis_media = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek immediate care if If their symptoms get worse, do not resolve, or if there is tympanic perforation.",
      refer: false,
      medications: [
        {
          id: "amoxicillin-90-mg-kg-max-3-g-a-day-divided-into-3-doses-if-2-years-take-for-2-weeks-if-2-years-take-for-7-days",
          text: "Amoxicillin, 90mg/kg (max 3g a day) divided into 3 doses. If <2 years, take for 2 weeks. If >2 years, take for 7 days. "
        },
        {
          id: "ibuprofen",
          text: "Ibuprofen"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient stays away from swimming or putting water in their ears."
    };
    var trichuriasis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
      refer: false,
      medications: [
        {
          id: "albendazole-400-mg-one-time-per-day-for-3-days",
          text: "Albendazole, 400mg, one time per day for 3 days"
        },
        {
          id: "deworming-tablets",
          text: "Deworming tablets"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that patient practices good hygeine and regularly washes their hands. If the patient is a child, provide counseling on deworming tablets."
    };
    var conjunctivitis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if their symptoms do not resolve.",
      refer: false,
      medications: [
        {
          id: "gentamycin-eyedrops",
          text: "Gentamycin Eyedrops"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient practices good hygeine and regularly washes their hands."
    };
    var uti = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms or if their symptoms do not resolve.",
      refer: false,
      medications: [
        {
          id: "amoxicillin",
          text: "Amoxicillin"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "urinalysis",
          text: "Urinalysis"
        }
      ],
      "other-recommendations": "Provide counseling to patient on prevention menthods and recommend a follow-up after 5 months at a higher facility."
    };
    var dysentry = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "begin-dehydration-treatment",
          text: "Begin dehydration treatment"
        }
      ],
      "test-recommendations": [
        {
          id: "stool-analysis",
          text: "Stool Analysis"
        }
      ]
    };
    var malnutrition = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "oral-rehydration-salts",
          text: "Oral rehydration salts"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          text: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "hiv-rapid-test",
          text: "HIV Rapid Test"
        },
        {
          id: "mrdt",
          text: "MRDT"
        },
        {
          id: "electrolytes-test",
          text: "Electrolytes Test"
        }
      ]
    };
    var ascariasis_changed_from_helminthiasis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience severe abdominal pain, if the patient is underweight, or if there are any emergency signs.",
      refer: false,
      medications: [
        {
          id: "albendazole-400-mg-one-time-per-day-for-3-days",
          text: "Albendazole, 400mg, one time per day for 3 days"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient practices good hygeine and regularly washes their hands."
    };
    var asthma = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "inhaled-corticosteroids-if-available",
          text: "Inhaled Corticosteroids (if available)"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          text: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": "If the patient smokes, recommend that they stop smoking. Recommend that the patient avoids any triggers, if they are known."
    };
    var influenza = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
      refer: false,
      medications: [
        {
          id: "paracetamol",
          text: "Paracetamol"
        },
        {
          id: "nasal-decongestants",
          text: "Nasal decongestants"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids."
    };
    var tonsilitis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, if they cannot eat, if their symptoms come back, or if this is the second time with this condition.",
      refer: false,
      medications: [
        {
          id: "ampiclox",
          text: "Ampiclox"
        },
        {
          id: "paracetamol",
          text: "Paracetamol"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": "Recommend that the patient rests at home."
    };
    var laryngitis = {
      "triage-level": "24 hours",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 24 hours.",
      refer: true,
      medications: [],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient rests their voice."
    };
    var covid_19 = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, chest pain, or excessive coughing.",
      refer: false,
      medications: [
        {
          id: "paracetamol",
          text: "Paracetamol"
        },
        {
          id: "nasal-decongestants",
          text: "Nasal decongestants"
        },
        {
          id: "vitamin-c",
          text: "Vitamin C"
        },
        {
          id: "vitamin-d",
          text: "Vitamin D"
        },
        {
          id: "zinc",
          text: "Zinc"
        },
        {
          id: "amoxyclav",
          text: "Amoxyclav"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids."
    };
    var copd = {
      "triage-level": "2 weeks",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 weeks.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          text: "Chest X-Ray (CXR)"
        }
      ],
      "other-recommendations": "If the patient smokes, recommend that they stop smoking. Provide counseling to the patient on eating nutritious meals."
    };
    var syphillis = {
      "triage-level": "24 hours",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 24 hours.",
      refer: true,
      medications: [
        {
          id: "doxycycline-or-penicillin-for-early-infection",
          text: "Doxycycline or Penicillin (for early infection)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
    };
    var gonorrhea = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
      refer: true,
      medications: [],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
    };
    var hiv_aids = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "hiv-rapid-test",
          text: "HIV Rapid test"
        }
      ],
      "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
    };
    var bacterial_vaginosis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
      refer: false,
      medications: [
        {
          id: "metronidazole-500-mg-twice-daily-for-7-days",
          text: "Metronidazole, 500mg, twice daily for 7 days"
        }
      ],
      "test-recommendations": []
    };
    var vulvovaginal_candidiasis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
      refer: false,
      medications: [
        {
          id: "fluconazole-150-mg-single-dose",
          text: "Fluconazole, 150mg, single dose"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling to the patient on prevention practices and encourage good hygeine."
    };
    var trichomoniasis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [
        {
          id: "metronidazole-500-mg-twice-daily-for-7-days",
          text: "Metronidazole, 500mg, twice daily for 7 days"
        }
      ],
      "test-recommendations": []
    };
    var acute_watery_diarrhoea = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they are severely dehydrated or if their symptoms do not resolve.",
      refer: false,
      medications: [
        {
          id: "oral-rehydration-salts",
          text: "Oral Rehydration Salts"
        }
      ],
      "test-recommendations": [
        {
          id: "stool-analysis",
          text: "Stool analysis"
        }
      ],
      "other-recommendations": "Recommend that the patient rests at home."
    };
    var chlamydia = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
      refer: true,
      medications: [
        {
          id: "azithromycin-1-g-single-dose",
          text: "Azithromycin, 1g, single dose"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
    };
    var g_herpes = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": []
    };
    var pelvic_inflammatory_disease = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "pelvic-exam",
          text: "Pelvic Exam"
        },
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP) "
        },
        {
          id: "urinalysis",
          text: "Urinalysis"
        },
        {
          id: "ultrasound-of-pelvis",
          text: "Ultrasound of Pelvis"
        }
      ],
      "other-recommendations": "This condition can result in severe complications. Recommend that the patient seeks immediate care."
    };
    var genital_warts = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
      refer: false,
      medications: [
        {
          id: "imiquimod-or-trichloroacetic-acid",
          text: "Imiquimod or Trichloroacetic Acid"
        },
        {
          id: "other-topical-cream",
          text: "Other topical cream"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "If the warts continue to return or cause severe pain, recommend that the patient goes to a health facility for removal. Recommend that the patient gets an HPV vaccine if they have not yet done so."
    };
    var hpv = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "hpv-screening",
          text: "HPV Screening"
        }
      ]
    };
    var anemia = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [
        {
          id: "iron-supplements-ferrous-sulfate-325-3-tablets-per-day-taken-every-alternate-day-for-3-months",
          text: "Iron supplements (Ferrous Sulfate 325), 3 tablets per day, taken every alternate day for 3 months"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ]
    };
    var oral_thrush = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
      refer: true,
      medications: [
        {
          id: "nystatin-oral-gel-applies-three-times-a-day",
          text: "Nystatin oral gel, applies three times a day"
        }
      ],
      "test-recommendations": []
    };
    var typhoid = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3-5 days or if there are any emergency signs.",
      refer: false,
      medications: [
        {
          id: "ciprofloxacin-adults-500-mg-twice-daily-for-7-days-children-30-mg-kg-divided-in-two-doses-a-day-for-7-days",
          text: "Ciprofloxacin, (Adults) 500mg, twice daily for 7 days; (Children) 30mg/kg divided in two doses a day for 7 days"
        },
        {
          id: "oral-rehydration-salts-or-fluids-if-dehydrated",
          text: "Oral Rehydration Salts or Fluids (if dehydrated)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine."
    };
    var cholera = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3 days or if there are any emergency signs.",
      refer: false,
      medications: [
        {
          id: "azithromycin-200-mg-kg-single-dose",
          text: "Azithromycin, 200mg/kg, single dose"
        },
        {
          id: "oral-rehydration-salts-or-fluids-if-dehydrated",
          text: "Oral Rehydration Salts or Fluids (if dehydrated)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine."
    };
    var meningitis = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "spinal-fluid-tap",
          text: "Spinal Fluid Tap"
        }
      ]
    };
    var epilepsy = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [],
      "other-recommendations": "Provide epilepsy first aid to the patient."
    };
    var dehydration = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [
        {
          id: "oral-rehydration-salts-for-2-years-50-100-ml-after-each-loose-stool-for-2-years-100-200-ml-after-each-loose-stool-alternatively-give-ors-every-4-hours",
          text: "Oral Rehydration Salts, for <2 years, 50-100ml after each loose stool. For >2 years, 100-200ml after each loose stool. Alternatively, give ORS every 4 hours. "
        },
        {
          id: "fluids",
          text: "Fluids"
        },
        {
          id: "zinc-supplements-children-20-mg-per-day-for-14-days-10-mg-per-day-if-less-than-2-years",
          text: "Zinc supplements (children), 20mg per day for 14 days (10mg per day if less than 2 years)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "If the patient's symptoms are severe, recommend that they get treated at the hospital. If the child is breastfeeding, continue breastfeeding."
    };
    var htn = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "blood-pressure",
          text: "Blood Pressure"
        }
      ]
    };
    var scabies = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "scaboma",
          text: "Scaboma"
        }
      ],
      "test-recommendations": []
    };
    var gastroenteritis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience excessive pain, excessive vomitting or diarrhoea, if there are any emergency signs, or if the patient is pregnant",
      refer: false,
      medications: [
        {
          id: "oral-rehydration-salts-or-fluids-if-dehydrated",
          text: "Oral Rehydration Salts or Fluids (if dehydrated)"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": "Recommend that the patient rests and avoids eating milk-based foods."
    };
    var heat_rash = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [
        {
          id: "topical-corticosteroid-cream-if-severe-apply-2-3-times-a-day-on-the-affected-areas",
          text: "Topical Corticosteroid Cream (if severe), apply 2-3 times a day on the affected areas"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": "Recommend that the patient wear cool cotton clothing and that they ventilate their room."
    };
    var stomatitis = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ]
    };
    var bacteremia = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "blood-culture",
          text: "Blood Culture"
        }
      ]
    };
    var cephalohematoma = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [],
      "test-recommendations": [],
      "other-recommendations": "Provide counseling that the condition will likely go away on it's own. Recommend that the patient seeks medical care if the symptoms do not resolve."
    };
    var tinea_corporis = {
      "triage-level": "Home based care",
      "refer-and-triage-level": "The patient can recieve home based care.",
      refer: false,
      medications: [
        {
          id: "fluconzaole-for-adults-150-mg-once-a-week-for-4-weeks-for-children-7-mg-kg-once-a-week-for-4-weeks",
          text: "Fluconzaole, for adults: 150mg once a week for 4 weeks. For children: 7mg/kg once a week for 4 weeks"
        }
      ],
      "test-recommendations": []
    };
    var bact_skin_infection_impetigo = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        }
      ]
    };
    var umb_cord_sepsis = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "c-reactive-protein-crp",
          text: "C-reactive protein (CRP)"
        }
      ]
    };
    var sepsis_changed_from_septicaemia = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "blood-culture",
          text: "Blood Culture"
        }
      ]
    };
    var ped_hiv_aids = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "hiv-rapid-test",
          text: "HIV Rapid Test"
        },
        {
          id: "hiv-pcr",
          text: "HIV PCR"
        }
      ]
    };
    var hepatitis_b = {
      "triage-level": "2 days",
      "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days. They should seek medical care immediately if there are signs of liver failure.",
      refer: true,
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          text: "Full Blood Picture (FBP)"
        },
        {
          id: "hepatitis-b-surface-antigen-h-bs-ag",
          text: "Hepatitis B Surface Antigen (HBsAg)"
        },
        {
          id: "hepatitis-b-pcr-hbv-dna",
          text: "Hepatitis B PCR (HBV DNA)"
        },
        {
          id: "hepatitis-b-surface-antibody-hep-bs-ab",
          text: "Hepatitis B Surface Antibody (HepBsAb)"
        },
        {
          id: "liver-function-tests",
          text: "Liver Function Tests"
        },
        {
          id: "hiv-viral-load",
          text: "HIV Viral Load"
        }
      ]
    };
    var toxoplasmosis = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "n-a",
          text: "N/A"
        }
      ],
      "test-recommendations": [
        {
          id: "cd-4-count",
          text: "CD4 Count"
        },
        {
          id: "anti-toxoplasma-ig-g-serology",
          text: "Anti-Toxoplasma IgG Serology"
        },
        {
          id: "mri-or-ct",
          text: "MRI or CT"
        }
      ]
    };
    var pneumocystis_pneumonia = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "cough-suppressants-as-needed",
          text: "Cough suppressants, as needed."
        }
      ],
      "test-recommendations": [
        {
          id: "microscopy-of-sputum",
          text: "Microscopy of Sputum"
        },
        {
          id: "pcr-test-fungal-dna",
          text: "PCR Test (Fungal DNA)"
        }
      ],
      "other-recommendations": "If the patient is a smoker, recommend that they stop smoking."
    };
    var ectopic_pregnancy = {
      "triage-level": "Immediately",
      "refer-and-triage-level": "Refer the patient to a health facility immediately.",
      refer: true,
      medications: [
        {
          id: "surgery",
          text: "Surgery"
        }
      ],
      "test-recommendations": [
        {
          id: "pregnancy-test",
          text: "Pregnancy Test"
        },
        {
          id: "pelvic-exam",
          text: "Pelvic Exam"
        }
      ],
      "other-recommendations": "Recommend that the patient goes to a health facility immediately as they will likely need surgery."
    };
    var next_steps_basic_default = {
      "severe-malaria": severe_malaria,
      malaria,
      pneumonia,
      tb,
      coryza,
      sinusitis,
      bronchiolitis,
      bronchitis,
      gastritis,
      "otitis-externa": otitis_externa,
      "supprative-otitis-media": supprative_otitis_media,
      "otitis-media": otitis_media,
      trichuriasis,
      conjunctivitis,
      uti,
      dysentry,
      malnutrition,
      "ascariasis-changed-from-helminthiasis": ascariasis_changed_from_helminthiasis,
      asthma,
      influenza,
      tonsilitis,
      laryngitis,
      "covid-19": covid_19,
      copd,
      syphillis,
      gonorrhea,
      "hiv-aids": hiv_aids,
      "bacterial-vaginosis": bacterial_vaginosis,
      "vulvovaginal-candidiasis": vulvovaginal_candidiasis,
      trichomoniasis,
      "acute-watery-diarrhoea": acute_watery_diarrhoea,
      chlamydia,
      "g-herpes": g_herpes,
      "pelvic-inflammatory-disease": pelvic_inflammatory_disease,
      "genital-warts": genital_warts,
      hpv,
      anemia,
      "oral-thrush": oral_thrush,
      typhoid,
      cholera,
      meningitis,
      epilepsy,
      dehydration,
      htn,
      scabies,
      gastroenteritis,
      "heat-rash": heat_rash,
      stomatitis,
      bacteremia,
      cephalohematoma,
      "tinea-corporis": tinea_corporis,
      "bact-skin-infection-impetigo": bact_skin_infection_impetigo,
      "umb-cord-sepsis": umb_cord_sepsis,
      "sepsis-changed-from-septicaemia": sepsis_changed_from_septicaemia,
      "ped-hiv-aids": ped_hiv_aids,
      "hepatitis-b": hepatitis_b,
      toxoplasmosis,
      "pneumocystis-pneumonia": pneumocystis_pneumonia,
      "ectopic-pregnancy": ectopic_pregnancy
    };
    var complicated_malaria = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "paracetamol-every-4-6-hours-until-symptoms-disappear",
          en: "Paracetamol, every 4-6 hours until symptoms disappear.",
          sw: "Paracetamol, kila baada ya saa 4 au sita 6 mpaka dalili zinapoisha"
        }
      ],
      "test-recommendations": [
        {
          id: "mrdt",
          en: "MRDT"
        }
      ],
      "other-recommendations": {
        en: "Recommended that patients use insecticide-treated nets (ITNs).",
        sw: "Pendekeza wagonjwa kutumia chandarua chenye viuatilifu (ITNs)."
      }
    };
    var bronchiolitis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
      },
      medications: [
        {
          id: "nonsteroidal-anti-inflammatory-drugs-nsai-ds",
          en: "Nonsteroidal anti-inflammatory drugs (NSAIDs)"
        },
        {
          id: "bronchodilators",
          en: "Bronchodilators"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection.",
        sw: "Haishauriwi mgonjwa kutumia antibiotiki kwani haya sio maambukizi ya bakteria."
      }
    };
    var otitis_externa2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "ear-drops",
          en: "Ear drops",
          sw: "Ear drops"
        },
        {
          id: "paracetamol-as-needed",
          en: "Paracetamol, as needed.",
          sw: "Paracetamol, kama inavyohitajika"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient stays away from swimming or putting water in their ears.",
        sw: "Pendekeza kwamba mgonjwa anakaa mbali na kuogelea au kuweka maji masikioni."
      }
    };
    var supprative_otitis_media2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
      },
      medications: [
        {
          id: "antibiotic-ear-drops",
          en: "Antibiotic ear drops",
          sw: "Antibiotic ear drops"
        },
        {
          id: "paracetamol-or-ibuprofen-as-needed",
          en: "Paracetamol or ibuprofen, as needed.",
          sw: "Paracetamol au ibuprofen, kama inavyohitajika"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient observes their symptoms and keeps their ear canal clean. Complications can occur such as loss of hearing.",
        sw: "Inapendekezwa mgonjwa aangalie dalili zake na kuhakikisha kuwa masikio yake yanakuwa safi. Matatizo yanaweza kutokea kama vile kupoteza usikivu."
      }
    };
    var pneumocystis_pneumonia2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "cough-suppressants-as-needed",
          en: "Cough suppressants, as needed.",
          sw: "Dawa za kupunguza kukohoa, kama inavyohitajika"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "If the patient is a smoker, recommend that they stop smoking.",
        sw: "Ikiwa mgonjwa anavuta sigara, pendekeza aache sigara."
      }
    };
    var ectopic_pregnancy2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "surgery",
          en: "Surgery",
          sw: "Upasuaji"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient goes to a health facility immediately as they will likely need surgery.",
        sw: ""
      }
    };
    var pelvic_inflammatory_disease2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "pelvic-exam",
          en: "Pelvic Exam"
        },
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP) "
        },
        {
          id: "urinalysis",
          en: "Urinalysis"
        },
        {
          id: "ultrasound-of-pelvis",
          en: "Ultrasound of Pelvis"
        }
      ],
      "other-recommendations": {
        en: "This condition can result in severe complications. Recommend that the patient seeks immediate care.",
        sw: ""
      }
    };
    var genital_warts2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
      },
      medications: [
        {
          id: "imiquimod-or-trichloroacetic-acid",
          en: "Imiquimod or Trichloroacetic Acid"
        },
        {
          id: "other-topical-cream",
          en: "Other topical cream"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "If the warts continue to return or cause severe pain, recommend that the patient goes to a health facility for removal. Recommend that the patient gets an HPV vaccine if they have not yet done so.",
        sw: ""
      }
    };
    var malaria2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
      },
      medications: [
        {
          id: "artemether-lumefantrine-alu-first-dose-2-mg-kg-artemether-and-12-mg-kg-lumefantrine-for-uncomplicated-malaria",
          en: "Artemether-Lumefantrine (ALU), first dose, 2mg/kg Artemether and 12mg/kg Lumefantrine, for uncomplicated malaria.   "
        },
        {
          id: "diazepam-0-5-mg-kg-delivered-rectally",
          en: "Diazepam, 0.5mg/kg, delivered rectally"
        }
      ],
      "test-recommendations": [
        {
          id: "mrdt",
          en: "MRDT"
        }
      ],
      "other-recommendations": {
        en: "Begin patient on ALU/Quinine and document with patient. Give diazepam if convulsing and document.",
        sw: "Mwanzishie mgojwa ALU / Quinine na andika na mgonjwa. Toa diazepam ikiwa unasumbua na andika."
      }
    };
    var pneumonia2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "amoxycillin-capsule-250-mg-for-over-10-years-given-250-500-mg-every-8-hours-for-5-days",
          en: "Amoxycillin capsule, 250mg. For over 10 years, given 250-500mg every 8 hours for 5 days.  ",
          sw: "Amoxycillin kapsuli, 250mg. Mtu mzima na watoto zaidi ya miaka 10 wapewe 250-500mg kila baada ya masaa 8 kwa siku 5."
        },
        {
          id: "cough-suppressants-as-needed",
          en: "Cough suppressants, as needed.",
          sw: "Dawa za kupunguza kukohoa, kama inavyohitajika"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          en: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "If the patient is a smoker, recommend that they stop smoking.",
        sw: "Ikiwa mgonjwa anavuta sigara, pendekeza aache sigara."
      }
    };
    var tuberculosis = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          en: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "gene-xpert",
          en: "GeneXpert"
        },
        {
          id: "sputum-culture",
          en: "Sputum Culture"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var coryza2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata shida kupumua au kukohoa kupita kiasi."
      },
      medications: [
        {
          id: "antihistamines-if-available",
          en: "Antihistamines (If available)",
          sw: "Antihistamines (Ikiwa inapatikana)"
        },
        {
          id: "paracetamol-syrup-for-children-10-mg-kg-as-needed",
          en: "Paracetamol (syrup for children), 10mg/kg, as needed",
          sw: "Paracetamol (dawa ya maji kwa watoto), 10mg / kg, kama inavyohitajika"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
        sw: "Pendekeza kwamba mgonjwa ajitenge na atibu dalili. Mgonjwa anapaswa kupumzika na kunywa maji mengi."
      }
    };
    var sinusitis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience severe pain, difficulty breathing, or excessive and recurrent coughing.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata maumivu makali, kupumua kwa shida, au kukohoa kupindukia na mara kwa mara."
      },
      medications: [
        {
          id: "erythromycin",
          en: "Erythromycin",
          sw: "Erythromycin"
        },
        {
          id: "nasal-decongestants",
          en: "Nasal Decongestants ",
          sw: "Vipunguzi vya pua"
        },
        {
          id: "paracetamol-10-mg-kg-as-needed",
          en: "Paracetamol, 10mg/kg, as needed",
          sw: "Paracetamol, 10mg / kg, kama inavyohitajika"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "Recommend the patient uses a warm compresses to ease pain in the nose and sinuses.",
        sw: "Pendekeza mgonjwa atumie kitambaa chenye maji ya vuguvugu kupunguza maumivu kwenye pua."
      }
    };
    var bronchitis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
      },
      medications: [
        {
          id: "nonsteroidal-anti-inflammatory-drugs-nsai-ds",
          en: "Nonsteroidal anti-inflammatory drugs (NSAIDs)"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          en: "Chest X-Ray (CXR)"
        }
      ],
      "other-recommendations": {
        en: "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection.",
        sw: "Haishauriwi mgonjwa kutumia antibiotiki kwani haya sio maambukizi ya bakteria."
      }
    };
    var gastritis2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
      },
      medications: [
        {
          id: "oral-rehydration-salts-ors",
          en: "Oral rehydration salts (ORS)"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP) "
        },
        {
          id: "h-pylori-stool-test",
          en: "H-Pylori stool test"
        }
      ],
      "other-recommendations": {
        en: "Recommend that the patient avoid acidic foods or foods that aggravate the pain. Patient should drink a lot of fluids.",
        sw: "Pendekeza mgonjwa aepuke vyakula vyenye tindikali au vyakula vinavyoongeza maumivu. Mgonjwa anapaswa kunywa maji mengi."
      }
    };
    var otitis_media2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek immediate care if If their symptoms get worse, do not resolve, or if there is tympanic perforation.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta huduma ya haraka ikiwa dalili zao zinazidi kuwa mbaya, usitatue, au ikiwa kuna tympanic perforation."
      },
      medications: [
        {
          id: "amoxicillin-90-mg-kg-max-3-g-a-day-divided-into-3-doses-if-2-years-take-for-2-weeks-if-2-years-take-for-7-days",
          en: "Amoxicillin, 90mg/kg (max 3g a day) divided into 3 doses. If <2 years, take for 2 weeks. If >2 years, take for 7 days. "
        },
        {
          id: "ibuprofen",
          en: "Ibuprofen"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient stays away from swimming or putting water in their ears.",
        sw: "Pendekeza kwamba mgonjwa anakaa mbali na kuogelea au kuweka maji masikioni."
      }
    };
    var trichuriasis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
      },
      medications: [
        {
          id: "albendazole-400-mg-one-time-per-day-for-3-days",
          en: "Albendazole, 400mg, one time per day for 3 days"
        },
        {
          id: "deworming-tablets",
          en: "Deworming tablets"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that patient practices good hygeine and regularly washes their hands. If the patient is a child, provide counseling on deworming tablets.",
        sw: "Pendekeza kwamba mgonjwa kuzingatia usafi na anaosha mikono mara kwa mara. Ikiwa mgonjwa ni mtoto, toa ushauri juu ya vidonge vya minyoo."
      }
    };
    var conjunctivitis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if their symptoms do not resolve.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao hazipungui."
      },
      medications: [
        {
          id: "gentamycin-eyedrops",
          en: "Gentamycin Eyedrops"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient practices good hygeine and regularly washes their hands.",
        sw: "Pendekeza kwamba mgonjwa kuzingatia usafi na anaosha mikono mara kwa mara."
      }
    };
    var urinary_tract_infection_uti = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms or if their symptoms do not resolve.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata kuzidi kwa dalili zao au ikiwa dalili zao hazipungui"
      },
      medications: [
        {
          id: "amoxicillin",
          en: "Amoxicillin"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "urinalysis",
          en: "Urinalysis"
        }
      ],
      "other-recommendations": {
        en: "Provide counseling to patient on prevention menthods and recommend a follow-up after 5 months at a higher facility.",
        sw: "Toa ushauri kwa mgonjwa juu ya vidokezo vya kuzuia na kupendekeza ufuatiliaji baada ya miezi 5 katika kituo cha afya cha juu."
      }
    };
    var dysentry2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "oral-rehydration-salts-ors",
          en: "Oral rehydration salts (ORS)"
        }
      ],
      "test-recommendations": [
        {
          id: "stool-analysis",
          en: "Stool Analysis"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var malnutrition2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "oral-rehydration-salts-ors",
          en: "Oral rehydration salts (ORS)"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          en: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "hiv-rapid-test",
          en: "HIV Rapid Test"
        },
        {
          id: "mrdt",
          en: "MRDT"
        },
        {
          id: "electrolytes-test",
          en: "Electrolytes Test"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var ascariasis = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience severe abdominal pain, if the patient is underweight, or if there are any emergency signs.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata maumivu makali ya tumbo, ikiwa mgonjwa ana uzito mdogo, au ikiwa kuna dalili zozote za dharura."
      },
      medications: [
        {
          id: "albendazole-400-mg-one-time-per-day-for-3-days",
          en: "Albendazole, 400mg, one time per day for 3 days"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient practices good hygeine and regularly washes their hands.",
        sw: "Pendekeza kwamba mgonjwa kuzingatia usafi na anaosha mikono mara kwa mara."
      }
    };
    var asthma2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [
        {
          id: "inhaled-corticosteroids-if-available",
          en: "Inhaled Corticosteroids (if available)"
        }
      ],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          en: "Chest X-Ray (CXR)"
        },
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "If the patient smokes, recommend that they stop smoking. Recommend that the patient avoids any triggers, if they are known.",
        sw: "Ikiwa mgonjwa anavuta sigara, pendekeza waache sigara. Pendekeza kwamba mgonjwa anaepuka vichocheo vyovyote, ikiwa vinajulikana."
      }
    };
    var influenza2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata shida kupumua au kukohoa kupita kiasi."
      },
      medications: [
        {
          id: "paracetamol",
          en: "Paracetamol",
          sw: "Paracetamol"
        },
        {
          id: "nasal-decongestants",
          en: "Nasal decongestants",
          sw: "Vipunguzi vya pua"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
        sw: "Pendekeza kwamba mgonjwa ajitenge na atibu dalili. Mgonjwa anapaswa kupumzika na kunywa maji mengi."
      }
    };
    var tonsilitis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, if they cannot eat, if their symptoms come back, or if this is the second time with this condition.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata shida kupumua, ikiwa hawawezi kula, ikiwa dalili zao zinarudi, au ikiwa hii ni mara ya pili kuwa na hali hii."
      },
      medications: [
        {
          id: "ampiclox",
          en: "Ampiclox"
        },
        {
          id: "paracetamol",
          en: "Paracetamol"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "Recommend that the patient rests at home.",
        sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
      }
    };
    var laryngitis2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 24 hours.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya masaa 24."
      },
      medications: [],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient rests their voice.",
        sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
      }
    };
    var chronic_obstructive_pulmonary_disease_copd = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 weeks.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya wiki 2."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "chest-x-ray-cxr",
          en: "Chest X-Ray (CXR)"
        }
      ],
      "other-recommendations": {
        en: "If the patient smokes, recommend that they stop smoking. Provide counseling to the patient on eating nutritious meals.",
        sw: "Ikiwa mgonjwa anavuta sigara, pendekeza waache sigara. Toa ushauri kwa mgonjwa juu ya kula chakula chenye lishe."
      }
    };
    var syphillis2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 24 hours.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya masaa 24."
      },
      medications: [
        {
          id: "doxycycline-or-penicillin-for-early-infection",
          en: "Doxycycline or Penicillin (for early infection)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
        sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
      }
    };
    var gonorrhea2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
      },
      medications: [],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
        sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
      }
    };
    var hiv_aids2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "hiv-rapid-test",
          en: "HIV Rapid Test"
        },
        {
          id: "hiv-pcr",
          en: "HIV PCR"
        }
      ],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
        sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
      }
    };
    var bacterial_vaginosis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata dalili hizi mara kwa mara au ikiwa hali yao ni ya kawaida."
      },
      medications: [
        {
          id: "metronidazole-500-mg-twice-daily-for-7-days",
          en: "Metronidazole, 500mg, twice daily for 7 days"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention practices and encourage good hygeine.",
        sw: "Toa ushauri kwa mgonjwa juu ya kuzuia na kuhimiza usafi mzuri."
      }
    };
    var vulvovaginal_candidiasis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata dalili hizi mara kwa mara au ikiwa hali yao ni ya kawaida."
      },
      medications: [
        {
          id: "fluconazole-150-mg-single-dose",
          en: "Fluconazole, 150mg, single dose"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention practices and encourage good hygeine.",
        sw: "Toa ushauri kwa mgonjwa juu ya kuzuia na kuhimiza usafi mzuri."
      }
    };
    var trichomoniasis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "metronidazole-500-mg-twice-daily-for-7-days",
          en: "Metronidazole, 500mg, twice daily for 7 days"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention practices and encourage good hygeine.",
        sw: "Toa ushauri kwa mgonjwa juu ya kuzuia na kuhimiza usafi mzuri."
      }
    };
    var acute_watery_diarrhoea2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they are severely dehydrated or if their symptoms do not resolve.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wamepungukiwa na maji mwilini sana au ikiwa dalili zao hazipungui."
      },
      medications: [
        {
          id: "oral-rehydration-salts-ors",
          en: "Oral Rehydration Salts (ORS)"
        }
      ],
      "test-recommendations": [
        {
          id: "stool-analysis",
          en: "Stool analysis"
        }
      ],
      "other-recommendations": {
        en: "Recommend that the patient rests at home.",
        sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
      }
    };
    var chlamydia2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
      },
      medications: [
        {
          id: "azithromycin-1-g-single-dose",
          en: "Azithromycin, 1g, single dose"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
        sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
      }
    };
    var genital_herpes = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var human_papillomavirus_hpv = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "hpv-screening",
          en: "HPV Screening"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var anaemia = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "iron-supplements-ferrous-sulfate-325-3-tablets-per-day-taken-every-alternate-day-for-3-months",
          en: "Iron supplements (Ferrous Sulfate 325), 3 tablets per day, taken every alternate day for 3 months",
          sw: "Vidonge vya madini ya chuma (Ferrous Sulfate 325), vidonge 3 kwa siku, hutumiwa kila siku mbadala kwa miezi 3"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var oral_thrush2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
      },
      medications: [
        {
          id: "nystatin-oral-gel-applies-three-times-a-day",
          en: "Nystatin oral gel, applies three times a day"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var typhoid2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3-5 days or if there are any emergency signs.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinadumu zaidi ya siku 3-5 au ikiwa kuna dalili za dharura."
      },
      medications: [
        {
          id: "ciprofloxacin-adults-500-mg-twice-daily-for-7-days-children-30-mg-kg-divided-in-two-doses-a-day-for-7-days",
          en: "Ciprofloxacin, (Adults) 500mg, twice daily for 7 days; (Children) 30mg/kg divided in two doses a day for 7 days",
          sw: "Ciprofloxacin, (Watu wazima) 500mg, mara mbili kwa siku kwa siku 7; (Watoto) 30mg / kg imegawanywa katika dozi mbili kwa siku kwa siku 7"
        },
        {
          id: "oral-rehydration-salts-or-fluids-if-dehydrated",
          en: "Oral Rehydration Salts or Fluids (if dehydrated)",
          sw: "Oral Rehydration Salts or Fluids (if dehydrated)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine.",
        sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia na kuwatia moyo wafanye usafi mzuri."
      }
    };
    var cholera2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3 days or if there are any emergency signs.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinadumu zaidi ya siku 3 au ikiwa kuna dalili zozote za dharura."
      },
      medications: [
        {
          id: "azithromycin-200-mg-kg-single-dose",
          en: "Azithromycin, 200mg/kg, single dose"
        },
        {
          id: "oral-rehydration-salts-or-fluids-if-dehydrated",
          en: "Oral Rehydration Salts or Fluids (if dehydrated)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine.",
        sw: ""
      }
    };
    var meningitis2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "spinal-fluid-tap",
          en: "Spinal Fluid Tap"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var epilepsy2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide epilepsy first aid to the patient.",
        sw: "Toa msaada wa kwanza wa ugonjwa wa kifafa kwa mgonjwa."
      }
    };
    var dehydration2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "oral-rehydration-salts-for-2-years-50-100-ml-after-each-loose-stool-for-2-years-100-200-ml-after-each-loose-stool-alternatively-give-ors-every-4-hours",
          en: "Oral Rehydration Salts, for <2 years, 50-100ml after each loose stool. For >2 years, 100-200ml after each loose stool. Alternatively, give ORS every 4 hours. "
        },
        {
          id: "fluids",
          en: "Fluids"
        },
        {
          id: "zinc-supplements-children-20-mg-per-day-for-14-days-10-mg-per-day-if-less-than-2-years",
          en: "Zinc supplements (children), 20mg per day for 14 days (10mg per day if less than 2 years)"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "If the patient's symptoms are severe, recommend that they get treated at the hospital. If the child is breastfeeding, continue breastfeeding.",
        sw: "Ikiwa dalili za mgonjwa ni kali, pendekeza watibiwe hospitalini. Ikiwa mtoto ananyonyesha, endelea kunyonyesha."
      }
    };
    var hypertension = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "blood-pressure",
          en: "Blood Pressure"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var scabies2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "scaboma-or-benzyl-benzoate-bbe-25-topical-cream",
          en: "Scaboma or Benzyl benzoate (BBE - 25%) topical cream"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "After bathing, the patient should apply cream to the whole body - except the face and head - and should stay 24 hours without bathing. Repeat the spray on the third and fifth day.",
        sw: "Baada ya kuoga, mgonjwa apake mwili mzima isipokuwa uso na kichwa na mgonjwa akae saa 24 bila kuoga. Rudia kupaka dawa siku ya tatu na ya tano."
      }
    };
    var gastroenteritis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care. They should seek medical attention if they experience excessive pain, excessive vomitting or diarrhoea, if there are any emergency signs, or if the patient is pregnant",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata maumivu kupindukia, kutapika kupita kiasi au kuharisha, ikiwa kuna dalili zozote za dharura, au ikiwa mgonjwa ni mjamzito"
      },
      medications: [
        {
          id: "oral-rehydration-salts-or-fluids-if-dehydrated",
          en: "Oral Rehydration Salts or Fluids (if dehydrated)"
        }
      ],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "Recommend that the patient rests and avoids eating milk-based foods.",
        sw: "Pendekeza kwamba mgonjwa anapumzika na aepuka kula vyakula vyenye maziwa."
      }
    };
    var heat_rash2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "topical-corticosteroid-cream-if-severe-apply-2-3-times-a-day-on-the-affected-areas",
          en: "Topical Corticosteroid Cream (if severe), apply 2-3 times a day on the affected areas",
          sw: "Cream ya juu ya Corticosteroid (ikiwa kali), tumia mara 2-3 kwa siku kwenye maeneo yaliyoathiriwa"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Recommend that the patient wear cool cotton clothing and that they ventilate their room.",
        sw: "Pendekeza kwamba mgonjwa avae nguo za pamba zenye baridi na kwamba kuwepo na hewa ya kutosha chumba chake."
      }
    };
    var stomatitis2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var bacteremia2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "blood-culture",
          en: "Blood Culture"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var cephalohematoma2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "",
          en: "-"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "Provide counseling that the condition will likely go away on it's own. Recommend that the patient seeks medical care if the symptoms do not resolve.",
        sw: "Toa ushauri kwamba hali hiyo itaenda yenyewe. Pendekeza kwamba mgonjwa atafute huduma ya matibabu ikiwa dalili hazitatatua."
      }
    };
    var tinea_corporis2 = {
      "refer-and-triage-level": {
        en: "The patient can recieve home based care.",
        sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
      },
      medications: [
        {
          id: "fluconzaole-for-adults-150-mg-once-a-week-for-4-weeks-for-children-7-mg-kg-once-a-week-for-4-weeks",
          en: "Fluconzaole, for adults: 150mg once a week for 4 weeks. For children: 7mg/kg once a week for 4 weeks"
        }
      ],
      "test-recommendations": [],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var impetigo = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var umbilical_cord_sepsis = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "c-reactive-protein-crp",
          en: "C-reactive protein (CRP)"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var sepsis = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "blood-culture",
          en: "Blood Culture"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var pediatric_hiv_aids = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "hiv-rapid-test",
          en: "HIV Rapid Test"
        },
        {
          id: "hiv-pcr",
          en: "HIV PCR"
        }
      ],
      "other-recommendations": {
        en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
        sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
      }
    };
    var hepatitis_b2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility. They should seek care within 2 days. They should seek medical care immediately if there are signs of liver failure.",
        sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2. Wanapaswa kutafuta huduma ya matibabu mara moja ikiwa kuna dalili za kufeli kwa ini."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "full-blood-picture-fbp",
          en: "Full Blood Picture (FBP)"
        },
        {
          id: "hepatitis-b-surface-antigen-h-bs-ag",
          en: "Hepatitis B Surface Antigen (HBsAg)"
        },
        {
          id: "hepatitis-b-pcr-hbv-dna",
          en: "Hepatitis B PCR (HBV DNA)"
        },
        {
          id: "hepatitis-b-surface-antibody-hep-bs-ab",
          en: "Hepatitis B Surface Antibody (HepBsAb)"
        },
        {
          id: "liver-function-tests",
          en: "Liver Function Tests"
        },
        {
          id: "hiv-viral-load",
          en: "HIV Viral Load"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var toxoplasmosis2 = {
      "refer-and-triage-level": {
        en: "Refer the patient to a health facility immediately.",
        sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
      },
      medications: [],
      "test-recommendations": [
        {
          id: "cd-4-count",
          en: "CD4 Count"
        },
        {
          id: "anti-toxoplasma-ig-g-serology",
          en: "Anti-Toxoplasma IgG Serology"
        },
        {
          id: "mri-or-ct",
          en: "MRI or CT"
        }
      ],
      "other-recommendations": {
        en: "",
        sw: ""
      }
    };
    var next_steps_extended_default = {
      "complicated-malaria": complicated_malaria,
      bronchiolitis: bronchiolitis2,
      "otitis-externa": otitis_externa2,
      "supprative-otitis-media": supprative_otitis_media2,
      "pneumocystis-pneumonia": pneumocystis_pneumonia2,
      "ectopic-pregnancy": ectopic_pregnancy2,
      "pelvic-inflammatory-disease": pelvic_inflammatory_disease2,
      "genital-warts": genital_warts2,
      malaria: malaria2,
      pneumonia: pneumonia2,
      tuberculosis,
      coryza: coryza2,
      sinusitis: sinusitis2,
      bronchitis: bronchitis2,
      gastritis: gastritis2,
      "otitis-media": otitis_media2,
      trichuriasis: trichuriasis2,
      conjunctivitis: conjunctivitis2,
      "urinary-tract-infection-uti": urinary_tract_infection_uti,
      dysentry: dysentry2,
      malnutrition: malnutrition2,
      ascariasis,
      asthma: asthma2,
      influenza: influenza2,
      tonsilitis: tonsilitis2,
      laryngitis: laryngitis2,
      "chronic-obstructive-pulmonary-disease-copd": chronic_obstructive_pulmonary_disease_copd,
      syphillis: syphillis2,
      gonorrhea: gonorrhea2,
      "hiv-aids": hiv_aids2,
      "bacterial-vaginosis": bacterial_vaginosis2,
      "vulvovaginal-candidiasis": vulvovaginal_candidiasis2,
      trichomoniasis: trichomoniasis2,
      "acute-watery-diarrhoea": acute_watery_diarrhoea2,
      chlamydia: chlamydia2,
      "genital-herpes": genital_herpes,
      "human-papillomavirus-hpv": human_papillomavirus_hpv,
      anaemia,
      "oral-thrush": oral_thrush2,
      typhoid: typhoid2,
      cholera: cholera2,
      meningitis: meningitis2,
      epilepsy: epilepsy2,
      dehydration: dehydration2,
      hypertension,
      scabies: scabies2,
      gastroenteritis: gastroenteritis2,
      "heat-rash": heat_rash2,
      stomatitis: stomatitis2,
      bacteremia: bacteremia2,
      cephalohematoma: cephalohematoma2,
      "tinea-corporis": tinea_corporis2,
      impetigo,
      "umbilical-cord-sepsis": umbilical_cord_sepsis,
      sepsis,
      "pediatric-hiv-aids": pediatric_hiv_aids,
      "hepatitis-b": hepatitis_b2,
      toxoplasmosis: toxoplasmosis2
    };
    function basic(conditionsFn, medicationsFn, labTestsFn) {
      const meds = medicationsFn();
      const labTests2 = labTestsFn();
      const _vals = {};
      Object.entries(next_steps_basic_default).map((v) => {
        const [id, val] = v;
        return __spreadValues({
          id
        }, val);
      }).filter((s) => conditionsFn().includes(s.id)).map((s) => {
        const d = {};
        d["id"] = s.id;
        d["refer"] = s.refer;
        d["triageLevel"] = s["triage-level"];
        d["referAndTriageLevel"] = s["refer-and-triage-level"];
        d["medications"] = s["medications"].filter((f) => meds.includes(f.id)).map((f) => ({ id: f.id, text: f.text }));
        d["testRecommendations"] = s["test-recommendations"].filter((f) => labTests2.includes(f.id)).map((f) => ({ id: f.id, text: f.text }));
        const other = s["other-recommendations"];
        if (other !== void 0) {
          d["otherRecommendations"] = other;
        }
        return d;
      }).forEach((s) => {
        const _a = s, { id } = _a, other = __objRest(_a, ["id"]);
        _vals[id] = other;
      });
      return _vals;
    }
    function extended(conditionsFn, medicationsFn, labTestsFn) {
      const meds = medicationsFn();
      const labTests2 = labTestsFn();
      const basicInfo = basic(conditionsFn, medicationsFn, labTestsFn);
      const _vals = {};
      const _localeVals = Object.entries(next_steps_extended_default).map((v) => {
        const [id, val] = v;
        return __spreadValues({
          id
        }, val);
      }).filter((s) => conditionsFn().includes(s.id)).map((s) => {
        const d = {};
        d["id"] = s.id;
        d["referAndTriageLevel"] = s["refer-and-triage-level"];
        d["medications"] = s["medications"].filter((t) => meds.includes(t.id));
        d["testRecommendations"] = s["test-recommendations"].filter((t) => labTests2.includes(t.id));
        const other = s["other-recommendations"];
        if (other !== void 0) {
          d["otherRecommendations"] = other;
        }
        return d;
      });
      _localeVals.forEach((s) => {
        const _a = s, { id } = _a, other = __objRest(_a, ["id"]);
        _vals[id] = __spreadValues(__spreadValues({}, basicInfo[id]), other);
      });
      return {
        all: _vals,
        locale: (lang) => {
          const _vals2 = {};
          _localeVals.map((lv) => {
            const nlv = { id: lv.id };
            nlv["referAndTriageLevel"] = lv["referAndTriageLevel"][lang];
            nlv["medications"] = lv["medications"].map((s) => s[lang]).filter((s) => s !== void 0);
            nlv["testRecommendations"] = lv["testRecommendations"].map((s) => s[lang]).filter((s) => s !== void 0);
            return nlv;
          }).forEach((s) => {
            const _a = s, { id } = _a, other = __objRest(_a, ["id"]);
            _vals2[id] = __spreadValues(__spreadValues({}, basicInfo[id]), other);
          });
          return _vals2;
        }
      };
    }
    var anti_toxoplasma_ig_g_serology = "Anti-Toxoplasma IgG Serology";
    var blood_culture = "Blood Culture";
    var blood_pressure = "Blood Pressure";
    var c_reactive_protein_crp = "C-reactive protein (CRP)";
    var cd_4_count = "CD4 Count";
    var chest_x_ray_cxr = "Chest X-Ray (CXR)";
    var ct_scan = "CT Scan";
    var electrolytes_test = "Electrolytes Test";
    var full_blood_picture_fbp = "Full Blood Picture (FBP)";
    var gene_xpert = "GeneXpert";
    var h_pylori_stool_test = "H-pylori Stool Test";
    var hepatitis_b_pcr_hbv_dna = "Hepatitis B PCR (HBV DNA)";
    var hepatitis_b_surface_antibody_hep_bs_ab = "Hepatitis B Surface Antibody (HepBsAb)";
    var hepatitis_b_surface_antigen_h_bs_ag = "Hepatitis B Surface Antigen (HBsAg)";
    var hiv_pcr = "HIV PCR";
    var hiv_rapid_test = "HIV Rapid Test";
    var hiv_viral_load = "HIV Viral Load";
    var hpv_screening = "HPV Screening";
    var kidney_function_tests = "Kidney Function Tests";
    var liver_function_tests = "Liver Function Tests";
    var microscopy = "Microscopy";
    var microscopy_of_sputum = "Microscopy of Sputum";
    var mrdt = "MRDT";
    var mri = "MRI";
    var pap_smear = "Pap Smear";
    var pcr_test = "PCR Test";
    var pelvic_exam = "Pelvic Exam";
    var pregnancy_test = "Pregnancy Test";
    var spinal_fluid_tap = "Spinal Fluid Tap";
    var sputum_culture = "Sputum Culture";
    var stool_analysis = "Stool Analysis";
    var syphilis_test = "Syphilis Test";
    var ultrasound = "Ultrasound";
    var ultrasound_of_pelvis = "Ultrasound of Pelvis";
    var urinalysis = "Urinalysis";
    var lab_tests_default = {
      "anti-toxoplasma-ig-g-serology": anti_toxoplasma_ig_g_serology,
      "blood-culture": blood_culture,
      "blood-pressure": blood_pressure,
      "c-reactive-protein-crp": c_reactive_protein_crp,
      "cd-4-count": cd_4_count,
      "chest-x-ray-cxr": chest_x_ray_cxr,
      "ct-scan": ct_scan,
      "electrolytes-test": electrolytes_test,
      "full-blood-picture-fbp": full_blood_picture_fbp,
      "gene-xpert": gene_xpert,
      "h-pylori-stool-test": h_pylori_stool_test,
      "hepatitis-b-pcr-hbv-dna": hepatitis_b_pcr_hbv_dna,
      "hepatitis-b-surface-antibody-hep-bs-ab": hepatitis_b_surface_antibody_hep_bs_ab,
      "hepatitis-b-surface-antigen-h-bs-ag": hepatitis_b_surface_antigen_h_bs_ag,
      "hiv-pcr": hiv_pcr,
      "hiv-rapid-test": hiv_rapid_test,
      "hiv-viral-load": hiv_viral_load,
      "hpv-screening": hpv_screening,
      "kidney-function-tests": kidney_function_tests,
      "liver-function-tests": liver_function_tests,
      microscopy,
      "microscopy-of-sputum": microscopy_of_sputum,
      mrdt,
      mri,
      "pap-smear": pap_smear,
      "pcr-test": pcr_test,
      "pelvic-exam": pelvic_exam,
      "pregnancy-test": pregnancy_test,
      "spinal-fluid-tap": spinal_fluid_tap,
      "sputum-culture": sputum_culture,
      "stool-analysis": stool_analysis,
      "syphilis-test": syphilis_test,
      ultrasound,
      "ultrasound-of-pelvis": ultrasound_of_pelvis,
      urinalysis
    };
    var acetaminophen = "Acetaminophen";
    var acyclovir = "Acyclovir";
    var albendazole = "Albendazole";
    var aminophylline_injection = "Aminophylline injection";
    var amoxicillin_capsules = "Amoxicillin capsules";
    var amoxicillin_oral_suspension = "Amoxicillin oral suspension";
    var amoxicillin_clavulanate_amoxyclav = "Amoxicillin/Clavulanate (Amoxyclav)";
    var ampiclox = "Ampiclox";
    var annusol_suppositories = "Annusol suppositories";
    var anti_fungal_pessaries = "Anti-fungal pessaries";
    var antihistamines = "Antihistamines";
    var artemether_lumefantrine_alu = "Artemether/ lumefantrine (ALU)";
    var azithromycin = "Azithromycin";
    var bendrofluazide = "Bendrofluazide";
    var benzyl_benzoate = "Benzyl benzoate";
    var benzyl_penicillin_powder_for_injection = "Benzyl penicillin powder for injection";
    var bisacodyl_tablets = "Bisacodyl tablets";
    var bronchodilators = "Bronchodilators";
    var cephalexin = "Cephalexin";
    var cetrizine = "Cetrizine";
    var cetrizine_hydrochloride_syrup = "Cetrizine hydrochloride syrup";
    var cetrizine_hydrochloride_tablets = "Cetrizine hydrochloride tablets";
    var chloramphenicol_eye_drops_ointment = "Chloramphenicol eye drops/ointment";
    var ciprofloxacin = "Ciprofloxacin";
    var clindamycin = "Clindamycin";
    var cloxacillin = "Cloxacillin";
    var co_trimoxazole_suspension = "Co-trimoxazole suspension";
    var condoms = "Condoms";
    var corticosteroids = "Corticosteroids";
    var cough_suppressants = "Cough suppressants";
    var deworming_tablets = "Deworming tablets";
    var dextrose_5 = "Dextrose 5%";
    var diazepam = "Diazepam";
    var diclofenac_sodium_tablets = "Diclofenac sodium tablets";
    var diuretics = "Diuretics";
    var doxycycline_capsules_tablets = "Doxycycline capsules/tablets";
    var ear_drops = "Ear drops";
    var ergometrine_injection = "Ergometrine injection";
    var erythromycin = "Erythromycin";
    var fluconazole = "Fluconazole";
    var fluids = "Fluids";
    var folic_acid_tabs = "Folic acid tabs";
    var gentamycin_eyedrops = "Gentamycin eyedrops";
    var hydrocortisone_cream = "Hydrocortisone cream";
    var ibuprofen = "Ibuprofen";
    var imiquimod = "Imiquimod";
    var iron_supplements = "Iron Supplements";
    var levofloxacin = "Levofloxacin";
    var metronidazole = "Metronidazole";
    var nasal_decongestant = "Nasal decongestant";
    var nonsteroidal_anti_inflammatory_drugs_nsaids = "Nonsteroidal anti-inflammatory drugs (NSAIDS)";
    var normal_saline_injection = "Normal Saline injection";
    var nyastatin_oral_suspension = "Nyastatin oral suspension";
    var nystatin_oral_suspension = "Nystatin oral suspension";
    var nystatin_pessaries = "Nystatin pessaries";
    var nystatin_skin_ointment = "Nystatin skin ointment";
    var nystatin_tablets = "Nystatin tablets";
    var oral_contraceptive_pills = "Oral contraceptive pills";
    var oxytetracycline_hydrochloride_eye_ointment = "Oxytetracycline hydrochloride eye ointment";
    var phenoxymethyl_penicillin_suspension = "Phenoxymethyl Penicillin suspension";
    var phenoxymethyl_penicillin_tablets = "Phenoxymethyl Penicillin tablets";
    var phenytoin = "Phenytoin";
    var piperazine_and_its_salts_in_oral_dosage_forms = "Piperazine and its salts in oral dosage forms";
    var procaine_penicillin_fortified = "Procaine Penicillin Fortified";
    var promethazine_injection = "Promethazine injection";
    var propranolol = "Propranolol";
    var quinine_injection = "Quinine injection";
    var quinine_tablets = "Quinine tablets";
    var salicylic_acid_ointment = "Salicylic acid ointment";
    var scaboma = "Scaboma";
    var silver_sulfadiazine_cream = "Silver sulfadiazine cream";
    var sulfadoxine_pyrimethamine = "Sulfadoxine\u2013pyrimethamine";
    var topical_corticosteroid_cream = "Topical corticosteroid cream";
    var topical_skin_cream = "Topical skin cream";
    var vitamin_c = "Vitamin C";
    var vitamin_d = "Vitamin D";
    var water_for_injection = "Water for injection";
    var zinc = "Zinc";
    var medications_addo_default = {
      acetaminophen,
      acyclovir,
      albendazole,
      "aminophylline-injection": aminophylline_injection,
      "amoxicillin-capsules": amoxicillin_capsules,
      "amoxicillin-oral-suspension": amoxicillin_oral_suspension,
      "amoxicillin-clavulanate-amoxyclav": amoxicillin_clavulanate_amoxyclav,
      ampiclox,
      "annusol-suppositories": annusol_suppositories,
      "anti-fungal-pessaries": anti_fungal_pessaries,
      antihistamines,
      "artemether-lumefantrine-alu": artemether_lumefantrine_alu,
      azithromycin,
      bendrofluazide,
      "benzyl-benzoate": benzyl_benzoate,
      "benzyl-penicillin-powder-for-injection": benzyl_penicillin_powder_for_injection,
      "bisacodyl-tablets": bisacodyl_tablets,
      bronchodilators,
      cephalexin,
      cetrizine,
      "cetrizine-hydrochloride-syrup": cetrizine_hydrochloride_syrup,
      "cetrizine-hydrochloride-tablets": cetrizine_hydrochloride_tablets,
      "chloramphenicol-eye-drops-ointment": chloramphenicol_eye_drops_ointment,
      ciprofloxacin,
      clindamycin,
      cloxacillin,
      "co-trimoxazole-suspension": co_trimoxazole_suspension,
      condoms,
      corticosteroids,
      "cough-suppressants": cough_suppressants,
      "deworming-tablets": deworming_tablets,
      "dextrose-5": dextrose_5,
      diazepam,
      "diclofenac-sodium-tablets": diclofenac_sodium_tablets,
      diuretics,
      "doxycycline-capsules-tablets": doxycycline_capsules_tablets,
      "ear-drops": ear_drops,
      "ergometrine-injection": ergometrine_injection,
      erythromycin,
      fluconazole,
      fluids,
      "folic-acid-tabs": folic_acid_tabs,
      "gentamycin-eyedrops": gentamycin_eyedrops,
      "hydrocortisone-cream": hydrocortisone_cream,
      ibuprofen,
      imiquimod,
      "iron-supplements": iron_supplements,
      levofloxacin,
      metronidazole,
      "nasal-decongestant": nasal_decongestant,
      "nonsteroidal-anti-inflammatory-drugs-nsaids": nonsteroidal_anti_inflammatory_drugs_nsaids,
      "normal-saline-injection": normal_saline_injection,
      "nyastatin-oral-suspension": nyastatin_oral_suspension,
      "nystatin-oral-suspension": nystatin_oral_suspension,
      "nystatin-pessaries": nystatin_pessaries,
      "nystatin-skin-ointment": nystatin_skin_ointment,
      "nystatin-tablets": nystatin_tablets,
      "oral-contraceptive-pills": oral_contraceptive_pills,
      "oxytetracycline-hydrochloride-eye-ointment": oxytetracycline_hydrochloride_eye_ointment,
      "phenoxymethyl-penicillin-suspension": phenoxymethyl_penicillin_suspension,
      "phenoxymethyl-penicillin-tablets": phenoxymethyl_penicillin_tablets,
      phenytoin,
      "piperazine-and-its-salts-in-oral-dosage-forms": piperazine_and_its_salts_in_oral_dosage_forms,
      "procaine-penicillin-fortified": procaine_penicillin_fortified,
      "promethazine-injection": promethazine_injection,
      propranolol,
      "quinine-injection": quinine_injection,
      "quinine-tablets": quinine_tablets,
      "salicylic-acid-ointment": salicylic_acid_ointment,
      scaboma,
      "silver-sulfadiazine-cream": silver_sulfadiazine_cream,
      "sulfadoxine-pyrimethamine": sulfadoxine_pyrimethamine,
      "topical-corticosteroid-cream": topical_corticosteroid_cream,
      "topical-skin-cream": topical_skin_cream,
      "vitamin-c": vitamin_c,
      "vitamin-d": vitamin_d,
      "water-for-injection": water_for_injection,
      zinc
    };
    var acetylsalicylic_acid_and_its_salts = "Acetylsalicylic acid and its salts";
    var acetylsalicylic_acid_paracetamol_caffeine_combinations = "Acetylsalicylic acid/paracetamol/caffeine combinations";
    var aluminium_hydroxide = "Aluminium Hydroxide";
    var arachis_oil_preparations_for_sore_mouth = "Arachis Oil preparations (for sore mouth)";
    var ayuverdic_ointments = "Ayuverdic ointments";
    var benzocaine_preparation_not_for_children = "Benzocaine preparation (not for children)";
    var camphor_preparations = "Camphor Preparations";
    var carmellose_preparations = "Carmellose preparations";
    var chlorinate_lime_eusol_solution = "Chlorinate Lime (EUSOL) solution";
    var clove_oil = "Clove oil";
    var dental_floss = "Dental floss";
    var dequalinium_prepartions = "Dequalinium Prepartions";
    var diclofenac_ointment_cream_or_gel = "Diclofenac ointment, cream or gel";
    var eucalyptus = "Eucalyptus";
    var eucalyptus_oil_preparations = "Eucalyptus oil preparations";
    var eucalyptus_products = "Eucalyptus products";
    var eugenol = "Eugenol";
    var first_aid_ointment = "First Aid Ointment";
    var gentian_violet_solution = "Gentian violet solution";
    var ibuprofen_ephedrine_combinations = "Ibuprofen/Ephedrine combinations";
    var iodine_solution = "Iodine solution";
    var lozenges = "Lozenges";
    var magnesium_trisillicate = "Magnesium trisillicate";
    var menthol = "Menthol";
    var menthol_products = "Menthol Products";
    var mentholatum_preparations = "Mentholatum preparations";
    var methyl_salicylate_products = "Methyl salicylate products";
    var mouth_washes = "Mouth washes";
    var oral_rehydration_salts_ors = "Oral Rehydration Salts (ORS)";
    var paracetamol_in_immediate_release_tablets_capsules_or_liquid = "Paracetamol (in immediate release tablets, capsules or liquid)";
    var simethicone = "Simethicone";
    var tonic = "Tonic";
    var undecylenic_acid_preparations = "Undecylenic acid preparations";
    var vitamins_other = "Vitamins (Other)";
    var whitfields_ointment = "Whitfields ointment";
    var medications_general_sales_default = {
      "acetylsalicylic-acid-and-its-salts": acetylsalicylic_acid_and_its_salts,
      "acetylsalicylic-acid-paracetamol-caffeine-combinations": acetylsalicylic_acid_paracetamol_caffeine_combinations,
      "aluminium-hydroxide": aluminium_hydroxide,
      "arachis-oil-preparations-for-sore-mouth": arachis_oil_preparations_for_sore_mouth,
      "ayuverdic-ointments": ayuverdic_ointments,
      "benzocaine-preparation-not-for-children": benzocaine_preparation_not_for_children,
      "camphor-preparations": camphor_preparations,
      "carmellose-preparations": carmellose_preparations,
      "chlorinate-lime-eusol-solution": chlorinate_lime_eusol_solution,
      "clove-oil": clove_oil,
      "dental-floss": dental_floss,
      "dequalinium-prepartions": dequalinium_prepartions,
      "diclofenac-ointment-cream-or-gel": diclofenac_ointment_cream_or_gel,
      eucalyptus,
      "eucalyptus-oil-preparations": eucalyptus_oil_preparations,
      "eucalyptus-products": eucalyptus_products,
      eugenol,
      "first-aid-ointment": first_aid_ointment,
      "gentian-violet-solution": gentian_violet_solution,
      "ibuprofen-ephedrine-combinations": ibuprofen_ephedrine_combinations,
      "iodine-solution": iodine_solution,
      lozenges,
      "magnesium-trisillicate": magnesium_trisillicate,
      menthol,
      "menthol-products": menthol_products,
      "mentholatum-preparations": mentholatum_preparations,
      "methyl-salicylate-products": methyl_salicylate_products,
      "mouth-washes": mouth_washes,
      "oral-rehydration-salts-ors": oral_rehydration_salts_ors,
      "paracetamol-in-immediate-release-tablets-capsules-or-liquid": paracetamol_in_immediate_release_tablets_capsules_or_liquid,
      simethicone,
      tonic,
      "undecylenic-acid-preparations": undecylenic_acid_preparations,
      "vitamins-other": vitamins_other,
      "whitfields-ointment": whitfields_ointment
    };
    function build(c) {
      return Object.entries(c).map((c2) => {
        const [id, name] = c2;
        return { id, name };
      }).sort((a, b) => a.name.localeCompare(b.name));
    }
    function buildObject(c) {
      return Object.entries(c).map((c2) => {
        const [id, obj] = c2;
        return __spreadProps(__spreadValues({}, obj), { id });
      }).sort((a, b) => a.id.localeCompare(b.id));
    }
    var labTests = {
      fromId: (id) => ({ id, name: lab_tests_default[id] }),
      ids: () => Object.keys(lab_tests_default).sort((a, b) => a.localeCompare(b)),
      values: () => build(lab_tests_default)
    };
    var addo = {
      fromId: (id) => ({ id, name: medications_addo_default[id] }),
      ids: () => Object.keys(medications_addo_default).sort((a, b) => a.localeCompare(b)),
      values: () => build(medications_addo_default)
    };
    var gs = {
      ids: () => Object.keys(medications_general_sales_default).sort((a, b) => a.localeCompare(b)),
      fromId: (id) => ({ id, name: medications_general_sales_default[id] }),
      values: () => build(medications_general_sales_default)
    };
    var medications = {
      addo,
      gs,
      all: {
        ids: () => [...addo.ids(), ...gs.ids()].sort((a, b) => a.localeCompare(b)),
        values: () => [...addo.values(), ...gs.values()].sort((a, b) => a.name.localeCompare(b.name))
      }
    };
    var abdominal_distension = {
      location: [],
      duration: [],
      onset: [
        "gradual"
      ],
      nature: [
        "symmetrical",
        "asymmetrical"
      ],
      periodicity: [],
      aggravators: [
        "constipation"
      ],
      reducers: []
    };
    var abdominal_pain = {
      location: [
        "lower",
        "upper"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "generalized",
        "localized"
      ],
      periodicity: [
        "non-specific"
      ],
      aggravators: [],
      reducers: []
    };
    var abdominal_tenderness = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained"
      ],
      aggravators: [],
      reducers: []
    };
    var ageusia = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning"
      ],
      aggravators: [
        "cold-weather"
      ],
      reducers: []
    };
    var angular_cheilitis = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var anosmia = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "mild"
      ],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning"
      ],
      aggravators: [
        "cold-weather"
      ],
      reducers: []
    };
    var ascites = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "mild",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var blood_pressure2 = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "low",
        "high"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var bow_legs = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var brudzinskis_sign = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var capillary_refill = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "two-to-three-seconds",
        "three-to-four-seconds",
        "more-than-four-seconds"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var cardiomegaly = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var chest_pain = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "sharp",
        "stabbing",
        "dull",
        "aching",
        "colic"
      ],
      periodicity: [
        "non-specific",
        "intermittent",
        "morning"
      ],
      aggravators: [
        "deep-breathing",
        "coughing",
        "exercise",
        "light-activity"
      ],
      reducers: [
        "rest",
        "laying-down"
      ]
    };
    var chest_tightness = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "non-specific",
        "intermittent",
        "morning",
        "night"
      ],
      aggravators: [
        "deep-breathing",
        "light-activity",
        "laying-down"
      ],
      reducers: [
        "rest",
        "laying-down",
        "sleeping"
      ]
    };
    var clubbing = {
      location: [
        "hands",
        "feet"
      ],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var constipation = {
      location: [],
      duration: [
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [
        "hard-stool",
        "blood-stool",
        "melena-stool"
      ],
      periodicity: [
        "non-specific"
      ],
      aggravators: [],
      reducers: [
        "stool-softeners"
      ]
    };
    var convulsions = {
      location: [],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "sustained",
        "night"
      ],
      aggravators: [],
      reducers: [
        "sleeping"
      ]
    };
    var cough = {
      location: [],
      duration: [
        "less-than-five-days",
        "five-days-to-three-weeks",
        "three-to-eight-weeks",
        "more-than-eight-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "dry",
        "yellow-sputum",
        "green-sputum",
        "clear-sputum",
        "jelly-like-sputum",
        "blood-stained",
        "rusty-red-sputum"
      ],
      periodicity: [
        "morning",
        "night",
        "intermittent",
        "non-specific"
      ],
      aggravators: [
        "dust",
        "pollen",
        "smoke",
        "laying-down",
        "bright-lights",
        "exercise",
        "cold-weather",
        "non-steroidal-anti-inflammatory-drugs"
      ],
      reducers: [
        "antihistamines",
        "sleeping",
        "cough-suppressants"
      ]
    };
    var crying = {
      location: [],
      duration: [
        "less-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "high-pitched"
      ],
      periodicity: [
        "intermittent",
        "non-specific"
      ],
      aggravators: [],
      reducers: [
        "pain-relievers"
      ]
    };
    var cyanosis = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "central",
        "peripheral"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var dactylitis = {
      location: [
        "hand",
        "foot"
      ],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var dehydration3 = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "mild",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var dental_pain = {
      location: [],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific"
      ],
      aggravators: [
        "chewing"
      ],
      reducers: [
        "sleeping"
      ]
    };
    var diarrhoea = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "watery",
        "bloody",
        "mucoid",
        "severe"
      ],
      periodicity: [
        "non-specific",
        "intermittent"
      ],
      aggravators: [
        "food"
      ],
      reducers: [
        "antidiarrheal",
        "hunger",
        "laying-down",
        "sleeping"
      ]
    };
    var drinking_ability = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "eagerly",
        "unable-to-drink"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var dry_mucosa = {
      location: [
        "eyes",
        "nose",
        "mouth"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [],
      nature: [
        "normal",
        "dry",
        "very-dry"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var dysphagia = {
      location: [],
      duration: [
        "less-than-two-weeks"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [
        "mild"
      ],
      periodicity: [
        "non-specific",
        "intermitted",
        "sustained"
      ],
      aggravators: [
        "drinking-cold-water"
      ],
      reducers: [
        "pain-relievers"
      ]
    };
    var dysphonia = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "mild"
      ],
      periodicity: [
        "intermittent",
        "sustained"
      ],
      aggravators: [
        "smoke",
        "cold-weather",
        "speaking"
      ],
      reducers: [
        "sleeping"
      ]
    };
    var dyspnoea = {
      location: [],
      duration: [
        "less-than-three-weeks",
        "three-to-eight-weeks",
        "more-than-eight-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "progressive",
        "non-progressive"
      ],
      periodicity: [
        "early-morning",
        "night",
        "non-specific",
        "sustained",
        "intermittent"
      ],
      aggravators: [
        "lying-flat",
        "standing-or-sitting",
        "lying-on-one-side",
        "sleeping",
        "light-exercise",
        "cold"
      ],
      reducers: [
        "rest",
        "sitting",
        "laying-down",
        "pain-relievers"
      ]
    };
    var dysuria = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [
        "burning-sensation"
      ],
      periodicity: [
        "non-specific"
      ],
      aggravators: [],
      reducers: []
    };
    var ear_pressure = {
      location: [
        "lateral-right",
        "lateral-left",
        "bilateral"
      ],
      duration: [],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [
        "mild"
      ],
      periodicity: [
        "intermittent",
        "sustained"
      ],
      aggravators: [],
      reducers: []
    };
    var ecchymosis = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [],
      onset: [],
      nature: [
        "large-confluent-lesion"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var edema = {
      location: [
        "facial",
        "periorbital",
        "hands",
        "lower-limbs",
        "abdomen"
      ],
      duration: [],
      onset: [
        "gradual"
      ],
      nature: [
        "progressive-decrease-during-day"
      ],
      periodicity: [
        "early-morning",
        "non-specific",
        "intermittent"
      ],
      aggravators: [
        "increased-fluid-intake",
        "laying-down"
      ],
      reducers: []
    };
    var enlarged_tonsils = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var enlarged_tympanic_membrane = {
      location: [
        "lateral-right",
        "lateral-left",
        "bilateral"
      ],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var enurisis = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [],
      nature: [
        "persistent"
      ],
      periodicity: [
        "night"
      ],
      aggravators: [
        "increased-fluid-intake"
      ],
      reducers: [
        "bladder-training"
      ]
    };
    var epitastaxis = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var excessive_sweating = {
      location: [],
      duration: [
        "more-than-two-weeks"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [],
      periodicity: [
        "during-meals"
      ],
      aggravators: [
        "eating"
      ],
      reducers: [
        "rest"
      ]
    };
    var facial_pain = {
      location: [],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "mild",
        "severe"
      ],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning",
        "afternoon"
      ],
      aggravators: [
        "light-exercise"
      ],
      reducers: [
        "laying-down"
      ]
    };
    var facial_pressure = {
      location: [],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "mild",
        "severe"
      ],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning",
        "afternoon"
      ],
      aggravators: [
        "light-exercise"
      ],
      reducers: [
        "laying-down"
      ]
    };
    var fever = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "low-grade",
        "high-grade"
      ],
      periodicity: [
        "persistent",
        "intermittent",
        "relapsing",
        "step-ladder",
        "remittent",
        "non-specific",
        "night"
      ],
      aggravators: [
        "pollen",
        "crying",
        "light-activity",
        "cold-weather",
        "standing-up"
      ],
      reducers: [
        "antipyretics",
        "anti-inflammatories",
        "pain-relievers",
        "antibiotics",
        "sleeping"
      ]
    };
    var foamy_urine = {
      location: [],
      duration: [
        "chronic"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [
        "intermittent",
        "persistent"
      ],
      periodicity: [
        "early-morning"
      ],
      aggravators: [],
      reducers: []
    };
    var frontal_bossing = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var growth_failure = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var haemoptysis = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hair_changes = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "dyspigmentation",
        "easily-pluckable"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hair_loss = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var halitosis = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning"
      ],
      aggravators: [],
      reducers: []
    };
    var headache = {
      location: [
        "generalized",
        "frontal",
        "top-of-head",
        "temples",
        "both-eyes",
        "one-eye",
        "unilateral"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "throbbing",
        "tight-band-around-head",
        "stabbing",
        "pulsing",
        "mild"
      ],
      periodicity: [
        "non-specific",
        "intermittent",
        "night",
        "afternoon"
      ],
      aggravators: [
        "stress",
        "emotional-conflict",
        "bending-forward",
        "light-exercise",
        "bright-lights",
        "standing-up"
      ],
      reducers: [
        "rest",
        "sleeping",
        "pain-relievers"
      ]
    };
    var hearing_loss = {
      location: [
        "lateral-right",
        "lateral-left",
        "bilateral"
      ],
      duration: [
        "less-than-six-weeks",
        "more-than-six-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "partial",
        "full"
      ],
      periodicity: [
        "non-specific",
        "recurrent",
        "intermittent",
        "sustained"
      ],
      aggravators: [
        "fever"
      ],
      reducers: []
    };
    var heart_murmur = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "systolic-murmur",
        "diastolic-murmur"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hemarthrosis = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hematoma = {
      location: [
        "head",
        "hands",
        "feet",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hematuria = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "continuous",
        "intermittent",
        "painless",
        "painful",
        "microscopic",
        "macroscopic"
      ],
      periodicity: [
        "non-specific"
      ],
      aggravators: [],
      reducers: []
    };
    var hepatomegaly = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "smooth",
        "tender",
        "craggy"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hyperemic_larynx = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hyperemic_pharynx = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hyperemic_tonsils = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hyperemic_tympanic_membrane = {
      location: [
        "lateral-right",
        "lateral-left",
        "bilateral"
      ],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hyperpigmentation = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hypopigmentation = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var hypothermia = {
      location: [],
      duration: [
        "less-than-24-hours"
      ],
      onset: [
        "sudden"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var indrawing = {
      location: [
        "lower-chest-wall"
      ],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var intercostal_recession = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var irritability = {
      location: [],
      duration: [],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "normal",
        "irritable",
        "lethargic",
        "comatose"
      ],
      periodicity: [
        "intermittent"
      ],
      aggravators: [],
      reducers: [
        "pain-relievers"
      ]
    };
    var jaundice = {
      location: [],
      duration: [],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "progressive",
        "non-progressive"
      ],
      periodicity: [
        "non-specific",
        "sustained"
      ],
      aggravators: [],
      reducers: []
    };
    var joint_pain = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "monoarthritis",
        "oligoarthritis",
        "polyarthritis"
      ],
      periodicity: [],
      aggravators: [
        "joint-movement"
      ],
      reducers: [
        "corticosteroids"
      ]
    };
    var joint_swelling = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "between-two-and-six-weeks",
        "more-than-six-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "monoarthritis",
        "oligoarthritis",
        "polyarthritis"
      ],
      periodicity: [],
      aggravators: [
        "joint-movement"
      ],
      reducers: [
        "corticosteroids"
      ]
    };
    var kernigs_sign = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var limited_range_of_motion = {
      location: [
        "knee",
        "elbow",
        "hip",
        "wrist",
        "ankle"
      ],
      duration: [
        "less-than-two-weeks",
        "between-two-and-six-weeks",
        "more-than-six-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "monoarthritis",
        "oligoarthritis",
        "polyarthritis"
      ],
      periodicity: [],
      aggravators: [
        "joint-movement"
      ],
      reducers: [
        "corticosteroids"
      ]
    };
    var malnutrition3 = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var mental_status = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "irritable",
        "lethargic",
        "comatose"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var mid_upper_arm_circumference = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "mild",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var muscle_tone = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "hypotonia",
        "hypertonia"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var muscle_weakness = {
      location: [],
      duration: [],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "progressive"
      ],
      periodicity: [
        "non-periodic"
      ],
      aggravators: [],
      reducers: []
    };
    var nasal_congestion = {
      location: [],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "watery",
        "mild"
      ],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific"
      ],
      aggravators: [
        "cold-weather",
        "pollen"
      ],
      reducers: [
        "antihistamines",
        "drinking-hot-water"
      ]
    };
    var nasal_discharge = {
      location: [],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "thick",
        "foul-smelling",
        "colored",
        "purulent",
        "mild",
        "severe"
      ],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning",
        "afternoon"
      ],
      aggravators: [
        "cold-weather",
        "pollen",
        "smoke"
      ],
      reducers: [
        "sleeping"
      ]
    };
    var nasal_polyps = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var night_sweats = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var oliguria = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "prgoressive-worsening"
      ],
      periodicity: [
        "non-periodic"
      ],
      aggravators: [
        "decreased-fluid-intake"
      ],
      reducers: [
        "diuretics"
      ]
    };
    var orthopnea = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: [
        "standing",
        "sitting"
      ]
    };
    var otalgia = {
      location: [
        "lower",
        "upper"
      ],
      duration: [
        "less-than-six-weeks",
        "more-than-six-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "mild"
      ],
      periodicity: [
        "non-specific",
        "recurrent",
        "intermittent"
      ],
      aggravators: [],
      reducers: []
    };
    var otorrhea = {
      location: [
        "lateral-right",
        "lateral-left",
        "bilateral"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "purulent",
        "serous",
        "blood"
      ],
      periodicity: [
        "non-specific",
        "intermittent"
      ],
      aggravators: [],
      reducers: []
    };
    var pallor = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "mild",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var peritonsillar_abscess = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var petechiae = {
      location: [
        "face",
        "mouth",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [],
      onset: [],
      nature: [
        "pin-point-hemmorhage"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var photosensitivity = {
      location: [],
      duration: [
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [
        "exposure-to-sunlight"
      ],
      reducers: []
    };
    var polyuria = {
      location: [],
      duration: [
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [
        "night-time"
      ],
      aggravators: [
        "increased-fluid-intake",
        "diuretics"
      ],
      reducers: []
    };
    var poor_feeding = {
      location: [],
      duration: [],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific"
      ],
      aggravators: [],
      reducers: [
        "pain-relievers"
      ]
    };
    var pruritis = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [],
      periodicity: [
        "more-intense-at-night"
      ],
      aggravators: [],
      reducers: [
        "antihistamines"
      ]
    };
    var pulling_on_ear = {
      location: [
        "lateral-right",
        "lateral-left",
        "bilateral"
      ],
      duration: [
        "less-than-two-days",
        "more-than-two-days"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained"
      ],
      aggravators: [],
      reducers: []
    };
    var pulse_rate = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "slightly-increased",
        "tachycardia"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var purpura = {
      location: [
        "face",
        "mouth",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [],
      onset: [],
      nature: [
        "large-raised-lesion"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var reduced_appetite = {
      location: [],
      duration: [
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var rhinorrhea = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "thick",
        "clear-colored",
        "nasal-obstruction",
        "mild"
      ],
      periodicity: [
        "seasonal",
        "intermittent",
        "sustained",
        "morning",
        "non-specific"
      ],
      aggravators: [
        "cold-weather",
        "pollen",
        "spores",
        "dust-mites",
        "chemical-irritants",
        "light-exercise"
      ],
      reducers: [
        "sleeping",
        "antihistamines"
      ]
    };
    var seizures = {
      location: [],
      duration: [
        "less-than-five-minutes",
        "more-than-five-minutes"
      ],
      onset: [
        "focol",
        "generalized"
      ],
      nature: [
        "tonic-seizures",
        "clonic-seizures",
        "tonic-clonic-seizures",
        "myoclonic-seizures",
        "atonic-seizures",
        "absence-seizures",
        "febrile-seizures"
      ],
      periodicity: [
        "non-specific"
      ],
      aggravators: [],
      reducers: []
    };
    var sinus_tenderness = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained"
      ],
      aggravators: [],
      reducers: []
    };
    var skin_desquamation = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var skin_lesions = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [
        "macules",
        "papules",
        "nodules",
        "plaques",
        "wheal",
        "blisters",
        "scales",
        "crust",
        "erosions",
        "ulcers",
        "atrophy",
        "lichenification",
        "burrow",
        "comedones"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var skin_rash = {
      location: [
        "face",
        "hands",
        "feet",
        "scalp",
        "trunk",
        "back",
        "legs",
        "arms",
        "genitals",
        "generalized"
      ],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [
        "malar",
        "discoid"
      ],
      periodicity: [],
      aggravators: [
        "exposure-to-sunlight"
      ],
      reducers: []
    };
    var skin_turgor = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "mild-delay-less-than-2-seconds",
        "severe-delay-more-than-2-seconds"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var sneezing = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "intermittent",
        "sustained",
        "non-specific",
        "morning"
      ],
      aggravators: [
        "cold-weather",
        "pollen"
      ],
      reducers: [
        "sleeping"
      ]
    };
    var snoring = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var sore_throat = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [
        "intermittent"
      ],
      aggravators: [
        "eating-or-drinking"
      ],
      reducers: []
    };
    var splenomegaly = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var stridor = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [],
      nature: [
        "expiratory",
        "inspiratory"
      ],
      periodicity: [
        "early-morning",
        "night"
      ],
      aggravators: [],
      reducers: []
    };
    var stunting = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "mild",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var sunken_eyes = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [],
      nature: [
        "normal",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var syncope = {
      location: [],
      duration: [],
      onset: [
        "sudden"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var tachycardia = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var tachypnoea = {
      location: [],
      duration: [],
      onset: [
        "sudden",
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var teeth_malocclusion = {
      location: [],
      duration: [],
      onset: [],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var tet_spell = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "sudden"
      ],
      nature: [],
      periodicity: [
        "waking-up",
        "feeding",
        "exertion",
        "crying"
      ],
      aggravators: [],
      reducers: []
    };
    var underweight = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "mild",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var vomiting = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual",
        "sudden"
      ],
      nature: [
        "projectile",
        "non-projectile",
        "bile-stained-yellow",
        "bile-stained-green",
        "blood-stained",
        "clear-with-food"
      ],
      periodicity: [
        "non-specific",
        "recurrent",
        "morning",
        "intermittent"
      ],
      aggravators: [
        "eating",
        "drinking water"
      ],
      reducers: [
        "not-eating",
        "sleeping",
        "antiemetic",
        "water-intake",
        "laying down"
      ]
    };
    var wasting = {
      location: [],
      duration: [],
      onset: [],
      nature: [
        "normal",
        "mild",
        "moderate",
        "severe"
      ],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var weight_faltering = {
      location: [],
      duration: [
        "less-than-six-weeks",
        "more-than-six-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var weight_gain = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [],
      aggravators: [],
      reducers: []
    };
    var weight_loss = {
      location: [],
      duration: [
        "more-than-two-weeks"
      ],
      onset: [
        "gradual"
      ],
      nature: [],
      periodicity: [
        "non-specific"
      ],
      aggravators: [],
      reducers: []
    };
    var wheezing = {
      location: [],
      duration: [
        "less-than-two-weeks",
        "more-than-two-weeks"
      ],
      onset: [],
      nature: [
        "expiratory",
        "inspiratory"
      ],
      periodicity: [
        "early-morning",
        "night"
      ],
      aggravators: [
        "dust",
        "pollen",
        "exercise",
        "cold-air",
        "aspirin",
        "non-steroidal-anti-inflammatory-drugs"
      ],
      reducers: [
        "rest",
        "bronchodilators"
      ]
    };
    var symptoms_base_default = {
      "abdominal-distension": abdominal_distension,
      "abdominal-pain": abdominal_pain,
      "abdominal-tenderness": abdominal_tenderness,
      ageusia,
      "angular-cheilitis": angular_cheilitis,
      anosmia,
      ascites,
      "blood-pressure": blood_pressure2,
      "bow-legs": bow_legs,
      "brudzinskis-sign": brudzinskis_sign,
      "capillary-refill": capillary_refill,
      cardiomegaly,
      "chest-pain": chest_pain,
      "chest-tightness": chest_tightness,
      clubbing,
      constipation,
      convulsions,
      cough,
      crying,
      cyanosis,
      dactylitis,
      dehydration: dehydration3,
      "dental-pain": dental_pain,
      diarrhoea,
      "drinking-ability": drinking_ability,
      "dry-mucosa": dry_mucosa,
      dysphagia,
      dysphonia,
      dyspnoea,
      dysuria,
      "ear-pressure": ear_pressure,
      ecchymosis,
      edema,
      "enlarged-tonsils": enlarged_tonsils,
      "enlarged-tympanic-membrane": enlarged_tympanic_membrane,
      enurisis,
      epitastaxis,
      "excessive-sweating": excessive_sweating,
      "facial-pain": facial_pain,
      "facial-pressure": facial_pressure,
      fever,
      "foamy-urine": foamy_urine,
      "frontal-bossing": frontal_bossing,
      "growth-failure": growth_failure,
      haemoptysis,
      "hair-changes": hair_changes,
      "hair-loss": hair_loss,
      halitosis,
      headache,
      "hearing-loss": hearing_loss,
      "heart-murmur": heart_murmur,
      hemarthrosis,
      hematoma,
      hematuria,
      hepatomegaly,
      "hyperemic-larynx": hyperemic_larynx,
      "hyperemic-pharynx": hyperemic_pharynx,
      "hyperemic-tonsils": hyperemic_tonsils,
      "hyperemic-tympanic-membrane": hyperemic_tympanic_membrane,
      hyperpigmentation,
      hypopigmentation,
      hypothermia,
      indrawing,
      "intercostal-recession": intercostal_recession,
      irritability,
      jaundice,
      "joint-pain": joint_pain,
      "joint-swelling": joint_swelling,
      "kernigs-sign": kernigs_sign,
      "limited-range-of-motion": limited_range_of_motion,
      malnutrition: malnutrition3,
      "mental-status": mental_status,
      "mid-upper-arm-circumference": mid_upper_arm_circumference,
      "muscle-tone": muscle_tone,
      "muscle-weakness": muscle_weakness,
      "nasal-congestion": nasal_congestion,
      "nasal-discharge": nasal_discharge,
      "nasal-polyps": nasal_polyps,
      "night-sweats": night_sweats,
      oliguria,
      orthopnea,
      otalgia,
      otorrhea,
      pallor,
      "peritonsillar-abscess": peritonsillar_abscess,
      petechiae,
      photosensitivity,
      polyuria,
      "poor-feeding": poor_feeding,
      pruritis,
      "pulling-on-ear": pulling_on_ear,
      "pulse-rate": pulse_rate,
      purpura,
      "reduced-appetite": reduced_appetite,
      rhinorrhea,
      seizures,
      "sinus-tenderness": sinus_tenderness,
      "skin-desquamation": skin_desquamation,
      "skin-lesions": skin_lesions,
      "skin-rash": skin_rash,
      "skin-turgor": skin_turgor,
      sneezing,
      snoring,
      "sore-throat": sore_throat,
      splenomegaly,
      stridor,
      stunting,
      "sunken-eyes": sunken_eyes,
      syncope,
      tachycardia,
      tachypnoea,
      "teeth-malocclusion": teeth_malocclusion,
      "tet-spell": tet_spell,
      underweight,
      vomiting,
      wasting,
      "weight-faltering": weight_faltering,
      "weight-gain": weight_gain,
      "weight-loss": weight_loss,
      wheezing
    };
    var complicated_malaria2 = "Complicated Malaria";
    var bronchiolitis3 = "Bronchiolitis";
    var otitis_externa3 = "Otitis Externa";
    var supprative_otitis_media3 = "Supprative Otitis Media";
    var pneumocystis_pneumonia3 = "Pneumocystis Pneumonia";
    var ectopic_pregnancy3 = "Ectopic Pregnancy";
    var pelvic_inflammatory_disease3 = "Pelvic Inflammatory Disease";
    var genital_warts3 = "Genital Warts";
    var malaria3 = "Malaria";
    var pneumonia3 = "Pneumonia";
    var tuberculosis2 = "Tuberculosis";
    var coryza3 = "Coryza";
    var sinusitis3 = "Sinusitis";
    var bronchitis3 = "Bronchitis";
    var gastritis3 = "Gastritis";
    var otitis_media3 = "Otitis media";
    var trichuriasis3 = "Trichuriasis";
    var conjunctivitis3 = "Conjunctivitis";
    var urinary_tract_infection_uti2 = "Urinary Tract Infection (UTI)";
    var dysentry3 = "Dysentry";
    var malnutrition4 = "Malnutrition";
    var ascariasis2 = "Ascariasis";
    var asthma3 = "Asthma";
    var influenza3 = "Influenza";
    var tonsilitis3 = "Tonsilitis";
    var laryngitis3 = "Laryngitis";
    var chronic_obstructive_pulmonary_disease_copd2 = "Chronic Obstructive Pulmonary Disease (COPD)";
    var syphillis3 = "Syphillis";
    var gonorrhea3 = "Gonorrhea";
    var hiv_aids3 = "HIV/AIDS";
    var bacterial_vaginosis3 = "Bacterial Vaginosis";
    var vulvovaginal_candidiasis3 = "Vulvovaginal Candidiasis";
    var trichomoniasis3 = "Trichomoniasis";
    var acute_watery_diarrhoea3 = "Acute Watery Diarrhoea";
    var chlamydia3 = "Chlamydia";
    var genital_herpes2 = "Genital Herpes";
    var human_papillomavirus_hpv2 = "Human Papillomavirus (HPV)";
    var anaemia2 = "Anaemia";
    var oral_thrush3 = "Oral Thrush";
    var typhoid3 = "Typhoid";
    var cholera3 = "Cholera";
    var meningitis3 = "Meningitis";
    var epilepsy3 = "Epilepsy";
    var dehydration4 = "Dehydration";
    var hypertension2 = "Hypertension";
    var scabies3 = "Scabies";
    var gastroenteritis3 = "Gastroenteritis";
    var heat_rash3 = "Heat Rash";
    var stomatitis3 = "Stomatitis";
    var bacteremia3 = "Bacteremia";
    var cephalohematoma3 = "Cephalohematoma";
    var tinea_corporis3 = "Tinea Corporis";
    var impetigo2 = "Impetigo";
    var umbilical_cord_sepsis2 = "Umbilical Cord Sepsis";
    var sepsis2 = "Sepsis";
    var pediatric_hiv_aids2 = "Pediatric HIV/AIDS";
    var hepatitis_b3 = "Hepatitis B";
    var toxoplasmosis3 = "Toxoplasmosis";
    var conditions_default = {
      "complicated-malaria": complicated_malaria2,
      bronchiolitis: bronchiolitis3,
      "otitis-externa": otitis_externa3,
      "supprative-otitis-media": supprative_otitis_media3,
      "pneumocystis-pneumonia": pneumocystis_pneumonia3,
      "ectopic-pregnancy": ectopic_pregnancy3,
      "pelvic-inflammatory-disease": pelvic_inflammatory_disease3,
      "genital-warts": genital_warts3,
      malaria: malaria3,
      pneumonia: pneumonia3,
      tuberculosis: tuberculosis2,
      coryza: coryza3,
      sinusitis: sinusitis3,
      bronchitis: bronchitis3,
      gastritis: gastritis3,
      "otitis-media": otitis_media3,
      trichuriasis: trichuriasis3,
      conjunctivitis: conjunctivitis3,
      "urinary-tract-infection-uti": urinary_tract_infection_uti2,
      dysentry: dysentry3,
      malnutrition: malnutrition4,
      ascariasis: ascariasis2,
      asthma: asthma3,
      influenza: influenza3,
      tonsilitis: tonsilitis3,
      laryngitis: laryngitis3,
      "chronic-obstructive-pulmonary-disease-copd": chronic_obstructive_pulmonary_disease_copd2,
      syphillis: syphillis3,
      gonorrhea: gonorrhea3,
      "hiv-aids": hiv_aids3,
      "bacterial-vaginosis": bacterial_vaginosis3,
      "vulvovaginal-candidiasis": vulvovaginal_candidiasis3,
      trichomoniasis: trichomoniasis3,
      "acute-watery-diarrhoea": acute_watery_diarrhoea3,
      chlamydia: chlamydia3,
      "genital-herpes": genital_herpes2,
      "human-papillomavirus-hpv": human_papillomavirus_hpv2,
      anaemia: anaemia2,
      "oral-thrush": oral_thrush3,
      typhoid: typhoid3,
      cholera: cholera3,
      meningitis: meningitis3,
      epilepsy: epilepsy3,
      dehydration: dehydration4,
      hypertension: hypertension2,
      scabies: scabies3,
      gastroenteritis: gastroenteritis3,
      "heat-rash": heat_rash3,
      stomatitis: stomatitis3,
      bacteremia: bacteremia3,
      cephalohematoma: cephalohematoma3,
      "tinea-corporis": tinea_corporis3,
      impetigo: impetigo2,
      "umbilical-cord-sepsis": umbilical_cord_sepsis2,
      sepsis: sepsis2,
      "pediatric-hiv-aids": pediatric_hiv_aids2,
      "hepatitis-b": hepatitis_b3,
      toxoplasmosis: toxoplasmosis3
    };
    var en = {
      onset: {
        gradual: "gradual",
        sudden: "sudden",
        focol: "focol",
        generalized: "generalized"
      },
      nature: {
        symmetrical: "symmetrical",
        asymmetrical: "asymmetrical",
        generalized: "generalized",
        localized: "localized",
        mild: "mild",
        moderate: "moderate",
        severe: "severe",
        normal: "normal",
        low: "low",
        high: "high",
        "two-to-three-seconds": "two-to-three-seconds",
        "three-to-four-seconds": "three-to-four-seconds",
        "more-than-four-seconds": "more-than-four-seconds",
        sharp: "sharp",
        stabbing: "stabbing",
        dull: "dull",
        aching: "aching",
        colic: "colic",
        "hard-stool": "hard-stool",
        "blood-stool": "blood-stool",
        "melena-stool": "melena-stool",
        dry: "non-productive",
        "yellow-sputum": "yellow-sputum",
        "green-sputum": "green-sputum",
        "clear-sputum": "clear-sputum",
        "jelly-like-sputum": "jelly-like-sputum",
        "blood-stained": "blood-stained",
        "rusty-red-sputum": "rusty-red-sputum",
        "high-pitched": "high-pitched",
        central: "central",
        peripheral: "peripheral",
        watery: "watery",
        bloody: "bloody",
        mucoid: "mucoid",
        eagerly: "eagerly",
        "unable-to-drink": "unable-to-drink",
        "very-dry": "very-dry",
        progressive: "progressive",
        "non-progressive": "non-progressive",
        "burning-sensation": "burning-sensation",
        "large-confluent-lesion": "large-confluent-lesion",
        "progressive-decrease-during-day": "progressive-decrease-during-day",
        persistent: "persistent",
        "low-grade": "low-grade",
        "high-grade": "high-grade",
        intermittent: "intermittent",
        dyspigmentation: "dyspigmentation",
        "easily-pluckable": "easily-pluckable",
        throbbing: "throbbing",
        "tight-band-around-head": "tight-band-around-head",
        pulsing: "pulsing",
        partial: "partial",
        full: "full",
        "systolic-murmur": "systolic-murmur",
        "diastolic-murmur": "diastolic-murmur",
        continuous: "continuous",
        painless: "painless",
        painful: "painful",
        microscopic: "microscopic",
        macroscopic: "macroscopic",
        smooth: "smooth",
        tender: "tender",
        craggy: "craggy",
        irritable: "irritable",
        lethargic: "lethargic",
        comatose: "comatose",
        monoarthritis: "monoarthritis",
        oligoarthritis: "oligoarthritis",
        polyarthritis: "polyarthritis",
        hypotonia: "hypotonia",
        hypertonia: "hypertonia",
        thick: "thick",
        "foul-smelling": "foul-smelling",
        colored: "colored",
        purulent: "purulent",
        "prgoressive-worsening": "prgoressive-worsening",
        serous: "serous",
        blood: "blood",
        "pin-point-hemmorhage": "pin-point-hemmorhage",
        "slightly-increased": "slightly-increased",
        tachycardia: "tachycardia",
        "large-raised-lesion": "large-raised-lesion",
        "clear-colored": "clear-colored",
        "nasal-obstruction": "nasal-obstruction",
        "tonic-seizures": "tonic-seizures",
        "clonic-seizures": "clonic-seizures",
        "tonic-clonic-seizures": "tonic-clonic-seizures",
        "myoclonic-seizures": "myoclonic-seizures",
        "atonic-seizures": "atonic-seizures",
        "absence-seizures": "absence-seizures",
        "febrile-seizures": "febrile-seizures",
        macules: "macules",
        papules: "papules",
        nodules: "nodules",
        plaques: "plaques",
        wheal: "wheal",
        blisters: "blisters",
        scales: "scales",
        crust: "crust",
        erosions: "erosions",
        ulcers: "ulcers",
        atrophy: "atrophy",
        lichenification: "lichenification",
        burrow: "burrow",
        comedones: "comedones",
        malar: "malar",
        discoid: "discoid",
        "mild-delay-less-than-2-seconds": "mild-delay-less-than-2-seconds",
        "severe-delay-more-than-2-seconds": "severe-delay-more-than-2-seconds",
        expiratory: "expiratory",
        inspiratory: "inspiratory",
        projectile: "projectile",
        "non-projectile": "non-projectile",
        "bile-stained-yellow": "bile-stained-yellow",
        "bile-stained-green": "bile-stained-green",
        "clear-with-food": "clear-with-food"
      },
      aggravators: {
        constipation: "constipation",
        "cold-weather": "cold-weather",
        "deep-breathing": "deep-breathing",
        coughing: "coughing",
        exercise: "exercise",
        "light-activity": "light-activity",
        "laying-down": "laying-down",
        dust: "dust",
        pollen: "pollen",
        smoke: "smoke",
        "bright-lights": "bright-lights",
        "non-steroidal-anti-inflammatory-drugs": "non-steroidal-anti-inflammatory-drugs",
        chewing: "chewing",
        food: "food",
        "drinking-cold-water": "drinking-cold-water",
        speaking: "speaking",
        "lying-flat": "lying-flat",
        "standing-or-sitting": "standing-or-sitting",
        "lying-on-one-side": "lying-on-one-side",
        sleeping: "sleeping",
        "light-exercise": "light-exercise",
        cold: "cold",
        "increased-fluid-intake": "increased-fluid-intake",
        eating: "eating",
        crying: "crying",
        "standing-up": "standing-up",
        stress: "stress",
        "emotional-conflict": "emotional-conflict",
        "bending-forward": "bending-forward",
        fever: "fever",
        "joint-movement": "joint-movement",
        "decreased-fluid-intake": "decreased-fluid-intake",
        "exposure-to-sunlight": "exposure-to-sunlight",
        diuretics: "diuretics",
        spores: "spores",
        "dust-mites": "dust-mites",
        "chemical-irritants": "chemical-irritants",
        "eating-or-drinking": "eating-or-drinking",
        "drinking water": "drinking water",
        "cold-air": "cold-air",
        aspirin: "aspirin"
      },
      location: {
        lower: "lower",
        upper: "upper",
        hands: "hands",
        feet: "feet",
        hand: "hand",
        foot: "foot",
        eyes: "eyes",
        nose: "nose",
        mouth: "mouth",
        "lateral-right": "lateral-right",
        "lateral-left": "lateral-left",
        bilateral: "bilateral",
        face: "face",
        scalp: "scalp",
        trunk: "trunk",
        back: "back",
        legs: "legs",
        arms: "arms",
        genitals: "genitals",
        generalized: "generalized",
        facial: "facial",
        periorbital: "periorbital",
        "lower-limbs": "lower-limbs",
        abdomen: "abdomen",
        frontal: "frontal",
        "top-of-head": "top-of-head",
        temples: "temples",
        "both-eyes": "both-eyes",
        "one-eye": "one-eye",
        unilateral: "unilateral",
        head: "head",
        "lower-chest-wall": "lower-chest-wall",
        knee: "knee",
        elbow: "elbow",
        hip: "hip",
        wrist: "wrist",
        ankle: "ankle"
      },
      duration: {
        "less-than-two-weeks": "less-than-two-weeks",
        "more-than-two-weeks": "more-than-two-weeks",
        "less-than-two-days": "less-than-two-days",
        "more-than-two-days": "more-than-two-days",
        "less-than-five-days": "less-than-five-days",
        "five-days-to-three-weeks": "five-days-to-three-weeks",
        "three-to-eight-weeks": "three-to-eight-weeks",
        "more-than-eight-weeks": "more-than-eight-weeks",
        "less-than-three-weeks": "less-than-three-weeks",
        chronic: "chronic",
        "less-than-six-weeks": "less-than-six-weeks",
        "more-than-six-weeks": "more-than-six-weeks",
        "less-than-24-hours": "less-than-24-hours",
        "between-two-and-six-weeks": "between-two-and-six-weeks",
        "less-than-five-minutes": "less-than-five-minutes",
        "more-than-five-minutes": "more-than-five-minutes"
      },
      periodicity: {
        "non-specific": "non-specific",
        intermittent: "intermittent",
        sustained: "sustained",
        morning: "morning",
        night: "night",
        intermitted: "intermitted",
        "early-morning": "early-morning",
        "during-meals": "during-meals",
        afternoon: "afternoon",
        persistent: "persistent",
        relapsing: "relapsing",
        "step-ladder": "step-ladder",
        remittent: "remittent",
        recurrent: "recurrent",
        "non-periodic": "non-periodic",
        "night-time": "night-time",
        "more-intense-at-night": "more-intense-at-night",
        seasonal: "seasonal",
        "waking-up": "waking-up",
        feeding: "feeding",
        exertion: "exertion",
        crying: "crying"
      },
      reducers: {
        rest: "rest",
        "laying-down": "laying-down",
        sleeping: "sleeping",
        "stool-softeners": "stool-softeners",
        antihistamines: "antihistamines",
        "cough-suppressants": "cough-suppressants",
        "pain-relievers": "pain-relievers",
        antidiarrheal: "antidiarrheal",
        hunger: "hunger",
        sitting: "sitting",
        "bladder-training": "bladder-training",
        antipyretics: "antipyretics",
        "anti-inflammatories": "anti-inflammatories",
        antibiotics: "antibiotics",
        corticosteroids: "corticosteroids",
        "drinking-hot-water": "drinking-hot-water",
        diuretics: "diuretics",
        standing: "standing",
        "not-eating": "not-eating",
        antiemetic: "antiemetic",
        "water-intake": "water-intake",
        "laying down": "laying down",
        bronchodilators: "bronchodilators"
      }
    };
    var sw = {
      onset: {
        gradual: "taratibu",
        sudden: "ghafla",
        focol: "focol",
        generalized: "ya-jumla"
      },
      nature: {
        symmetrical: "ulinganifu",
        asymmetrical: "isiyo-na-ulinganifu",
        generalized: "tumbo-zima",
        localized: "sehemu-moja",
        mild: "sio-kali",
        moderate: "wastani",
        severe: "kali-sana",
        normal: "kawaida",
        low: "chini",
        high: "juu",
        "two-to-three-seconds": "sekunde-mbili-hadi-tatu",
        "three-to-four-seconds": "sekunde-tatu-hadi-nne",
        "more-than-four-seconds": "zaidi-ya-sekunde-nne",
        sharp: "kali",
        stabbing: "kuchoma",
        dull: "kidogo",
        aching: "kuuma",
        colic: "maumivu-makali",
        "hard-stool": "kinyesi-kigumu",
        "blood-stool": "kinyesi-chenye-damu",
        "melena-stool": "kinyesi-cheusi-chenye-kunata",
        dry: "kavu",
        "yellow-sputum": "makohozi-ya-njano",
        "green-sputum": "makohozi-ya-kijani",
        "clear-sputum": "makohozi-ya-meupe",
        "jelly-like-sputum": "makohozi-yenye-makamasi",
        "blood-stained": "yenye-madoa-ya-damu",
        "rusty-red-sputum": "makohozi-mekundu-yenye-rangi-ya-kutu",
        "high-pitched": "kiwango-cha-juu",
        central: "kati",
        peripheral: "mwisho",
        watery: "maji",
        bloody: "chenye-damu",
        mucoid: "chenye-makamasi",
        eagerly: "kwa-shauku",
        "unable-to-drink": "kushindwa-kunywa",
        "very-dry": "kavu-sana",
        progressive: "inayoendelea",
        "non-progressive": "isiyo-endelea",
        "burning-sensation": "hisia-ya-kuungua",
        "large-confluent-lesion": "kidonda-kikubwa",
        "progressive-decrease-during-day": "kuendelea-kupungua-wakati-wa-mchana",
        persistent: "ya-kudumu",
        "low-grade": "isiyo-kali",
        "high-grade": "kali",
        intermittent: "muda-mfupi",
        dyspigmentation: "dyspigmentation",
        "easily-pluckable": "inayoweza-kuchujwa-kwa-urahisi",
        throbbing: "kupiga",
        "tight-band-around-head": "bendi-kaza-kuzunguka-kichwa",
        pulsing: "kusukuma",
        partial: "kwa-sehemu",
        full: "yote",
        continuous: "yenye-kuendelea",
        painless: "yenye-maumivu",
        painful: "macroscopic",
        smooth: "nyororo",
        tender: "laini-sana",
        craggy: "yenye-muundo-mbaya-rafu",
        irritable: "kuwashwa",
        lethargic: "legevu",
        comatose: "koma",
        monoarthritis: "monoarthritis",
        oligoarthritis: "oligoarthritis",
        polyarthritis: "polyarthritis",
        hypotonia: "hypotonia",
        hypertonia: "hypertonia",
        thick: "nene",
        "foul-smelling": "kutoa-harufu-mbaya",
        colored: "yenye-rangi",
        purulent: "yenye-kutoa-usaha",
        "prgoressive-worsening": "inayozidi-kuwa-mbaya",
        serous: "yenye-kuzalisha-serumu",
        blood: "damu",
        "slightly-increased": "imeongezeka-kidogo",
        tachycardia: "mapigo-ya-moyo-ya-kasi-isiyo-ya-kawaida",
        "large-raised-lesion": "kidonda-kikubwa",
        "clear-colored": "rangi-nyeupe",
        "nasal-obstruction": "kuziba-kwa-pua",
        macules: "eneo-la-kubadilika-rangi-ya-ngozi",
        papules: "chunusi",
        nodules: "vinundu",
        plaques: "doa",
        wheal: "upele",
        blisters: "malengelenge",
        scales: "magamba",
        crust: "ukurutu",
        erosions: "mmomonyoko",
        ulcers: "vidonda",
        atrophy: "kudhoofika",
        lichenification: "lichenification",
        burrow: "shimo",
        comedones: "comedones",
        malar: "malar",
        discoid: "umbo-la-diski",
        "mild-delay-less-than-2-seconds": "ucheleweshaji-mdogo-chini-ya-sekunde-2",
        "severe-delay-more-than-2-seconds": "ucheleweshaji-zaidi-ya-sekunde-2",
        expiratory: "kutoa-pumzi-nje",
        inspiratory: "kuvuta-pumza-ndani",
        projectile: "kutapika-kwa-nguvu-kubwa",
        "non-projectile": "kutapika-kidogo",
        "bile-stained-yellow": "yenye-madoa-ya-manjano",
        "bile-stained-green": "yenye-madoa-ya-kijani",
        "clear-with-food": "yenye-chakula"
      },
      aggravators: {
        constipation: "kukosa-choo",
        "cold-weather": "hali-ya-hewa-baridi",
        "deep-breathing": "kuvuta-pumzi",
        coughing: "kukohoa",
        exercise: "mazoezi",
        "light-activity": "shughuli-nyepesi",
        "laying-down": "kulala-chini",
        dust: "vumbi",
        pollen: "chavua-ya-maua",
        smoke: "moshi",
        "bright-lights": "mwanga-mkali",
        chewing: "kutafuna",
        food: "chakula",
        "drinking-cold-water": "kunywa-maji-baridi",
        speaking: "kuongea",
        "lying-flat": "kulala-chali",
        "standing-or-sitting": "kusimama-au-kukaa",
        "lying-on-one-side": "kulala-upande-mmoja",
        sleeping: "kulala",
        "light-exercise": "kemikali-zinazowasha",
        cold: "baridi",
        "increased-fluid-intake": "ongezeko-la-utumiaji-wa-vimiminika",
        eating: "kula",
        crying: "kilio",
        "standing-up": "kusimama",
        stress: "msongo-wa-mawazo",
        "emotional-conflict": "mgogoro-wa-kihisia",
        "bending-forward": "kuinama-mbele",
        fever: "homa",
        "joint-movement": "kusogeasogea-kwa-jointi",
        "decreased-fluid-intake": "kupungua-kwa-unywaji-wa-vimiminika",
        "exposure-to-sunlight": "kukaa-kwenye-mwangaza-wa-jua",
        diuretics: "dawa-za-diuretiki",
        spores: "spores",
        "dust-mites": "vumbi",
        "chemical-irritants": "utitiri",
        "eating-or-drinking": "eating-or-drinking",
        "drinking water": "kunywa-maji",
        "cold-air": "hewa-baridi",
        aspirin: "aspirini",
        "non-steroidal-anti-inflammatory-drugs": "dawa-zinazozuia-kuvimba"
      },
      location: {
        lower: "chini",
        upper: "juu",
        hands: "viganja-vya-mikono",
        feet: "miguu",
        hand: "mkono",
        foot: "mguu",
        eyes: "macho",
        nose: "pua",
        mouth: "mdomo",
        "lateral-right": "upande-wa-kulia",
        "lateral-left": "upande-wa-kushoto",
        bilateral: "pande-mbili",
        face: "uso",
        scalp: "kichwani",
        trunk: "mwili",
        back: "mgongo",
        legs: "mikono",
        arms: "sehemu-za-siri",
        facial: "usoni",
        periorbital: "periorbital",
        "lower-limbs": "miguu",
        abdomen: "tumbo",
        generalized: "kichwa-chote-kwa-ujumla",
        frontal: "mbele",
        "top-of-head": "juu-ya-kichwa",
        temples: "pande-bapa-za-kichwa",
        "both-eyes": "macho-yote",
        "one-eye": "jicho-moja",
        unilateral: "upande-mmoja",
        head: "kichwa",
        genitals: "mwili-mzima",
        "lower-chest-wall": "ukuta-wa-chini-wa-kifua",
        knee: "goti",
        elbow: "kiwiko-cha-mkono",
        hip: "nyonga",
        wrist: "kiuno",
        ankle: "kifundo-cha-mguu"
      },
      duration: {
        "less-than-two-weeks": "chini-ya-wiki-mbili",
        "more-than-two-weeks": "zaidi-ya-wiki-mbili",
        "less-than-two-days": "chini-ya-siku-mbili",
        "more-than-two-days": "zaidi-ya-siku-mbili",
        "less-than-five-days": "chini-ya-siku-tano",
        "five-days-to-three-weeks": "siku-tano-hadi-wiki-tatu",
        "three-to-eight-weeks": "wiki-tatu-hadi-nane",
        "more-than-eight-weeks": "zaidi-ya-wiki-nane",
        "less-than-three-weeks": "chini-ya-wiki-tatu",
        chronic: "sugu",
        "less-than-six-weeks": "chini-ya-wiki-sita",
        "more-than-six-weeks": "zaidi-ya-wiki-sita",
        "less-than-24-hours": "chini-ya-masaa-ishirini-na-nne",
        "between-two-and-six-weeks": "kati-ya-wiki-mbili-hadi-sita",
        "less-than-five-minutes": "chini-ya-dakika-tano",
        "more-than-five-minutes": "zaidi-ya-dakika-tano"
      },
      periodicity: {
        "non-specific": "muda-wowote",
        intermittent: "muda-mfupi",
        sustained: "endelevu",
        morning: "asubuhi",
        night: "usiku",
        intermitted: "muda-mfupi",
        "early-morning": "alfajiri",
        "during-meals": "wakati-wa-milo",
        afternoon: "mchana",
        persistent: "ya-kudumu",
        relapsing: "ya-kujirudia",
        "step-ladder": "ngazi",
        remittent: "mabadiliko-ya-joto-la-mwili",
        recurrent: "yenye-kujirudia",
        "non-periodic": "muda-wowote",
        "more-intense-at-night": "mkali-zaidi-usiku",
        seasonal: "msimu",
        "waking-up": "kuamka",
        feeding: "kulisha",
        exertion: "juhudi",
        crying: "kulia"
      },
      reducers: {
        rest: "pumzika",
        "laying-down": "kulala-chini",
        sleeping: "kulala",
        "stool-softeners": "vilainishi-vya-kinyesi",
        antihistamines: "antihistamines",
        "cough-suppressants": "dawa-za-kuzuia-kikohozi",
        "pain-relievers": "vipunguza-maumivu",
        antidiarrheal: "dawa-za-kuzuia-kuhara",
        hunger: "njaa",
        sitting: "kuketi",
        "bladder-training": "mafunzo-ya-kibofu",
        antipyretics: "antipyretics",
        "anti-inflammatories": "anti-inflammatories",
        antibiotics: "antibiotiki",
        corticosteroids: "homoni",
        "drinking-hot-water": "kunywa-maji-moto",
        diuretics: "dawa-za-diuretiki",
        standing: "kusimama",
        "not-eating": "bila-kula",
        antiemetic: "dawa-za-kuzuia-kutapika",
        "water-intake": "kunywa-maji",
        "laying down": "kulala-chini",
        bronchodilators: "dawa-ambayo-husababisha-upanuzi-wa-koo-la-hewa"
      }
    };
    var donpar_map_default = {
      en,
      sw
    };
    var en2 = {
      "abdominal-distension": {
        name: "abdominal-distension",
        tags: [
          "bloating",
          "swelling",
          "abdominal-pain"
        ],
        description: "Bloating and swelling in the belly area.",
        symptom: "abdominal-distension"
      },
      "abdominal-pain": {
        name: "abdominal-pain",
        tags: [
          "stomachache",
          "stomach-pain"
        ],
        description: "Pain from inside the abdomen or the outer muscle wall, ranging from mild and temporary to severe and requiring emergency care.",
        symptom: "abdominal-pain"
      },
      "abdominal-tenderness": {
        name: "abdominal-tenderness",
        tags: [],
        description: "Tenderness or pain of the abdomen.",
        symptom: "abdominal-tenderness"
      },
      ageusia: {
        name: "ageusia",
        tags: [
          "mouth",
          "taste"
        ],
        description: "Loss of taste.",
        symptom: "ageusia"
      },
      "angular-cheilitis": {
        name: "angular-cheilitis",
        tags: [],
        description: "Inflammation and small cracks in one or both corners of the mouth.",
        symptom: "angular-cheilitis"
      },
      anosmia: {
        name: "anosmia",
        tags: [],
        description: "Loss of smell.",
        symptom: "anosmia"
      },
      ascites: {
        name: "ascites",
        tags: [
          "abdominal",
          "swelling"
        ],
        description: "Excess abdominal fluid.",
        symptom: "ascites"
      },
      "blood-pressure": {
        name: "blood-pressure",
        tags: [],
        description: "Pressure of circulating blood against the walls of blood vessels.",
        symptom: "blood-pressure"
      },
      "bow-legs": {
        name: "bow-legs",
        tags: [
          "development",
          "child",
          "legs"
        ],
        description: "When the legs curve outward at the knees while the feet and ankles touch.",
        symptom: "bow-legs"
      },
      "brudzinskis-sign": {
        name: "brudzinskis-sign",
        tags: [
          "stiff",
          "neck"
        ],
        description: "Severe neck stiffness causes a patient's hips and knees to flex when the neck is flexed.",
        symptom: "brudzinskis-sign"
      },
      "capillary-refill": {
        name: "capillary-refill",
        tags: [],
        description: "Time taken for a distal capillary bed to regain its color after pressure has been applied to cause blanching",
        symptom: "capillary-refill"
      },
      cardiomegaly: {
        name: "cardiomegaly",
        tags: [
          "heart",
          "breathing"
        ],
        description: "An enlarged heart.",
        symptom: "cardiomegaly"
      },
      "chest-pain": {
        name: "chest-pain",
        tags: [
          "chest",
          "pain",
          "heart"
        ],
        description: "Discomfort in the chest including a dull ache, a crushing or burning feeling, a sharp stabbing pain and pain that radiates to the neck or shoulder.",
        symptom: "chest-pain"
      },
      "chest-tightness": {
        name: "chest-tightness",
        tags: [
          "chest",
          "pain",
          "heart"
        ],
        description: "Tightness or squeezing feeling in the chest.",
        symptom: "chest-tightness"
      },
      clubbing: {
        name: "clubbing",
        tags: [
          "finger",
          "hand",
          "nail"
        ],
        description: "An abnormal, rounded shape of the nail bed.",
        symptom: "clubbing"
      },
      constipation: {
        name: "constipation",
        tags: [
          "poop",
          "abdominal-pain"
        ],
        description: "When a person passes less than three bowel movements a week or has difficult bowel movements.",
        symptom: "constipation"
      },
      convulsions: {
        name: "convulsions",
        tags: [],
        description: "Uncontrollable muscle contractions",
        symptom: "convulsions"
      },
      cough: {
        name: "cough",
        tags: [
          "wheeze",
          "dry-cough"
        ],
        description: "A sudden, forceful hacking sound to release air and clear an irritation in the throat or airway.",
        symptom: "cough"
      },
      crying: {
        name: "crying",
        tags: [
          "cry"
        ],
        description: "Tears or water coming from eyes.",
        symptom: "crying"
      },
      cyanosis: {
        name: "cyanosis",
        tags: [
          "blue",
          "lips",
          "skin",
          "gray"
        ],
        description: "Bluish or greyish colour of the skin, nails, lips or around the eyes.",
        symptom: "cyanosis"
      },
      dactylitis: {
        name: "dactylitis",
        tags: [
          "finger",
          "toe",
          "hand",
          "foot"
        ],
        description: "Swelling of a finger or a toe.",
        symptom: "dactylitis"
      },
      dehydration: {
        name: "dehydration",
        tags: [],
        description: "Loss of body fluid caused by illness, sweating or inadequate intake.",
        symptom: "dehydration"
      },
      "dental-pain": {
        name: "dental-pain",
        tags: [
          "mouth",
          "teeth"
        ],
        description: "Pain in the teeth.",
        symptom: "dental-pain"
      },
      diarrhoea: {
        name: "diarrhoea",
        tags: [
          "watery",
          "stool",
          "poop"
        ],
        description: "Loose, watery stools that occur more frequently than usual.",
        symptom: "diarrhoea"
      },
      "drinking-ability": {
        name: "drinking-ability",
        tags: [],
        description: "Ability to consume liquid.",
        symptom: "drinking-ability"
      },
      "dry-mucosa": {
        name: "dry-mucosa",
        tags: [],
        description: "Dryness around the nose, eyes, and/ or mouth.",
        symptom: "dry-mucosa"
      },
      dysphagia: {
        name: "dysphagia",
        tags: [
          "painful-swallowing",
          "swallowing"
        ],
        description: "Difficulty swallowing foods or liquids, arising from the throat or oesophagus, ranging from mild difficulty to complete and painful blockage.",
        symptom: "dysphagia"
      },
      dysphonia: {
        name: "dysphonia",
        tags: [],
        description: "Voice hoarseness or abnormal voice.",
        symptom: "dysphonia"
      },
      dyspnoea: {
        name: "dyspnoea",
        tags: [
          "difficulty",
          "breathe",
          "breathing"
        ],
        description: "Difficult or laboured breathing.",
        symptom: "dyspnoea"
      },
      dysuria: {
        name: "dysuria",
        tags: [
          "pain",
          "burn",
          "pee"
        ],
        description: "Discomfort, pain or burning when urinating.",
        symptom: "dysuria"
      },
      "ear-pressure": {
        name: "ear-pressure",
        tags: [
          "ear"
        ],
        description: "A feeling of fullness or pressure in the ear.",
        symptom: "ear-pressure"
      },
      ecchymosis: {
        name: "ecchymosis",
        tags: [
          "skin",
          "bruise",
          "blood"
        ],
        description: "A discoloration of the skin resulting from bleeding underneath that can be black, blue, or yellow in color.",
        symptom: "ecchymosis"
      },
      edema: {
        name: "edema",
        tags: [
          "swollen",
          "puffy"
        ],
        description: "Swelling caused by excess fluid trapped in the body's tissues.",
        symptom: "edema"
      },
      "enlarged-tonsils": {
        name: "enlarged-tonsils",
        tags: [],
        description: "Swollen tonsils in the back of the throat.",
        symptom: "enlarged-tonsils"
      },
      "enlarged-tympanic-membrane": {
        name: "enlarged-tympanic-membrane",
        tags: [
          "ear"
        ],
        description: "Swollen or inflammed tympanic membrane due to infection.",
        symptom: "enlarged-tympanic-membrane"
      },
      enurisis: {
        name: "enurisis",
        tags: [
          "bedwetting",
          "bed",
          "wetting"
        ],
        description: "Night time loss of bladder control, or bed-wetting, usually in children.",
        symptom: "enurisis"
      },
      epitastaxis: {
        name: "epitastaxis",
        tags: [],
        description: "A nosebleed or minor bleeding from the blood vessels of the nose.",
        symptom: "epitastaxis"
      },
      "excessive-sweating": {
        name: "excessive-sweating",
        tags: [],
        description: "Abnormally excessive sweating that's not necessarily related to heat or exercise",
        symptom: "excessive-sweating"
      },
      "facial-pain": {
        name: "facial-pain",
        tags: [],
        description: "Pain of the face.",
        symptom: "facial-pain"
      },
      "facial-pressure": {
        name: "facial-pressure",
        tags: [],
        description: "Feeling of fullness in the face.",
        symptom: "facial-pressure"
      },
      fever: {
        name: "fever",
        tags: [
          "hot",
          "warm",
          "temperature"
        ],
        description: "A temporary increase in average body temperature of 37\xB0C.",
        symptom: "fever"
      },
      "foamy-urine": {
        name: "foamy-urine",
        tags: [],
        description: "Urime with small to medium sized bubbles.",
        symptom: "foamy-urine"
      },
      "frontal-bossing": {
        name: "frontal-bossing",
        tags: [
          "head"
        ],
        description: "An unusually prominent forehead.",
        symptom: "frontal-bossing"
      },
      "growth-failure": {
        name: "growth-failure",
        tags: [
          "development",
          "child",
          "weight"
        ],
        description: "A growth rate below the appropriate growth velocity for age.",
        symptom: "growth-failure"
      },
      haemoptysis: {
        name: "haemoptysis",
        tags: [],
        description: "Coughing up blood.",
        symptom: "haemoptysis"
      },
      "hair-changes": {
        name: "hair-changes",
        tags: [],
        description: "Abnormal changes to the color or texture of hair.",
        symptom: "hair-changes"
      },
      "hair-loss": {
        name: "hair-loss",
        tags: [],
        description: "Hair falling out from the scalp or other parts of the body.",
        symptom: "hair-loss"
      },
      halitosis: {
        name: "halitosis",
        tags: [
          "mouth",
          "teeth"
        ],
        description: "Bad breath.",
        symptom: "halitosis"
      },
      headache: {
        name: "headache",
        tags: [
          "head",
          "pain"
        ],
        description: "A painful sensation in any part of the head, ranging from sharp to dull, that may occur with other symptoms.",
        symptom: "headache"
      },
      "hearing-loss": {
        name: "hearing-loss",
        tags: [
          "ear"
        ],
        description: "Total or significant loss of hearing.",
        symptom: "hearing-loss"
      },
      "heart-murmur": {
        name: "heart-murmur",
        tags: [],
        description: "An extra sound in the heartbeat -- such as a ''whooshing'' -- that is caused by turbulent blood flow through the heart valves.",
        symptom: "heart-murmur"
      },
      hemarthrosis: {
        name: "hemarthrosis",
        tags: [
          "skin",
          "blood",
          "bruise"
        ],
        description: "Articular bleeding into the joint cavity.",
        symptom: "hemarthrosis"
      },
      hematoma: {
        name: "hematoma",
        tags: [
          "bruise",
          "blood"
        ],
        description: "Collection of blood outside of blood vessel, commonly caused by trauma.",
        symptom: "hematoma"
      },
      hematuria: {
        name: "hematuria",
        tags: [
          "blood",
          "urine",
          "pee"
        ],
        description: "Blood in urine.",
        symptom: "hematuria"
      },
      hepatomegaly: {
        name: "hepatomegaly",
        tags: [],
        description: "An enlarged liver.",
        symptom: "hepatomegaly"
      },
      "hyperemic-larynx": {
        name: "hyperemic-larynx",
        tags: [],
        description: "Red and swollen larynx.",
        symptom: "hyperemic-larynx"
      },
      "hyperemic-pharynx": {
        name: "hyperemic-pharynx",
        tags: [
          "sore-throat"
        ],
        description: "Red and swollen pharynx at the back of the throat.",
        symptom: "hyperemic-pharynx"
      },
      "hyperemic-tonsils": {
        name: "hyperemic-tonsils",
        tags: [],
        description: "Red and irritated tonsils in the back of the throat.",
        symptom: "hyperemic-tonsils"
      },
      "hyperemic-tympanic-membrane": {
        name: "hyperemic-tympanic-membrane",
        tags: [
          "ear"
        ],
        description: "Red appearance on the tympanic membrane due to increased blood flow.",
        symptom: "hyperemic-tympanic-membrane"
      },
      hyperpigmentation: {
        name: "hyperpigmentation",
        tags: [
          "skin",
          "dark-patches",
          "discolored"
        ],
        description: "Darkened patches or spots on the skin.",
        symptom: "hyperpigmentation"
      },
      hypopigmentation: {
        name: "hypopigmentation",
        tags: [
          "skin",
          "light-patches",
          "discolored"
        ],
        description: "Lightened patches or spots on the skin.",
        symptom: "hypopigmentation"
      },
      hypothermia: {
        name: "hypothermia",
        tags: [
          "cold",
          "temperature"
        ],
        description: "A significant and potentially dangerous drop in body temperature.",
        symptom: "hypothermia"
      },
      indrawing: {
        name: "indrawing",
        tags: [],
        description: "Inward movement of the lower chest wall when a child breathes in.",
        symptom: "indrawing"
      },
      "intercostal-recession": {
        name: "intercostal-recession",
        tags: [],
        description: "Sharp inward pull of the intercostal muscles due to reduced pressure in the chest.",
        symptom: "intercostal-recession"
      },
      irritability: {
        name: "irritability",
        tags: [
          "lethargy"
        ],
        description: "Feeling or expressing agitated.",
        symptom: "irritability"
      },
      jaundice: {
        name: "jaundice",
        tags: [
          "yellow",
          "eyes",
          "skin"
        ],
        description: "Yellow skin caused by the build-up of bilirubin in the blood.",
        symptom: "jaundice"
      },
      "joint-pain": {
        name: "joint-pain",
        tags: [],
        description: "Physical discomfort where two or more bones meet to form a joint, ranging from mild to disabling.",
        symptom: "joint-pain"
      },
      "joint-swelling": {
        name: "joint-swelling",
        tags: [
          "swelling",
          "edema",
          "puffy"
        ],
        description: "Swelling or enlarging of joints due to increased fluid in the tissue surrounding joints.",
        symptom: "joint-swelling"
      },
      "kernigs-sign": {
        name: "kernigs-sign",
        tags: [
          "stiff",
          "leg"
        ],
        description: "Severe stiffness of the hamstrings causes an inability to straighten the leg when the hip is flexed to 90 degrees.",
        symptom: "kernigs-sign"
      },
      "limited-range-of-motion": {
        name: "limited-range-of-motion",
        tags: [
          "joint",
          "pain",
          "stiff"
        ],
        description: "A joint with a reduction in its ability to move or bend.",
        symptom: "limited-range-of-motion"
      },
      malnutrition: {
        name: "malnutrition",
        tags: [
          "weight-loss",
          "weight-gain"
        ],
        description: "Deficiencies, excesses or imbalances in a person's intake of energy and/or nutrients.",
        symptom: "malnutrition"
      },
      "mental-status": {
        name: "mental-status",
        tags: [
          "lethargy",
          "coma"
        ],
        description: "Mental capacity, including level of consciousness, attentiveness, motor and speech activity, mood, and affect.",
        symptom: "mental-status"
      },
      "mid-upper-arm-circumference": {
        name: "mid-upper-arm-circumference",
        tags: [
          "malnutrition",
          "underweight"
        ],
        description: "A measure to assess nutritional status by looking at the circumference of the left upper arm.",
        symptom: "mid-upper-arm-circumference"
      },
      "muscle-tone": {
        name: "muscle-tone",
        tags: [],
        description: "Amount of tension (or resistance to movement) in muscles.",
        symptom: "muscle-tone"
      },
      "muscle-weakness": {
        name: "muscle-weakness",
        tags: [
          "weak",
          "muscles",
          "tired",
          "paralysis"
        ],
        description: "Decreased strength in the muscles.",
        symptom: "muscle-weakness"
      },
      "nasal-congestion": {
        name: "nasal-congestion",
        tags: [
          "runny-nose"
        ],
        description: "A stuffy nose, when nasal tissues are swollen with fluid.",
        symptom: "nasal-congestion"
      },
      "nasal-discharge": {
        name: "nasal-discharge",
        tags: [
          "runny-nose",
          "congestion"
        ],
        description: "Mucus coming from the nose.",
        symptom: "nasal-discharge"
      },
      "nasal-polyps": {
        name: "nasal-polyps",
        tags: [],
        description: "A painless benign growth on the lining of the nose or sinuses.",
        symptom: "nasal-polyps"
      },
      "night-sweats": {
        name: "night-sweats",
        tags: [
          "chills"
        ],
        description: "Repeated episodes of extreme perspiration that may soak your nightclothes or bedding.",
        symptom: "night-sweats"
      },
      oliguria: {
        name: "oliguria",
        tags: [
          "urine",
          "pee"
        ],
        description: "Urine output below normal or low.",
        symptom: "oliguria"
      },
      orthopnea: {
        name: "orthopnea",
        tags: [
          "breathing",
          "dyspnoea"
        ],
        description: "Discomfort when breathing while lying down flat.",
        symptom: "orthopnea"
      },
      otalgia: {
        name: "otalgia",
        tags: [
          "ear",
          "pain",
          "ear-pain"
        ],
        description: "Ear pain in the inner or outer ear that may interfere with ability to hear.",
        symptom: "otalgia"
      },
      otorrhea: {
        name: "otorrhea",
        tags: [
          "ear-fluid",
          "discharge",
          "fluid"
        ],
        description: "Fluid or discharge from the ear.",
        symptom: "otorrhea"
      },
      pallor: {
        name: "pallor",
        tags: [
          "pale-skin"
        ],
        description: "Paleness or loss of colour from the skin or mucous membranes.",
        symptom: "pallor"
      },
      "peritonsillar-abscess": {
        name: "peritonsillar-abscess",
        tags: [],
        description: "Collection of pus in the tissues of the throat.",
        symptom: "peritonsillar-abscess"
      },
      petechiae: {
        name: "petechiae",
        tags: [
          "skin"
        ],
        description: "Tiny round, brown-purple spots due to bleeding under the skin or mucous membranes.",
        symptom: "petechiae"
      },
      photosensitivity: {
        name: "photosensitivity",
        tags: [
          "rash",
          "red",
          "sun"
        ],
        description: "Itchy eruptions or areas of redness and inflammation on sun-exposed skin.",
        symptom: "photosensitivity"
      },
      polyuria: {
        name: "polyuria",
        tags: [],
        description: "The need to urinate more often than normal.",
        symptom: "polyuria"
      },
      "poor-feeding": {
        name: "poor-feeding",
        tags: [
          "fatigue"
        ],
        description: "Little interest in feeding or easily fatigued when feeding.",
        symptom: "poor-feeding"
      },
      pruritis: {
        name: "pruritis",
        tags: [
          "rash",
          "itch",
          "itchy",
          "sore"
        ],
        description: "Also called itchy skin, it is an uncomfortable, irritating sensation that makes someone want to scratch.",
        symptom: "pruritis"
      },
      "pulling-on-ear": {
        name: "pulling-on-ear",
        tags: [
          "ear",
          "pain",
          "ear-pain",
          "otalgia"
        ],
        description: "Touching or pulling on ear, especially for infants.",
        symptom: "pulling-on-ear"
      },
      "pulse-rate": {
        name: "pulse-rate",
        tags: [
          "heart-rate"
        ],
        description: "The number of times your heart beats in one minute.",
        symptom: "pulse-rate"
      },
      purpura: {
        name: "purpura",
        tags: [
          "skin"
        ],
        description: "A rash of purple spots, also called blood spots.",
        symptom: "purpura"
      },
      "reduced-appetite": {
        name: "reduced-appetite",
        tags: [
          "hungry"
        ],
        description: "Reduced desire to eat.",
        symptom: "reduced-appetite"
      },
      rhinorrhea: {
        name: "rhinorrhea",
        tags: [
          "runny-nose",
          "running",
          "nose",
          "fluid-from-nose"
        ],
        description: "Excess drainage, ranging from a clear fluid to thick mucus, from the nose and nasal passages.",
        symptom: "rhinorrhea"
      },
      seizures: {
        name: "seizures",
        tags: [
          "shaking",
          "spazzing"
        ],
        description: "Sudden, uncontrolled electrical disturbance in the brain that causes changes in behavior, movements or feelings, and in levels of consciousness.",
        symptom: "seizures"
      },
      "sinus-tenderness": {
        name: "sinus-tenderness",
        tags: [],
        description: "Tenderness or pain of the facial sinuses.",
        symptom: "sinus-tenderness"
      },
      "skin-desquamation": {
        name: "skin-desquamation",
        tags: [
          "skin",
          "peeling"
        ],
        description: "An unintended damage to and loss of the upper layer of skin.",
        symptom: "skin-desquamation"
      },
      "skin-lesions": {
        name: "skin-lesions",
        tags: [
          "rash",
          "red",
          "sore",
          "ulcer",
          "color"
        ],
        description: "An abnormal lump, bump, ulcer, sore, or colored area of the skin.",
        symptom: "skin-lesions"
      },
      "skin-rash": {
        name: "skin-rash",
        tags: [
          "rash",
          "skin",
          "red"
        ],
        description: "Temporary outbreak of red, bumpy, scaly or itchy patches of skin, possibly with blisters or welts.",
        symptom: "skin-rash"
      },
      "skin-turgor": {
        name: "skin-turgor",
        tags: [],
        description: "Elasticity of one's skin.",
        symptom: "skin-turgor"
      },
      sneezing: {
        name: "sneezing",
        tags: [],
        description: "A powerful, involuntary expulsion of air.",
        symptom: "sneezing"
      },
      snoring: {
        name: "snoring",
        tags: [
          "breathing"
        ],
        description: "Hoarse or harsh sound from the nose or mouth that happens when breathing is partially obstructed while sleeping.",
        symptom: "snoring"
      },
      "sore-throat": {
        name: "sore-throat",
        tags: [],
        description: "Pain or irritation in the throat that can occur with or without swallowing",
        symptom: "sore-throat"
      },
      splenomegaly: {
        name: "splenomegaly",
        tags: [],
        description: "An enlarged spleen.",
        symptom: "splenomegaly"
      },
      stridor: {
        name: "stridor",
        tags: [
          "cough",
          "breathing"
        ],
        description: "An abnormal, high-pitched, musical breathing sound.",
        symptom: "stridor"
      },
      stunting: {
        name: "stunting",
        tags: [
          "short",
          "growth"
        ],
        description: "Impaired growth and development, typically seen in children.",
        symptom: "stunting"
      },
      "sunken-eyes": {
        name: "sunken-eyes",
        tags: [],
        description: "Skin under the eyes appearing dark, sunken, and hollow.",
        symptom: "sunken-eyes"
      },
      syncope: {
        name: "syncope",
        tags: [
          "shaking",
          "spazzing"
        ],
        description: "Fainting or a sudden temporary loss of consciousness.",
        symptom: "syncope"
      },
      tachycardia: {
        name: "tachycardia",
        tags: [
          "heart-rate"
        ],
        description: "Fast beating heart or fast heart rate.",
        symptom: "tachycardia"
      },
      tachypnoea: {
        name: "tachypnoea",
        tags: [
          "breath"
        ],
        description: "Abnormally rapid breathing.",
        symptom: "tachypnoea"
      },
      "teeth-malocclusion": {
        name: "teeth-malocclusion",
        tags: [],
        description: "Misaligned teeh or the abnormal alignment of the upper and lower teeth.",
        symptom: "teeth-malocclusion"
      },
      "tet-spell": {
        name: "tet-spell",
        tags: [
          "blue-lips",
          "blue-skin"
        ],
        description: "Deep blue skin, nails, and lips in an infant after crying or feeding caused by a rapid drop in the amount of oxygen in the blood.",
        symptom: "tet-spell"
      },
      underweight: {
        name: "underweight",
        tags: [],
        description: "A weight considered too low for good health.",
        symptom: "underweight"
      },
      vomiting: {
        name: "vomiting",
        tags: [
          "vomit",
          "throw-up",
          "food",
          "nausea"
        ],
        description: "Forcefully expelling the stomach's contents out of the mouth.",
        symptom: "vomiting"
      },
      wasting: {
        name: "wasting",
        tags: [],
        description: "Low weight-for-height ratio.",
        symptom: "wasting"
      },
      "weight-faltering": {
        name: "weight-faltering",
        tags: [
          "poor-weight",
          "weight",
          "underweight",
          "feed",
          "eat"
        ],
        description: "Weight gain is slow or delayed, especially for infants and children.",
        symptom: "weight-faltering"
      },
      "weight-gain": {
        name: "weight-gain",
        tags: [],
        description: "Kilograms added to body mass, often resulting from overeating or lack of physical activity.",
        symptom: "weight-gain"
      },
      "weight-loss": {
        name: "weight-loss",
        tags: [],
        description: "Decrease in body weight.",
        symptom: "weight-loss"
      },
      wheezing: {
        name: "wheezing",
        tags: [
          "cough",
          "whistling"
        ],
        description: "A high-pitched whistling sound made while breathing.",
        symptom: "wheezing"
      }
    };
    var sw2 = {
      "abdominal-distension": {
        name: "Kuvimba kwa tumbo",
        tags: [
          "kuvimba",
          "uvimbe",
          "maumivu-ya-tumbo"
        ],
        description: "Kuvimba na kuwa na uvimbe kwenye eneo la tumbo.",
        symptom: "abdominal-distension"
      },
      "abdominal-pain": {
        name: "Maumivu ya tumbo",
        tags: [
          "maumivu-ya-tumbo",
          "tumbo-kuuma"
        ],
        description: "Maumivu kutoka ndani ya tumbo au ukuta wa nje wa misuli, kuanzia ya upole na ya muda hadi makali na yanayohitaji huduma ya dharura.",
        symptom: "maumivu-ya-tumbo"
      },
      "abdominal-tenderness": {
        name: "abdominal-tenderness",
        tags: [],
        description: "Tenderness or pain of the abdomen.",
        symptom: "abdominal-tenderness"
      },
      ageusia: {
        name: "Hisia ya ladha",
        tags: [
          "mdomo",
          "ladha"
        ],
        description: "Kupoteza ladha.",
        symptom: "hisia-ya-ladha"
      },
      "angular-cheilitis": {
        name: "Angular Cheilitis",
        tags: [],
        description: "Kuvimba na mipasuko midogo katika kona moja au zote mbili za mdomo.",
        symptom: "angular-cheilitis"
      },
      anosmia: {
        name: "Anosmia",
        tags: [],
        description: "Kupoteza uwezo wa kunusa",
        symptom: "anosmia"
      },
      ascites: {
        name: "Ascites",
        tags: [
          "tumbo",
          "uvimbe"
        ],
        description: "Maji ya ziada tumboni",
        symptom: "ascites"
      },
      "blood-pressure": {
        name: "Shinikizo la damu",
        tags: [],
        description: "Shinikizo la mzunguko wa damu dhidi ya kuta za mishipa ya damu.",
        symptom: "shinikizo-la-damu"
      },
      "bow-legs": {
        name: "Bow Legs",
        tags: [
          "maendeleo",
          "mtoto",
          "miguu"
        ],
        description: "Miguu inapopinda kwa nje kwenye magoti huku viganja na vifundo vya miguu vinagusana.",
        symptom: "bow-legs"
      },
      "brudzinskis-sign": {
        name: "Brudzinskis Sign",
        tags: [
          "ngumu",
          "shingo"
        ],
        description: "Kukakamaa sana kwa shingo husababisha nyonga na magoti ya mgonjwa kujikunja wakati shingo inapokunjamana.",
        symptom: "brudzinskis-sign"
      },
      "capillary-refill": {
        name: "Kujazwa tena kwa Capillary",
        tags: [],
        description: "Muda uliochukuliwa kwa kapilari kurejesha rangi yake baada ya shinikzo kutumika kusababisha rangi nyeupe",
        symptom: "capillary-refill"
      },
      cardiomegaly: {
        name: "Cardiomegaly",
        tags: [
          "moyo",
          "kupumua"
        ],
        description: "Moyo uliopanuka",
        symptom: "cardiomegaly"
      },
      "chest-pain": {
        name: "Maumivu ya kifua",
        tags: [
          "kifua",
          "maumivu",
          "moyo"
        ],
        description: "Usumbufu katika kifua ikiwa ni pamoja na kuuma kidogo, hisia ya kupondwa au kuungua, maumivu makali ya kisu na maumivu ambayo hutoka kwenye shingo au bega.",
        symptom: "chest-pain"
      },
      "chest-tightness": {
        name: "Kubanwa Kifua",
        tags: [
          "kifua",
          "maumivu",
          "moyo"
        ],
        description: "Kubanwa au hisia ya mgandamizo kwenye kifua",
        symptom: "chest-tightness"
      },
      clubbing: {
        name: "Clubbing",
        tags: [
          "kidole",
          "mkono",
          "ukucha"
        ],
        description: "Umbo lisilo la kawaida, la mviringo wa ukucha.",
        symptom: "clubbing"
      },
      constipation: {
        name: "Kukosa choo",
        tags: [
          "kinyesi",
          "maumivu-ya-tumbo"
        ],
        description: "Wakati mtu anapopata choo chini ya mara tatu kwa wiki au kupata choo kigumu.",
        symptom: "constipation"
      },
      convulsions: {
        name: "Degedege",
        tags: [],
        description: "Mikazo ya misuli isiyoweza kudhibitiwa",
        symptom: "degedege"
      },
      cough: {
        name: "Kikohozi",
        tags: [
          "pumua",
          "kikohozi-kikavu"
        ],
        description: "Sauti ya ghafla na yenye nguvu ya kutoa hewa na kuondoa mwasho kwenye koo au njia ya hewa.",
        symptom: "kikohozi"
      },
      crying: {
        name: "Kulia",
        tags: [
          "kulia"
        ],
        description: "Machozi au maji yanayotoka machoni.",
        symptom: "crying"
      },
      cyanosis: {
        name: "Cyanosis",
        tags: [
          "bluu",
          "mdomo",
          "ngozi",
          "kijivu"
        ],
        description: "Rangi ya blue au kijivu ya ngozi, kucha, midomo au karibu na macho.",
        symptom: "cyanosis"
      },
      dactylitis: {
        name: "dactylitis",
        tags: [
          "kidole",
          "kidole-cha-mguu",
          "mkono",
          "mguu"
        ],
        description: "Kuvimba kwa kidole au kidole cha mguu",
        symptom: "dactylitis"
      },
      dehydration: {
        name: "upungufu wa maji mwilini",
        tags: [],
        description: "Kupoteza maji mwilini kunakosababishwa na ugonjwa, jasho au ulaji usiofaa.",
        symptom: "dehydration"
      },
      "dental-pain": {
        name: "Maumivu ya Meno",
        tags: [
          "mdomo",
          "meno"
        ],
        description: "Maumivu katika meno.",
        symptom: "dental-pain"
      },
      diarrhoea: {
        name: "Kuhara",
        tags: [
          "majimaji",
          "choo",
          "kinyesi"
        ],
        description: "Vinyesi vya majimaji ambavyo hutokea mara kwa mara kuliko kawaida.",
        symptom: "diarrhoea"
      },
      "drinking-ability": {
        name: "Uwezo wa Kunywa",
        tags: [],
        description: "Uwezo wa kutumia kimiminika",
        symptom: "drinking-ability"
      },
      "dry-mucosa": {
        name: "Dry Mucosa",
        tags: [],
        description: "Ukavu kuzunguka pua, macho, na/au mdomo.",
        symptom: "dry-mucosa"
      },
      dysphagia: {
        name: "Dysphagia",
        tags: [
          "maumivu-wakati-wa-kumeza",
          "kumeza"
        ],
        description: "Maumivu na ugumu wa kumeza vyakula au vimiminika, unaotokana na koo la chakula kuziba.",
        symptom: "dysphagia"
      },
      dysphonia: {
        name: "Dysphonia",
        tags: [],
        description: "Uchakacho wa sauti au sauti isiyo ya kawaida.",
        symptom: "dysphonia"
      },
      dyspnoea: {
        name: "Dyspnoea",
        tags: [
          "ugumu",
          "pumua",
          "kupumua"
        ],
        description: "Kupumua kwa shida ",
        symptom: "dyspnoea"
      },
      dysuria: {
        name: "Dysuria",
        tags: [
          "maumivu",
          "choma",
          "kojoa"
        ],
        description: "Usumbufu, maumivu au hisia ya kuungua wakati wa kukojoa.",
        symptom: "dysuria"
      },
      "ear-pressure": {
        name: "Shinikizo la Masikio",
        tags: [
          "sikio"
        ],
        description: "Hisia ya ujazo au shinikizo katika sikio.",
        symptom: "ear-pressure"
      },
      ecchymosis: {
        name: "Ecchymosis",
        tags: [
          "ngozi",
          "mchubuko",
          "damu"
        ],
        description: "Kubadilika kwa rangi ya ngozi kutokana na kutokwa na damu ambayo inaweza kuwa ya rangi nyeusi, bluu au manjano.",
        symptom: "ecchymosis"
      },
      edema: {
        name: "Edema",
        tags: [
          "kuvimba",
          "kuvimba-isivyo-kawaida"
        ],
        description: "Uvimbe unaosababishwa na maji ya zaida yaliyonaswa kwenye tishu za mwili.",
        symptom: "edema"
      },
      "enlarged-tonsils": {
        name: "Tezi kubwa",
        tags: [],
        description: "Kuvimba kwa tezi nyuma ya koo.",
        symptom: "enlarged-tonsils"
      },
      "enlarged-tympanic-membrane": {
        name: "Enlarged Tympanic Membrane",
        tags: [
          "sikio"
        ],
        description: "kuvimba kwa ngozi ya ndani ya sikio kwa sabau ya maambukizi",
        symptom: "enlarged-tympanic-membrane"
      },
      enurisis: {
        name: "Enurisis",
        tags: [
          "kukojoa-kitandani",
          "kitanda",
          "kulowesha"
        ],
        description: "Kupoteza udhibiti wa kibofu wakati wa usiku, au Kukojoa kitandani, hususani kawaida kwa watoto.",
        symptom: "enurisis"
      },
      epitastaxis: {
        name: "Epitastaxis",
        tags: [],
        description: "Kutokwa na puani au damu kidogo kutoka kwenye mishipa ya damu ya pua.",
        symptom: "epitastaxis"
      },
      "excessive-sweating": {
        name: "Kutokwa na jasho kupindukia",
        tags: [],
        description: "Kutokwa na jasho kupita kiasi na hakuhusiani na joto au mazoezi",
        symptom: "excessive-sweating"
      },
      "facial-pain": {
        name: "Maumivu ya Usoni",
        tags: [],
        description: "Maumivu ya uso",
        symptom: "facial-pain"
      },
      "facial-pressure": {
        name: "Shinikizo la Usoni",
        tags: [],
        description: "hisia ya uso kujaa",
        symptom: "facial-pressure"
      },
      fever: {
        name: "homa",
        tags: [
          "moto",
          "joto"
        ],
        description: "Onezeko la joto mwilini linalozidi nyuzijoto 37",
        symptom: "homa"
      },
      "foamy-urine": {
        name: "Mkojo wenye Povu",
        tags: [],
        description: "mkojo wenye mapovu madogo madogo na ya saizi ya kati",
        symptom: "foamy-urine"
      },
      "frontal-bossing": {
        name: "Frontal Bossing",
        tags: [
          "kichwa"
        ],
        description: "Paji la uso lisilo la kawaida",
        symptom: "frontal-bossing"
      },
      "growth-failure": {
        name: "kudumaa",
        tags: [
          "maendeleo",
          "mtoto",
          "uzito"
        ],
        description: "Kiwango cha ukuaji kilicho chini ya kasi inayofaa ya ukuaji kwa umri.",
        symptom: "growth-failure"
      },
      haemoptysis: {
        name: "kukohoa  damu.",
        tags: [],
        description: "kukohoa damu.",
        symptom: "haemoptysis"
      },
      "hair-changes": {
        name: "Mabadiliko ya Nywele",
        tags: [],
        description: "Mabadiliko yasiyo ya kawaida kwenye rangi au muundo wa nywele.",
        symptom: "hair-changes"
      },
      "hair-loss": {
        name: "Kupoteza nywele",
        tags: [],
        description: "Nywele kuanguka kutoka kichwani au sehemu nyingine za mwili.",
        symptom: "hair-loss"
      },
      halitosis: {
        name: "Harufu mbaya kinywani",
        tags: [
          "mdomo",
          "meno"
        ],
        description: "Harufu mbaya kinywani",
        symptom: "halitosis"
      },
      headache: {
        name: "maumivu ya kichwa",
        tags: [
          "kichwa",
          "maumivu"
        ],
        description: "Hisia za maumivu katika sehemu yoyote ya kichwa, yaweza kuwa mkali au yasiwe makali, ambayo inaweza kutokea kwa dalili nyingine.",
        symptom: "headache"
      },
      "hearing-loss": {
        name: "upotevu wa usikivu",
        tags: [
          "sikio"
        ],
        description: "Upotevu mkubwa wa kusikia.",
        symptom: "hearing-loss"
      },
      "heart-murmur": {
        name: "Heart Murmur",
        tags: [],
        description: "Sauti ya ziada katika mapigo ya moyo kama vile ''kutetemeka'' ambayo husababishwa na mtiririko wa damu unaosumbua kupitia vali za moyo.",
        symptom: "heart-murmur"
      },
      hemarthrosis: {
        name: "Hemarthrosis",
        tags: [
          "ngozi",
          "damu",
          "mchubuko"
        ],
        description: "Kutokwa na damu kwenye eneo la kiungio/ jointi",
        symptom: "hemarthrosis"
      },
      hematoma: {
        name: "Hematoma",
        tags: [
          "mchubuko",
          "damu"
        ],
        description: "Mkusanyiko wa damu nje ya mshipa wa damu, unaosababishwa na majeraha.",
        symptom: "hematoma"
      },
      hematuria: {
        name: "Hematuria",
        tags: [
          "damu",
          "mkojo",
          "kukojoa"
        ],
        description: "Damu kwenye mkojo.",
        symptom: "hematuria"
      },
      hepatomegaly: {
        name: "Hepatomegaly",
        tags: [],
        description: "Ini kutanuka",
        symptom: "hepatomegaly"
      },
      "hyperemic-larynx": {
        name: "Hyperemic Larynx",
        tags: [],
        description: "dundumio lekundu na lililovimba",
        symptom: "hyperemic-larynx"
      },
      "hyperemic-pharynx": {
        name: "Hyperemic Pharynx",
        tags: [
          "koo-kuuma"
        ],
        description: "koromeo lililovimba na kuwa jekundu kwa upande wa nyuma ",
        symptom: "hyperemic-pharynx"
      },
      "hyperemic-tonsils": {
        name: "Hyperemic Tonsils",
        tags: [],
        description: "Tonsils nyekundu na yenye kuwasha nyuma ya koo.",
        symptom: "hyperemic-tonsils"
      },
      "hyperemic-tympanic-membrane": {
        name: "Hyperemic Tympanic Membrane",
        tags: [
          "sikio"
        ],
        description: "Mwonekano mwekundu kwenye ngozi ya ngoma ya sikio kutokana na kuongezeka kwa damu.",
        symptom: "hyperemic-tympanic-membrane"
      },
      hyperpigmentation: {
        name: "Kuongezeka kwa rangi",
        tags: [
          "ngozi",
          "vidonda-vyeusi",
          "iliyo-badilika-rangi"
        ],
        description: "Madoa meusi au madoa kwenye ngozi.",
        symptom: "hyperpigmentation"
      },
      hypopigmentation: {
        name: "Hypopigmentation",
        tags: [
          "ngozi",
          "madoa-meupe",
          "iliyo-badilika-rangi"
        ],
        description: "Madoa meupe au mabaka kwenye ngozi.",
        symptom: "hypopigmentation"
      },
      hypothermia: {
        name: "Hypothermia",
        tags: [
          "baridi",
          "joto"
        ],
        description: "Kushuka kwa kiasi kubwa na hatari kwa joto la mwili.",
        symptom: "hypothermia"
      },
      indrawing: {
        name: "kuvuta ndani",
        tags: [],
        description: "kuingia ndani kwa sehemu ya chini ya ukuta wa kifua cha  mtoto anapopumua.",
        symptom: "indrawing"
      },
      "intercostal-recession": {
        name: "Intercostal Recession",
        tags: [],
        description: "Kuvuta kwa ndani kwa kasi kwa misuli ya kifua kutokana na kupunguzwa kwa shinikizo ndani kifua.",
        symptom: "intercostal-recession"
      },
      irritability: {
        name: "Kuwashwa",
        tags: [
          "ulegevu"
        ],
        description: "Kuhisi kufadhaika.",
        symptom: "irritability"
      },
      jaundice: {
        name: "Ugonjwa wa manjano",
        tags: [
          "manjano",
          "macho",
          "ngozi"
        ],
        description: "Ngozi ya manjano inayosababishwa na kuongezeka kwa bilirubini kwenye damu.",
        symptom: "jaundice"
      },
      "joint-pain": {
        name: "maumivu ya viungo",
        tags: [],
        description: "Usumbufu pale ambapo mifupa miwili au zaidi hukutana na kuunda kiungo, waweza kusababisha ulemavu.",
        symptom: "joint-pain"
      },
      "joint-swelling": {
        name: "Kuvimba kwa jointi",
        tags: [
          "kuvimba",
          "edema",
          "kuvimba-isivyo-kawaida"
        ],
        description: "Kuvimba au kuongezeka kwa viungo kwa sababu ya kuongezeka kwa maji kujikusanya kwenye tishu zinazozunguka viungo.",
        symptom: "joint-swelling"
      },
      "kernigs-sign": {
        name: "Kernigs Sign",
        tags: [
          "ngumu",
          "mguu"
        ],
        description: "Ugumu mkubwa wa misuli ya paja ambayo husababisha kutoweza kunyoosha mguu wakati nyonga inazunguka hadi digrii 90.",
        symptom: "kernigs-sign"
      },
      "limited-range-of-motion": {
        name: "ufinyu wa mwendo",
        tags: [
          "jointi",
          "maumivu",
          "ngumu"
        ],
        description: "jointi yenye uwezo mdogo wa kusongea au kuinama.",
        symptom: "limited-range-of-motion"
      },
      malnutrition: {
        name: "Utapiamlo",
        tags: [
          "kupunguza-uzito",
          "kupunguza-uzito"
        ],
        description: "Mapungufu, ziada au kutokuwa na usawa katika ulaji wa virutubisho.",
        symptom: "malnutrition"
      },
      "mental-status": {
        name: "Hali ya Akili",
        tags: [
          "ulegevu",
          "koma"
        ],
        description: "Uwezo wa kiakili, ikiwa ni pamoja na kiwango cha fahamu, usikivu na kauli, hisia na athari.",
        symptom: "mental-status"
      },
      "mid-upper-arm-circumference": {
        name: "Mzingo wa Kati wa Mkono wa Juu",
        tags: [
          "utapiamlo",
          "uzito-mdogo"
        ],
        description: "Kipimo cha kutathmini hali ya lishe kwa kuangalia mzingo wa mkono wa juu wa kushoto.",
        symptom: "mid-upper-arm-circumference"
      },
      "muscle-tone": {
        name: "Muscle Tone",
        tags: [],
        description: "Kiasi cha mvutano (au upinzani wa misuli kusogea) kwenye misuli.",
        symptom: "muscle-tone"
      },
      "muscle-weakness": {
        name: "Udhaifu wa Misuli",
        tags: [
          "dhaifu",
          "misuli",
          "kuchoka",
          "kupooza"
        ],
        description: "Kupungua kwa nguvu katika misuli.",
        symptom: "muscle-weakness"
      },
      "nasal-congestion": {
        name: "Msongamano puani",
        tags: [
          "mafua"
        ],
        description: "Pua iliyovimba, wakati tishu za pua zimevimba kwa sababu ya  majimaji.",
        symptom: "nasal-congestion"
      },
      "nasal-discharge": {
        name: "Nasal Discharge",
        tags: [
          "mafua",
          "msongamano"
        ],
        description: "Kamasi inayotoka puani.",
        symptom: "nasal-discharge"
      },
      "nasal-polyps": {
        name: "Nasal Polyps",
        tags: [],
        description: "Ukuaji usio na maumivu kwenye utando wa pua ",
        symptom: "nasal-polyps"
      },
      "night-sweats": {
        name: "Majasho ya Usiku",
        tags: [
          "baridi"
        ],
        description: "Vipindi vinavyojirudia vya jasho kali ambalo linaweza kulowanisha nguo zako za kulalia au mashuka",
        symptom: "night-sweats"
      },
      oliguria: {
        name: "Oliguria",
        tags: [
          "mkojo",
          "kukojoa"
        ],
        description: "kupata mkojo chini ya kiwango cha kawaida ",
        symptom: "oliguria"
      },
      orthopnea: {
        name: "Orthopnea",
        tags: [
          "kupumua",
          "kupumua-kwa-shida"
        ],
        description: "Usumbufu wakati wa kupumua ukiwa umelala chini.",
        symptom: "orthopnea"
      },
      otalgia: {
        name: "Otalgia",
        tags: [
          "sikio",
          "maumivu",
          "maumivu-ya-sikio"
        ],
        description: "Maumivu ya sikio katika sikio la ndani au la nje ambayo inaweza kuiathiri uwezo wa kusikia.",
        symptom: "otalgia"
      },
      otorrhea: {
        name: " Otorrhea",
        tags: [
          "majimaji-ya-sikio",
          "kutoa",
          "majimaji"
        ],
        description: ": Majimaji kutoka sikioni.",
        symptom: "otorrhea"
      },
      pallor: {
        name: "Pallor",
        tags: [
          "ngozi-nyeupe"
        ],
        description: "weupe au kupoteza rangi kwenye kwa ngozi ",
        symptom: "pallor"
      },
      "peritonsillar-abscess": {
        name: "Peritonsillar Abscess",
        tags: [],
        description: "Mkusanyiko wa usaha katika tishu za koo.",
        symptom: "peritonsillar-abscess"
      },
      petechiae: {
        name: "Petechiae",
        tags: [
          "ngozi"
        ],
        description: "Madoa madogo ya mviringo yenye rangi ya hudhurungi kutokana na kutokwa na damu chini ya ngozi .",
        symptom: "petechiae"
      },
      photosensitivity: {
        name: "Photosensitivity",
        tags: [
          "upele",
          "nyekundu",
          "jua"
        ],
        description: "Milipuko ya kuwashwa au maeneo yenye uwekundu na kuvimba kwa Ngozi iliyo wazi. kwenye jua",
        symptom: "photosensitivity"
      },
      polyuria: {
        name: "Polyuria",
        tags: [],
        description: "Haja ya kukojoa mara nyingi zaidi kuliko kawaida.",
        symptom: "polyuria"
      },
      "poor-feeding": {
        name: "ulaji duni",
        tags: [
          "uchovu"
        ],
        description: "Nia kidogo katika kula au urahisi wa kupata uchovu wakati wa kula",
        symptom: "poor-feeding"
      },
      pruritis: {
        name: "Pruritis",
        tags: [
          "upele",
          "kuwasha",
          "kuwashwa",
          "kidonda"
        ],
        description: "Pia inaitwa ngozi inayowasha, ni hisia zisizofurahisha, zenye kuchochea na humfanya mtu kutaka kujikuna.",
        symptom: "pruritis"
      },
      "pulling-on-ear": {
        name: "Kuvuta Sikio",
        tags: [
          "sikio",
          "maumivu",
          "maumivu-ya-sikio",
          "otalgia"
        ],
        description: "Kugusa au kuvuta sikio, hasa kwa watoto wachanga.",
        symptom: "pulling-on-ear"
      },
      "pulse-rate": {
        name: "kiwango cha mapigo ya moyo",
        tags: [
          "kiwango-cha-moyo"
        ],
        description: "Idadi ya mara mapigo ya moyo wako katika dakika moja.",
        symptom: "pulse-rate"
      },
      purpura: {
        name: "Purpura",
        tags: [
          "ngozi"
        ],
        description: "Upele wa madoa ya zambarau, pia huitwa madoa ya damu.",
        symptom: "purpura"
      },
      "reduced-appetite": {
        name: "Kupunguza hamu ya kula",
        tags: [
          "njaa"
        ],
        description: "Kupunguza hamu ya kula.",
        symptom: "reduced-appetite"
      },
      rhinorrhea: {
        name: "Rhinorrhea",
        tags: [
          "mafua",
          "pua",
          "majimaji-kutoka-pua"
        ],
        description: "kukauka kwa maji na kamasi nene, kutoka kwenye pua na njia za pua.",
        symptom: "rhinorrhea"
      },
      seizures: {
        name: "Mishtuko ya moyo",
        tags: [
          "kutetemeka",
          "kupoteza-udhibiti-wa-kimwili-au-wa-kihisia"
        ],
        description: "usumbufu wa ghafla wa umeme usiodhibitiwa katika ubongo unaosababisha mabadiliko katika tabia, miondoko au hisia, na katika viwango vya fahamu.",
        symptom: "seizures"
      },
      "sinus-tenderness": {
        name: "Sinus Tenderness",
        tags: [],
        description: "maumivu ya uso.",
        symptom: "sinus-tenderness"
      },
      "skin-desquamation": {
        name: "Uharibifu wa ngozi",
        tags: [
          "ngozi",
          "kuchubua"
        ],
        description: "Uharibifu usiotarajiwa na upotezaji wa tabaka la juu la ngozi.",
        symptom: "skin-desquamation"
      },
      "skin-lesions": {
        name: "Vidonda vya ngozi",
        tags: [
          "upele",
          "nyekundu",
          "kidonda",
          "rangi"
        ],
        description: "Uvimbe usio wa kawaida, uvimbe, kidonda, kidonda au eneo la ngozi lenye rangi ",
        symptom: "skin-lesions"
      },
      "skin-rash": {
        name: "Upele wa ngozi",
        tags: [
          "upele",
          "ngozi",
          "nyekundu"
        ],
        description: "Mlipuko wa muda wa mabaka mekundu, matuta, magamba au kuwasha kwenye ngozi, ikiwezekana na malengelenge au makovu",
        symptom: "skin-rash"
      },
      "skin-turgor": {
        name: "Skin Turgor",
        tags: [],
        description: "uvutikaji wa ngozi ya mtu.",
        symptom: "skin-turgor"
      },
      sneezing: {
        name: "Kupiga chafya",
        tags: [],
        description: "Utoaji hewa kwa nguvu, bila hiari.",
        symptom: "sneezing"
      },
      snoring: {
        name: "Kukoroma",
        tags: [
          "kupumua"
        ],
        description: "Sauti kali kutoka puani au mdomoni ambayo hutokea wakati kupumua kunazuiliwa wakati wa kulala.",
        symptom: "snoring"
      },
      "sore-throat": {
        name: "Koo Kuuma",
        tags: [],
        description: "Maumivu au kuwashwa kwenye koo ambayo inaweza kutokea au isitokee wakati wa kumeza",
        symptom: "sore-throat"
      },
      splenomegaly: {
        name: " Splenomegaly",
        tags: [],
        description: "bandama kubwa",
        symptom: "splenomegaly"
      },
      stridor: {
        name: "Stridor",
        tags: [
          "kikohozi",
          "kupumua"
        ],
        description: "Sauti isiyo ya kawaida, ya juu, ya kupumua ",
        symptom: "stridor"
      },
      stunting: {
        name: "Kudumaa",
        tags: [
          "fupi",
          "ukuaji"
        ],
        description: "Ukuaji na maendeleo duni, kawaida huonekana kwa watoto.",
        symptom: "stunting"
      },
      "sunken-eyes": {
        name: "Macho Yanayozama",
        tags: [],
        description: "Ngozi chini ya macho inaonekana nyeusi, imezama ndani na tupu.",
        symptom: "sunken-eyes"
      },
      syncope: {
        name: "Syncope",
        tags: [
          "kutetemeka",
          "kupoteza-udhibiti-wa-kimwili-au-wa-kihisia"
        ],
        description: "Kuzirai au kupoteza fahamu kwa muda.",
        symptom: "syncope"
      },
      tachycardia: {
        name: "Tachycardia",
        tags: [
          "kiwango-cha-moyo"
        ],
        description: "Mapigo ya moyo yanayodunda haraka au mapigo ya moyo ya haraka.",
        symptom: "tachycardia"
      },
      tachypnoea: {
        name: "Tachypnoea",
        tags: [
          "kupumua"
        ],
        description: "Kupumua kwa kasi isiyo ya kawaida.",
        symptom: "tachypnoea"
      },
      "teeth-malocclusion": {
        name: "mpangilio usio kamili wa meno",
        tags: [],
        description: "Meno yasiyopangwa vizuri au mpangilio usio wa kawaida wa meno ya juu na ya chini.",
        symptom: "teeth-malocclusion"
      },
      "tet-spell": {
        name: "Tet Spell",
        tags: [
          "midimo-ya-bluu",
          "ngozi-ya-bluu"
        ],
        description: "Ngozi, kucha na midomo ya bluu kwa mtoto mchanga baada ya kulia au kulishwa chakula hii inasababishwa na kushuka kwa kasi kwa kiasi cha oksijeni katika damu.",
        symptom: "tet-spell"
      },
      underweight: {
        name: "uzito mdogo",
        tags: [],
        description: "Uzito unaochukuliwa kuwa mdogo sana kwa afya njema.",
        symptom: "underweight"
      },
      vomiting: {
        name: "kutapika",
        tags: [
          "tapika",
          "chakual",
          "kichefuchefu"
        ],
        description: "Kutoa nje kwa nguvu yaliyomo tumboni kupitia kinywa.",
        symptom: "vomiting"
      },
      wasting: {
        name: "Wasting",
        tags: [],
        description: "Uzito wa chini kwa uwiano wa urefu.",
        symptom: "wasting"
      },
      "weight-faltering": {
        name: "Uzito Kupungua",
        tags: [
          "uzito-duni",
          "uzito",
          "uzito-mdogo",
          "kulisha",
          "kula"
        ],
        description: "Kuongezeka kwa uzito ni polepole au kuchelewa, hasa kwa watoto wachanga na watoto.",
        symptom: "weight-faltering"
      },
      "weight-gain": {
        name: "kuongezeka uzito",
        tags: [],
        description: "Kilo zilizoongezwa  mara nyingi hutokana na kula kupita kiasi au ukosefu wa mazoezi ya mwili.",
        symptom: "weight-gain"
      },
      "weight-loss": {
        name: "kupungua uzito",
        tags: [],
        description: "Kupungua kwa uzito wa mwili.",
        symptom: "weight-loss"
      },
      wheezing: {
        name: "Kupumua",
        tags: [
          "kikohozi",
          "kupiga-miluzi"
        ],
        description: "Sauti ya juu ya mluzi inayosikika wakati wa kupumua.",
        symptom: "wheezing"
      }
    };
    var symptoms_translations_default = {
      en: en2,
      sw: sw2
    };
    var symptoms = {
      symptom: {
        fromId: (id) => symptoms_base_default[id]
      },
      ids: () => Object.keys(symptoms_base_default).sort((a, b) => a.localeCompare(b)),
      values: () => buildObject(symptoms_base_default)
    };
    var conditions = {
      name: {
        fromId: (id) => conditions_default[id]
      },
      ids: () => Object.keys(conditions_default).sort((a, b) => a.localeCompare(b)),
      values: () => build(conditions_default)
    };
    var donparMap2 = {
      translate: (language) => {
        return donpar_map_default[language];
      }
    };
    var symptomsLocale2 = {
      translate: (language) => {
        return symptoms_translations_default[language];
      }
    };
    var options = "options";
    var notes = "notes";
    var color = "Color";
    var appearance = "Appearance";
    var specific_gravity = "Specific gravity";
    var p_h = "pH";
    var glucose = "Glucose";
    var biliruben = "Biliruben";
    var ketones = "Ketones";
    var occult_blood = "Occult Blood";
    var protein = "Protein";
    var nitrite = "Nitrite";
    var leukocyte_esterase = "Leukocyte Esterase";
    var urine_wbc = "Urine WBC ";
    var urine_rbc = "Urine RBC";
    var urine_squamous_epithelial_cells = "Urine Squamous Epithelial Cells";
    var ascorbic_acid = "Ascorbic Acid";
    var csf_pressure = "CSF - Pressure";
    var csf_cell_count = "CSF - Cell Count";
    var csf_glucose = "CSF - Glucose";
    var csf_protein = "CSF - Protein";
    var bun_blood_urea_nitrogen = "BUN (Blood Urea Nitrogen)";
    var creatinine = "Creatinine";
    var glucose_plasma_fasting = "Glucose, plasma\u2014fasting";
    var albumin = "Albumin";
    var potassium_k = "Potassium (K+)";
    var sodium_na = "Sodium (Na+)";
    var magnesium_mg = "Magnesium (Mg+)";
    var chloride_cl = "Chloride (Cl-)";
    var co_2_carbon_dioxide_or_bicarbonate = "CO2 (Carbon dioxide or bicarbonate)";
    var phosphorus = "Phosphorus";
    var calcium_ca = "Calcium (Ca+)";
    var aminotransferase_alanine_alt = "Aminotransferase, alanine (ALT)";
    var aminotransferase_aspartate_ast = "Aminotransferase, aspartate (AST)";
    var alkaline_phosphatase_alp = "Alkaline phosphatase (ALP)";
    var total_bilirubin = "Total Bilirubin";
    var direct_bilirubin = "Direct Bilirubin";
    var haemoglobin_hb = "Haemoglobin (HB)";
    var white_cell_count_wbc = "White Cell Count (WBC)";
    var platelet_count_plt = "Platelet Count (PLT)";
    var red_blood_count_rbc = "Red Blood Count (RBC)";
    var mean_cell_volume_mcv = "Mean Cell Volume (MCV)";
    var packed_cell_volume_pcv_haematocrit_hct = "Packed Cell Volume (PCV)/Haematocrit (HCT)";
    var mean_cell_haemoglobin_mch = "Mean Cell Haemoglobin (MCH)";
    var mean_cell_haemoglobin_concentration_mchc = "Mean Cell Haemoglobin Concentration (MCHC)";
    var neutrophil_count = "Neutrophil Count";
    var lymphocyte_count = "Lymphocyte Count";
    var monocyte_count = "Monocyte Count";
    var eosinophil_count = "Eosinophil Count";
    var basophil_count = "Basophil Count";
    var mrdt_rapid_test = "MRDT (Rapid Test)";
    var malaria_blood_slide = "Malaria Blood Slide";
    var cd_4_count2 = "CD4 Count";
    var viral_load = "Viral load";
    var hiv_rapid_test2 = "HIV Rapid Test";
    var cr_ag = "CrAg+";
    var hepatitis_b_surface_antigen_h_bs_ag2 = "Hepatitis B Surface Antigen (HBsAg)";
    var hepatitis_b_e_antigen_hbe_ag = "Hepatitis B e-Antigen (HbeAg)";
    var x_ray = "X Ray";
    var mri2 = "MRI";
    var ct_scan2 = "CT Scan";
    var xpert_mtb_rif = "Xpert MTB/ RIF";
    var mantoux_ppd = "Mantoux / PPD";
    var sputum_culture2 = "Sputum Culture";
    var sputum_smear = "Sputum Smear";
    var sputum_pcr = "Sputum PCR";
    var csf_culture = "CSF Culture";
    var csf_india_ink_staining = "CSF: India Ink Staining";
    var blood_culture2 = "Blood Culture";
    var __2_beta_d_glucan = "1-2-Beta-D-Glucan";
    var urinalysis2 = "Urinalysis";
    var cerebrospinal_fluid_test_lumbar_puncture = "Cerebrospinal Fluid Test (Lumbar Puncture) ";
    var metabolic_panel = "Metabolic Panel";
    var liver_function_tests2 = "Liver function tests";
    var full_blood_picture = "Full Blood Picture";
    var hpv_screening2 = "HPV Screening";
    var h_pylori_stool_test2 = "H-Pylori Stool Test";
    var systolic_blood_pressure = "Systolic Blood Pressure";
    var diastolic_blood_pressure = "Diastolic Blood Pressure";
    var lactate_dehydrogenase_ldh = "Lactate Dehydrogenase (LDH)";
    var pregnancy_test2 = "Pregnancy Test";
    var oxygen_saturation = "Oxygen Saturation";
    var erythrocyte_sedimentation_rate_esr = "Erythrocyte Sedimentation Rate (ESR)";
    var iron_serum = "Iron, serum";
    var c_reactive_protein = "C-Reactive Protein";
    var investigation_name_map_default = {
      options,
      notes,
      color,
      appearance,
      "specific-gravity": specific_gravity,
      "p-h": p_h,
      glucose,
      biliruben,
      ketones,
      "occult-blood": occult_blood,
      protein,
      nitrite,
      "leukocyte-esterase": leukocyte_esterase,
      "urine-wbc": urine_wbc,
      "urine-rbc": urine_rbc,
      "urine-squamous-epithelial-cells": urine_squamous_epithelial_cells,
      "ascorbic-acid": ascorbic_acid,
      "csf-pressure": csf_pressure,
      "csf-cell-count": csf_cell_count,
      "csf-glucose": csf_glucose,
      "csf-protein": csf_protein,
      "bun-blood-urea-nitrogen": bun_blood_urea_nitrogen,
      creatinine,
      "glucose-plasma-fasting": glucose_plasma_fasting,
      albumin,
      "potassium-k": potassium_k,
      "sodium-na": sodium_na,
      "magnesium-mg": magnesium_mg,
      "chloride-cl": chloride_cl,
      "co-2-carbon-dioxide-or-bicarbonate": co_2_carbon_dioxide_or_bicarbonate,
      phosphorus,
      "calcium-ca": calcium_ca,
      "aminotransferase-alanine-alt": aminotransferase_alanine_alt,
      "aminotransferase-aspartate-ast": aminotransferase_aspartate_ast,
      "alkaline-phosphatase-alp": alkaline_phosphatase_alp,
      "total-bilirubin": total_bilirubin,
      "direct-bilirubin": direct_bilirubin,
      "haemoglobin-hb": haemoglobin_hb,
      "white-cell-count-wbc": white_cell_count_wbc,
      "platelet-count-plt": platelet_count_plt,
      "red-blood-count-rbc": red_blood_count_rbc,
      "mean-cell-volume-mcv": mean_cell_volume_mcv,
      "packed-cell-volume-pcv-haematocrit-hct": packed_cell_volume_pcv_haematocrit_hct,
      "mean-cell-haemoglobin-mch": mean_cell_haemoglobin_mch,
      "mean-cell-haemoglobin-concentration-mchc": mean_cell_haemoglobin_concentration_mchc,
      "neutrophil-count": neutrophil_count,
      "lymphocyte-count": lymphocyte_count,
      "monocyte-count": monocyte_count,
      "eosinophil-count": eosinophil_count,
      "basophil-count": basophil_count,
      "mrdt-rapid-test": mrdt_rapid_test,
      "malaria-blood-slide": malaria_blood_slide,
      "cd-4-count": cd_4_count2,
      "viral-load": viral_load,
      "hiv-rapid-test": hiv_rapid_test2,
      "cr-ag": cr_ag,
      "hepatitis-b-surface-antigen-h-bs-ag": hepatitis_b_surface_antigen_h_bs_ag2,
      "hepatitis-b-e-antigen-hbe-ag": hepatitis_b_e_antigen_hbe_ag,
      "x-ray": x_ray,
      mri: mri2,
      "ct-scan": ct_scan2,
      "xpert-mtb-rif": xpert_mtb_rif,
      "mantoux-ppd": mantoux_ppd,
      "sputum-culture": sputum_culture2,
      "sputum-smear": sputum_smear,
      "sputum-pcr": sputum_pcr,
      "csf-culture": csf_culture,
      "csf-india-ink-staining": csf_india_ink_staining,
      "blood-culture": blood_culture2,
      "1-2-beta-d-glucan": __2_beta_d_glucan,
      urinalysis: urinalysis2,
      "cerebrospinal-fluid-test-lumbar-puncture": cerebrospinal_fluid_test_lumbar_puncture,
      "metabolic-panel": metabolic_panel,
      "liver-function-tests": liver_function_tests2,
      "full-blood-picture": full_blood_picture,
      "hpv-screening": hpv_screening2,
      "h-pylori-stool-test": h_pylori_stool_test2,
      "systolic-blood-pressure": systolic_blood_pressure,
      "diastolic-blood-pressure": diastolic_blood_pressure,
      "lactate-dehydrogenase-ldh": lactate_dehydrogenase_ldh,
      "pregnancy-test": pregnancy_test2,
      "oxygen-saturation": oxygen_saturation,
      "erythrocyte-sedimentation-rate-esr": erythrocyte_sedimentation_rate_esr,
      "iron-serum": iron_serum,
      "c-reactive-protein": c_reactive_protein
    };
    var options2 = {
      type: "options",
      options: [
        "normal",
        "abnormal",
        "inconclusive"
      ]
    };
    var notes2 = {
      type: "text"
    };
    var color2 = {
      type: "options",
      options: [
        "Yellow",
        "Amber",
        "Red",
        "Blue",
        "Colorless",
        "Straw"
      ]
    };
    var appearance2 = {
      type: "options",
      options: [
        "Clear",
        "Cloudy",
        "Slightly Cloudy",
        "Turbid"
      ]
    };
    var specific_gravity2 = {
      type: "numeric-units",
      units: null
    };
    var p_h2 = {
      type: "numeric-units",
      units: "pH"
    };
    var glucose2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var biliruben2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var ketones2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var occult_blood2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var protein2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var nitrite2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var leukocyte_esterase2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var urine_wbc2 = {
      type: "numeric-units",
      units: "/HPF"
    };
    var urine_rbc2 = {
      type: "numeric-units",
      units: "/HPF"
    };
    var urine_squamous_epithelial_cells2 = {
      type: "numeric-units",
      units: "/HPF"
    };
    var ascorbic_acid2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var csf_pressure2 = {
      type: "numeric-units",
      units: "mmH2O"
    };
    var csf_cell_count2 = {
      type: "numeric-units",
      units: "x10^6 /L"
    };
    var csf_glucose2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var csf_protein2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var bun_blood_urea_nitrogen2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var creatinine2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var glucose_plasma_fasting2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var albumin2 = {
      type: "numeric-units",
      units: "g/dL"
    };
    var potassium_k2 = {
      type: "numeric-units",
      units: "mEq/L"
    };
    var sodium_na2 = {
      type: "numeric-units",
      units: "mEq/L"
    };
    var magnesium_mg2 = {
      type: "numeric-units",
      units: "mmol/L"
    };
    var chloride_cl2 = {
      type: "numeric-units",
      units: "mEq/L"
    };
    var co_2_carbon_dioxide_or_bicarbonate2 = {
      type: "numeric-units",
      units: "mEq/L"
    };
    var phosphorus2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var calcium_ca2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var aminotransferase_alanine_alt2 = {
      type: "numeric-units",
      units: "U/L"
    };
    var aminotransferase_aspartate_ast2 = {
      type: "numeric-units",
      units: "U/L"
    };
    var alkaline_phosphatase_alp2 = {
      type: "numeric-units",
      units: "U/L"
    };
    var total_bilirubin2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var direct_bilirubin2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var haemoglobin_hb2 = {
      type: "numeric-units",
      units: "g/L"
    };
    var white_cell_count_wbc2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var platelet_count_plt2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var red_blood_count_rbc2 = {
      type: "numeric-units",
      units: "x10^12 /L"
    };
    var mean_cell_volume_mcv2 = {
      type: "numeric-units",
      units: "fl"
    };
    var packed_cell_volume_pcv_haematocrit_hct2 = {
      type: "numeric-units",
      units: "L/L"
    };
    var mean_cell_haemoglobin_mch2 = {
      type: "numeric-units",
      units: "fmol/cell"
    };
    var mean_cell_haemoglobin_concentration_mchc2 = {
      type: "numeric-units",
      units: "g/L"
    };
    var neutrophil_count2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var lymphocyte_count2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var monocyte_count2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var eosinophil_count2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var basophil_count2 = {
      type: "numeric-units",
      units: "x10^9 /L"
    };
    var mrdt_rapid_test2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var malaria_blood_slide2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var cd_4_count3 = {
      type: "numeric-units",
      units: "cells/mm3"
    };
    var viral_load2 = {
      type: "numeric-units",
      units: "cells/mm3"
    };
    var hiv_rapid_test3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var cr_ag2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var hepatitis_b_surface_antigen_h_bs_ag3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var hepatitis_b_e_antigen_hbe_ag2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var x_ray2 = {
      type: "panel",
      investigations: [
        "options",
        "notes"
      ]
    };
    var mri3 = {
      type: "panel",
      investigations: [
        "options",
        "notes"
      ]
    };
    var ct_scan3 = {
      type: "panel",
      investigations: [
        "options",
        "notes"
      ]
    };
    var xpert_mtb_rif2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var mantoux_ppd2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var sputum_culture3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var sputum_smear2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var sputum_pcr2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var csf_culture2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var csf_india_ink_staining2 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var blood_culture3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var __2_beta_d_glucan2 = {
      type: "numeric-units",
      units: "pg/mL"
    };
    var urinalysis3 = {
      type: "panel",
      investigations: [
        "color",
        "appearance",
        "specific-gravity",
        "p-h",
        "glucose",
        "biliruben",
        "ketones",
        "occult-blood",
        "protein",
        "nitrite",
        "leukocyte-esterase",
        "urine-wbc",
        "urine-rbc",
        "urine-squamous-epithelial-cells",
        "ascorbic-acid"
      ]
    };
    var cerebrospinal_fluid_test_lumbar_puncture2 = {
      type: "panel",
      investigations: [
        "csf-pressure",
        "csf-cell-count",
        "csf-glucose",
        "csf-protein"
      ]
    };
    var metabolic_panel2 = {
      type: "panel",
      investigations: [
        "bun-blood-urea-nitrogen",
        "creatinine",
        "glucose-plasma-fasting",
        "albumin",
        "potassium-k",
        "sodium-na",
        "magnesium-mg",
        "chloride-cl",
        "co-2-carbon-dioxide-or-bicarbonate",
        "phosphorus",
        "calcium-ca"
      ]
    };
    var liver_function_tests3 = {
      type: "panel",
      investigations: [
        "aminotransferase-alanine-alt",
        "aminotransferase-aspartate-ast",
        "alkaline-phosphatase-alp",
        "albumin",
        "total-bilirubin",
        "direct-bilirubin",
        "creatinine"
      ]
    };
    var full_blood_picture2 = {
      type: "panel",
      investigations: [
        "haemoglobin-hb",
        "white-cell-count-wbc",
        "platelet-count-plt",
        "red-blood-count-rbc",
        "mean-cell-volume-mcv",
        "packed-cell-volume-pcv-haematocrit-hct",
        "mean-cell-haemoglobin-mch",
        "mean-cell-haemoglobin-concentration-mchc",
        "neutrophil-count",
        "lymphocyte-count",
        "monocyte-count",
        "eosinophil-count",
        "basophil-count"
      ]
    };
    var hpv_screening3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var h_pylori_stool_test3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var systolic_blood_pressure2 = {
      type: "numeric-units",
      units: "mmHg"
    };
    var diastolic_blood_pressure2 = {
      type: "numeric-units",
      units: "mmHg"
    };
    var lactate_dehydrogenase_ldh2 = {
      type: "numeric-units",
      units: "U/L"
    };
    var pregnancy_test3 = {
      type: "options",
      options: [
        "positive",
        "negative",
        "inconclusive"
      ]
    };
    var oxygen_saturation2 = {
      type: "numeric-units",
      units: "%"
    };
    var erythrocyte_sedimentation_rate_esr2 = {
      type: "numeric-units",
      units: "mm/hr"
    };
    var iron_serum2 = {
      type: "numeric-units",
      units: "mcg/dL"
    };
    var c_reactive_protein2 = {
      type: "numeric-units",
      units: "mg/dL"
    };
    var investigations_default = {
      options: options2,
      notes: notes2,
      color: color2,
      appearance: appearance2,
      "specific-gravity": specific_gravity2,
      "p-h": p_h2,
      glucose: glucose2,
      biliruben: biliruben2,
      ketones: ketones2,
      "occult-blood": occult_blood2,
      protein: protein2,
      nitrite: nitrite2,
      "leukocyte-esterase": leukocyte_esterase2,
      "urine-wbc": urine_wbc2,
      "urine-rbc": urine_rbc2,
      "urine-squamous-epithelial-cells": urine_squamous_epithelial_cells2,
      "ascorbic-acid": ascorbic_acid2,
      "csf-pressure": csf_pressure2,
      "csf-cell-count": csf_cell_count2,
      "csf-glucose": csf_glucose2,
      "csf-protein": csf_protein2,
      "bun-blood-urea-nitrogen": bun_blood_urea_nitrogen2,
      creatinine: creatinine2,
      "glucose-plasma-fasting": glucose_plasma_fasting2,
      albumin: albumin2,
      "potassium-k": potassium_k2,
      "sodium-na": sodium_na2,
      "magnesium-mg": magnesium_mg2,
      "chloride-cl": chloride_cl2,
      "co-2-carbon-dioxide-or-bicarbonate": co_2_carbon_dioxide_or_bicarbonate2,
      phosphorus: phosphorus2,
      "calcium-ca": calcium_ca2,
      "aminotransferase-alanine-alt": aminotransferase_alanine_alt2,
      "aminotransferase-aspartate-ast": aminotransferase_aspartate_ast2,
      "alkaline-phosphatase-alp": alkaline_phosphatase_alp2,
      "total-bilirubin": total_bilirubin2,
      "direct-bilirubin": direct_bilirubin2,
      "haemoglobin-hb": haemoglobin_hb2,
      "white-cell-count-wbc": white_cell_count_wbc2,
      "platelet-count-plt": platelet_count_plt2,
      "red-blood-count-rbc": red_blood_count_rbc2,
      "mean-cell-volume-mcv": mean_cell_volume_mcv2,
      "packed-cell-volume-pcv-haematocrit-hct": packed_cell_volume_pcv_haematocrit_hct2,
      "mean-cell-haemoglobin-mch": mean_cell_haemoglobin_mch2,
      "mean-cell-haemoglobin-concentration-mchc": mean_cell_haemoglobin_concentration_mchc2,
      "neutrophil-count": neutrophil_count2,
      "lymphocyte-count": lymphocyte_count2,
      "monocyte-count": monocyte_count2,
      "eosinophil-count": eosinophil_count2,
      "basophil-count": basophil_count2,
      "mrdt-rapid-test": mrdt_rapid_test2,
      "malaria-blood-slide": malaria_blood_slide2,
      "cd-4-count": cd_4_count3,
      "viral-load": viral_load2,
      "hiv-rapid-test": hiv_rapid_test3,
      "cr-ag": cr_ag2,
      "hepatitis-b-surface-antigen-h-bs-ag": hepatitis_b_surface_antigen_h_bs_ag3,
      "hepatitis-b-e-antigen-hbe-ag": hepatitis_b_e_antigen_hbe_ag2,
      "x-ray": x_ray2,
      mri: mri3,
      "ct-scan": ct_scan3,
      "xpert-mtb-rif": xpert_mtb_rif2,
      "mantoux-ppd": mantoux_ppd2,
      "sputum-culture": sputum_culture3,
      "sputum-smear": sputum_smear2,
      "sputum-pcr": sputum_pcr2,
      "csf-culture": csf_culture2,
      "csf-india-ink-staining": csf_india_ink_staining2,
      "blood-culture": blood_culture3,
      "1-2-beta-d-glucan": __2_beta_d_glucan2,
      urinalysis: urinalysis3,
      "cerebrospinal-fluid-test-lumbar-puncture": cerebrospinal_fluid_test_lumbar_puncture2,
      "metabolic-panel": metabolic_panel2,
      "liver-function-tests": liver_function_tests3,
      "full-blood-picture": full_blood_picture2,
      "hpv-screening": hpv_screening3,
      "h-pylori-stool-test": h_pylori_stool_test3,
      "systolic-blood-pressure": systolic_blood_pressure2,
      "diastolic-blood-pressure": diastolic_blood_pressure2,
      "lactate-dehydrogenase-ldh": lactate_dehydrogenase_ldh2,
      "pregnancy-test": pregnancy_test3,
      "oxygen-saturation": oxygen_saturation2,
      "erythrocyte-sedimentation-rate-esr": erythrocyte_sedimentation_rate_esr2,
      "iron-serum": iron_serum2,
      "c-reactive-protein": c_reactive_protein2
    };
    function constructInvestigationFromObj(obj) {
      if (obj === void 0) {
        return null;
      }
      if (obj.type !== "panel") {
        return obj;
      }
      const panelObj = {};
      obj.investigations.forEach((tKey) => {
        panelObj[tKey] = investigations_default[tKey];
      });
      return {
        type: "panel",
        items: panelObj
      };
    }
    function constructInvestigation(id) {
      const obj = investigations_default[id];
      return constructInvestigationFromObj(obj);
    }
    var investigation = {
      ids: () => Object.keys(investigation_name_map_default).sort((a, b) => a.localeCompare(b)),
      values: () => {
        Object.entries(investigations_default).sort((a, b) => a[0].localeCompare(b[0])).map((s) => {
          const [key, obj] = s;
          return __spreadValues({
            id: key
          }, constructInvestigationFromObj(obj));
        });
      },
      fromId: (id) => constructInvestigation(id),
      name: {
        fromId: (id) => {
          return investigation_name_map_default[id] || id;
        },
        values: () => {
          return Object.entries(investigation_name_map_default).sort((a, b) => a[1].localeCompare(b[1])).map((s) => {
            const [id, name] = s;
            return {
              id,
              name
            };
          });
        }
      }
    };
  }
});

// src/locale/index.tsx
var locale_exports = {};
__export(locale_exports, {
  LanguageProvider: () => LanguageProvider
});
module.exports = __toCommonJS(locale_exports);
init_cjs_shims();
var import_react = __toESM(require_react());
var import_i18next = __toESM(require("i18next"));
var import_react_i18next = require("react-i18next");
var import_react_native = require("react-native");

// src/locale/lang/en.ts
init_cjs_shims();
var en_default = {
  common: {
    actions: {
      present: "Present",
      absent: "Absent",
      save: "Save",
      close: "$t(common.close)",
      cancel: "$t(common.cancel)",
      next: "Next"
    },
    loading: "Loading",
    close: "Close",
    change: "Change",
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    sex: {
      male: "Male",
      female: "Female"
    },
    show: "Show",
    hide: "Hide",
    delete: "Delete",
    date: "Date",
    age: {
      years: "Years",
      months: "Months",
      days: "Days"
    },
    gender_patient: "{{ sex_text }} patient",
    presenting_symptom: "Presenting Symptom",
    absent_symptom: "Absent Symptom",
    symptom: {
      one: "Symptom",
      other: "Symptoms"
    },
    complete: "Complete"
  },
  login: {
    title: "Scan your card",
    description: "Please scan the QR code on your card"
  },
  home: {
    greetings: {
      hi: "Hi",
      hi_person: "Hi, {{ person }}"
    },
    history: {
      title: "Here's the list of your previous assessments",
      subtext: {
        none: "You haven't been visited by any patient recently",
        present: "+ {{ count }} other assessments"
      },
      item: {
        ps: "$t(common.presenting_symptom)",
        as: "$t(common.absent_symptom)",
        your_decision: "Your decision"
      },
      total_records: "Total recorded assessments",
      action: "View Assessment History"
    },
    new_assessment: {
      title: "Start new assessment",
      description: "To start a new assessment, please click on the button below",
      action: "New Assessment"
    }
  },
  settings: {
    title: "Settings",
    sample: "Hello there! This is sample",
    language: {
      title: "Change Language",
      description: "Select the language that you'd like to take effect across the entire application",
      action: "Apply language"
    },
    choose_language: {
      title: "Choose Language",
      description: "Choose the language that you'd like to take effect across the entire application"
    },
    logout: {
      title: "Logout",
      description: "Logout from the application",
      action: "Logout"
    }
  },
  assessment: {
    ldonpar: {
      location: "Location",
      duration: "Duration",
      onset: "Onset",
      nature: "Nature",
      periodicity: "Periodicity",
      aggravators: "Aggravators",
      reducers: "Reducers"
    },
    intake: {
      title: "Patient intake",
      description: "Please enter the patient's details",
      footer_note: "Tap on '$t(common.next)' go to the symptom assessment",
      is_pregnant: "Is pregnant?",
      delivery_due_date: "Delivery due date"
    },
    summary: {
      signs_summary: {
        text: "Signs and symptoms summary",
        no_symptoms: "There are no symptoms added",
        no_symptoms_more: "Tap on the button below to add a symptom or sign"
      },
      elsa_diagnosis: {
        title: "Elsa's Differential Diagnosis",
        nothing: "Nothing to from elsa",
        other_conditions: "Other conditions"
      },
      buttons: {
        add: "Add symptom or sign",
        conclude: "Conclude Assessment"
      },
      discard_dialog: {
        title: "Discard Assessment?",
        description: "Are you sure you want to discard the current symptom assessment?",
        action: "Discard"
      }
    },
    search: {
      title: "Search for sign or symptom",
      elsa_suggestions: "Elsa's suggestions",
      search_notice: "Begin typing below or selecting Elsa's suggestions to find signs or symptoms",
      select_item: "Press on an item to specify information on the sign or symptom"
    },
    manage: {
      title: "Manage Symptoms",
      search_text: "$t(assessment.search.title)",
      see_insights: "See Elsa's Ingishts",
      no_symptoms: {
        text: "No symptoms added",
        description: "Tap on the search box above, or choose from the list below to get started"
      }
    },
    feedback: {
      err: {
        text_make_selection: "Make sure you first select the condition of choice"
      },
      title: "Assessment Feedback",
      condition_decision: {
        title: "Condition Decision",
        description: "Based on your knowledge and assessment, what is you opinion of the underlying condition causing the patients symptoms",
        component: {
          text: "Choose conditions",
          search_text: "Search conditions",
          elsa_choices: "Elsa's choices",
          all_conditions: "Conditions"
        }
      },
      next_steps: {
        title: "Next Steps",
        description: "Based on the most likely condition above, you should consider the following recommendations.",
        dispense_meds: "Dispense the following medication",
        recommend_tests: "Recommend the patient gets the following tests",
        supply_ors_text: "Please make sure to supply patient with Oral Rehydration Salts (ORS)",
        supply_ors_button: "Tap to Include ORS"
      },
      recommendations: {
        title: "Recommendations provided",
        refered_nearest_facilty_text: "Refered to the nearest facility",
        refered_to_lab_tests: {
          text: "Refered to a laboratory testing",
          component: {
            text: "Choose laboratory tests",
            search_text: "Search laboratory tests",
            all_lab_tests: "Laboratory tests"
          }
        },
        dispensed_medications: {
          text: "Dispensed medication to the patient",
          component: {
            text: "Choose medications",
            search_text: "Search medications",
            all_medications: "Medications"
          }
        },
        additional_recommendations: {
          text: "Provided additional recommendations to the patient",
          placeholder: "Please type in recommendations, if any"
        }
      }
    }
  },
  components: {
    age: {
      text: "Age",
      items: {
        years: "Years",
        months: "Months",
        days: "Days"
      }
    },
    sex: {
      text: "Sex",
      items: {
        male: "Male",
        female: "Female"
      }
    },
    vitalSigns: {
      text: "Vital Signs",
      weight: {
        text: "Weight",
        items: {
          kg: "Kg",
          lb: "Lb"
        }
      },
      height: {
        text: "Height",
        items: {
          cm: "Cm",
          ft: "Ft"
        }
      },
      temp: {
        text: "Temperature",
        items: {
          celc: "*C",
          farh: "*F"
        }
      }
    }
  }
};

// src/locale/lang/sw.ts
init_cjs_shims();
var sw_default = {
  common: {
    actions: {
      present: "Ipo",
      absent: "Haipo",
      save: "Kubali",
      close: "$t(common.close)",
      cancel: "$t(common.cancel)",
      next: "Endelea"
    },
    loading: "Inapakua",
    close: "Funga",
    change: "Badili",
    cancel: "Ghairi",
    next: "Endelea",
    previous: "Rudi",
    sex: {
      male: "Kiume",
      female: "Kike"
    },
    show: "Onyesha",
    hide: "Ficha",
    delete: "Futa",
    date: "Tarehe",
    age: {
      years: "Miaka",
      months: "Miezi",
      days: "Siku"
    },
    gender_patient: "Mgonjwa wa {{ sex_text }}",
    presenting_symptom: "Dalili wasilishi",
    absent_symptom: "Dalili za kutokuwepo",
    symptom: {
      one: "Dalili",
      other: "Dalili"
    },
    complete: "Kamilisha"
  },
  login: {
    title: "Soma kadi yako",
    description: "Tafathali somesha kadi yako kwenye sehemu ya simu kwa hapo chini"
  },
  home: {
    greetings: {
      hi: "Salama",
      hi_person: "Salama, {{ person }}"
    },
    history: {
      title: "Anglia historia ya wagonjwa waliokutembelea",
      subtext: {
        none: "Hamna wagonjwa waliowekwa kwenye system",
        present: "na rekodi {{ count }} nyingine"
      },
      item: {
        ps: "Dalili ziliopo",
        as: "Dalili ambazo hazipo",
        your_decision: "Maamuzi yako"
      },
      total_records: "Idadi ya rekodi",
      action: "Onyesha rekodi zote"
    },
    new_assessment: {
      title: "Tathmini",
      description: "Ili kuanzisha tathmini mpya, bonyeza hapo chini",
      action: "Anza tathmini mpya"
    }
  },
  settings: {
    title: "Mipangilio",
    sample: "Salama! Hii ni sample",
    language: {
      title: "Badili lugha",
      description: "Badilisha lugha unayotaka itafsiriwe wenye kifaa chako",
      action: "Weka mabadiliko"
    },
    choose_language: {
      title: "Chagua Lugha",
      description: "Chagua lugha unayotaka itafsiriwe wenye kifaa chako"
    },
    logout: {
      title: "Ondoka",
      description: "Ondoka kwa muda kwenye kifaa mpaka pale utakapo rudi tena",
      action: "Ondoka sasa"
    }
  },
  assessment: {
    ldonpar: {
      location: "Mahali Mwilini",
      duration: "Muda",
      onset: "Onset",
      nature: "Asili",
      periodicity: "Periodicity",
      aggravators: "Vichochezi",
      reducers: "Vinavyo punguza dalili"
    },
    intake: {
      title: "Kumpokea mgojwa",
      description: "Ingiza maelezo ya mgonjwa unayempokea",
      footer_note: "Bonyeza '$t(common.next)' ili kwenda kwenye uthamini wa mgonjwa",
      is_pregnant: "Anamimba?",
      delivery_due_date: "Siku ya kukadiria ya kuzaa"
    },
    summary: {
      signs_summary: {
        text: "Muhtasari yenye ishara na dalili",
        no_symptoms: "Hamna ishara au dalili zilizo wekwa",
        no_symptoms_more: "Bonyeza hapo chini ilikuongeza ishara au dalili"
      },
      elsa_diagnosis: {
        title: "Utambuzi ya juu kutoka kwa Elsa",
        nothing: "Hamna utambuzi wowote uliotoleawa na elsa ",
        other_conditions: "Utambuzi mengine"
      },
      buttons: {
        add: "Ongeza ishara au dalili",
        conclude: "Hitimisha tathmini"
      },
      discard_dialog: {
        title: "Sitisha tathmini?",
        description: "Unauhakika unataka kusitisha tathmini unayoishughulikia?",
        action: "Sitisha"
      }
    },
    search: {
      title: "Tafuta ishara au dalili",
      elsa_suggestions: "Mapendekezo ya Elsa",
      search_notice: "Anza kwa kuandika ishara au dalili hapo chini au kuchangua mapendekezo ya Elsa",
      select_item: "Bonyeza ishara inayokaribiana na unachotafuta ili kuongoza mambo mengine juu ya hiyo"
    },
    manage: {
      title: "Simamia dalili",
      search_text: "$t(assessment.search.title)",
      see_insights: "Chunguza maarifa ya Elsa",
      no_symptoms: {
        text: "Hamna dalili au ishara zilizo wekwa",
        description: "Ili kuongeza dalili za mgonjwa, bonyeza hapo juu na uanze kuandika"
      }
    },
    feedback: {
      err: {
        text_make_selection: "Kuna kosa. Lazima kuchangue utambuzi wako kabla ya kuendelea"
      },
      title: "Mapendekezo yako",
      condition_decision: {
        title: "Uchaguo wa hali yako",
        description: "Kwa hisia zako, ni hali gani zinazo msumbua mgonjwa?",
        component: {
          text: "Fanya chaguo ya hali",
          search_text: "Tafuta chaguo",
          elsa_choices: "Utambuzi wa Elsa",
          all_conditions: "Hali tofauti"
        }
      },
      next_steps: {
        title: "Hatua Zifuatayo",
        description: "Kulingana na hali inayowezekana hapo juu, unapaswa kuzingatia mapendekezo yafuatayo.",
        dispense_meds: "Toa dawa zifuatazo",
        recommend_tests: "Pendekeza mgonjwa apate vipimo vifuatavyo",
        supply_ors_text: "Tafadhali mpatie mgonjwa Oral Rehydration Salts (ORS)",
        supply_ors_button: "Bonyeza kuongeza ORS"
      },
      recommendations: {
        title: "Mapendekezo mengine",
        refered_nearest_facilty_text: "Mrejeshe kituo cha afya cha karibu",
        refered_to_lab_tests: {
          text: "Rejea vipimo vya mahabara",
          component: {
            text: "Chagua kipimo au vipimo",
            search_text: "Tafuta kipimo cha mahabara",
            all_lab_tests: "Vipimo tofauti"
          }
        },
        dispensed_medications: {
          text: "Dawa ya kumpatia mgonjwa",
          component: {
            text: "Chagua dawa ya kumpatia",
            search_text: "Tafuta dawa",
            all_medications: "Dawa tofauti"
          }
        },
        additional_recommendations: {
          text: "Unamapendekezo megine kwa ajili ya mgonywa",
          placeholder: "Andika mapendekezo yoyote, kama yapo, uliyonayo kwa ajili ya mgonjwa"
        }
      }
    },
    components: {
      age: {
        text: "Umri",
        items: {
          years: "$t(common.age.years)",
          months: "$t(common.age.months)",
          days: "$t(common.age.days)"
        }
      },
      sex: {
        text: "Junsia",
        items: {
          male: "$t(common.male)",
          female: "$t(common.female)"
        }
      },
      vitalSigns: {
        text: "Ishara muhimu",
        weight: {
          text: "Uzito",
          items: {
            kg: "Kg",
            lb: "Lb"
          }
        },
        height: {
          text: "Urefu",
          items: {
            cm: "Cm",
            ft: "Ft"
          }
        },
        temp: {
          text: "Joto",
          items: {
            celc: "*C",
            farh: "*F"
          }
        }
      }
    }
  }
};

// src/locale/index.tsx
var data = __toESM(require_dist());
import_i18next.default.init({
  lng: "sw",
  debug: false,
  fallbackLng: "en",
  resources: {
    en: {
      translation: en_default,
      "donpar-map": data.donparMap.translate("en"),
      symptoms: data.symptomsLocale.translate("en")
    },
    sw: {
      translation: sw_default,
      "donpar-map": data.donparMap.translate("sw"),
      symptoms: data.symptomsLocale.translate("sw")
    }
  },
  compatibilityJSON: "v3",
  interpolation: { escapeValue: false }
}, (err) => {
  if (err) {
    console.log("houston, we have a problem!");
    console.error(err);
  }
});
var LanguageProvider = ({
  options,
  children
}) => {
  const [ready, setReady] = (0, import_react.useState)(false);
  const lang = "en";
  import_react.default.useEffect(() => {
    setReady(true);
  }, [options]);
  import_react.default.useEffect(() => {
    setReady(false);
    import_i18next.default.changeLanguage(lang, (err) => {
      if (err) {
        console.log("LANG CHANGE // houston, we have a problem!");
        console.error(err);
      }
      setReady(true);
    });
  }, [lang]);
  if (!ready) {
    return /* @__PURE__ */ import_react.default.createElement(import_react_native.View, {
      style: { flex: 1 }
    }, /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, null, "Loading translations to the application"));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react_i18next.I18nextProvider, {
    i18n: import_i18next.default
  }, children);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LanguageProvider
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
