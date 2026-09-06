var z3 = Object.defineProperty;
var q3 = (e, t, n) => t in e ? z3(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var rr = (e, t, n) => q3(e, typeof t != "symbol" ? t + "" : t, n);
/*! Adapted from eduser25/netwrth-hacs.
MIT License

Copyright (c) 2026 Eduard Serra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var $s = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ev = { exports: {} }, ru = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kO;
function k3() {
  if (kO) return ru;
  kO = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(r, o, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), o.key !== void 0 && (c = "" + o.key), "key" in o) {
      u = {};
      for (var f in o)
        f !== "key" && (u[f] = o[f]);
    } else u = o;
    return o = u.ref, {
      $$typeof: e,
      type: r,
      key: c,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return ru.Fragment = t, ru.jsx = n, ru.jsxs = n, ru;
}
var BO;
function B3() {
  return BO || (BO = 1, ev.exports = k3()), ev.exports;
}
var R = B3(), tv = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var LO;
function L3() {
  if (LO) return Ae;
  LO = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), g = Symbol.iterator;
  function b(P) {
    return P === null || typeof P != "object" ? null : (P = g && P[g] || P["@@iterator"], typeof P == "function" ? P : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, S = Object.assign, x = {};
  function A(P, I, re) {
    this.props = P, this.context = I, this.refs = x, this.updater = re || _;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(P, I) {
    if (typeof P != "object" && typeof P != "function" && P != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, P, I, "setState");
  }, A.prototype.forceUpdate = function(P) {
    this.updater.enqueueForceUpdate(this, P, "forceUpdate");
  };
  function E() {
  }
  E.prototype = A.prototype;
  function M(P, I, re) {
    this.props = P, this.context = I, this.refs = x, this.updater = re || _;
  }
  var C = M.prototype = new E();
  C.constructor = M, S(C, A.prototype), C.isPureReactComponent = !0;
  var w = Array.isArray;
  function T() {
  }
  var j = { H: null, A: null, T: null, S: null }, N = Object.prototype.hasOwnProperty;
  function z(P, I, re) {
    var se = re.ref;
    return {
      $$typeof: e,
      type: P,
      key: I,
      ref: se !== void 0 ? se : null,
      props: re
    };
  }
  function k(P, I) {
    return z(P.type, I, P.props);
  }
  function B(P) {
    return typeof P == "object" && P !== null && P.$$typeof === e;
  }
  function q(P) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + P.replace(/[=:]/g, function(re) {
      return I[re];
    });
  }
  var V = /\/+/g;
  function Y(P, I) {
    return typeof P == "object" && P !== null && P.key != null ? q("" + P.key) : I.toString(36);
  }
  function F(P) {
    switch (P.status) {
      case "fulfilled":
        return P.value;
      case "rejected":
        throw P.reason;
      default:
        switch (typeof P.status == "string" ? P.then(T, T) : (P.status = "pending", P.then(
          function(I) {
            P.status === "pending" && (P.status = "fulfilled", P.value = I);
          },
          function(I) {
            P.status === "pending" && (P.status = "rejected", P.reason = I);
          }
        )), P.status) {
          case "fulfilled":
            return P.value;
          case "rejected":
            throw P.reason;
        }
    }
    throw P;
  }
  function $(P, I, re, se, pe) {
    var fe = typeof P;
    (fe === "undefined" || fe === "boolean") && (P = null);
    var _e = !1;
    if (P === null) _e = !0;
    else
      switch (fe) {
        case "bigint":
        case "string":
        case "number":
          _e = !0;
          break;
        case "object":
          switch (P.$$typeof) {
            case e:
            case t:
              _e = !0;
              break;
            case y:
              return _e = P._init, $(
                _e(P._payload),
                I,
                re,
                se,
                pe
              );
          }
      }
    if (_e)
      return pe = pe(P), _e = se === "" ? "." + Y(P, 0) : se, w(pe) ? (re = "", _e != null && (re = _e.replace(V, "$&/") + "/"), $(pe, I, re, "", function(ge) {
        return ge;
      })) : pe != null && (B(pe) && (pe = k(
        pe,
        re + (pe.key == null || P && P.key === pe.key ? "" : ("" + pe.key).replace(
          V,
          "$&/"
        ) + "/") + _e
      )), I.push(pe)), 1;
    _e = 0;
    var Ce = se === "" ? "." : se + ":";
    if (w(P))
      for (var ce = 0; ce < P.length; ce++)
        se = P[ce], fe = Ce + Y(se, ce), _e += $(
          se,
          I,
          re,
          fe,
          pe
        );
    else if (ce = b(P), typeof ce == "function")
      for (P = ce.call(P), ce = 0; !(se = P.next()).done; )
        se = se.value, fe = Ce + Y(se, ce++), _e += $(
          se,
          I,
          re,
          fe,
          pe
        );
    else if (fe === "object") {
      if (typeof P.then == "function")
        return $(
          F(P),
          I,
          re,
          se,
          pe
        );
      throw I = String(P), Error(
        "Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(P).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return _e;
  }
  function K(P, I, re) {
    if (P == null) return P;
    var se = [], pe = 0;
    return $(P, se, "", "", function(fe) {
      return I.call(re, fe, pe++);
    }), se;
  }
  function ne(P) {
    if (P._status === -1) {
      var I = P._result;
      I = I(), I.then(
        function(re) {
          (P._status === 0 || P._status === -1) && (P._status = 1, P._result = re);
        },
        function(re) {
          (P._status === 0 || P._status === -1) && (P._status = 2, P._result = re);
        }
      ), P._status === -1 && (P._status = 0, P._result = I);
    }
    if (P._status === 1) return P._result.default;
    throw P._result;
  }
  var G = typeof reportError == "function" ? reportError : function(P) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var I = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof P == "object" && P !== null && typeof P.message == "string" ? String(P.message) : String(P),
        error: P
      });
      if (!window.dispatchEvent(I)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", P);
      return;
    }
    console.error(P);
  }, ee = {
    map: K,
    forEach: function(P, I, re) {
      K(
        P,
        function() {
          I.apply(this, arguments);
        },
        re
      );
    },
    count: function(P) {
      var I = 0;
      return K(P, function() {
        I++;
      }), I;
    },
    toArray: function(P) {
      return K(P, function(I) {
        return I;
      }) || [];
    },
    only: function(P) {
      if (!B(P))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return P;
    }
  };
  return Ae.Activity = v, Ae.Children = ee, Ae.Component = A, Ae.Fragment = n, Ae.Profiler = o, Ae.PureComponent = M, Ae.StrictMode = r, Ae.Suspense = d, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j, Ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(P) {
      return j.H.useMemoCache(P);
    }
  }, Ae.cache = function(P) {
    return function() {
      return P.apply(null, arguments);
    };
  }, Ae.cacheSignal = function() {
    return null;
  }, Ae.cloneElement = function(P, I, re) {
    if (P == null)
      throw Error(
        "The argument must be a React element, but you passed " + P + "."
      );
    var se = S({}, P.props), pe = P.key;
    if (I != null)
      for (fe in I.key !== void 0 && (pe = "" + I.key), I)
        !N.call(I, fe) || fe === "key" || fe === "__self" || fe === "__source" || fe === "ref" && I.ref === void 0 || (se[fe] = I[fe]);
    var fe = arguments.length - 2;
    if (fe === 1) se.children = re;
    else if (1 < fe) {
      for (var _e = Array(fe), Ce = 0; Ce < fe; Ce++)
        _e[Ce] = arguments[Ce + 2];
      se.children = _e;
    }
    return z(P.type, pe, se);
  }, Ae.createContext = function(P) {
    return P = {
      $$typeof: c,
      _currentValue: P,
      _currentValue2: P,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, P.Provider = P, P.Consumer = {
      $$typeof: u,
      _context: P
    }, P;
  }, Ae.createElement = function(P, I, re) {
    var se, pe = {}, fe = null;
    if (I != null)
      for (se in I.key !== void 0 && (fe = "" + I.key), I)
        N.call(I, se) && se !== "key" && se !== "__self" && se !== "__source" && (pe[se] = I[se]);
    var _e = arguments.length - 2;
    if (_e === 1) pe.children = re;
    else if (1 < _e) {
      for (var Ce = Array(_e), ce = 0; ce < _e; ce++)
        Ce[ce] = arguments[ce + 2];
      pe.children = Ce;
    }
    if (P && P.defaultProps)
      for (se in _e = P.defaultProps, _e)
        pe[se] === void 0 && (pe[se] = _e[se]);
    return z(P, fe, pe);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(P) {
    return { $$typeof: f, render: P };
  }, Ae.isValidElement = B, Ae.lazy = function(P) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: P },
      _init: ne
    };
  }, Ae.memo = function(P, I) {
    return {
      $$typeof: h,
      type: P,
      compare: I === void 0 ? null : I
    };
  }, Ae.startTransition = function(P) {
    var I = j.T, re = {};
    j.T = re;
    try {
      var se = P(), pe = j.S;
      pe !== null && pe(re, se), typeof se == "object" && se !== null && typeof se.then == "function" && se.then(T, G);
    } catch (fe) {
      G(fe);
    } finally {
      I !== null && re.types !== null && (I.types = re.types), j.T = I;
    }
  }, Ae.unstable_useCacheRefresh = function() {
    return j.H.useCacheRefresh();
  }, Ae.use = function(P) {
    return j.H.use(P);
  }, Ae.useActionState = function(P, I, re) {
    return j.H.useActionState(P, I, re);
  }, Ae.useCallback = function(P, I) {
    return j.H.useCallback(P, I);
  }, Ae.useContext = function(P) {
    return j.H.useContext(P);
  }, Ae.useDebugValue = function() {
  }, Ae.useDeferredValue = function(P, I) {
    return j.H.useDeferredValue(P, I);
  }, Ae.useEffect = function(P, I) {
    return j.H.useEffect(P, I);
  }, Ae.useEffectEvent = function(P) {
    return j.H.useEffectEvent(P);
  }, Ae.useId = function() {
    return j.H.useId();
  }, Ae.useImperativeHandle = function(P, I, re) {
    return j.H.useImperativeHandle(P, I, re);
  }, Ae.useInsertionEffect = function(P, I) {
    return j.H.useInsertionEffect(P, I);
  }, Ae.useLayoutEffect = function(P, I) {
    return j.H.useLayoutEffect(P, I);
  }, Ae.useMemo = function(P, I) {
    return j.H.useMemo(P, I);
  }, Ae.useOptimistic = function(P, I) {
    return j.H.useOptimistic(P, I);
  }, Ae.useReducer = function(P, I, re) {
    return j.H.useReducer(P, I, re);
  }, Ae.useRef = function(P) {
    return j.H.useRef(P);
  }, Ae.useState = function(P) {
    return j.H.useState(P);
  }, Ae.useSyncExternalStore = function(P, I, re) {
    return j.H.useSyncExternalStore(
      P,
      I,
      re
    );
  }, Ae.useTransition = function() {
    return j.H.useTransition();
  }, Ae.version = "19.2.8", Ae;
}
var UO;
function P0() {
  return UO || (UO = 1, tv.exports = L3()), tv.exports;
}
var J = P0();
const U = /* @__PURE__ */ tt(J), bo = (e, t) => {
  const n = Math.sin(e * 127.1 + t * 311.7) * 43758.5453;
  return n - Math.floor(n);
}, U3 = (e, t, n, r, o) => {
  e.clearRect(0, 0, t, n);
  const u = Math.min(60, Math.max(14, Math.round(t * n / 16e3))), c = Math.max(90, Math.min(t, n) * 0.34), f = [];
  for (let d = 0; d < u; d++) {
    const h = (bo(d, 3.1) - 0.5) * 0.016, y = (bo(d, 9.2) - 0.5) * 0.016;
    let v = (bo(d, 1.3) + h * r) % 1, g = (bo(d, 7.7) + y * r) % 1;
    v < 0 && (v += 1), g < 0 && (g += 1), f.push([v * t, g * n, 1.1 + bo(d, 5.5) * 1.4]);
  }
  e.lineWidth = 0.8;
  for (let d = 0; d < f.length; d++)
    for (let h = d + 1; h < f.length; h++) {
      const y = f[d][0] - f[h][0], v = f[d][1] - f[h][1], g = Math.hypot(y, v);
      g < c && (e.strokeStyle = o((1 - g / c) * 0.2), e.beginPath(), e.moveTo(f[d][0], f[d][1]), e.lineTo(f[h][0], f[h][1]), e.stroke());
    }
  for (const [d, h, y] of f)
    e.fillStyle = o(0.4), e.beginPath(), e.arc(d, h, y, 0, 7), e.fill();
}, I3 = (e, t, n, r, o) => {
  e.clearRect(0, 0, t, n);
  const u = Math.max(4, Math.round(t / 110)), c = Math.max(3, Math.round(n / 110)), f = [];
  for (let h = 0; h <= c; h++)
    for (let y = 0; y <= u; y++) {
      const v = bo(y * 31 + h, 4.2) * 6.28;
      f.push([
        y / u * t + Math.sin(r * 0.35 + v) * 12,
        h / c * n + Math.cos(r * 0.28 + v * 1.7) * 10
      ]);
    }
  const d = (h, y) => f[y * (u + 1) + h];
  e.lineWidth = 0.7, e.strokeStyle = o(0.07);
  for (let h = 0; h < c; h++)
    for (let y = 0; y < u; y++) {
      const v = d(y, h), g = d(y + 1, h), b = d(y, h + 1), _ = d(y + 1, h + 1);
      e.beginPath(), e.moveTo(v[0], v[1]), e.lineTo(g[0], g[1]), e.lineTo(b[0], b[1]), e.closePath(), e.moveTo(g[0], g[1]), e.lineTo(_[0], _[1]), e.lineTo(b[0], b[1]), e.stroke();
    }
  e.fillStyle = o(0.22);
  for (const [h, y] of f)
    e.beginPath(), e.arc(h, y, 1.4, 0, 7), e.fill();
}, H3 = (e, t, n, r, o) => {
  e.clearRect(0, 0, t, n);
  const u = Math.max(5, Math.round(n / 70)), c = n / (u + 1);
  e.lineWidth = 1;
  for (let f = 0; f <= u + 1; f++) {
    e.strokeStyle = o(f % 3 === 0 ? 0.14 : 0.08), e.beginPath();
    for (let d = 0; d <= t; d += 6) {
      const h = f * c + 14 * Math.sin(d * 0.012 + r * 0.22 + f * 1.3) + 8 * Math.sin(d * 0.025 - r * 0.15 + f * 2.1);
      d === 0 ? e.moveTo(d, h) : e.lineTo(d, h);
    }
    e.stroke();
  }
}, G3 = (e, t, n, r, o) => {
  e.clearRect(0, 0, t, n);
  const u = 22;
  for (let c = u / 2; c < n; c += u)
    for (let f = u / 2; f < t; f += u) {
      const d = 0.07 + 0.16 * (0.5 + 0.5 * Math.sin(r * 0.7 + (f + c) * 0.014));
      e.fillStyle = o(d), e.beginPath(), e.arc(f, c, 1.5, 0, 7), e.fill();
    }
}, Y3 = { plexus: U3, mesh: I3, contour: H3, dots: G3 };
function K3(e) {
  const t = getComputedStyle(e).color.match(/(\d+(?:\.\d+)?)/g);
  return t && t.length >= 3 ? [Number(t[0]), Number(t[1]), Number(t[2])] : [96, 165, 250];
}
const X3 = 1e3 / 30;
function el({ effect: e }) {
  const t = J.useRef(null);
  return J.useEffect(() => {
    const n = t.current;
    if (!n || e === "off") return;
    const r = n.parentElement, o = n.getContext("2d");
    if (!r || !o) return;
    const u = Y3[e], [c, f, d] = K3(n), h = (T) => `rgba(${c},${f},${d},${T})`, y = window.matchMedia("(prefers-reduced-motion: reduce)").matches, v = Math.min(window.devicePixelRatio || 1, 2);
    let g = 0, b = 0, _ = 0, S = !0, x = 0;
    const A = (T) => {
      _ = 0, !(!S || g === 0) && (T - x >= X3 && (x = T, u(o, g, b, T / 1e3, h)), y || (_ = requestAnimationFrame(A)));
    }, E = () => {
      _ || (_ = requestAnimationFrame(A));
    }, M = () => {
      const T = r.getBoundingClientRect();
      g = Math.round(T.width), b = Math.round(T.height), n.width = g * v, n.height = b * v, o.setTransform(v, 0, 0, v, 0, 0), x = 0, E();
    }, C = new ResizeObserver(M);
    C.observe(r);
    const w = new IntersectionObserver((T) => {
      S = T.some((j) => j.isIntersecting), S && E();
    });
    return w.observe(r), M(), () => {
      C.disconnect(), w.disconnect(), _ && cancelAnimationFrame(_);
    };
  }, [e]), e === "off" ? null : /* @__PURE__ */ R.jsx("div", { className: "ambient", "aria-hidden": !0, children: /* @__PURE__ */ R.jsx("canvas", { ref: t }) });
}
const IM = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}), V3 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
}), N0 = "•••••";
function or(e, t = !1) {
  return (t ? V3 : IM).format(e);
}
const F3 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1
});
function HM(e) {
  return F3.format(e);
}
function lb(e) {
  return `${e >= 0 ? "+" : ""}${IM.format(e)}`;
}
function Tu(e) {
  return isFinite(e) ? `${e >= 0 ? "+" : ""}${(e * 100).toFixed(1)}%` : "–";
}
const W3 = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric"
});
function IO(e) {
  return W3.format(e);
}
function Z3(e, t = !1, n = !1) {
  return new Date(e).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    ...n ? { year: "numeric" } : {},
    ...t ? { hour: "numeric", minute: "2-digit" } : {}
  });
}
const R0 = ["1d", "1w", "1m", "3m", "6m", "1y", "all"], Eo = [
  {
    key: "daily",
    label: "Day-to-day",
    flow: !0,
    pick: (e) => e.kind === "cash" || e.kind === "credit",
    modes: ["flow", "total", "stacked"],
    defaultMode: "flow"
  },
  {
    key: "invest",
    label: "Investments",
    flow: !1,
    pick: (e) => e.kind === "investment",
    modes: ["total", "stacked", "category"],
    defaultMode: "total"
  },
  {
    key: "all",
    label: "Everything",
    flow: !1,
    pick: () => !0,
    modes: ["total", "stacked", "category"],
    defaultMode: "total"
  }
];
var nv = { exports: {} }, Ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var HO;
function Q3() {
  if (HO) return Ut;
  HO = 1;
  var e = P0();
  function t(d) {
    var h = "https://react.dev/errors/" + d;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        h += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + d + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function n() {
  }
  var r = {
    d: {
      f: n,
      r: function() {
        throw Error(t(522));
      },
      D: n,
      C: n,
      L: n,
      m: n,
      X: n,
      S: n,
      M: n
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function u(d, h, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: d,
      containerInfo: h,
      implementation: y
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(d, h) {
    if (d === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Ut.createPortal = function(d, h) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(t(299));
    return u(d, h, null, y);
  }, Ut.flushSync = function(d) {
    var h = c.T, y = r.p;
    try {
      if (c.T = null, r.p = 2, d) return d();
    } finally {
      c.T = h, r.p = y, r.d.f();
    }
  }, Ut.preconnect = function(d, h) {
    typeof d == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, r.d.C(d, h));
  }, Ut.prefetchDNS = function(d) {
    typeof d == "string" && r.d.D(d);
  }, Ut.preinit = function(d, h) {
    if (typeof d == "string" && h && typeof h.as == "string") {
      var y = h.as, v = f(y, h.crossOrigin), g = typeof h.integrity == "string" ? h.integrity : void 0, b = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      y === "style" ? r.d.S(
        d,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: v,
          integrity: g,
          fetchPriority: b
        }
      ) : y === "script" && r.d.X(d, {
        crossOrigin: v,
        integrity: g,
        fetchPriority: b,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Ut.preinitModule = function(d, h) {
    if (typeof d == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var y = f(
            h.as,
            h.crossOrigin
          );
          r.d.M(d, {
            crossOrigin: y,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && r.d.M(d);
  }, Ut.preload = function(d, h) {
    if (typeof d == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var y = h.as, v = f(y, h.crossOrigin);
      r.d.L(d, y, {
        crossOrigin: v,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, Ut.preloadModule = function(d, h) {
    if (typeof d == "string")
      if (h) {
        var y = f(h.as, h.crossOrigin);
        r.d.m(d, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: y,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else r.d.m(d);
  }, Ut.requestFormReset = function(d) {
    r.d.r(d);
  }, Ut.unstable_batchedUpdates = function(d, h) {
    return d(h);
  }, Ut.useFormState = function(d, h, y) {
    return c.H.useFormState(d, h, y);
  }, Ut.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Ut.version = "19.2.8", Ut;
}
var GO;
function GM() {
  if (GO) return nv.exports;
  GO = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), nv.exports = Q3(), nv.exports;
}
var J3 = GM();
function e$(e, t) {
  return e.connection.sendMessagePromise({
    type: "family_finance/overview",
    ...t ? { entry_id: t } : {}
  });
}
function YM(e, t, n, r) {
  return e.connection.sendMessagePromise({
    type: "family_finance/series",
    range: n,
    ...r ? { month: r } : {},
    ...t ? { entry_id: t } : {}
  });
}
function t$(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_summary",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function KM(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_recurring",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function XM(e, t, n, r) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_transactions",
    ...n ? { month: n } : {},
    ...r ? { theme: r } : {},
    ...t ? { entry_id: t } : {}
  });
}
function n$(e) {
  return e.connection.sendMessagePromise({ type: "family_finance/entries" });
}
const VM = J.createContext(null);
function r$({ children: e }) {
  const t = J.useContext(VM);
  return J.useEffect(() => {
    if (!t) return;
    const n = t, r = Number(t.dataset.open ?? 0) + 1;
    if (t.dataset.open = String(r), r === 1 && n.showPopover)
      try {
        n.showPopover();
      } catch {
      }
    return () => {
      const o = Number(t.dataset.open ?? 1) - 1;
      if (t.dataset.open = String(Math.max(0, o)), o <= 0 && n.hidePopover)
        try {
          n.hidePopover();
        } catch {
        }
    };
  }, [t]), t ? J3.createPortal(e, t) : /* @__PURE__ */ R.jsx(R.Fragment, { children: e });
}
function tl(e) {
  return e.background ? e.background : e.theme === "ha" ? "off" : "plexus";
}
const a$ = 6e4;
function FM() {
  const e = J.useRef(null), [t, n] = J.useState(820);
  return J.useEffect(() => {
    if (!e.current) return;
    const r = new ResizeObserver(([o]) => {
      o.contentRect.width > 0 && n(Math.max(280, o.contentRect.width));
    });
    return r.observe(e.current), () => r.disconnect();
  }, []), { ref: e, width: t };
}
function nd(e, t, n) {
  var g;
  const [r, o] = J.useState(null), [u, c] = J.useState(null), [f, d] = J.useState(null), [h, y] = J.useState(0), v = J.useCallback(() => y((b) => b + 1), []);
  return J.useEffect(() => {
    let b = !0;
    Promise.all([e$(e, t), n(e, t)]).then(([x, A]) => {
      if (b) {
        if (x.currency !== "INR") throw new Error("Finance requires INR data");
        o(x), c(A.data), d(null);
      }
    }).catch((x) => {
      b && (c(null), o(null), d((x == null ? void 0 : x.message) ?? "Unable to load finance data"));
    });
    const _ = setInterval(v, a$), S = () => {
      document.visibilityState === "visible" && v();
    };
    return document.addEventListener("visibilitychange", S), () => {
      b = !1, clearInterval(_), document.removeEventListener("visibilitychange", S);
    };
  }, [e.connection, (g = e.user) == null ? void 0 : g.id, t, n, h, v]), { overview: r, data: u, masked: !1, error: f, refresh: v };
}
function $0(e, t, n) {
  const r = J.useCallback(
    (h, y) => YM(h, y, n).then((v) => ({ data: v.series, censored: v.censored })),
    [n]
  ), { overview: o, data: u, masked: c, error: f, refresh: d } = nd(
    e,
    t,
    r
  );
  return { overview: o, series: u, masked: c, error: f, refresh: d };
}
function ef({
  options: e,
  value: t,
  onChange: n
}) {
  return /* @__PURE__ */ R.jsx("span", { className: "seg", children: e.map((r) => /* @__PURE__ */ R.jsx("button", { className: r === t ? "active" : "", onClick: () => n(r), children: r }, r)) });
}
function WM(e) {
  return J.useMemo(
    () => e ? e.accounts.filter((t) => !t.hidden) : [],
    [e]
  );
}
const i$ = ["cash", "investment", "credit", "loan", "other"], YO = [
  ["#3b82f6", "#2563eb"],
  ["#10b981", "#059669"],
  ["#8b5cf6", "#6366f1"],
  ["#f59e0b", "#d97706"],
  ["#ec4899", "#db2777"],
  ["#06b6d4", "#0891b2"]
];
function o$(e) {
  const t = e.org_name || e.org_domain || e.provider || "?";
  let n = 0;
  for (let u = 0; u < t.length; u++) n = n * 31 + t.charCodeAt(u) | 0;
  const [r, o] = YO[Math.abs(n) % YO.length];
  return { letter: t.trim().charAt(0).toUpperCase() || "?", g1: r, g2: o };
}
function l$(e, t) {
  if (e.balance == null) return "–";
  const n = parseFloat(e.balance);
  return t ? `${n.toFixed(1)}%` : or(n, !0);
}
function u$({
  hass: e,
  config: t
}) {
  const n = Eo.find((_) => _.key === (t.view ?? "all")) ?? Eo[2], [r, o] = J.useState(t.range ?? "1m"), { overview: u, series: c, masked: f, error: d } = $0(e, t.entry, r), h = (u == null ? void 0 : u.accounts) ?? [], y = t.accounts, v = J.useMemo(() => {
    let _ = h.filter(n.pick);
    if (y && y.length > 0) {
      const S = y.map((x) => x.trim().toLowerCase()).filter(Boolean);
      _ = _.filter(
        (x) => S.some(
          (A) => (x.nickname ?? "").toLowerCase().includes(A) || x.name.toLowerCase().includes(A)
        )
      );
    }
    return _;
  }, [h, n, y]), g = J.useMemo(() => {
    const _ = /* @__PURE__ */ new Map();
    if (!c) return _;
    for (const S of c) {
      if (S.points.length < 2) continue;
      const x = [...S.points].sort(
        (M, C) => new Date(M.ts).getTime() - new Date(C.ts).getTime()
      ), A = parseFloat(x[0].balance), E = parseFloat(x[x.length - 1].balance);
      A !== 0 && _.set(S.account_id, (E - A) / Math.abs(A));
    }
    return _;
  }, [c]), b = J.useMemo(
    () => i$.map((_) => ({
      kind: _,
      accounts: v.filter((S) => S.kind === _)
    })).filter((_) => _.accounts.length > 0),
    [v]
  );
  return /* @__PURE__ */ R.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ R.jsx(el, { effect: tl(t) }),
    /* @__PURE__ */ R.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ R.jsx("h2", { children: t.title ?? "Accounts" }),
      /* @__PURE__ */ R.jsx("span", { className: "head-right", children: t.show_controls !== !1 && t.show_range_selector !== !1 && /* @__PURE__ */ R.jsx("span", { className: "controls", children: /* @__PURE__ */ R.jsx(ef, { options: R0, value: r, onChange: o }) }) })
    ] }),
    d && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: d }),
    !d && !u && /* @__PURE__ */ R.jsx("div", { className: "status", children: "Loading…" }),
    !d && u && b.length === 0 && /* @__PURE__ */ R.jsx("div", { className: "status", children: "No accounts." }),
    !d && u && b.length > 0 && /* @__PURE__ */ R.jsx("table", { children: /* @__PURE__ */ R.jsx("tbody", { children: b.map((_) => /* @__PURE__ */ R.jsx(
      c$,
      {
        kind: _.kind,
        accounts: _.accounts,
        masked: f,
        deltas: g
      },
      _.kind
    )) }) })
  ] });
}
function c$({
  kind: e,
  accounts: t,
  masked: n,
  deltas: r
}) {
  return /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    /* @__PURE__ */ R.jsx("tr", { className: "kind-row", children: /* @__PURE__ */ R.jsx("td", { colSpan: 3, children: e }) }),
    t.map((o) => {
      const u = r.get(o.id), c = o$(o);
      return /* @__PURE__ */ R.jsxs("tr", { children: [
        /* @__PURE__ */ R.jsxs("td", { className: "name-cell", children: [
          /* @__PURE__ */ R.jsx(
            "span",
            {
              className: "mono",
              style: { "--mono-a": c.g1, "--mono-b": c.g2 },
              children: c.letter
            }
          ),
          /* @__PURE__ */ R.jsxs("span", { className: "name-text", children: [
            /* @__PURE__ */ R.jsx("span", { children: o.nickname || o.name }),
            /* @__PURE__ */ R.jsx("span", { className: "muted", children: o.org_name || o.org_domain })
          ] })
        ] }),
        /* @__PURE__ */ R.jsx("td", { className: "num", children: l$(o, n) }),
        /* @__PURE__ */ R.jsx("td", { className: `num row-delta ${u == null ? "muted" : u >= 0 ? "up" : "down"}`, children: u == null ? "–" : Tu(u) })
      ] }, o.id);
    })
  ] });
}
const s$ = {
  dining: "#fb923c",
  shopping: "#60a5fa",
  groceries: "#34d399",
  subscriptions: "#a78bfa",
  utilities: "#22d3ee",
  housing: "#f472b6",
  transport: "#fbbf24",
  travel: "#93c5fd",
  health: "#4ade80",
  leisure: "#e879f9",
  fees: "#fca5a5",
  payments: "#fb7185",
  other: "#8b9bb4"
}, Eu = (e) => s$[e.toLowerCase()] ?? ["#60a5fa", "#34d399", "#a78bfa", "#f472b6", "#fbbf24", "#22d3ee"][Array.from(e).reduce((t, n) => t * 31 + n.charCodeAt(0) >>> 0, 0) % 6], f$ = {
  weekly: 52 / 12,
  biweekly: 26 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  annual: 1 / 12
};
function Ht(e, t) {
  return t ? N0 : or(e, Math.abs(e) < 100);
}
function ju() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit" }).format(/* @__PURE__ */ new Date()).slice(0, 7);
}
function KO(e, t) {
  const [n, r] = e.split("-").map(Number);
  return new Date(Date.UTC(n, r - 1 + t, 1)).toISOString().slice(0, 7);
}
function d$(e) {
  const [t, n] = e.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}
function z0({
  month: e,
  onChange: t
}) {
  return /* @__PURE__ */ R.jsxs("span", { className: "seg", children: [
    /* @__PURE__ */ R.jsx("button", { "aria-label": "Previous month", onClick: () => t(KO(e, -1)), children: "‹" }),
    /* @__PURE__ */ R.jsx("button", { className: "active spend-month-label", children: d$(e) }),
    /* @__PURE__ */ R.jsx("button", { "aria-label": "Next month", onClick: () => t(KO(e, 1)), disabled: e >= ju(), children: "›" })
  ] });
}
const ar = 310, qt = { top: 88, right: 16, bottom: 28, left: 16 }, XO = 24, Rr = 26, rv = /* @__PURE__ */ new Set(["weekly", "biweekly", "monthly", "quarterly", "annual"]), VO = {
  actual: "charged",
  expected: "expected around this day",
  overdue: "expected but not seen yet"
};
function au(e) {
  return new Date(e).getUTCDate();
}
function h$({
  hass: e,
  config: t
}) {
  const { ref: n, width: r } = FM(), [o, u] = J.useState(ju()), [c, f] = J.useState(null), [d, h] = J.useState(/* @__PURE__ */ new Set()), y = J.useCallback(
    (G, ee) => KM(G, ee, o).then((P) => ({ data: P, censored: P.censored })),
    [o]
  ), { data: v, masked: g, error: b } = nd(
    e,
    t.entry,
    y
  ), _ = (v == null ? void 0 : v.streams) ?? [], S = (v == null ? void 0 : v.expected) ?? [], x = (v == null ? void 0 : v.actuals) ?? [], A = (v == null ? void 0 : v.today) ?? "", E = g, M = J.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const ee of _) G.set(`${ee.merchant_key}|${ee.is_income}`, ee);
    return G;
  }, [_]), C = J.useMemo(() => {
    var ee;
    const G = [];
    for (const P of x) {
      const I = M.get(`${P.merchant_key}|false`);
      P.is_income || !I || !rv.has(I.frequency) || G.push({
        id: `a-${P.merchant_key}-${P.date}`,
        merchantKey: P.merchant_key,
        name: I.merchant ?? P.merchant_key,
        logo: I.logo_url,
        day: au(P.date),
        amount: parseFloat(P.amount),
        state: "actual",
        frequency: I.frequency,
        theme: I.theme
      });
    }
    for (const P of S)
      P.is_income || !rv.has(P.frequency) || G.push({
        id: `e-${P.merchant_key}-${P.date}`,
        merchantKey: P.merchant_key,
        name: P.merchant || P.merchant_key,
        logo: P.logo_url ?? null,
        day: au(P.date),
        amount: P.amount,
        state: P.overdue ? "overdue" : "expected",
        frequency: P.frequency,
        theme: ((ee = M.get(`${P.merchant_key}|false`)) == null ? void 0 : ee.theme) ?? null
      });
    return G;
  }, [x, S, M]), w = J.useMemo(() => {
    const G = [];
    for (const ee of x) {
      if (!ee.is_income) continue;
      const P = M.get(`${ee.merchant_key}|true`);
      G.push({
        id: `ia-${ee.merchant_key}-${ee.date}`,
        merchantKey: ee.merchant_key,
        name: (P == null ? void 0 : P.merchant) ?? ee.merchant_key,
        logo: null,
        day: au(ee.date),
        amount: parseFloat(ee.amount),
        state: "actual",
        frequency: (P == null ? void 0 : P.frequency) ?? "monthly",
        theme: null
      });
    }
    for (const ee of S)
      ee.is_income && G.push({
        id: `ie-${ee.merchant_key}-${ee.date}`,
        merchantKey: ee.merchant_key,
        name: ee.merchant || ee.merchant_key,
        logo: null,
        day: au(ee.date),
        amount: ee.amount,
        state: ee.overdue ? "overdue" : "expected",
        frequency: ee.frequency,
        theme: null
      });
    return G.sort((ee, P) => ee.day - P.day);
  }, [x, S, M]), T = J.useMemo(
    () => _.filter(
      (G) => !G.is_income && (G.active && !rv.has(G.frequency) || !G.active && G.theme === "subscriptions")
    ),
    [_]
  ), j = A ? au(A) : 0, N = C.map((G) => G.amount).filter((G) => G > 0), z = Math.max(1e-9, ...N), k = Math.min(z, ...N), B = r - qt.left - qt.right, q = ar - qt.top - qt.bottom, V = (G) => qt.left + (G - 1) / 30 * B, Y = Math.log(z) - Math.log(k), F = (G) => {
    const ee = Y < 1e-6 ? 0.6 : (Math.log(Math.max(G, k)) - Math.log(k)) / Y;
    return ar - qt.bottom - (0.15 + 0.85 * ee) * q;
  }, $ = J.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const P of C) G.set(P.day, [...G.get(P.day) ?? [], P]);
    const ee = /* @__PURE__ */ new Map();
    for (const P of G.values())
      P.forEach((I, re) => ee.set(I.id, (re - (P.length - 1) / 2) * (Rr + 6)));
    return ee;
  }, [C]), K = (G) => {
    const ee = Eu(G.theme ?? "other");
    return G.state === "actual" ? {
      stemOpacity: 1,
      stem: "var(--nb-ink)",
      ring: ee,
      chipFill: "var(--nb-panel-2)",
      initialInk: "var(--nb-text)"
    } : G.state === "expected" ? {
      stemOpacity: 0.35,
      stem: "var(--nb-ink)",
      ring: "var(--nb-ink)",
      chipFill: "var(--nb-bg)",
      initialInk: "var(--nb-muted)"
    } : {
      stemOpacity: 0.5,
      stem: "var(--nb-warn)",
      ring: "var(--nb-warn)",
      chipFill: "var(--nb-bg)",
      initialInk: "var(--nb-warn)"
    };
  }, ne = C.length === 0 && w.length === 0 && T.length === 0;
  return /* @__PURE__ */ R.jsxs("div", { className: "card", ref: n, children: [
    /* @__PURE__ */ R.jsx(el, { effect: tl(t) }),
    /* @__PURE__ */ R.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ R.jsx("h2", { children: t.title ?? "Recurring bills" }),
      /* @__PURE__ */ R.jsx("span", { className: "head-right", children: /* @__PURE__ */ R.jsx(z0, { month: o, onChange: u }) })
    ] }),
    b && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: b }),
    !b && !v && /* @__PURE__ */ R.jsx("div", { className: "status", children: "Loading…" }),
    !b && v && ne && /* @__PURE__ */ R.jsx("div", { className: "status", children: "No recurring activity this month." }),
    !b && v && !ne && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      (C.length > 0 || w.length > 0) && /* @__PURE__ */ R.jsxs(
        "svg",
        {
          viewBox: `0 0 ${r} ${ar}`,
          className: "spend-cal-svg",
          role: "img",
          "aria-label": "Recurring bills and income by day of month",
          children: [
            [1, 8, 15, 22, 29].map((G) => /* @__PURE__ */ R.jsxs("g", { children: [
              /* @__PURE__ */ R.jsx(
                "line",
                {
                  x1: V(G),
                  y1: qt.top - 8,
                  x2: V(G),
                  y2: ar - qt.bottom,
                  stroke: "var(--nb-border)",
                  strokeWidth: "1",
                  opacity: "0.45"
                }
              ),
              /* @__PURE__ */ R.jsx("text", { x: V(G), y: ar - 8, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "12", children: G })
            ] }, G)),
            /* @__PURE__ */ R.jsx(
              "line",
              {
                x1: qt.left,
                y1: ar - qt.bottom,
                x2: r - qt.right,
                y2: ar - qt.bottom,
                stroke: "var(--nb-border)",
                strokeWidth: "1"
              }
            ),
            j > 0 && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
              /* @__PURE__ */ R.jsx(
                "line",
                {
                  x1: V(j),
                  y1: 16,
                  x2: V(j),
                  y2: ar - qt.bottom,
                  stroke: "var(--nb-accent)",
                  strokeWidth: "1.5",
                  opacity: "0.75"
                }
              ),
              /* @__PURE__ */ R.jsx("text", { x: V(j), y: 12, textAnchor: "middle", fill: "var(--nb-accent)", fontSize: "11", children: "today" })
            ] }),
            C.map((G) => {
              var fe;
              const ee = K(G), P = V(G.day) + ($.get(G.id) ?? 0), I = F(G.amount), re = P < qt.left + 34 ? "start" : P > r - qt.right - 34 ? "end" : "middle", se = c === G.id, pe = `clip-${G.id.replace(/\W+/g, "-")}`;
              return /* @__PURE__ */ R.jsxs(
                "g",
                {
                  onMouseEnter: () => f(G.id),
                  onMouseLeave: () => f(null),
                  opacity: c === null || se ? 1 : 0.35,
                  className: "spend-cal-mark",
                  children: [
                    /* @__PURE__ */ R.jsx(
                      "line",
                      {
                        x1: P,
                        y1: ar - qt.bottom,
                        x2: P,
                        y2: I + Rr / 2 + 2,
                        stroke: ee.stem,
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        opacity: ee.stemOpacity
                      }
                    ),
                    /* @__PURE__ */ R.jsx("circle", { cx: P, cy: I, r: Rr / 2 + 2, fill: ee.chipFill, stroke: ee.ring, strokeWidth: "2" }),
                    G.logo && !d.has(G.merchantKey) ? /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
                      /* @__PURE__ */ R.jsx("clipPath", { id: pe, children: /* @__PURE__ */ R.jsx("circle", { cx: P, cy: I, r: Rr / 2 }) }),
                      /* @__PURE__ */ R.jsx(
                        "image",
                        {
                          href: G.logo,
                          x: P - Rr / 2,
                          y: I - Rr / 2,
                          width: Rr,
                          height: Rr,
                          clipPath: `url(#${pe})`,
                          onError: () => h((_e) => new Set(_e).add(G.merchantKey))
                        }
                      )
                    ] }) : /* @__PURE__ */ R.jsx(
                      "text",
                      {
                        x: P,
                        y: I + 5,
                        textAnchor: "middle",
                        fill: ee.initialInk,
                        fontSize: "14",
                        fontWeight: "600",
                        children: G.name.charAt(0).toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ R.jsxs("text", { x: P, y: I - Rr / 2 - 6, textAnchor: re, fill: "var(--nb-text)", fontSize: "12", children: [
                      G.state === "expected" ? "~" : "",
                      Ht(G.amount, E)
                    ] }),
                    se && /* @__PURE__ */ R.jsx(
                      "text",
                      {
                        x: P,
                        y: ar - qt.bottom + 16,
                        textAnchor: re,
                        fill: "var(--nb-text)",
                        fontSize: "12",
                        fontWeight: "600",
                        children: G.name
                      }
                    ),
                    /* @__PURE__ */ R.jsx("title", { children: `${G.name} — ${VO[G.state]}, day ${G.day}${`: ${G.state === "actual" ? "" : "~"}${Ht(G.amount, E)}`} (${((fe = M.get(`${G.merchantKey}|false`)) == null ? void 0 : fe.frequency_label) ?? G.frequency})` })
                  ]
                },
                G.id
              );
            }),
            w.map((G) => {
              const ee = V(G.day), P = G.state === "actual" ? 1 : G.state === "expected" ? 0.6 : 0.45;
              return /* @__PURE__ */ R.jsxs("g", { opacity: P, children: [
                /* @__PURE__ */ R.jsx(
                  "circle",
                  {
                    cx: ee,
                    cy: XO,
                    r: 7,
                    fill: G.state === "actual" ? "var(--nb-green)" : "var(--nb-bg)",
                    stroke: "var(--nb-green)",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ R.jsx("text", { x: ee, y: XO + 18, textAnchor: "middle", fill: "var(--nb-green)", fontSize: "10", children: Ht(G.amount, E) }),
                /* @__PURE__ */ R.jsx("title", { children: `${G.name} — income, ${VO[G.state]} (day ${G.day})${`: ${Ht(G.amount, E)}`}` })
              ] }, G.id);
            })
          ]
        }
      ),
      T.length > 0 && /* @__PURE__ */ R.jsx("div", { className: "spend-strip", children: T.map((G) => /* @__PURE__ */ R.jsxs(
        "span",
        {
          className: `spend-strip-item ${G.active ? "" : "lapsed"}`,
          title: G.active ? `${G.frequency_label ?? G.frequency}, last on ${G.last_seen.slice(0, 10)}` : `looks cancelled — last charged ${G.last_seen.slice(0, 10)}`,
          children: [
            G.merchant ?? G.merchant_key,
            /* @__PURE__ */ R.jsxs("span", { className: "muted", children: [
              ` ${Ht(parseFloat(G.average_amount), E)}`,
              ` · ${G.frequency_label ?? G.frequency}`,
              G.active ? "" : " · lapsed"
            ] })
          ]
        },
        `${G.merchant_key}-${G.is_income}`
      )) })
    ] })
  ] });
}
const ir = 200, it = { top: 26, right: 16, bottom: 24, left: 56 };
function p$(e) {
  const [t, n] = e.split("-").map(Number);
  return {
    from: new Date(Date.UTC(t, n - 1, 1)),
    to: new Date(Date.UTC(t, n, 1))
  };
}
function v$({
  hass: e,
  config: t
}) {
  const { ref: n, width: r } = FM(), [o, u] = J.useState(ju()), [c, f] = J.useState(null), d = J.useRef(null), [h, y] = J.useState(null), v = (Y) => y(Y), g = J.useCallback(
    (Y, F) => Promise.all([YM(Y, F, "6m", o), XM(Y, F, o)]).then(
      ([$, K]) => ({
        data: { series: $.series, txns: K.transactions },
        censored: K.censored
      })
    ),
    [o]
  ), { overview: b, data: _, masked: S, error: x } = nd(
    e,
    t.entry,
    g
  ), A = J.useMemo(
    () => ((b == null ? void 0 : b.accounts) ?? []).filter((Y) => Y.kind === "credit"),
    [b]
  ), E = (_ == null ? void 0 : _.series) ?? [], M = (_ == null ? void 0 : _.txns) ?? [], C = S, { from: w, to: T } = p$(o), N = J.useMemo(() => A.map((Y) => {
    var pe;
    const F = (((pe = E.find((fe) => fe.account_id === Y.id)) == null ? void 0 : pe.points) ?? []).map((fe) => ({ ts: new Date(fe.ts), debt: Math.max(0, -parseFloat(fe.balance)) })).filter((fe) => !isNaN(fe.debt)).sort((fe, _e) => fe.ts.getTime() - _e.ts.getTime()), $ = F.filter((fe) => fe.ts < w), K = F.filter((fe) => fe.ts >= w && fe.ts < T), ne = F.filter((fe) => fe.ts >= T), G = M.filter((fe) => fe.account_id === Y.id && !fe.pending).map((fe) => ({ ...fe, v: parseFloat(fe.amount), date: new Date(fe.posted_at) })).sort((fe, _e) => fe.date.getTime() - _e.date.getTime());
    let ee = 0, P = 0;
    const I = [];
    for (const fe of G)
      fe.v > 0 && fe.transaction_type === "withdrawal" ? ee += fe.v : fe.v < 0 && fe.transaction_type === "transfer" && (P += -fe.v, I.push({ date: fe.date, amount: -fe.v }));
    const re = [...$.length ? [{ ...$[$.length - 1], ts: w }] : [], ...K];
    let se = [];
    if ($.length === 0 && (K.length > 0 || ne.length > 0)) {
      const fe = K.length > 0 ? K[0].ts : T, _e = K.length > 0 ? K[0].debt : ne[0].debt;
      let Ce = _e;
      const ce = [];
      for (const ge of [...G].reverse())
        ge.date >= fe || ge.date < w || (Ce = Math.max(0, Ce - ge.v), ce.unshift({ ts: ge.date, debt: Ce }));
      se = [{ ts: w, debt: ce.length ? ce[0].debt : Ce }, ...ce], K.length > 0 && se.push({ ts: fe, debt: _e });
    }
    return { card: Y, line: re, recon: se, spent: ee, paid: P, payments: I };
  }), [A, E, M, w, T]).filter(
    (Y) => Y.line.length > 0 || Y.recon.length > 0 || Y.spent > 0 || Y.paid > 0
  ), z = N.find((Y) => Y.card.id === h) ?? N[0], k = z ? [z] : [], B = Math.round((T.getTime() - w.getTime()) / 864e5), q = (Y) => it.left + Math.min(Math.max((Y.getTime() - w.getTime()) / 864e5, 0), B) / B * (r - it.left - it.right), V = (Y, F) => {
    let $ = null;
    for (const K of Y)
      if (K.ts.getTime() <= F) $ = K.debt;
      else break;
    return $;
  };
  return /* @__PURE__ */ R.jsxs("div", { className: "card", ref: n, children: [
    /* @__PURE__ */ R.jsx(el, { effect: tl(t) }),
    /* @__PURE__ */ R.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ R.jsx("h2", { children: t.title ?? "Card credit" }),
      /* @__PURE__ */ R.jsx("span", { className: "head-right", children: /* @__PURE__ */ R.jsx(z0, { month: o, onChange: u }) })
    ] }),
    x && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: x }),
    !x && !_ && /* @__PURE__ */ R.jsx("div", { className: "status", children: "Loading…" }),
    !x && _ && N.length === 0 && /* @__PURE__ */ R.jsx("div", { className: "status", children: "No credit-card activity this month." }),
    !x && _ && N.length > 1 && /* @__PURE__ */ R.jsx("div", { className: "spend-card-chips", children: N.map(({ card: Y }) => /* @__PURE__ */ R.jsx(
      "button",
      {
        className: `spend-card-chip ${z && Y.id === z.card.id ? "on" : ""}`,
        title: "Show this card",
        onClick: () => v(Y.id),
        children: Y.nickname ?? Y.name
      },
      Y.id
    )) }),
    !x && _ && k.map(({ card: Y, line: F, recon: $, spent: K, paid: ne, payments: G }) => {
      const ee = Math.max(
        1,
        ...F.map((he) => he.debt),
        ...$.map((he) => he.debt),
        ...G.map((he) => he.amount)
      ), P = (he) => ir - it.bottom - he / ee * (ir - it.top - it.bottom), I = /* @__PURE__ */ new Date(), re = I >= w && I < T ? q(I) : null, se = re ?? r - it.right, pe = (he, ue) => {
        let qe = "";
        return he.forEach((xe, Qe) => {
          qe += Qe === 0 ? `M${q(xe.ts)},${P(xe.debt)}` : `H${q(xe.ts)}V${P(xe.debt)}`;
        }), qe && ue && (qe += `H${se}`), qe;
      }, fe = pe($, F.length === 0), _e = pe(F, !0), Ce = [...$, ...F].sort((he, ue) => he.ts.getTime() - ue.ts.getTime()), ce = Ce.length ? `${pe(Ce, !0)} V${ir - it.bottom} H${q(Ce[0].ts)} Z` : "", ge = Y.nickname ?? Y.name;
      return /* @__PURE__ */ R.jsxs("div", { className: "spend-card-row", children: [
        /* @__PURE__ */ R.jsxs("div", { className: "spend-card-head", children: [
          /* @__PURE__ */ R.jsx("span", { children: ge }),
          /* @__PURE__ */ R.jsxs("span", { className: "muted", children: [
            "spent ",
            Ht(K, C),
            " · paid ",
            Ht(ne, C),
            (F.length > 0 || $.length > 0) && ` · owing ${Ht((F[F.length - 1] ?? $[$.length - 1]).debt, C)}`
          ] })
        ] }),
        /* @__PURE__ */ R.jsxs(
          "svg",
          {
            viewBox: `0 0 ${r} ${ir}`,
            className: "spend-cal-svg",
            role: "img",
            "aria-label": `${ge} balance through the month`,
            onMouseLeave: () => {
              d.current && clearTimeout(d.current), d.current = setTimeout(() => f(null), 80);
            },
            onMouseMove: (he) => {
              d.current && clearTimeout(d.current);
              const ue = he.currentTarget.getBoundingClientRect(), qe = ue.width / r, xe = (he.clientX - ue.left) / qe, Qe = (he.clientY - ue.top) / qe;
              if (xe < it.left || xe > r - it.right) {
                f(null);
                return;
              }
              const Ye = w.getTime() + (xe - it.left) / (r - it.left - it.right) * B * 864e5;
              if (re !== null && Ye > I.getTime()) {
                f(null);
                return;
              }
              const Et = new Date(Ye).getUTCDate(), un = P, Wt = G.find(
                (Xt) => Math.abs(q(Xt.date) - xe) < 12 && Math.abs(un(Xt.amount) - Qe) < 14
              );
              let On, Kt;
              if (Wt)
                On = [
                  { label: "day", value: String(Wt.date.getUTCDate()) },
                  { label: "payment", value: `-${Ht(Wt.amount, C)}` }
                ], Kt = "a payment landed on the card";
              else {
                const Xt = F.length > 0 && Ye >= F[0].ts.getTime(), Zr = V(Xt ? F : $, Ye);
                if (Zr === null) {
                  f(null);
                  return;
                }
                On = [
                  { label: "day", value: String(Et) },
                  { label: "owing", value: Ht(Zr, C) }
                ], Kt = Xt ? "balance reported by the card" : "estimated from transactions — before the first report we have";
              }
              f({ left: he.clientX + 14, top: he.clientY - 12, title: ge, rows: On, note: Kt });
            },
            children: [
              /* @__PURE__ */ R.jsx("defs", { children: /* @__PURE__ */ R.jsxs("linearGradient", { id: `ccfill-${Y.id}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ R.jsx("stop", { offset: "0", stopColor: "var(--nb-ink)", stopOpacity: "0.26" }),
                /* @__PURE__ */ R.jsx("stop", { offset: "1", stopColor: "var(--nb-ink)", stopOpacity: "0" })
              ] }) }),
              [1, 8, 15, 22, 29].map((he) => {
                const ue = q(new Date(w.getTime() + (he - 1) * 864e5));
                return /* @__PURE__ */ R.jsxs("g", { children: [
                  /* @__PURE__ */ R.jsx(
                    "line",
                    {
                      x1: ue,
                      y1: it.top,
                      x2: ue,
                      y2: ir - it.bottom,
                      stroke: "var(--nb-border)",
                      strokeWidth: "1",
                      opacity: "0.45"
                    }
                  ),
                  /* @__PURE__ */ R.jsx("text", { x: ue, y: ir - 6, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "11", children: he })
                ] }, he);
              }),
              /* @__PURE__ */ R.jsx(
                "line",
                {
                  x1: it.left,
                  y1: ir - it.bottom,
                  x2: r - it.right,
                  y2: ir - it.bottom,
                  stroke: "var(--nb-border)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ R.jsx("text", { x: it.left - 6, y: it.top + 4, textAnchor: "end", fill: "var(--nb-muted)", fontSize: "11", children: Ht(ee, C) }),
              ce && /* @__PURE__ */ R.jsx("path", { d: ce, fill: `url(#ccfill-${Y.id})` }),
              fe && /* @__PURE__ */ R.jsx(
                "path",
                {
                  d: fe,
                  fill: "none",
                  stroke: "var(--nb-ink)",
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  opacity: "0.45"
                }
              ),
              _e && /* @__PURE__ */ R.jsx(
                "path",
                {
                  d: _e,
                  fill: "none",
                  stroke: "var(--nb-ink)",
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  opacity: "0.95"
                }
              ),
              re !== null && /* @__PURE__ */ R.jsxs("g", { children: [
                /* @__PURE__ */ R.jsx(
                  "line",
                  {
                    x1: re,
                    y1: it.top - 6,
                    x2: re,
                    y2: ir - it.bottom,
                    stroke: "var(--nb-accent)",
                    strokeWidth: "1.5",
                    opacity: "0.8"
                  }
                ),
                /* @__PURE__ */ R.jsx(
                  "text",
                  {
                    x: re,
                    y: it.top - 10,
                    textAnchor: "middle",
                    fill: "var(--nb-accent)",
                    fontSize: "11",
                    children: "today"
                  }
                )
              ] }),
              G.map((he, ue) => /* @__PURE__ */ R.jsxs("g", { children: [
                /* @__PURE__ */ R.jsx(
                  "line",
                  {
                    x1: q(he.date),
                    y1: P(he.amount),
                    x2: q(he.date),
                    y2: ir - it.bottom,
                    stroke: "var(--nb-green)",
                    strokeWidth: "2",
                    opacity: "0.55"
                  }
                ),
                /* @__PURE__ */ R.jsx(
                  "circle",
                  {
                    cx: q(he.date),
                    cy: P(he.amount),
                    r: 4.5,
                    fill: "var(--nb-bg)",
                    stroke: "var(--nb-green)",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ R.jsxs(
                  "text",
                  {
                    x: q(he.date),
                    y: P(he.amount) - 10,
                    textAnchor: "middle",
                    fill: "var(--nb-green)",
                    fontSize: "11",
                    children: [
                      "-",
                      Ht(he.amount, C)
                    ]
                  }
                ),
                /* @__PURE__ */ R.jsx("title", { children: `payment ${he.date.toISOString().slice(0, 10)}${`: ${Ht(he.amount, C)}`}` })
              ] }, ue))
            ]
          }
        )
      ] }, Y.id);
    }),
    c && /* @__PURE__ */ R.jsx(r$, { children: /* @__PURE__ */ R.jsxs(
      "div",
      {
        className: "spend-hoverbubble",
        style: {
          left: Math.min(c.left, window.innerWidth - 240),
          top: c.top
        },
        children: [
          /* @__PURE__ */ R.jsx("div", { className: "spend-bubble-title", children: c.title }),
          /* @__PURE__ */ R.jsx("div", { className: "spend-bubble-rows", children: c.rows.map((Y) => /* @__PURE__ */ R.jsxs("div", { className: "spend-bubble-row", children: [
            /* @__PURE__ */ R.jsx("span", { className: "muted", children: Y.label }),
            /* @__PURE__ */ R.jsx("span", { children: Y.value })
          ] }, Y.label)) }),
          /* @__PURE__ */ R.jsx("div", { className: "muted spend-hoverbubble-note", children: c.note })
        ]
      }
    ) })
  ] });
}
function y$({ tx: e }) {
  const [t, n] = J.useState(!1), r = e.merchant ?? e.merchant_key;
  return e.logo_url && !t ? /* @__PURE__ */ R.jsx(
    "img",
    {
      className: "spend-txn-logo",
      src: e.logo_url,
      alt: "",
      onError: () => n(!0)
    }
  ) : /* @__PURE__ */ R.jsx(
    "span",
    {
      className: "spend-txn-logo spend-txn-initial",
      style: { borderColor: Eu(e.theme ?? "other") },
      children: (r.charAt(0) || "?").toUpperCase()
    }
  );
}
function m$({
  rows: e,
  totalSpend: t,
  censored: n
}) {
  const r = e.reduce((g, b) => g + parseFloat(b.total), 0);
  if (r <= 0) return null;
  const o = 5, u = e.slice(0, o).map((g) => ({ theme: g.theme, value: parseFloat(g.total), color: Eu(g.theme) })), c = e.slice(o).reduce((g, b) => g + parseFloat(b.total), 0);
  c > 0 && u.push({ theme: "everything else", value: c, color: "#8b9bb4" });
  const f = 80, d = 50, h = 90;
  let y = -Math.PI / 2;
  const v = u.map((g) => {
    const b = g.value / r * Math.PI * 2, _ = y, S = y + b;
    y = S;
    const x = b > Math.PI ? 1 : 0, A = (C, w) => `${h + C * Math.cos(w)},${h + C * Math.sin(w)}`, E = `M${A(f, _)} A${f},${f} 0 ${x} 1 ${A(f, S)} L${A(d, S)} A${d},${d} 0 ${x} 0 ${A(d, _)} Z`, M = (_ + S) / 2;
    return { ...g, d: E, mid: M, share: g.value / r };
  });
  return /* @__PURE__ */ R.jsxs("svg", { viewBox: "0 0 180 180", className: "spend-donut", role: "img", "aria-label": "Share of spending by theme", children: [
    v.map((g) => /* @__PURE__ */ R.jsx(
      "path",
      {
        d: g.d,
        fill: g.color,
        fillOpacity: 0.85,
        stroke: "var(--nb-bg)",
        strokeWidth: "2",
        children: /* @__PURE__ */ R.jsx("title", { children: `${g.theme} — ${Math.round(g.share * 100)}%${n ? "" : ` (${Ht(g.value, n)})`}` })
      },
      g.theme
    )),
    v.filter((g) => g.share >= 0.08).map((g) => /* @__PURE__ */ R.jsxs(
      "text",
      {
        x: h + (f + d) / 2 * Math.cos(g.mid),
        y: h + (f + d) / 2 * Math.sin(g.mid) + 4,
        textAnchor: "middle",
        fill: "#0b0f17",
        fontSize: "11",
        fontWeight: "600",
        pointerEvents: "none",
        children: [
          Math.round(g.share * 100),
          "%"
        ]
      },
      `l-${g.theme}`
    )),
    /* @__PURE__ */ R.jsx("text", { x: h, y: h - 2, textAnchor: "middle", fill: "var(--nb-text)", fontSize: "15", fontWeight: "600", children: n ? N0 : or(t) }),
    /* @__PURE__ */ R.jsx("text", { x: h, y: h + 14, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "10", children: "spent" })
  ] });
}
function g$({
  hass: e,
  config: t
}) {
  const [n, r] = J.useState(ju()), [o, u] = J.useState(null), [c, f] = J.useState(null), [d, h] = J.useState(null), y = J.useRef(0);
  J.useEffect(() => () => {
    y.current += 1;
  }, []);
  const v = J.useCallback(
    (k, B) => Promise.all([t$(k, B, n), KM(k, B, n)]).then(
      ([q, V]) => ({ data: { summary: q, recurring: V }, censored: q.censored })
    ),
    [n]
  ), { data: g, masked: b, error: _ } = nd(
    e,
    t.entry,
    v
  ), S = (k) => {
    y.current += 1, r(k), u(null), f(null);
  }, x = (k) => {
    const B = ++y.current;
    if (h(null), o === k) {
      u(null), f(null);
      return;
    }
    u(k), f(null), XM(e, t.entry, n, k).then((q) => {
      B === y.current && f(q.transactions);
    }).catch(() => {
      B === y.current && h("Unable to load these transactions.");
    });
  }, A = (g == null ? void 0 : g.summary) ?? null, E = (g == null ? void 0 : g.recurring) ?? null, M = A ? A.themes.filter((k) => parseFloat(k.total) > 0) : [], C = Math.max(1e-9, ...M.map((k) => parseFloat(k.total))), T = (E ? E.streams.filter((k) => !k.is_income) : []).filter((k) => k.active), j = T.reduce(
    (k, B) => k + parseFloat(B.monthly_amount ?? B.average_amount) * (B.monthly_amount ? 1 : f$[B.frequency] ?? 1),
    0
  ), N = E ? E.expected.filter((k) => !k.is_income && !k.overdue).reduce((k, B) => k + B.amount, 0) : 0, z = A && n === ju() && N > 0 ? parseFloat(A.total_spend) + N : null;
  return /* @__PURE__ */ R.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ R.jsx(el, { effect: tl(t) }),
    /* @__PURE__ */ R.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ R.jsx("h2", { children: t.title ?? "Spending" }),
      /* @__PURE__ */ R.jsx("span", { className: "head-right", children: /* @__PURE__ */ R.jsx(z0, { month: n, onChange: S }) })
    ] }),
    _ && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: _ }),
    !_ && !A && /* @__PURE__ */ R.jsx("div", { className: "status", children: "Loading…" }),
    !_ && A && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      t.show_stats !== !1 && /* @__PURE__ */ R.jsxs("div", { className: "spend-stats", children: [
        /* @__PURE__ */ R.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ R.jsx("span", { className: "spend-stat-label", children: "Spent" }),
          /* @__PURE__ */ R.jsx("span", { className: "spend-stat-value", children: or(parseFloat(A.total_spend)) }),
          z !== null && !b && /* @__PURE__ */ R.jsxs("span", { className: "muted", children: [
            "plus scheduled bills ~",
            or(z)
          ] })
        ] }),
        /* @__PURE__ */ R.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ R.jsx("span", { className: "spend-stat-label", children: "Income" }),
          /* @__PURE__ */ R.jsx("span", { className: "spend-stat-value up", children: or(parseFloat(A.total_income)) })
        ] }),
        /* @__PURE__ */ R.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ R.jsx("span", { className: "spend-stat-label", children: "Recurring bills" }),
          /* @__PURE__ */ R.jsx("span", { className: "spend-stat-value", children: `${or(j)}/mo` }),
          /* @__PURE__ */ R.jsxs("span", { className: "muted", children: [
            T.length,
            " active"
          ] })
        ] })
      ] }),
      M.length === 0 && /* @__PURE__ */ R.jsx("div", { className: "status", children: "No spending recorded this month." }),
      M.length > 0 && /* @__PURE__ */ R.jsxs("div", { className: "spend-themes-split", children: [
        t.show_donut !== !1 && /* @__PURE__ */ R.jsx(
          m$,
          {
            rows: M,
            totalSpend: parseFloat(A.total_spend),
            censored: b
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "spend-themes-bars", children: M.map((k) => /* @__PURE__ */ R.jsxs("div", { children: [
          /* @__PURE__ */ R.jsxs(
            "button",
            {
              className: `spend-row ${o === k.theme ? "open" : ""}`,
              onClick: () => x(k.theme),
              children: [
                /* @__PURE__ */ R.jsxs("span", { className: "spend-row-label", children: [
                  /* @__PURE__ */ R.jsx(
                    "span",
                    {
                      className: "spend-theme-dot",
                      style: { background: Eu(k.theme) }
                    }
                  ),
                  k.theme
                ] }),
                /* @__PURE__ */ R.jsx("span", { className: "spend-row-bar", children: /* @__PURE__ */ R.jsx(
                  "span",
                  {
                    className: "spend-row-fill",
                    style: {
                      width: `${parseFloat(k.total) / C * 100}%`,
                      "--bar-color": Eu(k.theme)
                    }
                  }
                ) }),
                /* @__PURE__ */ R.jsx("span", { className: "spend-row-amount", children: Ht(parseFloat(k.total), b) }),
                /* @__PURE__ */ R.jsxs("span", { className: "muted spend-row-count", children: [
                  k.count,
                  "×"
                ] })
              ]
            }
          ),
          o === k.theme && /* @__PURE__ */ R.jsxs("div", { className: "spend-txns", children: [
            d && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: d }),
            c === null && !d && /* @__PURE__ */ R.jsx("div", { className: "muted", children: "Loading…" }),
            c !== null && [...c].sort(
              (B, q) => Number(q.pending) - Number(B.pending) || q.posted_at.localeCompare(B.posted_at)
            ).map((B) => /* @__PURE__ */ R.jsxs("div", { className: "spend-txn", children: [
              /* @__PURE__ */ R.jsx("span", { className: "muted spend-txn-date", children: new Date(B.posted_at).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                timeZone: "Asia/Kolkata"
              }) }),
              /* @__PURE__ */ R.jsx(y$, { tx: B }),
              /* @__PURE__ */ R.jsxs("span", { className: "spend-txn-desc", title: B.description, children: [
                B.merchant ?? B.description,
                B.pending ? " · pending" : ""
              ] }),
              /* @__PURE__ */ R.jsx("span", { className: "spend-txn-amount", children: Ht(parseFloat(B.amount), b) })
            ] }, B.id))
          ] })
        ] }, k.theme)) })
      ] })
    ] })
  ] });
}
function ZM(e) {
  const t = /* @__PURE__ */ new Set();
  for (const o of e)
    for (const u of o.points) t.add(new Date(u.ts).getTime());
  const r = [...t].sort((o, u) => o - u).map((o) => ({ ts: o, values: {} }));
  for (const o of e) {
    const u = o.points.map((d) => ({ ts: new Date(d.ts).getTime(), v: parseFloat(d.balance) })).sort((d, h) => d.ts - h.ts);
    let c = 0, f = 0;
    for (const d of r) {
      for (; c < u.length && u[c].ts <= d.ts; )
        f = u[c].v, c++;
      d.values[o.account_id] = f;
    }
  }
  return r;
}
function Vn(e, t, n = () => !0) {
  let r = 0;
  for (const o of t)
    n(o) && (r += e.values[o.id] ?? 0);
  return r;
}
function QM(e) {
  const t = e === "1d" || e === "1w" ? "day" : e === "1m" || e === "3m" ? "week" : "month";
  return (n) => {
    const r = new Date(n);
    if (t === "day") return new Date(r.getFullYear(), r.getMonth(), r.getDate()).getTime();
    if (t === "week") {
      const o = (r.getDay() + 6) % 7;
      return new Date(r.getFullYear(), r.getMonth(), r.getDate() - o).getTime();
    }
    return new Date(r.getFullYear(), r.getMonth(), 1).getTime();
  };
}
function b$(e, t, n) {
  if (e.length === 0) return [];
  const r = QM(n), o = /* @__PURE__ */ new Map();
  for (const f of e) o.set(r(f.ts), Vn(f, t));
  const u = [...o.keys()].sort((f, d) => f - d);
  let c = Vn(e[0], t);
  return u.map((f) => {
    const d = o.get(f), h = d - c;
    return c = d, { ts: f, flow: h };
  });
}
function x$(e, t, n) {
  if (e.length === 0) return [];
  const r = QM(n), o = /* @__PURE__ */ new Map();
  for (const f of e) o.set(r(f.ts), f);
  const u = [...o.keys()].sort((f, d) => f - d);
  let c = e[0];
  return u.map((f) => {
    const d = o.get(f), h = {};
    let y = 0;
    for (const v of t) {
      const g = (d.values[v.id] ?? 0) - (c.values[v.id] ?? 0);
      h[v.id] = g, y += g;
    }
    return c = d, { ts: f, deltas: h, net: y };
  });
}
function ub(e, t) {
  let n = 0;
  for (const r of t) {
    const o = e.values[r.id] ?? 0;
    o < 0 && (n += o);
  }
  return n;
}
const FO = {
  Retirement: "#60a5fa",
  Taxable: "#818cf8",
  "Non-retirement": "#818cf8",
  Cash: "#34d399",
  Liquid: "#34d399",
  Debt: "#f472b6",
  "Credit cards": "#f472b6"
};
function S$(e, t, n) {
  const r = { values: t }, o = (f) => Vn(r, n, f);
  if (e === "daily")
    return [
      { label: "Liquid", v: o((f) => f.kind === "cash") },
      { label: "Credit cards", v: o((f) => f.kind === "credit") }
    ];
  const u = o((f) => f.category === "retirement");
  if (e === "invest")
    return [
      { label: "Retirement", v: u },
      { label: "Taxable", v: o((f) => f.category !== "retirement") }
    ];
  const c = ub(r, n);
  return [
    { label: "Retirement", v: u },
    { label: "Non-retirement", v: o((f) => f.category !== "retirement" && (t[f.id] ?? 0) > 0) },
    { label: "Debt", v: c }
  ];
}
function _$({ parts: e }) {
  const t = e.filter((r) => r.v !== 0), n = t.reduce((r, o) => r + Math.abs(o.v), 0);
  return t.length < 2 || n === 0 ? null : /* @__PURE__ */ R.jsxs("div", { className: "comp", children: [
    /* @__PURE__ */ R.jsx("div", { className: "comp-bar", children: t.map((r) => /* @__PURE__ */ R.jsx(
      "span",
      {
        style: {
          background: FO[r.label] ?? "#8b9bb4",
          width: `${Math.abs(r.v) / n * 100}%`
        }
      },
      r.label
    )) }),
    /* @__PURE__ */ R.jsx("div", { className: "comp-legend", children: t.map((r) => /* @__PURE__ */ R.jsxs("span", { className: "comp-item", children: [
      /* @__PURE__ */ R.jsx("span", { className: "comp-dot", style: { background: FO[r.label] ?? "#8b9bb4" } }),
      r.label,
      " ",
      /* @__PURE__ */ R.jsx("b", { children: HM(r.v) })
    ] }, r.label)) })
  ] });
}
function O$({
  hass: e,
  config: t
}) {
  const n = Eo.find((_) => _.key === (t.view ?? "all")) ?? Eo[2], [r, o] = J.useState(t.range ?? "1m"), { overview: u, series: c, masked: f, error: d } = $0(e, t.entry, r), h = WM(u), y = J.useMemo(() => h.filter(n.pick), [h, n]), v = J.useMemo(() => {
    if (!c) return null;
    const _ = new Set(y.map((E) => E.id)), S = ZM(c.filter((E) => _.has(E.account_id)));
    if (S.length === 0) return null;
    const x = Vn(S[0], y), A = Vn(S[S.length - 1], y);
    return {
      last: A,
      diff: A - x,
      delta: x !== 0 ? (A - x) / Math.abs(x) : null,
      parts: S$(n.key, S[S.length - 1].values, y)
    };
  }, [c, y, n]), g = v != null && v.delta != null, b = t.layout === "banner";
  return /* @__PURE__ */ R.jsxs("div", { className: `card${b ? " stat-banner" : ""}`, children: [
    /* @__PURE__ */ R.jsx(el, { effect: tl(t) }),
    /* @__PURE__ */ R.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ R.jsx("h2", { children: t.title ?? n.label }),
      /* @__PURE__ */ R.jsx("span", { className: "head-right", children: t.show_controls !== !1 && t.show_range_selector !== !1 && /* @__PURE__ */ R.jsx("span", { className: "controls", children: /* @__PURE__ */ R.jsx(ef, { options: R0, value: r, onChange: o }) }) })
    ] }),
    d && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: d }),
    !d && !v && /* @__PURE__ */ R.jsx("div", { className: "status", children: "Loading…" }),
    !d && v && f && // Censored: the dollar amount is redacted anyway, so promote the real
    // percent change to the big slot and drop the footer line entirely.
    /* @__PURE__ */ R.jsx(
      "div",
      {
        className: `stat-value ${g && !n.flow ? v.delta >= 0 ? "up" : "down" : ""}`,
        children: g && !n.flow ? Tu(v.delta) : N0
      }
    ),
    !d && v && !f && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      /* @__PURE__ */ R.jsx("div", { className: "stat-value", children: or(v.last) }),
      g && /* @__PURE__ */ R.jsxs("div", { className: "stat-delta", children: [
        /* @__PURE__ */ R.jsxs("span", { className: `chip ${v.diff >= 0 ? "up" : "down"}`, children: [
          lb(v.diff),
          !n.flow && ` (${Tu(v.delta)})`
        ] }),
        /* @__PURE__ */ R.jsxs("span", { children: [
          "over ",
          r
        ] })
      ] }),
      t.show_composition !== !1 && /* @__PURE__ */ R.jsx(_$, { parts: v.parts })
    ] })
  ] });
}
function JM(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = JM(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function $e() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = JM(e)) && (r && (r += " "), r += t);
  return r;
}
var av, WO;
function ln() {
  if (WO) return av;
  WO = 1;
  var e = Array.isArray;
  return av = e, av;
}
var iv, ZO;
function eC() {
  if (ZO) return iv;
  ZO = 1;
  var e = typeof $s == "object" && $s && $s.Object === Object && $s;
  return iv = e, iv;
}
var ov, QO;
function vr() {
  if (QO) return ov;
  QO = 1;
  var e = eC(), t = typeof self == "object" && self && self.Object === Object && self, n = e || t || Function("return this")();
  return ov = n, ov;
}
var lv, JO;
function fc() {
  if (JO) return lv;
  JO = 1;
  var e = vr(), t = e.Symbol;
  return lv = t, lv;
}
var uv, ew;
function w$() {
  if (ew) return uv;
  ew = 1;
  var e = fc(), t = Object.prototype, n = t.hasOwnProperty, r = t.toString, o = e ? e.toStringTag : void 0;
  function u(c) {
    var f = n.call(c, o), d = c[o];
    try {
      c[o] = void 0;
      var h = !0;
    } catch {
    }
    var y = r.call(c);
    return h && (f ? c[o] = d : delete c[o]), y;
  }
  return uv = u, uv;
}
var cv, tw;
function A$() {
  if (tw) return cv;
  tw = 1;
  var e = Object.prototype, t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return cv = n, cv;
}
var sv, nw;
function Xr() {
  if (nw) return sv;
  nw = 1;
  var e = fc(), t = w$(), n = A$(), r = "[object Null]", o = "[object Undefined]", u = e ? e.toStringTag : void 0;
  function c(f) {
    return f == null ? f === void 0 ? o : r : u && u in Object(f) ? t(f) : n(f);
  }
  return sv = c, sv;
}
var fv, rw;
function Vr() {
  if (rw) return fv;
  rw = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return fv = e, fv;
}
var dv, aw;
function nl() {
  if (aw) return dv;
  aw = 1;
  var e = Xr(), t = Vr(), n = "[object Symbol]";
  function r(o) {
    return typeof o == "symbol" || t(o) && e(o) == n;
  }
  return dv = r, dv;
}
var hv, iw;
function q0() {
  if (iw) return hv;
  iw = 1;
  var e = ln(), t = nl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function o(u, c) {
    if (e(u))
      return !1;
    var f = typeof u;
    return f == "number" || f == "symbol" || f == "boolean" || u == null || t(u) ? !0 : r.test(u) || !n.test(u) || c != null && u in Object(c);
  }
  return hv = o, hv;
}
var pv, ow;
function Da() {
  if (ow) return pv;
  ow = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return pv = e, pv;
}
var vv, lw;
function k0() {
  if (lw) return vv;
  lw = 1;
  var e = Xr(), t = Da(), n = "[object AsyncFunction]", r = "[object Function]", o = "[object GeneratorFunction]", u = "[object Proxy]";
  function c(f) {
    if (!t(f))
      return !1;
    var d = e(f);
    return d == r || d == o || d == n || d == u;
  }
  return vv = c, vv;
}
var yv, uw;
function T$() {
  if (uw) return yv;
  uw = 1;
  var e = vr(), t = e["__core-js_shared__"];
  return yv = t, yv;
}
var mv, cw;
function E$() {
  if (cw) return mv;
  cw = 1;
  var e = T$(), t = (function() {
    var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!t && t in r;
  }
  return mv = n, mv;
}
var gv, sw;
function tC() {
  if (sw) return gv;
  sw = 1;
  var e = Function.prototype, t = e.toString;
  function n(r) {
    if (r != null) {
      try {
        return t.call(r);
      } catch {
      }
      try {
        return r + "";
      } catch {
      }
    }
    return "";
  }
  return gv = n, gv;
}
var bv, fw;
function j$() {
  if (fw) return bv;
  fw = 1;
  var e = k0(), t = E$(), n = Da(), r = tC(), o = /[\\^$.*+?()[\]{}|]/g, u = /^\[object .+?Constructor\]$/, c = Function.prototype, f = Object.prototype, d = c.toString, h = f.hasOwnProperty, y = RegExp(
    "^" + d.call(h).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function v(g) {
    if (!n(g) || t(g))
      return !1;
    var b = e(g) ? y : u;
    return b.test(r(g));
  }
  return bv = v, bv;
}
var xv, dw;
function M$() {
  if (dw) return xv;
  dw = 1;
  function e(t, n) {
    return t == null ? void 0 : t[n];
  }
  return xv = e, xv;
}
var Sv, hw;
function gi() {
  if (hw) return Sv;
  hw = 1;
  var e = j$(), t = M$();
  function n(r, o) {
    var u = t(r, o);
    return e(u) ? u : void 0;
  }
  return Sv = n, Sv;
}
var _v, pw;
function rd() {
  if (pw) return _v;
  pw = 1;
  var e = gi(), t = e(Object, "create");
  return _v = t, _v;
}
var Ov, vw;
function C$() {
  if (vw) return Ov;
  vw = 1;
  var e = rd();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Ov = t, Ov;
}
var wv, yw;
function D$() {
  if (yw) return wv;
  yw = 1;
  function e(t) {
    var n = this.has(t) && delete this.__data__[t];
    return this.size -= n ? 1 : 0, n;
  }
  return wv = e, wv;
}
var Av, mw;
function P$() {
  if (mw) return Av;
  mw = 1;
  var e = rd(), t = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function o(u) {
    var c = this.__data__;
    if (e) {
      var f = c[u];
      return f === t ? void 0 : f;
    }
    return r.call(c, u) ? c[u] : void 0;
  }
  return Av = o, Av;
}
var Tv, gw;
function N$() {
  if (gw) return Tv;
  gw = 1;
  var e = rd(), t = Object.prototype, n = t.hasOwnProperty;
  function r(o) {
    var u = this.__data__;
    return e ? u[o] !== void 0 : n.call(u, o);
  }
  return Tv = r, Tv;
}
var Ev, bw;
function R$() {
  if (bw) return Ev;
  bw = 1;
  var e = rd(), t = "__lodash_hash_undefined__";
  function n(r, o) {
    var u = this.__data__;
    return this.size += this.has(r) ? 0 : 1, u[r] = e && o === void 0 ? t : o, this;
  }
  return Ev = n, Ev;
}
var jv, xw;
function $$() {
  if (xw) return jv;
  xw = 1;
  var e = C$(), t = D$(), n = P$(), r = N$(), o = R$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, jv = u, jv;
}
var Mv, Sw;
function z$() {
  if (Sw) return Mv;
  Sw = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Mv = e, Mv;
}
var Cv, _w;
function B0() {
  if (_w) return Cv;
  _w = 1;
  function e(t, n) {
    return t === n || t !== t && n !== n;
  }
  return Cv = e, Cv;
}
var Dv, Ow;
function ad() {
  if (Ow) return Dv;
  Ow = 1;
  var e = B0();
  function t(n, r) {
    for (var o = n.length; o--; )
      if (e(n[o][0], r))
        return o;
    return -1;
  }
  return Dv = t, Dv;
}
var Pv, ww;
function q$() {
  if (ww) return Pv;
  ww = 1;
  var e = ad(), t = Array.prototype, n = t.splice;
  function r(o) {
    var u = this.__data__, c = e(u, o);
    if (c < 0)
      return !1;
    var f = u.length - 1;
    return c == f ? u.pop() : n.call(u, c, 1), --this.size, !0;
  }
  return Pv = r, Pv;
}
var Nv, Aw;
function k$() {
  if (Aw) return Nv;
  Aw = 1;
  var e = ad();
  function t(n) {
    var r = this.__data__, o = e(r, n);
    return o < 0 ? void 0 : r[o][1];
  }
  return Nv = t, Nv;
}
var Rv, Tw;
function B$() {
  if (Tw) return Rv;
  Tw = 1;
  var e = ad();
  function t(n) {
    return e(this.__data__, n) > -1;
  }
  return Rv = t, Rv;
}
var $v, Ew;
function L$() {
  if (Ew) return $v;
  Ew = 1;
  var e = ad();
  function t(n, r) {
    var o = this.__data__, u = e(o, n);
    return u < 0 ? (++this.size, o.push([n, r])) : o[u][1] = r, this;
  }
  return $v = t, $v;
}
var zv, jw;
function id() {
  if (jw) return zv;
  jw = 1;
  var e = z$(), t = q$(), n = k$(), r = B$(), o = L$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, zv = u, zv;
}
var qv, Mw;
function L0() {
  if (Mw) return qv;
  Mw = 1;
  var e = gi(), t = vr(), n = e(t, "Map");
  return qv = n, qv;
}
var kv, Cw;
function U$() {
  if (Cw) return kv;
  Cw = 1;
  var e = $$(), t = id(), n = L0();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (n || t)(),
      string: new e()
    };
  }
  return kv = r, kv;
}
var Bv, Dw;
function I$() {
  if (Dw) return Bv;
  Dw = 1;
  function e(t) {
    var n = typeof t;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? t !== "__proto__" : t === null;
  }
  return Bv = e, Bv;
}
var Lv, Pw;
function od() {
  if (Pw) return Lv;
  Pw = 1;
  var e = I$();
  function t(n, r) {
    var o = n.__data__;
    return e(r) ? o[typeof r == "string" ? "string" : "hash"] : o.map;
  }
  return Lv = t, Lv;
}
var Uv, Nw;
function H$() {
  if (Nw) return Uv;
  Nw = 1;
  var e = od();
  function t(n) {
    var r = e(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return Uv = t, Uv;
}
var Iv, Rw;
function G$() {
  if (Rw) return Iv;
  Rw = 1;
  var e = od();
  function t(n) {
    return e(this, n).get(n);
  }
  return Iv = t, Iv;
}
var Hv, $w;
function Y$() {
  if ($w) return Hv;
  $w = 1;
  var e = od();
  function t(n) {
    return e(this, n).has(n);
  }
  return Hv = t, Hv;
}
var Gv, zw;
function K$() {
  if (zw) return Gv;
  zw = 1;
  var e = od();
  function t(n, r) {
    var o = e(this, n), u = o.size;
    return o.set(n, r), this.size += o.size == u ? 0 : 1, this;
  }
  return Gv = t, Gv;
}
var Yv, qw;
function U0() {
  if (qw) return Yv;
  qw = 1;
  var e = U$(), t = H$(), n = G$(), r = Y$(), o = K$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, Yv = u, Yv;
}
var Kv, kw;
function nC() {
  if (kw) return Kv;
  kw = 1;
  var e = U0(), t = "Expected a function";
  function n(r, o) {
    if (typeof r != "function" || o != null && typeof o != "function")
      throw new TypeError(t);
    var u = function() {
      var c = arguments, f = o ? o.apply(this, c) : c[0], d = u.cache;
      if (d.has(f))
        return d.get(f);
      var h = r.apply(this, c);
      return u.cache = d.set(f, h) || d, h;
    };
    return u.cache = new (n.Cache || e)(), u;
  }
  return n.Cache = e, Kv = n, Kv;
}
var Xv, Bw;
function X$() {
  if (Bw) return Xv;
  Bw = 1;
  var e = nC(), t = 500;
  function n(r) {
    var o = e(r, function(c) {
      return u.size === t && u.clear(), c;
    }), u = o.cache;
    return o;
  }
  return Xv = n, Xv;
}
var Vv, Lw;
function V$() {
  if (Lw) return Vv;
  Lw = 1;
  var e = X$(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = e(function(o) {
    var u = [];
    return o.charCodeAt(0) === 46 && u.push(""), o.replace(t, function(c, f, d, h) {
      u.push(d ? h.replace(n, "$1") : f || c);
    }), u;
  });
  return Vv = r, Vv;
}
var Fv, Uw;
function I0() {
  if (Uw) return Fv;
  Uw = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length, u = Array(o); ++r < o; )
      u[r] = n(t[r], r, t);
    return u;
  }
  return Fv = e, Fv;
}
var Wv, Iw;
function F$() {
  if (Iw) return Wv;
  Iw = 1;
  var e = fc(), t = I0(), n = ln(), r = nl(), o = e ? e.prototype : void 0, u = o ? o.toString : void 0;
  function c(f) {
    if (typeof f == "string")
      return f;
    if (n(f))
      return t(f, c) + "";
    if (r(f))
      return u ? u.call(f) : "";
    var d = f + "";
    return d == "0" && 1 / f == -1 / 0 ? "-0" : d;
  }
  return Wv = c, Wv;
}
var Zv, Hw;
function rC() {
  if (Hw) return Zv;
  Hw = 1;
  var e = F$();
  function t(n) {
    return n == null ? "" : e(n);
  }
  return Zv = t, Zv;
}
var Qv, Gw;
function aC() {
  if (Gw) return Qv;
  Gw = 1;
  var e = ln(), t = q0(), n = V$(), r = rC();
  function o(u, c) {
    return e(u) ? u : t(u, c) ? [u] : n(r(u));
  }
  return Qv = o, Qv;
}
var Jv, Yw;
function ld() {
  if (Yw) return Jv;
  Yw = 1;
  var e = nl();
  function t(n) {
    if (typeof n == "string" || e(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return Jv = t, Jv;
}
var ey, Kw;
function H0() {
  if (Kw) return ey;
  Kw = 1;
  var e = aC(), t = ld();
  function n(r, o) {
    o = e(o, r);
    for (var u = 0, c = o.length; r != null && u < c; )
      r = r[t(o[u++])];
    return u && u == c ? r : void 0;
  }
  return ey = n, ey;
}
var ty, Xw;
function iC() {
  if (Xw) return ty;
  Xw = 1;
  var e = H0();
  function t(n, r, o) {
    var u = n == null ? void 0 : e(n, r);
    return u === void 0 ? o : u;
  }
  return ty = t, ty;
}
var W$ = iC();
const Bn = /* @__PURE__ */ tt(W$);
var ny, Vw;
function Z$() {
  if (Vw) return ny;
  Vw = 1;
  function e(t) {
    return t == null;
  }
  return ny = e, ny;
}
var Q$ = Z$();
const we = /* @__PURE__ */ tt(Q$);
var ry, Fw;
function J$() {
  if (Fw) return ry;
  Fw = 1;
  var e = Xr(), t = ln(), n = Vr(), r = "[object String]";
  function o(u) {
    return typeof u == "string" || !t(u) && n(u) && e(u) == r;
  }
  return ry = o, ry;
}
var ez = J$();
const di = /* @__PURE__ */ tt(ez);
var tz = k0();
const Ee = /* @__PURE__ */ tt(tz);
var nz = Da();
const rl = /* @__PURE__ */ tt(nz);
var ay = { exports: {} }, He = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ww;
function rz() {
  if (Ww) return He;
  Ww = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), c = Symbol.for("react.context"), f = Symbol.for("react.server_context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), _;
  _ = Symbol.for("react.module.reference");
  function S(x) {
    if (typeof x == "object" && x !== null) {
      var A = x.$$typeof;
      switch (A) {
        case e:
          switch (x = x.type, x) {
            case n:
            case o:
            case r:
            case h:
            case y:
              return x;
            default:
              switch (x = x && x.$$typeof, x) {
                case f:
                case c:
                case d:
                case g:
                case v:
                case u:
                  return x;
                default:
                  return A;
              }
          }
        case t:
          return A;
      }
    }
  }
  return He.ContextConsumer = c, He.ContextProvider = u, He.Element = e, He.ForwardRef = d, He.Fragment = n, He.Lazy = g, He.Memo = v, He.Portal = t, He.Profiler = o, He.StrictMode = r, He.Suspense = h, He.SuspenseList = y, He.isAsyncMode = function() {
    return !1;
  }, He.isConcurrentMode = function() {
    return !1;
  }, He.isContextConsumer = function(x) {
    return S(x) === c;
  }, He.isContextProvider = function(x) {
    return S(x) === u;
  }, He.isElement = function(x) {
    return typeof x == "object" && x !== null && x.$$typeof === e;
  }, He.isForwardRef = function(x) {
    return S(x) === d;
  }, He.isFragment = function(x) {
    return S(x) === n;
  }, He.isLazy = function(x) {
    return S(x) === g;
  }, He.isMemo = function(x) {
    return S(x) === v;
  }, He.isPortal = function(x) {
    return S(x) === t;
  }, He.isProfiler = function(x) {
    return S(x) === o;
  }, He.isStrictMode = function(x) {
    return S(x) === r;
  }, He.isSuspense = function(x) {
    return S(x) === h;
  }, He.isSuspenseList = function(x) {
    return S(x) === y;
  }, He.isValidElementType = function(x) {
    return typeof x == "string" || typeof x == "function" || x === n || x === o || x === r || x === h || x === y || x === b || typeof x == "object" && x !== null && (x.$$typeof === g || x.$$typeof === v || x.$$typeof === u || x.$$typeof === c || x.$$typeof === d || x.$$typeof === _ || x.getModuleId !== void 0);
  }, He.typeOf = S, He;
}
var Zw;
function az() {
  return Zw || (Zw = 1, ay.exports = rz()), ay.exports;
}
var iz = az(), iy, Qw;
function oC() {
  if (Qw) return iy;
  Qw = 1;
  var e = Xr(), t = Vr(), n = "[object Number]";
  function r(o) {
    return typeof o == "number" || t(o) && e(o) == n;
  }
  return iy = r, iy;
}
var oy, Jw;
function oz() {
  if (Jw) return oy;
  Jw = 1;
  var e = oC();
  function t(n) {
    return e(n) && n != +n;
  }
  return oy = t, oy;
}
var lz = oz();
const al = /* @__PURE__ */ tt(lz);
var uz = oC();
const cz = /* @__PURE__ */ tt(uz);
var Wn = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, ai = function(t) {
  return di(t) && t.indexOf("%") === t.length - 1;
}, de = function(t) {
  return cz(t) && !al(t);
}, sz = function(t) {
  return we(t);
}, wt = function(t) {
  return de(t) || di(t);
}, fz = 0, bi = function(t) {
  var n = ++fz;
  return "".concat(t || "").concat(n);
}, hi = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!de(t) && !di(t))
    return r;
  var u;
  if (ai(t)) {
    var c = t.indexOf("%");
    u = n * parseFloat(t.slice(0, c)) / 100;
  } else
    u = +t;
  return al(u) && (u = r), o && u > n && (u = n), u;
}, Ta = function(t) {
  if (!t)
    return null;
  var n = Object.keys(t);
  return n && n.length ? t[n[0]] : null;
}, dz = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var n = t.length, r = {}, o = 0; o < n; o++)
    if (!r[t[o]])
      r[t[o]] = !0;
    else
      return !0;
  return !1;
}, pt = function(t, n) {
  return de(t) && de(n) ? function(r) {
    return t + r * (n - t);
  } : function() {
    return n;
  };
};
function tf(e, t, n) {
  return !e || !e.length ? null : e.find(function(r) {
    return r && (typeof t == "function" ? t(r) : Bn(r, t)) === n;
  });
}
var hz = function(t) {
  if (!t || !t.length)
    return null;
  for (var n = t.length, r = 0, o = 0, u = 0, c = 0, f = 1 / 0, d = -1 / 0, h = 0, y = 0, v = 0; v < n; v++)
    h = t[v].cx || 0, y = t[v].cy || 0, r += h, o += y, u += h * y, c += h * h, f = Math.min(f, h), d = Math.max(d, h);
  var g = n * c !== r * r ? (n * u - r * o) / (n * c - r * r) : 0;
  return {
    xmin: f,
    xmax: d,
    a: g,
    b: (o - g * r) / n
  };
}, pz = function(t, n) {
  return de(t) && de(n) ? t - n : di(t) && di(n) ? t.localeCompare(n) : t instanceof Date && n instanceof Date ? t.getTime() - n.getTime() : String(t).localeCompare(String(n));
};
function Oo(e, t) {
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && (!{}.hasOwnProperty.call(t, n) || e[n] !== t[n]))
      return !1;
  for (var r in t)
    if ({}.hasOwnProperty.call(t, r) && !{}.hasOwnProperty.call(e, r))
      return !1;
  return !0;
}
function cb(e) {
  "@babel/helpers - typeof";
  return cb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cb(e);
}
var vz = ["viewBox", "children"], yz = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], eA = ["points", "pathLength"], ly = {
  svg: vz,
  polygon: eA,
  polyline: eA
}, G0 = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], nf = function(t, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var r = t;
  if (/* @__PURE__ */ J.isValidElement(t) && (r = t.props), !rl(r))
    return null;
  var o = {};
  return Object.keys(r).forEach(function(u) {
    G0.includes(u) && (o[u] = n || function(c) {
      return r[u](r, c);
    });
  }), o;
}, mz = function(t, n, r) {
  return function(o) {
    return t(n, r, o), null;
  };
}, Mu = function(t, n, r) {
  if (!rl(t) || cb(t) !== "object")
    return null;
  var o = null;
  return Object.keys(t).forEach(function(u) {
    var c = t[u];
    G0.includes(u) && typeof c == "function" && (o || (o = {}), o[u] = mz(c, n, r));
  }), o;
}, gz = ["children"], bz = ["children"];
function tA(e, t) {
  if (e == null) return {};
  var n = xz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function xz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function sb(e) {
  "@babel/helpers - typeof";
  return sb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sb(e);
}
var nA = {
  click: "onClick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick"
}, Lr = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, rA = null, uy = null, Y0 = function e(t) {
  if (t === rA && Array.isArray(uy))
    return uy;
  var n = [];
  return J.Children.forEach(t, function(r) {
    we(r) || (iz.isFragment(r) ? n = n.concat(e(r.props.children)) : n.push(r));
  }), uy = n, rA = t, n;
};
function on(e, t) {
  var n = [], r = [];
  return Array.isArray(t) ? r = t.map(function(o) {
    return Lr(o);
  }) : r = [Lr(t)], Y0(e).forEach(function(o) {
    var u = Bn(o, "type.displayName") || Bn(o, "type.name");
    r.indexOf(u) !== -1 && n.push(o);
  }), n;
}
function xn(e, t) {
  var n = on(e, t);
  return n && n[0];
}
var aA = function(t) {
  if (!t || !t.props)
    return !1;
  var n = t.props, r = n.width, o = n.height;
  return !(!de(r) || r <= 0 || !de(o) || o <= 0);
}, Sz = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], _z = function(t) {
  return t && t.type && di(t.type) && Sz.indexOf(t.type) >= 0;
}, lC = function(t) {
  return t && sb(t) === "object" && "clipDot" in t;
}, Oz = function(t, n, r, o) {
  var u, c = (u = ly == null ? void 0 : ly[o]) !== null && u !== void 0 ? u : [];
  return n.startsWith("data-") || !Ee(t) && (o && c.includes(n) || yz.includes(n)) || r && G0.includes(n);
}, Te = function(t, n, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var o = t;
  if (/* @__PURE__ */ J.isValidElement(t) && (o = t.props), !rl(o))
    return null;
  var u = {};
  return Object.keys(o).forEach(function(c) {
    var f;
    Oz((f = o) === null || f === void 0 ? void 0 : f[c], c, n, r) && (u[c] = o[c]);
  }), u;
}, fb = function e(t, n) {
  if (t === n)
    return !0;
  var r = J.Children.count(t);
  if (r !== J.Children.count(n))
    return !1;
  if (r === 0)
    return !0;
  if (r === 1)
    return iA(Array.isArray(t) ? t[0] : t, Array.isArray(n) ? n[0] : n);
  for (var o = 0; o < r; o++) {
    var u = t[o], c = n[o];
    if (Array.isArray(u) || Array.isArray(c)) {
      if (!e(u, c))
        return !1;
    } else if (!iA(u, c))
      return !1;
  }
  return !0;
}, iA = function(t, n) {
  if (we(t) && we(n))
    return !0;
  if (!we(t) && !we(n)) {
    var r = t.props || {}, o = r.children, u = tA(r, gz), c = n.props || {}, f = c.children, d = tA(c, bz);
    return o && f ? Oo(u, d) && fb(o, f) : !o && !f ? Oo(u, d) : !1;
  }
  return !1;
}, oA = function(t, n) {
  var r = [], o = {};
  return Y0(t).forEach(function(u, c) {
    if (_z(u))
      r.push(u);
    else if (u) {
      var f = Lr(u.type), d = n[f] || {}, h = d.handler, y = d.once;
      if (h && (!y || !o[f])) {
        var v = h(u, f, c);
        r.push(v), o[f] = !0;
      }
    }
  }), r;
}, wz = function(t) {
  var n = t && t.type;
  return n && nA[n] ? nA[n] : null;
}, Az = function(t, n) {
  return Y0(n).indexOf(t);
}, Tz = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function db() {
  return db = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, db.apply(this, arguments);
}
function Ez(e, t) {
  if (e == null) return {};
  var n = jz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function jz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function hb(e) {
  var t = e.children, n = e.width, r = e.height, o = e.viewBox, u = e.className, c = e.style, f = e.title, d = e.desc, h = Ez(e, Tz), y = o || {
    width: n,
    height: r,
    x: 0,
    y: 0
  }, v = $e("recharts-surface", u);
  return /* @__PURE__ */ U.createElement("svg", db({}, Te(h, !0, "svg"), {
    className: v,
    width: n,
    height: r,
    style: c,
    viewBox: "".concat(y.x, " ").concat(y.y, " ").concat(y.width, " ").concat(y.height)
  }), /* @__PURE__ */ U.createElement("title", null, f), /* @__PURE__ */ U.createElement("desc", null, d), t);
}
var Mz = ["children", "className"];
function pb() {
  return pb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, pb.apply(this, arguments);
}
function Cz(e, t) {
  if (e == null) return {};
  var n = Dz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Dz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var Ie = /* @__PURE__ */ U.forwardRef(function(e, t) {
  var n = e.children, r = e.className, o = Cz(e, Mz), u = $e("recharts-layer", r);
  return /* @__PURE__ */ U.createElement("g", pb({
    className: u
  }, Te(o, !0), {
    ref: t
  }), n);
}), Ur = function(t, n) {
  for (var r = arguments.length, o = new Array(r > 2 ? r - 2 : 0), u = 2; u < r; u++)
    o[u - 2] = arguments[u];
}, cy, lA;
function Pz() {
  if (lA) return cy;
  lA = 1;
  function e(t, n, r) {
    var o = -1, u = t.length;
    n < 0 && (n = -n > u ? 0 : u + n), r = r > u ? u : r, r < 0 && (r += u), u = n > r ? 0 : r - n >>> 0, n >>>= 0;
    for (var c = Array(u); ++o < u; )
      c[o] = t[o + n];
    return c;
  }
  return cy = e, cy;
}
var sy, uA;
function Nz() {
  if (uA) return sy;
  uA = 1;
  var e = Pz();
  function t(n, r, o) {
    var u = n.length;
    return o = o === void 0 ? u : o, !r && o >= u ? n : e(n, r, o);
  }
  return sy = t, sy;
}
var fy, cA;
function uC() {
  if (cA) return fy;
  cA = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = t + n + r, u = "\\ufe0e\\ufe0f", c = "\\u200d", f = RegExp("[" + c + e + o + u + "]");
  function d(h) {
    return f.test(h);
  }
  return fy = d, fy;
}
var dy, sA;
function Rz() {
  if (sA) return dy;
  sA = 1;
  function e(t) {
    return t.split("");
  }
  return dy = e, dy;
}
var hy, fA;
function $z() {
  if (fA) return hy;
  fA = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = t + n + r, u = "\\ufe0e\\ufe0f", c = "[" + e + "]", f = "[" + o + "]", d = "\\ud83c[\\udffb-\\udfff]", h = "(?:" + f + "|" + d + ")", y = "[^" + e + "]", v = "(?:\\ud83c[\\udde6-\\uddff]){2}", g = "[\\ud800-\\udbff][\\udc00-\\udfff]", b = "\\u200d", _ = h + "?", S = "[" + u + "]?", x = "(?:" + b + "(?:" + [y, v, g].join("|") + ")" + S + _ + ")*", A = S + _ + x, E = "(?:" + [y + f + "?", f, v, g, c].join("|") + ")", M = RegExp(d + "(?=" + d + ")|" + E + A, "g");
  function C(w) {
    return w.match(M) || [];
  }
  return hy = C, hy;
}
var py, dA;
function zz() {
  if (dA) return py;
  dA = 1;
  var e = Rz(), t = uC(), n = $z();
  function r(o) {
    return t(o) ? n(o) : e(o);
  }
  return py = r, py;
}
var vy, hA;
function qz() {
  if (hA) return vy;
  hA = 1;
  var e = Nz(), t = uC(), n = zz(), r = rC();
  function o(u) {
    return function(c) {
      c = r(c);
      var f = t(c) ? n(c) : void 0, d = f ? f[0] : c.charAt(0), h = f ? e(f, 1).join("") : c.slice(1);
      return d[u]() + h;
    };
  }
  return vy = o, vy;
}
var yy, pA;
function kz() {
  if (pA) return yy;
  pA = 1;
  var e = qz(), t = e("toUpperCase");
  return yy = t, yy;
}
var Bz = kz();
const ud = /* @__PURE__ */ tt(Bz);
function nt(e) {
  return function() {
    return e;
  };
}
const cC = Math.cos, rf = Math.sin, Qn = Math.sqrt, af = Math.PI, cd = 2 * af, vb = Math.PI, yb = 2 * vb, ni = 1e-6, Lz = yb - ni;
function sC(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function Uz(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return sC;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let o = 1, u = r.length; o < u; ++o)
      this._ += Math.round(arguments[o] * n) / n + r[o];
  };
}
class Iz {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? sC : Uz(t);
  }
  moveTo(t, n) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, n) {
    this._append`L${this._x1 = +t},${this._y1 = +n}`;
  }
  quadraticCurveTo(t, n, r, o) {
    this._append`Q${+t},${+n},${this._x1 = +r},${this._y1 = +o}`;
  }
  bezierCurveTo(t, n, r, o, u, c) {
    this._append`C${+t},${+n},${+r},${+o},${this._x1 = +u},${this._y1 = +c}`;
  }
  arcTo(t, n, r, o, u) {
    if (t = +t, n = +n, r = +r, o = +o, u = +u, u < 0) throw new Error(`negative radius: ${u}`);
    let c = this._x1, f = this._y1, d = r - t, h = o - n, y = c - t, v = f - n, g = y * y + v * v;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (g > ni) if (!(Math.abs(v * d - h * y) > ni) || !u)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let b = r - c, _ = o - f, S = d * d + h * h, x = b * b + _ * _, A = Math.sqrt(S), E = Math.sqrt(g), M = u * Math.tan((vb - Math.acos((S + g - x) / (2 * A * E))) / 2), C = M / E, w = M / A;
      Math.abs(C - 1) > ni && this._append`L${t + C * y},${n + C * v}`, this._append`A${u},${u},0,0,${+(v * b > y * _)},${this._x1 = t + w * d},${this._y1 = n + w * h}`;
    }
  }
  arc(t, n, r, o, u, c) {
    if (t = +t, n = +n, r = +r, c = !!c, r < 0) throw new Error(`negative radius: ${r}`);
    let f = r * Math.cos(o), d = r * Math.sin(o), h = t + f, y = n + d, v = 1 ^ c, g = c ? o - u : u - o;
    this._x1 === null ? this._append`M${h},${y}` : (Math.abs(this._x1 - h) > ni || Math.abs(this._y1 - y) > ni) && this._append`L${h},${y}`, r && (g < 0 && (g = g % yb + yb), g > Lz ? this._append`A${r},${r},0,1,${v},${t - f},${n - d}A${r},${r},0,1,${v},${this._x1 = h},${this._y1 = y}` : g > ni && this._append`A${r},${r},0,${+(g >= vb)},${v},${this._x1 = t + r * Math.cos(u)},${this._y1 = n + r * Math.sin(u)}`);
  }
  rect(t, n, r, o) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+o}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function K0(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length) return t;
    if (n == null)
      t = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      t = r;
    }
    return e;
  }, () => new Iz(t);
}
function X0(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function fC(e) {
  this._context = e;
}
fC.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function sd(e) {
  return new fC(e);
}
function dC(e) {
  return e[0];
}
function hC(e) {
  return e[1];
}
function pC(e, t) {
  var n = nt(!0), r = null, o = sd, u = null, c = K0(f);
  e = typeof e == "function" ? e : e === void 0 ? dC : nt(e), t = typeof t == "function" ? t : t === void 0 ? hC : nt(t);
  function f(d) {
    var h, y = (d = X0(d)).length, v, g = !1, b;
    for (r == null && (u = o(b = c())), h = 0; h <= y; ++h)
      !(h < y && n(v = d[h], h, d)) === g && ((g = !g) ? u.lineStart() : u.lineEnd()), g && u.point(+e(v, h, d), +t(v, h, d));
    if (b) return u = null, b + "" || null;
  }
  return f.x = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : nt(+d), f) : e;
  }, f.y = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : nt(+d), f) : t;
  }, f.defined = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : nt(!!d), f) : n;
  }, f.curve = function(d) {
    return arguments.length ? (o = d, r != null && (u = o(r)), f) : o;
  }, f.context = function(d) {
    return arguments.length ? (d == null ? r = u = null : u = o(r = d), f) : r;
  }, f;
}
function zs(e, t, n) {
  var r = null, o = nt(!0), u = null, c = sd, f = null, d = K0(h);
  e = typeof e == "function" ? e : e === void 0 ? dC : nt(+e), t = typeof t == "function" ? t : nt(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? hC : nt(+n);
  function h(v) {
    var g, b, _, S = (v = X0(v)).length, x, A = !1, E, M = new Array(S), C = new Array(S);
    for (u == null && (f = c(E = d())), g = 0; g <= S; ++g) {
      if (!(g < S && o(x = v[g], g, v)) === A)
        if (A = !A)
          b = g, f.areaStart(), f.lineStart();
        else {
          for (f.lineEnd(), f.lineStart(), _ = g - 1; _ >= b; --_)
            f.point(M[_], C[_]);
          f.lineEnd(), f.areaEnd();
        }
      A && (M[g] = +e(x, g, v), C[g] = +t(x, g, v), f.point(r ? +r(x, g, v) : M[g], n ? +n(x, g, v) : C[g]));
    }
    if (E) return f = null, E + "" || null;
  }
  function y() {
    return pC().defined(o).curve(c).context(u);
  }
  return h.x = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : nt(+v), r = null, h) : e;
  }, h.x0 = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : nt(+v), h) : e;
  }, h.x1 = function(v) {
    return arguments.length ? (r = v == null ? null : typeof v == "function" ? v : nt(+v), h) : r;
  }, h.y = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : nt(+v), n = null, h) : t;
  }, h.y0 = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : nt(+v), h) : t;
  }, h.y1 = function(v) {
    return arguments.length ? (n = v == null ? null : typeof v == "function" ? v : nt(+v), h) : n;
  }, h.lineX0 = h.lineY0 = function() {
    return y().x(e).y(t);
  }, h.lineY1 = function() {
    return y().x(e).y(n);
  }, h.lineX1 = function() {
    return y().x(r).y(t);
  }, h.defined = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : nt(!!v), h) : o;
  }, h.curve = function(v) {
    return arguments.length ? (c = v, u != null && (f = c(u)), h) : c;
  }, h.context = function(v) {
    return arguments.length ? (v == null ? u = f = null : f = c(u = v), h) : u;
  }, h;
}
class vC {
  constructor(t, n) {
    this._context = t, this._x = n;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, n) {
    switch (t = +t, n = +n, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, n, t, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, t, this._y0, t, n);
        break;
      }
    }
    this._x0 = t, this._y0 = n;
  }
}
function Hz(e) {
  return new vC(e, !0);
}
function Gz(e) {
  return new vC(e, !1);
}
const V0 = {
  draw(e, t) {
    const n = Qn(t / af);
    e.moveTo(n, 0), e.arc(0, 0, n, 0, cd);
  }
}, Yz = {
  draw(e, t) {
    const n = Qn(t / 5) / 2;
    e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
  }
}, yC = Qn(1 / 3), Kz = yC * 2, Xz = {
  draw(e, t) {
    const n = Qn(t / Kz), r = n * yC;
    e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
  }
}, Vz = {
  draw(e, t) {
    const n = Qn(t), r = -n / 2;
    e.rect(r, r, n, n);
  }
}, Fz = 0.8908130915292852, mC = rf(af / 10) / rf(7 * af / 10), Wz = rf(cd / 10) * mC, Zz = -cC(cd / 10) * mC, Qz = {
  draw(e, t) {
    const n = Qn(t * Fz), r = Wz * n, o = Zz * n;
    e.moveTo(0, -n), e.lineTo(r, o);
    for (let u = 1; u < 5; ++u) {
      const c = cd * u / 5, f = cC(c), d = rf(c);
      e.lineTo(d * n, -f * n), e.lineTo(f * r - d * o, d * r + f * o);
    }
    e.closePath();
  }
}, my = Qn(3), Jz = {
  draw(e, t) {
    const n = -Qn(t / (my * 3));
    e.moveTo(0, n * 2), e.lineTo(-my * n, -n), e.lineTo(my * n, -n), e.closePath();
  }
}, Rn = -0.5, $n = Qn(3) / 2, mb = 1 / Qn(12), eq = (mb / 2 + 1) * 3, tq = {
  draw(e, t) {
    const n = Qn(t / eq), r = n / 2, o = n * mb, u = r, c = n * mb + n, f = -u, d = c;
    e.moveTo(r, o), e.lineTo(u, c), e.lineTo(f, d), e.lineTo(Rn * r - $n * o, $n * r + Rn * o), e.lineTo(Rn * u - $n * c, $n * u + Rn * c), e.lineTo(Rn * f - $n * d, $n * f + Rn * d), e.lineTo(Rn * r + $n * o, Rn * o - $n * r), e.lineTo(Rn * u + $n * c, Rn * c - $n * u), e.lineTo(Rn * f + $n * d, Rn * d - $n * f), e.closePath();
  }
};
function nq(e, t) {
  let n = null, r = K0(o);
  e = typeof e == "function" ? e : nt(e || V0), t = typeof t == "function" ? t : nt(t === void 0 ? 64 : +t);
  function o() {
    let u;
    if (n || (n = u = r()), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), u) return n = null, u + "" || null;
  }
  return o.type = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : nt(u), o) : e;
  }, o.size = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : nt(+u), o) : t;
  }, o.context = function(u) {
    return arguments.length ? (n = u ?? null, o) : n;
  }, o;
}
function of() {
}
function lf(e, t, n) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + n) / 6
  );
}
function gC(e) {
  this._context = e;
}
gC.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        lf(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        lf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function rq(e) {
  return new gC(e);
}
function bC(e) {
  this._context = e;
}
bC.prototype = {
  areaStart: of,
  areaEnd: of,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        lf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function aq(e) {
  return new bC(e);
}
function xC(e) {
  this._context = e;
}
xC.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        lf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function iq(e) {
  return new xC(e);
}
function SC(e) {
  this._context = e;
}
SC.prototype = {
  areaStart: of,
  areaEnd: of,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function oq(e) {
  return new SC(e);
}
function vA(e) {
  return e < 0 ? -1 : 1;
}
function yA(e, t, n) {
  var r = e._x1 - e._x0, o = t - e._x1, u = (e._y1 - e._y0) / (r || o < 0 && -0), c = (n - e._y1) / (o || r < 0 && -0), f = (u * o + c * r) / (r + o);
  return (vA(u) + vA(c)) * Math.min(Math.abs(u), Math.abs(c), 0.5 * Math.abs(f)) || 0;
}
function mA(e, t) {
  var n = e._x1 - e._x0;
  return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function gy(e, t, n) {
  var r = e._x0, o = e._y0, u = e._x1, c = e._y1, f = (u - r) / 3;
  e._context.bezierCurveTo(r + f, o + f * t, u - f, c - f * n, u, c);
}
function uf(e) {
  this._context = e;
}
uf.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        gy(this, this._t0, mA(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var n = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, gy(this, mA(this, n = yA(this, e, t)), n);
          break;
        default:
          gy(this, this._t0, n = yA(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
    }
  }
};
function _C(e) {
  this._context = new OC(e);
}
(_C.prototype = Object.create(uf.prototype)).point = function(e, t) {
  uf.prototype.point.call(this, t, e);
};
function OC(e) {
  this._context = e;
}
OC.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, n, r, o, u) {
    this._context.bezierCurveTo(t, e, r, n, u, o);
  }
};
function lq(e) {
  return new uf(e);
}
function uq(e) {
  return new _C(e);
}
function wC(e) {
  this._context = e;
}
wC.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, n = e.length;
    if (n)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var r = gA(e), o = gA(t), u = 0, c = 1; c < n; ++u, ++c)
          this._context.bezierCurveTo(r[0][u], o[0][u], r[1][u], o[1][u], e[c], t[c]);
    (this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function gA(e) {
  var t, n = e.length - 1, r, o = new Array(n), u = new Array(n), c = new Array(n);
  for (o[0] = 0, u[0] = 2, c[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) o[t] = 1, u[t] = 4, c[t] = 4 * e[t] + 2 * e[t + 1];
  for (o[n - 1] = 2, u[n - 1] = 7, c[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = o[t] / u[t - 1], u[t] -= r, c[t] -= r * c[t - 1];
  for (o[n - 1] = c[n - 1] / u[n - 1], t = n - 2; t >= 0; --t) o[t] = (c[t] - o[t + 1]) / u[t];
  for (u[n - 1] = (e[n] + o[n - 1]) / 2, t = 0; t < n - 1; ++t) u[t] = 2 * e[t + 1] - o[t + 1];
  return [o, u];
}
function cq(e) {
  return new wC(e);
}
function fd(e, t) {
  this._context = e, this._t = t;
}
fd.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var n = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(n, this._y), this._context.lineTo(n, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function sq(e) {
  return new fd(e, 0.5);
}
function fq(e) {
  return new fd(e, 0);
}
function dq(e) {
  return new fd(e, 1);
}
function jo(e, t) {
  if ((c = e.length) > 1)
    for (var n = 1, r, o, u = e[t[0]], c, f = u.length; n < c; ++n)
      for (o = u, u = e[t[n]], r = 0; r < f; ++r)
        u[r][1] += u[r][0] = isNaN(o[r][1]) ? o[r][0] : o[r][1];
}
function gb(e) {
  for (var t = e.length, n = new Array(t); --t >= 0; ) n[t] = t;
  return n;
}
function hq(e, t) {
  return e[t];
}
function pq(e) {
  const t = [];
  return t.key = e, t;
}
function vq() {
  var e = nt([]), t = gb, n = jo, r = hq;
  function o(u) {
    var c = Array.from(e.apply(this, arguments), pq), f, d = c.length, h = -1, y;
    for (const v of u)
      for (f = 0, ++h; f < d; ++f)
        (c[f][h] = [0, +r(v, c[f].key, h, u)]).data = v;
    for (f = 0, y = X0(t(c)); f < d; ++f)
      c[y[f]].index = f;
    return n(c, y), c;
  }
  return o.keys = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : nt(Array.from(u)), o) : e;
  }, o.value = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : nt(+u), o) : r;
  }, o.order = function(u) {
    return arguments.length ? (t = u == null ? gb : typeof u == "function" ? u : nt(Array.from(u)), o) : t;
  }, o.offset = function(u) {
    return arguments.length ? (n = u ?? jo, o) : n;
  }, o;
}
function yq(e, t) {
  if ((r = e.length) > 0) {
    for (var n, r, o = 0, u = e[0].length, c; o < u; ++o) {
      for (c = n = 0; n < r; ++n) c += e[n][o][1] || 0;
      if (c) for (n = 0; n < r; ++n) e[n][o][1] /= c;
    }
    jo(e, t);
  }
}
function mq(e, t) {
  if ((o = e.length) > 0) {
    for (var n = 0, r = e[t[0]], o, u = r.length; n < u; ++n) {
      for (var c = 0, f = 0; c < o; ++c) f += e[c][n][1] || 0;
      r[n][1] += r[n][0] = -f / 2;
    }
    jo(e, t);
  }
}
function gq(e, t) {
  if (!(!((c = e.length) > 0) || !((u = (o = e[t[0]]).length) > 0))) {
    for (var n = 0, r = 1, o, u, c; r < u; ++r) {
      for (var f = 0, d = 0, h = 0; f < c; ++f) {
        for (var y = e[t[f]], v = y[r][1] || 0, g = y[r - 1][1] || 0, b = (v - g) / 2, _ = 0; _ < f; ++_) {
          var S = e[t[_]], x = S[r][1] || 0, A = S[r - 1][1] || 0;
          b += x - A;
        }
        d += v, h += b * v;
      }
      o[r - 1][1] += o[r - 1][0] = n, d && (n -= h / d);
    }
    o[r - 1][1] += o[r - 1][0] = n, jo(e, t);
  }
}
function Cu(e) {
  "@babel/helpers - typeof";
  return Cu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Cu(e);
}
var bq = ["type", "size", "sizeType"];
function bb() {
  return bb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, bb.apply(this, arguments);
}
function bA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function xA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bA(Object(n), !0).forEach(function(r) {
      xq(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bA(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function xq(e, t, n) {
  return t = Sq(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Sq(e) {
  var t = _q(e, "string");
  return Cu(t) == "symbol" ? t : t + "";
}
function _q(e, t) {
  if (Cu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Cu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Oq(e, t) {
  if (e == null) return {};
  var n = wq(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function wq(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var AC = {
  symbolCircle: V0,
  symbolCross: Yz,
  symbolDiamond: Xz,
  symbolSquare: Vz,
  symbolStar: Qz,
  symbolTriangle: Jz,
  symbolWye: tq
}, Aq = Math.PI / 180, Tq = function(t) {
  var n = "symbol".concat(ud(t));
  return AC[n] || V0;
}, Eq = function(t, n, r) {
  if (n === "area")
    return t;
  switch (r) {
    case "cross":
      return 5 * t * t / 9;
    case "diamond":
      return 0.5 * t * t / Math.sqrt(3);
    case "square":
      return t * t;
    case "star": {
      var o = 18 * Aq;
      return 1.25 * t * t * (Math.tan(o) - Math.tan(o * 2) * Math.pow(Math.tan(o), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, jq = function(t, n) {
  AC["symbol".concat(ud(t))] = n;
}, dd = function(t) {
  var n = t.type, r = n === void 0 ? "circle" : n, o = t.size, u = o === void 0 ? 64 : o, c = t.sizeType, f = c === void 0 ? "area" : c, d = Oq(t, bq), h = xA(xA({}, d), {}, {
    type: r,
    size: u,
    sizeType: f
  }), y = function() {
    var x = Tq(r), A = nq().type(x).size(Eq(u, f, r));
    return A();
  }, v = h.className, g = h.cx, b = h.cy, _ = Te(h, !0);
  return g === +g && b === +b && u === +u ? /* @__PURE__ */ U.createElement("path", bb({}, _, {
    className: $e("recharts-symbols", v),
    transform: "translate(".concat(g, ", ").concat(b, ")"),
    d: y()
  })) : null;
};
dd.registerSymbol = jq;
function Mo(e) {
  "@babel/helpers - typeof";
  return Mo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mo(e);
}
function xb() {
  return xb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, xb.apply(this, arguments);
}
function SA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Mq(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? SA(Object(n), !0).forEach(function(r) {
      Du(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : SA(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Cq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Dq(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, EC(r.key), r);
  }
}
function Pq(e, t, n) {
  return t && Dq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Nq(e, t, n) {
  return t = cf(t), Rq(e, TC() ? Reflect.construct(t, n || [], cf(e).constructor) : t.apply(e, n));
}
function Rq(e, t) {
  if (t && (Mo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $q(e);
}
function $q(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function TC() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (TC = function() {
    return !!e;
  })();
}
function cf(e) {
  return cf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, cf(e);
}
function zq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Sb(e, t);
}
function Sb(e, t) {
  return Sb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Sb(e, t);
}
function Du(e, t, n) {
  return t = EC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function EC(e) {
  var t = qq(e, "string");
  return Mo(t) == "symbol" ? t : t + "";
}
function qq(e, t) {
  if (Mo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Mo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var zn = 32, F0 = /* @__PURE__ */ (function(e) {
  function t() {
    return Cq(this, t), Nq(this, t, arguments);
  }
  return zq(t, e), Pq(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(r) {
        var o = this.props.inactiveColor, u = zn / 2, c = zn / 6, f = zn / 3, d = r.inactive ? o : r.color;
        if (r.type === "plainline")
          return /* @__PURE__ */ U.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: d,
            strokeDasharray: r.payload.strokeDasharray,
            x1: 0,
            y1: u,
            x2: zn,
            y2: u,
            className: "recharts-legend-icon"
          });
        if (r.type === "line")
          return /* @__PURE__ */ U.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: d,
            d: "M0,".concat(u, "h").concat(f, `
            A`).concat(c, ",").concat(c, ",0,1,1,").concat(2 * f, ",").concat(u, `
            H`).concat(zn, "M").concat(2 * f, ",").concat(u, `
            A`).concat(c, ",").concat(c, ",0,1,1,").concat(f, ",").concat(u),
            className: "recharts-legend-icon"
          });
        if (r.type === "rect")
          return /* @__PURE__ */ U.createElement("path", {
            stroke: "none",
            fill: d,
            d: "M0,".concat(zn / 8, "h").concat(zn, "v").concat(zn * 3 / 4, "h").concat(-zn, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ U.isValidElement(r.legendIcon)) {
          var h = Mq({}, r);
          return delete h.legendIcon, /* @__PURE__ */ U.cloneElement(r.legendIcon, h);
        }
        return /* @__PURE__ */ U.createElement(dd, {
          fill: d,
          cx: u,
          cy: u,
          size: zn,
          sizeType: "diameter",
          type: r.type
        });
      }
    )
    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function() {
      var r = this, o = this.props, u = o.payload, c = o.iconSize, f = o.layout, d = o.formatter, h = o.inactiveColor, y = {
        x: 0,
        y: 0,
        width: zn,
        height: zn
      }, v = {
        display: f === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, g = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return u.map(function(b, _) {
        var S = b.formatter || d, x = $e(Du(Du({
          "recharts-legend-item": !0
        }, "legend-item-".concat(_), !0), "inactive", b.inactive));
        if (b.type === "none")
          return null;
        var A = Ee(b.value) ? null : b.value;
        Ur(
          !Ee(b.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var E = b.inactive ? h : b.color;
        return /* @__PURE__ */ U.createElement("li", xb({
          className: x,
          style: v,
          key: "legend-item-".concat(_)
        }, Mu(r.props, b, _)), /* @__PURE__ */ U.createElement(hb, {
          width: c,
          height: c,
          viewBox: y,
          style: g
        }, r.renderIcon(b)), /* @__PURE__ */ U.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: E
          }
        }, S ? S(A, b, _) : A));
      });
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props, o = r.payload, u = r.layout, c = r.align;
      if (!o || !o.length)
        return null;
      var f = {
        padding: 0,
        margin: 0,
        textAlign: u === "horizontal" ? c : "left"
      };
      return /* @__PURE__ */ U.createElement("ul", {
        className: "recharts-default-legend",
        style: f
      }, this.renderItems());
    }
  }]);
})(J.PureComponent);
Du(F0, "displayName", "Legend");
Du(F0, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var by, _A;
function kq() {
  if (_A) return by;
  _A = 1;
  var e = id();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return by = t, by;
}
var xy, OA;
function Bq() {
  if (OA) return xy;
  OA = 1;
  function e(t) {
    var n = this.__data__, r = n.delete(t);
    return this.size = n.size, r;
  }
  return xy = e, xy;
}
var Sy, wA;
function Lq() {
  if (wA) return Sy;
  wA = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Sy = e, Sy;
}
var _y, AA;
function Uq() {
  if (AA) return _y;
  AA = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return _y = e, _y;
}
var Oy, TA;
function Iq() {
  if (TA) return Oy;
  TA = 1;
  var e = id(), t = L0(), n = U0(), r = 200;
  function o(u, c) {
    var f = this.__data__;
    if (f instanceof e) {
      var d = f.__data__;
      if (!t || d.length < r - 1)
        return d.push([u, c]), this.size = ++f.size, this;
      f = this.__data__ = new n(d);
    }
    return f.set(u, c), this.size = f.size, this;
  }
  return Oy = o, Oy;
}
var wy, EA;
function jC() {
  if (EA) return wy;
  EA = 1;
  var e = id(), t = kq(), n = Bq(), r = Lq(), o = Uq(), u = Iq();
  function c(f) {
    var d = this.__data__ = new e(f);
    this.size = d.size;
  }
  return c.prototype.clear = t, c.prototype.delete = n, c.prototype.get = r, c.prototype.has = o, c.prototype.set = u, wy = c, wy;
}
var Ay, jA;
function Hq() {
  if (jA) return Ay;
  jA = 1;
  var e = "__lodash_hash_undefined__";
  function t(n) {
    return this.__data__.set(n, e), this;
  }
  return Ay = t, Ay;
}
var Ty, MA;
function Gq() {
  if (MA) return Ty;
  MA = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Ty = e, Ty;
}
var Ey, CA;
function MC() {
  if (CA) return Ey;
  CA = 1;
  var e = U0(), t = Hq(), n = Gq();
  function r(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.__data__ = new e(); ++u < c; )
      this.add(o[u]);
  }
  return r.prototype.add = r.prototype.push = t, r.prototype.has = n, Ey = r, Ey;
}
var jy, DA;
function CC() {
  if (DA) return jy;
  DA = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length; ++r < o; )
      if (n(t[r], r, t))
        return !0;
    return !1;
  }
  return jy = e, jy;
}
var My, PA;
function DC() {
  if (PA) return My;
  PA = 1;
  function e(t, n) {
    return t.has(n);
  }
  return My = e, My;
}
var Cy, NA;
function PC() {
  if (NA) return Cy;
  NA = 1;
  var e = MC(), t = CC(), n = DC(), r = 1, o = 2;
  function u(c, f, d, h, y, v) {
    var g = d & r, b = c.length, _ = f.length;
    if (b != _ && !(g && _ > b))
      return !1;
    var S = v.get(c), x = v.get(f);
    if (S && x)
      return S == f && x == c;
    var A = -1, E = !0, M = d & o ? new e() : void 0;
    for (v.set(c, f), v.set(f, c); ++A < b; ) {
      var C = c[A], w = f[A];
      if (h)
        var T = g ? h(w, C, A, f, c, v) : h(C, w, A, c, f, v);
      if (T !== void 0) {
        if (T)
          continue;
        E = !1;
        break;
      }
      if (M) {
        if (!t(f, function(j, N) {
          if (!n(M, N) && (C === j || y(C, j, d, h, v)))
            return M.push(N);
        })) {
          E = !1;
          break;
        }
      } else if (!(C === w || y(C, w, d, h, v))) {
        E = !1;
        break;
      }
    }
    return v.delete(c), v.delete(f), E;
  }
  return Cy = u, Cy;
}
var Dy, RA;
function Yq() {
  if (RA) return Dy;
  RA = 1;
  var e = vr(), t = e.Uint8Array;
  return Dy = t, Dy;
}
var Py, $A;
function Kq() {
  if ($A) return Py;
  $A = 1;
  function e(t) {
    var n = -1, r = Array(t.size);
    return t.forEach(function(o, u) {
      r[++n] = [u, o];
    }), r;
  }
  return Py = e, Py;
}
var Ny, zA;
function W0() {
  if (zA) return Ny;
  zA = 1;
  function e(t) {
    var n = -1, r = Array(t.size);
    return t.forEach(function(o) {
      r[++n] = o;
    }), r;
  }
  return Ny = e, Ny;
}
var Ry, qA;
function Xq() {
  if (qA) return Ry;
  qA = 1;
  var e = fc(), t = Yq(), n = B0(), r = PC(), o = Kq(), u = W0(), c = 1, f = 2, d = "[object Boolean]", h = "[object Date]", y = "[object Error]", v = "[object Map]", g = "[object Number]", b = "[object RegExp]", _ = "[object Set]", S = "[object String]", x = "[object Symbol]", A = "[object ArrayBuffer]", E = "[object DataView]", M = e ? e.prototype : void 0, C = M ? M.valueOf : void 0;
  function w(T, j, N, z, k, B, q) {
    switch (N) {
      case E:
        if (T.byteLength != j.byteLength || T.byteOffset != j.byteOffset)
          return !1;
        T = T.buffer, j = j.buffer;
      case A:
        return !(T.byteLength != j.byteLength || !B(new t(T), new t(j)));
      case d:
      case h:
      case g:
        return n(+T, +j);
      case y:
        return T.name == j.name && T.message == j.message;
      case b:
      case S:
        return T == j + "";
      case v:
        var V = o;
      case _:
        var Y = z & c;
        if (V || (V = u), T.size != j.size && !Y)
          return !1;
        var F = q.get(T);
        if (F)
          return F == j;
        z |= f, q.set(T, j);
        var $ = r(V(T), V(j), z, k, B, q);
        return q.delete(T), $;
      case x:
        if (C)
          return C.call(T) == C.call(j);
    }
    return !1;
  }
  return Ry = w, Ry;
}
var $y, kA;
function NC() {
  if (kA) return $y;
  kA = 1;
  function e(t, n) {
    for (var r = -1, o = n.length, u = t.length; ++r < o; )
      t[u + r] = n[r];
    return t;
  }
  return $y = e, $y;
}
var zy, BA;
function Vq() {
  if (BA) return zy;
  BA = 1;
  var e = NC(), t = ln();
  function n(r, o, u) {
    var c = o(r);
    return t(r) ? c : e(c, u(r));
  }
  return zy = n, zy;
}
var qy, LA;
function Fq() {
  if (LA) return qy;
  LA = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length, u = 0, c = []; ++r < o; ) {
      var f = t[r];
      n(f, r, t) && (c[u++] = f);
    }
    return c;
  }
  return qy = e, qy;
}
var ky, UA;
function Wq() {
  if (UA) return ky;
  UA = 1;
  function e() {
    return [];
  }
  return ky = e, ky;
}
var By, IA;
function Zq() {
  if (IA) return By;
  IA = 1;
  var e = Fq(), t = Wq(), n = Object.prototype, r = n.propertyIsEnumerable, o = Object.getOwnPropertySymbols, u = o ? function(c) {
    return c == null ? [] : (c = Object(c), e(o(c), function(f) {
      return r.call(c, f);
    }));
  } : t;
  return By = u, By;
}
var Ly, HA;
function Qq() {
  if (HA) return Ly;
  HA = 1;
  function e(t, n) {
    for (var r = -1, o = Array(t); ++r < t; )
      o[r] = n(r);
    return o;
  }
  return Ly = e, Ly;
}
var Uy, GA;
function Jq() {
  if (GA) return Uy;
  GA = 1;
  var e = Xr(), t = Vr(), n = "[object Arguments]";
  function r(o) {
    return t(o) && e(o) == n;
  }
  return Uy = r, Uy;
}
var Iy, YA;
function Z0() {
  if (YA) return Iy;
  YA = 1;
  var e = Jq(), t = Vr(), n = Object.prototype, r = n.hasOwnProperty, o = n.propertyIsEnumerable, u = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(c) {
    return t(c) && r.call(c, "callee") && !o.call(c, "callee");
  };
  return Iy = u, Iy;
}
var vu = { exports: {} }, Hy, KA;
function ek() {
  if (KA) return Hy;
  KA = 1;
  function e() {
    return !1;
  }
  return Hy = e, Hy;
}
vu.exports;
var XA;
function RC() {
  return XA || (XA = 1, (function(e, t) {
    var n = vr(), r = ek(), o = t && !t.nodeType && t, u = o && !0 && e && !e.nodeType && e, c = u && u.exports === o, f = c ? n.Buffer : void 0, d = f ? f.isBuffer : void 0, h = d || r;
    e.exports = h;
  })(vu, vu.exports)), vu.exports;
}
var Gy, VA;
function Q0() {
  if (VA) return Gy;
  VA = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function n(r, o) {
    var u = typeof r;
    return o = o ?? e, !!o && (u == "number" || u != "symbol" && t.test(r)) && r > -1 && r % 1 == 0 && r < o;
  }
  return Gy = n, Gy;
}
var Yy, FA;
function J0() {
  if (FA) return Yy;
  FA = 1;
  var e = 9007199254740991;
  function t(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= e;
  }
  return Yy = t, Yy;
}
var Ky, WA;
function tk() {
  if (WA) return Ky;
  WA = 1;
  var e = Xr(), t = J0(), n = Vr(), r = "[object Arguments]", o = "[object Array]", u = "[object Boolean]", c = "[object Date]", f = "[object Error]", d = "[object Function]", h = "[object Map]", y = "[object Number]", v = "[object Object]", g = "[object RegExp]", b = "[object Set]", _ = "[object String]", S = "[object WeakMap]", x = "[object ArrayBuffer]", A = "[object DataView]", E = "[object Float32Array]", M = "[object Float64Array]", C = "[object Int8Array]", w = "[object Int16Array]", T = "[object Int32Array]", j = "[object Uint8Array]", N = "[object Uint8ClampedArray]", z = "[object Uint16Array]", k = "[object Uint32Array]", B = {};
  B[E] = B[M] = B[C] = B[w] = B[T] = B[j] = B[N] = B[z] = B[k] = !0, B[r] = B[o] = B[x] = B[u] = B[A] = B[c] = B[f] = B[d] = B[h] = B[y] = B[v] = B[g] = B[b] = B[_] = B[S] = !1;
  function q(V) {
    return n(V) && t(V.length) && !!B[e(V)];
  }
  return Ky = q, Ky;
}
var Xy, ZA;
function $C() {
  if (ZA) return Xy;
  ZA = 1;
  function e(t) {
    return function(n) {
      return t(n);
    };
  }
  return Xy = e, Xy;
}
var yu = { exports: {} };
yu.exports;
var QA;
function nk() {
  return QA || (QA = 1, (function(e, t) {
    var n = eC(), r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, u = o && o.exports === r, c = u && n.process, f = (function() {
      try {
        var d = o && o.require && o.require("util").types;
        return d || c && c.binding && c.binding("util");
      } catch {
      }
    })();
    e.exports = f;
  })(yu, yu.exports)), yu.exports;
}
var Vy, JA;
function zC() {
  if (JA) return Vy;
  JA = 1;
  var e = tk(), t = $C(), n = nk(), r = n && n.isTypedArray, o = r ? t(r) : e;
  return Vy = o, Vy;
}
var Fy, eT;
function rk() {
  if (eT) return Fy;
  eT = 1;
  var e = Qq(), t = Z0(), n = ln(), r = RC(), o = Q0(), u = zC(), c = Object.prototype, f = c.hasOwnProperty;
  function d(h, y) {
    var v = n(h), g = !v && t(h), b = !v && !g && r(h), _ = !v && !g && !b && u(h), S = v || g || b || _, x = S ? e(h.length, String) : [], A = x.length;
    for (var E in h)
      (y || f.call(h, E)) && !(S && // Safari 9 has enumerable `arguments.length` in strict mode.
      (E == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      b && (E == "offset" || E == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      _ && (E == "buffer" || E == "byteLength" || E == "byteOffset") || // Skip index properties.
      o(E, A))) && x.push(E);
    return x;
  }
  return Fy = d, Fy;
}
var Wy, tT;
function ak() {
  if (tT) return Wy;
  tT = 1;
  var e = Object.prototype;
  function t(n) {
    var r = n && n.constructor, o = typeof r == "function" && r.prototype || e;
    return n === o;
  }
  return Wy = t, Wy;
}
var Zy, nT;
function qC() {
  if (nT) return Zy;
  nT = 1;
  function e(t, n) {
    return function(r) {
      return t(n(r));
    };
  }
  return Zy = e, Zy;
}
var Qy, rT;
function ik() {
  if (rT) return Qy;
  rT = 1;
  var e = qC(), t = e(Object.keys, Object);
  return Qy = t, Qy;
}
var Jy, aT;
function ok() {
  if (aT) return Jy;
  aT = 1;
  var e = ak(), t = ik(), n = Object.prototype, r = n.hasOwnProperty;
  function o(u) {
    if (!e(u))
      return t(u);
    var c = [];
    for (var f in Object(u))
      r.call(u, f) && f != "constructor" && c.push(f);
    return c;
  }
  return Jy = o, Jy;
}
var em, iT;
function dc() {
  if (iT) return em;
  iT = 1;
  var e = k0(), t = J0();
  function n(r) {
    return r != null && t(r.length) && !e(r);
  }
  return em = n, em;
}
var tm, oT;
function hd() {
  if (oT) return tm;
  oT = 1;
  var e = rk(), t = ok(), n = dc();
  function r(o) {
    return n(o) ? e(o) : t(o);
  }
  return tm = r, tm;
}
var nm, lT;
function lk() {
  if (lT) return nm;
  lT = 1;
  var e = Vq(), t = Zq(), n = hd();
  function r(o) {
    return e(o, n, t);
  }
  return nm = r, nm;
}
var rm, uT;
function uk() {
  if (uT) return rm;
  uT = 1;
  var e = lk(), t = 1, n = Object.prototype, r = n.hasOwnProperty;
  function o(u, c, f, d, h, y) {
    var v = f & t, g = e(u), b = g.length, _ = e(c), S = _.length;
    if (b != S && !v)
      return !1;
    for (var x = b; x--; ) {
      var A = g[x];
      if (!(v ? A in c : r.call(c, A)))
        return !1;
    }
    var E = y.get(u), M = y.get(c);
    if (E && M)
      return E == c && M == u;
    var C = !0;
    y.set(u, c), y.set(c, u);
    for (var w = v; ++x < b; ) {
      A = g[x];
      var T = u[A], j = c[A];
      if (d)
        var N = v ? d(j, T, A, c, u, y) : d(T, j, A, u, c, y);
      if (!(N === void 0 ? T === j || h(T, j, f, d, y) : N)) {
        C = !1;
        break;
      }
      w || (w = A == "constructor");
    }
    if (C && !w) {
      var z = u.constructor, k = c.constructor;
      z != k && "constructor" in u && "constructor" in c && !(typeof z == "function" && z instanceof z && typeof k == "function" && k instanceof k) && (C = !1);
    }
    return y.delete(u), y.delete(c), C;
  }
  return rm = o, rm;
}
var am, cT;
function ck() {
  if (cT) return am;
  cT = 1;
  var e = gi(), t = vr(), n = e(t, "DataView");
  return am = n, am;
}
var im, sT;
function sk() {
  if (sT) return im;
  sT = 1;
  var e = gi(), t = vr(), n = e(t, "Promise");
  return im = n, im;
}
var om, fT;
function kC() {
  if (fT) return om;
  fT = 1;
  var e = gi(), t = vr(), n = e(t, "Set");
  return om = n, om;
}
var lm, dT;
function fk() {
  if (dT) return lm;
  dT = 1;
  var e = gi(), t = vr(), n = e(t, "WeakMap");
  return lm = n, lm;
}
var um, hT;
function dk() {
  if (hT) return um;
  hT = 1;
  var e = ck(), t = L0(), n = sk(), r = kC(), o = fk(), u = Xr(), c = tC(), f = "[object Map]", d = "[object Object]", h = "[object Promise]", y = "[object Set]", v = "[object WeakMap]", g = "[object DataView]", b = c(e), _ = c(t), S = c(n), x = c(r), A = c(o), E = u;
  return (e && E(new e(new ArrayBuffer(1))) != g || t && E(new t()) != f || n && E(n.resolve()) != h || r && E(new r()) != y || o && E(new o()) != v) && (E = function(M) {
    var C = u(M), w = C == d ? M.constructor : void 0, T = w ? c(w) : "";
    if (T)
      switch (T) {
        case b:
          return g;
        case _:
          return f;
        case S:
          return h;
        case x:
          return y;
        case A:
          return v;
      }
    return C;
  }), um = E, um;
}
var cm, pT;
function hk() {
  if (pT) return cm;
  pT = 1;
  var e = jC(), t = PC(), n = Xq(), r = uk(), o = dk(), u = ln(), c = RC(), f = zC(), d = 1, h = "[object Arguments]", y = "[object Array]", v = "[object Object]", g = Object.prototype, b = g.hasOwnProperty;
  function _(S, x, A, E, M, C) {
    var w = u(S), T = u(x), j = w ? y : o(S), N = T ? y : o(x);
    j = j == h ? v : j, N = N == h ? v : N;
    var z = j == v, k = N == v, B = j == N;
    if (B && c(S)) {
      if (!c(x))
        return !1;
      w = !0, z = !1;
    }
    if (B && !z)
      return C || (C = new e()), w || f(S) ? t(S, x, A, E, M, C) : n(S, x, j, A, E, M, C);
    if (!(A & d)) {
      var q = z && b.call(S, "__wrapped__"), V = k && b.call(x, "__wrapped__");
      if (q || V) {
        var Y = q ? S.value() : S, F = V ? x.value() : x;
        return C || (C = new e()), M(Y, F, A, E, C);
      }
    }
    return B ? (C || (C = new e()), r(S, x, A, E, M, C)) : !1;
  }
  return cm = _, cm;
}
var sm, vT;
function e1() {
  if (vT) return sm;
  vT = 1;
  var e = hk(), t = Vr();
  function n(r, o, u, c, f) {
    return r === o ? !0 : r == null || o == null || !t(r) && !t(o) ? r !== r && o !== o : e(r, o, u, c, n, f);
  }
  return sm = n, sm;
}
var fm, yT;
function pk() {
  if (yT) return fm;
  yT = 1;
  var e = jC(), t = e1(), n = 1, r = 2;
  function o(u, c, f, d) {
    var h = f.length, y = h, v = !d;
    if (u == null)
      return !y;
    for (u = Object(u); h--; ) {
      var g = f[h];
      if (v && g[2] ? g[1] !== u[g[0]] : !(g[0] in u))
        return !1;
    }
    for (; ++h < y; ) {
      g = f[h];
      var b = g[0], _ = u[b], S = g[1];
      if (v && g[2]) {
        if (_ === void 0 && !(b in u))
          return !1;
      } else {
        var x = new e();
        if (d)
          var A = d(_, S, b, u, c, x);
        if (!(A === void 0 ? t(S, _, n | r, d, x) : A))
          return !1;
      }
    }
    return !0;
  }
  return fm = o, fm;
}
var dm, mT;
function BC() {
  if (mT) return dm;
  mT = 1;
  var e = Da();
  function t(n) {
    return n === n && !e(n);
  }
  return dm = t, dm;
}
var hm, gT;
function vk() {
  if (gT) return hm;
  gT = 1;
  var e = BC(), t = hd();
  function n(r) {
    for (var o = t(r), u = o.length; u--; ) {
      var c = o[u], f = r[c];
      o[u] = [c, f, e(f)];
    }
    return o;
  }
  return hm = n, hm;
}
var pm, bT;
function LC() {
  if (bT) return pm;
  bT = 1;
  function e(t, n) {
    return function(r) {
      return r == null ? !1 : r[t] === n && (n !== void 0 || t in Object(r));
    };
  }
  return pm = e, pm;
}
var vm, xT;
function yk() {
  if (xT) return vm;
  xT = 1;
  var e = pk(), t = vk(), n = LC();
  function r(o) {
    var u = t(o);
    return u.length == 1 && u[0][2] ? n(u[0][0], u[0][1]) : function(c) {
      return c === o || e(c, o, u);
    };
  }
  return vm = r, vm;
}
var ym, ST;
function mk() {
  if (ST) return ym;
  ST = 1;
  function e(t, n) {
    return t != null && n in Object(t);
  }
  return ym = e, ym;
}
var mm, _T;
function gk() {
  if (_T) return mm;
  _T = 1;
  var e = aC(), t = Z0(), n = ln(), r = Q0(), o = J0(), u = ld();
  function c(f, d, h) {
    d = e(d, f);
    for (var y = -1, v = d.length, g = !1; ++y < v; ) {
      var b = u(d[y]);
      if (!(g = f != null && h(f, b)))
        break;
      f = f[b];
    }
    return g || ++y != v ? g : (v = f == null ? 0 : f.length, !!v && o(v) && r(b, v) && (n(f) || t(f)));
  }
  return mm = c, mm;
}
var gm, OT;
function bk() {
  if (OT) return gm;
  OT = 1;
  var e = mk(), t = gk();
  function n(r, o) {
    return r != null && t(r, o, e);
  }
  return gm = n, gm;
}
var bm, wT;
function xk() {
  if (wT) return bm;
  wT = 1;
  var e = e1(), t = iC(), n = bk(), r = q0(), o = BC(), u = LC(), c = ld(), f = 1, d = 2;
  function h(y, v) {
    return r(y) && o(v) ? u(c(y), v) : function(g) {
      var b = t(g, y);
      return b === void 0 && b === v ? n(g, y) : e(v, b, f | d);
    };
  }
  return bm = h, bm;
}
var xm, AT;
function il() {
  if (AT) return xm;
  AT = 1;
  function e(t) {
    return t;
  }
  return xm = e, xm;
}
var Sm, TT;
function Sk() {
  if (TT) return Sm;
  TT = 1;
  function e(t) {
    return function(n) {
      return n == null ? void 0 : n[t];
    };
  }
  return Sm = e, Sm;
}
var _m, ET;
function _k() {
  if (ET) return _m;
  ET = 1;
  var e = H0();
  function t(n) {
    return function(r) {
      return e(r, n);
    };
  }
  return _m = t, _m;
}
var Om, jT;
function Ok() {
  if (jT) return Om;
  jT = 1;
  var e = Sk(), t = _k(), n = q0(), r = ld();
  function o(u) {
    return n(u) ? e(r(u)) : t(u);
  }
  return Om = o, Om;
}
var wm, MT;
function Pa() {
  if (MT) return wm;
  MT = 1;
  var e = yk(), t = xk(), n = il(), r = ln(), o = Ok();
  function u(c) {
    return typeof c == "function" ? c : c == null ? n : typeof c == "object" ? r(c) ? t(c[0], c[1]) : e(c) : o(c);
  }
  return wm = u, wm;
}
var Am, CT;
function UC() {
  if (CT) return Am;
  CT = 1;
  function e(t, n, r, o) {
    for (var u = t.length, c = r + (o ? 1 : -1); o ? c-- : ++c < u; )
      if (n(t[c], c, t))
        return c;
    return -1;
  }
  return Am = e, Am;
}
var Tm, DT;
function wk() {
  if (DT) return Tm;
  DT = 1;
  function e(t) {
    return t !== t;
  }
  return Tm = e, Tm;
}
var Em, PT;
function Ak() {
  if (PT) return Em;
  PT = 1;
  function e(t, n, r) {
    for (var o = r - 1, u = t.length; ++o < u; )
      if (t[o] === n)
        return o;
    return -1;
  }
  return Em = e, Em;
}
var jm, NT;
function Tk() {
  if (NT) return jm;
  NT = 1;
  var e = UC(), t = wk(), n = Ak();
  function r(o, u, c) {
    return u === u ? n(o, u, c) : e(o, t, c);
  }
  return jm = r, jm;
}
var Mm, RT;
function Ek() {
  if (RT) return Mm;
  RT = 1;
  var e = Tk();
  function t(n, r) {
    var o = n == null ? 0 : n.length;
    return !!o && e(n, r, 0) > -1;
  }
  return Mm = t, Mm;
}
var Cm, $T;
function jk() {
  if ($T) return Cm;
  $T = 1;
  function e(t, n, r) {
    for (var o = -1, u = t == null ? 0 : t.length; ++o < u; )
      if (r(n, t[o]))
        return !0;
    return !1;
  }
  return Cm = e, Cm;
}
var Dm, zT;
function Mk() {
  if (zT) return Dm;
  zT = 1;
  function e() {
  }
  return Dm = e, Dm;
}
var Pm, qT;
function Ck() {
  if (qT) return Pm;
  qT = 1;
  var e = kC(), t = Mk(), n = W0(), r = 1 / 0, o = e && 1 / n(new e([, -0]))[1] == r ? function(u) {
    return new e(u);
  } : t;
  return Pm = o, Pm;
}
var Nm, kT;
function Dk() {
  if (kT) return Nm;
  kT = 1;
  var e = MC(), t = Ek(), n = jk(), r = DC(), o = Ck(), u = W0(), c = 200;
  function f(d, h, y) {
    var v = -1, g = t, b = d.length, _ = !0, S = [], x = S;
    if (y)
      _ = !1, g = n;
    else if (b >= c) {
      var A = h ? null : o(d);
      if (A)
        return u(A);
      _ = !1, g = r, x = new e();
    } else
      x = h ? [] : S;
    e:
      for (; ++v < b; ) {
        var E = d[v], M = h ? h(E) : E;
        if (E = y || E !== 0 ? E : 0, _ && M === M) {
          for (var C = x.length; C--; )
            if (x[C] === M)
              continue e;
          h && x.push(M), S.push(E);
        } else g(x, M, y) || (x !== S && x.push(M), S.push(E));
      }
    return S;
  }
  return Nm = f, Nm;
}
var Rm, BT;
function Pk() {
  if (BT) return Rm;
  BT = 1;
  var e = Pa(), t = Dk();
  function n(r, o) {
    return r && r.length ? t(r, e(o, 2)) : [];
  }
  return Rm = n, Rm;
}
var Nk = Pk();
const LT = /* @__PURE__ */ tt(Nk);
function IC(e, t, n) {
  return t === !0 ? LT(e, n) : Ee(t) ? LT(e, t) : e;
}
function Co(e) {
  "@babel/helpers - typeof";
  return Co = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Co(e);
}
var Rk = ["ref"];
function UT(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function $r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? UT(Object(n), !0).forEach(function(r) {
      pd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : UT(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $k(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function IT(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, GC(r.key), r);
  }
}
function zk(e, t, n) {
  return t && IT(e.prototype, t), n && IT(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qk(e, t, n) {
  return t = sf(t), kk(e, HC() ? Reflect.construct(t, n || [], sf(e).constructor) : t.apply(e, n));
}
function kk(e, t) {
  if (t && (Co(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Bk(e);
}
function Bk(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function HC() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (HC = function() {
    return !!e;
  })();
}
function sf(e) {
  return sf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, sf(e);
}
function Lk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _b(e, t);
}
function _b(e, t) {
  return _b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, _b(e, t);
}
function pd(e, t, n) {
  return t = GC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function GC(e) {
  var t = Uk(e, "string");
  return Co(t) == "symbol" ? t : t + "";
}
function Uk(e, t) {
  if (Co(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Co(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Ik(e, t) {
  if (e == null) return {};
  var n = Hk(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Hk(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Gk(e) {
  return e.value;
}
function Yk(e, t) {
  if (/* @__PURE__ */ U.isValidElement(e))
    return /* @__PURE__ */ U.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ U.createElement(e, t);
  t.ref;
  var n = Ik(t, Rk);
  return /* @__PURE__ */ U.createElement(F0, n);
}
var HT = 1, wo = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    $k(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = qk(this, t, [].concat(o)), pd(n, "lastBoundingBox", {
      width: -1,
      height: -1
    }), n;
  }
  return Lk(t, e), zk(t, [{
    key: "componentDidMount",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var r = this.wrapperNode.getBoundingClientRect();
        return r.height = this.wrapperNode.offsetHeight, r.width = this.wrapperNode.offsetWidth, r;
      }
      return null;
    }
  }, {
    key: "updateBBox",
    value: function() {
      var r = this.props.onBBoxUpdate, o = this.getBBox();
      o ? (Math.abs(o.width - this.lastBoundingBox.width) > HT || Math.abs(o.height - this.lastBoundingBox.height) > HT) && (this.lastBoundingBox.width = o.width, this.lastBoundingBox.height = o.height, r && r(o)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, r && r(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? $r({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(r) {
      var o = this.props, u = o.layout, c = o.align, f = o.verticalAlign, d = o.margin, h = o.chartWidth, y = o.chartHeight, v, g;
      if (!r || (r.left === void 0 || r.left === null) && (r.right === void 0 || r.right === null))
        if (c === "center" && u === "vertical") {
          var b = this.getBBoxSnapshot();
          v = {
            left: ((h || 0) - b.width) / 2
          };
        } else
          v = c === "right" ? {
            right: d && d.right || 0
          } : {
            left: d && d.left || 0
          };
      if (!r || (r.top === void 0 || r.top === null) && (r.bottom === void 0 || r.bottom === null))
        if (f === "middle") {
          var _ = this.getBBoxSnapshot();
          g = {
            top: ((y || 0) - _.height) / 2
          };
        } else
          g = f === "bottom" ? {
            bottom: d && d.bottom || 0
          } : {
            top: d && d.top || 0
          };
      return $r($r({}, v), g);
    }
  }, {
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.content, c = o.width, f = o.height, d = o.wrapperStyle, h = o.payloadUniqBy, y = o.payload, v = $r($r({
        position: "absolute",
        width: c || "auto",
        height: f || "auto"
      }, this.getDefaultPosition(d)), d);
      return /* @__PURE__ */ U.createElement("div", {
        className: "recharts-legend-wrapper",
        style: v,
        ref: function(b) {
          r.wrapperNode = b;
        }
      }, Yk(u, $r($r({}, this.props), {}, {
        payload: IC(y, h, Gk)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(r, o) {
      var u = $r($r({}, this.defaultProps), r.props), c = u.layout;
      return c === "vertical" && de(r.props.height) ? {
        height: r.props.height
      } : c === "horizontal" ? {
        width: r.props.width || o
      } : null;
    }
  }]);
})(J.PureComponent);
pd(wo, "displayName", "Legend");
pd(wo, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var $m, GT;
function Kk() {
  if (GT) return $m;
  GT = 1;
  var e = fc(), t = Z0(), n = ln(), r = e ? e.isConcatSpreadable : void 0;
  function o(u) {
    return n(u) || t(u) || !!(r && u && u[r]);
  }
  return $m = o, $m;
}
var zm, YT;
function YC() {
  if (YT) return zm;
  YT = 1;
  var e = NC(), t = Kk();
  function n(r, o, u, c, f) {
    var d = -1, h = r.length;
    for (u || (u = t), f || (f = []); ++d < h; ) {
      var y = r[d];
      o > 0 && u(y) ? o > 1 ? n(y, o - 1, u, c, f) : e(f, y) : c || (f[f.length] = y);
    }
    return f;
  }
  return zm = n, zm;
}
var qm, KT;
function Xk() {
  if (KT) return qm;
  KT = 1;
  function e(t) {
    return function(n, r, o) {
      for (var u = -1, c = Object(n), f = o(n), d = f.length; d--; ) {
        var h = f[t ? d : ++u];
        if (r(c[h], h, c) === !1)
          break;
      }
      return n;
    };
  }
  return qm = e, qm;
}
var km, XT;
function Vk() {
  if (XT) return km;
  XT = 1;
  var e = Xk(), t = e();
  return km = t, km;
}
var Bm, VT;
function KC() {
  if (VT) return Bm;
  VT = 1;
  var e = Vk(), t = hd();
  function n(r, o) {
    return r && e(r, o, t);
  }
  return Bm = n, Bm;
}
var Lm, FT;
function Fk() {
  if (FT) return Lm;
  FT = 1;
  var e = dc();
  function t(n, r) {
    return function(o, u) {
      if (o == null)
        return o;
      if (!e(o))
        return n(o, u);
      for (var c = o.length, f = r ? c : -1, d = Object(o); (r ? f-- : ++f < c) && u(d[f], f, d) !== !1; )
        ;
      return o;
    };
  }
  return Lm = t, Lm;
}
var Um, WT;
function t1() {
  if (WT) return Um;
  WT = 1;
  var e = KC(), t = Fk(), n = t(e);
  return Um = n, Um;
}
var Im, ZT;
function XC() {
  if (ZT) return Im;
  ZT = 1;
  var e = t1(), t = dc();
  function n(r, o) {
    var u = -1, c = t(r) ? Array(r.length) : [];
    return e(r, function(f, d, h) {
      c[++u] = o(f, d, h);
    }), c;
  }
  return Im = n, Im;
}
var Hm, QT;
function Wk() {
  if (QT) return Hm;
  QT = 1;
  function e(t, n) {
    var r = t.length;
    for (t.sort(n); r--; )
      t[r] = t[r].value;
    return t;
  }
  return Hm = e, Hm;
}
var Gm, JT;
function Zk() {
  if (JT) return Gm;
  JT = 1;
  var e = nl();
  function t(n, r) {
    if (n !== r) {
      var o = n !== void 0, u = n === null, c = n === n, f = e(n), d = r !== void 0, h = r === null, y = r === r, v = e(r);
      if (!h && !v && !f && n > r || f && d && y && !h && !v || u && d && y || !o && y || !c)
        return 1;
      if (!u && !f && !v && n < r || v && o && c && !u && !f || h && o && c || !d && c || !y)
        return -1;
    }
    return 0;
  }
  return Gm = t, Gm;
}
var Ym, eE;
function Qk() {
  if (eE) return Ym;
  eE = 1;
  var e = Zk();
  function t(n, r, o) {
    for (var u = -1, c = n.criteria, f = r.criteria, d = c.length, h = o.length; ++u < d; ) {
      var y = e(c[u], f[u]);
      if (y) {
        if (u >= h)
          return y;
        var v = o[u];
        return y * (v == "desc" ? -1 : 1);
      }
    }
    return n.index - r.index;
  }
  return Ym = t, Ym;
}
var Km, tE;
function Jk() {
  if (tE) return Km;
  tE = 1;
  var e = I0(), t = H0(), n = Pa(), r = XC(), o = Wk(), u = $C(), c = Qk(), f = il(), d = ln();
  function h(y, v, g) {
    v.length ? v = e(v, function(S) {
      return d(S) ? function(x) {
        return t(x, S.length === 1 ? S[0] : S);
      } : S;
    }) : v = [f];
    var b = -1;
    v = e(v, u(n));
    var _ = r(y, function(S, x, A) {
      var E = e(v, function(M) {
        return M(S);
      });
      return { criteria: E, index: ++b, value: S };
    });
    return o(_, function(S, x) {
      return c(S, x, g);
    });
  }
  return Km = h, Km;
}
var Xm, nE;
function eB() {
  if (nE) return Xm;
  nE = 1;
  function e(t, n, r) {
    switch (r.length) {
      case 0:
        return t.call(n);
      case 1:
        return t.call(n, r[0]);
      case 2:
        return t.call(n, r[0], r[1]);
      case 3:
        return t.call(n, r[0], r[1], r[2]);
    }
    return t.apply(n, r);
  }
  return Xm = e, Xm;
}
var Vm, rE;
function tB() {
  if (rE) return Vm;
  rE = 1;
  var e = eB(), t = Math.max;
  function n(r, o, u) {
    return o = t(o === void 0 ? r.length - 1 : o, 0), function() {
      for (var c = arguments, f = -1, d = t(c.length - o, 0), h = Array(d); ++f < d; )
        h[f] = c[o + f];
      f = -1;
      for (var y = Array(o + 1); ++f < o; )
        y[f] = c[f];
      return y[o] = u(h), e(r, this, y);
    };
  }
  return Vm = n, Vm;
}
var Fm, aE;
function nB() {
  if (aE) return Fm;
  aE = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Fm = e, Fm;
}
var Wm, iE;
function VC() {
  if (iE) return Wm;
  iE = 1;
  var e = gi(), t = (function() {
    try {
      var n = e(Object, "defineProperty");
      return n({}, "", {}), n;
    } catch {
    }
  })();
  return Wm = t, Wm;
}
var Zm, oE;
function rB() {
  if (oE) return Zm;
  oE = 1;
  var e = nB(), t = VC(), n = il(), r = t ? function(o, u) {
    return t(o, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(u),
      writable: !0
    });
  } : n;
  return Zm = r, Zm;
}
var Qm, lE;
function aB() {
  if (lE) return Qm;
  lE = 1;
  var e = 800, t = 16, n = Date.now;
  function r(o) {
    var u = 0, c = 0;
    return function() {
      var f = n(), d = t - (f - c);
      if (c = f, d > 0) {
        if (++u >= e)
          return arguments[0];
      } else
        u = 0;
      return o.apply(void 0, arguments);
    };
  }
  return Qm = r, Qm;
}
var Jm, uE;
function iB() {
  if (uE) return Jm;
  uE = 1;
  var e = rB(), t = aB(), n = t(e);
  return Jm = n, Jm;
}
var eg, cE;
function oB() {
  if (cE) return eg;
  cE = 1;
  var e = il(), t = tB(), n = iB();
  function r(o, u) {
    return n(t(o, u, e), o + "");
  }
  return eg = r, eg;
}
var tg, sE;
function vd() {
  if (sE) return tg;
  sE = 1;
  var e = B0(), t = dc(), n = Q0(), r = Da();
  function o(u, c, f) {
    if (!r(f))
      return !1;
    var d = typeof c;
    return (d == "number" ? t(f) && n(c, f.length) : d == "string" && c in f) ? e(f[c], u) : !1;
  }
  return tg = o, tg;
}
var ng, fE;
function lB() {
  if (fE) return ng;
  fE = 1;
  var e = YC(), t = Jk(), n = oB(), r = vd(), o = n(function(u, c) {
    if (u == null)
      return [];
    var f = c.length;
    return f > 1 && r(u, c[0], c[1]) ? c = [] : f > 2 && r(c[0], c[1], c[2]) && (c = [c[0]]), t(u, e(c, 1), []);
  });
  return ng = o, ng;
}
var uB = lB();
const n1 = /* @__PURE__ */ tt(uB);
function Pu(e) {
  "@babel/helpers - typeof";
  return Pu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pu(e);
}
function Ob() {
  return Ob = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ob.apply(this, arguments);
}
function cB(e, t) {
  return hB(e) || dB(e, t) || fB(e, t) || sB();
}
function sB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fB(e, t) {
  if (e) {
    if (typeof e == "string") return dE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dE(e, t);
  }
}
function dE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function dB(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function hB(e) {
  if (Array.isArray(e)) return e;
}
function hE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function rg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hE(Object(n), !0).forEach(function(r) {
      pB(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function pB(e, t, n) {
  return t = vB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function vB(e) {
  var t = yB(e, "string");
  return Pu(t) == "symbol" ? t : t + "";
}
function yB(e, t) {
  if (Pu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Pu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function mB(e) {
  return Array.isArray(e) && wt(e[0]) && wt(e[1]) ? e.join(" ~ ") : e;
}
var gB = function(t) {
  var n = t.separator, r = n === void 0 ? " : " : n, o = t.contentStyle, u = o === void 0 ? {} : o, c = t.itemStyle, f = c === void 0 ? {} : c, d = t.labelStyle, h = d === void 0 ? {} : d, y = t.payload, v = t.formatter, g = t.itemSorter, b = t.wrapperClassName, _ = t.labelClassName, S = t.label, x = t.labelFormatter, A = t.accessibilityLayer, E = A === void 0 ? !1 : A, M = function() {
    if (y && y.length) {
      var q = {
        padding: 0,
        margin: 0
      }, V = (g ? n1(y, g) : y).map(function(Y, F) {
        if (Y.type === "none")
          return null;
        var $ = rg({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: Y.color || "#000"
        }, f), K = Y.formatter || v || mB, ne = Y.value, G = Y.name, ee = ne, P = G;
        if (K && ee != null && P != null) {
          var I = K(ne, G, Y, F, y);
          if (Array.isArray(I)) {
            var re = cB(I, 2);
            ee = re[0], P = re[1];
          } else
            ee = I;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ U.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(F),
            style: $
          }, wt(P) ? /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, P) : null, wt(P) ? /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, r) : null, /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, ee), /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, Y.unit || ""))
        );
      });
      return /* @__PURE__ */ U.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: q
      }, V);
    }
    return null;
  }, C = rg({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, u), w = rg({
    margin: 0
  }, h), T = !we(S), j = T ? S : "", N = $e("recharts-default-tooltip", b), z = $e("recharts-tooltip-label", _);
  T && x && y !== void 0 && y !== null && (j = x(S, y));
  var k = E ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ U.createElement("div", Ob({
    className: N,
    style: C
  }, k), /* @__PURE__ */ U.createElement("p", {
    className: z,
    style: w
  }, /* @__PURE__ */ U.isValidElement(j) ? j : "".concat(j)), M());
};
function Nu(e) {
  "@babel/helpers - typeof";
  return Nu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Nu(e);
}
function qs(e, t, n) {
  return t = bB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function bB(e) {
  var t = xB(e, "string");
  return Nu(t) == "symbol" ? t : t + "";
}
function xB(e, t) {
  if (Nu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Nu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var iu = "recharts-tooltip-wrapper", SB = {
  visibility: "hidden"
};
function _B(e) {
  var t = e.coordinate, n = e.translateX, r = e.translateY;
  return $e(iu, qs(qs(qs(qs({}, "".concat(iu, "-right"), de(n) && t && de(t.x) && n >= t.x), "".concat(iu, "-left"), de(n) && t && de(t.x) && n < t.x), "".concat(iu, "-bottom"), de(r) && t && de(t.y) && r >= t.y), "".concat(iu, "-top"), de(r) && t && de(t.y) && r < t.y));
}
function pE(e) {
  var t = e.allowEscapeViewBox, n = e.coordinate, r = e.key, o = e.offsetTopLeft, u = e.position, c = e.reverseDirection, f = e.tooltipDimension, d = e.viewBox, h = e.viewBoxDimension;
  if (u && de(u[r]))
    return u[r];
  var y = n[r] - f - o, v = n[r] + o;
  if (t[r])
    return c[r] ? y : v;
  if (c[r]) {
    var g = y, b = d[r];
    return g < b ? Math.max(v, d[r]) : Math.max(y, d[r]);
  }
  var _ = v + f, S = d[r] + h;
  return _ > S ? Math.max(y, d[r]) : Math.max(v, d[r]);
}
function OB(e) {
  var t = e.translateX, n = e.translateY, r = e.useTranslate3d;
  return {
    transform: r ? "translate3d(".concat(t, "px, ").concat(n, "px, 0)") : "translate(".concat(t, "px, ").concat(n, "px)")
  };
}
function wB(e) {
  var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTopLeft, o = e.position, u = e.reverseDirection, c = e.tooltipBox, f = e.useTranslate3d, d = e.viewBox, h, y, v;
  return c.height > 0 && c.width > 0 && n ? (y = pE({
    allowEscapeViewBox: t,
    coordinate: n,
    key: "x",
    offsetTopLeft: r,
    position: o,
    reverseDirection: u,
    tooltipDimension: c.width,
    viewBox: d,
    viewBoxDimension: d.width
  }), v = pE({
    allowEscapeViewBox: t,
    coordinate: n,
    key: "y",
    offsetTopLeft: r,
    position: o,
    reverseDirection: u,
    tooltipDimension: c.height,
    viewBox: d,
    viewBoxDimension: d.height
  }), h = OB({
    translateX: y,
    translateY: v,
    useTranslate3d: f
  })) : h = SB, {
    cssProperties: h,
    cssClasses: _B({
      translateX: y,
      translateY: v,
      coordinate: n
    })
  };
}
function Do(e) {
  "@babel/helpers - typeof";
  return Do = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Do(e);
}
function vE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function yE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vE(Object(n), !0).forEach(function(r) {
      Ab(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function AB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function TB(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, WC(r.key), r);
  }
}
function EB(e, t, n) {
  return t && TB(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jB(e, t, n) {
  return t = ff(t), MB(e, FC() ? Reflect.construct(t, n || [], ff(e).constructor) : t.apply(e, n));
}
function MB(e, t) {
  if (t && (Do(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return CB(e);
}
function CB(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function FC() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (FC = function() {
    return !!e;
  })();
}
function ff(e) {
  return ff = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ff(e);
}
function DB(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && wb(e, t);
}
function wb(e, t) {
  return wb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, wb(e, t);
}
function Ab(e, t, n) {
  return t = WC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function WC(e) {
  var t = PB(e, "string");
  return Do(t) == "symbol" ? t : t + "";
}
function PB(e, t) {
  if (Do(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Do(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var mE = 1, NB = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    AB(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = jB(this, t, [].concat(o)), Ab(n, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), Ab(n, "handleKeyDown", function(c) {
      if (c.key === "Escape") {
        var f, d, h, y;
        n.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (f = (d = n.props.coordinate) === null || d === void 0 ? void 0 : d.x) !== null && f !== void 0 ? f : 0,
            y: (h = (y = n.props.coordinate) === null || y === void 0 ? void 0 : y.y) !== null && h !== void 0 ? h : 0
          }
        });
      }
    }), n;
  }
  return DB(t, e), EB(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var r = this.wrapperNode.getBoundingClientRect();
        (Math.abs(r.width - this.state.lastBoundingBox.width) > mE || Math.abs(r.height - this.state.lastBoundingBox.height) > mE) && this.setState({
          lastBoundingBox: {
            width: r.width,
            height: r.height
          }
        });
      } else (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      var r, o;
      this.props.active && this.updateBBox(), this.state.dismissed && (((r = this.props.coordinate) === null || r === void 0 ? void 0 : r.x) !== this.state.dismissedAtCoordinate.x || ((o = this.props.coordinate) === null || o === void 0 ? void 0 : o.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
    }
  }, {
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.active, c = o.allowEscapeViewBox, f = o.animationDuration, d = o.animationEasing, h = o.children, y = o.coordinate, v = o.hasPayload, g = o.isAnimationActive, b = o.offset, _ = o.position, S = o.reverseDirection, x = o.useTranslate3d, A = o.viewBox, E = o.wrapperStyle, M = wB({
        allowEscapeViewBox: c,
        coordinate: y,
        offsetTopLeft: b,
        position: _,
        reverseDirection: S,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: x,
        viewBox: A
      }), C = M.cssClasses, w = M.cssProperties, T = yE(yE({
        transition: g && u ? "transform ".concat(f, "ms ").concat(d) : void 0
      }, w), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && u && v ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, E);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ U.createElement("div", {
          tabIndex: -1,
          className: C,
          style: T,
          ref: function(N) {
            r.wrapperNode = N;
          }
        }, h)
      );
    }
  }]);
})(J.PureComponent), RB = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Na = {
  isSsr: RB()
};
function Po(e) {
  "@babel/helpers - typeof";
  return Po = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Po(e);
}
function gE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function bE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gE(Object(n), !0).forEach(function(r) {
      r1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $B(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function zB(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, QC(r.key), r);
  }
}
function qB(e, t, n) {
  return t && zB(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kB(e, t, n) {
  return t = df(t), BB(e, ZC() ? Reflect.construct(t, n || [], df(e).constructor) : t.apply(e, n));
}
function BB(e, t) {
  if (t && (Po(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return LB(e);
}
function LB(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ZC() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (ZC = function() {
    return !!e;
  })();
}
function df(e) {
  return df = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, df(e);
}
function UB(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Tb(e, t);
}
function Tb(e, t) {
  return Tb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Tb(e, t);
}
function r1(e, t, n) {
  return t = QC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QC(e) {
  var t = IB(e, "string");
  return Po(t) == "symbol" ? t : t + "";
}
function IB(e, t) {
  if (Po(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Po(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function HB(e) {
  return e.dataKey;
}
function GB(e, t) {
  return /* @__PURE__ */ U.isValidElement(e) ? /* @__PURE__ */ U.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ U.createElement(e, t) : /* @__PURE__ */ U.createElement(gB, t);
}
var Sn = /* @__PURE__ */ (function(e) {
  function t() {
    return $B(this, t), kB(this, t, arguments);
  }
  return UB(t, e), qB(t, [{
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.active, c = o.allowEscapeViewBox, f = o.animationDuration, d = o.animationEasing, h = o.content, y = o.coordinate, v = o.filterNull, g = o.isAnimationActive, b = o.offset, _ = o.payload, S = o.payloadUniqBy, x = o.position, A = o.reverseDirection, E = o.useTranslate3d, M = o.viewBox, C = o.wrapperStyle, w = _ ?? [];
      v && w.length && (w = IC(_.filter(function(j) {
        return j.value != null && (j.hide !== !0 || r.props.includeHidden);
      }), S, HB));
      var T = w.length > 0;
      return /* @__PURE__ */ U.createElement(NB, {
        allowEscapeViewBox: c,
        animationDuration: f,
        animationEasing: d,
        isAnimationActive: g,
        active: u,
        coordinate: y,
        hasPayload: T,
        offset: b,
        position: x,
        reverseDirection: A,
        useTranslate3d: E,
        viewBox: M,
        wrapperStyle: C
      }, GB(h, bE(bE({}, this.props), {}, {
        payload: w
      })));
    }
  }]);
})(J.PureComponent);
r1(Sn, "displayName", "Tooltip");
r1(Sn, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !Na.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var ag, xE;
function YB() {
  if (xE) return ag;
  xE = 1;
  var e = vr(), t = function() {
    return e.Date.now();
  };
  return ag = t, ag;
}
var ig, SE;
function KB() {
  if (SE) return ig;
  SE = 1;
  var e = /\s/;
  function t(n) {
    for (var r = n.length; r-- && e.test(n.charAt(r)); )
      ;
    return r;
  }
  return ig = t, ig;
}
var og, _E;
function XB() {
  if (_E) return og;
  _E = 1;
  var e = KB(), t = /^\s+/;
  function n(r) {
    return r && r.slice(0, e(r) + 1).replace(t, "");
  }
  return og = n, og;
}
var lg, OE;
function JC() {
  if (OE) return lg;
  OE = 1;
  var e = XB(), t = Da(), n = nl(), r = NaN, o = /^[-+]0x[0-9a-f]+$/i, u = /^0b[01]+$/i, c = /^0o[0-7]+$/i, f = parseInt;
  function d(h) {
    if (typeof h == "number")
      return h;
    if (n(h))
      return r;
    if (t(h)) {
      var y = typeof h.valueOf == "function" ? h.valueOf() : h;
      h = t(y) ? y + "" : y;
    }
    if (typeof h != "string")
      return h === 0 ? h : +h;
    h = e(h);
    var v = u.test(h);
    return v || c.test(h) ? f(h.slice(2), v ? 2 : 8) : o.test(h) ? r : +h;
  }
  return lg = d, lg;
}
var ug, wE;
function VB() {
  if (wE) return ug;
  wE = 1;
  var e = Da(), t = YB(), n = JC(), r = "Expected a function", o = Math.max, u = Math.min;
  function c(f, d, h) {
    var y, v, g, b, _, S, x = 0, A = !1, E = !1, M = !0;
    if (typeof f != "function")
      throw new TypeError(r);
    d = n(d) || 0, e(h) && (A = !!h.leading, E = "maxWait" in h, g = E ? o(n(h.maxWait) || 0, d) : g, M = "trailing" in h ? !!h.trailing : M);
    function C(V) {
      var Y = y, F = v;
      return y = v = void 0, x = V, b = f.apply(F, Y), b;
    }
    function w(V) {
      return x = V, _ = setTimeout(N, d), A ? C(V) : b;
    }
    function T(V) {
      var Y = V - S, F = V - x, $ = d - Y;
      return E ? u($, g - F) : $;
    }
    function j(V) {
      var Y = V - S, F = V - x;
      return S === void 0 || Y >= d || Y < 0 || E && F >= g;
    }
    function N() {
      var V = t();
      if (j(V))
        return z(V);
      _ = setTimeout(N, T(V));
    }
    function z(V) {
      return _ = void 0, M && y ? C(V) : (y = v = void 0, b);
    }
    function k() {
      _ !== void 0 && clearTimeout(_), x = 0, y = S = v = _ = void 0;
    }
    function B() {
      return _ === void 0 ? b : z(t());
    }
    function q() {
      var V = t(), Y = j(V);
      if (y = arguments, v = this, S = V, Y) {
        if (_ === void 0)
          return w(S);
        if (E)
          return clearTimeout(_), _ = setTimeout(N, d), C(S);
      }
      return _ === void 0 && (_ = setTimeout(N, d)), b;
    }
    return q.cancel = k, q.flush = B, q;
  }
  return ug = c, ug;
}
var cg, AE;
function FB() {
  if (AE) return cg;
  AE = 1;
  var e = VB(), t = Da(), n = "Expected a function";
  function r(o, u, c) {
    var f = !0, d = !0;
    if (typeof o != "function")
      throw new TypeError(n);
    return t(c) && (f = "leading" in c ? !!c.leading : f, d = "trailing" in c ? !!c.trailing : d), e(o, u, {
      leading: f,
      maxWait: u,
      trailing: d
    });
  }
  return cg = r, cg;
}
var WB = FB();
const eD = /* @__PURE__ */ tt(WB);
function Ru(e) {
  "@babel/helpers - typeof";
  return Ru = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ru(e);
}
function TE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ks(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? TE(Object(n), !0).forEach(function(r) {
      ZB(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : TE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ZB(e, t, n) {
  return t = QB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QB(e) {
  var t = JB(e, "string");
  return Ru(t) == "symbol" ? t : t + "";
}
function JB(e, t) {
  if (Ru(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ru(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function e8(e, t) {
  return a8(e) || r8(e, t) || n8(e, t) || t8();
}
function t8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function n8(e, t) {
  if (e) {
    if (typeof e == "string") return EE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EE(e, t);
  }
}
function EE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function r8(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function a8(e) {
  if (Array.isArray(e)) return e;
}
var Bs = /* @__PURE__ */ J.forwardRef(function(e, t) {
  var n = e.aspect, r = e.initialDimension, o = r === void 0 ? {
    width: -1,
    height: -1
  } : r, u = e.width, c = u === void 0 ? "100%" : u, f = e.height, d = f === void 0 ? "100%" : f, h = e.minWidth, y = h === void 0 ? 0 : h, v = e.minHeight, g = e.maxHeight, b = e.children, _ = e.debounce, S = _ === void 0 ? 0 : _, x = e.id, A = e.className, E = e.onResize, M = e.style, C = M === void 0 ? {} : M, w = J.useRef(null), T = J.useRef();
  T.current = E, J.useImperativeHandle(t, function() {
    return Object.defineProperty(w.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), w.current;
      },
      configurable: !0
    });
  });
  var j = J.useState({
    containerWidth: o.width,
    containerHeight: o.height
  }), N = e8(j, 2), z = N[0], k = N[1], B = J.useCallback(function(V, Y) {
    k(function(F) {
      var $ = Math.round(V), K = Math.round(Y);
      return F.containerWidth === $ && F.containerHeight === K ? F : {
        containerWidth: $,
        containerHeight: K
      };
    });
  }, []);
  J.useEffect(function() {
    var V = function(G) {
      var ee, P = G[0].contentRect, I = P.width, re = P.height;
      B(I, re), (ee = T.current) === null || ee === void 0 || ee.call(T, I, re);
    };
    S > 0 && (V = eD(V, S, {
      trailing: !0,
      leading: !1
    }));
    var Y = new ResizeObserver(V), F = w.current.getBoundingClientRect(), $ = F.width, K = F.height;
    return B($, K), Y.observe(w.current), function() {
      Y.disconnect();
    };
  }, [B, S]);
  var q = J.useMemo(function() {
    var V = z.containerWidth, Y = z.containerHeight;
    if (V < 0 || Y < 0)
      return null;
    Ur(ai(c) || ai(d), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, c, d), Ur(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
    var F = ai(c) ? V : c, $ = ai(d) ? Y : d;
    n && n > 0 && (F ? $ = F / n : $ && (F = $ * n), g && $ > g && ($ = g)), Ur(F > 0 || $ > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, F, $, c, d, y, v, n);
    var K = !Array.isArray(b) && Lr(b.type).endsWith("Chart");
    return U.Children.map(b, function(ne) {
      return /* @__PURE__ */ U.isValidElement(ne) ? /* @__PURE__ */ J.cloneElement(ne, ks({
        width: F,
        height: $
      }, K ? {
        style: ks({
          height: "100%",
          width: "100%",
          maxHeight: $,
          maxWidth: F
        }, ne.props.style)
      } : {})) : ne;
    });
  }, [n, b, d, g, v, y, z, c]);
  return /* @__PURE__ */ U.createElement("div", {
    id: x ? "".concat(x) : void 0,
    className: $e("recharts-responsive-container", A),
    style: ks(ks({}, C), {}, {
      width: c,
      height: d,
      minWidth: y,
      minHeight: v,
      maxHeight: g
    }),
    ref: w
  }, q);
}), yd = function(t) {
  return null;
};
yd.displayName = "Cell";
function $u(e) {
  "@babel/helpers - typeof";
  return $u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $u(e);
}
function jE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Eb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jE(Object(n), !0).forEach(function(r) {
      i8(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function i8(e, t, n) {
  return t = o8(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function o8(e) {
  var t = l8(e, "string");
  return $u(t) == "symbol" ? t : t + "";
}
function l8(e, t) {
  if ($u(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if ($u(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ho = {
  widthCache: {},
  cacheCount: 0
}, u8 = 2e3, c8 = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, ME = "recharts_measurement_span";
function s8(e) {
  var t = Eb({}, e);
  return Object.keys(t).forEach(function(n) {
    t[n] || delete t[n];
  }), t;
}
var bu = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Na.isSsr)
    return {
      width: 0,
      height: 0
    };
  var r = s8(n), o = JSON.stringify({
    text: t,
    copyStyle: r
  });
  if (ho.widthCache[o])
    return ho.widthCache[o];
  try {
    var u = document.getElementById(ME);
    u || (u = document.createElement("span"), u.setAttribute("id", ME), u.setAttribute("aria-hidden", "true"), document.body.appendChild(u));
    var c = Eb(Eb({}, c8), r);
    Object.assign(u.style, c), u.textContent = "".concat(t);
    var f = u.getBoundingClientRect(), d = {
      width: f.width,
      height: f.height
    };
    return ho.widthCache[o] = d, ++ho.cacheCount > u8 && (ho.cacheCount = 0, ho.widthCache = {}), d;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, f8 = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function zu(e) {
  "@babel/helpers - typeof";
  return zu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zu(e);
}
function hf(e, t) {
  return v8(e) || p8(e, t) || h8(e, t) || d8();
}
function d8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function h8(e, t) {
  if (e) {
    if (typeof e == "string") return CE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CE(e, t);
  }
}
function CE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function p8(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t === 0) {
        if (Object(n) !== n) return;
        d = !1;
      } else for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function v8(e) {
  if (Array.isArray(e)) return e;
}
function y8(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function DE(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, g8(r.key), r);
  }
}
function m8(e, t, n) {
  return t && DE(e.prototype, t), n && DE(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function g8(e) {
  var t = b8(e, "string");
  return zu(t) == "symbol" ? t : t + "";
}
function b8(e, t) {
  if (zu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (zu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var PE = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, NE = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, x8 = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, S8 = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, tD = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, _8 = Object.keys(tD), xo = "NaN";
function O8(e, t) {
  return e * tD[t];
}
var Ls = /* @__PURE__ */ (function() {
  function e(t, n) {
    y8(this, e), this.num = t, this.unit = n, this.num = t, this.unit = n, Number.isNaN(t) && (this.unit = ""), n !== "" && !x8.test(n) && (this.num = NaN, this.unit = ""), _8.includes(n) && (this.num = O8(t, n), this.unit = "px");
  }
  return m8(e, [{
    key: "add",
    value: function(n) {
      return this.unit !== n.unit ? new e(NaN, "") : new e(this.num + n.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function(n) {
      return this.unit !== n.unit ? new e(NaN, "") : new e(this.num - n.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function(n) {
      return this.unit !== "" && n.unit !== "" && this.unit !== n.unit ? new e(NaN, "") : new e(this.num * n.num, this.unit || n.unit);
    }
  }, {
    key: "divide",
    value: function(n) {
      return this.unit !== "" && n.unit !== "" && this.unit !== n.unit ? new e(NaN, "") : new e(this.num / n.num, this.unit || n.unit);
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function(n) {
      var r, o = (r = S8.exec(n)) !== null && r !== void 0 ? r : [], u = hf(o, 3), c = u[1], f = u[2];
      return new e(parseFloat(c), f ?? "");
    }
  }]);
})();
function nD(e) {
  if (e.includes(xo))
    return xo;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var n, r = (n = PE.exec(t)) !== null && n !== void 0 ? n : [], o = hf(r, 4), u = o[1], c = o[2], f = o[3], d = Ls.parse(u ?? ""), h = Ls.parse(f ?? ""), y = c === "*" ? d.multiply(h) : d.divide(h);
    if (y.isNaN())
      return xo;
    t = t.replace(PE, y.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var v, g = (v = NE.exec(t)) !== null && v !== void 0 ? v : [], b = hf(g, 4), _ = b[1], S = b[2], x = b[3], A = Ls.parse(_ ?? ""), E = Ls.parse(x ?? ""), M = S === "+" ? A.add(E) : A.subtract(E);
    if (M.isNaN())
      return xo;
    t = t.replace(NE, M.toString());
  }
  return t;
}
var RE = /\(([^()]*)\)/;
function w8(e) {
  for (var t = e; t.includes("("); ) {
    var n = RE.exec(t), r = hf(n, 2), o = r[1];
    t = t.replace(RE, nD(o));
  }
  return t;
}
function A8(e) {
  var t = e.replace(/\s+/g, "");
  return t = w8(t), t = nD(t), t;
}
function T8(e) {
  try {
    return A8(e);
  } catch {
    return xo;
  }
}
function sg(e) {
  var t = T8(e.slice(5, -1));
  return t === xo ? "" : t;
}
var E8 = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], j8 = ["dx", "dy", "angle", "className", "breakAll"];
function jb() {
  return jb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, jb.apply(this, arguments);
}
function $E(e, t) {
  if (e == null) return {};
  var n = M8(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function M8(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function zE(e, t) {
  return N8(e) || P8(e, t) || D8(e, t) || C8();
}
function C8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function D8(e, t) {
  if (e) {
    if (typeof e == "string") return qE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return qE(e, t);
  }
}
function qE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function P8(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t === 0) {
        if (Object(n) !== n) return;
        d = !1;
      } else for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function N8(e) {
  if (Array.isArray(e)) return e;
}
var rD = /[ \f\n\r\t\v\u2028\u2029]+/, aD = function(t) {
  var n = t.children, r = t.breakAll, o = t.style;
  try {
    var u = [];
    we(n) || (r ? u = n.toString().split("") : u = n.toString().split(rD));
    var c = u.map(function(d) {
      return {
        word: d,
        width: bu(d, o).width
      };
    }), f = r ? 0 : bu(" ", o).width;
    return {
      wordsWithComputedWidth: c,
      spaceWidth: f
    };
  } catch {
    return null;
  }
}, R8 = function(t, n, r, o, u) {
  var c = t.maxLines, f = t.children, d = t.style, h = t.breakAll, y = de(c), v = f, g = function() {
    var F = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return F.reduce(function($, K) {
      var ne = K.word, G = K.width, ee = $[$.length - 1];
      if (ee && (o == null || u || ee.width + G + r < Number(o)))
        ee.words.push(ne), ee.width += G + r;
      else {
        var P = {
          words: [ne],
          width: G
        };
        $.push(P);
      }
      return $;
    }, []);
  }, b = g(n), _ = function(F) {
    return F.reduce(function($, K) {
      return $.width > K.width ? $ : K;
    });
  };
  if (!y)
    return b;
  for (var S = "…", x = function(F) {
    var $ = v.slice(0, F), K = aD({
      breakAll: h,
      style: d,
      children: $ + S
    }).wordsWithComputedWidth, ne = g(K), G = ne.length > c || _(ne).width > Number(o);
    return [G, ne];
  }, A = 0, E = v.length - 1, M = 0, C; A <= E && M <= v.length - 1; ) {
    var w = Math.floor((A + E) / 2), T = w - 1, j = x(T), N = zE(j, 2), z = N[0], k = N[1], B = x(w), q = zE(B, 1), V = q[0];
    if (!z && !V && (A = w + 1), z && V && (E = w - 1), !z && V) {
      C = k;
      break;
    }
    M++;
  }
  return C || b;
}, kE = function(t) {
  var n = we(t) ? [] : t.toString().split(rD);
  return [{
    words: n
  }];
}, $8 = function(t) {
  var n = t.width, r = t.scaleToFit, o = t.children, u = t.style, c = t.breakAll, f = t.maxLines;
  if ((n || r) && !Na.isSsr) {
    var d, h, y = aD({
      breakAll: c,
      children: o,
      style: u
    });
    if (y) {
      var v = y.wordsWithComputedWidth, g = y.spaceWidth;
      d = v, h = g;
    } else
      return kE(o);
    return R8({
      breakAll: c,
      children: o,
      maxLines: f,
      style: u
    }, d, h, n, r);
  }
  return kE(o);
}, BE = "#808080", pf = function(t) {
  var n = t.x, r = n === void 0 ? 0 : n, o = t.y, u = o === void 0 ? 0 : o, c = t.lineHeight, f = c === void 0 ? "1em" : c, d = t.capHeight, h = d === void 0 ? "0.71em" : d, y = t.scaleToFit, v = y === void 0 ? !1 : y, g = t.textAnchor, b = g === void 0 ? "start" : g, _ = t.verticalAnchor, S = _ === void 0 ? "end" : _, x = t.fill, A = x === void 0 ? BE : x, E = $E(t, E8), M = J.useMemo(function() {
    return $8({
      breakAll: E.breakAll,
      children: E.children,
      maxLines: E.maxLines,
      scaleToFit: v,
      style: E.style,
      width: E.width
    });
  }, [E.breakAll, E.children, E.maxLines, v, E.style, E.width]), C = E.dx, w = E.dy, T = E.angle, j = E.className, N = E.breakAll, z = $E(E, j8);
  if (!wt(r) || !wt(u))
    return null;
  var k = r + (de(C) ? C : 0), B = u + (de(w) ? w : 0), q;
  switch (S) {
    case "start":
      q = sg("calc(".concat(h, ")"));
      break;
    case "middle":
      q = sg("calc(".concat((M.length - 1) / 2, " * -").concat(f, " + (").concat(h, " / 2))"));
      break;
    default:
      q = sg("calc(".concat(M.length - 1, " * -").concat(f, ")"));
      break;
  }
  var V = [];
  if (v) {
    var Y = M[0].width, F = E.width;
    V.push("scale(".concat((de(F) ? F / Y : 1) / Y, ")"));
  }
  return T && V.push("rotate(".concat(T, ", ").concat(k, ", ").concat(B, ")")), V.length && (z.transform = V.join(" ")), /* @__PURE__ */ U.createElement("text", jb({}, Te(z, !0), {
    x: k,
    y: B,
    className: $e("recharts-text", j),
    textAnchor: b,
    fill: A.includes("url") ? BE : A
  }), M.map(function($, K) {
    var ne = $.words.join(N ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ U.createElement("tspan", {
        x: k,
        dy: K === 0 ? q : f,
        key: "".concat(ne, "-").concat(K)
      }, ne)
    );
  }));
};
function Ca(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function z8(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function a1(e) {
  let t, n, r;
  e.length !== 2 ? (t = Ca, n = (f, d) => Ca(e(f), d), r = (f, d) => e(f) - d) : (t = e === Ca || e === z8 ? e : q8, n = e, r = e);
  function o(f, d, h = 0, y = f.length) {
    if (h < y) {
      if (t(d, d) !== 0) return y;
      do {
        const v = h + y >>> 1;
        n(f[v], d) < 0 ? h = v + 1 : y = v;
      } while (h < y);
    }
    return h;
  }
  function u(f, d, h = 0, y = f.length) {
    if (h < y) {
      if (t(d, d) !== 0) return y;
      do {
        const v = h + y >>> 1;
        n(f[v], d) <= 0 ? h = v + 1 : y = v;
      } while (h < y);
    }
    return h;
  }
  function c(f, d, h = 0, y = f.length) {
    const v = o(f, d, h, y - 1);
    return v > h && r(f[v - 1], d) > -r(f[v], d) ? v - 1 : v;
  }
  return { left: o, center: c, right: u };
}
function q8() {
  return 0;
}
function iD(e) {
  return e === null ? NaN : +e;
}
function* k8(e, t) {
  for (let n of e)
    n != null && (n = +n) >= n && (yield n);
}
const B8 = a1(Ca), hc = B8.right;
a1(iD).center;
class LE extends Map {
  constructor(t, n = I8) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null) for (const [r, o] of t) this.set(r, o);
  }
  get(t) {
    return super.get(UE(this, t));
  }
  has(t) {
    return super.has(UE(this, t));
  }
  set(t, n) {
    return super.set(L8(this, t), n);
  }
  delete(t) {
    return super.delete(U8(this, t));
  }
}
function UE({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : n;
}
function L8({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function U8({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) && (n = e.get(r), e.delete(r)), n;
}
function I8(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function H8(e = Ca) {
  if (e === Ca) return oD;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, n) => {
    const r = e(t, n);
    return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
  };
}
function oD(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const G8 = Math.sqrt(50), Y8 = Math.sqrt(10), K8 = Math.sqrt(2);
function vf(e, t, n) {
  const r = (t - e) / Math.max(0, n), o = Math.floor(Math.log10(r)), u = r / Math.pow(10, o), c = u >= G8 ? 10 : u >= Y8 ? 5 : u >= K8 ? 2 : 1;
  let f, d, h;
  return o < 0 ? (h = Math.pow(10, -o) / c, f = Math.round(e * h), d = Math.round(t * h), f / h < e && ++f, d / h > t && --d, h = -h) : (h = Math.pow(10, o) * c, f = Math.round(e / h), d = Math.round(t / h), f * h < e && ++f, d * h > t && --d), d < f && 0.5 <= n && n < 2 ? vf(e, t, n * 2) : [f, d, h];
}
function Mb(e, t, n) {
  if (t = +t, e = +e, n = +n, !(n > 0)) return [];
  if (e === t) return [e];
  const r = t < e, [o, u, c] = r ? vf(t, e, n) : vf(e, t, n);
  if (!(u >= o)) return [];
  const f = u - o + 1, d = new Array(f);
  if (r)
    if (c < 0) for (let h = 0; h < f; ++h) d[h] = (u - h) / -c;
    else for (let h = 0; h < f; ++h) d[h] = (u - h) * c;
  else if (c < 0) for (let h = 0; h < f; ++h) d[h] = (o + h) / -c;
  else for (let h = 0; h < f; ++h) d[h] = (o + h) * c;
  return d;
}
function Cb(e, t, n) {
  return t = +t, e = +e, n = +n, vf(e, t, n)[2];
}
function Db(e, t, n) {
  t = +t, e = +e, n = +n;
  const r = t < e, o = r ? Cb(t, e, n) : Cb(e, t, n);
  return (r ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
function IE(e, t) {
  let n;
  for (const r of e)
    r != null && (n < r || n === void 0 && r >= r) && (n = r);
  return n;
}
function HE(e, t) {
  let n;
  for (const r of e)
    r != null && (n > r || n === void 0 && r >= r) && (n = r);
  return n;
}
function lD(e, t, n = 0, r = 1 / 0, o) {
  if (t = Math.floor(t), n = Math.floor(Math.max(0, n)), r = Math.floor(Math.min(e.length - 1, r)), !(n <= t && t <= r)) return e;
  for (o = o === void 0 ? oD : H8(o); r > n; ) {
    if (r - n > 600) {
      const d = r - n + 1, h = t - n + 1, y = Math.log(d), v = 0.5 * Math.exp(2 * y / 3), g = 0.5 * Math.sqrt(y * v * (d - v) / d) * (h - d / 2 < 0 ? -1 : 1), b = Math.max(n, Math.floor(t - h * v / d + g)), _ = Math.min(r, Math.floor(t + (d - h) * v / d + g));
      lD(e, t, b, _, o);
    }
    const u = e[t];
    let c = n, f = r;
    for (ou(e, n, t), o(e[r], u) > 0 && ou(e, n, r); c < f; ) {
      for (ou(e, c, f), ++c, --f; o(e[c], u) < 0; ) ++c;
      for (; o(e[f], u) > 0; ) --f;
    }
    o(e[n], u) === 0 ? ou(e, n, f) : (++f, ou(e, f, r)), f <= t && (n = f + 1), t <= f && (r = f - 1);
  }
  return e;
}
function ou(e, t, n) {
  const r = e[t];
  e[t] = e[n], e[n] = r;
}
function X8(e, t, n) {
  if (e = Float64Array.from(k8(e)), !(!(r = e.length) || isNaN(t = +t))) {
    if (t <= 0 || r < 2) return HE(e);
    if (t >= 1) return IE(e);
    var r, o = (r - 1) * t, u = Math.floor(o), c = IE(lD(e, u).subarray(0, u + 1)), f = HE(e.subarray(u + 1));
    return c + (f - c) * (o - u);
  }
}
function V8(e, t, n = iD) {
  if (!(!(r = e.length) || isNaN(t = +t))) {
    if (t <= 0 || r < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[r - 1], r - 1, e);
    var r, o = (r - 1) * t, u = Math.floor(o), c = +n(e[u], u, e), f = +n(e[u + 1], u + 1, e);
    return c + (f - c) * (o - u);
  }
}
function F8(e, t, n) {
  e = +e, t = +t, n = (o = arguments.length) < 2 ? (t = e, e = 0, 1) : o < 3 ? 1 : +n;
  for (var r = -1, o = Math.max(0, Math.ceil((t - e) / n)) | 0, u = new Array(o); ++r < o; )
    u[r] = e + r * n;
  return u;
}
function Un(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Fr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const Pb = Symbol("implicit");
function i1() {
  var e = new LE(), t = [], n = [], r = Pb;
  function o(u) {
    let c = e.get(u);
    if (c === void 0) {
      if (r !== Pb) return r;
      e.set(u, c = t.push(u) - 1);
    }
    return n[c % n.length];
  }
  return o.domain = function(u) {
    if (!arguments.length) return t.slice();
    t = [], e = new LE();
    for (const c of u)
      e.has(c) || e.set(c, t.push(c) - 1);
    return o;
  }, o.range = function(u) {
    return arguments.length ? (n = Array.from(u), o) : n.slice();
  }, o.unknown = function(u) {
    return arguments.length ? (r = u, o) : r;
  }, o.copy = function() {
    return i1(t, n).unknown(r);
  }, Un.apply(o, arguments), o;
}
function qu() {
  var e = i1().unknown(void 0), t = e.domain, n = e.range, r = 0, o = 1, u, c, f = !1, d = 0, h = 0, y = 0.5;
  delete e.unknown;
  function v() {
    var g = t().length, b = o < r, _ = b ? o : r, S = b ? r : o;
    u = (S - _) / Math.max(1, g - d + h * 2), f && (u = Math.floor(u)), _ += (S - _ - u * (g - d)) * y, c = u * (1 - d), f && (_ = Math.round(_), c = Math.round(c));
    var x = F8(g).map(function(A) {
      return _ + u * A;
    });
    return n(b ? x.reverse() : x);
  }
  return e.domain = function(g) {
    return arguments.length ? (t(g), v()) : t();
  }, e.range = function(g) {
    return arguments.length ? ([r, o] = g, r = +r, o = +o, v()) : [r, o];
  }, e.rangeRound = function(g) {
    return [r, o] = g, r = +r, o = +o, f = !0, v();
  }, e.bandwidth = function() {
    return c;
  }, e.step = function() {
    return u;
  }, e.round = function(g) {
    return arguments.length ? (f = !!g, v()) : f;
  }, e.padding = function(g) {
    return arguments.length ? (d = Math.min(1, h = +g), v()) : d;
  }, e.paddingInner = function(g) {
    return arguments.length ? (d = Math.min(1, g), v()) : d;
  }, e.paddingOuter = function(g) {
    return arguments.length ? (h = +g, v()) : h;
  }, e.align = function(g) {
    return arguments.length ? (y = Math.max(0, Math.min(1, g)), v()) : y;
  }, e.copy = function() {
    return qu(t(), [r, o]).round(f).paddingInner(d).paddingOuter(h).align(y);
  }, Un.apply(v(), arguments);
}
function uD(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return uD(t());
  }, e;
}
function xu() {
  return uD(qu.apply(null, arguments).paddingInner(1));
}
function o1(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function cD(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function pc() {
}
var ku = 0.7, yf = 1 / ku, Ao = "\\s*([+-]?\\d+)\\s*", Bu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", fr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", W8 = /^#([0-9a-f]{3,8})$/, Z8 = new RegExp(`^rgb\\(${Ao},${Ao},${Ao}\\)$`), Q8 = new RegExp(`^rgb\\(${fr},${fr},${fr}\\)$`), J8 = new RegExp(`^rgba\\(${Ao},${Ao},${Ao},${Bu}\\)$`), e6 = new RegExp(`^rgba\\(${fr},${fr},${fr},${Bu}\\)$`), t6 = new RegExp(`^hsl\\(${Bu},${fr},${fr}\\)$`), n6 = new RegExp(`^hsla\\(${Bu},${fr},${fr},${Bu}\\)$`), GE = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
o1(pc, Lu, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: YE,
  // Deprecated! Use color.formatHex.
  formatHex: YE,
  formatHex8: r6,
  formatHsl: a6,
  formatRgb: KE,
  toString: KE
});
function YE() {
  return this.rgb().formatHex();
}
function r6() {
  return this.rgb().formatHex8();
}
function a6() {
  return sD(this).formatHsl();
}
function KE() {
  return this.rgb().formatRgb();
}
function Lu(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = W8.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? XE(t) : n === 3 ? new an(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Us(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Us(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Z8.exec(e)) ? new an(t[1], t[2], t[3], 1) : (t = Q8.exec(e)) ? new an(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = J8.exec(e)) ? Us(t[1], t[2], t[3], t[4]) : (t = e6.exec(e)) ? Us(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = t6.exec(e)) ? WE(t[1], t[2] / 100, t[3] / 100, 1) : (t = n6.exec(e)) ? WE(t[1], t[2] / 100, t[3] / 100, t[4]) : GE.hasOwnProperty(e) ? XE(GE[e]) : e === "transparent" ? new an(NaN, NaN, NaN, 0) : null;
}
function XE(e) {
  return new an(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Us(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new an(e, t, n, r);
}
function i6(e) {
  return e instanceof pc || (e = Lu(e)), e ? (e = e.rgb(), new an(e.r, e.g, e.b, e.opacity)) : new an();
}
function Nb(e, t, n, r) {
  return arguments.length === 1 ? i6(e) : new an(e, t, n, r ?? 1);
}
function an(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
o1(an, Nb, cD(pc, {
  brighter(e) {
    return e = e == null ? yf : Math.pow(yf, e), new an(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ku : Math.pow(ku, e), new an(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new an(ci(this.r), ci(this.g), ci(this.b), mf(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: VE,
  // Deprecated! Use color.formatHex.
  formatHex: VE,
  formatHex8: o6,
  formatRgb: FE,
  toString: FE
}));
function VE() {
  return `#${ii(this.r)}${ii(this.g)}${ii(this.b)}`;
}
function o6() {
  return `#${ii(this.r)}${ii(this.g)}${ii(this.b)}${ii((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function FE() {
  const e = mf(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ci(this.r)}, ${ci(this.g)}, ${ci(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function mf(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ci(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ii(e) {
  return e = ci(e), (e < 16 ? "0" : "") + e.toString(16);
}
function WE(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Fn(e, t, n, r);
}
function sD(e) {
  if (e instanceof Fn) return new Fn(e.h, e.s, e.l, e.opacity);
  if (e instanceof pc || (e = Lu(e)), !e) return new Fn();
  if (e instanceof Fn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, o = Math.min(t, n, r), u = Math.max(t, n, r), c = NaN, f = u - o, d = (u + o) / 2;
  return f ? (t === u ? c = (n - r) / f + (n < r) * 6 : n === u ? c = (r - t) / f + 2 : c = (t - n) / f + 4, f /= d < 0.5 ? u + o : 2 - u - o, c *= 60) : f = d > 0 && d < 1 ? 0 : c, new Fn(c, f, d, e.opacity);
}
function l6(e, t, n, r) {
  return arguments.length === 1 ? sD(e) : new Fn(e, t, n, r ?? 1);
}
function Fn(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
o1(Fn, l6, cD(pc, {
  brighter(e) {
    return e = e == null ? yf : Math.pow(yf, e), new Fn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ku : Math.pow(ku, e), new Fn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - r;
    return new an(
      fg(e >= 240 ? e - 240 : e + 120, o, r),
      fg(e, o, r),
      fg(e < 120 ? e + 240 : e - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new Fn(ZE(this.h), Is(this.s), Is(this.l), mf(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = mf(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ZE(this.h)}, ${Is(this.s) * 100}%, ${Is(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function ZE(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Is(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function fg(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const l1 = (e) => () => e;
function u6(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function c6(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function s6(e) {
  return (e = +e) == 1 ? fD : function(t, n) {
    return n - t ? c6(t, n, e) : l1(isNaN(t) ? n : t);
  };
}
function fD(e, t) {
  var n = t - e;
  return n ? u6(e, n) : l1(isNaN(e) ? t : e);
}
const QE = (function e(t) {
  var n = s6(t);
  function r(o, u) {
    var c = n((o = Nb(o)).r, (u = Nb(u)).r), f = n(o.g, u.g), d = n(o.b, u.b), h = fD(o.opacity, u.opacity);
    return function(y) {
      return o.r = c(y), o.g = f(y), o.b = d(y), o.opacity = h(y), o + "";
    };
  }
  return r.gamma = e, r;
})(1);
function f6(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), o;
  return function(u) {
    for (o = 0; o < n; ++o) r[o] = e[o] * (1 - u) + t[o] * u;
    return r;
  };
}
function d6(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function h6(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, o = new Array(r), u = new Array(n), c;
  for (c = 0; c < r; ++c) o[c] = ol(e[c], t[c]);
  for (; c < n; ++c) u[c] = t[c];
  return function(f) {
    for (c = 0; c < r; ++c) u[c] = o[c](f);
    return u;
  };
}
function p6(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function gf(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function v6(e, t) {
  var n = {}, r = {}, o;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (o in t)
    o in e ? n[o] = ol(e[o], t[o]) : r[o] = t[o];
  return function(u) {
    for (o in n) r[o] = n[o](u);
    return r;
  };
}
var Rb = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, dg = new RegExp(Rb.source, "g");
function y6(e) {
  return function() {
    return e;
  };
}
function m6(e) {
  return function(t) {
    return e(t) + "";
  };
}
function g6(e, t) {
  var n = Rb.lastIndex = dg.lastIndex = 0, r, o, u, c = -1, f = [], d = [];
  for (e = e + "", t = t + ""; (r = Rb.exec(e)) && (o = dg.exec(t)); )
    (u = o.index) > n && (u = t.slice(n, u), f[c] ? f[c] += u : f[++c] = u), (r = r[0]) === (o = o[0]) ? f[c] ? f[c] += o : f[++c] = o : (f[++c] = null, d.push({ i: c, x: gf(r, o) })), n = dg.lastIndex;
  return n < t.length && (u = t.slice(n), f[c] ? f[c] += u : f[++c] = u), f.length < 2 ? d[0] ? m6(d[0].x) : y6(t) : (t = d.length, function(h) {
    for (var y = 0, v; y < t; ++y) f[(v = d[y]).i] = v.x(h);
    return f.join("");
  });
}
function ol(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? l1(t) : (n === "number" ? gf : n === "string" ? (r = Lu(t)) ? (t = r, QE) : g6 : t instanceof Lu ? QE : t instanceof Date ? p6 : d6(t) ? f6 : Array.isArray(t) ? h6 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? v6 : gf)(e, t);
}
function u1(e, t) {
  return e = +e, t = +t, function(n) {
    return Math.round(e * (1 - n) + t * n);
  };
}
function b6(e, t) {
  t === void 0 && (t = e, e = ol);
  for (var n = 0, r = t.length - 1, o = t[0], u = new Array(r < 0 ? 0 : r); n < r; ) u[n] = e(o, o = t[++n]);
  return function(c) {
    var f = Math.max(0, Math.min(r - 1, Math.floor(c *= r)));
    return u[f](c - f);
  };
}
function x6(e) {
  return function() {
    return e;
  };
}
function bf(e) {
  return +e;
}
var JE = [0, 1];
function Ft(e) {
  return e;
}
function $b(e, t) {
  return (t -= e = +e) ? function(n) {
    return (n - e) / t;
  } : x6(isNaN(t) ? NaN : 0.5);
}
function S6(e, t) {
  var n;
  return e > t && (n = e, e = t, t = n), function(r) {
    return Math.max(e, Math.min(t, r));
  };
}
function _6(e, t, n) {
  var r = e[0], o = e[1], u = t[0], c = t[1];
  return o < r ? (r = $b(o, r), u = n(c, u)) : (r = $b(r, o), u = n(u, c)), function(f) {
    return u(r(f));
  };
}
function O6(e, t, n) {
  var r = Math.min(e.length, t.length) - 1, o = new Array(r), u = new Array(r), c = -1;
  for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++c < r; )
    o[c] = $b(e[c], e[c + 1]), u[c] = n(t[c], t[c + 1]);
  return function(f) {
    var d = hc(e, f, 1, r) - 1;
    return u[d](o[d](f));
  };
}
function vc(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function md() {
  var e = JE, t = JE, n = ol, r, o, u, c = Ft, f, d, h;
  function y() {
    var g = Math.min(e.length, t.length);
    return c !== Ft && (c = S6(e[0], e[g - 1])), f = g > 2 ? O6 : _6, d = h = null, v;
  }
  function v(g) {
    return g == null || isNaN(g = +g) ? u : (d || (d = f(e.map(r), t, n)))(r(c(g)));
  }
  return v.invert = function(g) {
    return c(o((h || (h = f(t, e.map(r), gf)))(g)));
  }, v.domain = function(g) {
    return arguments.length ? (e = Array.from(g, bf), y()) : e.slice();
  }, v.range = function(g) {
    return arguments.length ? (t = Array.from(g), y()) : t.slice();
  }, v.rangeRound = function(g) {
    return t = Array.from(g), n = u1, y();
  }, v.clamp = function(g) {
    return arguments.length ? (c = g ? !0 : Ft, y()) : c !== Ft;
  }, v.interpolate = function(g) {
    return arguments.length ? (n = g, y()) : n;
  }, v.unknown = function(g) {
    return arguments.length ? (u = g, v) : u;
  }, function(g, b) {
    return r = g, o = b, y();
  };
}
function c1() {
  return md()(Ft, Ft);
}
function w6(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function xf(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +e.slice(n + 1)
  ];
}
function No(e) {
  return e = xf(Math.abs(e)), e ? e[1] : NaN;
}
function A6(e, t) {
  return function(n, r) {
    for (var o = n.length, u = [], c = 0, f = e[0], d = 0; o > 0 && f > 0 && (d + f + 1 > r && (f = Math.max(1, r - d)), u.push(n.substring(o -= f, o + f)), !((d += f + 1) > r)); )
      f = e[c = (c + 1) % e.length];
    return u.reverse().join(t);
  };
}
function T6(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(n) {
      return e[+n];
    });
  };
}
var E6 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Uu(e) {
  if (!(t = E6.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new s1({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
Uu.prototype = s1.prototype;
function s1(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
s1.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function j6(e) {
  e: for (var t = e.length, n = 1, r = -1, o; n < t; ++n)
    switch (e[n]) {
      case ".":
        r = o = n;
        break;
      case "0":
        r === 0 && (r = n), o = n;
        break;
      default:
        if (!+e[n]) break e;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(o + 1) : e;
}
var Sf;
function M6(e, t) {
  var n = xf(e, t);
  if (!n) return Sf = void 0, e.toPrecision(t);
  var r = n[0], o = n[1], u = o - (Sf = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, c = r.length;
  return u === c ? r : u > c ? r + new Array(u - c + 1).join("0") : u > 0 ? r.slice(0, u) + "." + r.slice(u) : "0." + new Array(1 - u).join("0") + xf(e, Math.max(0, t + u - 1))[0];
}
function e2(e, t) {
  var n = xf(e, t);
  if (!n) return e + "";
  var r = n[0], o = n[1];
  return o < 0 ? "0." + new Array(-o).join("0") + r : r.length > o + 1 ? r.slice(0, o + 1) + "." + r.slice(o + 1) : r + new Array(o - r.length + 2).join("0");
}
const t2 = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: w6,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => e2(e * 100, t),
  r: e2,
  s: M6,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function n2(e) {
  return e;
}
var r2 = Array.prototype.map, a2 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function C6(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? n2 : A6(r2.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", o = e.decimal === void 0 ? "." : e.decimal + "", u = e.numerals === void 0 ? n2 : T6(r2.call(e.numerals, String)), c = e.percent === void 0 ? "%" : e.percent + "", f = e.minus === void 0 ? "−" : e.minus + "", d = e.nan === void 0 ? "NaN" : e.nan + "";
  function h(v, g) {
    v = Uu(v);
    var b = v.fill, _ = v.align, S = v.sign, x = v.symbol, A = v.zero, E = v.width, M = v.comma, C = v.precision, w = v.trim, T = v.type;
    T === "n" ? (M = !0, T = "g") : t2[T] || (C === void 0 && (C = 12), w = !0, T = "g"), (A || b === "0" && _ === "=") && (A = !0, b = "0", _ = "=");
    var j = (g && g.prefix !== void 0 ? g.prefix : "") + (x === "$" ? n : x === "#" && /[boxX]/.test(T) ? "0" + T.toLowerCase() : ""), N = (x === "$" ? r : /[%p]/.test(T) ? c : "") + (g && g.suffix !== void 0 ? g.suffix : ""), z = t2[T], k = /[defgprs%]/.test(T);
    C = C === void 0 ? 6 : /[gprs]/.test(T) ? Math.max(1, Math.min(21, C)) : Math.max(0, Math.min(20, C));
    function B(q) {
      var V = j, Y = N, F, $, K;
      if (T === "c")
        Y = z(q) + Y, q = "";
      else {
        q = +q;
        var ne = q < 0 || 1 / q < 0;
        if (q = isNaN(q) ? d : z(Math.abs(q), C), w && (q = j6(q)), ne && +q == 0 && S !== "+" && (ne = !1), V = (ne ? S === "(" ? S : f : S === "-" || S === "(" ? "" : S) + V, Y = (T === "s" && !isNaN(q) && Sf !== void 0 ? a2[8 + Sf / 3] : "") + Y + (ne && S === "(" ? ")" : ""), k) {
          for (F = -1, $ = q.length; ++F < $; )
            if (K = q.charCodeAt(F), 48 > K || K > 57) {
              Y = (K === 46 ? o + q.slice(F + 1) : q.slice(F)) + Y, q = q.slice(0, F);
              break;
            }
        }
      }
      M && !A && (q = t(q, 1 / 0));
      var G = V.length + q.length + Y.length, ee = G < E ? new Array(E - G + 1).join(b) : "";
      switch (M && A && (q = t(ee + q, ee.length ? E - Y.length : 1 / 0), ee = ""), _) {
        case "<":
          q = V + q + Y + ee;
          break;
        case "=":
          q = V + ee + q + Y;
          break;
        case "^":
          q = ee.slice(0, G = ee.length >> 1) + V + q + Y + ee.slice(G);
          break;
        default:
          q = ee + V + q + Y;
          break;
      }
      return u(q);
    }
    return B.toString = function() {
      return v + "";
    }, B;
  }
  function y(v, g) {
    var b = Math.max(-8, Math.min(8, Math.floor(No(g) / 3))) * 3, _ = Math.pow(10, -b), S = h((v = Uu(v), v.type = "f", v), { suffix: a2[8 + b / 3] });
    return function(x) {
      return S(_ * x);
    };
  }
  return {
    format: h,
    formatPrefix: y
  };
}
var Hs, f1, dD;
D6({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function D6(e) {
  return Hs = C6(e), f1 = Hs.format, dD = Hs.formatPrefix, Hs;
}
function P6(e) {
  return Math.max(0, -No(Math.abs(e)));
}
function N6(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(No(t) / 3))) * 3 - No(Math.abs(e)));
}
function R6(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, No(t) - No(e)) + 1;
}
function hD(e, t, n, r) {
  var o = Db(e, t, n), u;
  switch (r = Uu(r ?? ",f"), r.type) {
    case "s": {
      var c = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN(u = N6(o, c)) && (r.precision = u), dD(r, c);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(u = R6(o, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = u - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(u = P6(o)) && (r.precision = u - (r.type === "%") * 2);
      break;
    }
  }
  return f1(r);
}
function Ra(e) {
  var t = e.domain;
  return e.ticks = function(n) {
    var r = t();
    return Mb(r[0], r[r.length - 1], n ?? 10);
  }, e.tickFormat = function(n, r) {
    var o = t();
    return hD(o[0], o[o.length - 1], n ?? 10, r);
  }, e.nice = function(n) {
    n == null && (n = 10);
    var r = t(), o = 0, u = r.length - 1, c = r[o], f = r[u], d, h, y = 10;
    for (f < c && (h = c, c = f, f = h, h = o, o = u, u = h); y-- > 0; ) {
      if (h = Cb(c, f, n), h === d)
        return r[o] = c, r[u] = f, t(r);
      if (h > 0)
        c = Math.floor(c / h) * h, f = Math.ceil(f / h) * h;
      else if (h < 0)
        c = Math.ceil(c * h) / h, f = Math.floor(f * h) / h;
      else
        break;
      d = h;
    }
    return e;
  }, e;
}
function _f() {
  var e = c1();
  return e.copy = function() {
    return vc(e, _f());
  }, Un.apply(e, arguments), Ra(e);
}
function pD(e) {
  var t;
  function n(r) {
    return r == null || isNaN(r = +r) ? t : r;
  }
  return n.invert = n, n.domain = n.range = function(r) {
    return arguments.length ? (e = Array.from(r, bf), n) : e.slice();
  }, n.unknown = function(r) {
    return arguments.length ? (t = r, n) : t;
  }, n.copy = function() {
    return pD(e).unknown(t);
  }, e = arguments.length ? Array.from(e, bf) : [0, 1], Ra(n);
}
function vD(e, t) {
  e = e.slice();
  var n = 0, r = e.length - 1, o = e[n], u = e[r], c;
  return u < o && (c = n, n = r, r = c, c = o, o = u, u = c), e[n] = t.floor(o), e[r] = t.ceil(u), e;
}
function i2(e) {
  return Math.log(e);
}
function o2(e) {
  return Math.exp(e);
}
function $6(e) {
  return -Math.log(-e);
}
function z6(e) {
  return -Math.exp(-e);
}
function q6(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function k6(e) {
  return e === 10 ? q6 : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function B6(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function l2(e) {
  return (t, n) => -e(-t, n);
}
function d1(e) {
  const t = e(i2, o2), n = t.domain;
  let r = 10, o, u;
  function c() {
    return o = B6(r), u = k6(r), n()[0] < 0 ? (o = l2(o), u = l2(u), e($6, z6)) : e(i2, o2), t;
  }
  return t.base = function(f) {
    return arguments.length ? (r = +f, c()) : r;
  }, t.domain = function(f) {
    return arguments.length ? (n(f), c()) : n();
  }, t.ticks = (f) => {
    const d = n();
    let h = d[0], y = d[d.length - 1];
    const v = y < h;
    v && ([h, y] = [y, h]);
    let g = o(h), b = o(y), _, S;
    const x = f == null ? 10 : +f;
    let A = [];
    if (!(r % 1) && b - g < x) {
      if (g = Math.floor(g), b = Math.ceil(b), h > 0) {
        for (; g <= b; ++g)
          for (_ = 1; _ < r; ++_)
            if (S = g < 0 ? _ / u(-g) : _ * u(g), !(S < h)) {
              if (S > y) break;
              A.push(S);
            }
      } else for (; g <= b; ++g)
        for (_ = r - 1; _ >= 1; --_)
          if (S = g > 0 ? _ / u(-g) : _ * u(g), !(S < h)) {
            if (S > y) break;
            A.push(S);
          }
      A.length * 2 < x && (A = Mb(h, y, x));
    } else
      A = Mb(g, b, Math.min(b - g, x)).map(u);
    return v ? A.reverse() : A;
  }, t.tickFormat = (f, d) => {
    if (f == null && (f = 10), d == null && (d = r === 10 ? "s" : ","), typeof d != "function" && (!(r % 1) && (d = Uu(d)).precision == null && (d.trim = !0), d = f1(d)), f === 1 / 0) return d;
    const h = Math.max(1, r * f / t.ticks().length);
    return (y) => {
      let v = y / u(Math.round(o(y)));
      return v * r < r - 0.5 && (v *= r), v <= h ? d(y) : "";
    };
  }, t.nice = () => n(vD(n(), {
    floor: (f) => u(Math.floor(o(f))),
    ceil: (f) => u(Math.ceil(o(f)))
  })), t;
}
function yD() {
  const e = d1(md()).domain([1, 10]);
  return e.copy = () => vc(e, yD()).base(e.base()), Un.apply(e, arguments), e;
}
function u2(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function c2(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function h1(e) {
  var t = 1, n = e(u2(t), c2(t));
  return n.constant = function(r) {
    return arguments.length ? e(u2(t = +r), c2(t)) : t;
  }, Ra(n);
}
function mD() {
  var e = h1(md());
  return e.copy = function() {
    return vc(e, mD()).constant(e.constant());
  }, Un.apply(e, arguments);
}
function s2(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function L6(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function U6(e) {
  return e < 0 ? -e * e : e * e;
}
function p1(e) {
  var t = e(Ft, Ft), n = 1;
  function r() {
    return n === 1 ? e(Ft, Ft) : n === 0.5 ? e(L6, U6) : e(s2(n), s2(1 / n));
  }
  return t.exponent = function(o) {
    return arguments.length ? (n = +o, r()) : n;
  }, Ra(t);
}
function v1() {
  var e = p1(md());
  return e.copy = function() {
    return vc(e, v1()).exponent(e.exponent());
  }, Un.apply(e, arguments), e;
}
function I6() {
  return v1.apply(null, arguments).exponent(0.5);
}
function f2(e) {
  return Math.sign(e) * e * e;
}
function H6(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function gD() {
  var e = c1(), t = [0, 1], n = !1, r;
  function o(u) {
    var c = H6(e(u));
    return isNaN(c) ? r : n ? Math.round(c) : c;
  }
  return o.invert = function(u) {
    return e.invert(f2(u));
  }, o.domain = function(u) {
    return arguments.length ? (e.domain(u), o) : e.domain();
  }, o.range = function(u) {
    return arguments.length ? (e.range((t = Array.from(u, bf)).map(f2)), o) : t.slice();
  }, o.rangeRound = function(u) {
    return o.range(u).round(!0);
  }, o.round = function(u) {
    return arguments.length ? (n = !!u, o) : n;
  }, o.clamp = function(u) {
    return arguments.length ? (e.clamp(u), o) : e.clamp();
  }, o.unknown = function(u) {
    return arguments.length ? (r = u, o) : r;
  }, o.copy = function() {
    return gD(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
  }, Un.apply(o, arguments), Ra(o);
}
function bD() {
  var e = [], t = [], n = [], r;
  function o() {
    var c = 0, f = Math.max(1, t.length);
    for (n = new Array(f - 1); ++c < f; ) n[c - 1] = V8(e, c / f);
    return u;
  }
  function u(c) {
    return c == null || isNaN(c = +c) ? r : t[hc(n, c)];
  }
  return u.invertExtent = function(c) {
    var f = t.indexOf(c);
    return f < 0 ? [NaN, NaN] : [
      f > 0 ? n[f - 1] : e[0],
      f < n.length ? n[f] : e[e.length - 1]
    ];
  }, u.domain = function(c) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let f of c) f != null && !isNaN(f = +f) && e.push(f);
    return e.sort(Ca), o();
  }, u.range = function(c) {
    return arguments.length ? (t = Array.from(c), o()) : t.slice();
  }, u.unknown = function(c) {
    return arguments.length ? (r = c, u) : r;
  }, u.quantiles = function() {
    return n.slice();
  }, u.copy = function() {
    return bD().domain(e).range(t).unknown(r);
  }, Un.apply(u, arguments);
}
function xD() {
  var e = 0, t = 1, n = 1, r = [0.5], o = [0, 1], u;
  function c(d) {
    return d != null && d <= d ? o[hc(r, d, 0, n)] : u;
  }
  function f() {
    var d = -1;
    for (r = new Array(n); ++d < n; ) r[d] = ((d + 1) * t - (d - n) * e) / (n + 1);
    return c;
  }
  return c.domain = function(d) {
    return arguments.length ? ([e, t] = d, e = +e, t = +t, f()) : [e, t];
  }, c.range = function(d) {
    return arguments.length ? (n = (o = Array.from(d)).length - 1, f()) : o.slice();
  }, c.invertExtent = function(d) {
    var h = o.indexOf(d);
    return h < 0 ? [NaN, NaN] : h < 1 ? [e, r[0]] : h >= n ? [r[n - 1], t] : [r[h - 1], r[h]];
  }, c.unknown = function(d) {
    return arguments.length && (u = d), c;
  }, c.thresholds = function() {
    return r.slice();
  }, c.copy = function() {
    return xD().domain([e, t]).range(o).unknown(u);
  }, Un.apply(Ra(c), arguments);
}
function SD() {
  var e = [0.5], t = [0, 1], n, r = 1;
  function o(u) {
    return u != null && u <= u ? t[hc(e, u, 0, r)] : n;
  }
  return o.domain = function(u) {
    return arguments.length ? (e = Array.from(u), r = Math.min(e.length, t.length - 1), o) : e.slice();
  }, o.range = function(u) {
    return arguments.length ? (t = Array.from(u), r = Math.min(e.length, t.length - 1), o) : t.slice();
  }, o.invertExtent = function(u) {
    var c = t.indexOf(u);
    return [e[c - 1], e[c]];
  }, o.unknown = function(u) {
    return arguments.length ? (n = u, o) : n;
  }, o.copy = function() {
    return SD().domain(e).range(t).unknown(n);
  }, Un.apply(o, arguments);
}
const hg = /* @__PURE__ */ new Date(), pg = /* @__PURE__ */ new Date();
function Tt(e, t, n, r) {
  function o(u) {
    return e(u = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+u)), u;
  }
  return o.floor = (u) => (e(u = /* @__PURE__ */ new Date(+u)), u), o.ceil = (u) => (e(u = new Date(u - 1)), t(u, 1), e(u), u), o.round = (u) => {
    const c = o(u), f = o.ceil(u);
    return u - c < f - u ? c : f;
  }, o.offset = (u, c) => (t(u = /* @__PURE__ */ new Date(+u), c == null ? 1 : Math.floor(c)), u), o.range = (u, c, f) => {
    const d = [];
    if (u = o.ceil(u), f = f == null ? 1 : Math.floor(f), !(u < c) || !(f > 0)) return d;
    let h;
    do
      d.push(h = /* @__PURE__ */ new Date(+u)), t(u, f), e(u);
    while (h < u && u < c);
    return d;
  }, o.filter = (u) => Tt((c) => {
    if (c >= c) for (; e(c), !u(c); ) c.setTime(c - 1);
  }, (c, f) => {
    if (c >= c)
      if (f < 0) for (; ++f <= 0; )
        for (; t(c, -1), !u(c); )
          ;
      else for (; --f >= 0; )
        for (; t(c, 1), !u(c); )
          ;
  }), n && (o.count = (u, c) => (hg.setTime(+u), pg.setTime(+c), e(hg), e(pg), Math.floor(n(hg, pg))), o.every = (u) => (u = Math.floor(u), !isFinite(u) || !(u > 0) ? null : u > 1 ? o.filter(r ? (c) => r(c) % u === 0 : (c) => o.count(0, c) % u === 0) : o)), o;
}
const Of = Tt(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Of.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Tt((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
  t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : Of);
Of.range;
const zr = 1e3, kn = zr * 60, qr = kn * 60, Hr = qr * 24, y1 = Hr * 7, d2 = Hr * 30, vg = Hr * 365, oi = Tt((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * zr);
}, (e, t) => (t - e) / zr, (e) => e.getUTCSeconds());
oi.range;
const m1 = Tt((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * zr);
}, (e, t) => {
  e.setTime(+e + t * kn);
}, (e, t) => (t - e) / kn, (e) => e.getMinutes());
m1.range;
const g1 = Tt((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * kn);
}, (e, t) => (t - e) / kn, (e) => e.getUTCMinutes());
g1.range;
const b1 = Tt((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * zr - e.getMinutes() * kn);
}, (e, t) => {
  e.setTime(+e + t * qr);
}, (e, t) => (t - e) / qr, (e) => e.getHours());
b1.range;
const x1 = Tt((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * qr);
}, (e, t) => (t - e) / qr, (e) => e.getUTCHours());
x1.range;
const yc = Tt(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * kn) / Hr,
  (e) => e.getDate() - 1
);
yc.range;
const gd = Tt((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Hr, (e) => e.getUTCDate() - 1);
gd.range;
const _D = Tt((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Hr, (e) => Math.floor(e / Hr));
_D.range;
function xi(e) {
  return Tt((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, n) => {
    t.setDate(t.getDate() + n * 7);
  }, (t, n) => (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * kn) / y1);
}
const bd = xi(0), wf = xi(1), G6 = xi(2), Y6 = xi(3), Ro = xi(4), K6 = xi(5), X6 = xi(6);
bd.range;
wf.range;
G6.range;
Y6.range;
Ro.range;
K6.range;
X6.range;
function Si(e) {
  return Tt((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, n) => {
    t.setUTCDate(t.getUTCDate() + n * 7);
  }, (t, n) => (n - t) / y1);
}
const xd = Si(0), Af = Si(1), V6 = Si(2), F6 = Si(3), $o = Si(4), W6 = Si(5), Z6 = Si(6);
xd.range;
Af.range;
V6.range;
F6.range;
$o.range;
W6.range;
Z6.range;
const S1 = Tt((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
S1.range;
const _1 = Tt((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
_1.range;
const Gr = Tt((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Gr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Tt((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
  t.setFullYear(t.getFullYear() + n * e);
});
Gr.range;
const Yr = Tt((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Yr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Tt((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
  t.setUTCFullYear(t.getUTCFullYear() + n * e);
});
Yr.range;
function OD(e, t, n, r, o, u) {
  const c = [
    [oi, 1, zr],
    [oi, 5, 5 * zr],
    [oi, 15, 15 * zr],
    [oi, 30, 30 * zr],
    [u, 1, kn],
    [u, 5, 5 * kn],
    [u, 15, 15 * kn],
    [u, 30, 30 * kn],
    [o, 1, qr],
    [o, 3, 3 * qr],
    [o, 6, 6 * qr],
    [o, 12, 12 * qr],
    [r, 1, Hr],
    [r, 2, 2 * Hr],
    [n, 1, y1],
    [t, 1, d2],
    [t, 3, 3 * d2],
    [e, 1, vg]
  ];
  function f(h, y, v) {
    const g = y < h;
    g && ([h, y] = [y, h]);
    const b = v && typeof v.range == "function" ? v : d(h, y, v), _ = b ? b.range(h, +y + 1) : [];
    return g ? _.reverse() : _;
  }
  function d(h, y, v) {
    const g = Math.abs(y - h) / v, b = a1(([, , x]) => x).right(c, g);
    if (b === c.length) return e.every(Db(h / vg, y / vg, v));
    if (b === 0) return Of.every(Math.max(Db(h, y, v), 1));
    const [_, S] = c[g / c[b - 1][2] < c[b][2] / g ? b - 1 : b];
    return _.every(S);
  }
  return [f, d];
}
const [Q6, J6] = OD(Yr, _1, xd, _D, x1, g1), [e4, t4] = OD(Gr, S1, bd, yc, b1, m1);
function yg(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function mg(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function lu(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function n4(e) {
  var t = e.dateTime, n = e.date, r = e.time, o = e.periods, u = e.days, c = e.shortDays, f = e.months, d = e.shortMonths, h = uu(o), y = cu(o), v = uu(u), g = cu(u), b = uu(c), _ = cu(c), S = uu(f), x = cu(f), A = uu(d), E = cu(d), M = {
    a: K,
    A: ne,
    b: G,
    B: ee,
    c: null,
    d: g2,
    e: g2,
    f: A4,
    g: $4,
    G: q4,
    H: _4,
    I: O4,
    j: w4,
    L: wD,
    m: T4,
    M: E4,
    p: P,
    q: I,
    Q: S2,
    s: _2,
    S: j4,
    u: M4,
    U: C4,
    V: D4,
    w: P4,
    W: N4,
    x: null,
    X: null,
    y: R4,
    Y: z4,
    Z: k4,
    "%": x2
  }, C = {
    a: re,
    A: se,
    b: pe,
    B: fe,
    c: null,
    d: b2,
    e: b2,
    f: I4,
    g: Q4,
    G: e5,
    H: B4,
    I: L4,
    j: U4,
    L: TD,
    m: H4,
    M: G4,
    p: _e,
    q: Ce,
    Q: S2,
    s: _2,
    S: Y4,
    u: K4,
    U: X4,
    V: V4,
    w: F4,
    W: W4,
    x: null,
    X: null,
    y: Z4,
    Y: J4,
    Z: t5,
    "%": x2
  }, w = {
    a: k,
    A: B,
    b: q,
    B: V,
    c: Y,
    d: y2,
    e: y2,
    f: g4,
    g: v2,
    G: p2,
    H: m2,
    I: m2,
    j: p4,
    L: m4,
    m: h4,
    M: v4,
    p: z,
    q: d4,
    Q: x4,
    s: S4,
    S: y4,
    u: l4,
    U: u4,
    V: c4,
    w: o4,
    W: s4,
    x: F,
    X: $,
    y: v2,
    Y: p2,
    Z: f4,
    "%": b4
  };
  M.x = T(n, M), M.X = T(r, M), M.c = T(t, M), C.x = T(n, C), C.X = T(r, C), C.c = T(t, C);
  function T(ce, ge) {
    return function(he) {
      var ue = [], qe = -1, xe = 0, Qe = ce.length, Ye, Et, un;
      for (he instanceof Date || (he = /* @__PURE__ */ new Date(+he)); ++qe < Qe; )
        ce.charCodeAt(qe) === 37 && (ue.push(ce.slice(xe, qe)), (Et = h2[Ye = ce.charAt(++qe)]) != null ? Ye = ce.charAt(++qe) : Et = Ye === "e" ? " " : "0", (un = ge[Ye]) && (Ye = un(he, Et)), ue.push(Ye), xe = qe + 1);
      return ue.push(ce.slice(xe, qe)), ue.join("");
    };
  }
  function j(ce, ge) {
    return function(he) {
      var ue = lu(1900, void 0, 1), qe = N(ue, ce, he += "", 0), xe, Qe;
      if (qe != he.length) return null;
      if ("Q" in ue) return new Date(ue.Q);
      if ("s" in ue) return new Date(ue.s * 1e3 + ("L" in ue ? ue.L : 0));
      if (ge && !("Z" in ue) && (ue.Z = 0), "p" in ue && (ue.H = ue.H % 12 + ue.p * 12), ue.m === void 0 && (ue.m = "q" in ue ? ue.q : 0), "V" in ue) {
        if (ue.V < 1 || ue.V > 53) return null;
        "w" in ue || (ue.w = 1), "Z" in ue ? (xe = mg(lu(ue.y, 0, 1)), Qe = xe.getUTCDay(), xe = Qe > 4 || Qe === 0 ? Af.ceil(xe) : Af(xe), xe = gd.offset(xe, (ue.V - 1) * 7), ue.y = xe.getUTCFullYear(), ue.m = xe.getUTCMonth(), ue.d = xe.getUTCDate() + (ue.w + 6) % 7) : (xe = yg(lu(ue.y, 0, 1)), Qe = xe.getDay(), xe = Qe > 4 || Qe === 0 ? wf.ceil(xe) : wf(xe), xe = yc.offset(xe, (ue.V - 1) * 7), ue.y = xe.getFullYear(), ue.m = xe.getMonth(), ue.d = xe.getDate() + (ue.w + 6) % 7);
      } else ("W" in ue || "U" in ue) && ("w" in ue || (ue.w = "u" in ue ? ue.u % 7 : "W" in ue ? 1 : 0), Qe = "Z" in ue ? mg(lu(ue.y, 0, 1)).getUTCDay() : yg(lu(ue.y, 0, 1)).getDay(), ue.m = 0, ue.d = "W" in ue ? (ue.w + 6) % 7 + ue.W * 7 - (Qe + 5) % 7 : ue.w + ue.U * 7 - (Qe + 6) % 7);
      return "Z" in ue ? (ue.H += ue.Z / 100 | 0, ue.M += ue.Z % 100, mg(ue)) : yg(ue);
    };
  }
  function N(ce, ge, he, ue) {
    for (var qe = 0, xe = ge.length, Qe = he.length, Ye, Et; qe < xe; ) {
      if (ue >= Qe) return -1;
      if (Ye = ge.charCodeAt(qe++), Ye === 37) {
        if (Ye = ge.charAt(qe++), Et = w[Ye in h2 ? ge.charAt(qe++) : Ye], !Et || (ue = Et(ce, he, ue)) < 0) return -1;
      } else if (Ye != he.charCodeAt(ue++))
        return -1;
    }
    return ue;
  }
  function z(ce, ge, he) {
    var ue = h.exec(ge.slice(he));
    return ue ? (ce.p = y.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function k(ce, ge, he) {
    var ue = b.exec(ge.slice(he));
    return ue ? (ce.w = _.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function B(ce, ge, he) {
    var ue = v.exec(ge.slice(he));
    return ue ? (ce.w = g.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function q(ce, ge, he) {
    var ue = A.exec(ge.slice(he));
    return ue ? (ce.m = E.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function V(ce, ge, he) {
    var ue = S.exec(ge.slice(he));
    return ue ? (ce.m = x.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function Y(ce, ge, he) {
    return N(ce, t, ge, he);
  }
  function F(ce, ge, he) {
    return N(ce, n, ge, he);
  }
  function $(ce, ge, he) {
    return N(ce, r, ge, he);
  }
  function K(ce) {
    return c[ce.getDay()];
  }
  function ne(ce) {
    return u[ce.getDay()];
  }
  function G(ce) {
    return d[ce.getMonth()];
  }
  function ee(ce) {
    return f[ce.getMonth()];
  }
  function P(ce) {
    return o[+(ce.getHours() >= 12)];
  }
  function I(ce) {
    return 1 + ~~(ce.getMonth() / 3);
  }
  function re(ce) {
    return c[ce.getUTCDay()];
  }
  function se(ce) {
    return u[ce.getUTCDay()];
  }
  function pe(ce) {
    return d[ce.getUTCMonth()];
  }
  function fe(ce) {
    return f[ce.getUTCMonth()];
  }
  function _e(ce) {
    return o[+(ce.getUTCHours() >= 12)];
  }
  function Ce(ce) {
    return 1 + ~~(ce.getUTCMonth() / 3);
  }
  return {
    format: function(ce) {
      var ge = T(ce += "", M);
      return ge.toString = function() {
        return ce;
      }, ge;
    },
    parse: function(ce) {
      var ge = j(ce += "", !1);
      return ge.toString = function() {
        return ce;
      }, ge;
    },
    utcFormat: function(ce) {
      var ge = T(ce += "", C);
      return ge.toString = function() {
        return ce;
      }, ge;
    },
    utcParse: function(ce) {
      var ge = j(ce += "", !0);
      return ge.toString = function() {
        return ce;
      }, ge;
    }
  };
}
var h2 = { "-": "", _: " ", 0: "0" }, Dt = /^\s*\d+/, r4 = /^%/, a4 = /[\\^$*+?|[\]().{}]/g;
function Le(e, t, n) {
  var r = e < 0 ? "-" : "", o = (r ? -e : e) + "", u = o.length;
  return r + (u < n ? new Array(n - u + 1).join(t) + o : o);
}
function i4(e) {
  return e.replace(a4, "\\$&");
}
function uu(e) {
  return new RegExp("^(?:" + e.map(i4).join("|") + ")", "i");
}
function cu(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function o4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 1));
  return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function l4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 1));
  return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function u4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function c4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function s4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function p2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 4));
  return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function v2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function f4(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function d4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 1));
  return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function h4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function y2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function p4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 3));
  return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function m2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function v4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function y4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function m4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 3));
  return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function g4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 6));
  return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function b4(e, t, n) {
  var r = r4.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function x4(e, t, n) {
  var r = Dt.exec(t.slice(n));
  return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function S4(e, t, n) {
  var r = Dt.exec(t.slice(n));
  return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function g2(e, t) {
  return Le(e.getDate(), t, 2);
}
function _4(e, t) {
  return Le(e.getHours(), t, 2);
}
function O4(e, t) {
  return Le(e.getHours() % 12 || 12, t, 2);
}
function w4(e, t) {
  return Le(1 + yc.count(Gr(e), e), t, 3);
}
function wD(e, t) {
  return Le(e.getMilliseconds(), t, 3);
}
function A4(e, t) {
  return wD(e, t) + "000";
}
function T4(e, t) {
  return Le(e.getMonth() + 1, t, 2);
}
function E4(e, t) {
  return Le(e.getMinutes(), t, 2);
}
function j4(e, t) {
  return Le(e.getSeconds(), t, 2);
}
function M4(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function C4(e, t) {
  return Le(bd.count(Gr(e) - 1, e), t, 2);
}
function AD(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Ro(e) : Ro.ceil(e);
}
function D4(e, t) {
  return e = AD(e), Le(Ro.count(Gr(e), e) + (Gr(e).getDay() === 4), t, 2);
}
function P4(e) {
  return e.getDay();
}
function N4(e, t) {
  return Le(wf.count(Gr(e) - 1, e), t, 2);
}
function R4(e, t) {
  return Le(e.getFullYear() % 100, t, 2);
}
function $4(e, t) {
  return e = AD(e), Le(e.getFullYear() % 100, t, 2);
}
function z4(e, t) {
  return Le(e.getFullYear() % 1e4, t, 4);
}
function q4(e, t) {
  var n = e.getDay();
  return e = n >= 4 || n === 0 ? Ro(e) : Ro.ceil(e), Le(e.getFullYear() % 1e4, t, 4);
}
function k4(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + Le(t / 60 | 0, "0", 2) + Le(t % 60, "0", 2);
}
function b2(e, t) {
  return Le(e.getUTCDate(), t, 2);
}
function B4(e, t) {
  return Le(e.getUTCHours(), t, 2);
}
function L4(e, t) {
  return Le(e.getUTCHours() % 12 || 12, t, 2);
}
function U4(e, t) {
  return Le(1 + gd.count(Yr(e), e), t, 3);
}
function TD(e, t) {
  return Le(e.getUTCMilliseconds(), t, 3);
}
function I4(e, t) {
  return TD(e, t) + "000";
}
function H4(e, t) {
  return Le(e.getUTCMonth() + 1, t, 2);
}
function G4(e, t) {
  return Le(e.getUTCMinutes(), t, 2);
}
function Y4(e, t) {
  return Le(e.getUTCSeconds(), t, 2);
}
function K4(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function X4(e, t) {
  return Le(xd.count(Yr(e) - 1, e), t, 2);
}
function ED(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? $o(e) : $o.ceil(e);
}
function V4(e, t) {
  return e = ED(e), Le($o.count(Yr(e), e) + (Yr(e).getUTCDay() === 4), t, 2);
}
function F4(e) {
  return e.getUTCDay();
}
function W4(e, t) {
  return Le(Af.count(Yr(e) - 1, e), t, 2);
}
function Z4(e, t) {
  return Le(e.getUTCFullYear() % 100, t, 2);
}
function Q4(e, t) {
  return e = ED(e), Le(e.getUTCFullYear() % 100, t, 2);
}
function J4(e, t) {
  return Le(e.getUTCFullYear() % 1e4, t, 4);
}
function e5(e, t) {
  var n = e.getUTCDay();
  return e = n >= 4 || n === 0 ? $o(e) : $o.ceil(e), Le(e.getUTCFullYear() % 1e4, t, 4);
}
function t5() {
  return "+0000";
}
function x2() {
  return "%";
}
function S2(e) {
  return +e;
}
function _2(e) {
  return Math.floor(+e / 1e3);
}
var po, jD, MD;
n5({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function n5(e) {
  return po = n4(e), jD = po.format, po.parse, MD = po.utcFormat, po.utcParse, po;
}
function r5(e) {
  return new Date(e);
}
function a5(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function O1(e, t, n, r, o, u, c, f, d, h) {
  var y = c1(), v = y.invert, g = y.domain, b = h(".%L"), _ = h(":%S"), S = h("%I:%M"), x = h("%I %p"), A = h("%a %d"), E = h("%b %d"), M = h("%B"), C = h("%Y");
  function w(T) {
    return (d(T) < T ? b : f(T) < T ? _ : c(T) < T ? S : u(T) < T ? x : r(T) < T ? o(T) < T ? A : E : n(T) < T ? M : C)(T);
  }
  return y.invert = function(T) {
    return new Date(v(T));
  }, y.domain = function(T) {
    return arguments.length ? g(Array.from(T, a5)) : g().map(r5);
  }, y.ticks = function(T) {
    var j = g();
    return e(j[0], j[j.length - 1], T ?? 10);
  }, y.tickFormat = function(T, j) {
    return j == null ? w : h(j);
  }, y.nice = function(T) {
    var j = g();
    return (!T || typeof T.range != "function") && (T = t(j[0], j[j.length - 1], T ?? 10)), T ? g(vD(j, T)) : y;
  }, y.copy = function() {
    return vc(y, O1(e, t, n, r, o, u, c, f, d, h));
  }, y;
}
function i5() {
  return Un.apply(O1(e4, t4, Gr, S1, bd, yc, b1, m1, oi, jD).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function o5() {
  return Un.apply(O1(Q6, J6, Yr, _1, xd, gd, x1, g1, oi, MD).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Sd() {
  var e = 0, t = 1, n, r, o, u, c = Ft, f = !1, d;
  function h(v) {
    return v == null || isNaN(v = +v) ? d : c(o === 0 ? 0.5 : (v = (u(v) - n) * o, f ? Math.max(0, Math.min(1, v)) : v));
  }
  h.domain = function(v) {
    return arguments.length ? ([e, t] = v, n = u(e = +e), r = u(t = +t), o = n === r ? 0 : 1 / (r - n), h) : [e, t];
  }, h.clamp = function(v) {
    return arguments.length ? (f = !!v, h) : f;
  }, h.interpolator = function(v) {
    return arguments.length ? (c = v, h) : c;
  };
  function y(v) {
    return function(g) {
      var b, _;
      return arguments.length ? ([b, _] = g, c = v(b, _), h) : [c(0), c(1)];
    };
  }
  return h.range = y(ol), h.rangeRound = y(u1), h.unknown = function(v) {
    return arguments.length ? (d = v, h) : d;
  }, function(v) {
    return u = v, n = v(e), r = v(t), o = n === r ? 0 : 1 / (r - n), h;
  };
}
function $a(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function CD() {
  var e = Ra(Sd()(Ft));
  return e.copy = function() {
    return $a(e, CD());
  }, Fr.apply(e, arguments);
}
function DD() {
  var e = d1(Sd()).domain([1, 10]);
  return e.copy = function() {
    return $a(e, DD()).base(e.base());
  }, Fr.apply(e, arguments);
}
function PD() {
  var e = h1(Sd());
  return e.copy = function() {
    return $a(e, PD()).constant(e.constant());
  }, Fr.apply(e, arguments);
}
function w1() {
  var e = p1(Sd());
  return e.copy = function() {
    return $a(e, w1()).exponent(e.exponent());
  }, Fr.apply(e, arguments);
}
function l5() {
  return w1.apply(null, arguments).exponent(0.5);
}
function ND() {
  var e = [], t = Ft;
  function n(r) {
    if (r != null && !isNaN(r = +r)) return t((hc(e, r, 1) - 1) / (e.length - 1));
  }
  return n.domain = function(r) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let o of r) o != null && !isNaN(o = +o) && e.push(o);
    return e.sort(Ca), n;
  }, n.interpolator = function(r) {
    return arguments.length ? (t = r, n) : t;
  }, n.range = function() {
    return e.map((r, o) => t(o / (e.length - 1)));
  }, n.quantiles = function(r) {
    return Array.from({ length: r + 1 }, (o, u) => X8(e, u / r));
  }, n.copy = function() {
    return ND(t).domain(e);
  }, Fr.apply(n, arguments);
}
function _d() {
  var e = 0, t = 0.5, n = 1, r = 1, o, u, c, f, d, h = Ft, y, v = !1, g;
  function b(S) {
    return isNaN(S = +S) ? g : (S = 0.5 + ((S = +y(S)) - u) * (r * S < r * u ? f : d), h(v ? Math.max(0, Math.min(1, S)) : S));
  }
  b.domain = function(S) {
    return arguments.length ? ([e, t, n] = S, o = y(e = +e), u = y(t = +t), c = y(n = +n), f = o === u ? 0 : 0.5 / (u - o), d = u === c ? 0 : 0.5 / (c - u), r = u < o ? -1 : 1, b) : [e, t, n];
  }, b.clamp = function(S) {
    return arguments.length ? (v = !!S, b) : v;
  }, b.interpolator = function(S) {
    return arguments.length ? (h = S, b) : h;
  };
  function _(S) {
    return function(x) {
      var A, E, M;
      return arguments.length ? ([A, E, M] = x, h = b6(S, [A, E, M]), b) : [h(0), h(0.5), h(1)];
    };
  }
  return b.range = _(ol), b.rangeRound = _(u1), b.unknown = function(S) {
    return arguments.length ? (g = S, b) : g;
  }, function(S) {
    return y = S, o = S(e), u = S(t), c = S(n), f = o === u ? 0 : 0.5 / (u - o), d = u === c ? 0 : 0.5 / (c - u), r = u < o ? -1 : 1, b;
  };
}
function RD() {
  var e = Ra(_d()(Ft));
  return e.copy = function() {
    return $a(e, RD());
  }, Fr.apply(e, arguments);
}
function $D() {
  var e = d1(_d()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return $a(e, $D()).base(e.base());
  }, Fr.apply(e, arguments);
}
function zD() {
  var e = h1(_d());
  return e.copy = function() {
    return $a(e, zD()).constant(e.constant());
  }, Fr.apply(e, arguments);
}
function A1() {
  var e = p1(_d());
  return e.copy = function() {
    return $a(e, A1()).exponent(e.exponent());
  }, Fr.apply(e, arguments);
}
function u5() {
  return A1.apply(null, arguments).exponent(0.5);
}
const O2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: qu,
  scaleDiverging: RD,
  scaleDivergingLog: $D,
  scaleDivergingPow: A1,
  scaleDivergingSqrt: u5,
  scaleDivergingSymlog: zD,
  scaleIdentity: pD,
  scaleImplicit: Pb,
  scaleLinear: _f,
  scaleLog: yD,
  scaleOrdinal: i1,
  scalePoint: xu,
  scalePow: v1,
  scaleQuantile: bD,
  scaleQuantize: xD,
  scaleRadial: gD,
  scaleSequential: CD,
  scaleSequentialLog: DD,
  scaleSequentialPow: w1,
  scaleSequentialQuantile: ND,
  scaleSequentialSqrt: l5,
  scaleSequentialSymlog: PD,
  scaleSqrt: I6,
  scaleSymlog: mD,
  scaleThreshold: SD,
  scaleTime: i5,
  scaleUtc: o5,
  tickFormat: hD
}, Symbol.toStringTag, { value: "Module" }));
var gg, w2;
function qD() {
  if (w2) return gg;
  w2 = 1;
  var e = nl();
  function t(n, r, o) {
    for (var u = -1, c = n.length; ++u < c; ) {
      var f = n[u], d = r(f);
      if (d != null && (h === void 0 ? d === d && !e(d) : o(d, h)))
        var h = d, y = f;
    }
    return y;
  }
  return gg = t, gg;
}
var bg, A2;
function c5() {
  if (A2) return bg;
  A2 = 1;
  function e(t, n) {
    return t > n;
  }
  return bg = e, bg;
}
var xg, T2;
function s5() {
  if (T2) return xg;
  T2 = 1;
  var e = qD(), t = c5(), n = il();
  function r(o) {
    return o && o.length ? e(o, n, t) : void 0;
  }
  return xg = r, xg;
}
var f5 = s5();
const Ea = /* @__PURE__ */ tt(f5);
var Sg, E2;
function d5() {
  if (E2) return Sg;
  E2 = 1;
  function e(t, n) {
    return t < n;
  }
  return Sg = e, Sg;
}
var _g, j2;
function h5() {
  if (j2) return _g;
  j2 = 1;
  var e = qD(), t = d5(), n = il();
  function r(o) {
    return o && o.length ? e(o, n, t) : void 0;
  }
  return _g = r, _g;
}
var p5 = h5();
const Od = /* @__PURE__ */ tt(p5);
var Og, M2;
function v5() {
  if (M2) return Og;
  M2 = 1;
  var e = I0(), t = Pa(), n = XC(), r = ln();
  function o(u, c) {
    var f = r(u) ? e : n;
    return f(u, t(c, 3));
  }
  return Og = o, Og;
}
var wg, C2;
function y5() {
  if (C2) return wg;
  C2 = 1;
  var e = YC(), t = v5();
  function n(r, o) {
    return e(t(r, o), 1);
  }
  return wg = n, wg;
}
var m5 = y5();
const g5 = /* @__PURE__ */ tt(m5);
var Ag, D2;
function b5() {
  if (D2) return Ag;
  D2 = 1;
  var e = e1();
  function t(n, r) {
    return e(n, r);
  }
  return Ag = t, Ag;
}
var x5 = b5();
const pi = /* @__PURE__ */ tt(x5);
var ll = 1e9, S5 = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, E1, ut = !0, Ln = "[DecimalError] ", si = Ln + "Invalid argument: ", T1 = Ln + "Exponent out of range: ", ul = Math.floor, ri = Math.pow, _5 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, _n, Ct = 1e7, ot = 7, kD = 9007199254740991, Tf = ul(kD / ot), ve = {};
ve.absoluteValue = ve.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
ve.comparedTo = ve.cmp = function(e) {
  var t, n, r, o, u = this;
  if (e = new u.constructor(e), u.s !== e.s) return u.s || -e.s;
  if (u.e !== e.e) return u.e > e.e ^ u.s < 0 ? 1 : -1;
  for (r = u.d.length, o = e.d.length, t = 0, n = r < o ? r : o; t < n; ++t)
    if (u.d[t] !== e.d[t]) return u.d[t] > e.d[t] ^ u.s < 0 ? 1 : -1;
  return r === o ? 0 : r > o ^ u.s < 0 ? 1 : -1;
};
ve.decimalPlaces = ve.dp = function() {
  var e = this, t = e.d.length - 1, n = (t - e.e) * ot;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) n--;
  return n < 0 ? 0 : n;
};
ve.dividedBy = ve.div = function(e) {
  return Ir(this, new this.constructor(e));
};
ve.dividedToIntegerBy = ve.idiv = function(e) {
  var t = this, n = t.constructor;
  return et(Ir(t, new n(e), 0, 1), n.precision);
};
ve.equals = ve.eq = function(e) {
  return !this.cmp(e);
};
ve.exponent = function() {
  return xt(this);
};
ve.greaterThan = ve.gt = function(e) {
  return this.cmp(e) > 0;
};
ve.greaterThanOrEqualTo = ve.gte = function(e) {
  return this.cmp(e) >= 0;
};
ve.isInteger = ve.isint = function() {
  return this.e > this.d.length - 2;
};
ve.isNegative = ve.isneg = function() {
  return this.s < 0;
};
ve.isPositive = ve.ispos = function() {
  return this.s > 0;
};
ve.isZero = function() {
  return this.s === 0;
};
ve.lessThan = ve.lt = function(e) {
  return this.cmp(e) < 0;
};
ve.lessThanOrEqualTo = ve.lte = function(e) {
  return this.cmp(e) < 1;
};
ve.logarithm = ve.log = function(e) {
  var t, n = this, r = n.constructor, o = r.precision, u = o + 5;
  if (e === void 0)
    e = new r(10);
  else if (e = new r(e), e.s < 1 || e.eq(_n)) throw Error(Ln + "NaN");
  if (n.s < 1) throw Error(Ln + (n.s ? "NaN" : "-Infinity"));
  return n.eq(_n) ? new r(0) : (ut = !1, t = Ir(Iu(n, u), Iu(e, u), u), ut = !0, et(t, o));
};
ve.minus = ve.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? UD(t, e) : BD(t, (e.s = -e.s, e));
};
ve.modulo = ve.mod = function(e) {
  var t, n = this, r = n.constructor, o = r.precision;
  if (e = new r(e), !e.s) throw Error(Ln + "NaN");
  return n.s ? (ut = !1, t = Ir(n, e, 0, 1).times(e), ut = !0, n.minus(t)) : et(new r(n), o);
};
ve.naturalExponential = ve.exp = function() {
  return LD(this);
};
ve.naturalLogarithm = ve.ln = function() {
  return Iu(this);
};
ve.negated = ve.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
ve.plus = ve.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? BD(t, e) : UD(t, (e.s = -e.s, e));
};
ve.precision = ve.sd = function(e) {
  var t, n, r, o = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(si + e);
  if (t = xt(o) + 1, r = o.d.length - 1, n = r * ot + 1, r = o.d[r], r) {
    for (; r % 10 == 0; r /= 10) n--;
    for (r = o.d[0]; r >= 10; r /= 10) n++;
  }
  return e && t > n ? t : n;
};
ve.squareRoot = ve.sqrt = function() {
  var e, t, n, r, o, u, c, f = this, d = f.constructor;
  if (f.s < 1) {
    if (!f.s) return new d(0);
    throw Error(Ln + "NaN");
  }
  for (e = xt(f), ut = !1, o = Math.sqrt(+f), o == 0 || o == 1 / 0 ? (t = lr(f.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = ul((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = c = n + 3; ; )
    if (u = r, r = u.plus(Ir(f, u, c + 2)).times(0.5), lr(u.d).slice(0, c) === (t = lr(r.d)).slice(0, c)) {
      if (t = t.slice(c - 3, c + 1), o == c && t == "4999") {
        if (et(u, n + 1, 0), u.times(u).eq(f)) {
          r = u;
          break;
        }
      } else if (t != "9999")
        break;
      c += 4;
    }
  return ut = !0, et(r, n);
};
ve.times = ve.mul = function(e) {
  var t, n, r, o, u, c, f, d, h, y = this, v = y.constructor, g = y.d, b = (e = new v(e)).d;
  if (!y.s || !e.s) return new v(0);
  for (e.s *= y.s, n = y.e + e.e, d = g.length, h = b.length, d < h && (u = g, g = b, b = u, c = d, d = h, h = c), u = [], c = d + h, r = c; r--; ) u.push(0);
  for (r = h; --r >= 0; ) {
    for (t = 0, o = d + r; o > r; )
      f = u[o] + b[r] * g[o - r - 1] + t, u[o--] = f % Ct | 0, t = f / Ct | 0;
    u[o] = (u[o] + t) % Ct | 0;
  }
  for (; !u[--c]; ) u.pop();
  return t ? ++n : u.shift(), e.d = u, e.e = n, ut ? et(e, v.precision) : e;
};
ve.toDecimalPlaces = ve.todp = function(e, t) {
  var n = this, r = n.constructor;
  return n = new r(n), e === void 0 ? n : (pr(e, 0, ll), t === void 0 ? t = r.rounding : pr(t, 0, 8), et(n, e + xt(n) + 1, t));
};
ve.toExponential = function(e, t) {
  var n, r = this, o = r.constructor;
  return e === void 0 ? n = vi(r, !0) : (pr(e, 0, ll), t === void 0 ? t = o.rounding : pr(t, 0, 8), r = et(new o(r), e + 1, t), n = vi(r, !0, e + 1)), n;
};
ve.toFixed = function(e, t) {
  var n, r, o = this, u = o.constructor;
  return e === void 0 ? vi(o) : (pr(e, 0, ll), t === void 0 ? t = u.rounding : pr(t, 0, 8), r = et(new u(o), e + xt(o) + 1, t), n = vi(r.abs(), !1, e + xt(r) + 1), o.isneg() && !o.isZero() ? "-" + n : n);
};
ve.toInteger = ve.toint = function() {
  var e = this, t = e.constructor;
  return et(new t(e), xt(e) + 1, t.rounding);
};
ve.toNumber = function() {
  return +this;
};
ve.toPower = ve.pow = function(e) {
  var t, n, r, o, u, c, f = this, d = f.constructor, h = 12, y = +(e = new d(e));
  if (!e.s) return new d(_n);
  if (f = new d(f), !f.s) {
    if (e.s < 1) throw Error(Ln + "Infinity");
    return f;
  }
  if (f.eq(_n)) return f;
  if (r = d.precision, e.eq(_n)) return et(f, r);
  if (t = e.e, n = e.d.length - 1, c = t >= n, u = f.s, c) {
    if ((n = y < 0 ? -y : y) <= kD) {
      for (o = new d(_n), t = Math.ceil(r / ot + 4), ut = !1; n % 2 && (o = o.times(f), N2(o.d, t)), n = ul(n / 2), n !== 0; )
        f = f.times(f), N2(f.d, t);
      return ut = !0, e.s < 0 ? new d(_n).div(o) : et(o, r);
    }
  } else if (u < 0) throw Error(Ln + "NaN");
  return u = u < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, f.s = 1, ut = !1, o = e.times(Iu(f, r + h)), ut = !0, o = LD(o), o.s = u, o;
};
ve.toPrecision = function(e, t) {
  var n, r, o = this, u = o.constructor;
  return e === void 0 ? (n = xt(o), r = vi(o, n <= u.toExpNeg || n >= u.toExpPos)) : (pr(e, 1, ll), t === void 0 ? t = u.rounding : pr(t, 0, 8), o = et(new u(o), e, t), n = xt(o), r = vi(o, e <= n || n <= u.toExpNeg, e)), r;
};
ve.toSignificantDigits = ve.tosd = function(e, t) {
  var n = this, r = n.constructor;
  return e === void 0 ? (e = r.precision, t = r.rounding) : (pr(e, 1, ll), t === void 0 ? t = r.rounding : pr(t, 0, 8)), et(new r(n), e, t);
};
ve.toString = ve.valueOf = ve.val = ve.toJSON = ve[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = xt(e), n = e.constructor;
  return vi(e, t <= n.toExpNeg || t >= n.toExpPos);
};
function BD(e, t) {
  var n, r, o, u, c, f, d, h, y = e.constructor, v = y.precision;
  if (!e.s || !t.s)
    return t.s || (t = new y(e)), ut ? et(t, v) : t;
  if (d = e.d, h = t.d, c = e.e, o = t.e, d = d.slice(), u = c - o, u) {
    for (u < 0 ? (r = d, u = -u, f = h.length) : (r = h, o = c, f = d.length), c = Math.ceil(v / ot), f = c > f ? c + 1 : f + 1, u > f && (u = f, r.length = 1), r.reverse(); u--; ) r.push(0);
    r.reverse();
  }
  for (f = d.length, u = h.length, f - u < 0 && (u = f, r = h, h = d, d = r), n = 0; u; )
    n = (d[--u] = d[u] + h[u] + n) / Ct | 0, d[u] %= Ct;
  for (n && (d.unshift(n), ++o), f = d.length; d[--f] == 0; ) d.pop();
  return t.d = d, t.e = o, ut ? et(t, v) : t;
}
function pr(e, t, n) {
  if (e !== ~~e || e < t || e > n)
    throw Error(si + e);
}
function lr(e) {
  var t, n, r, o = e.length - 1, u = "", c = e[0];
  if (o > 0) {
    for (u += c, t = 1; t < o; t++)
      r = e[t] + "", n = ot - r.length, n && (u += Aa(n)), u += r;
    c = e[t], r = c + "", n = ot - r.length, n && (u += Aa(n));
  } else if (c === 0)
    return "0";
  for (; c % 10 === 0; ) c /= 10;
  return u + c;
}
var Ir = /* @__PURE__ */ (function() {
  function e(r, o) {
    var u, c = 0, f = r.length;
    for (r = r.slice(); f--; )
      u = r[f] * o + c, r[f] = u % Ct | 0, c = u / Ct | 0;
    return c && r.unshift(c), r;
  }
  function t(r, o, u, c) {
    var f, d;
    if (u != c)
      d = u > c ? 1 : -1;
    else
      for (f = d = 0; f < u; f++)
        if (r[f] != o[f]) {
          d = r[f] > o[f] ? 1 : -1;
          break;
        }
    return d;
  }
  function n(r, o, u) {
    for (var c = 0; u--; )
      r[u] -= c, c = r[u] < o[u] ? 1 : 0, r[u] = c * Ct + r[u] - o[u];
    for (; !r[0] && r.length > 1; ) r.shift();
  }
  return function(r, o, u, c) {
    var f, d, h, y, v, g, b, _, S, x, A, E, M, C, w, T, j, N, z = r.constructor, k = r.s == o.s ? 1 : -1, B = r.d, q = o.d;
    if (!r.s) return new z(r);
    if (!o.s) throw Error(Ln + "Division by zero");
    for (d = r.e - o.e, j = q.length, w = B.length, b = new z(k), _ = b.d = [], h = 0; q[h] == (B[h] || 0); ) ++h;
    if (q[h] > (B[h] || 0) && --d, u == null ? E = u = z.precision : c ? E = u + (xt(r) - xt(o)) + 1 : E = u, E < 0) return new z(0);
    if (E = E / ot + 2 | 0, h = 0, j == 1)
      for (y = 0, q = q[0], E++; (h < w || y) && E--; h++)
        M = y * Ct + (B[h] || 0), _[h] = M / q | 0, y = M % q | 0;
    else {
      for (y = Ct / (q[0] + 1) | 0, y > 1 && (q = e(q, y), B = e(B, y), j = q.length, w = B.length), C = j, S = B.slice(0, j), x = S.length; x < j; ) S[x++] = 0;
      N = q.slice(), N.unshift(0), T = q[0], q[1] >= Ct / 2 && ++T;
      do
        y = 0, f = t(q, S, j, x), f < 0 ? (A = S[0], j != x && (A = A * Ct + (S[1] || 0)), y = A / T | 0, y > 1 ? (y >= Ct && (y = Ct - 1), v = e(q, y), g = v.length, x = S.length, f = t(v, S, g, x), f == 1 && (y--, n(v, j < g ? N : q, g))) : (y == 0 && (f = y = 1), v = q.slice()), g = v.length, g < x && v.unshift(0), n(S, v, x), f == -1 && (x = S.length, f = t(q, S, j, x), f < 1 && (y++, n(S, j < x ? N : q, x))), x = S.length) : f === 0 && (y++, S = [0]), _[h++] = y, f && S[0] ? S[x++] = B[C] || 0 : (S = [B[C]], x = 1);
      while ((C++ < w || S[0] !== void 0) && E--);
    }
    return _[0] || _.shift(), b.e = d, et(b, c ? u + xt(b) + 1 : u);
  };
})();
function LD(e, t) {
  var n, r, o, u, c, f, d = 0, h = 0, y = e.constructor, v = y.precision;
  if (xt(e) > 16) throw Error(T1 + xt(e));
  if (!e.s) return new y(_n);
  for (ut = !1, f = v, c = new y(0.03125); e.abs().gte(0.1); )
    e = e.times(c), h += 5;
  for (r = Math.log(ri(2, h)) / Math.LN10 * 2 + 5 | 0, f += r, n = o = u = new y(_n), y.precision = f; ; ) {
    if (o = et(o.times(e), f), n = n.times(++d), c = u.plus(Ir(o, n, f)), lr(c.d).slice(0, f) === lr(u.d).slice(0, f)) {
      for (; h--; ) u = et(u.times(u), f);
      return y.precision = v, t == null ? (ut = !0, et(u, v)) : u;
    }
    u = c;
  }
}
function xt(e) {
  for (var t = e.e * ot, n = e.d[0]; n >= 10; n /= 10) t++;
  return t;
}
function Tg(e, t, n) {
  if (t > e.LN10.sd())
    throw ut = !0, n && (e.precision = n), Error(Ln + "LN10 precision limit exceeded");
  return et(new e(e.LN10), t);
}
function Aa(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Iu(e, t) {
  var n, r, o, u, c, f, d, h, y, v = 1, g = 10, b = e, _ = b.d, S = b.constructor, x = S.precision;
  if (b.s < 1) throw Error(Ln + (b.s ? "NaN" : "-Infinity"));
  if (b.eq(_n)) return new S(0);
  if (t == null ? (ut = !1, h = x) : h = t, b.eq(10))
    return t == null && (ut = !0), Tg(S, h);
  if (h += g, S.precision = h, n = lr(_), r = n.charAt(0), u = xt(b), Math.abs(u) < 15e14) {
    for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3; )
      b = b.times(e), n = lr(b.d), r = n.charAt(0), v++;
    u = xt(b), r > 1 ? (b = new S("0." + n), u++) : b = new S(r + "." + n.slice(1));
  } else
    return d = Tg(S, h + 2, x).times(u + ""), b = Iu(new S(r + "." + n.slice(1)), h - g).plus(d), S.precision = x, t == null ? (ut = !0, et(b, x)) : b;
  for (f = c = b = Ir(b.minus(_n), b.plus(_n), h), y = et(b.times(b), h), o = 3; ; ) {
    if (c = et(c.times(y), h), d = f.plus(Ir(c, new S(o), h)), lr(d.d).slice(0, h) === lr(f.d).slice(0, h))
      return f = f.times(2), u !== 0 && (f = f.plus(Tg(S, h + 2, x).times(u + ""))), f = Ir(f, new S(v), h), S.precision = x, t == null ? (ut = !0, et(f, x)) : f;
    f = d, o += 2;
  }
}
function P2(e, t) {
  var n, r, o;
  for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charCodeAt(r) === 48; ) ++r;
  for (o = t.length; t.charCodeAt(o - 1) === 48; ) --o;
  if (t = t.slice(r, o), t) {
    if (o -= r, n = n - r - 1, e.e = ul(n / ot), e.d = [], r = (n + 1) % ot, n < 0 && (r += ot), r < o) {
      for (r && e.d.push(+t.slice(0, r)), o -= ot; r < o; ) e.d.push(+t.slice(r, r += ot));
      t = t.slice(r), r = ot - t.length;
    } else
      r -= o;
    for (; r--; ) t += "0";
    if (e.d.push(+t), ut && (e.e > Tf || e.e < -Tf)) throw Error(T1 + n);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function et(e, t, n) {
  var r, o, u, c, f, d, h, y, v = e.d;
  for (c = 1, u = v[0]; u >= 10; u /= 10) c++;
  if (r = t - c, r < 0)
    r += ot, o = t, h = v[y = 0];
  else {
    if (y = Math.ceil((r + 1) / ot), u = v.length, y >= u) return e;
    for (h = u = v[y], c = 1; u >= 10; u /= 10) c++;
    r %= ot, o = r - ot + c;
  }
  if (n !== void 0 && (u = ri(10, c - o - 1), f = h / u % 10 | 0, d = t < 0 || v[y + 1] !== void 0 || h % u, d = n < 4 ? (f || d) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : f > 5 || f == 5 && (n == 4 || d || n == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (r > 0 ? o > 0 ? h / ri(10, c - o) : 0 : v[y - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0])
    return d ? (u = xt(e), v.length = 1, t = t - u - 1, v[0] = ri(10, (ot - t % ot) % ot), e.e = ul(-t / ot) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
  if (r == 0 ? (v.length = y, u = 1, y--) : (v.length = y + 1, u = ri(10, ot - r), v[y] = o > 0 ? (h / ri(10, c - o) % ri(10, o) | 0) * u : 0), d)
    for (; ; )
      if (y == 0) {
        (v[0] += u) == Ct && (v[0] = 1, ++e.e);
        break;
      } else {
        if (v[y] += u, v[y] != Ct) break;
        v[y--] = 0, u = 1;
      }
  for (r = v.length; v[--r] === 0; ) v.pop();
  if (ut && (e.e > Tf || e.e < -Tf))
    throw Error(T1 + xt(e));
  return e;
}
function UD(e, t) {
  var n, r, o, u, c, f, d, h, y, v, g = e.constructor, b = g.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new g(e), ut ? et(t, b) : t;
  if (d = e.d, v = t.d, r = t.e, h = e.e, d = d.slice(), c = h - r, c) {
    for (y = c < 0, y ? (n = d, c = -c, f = v.length) : (n = v, r = h, f = d.length), o = Math.max(Math.ceil(b / ot), f) + 2, c > o && (c = o, n.length = 1), n.reverse(), o = c; o--; ) n.push(0);
    n.reverse();
  } else {
    for (o = d.length, f = v.length, y = o < f, y && (f = o), o = 0; o < f; o++)
      if (d[o] != v[o]) {
        y = d[o] < v[o];
        break;
      }
    c = 0;
  }
  for (y && (n = d, d = v, v = n, t.s = -t.s), f = d.length, o = v.length - f; o > 0; --o) d[f++] = 0;
  for (o = v.length; o > c; ) {
    if (d[--o] < v[o]) {
      for (u = o; u && d[--u] === 0; ) d[u] = Ct - 1;
      --d[u], d[o] += Ct;
    }
    d[o] -= v[o];
  }
  for (; d[--f] === 0; ) d.pop();
  for (; d[0] === 0; d.shift()) --r;
  return d[0] ? (t.d = d, t.e = r, ut ? et(t, b) : t) : new g(0);
}
function vi(e, t, n) {
  var r, o = xt(e), u = lr(e.d), c = u.length;
  return t ? (n && (r = n - c) > 0 ? u = u.charAt(0) + "." + u.slice(1) + Aa(r) : c > 1 && (u = u.charAt(0) + "." + u.slice(1)), u = u + (o < 0 ? "e" : "e+") + o) : o < 0 ? (u = "0." + Aa(-o - 1) + u, n && (r = n - c) > 0 && (u += Aa(r))) : o >= c ? (u += Aa(o + 1 - c), n && (r = n - o - 1) > 0 && (u = u + "." + Aa(r))) : ((r = o + 1) < c && (u = u.slice(0, r) + "." + u.slice(r)), n && (r = n - c) > 0 && (o + 1 === c && (u += "."), u += Aa(r))), e.s < 0 ? "-" + u : u;
}
function N2(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function ID(e) {
  var t, n, r;
  function o(u) {
    var c = this;
    if (!(c instanceof o)) return new o(u);
    if (c.constructor = o, u instanceof o) {
      c.s = u.s, c.e = u.e, c.d = (u = u.d) ? u.slice() : u;
      return;
    }
    if (typeof u == "number") {
      if (u * 0 !== 0)
        throw Error(si + u);
      if (u > 0)
        c.s = 1;
      else if (u < 0)
        u = -u, c.s = -1;
      else {
        c.s = 0, c.e = 0, c.d = [0];
        return;
      }
      if (u === ~~u && u < 1e7) {
        c.e = 0, c.d = [u];
        return;
      }
      return P2(c, u.toString());
    } else if (typeof u != "string")
      throw Error(si + u);
    if (u.charCodeAt(0) === 45 ? (u = u.slice(1), c.s = -1) : c.s = 1, _5.test(u)) P2(c, u);
    else throw Error(si + u);
  }
  if (o.prototype = ve, o.ROUND_UP = 0, o.ROUND_DOWN = 1, o.ROUND_CEIL = 2, o.ROUND_FLOOR = 3, o.ROUND_HALF_UP = 4, o.ROUND_HALF_DOWN = 5, o.ROUND_HALF_EVEN = 6, o.ROUND_HALF_CEIL = 7, o.ROUND_HALF_FLOOR = 8, o.clone = ID, o.config = o.set = O5, e === void 0 && (e = {}), e)
    for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < r.length; ) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
  return o.config(e), o;
}
function O5(e) {
  if (!e || typeof e != "object")
    throw Error(Ln + "Object expected");
  var t, n, r, o = [
    "precision",
    1,
    ll,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < o.length; t += 3)
    if ((r = e[n = o[t]]) !== void 0)
      if (ul(r) === r && r >= o[t + 1] && r <= o[t + 2]) this[n] = r;
      else throw Error(si + n + ": " + r);
  if ((r = e[n = "LN10"]) !== void 0)
    if (r == Math.LN10) this[n] = new this(r);
    else throw Error(si + n + ": " + r);
  return this;
}
var E1 = ID(S5);
_n = new E1(1);
const Ze = E1;
function w5(e) {
  return j5(e) || E5(e) || T5(e) || A5();
}
function A5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function T5(e, t) {
  if (e) {
    if (typeof e == "string") return zb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return zb(e, t);
  }
}
function E5(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function j5(e) {
  if (Array.isArray(e)) return zb(e);
}
function zb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
var M5 = function(t) {
  return t;
}, HD = {}, GD = function(t) {
  return t === HD;
}, R2 = function(t) {
  return function n() {
    return arguments.length === 0 || arguments.length === 1 && GD(arguments.length <= 0 ? void 0 : arguments[0]) ? n : t.apply(void 0, arguments);
  };
}, C5 = function e(t, n) {
  return t === 1 ? n : R2(function() {
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    var c = o.filter(function(f) {
      return f !== HD;
    }).length;
    return c >= t ? n.apply(void 0, o) : e(t - c, R2(function() {
      for (var f = arguments.length, d = new Array(f), h = 0; h < f; h++)
        d[h] = arguments[h];
      var y = o.map(function(v) {
        return GD(v) ? d.shift() : v;
      });
      return n.apply(void 0, w5(y).concat(d));
    }));
  });
}, wd = function(t) {
  return C5(t.length, t);
}, qb = function(t, n) {
  for (var r = [], o = t; o < n; ++o)
    r[o - t] = o;
  return r;
}, D5 = wd(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(n) {
    return t[n];
  }).map(e);
}), P5 = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  if (!n.length)
    return M5;
  var o = n.reverse(), u = o[0], c = o.slice(1);
  return function() {
    return c.reduce(function(f, d) {
      return d(f);
    }, u.apply(void 0, arguments));
  };
}, kb = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, YD = function(t) {
  var n = null, r = null;
  return function() {
    for (var o = arguments.length, u = new Array(o), c = 0; c < o; c++)
      u[c] = arguments[c];
    return n && u.every(function(f, d) {
      return f === n[d];
    }) || (n = u, r = t.apply(void 0, u)), r;
  };
};
function N5(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Ze(e).abs().log(10).toNumber()) + 1, t;
}
function R5(e, t, n) {
  for (var r = new Ze(e), o = 0, u = []; r.lt(t) && o < 1e5; )
    u.push(r.toNumber()), r = r.add(n), o++;
  return u;
}
var $5 = wd(function(e, t, n) {
  var r = +e, o = +t;
  return r + n * (o - r);
}), z5 = wd(function(e, t, n) {
  var r = t - +e;
  return r = r || 1 / 0, (n - e) / r;
}), q5 = wd(function(e, t, n) {
  var r = t - +e;
  return r = r || 1 / 0, Math.max(0, Math.min(1, (n - e) / r));
});
const Ad = {
  rangeStep: R5,
  getDigitCount: N5,
  interpolateNumber: $5,
  uninterpolateNumber: z5,
  uninterpolateTruncation: q5
};
function Bb(e) {
  return L5(e) || B5(e) || KD(e) || k5();
}
function k5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function B5(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function L5(e) {
  if (Array.isArray(e)) return Lb(e);
}
function Hu(e, t) {
  return H5(e) || I5(e, t) || KD(e, t) || U5();
}
function U5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function KD(e, t) {
  if (e) {
    if (typeof e == "string") return Lb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Lb(e, t);
  }
}
function Lb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function I5(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var n = [], r = !0, o = !1, u = void 0;
    try {
      for (var c = e[Symbol.iterator](), f; !(r = (f = c.next()).done) && (n.push(f.value), !(t && n.length === t)); r = !0)
        ;
    } catch (d) {
      o = !0, u = d;
    } finally {
      try {
        !r && c.return != null && c.return();
      } finally {
        if (o) throw u;
      }
    }
    return n;
  }
}
function H5(e) {
  if (Array.isArray(e)) return e;
}
function XD(e) {
  var t = Hu(e, 2), n = t[0], r = t[1], o = n, u = r;
  return n > r && (o = r, u = n), [o, u];
}
function VD(e, t, n) {
  if (e.lte(0))
    return new Ze(0);
  var r = Ad.getDigitCount(e.toNumber()), o = new Ze(10).pow(r), u = e.div(o), c = r !== 1 ? 0.05 : 0.1, f = new Ze(Math.ceil(u.div(c).toNumber())).add(n).mul(c), d = f.mul(o);
  return t ? d : new Ze(Math.ceil(d));
}
function G5(e, t, n) {
  var r = 1, o = new Ze(e);
  if (!o.isint() && n) {
    var u = Math.abs(e);
    u < 1 ? (r = new Ze(10).pow(Ad.getDigitCount(e) - 1), o = new Ze(Math.floor(o.div(r).toNumber())).mul(r)) : u > 1 && (o = new Ze(Math.floor(e)));
  } else e === 0 ? o = new Ze(Math.floor((t - 1) / 2)) : n || (o = new Ze(Math.floor(e)));
  var c = Math.floor((t - 1) / 2), f = P5(D5(function(d) {
    return o.add(new Ze(d - c).mul(r)).toNumber();
  }), qb);
  return f(0, t);
}
function FD(e, t, n, r) {
  var o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (n - 1)))
    return {
      step: new Ze(0),
      tickMin: new Ze(0),
      tickMax: new Ze(0)
    };
  var u = VD(new Ze(t).sub(e).div(n - 1), r, o), c;
  e <= 0 && t >= 0 ? c = new Ze(0) : (c = new Ze(e).add(t).div(2), c = c.sub(new Ze(c).mod(u)));
  var f = Math.ceil(c.sub(e).div(u).toNumber()), d = Math.ceil(new Ze(t).sub(c).div(u).toNumber()), h = f + d + 1;
  return h > n ? FD(e, t, n, r, o + 1) : (h < n && (d = t > 0 ? d + (n - h) : d, f = t > 0 ? f : f + (n - h)), {
    step: u,
    tickMin: c.sub(new Ze(f).mul(u)),
    tickMax: c.add(new Ze(d).mul(u))
  });
}
function Y5(e) {
  var t = Hu(e, 2), n = t[0], r = t[1], o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = Math.max(o, 2), f = XD([n, r]), d = Hu(f, 2), h = d[0], y = d[1];
  if (h === -1 / 0 || y === 1 / 0) {
    var v = y === 1 / 0 ? [h].concat(Bb(qb(0, o - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Bb(qb(0, o - 1).map(function() {
      return -1 / 0;
    })), [y]);
    return n > r ? kb(v) : v;
  }
  if (h === y)
    return G5(h, o, u);
  var g = FD(h, y, c, u), b = g.step, _ = g.tickMin, S = g.tickMax, x = Ad.rangeStep(_, S.add(new Ze(0.1).mul(b)), b);
  return n > r ? kb(x) : x;
}
function K5(e, t) {
  var n = Hu(e, 2), r = n[0], o = n[1], u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = XD([r, o]), f = Hu(c, 2), d = f[0], h = f[1];
  if (d === -1 / 0 || h === 1 / 0)
    return [r, o];
  if (d === h)
    return [d];
  var y = Math.max(t, 2), v = VD(new Ze(h).sub(d).div(y - 1), u, 0), g = [].concat(Bb(Ad.rangeStep(new Ze(d), new Ze(h).sub(new Ze(0.99).mul(v)), v)), [h]);
  return r > o ? kb(g) : g;
}
var X5 = YD(Y5), V5 = YD(K5), F5 = "Invariant failed";
function yi(e, t) {
  throw new Error(F5);
}
var W5 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function zo(e) {
  "@babel/helpers - typeof";
  return zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zo(e);
}
function Ef() {
  return Ef = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ef.apply(this, arguments);
}
function Z5(e, t) {
  return tL(e) || eL(e, t) || J5(e, t) || Q5();
}
function Q5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J5(e, t) {
  if (e) {
    if (typeof e == "string") return $2(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $2(e, t);
  }
}
function $2(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function eL(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function tL(e) {
  if (Array.isArray(e)) return e;
}
function nL(e, t) {
  if (e == null) return {};
  var n = rL(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function rL(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function aL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function iL(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, QD(r.key), r);
  }
}
function oL(e, t, n) {
  return t && iL(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function lL(e, t, n) {
  return t = jf(t), uL(e, WD() ? Reflect.construct(t, n || [], jf(e).constructor) : t.apply(e, n));
}
function uL(e, t) {
  if (t && (zo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return cL(e);
}
function cL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function WD() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (WD = function() {
    return !!e;
  })();
}
function jf(e) {
  return jf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, jf(e);
}
function sL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ub(e, t);
}
function Ub(e, t) {
  return Ub = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Ub(e, t);
}
function ZD(e, t, n) {
  return t = QD(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QD(e) {
  var t = fL(e, "string");
  return zo(t) == "symbol" ? t : t + "";
}
function fL(e, t) {
  if (zo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (zo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var cl = /* @__PURE__ */ (function(e) {
  function t() {
    return aL(this, t), lL(this, t, arguments);
  }
  return sL(t, e), oL(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.offset, u = r.layout, c = r.width, f = r.dataKey, d = r.data, h = r.dataPointFormatter, y = r.xAxis, v = r.yAxis, g = nL(r, W5), b = Te(g, !1);
      this.props.direction === "x" && y.type !== "number" && yi();
      var _ = d.map(function(S) {
        var x = h(S, f), A = x.x, E = x.y, M = x.value, C = x.errorVal;
        if (!C)
          return null;
        var w = [], T, j;
        if (Array.isArray(C)) {
          var N = Z5(C, 2);
          T = N[0], j = N[1];
        } else
          T = j = C;
        if (u === "vertical") {
          var z = y.scale, k = E + o, B = k + c, q = k - c, V = z(M - T), Y = z(M + j);
          w.push({
            x1: Y,
            y1: B,
            x2: Y,
            y2: q
          }), w.push({
            x1: V,
            y1: k,
            x2: Y,
            y2: k
          }), w.push({
            x1: V,
            y1: B,
            x2: V,
            y2: q
          });
        } else if (u === "horizontal") {
          var F = v.scale, $ = A + o, K = $ - c, ne = $ + c, G = F(M - T), ee = F(M + j);
          w.push({
            x1: K,
            y1: ee,
            x2: ne,
            y2: ee
          }), w.push({
            x1: $,
            y1: G,
            x2: $,
            y2: ee
          }), w.push({
            x1: K,
            y1: G,
            x2: ne,
            y2: G
          });
        }
        return /* @__PURE__ */ U.createElement(Ie, Ef({
          className: "recharts-errorBar",
          key: "bar-".concat(w.map(function(P) {
            return "".concat(P.x1, "-").concat(P.x2, "-").concat(P.y1, "-").concat(P.y2);
          }))
        }, b), w.map(function(P) {
          return /* @__PURE__ */ U.createElement("line", Ef({}, P, {
            key: "line-".concat(P.x1, "-").concat(P.x2, "-").concat(P.y1, "-").concat(P.y2)
          }));
        }));
      });
      return /* @__PURE__ */ U.createElement(Ie, {
        className: "recharts-errorBars"
      }, _);
    }
  }]);
})(U.Component);
ZD(cl, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
ZD(cl, "displayName", "ErrorBar");
function Gu(e) {
  "@babel/helpers - typeof";
  return Gu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gu(e);
}
function z2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ti(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? z2(Object(n), !0).forEach(function(r) {
      dL(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : z2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function dL(e, t, n) {
  return t = hL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function hL(e) {
  var t = pL(e, "string");
  return Gu(t) == "symbol" ? t : t + "";
}
function pL(e, t) {
  if (Gu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Gu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var JD = function(t) {
  var n = t.children, r = t.formattedGraphicalItems, o = t.legendWidth, u = t.legendContent, c = xn(n, wo);
  if (!c)
    return null;
  var f = wo.defaultProps, d = f !== void 0 ? ti(ti({}, f), c.props) : {}, h;
  return c.props && c.props.payload ? h = c.props && c.props.payload : u === "children" ? h = (r || []).reduce(function(y, v) {
    var g = v.item, b = v.props, _ = b.sectors || b.data || [];
    return y.concat(_.map(function(S) {
      return {
        type: c.props.iconType || g.props.legendType,
        value: S.name,
        color: S.fill,
        payload: S
      };
    }));
  }, []) : h = (r || []).map(function(y) {
    var v = y.item, g = v.type.defaultProps, b = g !== void 0 ? ti(ti({}, g), v.props) : {}, _ = b.dataKey, S = b.name, x = b.legendType, A = b.hide;
    return {
      inactive: A,
      dataKey: _,
      type: d.iconType || x || "square",
      color: j1(v),
      value: S || _,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: b
    };
  }), ti(ti(ti({}, d), wo.getWithHeight(c, o)), {}, {
    payload: h,
    item: c
  });
};
function Yu(e) {
  "@babel/helpers - typeof";
  return Yu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yu(e);
}
function q2(e) {
  return gL(e) || mL(e) || yL(e) || vL();
}
function vL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yL(e, t) {
  if (e) {
    if (typeof e == "string") return Ib(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ib(e, t);
  }
}
function mL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function gL(e) {
  if (Array.isArray(e)) return Ib(e);
}
function Ib(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function k2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ft(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? k2(Object(n), !0).forEach(function(r) {
      To(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : k2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function To(e, t, n) {
  return t = bL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function bL(e) {
  var t = xL(e, "string");
  return Yu(t) == "symbol" ? t : t + "";
}
function xL(e, t) {
  if (Yu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function At(e, t, n) {
  return we(e) || we(t) ? n : wt(t) ? Bn(e, t, n) : Ee(t) ? t(e) : n;
}
function Su(e, t, n, r) {
  var o = g5(e, function(f) {
    return At(f, t);
  });
  if (n === "number") {
    var u = o.filter(function(f) {
      return de(f) || parseFloat(f);
    });
    return u.length ? [Od(u), Ea(u)] : [1 / 0, -1 / 0];
  }
  var c = r ? o.filter(function(f) {
    return !we(f);
  }) : o;
  return c.map(function(f) {
    return wt(f) || f instanceof Date ? f : "";
  });
}
var SL = function(t) {
  var n, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], o = arguments.length > 2 ? arguments[2] : void 0, u = arguments.length > 3 ? arguments[3] : void 0, c = -1, f = (n = r == null ? void 0 : r.length) !== null && n !== void 0 ? n : 0;
  if (f <= 1)
    return 0;
  if (u && u.axisType === "angleAxis" && Math.abs(Math.abs(u.range[1] - u.range[0]) - 360) <= 1e-6)
    for (var d = u.range, h = 0; h < f; h++) {
      var y = h > 0 ? o[h - 1].coordinate : o[f - 1].coordinate, v = o[h].coordinate, g = h >= f - 1 ? o[0].coordinate : o[h + 1].coordinate, b = void 0;
      if (Wn(v - y) !== Wn(g - v)) {
        var _ = [];
        if (Wn(g - v) === Wn(d[1] - d[0])) {
          b = g;
          var S = v + d[1] - d[0];
          _[0] = Math.min(S, (S + y) / 2), _[1] = Math.max(S, (S + y) / 2);
        } else {
          b = y;
          var x = g + d[1] - d[0];
          _[0] = Math.min(v, (x + v) / 2), _[1] = Math.max(v, (x + v) / 2);
        }
        var A = [Math.min(v, (b + v) / 2), Math.max(v, (b + v) / 2)];
        if (t > A[0] && t <= A[1] || t >= _[0] && t <= _[1]) {
          c = o[h].index;
          break;
        }
      } else {
        var E = Math.min(y, g), M = Math.max(y, g);
        if (t > (E + v) / 2 && t <= (M + v) / 2) {
          c = o[h].index;
          break;
        }
      }
    }
  else
    for (var C = 0; C < f; C++)
      if (C === 0 && t <= (r[C].coordinate + r[C + 1].coordinate) / 2 || C > 0 && C < f - 1 && t > (r[C].coordinate + r[C - 1].coordinate) / 2 && t <= (r[C].coordinate + r[C + 1].coordinate) / 2 || C === f - 1 && t > (r[C].coordinate + r[C - 1].coordinate) / 2) {
        c = r[C].index;
        break;
      }
  return c;
}, j1 = function(t) {
  var n, r = t, o = r.type.displayName, u = (n = t.type) !== null && n !== void 0 && n.defaultProps ? ft(ft({}, t.type.defaultProps), t.props) : t.props, c = u.stroke, f = u.fill, d;
  switch (o) {
    case "Line":
      d = c;
      break;
    case "Area":
    case "Radar":
      d = c && c !== "none" ? c : f;
      break;
    default:
      d = f;
      break;
  }
  return d;
}, _L = function(t) {
  var n = t.barSize, r = t.totalSize, o = t.stackGroups, u = o === void 0 ? {} : o;
  if (!u)
    return {};
  for (var c = {}, f = Object.keys(u), d = 0, h = f.length; d < h; d++)
    for (var y = u[f[d]].stackGroups, v = Object.keys(y), g = 0, b = v.length; g < b; g++) {
      var _ = y[v[g]], S = _.items, x = _.cateAxisId, A = S.filter(function(j) {
        return Lr(j.type).indexOf("Bar") >= 0;
      });
      if (A && A.length) {
        var E = A[0].type.defaultProps, M = E !== void 0 ? ft(ft({}, E), A[0].props) : A[0].props, C = M.barSize, w = M[x];
        c[w] || (c[w] = []);
        var T = we(C) ? n : C;
        c[w].push({
          item: A[0],
          stackList: A.slice(1),
          barSize: we(T) ? void 0 : hi(T, r, 0)
        });
      }
    }
  return c;
}, OL = function(t) {
  var n = t.barGap, r = t.barCategoryGap, o = t.bandSize, u = t.sizeList, c = u === void 0 ? [] : u, f = t.maxBarSize, d = c.length;
  if (d < 1) return null;
  var h = hi(n, o, 0, !0), y, v = [];
  if (c[0].barSize === +c[0].barSize) {
    var g = !1, b = o / d, _ = c.reduce(function(C, w) {
      return C + w.barSize || 0;
    }, 0);
    _ += (d - 1) * h, _ >= o && (_ -= (d - 1) * h, h = 0), _ >= o && b > 0 && (g = !0, b *= 0.9, _ = d * b);
    var S = (o - _) / 2 >> 0, x = {
      offset: S - h,
      size: 0
    };
    y = c.reduce(function(C, w) {
      var T = {
        item: w.item,
        position: {
          offset: x.offset + x.size + h,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: g ? b : w.barSize
        }
      }, j = [].concat(q2(C), [T]);
      return x = j[j.length - 1].position, w.stackList && w.stackList.length && w.stackList.forEach(function(N) {
        j.push({
          item: N,
          position: x
        });
      }), j;
    }, v);
  } else {
    var A = hi(r, o, 0, !0);
    o - 2 * A - (d - 1) * h <= 0 && (h = 0);
    var E = (o - 2 * A - (d - 1) * h) / d;
    E > 1 && (E >>= 0);
    var M = f === +f ? Math.min(E, f) : E;
    y = c.reduce(function(C, w, T) {
      var j = [].concat(q2(C), [{
        item: w.item,
        position: {
          offset: A + (E + h) * T + (E - M) / 2,
          size: M
        }
      }]);
      return w.stackList && w.stackList.length && w.stackList.forEach(function(N) {
        j.push({
          item: N,
          position: j[j.length - 1].position
        });
      }), j;
    }, v);
  }
  return y;
}, wL = function(t, n, r, o) {
  var u = r.children, c = r.width, f = r.margin, d = c - (f.left || 0) - (f.right || 0), h = JD({
    children: u,
    legendWidth: d
  });
  if (h) {
    var y = o || {}, v = y.width, g = y.height, b = h.align, _ = h.verticalAlign, S = h.layout;
    if ((S === "vertical" || S === "horizontal" && _ === "middle") && b !== "center" && de(t[b]))
      return ft(ft({}, t), {}, To({}, b, t[b] + (v || 0)));
    if ((S === "horizontal" || S === "vertical" && b === "center") && _ !== "middle" && de(t[_]))
      return ft(ft({}, t), {}, To({}, _, t[_] + (g || 0)));
  }
  return t;
}, AL = function(t, n, r) {
  return we(n) ? !0 : t === "horizontal" ? n === "yAxis" : t === "vertical" || r === "x" ? n === "xAxis" : r === "y" ? n === "yAxis" : !0;
}, eP = function(t, n, r, o, u) {
  var c = n.props.children, f = on(c, cl).filter(function(h) {
    return AL(o, u, h.props.direction);
  });
  if (f && f.length) {
    var d = f.map(function(h) {
      return h.props.dataKey;
    });
    return t.reduce(function(h, y) {
      var v = At(y, r);
      if (we(v)) return h;
      var g = Array.isArray(v) ? [Od(v), Ea(v)] : [v, v], b = d.reduce(function(_, S) {
        var x = At(y, S, 0), A = g[0] - Math.abs(Array.isArray(x) ? x[0] : x), E = g[1] + Math.abs(Array.isArray(x) ? x[1] : x);
        return [Math.min(A, _[0]), Math.max(E, _[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(b[0], h[0]), Math.max(b[1], h[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, TL = function(t, n, r, o, u) {
  var c = n.map(function(f) {
    return eP(t, f, r, u, o);
  }).filter(function(f) {
    return !we(f);
  });
  return c && c.length ? c.reduce(function(f, d) {
    return [Math.min(f[0], d[0]), Math.max(f[1], d[1])];
  }, [1 / 0, -1 / 0]) : null;
}, tP = function(t, n, r, o, u) {
  var c = n.map(function(d) {
    var h = d.props.dataKey;
    return r === "number" && h && eP(t, d, h, o) || Su(t, h, r, u);
  });
  if (r === "number")
    return c.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(d, h) {
        return [Math.min(d[0], h[0]), Math.max(d[1], h[1])];
      },
      [1 / 0, -1 / 0]
    );
  var f = {};
  return c.reduce(function(d, h) {
    for (var y = 0, v = h.length; y < v; y++)
      f[h[y]] || (f[h[y]] = !0, d.push(h[y]));
    return d;
  }, []);
}, nP = function(t, n) {
  return t === "horizontal" && n === "xAxis" || t === "vertical" && n === "yAxis" || t === "centric" && n === "angleAxis" || t === "radial" && n === "radiusAxis";
}, rP = function(t, n, r, o) {
  if (o)
    return t.map(function(d) {
      return d.coordinate;
    });
  var u, c, f = t.map(function(d) {
    return d.coordinate === n && (u = !0), d.coordinate === r && (c = !0), d.coordinate;
  });
  return u || f.push(n), c || f.push(r), f;
}, kr = function(t, n, r) {
  if (!t) return null;
  var o = t.scale, u = t.duplicateDomain, c = t.type, f = t.range, d = t.realScaleType === "scaleBand" ? o.bandwidth() / 2 : 2, h = (n || r) && c === "category" && o.bandwidth ? o.bandwidth() / d : 0;
  if (h = t.axisType === "angleAxis" && (f == null ? void 0 : f.length) >= 2 ? Wn(f[0] - f[1]) * 2 * h : h, n && (t.ticks || t.niceTicks)) {
    var y = (t.ticks || t.niceTicks).map(function(v) {
      var g = u ? u.indexOf(v) : v;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: o(g) + h,
        value: v,
        offset: h
      };
    });
    return y.filter(function(v) {
      return !al(v.coordinate);
    });
  }
  return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(v, g) {
    return {
      coordinate: o(v) + h,
      value: v,
      index: g,
      offset: h
    };
  }) : o.ticks && !r ? o.ticks(t.tickCount).map(function(v) {
    return {
      coordinate: o(v) + h,
      value: v,
      offset: h
    };
  }) : o.domain().map(function(v, g) {
    return {
      coordinate: o(v) + h,
      value: u ? u[v] : v,
      index: g,
      offset: h
    };
  });
}, Eg = /* @__PURE__ */ new WeakMap(), Gs = function(t, n) {
  if (typeof n != "function")
    return t;
  Eg.has(t) || Eg.set(t, /* @__PURE__ */ new WeakMap());
  var r = Eg.get(t);
  if (r.has(n))
    return r.get(n);
  var o = function() {
    t.apply(void 0, arguments), n.apply(void 0, arguments);
  };
  return r.set(n, o), o;
}, EL = function(t, n, r) {
  var o = t.scale, u = t.type, c = t.layout, f = t.axisType;
  if (o === "auto")
    return c === "radial" && f === "radiusAxis" ? {
      scale: qu(),
      realScaleType: "band"
    } : c === "radial" && f === "angleAxis" ? {
      scale: _f(),
      realScaleType: "linear"
    } : u === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !r) ? {
      scale: xu(),
      realScaleType: "point"
    } : u === "category" ? {
      scale: qu(),
      realScaleType: "band"
    } : {
      scale: _f(),
      realScaleType: "linear"
    };
  if (di(o)) {
    var d = "scale".concat(ud(o));
    return {
      scale: (O2[d] || xu)(),
      realScaleType: O2[d] ? d : "point"
    };
  }
  return Ee(o) ? {
    scale: o
  } : {
    scale: xu(),
    realScaleType: "point"
  };
}, B2 = 1e-4, jL = function(t) {
  var n = t.domain();
  if (!(!n || n.length <= 2)) {
    var r = n.length, o = t.range(), u = Math.min(o[0], o[1]) - B2, c = Math.max(o[0], o[1]) + B2, f = t(n[0]), d = t(n[r - 1]);
    (f < u || f > c || d < u || d > c) && t.domain([n[0], n[r - 1]]);
  }
}, ML = function(t, n) {
  if (!t)
    return null;
  for (var r = 0, o = t.length; r < o; r++)
    if (t[r].item === n)
      return t[r].position;
  return null;
}, CL = function(t, n) {
  if (!n || n.length !== 2 || !de(n[0]) || !de(n[1]))
    return t;
  var r = Math.min(n[0], n[1]), o = Math.max(n[0], n[1]), u = [t[0], t[1]];
  return (!de(t[0]) || t[0] < r) && (u[0] = r), (!de(t[1]) || t[1] > o) && (u[1] = o), u[0] > o && (u[0] = o), u[1] < r && (u[1] = r), u;
}, DL = function(t) {
  var n = t.length;
  if (!(n <= 0))
    for (var r = 0, o = t[0].length; r < o; ++r)
      for (var u = 0, c = 0, f = 0; f < n; ++f) {
        var d = al(t[f][r][1]) ? t[f][r][0] : t[f][r][1];
        d >= 0 ? (t[f][r][0] = u, t[f][r][1] = u + d, u = t[f][r][1]) : (t[f][r][0] = c, t[f][r][1] = c + d, c = t[f][r][1]);
      }
}, PL = function(t) {
  var n = t.length;
  if (!(n <= 0))
    for (var r = 0, o = t[0].length; r < o; ++r)
      for (var u = 0, c = 0; c < n; ++c) {
        var f = al(t[c][r][1]) ? t[c][r][0] : t[c][r][1];
        f >= 0 ? (t[c][r][0] = u, t[c][r][1] = u + f, u = t[c][r][1]) : (t[c][r][0] = 0, t[c][r][1] = 0);
      }
}, NL = {
  sign: DL,
  // @ts-expect-error definitelytyped types are incorrect
  expand: yq,
  // @ts-expect-error definitelytyped types are incorrect
  none: jo,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: mq,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: gq,
  positive: PL
}, RL = function(t, n, r) {
  var o = n.map(function(f) {
    return f.props.dataKey;
  }), u = NL[r], c = vq().keys(o).value(function(f, d) {
    return +At(f, d, 0);
  }).order(gb).offset(u);
  return c(t);
}, $L = function(t, n, r, o, u, c) {
  if (!t)
    return null;
  var f = c ? n.reverse() : n, d = {}, h = f.reduce(function(v, g) {
    var b, _ = (b = g.type) !== null && b !== void 0 && b.defaultProps ? ft(ft({}, g.type.defaultProps), g.props) : g.props, S = _.stackId, x = _.hide;
    if (x)
      return v;
    var A = _[r], E = v[A] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (wt(S)) {
      var M = E.stackGroups[S] || {
        numericAxisId: r,
        cateAxisId: o,
        items: []
      };
      M.items.push(g), E.hasStack = !0, E.stackGroups[S] = M;
    } else
      E.stackGroups[bi("_stackId_")] = {
        numericAxisId: r,
        cateAxisId: o,
        items: [g]
      };
    return ft(ft({}, v), {}, To({}, A, E));
  }, d), y = {};
  return Object.keys(h).reduce(function(v, g) {
    var b = h[g];
    if (b.hasStack) {
      var _ = {};
      b.stackGroups = Object.keys(b.stackGroups).reduce(function(S, x) {
        var A = b.stackGroups[x];
        return ft(ft({}, S), {}, To({}, x, {
          numericAxisId: r,
          cateAxisId: o,
          items: A.items,
          stackedData: RL(t, A.items, u)
        }));
      }, _);
    }
    return ft(ft({}, v), {}, To({}, g, b));
  }, y);
}, zL = function(t, n) {
  var r = n.realScaleType, o = n.type, u = n.tickCount, c = n.originalDomain, f = n.allowDecimals, d = r || n.scale;
  if (d !== "auto" && d !== "linear")
    return null;
  if (u && o === "number" && c && (c[0] === "auto" || c[1] === "auto")) {
    var h = t.domain();
    if (!h.length)
      return null;
    var y = X5(h, u, f);
    return t.domain([Od(y), Ea(y)]), {
      niceTicks: y
    };
  }
  if (u && o === "number") {
    var v = t.domain(), g = V5(v, u, f);
    return {
      niceTicks: g
    };
  }
  return null;
};
function qo(e) {
  var t = e.axis, n = e.ticks, r = e.bandSize, o = e.entry, u = e.index, c = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !we(o[t.dataKey])) {
      var f = tf(n, "value", o[t.dataKey]);
      if (f)
        return f.coordinate + r / 2;
    }
    return n[u] ? n[u].coordinate + r / 2 : null;
  }
  var d = At(o, we(c) ? t.dataKey : c);
  return we(d) ? null : t.scale(d);
}
var L2 = function(t) {
  var n = t.axis, r = t.ticks, o = t.offset, u = t.bandSize, c = t.entry, f = t.index;
  if (n.type === "category")
    return r[f] ? r[f].coordinate + o : null;
  var d = At(c, n.dataKey, n.domain[f]);
  return we(d) ? null : n.scale(d) - u / 2 + o;
}, qL = function(t) {
  var n = t.numericAxis, r = n.scale.domain();
  if (n.type === "number") {
    var o = Math.min(r[0], r[1]), u = Math.max(r[0], r[1]);
    return o <= 0 && u >= 0 ? 0 : u < 0 ? u : o;
  }
  return r[0];
}, kL = function(t, n) {
  var r, o = (r = t.type) !== null && r !== void 0 && r.defaultProps ? ft(ft({}, t.type.defaultProps), t.props) : t.props, u = o.stackId;
  if (wt(u)) {
    var c = n[u];
    if (c) {
      var f = c.items.indexOf(t);
      return f >= 0 ? c.stackedData[f] : null;
    }
  }
  return null;
}, BL = function(t) {
  return t.reduce(function(n, r) {
    return [Od(r.concat([n[0]]).filter(de)), Ea(r.concat([n[1]]).filter(de))];
  }, [1 / 0, -1 / 0]);
}, aP = function(t, n, r) {
  return Object.keys(t).reduce(function(o, u) {
    var c = t[u], f = c.stackedData, d = f.reduce(function(h, y) {
      var v = BL(y.slice(n, r + 1));
      return [Math.min(h[0], v[0]), Math.max(h[1], v[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(d[0], o[0]), Math.max(d[1], o[1])];
  }, [1 / 0, -1 / 0]).map(function(o) {
    return o === 1 / 0 || o === -1 / 0 ? 0 : o;
  });
}, U2 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, I2 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Hb = function(t, n, r) {
  if (Ee(t))
    return t(n, r);
  if (!Array.isArray(t))
    return n;
  var o = [];
  if (de(t[0]))
    o[0] = r ? t[0] : Math.min(t[0], n[0]);
  else if (U2.test(t[0])) {
    var u = +U2.exec(t[0])[1];
    o[0] = n[0] - u;
  } else Ee(t[0]) ? o[0] = t[0](n[0]) : o[0] = n[0];
  if (de(t[1]))
    o[1] = r ? t[1] : Math.max(t[1], n[1]);
  else if (I2.test(t[1])) {
    var c = +I2.exec(t[1])[1];
    o[1] = n[1] + c;
  } else Ee(t[1]) ? o[1] = t[1](n[1]) : o[1] = n[1];
  return o;
}, Mf = function(t, n, r) {
  if (t && t.scale && t.scale.bandwidth) {
    var o = t.scale.bandwidth();
    if (!r || o > 0)
      return o;
  }
  if (t && n && n.length >= 2) {
    for (var u = n1(n, function(v) {
      return v.coordinate;
    }), c = 1 / 0, f = 1, d = u.length; f < d; f++) {
      var h = u[f], y = u[f - 1];
      c = Math.min((h.coordinate || 0) - (y.coordinate || 0), c);
    }
    return c === 1 / 0 ? 0 : c;
  }
  return r ? void 0 : 0;
}, H2 = function(t, n, r) {
  return !t || !t.length || pi(t, Bn(r, "type.defaultProps.domain")) ? n : t;
}, iP = function(t, n) {
  var r = t.type.defaultProps ? ft(ft({}, t.type.defaultProps), t.props) : t.props, o = r.dataKey, u = r.name, c = r.unit, f = r.formatter, d = r.tooltipType, h = r.chartType, y = r.hide;
  return ft(ft({}, Te(t, !1)), {}, {
    dataKey: o,
    unit: c,
    formatter: f,
    name: u || o,
    color: j1(t),
    value: At(n, o),
    type: d,
    payload: n,
    chartType: h,
    hide: y
  });
};
function Ku(e) {
  "@babel/helpers - typeof";
  return Ku = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ku(e);
}
function G2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Y2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? G2(Object(n), !0).forEach(function(r) {
      LL(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : G2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function LL(e, t, n) {
  return t = UL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function UL(e) {
  var t = IL(e, "string");
  return Ku(t) == "symbol" ? t : t + "";
}
function IL(e, t) {
  if (Ku(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ku(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cf = Math.PI / 180, HL = function(t) {
  return t * 180 / Math.PI;
}, Bt = function(t, n, r, o) {
  return {
    x: t + Math.cos(-Cf * o) * r,
    y: n + Math.sin(-Cf * o) * r
  };
}, GL = function(t, n) {
  var r = t.x, o = t.y, u = n.x, c = n.y;
  return Math.sqrt(Math.pow(r - u, 2) + Math.pow(o - c, 2));
}, YL = function(t, n) {
  var r = t.x, o = t.y, u = n.cx, c = n.cy, f = GL({
    x: r,
    y: o
  }, {
    x: u,
    y: c
  });
  if (f <= 0)
    return {
      radius: f
    };
  var d = (r - u) / f, h = Math.acos(d);
  return o > c && (h = 2 * Math.PI - h), {
    radius: f,
    angle: HL(h),
    angleInRadian: h
  };
}, KL = function(t) {
  var n = t.startAngle, r = t.endAngle, o = Math.floor(n / 360), u = Math.floor(r / 360), c = Math.min(o, u);
  return {
    startAngle: n - c * 360,
    endAngle: r - c * 360
  };
}, XL = function(t, n) {
  var r = n.startAngle, o = n.endAngle, u = Math.floor(r / 360), c = Math.floor(o / 360), f = Math.min(u, c);
  return t + f * 360;
}, K2 = function(t, n) {
  var r = t.x, o = t.y, u = YL({
    x: r,
    y: o
  }, n), c = u.radius, f = u.angle, d = n.innerRadius, h = n.outerRadius;
  if (c < d || c > h)
    return !1;
  if (c === 0)
    return !0;
  var y = KL(n), v = y.startAngle, g = y.endAngle, b = f, _;
  if (v <= g) {
    for (; b > g; )
      b -= 360;
    for (; b < v; )
      b += 360;
    _ = b >= v && b <= g;
  } else {
    for (; b > v; )
      b -= 360;
    for (; b < g; )
      b += 360;
    _ = b >= g && b <= v;
  }
  return _ ? Y2(Y2({}, n), {}, {
    radius: c,
    angle: XL(b, n)
  }) : null;
};
function Xu(e) {
  "@babel/helpers - typeof";
  return Xu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xu(e);
}
var VL = ["offset"];
function FL(e) {
  return JL(e) || QL(e) || ZL(e) || WL();
}
function WL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ZL(e, t) {
  if (e) {
    if (typeof e == "string") return Gb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Gb(e, t);
  }
}
function QL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function JL(e) {
  if (Array.isArray(e)) return Gb(e);
}
function Gb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function eU(e, t) {
  if (e == null) return {};
  var n = tU(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function tU(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function X2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? X2(Object(n), !0).forEach(function(r) {
      nU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : X2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function nU(e, t, n) {
  return t = rU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function rU(e) {
  var t = aU(e, "string");
  return Xu(t) == "symbol" ? t : t + "";
}
function aU(e, t) {
  if (Xu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Vu() {
  return Vu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Vu.apply(this, arguments);
}
var iU = function(t) {
  var n = t.value, r = t.formatter, o = we(t.children) ? n : t.children;
  return Ee(r) ? r(o) : o;
}, oU = function(t, n) {
  var r = Wn(n - t), o = Math.min(Math.abs(n - t), 360);
  return r * o;
}, lU = function(t, n, r) {
  var o = t.position, u = t.viewBox, c = t.offset, f = t.className, d = u, h = d.cx, y = d.cy, v = d.innerRadius, g = d.outerRadius, b = d.startAngle, _ = d.endAngle, S = d.clockWise, x = (v + g) / 2, A = oU(b, _), E = A >= 0 ? 1 : -1, M, C;
  o === "insideStart" ? (M = b + E * c, C = S) : o === "insideEnd" ? (M = _ - E * c, C = !S) : o === "end" && (M = _ + E * c, C = S), C = A <= 0 ? C : !C;
  var w = Bt(h, y, x, M), T = Bt(h, y, x, M + (C ? 1 : -1) * 359), j = "M".concat(w.x, ",").concat(w.y, `
    A`).concat(x, ",").concat(x, ",0,1,").concat(C ? 0 : 1, `,
    `).concat(T.x, ",").concat(T.y), N = we(t.id) ? bi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ U.createElement("text", Vu({}, r, {
    dominantBaseline: "central",
    className: $e("recharts-radial-bar-label", f)
  }), /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("path", {
    id: N,
    d: j
  })), /* @__PURE__ */ U.createElement("textPath", {
    xlinkHref: "#".concat(N)
  }, n));
}, uU = function(t) {
  var n = t.viewBox, r = t.offset, o = t.position, u = n, c = u.cx, f = u.cy, d = u.innerRadius, h = u.outerRadius, y = u.startAngle, v = u.endAngle, g = (y + v) / 2;
  if (o === "outside") {
    var b = Bt(c, f, h + r, g), _ = b.x, S = b.y;
    return {
      x: _,
      y: S,
      textAnchor: _ >= c ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (o === "center")
    return {
      x: c,
      y: f,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (o === "centerTop")
    return {
      x: c,
      y: f,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (o === "centerBottom")
    return {
      x: c,
      y: f,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var x = (d + h) / 2, A = Bt(c, f, x, g), E = A.x, M = A.y;
  return {
    x: E,
    y: M,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, cU = function(t) {
  var n = t.viewBox, r = t.parentViewBox, o = t.offset, u = t.position, c = n, f = c.x, d = c.y, h = c.width, y = c.height, v = y >= 0 ? 1 : -1, g = v * o, b = v > 0 ? "end" : "start", _ = v > 0 ? "start" : "end", S = h >= 0 ? 1 : -1, x = S * o, A = S > 0 ? "end" : "start", E = S > 0 ? "start" : "end";
  if (u === "top") {
    var M = {
      x: f + h / 2,
      y: d - v * o,
      textAnchor: "middle",
      verticalAnchor: b
    };
    return Ot(Ot({}, M), r ? {
      height: Math.max(d - r.y, 0),
      width: h
    } : {});
  }
  if (u === "bottom") {
    var C = {
      x: f + h / 2,
      y: d + y + g,
      textAnchor: "middle",
      verticalAnchor: _
    };
    return Ot(Ot({}, C), r ? {
      height: Math.max(r.y + r.height - (d + y), 0),
      width: h
    } : {});
  }
  if (u === "left") {
    var w = {
      x: f - x,
      y: d + y / 2,
      textAnchor: A,
      verticalAnchor: "middle"
    };
    return Ot(Ot({}, w), r ? {
      width: Math.max(w.x - r.x, 0),
      height: y
    } : {});
  }
  if (u === "right") {
    var T = {
      x: f + h + x,
      y: d + y / 2,
      textAnchor: E,
      verticalAnchor: "middle"
    };
    return Ot(Ot({}, T), r ? {
      width: Math.max(r.x + r.width - T.x, 0),
      height: y
    } : {});
  }
  var j = r ? {
    width: h,
    height: y
  } : {};
  return u === "insideLeft" ? Ot({
    x: f + x,
    y: d + y / 2,
    textAnchor: E,
    verticalAnchor: "middle"
  }, j) : u === "insideRight" ? Ot({
    x: f + h - x,
    y: d + y / 2,
    textAnchor: A,
    verticalAnchor: "middle"
  }, j) : u === "insideTop" ? Ot({
    x: f + h / 2,
    y: d + g,
    textAnchor: "middle",
    verticalAnchor: _
  }, j) : u === "insideBottom" ? Ot({
    x: f + h / 2,
    y: d + y - g,
    textAnchor: "middle",
    verticalAnchor: b
  }, j) : u === "insideTopLeft" ? Ot({
    x: f + x,
    y: d + g,
    textAnchor: E,
    verticalAnchor: _
  }, j) : u === "insideTopRight" ? Ot({
    x: f + h - x,
    y: d + g,
    textAnchor: A,
    verticalAnchor: _
  }, j) : u === "insideBottomLeft" ? Ot({
    x: f + x,
    y: d + y - g,
    textAnchor: E,
    verticalAnchor: b
  }, j) : u === "insideBottomRight" ? Ot({
    x: f + h - x,
    y: d + y - g,
    textAnchor: A,
    verticalAnchor: b
  }, j) : rl(u) && (de(u.x) || ai(u.x)) && (de(u.y) || ai(u.y)) ? Ot({
    x: f + hi(u.x, h),
    y: d + hi(u.y, y),
    textAnchor: "end",
    verticalAnchor: "end"
  }, j) : Ot({
    x: f + h / 2,
    y: d + y / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, j);
}, sU = function(t) {
  return "cx" in t && de(t.cx);
};
function Gt(e) {
  var t = e.offset, n = t === void 0 ? 5 : t, r = eU(e, VL), o = Ot({
    offset: n
  }, r), u = o.viewBox, c = o.position, f = o.value, d = o.children, h = o.content, y = o.className, v = y === void 0 ? "" : y, g = o.textBreakAll;
  if (!u || we(f) && we(d) && !/* @__PURE__ */ J.isValidElement(h) && !Ee(h))
    return null;
  if (/* @__PURE__ */ J.isValidElement(h))
    return /* @__PURE__ */ J.cloneElement(h, o);
  var b;
  if (Ee(h)) {
    if (b = /* @__PURE__ */ J.createElement(h, o), /* @__PURE__ */ J.isValidElement(b))
      return b;
  } else
    b = iU(o);
  var _ = sU(u), S = Te(o, !0);
  if (_ && (c === "insideStart" || c === "insideEnd" || c === "end"))
    return lU(o, b, S);
  var x = _ ? uU(o) : cU(o);
  return /* @__PURE__ */ U.createElement(pf, Vu({
    className: $e("recharts-label", v)
  }, S, x, {
    breakAll: g
  }), b);
}
Gt.displayName = "Label";
var oP = function(t) {
  var n = t.cx, r = t.cy, o = t.angle, u = t.startAngle, c = t.endAngle, f = t.r, d = t.radius, h = t.innerRadius, y = t.outerRadius, v = t.x, g = t.y, b = t.top, _ = t.left, S = t.width, x = t.height, A = t.clockWise, E = t.labelViewBox;
  if (E)
    return E;
  if (de(S) && de(x)) {
    if (de(v) && de(g))
      return {
        x: v,
        y: g,
        width: S,
        height: x
      };
    if (de(b) && de(_))
      return {
        x: b,
        y: _,
        width: S,
        height: x
      };
  }
  return de(v) && de(g) ? {
    x: v,
    y: g,
    width: 0,
    height: 0
  } : de(n) && de(r) ? {
    cx: n,
    cy: r,
    startAngle: u || o || 0,
    endAngle: c || o || 0,
    innerRadius: h || 0,
    outerRadius: y || d || f || 0,
    clockWise: A
  } : t.viewBox ? t.viewBox : {};
}, fU = function(t, n) {
  return t ? t === !0 ? /* @__PURE__ */ U.createElement(Gt, {
    key: "label-implicit",
    viewBox: n
  }) : wt(t) ? /* @__PURE__ */ U.createElement(Gt, {
    key: "label-implicit",
    viewBox: n,
    value: t
  }) : /* @__PURE__ */ J.isValidElement(t) ? t.type === Gt ? /* @__PURE__ */ J.cloneElement(t, {
    key: "label-implicit",
    viewBox: n
  }) : /* @__PURE__ */ U.createElement(Gt, {
    key: "label-implicit",
    content: t,
    viewBox: n
  }) : Ee(t) ? /* @__PURE__ */ U.createElement(Gt, {
    key: "label-implicit",
    content: t,
    viewBox: n
  }) : rl(t) ? /* @__PURE__ */ U.createElement(Gt, Vu({
    viewBox: n
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, dU = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label)
    return null;
  var o = t.children, u = oP(t), c = on(o, Gt).map(function(d, h) {
    return /* @__PURE__ */ J.cloneElement(d, {
      viewBox: n || u,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(h)
    });
  });
  if (!r)
    return c;
  var f = fU(t.label, n || u);
  return [f].concat(FL(c));
};
Gt.parseViewBox = oP;
Gt.renderCallByParent = dU;
var jg, V2;
function hU() {
  if (V2) return jg;
  V2 = 1;
  function e(t) {
    var n = t == null ? 0 : t.length;
    return n ? t[n - 1] : void 0;
  }
  return jg = e, jg;
}
var pU = hU();
const vU = /* @__PURE__ */ tt(pU);
function Fu(e) {
  "@babel/helpers - typeof";
  return Fu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fu(e);
}
var yU = ["valueAccessor"], mU = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function gU(e) {
  return _U(e) || SU(e) || xU(e) || bU();
}
function bU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xU(e, t) {
  if (e) {
    if (typeof e == "string") return Yb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Yb(e, t);
  }
}
function SU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function _U(e) {
  if (Array.isArray(e)) return Yb(e);
}
function Yb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Df() {
  return Df = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Df.apply(this, arguments);
}
function F2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function W2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? F2(Object(n), !0).forEach(function(r) {
      OU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : F2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function OU(e, t, n) {
  return t = wU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function wU(e) {
  var t = AU(e, "string");
  return Fu(t) == "symbol" ? t : t + "";
}
function AU(e, t) {
  if (Fu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Fu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Z2(e, t) {
  if (e == null) return {};
  var n = TU(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function TU(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var EU = function(t) {
  return Array.isArray(t.value) ? vU(t.value) : t.value;
};
function dr(e) {
  var t = e.valueAccessor, n = t === void 0 ? EU : t, r = Z2(e, yU), o = r.data, u = r.dataKey, c = r.clockWise, f = r.id, d = r.textBreakAll, h = Z2(r, mU);
  return !o || !o.length ? null : /* @__PURE__ */ U.createElement(Ie, {
    className: "recharts-label-list"
  }, o.map(function(y, v) {
    var g = we(u) ? n(y, v) : At(y && y.payload, u), b = we(f) ? {} : {
      id: "".concat(f, "-").concat(v)
    };
    return /* @__PURE__ */ U.createElement(Gt, Df({}, Te(y, !0), h, b, {
      parentViewBox: y.parentViewBox,
      value: g,
      textBreakAll: d,
      viewBox: Gt.parseViewBox(we(c) ? y : W2(W2({}, y), {}, {
        clockWise: c
      })),
      key: "label-".concat(v),
      index: v
    }));
  }));
}
dr.displayName = "LabelList";
function jU(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ U.createElement(dr, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ U.isValidElement(e) || Ee(e) ? /* @__PURE__ */ U.createElement(dr, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : rl(e) ? /* @__PURE__ */ U.createElement(dr, Df({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function MU(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && n && !e.label)
    return null;
  var r = e.children, o = on(r, dr).map(function(c, f) {
    return /* @__PURE__ */ J.cloneElement(c, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(f)
    });
  });
  if (!n)
    return o;
  var u = jU(e.label, t);
  return [u].concat(gU(o));
}
dr.renderCallByParent = MU;
function Wu(e) {
  "@babel/helpers - typeof";
  return Wu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wu(e);
}
function Kb() {
  return Kb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Kb.apply(this, arguments);
}
function Q2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function J2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Q2(Object(n), !0).forEach(function(r) {
      CU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Q2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function CU(e, t, n) {
  return t = DU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function DU(e) {
  var t = PU(e, "string");
  return Wu(t) == "symbol" ? t : t + "";
}
function PU(e, t) {
  if (Wu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var NU = function(t, n) {
  var r = Wn(n - t), o = Math.min(Math.abs(n - t), 359.999);
  return r * o;
}, Ys = function(t) {
  var n = t.cx, r = t.cy, o = t.radius, u = t.angle, c = t.sign, f = t.isExternal, d = t.cornerRadius, h = t.cornerIsExternal, y = d * (f ? 1 : -1) + o, v = Math.asin(d / y) / Cf, g = h ? u : u + c * v, b = Bt(n, r, y, g), _ = Bt(n, r, o, g), S = h ? u - c * v : u, x = Bt(n, r, y * Math.cos(v * Cf), S);
  return {
    center: b,
    circleTangency: _,
    lineTangency: x,
    theta: v
  };
}, lP = function(t) {
  var n = t.cx, r = t.cy, o = t.innerRadius, u = t.outerRadius, c = t.startAngle, f = t.endAngle, d = NU(c, f), h = c + d, y = Bt(n, r, u, c), v = Bt(n, r, u, h), g = "M ".concat(y.x, ",").concat(y.y, `
    A `).concat(u, ",").concat(u, `,0,
    `).concat(+(Math.abs(d) > 180), ",").concat(+(c > h), `,
    `).concat(v.x, ",").concat(v.y, `
  `);
  if (o > 0) {
    var b = Bt(n, r, o, c), _ = Bt(n, r, o, h);
    g += "L ".concat(_.x, ",").concat(_.y, `
            A `).concat(o, ",").concat(o, `,0,
            `).concat(+(Math.abs(d) > 180), ",").concat(+(c <= h), `,
            `).concat(b.x, ",").concat(b.y, " Z");
  } else
    g += "L ".concat(n, ",").concat(r, " Z");
  return g;
}, RU = function(t) {
  var n = t.cx, r = t.cy, o = t.innerRadius, u = t.outerRadius, c = t.cornerRadius, f = t.forceCornerRadius, d = t.cornerIsExternal, h = t.startAngle, y = t.endAngle, v = Wn(y - h), g = Ys({
    cx: n,
    cy: r,
    radius: u,
    angle: h,
    sign: v,
    cornerRadius: c,
    cornerIsExternal: d
  }), b = g.circleTangency, _ = g.lineTangency, S = g.theta, x = Ys({
    cx: n,
    cy: r,
    radius: u,
    angle: y,
    sign: -v,
    cornerRadius: c,
    cornerIsExternal: d
  }), A = x.circleTangency, E = x.lineTangency, M = x.theta, C = d ? Math.abs(h - y) : Math.abs(h - y) - S - M;
  if (C < 0)
    return f ? "M ".concat(_.x, ",").concat(_.y, `
        a`).concat(c, ",").concat(c, ",0,0,1,").concat(c * 2, `,0
        a`).concat(c, ",").concat(c, ",0,0,1,").concat(-c * 2, `,0
      `) : lP({
      cx: n,
      cy: r,
      innerRadius: o,
      outerRadius: u,
      startAngle: h,
      endAngle: y
    });
  var w = "M ".concat(_.x, ",").concat(_.y, `
    A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(b.x, ",").concat(b.y, `
    A`).concat(u, ",").concat(u, ",0,").concat(+(C > 180), ",").concat(+(v < 0), ",").concat(A.x, ",").concat(A.y, `
    A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(E.x, ",").concat(E.y, `
  `);
  if (o > 0) {
    var T = Ys({
      cx: n,
      cy: r,
      radius: o,
      angle: h,
      sign: v,
      isExternal: !0,
      cornerRadius: c,
      cornerIsExternal: d
    }), j = T.circleTangency, N = T.lineTangency, z = T.theta, k = Ys({
      cx: n,
      cy: r,
      radius: o,
      angle: y,
      sign: -v,
      isExternal: !0,
      cornerRadius: c,
      cornerIsExternal: d
    }), B = k.circleTangency, q = k.lineTangency, V = k.theta, Y = d ? Math.abs(h - y) : Math.abs(h - y) - z - V;
    if (Y < 0 && c === 0)
      return "".concat(w, "L").concat(n, ",").concat(r, "Z");
    w += "L".concat(q.x, ",").concat(q.y, `
      A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(B.x, ",").concat(B.y, `
      A`).concat(o, ",").concat(o, ",0,").concat(+(Y > 180), ",").concat(+(v > 0), ",").concat(j.x, ",").concat(j.y, `
      A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(N.x, ",").concat(N.y, "Z");
  } else
    w += "L".concat(n, ",").concat(r, "Z");
  return w;
}, $U = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, uP = function(t) {
  var n = J2(J2({}, $U), t), r = n.cx, o = n.cy, u = n.innerRadius, c = n.outerRadius, f = n.cornerRadius, d = n.forceCornerRadius, h = n.cornerIsExternal, y = n.startAngle, v = n.endAngle, g = n.className;
  if (c < u || y === v)
    return null;
  var b = $e("recharts-sector", g), _ = c - u, S = hi(f, _, 0, !0), x;
  return S > 0 && Math.abs(y - v) < 360 ? x = RU({
    cx: r,
    cy: o,
    innerRadius: u,
    outerRadius: c,
    cornerRadius: Math.min(S, _ / 2),
    forceCornerRadius: d,
    cornerIsExternal: h,
    startAngle: y,
    endAngle: v
  }) : x = lP({
    cx: r,
    cy: o,
    innerRadius: u,
    outerRadius: c,
    startAngle: y,
    endAngle: v
  }), /* @__PURE__ */ U.createElement("path", Kb({}, Te(n, !0), {
    className: b,
    d: x,
    role: "img"
  }));
};
function Zu(e) {
  "@babel/helpers - typeof";
  return Zu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zu(e);
}
function Xb() {
  return Xb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Xb.apply(this, arguments);
}
function ej(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function tj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ej(Object(n), !0).forEach(function(r) {
      zU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ej(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function zU(e, t, n) {
  return t = qU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function qU(e) {
  var t = kU(e, "string");
  return Zu(t) == "symbol" ? t : t + "";
}
function kU(e, t) {
  if (Zu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var nj = {
  curveBasisClosed: aq,
  curveBasisOpen: iq,
  curveBasis: rq,
  curveBumpX: Hz,
  curveBumpY: Gz,
  curveLinearClosed: oq,
  curveLinear: sd,
  curveMonotoneX: lq,
  curveMonotoneY: uq,
  curveNatural: cq,
  curveStep: sq,
  curveStepAfter: dq,
  curveStepBefore: fq
}, Ks = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, su = function(t) {
  return t.x;
}, fu = function(t) {
  return t.y;
}, BU = function(t, n) {
  if (Ee(t))
    return t;
  var r = "curve".concat(ud(t));
  return (r === "curveMonotone" || r === "curveBump") && n ? nj["".concat(r).concat(n === "vertical" ? "Y" : "X")] : nj[r] || sd;
}, LU = function(t) {
  var n = t.type, r = n === void 0 ? "linear" : n, o = t.points, u = o === void 0 ? [] : o, c = t.baseLine, f = t.layout, d = t.connectNulls, h = d === void 0 ? !1 : d, y = BU(r, f), v = h ? u.filter(function(S) {
    return Ks(S);
  }) : u, g;
  if (Array.isArray(c)) {
    var b = h ? c.filter(function(S) {
      return Ks(S);
    }) : c, _ = v.map(function(S, x) {
      return tj(tj({}, S), {}, {
        base: b[x]
      });
    });
    return f === "vertical" ? g = zs().y(fu).x1(su).x0(function(S) {
      return S.base.x;
    }) : g = zs().x(su).y1(fu).y0(function(S) {
      return S.base.y;
    }), g.defined(Ks).curve(y), g(_);
  }
  return f === "vertical" && de(c) ? g = zs().y(fu).x1(su).x0(c) : de(c) ? g = zs().x(su).y1(fu).y0(c) : g = pC().x(su).y(fu), g.defined(Ks).curve(y), g(v);
}, fi = function(t) {
  var n = t.className, r = t.points, o = t.path, u = t.pathRef;
  if ((!r || !r.length) && !o)
    return null;
  var c = r && r.length ? LU(t) : o;
  return /* @__PURE__ */ J.createElement("path", Xb({}, Te(t, !1), nf(t), {
    className: $e("recharts-curve", n),
    d: c,
    ref: u
  }));
}, Mg = { exports: {} }, Cg, rj;
function UU() {
  if (rj) return Cg;
  rj = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Cg = e, Cg;
}
var Dg, aj;
function IU() {
  if (aj) return Dg;
  aj = 1;
  var e = /* @__PURE__ */ UU();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Dg = function() {
    function r(c, f, d, h, y, v) {
      if (v !== e) {
        var g = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw g.name = "Invariant Violation", g;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var u = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: o,
      element: r,
      elementType: r,
      instanceOf: o,
      node: r,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return u.PropTypes = u, u;
  }, Dg;
}
var ij;
function HU() {
  return ij || (ij = 1, Mg.exports = /* @__PURE__ */ IU()()), Mg.exports;
}
var GU = /* @__PURE__ */ HU();
const Ge = /* @__PURE__ */ tt(GU), { getOwnPropertyNames: YU, getOwnPropertySymbols: KU } = Object, { hasOwnProperty: XU } = Object.prototype;
function Pg(e, t) {
  return function(r, o, u) {
    return e(r, o, u) && t(r, o, u);
  };
}
function Xs(e) {
  return function(n, r, o) {
    if (!n || !r || typeof n != "object" || typeof r != "object")
      return e(n, r, o);
    const { cache: u } = o, c = u.get(n), f = u.get(r);
    if (c && f)
      return c === r && f === n;
    u.set(n, r), u.set(r, n);
    const d = e(n, r, o);
    return u.delete(n), u.delete(r), d;
  };
}
function VU(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function oj(e) {
  return YU(e).concat(KU(e));
}
const FU = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => XU.call(e, t))
);
function _i(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const WU = "__v", ZU = "__o", QU = "_owner", { getOwnPropertyDescriptor: lj, keys: uj } = Object;
function JU(e, t) {
  return e.byteLength === t.byteLength && Pf(new Uint8Array(e), new Uint8Array(t));
}
function eI(e, t, n) {
  let r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (!n.equals(e[r], t[r], r, r, e, t, n))
      return !1;
  return !0;
}
function tI(e, t) {
  return e.byteLength === t.byteLength && Pf(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function nI(e, t) {
  return _i(e.getTime(), t.getTime());
}
function rI(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function aI(e, t) {
  return e === t;
}
function cj(e, t, n) {
  const r = e.size;
  if (r !== t.size)
    return !1;
  if (!r)
    return !0;
  const o = new Array(r), u = e.entries();
  let c, f, d = 0;
  for (; (c = u.next()) && !c.done; ) {
    const h = t.entries();
    let y = !1, v = 0;
    for (; (f = h.next()) && !f.done; ) {
      if (o[v]) {
        v++;
        continue;
      }
      const g = c.value, b = f.value;
      if (n.equals(g[0], b[0], d, v, e, t, n) && n.equals(g[1], b[1], g[0], b[0], e, t, n)) {
        y = o[v] = !0;
        break;
      }
      v++;
    }
    if (!y)
      return !1;
    d++;
  }
  return !0;
}
const iI = _i;
function oI(e, t, n) {
  const r = uj(e);
  let o = r.length;
  if (uj(t).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!cP(e, t, n, r[o]))
      return !1;
  return !0;
}
function du(e, t, n) {
  const r = oj(e);
  let o = r.length;
  if (oj(t).length !== o)
    return !1;
  let u, c, f;
  for (; o-- > 0; )
    if (u = r[o], !cP(e, t, n, u) || (c = lj(e, u), f = lj(t, u), (c || f) && (!c || !f || c.configurable !== f.configurable || c.enumerable !== f.enumerable || c.writable !== f.writable)))
      return !1;
  return !0;
}
function lI(e, t) {
  return _i(e.valueOf(), t.valueOf());
}
function uI(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function sj(e, t, n) {
  const r = e.size;
  if (r !== t.size)
    return !1;
  if (!r)
    return !0;
  const o = new Array(r), u = e.values();
  let c, f;
  for (; (c = u.next()) && !c.done; ) {
    const d = t.values();
    let h = !1, y = 0;
    for (; (f = d.next()) && !f.done; ) {
      if (!o[y] && n.equals(c.value, f.value, c.value, f.value, e, t, n)) {
        h = o[y] = !0;
        break;
      }
      y++;
    }
    if (!h)
      return !1;
  }
  return !0;
}
function Pf(e, t) {
  let n = e.byteLength;
  if (t.byteLength !== n || e.byteOffset !== t.byteOffset)
    return !1;
  for (; n-- > 0; )
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function cI(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function cP(e, t, n, r) {
  return (r === QU || r === ZU || r === WU) && (e.$$typeof || t.$$typeof) ? !0 : FU(t, r) && n.equals(e[r], t[r], r, r, e, t, n);
}
const sI = "[object ArrayBuffer]", fI = "[object Arguments]", dI = "[object Boolean]", hI = "[object DataView]", pI = "[object Date]", vI = "[object Error]", yI = "[object Map]", mI = "[object Number]", gI = "[object Object]", bI = "[object RegExp]", xI = "[object Set]", SI = "[object String]", _I = {
  "[object Int8Array]": !0,
  "[object Uint8Array]": !0,
  "[object Uint8ClampedArray]": !0,
  "[object Int16Array]": !0,
  "[object Uint16Array]": !0,
  "[object Int32Array]": !0,
  "[object Uint32Array]": !0,
  "[object Float16Array]": !0,
  "[object Float32Array]": !0,
  "[object Float64Array]": !0,
  "[object BigInt64Array]": !0,
  "[object BigUint64Array]": !0
}, OI = "[object URL]", wI = Object.prototype.toString;
function AI({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: n, areDatesEqual: r, areErrorsEqual: o, areFunctionsEqual: u, areMapsEqual: c, areNumbersEqual: f, areObjectsEqual: d, arePrimitiveWrappersEqual: h, areRegExpsEqual: y, areSetsEqual: v, areTypedArraysEqual: g, areUrlsEqual: b, unknownTagComparators: _ }) {
  return function(x, A, E) {
    if (x === A)
      return !0;
    if (x == null || A == null)
      return !1;
    const M = typeof x;
    if (M !== typeof A)
      return !1;
    if (M !== "object")
      return M === "number" ? f(x, A, E) : M === "function" ? u(x, A, E) : !1;
    const C = x.constructor;
    if (C !== A.constructor)
      return !1;
    if (C === Object)
      return d(x, A, E);
    if (Array.isArray(x))
      return t(x, A, E);
    if (C === Date)
      return r(x, A, E);
    if (C === RegExp)
      return y(x, A, E);
    if (C === Map)
      return c(x, A, E);
    if (C === Set)
      return v(x, A, E);
    const w = wI.call(x);
    if (w === pI)
      return r(x, A, E);
    if (w === bI)
      return y(x, A, E);
    if (w === yI)
      return c(x, A, E);
    if (w === xI)
      return v(x, A, E);
    if (w === gI)
      return typeof x.then != "function" && typeof A.then != "function" && d(x, A, E);
    if (w === OI)
      return b(x, A, E);
    if (w === vI)
      return o(x, A, E);
    if (w === fI)
      return d(x, A, E);
    if (_I[w])
      return g(x, A, E);
    if (w === sI)
      return e(x, A, E);
    if (w === hI)
      return n(x, A, E);
    if (w === dI || w === mI || w === SI)
      return h(x, A, E);
    if (_) {
      let T = _[w];
      if (!T) {
        const j = VU(x);
        j && (T = _[j]);
      }
      if (T)
        return T(x, A, E);
    }
    return !1;
  };
}
function TI({ circular: e, createCustomConfig: t, strict: n }) {
  let r = {
    areArrayBuffersEqual: JU,
    areArraysEqual: n ? du : eI,
    areDataViewsEqual: tI,
    areDatesEqual: nI,
    areErrorsEqual: rI,
    areFunctionsEqual: aI,
    areMapsEqual: n ? Pg(cj, du) : cj,
    areNumbersEqual: iI,
    areObjectsEqual: n ? du : oI,
    arePrimitiveWrappersEqual: lI,
    areRegExpsEqual: uI,
    areSetsEqual: n ? Pg(sj, du) : sj,
    areTypedArraysEqual: n ? Pg(Pf, du) : Pf,
    areUrlsEqual: cI,
    unknownTagComparators: void 0
  };
  if (t && (r = Object.assign({}, r, t(r))), e) {
    const o = Xs(r.areArraysEqual), u = Xs(r.areMapsEqual), c = Xs(r.areObjectsEqual), f = Xs(r.areSetsEqual);
    r = Object.assign({}, r, {
      areArraysEqual: o,
      areMapsEqual: u,
      areObjectsEqual: c,
      areSetsEqual: f
    });
  }
  return r;
}
function EI(e) {
  return function(t, n, r, o, u, c, f) {
    return e(t, n, f);
  };
}
function jI({ circular: e, comparator: t, createState: n, equals: r, strict: o }) {
  if (n)
    return function(f, d) {
      const { cache: h = e ? /* @__PURE__ */ new WeakMap() : void 0, meta: y } = n();
      return t(f, d, {
        cache: h,
        equals: r,
        meta: y,
        strict: o
      });
    };
  if (e)
    return function(f, d) {
      return t(f, d, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: r,
        meta: void 0,
        strict: o
      });
    };
  const u = {
    cache: void 0,
    equals: r,
    meta: void 0,
    strict: o
  };
  return function(f, d) {
    return t(f, d, u);
  };
}
const MI = za();
za({ strict: !0 });
za({ circular: !0 });
za({
  circular: !0,
  strict: !0
});
za({
  createInternalComparator: () => _i
});
za({
  strict: !0,
  createInternalComparator: () => _i
});
za({
  circular: !0,
  createInternalComparator: () => _i
});
za({
  circular: !0,
  createInternalComparator: () => _i,
  strict: !0
});
function za(e = {}) {
  const { circular: t = !1, createInternalComparator: n, createState: r, strict: o = !1 } = e, u = TI(e), c = AI(u), f = n ? n(c) : EI(c);
  return jI({ circular: t, comparator: c, createState: r, equals: f, strict: o });
}
function CI(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function fj(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = -1, r = function o(u) {
    n < 0 && (n = u), u - n > t ? (e(u), n = -1) : CI(o);
  };
  requestAnimationFrame(r);
}
function Vb(e) {
  "@babel/helpers - typeof";
  return Vb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vb(e);
}
function DI(e) {
  return $I(e) || RI(e) || NI(e) || PI();
}
function PI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function NI(e, t) {
  if (e) {
    if (typeof e == "string") return dj(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dj(e, t);
  }
}
function dj(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function RI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function $I(e) {
  if (Array.isArray(e)) return e;
}
function zI() {
  var e = {}, t = function() {
    return null;
  }, n = !1, r = function o(u) {
    if (!n) {
      if (Array.isArray(u)) {
        if (!u.length)
          return;
        var c = u, f = DI(c), d = f[0], h = f.slice(1);
        if (typeof d == "number") {
          fj(o.bind(null, h), d);
          return;
        }
        o(d), fj(o.bind(null, h));
        return;
      }
      Vb(u) === "object" && (e = u, t(e)), typeof u == "function" && u();
    }
  };
  return {
    stop: function() {
      n = !0;
    },
    start: function(u) {
      n = !1, r(u);
    },
    subscribe: function(u) {
      return t = u, function() {
        t = function() {
          return null;
        };
      };
    }
  };
}
function Qu(e) {
  "@babel/helpers - typeof";
  return Qu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qu(e);
}
function hj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function pj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hj(Object(n), !0).forEach(function(r) {
      sP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sP(e, t, n) {
  return t = qI(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function qI(e) {
  var t = kI(e, "string");
  return Qu(t) === "symbol" ? t : String(t);
}
function kI(e, t) {
  if (Qu(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Qu(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var BI = function(t, n) {
  return [Object.keys(t), Object.keys(n)].reduce(function(r, o) {
    return r.filter(function(u) {
      return o.includes(u);
    });
  });
}, LI = function(t) {
  return t;
}, UI = function(t) {
  return t.replace(/([A-Z])/g, function(n) {
    return "-".concat(n.toLowerCase());
  });
}, _u = function(t, n) {
  return Object.keys(n).reduce(function(r, o) {
    return pj(pj({}, r), {}, sP({}, o, t(o, n[o])));
  }, {});
}, vj = function(t, n, r) {
  return t.map(function(o) {
    return "".concat(UI(o), " ").concat(n, "ms ").concat(r);
  }).join(",");
};
function II(e, t) {
  return YI(e) || GI(e, t) || fP(e, t) || HI();
}
function HI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function GI(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function YI(e) {
  if (Array.isArray(e)) return e;
}
function KI(e) {
  return FI(e) || VI(e) || fP(e) || XI();
}
function XI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fP(e, t) {
  if (e) {
    if (typeof e == "string") return Fb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Fb(e, t);
  }
}
function VI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function FI(e) {
  if (Array.isArray(e)) return Fb(e);
}
function Fb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var Nf = 1e-4, dP = function(t, n) {
  return [0, 3 * t, 3 * n - 6 * t, 3 * t - 3 * n + 1];
}, hP = function(t, n) {
  return t.map(function(r, o) {
    return r * Math.pow(n, o);
  }).reduce(function(r, o) {
    return r + o;
  });
}, yj = function(t, n) {
  return function(r) {
    var o = dP(t, n);
    return hP(o, r);
  };
}, WI = function(t, n) {
  return function(r) {
    var o = dP(t, n), u = [].concat(KI(o.map(function(c, f) {
      return c * f;
    }).slice(1)), [0]);
    return hP(u, r);
  };
}, mj = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  var o = n[0], u = n[1], c = n[2], f = n[3];
  if (n.length === 1)
    switch (n[0]) {
      case "linear":
        o = 0, u = 0, c = 1, f = 1;
        break;
      case "ease":
        o = 0.25, u = 0.1, c = 0.25, f = 1;
        break;
      case "ease-in":
        o = 0.42, u = 0, c = 1, f = 1;
        break;
      case "ease-out":
        o = 0.42, u = 0, c = 0.58, f = 1;
        break;
      case "ease-in-out":
        o = 0, u = 0, c = 0.58, f = 1;
        break;
      default: {
        var d = n[0].split("(");
        if (d[0] === "cubic-bezier" && d[1].split(")")[0].split(",").length === 4) {
          var h = d[1].split(")")[0].split(",").map(function(x) {
            return parseFloat(x);
          }), y = II(h, 4);
          o = y[0], u = y[1], c = y[2], f = y[3];
        }
      }
    }
  var v = yj(o, c), g = yj(u, f), b = WI(o, c), _ = function(A) {
    return A > 1 ? 1 : A < 0 ? 0 : A;
  }, S = function(A) {
    for (var E = A > 1 ? 1 : A, M = E, C = 0; C < 8; ++C) {
      var w = v(M) - E, T = b(M);
      if (Math.abs(w - E) < Nf || T < Nf)
        return g(M);
      M = _(M - w / T);
    }
    return g(M);
  };
  return S.isStepper = !1, S;
}, ZI = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.stiff, r = n === void 0 ? 100 : n, o = t.damping, u = o === void 0 ? 8 : o, c = t.dt, f = c === void 0 ? 17 : c, d = function(y, v, g) {
    var b = -(y - v) * r, _ = g * u, S = g + (b - _) * f / 1e3, x = g * f / 1e3 + y;
    return Math.abs(x - v) < Nf && Math.abs(S) < Nf ? [v, 0] : [x, S];
  };
  return d.isStepper = !0, d.dt = f, d;
}, QI = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  var o = n[0];
  if (typeof o == "string")
    switch (o) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return mj(o);
      case "spring":
        return ZI();
      default:
        if (o.split("(")[0] === "cubic-bezier")
          return mj(o);
    }
  return typeof o == "function" ? o : null;
};
function Ju(e) {
  "@babel/helpers - typeof";
  return Ju = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ju(e);
}
function gj(e) {
  return t9(e) || e9(e) || pP(e) || JI();
}
function JI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function e9(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function t9(e) {
  if (Array.isArray(e)) return Zb(e);
}
function bj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bj(Object(n), !0).forEach(function(r) {
      Wb(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Wb(e, t, n) {
  return t = n9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function n9(e) {
  var t = r9(e, "string");
  return Ju(t) === "symbol" ? t : String(t);
}
function r9(e, t) {
  if (Ju(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ju(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function a9(e, t) {
  return l9(e) || o9(e, t) || pP(e, t) || i9();
}
function i9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pP(e, t) {
  if (e) {
    if (typeof e == "string") return Zb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Zb(e, t);
  }
}
function Zb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function o9(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function l9(e) {
  if (Array.isArray(e)) return e;
}
var Rf = function(t, n, r) {
  return t + (n - t) * r;
}, Qb = function(t) {
  var n = t.from, r = t.to;
  return n !== r;
}, u9 = function e(t, n, r) {
  var o = _u(function(u, c) {
    if (Qb(c)) {
      var f = t(c.from, c.to, c.velocity), d = a9(f, 2), h = d[0], y = d[1];
      return kt(kt({}, c), {}, {
        from: h,
        velocity: y
      });
    }
    return c;
  }, n);
  return r < 1 ? _u(function(u, c) {
    return Qb(c) ? kt(kt({}, c), {}, {
      velocity: Rf(c.velocity, o[u].velocity, r),
      from: Rf(c.from, o[u].from, r)
    }) : c;
  }, n) : e(t, o, r - 1);
};
const c9 = (function(e, t, n, r, o) {
  var u = BI(e, t), c = u.reduce(function(x, A) {
    return kt(kt({}, x), {}, Wb({}, A, [e[A], t[A]]));
  }, {}), f = u.reduce(function(x, A) {
    return kt(kt({}, x), {}, Wb({}, A, {
      from: e[A],
      velocity: 0,
      to: t[A]
    }));
  }, {}), d = -1, h, y, v = function() {
    return null;
  }, g = function() {
    return _u(function(A, E) {
      return E.from;
    }, f);
  }, b = function() {
    return !Object.values(f).filter(Qb).length;
  }, _ = function(A) {
    h || (h = A);
    var E = A - h, M = E / n.dt;
    f = u9(n, f, M), o(kt(kt(kt({}, e), t), g())), h = A, b() || (d = requestAnimationFrame(v));
  }, S = function(A) {
    y || (y = A);
    var E = (A - y) / r, M = _u(function(w, T) {
      return Rf.apply(void 0, gj(T).concat([n(E)]));
    }, c);
    if (o(kt(kt(kt({}, e), t), M)), E < 1)
      d = requestAnimationFrame(v);
    else {
      var C = _u(function(w, T) {
        return Rf.apply(void 0, gj(T).concat([n(1)]));
      }, c);
      o(kt(kt(kt({}, e), t), C));
    }
  };
  return v = n.isStepper ? _ : S, function() {
    return requestAnimationFrame(v), function() {
      cancelAnimationFrame(d);
    };
  };
});
function ko(e) {
  "@babel/helpers - typeof";
  return ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ko(e);
}
var s9 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function f9(e, t) {
  if (e == null) return {};
  var n = d9(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function d9(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, u;
  for (u = 0; u < r.length; u++)
    o = r[u], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Ng(e) {
  return y9(e) || v9(e) || p9(e) || h9();
}
function h9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function p9(e, t) {
  if (e) {
    if (typeof e == "string") return Jb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Jb(e, t);
  }
}
function v9(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function y9(e) {
  if (Array.isArray(e)) return Jb(e);
}
function Jb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function xj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xj(Object(n), !0).forEach(function(r) {
      mu(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mu(e, t, n) {
  return t = vP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function m9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function g9(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, vP(r.key), r);
  }
}
function b9(e, t, n) {
  return t && g9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function vP(e) {
  var t = x9(e, "string");
  return ko(t) === "symbol" ? t : String(t);
}
function x9(e, t) {
  if (ko(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ko(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function S9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && e0(e, t);
}
function e0(e, t) {
  return e0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, e0(e, t);
}
function _9(e) {
  var t = O9();
  return function() {
    var r = $f(e), o;
    if (t) {
      var u = $f(this).constructor;
      o = Reflect.construct(r, arguments, u);
    } else
      o = r.apply(this, arguments);
    return t0(this, o);
  };
}
function t0(e, t) {
  if (t && (ko(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return n0(e);
}
function n0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function O9() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function $f(e) {
  return $f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, $f(e);
}
var Zn = /* @__PURE__ */ (function(e) {
  S9(n, e);
  var t = _9(n);
  function n(r, o) {
    var u;
    m9(this, n), u = t.call(this, r, o);
    var c = u.props, f = c.isActive, d = c.attributeName, h = c.from, y = c.to, v = c.steps, g = c.children, b = c.duration;
    if (u.handleStyleChange = u.handleStyleChange.bind(n0(u)), u.changeStyle = u.changeStyle.bind(n0(u)), !f || b <= 0)
      return u.state = {
        style: {}
      }, typeof g == "function" && (u.state = {
        style: y
      }), t0(u);
    if (v && v.length)
      u.state = {
        style: v[0].style
      };
    else if (h) {
      if (typeof g == "function")
        return u.state = {
          style: h
        }, t0(u);
      u.state = {
        style: d ? mu({}, d, h) : h
      };
    } else
      u.state = {
        style: {}
      };
    return u;
  }
  return b9(n, [{
    key: "componentDidMount",
    value: function() {
      var o = this.props, u = o.isActive, c = o.canBegin;
      this.mounted = !0, !(!u || !c) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(o) {
      var u = this.props, c = u.isActive, f = u.canBegin, d = u.attributeName, h = u.shouldReAnimate, y = u.to, v = u.from, g = this.state.style;
      if (f) {
        if (!c) {
          var b = {
            style: d ? mu({}, d, y) : y
          };
          this.state && g && (d && g[d] !== y || !d && g !== y) && this.setState(b);
          return;
        }
        if (!(MI(o.to, y) && o.canBegin && o.isActive)) {
          var _ = !o.canBegin || !o.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var S = _ || h ? v : o.to;
          if (this.state && g) {
            var x = {
              style: d ? mu({}, d, S) : S
            };
            (d && g[d] !== S || !d && g !== S) && this.setState(x);
          }
          this.runAnimation(Yn(Yn({}, this.props), {}, {
            from: S,
            begin: 0
          }));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var o = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), o && o();
    }
  }, {
    key: "handleStyleChange",
    value: function(o) {
      this.changeStyle(o);
    }
  }, {
    key: "changeStyle",
    value: function(o) {
      this.mounted && this.setState({
        style: o
      });
    }
  }, {
    key: "runJSAnimation",
    value: function(o) {
      var u = this, c = o.from, f = o.to, d = o.duration, h = o.easing, y = o.begin, v = o.onAnimationEnd, g = o.onAnimationStart, b = c9(c, f, QI(h), d, this.changeStyle), _ = function() {
        u.stopJSAnimation = b();
      };
      this.manager.start([g, y, _, d, v]);
    }
  }, {
    key: "runStepAnimation",
    value: function(o) {
      var u = this, c = o.steps, f = o.begin, d = o.onAnimationStart, h = c[0], y = h.style, v = h.duration, g = v === void 0 ? 0 : v, b = function(S, x, A) {
        if (A === 0)
          return S;
        var E = x.duration, M = x.easing, C = M === void 0 ? "ease" : M, w = x.style, T = x.properties, j = x.onAnimationEnd, N = A > 0 ? c[A - 1] : x, z = T || Object.keys(w);
        if (typeof C == "function" || C === "spring")
          return [].concat(Ng(S), [u.runJSAnimation.bind(u, {
            from: N.style,
            to: w,
            duration: E,
            easing: C
          }), E]);
        var k = vj(z, E, C), B = Yn(Yn(Yn({}, N.style), w), {}, {
          transition: k
        });
        return [].concat(Ng(S), [B, E, j]).filter(LI);
      };
      return this.manager.start([d].concat(Ng(c.reduce(b, [y, Math.max(g, f)])), [o.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(o) {
      this.manager || (this.manager = zI());
      var u = o.begin, c = o.duration, f = o.attributeName, d = o.to, h = o.easing, y = o.onAnimationStart, v = o.onAnimationEnd, g = o.steps, b = o.children, _ = this.manager;
      if (this.unSubscribe = _.subscribe(this.handleStyleChange), typeof h == "function" || typeof b == "function" || h === "spring") {
        this.runJSAnimation(o);
        return;
      }
      if (g.length > 1) {
        this.runStepAnimation(o);
        return;
      }
      var S = f ? mu({}, f, d) : d, x = vj(Object.keys(S), c, h);
      _.start([y, u, Yn(Yn({}, S), {}, {
        transition: x
      }), c, v]);
    }
  }, {
    key: "render",
    value: function() {
      var o = this.props, u = o.children;
      o.begin;
      var c = o.duration;
      o.attributeName, o.easing;
      var f = o.isActive;
      o.steps, o.from, o.to, o.canBegin, o.onAnimationEnd, o.shouldReAnimate, o.onAnimationReStart;
      var d = f9(o, s9), h = J.Children.count(u), y = this.state.style;
      if (typeof u == "function")
        return u(y);
      if (!f || h === 0 || c <= 0)
        return u;
      var v = function(b) {
        var _ = b.props, S = _.style, x = S === void 0 ? {} : S, A = _.className, E = /* @__PURE__ */ J.cloneElement(b, Yn(Yn({}, d), {}, {
          style: Yn(Yn({}, x), y),
          className: A
        }));
        return E;
      };
      return h === 1 ? v(J.Children.only(u)) : /* @__PURE__ */ U.createElement("div", null, J.Children.map(u, function(g) {
        return v(g);
      }));
    }
  }]), n;
})(J.PureComponent);
Zn.displayName = "Animate";
Zn.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {
  },
  onAnimationStart: function() {
  }
};
Zn.propTypes = {
  from: Ge.oneOfType([Ge.object, Ge.string]),
  to: Ge.oneOfType([Ge.object, Ge.string]),
  attributeName: Ge.string,
  // animation duration
  duration: Ge.number,
  begin: Ge.number,
  easing: Ge.oneOfType([Ge.string, Ge.func]),
  steps: Ge.arrayOf(Ge.shape({
    duration: Ge.number.isRequired,
    style: Ge.object.isRequired,
    easing: Ge.oneOfType([Ge.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), Ge.func]),
    // transition css properties(dash case), optional
    properties: Ge.arrayOf("string"),
    onAnimationEnd: Ge.func
  })),
  children: Ge.oneOfType([Ge.node, Ge.func]),
  isActive: Ge.bool,
  canBegin: Ge.bool,
  onAnimationEnd: Ge.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: Ge.bool,
  onAnimationStart: Ge.func,
  onAnimationReStart: Ge.func
};
function ec(e) {
  "@babel/helpers - typeof";
  return ec = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ec(e);
}
function zf() {
  return zf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, zf.apply(this, arguments);
}
function w9(e, t) {
  return j9(e) || E9(e, t) || T9(e, t) || A9();
}
function A9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function T9(e, t) {
  if (e) {
    if (typeof e == "string") return Sj(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Sj(e, t);
  }
}
function Sj(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function E9(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function j9(e) {
  if (Array.isArray(e)) return e;
}
function _j(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Oj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _j(Object(n), !0).forEach(function(r) {
      M9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _j(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function M9(e, t, n) {
  return t = C9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function C9(e) {
  var t = D9(e, "string");
  return ec(t) == "symbol" ? t : t + "";
}
function D9(e, t) {
  if (ec(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ec(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wj = function(t, n, r, o, u) {
  var c = Math.min(Math.abs(r) / 2, Math.abs(o) / 2), f = o >= 0 ? 1 : -1, d = r >= 0 ? 1 : -1, h = o >= 0 && r >= 0 || o < 0 && r < 0 ? 1 : 0, y;
  if (c > 0 && u instanceof Array) {
    for (var v = [0, 0, 0, 0], g = 0, b = 4; g < b; g++)
      v[g] = u[g] > c ? c : u[g];
    y = "M".concat(t, ",").concat(n + f * v[0]), v[0] > 0 && (y += "A ".concat(v[0], ",").concat(v[0], ",0,0,").concat(h, ",").concat(t + d * v[0], ",").concat(n)), y += "L ".concat(t + r - d * v[1], ",").concat(n), v[1] > 0 && (y += "A ".concat(v[1], ",").concat(v[1], ",0,0,").concat(h, `,
        `).concat(t + r, ",").concat(n + f * v[1])), y += "L ".concat(t + r, ",").concat(n + o - f * v[2]), v[2] > 0 && (y += "A ".concat(v[2], ",").concat(v[2], ",0,0,").concat(h, `,
        `).concat(t + r - d * v[2], ",").concat(n + o)), y += "L ".concat(t + d * v[3], ",").concat(n + o), v[3] > 0 && (y += "A ".concat(v[3], ",").concat(v[3], ",0,0,").concat(h, `,
        `).concat(t, ",").concat(n + o - f * v[3])), y += "Z";
  } else if (c > 0 && u === +u && u > 0) {
    var _ = Math.min(c, u);
    y = "M ".concat(t, ",").concat(n + f * _, `
            A `).concat(_, ",").concat(_, ",0,0,").concat(h, ",").concat(t + d * _, ",").concat(n, `
            L `).concat(t + r - d * _, ",").concat(n, `
            A `).concat(_, ",").concat(_, ",0,0,").concat(h, ",").concat(t + r, ",").concat(n + f * _, `
            L `).concat(t + r, ",").concat(n + o - f * _, `
            A `).concat(_, ",").concat(_, ",0,0,").concat(h, ",").concat(t + r - d * _, ",").concat(n + o, `
            L `).concat(t + d * _, ",").concat(n + o, `
            A `).concat(_, ",").concat(_, ",0,0,").concat(h, ",").concat(t, ",").concat(n + o - f * _, " Z");
  } else
    y = "M ".concat(t, ",").concat(n, " h ").concat(r, " v ").concat(o, " h ").concat(-r, " Z");
  return y;
}, P9 = function(t, n) {
  if (!t || !n)
    return !1;
  var r = t.x, o = t.y, u = n.x, c = n.y, f = n.width, d = n.height;
  if (Math.abs(f) > 0 && Math.abs(d) > 0) {
    var h = Math.min(u, u + f), y = Math.max(u, u + f), v = Math.min(c, c + d), g = Math.max(c, c + d);
    return r >= h && r <= y && o >= v && o <= g;
  }
  return !1;
}, N9 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, M1 = function(t) {
  var n = Oj(Oj({}, N9), t), r = J.useRef(), o = J.useState(-1), u = w9(o, 2), c = u[0], f = u[1];
  J.useEffect(function() {
    if (r.current && r.current.getTotalLength)
      try {
        var C = r.current.getTotalLength();
        C && f(C);
      } catch {
      }
  }, []);
  var d = n.x, h = n.y, y = n.width, v = n.height, g = n.radius, b = n.className, _ = n.animationEasing, S = n.animationDuration, x = n.animationBegin, A = n.isAnimationActive, E = n.isUpdateAnimationActive;
  if (d !== +d || h !== +h || y !== +y || v !== +v || y === 0 || v === 0)
    return null;
  var M = $e("recharts-rectangle", b);
  return E ? /* @__PURE__ */ U.createElement(Zn, {
    canBegin: c > 0,
    from: {
      width: y,
      height: v,
      x: d,
      y: h
    },
    to: {
      width: y,
      height: v,
      x: d,
      y: h
    },
    duration: S,
    animationEasing: _,
    isActive: E
  }, function(C) {
    var w = C.width, T = C.height, j = C.x, N = C.y;
    return /* @__PURE__ */ U.createElement(Zn, {
      canBegin: c > 0,
      from: "0px ".concat(c === -1 ? 1 : c, "px"),
      to: "".concat(c, "px 0px"),
      attributeName: "strokeDasharray",
      begin: x,
      duration: S,
      isActive: A,
      easing: _
    }, /* @__PURE__ */ U.createElement("path", zf({}, Te(n, !0), {
      className: M,
      d: wj(j, N, w, T, g),
      ref: r
    })));
  }) : /* @__PURE__ */ U.createElement("path", zf({}, Te(n, !0), {
    className: M,
    d: wj(d, h, y, v, g)
  }));
};
function r0() {
  return r0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, r0.apply(this, arguments);
}
var Td = function(t) {
  var n = t.cx, r = t.cy, o = t.r, u = t.className, c = $e("recharts-dot", u);
  return n === +n && r === +r && o === +o ? /* @__PURE__ */ J.createElement("circle", r0({}, Te(t, !1), nf(t), {
    className: c,
    cx: n,
    cy: r,
    r: o
  })) : null;
};
function tc(e) {
  "@babel/helpers - typeof";
  return tc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tc(e);
}
var R9 = ["x", "y", "top", "left", "width", "height", "className"];
function a0() {
  return a0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, a0.apply(this, arguments);
}
function Aj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function $9(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Aj(Object(n), !0).forEach(function(r) {
      z9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Aj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function z9(e, t, n) {
  return t = q9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function q9(e) {
  var t = k9(e, "string");
  return tc(t) == "symbol" ? t : t + "";
}
function k9(e, t) {
  if (tc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (tc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function B9(e, t) {
  if (e == null) return {};
  var n = L9(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function L9(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var U9 = function(t, n, r, o, u, c) {
  return "M".concat(t, ",").concat(u, "v").concat(o, "M").concat(c, ",").concat(n, "h").concat(r);
}, I9 = function(t) {
  var n = t.x, r = n === void 0 ? 0 : n, o = t.y, u = o === void 0 ? 0 : o, c = t.top, f = c === void 0 ? 0 : c, d = t.left, h = d === void 0 ? 0 : d, y = t.width, v = y === void 0 ? 0 : y, g = t.height, b = g === void 0 ? 0 : g, _ = t.className, S = B9(t, R9), x = $9({
    x: r,
    y: u,
    top: f,
    left: h,
    width: v,
    height: b
  }, S);
  return !de(r) || !de(u) || !de(v) || !de(b) || !de(f) || !de(h) ? null : /* @__PURE__ */ U.createElement("path", a0({}, Te(x, !0), {
    className: $e("recharts-cross", _),
    d: U9(r, u, v, b, f, h)
  }));
}, Rg, Tj;
function H9() {
  if (Tj) return Rg;
  Tj = 1;
  var e = qC(), t = e(Object.getPrototypeOf, Object);
  return Rg = t, Rg;
}
var $g, Ej;
function G9() {
  if (Ej) return $g;
  Ej = 1;
  var e = Xr(), t = H9(), n = Vr(), r = "[object Object]", o = Function.prototype, u = Object.prototype, c = o.toString, f = u.hasOwnProperty, d = c.call(Object);
  function h(y) {
    if (!n(y) || e(y) != r)
      return !1;
    var v = t(y);
    if (v === null)
      return !0;
    var g = f.call(v, "constructor") && v.constructor;
    return typeof g == "function" && g instanceof g && c.call(g) == d;
  }
  return $g = h, $g;
}
var Y9 = G9();
const K9 = /* @__PURE__ */ tt(Y9);
var zg, jj;
function X9() {
  if (jj) return zg;
  jj = 1;
  var e = Xr(), t = Vr(), n = "[object Boolean]";
  function r(o) {
    return o === !0 || o === !1 || t(o) && e(o) == n;
  }
  return zg = r, zg;
}
var V9 = X9();
const F9 = /* @__PURE__ */ tt(V9);
function nc(e) {
  "@babel/helpers - typeof";
  return nc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nc(e);
}
function qf() {
  return qf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, qf.apply(this, arguments);
}
function W9(e, t) {
  return eH(e) || J9(e, t) || Q9(e, t) || Z9();
}
function Z9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Q9(e, t) {
  if (e) {
    if (typeof e == "string") return Mj(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Mj(e, t);
  }
}
function Mj(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function J9(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function eH(e) {
  if (Array.isArray(e)) return e;
}
function Cj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Dj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cj(Object(n), !0).forEach(function(r) {
      tH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Cj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function tH(e, t, n) {
  return t = nH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function nH(e) {
  var t = rH(e, "string");
  return nc(t) == "symbol" ? t : t + "";
}
function rH(e, t) {
  if (nc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (nc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Pj = function(t, n, r, o, u) {
  var c = r - o, f;
  return f = "M ".concat(t, ",").concat(n), f += "L ".concat(t + r, ",").concat(n), f += "L ".concat(t + r - c / 2, ",").concat(n + u), f += "L ".concat(t + r - c / 2 - o, ",").concat(n + u), f += "L ".concat(t, ",").concat(n, " Z"), f;
}, aH = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, iH = function(t) {
  var n = Dj(Dj({}, aH), t), r = J.useRef(), o = J.useState(-1), u = W9(o, 2), c = u[0], f = u[1];
  J.useEffect(function() {
    if (r.current && r.current.getTotalLength)
      try {
        var M = r.current.getTotalLength();
        M && f(M);
      } catch {
      }
  }, []);
  var d = n.x, h = n.y, y = n.upperWidth, v = n.lowerWidth, g = n.height, b = n.className, _ = n.animationEasing, S = n.animationDuration, x = n.animationBegin, A = n.isUpdateAnimationActive;
  if (d !== +d || h !== +h || y !== +y || v !== +v || g !== +g || y === 0 && v === 0 || g === 0)
    return null;
  var E = $e("recharts-trapezoid", b);
  return A ? /* @__PURE__ */ U.createElement(Zn, {
    canBegin: c > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: g,
      x: d,
      y: h
    },
    to: {
      upperWidth: y,
      lowerWidth: v,
      height: g,
      x: d,
      y: h
    },
    duration: S,
    animationEasing: _,
    isActive: A
  }, function(M) {
    var C = M.upperWidth, w = M.lowerWidth, T = M.height, j = M.x, N = M.y;
    return /* @__PURE__ */ U.createElement(Zn, {
      canBegin: c > 0,
      from: "0px ".concat(c === -1 ? 1 : c, "px"),
      to: "".concat(c, "px 0px"),
      attributeName: "strokeDasharray",
      begin: x,
      duration: S,
      easing: _
    }, /* @__PURE__ */ U.createElement("path", qf({}, Te(n, !0), {
      className: E,
      d: Pj(j, N, C, w, T),
      ref: r
    })));
  }) : /* @__PURE__ */ U.createElement("g", null, /* @__PURE__ */ U.createElement("path", qf({}, Te(n, !0), {
    className: E,
    d: Pj(d, h, y, v, g)
  })));
}, oH = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function rc(e) {
  "@babel/helpers - typeof";
  return rc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rc(e);
}
function lH(e, t) {
  if (e == null) return {};
  var n = uH(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function uH(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Nj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function kf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Nj(Object(n), !0).forEach(function(r) {
      cH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Nj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function cH(e, t, n) {
  return t = sH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function sH(e) {
  var t = fH(e, "string");
  return rc(t) == "symbol" ? t : t + "";
}
function fH(e, t) {
  if (rc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (rc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dH(e, t) {
  return kf(kf({}, t), e);
}
function hH(e, t) {
  return e === "symbols";
}
function Rj(e) {
  var t = e.shapeType, n = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ U.createElement(M1, n);
    case "trapezoid":
      return /* @__PURE__ */ U.createElement(iH, n);
    case "sector":
      return /* @__PURE__ */ U.createElement(uP, n);
    case "symbols":
      if (hH(t))
        return /* @__PURE__ */ U.createElement(dd, n);
      break;
    default:
      return null;
  }
}
function pH(e) {
  return /* @__PURE__ */ J.isValidElement(e) ? e.props : e;
}
function i0(e) {
  var t = e.option, n = e.shapeType, r = e.propTransformer, o = r === void 0 ? dH : r, u = e.activeClassName, c = u === void 0 ? "recharts-active-shape" : u, f = e.isActive, d = lH(e, oH), h;
  if (/* @__PURE__ */ J.isValidElement(t))
    h = /* @__PURE__ */ J.cloneElement(t, kf(kf({}, d), pH(t)));
  else if (Ee(t))
    h = t(d);
  else if (K9(t) && !F9(t)) {
    var y = o(t, d);
    h = /* @__PURE__ */ U.createElement(Rj, {
      shapeType: n,
      elementProps: y
    });
  } else {
    var v = d;
    h = /* @__PURE__ */ U.createElement(Rj, {
      shapeType: n,
      elementProps: v
    });
  }
  return f ? /* @__PURE__ */ U.createElement(Ie, {
    className: c
  }, h) : h;
}
function Ed(e, t) {
  return t != null && "trapezoids" in e.props;
}
function jd(e, t) {
  return t != null && "sectors" in e.props;
}
function ac(e, t) {
  return t != null && "points" in e.props;
}
function vH(e, t) {
  var n, r, o = e.x === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.x) || e.x === t.x, u = e.y === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.y) || e.y === t.y;
  return o && u;
}
function yH(e, t) {
  var n = e.endAngle === t.endAngle, r = e.startAngle === t.startAngle;
  return n && r;
}
function mH(e, t) {
  var n = e.x === t.x, r = e.y === t.y, o = e.z === t.z;
  return n && r && o;
}
function gH(e, t) {
  var n;
  return Ed(e, t) ? n = vH : jd(e, t) ? n = yH : ac(e, t) && (n = mH), n;
}
function bH(e, t) {
  var n;
  return Ed(e, t) ? n = "trapezoids" : jd(e, t) ? n = "sectors" : ac(e, t) && (n = "points"), n;
}
function xH(e, t) {
  if (Ed(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  if (jd(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  return ac(e, t) ? t.payload : {};
}
function SH(e) {
  var t = e.activeTooltipItem, n = e.graphicalItem, r = e.itemData, o = bH(n, t), u = xH(n, t), c = r.filter(function(d, h) {
    var y = pi(u, d), v = n.props[o].filter(function(_) {
      var S = gH(n, t);
      return S(_, t);
    }), g = n.props[o].indexOf(v[v.length - 1]), b = h === g;
    return y && b;
  }), f = r.indexOf(c[c.length - 1]);
  return f;
}
var qg, $j;
function _H() {
  if ($j) return qg;
  $j = 1;
  var e = Math.ceil, t = Math.max;
  function n(r, o, u, c) {
    for (var f = -1, d = t(e((o - r) / (u || 1)), 0), h = Array(d); d--; )
      h[c ? d : ++f] = r, r += u;
    return h;
  }
  return qg = n, qg;
}
var kg, zj;
function yP() {
  if (zj) return kg;
  zj = 1;
  var e = JC(), t = 1 / 0, n = 17976931348623157e292;
  function r(o) {
    if (!o)
      return o === 0 ? o : 0;
    if (o = e(o), o === t || o === -t) {
      var u = o < 0 ? -1 : 1;
      return u * n;
    }
    return o === o ? o : 0;
  }
  return kg = r, kg;
}
var Bg, qj;
function OH() {
  if (qj) return Bg;
  qj = 1;
  var e = _H(), t = vd(), n = yP();
  function r(o) {
    return function(u, c, f) {
      return f && typeof f != "number" && t(u, c, f) && (c = f = void 0), u = n(u), c === void 0 ? (c = u, u = 0) : c = n(c), f = f === void 0 ? u < c ? 1 : -1 : n(f), e(u, c, f, o);
    };
  }
  return Bg = r, Bg;
}
var Lg, kj;
function wH() {
  if (kj) return Lg;
  kj = 1;
  var e = OH(), t = e();
  return Lg = t, Lg;
}
var AH = wH();
const Bf = /* @__PURE__ */ tt(AH);
function ic(e) {
  "@babel/helpers - typeof";
  return ic = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ic(e);
}
function Bj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Lj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bj(Object(n), !0).forEach(function(r) {
      mP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Bj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mP(e, t, n) {
  return t = TH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function TH(e) {
  var t = EH(e, "string");
  return ic(t) == "symbol" ? t : t + "";
}
function EH(e, t) {
  if (ic(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ic(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var jH = ["Webkit", "Moz", "O", "ms"], MH = function(t, n) {
  var r = t.replace(/(\w)/, function(u) {
    return u.toUpperCase();
  }), o = jH.reduce(function(u, c) {
    return Lj(Lj({}, u), {}, mP({}, c + r, n));
  }, {});
  return o[t] = n, o;
};
function Bo(e) {
  "@babel/helpers - typeof";
  return Bo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bo(e);
}
function Lf() {
  return Lf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Lf.apply(this, arguments);
}
function Uj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ug(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Uj(Object(n), !0).forEach(function(r) {
      bn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Uj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function CH(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Ij(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, bP(r.key), r);
  }
}
function DH(e, t, n) {
  return t && Ij(e.prototype, t), n && Ij(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function PH(e, t, n) {
  return t = Uf(t), NH(e, gP() ? Reflect.construct(t, n || [], Uf(e).constructor) : t.apply(e, n));
}
function NH(e, t) {
  if (t && (Bo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return RH(e);
}
function RH(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function gP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (gP = function() {
    return !!e;
  })();
}
function Uf(e) {
  return Uf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Uf(e);
}
function $H(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && o0(e, t);
}
function o0(e, t) {
  return o0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, o0(e, t);
}
function bn(e, t, n) {
  return t = bP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function bP(e) {
  var t = zH(e, "string");
  return Bo(t) == "symbol" ? t : t + "";
}
function zH(e, t) {
  if (Bo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Bo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var qH = function(t) {
  var n = t.data, r = t.startIndex, o = t.endIndex, u = t.x, c = t.width, f = t.travellerWidth;
  if (!n || !n.length)
    return {};
  var d = n.length, h = xu().domain(Bf(0, d)).range([u, u + c - f]), y = h.domain().map(function(v) {
    return h(v);
  });
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: h(r),
    endX: h(o),
    scale: h,
    scaleValues: y
  };
}, Hj = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, Lo = /* @__PURE__ */ (function(e) {
  function t(n) {
    var r;
    return CH(this, t), r = PH(this, t, [n]), bn(r, "handleDrag", function(o) {
      r.leaveTimer && (clearTimeout(r.leaveTimer), r.leaveTimer = null), r.state.isTravellerMoving ? r.handleTravellerMove(o) : r.state.isSlideMoving && r.handleSlideDrag(o);
    }), bn(r, "handleTouchMove", function(o) {
      o.changedTouches != null && o.changedTouches.length > 0 && r.handleDrag(o.changedTouches[0]);
    }), bn(r, "handleDragEnd", function() {
      r.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var o = r.props, u = o.endIndex, c = o.onDragEnd, f = o.startIndex;
        c == null || c({
          endIndex: u,
          startIndex: f
        });
      }), r.detachDragEndListener();
    }), bn(r, "handleLeaveWrapper", function() {
      (r.state.isTravellerMoving || r.state.isSlideMoving) && (r.leaveTimer = window.setTimeout(r.handleDragEnd, r.props.leaveTimeOut));
    }), bn(r, "handleEnterSlideOrTraveller", function() {
      r.setState({
        isTextActive: !0
      });
    }), bn(r, "handleLeaveSlideOrTraveller", function() {
      r.setState({
        isTextActive: !1
      });
    }), bn(r, "handleSlideDragStart", function(o) {
      var u = Hj(o) ? o.changedTouches[0] : o;
      r.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: u.pageX
      }), r.attachDragEndListener();
    }), r.travellerDragStartHandlers = {
      startX: r.handleTravellerDragStart.bind(r, "startX"),
      endX: r.handleTravellerDragStart.bind(r, "endX")
    }, r.state = {}, r;
  }
  return $H(t, e), DH(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(r) {
      var o = r.startX, u = r.endX, c = this.state.scaleValues, f = this.props, d = f.gap, h = f.data, y = h.length - 1, v = Math.min(o, u), g = Math.max(o, u), b = t.getIndexInRange(c, v), _ = t.getIndexInRange(c, g);
      return {
        startIndex: b - b % d,
        endIndex: _ === y ? y : _ - _ % d
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(r) {
      var o = this.props, u = o.data, c = o.tickFormatter, f = o.dataKey, d = At(u[r], f, r);
      return Ee(c) ? c(d, r) : d;
    }
  }, {
    key: "attachDragEndListener",
    value: function() {
      window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "detachDragEndListener",
    value: function() {
      window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "handleSlideDrag",
    value: function(r) {
      var o = this.state, u = o.slideMoveStartX, c = o.startX, f = o.endX, d = this.props, h = d.x, y = d.width, v = d.travellerWidth, g = d.startIndex, b = d.endIndex, _ = d.onChange, S = r.pageX - u;
      S > 0 ? S = Math.min(S, h + y - v - f, h + y - v - c) : S < 0 && (S = Math.max(S, h - c, h - f));
      var x = this.getIndex({
        startX: c + S,
        endX: f + S
      });
      (x.startIndex !== g || x.endIndex !== b) && _ && _(x), this.setState({
        startX: c + S,
        endX: f + S,
        slideMoveStartX: r.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(r, o) {
      var u = Hj(o) ? o.changedTouches[0] : o;
      this.setState({
        isSlideMoving: !1,
        isTravellerMoving: !0,
        movingTravellerId: r,
        brushMoveStartX: u.pageX
      }), this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function(r) {
      var o = this.state, u = o.brushMoveStartX, c = o.movingTravellerId, f = o.endX, d = o.startX, h = this.state[c], y = this.props, v = y.x, g = y.width, b = y.travellerWidth, _ = y.onChange, S = y.gap, x = y.data, A = {
        startX: this.state.startX,
        endX: this.state.endX
      }, E = r.pageX - u;
      E > 0 ? E = Math.min(E, v + g - b - h) : E < 0 && (E = Math.max(E, v - h)), A[c] = h + E;
      var M = this.getIndex(A), C = M.startIndex, w = M.endIndex, T = function() {
        var N = x.length - 1;
        return c === "startX" && (f > d ? C % S === 0 : w % S === 0) || f < d && w === N || c === "endX" && (f > d ? w % S === 0 : C % S === 0) || f > d && w === N;
      };
      this.setState(bn(bn({}, c, h + E), "brushMoveStartX", r.pageX), function() {
        _ && T() && _(M);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(r, o) {
      var u = this, c = this.state, f = c.scaleValues, d = c.startX, h = c.endX, y = this.state[o], v = f.indexOf(y);
      if (v !== -1) {
        var g = v + r;
        if (!(g === -1 || g >= f.length)) {
          var b = f[g];
          o === "startX" && b >= h || o === "endX" && b <= d || this.setState(bn({}, o, b), function() {
            u.props.onChange(u.getIndex({
              startX: u.state.startX,
              endX: u.state.endX
            }));
          });
        }
      }
    }
  }, {
    key: "renderBackground",
    value: function() {
      var r = this.props, o = r.x, u = r.y, c = r.width, f = r.height, d = r.fill, h = r.stroke;
      return /* @__PURE__ */ U.createElement("rect", {
        stroke: h,
        fill: d,
        x: o,
        y: u,
        width: c,
        height: f
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var r = this.props, o = r.x, u = r.y, c = r.width, f = r.height, d = r.data, h = r.children, y = r.padding, v = J.Children.only(h);
      return v ? /* @__PURE__ */ U.cloneElement(v, {
        x: o,
        y: u,
        width: c,
        height: f,
        margin: y,
        compact: !0,
        data: d
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(r, o) {
      var u, c, f = this, d = this.props, h = d.y, y = d.travellerWidth, v = d.height, g = d.traveller, b = d.ariaLabel, _ = d.data, S = d.startIndex, x = d.endIndex, A = Math.max(r, this.props.x), E = Ug(Ug({}, Te(this.props, !1)), {}, {
        x: A,
        y: h,
        width: y,
        height: v
      }), M = b || "Min value: ".concat((u = _[S]) === null || u === void 0 ? void 0 : u.name, ", Max value: ").concat((c = _[x]) === null || c === void 0 ? void 0 : c.name);
      return /* @__PURE__ */ U.createElement(Ie, {
        tabIndex: 0,
        role: "slider",
        "aria-label": M,
        "aria-valuenow": r,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[o],
        onTouchStart: this.travellerDragStartHandlers[o],
        onKeyDown: function(w) {
          ["ArrowLeft", "ArrowRight"].includes(w.key) && (w.preventDefault(), w.stopPropagation(), f.handleTravellerMoveKeyboard(w.key === "ArrowRight" ? 1 : -1, o));
        },
        onFocus: function() {
          f.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          f.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, t.renderTraveller(g, E));
    }
  }, {
    key: "renderSlide",
    value: function(r, o) {
      var u = this.props, c = u.y, f = u.height, d = u.stroke, h = u.travellerWidth, y = Math.min(r, o) + h, v = Math.max(Math.abs(o - r) - h, 0);
      return /* @__PURE__ */ U.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: "move"
        },
        stroke: "none",
        fill: d,
        fillOpacity: 0.2,
        x: y,
        y: c,
        width: v,
        height: f
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var r = this.props, o = r.startIndex, u = r.endIndex, c = r.y, f = r.height, d = r.travellerWidth, h = r.stroke, y = this.state, v = y.startX, g = y.endX, b = 5, _ = {
        pointerEvents: "none",
        fill: h
      };
      return /* @__PURE__ */ U.createElement(Ie, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ U.createElement(pf, Lf({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(v, g) - b,
        y: c + f / 2
      }, _), this.getTextOfTick(o)), /* @__PURE__ */ U.createElement(pf, Lf({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(v, g) + d + b,
        y: c + f / 2
      }, _), this.getTextOfTick(u)));
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props, o = r.data, u = r.className, c = r.children, f = r.x, d = r.y, h = r.width, y = r.height, v = r.alwaysShowText, g = this.state, b = g.startX, _ = g.endX, S = g.isTextActive, x = g.isSlideMoving, A = g.isTravellerMoving, E = g.isTravellerFocused;
      if (!o || !o.length || !de(f) || !de(d) || !de(h) || !de(y) || h <= 0 || y <= 0)
        return null;
      var M = $e("recharts-brush", u), C = U.Children.count(c) === 1, w = MH("userSelect", "none");
      return /* @__PURE__ */ U.createElement(Ie, {
        className: M,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: w
      }, this.renderBackground(), C && this.renderPanorama(), this.renderSlide(b, _), this.renderTravellerLayer(b, "startX"), this.renderTravellerLayer(_, "endX"), (S || x || A || E || v) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(r) {
      var o = r.x, u = r.y, c = r.width, f = r.height, d = r.stroke, h = Math.floor(u + f / 2) - 1;
      return /* @__PURE__ */ U.createElement(U.Fragment, null, /* @__PURE__ */ U.createElement("rect", {
        x: o,
        y: u,
        width: c,
        height: f,
        fill: d,
        stroke: "none"
      }), /* @__PURE__ */ U.createElement("line", {
        x1: o + 1,
        y1: h,
        x2: o + c - 1,
        y2: h,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ U.createElement("line", {
        x1: o + 1,
        y1: h + 2,
        x2: o + c - 1,
        y2: h + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(r, o) {
      var u;
      return /* @__PURE__ */ U.isValidElement(r) ? u = /* @__PURE__ */ U.cloneElement(r, o) : Ee(r) ? u = r(o) : u = t.renderDefaultTraveller(o), u;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(r, o) {
      var u = r.data, c = r.width, f = r.x, d = r.travellerWidth, h = r.updateId, y = r.startIndex, v = r.endIndex;
      if (u !== o.prevData || h !== o.prevUpdateId)
        return Ug({
          prevData: u,
          prevTravellerWidth: d,
          prevUpdateId: h,
          prevX: f,
          prevWidth: c
        }, u && u.length ? qH({
          data: u,
          width: c,
          x: f,
          travellerWidth: d,
          startIndex: y,
          endIndex: v
        }) : {
          scale: null,
          scaleValues: null
        });
      if (o.scale && (c !== o.prevWidth || f !== o.prevX || d !== o.prevTravellerWidth)) {
        o.scale.range([f, f + c - d]);
        var g = o.scale.domain().map(function(b) {
          return o.scale(b);
        });
        return {
          prevData: u,
          prevTravellerWidth: d,
          prevUpdateId: h,
          prevX: f,
          prevWidth: c,
          startX: o.scale(r.startIndex),
          endX: o.scale(r.endIndex),
          scaleValues: g
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function(r, o) {
      for (var u = r.length, c = 0, f = u - 1; f - c > 1; ) {
        var d = Math.floor((c + f) / 2);
        r[d] > o ? f = d : c = d;
      }
      return o >= r[f] ? f : c;
    }
  }]);
})(J.PureComponent);
bn(Lo, "displayName", "Brush");
bn(Lo, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var Ig, Gj;
function kH() {
  if (Gj) return Ig;
  Gj = 1;
  var e = t1();
  function t(n, r) {
    var o;
    return e(n, function(u, c, f) {
      return o = r(u, c, f), !o;
    }), !!o;
  }
  return Ig = t, Ig;
}
var Hg, Yj;
function BH() {
  if (Yj) return Hg;
  Yj = 1;
  var e = CC(), t = Pa(), n = kH(), r = ln(), o = vd();
  function u(c, f, d) {
    var h = r(c) ? e : n;
    return d && o(c, f, d) && (f = void 0), h(c, t(f, 3));
  }
  return Hg = u, Hg;
}
var LH = BH();
const UH = /* @__PURE__ */ tt(LH);
var hr = function(t, n) {
  var r = t.alwaysShow, o = t.ifOverflow;
  return r && (o = "extendDomain"), o === n;
}, Gg, Kj;
function IH() {
  if (Kj) return Gg;
  Kj = 1;
  var e = VC();
  function t(n, r, o) {
    r == "__proto__" && e ? e(n, r, {
      configurable: !0,
      enumerable: !0,
      value: o,
      writable: !0
    }) : n[r] = o;
  }
  return Gg = t, Gg;
}
var Yg, Xj;
function HH() {
  if (Xj) return Yg;
  Xj = 1;
  var e = IH(), t = KC(), n = Pa();
  function r(o, u) {
    var c = {};
    return u = n(u, 3), t(o, function(f, d, h) {
      e(c, d, u(f, d, h));
    }), c;
  }
  return Yg = r, Yg;
}
var GH = HH();
const YH = /* @__PURE__ */ tt(GH);
var Kg, Vj;
function KH() {
  if (Vj) return Kg;
  Vj = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length; ++r < o; )
      if (!n(t[r], r, t))
        return !1;
    return !0;
  }
  return Kg = e, Kg;
}
var Xg, Fj;
function XH() {
  if (Fj) return Xg;
  Fj = 1;
  var e = t1();
  function t(n, r) {
    var o = !0;
    return e(n, function(u, c, f) {
      return o = !!r(u, c, f), o;
    }), o;
  }
  return Xg = t, Xg;
}
var Vg, Wj;
function VH() {
  if (Wj) return Vg;
  Wj = 1;
  var e = KH(), t = XH(), n = Pa(), r = ln(), o = vd();
  function u(c, f, d) {
    var h = r(c) ? e : t;
    return d && o(c, f, d) && (f = void 0), h(c, n(f, 3));
  }
  return Vg = u, Vg;
}
var FH = VH();
const xP = /* @__PURE__ */ tt(FH);
var WH = ["x", "y"];
function oc(e) {
  "@babel/helpers - typeof";
  return oc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oc(e);
}
function l0() {
  return l0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, l0.apply(this, arguments);
}
function Zj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function hu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zj(Object(n), !0).forEach(function(r) {
      ZH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Zj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ZH(e, t, n) {
  return t = QH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QH(e) {
  var t = JH(e, "string");
  return oc(t) == "symbol" ? t : t + "";
}
function JH(e, t) {
  if (oc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (oc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function e7(e, t) {
  if (e == null) return {};
  var n = t7(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function t7(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function n7(e, t) {
  var n = e.x, r = e.y, o = e7(e, WH), u = "".concat(n), c = parseInt(u, 10), f = "".concat(r), d = parseInt(f, 10), h = "".concat(t.height || o.height), y = parseInt(h, 10), v = "".concat(t.width || o.width), g = parseInt(v, 10);
  return hu(hu(hu(hu(hu({}, t), o), c ? {
    x: c
  } : {}), d ? {
    y: d
  } : {}), {}, {
    height: y,
    width: g,
    name: t.name,
    radius: t.radius
  });
}
function Qj(e) {
  return /* @__PURE__ */ U.createElement(i0, l0({
    shapeType: "rectangle",
    propTransformer: n7,
    activeClassName: "recharts-active-bar"
  }, e));
}
var r7 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(r, o) {
    if (typeof t == "number") return t;
    var u = de(r) || sz(r);
    return u ? t(r, o) : (u || yi(), n);
  };
}, a7 = ["value", "background"], SP;
function Uo(e) {
  "@babel/helpers - typeof";
  return Uo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Uo(e);
}
function i7(e, t) {
  if (e == null) return {};
  var n = o7(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function o7(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function If() {
  return If = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, If.apply(this, arguments);
}
function Jj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jj(Object(n), !0).forEach(function(r) {
      ja(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Jj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function l7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function eM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, OP(r.key), r);
  }
}
function u7(e, t, n) {
  return t && eM(e.prototype, t), n && eM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function c7(e, t, n) {
  return t = Hf(t), s7(e, _P() ? Reflect.construct(t, n || [], Hf(e).constructor) : t.apply(e, n));
}
function s7(e, t) {
  if (t && (Uo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return f7(e);
}
function f7(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _P() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_P = function() {
    return !!e;
  })();
}
function Hf(e) {
  return Hf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Hf(e);
}
function d7(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && u0(e, t);
}
function u0(e, t) {
  return u0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, u0(e, t);
}
function ja(e, t, n) {
  return t = OP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function OP(e) {
  var t = h7(e, "string");
  return Uo(t) == "symbol" ? t : t + "";
}
function h7(e, t) {
  if (Uo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Uo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Kr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    l7(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = c7(this, t, [].concat(o)), ja(n, "state", {
      isAnimationFinished: !1
    }), ja(n, "id", bi("recharts-bar-")), ja(n, "handleAnimationEnd", function() {
      var c = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), c && c();
    }), ja(n, "handleAnimationStart", function() {
      var c = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), c && c();
    }), n;
  }
  return d7(t, e), u7(t, [{
    key: "renderRectanglesStatically",
    value: function(r) {
      var o = this, u = this.props, c = u.shape, f = u.dataKey, d = u.activeIndex, h = u.activeBar, y = Te(this.props, !1);
      return r && r.map(function(v, g) {
        var b = g === d, _ = b ? h : c, S = bt(bt(bt({}, y), v), {}, {
          isActive: b,
          option: _,
          index: g,
          dataKey: f,
          onAnimationStart: o.handleAnimationStart,
          onAnimationEnd: o.handleAnimationEnd
        });
        return /* @__PURE__ */ U.createElement(Ie, If({
          className: "recharts-bar-rectangle"
        }, Mu(o.props, v, g), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(v == null ? void 0 : v.x, "-").concat(v == null ? void 0 : v.y, "-").concat(v == null ? void 0 : v.value, "-").concat(g)
        }), /* @__PURE__ */ U.createElement(Qj, S));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var r = this, o = this.props, u = o.data, c = o.layout, f = o.isAnimationActive, d = o.animationBegin, h = o.animationDuration, y = o.animationEasing, v = o.animationId, g = this.state.prevData;
      return /* @__PURE__ */ U.createElement(Zn, {
        begin: d,
        duration: h,
        isActive: f,
        easing: y,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(v),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(b) {
        var _ = b.t, S = u.map(function(x, A) {
          var E = g && g[A];
          if (E) {
            var M = pt(E.x, x.x), C = pt(E.y, x.y), w = pt(E.width, x.width), T = pt(E.height, x.height);
            return bt(bt({}, x), {}, {
              x: M(_),
              y: C(_),
              width: w(_),
              height: T(_)
            });
          }
          if (c === "horizontal") {
            var j = pt(0, x.height), N = j(_);
            return bt(bt({}, x), {}, {
              y: x.y + x.height - N,
              height: N
            });
          }
          var z = pt(0, x.width), k = z(_);
          return bt(bt({}, x), {}, {
            width: k
          });
        });
        return /* @__PURE__ */ U.createElement(Ie, null, r.renderRectanglesStatically(S));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var r = this.props, o = r.data, u = r.isAnimationActive, c = this.state.prevData;
      return u && o && o.length && (!c || !pi(c, o)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(o);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var r = this, o = this.props, u = o.data, c = o.dataKey, f = o.activeIndex, d = Te(this.props.background, !1);
      return u.map(function(h, y) {
        h.value;
        var v = h.background, g = i7(h, a7);
        if (!v)
          return null;
        var b = bt(bt(bt(bt(bt({}, g), {}, {
          fill: "#eee"
        }, v), d), Mu(r.props, h, y)), {}, {
          onAnimationStart: r.handleAnimationStart,
          onAnimationEnd: r.handleAnimationEnd,
          dataKey: c,
          index: y,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ U.createElement(Qj, If({
          key: "background-bar-".concat(y),
          option: r.props.background,
          isActive: y === f
        }, b));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(r, o) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var u = this.props, c = u.data, f = u.xAxis, d = u.yAxis, h = u.layout, y = u.children, v = on(y, cl);
      if (!v)
        return null;
      var g = h === "vertical" ? c[0].height / 2 : c[0].width / 2, b = function(x, A) {
        var E = Array.isArray(x.value) ? x.value[1] : x.value;
        return {
          x: x.x,
          y: x.y,
          value: E,
          errorVal: At(x, A)
        };
      }, _ = {
        clipPath: r ? "url(#clipPath-".concat(o, ")") : null
      };
      return /* @__PURE__ */ U.createElement(Ie, _, v.map(function(S) {
        return /* @__PURE__ */ U.cloneElement(S, {
          key: "error-bar-".concat(o, "-").concat(S.props.dataKey),
          data: c,
          xAxis: f,
          yAxis: d,
          layout: h,
          offset: g,
          dataPointFormatter: b
        });
      }));
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props, o = r.hide, u = r.data, c = r.className, f = r.xAxis, d = r.yAxis, h = r.left, y = r.top, v = r.width, g = r.height, b = r.isAnimationActive, _ = r.background, S = r.id;
      if (o || !u || !u.length)
        return null;
      var x = this.state.isAnimationFinished, A = $e("recharts-bar", c), E = f && f.allowDataOverflow, M = d && d.allowDataOverflow, C = E || M, w = we(S) ? this.id : S;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: A
      }, E || M ? /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-".concat(w)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: E ? h : h - v / 2,
        y: M ? y : y - g / 2,
        width: E ? v : v * 2,
        height: M ? g : g * 2
      }))) : null, /* @__PURE__ */ U.createElement(Ie, {
        className: "recharts-bar-rectangles",
        clipPath: C ? "url(#clipPath-".concat(w, ")") : null
      }, _ ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(C, w), (!b || x) && dr.renderCallByParent(this.props, u));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(r, o) {
      return r.animationId !== o.prevAnimationId ? {
        prevAnimationId: r.animationId,
        curData: r.data,
        prevData: o.curData
      } : r.data !== o.curData ? {
        curData: r.data
      } : null;
    }
  }]);
})(J.PureComponent);
SP = Kr;
ja(Kr, "displayName", "Bar");
ja(Kr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !Na.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
ja(Kr, "getComposedData", function(e) {
  var t = e.props, n = e.item, r = e.barPosition, o = e.bandSize, u = e.xAxis, c = e.yAxis, f = e.xAxisTicks, d = e.yAxisTicks, h = e.stackedData, y = e.dataStartIndex, v = e.displayedData, g = e.offset, b = ML(r, n);
  if (!b)
    return null;
  var _ = t.layout, S = n.type.defaultProps, x = S !== void 0 ? bt(bt({}, S), n.props) : n.props, A = x.dataKey, E = x.children, M = x.minPointSize, C = _ === "horizontal" ? c : u, w = h ? C.scale.domain() : null, T = qL({
    numericAxis: C
  }), j = on(E, yd), N = v.map(function(z, k) {
    var B, q, V, Y, F, $;
    h ? B = CL(h[y + k], w) : (B = At(z, A), Array.isArray(B) || (B = [T, B]));
    var K = r7(M, SP.defaultProps.minPointSize)(B[1], k);
    if (_ === "horizontal") {
      var ne, G = [c.scale(B[0]), c.scale(B[1])], ee = G[0], P = G[1];
      q = L2({
        axis: u,
        ticks: f,
        bandSize: o,
        offset: b.offset,
        entry: z,
        index: k
      }), V = (ne = P ?? ee) !== null && ne !== void 0 ? ne : void 0, Y = b.size;
      var I = ee - P;
      if (F = Number.isNaN(I) ? 0 : I, $ = {
        x: q,
        y: c.y,
        width: Y,
        height: c.height
      }, Math.abs(K) > 0 && Math.abs(F) < Math.abs(K)) {
        var re = Wn(F || K) * (Math.abs(K) - Math.abs(F));
        V -= re, F += re;
      }
    } else {
      var se = [u.scale(B[0]), u.scale(B[1])], pe = se[0], fe = se[1];
      if (q = pe, V = L2({
        axis: c,
        ticks: d,
        bandSize: o,
        offset: b.offset,
        entry: z,
        index: k
      }), Y = fe - pe, F = b.size, $ = {
        x: u.x,
        y: V,
        width: u.width,
        height: F
      }, Math.abs(K) > 0 && Math.abs(Y) < Math.abs(K)) {
        var _e = Wn(Y || K) * (Math.abs(K) - Math.abs(Y));
        Y += _e;
      }
    }
    return bt(bt(bt({}, z), {}, {
      x: q,
      y: V,
      width: Y,
      height: F,
      value: h ? B : B[1],
      payload: z,
      background: $
    }, j && j[k] && j[k].props), {}, {
      tooltipPayload: [iP(n, z)],
      tooltipPosition: {
        x: q + Y / 2,
        y: V + F / 2
      }
    });
  });
  return bt({
    data: N,
    layout: _
  }, g);
});
function lc(e) {
  "@babel/helpers - typeof";
  return lc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, lc(e);
}
function p7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function tM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, wP(r.key), r);
  }
}
function v7(e, t, n) {
  return t && tM(e.prototype, t), n && tM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Kn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nM(Object(n), !0).forEach(function(r) {
      Md(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : nM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Md(e, t, n) {
  return t = wP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function wP(e) {
  var t = y7(e, "string");
  return lc(t) == "symbol" ? t : t + "";
}
function y7(e, t) {
  if (lc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (lc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cd = function(t, n, r, o, u) {
  var c = t.width, f = t.height, d = t.layout, h = t.children, y = Object.keys(n), v = {
    left: r.left,
    leftMirror: r.left,
    right: c - r.right,
    rightMirror: c - r.right,
    top: r.top,
    topMirror: r.top,
    bottom: f - r.bottom,
    bottomMirror: f - r.bottom
  }, g = !!xn(h, Kr);
  return y.reduce(function(b, _) {
    var S = n[_], x = S.orientation, A = S.domain, E = S.padding, M = E === void 0 ? {} : E, C = S.mirror, w = S.reversed, T = "".concat(x).concat(C ? "Mirror" : ""), j, N, z, k, B;
    if (S.type === "number" && (S.padding === "gap" || S.padding === "no-gap")) {
      var q = A[1] - A[0], V = 1 / 0, Y = S.categoricalDomain.sort(pz);
      if (Y.forEach(function(se, pe) {
        pe > 0 && (V = Math.min((se || 0) - (Y[pe - 1] || 0), V));
      }), Number.isFinite(V)) {
        var F = V / q, $ = S.layout === "vertical" ? r.height : r.width;
        if (S.padding === "gap" && (j = F * $ / 2), S.padding === "no-gap") {
          var K = hi(t.barCategoryGap, F * $), ne = F * $ / 2;
          j = ne - K - (ne - K) / $ * K;
        }
      }
    }
    o === "xAxis" ? N = [r.left + (M.left || 0) + (j || 0), r.left + r.width - (M.right || 0) - (j || 0)] : o === "yAxis" ? N = d === "horizontal" ? [r.top + r.height - (M.bottom || 0), r.top + (M.top || 0)] : [r.top + (M.top || 0) + (j || 0), r.top + r.height - (M.bottom || 0) - (j || 0)] : N = S.range, w && (N = [N[1], N[0]]);
    var G = EL(S, u, g), ee = G.scale, P = G.realScaleType;
    ee.domain(A).range(N), jL(ee);
    var I = zL(ee, Kn(Kn({}, S), {}, {
      realScaleType: P
    }));
    o === "xAxis" ? (B = x === "top" && !C || x === "bottom" && C, z = r.left, k = v[T] - B * S.height) : o === "yAxis" && (B = x === "left" && !C || x === "right" && C, z = v[T] - B * S.width, k = r.top);
    var re = Kn(Kn(Kn({}, S), I), {}, {
      realScaleType: P,
      x: z,
      y: k,
      scale: ee,
      width: o === "xAxis" ? r.width : S.width,
      height: o === "yAxis" ? r.height : S.height
    });
    return re.bandSize = Mf(re, I), !S.hide && o === "xAxis" ? v[T] += (B ? -1 : 1) * re.height : S.hide || (v[T] += (B ? -1 : 1) * re.width), Kn(Kn({}, b), {}, Md({}, _, re));
  }, {});
}, AP = function(t, n) {
  var r = t.x, o = t.y, u = n.x, c = n.y;
  return {
    x: Math.min(r, u),
    y: Math.min(o, c),
    width: Math.abs(u - r),
    height: Math.abs(c - o)
  };
}, m7 = function(t) {
  var n = t.x1, r = t.y1, o = t.x2, u = t.y2;
  return AP({
    x: n,
    y: r
  }, {
    x: o,
    y: u
  });
}, TP = /* @__PURE__ */ (function() {
  function e(t) {
    p7(this, e), this.scale = t;
  }
  return v7(e, [{
    key: "domain",
    get: function() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function(n) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = r.bandAware, u = r.position;
      if (n !== void 0) {
        if (u)
          switch (u) {
            case "start":
              return this.scale(n);
            case "middle": {
              var c = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(n) + c;
            }
            case "end": {
              var f = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(n) + f;
            }
            default:
              return this.scale(n);
          }
        if (o) {
          var d = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(n) + d;
        }
        return this.scale(n);
      }
    }
  }, {
    key: "isInRange",
    value: function(n) {
      var r = this.range(), o = r[0], u = r[r.length - 1];
      return o <= u ? n >= o && n <= u : n >= u && n <= o;
    }
  }], [{
    key: "create",
    value: function(n) {
      return new e(n);
    }
  }]);
})();
Md(TP, "EPS", 1e-4);
var C1 = function(t) {
  var n = Object.keys(t).reduce(function(r, o) {
    return Kn(Kn({}, r), {}, Md({}, o, TP.create(t[o])));
  }, {});
  return Kn(Kn({}, n), {}, {
    apply: function(o) {
      var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = u.bandAware, f = u.position;
      return YH(o, function(d, h) {
        return n[h].apply(d, {
          bandAware: c,
          position: f
        });
      });
    },
    isInRange: function(o) {
      return xP(o, function(u, c) {
        return n[c].isInRange(u);
      });
    }
  });
};
function g7(e) {
  return (e % 180 + 180) % 180;
}
var b7 = function(t) {
  var n = t.width, r = t.height, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, u = g7(o), c = u * Math.PI / 180, f = Math.atan(r / n), d = c > f && c < Math.PI - f ? r / Math.sin(c) : n / Math.cos(c);
  return Math.abs(d);
}, Fg, rM;
function x7() {
  if (rM) return Fg;
  rM = 1;
  var e = Pa(), t = dc(), n = hd();
  function r(o) {
    return function(u, c, f) {
      var d = Object(u);
      if (!t(u)) {
        var h = e(c, 3);
        u = n(u), c = function(v) {
          return h(d[v], v, d);
        };
      }
      var y = o(u, c, f);
      return y > -1 ? d[h ? u[y] : y] : void 0;
    };
  }
  return Fg = r, Fg;
}
var Wg, aM;
function S7() {
  if (aM) return Wg;
  aM = 1;
  var e = yP();
  function t(n) {
    var r = e(n), o = r % 1;
    return r === r ? o ? r - o : r : 0;
  }
  return Wg = t, Wg;
}
var Zg, iM;
function _7() {
  if (iM) return Zg;
  iM = 1;
  var e = UC(), t = Pa(), n = S7(), r = Math.max;
  function o(u, c, f) {
    var d = u == null ? 0 : u.length;
    if (!d)
      return -1;
    var h = f == null ? 0 : n(f);
    return h < 0 && (h = r(d + h, 0)), e(u, t(c, 3), h);
  }
  return Zg = o, Zg;
}
var Qg, oM;
function O7() {
  if (oM) return Qg;
  oM = 1;
  var e = x7(), t = _7(), n = e(t);
  return Qg = n, Qg;
}
var w7 = O7();
const A7 = /* @__PURE__ */ tt(w7);
var T7 = nC();
const E7 = /* @__PURE__ */ tt(T7);
var j7 = E7(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
}), D1 = /* @__PURE__ */ J.createContext(void 0), P1 = /* @__PURE__ */ J.createContext(void 0), EP = /* @__PURE__ */ J.createContext(void 0), jP = /* @__PURE__ */ J.createContext({}), MP = /* @__PURE__ */ J.createContext(void 0), CP = /* @__PURE__ */ J.createContext(0), DP = /* @__PURE__ */ J.createContext(0), lM = function(t) {
  var n = t.state, r = n.xAxisMap, o = n.yAxisMap, u = n.offset, c = t.clipPathId, f = t.children, d = t.width, h = t.height, y = j7(u);
  return /* @__PURE__ */ U.createElement(D1.Provider, {
    value: r
  }, /* @__PURE__ */ U.createElement(P1.Provider, {
    value: o
  }, /* @__PURE__ */ U.createElement(jP.Provider, {
    value: u
  }, /* @__PURE__ */ U.createElement(EP.Provider, {
    value: y
  }, /* @__PURE__ */ U.createElement(MP.Provider, {
    value: c
  }, /* @__PURE__ */ U.createElement(CP.Provider, {
    value: h
  }, /* @__PURE__ */ U.createElement(DP.Provider, {
    value: d
  }, f)))))));
}, M7 = function() {
  return J.useContext(MP);
}, PP = function(t) {
  var n = J.useContext(D1);
  n == null && yi();
  var r = n[t];
  return r == null && yi(), r;
}, C7 = function() {
  var t = J.useContext(D1);
  return Ta(t);
}, D7 = function() {
  var t = J.useContext(P1), n = A7(t, function(r) {
    return xP(r.domain, Number.isFinite);
  });
  return n || Ta(t);
}, NP = function(t) {
  var n = J.useContext(P1);
  n == null && yi();
  var r = n[t];
  return r == null && yi(), r;
}, P7 = function() {
  var t = J.useContext(EP);
  return t;
}, N7 = function() {
  return J.useContext(jP);
}, N1 = function() {
  return J.useContext(DP);
}, R1 = function() {
  return J.useContext(CP);
};
function Io(e) {
  "@babel/helpers - typeof";
  return Io = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Io(e);
}
function R7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function $7(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, $P(r.key), r);
  }
}
function z7(e, t, n) {
  return t && $7(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function q7(e, t, n) {
  return t = Gf(t), k7(e, RP() ? Reflect.construct(t, n || [], Gf(e).constructor) : t.apply(e, n));
}
function k7(e, t) {
  if (t && (Io(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return B7(e);
}
function B7(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function RP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (RP = function() {
    return !!e;
  })();
}
function Gf(e) {
  return Gf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Gf(e);
}
function L7(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && c0(e, t);
}
function c0(e, t) {
  return c0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, c0(e, t);
}
function uM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function cM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uM(Object(n), !0).forEach(function(r) {
      $1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : uM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $1(e, t, n) {
  return t = $P(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $P(e) {
  var t = U7(e, "string");
  return Io(t) == "symbol" ? t : t + "";
}
function U7(e, t) {
  if (Io(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Io(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function I7(e, t) {
  return K7(e) || Y7(e, t) || G7(e, t) || H7();
}
function H7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function G7(e, t) {
  if (e) {
    if (typeof e == "string") return sM(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return sM(e, t);
  }
}
function sM(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Y7(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function K7(e) {
  if (Array.isArray(e)) return e;
}
function s0() {
  return s0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, s0.apply(this, arguments);
}
var X7 = function(t, n) {
  var r;
  return /* @__PURE__ */ U.isValidElement(t) ? r = /* @__PURE__ */ U.cloneElement(t, n) : Ee(t) ? r = t(n) : r = /* @__PURE__ */ U.createElement("line", s0({}, n, {
    className: "recharts-reference-line-line"
  })), r;
}, V7 = function(t, n, r, o, u, c, f, d, h) {
  var y = u.x, v = u.y, g = u.width, b = u.height;
  if (r) {
    var _ = h.y, S = t.y.apply(_, {
      position: c
    });
    if (hr(h, "discard") && !t.y.isInRange(S))
      return null;
    var x = [{
      x: y + g,
      y: S
    }, {
      x: y,
      y: S
    }];
    return d === "left" ? x.reverse() : x;
  }
  if (n) {
    var A = h.x, E = t.x.apply(A, {
      position: c
    });
    if (hr(h, "discard") && !t.x.isInRange(E))
      return null;
    var M = [{
      x: E,
      y: v + b
    }, {
      x: E,
      y: v
    }];
    return f === "top" ? M.reverse() : M;
  }
  if (o) {
    var C = h.segment, w = C.map(function(T) {
      return t.apply(T, {
        position: c
      });
    });
    return hr(h, "discard") && UH(w, function(T) {
      return !t.isInRange(T);
    }) ? null : w;
  }
  return null;
};
function F7(e) {
  var t = e.x, n = e.y, r = e.segment, o = e.xAxisId, u = e.yAxisId, c = e.shape, f = e.className, d = e.alwaysShow, h = M7(), y = PP(o), v = NP(u), g = P7();
  if (!h || !g)
    return null;
  Ur(d === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var b = C1({
    x: y.scale,
    y: v.scale
  }), _ = wt(t), S = wt(n), x = r && r.length === 2, A = V7(b, _, S, x, g, e.position, y.orientation, v.orientation, e);
  if (!A)
    return null;
  var E = I7(A, 2), M = E[0], C = M.x, w = M.y, T = E[1], j = T.x, N = T.y, z = hr(e, "hidden") ? "url(#".concat(h, ")") : void 0, k = cM(cM({
    clipPath: z
  }, Te(e, !0)), {}, {
    x1: C,
    y1: w,
    x2: j,
    y2: N
  });
  return /* @__PURE__ */ U.createElement(Ie, {
    className: $e("recharts-reference-line", f)
  }, X7(c, k), Gt.renderCallByParent(e, m7({
    x1: C,
    y1: w,
    x2: j,
    y2: N
  })));
}
var Dd = /* @__PURE__ */ (function(e) {
  function t() {
    return R7(this, t), q7(this, t, arguments);
  }
  return L7(t, e), z7(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ U.createElement(F7, this.props);
    }
  }]);
})(U.Component);
$1(Dd, "displayName", "ReferenceLine");
$1(Dd, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});
function f0() {
  return f0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, f0.apply(this, arguments);
}
function Ho(e) {
  "@babel/helpers - typeof";
  return Ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ho(e);
}
function fM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function dM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fM(Object(n), !0).forEach(function(r) {
      Pd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function W7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Z7(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, qP(r.key), r);
  }
}
function Q7(e, t, n) {
  return t && Z7(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function J7(e, t, n) {
  return t = Yf(t), eG(e, zP() ? Reflect.construct(t, n || [], Yf(e).constructor) : t.apply(e, n));
}
function eG(e, t) {
  if (t && (Ho(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return tG(e);
}
function tG(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function zP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (zP = function() {
    return !!e;
  })();
}
function Yf(e) {
  return Yf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Yf(e);
}
function nG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && d0(e, t);
}
function d0(e, t) {
  return d0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, d0(e, t);
}
function Pd(e, t, n) {
  return t = qP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function qP(e) {
  var t = rG(e, "string");
  return Ho(t) == "symbol" ? t : t + "";
}
function rG(e, t) {
  if (Ho(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ho(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var aG = function(t) {
  var n = t.x, r = t.y, o = t.xAxis, u = t.yAxis, c = C1({
    x: o.scale,
    y: u.scale
  }), f = c.apply({
    x: n,
    y: r
  }, {
    bandAware: !0
  });
  return hr(t, "discard") && !c.isInRange(f) ? null : f;
}, Nd = /* @__PURE__ */ (function(e) {
  function t() {
    return W7(this, t), J7(this, t, arguments);
  }
  return nG(t, e), Q7(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.x, u = r.y, c = r.r, f = r.alwaysShow, d = r.clipPathId, h = wt(o), y = wt(u);
      if (Ur(f === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !h || !y)
        return null;
      var v = aG(this.props);
      if (!v)
        return null;
      var g = v.x, b = v.y, _ = this.props, S = _.shape, x = _.className, A = hr(this.props, "hidden") ? "url(#".concat(d, ")") : void 0, E = dM(dM({
        clipPath: A
      }, Te(this.props, !0)), {}, {
        cx: g,
        cy: b
      });
      return /* @__PURE__ */ U.createElement(Ie, {
        className: $e("recharts-reference-dot", x)
      }, t.renderDot(S, E), Gt.renderCallByParent(this.props, {
        x: g - c,
        y: b - c,
        width: 2 * c,
        height: 2 * c
      }));
    }
  }]);
})(U.Component);
Pd(Nd, "displayName", "ReferenceDot");
Pd(Nd, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
Pd(Nd, "renderDot", function(e, t) {
  var n;
  return /* @__PURE__ */ U.isValidElement(e) ? n = /* @__PURE__ */ U.cloneElement(e, t) : Ee(e) ? n = e(t) : n = /* @__PURE__ */ U.createElement(Td, f0({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), n;
});
function h0() {
  return h0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, h0.apply(this, arguments);
}
function Go(e) {
  "@babel/helpers - typeof";
  return Go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Go(e);
}
function hM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function pM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hM(Object(n), !0).forEach(function(r) {
      Rd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function iG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oG(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, BP(r.key), r);
  }
}
function lG(e, t, n) {
  return t && oG(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function uG(e, t, n) {
  return t = Kf(t), cG(e, kP() ? Reflect.construct(t, n || [], Kf(e).constructor) : t.apply(e, n));
}
function cG(e, t) {
  if (t && (Go(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return sG(e);
}
function sG(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function kP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (kP = function() {
    return !!e;
  })();
}
function Kf(e) {
  return Kf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Kf(e);
}
function fG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && p0(e, t);
}
function p0(e, t) {
  return p0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, p0(e, t);
}
function Rd(e, t, n) {
  return t = BP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function BP(e) {
  var t = dG(e, "string");
  return Go(t) == "symbol" ? t : t + "";
}
function dG(e, t) {
  if (Go(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Go(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var hG = function(t, n, r, o, u) {
  var c = u.x1, f = u.x2, d = u.y1, h = u.y2, y = u.xAxis, v = u.yAxis;
  if (!y || !v) return null;
  var g = C1({
    x: y.scale,
    y: v.scale
  }), b = {
    x: t ? g.x.apply(c, {
      position: "start"
    }) : g.x.rangeMin,
    y: r ? g.y.apply(d, {
      position: "start"
    }) : g.y.rangeMin
  }, _ = {
    x: n ? g.x.apply(f, {
      position: "end"
    }) : g.x.rangeMax,
    y: o ? g.y.apply(h, {
      position: "end"
    }) : g.y.rangeMax
  };
  return hr(u, "discard") && (!g.isInRange(b) || !g.isInRange(_)) ? null : AP(b, _);
}, $d = /* @__PURE__ */ (function(e) {
  function t() {
    return iG(this, t), uG(this, t, arguments);
  }
  return fG(t, e), lG(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.x1, u = r.x2, c = r.y1, f = r.y2, d = r.className, h = r.alwaysShow, y = r.clipPathId;
      Ur(h === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var v = wt(o), g = wt(u), b = wt(c), _ = wt(f), S = this.props.shape;
      if (!v && !g && !b && !_ && !S)
        return null;
      var x = hG(v, g, b, _, this.props);
      if (!x && !S)
        return null;
      var A = hr(this.props, "hidden") ? "url(#".concat(y, ")") : void 0;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: $e("recharts-reference-area", d)
      }, t.renderRect(S, pM(pM({
        clipPath: A
      }, Te(this.props, !0)), x)), Gt.renderCallByParent(this.props, x));
    }
  }]);
})(U.Component);
Rd($d, "displayName", "ReferenceArea");
Rd($d, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1
});
Rd($d, "renderRect", function(e, t) {
  var n;
  return /* @__PURE__ */ U.isValidElement(e) ? n = /* @__PURE__ */ U.cloneElement(e, t) : Ee(e) ? n = e(t) : n = /* @__PURE__ */ U.createElement(M1, h0({}, t, {
    className: "recharts-reference-area-rect"
  })), n;
});
function LP(e, t, n) {
  if (t < 1)
    return [];
  if (t === 1 && n === void 0)
    return e;
  for (var r = [], o = 0; o < e.length; o += t)
    r.push(e[o]);
  return r;
}
function pG(e, t, n) {
  var r = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return b7(r, n);
}
function vG(e, t, n) {
  var r = n === "width", o = e.x, u = e.y, c = e.width, f = e.height;
  return t === 1 ? {
    start: r ? o : u,
    end: r ? o + c : u + f
  } : {
    start: r ? o + c : u + f,
    end: r ? o : u
  };
}
function Xf(e, t, n, r, o) {
  if (e * t < e * r || e * t > e * o)
    return !1;
  var u = n();
  return e * (t - e * u / 2 - r) >= 0 && e * (t + e * u / 2 - o) <= 0;
}
function yG(e, t) {
  return LP(e, t + 1);
}
function mG(e, t, n, r, o) {
  for (var u = (r || []).slice(), c = t.start, f = t.end, d = 0, h = 1, y = c, v = function() {
    var _ = r == null ? void 0 : r[d];
    if (_ === void 0)
      return {
        v: LP(r, h)
      };
    var S = d, x, A = function() {
      return x === void 0 && (x = n(_, S)), x;
    }, E = _.coordinate, M = d === 0 || Xf(e, E, A, y, f);
    M || (d = 0, y = c, h += 1), M && (y = E + e * (A() / 2 + o), d += h);
  }, g; h <= u.length; )
    if (g = v(), g) return g.v;
  return [];
}
function uc(e) {
  "@babel/helpers - typeof";
  return uc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, uc(e);
}
function vM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function It(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vM(Object(n), !0).forEach(function(r) {
      gG(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function gG(e, t, n) {
  return t = bG(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function bG(e) {
  var t = xG(e, "string");
  return uc(t) == "symbol" ? t : t + "";
}
function xG(e, t) {
  if (uc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (uc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function SG(e, t, n, r, o) {
  for (var u = (r || []).slice(), c = u.length, f = t.start, d = t.end, h = function(g) {
    var b = u[g], _, S = function() {
      return _ === void 0 && (_ = n(b, g)), _;
    };
    if (g === c - 1) {
      var x = e * (b.coordinate + e * S() / 2 - d);
      u[g] = b = It(It({}, b), {}, {
        tickCoord: x > 0 ? b.coordinate - x * e : b.coordinate
      });
    } else
      u[g] = b = It(It({}, b), {}, {
        tickCoord: b.coordinate
      });
    var A = Xf(e, b.tickCoord, S, f, d);
    A && (d = b.tickCoord - e * (S() / 2 + o), u[g] = It(It({}, b), {}, {
      isShow: !0
    }));
  }, y = c - 1; y >= 0; y--)
    h(y);
  return u;
}
function _G(e, t, n, r, o, u) {
  var c = (r || []).slice(), f = c.length, d = t.start, h = t.end;
  if (u) {
    var y = r[f - 1], v = n(y, f - 1), g = e * (y.coordinate + e * v / 2 - h);
    c[f - 1] = y = It(It({}, y), {}, {
      tickCoord: g > 0 ? y.coordinate - g * e : y.coordinate
    });
    var b = Xf(e, y.tickCoord, function() {
      return v;
    }, d, h);
    b && (h = y.tickCoord - e * (v / 2 + o), c[f - 1] = It(It({}, y), {}, {
      isShow: !0
    }));
  }
  for (var _ = u ? f - 1 : f, S = function(E) {
    var M = c[E], C, w = function() {
      return C === void 0 && (C = n(M, E)), C;
    };
    if (E === 0) {
      var T = e * (M.coordinate - e * w() / 2 - d);
      c[E] = M = It(It({}, M), {}, {
        tickCoord: T < 0 ? M.coordinate - T * e : M.coordinate
      });
    } else
      c[E] = M = It(It({}, M), {}, {
        tickCoord: M.coordinate
      });
    var j = Xf(e, M.tickCoord, w, d, h);
    j && (d = M.tickCoord + e * (w() / 2 + o), c[E] = It(It({}, M), {}, {
      isShow: !0
    }));
  }, x = 0; x < _; x++)
    S(x);
  return c;
}
function z1(e, t, n) {
  var r = e.tick, o = e.ticks, u = e.viewBox, c = e.minTickGap, f = e.orientation, d = e.interval, h = e.tickFormatter, y = e.unit, v = e.angle;
  if (!o || !o.length || !r)
    return [];
  if (de(d) || Na.isSsr)
    return yG(o, typeof d == "number" && de(d) ? d : 0);
  var g = [], b = f === "top" || f === "bottom" ? "width" : "height", _ = y && b === "width" ? bu(y, {
    fontSize: t,
    letterSpacing: n
  }) : {
    width: 0,
    height: 0
  }, S = function(M, C) {
    var w = Ee(h) ? h(M.value, C) : M.value;
    return b === "width" ? pG(bu(w, {
      fontSize: t,
      letterSpacing: n
    }), _, v) : bu(w, {
      fontSize: t,
      letterSpacing: n
    })[b];
  }, x = o.length >= 2 ? Wn(o[1].coordinate - o[0].coordinate) : 1, A = vG(u, x, b);
  return d === "equidistantPreserveStart" ? mG(x, A, S, o, c) : (d === "preserveStart" || d === "preserveStartEnd" ? g = _G(x, A, S, o, c, d === "preserveStartEnd") : g = SG(x, A, S, o, c), g.filter(function(E) {
    return E.isShow;
  }));
}
var OG = ["viewBox"], wG = ["viewBox"], AG = ["ticks"];
function Yo(e) {
  "@babel/helpers - typeof";
  return Yo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yo(e);
}
function So() {
  return So = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, So.apply(this, arguments);
}
function yM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function _t(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yM(Object(n), !0).forEach(function(r) {
      q1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Jg(e, t) {
  if (e == null) return {};
  var n = TG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function TG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function EG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function mM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, IP(r.key), r);
  }
}
function jG(e, t, n) {
  return t && mM(e.prototype, t), n && mM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function MG(e, t, n) {
  return t = Vf(t), CG(e, UP() ? Reflect.construct(t, n || [], Vf(e).constructor) : t.apply(e, n));
}
function CG(e, t) {
  if (t && (Yo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return DG(e);
}
function DG(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function UP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (UP = function() {
    return !!e;
  })();
}
function Vf(e) {
  return Vf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Vf(e);
}
function PG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && v0(e, t);
}
function v0(e, t) {
  return v0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, v0(e, t);
}
function q1(e, t, n) {
  return t = IP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function IP(e) {
  var t = NG(e, "string");
  return Yo(t) == "symbol" ? t : t + "";
}
function NG(e, t) {
  if (Yo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var sl = /* @__PURE__ */ (function(e) {
  function t(n) {
    var r;
    return EG(this, t), r = MG(this, t, [n]), r.state = {
      fontSize: "",
      letterSpacing: ""
    }, r;
  }
  return PG(t, e), jG(t, [{
    key: "shouldComponentUpdate",
    value: function(r, o) {
      var u = r.viewBox, c = Jg(r, OG), f = this.props, d = f.viewBox, h = Jg(f, wG);
      return !Oo(u, d) || !Oo(c, h) || !Oo(o, this.state);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var r = this.layerReference;
      if (r) {
        var o = r.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        o && this.setState({
          fontSize: window.getComputedStyle(o).fontSize,
          letterSpacing: window.getComputedStyle(o).letterSpacing
        });
      }
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
  }, {
    key: "getTickLineCoord",
    value: function(r) {
      var o = this.props, u = o.x, c = o.y, f = o.width, d = o.height, h = o.orientation, y = o.tickSize, v = o.mirror, g = o.tickMargin, b, _, S, x, A, E, M = v ? -1 : 1, C = r.tickSize || y, w = de(r.tickCoord) ? r.tickCoord : r.coordinate;
      switch (h) {
        case "top":
          b = _ = r.coordinate, x = c + +!v * d, S = x - M * C, E = S - M * g, A = w;
          break;
        case "left":
          S = x = r.coordinate, _ = u + +!v * f, b = _ - M * C, A = b - M * g, E = w;
          break;
        case "right":
          S = x = r.coordinate, _ = u + +v * f, b = _ + M * C, A = b + M * g, E = w;
          break;
        default:
          b = _ = r.coordinate, x = c + +v * d, S = x + M * C, E = S + M * g, A = w;
          break;
      }
      return {
        line: {
          x1: b,
          y1: S,
          x2: _,
          y2: x
        },
        tick: {
          x: A,
          y: E
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var r = this.props, o = r.orientation, u = r.mirror, c;
      switch (o) {
        case "left":
          c = u ? "start" : "end";
          break;
        case "right":
          c = u ? "end" : "start";
          break;
        default:
          c = "middle";
          break;
      }
      return c;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var r = this.props, o = r.orientation, u = r.mirror, c = "end";
      switch (o) {
        case "left":
        case "right":
          c = "middle";
          break;
        case "top":
          c = u ? "start" : "end";
          break;
        default:
          c = u ? "end" : "start";
          break;
      }
      return c;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var r = this.props, o = r.x, u = r.y, c = r.width, f = r.height, d = r.orientation, h = r.mirror, y = r.axisLine, v = _t(_t(_t({}, Te(this.props, !1)), Te(y, !1)), {}, {
        fill: "none"
      });
      if (d === "top" || d === "bottom") {
        var g = +(d === "top" && !h || d === "bottom" && h);
        v = _t(_t({}, v), {}, {
          x1: o,
          y1: u + g * f,
          x2: o + c,
          y2: u + g * f
        });
      } else {
        var b = +(d === "left" && !h || d === "right" && h);
        v = _t(_t({}, v), {}, {
          x1: o + b * c,
          y1: u,
          x2: o + b * c,
          y2: u + f
        });
      }
      return /* @__PURE__ */ U.createElement("line", So({}, v, {
        className: $e("recharts-cartesian-axis-line", Bn(y, "className"))
      }));
    }
  }, {
    key: "renderTicks",
    value: (
      /**
       * render the ticks
       * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
       * @param {string} fontSize Fontsize to consider for tick spacing
       * @param {string} letterSpacing Letterspacing to consider for tick spacing
       * @return {ReactComponent} renderedTicks
       */
      function(r, o, u) {
        var c = this, f = this.props, d = f.tickLine, h = f.stroke, y = f.tick, v = f.tickFormatter, g = f.unit, b = z1(_t(_t({}, this.props), {}, {
          ticks: r
        }), o, u), _ = this.getTickTextAnchor(), S = this.getTickVerticalAnchor(), x = Te(this.props, !1), A = Te(y, !1), E = _t(_t({}, x), {}, {
          fill: "none"
        }, Te(d, !1)), M = b.map(function(C, w) {
          var T = c.getTickLineCoord(C), j = T.line, N = T.tick, z = _t(_t(_t(_t({
            textAnchor: _,
            verticalAnchor: S
          }, x), {}, {
            stroke: "none",
            fill: h
          }, A), N), {}, {
            index: w,
            payload: C,
            visibleTicksCount: b.length,
            tickFormatter: v
          });
          return /* @__PURE__ */ U.createElement(Ie, So({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(C.value, "-").concat(C.coordinate, "-").concat(C.tickCoord)
          }, Mu(c.props, C, w)), d && /* @__PURE__ */ U.createElement("line", So({}, E, j, {
            className: $e("recharts-cartesian-axis-tick-line", Bn(d, "className"))
          })), y && t.renderTickItem(y, z, "".concat(Ee(v) ? v(C.value, w) : C.value).concat(g || "")));
        });
        return /* @__PURE__ */ U.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, M);
      }
    )
  }, {
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.axisLine, c = o.width, f = o.height, d = o.ticksGenerator, h = o.className, y = o.hide;
      if (y)
        return null;
      var v = this.props, g = v.ticks, b = Jg(v, AG), _ = g;
      return Ee(d) && (_ = g && g.length > 0 ? d(this.props) : d(b)), c <= 0 || f <= 0 || !_ || !_.length ? null : /* @__PURE__ */ U.createElement(Ie, {
        className: $e("recharts-cartesian-axis", h),
        ref: function(x) {
          r.layerReference = x;
        }
      }, u && this.renderAxisLine(), this.renderTicks(_, this.state.fontSize, this.state.letterSpacing), Gt.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(r, o, u) {
      var c, f = $e(o.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ U.isValidElement(r) ? c = /* @__PURE__ */ U.cloneElement(r, _t(_t({}, o), {}, {
        className: f
      })) : Ee(r) ? c = r(_t(_t({}, o), {}, {
        className: f
      })) : c = /* @__PURE__ */ U.createElement(pf, So({}, o, {
        className: "recharts-cartesian-axis-tick-value"
      }), u), c;
    }
  }]);
})(J.Component);
q1(sl, "displayName", "CartesianAxis");
q1(sl, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var RG = ["x1", "y1", "x2", "y2", "key"], $G = ["offset"];
function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mi(e);
}
function gM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gM(Object(n), !0).forEach(function(r) {
      zG(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function zG(e, t, n) {
  return t = qG(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function qG(e) {
  var t = kG(e, "string");
  return mi(t) == "symbol" ? t : t + "";
}
function kG(e, t) {
  if (mi(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (mi(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function li() {
  return li = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, li.apply(this, arguments);
}
function bM(e, t) {
  if (e == null) return {};
  var n = BG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function BG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var LG = function(t) {
  var n = t.fill;
  if (!n || n === "none")
    return null;
  var r = t.fillOpacity, o = t.x, u = t.y, c = t.width, f = t.height, d = t.ry;
  return /* @__PURE__ */ U.createElement("rect", {
    x: o,
    y: u,
    ry: d,
    width: c,
    height: f,
    stroke: "none",
    fill: n,
    fillOpacity: r,
    className: "recharts-cartesian-grid-bg"
  });
};
function HP(e, t) {
  var n;
  if (/* @__PURE__ */ U.isValidElement(e))
    n = /* @__PURE__ */ U.cloneElement(e, t);
  else if (Ee(e))
    n = e(t);
  else {
    var r = t.x1, o = t.y1, u = t.x2, c = t.y2, f = t.key, d = bM(t, RG), h = Te(d, !1);
    h.offset;
    var y = bM(h, $G);
    n = /* @__PURE__ */ U.createElement("line", li({}, y, {
      x1: r,
      y1: o,
      x2: u,
      y2: c,
      fill: "none",
      key: f
    }));
  }
  return n;
}
function UG(e) {
  var t = e.x, n = e.width, r = e.horizontal, o = r === void 0 ? !0 : r, u = e.horizontalPoints;
  if (!o || !u || !u.length)
    return null;
  var c = u.map(function(f, d) {
    var h = Yt(Yt({}, e), {}, {
      x1: t,
      y1: f,
      x2: t + n,
      y2: f,
      key: "line-".concat(d),
      index: d
    });
    return HP(o, h);
  });
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, c);
}
function IG(e) {
  var t = e.y, n = e.height, r = e.vertical, o = r === void 0 ? !0 : r, u = e.verticalPoints;
  if (!o || !u || !u.length)
    return null;
  var c = u.map(function(f, d) {
    var h = Yt(Yt({}, e), {}, {
      x1: f,
      y1: t,
      x2: f,
      y2: t + n,
      key: "line-".concat(d),
      index: d
    });
    return HP(o, h);
  });
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, c);
}
function HG(e) {
  var t = e.horizontalFill, n = e.fillOpacity, r = e.x, o = e.y, u = e.width, c = e.height, f = e.horizontalPoints, d = e.horizontal, h = d === void 0 ? !0 : d;
  if (!h || !t || !t.length)
    return null;
  var y = f.map(function(g) {
    return Math.round(g + o - o);
  }).sort(function(g, b) {
    return g - b;
  });
  o !== y[0] && y.unshift(0);
  var v = y.map(function(g, b) {
    var _ = !y[b + 1], S = _ ? o + c - g : y[b + 1] - g;
    if (S <= 0)
      return null;
    var x = b % t.length;
    return /* @__PURE__ */ U.createElement("rect", {
      key: "react-".concat(b),
      y: g,
      x: r,
      height: S,
      width: u,
      stroke: "none",
      fill: t[x],
      fillOpacity: n,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, v);
}
function GG(e) {
  var t = e.vertical, n = t === void 0 ? !0 : t, r = e.verticalFill, o = e.fillOpacity, u = e.x, c = e.y, f = e.width, d = e.height, h = e.verticalPoints;
  if (!n || !r || !r.length)
    return null;
  var y = h.map(function(g) {
    return Math.round(g + u - u);
  }).sort(function(g, b) {
    return g - b;
  });
  u !== y[0] && y.unshift(0);
  var v = y.map(function(g, b) {
    var _ = !y[b + 1], S = _ ? u + f - g : y[b + 1] - g;
    if (S <= 0)
      return null;
    var x = b % r.length;
    return /* @__PURE__ */ U.createElement("rect", {
      key: "react-".concat(b),
      x: g,
      y: c,
      width: S,
      height: d,
      stroke: "none",
      fill: r[x],
      fillOpacity: o,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, v);
}
var YG = function(t, n) {
  var r = t.xAxis, o = t.width, u = t.height, c = t.offset;
  return rP(z1(Yt(Yt(Yt({}, sl.defaultProps), r), {}, {
    ticks: kr(r, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: o,
      height: u
    }
  })), c.left, c.left + c.width, n);
}, KG = function(t, n) {
  var r = t.yAxis, o = t.width, u = t.height, c = t.offset;
  return rP(z1(Yt(Yt(Yt({}, sl.defaultProps), r), {}, {
    ticks: kr(r, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: o,
      height: u
    }
  })), c.top, c.top + c.height, n);
}, vo = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function gu(e) {
  var t, n, r, o, u, c, f = N1(), d = R1(), h = N7(), y = Yt(Yt({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : vo.stroke,
    fill: (n = e.fill) !== null && n !== void 0 ? n : vo.fill,
    horizontal: (r = e.horizontal) !== null && r !== void 0 ? r : vo.horizontal,
    horizontalFill: (o = e.horizontalFill) !== null && o !== void 0 ? o : vo.horizontalFill,
    vertical: (u = e.vertical) !== null && u !== void 0 ? u : vo.vertical,
    verticalFill: (c = e.verticalFill) !== null && c !== void 0 ? c : vo.verticalFill,
    x: de(e.x) ? e.x : h.left,
    y: de(e.y) ? e.y : h.top,
    width: de(e.width) ? e.width : h.width,
    height: de(e.height) ? e.height : h.height
  }), v = y.x, g = y.y, b = y.width, _ = y.height, S = y.syncWithTicks, x = y.horizontalValues, A = y.verticalValues, E = C7(), M = D7();
  if (!de(b) || b <= 0 || !de(_) || _ <= 0 || !de(v) || v !== +v || !de(g) || g !== +g)
    return null;
  var C = y.verticalCoordinatesGenerator || YG, w = y.horizontalCoordinatesGenerator || KG, T = y.horizontalPoints, j = y.verticalPoints;
  if ((!T || !T.length) && Ee(w)) {
    var N = x && x.length, z = w({
      yAxis: M ? Yt(Yt({}, M), {}, {
        ticks: N ? x : M.ticks
      }) : void 0,
      width: f,
      height: d,
      offset: h
    }, N ? !0 : S);
    Ur(Array.isArray(z), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(mi(z), "]")), Array.isArray(z) && (T = z);
  }
  if ((!j || !j.length) && Ee(C)) {
    var k = A && A.length, B = C({
      xAxis: E ? Yt(Yt({}, E), {}, {
        ticks: k ? A : E.ticks
      }) : void 0,
      width: f,
      height: d,
      offset: h
    }, k ? !0 : S);
    Ur(Array.isArray(B), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(mi(B), "]")), Array.isArray(B) && (j = B);
  }
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ U.createElement(LG, {
    fill: y.fill,
    fillOpacity: y.fillOpacity,
    x: y.x,
    y: y.y,
    width: y.width,
    height: y.height,
    ry: y.ry
  }), /* @__PURE__ */ U.createElement(UG, li({}, y, {
    offset: h,
    horizontalPoints: T,
    xAxis: E,
    yAxis: M
  })), /* @__PURE__ */ U.createElement(IG, li({}, y, {
    offset: h,
    verticalPoints: j,
    xAxis: E,
    yAxis: M
  })), /* @__PURE__ */ U.createElement(HG, li({}, y, {
    horizontalPoints: T
  })), /* @__PURE__ */ U.createElement(GG, li({}, y, {
    verticalPoints: j
  })));
}
gu.displayName = "CartesianGrid";
var XG = ["type", "layout", "connectNulls", "ref"], VG = ["key"];
function Ko(e) {
  "@babel/helpers - typeof";
  return Ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ko(e);
}
function xM(e, t) {
  if (e == null) return {};
  var n = FG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function FG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Ou() {
  return Ou = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ou.apply(this, arguments);
}
function SM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function gn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? SM(Object(n), !0).forEach(function(r) {
      Xn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : SM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function yo(e) {
  return JG(e) || QG(e) || ZG(e) || WG();
}
function WG() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ZG(e, t) {
  if (e) {
    if (typeof e == "string") return y0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return y0(e, t);
  }
}
function QG(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function JG(e) {
  if (Array.isArray(e)) return y0(e);
}
function y0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function eY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _M(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, YP(r.key), r);
  }
}
function tY(e, t, n) {
  return t && _M(e.prototype, t), n && _M(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nY(e, t, n) {
  return t = Ff(t), rY(e, GP() ? Reflect.construct(t, n || [], Ff(e).constructor) : t.apply(e, n));
}
function rY(e, t) {
  if (t && (Ko(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return aY(e);
}
function aY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function GP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (GP = function() {
    return !!e;
  })();
}
function Ff(e) {
  return Ff = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ff(e);
}
function iY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && m0(e, t);
}
function m0(e, t) {
  return m0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, m0(e, t);
}
function Xn(e, t, n) {
  return t = YP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function YP(e) {
  var t = oY(e, "string");
  return Ko(t) == "symbol" ? t : t + "";
}
function oY(e, t) {
  if (Ko(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ko(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Br = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    eY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = nY(this, t, [].concat(o)), Xn(n, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Xn(n, "generateSimpleStrokeDasharray", function(c, f) {
      return "".concat(f, "px ").concat(c - f, "px");
    }), Xn(n, "getStrokeDasharray", function(c, f, d) {
      var h = d.reduce(function(A, E) {
        return A + E;
      });
      if (!h)
        return n.generateSimpleStrokeDasharray(f, c);
      for (var y = Math.floor(c / h), v = c % h, g = f - c, b = [], _ = 0, S = 0; _ < d.length; S += d[_], ++_)
        if (S + d[_] > v) {
          b = [].concat(yo(d.slice(0, _)), [v - S]);
          break;
        }
      var x = b.length % 2 === 0 ? [0, g] : [g];
      return [].concat(yo(t.repeat(d, y)), yo(b), x).map(function(A) {
        return "".concat(A, "px");
      }).join(", ");
    }), Xn(n, "id", bi("recharts-line-")), Xn(n, "pathRef", function(c) {
      n.mainCurve = c;
    }), Xn(n, "handleAnimationEnd", function() {
      n.setState({
        isAnimationFinished: !0
      }), n.props.onAnimationEnd && n.props.onAnimationEnd();
    }), Xn(n, "handleAnimationStart", function() {
      n.setState({
        isAnimationFinished: !1
      }), n.props.onAnimationStart && n.props.onAnimationStart();
    }), n;
  }
  return iY(t, e), tY(t, [{
    key: "componentDidMount",
    value: function() {
      if (this.props.isAnimationActive) {
        var r = this.getTotalLength();
        this.setState({
          totalLength: r
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      if (this.props.isAnimationActive) {
        var r = this.getTotalLength();
        r !== this.state.totalLength && this.setState({
          totalLength: r
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function() {
      var r = this.mainCurve;
      try {
        return r && r.getTotalLength && r.getTotalLength() || 0;
      } catch {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function(r, o) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var u = this.props, c = u.points, f = u.xAxis, d = u.yAxis, h = u.layout, y = u.children, v = on(y, cl);
      if (!v)
        return null;
      var g = function(S, x) {
        return {
          x: S.x,
          y: S.y,
          value: S.value,
          errorVal: At(S.payload, x)
        };
      }, b = {
        clipPath: r ? "url(#clipPath-".concat(o, ")") : null
      };
      return /* @__PURE__ */ U.createElement(Ie, b, v.map(function(_) {
        return /* @__PURE__ */ U.cloneElement(_, {
          key: "bar-".concat(_.props.dataKey),
          data: c,
          xAxis: f,
          yAxis: d,
          layout: h,
          dataPointFormatter: g
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function(r, o, u) {
      var c = this.props.isAnimationActive;
      if (c && !this.state.isAnimationFinished)
        return null;
      var f = this.props, d = f.dot, h = f.points, y = f.dataKey, v = Te(this.props, !1), g = Te(d, !0), b = h.map(function(S, x) {
        var A = gn(gn(gn({
          key: "dot-".concat(x),
          r: 3
        }, v), g), {}, {
          index: x,
          cx: S.x,
          cy: S.y,
          value: S.value,
          dataKey: y,
          payload: S.payload,
          points: h
        });
        return t.renderDotItem(d, A);
      }), _ = {
        clipPath: r ? "url(#clipPath-".concat(o ? "" : "dots-").concat(u, ")") : null
      };
      return /* @__PURE__ */ U.createElement(Ie, Ou({
        className: "recharts-line-dots",
        key: "dots"
      }, _), b);
    }
  }, {
    key: "renderCurveStatically",
    value: function(r, o, u, c) {
      var f = this.props, d = f.type, h = f.layout, y = f.connectNulls;
      f.ref;
      var v = xM(f, XG), g = gn(gn(gn({}, Te(v, !0)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: o ? "url(#clipPath-".concat(u, ")") : null,
        points: r
      }, c), {}, {
        type: d,
        layout: h,
        connectNulls: y
      });
      return /* @__PURE__ */ U.createElement(fi, Ou({}, g, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(r, o) {
      var u = this, c = this.props, f = c.points, d = c.strokeDasharray, h = c.isAnimationActive, y = c.animationBegin, v = c.animationDuration, g = c.animationEasing, b = c.animationId, _ = c.animateNewValues, S = c.width, x = c.height, A = this.state, E = A.prevPoints, M = A.totalLength;
      return /* @__PURE__ */ U.createElement(Zn, {
        begin: y,
        duration: v,
        isActive: h,
        easing: g,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(b),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(C) {
        var w = C.t;
        if (E) {
          var T = E.length / f.length, j = f.map(function(q, V) {
            var Y = Math.floor(V * T);
            if (E[Y]) {
              var F = E[Y], $ = pt(F.x, q.x), K = pt(F.y, q.y);
              return gn(gn({}, q), {}, {
                x: $(w),
                y: K(w)
              });
            }
            if (_) {
              var ne = pt(S * 2, q.x), G = pt(x / 2, q.y);
              return gn(gn({}, q), {}, {
                x: ne(w),
                y: G(w)
              });
            }
            return gn(gn({}, q), {}, {
              x: q.x,
              y: q.y
            });
          });
          return u.renderCurveStatically(j, r, o);
        }
        var N = pt(0, M), z = N(w), k;
        if (d) {
          var B = "".concat(d).split(/[,\s]+/gim).map(function(q) {
            return parseFloat(q);
          });
          k = u.getStrokeDasharray(z, M, B);
        } else
          k = u.generateSimpleStrokeDasharray(M, z);
        return u.renderCurveStatically(f, r, o, {
          strokeDasharray: k
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function(r, o) {
      var u = this.props, c = u.points, f = u.isAnimationActive, d = this.state, h = d.prevPoints, y = d.totalLength;
      return f && c && c.length && (!h && y > 0 || !pi(h, c)) ? this.renderCurveWithAnimation(r, o) : this.renderCurveStatically(c, r, o);
    }
  }, {
    key: "render",
    value: function() {
      var r, o = this.props, u = o.hide, c = o.dot, f = o.points, d = o.className, h = o.xAxis, y = o.yAxis, v = o.top, g = o.left, b = o.width, _ = o.height, S = o.isAnimationActive, x = o.id;
      if (u || !f || !f.length)
        return null;
      var A = this.state.isAnimationFinished, E = f.length === 1, M = $e("recharts-line", d), C = h && h.allowDataOverflow, w = y && y.allowDataOverflow, T = C || w, j = we(x) ? this.id : x, N = (r = Te(c, !1)) !== null && r !== void 0 ? r : {
        r: 3,
        strokeWidth: 2
      }, z = N.r, k = z === void 0 ? 3 : z, B = N.strokeWidth, q = B === void 0 ? 2 : B, V = lC(c) ? c : {}, Y = V.clipDot, F = Y === void 0 ? !0 : Y, $ = k * 2 + q;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: M
      }, C || w ? /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-".concat(j)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: C ? g : g - b / 2,
        y: w ? v : v - _ / 2,
        width: C ? b : b * 2,
        height: w ? _ : _ * 2
      })), !F && /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-dots-".concat(j)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: g - $ / 2,
        y: v - $ / 2,
        width: b + $,
        height: _ + $
      }))) : null, !E && this.renderCurve(T, j), this.renderErrorBar(T, j), (E || c) && this.renderDots(T, F, j), (!S || A) && dr.renderCallByParent(this.props, f));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(r, o) {
      return r.animationId !== o.prevAnimationId ? {
        prevAnimationId: r.animationId,
        curPoints: r.points,
        prevPoints: o.curPoints
      } : r.points !== o.curPoints ? {
        curPoints: r.points
      } : null;
    }
  }, {
    key: "repeat",
    value: function(r, o) {
      for (var u = r.length % 2 !== 0 ? [].concat(yo(r), [0]) : r, c = [], f = 0; f < o; ++f)
        c = [].concat(yo(c), yo(u));
      return c;
    }
  }, {
    key: "renderDotItem",
    value: function(r, o) {
      var u;
      if (/* @__PURE__ */ U.isValidElement(r))
        u = /* @__PURE__ */ U.cloneElement(r, o);
      else if (Ee(r))
        u = r(o);
      else {
        var c = o.key, f = xM(o, VG), d = $e("recharts-line-dot", typeof r != "boolean" ? r.className : "");
        u = /* @__PURE__ */ U.createElement(Td, Ou({
          key: c
        }, f, {
          className: d
        }));
      }
      return u;
    }
  }]);
})(J.PureComponent);
Xn(Br, "displayName", "Line");
Xn(Br, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: !1,
  activeDot: !0,
  dot: !0,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Na.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
Xn(Br, "getComposedData", function(e) {
  var t = e.props, n = e.xAxis, r = e.yAxis, o = e.xAxisTicks, u = e.yAxisTicks, c = e.dataKey, f = e.bandSize, d = e.displayedData, h = e.offset, y = t.layout, v = d.map(function(g, b) {
    var _ = At(g, c);
    return y === "horizontal" ? {
      x: qo({
        axis: n,
        ticks: o,
        bandSize: f,
        entry: g,
        index: b
      }),
      y: we(_) ? null : r.scale(_),
      value: _,
      payload: g
    } : {
      x: we(_) ? null : n.scale(_),
      y: qo({
        axis: r,
        ticks: u,
        bandSize: f,
        entry: g,
        index: b
      }),
      value: _,
      payload: g
    };
  });
  return gn({
    points: v,
    layout: y
  }, h);
});
var lY = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], uY = ["key"], KP;
function Xo(e) {
  "@babel/helpers - typeof";
  return Xo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xo(e);
}
function XP(e, t) {
  if (e == null) return {};
  var n = cY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function cY(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function ui() {
  return ui = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ui.apply(this, arguments);
}
function OM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function wa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? OM(Object(n), !0).forEach(function(r) {
      ur(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : OM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, FP(r.key), r);
  }
}
function fY(e, t, n) {
  return t && wM(e.prototype, t), n && wM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dY(e, t, n) {
  return t = Wf(t), hY(e, VP() ? Reflect.construct(t, n || [], Wf(e).constructor) : t.apply(e, n));
}
function hY(e, t) {
  if (t && (Xo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return pY(e);
}
function pY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function VP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (VP = function() {
    return !!e;
  })();
}
function Wf(e) {
  return Wf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Wf(e);
}
function vY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && g0(e, t);
}
function g0(e, t) {
  return g0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, g0(e, t);
}
function ur(e, t, n) {
  return t = FP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function FP(e) {
  var t = yY(e, "string");
  return Xo(t) == "symbol" ? t : t + "";
}
function yY(e, t) {
  if (Xo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Wr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    sY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = dY(this, t, [].concat(o)), ur(n, "state", {
      isAnimationFinished: !0
    }), ur(n, "id", bi("recharts-area-")), ur(n, "handleAnimationEnd", function() {
      var c = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), Ee(c) && c();
    }), ur(n, "handleAnimationStart", function() {
      var c = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), Ee(c) && c();
    }), n;
  }
  return vY(t, e), fY(t, [{
    key: "renderDots",
    value: function(r, o, u) {
      var c = this.props.isAnimationActive, f = this.state.isAnimationFinished;
      if (c && !f)
        return null;
      var d = this.props, h = d.dot, y = d.points, v = d.dataKey, g = Te(this.props, !1), b = Te(h, !0), _ = y.map(function(x, A) {
        var E = wa(wa(wa({
          key: "dot-".concat(A),
          r: 3
        }, g), b), {}, {
          index: A,
          cx: x.x,
          cy: x.y,
          dataKey: v,
          value: x.value,
          payload: x.payload,
          points: y
        });
        return t.renderDotItem(h, E);
      }), S = {
        clipPath: r ? "url(#clipPath-".concat(o ? "" : "dots-").concat(u, ")") : null
      };
      return /* @__PURE__ */ U.createElement(Ie, ui({
        className: "recharts-area-dots"
      }, S), _);
    }
  }, {
    key: "renderHorizontalRect",
    value: function(r) {
      var o = this.props, u = o.baseLine, c = o.points, f = o.strokeWidth, d = c[0].x, h = c[c.length - 1].x, y = r * Math.abs(d - h), v = Ea(c.map(function(g) {
        return g.y || 0;
      }));
      return de(u) && typeof u == "number" ? v = Math.max(u, v) : u && Array.isArray(u) && u.length && (v = Math.max(Ea(u.map(function(g) {
        return g.y || 0;
      })), v)), de(v) ? /* @__PURE__ */ U.createElement("rect", {
        x: d < h ? d : d - y,
        y: 0,
        width: y,
        height: Math.floor(v + (f ? parseInt("".concat(f), 10) : 1))
      }) : null;
    }
  }, {
    key: "renderVerticalRect",
    value: function(r) {
      var o = this.props, u = o.baseLine, c = o.points, f = o.strokeWidth, d = c[0].y, h = c[c.length - 1].y, y = r * Math.abs(d - h), v = Ea(c.map(function(g) {
        return g.x || 0;
      }));
      return de(u) && typeof u == "number" ? v = Math.max(u, v) : u && Array.isArray(u) && u.length && (v = Math.max(Ea(u.map(function(g) {
        return g.x || 0;
      })), v)), de(v) ? /* @__PURE__ */ U.createElement("rect", {
        x: 0,
        y: d < h ? d : d - y,
        width: v + (f ? parseInt("".concat(f), 10) : 1),
        height: Math.floor(y)
      }) : null;
    }
  }, {
    key: "renderClipRect",
    value: function(r) {
      var o = this.props.layout;
      return o === "vertical" ? this.renderVerticalRect(r) : this.renderHorizontalRect(r);
    }
  }, {
    key: "renderAreaStatically",
    value: function(r, o, u, c) {
      var f = this.props, d = f.layout, h = f.type, y = f.stroke, v = f.connectNulls, g = f.isRange;
      f.ref;
      var b = XP(f, lY);
      return /* @__PURE__ */ U.createElement(Ie, {
        clipPath: u ? "url(#clipPath-".concat(c, ")") : null
      }, /* @__PURE__ */ U.createElement(fi, ui({}, Te(b, !0), {
        points: r,
        connectNulls: v,
        type: h,
        baseLine: o,
        layout: d,
        stroke: "none",
        className: "recharts-area-area"
      })), y !== "none" && /* @__PURE__ */ U.createElement(fi, ui({}, Te(this.props, !1), {
        className: "recharts-area-curve",
        layout: d,
        type: h,
        connectNulls: v,
        fill: "none",
        points: r
      })), y !== "none" && g && /* @__PURE__ */ U.createElement(fi, ui({}, Te(this.props, !1), {
        className: "recharts-area-curve",
        layout: d,
        type: h,
        connectNulls: v,
        fill: "none",
        points: o
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function(r, o) {
      var u = this, c = this.props, f = c.points, d = c.baseLine, h = c.isAnimationActive, y = c.animationBegin, v = c.animationDuration, g = c.animationEasing, b = c.animationId, _ = this.state, S = _.prevPoints, x = _.prevBaseLine;
      return /* @__PURE__ */ U.createElement(Zn, {
        begin: y,
        duration: v,
        isActive: h,
        easing: g,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(b),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(A) {
        var E = A.t;
        if (S) {
          var M = S.length / f.length, C = f.map(function(N, z) {
            var k = Math.floor(z * M);
            if (S[k]) {
              var B = S[k], q = pt(B.x, N.x), V = pt(B.y, N.y);
              return wa(wa({}, N), {}, {
                x: q(E),
                y: V(E)
              });
            }
            return N;
          }), w;
          if (de(d) && typeof d == "number") {
            var T = pt(x, d);
            w = T(E);
          } else if (we(d) || al(d)) {
            var j = pt(x, 0);
            w = j(E);
          } else
            w = d.map(function(N, z) {
              var k = Math.floor(z * M);
              if (x[k]) {
                var B = x[k], q = pt(B.x, N.x), V = pt(B.y, N.y);
                return wa(wa({}, N), {}, {
                  x: q(E),
                  y: V(E)
                });
              }
              return N;
            });
          return u.renderAreaStatically(C, w, r, o);
        }
        return /* @__PURE__ */ U.createElement(Ie, null, /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
          id: "animationClipPath-".concat(o)
        }, u.renderClipRect(E))), /* @__PURE__ */ U.createElement(Ie, {
          clipPath: "url(#animationClipPath-".concat(o, ")")
        }, u.renderAreaStatically(f, d, r, o)));
      });
    }
  }, {
    key: "renderArea",
    value: function(r, o) {
      var u = this.props, c = u.points, f = u.baseLine, d = u.isAnimationActive, h = this.state, y = h.prevPoints, v = h.prevBaseLine, g = h.totalLength;
      return d && c && c.length && (!y && g > 0 || !pi(y, c) || !pi(v, f)) ? this.renderAreaWithAnimation(r, o) : this.renderAreaStatically(c, f, r, o);
    }
  }, {
    key: "render",
    value: function() {
      var r, o = this.props, u = o.hide, c = o.dot, f = o.points, d = o.className, h = o.top, y = o.left, v = o.xAxis, g = o.yAxis, b = o.width, _ = o.height, S = o.isAnimationActive, x = o.id;
      if (u || !f || !f.length)
        return null;
      var A = this.state.isAnimationFinished, E = f.length === 1, M = $e("recharts-area", d), C = v && v.allowDataOverflow, w = g && g.allowDataOverflow, T = C || w, j = we(x) ? this.id : x, N = (r = Te(c, !1)) !== null && r !== void 0 ? r : {
        r: 3,
        strokeWidth: 2
      }, z = N.r, k = z === void 0 ? 3 : z, B = N.strokeWidth, q = B === void 0 ? 2 : B, V = lC(c) ? c : {}, Y = V.clipDot, F = Y === void 0 ? !0 : Y, $ = k * 2 + q;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: M
      }, C || w ? /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-".concat(j)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: C ? y : y - b / 2,
        y: w ? h : h - _ / 2,
        width: C ? b : b * 2,
        height: w ? _ : _ * 2
      })), !F && /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-dots-".concat(j)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: y - $ / 2,
        y: h - $ / 2,
        width: b + $,
        height: _ + $
      }))) : null, E ? null : this.renderArea(T, j), (c || E) && this.renderDots(T, F, j), (!S || A) && dr.renderCallByParent(this.props, f));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(r, o) {
      return r.animationId !== o.prevAnimationId ? {
        prevAnimationId: r.animationId,
        curPoints: r.points,
        curBaseLine: r.baseLine,
        prevPoints: o.curPoints,
        prevBaseLine: o.curBaseLine
      } : r.points !== o.curPoints || r.baseLine !== o.curBaseLine ? {
        curPoints: r.points,
        curBaseLine: r.baseLine
      } : null;
    }
  }]);
})(J.PureComponent);
KP = Wr;
ur(Wr, "displayName", "Area");
ur(Wr, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: !1,
  // points of area
  points: [],
  dot: !1,
  activeDot: !0,
  hide: !1,
  isAnimationActive: !Na.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
ur(Wr, "getBaseValue", function(e, t, n, r) {
  var o = e.layout, u = e.baseValue, c = t.props.baseValue, f = c ?? u;
  if (de(f) && typeof f == "number")
    return f;
  var d = o === "horizontal" ? r : n, h = d.scale.domain();
  if (d.type === "number") {
    var y = Math.max(h[0], h[1]), v = Math.min(h[0], h[1]);
    return f === "dataMin" ? v : f === "dataMax" || y < 0 ? y : Math.max(Math.min(h[0], h[1]), 0);
  }
  return f === "dataMin" ? h[0] : f === "dataMax" ? h[1] : h[0];
});
ur(Wr, "getComposedData", function(e) {
  var t = e.props, n = e.item, r = e.xAxis, o = e.yAxis, u = e.xAxisTicks, c = e.yAxisTicks, f = e.bandSize, d = e.dataKey, h = e.stackedData, y = e.dataStartIndex, v = e.displayedData, g = e.offset, b = t.layout, _ = h && h.length, S = KP.getBaseValue(t, n, r, o), x = b === "horizontal", A = !1, E = v.map(function(C, w) {
    var T;
    _ ? T = h[y + w] : (T = At(C, d), Array.isArray(T) ? A = !0 : T = [S, T]);
    var j = T[1] == null || _ && At(C, d) == null;
    return x ? {
      x: qo({
        axis: r,
        ticks: u,
        bandSize: f,
        entry: C,
        index: w
      }),
      y: j ? null : o.scale(T[1]),
      value: T,
      payload: C
    } : {
      x: j ? null : r.scale(T[1]),
      y: qo({
        axis: o,
        ticks: c,
        bandSize: f,
        entry: C,
        index: w
      }),
      value: T,
      payload: C
    };
  }), M;
  return _ || A ? M = E.map(function(C) {
    var w = Array.isArray(C.value) ? C.value[0] : null;
    return x ? {
      x: C.x,
      y: w != null && C.y != null ? o.scale(w) : null
    } : {
      x: w != null ? r.scale(w) : null,
      y: C.y
    };
  }) : M = x ? o.scale(S) : r.scale(S), wa({
    points: E,
    baseLine: M,
    layout: b,
    isRange: A
  }, g);
});
ur(Wr, "renderDotItem", function(e, t) {
  var n;
  if (/* @__PURE__ */ U.isValidElement(e))
    n = /* @__PURE__ */ U.cloneElement(e, t);
  else if (Ee(e))
    n = e(t);
  else {
    var r = $e("recharts-area-dot", typeof e != "boolean" ? e.className : ""), o = t.key, u = XP(t, uY);
    n = /* @__PURE__ */ U.createElement(Td, ui({}, u, {
      key: o,
      className: r
    }));
  }
  return n;
});
function Vo(e) {
  "@babel/helpers - typeof";
  return Vo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vo(e);
}
function mY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, QP(r.key), r);
  }
}
function bY(e, t, n) {
  return t && gY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function xY(e, t, n) {
  return t = Zf(t), SY(e, WP() ? Reflect.construct(t, n || [], Zf(e).constructor) : t.apply(e, n));
}
function SY(e, t) {
  if (t && (Vo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _Y(e);
}
function _Y(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function WP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (WP = function() {
    return !!e;
  })();
}
function Zf(e) {
  return Zf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Zf(e);
}
function OY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && b0(e, t);
}
function b0(e, t) {
  return b0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, b0(e, t);
}
function ZP(e, t, n) {
  return t = QP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QP(e) {
  var t = wY(e, "string");
  return Vo(t) == "symbol" ? t : t + "";
}
function wY(e, t) {
  if (Vo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Vo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var zd = /* @__PURE__ */ (function(e) {
  function t() {
    return mY(this, t), xY(this, t, arguments);
  }
  return OY(t, e), bY(t, [{
    key: "render",
    value: function() {
      return null;
    }
  }]);
})(J.Component);
ZP(zd, "displayName", "ZAxis");
ZP(zd, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var AY = ["option", "isActive"];
function wu() {
  return wu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, wu.apply(this, arguments);
}
function TY(e, t) {
  if (e == null) return {};
  var n = EY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function EY(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function jY(e) {
  var t = e.option, n = e.isActive, r = TY(e, AY);
  return typeof t == "string" ? /* @__PURE__ */ J.createElement(i0, wu({
    option: /* @__PURE__ */ J.createElement(dd, wu({
      type: t
    }, r)),
    isActive: n,
    shapeType: "symbols"
  }, r)) : /* @__PURE__ */ J.createElement(i0, wu({
    option: t,
    isActive: n,
    shapeType: "symbols"
  }, r));
}
function Fo(e) {
  "@babel/helpers - typeof";
  return Fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fo(e);
}
function Au() {
  return Au = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Au.apply(this, arguments);
}
function AM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function qn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? AM(Object(n), !0).forEach(function(r) {
      Ma(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : AM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function MY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function TM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, eN(r.key), r);
  }
}
function CY(e, t, n) {
  return t && TM(e.prototype, t), n && TM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function DY(e, t, n) {
  return t = Qf(t), PY(e, JP() ? Reflect.construct(t, n || [], Qf(e).constructor) : t.apply(e, n));
}
function PY(e, t) {
  if (t && (Fo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return NY(e);
}
function NY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function JP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (JP = function() {
    return !!e;
  })();
}
function Qf(e) {
  return Qf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Qf(e);
}
function RY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && x0(e, t);
}
function x0(e, t) {
  return x0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, x0(e, t);
}
function Ma(e, t, n) {
  return t = eN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function eN(e) {
  var t = $Y(e, "string");
  return Fo(t) == "symbol" ? t : t + "";
}
function $Y(e, t) {
  if (Fo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Fo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var qd = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    MY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = DY(this, t, [].concat(o)), Ma(n, "state", {
      isAnimationFinished: !1
    }), Ma(n, "handleAnimationEnd", function() {
      n.setState({
        isAnimationFinished: !0
      });
    }), Ma(n, "handleAnimationStart", function() {
      n.setState({
        isAnimationFinished: !1
      });
    }), Ma(n, "id", bi("recharts-scatter-")), n;
  }
  return RY(t, e), CY(t, [{
    key: "renderSymbolsStatically",
    value: function(r) {
      var o = this, u = this.props, c = u.shape, f = u.activeShape, d = u.activeIndex, h = Te(this.props, !1);
      return r.map(function(y, v) {
        var g = d === v, b = g ? f : c, _ = qn(qn({}, h), y);
        return /* @__PURE__ */ U.createElement(Ie, Au({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(y == null ? void 0 : y.cx, "-").concat(y == null ? void 0 : y.cy, "-").concat(y == null ? void 0 : y.size, "-").concat(v)
        }, Mu(o.props, y, v), {
          role: "img"
        }), /* @__PURE__ */ U.createElement(jY, Au({
          option: b,
          isActive: g,
          key: "symbol-".concat(v)
        }, _)));
      });
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function() {
      var r = this, o = this.props, u = o.points, c = o.isAnimationActive, f = o.animationBegin, d = o.animationDuration, h = o.animationEasing, y = o.animationId, v = this.state.prevPoints;
      return /* @__PURE__ */ U.createElement(Zn, {
        begin: f,
        duration: d,
        isActive: c,
        easing: h,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(y),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(g) {
        var b = g.t, _ = u.map(function(S, x) {
          var A = v && v[x];
          if (A) {
            var E = pt(A.cx, S.cx), M = pt(A.cy, S.cy), C = pt(A.size, S.size);
            return qn(qn({}, S), {}, {
              cx: E(b),
              cy: M(b),
              size: C(b)
            });
          }
          var w = pt(0, S.size);
          return qn(qn({}, S), {}, {
            size: w(b)
          });
        });
        return /* @__PURE__ */ U.createElement(Ie, null, r.renderSymbolsStatically(_));
      });
    }
  }, {
    key: "renderSymbols",
    value: function() {
      var r = this.props, o = r.points, u = r.isAnimationActive, c = this.state.prevPoints;
      return u && o && o.length && (!c || !pi(c, o)) ? this.renderSymbolsWithAnimation() : this.renderSymbolsStatically(o);
    }
  }, {
    key: "renderErrorBar",
    value: function() {
      var r = this.props.isAnimationActive;
      if (r && !this.state.isAnimationFinished)
        return null;
      var o = this.props, u = o.points, c = o.xAxis, f = o.yAxis, d = o.children, h = on(d, cl);
      return h ? h.map(function(y, v) {
        var g = y.props, b = g.direction, _ = g.dataKey;
        return /* @__PURE__ */ U.cloneElement(y, {
          key: "".concat(b, "-").concat(_, "-").concat(u[v]),
          data: u,
          xAxis: c,
          yAxis: f,
          layout: b === "x" ? "vertical" : "horizontal",
          dataPointFormatter: function(x, A) {
            return {
              x: x.cx,
              y: x.cy,
              value: b === "x" ? +x.node.x : +x.node.y,
              errorVal: At(x, A)
            };
          }
        });
      }) : null;
    }
  }, {
    key: "renderLine",
    value: function() {
      var r = this.props, o = r.points, u = r.line, c = r.lineType, f = r.lineJointType, d = Te(this.props, !1), h = Te(u, !1), y, v;
      if (c === "joint")
        y = o.map(function(M) {
          return {
            x: M.cx,
            y: M.cy
          };
        });
      else if (c === "fitting") {
        var g = hz(o), b = g.xmin, _ = g.xmax, S = g.a, x = g.b, A = function(C) {
          return S * C + x;
        };
        y = [{
          x: b,
          y: A(b)
        }, {
          x: _,
          y: A(_)
        }];
      }
      var E = qn(qn(qn({}, d), {}, {
        fill: "none",
        stroke: d && d.fill
      }, h), {}, {
        points: y
      });
      return /* @__PURE__ */ U.isValidElement(u) ? v = /* @__PURE__ */ U.cloneElement(u, E) : Ee(u) ? v = u(E) : v = /* @__PURE__ */ U.createElement(fi, Au({}, E, {
        type: f
      })), /* @__PURE__ */ U.createElement(Ie, {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, v);
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props, o = r.hide, u = r.points, c = r.line, f = r.className, d = r.xAxis, h = r.yAxis, y = r.left, v = r.top, g = r.width, b = r.height, _ = r.id, S = r.isAnimationActive;
      if (o || !u || !u.length)
        return null;
      var x = this.state.isAnimationFinished, A = $e("recharts-scatter", f), E = d && d.allowDataOverflow, M = h && h.allowDataOverflow, C = E || M, w = we(_) ? this.id : _;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: A,
        clipPath: C ? "url(#clipPath-".concat(w, ")") : null
      }, E || M ? /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-".concat(w)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: E ? y : y - g / 2,
        y: M ? v : v - b / 2,
        width: E ? g : g * 2,
        height: M ? b : b * 2
      }))) : null, c && this.renderLine(), this.renderErrorBar(), /* @__PURE__ */ U.createElement(Ie, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!S || x) && dr.renderCallByParent(this.props, u));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(r, o) {
      return r.animationId !== o.prevAnimationId ? {
        prevAnimationId: r.animationId,
        curPoints: r.points,
        prevPoints: o.curPoints
      } : r.points !== o.curPoints ? {
        curPoints: r.points
      } : null;
    }
  }]);
})(J.PureComponent);
Ma(qd, "displayName", "Scatter");
Ma(qd, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: "circle",
  lineType: "joint",
  lineJointType: "linear",
  data: [],
  shape: "circle",
  hide: !1,
  isAnimationActive: !Na.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "linear"
});
Ma(qd, "getComposedData", function(e) {
  var t = e.xAxis, n = e.yAxis, r = e.zAxis, o = e.item, u = e.displayedData, c = e.xAxisTicks, f = e.yAxisTicks, d = e.offset, h = o.props.tooltipType, y = on(o.props.children, yd), v = we(t.dataKey) ? o.props.dataKey : t.dataKey, g = we(n.dataKey) ? o.props.dataKey : n.dataKey, b = r && r.dataKey, _ = r ? r.range : zd.defaultProps.range, S = _ && _[0], x = t.scale.bandwidth ? t.scale.bandwidth() : 0, A = n.scale.bandwidth ? n.scale.bandwidth() : 0, E = u.map(function(M, C) {
    var w = At(M, v), T = At(M, g), j = !we(b) && At(M, b) || "-", N = [{
      name: we(t.dataKey) ? o.props.name : t.name || t.dataKey,
      unit: t.unit || "",
      value: w,
      payload: M,
      dataKey: v,
      type: h
    }, {
      name: we(n.dataKey) ? o.props.name : n.name || n.dataKey,
      unit: n.unit || "",
      value: T,
      payload: M,
      dataKey: g,
      type: h
    }];
    j !== "-" && N.push({
      name: r.name || r.dataKey,
      unit: r.unit || "",
      value: j,
      payload: M,
      dataKey: b,
      type: h
    });
    var z = qo({
      axis: t,
      ticks: c,
      bandSize: x,
      entry: M,
      index: C,
      dataKey: v
    }), k = qo({
      axis: n,
      ticks: f,
      bandSize: A,
      entry: M,
      index: C,
      dataKey: g
    }), B = j !== "-" ? r.scale(j) : S, q = Math.sqrt(Math.max(B, 0) / Math.PI);
    return qn(qn({}, M), {}, {
      cx: z,
      cy: k,
      x: z - q,
      y: k - q,
      xAxis: t,
      yAxis: n,
      zAxis: r,
      width: 2 * q,
      height: 2 * q,
      size: B,
      node: {
        x: w,
        y: T,
        z: j
      },
      tooltipPayload: N,
      tooltipPosition: {
        x: z,
        y: k
      },
      payload: M
    }, y && y[C] && y[C].props);
  });
  return qn({
    points: E
  }, d);
});
function Wo(e) {
  "@babel/helpers - typeof";
  return Wo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wo(e);
}
function zY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, rN(r.key), r);
  }
}
function kY(e, t, n) {
  return t && qY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function BY(e, t, n) {
  return t = Jf(t), LY(e, tN() ? Reflect.construct(t, n || [], Jf(e).constructor) : t.apply(e, n));
}
function LY(e, t) {
  if (t && (Wo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return UY(e);
}
function UY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function tN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (tN = function() {
    return !!e;
  })();
}
function Jf(e) {
  return Jf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Jf(e);
}
function IY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && S0(e, t);
}
function S0(e, t) {
  return S0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, S0(e, t);
}
function nN(e, t, n) {
  return t = rN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function rN(e) {
  var t = HY(e, "string");
  return Wo(t) == "symbol" ? t : t + "";
}
function HY(e, t) {
  if (Wo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function _0() {
  return _0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _0.apply(this, arguments);
}
function GY(e) {
  var t = e.xAxisId, n = N1(), r = R1(), o = PP(t);
  return o == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ J.createElement(sl, _0({}, o, {
      className: $e("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: r
      },
      ticksGenerator: function(c) {
        return kr(c, !0);
      }
    }))
  );
}
var cr = /* @__PURE__ */ (function(e) {
  function t() {
    return zY(this, t), BY(this, t, arguments);
  }
  return IY(t, e), kY(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ J.createElement(GY, this.props);
    }
  }]);
})(J.Component);
nN(cr, "displayName", "XAxis");
nN(cr, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});
function Zo(e) {
  "@babel/helpers - typeof";
  return Zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zo(e);
}
function YY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function KY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, oN(r.key), r);
  }
}
function XY(e, t, n) {
  return t && KY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function VY(e, t, n) {
  return t = ed(t), FY(e, aN() ? Reflect.construct(t, n || [], ed(e).constructor) : t.apply(e, n));
}
function FY(e, t) {
  if (t && (Zo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return WY(e);
}
function WY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function aN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (aN = function() {
    return !!e;
  })();
}
function ed(e) {
  return ed = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ed(e);
}
function ZY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && O0(e, t);
}
function O0(e, t) {
  return O0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, O0(e, t);
}
function iN(e, t, n) {
  return t = oN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function oN(e) {
  var t = QY(e, "string");
  return Zo(t) == "symbol" ? t : t + "";
}
function QY(e, t) {
  if (Zo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function w0() {
  return w0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, w0.apply(this, arguments);
}
var JY = function(t) {
  var n = t.yAxisId, r = N1(), o = R1(), u = NP(n);
  return u == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ J.createElement(sl, w0({}, u, {
      className: $e("recharts-".concat(u.axisType, " ").concat(u.axisType), u.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: o
      },
      ticksGenerator: function(f) {
        return kr(f, !0);
      }
    }))
  );
}, sr = /* @__PURE__ */ (function(e) {
  function t() {
    return YY(this, t), VY(this, t, arguments);
  }
  return ZY(t, e), XY(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ J.createElement(JY, this.props);
    }
  }]);
})(J.Component);
iN(sr, "displayName", "YAxis");
iN(sr, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});
function EM(e) {
  return rK(e) || nK(e) || tK(e) || eK();
}
function eK() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tK(e, t) {
  if (e) {
    if (typeof e == "string") return A0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return A0(e, t);
  }
}
function nK(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function rK(e) {
  if (Array.isArray(e)) return A0(e);
}
function A0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var T0 = function(t, n, r, o, u) {
  var c = on(t, Dd), f = on(t, Nd), d = [].concat(EM(c), EM(f)), h = on(t, $d), y = "".concat(o, "Id"), v = o[0], g = n;
  if (d.length && (g = d.reduce(function(S, x) {
    if (x.props[y] === r && hr(x.props, "extendDomain") && de(x.props[v])) {
      var A = x.props[v];
      return [Math.min(S[0], A), Math.max(S[1], A)];
    }
    return S;
  }, g)), h.length) {
    var b = "".concat(v, "1"), _ = "".concat(v, "2");
    g = h.reduce(function(S, x) {
      if (x.props[y] === r && hr(x.props, "extendDomain") && de(x.props[b]) && de(x.props[_])) {
        var A = x.props[b], E = x.props[_];
        return [Math.min(S[0], A, E), Math.max(S[1], A, E)];
      }
      return S;
    }, g);
  }
  return u && u.length && (g = u.reduce(function(S, x) {
    return de(x) ? [Math.min(S[0], x), Math.max(S[1], x)] : S;
  }, g)), g;
}, eb = { exports: {} }, jM;
function aK() {
  return jM || (jM = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, n = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (n = !1));
    function o(d, h, y) {
      this.fn = d, this.context = h, this.once = y || !1;
    }
    function u(d, h, y, v, g) {
      if (typeof y != "function")
        throw new TypeError("The listener must be a function");
      var b = new o(y, v || d, g), _ = n ? n + h : h;
      return d._events[_] ? d._events[_].fn ? d._events[_] = [d._events[_], b] : d._events[_].push(b) : (d._events[_] = b, d._eventsCount++), d;
    }
    function c(d, h) {
      --d._eventsCount === 0 ? d._events = new r() : delete d._events[h];
    }
    function f() {
      this._events = new r(), this._eventsCount = 0;
    }
    f.prototype.eventNames = function() {
      var h = [], y, v;
      if (this._eventsCount === 0) return h;
      for (v in y = this._events)
        t.call(y, v) && h.push(n ? v.slice(1) : v);
      return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(y)) : h;
    }, f.prototype.listeners = function(h) {
      var y = n ? n + h : h, v = this._events[y];
      if (!v) return [];
      if (v.fn) return [v.fn];
      for (var g = 0, b = v.length, _ = new Array(b); g < b; g++)
        _[g] = v[g].fn;
      return _;
    }, f.prototype.listenerCount = function(h) {
      var y = n ? n + h : h, v = this._events[y];
      return v ? v.fn ? 1 : v.length : 0;
    }, f.prototype.emit = function(h, y, v, g, b, _) {
      var S = n ? n + h : h;
      if (!this._events[S]) return !1;
      var x = this._events[S], A = arguments.length, E, M;
      if (x.fn) {
        switch (x.once && this.removeListener(h, x.fn, void 0, !0), A) {
          case 1:
            return x.fn.call(x.context), !0;
          case 2:
            return x.fn.call(x.context, y), !0;
          case 3:
            return x.fn.call(x.context, y, v), !0;
          case 4:
            return x.fn.call(x.context, y, v, g), !0;
          case 5:
            return x.fn.call(x.context, y, v, g, b), !0;
          case 6:
            return x.fn.call(x.context, y, v, g, b, _), !0;
        }
        for (M = 1, E = new Array(A - 1); M < A; M++)
          E[M - 1] = arguments[M];
        x.fn.apply(x.context, E);
      } else {
        var C = x.length, w;
        for (M = 0; M < C; M++)
          switch (x[M].once && this.removeListener(h, x[M].fn, void 0, !0), A) {
            case 1:
              x[M].fn.call(x[M].context);
              break;
            case 2:
              x[M].fn.call(x[M].context, y);
              break;
            case 3:
              x[M].fn.call(x[M].context, y, v);
              break;
            case 4:
              x[M].fn.call(x[M].context, y, v, g);
              break;
            default:
              if (!E) for (w = 1, E = new Array(A - 1); w < A; w++)
                E[w - 1] = arguments[w];
              x[M].fn.apply(x[M].context, E);
          }
      }
      return !0;
    }, f.prototype.on = function(h, y, v) {
      return u(this, h, y, v, !1);
    }, f.prototype.once = function(h, y, v) {
      return u(this, h, y, v, !0);
    }, f.prototype.removeListener = function(h, y, v, g) {
      var b = n ? n + h : h;
      if (!this._events[b]) return this;
      if (!y)
        return c(this, b), this;
      var _ = this._events[b];
      if (_.fn)
        _.fn === y && (!g || _.once) && (!v || _.context === v) && c(this, b);
      else {
        for (var S = 0, x = [], A = _.length; S < A; S++)
          (_[S].fn !== y || g && !_[S].once || v && _[S].context !== v) && x.push(_[S]);
        x.length ? this._events[b] = x.length === 1 ? x[0] : x : c(this, b);
      }
      return this;
    }, f.prototype.removeAllListeners = function(h) {
      var y;
      return h ? (y = n ? n + h : h, this._events[y] && c(this, y)) : (this._events = new r(), this._eventsCount = 0), this;
    }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = n, f.EventEmitter = f, e.exports = f;
  })(eb)), eb.exports;
}
var iK = aK();
const oK = /* @__PURE__ */ tt(iK);
var tb = new oK(), nb = "recharts.syncMouseEvents";
function cc(e) {
  "@babel/helpers - typeof";
  return cc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cc(e);
}
function lK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function uK(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, lN(r.key), r);
  }
}
function cK(e, t, n) {
  return t && uK(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function rb(e, t, n) {
  return t = lN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function lN(e) {
  var t = sK(e, "string");
  return cc(t) == "symbol" ? t : t + "";
}
function sK(e, t) {
  if (cc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (cc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var fK = /* @__PURE__ */ (function() {
  function e() {
    lK(this, e), rb(this, "activeIndex", 0), rb(this, "coordinateList", []), rb(this, "layout", "horizontal");
  }
  return cK(e, [{
    key: "setDetails",
    value: function(n) {
      var r, o = n.coordinateList, u = o === void 0 ? null : o, c = n.container, f = c === void 0 ? null : c, d = n.layout, h = d === void 0 ? null : d, y = n.offset, v = y === void 0 ? null : y, g = n.mouseHandlerCallback, b = g === void 0 ? null : g;
      this.coordinateList = (r = u ?? this.coordinateList) !== null && r !== void 0 ? r : [], this.container = f ?? this.container, this.layout = h ?? this.layout, this.offset = v ?? this.offset, this.mouseHandlerCallback = b ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function(n) {
      if (this.coordinateList.length !== 0)
        switch (n.key) {
          case "ArrowRight": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
            break;
          }
          case "ArrowLeft": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
            break;
          }
        }
    }
  }, {
    key: "setIndex",
    value: function(n) {
      this.activeIndex = n;
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var n, r;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var o = this.container.getBoundingClientRect(), u = o.x, c = o.y, f = o.height, d = this.coordinateList[this.activeIndex].coordinate, h = ((n = window) === null || n === void 0 ? void 0 : n.scrollX) || 0, y = ((r = window) === null || r === void 0 ? void 0 : r.scrollY) || 0, v = u + d + h, g = c + this.offset.top + f / 2 + y;
        this.mouseHandlerCallback({
          pageX: v,
          pageY: g
        });
      }
    }
  }]);
})();
function dK(e, t, n) {
  if (n === "number" && t === !0 && Array.isArray(e)) {
    var r = e == null ? void 0 : e[0], o = e == null ? void 0 : e[1];
    if (r && o && de(r) && de(o))
      return !0;
  }
  return !1;
}
function hK(e, t, n, r) {
  var o = r / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - o : n.left + 0.5,
    y: e === "horizontal" ? n.top + 0.5 : t.y - o,
    width: e === "horizontal" ? r : n.width - 1,
    height: e === "horizontal" ? n.height - 1 : r
  };
}
function uN(e) {
  var t = e.cx, n = e.cy, r = e.radius, o = e.startAngle, u = e.endAngle, c = Bt(t, n, r, o), f = Bt(t, n, r, u);
  return {
    points: [c, f],
    cx: t,
    cy: n,
    radius: r,
    startAngle: o,
    endAngle: u
  };
}
function pK(e, t, n) {
  var r, o, u, c;
  if (e === "horizontal")
    r = t.x, u = r, o = n.top, c = n.top + n.height;
  else if (e === "vertical")
    o = t.y, c = o, r = n.left, u = n.left + n.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var f = t.cx, d = t.cy, h = t.innerRadius, y = t.outerRadius, v = t.angle, g = Bt(f, d, h, v), b = Bt(f, d, y, v);
      r = g.x, o = g.y, u = b.x, c = b.y;
    } else
      return uN(t);
  return [{
    x: r,
    y: o
  }, {
    x: u,
    y: c
  }];
}
function sc(e) {
  "@babel/helpers - typeof";
  return sc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sc(e);
}
function MM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Vs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? MM(Object(n), !0).forEach(function(r) {
      vK(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : MM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function vK(e, t, n) {
  return t = yK(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function yK(e) {
  var t = mK(e, "string");
  return sc(t) == "symbol" ? t : t + "";
}
function mK(e, t) {
  if (sc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (sc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gK(e) {
  var t, n, r = e.element, o = e.tooltipEventType, u = e.isActive, c = e.activeCoordinate, f = e.activePayload, d = e.offset, h = e.activeTooltipIndex, y = e.tooltipAxisBandSize, v = e.layout, g = e.chartName, b = (t = r.props.cursor) !== null && t !== void 0 ? t : (n = r.type.defaultProps) === null || n === void 0 ? void 0 : n.cursor;
  if (!r || !b || !u || !c || g !== "ScatterChart" && o !== "axis")
    return null;
  var _, S = fi;
  if (g === "ScatterChart")
    _ = c, S = I9;
  else if (g === "BarChart")
    _ = hK(v, c, d, y), S = M1;
  else if (v === "radial") {
    var x = uN(c), A = x.cx, E = x.cy, M = x.radius, C = x.startAngle, w = x.endAngle;
    _ = {
      cx: A,
      cy: E,
      startAngle: C,
      endAngle: w,
      innerRadius: M,
      outerRadius: M
    }, S = uP;
  } else
    _ = {
      points: pK(v, c, d)
    }, S = fi;
  var T = Vs(Vs(Vs(Vs({
    stroke: "#ccc",
    pointerEvents: "none"
  }, d), _), Te(b, !1)), {}, {
    payload: f,
    payloadIndex: h,
    className: $e("recharts-tooltip-cursor", b.className)
  });
  return /* @__PURE__ */ J.isValidElement(b) ? /* @__PURE__ */ J.cloneElement(b, T) : /* @__PURE__ */ J.createElement(S, T);
}
var bK = ["item"], xK = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Qo(e) {
  "@babel/helpers - typeof";
  return Qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qo(e);
}
function _o() {
  return _o = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _o.apply(this, arguments);
}
function CM(e, t) {
  return OK(e) || _K(e, t) || sN(e, t) || SK();
}
function SK() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _K(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, u, c, f = [], d = !0, h = !1;
    try {
      if (u = (n = n.call(e)).next, t !== 0) for (; !(d = (r = u.call(n)).done) && (f.push(r.value), f.length !== t); d = !0) ;
    } catch (y) {
      h = !0, o = y;
    } finally {
      try {
        if (!d && n.return != null && (c = n.return(), Object(c) !== c)) return;
      } finally {
        if (h) throw o;
      }
    }
    return f;
  }
}
function OK(e) {
  if (Array.isArray(e)) return e;
}
function DM(e, t) {
  if (e == null) return {};
  var n = wK(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function wK(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function AK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function TK(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, fN(r.key), r);
  }
}
function EK(e, t, n) {
  return t && TK(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jK(e, t, n) {
  return t = td(t), MK(e, cN() ? Reflect.construct(t, n || [], td(e).constructor) : t.apply(e, n));
}
function MK(e, t) {
  if (t && (Qo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return CK(e);
}
function CK(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function cN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (cN = function() {
    return !!e;
  })();
}
function td(e) {
  return td = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, td(e);
}
function DK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && E0(e, t);
}
function E0(e, t) {
  return E0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, E0(e, t);
}
function Jo(e) {
  return RK(e) || NK(e) || sN(e) || PK();
}
function PK() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function sN(e, t) {
  if (e) {
    if (typeof e == "string") return j0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return j0(e, t);
  }
}
function NK(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function RK(e) {
  if (Array.isArray(e)) return j0(e);
}
function j0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function PM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? PM(Object(n), !0).forEach(function(r) {
      Oe(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : PM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Oe(e, t, n) {
  return t = fN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function fN(e) {
  var t = $K(e, "string");
  return Qo(t) == "symbol" ? t : t + "";
}
function $K(e, t) {
  if (Qo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Qo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var zK = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, qK = {
  width: "100%",
  height: "100%"
}, dN = {
  x: 0,
  y: 0
};
function Fs(e) {
  return e;
}
var kK = function(t, n) {
  return n === "horizontal" ? t.x : n === "vertical" ? t.y : n === "centric" ? t.angle : t.radius;
}, BK = function(t, n, r, o) {
  var u = n.find(function(y) {
    return y && y.index === r;
  });
  if (u) {
    if (t === "horizontal")
      return {
        x: u.coordinate,
        y: o.y
      };
    if (t === "vertical")
      return {
        x: o.x,
        y: u.coordinate
      };
    if (t === "centric") {
      var c = u.coordinate, f = o.radius;
      return ie(ie(ie({}, o), Bt(o.cx, o.cy, f, c)), {}, {
        angle: c,
        radius: f
      });
    }
    var d = u.coordinate, h = o.angle;
    return ie(ie(ie({}, o), Bt(o.cx, o.cy, d, h)), {}, {
      angle: h,
      radius: d
    });
  }
  return dN;
}, kd = function(t, n) {
  var r = n.graphicalItems, o = n.dataStartIndex, u = n.dataEndIndex, c = (r ?? []).reduce(function(f, d) {
    var h = d.props.data;
    return h && h.length ? [].concat(Jo(f), Jo(h)) : f;
  }, []);
  return c.length > 0 ? c : t && t.length && de(o) && de(u) ? t.slice(o, u + 1) : [];
};
function hN(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var M0 = function(t, n, r, o) {
  var u = t.graphicalItems, c = t.tooltipAxis, f = kd(n, t);
  return r < 0 || !u || !u.length || r >= f.length ? null : u.reduce(function(d, h) {
    var y, v = (y = h.props.data) !== null && y !== void 0 ? y : n;
    v && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= r && (v = v.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var g;
    if (c.dataKey && !c.allowDuplicatedCategory) {
      var b = v === void 0 ? f : v;
      g = tf(b, c.dataKey, o);
    } else
      g = v && v[r] || f[r];
    return g ? [].concat(Jo(d), [iP(h, g)]) : d;
  }, []);
}, NM = function(t, n, r, o) {
  var u = o || {
    x: t.chartX,
    y: t.chartY
  }, c = kK(u, r), f = t.orderedTooltipTicks, d = t.tooltipAxis, h = t.tooltipTicks, y = SL(c, f, h, d);
  if (y >= 0 && h) {
    var v = h[y] && h[y].value, g = M0(t, n, y, v), b = BK(r, f, y, u);
    return {
      activeTooltipIndex: y,
      activeLabel: v,
      activePayload: g,
      activeCoordinate: b
    };
  }
  return null;
}, LK = function(t, n) {
  var r = n.axes, o = n.graphicalItems, u = n.axisType, c = n.axisIdKey, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.layout, v = t.children, g = t.stackOffset, b = nP(y, u);
  return r.reduce(function(_, S) {
    var x, A = S.type.defaultProps !== void 0 ? ie(ie({}, S.type.defaultProps), S.props) : S.props, E = A.type, M = A.dataKey, C = A.allowDataOverflow, w = A.allowDuplicatedCategory, T = A.scale, j = A.ticks, N = A.includeHidden, z = A[c];
    if (_[z])
      return _;
    var k = kd(t.data, {
      graphicalItems: o.filter(function(I) {
        var re, se = c in I.props ? I.props[c] : (re = I.type.defaultProps) === null || re === void 0 ? void 0 : re[c];
        return se === z;
      }),
      dataStartIndex: d,
      dataEndIndex: h
    }), B = k.length, q, V, Y;
    dK(A.domain, C, E) && (q = Hb(A.domain, null, C), b && (E === "number" || T !== "auto") && (Y = Su(k, M, "category")));
    var F = hN(E);
    if (!q || q.length === 0) {
      var $, K = ($ = A.domain) !== null && $ !== void 0 ? $ : F;
      if (M) {
        if (q = Su(k, M, E), E === "category" && b) {
          var ne = dz(q);
          w && ne ? (V = q, q = Bf(0, B)) : w || (q = H2(K, q, S).reduce(function(I, re) {
            return I.indexOf(re) >= 0 ? I : [].concat(Jo(I), [re]);
          }, []));
        } else if (E === "category")
          w ? q = q.filter(function(I) {
            return I !== "" && !we(I);
          }) : q = H2(K, q, S).reduce(function(I, re) {
            return I.indexOf(re) >= 0 || re === "" || we(re) ? I : [].concat(Jo(I), [re]);
          }, []);
        else if (E === "number") {
          var G = TL(k, o.filter(function(I) {
            var re, se, pe = c in I.props ? I.props[c] : (re = I.type.defaultProps) === null || re === void 0 ? void 0 : re[c], fe = "hide" in I.props ? I.props.hide : (se = I.type.defaultProps) === null || se === void 0 ? void 0 : se.hide;
            return pe === z && (N || !fe);
          }), M, u, y);
          G && (q = G);
        }
        b && (E === "number" || T !== "auto") && (Y = Su(k, M, "category"));
      } else b ? q = Bf(0, B) : f && f[z] && f[z].hasStack && E === "number" ? q = g === "expand" ? [0, 1] : aP(f[z].stackGroups, d, h) : q = tP(k, o.filter(function(I) {
        var re = c in I.props ? I.props[c] : I.type.defaultProps[c], se = "hide" in I.props ? I.props.hide : I.type.defaultProps.hide;
        return re === z && (N || !se);
      }), E, y, !0);
      if (E === "number")
        q = T0(v, q, z, u, j), K && (q = Hb(K, q, C));
      else if (E === "category" && K) {
        var ee = K, P = q.every(function(I) {
          return ee.indexOf(I) >= 0;
        });
        P && (q = ee);
      }
    }
    return ie(ie({}, _), {}, Oe({}, z, ie(ie({}, A), {}, {
      axisType: u,
      domain: q,
      categoricalDomain: Y,
      duplicateDomain: V,
      originalDomain: (x = A.domain) !== null && x !== void 0 ? x : F,
      isCategorical: b,
      layout: y
    })));
  }, {});
}, UK = function(t, n) {
  var r = n.graphicalItems, o = n.Axis, u = n.axisType, c = n.axisIdKey, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.layout, v = t.children, g = kd(t.data, {
    graphicalItems: r,
    dataStartIndex: d,
    dataEndIndex: h
  }), b = g.length, _ = nP(y, u), S = -1;
  return r.reduce(function(x, A) {
    var E = A.type.defaultProps !== void 0 ? ie(ie({}, A.type.defaultProps), A.props) : A.props, M = E[c], C = hN("number");
    if (!x[M]) {
      S++;
      var w;
      return _ ? w = Bf(0, b) : f && f[M] && f[M].hasStack ? (w = aP(f[M].stackGroups, d, h), w = T0(v, w, M, u)) : (w = Hb(C, tP(g, r.filter(function(T) {
        var j, N, z = c in T.props ? T.props[c] : (j = T.type.defaultProps) === null || j === void 0 ? void 0 : j[c], k = "hide" in T.props ? T.props.hide : (N = T.type.defaultProps) === null || N === void 0 ? void 0 : N.hide;
        return z === M && !k;
      }), "number", y), o.defaultProps.allowDataOverflow), w = T0(v, w, M, u)), ie(ie({}, x), {}, Oe({}, M, ie(ie({
        axisType: u
      }, o.defaultProps), {}, {
        hide: !0,
        orientation: Bn(zK, "".concat(u, ".").concat(S % 2), null),
        domain: w,
        originalDomain: C,
        isCategorical: _,
        layout: y
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return x;
  }, {});
}, IK = function(t, n) {
  var r = n.axisType, o = r === void 0 ? "xAxis" : r, u = n.AxisComp, c = n.graphicalItems, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.children, v = "".concat(o, "Id"), g = on(y, u), b = {};
  return g && g.length ? b = LK(t, {
    axes: g,
    graphicalItems: c,
    axisType: o,
    axisIdKey: v,
    stackGroups: f,
    dataStartIndex: d,
    dataEndIndex: h
  }) : c && c.length && (b = UK(t, {
    Axis: u,
    graphicalItems: c,
    axisType: o,
    axisIdKey: v,
    stackGroups: f,
    dataStartIndex: d,
    dataEndIndex: h
  })), b;
}, HK = function(t) {
  var n = Ta(t), r = kr(n, !1, !0);
  return {
    tooltipTicks: r,
    orderedTooltipTicks: n1(r, function(o) {
      return o.coordinate;
    }),
    tooltipAxis: n,
    tooltipAxisBandSize: Mf(n, r)
  };
}, RM = function(t) {
  var n = t.children, r = t.defaultShowTooltip, o = xn(n, Lo), u = 0, c = 0;
  return t.data && t.data.length !== 0 && (c = t.data.length - 1), o && o.props && (o.props.startIndex >= 0 && (u = o.props.startIndex), o.props.endIndex >= 0 && (c = o.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: u,
    dataEndIndex: c,
    activeTooltipIndex: -1,
    isTooltipActive: !!r
  };
}, GK = function(t) {
  return !t || !t.length ? !1 : t.some(function(n) {
    var r = Lr(n && n.type);
    return r && r.indexOf("Bar") >= 0;
  });
}, $M = function(t) {
  return t === "horizontal" ? {
    numericAxisName: "yAxis",
    cateAxisName: "xAxis"
  } : t === "vertical" ? {
    numericAxisName: "xAxis",
    cateAxisName: "yAxis"
  } : t === "centric" ? {
    numericAxisName: "radiusAxis",
    cateAxisName: "angleAxis"
  } : {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
}, YK = function(t, n) {
  var r = t.props, o = t.graphicalItems, u = t.xAxisMap, c = u === void 0 ? {} : u, f = t.yAxisMap, d = f === void 0 ? {} : f, h = r.width, y = r.height, v = r.children, g = r.margin || {}, b = xn(v, Lo), _ = xn(v, wo), S = Object.keys(d).reduce(function(w, T) {
    var j = d[T], N = j.orientation;
    return !j.mirror && !j.hide ? ie(ie({}, w), {}, Oe({}, N, w[N] + j.width)) : w;
  }, {
    left: g.left || 0,
    right: g.right || 0
  }), x = Object.keys(c).reduce(function(w, T) {
    var j = c[T], N = j.orientation;
    return !j.mirror && !j.hide ? ie(ie({}, w), {}, Oe({}, N, Bn(w, "".concat(N)) + j.height)) : w;
  }, {
    top: g.top || 0,
    bottom: g.bottom || 0
  }), A = ie(ie({}, x), S), E = A.bottom;
  b && (A.bottom += b.props.height || Lo.defaultProps.height), _ && n && (A = wL(A, o, r, n));
  var M = h - A.left - A.right, C = y - A.top - A.bottom;
  return ie(ie({
    brushBottom: E
  }, A), {}, {
    // never return negative values for height and width
    width: Math.max(M, 0),
    height: Math.max(C, 0)
  });
}, KK = function(t, n) {
  if (n === "xAxis")
    return t[n].width;
  if (n === "yAxis")
    return t[n].height;
}, Bd = function(t) {
  var n = t.chartName, r = t.GraphicalChild, o = t.defaultTooltipEventType, u = o === void 0 ? "axis" : o, c = t.validateTooltipEventTypes, f = c === void 0 ? ["axis"] : c, d = t.axisComponents, h = t.legendContent, y = t.formatAxisMap, v = t.defaultProps, g = function(A, E) {
    var M = E.graphicalItems, C = E.stackGroups, w = E.offset, T = E.updateId, j = E.dataStartIndex, N = E.dataEndIndex, z = A.barSize, k = A.layout, B = A.barGap, q = A.barCategoryGap, V = A.maxBarSize, Y = $M(k), F = Y.numericAxisName, $ = Y.cateAxisName, K = GK(M), ne = [];
    return M.forEach(function(G, ee) {
      var P = kd(A.data, {
        graphicalItems: [G],
        dataStartIndex: j,
        dataEndIndex: N
      }), I = G.type.defaultProps !== void 0 ? ie(ie({}, G.type.defaultProps), G.props) : G.props, re = I.dataKey, se = I.maxBarSize, pe = I["".concat(F, "Id")], fe = I["".concat($, "Id")], _e = {}, Ce = d.reduce(function(Kt, Xt) {
        var Zr = E["".concat(Xt.axisType, "Map")], Lt = I["".concat(Xt.axisType, "Id")];
        Zr && Zr[Lt] || Xt.axisType === "zAxis" || yi();
        var mc = Zr[Lt];
        return ie(ie({}, Kt), {}, Oe(Oe({}, Xt.axisType, mc), "".concat(Xt.axisType, "Ticks"), kr(mc)));
      }, _e), ce = Ce[$], ge = Ce["".concat($, "Ticks")], he = C && C[pe] && C[pe].hasStack && kL(G, C[pe].stackGroups), ue = Lr(G.type).indexOf("Bar") >= 0, qe = Mf(ce, ge), xe = [], Qe = K && _L({
        barSize: z,
        stackGroups: C,
        totalSize: KK(Ce, $)
      });
      if (ue) {
        var Ye, Et, un = we(se) ? V : se, Wt = (Ye = (Et = Mf(ce, ge, !0)) !== null && Et !== void 0 ? Et : un) !== null && Ye !== void 0 ? Ye : 0;
        xe = OL({
          barGap: B,
          barCategoryGap: q,
          bandSize: Wt !== qe ? Wt : qe,
          sizeList: Qe[fe],
          maxBarSize: un
        }), Wt !== qe && (xe = xe.map(function(Kt) {
          return ie(ie({}, Kt), {}, {
            position: ie(ie({}, Kt.position), {}, {
              offset: Kt.position.offset - Wt / 2
            })
          });
        }));
      }
      var On = G && G.type && G.type.getComposedData;
      On && ne.push({
        props: ie(ie({}, On(ie(ie({}, Ce), {}, {
          displayedData: P,
          props: A,
          dataKey: re,
          item: G,
          bandSize: qe,
          barPosition: xe,
          offset: w,
          stackedData: he,
          layout: k,
          dataStartIndex: j,
          dataEndIndex: N
        }))), {}, Oe(Oe(Oe({
          key: G.key || "item-".concat(ee)
        }, F, Ce[F]), $, Ce[$]), "animationId", T)),
        childIndex: Az(G, A.children),
        item: G
      });
    }), ne;
  }, b = function(A, E) {
    var M = A.props, C = A.dataStartIndex, w = A.dataEndIndex, T = A.updateId;
    if (!aA({
      props: M
    }))
      return null;
    var j = M.children, N = M.layout, z = M.stackOffset, k = M.data, B = M.reverseStackOrder, q = $M(N), V = q.numericAxisName, Y = q.cateAxisName, F = on(j, r), $ = $L(k, F, "".concat(V, "Id"), "".concat(Y, "Id"), z, B), K = d.reduce(function(I, re) {
      var se = "".concat(re.axisType, "Map");
      return ie(ie({}, I), {}, Oe({}, se, IK(M, ie(ie({}, re), {}, {
        graphicalItems: F,
        stackGroups: re.axisType === V && $,
        dataStartIndex: C,
        dataEndIndex: w
      }))));
    }, {}), ne = YK(ie(ie({}, K), {}, {
      props: M,
      graphicalItems: F
    }), E == null ? void 0 : E.legendBBox);
    Object.keys(K).forEach(function(I) {
      K[I] = y(M, K[I], ne, I.replace("Map", ""), n);
    });
    var G = K["".concat(Y, "Map")], ee = HK(G), P = g(M, ie(ie({}, K), {}, {
      dataStartIndex: C,
      dataEndIndex: w,
      updateId: T,
      graphicalItems: F,
      stackGroups: $,
      offset: ne
    }));
    return ie(ie({
      formattedGraphicalItems: P,
      graphicalItems: F,
      offset: ne,
      stackGroups: $
    }, ee), K);
  }, _ = /* @__PURE__ */ (function(x) {
    function A(E) {
      var M, C, w;
      return AK(this, A), w = jK(this, A, [E]), Oe(w, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), Oe(w, "accessibilityManager", new fK()), Oe(w, "handleLegendBBoxUpdate", function(T) {
        if (T) {
          var j = w.state, N = j.dataStartIndex, z = j.dataEndIndex, k = j.updateId;
          w.setState(ie({
            legendBBox: T
          }, b({
            props: w.props,
            dataStartIndex: N,
            dataEndIndex: z,
            updateId: k
          }, ie(ie({}, w.state), {}, {
            legendBBox: T
          }))));
        }
      }), Oe(w, "handleReceiveSyncEvent", function(T, j, N) {
        if (w.props.syncId === T) {
          if (N === w.eventEmitterSymbol && typeof w.props.syncMethod != "function")
            return;
          w.applySyncEvent(j);
        }
      }), Oe(w, "handleBrushChange", function(T) {
        var j = T.startIndex, N = T.endIndex;
        if (j !== w.state.dataStartIndex || N !== w.state.dataEndIndex) {
          var z = w.state.updateId;
          w.setState(function() {
            return ie({
              dataStartIndex: j,
              dataEndIndex: N
            }, b({
              props: w.props,
              dataStartIndex: j,
              dataEndIndex: N,
              updateId: z
            }, w.state));
          }), w.triggerSyncEvent({
            dataStartIndex: j,
            dataEndIndex: N
          });
        }
      }), Oe(w, "handleMouseEnter", function(T) {
        var j = w.getMouseInfo(T);
        if (j) {
          var N = ie(ie({}, j), {}, {
            isTooltipActive: !0
          });
          w.setState(N), w.triggerSyncEvent(N);
          var z = w.props.onMouseEnter;
          Ee(z) && z(N, T);
        }
      }), Oe(w, "triggeredAfterMouseMove", function(T) {
        var j = w.getMouseInfo(T), N = j ? ie(ie({}, j), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        w.setState(N), w.triggerSyncEvent(N);
        var z = w.props.onMouseMove;
        Ee(z) && z(N, T);
      }), Oe(w, "handleItemMouseEnter", function(T) {
        w.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: T,
            activePayload: T.tooltipPayload,
            activeCoordinate: T.tooltipPosition || {
              x: T.cx,
              y: T.cy
            }
          };
        });
      }), Oe(w, "handleItemMouseLeave", function() {
        w.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), Oe(w, "handleMouseMove", function(T) {
        T.persist(), w.throttleTriggeredAfterMouseMove(T);
      }), Oe(w, "handleMouseLeave", function(T) {
        w.throttleTriggeredAfterMouseMove.cancel();
        var j = {
          isTooltipActive: !1
        };
        w.setState(j), w.triggerSyncEvent(j);
        var N = w.props.onMouseLeave;
        Ee(N) && N(j, T);
      }), Oe(w, "handleOuterEvent", function(T) {
        var j = wz(T), N = Bn(w.props, "".concat(j));
        if (j && Ee(N)) {
          var z, k;
          /.*touch.*/i.test(j) ? k = w.getMouseInfo(T.changedTouches[0]) : k = w.getMouseInfo(T), N((z = k) !== null && z !== void 0 ? z : {}, T);
        }
      }), Oe(w, "handleClick", function(T) {
        var j = w.getMouseInfo(T);
        if (j) {
          var N = ie(ie({}, j), {}, {
            isTooltipActive: !0
          });
          w.setState(N), w.triggerSyncEvent(N);
          var z = w.props.onClick;
          Ee(z) && z(N, T);
        }
      }), Oe(w, "handleMouseDown", function(T) {
        var j = w.props.onMouseDown;
        if (Ee(j)) {
          var N = w.getMouseInfo(T);
          j(N, T);
        }
      }), Oe(w, "handleMouseUp", function(T) {
        var j = w.props.onMouseUp;
        if (Ee(j)) {
          var N = w.getMouseInfo(T);
          j(N, T);
        }
      }), Oe(w, "handleTouchMove", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && w.throttleTriggeredAfterMouseMove(T.changedTouches[0]);
      }), Oe(w, "handleTouchStart", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && w.handleMouseDown(T.changedTouches[0]);
      }), Oe(w, "handleTouchEnd", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && w.handleMouseUp(T.changedTouches[0]);
      }), Oe(w, "handleDoubleClick", function(T) {
        var j = w.props.onDoubleClick;
        if (Ee(j)) {
          var N = w.getMouseInfo(T);
          j(N, T);
        }
      }), Oe(w, "handleContextMenu", function(T) {
        var j = w.props.onContextMenu;
        if (Ee(j)) {
          var N = w.getMouseInfo(T);
          j(N, T);
        }
      }), Oe(w, "triggerSyncEvent", function(T) {
        w.props.syncId !== void 0 && tb.emit(nb, w.props.syncId, T, w.eventEmitterSymbol);
      }), Oe(w, "applySyncEvent", function(T) {
        var j = w.props, N = j.layout, z = j.syncMethod, k = w.state.updateId, B = T.dataStartIndex, q = T.dataEndIndex;
        if (T.dataStartIndex !== void 0 || T.dataEndIndex !== void 0)
          w.setState(ie({
            dataStartIndex: B,
            dataEndIndex: q
          }, b({
            props: w.props,
            dataStartIndex: B,
            dataEndIndex: q,
            updateId: k
          }, w.state)));
        else if (T.activeTooltipIndex !== void 0) {
          var V = T.chartX, Y = T.chartY, F = T.activeTooltipIndex, $ = w.state, K = $.offset, ne = $.tooltipTicks;
          if (!K)
            return;
          if (typeof z == "function")
            F = z(ne, T);
          else if (z === "value") {
            F = -1;
            for (var G = 0; G < ne.length; G++)
              if (ne[G].value === T.activeLabel) {
                F = G;
                break;
              }
          }
          var ee = ie(ie({}, K), {}, {
            x: K.left,
            y: K.top
          }), P = Math.min(V, ee.x + ee.width), I = Math.min(Y, ee.y + ee.height), re = ne[F] && ne[F].value, se = M0(w.state, w.props.data, F), pe = ne[F] ? {
            x: N === "horizontal" ? ne[F].coordinate : P,
            y: N === "horizontal" ? I : ne[F].coordinate
          } : dN;
          w.setState(ie(ie({}, T), {}, {
            activeLabel: re,
            activeCoordinate: pe,
            activePayload: se,
            activeTooltipIndex: F
          }));
        } else
          w.setState(T);
      }), Oe(w, "renderCursor", function(T) {
        var j, N = w.state, z = N.isTooltipActive, k = N.activeCoordinate, B = N.activePayload, q = N.offset, V = N.activeTooltipIndex, Y = N.tooltipAxisBandSize, F = w.getTooltipEventType(), $ = (j = T.props.active) !== null && j !== void 0 ? j : z, K = w.props.layout, ne = T.key || "_recharts-cursor";
        return /* @__PURE__ */ U.createElement(gK, {
          key: ne,
          activeCoordinate: k,
          activePayload: B,
          activeTooltipIndex: V,
          chartName: n,
          element: T,
          isActive: $,
          layout: K,
          offset: q,
          tooltipAxisBandSize: Y,
          tooltipEventType: F
        });
      }), Oe(w, "renderPolarAxis", function(T, j, N) {
        var z = Bn(T, "type.axisType"), k = Bn(w.state, "".concat(z, "Map")), B = T.type.defaultProps, q = B !== void 0 ? ie(ie({}, B), T.props) : T.props, V = k && k[q["".concat(z, "Id")]];
        return /* @__PURE__ */ J.cloneElement(T, ie(ie({}, V), {}, {
          className: $e(z, V.className),
          key: T.key || "".concat(j, "-").concat(N),
          ticks: kr(V, !0)
        }));
      }), Oe(w, "renderPolarGrid", function(T) {
        var j = T.props, N = j.radialLines, z = j.polarAngles, k = j.polarRadius, B = w.state, q = B.radiusAxisMap, V = B.angleAxisMap, Y = Ta(q), F = Ta(V), $ = F.cx, K = F.cy, ne = F.innerRadius, G = F.outerRadius;
        return /* @__PURE__ */ J.cloneElement(T, {
          polarAngles: Array.isArray(z) ? z : kr(F, !0).map(function(ee) {
            return ee.coordinate;
          }),
          polarRadius: Array.isArray(k) ? k : kr(Y, !0).map(function(ee) {
            return ee.coordinate;
          }),
          cx: $,
          cy: K,
          innerRadius: ne,
          outerRadius: G,
          key: T.key || "polar-grid",
          radialLines: N
        });
      }), Oe(w, "renderLegend", function() {
        var T = w.state.formattedGraphicalItems, j = w.props, N = j.children, z = j.width, k = j.height, B = w.props.margin || {}, q = z - (B.left || 0) - (B.right || 0), V = JD({
          children: N,
          formattedGraphicalItems: T,
          legendWidth: q,
          legendContent: h
        });
        if (!V)
          return null;
        var Y = V.item, F = DM(V, bK);
        return /* @__PURE__ */ J.cloneElement(Y, ie(ie({}, F), {}, {
          chartWidth: z,
          chartHeight: k,
          margin: B,
          onBBoxUpdate: w.handleLegendBBoxUpdate
        }));
      }), Oe(w, "renderTooltip", function() {
        var T, j = w.props, N = j.children, z = j.accessibilityLayer, k = xn(N, Sn);
        if (!k)
          return null;
        var B = w.state, q = B.isTooltipActive, V = B.activeCoordinate, Y = B.activePayload, F = B.activeLabel, $ = B.offset, K = (T = k.props.active) !== null && T !== void 0 ? T : q;
        return /* @__PURE__ */ J.cloneElement(k, {
          viewBox: ie(ie({}, $), {}, {
            x: $.left,
            y: $.top
          }),
          active: K,
          label: F,
          payload: K ? Y : [],
          coordinate: V,
          accessibilityLayer: z
        });
      }), Oe(w, "renderBrush", function(T) {
        var j = w.props, N = j.margin, z = j.data, k = w.state, B = k.offset, q = k.dataStartIndex, V = k.dataEndIndex, Y = k.updateId;
        return /* @__PURE__ */ J.cloneElement(T, {
          key: T.key || "_recharts-brush",
          onChange: Gs(w.handleBrushChange, T.props.onChange),
          data: z,
          x: de(T.props.x) ? T.props.x : B.left,
          y: de(T.props.y) ? T.props.y : B.top + B.height + B.brushBottom - (N.bottom || 0),
          width: de(T.props.width) ? T.props.width : B.width,
          startIndex: q,
          endIndex: V,
          updateId: "brush-".concat(Y)
        });
      }), Oe(w, "renderReferenceElement", function(T, j, N) {
        if (!T)
          return null;
        var z = w, k = z.clipPathId, B = w.state, q = B.xAxisMap, V = B.yAxisMap, Y = B.offset, F = T.type.defaultProps || {}, $ = T.props, K = $.xAxisId, ne = K === void 0 ? F.xAxisId : K, G = $.yAxisId, ee = G === void 0 ? F.yAxisId : G;
        return /* @__PURE__ */ J.cloneElement(T, {
          key: T.key || "".concat(j, "-").concat(N),
          xAxis: q[ne],
          yAxis: V[ee],
          viewBox: {
            x: Y.left,
            y: Y.top,
            width: Y.width,
            height: Y.height
          },
          clipPathId: k
        });
      }), Oe(w, "renderActivePoints", function(T) {
        var j = T.item, N = T.activePoint, z = T.basePoint, k = T.childIndex, B = T.isRange, q = [], V = j.props.key, Y = j.item.type.defaultProps !== void 0 ? ie(ie({}, j.item.type.defaultProps), j.item.props) : j.item.props, F = Y.activeDot, $ = Y.dataKey, K = ie(ie({
          index: k,
          dataKey: $,
          cx: N.x,
          cy: N.y,
          r: 4,
          fill: j1(j.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: N.payload,
          value: N.value
        }, Te(F, !1)), nf(F));
        return q.push(A.renderActiveDot(F, K, "".concat(V, "-activePoint-").concat(k))), z ? q.push(A.renderActiveDot(F, ie(ie({}, K), {}, {
          cx: z.x,
          cy: z.y
        }), "".concat(V, "-basePoint-").concat(k))) : B && q.push(null), q;
      }), Oe(w, "renderGraphicChild", function(T, j, N) {
        var z = w.filterFormatItem(T, j, N);
        if (!z)
          return null;
        var k = w.getTooltipEventType(), B = w.state, q = B.isTooltipActive, V = B.tooltipAxis, Y = B.activeTooltipIndex, F = B.activeLabel, $ = w.props.children, K = xn($, Sn), ne = z.props, G = ne.points, ee = ne.isRange, P = ne.baseLine, I = z.item.type.defaultProps !== void 0 ? ie(ie({}, z.item.type.defaultProps), z.item.props) : z.item.props, re = I.activeDot, se = I.hide, pe = I.activeBar, fe = I.activeShape, _e = !!(!se && q && K && (re || pe || fe)), Ce = {};
        k !== "axis" && K && K.props.trigger === "click" ? Ce = {
          onClick: Gs(w.handleItemMouseEnter, T.props.onClick)
        } : k !== "axis" && (Ce = {
          onMouseLeave: Gs(w.handleItemMouseLeave, T.props.onMouseLeave),
          onMouseEnter: Gs(w.handleItemMouseEnter, T.props.onMouseEnter)
        });
        var ce = /* @__PURE__ */ J.cloneElement(T, ie(ie({}, z.props), Ce));
        function ge(Xt) {
          return typeof V.dataKey == "function" ? V.dataKey(Xt.payload) : null;
        }
        if (_e)
          if (Y >= 0) {
            var he, ue;
            if (V.dataKey && !V.allowDuplicatedCategory) {
              var qe = typeof V.dataKey == "function" ? ge : "payload.".concat(V.dataKey.toString());
              he = tf(G, qe, F), ue = ee && P && tf(P, qe, F);
            } else
              he = G == null ? void 0 : G[Y], ue = ee && P && P[Y];
            if (fe || pe) {
              var xe = T.props.activeIndex !== void 0 ? T.props.activeIndex : Y;
              return [/* @__PURE__ */ J.cloneElement(T, ie(ie(ie({}, z.props), Ce), {}, {
                activeIndex: xe
              })), null, null];
            }
            if (!we(he))
              return [ce].concat(Jo(w.renderActivePoints({
                item: z,
                activePoint: he,
                basePoint: ue,
                childIndex: Y,
                isRange: ee
              })));
          } else {
            var Qe, Ye = (Qe = w.getItemByXY(w.state.activeCoordinate)) !== null && Qe !== void 0 ? Qe : {
              graphicalItem: ce
            }, Et = Ye.graphicalItem, un = Et.item, Wt = un === void 0 ? T : un, On = Et.childIndex, Kt = ie(ie(ie({}, z.props), Ce), {}, {
              activeIndex: On
            });
            return [/* @__PURE__ */ J.cloneElement(Wt, Kt), null, null];
          }
        return ee ? [ce, null, null] : [ce, null];
      }), Oe(w, "renderCustomized", function(T, j, N) {
        return /* @__PURE__ */ J.cloneElement(T, ie(ie({
          key: "recharts-customized-".concat(N)
        }, w.props), w.state));
      }), Oe(w, "renderMap", {
        CartesianGrid: {
          handler: Fs,
          once: !0
        },
        ReferenceArea: {
          handler: w.renderReferenceElement
        },
        ReferenceLine: {
          handler: Fs
        },
        ReferenceDot: {
          handler: w.renderReferenceElement
        },
        XAxis: {
          handler: Fs
        },
        YAxis: {
          handler: Fs
        },
        Brush: {
          handler: w.renderBrush,
          once: !0
        },
        Bar: {
          handler: w.renderGraphicChild
        },
        Line: {
          handler: w.renderGraphicChild
        },
        Area: {
          handler: w.renderGraphicChild
        },
        Radar: {
          handler: w.renderGraphicChild
        },
        RadialBar: {
          handler: w.renderGraphicChild
        },
        Scatter: {
          handler: w.renderGraphicChild
        },
        Pie: {
          handler: w.renderGraphicChild
        },
        Funnel: {
          handler: w.renderGraphicChild
        },
        Tooltip: {
          handler: w.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: w.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: w.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: w.renderPolarAxis
        },
        Customized: {
          handler: w.renderCustomized
        }
      }), w.clipPathId = "".concat((M = E.id) !== null && M !== void 0 ? M : bi("recharts"), "-clip"), w.throttleTriggeredAfterMouseMove = eD(w.triggeredAfterMouseMove, (C = E.throttleDelay) !== null && C !== void 0 ? C : 1e3 / 60), w.state = {}, w;
    }
    return DK(A, x), EK(A, [{
      key: "componentDidMount",
      value: function() {
        var M, C;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (M = this.props.margin.left) !== null && M !== void 0 ? M : 0,
            top: (C = this.props.margin.top) !== null && C !== void 0 ? C : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var M = this.props, C = M.children, w = M.data, T = M.height, j = M.layout, N = xn(C, Sn);
        if (N) {
          var z = N.props.defaultIndex;
          if (!(typeof z != "number" || z < 0 || z > this.state.tooltipTicks.length - 1)) {
            var k = this.state.tooltipTicks[z] && this.state.tooltipTicks[z].value, B = M0(this.state, w, z, k), q = this.state.tooltipTicks[z].coordinate, V = (this.state.offset.top + T) / 2, Y = j === "horizontal", F = Y ? {
              x: q,
              y: V
            } : {
              y: q,
              x: V
            }, $ = this.state.formattedGraphicalItems.find(function(ne) {
              var G = ne.item;
              return G.type.name === "Scatter";
            });
            $ && (F = ie(ie({}, F), $.props.points[z].tooltipPosition), B = $.props.points[z].tooltipPayload);
            var K = {
              activeTooltipIndex: z,
              isTooltipActive: !0,
              activeLabel: k,
              activePayload: B,
              activeCoordinate: F
            };
            this.setState(K), this.renderCursor(N), this.accessibilityManager.setIndex(z);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(M, C) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== C.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== M.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== M.margin) {
          var w, T;
          this.accessibilityManager.setDetails({
            offset: {
              left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
              top: (T = this.props.margin.top) !== null && T !== void 0 ? T : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(M) {
        fb([xn(M.children, Sn)], [xn(this.props.children, Sn)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var M = xn(this.props.children, Sn);
        if (M && typeof M.props.shared == "boolean") {
          var C = M.props.shared ? "axis" : "item";
          return f.indexOf(C) >= 0 ? C : u;
        }
        return u;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function(M) {
        if (!this.container)
          return null;
        var C = this.container, w = C.getBoundingClientRect(), T = f8(w), j = {
          chartX: Math.round(M.pageX - T.left),
          chartY: Math.round(M.pageY - T.top)
        }, N = w.width / C.offsetWidth || 1, z = this.inRange(j.chartX, j.chartY, N);
        if (!z)
          return null;
        var k = this.state, B = k.xAxisMap, q = k.yAxisMap, V = this.getTooltipEventType(), Y = NM(this.state, this.props.data, this.props.layout, z);
        if (V !== "axis" && B && q) {
          var F = Ta(B).scale, $ = Ta(q).scale, K = F && F.invert ? F.invert(j.chartX) : null, ne = $ && $.invert ? $.invert(j.chartY) : null;
          return ie(ie({}, j), {}, {
            xValue: K,
            yValue: ne
          }, Y);
        }
        return Y ? ie(ie({}, j), Y) : null;
      }
    }, {
      key: "inRange",
      value: function(M, C) {
        var w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, T = this.props.layout, j = M / w, N = C / w;
        if (T === "horizontal" || T === "vertical") {
          var z = this.state.offset, k = j >= z.left && j <= z.left + z.width && N >= z.top && N <= z.top + z.height;
          return k ? {
            x: j,
            y: N
          } : null;
        }
        var B = this.state, q = B.angleAxisMap, V = B.radiusAxisMap;
        if (q && V) {
          var Y = Ta(q);
          return K2({
            x: j,
            y: N
          }, Y);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var M = this.props.children, C = this.getTooltipEventType(), w = xn(M, Sn), T = {};
        w && C === "axis" && (w.props.trigger === "click" ? T = {
          onClick: this.handleClick
        } : T = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var j = nf(this.props, this.handleOuterEvent);
        return ie(ie({}, j), T);
      }
    }, {
      key: "addListener",
      value: function() {
        tb.on(nb, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        tb.removeListener(nb, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(M, C, w) {
        for (var T = this.state.formattedGraphicalItems, j = 0, N = T.length; j < N; j++) {
          var z = T[j];
          if (z.item === M || z.props.key === M.key || C === Lr(z.item.type) && w === z.childIndex)
            return z;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var M = this.clipPathId, C = this.state.offset, w = C.left, T = C.top, j = C.height, N = C.width;
        return /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
          id: M
        }, /* @__PURE__ */ U.createElement("rect", {
          x: w,
          y: T,
          height: j,
          width: N
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var M = this.state.xAxisMap;
        return M ? Object.entries(M).reduce(function(C, w) {
          var T = CM(w, 2), j = T[0], N = T[1];
          return ie(ie({}, C), {}, Oe({}, j, N.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var M = this.state.yAxisMap;
        return M ? Object.entries(M).reduce(function(C, w) {
          var T = CM(w, 2), j = T[0], N = T[1];
          return ie(ie({}, C), {}, Oe({}, j, N.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(M) {
        var C;
        return (C = this.state.xAxisMap) === null || C === void 0 || (C = C[M]) === null || C === void 0 ? void 0 : C.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(M) {
        var C;
        return (C = this.state.yAxisMap) === null || C === void 0 || (C = C[M]) === null || C === void 0 ? void 0 : C.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(M) {
        var C = this.state, w = C.formattedGraphicalItems, T = C.activeItem;
        if (w && w.length)
          for (var j = 0, N = w.length; j < N; j++) {
            var z = w[j], k = z.props, B = z.item, q = B.type.defaultProps !== void 0 ? ie(ie({}, B.type.defaultProps), B.props) : B.props, V = Lr(B.type);
            if (V === "Bar") {
              var Y = (k.data || []).find(function(ne) {
                return P9(M, ne);
              });
              if (Y)
                return {
                  graphicalItem: z,
                  payload: Y
                };
            } else if (V === "RadialBar") {
              var F = (k.data || []).find(function(ne) {
                return K2(M, ne);
              });
              if (F)
                return {
                  graphicalItem: z,
                  payload: F
                };
            } else if (Ed(z, T) || jd(z, T) || ac(z, T)) {
              var $ = SH({
                graphicalItem: z,
                activeTooltipItem: T,
                itemData: q.data
              }), K = q.activeIndex === void 0 ? $ : q.activeIndex;
              return {
                graphicalItem: ie(ie({}, z), {}, {
                  childIndex: K
                }),
                payload: ac(z, T) ? q.data[$] : z.props.data[$]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var M = this;
        if (!aA(this))
          return null;
        var C = this.props, w = C.children, T = C.className, j = C.width, N = C.height, z = C.style, k = C.compact, B = C.title, q = C.desc, V = DM(C, xK), Y = Te(V, !1);
        if (k)
          return /* @__PURE__ */ U.createElement(lM, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ U.createElement(hb, _o({}, Y, {
            width: j,
            height: N,
            title: B,
            desc: q
          }), this.renderClipPath(), oA(w, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var F, $;
          Y.tabIndex = (F = this.props.tabIndex) !== null && F !== void 0 ? F : 0, Y.role = ($ = this.props.role) !== null && $ !== void 0 ? $ : "application", Y.onKeyDown = function(ne) {
            M.accessibilityManager.keyboardEvent(ne);
          }, Y.onFocus = function() {
            M.accessibilityManager.focus();
          };
        }
        var K = this.parseEventsOfWrapper();
        return /* @__PURE__ */ U.createElement(lM, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ U.createElement("div", _o({
          className: $e("recharts-wrapper", T),
          style: ie({
            position: "relative",
            cursor: "default",
            width: j,
            height: N
          }, z)
        }, K, {
          ref: function(G) {
            M.container = G;
          }
        }), /* @__PURE__ */ U.createElement(hb, _o({}, Y, {
          width: j,
          height: N,
          title: B,
          desc: q,
          style: qK
        }), this.renderClipPath(), oA(w, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(J.Component);
  Oe(_, "displayName", n), Oe(_, "defaultProps", ie({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: !1,
    syncMethod: "index"
  }, v)), Oe(_, "getDerivedStateFromProps", function(x, A) {
    var E = x.dataKey, M = x.data, C = x.children, w = x.width, T = x.height, j = x.layout, N = x.stackOffset, z = x.margin, k = A.dataStartIndex, B = A.dataEndIndex;
    if (A.updateId === void 0) {
      var q = RM(x);
      return ie(ie(ie({}, q), {}, {
        updateId: 0
      }, b(ie(ie({
        props: x
      }, q), {}, {
        updateId: 0
      }), A)), {}, {
        prevDataKey: E,
        prevData: M,
        prevWidth: w,
        prevHeight: T,
        prevLayout: j,
        prevStackOffset: N,
        prevMargin: z,
        prevChildren: C
      });
    }
    if (E !== A.prevDataKey || M !== A.prevData || w !== A.prevWidth || T !== A.prevHeight || j !== A.prevLayout || N !== A.prevStackOffset || !Oo(z, A.prevMargin)) {
      var V = RM(x), Y = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: A.chartX,
        chartY: A.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: A.isTooltipActive
      }, F = ie(ie({}, NM(A, M, j)), {}, {
        updateId: A.updateId + 1
      }), $ = ie(ie(ie({}, V), Y), F);
      return ie(ie(ie({}, $), b(ie({
        props: x
      }, $), A)), {}, {
        prevDataKey: E,
        prevData: M,
        prevWidth: w,
        prevHeight: T,
        prevLayout: j,
        prevStackOffset: N,
        prevMargin: z,
        prevChildren: C
      });
    }
    if (!fb(C, A.prevChildren)) {
      var K, ne, G, ee, P = xn(C, Lo), I = P && (K = (ne = P.props) === null || ne === void 0 ? void 0 : ne.startIndex) !== null && K !== void 0 ? K : k, re = P && (G = (ee = P.props) === null || ee === void 0 ? void 0 : ee.endIndex) !== null && G !== void 0 ? G : B, se = I !== k || re !== B, pe = !we(M), fe = pe && !se ? A.updateId : A.updateId + 1;
      return ie(ie({
        updateId: fe
      }, b(ie(ie({
        props: x
      }, A), {}, {
        updateId: fe,
        dataStartIndex: I,
        dataEndIndex: re
      }), A)), {}, {
        prevChildren: C,
        dataStartIndex: I,
        dataEndIndex: re
      });
    }
    return null;
  }), Oe(_, "renderActiveDot", function(x, A, E) {
    var M;
    return /* @__PURE__ */ J.isValidElement(x) ? M = /* @__PURE__ */ J.cloneElement(x, A) : Ee(x) ? M = x(A) : M = /* @__PURE__ */ U.createElement(Td, A), /* @__PURE__ */ U.createElement(Ie, {
      className: "recharts-active-dot",
      key: E
    }, M);
  });
  var S = /* @__PURE__ */ J.forwardRef(function(A, E) {
    return /* @__PURE__ */ U.createElement(_, _o({}, A, {
      ref: E
    }));
  });
  return S.displayName = _.displayName, S;
}, XK = Bd({
  chartName: "LineChart",
  GraphicalChild: Br,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }],
  formatAxisMap: Cd
}), VK = Bd({
  chartName: "BarChart",
  GraphicalChild: Kr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }],
  formatAxisMap: Cd
}), FK = Bd({
  chartName: "AreaChart",
  GraphicalChild: Wr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }],
  formatAxisMap: Cd
}), WK = Bd({
  chartName: "ComposedChart",
  GraphicalChild: [Br, Wr, Kr, qd],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }, {
    axisType: "zAxis",
    AxisComp: zd
  }],
  formatAxisMap: Cd
});
function Ws(e, t) {
  let n = 0, r = 0;
  for (const u of t)
    u == null || !isFinite(u) || (u < n && (n = u), u > r && (r = u));
  let o = 1;
  for (const u of [n, r]) o = Math.max(o, e(u).length);
  return Math.min(90, Math.ceil(o * 7) + 14);
}
const Zs = { top: 8, right: 12, bottom: 0, left: 0 }, zM = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#22d3ee",
  "#fb923c",
  "#4ade80",
  "#e879f9",
  "#93c5fd"
], mo = "var(--nb-border)", C0 = "var(--nb-muted)", D0 = "var(--nb-text)", Qs = "var(--nb-accent)", go = "var(--nb-green)", qM = "var(--nb-red)", Oa = { fill: C0, fontSize: 12 }, Js = {
  backgroundColor: "var(--nb-panel-2)",
  border: "1px solid var(--nb-border)",
  borderRadius: 8,
  color: D0,
  fontSize: 13
};
function ZK({
  rows: e,
  accounts: t,
  mode: n,
  range: r,
  masked: o = !1,
  compact: u = !0
}) {
  const c = r === "1d" || r === "1w", f = IO(Date.now()), d = e.some((j) => IO(j.ts) !== f), h = (j, N = !1) => Z3(j, N, d), y = (j) => h(j, c), v = (j, N) => N !== 0 ? (j - N) / Math.abs(N) : null, g = u ? HM : or, b = (j) => o ? Tu(j) : g(j), _ = (j) => o ? Tu(j) : or(j, !0);
  if (n === "flow") {
    const j = b$(e, t, r), N = (k) => o ? k.toFixed(2) : lb(k), z = (k) => o ? k.toFixed(1) : g(k);
    return /* @__PURE__ */ R.jsx(Bs, { width: "100%", height: 340, children: /* @__PURE__ */ R.jsxs(VK, { data: j, margin: Zs, children: [
      /* @__PURE__ */ R.jsx(gu, { stroke: mo, strokeDasharray: "3 3" }),
      /* @__PURE__ */ R.jsx(cr, { dataKey: "ts", tickFormatter: (k) => h(k), tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ R.jsx(sr, { tickFormatter: (k) => z(k), tick: Oa, width: Ws(z, j.map((k) => k.flow)) }),
      /* @__PURE__ */ R.jsx(
        Sn,
        {
          contentStyle: Js,
          labelFormatter: (k) => h(k),
          formatter: (k) => [N(k), "Net flow"],
          cursor: { fill: mo, fillOpacity: 0.4 }
        }
      ),
      /* @__PURE__ */ R.jsx(Kr, { dataKey: "flow", radius: [3, 3, 0, 0], isAnimationActive: !1, children: j.map((k, B) => /* @__PURE__ */ R.jsx(yd, { fill: k.flow >= 0 ? go : qM, fillOpacity: 0.8 }, B)) })
    ] }) });
  }
  if (n === "total") {
    const j = Vn(e[0], t), N = e.map((z) => {
      const k = Vn(z, t);
      return { ts: z.ts, total: o ? v(k, j) : k };
    });
    return /* @__PURE__ */ R.jsx(Bs, { width: "100%", height: 340, children: /* @__PURE__ */ R.jsxs(FK, { data: N, margin: Zs, children: [
      /* @__PURE__ */ R.jsxs("defs", { children: [
        /* @__PURE__ */ R.jsxs("linearGradient", { id: "nw", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ R.jsx("stop", { offset: "0%", stopColor: Qs, stopOpacity: 0.22 }),
          /* @__PURE__ */ R.jsx("stop", { offset: "100%", stopColor: Qs, stopOpacity: 0 })
        ] }),
        /* @__PURE__ */ R.jsxs("linearGradient", { id: "nwline", x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ R.jsx("stop", { offset: "0%", stopColor: Qs }),
          /* @__PURE__ */ R.jsx("stop", { offset: "100%", stopColor: go })
        ] })
      ] }),
      /* @__PURE__ */ R.jsx(gu, { stroke: mo, strokeDasharray: "3 3" }),
      /* @__PURE__ */ R.jsx(cr, { dataKey: "ts", tickFormatter: y, tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ R.jsx(sr, { tickFormatter: b, tick: Oa, width: Ws(b, N.map((z) => z.total)), domain: ["auto", "auto"] }),
      /* @__PURE__ */ R.jsx(
        Sn,
        {
          contentStyle: Js,
          labelFormatter: (z) => h(z, !0),
          formatter: (z) => [_(z), "Total"]
        }
      ),
      /* @__PURE__ */ R.jsx(
        Wr,
        {
          type: "monotone",
          dataKey: "total",
          stroke: "url(#nwline)",
          strokeWidth: 2.5,
          fill: "url(#nw)",
          dot: (z) => {
            const { cx: k, cy: B, index: q, key: V } = z;
            return q !== N.length - 1 || k == null || B == null ? /* @__PURE__ */ R.jsx("g", {}, V) : /* @__PURE__ */ R.jsxs("g", { children: [
              /* @__PURE__ */ R.jsx("circle", { cx: k, cy: B, r: 8, fill: go, fillOpacity: 0.25 }),
              /* @__PURE__ */ R.jsx("circle", { cx: k, cy: B, r: 4, fill: go })
            ] }, V);
          },
          activeDot: { r: 4, fill: go, stroke: "none" },
          isAnimationActive: !1
        }
      )
    ] }) });
  }
  if (n === "category") {
    const j = (k) => k.category === "retirement", N = {
      retirement: Vn(e[0], t, j),
      other: Vn(e[0], t, (k) => !j(k)),
      debt: ub(e[0], t)
    }, z = e.map((k) => {
      const B = Vn(k, t, j), q = Vn(k, t, (Y) => !j(Y)), V = ub(k, t);
      return o ? {
        ts: k.ts,
        retirement: v(B, N.retirement),
        other: v(q, N.other),
        debt: v(V, N.debt)
      } : { ts: k.ts, retirement: B, other: q, debt: V };
    });
    return /* @__PURE__ */ R.jsx(Bs, { width: "100%", height: 340, children: /* @__PURE__ */ R.jsxs(XK, { data: z, margin: Zs, children: [
      /* @__PURE__ */ R.jsx(gu, { stroke: mo, strokeDasharray: "3 3" }),
      /* @__PURE__ */ R.jsx(cr, { dataKey: "ts", tickFormatter: y, tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ R.jsx(
        sr,
        {
          tickFormatter: b,
          tick: Oa,
          width: Ws(b, z.flatMap((k) => [k.retirement, k.other, k.debt])),
          domain: ["auto", "auto"]
        }
      ),
      /* @__PURE__ */ R.jsx(
        Sn,
        {
          contentStyle: Js,
          labelFormatter: (k) => h(k, !0),
          formatter: (k, B) => [_(k), B]
        }
      ),
      /* @__PURE__ */ R.jsx(Br, { type: "monotone", dataKey: "retirement", stroke: go, strokeWidth: 2, dot: !1, isAnimationActive: !1 }),
      /* @__PURE__ */ R.jsx(Br, { type: "monotone", dataKey: "other", stroke: Qs, strokeWidth: 2, dot: !1, isAnimationActive: !1 }),
      /* @__PURE__ */ R.jsx(Br, { type: "monotone", dataKey: "debt", stroke: qM, strokeWidth: 2, dot: !1, isAnimationActive: !1 })
    ] }) });
  }
  const S = (j) => o ? `${j >= 0 ? "+" : ""}${j.toFixed(2)}` : lb(j), x = (j) => o ? j.toFixed(1) : g(j), A = x$(e, t, r), E = t.filter(
    (j) => A.some((N) => Math.abs(N.deltas[j.id] ?? 0) > 4e-3)
  ), M = A.map((j) => {
    const N = { ts: j.ts, net: j.net };
    for (const z of E) N[`a${z.id}`] = j.deltas[z.id] ?? 0;
    return N;
  }), C = A.flatMap((j) => {
    let N = 0, z = 0;
    for (const k of E) {
      const B = j.deltas[k.id] ?? 0;
      B >= 0 ? N += B : z += B;
    }
    return [N, z];
  }), w = (j) => `${j.org_name || j.org_domain} · ${j.nickname || j.name}`, T = ({
    active: j,
    payload: N,
    label: z
  }) => {
    if (!j || !N || N.length === 0) return null;
    const k = N.filter((q) => q.dataKey !== "net" && Math.abs(Number(q.value)) > 4e-3).sort((q, V) => Math.abs(Number(V.value)) - Math.abs(Number(q.value))), B = N.find((q) => q.dataKey === "net");
    return /* @__PURE__ */ R.jsxs("div", { style: { ...Js, padding: "8px 12px" }, children: [
      /* @__PURE__ */ R.jsx("div", { style: { marginBottom: 4 }, children: h(z ?? 0) }),
      k.map((q) => {
        const V = E.find((Y) => `a${Y.id}` === q.dataKey);
        return /* @__PURE__ */ R.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 16 }, children: [
          /* @__PURE__ */ R.jsx("span", { style: { color: q.color }, children: V ? w(V) : String(q.dataKey) }),
          /* @__PURE__ */ R.jsx("span", { children: S(Number(q.value)) })
        ] }, String(q.dataKey));
      }),
      B && /* @__PURE__ */ R.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 16, marginTop: 4, color: C0 }, children: [
        /* @__PURE__ */ R.jsx("span", { children: "net" }),
        /* @__PURE__ */ R.jsx("span", { children: S(Number(B.value)) })
      ] })
    ] });
  };
  return /* @__PURE__ */ R.jsx(Bs, { width: "100%", height: 340, children: /* @__PURE__ */ R.jsxs(WK, { data: M, stackOffset: "sign", margin: Zs, children: [
    /* @__PURE__ */ R.jsx(gu, { stroke: mo, strokeDasharray: "3 3" }),
    /* @__PURE__ */ R.jsx(cr, { dataKey: "ts", tickFormatter: (j) => h(j), tick: Oa, minTickGap: 40 }),
    /* @__PURE__ */ R.jsx(sr, { tickFormatter: x, tick: Oa, width: Ws(x, C) }),
    /* @__PURE__ */ R.jsx(Sn, { content: /* @__PURE__ */ R.jsx(T, {}), cursor: { fill: mo, fillOpacity: 0.4 } }),
    /* @__PURE__ */ R.jsx(Dd, { y: 0, stroke: C0, strokeOpacity: 0.6 }),
    E.map((j, N) => /* @__PURE__ */ R.jsx(
      Kr,
      {
        dataKey: `a${j.id}`,
        stackId: "delta",
        fill: zM[N % zM.length],
        fillOpacity: 0.8,
        isAnimationActive: !1
      },
      j.id
    )),
    /* @__PURE__ */ R.jsx(
      Br,
      {
        type: "monotone",
        dataKey: "net",
        stroke: D0,
        strokeWidth: 1.5,
        strokeOpacity: 0.65,
        strokeDasharray: "4 3",
        dot: { r: 2, fill: D0, strokeWidth: 0 },
        isAnimationActive: !1
      }
    )
  ] }) });
}
function pN({
  hass: e,
  config: t
}) {
  const n = Eo.find((A) => A.key === (t.view ?? "all")) ?? Eo[2], [r, o] = J.useState(t.range ?? "6m"), [u, c] = J.useState(
    t.mode && n.modes.includes(t.mode) ? t.mode : n.defaultMode
  ), { overview: f, series: d, masked: h, error: y } = $0(e, t.entry, r), v = WM(f), g = J.useMemo(() => v.filter(n.pick), [v, n]), b = J.useMemo(() => {
    if (!d) return [];
    const A = new Set(g.map((E) => E.id));
    return ZM(d.filter((E) => A.has(E.account_id)));
  }, [d, g]), _ = t.show_controls !== !1, S = _ && t.show_mode_selector !== !1 && n.modes.length > 1, x = _ && t.show_range_selector !== !1;
  return /* @__PURE__ */ R.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ R.jsx(el, { effect: tl(t) }),
    /* @__PURE__ */ R.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ R.jsx("h2", { children: t.title ?? n.label }),
      /* @__PURE__ */ R.jsx("span", { className: "head-right", children: (S || x) && /* @__PURE__ */ R.jsxs("span", { className: "controls", children: [
        S && /* @__PURE__ */ R.jsx(ef, { options: n.modes, value: u, onChange: c }),
        x && /* @__PURE__ */ R.jsx(ef, { options: R0, value: r, onChange: o })
      ] }) })
    ] }),
    y && /* @__PURE__ */ R.jsx("div", { className: "error-box", children: y }),
    !y && (!f || !d) && /* @__PURE__ */ R.jsx("div", { className: "status", children: "Loading…" }),
    !y && f && d && b.length === 0 && /* @__PURE__ */ R.jsx("div", { className: "status", children: "No data for this view yet." }),
    !y && f && d && b.length > 0 && /* @__PURE__ */ R.jsx(
      ZK,
      {
        rows: b,
        accounts: g,
        mode: u,
        range: r,
        masked: h,
        compact: t.compact !== !1
      }
    )
  ] });
}
var ab = { exports: {} }, pu = {}, ib = { exports: {} }, ob = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kM;
function QK() {
  return kM || (kM = 1, (function(e) {
    function t($, K) {
      var ne = $.length;
      $.push(K);
      e: for (; 0 < ne; ) {
        var G = ne - 1 >>> 1, ee = $[G];
        if (0 < o(ee, K))
          $[G] = K, $[ne] = ee, ne = G;
        else break e;
      }
    }
    function n($) {
      return $.length === 0 ? null : $[0];
    }
    function r($) {
      if ($.length === 0) return null;
      var K = $[0], ne = $.pop();
      if (ne !== K) {
        $[0] = ne;
        e: for (var G = 0, ee = $.length, P = ee >>> 1; G < P; ) {
          var I = 2 * (G + 1) - 1, re = $[I], se = I + 1, pe = $[se];
          if (0 > o(re, ne))
            se < ee && 0 > o(pe, re) ? ($[G] = pe, $[se] = ne, G = se) : ($[G] = re, $[I] = ne, G = I);
          else if (se < ee && 0 > o(pe, ne))
            $[G] = pe, $[se] = ne, G = se;
          else break e;
        }
      }
      return K;
    }
    function o($, K) {
      var ne = $.sortIndex - K.sortIndex;
      return ne !== 0 ? ne : $.id - K.id;
    }
    if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      e.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, f = c.now();
      e.unstable_now = function() {
        return c.now() - f;
      };
    }
    var d = [], h = [], y = 1, v = null, g = 3, b = !1, _ = !1, S = !1, x = !1, A = typeof setTimeout == "function" ? setTimeout : null, E = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
    function C($) {
      for (var K = n(h); K !== null; ) {
        if (K.callback === null) r(h);
        else if (K.startTime <= $)
          r(h), K.sortIndex = K.expirationTime, t(d, K);
        else break;
        K = n(h);
      }
    }
    function w($) {
      if (S = !1, C($), !_)
        if (n(d) !== null)
          _ = !0, T || (T = !0, q());
        else {
          var K = n(h);
          K !== null && F(w, K.startTime - $);
        }
    }
    var T = !1, j = -1, N = 5, z = -1;
    function k() {
      return x ? !0 : !(e.unstable_now() - z < N);
    }
    function B() {
      if (x = !1, T) {
        var $ = e.unstable_now();
        z = $;
        var K = !0;
        try {
          e: {
            _ = !1, S && (S = !1, E(j), j = -1), b = !0;
            var ne = g;
            try {
              t: {
                for (C($), v = n(d); v !== null && !(v.expirationTime > $ && k()); ) {
                  var G = v.callback;
                  if (typeof G == "function") {
                    v.callback = null, g = v.priorityLevel;
                    var ee = G(
                      v.expirationTime <= $
                    );
                    if ($ = e.unstable_now(), typeof ee == "function") {
                      v.callback = ee, C($), K = !0;
                      break t;
                    }
                    v === n(d) && r(d), C($);
                  } else r(d);
                  v = n(d);
                }
                if (v !== null) K = !0;
                else {
                  var P = n(h);
                  P !== null && F(
                    w,
                    P.startTime - $
                  ), K = !1;
                }
              }
              break e;
            } finally {
              v = null, g = ne, b = !1;
            }
            K = void 0;
          }
        } finally {
          K ? q() : T = !1;
        }
      }
    }
    var q;
    if (typeof M == "function")
      q = function() {
        M(B);
      };
    else if (typeof MessageChannel < "u") {
      var V = new MessageChannel(), Y = V.port2;
      V.port1.onmessage = B, q = function() {
        Y.postMessage(null);
      };
    } else
      q = function() {
        A(B, 0);
      };
    function F($, K) {
      j = A(function() {
        $(e.unstable_now());
      }, K);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function($) {
      $.callback = null;
    }, e.unstable_forceFrameRate = function($) {
      0 > $ || 125 < $ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : N = 0 < $ ? Math.floor(1e3 / $) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return g;
    }, e.unstable_next = function($) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var K = 3;
          break;
        default:
          K = g;
      }
      var ne = g;
      g = K;
      try {
        return $();
      } finally {
        g = ne;
      }
    }, e.unstable_requestPaint = function() {
      x = !0;
    }, e.unstable_runWithPriority = function($, K) {
      switch ($) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          $ = 3;
      }
      var ne = g;
      g = $;
      try {
        return K();
      } finally {
        g = ne;
      }
    }, e.unstable_scheduleCallback = function($, K, ne) {
      var G = e.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? G + ne : G) : ne = G, $) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return ee = ne + ee, $ = {
        id: y++,
        callback: K,
        priorityLevel: $,
        startTime: ne,
        expirationTime: ee,
        sortIndex: -1
      }, ne > G ? ($.sortIndex = ne, t(h, $), n(d) === null && $ === n(h) && (S ? (E(j), j = -1) : S = !0, F(w, ne - G))) : ($.sortIndex = ee, t(d, $), _ || b || (_ = !0, T || (T = !0, q()))), $;
    }, e.unstable_shouldYield = k, e.unstable_wrapCallback = function($) {
      var K = g;
      return function() {
        var ne = g;
        g = K;
        try {
          return $.apply(this, arguments);
        } finally {
          g = ne;
        }
      };
    };
  })(ob)), ob;
}
var BM;
function JK() {
  return BM || (BM = 1, ib.exports = QK()), ib.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var LM;
function eX() {
  if (LM) return pu;
  LM = 1;
  var e = JK(), t = P0(), n = GM();
  function r(a) {
    var i = "https://react.dev/errors/" + a;
    if (1 < arguments.length) {
      i += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        i += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + a + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(a) {
    return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11);
  }
  function u(a) {
    var i = a, l = a;
    if (a.alternate) for (; i.return; ) i = i.return;
    else {
      a = i;
      do
        i = a, (i.flags & 4098) !== 0 && (l = i.return), a = i.return;
      while (a);
    }
    return i.tag === 3 ? l : null;
  }
  function c(a) {
    if (a.tag === 13) {
      var i = a.memoizedState;
      if (i === null && (a = a.alternate, a !== null && (i = a.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function f(a) {
    if (a.tag === 31) {
      var i = a.memoizedState;
      if (i === null && (a = a.alternate, a !== null && (i = a.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function d(a) {
    if (u(a) !== a)
      throw Error(r(188));
  }
  function h(a) {
    var i = a.alternate;
    if (!i) {
      if (i = u(a), i === null) throw Error(r(188));
      return i !== a ? null : a;
    }
    for (var l = a, s = i; ; ) {
      var p = l.return;
      if (p === null) break;
      var m = p.alternate;
      if (m === null) {
        if (s = p.return, s !== null) {
          l = s;
          continue;
        }
        break;
      }
      if (p.child === m.child) {
        for (m = p.child; m; ) {
          if (m === l) return d(p), a;
          if (m === s) return d(p), i;
          m = m.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== s.return) l = p, s = m;
      else {
        for (var O = !1, D = p.child; D; ) {
          if (D === l) {
            O = !0, l = p, s = m;
            break;
          }
          if (D === s) {
            O = !0, s = p, l = m;
            break;
          }
          D = D.sibling;
        }
        if (!O) {
          for (D = m.child; D; ) {
            if (D === l) {
              O = !0, l = m, s = p;
              break;
            }
            if (D === s) {
              O = !0, s = m, l = p;
              break;
            }
            D = D.sibling;
          }
          if (!O) throw Error(r(189));
        }
      }
      if (l.alternate !== s) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? a : i;
  }
  function y(a) {
    var i = a.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return a;
    for (a = a.child; a !== null; ) {
      if (i = y(a), i !== null) return i;
      a = a.sibling;
    }
    return null;
  }
  var v = Object.assign, g = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), M = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), k = Symbol.for("react.memo_cache_sentinel"), B = Symbol.iterator;
  function q(a) {
    return a === null || typeof a != "object" ? null : (a = B && a[B] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var V = Symbol.for("react.client.reference");
  function Y(a) {
    if (a == null) return null;
    if (typeof a == "function")
      return a.$$typeof === V ? null : a.displayName || a.name || null;
    if (typeof a == "string") return a;
    switch (a) {
      case S:
        return "Fragment";
      case A:
        return "Profiler";
      case x:
        return "StrictMode";
      case w:
        return "Suspense";
      case T:
        return "SuspenseList";
      case z:
        return "Activity";
    }
    if (typeof a == "object")
      switch (a.$$typeof) {
        case _:
          return "Portal";
        case M:
          return a.displayName || "Context";
        case E:
          return (a._context.displayName || "Context") + ".Consumer";
        case C:
          var i = a.render;
          return a = a.displayName, a || (a = i.displayName || i.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
        case j:
          return i = a.displayName || null, i !== null ? i : Y(a.type) || "Memo";
        case N:
          i = a._payload, a = a._init;
          try {
            return Y(a(i));
          } catch {
          }
      }
    return null;
  }
  var F = Array.isArray, $ = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], ee = -1;
  function P(a) {
    return { current: a };
  }
  function I(a) {
    0 > ee || (a.current = G[ee], G[ee] = null, ee--);
  }
  function re(a, i) {
    ee++, G[ee] = a.current, a.current = i;
  }
  var se = P(null), pe = P(null), fe = P(null), _e = P(null);
  function Ce(a, i) {
    switch (re(fe, i), re(pe, a), re(se, null), i.nodeType) {
      case 9:
      case 11:
        a = (a = i.documentElement) && (a = a.namespaceURI) ? lO(a) : 0;
        break;
      default:
        if (a = i.tagName, i = i.namespaceURI)
          i = lO(i), a = uO(i, a);
        else
          switch (a) {
            case "svg":
              a = 1;
              break;
            case "math":
              a = 2;
              break;
            default:
              a = 0;
          }
    }
    I(se), re(se, a);
  }
  function ce() {
    I(se), I(pe), I(fe);
  }
  function ge(a) {
    a.memoizedState !== null && re(_e, a);
    var i = se.current, l = uO(i, a.type);
    i !== l && (re(pe, a), re(se, l));
  }
  function he(a) {
    pe.current === a && (I(se), I(pe)), _e.current === a && (I(_e), Jl._currentValue = ne);
  }
  var ue, qe;
  function xe(a) {
    if (ue === void 0)
      try {
        throw Error();
      } catch (l) {
        var i = l.stack.trim().match(/\n( *(at )?)/);
        ue = i && i[1] || "", qe = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ue + a + qe;
  }
  var Qe = !1;
  function Ye(a, i) {
    if (!a || Qe) return "";
    Qe = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (i) {
              var le = function() {
                throw Error();
              };
              if (Object.defineProperty(le.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(le, []);
                } catch (te) {
                  var Q = te;
                }
                Reflect.construct(a, [], le);
              } else {
                try {
                  le.call();
                } catch (te) {
                  Q = te;
                }
                a.call(le.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (te) {
                Q = te;
              }
              (le = a()) && typeof le.catch == "function" && le.catch(function() {
              });
            }
          } catch (te) {
            if (te && Q && typeof te.stack == "string")
              return [te.stack, Q.stack];
          }
          return [null, null];
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var p = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      p && p.configurable && Object.defineProperty(
        s.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var m = s.DetermineComponentFrameRoot(), O = m[0], D = m[1];
      if (O && D) {
        var L = O.split(`
`), Z = D.split(`
`);
        for (p = s = 0; s < L.length && !L[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; p < Z.length && !Z[p].includes(
          "DetermineComponentFrameRoot"
        ); )
          p++;
        if (s === L.length || p === Z.length)
          for (s = L.length - 1, p = Z.length - 1; 1 <= s && 0 <= p && L[s] !== Z[p]; )
            p--;
        for (; 1 <= s && 0 <= p; s--, p--)
          if (L[s] !== Z[p]) {
            if (s !== 1 || p !== 1)
              do
                if (s--, p--, 0 > p || L[s] !== Z[p]) {
                  var ae = `
` + L[s].replace(" at new ", " at ");
                  return a.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", a.displayName)), ae;
                }
              while (1 <= s && 0 <= p);
            break;
          }
      }
    } finally {
      Qe = !1, Error.prepareStackTrace = l;
    }
    return (l = a ? a.displayName || a.name : "") ? xe(l) : "";
  }
  function Et(a, i) {
    switch (a.tag) {
      case 26:
      case 27:
      case 5:
        return xe(a.type);
      case 16:
        return xe("Lazy");
      case 13:
        return a.child !== i && i !== null ? xe("Suspense Fallback") : xe("Suspense");
      case 19:
        return xe("SuspenseList");
      case 0:
      case 15:
        return Ye(a.type, !1);
      case 11:
        return Ye(a.type.render, !1);
      case 1:
        return Ye(a.type, !0);
      case 31:
        return xe("Activity");
      default:
        return "";
    }
  }
  function un(a) {
    try {
      var i = "", l = null;
      do
        i += Et(a, l), l = a, a = a.return;
      while (a);
      return i;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  var Wt = Object.prototype.hasOwnProperty, On = e.unstable_scheduleCallback, Kt = e.unstable_cancelCallback, Xt = e.unstable_shouldYield, Zr = e.unstable_requestPaint, Lt = e.unstable_now, mc = e.unstable_getCurrentPriorityLevel, B1 = e.unstable_ImmediatePriority, L1 = e.unstable_UserBlockingPriority, gc = e.unstable_NormalPriority, mN = e.unstable_LowPriority, U1 = e.unstable_IdlePriority, gN = e.log, bN = e.unstable_setDisableYieldValue, fl = null, cn = null;
  function Qr(a) {
    if (typeof gN == "function" && bN(a), cn && typeof cn.setStrictMode == "function")
      try {
        cn.setStrictMode(fl, a);
      } catch {
      }
  }
  var sn = Math.clz32 ? Math.clz32 : _N, xN = Math.log, SN = Math.LN2;
  function _N(a) {
    return a >>>= 0, a === 0 ? 32 : 31 - (xN(a) / SN | 0) | 0;
  }
  var bc = 256, xc = 262144, Sc = 4194304;
  function qa(a) {
    var i = a & 42;
    if (i !== 0) return i;
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return a & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return a & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return a;
    }
  }
  function _c(a, i, l) {
    var s = a.pendingLanes;
    if (s === 0) return 0;
    var p = 0, m = a.suspendedLanes, O = a.pingedLanes;
    a = a.warmLanes;
    var D = s & 134217727;
    return D !== 0 ? (s = D & ~m, s !== 0 ? p = qa(s) : (O &= D, O !== 0 ? p = qa(O) : l || (l = D & ~a, l !== 0 && (p = qa(l))))) : (D = s & ~m, D !== 0 ? p = qa(D) : O !== 0 ? p = qa(O) : l || (l = s & ~a, l !== 0 && (p = qa(l)))), p === 0 ? 0 : i !== 0 && i !== p && (i & m) === 0 && (m = p & -p, l = i & -i, m >= l || m === 32 && (l & 4194048) !== 0) ? i : p;
  }
  function dl(a, i) {
    return (a.pendingLanes & ~(a.suspendedLanes & ~a.pingedLanes) & i) === 0;
  }
  function ON(a, i) {
    switch (a) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return i + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function I1() {
    var a = Sc;
    return Sc <<= 1, (Sc & 62914560) === 0 && (Sc = 4194304), a;
  }
  function Id(a) {
    for (var i = [], l = 0; 31 > l; l++) i.push(a);
    return i;
  }
  function hl(a, i) {
    a.pendingLanes |= i, i !== 268435456 && (a.suspendedLanes = 0, a.pingedLanes = 0, a.warmLanes = 0);
  }
  function wN(a, i, l, s, p, m) {
    var O = a.pendingLanes;
    a.pendingLanes = l, a.suspendedLanes = 0, a.pingedLanes = 0, a.warmLanes = 0, a.expiredLanes &= l, a.entangledLanes &= l, a.errorRecoveryDisabledLanes &= l, a.shellSuspendCounter = 0;
    var D = a.entanglements, L = a.expirationTimes, Z = a.hiddenUpdates;
    for (l = O & ~l; 0 < l; ) {
      var ae = 31 - sn(l), le = 1 << ae;
      D[ae] = 0, L[ae] = -1;
      var Q = Z[ae];
      if (Q !== null)
        for (Z[ae] = null, ae = 0; ae < Q.length; ae++) {
          var te = Q[ae];
          te !== null && (te.lane &= -536870913);
        }
      l &= ~le;
    }
    s !== 0 && H1(a, s, 0), m !== 0 && p === 0 && a.tag !== 0 && (a.suspendedLanes |= m & ~(O & ~i));
  }
  function H1(a, i, l) {
    a.pendingLanes |= i, a.suspendedLanes &= ~i;
    var s = 31 - sn(i);
    a.entangledLanes |= i, a.entanglements[s] = a.entanglements[s] | 1073741824 | l & 261930;
  }
  function G1(a, i) {
    var l = a.entangledLanes |= i;
    for (a = a.entanglements; l; ) {
      var s = 31 - sn(l), p = 1 << s;
      p & i | a[s] & i && (a[s] |= i), l &= ~p;
    }
  }
  function Y1(a, i) {
    var l = i & -i;
    return l = (l & 42) !== 0 ? 1 : Hd(l), (l & (a.suspendedLanes | i)) !== 0 ? 0 : l;
  }
  function Hd(a) {
    switch (a) {
      case 2:
        a = 1;
        break;
      case 8:
        a = 4;
        break;
      case 32:
        a = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        a = 128;
        break;
      case 268435456:
        a = 134217728;
        break;
      default:
        a = 0;
    }
    return a;
  }
  function Gd(a) {
    return a &= -a, 2 < a ? 8 < a ? (a & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function K1() {
    var a = K.p;
    return a !== 0 ? a : (a = window.event, a === void 0 ? 32 : DO(a.type));
  }
  function X1(a, i) {
    var l = K.p;
    try {
      return K.p = a, i();
    } finally {
      K.p = l;
    }
  }
  var Jr = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + Jr, Zt = "__reactProps$" + Jr, ji = "__reactContainer$" + Jr, Yd = "__reactEvents$" + Jr, AN = "__reactListeners$" + Jr, TN = "__reactHandles$" + Jr, V1 = "__reactResources$" + Jr, pl = "__reactMarker$" + Jr;
  function Kd(a) {
    delete a[Pt], delete a[Zt], delete a[Yd], delete a[AN], delete a[TN];
  }
  function Mi(a) {
    var i = a[Pt];
    if (i) return i;
    for (var l = a.parentNode; l; ) {
      if (i = l[ji] || l[Pt]) {
        if (l = i.alternate, i.child !== null || l !== null && l.child !== null)
          for (a = vO(a); a !== null; ) {
            if (l = a[Pt]) return l;
            a = vO(a);
          }
        return i;
      }
      a = l, l = a.parentNode;
    }
    return null;
  }
  function Ci(a) {
    if (a = a[Pt] || a[ji]) {
      var i = a.tag;
      if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3)
        return a;
    }
    return null;
  }
  function vl(a) {
    var i = a.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return a.stateNode;
    throw Error(r(33));
  }
  function Di(a) {
    var i = a[V1];
    return i || (i = a[V1] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), i;
  }
  function jt(a) {
    a[pl] = !0;
  }
  var F1 = /* @__PURE__ */ new Set(), W1 = {};
  function ka(a, i) {
    Pi(a, i), Pi(a + "Capture", i);
  }
  function Pi(a, i) {
    for (W1[a] = i, a = 0; a < i.length; a++)
      F1.add(i[a]);
  }
  var EN = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Z1 = {}, Q1 = {};
  function jN(a) {
    return Wt.call(Q1, a) ? !0 : Wt.call(Z1, a) ? !1 : EN.test(a) ? Q1[a] = !0 : (Z1[a] = !0, !1);
  }
  function Oc(a, i, l) {
    if (jN(i))
      if (l === null) a.removeAttribute(i);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            a.removeAttribute(i);
            return;
          case "boolean":
            var s = i.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              a.removeAttribute(i);
              return;
            }
        }
        a.setAttribute(i, "" + l);
      }
  }
  function wc(a, i, l) {
    if (l === null) a.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          a.removeAttribute(i);
          return;
      }
      a.setAttribute(i, "" + l);
    }
  }
  function yr(a, i, l, s) {
    if (s === null) a.removeAttribute(l);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          a.removeAttribute(l);
          return;
      }
      a.setAttributeNS(i, l, "" + s);
    }
  }
  function wn(a) {
    switch (typeof a) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function J1(a) {
    var i = a.type;
    return (a = a.nodeName) && a.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function MN(a, i, l) {
    var s = Object.getOwnPropertyDescriptor(
      a.constructor.prototype,
      i
    );
    if (!a.hasOwnProperty(i) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var p = s.get, m = s.set;
      return Object.defineProperty(a, i, {
        configurable: !0,
        get: function() {
          return p.call(this);
        },
        set: function(O) {
          l = "" + O, m.call(this, O);
        }
      }), Object.defineProperty(a, i, {
        enumerable: s.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(O) {
          l = "" + O;
        },
        stopTracking: function() {
          a._valueTracker = null, delete a[i];
        }
      };
    }
  }
  function Xd(a) {
    if (!a._valueTracker) {
      var i = J1(a) ? "checked" : "value";
      a._valueTracker = MN(
        a,
        i,
        "" + a[i]
      );
    }
  }
  function ex(a) {
    if (!a) return !1;
    var i = a._valueTracker;
    if (!i) return !0;
    var l = i.getValue(), s = "";
    return a && (s = J1(a) ? a.checked ? "true" : "false" : a.value), a = s, a !== l ? (i.setValue(a), !0) : !1;
  }
  function Ac(a) {
    if (a = a || (typeof document < "u" ? document : void 0), typeof a > "u") return null;
    try {
      return a.activeElement || a.body;
    } catch {
      return a.body;
    }
  }
  var CN = /[\n"\\]/g;
  function An(a) {
    return a.replace(
      CN,
      function(i) {
        return "\\" + i.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Vd(a, i, l, s, p, m, O, D) {
    a.name = "", O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" ? a.type = O : a.removeAttribute("type"), i != null ? O === "number" ? (i === 0 && a.value === "" || a.value != i) && (a.value = "" + wn(i)) : a.value !== "" + wn(i) && (a.value = "" + wn(i)) : O !== "submit" && O !== "reset" || a.removeAttribute("value"), i != null ? Fd(a, O, wn(i)) : l != null ? Fd(a, O, wn(l)) : s != null && a.removeAttribute("value"), p == null && m != null && (a.defaultChecked = !!m), p != null && (a.checked = p && typeof p != "function" && typeof p != "symbol"), D != null && typeof D != "function" && typeof D != "symbol" && typeof D != "boolean" ? a.name = "" + wn(D) : a.removeAttribute("name");
  }
  function tx(a, i, l, s, p, m, O, D) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (a.type = m), i != null || l != null) {
      if (!(m !== "submit" && m !== "reset" || i != null)) {
        Xd(a);
        return;
      }
      l = l != null ? "" + wn(l) : "", i = i != null ? "" + wn(i) : l, D || i === a.value || (a.value = i), a.defaultValue = i;
    }
    s = s ?? p, s = typeof s != "function" && typeof s != "symbol" && !!s, a.checked = D ? a.checked : !!s, a.defaultChecked = !!s, O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" && (a.name = O), Xd(a);
  }
  function Fd(a, i, l) {
    i === "number" && Ac(a.ownerDocument) === a || a.defaultValue === "" + l || (a.defaultValue = "" + l);
  }
  function Ni(a, i, l, s) {
    if (a = a.options, i) {
      i = {};
      for (var p = 0; p < l.length; p++)
        i["$" + l[p]] = !0;
      for (l = 0; l < a.length; l++)
        p = i.hasOwnProperty("$" + a[l].value), a[l].selected !== p && (a[l].selected = p), p && s && (a[l].defaultSelected = !0);
    } else {
      for (l = "" + wn(l), i = null, p = 0; p < a.length; p++) {
        if (a[p].value === l) {
          a[p].selected = !0, s && (a[p].defaultSelected = !0);
          return;
        }
        i !== null || a[p].disabled || (i = a[p]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function nx(a, i, l) {
    if (i != null && (i = "" + wn(i), i !== a.value && (a.value = i), l == null)) {
      a.defaultValue !== i && (a.defaultValue = i);
      return;
    }
    a.defaultValue = l != null ? "" + wn(l) : "";
  }
  function rx(a, i, l, s) {
    if (i == null) {
      if (s != null) {
        if (l != null) throw Error(r(92));
        if (F(s)) {
          if (1 < s.length) throw Error(r(93));
          s = s[0];
        }
        l = s;
      }
      l == null && (l = ""), i = l;
    }
    l = wn(i), a.defaultValue = l, s = a.textContent, s === l && s !== "" && s !== null && (a.value = s), Xd(a);
  }
  function Ri(a, i) {
    if (i) {
      var l = a.firstChild;
      if (l && l === a.lastChild && l.nodeType === 3) {
        l.nodeValue = i;
        return;
      }
    }
    a.textContent = i;
  }
  var DN = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ax(a, i, l) {
    var s = i.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? s ? a.setProperty(i, "") : i === "float" ? a.cssFloat = "" : a[i] = "" : s ? a.setProperty(i, l) : typeof l != "number" || l === 0 || DN.has(i) ? i === "float" ? a.cssFloat = l : a[i] = ("" + l).trim() : a[i] = l + "px";
  }
  function ix(a, i, l) {
    if (i != null && typeof i != "object")
      throw Error(r(62));
    if (a = a.style, l != null) {
      for (var s in l)
        !l.hasOwnProperty(s) || i != null && i.hasOwnProperty(s) || (s.indexOf("--") === 0 ? a.setProperty(s, "") : s === "float" ? a.cssFloat = "" : a[s] = "");
      for (var p in i)
        s = i[p], i.hasOwnProperty(p) && l[p] !== s && ax(a, p, s);
    } else
      for (var m in i)
        i.hasOwnProperty(m) && ax(a, m, i[m]);
  }
  function Wd(a) {
    if (a.indexOf("-") === -1) return !1;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var PN = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), NN = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Tc(a) {
    return NN.test("" + a) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : a;
  }
  function mr() {
  }
  var Zd = null;
  function Qd(a) {
    return a = a.target || a.srcElement || window, a.correspondingUseElement && (a = a.correspondingUseElement), a.nodeType === 3 ? a.parentNode : a;
  }
  var $i = null, zi = null;
  function ox(a) {
    var i = Ci(a);
    if (i && (a = i.stateNode)) {
      var l = a[Zt] || null;
      e: switch (a = i.stateNode, i.type) {
        case "input":
          if (Vd(
            a,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), i = l.name, l.type === "radio" && i != null) {
            for (l = a; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + An(
                "" + i
              ) + '"][type="radio"]'
            ), i = 0; i < l.length; i++) {
              var s = l[i];
              if (s !== a && s.form === a.form) {
                var p = s[Zt] || null;
                if (!p) throw Error(r(90));
                Vd(
                  s,
                  p.value,
                  p.defaultValue,
                  p.defaultValue,
                  p.checked,
                  p.defaultChecked,
                  p.type,
                  p.name
                );
              }
            }
            for (i = 0; i < l.length; i++)
              s = l[i], s.form === a.form && ex(s);
          }
          break e;
        case "textarea":
          nx(a, l.value, l.defaultValue);
          break e;
        case "select":
          i = l.value, i != null && Ni(a, !!l.multiple, i, !1);
      }
    }
  }
  var Jd = !1;
  function lx(a, i, l) {
    if (Jd) return a(i, l);
    Jd = !0;
    try {
      var s = a(i);
      return s;
    } finally {
      if (Jd = !1, ($i !== null || zi !== null) && (hs(), $i && (i = $i, a = zi, zi = $i = null, ox(i), a)))
        for (i = 0; i < a.length; i++) ox(a[i]);
    }
  }
  function yl(a, i) {
    var l = a.stateNode;
    if (l === null) return null;
    var s = l[Zt] || null;
    if (s === null) return null;
    l = s[i];
    e: switch (i) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) || (a = a.type, s = !(a === "button" || a === "input" || a === "select" || a === "textarea")), a = !s;
        break e;
      default:
        a = !1;
    }
    if (a) return null;
    if (l && typeof l != "function")
      throw Error(
        r(231, i, typeof l)
      );
    return l;
  }
  var gr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), eh = !1;
  if (gr)
    try {
      var ml = {};
      Object.defineProperty(ml, "passive", {
        get: function() {
          eh = !0;
        }
      }), window.addEventListener("test", ml, ml), window.removeEventListener("test", ml, ml);
    } catch {
      eh = !1;
    }
  var ea = null, th = null, Ec = null;
  function ux() {
    if (Ec) return Ec;
    var a, i = th, l = i.length, s, p = "value" in ea ? ea.value : ea.textContent, m = p.length;
    for (a = 0; a < l && i[a] === p[a]; a++) ;
    var O = l - a;
    for (s = 1; s <= O && i[l - s] === p[m - s]; s++) ;
    return Ec = p.slice(a, 1 < s ? 1 - s : void 0);
  }
  function jc(a) {
    var i = a.keyCode;
    return "charCode" in a ? (a = a.charCode, a === 0 && i === 13 && (a = 13)) : a = i, a === 10 && (a = 13), 32 <= a || a === 13 ? a : 0;
  }
  function Mc() {
    return !0;
  }
  function cx() {
    return !1;
  }
  function Qt(a) {
    function i(l, s, p, m, O) {
      this._reactName = l, this._targetInst = p, this.type = s, this.nativeEvent = m, this.target = O, this.currentTarget = null;
      for (var D in a)
        a.hasOwnProperty(D) && (l = a[D], this[D] = l ? l(m) : m[D]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Mc : cx, this.isPropagationStopped = cx, this;
    }
    return v(i.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Mc);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Mc);
      },
      persist: function() {
      },
      isPersistent: Mc
    }), i;
  }
  var Ba = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(a) {
      return a.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Cc = Qt(Ba), gl = v({}, Ba, { view: 0, detail: 0 }), RN = Qt(gl), nh, rh, bl, Dc = v({}, gl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ih,
    button: 0,
    buttons: 0,
    relatedTarget: function(a) {
      return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    },
    movementX: function(a) {
      return "movementX" in a ? a.movementX : (a !== bl && (bl && a.type === "mousemove" ? (nh = a.screenX - bl.screenX, rh = a.screenY - bl.screenY) : rh = nh = 0, bl = a), nh);
    },
    movementY: function(a) {
      return "movementY" in a ? a.movementY : rh;
    }
  }), sx = Qt(Dc), $N = v({}, Dc, { dataTransfer: 0 }), zN = Qt($N), qN = v({}, gl, { relatedTarget: 0 }), ah = Qt(qN), kN = v({}, Ba, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), BN = Qt(kN), LN = v({}, Ba, {
    clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    }
  }), UN = Qt(LN), IN = v({}, Ba, { data: 0 }), fx = Qt(IN), HN = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, GN = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, YN = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function KN(a) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(a) : (a = YN[a]) ? !!i[a] : !1;
  }
  function ih() {
    return KN;
  }
  var XN = v({}, gl, {
    key: function(a) {
      if (a.key) {
        var i = HN[a.key] || a.key;
        if (i !== "Unidentified") return i;
      }
      return a.type === "keypress" ? (a = jc(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? GN[a.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ih,
    charCode: function(a) {
      return a.type === "keypress" ? jc(a) : 0;
    },
    keyCode: function(a) {
      return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    },
    which: function(a) {
      return a.type === "keypress" ? jc(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    }
  }), VN = Qt(XN), FN = v({}, Dc, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), dx = Qt(FN), WN = v({}, gl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ih
  }), ZN = Qt(WN), QN = v({}, Ba, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), JN = Qt(QN), eR = v({}, Dc, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), tR = Qt(eR), nR = v({}, Ba, {
    newState: 0,
    oldState: 0
  }), rR = Qt(nR), aR = [9, 13, 27, 32], oh = gr && "CompositionEvent" in window, xl = null;
  gr && "documentMode" in document && (xl = document.documentMode);
  var iR = gr && "TextEvent" in window && !xl, hx = gr && (!oh || xl && 8 < xl && 11 >= xl), px = " ", vx = !1;
  function yx(a, i) {
    switch (a) {
      case "keyup":
        return aR.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function mx(a) {
    return a = a.detail, typeof a == "object" && "data" in a ? a.data : null;
  }
  var qi = !1;
  function oR(a, i) {
    switch (a) {
      case "compositionend":
        return mx(i);
      case "keypress":
        return i.which !== 32 ? null : (vx = !0, px);
      case "textInput":
        return a = i.data, a === px && vx ? null : a;
      default:
        return null;
    }
  }
  function lR(a, i) {
    if (qi)
      return a === "compositionend" || !oh && yx(a, i) ? (a = ux(), Ec = th = ea = null, qi = !1, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
          if (i.char && 1 < i.char.length)
            return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return hx && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var uR = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function gx(a) {
    var i = a && a.nodeName && a.nodeName.toLowerCase();
    return i === "input" ? !!uR[a.type] : i === "textarea";
  }
  function bx(a, i, l, s) {
    $i ? zi ? zi.push(s) : zi = [s] : $i = s, i = xs(i, "onChange"), 0 < i.length && (l = new Cc(
      "onChange",
      "change",
      null,
      l,
      s
    ), a.push({ event: l, listeners: i }));
  }
  var Sl = null, _l = null;
  function cR(a) {
    tO(a, 0);
  }
  function Pc(a) {
    var i = vl(a);
    if (ex(i)) return a;
  }
  function xx(a, i) {
    if (a === "change") return i;
  }
  var Sx = !1;
  if (gr) {
    var lh;
    if (gr) {
      var uh = "oninput" in document;
      if (!uh) {
        var _x = document.createElement("div");
        _x.setAttribute("oninput", "return;"), uh = typeof _x.oninput == "function";
      }
      lh = uh;
    } else lh = !1;
    Sx = lh && (!document.documentMode || 9 < document.documentMode);
  }
  function Ox() {
    Sl && (Sl.detachEvent("onpropertychange", wx), _l = Sl = null);
  }
  function wx(a) {
    if (a.propertyName === "value" && Pc(_l)) {
      var i = [];
      bx(
        i,
        _l,
        a,
        Qd(a)
      ), lx(cR, i);
    }
  }
  function sR(a, i, l) {
    a === "focusin" ? (Ox(), Sl = i, _l = l, Sl.attachEvent("onpropertychange", wx)) : a === "focusout" && Ox();
  }
  function fR(a) {
    if (a === "selectionchange" || a === "keyup" || a === "keydown")
      return Pc(_l);
  }
  function dR(a, i) {
    if (a === "click") return Pc(i);
  }
  function hR(a, i) {
    if (a === "input" || a === "change")
      return Pc(i);
  }
  function pR(a, i) {
    return a === i && (a !== 0 || 1 / a === 1 / i) || a !== a && i !== i;
  }
  var fn = typeof Object.is == "function" ? Object.is : pR;
  function Ol(a, i) {
    if (fn(a, i)) return !0;
    if (typeof a != "object" || a === null || typeof i != "object" || i === null)
      return !1;
    var l = Object.keys(a), s = Object.keys(i);
    if (l.length !== s.length) return !1;
    for (s = 0; s < l.length; s++) {
      var p = l[s];
      if (!Wt.call(i, p) || !fn(a[p], i[p]))
        return !1;
    }
    return !0;
  }
  function Ax(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Tx(a, i) {
    var l = Ax(a);
    a = 0;
    for (var s; l; ) {
      if (l.nodeType === 3) {
        if (s = a + l.textContent.length, a <= i && s >= i)
          return { node: l, offset: i - a };
        a = s;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Ax(l);
    }
  }
  function Ex(a, i) {
    return a && i ? a === i ? !0 : a && a.nodeType === 3 ? !1 : i && i.nodeType === 3 ? Ex(a, i.parentNode) : "contains" in a ? a.contains(i) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function jx(a) {
    a = a != null && a.ownerDocument != null && a.ownerDocument.defaultView != null ? a.ownerDocument.defaultView : window;
    for (var i = Ac(a.document); i instanceof a.HTMLIFrameElement; ) {
      try {
        var l = typeof i.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) a = i.contentWindow;
      else break;
      i = Ac(a.document);
    }
    return i;
  }
  function ch(a) {
    var i = a && a.nodeName && a.nodeName.toLowerCase();
    return i && (i === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || i === "textarea" || a.contentEditable === "true");
  }
  var vR = gr && "documentMode" in document && 11 >= document.documentMode, ki = null, sh = null, wl = null, fh = !1;
  function Mx(a, i, l) {
    var s = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    fh || ki == null || ki !== Ac(s) || (s = ki, "selectionStart" in s && ch(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), wl && Ol(wl, s) || (wl = s, s = xs(sh, "onSelect"), 0 < s.length && (i = new Cc(
      "onSelect",
      "select",
      null,
      i,
      l
    ), a.push({ event: i, listeners: s }), i.target = ki)));
  }
  function La(a, i) {
    var l = {};
    return l[a.toLowerCase()] = i.toLowerCase(), l["Webkit" + a] = "webkit" + i, l["Moz" + a] = "moz" + i, l;
  }
  var Bi = {
    animationend: La("Animation", "AnimationEnd"),
    animationiteration: La("Animation", "AnimationIteration"),
    animationstart: La("Animation", "AnimationStart"),
    transitionrun: La("Transition", "TransitionRun"),
    transitionstart: La("Transition", "TransitionStart"),
    transitioncancel: La("Transition", "TransitionCancel"),
    transitionend: La("Transition", "TransitionEnd")
  }, dh = {}, Cx = {};
  gr && (Cx = document.createElement("div").style, "AnimationEvent" in window || (delete Bi.animationend.animation, delete Bi.animationiteration.animation, delete Bi.animationstart.animation), "TransitionEvent" in window || delete Bi.transitionend.transition);
  function Ua(a) {
    if (dh[a]) return dh[a];
    if (!Bi[a]) return a;
    var i = Bi[a], l;
    for (l in i)
      if (i.hasOwnProperty(l) && l in Cx)
        return dh[a] = i[l];
    return a;
  }
  var Dx = Ua("animationend"), Px = Ua("animationiteration"), Nx = Ua("animationstart"), yR = Ua("transitionrun"), mR = Ua("transitionstart"), gR = Ua("transitioncancel"), Rx = Ua("transitionend"), $x = /* @__PURE__ */ new Map(), hh = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hh.push("scrollEnd");
  function In(a, i) {
    $x.set(a, i), ka(i, [a]);
  }
  var Nc = typeof reportError == "function" ? reportError : function(a) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var i = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof a == "object" && a !== null && typeof a.message == "string" ? String(a.message) : String(a),
        error: a
      });
      if (!window.dispatchEvent(i)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", a);
      return;
    }
    console.error(a);
  }, Tn = [], Li = 0, ph = 0;
  function Rc() {
    for (var a = Li, i = ph = Li = 0; i < a; ) {
      var l = Tn[i];
      Tn[i++] = null;
      var s = Tn[i];
      Tn[i++] = null;
      var p = Tn[i];
      Tn[i++] = null;
      var m = Tn[i];
      if (Tn[i++] = null, s !== null && p !== null) {
        var O = s.pending;
        O === null ? p.next = p : (p.next = O.next, O.next = p), s.pending = p;
      }
      m !== 0 && zx(l, p, m);
    }
  }
  function $c(a, i, l, s) {
    Tn[Li++] = a, Tn[Li++] = i, Tn[Li++] = l, Tn[Li++] = s, ph |= s, a.lanes |= s, a = a.alternate, a !== null && (a.lanes |= s);
  }
  function vh(a, i, l, s) {
    return $c(a, i, l, s), zc(a);
  }
  function Ia(a, i) {
    return $c(a, null, null, i), zc(a);
  }
  function zx(a, i, l) {
    a.lanes |= l;
    var s = a.alternate;
    s !== null && (s.lanes |= l);
    for (var p = !1, m = a.return; m !== null; )
      m.childLanes |= l, s = m.alternate, s !== null && (s.childLanes |= l), m.tag === 22 && (a = m.stateNode, a === null || a._visibility & 1 || (p = !0)), a = m, m = m.return;
    return a.tag === 3 ? (m = a.stateNode, p && i !== null && (p = 31 - sn(l), a = m.hiddenUpdates, s = a[p], s === null ? a[p] = [i] : s.push(i), i.lane = l | 536870912), m) : null;
  }
  function zc(a) {
    if (50 < Kl)
      throw Kl = 0, wp = null, Error(r(185));
    for (var i = a.return; i !== null; )
      a = i, i = a.return;
    return a.tag === 3 ? a.stateNode : null;
  }
  var Ui = {};
  function bR(a, i, l, s) {
    this.tag = a, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function dn(a, i, l, s) {
    return new bR(a, i, l, s);
  }
  function yh(a) {
    return a = a.prototype, !(!a || !a.isReactComponent);
  }
  function br(a, i) {
    var l = a.alternate;
    return l === null ? (l = dn(
      a.tag,
      i,
      a.key,
      a.mode
    ), l.elementType = a.elementType, l.type = a.type, l.stateNode = a.stateNode, l.alternate = a, a.alternate = l) : (l.pendingProps = i, l.type = a.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = a.flags & 65011712, l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, i = a.dependencies, l.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, l.sibling = a.sibling, l.index = a.index, l.ref = a.ref, l.refCleanup = a.refCleanup, l;
  }
  function qx(a, i) {
    a.flags &= 65011714;
    var l = a.alternate;
    return l === null ? (a.childLanes = 0, a.lanes = i, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, a.type = l.type, i = l.dependencies, a.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
    }), a;
  }
  function qc(a, i, l, s, p, m) {
    var O = 0;
    if (s = a, typeof a == "function") yh(a) && (O = 1);
    else if (typeof a == "string")
      O = w3(
        a,
        l,
        se.current
      ) ? 26 : a === "html" || a === "head" || a === "body" ? 27 : 5;
    else
      e: switch (a) {
        case z:
          return a = dn(31, l, i, p), a.elementType = z, a.lanes = m, a;
        case S:
          return Ha(l.children, p, m, i);
        case x:
          O = 8, p |= 24;
          break;
        case A:
          return a = dn(12, l, i, p | 2), a.elementType = A, a.lanes = m, a;
        case w:
          return a = dn(13, l, i, p), a.elementType = w, a.lanes = m, a;
        case T:
          return a = dn(19, l, i, p), a.elementType = T, a.lanes = m, a;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case M:
                O = 10;
                break e;
              case E:
                O = 9;
                break e;
              case C:
                O = 11;
                break e;
              case j:
                O = 14;
                break e;
              case N:
                O = 16, s = null;
                break e;
            }
          O = 29, l = Error(
            r(130, a === null ? "null" : typeof a, "")
          ), s = null;
      }
    return i = dn(O, l, i, p), i.elementType = a, i.type = s, i.lanes = m, i;
  }
  function Ha(a, i, l, s) {
    return a = dn(7, a, s, i), a.lanes = l, a;
  }
  function mh(a, i, l) {
    return a = dn(6, a, null, i), a.lanes = l, a;
  }
  function kx(a) {
    var i = dn(18, null, null, 0);
    return i.stateNode = a, i;
  }
  function gh(a, i, l) {
    return i = dn(
      4,
      a.children !== null ? a.children : [],
      a.key,
      i
    ), i.lanes = l, i.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    }, i;
  }
  var Bx = /* @__PURE__ */ new WeakMap();
  function En(a, i) {
    if (typeof a == "object" && a !== null) {
      var l = Bx.get(a);
      return l !== void 0 ? l : (i = {
        value: a,
        source: i,
        stack: un(i)
      }, Bx.set(a, i), i);
    }
    return {
      value: a,
      source: i,
      stack: un(i)
    };
  }
  var Ii = [], Hi = 0, kc = null, Al = 0, jn = [], Mn = 0, ta = null, Jn = 1, er = "";
  function xr(a, i) {
    Ii[Hi++] = Al, Ii[Hi++] = kc, kc = a, Al = i;
  }
  function Lx(a, i, l) {
    jn[Mn++] = Jn, jn[Mn++] = er, jn[Mn++] = ta, ta = a;
    var s = Jn;
    a = er;
    var p = 32 - sn(s) - 1;
    s &= ~(1 << p), l += 1;
    var m = 32 - sn(i) + p;
    if (30 < m) {
      var O = p - p % 5;
      m = (s & (1 << O) - 1).toString(32), s >>= O, p -= O, Jn = 1 << 32 - sn(i) + p | l << p | s, er = m + a;
    } else
      Jn = 1 << m | l << p | s, er = a;
  }
  function bh(a) {
    a.return !== null && (xr(a, 1), Lx(a, 1, 0));
  }
  function xh(a) {
    for (; a === kc; )
      kc = Ii[--Hi], Ii[Hi] = null, Al = Ii[--Hi], Ii[Hi] = null;
    for (; a === ta; )
      ta = jn[--Mn], jn[Mn] = null, er = jn[--Mn], jn[Mn] = null, Jn = jn[--Mn], jn[Mn] = null;
  }
  function Ux(a, i) {
    jn[Mn++] = Jn, jn[Mn++] = er, jn[Mn++] = ta, Jn = i.id, er = i.overflow, ta = a;
  }
  var Nt = null, rt = null, ze = !1, na = null, Cn = !1, Sh = Error(r(519));
  function ra(a) {
    var i = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Tl(En(i, a)), Sh;
  }
  function Ix(a) {
    var i = a.stateNode, l = a.type, s = a.memoizedProps;
    switch (i[Pt] = a, i[Zt] = s, l) {
      case "dialog":
        Pe("cancel", i), Pe("close", i);
        break;
      case "iframe":
      case "object":
      case "embed":
        Pe("load", i);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Vl.length; l++)
          Pe(Vl[l], i);
        break;
      case "source":
        Pe("error", i);
        break;
      case "img":
      case "image":
      case "link":
        Pe("error", i), Pe("load", i);
        break;
      case "details":
        Pe("toggle", i);
        break;
      case "input":
        Pe("invalid", i), tx(
          i,
          s.value,
          s.defaultValue,
          s.checked,
          s.defaultChecked,
          s.type,
          s.name,
          !0
        );
        break;
      case "select":
        Pe("invalid", i);
        break;
      case "textarea":
        Pe("invalid", i), rx(i, s.value, s.defaultValue, s.children);
    }
    l = s.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || i.textContent === "" + l || s.suppressHydrationWarning === !0 || iO(i.textContent, l) ? (s.popover != null && (Pe("beforetoggle", i), Pe("toggle", i)), s.onScroll != null && Pe("scroll", i), s.onScrollEnd != null && Pe("scrollend", i), s.onClick != null && (i.onclick = mr), i = !0) : i = !1, i || ra(a, !0);
  }
  function Hx(a) {
    for (Nt = a.return; Nt; )
      switch (Nt.tag) {
        case 5:
        case 31:
        case 13:
          Cn = !1;
          return;
        case 27:
        case 3:
          Cn = !0;
          return;
        default:
          Nt = Nt.return;
      }
  }
  function Gi(a) {
    if (a !== Nt) return !1;
    if (!ze) return Hx(a), ze = !0, !1;
    var i = a.tag, l;
    if ((l = i !== 3 && i !== 27) && ((l = i === 5) && (l = a.type, l = !(l !== "form" && l !== "button") || Bp(a.type, a.memoizedProps)), l = !l), l && rt && ra(a), Hx(a), i === 13) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
      rt = pO(a);
    } else if (i === 31) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
      rt = pO(a);
    } else
      i === 27 ? (i = rt, ma(a.type) ? (a = Gp, Gp = null, rt = a) : rt = i) : rt = Nt ? Pn(a.stateNode.nextSibling) : null;
    return !0;
  }
  function Ga() {
    rt = Nt = null, ze = !1;
  }
  function _h() {
    var a = na;
    return a !== null && (nn === null ? nn = a : nn.push.apply(
      nn,
      a
    ), na = null), a;
  }
  function Tl(a) {
    na === null ? na = [a] : na.push(a);
  }
  var Oh = P(null), Ya = null, Sr = null;
  function aa(a, i, l) {
    re(Oh, i._currentValue), i._currentValue = l;
  }
  function _r(a) {
    a._currentValue = Oh.current, I(Oh);
  }
  function wh(a, i, l) {
    for (; a !== null; ) {
      var s = a.alternate;
      if ((a.childLanes & i) !== i ? (a.childLanes |= i, s !== null && (s.childLanes |= i)) : s !== null && (s.childLanes & i) !== i && (s.childLanes |= i), a === l) break;
      a = a.return;
    }
  }
  function Ah(a, i, l, s) {
    var p = a.child;
    for (p !== null && (p.return = a); p !== null; ) {
      var m = p.dependencies;
      if (m !== null) {
        var O = p.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var D = m;
          m = p;
          for (var L = 0; L < i.length; L++)
            if (D.context === i[L]) {
              m.lanes |= l, D = m.alternate, D !== null && (D.lanes |= l), wh(
                m.return,
                l,
                a
              ), s || (O = null);
              break e;
            }
          m = D.next;
        }
      } else if (p.tag === 18) {
        if (O = p.return, O === null) throw Error(r(341));
        O.lanes |= l, m = O.alternate, m !== null && (m.lanes |= l), wh(O, l, a), O = null;
      } else O = p.child;
      if (O !== null) O.return = p;
      else
        for (O = p; O !== null; ) {
          if (O === a) {
            O = null;
            break;
          }
          if (p = O.sibling, p !== null) {
            p.return = O.return, O = p;
            break;
          }
          O = O.return;
        }
      p = O;
    }
  }
  function Yi(a, i, l, s) {
    a = null;
    for (var p = i, m = !1; p !== null; ) {
      if (!m) {
        if ((p.flags & 524288) !== 0) m = !0;
        else if ((p.flags & 262144) !== 0) break;
      }
      if (p.tag === 10) {
        var O = p.alternate;
        if (O === null) throw Error(r(387));
        if (O = O.memoizedProps, O !== null) {
          var D = p.type;
          fn(p.pendingProps.value, O.value) || (a !== null ? a.push(D) : a = [D]);
        }
      } else if (p === _e.current) {
        if (O = p.alternate, O === null) throw Error(r(387));
        O.memoizedState.memoizedState !== p.memoizedState.memoizedState && (a !== null ? a.push(Jl) : a = [Jl]);
      }
      p = p.return;
    }
    a !== null && Ah(
      i,
      a,
      l,
      s
    ), i.flags |= 262144;
  }
  function Bc(a) {
    for (a = a.firstContext; a !== null; ) {
      if (!fn(
        a.context._currentValue,
        a.memoizedValue
      ))
        return !0;
      a = a.next;
    }
    return !1;
  }
  function Ka(a) {
    Ya = a, Sr = null, a = a.dependencies, a !== null && (a.firstContext = null);
  }
  function Rt(a) {
    return Gx(Ya, a);
  }
  function Lc(a, i) {
    return Ya === null && Ka(a), Gx(a, i);
  }
  function Gx(a, i) {
    var l = i._currentValue;
    if (i = { context: i, memoizedValue: l, next: null }, Sr === null) {
      if (a === null) throw Error(r(308));
      Sr = i, a.dependencies = { lanes: 0, firstContext: i }, a.flags |= 524288;
    } else Sr = Sr.next = i;
    return l;
  }
  var xR = typeof AbortController < "u" ? AbortController : function() {
    var a = [], i = this.signal = {
      aborted: !1,
      addEventListener: function(l, s) {
        a.push(s);
      }
    };
    this.abort = function() {
      i.aborted = !0, a.forEach(function(l) {
        return l();
      });
    };
  }, SR = e.unstable_scheduleCallback, _R = e.unstable_NormalPriority, vt = {
    $$typeof: M,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Th() {
    return {
      controller: new xR(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function El(a) {
    a.refCount--, a.refCount === 0 && SR(_R, function() {
      a.controller.abort();
    });
  }
  var jl = null, Eh = 0, Ki = 0, Xi = null;
  function OR(a, i) {
    if (jl === null) {
      var l = jl = [];
      Eh = 0, Ki = Cp(), Xi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          l.push(s);
        }
      };
    }
    return Eh++, i.then(Yx, Yx), i;
  }
  function Yx() {
    if (--Eh === 0 && jl !== null) {
      Xi !== null && (Xi.status = "fulfilled");
      var a = jl;
      jl = null, Ki = 0, Xi = null;
      for (var i = 0; i < a.length; i++) (0, a[i])();
    }
  }
  function wR(a, i) {
    var l = [], s = {
      status: "pending",
      value: null,
      reason: null,
      then: function(p) {
        l.push(p);
      }
    };
    return a.then(
      function() {
        s.status = "fulfilled", s.value = i;
        for (var p = 0; p < l.length; p++) (0, l[p])(i);
      },
      function(p) {
        for (s.status = "rejected", s.reason = p, p = 0; p < l.length; p++)
          (0, l[p])(void 0);
      }
    ), s;
  }
  var Kx = $.S;
  $.S = function(a, i) {
    M_ = Lt(), typeof i == "object" && i !== null && typeof i.then == "function" && OR(a, i), Kx !== null && Kx(a, i);
  };
  var Xa = P(null);
  function jh() {
    var a = Xa.current;
    return a !== null ? a : Je.pooledCache;
  }
  function Uc(a, i) {
    i === null ? re(Xa, Xa.current) : re(Xa, i.pool);
  }
  function Xx() {
    var a = jh();
    return a === null ? null : { parent: vt._currentValue, pool: a };
  }
  var Vi = Error(r(460)), Mh = Error(r(474)), Ic = Error(r(542)), Hc = { then: function() {
  } };
  function Vx(a) {
    return a = a.status, a === "fulfilled" || a === "rejected";
  }
  function Fx(a, i, l) {
    switch (l = a[l], l === void 0 ? a.push(i) : l !== i && (i.then(mr, mr), i = l), i.status) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw a = i.reason, Zx(a), a;
      default:
        if (typeof i.status == "string") i.then(mr, mr);
        else {
          if (a = Je, a !== null && 100 < a.shellSuspendCounter)
            throw Error(r(482));
          a = i, a.status = "pending", a.then(
            function(s) {
              if (i.status === "pending") {
                var p = i;
                p.status = "fulfilled", p.value = s;
              }
            },
            function(s) {
              if (i.status === "pending") {
                var p = i;
                p.status = "rejected", p.reason = s;
              }
            }
          );
        }
        switch (i.status) {
          case "fulfilled":
            return i.value;
          case "rejected":
            throw a = i.reason, Zx(a), a;
        }
        throw Fa = i, Vi;
    }
  }
  function Va(a) {
    try {
      var i = a._init;
      return i(a._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Fa = l, Vi) : l;
    }
  }
  var Fa = null;
  function Wx() {
    if (Fa === null) throw Error(r(459));
    var a = Fa;
    return Fa = null, a;
  }
  function Zx(a) {
    if (a === Vi || a === Ic)
      throw Error(r(483));
  }
  var Fi = null, Ml = 0;
  function Gc(a) {
    var i = Ml;
    return Ml += 1, Fi === null && (Fi = []), Fx(Fi, a, i);
  }
  function Cl(a, i) {
    i = i.props.ref, a.ref = i !== void 0 ? i : null;
  }
  function Yc(a, i) {
    throw i.$$typeof === g ? Error(r(525)) : (a = Object.prototype.toString.call(i), Error(
      r(
        31,
        a === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : a
      )
    ));
  }
  function Qx(a) {
    function i(X, H) {
      if (a) {
        var W = X.deletions;
        W === null ? (X.deletions = [H], X.flags |= 16) : W.push(H);
      }
    }
    function l(X, H) {
      if (!a) return null;
      for (; H !== null; )
        i(X, H), H = H.sibling;
      return null;
    }
    function s(X) {
      for (var H = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? H.set(X.key, X) : H.set(X.index, X), X = X.sibling;
      return H;
    }
    function p(X, H) {
      return X = br(X, H), X.index = 0, X.sibling = null, X;
    }
    function m(X, H, W) {
      return X.index = W, a ? (W = X.alternate, W !== null ? (W = W.index, W < H ? (X.flags |= 67108866, H) : W) : (X.flags |= 67108866, H)) : (X.flags |= 1048576, H);
    }
    function O(X) {
      return a && X.alternate === null && (X.flags |= 67108866), X;
    }
    function D(X, H, W, oe) {
      return H === null || H.tag !== 6 ? (H = mh(W, X.mode, oe), H.return = X, H) : (H = p(H, W), H.return = X, H);
    }
    function L(X, H, W, oe) {
      var be = W.type;
      return be === S ? ae(
        X,
        H,
        W.props.children,
        oe,
        W.key
      ) : H !== null && (H.elementType === be || typeof be == "object" && be !== null && be.$$typeof === N && Va(be) === H.type) ? (H = p(H, W.props), Cl(H, W), H.return = X, H) : (H = qc(
        W.type,
        W.key,
        W.props,
        null,
        X.mode,
        oe
      ), Cl(H, W), H.return = X, H);
    }
    function Z(X, H, W, oe) {
      return H === null || H.tag !== 4 || H.stateNode.containerInfo !== W.containerInfo || H.stateNode.implementation !== W.implementation ? (H = gh(W, X.mode, oe), H.return = X, H) : (H = p(H, W.children || []), H.return = X, H);
    }
    function ae(X, H, W, oe, be) {
      return H === null || H.tag !== 7 ? (H = Ha(
        W,
        X.mode,
        oe,
        be
      ), H.return = X, H) : (H = p(H, W), H.return = X, H);
    }
    function le(X, H, W) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return H = mh(
          "" + H,
          X.mode,
          W
        ), H.return = X, H;
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case b:
            return W = qc(
              H.type,
              H.key,
              H.props,
              null,
              X.mode,
              W
            ), Cl(W, H), W.return = X, W;
          case _:
            return H = gh(
              H,
              X.mode,
              W
            ), H.return = X, H;
          case N:
            return H = Va(H), le(X, H, W);
        }
        if (F(H) || q(H))
          return H = Ha(
            H,
            X.mode,
            W,
            null
          ), H.return = X, H;
        if (typeof H.then == "function")
          return le(X, Gc(H), W);
        if (H.$$typeof === M)
          return le(
            X,
            Lc(X, H),
            W
          );
        Yc(X, H);
      }
      return null;
    }
    function Q(X, H, W, oe) {
      var be = H !== null ? H.key : null;
      if (typeof W == "string" && W !== "" || typeof W == "number" || typeof W == "bigint")
        return be !== null ? null : D(X, H, "" + W, oe);
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case b:
            return W.key === be ? L(X, H, W, oe) : null;
          case _:
            return W.key === be ? Z(X, H, W, oe) : null;
          case N:
            return W = Va(W), Q(X, H, W, oe);
        }
        if (F(W) || q(W))
          return be !== null ? null : ae(X, H, W, oe, null);
        if (typeof W.then == "function")
          return Q(
            X,
            H,
            Gc(W),
            oe
          );
        if (W.$$typeof === M)
          return Q(
            X,
            H,
            Lc(X, W),
            oe
          );
        Yc(X, W);
      }
      return null;
    }
    function te(X, H, W, oe, be) {
      if (typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint")
        return X = X.get(W) || null, D(H, X, "" + oe, be);
      if (typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case b:
            return X = X.get(
              oe.key === null ? W : oe.key
            ) || null, L(H, X, oe, be);
          case _:
            return X = X.get(
              oe.key === null ? W : oe.key
            ) || null, Z(H, X, oe, be);
          case N:
            return oe = Va(oe), te(
              X,
              H,
              W,
              oe,
              be
            );
        }
        if (F(oe) || q(oe))
          return X = X.get(W) || null, ae(H, X, oe, be, null);
        if (typeof oe.then == "function")
          return te(
            X,
            H,
            W,
            Gc(oe),
            be
          );
        if (oe.$$typeof === M)
          return te(
            X,
            H,
            W,
            Lc(H, oe),
            be
          );
        Yc(H, oe);
      }
      return null;
    }
    function ye(X, H, W, oe) {
      for (var be = null, ke = null, me = H, Me = H = 0, Re = null; me !== null && Me < W.length; Me++) {
        me.index > Me ? (Re = me, me = null) : Re = me.sibling;
        var Be = Q(
          X,
          me,
          W[Me],
          oe
        );
        if (Be === null) {
          me === null && (me = Re);
          break;
        }
        a && me && Be.alternate === null && i(X, me), H = m(Be, H, Me), ke === null ? be = Be : ke.sibling = Be, ke = Be, me = Re;
      }
      if (Me === W.length)
        return l(X, me), ze && xr(X, Me), be;
      if (me === null) {
        for (; Me < W.length; Me++)
          me = le(X, W[Me], oe), me !== null && (H = m(
            me,
            H,
            Me
          ), ke === null ? be = me : ke.sibling = me, ke = me);
        return ze && xr(X, Me), be;
      }
      for (me = s(me); Me < W.length; Me++)
        Re = te(
          me,
          X,
          Me,
          W[Me],
          oe
        ), Re !== null && (a && Re.alternate !== null && me.delete(
          Re.key === null ? Me : Re.key
        ), H = m(
          Re,
          H,
          Me
        ), ke === null ? be = Re : ke.sibling = Re, ke = Re);
      return a && me.forEach(function(_a) {
        return i(X, _a);
      }), ze && xr(X, Me), be;
    }
    function Se(X, H, W, oe) {
      if (W == null) throw Error(r(151));
      for (var be = null, ke = null, me = H, Me = H = 0, Re = null, Be = W.next(); me !== null && !Be.done; Me++, Be = W.next()) {
        me.index > Me ? (Re = me, me = null) : Re = me.sibling;
        var _a = Q(X, me, Be.value, oe);
        if (_a === null) {
          me === null && (me = Re);
          break;
        }
        a && me && _a.alternate === null && i(X, me), H = m(_a, H, Me), ke === null ? be = _a : ke.sibling = _a, ke = _a, me = Re;
      }
      if (Be.done)
        return l(X, me), ze && xr(X, Me), be;
      if (me === null) {
        for (; !Be.done; Me++, Be = W.next())
          Be = le(X, Be.value, oe), Be !== null && (H = m(Be, H, Me), ke === null ? be = Be : ke.sibling = Be, ke = Be);
        return ze && xr(X, Me), be;
      }
      for (me = s(me); !Be.done; Me++, Be = W.next())
        Be = te(me, X, Me, Be.value, oe), Be !== null && (a && Be.alternate !== null && me.delete(Be.key === null ? Me : Be.key), H = m(Be, H, Me), ke === null ? be = Be : ke.sibling = Be, ke = Be);
      return a && me.forEach(function($3) {
        return i(X, $3);
      }), ze && xr(X, Me), be;
    }
    function We(X, H, W, oe) {
      if (typeof W == "object" && W !== null && W.type === S && W.key === null && (W = W.props.children), typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case b:
            e: {
              for (var be = W.key; H !== null; ) {
                if (H.key === be) {
                  if (be = W.type, be === S) {
                    if (H.tag === 7) {
                      l(
                        X,
                        H.sibling
                      ), oe = p(
                        H,
                        W.props.children
                      ), oe.return = X, X = oe;
                      break e;
                    }
                  } else if (H.elementType === be || typeof be == "object" && be !== null && be.$$typeof === N && Va(be) === H.type) {
                    l(
                      X,
                      H.sibling
                    ), oe = p(H, W.props), Cl(oe, W), oe.return = X, X = oe;
                    break e;
                  }
                  l(X, H);
                  break;
                } else i(X, H);
                H = H.sibling;
              }
              W.type === S ? (oe = Ha(
                W.props.children,
                X.mode,
                oe,
                W.key
              ), oe.return = X, X = oe) : (oe = qc(
                W.type,
                W.key,
                W.props,
                null,
                X.mode,
                oe
              ), Cl(oe, W), oe.return = X, X = oe);
            }
            return O(X);
          case _:
            e: {
              for (be = W.key; H !== null; ) {
                if (H.key === be)
                  if (H.tag === 4 && H.stateNode.containerInfo === W.containerInfo && H.stateNode.implementation === W.implementation) {
                    l(
                      X,
                      H.sibling
                    ), oe = p(H, W.children || []), oe.return = X, X = oe;
                    break e;
                  } else {
                    l(X, H);
                    break;
                  }
                else i(X, H);
                H = H.sibling;
              }
              oe = gh(W, X.mode, oe), oe.return = X, X = oe;
            }
            return O(X);
          case N:
            return W = Va(W), We(
              X,
              H,
              W,
              oe
            );
        }
        if (F(W))
          return ye(
            X,
            H,
            W,
            oe
          );
        if (q(W)) {
          if (be = q(W), typeof be != "function") throw Error(r(150));
          return W = be.call(W), Se(
            X,
            H,
            W,
            oe
          );
        }
        if (typeof W.then == "function")
          return We(
            X,
            H,
            Gc(W),
            oe
          );
        if (W.$$typeof === M)
          return We(
            X,
            H,
            Lc(X, W),
            oe
          );
        Yc(X, W);
      }
      return typeof W == "string" && W !== "" || typeof W == "number" || typeof W == "bigint" ? (W = "" + W, H !== null && H.tag === 6 ? (l(X, H.sibling), oe = p(H, W), oe.return = X, X = oe) : (l(X, H), oe = mh(W, X.mode, oe), oe.return = X, X = oe), O(X)) : l(X, H);
    }
    return function(X, H, W, oe) {
      try {
        Ml = 0;
        var be = We(
          X,
          H,
          W,
          oe
        );
        return Fi = null, be;
      } catch (me) {
        if (me === Vi || me === Ic) throw me;
        var ke = dn(29, me, null, X.mode);
        return ke.lanes = oe, ke.return = X, ke;
      } finally {
      }
    };
  }
  var Wa = Qx(!0), Jx = Qx(!1), ia = !1;
  function Ch(a) {
    a.updateQueue = {
      baseState: a.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Dh(a, i) {
    a = a.updateQueue, i.updateQueue === a && (i.updateQueue = {
      baseState: a.baseState,
      firstBaseUpdate: a.firstBaseUpdate,
      lastBaseUpdate: a.lastBaseUpdate,
      shared: a.shared,
      callbacks: null
    });
  }
  function oa(a) {
    return { lane: a, tag: 0, payload: null, callback: null, next: null };
  }
  function la(a, i, l) {
    var s = a.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (Ue & 2) !== 0) {
      var p = s.pending;
      return p === null ? i.next = i : (i.next = p.next, p.next = i), s.pending = i, i = zc(a), zx(a, null, l), i;
    }
    return $c(a, s, i, l), zc(a);
  }
  function Dl(a, i, l) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (l & 4194048) !== 0)) {
      var s = i.lanes;
      s &= a.pendingLanes, l |= s, i.lanes = l, G1(a, l);
    }
  }
  function Ph(a, i) {
    var l = a.updateQueue, s = a.alternate;
    if (s !== null && (s = s.updateQueue, l === s)) {
      var p = null, m = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var O = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          m === null ? p = m = O : m = m.next = O, l = l.next;
        } while (l !== null);
        m === null ? p = m = i : m = m.next = i;
      } else p = m = i;
      l = {
        baseState: s.baseState,
        firstBaseUpdate: p,
        lastBaseUpdate: m,
        shared: s.shared,
        callbacks: s.callbacks
      }, a.updateQueue = l;
      return;
    }
    a = l.lastBaseUpdate, a === null ? l.firstBaseUpdate = i : a.next = i, l.lastBaseUpdate = i;
  }
  var Nh = !1;
  function Pl() {
    if (Nh) {
      var a = Xi;
      if (a !== null) throw a;
    }
  }
  function Nl(a, i, l, s) {
    Nh = !1;
    var p = a.updateQueue;
    ia = !1;
    var m = p.firstBaseUpdate, O = p.lastBaseUpdate, D = p.shared.pending;
    if (D !== null) {
      p.shared.pending = null;
      var L = D, Z = L.next;
      L.next = null, O === null ? m = Z : O.next = Z, O = L;
      var ae = a.alternate;
      ae !== null && (ae = ae.updateQueue, D = ae.lastBaseUpdate, D !== O && (D === null ? ae.firstBaseUpdate = Z : D.next = Z, ae.lastBaseUpdate = L));
    }
    if (m !== null) {
      var le = p.baseState;
      O = 0, ae = Z = L = null, D = m;
      do {
        var Q = D.lane & -536870913, te = Q !== D.lane;
        if (te ? (Ne & Q) === Q : (s & Q) === Q) {
          Q !== 0 && Q === Ki && (Nh = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: D.tag,
            payload: D.payload,
            callback: null,
            next: null
          });
          e: {
            var ye = a, Se = D;
            Q = i;
            var We = l;
            switch (Se.tag) {
              case 1:
                if (ye = Se.payload, typeof ye == "function") {
                  le = ye.call(We, le, Q);
                  break e;
                }
                le = ye;
                break e;
              case 3:
                ye.flags = ye.flags & -65537 | 128;
              case 0:
                if (ye = Se.payload, Q = typeof ye == "function" ? ye.call(We, le, Q) : ye, Q == null) break e;
                le = v({}, le, Q);
                break e;
              case 2:
                ia = !0;
            }
          }
          Q = D.callback, Q !== null && (a.flags |= 64, te && (a.flags |= 8192), te = p.callbacks, te === null ? p.callbacks = [Q] : te.push(Q));
        } else
          te = {
            lane: Q,
            tag: D.tag,
            payload: D.payload,
            callback: D.callback,
            next: null
          }, ae === null ? (Z = ae = te, L = le) : ae = ae.next = te, O |= Q;
        if (D = D.next, D === null) {
          if (D = p.shared.pending, D === null)
            break;
          te = D, D = te.next, te.next = null, p.lastBaseUpdate = te, p.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = le), p.baseState = L, p.firstBaseUpdate = Z, p.lastBaseUpdate = ae, m === null && (p.shared.lanes = 0), da |= O, a.lanes = O, a.memoizedState = le;
    }
  }
  function eS(a, i) {
    if (typeof a != "function")
      throw Error(r(191, a));
    a.call(i);
  }
  function tS(a, i) {
    var l = a.callbacks;
    if (l !== null)
      for (a.callbacks = null, a = 0; a < l.length; a++)
        eS(l[a], i);
  }
  var Wi = P(null), Kc = P(0);
  function nS(a, i) {
    a = Dr, re(Kc, a), re(Wi, i), Dr = a | i.baseLanes;
  }
  function Rh() {
    re(Kc, Dr), re(Wi, Wi.current);
  }
  function $h() {
    Dr = Kc.current, I(Wi), I(Kc);
  }
  var hn = P(null), Dn = null;
  function ua(a) {
    var i = a.alternate;
    re(dt, dt.current & 1), re(hn, a), Dn === null && (i === null || Wi.current !== null || i.memoizedState !== null) && (Dn = a);
  }
  function zh(a) {
    re(dt, dt.current), re(hn, a), Dn === null && (Dn = a);
  }
  function rS(a) {
    a.tag === 22 ? (re(dt, dt.current), re(hn, a), Dn === null && (Dn = a)) : ca();
  }
  function ca() {
    re(dt, dt.current), re(hn, hn.current);
  }
  function pn(a) {
    I(hn), Dn === a && (Dn = null), I(dt);
  }
  var dt = P(0);
  function Xc(a) {
    for (var i = a; i !== null; ) {
      if (i.tag === 13) {
        var l = i.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Ip(l) || Hp(l)))
          return i;
      } else if (i.tag === 19 && (i.memoizedProps.revealOrder === "forwards" || i.memoizedProps.revealOrder === "backwards" || i.memoizedProps.revealOrder === "unstable_legacy-backwards" || i.memoizedProps.revealOrder === "together")) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === a) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === a) return null;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
    return null;
  }
  var Or = 0, je = null, Ve = null, yt = null, Vc = !1, Zi = !1, Za = !1, Fc = 0, Rl = 0, Qi = null, AR = 0;
  function ct() {
    throw Error(r(321));
  }
  function qh(a, i) {
    if (i === null) return !1;
    for (var l = 0; l < i.length && l < a.length; l++)
      if (!fn(a[l], i[l])) return !1;
    return !0;
  }
  function kh(a, i, l, s, p, m) {
    return Or = m, je = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, $.H = a === null || a.memoizedState === null ? LS : Jh, Za = !1, m = l(s, p), Za = !1, Zi && (m = iS(
      i,
      l,
      s,
      p
    )), aS(a), m;
  }
  function aS(a) {
    $.H = ql;
    var i = Ve !== null && Ve.next !== null;
    if (Or = 0, yt = Ve = je = null, Vc = !1, Rl = 0, Qi = null, i) throw Error(r(300));
    a === null || mt || (a = a.dependencies, a !== null && Bc(a) && (mt = !0));
  }
  function iS(a, i, l, s) {
    je = a;
    var p = 0;
    do {
      if (Zi && (Qi = null), Rl = 0, Zi = !1, 25 <= p) throw Error(r(301));
      if (p += 1, yt = Ve = null, a.updateQueue != null) {
        var m = a.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      $.H = US, m = i(l, s);
    } while (Zi);
    return m;
  }
  function TR() {
    var a = $.H, i = a.useState()[0];
    return i = typeof i.then == "function" ? $l(i) : i, a = a.useState()[0], (Ve !== null ? Ve.memoizedState : null) !== a && (je.flags |= 1024), i;
  }
  function Bh() {
    var a = Fc !== 0;
    return Fc = 0, a;
  }
  function Lh(a, i, l) {
    i.updateQueue = a.updateQueue, i.flags &= -2053, a.lanes &= ~l;
  }
  function Uh(a) {
    if (Vc) {
      for (a = a.memoizedState; a !== null; ) {
        var i = a.queue;
        i !== null && (i.pending = null), a = a.next;
      }
      Vc = !1;
    }
    Or = 0, yt = Ve = je = null, Zi = !1, Rl = Fc = 0, Qi = null;
  }
  function Vt() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return yt === null ? je.memoizedState = yt = a : yt = yt.next = a, yt;
  }
  function ht() {
    if (Ve === null) {
      var a = je.alternate;
      a = a !== null ? a.memoizedState : null;
    } else a = Ve.next;
    var i = yt === null ? je.memoizedState : yt.next;
    if (i !== null)
      yt = i, Ve = a;
    else {
      if (a === null)
        throw je.alternate === null ? Error(r(467)) : Error(r(310));
      Ve = a, a = {
        memoizedState: Ve.memoizedState,
        baseState: Ve.baseState,
        baseQueue: Ve.baseQueue,
        queue: Ve.queue,
        next: null
      }, yt === null ? je.memoizedState = yt = a : yt = yt.next = a;
    }
    return yt;
  }
  function Wc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $l(a) {
    var i = Rl;
    return Rl += 1, Qi === null && (Qi = []), a = Fx(Qi, a, i), i = je, (yt === null ? i.memoizedState : yt.next) === null && (i = i.alternate, $.H = i === null || i.memoizedState === null ? LS : Jh), a;
  }
  function Zc(a) {
    if (a !== null && typeof a == "object") {
      if (typeof a.then == "function") return $l(a);
      if (a.$$typeof === M) return Rt(a);
    }
    throw Error(r(438, String(a)));
  }
  function Ih(a) {
    var i = null, l = je.updateQueue;
    if (l !== null && (i = l.memoCache), i == null) {
      var s = je.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (i = {
        data: s.data.map(function(p) {
          return p.slice();
        }),
        index: 0
      })));
    }
    if (i == null && (i = { data: [], index: 0 }), l === null && (l = Wc(), je.updateQueue = l), l.memoCache = i, l = i.data[i.index], l === void 0)
      for (l = i.data[i.index] = Array(a), s = 0; s < a; s++)
        l[s] = k;
    return i.index++, l;
  }
  function wr(a, i) {
    return typeof i == "function" ? i(a) : i;
  }
  function Qc(a) {
    var i = ht();
    return Hh(i, Ve, a);
  }
  function Hh(a, i, l) {
    var s = a.queue;
    if (s === null) throw Error(r(311));
    s.lastRenderedReducer = l;
    var p = a.baseQueue, m = s.pending;
    if (m !== null) {
      if (p !== null) {
        var O = p.next;
        p.next = m.next, m.next = O;
      }
      i.baseQueue = p = m, s.pending = null;
    }
    if (m = a.baseState, p === null) a.memoizedState = m;
    else {
      i = p.next;
      var D = O = null, L = null, Z = i, ae = !1;
      do {
        var le = Z.lane & -536870913;
        if (le !== Z.lane ? (Ne & le) === le : (Or & le) === le) {
          var Q = Z.revertLane;
          if (Q === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }), le === Ki && (ae = !0);
          else if ((Or & Q) === Q) {
            Z = Z.next, Q === Ki && (ae = !0);
            continue;
          } else
            le = {
              lane: 0,
              revertLane: Z.revertLane,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }, L === null ? (D = L = le, O = m) : L = L.next = le, je.lanes |= Q, da |= Q;
          le = Z.action, Za && l(m, le), m = Z.hasEagerState ? Z.eagerState : l(m, le);
        } else
          Q = {
            lane: le,
            revertLane: Z.revertLane,
            gesture: Z.gesture,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          }, L === null ? (D = L = Q, O = m) : L = L.next = Q, je.lanes |= le, da |= le;
        Z = Z.next;
      } while (Z !== null && Z !== i);
      if (L === null ? O = m : L.next = D, !fn(m, a.memoizedState) && (mt = !0, ae && (l = Xi, l !== null)))
        throw l;
      a.memoizedState = m, a.baseState = O, a.baseQueue = L, s.lastRenderedState = m;
    }
    return p === null && (s.lanes = 0), [a.memoizedState, s.dispatch];
  }
  function Gh(a) {
    var i = ht(), l = i.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = a;
    var s = l.dispatch, p = l.pending, m = i.memoizedState;
    if (p !== null) {
      l.pending = null;
      var O = p = p.next;
      do
        m = a(m, O.action), O = O.next;
      while (O !== p);
      fn(m, i.memoizedState) || (mt = !0), i.memoizedState = m, i.baseQueue === null && (i.baseState = m), l.lastRenderedState = m;
    }
    return [m, s];
  }
  function oS(a, i, l) {
    var s = je, p = ht(), m = ze;
    if (m) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = i();
    var O = !fn(
      (Ve || p).memoizedState,
      l
    );
    if (O && (p.memoizedState = l, mt = !0), p = p.queue, Xh(cS.bind(null, s, p, a), [
      a
    ]), p.getSnapshot !== i || O || yt !== null && yt.memoizedState.tag & 1) {
      if (s.flags |= 2048, Ji(
        9,
        { destroy: void 0 },
        uS.bind(
          null,
          s,
          p,
          l,
          i
        ),
        null
      ), Je === null) throw Error(r(349));
      m || (Or & 127) !== 0 || lS(s, i, l);
    }
    return l;
  }
  function lS(a, i, l) {
    a.flags |= 16384, a = { getSnapshot: i, value: l }, i = je.updateQueue, i === null ? (i = Wc(), je.updateQueue = i, i.stores = [a]) : (l = i.stores, l === null ? i.stores = [a] : l.push(a));
  }
  function uS(a, i, l, s) {
    i.value = l, i.getSnapshot = s, sS(i) && fS(a);
  }
  function cS(a, i, l) {
    return l(function() {
      sS(i) && fS(a);
    });
  }
  function sS(a) {
    var i = a.getSnapshot;
    a = a.value;
    try {
      var l = i();
      return !fn(a, l);
    } catch {
      return !0;
    }
  }
  function fS(a) {
    var i = Ia(a, 2);
    i !== null && rn(i, a, 2);
  }
  function Yh(a) {
    var i = Vt();
    if (typeof a == "function") {
      var l = a;
      if (a = l(), Za) {
        Qr(!0);
        try {
          l();
        } finally {
          Qr(!1);
        }
      }
    }
    return i.memoizedState = i.baseState = a, i.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wr,
      lastRenderedState: a
    }, i;
  }
  function dS(a, i, l, s) {
    return a.baseState = l, Hh(
      a,
      Ve,
      typeof s == "function" ? s : wr
    );
  }
  function ER(a, i, l, s, p) {
    if (ts(a)) throw Error(r(485));
    if (a = i.action, a !== null) {
      var m = {
        payload: p,
        action: a,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(O) {
          m.listeners.push(O);
        }
      };
      $.T !== null ? l(!0) : m.isTransition = !1, s(m), l = i.pending, l === null ? (m.next = i.pending = m, hS(i, m)) : (m.next = l.next, i.pending = l.next = m);
    }
  }
  function hS(a, i) {
    var l = i.action, s = i.payload, p = a.state;
    if (i.isTransition) {
      var m = $.T, O = {};
      $.T = O;
      try {
        var D = l(p, s), L = $.S;
        L !== null && L(O, D), pS(a, i, D);
      } catch (Z) {
        Kh(a, i, Z);
      } finally {
        m !== null && O.types !== null && (m.types = O.types), $.T = m;
      }
    } else
      try {
        m = l(p, s), pS(a, i, m);
      } catch (Z) {
        Kh(a, i, Z);
      }
  }
  function pS(a, i, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(s) {
        vS(a, i, s);
      },
      function(s) {
        return Kh(a, i, s);
      }
    ) : vS(a, i, l);
  }
  function vS(a, i, l) {
    i.status = "fulfilled", i.value = l, yS(i), a.state = l, i = a.pending, i !== null && (l = i.next, l === i ? a.pending = null : (l = l.next, i.next = l, hS(a, l)));
  }
  function Kh(a, i, l) {
    var s = a.pending;
    if (a.pending = null, s !== null) {
      s = s.next;
      do
        i.status = "rejected", i.reason = l, yS(i), i = i.next;
      while (i !== s);
    }
    a.action = null;
  }
  function yS(a) {
    a = a.listeners;
    for (var i = 0; i < a.length; i++) (0, a[i])();
  }
  function mS(a, i) {
    return i;
  }
  function gS(a, i) {
    if (ze) {
      var l = Je.formState;
      if (l !== null) {
        e: {
          var s = je;
          if (ze) {
            if (rt) {
              t: {
                for (var p = rt, m = Cn; p.nodeType !== 8; ) {
                  if (!m) {
                    p = null;
                    break t;
                  }
                  if (p = Pn(
                    p.nextSibling
                  ), p === null) {
                    p = null;
                    break t;
                  }
                }
                m = p.data, p = m === "F!" || m === "F" ? p : null;
              }
              if (p) {
                rt = Pn(
                  p.nextSibling
                ), s = p.data === "F!";
                break e;
              }
            }
            ra(s);
          }
          s = !1;
        }
        s && (i = l[0]);
      }
    }
    return l = Vt(), l.memoizedState = l.baseState = i, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mS,
      lastRenderedState: i
    }, l.queue = s, l = qS.bind(
      null,
      je,
      s
    ), s.dispatch = l, s = Yh(!1), m = Qh.bind(
      null,
      je,
      !1,
      s.queue
    ), s = Vt(), p = {
      state: i,
      dispatch: null,
      action: a,
      pending: null
    }, s.queue = p, l = ER.bind(
      null,
      je,
      p,
      m,
      l
    ), p.dispatch = l, s.memoizedState = a, [i, l, !1];
  }
  function bS(a) {
    var i = ht();
    return xS(i, Ve, a);
  }
  function xS(a, i, l) {
    if (i = Hh(
      a,
      i,
      mS
    )[0], a = Qc(wr)[0], typeof i == "object" && i !== null && typeof i.then == "function")
      try {
        var s = $l(i);
      } catch (O) {
        throw O === Vi ? Ic : O;
      }
    else s = i;
    i = ht();
    var p = i.queue, m = p.dispatch;
    return l !== i.memoizedState && (je.flags |= 2048, Ji(
      9,
      { destroy: void 0 },
      jR.bind(null, p, l),
      null
    )), [s, m, a];
  }
  function jR(a, i) {
    a.action = i;
  }
  function SS(a) {
    var i = ht(), l = Ve;
    if (l !== null)
      return xS(i, l, a);
    ht(), i = i.memoizedState, l = ht();
    var s = l.queue.dispatch;
    return l.memoizedState = a, [i, s, !1];
  }
  function Ji(a, i, l, s) {
    return a = { tag: a, create: l, deps: s, inst: i, next: null }, i = je.updateQueue, i === null && (i = Wc(), je.updateQueue = i), l = i.lastEffect, l === null ? i.lastEffect = a.next = a : (s = l.next, l.next = a, a.next = s, i.lastEffect = a), a;
  }
  function _S() {
    return ht().memoizedState;
  }
  function Jc(a, i, l, s) {
    var p = Vt();
    je.flags |= a, p.memoizedState = Ji(
      1 | i,
      { destroy: void 0 },
      l,
      s === void 0 ? null : s
    );
  }
  function es(a, i, l, s) {
    var p = ht();
    s = s === void 0 ? null : s;
    var m = p.memoizedState.inst;
    Ve !== null && s !== null && qh(s, Ve.memoizedState.deps) ? p.memoizedState = Ji(i, m, l, s) : (je.flags |= a, p.memoizedState = Ji(
      1 | i,
      m,
      l,
      s
    ));
  }
  function OS(a, i) {
    Jc(8390656, 8, a, i);
  }
  function Xh(a, i) {
    es(2048, 8, a, i);
  }
  function MR(a) {
    je.flags |= 4;
    var i = je.updateQueue;
    if (i === null)
      i = Wc(), je.updateQueue = i, i.events = [a];
    else {
      var l = i.events;
      l === null ? i.events = [a] : l.push(a);
    }
  }
  function wS(a) {
    var i = ht().memoizedState;
    return MR({ ref: i, nextImpl: a }), function() {
      if ((Ue & 2) !== 0) throw Error(r(440));
      return i.impl.apply(void 0, arguments);
    };
  }
  function AS(a, i) {
    return es(4, 2, a, i);
  }
  function TS(a, i) {
    return es(4, 4, a, i);
  }
  function ES(a, i) {
    if (typeof i == "function") {
      a = a();
      var l = i(a);
      return function() {
        typeof l == "function" ? l() : i(null);
      };
    }
    if (i != null)
      return a = a(), i.current = a, function() {
        i.current = null;
      };
  }
  function jS(a, i, l) {
    l = l != null ? l.concat([a]) : null, es(4, 4, ES.bind(null, i, a), l);
  }
  function Vh() {
  }
  function MS(a, i) {
    var l = ht();
    i = i === void 0 ? null : i;
    var s = l.memoizedState;
    return i !== null && qh(i, s[1]) ? s[0] : (l.memoizedState = [a, i], a);
  }
  function CS(a, i) {
    var l = ht();
    i = i === void 0 ? null : i;
    var s = l.memoizedState;
    if (i !== null && qh(i, s[1]))
      return s[0];
    if (s = a(), Za) {
      Qr(!0);
      try {
        a();
      } finally {
        Qr(!1);
      }
    }
    return l.memoizedState = [s, i], s;
  }
  function Fh(a, i, l) {
    return l === void 0 || (Or & 1073741824) !== 0 && (Ne & 261930) === 0 ? a.memoizedState = i : (a.memoizedState = l, a = D_(), je.lanes |= a, da |= a, l);
  }
  function DS(a, i, l, s) {
    return fn(l, i) ? l : Wi.current !== null ? (a = Fh(a, l, s), fn(a, i) || (mt = !0), a) : (Or & 42) === 0 || (Or & 1073741824) !== 0 && (Ne & 261930) === 0 ? (mt = !0, a.memoizedState = l) : (a = D_(), je.lanes |= a, da |= a, i);
  }
  function PS(a, i, l, s, p) {
    var m = K.p;
    K.p = m !== 0 && 8 > m ? m : 8;
    var O = $.T, D = {};
    $.T = D, Qh(a, !1, i, l);
    try {
      var L = p(), Z = $.S;
      if (Z !== null && Z(D, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = wR(
          L,
          s
        );
        zl(
          a,
          i,
          ae,
          mn(a)
        );
      } else
        zl(
          a,
          i,
          s,
          mn(a)
        );
    } catch (le) {
      zl(
        a,
        i,
        { then: function() {
        }, status: "rejected", reason: le },
        mn()
      );
    } finally {
      K.p = m, O !== null && D.types !== null && (O.types = D.types), $.T = O;
    }
  }
  function CR() {
  }
  function Wh(a, i, l, s) {
    if (a.tag !== 5) throw Error(r(476));
    var p = NS(a).queue;
    PS(
      a,
      p,
      i,
      ne,
      l === null ? CR : function() {
        return RS(a), l(s);
      }
    );
  }
  function NS(a) {
    var i = a.memoizedState;
    if (i !== null) return i;
    i = {
      memoizedState: ne,
      baseState: ne,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wr,
        lastRenderedState: ne
      },
      next: null
    };
    var l = {};
    return i.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wr,
        lastRenderedState: l
      },
      next: null
    }, a.memoizedState = i, a = a.alternate, a !== null && (a.memoizedState = i), i;
  }
  function RS(a) {
    var i = NS(a);
    i.next === null && (i = a.alternate.memoizedState), zl(
      a,
      i.next.queue,
      {},
      mn()
    );
  }
  function Zh() {
    return Rt(Jl);
  }
  function $S() {
    return ht().memoizedState;
  }
  function zS() {
    return ht().memoizedState;
  }
  function DR(a) {
    for (var i = a.return; i !== null; ) {
      switch (i.tag) {
        case 24:
        case 3:
          var l = mn();
          a = oa(l);
          var s = la(i, a, l);
          s !== null && (rn(s, i, l), Dl(s, i, l)), i = { cache: Th() }, a.payload = i;
          return;
      }
      i = i.return;
    }
  }
  function PR(a, i, l) {
    var s = mn();
    l = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ts(a) ? kS(i, l) : (l = vh(a, i, l, s), l !== null && (rn(l, a, s), BS(l, i, s)));
  }
  function qS(a, i, l) {
    var s = mn();
    zl(a, i, l, s);
  }
  function zl(a, i, l, s) {
    var p = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ts(a)) kS(i, p);
    else {
      var m = a.alternate;
      if (a.lanes === 0 && (m === null || m.lanes === 0) && (m = i.lastRenderedReducer, m !== null))
        try {
          var O = i.lastRenderedState, D = m(O, l);
          if (p.hasEagerState = !0, p.eagerState = D, fn(D, O))
            return $c(a, i, p, 0), Je === null && Rc(), !1;
        } catch {
        } finally {
        }
      if (l = vh(a, i, p, s), l !== null)
        return rn(l, a, s), BS(l, i, s), !0;
    }
    return !1;
  }
  function Qh(a, i, l, s) {
    if (s = {
      lane: 2,
      revertLane: Cp(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ts(a)) {
      if (i) throw Error(r(479));
    } else
      i = vh(
        a,
        l,
        s,
        2
      ), i !== null && rn(i, a, 2);
  }
  function ts(a) {
    var i = a.alternate;
    return a === je || i !== null && i === je;
  }
  function kS(a, i) {
    Zi = Vc = !0;
    var l = a.pending;
    l === null ? i.next = i : (i.next = l.next, l.next = i), a.pending = i;
  }
  function BS(a, i, l) {
    if ((l & 4194048) !== 0) {
      var s = i.lanes;
      s &= a.pendingLanes, l |= s, i.lanes = l, G1(a, l);
    }
  }
  var ql = {
    readContext: Rt,
    use: Zc,
    useCallback: ct,
    useContext: ct,
    useEffect: ct,
    useImperativeHandle: ct,
    useLayoutEffect: ct,
    useInsertionEffect: ct,
    useMemo: ct,
    useReducer: ct,
    useRef: ct,
    useState: ct,
    useDebugValue: ct,
    useDeferredValue: ct,
    useTransition: ct,
    useSyncExternalStore: ct,
    useId: ct,
    useHostTransitionStatus: ct,
    useFormState: ct,
    useActionState: ct,
    useOptimistic: ct,
    useMemoCache: ct,
    useCacheRefresh: ct
  };
  ql.useEffectEvent = ct;
  var LS = {
    readContext: Rt,
    use: Zc,
    useCallback: function(a, i) {
      return Vt().memoizedState = [
        a,
        i === void 0 ? null : i
      ], a;
    },
    useContext: Rt,
    useEffect: OS,
    useImperativeHandle: function(a, i, l) {
      l = l != null ? l.concat([a]) : null, Jc(
        4194308,
        4,
        ES.bind(null, i, a),
        l
      );
    },
    useLayoutEffect: function(a, i) {
      return Jc(4194308, 4, a, i);
    },
    useInsertionEffect: function(a, i) {
      Jc(4, 2, a, i);
    },
    useMemo: function(a, i) {
      var l = Vt();
      i = i === void 0 ? null : i;
      var s = a();
      if (Za) {
        Qr(!0);
        try {
          a();
        } finally {
          Qr(!1);
        }
      }
      return l.memoizedState = [s, i], s;
    },
    useReducer: function(a, i, l) {
      var s = Vt();
      if (l !== void 0) {
        var p = l(i);
        if (Za) {
          Qr(!0);
          try {
            l(i);
          } finally {
            Qr(!1);
          }
        }
      } else p = i;
      return s.memoizedState = s.baseState = p, a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: a,
        lastRenderedState: p
      }, s.queue = a, a = a.dispatch = PR.bind(
        null,
        je,
        a
      ), [s.memoizedState, a];
    },
    useRef: function(a) {
      var i = Vt();
      return a = { current: a }, i.memoizedState = a;
    },
    useState: function(a) {
      a = Yh(a);
      var i = a.queue, l = qS.bind(null, je, i);
      return i.dispatch = l, [a.memoizedState, l];
    },
    useDebugValue: Vh,
    useDeferredValue: function(a, i) {
      var l = Vt();
      return Fh(l, a, i);
    },
    useTransition: function() {
      var a = Yh(!1);
      return a = PS.bind(
        null,
        je,
        a.queue,
        !0,
        !1
      ), Vt().memoizedState = a, [!1, a];
    },
    useSyncExternalStore: function(a, i, l) {
      var s = je, p = Vt();
      if (ze) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = i(), Je === null)
          throw Error(r(349));
        (Ne & 127) !== 0 || lS(s, i, l);
      }
      p.memoizedState = l;
      var m = { value: l, getSnapshot: i };
      return p.queue = m, OS(cS.bind(null, s, m, a), [
        a
      ]), s.flags |= 2048, Ji(
        9,
        { destroy: void 0 },
        uS.bind(
          null,
          s,
          m,
          l,
          i
        ),
        null
      ), l;
    },
    useId: function() {
      var a = Vt(), i = Je.identifierPrefix;
      if (ze) {
        var l = er, s = Jn;
        l = (s & ~(1 << 32 - sn(s) - 1)).toString(32) + l, i = "_" + i + "R_" + l, l = Fc++, 0 < l && (i += "H" + l.toString(32)), i += "_";
      } else
        l = AR++, i = "_" + i + "r_" + l.toString(32) + "_";
      return a.memoizedState = i;
    },
    useHostTransitionStatus: Zh,
    useFormState: gS,
    useActionState: gS,
    useOptimistic: function(a) {
      var i = Vt();
      i.memoizedState = i.baseState = a;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return i.queue = l, i = Qh.bind(
        null,
        je,
        !0,
        l
      ), l.dispatch = i, [a, i];
    },
    useMemoCache: Ih,
    useCacheRefresh: function() {
      return Vt().memoizedState = DR.bind(
        null,
        je
      );
    },
    useEffectEvent: function(a) {
      var i = Vt(), l = { impl: a };
      return i.memoizedState = l, function() {
        if ((Ue & 2) !== 0)
          throw Error(r(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Jh = {
    readContext: Rt,
    use: Zc,
    useCallback: MS,
    useContext: Rt,
    useEffect: Xh,
    useImperativeHandle: jS,
    useInsertionEffect: AS,
    useLayoutEffect: TS,
    useMemo: CS,
    useReducer: Qc,
    useRef: _S,
    useState: function() {
      return Qc(wr);
    },
    useDebugValue: Vh,
    useDeferredValue: function(a, i) {
      var l = ht();
      return DS(
        l,
        Ve.memoizedState,
        a,
        i
      );
    },
    useTransition: function() {
      var a = Qc(wr)[0], i = ht().memoizedState;
      return [
        typeof a == "boolean" ? a : $l(a),
        i
      ];
    },
    useSyncExternalStore: oS,
    useId: $S,
    useHostTransitionStatus: Zh,
    useFormState: bS,
    useActionState: bS,
    useOptimistic: function(a, i) {
      var l = ht();
      return dS(l, Ve, a, i);
    },
    useMemoCache: Ih,
    useCacheRefresh: zS
  };
  Jh.useEffectEvent = wS;
  var US = {
    readContext: Rt,
    use: Zc,
    useCallback: MS,
    useContext: Rt,
    useEffect: Xh,
    useImperativeHandle: jS,
    useInsertionEffect: AS,
    useLayoutEffect: TS,
    useMemo: CS,
    useReducer: Gh,
    useRef: _S,
    useState: function() {
      return Gh(wr);
    },
    useDebugValue: Vh,
    useDeferredValue: function(a, i) {
      var l = ht();
      return Ve === null ? Fh(l, a, i) : DS(
        l,
        Ve.memoizedState,
        a,
        i
      );
    },
    useTransition: function() {
      var a = Gh(wr)[0], i = ht().memoizedState;
      return [
        typeof a == "boolean" ? a : $l(a),
        i
      ];
    },
    useSyncExternalStore: oS,
    useId: $S,
    useHostTransitionStatus: Zh,
    useFormState: SS,
    useActionState: SS,
    useOptimistic: function(a, i) {
      var l = ht();
      return Ve !== null ? dS(l, Ve, a, i) : (l.baseState = a, [a, l.queue.dispatch]);
    },
    useMemoCache: Ih,
    useCacheRefresh: zS
  };
  US.useEffectEvent = wS;
  function ep(a, i, l, s) {
    i = a.memoizedState, l = l(s, i), l = l == null ? i : v({}, i, l), a.memoizedState = l, a.lanes === 0 && (a.updateQueue.baseState = l);
  }
  var tp = {
    enqueueSetState: function(a, i, l) {
      a = a._reactInternals;
      var s = mn(), p = oa(s);
      p.payload = i, l != null && (p.callback = l), i = la(a, p, s), i !== null && (rn(i, a, s), Dl(i, a, s));
    },
    enqueueReplaceState: function(a, i, l) {
      a = a._reactInternals;
      var s = mn(), p = oa(s);
      p.tag = 1, p.payload = i, l != null && (p.callback = l), i = la(a, p, s), i !== null && (rn(i, a, s), Dl(i, a, s));
    },
    enqueueForceUpdate: function(a, i) {
      a = a._reactInternals;
      var l = mn(), s = oa(l);
      s.tag = 2, i != null && (s.callback = i), i = la(a, s, l), i !== null && (rn(i, a, l), Dl(i, a, l));
    }
  };
  function IS(a, i, l, s, p, m, O) {
    return a = a.stateNode, typeof a.shouldComponentUpdate == "function" ? a.shouldComponentUpdate(s, m, O) : i.prototype && i.prototype.isPureReactComponent ? !Ol(l, s) || !Ol(p, m) : !0;
  }
  function HS(a, i, l, s) {
    a = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(l, s), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(l, s), i.state !== a && tp.enqueueReplaceState(i, i.state, null);
  }
  function Qa(a, i) {
    var l = i;
    if ("ref" in i) {
      l = {};
      for (var s in i)
        s !== "ref" && (l[s] = i[s]);
    }
    if (a = a.defaultProps) {
      l === i && (l = v({}, l));
      for (var p in a)
        l[p] === void 0 && (l[p] = a[p]);
    }
    return l;
  }
  function GS(a) {
    Nc(a);
  }
  function YS(a) {
    console.error(a);
  }
  function KS(a) {
    Nc(a);
  }
  function ns(a, i) {
    try {
      var l = a.onUncaughtError;
      l(i.value, { componentStack: i.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function XS(a, i, l) {
    try {
      var s = a.onCaughtError;
      s(l.value, {
        componentStack: l.stack,
        errorBoundary: i.tag === 1 ? i.stateNode : null
      });
    } catch (p) {
      setTimeout(function() {
        throw p;
      });
    }
  }
  function np(a, i, l) {
    return l = oa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ns(a, i);
    }, l;
  }
  function VS(a) {
    return a = oa(a), a.tag = 3, a;
  }
  function FS(a, i, l, s) {
    var p = l.type.getDerivedStateFromError;
    if (typeof p == "function") {
      var m = s.value;
      a.payload = function() {
        return p(m);
      }, a.callback = function() {
        XS(i, l, s);
      };
    }
    var O = l.stateNode;
    O !== null && typeof O.componentDidCatch == "function" && (a.callback = function() {
      XS(i, l, s), typeof p != "function" && (ha === null ? ha = /* @__PURE__ */ new Set([this]) : ha.add(this));
      var D = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: D !== null ? D : ""
      });
    });
  }
  function NR(a, i, l, s, p) {
    if (l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (i = l.alternate, i !== null && Yi(
        i,
        l,
        p,
        !0
      ), l = hn.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Dn === null ? ps() : l.alternate === null && st === 0 && (st = 3), l.flags &= -257, l.flags |= 65536, l.lanes = p, s === Hc ? l.flags |= 16384 : (i = l.updateQueue, i === null ? l.updateQueue = /* @__PURE__ */ new Set([s]) : i.add(s), Ep(a, s, p)), !1;
          case 22:
            return l.flags |= 65536, s === Hc ? l.flags |= 16384 : (i = l.updateQueue, i === null ? (i = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, l.updateQueue = i) : (l = i.retryQueue, l === null ? i.retryQueue = /* @__PURE__ */ new Set([s]) : l.add(s)), Ep(a, s, p)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Ep(a, s, p), ps(), !1;
    }
    if (ze)
      return i = hn.current, i !== null ? ((i.flags & 65536) === 0 && (i.flags |= 256), i.flags |= 65536, i.lanes = p, s !== Sh && (a = Error(r(422), { cause: s }), Tl(En(a, l)))) : (s !== Sh && (i = Error(r(423), {
        cause: s
      }), Tl(
        En(i, l)
      )), a = a.current.alternate, a.flags |= 65536, p &= -p, a.lanes |= p, s = En(s, l), p = np(
        a.stateNode,
        s,
        p
      ), Ph(a, p), st !== 4 && (st = 2)), !1;
    var m = Error(r(520), { cause: s });
    if (m = En(m, l), Yl === null ? Yl = [m] : Yl.push(m), st !== 4 && (st = 2), i === null) return !0;
    s = En(s, l), l = i;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, a = p & -p, l.lanes |= a, a = np(l.stateNode, s, a), Ph(l, a), !1;
        case 1:
          if (i = l.type, m = l.stateNode, (l.flags & 128) === 0 && (typeof i.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (ha === null || !ha.has(m))))
            return l.flags |= 65536, p &= -p, l.lanes |= p, p = VS(p), FS(
              p,
              a,
              l,
              s
            ), Ph(l, p), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var rp = Error(r(461)), mt = !1;
  function $t(a, i, l, s) {
    i.child = a === null ? Jx(i, null, l, s) : Wa(
      i,
      a.child,
      l,
      s
    );
  }
  function WS(a, i, l, s, p) {
    l = l.render;
    var m = i.ref;
    if ("ref" in s) {
      var O = {};
      for (var D in s)
        D !== "ref" && (O[D] = s[D]);
    } else O = s;
    return Ka(i), s = kh(
      a,
      i,
      l,
      O,
      m,
      p
    ), D = Bh(), a !== null && !mt ? (Lh(a, i, p), Ar(a, i, p)) : (ze && D && bh(i), i.flags |= 1, $t(a, i, s, p), i.child);
  }
  function ZS(a, i, l, s, p) {
    if (a === null) {
      var m = l.type;
      return typeof m == "function" && !yh(m) && m.defaultProps === void 0 && l.compare === null ? (i.tag = 15, i.type = m, QS(
        a,
        i,
        m,
        s,
        p
      )) : (a = qc(
        l.type,
        null,
        s,
        i,
        i.mode,
        p
      ), a.ref = i.ref, a.return = i, i.child = a);
    }
    if (m = a.child, !fp(a, p)) {
      var O = m.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ol, l(O, s) && a.ref === i.ref)
        return Ar(a, i, p);
    }
    return i.flags |= 1, a = br(m, s), a.ref = i.ref, a.return = i, i.child = a;
  }
  function QS(a, i, l, s, p) {
    if (a !== null) {
      var m = a.memoizedProps;
      if (Ol(m, s) && a.ref === i.ref)
        if (mt = !1, i.pendingProps = s = m, fp(a, p))
          (a.flags & 131072) !== 0 && (mt = !0);
        else
          return i.lanes = a.lanes, Ar(a, i, p);
    }
    return ap(
      a,
      i,
      l,
      s,
      p
    );
  }
  function JS(a, i, l, s) {
    var p = s.children, m = a !== null ? a.memoizedState : null;
    if (a === null && i.stateNode === null && (i.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), s.mode === "hidden") {
      if ((i.flags & 128) !== 0) {
        if (m = m !== null ? m.baseLanes | l : l, a !== null) {
          for (s = i.child = a.child, p = 0; s !== null; )
            p = p | s.lanes | s.childLanes, s = s.sibling;
          s = p & ~m;
        } else s = 0, i.child = null;
        return e_(
          a,
          i,
          m,
          l,
          s
        );
      }
      if ((l & 536870912) !== 0)
        i.memoizedState = { baseLanes: 0, cachePool: null }, a !== null && Uc(
          i,
          m !== null ? m.cachePool : null
        ), m !== null ? nS(i, m) : Rh(), rS(i);
      else
        return s = i.lanes = 536870912, e_(
          a,
          i,
          m !== null ? m.baseLanes | l : l,
          l,
          s
        );
    } else
      m !== null ? (Uc(i, m.cachePool), nS(i, m), ca(), i.memoizedState = null) : (a !== null && Uc(i, null), Rh(), ca());
    return $t(a, i, p, l), i.child;
  }
  function kl(a, i) {
    return a !== null && a.tag === 22 || i.stateNode !== null || (i.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.sibling;
  }
  function e_(a, i, l, s, p) {
    var m = jh();
    return m = m === null ? null : { parent: vt._currentValue, pool: m }, i.memoizedState = {
      baseLanes: l,
      cachePool: m
    }, a !== null && Uc(i, null), Rh(), rS(i), a !== null && Yi(a, i, s, !0), i.childLanes = p, null;
  }
  function rs(a, i) {
    return i = is(
      { mode: i.mode, children: i.children },
      a.mode
    ), i.ref = a.ref, a.child = i, i.return = a, i;
  }
  function t_(a, i, l) {
    return Wa(i, a.child, null, l), a = rs(i, i.pendingProps), a.flags |= 2, pn(i), i.memoizedState = null, a;
  }
  function RR(a, i, l) {
    var s = i.pendingProps, p = (i.flags & 128) !== 0;
    if (i.flags &= -129, a === null) {
      if (ze) {
        if (s.mode === "hidden")
          return a = rs(i, s), i.lanes = 536870912, kl(null, a);
        if (zh(i), (a = rt) ? (a = hO(
          a,
          Cn
        ), a = a !== null && a.data === "&" ? a : null, a !== null && (i.memoizedState = {
          dehydrated: a,
          treeContext: ta !== null ? { id: Jn, overflow: er } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = kx(a), l.return = i, i.child = l, Nt = i, rt = null)) : a = null, a === null) throw ra(i);
        return i.lanes = 536870912, null;
      }
      return rs(i, s);
    }
    var m = a.memoizedState;
    if (m !== null) {
      var O = m.dehydrated;
      if (zh(i), p)
        if (i.flags & 256)
          i.flags &= -257, i = t_(
            a,
            i,
            l
          );
        else if (i.memoizedState !== null)
          i.child = a.child, i.flags |= 128, i = null;
        else throw Error(r(558));
      else if (mt || Yi(a, i, l, !1), p = (l & a.childLanes) !== 0, mt || p) {
        if (s = Je, s !== null && (O = Y1(s, l), O !== 0 && O !== m.retryLane))
          throw m.retryLane = O, Ia(a, O), rn(s, a, O), rp;
        ps(), i = t_(
          a,
          i,
          l
        );
      } else
        a = m.treeContext, rt = Pn(O.nextSibling), Nt = i, ze = !0, na = null, Cn = !1, a !== null && Ux(i, a), i = rs(i, s), i.flags |= 4096;
      return i;
    }
    return a = br(a.child, {
      mode: s.mode,
      children: s.children
    }), a.ref = i.ref, i.child = a, a.return = i, a;
  }
  function as(a, i) {
    var l = i.ref;
    if (l === null)
      a !== null && a.ref !== null && (i.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (a === null || a.ref !== l) && (i.flags |= 4194816);
    }
  }
  function ap(a, i, l, s, p) {
    return Ka(i), l = kh(
      a,
      i,
      l,
      s,
      void 0,
      p
    ), s = Bh(), a !== null && !mt ? (Lh(a, i, p), Ar(a, i, p)) : (ze && s && bh(i), i.flags |= 1, $t(a, i, l, p), i.child);
  }
  function n_(a, i, l, s, p, m) {
    return Ka(i), i.updateQueue = null, l = iS(
      i,
      s,
      l,
      p
    ), aS(a), s = Bh(), a !== null && !mt ? (Lh(a, i, m), Ar(a, i, m)) : (ze && s && bh(i), i.flags |= 1, $t(a, i, l, m), i.child);
  }
  function r_(a, i, l, s, p) {
    if (Ka(i), i.stateNode === null) {
      var m = Ui, O = l.contextType;
      typeof O == "object" && O !== null && (m = Rt(O)), m = new l(s, m), i.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = tp, i.stateNode = m, m._reactInternals = i, m = i.stateNode, m.props = s, m.state = i.memoizedState, m.refs = {}, Ch(i), O = l.contextType, m.context = typeof O == "object" && O !== null ? Rt(O) : Ui, m.state = i.memoizedState, O = l.getDerivedStateFromProps, typeof O == "function" && (ep(
        i,
        l,
        O,
        s
      ), m.state = i.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (O = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), O !== m.state && tp.enqueueReplaceState(m, m.state, null), Nl(i, s, m, p), Pl(), m.state = i.memoizedState), typeof m.componentDidMount == "function" && (i.flags |= 4194308), s = !0;
    } else if (a === null) {
      m = i.stateNode;
      var D = i.memoizedProps, L = Qa(l, D);
      m.props = L;
      var Z = m.context, ae = l.contextType;
      O = Ui, typeof ae == "object" && ae !== null && (O = Rt(ae));
      var le = l.getDerivedStateFromProps;
      ae = typeof le == "function" || typeof m.getSnapshotBeforeUpdate == "function", D = i.pendingProps !== D, ae || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (D || Z !== O) && HS(
        i,
        m,
        s,
        O
      ), ia = !1;
      var Q = i.memoizedState;
      m.state = Q, Nl(i, s, m, p), Pl(), Z = i.memoizedState, D || Q !== Z || ia ? (typeof le == "function" && (ep(
        i,
        l,
        le,
        s
      ), Z = i.memoizedState), (L = ia || IS(
        i,
        l,
        L,
        s,
        Q,
        Z,
        O
      )) ? (ae || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = s, i.memoizedState = Z), m.props = s, m.state = Z, m.context = O, s = L) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), s = !1);
    } else {
      m = i.stateNode, Dh(a, i), O = i.memoizedProps, ae = Qa(l, O), m.props = ae, le = i.pendingProps, Q = m.context, Z = l.contextType, L = Ui, typeof Z == "object" && Z !== null && (L = Rt(Z)), D = l.getDerivedStateFromProps, (Z = typeof D == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (O !== le || Q !== L) && HS(
        i,
        m,
        s,
        L
      ), ia = !1, Q = i.memoizedState, m.state = Q, Nl(i, s, m, p), Pl();
      var te = i.memoizedState;
      O !== le || Q !== te || ia || a !== null && a.dependencies !== null && Bc(a.dependencies) ? (typeof D == "function" && (ep(
        i,
        l,
        D,
        s
      ), te = i.memoizedState), (ae = ia || IS(
        i,
        l,
        ae,
        s,
        Q,
        te,
        L
      ) || a !== null && a.dependencies !== null && Bc(a.dependencies)) ? (Z || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(s, te, L), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        s,
        te,
        L
      )), typeof m.componentDidUpdate == "function" && (i.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 1024), i.memoizedProps = s, i.memoizedState = te), m.props = s, m.state = te, m.context = L, s = ae) : (typeof m.componentDidUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 1024), s = !1);
    }
    return m = s, as(a, i), s = (i.flags & 128) !== 0, m || s ? (m = i.stateNode, l = s && typeof l.getDerivedStateFromError != "function" ? null : m.render(), i.flags |= 1, a !== null && s ? (i.child = Wa(
      i,
      a.child,
      null,
      p
    ), i.child = Wa(
      i,
      null,
      l,
      p
    )) : $t(a, i, l, p), i.memoizedState = m.state, a = i.child) : a = Ar(
      a,
      i,
      p
    ), a;
  }
  function a_(a, i, l, s) {
    return Ga(), i.flags |= 256, $t(a, i, l, s), i.child;
  }
  var ip = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function op(a) {
    return { baseLanes: a, cachePool: Xx() };
  }
  function lp(a, i, l) {
    return a = a !== null ? a.childLanes & ~l : 0, i && (a |= yn), a;
  }
  function i_(a, i, l) {
    var s = i.pendingProps, p = !1, m = (i.flags & 128) !== 0, O;
    if ((O = m) || (O = a !== null && a.memoizedState === null ? !1 : (dt.current & 2) !== 0), O && (p = !0, i.flags &= -129), O = (i.flags & 32) !== 0, i.flags &= -33, a === null) {
      if (ze) {
        if (p ? ua(i) : ca(), (a = rt) ? (a = hO(
          a,
          Cn
        ), a = a !== null && a.data !== "&" ? a : null, a !== null && (i.memoizedState = {
          dehydrated: a,
          treeContext: ta !== null ? { id: Jn, overflow: er } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = kx(a), l.return = i, i.child = l, Nt = i, rt = null)) : a = null, a === null) throw ra(i);
        return Hp(a) ? i.lanes = 32 : i.lanes = 536870912, null;
      }
      var D = s.children;
      return s = s.fallback, p ? (ca(), p = i.mode, D = is(
        { mode: "hidden", children: D },
        p
      ), s = Ha(
        s,
        p,
        l,
        null
      ), D.return = i, s.return = i, D.sibling = s, i.child = D, s = i.child, s.memoizedState = op(l), s.childLanes = lp(
        a,
        O,
        l
      ), i.memoizedState = ip, kl(null, s)) : (ua(i), up(i, D));
    }
    var L = a.memoizedState;
    if (L !== null && (D = L.dehydrated, D !== null)) {
      if (m)
        i.flags & 256 ? (ua(i), i.flags &= -257, i = cp(
          a,
          i,
          l
        )) : i.memoizedState !== null ? (ca(), i.child = a.child, i.flags |= 128, i = null) : (ca(), D = s.fallback, p = i.mode, s = is(
          { mode: "visible", children: s.children },
          p
        ), D = Ha(
          D,
          p,
          l,
          null
        ), D.flags |= 2, s.return = i, D.return = i, s.sibling = D, i.child = s, Wa(
          i,
          a.child,
          null,
          l
        ), s = i.child, s.memoizedState = op(l), s.childLanes = lp(
          a,
          O,
          l
        ), i.memoizedState = ip, i = kl(null, s));
      else if (ua(i), Hp(D)) {
        if (O = D.nextSibling && D.nextSibling.dataset, O) var Z = O.dgst;
        O = Z, s = Error(r(419)), s.stack = "", s.digest = O, Tl({ value: s, source: null, stack: null }), i = cp(
          a,
          i,
          l
        );
      } else if (mt || Yi(a, i, l, !1), O = (l & a.childLanes) !== 0, mt || O) {
        if (O = Je, O !== null && (s = Y1(O, l), s !== 0 && s !== L.retryLane))
          throw L.retryLane = s, Ia(a, s), rn(O, a, s), rp;
        Ip(D) || ps(), i = cp(
          a,
          i,
          l
        );
      } else
        Ip(D) ? (i.flags |= 192, i.child = a.child, i = null) : (a = L.treeContext, rt = Pn(
          D.nextSibling
        ), Nt = i, ze = !0, na = null, Cn = !1, a !== null && Ux(i, a), i = up(
          i,
          s.children
        ), i.flags |= 4096);
      return i;
    }
    return p ? (ca(), D = s.fallback, p = i.mode, L = a.child, Z = L.sibling, s = br(L, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = L.subtreeFlags & 65011712, Z !== null ? D = br(
      Z,
      D
    ) : (D = Ha(
      D,
      p,
      l,
      null
    ), D.flags |= 2), D.return = i, s.return = i, s.sibling = D, i.child = s, kl(null, s), s = i.child, D = a.child.memoizedState, D === null ? D = op(l) : (p = D.cachePool, p !== null ? (L = vt._currentValue, p = p.parent !== L ? { parent: L, pool: L } : p) : p = Xx(), D = {
      baseLanes: D.baseLanes | l,
      cachePool: p
    }), s.memoizedState = D, s.childLanes = lp(
      a,
      O,
      l
    ), i.memoizedState = ip, kl(a.child, s)) : (ua(i), l = a.child, a = l.sibling, l = br(l, {
      mode: "visible",
      children: s.children
    }), l.return = i, l.sibling = null, a !== null && (O = i.deletions, O === null ? (i.deletions = [a], i.flags |= 16) : O.push(a)), i.child = l, i.memoizedState = null, l);
  }
  function up(a, i) {
    return i = is(
      { mode: "visible", children: i },
      a.mode
    ), i.return = a, a.child = i;
  }
  function is(a, i) {
    return a = dn(22, a, null, i), a.lanes = 0, a;
  }
  function cp(a, i, l) {
    return Wa(i, a.child, null, l), a = up(
      i,
      i.pendingProps.children
    ), a.flags |= 2, i.memoizedState = null, a;
  }
  function o_(a, i, l) {
    a.lanes |= i;
    var s = a.alternate;
    s !== null && (s.lanes |= i), wh(a.return, i, l);
  }
  function sp(a, i, l, s, p, m) {
    var O = a.memoizedState;
    O === null ? a.memoizedState = {
      isBackwards: i,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: l,
      tailMode: p,
      treeForkCount: m
    } : (O.isBackwards = i, O.rendering = null, O.renderingStartTime = 0, O.last = s, O.tail = l, O.tailMode = p, O.treeForkCount = m);
  }
  function l_(a, i, l) {
    var s = i.pendingProps, p = s.revealOrder, m = s.tail;
    s = s.children;
    var O = dt.current, D = (O & 2) !== 0;
    if (D ? (O = O & 1 | 2, i.flags |= 128) : O &= 1, re(dt, O), $t(a, i, s, l), s = ze ? Al : 0, !D && a !== null && (a.flags & 128) !== 0)
      e: for (a = i.child; a !== null; ) {
        if (a.tag === 13)
          a.memoizedState !== null && o_(a, l, i);
        else if (a.tag === 19)
          o_(a, l, i);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === i) break e;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === i)
            break e;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    switch (p) {
      case "forwards":
        for (l = i.child, p = null; l !== null; )
          a = l.alternate, a !== null && Xc(a) === null && (p = l), l = l.sibling;
        l = p, l === null ? (p = i.child, i.child = null) : (p = l.sibling, l.sibling = null), sp(
          i,
          !1,
          p,
          l,
          m,
          s
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, p = i.child, i.child = null; p !== null; ) {
          if (a = p.alternate, a !== null && Xc(a) === null) {
            i.child = p;
            break;
          }
          a = p.sibling, p.sibling = l, l = p, p = a;
        }
        sp(
          i,
          !0,
          l,
          null,
          m,
          s
        );
        break;
      case "together":
        sp(
          i,
          !1,
          null,
          null,
          void 0,
          s
        );
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function Ar(a, i, l) {
    if (a !== null && (i.dependencies = a.dependencies), da |= i.lanes, (l & i.childLanes) === 0)
      if (a !== null) {
        if (Yi(
          a,
          i,
          l,
          !1
        ), (l & i.childLanes) === 0)
          return null;
      } else return null;
    if (a !== null && i.child !== a.child)
      throw Error(r(153));
    if (i.child !== null) {
      for (a = i.child, l = br(a, a.pendingProps), i.child = l, l.return = i; a.sibling !== null; )
        a = a.sibling, l = l.sibling = br(a, a.pendingProps), l.return = i;
      l.sibling = null;
    }
    return i.child;
  }
  function fp(a, i) {
    return (a.lanes & i) !== 0 ? !0 : (a = a.dependencies, !!(a !== null && Bc(a)));
  }
  function $R(a, i, l) {
    switch (i.tag) {
      case 3:
        Ce(i, i.stateNode.containerInfo), aa(i, vt, a.memoizedState.cache), Ga();
        break;
      case 27:
      case 5:
        ge(i);
        break;
      case 4:
        Ce(i, i.stateNode.containerInfo);
        break;
      case 10:
        aa(
          i,
          i.type,
          i.memoizedProps.value
        );
        break;
      case 31:
        if (i.memoizedState !== null)
          return i.flags |= 128, zh(i), null;
        break;
      case 13:
        var s = i.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (ua(i), i.flags |= 128, null) : (l & i.child.childLanes) !== 0 ? i_(a, i, l) : (ua(i), a = Ar(
            a,
            i,
            l
          ), a !== null ? a.sibling : null);
        ua(i);
        break;
      case 19:
        var p = (a.flags & 128) !== 0;
        if (s = (l & i.childLanes) !== 0, s || (Yi(
          a,
          i,
          l,
          !1
        ), s = (l & i.childLanes) !== 0), p) {
          if (s)
            return l_(
              a,
              i,
              l
            );
          i.flags |= 128;
        }
        if (p = i.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), re(dt, dt.current), s) break;
        return null;
      case 22:
        return i.lanes = 0, JS(
          a,
          i,
          l,
          i.pendingProps
        );
      case 24:
        aa(i, vt, a.memoizedState.cache);
    }
    return Ar(a, i, l);
  }
  function u_(a, i, l) {
    if (a !== null)
      if (a.memoizedProps !== i.pendingProps)
        mt = !0;
      else {
        if (!fp(a, l) && (i.flags & 128) === 0)
          return mt = !1, $R(
            a,
            i,
            l
          );
        mt = (a.flags & 131072) !== 0;
      }
    else
      mt = !1, ze && (i.flags & 1048576) !== 0 && Lx(i, Al, i.index);
    switch (i.lanes = 0, i.tag) {
      case 16:
        e: {
          var s = i.pendingProps;
          if (a = Va(i.elementType), i.type = a, typeof a == "function")
            yh(a) ? (s = Qa(a, s), i.tag = 1, i = r_(
              null,
              i,
              a,
              s,
              l
            )) : (i.tag = 0, i = ap(
              null,
              i,
              a,
              s,
              l
            ));
          else {
            if (a != null) {
              var p = a.$$typeof;
              if (p === C) {
                i.tag = 11, i = WS(
                  null,
                  i,
                  a,
                  s,
                  l
                );
                break e;
              } else if (p === j) {
                i.tag = 14, i = ZS(
                  null,
                  i,
                  a,
                  s,
                  l
                );
                break e;
              }
            }
            throw i = Y(a) || a, Error(r(306, i, ""));
          }
        }
        return i;
      case 0:
        return ap(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 1:
        return s = i.type, p = Qa(
          s,
          i.pendingProps
        ), r_(
          a,
          i,
          s,
          p,
          l
        );
      case 3:
        e: {
          if (Ce(
            i,
            i.stateNode.containerInfo
          ), a === null) throw Error(r(387));
          s = i.pendingProps;
          var m = i.memoizedState;
          p = m.element, Dh(a, i), Nl(i, s, null, l);
          var O = i.memoizedState;
          if (s = O.cache, aa(i, vt, s), s !== m.cache && Ah(
            i,
            [vt],
            l,
            !0
          ), Pl(), s = O.element, m.isDehydrated)
            if (m = {
              element: s,
              isDehydrated: !1,
              cache: O.cache
            }, i.updateQueue.baseState = m, i.memoizedState = m, i.flags & 256) {
              i = a_(
                a,
                i,
                s,
                l
              );
              break e;
            } else if (s !== p) {
              p = En(
                Error(r(424)),
                i
              ), Tl(p), i = a_(
                a,
                i,
                s,
                l
              );
              break e;
            } else {
              switch (a = i.stateNode.containerInfo, a.nodeType) {
                case 9:
                  a = a.body;
                  break;
                default:
                  a = a.nodeName === "HTML" ? a.ownerDocument.body : a;
              }
              for (rt = Pn(a.firstChild), Nt = i, ze = !0, na = null, Cn = !0, l = Jx(
                i,
                null,
                s,
                l
              ), i.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Ga(), s === p) {
              i = Ar(
                a,
                i,
                l
              );
              break e;
            }
            $t(a, i, s, l);
          }
          i = i.child;
        }
        return i;
      case 26:
        return as(a, i), a === null ? (l = bO(
          i.type,
          null,
          i.pendingProps,
          null
        )) ? i.memoizedState = l : ze || (l = i.type, a = i.pendingProps, s = Ss(
          fe.current
        ).createElement(l), s[Pt] = i, s[Zt] = a, zt(s, l, a), jt(s), i.stateNode = s) : i.memoizedState = bO(
          i.type,
          a.memoizedProps,
          i.pendingProps,
          a.memoizedState
        ), null;
      case 27:
        return ge(i), a === null && ze && (s = i.stateNode = yO(
          i.type,
          i.pendingProps,
          fe.current
        ), Nt = i, Cn = !0, p = rt, ma(i.type) ? (Gp = p, rt = Pn(s.firstChild)) : rt = p), $t(
          a,
          i,
          i.pendingProps.children,
          l
        ), as(a, i), a === null && (i.flags |= 4194304), i.child;
      case 5:
        return a === null && ze && ((p = s = rt) && (s = f3(
          s,
          i.type,
          i.pendingProps,
          Cn
        ), s !== null ? (i.stateNode = s, Nt = i, rt = Pn(s.firstChild), Cn = !1, p = !0) : p = !1), p || ra(i)), ge(i), p = i.type, m = i.pendingProps, O = a !== null ? a.memoizedProps : null, s = m.children, Bp(p, m) ? s = null : O !== null && Bp(p, O) && (i.flags |= 32), i.memoizedState !== null && (p = kh(
          a,
          i,
          TR,
          null,
          null,
          l
        ), Jl._currentValue = p), as(a, i), $t(a, i, s, l), i.child;
      case 6:
        return a === null && ze && ((a = l = rt) && (l = d3(
          l,
          i.pendingProps,
          Cn
        ), l !== null ? (i.stateNode = l, Nt = i, rt = null, a = !0) : a = !1), a || ra(i)), null;
      case 13:
        return i_(a, i, l);
      case 4:
        return Ce(
          i,
          i.stateNode.containerInfo
        ), s = i.pendingProps, a === null ? i.child = Wa(
          i,
          null,
          s,
          l
        ) : $t(a, i, s, l), i.child;
      case 11:
        return WS(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 7:
        return $t(
          a,
          i,
          i.pendingProps,
          l
        ), i.child;
      case 8:
        return $t(
          a,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 12:
        return $t(
          a,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 10:
        return s = i.pendingProps, aa(i, i.type, s.value), $t(a, i, s.children, l), i.child;
      case 9:
        return p = i.type._context, s = i.pendingProps.children, Ka(i), p = Rt(p), s = s(p), i.flags |= 1, $t(a, i, s, l), i.child;
      case 14:
        return ZS(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 15:
        return QS(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 19:
        return l_(a, i, l);
      case 31:
        return RR(a, i, l);
      case 22:
        return JS(
          a,
          i,
          l,
          i.pendingProps
        );
      case 24:
        return Ka(i), s = Rt(vt), a === null ? (p = jh(), p === null && (p = Je, m = Th(), p.pooledCache = m, m.refCount++, m !== null && (p.pooledCacheLanes |= l), p = m), i.memoizedState = { parent: s, cache: p }, Ch(i), aa(i, vt, p)) : ((a.lanes & l) !== 0 && (Dh(a, i), Nl(i, null, null, l), Pl()), p = a.memoizedState, m = i.memoizedState, p.parent !== s ? (p = { parent: s, cache: s }, i.memoizedState = p, i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = p), aa(i, vt, s)) : (s = m.cache, aa(i, vt, s), s !== p.cache && Ah(
          i,
          [vt],
          l,
          !0
        ))), $t(
          a,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 29:
        throw i.pendingProps;
    }
    throw Error(r(156, i.tag));
  }
  function Tr(a) {
    a.flags |= 4;
  }
  function dp(a, i, l, s, p) {
    if ((i = (a.mode & 32) !== 0) && (i = !1), i) {
      if (a.flags |= 16777216, (p & 335544128) === p)
        if (a.stateNode.complete) a.flags |= 8192;
        else if ($_()) a.flags |= 8192;
        else
          throw Fa = Hc, Mh;
    } else a.flags &= -16777217;
  }
  function c_(a, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
      a.flags &= -16777217;
    else if (a.flags |= 16777216, !wO(i))
      if ($_()) a.flags |= 8192;
      else
        throw Fa = Hc, Mh;
  }
  function os(a, i) {
    i !== null && (a.flags |= 4), a.flags & 16384 && (i = a.tag !== 22 ? I1() : 536870912, a.lanes |= i, ro |= i);
  }
  function Bl(a, i) {
    if (!ze)
      switch (a.tailMode) {
        case "hidden":
          i = a.tail;
          for (var l = null; i !== null; )
            i.alternate !== null && (l = i), i = i.sibling;
          l === null ? a.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = a.tail;
          for (var s = null; l !== null; )
            l.alternate !== null && (s = l), l = l.sibling;
          s === null ? i || a.tail === null ? a.tail = null : a.tail.sibling = null : s.sibling = null;
      }
  }
  function at(a) {
    var i = a.alternate !== null && a.alternate.child === a.child, l = 0, s = 0;
    if (i)
      for (var p = a.child; p !== null; )
        l |= p.lanes | p.childLanes, s |= p.subtreeFlags & 65011712, s |= p.flags & 65011712, p.return = a, p = p.sibling;
    else
      for (p = a.child; p !== null; )
        l |= p.lanes | p.childLanes, s |= p.subtreeFlags, s |= p.flags, p.return = a, p = p.sibling;
    return a.subtreeFlags |= s, a.childLanes = l, i;
  }
  function zR(a, i, l) {
    var s = i.pendingProps;
    switch (xh(i), i.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return at(i), null;
      case 1:
        return at(i), null;
      case 3:
        return l = i.stateNode, s = null, a !== null && (s = a.memoizedState.cache), i.memoizedState.cache !== s && (i.flags |= 2048), _r(vt), ce(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (a === null || a.child === null) && (Gi(i) ? Tr(i) : a === null || a.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, _h())), at(i), null;
      case 26:
        var p = i.type, m = i.memoizedState;
        return a === null ? (Tr(i), m !== null ? (at(i), c_(i, m)) : (at(i), dp(
          i,
          p,
          null,
          s,
          l
        ))) : m ? m !== a.memoizedState ? (Tr(i), at(i), c_(i, m)) : (at(i), i.flags &= -16777217) : (a = a.memoizedProps, a !== s && Tr(i), at(i), dp(
          i,
          p,
          a,
          s,
          l
        )), null;
      case 27:
        if (he(i), l = fe.current, p = i.type, a !== null && i.stateNode != null)
          a.memoizedProps !== s && Tr(i);
        else {
          if (!s) {
            if (i.stateNode === null)
              throw Error(r(166));
            return at(i), null;
          }
          a = se.current, Gi(i) ? Ix(i) : (a = yO(p, s, l), i.stateNode = a, Tr(i));
        }
        return at(i), null;
      case 5:
        if (he(i), p = i.type, a !== null && i.stateNode != null)
          a.memoizedProps !== s && Tr(i);
        else {
          if (!s) {
            if (i.stateNode === null)
              throw Error(r(166));
            return at(i), null;
          }
          if (m = se.current, Gi(i))
            Ix(i);
          else {
            var O = Ss(
              fe.current
            );
            switch (m) {
              case 1:
                m = O.createElementNS(
                  "http://www.w3.org/2000/svg",
                  p
                );
                break;
              case 2:
                m = O.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  p
                );
                break;
              default:
                switch (p) {
                  case "svg":
                    m = O.createElementNS(
                      "http://www.w3.org/2000/svg",
                      p
                    );
                    break;
                  case "math":
                    m = O.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      p
                    );
                    break;
                  case "script":
                    m = O.createElement("div"), m.innerHTML = "<script><\/script>", m = m.removeChild(
                      m.firstChild
                    );
                    break;
                  case "select":
                    m = typeof s.is == "string" ? O.createElement("select", {
                      is: s.is
                    }) : O.createElement("select"), s.multiple ? m.multiple = !0 : s.size && (m.size = s.size);
                    break;
                  default:
                    m = typeof s.is == "string" ? O.createElement(p, { is: s.is }) : O.createElement(p);
                }
            }
            m[Pt] = i, m[Zt] = s;
            e: for (O = i.child; O !== null; ) {
              if (O.tag === 5 || O.tag === 6)
                m.appendChild(O.stateNode);
              else if (O.tag !== 4 && O.tag !== 27 && O.child !== null) {
                O.child.return = O, O = O.child;
                continue;
              }
              if (O === i) break e;
              for (; O.sibling === null; ) {
                if (O.return === null || O.return === i)
                  break e;
                O = O.return;
              }
              O.sibling.return = O.return, O = O.sibling;
            }
            i.stateNode = m;
            e: switch (zt(m, p, s), p) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
            s && Tr(i);
          }
        }
        return at(i), dp(
          i,
          i.type,
          a === null ? null : a.memoizedProps,
          i.pendingProps,
          l
        ), null;
      case 6:
        if (a && i.stateNode != null)
          a.memoizedProps !== s && Tr(i);
        else {
          if (typeof s != "string" && i.stateNode === null)
            throw Error(r(166));
          if (a = fe.current, Gi(i)) {
            if (a = i.stateNode, l = i.memoizedProps, s = null, p = Nt, p !== null)
              switch (p.tag) {
                case 27:
                case 5:
                  s = p.memoizedProps;
              }
            a[Pt] = i, a = !!(a.nodeValue === l || s !== null && s.suppressHydrationWarning === !0 || iO(a.nodeValue, l)), a || ra(i, !0);
          } else
            a = Ss(a).createTextNode(
              s
            ), a[Pt] = i, i.stateNode = a;
        }
        return at(i), null;
      case 31:
        if (l = i.memoizedState, a === null || a.memoizedState !== null) {
          if (s = Gi(i), l !== null) {
            if (a === null) {
              if (!s) throw Error(r(318));
              if (a = i.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(557));
              a[Pt] = i;
            } else
              Ga(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            at(i), a = !1;
          } else
            l = _h(), a !== null && a.memoizedState !== null && (a.memoizedState.hydrationErrors = l), a = !0;
          if (!a)
            return i.flags & 256 ? (pn(i), i) : (pn(i), null);
          if ((i.flags & 128) !== 0)
            throw Error(r(558));
        }
        return at(i), null;
      case 13:
        if (s = i.memoizedState, a === null || a.memoizedState !== null && a.memoizedState.dehydrated !== null) {
          if (p = Gi(i), s !== null && s.dehydrated !== null) {
            if (a === null) {
              if (!p) throw Error(r(318));
              if (p = i.memoizedState, p = p !== null ? p.dehydrated : null, !p) throw Error(r(317));
              p[Pt] = i;
            } else
              Ga(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            at(i), p = !1;
          } else
            p = _h(), a !== null && a.memoizedState !== null && (a.memoizedState.hydrationErrors = p), p = !0;
          if (!p)
            return i.flags & 256 ? (pn(i), i) : (pn(i), null);
        }
        return pn(i), (i.flags & 128) !== 0 ? (i.lanes = l, i) : (l = s !== null, a = a !== null && a.memoizedState !== null, l && (s = i.child, p = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (p = s.alternate.memoizedState.cachePool.pool), m = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (m = s.memoizedState.cachePool.pool), m !== p && (s.flags |= 2048)), l !== a && l && (i.child.flags |= 8192), os(i, i.updateQueue), at(i), null);
      case 4:
        return ce(), a === null && Rp(i.stateNode.containerInfo), at(i), null;
      case 10:
        return _r(i.type), at(i), null;
      case 19:
        if (I(dt), s = i.memoizedState, s === null) return at(i), null;
        if (p = (i.flags & 128) !== 0, m = s.rendering, m === null)
          if (p) Bl(s, !1);
          else {
            if (st !== 0 || a !== null && (a.flags & 128) !== 0)
              for (a = i.child; a !== null; ) {
                if (m = Xc(a), m !== null) {
                  for (i.flags |= 128, Bl(s, !1), a = m.updateQueue, i.updateQueue = a, os(i, a), i.subtreeFlags = 0, a = l, l = i.child; l !== null; )
                    qx(l, a), l = l.sibling;
                  return re(
                    dt,
                    dt.current & 1 | 2
                  ), ze && xr(i, s.treeForkCount), i.child;
                }
                a = a.sibling;
              }
            s.tail !== null && Lt() > fs && (i.flags |= 128, p = !0, Bl(s, !1), i.lanes = 4194304);
          }
        else {
          if (!p)
            if (a = Xc(m), a !== null) {
              if (i.flags |= 128, p = !0, a = a.updateQueue, i.updateQueue = a, os(i, a), Bl(s, !0), s.tail === null && s.tailMode === "hidden" && !m.alternate && !ze)
                return at(i), null;
            } else
              2 * Lt() - s.renderingStartTime > fs && l !== 536870912 && (i.flags |= 128, p = !0, Bl(s, !1), i.lanes = 4194304);
          s.isBackwards ? (m.sibling = i.child, i.child = m) : (a = s.last, a !== null ? a.sibling = m : i.child = m, s.last = m);
        }
        return s.tail !== null ? (a = s.tail, s.rendering = a, s.tail = a.sibling, s.renderingStartTime = Lt(), a.sibling = null, l = dt.current, re(
          dt,
          p ? l & 1 | 2 : l & 1
        ), ze && xr(i, s.treeForkCount), a) : (at(i), null);
      case 22:
      case 23:
        return pn(i), $h(), s = i.memoizedState !== null, a !== null ? a.memoizedState !== null !== s && (i.flags |= 8192) : s && (i.flags |= 8192), s ? (l & 536870912) !== 0 && (i.flags & 128) === 0 && (at(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : at(i), l = i.updateQueue, l !== null && os(i, l.retryQueue), l = null, a !== null && a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== l && (i.flags |= 2048), a !== null && I(Xa), null;
      case 24:
        return l = null, a !== null && (l = a.memoizedState.cache), i.memoizedState.cache !== l && (i.flags |= 2048), _r(vt), at(i), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, i.tag));
  }
  function qR(a, i) {
    switch (xh(i), i.tag) {
      case 1:
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 3:
        return _r(vt), ce(), a = i.flags, (a & 65536) !== 0 && (a & 128) === 0 ? (i.flags = a & -65537 | 128, i) : null;
      case 26:
      case 27:
      case 5:
        return he(i), null;
      case 31:
        if (i.memoizedState !== null) {
          if (pn(i), i.alternate === null)
            throw Error(r(340));
          Ga();
        }
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 13:
        if (pn(i), a = i.memoizedState, a !== null && a.dehydrated !== null) {
          if (i.alternate === null)
            throw Error(r(340));
          Ga();
        }
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 19:
        return I(dt), null;
      case 4:
        return ce(), null;
      case 10:
        return _r(i.type), null;
      case 22:
      case 23:
        return pn(i), $h(), a !== null && I(Xa), a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 24:
        return _r(vt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function s_(a, i) {
    switch (xh(i), i.tag) {
      case 3:
        _r(vt), ce();
        break;
      case 26:
      case 27:
      case 5:
        he(i);
        break;
      case 4:
        ce();
        break;
      case 31:
        i.memoizedState !== null && pn(i);
        break;
      case 13:
        pn(i);
        break;
      case 19:
        I(dt);
        break;
      case 10:
        _r(i.type);
        break;
      case 22:
      case 23:
        pn(i), $h(), a !== null && I(Xa);
        break;
      case 24:
        _r(vt);
    }
  }
  function Ll(a, i) {
    try {
      var l = i.updateQueue, s = l !== null ? l.lastEffect : null;
      if (s !== null) {
        var p = s.next;
        l = p;
        do {
          if ((l.tag & a) === a) {
            s = void 0;
            var m = l.create, O = l.inst;
            s = m(), O.destroy = s;
          }
          l = l.next;
        } while (l !== p);
      }
    } catch (D) {
      Xe(i, i.return, D);
    }
  }
  function sa(a, i, l) {
    try {
      var s = i.updateQueue, p = s !== null ? s.lastEffect : null;
      if (p !== null) {
        var m = p.next;
        s = m;
        do {
          if ((s.tag & a) === a) {
            var O = s.inst, D = O.destroy;
            if (D !== void 0) {
              O.destroy = void 0, p = i;
              var L = l, Z = D;
              try {
                Z();
              } catch (ae) {
                Xe(
                  p,
                  L,
                  ae
                );
              }
            }
          }
          s = s.next;
        } while (s !== m);
      }
    } catch (ae) {
      Xe(i, i.return, ae);
    }
  }
  function f_(a) {
    var i = a.updateQueue;
    if (i !== null) {
      var l = a.stateNode;
      try {
        tS(i, l);
      } catch (s) {
        Xe(a, a.return, s);
      }
    }
  }
  function d_(a, i, l) {
    l.props = Qa(
      a.type,
      a.memoizedProps
    ), l.state = a.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (s) {
      Xe(a, i, s);
    }
  }
  function Ul(a, i) {
    try {
      var l = a.ref;
      if (l !== null) {
        switch (a.tag) {
          case 26:
          case 27:
          case 5:
            var s = a.stateNode;
            break;
          case 30:
            s = a.stateNode;
            break;
          default:
            s = a.stateNode;
        }
        typeof l == "function" ? a.refCleanup = l(s) : l.current = s;
      }
    } catch (p) {
      Xe(a, i, p);
    }
  }
  function tr(a, i) {
    var l = a.ref, s = a.refCleanup;
    if (l !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (p) {
          Xe(a, i, p);
        } finally {
          a.refCleanup = null, a = a.alternate, a != null && (a.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (p) {
          Xe(a, i, p);
        }
      else l.current = null;
  }
  function h_(a) {
    var i = a.type, l = a.memoizedProps, s = a.stateNode;
    try {
      e: switch (i) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && s.focus();
          break e;
        case "img":
          l.src ? s.src = l.src : l.srcSet && (s.srcset = l.srcSet);
      }
    } catch (p) {
      Xe(a, a.return, p);
    }
  }
  function hp(a, i, l) {
    try {
      var s = a.stateNode;
      i3(s, a.type, l, i), s[Zt] = i;
    } catch (p) {
      Xe(a, a.return, p);
    }
  }
  function p_(a) {
    return a.tag === 5 || a.tag === 3 || a.tag === 26 || a.tag === 27 && ma(a.type) || a.tag === 4;
  }
  function pp(a) {
    e: for (; ; ) {
      for (; a.sibling === null; ) {
        if (a.return === null || p_(a.return)) return null;
        a = a.return;
      }
      for (a.sibling.return = a.return, a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18; ) {
        if (a.tag === 27 && ma(a.type) || a.flags & 2 || a.child === null || a.tag === 4) continue e;
        a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function vp(a, i, l) {
    var s = a.tag;
    if (s === 5 || s === 6)
      a = a.stateNode, i ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(a, i) : (i = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, i.appendChild(a), l = l._reactRootContainer, l != null || i.onclick !== null || (i.onclick = mr));
    else if (s !== 4 && (s === 27 && ma(a.type) && (l = a.stateNode, i = null), a = a.child, a !== null))
      for (vp(a, i, l), a = a.sibling; a !== null; )
        vp(a, i, l), a = a.sibling;
  }
  function ls(a, i, l) {
    var s = a.tag;
    if (s === 5 || s === 6)
      a = a.stateNode, i ? l.insertBefore(a, i) : l.appendChild(a);
    else if (s !== 4 && (s === 27 && ma(a.type) && (l = a.stateNode), a = a.child, a !== null))
      for (ls(a, i, l), a = a.sibling; a !== null; )
        ls(a, i, l), a = a.sibling;
  }
  function v_(a) {
    var i = a.stateNode, l = a.memoizedProps;
    try {
      for (var s = a.type, p = i.attributes; p.length; )
        i.removeAttributeNode(p[0]);
      zt(i, s, l), i[Pt] = a, i[Zt] = l;
    } catch (m) {
      Xe(a, a.return, m);
    }
  }
  var Er = !1, gt = !1, yp = !1, y_ = typeof WeakSet == "function" ? WeakSet : Set, Mt = null;
  function kR(a, i) {
    if (a = a.containerInfo, qp = js, a = jx(a), ch(a)) {
      if ("selectionStart" in a)
        var l = {
          start: a.selectionStart,
          end: a.selectionEnd
        };
      else
        e: {
          l = (l = a.ownerDocument) && l.defaultView || window;
          var s = l.getSelection && l.getSelection();
          if (s && s.rangeCount !== 0) {
            l = s.anchorNode;
            var p = s.anchorOffset, m = s.focusNode;
            s = s.focusOffset;
            try {
              l.nodeType, m.nodeType;
            } catch {
              l = null;
              break e;
            }
            var O = 0, D = -1, L = -1, Z = 0, ae = 0, le = a, Q = null;
            t: for (; ; ) {
              for (var te; le !== l || p !== 0 && le.nodeType !== 3 || (D = O + p), le !== m || s !== 0 && le.nodeType !== 3 || (L = O + s), le.nodeType === 3 && (O += le.nodeValue.length), (te = le.firstChild) !== null; )
                Q = le, le = te;
              for (; ; ) {
                if (le === a) break t;
                if (Q === l && ++Z === p && (D = O), Q === m && ++ae === s && (L = O), (te = le.nextSibling) !== null) break;
                le = Q, Q = le.parentNode;
              }
              le = te;
            }
            l = D === -1 || L === -1 ? null : { start: D, end: L };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (kp = { focusedElem: a, selectionRange: l }, js = !1, Mt = i; Mt !== null; )
      if (i = Mt, a = i.child, (i.subtreeFlags & 1028) !== 0 && a !== null)
        a.return = i, Mt = a;
      else
        for (; Mt !== null; ) {
          switch (i = Mt, m = i.alternate, a = i.flags, i.tag) {
            case 0:
              if ((a & 4) !== 0 && (a = i.updateQueue, a = a !== null ? a.events : null, a !== null))
                for (l = 0; l < a.length; l++)
                  p = a[l], p.ref.impl = p.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((a & 1024) !== 0 && m !== null) {
                a = void 0, l = i, p = m.memoizedProps, m = m.memoizedState, s = l.stateNode;
                try {
                  var ye = Qa(
                    l.type,
                    p
                  );
                  a = s.getSnapshotBeforeUpdate(
                    ye,
                    m
                  ), s.__reactInternalSnapshotBeforeUpdate = a;
                } catch (Se) {
                  Xe(
                    l,
                    l.return,
                    Se
                  );
                }
              }
              break;
            case 3:
              if ((a & 1024) !== 0) {
                if (a = i.stateNode.containerInfo, l = a.nodeType, l === 9)
                  Up(a);
                else if (l === 1)
                  switch (a.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Up(a);
                      break;
                    default:
                      a.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((a & 1024) !== 0) throw Error(r(163));
          }
          if (a = i.sibling, a !== null) {
            a.return = i.return, Mt = a;
            break;
          }
          Mt = i.return;
        }
  }
  function m_(a, i, l) {
    var s = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Mr(a, l), s & 4 && Ll(5, l);
        break;
      case 1:
        if (Mr(a, l), s & 4)
          if (a = l.stateNode, i === null)
            try {
              a.componentDidMount();
            } catch (O) {
              Xe(l, l.return, O);
            }
          else {
            var p = Qa(
              l.type,
              i.memoizedProps
            );
            i = i.memoizedState;
            try {
              a.componentDidUpdate(
                p,
                i,
                a.__reactInternalSnapshotBeforeUpdate
              );
            } catch (O) {
              Xe(
                l,
                l.return,
                O
              );
            }
          }
        s & 64 && f_(l), s & 512 && Ul(l, l.return);
        break;
      case 3:
        if (Mr(a, l), s & 64 && (a = l.updateQueue, a !== null)) {
          if (i = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                i = l.child.stateNode;
                break;
              case 1:
                i = l.child.stateNode;
            }
          try {
            tS(a, i);
          } catch (O) {
            Xe(l, l.return, O);
          }
        }
        break;
      case 27:
        i === null && s & 4 && v_(l);
      case 26:
      case 5:
        Mr(a, l), i === null && s & 4 && h_(l), s & 512 && Ul(l, l.return);
        break;
      case 12:
        Mr(a, l);
        break;
      case 31:
        Mr(a, l), s & 4 && x_(a, l);
        break;
      case 13:
        Mr(a, l), s & 4 && S_(a, l), s & 64 && (a = l.memoizedState, a !== null && (a = a.dehydrated, a !== null && (l = XR.bind(
          null,
          l
        ), h3(a, l))));
        break;
      case 22:
        if (s = l.memoizedState !== null || Er, !s) {
          i = i !== null && i.memoizedState !== null || gt, p = Er;
          var m = gt;
          Er = s, (gt = i) && !m ? Cr(
            a,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Mr(a, l), Er = p, gt = m;
        }
        break;
      case 30:
        break;
      default:
        Mr(a, l);
    }
  }
  function g_(a) {
    var i = a.alternate;
    i !== null && (a.alternate = null, g_(i)), a.child = null, a.deletions = null, a.sibling = null, a.tag === 5 && (i = a.stateNode, i !== null && Kd(i)), a.stateNode = null, a.return = null, a.dependencies = null, a.memoizedProps = null, a.memoizedState = null, a.pendingProps = null, a.stateNode = null, a.updateQueue = null;
  }
  var lt = null, Jt = !1;
  function jr(a, i, l) {
    for (l = l.child; l !== null; )
      b_(a, i, l), l = l.sibling;
  }
  function b_(a, i, l) {
    if (cn && typeof cn.onCommitFiberUnmount == "function")
      try {
        cn.onCommitFiberUnmount(fl, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        gt || tr(l, i), jr(
          a,
          i,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        gt || tr(l, i);
        var s = lt, p = Jt;
        ma(l.type) && (lt = l.stateNode, Jt = !1), jr(
          a,
          i,
          l
        ), Wl(l.stateNode), lt = s, Jt = p;
        break;
      case 5:
        gt || tr(l, i);
      case 6:
        if (s = lt, p = Jt, lt = null, jr(
          a,
          i,
          l
        ), lt = s, Jt = p, lt !== null)
          if (Jt)
            try {
              (lt.nodeType === 9 ? lt.body : lt.nodeName === "HTML" ? lt.ownerDocument.body : lt).removeChild(l.stateNode);
            } catch (m) {
              Xe(
                l,
                i,
                m
              );
            }
          else
            try {
              lt.removeChild(l.stateNode);
            } catch (m) {
              Xe(
                l,
                i,
                m
              );
            }
        break;
      case 18:
        lt !== null && (Jt ? (a = lt, fO(
          a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a,
          l.stateNode
        ), fo(a)) : fO(lt, l.stateNode));
        break;
      case 4:
        s = lt, p = Jt, lt = l.stateNode.containerInfo, Jt = !0, jr(
          a,
          i,
          l
        ), lt = s, Jt = p;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, l, i), gt || sa(4, l, i), jr(
          a,
          i,
          l
        );
        break;
      case 1:
        gt || (tr(l, i), s = l.stateNode, typeof s.componentWillUnmount == "function" && d_(
          l,
          i,
          s
        )), jr(
          a,
          i,
          l
        );
        break;
      case 21:
        jr(
          a,
          i,
          l
        );
        break;
      case 22:
        gt = (s = gt) || l.memoizedState !== null, jr(
          a,
          i,
          l
        ), gt = s;
        break;
      default:
        jr(
          a,
          i,
          l
        );
    }
  }
  function x_(a, i) {
    if (i.memoizedState === null && (a = i.alternate, a !== null && (a = a.memoizedState, a !== null))) {
      a = a.dehydrated;
      try {
        fo(a);
      } catch (l) {
        Xe(i, i.return, l);
      }
    }
  }
  function S_(a, i) {
    if (i.memoizedState === null && (a = i.alternate, a !== null && (a = a.memoizedState, a !== null && (a = a.dehydrated, a !== null))))
      try {
        fo(a);
      } catch (l) {
        Xe(i, i.return, l);
      }
  }
  function BR(a) {
    switch (a.tag) {
      case 31:
      case 13:
      case 19:
        var i = a.stateNode;
        return i === null && (i = a.stateNode = new y_()), i;
      case 22:
        return a = a.stateNode, i = a._retryCache, i === null && (i = a._retryCache = new y_()), i;
      default:
        throw Error(r(435, a.tag));
    }
  }
  function us(a, i) {
    var l = BR(a);
    i.forEach(function(s) {
      if (!l.has(s)) {
        l.add(s);
        var p = VR.bind(null, a, s);
        s.then(p, p);
      }
    });
  }
  function en(a, i) {
    var l = i.deletions;
    if (l !== null)
      for (var s = 0; s < l.length; s++) {
        var p = l[s], m = a, O = i, D = O;
        e: for (; D !== null; ) {
          switch (D.tag) {
            case 27:
              if (ma(D.type)) {
                lt = D.stateNode, Jt = !1;
                break e;
              }
              break;
            case 5:
              lt = D.stateNode, Jt = !1;
              break e;
            case 3:
            case 4:
              lt = D.stateNode.containerInfo, Jt = !0;
              break e;
          }
          D = D.return;
        }
        if (lt === null) throw Error(r(160));
        b_(m, O, p), lt = null, Jt = !1, m = p.alternate, m !== null && (m.return = null), p.return = null;
      }
    if (i.subtreeFlags & 13886)
      for (i = i.child; i !== null; )
        __(i, a), i = i.sibling;
  }
  var Hn = null;
  function __(a, i) {
    var l = a.alternate, s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        en(i, a), tn(a), s & 4 && (sa(3, a, a.return), Ll(3, a), sa(5, a, a.return));
        break;
      case 1:
        en(i, a), tn(a), s & 512 && (gt || l === null || tr(l, l.return)), s & 64 && Er && (a = a.updateQueue, a !== null && (s = a.callbacks, s !== null && (l = a.shared.hiddenCallbacks, a.shared.hiddenCallbacks = l === null ? s : l.concat(s))));
        break;
      case 26:
        var p = Hn;
        if (en(i, a), tn(a), s & 512 && (gt || l === null || tr(l, l.return)), s & 4) {
          var m = l !== null ? l.memoizedState : null;
          if (s = a.memoizedState, l === null)
            if (s === null)
              if (a.stateNode === null) {
                e: {
                  s = a.type, l = a.memoizedProps, p = p.ownerDocument || p;
                  t: switch (s) {
                    case "title":
                      m = p.getElementsByTagName("title")[0], (!m || m[pl] || m[Pt] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = p.createElement(s), p.head.insertBefore(
                        m,
                        p.querySelector("head > title")
                      )), zt(m, s, l), m[Pt] = a, jt(m), s = m;
                      break e;
                    case "link":
                      var O = _O(
                        "link",
                        "href",
                        p
                      ).get(s + (l.href || ""));
                      if (O) {
                        for (var D = 0; D < O.length; D++)
                          if (m = O[D], m.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && m.getAttribute("rel") === (l.rel == null ? null : l.rel) && m.getAttribute("title") === (l.title == null ? null : l.title) && m.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            O.splice(D, 1);
                            break t;
                          }
                      }
                      m = p.createElement(s), zt(m, s, l), p.head.appendChild(m);
                      break;
                    case "meta":
                      if (O = _O(
                        "meta",
                        "content",
                        p
                      ).get(s + (l.content || ""))) {
                        for (D = 0; D < O.length; D++)
                          if (m = O[D], m.getAttribute("content") === (l.content == null ? null : "" + l.content) && m.getAttribute("name") === (l.name == null ? null : l.name) && m.getAttribute("property") === (l.property == null ? null : l.property) && m.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && m.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            O.splice(D, 1);
                            break t;
                          }
                      }
                      m = p.createElement(s), zt(m, s, l), p.head.appendChild(m);
                      break;
                    default:
                      throw Error(r(468, s));
                  }
                  m[Pt] = a, jt(m), s = m;
                }
                a.stateNode = s;
              } else
                OO(
                  p,
                  a.type,
                  a.stateNode
                );
            else
              a.stateNode = SO(
                p,
                s,
                a.memoizedProps
              );
          else
            m !== s ? (m === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : m.count--, s === null ? OO(
              p,
              a.type,
              a.stateNode
            ) : SO(
              p,
              s,
              a.memoizedProps
            )) : s === null && a.stateNode !== null && hp(
              a,
              a.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        en(i, a), tn(a), s & 512 && (gt || l === null || tr(l, l.return)), l !== null && s & 4 && hp(
          a,
          a.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (en(i, a), tn(a), s & 512 && (gt || l === null || tr(l, l.return)), a.flags & 32) {
          p = a.stateNode;
          try {
            Ri(p, "");
          } catch (ye) {
            Xe(a, a.return, ye);
          }
        }
        s & 4 && a.stateNode != null && (p = a.memoizedProps, hp(
          a,
          p,
          l !== null ? l.memoizedProps : p
        )), s & 1024 && (yp = !0);
        break;
      case 6:
        if (en(i, a), tn(a), s & 4) {
          if (a.stateNode === null)
            throw Error(r(162));
          s = a.memoizedProps, l = a.stateNode;
          try {
            l.nodeValue = s;
          } catch (ye) {
            Xe(a, a.return, ye);
          }
        }
        break;
      case 3:
        if (ws = null, p = Hn, Hn = _s(i.containerInfo), en(i, a), Hn = p, tn(a), s & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            fo(i.containerInfo);
          } catch (ye) {
            Xe(a, a.return, ye);
          }
        yp && (yp = !1, O_(a));
        break;
      case 4:
        s = Hn, Hn = _s(
          a.stateNode.containerInfo
        ), en(i, a), tn(a), Hn = s;
        break;
      case 12:
        en(i, a), tn(a);
        break;
      case 31:
        en(i, a), tn(a), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, us(a, s)));
        break;
      case 13:
        en(i, a), tn(a), a.child.flags & 8192 && a.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ss = Lt()), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, us(a, s)));
        break;
      case 22:
        p = a.memoizedState !== null;
        var L = l !== null && l.memoizedState !== null, Z = Er, ae = gt;
        if (Er = Z || p, gt = ae || L, en(i, a), gt = ae, Er = Z, tn(a), s & 8192)
          e: for (i = a.stateNode, i._visibility = p ? i._visibility & -2 : i._visibility | 1, p && (l === null || L || Er || gt || Ja(a)), l = null, i = a; ; ) {
            if (i.tag === 5 || i.tag === 26) {
              if (l === null) {
                L = l = i;
                try {
                  if (m = L.stateNode, p)
                    O = m.style, typeof O.setProperty == "function" ? O.setProperty("display", "none", "important") : O.display = "none";
                  else {
                    D = L.stateNode;
                    var le = L.memoizedProps.style, Q = le != null && le.hasOwnProperty("display") ? le.display : null;
                    D.style.display = Q == null || typeof Q == "boolean" ? "" : ("" + Q).trim();
                  }
                } catch (ye) {
                  Xe(L, L.return, ye);
                }
              }
            } else if (i.tag === 6) {
              if (l === null) {
                L = i;
                try {
                  L.stateNode.nodeValue = p ? "" : L.memoizedProps;
                } catch (ye) {
                  Xe(L, L.return, ye);
                }
              }
            } else if (i.tag === 18) {
              if (l === null) {
                L = i;
                try {
                  var te = L.stateNode;
                  p ? dO(te, !0) : dO(L.stateNode, !1);
                } catch (ye) {
                  Xe(L, L.return, ye);
                }
              }
            } else if ((i.tag !== 22 && i.tag !== 23 || i.memoizedState === null || i === a) && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === a) break e;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === a) break e;
              l === i && (l = null), i = i.return;
            }
            l === i && (l = null), i.sibling.return = i.return, i = i.sibling;
          }
        s & 4 && (s = a.updateQueue, s !== null && (l = s.retryQueue, l !== null && (s.retryQueue = null, us(a, l))));
        break;
      case 19:
        en(i, a), tn(a), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, us(a, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        en(i, a), tn(a);
    }
  }
  function tn(a) {
    var i = a.flags;
    if (i & 2) {
      try {
        for (var l, s = a.return; s !== null; ) {
          if (p_(s)) {
            l = s;
            break;
          }
          s = s.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var p = l.stateNode, m = pp(a);
            ls(a, m, p);
            break;
          case 5:
            var O = l.stateNode;
            l.flags & 32 && (Ri(O, ""), l.flags &= -33);
            var D = pp(a);
            ls(a, D, O);
            break;
          case 3:
          case 4:
            var L = l.stateNode.containerInfo, Z = pp(a);
            vp(
              a,
              Z,
              L
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (ae) {
        Xe(a, a.return, ae);
      }
      a.flags &= -3;
    }
    i & 4096 && (a.flags &= -4097);
  }
  function O_(a) {
    if (a.subtreeFlags & 1024)
      for (a = a.child; a !== null; ) {
        var i = a;
        O_(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), a = a.sibling;
      }
  }
  function Mr(a, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; )
        m_(a, i.alternate, i), i = i.sibling;
  }
  function Ja(a) {
    for (a = a.child; a !== null; ) {
      var i = a;
      switch (i.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sa(4, i, i.return), Ja(i);
          break;
        case 1:
          tr(i, i.return);
          var l = i.stateNode;
          typeof l.componentWillUnmount == "function" && d_(
            i,
            i.return,
            l
          ), Ja(i);
          break;
        case 27:
          Wl(i.stateNode);
        case 26:
        case 5:
          tr(i, i.return), Ja(i);
          break;
        case 22:
          i.memoizedState === null && Ja(i);
          break;
        case 30:
          Ja(i);
          break;
        default:
          Ja(i);
      }
      a = a.sibling;
    }
  }
  function Cr(a, i, l) {
    for (l = l && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
      var s = i.alternate, p = a, m = i, O = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Cr(
            p,
            m,
            l
          ), Ll(4, m);
          break;
        case 1:
          if (Cr(
            p,
            m,
            l
          ), s = m, p = s.stateNode, typeof p.componentDidMount == "function")
            try {
              p.componentDidMount();
            } catch (Z) {
              Xe(s, s.return, Z);
            }
          if (s = m, p = s.updateQueue, p !== null) {
            var D = s.stateNode;
            try {
              var L = p.shared.hiddenCallbacks;
              if (L !== null)
                for (p.shared.hiddenCallbacks = null, p = 0; p < L.length; p++)
                  eS(L[p], D);
            } catch (Z) {
              Xe(s, s.return, Z);
            }
          }
          l && O & 64 && f_(m), Ul(m, m.return);
          break;
        case 27:
          v_(m);
        case 26:
        case 5:
          Cr(
            p,
            m,
            l
          ), l && s === null && O & 4 && h_(m), Ul(m, m.return);
          break;
        case 12:
          Cr(
            p,
            m,
            l
          );
          break;
        case 31:
          Cr(
            p,
            m,
            l
          ), l && O & 4 && x_(p, m);
          break;
        case 13:
          Cr(
            p,
            m,
            l
          ), l && O & 4 && S_(p, m);
          break;
        case 22:
          m.memoizedState === null && Cr(
            p,
            m,
            l
          ), Ul(m, m.return);
          break;
        case 30:
          break;
        default:
          Cr(
            p,
            m,
            l
          );
      }
      i = i.sibling;
    }
  }
  function mp(a, i) {
    var l = null;
    a !== null && a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), a = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (a = i.memoizedState.cachePool.pool), a !== l && (a != null && a.refCount++, l != null && El(l));
  }
  function gp(a, i) {
    a = null, i.alternate !== null && (a = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== a && (i.refCount++, a != null && El(a));
  }
  function Gn(a, i, l, s) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; )
        w_(
          a,
          i,
          l,
          s
        ), i = i.sibling;
  }
  function w_(a, i, l, s) {
    var p = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Gn(
          a,
          i,
          l,
          s
        ), p & 2048 && Ll(9, i);
        break;
      case 1:
        Gn(
          a,
          i,
          l,
          s
        );
        break;
      case 3:
        Gn(
          a,
          i,
          l,
          s
        ), p & 2048 && (a = null, i.alternate !== null && (a = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== a && (i.refCount++, a != null && El(a)));
        break;
      case 12:
        if (p & 2048) {
          Gn(
            a,
            i,
            l,
            s
          ), a = i.stateNode;
          try {
            var m = i.memoizedProps, O = m.id, D = m.onPostCommit;
            typeof D == "function" && D(
              O,
              i.alternate === null ? "mount" : "update",
              a.passiveEffectDuration,
              -0
            );
          } catch (L) {
            Xe(i, i.return, L);
          }
        } else
          Gn(
            a,
            i,
            l,
            s
          );
        break;
      case 31:
        Gn(
          a,
          i,
          l,
          s
        );
        break;
      case 13:
        Gn(
          a,
          i,
          l,
          s
        );
        break;
      case 23:
        break;
      case 22:
        m = i.stateNode, O = i.alternate, i.memoizedState !== null ? m._visibility & 2 ? Gn(
          a,
          i,
          l,
          s
        ) : Il(a, i) : m._visibility & 2 ? Gn(
          a,
          i,
          l,
          s
        ) : (m._visibility |= 2, eo(
          a,
          i,
          l,
          s,
          (i.subtreeFlags & 10256) !== 0 || !1
        )), p & 2048 && mp(O, i);
        break;
      case 24:
        Gn(
          a,
          i,
          l,
          s
        ), p & 2048 && gp(i.alternate, i);
        break;
      default:
        Gn(
          a,
          i,
          l,
          s
        );
    }
  }
  function eo(a, i, l, s, p) {
    for (p = p && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
      var m = a, O = i, D = l, L = s, Z = O.flags;
      switch (O.tag) {
        case 0:
        case 11:
        case 15:
          eo(
            m,
            O,
            D,
            L,
            p
          ), Ll(8, O);
          break;
        case 23:
          break;
        case 22:
          var ae = O.stateNode;
          O.memoizedState !== null ? ae._visibility & 2 ? eo(
            m,
            O,
            D,
            L,
            p
          ) : Il(
            m,
            O
          ) : (ae._visibility |= 2, eo(
            m,
            O,
            D,
            L,
            p
          )), p && Z & 2048 && mp(
            O.alternate,
            O
          );
          break;
        case 24:
          eo(
            m,
            O,
            D,
            L,
            p
          ), p && Z & 2048 && gp(O.alternate, O);
          break;
        default:
          eo(
            m,
            O,
            D,
            L,
            p
          );
      }
      i = i.sibling;
    }
  }
  function Il(a, i) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) {
        var l = a, s = i, p = s.flags;
        switch (s.tag) {
          case 22:
            Il(l, s), p & 2048 && mp(
              s.alternate,
              s
            );
            break;
          case 24:
            Il(l, s), p & 2048 && gp(s.alternate, s);
            break;
          default:
            Il(l, s);
        }
        i = i.sibling;
      }
  }
  var Hl = 8192;
  function to(a, i, l) {
    if (a.subtreeFlags & Hl)
      for (a = a.child; a !== null; )
        A_(
          a,
          i,
          l
        ), a = a.sibling;
  }
  function A_(a, i, l) {
    switch (a.tag) {
      case 26:
        to(
          a,
          i,
          l
        ), a.flags & Hl && a.memoizedState !== null && A3(
          l,
          Hn,
          a.memoizedState,
          a.memoizedProps
        );
        break;
      case 5:
        to(
          a,
          i,
          l
        );
        break;
      case 3:
      case 4:
        var s = Hn;
        Hn = _s(a.stateNode.containerInfo), to(
          a,
          i,
          l
        ), Hn = s;
        break;
      case 22:
        a.memoizedState === null && (s = a.alternate, s !== null && s.memoizedState !== null ? (s = Hl, Hl = 16777216, to(
          a,
          i,
          l
        ), Hl = s) : to(
          a,
          i,
          l
        ));
        break;
      default:
        to(
          a,
          i,
          l
        );
    }
  }
  function T_(a) {
    var i = a.alternate;
    if (i !== null && (a = i.child, a !== null)) {
      i.child = null;
      do
        i = a.sibling, a.sibling = null, a = i;
      while (a !== null);
    }
  }
  function Gl(a) {
    var i = a.deletions;
    if ((a.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l];
          Mt = s, j_(
            s,
            a
          );
        }
      T_(a);
    }
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        E_(a), a = a.sibling;
  }
  function E_(a) {
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Gl(a), a.flags & 2048 && sa(9, a, a.return);
        break;
      case 3:
        Gl(a);
        break;
      case 12:
        Gl(a);
        break;
      case 22:
        var i = a.stateNode;
        a.memoizedState !== null && i._visibility & 2 && (a.return === null || a.return.tag !== 13) ? (i._visibility &= -3, cs(a)) : Gl(a);
        break;
      default:
        Gl(a);
    }
  }
  function cs(a) {
    var i = a.deletions;
    if ((a.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l];
          Mt = s, j_(
            s,
            a
          );
        }
      T_(a);
    }
    for (a = a.child; a !== null; ) {
      switch (i = a, i.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, i, i.return), cs(i);
          break;
        case 22:
          l = i.stateNode, l._visibility & 2 && (l._visibility &= -3, cs(i));
          break;
        default:
          cs(i);
      }
      a = a.sibling;
    }
  }
  function j_(a, i) {
    for (; Mt !== null; ) {
      var l = Mt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, l, i);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var s = l.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          El(l.memoizedState.cache);
      }
      if (s = l.child, s !== null) s.return = l, Mt = s;
      else
        e: for (l = a; Mt !== null; ) {
          s = Mt;
          var p = s.sibling, m = s.return;
          if (g_(s), s === l) {
            Mt = null;
            break e;
          }
          if (p !== null) {
            p.return = m, Mt = p;
            break e;
          }
          Mt = m;
        }
    }
  }
  var LR = {
    getCacheForType: function(a) {
      var i = Rt(vt), l = i.data.get(a);
      return l === void 0 && (l = a(), i.data.set(a, l)), l;
    },
    cacheSignal: function() {
      return Rt(vt).controller.signal;
    }
  }, UR = typeof WeakMap == "function" ? WeakMap : Map, Ue = 0, Je = null, De = null, Ne = 0, Ke = 0, vn = null, fa = !1, no = !1, bp = !1, Dr = 0, st = 0, da = 0, ei = 0, xp = 0, yn = 0, ro = 0, Yl = null, nn = null, Sp = !1, ss = 0, M_ = 0, fs = 1 / 0, ds = null, ha = null, St = 0, pa = null, ao = null, Pr = 0, _p = 0, Op = null, C_ = null, Kl = 0, wp = null;
  function mn() {
    return (Ue & 2) !== 0 && Ne !== 0 ? Ne & -Ne : $.T !== null ? Cp() : K1();
  }
  function D_() {
    if (yn === 0)
      if ((Ne & 536870912) === 0 || ze) {
        var a = xc;
        xc <<= 1, (xc & 3932160) === 0 && (xc = 262144), yn = a;
      } else yn = 536870912;
    return a = hn.current, a !== null && (a.flags |= 32), yn;
  }
  function rn(a, i, l) {
    (a === Je && (Ke === 2 || Ke === 9) || a.cancelPendingCommit !== null) && (io(a, 0), va(
      a,
      Ne,
      yn,
      !1
    )), hl(a, l), ((Ue & 2) === 0 || a !== Je) && (a === Je && ((Ue & 2) === 0 && (ei |= l), st === 4 && va(
      a,
      Ne,
      yn,
      !1
    )), nr(a));
  }
  function P_(a, i, l) {
    if ((Ue & 6) !== 0) throw Error(r(327));
    var s = !l && (i & 127) === 0 && (i & a.expiredLanes) === 0 || dl(a, i), p = s ? GR(a, i) : Tp(a, i, !0), m = s;
    do {
      if (p === 0) {
        no && !s && va(a, i, 0, !1);
        break;
      } else {
        if (l = a.current.alternate, m && !IR(l)) {
          p = Tp(a, i, !1), m = !1;
          continue;
        }
        if (p === 2) {
          if (m = i, a.errorRecoveryDisabledLanes & m)
            var O = 0;
          else
            O = a.pendingLanes & -536870913, O = O !== 0 ? O : O & 536870912 ? 536870912 : 0;
          if (O !== 0) {
            i = O;
            e: {
              var D = a;
              p = Yl;
              var L = D.current.memoizedState.isDehydrated;
              if (L && (io(D, O).flags |= 256), O = Tp(
                D,
                O,
                !1
              ), O !== 2) {
                if (bp && !L) {
                  D.errorRecoveryDisabledLanes |= m, ei |= m, p = 4;
                  break e;
                }
                m = nn, nn = p, m !== null && (nn === null ? nn = m : nn.push.apply(
                  nn,
                  m
                ));
              }
              p = O;
            }
            if (m = !1, p !== 2) continue;
          }
        }
        if (p === 1) {
          io(a, 0), va(a, i, 0, !0);
          break;
        }
        e: {
          switch (s = a, m = p, m) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((i & 4194048) !== i) break;
            case 6:
              va(
                s,
                i,
                yn,
                !fa
              );
              break e;
            case 2:
              nn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((i & 62914560) === i && (p = ss + 300 - Lt(), 10 < p)) {
            if (va(
              s,
              i,
              yn,
              !fa
            ), _c(s, 0, !0) !== 0) break e;
            Pr = i, s.timeoutHandle = cO(
              N_.bind(
                null,
                s,
                l,
                nn,
                ds,
                Sp,
                i,
                yn,
                ei,
                ro,
                fa,
                m,
                "Throttled",
                -0,
                0
              ),
              p
            );
            break e;
          }
          N_(
            s,
            l,
            nn,
            ds,
            Sp,
            i,
            yn,
            ei,
            ro,
            fa,
            m,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    nr(a);
  }
  function N_(a, i, l, s, p, m, O, D, L, Z, ae, le, Q, te) {
    if (a.timeoutHandle = -1, le = i.subtreeFlags, le & 8192 || (le & 16785408) === 16785408) {
      le = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: mr
      }, A_(
        i,
        m,
        le
      );
      var ye = (m & 62914560) === m ? ss - Lt() : (m & 4194048) === m ? M_ - Lt() : 0;
      if (ye = T3(
        le,
        ye
      ), ye !== null) {
        Pr = m, a.cancelPendingCommit = ye(
          U_.bind(
            null,
            a,
            i,
            m,
            l,
            s,
            p,
            O,
            D,
            L,
            ae,
            le,
            null,
            Q,
            te
          )
        ), va(a, m, O, !Z);
        return;
      }
    }
    U_(
      a,
      i,
      m,
      l,
      s,
      p,
      O,
      D,
      L
    );
  }
  function IR(a) {
    for (var i = a; ; ) {
      var l = i.tag;
      if ((l === 0 || l === 11 || l === 15) && i.flags & 16384 && (l = i.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var s = 0; s < l.length; s++) {
          var p = l[s], m = p.getSnapshot;
          p = p.value;
          try {
            if (!fn(m(), p)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = i.child, i.subtreeFlags & 16384 && l !== null)
        l.return = i, i = l;
      else {
        if (i === a) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === a) return !0;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    return !0;
  }
  function va(a, i, l, s) {
    i &= ~xp, i &= ~ei, a.suspendedLanes |= i, a.pingedLanes &= ~i, s && (a.warmLanes |= i), s = a.expirationTimes;
    for (var p = i; 0 < p; ) {
      var m = 31 - sn(p), O = 1 << m;
      s[m] = -1, p &= ~O;
    }
    l !== 0 && H1(a, l, i);
  }
  function hs() {
    return (Ue & 6) === 0 ? (Xl(0), !1) : !0;
  }
  function Ap() {
    if (De !== null) {
      if (Ke === 0)
        var a = De.return;
      else
        a = De, Sr = Ya = null, Uh(a), Fi = null, Ml = 0, a = De;
      for (; a !== null; )
        s_(a.alternate, a), a = a.return;
      De = null;
    }
  }
  function io(a, i) {
    var l = a.timeoutHandle;
    l !== -1 && (a.timeoutHandle = -1, u3(l)), l = a.cancelPendingCommit, l !== null && (a.cancelPendingCommit = null, l()), Pr = 0, Ap(), Je = a, De = l = br(a.current, null), Ne = i, Ke = 0, vn = null, fa = !1, no = dl(a, i), bp = !1, ro = yn = xp = ei = da = st = 0, nn = Yl = null, Sp = !1, (i & 8) !== 0 && (i |= i & 32);
    var s = a.entangledLanes;
    if (s !== 0)
      for (a = a.entanglements, s &= i; 0 < s; ) {
        var p = 31 - sn(s), m = 1 << p;
        i |= a[p], s &= ~m;
      }
    return Dr = i, Rc(), l;
  }
  function R_(a, i) {
    je = null, $.H = ql, i === Vi || i === Ic ? (i = Wx(), Ke = 3) : i === Mh ? (i = Wx(), Ke = 4) : Ke = i === rp ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1, vn = i, De === null && (st = 1, ns(
      a,
      En(i, a.current)
    ));
  }
  function $_() {
    var a = hn.current;
    return a === null ? !0 : (Ne & 4194048) === Ne ? Dn === null : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0 ? a === Dn : !1;
  }
  function z_() {
    var a = $.H;
    return $.H = ql, a === null ? ql : a;
  }
  function q_() {
    var a = $.A;
    return $.A = LR, a;
  }
  function ps() {
    st = 4, fa || (Ne & 4194048) !== Ne && hn.current !== null || (no = !0), (da & 134217727) === 0 && (ei & 134217727) === 0 || Je === null || va(
      Je,
      Ne,
      yn,
      !1
    );
  }
  function Tp(a, i, l) {
    var s = Ue;
    Ue |= 2;
    var p = z_(), m = q_();
    (Je !== a || Ne !== i) && (ds = null, io(a, i)), i = !1;
    var O = st;
    e: do
      try {
        if (Ke !== 0 && De !== null) {
          var D = De, L = vn;
          switch (Ke) {
            case 8:
              Ap(), O = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              hn.current === null && (i = !0);
              var Z = Ke;
              if (Ke = 0, vn = null, oo(a, D, L, Z), l && no) {
                O = 0;
                break e;
              }
              break;
            default:
              Z = Ke, Ke = 0, vn = null, oo(a, D, L, Z);
          }
        }
        HR(), O = st;
        break;
      } catch (ae) {
        R_(a, ae);
      }
    while (!0);
    return i && a.shellSuspendCounter++, Sr = Ya = null, Ue = s, $.H = p, $.A = m, De === null && (Je = null, Ne = 0, Rc()), O;
  }
  function HR() {
    for (; De !== null; ) k_(De);
  }
  function GR(a, i) {
    var l = Ue;
    Ue |= 2;
    var s = z_(), p = q_();
    Je !== a || Ne !== i ? (ds = null, fs = Lt() + 500, io(a, i)) : no = dl(
      a,
      i
    );
    e: do
      try {
        if (Ke !== 0 && De !== null) {
          i = De;
          var m = vn;
          t: switch (Ke) {
            case 1:
              Ke = 0, vn = null, oo(a, i, m, 1);
              break;
            case 2:
            case 9:
              if (Vx(m)) {
                Ke = 0, vn = null, B_(i);
                break;
              }
              i = function() {
                Ke !== 2 && Ke !== 9 || Je !== a || (Ke = 7), nr(a);
              }, m.then(i, i);
              break e;
            case 3:
              Ke = 7;
              break e;
            case 4:
              Ke = 5;
              break e;
            case 7:
              Vx(m) ? (Ke = 0, vn = null, B_(i)) : (Ke = 0, vn = null, oo(a, i, m, 7));
              break;
            case 5:
              var O = null;
              switch (De.tag) {
                case 26:
                  O = De.memoizedState;
                case 5:
                case 27:
                  var D = De;
                  if (O ? wO(O) : D.stateNode.complete) {
                    Ke = 0, vn = null;
                    var L = D.sibling;
                    if (L !== null) De = L;
                    else {
                      var Z = D.return;
                      Z !== null ? (De = Z, vs(Z)) : De = null;
                    }
                    break t;
                  }
              }
              Ke = 0, vn = null, oo(a, i, m, 5);
              break;
            case 6:
              Ke = 0, vn = null, oo(a, i, m, 6);
              break;
            case 8:
              Ap(), st = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        YR();
        break;
      } catch (ae) {
        R_(a, ae);
      }
    while (!0);
    return Sr = Ya = null, $.H = s, $.A = p, Ue = l, De !== null ? 0 : (Je = null, Ne = 0, Rc(), st);
  }
  function YR() {
    for (; De !== null && !Xt(); )
      k_(De);
  }
  function k_(a) {
    var i = u_(a.alternate, a, Dr);
    a.memoizedProps = a.pendingProps, i === null ? vs(a) : De = i;
  }
  function B_(a) {
    var i = a, l = i.alternate;
    switch (i.tag) {
      case 15:
      case 0:
        i = n_(
          l,
          i,
          i.pendingProps,
          i.type,
          void 0,
          Ne
        );
        break;
      case 11:
        i = n_(
          l,
          i,
          i.pendingProps,
          i.type.render,
          i.ref,
          Ne
        );
        break;
      case 5:
        Uh(i);
      default:
        s_(l, i), i = De = qx(i, Dr), i = u_(l, i, Dr);
    }
    a.memoizedProps = a.pendingProps, i === null ? vs(a) : De = i;
  }
  function oo(a, i, l, s) {
    Sr = Ya = null, Uh(i), Fi = null, Ml = 0;
    var p = i.return;
    try {
      if (NR(
        a,
        p,
        i,
        l,
        Ne
      )) {
        st = 1, ns(
          a,
          En(l, a.current)
        ), De = null;
        return;
      }
    } catch (m) {
      if (p !== null) throw De = p, m;
      st = 1, ns(
        a,
        En(l, a.current)
      ), De = null;
      return;
    }
    i.flags & 32768 ? (ze || s === 1 ? a = !0 : no || (Ne & 536870912) !== 0 ? a = !1 : (fa = a = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = hn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), L_(i, a)) : vs(i);
  }
  function vs(a) {
    var i = a;
    do {
      if ((i.flags & 32768) !== 0) {
        L_(
          i,
          fa
        );
        return;
      }
      a = i.return;
      var l = zR(
        i.alternate,
        i,
        Dr
      );
      if (l !== null) {
        De = l;
        return;
      }
      if (i = i.sibling, i !== null) {
        De = i;
        return;
      }
      De = i = a;
    } while (i !== null);
    st === 0 && (st = 5);
  }
  function L_(a, i) {
    do {
      var l = qR(a.alternate, a);
      if (l !== null) {
        l.flags &= 32767, De = l;
        return;
      }
      if (l = a.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !i && (a = a.sibling, a !== null)) {
        De = a;
        return;
      }
      De = a = l;
    } while (a !== null);
    st = 6, De = null;
  }
  function U_(a, i, l, s, p, m, O, D, L) {
    a.cancelPendingCommit = null;
    do
      ys();
    while (St !== 0);
    if ((Ue & 6) !== 0) throw Error(r(327));
    if (i !== null) {
      if (i === a.current) throw Error(r(177));
      if (m = i.lanes | i.childLanes, m |= ph, wN(
        a,
        l,
        m,
        O,
        D,
        L
      ), a === Je && (De = Je = null, Ne = 0), ao = i, pa = a, Pr = l, _p = m, Op = p, C_ = s, (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? (a.callbackNode = null, a.callbackPriority = 0, FR(gc, function() {
        return K_(), null;
      })) : (a.callbackNode = null, a.callbackPriority = 0), s = (i.flags & 13878) !== 0, (i.subtreeFlags & 13878) !== 0 || s) {
        s = $.T, $.T = null, p = K.p, K.p = 2, O = Ue, Ue |= 4;
        try {
          kR(a, i, l);
        } finally {
          Ue = O, K.p = p, $.T = s;
        }
      }
      St = 1, I_(), H_(), G_();
    }
  }
  function I_() {
    if (St === 1) {
      St = 0;
      var a = pa, i = ao, l = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || l) {
        l = $.T, $.T = null;
        var s = K.p;
        K.p = 2;
        var p = Ue;
        Ue |= 4;
        try {
          __(i, a);
          var m = kp, O = jx(a.containerInfo), D = m.focusedElem, L = m.selectionRange;
          if (O !== D && D && D.ownerDocument && Ex(
            D.ownerDocument.documentElement,
            D
          )) {
            if (L !== null && ch(D)) {
              var Z = L.start, ae = L.end;
              if (ae === void 0 && (ae = Z), "selectionStart" in D)
                D.selectionStart = Z, D.selectionEnd = Math.min(
                  ae,
                  D.value.length
                );
              else {
                var le = D.ownerDocument || document, Q = le && le.defaultView || window;
                if (Q.getSelection) {
                  var te = Q.getSelection(), ye = D.textContent.length, Se = Math.min(L.start, ye), We = L.end === void 0 ? Se : Math.min(L.end, ye);
                  !te.extend && Se > We && (O = We, We = Se, Se = O);
                  var X = Tx(
                    D,
                    Se
                  ), H = Tx(
                    D,
                    We
                  );
                  if (X && H && (te.rangeCount !== 1 || te.anchorNode !== X.node || te.anchorOffset !== X.offset || te.focusNode !== H.node || te.focusOffset !== H.offset)) {
                    var W = le.createRange();
                    W.setStart(X.node, X.offset), te.removeAllRanges(), Se > We ? (te.addRange(W), te.extend(H.node, H.offset)) : (W.setEnd(H.node, H.offset), te.addRange(W));
                  }
                }
              }
            }
            for (le = [], te = D; te = te.parentNode; )
              te.nodeType === 1 && le.push({
                element: te,
                left: te.scrollLeft,
                top: te.scrollTop
              });
            for (typeof D.focus == "function" && D.focus(), D = 0; D < le.length; D++) {
              var oe = le[D];
              oe.element.scrollLeft = oe.left, oe.element.scrollTop = oe.top;
            }
          }
          js = !!qp, kp = qp = null;
        } finally {
          Ue = p, K.p = s, $.T = l;
        }
      }
      a.current = i, St = 2;
    }
  }
  function H_() {
    if (St === 2) {
      St = 0;
      var a = pa, i = ao, l = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || l) {
        l = $.T, $.T = null;
        var s = K.p;
        K.p = 2;
        var p = Ue;
        Ue |= 4;
        try {
          m_(a, i.alternate, i);
        } finally {
          Ue = p, K.p = s, $.T = l;
        }
      }
      St = 3;
    }
  }
  function G_() {
    if (St === 4 || St === 3) {
      St = 0, Zr();
      var a = pa, i = ao, l = Pr, s = C_;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? St = 5 : (St = 0, ao = pa = null, Y_(a, a.pendingLanes));
      var p = a.pendingLanes;
      if (p === 0 && (ha = null), Gd(l), i = i.stateNode, cn && typeof cn.onCommitFiberRoot == "function")
        try {
          cn.onCommitFiberRoot(
            fl,
            i,
            void 0,
            (i.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        i = $.T, p = K.p, K.p = 2, $.T = null;
        try {
          for (var m = a.onRecoverableError, O = 0; O < s.length; O++) {
            var D = s[O];
            m(D.value, {
              componentStack: D.stack
            });
          }
        } finally {
          $.T = i, K.p = p;
        }
      }
      (Pr & 3) !== 0 && ys(), nr(a), p = a.pendingLanes, (l & 261930) !== 0 && (p & 42) !== 0 ? a === wp ? Kl++ : (Kl = 0, wp = a) : Kl = 0, Xl(0);
    }
  }
  function Y_(a, i) {
    (a.pooledCacheLanes &= i) === 0 && (i = a.pooledCache, i != null && (a.pooledCache = null, El(i)));
  }
  function ys() {
    return I_(), H_(), G_(), K_();
  }
  function K_() {
    if (St !== 5) return !1;
    var a = pa, i = _p;
    _p = 0;
    var l = Gd(Pr), s = $.T, p = K.p;
    try {
      K.p = 32 > l ? 32 : l, $.T = null, l = Op, Op = null;
      var m = pa, O = Pr;
      if (St = 0, ao = pa = null, Pr = 0, (Ue & 6) !== 0) throw Error(r(331));
      var D = Ue;
      if (Ue |= 4, E_(m.current), w_(
        m,
        m.current,
        O,
        l
      ), Ue = D, Xl(0, !1), cn && typeof cn.onPostCommitFiberRoot == "function")
        try {
          cn.onPostCommitFiberRoot(fl, m);
        } catch {
        }
      return !0;
    } finally {
      K.p = p, $.T = s, Y_(a, i);
    }
  }
  function X_(a, i, l) {
    i = En(l, i), i = np(a.stateNode, i, 2), a = la(a, i, 2), a !== null && (hl(a, 2), nr(a));
  }
  function Xe(a, i, l) {
    if (a.tag === 3)
      X_(a, a, l);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          X_(
            i,
            a,
            l
          );
          break;
        } else if (i.tag === 1) {
          var s = i.stateNode;
          if (typeof i.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (ha === null || !ha.has(s))) {
            a = En(l, a), l = VS(2), s = la(i, l, 2), s !== null && (FS(
              l,
              s,
              i,
              a
            ), hl(s, 2), nr(s));
            break;
          }
        }
        i = i.return;
      }
  }
  function Ep(a, i, l) {
    var s = a.pingCache;
    if (s === null) {
      s = a.pingCache = new UR();
      var p = /* @__PURE__ */ new Set();
      s.set(i, p);
    } else
      p = s.get(i), p === void 0 && (p = /* @__PURE__ */ new Set(), s.set(i, p));
    p.has(l) || (bp = !0, p.add(l), a = KR.bind(null, a, i, l), i.then(a, a));
  }
  function KR(a, i, l) {
    var s = a.pingCache;
    s !== null && s.delete(i), a.pingedLanes |= a.suspendedLanes & l, a.warmLanes &= ~l, Je === a && (Ne & l) === l && (st === 4 || st === 3 && (Ne & 62914560) === Ne && 300 > Lt() - ss ? (Ue & 2) === 0 && io(a, 0) : xp |= l, ro === Ne && (ro = 0)), nr(a);
  }
  function V_(a, i) {
    i === 0 && (i = I1()), a = Ia(a, i), a !== null && (hl(a, i), nr(a));
  }
  function XR(a) {
    var i = a.memoizedState, l = 0;
    i !== null && (l = i.retryLane), V_(a, l);
  }
  function VR(a, i) {
    var l = 0;
    switch (a.tag) {
      case 31:
      case 13:
        var s = a.stateNode, p = a.memoizedState;
        p !== null && (l = p.retryLane);
        break;
      case 19:
        s = a.stateNode;
        break;
      case 22:
        s = a.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    s !== null && s.delete(i), V_(a, l);
  }
  function FR(a, i) {
    return On(a, i);
  }
  var ms = null, lo = null, jp = !1, gs = !1, Mp = !1, ya = 0;
  function nr(a) {
    a !== lo && a.next === null && (lo === null ? ms = lo = a : lo = lo.next = a), gs = !0, jp || (jp = !0, ZR());
  }
  function Xl(a, i) {
    if (!Mp && gs) {
      Mp = !0;
      do
        for (var l = !1, s = ms; s !== null; ) {
          if (a !== 0) {
            var p = s.pendingLanes;
            if (p === 0) var m = 0;
            else {
              var O = s.suspendedLanes, D = s.pingedLanes;
              m = (1 << 31 - sn(42 | a) + 1) - 1, m &= p & ~(O & ~D), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (l = !0, Q_(s, m));
          } else
            m = Ne, m = _c(
              s,
              s === Je ? m : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (m & 3) === 0 || dl(s, m) || (l = !0, Q_(s, m));
          s = s.next;
        }
      while (l);
      Mp = !1;
    }
  }
  function WR() {
    F_();
  }
  function F_() {
    gs = jp = !1;
    var a = 0;
    ya !== 0 && l3() && (a = ya);
    for (var i = Lt(), l = null, s = ms; s !== null; ) {
      var p = s.next, m = W_(s, i);
      m === 0 ? (s.next = null, l === null ? ms = p : l.next = p, p === null && (lo = l)) : (l = s, (a !== 0 || (m & 3) !== 0) && (gs = !0)), s = p;
    }
    St !== 0 && St !== 5 || Xl(a), ya !== 0 && (ya = 0);
  }
  function W_(a, i) {
    for (var l = a.suspendedLanes, s = a.pingedLanes, p = a.expirationTimes, m = a.pendingLanes & -62914561; 0 < m; ) {
      var O = 31 - sn(m), D = 1 << O, L = p[O];
      L === -1 ? ((D & l) === 0 || (D & s) !== 0) && (p[O] = ON(D, i)) : L <= i && (a.expiredLanes |= D), m &= ~D;
    }
    if (i = Je, l = Ne, l = _c(
      a,
      a === i ? l : 0,
      a.cancelPendingCommit !== null || a.timeoutHandle !== -1
    ), s = a.callbackNode, l === 0 || a === i && (Ke === 2 || Ke === 9) || a.cancelPendingCommit !== null)
      return s !== null && s !== null && Kt(s), a.callbackNode = null, a.callbackPriority = 0;
    if ((l & 3) === 0 || dl(a, l)) {
      if (i = l & -l, i === a.callbackPriority) return i;
      switch (s !== null && Kt(s), Gd(l)) {
        case 2:
        case 8:
          l = L1;
          break;
        case 32:
          l = gc;
          break;
        case 268435456:
          l = U1;
          break;
        default:
          l = gc;
      }
      return s = Z_.bind(null, a), l = On(l, s), a.callbackPriority = i, a.callbackNode = l, i;
    }
    return s !== null && s !== null && Kt(s), a.callbackPriority = 2, a.callbackNode = null, 2;
  }
  function Z_(a, i) {
    if (St !== 0 && St !== 5)
      return a.callbackNode = null, a.callbackPriority = 0, null;
    var l = a.callbackNode;
    if (ys() && a.callbackNode !== l)
      return null;
    var s = Ne;
    return s = _c(
      a,
      a === Je ? s : 0,
      a.cancelPendingCommit !== null || a.timeoutHandle !== -1
    ), s === 0 ? null : (P_(a, s, i), W_(a, Lt()), a.callbackNode != null && a.callbackNode === l ? Z_.bind(null, a) : null);
  }
  function Q_(a, i) {
    if (ys()) return null;
    P_(a, i, !0);
  }
  function ZR() {
    c3(function() {
      (Ue & 6) !== 0 ? On(
        B1,
        WR
      ) : F_();
    });
  }
  function Cp() {
    if (ya === 0) {
      var a = Ki;
      a === 0 && (a = bc, bc <<= 1, (bc & 261888) === 0 && (bc = 256)), ya = a;
    }
    return ya;
  }
  function J_(a) {
    return a == null || typeof a == "symbol" || typeof a == "boolean" ? null : typeof a == "function" ? a : Tc("" + a);
  }
  function eO(a, i) {
    var l = i.ownerDocument.createElement("input");
    return l.name = i.name, l.value = i.value, a.id && l.setAttribute("form", a.id), i.parentNode.insertBefore(l, i), a = new FormData(a), l.parentNode.removeChild(l), a;
  }
  function QR(a, i, l, s, p) {
    if (i === "submit" && l && l.stateNode === p) {
      var m = J_(
        (p[Zt] || null).action
      ), O = s.submitter;
      O && (i = (i = O[Zt] || null) ? J_(i.formAction) : O.getAttribute("formAction"), i !== null && (m = i, O = null));
      var D = new Cc(
        "action",
        "action",
        null,
        s,
        p
      );
      a.push({
        event: D,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (ya !== 0) {
                  var L = O ? eO(p, O) : new FormData(p);
                  Wh(
                    l,
                    {
                      pending: !0,
                      data: L,
                      method: p.method,
                      action: m
                    },
                    null,
                    L
                  );
                }
              } else
                typeof m == "function" && (D.preventDefault(), L = O ? eO(p, O) : new FormData(p), Wh(
                  l,
                  {
                    pending: !0,
                    data: L,
                    method: p.method,
                    action: m
                  },
                  m,
                  L
                ));
            },
            currentTarget: p
          }
        ]
      });
    }
  }
  for (var Dp = 0; Dp < hh.length; Dp++) {
    var Pp = hh[Dp], JR = Pp.toLowerCase(), e3 = Pp[0].toUpperCase() + Pp.slice(1);
    In(
      JR,
      "on" + e3
    );
  }
  In(Dx, "onAnimationEnd"), In(Px, "onAnimationIteration"), In(Nx, "onAnimationStart"), In("dblclick", "onDoubleClick"), In("focusin", "onFocus"), In("focusout", "onBlur"), In(yR, "onTransitionRun"), In(mR, "onTransitionStart"), In(gR, "onTransitionCancel"), In(Rx, "onTransitionEnd"), Pi("onMouseEnter", ["mouseout", "mouseover"]), Pi("onMouseLeave", ["mouseout", "mouseover"]), Pi("onPointerEnter", ["pointerout", "pointerover"]), Pi("onPointerLeave", ["pointerout", "pointerover"]), ka(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ka(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ka("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ka(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ka(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ka(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Vl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), t3 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vl)
  );
  function tO(a, i) {
    i = (i & 4) !== 0;
    for (var l = 0; l < a.length; l++) {
      var s = a[l], p = s.event;
      s = s.listeners;
      e: {
        var m = void 0;
        if (i)
          for (var O = s.length - 1; 0 <= O; O--) {
            var D = s[O], L = D.instance, Z = D.currentTarget;
            if (D = D.listener, L !== m && p.isPropagationStopped())
              break e;
            m = D, p.currentTarget = Z;
            try {
              m(p);
            } catch (ae) {
              Nc(ae);
            }
            p.currentTarget = null, m = L;
          }
        else
          for (O = 0; O < s.length; O++) {
            if (D = s[O], L = D.instance, Z = D.currentTarget, D = D.listener, L !== m && p.isPropagationStopped())
              break e;
            m = D, p.currentTarget = Z;
            try {
              m(p);
            } catch (ae) {
              Nc(ae);
            }
            p.currentTarget = null, m = L;
          }
      }
    }
  }
  function Pe(a, i) {
    var l = i[Yd];
    l === void 0 && (l = i[Yd] = /* @__PURE__ */ new Set());
    var s = a + "__bubble";
    l.has(s) || (nO(i, a, 2, !1), l.add(s));
  }
  function Np(a, i, l) {
    var s = 0;
    i && (s |= 4), nO(
      l,
      a,
      s,
      i
    );
  }
  var bs = "_reactListening" + Math.random().toString(36).slice(2);
  function Rp(a) {
    if (!a[bs]) {
      a[bs] = !0, F1.forEach(function(l) {
        l !== "selectionchange" && (t3.has(l) || Np(l, !1, a), Np(l, !0, a));
      });
      var i = a.nodeType === 9 ? a : a.ownerDocument;
      i === null || i[bs] || (i[bs] = !0, Np("selectionchange", !1, i));
    }
  }
  function nO(a, i, l, s) {
    switch (DO(i)) {
      case 2:
        var p = M3;
        break;
      case 8:
        p = C3;
        break;
      default:
        p = Fp;
    }
    l = p.bind(
      null,
      i,
      l,
      a
    ), p = void 0, !eh || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (p = !0), s ? p !== void 0 ? a.addEventListener(i, l, {
      capture: !0,
      passive: p
    }) : a.addEventListener(i, l, !0) : p !== void 0 ? a.addEventListener(i, l, {
      passive: p
    }) : a.addEventListener(i, l, !1);
  }
  function $p(a, i, l, s, p) {
    var m = s;
    if ((i & 1) === 0 && (i & 2) === 0 && s !== null)
      e: for (; ; ) {
        if (s === null) return;
        var O = s.tag;
        if (O === 3 || O === 4) {
          var D = s.stateNode.containerInfo;
          if (D === p) break;
          if (O === 4)
            for (O = s.return; O !== null; ) {
              var L = O.tag;
              if ((L === 3 || L === 4) && O.stateNode.containerInfo === p)
                return;
              O = O.return;
            }
          for (; D !== null; ) {
            if (O = Mi(D), O === null) return;
            if (L = O.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              s = m = O;
              continue e;
            }
            D = D.parentNode;
          }
        }
        s = s.return;
      }
    lx(function() {
      var Z = m, ae = Qd(l), le = [];
      e: {
        var Q = $x.get(a);
        if (Q !== void 0) {
          var te = Cc, ye = a;
          switch (a) {
            case "keypress":
              if (jc(l) === 0) break e;
            case "keydown":
            case "keyup":
              te = VN;
              break;
            case "focusin":
              ye = "focus", te = ah;
              break;
            case "focusout":
              ye = "blur", te = ah;
              break;
            case "beforeblur":
            case "afterblur":
              te = ah;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              te = sx;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              te = zN;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              te = ZN;
              break;
            case Dx:
            case Px:
            case Nx:
              te = BN;
              break;
            case Rx:
              te = JN;
              break;
            case "scroll":
            case "scrollend":
              te = RN;
              break;
            case "wheel":
              te = tR;
              break;
            case "copy":
            case "cut":
            case "paste":
              te = UN;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              te = dx;
              break;
            case "toggle":
            case "beforetoggle":
              te = rR;
          }
          var Se = (i & 4) !== 0, We = !Se && (a === "scroll" || a === "scrollend"), X = Se ? Q !== null ? Q + "Capture" : null : Q;
          Se = [];
          for (var H = Z, W; H !== null; ) {
            var oe = H;
            if (W = oe.stateNode, oe = oe.tag, oe !== 5 && oe !== 26 && oe !== 27 || W === null || X === null || (oe = yl(H, X), oe != null && Se.push(
              Fl(H, oe, W)
            )), We) break;
            H = H.return;
          }
          0 < Se.length && (Q = new te(
            Q,
            ye,
            null,
            l,
            ae
          ), le.push({ event: Q, listeners: Se }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (Q = a === "mouseover" || a === "pointerover", te = a === "mouseout" || a === "pointerout", Q && l !== Zd && (ye = l.relatedTarget || l.fromElement) && (Mi(ye) || ye[ji]))
            break e;
          if ((te || Q) && (Q = ae.window === ae ? ae : (Q = ae.ownerDocument) ? Q.defaultView || Q.parentWindow : window, te ? (ye = l.relatedTarget || l.toElement, te = Z, ye = ye ? Mi(ye) : null, ye !== null && (We = u(ye), Se = ye.tag, ye !== We || Se !== 5 && Se !== 27 && Se !== 6) && (ye = null)) : (te = null, ye = Z), te !== ye)) {
            if (Se = sx, oe = "onMouseLeave", X = "onMouseEnter", H = "mouse", (a === "pointerout" || a === "pointerover") && (Se = dx, oe = "onPointerLeave", X = "onPointerEnter", H = "pointer"), We = te == null ? Q : vl(te), W = ye == null ? Q : vl(ye), Q = new Se(
              oe,
              H + "leave",
              te,
              l,
              ae
            ), Q.target = We, Q.relatedTarget = W, oe = null, Mi(ae) === Z && (Se = new Se(
              X,
              H + "enter",
              ye,
              l,
              ae
            ), Se.target = W, Se.relatedTarget = We, oe = Se), We = oe, te && ye)
              t: {
                for (Se = n3, X = te, H = ye, W = 0, oe = X; oe; oe = Se(oe))
                  W++;
                oe = 0;
                for (var be = H; be; be = Se(be))
                  oe++;
                for (; 0 < W - oe; )
                  X = Se(X), W--;
                for (; 0 < oe - W; )
                  H = Se(H), oe--;
                for (; W--; ) {
                  if (X === H || H !== null && X === H.alternate) {
                    Se = X;
                    break t;
                  }
                  X = Se(X), H = Se(H);
                }
                Se = null;
              }
            else Se = null;
            te !== null && rO(
              le,
              Q,
              te,
              Se,
              !1
            ), ye !== null && We !== null && rO(
              le,
              We,
              ye,
              Se,
              !0
            );
          }
        }
        e: {
          if (Q = Z ? vl(Z) : window, te = Q.nodeName && Q.nodeName.toLowerCase(), te === "select" || te === "input" && Q.type === "file")
            var ke = xx;
          else if (gx(Q))
            if (Sx)
              ke = hR;
            else {
              ke = fR;
              var me = sR;
            }
          else
            te = Q.nodeName, !te || te.toLowerCase() !== "input" || Q.type !== "checkbox" && Q.type !== "radio" ? Z && Wd(Z.elementType) && (ke = xx) : ke = dR;
          if (ke && (ke = ke(a, Z))) {
            bx(
              le,
              ke,
              l,
              ae
            );
            break e;
          }
          me && me(a, Q, Z), a === "focusout" && Z && Q.type === "number" && Z.memoizedProps.value != null && Fd(Q, "number", Q.value);
        }
        switch (me = Z ? vl(Z) : window, a) {
          case "focusin":
            (gx(me) || me.contentEditable === "true") && (ki = me, sh = Z, wl = null);
            break;
          case "focusout":
            wl = sh = ki = null;
            break;
          case "mousedown":
            fh = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            fh = !1, Mx(le, l, ae);
            break;
          case "selectionchange":
            if (vR) break;
          case "keydown":
          case "keyup":
            Mx(le, l, ae);
        }
        var Me;
        if (oh)
          e: {
            switch (a) {
              case "compositionstart":
                var Re = "onCompositionStart";
                break e;
              case "compositionend":
                Re = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Re = "onCompositionUpdate";
                break e;
            }
            Re = void 0;
          }
        else
          qi ? yx(a, l) && (Re = "onCompositionEnd") : a === "keydown" && l.keyCode === 229 && (Re = "onCompositionStart");
        Re && (hx && l.locale !== "ko" && (qi || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && qi && (Me = ux()) : (ea = ae, th = "value" in ea ? ea.value : ea.textContent, qi = !0)), me = xs(Z, Re), 0 < me.length && (Re = new fx(
          Re,
          a,
          null,
          l,
          ae
        ), le.push({ event: Re, listeners: me }), Me ? Re.data = Me : (Me = mx(l), Me !== null && (Re.data = Me)))), (Me = iR ? oR(a, l) : lR(a, l)) && (Re = xs(Z, "onBeforeInput"), 0 < Re.length && (me = new fx(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ae
        ), le.push({
          event: me,
          listeners: Re
        }), me.data = Me)), QR(
          le,
          a,
          Z,
          l,
          ae
        );
      }
      tO(le, i);
    });
  }
  function Fl(a, i, l) {
    return {
      instance: a,
      listener: i,
      currentTarget: l
    };
  }
  function xs(a, i) {
    for (var l = i + "Capture", s = []; a !== null; ) {
      var p = a, m = p.stateNode;
      if (p = p.tag, p !== 5 && p !== 26 && p !== 27 || m === null || (p = yl(a, l), p != null && s.unshift(
        Fl(a, p, m)
      ), p = yl(a, i), p != null && s.push(
        Fl(a, p, m)
      )), a.tag === 3) return s;
      a = a.return;
    }
    return [];
  }
  function n3(a) {
    if (a === null) return null;
    do
      a = a.return;
    while (a && a.tag !== 5 && a.tag !== 27);
    return a || null;
  }
  function rO(a, i, l, s, p) {
    for (var m = i._reactName, O = []; l !== null && l !== s; ) {
      var D = l, L = D.alternate, Z = D.stateNode;
      if (D = D.tag, L !== null && L === s) break;
      D !== 5 && D !== 26 && D !== 27 || Z === null || (L = Z, p ? (Z = yl(l, m), Z != null && O.unshift(
        Fl(l, Z, L)
      )) : p || (Z = yl(l, m), Z != null && O.push(
        Fl(l, Z, L)
      ))), l = l.return;
    }
    O.length !== 0 && a.push({ event: i, listeners: O });
  }
  var r3 = /\r\n?/g, a3 = /\u0000|\uFFFD/g;
  function aO(a) {
    return (typeof a == "string" ? a : "" + a).replace(r3, `
`).replace(a3, "");
  }
  function iO(a, i) {
    return i = aO(i), aO(a) === i;
  }
  function Fe(a, i, l, s, p, m) {
    switch (l) {
      case "children":
        typeof s == "string" ? i === "body" || i === "textarea" && s === "" || Ri(a, s) : (typeof s == "number" || typeof s == "bigint") && i !== "body" && Ri(a, "" + s);
        break;
      case "className":
        wc(a, "class", s);
        break;
      case "tabIndex":
        wc(a, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        wc(a, l, s);
        break;
      case "style":
        ix(a, s, m);
        break;
      case "data":
        if (i !== "object") {
          wc(a, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (i !== "a" || l !== "href")) {
          a.removeAttribute(l);
          break;
        }
        if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
          a.removeAttribute(l);
          break;
        }
        s = Tc("" + s), a.setAttribute(l, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          a.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof m == "function" && (l === "formAction" ? (i !== "input" && Fe(a, i, "name", p.name, p, null), Fe(
            a,
            i,
            "formEncType",
            p.formEncType,
            p,
            null
          ), Fe(
            a,
            i,
            "formMethod",
            p.formMethod,
            p,
            null
          ), Fe(
            a,
            i,
            "formTarget",
            p.formTarget,
            p,
            null
          )) : (Fe(a, i, "encType", p.encType, p, null), Fe(a, i, "method", p.method, p, null), Fe(a, i, "target", p.target, p, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          a.removeAttribute(l);
          break;
        }
        s = Tc("" + s), a.setAttribute(l, s);
        break;
      case "onClick":
        s != null && (a.onclick = mr);
        break;
      case "onScroll":
        s != null && Pe("scroll", a);
        break;
      case "onScrollEnd":
        s != null && Pe("scrollend", a);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(r(61));
          if (l = s.__html, l != null) {
            if (p.children != null) throw Error(r(60));
            a.innerHTML = l;
          }
        }
        break;
      case "multiple":
        a.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        a.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (s == null || typeof s == "function" || typeof s == "boolean" || typeof s == "symbol") {
          a.removeAttribute("xlink:href");
          break;
        }
        l = Tc("" + s), a.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol" ? a.setAttribute(l, "" + s) : a.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol" ? a.setAttribute(l, "") : a.removeAttribute(l);
        break;
      case "capture":
      case "download":
        s === !0 ? a.setAttribute(l, "") : s !== !1 && s != null && typeof s != "function" && typeof s != "symbol" ? a.setAttribute(l, s) : a.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s ? a.setAttribute(l, s) : a.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s) ? a.removeAttribute(l) : a.setAttribute(l, s);
        break;
      case "popover":
        Pe("beforetoggle", a), Pe("toggle", a), Oc(a, "popover", s);
        break;
      case "xlinkActuate":
        yr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        yr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        yr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        yr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        yr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        yr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        yr(
          a,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        yr(
          a,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        yr(
          a,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          s
        );
        break;
      case "is":
        Oc(a, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = PN.get(l) || l, Oc(a, l, s));
    }
  }
  function zp(a, i, l, s, p, m) {
    switch (l) {
      case "style":
        ix(a, s, m);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(r(61));
          if (l = s.__html, l != null) {
            if (p.children != null) throw Error(r(60));
            a.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof s == "string" ? Ri(a, s) : (typeof s == "number" || typeof s == "bigint") && Ri(a, "" + s);
        break;
      case "onScroll":
        s != null && Pe("scroll", a);
        break;
      case "onScrollEnd":
        s != null && Pe("scrollend", a);
        break;
      case "onClick":
        s != null && (a.onclick = mr);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!W1.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (p = l.endsWith("Capture"), i = l.slice(2, p ? l.length - 7 : void 0), m = a[Zt] || null, m = m != null ? m[l] : null, typeof m == "function" && a.removeEventListener(i, m, p), typeof s == "function")) {
              typeof m != "function" && m !== null && (l in a ? a[l] = null : a.hasAttribute(l) && a.removeAttribute(l)), a.addEventListener(i, s, p);
              break e;
            }
            l in a ? a[l] = s : s === !0 ? a.setAttribute(l, "") : Oc(a, l, s);
          }
    }
  }
  function zt(a, i, l) {
    switch (i) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Pe("error", a), Pe("load", a);
        var s = !1, p = !1, m;
        for (m in l)
          if (l.hasOwnProperty(m)) {
            var O = l[m];
            if (O != null)
              switch (m) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  p = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, i));
                default:
                  Fe(a, i, m, O, l, null);
              }
          }
        p && Fe(a, i, "srcSet", l.srcSet, l, null), s && Fe(a, i, "src", l.src, l, null);
        return;
      case "input":
        Pe("invalid", a);
        var D = m = O = p = null, L = null, Z = null;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var ae = l[s];
            if (ae != null)
              switch (s) {
                case "name":
                  p = ae;
                  break;
                case "type":
                  O = ae;
                  break;
                case "checked":
                  L = ae;
                  break;
                case "defaultChecked":
                  Z = ae;
                  break;
                case "value":
                  m = ae;
                  break;
                case "defaultValue":
                  D = ae;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ae != null)
                    throw Error(r(137, i));
                  break;
                default:
                  Fe(a, i, s, ae, l, null);
              }
          }
        tx(
          a,
          m,
          D,
          L,
          Z,
          O,
          p,
          !1
        );
        return;
      case "select":
        Pe("invalid", a), s = O = m = null;
        for (p in l)
          if (l.hasOwnProperty(p) && (D = l[p], D != null))
            switch (p) {
              case "value":
                m = D;
                break;
              case "defaultValue":
                O = D;
                break;
              case "multiple":
                s = D;
              default:
                Fe(a, i, p, D, l, null);
            }
        i = m, l = O, a.multiple = !!s, i != null ? Ni(a, !!s, i, !1) : l != null && Ni(a, !!s, l, !0);
        return;
      case "textarea":
        Pe("invalid", a), m = p = s = null;
        for (O in l)
          if (l.hasOwnProperty(O) && (D = l[O], D != null))
            switch (O) {
              case "value":
                s = D;
                break;
              case "defaultValue":
                p = D;
                break;
              case "children":
                m = D;
                break;
              case "dangerouslySetInnerHTML":
                if (D != null) throw Error(r(91));
                break;
              default:
                Fe(a, i, O, D, l, null);
            }
        rx(a, s, p, m);
        return;
      case "option":
        for (L in l)
          if (l.hasOwnProperty(L) && (s = l[L], s != null))
            switch (L) {
              case "selected":
                a.selected = s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Fe(a, i, L, s, l, null);
            }
        return;
      case "dialog":
        Pe("beforetoggle", a), Pe("toggle", a), Pe("cancel", a), Pe("close", a);
        break;
      case "iframe":
      case "object":
        Pe("load", a);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Vl.length; s++)
          Pe(Vl[s], a);
        break;
      case "image":
        Pe("error", a), Pe("load", a);
        break;
      case "details":
        Pe("toggle", a);
        break;
      case "embed":
      case "source":
      case "link":
        Pe("error", a), Pe("load", a);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Z in l)
          if (l.hasOwnProperty(Z) && (s = l[Z], s != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, i));
              default:
                Fe(a, i, Z, s, l, null);
            }
        return;
      default:
        if (Wd(i)) {
          for (ae in l)
            l.hasOwnProperty(ae) && (s = l[ae], s !== void 0 && zp(
              a,
              i,
              ae,
              s,
              l,
              void 0
            ));
          return;
        }
    }
    for (D in l)
      l.hasOwnProperty(D) && (s = l[D], s != null && Fe(a, i, D, s, l, null));
  }
  function i3(a, i, l, s) {
    switch (i) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var p = null, m = null, O = null, D = null, L = null, Z = null, ae = null;
        for (te in l) {
          var le = l[te];
          if (l.hasOwnProperty(te) && le != null)
            switch (te) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = le;
              default:
                s.hasOwnProperty(te) || Fe(a, i, te, null, s, le);
            }
        }
        for (var Q in s) {
          var te = s[Q];
          if (le = l[Q], s.hasOwnProperty(Q) && (te != null || le != null))
            switch (Q) {
              case "type":
                m = te;
                break;
              case "name":
                p = te;
                break;
              case "checked":
                Z = te;
                break;
              case "defaultChecked":
                ae = te;
                break;
              case "value":
                O = te;
                break;
              case "defaultValue":
                D = te;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (te != null)
                  throw Error(r(137, i));
                break;
              default:
                te !== le && Fe(
                  a,
                  i,
                  Q,
                  te,
                  s,
                  le
                );
            }
        }
        Vd(
          a,
          O,
          D,
          L,
          Z,
          ae,
          m,
          p
        );
        return;
      case "select":
        te = O = D = Q = null;
        for (m in l)
          if (L = l[m], l.hasOwnProperty(m) && L != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                te = L;
              default:
                s.hasOwnProperty(m) || Fe(
                  a,
                  i,
                  m,
                  null,
                  s,
                  L
                );
            }
        for (p in s)
          if (m = s[p], L = l[p], s.hasOwnProperty(p) && (m != null || L != null))
            switch (p) {
              case "value":
                Q = m;
                break;
              case "defaultValue":
                D = m;
                break;
              case "multiple":
                O = m;
              default:
                m !== L && Fe(
                  a,
                  i,
                  p,
                  m,
                  s,
                  L
                );
            }
        i = D, l = O, s = te, Q != null ? Ni(a, !!l, Q, !1) : !!s != !!l && (i != null ? Ni(a, !!l, i, !0) : Ni(a, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        te = Q = null;
        for (D in l)
          if (p = l[D], l.hasOwnProperty(D) && p != null && !s.hasOwnProperty(D))
            switch (D) {
              case "value":
                break;
              case "children":
                break;
              default:
                Fe(a, i, D, null, s, p);
            }
        for (O in s)
          if (p = s[O], m = l[O], s.hasOwnProperty(O) && (p != null || m != null))
            switch (O) {
              case "value":
                Q = p;
                break;
              case "defaultValue":
                te = p;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(r(91));
                break;
              default:
                p !== m && Fe(a, i, O, p, s, m);
            }
        nx(a, Q, te);
        return;
      case "option":
        for (var ye in l)
          if (Q = l[ye], l.hasOwnProperty(ye) && Q != null && !s.hasOwnProperty(ye))
            switch (ye) {
              case "selected":
                a.selected = !1;
                break;
              default:
                Fe(
                  a,
                  i,
                  ye,
                  null,
                  s,
                  Q
                );
            }
        for (L in s)
          if (Q = s[L], te = l[L], s.hasOwnProperty(L) && Q !== te && (Q != null || te != null))
            switch (L) {
              case "selected":
                a.selected = Q && typeof Q != "function" && typeof Q != "symbol";
                break;
              default:
                Fe(
                  a,
                  i,
                  L,
                  Q,
                  s,
                  te
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Se in l)
          Q = l[Se], l.hasOwnProperty(Se) && Q != null && !s.hasOwnProperty(Se) && Fe(a, i, Se, null, s, Q);
        for (Z in s)
          if (Q = s[Z], te = l[Z], s.hasOwnProperty(Z) && Q !== te && (Q != null || te != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null)
                  throw Error(r(137, i));
                break;
              default:
                Fe(
                  a,
                  i,
                  Z,
                  Q,
                  s,
                  te
                );
            }
        return;
      default:
        if (Wd(i)) {
          for (var We in l)
            Q = l[We], l.hasOwnProperty(We) && Q !== void 0 && !s.hasOwnProperty(We) && zp(
              a,
              i,
              We,
              void 0,
              s,
              Q
            );
          for (ae in s)
            Q = s[ae], te = l[ae], !s.hasOwnProperty(ae) || Q === te || Q === void 0 && te === void 0 || zp(
              a,
              i,
              ae,
              Q,
              s,
              te
            );
          return;
        }
    }
    for (var X in l)
      Q = l[X], l.hasOwnProperty(X) && Q != null && !s.hasOwnProperty(X) && Fe(a, i, X, null, s, Q);
    for (le in s)
      Q = s[le], te = l[le], !s.hasOwnProperty(le) || Q === te || Q == null && te == null || Fe(a, i, le, Q, s, te);
  }
  function oO(a) {
    switch (a) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function o3() {
    if (typeof performance.getEntriesByType == "function") {
      for (var a = 0, i = 0, l = performance.getEntriesByType("resource"), s = 0; s < l.length; s++) {
        var p = l[s], m = p.transferSize, O = p.initiatorType, D = p.duration;
        if (m && D && oO(O)) {
          for (O = 0, D = p.responseEnd, s += 1; s < l.length; s++) {
            var L = l[s], Z = L.startTime;
            if (Z > D) break;
            var ae = L.transferSize, le = L.initiatorType;
            ae && oO(le) && (L = L.responseEnd, O += ae * (L < D ? 1 : (D - Z) / (L - Z)));
          }
          if (--s, i += 8 * (m + O) / (p.duration / 1e3), a++, 10 < a) break;
        }
      }
      if (0 < a) return i / a / 1e6;
    }
    return navigator.connection && (a = navigator.connection.downlink, typeof a == "number") ? a : 5;
  }
  var qp = null, kp = null;
  function Ss(a) {
    return a.nodeType === 9 ? a : a.ownerDocument;
  }
  function lO(a) {
    switch (a) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function uO(a, i) {
    if (a === 0)
      switch (i) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return a === 1 && i === "foreignObject" ? 0 : a;
  }
  function Bp(a, i) {
    return a === "textarea" || a === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.children == "bigint" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Lp = null;
  function l3() {
    var a = window.event;
    return a && a.type === "popstate" ? a === Lp ? !1 : (Lp = a, !0) : (Lp = null, !1);
  }
  var cO = typeof setTimeout == "function" ? setTimeout : void 0, u3 = typeof clearTimeout == "function" ? clearTimeout : void 0, sO = typeof Promise == "function" ? Promise : void 0, c3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof sO < "u" ? function(a) {
    return sO.resolve(null).then(a).catch(s3);
  } : cO;
  function s3(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function ma(a) {
    return a === "head";
  }
  function fO(a, i) {
    var l = i, s = 0;
    do {
      var p = l.nextSibling;
      if (a.removeChild(l), p && p.nodeType === 8)
        if (l = p.data, l === "/$" || l === "/&") {
          if (s === 0) {
            a.removeChild(p), fo(i);
            return;
          }
          s--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          s++;
        else if (l === "html")
          Wl(a.ownerDocument.documentElement);
        else if (l === "head") {
          l = a.ownerDocument.head, Wl(l);
          for (var m = l.firstChild; m; ) {
            var O = m.nextSibling, D = m.nodeName;
            m[pl] || D === "SCRIPT" || D === "STYLE" || D === "LINK" && m.rel.toLowerCase() === "stylesheet" || l.removeChild(m), m = O;
          }
        } else
          l === "body" && Wl(a.ownerDocument.body);
      l = p;
    } while (l);
    fo(i);
  }
  function dO(a, i) {
    var l = a;
    a = 0;
    do {
      var s = l.nextSibling;
      if (l.nodeType === 1 ? i ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (i ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), s && s.nodeType === 8)
        if (l = s.data, l === "/$") {
          if (a === 0) break;
          a--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || a++;
      l = s;
    } while (l);
  }
  function Up(a) {
    var i = a.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var l = i;
      switch (i = i.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Up(l), Kd(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      a.removeChild(l);
    }
  }
  function f3(a, i, l, s) {
    for (; a.nodeType === 1; ) {
      var p = l;
      if (a.nodeName.toLowerCase() !== i.toLowerCase()) {
        if (!s && (a.nodeName !== "INPUT" || a.type !== "hidden"))
          break;
      } else if (s) {
        if (!a[pl])
          switch (i) {
            case "meta":
              if (!a.hasAttribute("itemprop")) break;
              return a;
            case "link":
              if (m = a.getAttribute("rel"), m === "stylesheet" && a.hasAttribute("data-precedence"))
                break;
              if (m !== p.rel || a.getAttribute("href") !== (p.href == null || p.href === "" ? null : p.href) || a.getAttribute("crossorigin") !== (p.crossOrigin == null ? null : p.crossOrigin) || a.getAttribute("title") !== (p.title == null ? null : p.title))
                break;
              return a;
            case "style":
              if (a.hasAttribute("data-precedence")) break;
              return a;
            case "script":
              if (m = a.getAttribute("src"), (m !== (p.src == null ? null : p.src) || a.getAttribute("type") !== (p.type == null ? null : p.type) || a.getAttribute("crossorigin") !== (p.crossOrigin == null ? null : p.crossOrigin)) && m && a.hasAttribute("async") && !a.hasAttribute("itemprop"))
                break;
              return a;
            default:
              return a;
          }
      } else if (i === "input" && a.type === "hidden") {
        var m = p.name == null ? null : "" + p.name;
        if (p.type === "hidden" && a.getAttribute("name") === m)
          return a;
      } else return a;
      if (a = Pn(a.nextSibling), a === null) break;
    }
    return null;
  }
  function d3(a, i, l) {
    if (i === "") return null;
    for (; a.nodeType !== 3; )
      if ((a.nodeType !== 1 || a.nodeName !== "INPUT" || a.type !== "hidden") && !l || (a = Pn(a.nextSibling), a === null)) return null;
    return a;
  }
  function hO(a, i) {
    for (; a.nodeType !== 8; )
      if ((a.nodeType !== 1 || a.nodeName !== "INPUT" || a.type !== "hidden") && !i || (a = Pn(a.nextSibling), a === null)) return null;
    return a;
  }
  function Ip(a) {
    return a.data === "$?" || a.data === "$~";
  }
  function Hp(a) {
    return a.data === "$!" || a.data === "$?" && a.ownerDocument.readyState !== "loading";
  }
  function h3(a, i) {
    var l = a.ownerDocument;
    if (a.data === "$~") a._reactRetry = i;
    else if (a.data !== "$?" || l.readyState !== "loading")
      i();
    else {
      var s = function() {
        i(), l.removeEventListener("DOMContentLoaded", s);
      };
      l.addEventListener("DOMContentLoaded", s), a._reactRetry = s;
    }
  }
  function Pn(a) {
    for (; a != null; a = a.nextSibling) {
      var i = a.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (i = a.data, i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&" || i === "F!" || i === "F")
          break;
        if (i === "/$" || i === "/&") return null;
      }
    }
    return a;
  }
  var Gp = null;
  function pO(a) {
    a = a.nextSibling;
    for (var i = 0; a; ) {
      if (a.nodeType === 8) {
        var l = a.data;
        if (l === "/$" || l === "/&") {
          if (i === 0)
            return Pn(a.nextSibling);
          i--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || i++;
      }
      a = a.nextSibling;
    }
    return null;
  }
  function vO(a) {
    a = a.previousSibling;
    for (var i = 0; a; ) {
      if (a.nodeType === 8) {
        var l = a.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (i === 0) return a;
          i--;
        } else l !== "/$" && l !== "/&" || i++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  function yO(a, i, l) {
    switch (i = Ss(l), a) {
      case "html":
        if (a = i.documentElement, !a) throw Error(r(452));
        return a;
      case "head":
        if (a = i.head, !a) throw Error(r(453));
        return a;
      case "body":
        if (a = i.body, !a) throw Error(r(454));
        return a;
      default:
        throw Error(r(451));
    }
  }
  function Wl(a) {
    for (var i = a.attributes; i.length; )
      a.removeAttributeNode(i[0]);
    Kd(a);
  }
  var Nn = /* @__PURE__ */ new Map(), mO = /* @__PURE__ */ new Set();
  function _s(a) {
    return typeof a.getRootNode == "function" ? a.getRootNode() : a.nodeType === 9 ? a : a.ownerDocument;
  }
  var Nr = K.d;
  K.d = {
    f: p3,
    r: v3,
    D: y3,
    C: m3,
    L: g3,
    m: b3,
    X: S3,
    S: x3,
    M: _3
  };
  function p3() {
    var a = Nr.f(), i = hs();
    return a || i;
  }
  function v3(a) {
    var i = Ci(a);
    i !== null && i.tag === 5 && i.type === "form" ? RS(i) : Nr.r(a);
  }
  var uo = typeof document > "u" ? null : document;
  function gO(a, i, l) {
    var s = uo;
    if (s && typeof i == "string" && i) {
      var p = An(i);
      p = 'link[rel="' + a + '"][href="' + p + '"]', typeof l == "string" && (p += '[crossorigin="' + l + '"]'), mO.has(p) || (mO.add(p), a = { rel: a, crossOrigin: l, href: i }, s.querySelector(p) === null && (i = s.createElement("link"), zt(i, "link", a), jt(i), s.head.appendChild(i)));
    }
  }
  function y3(a) {
    Nr.D(a), gO("dns-prefetch", a, null);
  }
  function m3(a, i) {
    Nr.C(a, i), gO("preconnect", a, i);
  }
  function g3(a, i, l) {
    Nr.L(a, i, l);
    var s = uo;
    if (s && a && i) {
      var p = 'link[rel="preload"][as="' + An(i) + '"]';
      i === "image" && l && l.imageSrcSet ? (p += '[imagesrcset="' + An(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (p += '[imagesizes="' + An(
        l.imageSizes
      ) + '"]')) : p += '[href="' + An(a) + '"]';
      var m = p;
      switch (i) {
        case "style":
          m = co(a);
          break;
        case "script":
          m = so(a);
      }
      Nn.has(m) || (a = v(
        {
          rel: "preload",
          href: i === "image" && l && l.imageSrcSet ? void 0 : a,
          as: i
        },
        l
      ), Nn.set(m, a), s.querySelector(p) !== null || i === "style" && s.querySelector(Zl(m)) || i === "script" && s.querySelector(Ql(m)) || (i = s.createElement("link"), zt(i, "link", a), jt(i), s.head.appendChild(i)));
    }
  }
  function b3(a, i) {
    Nr.m(a, i);
    var l = uo;
    if (l && a) {
      var s = i && typeof i.as == "string" ? i.as : "script", p = 'link[rel="modulepreload"][as="' + An(s) + '"][href="' + An(a) + '"]', m = p;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = so(a);
      }
      if (!Nn.has(m) && (a = v({ rel: "modulepreload", href: a }, i), Nn.set(m, a), l.querySelector(p) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Ql(m)))
              return;
        }
        s = l.createElement("link"), zt(s, "link", a), jt(s), l.head.appendChild(s);
      }
    }
  }
  function x3(a, i, l) {
    Nr.S(a, i, l);
    var s = uo;
    if (s && a) {
      var p = Di(s).hoistableStyles, m = co(a);
      i = i || "default";
      var O = p.get(m);
      if (!O) {
        var D = { loading: 0, preload: null };
        if (O = s.querySelector(
          Zl(m)
        ))
          D.loading = 5;
        else {
          a = v(
            { rel: "stylesheet", href: a, "data-precedence": i },
            l
          ), (l = Nn.get(m)) && Yp(a, l);
          var L = O = s.createElement("link");
          jt(L), zt(L, "link", a), L._p = new Promise(function(Z, ae) {
            L.onload = Z, L.onerror = ae;
          }), L.addEventListener("load", function() {
            D.loading |= 1;
          }), L.addEventListener("error", function() {
            D.loading |= 2;
          }), D.loading |= 4, Os(O, i, s);
        }
        O = {
          type: "stylesheet",
          instance: O,
          count: 1,
          state: D
        }, p.set(m, O);
      }
    }
  }
  function S3(a, i) {
    Nr.X(a, i);
    var l = uo;
    if (l && a) {
      var s = Di(l).hoistableScripts, p = so(a), m = s.get(p);
      m || (m = l.querySelector(Ql(p)), m || (a = v({ src: a, async: !0 }, i), (i = Nn.get(p)) && Kp(a, i), m = l.createElement("script"), jt(m), zt(m, "link", a), l.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, s.set(p, m));
    }
  }
  function _3(a, i) {
    Nr.M(a, i);
    var l = uo;
    if (l && a) {
      var s = Di(l).hoistableScripts, p = so(a), m = s.get(p);
      m || (m = l.querySelector(Ql(p)), m || (a = v({ src: a, async: !0, type: "module" }, i), (i = Nn.get(p)) && Kp(a, i), m = l.createElement("script"), jt(m), zt(m, "link", a), l.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, s.set(p, m));
    }
  }
  function bO(a, i, l, s) {
    var p = (p = fe.current) ? _s(p) : null;
    if (!p) throw Error(r(446));
    switch (a) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (i = co(l.href), l = Di(
          p
        ).hoistableStyles, s = l.get(i), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(i, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          a = co(l.href);
          var m = Di(
            p
          ).hoistableStyles, O = m.get(a);
          if (O || (p = p.ownerDocument || p, O = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(a, O), (m = p.querySelector(
            Zl(a)
          )) && !m._p && (O.instance = m, O.state.loading = 5), Nn.has(a) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Nn.set(a, l), m || O3(
            p,
            a,
            l,
            O.state
          ))), i && s === null)
            throw Error(r(528, ""));
          return O;
        }
        if (i && s !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return i = l.async, l = l.src, typeof l == "string" && i && typeof i != "function" && typeof i != "symbol" ? (i = so(l), l = Di(
          p
        ).hoistableScripts, s = l.get(i), s || (s = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(i, s)), s) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, a));
    }
  }
  function co(a) {
    return 'href="' + An(a) + '"';
  }
  function Zl(a) {
    return 'link[rel="stylesheet"][' + a + "]";
  }
  function xO(a) {
    return v({}, a, {
      "data-precedence": a.precedence,
      precedence: null
    });
  }
  function O3(a, i, l, s) {
    a.querySelector('link[rel="preload"][as="style"][' + i + "]") ? s.loading = 1 : (i = a.createElement("link"), s.preload = i, i.addEventListener("load", function() {
      return s.loading |= 1;
    }), i.addEventListener("error", function() {
      return s.loading |= 2;
    }), zt(i, "link", l), jt(i), a.head.appendChild(i));
  }
  function so(a) {
    return '[src="' + An(a) + '"]';
  }
  function Ql(a) {
    return "script[async]" + a;
  }
  function SO(a, i, l) {
    if (i.count++, i.instance === null)
      switch (i.type) {
        case "style":
          var s = a.querySelector(
            'style[data-href~="' + An(l.href) + '"]'
          );
          if (s)
            return i.instance = s, jt(s), s;
          var p = v({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return s = (a.ownerDocument || a).createElement(
            "style"
          ), jt(s), zt(s, "style", p), Os(s, l.precedence, a), i.instance = s;
        case "stylesheet":
          p = co(l.href);
          var m = a.querySelector(
            Zl(p)
          );
          if (m)
            return i.state.loading |= 4, i.instance = m, jt(m), m;
          s = xO(l), (p = Nn.get(p)) && Yp(s, p), m = (a.ownerDocument || a).createElement("link"), jt(m);
          var O = m;
          return O._p = new Promise(function(D, L) {
            O.onload = D, O.onerror = L;
          }), zt(m, "link", s), i.state.loading |= 4, Os(m, l.precedence, a), i.instance = m;
        case "script":
          return m = so(l.src), (p = a.querySelector(
            Ql(m)
          )) ? (i.instance = p, jt(p), p) : (s = l, (p = Nn.get(m)) && (s = v({}, l), Kp(s, p)), a = a.ownerDocument || a, p = a.createElement("script"), jt(p), zt(p, "link", s), a.head.appendChild(p), i.instance = p);
        case "void":
          return null;
        default:
          throw Error(r(443, i.type));
      }
    else
      i.type === "stylesheet" && (i.state.loading & 4) === 0 && (s = i.instance, i.state.loading |= 4, Os(s, l.precedence, a));
    return i.instance;
  }
  function Os(a, i, l) {
    for (var s = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), p = s.length ? s[s.length - 1] : null, m = p, O = 0; O < s.length; O++) {
      var D = s[O];
      if (D.dataset.precedence === i) m = D;
      else if (m !== p) break;
    }
    m ? m.parentNode.insertBefore(a, m.nextSibling) : (i = l.nodeType === 9 ? l.head : l, i.insertBefore(a, i.firstChild));
  }
  function Yp(a, i) {
    a.crossOrigin == null && (a.crossOrigin = i.crossOrigin), a.referrerPolicy == null && (a.referrerPolicy = i.referrerPolicy), a.title == null && (a.title = i.title);
  }
  function Kp(a, i) {
    a.crossOrigin == null && (a.crossOrigin = i.crossOrigin), a.referrerPolicy == null && (a.referrerPolicy = i.referrerPolicy), a.integrity == null && (a.integrity = i.integrity);
  }
  var ws = null;
  function _O(a, i, l) {
    if (ws === null) {
      var s = /* @__PURE__ */ new Map(), p = ws = /* @__PURE__ */ new Map();
      p.set(l, s);
    } else
      p = ws, s = p.get(l), s || (s = /* @__PURE__ */ new Map(), p.set(l, s));
    if (s.has(a)) return s;
    for (s.set(a, null), l = l.getElementsByTagName(a), p = 0; p < l.length; p++) {
      var m = l[p];
      if (!(m[pl] || m[Pt] || a === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var O = m.getAttribute(i) || "";
        O = a + O;
        var D = s.get(O);
        D ? D.push(m) : s.set(O, [m]);
      }
    }
    return s;
  }
  function OO(a, i, l) {
    a = a.ownerDocument || a, a.head.insertBefore(
      l,
      i === "title" ? a.querySelector("head > title") : null
    );
  }
  function w3(a, i, l) {
    if (l === 1 || i.itemProp != null) return !1;
    switch (a) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof i.precedence != "string" || typeof i.href != "string" || i.href === "")
          break;
        return !0;
      case "link":
        if (typeof i.rel != "string" || typeof i.href != "string" || i.href === "" || i.onLoad || i.onError)
          break;
        switch (i.rel) {
          case "stylesheet":
            return a = i.disabled, typeof i.precedence == "string" && a == null;
          default:
            return !0;
        }
      case "script":
        if (i.async && typeof i.async != "function" && typeof i.async != "symbol" && !i.onLoad && !i.onError && i.src && typeof i.src == "string")
          return !0;
    }
    return !1;
  }
  function wO(a) {
    return !(a.type === "stylesheet" && (a.state.loading & 3) === 0);
  }
  function A3(a, i, l, s) {
    if (l.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var p = co(s.href), m = i.querySelector(
          Zl(p)
        );
        if (m) {
          i = m._p, i !== null && typeof i == "object" && typeof i.then == "function" && (a.count++, a = As.bind(a), i.then(a, a)), l.state.loading |= 4, l.instance = m, jt(m);
          return;
        }
        m = i.ownerDocument || i, s = xO(s), (p = Nn.get(p)) && Yp(s, p), m = m.createElement("link"), jt(m);
        var O = m;
        O._p = new Promise(function(D, L) {
          O.onload = D, O.onerror = L;
        }), zt(m, "link", s), l.instance = m;
      }
      a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(l, i), (i = l.state.preload) && (l.state.loading & 3) === 0 && (a.count++, l = As.bind(a), i.addEventListener("load", l), i.addEventListener("error", l));
    }
  }
  var Xp = 0;
  function T3(a, i) {
    return a.stylesheets && a.count === 0 && Es(a, a.stylesheets), 0 < a.count || 0 < a.imgCount ? function(l) {
      var s = setTimeout(function() {
        if (a.stylesheets && Es(a, a.stylesheets), a.unsuspend) {
          var m = a.unsuspend;
          a.unsuspend = null, m();
        }
      }, 6e4 + i);
      0 < a.imgBytes && Xp === 0 && (Xp = 62500 * o3());
      var p = setTimeout(
        function() {
          if (a.waitingForImages = !1, a.count === 0 && (a.stylesheets && Es(a, a.stylesheets), a.unsuspend)) {
            var m = a.unsuspend;
            a.unsuspend = null, m();
          }
        },
        (a.imgBytes > Xp ? 50 : 800) + i
      );
      return a.unsuspend = l, function() {
        a.unsuspend = null, clearTimeout(s), clearTimeout(p);
      };
    } : null;
  }
  function As() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Es(this, this.stylesheets);
      else if (this.unsuspend) {
        var a = this.unsuspend;
        this.unsuspend = null, a();
      }
    }
  }
  var Ts = null;
  function Es(a, i) {
    a.stylesheets = null, a.unsuspend !== null && (a.count++, Ts = /* @__PURE__ */ new Map(), i.forEach(E3, a), Ts = null, As.call(a));
  }
  function E3(a, i) {
    if (!(i.state.loading & 4)) {
      var l = Ts.get(a);
      if (l) var s = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ts.set(a, l);
        for (var p = a.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < p.length; m++) {
          var O = p[m];
          (O.nodeName === "LINK" || O.getAttribute("media") !== "not all") && (l.set(O.dataset.precedence, O), s = O);
        }
        s && l.set(null, s);
      }
      p = i.instance, O = p.getAttribute("data-precedence"), m = l.get(O) || s, m === s && l.set(null, p), l.set(O, p), this.count++, s = As.bind(this), p.addEventListener("load", s), p.addEventListener("error", s), m ? m.parentNode.insertBefore(p, m.nextSibling) : (a = a.nodeType === 9 ? a.head : a, a.insertBefore(p, a.firstChild)), i.state.loading |= 4;
    }
  }
  var Jl = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0
  };
  function j3(a, i, l, s, p, m, O, D, L) {
    this.tag = 1, this.containerInfo = a, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Id(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Id(0), this.hiddenUpdates = Id(null), this.identifierPrefix = s, this.onUncaughtError = p, this.onCaughtError = m, this.onRecoverableError = O, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function AO(a, i, l, s, p, m, O, D, L, Z, ae, le) {
    return a = new j3(
      a,
      i,
      l,
      O,
      L,
      Z,
      ae,
      le,
      D
    ), i = 1, m === !0 && (i |= 24), m = dn(3, null, null, i), a.current = m, m.stateNode = a, i = Th(), i.refCount++, a.pooledCache = i, i.refCount++, m.memoizedState = {
      element: s,
      isDehydrated: l,
      cache: i
    }, Ch(m), a;
  }
  function TO(a) {
    return a ? (a = Ui, a) : Ui;
  }
  function EO(a, i, l, s, p, m) {
    p = TO(p), s.context === null ? s.context = p : s.pendingContext = p, s = oa(i), s.payload = { element: l }, m = m === void 0 ? null : m, m !== null && (s.callback = m), l = la(a, s, i), l !== null && (rn(l, a, i), Dl(l, a, i));
  }
  function jO(a, i) {
    if (a = a.memoizedState, a !== null && a.dehydrated !== null) {
      var l = a.retryLane;
      a.retryLane = l !== 0 && l < i ? l : i;
    }
  }
  function Vp(a, i) {
    jO(a, i), (a = a.alternate) && jO(a, i);
  }
  function MO(a) {
    if (a.tag === 13 || a.tag === 31) {
      var i = Ia(a, 67108864);
      i !== null && rn(i, a, 67108864), Vp(a, 67108864);
    }
  }
  function CO(a) {
    if (a.tag === 13 || a.tag === 31) {
      var i = mn();
      i = Hd(i);
      var l = Ia(a, i);
      l !== null && rn(l, a, i), Vp(a, i);
    }
  }
  var js = !0;
  function M3(a, i, l, s) {
    var p = $.T;
    $.T = null;
    var m = K.p;
    try {
      K.p = 2, Fp(a, i, l, s);
    } finally {
      K.p = m, $.T = p;
    }
  }
  function C3(a, i, l, s) {
    var p = $.T;
    $.T = null;
    var m = K.p;
    try {
      K.p = 8, Fp(a, i, l, s);
    } finally {
      K.p = m, $.T = p;
    }
  }
  function Fp(a, i, l, s) {
    if (js) {
      var p = Wp(s);
      if (p === null)
        $p(
          a,
          i,
          s,
          Ms,
          l
        ), PO(a, s);
      else if (P3(
        p,
        a,
        i,
        l,
        s
      ))
        s.stopPropagation();
      else if (PO(a, s), i & 4 && -1 < D3.indexOf(a)) {
        for (; p !== null; ) {
          var m = Ci(p);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var O = qa(m.pendingLanes);
                  if (O !== 0) {
                    var D = m;
                    for (D.pendingLanes |= 2, D.entangledLanes |= 2; O; ) {
                      var L = 1 << 31 - sn(O);
                      D.entanglements[1] |= L, O &= ~L;
                    }
                    nr(m), (Ue & 6) === 0 && (fs = Lt() + 500, Xl(0));
                  }
                }
                break;
              case 31:
              case 13:
                D = Ia(m, 2), D !== null && rn(D, m, 2), hs(), Vp(m, 2);
            }
          if (m = Wp(s), m === null && $p(
            a,
            i,
            s,
            Ms,
            l
          ), m === p) break;
          p = m;
        }
        p !== null && s.stopPropagation();
      } else
        $p(
          a,
          i,
          s,
          null,
          l
        );
    }
  }
  function Wp(a) {
    return a = Qd(a), Zp(a);
  }
  var Ms = null;
  function Zp(a) {
    if (Ms = null, a = Mi(a), a !== null) {
      var i = u(a);
      if (i === null) a = null;
      else {
        var l = i.tag;
        if (l === 13) {
          if (a = c(i), a !== null) return a;
          a = null;
        } else if (l === 31) {
          if (a = f(i), a !== null) return a;
          a = null;
        } else if (l === 3) {
          if (i.stateNode.current.memoizedState.isDehydrated)
            return i.tag === 3 ? i.stateNode.containerInfo : null;
          a = null;
        } else i !== a && (a = null);
      }
    }
    return Ms = a, null;
  }
  function DO(a) {
    switch (a) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (mc()) {
          case B1:
            return 2;
          case L1:
            return 8;
          case gc:
          case mN:
            return 32;
          case U1:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Qp = !1, ga = null, ba = null, xa = null, eu = /* @__PURE__ */ new Map(), tu = /* @__PURE__ */ new Map(), Sa = [], D3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function PO(a, i) {
    switch (a) {
      case "focusin":
      case "focusout":
        ga = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        xa = null;
        break;
      case "pointerover":
      case "pointerout":
        eu.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        tu.delete(i.pointerId);
    }
  }
  function nu(a, i, l, s, p, m) {
    return a === null || a.nativeEvent !== m ? (a = {
      blockedOn: i,
      domEventName: l,
      eventSystemFlags: s,
      nativeEvent: m,
      targetContainers: [p]
    }, i !== null && (i = Ci(i), i !== null && MO(i)), a) : (a.eventSystemFlags |= s, i = a.targetContainers, p !== null && i.indexOf(p) === -1 && i.push(p), a);
  }
  function P3(a, i, l, s, p) {
    switch (i) {
      case "focusin":
        return ga = nu(
          ga,
          a,
          i,
          l,
          s,
          p
        ), !0;
      case "dragenter":
        return ba = nu(
          ba,
          a,
          i,
          l,
          s,
          p
        ), !0;
      case "mouseover":
        return xa = nu(
          xa,
          a,
          i,
          l,
          s,
          p
        ), !0;
      case "pointerover":
        var m = p.pointerId;
        return eu.set(
          m,
          nu(
            eu.get(m) || null,
            a,
            i,
            l,
            s,
            p
          )
        ), !0;
      case "gotpointercapture":
        return m = p.pointerId, tu.set(
          m,
          nu(
            tu.get(m) || null,
            a,
            i,
            l,
            s,
            p
          )
        ), !0;
    }
    return !1;
  }
  function NO(a) {
    var i = Mi(a.target);
    if (i !== null) {
      var l = u(i);
      if (l !== null) {
        if (i = l.tag, i === 13) {
          if (i = c(l), i !== null) {
            a.blockedOn = i, X1(a.priority, function() {
              CO(l);
            });
            return;
          }
        } else if (i === 31) {
          if (i = f(l), i !== null) {
            a.blockedOn = i, X1(a.priority, function() {
              CO(l);
            });
            return;
          }
        } else if (i === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Cs(a) {
    if (a.blockedOn !== null) return !1;
    for (var i = a.targetContainers; 0 < i.length; ) {
      var l = Wp(a.nativeEvent);
      if (l === null) {
        l = a.nativeEvent;
        var s = new l.constructor(
          l.type,
          l
        );
        Zd = s, l.target.dispatchEvent(s), Zd = null;
      } else
        return i = Ci(l), i !== null && MO(i), a.blockedOn = l, !1;
      i.shift();
    }
    return !0;
  }
  function RO(a, i, l) {
    Cs(a) && l.delete(i);
  }
  function N3() {
    Qp = !1, ga !== null && Cs(ga) && (ga = null), ba !== null && Cs(ba) && (ba = null), xa !== null && Cs(xa) && (xa = null), eu.forEach(RO), tu.forEach(RO);
  }
  function Ds(a, i) {
    a.blockedOn === i && (a.blockedOn = null, Qp || (Qp = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      N3
    )));
  }
  var Ps = null;
  function $O(a) {
    Ps !== a && (Ps = a, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Ps === a && (Ps = null);
        for (var i = 0; i < a.length; i += 3) {
          var l = a[i], s = a[i + 1], p = a[i + 2];
          if (typeof s != "function") {
            if (Zp(s || l) === null)
              continue;
            break;
          }
          var m = Ci(l);
          m !== null && (a.splice(i, 3), i -= 3, Wh(
            m,
            {
              pending: !0,
              data: p,
              method: l.method,
              action: s
            },
            s,
            p
          ));
        }
      }
    ));
  }
  function fo(a) {
    function i(L) {
      return Ds(L, a);
    }
    ga !== null && Ds(ga, a), ba !== null && Ds(ba, a), xa !== null && Ds(xa, a), eu.forEach(i), tu.forEach(i);
    for (var l = 0; l < Sa.length; l++) {
      var s = Sa[l];
      s.blockedOn === a && (s.blockedOn = null);
    }
    for (; 0 < Sa.length && (l = Sa[0], l.blockedOn === null); )
      NO(l), l.blockedOn === null && Sa.shift();
    if (l = (a.ownerDocument || a).$$reactFormReplay, l != null)
      for (s = 0; s < l.length; s += 3) {
        var p = l[s], m = l[s + 1], O = p[Zt] || null;
        if (typeof m == "function")
          O || $O(l);
        else if (O) {
          var D = null;
          if (m && m.hasAttribute("formAction")) {
            if (p = m, O = m[Zt] || null)
              D = O.formAction;
            else if (Zp(p) !== null) continue;
          } else D = O.action;
          typeof D == "function" ? l[s + 1] = D : (l.splice(s, 3), s -= 3), $O(l);
        }
      }
  }
  function zO() {
    function a(m) {
      m.canIntercept && m.info === "react-transition" && m.intercept({
        handler: function() {
          return new Promise(function(O) {
            return p = O;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function i() {
      p !== null && (p(), p = null), s || setTimeout(l, 20);
    }
    function l() {
      if (!s && !navigation.transition) {
        var m = navigation.currentEntry;
        m && m.url != null && navigation.navigate(m.url, {
          state: m.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var s = !1, p = null;
      return navigation.addEventListener("navigate", a), navigation.addEventListener("navigatesuccess", i), navigation.addEventListener("navigateerror", i), setTimeout(l, 100), function() {
        s = !0, navigation.removeEventListener("navigate", a), navigation.removeEventListener("navigatesuccess", i), navigation.removeEventListener("navigateerror", i), p !== null && (p(), p = null);
      };
    }
  }
  function Jp(a) {
    this._internalRoot = a;
  }
  Ns.prototype.render = Jp.prototype.render = function(a) {
    var i = this._internalRoot;
    if (i === null) throw Error(r(409));
    var l = i.current, s = mn();
    EO(l, s, a, i, null, null);
  }, Ns.prototype.unmount = Jp.prototype.unmount = function() {
    var a = this._internalRoot;
    if (a !== null) {
      this._internalRoot = null;
      var i = a.containerInfo;
      EO(a.current, 2, null, a, null, null), hs(), i[ji] = null;
    }
  };
  function Ns(a) {
    this._internalRoot = a;
  }
  Ns.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var i = K1();
      a = { blockedOn: null, target: a, priority: i };
      for (var l = 0; l < Sa.length && i !== 0 && i < Sa[l].priority; l++) ;
      Sa.splice(l, 0, a), l === 0 && NO(a);
    }
  };
  var qO = t.version;
  if (qO !== "19.2.8")
    throw Error(
      r(
        527,
        qO,
        "19.2.8"
      )
    );
  K.findDOMNode = function(a) {
    var i = a._reactInternals;
    if (i === void 0)
      throw typeof a.render == "function" ? Error(r(188)) : (a = Object.keys(a).join(","), Error(r(268, a)));
    return a = h(i), a = a !== null ? y(a) : null, a = a === null ? null : a.stateNode, a;
  };
  var R3 = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: $,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Rs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Rs.isDisabled && Rs.supportsFiber)
      try {
        fl = Rs.inject(
          R3
        ), cn = Rs;
      } catch {
      }
  }
  return pu.createRoot = function(a, i) {
    if (!o(a)) throw Error(r(299));
    var l = !1, s = "", p = GS, m = YS, O = KS;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (s = i.identifierPrefix), i.onUncaughtError !== void 0 && (p = i.onUncaughtError), i.onCaughtError !== void 0 && (m = i.onCaughtError), i.onRecoverableError !== void 0 && (O = i.onRecoverableError)), i = AO(
      a,
      1,
      !1,
      null,
      null,
      l,
      s,
      null,
      p,
      m,
      O,
      zO
    ), a[ji] = i.current, Rp(a), new Jp(i);
  }, pu.hydrateRoot = function(a, i, l) {
    if (!o(a)) throw Error(r(299));
    var s = !1, p = "", m = GS, O = YS, D = KS, L = null;
    return l != null && (l.unstable_strictMode === !0 && (s = !0), l.identifierPrefix !== void 0 && (p = l.identifierPrefix), l.onUncaughtError !== void 0 && (m = l.onUncaughtError), l.onCaughtError !== void 0 && (O = l.onCaughtError), l.onRecoverableError !== void 0 && (D = l.onRecoverableError), l.formState !== void 0 && (L = l.formState)), i = AO(
      a,
      1,
      !0,
      i,
      l ?? null,
      s,
      p,
      L,
      m,
      O,
      D,
      zO
    ), i.context = TO(null), l = i.current, s = mn(), s = Hd(s), p = oa(s), p.callback = null, la(l, p, s), l = s, i.current.lanes = l, hl(i, l), nr(i), a[ji] = i.current, Rp(a), new Ns(i);
  }, pu.version = "19.2.8", pu;
}
var UM;
function tX() {
  if (UM) return ab.exports;
  UM = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), ab.exports = eX(), ab.exports;
}
var nX = tX();
const rX = `
  --nb-bg: #121a27;
  --nb-panel-2: #17202f;
  --nb-border: #223047;
  --nb-text: #e6edf7;
  --nb-muted: #8b9bb4;
  --nb-green: #34d399;
  --nb-red: #f87171;
  --nb-accent: #60a5fa;
  --nb-ink: #7ea8dc;
  --nb-warn: #fbbf24;
  --nb-radius: 12px;
  --nb-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --nb-border-width: 1px;
  --nb-shadow: none;
  --nb-backdrop: none;
`, aX = `
  --nb-bg: var(--ha-card-background, var(--card-background-color, #fff));
  --nb-panel-2: var(--secondary-background-color, #f0f0f0);
  --nb-border: var(--divider-color, #e0e0e0);
  --nb-text: var(--primary-text-color, #212121);
  --nb-muted: var(--secondary-text-color, #727272);
  --nb-green: var(--success-color, #34d399);
  --nb-red: var(--error-color, #f87171);
  --nb-accent: var(--primary-color, #60a5fa);
  --nb-ink: #4a7cc0;
  --nb-warn: var(--warning-color, #b45309);
  --nb-radius: var(--ha-card-border-radius, 12px);
  --nb-font: var(--ha-card-font-family, var(--primary-font-family, Roboto, sans-serif));
  --nb-border-width: var(--ha-card-border-width, 1px);
  --nb-shadow: var(--ha-card-box-shadow, none);
  --nb-backdrop: var(--ha-card-backdrop-filter, none);
`;
function iX(e) {
  return `
  :host {
    display: block;
    position: relative;
    ${e === "ha" ? aX : rX}
  }
  * { box-sizing: border-box; }
  /* Overlay layer: sibling of .card, so it escapes the card's stacking
     context and floats over neighbouring cards. */
  .overlay {
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    overflow: visible;
    z-index: 20;
    pointer-events: none;
    color: var(--nb-text);
    font-family: var(--nb-font);
    font-size: 14px;
  }
  .overlay::backdrop { display: none; }
  .overlay > * { pointer-events: auto; }
  .card {
    position: relative;
    /* Own stacking context so the ambient layer's z-index -1 sits between
       the card background and the content instead of under the page. */
    isolation: isolate;
    background: var(--nb-bg);
    border: var(--nb-border-width) solid var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow);
    -webkit-backdrop-filter: var(--nb-backdrop);
    backdrop-filter: var(--nb-backdrop);
    padding: 14px 16px;
    color: var(--nb-text);
    font-family: var(--nb-font);
    font-size: 14px;
  }
  /* Ambient background: the app's canvas effect clipped to the card, plus
     a faint accent wash in the top-right corner. Content stays clickable
     (pointer-events none) and readable (low alpha strokes only). */
  .ambient {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
  }
  .ambient::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(70% 55% at 100% 0%,
      color-mix(in srgb, var(--nb-accent) 9%, transparent), transparent 70%);
  }
  .ambient canvas {
    display: block;
    width: 100%;
    height: 100%;
    color: var(--nb-accent);
  }
  .head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 10px;
    margin-bottom: 10px;
  }
  .head h2 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--nb-muted);
    flex: 1;
    /* Never wrap the title; the toggle group wraps below it instead. */
    white-space: nowrap;
  }
  .muted { color: var(--nb-muted); }
  /* Toggles + lock live in one right-aligned group; margin-left auto keeps it
     pinned to the right edge even when a narrow card wraps it onto its own
     line under the title. */
  .head-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-left: auto;
  }
  .controls { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .seg {
    display: inline-flex;
    border: 1px solid var(--nb-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .seg button {
    background: transparent;
    border: none;
    color: var(--nb-muted);
    padding: 4px 9px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  .seg button.active { background: var(--nb-panel-2); color: var(--nb-text); }
  .lock {
    background: transparent;
    border: 1px solid var(--nb-border);
    border-radius: 8px;
    color: var(--nb-muted);
    width: 34px;
    height: 30px;
    cursor: pointer;
    font-size: 13px;
    line-height: 1;
  }
  .lock:hover { color: var(--nb-text); border-color: var(--nb-muted); }
  .status { text-align: center; padding: 40px 0; color: var(--nb-muted); }
  .error-box {
    background: rgba(248, 113, 113, 0.12);
    border: 1px solid var(--nb-red);
    color: var(--nb-red);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
  }
  .reveal-note { font-size: 11px; color: var(--nb-muted); }

  /* stat card (the web hero, card-sized): one big number, its change as a
     tinted chip, and — uncensored — the composition bar under it. */
  .stat-value {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .stat-delta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
    font-size: 12px;
    color: var(--nb-muted);
  }
  .chip {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    background: color-mix(in srgb, var(--nb-green) 14%, transparent);
    color: var(--nb-green);
  }
  .chip.down {
    background: color-mix(in srgb, var(--nb-red) 14%, transparent);
    color: var(--nb-red);
  }
  .up { color: var(--nb-green); }
  .down { color: var(--nb-red); }
  .comp { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
  .comp-bar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; gap: 3px; }
  .comp-bar span { display: block; height: 100%; min-width: 4px; border-radius: 2px; }
  .comp-legend { display: flex; flex-wrap: wrap; gap: 4px 16px; }
  .comp-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--nb-muted);
    white-space: nowrap;
  }
  .comp-item b { color: var(--nb-text); font-weight: 600; font-variant-numeric: tabular-nums; }
  .comp-dot { width: 8px; height: 8px; border-radius: 2.5px; flex: none; }
  /* Banner layout: everything on one row. The header keeps its place at
     the left (title) and right (lock), the number and chip sit between,
     and the composition bar takes whatever width is left. */
  .stat-banner { padding: 10px 16px; display: flex; align-items: center; flex-wrap: wrap; gap: 6px 18px; }
  .stat-banner .head { margin: 0; flex: none; display: contents; }
  .stat-banner .head h2 { flex: none; order: 0; }
  .stat-banner .head .head-right { order: 10; margin-left: auto; }
  .stat-banner .stat-value { order: 1; font-size: 24px; }
  .stat-banner .stat-delta { order: 2; margin-top: 0; }
  .stat-banner .comp { order: 3; flex: 1 1 260px; margin-top: 0; gap: 5px; min-width: 200px; }
  .stat-banner .status, .stat-banner .error-box { order: 1; flex: 1; padding: 6px 0; }

  /* accounts card */
  table { width: 100%; border-collapse: collapse; }
  td, th { padding: 6px 4px; text-align: left; font-size: 13px; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
  tr + tr td { border-top: 1px solid var(--nb-border); }
  td.row-delta { font-size: 12px; width: 1%; white-space: nowrap; padding-left: 10px; }
  .kind-row td {
    color: var(--nb-muted);
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.05em;
    padding-top: 12px;
  }
  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 7px;
    background: var(--nb-green);
  }
  .dot.stale { background: var(--nb-warn); }
  td.name-cell { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .name-cell .dot { margin: 0; flex: none; }
  .name-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
  .name-text .muted { font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  /* Institution monogram: the web's account-card tile, row-sized. */
  .mono {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, var(--mono-a, #3b82f6), var(--mono-b, #2563eb));
  }

  /* pin pad overlay */
  .pin-wrap {
    position: absolute;
    top: 48px;
    right: 12px;
    z-index: 20;
  }
  .pinpad {
    background: var(--nb-bg);
    border: 1px solid color-mix(in srgb, var(--nb-green) 45%, var(--nb-border));
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45),
      0 0 0 1px color-mix(in srgb, var(--nb-green) 18%, transparent),
      0 0 16px color-mix(in srgb, var(--nb-green) 25%, transparent);
  }
  .pin-label {
    text-align: center;
    color: var(--nb-muted);
    font-size: 12px;
    margin-bottom: 10px;
    white-space: nowrap;
  }
  .pin-dots { display: flex; justify-content: center; gap: 10px; margin-bottom: 12px; }
  .pin-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--nb-muted); }
  .pin-dot.filled { background: var(--nb-text); border-color: var(--nb-text); }
  .pin-grid { display: grid; grid-template-columns: repeat(3, 48px); gap: 8px; }
  .pin-grid button {
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--nb-border);
    background: var(--nb-panel-2);
    color: var(--nb-text);
    font-size: 17px;
    cursor: pointer;
    font-family: inherit;
  }
  .pin-grid button:hover { border-color: var(--nb-muted); }
  .pin-grid button:disabled { opacity: 0.5; cursor: default; }
  .pw-err { display: block; margin: 10px 0 0; text-align: center; font-size: 12px; color: var(--nb-red); }
  .pin-footer {
    display: block;
    width: 100%;
    margin-top: 10px;
    background: transparent;
    border: none;
    color: var(--nb-muted);
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    font-family: inherit;
  }
  .pin-footer:hover { color: var(--nb-text); }

  /* ---- spending cards (styles mirror the app's globals.css spend-* set,
     retargeted onto the --nb tokens) ---- */
  .spend-month-label { min-width: 120px; cursor: default; }
  /* Stat strip (mirrors the web's spend-headstrip merge): inline
     label/value pairs instead of tiles. */
  .spend-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 28px;
    margin-bottom: 14px;
  }
  .spend-stat { display: flex; align-items: baseline; gap: 9px; }
  .spend-stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--nb-muted);
  }
  .spend-stat-value { font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; }
  .spend-stat-delta { font-size: 11px; }

  .spend-themes-split { display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
  .spend-donut { width: 170px; flex: none; margin-top: 6px; }
  .spend-themes-bars { flex: 1; min-width: 0; }
  .spend-theme-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 7px;
    vertical-align: 1px;
  }
  /* Theme breakdown: one full-width row per theme, thin bar, direct labels. */
  .spend-row {
    display: grid;
    grid-template-columns: 100px 1fr 84px 36px;
    gap: 10px;
    align-items: center;
    width: 100%;
    padding: 7px 8px;
    background: none;
    border: none;
    border-radius: 8px;
    color: var(--nb-text);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
  }
  .spend-row:hover, .spend-row.open { background: var(--nb-panel-2); }
  .spend-row-label { text-transform: capitalize; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .spend-row-bar { height: 10px; border-radius: 4px; overflow: hidden; }
  .spend-row-fill {
    display: block;
    height: 100%;
    border-radius: 4px;
    background: color-mix(in srgb, var(--bar-color, var(--nb-accent)) 30%, transparent);
    border-right: 5px solid var(--bar-color, var(--nb-accent));
    min-width: 7px;
  }
  .spend-row-amount { text-align: right; font-variant-numeric: tabular-nums; }
  .spend-row-count { text-align: right; font-size: 11px; }
  .spend-txns { padding: 4px 8px 10px 24px; }
  .spend-txn {
    display: grid;
    grid-template-columns: 52px 18px 1fr 84px;
    gap: 10px;
    align-items: center;
    padding: 4px 0;
    font-size: 12px;
    border-bottom: 1px solid color-mix(in srgb, var(--nb-border) 50%, transparent);
  }
  .spend-txn:last-child { border-bottom: none; }
  .spend-txn-desc { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .spend-txn-amount { text-align: right; font-variant-numeric: tabular-nums; }
  .spend-txn-logo {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex: none;
    object-fit: cover;
    background: var(--nb-panel-2);
  }
  /* Neutral chip; the thin theme-colored ring carries the color system. */
  .spend-txn-initial {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--nb-panel-2);
    border: 2px solid var(--nb-border);
    color: var(--nb-text);
    font-size: 10px;
    font-weight: 600;
  }

  /* bills calendar + card cycle */
  .spend-cal-svg { width: 100%; height: auto; display: block; }
  .spend-cal-mark { transition: opacity 120ms ease; }
  .spend-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .spend-strip-item {
    background: var(--nb-panel-2);
    border: 1px solid var(--nb-border);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 12px;
  }
  .spend-strip-item.lapsed { opacity: 0.55; }
  .spend-card-row { margin-bottom: 12px; }
  .spend-card-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    font-size: 13px;
    margin-bottom: 4px;
  }
  .spend-card-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
  .spend-card-chip {
    background: none;
    border: 1px solid var(--nb-border);
    border-radius: 999px;
    color: var(--nb-muted);
    font-size: 12px;
    padding: 2px 10px;
    cursor: pointer;
    font-family: inherit;
    opacity: 0.55;
  }
  .spend-card-chip.on {
    color: inherit;
    border-color: color-mix(in srgb, var(--nb-accent) 50%, transparent);
    opacity: 1;
  }
  /* Hover bubble: passive readout that follows the cursor. */
  .spend-hoverbubble {
    position: fixed;
    z-index: 60;
    width: 220px;
    background: var(--nb-panel-2);
    border: 1px solid var(--nb-border);
    border-radius: 10px;
    padding: 10px 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    font-size: 13px;
    pointer-events: none;
  }
  .spend-bubble-title { font-weight: 600; font-size: 14px; }
  .spend-bubble-rows { margin: 8px 0 2px; }
  .spend-bubble-row { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; }
  .spend-hoverbubble-note { margin-top: 6px; font-size: 11px; line-height: 1.35; }
  /* Finance controls remain usable on phones and keyboard navigation. */
  .seg button, .spend-card-chip { min-height: 36px; }
  button:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: 2px; }
  @media (max-width: 600px) {
    .head, .head-right { flex-wrap: wrap; }
    .head-right { max-width: 100%; }
    .head { align-items: flex-start; }
    .seg { max-width: 100%; flex-wrap: wrap; }
    .seg button { min-height: 44px; min-width: 34px; }
    .stat-banner { flex-wrap: wrap; }
    .spend-stats { flex-wrap: wrap; }
    .spend-themes-bars { flex-basis: 100%; }
    .spend-donut { margin: 6px auto; }
    .spend-card-head { flex-wrap: wrap; }
    .name-cell { min-width: 0; }
    .name-text { min-width: 0; overflow-wrap: anywhere; }
    .accounts { font-size: 12px; }
  }
  `;
}
function Oi(e) {
  class t extends HTMLElement {
    constructor() {
      super(...arguments);
      rr(this, "_root");
      rr(this, "_mount");
      rr(this, "_overlay");
      rr(this, "_style");
      rr(this, "_hass");
      rr(this, "_config");
    }
    setConfig(c) {
      this._config = { ...e.defaults, ...c }, this._render();
    }
    set hass(c) {
      var d, h;
      const f = !this._hass || this._hass.connection !== c.connection || ((d = this._hass.user) == null ? void 0 : d.id) !== ((h = c.user) == null ? void 0 : h.id);
      this._hass = c, f && this._render();
    }
    connectedCallback() {
      this._render();
    }
    disconnectedCallback() {
      setTimeout(() => {
        !this.isConnected && this._root && (this._root.unmount(), this._root = void 0, this._mount = void 0, this._overlay = void 0);
      }, 100);
    }
    getCardSize() {
      return e.size;
    }
    static getConfigElement() {
      return document.createElement(`${e.tag}-editor`);
    }
    static getStubConfig() {
      return { ...e.stub };
    }
    _render() {
      var h, y;
      if (!this._config || !this._hass || !this.isConnected) return;
      this.shadowRoot || this.attachShadow({ mode: "open" });
      const c = this.shadowRoot;
      if (this._style || (this._style = document.createElement("style"), c.appendChild(this._style)), this._style.textContent = iX(this._config.theme ?? "netwrth"), this._mount || (this._mount = document.createElement("div"), c.appendChild(this._mount), this._overlay = document.createElement("div"), this._overlay.className = "overlay", this._overlay.setAttribute("popover", "manual"), c.appendChild(this._overlay), this._root = nX.createRoot(this._mount)), this._config.allowed_user_id && ((h = this._hass.user) == null ? void 0 : h.id) !== this._config.allowed_user_id) {
        this._root.render(/* @__PURE__ */ R.jsx("div", { className: "card", children: /* @__PURE__ */ R.jsx("div", { className: "status", children: "This dashboard is private." }) }));
        return;
      }
      const f = e.component, d = this._hass;
      this._root.render(
        /* @__PURE__ */ R.jsx(VM.Provider, { value: this._overlay ?? null, children: /* @__PURE__ */ R.jsx(f, { hass: d, config: this._config }, `${(y = d.user) == null ? void 0 : y.id}:${JSON.stringify(this._config)}`) })
      );
    }
  }
  class n extends HTMLElement {
    constructor() {
      super(...arguments);
      rr(this, "_hass");
      rr(this, "_config");
      rr(this, "_entries");
    }
    set hass(c) {
      this._hass = c, this._entries || n$(c).then((f) => {
        this._entries = f.map((d) => ({ value: d.entry_id, label: d.title })), this._render();
      }).catch(() => {
        this._entries = [], this._render();
      }), this._render();
    }
    setConfig(c) {
      this._config = c, this._render();
    }
    _schema() {
      return e.schema.map(
        (c) => c.name === "entry" ? {
          ...c,
          selector: {
            select: { options: this._entries ?? [], mode: "dropdown" }
          }
        } : c
      );
    }
    _render() {
      if (!this._hass || !this._config) return;
      let c = this.querySelector("ha-form");
      c || (c = document.createElement("ha-form"), c.addEventListener("value-changed", (f) => {
        const d = { ...f.detail.value };
        this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: d },
            bubbles: !0,
            composed: !0
          })
        );
      }), this.appendChild(c)), c.hass = this._hass, c.data = this._config, c.schema = this._schema(), c.computeLabel = (f) => f.label ?? f.name;
    }
  }
  customElements.define(e.tag, t), customElements.define(`${e.tag}-editor`, n);
  const r = window;
  r.customCards = r.customCards || [], r.customCards.push({
    type: e.tag,
    name: e.name,
    description: e.description,
    preview: !1,
    documentationURL: "https://github.com/abhi1693/home-assistant"
  });
}
const wi = {
  name: "theme",
  label: "Theme",
  selector: {
    select: {
      mode: "dropdown",
      options: [
        { value: "netwrth", label: "netwrth (dark)" },
        { value: "ha", label: "Follow Home Assistant theme" }
      ]
    }
  }
}, Ai = {
  name: "background",
  label: "Card background effect",
  selector: {
    select: {
      mode: "dropdown",
      options: [
        { value: "plexus", label: "Plexus (default on the netwrth theme)" },
        { value: "mesh", label: "Mesh" },
        { value: "dots", label: "Dots" },
        { value: "contour", label: "Contour" },
        { value: "off", label: "Off (default when following the HA theme)" }
      ]
    }
  }
}, Ti = { name: "entry", label: "Firefly connection", selector: {} }, Ei = { name: "title", label: "Title", selector: { text: {} } }, k1 = {
  name: "view",
  label: "View",
  selector: {
    select: {
      mode: "dropdown",
      options: [
        { value: "daily", label: "Day-to-day (cash + credit)" },
        { value: "invest", label: "Investments" },
        { value: "all", label: "Everything" }
      ]
    }
  }
}, Ld = {
  name: "range",
  label: "Default range",
  selector: {
    select: {
      mode: "dropdown",
      options: ["1d", "1w", "1m", "3m", "6m", "1y", "all"].map((e) => ({ value: e, label: e }))
    }
  }
}, vN = {
  name: "show_mode_selector",
  label: "Show mode selector",
  selector: { boolean: {} }
}, Ud = {
  name: "show_range_selector",
  label: "Show range selector",
  selector: { boolean: {} }
}, yN = {
  name: "compact",
  label: "Short axis amounts (₹1.2L instead of ₹1,20,000)",
  selector: { boolean: {} }
};
Oi({
  tag: "family-finance-worth-card",
  name: "Finance worth chart",
  description: "Your total over time — the netwrth dashboard chart.",
  component: pN,
  schema: [
    Ei,
    Ti,
    k1,
    {
      name: "mode",
      label: "Chart mode",
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "total", label: "Total" },
            { value: "stacked", label: "What moved (stacked account changes)" },
            { value: "category", label: "Retirement vs taxable vs debt" },
            { value: "flow", label: "Net flow bars" }
          ]
        }
      }
    },
    Ld,
    vN,
    Ud,
    yN,
    wi,
    Ai
  ],
  stub: { view: "all", range: "6m" },
  size: 6
});
Oi({
  tag: "family-finance-flow-card",
  name: "Finance balance movement",
  description: "Money kept vs burned per day/week/month (day-to-day accounts).",
  component: pN,
  defaults: { view: "daily", mode: "flow" },
  schema: [
    Ei,
    Ti,
    Ld,
    vN,
    Ud,
    yN,
    wi,
    Ai
  ],
  stub: { range: "3m" },
  size: 6
});
Oi({
  tag: "family-finance-stat-card",
  name: "Finance total",
  description: "One big number with its change over a window.",
  component: O$,
  schema: [
    Ei,
    Ti,
    k1,
    Ld,
    Ud,
    {
      name: "show_composition",
      label: "Show composition bar (uncensored)",
      selector: { boolean: {} }
    },
    {
      name: "layout",
      label: "Layout",
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "card", label: "Card (number over the bar)" },
            { value: "banner", label: "Banner (one slim row, for a full-width strip)" }
          ]
        }
      }
    },
    wi,
    Ai
  ],
  stub: { view: "all", range: "1m" },
  size: 2
});
Oi({
  tag: "family-finance-accounts-card",
  name: "Finance accounts",
  description: "Accounts grouped by kind with balances and sync freshness.",
  component: u$,
  schema: [
    Ei,
    Ti,
    k1,
    Ld,
    Ud,
    {
      name: "accounts",
      label: "Only these accounts (name match, empty = all)",
      selector: { text: { multiple: !0 } }
    },
    wi,
    Ai
  ],
  stub: { view: "all", range: "1m" },
  size: 4
});
Oi({
  tag: "family-finance-spending-card",
  name: "Finance spending",
  description: "Where the month's money went: totals, share donut, and theme breakdown.",
  component: g$,
  schema: [
    Ei,
    Ti,
    {
      name: "show_stats",
      label: "Show Spent / Income / Recurring tiles",
      selector: { boolean: {} }
    },
    {
      name: "show_donut",
      label: "Show share-of-spending donut",
      selector: { boolean: {} }
    },
    wi,
    Ai
  ],
  stub: {},
  size: 6
});
Oi({
  tag: "family-finance-bills-card",
  name: "Finance recurring bills",
  description: "Calendar of the month's bills and income — charged, expected, and overdue.",
  component: h$,
  schema: [Ei, Ti, wi, Ai],
  stub: {},
  size: 5
});
Oi({
  tag: "family-finance-cardcycle-card",
  name: "Finance credit cards",
  description: "Per credit card: balance through the month with payment markers.",
  component: v$,
  schema: [Ei, Ti, wi, Ai],
  stub: {},
  size: 4
});
console.info("%c netwrth cards %c loaded", "background:#60a5fa;color:#0b0f17;border-radius:3px 0 0 3px;padding:1px 4px", "background:#17202f;color:#e6edf7;border-radius:0 3px 3px 0;padding:1px 4px");
