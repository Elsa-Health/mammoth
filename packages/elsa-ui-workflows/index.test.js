var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/scheduler/cjs/scheduler-unstable_mock.production.min.js
var require_scheduler_unstable_mock_production_min = __commonJS({
  "node_modules/scheduler/cjs/scheduler-unstable_mock.production.min.js"(exports) {
    "use strict";
    init_cjs_shims();
    var f = 0;
    var g = null;
    var h = null;
    var k = -1;
    var l = null;
    var m = -1;
    var n = false;
    var p = false;
    var q = false;
    var r = false;
    function t() {
      return m !== -1 && l !== null && l.length >= m || r && q ? n = true : false;
    }
    function x() {
      if (p)
        throw Error("Already flushing work.");
      if (g !== null) {
        var a = g;
        p = true;
        try {
          var b = true;
          do
            b = a(true, f);
          while (b);
          b || (g = null);
          return true;
        } finally {
          p = false;
        }
      } else
        return false;
    }
    function z(a, b) {
      var c = a.length;
      a.push(b);
      a:
        for (; ; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (e !== void 0 && 0 < A(e, b))
            a[d] = b, a[c] = e, c = d;
          else
            break a;
        }
    }
    function B(a) {
      a = a[0];
      return a === void 0 ? null : a;
    }
    function C(a) {
      var b = a[0];
      if (b !== void 0) {
        var c = a.pop();
        if (c !== b) {
          a[0] = c;
          a:
            for (var d = 0, e = a.length; d < e; ) {
              var u = 2 * (d + 1) - 1, v = a[u], w = u + 1, y = a[w];
              if (v !== void 0 && 0 > A(v, c))
                y !== void 0 && 0 > A(y, v) ? (a[d] = y, a[w] = c, d = w) : (a[d] = v, a[u] = c, d = u);
              else if (y !== void 0 && 0 > A(y, c))
                a[d] = y, a[w] = c, d = w;
              else
                break a;
            }
        }
        return b;
      }
      return null;
    }
    function A(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return c !== 0 ? c : a.id - b.id;
    }
    var D = [];
    var E = [];
    var F = 1;
    var G = null;
    var H = 3;
    var I = false;
    var J = false;
    var K = false;
    function L(a) {
      for (var b = B(E); b !== null; ) {
        if (b.callback === null)
          C(E);
        else if (b.startTime <= a)
          C(E), b.sortIndex = b.expirationTime, z(D, b);
        else
          break;
        b = B(E);
      }
    }
    function M(a) {
      K = false;
      L(a);
      if (!J)
        if (B(D) !== null)
          J = true, g = N;
        else {
          var b = B(E);
          b !== null && (a = b.startTime - a, h = M, k = f + a);
        }
    }
    function N(a, b) {
      J = false;
      K && (K = false, h = null, k = -1);
      I = true;
      var c = H;
      try {
        L(b);
        for (G = B(D); G !== null && (!(G.expirationTime > b) || a && !t()); ) {
          var d = G.callback;
          if (typeof d === "function") {
            G.callback = null;
            H = G.priorityLevel;
            var e = d(G.expirationTime <= b);
            b = f;
            typeof e === "function" ? G.callback = e : G === B(D) && C(D);
            L(b);
          } else
            C(D);
          G = B(D);
        }
        if (G !== null)
          var u = true;
        else {
          var v = B(E);
          if (v !== null) {
            var w = v.startTime - b;
            h = M;
            k = f + w;
          }
          u = false;
        }
        return u;
      } finally {
        G = null, H = c, I = false;
      }
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_advanceTime = function(a) {
      console.log.name !== "disabledLog" && (f += a, h !== null && k <= f && (h(f), k = -1, h = null));
    };
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_clearYields = function() {
      if (l === null)
        return [];
      var a = l;
      l = null;
      return a;
    };
    exports.unstable_continueExecution = function() {
      J || I || (J = true, g = N);
    };
    exports.unstable_flushAll = function() {
      if (l !== null)
        throw Error("Log is not empty. Assert on the log of yielded values before flushing additional work.");
      x();
      if (l !== null)
        throw Error("While flushing work, something yielded a value. Use an assertion helper to assert on the log of yielded values, e.g. expect(Scheduler).toFlushAndYield([...])");
    };
    exports.unstable_flushAllWithoutAsserting = x;
    exports.unstable_flushExpired = function() {
      if (p)
        throw Error("Already flushing work.");
      if (g !== null) {
        p = true;
        try {
          g(false, f) || (g = null);
        } finally {
          p = false;
        }
      }
    };
    exports.unstable_flushNumberOfYields = function(a) {
      if (p)
        throw Error("Already flushing work.");
      if (g !== null) {
        var b = g;
        m = a;
        p = true;
        try {
          a = true;
          do
            a = b(true, f);
          while (a && !n);
          a || (g = null);
        } finally {
          m = -1, p = n = false;
        }
      }
    };
    exports.unstable_flushUntilNextPaint = function() {
      if (p)
        throw Error("Already flushing work.");
      if (g !== null) {
        var a = g;
        r = true;
        q = false;
        p = true;
        try {
          var b = true;
          do
            b = a(true, f);
          while (b && !n);
          b || (g = null);
        } finally {
          p = n = r = false;
        }
      }
    };
    exports.unstable_forceFrameRate = function() {
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return H;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return B(D);
    };
    exports.unstable_next = function(a) {
      switch (H) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = H;
      }
      var c = H;
      H = b;
      try {
        return a();
      } finally {
        H = c;
      }
    };
    exports.unstable_now = function() {
      return f;
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
      q = true;
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = H;
      H = a;
      try {
        return b();
      } finally {
        H = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = f;
      typeof c === "object" && c !== null ? (c = c.delay, c = typeof c === "number" && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: F++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, z(E, a), B(D) === null && a === B(E) && (K ? (h = null, k = -1) : K = true, h = M, k = f + (c - d))) : (a.sortIndex = e, z(D, a), J || I || (J = true, g = N));
      return a;
    };
    exports.unstable_shouldYield = t;
    exports.unstable_wrapCallback = function(a) {
      var b = H;
      return function() {
        var c = H;
        H = b;
        try {
          return a.apply(this, arguments);
        } finally {
          H = c;
        }
      };
    };
    exports.unstable_yieldValue = function(a) {
      console.log.name !== "disabledLog" && (l === null ? l = [a] : l.push(a));
    };
  }
});

// node_modules/scheduler/cjs/scheduler-unstable_mock.development.js
var require_scheduler_unstable_mock_development = __commonJS({
  "node_modules/scheduler/cjs/scheduler-unstable_mock.development.js"(exports) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var currentTime = 0;
        var scheduledCallback = null;
        var scheduledTimeout = null;
        var timeoutTime = -1;
        var yieldedValues = null;
        var expectedNumberOfYields = -1;
        var didStop = false;
        var isFlushing = false;
        var needsPaint = false;
        var shouldYieldForPaint = false;
        function requestHostCallback(callback) {
          scheduledCallback = callback;
        }
        function requestHostTimeout(callback, ms) {
          scheduledTimeout = callback;
          timeoutTime = currentTime + ms;
        }
        function cancelHostTimeout() {
          scheduledTimeout = null;
          timeoutTime = -1;
        }
        function shouldYieldToHost() {
          if (expectedNumberOfYields !== -1 && yieldedValues !== null && yieldedValues.length >= expectedNumberOfYields || shouldYieldForPaint && needsPaint) {
            didStop = true;
            return true;
          }
          return false;
        }
        function getCurrentTime() {
          return currentTime;
        }
        function forceFrameRate() {
        }
        function unstable_flushNumberOfYields(count) {
          if (isFlushing) {
            throw new Error("Already flushing work.");
          }
          if (scheduledCallback !== null) {
            var cb = scheduledCallback;
            expectedNumberOfYields = count;
            isFlushing = true;
            try {
              var hasMoreWork = true;
              do {
                hasMoreWork = cb(true, currentTime);
              } while (hasMoreWork && !didStop);
              if (!hasMoreWork) {
                scheduledCallback = null;
              }
            } finally {
              expectedNumberOfYields = -1;
              didStop = false;
              isFlushing = false;
            }
          }
        }
        function unstable_flushUntilNextPaint() {
          if (isFlushing) {
            throw new Error("Already flushing work.");
          }
          if (scheduledCallback !== null) {
            var cb = scheduledCallback;
            shouldYieldForPaint = true;
            needsPaint = false;
            isFlushing = true;
            try {
              var hasMoreWork = true;
              do {
                hasMoreWork = cb(true, currentTime);
              } while (hasMoreWork && !didStop);
              if (!hasMoreWork) {
                scheduledCallback = null;
              }
            } finally {
              shouldYieldForPaint = false;
              didStop = false;
              isFlushing = false;
            }
          }
        }
        function unstable_flushExpired() {
          if (isFlushing) {
            throw new Error("Already flushing work.");
          }
          if (scheduledCallback !== null) {
            isFlushing = true;
            try {
              var hasMoreWork = scheduledCallback(false, currentTime);
              if (!hasMoreWork) {
                scheduledCallback = null;
              }
            } finally {
              isFlushing = false;
            }
          }
        }
        function unstable_flushAllWithoutAsserting() {
          if (isFlushing) {
            throw new Error("Already flushing work.");
          }
          if (scheduledCallback !== null) {
            var cb = scheduledCallback;
            isFlushing = true;
            try {
              var hasMoreWork = true;
              do {
                hasMoreWork = cb(true, currentTime);
              } while (hasMoreWork);
              if (!hasMoreWork) {
                scheduledCallback = null;
              }
              return true;
            } finally {
              isFlushing = false;
            }
          } else {
            return false;
          }
        }
        function unstable_clearYields() {
          if (yieldedValues === null) {
            return [];
          }
          var values = yieldedValues;
          yieldedValues = null;
          return values;
        }
        function unstable_flushAll() {
          if (yieldedValues !== null) {
            throw new Error("Log is not empty. Assert on the log of yielded values before flushing additional work.");
          }
          unstable_flushAllWithoutAsserting();
          if (yieldedValues !== null) {
            throw new Error("While flushing work, something yielded a value. Use an assertion helper to assert on the log of yielded values, e.g. expect(Scheduler).toFlushAndYield([...])");
          }
        }
        function unstable_yieldValue(value) {
          if (console.log.name === "disabledLog") {
            return;
          }
          if (yieldedValues === null) {
            yieldedValues = [value];
          } else {
            yieldedValues.push(value);
          }
        }
        function unstable_advanceTime(ms) {
          if (console.log.name === "disabledLog") {
            return;
          }
          currentTime += ms;
          if (scheduledTimeout !== null && timeoutTime <= currentTime) {
            scheduledTimeout(currentTime);
            timeoutTime = -1;
            scheduledTimeout = null;
          }
        }
        function requestPaint() {
          needsPaint = true;
        }
        function push(heap, node) {
          var index = heap.length;
          heap.push(node);
          siftUp(heap, node, index);
        }
        function peek(heap) {
          var first = heap[0];
          return first === void 0 ? null : first;
        }
        function pop(heap) {
          var first = heap[0];
          if (first !== void 0) {
            var last = heap.pop();
            if (last !== first) {
              heap[0] = last;
              siftDown(heap, last, 0);
            }
            return first;
          } else {
            return null;
          }
        }
        function siftUp(heap, node, i) {
          var index = i;
          while (true) {
            var parentIndex = index - 1 >>> 1;
            var parent = heap[parentIndex];
            if (parent !== void 0 && compare(parent, node) > 0) {
              heap[parentIndex] = node;
              heap[index] = parent;
              index = parentIndex;
            } else {
              return;
            }
          }
        }
        function siftDown(heap, node, i) {
          var index = i;
          var length = heap.length;
          while (index < length) {
            var leftIndex = (index + 1) * 2 - 1;
            var left = heap[leftIndex];
            var rightIndex = leftIndex + 1;
            var right = heap[rightIndex];
            if (left !== void 0 && compare(left, node) < 0) {
              if (right !== void 0 && compare(right, left) < 0) {
                heap[index] = right;
                heap[rightIndex] = node;
                index = rightIndex;
              } else {
                heap[index] = left;
                heap[leftIndex] = node;
                index = leftIndex;
              }
            } else if (right !== void 0 && compare(right, node) < 0) {
              heap[index] = right;
              heap[rightIndex] = node;
              index = rightIndex;
            } else {
              return;
            }
          }
        }
        function compare(a, b) {
          var diff = a.sortIndex - b.sortIndex;
          return diff !== 0 ? diff : a.id - b.id;
        }
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {
        }
        var maxSigned31BitInt = 1073741823;
        var IMMEDIATE_PRIORITY_TIMEOUT = -1;
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5e3;
        var LOW_PRIORITY_TIMEOUT = 1e4;
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
        var taskQueue = [];
        var timerQueue = [];
        var taskIdCounter = 1;
        var currentTask = null;
        var currentPriorityLevel = NormalPriority;
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false;
        function advanceTimers(currentTime2) {
          var timer = peek(timerQueue);
          while (timer !== null) {
            if (timer.callback === null) {
              pop(timerQueue);
            } else if (timer.startTime <= currentTime2) {
              pop(timerQueue);
              timer.sortIndex = timer.expirationTime;
              push(taskQueue, timer);
            } else {
              return;
            }
            timer = peek(timerQueue);
          }
        }
        function handleTimeout(currentTime2) {
          isHostTimeoutScheduled = false;
          advanceTimers(currentTime2);
          if (!isHostCallbackScheduled) {
            if (peek(taskQueue) !== null) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            } else {
              var firstTimer = peek(timerQueue);
              if (firstTimer !== null) {
                requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime2);
              }
            }
          }
        }
        function flushWork(hasTimeRemaining, initialTime) {
          isHostCallbackScheduled = false;
          if (isHostTimeoutScheduled) {
            isHostTimeoutScheduled = false;
            cancelHostTimeout();
          }
          isPerformingWork = true;
          var previousPriorityLevel = currentPriorityLevel;
          try {
            if (enableProfiling) {
              try {
                return workLoop(hasTimeRemaining, initialTime);
              } catch (error) {
                if (currentTask !== null) {
                  var currentTime2 = getCurrentTime();
                  markTaskErrored(currentTask, currentTime2);
                  currentTask.isQueued = false;
                }
                throw error;
              }
            } else {
              return workLoop(hasTimeRemaining, initialTime);
            }
          } finally {
            currentTask = null;
            currentPriorityLevel = previousPriorityLevel;
            isPerformingWork = false;
          }
        }
        function workLoop(hasTimeRemaining, initialTime) {
          var currentTime2 = initialTime;
          advanceTimers(currentTime2);
          currentTask = peek(taskQueue);
          while (currentTask !== null && !enableSchedulerDebugging) {
            if (currentTask.expirationTime > currentTime2 && (!hasTimeRemaining || shouldYieldToHost())) {
              break;
            }
            var callback = currentTask.callback;
            if (typeof callback === "function") {
              currentTask.callback = null;
              currentPriorityLevel = currentTask.priorityLevel;
              var didUserCallbackTimeout = currentTask.expirationTime <= currentTime2;
              var continuationCallback = callback(didUserCallbackTimeout);
              currentTime2 = getCurrentTime();
              if (typeof continuationCallback === "function") {
                currentTask.callback = continuationCallback;
              } else {
                if (currentTask === peek(taskQueue)) {
                  pop(taskQueue);
                }
              }
              advanceTimers(currentTime2);
            } else {
              pop(taskQueue);
            }
            currentTask = peek(taskQueue);
          }
          if (currentTask !== null) {
            return true;
          } else {
            var firstTimer = peek(timerQueue);
            if (firstTimer !== null) {
              requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime2);
            }
            return false;
          }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
          switch (priorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
            case LowPriority:
            case IdlePriority:
              break;
            default:
              priorityLevel = NormalPriority;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_next(eventHandler) {
          var priorityLevel;
          switch (currentPriorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
              priorityLevel = NormalPriority;
              break;
            default:
              priorityLevel = currentPriorityLevel;
              break;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_wrapCallback(callback) {
          var parentPriorityLevel = currentPriorityLevel;
          return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
              return callback.apply(this, arguments);
            } finally {
              currentPriorityLevel = previousPriorityLevel;
            }
          };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
          var currentTime2 = getCurrentTime();
          var startTime;
          if (typeof options === "object" && options !== null) {
            var delay = options.delay;
            if (typeof delay === "number" && delay > 0) {
              startTime = currentTime2 + delay;
            } else {
              startTime = currentTime2;
            }
          } else {
            startTime = currentTime2;
          }
          var timeout;
          switch (priorityLevel) {
            case ImmediatePriority:
              timeout = IMMEDIATE_PRIORITY_TIMEOUT;
              break;
            case UserBlockingPriority:
              timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
              break;
            case IdlePriority:
              timeout = IDLE_PRIORITY_TIMEOUT;
              break;
            case LowPriority:
              timeout = LOW_PRIORITY_TIMEOUT;
              break;
            case NormalPriority:
            default:
              timeout = NORMAL_PRIORITY_TIMEOUT;
              break;
          }
          var expirationTime = startTime + timeout;
          var newTask = {
            id: taskIdCounter++,
            callback,
            priorityLevel,
            startTime,
            expirationTime,
            sortIndex: -1
          };
          if (startTime > currentTime2) {
            newTask.sortIndex = startTime;
            push(timerQueue, newTask);
            if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
              if (isHostTimeoutScheduled) {
                cancelHostTimeout();
              } else {
                isHostTimeoutScheduled = true;
              }
              requestHostTimeout(handleTimeout, startTime - currentTime2);
            }
          } else {
            newTask.sortIndex = expirationTime;
            push(taskQueue, newTask);
            if (!isHostCallbackScheduled && !isPerformingWork) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            }
          }
          return newTask;
        }
        function unstable_pauseExecution() {
        }
        function unstable_continueExecution() {
          if (!isHostCallbackScheduled && !isPerformingWork) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
          }
        }
        function unstable_getFirstCallbackNode() {
          return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
          task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
          return currentPriorityLevel;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_advanceTime = unstable_advanceTime;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_clearYields = unstable_clearYields;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_flushAll = unstable_flushAll;
        exports.unstable_flushAllWithoutAsserting = unstable_flushAllWithoutAsserting;
        exports.unstable_flushExpired = unstable_flushExpired;
        exports.unstable_flushNumberOfYields = unstable_flushNumberOfYields;
        exports.unstable_flushUntilNextPaint = unstable_flushUntilNextPaint;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_now = getCurrentTime;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        exports.unstable_yieldValue = unstable_yieldValue;
      })();
    }
  }
});

// node_modules/scheduler/unstable_mock.js
var require_unstable_mock = __commonJS({
  "node_modules/scheduler/unstable_mock.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_scheduler_unstable_mock_production_min();
    } else {
      module2.exports = require_scheduler_unstable_mock_development();
    }
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
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
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
              value: self2
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
          var self2 = null;
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
            self2 = config.__self === void 0 ? null : config.__self;
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
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
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
          var self2 = element._self;
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
          return ReactElement(element.type, key, ref, self2, source, owner, props);
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
        function createContext2(defaultValue, calculateChangedBits) {
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
        function forwardRef(render2) {
          {
            if (render2 != null && render2.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render2 !== "function") {
              error("forwardRef requires a render function but was given %s.", render2 === null ? "null" : typeof render2);
            } else {
              if (render2.length !== 0 && render2.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render2.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render2 != null) {
              if (render2.defaultProps != null || render2.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render: render2
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
                if (render2.displayName == null) {
                  render2.displayName = name;
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
        function useEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create2, deps);
        }
        function useLayoutEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create2, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create2, deps);
        }
        function useImperativeHandle(ref, create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create2, deps);
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
        exports.createContext = createContext2;
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

// node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS({
  "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
    "use strict";
    init_cjs_shims();
    var f;
    var g;
    var h;
    var k;
    if (typeof performance === "object" && typeof performance.now === "function") {
      l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var l;
    var p;
    var q;
    if (typeof window === "undefined" || typeof MessageChannel !== "function") {
      t = null, u = null, w = function() {
        if (t !== null)
          try {
            var a = exports.unstable_now();
            t(true, a);
            t = null;
          } catch (b) {
            throw setTimeout(w, 0), b;
          }
      };
      f = function(a) {
        t !== null ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
      };
      g = function(a, b) {
        u = setTimeout(a, b);
      };
      h = function() {
        clearTimeout(u);
      };
      exports.unstable_shouldYield = function() {
        return false;
      };
      k = exports.unstable_forceFrameRate = function() {
      };
    } else {
      x = window.setTimeout, y = window.clearTimeout;
      if (typeof console !== "undefined") {
        z = window.cancelAnimationFrame;
        typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        typeof z !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      }
      A = false, B = null, C = -1, D = 5, E = 0;
      exports.unstable_shouldYield = function() {
        return exports.unstable_now() >= E;
      };
      k = function() {
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      F = new MessageChannel(), G = F.port2;
      F.port1.onmessage = function() {
        if (B !== null) {
          var a = exports.unstable_now();
          E = a + D;
          try {
            B(true, a) ? G.postMessage(null) : (A = false, B = null);
          } catch (b) {
            throw G.postMessage(null), b;
          }
        } else
          A = false;
      };
      f = function(a) {
        B = a;
        A || (A = true, G.postMessage(null));
      };
      g = function(a, b) {
        C = x(function() {
          a(exports.unstable_now());
        }, b);
      };
      h = function() {
        y(C);
        C = -1;
      };
    }
    var t;
    var u;
    var w;
    var x;
    var y;
    var z;
    var A;
    var B;
    var C;
    var D;
    var E;
    var F;
    var G;
    function H(a, b) {
      var c = a.length;
      a.push(b);
      a:
        for (; ; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (e !== void 0 && 0 < I(e, b))
            a[d] = b, a[c] = e, c = d;
          else
            break a;
        }
    }
    function J(a) {
      a = a[0];
      return a === void 0 ? null : a;
    }
    function K(a) {
      var b = a[0];
      if (b !== void 0) {
        var c = a.pop();
        if (c !== b) {
          a[0] = c;
          a:
            for (var d = 0, e = a.length; d < e; ) {
              var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
              if (n !== void 0 && 0 > I(n, c))
                r !== void 0 && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
              else if (r !== void 0 && 0 > I(r, c))
                a[d] = r, a[v] = c, d = v;
              else
                break a;
            }
        }
        return b;
      }
      return null;
    }
    function I(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return c !== 0 ? c : a.id - b.id;
    }
    var L = [];
    var M = [];
    var N = 1;
    var O = null;
    var P = 3;
    var Q = false;
    var R = false;
    var S = false;
    function T(a) {
      for (var b = J(M); b !== null; ) {
        if (b.callback === null)
          K(M);
        else if (b.startTime <= a)
          K(M), b.sortIndex = b.expirationTime, H(L, b);
        else
          break;
        b = J(M);
      }
    }
    function U(a) {
      S = false;
      T(a);
      if (!R)
        if (J(L) !== null)
          R = true, f(V);
        else {
          var b = J(M);
          b !== null && g(U, b.startTime - a);
        }
    }
    function V(a, b) {
      R = false;
      S && (S = false, h());
      Q = true;
      var c = P;
      try {
        T(b);
        for (O = J(L); O !== null && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
          var d = O.callback;
          if (typeof d === "function") {
            O.callback = null;
            P = O.priorityLevel;
            var e = d(O.expirationTime <= b);
            b = exports.unstable_now();
            typeof e === "function" ? O.callback = e : O === J(L) && K(L);
            T(b);
          } else
            K(L);
          O = J(L);
        }
        if (O !== null)
          var m = true;
        else {
          var n = J(M);
          n !== null && g(U, n.startTime - b);
          m = false;
        }
        return m;
      } finally {
        O = null, P = c, Q = false;
      }
    }
    var W = k;
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      R || Q || (R = true, f(V));
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return P;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return J(L);
    };
    exports.unstable_next = function(a) {
      switch (P) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = P;
      }
      var c = P;
      P = b;
      try {
        return a();
      } finally {
        P = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = W;
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = P;
      P = a;
      try {
        return b();
      } finally {
        P = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      typeof c === "object" && c !== null ? (c = c.delay, c = typeof c === "number" && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: N++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, H(M, a), J(L) === null && a === J(M) && (S ? h() : S = true, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = true, f(V)));
      return a;
    };
    exports.unstable_wrapCallback = function(a) {
      var b = P;
      return function() {
        var c = P;
        P = b;
        try {
          return a.apply(this, arguments);
        } finally {
          P = c;
        }
      };
    };
  }
});

// node_modules/scheduler/cjs/scheduler.development.js
var require_scheduler_development = __commonJS({
  "node_modules/scheduler/cjs/scheduler.development.js"(exports) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var requestHostCallback;
        var requestHostTimeout;
        var cancelHostTimeout;
        var requestPaint;
        var hasPerformanceNow = typeof performance === "object" && typeof performance.now === "function";
        if (hasPerformanceNow) {
          var localPerformance = performance;
          exports.unstable_now = function() {
            return localPerformance.now();
          };
        } else {
          var localDate = Date;
          var initialTime = localDate.now();
          exports.unstable_now = function() {
            return localDate.now() - initialTime;
          };
        }
        if (typeof window === "undefined" || typeof MessageChannel !== "function") {
          var _callback = null;
          var _timeoutID = null;
          var _flushCallback = function() {
            if (_callback !== null) {
              try {
                var currentTime = exports.unstable_now();
                var hasRemainingTime = true;
                _callback(hasRemainingTime, currentTime);
                _callback = null;
              } catch (e) {
                setTimeout(_flushCallback, 0);
                throw e;
              }
            }
          };
          requestHostCallback = function(cb) {
            if (_callback !== null) {
              setTimeout(requestHostCallback, 0, cb);
            } else {
              _callback = cb;
              setTimeout(_flushCallback, 0);
            }
          };
          requestHostTimeout = function(cb, ms) {
            _timeoutID = setTimeout(cb, ms);
          };
          cancelHostTimeout = function() {
            clearTimeout(_timeoutID);
          };
          exports.unstable_shouldYield = function() {
            return false;
          };
          requestPaint = exports.unstable_forceFrameRate = function() {
          };
        } else {
          var _setTimeout = window.setTimeout;
          var _clearTimeout = window.clearTimeout;
          if (typeof console !== "undefined") {
            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;
            if (typeof requestAnimationFrame !== "function") {
              console["error"]("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
            }
            if (typeof cancelAnimationFrame !== "function") {
              console["error"]("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
            }
          }
          var isMessageLoopRunning = false;
          var scheduledHostCallback = null;
          var taskTimeoutID = -1;
          var yieldInterval = 5;
          var deadline = 0;
          {
            exports.unstable_shouldYield = function() {
              return exports.unstable_now() >= deadline;
            };
            requestPaint = function() {
            };
          }
          exports.unstable_forceFrameRate = function(fps) {
            if (fps < 0 || fps > 125) {
              console["error"]("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
              return;
            }
            if (fps > 0) {
              yieldInterval = Math.floor(1e3 / fps);
            } else {
              yieldInterval = 5;
            }
          };
          var performWorkUntilDeadline = function() {
            if (scheduledHostCallback !== null) {
              var currentTime = exports.unstable_now();
              deadline = currentTime + yieldInterval;
              var hasTimeRemaining = true;
              try {
                var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                if (!hasMoreWork) {
                  isMessageLoopRunning = false;
                  scheduledHostCallback = null;
                } else {
                  port.postMessage(null);
                }
              } catch (error) {
                port.postMessage(null);
                throw error;
              }
            } else {
              isMessageLoopRunning = false;
            }
          };
          var channel = new MessageChannel();
          var port = channel.port2;
          channel.port1.onmessage = performWorkUntilDeadline;
          requestHostCallback = function(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
              isMessageLoopRunning = true;
              port.postMessage(null);
            }
          };
          requestHostTimeout = function(callback, ms) {
            taskTimeoutID = _setTimeout(function() {
              callback(exports.unstable_now());
            }, ms);
          };
          cancelHostTimeout = function() {
            _clearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
          };
        }
        function push(heap, node) {
          var index = heap.length;
          heap.push(node);
          siftUp(heap, node, index);
        }
        function peek(heap) {
          var first = heap[0];
          return first === void 0 ? null : first;
        }
        function pop(heap) {
          var first = heap[0];
          if (first !== void 0) {
            var last = heap.pop();
            if (last !== first) {
              heap[0] = last;
              siftDown(heap, last, 0);
            }
            return first;
          } else {
            return null;
          }
        }
        function siftUp(heap, node, i) {
          var index = i;
          while (true) {
            var parentIndex = index - 1 >>> 1;
            var parent = heap[parentIndex];
            if (parent !== void 0 && compare(parent, node) > 0) {
              heap[parentIndex] = node;
              heap[index] = parent;
              index = parentIndex;
            } else {
              return;
            }
          }
        }
        function siftDown(heap, node, i) {
          var index = i;
          var length = heap.length;
          while (index < length) {
            var leftIndex = (index + 1) * 2 - 1;
            var left = heap[leftIndex];
            var rightIndex = leftIndex + 1;
            var right = heap[rightIndex];
            if (left !== void 0 && compare(left, node) < 0) {
              if (right !== void 0 && compare(right, left) < 0) {
                heap[index] = right;
                heap[rightIndex] = node;
                index = rightIndex;
              } else {
                heap[index] = left;
                heap[leftIndex] = node;
                index = leftIndex;
              }
            } else if (right !== void 0 && compare(right, node) < 0) {
              heap[index] = right;
              heap[rightIndex] = node;
              index = rightIndex;
            } else {
              return;
            }
          }
        }
        function compare(a, b) {
          var diff = a.sortIndex - b.sortIndex;
          return diff !== 0 ? diff : a.id - b.id;
        }
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {
        }
        var maxSigned31BitInt = 1073741823;
        var IMMEDIATE_PRIORITY_TIMEOUT = -1;
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5e3;
        var LOW_PRIORITY_TIMEOUT = 1e4;
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
        var taskQueue = [];
        var timerQueue = [];
        var taskIdCounter = 1;
        var currentTask = null;
        var currentPriorityLevel = NormalPriority;
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false;
        function advanceTimers(currentTime) {
          var timer = peek(timerQueue);
          while (timer !== null) {
            if (timer.callback === null) {
              pop(timerQueue);
            } else if (timer.startTime <= currentTime) {
              pop(timerQueue);
              timer.sortIndex = timer.expirationTime;
              push(taskQueue, timer);
            } else {
              return;
            }
            timer = peek(timerQueue);
          }
        }
        function handleTimeout(currentTime) {
          isHostTimeoutScheduled = false;
          advanceTimers(currentTime);
          if (!isHostCallbackScheduled) {
            if (peek(taskQueue) !== null) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            } else {
              var firstTimer = peek(timerQueue);
              if (firstTimer !== null) {
                requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
              }
            }
          }
        }
        function flushWork(hasTimeRemaining, initialTime2) {
          isHostCallbackScheduled = false;
          if (isHostTimeoutScheduled) {
            isHostTimeoutScheduled = false;
            cancelHostTimeout();
          }
          isPerformingWork = true;
          var previousPriorityLevel = currentPriorityLevel;
          try {
            if (enableProfiling) {
              try {
                return workLoop(hasTimeRemaining, initialTime2);
              } catch (error) {
                if (currentTask !== null) {
                  var currentTime = exports.unstable_now();
                  markTaskErrored(currentTask, currentTime);
                  currentTask.isQueued = false;
                }
                throw error;
              }
            } else {
              return workLoop(hasTimeRemaining, initialTime2);
            }
          } finally {
            currentTask = null;
            currentPriorityLevel = previousPriorityLevel;
            isPerformingWork = false;
          }
        }
        function workLoop(hasTimeRemaining, initialTime2) {
          var currentTime = initialTime2;
          advanceTimers(currentTime);
          currentTask = peek(taskQueue);
          while (currentTask !== null && !enableSchedulerDebugging) {
            if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || exports.unstable_shouldYield())) {
              break;
            }
            var callback = currentTask.callback;
            if (typeof callback === "function") {
              currentTask.callback = null;
              currentPriorityLevel = currentTask.priorityLevel;
              var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
              var continuationCallback = callback(didUserCallbackTimeout);
              currentTime = exports.unstable_now();
              if (typeof continuationCallback === "function") {
                currentTask.callback = continuationCallback;
              } else {
                if (currentTask === peek(taskQueue)) {
                  pop(taskQueue);
                }
              }
              advanceTimers(currentTime);
            } else {
              pop(taskQueue);
            }
            currentTask = peek(taskQueue);
          }
          if (currentTask !== null) {
            return true;
          } else {
            var firstTimer = peek(timerQueue);
            if (firstTimer !== null) {
              requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
            }
            return false;
          }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
          switch (priorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
            case LowPriority:
            case IdlePriority:
              break;
            default:
              priorityLevel = NormalPriority;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_next(eventHandler) {
          var priorityLevel;
          switch (currentPriorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
              priorityLevel = NormalPriority;
              break;
            default:
              priorityLevel = currentPriorityLevel;
              break;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_wrapCallback(callback) {
          var parentPriorityLevel = currentPriorityLevel;
          return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
              return callback.apply(this, arguments);
            } finally {
              currentPriorityLevel = previousPriorityLevel;
            }
          };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
          var currentTime = exports.unstable_now();
          var startTime;
          if (typeof options === "object" && options !== null) {
            var delay = options.delay;
            if (typeof delay === "number" && delay > 0) {
              startTime = currentTime + delay;
            } else {
              startTime = currentTime;
            }
          } else {
            startTime = currentTime;
          }
          var timeout;
          switch (priorityLevel) {
            case ImmediatePriority:
              timeout = IMMEDIATE_PRIORITY_TIMEOUT;
              break;
            case UserBlockingPriority:
              timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
              break;
            case IdlePriority:
              timeout = IDLE_PRIORITY_TIMEOUT;
              break;
            case LowPriority:
              timeout = LOW_PRIORITY_TIMEOUT;
              break;
            case NormalPriority:
            default:
              timeout = NORMAL_PRIORITY_TIMEOUT;
              break;
          }
          var expirationTime = startTime + timeout;
          var newTask = {
            id: taskIdCounter++,
            callback,
            priorityLevel,
            startTime,
            expirationTime,
            sortIndex: -1
          };
          if (startTime > currentTime) {
            newTask.sortIndex = startTime;
            push(timerQueue, newTask);
            if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
              if (isHostTimeoutScheduled) {
                cancelHostTimeout();
              } else {
                isHostTimeoutScheduled = true;
              }
              requestHostTimeout(handleTimeout, startTime - currentTime);
            }
          } else {
            newTask.sortIndex = expirationTime;
            push(taskQueue, newTask);
            if (!isHostCallbackScheduled && !isPerformingWork) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            }
          }
          return newTask;
        }
        function unstable_pauseExecution() {
        }
        function unstable_continueExecution() {
          if (!isHostCallbackScheduled && !isPerformingWork) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
          }
        }
        function unstable_getFirstCallbackNode() {
          return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
          task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
          return currentPriorityLevel;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_wrapCallback = unstable_wrapCallback;
      })();
    }
  }
});

// node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "node_modules/scheduler/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_scheduler_production_min();
    } else {
      module2.exports = require_scheduler_development();
    }
  }
});

// node_modules/react-test-renderer/cjs/react-test-renderer.production.min.js
var require_react_test_renderer_production_min = __commonJS({
  "node_modules/react-test-renderer/cjs/react-test-renderer.production.min.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    var aa = require_object_assign();
    var ba = require_unstable_mock();
    var ca = require_react();
    var n = require_scheduler();
    function q(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function da(a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.enumerable = d.enumerable || false;
        d.configurable = true;
        "value" in d && (d.writable = true);
        Object.defineProperty(a, d.key, d);
      }
    }
    function ea(a, b, c) {
      b && da(a.prototype, b);
      c && da(a, c);
      return a;
    }
    var fa = ca.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var ha = 60103;
    var ia = 60106;
    var ja = 60107;
    var ka = 60108;
    var la = 60114;
    var ma = 60109;
    var na = 60110;
    var oa = 60112;
    var pa = 60113;
    var qa = 60120;
    var ra = 60115;
    var sa = 60116;
    var ta = 60121;
    var ua = 60129;
    var va = 60130;
    var wa = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      w = Symbol.for;
      ha = w("react.element");
      ia = w("react.portal");
      ja = w("react.fragment");
      ka = w("react.strict_mode");
      la = w("react.profiler");
      ma = w("react.provider");
      na = w("react.context");
      oa = w("react.forward_ref");
      pa = w("react.suspense");
      qa = w("react.suspense_list");
      ra = w("react.memo");
      sa = w("react.lazy");
      ta = w("react.block");
      w("react.scope");
      ua = w("react.debug_trace_mode");
      va = w("react.offscreen");
      wa = w("react.legacy_hidden");
    }
    var w;
    var xa = typeof Symbol === "function" && Symbol.iterator;
    function ya(a) {
      if (a === null || typeof a !== "object")
        return null;
      a = xa && a[xa] || a["@@iterator"];
      return typeof a === "function" ? a : null;
    }
    function za(a) {
      if (a == null)
        return null;
      if (typeof a === "function")
        return a.displayName || a.name || null;
      if (typeof a === "string")
        return a;
      switch (a) {
        case ja:
          return "Fragment";
        case ia:
          return "Portal";
        case la:
          return "Profiler";
        case ka:
          return "StrictMode";
        case pa:
          return "Suspense";
        case qa:
          return "SuspenseList";
      }
      if (typeof a === "object")
        switch (a.$$typeof) {
          case na:
            return (a.displayName || "Context") + ".Consumer";
          case ma:
            return (a._context.displayName || "Context") + ".Provider";
          case oa:
            var b = a.render;
            b = b.displayName || b.name || "";
            return a.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
          case ra:
            return za(a.type);
          case ta:
            return za(a._render);
          case sa:
            b = a._payload;
            a = a._init;
            try {
              return za(a(b));
            } catch (c) {
            }
        }
      return null;
    }
    function Ba(a) {
      var b = a, c = a;
      if (a.alternate)
        for (; b.return; )
          b = b.return;
      else {
        a = b;
        do
          b = a, (b.flags & 1026) !== 0 && (c = b.return), a = b.return;
        while (a);
      }
      return b.tag === 3 ? c : null;
    }
    function Ca(a) {
      if (Ba(a) !== a)
        throw Error(q(188));
    }
    function Da(a) {
      var b = a.alternate;
      if (!b) {
        b = Ba(a);
        if (b === null)
          throw Error(q(188));
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var e = c.return;
        if (e === null)
          break;
        var f = e.alternate;
        if (f === null) {
          d = e.return;
          if (d !== null) {
            c = d;
            continue;
          }
          break;
        }
        if (e.child === f.child) {
          for (f = e.child; f; ) {
            if (f === c)
              return Ca(e), a;
            if (f === d)
              return Ca(e), b;
            f = f.sibling;
          }
          throw Error(q(188));
        }
        if (c.return !== d.return)
          c = e, d = f;
        else {
          for (var h = false, g = e.child; g; ) {
            if (g === c) {
              h = true;
              c = e;
              d = f;
              break;
            }
            if (g === d) {
              h = true;
              d = e;
              c = f;
              break;
            }
            g = g.sibling;
          }
          if (!h) {
            for (g = f.child; g; ) {
              if (g === c) {
                h = true;
                c = f;
                d = e;
                break;
              }
              if (g === d) {
                h = true;
                d = f;
                c = e;
                break;
              }
              g = g.sibling;
            }
            if (!h)
              throw Error(q(189));
          }
        }
        if (c.alternate !== d)
          throw Error(q(190));
      }
      if (c.tag !== 3)
        throw Error(q(188));
      return c.stateNode.current === c ? a : b;
    }
    function Ea(a) {
      a = Da(a);
      if (!a)
        return null;
      for (var b = a; ; ) {
        if (b.tag === 5 || b.tag === 6)
          return b;
        if (b.child)
          b.child.return = b, b = b.child;
        else {
          if (b === a)
            break;
          for (; !b.sibling; ) {
            if (!b.return || b.return === a)
              return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
      }
      return null;
    }
    function Fa(a, b) {
      for (var c = a.alternate; b !== null; ) {
        if (b === a || b === c)
          return true;
        b = b.return;
      }
      return false;
    }
    var Ga = {};
    var Ha = {};
    var Ia = /* @__PURE__ */ new WeakMap();
    function Ja(a) {
      switch (a.tag) {
        case "INSTANCE":
          var b = a.rootContainerInstance.createNodeMock;
          b = b({ type: a.type, props: a.props });
          typeof b === "object" && b !== null && Ia.set(b, a);
          return b;
        default:
          return a;
      }
    }
    function Ka(a, b) {
      var c = a.children.indexOf(b);
      c !== -1 && a.children.splice(c, 1);
      a.children.push(b);
    }
    function La(a, b, c) {
      var d = a.children.indexOf(b);
      d !== -1 && a.children.splice(d, 1);
      c = a.children.indexOf(c);
      a.children.splice(c, 0, b);
    }
    var Ma = setTimeout;
    var Na = clearTimeout;
    var Oa = 0;
    var Pa;
    function Qa(a) {
      if (Pa === void 0)
        try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          Pa = b && b[1] || "";
        }
      return "\n" + Pa + a;
    }
    var Ra = false;
    function Sa(a, b) {
      if (!a || Ra)
        return "";
      Ra = true;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b)
          if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (k) {
              var d = k;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (k) {
              d = k;
            }
            a.call(b.prototype);
          }
        else {
          try {
            throw Error();
          } catch (k) {
            d = k;
          }
          a();
        }
      } catch (k) {
        if (k && d && typeof k.stack === "string") {
          for (var e = k.stack.split("\n"), f = d.stack.split("\n"), h = e.length - 1, g = f.length - 1; 1 <= h && 0 <= g && e[h] !== f[g]; )
            g--;
          for (; 1 <= h && 0 <= g; h--, g--)
            if (e[h] !== f[g]) {
              if (h !== 1 || g !== 1) {
                do
                  if (h--, g--, 0 > g || e[h] !== f[g])
                    return "\n" + e[h].replace(" at new ", " at ");
                while (1 <= h && 0 <= g);
              }
              break;
            }
        }
      } finally {
        Ra = false, Error.prepareStackTrace = c;
      }
      return (a = a ? a.displayName || a.name : "") ? Qa(a) : "";
    }
    var Ta = [];
    var Ua = -1;
    function Va(a) {
      return { current: a };
    }
    function A(a) {
      0 > Ua || (a.current = Ta[Ua], Ta[Ua] = null, Ua--);
    }
    function B(a, b) {
      Ua++;
      Ta[Ua] = a.current;
      a.current = b;
    }
    var Wa = {};
    var C = Va(Wa);
    var D = Va(false);
    var Xa = Wa;
    function Ya(a, b) {
      var c = a.type.contextTypes;
      if (!c)
        return Wa;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
        return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f;
      for (f in c)
        e[f] = b[f];
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }
    function E(a) {
      a = a.childContextTypes;
      return a !== null && a !== void 0;
    }
    function Za() {
      A(D);
      A(C);
    }
    function $a(a, b, c) {
      if (C.current !== Wa)
        throw Error(q(168));
      B(C, b);
      B(D, c);
    }
    function ab(a, b, c) {
      var d = a.stateNode;
      a = b.childContextTypes;
      if (typeof d.getChildContext !== "function")
        return c;
      d = d.getChildContext();
      for (var e in d)
        if (!(e in a))
          throw Error(q(108, za(b) || "Unknown", e));
      return aa({}, c, d);
    }
    function bb(a) {
      a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Wa;
      Xa = C.current;
      B(C, a);
      B(D, D.current);
      return true;
    }
    function cb(a, b, c) {
      var d = a.stateNode;
      if (!d)
        throw Error(q(169));
      c ? (a = ab(a, b, Xa), d.__reactInternalMemoizedMergedChildContext = a, A(D), A(C), B(C, a)) : A(D);
      B(D, c);
    }
    var db = null;
    var eb = null;
    var fb = n.unstable_now;
    fb();
    var F = 8;
    function gb(a) {
      if ((1 & a) !== 0)
        return F = 15, 1;
      if ((2 & a) !== 0)
        return F = 14, 2;
      if ((4 & a) !== 0)
        return F = 13, 4;
      var b = 24 & a;
      if (b !== 0)
        return F = 12, b;
      if ((a & 32) !== 0)
        return F = 11, 32;
      b = 192 & a;
      if (b !== 0)
        return F = 10, b;
      if ((a & 256) !== 0)
        return F = 9, 256;
      b = 3584 & a;
      if (b !== 0)
        return F = 8, b;
      if ((a & 4096) !== 0)
        return F = 7, 4096;
      b = 4186112 & a;
      if (b !== 0)
        return F = 6, b;
      b = 62914560 & a;
      if (b !== 0)
        return F = 5, b;
      if (a & 67108864)
        return F = 4, 67108864;
      if ((a & 134217728) !== 0)
        return F = 3, 134217728;
      b = 805306368 & a;
      if (b !== 0)
        return F = 2, b;
      if ((1073741824 & a) !== 0)
        return F = 1, 1073741824;
      F = 8;
      return a;
    }
    function hb(a) {
      switch (a) {
        case 99:
          return 15;
        case 98:
          return 10;
        case 97:
        case 96:
          return 8;
        case 95:
          return 2;
        default:
          return 0;
      }
    }
    function ib(a) {
      switch (a) {
        case 15:
        case 14:
          return 99;
        case 13:
        case 12:
        case 11:
        case 10:
          return 98;
        case 9:
        case 8:
        case 7:
        case 6:
        case 4:
        case 5:
          return 97;
        case 3:
        case 2:
        case 1:
          return 95;
        case 0:
          return 90;
        default:
          throw Error(q(358, a));
      }
    }
    function jb(a, b) {
      var c = a.pendingLanes;
      if (c === 0)
        return F = 0;
      var d = 0, e = 0, f = a.expiredLanes, h = a.suspendedLanes, g = a.pingedLanes;
      if (f !== 0)
        d = f, e = F = 15;
      else if (f = c & 134217727, f !== 0) {
        var k = f & ~h;
        k !== 0 ? (d = gb(k), e = F) : (g &= f, g !== 0 && (d = gb(g), e = F));
      } else
        f = c & ~h, f !== 0 ? (d = gb(f), e = F) : g !== 0 && (d = gb(g), e = F);
      if (d === 0)
        return 0;
      d = 31 - kb(d);
      d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
      if (b !== 0 && b !== d && (b & h) === 0) {
        gb(b);
        if (e <= F)
          return b;
        F = e;
      }
      b = a.entangledLanes;
      if (b !== 0)
        for (a = a.entanglements, b &= d; 0 < b; )
          c = 31 - kb(b), e = 1 << c, d |= a[c], b &= ~e;
      return d;
    }
    function lb(a) {
      a = a.pendingLanes & -1073741825;
      return a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
    }
    function mb(a, b) {
      switch (a) {
        case 15:
          return 1;
        case 14:
          return 2;
        case 12:
          return a = nb(24 & ~b), a === 0 ? mb(10, b) : a;
        case 10:
          return a = nb(192 & ~b), a === 0 ? mb(8, b) : a;
        case 8:
          return a = nb(3584 & ~b), a === 0 && (a = nb(4186112 & ~b), a === 0 && (a = 512)), a;
        case 2:
          return b = nb(805306368 & ~b), b === 0 && (b = 268435456), b;
      }
      throw Error(q(358, a));
    }
    function nb(a) {
      return a & -a;
    }
    function ob(a) {
      for (var b = [], c = 0; 31 > c; c++)
        b.push(a);
      return b;
    }
    function pb(a, b, c) {
      a.pendingLanes |= b;
      var d = b - 1;
      a.suspendedLanes &= d;
      a.pingedLanes &= d;
      a = a.eventTimes;
      b = 31 - kb(b);
      a[b] = c;
    }
    var kb = Math.clz32 ? Math.clz32 : qb;
    var rb = Math.log;
    var sb = Math.LN2;
    function qb(a) {
      return a === 0 ? 32 : 31 - (rb(a) / sb | 0) | 0;
    }
    var tb = n.unstable_runWithPriority;
    var ub = n.unstable_scheduleCallback;
    var vb = n.unstable_cancelCallback;
    var wb = n.unstable_shouldYield;
    var xb = n.unstable_requestPaint;
    var yb = n.unstable_now;
    var zb = n.unstable_getCurrentPriorityLevel;
    var Ab = n.unstable_ImmediatePriority;
    var Bb = n.unstable_UserBlockingPriority;
    var Cb = n.unstable_NormalPriority;
    var Db = n.unstable_LowPriority;
    var Eb = n.unstable_IdlePriority;
    var Fb = {};
    var Gb = xb !== void 0 ? xb : function() {
    };
    var Hb = null;
    var Ib = null;
    var Jb = false;
    var Kb = yb();
    var G = 1e4 > Kb ? yb : function() {
      return yb() - Kb;
    };
    function Lb() {
      switch (zb()) {
        case Ab:
          return 99;
        case Bb:
          return 98;
        case Cb:
          return 97;
        case Db:
          return 96;
        case Eb:
          return 95;
        default:
          throw Error(q(332));
      }
    }
    function Mb(a) {
      switch (a) {
        case 99:
          return Ab;
        case 98:
          return Bb;
        case 97:
          return Cb;
        case 96:
          return Db;
        case 95:
          return Eb;
        default:
          throw Error(q(332));
      }
    }
    function Nb(a, b) {
      a = Mb(a);
      return tb(a, b);
    }
    function Ob(a, b, c) {
      a = Mb(a);
      return ub(a, b, c);
    }
    function Pb() {
      if (Ib !== null) {
        var a = Ib;
        Ib = null;
        vb(a);
      }
      Qb();
    }
    function Qb() {
      if (!Jb && Hb !== null) {
        Jb = true;
        var a = 0;
        try {
          var b = Hb;
          Nb(99, function() {
            for (; a < b.length; a++) {
              var c = b[a];
              do
                c = c(true);
              while (c !== null);
            }
          });
          Hb = null;
        } catch (c) {
          throw Hb !== null && (Hb = Hb.slice(a + 1)), ub(Ab, Pb), c;
        } finally {
          Jb = false;
        }
      }
    }
    var Rb = fa.ReactCurrentBatchConfig;
    function Sb(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var H = typeof Object.is === "function" ? Object.is : Sb;
    var Tb = Object.prototype.hasOwnProperty;
    function Ub(a, b) {
      if (H(a, b))
        return true;
      if (typeof a !== "object" || a === null || typeof b !== "object" || b === null)
        return false;
      var c = Object.keys(a), d = Object.keys(b);
      if (c.length !== d.length)
        return false;
      for (d = 0; d < c.length; d++)
        if (!Tb.call(b, c[d]) || !H(a[c[d]], b[c[d]]))
          return false;
      return true;
    }
    function Vb(a) {
      switch (a.tag) {
        case 5:
          return Qa(a.type);
        case 16:
          return Qa("Lazy");
        case 13:
          return Qa("Suspense");
        case 19:
          return Qa("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a = Sa(a.type, false), a;
        case 11:
          return a = Sa(a.type.render, false), a;
        case 22:
          return a = Sa(a.type._render, false), a;
        case 1:
          return a = Sa(a.type, true), a;
        default:
          return "";
      }
    }
    function I(a, b) {
      if (a && a.defaultProps) {
        b = aa({}, b);
        a = a.defaultProps;
        for (var c in a)
          b[c] === void 0 && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    var Wb = Va(null);
    var Xb = null;
    var Yb = null;
    var Zb = null;
    function $b() {
      Zb = Yb = Xb = null;
    }
    function ac(a) {
      var b = Wb.current;
      A(Wb);
      a.type._context._currentValue2 = b;
    }
    function bc(a, b) {
      for (; a !== null; ) {
        var c = a.alternate;
        if ((a.childLanes & b) === b)
          if (c === null || (c.childLanes & b) === b)
            break;
          else
            c.childLanes |= b;
        else
          a.childLanes |= b, c !== null && (c.childLanes |= b);
        a = a.return;
      }
    }
    function cc(a, b) {
      Xb = a;
      Zb = Yb = null;
      a = a.dependencies;
      a !== null && a.firstContext !== null && ((a.lanes & b) !== 0 && (J = true), a.firstContext = null);
    }
    function K(a, b) {
      if (Zb !== a && b !== false && b !== 0) {
        if (typeof b !== "number" || b === 1073741823)
          Zb = a, b = 1073741823;
        b = { context: a, observedBits: b, next: null };
        if (Yb === null) {
          if (Xb === null)
            throw Error(q(308));
          Yb = b;
          Xb.dependencies = { lanes: 0, firstContext: b, responders: null };
        } else
          Yb = Yb.next = b;
      }
      return a._currentValue2;
    }
    var dc = false;
    function ec(a) {
      a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
    }
    function fc(a, b) {
      a = a.updateQueue;
      b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
    }
    function gc(a, b) {
      return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
    }
    function hc(a, b) {
      a = a.updateQueue;
      if (a !== null) {
        a = a.shared;
        var c = a.pending;
        c === null ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
    }
    function ic(a, b) {
      var c = a.updateQueue, d = a.alternate;
      if (d !== null && (d = d.updateQueue, c === d)) {
        var e = null, f = null;
        c = c.firstBaseUpdate;
        if (c !== null) {
          do {
            var h = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
            f === null ? e = f = h : f = f.next = h;
            c = c.next;
          } while (c !== null);
          f === null ? e = f = b : f = f.next = b;
        } else
          e = f = b;
        c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
        a.updateQueue = c;
        return;
      }
      a = c.lastBaseUpdate;
      a === null ? c.firstBaseUpdate = b : a.next = b;
      c.lastBaseUpdate = b;
    }
    function jc(a, b, c, d) {
      var e = a.updateQueue;
      dc = false;
      var f = e.firstBaseUpdate, h = e.lastBaseUpdate, g = e.shared.pending;
      if (g !== null) {
        e.shared.pending = null;
        var k = g, l = k.next;
        k.next = null;
        h === null ? f = l : h.next = l;
        h = k;
        var p = a.alternate;
        if (p !== null) {
          p = p.updateQueue;
          var r = p.lastBaseUpdate;
          r !== h && (r === null ? p.firstBaseUpdate = l : r.next = l, p.lastBaseUpdate = k);
        }
      }
      if (f !== null) {
        r = e.baseState;
        h = 0;
        p = l = k = null;
        do {
          g = f.lane;
          var m = f.eventTime;
          if ((d & g) === g) {
            p !== null && (p = p.next = {
              eventTime: m,
              lane: 0,
              tag: f.tag,
              payload: f.payload,
              callback: f.callback,
              next: null
            });
            a: {
              var z = a, x = f;
              g = b;
              m = c;
              switch (x.tag) {
                case 1:
                  z = x.payload;
                  if (typeof z === "function") {
                    r = z.call(m, r, g);
                    break a;
                  }
                  r = z;
                  break a;
                case 3:
                  z.flags = z.flags & -4097 | 64;
                case 0:
                  z = x.payload;
                  g = typeof z === "function" ? z.call(m, r, g) : z;
                  if (g === null || g === void 0)
                    break a;
                  r = aa({}, r, g);
                  break a;
                case 2:
                  dc = true;
              }
            }
            f.callback !== null && (a.flags |= 32, g = e.effects, g === null ? e.effects = [f] : g.push(f));
          } else
            m = { eventTime: m, lane: g, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, p === null ? (l = p = m, k = r) : p = p.next = m, h |= g;
          f = f.next;
          if (f === null)
            if (g = e.shared.pending, g === null)
              break;
            else
              f = g.next, g.next = null, e.lastBaseUpdate = g, e.shared.pending = null;
        } while (1);
        p === null && (k = r);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = p;
        kc |= h;
        a.lanes = h;
        a.memoizedState = r;
      }
    }
    function lc(a, b, c) {
      a = b.effects;
      b.effects = null;
      if (a !== null)
        for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (e !== null) {
            d.callback = null;
            d = c;
            if (typeof e !== "function")
              throw Error(q(191, e));
            e.call(d);
          }
        }
    }
    var mc = new ca.Component().refs;
    function nc(a, b, c, d) {
      b = a.memoizedState;
      c = c(d, b);
      c = c === null || c === void 0 ? b : aa({}, b, c);
      a.memoizedState = c;
      a.lanes === 0 && (a.updateQueue.baseState = c);
    }
    var rc = { isMounted: function(a) {
      return (a = a._reactInternals) ? Ba(a) === a : false;
    }, enqueueSetState: function(a, b, c) {
      a = a._reactInternals;
      var d = oc(), e = pc(a), f = gc(d, e);
      f.payload = b;
      c !== void 0 && c !== null && (f.callback = c);
      hc(a, f);
      qc(a, e, d);
    }, enqueueReplaceState: function(a, b, c) {
      a = a._reactInternals;
      var d = oc(), e = pc(a), f = gc(d, e);
      f.tag = 1;
      f.payload = b;
      c !== void 0 && c !== null && (f.callback = c);
      hc(a, f);
      qc(a, e, d);
    }, enqueueForceUpdate: function(a, b) {
      a = a._reactInternals;
      var c = oc(), d = pc(a), e = gc(c, d);
      e.tag = 2;
      b !== void 0 && b !== null && (e.callback = b);
      hc(a, e);
      qc(a, d, c);
    } };
    function sc(a, b, c, d, e, f, h) {
      a = a.stateNode;
      return typeof a.shouldComponentUpdate === "function" ? a.shouldComponentUpdate(d, f, h) : b.prototype && b.prototype.isPureReactComponent ? !Ub(c, d) || !Ub(e, f) : true;
    }
    function tc(a, b, c) {
      var d = false, e = Wa;
      var f = b.contextType;
      typeof f === "object" && f !== null ? f = K(f) : (e = E(b) ? Xa : C.current, d = b.contextTypes, f = (d = d !== null && d !== void 0) ? Ya(a, e) : Wa);
      b = new b(c, f);
      a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null;
      b.updater = rc;
      a.stateNode = b;
      b._reactInternals = a;
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
      return b;
    }
    function uc(a, b, c, d) {
      a = b.state;
      typeof b.componentWillReceiveProps === "function" && b.componentWillReceiveProps(c, d);
      typeof b.UNSAFE_componentWillReceiveProps === "function" && b.UNSAFE_componentWillReceiveProps(c, d);
      b.state !== a && rc.enqueueReplaceState(b, b.state, null);
    }
    function vc(a, b, c, d) {
      var e = a.stateNode;
      e.props = c;
      e.state = a.memoizedState;
      e.refs = mc;
      ec(a);
      var f = b.contextType;
      typeof f === "object" && f !== null ? e.context = K(f) : (f = E(b) ? Xa : C.current, e.context = Ya(a, f));
      jc(a, c, e, d);
      e.state = a.memoizedState;
      f = b.getDerivedStateFromProps;
      typeof f === "function" && (nc(a, b, f, c), e.state = a.memoizedState);
      typeof b.getDerivedStateFromProps === "function" || typeof e.getSnapshotBeforeUpdate === "function" || typeof e.UNSAFE_componentWillMount !== "function" && typeof e.componentWillMount !== "function" || (b = e.state, typeof e.componentWillMount === "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && e.UNSAFE_componentWillMount(), b !== e.state && rc.enqueueReplaceState(e, e.state, null), jc(a, c, e, d), e.state = a.memoizedState);
      typeof e.componentDidMount === "function" && (a.flags |= 4);
    }
    var wc = Array.isArray;
    function xc(a, b, c) {
      a = c.ref;
      if (a !== null && typeof a !== "function" && typeof a !== "object") {
        if (c._owner) {
          c = c._owner;
          if (c) {
            if (c.tag !== 1)
              throw Error(q(309));
            var d = c.stateNode;
          }
          if (!d)
            throw Error(q(147, a));
          var e = "" + a;
          if (b !== null && b.ref !== null && typeof b.ref === "function" && b.ref._stringRef === e)
            return b.ref;
          b = function(a2) {
            var b2 = d.refs;
            b2 === mc && (b2 = d.refs = {});
            a2 === null ? delete b2[e] : b2[e] = a2;
          };
          b._stringRef = e;
          return b;
        }
        if (typeof a !== "string")
          throw Error(q(284));
        if (!c._owner)
          throw Error(q(290, a));
      }
      return a;
    }
    function yc(a, b) {
      if (a.type !== "textarea")
        throw Error(q(31, Object.prototype.toString.call(b) === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
    }
    function zc(a) {
      function b(b2, c2) {
        if (a) {
          var d2 = b2.lastEffect;
          d2 !== null ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
          c2.nextEffect = null;
          c2.flags = 8;
        }
      }
      function c(c2, d2) {
        if (!a)
          return null;
        for (; d2 !== null; )
          b(c2, d2), d2 = d2.sibling;
        return null;
      }
      function d(a2, b2) {
        for (a2 = /* @__PURE__ */ new Map(); b2 !== null; )
          b2.key !== null ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
        return a2;
      }
      function e(a2, b2) {
        a2 = Ac(a2, b2);
        a2.index = 0;
        a2.sibling = null;
        return a2;
      }
      function f(b2, c2, d2) {
        b2.index = d2;
        if (!a)
          return c2;
        d2 = b2.alternate;
        if (d2 !== null)
          return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
        b2.flags = 2;
        return c2;
      }
      function h(b2) {
        a && b2.alternate === null && (b2.flags = 2);
        return b2;
      }
      function g(a2, b2, c2, d2) {
        if (b2 === null || b2.tag !== 6)
          return b2 = Bc(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function k(a2, b2, c2, d2) {
        if (b2 !== null && b2.elementType === c2.type)
          return d2 = e(b2, c2.props), d2.ref = xc(a2, b2, c2), d2.return = a2, d2;
        d2 = Cc(c2.type, c2.key, c2.props, null, a2.mode, d2);
        d2.ref = xc(a2, b2, c2);
        d2.return = a2;
        return d2;
      }
      function l(a2, b2, c2, d2) {
        if (b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
          return b2 = Dc(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2.children || []);
        b2.return = a2;
        return b2;
      }
      function p(a2, b2, c2, d2, f2) {
        if (b2 === null || b2.tag !== 7)
          return b2 = Ec(c2, a2.mode, d2, f2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function r(a2, b2, c2) {
        if (typeof b2 === "string" || typeof b2 === "number")
          return b2 = Bc("" + b2, a2.mode, c2), b2.return = a2, b2;
        if (typeof b2 === "object" && b2 !== null) {
          switch (b2.$$typeof) {
            case ha:
              return c2 = Cc(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = xc(a2, null, b2), c2.return = a2, c2;
            case ia:
              return b2 = Dc(b2, a2.mode, c2), b2.return = a2, b2;
          }
          if (wc(b2) || ya(b2))
            return b2 = Ec(b2, a2.mode, c2, null), b2.return = a2, b2;
          yc(a2, b2);
        }
        return null;
      }
      function m(a2, b2, c2, d2) {
        var e2 = b2 !== null ? b2.key : null;
        if (typeof c2 === "string" || typeof c2 === "number")
          return e2 !== null ? null : g(a2, b2, "" + c2, d2);
        if (typeof c2 === "object" && c2 !== null) {
          switch (c2.$$typeof) {
            case ha:
              return c2.key === e2 ? c2.type === ja ? p(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
            case ia:
              return c2.key === e2 ? l(a2, b2, c2, d2) : null;
          }
          if (wc(c2) || ya(c2))
            return e2 !== null ? null : p(a2, b2, c2, d2, null);
          yc(a2, c2);
        }
        return null;
      }
      function z(a2, b2, c2, d2, e2) {
        if (typeof d2 === "string" || typeof d2 === "number")
          return a2 = a2.get(c2) || null, g(b2, a2, "" + d2, e2);
        if (typeof d2 === "object" && d2 !== null) {
          switch (d2.$$typeof) {
            case ha:
              return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, d2.type === ja ? p(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
            case ia:
              return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, l(b2, a2, d2, e2);
          }
          if (wc(d2) || ya(d2))
            return a2 = a2.get(c2) || null, p(b2, a2, d2, e2, null);
          yc(b2, d2);
        }
        return null;
      }
      function x(e2, h2, g2, k2) {
        for (var u = null, l2 = null, t = h2, y = h2 = 0, p2 = null; t !== null && y < g2.length; y++) {
          t.index > y ? (p2 = t, t = null) : p2 = t.sibling;
          var v = m(e2, t, g2[y], k2);
          if (v === null) {
            t === null && (t = p2);
            break;
          }
          a && t && v.alternate === null && b(e2, t);
          h2 = f(v, h2, y);
          l2 === null ? u = v : l2.sibling = v;
          l2 = v;
          t = p2;
        }
        if (y === g2.length)
          return c(e2, t), u;
        if (t === null) {
          for (; y < g2.length; y++)
            t = r(e2, g2[y], k2), t !== null && (h2 = f(t, h2, y), l2 === null ? u = t : l2.sibling = t, l2 = t);
          return u;
        }
        for (t = d(e2, t); y < g2.length; y++)
          p2 = z(t, e2, y, g2[y], k2), p2 !== null && (a && p2.alternate !== null && t.delete(p2.key === null ? y : p2.key), h2 = f(p2, h2, y), l2 === null ? u = p2 : l2.sibling = p2, l2 = p2);
        a && t.forEach(function(a2) {
          return b(e2, a2);
        });
        return u;
      }
      function V(e2, h2, g2, k2) {
        var t = ya(g2);
        if (typeof t !== "function")
          throw Error(q(150));
        g2 = t.call(g2);
        if (g2 == null)
          throw Error(q(151));
        for (var l2 = t = null, u = h2, y = h2 = 0, p2 = null, v = g2.next(); u !== null && !v.done; y++, v = g2.next()) {
          u.index > y ? (p2 = u, u = null) : p2 = u.sibling;
          var x2 = m(e2, u, v.value, k2);
          if (x2 === null) {
            u === null && (u = p2);
            break;
          }
          a && u && x2.alternate === null && b(e2, u);
          h2 = f(x2, h2, y);
          l2 === null ? t = x2 : l2.sibling = x2;
          l2 = x2;
          u = p2;
        }
        if (v.done)
          return c(e2, u), t;
        if (u === null) {
          for (; !v.done; y++, v = g2.next())
            v = r(e2, v.value, k2), v !== null && (h2 = f(v, h2, y), l2 === null ? t = v : l2.sibling = v, l2 = v);
          return t;
        }
        for (u = d(e2, u); !v.done; y++, v = g2.next())
          v = z(u, e2, y, v.value, k2), v !== null && (a && v.alternate !== null && u.delete(v.key === null ? y : v.key), h2 = f(v, h2, y), l2 === null ? t = v : l2.sibling = v, l2 = v);
        a && u.forEach(function(a2) {
          return b(e2, a2);
        });
        return t;
      }
      return function(a2, d2, f2, g2) {
        var k2 = typeof f2 === "object" && f2 !== null && f2.type === ja && f2.key === null;
        k2 && (f2 = f2.props.children);
        var l2 = typeof f2 === "object" && f2 !== null;
        if (l2)
          switch (f2.$$typeof) {
            case ha:
              a: {
                l2 = f2.key;
                for (k2 = d2; k2 !== null; ) {
                  if (k2.key === l2) {
                    switch (k2.tag) {
                      case 7:
                        if (f2.type === ja) {
                          c(a2, k2.sibling);
                          d2 = e(k2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                        break;
                      default:
                        if (k2.elementType === f2.type) {
                          c(a2, k2.sibling);
                          d2 = e(k2, f2.props);
                          d2.ref = xc(a2, k2, f2);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                    }
                    c(a2, k2);
                    break;
                  } else
                    b(a2, k2);
                  k2 = k2.sibling;
                }
                f2.type === ja ? (d2 = Ec(f2.props.children, a2.mode, g2, f2.key), d2.return = a2, a2 = d2) : (g2 = Cc(f2.type, f2.key, f2.props, null, a2.mode, g2), g2.ref = xc(a2, d2, f2), g2.return = a2, a2 = g2);
              }
              return h(a2);
            case ia:
              a: {
                for (k2 = f2.key; d2 !== null; ) {
                  if (d2.key === k2)
                    if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                  else
                    b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = Dc(f2, a2.mode, g2);
                d2.return = a2;
                a2 = d2;
              }
              return h(a2);
          }
        if (typeof f2 === "string" || typeof f2 === "number")
          return f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Bc(f2, a2.mode, g2), d2.return = a2, a2 = d2), h(a2);
        if (wc(f2))
          return x(a2, d2, f2, g2);
        if (ya(f2))
          return V(a2, d2, f2, g2);
        l2 && yc(a2, f2);
        if (typeof f2 === "undefined" && !k2)
          switch (a2.tag) {
            case 1:
            case 22:
            case 0:
            case 11:
            case 15:
              throw Error(q(152, za(a2.type) || "Component"));
          }
        return c(a2, d2);
      };
    }
    var Fc = zc(true);
    var Gc = zc(false);
    var Hc = {};
    var Ic = Va(Hc);
    var Jc = Va(Hc);
    var Kc = Va(Hc);
    function Lc(a) {
      if (a === Hc)
        throw Error(q(174));
      return a;
    }
    function Mc(a, b) {
      B(Kc, b);
      B(Jc, a);
      B(Ic, Hc);
      A(Ic);
      B(Ic, Ga);
    }
    function Nc() {
      A(Ic);
      A(Jc);
      A(Kc);
    }
    function Oc(a) {
      Lc(Kc.current);
      Lc(Ic.current) !== Ga && (B(Jc, a), B(Ic, Ga));
    }
    function Qc(a) {
      Jc.current === a && (A(Ic), A(Jc));
    }
    var L = Va(0);
    function Rc(a) {
      for (var b = a; b !== null; ) {
        if (b.tag === 13) {
          var c = b.memoizedState, d;
          if (d = c !== null) {
            if (!(c = c.dehydrated === null))
              throw Error(q(305));
            if (!c)
              throw Error(q(305));
            d = c;
          }
          if (d)
            return b;
        } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
          if ((b.flags & 64) !== 0)
            return b;
        } else if (b.child !== null) {
          b.child.return = b;
          b = b.child;
          continue;
        }
        if (b === a)
          break;
        for (; b.sibling === null; ) {
          if (b.return === null || b.return === a)
            return null;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
      return null;
    }
    var Sc = [];
    function Tc() {
      for (var a = 0; a < Sc.length; a++)
        Sc[a]._workInProgressVersionSecondary = null;
      Sc.length = 0;
    }
    var Uc = fa.ReactCurrentDispatcher;
    var M = fa.ReactCurrentBatchConfig;
    var Vc = 0;
    var N = null;
    var O = null;
    var P = null;
    var Wc = false;
    var Xc = false;
    function Q() {
      throw Error(q(321));
    }
    function Yc(a, b) {
      if (b === null)
        return false;
      for (var c = 0; c < b.length && c < a.length; c++)
        if (!H(a[c], b[c]))
          return false;
      return true;
    }
    function Zc(a, b, c, d, e, f) {
      Vc = f;
      N = b;
      b.memoizedState = null;
      b.updateQueue = null;
      b.lanes = 0;
      Uc.current = a === null || a.memoizedState === null ? $c : ad;
      a = c(d, e);
      if (Xc) {
        f = 0;
        do {
          Xc = false;
          if (!(25 > f))
            throw Error(q(301));
          f += 1;
          P = O = null;
          b.updateQueue = null;
          Uc.current = bd;
          a = c(d, e);
        } while (Xc);
      }
      Uc.current = cd;
      b = O !== null && O.next !== null;
      Vc = 0;
      P = O = N = null;
      Wc = false;
      if (b)
        throw Error(q(300));
      return a;
    }
    function dd() {
      var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      P === null ? N.memoizedState = P = a : P = P.next = a;
      return P;
    }
    function ed() {
      if (O === null) {
        var a = N.alternate;
        a = a !== null ? a.memoizedState : null;
      } else
        a = O.next;
      var b = P === null ? N.memoizedState : P.next;
      if (b !== null)
        P = b, O = a;
      else {
        if (a === null)
          throw Error(q(310));
        O = a;
        a = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };
        P === null ? N.memoizedState = P = a : P = P.next = a;
      }
      return P;
    }
    function fd(a, b) {
      return typeof b === "function" ? b(a) : b;
    }
    function gd(a) {
      var b = ed(), c = b.queue;
      if (c === null)
        throw Error(q(311));
      c.lastRenderedReducer = a;
      var d = O, e = d.baseQueue, f = c.pending;
      if (f !== null) {
        if (e !== null) {
          var h = e.next;
          e.next = f.next;
          f.next = h;
        }
        d.baseQueue = e = f;
        c.pending = null;
      }
      if (e !== null) {
        e = e.next;
        d = d.baseState;
        var g = h = f = null, k = e;
        do {
          var l = k.lane;
          if ((Vc & l) === l)
            g !== null && (g = g.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
          else {
            var p = {
              lane: l,
              action: k.action,
              eagerReducer: k.eagerReducer,
              eagerState: k.eagerState,
              next: null
            };
            g === null ? (h = g = p, f = d) : g = g.next = p;
            N.lanes |= l;
            kc |= l;
          }
          k = k.next;
        } while (k !== null && k !== e);
        g === null ? f = d : g.next = h;
        H(d, b.memoizedState) || (J = true);
        b.memoizedState = d;
        b.baseState = f;
        b.baseQueue = g;
        c.lastRenderedState = d;
      }
      return [b.memoizedState, c.dispatch];
    }
    function hd(a) {
      var b = ed(), c = b.queue;
      if (c === null)
        throw Error(q(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch, e = c.pending, f = b.memoizedState;
      if (e !== null) {
        c.pending = null;
        var h = e = e.next;
        do
          f = a(f, h.action), h = h.next;
        while (h !== e);
        H(f, b.memoizedState) || (J = true);
        b.memoizedState = f;
        b.baseQueue === null && (b.baseState = f);
        c.lastRenderedState = f;
      }
      return [f, d];
    }
    function id(a, b, c) {
      var d = b._getVersion;
      d = d(b._source);
      var e = b._workInProgressVersionSecondary;
      if (e !== null)
        a = e === d;
      else if (a = a.mutableReadLanes, a = (Vc & a) === a)
        b._workInProgressVersionSecondary = d, Sc.push(b);
      if (a)
        return c(b._source);
      Sc.push(b);
      throw Error(q(350));
    }
    function jd(a, b, c, d) {
      var e = R;
      if (e === null)
        throw Error(q(349));
      var f = b._getVersion, h = f(b._source), g = Uc.current, k = g.useState(function() {
        return id(e, b, c);
      }), l = k[1], p = k[0];
      k = P;
      var r = a.memoizedState, m = r.refs, z = m.getSnapshot, x = r.source;
      r = r.subscribe;
      var V = N;
      a.memoizedState = { refs: m, source: b, subscribe: d };
      g.useEffect(function() {
        m.getSnapshot = c;
        m.setSnapshot = l;
        var a2 = f(b._source);
        if (!H(h, a2)) {
          a2 = c(b._source);
          H(p, a2) || (l(a2), a2 = pc(V), e.mutableReadLanes |= a2 & e.pendingLanes);
          a2 = e.mutableReadLanes;
          e.entangledLanes |= a2;
          for (var d2 = e.entanglements, g2 = a2; 0 < g2; ) {
            var k2 = 31 - kb(g2), r2 = 1 << k2;
            d2[k2] |= a2;
            g2 &= ~r2;
          }
        }
      }, [c, b, d]);
      g.useEffect(function() {
        return d(b._source, function() {
          var a2 = m.getSnapshot, c2 = m.setSnapshot;
          try {
            c2(a2(b._source));
            var d2 = pc(V);
            e.mutableReadLanes |= d2 & e.pendingLanes;
          } catch (Aa) {
            c2(function() {
              throw Aa;
            });
          }
        });
      }, [b, d]);
      H(z, c) && H(x, b) && H(r, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: fd, lastRenderedState: p }, a.dispatch = l = kd.bind(null, N, a), k.queue = a, k.baseQueue = null, p = id(e, b, c), k.memoizedState = k.baseState = p);
      return p;
    }
    function ld(a, b, c) {
      var d = ed();
      return jd(d, a, b, c);
    }
    function md(a) {
      var b = dd();
      typeof a === "function" && (a = a());
      b.memoizedState = b.baseState = a;
      a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: fd, lastRenderedState: a };
      a = a.dispatch = kd.bind(null, N, a);
      return [b.memoizedState, a];
    }
    function nd(a, b, c, d) {
      a = { tag: a, create: b, destroy: c, deps: d, next: null };
      b = N.updateQueue;
      b === null ? (b = { lastEffect: null }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
      return a;
    }
    function od(a) {
      var b = dd();
      a = { current: a };
      return b.memoizedState = a;
    }
    function pd() {
      return ed().memoizedState;
    }
    function qd(a, b, c, d) {
      var e = dd();
      N.flags |= a;
      e.memoizedState = nd(1 | b, c, void 0, d === void 0 ? null : d);
    }
    function rd(a, b, c, d) {
      var e = ed();
      d = d === void 0 ? null : d;
      var f = void 0;
      if (O !== null) {
        var h = O.memoizedState;
        f = h.destroy;
        if (d !== null && Yc(d, h.deps)) {
          nd(b, c, f, d);
          return;
        }
      }
      N.flags |= a;
      e.memoizedState = nd(1 | b, c, f, d);
    }
    function sd(a, b) {
      return qd(516, 4, a, b);
    }
    function td(a, b) {
      return rd(516, 4, a, b);
    }
    function ud(a, b) {
      return rd(4, 2, a, b);
    }
    function vd(a, b) {
      if (typeof b === "function")
        return a = a(), b(a), function() {
          b(null);
        };
      if (b !== null && b !== void 0)
        return a = a(), b.current = a, function() {
          b.current = null;
        };
    }
    function wd(a, b, c) {
      c = c !== null && c !== void 0 ? c.concat([a]) : null;
      return rd(4, 2, vd.bind(null, b, a), c);
    }
    function xd() {
    }
    function yd(a, b) {
      var c = ed();
      b = b === void 0 ? null : b;
      var d = c.memoizedState;
      if (d !== null && b !== null && Yc(b, d[1]))
        return d[0];
      c.memoizedState = [a, b];
      return a;
    }
    function zd(a, b) {
      var c = ed();
      b = b === void 0 ? null : b;
      var d = c.memoizedState;
      if (d !== null && b !== null && Yc(b, d[1]))
        return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    }
    function Ad(a, b) {
      var c = Lb();
      Nb(98 > c ? 98 : c, function() {
        a(true);
      });
      Nb(97 < c ? 97 : c, function() {
        var c2 = M.transition;
        M.transition = 1;
        try {
          a(false), b();
        } finally {
          M.transition = c2;
        }
      });
    }
    function kd(a, b, c) {
      var d = oc(), e = pc(a), f = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, h = b.pending;
      h === null ? f.next = f : (f.next = h.next, h.next = f);
      b.pending = f;
      h = a.alternate;
      if (a === N || h !== null && h === N)
        Xc = Wc = true;
      else {
        if (a.lanes === 0 && (h === null || h.lanes === 0) && (h = b.lastRenderedReducer, h !== null))
          try {
            var g = b.lastRenderedState, k = h(g, c);
            f.eagerReducer = h;
            f.eagerState = k;
            if (H(k, g))
              return;
          } catch (l) {
          } finally {
          }
        qc(a, e, d);
      }
    }
    var cd = { readContext: K, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useOpaqueIdentifier: Q, unstable_isNewReconciler: false };
    var $c = { readContext: K, useCallback: function(a, b) {
      dd().memoizedState = [a, b === void 0 ? null : b];
      return a;
    }, useContext: K, useEffect: sd, useImperativeHandle: function(a, b, c) {
      c = c !== null && c !== void 0 ? c.concat([a]) : null;
      return qd(4, 2, vd.bind(null, b, a), c);
    }, useLayoutEffect: function(a, b) {
      return qd(4, 2, a, b);
    }, useMemo: function(a, b) {
      var c = dd();
      b = b === void 0 ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    }, useReducer: function(a, b, c) {
      var d = dd();
      b = c !== void 0 ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
      a = a.dispatch = kd.bind(null, N, a);
      return [d.memoizedState, a];
    }, useRef: od, useState: md, useDebugValue: xd, useDeferredValue: function(a) {
      var b = md(a), c = b[0], d = b[1];
      sd(function() {
        var b2 = M.transition;
        M.transition = 1;
        try {
          d(a);
        } finally {
          M.transition = b2;
        }
      }, [a]);
      return c;
    }, useTransition: function() {
      var a = md(false), b = a[0];
      a = Ad.bind(null, a[1]);
      od(a);
      return [a, b];
    }, useMutableSource: function(a, b, c) {
      var d = dd();
      d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
      return jd(d, a, b, c);
    }, useOpaqueIdentifier: function() {
      var a = "c_" + (Oa++).toString(36);
      md(a);
      return a;
    }, unstable_isNewReconciler: false };
    var ad = {
      readContext: K,
      useCallback: yd,
      useContext: K,
      useEffect: td,
      useImperativeHandle: wd,
      useLayoutEffect: ud,
      useMemo: zd,
      useReducer: gd,
      useRef: pd,
      useState: function() {
        return gd(fd);
      },
      useDebugValue: xd,
      useDeferredValue: function(a) {
        var b = gd(fd), c = b[0], d = b[1];
        td(function() {
          var b2 = M.transition;
          M.transition = 1;
          try {
            d(a);
          } finally {
            M.transition = b2;
          }
        }, [a]);
        return c;
      },
      useTransition: function() {
        var a = gd(fd)[0];
        return [pd().current, a];
      },
      useMutableSource: ld,
      useOpaqueIdentifier: function() {
        return gd(fd)[0];
      },
      unstable_isNewReconciler: false
    };
    var bd = {
      readContext: K,
      useCallback: yd,
      useContext: K,
      useEffect: td,
      useImperativeHandle: wd,
      useLayoutEffect: ud,
      useMemo: zd,
      useReducer: hd,
      useRef: pd,
      useState: function() {
        return hd(fd);
      },
      useDebugValue: xd,
      useDeferredValue: function(a) {
        var b = hd(fd), c = b[0], d = b[1];
        td(function() {
          var b2 = M.transition;
          M.transition = 1;
          try {
            d(a);
          } finally {
            M.transition = b2;
          }
        }, [a]);
        return c;
      },
      useTransition: function() {
        var a = hd(fd)[0];
        return [pd().current, a];
      },
      useMutableSource: ld,
      useOpaqueIdentifier: function() {
        return hd(fd)[0];
      },
      unstable_isNewReconciler: false
    };
    var Bd = fa.ReactCurrentOwner;
    var J = false;
    function S(a, b, c, d) {
      b.child = a === null ? Gc(b, null, c, d) : Fc(b, a.child, c, d);
    }
    function Cd(a, b, c, d, e) {
      c = c.render;
      var f = b.ref;
      cc(b, e);
      d = Zc(a, b, c, d, f, e);
      if (a !== null && !J)
        return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, Dd(a, b, e);
      b.flags |= 1;
      S(a, b, d, e);
      return b.child;
    }
    function Ed(a, b, c, d, e, f) {
      if (a === null) {
        var h = c.type;
        if (typeof h === "function" && !Fd(h) && h.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0)
          return b.tag = 15, b.type = h, Gd(a, b, h, d, e, f);
        a = Cc(c.type, null, d, b, b.mode, f);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      h = a.child;
      if ((e & f) === 0 && (e = h.memoizedProps, c = c.compare, c = c !== null ? c : Ub, c(e, d) && a.ref === b.ref))
        return Dd(a, b, f);
      b.flags |= 1;
      a = Ac(h, d);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    function Gd(a, b, c, d, e, f) {
      if (a !== null && Ub(a.memoizedProps, d) && a.ref === b.ref)
        if (J = false, (f & e) !== 0)
          (a.flags & 16384) !== 0 && (J = true);
        else
          return b.lanes = a.lanes, Dd(a, b, f);
      return Hd(a, b, c, d, f);
    }
    function Id(a, b, c) {
      var d = b.pendingProps, e = d.children, f = a !== null ? a.memoizedState : null;
      if (d.mode === "hidden" || d.mode === "unstable-defer-without-hiding")
        if ((b.mode & 4) === 0)
          b.memoizedState = { baseLanes: 0 }, Jd(b, c);
        else if ((c & 1073741824) !== 0)
          b.memoizedState = { baseLanes: 0 }, Jd(b, f !== null ? f.baseLanes : c);
        else
          return a = f !== null ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, Jd(b, a), null;
      else
        f !== null ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, Jd(b, d);
      S(a, b, e, c);
      return b.child;
    }
    function Kd(a, b) {
      var c = b.ref;
      if (a === null && c !== null || a !== null && a.ref !== c)
        b.flags |= 128;
    }
    function Hd(a, b, c, d, e) {
      var f = E(c) ? Xa : C.current;
      f = Ya(b, f);
      cc(b, e);
      c = Zc(a, b, c, d, f, e);
      if (a !== null && !J)
        return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, Dd(a, b, e);
      b.flags |= 1;
      S(a, b, c, e);
      return b.child;
    }
    function Ld(a, b, c, d, e) {
      if (E(c)) {
        var f = true;
        bb(b);
      } else
        f = false;
      cc(b, e);
      if (b.stateNode === null)
        a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), tc(b, c, d), vc(b, c, d, e), d = true;
      else if (a === null) {
        var h = b.stateNode, g = b.memoizedProps;
        h.props = g;
        var k = h.context, l = c.contextType;
        typeof l === "object" && l !== null ? l = K(l) : (l = E(c) ? Xa : C.current, l = Ya(b, l));
        var p = c.getDerivedStateFromProps, r = typeof p === "function" || typeof h.getSnapshotBeforeUpdate === "function";
        r || typeof h.UNSAFE_componentWillReceiveProps !== "function" && typeof h.componentWillReceiveProps !== "function" || (g !== d || k !== l) && uc(b, h, d, l);
        dc = false;
        var m = b.memoizedState;
        h.state = m;
        jc(b, d, h, e);
        k = b.memoizedState;
        g !== d || m !== k || D.current || dc ? (typeof p === "function" && (nc(b, c, p, d), k = b.memoizedState), (g = dc || sc(b, c, g, d, m, k, l)) ? (r || typeof h.UNSAFE_componentWillMount !== "function" && typeof h.componentWillMount !== "function" || (typeof h.componentWillMount === "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount === "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount === "function" && (b.flags |= 4)) : (typeof h.componentDidMount === "function" && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), h.props = d, h.state = k, h.context = l, d = g) : (typeof h.componentDidMount === "function" && (b.flags |= 4), d = false);
      } else {
        h = b.stateNode;
        fc(a, b);
        g = b.memoizedProps;
        l = b.type === b.elementType ? g : I(b.type, g);
        h.props = l;
        r = b.pendingProps;
        m = h.context;
        k = c.contextType;
        typeof k === "object" && k !== null ? k = K(k) : (k = E(c) ? Xa : C.current, k = Ya(b, k));
        var z = c.getDerivedStateFromProps;
        (p = typeof z === "function" || typeof h.getSnapshotBeforeUpdate === "function") || typeof h.UNSAFE_componentWillReceiveProps !== "function" && typeof h.componentWillReceiveProps !== "function" || (g !== r || m !== k) && uc(b, h, d, k);
        dc = false;
        m = b.memoizedState;
        h.state = m;
        jc(b, d, h, e);
        var x = b.memoizedState;
        g !== r || m !== x || D.current || dc ? (typeof z === "function" && (nc(b, c, z, d), x = b.memoizedState), (l = dc || sc(b, c, l, d, m, x, k)) ? (p || typeof h.UNSAFE_componentWillUpdate !== "function" && typeof h.componentWillUpdate !== "function" || (typeof h.componentWillUpdate === "function" && h.componentWillUpdate(d, x, k), typeof h.UNSAFE_componentWillUpdate === "function" && h.UNSAFE_componentWillUpdate(d, x, k)), typeof h.componentDidUpdate === "function" && (b.flags |= 4), typeof h.getSnapshotBeforeUpdate === "function" && (b.flags |= 256)) : (typeof h.componentDidUpdate !== "function" || g === a.memoizedProps && m === a.memoizedState || (b.flags |= 4), typeof h.getSnapshotBeforeUpdate !== "function" || g === a.memoizedProps && m === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), h.props = d, h.state = x, h.context = k, d = l) : (typeof h.componentDidUpdate !== "function" || g === a.memoizedProps && m === a.memoizedState || (b.flags |= 4), typeof h.getSnapshotBeforeUpdate !== "function" || g === a.memoizedProps && m === a.memoizedState || (b.flags |= 256), d = false);
      }
      return Md(a, b, c, d, f, e);
    }
    function Md(a, b, c, d, e, f) {
      Kd(a, b);
      var h = (b.flags & 64) !== 0;
      if (!d && !h)
        return e && cb(b, c, false), Dd(a, b, f);
      d = b.stateNode;
      Bd.current = b;
      var g = h && typeof c.getDerivedStateFromError !== "function" ? null : d.render();
      b.flags |= 1;
      a !== null && h ? (b.child = Fc(b, a.child, null, f), b.child = Fc(b, null, g, f)) : S(a, b, g, f);
      b.memoizedState = d.state;
      e && cb(b, c, true);
      return b.child;
    }
    function Nd(a) {
      var b = a.stateNode;
      b.pendingContext ? $a(a, b.pendingContext, b.pendingContext !== b.context) : b.context && $a(a, b.context, false);
      Mc(a, b.containerInfo);
    }
    var Od = { dehydrated: null, retryLane: 0 };
    function Pd(a, b, c) {
      var d = b.pendingProps, e = L.current, f = false, h;
      (h = (b.flags & 64) !== 0) || (h = a !== null && a.memoizedState === null ? false : (e & 2) !== 0);
      h ? (f = true, b.flags &= -65) : a !== null && a.memoizedState === null || d.fallback === void 0 || d.unstable_avoidThisFallback === true || (e |= 1);
      B(L, e & 1);
      if (a === null) {
        a = d.children;
        e = d.fallback;
        if (f)
          return a = Qd(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = Od, a;
        if (typeof d.unstable_expectedLoadTime === "number")
          return a = Qd(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = Od, b.lanes = 33554432, a;
        c = Rd({ mode: "visible", children: a }, b.mode, c, null);
        c.return = b;
        return b.child = c;
      }
      if (a.memoizedState !== null) {
        if (f)
          return d = Sd(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = Od, d;
        c = Td(a, b, d.children, c);
        b.memoizedState = null;
        return c;
      }
      if (f)
        return d = Sd(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = Od, d;
      c = Td(a, b, d.children, c);
      b.memoizedState = null;
      return c;
    }
    function Qd(a, b, c, d) {
      var e = a.mode, f = a.child;
      b = { mode: "hidden", children: b };
      (e & 2) === 0 && f !== null ? (f.childLanes = 0, f.pendingProps = b) : f = Rd(b, e, 0, null);
      c = Ec(c, e, d, null);
      f.return = a;
      c.return = a;
      f.sibling = c;
      a.child = f;
      return c;
    }
    function Td(a, b, c, d) {
      var e = a.child;
      a = e.sibling;
      c = Ac(e, { mode: "visible", children: c });
      (b.mode & 2) === 0 && (c.lanes = d);
      c.return = b;
      c.sibling = null;
      a !== null && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
      return b.child = c;
    }
    function Sd(a, b, c, d, e) {
      var f = b.mode, h = a.child;
      a = h.sibling;
      var g = { mode: "hidden", children: c };
      (f & 2) === 0 && b.child !== h ? (c = b.child, c.childLanes = 0, c.pendingProps = g, h = c.lastEffect, h !== null ? (b.firstEffect = c.firstEffect, b.lastEffect = h, h.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Ac(h, g);
      a !== null ? d = Ac(a, d) : (d = Ec(d, f, e, null), d.flags |= 2);
      d.return = b;
      c.return = b;
      c.sibling = d;
      b.child = c;
      return d;
    }
    function Ud(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      c !== null && (c.lanes |= b);
      bc(a.return, b);
    }
    function Vd(a, b, c, d, e, f) {
      var h = a.memoizedState;
      h === null ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f } : (h.isBackwards = b, h.rendering = null, h.renderingStartTime = 0, h.last = d, h.tail = c, h.tailMode = e, h.lastEffect = f);
    }
    function Wd(a, b, c) {
      var d = b.pendingProps, e = d.revealOrder, f = d.tail;
      S(a, b, d.children, c);
      d = L.current;
      if ((d & 2) !== 0)
        d = d & 1 | 2, b.flags |= 64;
      else {
        if (a !== null && (a.flags & 64) !== 0)
          a:
            for (a = b.child; a !== null; ) {
              if (a.tag === 13)
                a.memoizedState !== null && Ud(a, c);
              else if (a.tag === 19)
                Ud(a, c);
              else if (a.child !== null) {
                a.child.return = a;
                a = a.child;
                continue;
              }
              if (a === b)
                break a;
              for (; a.sibling === null; ) {
                if (a.return === null || a.return === b)
                  break a;
                a = a.return;
              }
              a.sibling.return = a.return;
              a = a.sibling;
            }
        d &= 1;
      }
      B(L, d);
      if ((b.mode & 2) === 0)
        b.memoizedState = null;
      else
        switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; c !== null; )
              a = c.alternate, a !== null && Rc(a) === null && (e = c), c = c.sibling;
            c = e;
            c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            Vd(b, false, e, c, f, b.lastEffect);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; e !== null; ) {
              a = e.alternate;
              if (a !== null && Rc(a) === null) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            Vd(b, true, c, null, f, b.lastEffect);
            break;
          case "together":
            Vd(b, false, null, null, void 0, b.lastEffect);
            break;
          default:
            b.memoizedState = null;
        }
      return b.child;
    }
    function Dd(a, b, c) {
      a !== null && (b.dependencies = a.dependencies);
      kc |= b.lanes;
      if ((c & b.childLanes) !== 0) {
        if (a !== null && b.child !== a.child)
          throw Error(q(153));
        if (b.child !== null) {
          a = b.child;
          c = Ac(a, a.pendingProps);
          b.child = c;
          for (c.return = b; a.sibling !== null; )
            a = a.sibling, c = c.sibling = Ac(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      return null;
    }
    var Xd;
    var Yd;
    var Zd;
    var $d;
    Xd = function(a, b) {
      for (var c = b.child; c !== null; ) {
        if (c.tag === 5 || c.tag === 6) {
          var d = a, e = c.stateNode, f = d.children.indexOf(e);
          f !== -1 && d.children.splice(f, 1);
          d.children.push(e);
        } else if (c.tag !== 4 && c.child !== null) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b)
          break;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === b)
            return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    };
    Yd = function() {
    };
    Zd = function(a, b, c, d) {
      a.memoizedProps !== d && (Lc(Ic.current), b.updateQueue = Ha) && (b.flags |= 4);
    };
    $d = function(a, b, c, d) {
      c !== d && (b.flags |= 4);
    };
    function ae(a, b) {
      switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; b !== null; )
            b.alternate !== null && (c = b), b = b.sibling;
          c === null ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; c !== null; )
            c.alternate !== null && (d = c), c = c.sibling;
          d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
    }
    function be(a, b, c) {
      var d = b.pendingProps;
      switch (b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;
        case 1:
          return E(b.type) && Za(), null;
        case 3:
          return Nc(), A(D), A(C), Tc(), d = b.stateNode, d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), a !== null && a.child !== null || d.hydrate || (b.flags |= 256), Yd(b), null;
        case 5:
          Qc(b);
          var e = Lc(Kc.current);
          c = b.type;
          if (a !== null && b.stateNode != null)
            Zd(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
          else {
            if (!d) {
              if (b.stateNode === null)
                throw Error(q(166));
              return null;
            }
            Lc(Ic.current);
            a = { type: c, props: d, isHidden: false, children: [], internalInstanceHandle: b, rootContainerInstance: e, tag: "INSTANCE" };
            Xd(a, b, false, false);
            b.stateNode = a;
            b.ref !== null && (b.flags |= 128);
          }
          return null;
        case 6:
          if (a && b.stateNode != null)
            $d(a, b, a.memoizedProps, d);
          else {
            if (typeof d !== "string" && b.stateNode === null)
              throw Error(q(166));
            Lc(Kc.current);
            Lc(Ic.current);
            b.stateNode = { text: d, isHidden: false, tag: "TEXT" };
          }
          return null;
        case 13:
          A(L);
          d = b.memoizedState;
          if ((b.flags & 64) !== 0)
            return b.lanes = c, b;
          d = d !== null;
          e = false;
          a !== null && (e = a.memoizedState !== null);
          if (d && !e && (b.mode & 2) !== 0)
            if (a === null && b.memoizedProps.unstable_avoidThisFallback !== true || (L.current & 1) !== 0)
              T === 0 && (T = 3);
            else {
              if (T === 0 || T === 3)
                T = 4;
              R === null || (kc & 134217727) === 0 && (ce & 134217727) === 0 || de(R, U);
            }
          if (d || e)
            b.flags |= 4;
          return null;
        case 4:
          return Nc(), Yd(b), null;
        case 10:
          return ac(b), null;
        case 17:
          return E(b.type) && Za(), null;
        case 19:
          A(L);
          d = b.memoizedState;
          if (d === null)
            return null;
          e = (b.flags & 64) !== 0;
          var f = d.rendering;
          if (f === null)
            if (e)
              ae(d, false);
            else {
              if (T !== 0 || a !== null && (a.flags & 64) !== 0)
                for (a = b.child; a !== null; ) {
                  f = Rc(a);
                  if (f !== null) {
                    b.flags |= 64;
                    ae(d, false);
                    a = f.updateQueue;
                    a !== null && (b.updateQueue = a, b.flags |= 4);
                    d.lastEffect === null && (b.firstEffect = null);
                    b.lastEffect = d.lastEffect;
                    a = c;
                    for (d = b.child; d !== null; )
                      e = d, c = a, e.flags &= 2, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null, f = e.alternate, f === null ? (e.childLanes = 0, e.lanes = c, e.child = null, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = f.childLanes, e.lanes = f.lanes, e.child = f.child, e.memoizedProps = f.memoizedProps, e.memoizedState = f.memoizedState, e.updateQueue = f.updateQueue, e.type = f.type, c = f.dependencies, e.dependencies = c === null ? null : { lanes: c.lanes, firstContext: c.firstContext }), d = d.sibling;
                    B(L, L.current & 1 | 2);
                    return b.child;
                  }
                  a = a.sibling;
                }
              d.tail !== null && G() > ee && (b.flags |= 64, e = true, ae(d, false), b.lanes = 33554432);
            }
          else {
            if (!e)
              if (a = Rc(f), a !== null) {
                if (b.flags |= 64, e = true, a = a.updateQueue, a !== null && (b.updateQueue = a, b.flags |= 4), ae(d, true), d.tail === null && d.tailMode === "hidden" && !f.alternate)
                  return b = b.lastEffect = d.lastEffect, b !== null && (b.nextEffect = null), null;
              } else
                2 * G() - d.renderingStartTime > ee && c !== 1073741824 && (b.flags |= 64, e = true, ae(d, false), b.lanes = 33554432);
            d.isBackwards ? (f.sibling = b.child, b.child = f) : (a = d.last, a !== null ? a.sibling = f : b.child = f, d.last = f);
          }
          return d.tail !== null ? (a = d.tail, d.rendering = a, d.tail = a.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = G(), a.sibling = null, b = L.current, B(L, e ? b & 1 | 2 : b & 1), a) : null;
        case 23:
        case 24:
          return fe(), a !== null && a.memoizedState !== null !== (b.memoizedState !== null) && d.mode !== "unstable-defer-without-hiding" && (b.flags |= 4), null;
      }
      throw Error(q(156, b.tag));
    }
    function ge(a) {
      switch (a.tag) {
        case 1:
          E(a.type) && Za();
          var b = a.flags;
          return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
        case 3:
          Nc();
          A(D);
          A(C);
          Tc();
          b = a.flags;
          if ((b & 64) !== 0)
            throw Error(q(285));
          a.flags = b & -4097 | 64;
          return a;
        case 5:
          return Qc(a), null;
        case 13:
          return A(L), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
        case 19:
          return A(L), null;
        case 4:
          return Nc(), null;
        case 10:
          return ac(a), null;
        case 23:
        case 24:
          return fe(), null;
        default:
          return null;
      }
    }
    function he(a, b) {
      try {
        var c = "", d = b;
        do
          c += Vb(d), d = d.return;
        while (d);
        var e = c;
      } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
      }
      return { value: a, source: b, stack: e };
    }
    function ie(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function() {
          throw c;
        });
      }
    }
    var je = typeof WeakMap === "function" ? WeakMap : Map;
    function le(a, b, c) {
      c = gc(-1, c);
      c.tag = 3;
      c.payload = { element: null };
      var d = b.value;
      c.callback = function() {
        me || (me = true, ne = d);
        ie(a, b);
      };
      return c;
    }
    function oe(a, b, c) {
      c = gc(-1, c);
      c.tag = 3;
      var d = a.type.getDerivedStateFromError;
      if (typeof d === "function") {
        var e = b.value;
        c.payload = function() {
          ie(a, b);
          return d(e);
        };
      }
      var f = a.stateNode;
      f !== null && typeof f.componentDidCatch === "function" && (c.callback = function() {
        typeof d !== "function" && (pe === null ? pe = /* @__PURE__ */ new Set([this]) : pe.add(this), ie(a, b));
        var c2 = b.stack;
        this.componentDidCatch(b.value, { componentStack: c2 !== null ? c2 : "" });
      });
      return c;
    }
    var qe = typeof WeakSet === "function" ? WeakSet : Set;
    function re(a) {
      var b = a.ref;
      if (b !== null)
        if (typeof b === "function")
          try {
            b(null);
          } catch (c) {
            se(a, c);
          }
        else
          b.current = null;
    }
    function te(a, b) {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;
        case 1:
          if (b.flags & 256 && a !== null) {
            var c = a.memoizedProps, d = a.memoizedState;
            a = b.stateNode;
            b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : I(b.type, c), d);
            a.__reactInternalSnapshotBeforeUpdate = b;
          }
          return;
        case 3:
          b.flags & 256 && b.stateNode.containerInfo.children.splice(0);
          return;
        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }
      throw Error(q(163));
    }
    function ue(a, b, c) {
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          b = c.updateQueue;
          b = b !== null ? b.lastEffect : null;
          if (b !== null) {
            a = b = b.next;
            do {
              if ((a.tag & 3) === 3) {
                var d = a.create;
                a.destroy = d();
              }
              a = a.next;
            } while (a !== b);
          }
          b = c.updateQueue;
          b = b !== null ? b.lastEffect : null;
          if (b !== null) {
            a = b = b.next;
            do {
              var e = a;
              d = e.next;
              e = e.tag;
              (e & 4) !== 0 && (e & 1) !== 0 && (ve(c, a), we(c, a));
              a = d;
            } while (a !== b);
          }
          return;
        case 1:
          a = c.stateNode;
          c.flags & 4 && (b === null ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : I(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate)));
          b = c.updateQueue;
          b !== null && lc(c, b, a);
          return;
        case 3:
          b = c.updateQueue;
          if (b !== null) {
            a = null;
            if (c.child !== null)
              switch (c.child.tag) {
                case 5:
                  a = Ja(c.child.stateNode);
                  break;
                case 1:
                  a = c.child.stateNode;
              }
            lc(c, b, a);
          }
          return;
        case 5:
          return;
        case 6:
          return;
        case 4:
          return;
        case 12:
          return;
        case 13:
          return;
        case 19:
        case 17:
        case 20:
        case 21:
        case 23:
        case 24:
          return;
      }
      throw Error(q(163));
    }
    function xe(a, b) {
      for (var c = a; ; ) {
        if (c.tag === 5) {
          var d = c.stateNode;
          b ? d.isHidden = true : c.stateNode.isHidden = false;
        } else if (c.tag === 6)
          c.stateNode.isHidden = b ? true : false;
        else if ((c.tag !== 23 && c.tag !== 24 || c.memoizedState === null || c === a) && c.child !== null) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === a)
          break;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === a)
            return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    }
    function ye(a, b) {
      if (eb && typeof eb.onCommitFiberUnmount === "function")
        try {
          eb.onCommitFiberUnmount(db, b);
        } catch (f) {
        }
      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          a = b.updateQueue;
          if (a !== null && (a = a.lastEffect, a !== null)) {
            var c = a = a.next;
            do {
              var d = c, e = d.destroy;
              d = d.tag;
              if (e !== void 0)
                if ((d & 4) !== 0)
                  ve(b, c);
                else {
                  d = b;
                  try {
                    e();
                  } catch (f) {
                    se(d, f);
                  }
                }
              c = c.next;
            } while (c !== a);
          }
          break;
        case 1:
          re(b);
          a = b.stateNode;
          if (typeof a.componentWillUnmount === "function")
            try {
              a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
            } catch (f) {
              se(b, f);
            }
          break;
        case 5:
          re(b);
          break;
        case 4:
          ze(a, b);
      }
    }
    function Ae(a) {
      a.alternate = null;
      a.child = null;
      a.dependencies = null;
      a.firstEffect = null;
      a.lastEffect = null;
      a.memoizedProps = null;
      a.memoizedState = null;
      a.pendingProps = null;
      a.return = null;
      a.updateQueue = null;
    }
    function Be(a) {
      return a.tag === 5 || a.tag === 3 || a.tag === 4;
    }
    function Ce(a) {
      a: {
        for (var b = a.return; b !== null; ) {
          if (Be(b))
            break a;
          b = b.return;
        }
        throw Error(q(160));
      }
      var c = b;
      b = c.stateNode;
      switch (c.tag) {
        case 5:
          var d = false;
          break;
        case 3:
          b = b.containerInfo;
          d = true;
          break;
        case 4:
          b = b.containerInfo;
          d = true;
          break;
        default:
          throw Error(q(161));
      }
      c.flags & 16 && (c.flags &= -17);
      a:
        b:
          for (c = a; ; ) {
            for (; c.sibling === null; ) {
              if (c.return === null || Be(c.return)) {
                c = null;
                break a;
              }
              c = c.return;
            }
            c.sibling.return = c.return;
            for (c = c.sibling; c.tag !== 5 && c.tag !== 6 && c.tag !== 18; ) {
              if (c.flags & 2)
                continue b;
              if (c.child === null || c.tag === 4)
                continue b;
              else
                c.child.return = c, c = c.child;
            }
            if (!(c.flags & 2)) {
              c = c.stateNode;
              break a;
            }
          }
      d ? De(a, c, b) : Ee(a, c, b);
    }
    function De(a, b, c) {
      var d = a.tag, e = d === 5 || d === 6;
      if (e)
        a = e ? a.stateNode : a.stateNode.instance, b ? La(c, a, b) : Ka(c, a);
      else if (d !== 4 && (a = a.child, a !== null))
        for (De(a, b, c), a = a.sibling; a !== null; )
          De(a, b, c), a = a.sibling;
    }
    function Ee(a, b, c) {
      var d = a.tag, e = d === 5 || d === 6;
      if (e)
        a = e ? a.stateNode : a.stateNode.instance, b ? La(c, a, b) : Ka(c, a);
      else if (d !== 4 && (a = a.child, a !== null))
        for (Ee(a, b, c), a = a.sibling; a !== null; )
          Ee(a, b, c), a = a.sibling;
    }
    function ze(a, b) {
      for (var c = b, d = false, e; ; ) {
        if (!d) {
          d = c.return;
          a:
            for (; ; ) {
              if (d === null)
                throw Error(q(160));
              e = d.stateNode;
              switch (d.tag) {
                case 5:
                  break a;
                case 3:
                  e = e.containerInfo;
                  break a;
                case 4:
                  e = e.containerInfo;
                  break a;
              }
              d = d.return;
            }
          d = true;
        }
        if (c.tag === 5 || c.tag === 6) {
          a:
            for (var f = a, h = c, g = h; ; )
              if (ye(f, g), g.child !== null && g.tag !== 4)
                g.child.return = g, g = g.child;
              else {
                if (g === h)
                  break a;
                for (; g.sibling === null; ) {
                  if (g.return === null || g.return === h)
                    break a;
                  g = g.return;
                }
                g.sibling.return = g.return;
                g = g.sibling;
              }
          f = e;
          h = f.children.indexOf(c.stateNode);
          f.children.splice(h, 1);
        } else if (c.tag === 4) {
          if (c.child !== null) {
            e = c.stateNode.containerInfo;
            c.child.return = c;
            c = c.child;
            continue;
          }
        } else if (ye(a, c), c.child !== null) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b)
          break;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === b)
            return;
          c = c.return;
          c.tag === 4 && (d = false);
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    }
    function Fe(a, b) {
      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          b = b.updateQueue;
          b = b !== null ? b.lastEffect : null;
          if (b !== null) {
            a = b = b.next;
            do {
              if ((a.tag & 3) === 3) {
                var c = a.destroy;
                a.destroy = void 0;
                c !== void 0 && c();
              }
              a = a.next;
            } while (a !== b);
          }
          return;
        case 1:
          return;
        case 5:
          a = b.stateNode;
          if (a != null) {
            c = b.memoizedProps;
            var d = b.type, e = b.updateQueue;
            b.updateQueue = null;
            e !== null && (a.type = d, a.props = c);
          }
          return;
        case 6:
          if (b.stateNode === null)
            throw Error(q(162));
          b.stateNode.text = b.memoizedProps;
          return;
        case 3:
          return;
        case 12:
          return;
        case 13:
          b.memoizedState !== null && (Ge = G(), xe(b.child, true));
          He(b);
          return;
        case 19:
          He(b);
          return;
        case 17:
          return;
        case 23:
        case 24:
          xe(b, b.memoizedState !== null);
          return;
      }
      throw Error(q(163));
    }
    function He(a) {
      var b = a.updateQueue;
      if (b !== null) {
        a.updateQueue = null;
        var c = a.stateNode;
        c === null && (c = a.stateNode = new qe());
        b.forEach(function(b2) {
          var d = Ie.bind(null, a, b2);
          c.has(b2) || (c.add(b2), b2.then(d, d));
        });
      }
    }
    function Je(a, b) {
      return a !== null && (a = a.memoizedState, a === null || a.dehydrated !== null) ? (b = b.memoizedState, b !== null && b.dehydrated === null) : false;
    }
    var Ke = null;
    function Le(a) {
      if (Ke === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7);
          Ke = (module2 && module2[b]).call(module2, "timers").setImmediate;
        } catch (c) {
          Ke = function(a2) {
            var b2 = new MessageChannel();
            b2.port1.onmessage = a2;
            b2.port2.postMessage(void 0);
          };
        }
      return Ke(a);
    }
    var Me = Math.ceil;
    var Ne = fa.ReactCurrentDispatcher;
    var Oe = fa.ReactCurrentOwner;
    var Pe = fa.IsSomeRendererActing;
    var W = 0;
    var R = null;
    var X = null;
    var U = 0;
    var Qe = 0;
    var Re = Va(0);
    var T = 0;
    var Se = null;
    var Te = 0;
    var kc = 0;
    var ce = 0;
    var Ue = 0;
    var Ve = null;
    var Ge = 0;
    var ee = Infinity;
    var Y = null;
    var me = false;
    var ne = null;
    var pe = null;
    var We = false;
    var Xe = null;
    var Ye = 90;
    var Ze = [];
    var $e = [];
    var af = null;
    var bf = 0;
    var cf = null;
    var df = -1;
    var ef = 0;
    var ff = 0;
    var gf = null;
    var hf = false;
    function oc() {
      return (W & 48) !== 0 ? G() : df !== -1 ? df : df = G();
    }
    function pc(a) {
      a = a.mode;
      if ((a & 2) === 0)
        return 1;
      if ((a & 4) === 0)
        return Lb() === 99 ? 1 : 2;
      ef === 0 && (ef = Te);
      if (Rb.transition !== 0) {
        ff !== 0 && (ff = Ve !== null ? Ve.pendingLanes : 0);
        a = ef;
        var b = 4186112 & ~ff;
        b &= -b;
        b === 0 && (a = 4186112 & ~a, b = a & -a, b === 0 && (b = 8192));
        return b;
      }
      a = Lb();
      (W & 4) !== 0 && a === 98 ? a = mb(12, ef) : (a = hb(a), a = mb(a, ef));
      return a;
    }
    function qc(a, b, c) {
      if (50 < bf)
        throw bf = 0, cf = null, Error(q(185));
      a = jf(a, b);
      if (a === null)
        return null;
      pb(a, b, c);
      a === R && (ce |= b, T === 4 && de(a, U));
      var d = Lb();
      b === 1 ? (W & 8) !== 0 && (W & 48) === 0 ? kf(a) : (Z(a, c), W === 0 && (ee = G() + 500, Pb())) : ((W & 4) === 0 || d !== 98 && d !== 99 || (af === null ? af = /* @__PURE__ */ new Set([a]) : af.add(a)), Z(a, c));
      Ve = a;
    }
    function jf(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      c !== null && (c.lanes |= b);
      c = a;
      for (a = a.return; a !== null; )
        a.childLanes |= b, c = a.alternate, c !== null && (c.childLanes |= b), c = a, a = a.return;
      return c.tag === 3 ? c.stateNode : null;
    }
    function Z(a, b) {
      for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, h = a.pendingLanes; 0 < h; ) {
        var g = 31 - kb(h), k = 1 << g, l = f[g];
        if (l === -1) {
          if ((k & d) === 0 || (k & e) !== 0) {
            l = b;
            gb(k);
            var p = F;
            f[g] = 10 <= p ? l + 250 : 6 <= p ? l + 5e3 : -1;
          }
        } else
          l <= b && (a.expiredLanes |= k);
        h &= ~k;
      }
      d = jb(a, a === R ? U : 0);
      b = F;
      if (d === 0)
        c !== null && (c !== Fb && vb(c), a.callbackNode = null, a.callbackPriority = 0);
      else {
        if (c !== null) {
          if (a.callbackPriority === b)
            return;
          c !== Fb && vb(c);
        }
        b === 15 ? (c = kf.bind(null, a), Hb === null ? (Hb = [c], Ib = ub(Ab, Qb)) : Hb.push(c), c = Fb) : b === 14 ? c = Ob(99, kf.bind(null, a)) : (c = ib(b), c = Ob(c, lf.bind(null, a)));
        a.callbackPriority = b;
        a.callbackNode = c;
      }
    }
    function lf(a) {
      df = -1;
      ff = ef = 0;
      if ((W & 48) !== 0)
        throw Error(q(327));
      var b = a.callbackNode;
      if (mf() && a.callbackNode !== b)
        return null;
      var c = jb(a, a === R ? U : 0);
      if (c === 0)
        return null;
      var d = c;
      var e = W;
      W |= 16;
      var f = nf();
      if (R !== a || U !== d)
        ee = G() + 500, of(a, d);
      do
        try {
          pf();
          break;
        } catch (g) {
          qf(a, g);
        }
      while (1);
      $b();
      Ne.current = f;
      W = e;
      X !== null ? d = 0 : (R = null, U = 0, d = T);
      if ((Te & ce) !== 0)
        of(a, 0);
      else if (d !== 0) {
        d === 2 && (W |= 64, a.hydrate && (a.hydrate = false, a.containerInfo.children.splice(0)), c = lb(a), c !== 0 && (d = rf(a, c)));
        if (d === 1)
          throw b = Se, of(a, 0), de(a, c), Z(a, G()), b;
        a.finishedWork = a.current.alternate;
        a.finishedLanes = c;
        switch (d) {
          case 0:
          case 1:
            throw Error(q(345));
          case 2:
            sf(a);
            break;
          case 3:
            de(a, c);
            if ((c & 62914560) === c && (d = Ge + 500 - G(), 10 < d)) {
              if (jb(a, 0) !== 0)
                break;
              e = a.suspendedLanes;
              if ((e & c) !== c) {
                oc();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ma(sf.bind(null, a), d);
              break;
            }
            sf(a);
            break;
          case 4:
            de(a, c);
            if ((c & 4186112) === c)
              break;
            d = a.eventTimes;
            for (e = -1; 0 < c; ) {
              var h = 31 - kb(c);
              f = 1 << h;
              h = d[h];
              h > e && (e = h);
              c &= ~f;
            }
            c = e;
            c = G() - c;
            c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * Me(c / 1960)) - c;
            if (10 < c) {
              a.timeoutHandle = Ma(sf.bind(null, a), c);
              break;
            }
            sf(a);
            break;
          case 5:
            sf(a);
            break;
          default:
            throw Error(q(329));
        }
      }
      Z(a, G());
      return a.callbackNode === b ? lf.bind(null, a) : null;
    }
    function de(a, b) {
      b &= ~Ue;
      b &= ~ce;
      a.suspendedLanes |= b;
      a.pingedLanes &= ~b;
      for (a = a.expirationTimes; 0 < b; ) {
        var c = 31 - kb(b), d = 1 << c;
        a[c] = -1;
        b &= ~d;
      }
    }
    function kf(a) {
      if ((W & 48) !== 0)
        throw Error(q(327));
      mf();
      if (a === R && (a.expiredLanes & U) !== 0) {
        var b = U;
        var c = rf(a, b);
        (Te & ce) !== 0 && (b = jb(a, b), c = rf(a, b));
      } else
        b = jb(a, 0), c = rf(a, b);
      a.tag !== 0 && c === 2 && (W |= 64, a.hydrate && (a.hydrate = false, a.containerInfo.children.splice(0)), b = lb(a), b !== 0 && (c = rf(a, b)));
      if (c === 1)
        throw c = Se, of(a, 0), de(a, b), Z(a, G()), c;
      a.finishedWork = a.current.alternate;
      a.finishedLanes = b;
      sf(a);
      Z(a, G());
      return null;
    }
    function tf(a, b) {
      var c = W;
      W |= 1;
      try {
        return a(b);
      } finally {
        W = c, W === 0 && (ee = G() + 500, Pb());
      }
    }
    function Jd(a, b) {
      B(Re, Qe);
      Qe |= b;
      Te |= b;
    }
    function fe() {
      Qe = Re.current;
      A(Re);
    }
    function of(a, b) {
      a.finishedWork = null;
      a.finishedLanes = 0;
      var c = a.timeoutHandle;
      c !== -1 && (a.timeoutHandle = -1, Na(c));
      if (X !== null)
        for (c = X.return; c !== null; ) {
          var d = c;
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              d !== null && d !== void 0 && Za();
              break;
            case 3:
              Nc();
              A(D);
              A(C);
              Tc();
              break;
            case 5:
              Qc(d);
              break;
            case 4:
              Nc();
              break;
            case 13:
              A(L);
              break;
            case 19:
              A(L);
              break;
            case 10:
              ac(d);
              break;
            case 23:
            case 24:
              fe();
          }
          c = c.return;
        }
      R = a;
      X = Ac(a.current, null);
      U = Qe = Te = b;
      T = 0;
      Se = null;
      Ue = ce = kc = 0;
    }
    function qf(a, b) {
      do {
        var c = X;
        try {
          $b();
          Uc.current = cd;
          if (Wc) {
            for (var d = N.memoizedState; d !== null; ) {
              var e = d.queue;
              e !== null && (e.pending = null);
              d = d.next;
            }
            Wc = false;
          }
          Vc = 0;
          P = O = N = null;
          Xc = false;
          Oe.current = null;
          if (c === null || c.return === null) {
            T = 1;
            Se = b;
            X = null;
            break;
          }
          a: {
            var f = a, h = c.return, g = c, k = b;
            b = U;
            g.flags |= 2048;
            g.firstEffect = g.lastEffect = null;
            if (k !== null && typeof k === "object" && typeof k.then === "function") {
              var l = k;
              if ((g.mode & 2) === 0) {
                var p = g.alternate;
                p ? (g.updateQueue = p.updateQueue, g.memoizedState = p.memoizedState, g.lanes = p.lanes) : (g.updateQueue = null, g.memoizedState = null);
              }
              var r = (L.current & 1) !== 0, m = h;
              do {
                var z;
                if (z = m.tag === 13) {
                  var x = m.memoizedState;
                  if (x !== null)
                    z = x.dehydrated !== null ? true : false;
                  else {
                    var V = m.memoizedProps;
                    z = V.fallback === void 0 ? false : V.unstable_avoidThisFallback !== true ? true : r ? false : true;
                  }
                }
                if (z) {
                  var t = m.updateQueue;
                  if (t === null) {
                    var u = /* @__PURE__ */ new Set();
                    u.add(l);
                    m.updateQueue = u;
                  } else
                    t.add(l);
                  if ((m.mode & 2) === 0) {
                    m.flags |= 64;
                    g.flags |= 16384;
                    g.flags &= -2981;
                    if (g.tag === 1)
                      if (g.alternate === null)
                        g.tag = 17;
                      else {
                        var y = gc(-1, 1);
                        y.tag = 2;
                        hc(g, y);
                      }
                    g.lanes |= 1;
                    break a;
                  }
                  k = void 0;
                  g = b;
                  var Aa = f.pingCache;
                  Aa === null ? (Aa = f.pingCache = new je(), k = /* @__PURE__ */ new Set(), Aa.set(l, k)) : (k = Aa.get(l), k === void 0 && (k = /* @__PURE__ */ new Set(), Aa.set(l, k)));
                  if (!k.has(g)) {
                    k.add(g);
                    var ke = uf.bind(null, f, l, g);
                    l.then(ke, ke);
                  }
                  m.flags |= 4096;
                  m.lanes = b;
                  break a;
                }
                m = m.return;
              } while (m !== null);
              k = Error((za(g.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
            }
            T !== 5 && (T = 2);
            k = he(k, g);
            m = h;
            do {
              switch (m.tag) {
                case 3:
                  f = k;
                  m.flags |= 4096;
                  b &= -b;
                  m.lanes |= b;
                  var Ef = le(m, f, b);
                  ic(m, Ef);
                  break a;
                case 1:
                  f = k;
                  var Ff = m.type, Pc = m.stateNode;
                  if ((m.flags & 64) === 0 && (typeof Ff.getDerivedStateFromError === "function" || Pc !== null && typeof Pc.componentDidCatch === "function" && (pe === null || !pe.has(Pc)))) {
                    m.flags |= 4096;
                    b &= -b;
                    m.lanes |= b;
                    var Gf = oe(m, f, b);
                    ic(m, Gf);
                    break a;
                  }
              }
              m = m.return;
            } while (m !== null);
          }
          vf(c);
        } catch (v) {
          b = v;
          X === c && c !== null && (X = c = c.return);
          continue;
        }
        break;
      } while (1);
    }
    function nf() {
      var a = Ne.current;
      Ne.current = cd;
      return a === null ? cd : a;
    }
    function rf(a, b) {
      var c = W;
      W |= 16;
      var d = nf();
      R === a && U === b || of(a, b);
      do
        try {
          wf();
          break;
        } catch (e) {
          qf(a, e);
        }
      while (1);
      $b();
      W = c;
      Ne.current = d;
      if (X !== null)
        throw Error(q(261));
      R = null;
      U = 0;
      return T;
    }
    function wf() {
      for (; X !== null; )
        xf(X);
    }
    function pf() {
      for (; X !== null && !wb(); )
        xf(X);
    }
    function xf(a) {
      var b = yf(a.alternate, a, Qe);
      a.memoizedProps = a.pendingProps;
      b === null ? vf(a) : X = b;
      Oe.current = null;
    }
    function vf(a) {
      var b = a;
      do {
        var c = b.alternate;
        a = b.return;
        if ((b.flags & 2048) === 0) {
          c = be(c, b, Qe);
          if (c !== null) {
            X = c;
            return;
          }
          c = b;
          if (c.tag !== 24 && c.tag !== 23 || c.memoizedState === null || (Qe & 1073741824) !== 0 || (c.mode & 4) === 0) {
            for (var d = 0, e = c.child; e !== null; )
              d |= e.lanes | e.childLanes, e = e.sibling;
            c.childLanes = d;
          }
          a !== null && (a.flags & 2048) === 0 && (a.firstEffect === null && (a.firstEffect = b.firstEffect), b.lastEffect !== null && (a.lastEffect !== null && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (a.lastEffect !== null ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
        } else {
          c = ge(b);
          if (c !== null) {
            c.flags &= 2047;
            X = c;
            return;
          }
          a !== null && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
        }
        b = b.sibling;
        if (b !== null) {
          X = b;
          return;
        }
        X = b = a;
      } while (b !== null);
      T === 0 && (T = 5);
    }
    function sf(a) {
      var b = Lb();
      Nb(99, zf.bind(null, a, b));
      return null;
    }
    function zf(a, b) {
      do
        mf();
      while (Xe !== null);
      if ((W & 48) !== 0)
        throw Error(q(327));
      var c = a.finishedWork;
      if (c === null)
        return null;
      a.finishedWork = null;
      a.finishedLanes = 0;
      if (c === a.current)
        throw Error(q(177));
      a.callbackNode = null;
      var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
      a.pendingLanes = e;
      a.suspendedLanes = 0;
      a.pingedLanes = 0;
      a.expiredLanes &= e;
      a.mutableReadLanes &= e;
      a.entangledLanes &= e;
      e = a.entanglements;
      for (var h = a.eventTimes, g = a.expirationTimes; 0 < f; ) {
        var k = 31 - kb(f), l = 1 << k;
        e[k] = 0;
        h[k] = -1;
        g[k] = -1;
        f &= ~l;
      }
      af !== null && (d & 24) === 0 && af.has(a) && af.delete(a);
      a === R && (X = R = null, U = 0);
      1 < c.flags ? c.lastEffect !== null ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
      if (d !== null) {
        e = W;
        W |= 32;
        gf = Oe.current = null;
        hf = false;
        Y = d;
        do
          try {
            Af();
          } catch (u) {
            if (Y === null)
              throw Error(q(330));
            se(Y, u);
            Y = Y.nextEffect;
          }
        while (Y !== null);
        gf = null;
        Y = d;
        do
          try {
            for (h = a; Y !== null; ) {
              var p = Y.flags;
              if (p & 128) {
                var r = Y.alternate;
                if (r !== null) {
                  var m = r.ref;
                  m !== null && (typeof m === "function" ? m(null) : m.current = null);
                }
              }
              switch (p & 1038) {
                case 2:
                  Ce(Y);
                  Y.flags &= -3;
                  break;
                case 6:
                  Ce(Y);
                  Y.flags &= -3;
                  Fe(Y.alternate, Y);
                  break;
                case 1024:
                  Y.flags &= -1025;
                  break;
                case 1028:
                  Y.flags &= -1025;
                  Fe(Y.alternate, Y);
                  break;
                case 4:
                  Fe(Y.alternate, Y);
                  break;
                case 8:
                  g = Y;
                  ze(h, g);
                  var z = g.alternate;
                  Ae(g);
                  z !== null && Ae(z);
              }
              Y = Y.nextEffect;
            }
          } catch (u) {
            if (Y === null)
              throw Error(q(330));
            se(Y, u);
            Y = Y.nextEffect;
          }
        while (Y !== null);
        a.current = c;
        Y = d;
        do
          try {
            for (p = a; Y !== null; ) {
              var x = Y.flags;
              x & 36 && ue(p, Y.alternate, Y);
              if (x & 128) {
                r = void 0;
                var V = Y.ref;
                if (V !== null) {
                  var t = Y.stateNode;
                  switch (Y.tag) {
                    case 5:
                      r = Ja(t);
                      break;
                    default:
                      r = t;
                  }
                  typeof V === "function" ? V(r) : V.current = r;
                }
              }
              Y = Y.nextEffect;
            }
          } catch (u) {
            if (Y === null)
              throw Error(q(330));
            se(Y, u);
            Y = Y.nextEffect;
          }
        while (Y !== null);
        Y = null;
        Gb();
        W = e;
      } else
        a.current = c;
      if (We)
        We = false, Xe = a, Ye = b;
      else
        for (Y = d; Y !== null; )
          b = Y.nextEffect, Y.nextEffect = null, Y.flags & 8 && (x = Y, x.sibling = null, x.stateNode = null), Y = b;
      d = a.pendingLanes;
      d === 0 && (pe = null);
      d === 1 ? a === cf ? bf++ : (bf = 0, cf = a) : bf = 0;
      c = c.stateNode;
      if (eb && typeof eb.onCommitFiberRoot === "function")
        try {
          eb.onCommitFiberRoot(db, c, void 0, (c.current.flags & 64) === 64);
        } catch (u) {
        }
      Z(a, G());
      if (me)
        throw me = false, a = ne, ne = null, a;
      if ((W & 8) !== 0)
        return null;
      Pb();
      return null;
    }
    function Af() {
      for (; Y !== null; ) {
        var a = Y.alternate;
        hf || gf === null || ((Y.flags & 8) !== 0 ? Fa(Y, gf) && (hf = true) : Y.tag === 13 && Je(a, Y) && Fa(Y, gf) && (hf = true));
        var b = Y.flags;
        (b & 256) !== 0 && te(a, Y);
        (b & 512) === 0 || We || (We = true, Ob(97, function() {
          mf();
          return null;
        }));
        Y = Y.nextEffect;
      }
    }
    function mf() {
      if (Ye !== 90) {
        var a = 97 < Ye ? 97 : Ye;
        Ye = 90;
        return Nb(a, Bf);
      }
      return false;
    }
    function we(a, b) {
      Ze.push(b, a);
      We || (We = true, Ob(97, function() {
        mf();
        return null;
      }));
    }
    function ve(a, b) {
      $e.push(b, a);
      We || (We = true, Ob(97, function() {
        mf();
        return null;
      }));
    }
    function Bf() {
      if (Xe === null)
        return false;
      var a = Xe;
      Xe = null;
      if ((W & 48) !== 0)
        throw Error(q(331));
      var b = W;
      W |= 32;
      var c = $e;
      $e = [];
      for (var d = 0; d < c.length; d += 2) {
        var e = c[d], f = c[d + 1], h = e.destroy;
        e.destroy = void 0;
        if (typeof h === "function")
          try {
            h();
          } catch (k) {
            if (f === null)
              throw Error(q(330));
            se(f, k);
          }
      }
      c = Ze;
      Ze = [];
      for (d = 0; d < c.length; d += 2) {
        e = c[d];
        f = c[d + 1];
        try {
          var g = e.create;
          e.destroy = g();
        } catch (k) {
          if (f === null)
            throw Error(q(330));
          se(f, k);
        }
      }
      for (g = a.current.firstEffect; g !== null; )
        a = g.nextEffect, g.nextEffect = null, g.flags & 8 && (g.sibling = null, g.stateNode = null), g = a;
      W = b;
      Pb();
      return true;
    }
    function Cf(a, b, c) {
      b = he(c, b);
      b = le(a, b, 1);
      hc(a, b);
      b = oc();
      a = jf(a, 1);
      a !== null && (pb(a, 1, b), Z(a, b));
    }
    function se(a, b) {
      if (a.tag === 3)
        Cf(a, a, b);
      else
        for (var c = a.return; c !== null; ) {
          if (c.tag === 3) {
            Cf(c, a, b);
            break;
          } else if (c.tag === 1) {
            var d = c.stateNode;
            if (typeof c.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (pe === null || !pe.has(d))) {
              a = he(b, a);
              var e = oe(c, a, 1);
              hc(c, e);
              e = oc();
              c = jf(c, 1);
              if (c !== null)
                pb(c, 1, e), Z(c, e);
              else if (typeof d.componentDidCatch === "function" && (pe === null || !pe.has(d)))
                try {
                  d.componentDidCatch(b, a);
                } catch (f) {
                }
              break;
            }
          }
          c = c.return;
        }
    }
    function uf(a, b, c) {
      var d = a.pingCache;
      d !== null && d.delete(b);
      b = oc();
      a.pingedLanes |= a.suspendedLanes & c;
      R === a && (U & c) === c && (T === 4 || T === 3 && (U & 62914560) === U && 500 > G() - Ge ? of(a, 0) : Ue |= c);
      Z(a, b);
    }
    function Ie(a, b) {
      var c = a.stateNode;
      c !== null && c.delete(b);
      b = 0;
      b === 0 && (b = a.mode, (b & 2) === 0 ? b = 1 : (b & 4) === 0 ? b = Lb() === 99 ? 1 : 2 : (ef === 0 && (ef = Te), b = nb(62914560 & ~ef), b === 0 && (b = 4194304)));
      c = oc();
      a = jf(a, b);
      a !== null && (pb(a, b, c), Z(a, c));
    }
    var yf;
    yf = function(a, b, c) {
      var d = b.lanes;
      if (a !== null)
        if (a.memoizedProps !== b.pendingProps || D.current)
          J = true;
        else if ((c & d) !== 0)
          J = (a.flags & 16384) !== 0 ? true : false;
        else {
          J = false;
          switch (b.tag) {
            case 3:
              Nd(b);
              break;
            case 5:
              Oc(b);
              break;
            case 1:
              E(b.type) && bb(b);
              break;
            case 4:
              Mc(b, b.stateNode.containerInfo);
              break;
            case 10:
              d = b.memoizedProps.value;
              var e = b.type._context;
              B(Wb, e._currentValue2);
              e._currentValue2 = d;
              break;
            case 13:
              if (b.memoizedState !== null) {
                if ((c & b.child.childLanes) !== 0)
                  return Pd(a, b, c);
                B(L, L.current & 1);
                b = Dd(a, b, c);
                return b !== null ? b.sibling : null;
              }
              B(L, L.current & 1);
              break;
            case 19:
              d = (c & b.childLanes) !== 0;
              if ((a.flags & 64) !== 0) {
                if (d)
                  return Wd(a, b, c);
                b.flags |= 64;
              }
              e = b.memoizedState;
              e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null);
              B(L, L.current);
              if (d)
                break;
              else
                return null;
            case 23:
            case 24:
              return b.lanes = 0, Id(a, b, c);
          }
          return Dd(a, b, c);
        }
      else
        J = false;
      b.lanes = 0;
      switch (b.tag) {
        case 2:
          d = b.type;
          a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
          a = b.pendingProps;
          e = Ya(b, C.current);
          cc(b, c);
          e = Zc(null, b, d, a, e, c);
          b.flags |= 1;
          if (typeof e === "object" && e !== null && typeof e.render === "function" && e.$$typeof === void 0) {
            b.tag = 1;
            b.memoizedState = null;
            b.updateQueue = null;
            if (E(d)) {
              var f = true;
              bb(b);
            } else
              f = false;
            b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null;
            ec(b);
            var h = d.getDerivedStateFromProps;
            typeof h === "function" && nc(b, d, h, a);
            e.updater = rc;
            b.stateNode = e;
            e._reactInternals = b;
            vc(b, d, a, c);
            b = Md(null, b, d, true, f, c);
          } else
            b.tag = 0, S(null, b, e, c), b = b.child;
          return b;
        case 16:
          e = b.elementType;
          a: {
            a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
            a = b.pendingProps;
            f = e._init;
            e = f(e._payload);
            b.type = e;
            f = b.tag = Df(e);
            a = I(e, a);
            switch (f) {
              case 0:
                b = Hd(null, b, e, a, c);
                break a;
              case 1:
                b = Ld(null, b, e, a, c);
                break a;
              case 11:
                b = Cd(null, b, e, a, c);
                break a;
              case 14:
                b = Ed(null, b, e, I(e.type, a), d, c);
                break a;
            }
            throw Error(q(306, e, ""));
          }
          return b;
        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : I(d, e), Hd(a, b, d, e, c);
        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : I(d, e), Ld(a, b, d, e, c);
        case 3:
          Nd(b);
          d = b.updateQueue;
          if (a === null || d === null)
            throw Error(q(282));
          d = b.pendingProps;
          e = b.memoizedState;
          e = e !== null ? e.element : null;
          fc(a, b);
          jc(b, d, null, c);
          d = b.memoizedState.element;
          d === e ? b = Dd(a, b, c) : (S(a, b, d, c), b = b.child);
          return b;
        case 5:
          return Oc(b), d = b.pendingProps.children, Kd(a, b), S(a, b, d, c), b.child;
        case 6:
          return null;
        case 13:
          return Pd(a, b, c);
        case 4:
          return Mc(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = Fc(b, null, d, c) : S(a, b, d, c), b.child;
        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : I(d, e), Cd(a, b, d, e, c);
        case 7:
          return S(a, b, b.pendingProps, c), b.child;
        case 8:
          return S(a, b, b.pendingProps.children, c), b.child;
        case 12:
          return S(a, b, b.pendingProps.children, c), b.child;
        case 10:
          a: {
            d = b.type._context;
            e = b.pendingProps;
            h = b.memoizedProps;
            f = e.value;
            var g = b.type._context;
            B(Wb, g._currentValue2);
            g._currentValue2 = f;
            if (h !== null)
              if (g = h.value, f = H(g, f) ? 0 : (typeof d._calculateChangedBits === "function" ? d._calculateChangedBits(g, f) : 1073741823) | 0, f === 0) {
                if (h.children === e.children && !D.current) {
                  b = Dd(a, b, c);
                  break a;
                }
              } else
                for (g = b.child, g !== null && (g.return = b); g !== null; ) {
                  var k = g.dependencies;
                  if (k !== null) {
                    h = g.child;
                    for (var l = k.firstContext; l !== null; ) {
                      if (l.context === d && (l.observedBits & f) !== 0) {
                        g.tag === 1 && (l = gc(-1, c & -c), l.tag = 2, hc(g, l));
                        g.lanes |= c;
                        l = g.alternate;
                        l !== null && (l.lanes |= c);
                        bc(g.return, c);
                        k.lanes |= c;
                        break;
                      }
                      l = l.next;
                    }
                  } else
                    h = g.tag === 10 ? g.type === b.type ? null : g.child : g.child;
                  if (h !== null)
                    h.return = g;
                  else
                    for (h = g; h !== null; ) {
                      if (h === b) {
                        h = null;
                        break;
                      }
                      g = h.sibling;
                      if (g !== null) {
                        g.return = h.return;
                        h = g;
                        break;
                      }
                      h = h.return;
                    }
                  g = h;
                }
            S(a, b, e.children, c);
            b = b.child;
          }
          return b;
        case 9:
          return e = b.type, f = b.pendingProps, d = f.children, cc(b, c), e = K(e, f.unstable_observedBits), d = d(e), b.flags |= 1, S(a, b, d, c), b.child;
        case 14:
          return e = b.type, f = I(e, b.pendingProps), f = I(e.type, f), Ed(a, b, e, f, d, c);
        case 15:
          return Gd(a, b, b.type, b.pendingProps, d, c);
        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : I(d, e), a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, E(d) ? (a = true, bb(b)) : a = false, cc(b, c), tc(b, d, e), vc(b, d, e, c), Md(null, b, d, true, a, c);
        case 19:
          return Wd(a, b, c);
        case 23:
          return Id(a, b, c);
        case 24:
          return Id(a, b, c);
      }
      throw Error(q(156, b.tag));
    };
    var Hf = n.unstable_flushAllWithoutAsserting;
    var If = typeof Hf === "function";
    function Jf() {
      if (Hf !== void 0)
        return Hf();
      for (var a = false; mf(); )
        a = true;
      return a;
    }
    function Kf(a) {
      try {
        Jf(), Le(function() {
          Jf() ? Kf(a) : a();
        });
      } catch (b) {
        a(b);
      }
    }
    var Lf = 0;
    var Mf = false;
    function Nf(a, b, c, d) {
      this.tag = a;
      this.key = c;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.flags = 0;
      this.lastEffect = this.firstEffect = this.nextEffect = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function Of(a, b, c, d) {
      return new Nf(a, b, c, d);
    }
    function Fd(a) {
      a = a.prototype;
      return !(!a || !a.isReactComponent);
    }
    function Df(a) {
      if (typeof a === "function")
        return Fd(a) ? 1 : 0;
      if (a !== void 0 && a !== null) {
        a = a.$$typeof;
        if (a === oa)
          return 11;
        if (a === ra)
          return 14;
      }
      return 2;
    }
    function Ac(a, b) {
      var c = a.alternate;
      c === null ? (c = Of(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
      c.childLanes = a.childLanes;
      c.lanes = a.lanes;
      c.child = a.child;
      c.memoizedProps = a.memoizedProps;
      c.memoizedState = a.memoizedState;
      c.updateQueue = a.updateQueue;
      b = a.dependencies;
      c.dependencies = b === null ? null : { lanes: b.lanes, firstContext: b.firstContext };
      c.sibling = a.sibling;
      c.index = a.index;
      c.ref = a.ref;
      return c;
    }
    function Cc(a, b, c, d, e, f) {
      var h = 2;
      d = a;
      if (typeof a === "function")
        Fd(a) && (h = 1);
      else if (typeof a === "string")
        h = 5;
      else
        a:
          switch (a) {
            case ja:
              return Ec(c.children, e, f, b);
            case ua:
              h = 8;
              e |= 16;
              break;
            case ka:
              h = 8;
              e |= 1;
              break;
            case la:
              return a = Of(12, c, b, e | 8), a.elementType = la, a.type = la, a.lanes = f, a;
            case pa:
              return a = Of(13, c, b, e), a.type = pa, a.elementType = pa, a.lanes = f, a;
            case qa:
              return a = Of(19, c, b, e), a.elementType = qa, a.lanes = f, a;
            case va:
              return Rd(c, e, f, b);
            case wa:
              return a = Of(24, c, b, e), a.elementType = wa, a.lanes = f, a;
            default:
              if (typeof a === "object" && a !== null)
                switch (a.$$typeof) {
                  case ma:
                    h = 10;
                    break a;
                  case na:
                    h = 9;
                    break a;
                  case oa:
                    h = 11;
                    break a;
                  case ra:
                    h = 14;
                    break a;
                  case sa:
                    h = 16;
                    d = null;
                    break a;
                  case ta:
                    h = 22;
                    break a;
                }
              throw Error(q(130, a == null ? a : typeof a, ""));
          }
      b = Of(h, c, b, e);
      b.elementType = a;
      b.type = d;
      b.lanes = f;
      return b;
    }
    function Ec(a, b, c, d) {
      a = Of(7, a, d, b);
      a.lanes = c;
      return a;
    }
    function Rd(a, b, c, d) {
      a = Of(23, a, d, b);
      a.elementType = va;
      a.lanes = c;
      return a;
    }
    function Bc(a, b, c) {
      a = Of(6, a, null, b);
      a.lanes = c;
      return a;
    }
    function Dc(a, b, c) {
      b = Of(4, a.children !== null ? a.children : [], a.key, b);
      b.lanes = c;
      b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
      return b;
    }
    function Pf(a, b, c) {
      this.tag = b;
      this.containerInfo = a;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.pendingContext = this.context = null;
      this.hydrate = c;
      this.callbackNode = null;
      this.callbackPriority = 0;
      this.eventTimes = ob(0);
      this.expirationTimes = ob(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = ob(0);
    }
    function Qf(a, b, c) {
      a = new Pf(a, b, c);
      b = Of(3, null, null, b === 2 ? 7 : b === 1 ? 3 : 0);
      a.current = b;
      b.stateNode = a;
      ec(b);
      return a;
    }
    function Rf(a, b, c, d) {
      var e = b.current, f = oc(), h = pc(e);
      a:
        if (c) {
          c = c._reactInternals;
          b: {
            if (Ba(c) !== c || c.tag !== 1)
              throw Error(q(170));
            var g = c;
            do {
              switch (g.tag) {
                case 3:
                  g = g.stateNode.context;
                  break b;
                case 1:
                  if (E(g.type)) {
                    g = g.stateNode.__reactInternalMemoizedMergedChildContext;
                    break b;
                  }
              }
              g = g.return;
            } while (g !== null);
            throw Error(q(171));
          }
          if (c.tag === 1) {
            var k = c.type;
            if (E(k)) {
              c = ab(c, k, g);
              break a;
            }
          }
          c = g;
        } else
          c = Wa;
      b.context === null ? b.context = c : b.pendingContext = c;
      b = gc(f, h);
      b.payload = { element: a };
      d = d === void 0 ? null : d;
      d !== null && (b.callback = d);
      hc(e, b);
      qc(e, h, f);
      return h;
    }
    function Sf() {
      return null;
    }
    var Tf = fa.IsSomeRendererActing;
    var Uf = { createNodeMock: function() {
      return null;
    } };
    function Vf(a) {
      if (a.isHidden)
        return null;
      switch (a.tag) {
        case "TEXT":
          return a.text;
        case "INSTANCE":
          var b = a.props;
          var c = ["children"];
          if (b == null)
            b = {};
          else {
            var d = {}, e = Object.keys(b), f;
            for (f = 0; f < e.length; f++) {
              var h = e[f];
              0 <= c.indexOf(h) || (d[h] = b[h]);
            }
            b = d;
          }
          c = null;
          if (a.children && a.children.length)
            for (d = 0; d < a.children.length; d++)
              e = Vf(a.children[d]), e !== null && (c === null ? c = [e] : c.push(e));
          a = { type: a.type, props: b, children: c };
          Object.defineProperty(a, "$$typeof", { value: Symbol.for("react.test.json") });
          return a;
        default:
          throw Error("Unexpected node type in toJSON: " + a.tag);
      }
    }
    function Wf(a) {
      if (!a)
        return null;
      a = Xf(a);
      return a.length === 0 ? null : a.length === 1 ? Yf(a[0]) : Zf(a.map(Yf));
    }
    function Xf(a) {
      for (var b = []; a != null; )
        b.push(a), a = a.sibling;
      return b;
    }
    function Zf(a) {
      var b = [];
      for (a = [{ i: 0, array: a }]; a.length; )
        for (var c = a.pop(); c.i < c.array.length; ) {
          var d = c.array[c.i];
          c.i += 1;
          if (Array.isArray(d)) {
            a.push(c);
            a.push({ i: 0, array: d });
            break;
          }
          b.push(d);
        }
      return b;
    }
    function Yf(a) {
      if (a == null)
        return null;
      switch (a.tag) {
        case 3:
          return Wf(a.child);
        case 4:
          return Wf(a.child);
        case 1:
          return { nodeType: "component", type: a.type, props: aa({}, a.memoizedProps), instance: a.stateNode, rendered: Wf(a.child) };
        case 0:
        case 15:
          return { nodeType: "component", type: a.type, props: aa({}, a.memoizedProps), instance: null, rendered: Wf(a.child) };
        case 22:
          return { nodeType: "block", type: a.type, props: aa({}, a.memoizedProps), instance: null, rendered: Wf(a.child) };
        case 5:
          return { nodeType: "host", type: a.type, props: aa({}, a.memoizedProps), instance: null, rendered: Zf(Xf(a.child).map(Yf)) };
        case 6:
          return a.stateNode.text;
        case 7:
        case 10:
        case 9:
        case 8:
        case 12:
        case 11:
        case 14:
        case 17:
        case 21:
          return Wf(a.child);
        default:
          throw Error(q(214, a.tag));
      }
    }
    var $f = /* @__PURE__ */ new Set([0, 1, 5, 11, 14, 15, 22, 3]);
    function ag(a) {
      var b = [], c = a;
      if (c.child === null)
        return b;
      c.child.return = c;
      c = c.child;
      a:
        for (; ; ) {
          var d = false;
          $f.has(c.tag) ? b.push(bg(c)) : c.tag === 6 ? b.push("" + c.memoizedProps) : d = true;
          if (d && c.child !== null)
            c.child.return = c, c = c.child;
          else {
            for (; c.sibling === null; ) {
              if (c.return === a)
                break a;
              c = c.return;
            }
            c.sibling.return = c.return;
            c = c.sibling;
          }
        }
      return b;
    }
    var eg = function() {
      function a(a2) {
        if (!$f.has(a2.tag))
          throw Error(q(225, a2.tag));
        this._fiber = a2;
      }
      var b = a.prototype;
      b._currentFiber = function() {
        var a2 = Da(this._fiber);
        if (a2 === null)
          throw Error(q(224));
        return a2;
      };
      b.find = function(a2) {
        return cg(this.findAll(a2, { deep: false }), "matching custom predicate: " + a2.toString());
      };
      b.findByType = function(a2) {
        return cg(this.findAllByType(a2, { deep: false }), 'with node type: "' + (za(a2) || "Unknown") + '"');
      };
      b.findByProps = function(a2) {
        return cg(this.findAllByProps(a2, { deep: false }), "with props: " + JSON.stringify(a2));
      };
      b.findAll = function(a2) {
        return dg(this, a2, 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : null);
      };
      b.findAllByType = function(a2) {
        return dg(this, function(b2) {
          return b2.type === a2;
        }, 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : null);
      };
      b.findAllByProps = function(a2) {
        return dg(this, function(b2) {
          var c;
          if (c = b2.props)
            a: {
              for (var d in a2)
                if (b2.props[d] !== a2[d]) {
                  c = false;
                  break a;
                }
              c = true;
            }
          return c;
        }, 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : null);
      };
      ea(a, [{ key: "instance", get: function() {
        return this._fiber.tag === 5 ? Ja(this._fiber.stateNode) : this._fiber.stateNode;
      } }, { key: "type", get: function() {
        return this._fiber.type;
      } }, { key: "props", get: function() {
        return this._currentFiber().memoizedProps;
      } }, { key: "parent", get: function() {
        for (var a2 = this._fiber.return; a2 !== null; ) {
          if ($f.has(a2.tag)) {
            if (a2.tag === 3 && 2 > ag(a2).length)
              break;
            return bg(a2);
          }
          a2 = a2.return;
        }
        return null;
      } }, { key: "children", get: function() {
        return ag(this._currentFiber());
      } }]);
      return a;
    }();
    function dg(a, b, c) {
      var d = c ? c.deep : true, e = [];
      if (b(a) && (e.push(a), !d))
        return e;
      a.children.forEach(function(a2) {
        typeof a2 !== "string" && e.push.apply(e, dg(a2, b, c));
      });
      return e;
    }
    function cg(a, b) {
      if (a.length === 1)
        return a[0];
      throw Error((a.length === 0 ? "No instances found " : "Expected 1 but found " + a.length + " instances ") + b);
    }
    var fg = /* @__PURE__ */ new WeakMap();
    function bg(a) {
      var b = fg.get(a);
      b === void 0 && a.alternate !== null && (b = fg.get(a.alternate));
      b === void 0 && (b = new eg(a), fg.set(a, b));
      return b;
    }
    var gg = { findFiberByHostInstance: function() {
      throw Error("TestRenderer does not support findFiberByHostInstance()");
    }, bundleType: 0, version: "17.0.2", rendererPackageName: "react-test-renderer" };
    var hg = { bundleType: gg.bundleType, version: gg.version, rendererPackageName: gg.rendererPackageName, rendererConfig: gg.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: fa.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
      a = Ea(a);
      return a === null ? null : a.stateNode;
    }, findFiberByHostInstance: gg.findFiberByHostInstance || Sf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      ig = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!ig.isDisabled && ig.supportsFiber)
        try {
          db = ig.inject(hg), eb = ig;
        } catch (a) {
        }
    }
    var ig;
    function jg(a, b) {
      jest.runOnlyPendingTimers();
      Le(function() {
        try {
          ba.unstable_flushAllWithoutAsserting() ? jg(a, b) : a();
        } catch (c) {
          b(c);
        }
      });
    }
    exports._Scheduler = ba;
    exports.act = function(a) {
      function b() {
        Lf--;
        Pe.current = c;
      }
      Mf === false && (Mf = true, console.error("act(...) is not supported in production builds of React, and might not behave as expected."));
      Lf++;
      var c = Pe.current;
      Pe.current = true;
      try {
        var d = tf(a);
      } catch (e) {
        throw b(), e;
      }
      if (d !== null && typeof d === "object" && typeof d.then === "function")
        return { then: function(a2, f) {
          d.then(function() {
            1 < Lf || If === true && c === true ? (b(), a2()) : Kf(function(c2) {
              b();
              c2 ? f(c2) : a2();
            });
          }, function(a3) {
            b();
            f(a3);
          });
        } };
      try {
        Lf !== 1 || If !== false && c !== false || Jf(), b();
      } catch (e) {
        throw b(), e;
      }
      return { then: function(a2) {
        a2();
      } };
    };
    exports.create = function(a, b) {
      var c = Uf.createNodeMock, d = false;
      typeof b === "object" && b !== null && (typeof b.createNodeMock === "function" && (c = b.createNodeMock), b.unstable_isConcurrent === true && (d = true));
      var e = { children: [], createNodeMock: c, tag: "CONTAINER" }, f = Qf(e, d ? 2 : 0, false);
      if (f == null)
        throw Error(q(215));
      Rf(a, f, null, null);
      a = { _Scheduler: ba, root: void 0, toJSON: function() {
        if (f == null || f.current == null || e == null || e.children.length === 0)
          return null;
        if (e.children.length === 1)
          return Vf(e.children[0]);
        if (e.children.length === 2 && e.children[0].isHidden === true && e.children[1].isHidden === false)
          return Vf(e.children[1]);
        var a2 = null;
        if (e.children && e.children.length)
          for (var b2 = 0; b2 < e.children.length; b2++) {
            var c2 = Vf(e.children[b2]);
            c2 !== null && (a2 === null ? a2 = [c2] : a2.push(c2));
          }
        return a2;
      }, toTree: function() {
        return f == null || f.current == null ? null : Yf(f.current);
      }, update: function(a2) {
        f != null && f.current != null && Rf(a2, f, null, null);
      }, unmount: function() {
        f != null && f.current != null && (Rf(null, f, null, null), f = e = null);
      }, getInstance: function() {
        if (f == null || f.current == null)
          return null;
        a: {
          var a2 = f.current;
          if (a2.child)
            switch (a2.child.tag) {
              case 5:
                a2 = Ja(a2.child.stateNode);
                break a;
              default:
                a2 = a2.child.stateNode;
            }
          else
            a2 = null;
        }
        return a2;
      }, unstable_flushSync: function(a2) {
        a: {
          var b2 = W;
          if ((b2 & 48) !== 0)
            var c2 = a2(void 0);
          else {
            W |= 1;
            try {
              c2 = a2 ? Nb(99, a2.bind(null, void 0)) : void 0;
              break a;
            } finally {
              W = b2, Pb();
            }
            c2 = void 0;
          }
        }
        return c2;
      } };
      Object.defineProperty(a, "root", { configurable: true, enumerable: true, get: function() {
        if (f === null)
          throw Error("Can't access .root on unmounted test renderer");
        var a2 = ag(f.current);
        if (a2.length === 0)
          throw Error("Can't access .root on unmounted test renderer");
        return a2.length === 1 ? a2[0] : bg(f.current);
      } });
      return a;
    };
    exports.unstable_batchedUpdates = tf;
    exports.unstable_concurrentAct = function(a) {
      if (ba.unstable_flushAllWithoutAsserting === void 0)
        throw Error("This version of `act` requires a special mock build of Scheduler.");
      if (setTimeout._isMockFunction !== true)
        throw Error("This version of `act` requires Jest's timer mocks (i.e. jest.useFakeTimers).");
      var b = Tf.current;
      Tf.current = true;
      try {
        var c = tf(a);
        if (typeof c === "object" && c !== null && typeof c.then === "function")
          return { then: function(a2, d2) {
            c.then(function() {
              jg(function() {
                Tf.current = b;
                a2();
              }, function(a3) {
                Tf.current = b;
                d2(a3);
              });
            }, function(a3) {
              Tf.current = b;
              d2(a3);
            });
          } };
        try {
          do
            var d = ba.unstable_flushAllWithoutAsserting();
          while (d);
        } finally {
          Tf.current = b;
        }
      } catch (e) {
        throw Tf.current = b, e;
      }
    };
  }
});

// node_modules/scheduler/cjs/scheduler-tracing.production.min.js
var require_scheduler_tracing_production_min = __commonJS({
  "node_modules/scheduler/cjs/scheduler-tracing.production.min.js"(exports) {
    "use strict";
    init_cjs_shims();
    var b = 0;
    exports.__interactionsRef = null;
    exports.__subscriberRef = null;
    exports.unstable_clear = function(a) {
      return a();
    };
    exports.unstable_getCurrent = function() {
      return null;
    };
    exports.unstable_getThreadID = function() {
      return ++b;
    };
    exports.unstable_subscribe = function() {
    };
    exports.unstable_trace = function(a, d, c) {
      return c();
    };
    exports.unstable_unsubscribe = function() {
    };
    exports.unstable_wrap = function(a) {
      return a;
    };
  }
});

// node_modules/scheduler/cjs/scheduler-tracing.development.js
var require_scheduler_tracing_development = __commonJS({
  "node_modules/scheduler/cjs/scheduler-tracing.development.js"(exports) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var DEFAULT_THREAD_ID = 0;
        var interactionIDCounter = 0;
        var threadIDCounter = 0;
        exports.__interactionsRef = null;
        exports.__subscriberRef = null;
        {
          exports.__interactionsRef = {
            current: /* @__PURE__ */ new Set()
          };
          exports.__subscriberRef = {
            current: null
          };
        }
        function unstable_clear(callback) {
          var prevInteractions = exports.__interactionsRef.current;
          exports.__interactionsRef.current = /* @__PURE__ */ new Set();
          try {
            return callback();
          } finally {
            exports.__interactionsRef.current = prevInteractions;
          }
        }
        function unstable_getCurrent() {
          {
            return exports.__interactionsRef.current;
          }
        }
        function unstable_getThreadID() {
          return ++threadIDCounter;
        }
        function unstable_trace(name, timestamp, callback) {
          var threadID = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_THREAD_ID;
          var interaction = {
            __count: 1,
            id: interactionIDCounter++,
            name,
            timestamp
          };
          var prevInteractions = exports.__interactionsRef.current;
          var interactions = new Set(prevInteractions);
          interactions.add(interaction);
          exports.__interactionsRef.current = interactions;
          var subscriber = exports.__subscriberRef.current;
          var returnValue;
          try {
            if (subscriber !== null) {
              subscriber.onInteractionTraced(interaction);
            }
          } finally {
            try {
              if (subscriber !== null) {
                subscriber.onWorkStarted(interactions, threadID);
              }
            } finally {
              try {
                returnValue = callback();
              } finally {
                exports.__interactionsRef.current = prevInteractions;
                try {
                  if (subscriber !== null) {
                    subscriber.onWorkStopped(interactions, threadID);
                  }
                } finally {
                  interaction.__count--;
                  if (subscriber !== null && interaction.__count === 0) {
                    subscriber.onInteractionScheduledWorkCompleted(interaction);
                  }
                }
              }
            }
          }
          return returnValue;
        }
        function unstable_wrap(callback) {
          var threadID = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_THREAD_ID;
          var wrappedInteractions = exports.__interactionsRef.current;
          var subscriber = exports.__subscriberRef.current;
          if (subscriber !== null) {
            subscriber.onWorkScheduled(wrappedInteractions, threadID);
          }
          wrappedInteractions.forEach(function(interaction) {
            interaction.__count++;
          });
          var hasRun = false;
          function wrapped() {
            var prevInteractions = exports.__interactionsRef.current;
            exports.__interactionsRef.current = wrappedInteractions;
            subscriber = exports.__subscriberRef.current;
            try {
              var returnValue;
              try {
                if (subscriber !== null) {
                  subscriber.onWorkStarted(wrappedInteractions, threadID);
                }
              } finally {
                try {
                  returnValue = callback.apply(void 0, arguments);
                } finally {
                  exports.__interactionsRef.current = prevInteractions;
                  if (subscriber !== null) {
                    subscriber.onWorkStopped(wrappedInteractions, threadID);
                  }
                }
              }
              return returnValue;
            } finally {
              if (!hasRun) {
                hasRun = true;
                wrappedInteractions.forEach(function(interaction) {
                  interaction.__count--;
                  if (subscriber !== null && interaction.__count === 0) {
                    subscriber.onInteractionScheduledWorkCompleted(interaction);
                  }
                });
              }
            }
          }
          wrapped.cancel = function cancel() {
            subscriber = exports.__subscriberRef.current;
            try {
              if (subscriber !== null) {
                subscriber.onWorkCanceled(wrappedInteractions, threadID);
              }
            } finally {
              wrappedInteractions.forEach(function(interaction) {
                interaction.__count--;
                if (subscriber && interaction.__count === 0) {
                  subscriber.onInteractionScheduledWorkCompleted(interaction);
                }
              });
            }
          };
          return wrapped;
        }
        var subscribers = null;
        {
          subscribers = /* @__PURE__ */ new Set();
        }
        function unstable_subscribe(subscriber) {
          {
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
              exports.__subscriberRef.current = {
                onInteractionScheduledWorkCompleted,
                onInteractionTraced,
                onWorkCanceled,
                onWorkScheduled,
                onWorkStarted,
                onWorkStopped
              };
            }
          }
        }
        function unstable_unsubscribe(subscriber) {
          {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
              exports.__subscriberRef.current = null;
            }
          }
        }
        function onInteractionTraced(interaction) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onInteractionTraced(interaction);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onInteractionScheduledWorkCompleted(interaction) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkScheduled(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkScheduled(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkStarted(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkStarted(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkStopped(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkStopped(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkCanceled(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkCanceled(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        exports.unstable_clear = unstable_clear;
        exports.unstable_getCurrent = unstable_getCurrent;
        exports.unstable_getThreadID = unstable_getThreadID;
        exports.unstable_subscribe = unstable_subscribe;
        exports.unstable_trace = unstable_trace;
        exports.unstable_unsubscribe = unstable_unsubscribe;
        exports.unstable_wrap = unstable_wrap;
      })();
    }
  }
});

// node_modules/scheduler/tracing.js
var require_tracing = __commonJS({
  "node_modules/scheduler/tracing.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_scheduler_tracing_production_min();
    } else {
      module2.exports = require_scheduler_tracing_development();
    }
  }
});

// node_modules/react-test-renderer/cjs/react-test-renderer.development.js
var require_react_test_renderer_development = __commonJS({
  "node_modules/react-test-renderer/cjs/react-test-renderer.development.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React3 = require_react();
        var _assign = require_object_assign();
        var Scheduler = require_unstable_mock();
        var Scheduler$1 = require_scheduler();
        var tracing = require_tracing();
        var ReactSharedInternals = React3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
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
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null)
            return {};
          var target = {};
          var sourceKeys = Object.keys(source);
          var key, i;
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0)
              continue;
            target[key] = source[key];
          }
          return target;
        }
        var FunctionComponent = 0;
        var ClassComponent = 1;
        var IndeterminateComponent = 2;
        var HostRoot = 3;
        var HostPortal = 4;
        var HostComponent = 5;
        var HostText = 6;
        var Fragment = 7;
        var Mode = 8;
        var ContextConsumer = 9;
        var ContextProvider = 10;
        var ForwardRef = 11;
        var Profiler = 12;
        var SuspenseComponent = 13;
        var MemoComponent = 14;
        var SimpleMemoComponent = 15;
        var LazyComponent = 16;
        var IncompleteClassComponent = 17;
        var DehydratedFragment = 18;
        var SuspenseListComponent = 19;
        var FundamentalComponent = 20;
        var ScopeComponent = 21;
        var Block = 22;
        var OffscreenComponent = 23;
        var LegacyHiddenComponent = 24;
        function get(key) {
          return key._reactInternals;
        }
        function set(key, value) {
          key._reactInternals = value;
        }
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
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
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
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
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
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
        var NoFlags = 0;
        var PerformedWork = 1;
        var Placement = 2;
        var Update = 4;
        var PlacementAndUpdate = 6;
        var Deletion = 8;
        var ContentReset = 16;
        var Callback = 32;
        var DidCapture = 64;
        var Ref = 128;
        var Snapshot = 256;
        var Passive = 512;
        var PassiveUnmountPendingDev = 8192;
        var Hydrating = 1024;
        var HydratingAndUpdate = 1028;
        var LifecycleEffectMask = 932;
        var HostEffectMask = 2047;
        var Incomplete = 2048;
        var ShouldCapture = 4096;
        var ForceUpdateForLegacySuspense = 16384;
        var enableProfilerTimer = true;
        var enableFundamentalAPI = false;
        var warnAboutStringRefs = false;
        var enableNewReconciler = false;
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        function getNearestMountedFiber(fiber) {
          var node = fiber;
          var nearestMounted = fiber;
          if (!fiber.alternate) {
            var nextNode = node;
            do {
              node = nextNode;
              if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
                nearestMounted = node.return;
              }
              nextNode = node.return;
            } while (nextNode);
          } else {
            while (node.return) {
              node = node.return;
            }
          }
          if (node.tag === HostRoot) {
            return nearestMounted;
          }
          return null;
        }
        function isFiberMounted(fiber) {
          return getNearestMountedFiber(fiber) === fiber;
        }
        function isMounted(component) {
          {
            var owner = ReactCurrentOwner.current;
            if (owner !== null && owner.tag === ClassComponent) {
              var ownerFiber = owner;
              var instance = ownerFiber.stateNode;
              if (!instance._warnedAboutRefsInRender) {
                error("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", getComponentName(ownerFiber.type) || "A component");
              }
              instance._warnedAboutRefsInRender = true;
            }
          }
          var fiber = get(component);
          if (!fiber) {
            return false;
          }
          return getNearestMountedFiber(fiber) === fiber;
        }
        function assertIsMounted(fiber) {
          if (!(getNearestMountedFiber(fiber) === fiber)) {
            {
              throw Error("Unable to find node on an unmounted component.");
            }
          }
        }
        function findCurrentFiberUsingSlowPath(fiber) {
          var alternate = fiber.alternate;
          if (!alternate) {
            var nearestMounted = getNearestMountedFiber(fiber);
            if (!(nearestMounted !== null)) {
              {
                throw Error("Unable to find node on an unmounted component.");
              }
            }
            if (nearestMounted !== fiber) {
              return null;
            }
            return fiber;
          }
          var a = fiber;
          var b = alternate;
          while (true) {
            var parentA = a.return;
            if (parentA === null) {
              break;
            }
            var parentB = parentA.alternate;
            if (parentB === null) {
              var nextParent = parentA.return;
              if (nextParent !== null) {
                a = b = nextParent;
                continue;
              }
              break;
            }
            if (parentA.child === parentB.child) {
              var child = parentA.child;
              while (child) {
                if (child === a) {
                  assertIsMounted(parentA);
                  return fiber;
                }
                if (child === b) {
                  assertIsMounted(parentA);
                  return alternate;
                }
                child = child.sibling;
              }
              {
                {
                  throw Error("Unable to find node on an unmounted component.");
                }
              }
            }
            if (a.return !== b.return) {
              a = parentA;
              b = parentB;
            } else {
              var didFindChild = false;
              var _child = parentA.child;
              while (_child) {
                if (_child === a) {
                  didFindChild = true;
                  a = parentA;
                  b = parentB;
                  break;
                }
                if (_child === b) {
                  didFindChild = true;
                  b = parentA;
                  a = parentB;
                  break;
                }
                _child = _child.sibling;
              }
              if (!didFindChild) {
                _child = parentB.child;
                while (_child) {
                  if (_child === a) {
                    didFindChild = true;
                    a = parentB;
                    b = parentA;
                    break;
                  }
                  if (_child === b) {
                    didFindChild = true;
                    b = parentB;
                    a = parentA;
                    break;
                  }
                  _child = _child.sibling;
                }
                if (!didFindChild) {
                  {
                    throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
                  }
                }
              }
            }
            if (!(a.alternate === b)) {
              {
                throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          if (!(a.tag === HostRoot)) {
            {
              throw Error("Unable to find node on an unmounted component.");
            }
          }
          if (a.stateNode.current === a) {
            return fiber;
          }
          return alternate;
        }
        function findCurrentHostFiber(parent) {
          var currentParent = findCurrentFiberUsingSlowPath(parent);
          if (!currentParent) {
            return null;
          }
          var node = currentParent;
          while (true) {
            if (node.tag === HostComponent || node.tag === HostText) {
              return node;
            } else if (node.child) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === currentParent) {
              return null;
            }
            while (!node.sibling) {
              if (!node.return || node.return === currentParent) {
                return null;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
          return null;
        }
        function doesFiberContain(parentFiber, childFiber) {
          var node = childFiber;
          var parentFiberAlternate = parentFiber.alternate;
          while (node !== null) {
            if (node === parentFiber || node === parentFiberAlternate) {
              return true;
            }
            node = node.return;
          }
          return false;
        }
        function shim() {
          {
            {
              throw Error("The current renderer does not support hydration. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        var isSuspenseInstancePending = shim;
        var isSuspenseInstanceFallback = shim;
        var hydrateTextInstance = shim;
        var NO_CONTEXT = {};
        var UPDATE_SIGNAL = {};
        var nodeToInstanceMap = /* @__PURE__ */ new WeakMap();
        {
          Object.freeze(NO_CONTEXT);
          Object.freeze(UPDATE_SIGNAL);
        }
        function getPublicInstance(inst) {
          switch (inst.tag) {
            case "INSTANCE":
              var createNodeMock = inst.rootContainerInstance.createNodeMock;
              var mockNode = createNodeMock({
                type: inst.type,
                props: inst.props
              });
              if (typeof mockNode === "object" && mockNode !== null) {
                nodeToInstanceMap.set(mockNode, inst);
              }
              return mockNode;
            default:
              return inst;
          }
        }
        function appendChild(parentInstance, child) {
          {
            if (!Array.isArray(parentInstance.children)) {
              error("An invalid container has been provided. This may indicate that another renderer is being used in addition to the test renderer. (For example, ReactDOM.createPortal inside of a ReactTestRenderer tree.) This is not supported.");
            }
          }
          var index2 = parentInstance.children.indexOf(child);
          if (index2 !== -1) {
            parentInstance.children.splice(index2, 1);
          }
          parentInstance.children.push(child);
        }
        function insertBefore(parentInstance, child, beforeChild) {
          var index2 = parentInstance.children.indexOf(child);
          if (index2 !== -1) {
            parentInstance.children.splice(index2, 1);
          }
          var beforeIndex = parentInstance.children.indexOf(beforeChild);
          parentInstance.children.splice(beforeIndex, 0, child);
        }
        function removeChild(parentInstance, child) {
          var index2 = parentInstance.children.indexOf(child);
          parentInstance.children.splice(index2, 1);
        }
        function clearContainer(container) {
          container.children.splice(0);
        }
        function getRootHostContext(rootContainerInstance) {
          return NO_CONTEXT;
        }
        function getChildHostContext(parentHostContext, type, rootContainerInstance) {
          return NO_CONTEXT;
        }
        function prepareForCommit(containerInfo) {
          return null;
        }
        function resetAfterCommit(containerInfo) {
        }
        function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
          return {
            type,
            props,
            isHidden: false,
            children: [],
            internalInstanceHandle,
            rootContainerInstance,
            tag: "INSTANCE"
          };
        }
        function appendInitialChild(parentInstance, child) {
          var index2 = parentInstance.children.indexOf(child);
          if (index2 !== -1) {
            parentInstance.children.splice(index2, 1);
          }
          parentInstance.children.push(child);
        }
        function prepareUpdate(testElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
          return UPDATE_SIGNAL;
        }
        function shouldSetTextContent(type, props) {
          return false;
        }
        function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
          return {
            text,
            isHidden: false,
            tag: "TEXT"
          };
        }
        var scheduleTimeout = setTimeout;
        var cancelTimeout = clearTimeout;
        var noTimeout = -1;
        function commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
          instance.type = type;
          instance.props = newProps;
        }
        function commitTextUpdate(textInstance, oldText, newText) {
          textInstance.text = newText;
        }
        function resetTextContent(testElement) {
        }
        var appendChildToContainer = appendChild;
        var insertInContainerBefore = insertBefore;
        var removeChildFromContainer = removeChild;
        function hideInstance(instance) {
          instance.isHidden = true;
        }
        function hideTextInstance(textInstance) {
          textInstance.isHidden = true;
        }
        function unhideInstance(instance, props) {
          instance.isHidden = false;
        }
        function unhideTextInstance(textInstance, text) {
          textInstance.isHidden = false;
        }
        var clientId = 0;
        function makeClientIdInDEV(warnOnAccessInDEV) {
          var id = "c_" + (clientId++).toString(36);
          return {
            toString: function() {
              warnOnAccessInDEV();
              return id;
            },
            valueOf: function() {
              warnOnAccessInDEV();
              return id;
            }
          };
        }
        function preparePortalMount(portalInstance) {
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
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
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
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
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
              ReactCurrentDispatcher.current = previousDispatcher;
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
        function describeClassComponentFrame(ctor, source, ownerFn) {
          {
            return describeNativeComponentFrame(ctor, true);
          }
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
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
            case REACT_SUSPENSE_TYPE:
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
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
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
        var valueStack = [];
        var fiberStack;
        {
          fiberStack = [];
        }
        var index = -1;
        function createCursor(defaultValue) {
          return {
            current: defaultValue
          };
        }
        function pop(cursor, fiber) {
          if (index < 0) {
            {
              error("Unexpected pop.");
            }
            return;
          }
          {
            if (fiber !== fiberStack[index]) {
              error("Unexpected Fiber popped.");
            }
          }
          cursor.current = valueStack[index];
          valueStack[index] = null;
          {
            fiberStack[index] = null;
          }
          index--;
        }
        function push(cursor, value, fiber) {
          index++;
          valueStack[index] = cursor.current;
          {
            fiberStack[index] = fiber;
          }
          cursor.current = value;
        }
        var warnedAboutMissingGetChildContext;
        {
          warnedAboutMissingGetChildContext = {};
        }
        var emptyContextObject = {};
        {
          Object.freeze(emptyContextObject);
        }
        var contextStackCursor = createCursor(emptyContextObject);
        var didPerformWorkStackCursor = createCursor(false);
        var previousContext = emptyContextObject;
        function getUnmaskedContext(workInProgress2, Component, didPushOwnContextIfProvider) {
          {
            if (didPushOwnContextIfProvider && isContextProvider(Component)) {
              return previousContext;
            }
            return contextStackCursor.current;
          }
        }
        function cacheContext(workInProgress2, unmaskedContext, maskedContext) {
          {
            var instance = workInProgress2.stateNode;
            instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
            instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
          }
        }
        function getMaskedContext(workInProgress2, unmaskedContext) {
          {
            var type = workInProgress2.type;
            var contextTypes = type.contextTypes;
            if (!contextTypes) {
              return emptyContextObject;
            }
            var instance = workInProgress2.stateNode;
            if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
              return instance.__reactInternalMemoizedMaskedChildContext;
            }
            var context = {};
            for (var key in contextTypes) {
              context[key] = unmaskedContext[key];
            }
            {
              var name = getComponentName(type) || "Unknown";
              checkPropTypes(contextTypes, context, "context", name);
            }
            if (instance) {
              cacheContext(workInProgress2, unmaskedContext, context);
            }
            return context;
          }
        }
        function hasContextChanged() {
          {
            return didPerformWorkStackCursor.current;
          }
        }
        function isContextProvider(type) {
          {
            var childContextTypes = type.childContextTypes;
            return childContextTypes !== null && childContextTypes !== void 0;
          }
        }
        function popContext(fiber) {
          {
            pop(didPerformWorkStackCursor, fiber);
            pop(contextStackCursor, fiber);
          }
        }
        function popTopLevelContextObject(fiber) {
          {
            pop(didPerformWorkStackCursor, fiber);
            pop(contextStackCursor, fiber);
          }
        }
        function pushTopLevelContextObject(fiber, context, didChange) {
          {
            if (!(contextStackCursor.current === emptyContextObject)) {
              {
                throw Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            push(contextStackCursor, context, fiber);
            push(didPerformWorkStackCursor, didChange, fiber);
          }
        }
        function processChildContext(fiber, type, parentContext) {
          {
            var instance = fiber.stateNode;
            var childContextTypes = type.childContextTypes;
            if (typeof instance.getChildContext !== "function") {
              {
                var componentName = getComponentName(type) || "Unknown";
                if (!warnedAboutMissingGetChildContext[componentName]) {
                  warnedAboutMissingGetChildContext[componentName] = true;
                  error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                }
              }
              return parentContext;
            }
            var childContext = instance.getChildContext();
            for (var contextKey in childContext) {
              if (!(contextKey in childContextTypes)) {
                {
                  throw Error((getComponentName(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                }
              }
            }
            {
              var name = getComponentName(type) || "Unknown";
              checkPropTypes(childContextTypes, childContext, "child context", name);
            }
            return _assign({}, parentContext, childContext);
          }
        }
        function pushContextProvider(workInProgress2) {
          {
            var instance = workInProgress2.stateNode;
            var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject;
            previousContext = contextStackCursor.current;
            push(contextStackCursor, memoizedMergedChildContext, workInProgress2);
            push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress2);
            return true;
          }
        }
        function invalidateContextProvider(workInProgress2, type, didChange) {
          {
            var instance = workInProgress2.stateNode;
            if (!instance) {
              {
                throw Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            if (didChange) {
              var mergedContext = processChildContext(workInProgress2, type, previousContext);
              instance.__reactInternalMemoizedMergedChildContext = mergedContext;
              pop(didPerformWorkStackCursor, workInProgress2);
              pop(contextStackCursor, workInProgress2);
              push(contextStackCursor, mergedContext, workInProgress2);
              push(didPerformWorkStackCursor, didChange, workInProgress2);
            } else {
              pop(didPerformWorkStackCursor, workInProgress2);
              push(didPerformWorkStackCursor, didChange, workInProgress2);
            }
          }
        }
        function findCurrentUnmaskedContext(fiber) {
          {
            if (!(isFiberMounted(fiber) && fiber.tag === ClassComponent)) {
              {
                throw Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            var node = fiber;
            do {
              switch (node.tag) {
                case HostRoot:
                  return node.stateNode.context;
                case ClassComponent: {
                  var Component = node.type;
                  if (isContextProvider(Component)) {
                    return node.stateNode.__reactInternalMemoizedMergedChildContext;
                  }
                  break;
                }
              }
              node = node.return;
            } while (node !== null);
            {
              {
                throw Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
        }
        var LegacyRoot = 0;
        var BlockingRoot = 1;
        var ConcurrentRoot = 2;
        var rendererID = null;
        var injectedHook = null;
        var hasLoggedError = false;
        var isDevToolsPresent = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined";
        function injectInternals(internals) {
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined") {
            return false;
          }
          var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (hook.isDisabled) {
            return true;
          }
          if (!hook.supportsFiber) {
            {
              error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools");
            }
            return true;
          }
          try {
            rendererID = hook.inject(internals);
            injectedHook = hook;
          } catch (err) {
            {
              error("React instrumentation encountered an error: %s.", err);
            }
          }
          return true;
        }
        function onScheduleRoot(root, children) {
          {
            if (injectedHook && typeof injectedHook.onScheduleFiberRoot === "function") {
              try {
                injectedHook.onScheduleFiberRoot(rendererID, root, children);
              } catch (err) {
                if (!hasLoggedError) {
                  hasLoggedError = true;
                  error("React instrumentation encountered an error: %s", err);
                }
              }
            }
          }
        }
        function onCommitRoot(root, priorityLevel) {
          if (injectedHook && typeof injectedHook.onCommitFiberRoot === "function") {
            try {
              var didError = (root.current.flags & DidCapture) === DidCapture;
              if (enableProfilerTimer) {
                injectedHook.onCommitFiberRoot(rendererID, root, priorityLevel, didError);
              } else {
                injectedHook.onCommitFiberRoot(rendererID, root, void 0, didError);
              }
            } catch (err) {
              {
                if (!hasLoggedError) {
                  hasLoggedError = true;
                  error("React instrumentation encountered an error: %s", err);
                }
              }
            }
          }
        }
        function onCommitUnmount(fiber) {
          if (injectedHook && typeof injectedHook.onCommitFiberUnmount === "function") {
            try {
              injectedHook.onCommitFiberUnmount(rendererID, fiber);
            } catch (err) {
              {
                if (!hasLoggedError) {
                  hasLoggedError = true;
                  error("React instrumentation encountered an error: %s", err);
                }
              }
            }
          }
        }
        var Scheduler_now = Scheduler$1.unstable_now;
        {
          if (!(tracing.__interactionsRef != null && tracing.__interactionsRef.current != null)) {
            {
              throw Error("It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at https://reactjs.org/link/profiling");
            }
          }
        }
        var ImmediatePriority = 99;
        var UserBlockingPriority = 98;
        var NormalPriority = 97;
        var LowPriority = 96;
        var IdlePriority = 95;
        var NoPriority = 90;
        var initialTimeMs = Scheduler_now();
        var SyncLanePriority = 15;
        var SyncBatchedLanePriority = 14;
        var InputDiscreteHydrationLanePriority = 13;
        var InputDiscreteLanePriority = 12;
        var InputContinuousHydrationLanePriority = 11;
        var InputContinuousLanePriority = 10;
        var DefaultHydrationLanePriority = 9;
        var DefaultLanePriority = 8;
        var TransitionHydrationPriority = 7;
        var TransitionPriority = 6;
        var RetryLanePriority = 5;
        var SelectiveHydrationLanePriority = 4;
        var IdleHydrationLanePriority = 3;
        var IdleLanePriority = 2;
        var OffscreenLanePriority = 1;
        var NoLanePriority = 0;
        var TotalLanes = 31;
        var NoLanes = 0;
        var NoLane = 0;
        var SyncLane = 1;
        var SyncBatchedLane = 2;
        var InputDiscreteHydrationLane = 4;
        var InputDiscreteLanes = 24;
        var InputContinuousHydrationLane = 32;
        var InputContinuousLanes = 192;
        var DefaultHydrationLane = 256;
        var DefaultLanes = 3584;
        var TransitionHydrationLane = 4096;
        var TransitionLanes = 4186112;
        var RetryLanes = 62914560;
        var SomeRetryLane = 33554432;
        var SelectiveHydrationLane = 67108864;
        var NonIdleLanes = 134217727;
        var IdleHydrationLane = 134217728;
        var IdleLanes = 805306368;
        var OffscreenLane = 1073741824;
        var NoTimestamp = -1;
        var return_highestLanePriority = DefaultLanePriority;
        function getHighestPriorityLanes(lanes) {
          if ((SyncLane & lanes) !== NoLanes) {
            return_highestLanePriority = SyncLanePriority;
            return SyncLane;
          }
          if ((SyncBatchedLane & lanes) !== NoLanes) {
            return_highestLanePriority = SyncBatchedLanePriority;
            return SyncBatchedLane;
          }
          if ((InputDiscreteHydrationLane & lanes) !== NoLanes) {
            return_highestLanePriority = InputDiscreteHydrationLanePriority;
            return InputDiscreteHydrationLane;
          }
          var inputDiscreteLanes = InputDiscreteLanes & lanes;
          if (inputDiscreteLanes !== NoLanes) {
            return_highestLanePriority = InputDiscreteLanePriority;
            return inputDiscreteLanes;
          }
          if ((lanes & InputContinuousHydrationLane) !== NoLanes) {
            return_highestLanePriority = InputContinuousHydrationLanePriority;
            return InputContinuousHydrationLane;
          }
          var inputContinuousLanes = InputContinuousLanes & lanes;
          if (inputContinuousLanes !== NoLanes) {
            return_highestLanePriority = InputContinuousLanePriority;
            return inputContinuousLanes;
          }
          if ((lanes & DefaultHydrationLane) !== NoLanes) {
            return_highestLanePriority = DefaultHydrationLanePriority;
            return DefaultHydrationLane;
          }
          var defaultLanes = DefaultLanes & lanes;
          if (defaultLanes !== NoLanes) {
            return_highestLanePriority = DefaultLanePriority;
            return defaultLanes;
          }
          if ((lanes & TransitionHydrationLane) !== NoLanes) {
            return_highestLanePriority = TransitionHydrationPriority;
            return TransitionHydrationLane;
          }
          var transitionLanes = TransitionLanes & lanes;
          if (transitionLanes !== NoLanes) {
            return_highestLanePriority = TransitionPriority;
            return transitionLanes;
          }
          var retryLanes = RetryLanes & lanes;
          if (retryLanes !== NoLanes) {
            return_highestLanePriority = RetryLanePriority;
            return retryLanes;
          }
          if (lanes & SelectiveHydrationLane) {
            return_highestLanePriority = SelectiveHydrationLanePriority;
            return SelectiveHydrationLane;
          }
          if ((lanes & IdleHydrationLane) !== NoLanes) {
            return_highestLanePriority = IdleHydrationLanePriority;
            return IdleHydrationLane;
          }
          var idleLanes = IdleLanes & lanes;
          if (idleLanes !== NoLanes) {
            return_highestLanePriority = IdleLanePriority;
            return idleLanes;
          }
          if ((OffscreenLane & lanes) !== NoLanes) {
            return_highestLanePriority = OffscreenLanePriority;
            return OffscreenLane;
          }
          {
            error("Should have found matching lanes. This is a bug in React.");
          }
          return_highestLanePriority = DefaultLanePriority;
          return lanes;
        }
        function schedulerPriorityToLanePriority(schedulerPriorityLevel) {
          switch (schedulerPriorityLevel) {
            case ImmediatePriority:
              return SyncLanePriority;
            case UserBlockingPriority:
              return InputContinuousLanePriority;
            case NormalPriority:
            case LowPriority:
              return DefaultLanePriority;
            case IdlePriority:
              return IdleLanePriority;
            default:
              return NoLanePriority;
          }
        }
        function lanePriorityToSchedulerPriority(lanePriority) {
          switch (lanePriority) {
            case SyncLanePriority:
            case SyncBatchedLanePriority:
              return ImmediatePriority;
            case InputDiscreteHydrationLanePriority:
            case InputDiscreteLanePriority:
            case InputContinuousHydrationLanePriority:
            case InputContinuousLanePriority:
              return UserBlockingPriority;
            case DefaultHydrationLanePriority:
            case DefaultLanePriority:
            case TransitionHydrationPriority:
            case TransitionPriority:
            case SelectiveHydrationLanePriority:
            case RetryLanePriority:
              return NormalPriority;
            case IdleHydrationLanePriority:
            case IdleLanePriority:
            case OffscreenLanePriority:
              return IdlePriority;
            case NoLanePriority:
              return NoPriority;
            default: {
              {
                throw Error("Invalid update priority: " + lanePriority + ". This is a bug in React.");
              }
            }
          }
        }
        function getNextLanes(root, wipLanes) {
          var pendingLanes = root.pendingLanes;
          if (pendingLanes === NoLanes) {
            return_highestLanePriority = NoLanePriority;
            return NoLanes;
          }
          var nextLanes = NoLanes;
          var nextLanePriority = NoLanePriority;
          var expiredLanes = root.expiredLanes;
          var suspendedLanes = root.suspendedLanes;
          var pingedLanes = root.pingedLanes;
          if (expiredLanes !== NoLanes) {
            nextLanes = expiredLanes;
            nextLanePriority = return_highestLanePriority = SyncLanePriority;
          } else {
            var nonIdlePendingLanes = pendingLanes & NonIdleLanes;
            if (nonIdlePendingLanes !== NoLanes) {
              var nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;
              if (nonIdleUnblockedLanes !== NoLanes) {
                nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
                nextLanePriority = return_highestLanePriority;
              } else {
                var nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;
                if (nonIdlePingedLanes !== NoLanes) {
                  nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
                  nextLanePriority = return_highestLanePriority;
                }
              }
            } else {
              var unblockedLanes = pendingLanes & ~suspendedLanes;
              if (unblockedLanes !== NoLanes) {
                nextLanes = getHighestPriorityLanes(unblockedLanes);
                nextLanePriority = return_highestLanePriority;
              } else {
                if (pingedLanes !== NoLanes) {
                  nextLanes = getHighestPriorityLanes(pingedLanes);
                  nextLanePriority = return_highestLanePriority;
                }
              }
            }
          }
          if (nextLanes === NoLanes) {
            return NoLanes;
          }
          nextLanes = pendingLanes & getEqualOrHigherPriorityLanes(nextLanes);
          if (wipLanes !== NoLanes && wipLanes !== nextLanes && (wipLanes & suspendedLanes) === NoLanes) {
            getHighestPriorityLanes(wipLanes);
            var wipLanePriority = return_highestLanePriority;
            if (nextLanePriority <= wipLanePriority) {
              return wipLanes;
            } else {
              return_highestLanePriority = nextLanePriority;
            }
          }
          var entangledLanes = root.entangledLanes;
          if (entangledLanes !== NoLanes) {
            var entanglements = root.entanglements;
            var lanes = nextLanes & entangledLanes;
            while (lanes > 0) {
              var index2 = pickArbitraryLaneIndex(lanes);
              var lane = 1 << index2;
              nextLanes |= entanglements[index2];
              lanes &= ~lane;
            }
          }
          return nextLanes;
        }
        function getMostRecentEventTime(root, lanes) {
          var eventTimes = root.eventTimes;
          var mostRecentEventTime = NoTimestamp;
          while (lanes > 0) {
            var index2 = pickArbitraryLaneIndex(lanes);
            var lane = 1 << index2;
            var eventTime = eventTimes[index2];
            if (eventTime > mostRecentEventTime) {
              mostRecentEventTime = eventTime;
            }
            lanes &= ~lane;
          }
          return mostRecentEventTime;
        }
        function computeExpirationTime(lane, currentTime) {
          getHighestPriorityLanes(lane);
          var priority = return_highestLanePriority;
          if (priority >= InputContinuousLanePriority) {
            return currentTime + 250;
          } else if (priority >= TransitionPriority) {
            return currentTime + 5e3;
          } else {
            return NoTimestamp;
          }
        }
        function markStarvedLanesAsExpired(root, currentTime) {
          var pendingLanes = root.pendingLanes;
          var suspendedLanes = root.suspendedLanes;
          var pingedLanes = root.pingedLanes;
          var expirationTimes = root.expirationTimes;
          var lanes = pendingLanes;
          while (lanes > 0) {
            var index2 = pickArbitraryLaneIndex(lanes);
            var lane = 1 << index2;
            var expirationTime = expirationTimes[index2];
            if (expirationTime === NoTimestamp) {
              if ((lane & suspendedLanes) === NoLanes || (lane & pingedLanes) !== NoLanes) {
                expirationTimes[index2] = computeExpirationTime(lane, currentTime);
              }
            } else if (expirationTime <= currentTime) {
              root.expiredLanes |= lane;
            }
            lanes &= ~lane;
          }
        }
        function getLanesToRetrySynchronouslyOnError(root) {
          var everythingButOffscreen = root.pendingLanes & ~OffscreenLane;
          if (everythingButOffscreen !== NoLanes) {
            return everythingButOffscreen;
          }
          if (everythingButOffscreen & OffscreenLane) {
            return OffscreenLane;
          }
          return NoLanes;
        }
        function returnNextLanesPriority() {
          return return_highestLanePriority;
        }
        function includesNonIdleWork(lanes) {
          return (lanes & NonIdleLanes) !== NoLanes;
        }
        function includesOnlyRetries(lanes) {
          return (lanes & RetryLanes) === lanes;
        }
        function includesOnlyTransitions(lanes) {
          return (lanes & TransitionLanes) === lanes;
        }
        function findUpdateLane(lanePriority, wipLanes) {
          switch (lanePriority) {
            case NoLanePriority:
              break;
            case SyncLanePriority:
              return SyncLane;
            case SyncBatchedLanePriority:
              return SyncBatchedLane;
            case InputDiscreteLanePriority: {
              var _lane = pickArbitraryLane(InputDiscreteLanes & ~wipLanes);
              if (_lane === NoLane) {
                return findUpdateLane(InputContinuousLanePriority, wipLanes);
              }
              return _lane;
            }
            case InputContinuousLanePriority: {
              var _lane2 = pickArbitraryLane(InputContinuousLanes & ~wipLanes);
              if (_lane2 === NoLane) {
                return findUpdateLane(DefaultLanePriority, wipLanes);
              }
              return _lane2;
            }
            case DefaultLanePriority: {
              var _lane3 = pickArbitraryLane(DefaultLanes & ~wipLanes);
              if (_lane3 === NoLane) {
                _lane3 = pickArbitraryLane(TransitionLanes & ~wipLanes);
                if (_lane3 === NoLane) {
                  _lane3 = pickArbitraryLane(DefaultLanes);
                }
              }
              return _lane3;
            }
            case TransitionPriority:
            case RetryLanePriority:
              break;
            case IdleLanePriority:
              var lane = pickArbitraryLane(IdleLanes & ~wipLanes);
              if (lane === NoLane) {
                lane = pickArbitraryLane(IdleLanes);
              }
              return lane;
          }
          {
            {
              throw Error("Invalid update priority: " + lanePriority + ". This is a bug in React.");
            }
          }
        }
        function findTransitionLane(wipLanes, pendingLanes) {
          var lane = pickArbitraryLane(TransitionLanes & ~pendingLanes);
          if (lane === NoLane) {
            lane = pickArbitraryLane(TransitionLanes & ~wipLanes);
            if (lane === NoLane) {
              lane = pickArbitraryLane(TransitionLanes);
            }
          }
          return lane;
        }
        function findRetryLane(wipLanes) {
          var lane = pickArbitraryLane(RetryLanes & ~wipLanes);
          if (lane === NoLane) {
            lane = pickArbitraryLane(RetryLanes);
          }
          return lane;
        }
        function getHighestPriorityLane(lanes) {
          return lanes & -lanes;
        }
        function getLowestPriorityLane(lanes) {
          var index2 = 31 - clz32(lanes);
          return index2 < 0 ? NoLanes : 1 << index2;
        }
        function getEqualOrHigherPriorityLanes(lanes) {
          return (getLowestPriorityLane(lanes) << 1) - 1;
        }
        function pickArbitraryLane(lanes) {
          return getHighestPriorityLane(lanes);
        }
        function pickArbitraryLaneIndex(lanes) {
          return 31 - clz32(lanes);
        }
        function laneToIndex(lane) {
          return pickArbitraryLaneIndex(lane);
        }
        function includesSomeLane(a, b) {
          return (a & b) !== NoLanes;
        }
        function isSubsetOfLanes(set2, subset) {
          return (set2 & subset) === subset;
        }
        function mergeLanes(a, b) {
          return a | b;
        }
        function removeLanes(set2, subset) {
          return set2 & ~subset;
        }
        function laneToLanes(lane) {
          return lane;
        }
        function createLaneMap(initial) {
          var laneMap = [];
          for (var i = 0; i < TotalLanes; i++) {
            laneMap.push(initial);
          }
          return laneMap;
        }
        function markRootUpdated(root, updateLane, eventTime) {
          root.pendingLanes |= updateLane;
          var higherPriorityLanes = updateLane - 1;
          root.suspendedLanes &= higherPriorityLanes;
          root.pingedLanes &= higherPriorityLanes;
          var eventTimes = root.eventTimes;
          var index2 = laneToIndex(updateLane);
          eventTimes[index2] = eventTime;
        }
        function markRootSuspended(root, suspendedLanes) {
          root.suspendedLanes |= suspendedLanes;
          root.pingedLanes &= ~suspendedLanes;
          var expirationTimes = root.expirationTimes;
          var lanes = suspendedLanes;
          while (lanes > 0) {
            var index2 = pickArbitraryLaneIndex(lanes);
            var lane = 1 << index2;
            expirationTimes[index2] = NoTimestamp;
            lanes &= ~lane;
          }
        }
        function markRootPinged(root, pingedLanes, eventTime) {
          root.pingedLanes |= root.suspendedLanes & pingedLanes;
        }
        function hasDiscreteLanes(lanes) {
          return (lanes & InputDiscreteLanes) !== NoLanes;
        }
        function markRootMutableRead(root, updateLane) {
          root.mutableReadLanes |= updateLane & root.pendingLanes;
        }
        function markRootFinished(root, remainingLanes) {
          var noLongerPendingLanes = root.pendingLanes & ~remainingLanes;
          root.pendingLanes = remainingLanes;
          root.suspendedLanes = 0;
          root.pingedLanes = 0;
          root.expiredLanes &= remainingLanes;
          root.mutableReadLanes &= remainingLanes;
          root.entangledLanes &= remainingLanes;
          var entanglements = root.entanglements;
          var eventTimes = root.eventTimes;
          var expirationTimes = root.expirationTimes;
          var lanes = noLongerPendingLanes;
          while (lanes > 0) {
            var index2 = pickArbitraryLaneIndex(lanes);
            var lane = 1 << index2;
            entanglements[index2] = NoLanes;
            eventTimes[index2] = NoTimestamp;
            expirationTimes[index2] = NoTimestamp;
            lanes &= ~lane;
          }
        }
        function markRootEntangled(root, entangledLanes) {
          root.entangledLanes |= entangledLanes;
          var entanglements = root.entanglements;
          var lanes = entangledLanes;
          while (lanes > 0) {
            var index2 = pickArbitraryLaneIndex(lanes);
            var lane = 1 << index2;
            entanglements[index2] |= entangledLanes;
            lanes &= ~lane;
          }
        }
        var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
        var log = Math.log;
        var LN2 = Math.LN2;
        function clz32Fallback(lanes) {
          if (lanes === 0) {
            return 32;
          }
          return 31 - (log(lanes) / LN2 | 0) | 0;
        }
        var Scheduler_runWithPriority = Scheduler$1.unstable_runWithPriority, Scheduler_scheduleCallback = Scheduler$1.unstable_scheduleCallback, Scheduler_cancelCallback = Scheduler$1.unstable_cancelCallback, Scheduler_shouldYield = Scheduler$1.unstable_shouldYield, Scheduler_requestPaint = Scheduler$1.unstable_requestPaint, Scheduler_now$1 = Scheduler$1.unstable_now, Scheduler_getCurrentPriorityLevel = Scheduler$1.unstable_getCurrentPriorityLevel, Scheduler_ImmediatePriority = Scheduler$1.unstable_ImmediatePriority, Scheduler_UserBlockingPriority = Scheduler$1.unstable_UserBlockingPriority, Scheduler_NormalPriority = Scheduler$1.unstable_NormalPriority, Scheduler_LowPriority = Scheduler$1.unstable_LowPriority, Scheduler_IdlePriority = Scheduler$1.unstable_IdlePriority;
        {
          if (!(tracing.__interactionsRef != null && tracing.__interactionsRef.current != null)) {
            {
              throw Error("It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at https://reactjs.org/link/profiling");
            }
          }
        }
        var fakeCallbackNode = {};
        var ImmediatePriority$1 = 99;
        var UserBlockingPriority$1 = 98;
        var NormalPriority$1 = 97;
        var LowPriority$1 = 96;
        var IdlePriority$1 = 95;
        var NoPriority$1 = 90;
        var shouldYield = Scheduler_shouldYield;
        var requestPaint = Scheduler_requestPaint !== void 0 ? Scheduler_requestPaint : function() {
        };
        var syncQueue = null;
        var immediateQueueCallbackNode = null;
        var isFlushingSyncQueue = false;
        var initialTimeMs$1 = Scheduler_now$1();
        var now = initialTimeMs$1 < 1e4 ? Scheduler_now$1 : function() {
          return Scheduler_now$1() - initialTimeMs$1;
        };
        function getCurrentPriorityLevel() {
          switch (Scheduler_getCurrentPriorityLevel()) {
            case Scheduler_ImmediatePriority:
              return ImmediatePriority$1;
            case Scheduler_UserBlockingPriority:
              return UserBlockingPriority$1;
            case Scheduler_NormalPriority:
              return NormalPriority$1;
            case Scheduler_LowPriority:
              return LowPriority$1;
            case Scheduler_IdlePriority:
              return IdlePriority$1;
            default: {
              {
                throw Error("Unknown priority level.");
              }
            }
          }
        }
        function reactPriorityToSchedulerPriority(reactPriorityLevel) {
          switch (reactPriorityLevel) {
            case ImmediatePriority$1:
              return Scheduler_ImmediatePriority;
            case UserBlockingPriority$1:
              return Scheduler_UserBlockingPriority;
            case NormalPriority$1:
              return Scheduler_NormalPriority;
            case LowPriority$1:
              return Scheduler_LowPriority;
            case IdlePriority$1:
              return Scheduler_IdlePriority;
            default: {
              {
                throw Error("Unknown priority level.");
              }
            }
          }
        }
        function runWithPriority(reactPriorityLevel, fn) {
          var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
          return Scheduler_runWithPriority(priorityLevel, fn);
        }
        function scheduleCallback(reactPriorityLevel, callback, options) {
          var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
          return Scheduler_scheduleCallback(priorityLevel, callback, options);
        }
        function scheduleSyncCallback(callback) {
          if (syncQueue === null) {
            syncQueue = [callback];
            immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl);
          } else {
            syncQueue.push(callback);
          }
          return fakeCallbackNode;
        }
        function cancelCallback(callbackNode) {
          if (callbackNode !== fakeCallbackNode) {
            Scheduler_cancelCallback(callbackNode);
          }
        }
        function flushSyncCallbackQueue() {
          if (immediateQueueCallbackNode !== null) {
            var node = immediateQueueCallbackNode;
            immediateQueueCallbackNode = null;
            Scheduler_cancelCallback(node);
          }
          flushSyncCallbackQueueImpl();
        }
        function flushSyncCallbackQueueImpl() {
          if (!isFlushingSyncQueue && syncQueue !== null) {
            isFlushingSyncQueue = true;
            var i = 0;
            {
              try {
                var _isSync2 = true;
                var _queue = syncQueue;
                runWithPriority(ImmediatePriority$1, function() {
                  for (; i < _queue.length; i++) {
                    var callback = _queue[i];
                    do {
                      callback = callback(_isSync2);
                    } while (callback !== null);
                  }
                });
                syncQueue = null;
              } catch (error2) {
                if (syncQueue !== null) {
                  syncQueue = syncQueue.slice(i + 1);
                }
                Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue);
                throw error2;
              } finally {
                isFlushingSyncQueue = false;
              }
            }
          }
        }
        var ReactVersion = "17.0.2";
        var NoMode = 0;
        var StrictMode = 1;
        var BlockingMode = 2;
        var ConcurrentMode = 4;
        var ProfileMode = 8;
        var DebugTracingMode = 16;
        var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;
        var NoTransition = 0;
        function requestCurrentTransition() {
          return ReactCurrentBatchConfig.transition;
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function shallowEqual(objA, objB) {
          if (objectIs(objA, objB)) {
            return true;
          }
          if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
            return false;
          }
          var keysA = Object.keys(objA);
          var keysB = Object.keys(objB);
          if (keysA.length !== keysB.length) {
            return false;
          }
          for (var i = 0; i < keysA.length; i++) {
            if (!hasOwnProperty.call(objB, keysA[i]) || !objectIs(objA[keysA[i]], objB[keysA[i]])) {
              return false;
            }
          }
          return true;
        }
        function describeFiber(fiber) {
          var owner = fiber._debugOwner ? fiber._debugOwner.type : null;
          var source = fiber._debugSource;
          switch (fiber.tag) {
            case HostComponent:
              return describeBuiltInComponentFrame(fiber.type);
            case LazyComponent:
              return describeBuiltInComponentFrame("Lazy");
            case SuspenseComponent:
              return describeBuiltInComponentFrame("Suspense");
            case SuspenseListComponent:
              return describeBuiltInComponentFrame("SuspenseList");
            case FunctionComponent:
            case IndeterminateComponent:
            case SimpleMemoComponent:
              return describeFunctionComponentFrame(fiber.type);
            case ForwardRef:
              return describeFunctionComponentFrame(fiber.type.render);
            case Block:
              return describeFunctionComponentFrame(fiber.type._render);
            case ClassComponent:
              return describeClassComponentFrame(fiber.type);
            default:
              return "";
          }
        }
        function getStackByFiberInDevAndProd(workInProgress2) {
          try {
            var info = "";
            var node = workInProgress2;
            do {
              info += describeFiber(node);
              node = node.return;
            } while (node);
            return info;
          } catch (x) {
            return "\nError generating stack: " + x.message + "\n" + x.stack;
          }
        }
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        var current = null;
        var isRendering = false;
        function getCurrentFiberOwnerNameInDevOrNull() {
          {
            if (current === null) {
              return null;
            }
            var owner = current._debugOwner;
            if (owner !== null && typeof owner !== "undefined") {
              return getComponentName(owner.type);
            }
          }
          return null;
        }
        function getCurrentFiberStackInDev() {
          {
            if (current === null) {
              return "";
            }
            return getStackByFiberInDevAndProd(current);
          }
        }
        function resetCurrentFiber() {
          {
            ReactDebugCurrentFrame$1.getCurrentStack = null;
            current = null;
            isRendering = false;
          }
        }
        function setCurrentFiber(fiber) {
          {
            ReactDebugCurrentFrame$1.getCurrentStack = getCurrentFiberStackInDev;
            current = fiber;
            isRendering = false;
          }
        }
        function setIsRendering(rendering) {
          {
            isRendering = rendering;
          }
        }
        function getIsRendering() {
          {
            return isRendering;
          }
        }
        var ReactStrictModeWarnings = {
          recordUnsafeLifecycleWarnings: function(fiber, instance) {
          },
          flushPendingUnsafeLifecycleWarnings: function() {
          },
          recordLegacyContextWarning: function(fiber, instance) {
          },
          flushLegacyContextWarning: function() {
          },
          discardPendingWarnings: function() {
          }
        };
        {
          var findStrictRoot = function(fiber) {
            var maybeStrictRoot = null;
            var node = fiber;
            while (node !== null) {
              if (node.mode & StrictMode) {
                maybeStrictRoot = node;
              }
              node = node.return;
            }
            return maybeStrictRoot;
          };
          var setToSortedString = function(set2) {
            var array = [];
            set2.forEach(function(value) {
              array.push(value);
            });
            return array.sort().join(", ");
          };
          var pendingComponentWillMountWarnings = [];
          var pendingUNSAFE_ComponentWillMountWarnings = [];
          var pendingComponentWillReceivePropsWarnings = [];
          var pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
          var pendingComponentWillUpdateWarnings = [];
          var pendingUNSAFE_ComponentWillUpdateWarnings = [];
          var didWarnAboutUnsafeLifecycles = /* @__PURE__ */ new Set();
          ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function(fiber, instance) {
            if (didWarnAboutUnsafeLifecycles.has(fiber.type)) {
              return;
            }
            if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
              pendingComponentWillMountWarnings.push(fiber);
            }
            if (fiber.mode & StrictMode && typeof instance.UNSAFE_componentWillMount === "function") {
              pendingUNSAFE_ComponentWillMountWarnings.push(fiber);
            }
            if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
              pendingComponentWillReceivePropsWarnings.push(fiber);
            }
            if (fiber.mode & StrictMode && typeof instance.UNSAFE_componentWillReceiveProps === "function") {
              pendingUNSAFE_ComponentWillReceivePropsWarnings.push(fiber);
            }
            if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
              pendingComponentWillUpdateWarnings.push(fiber);
            }
            if (fiber.mode & StrictMode && typeof instance.UNSAFE_componentWillUpdate === "function") {
              pendingUNSAFE_ComponentWillUpdateWarnings.push(fiber);
            }
          };
          ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function() {
            var componentWillMountUniqueNames = /* @__PURE__ */ new Set();
            if (pendingComponentWillMountWarnings.length > 0) {
              pendingComponentWillMountWarnings.forEach(function(fiber) {
                componentWillMountUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingComponentWillMountWarnings = [];
            }
            var UNSAFE_componentWillMountUniqueNames = /* @__PURE__ */ new Set();
            if (pendingUNSAFE_ComponentWillMountWarnings.length > 0) {
              pendingUNSAFE_ComponentWillMountWarnings.forEach(function(fiber) {
                UNSAFE_componentWillMountUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingUNSAFE_ComponentWillMountWarnings = [];
            }
            var componentWillReceivePropsUniqueNames = /* @__PURE__ */ new Set();
            if (pendingComponentWillReceivePropsWarnings.length > 0) {
              pendingComponentWillReceivePropsWarnings.forEach(function(fiber) {
                componentWillReceivePropsUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingComponentWillReceivePropsWarnings = [];
            }
            var UNSAFE_componentWillReceivePropsUniqueNames = /* @__PURE__ */ new Set();
            if (pendingUNSAFE_ComponentWillReceivePropsWarnings.length > 0) {
              pendingUNSAFE_ComponentWillReceivePropsWarnings.forEach(function(fiber) {
                UNSAFE_componentWillReceivePropsUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
            }
            var componentWillUpdateUniqueNames = /* @__PURE__ */ new Set();
            if (pendingComponentWillUpdateWarnings.length > 0) {
              pendingComponentWillUpdateWarnings.forEach(function(fiber) {
                componentWillUpdateUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingComponentWillUpdateWarnings = [];
            }
            var UNSAFE_componentWillUpdateUniqueNames = /* @__PURE__ */ new Set();
            if (pendingUNSAFE_ComponentWillUpdateWarnings.length > 0) {
              pendingUNSAFE_ComponentWillUpdateWarnings.forEach(function(fiber) {
                UNSAFE_componentWillUpdateUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingUNSAFE_ComponentWillUpdateWarnings = [];
            }
            if (UNSAFE_componentWillMountUniqueNames.size > 0) {
              var sortedNames = setToSortedString(UNSAFE_componentWillMountUniqueNames);
              error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", sortedNames);
            }
            if (UNSAFE_componentWillReceivePropsUniqueNames.size > 0) {
              var _sortedNames = setToSortedString(UNSAFE_componentWillReceivePropsUniqueNames);
              error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n\nPlease update the following components: %s", _sortedNames);
            }
            if (UNSAFE_componentWillUpdateUniqueNames.size > 0) {
              var _sortedNames2 = setToSortedString(UNSAFE_componentWillUpdateUniqueNames);
              error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", _sortedNames2);
            }
            if (componentWillMountUniqueNames.size > 0) {
              var _sortedNames3 = setToSortedString(componentWillMountUniqueNames);
              warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", _sortedNames3);
            }
            if (componentWillReceivePropsUniqueNames.size > 0) {
              var _sortedNames4 = setToSortedString(componentWillReceivePropsUniqueNames);
              warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", _sortedNames4);
            }
            if (componentWillUpdateUniqueNames.size > 0) {
              var _sortedNames5 = setToSortedString(componentWillUpdateUniqueNames);
              warn("componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", _sortedNames5);
            }
          };
          var pendingLegacyContextWarning = /* @__PURE__ */ new Map();
          var didWarnAboutLegacyContext = /* @__PURE__ */ new Set();
          ReactStrictModeWarnings.recordLegacyContextWarning = function(fiber, instance) {
            var strictRoot = findStrictRoot(fiber);
            if (strictRoot === null) {
              error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
              return;
            }
            if (didWarnAboutLegacyContext.has(fiber.type)) {
              return;
            }
            var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);
            if (fiber.type.contextTypes != null || fiber.type.childContextTypes != null || instance !== null && typeof instance.getChildContext === "function") {
              if (warningsForRoot === void 0) {
                warningsForRoot = [];
                pendingLegacyContextWarning.set(strictRoot, warningsForRoot);
              }
              warningsForRoot.push(fiber);
            }
          };
          ReactStrictModeWarnings.flushLegacyContextWarning = function() {
            pendingLegacyContextWarning.forEach(function(fiberArray, strictRoot) {
              if (fiberArray.length === 0) {
                return;
              }
              var firstFiber = fiberArray[0];
              var uniqueNames = /* @__PURE__ */ new Set();
              fiberArray.forEach(function(fiber) {
                uniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutLegacyContext.add(fiber.type);
              });
              var sortedNames = setToSortedString(uniqueNames);
              try {
                setCurrentFiber(firstFiber);
                error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context", sortedNames);
              } finally {
                resetCurrentFiber();
              }
            });
          };
          ReactStrictModeWarnings.discardPendingWarnings = function() {
            pendingComponentWillMountWarnings = [];
            pendingUNSAFE_ComponentWillMountWarnings = [];
            pendingComponentWillReceivePropsWarnings = [];
            pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
            pendingComponentWillUpdateWarnings = [];
            pendingUNSAFE_ComponentWillUpdateWarnings = [];
            pendingLegacyContextWarning = /* @__PURE__ */ new Map();
          };
        }
        function resolveDefaultProps(Component, baseProps) {
          if (Component && Component.defaultProps) {
            var props = _assign({}, baseProps);
            var defaultProps = Component.defaultProps;
            for (var propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
            return props;
          }
          return baseProps;
        }
        var MAX_SIGNED_31_BIT_INT = 1073741823;
        var valueCursor = createCursor(null);
        var rendererSigil;
        {
          rendererSigil = {};
        }
        var currentlyRenderingFiber = null;
        var lastContextDependency = null;
        var lastContextWithAllBitsObserved = null;
        var isDisallowedContextReadInDEV = false;
        function resetContextDependencies() {
          currentlyRenderingFiber = null;
          lastContextDependency = null;
          lastContextWithAllBitsObserved = null;
          {
            isDisallowedContextReadInDEV = false;
          }
        }
        function enterDisallowedContextReadInDEV() {
          {
            isDisallowedContextReadInDEV = true;
          }
        }
        function exitDisallowedContextReadInDEV() {
          {
            isDisallowedContextReadInDEV = false;
          }
        }
        function pushProvider(providerFiber, nextValue) {
          var context = providerFiber.type._context;
          {
            push(valueCursor, context._currentValue2, providerFiber);
            context._currentValue2 = nextValue;
            {
              if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer2 = rendererSigil;
            }
          }
        }
        function popProvider(providerFiber) {
          var currentValue = valueCursor.current;
          pop(valueCursor, providerFiber);
          var context = providerFiber.type._context;
          {
            context._currentValue2 = currentValue;
          }
        }
        function calculateChangedBits(context, newValue, oldValue) {
          if (objectIs(oldValue, newValue)) {
            return 0;
          } else {
            var changedBits = typeof context._calculateChangedBits === "function" ? context._calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
            {
              if ((changedBits & MAX_SIGNED_31_BIT_INT) !== changedBits) {
                error("calculateChangedBits: Expected the return value to be a 31-bit integer. Instead received: %s", changedBits);
              }
            }
            return changedBits | 0;
          }
        }
        function scheduleWorkOnParentPath(parent, renderLanes2) {
          var node = parent;
          while (node !== null) {
            var alternate = node.alternate;
            if (!isSubsetOfLanes(node.childLanes, renderLanes2)) {
              node.childLanes = mergeLanes(node.childLanes, renderLanes2);
              if (alternate !== null) {
                alternate.childLanes = mergeLanes(alternate.childLanes, renderLanes2);
              }
            } else if (alternate !== null && !isSubsetOfLanes(alternate.childLanes, renderLanes2)) {
              alternate.childLanes = mergeLanes(alternate.childLanes, renderLanes2);
            } else {
              break;
            }
            node = node.return;
          }
        }
        function propagateContextChange(workInProgress2, context, changedBits, renderLanes2) {
          var fiber = workInProgress2.child;
          if (fiber !== null) {
            fiber.return = workInProgress2;
          }
          while (fiber !== null) {
            var nextFiber = void 0;
            var list = fiber.dependencies;
            if (list !== null) {
              nextFiber = fiber.child;
              var dependency = list.firstContext;
              while (dependency !== null) {
                if (dependency.context === context && (dependency.observedBits & changedBits) !== 0) {
                  if (fiber.tag === ClassComponent) {
                    var update = createUpdate(NoTimestamp, pickArbitraryLane(renderLanes2));
                    update.tag = ForceUpdate;
                    enqueueUpdate(fiber, update);
                  }
                  fiber.lanes = mergeLanes(fiber.lanes, renderLanes2);
                  var alternate = fiber.alternate;
                  if (alternate !== null) {
                    alternate.lanes = mergeLanes(alternate.lanes, renderLanes2);
                  }
                  scheduleWorkOnParentPath(fiber.return, renderLanes2);
                  list.lanes = mergeLanes(list.lanes, renderLanes2);
                  break;
                }
                dependency = dependency.next;
              }
            } else if (fiber.tag === ContextProvider) {
              nextFiber = fiber.type === workInProgress2.type ? null : fiber.child;
            } else {
              nextFiber = fiber.child;
            }
            if (nextFiber !== null) {
              nextFiber.return = fiber;
            } else {
              nextFiber = fiber;
              while (nextFiber !== null) {
                if (nextFiber === workInProgress2) {
                  nextFiber = null;
                  break;
                }
                var sibling = nextFiber.sibling;
                if (sibling !== null) {
                  sibling.return = nextFiber.return;
                  nextFiber = sibling;
                  break;
                }
                nextFiber = nextFiber.return;
              }
            }
            fiber = nextFiber;
          }
        }
        function prepareToReadContext(workInProgress2, renderLanes2) {
          currentlyRenderingFiber = workInProgress2;
          lastContextDependency = null;
          lastContextWithAllBitsObserved = null;
          var dependencies = workInProgress2.dependencies;
          if (dependencies !== null) {
            var firstContext = dependencies.firstContext;
            if (firstContext !== null) {
              if (includesSomeLane(dependencies.lanes, renderLanes2)) {
                markWorkInProgressReceivedUpdate();
              }
              dependencies.firstContext = null;
            }
          }
        }
        function readContext(context, observedBits) {
          {
            if (isDisallowedContextReadInDEV) {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            }
          }
          if (lastContextWithAllBitsObserved === context)
            ;
          else if (observedBits === false || observedBits === 0)
            ;
          else {
            var resolvedObservedBits;
            if (typeof observedBits !== "number" || observedBits === MAX_SIGNED_31_BIT_INT) {
              lastContextWithAllBitsObserved = context;
              resolvedObservedBits = MAX_SIGNED_31_BIT_INT;
            } else {
              resolvedObservedBits = observedBits;
            }
            var contextItem = {
              context,
              observedBits: resolvedObservedBits,
              next: null
            };
            if (lastContextDependency === null) {
              if (!(currentlyRenderingFiber !== null)) {
                {
                  throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
                }
              }
              lastContextDependency = contextItem;
              currentlyRenderingFiber.dependencies = {
                lanes: NoLanes,
                firstContext: contextItem,
                responders: null
              };
            } else {
              lastContextDependency = lastContextDependency.next = contextItem;
            }
          }
          return context._currentValue2;
        }
        var UpdateState = 0;
        var ReplaceState = 1;
        var ForceUpdate = 2;
        var CaptureUpdate = 3;
        var hasForceUpdate = false;
        var didWarnUpdateInsideUpdate;
        var currentlyProcessingQueue;
        {
          didWarnUpdateInsideUpdate = false;
          currentlyProcessingQueue = null;
        }
        function initializeUpdateQueue(fiber) {
          var queue = {
            baseState: fiber.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
              pending: null
            },
            effects: null
          };
          fiber.updateQueue = queue;
        }
        function cloneUpdateQueue(current2, workInProgress2) {
          var queue = workInProgress2.updateQueue;
          var currentQueue = current2.updateQueue;
          if (queue === currentQueue) {
            var clone = {
              baseState: currentQueue.baseState,
              firstBaseUpdate: currentQueue.firstBaseUpdate,
              lastBaseUpdate: currentQueue.lastBaseUpdate,
              shared: currentQueue.shared,
              effects: currentQueue.effects
            };
            workInProgress2.updateQueue = clone;
          }
        }
        function createUpdate(eventTime, lane) {
          var update = {
            eventTime,
            lane,
            tag: UpdateState,
            payload: null,
            callback: null,
            next: null
          };
          return update;
        }
        function enqueueUpdate(fiber, update) {
          var updateQueue = fiber.updateQueue;
          if (updateQueue === null) {
            return;
          }
          var sharedQueue = updateQueue.shared;
          var pending = sharedQueue.pending;
          if (pending === null) {
            update.next = update;
          } else {
            update.next = pending.next;
            pending.next = update;
          }
          sharedQueue.pending = update;
          {
            if (currentlyProcessingQueue === sharedQueue && !didWarnUpdateInsideUpdate) {
              error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.");
              didWarnUpdateInsideUpdate = true;
            }
          }
        }
        function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
          var queue = workInProgress2.updateQueue;
          var current2 = workInProgress2.alternate;
          if (current2 !== null) {
            var currentQueue = current2.updateQueue;
            if (queue === currentQueue) {
              var newFirst = null;
              var newLast = null;
              var firstBaseUpdate = queue.firstBaseUpdate;
              if (firstBaseUpdate !== null) {
                var update = firstBaseUpdate;
                do {
                  var clone = {
                    eventTime: update.eventTime,
                    lane: update.lane,
                    tag: update.tag,
                    payload: update.payload,
                    callback: update.callback,
                    next: null
                  };
                  if (newLast === null) {
                    newFirst = newLast = clone;
                  } else {
                    newLast.next = clone;
                    newLast = clone;
                  }
                  update = update.next;
                } while (update !== null);
                if (newLast === null) {
                  newFirst = newLast = capturedUpdate;
                } else {
                  newLast.next = capturedUpdate;
                  newLast = capturedUpdate;
                }
              } else {
                newFirst = newLast = capturedUpdate;
              }
              queue = {
                baseState: currentQueue.baseState,
                firstBaseUpdate: newFirst,
                lastBaseUpdate: newLast,
                shared: currentQueue.shared,
                effects: currentQueue.effects
              };
              workInProgress2.updateQueue = queue;
              return;
            }
          }
          var lastBaseUpdate = queue.lastBaseUpdate;
          if (lastBaseUpdate === null) {
            queue.firstBaseUpdate = capturedUpdate;
          } else {
            lastBaseUpdate.next = capturedUpdate;
          }
          queue.lastBaseUpdate = capturedUpdate;
        }
        function getStateFromUpdate(workInProgress2, queue, update, prevState, nextProps, instance) {
          switch (update.tag) {
            case ReplaceState: {
              var payload = update.payload;
              if (typeof payload === "function") {
                {
                  enterDisallowedContextReadInDEV();
                }
                var nextState = payload.call(instance, prevState, nextProps);
                {
                  exitDisallowedContextReadInDEV();
                }
                return nextState;
              }
              return payload;
            }
            case CaptureUpdate: {
              workInProgress2.flags = workInProgress2.flags & ~ShouldCapture | DidCapture;
            }
            case UpdateState: {
              var _payload = update.payload;
              var partialState;
              if (typeof _payload === "function") {
                {
                  enterDisallowedContextReadInDEV();
                }
                partialState = _payload.call(instance, prevState, nextProps);
                {
                  exitDisallowedContextReadInDEV();
                }
              } else {
                partialState = _payload;
              }
              if (partialState === null || partialState === void 0) {
                return prevState;
              }
              return _assign({}, prevState, partialState);
            }
            case ForceUpdate: {
              hasForceUpdate = true;
              return prevState;
            }
          }
          return prevState;
        }
        function processUpdateQueue(workInProgress2, props, instance, renderLanes2) {
          var queue = workInProgress2.updateQueue;
          hasForceUpdate = false;
          {
            currentlyProcessingQueue = queue.shared;
          }
          var firstBaseUpdate = queue.firstBaseUpdate;
          var lastBaseUpdate = queue.lastBaseUpdate;
          var pendingQueue = queue.shared.pending;
          if (pendingQueue !== null) {
            queue.shared.pending = null;
            var lastPendingUpdate = pendingQueue;
            var firstPendingUpdate = lastPendingUpdate.next;
            lastPendingUpdate.next = null;
            if (lastBaseUpdate === null) {
              firstBaseUpdate = firstPendingUpdate;
            } else {
              lastBaseUpdate.next = firstPendingUpdate;
            }
            lastBaseUpdate = lastPendingUpdate;
            var current2 = workInProgress2.alternate;
            if (current2 !== null) {
              var currentQueue = current2.updateQueue;
              var currentLastBaseUpdate = currentQueue.lastBaseUpdate;
              if (currentLastBaseUpdate !== lastBaseUpdate) {
                if (currentLastBaseUpdate === null) {
                  currentQueue.firstBaseUpdate = firstPendingUpdate;
                } else {
                  currentLastBaseUpdate.next = firstPendingUpdate;
                }
                currentQueue.lastBaseUpdate = lastPendingUpdate;
              }
            }
          }
          if (firstBaseUpdate !== null) {
            var newState = queue.baseState;
            var newLanes = NoLanes;
            var newBaseState = null;
            var newFirstBaseUpdate = null;
            var newLastBaseUpdate = null;
            var update = firstBaseUpdate;
            do {
              var updateLane = update.lane;
              var updateEventTime = update.eventTime;
              if (!isSubsetOfLanes(renderLanes2, updateLane)) {
                var clone = {
                  eventTime: updateEventTime,
                  lane: updateLane,
                  tag: update.tag,
                  payload: update.payload,
                  callback: update.callback,
                  next: null
                };
                if (newLastBaseUpdate === null) {
                  newFirstBaseUpdate = newLastBaseUpdate = clone;
                  newBaseState = newState;
                } else {
                  newLastBaseUpdate = newLastBaseUpdate.next = clone;
                }
                newLanes = mergeLanes(newLanes, updateLane);
              } else {
                if (newLastBaseUpdate !== null) {
                  var _clone = {
                    eventTime: updateEventTime,
                    lane: NoLane,
                    tag: update.tag,
                    payload: update.payload,
                    callback: update.callback,
                    next: null
                  };
                  newLastBaseUpdate = newLastBaseUpdate.next = _clone;
                }
                newState = getStateFromUpdate(workInProgress2, queue, update, newState, props, instance);
                var callback = update.callback;
                if (callback !== null) {
                  workInProgress2.flags |= Callback;
                  var effects = queue.effects;
                  if (effects === null) {
                    queue.effects = [update];
                  } else {
                    effects.push(update);
                  }
                }
              }
              update = update.next;
              if (update === null) {
                pendingQueue = queue.shared.pending;
                if (pendingQueue === null) {
                  break;
                } else {
                  var _lastPendingUpdate = pendingQueue;
                  var _firstPendingUpdate = _lastPendingUpdate.next;
                  _lastPendingUpdate.next = null;
                  update = _firstPendingUpdate;
                  queue.lastBaseUpdate = _lastPendingUpdate;
                  queue.shared.pending = null;
                }
              }
            } while (true);
            if (newLastBaseUpdate === null) {
              newBaseState = newState;
            }
            queue.baseState = newBaseState;
            queue.firstBaseUpdate = newFirstBaseUpdate;
            queue.lastBaseUpdate = newLastBaseUpdate;
            markSkippedUpdateLanes(newLanes);
            workInProgress2.lanes = newLanes;
            workInProgress2.memoizedState = newState;
          }
          {
            currentlyProcessingQueue = null;
          }
        }
        function callCallback(callback, context) {
          if (!(typeof callback === "function")) {
            {
              throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + callback);
            }
          }
          callback.call(context);
        }
        function resetHasForceUpdateBeforeProcessing() {
          hasForceUpdate = false;
        }
        function checkHasForceUpdateAfterProcessing() {
          return hasForceUpdate;
        }
        function commitUpdateQueue(finishedWork, finishedQueue, instance) {
          var effects = finishedQueue.effects;
          finishedQueue.effects = null;
          if (effects !== null) {
            for (var i = 0; i < effects.length; i++) {
              var effect = effects[i];
              var callback = effect.callback;
              if (callback !== null) {
                effect.callback = null;
                callCallback(callback, instance);
              }
            }
          }
        }
        var fakeInternalInstance = {};
        var isArray = Array.isArray;
        var emptyRefsObject = new React3.Component().refs;
        var didWarnAboutStateAssignmentForComponent;
        var didWarnAboutUninitializedState;
        var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
        var didWarnAboutLegacyLifecyclesAndDerivedState;
        var didWarnAboutUndefinedDerivedState;
        var warnOnUndefinedDerivedState;
        var warnOnInvalidCallback;
        var didWarnAboutDirectlyAssigningPropsToState;
        var didWarnAboutContextTypeAndContextTypes;
        var didWarnAboutInvalidateContextType;
        {
          didWarnAboutStateAssignmentForComponent = /* @__PURE__ */ new Set();
          didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
          didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
          didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
          didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
          var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
          warnOnInvalidCallback = function(callback, callerName) {
            if (callback === null || typeof callback === "function") {
              return;
            }
            var key = callerName + "_" + callback;
            if (!didWarnOnInvalidCallback.has(key)) {
              didWarnOnInvalidCallback.add(key);
              error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
            }
          };
          warnOnUndefinedDerivedState = function(type, partialState) {
            if (partialState === void 0) {
              var componentName = getComponentName(type) || "Component";
              if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                didWarnAboutUndefinedDerivedState.add(componentName);
                error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
              }
            }
          };
          Object.defineProperty(fakeInternalInstance, "_processChildContext", {
            enumerable: false,
            value: function() {
              {
                {
                  throw Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
                }
              }
            }
          });
          Object.freeze(fakeInternalInstance);
        }
        function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
          var prevState = workInProgress2.memoizedState;
          var partialState = getDerivedStateFromProps(nextProps, prevState);
          {
            warnOnUndefinedDerivedState(ctor, partialState);
          }
          var memoizedState = partialState === null || partialState === void 0 ? prevState : _assign({}, prevState, partialState);
          workInProgress2.memoizedState = memoizedState;
          if (workInProgress2.lanes === NoLanes) {
            var updateQueue = workInProgress2.updateQueue;
            updateQueue.baseState = memoizedState;
          }
        }
        var classComponentUpdater = {
          isMounted,
          enqueueSetState: function(inst, payload, callback) {
            var fiber = get(inst);
            var eventTime = requestEventTime();
            var lane = requestUpdateLane(fiber);
            var update = createUpdate(eventTime, lane);
            update.payload = payload;
            if (callback !== void 0 && callback !== null) {
              {
                warnOnInvalidCallback(callback, "setState");
              }
              update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleUpdateOnFiber(fiber, lane, eventTime);
          },
          enqueueReplaceState: function(inst, payload, callback) {
            var fiber = get(inst);
            var eventTime = requestEventTime();
            var lane = requestUpdateLane(fiber);
            var update = createUpdate(eventTime, lane);
            update.tag = ReplaceState;
            update.payload = payload;
            if (callback !== void 0 && callback !== null) {
              {
                warnOnInvalidCallback(callback, "replaceState");
              }
              update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleUpdateOnFiber(fiber, lane, eventTime);
          },
          enqueueForceUpdate: function(inst, callback) {
            var fiber = get(inst);
            var eventTime = requestEventTime();
            var lane = requestUpdateLane(fiber);
            var update = createUpdate(eventTime, lane);
            update.tag = ForceUpdate;
            if (callback !== void 0 && callback !== null) {
              {
                warnOnInvalidCallback(callback, "forceUpdate");
              }
              update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleUpdateOnFiber(fiber, lane, eventTime);
          }
        };
        function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
          var instance = workInProgress2.stateNode;
          if (typeof instance.shouldComponentUpdate === "function") {
            var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
            {
              if (shouldUpdate === void 0) {
                error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", getComponentName(ctor) || "Component");
              }
            }
            return shouldUpdate;
          }
          if (ctor.prototype && ctor.prototype.isPureReactComponent) {
            return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
          }
          return true;
        }
        function checkClassInstance(workInProgress2, ctor, newProps) {
          var instance = workInProgress2.stateNode;
          {
            var name = getComponentName(ctor) || "Component";
            var renderPresent = instance.render;
            if (!renderPresent) {
              if (ctor.prototype && typeof ctor.prototype.render === "function") {
                error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
              } else {
                error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
              }
            }
            if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
              error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
            }
            if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
            }
            if (instance.propTypes) {
              error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
            }
            if (instance.contextType) {
              error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
            }
            {
              if (instance.contextTypes) {
                error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
              }
              if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                didWarnAboutContextTypeAndContextTypes.add(ctor);
                error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
              }
            }
            if (typeof instance.componentShouldUpdate === "function") {
              error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
            }
            if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
              error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentName(ctor) || "A pure component");
            }
            if (typeof instance.componentDidUnmount === "function") {
              error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
            }
            if (typeof instance.componentDidReceiveProps === "function") {
              error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
            }
            if (typeof instance.componentWillRecieveProps === "function") {
              error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
            }
            if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
              error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
            }
            var hasMutatedProps = instance.props !== newProps;
            if (instance.props !== void 0 && hasMutatedProps) {
              error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
            }
            if (instance.defaultProps) {
              error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
              didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
              error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentName(ctor));
            }
            if (typeof instance.getDerivedStateFromProps === "function") {
              error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof instance.getDerivedStateFromError === "function") {
              error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof ctor.getSnapshotBeforeUpdate === "function") {
              error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
            }
            var _state = instance.state;
            if (_state && (typeof _state !== "object" || isArray(_state))) {
              error("%s.state: must be set to an object or null", name);
            }
            if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
              error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
            }
          }
        }
        function adoptClassInstance(workInProgress2, instance) {
          instance.updater = classComponentUpdater;
          workInProgress2.stateNode = instance;
          set(instance, workInProgress2);
          {
            instance._reactInternalInstance = fakeInternalInstance;
          }
        }
        function constructClassInstance(workInProgress2, ctor, props) {
          var isLegacyContextConsumer = false;
          var unmaskedContext = emptyContextObject;
          var context = emptyContextObject;
          var contextType = ctor.contextType;
          {
            if ("contextType" in ctor) {
              var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
              if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                didWarnAboutInvalidateContextType.add(ctor);
                var addendum = "";
                if (contextType === void 0) {
                  addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                } else if (typeof contextType !== "object") {
                  addendum = " However, it is set to a " + typeof contextType + ".";
                } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                  addendum = " Did you accidentally pass the Context.Provider instead?";
                } else if (contextType._context !== void 0) {
                  addendum = " Did you accidentally pass the Context.Consumer instead?";
                } else {
                  addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                }
                error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(ctor) || "Component", addendum);
              }
            }
          }
          if (typeof contextType === "object" && contextType !== null) {
            context = readContext(contextType);
          } else {
            unmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            var contextTypes = ctor.contextTypes;
            isLegacyContextConsumer = contextTypes !== null && contextTypes !== void 0;
            context = isLegacyContextConsumer ? getMaskedContext(workInProgress2, unmaskedContext) : emptyContextObject;
          }
          var instance = new ctor(props, context);
          var state = workInProgress2.memoizedState = instance.state !== null && instance.state !== void 0 ? instance.state : null;
          adoptClassInstance(workInProgress2, instance);
          {
            if (typeof ctor.getDerivedStateFromProps === "function" && state === null) {
              var componentName = getComponentName(ctor) || "Component";
              if (!didWarnAboutUninitializedState.has(componentName)) {
                didWarnAboutUninitializedState.add(componentName);
                error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
              }
            }
            if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
              var foundWillMountName = null;
              var foundWillReceivePropsName = null;
              var foundWillUpdateName = null;
              if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                foundWillMountName = "componentWillMount";
              } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                foundWillMountName = "UNSAFE_componentWillMount";
              }
              if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                foundWillReceivePropsName = "componentWillReceiveProps";
              } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
              }
              if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                foundWillUpdateName = "componentWillUpdate";
              } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                foundWillUpdateName = "UNSAFE_componentWillUpdate";
              }
              if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                var _componentName = getComponentName(ctor) || "Component";
                var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                  didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                  error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                }
              }
            }
          }
          if (isLegacyContextConsumer) {
            cacheContext(workInProgress2, unmaskedContext, context);
          }
          return instance;
        }
        function callComponentWillMount(workInProgress2, instance) {
          var oldState = instance.state;
          if (typeof instance.componentWillMount === "function") {
            instance.componentWillMount();
          }
          if (typeof instance.UNSAFE_componentWillMount === "function") {
            instance.UNSAFE_componentWillMount();
          }
          if (oldState !== instance.state) {
            {
              error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentName(workInProgress2.type) || "Component");
            }
            classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
          }
        }
        function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
          var oldState = instance.state;
          if (typeof instance.componentWillReceiveProps === "function") {
            instance.componentWillReceiveProps(newProps, nextContext);
          }
          if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
            instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
          }
          if (instance.state !== oldState) {
            {
              var componentName = getComponentName(workInProgress2.type) || "Component";
              if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
                didWarnAboutStateAssignmentForComponent.add(componentName);
                error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", componentName);
              }
            }
            classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
          }
        }
        function mountClassInstance(workInProgress2, ctor, newProps, renderLanes2) {
          {
            checkClassInstance(workInProgress2, ctor, newProps);
          }
          var instance = workInProgress2.stateNode;
          instance.props = newProps;
          instance.state = workInProgress2.memoizedState;
          instance.refs = emptyRefsObject;
          initializeUpdateQueue(workInProgress2);
          var contextType = ctor.contextType;
          if (typeof contextType === "object" && contextType !== null) {
            instance.context = readContext(contextType);
          } else {
            var unmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            instance.context = getMaskedContext(workInProgress2, unmaskedContext);
          }
          {
            if (instance.state === newProps) {
              var componentName = getComponentName(ctor) || "Component";
              if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
              }
            }
            if (workInProgress2.mode & StrictMode) {
              ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress2, instance);
            }
            {
              ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress2, instance);
            }
          }
          processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
          instance.state = workInProgress2.memoizedState;
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          if (typeof getDerivedStateFromProps === "function") {
            applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
            instance.state = workInProgress2.memoizedState;
          }
          if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
            callComponentWillMount(workInProgress2, instance);
            processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
            instance.state = workInProgress2.memoizedState;
          }
          if (typeof instance.componentDidMount === "function") {
            workInProgress2.flags |= Update;
          }
        }
        function resumeMountClassInstance(workInProgress2, ctor, newProps, renderLanes2) {
          var instance = workInProgress2.stateNode;
          var oldProps = workInProgress2.memoizedProps;
          instance.props = oldProps;
          var oldContext = instance.context;
          var contextType = ctor.contextType;
          var nextContext = emptyContextObject;
          if (typeof contextType === "object" && contextType !== null) {
            nextContext = readContext(contextType);
          } else {
            var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            nextContext = getMaskedContext(workInProgress2, nextLegacyUnmaskedContext);
          }
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
          if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) {
            if (oldProps !== newProps || oldContext !== nextContext) {
              callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext);
            }
          }
          resetHasForceUpdateBeforeProcessing();
          var oldState = workInProgress2.memoizedState;
          var newState = instance.state = oldState;
          processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
          newState = workInProgress2.memoizedState;
          if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
            if (typeof instance.componentDidMount === "function") {
              workInProgress2.flags |= Update;
            }
            return false;
          }
          if (typeof getDerivedStateFromProps === "function") {
            applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
            newState = workInProgress2.memoizedState;
          }
          var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext);
          if (shouldUpdate) {
            if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              if (typeof instance.componentWillMount === "function") {
                instance.componentWillMount();
              }
              if (typeof instance.UNSAFE_componentWillMount === "function") {
                instance.UNSAFE_componentWillMount();
              }
            }
            if (typeof instance.componentDidMount === "function") {
              workInProgress2.flags |= Update;
            }
          } else {
            if (typeof instance.componentDidMount === "function") {
              workInProgress2.flags |= Update;
            }
            workInProgress2.memoizedProps = newProps;
            workInProgress2.memoizedState = newState;
          }
          instance.props = newProps;
          instance.state = newState;
          instance.context = nextContext;
          return shouldUpdate;
        }
        function updateClassInstance(current2, workInProgress2, ctor, newProps, renderLanes2) {
          var instance = workInProgress2.stateNode;
          cloneUpdateQueue(current2, workInProgress2);
          var unresolvedOldProps = workInProgress2.memoizedProps;
          var oldProps = workInProgress2.type === workInProgress2.elementType ? unresolvedOldProps : resolveDefaultProps(workInProgress2.type, unresolvedOldProps);
          instance.props = oldProps;
          var unresolvedNewProps = workInProgress2.pendingProps;
          var oldContext = instance.context;
          var contextType = ctor.contextType;
          var nextContext = emptyContextObject;
          if (typeof contextType === "object" && contextType !== null) {
            nextContext = readContext(contextType);
          } else {
            var nextUnmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            nextContext = getMaskedContext(workInProgress2, nextUnmaskedContext);
          }
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
          if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) {
            if (unresolvedOldProps !== unresolvedNewProps || oldContext !== nextContext) {
              callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext);
            }
          }
          resetHasForceUpdateBeforeProcessing();
          var oldState = workInProgress2.memoizedState;
          var newState = instance.state = oldState;
          processUpdateQueue(workInProgress2, newProps, instance, renderLanes2);
          newState = workInProgress2.memoizedState;
          if (unresolvedOldProps === unresolvedNewProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
            if (typeof instance.componentDidUpdate === "function") {
              if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.flags |= Update;
              }
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function") {
              if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.flags |= Snapshot;
              }
            }
            return false;
          }
          if (typeof getDerivedStateFromProps === "function") {
            applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
            newState = workInProgress2.memoizedState;
          }
          var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext);
          if (shouldUpdate) {
            if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === "function" || typeof instance.componentWillUpdate === "function")) {
              if (typeof instance.componentWillUpdate === "function") {
                instance.componentWillUpdate(newProps, newState, nextContext);
              }
              if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
              }
            }
            if (typeof instance.componentDidUpdate === "function") {
              workInProgress2.flags |= Update;
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function") {
              workInProgress2.flags |= Snapshot;
            }
          } else {
            if (typeof instance.componentDidUpdate === "function") {
              if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.flags |= Update;
              }
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function") {
              if (unresolvedOldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.flags |= Snapshot;
              }
            }
            workInProgress2.memoizedProps = newProps;
            workInProgress2.memoizedState = newState;
          }
          instance.props = newProps;
          instance.state = newState;
          instance.context = nextContext;
          return shouldUpdate;
        }
        var didWarnAboutMaps;
        var didWarnAboutGenerators;
        var didWarnAboutStringRefs;
        var ownerHasKeyUseWarning;
        var ownerHasFunctionTypeWarning;
        var warnForMissingKey = function(child, returnFiber) {
        };
        {
          didWarnAboutMaps = false;
          didWarnAboutGenerators = false;
          didWarnAboutStringRefs = {};
          ownerHasKeyUseWarning = {};
          ownerHasFunctionTypeWarning = {};
          warnForMissingKey = function(child, returnFiber) {
            if (child === null || typeof child !== "object") {
              return;
            }
            if (!child._store || child._store.validated || child.key != null) {
              return;
            }
            if (!(typeof child._store === "object")) {
              {
                throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            child._store.validated = true;
            var componentName = getComponentName(returnFiber.type) || "Component";
            if (ownerHasKeyUseWarning[componentName]) {
              return;
            }
            ownerHasKeyUseWarning[componentName] = true;
            error('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.');
          };
        }
        var isArray$1 = Array.isArray;
        function coerceRef(returnFiber, current2, element) {
          var mixedRef = element.ref;
          if (mixedRef !== null && typeof mixedRef !== "function" && typeof mixedRef !== "object") {
            {
              if ((returnFiber.mode & StrictMode || warnAboutStringRefs) && !(element._owner && element._self && element._owner.stateNode !== element._self)) {
                var componentName = getComponentName(returnFiber.type) || "Component";
                if (!didWarnAboutStringRefs[componentName]) {
                  {
                    error('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', mixedRef);
                  }
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
            if (element._owner) {
              var owner = element._owner;
              var inst;
              if (owner) {
                var ownerFiber = owner;
                if (!(ownerFiber.tag === ClassComponent)) {
                  {
                    throw Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
                  }
                }
                inst = ownerFiber.stateNode;
              }
              if (!inst) {
                {
                  throw Error("Missing owner for string ref " + mixedRef + ". This error is likely caused by a bug in React. Please file an issue.");
                }
              }
              var stringRef = "" + mixedRef;
              if (current2 !== null && current2.ref !== null && typeof current2.ref === "function" && current2.ref._stringRef === stringRef) {
                return current2.ref;
              }
              var ref = function(value) {
                var refs = inst.refs;
                if (refs === emptyRefsObject) {
                  refs = inst.refs = {};
                }
                if (value === null) {
                  delete refs[stringRef];
                } else {
                  refs[stringRef] = value;
                }
              };
              ref._stringRef = stringRef;
              return ref;
            } else {
              if (!(typeof mixedRef === "string")) {
                {
                  throw Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
                }
              }
              if (!element._owner) {
                {
                  throw Error("Element ref was specified as a string (" + mixedRef + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.");
                }
              }
            }
          }
          return mixedRef;
        }
        function throwOnInvalidObjectType(returnFiber, newChild) {
          if (returnFiber.type !== "textarea") {
            {
              {
                throw Error("Objects are not valid as a React child (found: " + (Object.prototype.toString.call(newChild) === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
          }
        }
        function warnOnFunctionType(returnFiber) {
          {
            var componentName = getComponentName(returnFiber.type) || "Component";
            if (ownerHasFunctionTypeWarning[componentName]) {
              return;
            }
            ownerHasFunctionTypeWarning[componentName] = true;
            error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
          }
        }
        function ChildReconciler(shouldTrackSideEffects) {
          function deleteChild(returnFiber, childToDelete) {
            if (!shouldTrackSideEffects) {
              return;
            }
            var last = returnFiber.lastEffect;
            if (last !== null) {
              last.nextEffect = childToDelete;
              returnFiber.lastEffect = childToDelete;
            } else {
              returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
            }
            childToDelete.nextEffect = null;
            childToDelete.flags = Deletion;
          }
          function deleteRemainingChildren(returnFiber, currentFirstChild) {
            if (!shouldTrackSideEffects) {
              return null;
            }
            var childToDelete = currentFirstChild;
            while (childToDelete !== null) {
              deleteChild(returnFiber, childToDelete);
              childToDelete = childToDelete.sibling;
            }
            return null;
          }
          function mapRemainingChildren(returnFiber, currentFirstChild) {
            var existingChildren = /* @__PURE__ */ new Map();
            var existingChild = currentFirstChild;
            while (existingChild !== null) {
              if (existingChild.key !== null) {
                existingChildren.set(existingChild.key, existingChild);
              } else {
                existingChildren.set(existingChild.index, existingChild);
              }
              existingChild = existingChild.sibling;
            }
            return existingChildren;
          }
          function useFiber(fiber, pendingProps) {
            var clone = createWorkInProgress(fiber, pendingProps);
            clone.index = 0;
            clone.sibling = null;
            return clone;
          }
          function placeChild(newFiber, lastPlacedIndex, newIndex) {
            newFiber.index = newIndex;
            if (!shouldTrackSideEffects) {
              return lastPlacedIndex;
            }
            var current2 = newFiber.alternate;
            if (current2 !== null) {
              var oldIndex = current2.index;
              if (oldIndex < lastPlacedIndex) {
                newFiber.flags = Placement;
                return lastPlacedIndex;
              } else {
                return oldIndex;
              }
            } else {
              newFiber.flags = Placement;
              return lastPlacedIndex;
            }
          }
          function placeSingleChild(newFiber) {
            if (shouldTrackSideEffects && newFiber.alternate === null) {
              newFiber.flags = Placement;
            }
            return newFiber;
          }
          function updateTextNode(returnFiber, current2, textContent, lanes) {
            if (current2 === null || current2.tag !== HostText) {
              var created = createFiberFromText(textContent, returnFiber.mode, lanes);
              created.return = returnFiber;
              return created;
            } else {
              var existing = useFiber(current2, textContent);
              existing.return = returnFiber;
              return existing;
            }
          }
          function updateElement(returnFiber, current2, element, lanes) {
            if (current2 !== null) {
              if (current2.elementType === element.type || isCompatibleFamilyForHotReloading(current2, element)) {
                var existing = useFiber(current2, element.props);
                existing.ref = coerceRef(returnFiber, current2, element);
                existing.return = returnFiber;
                {
                  existing._debugSource = element._source;
                  existing._debugOwner = element._owner;
                }
                return existing;
              }
            }
            var created = createFiberFromElement(element, returnFiber.mode, lanes);
            created.ref = coerceRef(returnFiber, current2, element);
            created.return = returnFiber;
            return created;
          }
          function updatePortal(returnFiber, current2, portal, lanes) {
            if (current2 === null || current2.tag !== HostPortal || current2.stateNode.containerInfo !== portal.containerInfo || current2.stateNode.implementation !== portal.implementation) {
              var created = createFiberFromPortal(portal, returnFiber.mode, lanes);
              created.return = returnFiber;
              return created;
            } else {
              var existing = useFiber(current2, portal.children || []);
              existing.return = returnFiber;
              return existing;
            }
          }
          function updateFragment2(returnFiber, current2, fragment, lanes, key) {
            if (current2 === null || current2.tag !== Fragment) {
              var created = createFiberFromFragment(fragment, returnFiber.mode, lanes, key);
              created.return = returnFiber;
              return created;
            } else {
              var existing = useFiber(current2, fragment);
              existing.return = returnFiber;
              return existing;
            }
          }
          function createChild(returnFiber, newChild, lanes) {
            if (typeof newChild === "string" || typeof newChild === "number") {
              var created = createFiberFromText("" + newChild, returnFiber.mode, lanes);
              created.return = returnFiber;
              return created;
            }
            if (typeof newChild === "object" && newChild !== null) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var _created = createFiberFromElement(newChild, returnFiber.mode, lanes);
                  _created.ref = coerceRef(returnFiber, null, newChild);
                  _created.return = returnFiber;
                  return _created;
                }
                case REACT_PORTAL_TYPE: {
                  var _created2 = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                  _created2.return = returnFiber;
                  return _created2;
                }
              }
              if (isArray$1(newChild) || getIteratorFn(newChild)) {
                var _created3 = createFiberFromFragment(newChild, returnFiber.mode, lanes, null);
                _created3.return = returnFiber;
                return _created3;
              }
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType(returnFiber);
              }
            }
            return null;
          }
          function updateSlot(returnFiber, oldFiber, newChild, lanes) {
            var key = oldFiber !== null ? oldFiber.key : null;
            if (typeof newChild === "string" || typeof newChild === "number") {
              if (key !== null) {
                return null;
              }
              return updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
            }
            if (typeof newChild === "object" && newChild !== null) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  if (newChild.key === key) {
                    if (newChild.type === REACT_FRAGMENT_TYPE) {
                      return updateFragment2(returnFiber, oldFiber, newChild.props.children, lanes, key);
                    }
                    return updateElement(returnFiber, oldFiber, newChild, lanes);
                  } else {
                    return null;
                  }
                }
                case REACT_PORTAL_TYPE: {
                  if (newChild.key === key) {
                    return updatePortal(returnFiber, oldFiber, newChild, lanes);
                  } else {
                    return null;
                  }
                }
              }
              if (isArray$1(newChild) || getIteratorFn(newChild)) {
                if (key !== null) {
                  return null;
                }
                return updateFragment2(returnFiber, oldFiber, newChild, lanes, null);
              }
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType(returnFiber);
              }
            }
            return null;
          }
          function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
            if (typeof newChild === "string" || typeof newChild === "number") {
              var matchedFiber = existingChildren.get(newIdx) || null;
              return updateTextNode(returnFiber, matchedFiber, "" + newChild, lanes);
            }
            if (typeof newChild === "object" && newChild !== null) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    return updateFragment2(returnFiber, _matchedFiber, newChild.props.children, lanes, newChild.key);
                  }
                  return updateElement(returnFiber, _matchedFiber, newChild, lanes);
                }
                case REACT_PORTAL_TYPE: {
                  var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                  return updatePortal(returnFiber, _matchedFiber2, newChild, lanes);
                }
              }
              if (isArray$1(newChild) || getIteratorFn(newChild)) {
                var _matchedFiber3 = existingChildren.get(newIdx) || null;
                return updateFragment2(returnFiber, _matchedFiber3, newChild, lanes, null);
              }
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType(returnFiber);
              }
            }
            return null;
          }
          function warnOnInvalidKey(child, knownKeys, returnFiber) {
            {
              if (typeof child !== "object" || child === null) {
                return knownKeys;
              }
              switch (child.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  warnForMissingKey(child, returnFiber);
                  var key = child.key;
                  if (typeof key !== "string") {
                    break;
                  }
                  if (knownKeys === null) {
                    knownKeys = /* @__PURE__ */ new Set();
                    knownKeys.add(key);
                    break;
                  }
                  if (!knownKeys.has(key)) {
                    knownKeys.add(key);
                    break;
                  }
                  error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.", key);
                  break;
              }
            }
            return knownKeys;
          }
          function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
            {
              var knownKeys = null;
              for (var i = 0; i < newChildren.length; i++) {
                var child = newChildren[i];
                knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
              }
            }
            var resultingFirstChild = null;
            var previousNewFiber = null;
            var oldFiber = currentFirstChild;
            var lastPlacedIndex = 0;
            var newIdx = 0;
            var nextOldFiber = null;
            for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
              if (oldFiber.index > newIdx) {
                nextOldFiber = oldFiber;
                oldFiber = null;
              } else {
                nextOldFiber = oldFiber.sibling;
              }
              var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
              if (newFiber === null) {
                if (oldFiber === null) {
                  oldFiber = nextOldFiber;
                }
                break;
              }
              if (shouldTrackSideEffects) {
                if (oldFiber && newFiber.alternate === null) {
                  deleteChild(returnFiber, oldFiber);
                }
              }
              lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
              if (previousNewFiber === null) {
                resultingFirstChild = newFiber;
              } else {
                previousNewFiber.sibling = newFiber;
              }
              previousNewFiber = newFiber;
              oldFiber = nextOldFiber;
            }
            if (newIdx === newChildren.length) {
              deleteRemainingChildren(returnFiber, oldFiber);
              return resultingFirstChild;
            }
            if (oldFiber === null) {
              for (; newIdx < newChildren.length; newIdx++) {
                var _newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
                if (_newFiber === null) {
                  continue;
                }
                lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber;
                } else {
                  previousNewFiber.sibling = _newFiber;
                }
                previousNewFiber = _newFiber;
              }
              return resultingFirstChild;
            }
            var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
            for (; newIdx < newChildren.length; newIdx++) {
              var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], lanes);
              if (_newFiber2 !== null) {
                if (shouldTrackSideEffects) {
                  if (_newFiber2.alternate !== null) {
                    existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
                  }
                }
                lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber2;
                } else {
                  previousNewFiber.sibling = _newFiber2;
                }
                previousNewFiber = _newFiber2;
              }
            }
            if (shouldTrackSideEffects) {
              existingChildren.forEach(function(child2) {
                return deleteChild(returnFiber, child2);
              });
            }
            return resultingFirstChild;
          }
          function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, lanes) {
            var iteratorFn = getIteratorFn(newChildrenIterable);
            if (!(typeof iteratorFn === "function")) {
              {
                throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            {
              if (typeof Symbol === "function" && newChildrenIterable[Symbol.toStringTag] === "Generator") {
                if (!didWarnAboutGenerators) {
                  error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                }
                didWarnAboutGenerators = true;
              }
              if (newChildrenIterable.entries === iteratorFn) {
                if (!didWarnAboutMaps) {
                  error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
              var _newChildren = iteratorFn.call(newChildrenIterable);
              if (_newChildren) {
                var knownKeys = null;
                var _step = _newChildren.next();
                for (; !_step.done; _step = _newChildren.next()) {
                  var child = _step.value;
                  knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
                }
              }
            }
            var newChildren = iteratorFn.call(newChildrenIterable);
            if (!(newChildren != null)) {
              {
                throw Error("An iterable object provided no iterator.");
              }
            }
            var resultingFirstChild = null;
            var previousNewFiber = null;
            var oldFiber = currentFirstChild;
            var lastPlacedIndex = 0;
            var newIdx = 0;
            var nextOldFiber = null;
            var step = newChildren.next();
            for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
              if (oldFiber.index > newIdx) {
                nextOldFiber = oldFiber;
                oldFiber = null;
              } else {
                nextOldFiber = oldFiber.sibling;
              }
              var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
              if (newFiber === null) {
                if (oldFiber === null) {
                  oldFiber = nextOldFiber;
                }
                break;
              }
              if (shouldTrackSideEffects) {
                if (oldFiber && newFiber.alternate === null) {
                  deleteChild(returnFiber, oldFiber);
                }
              }
              lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
              if (previousNewFiber === null) {
                resultingFirstChild = newFiber;
              } else {
                previousNewFiber.sibling = newFiber;
              }
              previousNewFiber = newFiber;
              oldFiber = nextOldFiber;
            }
            if (step.done) {
              deleteRemainingChildren(returnFiber, oldFiber);
              return resultingFirstChild;
            }
            if (oldFiber === null) {
              for (; !step.done; newIdx++, step = newChildren.next()) {
                var _newFiber3 = createChild(returnFiber, step.value, lanes);
                if (_newFiber3 === null) {
                  continue;
                }
                lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber3;
                } else {
                  previousNewFiber.sibling = _newFiber3;
                }
                previousNewFiber = _newFiber3;
              }
              return resultingFirstChild;
            }
            var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
            for (; !step.done; newIdx++, step = newChildren.next()) {
              var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, lanes);
              if (_newFiber4 !== null) {
                if (shouldTrackSideEffects) {
                  if (_newFiber4.alternate !== null) {
                    existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
                  }
                }
                lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber4;
                } else {
                  previousNewFiber.sibling = _newFiber4;
                }
                previousNewFiber = _newFiber4;
              }
            }
            if (shouldTrackSideEffects) {
              existingChildren.forEach(function(child2) {
                return deleteChild(returnFiber, child2);
              });
            }
            return resultingFirstChild;
          }
          function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, lanes) {
            if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
              deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
              var existing = useFiber(currentFirstChild, textContent);
              existing.return = returnFiber;
              return existing;
            }
            deleteRemainingChildren(returnFiber, currentFirstChild);
            var created = createFiberFromText(textContent, returnFiber.mode, lanes);
            created.return = returnFiber;
            return created;
          }
          function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
            var key = element.key;
            var child = currentFirstChild;
            while (child !== null) {
              if (child.key === key) {
                switch (child.tag) {
                  case Fragment: {
                    if (element.type === REACT_FRAGMENT_TYPE) {
                      deleteRemainingChildren(returnFiber, child.sibling);
                      var existing = useFiber(child, element.props.children);
                      existing.return = returnFiber;
                      {
                        existing._debugSource = element._source;
                        existing._debugOwner = element._owner;
                      }
                      return existing;
                    }
                    break;
                  }
                  case Block:
                  default: {
                    if (child.elementType === element.type || isCompatibleFamilyForHotReloading(child, element)) {
                      deleteRemainingChildren(returnFiber, child.sibling);
                      var _existing3 = useFiber(child, element.props);
                      _existing3.ref = coerceRef(returnFiber, child, element);
                      _existing3.return = returnFiber;
                      {
                        _existing3._debugSource = element._source;
                        _existing3._debugOwner = element._owner;
                      }
                      return _existing3;
                    }
                    break;
                  }
                }
                deleteRemainingChildren(returnFiber, child);
                break;
              } else {
                deleteChild(returnFiber, child);
              }
              child = child.sibling;
            }
            if (element.type === REACT_FRAGMENT_TYPE) {
              var created = createFiberFromFragment(element.props.children, returnFiber.mode, lanes, element.key);
              created.return = returnFiber;
              return created;
            } else {
              var _created4 = createFiberFromElement(element, returnFiber.mode, lanes);
              _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
              _created4.return = returnFiber;
              return _created4;
            }
          }
          function reconcileSinglePortal(returnFiber, currentFirstChild, portal, lanes) {
            var key = portal.key;
            var child = currentFirstChild;
            while (child !== null) {
              if (child.key === key) {
                if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
                  deleteRemainingChildren(returnFiber, child.sibling);
                  var existing = useFiber(child, portal.children || []);
                  existing.return = returnFiber;
                  return existing;
                } else {
                  deleteRemainingChildren(returnFiber, child);
                  break;
                }
              } else {
                deleteChild(returnFiber, child);
              }
              child = child.sibling;
            }
            var created = createFiberFromPortal(portal, returnFiber.mode, lanes);
            created.return = returnFiber;
            return created;
          }
          function reconcileChildFibers2(returnFiber, currentFirstChild, newChild, lanes) {
            var isUnkeyedTopLevelFragment = typeof newChild === "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
            if (isUnkeyedTopLevelFragment) {
              newChild = newChild.props.children;
            }
            var isObject = typeof newChild === "object" && newChild !== null;
            if (isObject) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                  return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes));
                case REACT_PORTAL_TYPE:
                  return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, lanes));
              }
            }
            if (typeof newChild === "string" || typeof newChild === "number") {
              return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, "" + newChild, lanes));
            }
            if (isArray$1(newChild)) {
              return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
            }
            if (getIteratorFn(newChild)) {
              return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
            }
            if (isObject) {
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType(returnFiber);
              }
            }
            if (typeof newChild === "undefined" && !isUnkeyedTopLevelFragment) {
              switch (returnFiber.tag) {
                case ClassComponent: {
                  {
                    var instance = returnFiber.stateNode;
                    if (instance.render._isMockFunction) {
                      break;
                    }
                  }
                }
                case Block:
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  {
                    {
                      throw Error((getComponentName(returnFiber.type) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
                    }
                  }
                }
              }
            }
            return deleteRemainingChildren(returnFiber, currentFirstChild);
          }
          return reconcileChildFibers2;
        }
        var reconcileChildFibers = ChildReconciler(true);
        var mountChildFibers = ChildReconciler(false);
        function cloneChildFibers(current2, workInProgress2) {
          if (!(current2 === null || workInProgress2.child === current2.child)) {
            {
              throw Error("Resuming work not yet implemented.");
            }
          }
          if (workInProgress2.child === null) {
            return;
          }
          var currentChild = workInProgress2.child;
          var newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
          workInProgress2.child = newChild;
          newChild.return = workInProgress2;
          while (currentChild.sibling !== null) {
            currentChild = currentChild.sibling;
            newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps);
            newChild.return = workInProgress2;
          }
          newChild.sibling = null;
        }
        function resetChildFibers(workInProgress2, lanes) {
          var child = workInProgress2.child;
          while (child !== null) {
            resetWorkInProgress(child, lanes);
            child = child.sibling;
          }
        }
        var NO_CONTEXT$1 = {};
        var contextStackCursor$1 = createCursor(NO_CONTEXT$1);
        var contextFiberStackCursor = createCursor(NO_CONTEXT$1);
        var rootInstanceStackCursor = createCursor(NO_CONTEXT$1);
        function requiredContext(c) {
          if (!(c !== NO_CONTEXT$1)) {
            {
              throw Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          return c;
        }
        function getRootHostContainer() {
          var rootInstance = requiredContext(rootInstanceStackCursor.current);
          return rootInstance;
        }
        function pushHostContainer(fiber, nextRootInstance) {
          push(rootInstanceStackCursor, nextRootInstance, fiber);
          push(contextFiberStackCursor, fiber, fiber);
          push(contextStackCursor$1, NO_CONTEXT$1, fiber);
          var nextRootContext = getRootHostContext();
          pop(contextStackCursor$1, fiber);
          push(contextStackCursor$1, nextRootContext, fiber);
        }
        function popHostContainer(fiber) {
          pop(contextStackCursor$1, fiber);
          pop(contextFiberStackCursor, fiber);
          pop(rootInstanceStackCursor, fiber);
        }
        function getHostContext() {
          var context = requiredContext(contextStackCursor$1.current);
          return context;
        }
        function pushHostContext(fiber) {
          var rootInstance = requiredContext(rootInstanceStackCursor.current);
          var context = requiredContext(contextStackCursor$1.current);
          var nextContext = getChildHostContext(context, fiber.type);
          if (context === nextContext) {
            return;
          }
          push(contextFiberStackCursor, fiber, fiber);
          push(contextStackCursor$1, nextContext, fiber);
        }
        function popHostContext(fiber) {
          if (contextFiberStackCursor.current !== fiber) {
            return;
          }
          pop(contextStackCursor$1, fiber);
          pop(contextFiberStackCursor, fiber);
        }
        var DefaultSuspenseContext = 0;
        var SubtreeSuspenseContextMask = 1;
        var InvisibleParentSuspenseContext = 1;
        var ForceSuspenseFallback = 2;
        var suspenseStackCursor = createCursor(DefaultSuspenseContext);
        function hasSuspenseContext(parentContext, flag) {
          return (parentContext & flag) !== 0;
        }
        function setDefaultShallowSuspenseContext(parentContext) {
          return parentContext & SubtreeSuspenseContextMask;
        }
        function setShallowSuspenseContext(parentContext, shallowContext) {
          return parentContext & SubtreeSuspenseContextMask | shallowContext;
        }
        function addSubtreeSuspenseContext(parentContext, subtreeContext) {
          return parentContext | subtreeContext;
        }
        function pushSuspenseContext(fiber, newContext) {
          push(suspenseStackCursor, newContext, fiber);
        }
        function popSuspenseContext(fiber) {
          pop(suspenseStackCursor, fiber);
        }
        function shouldCaptureSuspense(workInProgress2, hasInvisibleParent) {
          var nextState = workInProgress2.memoizedState;
          if (nextState !== null) {
            if (nextState.dehydrated !== null) {
              return true;
            }
            return false;
          }
          var props = workInProgress2.memoizedProps;
          if (props.fallback === void 0) {
            return false;
          }
          if (props.unstable_avoidThisFallback !== true) {
            return true;
          }
          if (hasInvisibleParent) {
            return false;
          }
          return true;
        }
        function findFirstSuspended(row) {
          var node = row;
          while (node !== null) {
            if (node.tag === SuspenseComponent) {
              var state = node.memoizedState;
              if (state !== null) {
                var dehydrated = state.dehydrated;
                if (dehydrated === null || isSuspenseInstancePending() || isSuspenseInstanceFallback()) {
                  return node;
                }
              }
            } else if (node.tag === SuspenseListComponent && node.memoizedProps.revealOrder !== void 0) {
              var didSuspend = (node.flags & DidCapture) !== NoFlags;
              if (didSuspend) {
                return node;
              }
            } else if (node.child !== null) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === row) {
              return null;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === row) {
                return null;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
          return null;
        }
        var NoFlags$1 = 0;
        var HasEffect = 1;
        var Layout = 2;
        var Passive$1 = 4;
        var isHydrating = false;
        function enterHydrationState(fiber) {
          {
            return false;
          }
        }
        function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
          {
            {
              {
                throw Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
        }
        function prepareToHydrateHostTextInstance(fiber) {
          {
            {
              {
                throw Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          var shouldUpdate = hydrateTextInstance();
        }
        function popHydrationState(fiber) {
          {
            return false;
          }
        }
        function getIsHydrating() {
          return isHydrating;
        }
        var workInProgressSources = [];
        var rendererSigil$1;
        {
          rendererSigil$1 = {};
        }
        function markSourceAsDirty(mutableSource) {
          workInProgressSources.push(mutableSource);
        }
        function resetWorkInProgressVersions() {
          for (var i = 0; i < workInProgressSources.length; i++) {
            var mutableSource = workInProgressSources[i];
            {
              mutableSource._workInProgressVersionSecondary = null;
            }
          }
          workInProgressSources.length = 0;
        }
        function getWorkInProgressVersion(mutableSource) {
          {
            return mutableSource._workInProgressVersionSecondary;
          }
        }
        function setWorkInProgressVersion(mutableSource, version) {
          {
            mutableSource._workInProgressVersionSecondary = version;
          }
          workInProgressSources.push(mutableSource);
        }
        function warnAboutMultipleRenderersDEV(mutableSource) {
          {
            {
              if (mutableSource._currentSecondaryRenderer == null) {
                mutableSource._currentSecondaryRenderer = rendererSigil$1;
              } else if (mutableSource._currentSecondaryRenderer !== rendererSigil$1) {
                error("Detected multiple renderers concurrently rendering the same mutable source. This is currently unsupported.");
              }
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig;
        var didWarnAboutMismatchedHooksForComponent;
        var didWarnAboutUseOpaqueIdentifier;
        {
          didWarnAboutUseOpaqueIdentifier = {};
          didWarnAboutMismatchedHooksForComponent = /* @__PURE__ */ new Set();
        }
        var renderLanes = NoLanes;
        var currentlyRenderingFiber$1 = null;
        var currentHook = null;
        var workInProgressHook = null;
        var didScheduleRenderPhaseUpdate = false;
        var didScheduleRenderPhaseUpdateDuringThisPass = false;
        var RE_RENDER_LIMIT = 25;
        var currentHookNameInDev = null;
        var hookTypesDev = null;
        var hookTypesUpdateIndexDev = -1;
        var ignorePreviousDependencies = false;
        function mountHookTypesDev() {
          {
            var hookName = currentHookNameInDev;
            if (hookTypesDev === null) {
              hookTypesDev = [hookName];
            } else {
              hookTypesDev.push(hookName);
            }
          }
        }
        function updateHookTypesDev() {
          {
            var hookName = currentHookNameInDev;
            if (hookTypesDev !== null) {
              hookTypesUpdateIndexDev++;
              if (hookTypesDev[hookTypesUpdateIndexDev] !== hookName) {
                warnOnHookMismatchInDev(hookName);
              }
            }
          }
        }
        function checkDepsAreArrayDev(deps) {
          {
            if (deps !== void 0 && deps !== null && !Array.isArray(deps)) {
              error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", currentHookNameInDev, typeof deps);
            }
          }
        }
        function warnOnHookMismatchInDev(currentHookName) {
          {
            var componentName = getComponentName(currentlyRenderingFiber$1.type);
            if (!didWarnAboutMismatchedHooksForComponent.has(componentName)) {
              didWarnAboutMismatchedHooksForComponent.add(componentName);
              if (hookTypesDev !== null) {
                var table = "";
                var secondColumnStart = 30;
                for (var i = 0; i <= hookTypesUpdateIndexDev; i++) {
                  var oldHookName = hookTypesDev[i];
                  var newHookName = i === hookTypesUpdateIndexDev ? currentHookName : oldHookName;
                  var row = i + 1 + ". " + oldHookName;
                  while (row.length < secondColumnStart) {
                    row += " ";
                  }
                  row += newHookName + "\n";
                  table += row;
                }
                error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", componentName, table);
              }
            }
          }
        }
        function throwInvalidHookError() {
          {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          {
            if (ignorePreviousDependencies) {
              return false;
            }
          }
          if (prevDeps === null) {
            {
              error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
            }
            return false;
          }
          {
            if (nextDeps.length !== prevDeps.length) {
              error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + prevDeps.join(", ") + "]", "[" + nextDeps.join(", ") + "]");
            }
          }
          for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
            if (objectIs(nextDeps[i], prevDeps[i])) {
              continue;
            }
            return false;
          }
          return true;
        }
        function renderWithHooks(current2, workInProgress2, Component, props, secondArg, nextRenderLanes) {
          renderLanes = nextRenderLanes;
          currentlyRenderingFiber$1 = workInProgress2;
          {
            hookTypesDev = current2 !== null ? current2._debugHookTypes : null;
            hookTypesUpdateIndexDev = -1;
            ignorePreviousDependencies = current2 !== null && current2.type !== workInProgress2.type;
          }
          workInProgress2.memoizedState = null;
          workInProgress2.updateQueue = null;
          workInProgress2.lanes = NoLanes;
          {
            if (current2 !== null && current2.memoizedState !== null) {
              ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;
            } else if (hookTypesDev !== null) {
              ReactCurrentDispatcher$1.current = HooksDispatcherOnMountWithHookTypesInDEV;
            } else {
              ReactCurrentDispatcher$1.current = HooksDispatcherOnMountInDEV;
            }
          }
          var children = Component(props, secondArg);
          if (didScheduleRenderPhaseUpdateDuringThisPass) {
            var numberOfReRenders = 0;
            do {
              didScheduleRenderPhaseUpdateDuringThisPass = false;
              if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
                {
                  throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
                }
              }
              numberOfReRenders += 1;
              {
                ignorePreviousDependencies = false;
              }
              currentHook = null;
              workInProgressHook = null;
              workInProgress2.updateQueue = null;
              {
                hookTypesUpdateIndexDev = -1;
              }
              ReactCurrentDispatcher$1.current = HooksDispatcherOnRerenderInDEV;
              children = Component(props, secondArg);
            } while (didScheduleRenderPhaseUpdateDuringThisPass);
          }
          ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
          {
            workInProgress2._debugHookTypes = hookTypesDev;
          }
          var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
          renderLanes = NoLanes;
          currentlyRenderingFiber$1 = null;
          currentHook = null;
          workInProgressHook = null;
          {
            currentHookNameInDev = null;
            hookTypesDev = null;
            hookTypesUpdateIndexDev = -1;
          }
          didScheduleRenderPhaseUpdate = false;
          if (!!didRenderTooFewHooks) {
            {
              throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
            }
          }
          return children;
        }
        function bailoutHooks(current2, workInProgress2, lanes) {
          workInProgress2.updateQueue = current2.updateQueue;
          workInProgress2.flags &= ~(Passive | Update);
          current2.lanes = removeLanes(current2.lanes, lanes);
        }
        function resetHooksAfterThrow() {
          ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
          if (didScheduleRenderPhaseUpdate) {
            var hook = currentlyRenderingFiber$1.memoizedState;
            while (hook !== null) {
              var queue = hook.queue;
              if (queue !== null) {
                queue.pending = null;
              }
              hook = hook.next;
            }
            didScheduleRenderPhaseUpdate = false;
          }
          renderLanes = NoLanes;
          currentlyRenderingFiber$1 = null;
          currentHook = null;
          workInProgressHook = null;
          {
            hookTypesDev = null;
            hookTypesUpdateIndexDev = -1;
            currentHookNameInDev = null;
            isUpdatingOpaqueValueInRenderPhase = false;
          }
          didScheduleRenderPhaseUpdateDuringThisPass = false;
        }
        function mountWorkInProgressHook() {
          var hook = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
          };
          if (workInProgressHook === null) {
            currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook;
          } else {
            workInProgressHook = workInProgressHook.next = hook;
          }
          return workInProgressHook;
        }
        function updateWorkInProgressHook() {
          var nextCurrentHook;
          if (currentHook === null) {
            var current2 = currentlyRenderingFiber$1.alternate;
            if (current2 !== null) {
              nextCurrentHook = current2.memoizedState;
            } else {
              nextCurrentHook = null;
            }
          } else {
            nextCurrentHook = currentHook.next;
          }
          var nextWorkInProgressHook;
          if (workInProgressHook === null) {
            nextWorkInProgressHook = currentlyRenderingFiber$1.memoizedState;
          } else {
            nextWorkInProgressHook = workInProgressHook.next;
          }
          if (nextWorkInProgressHook !== null) {
            workInProgressHook = nextWorkInProgressHook;
            nextWorkInProgressHook = workInProgressHook.next;
            currentHook = nextCurrentHook;
          } else {
            if (!(nextCurrentHook !== null)) {
              {
                throw Error("Rendered more hooks than during the previous render.");
              }
            }
            currentHook = nextCurrentHook;
            var newHook = {
              memoizedState: currentHook.memoizedState,
              baseState: currentHook.baseState,
              baseQueue: currentHook.baseQueue,
              queue: currentHook.queue,
              next: null
            };
            if (workInProgressHook === null) {
              currentlyRenderingFiber$1.memoizedState = workInProgressHook = newHook;
            } else {
              workInProgressHook = workInProgressHook.next = newHook;
            }
          }
          return workInProgressHook;
        }
        function createFunctionComponentUpdateQueue() {
          return {
            lastEffect: null
          };
        }
        function basicStateReducer(state, action) {
          return typeof action === "function" ? action(state) : action;
        }
        function mountReducer(reducer, initialArg, init) {
          var hook = mountWorkInProgressHook();
          var initialState;
          if (init !== void 0) {
            initialState = init(initialArg);
          } else {
            initialState = initialArg;
          }
          hook.memoizedState = hook.baseState = initialState;
          var queue = hook.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
          };
          var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
          return [hook.memoizedState, dispatch];
        }
        function updateReducer(reducer, initialArg, init) {
          var hook = updateWorkInProgressHook();
          var queue = hook.queue;
          if (!(queue !== null)) {
            {
              throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");
            }
          }
          queue.lastRenderedReducer = reducer;
          var current2 = currentHook;
          var baseQueue = current2.baseQueue;
          var pendingQueue = queue.pending;
          if (pendingQueue !== null) {
            if (baseQueue !== null) {
              var baseFirst = baseQueue.next;
              var pendingFirst = pendingQueue.next;
              baseQueue.next = pendingFirst;
              pendingQueue.next = baseFirst;
            }
            {
              if (current2.baseQueue !== baseQueue) {
                error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React.");
              }
            }
            current2.baseQueue = baseQueue = pendingQueue;
            queue.pending = null;
          }
          if (baseQueue !== null) {
            var first = baseQueue.next;
            var newState = current2.baseState;
            var newBaseState = null;
            var newBaseQueueFirst = null;
            var newBaseQueueLast = null;
            var update = first;
            do {
              var updateLane = update.lane;
              if (!isSubsetOfLanes(renderLanes, updateLane)) {
                var clone = {
                  lane: updateLane,
                  action: update.action,
                  eagerReducer: update.eagerReducer,
                  eagerState: update.eagerState,
                  next: null
                };
                if (newBaseQueueLast === null) {
                  newBaseQueueFirst = newBaseQueueLast = clone;
                  newBaseState = newState;
                } else {
                  newBaseQueueLast = newBaseQueueLast.next = clone;
                }
                currentlyRenderingFiber$1.lanes = mergeLanes(currentlyRenderingFiber$1.lanes, updateLane);
                markSkippedUpdateLanes(updateLane);
              } else {
                if (newBaseQueueLast !== null) {
                  var _clone = {
                    lane: NoLane,
                    action: update.action,
                    eagerReducer: update.eagerReducer,
                    eagerState: update.eagerState,
                    next: null
                  };
                  newBaseQueueLast = newBaseQueueLast.next = _clone;
                }
                if (update.eagerReducer === reducer) {
                  newState = update.eagerState;
                } else {
                  var action = update.action;
                  newState = reducer(newState, action);
                }
              }
              update = update.next;
            } while (update !== null && update !== first);
            if (newBaseQueueLast === null) {
              newBaseState = newState;
            } else {
              newBaseQueueLast.next = newBaseQueueFirst;
            }
            if (!objectIs(newState, hook.memoizedState)) {
              markWorkInProgressReceivedUpdate();
            }
            hook.memoizedState = newState;
            hook.baseState = newBaseState;
            hook.baseQueue = newBaseQueueLast;
            queue.lastRenderedState = newState;
          }
          var dispatch = queue.dispatch;
          return [hook.memoizedState, dispatch];
        }
        function rerenderReducer(reducer, initialArg, init) {
          var hook = updateWorkInProgressHook();
          var queue = hook.queue;
          if (!(queue !== null)) {
            {
              throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");
            }
          }
          queue.lastRenderedReducer = reducer;
          var dispatch = queue.dispatch;
          var lastRenderPhaseUpdate = queue.pending;
          var newState = hook.memoizedState;
          if (lastRenderPhaseUpdate !== null) {
            queue.pending = null;
            var firstRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            var update = firstRenderPhaseUpdate;
            do {
              var action = update.action;
              newState = reducer(newState, action);
              update = update.next;
            } while (update !== firstRenderPhaseUpdate);
            if (!objectIs(newState, hook.memoizedState)) {
              markWorkInProgressReceivedUpdate();
            }
            hook.memoizedState = newState;
            if (hook.baseQueue === null) {
              hook.baseState = newState;
            }
            queue.lastRenderedState = newState;
          }
          return [newState, dispatch];
        }
        function readFromUnsubcribedMutableSource(root, source, getSnapshot) {
          {
            warnAboutMultipleRenderersDEV(source);
          }
          var getVersion = source._getVersion;
          var version = getVersion(source._source);
          var isSafeToReadFromSource = false;
          var currentRenderVersion = getWorkInProgressVersion(source);
          if (currentRenderVersion !== null) {
            isSafeToReadFromSource = currentRenderVersion === version;
          } else {
            isSafeToReadFromSource = isSubsetOfLanes(renderLanes, root.mutableReadLanes);
            if (isSafeToReadFromSource) {
              setWorkInProgressVersion(source, version);
            }
          }
          if (isSafeToReadFromSource) {
            var snapshot = getSnapshot(source._source);
            {
              if (typeof snapshot === "function") {
                error("Mutable source should not return a function as the snapshot value. Functions may close over mutable values and cause tearing.");
              }
            }
            return snapshot;
          } else {
            markSourceAsDirty(source);
            {
              {
                throw Error("Cannot read from mutable source during the current render without tearing. This is a bug in React. Please file an issue.");
              }
            }
          }
        }
        function useMutableSource(hook, source, getSnapshot, subscribe) {
          var root = getWorkInProgressRoot();
          if (!(root !== null)) {
            {
              throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
            }
          }
          var getVersion = source._getVersion;
          var version = getVersion(source._source);
          var dispatcher = ReactCurrentDispatcher$1.current;
          var _dispatcher$useState = dispatcher.useState(function() {
            return readFromUnsubcribedMutableSource(root, source, getSnapshot);
          }), currentSnapshot = _dispatcher$useState[0], setSnapshot = _dispatcher$useState[1];
          var snapshot = currentSnapshot;
          var stateHook = workInProgressHook;
          var memoizedState = hook.memoizedState;
          var refs = memoizedState.refs;
          var prevGetSnapshot = refs.getSnapshot;
          var prevSource = memoizedState.source;
          var prevSubscribe = memoizedState.subscribe;
          var fiber = currentlyRenderingFiber$1;
          hook.memoizedState = {
            refs,
            source,
            subscribe
          };
          dispatcher.useEffect(function() {
            refs.getSnapshot = getSnapshot;
            refs.setSnapshot = setSnapshot;
            var maybeNewVersion = getVersion(source._source);
            if (!objectIs(version, maybeNewVersion)) {
              var maybeNewSnapshot = getSnapshot(source._source);
              {
                if (typeof maybeNewSnapshot === "function") {
                  error("Mutable source should not return a function as the snapshot value. Functions may close over mutable values and cause tearing.");
                }
              }
              if (!objectIs(snapshot, maybeNewSnapshot)) {
                setSnapshot(maybeNewSnapshot);
                var lane = requestUpdateLane(fiber);
                markRootMutableRead(root, lane);
              }
              markRootEntangled(root, root.mutableReadLanes);
            }
          }, [getSnapshot, source, subscribe]);
          dispatcher.useEffect(function() {
            var handleChange = function() {
              var latestGetSnapshot = refs.getSnapshot;
              var latestSetSnapshot = refs.setSnapshot;
              try {
                latestSetSnapshot(latestGetSnapshot(source._source));
                var lane = requestUpdateLane(fiber);
                markRootMutableRead(root, lane);
              } catch (error2) {
                latestSetSnapshot(function() {
                  throw error2;
                });
              }
            };
            var unsubscribe = subscribe(source._source, handleChange);
            {
              if (typeof unsubscribe !== "function") {
                error("Mutable source subscribe function must return an unsubscribe function.");
              }
            }
            return unsubscribe;
          }, [source, subscribe]);
          if (!objectIs(prevGetSnapshot, getSnapshot) || !objectIs(prevSource, source) || !objectIs(prevSubscribe, subscribe)) {
            var newQueue = {
              pending: null,
              dispatch: null,
              lastRenderedReducer: basicStateReducer,
              lastRenderedState: snapshot
            };
            newQueue.dispatch = setSnapshot = dispatchAction.bind(null, currentlyRenderingFiber$1, newQueue);
            stateHook.queue = newQueue;
            stateHook.baseQueue = null;
            snapshot = readFromUnsubcribedMutableSource(root, source, getSnapshot);
            stateHook.memoizedState = stateHook.baseState = snapshot;
          }
          return snapshot;
        }
        function mountMutableSource(source, getSnapshot, subscribe) {
          var hook = mountWorkInProgressHook();
          hook.memoizedState = {
            refs: {
              getSnapshot,
              setSnapshot: null
            },
            source,
            subscribe
          };
          return useMutableSource(hook, source, getSnapshot, subscribe);
        }
        function updateMutableSource(source, getSnapshot, subscribe) {
          var hook = updateWorkInProgressHook();
          return useMutableSource(hook, source, getSnapshot, subscribe);
        }
        function mountState(initialState) {
          var hook = mountWorkInProgressHook();
          if (typeof initialState === "function") {
            initialState = initialState();
          }
          hook.memoizedState = hook.baseState = initialState;
          var queue = hook.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialState
          };
          var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
          return [hook.memoizedState, dispatch];
        }
        function updateState(initialState) {
          return updateReducer(basicStateReducer);
        }
        function rerenderState(initialState) {
          return rerenderReducer(basicStateReducer);
        }
        function pushEffect(tag, create3, destroy, deps) {
          var effect = {
            tag,
            create: create3,
            destroy,
            deps,
            next: null
          };
          var componentUpdateQueue = currentlyRenderingFiber$1.updateQueue;
          if (componentUpdateQueue === null) {
            componentUpdateQueue = createFunctionComponentUpdateQueue();
            currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
            componentUpdateQueue.lastEffect = effect.next = effect;
          } else {
            var lastEffect = componentUpdateQueue.lastEffect;
            if (lastEffect === null) {
              componentUpdateQueue.lastEffect = effect.next = effect;
            } else {
              var firstEffect = lastEffect.next;
              lastEffect.next = effect;
              effect.next = firstEffect;
              componentUpdateQueue.lastEffect = effect;
            }
          }
          return effect;
        }
        function mountRef(initialValue) {
          var hook = mountWorkInProgressHook();
          var ref = {
            current: initialValue
          };
          {
            Object.seal(ref);
          }
          hook.memoizedState = ref;
          return ref;
        }
        function updateRef(initialValue) {
          var hook = updateWorkInProgressHook();
          return hook.memoizedState;
        }
        function mountEffectImpl(fiberFlags, hookFlags, create3, deps) {
          var hook = mountWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          currentlyRenderingFiber$1.flags |= fiberFlags;
          hook.memoizedState = pushEffect(HasEffect | hookFlags, create3, void 0, nextDeps);
        }
        function updateEffectImpl(fiberFlags, hookFlags, create3, deps) {
          var hook = updateWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var destroy = void 0;
          if (currentHook !== null) {
            var prevEffect = currentHook.memoizedState;
            destroy = prevEffect.destroy;
            if (nextDeps !== null) {
              var prevDeps = prevEffect.deps;
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                pushEffect(hookFlags, create3, destroy, nextDeps);
                return;
              }
            }
          }
          currentlyRenderingFiber$1.flags |= fiberFlags;
          hook.memoizedState = pushEffect(HasEffect | hookFlags, create3, destroy, nextDeps);
        }
        function mountEffect(create3, deps) {
          {
            if (typeof jest !== "undefined") {
              warnIfNotCurrentlyActingEffectsInDEV(currentlyRenderingFiber$1);
            }
          }
          return mountEffectImpl(Update | Passive, Passive$1, create3, deps);
        }
        function updateEffect(create3, deps) {
          {
            if (typeof jest !== "undefined") {
              warnIfNotCurrentlyActingEffectsInDEV(currentlyRenderingFiber$1);
            }
          }
          return updateEffectImpl(Update | Passive, Passive$1, create3, deps);
        }
        function mountLayoutEffect(create3, deps) {
          return mountEffectImpl(Update, Layout, create3, deps);
        }
        function updateLayoutEffect(create3, deps) {
          return updateEffectImpl(Update, Layout, create3, deps);
        }
        function imperativeHandleEffect(create3, ref) {
          if (typeof ref === "function") {
            var refCallback = ref;
            var _inst = create3();
            refCallback(_inst);
            return function() {
              refCallback(null);
            };
          } else if (ref !== null && ref !== void 0) {
            var refObject = ref;
            {
              if (!refObject.hasOwnProperty("current")) {
                error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(refObject).join(", ") + "}");
              }
            }
            var _inst2 = create3();
            refObject.current = _inst2;
            return function() {
              refObject.current = null;
            };
          }
        }
        function mountImperativeHandle(ref, create3, deps) {
          {
            if (typeof create3 !== "function") {
              error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", create3 !== null ? typeof create3 : "null");
            }
          }
          var effectDeps = deps !== null && deps !== void 0 ? deps.concat([ref]) : null;
          return mountEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create3, ref), effectDeps);
        }
        function updateImperativeHandle(ref, create3, deps) {
          {
            if (typeof create3 !== "function") {
              error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", create3 !== null ? typeof create3 : "null");
            }
          }
          var effectDeps = deps !== null && deps !== void 0 ? deps.concat([ref]) : null;
          return updateEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create3, ref), effectDeps);
        }
        function mountDebugValue(value, formatterFn) {
        }
        var updateDebugValue = mountDebugValue;
        function mountCallback(callback, deps) {
          var hook = mountWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          hook.memoizedState = [callback, nextDeps];
          return callback;
        }
        function updateCallback(callback, deps) {
          var hook = updateWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var prevState = hook.memoizedState;
          if (prevState !== null) {
            if (nextDeps !== null) {
              var prevDeps = prevState[1];
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
              }
            }
          }
          hook.memoizedState = [callback, nextDeps];
          return callback;
        }
        function mountMemo(nextCreate, deps) {
          var hook = mountWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var nextValue = nextCreate();
          hook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function updateMemo(nextCreate, deps) {
          var hook = updateWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var prevState = hook.memoizedState;
          if (prevState !== null) {
            if (nextDeps !== null) {
              var prevDeps = prevState[1];
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
              }
            }
          }
          var nextValue = nextCreate();
          hook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function mountDeferredValue(value) {
          var _mountState = mountState(value), prevValue = _mountState[0], setValue = _mountState[1];
          mountEffect(function() {
            var prevTransition = ReactCurrentBatchConfig$1.transition;
            ReactCurrentBatchConfig$1.transition = 1;
            try {
              setValue(value);
            } finally {
              ReactCurrentBatchConfig$1.transition = prevTransition;
            }
          }, [value]);
          return prevValue;
        }
        function updateDeferredValue(value) {
          var _updateState = updateState(), prevValue = _updateState[0], setValue = _updateState[1];
          updateEffect(function() {
            var prevTransition = ReactCurrentBatchConfig$1.transition;
            ReactCurrentBatchConfig$1.transition = 1;
            try {
              setValue(value);
            } finally {
              ReactCurrentBatchConfig$1.transition = prevTransition;
            }
          }, [value]);
          return prevValue;
        }
        function rerenderDeferredValue(value) {
          var _rerenderState = rerenderState(), prevValue = _rerenderState[0], setValue = _rerenderState[1];
          updateEffect(function() {
            var prevTransition = ReactCurrentBatchConfig$1.transition;
            ReactCurrentBatchConfig$1.transition = 1;
            try {
              setValue(value);
            } finally {
              ReactCurrentBatchConfig$1.transition = prevTransition;
            }
          }, [value]);
          return prevValue;
        }
        function startTransition(setPending, callback) {
          var priorityLevel = getCurrentPriorityLevel();
          {
            runWithPriority(priorityLevel < UserBlockingPriority$1 ? UserBlockingPriority$1 : priorityLevel, function() {
              setPending(true);
            });
            runWithPriority(priorityLevel > NormalPriority$1 ? NormalPriority$1 : priorityLevel, function() {
              var prevTransition = ReactCurrentBatchConfig$1.transition;
              ReactCurrentBatchConfig$1.transition = 1;
              try {
                setPending(false);
                callback();
              } finally {
                ReactCurrentBatchConfig$1.transition = prevTransition;
              }
            });
          }
        }
        function mountTransition() {
          var _mountState2 = mountState(false), isPending = _mountState2[0], setPending = _mountState2[1];
          var start = startTransition.bind(null, setPending);
          mountRef(start);
          return [start, isPending];
        }
        function updateTransition() {
          var _updateState2 = updateState(), isPending = _updateState2[0];
          var startRef = updateRef();
          var start = startRef.current;
          return [start, isPending];
        }
        function rerenderTransition() {
          var _rerenderState2 = rerenderState(), isPending = _rerenderState2[0];
          var startRef = updateRef();
          var start = startRef.current;
          return [start, isPending];
        }
        var isUpdatingOpaqueValueInRenderPhase = false;
        function getIsUpdatingOpaqueValueInRenderPhaseInDEV() {
          {
            return isUpdatingOpaqueValueInRenderPhase;
          }
        }
        function warnOnOpaqueIdentifierAccessInDEV(fiber) {
          {
            var name = getComponentName(fiber.type) || "Unknown";
            if (getIsRendering() && !didWarnAboutUseOpaqueIdentifier[name]) {
              error("The object passed back from useOpaqueIdentifier is meant to be passed through to attributes only. Do not read the value directly.");
              didWarnAboutUseOpaqueIdentifier[name] = true;
            }
          }
        }
        function mountOpaqueIdentifier() {
          var makeId = makeClientIdInDEV.bind(null, warnOnOpaqueIdentifierAccessInDEV.bind(null, currentlyRenderingFiber$1));
          {
            var _id = makeId();
            mountState(_id);
            return _id;
          }
        }
        function updateOpaqueIdentifier() {
          var id = updateState()[0];
          return id;
        }
        function rerenderOpaqueIdentifier() {
          var id = rerenderState()[0];
          return id;
        }
        function dispatchAction(fiber, queue, action) {
          {
            if (typeof arguments[3] === "function") {
              error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
            }
          }
          var eventTime = requestEventTime();
          var lane = requestUpdateLane(fiber);
          var update = {
            lane,
            action,
            eagerReducer: null,
            eagerState: null,
            next: null
          };
          var pending = queue.pending;
          if (pending === null) {
            update.next = update;
          } else {
            update.next = pending.next;
            pending.next = update;
          }
          queue.pending = update;
          var alternate = fiber.alternate;
          if (fiber === currentlyRenderingFiber$1 || alternate !== null && alternate === currentlyRenderingFiber$1) {
            didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
          } else {
            if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes)) {
              var lastRenderedReducer = queue.lastRenderedReducer;
              if (lastRenderedReducer !== null) {
                var prevDispatcher;
                {
                  prevDispatcher = ReactCurrentDispatcher$1.current;
                  ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                }
                try {
                  var currentState = queue.lastRenderedState;
                  var eagerState = lastRenderedReducer(currentState, action);
                  update.eagerReducer = lastRenderedReducer;
                  update.eagerState = eagerState;
                  if (objectIs(eagerState, currentState)) {
                    return;
                  }
                } catch (error2) {
                } finally {
                  {
                    ReactCurrentDispatcher$1.current = prevDispatcher;
                  }
                }
              }
            }
            {
              if (typeof jest !== "undefined") {
                warnIfNotScopedWithMatchingAct(fiber);
                warnIfNotCurrentlyActingUpdatesInDev(fiber);
              }
            }
            scheduleUpdateOnFiber(fiber, lane, eventTime);
          }
        }
        var ContextOnlyDispatcher = {
          readContext,
          useCallback: throwInvalidHookError,
          useContext: throwInvalidHookError,
          useEffect: throwInvalidHookError,
          useImperativeHandle: throwInvalidHookError,
          useLayoutEffect: throwInvalidHookError,
          useMemo: throwInvalidHookError,
          useReducer: throwInvalidHookError,
          useRef: throwInvalidHookError,
          useState: throwInvalidHookError,
          useDebugValue: throwInvalidHookError,
          useDeferredValue: throwInvalidHookError,
          useTransition: throwInvalidHookError,
          useMutableSource: throwInvalidHookError,
          useOpaqueIdentifier: throwInvalidHookError,
          unstable_isNewReconciler: enableNewReconciler
        };
        var HooksDispatcherOnMountInDEV = null;
        var HooksDispatcherOnMountWithHookTypesInDEV = null;
        var HooksDispatcherOnUpdateInDEV = null;
        var HooksDispatcherOnRerenderInDEV = null;
        var InvalidNestedHooksDispatcherOnMountInDEV = null;
        var InvalidNestedHooksDispatcherOnUpdateInDEV = null;
        var InvalidNestedHooksDispatcherOnRerenderInDEV = null;
        {
          var warnInvalidContextAccess = function() {
            error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          };
          var warnInvalidHookAccess = function() {
            error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
          };
          HooksDispatcherOnMountInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              mountHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              mountHookTypesDev();
              return mountRef(initialValue);
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              mountHookTypesDev();
              return mountDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              mountHookTypesDev();
              return mountDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              mountHookTypesDev();
              return mountTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              mountHookTypesDev();
              return mountMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              mountHookTypesDev();
              return mountOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
          HooksDispatcherOnMountWithHookTypesInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              updateHookTypesDev();
              return mountCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              updateHookTypesDev();
              return mountEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              updateHookTypesDev();
              return mountImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              updateHookTypesDev();
              return mountLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              updateHookTypesDev();
              return mountRef(initialValue);
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              updateHookTypesDev();
              return mountDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              updateHookTypesDev();
              return mountDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              updateHookTypesDev();
              return mountTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              updateHookTypesDev();
              return mountMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              updateHookTypesDev();
              return mountOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
          HooksDispatcherOnUpdateInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              updateHookTypesDev();
              return updateEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              updateHookTypesDev();
              return updateImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              updateHookTypesDev();
              return updateLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              updateHookTypesDev();
              return updateDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              updateHookTypesDev();
              return updateDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              updateHookTypesDev();
              return updateTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              updateHookTypesDev();
              return updateMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              updateHookTypesDev();
              return updateOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
          HooksDispatcherOnRerenderInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              updateHookTypesDev();
              return updateEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              updateHookTypesDev();
              return updateImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              updateHookTypesDev();
              return updateLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
              try {
                return updateMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
              try {
                return rerenderReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
              try {
                return rerenderState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              updateHookTypesDev();
              return updateDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              updateHookTypesDev();
              return rerenderDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              updateHookTypesDev();
              return rerenderTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              updateHookTypesDev();
              return updateMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              updateHookTypesDev();
              return rerenderOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
          InvalidNestedHooksDispatcherOnMountInDEV = {
            readContext: function(context, observedBits) {
              warnInvalidContextAccess();
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              warnInvalidHookAccess();
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              warnInvalidHookAccess();
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountRef(initialValue);
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              warnInvalidHookAccess();
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
          InvalidNestedHooksDispatcherOnUpdateInDEV = {
            readContext: function(context, observedBits) {
              warnInvalidContextAccess();
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
          InvalidNestedHooksDispatcherOnRerenderInDEV = {
            readContext: function(context, observedBits) {
              warnInvalidContextAccess();
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create3, deps) {
              currentHookNameInDev = "useEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateEffect(create3, deps);
            },
            useImperativeHandle: function(ref, create3, deps) {
              currentHookNameInDev = "useImperativeHandle";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateImperativeHandle(ref, create3, deps);
            },
            useLayoutEffect: function(create3, deps) {
              currentHookNameInDev = "useLayoutEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateLayoutEffect(create3, deps);
            },
            useMemo: function(create3, deps) {
              currentHookNameInDev = "useMemo";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateMemo(create3, deps);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return rerenderReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return rerenderState(initialState);
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateDebugValue();
            },
            useDeferredValue: function(value) {
              currentHookNameInDev = "useDeferredValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return rerenderDeferredValue(value);
            },
            useTransition: function() {
              currentHookNameInDev = "useTransition";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return rerenderTransition();
            },
            useMutableSource: function(source, getSnapshot, subscribe) {
              currentHookNameInDev = "useMutableSource";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateMutableSource(source, getSnapshot, subscribe);
            },
            useOpaqueIdentifier: function() {
              currentHookNameInDev = "useOpaqueIdentifier";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return rerenderOpaqueIdentifier();
            },
            unstable_isNewReconciler: enableNewReconciler
          };
        }
        var now$1 = Scheduler$1.unstable_now;
        var commitTime = 0;
        var profilerStartTime = -1;
        function getCommitTime() {
          return commitTime;
        }
        function recordCommitTime() {
          commitTime = now$1();
        }
        function startProfilerTimer(fiber) {
          profilerStartTime = now$1();
          if (fiber.actualStartTime < 0) {
            fiber.actualStartTime = now$1();
          }
        }
        function stopProfilerTimerIfRunning(fiber) {
          profilerStartTime = -1;
        }
        function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
          if (profilerStartTime >= 0) {
            var elapsedTime = now$1() - profilerStartTime;
            fiber.actualDuration += elapsedTime;
            if (overrideBaseTime) {
              fiber.selfBaseDuration = elapsedTime;
            }
            profilerStartTime = -1;
          }
        }
        function transferActualDuration(fiber) {
          var child = fiber.child;
          while (child) {
            fiber.actualDuration += child.actualDuration;
            child = child.sibling;
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var didReceiveUpdate = false;
        var didWarnAboutBadClass;
        var didWarnAboutModulePatternComponent;
        var didWarnAboutContextTypeOnFunctionComponent;
        var didWarnAboutGetDerivedStateOnFunctionComponent;
        var didWarnAboutFunctionRefs;
        var didWarnAboutReassigningProps;
        var didWarnAboutRevealOrder;
        var didWarnAboutTailOptions;
        {
          didWarnAboutBadClass = {};
          didWarnAboutModulePatternComponent = {};
          didWarnAboutContextTypeOnFunctionComponent = {};
          didWarnAboutGetDerivedStateOnFunctionComponent = {};
          didWarnAboutFunctionRefs = {};
          didWarnAboutReassigningProps = false;
          didWarnAboutRevealOrder = {};
          didWarnAboutTailOptions = {};
        }
        function reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2) {
          if (current2 === null) {
            workInProgress2.child = mountChildFibers(workInProgress2, null, nextChildren, renderLanes2);
          } else {
            workInProgress2.child = reconcileChildFibers(workInProgress2, current2.child, nextChildren, renderLanes2);
          }
        }
        function forceUnmountCurrentAndReconcile(current2, workInProgress2, nextChildren, renderLanes2) {
          workInProgress2.child = reconcileChildFibers(workInProgress2, current2.child, null, renderLanes2);
          workInProgress2.child = reconcileChildFibers(workInProgress2, null, nextChildren, renderLanes2);
        }
        function updateForwardRef(current2, workInProgress2, Component, nextProps, renderLanes2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var innerPropTypes = Component.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(Component));
              }
            }
          }
          var render2 = Component.render;
          var ref = workInProgress2.ref;
          var nextChildren;
          prepareToReadContext(workInProgress2, renderLanes2);
          {
            ReactCurrentOwner$1.current = workInProgress2;
            setIsRendering(true);
            nextChildren = renderWithHooks(current2, workInProgress2, render2, nextProps, ref, renderLanes2);
            setIsRendering(false);
          }
          if (current2 !== null && !didReceiveUpdate) {
            bailoutHooks(current2, workInProgress2, renderLanes2);
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
          }
          workInProgress2.flags |= PerformedWork;
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function updateMemoComponent(current2, workInProgress2, Component, nextProps, updateLanes, renderLanes2) {
          if (current2 === null) {
            var type = Component.type;
            if (isSimpleFunctionComponent(type) && Component.compare === null && Component.defaultProps === void 0) {
              var resolvedType = type;
              {
                resolvedType = resolveFunctionForHotReloading(type);
              }
              workInProgress2.tag = SimpleMemoComponent;
              workInProgress2.type = resolvedType;
              {
                validateFunctionComponentInDev(workInProgress2, type);
              }
              return updateSimpleMemoComponent(current2, workInProgress2, resolvedType, nextProps, updateLanes, renderLanes2);
            }
            {
              var innerPropTypes = type.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(type));
              }
            }
            var child = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress2, workInProgress2.mode, renderLanes2);
            child.ref = workInProgress2.ref;
            child.return = workInProgress2;
            workInProgress2.child = child;
            return child;
          }
          {
            var _type = Component.type;
            var _innerPropTypes = _type.propTypes;
            if (_innerPropTypes) {
              checkPropTypes(_innerPropTypes, nextProps, "prop", getComponentName(_type));
            }
          }
          var currentChild = current2.child;
          if (!includesSomeLane(updateLanes, renderLanes2)) {
            var prevProps = currentChild.memoizedProps;
            var compare = Component.compare;
            compare = compare !== null ? compare : shallowEqual;
            if (compare(prevProps, nextProps) && current2.ref === workInProgress2.ref) {
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
            }
          }
          workInProgress2.flags |= PerformedWork;
          var newChild = createWorkInProgress(currentChild, nextProps);
          newChild.ref = workInProgress2.ref;
          newChild.return = workInProgress2;
          workInProgress2.child = newChild;
          return newChild;
        }
        function updateSimpleMemoComponent(current2, workInProgress2, Component, nextProps, updateLanes, renderLanes2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var outerMemoType = workInProgress2.elementType;
              if (outerMemoType.$$typeof === REACT_LAZY_TYPE) {
                var lazyComponent = outerMemoType;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  outerMemoType = init(payload);
                } catch (x) {
                  outerMemoType = null;
                }
                var outerPropTypes = outerMemoType && outerMemoType.propTypes;
                if (outerPropTypes) {
                  checkPropTypes(outerPropTypes, nextProps, "prop", getComponentName(outerMemoType));
                }
              }
            }
          }
          if (current2 !== null) {
            var prevProps = current2.memoizedProps;
            if (shallowEqual(prevProps, nextProps) && current2.ref === workInProgress2.ref && workInProgress2.type === current2.type) {
              didReceiveUpdate = false;
              if (!includesSomeLane(renderLanes2, updateLanes)) {
                workInProgress2.lanes = current2.lanes;
                return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
              } else if ((current2.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
                didReceiveUpdate = true;
              }
            }
          }
          return updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderLanes2);
        }
        function updateOffscreenComponent(current2, workInProgress2, renderLanes2) {
          var nextProps = workInProgress2.pendingProps;
          var nextChildren = nextProps.children;
          var prevState = current2 !== null ? current2.memoizedState : null;
          if (nextProps.mode === "hidden" || nextProps.mode === "unstable-defer-without-hiding") {
            if ((workInProgress2.mode & ConcurrentMode) === NoMode) {
              var nextState = {
                baseLanes: NoLanes
              };
              workInProgress2.memoizedState = nextState;
              pushRenderLanes(workInProgress2, renderLanes2);
            } else if (!includesSomeLane(renderLanes2, OffscreenLane)) {
              var nextBaseLanes;
              if (prevState !== null) {
                var prevBaseLanes = prevState.baseLanes;
                nextBaseLanes = mergeLanes(prevBaseLanes, renderLanes2);
              } else {
                nextBaseLanes = renderLanes2;
              }
              {
                markSpawnedWork(OffscreenLane);
              }
              workInProgress2.lanes = workInProgress2.childLanes = laneToLanes(OffscreenLane);
              var _nextState = {
                baseLanes: nextBaseLanes
              };
              workInProgress2.memoizedState = _nextState;
              pushRenderLanes(workInProgress2, nextBaseLanes);
              return null;
            } else {
              var _nextState2 = {
                baseLanes: NoLanes
              };
              workInProgress2.memoizedState = _nextState2;
              var subtreeRenderLanes2 = prevState !== null ? prevState.baseLanes : renderLanes2;
              pushRenderLanes(workInProgress2, subtreeRenderLanes2);
            }
          } else {
            var _subtreeRenderLanes;
            if (prevState !== null) {
              _subtreeRenderLanes = mergeLanes(prevState.baseLanes, renderLanes2);
              workInProgress2.memoizedState = null;
            } else {
              _subtreeRenderLanes = renderLanes2;
            }
            pushRenderLanes(workInProgress2, _subtreeRenderLanes);
          }
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        var updateLegacyHiddenComponent = updateOffscreenComponent;
        function updateFragment(current2, workInProgress2, renderLanes2) {
          var nextChildren = workInProgress2.pendingProps;
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function updateMode(current2, workInProgress2, renderLanes2) {
          var nextChildren = workInProgress2.pendingProps.children;
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function updateProfiler(current2, workInProgress2, renderLanes2) {
          {
            workInProgress2.flags |= Update;
            var stateNode = workInProgress2.stateNode;
            stateNode.effectDuration = 0;
            stateNode.passiveEffectDuration = 0;
          }
          var nextProps = workInProgress2.pendingProps;
          var nextChildren = nextProps.children;
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function markRef(current2, workInProgress2) {
          var ref = workInProgress2.ref;
          if (current2 === null && ref !== null || current2 !== null && current2.ref !== ref) {
            workInProgress2.flags |= Ref;
          }
        }
        function updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var innerPropTypes = Component.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(Component));
              }
            }
          }
          var context;
          {
            var unmaskedContext = getUnmaskedContext(workInProgress2, Component, true);
            context = getMaskedContext(workInProgress2, unmaskedContext);
          }
          var nextChildren;
          prepareToReadContext(workInProgress2, renderLanes2);
          {
            ReactCurrentOwner$1.current = workInProgress2;
            setIsRendering(true);
            nextChildren = renderWithHooks(current2, workInProgress2, Component, nextProps, context, renderLanes2);
            setIsRendering(false);
          }
          if (current2 !== null && !didReceiveUpdate) {
            bailoutHooks(current2, workInProgress2, renderLanes2);
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
          }
          workInProgress2.flags |= PerformedWork;
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function updateClassComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var innerPropTypes = Component.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(Component));
              }
            }
          }
          var hasContext;
          if (isContextProvider(Component)) {
            hasContext = true;
            pushContextProvider(workInProgress2);
          } else {
            hasContext = false;
          }
          prepareToReadContext(workInProgress2, renderLanes2);
          var instance = workInProgress2.stateNode;
          var shouldUpdate;
          if (instance === null) {
            if (current2 !== null) {
              current2.alternate = null;
              workInProgress2.alternate = null;
              workInProgress2.flags |= Placement;
            }
            constructClassInstance(workInProgress2, Component, nextProps);
            mountClassInstance(workInProgress2, Component, nextProps, renderLanes2);
            shouldUpdate = true;
          } else if (current2 === null) {
            shouldUpdate = resumeMountClassInstance(workInProgress2, Component, nextProps, renderLanes2);
          } else {
            shouldUpdate = updateClassInstance(current2, workInProgress2, Component, nextProps, renderLanes2);
          }
          var nextUnitOfWork = finishClassComponent(current2, workInProgress2, Component, shouldUpdate, hasContext, renderLanes2);
          {
            var inst = workInProgress2.stateNode;
            if (shouldUpdate && inst.props !== nextProps) {
              if (!didWarnAboutReassigningProps) {
                error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentName(workInProgress2.type) || "a component");
              }
              didWarnAboutReassigningProps = true;
            }
          }
          return nextUnitOfWork;
        }
        function finishClassComponent(current2, workInProgress2, Component, shouldUpdate, hasContext, renderLanes2) {
          markRef(current2, workInProgress2);
          var didCaptureError = (workInProgress2.flags & DidCapture) !== NoFlags;
          if (!shouldUpdate && !didCaptureError) {
            if (hasContext) {
              invalidateContextProvider(workInProgress2, Component, false);
            }
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
          }
          var instance = workInProgress2.stateNode;
          ReactCurrentOwner$1.current = workInProgress2;
          var nextChildren;
          if (didCaptureError && typeof Component.getDerivedStateFromError !== "function") {
            nextChildren = null;
            {
              stopProfilerTimerIfRunning();
            }
          } else {
            {
              setIsRendering(true);
              nextChildren = instance.render();
              setIsRendering(false);
            }
          }
          workInProgress2.flags |= PerformedWork;
          if (current2 !== null && didCaptureError) {
            forceUnmountCurrentAndReconcile(current2, workInProgress2, nextChildren, renderLanes2);
          } else {
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          }
          workInProgress2.memoizedState = instance.state;
          if (hasContext) {
            invalidateContextProvider(workInProgress2, Component, true);
          }
          return workInProgress2.child;
        }
        function pushHostRootContext(workInProgress2) {
          var root = workInProgress2.stateNode;
          if (root.pendingContext) {
            pushTopLevelContextObject(workInProgress2, root.pendingContext, root.pendingContext !== root.context);
          } else if (root.context) {
            pushTopLevelContextObject(workInProgress2, root.context, false);
          }
          pushHostContainer(workInProgress2, root.containerInfo);
        }
        function updateHostRoot(current2, workInProgress2, renderLanes2) {
          pushHostRootContext(workInProgress2);
          var updateQueue = workInProgress2.updateQueue;
          if (!(current2 !== null && updateQueue !== null)) {
            {
              throw Error("If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          var nextProps = workInProgress2.pendingProps;
          var prevState = workInProgress2.memoizedState;
          var prevChildren = prevState !== null ? prevState.element : null;
          cloneUpdateQueue(current2, workInProgress2);
          processUpdateQueue(workInProgress2, nextProps, null, renderLanes2);
          var nextState = workInProgress2.memoizedState;
          var nextChildren = nextState.element;
          if (nextChildren === prevChildren) {
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
          }
          var root = workInProgress2.stateNode;
          if (root.hydrate && enterHydrationState()) {
            var child = mountChildFibers(workInProgress2, null, nextChildren, renderLanes2);
            workInProgress2.child = child;
            var node = child;
            while (node) {
              node.flags = node.flags & ~Placement | Hydrating;
              node = node.sibling;
            }
          } else {
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          }
          return workInProgress2.child;
        }
        function updateHostComponent(current2, workInProgress2, renderLanes2) {
          pushHostContext(workInProgress2);
          var type = workInProgress2.type;
          var nextProps = workInProgress2.pendingProps;
          var prevProps = current2 !== null ? current2.memoizedProps : null;
          var nextChildren = nextProps.children;
          if (prevProps !== null && shouldSetTextContent()) {
            workInProgress2.flags |= ContentReset;
          }
          markRef(current2, workInProgress2);
          reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function updateHostText(current2, workInProgress2) {
          return null;
        }
        function mountLazyComponent(_current, workInProgress2, elementType, updateLanes, renderLanes2) {
          if (_current !== null) {
            _current.alternate = null;
            workInProgress2.alternate = null;
            workInProgress2.flags |= Placement;
          }
          var props = workInProgress2.pendingProps;
          var lazyComponent = elementType;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          var Component = init(payload);
          workInProgress2.type = Component;
          var resolvedTag = workInProgress2.tag = resolveLazyComponentTag(Component);
          var resolvedProps = resolveDefaultProps(Component, props);
          var child;
          switch (resolvedTag) {
            case FunctionComponent: {
              {
                validateFunctionComponentInDev(workInProgress2, Component);
                workInProgress2.type = Component = resolveFunctionForHotReloading(Component);
              }
              child = updateFunctionComponent(null, workInProgress2, Component, resolvedProps, renderLanes2);
              return child;
            }
            case ClassComponent: {
              {
                workInProgress2.type = Component = resolveClassForHotReloading(Component);
              }
              child = updateClassComponent(null, workInProgress2, Component, resolvedProps, renderLanes2);
              return child;
            }
            case ForwardRef: {
              {
                workInProgress2.type = Component = resolveForwardRefForHotReloading(Component);
              }
              child = updateForwardRef(null, workInProgress2, Component, resolvedProps, renderLanes2);
              return child;
            }
            case MemoComponent: {
              {
                if (workInProgress2.type !== workInProgress2.elementType) {
                  var outerPropTypes = Component.propTypes;
                  if (outerPropTypes) {
                    checkPropTypes(outerPropTypes, resolvedProps, "prop", getComponentName(Component));
                  }
                }
              }
              child = updateMemoComponent(null, workInProgress2, Component, resolveDefaultProps(Component.type, resolvedProps), updateLanes, renderLanes2);
              return child;
            }
          }
          var hint = "";
          {
            if (Component !== null && typeof Component === "object" && Component.$$typeof === REACT_LAZY_TYPE) {
              hint = " Did you wrap a component in React.lazy() more than once?";
            }
          }
          {
            {
              throw Error("Element type is invalid. Received a promise that resolves to: " + Component + ". Lazy element type must resolve to a class or function." + hint);
            }
          }
        }
        function mountIncompleteClassComponent(_current, workInProgress2, Component, nextProps, renderLanes2) {
          if (_current !== null) {
            _current.alternate = null;
            workInProgress2.alternate = null;
            workInProgress2.flags |= Placement;
          }
          workInProgress2.tag = ClassComponent;
          var hasContext;
          if (isContextProvider(Component)) {
            hasContext = true;
            pushContextProvider(workInProgress2);
          } else {
            hasContext = false;
          }
          prepareToReadContext(workInProgress2, renderLanes2);
          constructClassInstance(workInProgress2, Component, nextProps);
          mountClassInstance(workInProgress2, Component, nextProps, renderLanes2);
          return finishClassComponent(null, workInProgress2, Component, true, hasContext, renderLanes2);
        }
        function mountIndeterminateComponent(_current, workInProgress2, Component, renderLanes2) {
          if (_current !== null) {
            _current.alternate = null;
            workInProgress2.alternate = null;
            workInProgress2.flags |= Placement;
          }
          var props = workInProgress2.pendingProps;
          var context;
          {
            var unmaskedContext = getUnmaskedContext(workInProgress2, Component, false);
            context = getMaskedContext(workInProgress2, unmaskedContext);
          }
          prepareToReadContext(workInProgress2, renderLanes2);
          var value;
          {
            if (Component.prototype && typeof Component.prototype.render === "function") {
              var componentName = getComponentName(Component) || "Unknown";
              if (!didWarnAboutBadClass[componentName]) {
                error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                didWarnAboutBadClass[componentName] = true;
              }
            }
            if (workInProgress2.mode & StrictMode) {
              ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress2, null);
            }
            setIsRendering(true);
            ReactCurrentOwner$1.current = workInProgress2;
            value = renderWithHooks(null, workInProgress2, Component, props, context, renderLanes2);
            setIsRendering(false);
          }
          workInProgress2.flags |= PerformedWork;
          {
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              var _componentName = getComponentName(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                didWarnAboutModulePatternComponent[_componentName] = true;
              }
            }
          }
          if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
            {
              var _componentName2 = getComponentName(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName2]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                didWarnAboutModulePatternComponent[_componentName2] = true;
              }
            }
            workInProgress2.tag = ClassComponent;
            workInProgress2.memoizedState = null;
            workInProgress2.updateQueue = null;
            var hasContext = false;
            if (isContextProvider(Component)) {
              hasContext = true;
              pushContextProvider(workInProgress2);
            } else {
              hasContext = false;
            }
            workInProgress2.memoizedState = value.state !== null && value.state !== void 0 ? value.state : null;
            initializeUpdateQueue(workInProgress2);
            var getDerivedStateFromProps = Component.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              applyDerivedStateFromProps(workInProgress2, Component, getDerivedStateFromProps, props);
            }
            adoptClassInstance(workInProgress2, value);
            mountClassInstance(workInProgress2, Component, props, renderLanes2);
            return finishClassComponent(null, workInProgress2, Component, true, hasContext, renderLanes2);
          } else {
            workInProgress2.tag = FunctionComponent;
            reconcileChildren(null, workInProgress2, value, renderLanes2);
            {
              validateFunctionComponentInDev(workInProgress2, Component);
            }
            return workInProgress2.child;
          }
        }
        function validateFunctionComponentInDev(workInProgress2, Component) {
          {
            if (Component) {
              if (Component.childContextTypes) {
                error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
              }
            }
            if (workInProgress2.ref !== null) {
              var info = "";
              var ownerName = getCurrentFiberOwnerNameInDevOrNull();
              if (ownerName) {
                info += "\n\nCheck the render method of `" + ownerName + "`.";
              }
              var warningKey = ownerName || workInProgress2._debugID || "";
              var debugSource = workInProgress2._debugSource;
              if (debugSource) {
                warningKey = debugSource.fileName + ":" + debugSource.lineNumber;
              }
              if (!didWarnAboutFunctionRefs[warningKey]) {
                didWarnAboutFunctionRefs[warningKey] = true;
                error("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", info);
              }
            }
            if (typeof Component.getDerivedStateFromProps === "function") {
              var _componentName3 = getComponentName(Component) || "Unknown";
              if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
              }
            }
            if (typeof Component.contextType === "object" && Component.contextType !== null) {
              var _componentName4 = getComponentName(Component) || "Unknown";
              if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                error("%s: Function components do not support contextType.", _componentName4);
                didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
              }
            }
          }
        }
        var SUSPENDED_MARKER = {
          dehydrated: null,
          retryLane: NoLane
        };
        function mountSuspenseOffscreenState(renderLanes2) {
          return {
            baseLanes: renderLanes2
          };
        }
        function updateSuspenseOffscreenState(prevOffscreenState, renderLanes2) {
          return {
            baseLanes: mergeLanes(prevOffscreenState.baseLanes, renderLanes2)
          };
        }
        function shouldRemainOnFallback(suspenseContext, current2, workInProgress2, renderLanes2) {
          if (current2 !== null) {
            var suspenseState = current2.memoizedState;
            if (suspenseState === null) {
              return false;
            }
          }
          return hasSuspenseContext(suspenseContext, ForceSuspenseFallback);
        }
        function getRemainingWorkInPrimaryTree(current2, renderLanes2) {
          return removeLanes(current2.childLanes, renderLanes2);
        }
        function updateSuspenseComponent(current2, workInProgress2, renderLanes2) {
          var nextProps = workInProgress2.pendingProps;
          {
            if (shouldSuspend(workInProgress2)) {
              workInProgress2.flags |= DidCapture;
            }
          }
          var suspenseContext = suspenseStackCursor.current;
          var showFallback = false;
          var didSuspend = (workInProgress2.flags & DidCapture) !== NoFlags;
          if (didSuspend || shouldRemainOnFallback(suspenseContext, current2)) {
            showFallback = true;
            workInProgress2.flags &= ~DidCapture;
          } else {
            if (current2 === null || current2.memoizedState !== null) {
              if (nextProps.fallback !== void 0 && nextProps.unstable_avoidThisFallback !== true) {
                suspenseContext = addSubtreeSuspenseContext(suspenseContext, InvisibleParentSuspenseContext);
              }
            }
          }
          suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
          pushSuspenseContext(workInProgress2, suspenseContext);
          if (current2 === null) {
            if (nextProps.fallback !== void 0)
              ;
            var nextPrimaryChildren = nextProps.children;
            var nextFallbackChildren = nextProps.fallback;
            if (showFallback) {
              var fallbackFragment = mountSuspenseFallbackChildren(workInProgress2, nextPrimaryChildren, nextFallbackChildren, renderLanes2);
              var primaryChildFragment = workInProgress2.child;
              primaryChildFragment.memoizedState = mountSuspenseOffscreenState(renderLanes2);
              workInProgress2.memoizedState = SUSPENDED_MARKER;
              return fallbackFragment;
            } else if (typeof nextProps.unstable_expectedLoadTime === "number") {
              var _fallbackFragment = mountSuspenseFallbackChildren(workInProgress2, nextPrimaryChildren, nextFallbackChildren, renderLanes2);
              var _primaryChildFragment = workInProgress2.child;
              _primaryChildFragment.memoizedState = mountSuspenseOffscreenState(renderLanes2);
              workInProgress2.memoizedState = SUSPENDED_MARKER;
              workInProgress2.lanes = SomeRetryLane;
              {
                markSpawnedWork(SomeRetryLane);
              }
              return _fallbackFragment;
            } else {
              return mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren, renderLanes2);
            }
          } else {
            var prevState = current2.memoizedState;
            if (prevState !== null) {
              if (showFallback) {
                var _nextFallbackChildren2 = nextProps.fallback;
                var _nextPrimaryChildren2 = nextProps.children;
                var _fallbackChildFragment = updateSuspenseFallbackChildren(current2, workInProgress2, _nextPrimaryChildren2, _nextFallbackChildren2, renderLanes2);
                var _primaryChildFragment3 = workInProgress2.child;
                var prevOffscreenState = current2.child.memoizedState;
                _primaryChildFragment3.memoizedState = prevOffscreenState === null ? mountSuspenseOffscreenState(renderLanes2) : updateSuspenseOffscreenState(prevOffscreenState, renderLanes2);
                _primaryChildFragment3.childLanes = getRemainingWorkInPrimaryTree(current2, renderLanes2);
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                return _fallbackChildFragment;
              } else {
                var _nextPrimaryChildren3 = nextProps.children;
                var _primaryChildFragment4 = updateSuspensePrimaryChildren(current2, workInProgress2, _nextPrimaryChildren3, renderLanes2);
                workInProgress2.memoizedState = null;
                return _primaryChildFragment4;
              }
            } else {
              if (showFallback) {
                var _nextFallbackChildren3 = nextProps.fallback;
                var _nextPrimaryChildren4 = nextProps.children;
                var _fallbackChildFragment2 = updateSuspenseFallbackChildren(current2, workInProgress2, _nextPrimaryChildren4, _nextFallbackChildren3, renderLanes2);
                var _primaryChildFragment5 = workInProgress2.child;
                var _prevOffscreenState = current2.child.memoizedState;
                _primaryChildFragment5.memoizedState = _prevOffscreenState === null ? mountSuspenseOffscreenState(renderLanes2) : updateSuspenseOffscreenState(_prevOffscreenState, renderLanes2);
                _primaryChildFragment5.childLanes = getRemainingWorkInPrimaryTree(current2, renderLanes2);
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                return _fallbackChildFragment2;
              } else {
                var _nextPrimaryChildren5 = nextProps.children;
                var _primaryChildFragment6 = updateSuspensePrimaryChildren(current2, workInProgress2, _nextPrimaryChildren5, renderLanes2);
                workInProgress2.memoizedState = null;
                return _primaryChildFragment6;
              }
            }
          }
        }
        function mountSuspensePrimaryChildren(workInProgress2, primaryChildren, renderLanes2) {
          var mode = workInProgress2.mode;
          var primaryChildProps = {
            mode: "visible",
            children: primaryChildren
          };
          var primaryChildFragment = createFiberFromOffscreen(primaryChildProps, mode, renderLanes2, null);
          primaryChildFragment.return = workInProgress2;
          workInProgress2.child = primaryChildFragment;
          return primaryChildFragment;
        }
        function mountSuspenseFallbackChildren(workInProgress2, primaryChildren, fallbackChildren, renderLanes2) {
          var mode = workInProgress2.mode;
          var progressedPrimaryFragment = workInProgress2.child;
          var primaryChildProps = {
            mode: "hidden",
            children: primaryChildren
          };
          var primaryChildFragment;
          var fallbackChildFragment;
          if ((mode & BlockingMode) === NoMode && progressedPrimaryFragment !== null) {
            primaryChildFragment = progressedPrimaryFragment;
            primaryChildFragment.childLanes = NoLanes;
            primaryChildFragment.pendingProps = primaryChildProps;
            if (workInProgress2.mode & ProfileMode) {
              primaryChildFragment.actualDuration = 0;
              primaryChildFragment.actualStartTime = -1;
              primaryChildFragment.selfBaseDuration = 0;
              primaryChildFragment.treeBaseDuration = 0;
            }
            fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes2, null);
          } else {
            primaryChildFragment = createFiberFromOffscreen(primaryChildProps, mode, NoLanes, null);
            fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes2, null);
          }
          primaryChildFragment.return = workInProgress2;
          fallbackChildFragment.return = workInProgress2;
          primaryChildFragment.sibling = fallbackChildFragment;
          workInProgress2.child = primaryChildFragment;
          return fallbackChildFragment;
        }
        function createWorkInProgressOffscreenFiber(current2, offscreenProps) {
          return createWorkInProgress(current2, offscreenProps);
        }
        function updateSuspensePrimaryChildren(current2, workInProgress2, primaryChildren, renderLanes2) {
          var currentPrimaryChildFragment = current2.child;
          var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
          var primaryChildFragment = createWorkInProgressOffscreenFiber(currentPrimaryChildFragment, {
            mode: "visible",
            children: primaryChildren
          });
          if ((workInProgress2.mode & BlockingMode) === NoMode) {
            primaryChildFragment.lanes = renderLanes2;
          }
          primaryChildFragment.return = workInProgress2;
          primaryChildFragment.sibling = null;
          if (currentFallbackChildFragment !== null) {
            currentFallbackChildFragment.nextEffect = null;
            currentFallbackChildFragment.flags = Deletion;
            workInProgress2.firstEffect = workInProgress2.lastEffect = currentFallbackChildFragment;
          }
          workInProgress2.child = primaryChildFragment;
          return primaryChildFragment;
        }
        function updateSuspenseFallbackChildren(current2, workInProgress2, primaryChildren, fallbackChildren, renderLanes2) {
          var mode = workInProgress2.mode;
          var currentPrimaryChildFragment = current2.child;
          var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
          var primaryChildProps = {
            mode: "hidden",
            children: primaryChildren
          };
          var primaryChildFragment;
          if ((mode & BlockingMode) === NoMode && workInProgress2.child !== currentPrimaryChildFragment) {
            var progressedPrimaryFragment = workInProgress2.child;
            primaryChildFragment = progressedPrimaryFragment;
            primaryChildFragment.childLanes = NoLanes;
            primaryChildFragment.pendingProps = primaryChildProps;
            if (workInProgress2.mode & ProfileMode) {
              primaryChildFragment.actualDuration = 0;
              primaryChildFragment.actualStartTime = -1;
              primaryChildFragment.selfBaseDuration = currentPrimaryChildFragment.selfBaseDuration;
              primaryChildFragment.treeBaseDuration = currentPrimaryChildFragment.treeBaseDuration;
            }
            var progressedLastEffect = primaryChildFragment.lastEffect;
            if (progressedLastEffect !== null) {
              workInProgress2.firstEffect = primaryChildFragment.firstEffect;
              workInProgress2.lastEffect = progressedLastEffect;
              progressedLastEffect.nextEffect = null;
            } else {
              workInProgress2.firstEffect = workInProgress2.lastEffect = null;
            }
          } else {
            primaryChildFragment = createWorkInProgressOffscreenFiber(currentPrimaryChildFragment, primaryChildProps);
          }
          var fallbackChildFragment;
          if (currentFallbackChildFragment !== null) {
            fallbackChildFragment = createWorkInProgress(currentFallbackChildFragment, fallbackChildren);
          } else {
            fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes2, null);
            fallbackChildFragment.flags |= Placement;
          }
          fallbackChildFragment.return = workInProgress2;
          primaryChildFragment.return = workInProgress2;
          primaryChildFragment.sibling = fallbackChildFragment;
          workInProgress2.child = primaryChildFragment;
          return fallbackChildFragment;
        }
        function scheduleWorkOnFiber(fiber, renderLanes2) {
          fiber.lanes = mergeLanes(fiber.lanes, renderLanes2);
          var alternate = fiber.alternate;
          if (alternate !== null) {
            alternate.lanes = mergeLanes(alternate.lanes, renderLanes2);
          }
          scheduleWorkOnParentPath(fiber.return, renderLanes2);
        }
        function propagateSuspenseContextChange(workInProgress2, firstChild, renderLanes2) {
          var node = firstChild;
          while (node !== null) {
            if (node.tag === SuspenseComponent) {
              var state = node.memoizedState;
              if (state !== null) {
                scheduleWorkOnFiber(node, renderLanes2);
              }
            } else if (node.tag === SuspenseListComponent) {
              scheduleWorkOnFiber(node, renderLanes2);
            } else if (node.child !== null) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === workInProgress2) {
              return;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === workInProgress2) {
                return;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        function findLastContentRow(firstChild) {
          var row = firstChild;
          var lastContentRow = null;
          while (row !== null) {
            var currentRow = row.alternate;
            if (currentRow !== null && findFirstSuspended(currentRow) === null) {
              lastContentRow = row;
            }
            row = row.sibling;
          }
          return lastContentRow;
        }
        function validateRevealOrder(revealOrder) {
          {
            if (revealOrder !== void 0 && revealOrder !== "forwards" && revealOrder !== "backwards" && revealOrder !== "together" && !didWarnAboutRevealOrder[revealOrder]) {
              didWarnAboutRevealOrder[revealOrder] = true;
              if (typeof revealOrder === "string") {
                switch (revealOrder.toLowerCase()) {
                  case "together":
                  case "forwards":
                  case "backwards": {
                    error('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', revealOrder, revealOrder.toLowerCase());
                    break;
                  }
                  case "forward":
                  case "backward": {
                    error('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', revealOrder, revealOrder.toLowerCase());
                    break;
                  }
                  default:
                    error('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', revealOrder);
                    break;
                }
              } else {
                error('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', revealOrder);
              }
            }
          }
        }
        function validateTailOptions(tailMode, revealOrder) {
          {
            if (tailMode !== void 0 && !didWarnAboutTailOptions[tailMode]) {
              if (tailMode !== "collapsed" && tailMode !== "hidden") {
                didWarnAboutTailOptions[tailMode] = true;
                error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', tailMode);
              } else if (revealOrder !== "forwards" && revealOrder !== "backwards") {
                didWarnAboutTailOptions[tailMode] = true;
                error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', tailMode);
              }
            }
          }
        }
        function validateSuspenseListNestedChild(childSlot, index2) {
          {
            var isArray2 = Array.isArray(childSlot);
            var isIterable = !isArray2 && typeof getIteratorFn(childSlot) === "function";
            if (isArray2 || isIterable) {
              var type = isArray2 ? "array" : "iterable";
              error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", type, index2, type);
              return false;
            }
          }
          return true;
        }
        function validateSuspenseListChildren(children, revealOrder) {
          {
            if ((revealOrder === "forwards" || revealOrder === "backwards") && children !== void 0 && children !== null && children !== false) {
              if (Array.isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                  if (!validateSuspenseListNestedChild(children[i], i)) {
                    return;
                  }
                }
              } else {
                var iteratorFn = getIteratorFn(children);
                if (typeof iteratorFn === "function") {
                  var childrenIterator = iteratorFn.call(children);
                  if (childrenIterator) {
                    var step = childrenIterator.next();
                    var _i = 0;
                    for (; !step.done; step = childrenIterator.next()) {
                      if (!validateSuspenseListNestedChild(step.value, _i)) {
                        return;
                      }
                      _i++;
                    }
                  }
                } else {
                  error('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', revealOrder);
                }
              }
            }
          }
        }
        function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, lastEffectBeforeRendering) {
          var renderState = workInProgress2.memoizedState;
          if (renderState === null) {
            workInProgress2.memoizedState = {
              isBackwards,
              rendering: null,
              renderingStartTime: 0,
              last: lastContentRow,
              tail,
              tailMode,
              lastEffect: lastEffectBeforeRendering
            };
          } else {
            renderState.isBackwards = isBackwards;
            renderState.rendering = null;
            renderState.renderingStartTime = 0;
            renderState.last = lastContentRow;
            renderState.tail = tail;
            renderState.tailMode = tailMode;
            renderState.lastEffect = lastEffectBeforeRendering;
          }
        }
        function updateSuspenseListComponent(current2, workInProgress2, renderLanes2) {
          var nextProps = workInProgress2.pendingProps;
          var revealOrder = nextProps.revealOrder;
          var tailMode = nextProps.tail;
          var newChildren = nextProps.children;
          validateRevealOrder(revealOrder);
          validateTailOptions(tailMode, revealOrder);
          validateSuspenseListChildren(newChildren, revealOrder);
          reconcileChildren(current2, workInProgress2, newChildren, renderLanes2);
          var suspenseContext = suspenseStackCursor.current;
          var shouldForceFallback = hasSuspenseContext(suspenseContext, ForceSuspenseFallback);
          if (shouldForceFallback) {
            suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
            workInProgress2.flags |= DidCapture;
          } else {
            var didSuspendBefore = current2 !== null && (current2.flags & DidCapture) !== NoFlags;
            if (didSuspendBefore) {
              propagateSuspenseContextChange(workInProgress2, workInProgress2.child, renderLanes2);
            }
            suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
          }
          pushSuspenseContext(workInProgress2, suspenseContext);
          if ((workInProgress2.mode & BlockingMode) === NoMode) {
            workInProgress2.memoizedState = null;
          } else {
            switch (revealOrder) {
              case "forwards": {
                var lastContentRow = findLastContentRow(workInProgress2.child);
                var tail;
                if (lastContentRow === null) {
                  tail = workInProgress2.child;
                  workInProgress2.child = null;
                } else {
                  tail = lastContentRow.sibling;
                  lastContentRow.sibling = null;
                }
                initSuspenseListRenderState(workInProgress2, false, tail, lastContentRow, tailMode, workInProgress2.lastEffect);
                break;
              }
              case "backwards": {
                var _tail = null;
                var row = workInProgress2.child;
                workInProgress2.child = null;
                while (row !== null) {
                  var currentRow = row.alternate;
                  if (currentRow !== null && findFirstSuspended(currentRow) === null) {
                    workInProgress2.child = row;
                    break;
                  }
                  var nextRow = row.sibling;
                  row.sibling = _tail;
                  _tail = row;
                  row = nextRow;
                }
                initSuspenseListRenderState(workInProgress2, true, _tail, null, tailMode, workInProgress2.lastEffect);
                break;
              }
              case "together": {
                initSuspenseListRenderState(workInProgress2, false, null, null, void 0, workInProgress2.lastEffect);
                break;
              }
              default: {
                workInProgress2.memoizedState = null;
              }
            }
          }
          return workInProgress2.child;
        }
        function updatePortalComponent(current2, workInProgress2, renderLanes2) {
          pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
          var nextChildren = workInProgress2.pendingProps;
          if (current2 === null) {
            workInProgress2.child = reconcileChildFibers(workInProgress2, null, nextChildren, renderLanes2);
          } else {
            reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
          }
          return workInProgress2.child;
        }
        var hasWarnedAboutUsingNoValuePropOnContextProvider = false;
        function updateContextProvider(current2, workInProgress2, renderLanes2) {
          var providerType = workInProgress2.type;
          var context = providerType._context;
          var newProps = workInProgress2.pendingProps;
          var oldProps = workInProgress2.memoizedProps;
          var newValue = newProps.value;
          {
            if (!("value" in newProps)) {
              if (!hasWarnedAboutUsingNoValuePropOnContextProvider) {
                hasWarnedAboutUsingNoValuePropOnContextProvider = true;
                error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?");
              }
            }
            var providerPropTypes = workInProgress2.type.propTypes;
            if (providerPropTypes) {
              checkPropTypes(providerPropTypes, newProps, "prop", "Context.Provider");
            }
          }
          pushProvider(workInProgress2, newValue);
          if (oldProps !== null) {
            var oldValue = oldProps.value;
            var changedBits = calculateChangedBits(context, newValue, oldValue);
            if (changedBits === 0) {
              if (oldProps.children === newProps.children && !hasContextChanged()) {
                return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
              }
            } else {
              propagateContextChange(workInProgress2, context, changedBits, renderLanes2);
            }
          }
          var newChildren = newProps.children;
          reconcileChildren(current2, workInProgress2, newChildren, renderLanes2);
          return workInProgress2.child;
        }
        var hasWarnedAboutUsingContextAsConsumer = false;
        function updateContextConsumer(current2, workInProgress2, renderLanes2) {
          var context = workInProgress2.type;
          {
            if (context._context === void 0) {
              if (context !== context.Consumer) {
                if (!hasWarnedAboutUsingContextAsConsumer) {
                  hasWarnedAboutUsingContextAsConsumer = true;
                  error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                }
              }
            } else {
              context = context._context;
            }
          }
          var newProps = workInProgress2.pendingProps;
          var render2 = newProps.children;
          {
            if (typeof render2 !== "function") {
              error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
            }
          }
          prepareToReadContext(workInProgress2, renderLanes2);
          var newValue = readContext(context, newProps.unstable_observedBits);
          var newChildren;
          {
            ReactCurrentOwner$1.current = workInProgress2;
            setIsRendering(true);
            newChildren = render2(newValue);
            setIsRendering(false);
          }
          workInProgress2.flags |= PerformedWork;
          reconcileChildren(current2, workInProgress2, newChildren, renderLanes2);
          return workInProgress2.child;
        }
        function markWorkInProgressReceivedUpdate() {
          didReceiveUpdate = true;
        }
        function bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2) {
          if (current2 !== null) {
            workInProgress2.dependencies = current2.dependencies;
          }
          {
            stopProfilerTimerIfRunning();
          }
          markSkippedUpdateLanes(workInProgress2.lanes);
          if (!includesSomeLane(renderLanes2, workInProgress2.childLanes)) {
            return null;
          } else {
            cloneChildFibers(current2, workInProgress2);
            return workInProgress2.child;
          }
        }
        function remountFiber(current2, oldWorkInProgress, newWorkInProgress) {
          {
            var returnFiber = oldWorkInProgress.return;
            if (returnFiber === null) {
              throw new Error("Cannot swap the root fiber.");
            }
            current2.alternate = null;
            oldWorkInProgress.alternate = null;
            newWorkInProgress.index = oldWorkInProgress.index;
            newWorkInProgress.sibling = oldWorkInProgress.sibling;
            newWorkInProgress.return = oldWorkInProgress.return;
            newWorkInProgress.ref = oldWorkInProgress.ref;
            if (oldWorkInProgress === returnFiber.child) {
              returnFiber.child = newWorkInProgress;
            } else {
              var prevSibling = returnFiber.child;
              if (prevSibling === null) {
                throw new Error("Expected parent to have a child.");
              }
              while (prevSibling.sibling !== oldWorkInProgress) {
                prevSibling = prevSibling.sibling;
                if (prevSibling === null) {
                  throw new Error("Expected to find the previous sibling.");
                }
              }
              prevSibling.sibling = newWorkInProgress;
            }
            var last = returnFiber.lastEffect;
            if (last !== null) {
              last.nextEffect = current2;
              returnFiber.lastEffect = current2;
            } else {
              returnFiber.firstEffect = returnFiber.lastEffect = current2;
            }
            current2.nextEffect = null;
            current2.flags = Deletion;
            newWorkInProgress.flags |= Placement;
            return newWorkInProgress;
          }
        }
        function beginWork(current2, workInProgress2, renderLanes2) {
          var updateLanes = workInProgress2.lanes;
          {
            if (workInProgress2._debugNeedsRemount && current2 !== null) {
              return remountFiber(current2, workInProgress2, createFiberFromTypeAndProps(workInProgress2.type, workInProgress2.key, workInProgress2.pendingProps, workInProgress2._debugOwner || null, workInProgress2.mode, workInProgress2.lanes));
            }
          }
          if (current2 !== null) {
            var oldProps = current2.memoizedProps;
            var newProps = workInProgress2.pendingProps;
            if (oldProps !== newProps || hasContextChanged() || workInProgress2.type !== current2.type) {
              didReceiveUpdate = true;
            } else if (!includesSomeLane(renderLanes2, updateLanes)) {
              didReceiveUpdate = false;
              switch (workInProgress2.tag) {
                case HostRoot:
                  pushHostRootContext(workInProgress2);
                  break;
                case HostComponent:
                  pushHostContext(workInProgress2);
                  break;
                case ClassComponent: {
                  var Component = workInProgress2.type;
                  if (isContextProvider(Component)) {
                    pushContextProvider(workInProgress2);
                  }
                  break;
                }
                case HostPortal:
                  pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
                  break;
                case ContextProvider: {
                  var newValue = workInProgress2.memoizedProps.value;
                  pushProvider(workInProgress2, newValue);
                  break;
                }
                case Profiler:
                  {
                    var hasChildWork = includesSomeLane(renderLanes2, workInProgress2.childLanes);
                    if (hasChildWork) {
                      workInProgress2.flags |= Update;
                    }
                    var stateNode = workInProgress2.stateNode;
                    stateNode.effectDuration = 0;
                    stateNode.passiveEffectDuration = 0;
                  }
                  break;
                case SuspenseComponent: {
                  var state = workInProgress2.memoizedState;
                  if (state !== null) {
                    var primaryChildFragment = workInProgress2.child;
                    var primaryChildLanes = primaryChildFragment.childLanes;
                    if (includesSomeLane(renderLanes2, primaryChildLanes)) {
                      return updateSuspenseComponent(current2, workInProgress2, renderLanes2);
                    } else {
                      pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                      var child = bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
                      if (child !== null) {
                        return child.sibling;
                      } else {
                        return null;
                      }
                    }
                  } else {
                    pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                  }
                  break;
                }
                case SuspenseListComponent: {
                  var didSuspendBefore = (current2.flags & DidCapture) !== NoFlags;
                  var _hasChildWork = includesSomeLane(renderLanes2, workInProgress2.childLanes);
                  if (didSuspendBefore) {
                    if (_hasChildWork) {
                      return updateSuspenseListComponent(current2, workInProgress2, renderLanes2);
                    }
                    workInProgress2.flags |= DidCapture;
                  }
                  var renderState = workInProgress2.memoizedState;
                  if (renderState !== null) {
                    renderState.rendering = null;
                    renderState.tail = null;
                    renderState.lastEffect = null;
                  }
                  pushSuspenseContext(workInProgress2, suspenseStackCursor.current);
                  if (_hasChildWork) {
                    break;
                  } else {
                    return null;
                  }
                }
                case OffscreenComponent:
                case LegacyHiddenComponent: {
                  workInProgress2.lanes = NoLanes;
                  return updateOffscreenComponent(current2, workInProgress2, renderLanes2);
                }
              }
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
            } else {
              if ((current2.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
                didReceiveUpdate = true;
              } else {
                didReceiveUpdate = false;
              }
            }
          } else {
            didReceiveUpdate = false;
          }
          workInProgress2.lanes = NoLanes;
          switch (workInProgress2.tag) {
            case IndeterminateComponent: {
              return mountIndeterminateComponent(current2, workInProgress2, workInProgress2.type, renderLanes2);
            }
            case LazyComponent: {
              var elementType = workInProgress2.elementType;
              return mountLazyComponent(current2, workInProgress2, elementType, updateLanes, renderLanes2);
            }
            case FunctionComponent: {
              var _Component = workInProgress2.type;
              var unresolvedProps = workInProgress2.pendingProps;
              var resolvedProps = workInProgress2.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);
              return updateFunctionComponent(current2, workInProgress2, _Component, resolvedProps, renderLanes2);
            }
            case ClassComponent: {
              var _Component2 = workInProgress2.type;
              var _unresolvedProps = workInProgress2.pendingProps;
              var _resolvedProps = workInProgress2.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);
              return updateClassComponent(current2, workInProgress2, _Component2, _resolvedProps, renderLanes2);
            }
            case HostRoot:
              return updateHostRoot(current2, workInProgress2, renderLanes2);
            case HostComponent:
              return updateHostComponent(current2, workInProgress2, renderLanes2);
            case HostText:
              return updateHostText();
            case SuspenseComponent:
              return updateSuspenseComponent(current2, workInProgress2, renderLanes2);
            case HostPortal:
              return updatePortalComponent(current2, workInProgress2, renderLanes2);
            case ForwardRef: {
              var type = workInProgress2.type;
              var _unresolvedProps2 = workInProgress2.pendingProps;
              var _resolvedProps2 = workInProgress2.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);
              return updateForwardRef(current2, workInProgress2, type, _resolvedProps2, renderLanes2);
            }
            case Fragment:
              return updateFragment(current2, workInProgress2, renderLanes2);
            case Mode:
              return updateMode(current2, workInProgress2, renderLanes2);
            case Profiler:
              return updateProfiler(current2, workInProgress2, renderLanes2);
            case ContextProvider:
              return updateContextProvider(current2, workInProgress2, renderLanes2);
            case ContextConsumer:
              return updateContextConsumer(current2, workInProgress2, renderLanes2);
            case MemoComponent: {
              var _type2 = workInProgress2.type;
              var _unresolvedProps3 = workInProgress2.pendingProps;
              var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);
              {
                if (workInProgress2.type !== workInProgress2.elementType) {
                  var outerPropTypes = _type2.propTypes;
                  if (outerPropTypes) {
                    checkPropTypes(outerPropTypes, _resolvedProps3, "prop", getComponentName(_type2));
                  }
                }
              }
              _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
              return updateMemoComponent(current2, workInProgress2, _type2, _resolvedProps3, updateLanes, renderLanes2);
            }
            case SimpleMemoComponent: {
              return updateSimpleMemoComponent(current2, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, updateLanes, renderLanes2);
            }
            case IncompleteClassComponent: {
              var _Component3 = workInProgress2.type;
              var _unresolvedProps4 = workInProgress2.pendingProps;
              var _resolvedProps4 = workInProgress2.elementType === _Component3 ? _unresolvedProps4 : resolveDefaultProps(_Component3, _unresolvedProps4);
              return mountIncompleteClassComponent(current2, workInProgress2, _Component3, _resolvedProps4, renderLanes2);
            }
            case SuspenseListComponent: {
              return updateSuspenseListComponent(current2, workInProgress2, renderLanes2);
            }
            case FundamentalComponent: {
              break;
            }
            case ScopeComponent: {
              break;
            }
            case Block: {
              break;
            }
            case OffscreenComponent: {
              return updateOffscreenComponent(current2, workInProgress2, renderLanes2);
            }
            case LegacyHiddenComponent: {
              return updateLegacyHiddenComponent(current2, workInProgress2, renderLanes2);
            }
          }
          {
            {
              throw Error("Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function markUpdate(workInProgress2) {
          workInProgress2.flags |= Update;
        }
        function markRef$1(workInProgress2) {
          workInProgress2.flags |= Ref;
        }
        var appendAllChildren;
        var updateHostContainer;
        var updateHostComponent$1;
        var updateHostText$1;
        {
          appendAllChildren = function(parent, workInProgress2, needsVisibilityToggle, isHidden) {
            var node = workInProgress2.child;
            while (node !== null) {
              if (node.tag === HostComponent || node.tag === HostText) {
                appendInitialChild(parent, node.stateNode);
              } else if (node.tag === HostPortal)
                ;
              else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === workInProgress2) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === workInProgress2) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          };
          updateHostContainer = function(workInProgress2) {
          };
          updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
            var oldProps = current2.memoizedProps;
            if (oldProps === newProps) {
              return;
            }
            var instance = workInProgress2.stateNode;
            var currentHostContext = getHostContext();
            var updatePayload = prepareUpdate();
            workInProgress2.updateQueue = updatePayload;
            if (updatePayload) {
              markUpdate(workInProgress2);
            }
          };
          updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
            if (oldText !== newText) {
              markUpdate(workInProgress2);
            }
          };
        }
        function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
          switch (renderState.tailMode) {
            case "hidden": {
              var tailNode = renderState.tail;
              var lastTailNode = null;
              while (tailNode !== null) {
                if (tailNode.alternate !== null) {
                  lastTailNode = tailNode;
                }
                tailNode = tailNode.sibling;
              }
              if (lastTailNode === null) {
                renderState.tail = null;
              } else {
                lastTailNode.sibling = null;
              }
              break;
            }
            case "collapsed": {
              var _tailNode = renderState.tail;
              var _lastTailNode = null;
              while (_tailNode !== null) {
                if (_tailNode.alternate !== null) {
                  _lastTailNode = _tailNode;
                }
                _tailNode = _tailNode.sibling;
              }
              if (_lastTailNode === null) {
                if (!hasRenderedATailFallback && renderState.tail !== null) {
                  renderState.tail.sibling = null;
                } else {
                  renderState.tail = null;
                }
              } else {
                _lastTailNode.sibling = null;
              }
              break;
            }
          }
        }
        function completeWork(current2, workInProgress2, renderLanes2) {
          var newProps = workInProgress2.pendingProps;
          switch (workInProgress2.tag) {
            case IndeterminateComponent:
            case LazyComponent:
            case SimpleMemoComponent:
            case FunctionComponent:
            case ForwardRef:
            case Fragment:
            case Mode:
            case Profiler:
            case ContextConsumer:
            case MemoComponent:
              return null;
            case ClassComponent: {
              var Component = workInProgress2.type;
              if (isContextProvider(Component)) {
                popContext(workInProgress2);
              }
              return null;
            }
            case HostRoot: {
              popHostContainer(workInProgress2);
              popTopLevelContextObject(workInProgress2);
              resetWorkInProgressVersions();
              var fiberRoot = workInProgress2.stateNode;
              if (fiberRoot.pendingContext) {
                fiberRoot.context = fiberRoot.pendingContext;
                fiberRoot.pendingContext = null;
              }
              if (current2 === null || current2.child === null) {
                var wasHydrated = popHydrationState();
                if (wasHydrated) {
                  markUpdate(workInProgress2);
                } else if (!fiberRoot.hydrate) {
                  workInProgress2.flags |= Snapshot;
                }
              }
              updateHostContainer(workInProgress2);
              return null;
            }
            case HostComponent: {
              popHostContext(workInProgress2);
              var rootContainerInstance = getRootHostContainer();
              var type = workInProgress2.type;
              if (current2 !== null && workInProgress2.stateNode != null) {
                updateHostComponent$1(current2, workInProgress2, type, newProps, rootContainerInstance);
                if (current2.ref !== workInProgress2.ref) {
                  markRef$1(workInProgress2);
                }
              } else {
                if (!newProps) {
                  if (!(workInProgress2.stateNode !== null)) {
                    {
                      throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                  return null;
                }
                var currentHostContext = getHostContext();
                var _wasHydrated = popHydrationState();
                if (_wasHydrated) {
                  if (prepareToHydrateHostInstance()) {
                    markUpdate(workInProgress2);
                  }
                } else {
                  var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress2);
                  appendAllChildren(instance, workInProgress2, false, false);
                  workInProgress2.stateNode = instance;
                }
                if (workInProgress2.ref !== null) {
                  markRef$1(workInProgress2);
                }
              }
              return null;
            }
            case HostText: {
              var newText = newProps;
              if (current2 && workInProgress2.stateNode != null) {
                var oldText = current2.memoizedProps;
                updateHostText$1(current2, workInProgress2, oldText, newText);
              } else {
                if (typeof newText !== "string") {
                  if (!(workInProgress2.stateNode !== null)) {
                    {
                      throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                }
                var _rootContainerInstance = getRootHostContainer();
                var _currentHostContext = getHostContext();
                var _wasHydrated2 = popHydrationState();
                if (_wasHydrated2) {
                  if (prepareToHydrateHostTextInstance()) {
                    markUpdate(workInProgress2);
                  }
                } else {
                  workInProgress2.stateNode = createTextInstance(newText);
                }
              }
              return null;
            }
            case SuspenseComponent: {
              popSuspenseContext(workInProgress2);
              var nextState = workInProgress2.memoizedState;
              if ((workInProgress2.flags & DidCapture) !== NoFlags) {
                workInProgress2.lanes = renderLanes2;
                if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                  transferActualDuration(workInProgress2);
                }
                return workInProgress2;
              }
              var nextDidTimeout = nextState !== null;
              var prevDidTimeout = false;
              if (current2 === null) {
                if (workInProgress2.memoizedProps.fallback !== void 0)
                  ;
              } else {
                var prevState = current2.memoizedState;
                prevDidTimeout = prevState !== null;
              }
              if (nextDidTimeout && !prevDidTimeout) {
                if ((workInProgress2.mode & BlockingMode) !== NoMode) {
                  var hasInvisibleChildContext = current2 === null && workInProgress2.memoizedProps.unstable_avoidThisFallback !== true;
                  if (hasInvisibleChildContext || hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext)) {
                    renderDidSuspend();
                  } else {
                    renderDidSuspendDelayIfPossible();
                  }
                }
              }
              {
                if (nextDidTimeout || prevDidTimeout) {
                  workInProgress2.flags |= Update;
                }
              }
              return null;
            }
            case HostPortal:
              popHostContainer(workInProgress2);
              updateHostContainer(workInProgress2);
              if (current2 === null) {
                preparePortalMount(workInProgress2.stateNode.containerInfo);
              }
              return null;
            case ContextProvider:
              popProvider(workInProgress2);
              return null;
            case IncompleteClassComponent: {
              var _Component = workInProgress2.type;
              if (isContextProvider(_Component)) {
                popContext(workInProgress2);
              }
              return null;
            }
            case SuspenseListComponent: {
              popSuspenseContext(workInProgress2);
              var renderState = workInProgress2.memoizedState;
              if (renderState === null) {
                return null;
              }
              var didSuspendAlready = (workInProgress2.flags & DidCapture) !== NoFlags;
              var renderedTail = renderState.rendering;
              if (renderedTail === null) {
                if (!didSuspendAlready) {
                  var cannotBeSuspended = renderHasNotSuspendedYet() && (current2 === null || (current2.flags & DidCapture) === NoFlags);
                  if (!cannotBeSuspended) {
                    var row = workInProgress2.child;
                    while (row !== null) {
                      var suspended = findFirstSuspended(row);
                      if (suspended !== null) {
                        didSuspendAlready = true;
                        workInProgress2.flags |= DidCapture;
                        cutOffTailIfNeeded(renderState, false);
                        var newThennables = suspended.updateQueue;
                        if (newThennables !== null) {
                          workInProgress2.updateQueue = newThennables;
                          workInProgress2.flags |= Update;
                        }
                        if (renderState.lastEffect === null) {
                          workInProgress2.firstEffect = null;
                        }
                        workInProgress2.lastEffect = renderState.lastEffect;
                        resetChildFibers(workInProgress2, renderLanes2);
                        pushSuspenseContext(workInProgress2, setShallowSuspenseContext(suspenseStackCursor.current, ForceSuspenseFallback));
                        return workInProgress2.child;
                      }
                      row = row.sibling;
                    }
                  }
                  if (renderState.tail !== null && now() > getRenderTargetTime()) {
                    workInProgress2.flags |= DidCapture;
                    didSuspendAlready = true;
                    cutOffTailIfNeeded(renderState, false);
                    workInProgress2.lanes = SomeRetryLane;
                    {
                      markSpawnedWork(SomeRetryLane);
                    }
                  }
                } else {
                  cutOffTailIfNeeded(renderState, false);
                }
              } else {
                if (!didSuspendAlready) {
                  var _suspended = findFirstSuspended(renderedTail);
                  if (_suspended !== null) {
                    workInProgress2.flags |= DidCapture;
                    didSuspendAlready = true;
                    var _newThennables = _suspended.updateQueue;
                    if (_newThennables !== null) {
                      workInProgress2.updateQueue = _newThennables;
                      workInProgress2.flags |= Update;
                    }
                    cutOffTailIfNeeded(renderState, true);
                    if (renderState.tail === null && renderState.tailMode === "hidden" && !renderedTail.alternate && !getIsHydrating()) {
                      var lastEffect = workInProgress2.lastEffect = renderState.lastEffect;
                      if (lastEffect !== null) {
                        lastEffect.nextEffect = null;
                      }
                      return null;
                    }
                  } else if (now() * 2 - renderState.renderingStartTime > getRenderTargetTime() && renderLanes2 !== OffscreenLane) {
                    workInProgress2.flags |= DidCapture;
                    didSuspendAlready = true;
                    cutOffTailIfNeeded(renderState, false);
                    workInProgress2.lanes = SomeRetryLane;
                    {
                      markSpawnedWork(SomeRetryLane);
                    }
                  }
                }
                if (renderState.isBackwards) {
                  renderedTail.sibling = workInProgress2.child;
                  workInProgress2.child = renderedTail;
                } else {
                  var previousSibling = renderState.last;
                  if (previousSibling !== null) {
                    previousSibling.sibling = renderedTail;
                  } else {
                    workInProgress2.child = renderedTail;
                  }
                  renderState.last = renderedTail;
                }
              }
              if (renderState.tail !== null) {
                var next = renderState.tail;
                renderState.rendering = next;
                renderState.tail = next.sibling;
                renderState.lastEffect = workInProgress2.lastEffect;
                renderState.renderingStartTime = now();
                next.sibling = null;
                var suspenseContext = suspenseStackCursor.current;
                if (didSuspendAlready) {
                  suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
                } else {
                  suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
                }
                pushSuspenseContext(workInProgress2, suspenseContext);
                return next;
              }
              return null;
            }
            case FundamentalComponent: {
              break;
            }
            case ScopeComponent: {
              break;
            }
            case Block:
              break;
            case OffscreenComponent:
            case LegacyHiddenComponent: {
              popRenderLanes(workInProgress2);
              if (current2 !== null) {
                var _nextState = workInProgress2.memoizedState;
                var _prevState = current2.memoizedState;
                var prevIsHidden = _prevState !== null;
                var nextIsHidden = _nextState !== null;
                if (prevIsHidden !== nextIsHidden && newProps.mode !== "unstable-defer-without-hiding") {
                  workInProgress2.flags |= Update;
                }
              }
              return null;
            }
          }
          {
            {
              throw Error("Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function unwindWork(workInProgress2, renderLanes2) {
          switch (workInProgress2.tag) {
            case ClassComponent: {
              var Component = workInProgress2.type;
              if (isContextProvider(Component)) {
                popContext(workInProgress2);
              }
              var flags = workInProgress2.flags;
              if (flags & ShouldCapture) {
                workInProgress2.flags = flags & ~ShouldCapture | DidCapture;
                if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                  transferActualDuration(workInProgress2);
                }
                return workInProgress2;
              }
              return null;
            }
            case HostRoot: {
              popHostContainer(workInProgress2);
              popTopLevelContextObject(workInProgress2);
              resetWorkInProgressVersions();
              var _flags = workInProgress2.flags;
              if (!((_flags & DidCapture) === NoFlags)) {
                {
                  throw Error("The root failed to unmount after an error. This is likely a bug in React. Please file an issue.");
                }
              }
              workInProgress2.flags = _flags & ~ShouldCapture | DidCapture;
              return workInProgress2;
            }
            case HostComponent: {
              popHostContext(workInProgress2);
              return null;
            }
            case SuspenseComponent: {
              popSuspenseContext(workInProgress2);
              var _flags2 = workInProgress2.flags;
              if (_flags2 & ShouldCapture) {
                workInProgress2.flags = _flags2 & ~ShouldCapture | DidCapture;
                if ((workInProgress2.mode & ProfileMode) !== NoMode) {
                  transferActualDuration(workInProgress2);
                }
                return workInProgress2;
              }
              return null;
            }
            case SuspenseListComponent: {
              popSuspenseContext(workInProgress2);
              return null;
            }
            case HostPortal:
              popHostContainer(workInProgress2);
              return null;
            case ContextProvider:
              popProvider(workInProgress2);
              return null;
            case OffscreenComponent:
            case LegacyHiddenComponent:
              popRenderLanes(workInProgress2);
              return null;
            default:
              return null;
          }
        }
        function unwindInterruptedWork(interruptedWork) {
          switch (interruptedWork.tag) {
            case ClassComponent: {
              var childContextTypes = interruptedWork.type.childContextTypes;
              if (childContextTypes !== null && childContextTypes !== void 0) {
                popContext(interruptedWork);
              }
              break;
            }
            case HostRoot: {
              popHostContainer(interruptedWork);
              popTopLevelContextObject(interruptedWork);
              resetWorkInProgressVersions();
              break;
            }
            case HostComponent: {
              popHostContext(interruptedWork);
              break;
            }
            case HostPortal:
              popHostContainer(interruptedWork);
              break;
            case SuspenseComponent:
              popSuspenseContext(interruptedWork);
              break;
            case SuspenseListComponent:
              popSuspenseContext(interruptedWork);
              break;
            case ContextProvider:
              popProvider(interruptedWork);
              break;
            case OffscreenComponent:
            case LegacyHiddenComponent:
              popRenderLanes(interruptedWork);
              break;
          }
        }
        function createCapturedValue(value, source) {
          return {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
        }
        function showErrorDialog(boundary, errorInfo) {
          return true;
        }
        function logCapturedError(boundary, errorInfo) {
          try {
            var logError = showErrorDialog(boundary, errorInfo);
            if (logError === false) {
              return;
            }
            var error2 = errorInfo.value;
            if (true) {
              var source = errorInfo.source;
              var stack = errorInfo.stack;
              var componentStack = stack !== null ? stack : "";
              if (error2 != null && error2._suppressLogging) {
                if (boundary.tag === ClassComponent) {
                  return;
                }
                console["error"](error2);
              }
              var componentName = source ? getComponentName(source.type) : null;
              var componentNameMessage = componentName ? "The above error occurred in the <" + componentName + "> component:" : "The above error occurred in one of your React components:";
              var errorBoundaryMessage;
              var errorBoundaryName = getComponentName(boundary.type);
              if (errorBoundaryName) {
                errorBoundaryMessage = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + errorBoundaryName + ".");
              } else {
                errorBoundaryMessage = "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://reactjs.org/link/error-boundaries to learn more about error boundaries.";
              }
              var combinedMessage = componentNameMessage + "\n" + componentStack + "\n\n" + ("" + errorBoundaryMessage);
              console["error"](combinedMessage);
            } else {
              console["error"](error2);
            }
          } catch (e) {
            setTimeout(function() {
              throw e;
            });
          }
        }
        var PossiblyWeakMap$1 = typeof WeakMap === "function" ? WeakMap : Map;
        function createRootErrorUpdate(fiber, errorInfo, lane) {
          var update = createUpdate(NoTimestamp, lane);
          update.tag = CaptureUpdate;
          update.payload = {
            element: null
          };
          var error2 = errorInfo.value;
          update.callback = function() {
            onUncaughtError(error2);
            logCapturedError(fiber, errorInfo);
          };
          return update;
        }
        function createClassErrorUpdate(fiber, errorInfo, lane) {
          var update = createUpdate(NoTimestamp, lane);
          update.tag = CaptureUpdate;
          var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
          if (typeof getDerivedStateFromError === "function") {
            var error$1 = errorInfo.value;
            update.payload = function() {
              logCapturedError(fiber, errorInfo);
              return getDerivedStateFromError(error$1);
            };
          }
          var inst = fiber.stateNode;
          if (inst !== null && typeof inst.componentDidCatch === "function") {
            update.callback = function callback() {
              {
                markFailedErrorBoundaryForHotReloading(fiber);
              }
              if (typeof getDerivedStateFromError !== "function") {
                markLegacyErrorBoundaryAsFailed(this);
                logCapturedError(fiber, errorInfo);
              }
              var error$12 = errorInfo.value;
              var stack = errorInfo.stack;
              this.componentDidCatch(error$12, {
                componentStack: stack !== null ? stack : ""
              });
              {
                if (typeof getDerivedStateFromError !== "function") {
                  if (!includesSomeLane(fiber.lanes, SyncLane)) {
                    error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", getComponentName(fiber.type) || "Unknown");
                  }
                }
              }
            };
          } else {
            update.callback = function() {
              markFailedErrorBoundaryForHotReloading(fiber);
            };
          }
          return update;
        }
        function attachPingListener(root, wakeable, lanes) {
          var pingCache = root.pingCache;
          var threadIDs;
          if (pingCache === null) {
            pingCache = root.pingCache = new PossiblyWeakMap$1();
            threadIDs = /* @__PURE__ */ new Set();
            pingCache.set(wakeable, threadIDs);
          } else {
            threadIDs = pingCache.get(wakeable);
            if (threadIDs === void 0) {
              threadIDs = /* @__PURE__ */ new Set();
              pingCache.set(wakeable, threadIDs);
            }
          }
          if (!threadIDs.has(lanes)) {
            threadIDs.add(lanes);
            var ping = pingSuspendedRoot.bind(null, root, wakeable, lanes);
            wakeable.then(ping, ping);
          }
        }
        function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
          sourceFiber.flags |= Incomplete;
          sourceFiber.firstEffect = sourceFiber.lastEffect = null;
          if (value !== null && typeof value === "object" && typeof value.then === "function") {
            var wakeable = value;
            if ((sourceFiber.mode & BlockingMode) === NoMode) {
              var currentSource = sourceFiber.alternate;
              if (currentSource) {
                sourceFiber.updateQueue = currentSource.updateQueue;
                sourceFiber.memoizedState = currentSource.memoizedState;
                sourceFiber.lanes = currentSource.lanes;
              } else {
                sourceFiber.updateQueue = null;
                sourceFiber.memoizedState = null;
              }
            }
            var hasInvisibleParentBoundary = hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext);
            var _workInProgress = returnFiber;
            do {
              if (_workInProgress.tag === SuspenseComponent && shouldCaptureSuspense(_workInProgress, hasInvisibleParentBoundary)) {
                var wakeables = _workInProgress.updateQueue;
                if (wakeables === null) {
                  var updateQueue = /* @__PURE__ */ new Set();
                  updateQueue.add(wakeable);
                  _workInProgress.updateQueue = updateQueue;
                } else {
                  wakeables.add(wakeable);
                }
                if ((_workInProgress.mode & BlockingMode) === NoMode) {
                  _workInProgress.flags |= DidCapture;
                  sourceFiber.flags |= ForceUpdateForLegacySuspense;
                  sourceFiber.flags &= ~(LifecycleEffectMask | Incomplete);
                  if (sourceFiber.tag === ClassComponent) {
                    var currentSourceFiber = sourceFiber.alternate;
                    if (currentSourceFiber === null) {
                      sourceFiber.tag = IncompleteClassComponent;
                    } else {
                      var update = createUpdate(NoTimestamp, SyncLane);
                      update.tag = ForceUpdate;
                      enqueueUpdate(sourceFiber, update);
                    }
                  }
                  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, SyncLane);
                  return;
                }
                attachPingListener(root, wakeable, rootRenderLanes);
                _workInProgress.flags |= ShouldCapture;
                _workInProgress.lanes = rootRenderLanes;
                return;
              }
              _workInProgress = _workInProgress.return;
            } while (_workInProgress !== null);
            value = new Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
          }
          renderDidError();
          value = createCapturedValue(value, sourceFiber);
          var workInProgress2 = returnFiber;
          do {
            switch (workInProgress2.tag) {
              case HostRoot: {
                var _errorInfo = value;
                workInProgress2.flags |= ShouldCapture;
                var lane = pickArbitraryLane(rootRenderLanes);
                workInProgress2.lanes = mergeLanes(workInProgress2.lanes, lane);
                var _update = createRootErrorUpdate(workInProgress2, _errorInfo, lane);
                enqueueCapturedUpdate(workInProgress2, _update);
                return;
              }
              case ClassComponent:
                var errorInfo = value;
                var ctor = workInProgress2.type;
                var instance = workInProgress2.stateNode;
                if ((workInProgress2.flags & DidCapture) === NoFlags && (typeof ctor.getDerivedStateFromError === "function" || instance !== null && typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance))) {
                  workInProgress2.flags |= ShouldCapture;
                  var _lane = pickArbitraryLane(rootRenderLanes);
                  workInProgress2.lanes = mergeLanes(workInProgress2.lanes, _lane);
                  var _update2 = createClassErrorUpdate(workInProgress2, errorInfo, _lane);
                  enqueueCapturedUpdate(workInProgress2, _update2);
                  return;
                }
                break;
            }
            workInProgress2 = workInProgress2.return;
          } while (workInProgress2 !== null);
        }
        function invokeGuardedCallbackProd(name, func, context, a, b, c, d, e, f) {
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          try {
            func.apply(context, funcArgs);
          } catch (error2) {
            this.onError(error2);
          }
        }
        var invokeGuardedCallbackImpl = invokeGuardedCallbackProd;
        {
          if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
            var fakeNode = document.createElement("react");
            invokeGuardedCallbackImpl = function invokeGuardedCallbackDev(name, func, context, a, b, c, d, e, f) {
              if (!(typeof document !== "undefined")) {
                {
                  throw Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
                }
              }
              var evt = document.createEvent("Event");
              var didCall = false;
              var didError = true;
              var windowEvent = window.event;
              var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, "event");
              function restoreAfterDispatch() {
                fakeNode.removeEventListener(evtType, callCallback2, false);
                if (typeof window.event !== "undefined" && window.hasOwnProperty("event")) {
                  window.event = windowEvent;
                }
              }
              var funcArgs = Array.prototype.slice.call(arguments, 3);
              function callCallback2() {
                didCall = true;
                restoreAfterDispatch();
                func.apply(context, funcArgs);
                didError = false;
              }
              var error2;
              var didSetError = false;
              var isCrossOriginError = false;
              function handleWindowError(event) {
                error2 = event.error;
                didSetError = true;
                if (error2 === null && event.colno === 0 && event.lineno === 0) {
                  isCrossOriginError = true;
                }
                if (event.defaultPrevented) {
                  if (error2 != null && typeof error2 === "object") {
                    try {
                      error2._suppressLogging = true;
                    } catch (inner) {
                    }
                  }
                }
              }
              var evtType = "react-" + (name ? name : "invokeguardedcallback");
              window.addEventListener("error", handleWindowError);
              fakeNode.addEventListener(evtType, callCallback2, false);
              evt.initEvent(evtType, false, false);
              fakeNode.dispatchEvent(evt);
              if (windowEventDescriptor) {
                Object.defineProperty(window, "event", windowEventDescriptor);
              }
              if (didCall && didError) {
                if (!didSetError) {
                  error2 = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
                } else if (isCrossOriginError) {
                  error2 = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.");
                }
                this.onError(error2);
              }
              window.removeEventListener("error", handleWindowError);
              if (!didCall) {
                restoreAfterDispatch();
                return invokeGuardedCallbackProd.apply(this, arguments);
              }
            };
          }
        }
        var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;
        var hasError = false;
        var caughtError = null;
        var reporter = {
          onError: function(error2) {
            hasError = true;
            caughtError = error2;
          }
        };
        function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
          hasError = false;
          caughtError = null;
          invokeGuardedCallbackImpl$1.apply(reporter, arguments);
        }
        function hasCaughtError() {
          return hasError;
        }
        function clearCaughtError() {
          if (hasError) {
            var error2 = caughtError;
            hasError = false;
            caughtError = null;
            return error2;
          } else {
            {
              {
                throw Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
        }
        var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
        {
          didWarnAboutUndefinedSnapshotBeforeUpdate = /* @__PURE__ */ new Set();
        }
        var PossiblyWeakSet = typeof WeakSet === "function" ? WeakSet : Set;
        var callComponentWillUnmountWithTimer = function(current2, instance) {
          instance.props = current2.memoizedProps;
          instance.state = current2.memoizedState;
          {
            instance.componentWillUnmount();
          }
        };
        function safelyCallComponentWillUnmount(current2, instance) {
          {
            invokeGuardedCallback(null, callComponentWillUnmountWithTimer, null, current2, instance);
            if (hasCaughtError()) {
              var unmountError = clearCaughtError();
              captureCommitPhaseError(current2, unmountError);
            }
          }
        }
        function safelyDetachRef(current2) {
          var ref = current2.ref;
          if (ref !== null) {
            if (typeof ref === "function") {
              {
                invokeGuardedCallback(null, ref, null, null);
                if (hasCaughtError()) {
                  var refError = clearCaughtError();
                  captureCommitPhaseError(current2, refError);
                }
              }
            } else {
              ref.current = null;
            }
          }
        }
        function safelyCallDestroy(current2, destroy) {
          {
            invokeGuardedCallback(null, destroy, null);
            if (hasCaughtError()) {
              var error2 = clearCaughtError();
              captureCommitPhaseError(current2, error2);
            }
          }
        }
        function commitBeforeMutationLifeCycles(current2, finishedWork) {
          switch (finishedWork.tag) {
            case FunctionComponent:
            case ForwardRef:
            case SimpleMemoComponent:
            case Block: {
              return;
            }
            case ClassComponent: {
              if (finishedWork.flags & Snapshot) {
                if (current2 !== null) {
                  var prevProps = current2.memoizedProps;
                  var prevState = current2.memoizedState;
                  var instance = finishedWork.stateNode;
                  {
                    if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                      if (instance.props !== finishedWork.memoizedProps) {
                        error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                      if (instance.state !== finishedWork.memoizedState) {
                        error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                    }
                  }
                  var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
                  {
                    var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
                    if (snapshot === void 0 && !didWarnSet.has(finishedWork.type)) {
                      didWarnSet.add(finishedWork.type);
                      error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", getComponentName(finishedWork.type));
                    }
                  }
                  instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                }
              }
              return;
            }
            case HostRoot: {
              {
                if (finishedWork.flags & Snapshot) {
                  var root = finishedWork.stateNode;
                  clearContainer(root.containerInfo);
                }
              }
              return;
            }
            case HostComponent:
            case HostText:
            case HostPortal:
            case IncompleteClassComponent:
              return;
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function commitHookEffectListUnmount(tag, finishedWork) {
          var updateQueue = finishedWork.updateQueue;
          var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            var effect = firstEffect;
            do {
              if ((effect.tag & tag) === tag) {
                var destroy = effect.destroy;
                effect.destroy = void 0;
                if (destroy !== void 0) {
                  destroy();
                }
              }
              effect = effect.next;
            } while (effect !== firstEffect);
          }
        }
        function commitHookEffectListMount(tag, finishedWork) {
          var updateQueue = finishedWork.updateQueue;
          var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            var effect = firstEffect;
            do {
              if ((effect.tag & tag) === tag) {
                var create3 = effect.create;
                effect.destroy = create3();
                {
                  var destroy = effect.destroy;
                  if (destroy !== void 0 && typeof destroy !== "function") {
                    var addendum = void 0;
                    if (destroy === null) {
                      addendum = " You returned null. If your effect does not require clean up, return undefined (or nothing).";
                    } else if (typeof destroy.then === "function") {
                      addendum = "\n\nIt looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\nuseEffect(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching";
                    } else {
                      addendum = " You returned: " + destroy;
                    }
                    error("An effect function must not return anything besides a function, which is used for clean-up.%s", addendum);
                  }
                }
              }
              effect = effect.next;
            } while (effect !== firstEffect);
          }
        }
        function schedulePassiveEffects(finishedWork) {
          var updateQueue = finishedWork.updateQueue;
          var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            var effect = firstEffect;
            do {
              var _effect = effect, next = _effect.next, tag = _effect.tag;
              if ((tag & Passive$1) !== NoFlags$1 && (tag & HasEffect) !== NoFlags$1) {
                enqueuePendingPassiveHookEffectUnmount(finishedWork, effect);
                enqueuePendingPassiveHookEffectMount(finishedWork, effect);
              }
              effect = next;
            } while (effect !== firstEffect);
          }
        }
        function commitLifeCycles(finishedRoot, current2, finishedWork, committedLanes) {
          switch (finishedWork.tag) {
            case FunctionComponent:
            case ForwardRef:
            case SimpleMemoComponent:
            case Block: {
              {
                commitHookEffectListMount(Layout | HasEffect, finishedWork);
              }
              schedulePassiveEffects(finishedWork);
              return;
            }
            case ClassComponent: {
              var instance = finishedWork.stateNode;
              if (finishedWork.flags & Update) {
                if (current2 === null) {
                  {
                    if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                      if (instance.props !== finishedWork.memoizedProps) {
                        error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                      if (instance.state !== finishedWork.memoizedState) {
                        error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                    }
                  }
                  {
                    instance.componentDidMount();
                  }
                } else {
                  var prevProps = finishedWork.elementType === finishedWork.type ? current2.memoizedProps : resolveDefaultProps(finishedWork.type, current2.memoizedProps);
                  var prevState = current2.memoizedState;
                  {
                    if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                      if (instance.props !== finishedWork.memoizedProps) {
                        error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                      if (instance.state !== finishedWork.memoizedState) {
                        error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                    }
                  }
                  {
                    instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                  }
                }
              }
              var updateQueue = finishedWork.updateQueue;
              if (updateQueue !== null) {
                {
                  if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                    if (instance.props !== finishedWork.memoizedProps) {
                      error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                    }
                    if (instance.state !== finishedWork.memoizedState) {
                      error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                    }
                  }
                }
                commitUpdateQueue(finishedWork, updateQueue, instance);
              }
              return;
            }
            case HostRoot: {
              var _updateQueue = finishedWork.updateQueue;
              if (_updateQueue !== null) {
                var _instance = null;
                if (finishedWork.child !== null) {
                  switch (finishedWork.child.tag) {
                    case HostComponent:
                      _instance = getPublicInstance(finishedWork.child.stateNode);
                      break;
                    case ClassComponent:
                      _instance = finishedWork.child.stateNode;
                      break;
                  }
                }
                commitUpdateQueue(finishedWork, _updateQueue, _instance);
              }
              return;
            }
            case HostComponent: {
              var _instance2 = finishedWork.stateNode;
              if (current2 === null && finishedWork.flags & Update) {
                var type = finishedWork.type;
                var props = finishedWork.memoizedProps;
              }
              return;
            }
            case HostText: {
              return;
            }
            case HostPortal: {
              return;
            }
            case Profiler: {
              {
                var _finishedWork$memoize2 = finishedWork.memoizedProps, onCommit = _finishedWork$memoize2.onCommit, onRender = _finishedWork$memoize2.onRender;
                var effectDuration = finishedWork.stateNode.effectDuration;
                var commitTime2 = getCommitTime();
                if (typeof onRender === "function") {
                  {
                    onRender(finishedWork.memoizedProps.id, current2 === null ? "mount" : "update", finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, commitTime2, finishedRoot.memoizedInteractions);
                  }
                }
              }
              return;
            }
            case SuspenseComponent: {
              return;
            }
            case SuspenseListComponent:
            case IncompleteClassComponent:
            case FundamentalComponent:
            case ScopeComponent:
            case OffscreenComponent:
            case LegacyHiddenComponent:
              return;
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function hideOrUnhideAllChildren(finishedWork, isHidden) {
          {
            var node = finishedWork;
            while (true) {
              if (node.tag === HostComponent) {
                var instance = node.stateNode;
                if (isHidden) {
                  hideInstance(instance);
                } else {
                  unhideInstance(node.stateNode, node.memoizedProps);
                }
              } else if (node.tag === HostText) {
                var _instance3 = node.stateNode;
                if (isHidden) {
                  hideTextInstance(_instance3);
                } else {
                  unhideTextInstance(_instance3, node.memoizedProps);
                }
              } else if ((node.tag === OffscreenComponent || node.tag === LegacyHiddenComponent) && node.memoizedState !== null && node !== finishedWork)
                ;
              else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === finishedWork) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === finishedWork) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          }
        }
        function commitAttachRef(finishedWork) {
          var ref = finishedWork.ref;
          if (ref !== null) {
            var instance = finishedWork.stateNode;
            var instanceToUse;
            switch (finishedWork.tag) {
              case HostComponent:
                instanceToUse = getPublicInstance(instance);
                break;
              default:
                instanceToUse = instance;
            }
            if (typeof ref === "function") {
              ref(instanceToUse);
            } else {
              {
                if (!ref.hasOwnProperty("current")) {
                  error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", getComponentName(finishedWork.type));
                }
              }
              ref.current = instanceToUse;
            }
          }
        }
        function commitDetachRef(current2) {
          var currentRef = current2.ref;
          if (currentRef !== null) {
            if (typeof currentRef === "function") {
              currentRef(null);
            } else {
              currentRef.current = null;
            }
          }
        }
        function commitUnmount(finishedRoot, current2, renderPriorityLevel) {
          onCommitUnmount(current2);
          switch (current2.tag) {
            case FunctionComponent:
            case ForwardRef:
            case MemoComponent:
            case SimpleMemoComponent:
            case Block: {
              var updateQueue = current2.updateQueue;
              if (updateQueue !== null) {
                var lastEffect = updateQueue.lastEffect;
                if (lastEffect !== null) {
                  var firstEffect = lastEffect.next;
                  var effect = firstEffect;
                  do {
                    var _effect2 = effect, destroy = _effect2.destroy, tag = _effect2.tag;
                    if (destroy !== void 0) {
                      if ((tag & Passive$1) !== NoFlags$1) {
                        enqueuePendingPassiveHookEffectUnmount(current2, effect);
                      } else {
                        {
                          safelyCallDestroy(current2, destroy);
                        }
                      }
                    }
                    effect = effect.next;
                  } while (effect !== firstEffect);
                }
              }
              return;
            }
            case ClassComponent: {
              safelyDetachRef(current2);
              var instance = current2.stateNode;
              if (typeof instance.componentWillUnmount === "function") {
                safelyCallComponentWillUnmount(current2, instance);
              }
              return;
            }
            case HostComponent: {
              safelyDetachRef(current2);
              return;
            }
            case HostPortal: {
              {
                unmountHostComponents(finishedRoot, current2);
              }
              return;
            }
            case FundamentalComponent: {
              return;
            }
            case DehydratedFragment: {
              return;
            }
            case ScopeComponent: {
              return;
            }
          }
        }
        function commitNestedUnmounts(finishedRoot, root, renderPriorityLevel) {
          var node = root;
          while (true) {
            commitUnmount(finishedRoot, node);
            if (node.child !== null && node.tag !== HostPortal) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === root) {
              return;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === root) {
                return;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        function detachFiberMutation(fiber) {
          fiber.alternate = null;
          fiber.child = null;
          fiber.dependencies = null;
          fiber.firstEffect = null;
          fiber.lastEffect = null;
          fiber.memoizedProps = null;
          fiber.memoizedState = null;
          fiber.pendingProps = null;
          fiber.return = null;
          fiber.updateQueue = null;
          {
            fiber._debugOwner = null;
          }
        }
        function getHostParentFiber(fiber) {
          var parent = fiber.return;
          while (parent !== null) {
            if (isHostParent(parent)) {
              return parent;
            }
            parent = parent.return;
          }
          {
            {
              throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function isHostParent(fiber) {
          return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
        }
        function getHostSibling(fiber) {
          var node = fiber;
          siblings:
            while (true) {
              while (node.sibling === null) {
                if (node.return === null || isHostParent(node.return)) {
                  return null;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
              while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedFragment) {
                if (node.flags & Placement) {
                  continue siblings;
                }
                if (node.child === null || node.tag === HostPortal) {
                  continue siblings;
                } else {
                  node.child.return = node;
                  node = node.child;
                }
              }
              if (!(node.flags & Placement)) {
                return node.stateNode;
              }
            }
        }
        function commitPlacement(finishedWork) {
          var parentFiber = getHostParentFiber(finishedWork);
          var parent;
          var isContainer;
          var parentStateNode = parentFiber.stateNode;
          switch (parentFiber.tag) {
            case HostComponent:
              parent = parentStateNode;
              isContainer = false;
              break;
            case HostRoot:
              parent = parentStateNode.containerInfo;
              isContainer = true;
              break;
            case HostPortal:
              parent = parentStateNode.containerInfo;
              isContainer = true;
              break;
            case FundamentalComponent:
            default: {
              {
                throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          if (parentFiber.flags & ContentReset) {
            parentFiber.flags &= ~ContentReset;
          }
          var before = getHostSibling(finishedWork);
          if (isContainer) {
            insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
          } else {
            insertOrAppendPlacementNode(finishedWork, before, parent);
          }
        }
        function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
          var tag = node.tag;
          var isHost = tag === HostComponent || tag === HostText;
          if (isHost || enableFundamentalAPI) {
            var stateNode = isHost ? node.stateNode : node.stateNode.instance;
            if (before) {
              insertInContainerBefore(parent, stateNode, before);
            } else {
              appendChildToContainer(parent, stateNode);
            }
          } else if (tag === HostPortal)
            ;
          else {
            var child = node.child;
            if (child !== null) {
              insertOrAppendPlacementNodeIntoContainer(child, before, parent);
              var sibling = child.sibling;
              while (sibling !== null) {
                insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
                sibling = sibling.sibling;
              }
            }
          }
        }
        function insertOrAppendPlacementNode(node, before, parent) {
          var tag = node.tag;
          var isHost = tag === HostComponent || tag === HostText;
          if (isHost || enableFundamentalAPI) {
            var stateNode = isHost ? node.stateNode : node.stateNode.instance;
            if (before) {
              insertBefore(parent, stateNode, before);
            } else {
              appendChild(parent, stateNode);
            }
          } else if (tag === HostPortal)
            ;
          else {
            var child = node.child;
            if (child !== null) {
              insertOrAppendPlacementNode(child, before, parent);
              var sibling = child.sibling;
              while (sibling !== null) {
                insertOrAppendPlacementNode(sibling, before, parent);
                sibling = sibling.sibling;
              }
            }
          }
        }
        function unmountHostComponents(finishedRoot, current2, renderPriorityLevel) {
          var node = current2;
          var currentParentIsValid = false;
          var currentParent;
          var currentParentIsContainer;
          while (true) {
            if (!currentParentIsValid) {
              var parent = node.return;
              findParent:
                while (true) {
                  if (!(parent !== null)) {
                    {
                      throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                  var parentStateNode = parent.stateNode;
                  switch (parent.tag) {
                    case HostComponent:
                      currentParent = parentStateNode;
                      currentParentIsContainer = false;
                      break findParent;
                    case HostRoot:
                      currentParent = parentStateNode.containerInfo;
                      currentParentIsContainer = true;
                      break findParent;
                    case HostPortal:
                      currentParent = parentStateNode.containerInfo;
                      currentParentIsContainer = true;
                      break findParent;
                  }
                  parent = parent.return;
                }
              currentParentIsValid = true;
            }
            if (node.tag === HostComponent || node.tag === HostText) {
              commitNestedUnmounts(finishedRoot, node);
              if (currentParentIsContainer) {
                removeChildFromContainer(currentParent, node.stateNode);
              } else {
                removeChild(currentParent, node.stateNode);
              }
            } else if (node.tag === HostPortal) {
              if (node.child !== null) {
                currentParent = node.stateNode.containerInfo;
                currentParentIsContainer = true;
                node.child.return = node;
                node = node.child;
                continue;
              }
            } else {
              commitUnmount(finishedRoot, node);
              if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
            }
            if (node === current2) {
              return;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === current2) {
                return;
              }
              node = node.return;
              if (node.tag === HostPortal) {
                currentParentIsValid = false;
              }
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        function commitDeletion(finishedRoot, current2, renderPriorityLevel) {
          {
            unmountHostComponents(finishedRoot, current2);
          }
          var alternate = current2.alternate;
          detachFiberMutation(current2);
          if (alternate !== null) {
            detachFiberMutation(alternate);
          }
        }
        function commitWork(current2, finishedWork) {
          switch (finishedWork.tag) {
            case FunctionComponent:
            case ForwardRef:
            case MemoComponent:
            case SimpleMemoComponent:
            case Block: {
              {
                commitHookEffectListUnmount(Layout | HasEffect, finishedWork);
              }
              return;
            }
            case ClassComponent: {
              return;
            }
            case HostComponent: {
              var instance = finishedWork.stateNode;
              if (instance != null) {
                var newProps = finishedWork.memoizedProps;
                var oldProps = current2 !== null ? current2.memoizedProps : newProps;
                var type = finishedWork.type;
                var updatePayload = finishedWork.updateQueue;
                finishedWork.updateQueue = null;
                if (updatePayload !== null) {
                  commitUpdate(instance, updatePayload, type, oldProps, newProps);
                }
              }
              return;
            }
            case HostText: {
              if (!(finishedWork.stateNode !== null)) {
                {
                  throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
                }
              }
              var textInstance = finishedWork.stateNode;
              var newText = finishedWork.memoizedProps;
              var oldText = current2 !== null ? current2.memoizedProps : newText;
              commitTextUpdate(textInstance, oldText, newText);
              return;
            }
            case HostRoot: {
              return;
            }
            case Profiler: {
              return;
            }
            case SuspenseComponent: {
              commitSuspenseComponent(finishedWork);
              attachSuspenseRetryListeners(finishedWork);
              return;
            }
            case SuspenseListComponent: {
              attachSuspenseRetryListeners(finishedWork);
              return;
            }
            case IncompleteClassComponent: {
              return;
            }
            case FundamentalComponent: {
              break;
            }
            case ScopeComponent: {
              break;
            }
            case OffscreenComponent:
            case LegacyHiddenComponent: {
              var newState = finishedWork.memoizedState;
              var isHidden = newState !== null;
              hideOrUnhideAllChildren(finishedWork, isHidden);
              return;
            }
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function commitSuspenseComponent(finishedWork) {
          var newState = finishedWork.memoizedState;
          if (newState !== null) {
            markCommitTimeOfFallback();
            {
              var primaryChildParent = finishedWork.child;
              hideOrUnhideAllChildren(primaryChildParent, true);
            }
          }
        }
        function attachSuspenseRetryListeners(finishedWork) {
          var wakeables = finishedWork.updateQueue;
          if (wakeables !== null) {
            finishedWork.updateQueue = null;
            var retryCache = finishedWork.stateNode;
            if (retryCache === null) {
              retryCache = finishedWork.stateNode = new PossiblyWeakSet();
            }
            wakeables.forEach(function(wakeable) {
              var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
              if (!retryCache.has(wakeable)) {
                {
                  if (wakeable.__reactDoNotTraceInteractions !== true) {
                    retry = tracing.unstable_wrap(retry);
                  }
                }
                retryCache.add(wakeable);
                wakeable.then(retry, retry);
              }
            });
          }
        }
        function isSuspenseBoundaryBeingHidden(current2, finishedWork) {
          if (current2 !== null) {
            var oldState = current2.memoizedState;
            if (oldState === null || oldState.dehydrated !== null) {
              var newState = finishedWork.memoizedState;
              return newState !== null && newState.dehydrated === null;
            }
          }
          return false;
        }
        function commitResetTextContent(current2) {
          resetTextContent(current2.stateNode);
        }
        var COMPONENT_TYPE = 0;
        var HAS_PSEUDO_CLASS_TYPE = 1;
        var ROLE_TYPE = 2;
        var TEST_NAME_TYPE = 3;
        var TEXT_TYPE = 4;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor$1 = Symbol.for;
          COMPONENT_TYPE = symbolFor$1("selector.component");
          HAS_PSEUDO_CLASS_TYPE = symbolFor$1("selector.has_pseudo_class");
          ROLE_TYPE = symbolFor$1("selector.role");
          TEST_NAME_TYPE = symbolFor$1("selector.test_id");
          TEXT_TYPE = symbolFor$1("selector.text");
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module2 && module2[requireString];
              enqueueTaskImpl = nodeRequire.call(module2, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var ceil = Math.ceil;
        var ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher, ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner, IsSomeRendererActing = ReactSharedInternals.IsSomeRendererActing;
        var NoContext = 0;
        var BatchedContext = 1;
        var DiscreteEventContext = 4;
        var LegacyUnbatchedContext = 8;
        var RenderContext = 16;
        var CommitContext = 32;
        var RetryAfterError = 64;
        var RootIncomplete = 0;
        var RootFatalErrored = 1;
        var RootErrored = 2;
        var RootSuspended = 3;
        var RootSuspendedWithDelay = 4;
        var RootCompleted = 5;
        var executionContext = NoContext;
        var workInProgressRoot = null;
        var workInProgress = null;
        var workInProgressRootRenderLanes = NoLanes;
        var subtreeRenderLanes = NoLanes;
        var subtreeRenderLanesCursor = createCursor(NoLanes);
        var workInProgressRootExitStatus = RootIncomplete;
        var workInProgressRootFatalError = null;
        var workInProgressRootIncludedLanes = NoLanes;
        var workInProgressRootSkippedLanes = NoLanes;
        var workInProgressRootUpdatedLanes = NoLanes;
        var workInProgressRootPingedLanes = NoLanes;
        var mostRecentlyUpdatedRoot = null;
        var globalMostRecentFallbackTime = 0;
        var FALLBACK_THROTTLE_MS = 500;
        var workInProgressRootRenderTargetTime = Infinity;
        var RENDER_TIMEOUT_MS = 500;
        function resetRenderTimer() {
          workInProgressRootRenderTargetTime = now() + RENDER_TIMEOUT_MS;
        }
        function getRenderTargetTime() {
          return workInProgressRootRenderTargetTime;
        }
        var nextEffect = null;
        var hasUncaughtError = false;
        var firstUncaughtError = null;
        var legacyErrorBoundariesThatAlreadyFailed = null;
        var rootDoesHavePassiveEffects = false;
        var rootWithPendingPassiveEffects = null;
        var pendingPassiveEffectsRenderPriority = NoPriority$1;
        var pendingPassiveEffectsLanes = NoLanes;
        var pendingPassiveHookEffectsMount = [];
        var pendingPassiveHookEffectsUnmount = [];
        var rootsWithPendingDiscreteUpdates = null;
        var NESTED_UPDATE_LIMIT = 50;
        var nestedUpdateCount = 0;
        var rootWithNestedUpdates = null;
        var NESTED_PASSIVE_UPDATE_LIMIT = 50;
        var nestedPassiveUpdateCount = 0;
        var spawnedWorkDuringRender = null;
        var currentEventTime = NoTimestamp;
        var currentEventWipLanes = NoLanes;
        var currentEventPendingLanes = NoLanes;
        var isFlushingPassiveEffects = false;
        var focusedInstanceHandle = null;
        var shouldFireAfterActiveInstanceBlur = false;
        function getWorkInProgressRoot() {
          return workInProgressRoot;
        }
        function requestEventTime() {
          if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
            return now();
          }
          if (currentEventTime !== NoTimestamp) {
            return currentEventTime;
          }
          currentEventTime = now();
          return currentEventTime;
        }
        function requestUpdateLane(fiber) {
          var mode = fiber.mode;
          if ((mode & BlockingMode) === NoMode) {
            return SyncLane;
          } else if ((mode & ConcurrentMode) === NoMode) {
            return getCurrentPriorityLevel() === ImmediatePriority$1 ? SyncLane : SyncBatchedLane;
          }
          if (currentEventWipLanes === NoLanes) {
            currentEventWipLanes = workInProgressRootIncludedLanes;
          }
          var isTransition = requestCurrentTransition() !== NoTransition;
          if (isTransition) {
            if (currentEventPendingLanes !== NoLanes) {
              currentEventPendingLanes = mostRecentlyUpdatedRoot !== null ? mostRecentlyUpdatedRoot.pendingLanes : NoLanes;
            }
            return findTransitionLane(currentEventWipLanes, currentEventPendingLanes);
          }
          var schedulerPriority = getCurrentPriorityLevel();
          var lane;
          if ((executionContext & DiscreteEventContext) !== NoContext && schedulerPriority === UserBlockingPriority$1) {
            lane = findUpdateLane(InputDiscreteLanePriority, currentEventWipLanes);
          } else {
            var schedulerLanePriority = schedulerPriorityToLanePriority(schedulerPriority);
            lane = findUpdateLane(schedulerLanePriority, currentEventWipLanes);
          }
          return lane;
        }
        function requestRetryLane(fiber) {
          var mode = fiber.mode;
          if ((mode & BlockingMode) === NoMode) {
            return SyncLane;
          } else if ((mode & ConcurrentMode) === NoMode) {
            return getCurrentPriorityLevel() === ImmediatePriority$1 ? SyncLane : SyncBatchedLane;
          }
          if (currentEventWipLanes === NoLanes) {
            currentEventWipLanes = workInProgressRootIncludedLanes;
          }
          return findRetryLane(currentEventWipLanes);
        }
        function scheduleUpdateOnFiber(fiber, lane, eventTime) {
          checkForNestedUpdates();
          warnAboutRenderPhaseUpdatesInDEV(fiber);
          var root = markUpdateLaneFromFiberToRoot(fiber, lane);
          if (root === null) {
            warnAboutUpdateOnUnmountedFiberInDEV(fiber);
            return null;
          }
          markRootUpdated(root, lane, eventTime);
          if (root === workInProgressRoot) {
            {
              workInProgressRootUpdatedLanes = mergeLanes(workInProgressRootUpdatedLanes, lane);
            }
            if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
              markRootSuspended$1(root, workInProgressRootRenderLanes);
            }
          }
          var priorityLevel = getCurrentPriorityLevel();
          if (lane === SyncLane) {
            if ((executionContext & LegacyUnbatchedContext) !== NoContext && (executionContext & (RenderContext | CommitContext)) === NoContext) {
              schedulePendingInteractions(root, lane);
              performSyncWorkOnRoot(root);
            } else {
              ensureRootIsScheduled(root, eventTime);
              schedulePendingInteractions(root, lane);
              if (executionContext === NoContext) {
                resetRenderTimer();
                flushSyncCallbackQueue();
              }
            }
          } else {
            if ((executionContext & DiscreteEventContext) !== NoContext && (priorityLevel === UserBlockingPriority$1 || priorityLevel === ImmediatePriority$1)) {
              if (rootsWithPendingDiscreteUpdates === null) {
                rootsWithPendingDiscreteUpdates = /* @__PURE__ */ new Set([root]);
              } else {
                rootsWithPendingDiscreteUpdates.add(root);
              }
            }
            ensureRootIsScheduled(root, eventTime);
            schedulePendingInteractions(root, lane);
          }
          mostRecentlyUpdatedRoot = root;
        }
        function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
          sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
          var alternate = sourceFiber.alternate;
          if (alternate !== null) {
            alternate.lanes = mergeLanes(alternate.lanes, lane);
          }
          {
            if (alternate === null && (sourceFiber.flags & (Placement | Hydrating)) !== NoFlags) {
              warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
            }
          }
          var node = sourceFiber;
          var parent = sourceFiber.return;
          while (parent !== null) {
            parent.childLanes = mergeLanes(parent.childLanes, lane);
            alternate = parent.alternate;
            if (alternate !== null) {
              alternate.childLanes = mergeLanes(alternate.childLanes, lane);
            } else {
              {
                if ((parent.flags & (Placement | Hydrating)) !== NoFlags) {
                  warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
                }
              }
            }
            node = parent;
            parent = parent.return;
          }
          if (node.tag === HostRoot) {
            var root = node.stateNode;
            return root;
          } else {
            return null;
          }
        }
        function ensureRootIsScheduled(root, currentTime) {
          var existingCallbackNode = root.callbackNode;
          markStarvedLanesAsExpired(root, currentTime);
          var nextLanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
          var newCallbackPriority = returnNextLanesPriority();
          if (nextLanes === NoLanes) {
            if (existingCallbackNode !== null) {
              cancelCallback(existingCallbackNode);
              root.callbackNode = null;
              root.callbackPriority = NoLanePriority;
            }
            return;
          }
          if (existingCallbackNode !== null) {
            var existingCallbackPriority = root.callbackPriority;
            if (existingCallbackPriority === newCallbackPriority) {
              return;
            }
            cancelCallback(existingCallbackNode);
          }
          var newCallbackNode;
          if (newCallbackPriority === SyncLanePriority) {
            newCallbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
          } else if (newCallbackPriority === SyncBatchedLanePriority) {
            newCallbackNode = scheduleCallback(ImmediatePriority$1, performSyncWorkOnRoot.bind(null, root));
          } else {
            var schedulerPriorityLevel = lanePriorityToSchedulerPriority(newCallbackPriority);
            newCallbackNode = scheduleCallback(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root));
          }
          root.callbackPriority = newCallbackPriority;
          root.callbackNode = newCallbackNode;
        }
        function performConcurrentWorkOnRoot(root) {
          currentEventTime = NoTimestamp;
          currentEventWipLanes = NoLanes;
          currentEventPendingLanes = NoLanes;
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Should not already be working.");
            }
          }
          var originalCallbackNode = root.callbackNode;
          var didFlushPassiveEffects = flushPassiveEffects();
          if (didFlushPassiveEffects) {
            if (root.callbackNode !== originalCallbackNode) {
              return null;
            }
          }
          var lanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
          if (lanes === NoLanes) {
            return null;
          }
          var exitStatus = renderRootConcurrent(root, lanes);
          if (includesSomeLane(workInProgressRootIncludedLanes, workInProgressRootUpdatedLanes)) {
            prepareFreshStack(root, NoLanes);
          } else if (exitStatus !== RootIncomplete) {
            if (exitStatus === RootErrored) {
              executionContext |= RetryAfterError;
              if (root.hydrate) {
                root.hydrate = false;
                clearContainer(root.containerInfo);
              }
              lanes = getLanesToRetrySynchronouslyOnError(root);
              if (lanes !== NoLanes) {
                exitStatus = renderRootSync(root, lanes);
              }
            }
            if (exitStatus === RootFatalErrored) {
              var fatalError = workInProgressRootFatalError;
              prepareFreshStack(root, NoLanes);
              markRootSuspended$1(root, lanes);
              ensureRootIsScheduled(root, now());
              throw fatalError;
            }
            var finishedWork = root.current.alternate;
            root.finishedWork = finishedWork;
            root.finishedLanes = lanes;
            finishConcurrentRender(root, exitStatus, lanes);
          }
          ensureRootIsScheduled(root, now());
          if (root.callbackNode === originalCallbackNode) {
            return performConcurrentWorkOnRoot.bind(null, root);
          }
          return null;
        }
        function finishConcurrentRender(root, exitStatus, lanes) {
          switch (exitStatus) {
            case RootIncomplete:
            case RootFatalErrored: {
              {
                {
                  throw Error("Root did not complete. This is a bug in React.");
                }
              }
            }
            case RootErrored: {
              commitRoot(root);
              break;
            }
            case RootSuspended: {
              markRootSuspended$1(root, lanes);
              if (includesOnlyRetries(lanes) && !shouldForceFlushFallbacksInDEV()) {
                var msUntilTimeout = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now();
                if (msUntilTimeout > 10) {
                  var nextLanes = getNextLanes(root, NoLanes);
                  if (nextLanes !== NoLanes) {
                    break;
                  }
                  var suspendedLanes = root.suspendedLanes;
                  if (!isSubsetOfLanes(suspendedLanes, lanes)) {
                    var eventTime = requestEventTime();
                    markRootPinged(root, suspendedLanes);
                    break;
                  }
                  root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), msUntilTimeout);
                  break;
                }
              }
              commitRoot(root);
              break;
            }
            case RootSuspendedWithDelay: {
              markRootSuspended$1(root, lanes);
              if (includesOnlyTransitions(lanes)) {
                break;
              }
              if (!shouldForceFlushFallbacksInDEV()) {
                var mostRecentEventTime = getMostRecentEventTime(root, lanes);
                var eventTimeMs = mostRecentEventTime;
                var timeElapsedMs = now() - eventTimeMs;
                var _msUntilTimeout = jnd(timeElapsedMs) - timeElapsedMs;
                if (_msUntilTimeout > 10) {
                  root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), _msUntilTimeout);
                  break;
                }
              }
              commitRoot(root);
              break;
            }
            case RootCompleted: {
              commitRoot(root);
              break;
            }
            default: {
              {
                {
                  throw Error("Unknown root exit status.");
                }
              }
            }
          }
        }
        function markRootSuspended$1(root, suspendedLanes) {
          suspendedLanes = removeLanes(suspendedLanes, workInProgressRootPingedLanes);
          suspendedLanes = removeLanes(suspendedLanes, workInProgressRootUpdatedLanes);
          markRootSuspended(root, suspendedLanes);
        }
        function performSyncWorkOnRoot(root) {
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Should not already be working.");
            }
          }
          flushPassiveEffects();
          var lanes;
          var exitStatus;
          if (root === workInProgressRoot && includesSomeLane(root.expiredLanes, workInProgressRootRenderLanes)) {
            lanes = workInProgressRootRenderLanes;
            exitStatus = renderRootSync(root, lanes);
            if (includesSomeLane(workInProgressRootIncludedLanes, workInProgressRootUpdatedLanes)) {
              lanes = getNextLanes(root, lanes);
              exitStatus = renderRootSync(root, lanes);
            }
          } else {
            lanes = getNextLanes(root, NoLanes);
            exitStatus = renderRootSync(root, lanes);
          }
          if (root.tag !== LegacyRoot && exitStatus === RootErrored) {
            executionContext |= RetryAfterError;
            if (root.hydrate) {
              root.hydrate = false;
              clearContainer(root.containerInfo);
            }
            lanes = getLanesToRetrySynchronouslyOnError(root);
            if (lanes !== NoLanes) {
              exitStatus = renderRootSync(root, lanes);
            }
          }
          if (exitStatus === RootFatalErrored) {
            var fatalError = workInProgressRootFatalError;
            prepareFreshStack(root, NoLanes);
            markRootSuspended$1(root, lanes);
            ensureRootIsScheduled(root, now());
            throw fatalError;
          }
          var finishedWork = root.current.alternate;
          root.finishedWork = finishedWork;
          root.finishedLanes = lanes;
          commitRoot(root);
          ensureRootIsScheduled(root, now());
          return null;
        }
        function batchedUpdates(fn, a) {
          var prevExecutionContext = executionContext;
          executionContext |= BatchedContext;
          try {
            return fn(a);
          } finally {
            executionContext = prevExecutionContext;
            if (executionContext === NoContext) {
              resetRenderTimer();
              flushSyncCallbackQueue();
            }
          }
        }
        function flushSync(fn, a) {
          var prevExecutionContext = executionContext;
          if ((prevExecutionContext & (RenderContext | CommitContext)) !== NoContext) {
            {
              error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
            }
            return fn(a);
          }
          executionContext |= BatchedContext;
          {
            try {
              if (fn) {
                return runWithPriority(ImmediatePriority$1, fn.bind(null, a));
              } else {
                return void 0;
              }
            } finally {
              executionContext = prevExecutionContext;
              flushSyncCallbackQueue();
            }
          }
        }
        function pushRenderLanes(fiber, lanes) {
          push(subtreeRenderLanesCursor, subtreeRenderLanes, fiber);
          subtreeRenderLanes = mergeLanes(subtreeRenderLanes, lanes);
          workInProgressRootIncludedLanes = mergeLanes(workInProgressRootIncludedLanes, lanes);
        }
        function popRenderLanes(fiber) {
          subtreeRenderLanes = subtreeRenderLanesCursor.current;
          pop(subtreeRenderLanesCursor, fiber);
        }
        function prepareFreshStack(root, lanes) {
          root.finishedWork = null;
          root.finishedLanes = NoLanes;
          var timeoutHandle = root.timeoutHandle;
          if (timeoutHandle !== noTimeout) {
            root.timeoutHandle = noTimeout;
            cancelTimeout(timeoutHandle);
          }
          if (workInProgress !== null) {
            var interruptedWork = workInProgress.return;
            while (interruptedWork !== null) {
              unwindInterruptedWork(interruptedWork);
              interruptedWork = interruptedWork.return;
            }
          }
          workInProgressRoot = root;
          workInProgress = createWorkInProgress(root.current, null);
          workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
          workInProgressRootExitStatus = RootIncomplete;
          workInProgressRootFatalError = null;
          workInProgressRootSkippedLanes = NoLanes;
          workInProgressRootUpdatedLanes = NoLanes;
          workInProgressRootPingedLanes = NoLanes;
          {
            spawnedWorkDuringRender = null;
          }
          {
            ReactStrictModeWarnings.discardPendingWarnings();
          }
        }
        function handleError(root, thrownValue) {
          do {
            var erroredWork = workInProgress;
            try {
              resetContextDependencies();
              resetHooksAfterThrow();
              resetCurrentFiber();
              ReactCurrentOwner$2.current = null;
              if (erroredWork === null || erroredWork.return === null) {
                workInProgressRootExitStatus = RootFatalErrored;
                workInProgressRootFatalError = thrownValue;
                workInProgress = null;
                return;
              }
              if (enableProfilerTimer && erroredWork.mode & ProfileMode) {
                stopProfilerTimerIfRunningAndRecordDelta(erroredWork, true);
              }
              throwException(root, erroredWork.return, erroredWork, thrownValue, workInProgressRootRenderLanes);
              completeUnitOfWork(erroredWork);
            } catch (yetAnotherThrownValue) {
              thrownValue = yetAnotherThrownValue;
              if (workInProgress === erroredWork && erroredWork !== null) {
                erroredWork = erroredWork.return;
                workInProgress = erroredWork;
              } else {
                erroredWork = workInProgress;
              }
              continue;
            }
            return;
          } while (true);
        }
        function pushDispatcher() {
          var prevDispatcher = ReactCurrentDispatcher$2.current;
          ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
          if (prevDispatcher === null) {
            return ContextOnlyDispatcher;
          } else {
            return prevDispatcher;
          }
        }
        function popDispatcher(prevDispatcher) {
          ReactCurrentDispatcher$2.current = prevDispatcher;
        }
        function pushInteractions(root) {
          {
            var prevInteractions = tracing.__interactionsRef.current;
            tracing.__interactionsRef.current = root.memoizedInteractions;
            return prevInteractions;
          }
        }
        function popInteractions(prevInteractions) {
          {
            tracing.__interactionsRef.current = prevInteractions;
          }
        }
        function markCommitTimeOfFallback() {
          globalMostRecentFallbackTime = now();
        }
        function markSkippedUpdateLanes(lane) {
          workInProgressRootSkippedLanes = mergeLanes(lane, workInProgressRootSkippedLanes);
        }
        function renderDidSuspend() {
          if (workInProgressRootExitStatus === RootIncomplete) {
            workInProgressRootExitStatus = RootSuspended;
          }
        }
        function renderDidSuspendDelayIfPossible() {
          if (workInProgressRootExitStatus === RootIncomplete || workInProgressRootExitStatus === RootSuspended) {
            workInProgressRootExitStatus = RootSuspendedWithDelay;
          }
          if (workInProgressRoot !== null && (includesNonIdleWork(workInProgressRootSkippedLanes) || includesNonIdleWork(workInProgressRootUpdatedLanes))) {
            markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes);
          }
        }
        function renderDidError() {
          if (workInProgressRootExitStatus !== RootCompleted) {
            workInProgressRootExitStatus = RootErrored;
          }
        }
        function renderHasNotSuspendedYet() {
          return workInProgressRootExitStatus === RootIncomplete;
        }
        function renderRootSync(root, lanes) {
          var prevExecutionContext = executionContext;
          executionContext |= RenderContext;
          var prevDispatcher = pushDispatcher();
          if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
            prepareFreshStack(root, lanes);
            startWorkOnPendingInteractions(root, lanes);
          }
          var prevInteractions = pushInteractions(root);
          do {
            try {
              workLoopSync();
              break;
            } catch (thrownValue) {
              handleError(root, thrownValue);
            }
          } while (true);
          resetContextDependencies();
          {
            popInteractions(prevInteractions);
          }
          executionContext = prevExecutionContext;
          popDispatcher(prevDispatcher);
          if (workInProgress !== null) {
            {
              {
                throw Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          workInProgressRoot = null;
          workInProgressRootRenderLanes = NoLanes;
          return workInProgressRootExitStatus;
        }
        function workLoopSync() {
          while (workInProgress !== null) {
            performUnitOfWork(workInProgress);
          }
        }
        function renderRootConcurrent(root, lanes) {
          var prevExecutionContext = executionContext;
          executionContext |= RenderContext;
          var prevDispatcher = pushDispatcher();
          if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
            resetRenderTimer();
            prepareFreshStack(root, lanes);
            startWorkOnPendingInteractions(root, lanes);
          }
          var prevInteractions = pushInteractions(root);
          do {
            try {
              workLoopConcurrent();
              break;
            } catch (thrownValue) {
              handleError(root, thrownValue);
            }
          } while (true);
          resetContextDependencies();
          {
            popInteractions(prevInteractions);
          }
          popDispatcher(prevDispatcher);
          executionContext = prevExecutionContext;
          if (workInProgress !== null) {
            return RootIncomplete;
          } else {
            workInProgressRoot = null;
            workInProgressRootRenderLanes = NoLanes;
            return workInProgressRootExitStatus;
          }
        }
        function workLoopConcurrent() {
          while (workInProgress !== null && !shouldYield()) {
            performUnitOfWork(workInProgress);
          }
        }
        function performUnitOfWork(unitOfWork) {
          var current2 = unitOfWork.alternate;
          setCurrentFiber(unitOfWork);
          var next;
          if ((unitOfWork.mode & ProfileMode) !== NoMode) {
            startProfilerTimer(unitOfWork);
            next = beginWork$1(current2, unitOfWork, subtreeRenderLanes);
            stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
          } else {
            next = beginWork$1(current2, unitOfWork, subtreeRenderLanes);
          }
          resetCurrentFiber();
          unitOfWork.memoizedProps = unitOfWork.pendingProps;
          if (next === null) {
            completeUnitOfWork(unitOfWork);
          } else {
            workInProgress = next;
          }
          ReactCurrentOwner$2.current = null;
        }
        function completeUnitOfWork(unitOfWork) {
          var completedWork = unitOfWork;
          do {
            var current2 = completedWork.alternate;
            var returnFiber = completedWork.return;
            if ((completedWork.flags & Incomplete) === NoFlags) {
              setCurrentFiber(completedWork);
              var next = void 0;
              if ((completedWork.mode & ProfileMode) === NoMode) {
                next = completeWork(current2, completedWork, subtreeRenderLanes);
              } else {
                startProfilerTimer(completedWork);
                next = completeWork(current2, completedWork, subtreeRenderLanes);
                stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);
              }
              resetCurrentFiber();
              if (next !== null) {
                workInProgress = next;
                return;
              }
              resetChildLanes(completedWork);
              if (returnFiber !== null && (returnFiber.flags & Incomplete) === NoFlags) {
                if (returnFiber.firstEffect === null) {
                  returnFiber.firstEffect = completedWork.firstEffect;
                }
                if (completedWork.lastEffect !== null) {
                  if (returnFiber.lastEffect !== null) {
                    returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
                  }
                  returnFiber.lastEffect = completedWork.lastEffect;
                }
                var flags = completedWork.flags;
                if (flags > PerformedWork) {
                  if (returnFiber.lastEffect !== null) {
                    returnFiber.lastEffect.nextEffect = completedWork;
                  } else {
                    returnFiber.firstEffect = completedWork;
                  }
                  returnFiber.lastEffect = completedWork;
                }
              }
            } else {
              var _next = unwindWork(completedWork);
              if (_next !== null) {
                _next.flags &= HostEffectMask;
                workInProgress = _next;
                return;
              }
              if ((completedWork.mode & ProfileMode) !== NoMode) {
                stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);
                var actualDuration = completedWork.actualDuration;
                var child = completedWork.child;
                while (child !== null) {
                  actualDuration += child.actualDuration;
                  child = child.sibling;
                }
                completedWork.actualDuration = actualDuration;
              }
              if (returnFiber !== null) {
                returnFiber.firstEffect = returnFiber.lastEffect = null;
                returnFiber.flags |= Incomplete;
              }
            }
            var siblingFiber = completedWork.sibling;
            if (siblingFiber !== null) {
              workInProgress = siblingFiber;
              return;
            }
            completedWork = returnFiber;
            workInProgress = completedWork;
          } while (completedWork !== null);
          if (workInProgressRootExitStatus === RootIncomplete) {
            workInProgressRootExitStatus = RootCompleted;
          }
        }
        function resetChildLanes(completedWork) {
          if ((completedWork.tag === LegacyHiddenComponent || completedWork.tag === OffscreenComponent) && completedWork.memoizedState !== null && !includesSomeLane(subtreeRenderLanes, OffscreenLane) && (completedWork.mode & ConcurrentMode) !== NoLanes) {
            return;
          }
          var newChildLanes = NoLanes;
          if ((completedWork.mode & ProfileMode) !== NoMode) {
            var actualDuration = completedWork.actualDuration;
            var treeBaseDuration = completedWork.selfBaseDuration;
            var shouldBubbleActualDurations = completedWork.alternate === null || completedWork.child !== completedWork.alternate.child;
            var child = completedWork.child;
            while (child !== null) {
              newChildLanes = mergeLanes(newChildLanes, mergeLanes(child.lanes, child.childLanes));
              if (shouldBubbleActualDurations) {
                actualDuration += child.actualDuration;
              }
              treeBaseDuration += child.treeBaseDuration;
              child = child.sibling;
            }
            var isTimedOutSuspense = completedWork.tag === SuspenseComponent && completedWork.memoizedState !== null;
            if (isTimedOutSuspense) {
              var primaryChildFragment = completedWork.child;
              if (primaryChildFragment !== null) {
                treeBaseDuration -= primaryChildFragment.treeBaseDuration;
              }
            }
            completedWork.actualDuration = actualDuration;
            completedWork.treeBaseDuration = treeBaseDuration;
          } else {
            var _child = completedWork.child;
            while (_child !== null) {
              newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child.lanes, _child.childLanes));
              _child = _child.sibling;
            }
          }
          completedWork.childLanes = newChildLanes;
        }
        function commitRoot(root) {
          var renderPriorityLevel = getCurrentPriorityLevel();
          runWithPriority(ImmediatePriority$1, commitRootImpl.bind(null, root, renderPriorityLevel));
          return null;
        }
        function commitRootImpl(root, renderPriorityLevel) {
          do {
            flushPassiveEffects();
          } while (rootWithPendingPassiveEffects !== null);
          flushRenderPhaseStrictModeWarningsInDEV();
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Should not already be working.");
            }
          }
          var finishedWork = root.finishedWork;
          var lanes = root.finishedLanes;
          if (finishedWork === null) {
            return null;
          }
          root.finishedWork = null;
          root.finishedLanes = NoLanes;
          if (!(finishedWork !== root.current)) {
            {
              throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          root.callbackNode = null;
          var remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
          markRootFinished(root, remainingLanes);
          if (rootsWithPendingDiscreteUpdates !== null) {
            if (!hasDiscreteLanes(remainingLanes) && rootsWithPendingDiscreteUpdates.has(root)) {
              rootsWithPendingDiscreteUpdates.delete(root);
            }
          }
          if (root === workInProgressRoot) {
            workInProgressRoot = null;
            workInProgress = null;
            workInProgressRootRenderLanes = NoLanes;
          }
          var firstEffect;
          if (finishedWork.flags > PerformedWork) {
            if (finishedWork.lastEffect !== null) {
              finishedWork.lastEffect.nextEffect = finishedWork;
              firstEffect = finishedWork.firstEffect;
            } else {
              firstEffect = finishedWork;
            }
          } else {
            firstEffect = finishedWork.firstEffect;
          }
          if (firstEffect !== null) {
            var prevExecutionContext = executionContext;
            executionContext |= CommitContext;
            var prevInteractions = pushInteractions(root);
            ReactCurrentOwner$2.current = null;
            focusedInstanceHandle = prepareForCommit(root.containerInfo);
            shouldFireAfterActiveInstanceBlur = false;
            nextEffect = firstEffect;
            do {
              {
                invokeGuardedCallback(null, commitBeforeMutationEffects, null);
                if (hasCaughtError()) {
                  if (!(nextEffect !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var error2 = clearCaughtError();
                  captureCommitPhaseError(nextEffect, error2);
                  nextEffect = nextEffect.nextEffect;
                }
              }
            } while (nextEffect !== null);
            focusedInstanceHandle = null;
            {
              recordCommitTime();
            }
            nextEffect = firstEffect;
            do {
              {
                invokeGuardedCallback(null, commitMutationEffects, null, root, renderPriorityLevel);
                if (hasCaughtError()) {
                  if (!(nextEffect !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var _error = clearCaughtError();
                  captureCommitPhaseError(nextEffect, _error);
                  nextEffect = nextEffect.nextEffect;
                }
              }
            } while (nextEffect !== null);
            resetAfterCommit(root.containerInfo);
            root.current = finishedWork;
            nextEffect = firstEffect;
            do {
              {
                invokeGuardedCallback(null, commitLayoutEffects, null, root, lanes);
                if (hasCaughtError()) {
                  if (!(nextEffect !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var _error2 = clearCaughtError();
                  captureCommitPhaseError(nextEffect, _error2);
                  nextEffect = nextEffect.nextEffect;
                }
              }
            } while (nextEffect !== null);
            nextEffect = null;
            requestPaint();
            {
              popInteractions(prevInteractions);
            }
            executionContext = prevExecutionContext;
          } else {
            root.current = finishedWork;
            {
              recordCommitTime();
            }
          }
          var rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
          if (rootDoesHavePassiveEffects) {
            rootDoesHavePassiveEffects = false;
            rootWithPendingPassiveEffects = root;
            pendingPassiveEffectsLanes = lanes;
            pendingPassiveEffectsRenderPriority = renderPriorityLevel;
          } else {
            nextEffect = firstEffect;
            while (nextEffect !== null) {
              var nextNextEffect = nextEffect.nextEffect;
              nextEffect.nextEffect = null;
              if (nextEffect.flags & Deletion) {
                detachFiberAfterEffects(nextEffect);
              }
              nextEffect = nextNextEffect;
            }
          }
          remainingLanes = root.pendingLanes;
          if (remainingLanes !== NoLanes) {
            {
              if (spawnedWorkDuringRender !== null) {
                var expirationTimes = spawnedWorkDuringRender;
                spawnedWorkDuringRender = null;
                for (var i = 0; i < expirationTimes.length; i++) {
                  scheduleInteractions(root, expirationTimes[i], root.memoizedInteractions);
                }
              }
              schedulePendingInteractions(root, remainingLanes);
            }
          } else {
            legacyErrorBoundariesThatAlreadyFailed = null;
          }
          {
            if (!rootDidHavePassiveEffects) {
              finishPendingInteractions(root, lanes);
            }
          }
          if (remainingLanes === SyncLane) {
            if (root === rootWithNestedUpdates) {
              nestedUpdateCount++;
            } else {
              nestedUpdateCount = 0;
              rootWithNestedUpdates = root;
            }
          } else {
            nestedUpdateCount = 0;
          }
          onCommitRoot(finishedWork.stateNode, renderPriorityLevel);
          ensureRootIsScheduled(root, now());
          if (hasUncaughtError) {
            hasUncaughtError = false;
            var _error3 = firstUncaughtError;
            firstUncaughtError = null;
            throw _error3;
          }
          if ((executionContext & LegacyUnbatchedContext) !== NoContext) {
            return null;
          }
          flushSyncCallbackQueue();
          return null;
        }
        function commitBeforeMutationEffects() {
          while (nextEffect !== null) {
            var current2 = nextEffect.alternate;
            if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
              if ((nextEffect.flags & Deletion) !== NoFlags) {
                if (doesFiberContain(nextEffect, focusedInstanceHandle)) {
                  shouldFireAfterActiveInstanceBlur = true;
                }
              } else {
                if (nextEffect.tag === SuspenseComponent && isSuspenseBoundaryBeingHidden(current2, nextEffect) && doesFiberContain(nextEffect, focusedInstanceHandle)) {
                  shouldFireAfterActiveInstanceBlur = true;
                }
              }
            }
            var flags = nextEffect.flags;
            if ((flags & Snapshot) !== NoFlags) {
              setCurrentFiber(nextEffect);
              commitBeforeMutationLifeCycles(current2, nextEffect);
              resetCurrentFiber();
            }
            if ((flags & Passive) !== NoFlags) {
              if (!rootDoesHavePassiveEffects) {
                rootDoesHavePassiveEffects = true;
                scheduleCallback(NormalPriority$1, function() {
                  flushPassiveEffects();
                  return null;
                });
              }
            }
            nextEffect = nextEffect.nextEffect;
          }
        }
        function commitMutationEffects(root, renderPriorityLevel) {
          while (nextEffect !== null) {
            setCurrentFiber(nextEffect);
            var flags = nextEffect.flags;
            if (flags & ContentReset) {
              commitResetTextContent(nextEffect);
            }
            if (flags & Ref) {
              var current2 = nextEffect.alternate;
              if (current2 !== null) {
                commitDetachRef(current2);
              }
            }
            var primaryFlags = flags & (Placement | Update | Deletion | Hydrating);
            switch (primaryFlags) {
              case Placement: {
                commitPlacement(nextEffect);
                nextEffect.flags &= ~Placement;
                break;
              }
              case PlacementAndUpdate: {
                commitPlacement(nextEffect);
                nextEffect.flags &= ~Placement;
                var _current = nextEffect.alternate;
                commitWork(_current, nextEffect);
                break;
              }
              case Hydrating: {
                nextEffect.flags &= ~Hydrating;
                break;
              }
              case HydratingAndUpdate: {
                nextEffect.flags &= ~Hydrating;
                var _current2 = nextEffect.alternate;
                commitWork(_current2, nextEffect);
                break;
              }
              case Update: {
                var _current3 = nextEffect.alternate;
                commitWork(_current3, nextEffect);
                break;
              }
              case Deletion: {
                commitDeletion(root, nextEffect);
                break;
              }
            }
            resetCurrentFiber();
            nextEffect = nextEffect.nextEffect;
          }
        }
        function commitLayoutEffects(root, committedLanes) {
          while (nextEffect !== null) {
            setCurrentFiber(nextEffect);
            var flags = nextEffect.flags;
            if (flags & (Update | Callback)) {
              var current2 = nextEffect.alternate;
              commitLifeCycles(root, current2, nextEffect);
            }
            {
              if (flags & Ref) {
                commitAttachRef(nextEffect);
              }
            }
            resetCurrentFiber();
            nextEffect = nextEffect.nextEffect;
          }
        }
        function flushPassiveEffects() {
          if (pendingPassiveEffectsRenderPriority !== NoPriority$1) {
            var priorityLevel = pendingPassiveEffectsRenderPriority > NormalPriority$1 ? NormalPriority$1 : pendingPassiveEffectsRenderPriority;
            pendingPassiveEffectsRenderPriority = NoPriority$1;
            {
              return runWithPriority(priorityLevel, flushPassiveEffectsImpl);
            }
          }
          return false;
        }
        function enqueuePendingPassiveHookEffectMount(fiber, effect) {
          pendingPassiveHookEffectsMount.push(effect, fiber);
          if (!rootDoesHavePassiveEffects) {
            rootDoesHavePassiveEffects = true;
            scheduleCallback(NormalPriority$1, function() {
              flushPassiveEffects();
              return null;
            });
          }
        }
        function enqueuePendingPassiveHookEffectUnmount(fiber, effect) {
          pendingPassiveHookEffectsUnmount.push(effect, fiber);
          {
            fiber.flags |= PassiveUnmountPendingDev;
            var alternate = fiber.alternate;
            if (alternate !== null) {
              alternate.flags |= PassiveUnmountPendingDev;
            }
          }
          if (!rootDoesHavePassiveEffects) {
            rootDoesHavePassiveEffects = true;
            scheduleCallback(NormalPriority$1, function() {
              flushPassiveEffects();
              return null;
            });
          }
        }
        function invokePassiveEffectCreate(effect) {
          var create3 = effect.create;
          effect.destroy = create3();
        }
        function flushPassiveEffectsImpl() {
          if (rootWithPendingPassiveEffects === null) {
            return false;
          }
          var root = rootWithPendingPassiveEffects;
          var lanes = pendingPassiveEffectsLanes;
          rootWithPendingPassiveEffects = null;
          pendingPassiveEffectsLanes = NoLanes;
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Cannot flush passive effects while already rendering.");
            }
          }
          {
            isFlushingPassiveEffects = true;
          }
          var prevExecutionContext = executionContext;
          executionContext |= CommitContext;
          var prevInteractions = pushInteractions(root);
          var unmountEffects = pendingPassiveHookEffectsUnmount;
          pendingPassiveHookEffectsUnmount = [];
          for (var i = 0; i < unmountEffects.length; i += 2) {
            var _effect = unmountEffects[i];
            var fiber = unmountEffects[i + 1];
            var destroy = _effect.destroy;
            _effect.destroy = void 0;
            {
              fiber.flags &= ~PassiveUnmountPendingDev;
              var alternate = fiber.alternate;
              if (alternate !== null) {
                alternate.flags &= ~PassiveUnmountPendingDev;
              }
            }
            if (typeof destroy === "function") {
              {
                setCurrentFiber(fiber);
                {
                  invokeGuardedCallback(null, destroy, null);
                }
                if (hasCaughtError()) {
                  if (!(fiber !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var error2 = clearCaughtError();
                  captureCommitPhaseError(fiber, error2);
                }
                resetCurrentFiber();
              }
            }
          }
          var mountEffects = pendingPassiveHookEffectsMount;
          pendingPassiveHookEffectsMount = [];
          for (var _i = 0; _i < mountEffects.length; _i += 2) {
            var _effect2 = mountEffects[_i];
            var _fiber = mountEffects[_i + 1];
            {
              setCurrentFiber(_fiber);
              {
                invokeGuardedCallback(null, invokePassiveEffectCreate, null, _effect2);
              }
              if (hasCaughtError()) {
                if (!(_fiber !== null)) {
                  {
                    throw Error("Should be working on an effect.");
                  }
                }
                var _error4 = clearCaughtError();
                captureCommitPhaseError(_fiber, _error4);
              }
              resetCurrentFiber();
            }
          }
          var effect = root.current.firstEffect;
          while (effect !== null) {
            var nextNextEffect = effect.nextEffect;
            effect.nextEffect = null;
            if (effect.flags & Deletion) {
              detachFiberAfterEffects(effect);
            }
            effect = nextNextEffect;
          }
          {
            popInteractions(prevInteractions);
            finishPendingInteractions(root, lanes);
          }
          {
            isFlushingPassiveEffects = false;
          }
          executionContext = prevExecutionContext;
          flushSyncCallbackQueue();
          nestedPassiveUpdateCount = rootWithPendingPassiveEffects === null ? 0 : nestedPassiveUpdateCount + 1;
          return true;
        }
        function isAlreadyFailedLegacyErrorBoundary(instance) {
          return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
        }
        function markLegacyErrorBoundaryAsFailed(instance) {
          if (legacyErrorBoundariesThatAlreadyFailed === null) {
            legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([instance]);
          } else {
            legacyErrorBoundariesThatAlreadyFailed.add(instance);
          }
        }
        function prepareToThrowUncaughtError(error2) {
          if (!hasUncaughtError) {
            hasUncaughtError = true;
            firstUncaughtError = error2;
          }
        }
        var onUncaughtError = prepareToThrowUncaughtError;
        function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error2) {
          var errorInfo = createCapturedValue(error2, sourceFiber);
          var update = createRootErrorUpdate(rootFiber, errorInfo, SyncLane);
          enqueueUpdate(rootFiber, update);
          var eventTime = requestEventTime();
          var root = markUpdateLaneFromFiberToRoot(rootFiber, SyncLane);
          if (root !== null) {
            markRootUpdated(root, SyncLane, eventTime);
            ensureRootIsScheduled(root, eventTime);
            schedulePendingInteractions(root, SyncLane);
          }
        }
        function captureCommitPhaseError(sourceFiber, error2) {
          if (sourceFiber.tag === HostRoot) {
            captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error2);
            return;
          }
          var fiber = sourceFiber.return;
          while (fiber !== null) {
            if (fiber.tag === HostRoot) {
              captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error2);
              return;
            } else if (fiber.tag === ClassComponent) {
              var ctor = fiber.type;
              var instance = fiber.stateNode;
              if (typeof ctor.getDerivedStateFromError === "function" || typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance)) {
                var errorInfo = createCapturedValue(error2, sourceFiber);
                var update = createClassErrorUpdate(fiber, errorInfo, SyncLane);
                enqueueUpdate(fiber, update);
                var eventTime = requestEventTime();
                var root = markUpdateLaneFromFiberToRoot(fiber, SyncLane);
                if (root !== null) {
                  markRootUpdated(root, SyncLane, eventTime);
                  ensureRootIsScheduled(root, eventTime);
                  schedulePendingInteractions(root, SyncLane);
                } else {
                  if (typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance)) {
                    try {
                      instance.componentDidCatch(error2, errorInfo);
                    } catch (errorToIgnore) {
                    }
                  }
                }
                return;
              }
            }
            fiber = fiber.return;
          }
        }
        function pingSuspendedRoot(root, wakeable, pingedLanes) {
          var pingCache = root.pingCache;
          if (pingCache !== null) {
            pingCache.delete(wakeable);
          }
          var eventTime = requestEventTime();
          markRootPinged(root, pingedLanes);
          if (workInProgressRoot === root && isSubsetOfLanes(workInProgressRootRenderLanes, pingedLanes)) {
            if (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && includesOnlyRetries(workInProgressRootRenderLanes) && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS) {
              prepareFreshStack(root, NoLanes);
            } else {
              workInProgressRootPingedLanes = mergeLanes(workInProgressRootPingedLanes, pingedLanes);
            }
          }
          ensureRootIsScheduled(root, eventTime);
          schedulePendingInteractions(root, pingedLanes);
        }
        function retryTimedOutBoundary(boundaryFiber, retryLane) {
          if (retryLane === NoLane) {
            retryLane = requestRetryLane(boundaryFiber);
          }
          var eventTime = requestEventTime();
          var root = markUpdateLaneFromFiberToRoot(boundaryFiber, retryLane);
          if (root !== null) {
            markRootUpdated(root, retryLane, eventTime);
            ensureRootIsScheduled(root, eventTime);
            schedulePendingInteractions(root, retryLane);
          }
        }
        function resolveRetryWakeable(boundaryFiber, wakeable) {
          var retryLane = NoLane;
          var retryCache;
          {
            retryCache = boundaryFiber.stateNode;
          }
          if (retryCache !== null) {
            retryCache.delete(wakeable);
          }
          retryTimedOutBoundary(boundaryFiber, retryLane);
        }
        function jnd(timeElapsed) {
          return timeElapsed < 120 ? 120 : timeElapsed < 480 ? 480 : timeElapsed < 1080 ? 1080 : timeElapsed < 1920 ? 1920 : timeElapsed < 3e3 ? 3e3 : timeElapsed < 4320 ? 4320 : ceil(timeElapsed / 1960) * 1960;
        }
        function checkForNestedUpdates() {
          if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
            nestedUpdateCount = 0;
            rootWithNestedUpdates = null;
            {
              {
                throw Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
              }
            }
          }
          {
            if (nestedPassiveUpdateCount > NESTED_PASSIVE_UPDATE_LIMIT) {
              nestedPassiveUpdateCount = 0;
              error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.");
            }
          }
        }
        function flushRenderPhaseStrictModeWarningsInDEV() {
          {
            ReactStrictModeWarnings.flushLegacyContextWarning();
            {
              ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
            }
          }
        }
        var didWarnStateUpdateForNotYetMountedComponent = null;
        function warnAboutUpdateOnNotYetMountedFiberInDEV(fiber) {
          {
            if ((executionContext & RenderContext) !== NoContext) {
              return;
            }
            if (!(fiber.mode & (BlockingMode | ConcurrentMode))) {
              return;
            }
            var tag = fiber.tag;
            if (tag !== IndeterminateComponent && tag !== HostRoot && tag !== ClassComponent && tag !== FunctionComponent && tag !== ForwardRef && tag !== MemoComponent && tag !== SimpleMemoComponent && tag !== Block) {
              return;
            }
            var componentName = getComponentName(fiber.type) || "ReactComponent";
            if (didWarnStateUpdateForNotYetMountedComponent !== null) {
              if (didWarnStateUpdateForNotYetMountedComponent.has(componentName)) {
                return;
              }
              didWarnStateUpdateForNotYetMountedComponent.add(componentName);
            } else {
              didWarnStateUpdateForNotYetMountedComponent = /* @__PURE__ */ new Set([componentName]);
            }
            var previousFiber = current;
            try {
              setCurrentFiber(fiber);
              error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
            } finally {
              if (previousFiber) {
                setCurrentFiber(fiber);
              } else {
                resetCurrentFiber();
              }
            }
          }
        }
        var didWarnStateUpdateForUnmountedComponent = null;
        function warnAboutUpdateOnUnmountedFiberInDEV(fiber) {
          {
            var tag = fiber.tag;
            if (tag !== HostRoot && tag !== ClassComponent && tag !== FunctionComponent && tag !== ForwardRef && tag !== MemoComponent && tag !== SimpleMemoComponent && tag !== Block) {
              return;
            }
            if ((fiber.flags & PassiveUnmountPendingDev) !== NoFlags) {
              return;
            }
            var componentName = getComponentName(fiber.type) || "ReactComponent";
            if (didWarnStateUpdateForUnmountedComponent !== null) {
              if (didWarnStateUpdateForUnmountedComponent.has(componentName)) {
                return;
              }
              didWarnStateUpdateForUnmountedComponent.add(componentName);
            } else {
              didWarnStateUpdateForUnmountedComponent = /* @__PURE__ */ new Set([componentName]);
            }
            if (isFlushingPassiveEffects)
              ;
            else {
              var previousFiber = current;
              try {
                setCurrentFiber(fiber);
                error("Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.", tag === ClassComponent ? "the componentWillUnmount method" : "a useEffect cleanup function");
              } finally {
                if (previousFiber) {
                  setCurrentFiber(fiber);
                } else {
                  resetCurrentFiber();
                }
              }
            }
          }
        }
        var beginWork$1;
        {
          beginWork$1 = beginWork;
        }
        var didWarnAboutUpdateInRender = false;
        var didWarnAboutUpdateInRenderForAnotherComponent;
        {
          didWarnAboutUpdateInRenderForAnotherComponent = /* @__PURE__ */ new Set();
        }
        function warnAboutRenderPhaseUpdatesInDEV(fiber) {
          {
            if (isRendering && (executionContext & RenderContext) !== NoContext && !getIsUpdatingOpaqueValueInRenderPhaseInDEV()) {
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  var renderingComponentName = workInProgress && getComponentName(workInProgress.type) || "Unknown";
                  var dedupeKey = renderingComponentName;
                  if (!didWarnAboutUpdateInRenderForAnotherComponent.has(dedupeKey)) {
                    didWarnAboutUpdateInRenderForAnotherComponent.add(dedupeKey);
                    var setStateComponentName = getComponentName(fiber.type) || "Unknown";
                    error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", setStateComponentName, renderingComponentName, renderingComponentName);
                  }
                  break;
                }
                case ClassComponent: {
                  if (!didWarnAboutUpdateInRender) {
                    error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.");
                    didWarnAboutUpdateInRender = true;
                  }
                  break;
                }
              }
            }
          }
        }
        var IsThisRendererActing = {
          current: false
        };
        function warnIfNotScopedWithMatchingAct(fiber) {
          {
            if (IsSomeRendererActing.current === true && IsThisRendererActing.current !== true) {
              var previousFiber = current;
              try {
                setCurrentFiber(fiber);
                error("It looks like you're using the wrong act() around your test interactions.\nBe sure to use the matching version of act() corresponding to your renderer:\n\n// for react-dom:\nimport {act} from 'react-dom/test-utils';\n// ...\nact(() => ...);\n\n// for react-test-renderer:\nimport TestRenderer from react-test-renderer';\nconst {act} = TestRenderer;\n// ...\nact(() => ...);");
              } finally {
                if (previousFiber) {
                  setCurrentFiber(fiber);
                } else {
                  resetCurrentFiber();
                }
              }
            }
          }
        }
        function warnIfNotCurrentlyActingEffectsInDEV(fiber) {
          {
            if ((fiber.mode & StrictMode) !== NoMode && IsSomeRendererActing.current === false && IsThisRendererActing.current === false) {
              error("An update to %s ran an effect, but was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act", getComponentName(fiber.type));
            }
          }
        }
        function warnIfNotCurrentlyActingUpdatesInDEV(fiber) {
          {
            if (executionContext === NoContext && IsSomeRendererActing.current === false && IsThisRendererActing.current === false) {
              var previousFiber = current;
              try {
                setCurrentFiber(fiber);
                error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act", getComponentName(fiber.type));
              } finally {
                if (previousFiber) {
                  setCurrentFiber(fiber);
                } else {
                  resetCurrentFiber();
                }
              }
            }
          }
        }
        var warnIfNotCurrentlyActingUpdatesInDev = warnIfNotCurrentlyActingUpdatesInDEV;
        var didWarnAboutUnmockedScheduler = false;
        function warnIfUnmockedScheduler(fiber) {
          {
            if (didWarnAboutUnmockedScheduler === false && Scheduler$1.unstable_flushAllWithoutAsserting === void 0) {
              if (fiber.mode & BlockingMode || fiber.mode & ConcurrentMode) {
                didWarnAboutUnmockedScheduler = true;
                error(`In Concurrent or Sync modes, the "scheduler" module needs to be mocked to guarantee consistent behaviour across tests and browsers. For example, with jest: 
jest.mock('scheduler', () => require('scheduler/unstable_mock'));

For more info, visit https://reactjs.org/link/mock-scheduler`);
              }
            }
          }
        }
        function computeThreadID(root, lane) {
          return lane * 1e3 + root.interactionThreadID;
        }
        function markSpawnedWork(lane) {
          if (spawnedWorkDuringRender === null) {
            spawnedWorkDuringRender = [lane];
          } else {
            spawnedWorkDuringRender.push(lane);
          }
        }
        function scheduleInteractions(root, lane, interactions) {
          if (interactions.size > 0) {
            var pendingInteractionMap = root.pendingInteractionMap;
            var pendingInteractions = pendingInteractionMap.get(lane);
            if (pendingInteractions != null) {
              interactions.forEach(function(interaction) {
                if (!pendingInteractions.has(interaction)) {
                  interaction.__count++;
                }
                pendingInteractions.add(interaction);
              });
            } else {
              pendingInteractionMap.set(lane, new Set(interactions));
              interactions.forEach(function(interaction) {
                interaction.__count++;
              });
            }
            var subscriber = tracing.__subscriberRef.current;
            if (subscriber !== null) {
              var threadID = computeThreadID(root, lane);
              subscriber.onWorkScheduled(interactions, threadID);
            }
          }
        }
        function schedulePendingInteractions(root, lane) {
          scheduleInteractions(root, lane, tracing.__interactionsRef.current);
        }
        function startWorkOnPendingInteractions(root, lanes) {
          var interactions = /* @__PURE__ */ new Set();
          root.pendingInteractionMap.forEach(function(scheduledInteractions, scheduledLane) {
            if (includesSomeLane(lanes, scheduledLane)) {
              scheduledInteractions.forEach(function(interaction) {
                return interactions.add(interaction);
              });
            }
          });
          root.memoizedInteractions = interactions;
          if (interactions.size > 0) {
            var subscriber = tracing.__subscriberRef.current;
            if (subscriber !== null) {
              var threadID = computeThreadID(root, lanes);
              try {
                subscriber.onWorkStarted(interactions, threadID);
              } catch (error2) {
                scheduleCallback(ImmediatePriority$1, function() {
                  throw error2;
                });
              }
            }
          }
        }
        function finishPendingInteractions(root, committedLanes) {
          var remainingLanesAfterCommit = root.pendingLanes;
          var subscriber;
          try {
            subscriber = tracing.__subscriberRef.current;
            if (subscriber !== null && root.memoizedInteractions.size > 0) {
              var threadID = computeThreadID(root, committedLanes);
              subscriber.onWorkStopped(root.memoizedInteractions, threadID);
            }
          } catch (error2) {
            scheduleCallback(ImmediatePriority$1, function() {
              throw error2;
            });
          } finally {
            var pendingInteractionMap = root.pendingInteractionMap;
            pendingInteractionMap.forEach(function(scheduledInteractions, lane) {
              if (!includesSomeLane(remainingLanesAfterCommit, lane)) {
                pendingInteractionMap.delete(lane);
                scheduledInteractions.forEach(function(interaction) {
                  interaction.__count--;
                  if (subscriber !== null && interaction.__count === 0) {
                    try {
                      subscriber.onInteractionScheduledWorkCompleted(interaction);
                    } catch (error2) {
                      scheduleCallback(ImmediatePriority$1, function() {
                        throw error2;
                      });
                    }
                  }
                });
              }
            });
          }
        }
        function shouldForceFlushFallbacksInDEV() {
          return actingUpdatesScopeDepth > 0;
        }
        var flushMockScheduler = Scheduler$1.unstable_flushAllWithoutAsserting;
        var isSchedulerMocked = typeof flushMockScheduler === "function";
        function flushActWork() {
          if (flushMockScheduler !== void 0) {
            try {
              return flushMockScheduler();
            } finally {
            }
          } else {
            try {
              var didFlushWork = false;
              while (flushPassiveEffects()) {
                didFlushWork = true;
              }
              return didFlushWork;
            } finally {
            }
          }
        }
        function flushWorkAndMicroTasks(onDone) {
          try {
            flushActWork();
            enqueueTask(function() {
              if (flushActWork()) {
                flushWorkAndMicroTasks(onDone);
              } else {
                onDone();
              }
            });
          } catch (err) {
            onDone(err);
          }
        }
        var actingUpdatesScopeDepth = 0;
        function act(callback) {
          var previousActingUpdatesScopeDepth = actingUpdatesScopeDepth;
          actingUpdatesScopeDepth++;
          var previousIsSomeRendererActing = IsSomeRendererActing.current;
          var previousIsThisRendererActing = IsThisRendererActing.current;
          IsSomeRendererActing.current = true;
          IsThisRendererActing.current = true;
          function onDone() {
            actingUpdatesScopeDepth--;
            IsSomeRendererActing.current = previousIsSomeRendererActing;
            IsThisRendererActing.current = previousIsThisRendererActing;
            {
              if (actingUpdatesScopeDepth > previousActingUpdatesScopeDepth) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
            }
          }
          var result;
          try {
            result = batchedUpdates(callback);
          } catch (error2) {
            onDone();
            throw error2;
          }
          if (result !== null && typeof result === "object" && typeof result.then === "function") {
            var called = false;
            {
              if (typeof Promise !== "undefined") {
                Promise.resolve().then(function() {
                }).then(function() {
                  if (called === false) {
                    error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                  }
                });
              }
            }
            return {
              then: function(resolve, reject) {
                called = true;
                result.then(function() {
                  if (actingUpdatesScopeDepth > 1 || isSchedulerMocked === true && previousIsSomeRendererActing === true) {
                    onDone();
                    resolve();
                    return;
                  }
                  flushWorkAndMicroTasks(function(err) {
                    onDone();
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                }, function(err) {
                  onDone();
                  reject(err);
                });
              }
            };
          } else {
            {
              if (result !== void 0) {
                error("The callback passed to act(...) function must return undefined, or a Promise. You returned %s", result);
              }
            }
            try {
              if (actingUpdatesScopeDepth === 1 && (isSchedulerMocked === false || previousIsSomeRendererActing === false)) {
                flushActWork();
              }
              onDone();
            } catch (err) {
              onDone();
              throw err;
            }
            return {
              then: function(resolve) {
                {
                  error("Do not await the result of calling act(...) with sync logic, it is not a Promise.");
                }
                resolve();
              }
            };
          }
        }
        function detachFiberAfterEffects(fiber) {
          fiber.sibling = null;
          fiber.stateNode = null;
        }
        var resolveFamily = null;
        var failedBoundaries = null;
        var setRefreshHandler = function(handler) {
          {
            resolveFamily = handler;
          }
        };
        function resolveFunctionForHotReloading(type) {
          {
            if (resolveFamily === null) {
              return type;
            }
            var family = resolveFamily(type);
            if (family === void 0) {
              return type;
            }
            return family.current;
          }
        }
        function resolveClassForHotReloading(type) {
          return resolveFunctionForHotReloading(type);
        }
        function resolveForwardRefForHotReloading(type) {
          {
            if (resolveFamily === null) {
              return type;
            }
            var family = resolveFamily(type);
            if (family === void 0) {
              if (type !== null && type !== void 0 && typeof type.render === "function") {
                var currentRender = resolveFunctionForHotReloading(type.render);
                if (type.render !== currentRender) {
                  var syntheticType = {
                    $$typeof: REACT_FORWARD_REF_TYPE,
                    render: currentRender
                  };
                  if (type.displayName !== void 0) {
                    syntheticType.displayName = type.displayName;
                  }
                  return syntheticType;
                }
              }
              return type;
            }
            return family.current;
          }
        }
        function isCompatibleFamilyForHotReloading(fiber, element) {
          {
            if (resolveFamily === null) {
              return false;
            }
            var prevType = fiber.elementType;
            var nextType = element.type;
            var needsCompareFamilies = false;
            var $$typeofNextType = typeof nextType === "object" && nextType !== null ? nextType.$$typeof : null;
            switch (fiber.tag) {
              case ClassComponent: {
                if (typeof nextType === "function") {
                  needsCompareFamilies = true;
                }
                break;
              }
              case FunctionComponent: {
                if (typeof nextType === "function") {
                  needsCompareFamilies = true;
                } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                  needsCompareFamilies = true;
                }
                break;
              }
              case ForwardRef: {
                if ($$typeofNextType === REACT_FORWARD_REF_TYPE) {
                  needsCompareFamilies = true;
                } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                  needsCompareFamilies = true;
                }
                break;
              }
              case MemoComponent:
              case SimpleMemoComponent: {
                if ($$typeofNextType === REACT_MEMO_TYPE) {
                  needsCompareFamilies = true;
                } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                  needsCompareFamilies = true;
                }
                break;
              }
              default:
                return false;
            }
            if (needsCompareFamilies) {
              var prevFamily = resolveFamily(prevType);
              if (prevFamily !== void 0 && prevFamily === resolveFamily(nextType)) {
                return true;
              }
            }
            return false;
          }
        }
        function markFailedErrorBoundaryForHotReloading(fiber) {
          {
            if (resolveFamily === null) {
              return;
            }
            if (typeof WeakSet !== "function") {
              return;
            }
            if (failedBoundaries === null) {
              failedBoundaries = /* @__PURE__ */ new WeakSet();
            }
            failedBoundaries.add(fiber);
          }
        }
        var scheduleRefresh = function(root, update) {
          {
            if (resolveFamily === null) {
              return;
            }
            var staleFamilies = update.staleFamilies, updatedFamilies = update.updatedFamilies;
            flushPassiveEffects();
            flushSync(function() {
              scheduleFibersWithFamiliesRecursively(root.current, updatedFamilies, staleFamilies);
            });
          }
        };
        var scheduleRoot = function(root, element) {
          {
            if (root.context !== emptyContextObject) {
              return;
            }
            flushPassiveEffects();
            flushSync(function() {
              updateContainer(element, root, null, null);
            });
          }
        };
        function scheduleFibersWithFamiliesRecursively(fiber, updatedFamilies, staleFamilies) {
          {
            var alternate = fiber.alternate, child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type;
            var candidateType = null;
            switch (tag) {
              case FunctionComponent:
              case SimpleMemoComponent:
              case ClassComponent:
                candidateType = type;
                break;
              case ForwardRef:
                candidateType = type.render;
                break;
            }
            if (resolveFamily === null) {
              throw new Error("Expected resolveFamily to be set during hot reload.");
            }
            var needsRender = false;
            var needsRemount = false;
            if (candidateType !== null) {
              var family = resolveFamily(candidateType);
              if (family !== void 0) {
                if (staleFamilies.has(family)) {
                  needsRemount = true;
                } else if (updatedFamilies.has(family)) {
                  if (tag === ClassComponent) {
                    needsRemount = true;
                  } else {
                    needsRender = true;
                  }
                }
              }
            }
            if (failedBoundaries !== null) {
              if (failedBoundaries.has(fiber) || alternate !== null && failedBoundaries.has(alternate)) {
                needsRemount = true;
              }
            }
            if (needsRemount) {
              fiber._debugNeedsRemount = true;
            }
            if (needsRemount || needsRender) {
              scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
            }
            if (child !== null && !needsRemount) {
              scheduleFibersWithFamiliesRecursively(child, updatedFamilies, staleFamilies);
            }
            if (sibling !== null) {
              scheduleFibersWithFamiliesRecursively(sibling, updatedFamilies, staleFamilies);
            }
          }
        }
        var findHostInstancesForRefresh = function(root, families) {
          {
            var hostInstances = /* @__PURE__ */ new Set();
            var types = new Set(families.map(function(family) {
              return family.current;
            }));
            findHostInstancesForMatchingFibersRecursively(root.current, types, hostInstances);
            return hostInstances;
          }
        };
        function findHostInstancesForMatchingFibersRecursively(fiber, types, hostInstances) {
          {
            var child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type;
            var candidateType = null;
            switch (tag) {
              case FunctionComponent:
              case SimpleMemoComponent:
              case ClassComponent:
                candidateType = type;
                break;
              case ForwardRef:
                candidateType = type.render;
                break;
            }
            var didMatch = false;
            if (candidateType !== null) {
              if (types.has(candidateType)) {
                didMatch = true;
              }
            }
            if (didMatch) {
              findHostInstancesForFiberShallowly(fiber, hostInstances);
            } else {
              if (child !== null) {
                findHostInstancesForMatchingFibersRecursively(child, types, hostInstances);
              }
            }
            if (sibling !== null) {
              findHostInstancesForMatchingFibersRecursively(sibling, types, hostInstances);
            }
          }
        }
        function findHostInstancesForFiberShallowly(fiber, hostInstances) {
          {
            var foundHostInstances = findChildHostInstancesForFiberShallowly(fiber, hostInstances);
            if (foundHostInstances) {
              return;
            }
            var node = fiber;
            while (true) {
              switch (node.tag) {
                case HostComponent:
                  hostInstances.add(node.stateNode);
                  return;
                case HostPortal:
                  hostInstances.add(node.stateNode.containerInfo);
                  return;
                case HostRoot:
                  hostInstances.add(node.stateNode.containerInfo);
                  return;
              }
              if (node.return === null) {
                throw new Error("Expected to reach root first.");
              }
              node = node.return;
            }
          }
        }
        function findChildHostInstancesForFiberShallowly(fiber, hostInstances) {
          {
            var node = fiber;
            var foundHostInstances = false;
            while (true) {
              if (node.tag === HostComponent) {
                foundHostInstances = true;
                hostInstances.add(node.stateNode);
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === fiber) {
                return foundHostInstances;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === fiber) {
                  return foundHostInstances;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          }
          return false;
        }
        var hasBadMapPolyfill;
        {
          hasBadMapPolyfill = false;
          try {
            var nonExtensibleObject = Object.preventExtensions({});
            /* @__PURE__ */ new Map([[nonExtensibleObject, null]]);
            /* @__PURE__ */ new Set([nonExtensibleObject]);
          } catch (e) {
            hasBadMapPolyfill = true;
          }
        }
        var debugCounter = 1;
        function FiberNode(tag, pendingProps, key, mode) {
          this.tag = tag;
          this.key = key;
          this.elementType = null;
          this.type = null;
          this.stateNode = null;
          this.return = null;
          this.child = null;
          this.sibling = null;
          this.index = 0;
          this.ref = null;
          this.pendingProps = pendingProps;
          this.memoizedProps = null;
          this.updateQueue = null;
          this.memoizedState = null;
          this.dependencies = null;
          this.mode = mode;
          this.flags = NoFlags;
          this.nextEffect = null;
          this.firstEffect = null;
          this.lastEffect = null;
          this.lanes = NoLanes;
          this.childLanes = NoLanes;
          this.alternate = null;
          {
            this.actualDuration = Number.NaN;
            this.actualStartTime = Number.NaN;
            this.selfBaseDuration = Number.NaN;
            this.treeBaseDuration = Number.NaN;
            this.actualDuration = 0;
            this.actualStartTime = -1;
            this.selfBaseDuration = 0;
            this.treeBaseDuration = 0;
          }
          {
            this._debugID = debugCounter++;
            this._debugSource = null;
            this._debugOwner = null;
            this._debugNeedsRemount = false;
            this._debugHookTypes = null;
            if (!hasBadMapPolyfill && typeof Object.preventExtensions === "function") {
              Object.preventExtensions(this);
            }
          }
        }
        var createFiber = function(tag, pendingProps, key, mode) {
          return new FiberNode(tag, pendingProps, key, mode);
        };
        function shouldConstruct$1(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function isSimpleFunctionComponent(type) {
          return typeof type === "function" && !shouldConstruct$1(type) && type.defaultProps === void 0;
        }
        function resolveLazyComponentTag(Component) {
          if (typeof Component === "function") {
            return shouldConstruct$1(Component) ? ClassComponent : FunctionComponent;
          } else if (Component !== void 0 && Component !== null) {
            var $$typeof = Component.$$typeof;
            if ($$typeof === REACT_FORWARD_REF_TYPE) {
              return ForwardRef;
            }
            if ($$typeof === REACT_MEMO_TYPE) {
              return MemoComponent;
            }
          }
          return IndeterminateComponent;
        }
        function createWorkInProgress(current2, pendingProps) {
          var workInProgress2 = current2.alternate;
          if (workInProgress2 === null) {
            workInProgress2 = createFiber(current2.tag, pendingProps, current2.key, current2.mode);
            workInProgress2.elementType = current2.elementType;
            workInProgress2.type = current2.type;
            workInProgress2.stateNode = current2.stateNode;
            {
              workInProgress2._debugID = current2._debugID;
              workInProgress2._debugSource = current2._debugSource;
              workInProgress2._debugOwner = current2._debugOwner;
              workInProgress2._debugHookTypes = current2._debugHookTypes;
            }
            workInProgress2.alternate = current2;
            current2.alternate = workInProgress2;
          } else {
            workInProgress2.pendingProps = pendingProps;
            workInProgress2.type = current2.type;
            workInProgress2.flags = NoFlags;
            workInProgress2.nextEffect = null;
            workInProgress2.firstEffect = null;
            workInProgress2.lastEffect = null;
            {
              workInProgress2.actualDuration = 0;
              workInProgress2.actualStartTime = -1;
            }
          }
          workInProgress2.childLanes = current2.childLanes;
          workInProgress2.lanes = current2.lanes;
          workInProgress2.child = current2.child;
          workInProgress2.memoizedProps = current2.memoizedProps;
          workInProgress2.memoizedState = current2.memoizedState;
          workInProgress2.updateQueue = current2.updateQueue;
          var currentDependencies = current2.dependencies;
          workInProgress2.dependencies = currentDependencies === null ? null : {
            lanes: currentDependencies.lanes,
            firstContext: currentDependencies.firstContext
          };
          workInProgress2.sibling = current2.sibling;
          workInProgress2.index = current2.index;
          workInProgress2.ref = current2.ref;
          {
            workInProgress2.selfBaseDuration = current2.selfBaseDuration;
            workInProgress2.treeBaseDuration = current2.treeBaseDuration;
          }
          {
            workInProgress2._debugNeedsRemount = current2._debugNeedsRemount;
            switch (workInProgress2.tag) {
              case IndeterminateComponent:
              case FunctionComponent:
              case SimpleMemoComponent:
                workInProgress2.type = resolveFunctionForHotReloading(current2.type);
                break;
              case ClassComponent:
                workInProgress2.type = resolveClassForHotReloading(current2.type);
                break;
              case ForwardRef:
                workInProgress2.type = resolveForwardRefForHotReloading(current2.type);
                break;
            }
          }
          return workInProgress2;
        }
        function resetWorkInProgress(workInProgress2, renderLanes2) {
          workInProgress2.flags &= Placement;
          workInProgress2.nextEffect = null;
          workInProgress2.firstEffect = null;
          workInProgress2.lastEffect = null;
          var current2 = workInProgress2.alternate;
          if (current2 === null) {
            workInProgress2.childLanes = NoLanes;
            workInProgress2.lanes = renderLanes2;
            workInProgress2.child = null;
            workInProgress2.memoizedProps = null;
            workInProgress2.memoizedState = null;
            workInProgress2.updateQueue = null;
            workInProgress2.dependencies = null;
            workInProgress2.stateNode = null;
            {
              workInProgress2.selfBaseDuration = 0;
              workInProgress2.treeBaseDuration = 0;
            }
          } else {
            workInProgress2.childLanes = current2.childLanes;
            workInProgress2.lanes = current2.lanes;
            workInProgress2.child = current2.child;
            workInProgress2.memoizedProps = current2.memoizedProps;
            workInProgress2.memoizedState = current2.memoizedState;
            workInProgress2.updateQueue = current2.updateQueue;
            workInProgress2.type = current2.type;
            var currentDependencies = current2.dependencies;
            workInProgress2.dependencies = currentDependencies === null ? null : {
              lanes: currentDependencies.lanes,
              firstContext: currentDependencies.firstContext
            };
            {
              workInProgress2.selfBaseDuration = current2.selfBaseDuration;
              workInProgress2.treeBaseDuration = current2.treeBaseDuration;
            }
          }
          return workInProgress2;
        }
        function createHostRootFiber(tag) {
          var mode;
          if (tag === ConcurrentRoot) {
            mode = ConcurrentMode | BlockingMode | StrictMode;
          } else if (tag === BlockingRoot) {
            mode = BlockingMode | StrictMode;
          } else {
            mode = NoMode;
          }
          if (isDevToolsPresent) {
            mode |= ProfileMode;
          }
          return createFiber(HostRoot, null, null, mode);
        }
        function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
          var fiberTag = IndeterminateComponent;
          var resolvedType = type;
          if (typeof type === "function") {
            if (shouldConstruct$1(type)) {
              fiberTag = ClassComponent;
              {
                resolvedType = resolveClassForHotReloading(resolvedType);
              }
            } else {
              {
                resolvedType = resolveFunctionForHotReloading(resolvedType);
              }
            }
          } else if (typeof type === "string") {
            fiberTag = HostComponent;
          } else {
            getTag:
              switch (type) {
                case REACT_FRAGMENT_TYPE:
                  return createFiberFromFragment(pendingProps.children, mode, lanes, key);
                case REACT_DEBUG_TRACING_MODE_TYPE:
                  fiberTag = Mode;
                  mode |= DebugTracingMode;
                  break;
                case REACT_STRICT_MODE_TYPE:
                  fiberTag = Mode;
                  mode |= StrictMode;
                  break;
                case REACT_PROFILER_TYPE:
                  return createFiberFromProfiler(pendingProps, mode, lanes, key);
                case REACT_SUSPENSE_TYPE:
                  return createFiberFromSuspense(pendingProps, mode, lanes, key);
                case REACT_SUSPENSE_LIST_TYPE:
                  return createFiberFromSuspenseList(pendingProps, mode, lanes, key);
                case REACT_OFFSCREEN_TYPE:
                  return createFiberFromOffscreen(pendingProps, mode, lanes, key);
                case REACT_LEGACY_HIDDEN_TYPE:
                  return createFiberFromLegacyHidden(pendingProps, mode, lanes, key);
                case REACT_SCOPE_TYPE:
                default: {
                  if (typeof type === "object" && type !== null) {
                    switch (type.$$typeof) {
                      case REACT_PROVIDER_TYPE:
                        fiberTag = ContextProvider;
                        break getTag;
                      case REACT_CONTEXT_TYPE:
                        fiberTag = ContextConsumer;
                        break getTag;
                      case REACT_FORWARD_REF_TYPE:
                        fiberTag = ForwardRef;
                        {
                          resolvedType = resolveForwardRefForHotReloading(resolvedType);
                        }
                        break getTag;
                      case REACT_MEMO_TYPE:
                        fiberTag = MemoComponent;
                        break getTag;
                      case REACT_LAZY_TYPE:
                        fiberTag = LazyComponent;
                        resolvedType = null;
                        break getTag;
                      case REACT_BLOCK_TYPE:
                        fiberTag = Block;
                        break getTag;
                    }
                  }
                  var info = "";
                  {
                    if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                      info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                    }
                    var ownerName = owner ? getComponentName(owner.type) : null;
                    if (ownerName) {
                      info += "\n\nCheck the render method of `" + ownerName + "`.";
                    }
                  }
                  {
                    {
                      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (type == null ? type : typeof type) + "." + info);
                    }
                  }
                }
              }
          }
          var fiber = createFiber(fiberTag, pendingProps, key, mode);
          fiber.elementType = type;
          fiber.type = resolvedType;
          fiber.lanes = lanes;
          {
            fiber._debugOwner = owner;
          }
          return fiber;
        }
        function createFiberFromElement(element, mode, lanes) {
          var owner = null;
          {
            owner = element._owner;
          }
          var type = element.type;
          var key = element.key;
          var pendingProps = element.props;
          var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes);
          {
            fiber._debugSource = element._source;
            fiber._debugOwner = element._owner;
          }
          return fiber;
        }
        function createFiberFromFragment(elements, mode, lanes, key) {
          var fiber = createFiber(Fragment, elements, key, mode);
          fiber.lanes = lanes;
          return fiber;
        }
        function createFiberFromProfiler(pendingProps, mode, lanes, key) {
          {
            if (typeof pendingProps.id !== "string") {
              error('Profiler must specify an "id" as a prop');
            }
          }
          var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
          fiber.elementType = REACT_PROFILER_TYPE;
          fiber.type = REACT_PROFILER_TYPE;
          fiber.lanes = lanes;
          {
            fiber.stateNode = {
              effectDuration: 0,
              passiveEffectDuration: 0
            };
          }
          return fiber;
        }
        function createFiberFromSuspense(pendingProps, mode, lanes, key) {
          var fiber = createFiber(SuspenseComponent, pendingProps, key, mode);
          fiber.type = REACT_SUSPENSE_TYPE;
          fiber.elementType = REACT_SUSPENSE_TYPE;
          fiber.lanes = lanes;
          return fiber;
        }
        function createFiberFromSuspenseList(pendingProps, mode, lanes, key) {
          var fiber = createFiber(SuspenseListComponent, pendingProps, key, mode);
          {
            fiber.type = REACT_SUSPENSE_LIST_TYPE;
          }
          fiber.elementType = REACT_SUSPENSE_LIST_TYPE;
          fiber.lanes = lanes;
          return fiber;
        }
        function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
          var fiber = createFiber(OffscreenComponent, pendingProps, key, mode);
          {
            fiber.type = REACT_OFFSCREEN_TYPE;
          }
          fiber.elementType = REACT_OFFSCREEN_TYPE;
          fiber.lanes = lanes;
          return fiber;
        }
        function createFiberFromLegacyHidden(pendingProps, mode, lanes, key) {
          var fiber = createFiber(LegacyHiddenComponent, pendingProps, key, mode);
          {
            fiber.type = REACT_LEGACY_HIDDEN_TYPE;
          }
          fiber.elementType = REACT_LEGACY_HIDDEN_TYPE;
          fiber.lanes = lanes;
          return fiber;
        }
        function createFiberFromText(content, mode, lanes) {
          var fiber = createFiber(HostText, content, null, mode);
          fiber.lanes = lanes;
          return fiber;
        }
        function createFiberFromPortal(portal, mode, lanes) {
          var pendingProps = portal.children !== null ? portal.children : [];
          var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
          fiber.lanes = lanes;
          fiber.stateNode = {
            containerInfo: portal.containerInfo,
            pendingChildren: null,
            implementation: portal.implementation
          };
          return fiber;
        }
        function FiberRootNode(containerInfo, tag, hydrate) {
          this.tag = tag;
          this.containerInfo = containerInfo;
          this.pendingChildren = null;
          this.current = null;
          this.pingCache = null;
          this.finishedWork = null;
          this.timeoutHandle = noTimeout;
          this.context = null;
          this.pendingContext = null;
          this.hydrate = hydrate;
          this.callbackNode = null;
          this.callbackPriority = NoLanePriority;
          this.eventTimes = createLaneMap(NoLanes);
          this.expirationTimes = createLaneMap(NoTimestamp);
          this.pendingLanes = NoLanes;
          this.suspendedLanes = NoLanes;
          this.pingedLanes = NoLanes;
          this.expiredLanes = NoLanes;
          this.mutableReadLanes = NoLanes;
          this.finishedLanes = NoLanes;
          this.entangledLanes = NoLanes;
          this.entanglements = createLaneMap(NoLanes);
          {
            this.interactionThreadID = tracing.unstable_getThreadID();
            this.memoizedInteractions = /* @__PURE__ */ new Set();
            this.pendingInteractionMap = /* @__PURE__ */ new Map();
          }
          {
            switch (tag) {
              case BlockingRoot:
                this._debugRootType = "createBlockingRoot()";
                break;
              case ConcurrentRoot:
                this._debugRootType = "createRoot()";
                break;
              case LegacyRoot:
                this._debugRootType = "createLegacyRoot()";
                break;
            }
          }
        }
        function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
          var root = new FiberRootNode(containerInfo, tag, hydrate);
          var uninitializedFiber = createHostRootFiber(tag);
          root.current = uninitializedFiber;
          uninitializedFiber.stateNode = root;
          initializeUpdateQueue(uninitializedFiber);
          return root;
        }
        var didWarnAboutNestedUpdates;
        {
          didWarnAboutNestedUpdates = false;
        }
        function getContextForSubtree(parentComponent) {
          if (!parentComponent) {
            return emptyContextObject;
          }
          var fiber = get(parentComponent);
          var parentContext = findCurrentUnmaskedContext(fiber);
          if (fiber.tag === ClassComponent) {
            var Component = fiber.type;
            if (isContextProvider(Component)) {
              return processChildContext(fiber, Component, parentContext);
            }
          }
          return parentContext;
        }
        function createContainer(containerInfo, tag, hydrate, hydrationCallbacks) {
          return createFiberRoot(containerInfo, tag, hydrate);
        }
        function updateContainer(element, container, parentComponent, callback) {
          {
            onScheduleRoot(container, element);
          }
          var current$1 = container.current;
          var eventTime = requestEventTime();
          {
            if (typeof jest !== "undefined") {
              warnIfUnmockedScheduler(current$1);
              warnIfNotScopedWithMatchingAct(current$1);
            }
          }
          var lane = requestUpdateLane(current$1);
          var context = getContextForSubtree(parentComponent);
          if (container.context === null) {
            container.context = context;
          } else {
            container.pendingContext = context;
          }
          {
            if (isRendering && current !== null && !didWarnAboutNestedUpdates) {
              didWarnAboutNestedUpdates = true;
              error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", getComponentName(current.type) || "Unknown");
            }
          }
          var update = createUpdate(eventTime, lane);
          update.payload = {
            element
          };
          callback = callback === void 0 ? null : callback;
          if (callback !== null) {
            {
              if (typeof callback !== "function") {
                error("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callback);
              }
            }
            update.callback = callback;
          }
          enqueueUpdate(current$1, update);
          scheduleUpdateOnFiber(current$1, lane, eventTime);
          return lane;
        }
        function getPublicRootInstance(container) {
          var containerFiber = container.current;
          if (!containerFiber.child) {
            return null;
          }
          switch (containerFiber.child.tag) {
            case HostComponent:
              return getPublicInstance(containerFiber.child.stateNode);
            default:
              return containerFiber.child.stateNode;
          }
        }
        var shouldSuspendImpl = function(fiber) {
          return false;
        };
        function shouldSuspend(fiber) {
          return shouldSuspendImpl(fiber);
        }
        var overrideHookState = null;
        var overrideHookStateDeletePath = null;
        var overrideHookStateRenamePath = null;
        var overrideProps = null;
        var overridePropsDeletePath = null;
        var overridePropsRenamePath = null;
        var scheduleUpdate = null;
        var setSuspenseHandler = null;
        {
          var copyWithDeleteImpl = function(obj, path, index2) {
            var key = path[index2];
            var updated = Array.isArray(obj) ? obj.slice() : _assign({}, obj);
            if (index2 + 1 === path.length) {
              if (Array.isArray(updated)) {
                updated.splice(key, 1);
              } else {
                delete updated[key];
              }
              return updated;
            }
            updated[key] = copyWithDeleteImpl(obj[key], path, index2 + 1);
            return updated;
          };
          var copyWithDelete = function(obj, path) {
            return copyWithDeleteImpl(obj, path, 0);
          };
          var copyWithRenameImpl = function(obj, oldPath, newPath, index2) {
            var oldKey = oldPath[index2];
            var updated = Array.isArray(obj) ? obj.slice() : _assign({}, obj);
            if (index2 + 1 === oldPath.length) {
              var newKey = newPath[index2];
              updated[newKey] = updated[oldKey];
              if (Array.isArray(updated)) {
                updated.splice(oldKey, 1);
              } else {
                delete updated[oldKey];
              }
            } else {
              updated[oldKey] = copyWithRenameImpl(obj[oldKey], oldPath, newPath, index2 + 1);
            }
            return updated;
          };
          var copyWithRename = function(obj, oldPath, newPath) {
            if (oldPath.length !== newPath.length) {
              warn("copyWithRename() expects paths of the same length");
              return;
            } else {
              for (var i = 0; i < newPath.length - 1; i++) {
                if (oldPath[i] !== newPath[i]) {
                  warn("copyWithRename() expects paths to be the same except for the deepest key");
                  return;
                }
              }
            }
            return copyWithRenameImpl(obj, oldPath, newPath, 0);
          };
          var copyWithSetImpl = function(obj, path, index2, value) {
            if (index2 >= path.length) {
              return value;
            }
            var key = path[index2];
            var updated = Array.isArray(obj) ? obj.slice() : _assign({}, obj);
            updated[key] = copyWithSetImpl(obj[key], path, index2 + 1, value);
            return updated;
          };
          var copyWithSet = function(obj, path, value) {
            return copyWithSetImpl(obj, path, 0, value);
          };
          var findHook = function(fiber, id) {
            var currentHook2 = fiber.memoizedState;
            while (currentHook2 !== null && id > 0) {
              currentHook2 = currentHook2.next;
              id--;
            }
            return currentHook2;
          };
          overrideHookState = function(fiber, id, path, value) {
            var hook = findHook(fiber, id);
            if (hook !== null) {
              var newState = copyWithSet(hook.memoizedState, path, value);
              hook.memoizedState = newState;
              hook.baseState = newState;
              fiber.memoizedProps = _assign({}, fiber.memoizedProps);
              scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
            }
          };
          overrideHookStateDeletePath = function(fiber, id, path) {
            var hook = findHook(fiber, id);
            if (hook !== null) {
              var newState = copyWithDelete(hook.memoizedState, path);
              hook.memoizedState = newState;
              hook.baseState = newState;
              fiber.memoizedProps = _assign({}, fiber.memoizedProps);
              scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
            }
          };
          overrideHookStateRenamePath = function(fiber, id, oldPath, newPath) {
            var hook = findHook(fiber, id);
            if (hook !== null) {
              var newState = copyWithRename(hook.memoizedState, oldPath, newPath);
              hook.memoizedState = newState;
              hook.baseState = newState;
              fiber.memoizedProps = _assign({}, fiber.memoizedProps);
              scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
            }
          };
          overrideProps = function(fiber, path, value) {
            fiber.pendingProps = copyWithSet(fiber.memoizedProps, path, value);
            if (fiber.alternate) {
              fiber.alternate.pendingProps = fiber.pendingProps;
            }
            scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
          };
          overridePropsDeletePath = function(fiber, path) {
            fiber.pendingProps = copyWithDelete(fiber.memoizedProps, path);
            if (fiber.alternate) {
              fiber.alternate.pendingProps = fiber.pendingProps;
            }
            scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
          };
          overridePropsRenamePath = function(fiber, oldPath, newPath) {
            fiber.pendingProps = copyWithRename(fiber.memoizedProps, oldPath, newPath);
            if (fiber.alternate) {
              fiber.alternate.pendingProps = fiber.pendingProps;
            }
            scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
          };
          scheduleUpdate = function(fiber) {
            scheduleUpdateOnFiber(fiber, SyncLane, NoTimestamp);
          };
          setSuspenseHandler = function(newShouldSuspendImpl) {
            shouldSuspendImpl = newShouldSuspendImpl;
          };
        }
        function findHostInstanceByFiber(fiber) {
          var hostFiber = findCurrentHostFiber(fiber);
          if (hostFiber === null) {
            return null;
          }
          return hostFiber.stateNode;
        }
        function emptyFindFiberByHostInstance(instance) {
          return null;
        }
        function getCurrentFiberForDevTools() {
          return current;
        }
        function injectIntoDevTools(devToolsConfig) {
          var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
          var ReactCurrentDispatcher2 = ReactSharedInternals.ReactCurrentDispatcher;
          return injectInternals({
            bundleType: devToolsConfig.bundleType,
            version: devToolsConfig.version,
            rendererPackageName: devToolsConfig.rendererPackageName,
            rendererConfig: devToolsConfig.rendererConfig,
            overrideHookState,
            overrideHookStateDeletePath,
            overrideHookStateRenamePath,
            overrideProps,
            overridePropsDeletePath,
            overridePropsRenamePath,
            setSuspenseHandler,
            scheduleUpdate,
            currentDispatcherRef: ReactCurrentDispatcher2,
            findHostInstanceByFiber,
            findFiberByHostInstance: findFiberByHostInstance || emptyFindFiberByHostInstance,
            findHostInstancesForRefresh,
            scheduleRefresh,
            scheduleRoot,
            setRefreshHandler,
            getCurrentFiber: getCurrentFiberForDevTools
          });
        }
        var IsSomeRendererActing$1 = ReactSharedInternals.IsSomeRendererActing;
        var defaultTestOptions = {
          createNodeMock: function() {
            return null;
          }
        };
        function toJSON(inst) {
          if (inst.isHidden) {
            return null;
          }
          switch (inst.tag) {
            case "TEXT":
              return inst.text;
            case "INSTANCE": {
              var _inst$props = inst.props, children = _inst$props.children, props = _objectWithoutPropertiesLoose(_inst$props, ["children"]);
              var renderedChildren = null;
              if (inst.children && inst.children.length) {
                for (var i = 0; i < inst.children.length; i++) {
                  var renderedChild = toJSON(inst.children[i]);
                  if (renderedChild !== null) {
                    if (renderedChildren === null) {
                      renderedChildren = [renderedChild];
                    } else {
                      renderedChildren.push(renderedChild);
                    }
                  }
                }
              }
              var json = {
                type: inst.type,
                props,
                children: renderedChildren
              };
              Object.defineProperty(json, "$$typeof", {
                value: Symbol.for("react.test.json")
              });
              return json;
            }
            default:
              throw new Error("Unexpected node type in toJSON: " + inst.tag);
          }
        }
        function childrenToTree(node) {
          if (!node) {
            return null;
          }
          var children = nodeAndSiblingsArray(node);
          if (children.length === 0) {
            return null;
          } else if (children.length === 1) {
            return toTree(children[0]);
          }
          return flatten(children.map(toTree));
        }
        function nodeAndSiblingsArray(nodeWithSibling) {
          var array = [];
          var node = nodeWithSibling;
          while (node != null) {
            array.push(node);
            node = node.sibling;
          }
          return array;
        }
        function flatten(arr) {
          var result = [];
          var stack = [{
            i: 0,
            array: arr
          }];
          while (stack.length) {
            var n = stack.pop();
            while (n.i < n.array.length) {
              var el = n.array[n.i];
              n.i += 1;
              if (Array.isArray(el)) {
                stack.push(n);
                stack.push({
                  i: 0,
                  array: el
                });
                break;
              }
              result.push(el);
            }
          }
          return result;
        }
        function toTree(node) {
          if (node == null) {
            return null;
          }
          switch (node.tag) {
            case HostRoot:
              return childrenToTree(node.child);
            case HostPortal:
              return childrenToTree(node.child);
            case ClassComponent:
              return {
                nodeType: "component",
                type: node.type,
                props: _assign({}, node.memoizedProps),
                instance: node.stateNode,
                rendered: childrenToTree(node.child)
              };
            case FunctionComponent:
            case SimpleMemoComponent:
              return {
                nodeType: "component",
                type: node.type,
                props: _assign({}, node.memoizedProps),
                instance: null,
                rendered: childrenToTree(node.child)
              };
            case Block:
              return {
                nodeType: "block",
                type: node.type,
                props: _assign({}, node.memoizedProps),
                instance: null,
                rendered: childrenToTree(node.child)
              };
            case HostComponent: {
              return {
                nodeType: "host",
                type: node.type,
                props: _assign({}, node.memoizedProps),
                instance: null,
                rendered: flatten(nodeAndSiblingsArray(node.child).map(toTree))
              };
            }
            case HostText:
              return node.stateNode.text;
            case Fragment:
            case ContextProvider:
            case ContextConsumer:
            case Mode:
            case Profiler:
            case ForwardRef:
            case MemoComponent:
            case IncompleteClassComponent:
            case ScopeComponent:
              return childrenToTree(node.child);
            default: {
              {
                throw Error("toTree() does not yet know how to handle nodes with tag=" + node.tag);
              }
            }
          }
        }
        var validWrapperTypes = /* @__PURE__ */ new Set([
          FunctionComponent,
          ClassComponent,
          HostComponent,
          ForwardRef,
          MemoComponent,
          SimpleMemoComponent,
          Block,
          HostRoot
        ]);
        function getChildren(parent) {
          var children = [];
          var startingNode = parent;
          var node = startingNode;
          if (node.child === null) {
            return children;
          }
          node.child.return = node;
          node = node.child;
          outer:
            while (true) {
              var descend = false;
              if (validWrapperTypes.has(node.tag)) {
                children.push(wrapFiber(node));
              } else if (node.tag === HostText) {
                children.push("" + node.memoizedProps);
              } else {
                descend = true;
              }
              if (descend && node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              while (node.sibling === null) {
                if (node.return === startingNode) {
                  break outer;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          return children;
        }
        var ReactTestInstance = /* @__PURE__ */ function() {
          var _proto = ReactTestInstance2.prototype;
          _proto._currentFiber = function _currentFiber() {
            var fiber = findCurrentFiberUsingSlowPath(this._fiber);
            if (!(fiber !== null)) {
              {
                throw Error("Can't read from currently-mounting component. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            return fiber;
          };
          function ReactTestInstance2(fiber) {
            if (!validWrapperTypes.has(fiber.tag)) {
              {
                throw Error("Unexpected object passed to ReactTestInstance constructor (tag: " + fiber.tag + "). This is probably a bug in React.");
              }
            }
            this._fiber = fiber;
          }
          _proto.find = function find(predicate) {
            return expectOne(this.findAll(predicate, {
              deep: false
            }), "matching custom predicate: " + predicate.toString());
          };
          _proto.findByType = function findByType(type) {
            return expectOne(this.findAllByType(type, {
              deep: false
            }), 'with node type: "' + (getComponentName(type) || "Unknown") + '"');
          };
          _proto.findByProps = function findByProps(props) {
            return expectOne(this.findAllByProps(props, {
              deep: false
            }), "with props: " + JSON.stringify(props));
          };
          _proto.findAll = function findAll(predicate) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            return _findAll(this, predicate, options);
          };
          _proto.findAllByType = function findAllByType(type) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            return _findAll(this, function(node) {
              return node.type === type;
            }, options);
          };
          _proto.findAllByProps = function findAllByProps(props) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            return _findAll(this, function(node) {
              return node.props && propsMatch(node.props, props);
            }, options);
          };
          _createClass(ReactTestInstance2, [{
            key: "instance",
            get: function() {
              if (this._fiber.tag === HostComponent) {
                return getPublicInstance(this._fiber.stateNode);
              } else {
                return this._fiber.stateNode;
              }
            }
          }, {
            key: "type",
            get: function() {
              return this._fiber.type;
            }
          }, {
            key: "props",
            get: function() {
              return this._currentFiber().memoizedProps;
            }
          }, {
            key: "parent",
            get: function() {
              var parent = this._fiber.return;
              while (parent !== null) {
                if (validWrapperTypes.has(parent.tag)) {
                  if (parent.tag === HostRoot) {
                    if (getChildren(parent).length < 2) {
                      return null;
                    }
                  }
                  return wrapFiber(parent);
                }
                parent = parent.return;
              }
              return null;
            }
          }, {
            key: "children",
            get: function() {
              return getChildren(this._currentFiber());
            }
          }]);
          return ReactTestInstance2;
        }();
        function _findAll(root, predicate, options) {
          var deep = options ? options.deep : true;
          var results = [];
          if (predicate(root)) {
            results.push(root);
            if (!deep) {
              return results;
            }
          }
          root.children.forEach(function(child) {
            if (typeof child === "string") {
              return;
            }
            results.push.apply(results, _findAll(child, predicate, options));
          });
          return results;
        }
        function expectOne(all, message) {
          if (all.length === 1) {
            return all[0];
          }
          var prefix2 = all.length === 0 ? "No instances found " : "Expected 1 but found " + all.length + " instances ";
          throw new Error(prefix2 + message);
        }
        function propsMatch(props, filter) {
          for (var key in filter) {
            if (props[key] !== filter[key]) {
              return false;
            }
          }
          return true;
        }
        function create2(element, options) {
          var createNodeMock = defaultTestOptions.createNodeMock;
          var isConcurrent = false;
          if (typeof options === "object" && options !== null) {
            if (typeof options.createNodeMock === "function") {
              createNodeMock = options.createNodeMock;
            }
            if (options.unstable_isConcurrent === true) {
              isConcurrent = true;
            }
          }
          var container = {
            children: [],
            createNodeMock,
            tag: "CONTAINER"
          };
          var root = createContainer(container, isConcurrent ? ConcurrentRoot : LegacyRoot, false);
          if (!(root != null)) {
            {
              throw Error("something went wrong");
            }
          }
          updateContainer(element, root, null, null);
          var entry = {
            _Scheduler: Scheduler,
            root: void 0,
            toJSON: function() {
              if (root == null || root.current == null || container == null) {
                return null;
              }
              if (container.children.length === 0) {
                return null;
              }
              if (container.children.length === 1) {
                return toJSON(container.children[0]);
              }
              if (container.children.length === 2 && container.children[0].isHidden === true && container.children[1].isHidden === false) {
                return toJSON(container.children[1]);
              }
              var renderedChildren = null;
              if (container.children && container.children.length) {
                for (var i = 0; i < container.children.length; i++) {
                  var renderedChild = toJSON(container.children[i]);
                  if (renderedChild !== null) {
                    if (renderedChildren === null) {
                      renderedChildren = [renderedChild];
                    } else {
                      renderedChildren.push(renderedChild);
                    }
                  }
                }
              }
              return renderedChildren;
            },
            toTree: function() {
              if (root == null || root.current == null) {
                return null;
              }
              return toTree(root.current);
            },
            update: function(newElement) {
              if (root == null || root.current == null) {
                return;
              }
              updateContainer(newElement, root, null, null);
            },
            unmount: function() {
              if (root == null || root.current == null) {
                return;
              }
              updateContainer(null, root, null, null);
              container = null;
              root = null;
            },
            getInstance: function() {
              if (root == null || root.current == null) {
                return null;
              }
              return getPublicRootInstance(root);
            },
            unstable_flushSync: function(fn) {
              return flushSync(fn);
            }
          };
          Object.defineProperty(entry, "root", {
            configurable: true,
            enumerable: true,
            get: function() {
              if (root === null) {
                throw new Error("Can't access .root on unmounted test renderer");
              }
              var children = getChildren(root.current);
              if (children.length === 0) {
                throw new Error("Can't access .root on unmounted test renderer");
              } else if (children.length === 1) {
                return children[0];
              } else {
                return wrapFiber(root.current);
              }
            }
          });
          return entry;
        }
        var fiberToWrapper = /* @__PURE__ */ new WeakMap();
        function wrapFiber(fiber) {
          var wrapper = fiberToWrapper.get(fiber);
          if (wrapper === void 0 && fiber.alternate !== null) {
            wrapper = fiberToWrapper.get(fiber.alternate);
          }
          if (wrapper === void 0) {
            wrapper = new ReactTestInstance(fiber);
            fiberToWrapper.set(fiber, wrapper);
          }
          return wrapper;
        }
        injectIntoDevTools({
          findFiberByHostInstance: function() {
            throw new Error("TestRenderer does not support findFiberByHostInstance()");
          },
          bundleType: 1,
          version: ReactVersion,
          rendererPackageName: "react-test-renderer"
        });
        var actingUpdatesScopeDepth$1 = 0;
        function unstable_concurrentAct(scope) {
          if (Scheduler.unstable_flushAllWithoutAsserting === void 0) {
            throw Error("This version of `act` requires a special mock build of Scheduler.");
          }
          if (setTimeout._isMockFunction !== true) {
            throw Error("This version of `act` requires Jest's timer mocks (i.e. jest.useFakeTimers).");
          }
          var previousActingUpdatesScopeDepth = actingUpdatesScopeDepth$1;
          var previousIsSomeRendererActing = IsSomeRendererActing$1.current;
          var previousIsThisRendererActing = IsThisRendererActing.current;
          IsSomeRendererActing$1.current = true;
          IsThisRendererActing.current = true;
          actingUpdatesScopeDepth$1++;
          var unwind = function() {
            actingUpdatesScopeDepth$1--;
            IsSomeRendererActing$1.current = previousIsSomeRendererActing;
            IsThisRendererActing.current = previousIsThisRendererActing;
            {
              if (actingUpdatesScopeDepth$1 > previousActingUpdatesScopeDepth) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
            }
          };
          try {
            var thenable = batchedUpdates(scope);
            if (typeof thenable === "object" && thenable !== null && typeof thenable.then === "function") {
              return {
                then: function(resolve, reject) {
                  thenable.then(function() {
                    flushActWork$1(function() {
                      unwind();
                      resolve();
                    }, function(error2) {
                      unwind();
                      reject(error2);
                    });
                  }, function(error2) {
                    unwind();
                    reject(error2);
                  });
                }
              };
            } else {
              try {
                var didFlushWork;
                do {
                  didFlushWork = Scheduler.unstable_flushAllWithoutAsserting();
                } while (didFlushWork);
              } finally {
                unwind();
              }
            }
          } catch (error2) {
            unwind();
            throw error2;
          }
        }
        function flushActWork$1(resolve, reject) {
          jest.runOnlyPendingTimers();
          enqueueTask(function() {
            try {
              var didFlushWork = Scheduler.unstable_flushAllWithoutAsserting();
              if (didFlushWork) {
                flushActWork$1(resolve, reject);
              } else {
                resolve();
              }
            } catch (error2) {
              reject(error2);
            }
          });
        }
        exports._Scheduler = Scheduler;
        exports.act = act;
        exports.create = create2;
        exports.unstable_batchedUpdates = batchedUpdates;
        exports.unstable_concurrentAct = unstable_concurrentAct;
      })();
    }
  }
});

// node_modules/react-test-renderer/index.js
var require_react_test_renderer = __commonJS({
  "node_modules/react-test-renderer/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_test_renderer_production_min();
    } else {
      module2.exports = require_react_test_renderer_development();
    }
  }
});

// node_modules/@testing-library/react-native/build/act.js
var require_act = __commonJS({
  "node_modules/@testing-library/react-native/build/act.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _reactTestRenderer = require_react_test_renderer();
    var actMock = (callback) => {
      callback();
    };
    var _default = _reactTestRenderer.act || actMock;
    exports.default = _default;
  }
});

// node_modules/@testing-library/react-native/build/cleanup.js
var require_cleanup = __commonJS({
  "node_modules/@testing-library/react-native/build/cleanup.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cleanup;
    exports.addToCleanupQueue = addToCleanupQueue;
    var cleanupQueue = /* @__PURE__ */ new Set();
    function cleanup() {
      cleanupQueue.forEach((fn) => fn());
      cleanupQueue.clear();
    }
    function addToCleanupQueue(fn) {
      cleanupQueue.add(fn);
    }
  }
});

// node_modules/@testing-library/react-native/build/fireEvent.js
var require_fireEvent = __commonJS({
  "node_modules/@testing-library/react-native/build/fireEvent.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _act = _interopRequireDefault(require_act());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isHostElement = (element) => {
      return typeof (element === null || element === void 0 ? void 0 : element.type) === "string";
    };
    var isTextInput = (element) => {
      const {
        TextInput
      } = require("react-native");
      return (element === null || element === void 0 ? void 0 : element.type) === TextInput;
    };
    var isTouchResponder = (element) => {
      if (!isHostElement(element))
        return false;
      return !!(element !== null && element !== void 0 && element.props.onStartShouldSetResponder) || isTextInput(element);
    };
    var isPointerEventEnabled = (element, isParent) => {
      const parentCondition = isParent ? (element === null || element === void 0 ? void 0 : element.props.pointerEvents) === "box-only" : (element === null || element === void 0 ? void 0 : element.props.pointerEvents) === "box-none";
      if ((element === null || element === void 0 ? void 0 : element.props.pointerEvents) === "none" || parentCondition) {
        return false;
      }
      if (!(element !== null && element !== void 0 && element.parent))
        return true;
      return isPointerEventEnabled(element.parent, true);
    };
    var isEventEnabled = (element, touchResponder) => {
      var _touchResponder$props, _touchResponder$props2, _touchResponder$props3, _touchResponder$props4;
      if (isTextInput(element))
        return (element === null || element === void 0 ? void 0 : element.props.editable) !== false;
      if (!isPointerEventEnabled(element))
        return false;
      const touchStart = touchResponder === null || touchResponder === void 0 ? void 0 : (_touchResponder$props = (_touchResponder$props2 = touchResponder.props).onStartShouldSetResponder) === null || _touchResponder$props === void 0 ? void 0 : _touchResponder$props.call(_touchResponder$props2);
      const touchMove = touchResponder === null || touchResponder === void 0 ? void 0 : (_touchResponder$props3 = (_touchResponder$props4 = touchResponder.props).onMoveShouldSetResponder) === null || _touchResponder$props3 === void 0 ? void 0 : _touchResponder$props3.call(_touchResponder$props4);
      if (touchStart || touchMove)
        return true;
      return touchStart === void 0 && touchMove === void 0;
    };
    var findEventHandler = (element, eventName, callsite, nearestTouchResponder) => {
      const touchResponder = isTouchResponder(element) ? element : nearestTouchResponder;
      const handler = getEventHandler(element, eventName);
      if (handler && isEventEnabled(element, touchResponder))
        return handler;
      if (element.parent === null || element.parent.parent === null) {
        return null;
      }
      return findEventHandler(element.parent, eventName, callsite, touchResponder);
    };
    var getEventHandler = (element, eventName) => {
      const eventHandlerName = toEventHandlerName(eventName);
      if (typeof element.props[eventHandlerName] === "function") {
        return element.props[eventHandlerName];
      }
      if (typeof element.props[eventName] === "function") {
        return element.props[eventName];
      }
      return void 0;
    };
    var invokeEvent = (element, eventName, callsite, ...data) => {
      const handler = findEventHandler(element, eventName, callsite);
      if (!handler) {
        return;
      }
      let returnValue;
      (0, _act.default)(() => {
        returnValue = handler(...data);
      });
      return returnValue;
    };
    var toEventHandlerName = (eventName) => `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
    var pressHandler = (element, ...data) => invokeEvent(element, "press", pressHandler, ...data);
    var changeTextHandler = (element, ...data) => invokeEvent(element, "changeText", changeTextHandler, ...data);
    var scrollHandler = (element, ...data) => invokeEvent(element, "scroll", scrollHandler, ...data);
    var fireEvent = (element, eventName, ...data) => invokeEvent(element, eventName, fireEvent, ...data);
    fireEvent.press = pressHandler;
    fireEvent.changeText = changeTextHandler;
    fireEvent.scroll = scrollHandler;
    var _default = fireEvent;
    exports.default = _default;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/ansi-styles/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi256 = wrapAnsi256();
      styles.color.ansi16m = wrapAnsi16m();
      styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
          enumerable: false
        }
      });
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/pretty-format/build/collections.js
var require_collections = __commonJS({
  "node_modules/pretty-format/build/collections.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printIteratorEntries = printIteratorEntries;
    exports.printIteratorValues = printIteratorValues;
    exports.printListItems = printListItems;
    exports.printObjectProperties = printObjectProperties;
    var getKeysOfEnumerableProperties = (object, compareKeys) => {
      const keys = Object.keys(object).sort(compareKeys);
      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object).forEach((symbol) => {
          if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
            keys.push(symbol);
          }
        });
      }
      return keys;
    };
    function printIteratorEntries(iterator, config, indentation, depth, refs, printer, separator = ": ") {
      let result = "";
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          const name = printer(current.value[0], config, indentationNext, depth, refs);
          const value = printer(current.value[1], config, indentationNext, depth, refs);
          result += indentationNext + name + separator + value;
          current = iterator.next();
          if (!current.done) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
      let result = "";
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          result += indentationNext + printer(current.value, config, indentationNext, depth, refs);
          current = iterator.next();
          if (!current.done) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printListItems(list, config, indentation, depth, refs, printer) {
      let result = "";
      if (list.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < list.length; i++) {
          result += indentationNext;
          if (i in list) {
            result += printer(list[i], config, indentationNext, depth, refs);
          }
          if (i < list.length - 1) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printObjectProperties(val, config, indentation, depth, refs, printer) {
      let result = "";
      const keys = getKeysOfEnumerableProperties(val, config.compareKeys);
      if (keys.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const name = printer(key, config, indentationNext, depth, refs);
          const value = printer(val[key], config, indentationNext, depth, refs);
          result += indentationNext + name + ": " + value;
          if (i < keys.length - 1) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
  }
});

// node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
var require_AsymmetricMatcher = __commonJS({
  "node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var global2 = function() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      } else if (typeof global2 !== "undefined") {
        return global2;
      } else if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else {
        return Function("return this")();
      }
    }();
    var Symbol2 = global2["jest-symbol-do-not-touch"] || global2.Symbol;
    var asymmetricMatcher = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621;
    var SPACE = " ";
    var serialize = (val, config, indentation, depth, refs, printer) => {
      const stringedValue = val.toString();
      if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
        if (++depth > config.maxDepth) {
          return "[" + stringedValue + "]";
        }
        return stringedValue + SPACE + "[" + (0, _collections.printListItems)(val.sample, config, indentation, depth, refs, printer) + "]";
      }
      if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
        if (++depth > config.maxDepth) {
          return "[" + stringedValue + "]";
        }
        return stringedValue + SPACE + "{" + (0, _collections.printObjectProperties)(val.sample, config, indentation, depth, refs, printer) + "}";
      }
      if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      return val.toAsymmetricMatcher();
    };
    exports.serialize = serialize;
    var test = (val) => val && val.$$typeof === asymmetricMatcher;
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/ansi-regex/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// node_modules/pretty-format/build/plugins/ConvertAnsi.js
var require_ConvertAnsi = __commonJS({
  "node_modules/pretty-format/build/plugins/ConvertAnsi.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _ansiRegex = _interopRequireDefault(require_ansi_regex());
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toHumanReadableAnsi = (text) => text.replace((0, _ansiRegex.default)(), (match) => {
      switch (match) {
        case _ansiStyles.default.red.close:
        case _ansiStyles.default.green.close:
        case _ansiStyles.default.cyan.close:
        case _ansiStyles.default.gray.close:
        case _ansiStyles.default.white.close:
        case _ansiStyles.default.yellow.close:
        case _ansiStyles.default.bgRed.close:
        case _ansiStyles.default.bgGreen.close:
        case _ansiStyles.default.bgYellow.close:
        case _ansiStyles.default.inverse.close:
        case _ansiStyles.default.dim.close:
        case _ansiStyles.default.bold.close:
        case _ansiStyles.default.reset.open:
        case _ansiStyles.default.reset.close:
          return "</>";
        case _ansiStyles.default.red.open:
          return "<red>";
        case _ansiStyles.default.green.open:
          return "<green>";
        case _ansiStyles.default.cyan.open:
          return "<cyan>";
        case _ansiStyles.default.gray.open:
          return "<gray>";
        case _ansiStyles.default.white.open:
          return "<white>";
        case _ansiStyles.default.yellow.open:
          return "<yellow>";
        case _ansiStyles.default.bgRed.open:
          return "<bgRed>";
        case _ansiStyles.default.bgGreen.open:
          return "<bgGreen>";
        case _ansiStyles.default.bgYellow.open:
          return "<bgYellow>";
        case _ansiStyles.default.inverse.open:
          return "<inverse>";
        case _ansiStyles.default.dim.open:
          return "<dim>";
        case _ansiStyles.default.bold.open:
          return "<bold>";
        default:
          return "";
      }
    });
    var test = (val) => typeof val === "string" && !!val.match((0, _ansiRegex.default)());
    exports.test = test;
    var serialize = (val, config, indentation, depth, refs, printer) => printer(toHumanReadableAnsi(val), config, indentation, depth, refs);
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/DOMCollection.js
var require_DOMCollection = __commonJS({
  "node_modules/pretty-format/build/plugins/DOMCollection.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var SPACE = " ";
    var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
    var testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    var test = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
    exports.test = test;
    var isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
    var serialize = (collection, config, indentation, depth, refs, printer) => {
      const name = collection.constructor.name;
      if (++depth > config.maxDepth) {
        return "[" + name + "]";
      }
      return (config.min ? "" : name + SPACE) + (OBJECT_NAMES.indexOf(name) !== -1 ? "{" + (0, _collections.printObjectProperties)(isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
        props[attribute.name] = attribute.value;
        return props;
      }, {}) : __spreadValues({}, collection), config, indentation, depth, refs, printer) + "}" : "[" + (0, _collections.printListItems)(Array.from(collection), config, indentation, depth, refs, printer) + "]");
    };
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/lib/escapeHTML.js
var require_escapeHTML = __commonJS({
  "node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = escapeHTML;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
});

// node_modules/pretty-format/build/plugins/lib/markup.js
var require_markup = __commonJS({
  "node_modules/pretty-format/build/plugins/lib/markup.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printText = exports.printProps = exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printChildren = void 0;
    var _escapeHTML = _interopRequireDefault(require_escapeHTML());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var printProps = (keys, props, config, indentation, depth, refs, printer) => {
      const indentationNext = indentation + config.indent;
      const colors = config.colors;
      return keys.map((key) => {
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);
        if (typeof value !== "string") {
          if (printed.indexOf("\n") !== -1) {
            printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
          }
          printed = "{" + printed + "}";
        }
        return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
      }).join("");
    };
    exports.printProps = printProps;
    var printChildren = (children, config, indentation, depth, refs, printer) => children.map((child) => config.spacingOuter + indentation + (typeof child === "string" ? printText(child, config) : printer(child, config, indentation, depth, refs))).join("");
    exports.printChildren = printChildren;
    var printText = (text, config) => {
      const contentColor = config.colors.content;
      return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
    };
    exports.printText = printText;
    var printComment = (comment, config) => {
      const commentColor = config.colors.comment;
      return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
    };
    exports.printComment = printComment;
    var printElement = (type, printedProps, printedChildren, config, indentation) => {
      const tagColor = config.colors.tag;
      return tagColor.open + "<" + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + "</" + type : (printedProps && !config.min ? "" : " ") + "/") + ">" + tagColor.close;
    };
    exports.printElement = printElement;
    var printElementAsLeaf = (type, config) => {
      const tagColor = config.colors.tag;
      return tagColor.open + "<" + type + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
    };
    exports.printElementAsLeaf = printElementAsLeaf;
  }
});

// node_modules/pretty-format/build/plugins/DOMElement.js
var require_DOMElement = __commonJS({
  "node_modules/pretty-format/build/plugins/DOMElement.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _markup = require_markup();
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testHasAttribute = (val) => {
      try {
        return typeof val.hasAttribute === "function" && val.hasAttribute("is");
      } catch {
        return false;
      }
    };
    var testNode = (val) => {
      const constructorName = val.constructor.name;
      const { nodeType, tagName } = val;
      const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
      return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
    };
    var test = (val) => {
      var _val$constructor;
      return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode(val);
    };
    exports.test = test;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    var serialize = (node, config, indentation, depth, refs, printer) => {
      if (nodeIsText(node)) {
        return (0, _markup.printText)(node.data, config);
      }
      if (nodeIsComment(node)) {
        return (0, _markup.printComment)(node.data, config);
      }
      const type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config.maxDepth) {
        return (0, _markup.printElementAsLeaf)(type, config);
      }
      return (0, _markup.printElement)(type, (0, _markup.printProps)(nodeIsFragment(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
        props[attribute.name] = attribute.value;
        return props;
      }, {}), config, indentation + config.indent, depth, refs, printer), (0, _markup.printChildren)(Array.prototype.slice.call(node.childNodes || node.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
    };
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/Immutable.js
var require_Immutable = __commonJS({
  "node_modules/pretty-format/build/plugins/Immutable.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
    var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
    var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
    var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
    var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
    var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
    var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
    var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
    var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
    var getImmutableName = (name) => "Immutable." + name;
    var printAsLeaf = (name) => "[" + name + "]";
    var SPACE = " ";
    var LAZY = "\u2026";
    var printImmutableEntries = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + "{" + (0, _collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) + "}";
    function getRecordEntries(val) {
      let i = 0;
      return {
        next() {
          if (i < val._keys.length) {
            const key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)]
            };
          }
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
    var printImmutableRecord = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName(val._name || "Record");
      return ++depth > config.maxDepth ? printAsLeaf(name) : name + SPACE + "{" + (0, _collections.printIteratorEntries)(getRecordEntries(val), config, indentation, depth, refs, printer) + "}";
    };
    var printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName("Seq");
      if (++depth > config.maxDepth) {
        return printAsLeaf(name);
      }
      if (val[IS_KEYED_SENTINEL]) {
        return name + SPACE + "{" + (val._iter || val._object ? (0, _collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) : LAZY) + "}";
      }
      return name + SPACE + "[" + (val._iter || val._array || val._collection || val._iterable ? (0, _collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) : LAZY) + "]";
    };
    var printImmutableValues = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + "[" + (0, _collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + "]";
    var serialize = (val, config, indentation, depth, refs, printer) => {
      if (val[IS_MAP_SENTINEL]) {
        return printImmutableEntries(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map");
      }
      if (val[IS_LIST_SENTINEL]) {
        return printImmutableValues(val, config, indentation, depth, refs, printer, "List");
      }
      if (val[IS_SET_SENTINEL]) {
        return printImmutableValues(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set");
      }
      if (val[IS_STACK_SENTINEL]) {
        return printImmutableValues(val, config, indentation, depth, refs, printer, "Stack");
      }
      if (val[IS_SEQ_SENTINEL]) {
        return printImmutableSeq(val, config, indentation, depth, refs, printer);
      }
      return printImmutableRecord(val, config, indentation, depth, refs, printer);
    };
    exports.serialize = serialize;
    var test = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    init_cjs_shims();
    var b = 60103;
    var c = 60106;
    var d = 60107;
    var e = 60108;
    var f = 60114;
    var g = 60109;
    var h = 60110;
    var k = 60112;
    var l = 60113;
    var m = 60120;
    var n = 60115;
    var p = 60116;
    var q = 60121;
    var r = 60122;
    var u = 60117;
    var v = 60129;
    var w = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      x = Symbol.for;
      b = x("react.element");
      c = x("react.portal");
      d = x("react.fragment");
      e = x("react.strict_mode");
      f = x("react.profiler");
      g = x("react.provider");
      h = x("react.context");
      k = x("react.forward_ref");
      l = x("react.suspense");
      m = x("react.suspense_list");
      n = x("react.memo");
      p = x("react.lazy");
      q = x("react.block");
      r = x("react.server.block");
      u = x("react.fundamental");
      v = x("react.debug_trace_mode");
      w = x("react.legacy_hidden");
    }
    var x;
    function y(a) {
      if (typeof a === "object" && a !== null) {
        var t = a.$$typeof;
        switch (t) {
          case b:
            switch (a = a.type, a) {
              case d:
              case f:
              case e:
              case l:
              case m:
                return a;
              default:
                switch (a = a && a.$$typeof, a) {
                  case h:
                  case k:
                  case p:
                  case n:
                  case g:
                    return a;
                  default:
                    return t;
                }
            }
          case c:
            return t;
        }
      }
    }
    var z = g;
    var A = b;
    var B = k;
    var C = d;
    var D = p;
    var E = n;
    var F = c;
    var G = f;
    var H = e;
    var I = l;
    exports.ContextConsumer = h;
    exports.ContextProvider = z;
    exports.Element = A;
    exports.ForwardRef = B;
    exports.Fragment = C;
    exports.Lazy = D;
    exports.Memo = E;
    exports.Portal = F;
    exports.Profiler = G;
    exports.StrictMode = H;
    exports.Suspense = I;
    exports.isAsyncMode = function() {
      return false;
    };
    exports.isConcurrentMode = function() {
      return false;
    };
    exports.isContextConsumer = function(a) {
      return y(a) === h;
    };
    exports.isContextProvider = function(a) {
      return y(a) === g;
    };
    exports.isElement = function(a) {
      return typeof a === "object" && a !== null && a.$$typeof === b;
    };
    exports.isForwardRef = function(a) {
      return y(a) === k;
    };
    exports.isFragment = function(a) {
      return y(a) === d;
    };
    exports.isLazy = function(a) {
      return y(a) === p;
    };
    exports.isMemo = function(a) {
      return y(a) === n;
    };
    exports.isPortal = function(a) {
      return y(a) === c;
    };
    exports.isProfiler = function(a) {
      return y(a) === f;
    };
    exports.isStrictMode = function(a) {
      return y(a) === e;
    };
    exports.isSuspense = function(a) {
      return y(a) === l;
    };
    exports.isValidElementType = function(a) {
      return typeof a === "string" || typeof a === "function" || a === d || a === f || a === v || a === e || a === l || a === m || a === w || typeof a === "object" && a !== null && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
    };
    exports.typeOf = y;
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
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
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
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
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_is_production_min();
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// node_modules/pretty-format/build/plugins/ReactElement.js
var require_ReactElement = __commonJS({
  "node_modules/pretty-format/build/plugins/ReactElement.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var ReactIs = _interopRequireWildcard(require_react_is());
    var _markup = require_markup();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getChildren = (arg, children = []) => {
      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }
      return children;
    };
    var getType = (element) => {
      const type = element.type;
      if (typeof type === "string") {
        return type;
      }
      if (typeof type === "function") {
        return type.displayName || type.name || "Unknown";
      }
      if (ReactIs.isFragment(element)) {
        return "React.Fragment";
      }
      if (ReactIs.isSuspense(element)) {
        return "React.Suspense";
      }
      if (typeof type === "object" && type !== null) {
        if (ReactIs.isContextProvider(element)) {
          return "Context.Provider";
        }
        if (ReactIs.isContextConsumer(element)) {
          return "Context.Consumer";
        }
        if (ReactIs.isForwardRef(element)) {
          if (type.displayName) {
            return type.displayName;
          }
          const functionName = type.render.displayName || type.render.name || "";
          return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
        }
        if (ReactIs.isMemo(element)) {
          const functionName = type.displayName || type.type.displayName || type.type.name || "";
          return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
        }
      }
      return "UNDEFINED";
    };
    var getPropKeys = (element) => {
      const { props } = element;
      return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
    };
    var serialize = (element, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(getType(element), config) : (0, _markup.printElement)(getType(element), (0, _markup.printProps)(getPropKeys(element), element.props, config, indentation + config.indent, depth, refs, printer), (0, _markup.printChildren)(getChildren(element.props.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
    exports.serialize = serialize;
    var test = (val) => val != null && ReactIs.isElement(val);
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/ReactTestComponent.js
var require_ReactTestComponent = __commonJS({
  "node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _markup = require_markup();
    var global2 = function() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      } else if (typeof global2 !== "undefined") {
        return global2;
      } else if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else {
        return Function("return this")();
      }
    }();
    var Symbol2 = global2["jest-symbol-do-not-touch"] || global2.Symbol;
    var testSymbol = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487;
    var getPropKeys = (object) => {
      const { props } = object;
      return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
    };
    var serialize = (object, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config) : (0, _markup.printElement)(object.type, object.props ? (0, _markup.printProps)(getPropKeys(object), object.props, config, indentation + config.indent, depth, refs, printer) : "", object.children ? (0, _markup.printChildren)(object.children, config, indentation + config.indent, depth, refs, printer) : "", config, indentation);
    exports.serialize = serialize;
    var test = (val) => val && val.$$typeof === testSymbol;
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/index.js
var require_build = __commonJS({
  "node_modules/pretty-format/build/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.DEFAULT_OPTIONS = void 0;
    exports.format = format;
    exports.plugins = void 0;
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    var _collections = require_collections();
    var _AsymmetricMatcher = _interopRequireDefault(require_AsymmetricMatcher());
    var _ConvertAnsi = _interopRequireDefault(require_ConvertAnsi());
    var _DOMCollection = _interopRequireDefault(require_DOMCollection());
    var _DOMElement = _interopRequireDefault(require_DOMElement());
    var _Immutable = _interopRequireDefault(require_Immutable());
    var _ReactElement = _interopRequireDefault(require_ReactElement());
    var _ReactTestComponent = _interopRequireDefault(require_ReactTestComponent());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toString = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
    var isWindow = (val) => typeof window !== "undefined" && val === window;
    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;
    var PrettyFormatPluginError = class extends Error {
      constructor(message, stack) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
      }
    };
    function isToStringedArrayType(toStringed) {
      return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
    }
    function printNumber(val) {
      return Object.is(val, -0) ? "-0" : String(val);
    }
    function printBigInt(val) {
      return String(`${val}n`);
    }
    function printFunction(val, printFunctionName) {
      if (!printFunctionName) {
        return "[Function]";
      }
      return "[Function " + (val.name || "anonymous") + "]";
    }
    function printSymbol(val) {
      return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
    }
    function printError(val) {
      return "[" + errorToString.call(val) + "]";
    }
    function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
      if (val === true || val === false) {
        return "" + val;
      }
      if (val === void 0) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      const typeOf = typeof val;
      if (typeOf === "number") {
        return printNumber(val);
      }
      if (typeOf === "bigint") {
        return printBigInt(val);
      }
      if (typeOf === "string") {
        if (escapeString) {
          return '"' + val.replace(/"|\\/g, "\\$&") + '"';
        }
        return '"' + val + '"';
      }
      if (typeOf === "function") {
        return printFunction(val, printFunctionName);
      }
      if (typeOf === "symbol") {
        return printSymbol(val);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object WeakMap]") {
        return "WeakMap {}";
      }
      if (toStringed === "[object WeakSet]") {
        return "WeakSet {}";
      }
      if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
        return printFunction(val, printFunctionName);
      }
      if (toStringed === "[object Symbol]") {
        return printSymbol(val);
      }
      if (toStringed === "[object Date]") {
        return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
      }
      if (toStringed === "[object Error]") {
        return printError(val);
      }
      if (toStringed === "[object RegExp]") {
        if (escapeRegex) {
          return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        return regExpToString.call(val);
      }
      if (val instanceof Error) {
        return printError(val);
      }
      return null;
    }
    function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
      if (refs.indexOf(val) !== -1) {
        return "[Circular]";
      }
      refs = refs.slice();
      refs.push(val);
      const hitMaxDepth = ++depth > config.maxDepth;
      const min = config.min;
      if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
        return printer(val.toJSON(), config, indentation, depth, refs, true);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object Arguments]") {
        return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(val, config, indentation, depth, refs, printer) + "]";
      }
      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : !config.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(val, config, indentation, depth, refs, printer) + "]";
      }
      if (toStringed === "[object Map]") {
        return hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer, " => ") + "}";
      }
      if (toStringed === "[object Set]") {
        return hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + "}";
      }
      return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : !config.printBasicPrototype && getConstructorName(val) === "Object" ? "" : getConstructorName(val) + " ") + "{" + (0, _collections.printObjectProperties)(val, config, indentation, depth, refs, printer) + "}";
    }
    function isNewPlugin(plugin) {
      return plugin.serialize != null;
    }
    function printPlugin(plugin, val, config, indentation, depth, refs) {
      let printed;
      try {
        printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(val, (valChild) => printer(valChild, config, indentation, depth, refs), (str) => {
          const indentationNext = indentation + config.indent;
          return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
        }, {
          edgeSpacing: config.spacingOuter,
          min: config.min,
          spacing: config.spacingInner
        }, config.colors);
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
      if (typeof printed !== "string") {
        throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
      }
      return printed;
    }
    function findPlugin(plugins2, val) {
      for (let p = 0; p < plugins2.length; p++) {
        try {
          if (plugins2[p].test(val)) {
            return plugins2[p];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }
      return null;
    }
    function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
      const plugin = findPlugin(config.plugins, val);
      if (plugin !== null) {
        return printPlugin(plugin, val, config, indentation, depth, refs);
      }
      const basicResult = printBasicValue(val, config.printFunctionName, config.escapeRegex, config.escapeString);
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON);
    }
    var DEFAULT_THEME = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green"
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var DEFAULT_OPTIONS = {
      callToJSON: true,
      compareKeys: void 0,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      min: false,
      plugins: [],
      printBasicPrototype: true,
      printFunctionName: true,
      theme: DEFAULT_THEME
    };
    exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    function validateOptions(options) {
      Object.keys(options).forEach((key) => {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          throw new Error(`pretty-format: Unknown option "${key}".`);
        }
      });
      if (options.min && options.indent !== void 0 && options.indent !== 0) {
        throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
      }
      if (options.theme !== void 0) {
        if (options.theme === null) {
          throw new Error('pretty-format: Option "theme" must not be null.');
        }
        if (typeof options.theme !== "object") {
          throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`);
        }
      }
    }
    var getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
      const color = value && _ansiStyles.default[value];
      if (color && typeof color.close === "string" && typeof color.open === "string") {
        colors[key] = color;
      } else {
        throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
      }
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      colors[key] = {
        close: "",
        open: ""
      };
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getPrintFunctionName = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
    var getEscapeRegex = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
    var getEscapeString = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS.escapeString;
    var getConfig = (options) => {
      var _options$printBasicPr;
      return {
        callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
        colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
        compareKeys: options && typeof options.compareKeys === "function" ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
        escapeRegex: getEscapeRegex(options),
        escapeString: getEscapeString(options),
        indent: options && options.min ? "" : createIndent(options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS.indent),
        maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
        min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
        plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS.plugins,
        printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
        printFunctionName: getPrintFunctionName(options),
        spacingInner: options && options.min ? " " : "\n",
        spacingOuter: options && options.min ? "" : "\n"
      };
    };
    function createIndent(indent) {
      return new Array(indent + 1).join(" ");
    }
    function format(val, options) {
      if (options) {
        validateOptions(options);
        if (options.plugins) {
          const plugin = findPlugin(options.plugins, val);
          if (plugin !== null) {
            return printPlugin(plugin, val, getConfig(options), "", 0, []);
          }
        }
      }
      const basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, getConfig(options), "", 0, []);
    }
    var plugins = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      ConvertAnsi: _ConvertAnsi.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default
    };
    exports.plugins = plugins;
    var _default = format;
    exports.default = _default;
  }
});

// node_modules/@testing-library/react-native/build/helpers/errors.js
var require_errors = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/errors.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.copyStackTrace = copyStackTrace;
    exports.printDeprecationWarning = printDeprecationWarning;
    exports.throwRemovedFunctionError = throwRemovedFunctionError;
    exports.throwRenamedFunctionError = throwRenamedFunctionError;
    exports.createQueryByError = exports.prepareErrorMessage = exports.createLibraryNotSupportedError = exports.ErrorWithStack = void 0;
    var _prettyFormat = _interopRequireDefault(require_build());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ErrorWithStack = class extends Error {
      constructor(message, callsite) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, callsite);
        }
      }
    };
    exports.ErrorWithStack = ErrorWithStack;
    var createLibraryNotSupportedError = (error) => new Error(`Currently the only supported library to search by text is "react-native".

${error.message}`);
    exports.createLibraryNotSupportedError = createLibraryNotSupportedError;
    var prepareErrorMessage = (error, name, value) => {
      let errorMessage = error.message.replace(/ matching custom predicate[^]*/gm, "");
      if (name && value) {
        errorMessage += ` with ${name} ${(0, _prettyFormat.default)(value, {
          min: true
        })}`;
      }
      return errorMessage;
    };
    exports.prepareErrorMessage = prepareErrorMessage;
    var createQueryByError = (error, callsite) => {
      if (error.message.includes("No instances found")) {
        return null;
      }
      throw new ErrorWithStack(error.message, callsite);
    };
    exports.createQueryByError = createQueryByError;
    function copyStackTrace(target, stackTraceSource) {
      target.stack = stackTraceSource.stack.replace(stackTraceSource.message, target.message);
    }
    var warned = {};
    function printDeprecationWarning(functionName) {
      if (warned[functionName]) {
        return;
      }
      console.warn(`
  Deprecation Warning:
  Use of ${functionName} is not recommended and will be deleted in future versions of @testing-library/react-native.
  `);
      warned[functionName] = true;
    }
    function throwRemovedFunctionError(functionName, docsRef) {
      throw new Error(`"${functionName}" has been removed.

Please consult: https://callstack.github.io/react-native-testing-library/docs/${docsRef}`);
    }
    function throwRenamedFunctionError(functionName, newFunctionName) {
      throw new ErrorWithStack(`The "${functionName}" function has been renamed to "${newFunctionName}". Please replace all occurrences.`, throwRenamedFunctionError);
    }
  }
});

// node_modules/@testing-library/react-native/build/helpers/timers.js
var require_timers = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/timers.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.runWithRealTimers = runWithRealTimers;
    exports.setTimeout = exports.setImmediate = exports.clearTimeout = exports.jestFakeTimersAreEnabled = void 0;
    var globalObj = typeof window === "undefined" ? global : window;
    function runWithRealTimers(callback) {
      const fakeTimersType = getJestFakeTimersType();
      if (fakeTimersType) {
        jest.useRealTimers();
      }
      const callbackReturnValue = callback();
      if (fakeTimersType) {
        jest.useFakeTimers(fakeTimersType);
      }
      return callbackReturnValue;
    }
    function getJestFakeTimersType() {
      if (typeof jest === "undefined" || typeof globalObj.setTimeout === "undefined") {
        return null;
      }
      if (typeof globalObj.setTimeout._isMockFunction !== "undefined" && globalObj.setTimeout._isMockFunction) {
        return "legacy";
      }
      if (typeof globalObj.setTimeout.clock !== "undefined" && typeof jest.getRealSystemTime !== "undefined") {
        try {
          jest.getRealSystemTime();
          return "modern";
        } catch {
        }
      }
      return null;
    }
    var jestFakeTimersAreEnabled = () => Boolean(getJestFakeTimersType());
    exports.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
    function setImmediatePolyfill(fn) {
      return globalObj.setTimeout(fn, 0);
    }
    function bindTimeFunctions() {
      return {
        clearTimeoutFn: globalObj.clearTimeout,
        setImmediateFn: globalObj.setImmediate || setImmediatePolyfill,
        setTimeoutFn: globalObj.setTimeout
      };
    }
    var {
      clearTimeoutFn,
      setImmediateFn,
      setTimeoutFn
    } = runWithRealTimers(bindTimeFunctions);
    exports.setTimeout = setTimeoutFn;
    exports.setImmediate = setImmediateFn;
    exports.clearTimeout = clearTimeoutFn;
  }
});

// node_modules/@testing-library/react-native/build/flushMicroTasks.js
var require_flushMicroTasks = __commonJS({
  "node_modules/@testing-library/react-native/build/flushMicroTasks.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = flushMicrotasksQueue;
    exports.flushMicroTasks = flushMicroTasks;
    var _errors = require_errors();
    var _timers = require_timers();
    function flushMicrotasksQueue() {
      (0, _errors.printDeprecationWarning)("flushMicrotasksQueue");
      return flushMicroTasks();
    }
    function flushMicroTasks() {
      return {
        then(resolve) {
          (0, _timers.setImmediate)(resolve);
        }
      };
    }
  }
});

// node_modules/@testing-library/react-native/build/matches.js
var require_matches = __commonJS({
  "node_modules/@testing-library/react-native/build/matches.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.matches = matches;
    exports.getDefaultNormalizer = getDefaultNormalizer;
    function matches(matcher, text, normalizer = getDefaultNormalizer(), exact = true) {
      if (typeof text !== "string") {
        return false;
      }
      const normalizedText = normalizer(text);
      if (typeof matcher === "string") {
        return exact ? normalizedText === matcher : normalizedText.toLowerCase().includes(matcher.toLowerCase());
      } else {
        return matcher.test(normalizedText);
      }
    }
    function getDefaultNormalizer({
      trim = true,
      collapseWhitespace = true
    } = {}) {
      return (text) => {
        let normalizedText = text;
        normalizedText = trim ? normalizedText.trim() : normalizedText;
        normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText;
        return normalizedText;
      };
    }
  }
});

// node_modules/@testing-library/react-native/build/waitFor.js
var require_waitFor = __commonJS({
  "node_modules/@testing-library/react-native/build/waitFor.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = waitFor;
    exports.waitForElement = waitForElement;
    var React3 = _interopRequireWildcard(require_react());
    var _act = _interopRequireDefault(require_act());
    var _errors = require_errors();
    var _timers = require_timers();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var DEFAULT_TIMEOUT = 1e3;
    var DEFAULT_INTERVAL = 50;
    function checkReactVersionAtLeast(major, minor) {
      if (React3.version === void 0)
        return false;
      const [actualMajor, actualMinor] = React3.version.split(".").map(Number);
      return actualMajor > major || actualMajor === major && actualMinor >= minor;
    }
    function waitForInternal(expectation, {
      timeout = DEFAULT_TIMEOUT,
      interval = DEFAULT_INTERVAL,
      stackTraceError
    }) {
      if (typeof expectation !== "function") {
        throw new TypeError("Received `expectation` arg must be a function");
      }
      return new Promise(async (resolve, reject) => {
        let lastError, intervalId;
        let finished = false;
        let promiseStatus = "idle";
        const overallTimeoutTimer = (0, _timers.setTimeout)(handleTimeout, timeout);
        const usingFakeTimers = (0, _timers.jestFakeTimersAreEnabled)();
        if (usingFakeTimers) {
          checkExpectation();
          let fakeTimeRemaining = timeout;
          while (!finished) {
            if (!(0, _timers.jestFakeTimersAreEnabled)()) {
              const error = new Error(`Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830`);
              if (stackTraceError) {
                (0, _errors.copyStackTrace)(error, stackTraceError);
              }
              reject(error);
              return;
            }
            if (fakeTimeRemaining <= 0) {
              return;
            } else {
              fakeTimeRemaining -= interval;
            }
            jest.advanceTimersByTime(interval);
            checkExpectation();
            await new Promise((resolve2) => (0, _timers.setImmediate)(resolve2));
          }
        } else {
          intervalId = setInterval(checkRealTimersCallback, interval);
          checkExpectation();
        }
        function onDone(error, result) {
          finished = true;
          (0, _timers.clearTimeout)(overallTimeoutTimer);
          if (!usingFakeTimers) {
            clearInterval(intervalId);
          }
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
        function checkRealTimersCallback() {
          if ((0, _timers.jestFakeTimersAreEnabled)()) {
            const error = new Error(`Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830`);
            if (stackTraceError) {
              (0, _errors.copyStackTrace)(error, stackTraceError);
            }
            return reject(error);
          } else {
            return checkExpectation();
          }
        }
        function checkExpectation() {
          if (promiseStatus === "pending")
            return;
          try {
            const result = expectation();
            if (typeof (result === null || result === void 0 ? void 0 : result.then) === "function") {
              promiseStatus = "pending";
              result.then((resolvedValue) => {
                promiseStatus = "resolved";
                onDone(null, resolvedValue);
                return;
              }, (rejectedValue) => {
                promiseStatus = "rejected";
                lastError = rejectedValue;
                return;
              });
            } else {
              onDone(null, result);
            }
          } catch (error) {
            lastError = error;
          }
        }
        function handleTimeout() {
          let error;
          if (lastError) {
            error = lastError;
            if (stackTraceError) {
              (0, _errors.copyStackTrace)(error, stackTraceError);
            }
          } else {
            error = new Error("Timed out in waitFor.");
            if (stackTraceError) {
              (0, _errors.copyStackTrace)(error, stackTraceError);
            }
          }
          onDone(error, null);
        }
      });
    }
    async function waitFor(expectation, options) {
      const stackTraceError = new _errors.ErrorWithStack("STACK_TRACE_ERROR", waitFor);
      const optionsWithStackTrace = __spreadValues({
        stackTraceError
      }, options);
      if (!checkReactVersionAtLeast(16, 9)) {
        return waitForInternal(expectation, optionsWithStackTrace);
      }
      let result;
      await (0, _act.default)(async () => {
        result = await waitForInternal(expectation, optionsWithStackTrace);
      });
      return result;
    }
    function waitForElement(expectation, _timeout = 4500, _interval = 50) {
      (0, _errors.throwRemovedFunctionError)("waitForElement", "migration-v2#waitfor-api-changes");
      return Promise.reject();
    }
  }
});

// node_modules/@testing-library/react-native/build/helpers/makeQueries.js
var require_makeQueries = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/makeQueries.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.makeQueries = makeQueries;
    var _waitFor = _interopRequireDefault(require_waitFor());
    var _errors = require_errors();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var deprecatedKeys = ["timeout", "interval", "stackTraceError"];
    var extractDeprecatedWaitForOptionUsage = (queryOptions) => {
      if (queryOptions) {
        const waitForOptions = {
          timeout: queryOptions.timeout,
          interval: queryOptions.interval,
          stackTraceError: queryOptions.stackTraceError
        };
        deprecatedKeys.forEach((key) => {
          if (queryOptions[key]) {
            console.warn(`Use of option "${key}" in a findBy* query's second parameter, TextMatchOptions, is deprecated. Please pass this option in the third, WaitForOptions, parameter. 
Example: 

  findByText(text, {}, { ${key}: ${queryOptions[key].toString()} })`);
          }
        });
        return waitForOptions;
      }
    };
    function makeQueries(queryAllByQuery, getMissingError, getMultipleError) {
      function getAllByQuery(instance) {
        return function getAllFn(args, queryOptions) {
          const results = queryAllByQuery(instance)(args, queryOptions);
          if (results.length === 0) {
            throw new _errors.ErrorWithStack(getMissingError(args), getAllFn);
          }
          return results;
        };
      }
      function queryByQuery(instance) {
        return function singleQueryFn(args, queryOptions) {
          const results = queryAllByQuery(instance)(args, queryOptions);
          if (results.length > 1) {
            throw new _errors.ErrorWithStack(getMultipleError(args), singleQueryFn);
          }
          if (results.length === 0) {
            return null;
          }
          return results[0];
        };
      }
      function getByQuery(instance) {
        return function getFn(args, queryOptions) {
          const results = queryAllByQuery(instance)(args, queryOptions);
          if (results.length > 1) {
            throw new _errors.ErrorWithStack(getMultipleError(args), getFn);
          }
          if (results.length === 0) {
            throw new _errors.ErrorWithStack(getMissingError(args), getFn);
          }
          return results[0];
        };
      }
      function findAllByQuery(instance) {
        return function findAllFn(args, queryOptions, waitForOptions = {}) {
          const deprecatedWaitForOptions = extractDeprecatedWaitForOptionUsage(queryOptions);
          return (0, _waitFor.default)(() => getAllByQuery(instance)(args, queryOptions), __spreadValues(__spreadValues({}, deprecatedWaitForOptions), waitForOptions));
        };
      }
      function findByQuery(instance) {
        return function findFn(args, queryOptions, waitForOptions = {}) {
          const deprecatedWaitForOptions = extractDeprecatedWaitForOptionUsage(queryOptions);
          return (0, _waitFor.default)(() => getByQuery(instance)(args, queryOptions), __spreadValues(__spreadValues({}, deprecatedWaitForOptions), waitForOptions));
        };
      }
      return {
        getBy: getByQuery,
        getAllBy: getAllByQuery,
        queryBy: queryByQuery,
        findBy: findByQuery,
        findAllBy: findAllByQuery
      };
    }
  }
});

// node_modules/@testing-library/react-native/build/helpers/byTestId.js
var require_byTestId = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/byTestId.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByTestId = exports.queryAllByTestId = exports.getByTestId = exports.getAllByTestId = exports.findByTestId = exports.findAllByTestId = void 0;
    var _matches = require_matches();
    var _makeQueries = require_makeQueries();
    var getNodeByTestId = (node, testID, options = {}) => {
      const {
        exact,
        normalizer
      } = options;
      return (0, _matches.matches)(testID, node.props.testID, normalizer, exact);
    };
    var queryAllByTestId = (instance) => function queryAllByTestIdFn(testId, queryOptions) {
      const results = instance.findAll((node) => getNodeByTestId(node, testId, queryOptions)).filter((element) => typeof element.type === "string");
      return results;
    };
    exports.queryAllByTestId = queryAllByTestId;
    var getMultipleError = (testId) => `Found multiple elements with testID: ${String(testId)}`;
    var getMissingError = (testId) => `Unable to find an element with testID: ${String(testId)}`;
    var {
      getBy: getByTestId,
      getAllBy: getAllByTestId,
      queryBy: queryByTestId,
      findBy: findByTestId,
      findAllBy: findAllByTestId
    } = (0, _makeQueries.makeQueries)(queryAllByTestId, getMissingError, getMultipleError);
    exports.findAllByTestId = findAllByTestId;
    exports.findByTestId = findByTestId;
    exports.queryByTestId = queryByTestId;
    exports.getAllByTestId = getAllByTestId;
    exports.getByTestId = getByTestId;
  }
});

// node_modules/@testing-library/react-native/build/helpers/filterNodeByType.js
var require_filterNodeByType = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/filterNodeByType.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.filterNodeByType = void 0;
    var filterNodeByType = (node, type) => node.type === type;
    exports.filterNodeByType = filterNodeByType;
  }
});

// node_modules/@testing-library/react-native/build/helpers/byText.js
var require_byText = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/byText.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByText = exports.queryAllByText = exports.getByText = exports.getAllByText = exports.findByText = exports.findAllByText = void 0;
    var React3 = _interopRequireWildcard(require_react());
    var _matches = require_matches();
    var _makeQueries = require_makeQueries();
    var _filterNodeByType = require_filterNodeByType();
    var _errors = require_errors();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getChildrenAsText = (children, TextComponent) => {
      const textContent = [];
      React3.Children.forEach(children, (child) => {
        var _child$props;
        if (typeof child === "string") {
          textContent.push(child);
          return;
        }
        if (typeof child === "number") {
          textContent.push(child.toString());
          return;
        }
        if (child !== null && child !== void 0 && (_child$props = child.props) !== null && _child$props !== void 0 && _child$props.children) {
          if ((0, _filterNodeByType.filterNodeByType)(child, TextComponent) && textContent.length === 0) {
            return;
          }
          getChildrenAsText(child.props.children, TextComponent);
        }
      });
      return textContent;
    };
    var getNodeByText = (node, text, options = {}) => {
      try {
        const {
          Text
        } = require("react-native");
        const isTextComponent = (0, _filterNodeByType.filterNodeByType)(node, Text);
        if (isTextComponent) {
          const textChildren = getChildrenAsText(node.props.children, Text);
          if (textChildren) {
            const textToTest = textChildren.join("");
            const {
              exact,
              normalizer
            } = options;
            return (0, _matches.matches)(text, textToTest, normalizer, exact);
          }
        }
        return false;
      } catch (error) {
        throw (0, _errors.createLibraryNotSupportedError)(error);
      }
    };
    var queryAllByText = (instance) => function queryAllByTextFn(text, queryOptions) {
      const results = instance.findAll((node) => getNodeByText(node, text, queryOptions));
      return results;
    };
    exports.queryAllByText = queryAllByText;
    var getMultipleError = (text) => `Found multiple elements with text: ${String(text)}`;
    var getMissingError = (text) => `Unable to find an element with text: ${String(text)}`;
    var {
      getBy: getByText,
      getAllBy: getAllByText,
      queryBy: queryByText,
      findBy: findByText,
      findAllBy: findAllByText
    } = (0, _makeQueries.makeQueries)(queryAllByText, getMissingError, getMultipleError);
    exports.findAllByText = findAllByText;
    exports.findByText = findByText;
    exports.queryByText = queryByText;
    exports.getAllByText = getAllByText;
    exports.getByText = getByText;
  }
});

// node_modules/@testing-library/react-native/build/helpers/byPlaceholderText.js
var require_byPlaceholderText = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/byPlaceholderText.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByPlaceholderText = exports.queryAllByPlaceholderText = exports.getByPlaceholderText = exports.getAllByPlaceholderText = exports.findByPlaceholderText = exports.findAllByPlaceholderText = void 0;
    var _matches = require_matches();
    var _makeQueries = require_makeQueries();
    var _filterNodeByType = require_filterNodeByType();
    var _errors = require_errors();
    var getTextInputNodeByPlaceholderText = (node, placeholder, options = {}) => {
      try {
        const {
          TextInput
        } = require("react-native");
        const {
          exact,
          normalizer
        } = options;
        return (0, _filterNodeByType.filterNodeByType)(node, TextInput) && (0, _matches.matches)(placeholder, node.props.placeholder, normalizer, exact);
      } catch (error) {
        throw (0, _errors.createLibraryNotSupportedError)(error);
      }
    };
    var queryAllByPlaceholderText = (instance) => function queryAllByPlaceholderFn(placeholder, queryOptions) {
      return instance.findAll((node) => getTextInputNodeByPlaceholderText(node, placeholder, queryOptions));
    };
    exports.queryAllByPlaceholderText = queryAllByPlaceholderText;
    var getMultipleError = (placeholder) => `Found multiple elements with placeholder: ${String(placeholder)} `;
    var getMissingError = (placeholder) => `Unable to find an element with placeholder: ${String(placeholder)}`;
    var {
      getBy: getByPlaceholderText,
      getAllBy: getAllByPlaceholderText,
      queryBy: queryByPlaceholderText,
      findBy: findByPlaceholderText,
      findAllBy: findAllByPlaceholderText
    } = (0, _makeQueries.makeQueries)(queryAllByPlaceholderText, getMissingError, getMultipleError);
    exports.findAllByPlaceholderText = findAllByPlaceholderText;
    exports.findByPlaceholderText = findByPlaceholderText;
    exports.queryByPlaceholderText = queryByPlaceholderText;
    exports.getAllByPlaceholderText = getAllByPlaceholderText;
    exports.getByPlaceholderText = getByPlaceholderText;
  }
});

// node_modules/@testing-library/react-native/build/helpers/byDisplayValue.js
var require_byDisplayValue = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/byDisplayValue.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByDisplayValue = exports.queryAllByDisplayValue = exports.getByDisplayValue = exports.getAllByDisplayValue = exports.findByDisplayValue = exports.findAllByDisplayValue = void 0;
    var _matches = require_matches();
    var _makeQueries = require_makeQueries();
    var _filterNodeByType = require_filterNodeByType();
    var _errors = require_errors();
    var getTextInputNodeByDisplayValue = (node, value, options = {}) => {
      try {
        const {
          TextInput
        } = require("react-native");
        const {
          exact,
          normalizer
        } = options;
        const nodeValue = node.props.value !== void 0 ? node.props.value : node.props.defaultValue;
        return (0, _filterNodeByType.filterNodeByType)(node, TextInput) && (0, _matches.matches)(value, nodeValue, normalizer, exact);
      } catch (error) {
        throw (0, _errors.createLibraryNotSupportedError)(error);
      }
    };
    var queryAllByDisplayValue = (instance) => function queryAllByDisplayValueFn(displayValue, queryOptions) {
      return instance.findAll((node) => getTextInputNodeByDisplayValue(node, displayValue, queryOptions));
    };
    exports.queryAllByDisplayValue = queryAllByDisplayValue;
    var getMultipleError = (displayValue) => `Found multiple elements with display value: ${String(displayValue)} `;
    var getMissingError = (displayValue) => `Unable to find an element with displayValue: ${String(displayValue)}`;
    var {
      getBy: getByDisplayValue,
      getAllBy: getAllByDisplayValue,
      queryBy: queryByDisplayValue,
      findBy: findByDisplayValue,
      findAllBy: findAllByDisplayValue
    } = (0, _makeQueries.makeQueries)(queryAllByDisplayValue, getMissingError, getMultipleError);
    exports.findAllByDisplayValue = findAllByDisplayValue;
    exports.findByDisplayValue = findByDisplayValue;
    exports.queryByDisplayValue = queryByDisplayValue;
    exports.getAllByDisplayValue = getAllByDisplayValue;
    exports.getByDisplayValue = getByDisplayValue;
  }
});

// node_modules/@testing-library/react-native/build/helpers/getByAPI.js
var require_getByAPI = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/getByAPI.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getByAPI = exports.UNSAFE_getAllByProps = exports.UNSAFE_getAllByType = exports.UNSAFE_getByProps = exports.UNSAFE_getByType = void 0;
    var React3 = _interopRequireWildcard(require_react());
    var _prettyFormat = _interopRequireDefault(require_build());
    var _errors = require_errors();
    var _byTestId = require_byTestId();
    var _byText = require_byText();
    var _byPlaceholderText = require_byPlaceholderText();
    var _byDisplayValue = require_byDisplayValue();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var UNSAFE_getByType = (instance) => function getByTypeFn(type) {
      try {
        return instance.findByType(type);
      } catch (error) {
        throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByTypeFn);
      }
    };
    exports.UNSAFE_getByType = UNSAFE_getByType;
    var UNSAFE_getByProps = (instance) => function getByPropsFn(props) {
      try {
        return instance.findByProps(props);
      } catch (error) {
        throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByPropsFn);
      }
    };
    exports.UNSAFE_getByProps = UNSAFE_getByProps;
    var UNSAFE_getAllByType = (instance) => function getAllByTypeFn(type) {
      const results = instance.findAllByType(type);
      if (results.length === 0) {
        throw new _errors.ErrorWithStack("No instances found", getAllByTypeFn);
      }
      return results;
    };
    exports.UNSAFE_getAllByType = UNSAFE_getAllByType;
    var UNSAFE_getAllByProps = (instance) => function getAllByPropsFn(props) {
      const results = instance.findAllByProps(props);
      if (results.length === 0) {
        throw new _errors.ErrorWithStack(`No instances found with props:
${(0, _prettyFormat.default)(props)}`, getAllByPropsFn);
      }
      return results;
    };
    exports.UNSAFE_getAllByProps = UNSAFE_getAllByProps;
    var getByAPI = (instance) => ({
      getByText: (0, _byText.getByText)(instance),
      getByPlaceholderText: (0, _byPlaceholderText.getByPlaceholderText)(instance),
      getByDisplayValue: (0, _byDisplayValue.getByDisplayValue)(instance),
      getByTestId: (0, _byTestId.getByTestId)(instance),
      getAllByText: (0, _byText.getAllByText)(instance),
      getAllByPlaceholderText: (0, _byPlaceholderText.getAllByPlaceholderText)(instance),
      getAllByDisplayValue: (0, _byDisplayValue.getAllByDisplayValue)(instance),
      getAllByTestId: (0, _byTestId.getAllByTestId)(instance),
      UNSAFE_getByType: UNSAFE_getByType(instance),
      UNSAFE_getAllByType: UNSAFE_getAllByType(instance),
      UNSAFE_getByProps: UNSAFE_getByProps(instance),
      UNSAFE_getAllByProps: UNSAFE_getAllByProps(instance),
      getByName: () => (0, _errors.throwRemovedFunctionError)("getByName", "migration-v2#removed-functions"),
      getAllByName: () => (0, _errors.throwRemovedFunctionError)("getAllByName", "migration-v2#removed-functions"),
      getByType: () => (0, _errors.throwRemovedFunctionError)("getByType", "migration-v2#removed-functions"),
      getAllByType: () => (0, _errors.throwRemovedFunctionError)("getAllByType", "migration-v2#removed-functions"),
      getByProps: () => (0, _errors.throwRemovedFunctionError)("getByProps", "migration-v2#removed-functions"),
      getAllByProps: () => (0, _errors.throwRemovedFunctionError)("getAllByProps", "migration-v2#removed-functions"),
      getByPlaceholder: () => (0, _errors.throwRenamedFunctionError)("getByPlaceholder", "getByPlaceholderText"),
      getAllByPlaceholder: () => (0, _errors.throwRenamedFunctionError)("getAllByPlaceholder", "getByPlaceholderText")
    });
    exports.getByAPI = getByAPI;
  }
});

// node_modules/@testing-library/react-native/build/helpers/queryByAPI.js
var require_queryByAPI = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/queryByAPI.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByAPI = exports.UNSAFE_queryAllByProps = exports.UNSAFE_queryAllByType = exports.UNSAFE_queryByProps = exports.UNSAFE_queryByType = void 0;
    var React3 = _interopRequireWildcard(require_react());
    var _getByAPI = require_getByAPI();
    var _byTestId = require_byTestId();
    var _byText = require_byText();
    var _byPlaceholderText = require_byPlaceholderText();
    var _byDisplayValue = require_byDisplayValue();
    var _errors = require_errors();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var UNSAFE_queryByType = (instance) => function queryByTypeFn(type) {
      try {
        return (0, _getByAPI.UNSAFE_getByType)(instance)(type);
      } catch (error) {
        return (0, _errors.createQueryByError)(error, queryByTypeFn);
      }
    };
    exports.UNSAFE_queryByType = UNSAFE_queryByType;
    var UNSAFE_queryByProps = (instance) => function queryByPropsFn(props) {
      try {
        return (0, _getByAPI.UNSAFE_getByProps)(instance)(props);
      } catch (error) {
        return (0, _errors.createQueryByError)(error, queryByPropsFn);
      }
    };
    exports.UNSAFE_queryByProps = UNSAFE_queryByProps;
    var UNSAFE_queryAllByType = (instance) => (type) => {
      try {
        return (0, _getByAPI.UNSAFE_getAllByType)(instance)(type);
      } catch (error) {
        return [];
      }
    };
    exports.UNSAFE_queryAllByType = UNSAFE_queryAllByType;
    var UNSAFE_queryAllByProps = (instance) => (props) => {
      try {
        return (0, _getByAPI.UNSAFE_getAllByProps)(instance)(props);
      } catch (error) {
        return [];
      }
    };
    exports.UNSAFE_queryAllByProps = UNSAFE_queryAllByProps;
    var queryByAPI = (instance) => ({
      queryByTestId: (0, _byTestId.queryByTestId)(instance),
      queryByText: (0, _byText.queryByText)(instance),
      queryByPlaceholderText: (0, _byPlaceholderText.queryByPlaceholderText)(instance),
      queryByDisplayValue: (0, _byDisplayValue.queryByDisplayValue)(instance),
      queryAllByTestId: (0, _byTestId.queryAllByTestId)(instance),
      queryAllByText: (0, _byText.queryAllByText)(instance),
      queryAllByPlaceholderText: (0, _byPlaceholderText.queryAllByPlaceholderText)(instance),
      queryAllByDisplayValue: (0, _byDisplayValue.queryAllByDisplayValue)(instance),
      UNSAFE_queryByType: UNSAFE_queryByType(instance),
      UNSAFE_queryAllByType: UNSAFE_queryAllByType(instance),
      UNSAFE_queryByProps: UNSAFE_queryByProps(instance),
      UNSAFE_queryAllByProps: UNSAFE_queryAllByProps(instance),
      queryByName: () => (0, _errors.throwRemovedFunctionError)("queryByName", "migration-v2#removed-functions"),
      queryAllByName: () => (0, _errors.throwRemovedFunctionError)("queryAllByName", "migration-v2#removed-functions"),
      queryByType: () => (0, _errors.throwRemovedFunctionError)("queryByType", "migration-v2#removed-functions"),
      queryAllByType: () => (0, _errors.throwRemovedFunctionError)("queryAllByType", "migration-v2#removed-functions"),
      queryByProps: () => (0, _errors.throwRemovedFunctionError)("queryByProps", "migration-v2#removed-functions"),
      queryAllByProps: () => (0, _errors.throwRemovedFunctionError)("queryAllByProps", "migration-v2#removed-functions"),
      queryByPlaceholder: () => (0, _errors.throwRenamedFunctionError)("queryByPlaceholder", "queryByPlaceholderText"),
      queryAllByPlaceholder: () => (0, _errors.throwRenamedFunctionError)("queryAllByPlaceholder", "queryAllByPlaceholderText")
    });
    exports.queryByAPI = queryByAPI;
  }
});

// node_modules/@testing-library/react-native/build/helpers/findByAPI.js
var require_findByAPI = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/findByAPI.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.findByAPI = void 0;
    var _byTestId = require_byTestId();
    var _byText = require_byText();
    var _byPlaceholderText = require_byPlaceholderText();
    var _byDisplayValue = require_byDisplayValue();
    var _errors = require_errors();
    var findByAPI = (instance) => ({
      findByTestId: (0, _byTestId.findByTestId)(instance),
      findByText: (0, _byText.findByText)(instance),
      findByPlaceholderText: (0, _byPlaceholderText.findByPlaceholderText)(instance),
      findByDisplayValue: (0, _byDisplayValue.findByDisplayValue)(instance),
      findAllByTestId: (0, _byTestId.findAllByTestId)(instance),
      findAllByText: (0, _byText.findAllByText)(instance),
      findAllByPlaceholderText: (0, _byPlaceholderText.findAllByPlaceholderText)(instance),
      findAllByDisplayValue: (0, _byDisplayValue.findAllByDisplayValue)(instance),
      findByPlaceholder: () => (0, _errors.throwRenamedFunctionError)("findByPlaceholder", "findByPlaceholderText"),
      findAllByPlaceholder: () => (0, _errors.throwRenamedFunctionError)("findAllByPlaceholder", "findAllByPlaceholderText")
    });
    exports.findByAPI = findByAPI;
  }
});

// node_modules/@testing-library/react-native/build/helpers/makeA11yQuery.js
var require_makeA11yQuery = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/makeA11yQuery.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _waitFor = _interopRequireDefault(require_waitFor());
    var _errors = require_errors();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isNodeValid(node) {
      return typeof node.type === "string";
    }
    function makeAliases(aliases, query) {
      return aliases.map((alias) => ({
        [alias]: query
      })).reduce((acc, query2) => __spreadValues(__spreadValues({}, acc), query2), {});
    }
    var makeA11yQuery = (name, queryNames, matcherFn) => (instance) => {
      const getBy = (matcher) => {
        try {
          return instance.find((node) => isNodeValid(node) && matcherFn(node.props[name], matcher));
        } catch (error) {
          throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error, name, matcher), getBy);
        }
      };
      const getAllBy = (matcher) => {
        const results = instance.findAll((node) => isNodeValid(node) && matcherFn(node.props[name], matcher));
        if (results.length === 0) {
          throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(new Error("No instances found"), name, matcher), getAllBy);
        }
        return results;
      };
      const queryBy = (matcher) => {
        try {
          return getBy(matcher);
        } catch (error) {
          return (0, _errors.createQueryByError)(error, queryBy);
        }
      };
      const queryAllBy = (matcher) => {
        try {
          return getAllBy(matcher);
        } catch (error) {
          return [];
        }
      };
      const findBy = (matcher, waitForOptions) => {
        return (0, _waitFor.default)(() => getBy(matcher), waitForOptions);
      };
      const findAllBy = (matcher, waitForOptions) => {
        return (0, _waitFor.default)(() => getAllBy(matcher), waitForOptions);
      };
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, makeAliases(queryNames.getBy, getBy)), makeAliases(queryNames.getAllBy, getAllBy)), makeAliases(queryNames.queryBy, queryBy)), makeAliases(queryNames.queryAllBy, queryAllBy)), makeAliases(queryNames.findBy, findBy)), makeAliases(queryNames.findAllBy, findAllBy));
    };
    var _default = makeA11yQuery;
    exports.default = _default;
  }
});

// node_modules/@testing-library/react-native/build/helpers/a11yAPI.js
var require_a11yAPI = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/a11yAPI.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.matchStringValue = matchStringValue;
    exports.matchArrayValue = matchArrayValue;
    exports.matchObject = matchObject;
    exports.a11yAPI = void 0;
    var _makeA11yQuery = _interopRequireDefault(require_makeA11yQuery());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function matchStringValue(prop, matcher) {
      if (!prop) {
        return false;
      }
      if (typeof matcher === "string") {
        return prop === matcher;
      }
      return Boolean(prop.match(matcher));
    }
    function matchArrayValue(prop, matcher) {
      if (!prop || matcher.length === 0) {
        return false;
      }
      if (typeof matcher === "string") {
        return prop.includes(matcher);
      }
      return !matcher.some((e) => !prop.includes(e));
    }
    function matchObject(prop, matcher) {
      return prop ? Object.keys(matcher).length !== 0 && Object.keys(prop).length !== 0 && !Object.keys(matcher).some((key) => prop[key] !== matcher[key]) : false;
    }
    var a11yAPI = (instance) => __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, (0, _makeA11yQuery.default)("accessibilityLabel", {
      getBy: ["getByA11yLabel", "getByAccessibilityLabel", "getByLabelText"],
      getAllBy: ["getAllByA11yLabel", "getAllByAccessibilityLabel", "getAllByLabelText"],
      queryBy: ["queryByA11yLabel", "queryByAccessibilityLabel", "queryByLabelText"],
      queryAllBy: ["queryAllByA11yLabel", "queryAllByAccessibilityLabel", "queryAllByLabelText"],
      findBy: ["findByA11yLabel", "findByAccessibilityLabel", "findByLabelText"],
      findAllBy: ["findAllByA11yLabel", "findAllByAccessibilityLabel", "findAllByLabelText"]
    }, matchStringValue)(instance)), (0, _makeA11yQuery.default)("accessibilityHint", {
      getBy: ["getByA11yHint", "getByAccessibilityHint", "getByHintText"],
      getAllBy: ["getAllByA11yHint", "getAllByAccessibilityHint", "getAllByHintText"],
      queryBy: ["queryByA11yHint", "queryByAccessibilityHint", "queryByHintText"],
      queryAllBy: ["queryAllByA11yHint", "queryAllByAccessibilityHint", "queryAllByHintText"],
      findBy: ["findByA11yHint", "findByAccessibilityHint", "findByHintText"],
      findAllBy: ["findAllByA11yHint", "findAllByAccessibilityHint", "findAllByHintText"]
    }, matchStringValue)(instance)), (0, _makeA11yQuery.default)("accessibilityRole", {
      getBy: ["getByA11yRole", "getByAccessibilityRole", "getByRole"],
      getAllBy: ["getAllByA11yRole", "getAllByAccessibilityRole", "getAllByRole"],
      queryBy: ["queryByA11yRole", "queryByAccessibilityRole", "queryByRole"],
      queryAllBy: ["queryAllByA11yRole", "queryAllByAccessibilityRole", "queryAllByRole"],
      findBy: ["findByA11yRole", "findByAccessibilityRole", "findByRole"],
      findAllBy: ["findAllByA11yRole", "findAllByAccessibilityRole", "findAllByRole"]
    }, matchStringValue)(instance)), (0, _makeA11yQuery.default)("accessibilityStates", {
      getBy: ["getByA11yStates", "getByAccessibilityStates"],
      getAllBy: ["getAllByA11yStates", "getAllByAccessibilityStates"],
      queryBy: ["queryByA11yStates", "queryByAccessibilityStates"],
      queryAllBy: ["queryAllByA11yStates", "queryAllByAccessibilityStates"],
      findBy: ["findByA11yStates", "findByAccessibilityStates"],
      findAllBy: ["findAllByA11yStates", "findAllByAccessibilityStates"]
    }, matchArrayValue)(instance)), (0, _makeA11yQuery.default)("accessibilityState", {
      getBy: ["getByA11yState", "getByAccessibilityState"],
      getAllBy: ["getAllByA11yState", "getAllByAccessibilityState"],
      queryBy: ["queryByA11yState", "queryByAccessibilityState"],
      queryAllBy: ["queryAllByA11yState", "queryAllByAccessibilityState"],
      findBy: ["findByA11yState", "findByAccessibilityState"],
      findAllBy: ["findAllByA11yState", "findAllByAccessibilityState"]
    }, matchObject)(instance)), (0, _makeA11yQuery.default)("accessibilityValue", {
      getBy: ["getByA11yValue", "getByAccessibilityValue"],
      getAllBy: ["getAllByA11yValue", "getAllByAccessibilityValue"],
      queryBy: ["queryByA11yValue", "queryByAccessibilityValue"],
      queryAllBy: ["queryAllByA11yValue", "queryAllByAccessibilityValue"],
      findBy: ["findByA11yValue", "findByAccessibilityValue"],
      findAllBy: ["findAllByA11yValue", "findAllByAccessibilityValue"]
    }, matchObject)(instance));
    exports.a11yAPI = a11yAPI;
  }
});

// node_modules/react-shallow-renderer/cjs/react-shallow-renderer.js
var require_react_shallow_renderer = __commonJS({
  "node_modules/react-shallow-renderer/cjs/react-shallow-renderer.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    var _assign = require_object_assign();
    var React3 = require_react();
    var reactIs = require_react_is();
    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
    function describeComponentFrame(name, source, ownerName) {
      var sourceInfo = "";
      if (source) {
        var path = source.fileName;
        var fileName = path.replace(BEFORE_SLASH_RE, "");
        if (process.env.NODE_ENV !== "production") {
          if (/^index\./.test(fileName)) {
            var match = path.match(BEFORE_SLASH_RE);
            if (match) {
              var pathBeforeSlash = match[1];
              if (pathBeforeSlash) {
                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, "");
                fileName = folderName + "/" + fileName;
              }
            }
          }
        }
        sourceInfo = " (at " + fileName + ":" + source.lineNumber + ")";
      } else if (ownerName) {
        sourceInfo = " (created by " + ownerName + ")";
      }
      return "\n    in " + (name || "Unknown") + sourceInfo;
    }
    var ReactSharedInternals = React3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (!hasOwnProperty.call(ReactSharedInternals, "ReactCurrentDispatcher")) {
      ReactSharedInternals.ReactCurrentDispatcher = {
        current: null
      };
    }
    if (!hasOwnProperty.call(ReactSharedInternals, "ReactCurrentBatchConfig")) {
      ReactSharedInternals.ReactCurrentBatchConfig = {
        suspense: null
      };
    }
    function error(format) {
      if (process.env.NODE_ENV !== "production") {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        printWarning("error", format, args);
      }
    }
    function printWarning(level, format, args) {
      if (process.env.NODE_ENV !== "production") {
        var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === "string" && args[args.length - 1].indexOf("\n    in") === 0;
        if (!hasExistingStack) {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
        }
        var argsWithFormat = args.map(function(item) {
          return "" + item;
        });
        argsWithFormat.unshift("Warning: " + format);
        Function.prototype.apply.call(console[level], console, argsWithFormat);
        try {
          var argIndex = 0;
          var message = "Warning: " + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          throw new Error(message);
        } catch (x) {
        }
      }
    }
    var hasSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
    var REACT_CHUNK_TYPE = hasSymbol ? Symbol.for("react.chunk") : 60121;
    var Resolved = 1;
    function refineResolvedLazyComponent(lazyComponent) {
      return lazyComponent._status === Resolved ? lazyComponent._result : null;
    }
    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || "";
      return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
    }
    function getComponentName(type) {
      if (type == null) {
        return null;
      }
      if (process.env.NODE_ENV !== "production") {
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
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if (typeof type === "object") {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return "Context.Consumer";
          case REACT_PROVIDER_TYPE:
            return "Context.Provider";
          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, "ForwardRef");
          case REACT_MEMO_TYPE:
            return getComponentName(type.type);
          case REACT_CHUNK_TYPE:
            return getComponentName(type.render);
          case REACT_LAZY_TYPE: {
            var thenable = type;
            var resolvedThenable = refineResolvedLazyComponent(thenable);
            if (resolvedThenable) {
              return getComponentName(resolvedThenable);
            }
            break;
          }
        }
      }
      return null;
    }
    function is(x, y) {
      return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = typeof Object.is === "function" ? Object.is : is;
    var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    function shallowEqual(objA, objB) {
      if (objectIs(objA, objB)) {
        return true;
      }
      if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
        return false;
      }
      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) {
        return false;
      }
      for (var i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty$1.call(objB, keysA[i]) || !objectIs(objA[keysA[i]], objB[keysA[i]])) {
          return false;
        }
      }
      return true;
    }
    var loggedTypeFailures = {};
    function checkPropTypes(typeSpecs, values, location, componentName) {
      if (process.env.NODE_ENV !== "production") {
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
              error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
            }
            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
              loggedTypeFailures[error$1.message] = true;
              error("Failed %s type: %s", location, error$1.message);
            }
          }
        }
      }
    }
    var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var RE_RENDER_LIMIT = 25;
    var emptyObject = {};
    if (process.env.NODE_ENV !== "production") {
      Object.freeze(emptyObject);
    }
    var currentHookNameInDev;
    function areHookInputsEqual(nextDeps, prevDeps) {
      if (prevDeps === null) {
        if (process.env.NODE_ENV !== "production") {
          error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
        }
        return false;
      }
      if (process.env.NODE_ENV !== "production") {
        if (nextDeps.length !== prevDeps.length) {
          error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        }
      }
      for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
        if (objectIs(nextDeps[i], prevDeps[i])) {
          continue;
        }
        return false;
      }
      return true;
    }
    var Updater = /* @__PURE__ */ function() {
      function Updater2(renderer) {
        this._renderer = renderer;
        this._callbacks = [];
      }
      var _proto = Updater2.prototype;
      _proto._enqueueCallback = function _enqueueCallback(callback, publicInstance) {
        if (typeof callback === "function" && publicInstance) {
          this._callbacks.push({
            callback,
            publicInstance
          });
        }
      };
      _proto._invokeCallbacks = function _invokeCallbacks() {
        var callbacks = this._callbacks;
        this._callbacks = [];
        callbacks.forEach(function(_ref) {
          var callback = _ref.callback, publicInstance = _ref.publicInstance;
          callback.call(publicInstance);
        });
      };
      _proto.isMounted = function isMounted(publicInstance) {
        return !!this._renderer._element;
      };
      _proto.enqueueForceUpdate = function enqueueForceUpdate(publicInstance, callback, callerName) {
        this._enqueueCallback(callback, publicInstance);
        this._renderer._forcedUpdate = true;
        this._renderer.render(this._renderer._element, this._renderer._context);
      };
      _proto.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        this._enqueueCallback(callback, publicInstance);
        this._renderer._newState = completeState;
        this._renderer.render(this._renderer._element, this._renderer._context);
      };
      _proto.enqueueSetState = function enqueueSetState(publicInstance, partialState, callback, callerName) {
        this._enqueueCallback(callback, publicInstance);
        var currentState = this._renderer._newState || publicInstance.state;
        if (typeof partialState === "function") {
          partialState = partialState.call(publicInstance, currentState, publicInstance.props);
        }
        if (partialState === null || partialState === void 0) {
          return;
        }
        this._renderer._newState = _assign({}, currentState, partialState);
        this._renderer.render(this._renderer._element, this._renderer._context);
      };
      return Updater2;
    }();
    function createHook() {
      return {
        memoizedState: null,
        queue: null,
        next: null
      };
    }
    function basicStateReducer(state, action) {
      return typeof action === "function" ? action(state) : action;
    }
    var ReactShallowRenderer = /* @__PURE__ */ function() {
      function ReactShallowRenderer2() {
        this._reset();
      }
      var _proto2 = ReactShallowRenderer2.prototype;
      _proto2._reset = function _reset() {
        this._context = null;
        this._element = null;
        this._instance = null;
        this._newState = null;
        this._rendered = null;
        this._rendering = false;
        this._forcedUpdate = false;
        this._updater = new Updater(this);
        this._dispatcher = this._createDispatcher();
        this._workInProgressHook = null;
        this._firstWorkInProgressHook = null;
        this._isReRender = false;
        this._didScheduleRenderPhaseUpdate = false;
        this._renderPhaseUpdates = null;
        this._numberOfReRenders = 0;
      };
      _proto2._validateCurrentlyRenderingComponent = function _validateCurrentlyRenderingComponent() {
        if (!(this._rendering && !this._instance)) {
          throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
        }
      };
      _proto2._createDispatcher = function _createDispatcher() {
        var _this = this;
        var useReducer = function useReducer2(reducer, initialArg, init) {
          _this._validateCurrentlyRenderingComponent();
          _this._createWorkInProgressHook();
          var workInProgressHook = _this._workInProgressHook;
          if (_this._isReRender) {
            var queue = workInProgressHook.queue;
            var dispatch = queue.dispatch;
            if (_this._numberOfReRenders > 0) {
              if (_this._renderPhaseUpdates !== null) {
                var firstRenderPhaseUpdate = _this._renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== void 0) {
                  _this._renderPhaseUpdates.delete(queue);
                  var _newState = workInProgressHook.memoizedState;
                  var _update = firstRenderPhaseUpdate;
                  do {
                    var action = _update.action;
                    _newState = reducer(_newState, action);
                    _update = _update.next;
                  } while (_update !== null);
                  workInProgressHook.memoizedState = _newState;
                  return [_newState, dispatch];
                }
              }
              return [workInProgressHook.memoizedState, dispatch];
            }
            var newState = workInProgressHook.memoizedState;
            var update = queue.first;
            if (update !== null) {
              do {
                var _action = update.action;
                newState = reducer(newState, _action);
                update = update.next;
              } while (update !== null);
              queue.first = null;
              workInProgressHook.memoizedState = newState;
            }
            return [newState, dispatch];
          } else {
            var initialState;
            if (reducer === basicStateReducer) {
              initialState = typeof initialArg === "function" ? initialArg() : initialArg;
            } else {
              initialState = init !== void 0 ? init(initialArg) : initialArg;
            }
            workInProgressHook.memoizedState = initialState;
            var _queue = workInProgressHook.queue = {
              first: null,
              dispatch: null
            };
            var _dispatch = _queue.dispatch = _this._dispatchAction.bind(_this, _queue);
            return [workInProgressHook.memoizedState, _dispatch];
          }
        };
        var useState = function useState2(initialState) {
          return useReducer(basicStateReducer, initialState);
        };
        var useMemo = function useMemo2(nextCreate, deps) {
          _this._validateCurrentlyRenderingComponent();
          _this._createWorkInProgressHook();
          var nextDeps = deps !== void 0 ? deps : null;
          if (_this._workInProgressHook !== null && _this._workInProgressHook.memoizedState !== null) {
            var prevState = _this._workInProgressHook.memoizedState;
            var prevDeps = prevState[1];
            if (nextDeps !== null) {
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
              }
            }
          }
          var nextValue = nextCreate();
          _this._workInProgressHook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        };
        var useRef = function useRef2(initialValue) {
          _this._validateCurrentlyRenderingComponent();
          _this._createWorkInProgressHook();
          var previousRef = _this._workInProgressHook.memoizedState;
          if (previousRef === null) {
            var ref = {
              current: initialValue
            };
            if (process.env.NODE_ENV !== "production") {
              Object.seal(ref);
            }
            _this._workInProgressHook.memoizedState = ref;
            return ref;
          } else {
            return previousRef;
          }
        };
        var readContext = function readContext2(context, observedBits) {
          return context._currentValue;
        };
        var noOp = function noOp2() {
          _this._validateCurrentlyRenderingComponent();
        };
        var identity = function identity2(fn) {
          return fn;
        };
        var useResponder = function useResponder2(responder, props) {
          return {
            props,
            responder
          };
        };
        var useTransition = function useTransition2(config) {
          _this._validateCurrentlyRenderingComponent();
          var startTransition = function startTransition2(callback) {
            callback();
          };
          return [startTransition, false];
        };
        var useDeferredValue = function useDeferredValue2(value, config) {
          _this._validateCurrentlyRenderingComponent();
          return value;
        };
        return {
          readContext,
          useCallback: identity,
          useContext: function useContext(context) {
            _this._validateCurrentlyRenderingComponent();
            return readContext(context);
          },
          useDebugValue: noOp,
          useEffect: noOp,
          useImperativeHandle: noOp,
          useLayoutEffect: noOp,
          useMemo,
          useReducer,
          useRef,
          useState,
          useResponder,
          useTransition,
          useDeferredValue
        };
      };
      _proto2._dispatchAction = function _dispatchAction(queue, action) {
        if (!(this._numberOfReRenders < RE_RENDER_LIMIT)) {
          throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        }
        if (this._rendering) {
          this._didScheduleRenderPhaseUpdate = true;
          var update = {
            action,
            next: null
          };
          var renderPhaseUpdates = this._renderPhaseUpdates;
          if (renderPhaseUpdates === null) {
            this._renderPhaseUpdates = renderPhaseUpdates = /* @__PURE__ */ new Map();
          }
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
          if (firstRenderPhaseUpdate === void 0) {
            renderPhaseUpdates.set(queue, update);
          } else {
            var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
            while (lastRenderPhaseUpdate.next !== null) {
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            }
            lastRenderPhaseUpdate.next = update;
          }
        } else {
          var _update2 = {
            action,
            next: null
          };
          var last = queue.first;
          if (last === null) {
            queue.first = _update2;
          } else {
            while (last.next !== null) {
              last = last.next;
            }
            last.next = _update2;
          }
          this.render(this._element, this._context);
        }
      };
      _proto2._createWorkInProgressHook = function _createWorkInProgressHook() {
        if (this._workInProgressHook === null) {
          if (this._firstWorkInProgressHook === null) {
            this._isReRender = false;
            this._firstWorkInProgressHook = this._workInProgressHook = createHook();
          } else {
            this._isReRender = true;
            this._workInProgressHook = this._firstWorkInProgressHook;
          }
        } else {
          if (this._workInProgressHook.next === null) {
            this._isReRender = false;
            this._workInProgressHook = this._workInProgressHook.next = createHook();
          } else {
            this._isReRender = true;
            this._workInProgressHook = this._workInProgressHook.next;
          }
        }
        return this._workInProgressHook;
      };
      _proto2._finishHooks = function _finishHooks(element, context) {
        if (this._didScheduleRenderPhaseUpdate) {
          this._didScheduleRenderPhaseUpdate = false;
          this._numberOfReRenders += 1;
          this._workInProgressHook = null;
          this._rendering = false;
          this.render(element, context);
        } else {
          this._workInProgressHook = null;
          this._renderPhaseUpdates = null;
          this._numberOfReRenders = 0;
        }
      };
      _proto2.getMountedInstance = function getMountedInstance() {
        return this._instance;
      };
      _proto2.getRenderOutput = function getRenderOutput() {
        return this._rendered;
      };
      _proto2.render = function render2(element) {
        var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : emptyObject;
        if (!/* @__PURE__ */ React3.isValidElement(element)) {
          throw Error("ReactShallowRenderer render(): Invalid component element." + (typeof element === "function" ? " Instead of passing a component class, make sure to instantiate it by passing it to React.createElement." : ""));
        }
        if (!(typeof element.type !== "string")) {
          throw Error("ReactShallowRenderer render(): Shallow rendering works only with custom components, not primitives (" + element.type + "). Instead of calling `.render(el)` and inspecting the rendered output, look at `el.props` directly instead.");
        }
        if (!(reactIs.isForwardRef(element) || typeof element.type === "function" || reactIs.isMemo(element))) {
          throw Error("ReactShallowRenderer render(): Shallow rendering works only with custom components, but the provided element type was `" + (Array.isArray(element.type) ? "array" : element.type === null ? "null" : typeof element.type) + "`.");
        }
        if (this._rendering) {
          return;
        }
        if (this._element != null && this._element.type !== element.type) {
          this._reset();
        }
        var elementType = reactIs.isMemo(element) ? element.type.type : element.type;
        var previousElement = this._element;
        this._rendering = true;
        this._element = element;
        this._context = getMaskedContext(elementType.contextTypes, context);
        var prevGetStack;
        if (process.env.NODE_ENV !== "production") {
          prevGetStack = ReactDebugCurrentFrame.getCurrentStack;
          ReactDebugCurrentFrame.getCurrentStack = getStackAddendum;
        }
        try {
          if (reactIs.isMemo(element) && elementType.propTypes) {
            currentlyValidatingElement = element;
            checkPropTypes(elementType.propTypes, element.props, "prop", getComponentName(elementType));
          }
          if (this._instance) {
            this._updateClassComponent(elementType, element, this._context);
          } else {
            if (shouldConstruct(elementType)) {
              this._instance = new elementType(element.props, this._context, this._updater);
              if (typeof elementType.getDerivedStateFromProps === "function") {
                var partialState = elementType.getDerivedStateFromProps.call(null, element.props, this._instance.state);
                if (partialState != null) {
                  this._instance.state = _assign({}, this._instance.state, partialState);
                }
              }
              if (elementType.contextTypes) {
                currentlyValidatingElement = element;
                checkPropTypes(elementType.contextTypes, this._context, "context", getName(elementType, this._instance));
                currentlyValidatingElement = null;
              }
              this._mountClassComponent(elementType, element, this._context);
            } else {
              var shouldRender = true;
              if (reactIs.isMemo(element) && previousElement !== null) {
                var compare = element.type.compare || shallowEqual;
                if (compare(previousElement.props, element.props)) {
                  shouldRender = false;
                }
              }
              if (shouldRender) {
                var prevDispatcher = ReactCurrentDispatcher.current;
                ReactCurrentDispatcher.current = this._dispatcher;
                try {
                  if (elementType.$$typeof === reactIs.ForwardRef) {
                    if (!(typeof elementType.render === "function")) {
                      throw Error("forwardRef requires a render function but was given " + typeof elementType.render + ".");
                    }
                    this._rendered = elementType.render.call(void 0, element.props, element.ref);
                  } else {
                    this._rendered = elementType(element.props, this._context);
                  }
                } finally {
                  ReactCurrentDispatcher.current = prevDispatcher;
                }
                this._finishHooks(element, context);
              }
            }
          }
        } finally {
          if (process.env.NODE_ENV !== "production") {
            ReactDebugCurrentFrame.getCurrentStack = prevGetStack;
          }
        }
        this._rendering = false;
        this._updater._invokeCallbacks();
        return this.getRenderOutput();
      };
      _proto2.unmount = function unmount() {
        if (this._instance) {
          if (typeof this._instance.componentWillUnmount === "function") {
            this._instance.componentWillUnmount();
          }
        }
        this._reset();
      };
      _proto2._mountClassComponent = function _mountClassComponent(elementType, element, context) {
        this._instance.context = context;
        this._instance.props = element.props;
        this._instance.state = this._instance.state || null;
        this._instance.updater = this._updater;
        if (typeof this._instance.UNSAFE_componentWillMount === "function" || typeof this._instance.componentWillMount === "function") {
          var beforeState = this._newState;
          if (typeof elementType.getDerivedStateFromProps !== "function" && typeof this._instance.getSnapshotBeforeUpdate !== "function") {
            if (typeof this._instance.componentWillMount === "function") {
              this._instance.componentWillMount();
            }
            if (typeof this._instance.UNSAFE_componentWillMount === "function") {
              this._instance.UNSAFE_componentWillMount();
            }
          }
          if (beforeState !== this._newState) {
            this._instance.state = this._newState || emptyObject;
          }
        }
        this._rendered = this._instance.render();
      };
      _proto2._updateClassComponent = function _updateClassComponent(elementType, element, context) {
        var props = element.props;
        var oldState = this._instance.state || emptyObject;
        var oldProps = this._instance.props;
        if (oldProps !== props) {
          if (typeof elementType.getDerivedStateFromProps !== "function" && typeof this._instance.getSnapshotBeforeUpdate !== "function") {
            if (typeof this._instance.componentWillReceiveProps === "function") {
              this._instance.componentWillReceiveProps(props, context);
            }
            if (typeof this._instance.UNSAFE_componentWillReceiveProps === "function") {
              this._instance.UNSAFE_componentWillReceiveProps(props, context);
            }
          }
        }
        var state = this._newState || oldState;
        if (typeof elementType.getDerivedStateFromProps === "function") {
          var partialState = elementType.getDerivedStateFromProps.call(null, props, state);
          if (partialState != null) {
            state = _assign({}, state, partialState);
          }
        }
        var shouldUpdate = true;
        if (this._forcedUpdate) {
          shouldUpdate = true;
          this._forcedUpdate = false;
        } else if (typeof this._instance.shouldComponentUpdate === "function") {
          shouldUpdate = !!this._instance.shouldComponentUpdate(props, state, context);
        } else if (elementType.prototype && elementType.prototype.isPureReactComponent) {
          shouldUpdate = !shallowEqual(oldProps, props) || !shallowEqual(oldState, state);
        }
        if (shouldUpdate) {
          if (typeof elementType.getDerivedStateFromProps !== "function" && typeof this._instance.getSnapshotBeforeUpdate !== "function") {
            if (typeof this._instance.componentWillUpdate === "function") {
              this._instance.componentWillUpdate(props, state, context);
            }
            if (typeof this._instance.UNSAFE_componentWillUpdate === "function") {
              this._instance.UNSAFE_componentWillUpdate(props, state, context);
            }
          }
        }
        this._instance.context = context;
        this._instance.props = props;
        this._instance.state = state;
        this._newState = null;
        if (shouldUpdate) {
          this._rendered = this._instance.render();
        }
      };
      return ReactShallowRenderer2;
    }();
    ReactShallowRenderer.createRenderer = function() {
      return new ReactShallowRenderer();
    };
    var currentlyValidatingElement = null;
    function getDisplayName(element) {
      if (element == null) {
        return "#empty";
      } else if (typeof element === "string" || typeof element === "number") {
        return "#text";
      } else if (typeof element.type === "string") {
        return element.type;
      } else {
        var elementType = reactIs.isMemo(element) ? element.type.type : element.type;
        return elementType.displayName || elementType.name || "Unknown";
      }
    }
    function getStackAddendum() {
      var stack = "";
      if (currentlyValidatingElement) {
        var name = getDisplayName(currentlyValidatingElement);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
      }
      return stack;
    }
    function getName(type, instance) {
      var constructor = instance && instance.constructor;
      return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
    }
    function shouldConstruct(Component) {
      return !!(Component.prototype && Component.prototype.isReactComponent);
    }
    function getMaskedContext(contextTypes, unmaskedContext) {
      if (!contextTypes || !unmaskedContext) {
        return emptyObject;
      }
      var context = {};
      for (var key in contextTypes) {
        context[key] = unmaskedContext[key];
      }
      return context;
    }
    module2.exports = ReactShallowRenderer;
  }
});

// node_modules/react-shallow-renderer/index.js
var require_react_shallow_renderer2 = __commonJS({
  "node_modules/react-shallow-renderer/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = require_react_shallow_renderer();
  }
});

// node_modules/react-test-renderer/shallow.js
var require_shallow = __commonJS({
  "node_modules/react-test-renderer/shallow.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = require_react_shallow_renderer2();
  }
});

// node_modules/@testing-library/react-native/build/shallow.js
var require_shallow2 = __commonJS({
  "node_modules/@testing-library/react-native/build/shallow.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shallowInternal = shallowInternal;
    exports.default = shallow;
    var React3 = _interopRequireWildcard(require_react());
    var _shallow = _interopRequireDefault(require_shallow());
    var _errors = require_errors();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function shallowInternal(instance) {
      const renderer = new _shallow.default();
      renderer.render(/* @__PURE__ */ React3.createElement(instance.type, instance.props));
      return {
        output: renderer.getRenderOutput()
      };
    }
    function shallow(_) {
      (0, _errors.throwRemovedFunctionError)("shallow", "migration-v2#removed-global-shallow-function");
    }
  }
});

// node_modules/@testing-library/react-native/build/helpers/format.js
var require_format = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/format.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _prettyFormat = _interopRequireWildcard(require_build());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var format = (input) => (0, _prettyFormat.default)(input, {
      plugins: [_prettyFormat.plugins.ReactTestComponent, _prettyFormat.plugins.ReactElement],
      highlight: true
    });
    var _default = format;
    exports.default = _default;
  }
});

// node_modules/@testing-library/react-native/build/helpers/debugShallow.js
var require_debugShallow = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/debugShallow.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = debugShallow;
    var React3 = _interopRequireWildcard(require_react());
    var _shallow = require_shallow2();
    var _format = _interopRequireDefault(require_format());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function debugShallow(instance, message) {
      const {
        output
      } = (0, _shallow.shallowInternal)(instance);
      if (message) {
        console.log(`${message}

`, (0, _format.default)(output));
      } else {
        console.log((0, _format.default)(output));
      }
    }
  }
});

// node_modules/@testing-library/react-native/build/helpers/debugDeep.js
var require_debugDeep = __commonJS({
  "node_modules/@testing-library/react-native/build/helpers/debugDeep.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = debugDeep;
    var _format = _interopRequireDefault(require_format());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function debugDeep(instance, message) {
      if (message) {
        console.log(`${message}

`, (0, _format.default)(instance));
      } else {
        console.log((0, _format.default)(instance));
      }
    }
  }
});

// node_modules/@testing-library/react-native/build/render.js
var require_render = __commonJS({
  "node_modules/@testing-library/react-native/build/render.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = render2;
    var React3 = _interopRequireWildcard(require_react());
    var _reactTestRenderer = _interopRequireDefault(require_react_test_renderer());
    var _act = _interopRequireDefault(require_act());
    var _cleanup = require_cleanup();
    var _getByAPI = require_getByAPI();
    var _queryByAPI = require_queryByAPI();
    var _findByAPI = require_findByAPI();
    var _a11yAPI = require_a11yAPI();
    var _debugShallow = _interopRequireDefault(require_debugShallow());
    var _debugDeep = _interopRequireDefault(require_debugDeep());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function render2(component, {
      wrapper: Wrapper,
      createNodeMock
    } = {}) {
      const wrap = (innerElement) => Wrapper ? /* @__PURE__ */ React3.createElement(Wrapper, null, innerElement) : innerElement;
      const renderer = renderWithAct(wrap(component), createNodeMock ? {
        createNodeMock
      } : void 0);
      const update = updateWithAct(renderer, wrap);
      const instance = renderer.root;
      const unmount = () => {
        (0, _act.default)(() => {
          renderer.unmount();
        });
      };
      (0, _cleanup.addToCleanupQueue)(unmount);
      return __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, (0, _getByAPI.getByAPI)(instance)), (0, _queryByAPI.queryByAPI)(instance)), (0, _findByAPI.findByAPI)(instance)), (0, _a11yAPI.a11yAPI)(instance)), {
        update,
        unmount,
        container: instance,
        rerender: update,
        toJSON: renderer.toJSON,
        debug: debug(instance, renderer)
      });
    }
    function renderWithAct(component, options) {
      let renderer;
      (0, _act.default)(() => {
        renderer = _reactTestRenderer.default.create(component, options);
      });
      return renderer;
    }
    function updateWithAct(renderer, wrap) {
      return function(component) {
        (0, _act.default)(() => {
          renderer.update(wrap(component));
        });
      };
    }
    function debug(instance, renderer) {
      function debugImpl(message) {
        return (0, _debugDeep.default)(renderer.toJSON(), message);
      }
      debugImpl.shallow = (message) => (0, _debugShallow.default)(instance, message);
      return debugImpl;
    }
  }
});

// node_modules/@testing-library/react-native/build/waitForElementToBeRemoved.js
var require_waitForElementToBeRemoved = __commonJS({
  "node_modules/@testing-library/react-native/build/waitForElementToBeRemoved.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = waitForElementToBeRemoved;
    var _waitFor = _interopRequireDefault(require_waitFor());
    var _errors = require_errors();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isRemoved(result) {
      return !result || Array.isArray(result) && !result.length;
    }
    async function waitForElementToBeRemoved(expectation, options) {
      const timeoutError = new _errors.ErrorWithStack("Timed out in waitForElementToBeRemoved.", waitForElementToBeRemoved);
      const initialElements = expectation();
      if (isRemoved(initialElements)) {
        throw new _errors.ErrorWithStack("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.", waitForElementToBeRemoved);
      }
      return (0, _waitFor.default)(() => {
        let result;
        try {
          result = expectation();
        } catch (error) {
          return initialElements;
        }
        if (!isRemoved(result)) {
          throw timeoutError;
        }
        return initialElements;
      }, options);
    }
  }
});

// node_modules/@testing-library/react-native/build/within.js
var require_within = __commonJS({
  "node_modules/@testing-library/react-native/build/within.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.within = within;
    exports.getQueriesForElement = void 0;
    var _getByAPI = require_getByAPI();
    var _queryByAPI = require_queryByAPI();
    var _findByAPI = require_findByAPI();
    var _a11yAPI = require_a11yAPI();
    function within(instance) {
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, (0, _getByAPI.getByAPI)(instance)), (0, _queryByAPI.queryByAPI)(instance)), (0, _findByAPI.findByAPI)(instance)), (0, _a11yAPI.a11yAPI)(instance));
    }
    var getQueriesForElement = within;
    exports.getQueriesForElement = getQueriesForElement;
  }
});

// node_modules/@testing-library/react-native/build/pure.js
var require_pure = __commonJS({
  "node_modules/@testing-library/react-native/build/pure.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "act", {
      enumerable: true,
      get: function() {
        return _act.default;
      }
    });
    Object.defineProperty(exports, "cleanup", {
      enumerable: true,
      get: function() {
        return _cleanup.default;
      }
    });
    Object.defineProperty(exports, "fireEvent", {
      enumerable: true,
      get: function() {
        return _fireEvent.default;
      }
    });
    Object.defineProperty(exports, "flushMicrotasksQueue", {
      enumerable: true,
      get: function() {
        return _flushMicroTasks.default;
      }
    });
    Object.defineProperty(exports, "render", {
      enumerable: true,
      get: function() {
        return _render.default;
      }
    });
    Object.defineProperty(exports, "shallow", {
      enumerable: true,
      get: function() {
        return _shallow.default;
      }
    });
    Object.defineProperty(exports, "waitFor", {
      enumerable: true,
      get: function() {
        return _waitFor.default;
      }
    });
    Object.defineProperty(exports, "waitForElement", {
      enumerable: true,
      get: function() {
        return _waitFor.waitForElement;
      }
    });
    Object.defineProperty(exports, "waitForElementToBeRemoved", {
      enumerable: true,
      get: function() {
        return _waitForElementToBeRemoved.default;
      }
    });
    Object.defineProperty(exports, "within", {
      enumerable: true,
      get: function() {
        return _within.within;
      }
    });
    Object.defineProperty(exports, "getQueriesForElement", {
      enumerable: true,
      get: function() {
        return _within.getQueriesForElement;
      }
    });
    Object.defineProperty(exports, "getDefaultNormalizer", {
      enumerable: true,
      get: function() {
        return _matches.getDefaultNormalizer;
      }
    });
    var _act = _interopRequireDefault(require_act());
    var _cleanup = _interopRequireDefault(require_cleanup());
    var _fireEvent = _interopRequireDefault(require_fireEvent());
    var _flushMicroTasks = _interopRequireDefault(require_flushMicroTasks());
    var _render = _interopRequireDefault(require_render());
    var _shallow = _interopRequireDefault(require_shallow2());
    var _waitFor = _interopRequireWildcard(require_waitFor());
    var _waitForElementToBeRemoved = _interopRequireDefault(require_waitForElementToBeRemoved());
    var _within = require_within();
    var _matches = require_matches();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/@testing-library/react-native/build/index.js
var require_build2 = __commonJS({
  "node_modules/@testing-library/react-native/build/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _pure = require_pure();
    Object.keys(_pure).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _pure[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _pure[key];
        }
      });
    });
    var _flushMicroTasks = require_flushMicroTasks();
    if (typeof afterEach === "function" && !process.env.RNTL_SKIP_AUTO_CLEANUP) {
      afterEach(async () => {
        await (0, _flushMicroTasks.flushMicroTasks)();
        (0, _pure.cleanup)();
      });
    }
  }
});

// src/index.test.tsx
init_cjs_shims();
var import_react_native = __toESM(require_build2());
var import_react2 = __toESM(require_react());

// src/index.tsx
init_cjs_shims();
var import_react = __toESM(require_react());
var import_zustand = __toESM(require("zustand"));
var import_context = __toESM(require("zustand/context"));
var { Provider, useStore } = (0, import_context.default)();
var createStore = (entry) => () => (0, import_zustand.default)((set, get) => entry);
var withFlowContext = (Component, k = {}) => {
  return ({ navigation, route }) => {
    var _a;
    const entryData = __spreadValues(__spreadValues({}, k.entry), (route == null ? void 0 : route.params) || {});
    return /* @__PURE__ */ import_react.default.createElement(Provider, {
      createStore: createStore(entryData)
    }, /* @__PURE__ */ import_react.default.createElement(Component, {
      entry: entryData,
      actions: (_a = k.actions) == null ? void 0 : _a.call(k, { navigation })
    }));
  };
};

// src/index.test.tsx
describe("Screen", () => {
  const navigation = jest.fn();
  const Screen = jest.fn().mockImplementation((props) => /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null));
  it("Renders correctly", () => {
    (0, import_react_native.render)(withFlowContext(Screen, { entry: {}, actions: {} })({ navigation }));
  });
});
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v0.20.2
 * scheduler-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.20.2
 * scheduler-tracing.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.20.2
 * scheduler-unstable_mock.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.20.2
 * scheduler-unstable_mock.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.20.2
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-test-renderer.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-test-renderer.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
/** @license ReactShallowRenderer v16.14.1
 * react-shallow-renderer.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
