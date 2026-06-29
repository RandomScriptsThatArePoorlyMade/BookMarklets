javascript: var $jscomp = $jscomp || {}; //Fairly sure that all of this does absolutely nothing, but it looks like code
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;

$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 ||
  "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a;
      };

$jscomp.getGlobal = function (a) {
  a = [
    typeof globalThis == "object" && globalThis,
    a,
    typeof window == "object" && window,
    typeof self == "object" && self,
    typeof global == "object" && global,
  ];

  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c;
  }

  throw Error("Cannot find global object");
};

$jscomp.global = $jscomp.getGlobal(this);

$jscomp.IS_SYMBOL_NATIVE =
  typeof Symbol === "function" &&
  typeof Symbol("x") === "symbol";

$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;

$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";

var $jscomp$lookupPolyfilledValue = function (a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) return a[b];
  c = a[c];
  return void 0 !== c ? c : a[b];
};

$jscomp.polyfill = function (a, b, c, d) {
  b &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, b, c, d)
      : $jscomp.polyfillUnisolated(a, b, c, d));
};

$jscomp.polyfillUnisolated = function (a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in c)) return;
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  if (b != d && b != null)
    $jscomp.defineProperty(c, a, {
      configurable: !0,
      writable: !0,
      value: b,
    });
};

$jscomp.polyfillIsolated = function (a, b, c, d) {
  var e = a.split(".");
  a = e.length === 1;
  d = e[0];
  d =
    !a && d in $jscomp.polyfills
      ? $jscomp.polyfills
      : $jscomp.global;

  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in d)) return;
    d = d[g];
  }

  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);

  if (b != null) {
    if (a) {
      $jscomp.defineProperty($jscomp.polyfills, e, {
        configurable: !0,
        writable: !0,
        value: b,
      });
    } else if (b !== c) {
      if (void 0 === $jscomp.propertyToPolyfillSymbol[e]) {
        c = (1e9 * Math.random()) >>> 0;
        $jscomp.propertyToPolyfillSymbol[e] =
          $jscomp.IS_SYMBOL_NATIVE
            ? $jscomp.global.Symbol(e)
            : $jscomp.POLYFILL_PREFIX + c + "$" + e;
      }

      $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {
        configurable: !0,
        writable: !0,
        value: b,
      });
    }
  }
};

$jscomp.underscoreProtoCanBeSet = function () {
  var a = { a: !0 },
    b = {};
  try {
    b.__proto__ = a;
    return b.a;
  } catch (c) {}
  return !1;
};

$jscomp.setPrototypeOf =
  $jscomp.TRUST_ES6_POLYFILLS &&
  typeof Object.setPrototypeOf == "function"
    ? Object.setPrototypeOf
    : $jscomp.underscoreProtoCanBeSet()
    ? function (a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b)
          throw new TypeError(a + " is not extensible");
        return a;
      }
    : null;

$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length
      ? { done: !1, value: a[b++] }
      : { done: !0 };
  };
};

$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};

$jscomp.makeIterator = function (a) {
  var b =
    typeof Symbol !== "undefined" &&
    Symbol.iterator &&
    a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};



$jscomp.generator = {};

$jscomp.generator.ensureIteratorResultIsObject_ = function (a) {
  if (!(a instanceof Object))
    throw new TypeError("Iterator result is not an object");
};

$jscomp.generator.Context = function () {
  this.isRunning_ = !1;
  this.yieldAllIterator_ = null;
  this.yieldResult = void 0;
  this.nextAddress = 1;
  this.finallyAddress_ = (this.catchAddress_ = 0);
  this.finallyContexts_ = this.abruptCompletion_ = null;
};

$jscomp.generator.Context.prototype.start_ = function () {
  if (this.isRunning_)
    throw new TypeError("Generator is already running");
  this.isRunning_ = !0;
};

$jscomp.generator.Context.prototype.stop_ = function () {
  this.isRunning_ = !1;
};

$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function () {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};

$jscomp.generator.Context.prototype.next_ = function (a) {
  this.yieldResult = a;
};

$jscomp.generator.Context.prototype.throw_ = function (a) {
  this.abruptCompletion_ = {
    exception: a,
    isException: !0,
  };
  this.jumpToErrorHandler_();
};

$jscomp.generator.Context.prototype["return"] = function (a) {
  this.abruptCompletion_ = { return: a };
  this.nextAddress = this.finallyAddress_;
};

$jscomp.generator.Context.prototype.jumpToEnd = function () {
  this.nextAddress = 0;
};



(function () {
  var script = document.createElement("script");
  script.src =
    "//cdn.jsdelivr.net/gh/RandomScriptsThatArePoorlyMade/BookMarklets@Scripts/Music Player V2.js";
  script.crossOrigin = "anonymous";
  document.body.appendChild(script);
})();

function spin() {
  var v = prompt("Intensity");
  v = (v && v.trim() !== '') ? parseFloat(v) : 3;

  var z = prompt("Intensity 2? Will be negative");
  z = (z && z.trim() !== '') ? parseFloat(z) : 1;

  ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function (prefix) {
    Array.prototype.slice.call(
      document.querySelectorAll('div,p,span,img,a,body')
    ).map(function (el) {
      el.style[prefix + 'transform'] =
        'rotate(' +
        (Math.floor(Math.random() * v) - z) +
        'deg)';
    });
  });
}; 
var n = prompt("Speed (in milliseconds)");
 n = (n && n.trim() !== '') ? parseFloat(n) : 100;
if (n =< 0) 
{
n = 100;
}
const intervalId = setInterval(spin, n);
