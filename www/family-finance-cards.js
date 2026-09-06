var z3 = Object.defineProperty;
var q3 = (e, t, n) => t in e ? z3(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ar = (e, t, n) => q3(e, typeof t != "symbol" ? t + "" : t, n);
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
var zs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nv = { exports: {} }, au = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var LO;
function k3() {
  if (LO) return au;
  LO = 1;
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
  return au.Fragment = t, au.jsx = n, au.jsxs = n, au;
}
var UO;
function B3() {
  return UO || (UO = 1, nv.exports = k3()), nv.exports;
}
var $ = B3(), rv = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var IO;
function L3() {
  if (IO) return Ae;
  IO = 1;
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
  function T(P, U, re) {
    this.props = P, this.context = U, this.refs = x, this.updater = re || _;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(P, U) {
    if (typeof P != "object" && typeof P != "function" && P != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, P, U, "setState");
  }, T.prototype.forceUpdate = function(P) {
    this.updater.enqueueForceUpdate(this, P, "forceUpdate");
  };
  function E() {
  }
  E.prototype = T.prototype;
  function C(P, U, re) {
    this.props = P, this.context = U, this.refs = x, this.updater = re || _;
  }
  var j = C.prototype = new E();
  j.constructor = C, S(j, T.prototype), j.isPureReactComponent = !0;
  var w = Array.isArray;
  function A() {
  }
  var M = { H: null, A: null, T: null, S: null }, N = Object.prototype.hasOwnProperty;
  function z(P, U, re) {
    var se = re.ref;
    return {
      $$typeof: e,
      type: P,
      key: U,
      ref: se !== void 0 ? se : null,
      props: re
    };
  }
  function I(P, U) {
    return z(P.type, U, P.props);
  }
  function B(P) {
    return typeof P == "object" && P !== null && P.$$typeof === e;
  }
  function k(P) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + P.replace(/[=:]/g, function(re) {
      return U[re];
    });
  }
  var V = /\/+/g;
  function Q(P, U) {
    return typeof P == "object" && P !== null && P.key != null ? k("" + P.key) : U.toString(36);
  }
  function K(P) {
    switch (P.status) {
      case "fulfilled":
        return P.value;
      case "rejected":
        throw P.reason;
      default:
        switch (typeof P.status == "string" ? P.then(A, A) : (P.status = "pending", P.then(
          function(U) {
            P.status === "pending" && (P.status = "fulfilled", P.value = U);
          },
          function(U) {
            P.status === "pending" && (P.status = "rejected", P.reason = U);
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
  function R(P, U, re, se, he) {
    var ye = typeof P;
    (ye === "undefined" || ye === "boolean") && (P = null);
    var de = !1;
    if (P === null) de = !0;
    else
      switch (ye) {
        case "bigint":
        case "string":
        case "number":
          de = !0;
          break;
        case "object":
          switch (P.$$typeof) {
            case e:
            case t:
              de = !0;
              break;
            case y:
              return de = P._init, R(
                de(P._payload),
                U,
                re,
                se,
                he
              );
          }
      }
    if (de)
      return he = he(P), de = se === "" ? "." + Q(P, 0) : se, w(he) ? (re = "", de != null && (re = de.replace(V, "$&/") + "/"), R(he, U, re, "", function(ge) {
        return ge;
      })) : he != null && (B(he) && (he = I(
        he,
        re + (he.key == null || P && P.key === he.key ? "" : ("" + he.key).replace(
          V,
          "$&/"
        ) + "/") + de
      )), U.push(he)), 1;
    de = 0;
    var Ce = se === "" ? "." : se + ":";
    if (w(P))
      for (var ce = 0; ce < P.length; ce++)
        se = P[ce], ye = Ce + Q(se, ce), de += R(
          se,
          U,
          re,
          ye,
          he
        );
    else if (ce = b(P), typeof ce == "function")
      for (P = ce.call(P), ce = 0; !(se = P.next()).done; )
        se = se.value, ye = Ce + Q(se, ce++), de += R(
          se,
          U,
          re,
          ye,
          he
        );
    else if (ye === "object") {
      if (typeof P.then == "function")
        return R(
          K(P),
          U,
          re,
          se,
          he
        );
      throw U = String(P), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(P).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return de;
  }
  function Y(P, U, re) {
    if (P == null) return P;
    var se = [], he = 0;
    return R(P, se, "", "", function(ye) {
      return U.call(re, ye, he++);
    }), se;
  }
  function J(P) {
    if (P._status === -1) {
      var U = P._result;
      U = U(), U.then(
        function(re) {
          (P._status === 0 || P._status === -1) && (P._status = 1, P._result = re);
        },
        function(re) {
          (P._status === 0 || P._status === -1) && (P._status = 2, P._result = re);
        }
      ), P._status === -1 && (P._status = 0, P._result = U);
    }
    if (P._status === 1) return P._result.default;
    throw P._result;
  }
  var G = typeof reportError == "function" ? reportError : function(P) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof P == "object" && P !== null && typeof P.message == "string" ? String(P.message) : String(P),
        error: P
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", P);
      return;
    }
    console.error(P);
  }, ee = {
    map: Y,
    forEach: function(P, U, re) {
      Y(
        P,
        function() {
          U.apply(this, arguments);
        },
        re
      );
    },
    count: function(P) {
      var U = 0;
      return Y(P, function() {
        U++;
      }), U;
    },
    toArray: function(P) {
      return Y(P, function(U) {
        return U;
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
  return Ae.Activity = v, Ae.Children = ee, Ae.Component = T, Ae.Fragment = n, Ae.Profiler = o, Ae.PureComponent = C, Ae.StrictMode = r, Ae.Suspense = d, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = M, Ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(P) {
      return M.H.useMemoCache(P);
    }
  }, Ae.cache = function(P) {
    return function() {
      return P.apply(null, arguments);
    };
  }, Ae.cacheSignal = function() {
    return null;
  }, Ae.cloneElement = function(P, U, re) {
    if (P == null)
      throw Error(
        "The argument must be a React element, but you passed " + P + "."
      );
    var se = S({}, P.props), he = P.key;
    if (U != null)
      for (ye in U.key !== void 0 && (he = "" + U.key), U)
        !N.call(U, ye) || ye === "key" || ye === "__self" || ye === "__source" || ye === "ref" && U.ref === void 0 || (se[ye] = U[ye]);
    var ye = arguments.length - 2;
    if (ye === 1) se.children = re;
    else if (1 < ye) {
      for (var de = Array(ye), Ce = 0; Ce < ye; Ce++)
        de[Ce] = arguments[Ce + 2];
      se.children = de;
    }
    return z(P.type, he, se);
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
  }, Ae.createElement = function(P, U, re) {
    var se, he = {}, ye = null;
    if (U != null)
      for (se in U.key !== void 0 && (ye = "" + U.key), U)
        N.call(U, se) && se !== "key" && se !== "__self" && se !== "__source" && (he[se] = U[se]);
    var de = arguments.length - 2;
    if (de === 1) he.children = re;
    else if (1 < de) {
      for (var Ce = Array(de), ce = 0; ce < de; ce++)
        Ce[ce] = arguments[ce + 2];
      he.children = Ce;
    }
    if (P && P.defaultProps)
      for (se in de = P.defaultProps, de)
        he[se] === void 0 && (he[se] = de[se]);
    return z(P, ye, he);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(P) {
    return { $$typeof: f, render: P };
  }, Ae.isValidElement = B, Ae.lazy = function(P) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: P },
      _init: J
    };
  }, Ae.memo = function(P, U) {
    return {
      $$typeof: h,
      type: P,
      compare: U === void 0 ? null : U
    };
  }, Ae.startTransition = function(P) {
    var U = M.T, re = {};
    M.T = re;
    try {
      var se = P(), he = M.S;
      he !== null && he(re, se), typeof se == "object" && se !== null && typeof se.then == "function" && se.then(A, G);
    } catch (ye) {
      G(ye);
    } finally {
      U !== null && re.types !== null && (U.types = re.types), M.T = U;
    }
  }, Ae.unstable_useCacheRefresh = function() {
    return M.H.useCacheRefresh();
  }, Ae.use = function(P) {
    return M.H.use(P);
  }, Ae.useActionState = function(P, U, re) {
    return M.H.useActionState(P, U, re);
  }, Ae.useCallback = function(P, U) {
    return M.H.useCallback(P, U);
  }, Ae.useContext = function(P) {
    return M.H.useContext(P);
  }, Ae.useDebugValue = function() {
  }, Ae.useDeferredValue = function(P, U) {
    return M.H.useDeferredValue(P, U);
  }, Ae.useEffect = function(P, U) {
    return M.H.useEffect(P, U);
  }, Ae.useEffectEvent = function(P) {
    return M.H.useEffectEvent(P);
  }, Ae.useId = function() {
    return M.H.useId();
  }, Ae.useImperativeHandle = function(P, U, re) {
    return M.H.useImperativeHandle(P, U, re);
  }, Ae.useInsertionEffect = function(P, U) {
    return M.H.useInsertionEffect(P, U);
  }, Ae.useLayoutEffect = function(P, U) {
    return M.H.useLayoutEffect(P, U);
  }, Ae.useMemo = function(P, U) {
    return M.H.useMemo(P, U);
  }, Ae.useOptimistic = function(P, U) {
    return M.H.useOptimistic(P, U);
  }, Ae.useReducer = function(P, U, re) {
    return M.H.useReducer(P, U, re);
  }, Ae.useRef = function(P) {
    return M.H.useRef(P);
  }, Ae.useState = function(P) {
    return M.H.useState(P);
  }, Ae.useSyncExternalStore = function(P, U, re) {
    return M.H.useSyncExternalStore(
      P,
      U,
      re
    );
  }, Ae.useTransition = function() {
    return M.H.useTransition();
  }, Ae.version = "19.2.8", Ae;
}
var HO;
function R0() {
  return HO || (HO = 1, rv.exports = L3()), rv.exports;
}
var te = R0();
const L = /* @__PURE__ */ tt(te), xo = (e, t) => {
  const n = Math.sin(e * 127.1 + t * 311.7) * 43758.5453;
  return n - Math.floor(n);
}, U3 = (e, t, n, r, o) => {
  e.clearRect(0, 0, t, n);
  const u = Math.min(60, Math.max(14, Math.round(t * n / 16e3))), c = Math.max(90, Math.min(t, n) * 0.34), f = [];
  for (let d = 0; d < u; d++) {
    const h = (xo(d, 3.1) - 0.5) * 0.016, y = (xo(d, 9.2) - 0.5) * 0.016;
    let v = (xo(d, 1.3) + h * r) % 1, g = (xo(d, 7.7) + y * r) % 1;
    v < 0 && (v += 1), g < 0 && (g += 1), f.push([v * t, g * n, 1.1 + xo(d, 5.5) * 1.4]);
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
      const v = xo(y * 31 + h, 4.2) * 6.28;
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
function tl({ effect: e }) {
  const t = te.useRef(null);
  return te.useEffect(() => {
    const n = t.current;
    if (!n || e === "off") return;
    const r = n.parentElement, o = n.getContext("2d");
    if (!r || !o) return;
    const u = Y3[e], [c, f, d] = K3(n), h = (A) => `rgba(${c},${f},${d},${A})`, y = window.matchMedia("(prefers-reduced-motion: reduce)").matches, v = Math.min(window.devicePixelRatio || 1, 2);
    let g = 0, b = 0, _ = 0, S = !0, x = 0;
    const T = (A) => {
      _ = 0, !(!S || g === 0) && (A - x >= X3 && (x = A, u(o, g, b, A / 1e3, h)), y || (_ = requestAnimationFrame(T)));
    }, E = () => {
      _ || (_ = requestAnimationFrame(T));
    }, C = () => {
      const A = r.getBoundingClientRect();
      g = Math.round(A.width), b = Math.round(A.height), n.width = g * v, n.height = b * v, o.setTransform(v, 0, 0, v, 0, 0), x = 0, E();
    }, j = new ResizeObserver(C);
    j.observe(r);
    const w = new IntersectionObserver((A) => {
      S = A.some((M) => M.isIntersecting), S && E();
    });
    return w.observe(r), C(), () => {
      j.disconnect(), w.disconnect(), _ && cancelAnimationFrame(_);
    };
  }, [e]), e === "off" ? null : /* @__PURE__ */ $.jsx("div", { className: "ambient", "aria-hidden": !0, children: /* @__PURE__ */ $.jsx("canvas", { ref: t }) });
}
const HM = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}), V3 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
}), $0 = "•••••";
function lr(e, t = !1) {
  return (t ? V3 : HM).format(e);
}
const F3 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1
});
function GM(e) {
  return F3.format(e);
}
function cb(e) {
  return `${e >= 0 ? "+" : ""}${HM.format(e)}`;
}
function Eu(e) {
  return isFinite(e) ? `${e >= 0 ? "+" : ""}${(e * 100).toFixed(1)}%` : "–";
}
function ti(e, t = !1) {
  return new Date(e).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    ...t ? { hour: "numeric", minute: "2-digit" } : {}
  });
}
const z0 = ["1d", "1w", "1m", "3m", "6m", "1y", "all"], jo = [
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
var av = { exports: {} }, Ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GO;
function W3() {
  if (GO) return Ut;
  GO = 1;
  var e = R0();
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
var YO;
function YM() {
  if (YO) return av.exports;
  YO = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), av.exports = W3(), av.exports;
}
var Z3 = YM();
function Q3(e, t) {
  return e.connection.sendMessagePromise({
    type: "family_finance/overview",
    ...t ? { entry_id: t } : {}
  });
}
function KM(e, t, n, r) {
  return e.connection.sendMessagePromise({
    type: "family_finance/series",
    range: n,
    ...r ? { month: r } : {},
    ...t ? { entry_id: t } : {}
  });
}
function J3(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_summary",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function XM(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_recurring",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function VM(e, t, n, r) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_transactions",
    ...n ? { month: n } : {},
    ...r ? { theme: r } : {},
    ...t ? { entry_id: t } : {}
  });
}
function e$(e) {
  return e.connection.sendMessagePromise({ type: "family_finance/entries" });
}
const FM = te.createContext(null);
function t$({ children: e }) {
  const t = te.useContext(FM);
  return te.useEffect(() => {
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
  }, [t]), t ? Z3.createPortal(e, t) : /* @__PURE__ */ $.jsx($.Fragment, { children: e });
}
function nl(e) {
  return e.background ? e.background : e.theme === "ha" ? "off" : "plexus";
}
const n$ = 6e4;
function WM() {
  const e = te.useRef(null), [t, n] = te.useState(820);
  return te.useEffect(() => {
    if (!e.current) return;
    const r = new ResizeObserver(([o]) => {
      o.contentRect.width > 0 && n(Math.max(280, o.contentRect.width));
    });
    return r.observe(e.current), () => r.disconnect();
  }, []), { ref: e, width: t };
}
function rd(e, t, n) {
  var g;
  const [r, o] = te.useState(null), [u, c] = te.useState(null), [f, d] = te.useState(null), [h, y] = te.useState(0), v = te.useCallback(() => y((b) => b + 1), []);
  return te.useEffect(() => {
    let b = !0;
    Promise.all([Q3(e, t), n(e, t)]).then(([x, T]) => {
      if (b) {
        if (x.currency !== "INR") throw new Error("Finance requires INR data");
        o(x), c(T.data), d(null);
      }
    }).catch((x) => {
      b && (c(null), o(null), d((x == null ? void 0 : x.message) ?? "Unable to load finance data"));
    });
    const _ = setInterval(v, n$), S = () => {
      document.visibilityState === "visible" && v();
    };
    return document.addEventListener("visibilitychange", S), () => {
      b = !1, clearInterval(_), document.removeEventListener("visibilitychange", S);
    };
  }, [e.connection, (g = e.user) == null ? void 0 : g.id, t, n, h, v]), { overview: r, data: u, masked: !1, error: f, refresh: v };
}
function q0(e, t, n) {
  const r = te.useCallback(
    (h, y) => KM(h, y, n).then((v) => ({ data: v.series, censored: v.censored })),
    [n]
  ), { overview: o, data: u, masked: c, error: f, refresh: d } = rd(
    e,
    t,
    r
  );
  return { overview: o, series: u, masked: c, error: f, refresh: d };
}
function tf({
  options: e,
  value: t,
  onChange: n
}) {
  return /* @__PURE__ */ $.jsx("span", { className: "seg", children: e.map((r) => /* @__PURE__ */ $.jsx("button", { className: r === t ? "active" : "", onClick: () => n(r), children: r }, r)) });
}
function ad(e) {
  return te.useMemo(
    () => e ? e.accounts.filter((t) => !t.hidden) : [],
    [e]
  );
}
const r$ = ["cash", "investment", "credit", "loan", "other"], KO = [
  ["#3b82f6", "#2563eb"],
  ["#10b981", "#059669"],
  ["#8b5cf6", "#6366f1"],
  ["#f59e0b", "#d97706"],
  ["#ec4899", "#db2777"],
  ["#06b6d4", "#0891b2"]
];
function a$(e) {
  const t = e.org_name || e.org_domain || e.provider || "?";
  let n = 0;
  for (let u = 0; u < t.length; u++) n = n * 31 + t.charCodeAt(u) | 0;
  const [r, o] = KO[Math.abs(n) % KO.length];
  return { letter: t.trim().charAt(0).toUpperCase() || "?", g1: r, g2: o };
}
function i$(e, t) {
  if (e.balance == null) return "–";
  const n = parseFloat(e.balance);
  return t ? `${n.toFixed(1)}%` : lr(n, !0);
}
function o$({
  hass: e,
  config: t
}) {
  const n = jo.find((_) => _.key === (t.view ?? "all")) ?? jo[2], [r, o] = te.useState(t.range ?? "1m"), { overview: u, series: c, masked: f, error: d } = q0(e, t.entry, r), h = ad(u), y = t.accounts, v = te.useMemo(() => {
    let _ = h.filter(n.pick);
    if (y && y.length > 0) {
      const S = y.map((x) => x.trim().toLowerCase()).filter(Boolean);
      _ = _.filter(
        (x) => S.some(
          (T) => (x.nickname ?? "").toLowerCase().includes(T) || x.name.toLowerCase().includes(T)
        )
      );
    }
    return _;
  }, [h, n, y]), g = te.useMemo(() => {
    const _ = /* @__PURE__ */ new Map();
    if (!c) return _;
    for (const S of c) {
      if (S.points.length < 2) continue;
      const x = [...S.points].sort(
        (C, j) => new Date(C.ts).getTime() - new Date(j.ts).getTime()
      ), T = parseFloat(x[0].balance), E = parseFloat(x[x.length - 1].balance);
      T !== 0 && _.set(S.account_id, (E - T) / Math.abs(T));
    }
    return _;
  }, [c]), b = te.useMemo(
    () => r$.map((_) => ({
      kind: _,
      accounts: v.filter((S) => S.kind === _)
    })).filter((_) => _.accounts.length > 0),
    [v]
  );
  return /* @__PURE__ */ $.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Accounts" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: t.show_controls !== !1 && t.show_range_selector !== !1 && /* @__PURE__ */ $.jsx("span", { className: "controls", children: /* @__PURE__ */ $.jsx(tf, { options: z0, value: r, onChange: o }) }) })
    ] }),
    d && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: d }),
    !d && !u && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !d && u && b.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No accounts." }),
    !d && u && b.length > 0 && /* @__PURE__ */ $.jsx("table", { children: /* @__PURE__ */ $.jsx("tbody", { children: b.map((_) => /* @__PURE__ */ $.jsx(
      l$,
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
function l$({
  kind: e,
  accounts: t,
  masked: n,
  deltas: r
}) {
  return /* @__PURE__ */ $.jsxs($.Fragment, { children: [
    /* @__PURE__ */ $.jsx("tr", { className: "kind-row", children: /* @__PURE__ */ $.jsx("td", { colSpan: 3, children: e }) }),
    t.map((o) => {
      const u = r.get(o.id), c = a$(o);
      return /* @__PURE__ */ $.jsxs("tr", { children: [
        /* @__PURE__ */ $.jsxs("td", { className: "name-cell", children: [
          /* @__PURE__ */ $.jsx(
            "span",
            {
              className: "mono",
              style: { "--mono-a": c.g1, "--mono-b": c.g2 },
              children: c.letter
            }
          ),
          /* @__PURE__ */ $.jsxs("span", { className: "name-text", children: [
            /* @__PURE__ */ $.jsx("span", { children: o.nickname || o.name }),
            /* @__PURE__ */ $.jsx("span", { className: "muted", children: o.org_name || o.org_domain })
          ] })
        ] }),
        /* @__PURE__ */ $.jsx("td", { className: "num", children: i$(o, n) }),
        /* @__PURE__ */ $.jsx("td", { className: `num row-delta ${u == null ? "muted" : u >= 0 ? "up" : "down"}`, children: u == null ? "–" : Eu(u) })
      ] }, o.id);
    })
  ] });
}
const u$ = {
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
}, ju = (e) => u$[e.toLowerCase()] ?? ["#60a5fa", "#34d399", "#a78bfa", "#f472b6", "#fbbf24", "#22d3ee"][Array.from(e).reduce((t, n) => t * 31 + n.charCodeAt(0) >>> 0, 0) % 6], c$ = {
  weekly: 52 / 12,
  biweekly: 26 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  annual: 1 / 12
};
function Ht(e, t) {
  return t ? $0 : lr(e, Math.abs(e) < 100);
}
function Mu() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit" }).format(/* @__PURE__ */ new Date()).slice(0, 7);
}
function XO(e, t) {
  const [n, r] = e.split("-").map(Number);
  return new Date(Date.UTC(n, r - 1 + t, 1)).toISOString().slice(0, 7);
}
function s$(e) {
  const [t, n] = e.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}
function k0({
  month: e,
  onChange: t
}) {
  return /* @__PURE__ */ $.jsxs("span", { className: "seg", children: [
    /* @__PURE__ */ $.jsx("button", { "aria-label": "Previous month", onClick: () => t(XO(e, -1)), children: "‹" }),
    /* @__PURE__ */ $.jsx("button", { className: "active spend-month-label", children: s$(e) }),
    /* @__PURE__ */ $.jsx("button", { "aria-label": "Next month", onClick: () => t(XO(e, 1)), disabled: e >= Mu(), children: "›" })
  ] });
}
const ir = 310, kt = { top: 88, right: 16, bottom: 28, left: 16 }, VO = 24, $r = 26, iv = /* @__PURE__ */ new Set(["weekly", "biweekly", "monthly", "quarterly", "annual"]), FO = {
  actual: "charged",
  expected: "expected around this day",
  overdue: "expected but not seen yet"
};
function iu(e) {
  return new Date(e).getUTCDate();
}
function f$({
  hass: e,
  config: t
}) {
  const { ref: n, width: r } = WM(), [o, u] = te.useState(Mu()), [c, f] = te.useState(null), [d, h] = te.useState(/* @__PURE__ */ new Set()), y = te.useCallback(
    (G, ee) => XM(G, ee, o).then((P) => ({ data: P, censored: P.censored })),
    [o]
  ), { data: v, masked: g, error: b } = rd(
    e,
    t.entry,
    y
  ), _ = (v == null ? void 0 : v.streams) ?? [], S = (v == null ? void 0 : v.expected) ?? [], x = (v == null ? void 0 : v.actuals) ?? [], T = (v == null ? void 0 : v.today) ?? "", E = g, C = te.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const ee of _) G.set(`${ee.merchant_key}|${ee.is_income}`, ee);
    return G;
  }, [_]), j = te.useMemo(() => {
    var ee;
    const G = [];
    for (const P of x) {
      const U = C.get(`${P.merchant_key}|false`);
      P.is_income || !U || !iv.has(U.frequency) || G.push({
        id: `a-${P.merchant_key}-${P.date}`,
        merchantKey: P.merchant_key,
        name: U.merchant ?? P.merchant_key,
        logo: U.logo_url,
        day: iu(P.date),
        amount: parseFloat(P.amount),
        state: "actual",
        frequency: U.frequency,
        theme: U.theme
      });
    }
    for (const P of S)
      P.is_income || !iv.has(P.frequency) || G.push({
        id: `e-${P.merchant_key}-${P.date}`,
        merchantKey: P.merchant_key,
        name: P.merchant || P.merchant_key,
        logo: P.logo_url ?? null,
        day: iu(P.date),
        amount: P.amount,
        state: P.overdue ? "overdue" : "expected",
        frequency: P.frequency,
        theme: ((ee = C.get(`${P.merchant_key}|false`)) == null ? void 0 : ee.theme) ?? null
      });
    return G;
  }, [x, S, C]), w = te.useMemo(() => {
    const G = [];
    for (const ee of x) {
      if (!ee.is_income) continue;
      const P = C.get(`${ee.merchant_key}|true`);
      G.push({
        id: `ia-${ee.merchant_key}-${ee.date}`,
        merchantKey: ee.merchant_key,
        name: (P == null ? void 0 : P.merchant) ?? ee.merchant_key,
        logo: null,
        day: iu(ee.date),
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
        day: iu(ee.date),
        amount: ee.amount,
        state: ee.overdue ? "overdue" : "expected",
        frequency: ee.frequency,
        theme: null
      });
    return G.sort((ee, P) => ee.day - P.day);
  }, [x, S, C]), A = te.useMemo(
    () => _.filter(
      (G) => !G.is_income && (G.active && !iv.has(G.frequency) || !G.active && G.theme === "subscriptions")
    ),
    [_]
  ), M = T ? iu(T) : 0, N = j.map((G) => G.amount).filter((G) => G > 0), z = Math.max(1e-9, ...N), I = Math.min(z, ...N), B = r - kt.left - kt.right, k = ir - kt.top - kt.bottom, V = (G) => kt.left + (G - 1) / 30 * B, Q = Math.log(z) - Math.log(I), K = (G) => {
    const ee = Q < 1e-6 ? 0.6 : (Math.log(Math.max(G, I)) - Math.log(I)) / Q;
    return ir - kt.bottom - (0.15 + 0.85 * ee) * k;
  }, R = te.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const P of j) G.set(P.day, [...G.get(P.day) ?? [], P]);
    const ee = /* @__PURE__ */ new Map();
    for (const P of G.values())
      P.forEach((U, re) => ee.set(U.id, (re - (P.length - 1) / 2) * ($r + 6)));
    return ee;
  }, [j]), Y = (G) => {
    const ee = ju(G.theme ?? "other");
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
  }, J = j.length === 0 && w.length === 0 && A.length === 0;
  return /* @__PURE__ */ $.jsxs("div", { className: "card", ref: n, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Recurring bills" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: /* @__PURE__ */ $.jsx(k0, { month: o, onChange: u }) })
    ] }),
    b && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: b }),
    !b && !v && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !b && v && J && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No recurring activity this month." }),
    !b && v && !J && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
      (j.length > 0 || w.length > 0) && /* @__PURE__ */ $.jsxs(
        "svg",
        {
          viewBox: `0 0 ${r} ${ir}`,
          className: "spend-cal-svg",
          role: "img",
          "aria-label": "Recurring bills and income by day of month",
          children: [
            [1, 8, 15, 22, 29].map((G) => /* @__PURE__ */ $.jsxs("g", { children: [
              /* @__PURE__ */ $.jsx(
                "line",
                {
                  x1: V(G),
                  y1: kt.top - 8,
                  x2: V(G),
                  y2: ir - kt.bottom,
                  stroke: "var(--nb-border)",
                  strokeWidth: "1",
                  opacity: "0.45"
                }
              ),
              /* @__PURE__ */ $.jsx("text", { x: V(G), y: ir - 8, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "12", children: G })
            ] }, G)),
            /* @__PURE__ */ $.jsx(
              "line",
              {
                x1: kt.left,
                y1: ir - kt.bottom,
                x2: r - kt.right,
                y2: ir - kt.bottom,
                stroke: "var(--nb-border)",
                strokeWidth: "1"
              }
            ),
            M > 0 && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
              /* @__PURE__ */ $.jsx(
                "line",
                {
                  x1: V(M),
                  y1: 16,
                  x2: V(M),
                  y2: ir - kt.bottom,
                  stroke: "var(--nb-accent)",
                  strokeWidth: "1.5",
                  opacity: "0.75"
                }
              ),
              /* @__PURE__ */ $.jsx("text", { x: V(M), y: 12, textAnchor: "middle", fill: "var(--nb-accent)", fontSize: "11", children: "today" })
            ] }),
            j.map((G) => {
              var ye;
              const ee = Y(G), P = V(G.day) + (R.get(G.id) ?? 0), U = K(G.amount), re = P < kt.left + 34 ? "start" : P > r - kt.right - 34 ? "end" : "middle", se = c === G.id, he = `clip-${G.id.replace(/\W+/g, "-")}`;
              return /* @__PURE__ */ $.jsxs(
                "g",
                {
                  onMouseEnter: () => f(G.id),
                  onMouseLeave: () => f(null),
                  opacity: c === null || se ? 1 : 0.35,
                  className: "spend-cal-mark",
                  children: [
                    /* @__PURE__ */ $.jsx(
                      "line",
                      {
                        x1: P,
                        y1: ir - kt.bottom,
                        x2: P,
                        y2: U + $r / 2 + 2,
                        stroke: ee.stem,
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        opacity: ee.stemOpacity
                      }
                    ),
                    /* @__PURE__ */ $.jsx("circle", { cx: P, cy: U, r: $r / 2 + 2, fill: ee.chipFill, stroke: ee.ring, strokeWidth: "2" }),
                    G.logo && !d.has(G.merchantKey) ? /* @__PURE__ */ $.jsxs($.Fragment, { children: [
                      /* @__PURE__ */ $.jsx("clipPath", { id: he, children: /* @__PURE__ */ $.jsx("circle", { cx: P, cy: U, r: $r / 2 }) }),
                      /* @__PURE__ */ $.jsx(
                        "image",
                        {
                          href: G.logo,
                          x: P - $r / 2,
                          y: U - $r / 2,
                          width: $r,
                          height: $r,
                          clipPath: `url(#${he})`,
                          onError: () => h((de) => new Set(de).add(G.merchantKey))
                        }
                      )
                    ] }) : /* @__PURE__ */ $.jsx(
                      "text",
                      {
                        x: P,
                        y: U + 5,
                        textAnchor: "middle",
                        fill: ee.initialInk,
                        fontSize: "14",
                        fontWeight: "600",
                        children: G.name.charAt(0).toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ $.jsxs("text", { x: P, y: U - $r / 2 - 6, textAnchor: re, fill: "var(--nb-text)", fontSize: "12", children: [
                      G.state === "expected" ? "~" : "",
                      Ht(G.amount, E)
                    ] }),
                    se && /* @__PURE__ */ $.jsx(
                      "text",
                      {
                        x: P,
                        y: ir - kt.bottom + 16,
                        textAnchor: re,
                        fill: "var(--nb-text)",
                        fontSize: "12",
                        fontWeight: "600",
                        children: G.name
                      }
                    ),
                    /* @__PURE__ */ $.jsx("title", { children: `${G.name} — ${FO[G.state]}, day ${G.day}${`: ${G.state === "actual" ? "" : "~"}${Ht(G.amount, E)}`} (${((ye = C.get(`${G.merchantKey}|false`)) == null ? void 0 : ye.frequency_label) ?? G.frequency})` })
                  ]
                },
                G.id
              );
            }),
            w.map((G) => {
              const ee = V(G.day), P = G.state === "actual" ? 1 : G.state === "expected" ? 0.6 : 0.45;
              return /* @__PURE__ */ $.jsxs("g", { opacity: P, children: [
                /* @__PURE__ */ $.jsx(
                  "circle",
                  {
                    cx: ee,
                    cy: VO,
                    r: 7,
                    fill: G.state === "actual" ? "var(--nb-green)" : "var(--nb-bg)",
                    stroke: "var(--nb-green)",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ $.jsx("text", { x: ee, y: VO + 18, textAnchor: "middle", fill: "var(--nb-green)", fontSize: "10", children: Ht(G.amount, E) }),
                /* @__PURE__ */ $.jsx("title", { children: `${G.name} — income, ${FO[G.state]} (day ${G.day})${`: ${Ht(G.amount, E)}`}` })
              ] }, G.id);
            })
          ]
        }
      ),
      A.length > 0 && /* @__PURE__ */ $.jsx("div", { className: "spend-strip", children: A.map((G) => /* @__PURE__ */ $.jsxs(
        "span",
        {
          className: `spend-strip-item ${G.active ? "" : "lapsed"}`,
          title: G.active ? `${G.frequency_label ?? G.frequency}, last on ${G.last_seen.slice(0, 10)}` : `looks cancelled — last charged ${G.last_seen.slice(0, 10)}`,
          children: [
            G.merchant ?? G.merchant_key,
            /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
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
const or = 200, it = { top: 26, right: 16, bottom: 24, left: 56 };
function d$(e) {
  const [t, n] = e.split("-").map(Number);
  return {
    from: new Date(Date.UTC(t, n - 1, 1)),
    to: new Date(Date.UTC(t, n, 1))
  };
}
function h$({
  hass: e,
  config: t
}) {
  const { ref: n, width: r } = WM(), [o, u] = te.useState(Mu()), [c, f] = te.useState(null), d = te.useRef(null), [h, y] = te.useState(null), v = (K) => y(K), g = te.useCallback(
    (K, R) => Promise.all([KM(K, R, "6m", o), VM(K, R, o)]).then(
      ([Y, J]) => ({
        data: { series: Y.series, txns: J.transactions },
        censored: J.censored
      })
    ),
    [o]
  ), { overview: b, data: _, masked: S, error: x } = rd(
    e,
    t.entry,
    g
  ), T = ad(b), E = te.useMemo(
    () => T.filter((K) => K.kind === "credit"),
    [T]
  ), C = (_ == null ? void 0 : _.series) ?? [], j = (_ == null ? void 0 : _.txns) ?? [], w = S, { from: A, to: M } = d$(o), z = te.useMemo(() => E.map((K) => {
    var ye;
    const R = (((ye = C.find((de) => de.account_id === K.id)) == null ? void 0 : ye.points) ?? []).map((de) => ({ ts: new Date(de.ts), debt: Math.max(0, -parseFloat(de.balance)) })).filter((de) => !isNaN(de.debt)).sort((de, Ce) => de.ts.getTime() - Ce.ts.getTime()), Y = R.filter((de) => de.ts < A), J = R.filter((de) => de.ts >= A && de.ts < M), G = R.filter((de) => de.ts >= M), ee = j.filter((de) => de.account_id === K.id && !de.pending).map((de) => ({ ...de, v: parseFloat(de.amount), date: new Date(de.posted_at) })).sort((de, Ce) => de.date.getTime() - Ce.date.getTime());
    let P = 0, U = 0;
    const re = [];
    for (const de of ee)
      de.v > 0 && de.transaction_type === "withdrawal" ? P += de.v : de.v < 0 && de.transaction_type === "transfer" && (U += -de.v, re.push({ date: de.date, amount: -de.v }));
    const se = [...Y.length ? [{ ...Y[Y.length - 1], ts: A }] : [], ...J];
    let he = [];
    if (Y.length === 0 && (J.length > 0 || G.length > 0)) {
      const de = J.length > 0 ? J[0].ts : M, Ce = J.length > 0 ? J[0].debt : G[0].debt;
      let ce = Ce;
      const ge = [];
      for (const xe of [...ee].reverse())
        xe.date >= de || xe.date < A || (ce = Math.max(0, ce - xe.v), ge.unshift({ ts: xe.date, debt: ce }));
      he = [{ ts: A, debt: ge.length ? ge[0].debt : ce }, ...ge], J.length > 0 && he.push({ ts: de, debt: Ce });
    }
    return { card: K, line: se, recon: he, spent: P, paid: U, payments: re };
  }), [E, C, j, A, M]).filter(
    (K) => K.line.length > 0 || K.recon.length > 0 || K.spent > 0 || K.paid > 0
  ), I = z.find((K) => K.card.id === h) ?? z[0], B = I ? [I] : [], k = Math.round((M.getTime() - A.getTime()) / 864e5), V = (K) => it.left + Math.min(Math.max((K.getTime() - A.getTime()) / 864e5, 0), k) / k * (r - it.left - it.right), Q = (K, R) => {
    let Y = null;
    for (const J of K)
      if (J.ts.getTime() <= R) Y = J.debt;
      else break;
    return Y;
  };
  return /* @__PURE__ */ $.jsxs("div", { className: "card", ref: n, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Card credit" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: /* @__PURE__ */ $.jsx(k0, { month: o, onChange: u }) })
    ] }),
    x && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: x }),
    !x && !_ && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !x && _ && z.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No credit-card activity this month." }),
    !x && _ && z.length > 1 && /* @__PURE__ */ $.jsx("div", { className: "spend-card-chips", children: z.map(({ card: K }) => /* @__PURE__ */ $.jsx(
      "button",
      {
        className: `spend-card-chip ${I && K.id === I.card.id ? "on" : ""}`,
        title: "Show this card",
        onClick: () => v(K.id),
        children: K.nickname ?? K.name
      },
      K.id
    )) }),
    !x && _ && B.map(({ card: K, line: R, recon: Y, spent: J, paid: G, payments: ee }) => {
      const P = Math.max(
        1,
        ...R.map((ae) => ae.debt),
        ...Y.map((ae) => ae.debt),
        ...ee.map((ae) => ae.amount)
      ), U = (ae) => or - it.bottom - ae / P * (or - it.top - it.bottom), re = /* @__PURE__ */ new Date(), se = re >= A && re < M ? V(re) : null, he = se ?? r - it.right, ye = (ae, De) => {
        let Oe = "";
        return ae.forEach((ke, Qe) => {
          Oe += Qe === 0 ? `M${V(ke.ts)},${U(ke.debt)}` : `H${V(ke.ts)}V${U(ke.debt)}`;
        }), Oe && De && (Oe += `H${he}`), Oe;
      }, de = ye(Y, R.length === 0), Ce = ye(R, !0), ce = [...Y, ...R].sort((ae, De) => ae.ts.getTime() - De.ts.getTime()), ge = ce.length ? `${ye(ce, !0)} V${or - it.bottom} H${V(ce[0].ts)} Z` : "", xe = K.nickname ?? K.name;
      return /* @__PURE__ */ $.jsxs("div", { className: "spend-card-row", children: [
        /* @__PURE__ */ $.jsxs("div", { className: "spend-card-head", children: [
          /* @__PURE__ */ $.jsx("span", { children: xe }),
          /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
            "spent ",
            Ht(J, w),
            " · paid ",
            Ht(G, w),
            (R.length > 0 || Y.length > 0) && ` · owing ${Ht((R[R.length - 1] ?? Y[Y.length - 1]).debt, w)}`
          ] })
        ] }),
        /* @__PURE__ */ $.jsxs(
          "svg",
          {
            viewBox: `0 0 ${r} ${or}`,
            className: "spend-cal-svg",
            role: "img",
            "aria-label": `${xe} balance through the month`,
            onMouseLeave: () => {
              d.current && clearTimeout(d.current), d.current = setTimeout(() => f(null), 80);
            },
            onMouseMove: (ae) => {
              d.current && clearTimeout(d.current);
              const De = ae.currentTarget.getBoundingClientRect(), Oe = De.width / r, ke = (ae.clientX - De.left) / Oe, Qe = (ae.clientY - De.top) / Oe;
              if (ke < it.left || ke > r - it.right) {
                f(null);
                return;
              }
              const ct = A.getTime() + (ke - it.left) / (r - it.left - it.right) * k * 864e5;
              if (se !== null && ct > re.getTime()) {
                f(null);
                return;
              }
              const on = new Date(ct).getUTCDate(), _n = U, On = ee.find(
                (In) => Math.abs(V(In.date) - ke) < 12 && Math.abs(_n(In.amount) - Qe) < 14
              );
              let Kt, ln;
              if (On)
                Kt = [
                  { label: "day", value: String(On.date.getUTCDate()) },
                  { label: "payment", value: `-${Ht(On.amount, w)}` }
                ], ln = "a payment landed on the card";
              else {
                const In = R.length > 0 && ct >= R[0].ts.getTime(), _t = Q(In ? R : Y, ct);
                if (_t === null) {
                  f(null);
                  return;
                }
                Kt = [
                  { label: "day", value: String(on) },
                  { label: "owing", value: Ht(_t, w) }
                ], ln = In ? "balance reported by the card" : "estimated from transactions — before the first report we have";
              }
              f({ left: ae.clientX + 14, top: ae.clientY - 12, title: xe, rows: Kt, note: ln });
            },
            children: [
              /* @__PURE__ */ $.jsx("defs", { children: /* @__PURE__ */ $.jsxs("linearGradient", { id: `ccfill-${K.id}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ $.jsx("stop", { offset: "0", stopColor: "var(--nb-ink)", stopOpacity: "0.26" }),
                /* @__PURE__ */ $.jsx("stop", { offset: "1", stopColor: "var(--nb-ink)", stopOpacity: "0" })
              ] }) }),
              [1, 8, 15, 22, 29].map((ae) => {
                const De = V(new Date(A.getTime() + (ae - 1) * 864e5));
                return /* @__PURE__ */ $.jsxs("g", { children: [
                  /* @__PURE__ */ $.jsx(
                    "line",
                    {
                      x1: De,
                      y1: it.top,
                      x2: De,
                      y2: or - it.bottom,
                      stroke: "var(--nb-border)",
                      strokeWidth: "1",
                      opacity: "0.45"
                    }
                  ),
                  /* @__PURE__ */ $.jsx("text", { x: De, y: or - 6, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "11", children: ae })
                ] }, ae);
              }),
              /* @__PURE__ */ $.jsx(
                "line",
                {
                  x1: it.left,
                  y1: or - it.bottom,
                  x2: r - it.right,
                  y2: or - it.bottom,
                  stroke: "var(--nb-border)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ $.jsx("text", { x: it.left - 6, y: it.top + 4, textAnchor: "end", fill: "var(--nb-muted)", fontSize: "11", children: Ht(P, w) }),
              ge && /* @__PURE__ */ $.jsx("path", { d: ge, fill: `url(#ccfill-${K.id})` }),
              de && /* @__PURE__ */ $.jsx(
                "path",
                {
                  d: de,
                  fill: "none",
                  stroke: "var(--nb-ink)",
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  opacity: "0.45"
                }
              ),
              Ce && /* @__PURE__ */ $.jsx(
                "path",
                {
                  d: Ce,
                  fill: "none",
                  stroke: "var(--nb-ink)",
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  opacity: "0.95"
                }
              ),
              se !== null && /* @__PURE__ */ $.jsxs("g", { children: [
                /* @__PURE__ */ $.jsx(
                  "line",
                  {
                    x1: se,
                    y1: it.top - 6,
                    x2: se,
                    y2: or - it.bottom,
                    stroke: "var(--nb-accent)",
                    strokeWidth: "1.5",
                    opacity: "0.8"
                  }
                ),
                /* @__PURE__ */ $.jsx(
                  "text",
                  {
                    x: se,
                    y: it.top - 10,
                    textAnchor: "middle",
                    fill: "var(--nb-accent)",
                    fontSize: "11",
                    children: "today"
                  }
                )
              ] }),
              ee.map((ae, De) => /* @__PURE__ */ $.jsxs("g", { children: [
                /* @__PURE__ */ $.jsx(
                  "line",
                  {
                    x1: V(ae.date),
                    y1: U(ae.amount),
                    x2: V(ae.date),
                    y2: or - it.bottom,
                    stroke: "var(--nb-green)",
                    strokeWidth: "2",
                    opacity: "0.55"
                  }
                ),
                /* @__PURE__ */ $.jsx(
                  "circle",
                  {
                    cx: V(ae.date),
                    cy: U(ae.amount),
                    r: 4.5,
                    fill: "var(--nb-bg)",
                    stroke: "var(--nb-green)",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ $.jsxs(
                  "text",
                  {
                    x: V(ae.date),
                    y: U(ae.amount) - 10,
                    textAnchor: "middle",
                    fill: "var(--nb-green)",
                    fontSize: "11",
                    children: [
                      "-",
                      Ht(ae.amount, w)
                    ]
                  }
                ),
                /* @__PURE__ */ $.jsx("title", { children: `payment ${ae.date.toISOString().slice(0, 10)}${`: ${Ht(ae.amount, w)}`}` })
              ] }, De))
            ]
          }
        )
      ] }, K.id);
    }),
    c && /* @__PURE__ */ $.jsx(t$, { children: /* @__PURE__ */ $.jsxs(
      "div",
      {
        className: "spend-hoverbubble",
        style: {
          left: Math.min(c.left, window.innerWidth - 240),
          top: c.top
        },
        children: [
          /* @__PURE__ */ $.jsx("div", { className: "spend-bubble-title", children: c.title }),
          /* @__PURE__ */ $.jsx("div", { className: "spend-bubble-rows", children: c.rows.map((K) => /* @__PURE__ */ $.jsxs("div", { className: "spend-bubble-row", children: [
            /* @__PURE__ */ $.jsx("span", { className: "muted", children: K.label }),
            /* @__PURE__ */ $.jsx("span", { children: K.value })
          ] }, K.label)) }),
          /* @__PURE__ */ $.jsx("div", { className: "muted spend-hoverbubble-note", children: c.note })
        ]
      }
    ) })
  ] });
}
function p$({ tx: e }) {
  const [t, n] = te.useState(!1), r = e.merchant ?? e.merchant_key;
  return e.logo_url && !t ? /* @__PURE__ */ $.jsx(
    "img",
    {
      className: "spend-txn-logo",
      src: e.logo_url,
      alt: "",
      onError: () => n(!0)
    }
  ) : /* @__PURE__ */ $.jsx(
    "span",
    {
      className: "spend-txn-logo spend-txn-initial",
      style: { borderColor: ju(e.theme ?? "other") },
      children: (r.charAt(0) || "?").toUpperCase()
    }
  );
}
function v$({
  rows: e,
  totalSpend: t,
  censored: n
}) {
  const r = e.reduce((g, b) => g + parseFloat(b.total), 0);
  if (r <= 0) return null;
  const o = 5, u = e.slice(0, o).map((g) => ({ theme: g.theme, value: parseFloat(g.total), color: ju(g.theme) })), c = e.slice(o).reduce((g, b) => g + parseFloat(b.total), 0);
  c > 0 && u.push({ theme: "everything else", value: c, color: "#8b9bb4" });
  const f = 80, d = 50, h = 90;
  let y = -Math.PI / 2;
  const v = u.map((g) => {
    const b = g.value / r * Math.PI * 2, _ = y, S = y + b;
    y = S;
    const x = b > Math.PI ? 1 : 0, T = (j, w) => `${h + j * Math.cos(w)},${h + j * Math.sin(w)}`, E = `M${T(f, _)} A${f},${f} 0 ${x} 1 ${T(f, S)} L${T(d, S)} A${d},${d} 0 ${x} 0 ${T(d, _)} Z`, C = (_ + S) / 2;
    return { ...g, d: E, mid: C, share: g.value / r };
  });
  return /* @__PURE__ */ $.jsxs("svg", { viewBox: "0 0 180 180", className: "spend-donut", role: "img", "aria-label": "Share of spending by theme", children: [
    v.map((g) => /* @__PURE__ */ $.jsx(
      "path",
      {
        d: g.d,
        fill: g.color,
        fillOpacity: 0.85,
        stroke: "var(--nb-bg)",
        strokeWidth: "2",
        children: /* @__PURE__ */ $.jsx("title", { children: `${g.theme} — ${Math.round(g.share * 100)}%${n ? "" : ` (${Ht(g.value, n)})`}` })
      },
      g.theme
    )),
    v.filter((g) => g.share >= 0.08).map((g) => /* @__PURE__ */ $.jsxs(
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
    /* @__PURE__ */ $.jsx("text", { x: h, y: h - 2, textAnchor: "middle", fill: "var(--nb-text)", fontSize: "15", fontWeight: "600", children: n ? $0 : lr(t) }),
    /* @__PURE__ */ $.jsx("text", { x: h, y: h + 14, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "10", children: "spent" })
  ] });
}
function y$({
  hass: e,
  config: t
}) {
  const [n, r] = te.useState(Mu()), [o, u] = te.useState(null), [c, f] = te.useState(null), [d, h] = te.useState(null), y = te.useRef(0);
  te.useEffect(() => () => {
    y.current += 1;
  }, []);
  const v = te.useCallback(
    (I, B) => Promise.all([J3(I, B, n), XM(I, B, n)]).then(
      ([k, V]) => ({ data: { summary: k, recurring: V }, censored: k.censored })
    ),
    [n]
  ), { data: g, masked: b, error: _ } = rd(
    e,
    t.entry,
    v
  ), S = (I) => {
    y.current += 1, r(I), u(null), f(null);
  }, x = (I) => {
    const B = ++y.current;
    if (h(null), o === I) {
      u(null), f(null);
      return;
    }
    u(I), f(null), VM(e, t.entry, n, I).then((k) => {
      B === y.current && f(k.transactions);
    }).catch(() => {
      B === y.current && h("Unable to load these transactions.");
    });
  }, T = (g == null ? void 0 : g.summary) ?? null, E = (g == null ? void 0 : g.recurring) ?? null, C = T ? T.themes.filter((I) => parseFloat(I.total) > 0) : [], j = Math.max(1e-9, ...C.map((I) => parseFloat(I.total))), A = (E ? E.streams.filter((I) => !I.is_income) : []).filter((I) => I.active), M = A.reduce(
    (I, B) => I + parseFloat(B.monthly_amount ?? B.average_amount) * (B.monthly_amount ? 1 : c$[B.frequency] ?? 1),
    0
  ), N = E ? E.expected.filter((I) => !I.is_income && !I.overdue).reduce((I, B) => I + B.amount, 0) : 0, z = T && n === Mu() && N > 0 ? parseFloat(T.total_spend) + N : null;
  return /* @__PURE__ */ $.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Spending" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: /* @__PURE__ */ $.jsx(k0, { month: n, onChange: S }) })
    ] }),
    _ && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: _ }),
    !_ && !T && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !_ && T && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
      t.show_stats !== !1 && /* @__PURE__ */ $.jsxs("div", { className: "spend-stats", children: [
        /* @__PURE__ */ $.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-label", children: "Spent" }),
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-value", children: lr(parseFloat(T.total_spend)) }),
          z !== null && !b && /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
            "plus scheduled bills ~",
            lr(z)
          ] })
        ] }),
        /* @__PURE__ */ $.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-label", children: "Income" }),
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-value up", children: lr(parseFloat(T.total_income)) })
        ] }),
        /* @__PURE__ */ $.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-label", children: "Recurring bills" }),
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-value", children: `${lr(M)}/mo` }),
          /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
            A.length,
            " active"
          ] })
        ] })
      ] }),
      C.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No spending recorded this month." }),
      C.length > 0 && /* @__PURE__ */ $.jsxs("div", { className: "spend-themes-split", children: [
        t.show_donut !== !1 && /* @__PURE__ */ $.jsx(
          v$,
          {
            rows: C,
            totalSpend: parseFloat(T.total_spend),
            censored: b
          }
        ),
        /* @__PURE__ */ $.jsx("div", { className: "spend-themes-bars", children: C.map((I) => /* @__PURE__ */ $.jsxs("div", { children: [
          /* @__PURE__ */ $.jsxs(
            "button",
            {
              className: `spend-row ${o === I.theme ? "open" : ""}`,
              onClick: () => x(I.theme),
              children: [
                /* @__PURE__ */ $.jsxs("span", { className: "spend-row-label", children: [
                  /* @__PURE__ */ $.jsx(
                    "span",
                    {
                      className: "spend-theme-dot",
                      style: { background: ju(I.theme) }
                    }
                  ),
                  I.theme
                ] }),
                /* @__PURE__ */ $.jsx("span", { className: "spend-row-bar", children: /* @__PURE__ */ $.jsx(
                  "span",
                  {
                    className: "spend-row-fill",
                    style: {
                      width: `${parseFloat(I.total) / j * 100}%`,
                      "--bar-color": ju(I.theme)
                    }
                  }
                ) }),
                /* @__PURE__ */ $.jsx("span", { className: "spend-row-amount", children: Ht(parseFloat(I.total), b) }),
                /* @__PURE__ */ $.jsxs("span", { className: "muted spend-row-count", children: [
                  I.count,
                  "×"
                ] })
              ]
            }
          ),
          o === I.theme && /* @__PURE__ */ $.jsxs("div", { className: "spend-txns", children: [
            d && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: d }),
            c === null && !d && /* @__PURE__ */ $.jsx("div", { className: "muted", children: "Loading…" }),
            c !== null && [...c].sort(
              (B, k) => Number(k.pending) - Number(B.pending) || k.posted_at.localeCompare(B.posted_at)
            ).map((B) => /* @__PURE__ */ $.jsxs("div", { className: "spend-txn", children: [
              /* @__PURE__ */ $.jsx("span", { className: "muted spend-txn-date", children: new Date(B.posted_at).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                timeZone: "Asia/Kolkata"
              }) }),
              /* @__PURE__ */ $.jsx(p$, { tx: B }),
              /* @__PURE__ */ $.jsxs("span", { className: "spend-txn-desc", title: B.description, children: [
                B.merchant ?? B.description,
                B.pending ? " · pending" : ""
              ] }),
              /* @__PURE__ */ $.jsx("span", { className: "spend-txn-amount", children: Ht(parseFloat(B.amount), b) })
            ] }, B.id))
          ] })
        ] }, I.theme)) })
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
function Fn(e, t, n = () => !0) {
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
function m$(e, t, n) {
  if (e.length === 0) return [];
  const r = QM(n), o = /* @__PURE__ */ new Map();
  for (const f of e) o.set(r(f.ts), Fn(f, t));
  const u = [...o.keys()].sort((f, d) => f - d);
  let c = Fn(e[0], t);
  return u.map((f) => {
    const d = o.get(f), h = d - c;
    return c = d, { ts: f, flow: h };
  });
}
function g$(e, t, n) {
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
function sb(e, t) {
  let n = 0;
  for (const r of t) {
    const o = e.values[r.id] ?? 0;
    o < 0 && (n += o);
  }
  return n;
}
const WO = {
  Retirement: "#60a5fa",
  Taxable: "#818cf8",
  "Non-retirement": "#818cf8",
  Cash: "#34d399",
  Liquid: "#34d399",
  Debt: "#f472b6",
  "Credit cards": "#f472b6"
};
function b$(e, t, n) {
  const r = { values: t }, o = (f) => Fn(r, n, f);
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
  const c = sb(r, n);
  return [
    { label: "Retirement", v: u },
    { label: "Non-retirement", v: o((f) => f.category !== "retirement" && (t[f.id] ?? 0) > 0) },
    { label: "Debt", v: c }
  ];
}
function x$({ parts: e }) {
  const t = e.filter((r) => r.v !== 0), n = t.reduce((r, o) => r + Math.abs(o.v), 0);
  return t.length < 2 || n === 0 ? null : /* @__PURE__ */ $.jsxs("div", { className: "comp", children: [
    /* @__PURE__ */ $.jsx("div", { className: "comp-bar", children: t.map((r) => /* @__PURE__ */ $.jsx(
      "span",
      {
        style: {
          background: WO[r.label] ?? "#8b9bb4",
          width: `${Math.abs(r.v) / n * 100}%`
        }
      },
      r.label
    )) }),
    /* @__PURE__ */ $.jsx("div", { className: "comp-legend", children: t.map((r) => /* @__PURE__ */ $.jsxs("span", { className: "comp-item", children: [
      /* @__PURE__ */ $.jsx("span", { className: "comp-dot", style: { background: WO[r.label] ?? "#8b9bb4" } }),
      r.label,
      " ",
      /* @__PURE__ */ $.jsx("b", { children: GM(r.v) })
    ] }, r.label)) })
  ] });
}
function S$({
  hass: e,
  config: t
}) {
  const n = jo.find((_) => _.key === (t.view ?? "all")) ?? jo[2], [r, o] = te.useState(t.range ?? "1m"), { overview: u, series: c, masked: f, error: d } = q0(e, t.entry, r), h = ad(u), y = te.useMemo(() => h.filter(n.pick), [h, n]), v = te.useMemo(() => {
    if (!c) return null;
    const _ = new Set(y.map((E) => E.id)), S = ZM(c.filter((E) => _.has(E.account_id)));
    if (S.length === 0) return null;
    const x = Fn(S[0], y), T = Fn(S[S.length - 1], y);
    return {
      last: T,
      diff: T - x,
      delta: x !== 0 ? (T - x) / Math.abs(x) : null,
      parts: b$(n.key, S[S.length - 1].values, y)
    };
  }, [c, y, n]), g = v != null && v.delta != null, b = t.layout === "banner";
  return /* @__PURE__ */ $.jsxs("div", { className: `card${b ? " stat-banner" : ""}`, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? n.label }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: t.show_controls !== !1 && t.show_range_selector !== !1 && /* @__PURE__ */ $.jsx("span", { className: "controls", children: /* @__PURE__ */ $.jsx(tf, { options: z0, value: r, onChange: o }) }) })
    ] }),
    d && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: d }),
    !d && !v && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !d && v && f && // Censored: the dollar amount is redacted anyway, so promote the real
    // percent change to the big slot and drop the footer line entirely.
    /* @__PURE__ */ $.jsx(
      "div",
      {
        className: `stat-value ${g && !n.flow ? v.delta >= 0 ? "up" : "down" : ""}`,
        children: g && !n.flow ? Eu(v.delta) : $0
      }
    ),
    !d && v && !f && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
      /* @__PURE__ */ $.jsx("div", { className: "stat-value", children: lr(v.last) }),
      g && /* @__PURE__ */ $.jsxs("div", { className: "stat-delta", children: [
        /* @__PURE__ */ $.jsxs("span", { className: `chip ${v.diff >= 0 ? "up" : "down"}`, children: [
          cb(v.diff),
          !n.flow && ` (${Eu(v.delta)})`
        ] }),
        /* @__PURE__ */ $.jsxs("span", { children: [
          "over ",
          r
        ] })
      ] }),
      t.show_composition !== !1 && /* @__PURE__ */ $.jsx(x$, { parts: v.parts })
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
function ze() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = JM(e)) && (r && (r += " "), r += t);
  return r;
}
var ov, ZO;
function an() {
  if (ZO) return ov;
  ZO = 1;
  var e = Array.isArray;
  return ov = e, ov;
}
var lv, QO;
function eC() {
  if (QO) return lv;
  QO = 1;
  var e = typeof zs == "object" && zs && zs.Object === Object && zs;
  return lv = e, lv;
}
var uv, JO;
function yr() {
  if (JO) return uv;
  JO = 1;
  var e = eC(), t = typeof self == "object" && self && self.Object === Object && self, n = e || t || Function("return this")();
  return uv = n, uv;
}
var cv, ew;
function dc() {
  if (ew) return cv;
  ew = 1;
  var e = yr(), t = e.Symbol;
  return cv = t, cv;
}
var sv, tw;
function _$() {
  if (tw) return sv;
  tw = 1;
  var e = dc(), t = Object.prototype, n = t.hasOwnProperty, r = t.toString, o = e ? e.toStringTag : void 0;
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
  return sv = u, sv;
}
var fv, nw;
function O$() {
  if (nw) return fv;
  nw = 1;
  var e = Object.prototype, t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return fv = n, fv;
}
var dv, rw;
function Vr() {
  if (rw) return dv;
  rw = 1;
  var e = dc(), t = _$(), n = O$(), r = "[object Null]", o = "[object Undefined]", u = e ? e.toStringTag : void 0;
  function c(f) {
    return f == null ? f === void 0 ? o : r : u && u in Object(f) ? t(f) : n(f);
  }
  return dv = c, dv;
}
var hv, aw;
function Fr() {
  if (aw) return hv;
  aw = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return hv = e, hv;
}
var pv, iw;
function rl() {
  if (iw) return pv;
  iw = 1;
  var e = Vr(), t = Fr(), n = "[object Symbol]";
  function r(o) {
    return typeof o == "symbol" || t(o) && e(o) == n;
  }
  return pv = r, pv;
}
var vv, ow;
function B0() {
  if (ow) return vv;
  ow = 1;
  var e = an(), t = rl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function o(u, c) {
    if (e(u))
      return !1;
    var f = typeof u;
    return f == "number" || f == "symbol" || f == "boolean" || u == null || t(u) ? !0 : r.test(u) || !n.test(u) || c != null && u in Object(c);
  }
  return vv = o, vv;
}
var yv, lw;
function Da() {
  if (lw) return yv;
  lw = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return yv = e, yv;
}
var mv, uw;
function L0() {
  if (uw) return mv;
  uw = 1;
  var e = Vr(), t = Da(), n = "[object AsyncFunction]", r = "[object Function]", o = "[object GeneratorFunction]", u = "[object Proxy]";
  function c(f) {
    if (!t(f))
      return !1;
    var d = e(f);
    return d == r || d == o || d == n || d == u;
  }
  return mv = c, mv;
}
var gv, cw;
function w$() {
  if (cw) return gv;
  cw = 1;
  var e = yr(), t = e["__core-js_shared__"];
  return gv = t, gv;
}
var bv, sw;
function A$() {
  if (sw) return bv;
  sw = 1;
  var e = w$(), t = (function() {
    var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!t && t in r;
  }
  return bv = n, bv;
}
var xv, fw;
function tC() {
  if (fw) return xv;
  fw = 1;
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
  return xv = n, xv;
}
var Sv, dw;
function T$() {
  if (dw) return Sv;
  dw = 1;
  var e = L0(), t = A$(), n = Da(), r = tC(), o = /[\\^$.*+?()[\]{}|]/g, u = /^\[object .+?Constructor\]$/, c = Function.prototype, f = Object.prototype, d = c.toString, h = f.hasOwnProperty, y = RegExp(
    "^" + d.call(h).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function v(g) {
    if (!n(g) || t(g))
      return !1;
    var b = e(g) ? y : u;
    return b.test(r(g));
  }
  return Sv = v, Sv;
}
var _v, hw;
function E$() {
  if (hw) return _v;
  hw = 1;
  function e(t, n) {
    return t == null ? void 0 : t[n];
  }
  return _v = e, _v;
}
var Ov, pw;
function bi() {
  if (pw) return Ov;
  pw = 1;
  var e = T$(), t = E$();
  function n(r, o) {
    var u = t(r, o);
    return e(u) ? u : void 0;
  }
  return Ov = n, Ov;
}
var wv, vw;
function id() {
  if (vw) return wv;
  vw = 1;
  var e = bi(), t = e(Object, "create");
  return wv = t, wv;
}
var Av, yw;
function j$() {
  if (yw) return Av;
  yw = 1;
  var e = id();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Av = t, Av;
}
var Tv, mw;
function M$() {
  if (mw) return Tv;
  mw = 1;
  function e(t) {
    var n = this.has(t) && delete this.__data__[t];
    return this.size -= n ? 1 : 0, n;
  }
  return Tv = e, Tv;
}
var Ev, gw;
function C$() {
  if (gw) return Ev;
  gw = 1;
  var e = id(), t = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function o(u) {
    var c = this.__data__;
    if (e) {
      var f = c[u];
      return f === t ? void 0 : f;
    }
    return r.call(c, u) ? c[u] : void 0;
  }
  return Ev = o, Ev;
}
var jv, bw;
function D$() {
  if (bw) return jv;
  bw = 1;
  var e = id(), t = Object.prototype, n = t.hasOwnProperty;
  function r(o) {
    var u = this.__data__;
    return e ? u[o] !== void 0 : n.call(u, o);
  }
  return jv = r, jv;
}
var Mv, xw;
function P$() {
  if (xw) return Mv;
  xw = 1;
  var e = id(), t = "__lodash_hash_undefined__";
  function n(r, o) {
    var u = this.__data__;
    return this.size += this.has(r) ? 0 : 1, u[r] = e && o === void 0 ? t : o, this;
  }
  return Mv = n, Mv;
}
var Cv, Sw;
function N$() {
  if (Sw) return Cv;
  Sw = 1;
  var e = j$(), t = M$(), n = C$(), r = D$(), o = P$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, Cv = u, Cv;
}
var Dv, _w;
function R$() {
  if (_w) return Dv;
  _w = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Dv = e, Dv;
}
var Pv, Ow;
function U0() {
  if (Ow) return Pv;
  Ow = 1;
  function e(t, n) {
    return t === n || t !== t && n !== n;
  }
  return Pv = e, Pv;
}
var Nv, ww;
function od() {
  if (ww) return Nv;
  ww = 1;
  var e = U0();
  function t(n, r) {
    for (var o = n.length; o--; )
      if (e(n[o][0], r))
        return o;
    return -1;
  }
  return Nv = t, Nv;
}
var Rv, Aw;
function $$() {
  if (Aw) return Rv;
  Aw = 1;
  var e = od(), t = Array.prototype, n = t.splice;
  function r(o) {
    var u = this.__data__, c = e(u, o);
    if (c < 0)
      return !1;
    var f = u.length - 1;
    return c == f ? u.pop() : n.call(u, c, 1), --this.size, !0;
  }
  return Rv = r, Rv;
}
var $v, Tw;
function z$() {
  if (Tw) return $v;
  Tw = 1;
  var e = od();
  function t(n) {
    var r = this.__data__, o = e(r, n);
    return o < 0 ? void 0 : r[o][1];
  }
  return $v = t, $v;
}
var zv, Ew;
function q$() {
  if (Ew) return zv;
  Ew = 1;
  var e = od();
  function t(n) {
    return e(this.__data__, n) > -1;
  }
  return zv = t, zv;
}
var qv, jw;
function k$() {
  if (jw) return qv;
  jw = 1;
  var e = od();
  function t(n, r) {
    var o = this.__data__, u = e(o, n);
    return u < 0 ? (++this.size, o.push([n, r])) : o[u][1] = r, this;
  }
  return qv = t, qv;
}
var kv, Mw;
function ld() {
  if (Mw) return kv;
  Mw = 1;
  var e = R$(), t = $$(), n = z$(), r = q$(), o = k$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, kv = u, kv;
}
var Bv, Cw;
function I0() {
  if (Cw) return Bv;
  Cw = 1;
  var e = bi(), t = yr(), n = e(t, "Map");
  return Bv = n, Bv;
}
var Lv, Dw;
function B$() {
  if (Dw) return Lv;
  Dw = 1;
  var e = N$(), t = ld(), n = I0();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (n || t)(),
      string: new e()
    };
  }
  return Lv = r, Lv;
}
var Uv, Pw;
function L$() {
  if (Pw) return Uv;
  Pw = 1;
  function e(t) {
    var n = typeof t;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? t !== "__proto__" : t === null;
  }
  return Uv = e, Uv;
}
var Iv, Nw;
function ud() {
  if (Nw) return Iv;
  Nw = 1;
  var e = L$();
  function t(n, r) {
    var o = n.__data__;
    return e(r) ? o[typeof r == "string" ? "string" : "hash"] : o.map;
  }
  return Iv = t, Iv;
}
var Hv, Rw;
function U$() {
  if (Rw) return Hv;
  Rw = 1;
  var e = ud();
  function t(n) {
    var r = e(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return Hv = t, Hv;
}
var Gv, $w;
function I$() {
  if ($w) return Gv;
  $w = 1;
  var e = ud();
  function t(n) {
    return e(this, n).get(n);
  }
  return Gv = t, Gv;
}
var Yv, zw;
function H$() {
  if (zw) return Yv;
  zw = 1;
  var e = ud();
  function t(n) {
    return e(this, n).has(n);
  }
  return Yv = t, Yv;
}
var Kv, qw;
function G$() {
  if (qw) return Kv;
  qw = 1;
  var e = ud();
  function t(n, r) {
    var o = e(this, n), u = o.size;
    return o.set(n, r), this.size += o.size == u ? 0 : 1, this;
  }
  return Kv = t, Kv;
}
var Xv, kw;
function H0() {
  if (kw) return Xv;
  kw = 1;
  var e = B$(), t = U$(), n = I$(), r = H$(), o = G$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, Xv = u, Xv;
}
var Vv, Bw;
function nC() {
  if (Bw) return Vv;
  Bw = 1;
  var e = H0(), t = "Expected a function";
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
  return n.Cache = e, Vv = n, Vv;
}
var Fv, Lw;
function Y$() {
  if (Lw) return Fv;
  Lw = 1;
  var e = nC(), t = 500;
  function n(r) {
    var o = e(r, function(c) {
      return u.size === t && u.clear(), c;
    }), u = o.cache;
    return o;
  }
  return Fv = n, Fv;
}
var Wv, Uw;
function K$() {
  if (Uw) return Wv;
  Uw = 1;
  var e = Y$(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = e(function(o) {
    var u = [];
    return o.charCodeAt(0) === 46 && u.push(""), o.replace(t, function(c, f, d, h) {
      u.push(d ? h.replace(n, "$1") : f || c);
    }), u;
  });
  return Wv = r, Wv;
}
var Zv, Iw;
function G0() {
  if (Iw) return Zv;
  Iw = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length, u = Array(o); ++r < o; )
      u[r] = n(t[r], r, t);
    return u;
  }
  return Zv = e, Zv;
}
var Qv, Hw;
function X$() {
  if (Hw) return Qv;
  Hw = 1;
  var e = dc(), t = G0(), n = an(), r = rl(), o = e ? e.prototype : void 0, u = o ? o.toString : void 0;
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
  return Qv = c, Qv;
}
var Jv, Gw;
function rC() {
  if (Gw) return Jv;
  Gw = 1;
  var e = X$();
  function t(n) {
    return n == null ? "" : e(n);
  }
  return Jv = t, Jv;
}
var ey, Yw;
function aC() {
  if (Yw) return ey;
  Yw = 1;
  var e = an(), t = B0(), n = K$(), r = rC();
  function o(u, c) {
    return e(u) ? u : t(u, c) ? [u] : n(r(u));
  }
  return ey = o, ey;
}
var ty, Kw;
function cd() {
  if (Kw) return ty;
  Kw = 1;
  var e = rl();
  function t(n) {
    if (typeof n == "string" || e(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return ty = t, ty;
}
var ny, Xw;
function Y0() {
  if (Xw) return ny;
  Xw = 1;
  var e = aC(), t = cd();
  function n(r, o) {
    o = e(o, r);
    for (var u = 0, c = o.length; r != null && u < c; )
      r = r[t(o[u++])];
    return u && u == c ? r : void 0;
  }
  return ny = n, ny;
}
var ry, Vw;
function iC() {
  if (Vw) return ry;
  Vw = 1;
  var e = Y0();
  function t(n, r, o) {
    var u = n == null ? void 0 : e(n, r);
    return u === void 0 ? o : u;
  }
  return ry = t, ry;
}
var V$ = iC();
const Bn = /* @__PURE__ */ tt(V$);
var ay, Fw;
function F$() {
  if (Fw) return ay;
  Fw = 1;
  function e(t) {
    return t == null;
  }
  return ay = e, ay;
}
var W$ = F$();
const we = /* @__PURE__ */ tt(W$);
var iy, Ww;
function Z$() {
  if (Ww) return iy;
  Ww = 1;
  var e = Vr(), t = an(), n = Fr(), r = "[object String]";
  function o(u) {
    return typeof u == "string" || !t(u) && n(u) && e(u) == r;
  }
  return iy = o, iy;
}
var Q$ = Z$();
const hi = /* @__PURE__ */ tt(Q$);
var J$ = L0();
const Ee = /* @__PURE__ */ tt(J$);
var ez = Da();
const al = /* @__PURE__ */ tt(ez);
var oy = { exports: {} }, Ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zw;
function tz() {
  if (Zw) return Ge;
  Zw = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), c = Symbol.for("react.context"), f = Symbol.for("react.server_context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), _;
  _ = Symbol.for("react.module.reference");
  function S(x) {
    if (typeof x == "object" && x !== null) {
      var T = x.$$typeof;
      switch (T) {
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
                  return T;
              }
          }
        case t:
          return T;
      }
    }
  }
  return Ge.ContextConsumer = c, Ge.ContextProvider = u, Ge.Element = e, Ge.ForwardRef = d, Ge.Fragment = n, Ge.Lazy = g, Ge.Memo = v, Ge.Portal = t, Ge.Profiler = o, Ge.StrictMode = r, Ge.Suspense = h, Ge.SuspenseList = y, Ge.isAsyncMode = function() {
    return !1;
  }, Ge.isConcurrentMode = function() {
    return !1;
  }, Ge.isContextConsumer = function(x) {
    return S(x) === c;
  }, Ge.isContextProvider = function(x) {
    return S(x) === u;
  }, Ge.isElement = function(x) {
    return typeof x == "object" && x !== null && x.$$typeof === e;
  }, Ge.isForwardRef = function(x) {
    return S(x) === d;
  }, Ge.isFragment = function(x) {
    return S(x) === n;
  }, Ge.isLazy = function(x) {
    return S(x) === g;
  }, Ge.isMemo = function(x) {
    return S(x) === v;
  }, Ge.isPortal = function(x) {
    return S(x) === t;
  }, Ge.isProfiler = function(x) {
    return S(x) === o;
  }, Ge.isStrictMode = function(x) {
    return S(x) === r;
  }, Ge.isSuspense = function(x) {
    return S(x) === h;
  }, Ge.isSuspenseList = function(x) {
    return S(x) === y;
  }, Ge.isValidElementType = function(x) {
    return typeof x == "string" || typeof x == "function" || x === n || x === o || x === r || x === h || x === y || x === b || typeof x == "object" && x !== null && (x.$$typeof === g || x.$$typeof === v || x.$$typeof === u || x.$$typeof === c || x.$$typeof === d || x.$$typeof === _ || x.getModuleId !== void 0);
  }, Ge.typeOf = S, Ge;
}
var Qw;
function nz() {
  return Qw || (Qw = 1, oy.exports = tz()), oy.exports;
}
var rz = nz(), ly, Jw;
function oC() {
  if (Jw) return ly;
  Jw = 1;
  var e = Vr(), t = Fr(), n = "[object Number]";
  function r(o) {
    return typeof o == "number" || t(o) && e(o) == n;
  }
  return ly = r, ly;
}
var uy, eA;
function az() {
  if (eA) return uy;
  eA = 1;
  var e = oC();
  function t(n) {
    return e(n) && n != +n;
  }
  return uy = t, uy;
}
var iz = az();
const il = /* @__PURE__ */ tt(iz);
var oz = oC();
const lz = /* @__PURE__ */ tt(oz);
var Zn = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, ii = function(t) {
  return hi(t) && t.indexOf("%") === t.length - 1;
}, fe = function(t) {
  return lz(t) && !il(t);
}, uz = function(t) {
  return we(t);
}, Tt = function(t) {
  return fe(t) || hi(t);
}, cz = 0, xi = function(t) {
  var n = ++cz;
  return "".concat(t || "").concat(n);
}, pi = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!fe(t) && !hi(t))
    return r;
  var u;
  if (ii(t)) {
    var c = t.indexOf("%");
    u = n * parseFloat(t.slice(0, c)) / 100;
  } else
    u = +t;
  return il(u) && (u = r), o && u > n && (u = n), u;
}, Ta = function(t) {
  if (!t)
    return null;
  var n = Object.keys(t);
  return n && n.length ? t[n[0]] : null;
}, sz = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var n = t.length, r = {}, o = 0; o < n; o++)
    if (!r[t[o]])
      r[t[o]] = !0;
    else
      return !0;
  return !1;
}, vt = function(t, n) {
  return fe(t) && fe(n) ? function(r) {
    return t + r * (n - t);
  } : function() {
    return n;
  };
};
function nf(e, t, n) {
  return !e || !e.length ? null : e.find(function(r) {
    return r && (typeof t == "function" ? t(r) : Bn(r, t)) === n;
  });
}
var fz = function(t) {
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
}, dz = function(t, n) {
  return fe(t) && fe(n) ? t - n : hi(t) && hi(n) ? t.localeCompare(n) : t instanceof Date && n instanceof Date ? t.getTime() - n.getTime() : String(t).localeCompare(String(n));
};
function wo(e, t) {
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && (!{}.hasOwnProperty.call(t, n) || e[n] !== t[n]))
      return !1;
  for (var r in t)
    if ({}.hasOwnProperty.call(t, r) && !{}.hasOwnProperty.call(e, r))
      return !1;
  return !0;
}
function fb(e) {
  "@babel/helpers - typeof";
  return fb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fb(e);
}
var hz = ["viewBox", "children"], pz = [
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
], tA = ["points", "pathLength"], cy = {
  svg: hz,
  polygon: tA,
  polyline: tA
}, K0 = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], rf = function(t, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var r = t;
  if (/* @__PURE__ */ te.isValidElement(t) && (r = t.props), !al(r))
    return null;
  var o = {};
  return Object.keys(r).forEach(function(u) {
    K0.includes(u) && (o[u] = n || function(c) {
      return r[u](r, c);
    });
  }), o;
}, vz = function(t, n, r) {
  return function(o) {
    return t(n, r, o), null;
  };
}, Cu = function(t, n, r) {
  if (!al(t) || fb(t) !== "object")
    return null;
  var o = null;
  return Object.keys(t).forEach(function(u) {
    var c = t[u];
    K0.includes(u) && typeof c == "function" && (o || (o = {}), o[u] = vz(c, n, r));
  }), o;
}, yz = ["children"], mz = ["children"];
function nA(e, t) {
  if (e == null) return {};
  var n = gz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function gz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function db(e) {
  "@babel/helpers - typeof";
  return db = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, db(e);
}
var rA = {
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
}, Ur = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, aA = null, sy = null, X0 = function e(t) {
  if (t === aA && Array.isArray(sy))
    return sy;
  var n = [];
  return te.Children.forEach(t, function(r) {
    we(r) || (rz.isFragment(r) ? n = n.concat(e(r.props.children)) : n.push(r));
  }), sy = n, aA = t, n;
};
function rn(e, t) {
  var n = [], r = [];
  return Array.isArray(t) ? r = t.map(function(o) {
    return Ur(o);
  }) : r = [Ur(t)], X0(e).forEach(function(o) {
    var u = Bn(o, "type.displayName") || Bn(o, "type.name");
    r.indexOf(u) !== -1 && n.push(o);
  }), n;
}
function bn(e, t) {
  var n = rn(e, t);
  return n && n[0];
}
var iA = function(t) {
  if (!t || !t.props)
    return !1;
  var n = t.props, r = n.width, o = n.height;
  return !(!fe(r) || r <= 0 || !fe(o) || o <= 0);
}, bz = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], xz = function(t) {
  return t && t.type && hi(t.type) && bz.indexOf(t.type) >= 0;
}, lC = function(t) {
  return t && db(t) === "object" && "clipDot" in t;
}, Sz = function(t, n, r, o) {
  var u, c = (u = cy == null ? void 0 : cy[o]) !== null && u !== void 0 ? u : [];
  return n.startsWith("data-") || !Ee(t) && (o && c.includes(n) || pz.includes(n)) || r && K0.includes(n);
}, Te = function(t, n, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var o = t;
  if (/* @__PURE__ */ te.isValidElement(t) && (o = t.props), !al(o))
    return null;
  var u = {};
  return Object.keys(o).forEach(function(c) {
    var f;
    Sz((f = o) === null || f === void 0 ? void 0 : f[c], c, n, r) && (u[c] = o[c]);
  }), u;
}, hb = function e(t, n) {
  if (t === n)
    return !0;
  var r = te.Children.count(t);
  if (r !== te.Children.count(n))
    return !1;
  if (r === 0)
    return !0;
  if (r === 1)
    return oA(Array.isArray(t) ? t[0] : t, Array.isArray(n) ? n[0] : n);
  for (var o = 0; o < r; o++) {
    var u = t[o], c = n[o];
    if (Array.isArray(u) || Array.isArray(c)) {
      if (!e(u, c))
        return !1;
    } else if (!oA(u, c))
      return !1;
  }
  return !0;
}, oA = function(t, n) {
  if (we(t) && we(n))
    return !0;
  if (!we(t) && !we(n)) {
    var r = t.props || {}, o = r.children, u = nA(r, yz), c = n.props || {}, f = c.children, d = nA(c, mz);
    return o && f ? wo(u, d) && hb(o, f) : !o && !f ? wo(u, d) : !1;
  }
  return !1;
}, lA = function(t, n) {
  var r = [], o = {};
  return X0(t).forEach(function(u, c) {
    if (xz(u))
      r.push(u);
    else if (u) {
      var f = Ur(u.type), d = n[f] || {}, h = d.handler, y = d.once;
      if (h && (!y || !o[f])) {
        var v = h(u, f, c);
        r.push(v), o[f] = !0;
      }
    }
  }), r;
}, _z = function(t) {
  var n = t && t.type;
  return n && rA[n] ? rA[n] : null;
}, Oz = function(t, n) {
  return X0(n).indexOf(t);
}, wz = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
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
function Az(e, t) {
  if (e == null) return {};
  var n = Tz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Tz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function vb(e) {
  var t = e.children, n = e.width, r = e.height, o = e.viewBox, u = e.className, c = e.style, f = e.title, d = e.desc, h = Az(e, wz), y = o || {
    width: n,
    height: r,
    x: 0,
    y: 0
  }, v = ze("recharts-surface", u);
  return /* @__PURE__ */ L.createElement("svg", pb({}, Te(h, !0, "svg"), {
    className: v,
    width: n,
    height: r,
    style: c,
    viewBox: "".concat(y.x, " ").concat(y.y, " ").concat(y.width, " ").concat(y.height)
  }), /* @__PURE__ */ L.createElement("title", null, f), /* @__PURE__ */ L.createElement("desc", null, d), t);
}
var Ez = ["children", "className"];
function yb() {
  return yb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, yb.apply(this, arguments);
}
function jz(e, t) {
  if (e == null) return {};
  var n = Mz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Mz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var He = /* @__PURE__ */ L.forwardRef(function(e, t) {
  var n = e.children, r = e.className, o = jz(e, Ez), u = ze("recharts-layer", r);
  return /* @__PURE__ */ L.createElement("g", yb({
    className: u
  }, Te(o, !0), {
    ref: t
  }), n);
}), Ir = function(t, n) {
  for (var r = arguments.length, o = new Array(r > 2 ? r - 2 : 0), u = 2; u < r; u++)
    o[u - 2] = arguments[u];
}, fy, uA;
function Cz() {
  if (uA) return fy;
  uA = 1;
  function e(t, n, r) {
    var o = -1, u = t.length;
    n < 0 && (n = -n > u ? 0 : u + n), r = r > u ? u : r, r < 0 && (r += u), u = n > r ? 0 : r - n >>> 0, n >>>= 0;
    for (var c = Array(u); ++o < u; )
      c[o] = t[o + n];
    return c;
  }
  return fy = e, fy;
}
var dy, cA;
function Dz() {
  if (cA) return dy;
  cA = 1;
  var e = Cz();
  function t(n, r, o) {
    var u = n.length;
    return o = o === void 0 ? u : o, !r && o >= u ? n : e(n, r, o);
  }
  return dy = t, dy;
}
var hy, sA;
function uC() {
  if (sA) return hy;
  sA = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = t + n + r, u = "\\ufe0e\\ufe0f", c = "\\u200d", f = RegExp("[" + c + e + o + u + "]");
  function d(h) {
    return f.test(h);
  }
  return hy = d, hy;
}
var py, fA;
function Pz() {
  if (fA) return py;
  fA = 1;
  function e(t) {
    return t.split("");
  }
  return py = e, py;
}
var vy, dA;
function Nz() {
  if (dA) return vy;
  dA = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = t + n + r, u = "\\ufe0e\\ufe0f", c = "[" + e + "]", f = "[" + o + "]", d = "\\ud83c[\\udffb-\\udfff]", h = "(?:" + f + "|" + d + ")", y = "[^" + e + "]", v = "(?:\\ud83c[\\udde6-\\uddff]){2}", g = "[\\ud800-\\udbff][\\udc00-\\udfff]", b = "\\u200d", _ = h + "?", S = "[" + u + "]?", x = "(?:" + b + "(?:" + [y, v, g].join("|") + ")" + S + _ + ")*", T = S + _ + x, E = "(?:" + [y + f + "?", f, v, g, c].join("|") + ")", C = RegExp(d + "(?=" + d + ")|" + E + T, "g");
  function j(w) {
    return w.match(C) || [];
  }
  return vy = j, vy;
}
var yy, hA;
function Rz() {
  if (hA) return yy;
  hA = 1;
  var e = Pz(), t = uC(), n = Nz();
  function r(o) {
    return t(o) ? n(o) : e(o);
  }
  return yy = r, yy;
}
var my, pA;
function $z() {
  if (pA) return my;
  pA = 1;
  var e = Dz(), t = uC(), n = Rz(), r = rC();
  function o(u) {
    return function(c) {
      c = r(c);
      var f = t(c) ? n(c) : void 0, d = f ? f[0] : c.charAt(0), h = f ? e(f, 1).join("") : c.slice(1);
      return d[u]() + h;
    };
  }
  return my = o, my;
}
var gy, vA;
function zz() {
  if (vA) return gy;
  vA = 1;
  var e = $z(), t = e("toUpperCase");
  return gy = t, gy;
}
var qz = zz();
const sd = /* @__PURE__ */ tt(qz);
function nt(e) {
  return function() {
    return e;
  };
}
const cC = Math.cos, af = Math.sin, Jn = Math.sqrt, of = Math.PI, fd = 2 * of, mb = Math.PI, gb = 2 * mb, ri = 1e-6, kz = gb - ri;
function sC(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function Bz(e) {
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
class Lz {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? sC : Bz(t);
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
    else if (g > ri) if (!(Math.abs(v * d - h * y) > ri) || !u)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let b = r - c, _ = o - f, S = d * d + h * h, x = b * b + _ * _, T = Math.sqrt(S), E = Math.sqrt(g), C = u * Math.tan((mb - Math.acos((S + g - x) / (2 * T * E))) / 2), j = C / E, w = C / T;
      Math.abs(j - 1) > ri && this._append`L${t + j * y},${n + j * v}`, this._append`A${u},${u},0,0,${+(v * b > y * _)},${this._x1 = t + w * d},${this._y1 = n + w * h}`;
    }
  }
  arc(t, n, r, o, u, c) {
    if (t = +t, n = +n, r = +r, c = !!c, r < 0) throw new Error(`negative radius: ${r}`);
    let f = r * Math.cos(o), d = r * Math.sin(o), h = t + f, y = n + d, v = 1 ^ c, g = c ? o - u : u - o;
    this._x1 === null ? this._append`M${h},${y}` : (Math.abs(this._x1 - h) > ri || Math.abs(this._y1 - y) > ri) && this._append`L${h},${y}`, r && (g < 0 && (g = g % gb + gb), g > kz ? this._append`A${r},${r},0,1,${v},${t - f},${n - d}A${r},${r},0,1,${v},${this._x1 = h},${this._y1 = y}` : g > ri && this._append`A${r},${r},0,${+(g >= mb)},${v},${this._x1 = t + r * Math.cos(u)},${this._y1 = n + r * Math.sin(u)}`);
  }
  rect(t, n, r, o) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+o}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function V0(e) {
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
  }, () => new Lz(t);
}
function F0(e) {
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
function dd(e) {
  return new fC(e);
}
function dC(e) {
  return e[0];
}
function hC(e) {
  return e[1];
}
function pC(e, t) {
  var n = nt(!0), r = null, o = dd, u = null, c = V0(f);
  e = typeof e == "function" ? e : e === void 0 ? dC : nt(e), t = typeof t == "function" ? t : t === void 0 ? hC : nt(t);
  function f(d) {
    var h, y = (d = F0(d)).length, v, g = !1, b;
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
function qs(e, t, n) {
  var r = null, o = nt(!0), u = null, c = dd, f = null, d = V0(h);
  e = typeof e == "function" ? e : e === void 0 ? dC : nt(+e), t = typeof t == "function" ? t : nt(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? hC : nt(+n);
  function h(v) {
    var g, b, _, S = (v = F0(v)).length, x, T = !1, E, C = new Array(S), j = new Array(S);
    for (u == null && (f = c(E = d())), g = 0; g <= S; ++g) {
      if (!(g < S && o(x = v[g], g, v)) === T)
        if (T = !T)
          b = g, f.areaStart(), f.lineStart();
        else {
          for (f.lineEnd(), f.lineStart(), _ = g - 1; _ >= b; --_)
            f.point(C[_], j[_]);
          f.lineEnd(), f.areaEnd();
        }
      T && (C[g] = +e(x, g, v), j[g] = +t(x, g, v), f.point(r ? +r(x, g, v) : C[g], n ? +n(x, g, v) : j[g]));
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
function Uz(e) {
  return new vC(e, !0);
}
function Iz(e) {
  return new vC(e, !1);
}
const W0 = {
  draw(e, t) {
    const n = Jn(t / of);
    e.moveTo(n, 0), e.arc(0, 0, n, 0, fd);
  }
}, Hz = {
  draw(e, t) {
    const n = Jn(t / 5) / 2;
    e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
  }
}, yC = Jn(1 / 3), Gz = yC * 2, Yz = {
  draw(e, t) {
    const n = Jn(t / Gz), r = n * yC;
    e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
  }
}, Kz = {
  draw(e, t) {
    const n = Jn(t), r = -n / 2;
    e.rect(r, r, n, n);
  }
}, Xz = 0.8908130915292852, mC = af(of / 10) / af(7 * of / 10), Vz = af(fd / 10) * mC, Fz = -cC(fd / 10) * mC, Wz = {
  draw(e, t) {
    const n = Jn(t * Xz), r = Vz * n, o = Fz * n;
    e.moveTo(0, -n), e.lineTo(r, o);
    for (let u = 1; u < 5; ++u) {
      const c = fd * u / 5, f = cC(c), d = af(c);
      e.lineTo(d * n, -f * n), e.lineTo(f * r - d * o, d * r + f * o);
    }
    e.closePath();
  }
}, by = Jn(3), Zz = {
  draw(e, t) {
    const n = -Jn(t / (by * 3));
    e.moveTo(0, n * 2), e.lineTo(-by * n, -n), e.lineTo(by * n, -n), e.closePath();
  }
}, Rn = -0.5, $n = Jn(3) / 2, bb = 1 / Jn(12), Qz = (bb / 2 + 1) * 3, Jz = {
  draw(e, t) {
    const n = Jn(t / Qz), r = n / 2, o = n * bb, u = r, c = n * bb + n, f = -u, d = c;
    e.moveTo(r, o), e.lineTo(u, c), e.lineTo(f, d), e.lineTo(Rn * r - $n * o, $n * r + Rn * o), e.lineTo(Rn * u - $n * c, $n * u + Rn * c), e.lineTo(Rn * f - $n * d, $n * f + Rn * d), e.lineTo(Rn * r + $n * o, Rn * o - $n * r), e.lineTo(Rn * u + $n * c, Rn * c - $n * u), e.lineTo(Rn * f + $n * d, Rn * d - $n * f), e.closePath();
  }
};
function eq(e, t) {
  let n = null, r = V0(o);
  e = typeof e == "function" ? e : nt(e || W0), t = typeof t == "function" ? t : nt(t === void 0 ? 64 : +t);
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
function lf() {
}
function uf(e, t, n) {
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
        uf(this, this._x1, this._y1);
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
        uf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function tq(e) {
  return new gC(e);
}
function bC(e) {
  this._context = e;
}
bC.prototype = {
  areaStart: lf,
  areaEnd: lf,
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
        uf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function nq(e) {
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
        uf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function rq(e) {
  return new xC(e);
}
function SC(e) {
  this._context = e;
}
SC.prototype = {
  areaStart: lf,
  areaEnd: lf,
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
function aq(e) {
  return new SC(e);
}
function yA(e) {
  return e < 0 ? -1 : 1;
}
function mA(e, t, n) {
  var r = e._x1 - e._x0, o = t - e._x1, u = (e._y1 - e._y0) / (r || o < 0 && -0), c = (n - e._y1) / (o || r < 0 && -0), f = (u * o + c * r) / (r + o);
  return (yA(u) + yA(c)) * Math.min(Math.abs(u), Math.abs(c), 0.5 * Math.abs(f)) || 0;
}
function gA(e, t) {
  var n = e._x1 - e._x0;
  return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function xy(e, t, n) {
  var r = e._x0, o = e._y0, u = e._x1, c = e._y1, f = (u - r) / 3;
  e._context.bezierCurveTo(r + f, o + f * t, u - f, c - f * n, u, c);
}
function cf(e) {
  this._context = e;
}
cf.prototype = {
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
        xy(this, this._t0, gA(this, this._t0));
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
          this._point = 3, xy(this, gA(this, n = mA(this, e, t)), n);
          break;
        default:
          xy(this, this._t0, n = mA(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
    }
  }
};
function _C(e) {
  this._context = new OC(e);
}
(_C.prototype = Object.create(cf.prototype)).point = function(e, t) {
  cf.prototype.point.call(this, t, e);
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
function iq(e) {
  return new cf(e);
}
function oq(e) {
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
        for (var r = bA(e), o = bA(t), u = 0, c = 1; c < n; ++u, ++c)
          this._context.bezierCurveTo(r[0][u], o[0][u], r[1][u], o[1][u], e[c], t[c]);
    (this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function bA(e) {
  var t, n = e.length - 1, r, o = new Array(n), u = new Array(n), c = new Array(n);
  for (o[0] = 0, u[0] = 2, c[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) o[t] = 1, u[t] = 4, c[t] = 4 * e[t] + 2 * e[t + 1];
  for (o[n - 1] = 2, u[n - 1] = 7, c[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = o[t] / u[t - 1], u[t] -= r, c[t] -= r * c[t - 1];
  for (o[n - 1] = c[n - 1] / u[n - 1], t = n - 2; t >= 0; --t) o[t] = (c[t] - o[t + 1]) / u[t];
  for (u[n - 1] = (e[n] + o[n - 1]) / 2, t = 0; t < n - 1; ++t) u[t] = 2 * e[t + 1] - o[t + 1];
  return [o, u];
}
function lq(e) {
  return new wC(e);
}
function hd(e, t) {
  this._context = e, this._t = t;
}
hd.prototype = {
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
function uq(e) {
  return new hd(e, 0.5);
}
function cq(e) {
  return new hd(e, 0);
}
function sq(e) {
  return new hd(e, 1);
}
function Mo(e, t) {
  if ((c = e.length) > 1)
    for (var n = 1, r, o, u = e[t[0]], c, f = u.length; n < c; ++n)
      for (o = u, u = e[t[n]], r = 0; r < f; ++r)
        u[r][1] += u[r][0] = isNaN(o[r][1]) ? o[r][0] : o[r][1];
}
function xb(e) {
  for (var t = e.length, n = new Array(t); --t >= 0; ) n[t] = t;
  return n;
}
function fq(e, t) {
  return e[t];
}
function dq(e) {
  const t = [];
  return t.key = e, t;
}
function hq() {
  var e = nt([]), t = xb, n = Mo, r = fq;
  function o(u) {
    var c = Array.from(e.apply(this, arguments), dq), f, d = c.length, h = -1, y;
    for (const v of u)
      for (f = 0, ++h; f < d; ++f)
        (c[f][h] = [0, +r(v, c[f].key, h, u)]).data = v;
    for (f = 0, y = F0(t(c)); f < d; ++f)
      c[y[f]].index = f;
    return n(c, y), c;
  }
  return o.keys = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : nt(Array.from(u)), o) : e;
  }, o.value = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : nt(+u), o) : r;
  }, o.order = function(u) {
    return arguments.length ? (t = u == null ? xb : typeof u == "function" ? u : nt(Array.from(u)), o) : t;
  }, o.offset = function(u) {
    return arguments.length ? (n = u ?? Mo, o) : n;
  }, o;
}
function pq(e, t) {
  if ((r = e.length) > 0) {
    for (var n, r, o = 0, u = e[0].length, c; o < u; ++o) {
      for (c = n = 0; n < r; ++n) c += e[n][o][1] || 0;
      if (c) for (n = 0; n < r; ++n) e[n][o][1] /= c;
    }
    Mo(e, t);
  }
}
function vq(e, t) {
  if ((o = e.length) > 0) {
    for (var n = 0, r = e[t[0]], o, u = r.length; n < u; ++n) {
      for (var c = 0, f = 0; c < o; ++c) f += e[c][n][1] || 0;
      r[n][1] += r[n][0] = -f / 2;
    }
    Mo(e, t);
  }
}
function yq(e, t) {
  if (!(!((c = e.length) > 0) || !((u = (o = e[t[0]]).length) > 0))) {
    for (var n = 0, r = 1, o, u, c; r < u; ++r) {
      for (var f = 0, d = 0, h = 0; f < c; ++f) {
        for (var y = e[t[f]], v = y[r][1] || 0, g = y[r - 1][1] || 0, b = (v - g) / 2, _ = 0; _ < f; ++_) {
          var S = e[t[_]], x = S[r][1] || 0, T = S[r - 1][1] || 0;
          b += x - T;
        }
        d += v, h += b * v;
      }
      o[r - 1][1] += o[r - 1][0] = n, d && (n -= h / d);
    }
    o[r - 1][1] += o[r - 1][0] = n, Mo(e, t);
  }
}
function Du(e) {
  "@babel/helpers - typeof";
  return Du = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Du(e);
}
var mq = ["type", "size", "sizeType"];
function Sb() {
  return Sb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Sb.apply(this, arguments);
}
function xA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function SA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xA(Object(n), !0).forEach(function(r) {
      gq(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xA(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function gq(e, t, n) {
  return t = bq(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function bq(e) {
  var t = xq(e, "string");
  return Du(t) == "symbol" ? t : t + "";
}
function xq(e, t) {
  if (Du(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Du(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Sq(e, t) {
  if (e == null) return {};
  var n = _q(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function _q(e, t) {
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
  symbolCircle: W0,
  symbolCross: Hz,
  symbolDiamond: Yz,
  symbolSquare: Kz,
  symbolStar: Wz,
  symbolTriangle: Zz,
  symbolWye: Jz
}, Oq = Math.PI / 180, wq = function(t) {
  var n = "symbol".concat(sd(t));
  return AC[n] || W0;
}, Aq = function(t, n, r) {
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
      var o = 18 * Oq;
      return 1.25 * t * t * (Math.tan(o) - Math.tan(o * 2) * Math.pow(Math.tan(o), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, Tq = function(t, n) {
  AC["symbol".concat(sd(t))] = n;
}, pd = function(t) {
  var n = t.type, r = n === void 0 ? "circle" : n, o = t.size, u = o === void 0 ? 64 : o, c = t.sizeType, f = c === void 0 ? "area" : c, d = Sq(t, mq), h = SA(SA({}, d), {}, {
    type: r,
    size: u,
    sizeType: f
  }), y = function() {
    var x = wq(r), T = eq().type(x).size(Aq(u, f, r));
    return T();
  }, v = h.className, g = h.cx, b = h.cy, _ = Te(h, !0);
  return g === +g && b === +b && u === +u ? /* @__PURE__ */ L.createElement("path", Sb({}, _, {
    className: ze("recharts-symbols", v),
    transform: "translate(".concat(g, ", ").concat(b, ")"),
    d: y()
  })) : null;
};
pd.registerSymbol = Tq;
function Co(e) {
  "@babel/helpers - typeof";
  return Co = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Co(e);
}
function _b() {
  return _b = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _b.apply(this, arguments);
}
function _A(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Eq(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _A(Object(n), !0).forEach(function(r) {
      Pu(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _A(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function jq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Mq(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, EC(r.key), r);
  }
}
function Cq(e, t, n) {
  return t && Mq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Dq(e, t, n) {
  return t = sf(t), Pq(e, TC() ? Reflect.construct(t, n || [], sf(e).constructor) : t.apply(e, n));
}
function Pq(e, t) {
  if (t && (Co(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Nq(e);
}
function Nq(e) {
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
function sf(e) {
  return sf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, sf(e);
}
function Rq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ob(e, t);
}
function Ob(e, t) {
  return Ob = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Ob(e, t);
}
function Pu(e, t, n) {
  return t = EC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function EC(e) {
  var t = $q(e, "string");
  return Co(t) == "symbol" ? t : t + "";
}
function $q(e, t) {
  if (Co(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Co(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var zn = 32, Z0 = /* @__PURE__ */ (function(e) {
  function t() {
    return jq(this, t), Dq(this, t, arguments);
  }
  return Rq(t, e), Cq(t, [{
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
          return /* @__PURE__ */ L.createElement("line", {
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
          return /* @__PURE__ */ L.createElement("path", {
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
          return /* @__PURE__ */ L.createElement("path", {
            stroke: "none",
            fill: d,
            d: "M0,".concat(zn / 8, "h").concat(zn, "v").concat(zn * 3 / 4, "h").concat(-zn, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ L.isValidElement(r.legendIcon)) {
          var h = Eq({}, r);
          return delete h.legendIcon, /* @__PURE__ */ L.cloneElement(r.legendIcon, h);
        }
        return /* @__PURE__ */ L.createElement(pd, {
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
        var S = b.formatter || d, x = ze(Pu(Pu({
          "recharts-legend-item": !0
        }, "legend-item-".concat(_), !0), "inactive", b.inactive));
        if (b.type === "none")
          return null;
        var T = Ee(b.value) ? null : b.value;
        Ir(
          !Ee(b.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var E = b.inactive ? h : b.color;
        return /* @__PURE__ */ L.createElement("li", _b({
          className: x,
          style: v,
          key: "legend-item-".concat(_)
        }, Cu(r.props, b, _)), /* @__PURE__ */ L.createElement(vb, {
          width: c,
          height: c,
          viewBox: y,
          style: g
        }, r.renderIcon(b)), /* @__PURE__ */ L.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: E
          }
        }, S ? S(T, b, _) : T));
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
      return /* @__PURE__ */ L.createElement("ul", {
        className: "recharts-default-legend",
        style: f
      }, this.renderItems());
    }
  }]);
})(te.PureComponent);
Pu(Z0, "displayName", "Legend");
Pu(Z0, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Sy, OA;
function zq() {
  if (OA) return Sy;
  OA = 1;
  var e = ld();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Sy = t, Sy;
}
var _y, wA;
function qq() {
  if (wA) return _y;
  wA = 1;
  function e(t) {
    var n = this.__data__, r = n.delete(t);
    return this.size = n.size, r;
  }
  return _y = e, _y;
}
var Oy, AA;
function kq() {
  if (AA) return Oy;
  AA = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Oy = e, Oy;
}
var wy, TA;
function Bq() {
  if (TA) return wy;
  TA = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return wy = e, wy;
}
var Ay, EA;
function Lq() {
  if (EA) return Ay;
  EA = 1;
  var e = ld(), t = I0(), n = H0(), r = 200;
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
  return Ay = o, Ay;
}
var Ty, jA;
function jC() {
  if (jA) return Ty;
  jA = 1;
  var e = ld(), t = zq(), n = qq(), r = kq(), o = Bq(), u = Lq();
  function c(f) {
    var d = this.__data__ = new e(f);
    this.size = d.size;
  }
  return c.prototype.clear = t, c.prototype.delete = n, c.prototype.get = r, c.prototype.has = o, c.prototype.set = u, Ty = c, Ty;
}
var Ey, MA;
function Uq() {
  if (MA) return Ey;
  MA = 1;
  var e = "__lodash_hash_undefined__";
  function t(n) {
    return this.__data__.set(n, e), this;
  }
  return Ey = t, Ey;
}
var jy, CA;
function Iq() {
  if (CA) return jy;
  CA = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return jy = e, jy;
}
var My, DA;
function MC() {
  if (DA) return My;
  DA = 1;
  var e = H0(), t = Uq(), n = Iq();
  function r(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.__data__ = new e(); ++u < c; )
      this.add(o[u]);
  }
  return r.prototype.add = r.prototype.push = t, r.prototype.has = n, My = r, My;
}
var Cy, PA;
function CC() {
  if (PA) return Cy;
  PA = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length; ++r < o; )
      if (n(t[r], r, t))
        return !0;
    return !1;
  }
  return Cy = e, Cy;
}
var Dy, NA;
function DC() {
  if (NA) return Dy;
  NA = 1;
  function e(t, n) {
    return t.has(n);
  }
  return Dy = e, Dy;
}
var Py, RA;
function PC() {
  if (RA) return Py;
  RA = 1;
  var e = MC(), t = CC(), n = DC(), r = 1, o = 2;
  function u(c, f, d, h, y, v) {
    var g = d & r, b = c.length, _ = f.length;
    if (b != _ && !(g && _ > b))
      return !1;
    var S = v.get(c), x = v.get(f);
    if (S && x)
      return S == f && x == c;
    var T = -1, E = !0, C = d & o ? new e() : void 0;
    for (v.set(c, f), v.set(f, c); ++T < b; ) {
      var j = c[T], w = f[T];
      if (h)
        var A = g ? h(w, j, T, f, c, v) : h(j, w, T, c, f, v);
      if (A !== void 0) {
        if (A)
          continue;
        E = !1;
        break;
      }
      if (C) {
        if (!t(f, function(M, N) {
          if (!n(C, N) && (j === M || y(j, M, d, h, v)))
            return C.push(N);
        })) {
          E = !1;
          break;
        }
      } else if (!(j === w || y(j, w, d, h, v))) {
        E = !1;
        break;
      }
    }
    return v.delete(c), v.delete(f), E;
  }
  return Py = u, Py;
}
var Ny, $A;
function Hq() {
  if ($A) return Ny;
  $A = 1;
  var e = yr(), t = e.Uint8Array;
  return Ny = t, Ny;
}
var Ry, zA;
function Gq() {
  if (zA) return Ry;
  zA = 1;
  function e(t) {
    var n = -1, r = Array(t.size);
    return t.forEach(function(o, u) {
      r[++n] = [u, o];
    }), r;
  }
  return Ry = e, Ry;
}
var $y, qA;
function Q0() {
  if (qA) return $y;
  qA = 1;
  function e(t) {
    var n = -1, r = Array(t.size);
    return t.forEach(function(o) {
      r[++n] = o;
    }), r;
  }
  return $y = e, $y;
}
var zy, kA;
function Yq() {
  if (kA) return zy;
  kA = 1;
  var e = dc(), t = Hq(), n = U0(), r = PC(), o = Gq(), u = Q0(), c = 1, f = 2, d = "[object Boolean]", h = "[object Date]", y = "[object Error]", v = "[object Map]", g = "[object Number]", b = "[object RegExp]", _ = "[object Set]", S = "[object String]", x = "[object Symbol]", T = "[object ArrayBuffer]", E = "[object DataView]", C = e ? e.prototype : void 0, j = C ? C.valueOf : void 0;
  function w(A, M, N, z, I, B, k) {
    switch (N) {
      case E:
        if (A.byteLength != M.byteLength || A.byteOffset != M.byteOffset)
          return !1;
        A = A.buffer, M = M.buffer;
      case T:
        return !(A.byteLength != M.byteLength || !B(new t(A), new t(M)));
      case d:
      case h:
      case g:
        return n(+A, +M);
      case y:
        return A.name == M.name && A.message == M.message;
      case b:
      case S:
        return A == M + "";
      case v:
        var V = o;
      case _:
        var Q = z & c;
        if (V || (V = u), A.size != M.size && !Q)
          return !1;
        var K = k.get(A);
        if (K)
          return K == M;
        z |= f, k.set(A, M);
        var R = r(V(A), V(M), z, I, B, k);
        return k.delete(A), R;
      case x:
        if (j)
          return j.call(A) == j.call(M);
    }
    return !1;
  }
  return zy = w, zy;
}
var qy, BA;
function NC() {
  if (BA) return qy;
  BA = 1;
  function e(t, n) {
    for (var r = -1, o = n.length, u = t.length; ++r < o; )
      t[u + r] = n[r];
    return t;
  }
  return qy = e, qy;
}
var ky, LA;
function Kq() {
  if (LA) return ky;
  LA = 1;
  var e = NC(), t = an();
  function n(r, o, u) {
    var c = o(r);
    return t(r) ? c : e(c, u(r));
  }
  return ky = n, ky;
}
var By, UA;
function Xq() {
  if (UA) return By;
  UA = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length, u = 0, c = []; ++r < o; ) {
      var f = t[r];
      n(f, r, t) && (c[u++] = f);
    }
    return c;
  }
  return By = e, By;
}
var Ly, IA;
function Vq() {
  if (IA) return Ly;
  IA = 1;
  function e() {
    return [];
  }
  return Ly = e, Ly;
}
var Uy, HA;
function Fq() {
  if (HA) return Uy;
  HA = 1;
  var e = Xq(), t = Vq(), n = Object.prototype, r = n.propertyIsEnumerable, o = Object.getOwnPropertySymbols, u = o ? function(c) {
    return c == null ? [] : (c = Object(c), e(o(c), function(f) {
      return r.call(c, f);
    }));
  } : t;
  return Uy = u, Uy;
}
var Iy, GA;
function Wq() {
  if (GA) return Iy;
  GA = 1;
  function e(t, n) {
    for (var r = -1, o = Array(t); ++r < t; )
      o[r] = n(r);
    return o;
  }
  return Iy = e, Iy;
}
var Hy, YA;
function Zq() {
  if (YA) return Hy;
  YA = 1;
  var e = Vr(), t = Fr(), n = "[object Arguments]";
  function r(o) {
    return t(o) && e(o) == n;
  }
  return Hy = r, Hy;
}
var Gy, KA;
function J0() {
  if (KA) return Gy;
  KA = 1;
  var e = Zq(), t = Fr(), n = Object.prototype, r = n.hasOwnProperty, o = n.propertyIsEnumerable, u = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(c) {
    return t(c) && r.call(c, "callee") && !o.call(c, "callee");
  };
  return Gy = u, Gy;
}
var yu = { exports: {} }, Yy, XA;
function Qq() {
  if (XA) return Yy;
  XA = 1;
  function e() {
    return !1;
  }
  return Yy = e, Yy;
}
yu.exports;
var VA;
function RC() {
  return VA || (VA = 1, (function(e, t) {
    var n = yr(), r = Qq(), o = t && !t.nodeType && t, u = o && !0 && e && !e.nodeType && e, c = u && u.exports === o, f = c ? n.Buffer : void 0, d = f ? f.isBuffer : void 0, h = d || r;
    e.exports = h;
  })(yu, yu.exports)), yu.exports;
}
var Ky, FA;
function e1() {
  if (FA) return Ky;
  FA = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function n(r, o) {
    var u = typeof r;
    return o = o ?? e, !!o && (u == "number" || u != "symbol" && t.test(r)) && r > -1 && r % 1 == 0 && r < o;
  }
  return Ky = n, Ky;
}
var Xy, WA;
function t1() {
  if (WA) return Xy;
  WA = 1;
  var e = 9007199254740991;
  function t(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= e;
  }
  return Xy = t, Xy;
}
var Vy, ZA;
function Jq() {
  if (ZA) return Vy;
  ZA = 1;
  var e = Vr(), t = t1(), n = Fr(), r = "[object Arguments]", o = "[object Array]", u = "[object Boolean]", c = "[object Date]", f = "[object Error]", d = "[object Function]", h = "[object Map]", y = "[object Number]", v = "[object Object]", g = "[object RegExp]", b = "[object Set]", _ = "[object String]", S = "[object WeakMap]", x = "[object ArrayBuffer]", T = "[object DataView]", E = "[object Float32Array]", C = "[object Float64Array]", j = "[object Int8Array]", w = "[object Int16Array]", A = "[object Int32Array]", M = "[object Uint8Array]", N = "[object Uint8ClampedArray]", z = "[object Uint16Array]", I = "[object Uint32Array]", B = {};
  B[E] = B[C] = B[j] = B[w] = B[A] = B[M] = B[N] = B[z] = B[I] = !0, B[r] = B[o] = B[x] = B[u] = B[T] = B[c] = B[f] = B[d] = B[h] = B[y] = B[v] = B[g] = B[b] = B[_] = B[S] = !1;
  function k(V) {
    return n(V) && t(V.length) && !!B[e(V)];
  }
  return Vy = k, Vy;
}
var Fy, QA;
function $C() {
  if (QA) return Fy;
  QA = 1;
  function e(t) {
    return function(n) {
      return t(n);
    };
  }
  return Fy = e, Fy;
}
var mu = { exports: {} };
mu.exports;
var JA;
function ek() {
  return JA || (JA = 1, (function(e, t) {
    var n = eC(), r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, u = o && o.exports === r, c = u && n.process, f = (function() {
      try {
        var d = o && o.require && o.require("util").types;
        return d || c && c.binding && c.binding("util");
      } catch {
      }
    })();
    e.exports = f;
  })(mu, mu.exports)), mu.exports;
}
var Wy, eT;
function zC() {
  if (eT) return Wy;
  eT = 1;
  var e = Jq(), t = $C(), n = ek(), r = n && n.isTypedArray, o = r ? t(r) : e;
  return Wy = o, Wy;
}
var Zy, tT;
function tk() {
  if (tT) return Zy;
  tT = 1;
  var e = Wq(), t = J0(), n = an(), r = RC(), o = e1(), u = zC(), c = Object.prototype, f = c.hasOwnProperty;
  function d(h, y) {
    var v = n(h), g = !v && t(h), b = !v && !g && r(h), _ = !v && !g && !b && u(h), S = v || g || b || _, x = S ? e(h.length, String) : [], T = x.length;
    for (var E in h)
      (y || f.call(h, E)) && !(S && // Safari 9 has enumerable `arguments.length` in strict mode.
      (E == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      b && (E == "offset" || E == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      _ && (E == "buffer" || E == "byteLength" || E == "byteOffset") || // Skip index properties.
      o(E, T))) && x.push(E);
    return x;
  }
  return Zy = d, Zy;
}
var Qy, nT;
function nk() {
  if (nT) return Qy;
  nT = 1;
  var e = Object.prototype;
  function t(n) {
    var r = n && n.constructor, o = typeof r == "function" && r.prototype || e;
    return n === o;
  }
  return Qy = t, Qy;
}
var Jy, rT;
function qC() {
  if (rT) return Jy;
  rT = 1;
  function e(t, n) {
    return function(r) {
      return t(n(r));
    };
  }
  return Jy = e, Jy;
}
var em, aT;
function rk() {
  if (aT) return em;
  aT = 1;
  var e = qC(), t = e(Object.keys, Object);
  return em = t, em;
}
var tm, iT;
function ak() {
  if (iT) return tm;
  iT = 1;
  var e = nk(), t = rk(), n = Object.prototype, r = n.hasOwnProperty;
  function o(u) {
    if (!e(u))
      return t(u);
    var c = [];
    for (var f in Object(u))
      r.call(u, f) && f != "constructor" && c.push(f);
    return c;
  }
  return tm = o, tm;
}
var nm, oT;
function hc() {
  if (oT) return nm;
  oT = 1;
  var e = L0(), t = t1();
  function n(r) {
    return r != null && t(r.length) && !e(r);
  }
  return nm = n, nm;
}
var rm, lT;
function vd() {
  if (lT) return rm;
  lT = 1;
  var e = tk(), t = ak(), n = hc();
  function r(o) {
    return n(o) ? e(o) : t(o);
  }
  return rm = r, rm;
}
var am, uT;
function ik() {
  if (uT) return am;
  uT = 1;
  var e = Kq(), t = Fq(), n = vd();
  function r(o) {
    return e(o, n, t);
  }
  return am = r, am;
}
var im, cT;
function ok() {
  if (cT) return im;
  cT = 1;
  var e = ik(), t = 1, n = Object.prototype, r = n.hasOwnProperty;
  function o(u, c, f, d, h, y) {
    var v = f & t, g = e(u), b = g.length, _ = e(c), S = _.length;
    if (b != S && !v)
      return !1;
    for (var x = b; x--; ) {
      var T = g[x];
      if (!(v ? T in c : r.call(c, T)))
        return !1;
    }
    var E = y.get(u), C = y.get(c);
    if (E && C)
      return E == c && C == u;
    var j = !0;
    y.set(u, c), y.set(c, u);
    for (var w = v; ++x < b; ) {
      T = g[x];
      var A = u[T], M = c[T];
      if (d)
        var N = v ? d(M, A, T, c, u, y) : d(A, M, T, u, c, y);
      if (!(N === void 0 ? A === M || h(A, M, f, d, y) : N)) {
        j = !1;
        break;
      }
      w || (w = T == "constructor");
    }
    if (j && !w) {
      var z = u.constructor, I = c.constructor;
      z != I && "constructor" in u && "constructor" in c && !(typeof z == "function" && z instanceof z && typeof I == "function" && I instanceof I) && (j = !1);
    }
    return y.delete(u), y.delete(c), j;
  }
  return im = o, im;
}
var om, sT;
function lk() {
  if (sT) return om;
  sT = 1;
  var e = bi(), t = yr(), n = e(t, "DataView");
  return om = n, om;
}
var lm, fT;
function uk() {
  if (fT) return lm;
  fT = 1;
  var e = bi(), t = yr(), n = e(t, "Promise");
  return lm = n, lm;
}
var um, dT;
function kC() {
  if (dT) return um;
  dT = 1;
  var e = bi(), t = yr(), n = e(t, "Set");
  return um = n, um;
}
var cm, hT;
function ck() {
  if (hT) return cm;
  hT = 1;
  var e = bi(), t = yr(), n = e(t, "WeakMap");
  return cm = n, cm;
}
var sm, pT;
function sk() {
  if (pT) return sm;
  pT = 1;
  var e = lk(), t = I0(), n = uk(), r = kC(), o = ck(), u = Vr(), c = tC(), f = "[object Map]", d = "[object Object]", h = "[object Promise]", y = "[object Set]", v = "[object WeakMap]", g = "[object DataView]", b = c(e), _ = c(t), S = c(n), x = c(r), T = c(o), E = u;
  return (e && E(new e(new ArrayBuffer(1))) != g || t && E(new t()) != f || n && E(n.resolve()) != h || r && E(new r()) != y || o && E(new o()) != v) && (E = function(C) {
    var j = u(C), w = j == d ? C.constructor : void 0, A = w ? c(w) : "";
    if (A)
      switch (A) {
        case b:
          return g;
        case _:
          return f;
        case S:
          return h;
        case x:
          return y;
        case T:
          return v;
      }
    return j;
  }), sm = E, sm;
}
var fm, vT;
function fk() {
  if (vT) return fm;
  vT = 1;
  var e = jC(), t = PC(), n = Yq(), r = ok(), o = sk(), u = an(), c = RC(), f = zC(), d = 1, h = "[object Arguments]", y = "[object Array]", v = "[object Object]", g = Object.prototype, b = g.hasOwnProperty;
  function _(S, x, T, E, C, j) {
    var w = u(S), A = u(x), M = w ? y : o(S), N = A ? y : o(x);
    M = M == h ? v : M, N = N == h ? v : N;
    var z = M == v, I = N == v, B = M == N;
    if (B && c(S)) {
      if (!c(x))
        return !1;
      w = !0, z = !1;
    }
    if (B && !z)
      return j || (j = new e()), w || f(S) ? t(S, x, T, E, C, j) : n(S, x, M, T, E, C, j);
    if (!(T & d)) {
      var k = z && b.call(S, "__wrapped__"), V = I && b.call(x, "__wrapped__");
      if (k || V) {
        var Q = k ? S.value() : S, K = V ? x.value() : x;
        return j || (j = new e()), C(Q, K, T, E, j);
      }
    }
    return B ? (j || (j = new e()), r(S, x, T, E, C, j)) : !1;
  }
  return fm = _, fm;
}
var dm, yT;
function n1() {
  if (yT) return dm;
  yT = 1;
  var e = fk(), t = Fr();
  function n(r, o, u, c, f) {
    return r === o ? !0 : r == null || o == null || !t(r) && !t(o) ? r !== r && o !== o : e(r, o, u, c, n, f);
  }
  return dm = n, dm;
}
var hm, mT;
function dk() {
  if (mT) return hm;
  mT = 1;
  var e = jC(), t = n1(), n = 1, r = 2;
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
          var T = d(_, S, b, u, c, x);
        if (!(T === void 0 ? t(S, _, n | r, d, x) : T))
          return !1;
      }
    }
    return !0;
  }
  return hm = o, hm;
}
var pm, gT;
function BC() {
  if (gT) return pm;
  gT = 1;
  var e = Da();
  function t(n) {
    return n === n && !e(n);
  }
  return pm = t, pm;
}
var vm, bT;
function hk() {
  if (bT) return vm;
  bT = 1;
  var e = BC(), t = vd();
  function n(r) {
    for (var o = t(r), u = o.length; u--; ) {
      var c = o[u], f = r[c];
      o[u] = [c, f, e(f)];
    }
    return o;
  }
  return vm = n, vm;
}
var ym, xT;
function LC() {
  if (xT) return ym;
  xT = 1;
  function e(t, n) {
    return function(r) {
      return r == null ? !1 : r[t] === n && (n !== void 0 || t in Object(r));
    };
  }
  return ym = e, ym;
}
var mm, ST;
function pk() {
  if (ST) return mm;
  ST = 1;
  var e = dk(), t = hk(), n = LC();
  function r(o) {
    var u = t(o);
    return u.length == 1 && u[0][2] ? n(u[0][0], u[0][1]) : function(c) {
      return c === o || e(c, o, u);
    };
  }
  return mm = r, mm;
}
var gm, _T;
function vk() {
  if (_T) return gm;
  _T = 1;
  function e(t, n) {
    return t != null && n in Object(t);
  }
  return gm = e, gm;
}
var bm, OT;
function yk() {
  if (OT) return bm;
  OT = 1;
  var e = aC(), t = J0(), n = an(), r = e1(), o = t1(), u = cd();
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
  return bm = c, bm;
}
var xm, wT;
function mk() {
  if (wT) return xm;
  wT = 1;
  var e = vk(), t = yk();
  function n(r, o) {
    return r != null && t(r, o, e);
  }
  return xm = n, xm;
}
var Sm, AT;
function gk() {
  if (AT) return Sm;
  AT = 1;
  var e = n1(), t = iC(), n = mk(), r = B0(), o = BC(), u = LC(), c = cd(), f = 1, d = 2;
  function h(y, v) {
    return r(y) && o(v) ? u(c(y), v) : function(g) {
      var b = t(g, y);
      return b === void 0 && b === v ? n(g, y) : e(v, b, f | d);
    };
  }
  return Sm = h, Sm;
}
var _m, TT;
function ol() {
  if (TT) return _m;
  TT = 1;
  function e(t) {
    return t;
  }
  return _m = e, _m;
}
var Om, ET;
function bk() {
  if (ET) return Om;
  ET = 1;
  function e(t) {
    return function(n) {
      return n == null ? void 0 : n[t];
    };
  }
  return Om = e, Om;
}
var wm, jT;
function xk() {
  if (jT) return wm;
  jT = 1;
  var e = Y0();
  function t(n) {
    return function(r) {
      return e(r, n);
    };
  }
  return wm = t, wm;
}
var Am, MT;
function Sk() {
  if (MT) return Am;
  MT = 1;
  var e = bk(), t = xk(), n = B0(), r = cd();
  function o(u) {
    return n(u) ? e(r(u)) : t(u);
  }
  return Am = o, Am;
}
var Tm, CT;
function Pa() {
  if (CT) return Tm;
  CT = 1;
  var e = pk(), t = gk(), n = ol(), r = an(), o = Sk();
  function u(c) {
    return typeof c == "function" ? c : c == null ? n : typeof c == "object" ? r(c) ? t(c[0], c[1]) : e(c) : o(c);
  }
  return Tm = u, Tm;
}
var Em, DT;
function UC() {
  if (DT) return Em;
  DT = 1;
  function e(t, n, r, o) {
    for (var u = t.length, c = r + (o ? 1 : -1); o ? c-- : ++c < u; )
      if (n(t[c], c, t))
        return c;
    return -1;
  }
  return Em = e, Em;
}
var jm, PT;
function _k() {
  if (PT) return jm;
  PT = 1;
  function e(t) {
    return t !== t;
  }
  return jm = e, jm;
}
var Mm, NT;
function Ok() {
  if (NT) return Mm;
  NT = 1;
  function e(t, n, r) {
    for (var o = r - 1, u = t.length; ++o < u; )
      if (t[o] === n)
        return o;
    return -1;
  }
  return Mm = e, Mm;
}
var Cm, RT;
function wk() {
  if (RT) return Cm;
  RT = 1;
  var e = UC(), t = _k(), n = Ok();
  function r(o, u, c) {
    return u === u ? n(o, u, c) : e(o, t, c);
  }
  return Cm = r, Cm;
}
var Dm, $T;
function Ak() {
  if ($T) return Dm;
  $T = 1;
  var e = wk();
  function t(n, r) {
    var o = n == null ? 0 : n.length;
    return !!o && e(n, r, 0) > -1;
  }
  return Dm = t, Dm;
}
var Pm, zT;
function Tk() {
  if (zT) return Pm;
  zT = 1;
  function e(t, n, r) {
    for (var o = -1, u = t == null ? 0 : t.length; ++o < u; )
      if (r(n, t[o]))
        return !0;
    return !1;
  }
  return Pm = e, Pm;
}
var Nm, qT;
function Ek() {
  if (qT) return Nm;
  qT = 1;
  function e() {
  }
  return Nm = e, Nm;
}
var Rm, kT;
function jk() {
  if (kT) return Rm;
  kT = 1;
  var e = kC(), t = Ek(), n = Q0(), r = 1 / 0, o = e && 1 / n(new e([, -0]))[1] == r ? function(u) {
    return new e(u);
  } : t;
  return Rm = o, Rm;
}
var $m, BT;
function Mk() {
  if (BT) return $m;
  BT = 1;
  var e = MC(), t = Ak(), n = Tk(), r = DC(), o = jk(), u = Q0(), c = 200;
  function f(d, h, y) {
    var v = -1, g = t, b = d.length, _ = !0, S = [], x = S;
    if (y)
      _ = !1, g = n;
    else if (b >= c) {
      var T = h ? null : o(d);
      if (T)
        return u(T);
      _ = !1, g = r, x = new e();
    } else
      x = h ? [] : S;
    e:
      for (; ++v < b; ) {
        var E = d[v], C = h ? h(E) : E;
        if (E = y || E !== 0 ? E : 0, _ && C === C) {
          for (var j = x.length; j--; )
            if (x[j] === C)
              continue e;
          h && x.push(C), S.push(E);
        } else g(x, C, y) || (x !== S && x.push(C), S.push(E));
      }
    return S;
  }
  return $m = f, $m;
}
var zm, LT;
function Ck() {
  if (LT) return zm;
  LT = 1;
  var e = Pa(), t = Mk();
  function n(r, o) {
    return r && r.length ? t(r, e(o, 2)) : [];
  }
  return zm = n, zm;
}
var Dk = Ck();
const UT = /* @__PURE__ */ tt(Dk);
function IC(e, t, n) {
  return t === !0 ? UT(e, n) : Ee(t) ? UT(e, t) : e;
}
function Do(e) {
  "@babel/helpers - typeof";
  return Do = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Do(e);
}
var Pk = ["ref"];
function IT(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function zr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? IT(Object(n), !0).forEach(function(r) {
      yd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : IT(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Nk(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function HT(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, GC(r.key), r);
  }
}
function Rk(e, t, n) {
  return t && HT(e.prototype, t), n && HT(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $k(e, t, n) {
  return t = ff(t), zk(e, HC() ? Reflect.construct(t, n || [], ff(e).constructor) : t.apply(e, n));
}
function zk(e, t) {
  if (t && (Do(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return qk(e);
}
function qk(e) {
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
function ff(e) {
  return ff = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ff(e);
}
function kk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && wb(e, t);
}
function wb(e, t) {
  return wb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, wb(e, t);
}
function yd(e, t, n) {
  return t = GC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function GC(e) {
  var t = Bk(e, "string");
  return Do(t) == "symbol" ? t : t + "";
}
function Bk(e, t) {
  if (Do(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Do(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Lk(e, t) {
  if (e == null) return {};
  var n = Uk(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Uk(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Ik(e) {
  return e.value;
}
function Hk(e, t) {
  if (/* @__PURE__ */ L.isValidElement(e))
    return /* @__PURE__ */ L.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ L.createElement(e, t);
  t.ref;
  var n = Lk(t, Pk);
  return /* @__PURE__ */ L.createElement(Z0, n);
}
var GT = 1, Ao = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    Nk(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = $k(this, t, [].concat(o)), yd(n, "lastBoundingBox", {
      width: -1,
      height: -1
    }), n;
  }
  return kk(t, e), Rk(t, [{
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
      o ? (Math.abs(o.width - this.lastBoundingBox.width) > GT || Math.abs(o.height - this.lastBoundingBox.height) > GT) && (this.lastBoundingBox.width = o.width, this.lastBoundingBox.height = o.height, r && r(o)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, r && r(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? zr({}, this.lastBoundingBox) : {
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
      return zr(zr({}, v), g);
    }
  }, {
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.content, c = o.width, f = o.height, d = o.wrapperStyle, h = o.payloadUniqBy, y = o.payload, v = zr(zr({
        position: "absolute",
        width: c || "auto",
        height: f || "auto"
      }, this.getDefaultPosition(d)), d);
      return /* @__PURE__ */ L.createElement("div", {
        className: "recharts-legend-wrapper",
        style: v,
        ref: function(b) {
          r.wrapperNode = b;
        }
      }, Hk(u, zr(zr({}, this.props), {}, {
        payload: IC(y, h, Ik)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(r, o) {
      var u = zr(zr({}, this.defaultProps), r.props), c = u.layout;
      return c === "vertical" && fe(r.props.height) ? {
        height: r.props.height
      } : c === "horizontal" ? {
        width: r.props.width || o
      } : null;
    }
  }]);
})(te.PureComponent);
yd(Ao, "displayName", "Legend");
yd(Ao, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var qm, YT;
function Gk() {
  if (YT) return qm;
  YT = 1;
  var e = dc(), t = J0(), n = an(), r = e ? e.isConcatSpreadable : void 0;
  function o(u) {
    return n(u) || t(u) || !!(r && u && u[r]);
  }
  return qm = o, qm;
}
var km, KT;
function YC() {
  if (KT) return km;
  KT = 1;
  var e = NC(), t = Gk();
  function n(r, o, u, c, f) {
    var d = -1, h = r.length;
    for (u || (u = t), f || (f = []); ++d < h; ) {
      var y = r[d];
      o > 0 && u(y) ? o > 1 ? n(y, o - 1, u, c, f) : e(f, y) : c || (f[f.length] = y);
    }
    return f;
  }
  return km = n, km;
}
var Bm, XT;
function Yk() {
  if (XT) return Bm;
  XT = 1;
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
  return Bm = e, Bm;
}
var Lm, VT;
function Kk() {
  if (VT) return Lm;
  VT = 1;
  var e = Yk(), t = e();
  return Lm = t, Lm;
}
var Um, FT;
function KC() {
  if (FT) return Um;
  FT = 1;
  var e = Kk(), t = vd();
  function n(r, o) {
    return r && e(r, o, t);
  }
  return Um = n, Um;
}
var Im, WT;
function Xk() {
  if (WT) return Im;
  WT = 1;
  var e = hc();
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
  return Im = t, Im;
}
var Hm, ZT;
function r1() {
  if (ZT) return Hm;
  ZT = 1;
  var e = KC(), t = Xk(), n = t(e);
  return Hm = n, Hm;
}
var Gm, QT;
function XC() {
  if (QT) return Gm;
  QT = 1;
  var e = r1(), t = hc();
  function n(r, o) {
    var u = -1, c = t(r) ? Array(r.length) : [];
    return e(r, function(f, d, h) {
      c[++u] = o(f, d, h);
    }), c;
  }
  return Gm = n, Gm;
}
var Ym, JT;
function Vk() {
  if (JT) return Ym;
  JT = 1;
  function e(t, n) {
    var r = t.length;
    for (t.sort(n); r--; )
      t[r] = t[r].value;
    return t;
  }
  return Ym = e, Ym;
}
var Km, eE;
function Fk() {
  if (eE) return Km;
  eE = 1;
  var e = rl();
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
  return Km = t, Km;
}
var Xm, tE;
function Wk() {
  if (tE) return Xm;
  tE = 1;
  var e = Fk();
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
  return Xm = t, Xm;
}
var Vm, nE;
function Zk() {
  if (nE) return Vm;
  nE = 1;
  var e = G0(), t = Y0(), n = Pa(), r = XC(), o = Vk(), u = $C(), c = Wk(), f = ol(), d = an();
  function h(y, v, g) {
    v.length ? v = e(v, function(S) {
      return d(S) ? function(x) {
        return t(x, S.length === 1 ? S[0] : S);
      } : S;
    }) : v = [f];
    var b = -1;
    v = e(v, u(n));
    var _ = r(y, function(S, x, T) {
      var E = e(v, function(C) {
        return C(S);
      });
      return { criteria: E, index: ++b, value: S };
    });
    return o(_, function(S, x) {
      return c(S, x, g);
    });
  }
  return Vm = h, Vm;
}
var Fm, rE;
function Qk() {
  if (rE) return Fm;
  rE = 1;
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
  return Fm = e, Fm;
}
var Wm, aE;
function Jk() {
  if (aE) return Wm;
  aE = 1;
  var e = Qk(), t = Math.max;
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
  return Wm = n, Wm;
}
var Zm, iE;
function eB() {
  if (iE) return Zm;
  iE = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Zm = e, Zm;
}
var Qm, oE;
function VC() {
  if (oE) return Qm;
  oE = 1;
  var e = bi(), t = (function() {
    try {
      var n = e(Object, "defineProperty");
      return n({}, "", {}), n;
    } catch {
    }
  })();
  return Qm = t, Qm;
}
var Jm, lE;
function tB() {
  if (lE) return Jm;
  lE = 1;
  var e = eB(), t = VC(), n = ol(), r = t ? function(o, u) {
    return t(o, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(u),
      writable: !0
    });
  } : n;
  return Jm = r, Jm;
}
var eg, uE;
function nB() {
  if (uE) return eg;
  uE = 1;
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
  return eg = r, eg;
}
var tg, cE;
function rB() {
  if (cE) return tg;
  cE = 1;
  var e = tB(), t = nB(), n = t(e);
  return tg = n, tg;
}
var ng, sE;
function aB() {
  if (sE) return ng;
  sE = 1;
  var e = ol(), t = Jk(), n = rB();
  function r(o, u) {
    return n(t(o, u, e), o + "");
  }
  return ng = r, ng;
}
var rg, fE;
function md() {
  if (fE) return rg;
  fE = 1;
  var e = U0(), t = hc(), n = e1(), r = Da();
  function o(u, c, f) {
    if (!r(f))
      return !1;
    var d = typeof c;
    return (d == "number" ? t(f) && n(c, f.length) : d == "string" && c in f) ? e(f[c], u) : !1;
  }
  return rg = o, rg;
}
var ag, dE;
function iB() {
  if (dE) return ag;
  dE = 1;
  var e = YC(), t = Zk(), n = aB(), r = md(), o = n(function(u, c) {
    if (u == null)
      return [];
    var f = c.length;
    return f > 1 && r(u, c[0], c[1]) ? c = [] : f > 2 && r(c[0], c[1], c[2]) && (c = [c[0]]), t(u, e(c, 1), []);
  });
  return ag = o, ag;
}
var oB = iB();
const a1 = /* @__PURE__ */ tt(oB);
function Nu(e) {
  "@babel/helpers - typeof";
  return Nu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Nu(e);
}
function Ab() {
  return Ab = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ab.apply(this, arguments);
}
function lB(e, t) {
  return fB(e) || sB(e, t) || cB(e, t) || uB();
}
function uB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cB(e, t) {
  if (e) {
    if (typeof e == "string") return hE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return hE(e, t);
  }
}
function hE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function sB(e, t) {
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
function fB(e) {
  if (Array.isArray(e)) return e;
}
function pE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ig(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pE(Object(n), !0).forEach(function(r) {
      dB(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function dB(e, t, n) {
  return t = hB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function hB(e) {
  var t = pB(e, "string");
  return Nu(t) == "symbol" ? t : t + "";
}
function pB(e, t) {
  if (Nu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Nu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function vB(e) {
  return Array.isArray(e) && Tt(e[0]) && Tt(e[1]) ? e.join(" ~ ") : e;
}
var yB = function(t) {
  var n = t.separator, r = n === void 0 ? " : " : n, o = t.contentStyle, u = o === void 0 ? {} : o, c = t.itemStyle, f = c === void 0 ? {} : c, d = t.labelStyle, h = d === void 0 ? {} : d, y = t.payload, v = t.formatter, g = t.itemSorter, b = t.wrapperClassName, _ = t.labelClassName, S = t.label, x = t.labelFormatter, T = t.accessibilityLayer, E = T === void 0 ? !1 : T, C = function() {
    if (y && y.length) {
      var k = {
        padding: 0,
        margin: 0
      }, V = (g ? a1(y, g) : y).map(function(Q, K) {
        if (Q.type === "none")
          return null;
        var R = ig({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: Q.color || "#000"
        }, f), Y = Q.formatter || v || vB, J = Q.value, G = Q.name, ee = J, P = G;
        if (Y && ee != null && P != null) {
          var U = Y(J, G, Q, K, y);
          if (Array.isArray(U)) {
            var re = lB(U, 2);
            ee = re[0], P = re[1];
          } else
            ee = U;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ L.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(K),
            style: R
          }, Tt(P) ? /* @__PURE__ */ L.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, P) : null, Tt(P) ? /* @__PURE__ */ L.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, r) : null, /* @__PURE__ */ L.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, ee), /* @__PURE__ */ L.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, Q.unit || ""))
        );
      });
      return /* @__PURE__ */ L.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: k
      }, V);
    }
    return null;
  }, j = ig({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, u), w = ig({
    margin: 0
  }, h), A = !we(S), M = A ? S : "", N = ze("recharts-default-tooltip", b), z = ze("recharts-tooltip-label", _);
  A && x && y !== void 0 && y !== null && (M = x(S, y));
  var I = E ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ L.createElement("div", Ab({
    className: N,
    style: j
  }, I), /* @__PURE__ */ L.createElement("p", {
    className: z,
    style: w
  }, /* @__PURE__ */ L.isValidElement(M) ? M : "".concat(M)), C());
};
function Ru(e) {
  "@babel/helpers - typeof";
  return Ru = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ru(e);
}
function ks(e, t, n) {
  return t = mB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function mB(e) {
  var t = gB(e, "string");
  return Ru(t) == "symbol" ? t : t + "";
}
function gB(e, t) {
  if (Ru(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ru(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ou = "recharts-tooltip-wrapper", bB = {
  visibility: "hidden"
};
function xB(e) {
  var t = e.coordinate, n = e.translateX, r = e.translateY;
  return ze(ou, ks(ks(ks(ks({}, "".concat(ou, "-right"), fe(n) && t && fe(t.x) && n >= t.x), "".concat(ou, "-left"), fe(n) && t && fe(t.x) && n < t.x), "".concat(ou, "-bottom"), fe(r) && t && fe(t.y) && r >= t.y), "".concat(ou, "-top"), fe(r) && t && fe(t.y) && r < t.y));
}
function vE(e) {
  var t = e.allowEscapeViewBox, n = e.coordinate, r = e.key, o = e.offsetTopLeft, u = e.position, c = e.reverseDirection, f = e.tooltipDimension, d = e.viewBox, h = e.viewBoxDimension;
  if (u && fe(u[r]))
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
function SB(e) {
  var t = e.translateX, n = e.translateY, r = e.useTranslate3d;
  return {
    transform: r ? "translate3d(".concat(t, "px, ").concat(n, "px, 0)") : "translate(".concat(t, "px, ").concat(n, "px)")
  };
}
function _B(e) {
  var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTopLeft, o = e.position, u = e.reverseDirection, c = e.tooltipBox, f = e.useTranslate3d, d = e.viewBox, h, y, v;
  return c.height > 0 && c.width > 0 && n ? (y = vE({
    allowEscapeViewBox: t,
    coordinate: n,
    key: "x",
    offsetTopLeft: r,
    position: o,
    reverseDirection: u,
    tooltipDimension: c.width,
    viewBox: d,
    viewBoxDimension: d.width
  }), v = vE({
    allowEscapeViewBox: t,
    coordinate: n,
    key: "y",
    offsetTopLeft: r,
    position: o,
    reverseDirection: u,
    tooltipDimension: c.height,
    viewBox: d,
    viewBoxDimension: d.height
  }), h = SB({
    translateX: y,
    translateY: v,
    useTranslate3d: f
  })) : h = bB, {
    cssProperties: h,
    cssClasses: xB({
      translateX: y,
      translateY: v,
      coordinate: n
    })
  };
}
function Po(e) {
  "@babel/helpers - typeof";
  return Po = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Po(e);
}
function yE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function mE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yE(Object(n), !0).forEach(function(r) {
      Eb(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function OB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wB(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, WC(r.key), r);
  }
}
function AB(e, t, n) {
  return t && wB(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function TB(e, t, n) {
  return t = df(t), EB(e, FC() ? Reflect.construct(t, n || [], df(e).constructor) : t.apply(e, n));
}
function EB(e, t) {
  if (t && (Po(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jB(e);
}
function jB(e) {
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
function df(e) {
  return df = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, df(e);
}
function MB(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Tb(e, t);
}
function Tb(e, t) {
  return Tb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Tb(e, t);
}
function Eb(e, t, n) {
  return t = WC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function WC(e) {
  var t = CB(e, "string");
  return Po(t) == "symbol" ? t : t + "";
}
function CB(e, t) {
  if (Po(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Po(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var gE = 1, DB = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    OB(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = TB(this, t, [].concat(o)), Eb(n, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), Eb(n, "handleKeyDown", function(c) {
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
  return MB(t, e), AB(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var r = this.wrapperNode.getBoundingClientRect();
        (Math.abs(r.width - this.state.lastBoundingBox.width) > gE || Math.abs(r.height - this.state.lastBoundingBox.height) > gE) && this.setState({
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
      var r = this, o = this.props, u = o.active, c = o.allowEscapeViewBox, f = o.animationDuration, d = o.animationEasing, h = o.children, y = o.coordinate, v = o.hasPayload, g = o.isAnimationActive, b = o.offset, _ = o.position, S = o.reverseDirection, x = o.useTranslate3d, T = o.viewBox, E = o.wrapperStyle, C = _B({
        allowEscapeViewBox: c,
        coordinate: y,
        offsetTopLeft: b,
        position: _,
        reverseDirection: S,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: x,
        viewBox: T
      }), j = C.cssClasses, w = C.cssProperties, A = mE(mE({
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
        /* @__PURE__ */ L.createElement("div", {
          tabIndex: -1,
          className: j,
          style: A,
          ref: function(N) {
            r.wrapperNode = N;
          }
        }, h)
      );
    }
  }]);
})(te.PureComponent), PB = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Na = {
  isSsr: PB()
};
function No(e) {
  "@babel/helpers - typeof";
  return No = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, No(e);
}
function bE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function xE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bE(Object(n), !0).forEach(function(r) {
      i1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function NB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function RB(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, QC(r.key), r);
  }
}
function $B(e, t, n) {
  return t && RB(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function zB(e, t, n) {
  return t = hf(t), qB(e, ZC() ? Reflect.construct(t, n || [], hf(e).constructor) : t.apply(e, n));
}
function qB(e, t) {
  if (t && (No(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kB(e);
}
function kB(e) {
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
function hf(e) {
  return hf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, hf(e);
}
function BB(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && jb(e, t);
}
function jb(e, t) {
  return jb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, jb(e, t);
}
function i1(e, t, n) {
  return t = QC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QC(e) {
  var t = LB(e, "string");
  return No(t) == "symbol" ? t : t + "";
}
function LB(e, t) {
  if (No(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (No(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function UB(e) {
  return e.dataKey;
}
function IB(e, t) {
  return /* @__PURE__ */ L.isValidElement(e) ? /* @__PURE__ */ L.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ L.createElement(e, t) : /* @__PURE__ */ L.createElement(yB, t);
}
var xn = /* @__PURE__ */ (function(e) {
  function t() {
    return NB(this, t), zB(this, t, arguments);
  }
  return BB(t, e), $B(t, [{
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.active, c = o.allowEscapeViewBox, f = o.animationDuration, d = o.animationEasing, h = o.content, y = o.coordinate, v = o.filterNull, g = o.isAnimationActive, b = o.offset, _ = o.payload, S = o.payloadUniqBy, x = o.position, T = o.reverseDirection, E = o.useTranslate3d, C = o.viewBox, j = o.wrapperStyle, w = _ ?? [];
      v && w.length && (w = IC(_.filter(function(M) {
        return M.value != null && (M.hide !== !0 || r.props.includeHidden);
      }), S, UB));
      var A = w.length > 0;
      return /* @__PURE__ */ L.createElement(DB, {
        allowEscapeViewBox: c,
        animationDuration: f,
        animationEasing: d,
        isAnimationActive: g,
        active: u,
        coordinate: y,
        hasPayload: A,
        offset: b,
        position: x,
        reverseDirection: T,
        useTranslate3d: E,
        viewBox: C,
        wrapperStyle: j
      }, IB(h, xE(xE({}, this.props), {}, {
        payload: w
      })));
    }
  }]);
})(te.PureComponent);
i1(xn, "displayName", "Tooltip");
i1(xn, "defaultProps", {
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
var og, SE;
function HB() {
  if (SE) return og;
  SE = 1;
  var e = yr(), t = function() {
    return e.Date.now();
  };
  return og = t, og;
}
var lg, _E;
function GB() {
  if (_E) return lg;
  _E = 1;
  var e = /\s/;
  function t(n) {
    for (var r = n.length; r-- && e.test(n.charAt(r)); )
      ;
    return r;
  }
  return lg = t, lg;
}
var ug, OE;
function YB() {
  if (OE) return ug;
  OE = 1;
  var e = GB(), t = /^\s+/;
  function n(r) {
    return r && r.slice(0, e(r) + 1).replace(t, "");
  }
  return ug = n, ug;
}
var cg, wE;
function JC() {
  if (wE) return cg;
  wE = 1;
  var e = YB(), t = Da(), n = rl(), r = NaN, o = /^[-+]0x[0-9a-f]+$/i, u = /^0b[01]+$/i, c = /^0o[0-7]+$/i, f = parseInt;
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
  return cg = d, cg;
}
var sg, AE;
function KB() {
  if (AE) return sg;
  AE = 1;
  var e = Da(), t = HB(), n = JC(), r = "Expected a function", o = Math.max, u = Math.min;
  function c(f, d, h) {
    var y, v, g, b, _, S, x = 0, T = !1, E = !1, C = !0;
    if (typeof f != "function")
      throw new TypeError(r);
    d = n(d) || 0, e(h) && (T = !!h.leading, E = "maxWait" in h, g = E ? o(n(h.maxWait) || 0, d) : g, C = "trailing" in h ? !!h.trailing : C);
    function j(V) {
      var Q = y, K = v;
      return y = v = void 0, x = V, b = f.apply(K, Q), b;
    }
    function w(V) {
      return x = V, _ = setTimeout(N, d), T ? j(V) : b;
    }
    function A(V) {
      var Q = V - S, K = V - x, R = d - Q;
      return E ? u(R, g - K) : R;
    }
    function M(V) {
      var Q = V - S, K = V - x;
      return S === void 0 || Q >= d || Q < 0 || E && K >= g;
    }
    function N() {
      var V = t();
      if (M(V))
        return z(V);
      _ = setTimeout(N, A(V));
    }
    function z(V) {
      return _ = void 0, C && y ? j(V) : (y = v = void 0, b);
    }
    function I() {
      _ !== void 0 && clearTimeout(_), x = 0, y = S = v = _ = void 0;
    }
    function B() {
      return _ === void 0 ? b : z(t());
    }
    function k() {
      var V = t(), Q = M(V);
      if (y = arguments, v = this, S = V, Q) {
        if (_ === void 0)
          return w(S);
        if (E)
          return clearTimeout(_), _ = setTimeout(N, d), j(S);
      }
      return _ === void 0 && (_ = setTimeout(N, d)), b;
    }
    return k.cancel = I, k.flush = B, k;
  }
  return sg = c, sg;
}
var fg, TE;
function XB() {
  if (TE) return fg;
  TE = 1;
  var e = KB(), t = Da(), n = "Expected a function";
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
  return fg = r, fg;
}
var VB = XB();
const eD = /* @__PURE__ */ tt(VB);
function $u(e) {
  "@babel/helpers - typeof";
  return $u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $u(e);
}
function EE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Bs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? EE(Object(n), !0).forEach(function(r) {
      FB(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function FB(e, t, n) {
  return t = WB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function WB(e) {
  var t = ZB(e, "string");
  return $u(t) == "symbol" ? t : t + "";
}
function ZB(e, t) {
  if ($u(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if ($u(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function QB(e, t) {
  return n8(e) || t8(e, t) || e8(e, t) || JB();
}
function JB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function e8(e, t) {
  if (e) {
    if (typeof e == "string") return jE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return jE(e, t);
  }
}
function jE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function t8(e, t) {
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
function n8(e) {
  if (Array.isArray(e)) return e;
}
var Ls = /* @__PURE__ */ te.forwardRef(function(e, t) {
  var n = e.aspect, r = e.initialDimension, o = r === void 0 ? {
    width: -1,
    height: -1
  } : r, u = e.width, c = u === void 0 ? "100%" : u, f = e.height, d = f === void 0 ? "100%" : f, h = e.minWidth, y = h === void 0 ? 0 : h, v = e.minHeight, g = e.maxHeight, b = e.children, _ = e.debounce, S = _ === void 0 ? 0 : _, x = e.id, T = e.className, E = e.onResize, C = e.style, j = C === void 0 ? {} : C, w = te.useRef(null), A = te.useRef();
  A.current = E, te.useImperativeHandle(t, function() {
    return Object.defineProperty(w.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), w.current;
      },
      configurable: !0
    });
  });
  var M = te.useState({
    containerWidth: o.width,
    containerHeight: o.height
  }), N = QB(M, 2), z = N[0], I = N[1], B = te.useCallback(function(V, Q) {
    I(function(K) {
      var R = Math.round(V), Y = Math.round(Q);
      return K.containerWidth === R && K.containerHeight === Y ? K : {
        containerWidth: R,
        containerHeight: Y
      };
    });
  }, []);
  te.useEffect(function() {
    var V = function(G) {
      var ee, P = G[0].contentRect, U = P.width, re = P.height;
      B(U, re), (ee = A.current) === null || ee === void 0 || ee.call(A, U, re);
    };
    S > 0 && (V = eD(V, S, {
      trailing: !0,
      leading: !1
    }));
    var Q = new ResizeObserver(V), K = w.current.getBoundingClientRect(), R = K.width, Y = K.height;
    return B(R, Y), Q.observe(w.current), function() {
      Q.disconnect();
    };
  }, [B, S]);
  var k = te.useMemo(function() {
    var V = z.containerWidth, Q = z.containerHeight;
    if (V < 0 || Q < 0)
      return null;
    Ir(ii(c) || ii(d), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, c, d), Ir(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
    var K = ii(c) ? V : c, R = ii(d) ? Q : d;
    n && n > 0 && (K ? R = K / n : R && (K = R * n), g && R > g && (R = g)), Ir(K > 0 || R > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, K, R, c, d, y, v, n);
    var Y = !Array.isArray(b) && Ur(b.type).endsWith("Chart");
    return L.Children.map(b, function(J) {
      return /* @__PURE__ */ L.isValidElement(J) ? /* @__PURE__ */ te.cloneElement(J, Bs({
        width: K,
        height: R
      }, Y ? {
        style: Bs({
          height: "100%",
          width: "100%",
          maxHeight: R,
          maxWidth: K
        }, J.props.style)
      } : {})) : J;
    });
  }, [n, b, d, g, v, y, z, c]);
  return /* @__PURE__ */ L.createElement("div", {
    id: x ? "".concat(x) : void 0,
    className: ze("recharts-responsive-container", T),
    style: Bs(Bs({}, j), {}, {
      width: c,
      height: d,
      minWidth: y,
      minHeight: v,
      maxHeight: g
    }),
    ref: w
  }, k);
}), gd = function(t) {
  return null;
};
gd.displayName = "Cell";
function zu(e) {
  "@babel/helpers - typeof";
  return zu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zu(e);
}
function ME(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Mb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ME(Object(n), !0).forEach(function(r) {
      r8(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ME(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function r8(e, t, n) {
  return t = a8(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function a8(e) {
  var t = i8(e, "string");
  return zu(t) == "symbol" ? t : t + "";
}
function i8(e, t) {
  if (zu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (zu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var po = {
  widthCache: {},
  cacheCount: 0
}, o8 = 2e3, l8 = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, CE = "recharts_measurement_span";
function u8(e) {
  var t = Mb({}, e);
  return Object.keys(t).forEach(function(n) {
    t[n] || delete t[n];
  }), t;
}
var xu = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Na.isSsr)
    return {
      width: 0,
      height: 0
    };
  var r = u8(n), o = JSON.stringify({
    text: t,
    copyStyle: r
  });
  if (po.widthCache[o])
    return po.widthCache[o];
  try {
    var u = document.getElementById(CE);
    u || (u = document.createElement("span"), u.setAttribute("id", CE), u.setAttribute("aria-hidden", "true"), document.body.appendChild(u));
    var c = Mb(Mb({}, l8), r);
    Object.assign(u.style, c), u.textContent = "".concat(t);
    var f = u.getBoundingClientRect(), d = {
      width: f.width,
      height: f.height
    };
    return po.widthCache[o] = d, ++po.cacheCount > o8 && (po.cacheCount = 0, po.widthCache = {}), d;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, c8 = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function qu(e) {
  "@babel/helpers - typeof";
  return qu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qu(e);
}
function pf(e, t) {
  return h8(e) || d8(e, t) || f8(e, t) || s8();
}
function s8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function f8(e, t) {
  if (e) {
    if (typeof e == "string") return DE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DE(e, t);
  }
}
function DE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function d8(e, t) {
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
function h8(e) {
  if (Array.isArray(e)) return e;
}
function p8(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function PE(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, y8(r.key), r);
  }
}
function v8(e, t, n) {
  return t && PE(e.prototype, t), n && PE(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function y8(e) {
  var t = m8(e, "string");
  return qu(t) == "symbol" ? t : t + "";
}
function m8(e, t) {
  if (qu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (qu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var NE = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, RE = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, g8 = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, b8 = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, tD = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, x8 = Object.keys(tD), So = "NaN";
function S8(e, t) {
  return e * tD[t];
}
var Us = /* @__PURE__ */ (function() {
  function e(t, n) {
    p8(this, e), this.num = t, this.unit = n, this.num = t, this.unit = n, Number.isNaN(t) && (this.unit = ""), n !== "" && !g8.test(n) && (this.num = NaN, this.unit = ""), x8.includes(n) && (this.num = S8(t, n), this.unit = "px");
  }
  return v8(e, [{
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
      var r, o = (r = b8.exec(n)) !== null && r !== void 0 ? r : [], u = pf(o, 3), c = u[1], f = u[2];
      return new e(parseFloat(c), f ?? "");
    }
  }]);
})();
function nD(e) {
  if (e.includes(So))
    return So;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var n, r = (n = NE.exec(t)) !== null && n !== void 0 ? n : [], o = pf(r, 4), u = o[1], c = o[2], f = o[3], d = Us.parse(u ?? ""), h = Us.parse(f ?? ""), y = c === "*" ? d.multiply(h) : d.divide(h);
    if (y.isNaN())
      return So;
    t = t.replace(NE, y.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var v, g = (v = RE.exec(t)) !== null && v !== void 0 ? v : [], b = pf(g, 4), _ = b[1], S = b[2], x = b[3], T = Us.parse(_ ?? ""), E = Us.parse(x ?? ""), C = S === "+" ? T.add(E) : T.subtract(E);
    if (C.isNaN())
      return So;
    t = t.replace(RE, C.toString());
  }
  return t;
}
var $E = /\(([^()]*)\)/;
function _8(e) {
  for (var t = e; t.includes("("); ) {
    var n = $E.exec(t), r = pf(n, 2), o = r[1];
    t = t.replace($E, nD(o));
  }
  return t;
}
function O8(e) {
  var t = e.replace(/\s+/g, "");
  return t = _8(t), t = nD(t), t;
}
function w8(e) {
  try {
    return O8(e);
  } catch {
    return So;
  }
}
function dg(e) {
  var t = w8(e.slice(5, -1));
  return t === So ? "" : t;
}
var A8 = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], T8 = ["dx", "dy", "angle", "className", "breakAll"];
function Cb() {
  return Cb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Cb.apply(this, arguments);
}
function zE(e, t) {
  if (e == null) return {};
  var n = E8(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function E8(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function qE(e, t) {
  return D8(e) || C8(e, t) || M8(e, t) || j8();
}
function j8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function M8(e, t) {
  if (e) {
    if (typeof e == "string") return kE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return kE(e, t);
  }
}
function kE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function C8(e, t) {
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
function D8(e) {
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
        width: xu(d, o).width
      };
    }), f = r ? 0 : xu(" ", o).width;
    return {
      wordsWithComputedWidth: c,
      spaceWidth: f
    };
  } catch {
    return null;
  }
}, P8 = function(t, n, r, o, u) {
  var c = t.maxLines, f = t.children, d = t.style, h = t.breakAll, y = fe(c), v = f, g = function() {
    var K = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return K.reduce(function(R, Y) {
      var J = Y.word, G = Y.width, ee = R[R.length - 1];
      if (ee && (o == null || u || ee.width + G + r < Number(o)))
        ee.words.push(J), ee.width += G + r;
      else {
        var P = {
          words: [J],
          width: G
        };
        R.push(P);
      }
      return R;
    }, []);
  }, b = g(n), _ = function(K) {
    return K.reduce(function(R, Y) {
      return R.width > Y.width ? R : Y;
    });
  };
  if (!y)
    return b;
  for (var S = "…", x = function(K) {
    var R = v.slice(0, K), Y = aD({
      breakAll: h,
      style: d,
      children: R + S
    }).wordsWithComputedWidth, J = g(Y), G = J.length > c || _(J).width > Number(o);
    return [G, J];
  }, T = 0, E = v.length - 1, C = 0, j; T <= E && C <= v.length - 1; ) {
    var w = Math.floor((T + E) / 2), A = w - 1, M = x(A), N = qE(M, 2), z = N[0], I = N[1], B = x(w), k = qE(B, 1), V = k[0];
    if (!z && !V && (T = w + 1), z && V && (E = w - 1), !z && V) {
      j = I;
      break;
    }
    C++;
  }
  return j || b;
}, BE = function(t) {
  var n = we(t) ? [] : t.toString().split(rD);
  return [{
    words: n
  }];
}, N8 = function(t) {
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
      return BE(o);
    return P8({
      breakAll: c,
      children: o,
      maxLines: f,
      style: u
    }, d, h, n, r);
  }
  return BE(o);
}, LE = "#808080", vf = function(t) {
  var n = t.x, r = n === void 0 ? 0 : n, o = t.y, u = o === void 0 ? 0 : o, c = t.lineHeight, f = c === void 0 ? "1em" : c, d = t.capHeight, h = d === void 0 ? "0.71em" : d, y = t.scaleToFit, v = y === void 0 ? !1 : y, g = t.textAnchor, b = g === void 0 ? "start" : g, _ = t.verticalAnchor, S = _ === void 0 ? "end" : _, x = t.fill, T = x === void 0 ? LE : x, E = zE(t, A8), C = te.useMemo(function() {
    return N8({
      breakAll: E.breakAll,
      children: E.children,
      maxLines: E.maxLines,
      scaleToFit: v,
      style: E.style,
      width: E.width
    });
  }, [E.breakAll, E.children, E.maxLines, v, E.style, E.width]), j = E.dx, w = E.dy, A = E.angle, M = E.className, N = E.breakAll, z = zE(E, T8);
  if (!Tt(r) || !Tt(u))
    return null;
  var I = r + (fe(j) ? j : 0), B = u + (fe(w) ? w : 0), k;
  switch (S) {
    case "start":
      k = dg("calc(".concat(h, ")"));
      break;
    case "middle":
      k = dg("calc(".concat((C.length - 1) / 2, " * -").concat(f, " + (").concat(h, " / 2))"));
      break;
    default:
      k = dg("calc(".concat(C.length - 1, " * -").concat(f, ")"));
      break;
  }
  var V = [];
  if (v) {
    var Q = C[0].width, K = E.width;
    V.push("scale(".concat((fe(K) ? K / Q : 1) / Q, ")"));
  }
  return A && V.push("rotate(".concat(A, ", ").concat(I, ", ").concat(B, ")")), V.length && (z.transform = V.join(" ")), /* @__PURE__ */ L.createElement("text", Cb({}, Te(z, !0), {
    x: I,
    y: B,
    className: ze("recharts-text", M),
    textAnchor: b,
    fill: T.includes("url") ? LE : T
  }), C.map(function(R, Y) {
    var J = R.words.join(N ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ L.createElement("tspan", {
        x: I,
        dy: Y === 0 ? k : f,
        key: "".concat(J, "-").concat(Y)
      }, J)
    );
  }));
};
function Ca(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function R8(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function o1(e) {
  let t, n, r;
  e.length !== 2 ? (t = Ca, n = (f, d) => Ca(e(f), d), r = (f, d) => e(f) - d) : (t = e === Ca || e === R8 ? e : $8, n = e, r = e);
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
function $8() {
  return 0;
}
function iD(e) {
  return e === null ? NaN : +e;
}
function* z8(e, t) {
  for (let n of e)
    n != null && (n = +n) >= n && (yield n);
}
const q8 = o1(Ca), pc = q8.right;
o1(iD).center;
class UE extends Map {
  constructor(t, n = L8) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null) for (const [r, o] of t) this.set(r, o);
  }
  get(t) {
    return super.get(IE(this, t));
  }
  has(t) {
    return super.has(IE(this, t));
  }
  set(t, n) {
    return super.set(k8(this, t), n);
  }
  delete(t) {
    return super.delete(B8(this, t));
  }
}
function IE({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : n;
}
function k8({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function B8({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) && (n = e.get(r), e.delete(r)), n;
}
function L8(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function U8(e = Ca) {
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
const I8 = Math.sqrt(50), H8 = Math.sqrt(10), G8 = Math.sqrt(2);
function yf(e, t, n) {
  const r = (t - e) / Math.max(0, n), o = Math.floor(Math.log10(r)), u = r / Math.pow(10, o), c = u >= I8 ? 10 : u >= H8 ? 5 : u >= G8 ? 2 : 1;
  let f, d, h;
  return o < 0 ? (h = Math.pow(10, -o) / c, f = Math.round(e * h), d = Math.round(t * h), f / h < e && ++f, d / h > t && --d, h = -h) : (h = Math.pow(10, o) * c, f = Math.round(e / h), d = Math.round(t / h), f * h < e && ++f, d * h > t && --d), d < f && 0.5 <= n && n < 2 ? yf(e, t, n * 2) : [f, d, h];
}
function Db(e, t, n) {
  if (t = +t, e = +e, n = +n, !(n > 0)) return [];
  if (e === t) return [e];
  const r = t < e, [o, u, c] = r ? yf(t, e, n) : yf(e, t, n);
  if (!(u >= o)) return [];
  const f = u - o + 1, d = new Array(f);
  if (r)
    if (c < 0) for (let h = 0; h < f; ++h) d[h] = (u - h) / -c;
    else for (let h = 0; h < f; ++h) d[h] = (u - h) * c;
  else if (c < 0) for (let h = 0; h < f; ++h) d[h] = (o + h) / -c;
  else for (let h = 0; h < f; ++h) d[h] = (o + h) * c;
  return d;
}
function Pb(e, t, n) {
  return t = +t, e = +e, n = +n, yf(e, t, n)[2];
}
function Nb(e, t, n) {
  t = +t, e = +e, n = +n;
  const r = t < e, o = r ? Pb(t, e, n) : Pb(e, t, n);
  return (r ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
function HE(e, t) {
  let n;
  for (const r of e)
    r != null && (n < r || n === void 0 && r >= r) && (n = r);
  return n;
}
function GE(e, t) {
  let n;
  for (const r of e)
    r != null && (n > r || n === void 0 && r >= r) && (n = r);
  return n;
}
function lD(e, t, n = 0, r = 1 / 0, o) {
  if (t = Math.floor(t), n = Math.floor(Math.max(0, n)), r = Math.floor(Math.min(e.length - 1, r)), !(n <= t && t <= r)) return e;
  for (o = o === void 0 ? oD : U8(o); r > n; ) {
    if (r - n > 600) {
      const d = r - n + 1, h = t - n + 1, y = Math.log(d), v = 0.5 * Math.exp(2 * y / 3), g = 0.5 * Math.sqrt(y * v * (d - v) / d) * (h - d / 2 < 0 ? -1 : 1), b = Math.max(n, Math.floor(t - h * v / d + g)), _ = Math.min(r, Math.floor(t + (d - h) * v / d + g));
      lD(e, t, b, _, o);
    }
    const u = e[t];
    let c = n, f = r;
    for (lu(e, n, t), o(e[r], u) > 0 && lu(e, n, r); c < f; ) {
      for (lu(e, c, f), ++c, --f; o(e[c], u) < 0; ) ++c;
      for (; o(e[f], u) > 0; ) --f;
    }
    o(e[n], u) === 0 ? lu(e, n, f) : (++f, lu(e, f, r)), f <= t && (n = f + 1), t <= f && (r = f - 1);
  }
  return e;
}
function lu(e, t, n) {
  const r = e[t];
  e[t] = e[n], e[n] = r;
}
function Y8(e, t, n) {
  if (e = Float64Array.from(z8(e)), !(!(r = e.length) || isNaN(t = +t))) {
    if (t <= 0 || r < 2) return GE(e);
    if (t >= 1) return HE(e);
    var r, o = (r - 1) * t, u = Math.floor(o), c = HE(lD(e, u).subarray(0, u + 1)), f = GE(e.subarray(u + 1));
    return c + (f - c) * (o - u);
  }
}
function K8(e, t, n = iD) {
  if (!(!(r = e.length) || isNaN(t = +t))) {
    if (t <= 0 || r < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[r - 1], r - 1, e);
    var r, o = (r - 1) * t, u = Math.floor(o), c = +n(e[u], u, e), f = +n(e[u + 1], u + 1, e);
    return c + (f - c) * (o - u);
  }
}
function X8(e, t, n) {
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
function Wr(e, t) {
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
const Rb = Symbol("implicit");
function l1() {
  var e = new UE(), t = [], n = [], r = Rb;
  function o(u) {
    let c = e.get(u);
    if (c === void 0) {
      if (r !== Rb) return r;
      e.set(u, c = t.push(u) - 1);
    }
    return n[c % n.length];
  }
  return o.domain = function(u) {
    if (!arguments.length) return t.slice();
    t = [], e = new UE();
    for (const c of u)
      e.has(c) || e.set(c, t.push(c) - 1);
    return o;
  }, o.range = function(u) {
    return arguments.length ? (n = Array.from(u), o) : n.slice();
  }, o.unknown = function(u) {
    return arguments.length ? (r = u, o) : r;
  }, o.copy = function() {
    return l1(t, n).unknown(r);
  }, Un.apply(o, arguments), o;
}
function ku() {
  var e = l1().unknown(void 0), t = e.domain, n = e.range, r = 0, o = 1, u, c, f = !1, d = 0, h = 0, y = 0.5;
  delete e.unknown;
  function v() {
    var g = t().length, b = o < r, _ = b ? o : r, S = b ? r : o;
    u = (S - _) / Math.max(1, g - d + h * 2), f && (u = Math.floor(u)), _ += (S - _ - u * (g - d)) * y, c = u * (1 - d), f && (_ = Math.round(_), c = Math.round(c));
    var x = X8(g).map(function(T) {
      return _ + u * T;
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
    return ku(t(), [r, o]).round(f).paddingInner(d).paddingOuter(h).align(y);
  }, Un.apply(v(), arguments);
}
function uD(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return uD(t());
  }, e;
}
function Su() {
  return uD(ku.apply(null, arguments).paddingInner(1));
}
function u1(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function cD(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function vc() {
}
var Bu = 0.7, mf = 1 / Bu, To = "\\s*([+-]?\\d+)\\s*", Lu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", dr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", V8 = /^#([0-9a-f]{3,8})$/, F8 = new RegExp(`^rgb\\(${To},${To},${To}\\)$`), W8 = new RegExp(`^rgb\\(${dr},${dr},${dr}\\)$`), Z8 = new RegExp(`^rgba\\(${To},${To},${To},${Lu}\\)$`), Q8 = new RegExp(`^rgba\\(${dr},${dr},${dr},${Lu}\\)$`), J8 = new RegExp(`^hsl\\(${Lu},${dr},${dr}\\)$`), e6 = new RegExp(`^hsla\\(${Lu},${dr},${dr},${Lu}\\)$`), YE = {
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
u1(vc, Uu, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: KE,
  // Deprecated! Use color.formatHex.
  formatHex: KE,
  formatHex8: t6,
  formatHsl: n6,
  formatRgb: XE,
  toString: XE
});
function KE() {
  return this.rgb().formatHex();
}
function t6() {
  return this.rgb().formatHex8();
}
function n6() {
  return sD(this).formatHsl();
}
function XE() {
  return this.rgb().formatRgb();
}
function Uu(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = V8.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? VE(t) : n === 3 ? new nn(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Is(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Is(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = F8.exec(e)) ? new nn(t[1], t[2], t[3], 1) : (t = W8.exec(e)) ? new nn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Z8.exec(e)) ? Is(t[1], t[2], t[3], t[4]) : (t = Q8.exec(e)) ? Is(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = J8.exec(e)) ? ZE(t[1], t[2] / 100, t[3] / 100, 1) : (t = e6.exec(e)) ? ZE(t[1], t[2] / 100, t[3] / 100, t[4]) : YE.hasOwnProperty(e) ? VE(YE[e]) : e === "transparent" ? new nn(NaN, NaN, NaN, 0) : null;
}
function VE(e) {
  return new nn(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Is(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new nn(e, t, n, r);
}
function r6(e) {
  return e instanceof vc || (e = Uu(e)), e ? (e = e.rgb(), new nn(e.r, e.g, e.b, e.opacity)) : new nn();
}
function $b(e, t, n, r) {
  return arguments.length === 1 ? r6(e) : new nn(e, t, n, r ?? 1);
}
function nn(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
u1(nn, $b, cD(vc, {
  brighter(e) {
    return e = e == null ? mf : Math.pow(mf, e), new nn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bu : Math.pow(Bu, e), new nn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new nn(si(this.r), si(this.g), si(this.b), gf(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: FE,
  // Deprecated! Use color.formatHex.
  formatHex: FE,
  formatHex8: a6,
  formatRgb: WE,
  toString: WE
}));
function FE() {
  return `#${oi(this.r)}${oi(this.g)}${oi(this.b)}`;
}
function a6() {
  return `#${oi(this.r)}${oi(this.g)}${oi(this.b)}${oi((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function WE() {
  const e = gf(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${si(this.r)}, ${si(this.g)}, ${si(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function gf(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function si(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function oi(e) {
  return e = si(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ZE(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Wn(e, t, n, r);
}
function sD(e) {
  if (e instanceof Wn) return new Wn(e.h, e.s, e.l, e.opacity);
  if (e instanceof vc || (e = Uu(e)), !e) return new Wn();
  if (e instanceof Wn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, o = Math.min(t, n, r), u = Math.max(t, n, r), c = NaN, f = u - o, d = (u + o) / 2;
  return f ? (t === u ? c = (n - r) / f + (n < r) * 6 : n === u ? c = (r - t) / f + 2 : c = (t - n) / f + 4, f /= d < 0.5 ? u + o : 2 - u - o, c *= 60) : f = d > 0 && d < 1 ? 0 : c, new Wn(c, f, d, e.opacity);
}
function i6(e, t, n, r) {
  return arguments.length === 1 ? sD(e) : new Wn(e, t, n, r ?? 1);
}
function Wn(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
u1(Wn, i6, cD(vc, {
  brighter(e) {
    return e = e == null ? mf : Math.pow(mf, e), new Wn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bu : Math.pow(Bu, e), new Wn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - r;
    return new nn(
      hg(e >= 240 ? e - 240 : e + 120, o, r),
      hg(e, o, r),
      hg(e < 120 ? e + 240 : e - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new Wn(QE(this.h), Hs(this.s), Hs(this.l), gf(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = gf(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${QE(this.h)}, ${Hs(this.s) * 100}%, ${Hs(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function QE(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Hs(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function hg(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const c1 = (e) => () => e;
function o6(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function l6(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function u6(e) {
  return (e = +e) == 1 ? fD : function(t, n) {
    return n - t ? l6(t, n, e) : c1(isNaN(t) ? n : t);
  };
}
function fD(e, t) {
  var n = t - e;
  return n ? o6(e, n) : c1(isNaN(e) ? t : e);
}
const JE = (function e(t) {
  var n = u6(t);
  function r(o, u) {
    var c = n((o = $b(o)).r, (u = $b(u)).r), f = n(o.g, u.g), d = n(o.b, u.b), h = fD(o.opacity, u.opacity);
    return function(y) {
      return o.r = c(y), o.g = f(y), o.b = d(y), o.opacity = h(y), o + "";
    };
  }
  return r.gamma = e, r;
})(1);
function c6(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), o;
  return function(u) {
    for (o = 0; o < n; ++o) r[o] = e[o] * (1 - u) + t[o] * u;
    return r;
  };
}
function s6(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function f6(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, o = new Array(r), u = new Array(n), c;
  for (c = 0; c < r; ++c) o[c] = ll(e[c], t[c]);
  for (; c < n; ++c) u[c] = t[c];
  return function(f) {
    for (c = 0; c < r; ++c) u[c] = o[c](f);
    return u;
  };
}
function d6(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function bf(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function h6(e, t) {
  var n = {}, r = {}, o;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (o in t)
    o in e ? n[o] = ll(e[o], t[o]) : r[o] = t[o];
  return function(u) {
    for (o in n) r[o] = n[o](u);
    return r;
  };
}
var zb = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, pg = new RegExp(zb.source, "g");
function p6(e) {
  return function() {
    return e;
  };
}
function v6(e) {
  return function(t) {
    return e(t) + "";
  };
}
function y6(e, t) {
  var n = zb.lastIndex = pg.lastIndex = 0, r, o, u, c = -1, f = [], d = [];
  for (e = e + "", t = t + ""; (r = zb.exec(e)) && (o = pg.exec(t)); )
    (u = o.index) > n && (u = t.slice(n, u), f[c] ? f[c] += u : f[++c] = u), (r = r[0]) === (o = o[0]) ? f[c] ? f[c] += o : f[++c] = o : (f[++c] = null, d.push({ i: c, x: bf(r, o) })), n = pg.lastIndex;
  return n < t.length && (u = t.slice(n), f[c] ? f[c] += u : f[++c] = u), f.length < 2 ? d[0] ? v6(d[0].x) : p6(t) : (t = d.length, function(h) {
    for (var y = 0, v; y < t; ++y) f[(v = d[y]).i] = v.x(h);
    return f.join("");
  });
}
function ll(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? c1(t) : (n === "number" ? bf : n === "string" ? (r = Uu(t)) ? (t = r, JE) : y6 : t instanceof Uu ? JE : t instanceof Date ? d6 : s6(t) ? c6 : Array.isArray(t) ? f6 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? h6 : bf)(e, t);
}
function s1(e, t) {
  return e = +e, t = +t, function(n) {
    return Math.round(e * (1 - n) + t * n);
  };
}
function m6(e, t) {
  t === void 0 && (t = e, e = ll);
  for (var n = 0, r = t.length - 1, o = t[0], u = new Array(r < 0 ? 0 : r); n < r; ) u[n] = e(o, o = t[++n]);
  return function(c) {
    var f = Math.max(0, Math.min(r - 1, Math.floor(c *= r)));
    return u[f](c - f);
  };
}
function g6(e) {
  return function() {
    return e;
  };
}
function xf(e) {
  return +e;
}
var e2 = [0, 1];
function Vt(e) {
  return e;
}
function qb(e, t) {
  return (t -= e = +e) ? function(n) {
    return (n - e) / t;
  } : g6(isNaN(t) ? NaN : 0.5);
}
function b6(e, t) {
  var n;
  return e > t && (n = e, e = t, t = n), function(r) {
    return Math.max(e, Math.min(t, r));
  };
}
function x6(e, t, n) {
  var r = e[0], o = e[1], u = t[0], c = t[1];
  return o < r ? (r = qb(o, r), u = n(c, u)) : (r = qb(r, o), u = n(u, c)), function(f) {
    return u(r(f));
  };
}
function S6(e, t, n) {
  var r = Math.min(e.length, t.length) - 1, o = new Array(r), u = new Array(r), c = -1;
  for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++c < r; )
    o[c] = qb(e[c], e[c + 1]), u[c] = n(t[c], t[c + 1]);
  return function(f) {
    var d = pc(e, f, 1, r) - 1;
    return u[d](o[d](f));
  };
}
function yc(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function bd() {
  var e = e2, t = e2, n = ll, r, o, u, c = Vt, f, d, h;
  function y() {
    var g = Math.min(e.length, t.length);
    return c !== Vt && (c = b6(e[0], e[g - 1])), f = g > 2 ? S6 : x6, d = h = null, v;
  }
  function v(g) {
    return g == null || isNaN(g = +g) ? u : (d || (d = f(e.map(r), t, n)))(r(c(g)));
  }
  return v.invert = function(g) {
    return c(o((h || (h = f(t, e.map(r), bf)))(g)));
  }, v.domain = function(g) {
    return arguments.length ? (e = Array.from(g, xf), y()) : e.slice();
  }, v.range = function(g) {
    return arguments.length ? (t = Array.from(g), y()) : t.slice();
  }, v.rangeRound = function(g) {
    return t = Array.from(g), n = s1, y();
  }, v.clamp = function(g) {
    return arguments.length ? (c = g ? !0 : Vt, y()) : c !== Vt;
  }, v.interpolate = function(g) {
    return arguments.length ? (n = g, y()) : n;
  }, v.unknown = function(g) {
    return arguments.length ? (u = g, v) : u;
  }, function(g, b) {
    return r = g, o = b, y();
  };
}
function f1() {
  return bd()(Vt, Vt);
}
function _6(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Sf(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +e.slice(n + 1)
  ];
}
function Ro(e) {
  return e = Sf(Math.abs(e)), e ? e[1] : NaN;
}
function O6(e, t) {
  return function(n, r) {
    for (var o = n.length, u = [], c = 0, f = e[0], d = 0; o > 0 && f > 0 && (d + f + 1 > r && (f = Math.max(1, r - d)), u.push(n.substring(o -= f, o + f)), !((d += f + 1) > r)); )
      f = e[c = (c + 1) % e.length];
    return u.reverse().join(t);
  };
}
function w6(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(n) {
      return e[+n];
    });
  };
}
var A6 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Iu(e) {
  if (!(t = A6.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new d1({
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
Iu.prototype = d1.prototype;
function d1(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
d1.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function T6(e) {
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
var _f;
function E6(e, t) {
  var n = Sf(e, t);
  if (!n) return _f = void 0, e.toPrecision(t);
  var r = n[0], o = n[1], u = o - (_f = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, c = r.length;
  return u === c ? r : u > c ? r + new Array(u - c + 1).join("0") : u > 0 ? r.slice(0, u) + "." + r.slice(u) : "0." + new Array(1 - u).join("0") + Sf(e, Math.max(0, t + u - 1))[0];
}
function t2(e, t) {
  var n = Sf(e, t);
  if (!n) return e + "";
  var r = n[0], o = n[1];
  return o < 0 ? "0." + new Array(-o).join("0") + r : r.length > o + 1 ? r.slice(0, o + 1) + "." + r.slice(o + 1) : r + new Array(o - r.length + 2).join("0");
}
const n2 = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: _6,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => t2(e * 100, t),
  r: t2,
  s: E6,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function r2(e) {
  return e;
}
var a2 = Array.prototype.map, i2 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function j6(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? r2 : O6(a2.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", o = e.decimal === void 0 ? "." : e.decimal + "", u = e.numerals === void 0 ? r2 : w6(a2.call(e.numerals, String)), c = e.percent === void 0 ? "%" : e.percent + "", f = e.minus === void 0 ? "−" : e.minus + "", d = e.nan === void 0 ? "NaN" : e.nan + "";
  function h(v, g) {
    v = Iu(v);
    var b = v.fill, _ = v.align, S = v.sign, x = v.symbol, T = v.zero, E = v.width, C = v.comma, j = v.precision, w = v.trim, A = v.type;
    A === "n" ? (C = !0, A = "g") : n2[A] || (j === void 0 && (j = 12), w = !0, A = "g"), (T || b === "0" && _ === "=") && (T = !0, b = "0", _ = "=");
    var M = (g && g.prefix !== void 0 ? g.prefix : "") + (x === "$" ? n : x === "#" && /[boxX]/.test(A) ? "0" + A.toLowerCase() : ""), N = (x === "$" ? r : /[%p]/.test(A) ? c : "") + (g && g.suffix !== void 0 ? g.suffix : ""), z = n2[A], I = /[defgprs%]/.test(A);
    j = j === void 0 ? 6 : /[gprs]/.test(A) ? Math.max(1, Math.min(21, j)) : Math.max(0, Math.min(20, j));
    function B(k) {
      var V = M, Q = N, K, R, Y;
      if (A === "c")
        Q = z(k) + Q, k = "";
      else {
        k = +k;
        var J = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? d : z(Math.abs(k), j), w && (k = T6(k)), J && +k == 0 && S !== "+" && (J = !1), V = (J ? S === "(" ? S : f : S === "-" || S === "(" ? "" : S) + V, Q = (A === "s" && !isNaN(k) && _f !== void 0 ? i2[8 + _f / 3] : "") + Q + (J && S === "(" ? ")" : ""), I) {
          for (K = -1, R = k.length; ++K < R; )
            if (Y = k.charCodeAt(K), 48 > Y || Y > 57) {
              Q = (Y === 46 ? o + k.slice(K + 1) : k.slice(K)) + Q, k = k.slice(0, K);
              break;
            }
        }
      }
      C && !T && (k = t(k, 1 / 0));
      var G = V.length + k.length + Q.length, ee = G < E ? new Array(E - G + 1).join(b) : "";
      switch (C && T && (k = t(ee + k, ee.length ? E - Q.length : 1 / 0), ee = ""), _) {
        case "<":
          k = V + k + Q + ee;
          break;
        case "=":
          k = V + ee + k + Q;
          break;
        case "^":
          k = ee.slice(0, G = ee.length >> 1) + V + k + Q + ee.slice(G);
          break;
        default:
          k = ee + V + k + Q;
          break;
      }
      return u(k);
    }
    return B.toString = function() {
      return v + "";
    }, B;
  }
  function y(v, g) {
    var b = Math.max(-8, Math.min(8, Math.floor(Ro(g) / 3))) * 3, _ = Math.pow(10, -b), S = h((v = Iu(v), v.type = "f", v), { suffix: i2[8 + b / 3] });
    return function(x) {
      return S(_ * x);
    };
  }
  return {
    format: h,
    formatPrefix: y
  };
}
var Gs, h1, dD;
M6({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function M6(e) {
  return Gs = j6(e), h1 = Gs.format, dD = Gs.formatPrefix, Gs;
}
function C6(e) {
  return Math.max(0, -Ro(Math.abs(e)));
}
function D6(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ro(t) / 3))) * 3 - Ro(Math.abs(e)));
}
function P6(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Ro(t) - Ro(e)) + 1;
}
function hD(e, t, n, r) {
  var o = Nb(e, t, n), u;
  switch (r = Iu(r ?? ",f"), r.type) {
    case "s": {
      var c = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN(u = D6(o, c)) && (r.precision = u), dD(r, c);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(u = P6(o, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = u - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(u = C6(o)) && (r.precision = u - (r.type === "%") * 2);
      break;
    }
  }
  return h1(r);
}
function Ra(e) {
  var t = e.domain;
  return e.ticks = function(n) {
    var r = t();
    return Db(r[0], r[r.length - 1], n ?? 10);
  }, e.tickFormat = function(n, r) {
    var o = t();
    return hD(o[0], o[o.length - 1], n ?? 10, r);
  }, e.nice = function(n) {
    n == null && (n = 10);
    var r = t(), o = 0, u = r.length - 1, c = r[o], f = r[u], d, h, y = 10;
    for (f < c && (h = c, c = f, f = h, h = o, o = u, u = h); y-- > 0; ) {
      if (h = Pb(c, f, n), h === d)
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
function Of() {
  var e = f1();
  return e.copy = function() {
    return yc(e, Of());
  }, Un.apply(e, arguments), Ra(e);
}
function pD(e) {
  var t;
  function n(r) {
    return r == null || isNaN(r = +r) ? t : r;
  }
  return n.invert = n, n.domain = n.range = function(r) {
    return arguments.length ? (e = Array.from(r, xf), n) : e.slice();
  }, n.unknown = function(r) {
    return arguments.length ? (t = r, n) : t;
  }, n.copy = function() {
    return pD(e).unknown(t);
  }, e = arguments.length ? Array.from(e, xf) : [0, 1], Ra(n);
}
function vD(e, t) {
  e = e.slice();
  var n = 0, r = e.length - 1, o = e[n], u = e[r], c;
  return u < o && (c = n, n = r, r = c, c = o, o = u, u = c), e[n] = t.floor(o), e[r] = t.ceil(u), e;
}
function o2(e) {
  return Math.log(e);
}
function l2(e) {
  return Math.exp(e);
}
function N6(e) {
  return -Math.log(-e);
}
function R6(e) {
  return -Math.exp(-e);
}
function $6(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function z6(e) {
  return e === 10 ? $6 : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function q6(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function u2(e) {
  return (t, n) => -e(-t, n);
}
function p1(e) {
  const t = e(o2, l2), n = t.domain;
  let r = 10, o, u;
  function c() {
    return o = q6(r), u = z6(r), n()[0] < 0 ? (o = u2(o), u = u2(u), e(N6, R6)) : e(o2, l2), t;
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
    let T = [];
    if (!(r % 1) && b - g < x) {
      if (g = Math.floor(g), b = Math.ceil(b), h > 0) {
        for (; g <= b; ++g)
          for (_ = 1; _ < r; ++_)
            if (S = g < 0 ? _ / u(-g) : _ * u(g), !(S < h)) {
              if (S > y) break;
              T.push(S);
            }
      } else for (; g <= b; ++g)
        for (_ = r - 1; _ >= 1; --_)
          if (S = g > 0 ? _ / u(-g) : _ * u(g), !(S < h)) {
            if (S > y) break;
            T.push(S);
          }
      T.length * 2 < x && (T = Db(h, y, x));
    } else
      T = Db(g, b, Math.min(b - g, x)).map(u);
    return v ? T.reverse() : T;
  }, t.tickFormat = (f, d) => {
    if (f == null && (f = 10), d == null && (d = r === 10 ? "s" : ","), typeof d != "function" && (!(r % 1) && (d = Iu(d)).precision == null && (d.trim = !0), d = h1(d)), f === 1 / 0) return d;
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
  const e = p1(bd()).domain([1, 10]);
  return e.copy = () => yc(e, yD()).base(e.base()), Un.apply(e, arguments), e;
}
function c2(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function s2(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function v1(e) {
  var t = 1, n = e(c2(t), s2(t));
  return n.constant = function(r) {
    return arguments.length ? e(c2(t = +r), s2(t)) : t;
  }, Ra(n);
}
function mD() {
  var e = v1(bd());
  return e.copy = function() {
    return yc(e, mD()).constant(e.constant());
  }, Un.apply(e, arguments);
}
function f2(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function k6(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function B6(e) {
  return e < 0 ? -e * e : e * e;
}
function y1(e) {
  var t = e(Vt, Vt), n = 1;
  function r() {
    return n === 1 ? e(Vt, Vt) : n === 0.5 ? e(k6, B6) : e(f2(n), f2(1 / n));
  }
  return t.exponent = function(o) {
    return arguments.length ? (n = +o, r()) : n;
  }, Ra(t);
}
function m1() {
  var e = y1(bd());
  return e.copy = function() {
    return yc(e, m1()).exponent(e.exponent());
  }, Un.apply(e, arguments), e;
}
function L6() {
  return m1.apply(null, arguments).exponent(0.5);
}
function d2(e) {
  return Math.sign(e) * e * e;
}
function U6(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function gD() {
  var e = f1(), t = [0, 1], n = !1, r;
  function o(u) {
    var c = U6(e(u));
    return isNaN(c) ? r : n ? Math.round(c) : c;
  }
  return o.invert = function(u) {
    return e.invert(d2(u));
  }, o.domain = function(u) {
    return arguments.length ? (e.domain(u), o) : e.domain();
  }, o.range = function(u) {
    return arguments.length ? (e.range((t = Array.from(u, xf)).map(d2)), o) : t.slice();
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
    for (n = new Array(f - 1); ++c < f; ) n[c - 1] = K8(e, c / f);
    return u;
  }
  function u(c) {
    return c == null || isNaN(c = +c) ? r : t[pc(n, c)];
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
    return d != null && d <= d ? o[pc(r, d, 0, n)] : u;
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
    return u != null && u <= u ? t[pc(e, u, 0, r)] : n;
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
const vg = /* @__PURE__ */ new Date(), yg = /* @__PURE__ */ new Date();
function jt(e, t, n, r) {
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
  }, o.filter = (u) => jt((c) => {
    if (c >= c) for (; e(c), !u(c); ) c.setTime(c - 1);
  }, (c, f) => {
    if (c >= c)
      if (f < 0) for (; ++f <= 0; )
        for (; t(c, -1), !u(c); )
          ;
      else for (; --f >= 0; )
        for (; t(c, 1), !u(c); )
          ;
  }), n && (o.count = (u, c) => (vg.setTime(+u), yg.setTime(+c), e(vg), e(yg), Math.floor(n(vg, yg))), o.every = (u) => (u = Math.floor(u), !isFinite(u) || !(u > 0) ? null : u > 1 ? o.filter(r ? (c) => r(c) % u === 0 : (c) => o.count(0, c) % u === 0) : o)), o;
}
const wf = jt(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
wf.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? jt((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
  t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : wf);
wf.range;
const qr = 1e3, kn = qr * 60, kr = kn * 60, Gr = kr * 24, g1 = Gr * 7, h2 = Gr * 30, mg = Gr * 365, li = jt((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * qr);
}, (e, t) => (t - e) / qr, (e) => e.getUTCSeconds());
li.range;
const b1 = jt((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * qr);
}, (e, t) => {
  e.setTime(+e + t * kn);
}, (e, t) => (t - e) / kn, (e) => e.getMinutes());
b1.range;
const x1 = jt((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * kn);
}, (e, t) => (t - e) / kn, (e) => e.getUTCMinutes());
x1.range;
const S1 = jt((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * qr - e.getMinutes() * kn);
}, (e, t) => {
  e.setTime(+e + t * kr);
}, (e, t) => (t - e) / kr, (e) => e.getHours());
S1.range;
const _1 = jt((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * kr);
}, (e, t) => (t - e) / kr, (e) => e.getUTCHours());
_1.range;
const mc = jt(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * kn) / Gr,
  (e) => e.getDate() - 1
);
mc.range;
const xd = jt((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Gr, (e) => e.getUTCDate() - 1);
xd.range;
const _D = jt((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Gr, (e) => Math.floor(e / Gr));
_D.range;
function Si(e) {
  return jt((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, n) => {
    t.setDate(t.getDate() + n * 7);
  }, (t, n) => (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * kn) / g1);
}
const Sd = Si(0), Af = Si(1), I6 = Si(2), H6 = Si(3), $o = Si(4), G6 = Si(5), Y6 = Si(6);
Sd.range;
Af.range;
I6.range;
H6.range;
$o.range;
G6.range;
Y6.range;
function _i(e) {
  return jt((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, n) => {
    t.setUTCDate(t.getUTCDate() + n * 7);
  }, (t, n) => (n - t) / g1);
}
const _d = _i(0), Tf = _i(1), K6 = _i(2), X6 = _i(3), zo = _i(4), V6 = _i(5), F6 = _i(6);
_d.range;
Tf.range;
K6.range;
X6.range;
zo.range;
V6.range;
F6.range;
const O1 = jt((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
O1.range;
const w1 = jt((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
w1.range;
const Yr = jt((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Yr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : jt((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
  t.setFullYear(t.getFullYear() + n * e);
});
Yr.range;
const Kr = jt((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Kr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : jt((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
  t.setUTCFullYear(t.getUTCFullYear() + n * e);
});
Kr.range;
function OD(e, t, n, r, o, u) {
  const c = [
    [li, 1, qr],
    [li, 5, 5 * qr],
    [li, 15, 15 * qr],
    [li, 30, 30 * qr],
    [u, 1, kn],
    [u, 5, 5 * kn],
    [u, 15, 15 * kn],
    [u, 30, 30 * kn],
    [o, 1, kr],
    [o, 3, 3 * kr],
    [o, 6, 6 * kr],
    [o, 12, 12 * kr],
    [r, 1, Gr],
    [r, 2, 2 * Gr],
    [n, 1, g1],
    [t, 1, h2],
    [t, 3, 3 * h2],
    [e, 1, mg]
  ];
  function f(h, y, v) {
    const g = y < h;
    g && ([h, y] = [y, h]);
    const b = v && typeof v.range == "function" ? v : d(h, y, v), _ = b ? b.range(h, +y + 1) : [];
    return g ? _.reverse() : _;
  }
  function d(h, y, v) {
    const g = Math.abs(y - h) / v, b = o1(([, , x]) => x).right(c, g);
    if (b === c.length) return e.every(Nb(h / mg, y / mg, v));
    if (b === 0) return wf.every(Math.max(Nb(h, y, v), 1));
    const [_, S] = c[g / c[b - 1][2] < c[b][2] / g ? b - 1 : b];
    return _.every(S);
  }
  return [f, d];
}
const [W6, Z6] = OD(Kr, w1, _d, _D, _1, x1), [Q6, J6] = OD(Yr, O1, Sd, mc, S1, b1);
function gg(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function bg(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function uu(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function e4(e) {
  var t = e.dateTime, n = e.date, r = e.time, o = e.periods, u = e.days, c = e.shortDays, f = e.months, d = e.shortMonths, h = cu(o), y = su(o), v = cu(u), g = su(u), b = cu(c), _ = su(c), S = cu(f), x = su(f), T = cu(d), E = su(d), C = {
    a: Y,
    A: J,
    b: G,
    B: ee,
    c: null,
    d: b2,
    e: b2,
    f: O4,
    g: N4,
    G: $4,
    H: x4,
    I: S4,
    j: _4,
    L: wD,
    m: w4,
    M: A4,
    p: P,
    q: U,
    Q: _2,
    s: O2,
    S: T4,
    u: E4,
    U: j4,
    V: M4,
    w: C4,
    W: D4,
    x: null,
    X: null,
    y: P4,
    Y: R4,
    Z: z4,
    "%": S2
  }, j = {
    a: re,
    A: se,
    b: he,
    B: ye,
    c: null,
    d: x2,
    e: x2,
    f: L4,
    g: W4,
    G: Q4,
    H: q4,
    I: k4,
    j: B4,
    L: TD,
    m: U4,
    M: I4,
    p: de,
    q: Ce,
    Q: _2,
    s: O2,
    S: H4,
    u: G4,
    U: Y4,
    V: K4,
    w: X4,
    W: V4,
    x: null,
    X: null,
    y: F4,
    Y: Z4,
    Z: J4,
    "%": S2
  }, w = {
    a: I,
    A: B,
    b: k,
    B: V,
    c: Q,
    d: m2,
    e: m2,
    f: y4,
    g: y2,
    G: v2,
    H: g2,
    I: g2,
    j: d4,
    L: v4,
    m: f4,
    M: h4,
    p: z,
    q: s4,
    Q: g4,
    s: b4,
    S: p4,
    u: i4,
    U: o4,
    V: l4,
    w: a4,
    W: u4,
    x: K,
    X: R,
    y: y2,
    Y: v2,
    Z: c4,
    "%": m4
  };
  C.x = A(n, C), C.X = A(r, C), C.c = A(t, C), j.x = A(n, j), j.X = A(r, j), j.c = A(t, j);
  function A(ce, ge) {
    return function(xe) {
      var ae = [], De = -1, Oe = 0, ke = ce.length, Qe, ct, on;
      for (xe instanceof Date || (xe = /* @__PURE__ */ new Date(+xe)); ++De < ke; )
        ce.charCodeAt(De) === 37 && (ae.push(ce.slice(Oe, De)), (ct = p2[Qe = ce.charAt(++De)]) != null ? Qe = ce.charAt(++De) : ct = Qe === "e" ? " " : "0", (on = ge[Qe]) && (Qe = on(xe, ct)), ae.push(Qe), Oe = De + 1);
      return ae.push(ce.slice(Oe, De)), ae.join("");
    };
  }
  function M(ce, ge) {
    return function(xe) {
      var ae = uu(1900, void 0, 1), De = N(ae, ce, xe += "", 0), Oe, ke;
      if (De != xe.length) return null;
      if ("Q" in ae) return new Date(ae.Q);
      if ("s" in ae) return new Date(ae.s * 1e3 + ("L" in ae ? ae.L : 0));
      if (ge && !("Z" in ae) && (ae.Z = 0), "p" in ae && (ae.H = ae.H % 12 + ae.p * 12), ae.m === void 0 && (ae.m = "q" in ae ? ae.q : 0), "V" in ae) {
        if (ae.V < 1 || ae.V > 53) return null;
        "w" in ae || (ae.w = 1), "Z" in ae ? (Oe = bg(uu(ae.y, 0, 1)), ke = Oe.getUTCDay(), Oe = ke > 4 || ke === 0 ? Tf.ceil(Oe) : Tf(Oe), Oe = xd.offset(Oe, (ae.V - 1) * 7), ae.y = Oe.getUTCFullYear(), ae.m = Oe.getUTCMonth(), ae.d = Oe.getUTCDate() + (ae.w + 6) % 7) : (Oe = gg(uu(ae.y, 0, 1)), ke = Oe.getDay(), Oe = ke > 4 || ke === 0 ? Af.ceil(Oe) : Af(Oe), Oe = mc.offset(Oe, (ae.V - 1) * 7), ae.y = Oe.getFullYear(), ae.m = Oe.getMonth(), ae.d = Oe.getDate() + (ae.w + 6) % 7);
      } else ("W" in ae || "U" in ae) && ("w" in ae || (ae.w = "u" in ae ? ae.u % 7 : "W" in ae ? 1 : 0), ke = "Z" in ae ? bg(uu(ae.y, 0, 1)).getUTCDay() : gg(uu(ae.y, 0, 1)).getDay(), ae.m = 0, ae.d = "W" in ae ? (ae.w + 6) % 7 + ae.W * 7 - (ke + 5) % 7 : ae.w + ae.U * 7 - (ke + 6) % 7);
      return "Z" in ae ? (ae.H += ae.Z / 100 | 0, ae.M += ae.Z % 100, bg(ae)) : gg(ae);
    };
  }
  function N(ce, ge, xe, ae) {
    for (var De = 0, Oe = ge.length, ke = xe.length, Qe, ct; De < Oe; ) {
      if (ae >= ke) return -1;
      if (Qe = ge.charCodeAt(De++), Qe === 37) {
        if (Qe = ge.charAt(De++), ct = w[Qe in p2 ? ge.charAt(De++) : Qe], !ct || (ae = ct(ce, xe, ae)) < 0) return -1;
      } else if (Qe != xe.charCodeAt(ae++))
        return -1;
    }
    return ae;
  }
  function z(ce, ge, xe) {
    var ae = h.exec(ge.slice(xe));
    return ae ? (ce.p = y.get(ae[0].toLowerCase()), xe + ae[0].length) : -1;
  }
  function I(ce, ge, xe) {
    var ae = b.exec(ge.slice(xe));
    return ae ? (ce.w = _.get(ae[0].toLowerCase()), xe + ae[0].length) : -1;
  }
  function B(ce, ge, xe) {
    var ae = v.exec(ge.slice(xe));
    return ae ? (ce.w = g.get(ae[0].toLowerCase()), xe + ae[0].length) : -1;
  }
  function k(ce, ge, xe) {
    var ae = T.exec(ge.slice(xe));
    return ae ? (ce.m = E.get(ae[0].toLowerCase()), xe + ae[0].length) : -1;
  }
  function V(ce, ge, xe) {
    var ae = S.exec(ge.slice(xe));
    return ae ? (ce.m = x.get(ae[0].toLowerCase()), xe + ae[0].length) : -1;
  }
  function Q(ce, ge, xe) {
    return N(ce, t, ge, xe);
  }
  function K(ce, ge, xe) {
    return N(ce, n, ge, xe);
  }
  function R(ce, ge, xe) {
    return N(ce, r, ge, xe);
  }
  function Y(ce) {
    return c[ce.getDay()];
  }
  function J(ce) {
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
  function U(ce) {
    return 1 + ~~(ce.getMonth() / 3);
  }
  function re(ce) {
    return c[ce.getUTCDay()];
  }
  function se(ce) {
    return u[ce.getUTCDay()];
  }
  function he(ce) {
    return d[ce.getUTCMonth()];
  }
  function ye(ce) {
    return f[ce.getUTCMonth()];
  }
  function de(ce) {
    return o[+(ce.getUTCHours() >= 12)];
  }
  function Ce(ce) {
    return 1 + ~~(ce.getUTCMonth() / 3);
  }
  return {
    format: function(ce) {
      var ge = A(ce += "", C);
      return ge.toString = function() {
        return ce;
      }, ge;
    },
    parse: function(ce) {
      var ge = M(ce += "", !1);
      return ge.toString = function() {
        return ce;
      }, ge;
    },
    utcFormat: function(ce) {
      var ge = A(ce += "", j);
      return ge.toString = function() {
        return ce;
      }, ge;
    },
    utcParse: function(ce) {
      var ge = M(ce += "", !0);
      return ge.toString = function() {
        return ce;
      }, ge;
    }
  };
}
var p2 = { "-": "", _: " ", 0: "0" }, Pt = /^\s*\d+/, t4 = /^%/, n4 = /[\\^$*+?|[\]().{}]/g;
function Ue(e, t, n) {
  var r = e < 0 ? "-" : "", o = (r ? -e : e) + "", u = o.length;
  return r + (u < n ? new Array(n - u + 1).join(t) + o : o);
}
function r4(e) {
  return e.replace(n4, "\\$&");
}
function cu(e) {
  return new RegExp("^(?:" + e.map(r4).join("|") + ")", "i");
}
function su(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function a4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 1));
  return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function i4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 1));
  return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function o4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function l4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function u4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function v2(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 4));
  return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function y2(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function c4(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function s4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 1));
  return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function f4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function m2(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function d4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 3));
  return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function g2(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function h4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function p4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 2));
  return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function v4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 3));
  return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function y4(e, t, n) {
  var r = Pt.exec(t.slice(n, n + 6));
  return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function m4(e, t, n) {
  var r = t4.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function g4(e, t, n) {
  var r = Pt.exec(t.slice(n));
  return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function b4(e, t, n) {
  var r = Pt.exec(t.slice(n));
  return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function b2(e, t) {
  return Ue(e.getDate(), t, 2);
}
function x4(e, t) {
  return Ue(e.getHours(), t, 2);
}
function S4(e, t) {
  return Ue(e.getHours() % 12 || 12, t, 2);
}
function _4(e, t) {
  return Ue(1 + mc.count(Yr(e), e), t, 3);
}
function wD(e, t) {
  return Ue(e.getMilliseconds(), t, 3);
}
function O4(e, t) {
  return wD(e, t) + "000";
}
function w4(e, t) {
  return Ue(e.getMonth() + 1, t, 2);
}
function A4(e, t) {
  return Ue(e.getMinutes(), t, 2);
}
function T4(e, t) {
  return Ue(e.getSeconds(), t, 2);
}
function E4(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function j4(e, t) {
  return Ue(Sd.count(Yr(e) - 1, e), t, 2);
}
function AD(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? $o(e) : $o.ceil(e);
}
function M4(e, t) {
  return e = AD(e), Ue($o.count(Yr(e), e) + (Yr(e).getDay() === 4), t, 2);
}
function C4(e) {
  return e.getDay();
}
function D4(e, t) {
  return Ue(Af.count(Yr(e) - 1, e), t, 2);
}
function P4(e, t) {
  return Ue(e.getFullYear() % 100, t, 2);
}
function N4(e, t) {
  return e = AD(e), Ue(e.getFullYear() % 100, t, 2);
}
function R4(e, t) {
  return Ue(e.getFullYear() % 1e4, t, 4);
}
function $4(e, t) {
  var n = e.getDay();
  return e = n >= 4 || n === 0 ? $o(e) : $o.ceil(e), Ue(e.getFullYear() % 1e4, t, 4);
}
function z4(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + Ue(t / 60 | 0, "0", 2) + Ue(t % 60, "0", 2);
}
function x2(e, t) {
  return Ue(e.getUTCDate(), t, 2);
}
function q4(e, t) {
  return Ue(e.getUTCHours(), t, 2);
}
function k4(e, t) {
  return Ue(e.getUTCHours() % 12 || 12, t, 2);
}
function B4(e, t) {
  return Ue(1 + xd.count(Kr(e), e), t, 3);
}
function TD(e, t) {
  return Ue(e.getUTCMilliseconds(), t, 3);
}
function L4(e, t) {
  return TD(e, t) + "000";
}
function U4(e, t) {
  return Ue(e.getUTCMonth() + 1, t, 2);
}
function I4(e, t) {
  return Ue(e.getUTCMinutes(), t, 2);
}
function H4(e, t) {
  return Ue(e.getUTCSeconds(), t, 2);
}
function G4(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function Y4(e, t) {
  return Ue(_d.count(Kr(e) - 1, e), t, 2);
}
function ED(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? zo(e) : zo.ceil(e);
}
function K4(e, t) {
  return e = ED(e), Ue(zo.count(Kr(e), e) + (Kr(e).getUTCDay() === 4), t, 2);
}
function X4(e) {
  return e.getUTCDay();
}
function V4(e, t) {
  return Ue(Tf.count(Kr(e) - 1, e), t, 2);
}
function F4(e, t) {
  return Ue(e.getUTCFullYear() % 100, t, 2);
}
function W4(e, t) {
  return e = ED(e), Ue(e.getUTCFullYear() % 100, t, 2);
}
function Z4(e, t) {
  return Ue(e.getUTCFullYear() % 1e4, t, 4);
}
function Q4(e, t) {
  var n = e.getUTCDay();
  return e = n >= 4 || n === 0 ? zo(e) : zo.ceil(e), Ue(e.getUTCFullYear() % 1e4, t, 4);
}
function J4() {
  return "+0000";
}
function S2() {
  return "%";
}
function _2(e) {
  return +e;
}
function O2(e) {
  return Math.floor(+e / 1e3);
}
var vo, jD, MD;
e5({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function e5(e) {
  return vo = e4(e), jD = vo.format, vo.parse, MD = vo.utcFormat, vo.utcParse, vo;
}
function t5(e) {
  return new Date(e);
}
function n5(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function A1(e, t, n, r, o, u, c, f, d, h) {
  var y = f1(), v = y.invert, g = y.domain, b = h(".%L"), _ = h(":%S"), S = h("%I:%M"), x = h("%I %p"), T = h("%a %d"), E = h("%b %d"), C = h("%B"), j = h("%Y");
  function w(A) {
    return (d(A) < A ? b : f(A) < A ? _ : c(A) < A ? S : u(A) < A ? x : r(A) < A ? o(A) < A ? T : E : n(A) < A ? C : j)(A);
  }
  return y.invert = function(A) {
    return new Date(v(A));
  }, y.domain = function(A) {
    return arguments.length ? g(Array.from(A, n5)) : g().map(t5);
  }, y.ticks = function(A) {
    var M = g();
    return e(M[0], M[M.length - 1], A ?? 10);
  }, y.tickFormat = function(A, M) {
    return M == null ? w : h(M);
  }, y.nice = function(A) {
    var M = g();
    return (!A || typeof A.range != "function") && (A = t(M[0], M[M.length - 1], A ?? 10)), A ? g(vD(M, A)) : y;
  }, y.copy = function() {
    return yc(y, A1(e, t, n, r, o, u, c, f, d, h));
  }, y;
}
function r5() {
  return Un.apply(A1(Q6, J6, Yr, O1, Sd, mc, S1, b1, li, jD).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function a5() {
  return Un.apply(A1(W6, Z6, Kr, w1, _d, xd, _1, x1, li, MD).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Od() {
  var e = 0, t = 1, n, r, o, u, c = Vt, f = !1, d;
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
  return h.range = y(ll), h.rangeRound = y(s1), h.unknown = function(v) {
    return arguments.length ? (d = v, h) : d;
  }, function(v) {
    return u = v, n = v(e), r = v(t), o = n === r ? 0 : 1 / (r - n), h;
  };
}
function $a(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function CD() {
  var e = Ra(Od()(Vt));
  return e.copy = function() {
    return $a(e, CD());
  }, Wr.apply(e, arguments);
}
function DD() {
  var e = p1(Od()).domain([1, 10]);
  return e.copy = function() {
    return $a(e, DD()).base(e.base());
  }, Wr.apply(e, arguments);
}
function PD() {
  var e = v1(Od());
  return e.copy = function() {
    return $a(e, PD()).constant(e.constant());
  }, Wr.apply(e, arguments);
}
function T1() {
  var e = y1(Od());
  return e.copy = function() {
    return $a(e, T1()).exponent(e.exponent());
  }, Wr.apply(e, arguments);
}
function i5() {
  return T1.apply(null, arguments).exponent(0.5);
}
function ND() {
  var e = [], t = Vt;
  function n(r) {
    if (r != null && !isNaN(r = +r)) return t((pc(e, r, 1) - 1) / (e.length - 1));
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
    return Array.from({ length: r + 1 }, (o, u) => Y8(e, u / r));
  }, n.copy = function() {
    return ND(t).domain(e);
  }, Wr.apply(n, arguments);
}
function wd() {
  var e = 0, t = 0.5, n = 1, r = 1, o, u, c, f, d, h = Vt, y, v = !1, g;
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
      var T, E, C;
      return arguments.length ? ([T, E, C] = x, h = m6(S, [T, E, C]), b) : [h(0), h(0.5), h(1)];
    };
  }
  return b.range = _(ll), b.rangeRound = _(s1), b.unknown = function(S) {
    return arguments.length ? (g = S, b) : g;
  }, function(S) {
    return y = S, o = S(e), u = S(t), c = S(n), f = o === u ? 0 : 0.5 / (u - o), d = u === c ? 0 : 0.5 / (c - u), r = u < o ? -1 : 1, b;
  };
}
function RD() {
  var e = Ra(wd()(Vt));
  return e.copy = function() {
    return $a(e, RD());
  }, Wr.apply(e, arguments);
}
function $D() {
  var e = p1(wd()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return $a(e, $D()).base(e.base());
  }, Wr.apply(e, arguments);
}
function zD() {
  var e = v1(wd());
  return e.copy = function() {
    return $a(e, zD()).constant(e.constant());
  }, Wr.apply(e, arguments);
}
function E1() {
  var e = y1(wd());
  return e.copy = function() {
    return $a(e, E1()).exponent(e.exponent());
  }, Wr.apply(e, arguments);
}
function o5() {
  return E1.apply(null, arguments).exponent(0.5);
}
const w2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: ku,
  scaleDiverging: RD,
  scaleDivergingLog: $D,
  scaleDivergingPow: E1,
  scaleDivergingSqrt: o5,
  scaleDivergingSymlog: zD,
  scaleIdentity: pD,
  scaleImplicit: Rb,
  scaleLinear: Of,
  scaleLog: yD,
  scaleOrdinal: l1,
  scalePoint: Su,
  scalePow: m1,
  scaleQuantile: bD,
  scaleQuantize: xD,
  scaleRadial: gD,
  scaleSequential: CD,
  scaleSequentialLog: DD,
  scaleSequentialPow: T1,
  scaleSequentialQuantile: ND,
  scaleSequentialSqrt: i5,
  scaleSequentialSymlog: PD,
  scaleSqrt: L6,
  scaleSymlog: mD,
  scaleThreshold: SD,
  scaleTime: r5,
  scaleUtc: a5,
  tickFormat: hD
}, Symbol.toStringTag, { value: "Module" }));
var xg, A2;
function qD() {
  if (A2) return xg;
  A2 = 1;
  var e = rl();
  function t(n, r, o) {
    for (var u = -1, c = n.length; ++u < c; ) {
      var f = n[u], d = r(f);
      if (d != null && (h === void 0 ? d === d && !e(d) : o(d, h)))
        var h = d, y = f;
    }
    return y;
  }
  return xg = t, xg;
}
var Sg, T2;
function l5() {
  if (T2) return Sg;
  T2 = 1;
  function e(t, n) {
    return t > n;
  }
  return Sg = e, Sg;
}
var _g, E2;
function u5() {
  if (E2) return _g;
  E2 = 1;
  var e = qD(), t = l5(), n = ol();
  function r(o) {
    return o && o.length ? e(o, n, t) : void 0;
  }
  return _g = r, _g;
}
var c5 = u5();
const Ea = /* @__PURE__ */ tt(c5);
var Og, j2;
function s5() {
  if (j2) return Og;
  j2 = 1;
  function e(t, n) {
    return t < n;
  }
  return Og = e, Og;
}
var wg, M2;
function f5() {
  if (M2) return wg;
  M2 = 1;
  var e = qD(), t = s5(), n = ol();
  function r(o) {
    return o && o.length ? e(o, n, t) : void 0;
  }
  return wg = r, wg;
}
var d5 = f5();
const Ad = /* @__PURE__ */ tt(d5);
var Ag, C2;
function h5() {
  if (C2) return Ag;
  C2 = 1;
  var e = G0(), t = Pa(), n = XC(), r = an();
  function o(u, c) {
    var f = r(u) ? e : n;
    return f(u, t(c, 3));
  }
  return Ag = o, Ag;
}
var Tg, D2;
function p5() {
  if (D2) return Tg;
  D2 = 1;
  var e = YC(), t = h5();
  function n(r, o) {
    return e(t(r, o), 1);
  }
  return Tg = n, Tg;
}
var v5 = p5();
const y5 = /* @__PURE__ */ tt(v5);
var Eg, P2;
function m5() {
  if (P2) return Eg;
  P2 = 1;
  var e = n1();
  function t(n, r) {
    return e(n, r);
  }
  return Eg = t, Eg;
}
var g5 = m5();
const vi = /* @__PURE__ */ tt(g5);
var ul = 1e9, b5 = {
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
}, M1, ut = !0, Ln = "[DecimalError] ", fi = Ln + "Invalid argument: ", j1 = Ln + "Exponent out of range: ", cl = Math.floor, ai = Math.pow, x5 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Sn, Dt = 1e7, ot = 7, kD = 9007199254740991, Ef = cl(kD / ot), pe = {};
pe.absoluteValue = pe.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
pe.comparedTo = pe.cmp = function(e) {
  var t, n, r, o, u = this;
  if (e = new u.constructor(e), u.s !== e.s) return u.s || -e.s;
  if (u.e !== e.e) return u.e > e.e ^ u.s < 0 ? 1 : -1;
  for (r = u.d.length, o = e.d.length, t = 0, n = r < o ? r : o; t < n; ++t)
    if (u.d[t] !== e.d[t]) return u.d[t] > e.d[t] ^ u.s < 0 ? 1 : -1;
  return r === o ? 0 : r > o ^ u.s < 0 ? 1 : -1;
};
pe.decimalPlaces = pe.dp = function() {
  var e = this, t = e.d.length - 1, n = (t - e.e) * ot;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) n--;
  return n < 0 ? 0 : n;
};
pe.dividedBy = pe.div = function(e) {
  return Hr(this, new this.constructor(e));
};
pe.dividedToIntegerBy = pe.idiv = function(e) {
  var t = this, n = t.constructor;
  return et(Hr(t, new n(e), 0, 1), n.precision);
};
pe.equals = pe.eq = function(e) {
  return !this.cmp(e);
};
pe.exponent = function() {
  return St(this);
};
pe.greaterThan = pe.gt = function(e) {
  return this.cmp(e) > 0;
};
pe.greaterThanOrEqualTo = pe.gte = function(e) {
  return this.cmp(e) >= 0;
};
pe.isInteger = pe.isint = function() {
  return this.e > this.d.length - 2;
};
pe.isNegative = pe.isneg = function() {
  return this.s < 0;
};
pe.isPositive = pe.ispos = function() {
  return this.s > 0;
};
pe.isZero = function() {
  return this.s === 0;
};
pe.lessThan = pe.lt = function(e) {
  return this.cmp(e) < 0;
};
pe.lessThanOrEqualTo = pe.lte = function(e) {
  return this.cmp(e) < 1;
};
pe.logarithm = pe.log = function(e) {
  var t, n = this, r = n.constructor, o = r.precision, u = o + 5;
  if (e === void 0)
    e = new r(10);
  else if (e = new r(e), e.s < 1 || e.eq(Sn)) throw Error(Ln + "NaN");
  if (n.s < 1) throw Error(Ln + (n.s ? "NaN" : "-Infinity"));
  return n.eq(Sn) ? new r(0) : (ut = !1, t = Hr(Hu(n, u), Hu(e, u), u), ut = !0, et(t, o));
};
pe.minus = pe.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? UD(t, e) : BD(t, (e.s = -e.s, e));
};
pe.modulo = pe.mod = function(e) {
  var t, n = this, r = n.constructor, o = r.precision;
  if (e = new r(e), !e.s) throw Error(Ln + "NaN");
  return n.s ? (ut = !1, t = Hr(n, e, 0, 1).times(e), ut = !0, n.minus(t)) : et(new r(n), o);
};
pe.naturalExponential = pe.exp = function() {
  return LD(this);
};
pe.naturalLogarithm = pe.ln = function() {
  return Hu(this);
};
pe.negated = pe.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
pe.plus = pe.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? BD(t, e) : UD(t, (e.s = -e.s, e));
};
pe.precision = pe.sd = function(e) {
  var t, n, r, o = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(fi + e);
  if (t = St(o) + 1, r = o.d.length - 1, n = r * ot + 1, r = o.d[r], r) {
    for (; r % 10 == 0; r /= 10) n--;
    for (r = o.d[0]; r >= 10; r /= 10) n++;
  }
  return e && t > n ? t : n;
};
pe.squareRoot = pe.sqrt = function() {
  var e, t, n, r, o, u, c, f = this, d = f.constructor;
  if (f.s < 1) {
    if (!f.s) return new d(0);
    throw Error(Ln + "NaN");
  }
  for (e = St(f), ut = !1, o = Math.sqrt(+f), o == 0 || o == 1 / 0 ? (t = ur(f.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = cl((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = c = n + 3; ; )
    if (u = r, r = u.plus(Hr(f, u, c + 2)).times(0.5), ur(u.d).slice(0, c) === (t = ur(r.d)).slice(0, c)) {
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
pe.times = pe.mul = function(e) {
  var t, n, r, o, u, c, f, d, h, y = this, v = y.constructor, g = y.d, b = (e = new v(e)).d;
  if (!y.s || !e.s) return new v(0);
  for (e.s *= y.s, n = y.e + e.e, d = g.length, h = b.length, d < h && (u = g, g = b, b = u, c = d, d = h, h = c), u = [], c = d + h, r = c; r--; ) u.push(0);
  for (r = h; --r >= 0; ) {
    for (t = 0, o = d + r; o > r; )
      f = u[o] + b[r] * g[o - r - 1] + t, u[o--] = f % Dt | 0, t = f / Dt | 0;
    u[o] = (u[o] + t) % Dt | 0;
  }
  for (; !u[--c]; ) u.pop();
  return t ? ++n : u.shift(), e.d = u, e.e = n, ut ? et(e, v.precision) : e;
};
pe.toDecimalPlaces = pe.todp = function(e, t) {
  var n = this, r = n.constructor;
  return n = new r(n), e === void 0 ? n : (vr(e, 0, ul), t === void 0 ? t = r.rounding : vr(t, 0, 8), et(n, e + St(n) + 1, t));
};
pe.toExponential = function(e, t) {
  var n, r = this, o = r.constructor;
  return e === void 0 ? n = yi(r, !0) : (vr(e, 0, ul), t === void 0 ? t = o.rounding : vr(t, 0, 8), r = et(new o(r), e + 1, t), n = yi(r, !0, e + 1)), n;
};
pe.toFixed = function(e, t) {
  var n, r, o = this, u = o.constructor;
  return e === void 0 ? yi(o) : (vr(e, 0, ul), t === void 0 ? t = u.rounding : vr(t, 0, 8), r = et(new u(o), e + St(o) + 1, t), n = yi(r.abs(), !1, e + St(r) + 1), o.isneg() && !o.isZero() ? "-" + n : n);
};
pe.toInteger = pe.toint = function() {
  var e = this, t = e.constructor;
  return et(new t(e), St(e) + 1, t.rounding);
};
pe.toNumber = function() {
  return +this;
};
pe.toPower = pe.pow = function(e) {
  var t, n, r, o, u, c, f = this, d = f.constructor, h = 12, y = +(e = new d(e));
  if (!e.s) return new d(Sn);
  if (f = new d(f), !f.s) {
    if (e.s < 1) throw Error(Ln + "Infinity");
    return f;
  }
  if (f.eq(Sn)) return f;
  if (r = d.precision, e.eq(Sn)) return et(f, r);
  if (t = e.e, n = e.d.length - 1, c = t >= n, u = f.s, c) {
    if ((n = y < 0 ? -y : y) <= kD) {
      for (o = new d(Sn), t = Math.ceil(r / ot + 4), ut = !1; n % 2 && (o = o.times(f), R2(o.d, t)), n = cl(n / 2), n !== 0; )
        f = f.times(f), R2(f.d, t);
      return ut = !0, e.s < 0 ? new d(Sn).div(o) : et(o, r);
    }
  } else if (u < 0) throw Error(Ln + "NaN");
  return u = u < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, f.s = 1, ut = !1, o = e.times(Hu(f, r + h)), ut = !0, o = LD(o), o.s = u, o;
};
pe.toPrecision = function(e, t) {
  var n, r, o = this, u = o.constructor;
  return e === void 0 ? (n = St(o), r = yi(o, n <= u.toExpNeg || n >= u.toExpPos)) : (vr(e, 1, ul), t === void 0 ? t = u.rounding : vr(t, 0, 8), o = et(new u(o), e, t), n = St(o), r = yi(o, e <= n || n <= u.toExpNeg, e)), r;
};
pe.toSignificantDigits = pe.tosd = function(e, t) {
  var n = this, r = n.constructor;
  return e === void 0 ? (e = r.precision, t = r.rounding) : (vr(e, 1, ul), t === void 0 ? t = r.rounding : vr(t, 0, 8)), et(new r(n), e, t);
};
pe.toString = pe.valueOf = pe.val = pe.toJSON = pe[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = St(e), n = e.constructor;
  return yi(e, t <= n.toExpNeg || t >= n.toExpPos);
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
    n = (d[--u] = d[u] + h[u] + n) / Dt | 0, d[u] %= Dt;
  for (n && (d.unshift(n), ++o), f = d.length; d[--f] == 0; ) d.pop();
  return t.d = d, t.e = o, ut ? et(t, v) : t;
}
function vr(e, t, n) {
  if (e !== ~~e || e < t || e > n)
    throw Error(fi + e);
}
function ur(e) {
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
var Hr = /* @__PURE__ */ (function() {
  function e(r, o) {
    var u, c = 0, f = r.length;
    for (r = r.slice(); f--; )
      u = r[f] * o + c, r[f] = u % Dt | 0, c = u / Dt | 0;
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
      r[u] -= c, c = r[u] < o[u] ? 1 : 0, r[u] = c * Dt + r[u] - o[u];
    for (; !r[0] && r.length > 1; ) r.shift();
  }
  return function(r, o, u, c) {
    var f, d, h, y, v, g, b, _, S, x, T, E, C, j, w, A, M, N, z = r.constructor, I = r.s == o.s ? 1 : -1, B = r.d, k = o.d;
    if (!r.s) return new z(r);
    if (!o.s) throw Error(Ln + "Division by zero");
    for (d = r.e - o.e, M = k.length, w = B.length, b = new z(I), _ = b.d = [], h = 0; k[h] == (B[h] || 0); ) ++h;
    if (k[h] > (B[h] || 0) && --d, u == null ? E = u = z.precision : c ? E = u + (St(r) - St(o)) + 1 : E = u, E < 0) return new z(0);
    if (E = E / ot + 2 | 0, h = 0, M == 1)
      for (y = 0, k = k[0], E++; (h < w || y) && E--; h++)
        C = y * Dt + (B[h] || 0), _[h] = C / k | 0, y = C % k | 0;
    else {
      for (y = Dt / (k[0] + 1) | 0, y > 1 && (k = e(k, y), B = e(B, y), M = k.length, w = B.length), j = M, S = B.slice(0, M), x = S.length; x < M; ) S[x++] = 0;
      N = k.slice(), N.unshift(0), A = k[0], k[1] >= Dt / 2 && ++A;
      do
        y = 0, f = t(k, S, M, x), f < 0 ? (T = S[0], M != x && (T = T * Dt + (S[1] || 0)), y = T / A | 0, y > 1 ? (y >= Dt && (y = Dt - 1), v = e(k, y), g = v.length, x = S.length, f = t(v, S, g, x), f == 1 && (y--, n(v, M < g ? N : k, g))) : (y == 0 && (f = y = 1), v = k.slice()), g = v.length, g < x && v.unshift(0), n(S, v, x), f == -1 && (x = S.length, f = t(k, S, M, x), f < 1 && (y++, n(S, M < x ? N : k, x))), x = S.length) : f === 0 && (y++, S = [0]), _[h++] = y, f && S[0] ? S[x++] = B[j] || 0 : (S = [B[j]], x = 1);
      while ((j++ < w || S[0] !== void 0) && E--);
    }
    return _[0] || _.shift(), b.e = d, et(b, c ? u + St(b) + 1 : u);
  };
})();
function LD(e, t) {
  var n, r, o, u, c, f, d = 0, h = 0, y = e.constructor, v = y.precision;
  if (St(e) > 16) throw Error(j1 + St(e));
  if (!e.s) return new y(Sn);
  for (ut = !1, f = v, c = new y(0.03125); e.abs().gte(0.1); )
    e = e.times(c), h += 5;
  for (r = Math.log(ai(2, h)) / Math.LN10 * 2 + 5 | 0, f += r, n = o = u = new y(Sn), y.precision = f; ; ) {
    if (o = et(o.times(e), f), n = n.times(++d), c = u.plus(Hr(o, n, f)), ur(c.d).slice(0, f) === ur(u.d).slice(0, f)) {
      for (; h--; ) u = et(u.times(u), f);
      return y.precision = v, t == null ? (ut = !0, et(u, v)) : u;
    }
    u = c;
  }
}
function St(e) {
  for (var t = e.e * ot, n = e.d[0]; n >= 10; n /= 10) t++;
  return t;
}
function jg(e, t, n) {
  if (t > e.LN10.sd())
    throw ut = !0, n && (e.precision = n), Error(Ln + "LN10 precision limit exceeded");
  return et(new e(e.LN10), t);
}
function Aa(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Hu(e, t) {
  var n, r, o, u, c, f, d, h, y, v = 1, g = 10, b = e, _ = b.d, S = b.constructor, x = S.precision;
  if (b.s < 1) throw Error(Ln + (b.s ? "NaN" : "-Infinity"));
  if (b.eq(Sn)) return new S(0);
  if (t == null ? (ut = !1, h = x) : h = t, b.eq(10))
    return t == null && (ut = !0), jg(S, h);
  if (h += g, S.precision = h, n = ur(_), r = n.charAt(0), u = St(b), Math.abs(u) < 15e14) {
    for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3; )
      b = b.times(e), n = ur(b.d), r = n.charAt(0), v++;
    u = St(b), r > 1 ? (b = new S("0." + n), u++) : b = new S(r + "." + n.slice(1));
  } else
    return d = jg(S, h + 2, x).times(u + ""), b = Hu(new S(r + "." + n.slice(1)), h - g).plus(d), S.precision = x, t == null ? (ut = !0, et(b, x)) : b;
  for (f = c = b = Hr(b.minus(Sn), b.plus(Sn), h), y = et(b.times(b), h), o = 3; ; ) {
    if (c = et(c.times(y), h), d = f.plus(Hr(c, new S(o), h)), ur(d.d).slice(0, h) === ur(f.d).slice(0, h))
      return f = f.times(2), u !== 0 && (f = f.plus(jg(S, h + 2, x).times(u + ""))), f = Hr(f, new S(v), h), S.precision = x, t == null ? (ut = !0, et(f, x)) : f;
    f = d, o += 2;
  }
}
function N2(e, t) {
  var n, r, o;
  for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charCodeAt(r) === 48; ) ++r;
  for (o = t.length; t.charCodeAt(o - 1) === 48; ) --o;
  if (t = t.slice(r, o), t) {
    if (o -= r, n = n - r - 1, e.e = cl(n / ot), e.d = [], r = (n + 1) % ot, n < 0 && (r += ot), r < o) {
      for (r && e.d.push(+t.slice(0, r)), o -= ot; r < o; ) e.d.push(+t.slice(r, r += ot));
      t = t.slice(r), r = ot - t.length;
    } else
      r -= o;
    for (; r--; ) t += "0";
    if (e.d.push(+t), ut && (e.e > Ef || e.e < -Ef)) throw Error(j1 + n);
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
  if (n !== void 0 && (u = ai(10, c - o - 1), f = h / u % 10 | 0, d = t < 0 || v[y + 1] !== void 0 || h % u, d = n < 4 ? (f || d) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : f > 5 || f == 5 && (n == 4 || d || n == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (r > 0 ? o > 0 ? h / ai(10, c - o) : 0 : v[y - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0])
    return d ? (u = St(e), v.length = 1, t = t - u - 1, v[0] = ai(10, (ot - t % ot) % ot), e.e = cl(-t / ot) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
  if (r == 0 ? (v.length = y, u = 1, y--) : (v.length = y + 1, u = ai(10, ot - r), v[y] = o > 0 ? (h / ai(10, c - o) % ai(10, o) | 0) * u : 0), d)
    for (; ; )
      if (y == 0) {
        (v[0] += u) == Dt && (v[0] = 1, ++e.e);
        break;
      } else {
        if (v[y] += u, v[y] != Dt) break;
        v[y--] = 0, u = 1;
      }
  for (r = v.length; v[--r] === 0; ) v.pop();
  if (ut && (e.e > Ef || e.e < -Ef))
    throw Error(j1 + St(e));
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
      for (u = o; u && d[--u] === 0; ) d[u] = Dt - 1;
      --d[u], d[o] += Dt;
    }
    d[o] -= v[o];
  }
  for (; d[--f] === 0; ) d.pop();
  for (; d[0] === 0; d.shift()) --r;
  return d[0] ? (t.d = d, t.e = r, ut ? et(t, b) : t) : new g(0);
}
function yi(e, t, n) {
  var r, o = St(e), u = ur(e.d), c = u.length;
  return t ? (n && (r = n - c) > 0 ? u = u.charAt(0) + "." + u.slice(1) + Aa(r) : c > 1 && (u = u.charAt(0) + "." + u.slice(1)), u = u + (o < 0 ? "e" : "e+") + o) : o < 0 ? (u = "0." + Aa(-o - 1) + u, n && (r = n - c) > 0 && (u += Aa(r))) : o >= c ? (u += Aa(o + 1 - c), n && (r = n - o - 1) > 0 && (u = u + "." + Aa(r))) : ((r = o + 1) < c && (u = u.slice(0, r) + "." + u.slice(r)), n && (r = n - c) > 0 && (o + 1 === c && (u += "."), u += Aa(r))), e.s < 0 ? "-" + u : u;
}
function R2(e, t) {
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
        throw Error(fi + u);
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
      return N2(c, u.toString());
    } else if (typeof u != "string")
      throw Error(fi + u);
    if (u.charCodeAt(0) === 45 ? (u = u.slice(1), c.s = -1) : c.s = 1, x5.test(u)) N2(c, u);
    else throw Error(fi + u);
  }
  if (o.prototype = pe, o.ROUND_UP = 0, o.ROUND_DOWN = 1, o.ROUND_CEIL = 2, o.ROUND_FLOOR = 3, o.ROUND_HALF_UP = 4, o.ROUND_HALF_DOWN = 5, o.ROUND_HALF_EVEN = 6, o.ROUND_HALF_CEIL = 7, o.ROUND_HALF_FLOOR = 8, o.clone = ID, o.config = o.set = S5, e === void 0 && (e = {}), e)
    for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < r.length; ) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
  return o.config(e), o;
}
function S5(e) {
  if (!e || typeof e != "object")
    throw Error(Ln + "Object expected");
  var t, n, r, o = [
    "precision",
    1,
    ul,
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
      if (cl(r) === r && r >= o[t + 1] && r <= o[t + 2]) this[n] = r;
      else throw Error(fi + n + ": " + r);
  if ((r = e[n = "LN10"]) !== void 0)
    if (r == Math.LN10) this[n] = new this(r);
    else throw Error(fi + n + ": " + r);
  return this;
}
var M1 = ID(b5);
Sn = new M1(1);
const Ze = M1;
function _5(e) {
  return T5(e) || A5(e) || w5(e) || O5();
}
function O5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function w5(e, t) {
  if (e) {
    if (typeof e == "string") return kb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return kb(e, t);
  }
}
function A5(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function T5(e) {
  if (Array.isArray(e)) return kb(e);
}
function kb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
var E5 = function(t) {
  return t;
}, HD = {}, GD = function(t) {
  return t === HD;
}, $2 = function(t) {
  return function n() {
    return arguments.length === 0 || arguments.length === 1 && GD(arguments.length <= 0 ? void 0 : arguments[0]) ? n : t.apply(void 0, arguments);
  };
}, j5 = function e(t, n) {
  return t === 1 ? n : $2(function() {
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    var c = o.filter(function(f) {
      return f !== HD;
    }).length;
    return c >= t ? n.apply(void 0, o) : e(t - c, $2(function() {
      for (var f = arguments.length, d = new Array(f), h = 0; h < f; h++)
        d[h] = arguments[h];
      var y = o.map(function(v) {
        return GD(v) ? d.shift() : v;
      });
      return n.apply(void 0, _5(y).concat(d));
    }));
  });
}, Td = function(t) {
  return j5(t.length, t);
}, Bb = function(t, n) {
  for (var r = [], o = t; o < n; ++o)
    r[o - t] = o;
  return r;
}, M5 = Td(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(n) {
    return t[n];
  }).map(e);
}), C5 = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  if (!n.length)
    return E5;
  var o = n.reverse(), u = o[0], c = o.slice(1);
  return function() {
    return c.reduce(function(f, d) {
      return d(f);
    }, u.apply(void 0, arguments));
  };
}, Lb = function(t) {
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
function D5(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Ze(e).abs().log(10).toNumber()) + 1, t;
}
function P5(e, t, n) {
  for (var r = new Ze(e), o = 0, u = []; r.lt(t) && o < 1e5; )
    u.push(r.toNumber()), r = r.add(n), o++;
  return u;
}
var N5 = Td(function(e, t, n) {
  var r = +e, o = +t;
  return r + n * (o - r);
}), R5 = Td(function(e, t, n) {
  var r = t - +e;
  return r = r || 1 / 0, (n - e) / r;
}), $5 = Td(function(e, t, n) {
  var r = t - +e;
  return r = r || 1 / 0, Math.max(0, Math.min(1, (n - e) / r));
});
const Ed = {
  rangeStep: P5,
  getDigitCount: D5,
  interpolateNumber: N5,
  uninterpolateNumber: R5,
  uninterpolateTruncation: $5
};
function Ub(e) {
  return k5(e) || q5(e) || KD(e) || z5();
}
function z5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function q5(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function k5(e) {
  if (Array.isArray(e)) return Ib(e);
}
function Gu(e, t) {
  return U5(e) || L5(e, t) || KD(e, t) || B5();
}
function B5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function KD(e, t) {
  if (e) {
    if (typeof e == "string") return Ib(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ib(e, t);
  }
}
function Ib(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function L5(e, t) {
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
function U5(e) {
  if (Array.isArray(e)) return e;
}
function XD(e) {
  var t = Gu(e, 2), n = t[0], r = t[1], o = n, u = r;
  return n > r && (o = r, u = n), [o, u];
}
function VD(e, t, n) {
  if (e.lte(0))
    return new Ze(0);
  var r = Ed.getDigitCount(e.toNumber()), o = new Ze(10).pow(r), u = e.div(o), c = r !== 1 ? 0.05 : 0.1, f = new Ze(Math.ceil(u.div(c).toNumber())).add(n).mul(c), d = f.mul(o);
  return t ? d : new Ze(Math.ceil(d));
}
function I5(e, t, n) {
  var r = 1, o = new Ze(e);
  if (!o.isint() && n) {
    var u = Math.abs(e);
    u < 1 ? (r = new Ze(10).pow(Ed.getDigitCount(e) - 1), o = new Ze(Math.floor(o.div(r).toNumber())).mul(r)) : u > 1 && (o = new Ze(Math.floor(e)));
  } else e === 0 ? o = new Ze(Math.floor((t - 1) / 2)) : n || (o = new Ze(Math.floor(e)));
  var c = Math.floor((t - 1) / 2), f = C5(M5(function(d) {
    return o.add(new Ze(d - c).mul(r)).toNumber();
  }), Bb);
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
function H5(e) {
  var t = Gu(e, 2), n = t[0], r = t[1], o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = Math.max(o, 2), f = XD([n, r]), d = Gu(f, 2), h = d[0], y = d[1];
  if (h === -1 / 0 || y === 1 / 0) {
    var v = y === 1 / 0 ? [h].concat(Ub(Bb(0, o - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Ub(Bb(0, o - 1).map(function() {
      return -1 / 0;
    })), [y]);
    return n > r ? Lb(v) : v;
  }
  if (h === y)
    return I5(h, o, u);
  var g = FD(h, y, c, u), b = g.step, _ = g.tickMin, S = g.tickMax, x = Ed.rangeStep(_, S.add(new Ze(0.1).mul(b)), b);
  return n > r ? Lb(x) : x;
}
function G5(e, t) {
  var n = Gu(e, 2), r = n[0], o = n[1], u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = XD([r, o]), f = Gu(c, 2), d = f[0], h = f[1];
  if (d === -1 / 0 || h === 1 / 0)
    return [r, o];
  if (d === h)
    return [d];
  var y = Math.max(t, 2), v = VD(new Ze(h).sub(d).div(y - 1), u, 0), g = [].concat(Ub(Ed.rangeStep(new Ze(d), new Ze(h).sub(new Ze(0.99).mul(v)), v)), [h]);
  return r > o ? Lb(g) : g;
}
var Y5 = YD(H5), K5 = YD(G5), X5 = "Invariant failed";
function mi(e, t) {
  throw new Error(X5);
}
var V5 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function qo(e) {
  "@babel/helpers - typeof";
  return qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qo(e);
}
function jf() {
  return jf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, jf.apply(this, arguments);
}
function F5(e, t) {
  return J5(e) || Q5(e, t) || Z5(e, t) || W5();
}
function W5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Z5(e, t) {
  if (e) {
    if (typeof e == "string") return z2(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return z2(e, t);
  }
}
function z2(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Q5(e, t) {
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
function J5(e) {
  if (Array.isArray(e)) return e;
}
function eL(e, t) {
  if (e == null) return {};
  var n = tL(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function tL(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function nL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function rL(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, QD(r.key), r);
  }
}
function aL(e, t, n) {
  return t && rL(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function iL(e, t, n) {
  return t = Mf(t), oL(e, WD() ? Reflect.construct(t, n || [], Mf(e).constructor) : t.apply(e, n));
}
function oL(e, t) {
  if (t && (qo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lL(e);
}
function lL(e) {
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
function Mf(e) {
  return Mf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Mf(e);
}
function uL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Hb(e, t);
}
function Hb(e, t) {
  return Hb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Hb(e, t);
}
function ZD(e, t, n) {
  return t = QD(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QD(e) {
  var t = cL(e, "string");
  return qo(t) == "symbol" ? t : t + "";
}
function cL(e, t) {
  if (qo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (qo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var sl = /* @__PURE__ */ (function(e) {
  function t() {
    return nL(this, t), iL(this, t, arguments);
  }
  return uL(t, e), aL(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.offset, u = r.layout, c = r.width, f = r.dataKey, d = r.data, h = r.dataPointFormatter, y = r.xAxis, v = r.yAxis, g = eL(r, V5), b = Te(g, !1);
      this.props.direction === "x" && y.type !== "number" && mi();
      var _ = d.map(function(S) {
        var x = h(S, f), T = x.x, E = x.y, C = x.value, j = x.errorVal;
        if (!j)
          return null;
        var w = [], A, M;
        if (Array.isArray(j)) {
          var N = F5(j, 2);
          A = N[0], M = N[1];
        } else
          A = M = j;
        if (u === "vertical") {
          var z = y.scale, I = E + o, B = I + c, k = I - c, V = z(C - A), Q = z(C + M);
          w.push({
            x1: Q,
            y1: B,
            x2: Q,
            y2: k
          }), w.push({
            x1: V,
            y1: I,
            x2: Q,
            y2: I
          }), w.push({
            x1: V,
            y1: B,
            x2: V,
            y2: k
          });
        } else if (u === "horizontal") {
          var K = v.scale, R = T + o, Y = R - c, J = R + c, G = K(C - A), ee = K(C + M);
          w.push({
            x1: Y,
            y1: ee,
            x2: J,
            y2: ee
          }), w.push({
            x1: R,
            y1: G,
            x2: R,
            y2: ee
          }), w.push({
            x1: Y,
            y1: G,
            x2: J,
            y2: G
          });
        }
        return /* @__PURE__ */ L.createElement(He, jf({
          className: "recharts-errorBar",
          key: "bar-".concat(w.map(function(P) {
            return "".concat(P.x1, "-").concat(P.x2, "-").concat(P.y1, "-").concat(P.y2);
          }))
        }, b), w.map(function(P) {
          return /* @__PURE__ */ L.createElement("line", jf({}, P, {
            key: "line-".concat(P.x1, "-").concat(P.x2, "-").concat(P.y1, "-").concat(P.y2)
          }));
        }));
      });
      return /* @__PURE__ */ L.createElement(He, {
        className: "recharts-errorBars"
      }, _);
    }
  }]);
})(L.Component);
ZD(sl, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
ZD(sl, "displayName", "ErrorBar");
function Yu(e) {
  "@babel/helpers - typeof";
  return Yu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yu(e);
}
function q2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ni(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? q2(Object(n), !0).forEach(function(r) {
      sL(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : q2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sL(e, t, n) {
  return t = fL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function fL(e) {
  var t = dL(e, "string");
  return Yu(t) == "symbol" ? t : t + "";
}
function dL(e, t) {
  if (Yu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var JD = function(t) {
  var n = t.children, r = t.formattedGraphicalItems, o = t.legendWidth, u = t.legendContent, c = bn(n, Ao);
  if (!c)
    return null;
  var f = Ao.defaultProps, d = f !== void 0 ? ni(ni({}, f), c.props) : {}, h;
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
    var v = y.item, g = v.type.defaultProps, b = g !== void 0 ? ni(ni({}, g), v.props) : {}, _ = b.dataKey, S = b.name, x = b.legendType, T = b.hide;
    return {
      inactive: T,
      dataKey: _,
      type: d.iconType || x || "square",
      color: C1(v),
      value: S || _,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: b
    };
  }), ni(ni(ni({}, d), Ao.getWithHeight(c, o)), {}, {
    payload: h,
    item: c
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
function k2(e) {
  return yL(e) || vL(e) || pL(e) || hL();
}
function hL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pL(e, t) {
  if (e) {
    if (typeof e == "string") return Gb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Gb(e, t);
  }
}
function vL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function yL(e) {
  if (Array.isArray(e)) return Gb(e);
}
function Gb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function B2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? B2(Object(n), !0).forEach(function(r) {
      Eo(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : B2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Eo(e, t, n) {
  return t = mL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function mL(e) {
  var t = gL(e, "string");
  return Ku(t) == "symbol" ? t : t + "";
}
function gL(e, t) {
  if (Ku(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ku(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Et(e, t, n) {
  return we(e) || we(t) ? n : Tt(t) ? Bn(e, t, n) : Ee(t) ? t(e) : n;
}
function _u(e, t, n, r) {
  var o = y5(e, function(f) {
    return Et(f, t);
  });
  if (n === "number") {
    var u = o.filter(function(f) {
      return fe(f) || parseFloat(f);
    });
    return u.length ? [Ad(u), Ea(u)] : [1 / 0, -1 / 0];
  }
  var c = r ? o.filter(function(f) {
    return !we(f);
  }) : o;
  return c.map(function(f) {
    return Tt(f) || f instanceof Date ? f : "";
  });
}
var bL = function(t) {
  var n, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], o = arguments.length > 2 ? arguments[2] : void 0, u = arguments.length > 3 ? arguments[3] : void 0, c = -1, f = (n = r == null ? void 0 : r.length) !== null && n !== void 0 ? n : 0;
  if (f <= 1)
    return 0;
  if (u && u.axisType === "angleAxis" && Math.abs(Math.abs(u.range[1] - u.range[0]) - 360) <= 1e-6)
    for (var d = u.range, h = 0; h < f; h++) {
      var y = h > 0 ? o[h - 1].coordinate : o[f - 1].coordinate, v = o[h].coordinate, g = h >= f - 1 ? o[0].coordinate : o[h + 1].coordinate, b = void 0;
      if (Zn(v - y) !== Zn(g - v)) {
        var _ = [];
        if (Zn(g - v) === Zn(d[1] - d[0])) {
          b = g;
          var S = v + d[1] - d[0];
          _[0] = Math.min(S, (S + y) / 2), _[1] = Math.max(S, (S + y) / 2);
        } else {
          b = y;
          var x = g + d[1] - d[0];
          _[0] = Math.min(v, (x + v) / 2), _[1] = Math.max(v, (x + v) / 2);
        }
        var T = [Math.min(v, (b + v) / 2), Math.max(v, (b + v) / 2)];
        if (t > T[0] && t <= T[1] || t >= _[0] && t <= _[1]) {
          c = o[h].index;
          break;
        }
      } else {
        var E = Math.min(y, g), C = Math.max(y, g);
        if (t > (E + v) / 2 && t <= (C + v) / 2) {
          c = o[h].index;
          break;
        }
      }
    }
  else
    for (var j = 0; j < f; j++)
      if (j === 0 && t <= (r[j].coordinate + r[j + 1].coordinate) / 2 || j > 0 && j < f - 1 && t > (r[j].coordinate + r[j - 1].coordinate) / 2 && t <= (r[j].coordinate + r[j + 1].coordinate) / 2 || j === f - 1 && t > (r[j].coordinate + r[j - 1].coordinate) / 2) {
        c = r[j].index;
        break;
      }
  return c;
}, C1 = function(t) {
  var n, r = t, o = r.type.displayName, u = (n = t.type) !== null && n !== void 0 && n.defaultProps ? dt(dt({}, t.type.defaultProps), t.props) : t.props, c = u.stroke, f = u.fill, d;
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
}, xL = function(t) {
  var n = t.barSize, r = t.totalSize, o = t.stackGroups, u = o === void 0 ? {} : o;
  if (!u)
    return {};
  for (var c = {}, f = Object.keys(u), d = 0, h = f.length; d < h; d++)
    for (var y = u[f[d]].stackGroups, v = Object.keys(y), g = 0, b = v.length; g < b; g++) {
      var _ = y[v[g]], S = _.items, x = _.cateAxisId, T = S.filter(function(M) {
        return Ur(M.type).indexOf("Bar") >= 0;
      });
      if (T && T.length) {
        var E = T[0].type.defaultProps, C = E !== void 0 ? dt(dt({}, E), T[0].props) : T[0].props, j = C.barSize, w = C[x];
        c[w] || (c[w] = []);
        var A = we(j) ? n : j;
        c[w].push({
          item: T[0],
          stackList: T.slice(1),
          barSize: we(A) ? void 0 : pi(A, r, 0)
        });
      }
    }
  return c;
}, SL = function(t) {
  var n = t.barGap, r = t.barCategoryGap, o = t.bandSize, u = t.sizeList, c = u === void 0 ? [] : u, f = t.maxBarSize, d = c.length;
  if (d < 1) return null;
  var h = pi(n, o, 0, !0), y, v = [];
  if (c[0].barSize === +c[0].barSize) {
    var g = !1, b = o / d, _ = c.reduce(function(j, w) {
      return j + w.barSize || 0;
    }, 0);
    _ += (d - 1) * h, _ >= o && (_ -= (d - 1) * h, h = 0), _ >= o && b > 0 && (g = !0, b *= 0.9, _ = d * b);
    var S = (o - _) / 2 >> 0, x = {
      offset: S - h,
      size: 0
    };
    y = c.reduce(function(j, w) {
      var A = {
        item: w.item,
        position: {
          offset: x.offset + x.size + h,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: g ? b : w.barSize
        }
      }, M = [].concat(k2(j), [A]);
      return x = M[M.length - 1].position, w.stackList && w.stackList.length && w.stackList.forEach(function(N) {
        M.push({
          item: N,
          position: x
        });
      }), M;
    }, v);
  } else {
    var T = pi(r, o, 0, !0);
    o - 2 * T - (d - 1) * h <= 0 && (h = 0);
    var E = (o - 2 * T - (d - 1) * h) / d;
    E > 1 && (E >>= 0);
    var C = f === +f ? Math.min(E, f) : E;
    y = c.reduce(function(j, w, A) {
      var M = [].concat(k2(j), [{
        item: w.item,
        position: {
          offset: T + (E + h) * A + (E - C) / 2,
          size: C
        }
      }]);
      return w.stackList && w.stackList.length && w.stackList.forEach(function(N) {
        M.push({
          item: N,
          position: M[M.length - 1].position
        });
      }), M;
    }, v);
  }
  return y;
}, _L = function(t, n, r, o) {
  var u = r.children, c = r.width, f = r.margin, d = c - (f.left || 0) - (f.right || 0), h = JD({
    children: u,
    legendWidth: d
  });
  if (h) {
    var y = o || {}, v = y.width, g = y.height, b = h.align, _ = h.verticalAlign, S = h.layout;
    if ((S === "vertical" || S === "horizontal" && _ === "middle") && b !== "center" && fe(t[b]))
      return dt(dt({}, t), {}, Eo({}, b, t[b] + (v || 0)));
    if ((S === "horizontal" || S === "vertical" && b === "center") && _ !== "middle" && fe(t[_]))
      return dt(dt({}, t), {}, Eo({}, _, t[_] + (g || 0)));
  }
  return t;
}, OL = function(t, n, r) {
  return we(n) ? !0 : t === "horizontal" ? n === "yAxis" : t === "vertical" || r === "x" ? n === "xAxis" : r === "y" ? n === "yAxis" : !0;
}, eP = function(t, n, r, o, u) {
  var c = n.props.children, f = rn(c, sl).filter(function(h) {
    return OL(o, u, h.props.direction);
  });
  if (f && f.length) {
    var d = f.map(function(h) {
      return h.props.dataKey;
    });
    return t.reduce(function(h, y) {
      var v = Et(y, r);
      if (we(v)) return h;
      var g = Array.isArray(v) ? [Ad(v), Ea(v)] : [v, v], b = d.reduce(function(_, S) {
        var x = Et(y, S, 0), T = g[0] - Math.abs(Array.isArray(x) ? x[0] : x), E = g[1] + Math.abs(Array.isArray(x) ? x[1] : x);
        return [Math.min(T, _[0]), Math.max(E, _[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(b[0], h[0]), Math.max(b[1], h[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, wL = function(t, n, r, o, u) {
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
    return r === "number" && h && eP(t, d, h, o) || _u(t, h, r, u);
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
}, Br = function(t, n, r) {
  if (!t) return null;
  var o = t.scale, u = t.duplicateDomain, c = t.type, f = t.range, d = t.realScaleType === "scaleBand" ? o.bandwidth() / 2 : 2, h = (n || r) && c === "category" && o.bandwidth ? o.bandwidth() / d : 0;
  if (h = t.axisType === "angleAxis" && (f == null ? void 0 : f.length) >= 2 ? Zn(f[0] - f[1]) * 2 * h : h, n && (t.ticks || t.niceTicks)) {
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
      return !il(v.coordinate);
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
}, Mg = /* @__PURE__ */ new WeakMap(), Ys = function(t, n) {
  if (typeof n != "function")
    return t;
  Mg.has(t) || Mg.set(t, /* @__PURE__ */ new WeakMap());
  var r = Mg.get(t);
  if (r.has(n))
    return r.get(n);
  var o = function() {
    t.apply(void 0, arguments), n.apply(void 0, arguments);
  };
  return r.set(n, o), o;
}, AL = function(t, n, r) {
  var o = t.scale, u = t.type, c = t.layout, f = t.axisType;
  if (o === "auto")
    return c === "radial" && f === "radiusAxis" ? {
      scale: ku(),
      realScaleType: "band"
    } : c === "radial" && f === "angleAxis" ? {
      scale: Of(),
      realScaleType: "linear"
    } : u === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !r) ? {
      scale: Su(),
      realScaleType: "point"
    } : u === "category" ? {
      scale: ku(),
      realScaleType: "band"
    } : {
      scale: Of(),
      realScaleType: "linear"
    };
  if (hi(o)) {
    var d = "scale".concat(sd(o));
    return {
      scale: (w2[d] || Su)(),
      realScaleType: w2[d] ? d : "point"
    };
  }
  return Ee(o) ? {
    scale: o
  } : {
    scale: Su(),
    realScaleType: "point"
  };
}, L2 = 1e-4, TL = function(t) {
  var n = t.domain();
  if (!(!n || n.length <= 2)) {
    var r = n.length, o = t.range(), u = Math.min(o[0], o[1]) - L2, c = Math.max(o[0], o[1]) + L2, f = t(n[0]), d = t(n[r - 1]);
    (f < u || f > c || d < u || d > c) && t.domain([n[0], n[r - 1]]);
  }
}, EL = function(t, n) {
  if (!t)
    return null;
  for (var r = 0, o = t.length; r < o; r++)
    if (t[r].item === n)
      return t[r].position;
  return null;
}, jL = function(t, n) {
  if (!n || n.length !== 2 || !fe(n[0]) || !fe(n[1]))
    return t;
  var r = Math.min(n[0], n[1]), o = Math.max(n[0], n[1]), u = [t[0], t[1]];
  return (!fe(t[0]) || t[0] < r) && (u[0] = r), (!fe(t[1]) || t[1] > o) && (u[1] = o), u[0] > o && (u[0] = o), u[1] < r && (u[1] = r), u;
}, ML = function(t) {
  var n = t.length;
  if (!(n <= 0))
    for (var r = 0, o = t[0].length; r < o; ++r)
      for (var u = 0, c = 0, f = 0; f < n; ++f) {
        var d = il(t[f][r][1]) ? t[f][r][0] : t[f][r][1];
        d >= 0 ? (t[f][r][0] = u, t[f][r][1] = u + d, u = t[f][r][1]) : (t[f][r][0] = c, t[f][r][1] = c + d, c = t[f][r][1]);
      }
}, CL = function(t) {
  var n = t.length;
  if (!(n <= 0))
    for (var r = 0, o = t[0].length; r < o; ++r)
      for (var u = 0, c = 0; c < n; ++c) {
        var f = il(t[c][r][1]) ? t[c][r][0] : t[c][r][1];
        f >= 0 ? (t[c][r][0] = u, t[c][r][1] = u + f, u = t[c][r][1]) : (t[c][r][0] = 0, t[c][r][1] = 0);
      }
}, DL = {
  sign: ML,
  // @ts-expect-error definitelytyped types are incorrect
  expand: pq,
  // @ts-expect-error definitelytyped types are incorrect
  none: Mo,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: vq,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: yq,
  positive: CL
}, PL = function(t, n, r) {
  var o = n.map(function(f) {
    return f.props.dataKey;
  }), u = DL[r], c = hq().keys(o).value(function(f, d) {
    return +Et(f, d, 0);
  }).order(xb).offset(u);
  return c(t);
}, NL = function(t, n, r, o, u, c) {
  if (!t)
    return null;
  var f = c ? n.reverse() : n, d = {}, h = f.reduce(function(v, g) {
    var b, _ = (b = g.type) !== null && b !== void 0 && b.defaultProps ? dt(dt({}, g.type.defaultProps), g.props) : g.props, S = _.stackId, x = _.hide;
    if (x)
      return v;
    var T = _[r], E = v[T] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (Tt(S)) {
      var C = E.stackGroups[S] || {
        numericAxisId: r,
        cateAxisId: o,
        items: []
      };
      C.items.push(g), E.hasStack = !0, E.stackGroups[S] = C;
    } else
      E.stackGroups[xi("_stackId_")] = {
        numericAxisId: r,
        cateAxisId: o,
        items: [g]
      };
    return dt(dt({}, v), {}, Eo({}, T, E));
  }, d), y = {};
  return Object.keys(h).reduce(function(v, g) {
    var b = h[g];
    if (b.hasStack) {
      var _ = {};
      b.stackGroups = Object.keys(b.stackGroups).reduce(function(S, x) {
        var T = b.stackGroups[x];
        return dt(dt({}, S), {}, Eo({}, x, {
          numericAxisId: r,
          cateAxisId: o,
          items: T.items,
          stackedData: PL(t, T.items, u)
        }));
      }, _);
    }
    return dt(dt({}, v), {}, Eo({}, g, b));
  }, y);
}, RL = function(t, n) {
  var r = n.realScaleType, o = n.type, u = n.tickCount, c = n.originalDomain, f = n.allowDecimals, d = r || n.scale;
  if (d !== "auto" && d !== "linear")
    return null;
  if (u && o === "number" && c && (c[0] === "auto" || c[1] === "auto")) {
    var h = t.domain();
    if (!h.length)
      return null;
    var y = Y5(h, u, f);
    return t.domain([Ad(y), Ea(y)]), {
      niceTicks: y
    };
  }
  if (u && o === "number") {
    var v = t.domain(), g = K5(v, u, f);
    return {
      niceTicks: g
    };
  }
  return null;
};
function ko(e) {
  var t = e.axis, n = e.ticks, r = e.bandSize, o = e.entry, u = e.index, c = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !we(o[t.dataKey])) {
      var f = nf(n, "value", o[t.dataKey]);
      if (f)
        return f.coordinate + r / 2;
    }
    return n[u] ? n[u].coordinate + r / 2 : null;
  }
  var d = Et(o, we(c) ? t.dataKey : c);
  return we(d) ? null : t.scale(d);
}
var U2 = function(t) {
  var n = t.axis, r = t.ticks, o = t.offset, u = t.bandSize, c = t.entry, f = t.index;
  if (n.type === "category")
    return r[f] ? r[f].coordinate + o : null;
  var d = Et(c, n.dataKey, n.domain[f]);
  return we(d) ? null : n.scale(d) - u / 2 + o;
}, $L = function(t) {
  var n = t.numericAxis, r = n.scale.domain();
  if (n.type === "number") {
    var o = Math.min(r[0], r[1]), u = Math.max(r[0], r[1]);
    return o <= 0 && u >= 0 ? 0 : u < 0 ? u : o;
  }
  return r[0];
}, zL = function(t, n) {
  var r, o = (r = t.type) !== null && r !== void 0 && r.defaultProps ? dt(dt({}, t.type.defaultProps), t.props) : t.props, u = o.stackId;
  if (Tt(u)) {
    var c = n[u];
    if (c) {
      var f = c.items.indexOf(t);
      return f >= 0 ? c.stackedData[f] : null;
    }
  }
  return null;
}, qL = function(t) {
  return t.reduce(function(n, r) {
    return [Ad(r.concat([n[0]]).filter(fe)), Ea(r.concat([n[1]]).filter(fe))];
  }, [1 / 0, -1 / 0]);
}, aP = function(t, n, r) {
  return Object.keys(t).reduce(function(o, u) {
    var c = t[u], f = c.stackedData, d = f.reduce(function(h, y) {
      var v = qL(y.slice(n, r + 1));
      return [Math.min(h[0], v[0]), Math.max(h[1], v[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(d[0], o[0]), Math.max(d[1], o[1])];
  }, [1 / 0, -1 / 0]).map(function(o) {
    return o === 1 / 0 || o === -1 / 0 ? 0 : o;
  });
}, I2 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, H2 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Yb = function(t, n, r) {
  if (Ee(t))
    return t(n, r);
  if (!Array.isArray(t))
    return n;
  var o = [];
  if (fe(t[0]))
    o[0] = r ? t[0] : Math.min(t[0], n[0]);
  else if (I2.test(t[0])) {
    var u = +I2.exec(t[0])[1];
    o[0] = n[0] - u;
  } else Ee(t[0]) ? o[0] = t[0](n[0]) : o[0] = n[0];
  if (fe(t[1]))
    o[1] = r ? t[1] : Math.max(t[1], n[1]);
  else if (H2.test(t[1])) {
    var c = +H2.exec(t[1])[1];
    o[1] = n[1] + c;
  } else Ee(t[1]) ? o[1] = t[1](n[1]) : o[1] = n[1];
  return o;
}, Cf = function(t, n, r) {
  if (t && t.scale && t.scale.bandwidth) {
    var o = t.scale.bandwidth();
    if (!r || o > 0)
      return o;
  }
  if (t && n && n.length >= 2) {
    for (var u = a1(n, function(v) {
      return v.coordinate;
    }), c = 1 / 0, f = 1, d = u.length; f < d; f++) {
      var h = u[f], y = u[f - 1];
      c = Math.min((h.coordinate || 0) - (y.coordinate || 0), c);
    }
    return c === 1 / 0 ? 0 : c;
  }
  return r ? void 0 : 0;
}, G2 = function(t, n, r) {
  return !t || !t.length || vi(t, Bn(r, "type.defaultProps.domain")) ? n : t;
}, iP = function(t, n) {
  var r = t.type.defaultProps ? dt(dt({}, t.type.defaultProps), t.props) : t.props, o = r.dataKey, u = r.name, c = r.unit, f = r.formatter, d = r.tooltipType, h = r.chartType, y = r.hide;
  return dt(dt({}, Te(t, !1)), {}, {
    dataKey: o,
    unit: c,
    formatter: f,
    name: u || o,
    color: C1(t),
    value: Et(n, o),
    type: d,
    payload: n,
    chartType: h,
    hide: y
  });
};
function Xu(e) {
  "@babel/helpers - typeof";
  return Xu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xu(e);
}
function Y2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function K2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Y2(Object(n), !0).forEach(function(r) {
      kL(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Y2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function kL(e, t, n) {
  return t = BL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function BL(e) {
  var t = LL(e, "string");
  return Xu(t) == "symbol" ? t : t + "";
}
function LL(e, t) {
  if (Xu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Df = Math.PI / 180, UL = function(t) {
  return t * 180 / Math.PI;
}, Lt = function(t, n, r, o) {
  return {
    x: t + Math.cos(-Df * o) * r,
    y: n + Math.sin(-Df * o) * r
  };
}, IL = function(t, n) {
  var r = t.x, o = t.y, u = n.x, c = n.y;
  return Math.sqrt(Math.pow(r - u, 2) + Math.pow(o - c, 2));
}, HL = function(t, n) {
  var r = t.x, o = t.y, u = n.cx, c = n.cy, f = IL({
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
    angle: UL(h),
    angleInRadian: h
  };
}, GL = function(t) {
  var n = t.startAngle, r = t.endAngle, o = Math.floor(n / 360), u = Math.floor(r / 360), c = Math.min(o, u);
  return {
    startAngle: n - c * 360,
    endAngle: r - c * 360
  };
}, YL = function(t, n) {
  var r = n.startAngle, o = n.endAngle, u = Math.floor(r / 360), c = Math.floor(o / 360), f = Math.min(u, c);
  return t + f * 360;
}, X2 = function(t, n) {
  var r = t.x, o = t.y, u = HL({
    x: r,
    y: o
  }, n), c = u.radius, f = u.angle, d = n.innerRadius, h = n.outerRadius;
  if (c < d || c > h)
    return !1;
  if (c === 0)
    return !0;
  var y = GL(n), v = y.startAngle, g = y.endAngle, b = f, _;
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
  return _ ? K2(K2({}, n), {}, {
    radius: c,
    angle: YL(b, n)
  }) : null;
};
function Vu(e) {
  "@babel/helpers - typeof";
  return Vu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vu(e);
}
var KL = ["offset"];
function XL(e) {
  return ZL(e) || WL(e) || FL(e) || VL();
}
function VL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function FL(e, t) {
  if (e) {
    if (typeof e == "string") return Kb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Kb(e, t);
  }
}
function WL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ZL(e) {
  if (Array.isArray(e)) return Kb(e);
}
function Kb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function QL(e, t) {
  if (e == null) return {};
  var n = JL(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function JL(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function V2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function At(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? V2(Object(n), !0).forEach(function(r) {
      eU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : V2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function eU(e, t, n) {
  return t = tU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function tU(e) {
  var t = nU(e, "string");
  return Vu(t) == "symbol" ? t : t + "";
}
function nU(e, t) {
  if (Vu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Vu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fu() {
  return Fu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Fu.apply(this, arguments);
}
var rU = function(t) {
  var n = t.value, r = t.formatter, o = we(t.children) ? n : t.children;
  return Ee(r) ? r(o) : o;
}, aU = function(t, n) {
  var r = Zn(n - t), o = Math.min(Math.abs(n - t), 360);
  return r * o;
}, iU = function(t, n, r) {
  var o = t.position, u = t.viewBox, c = t.offset, f = t.className, d = u, h = d.cx, y = d.cy, v = d.innerRadius, g = d.outerRadius, b = d.startAngle, _ = d.endAngle, S = d.clockWise, x = (v + g) / 2, T = aU(b, _), E = T >= 0 ? 1 : -1, C, j;
  o === "insideStart" ? (C = b + E * c, j = S) : o === "insideEnd" ? (C = _ - E * c, j = !S) : o === "end" && (C = _ + E * c, j = S), j = T <= 0 ? j : !j;
  var w = Lt(h, y, x, C), A = Lt(h, y, x, C + (j ? 1 : -1) * 359), M = "M".concat(w.x, ",").concat(w.y, `
    A`).concat(x, ",").concat(x, ",0,1,").concat(j ? 0 : 1, `,
    `).concat(A.x, ",").concat(A.y), N = we(t.id) ? xi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ L.createElement("text", Fu({}, r, {
    dominantBaseline: "central",
    className: ze("recharts-radial-bar-label", f)
  }), /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("path", {
    id: N,
    d: M
  })), /* @__PURE__ */ L.createElement("textPath", {
    xlinkHref: "#".concat(N)
  }, n));
}, oU = function(t) {
  var n = t.viewBox, r = t.offset, o = t.position, u = n, c = u.cx, f = u.cy, d = u.innerRadius, h = u.outerRadius, y = u.startAngle, v = u.endAngle, g = (y + v) / 2;
  if (o === "outside") {
    var b = Lt(c, f, h + r, g), _ = b.x, S = b.y;
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
  var x = (d + h) / 2, T = Lt(c, f, x, g), E = T.x, C = T.y;
  return {
    x: E,
    y: C,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, lU = function(t) {
  var n = t.viewBox, r = t.parentViewBox, o = t.offset, u = t.position, c = n, f = c.x, d = c.y, h = c.width, y = c.height, v = y >= 0 ? 1 : -1, g = v * o, b = v > 0 ? "end" : "start", _ = v > 0 ? "start" : "end", S = h >= 0 ? 1 : -1, x = S * o, T = S > 0 ? "end" : "start", E = S > 0 ? "start" : "end";
  if (u === "top") {
    var C = {
      x: f + h / 2,
      y: d - v * o,
      textAnchor: "middle",
      verticalAnchor: b
    };
    return At(At({}, C), r ? {
      height: Math.max(d - r.y, 0),
      width: h
    } : {});
  }
  if (u === "bottom") {
    var j = {
      x: f + h / 2,
      y: d + y + g,
      textAnchor: "middle",
      verticalAnchor: _
    };
    return At(At({}, j), r ? {
      height: Math.max(r.y + r.height - (d + y), 0),
      width: h
    } : {});
  }
  if (u === "left") {
    var w = {
      x: f - x,
      y: d + y / 2,
      textAnchor: T,
      verticalAnchor: "middle"
    };
    return At(At({}, w), r ? {
      width: Math.max(w.x - r.x, 0),
      height: y
    } : {});
  }
  if (u === "right") {
    var A = {
      x: f + h + x,
      y: d + y / 2,
      textAnchor: E,
      verticalAnchor: "middle"
    };
    return At(At({}, A), r ? {
      width: Math.max(r.x + r.width - A.x, 0),
      height: y
    } : {});
  }
  var M = r ? {
    width: h,
    height: y
  } : {};
  return u === "insideLeft" ? At({
    x: f + x,
    y: d + y / 2,
    textAnchor: E,
    verticalAnchor: "middle"
  }, M) : u === "insideRight" ? At({
    x: f + h - x,
    y: d + y / 2,
    textAnchor: T,
    verticalAnchor: "middle"
  }, M) : u === "insideTop" ? At({
    x: f + h / 2,
    y: d + g,
    textAnchor: "middle",
    verticalAnchor: _
  }, M) : u === "insideBottom" ? At({
    x: f + h / 2,
    y: d + y - g,
    textAnchor: "middle",
    verticalAnchor: b
  }, M) : u === "insideTopLeft" ? At({
    x: f + x,
    y: d + g,
    textAnchor: E,
    verticalAnchor: _
  }, M) : u === "insideTopRight" ? At({
    x: f + h - x,
    y: d + g,
    textAnchor: T,
    verticalAnchor: _
  }, M) : u === "insideBottomLeft" ? At({
    x: f + x,
    y: d + y - g,
    textAnchor: E,
    verticalAnchor: b
  }, M) : u === "insideBottomRight" ? At({
    x: f + h - x,
    y: d + y - g,
    textAnchor: T,
    verticalAnchor: b
  }, M) : al(u) && (fe(u.x) || ii(u.x)) && (fe(u.y) || ii(u.y)) ? At({
    x: f + pi(u.x, h),
    y: d + pi(u.y, y),
    textAnchor: "end",
    verticalAnchor: "end"
  }, M) : At({
    x: f + h / 2,
    y: d + y / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, M);
}, uU = function(t) {
  return "cx" in t && fe(t.cx);
};
function Gt(e) {
  var t = e.offset, n = t === void 0 ? 5 : t, r = QL(e, KL), o = At({
    offset: n
  }, r), u = o.viewBox, c = o.position, f = o.value, d = o.children, h = o.content, y = o.className, v = y === void 0 ? "" : y, g = o.textBreakAll;
  if (!u || we(f) && we(d) && !/* @__PURE__ */ te.isValidElement(h) && !Ee(h))
    return null;
  if (/* @__PURE__ */ te.isValidElement(h))
    return /* @__PURE__ */ te.cloneElement(h, o);
  var b;
  if (Ee(h)) {
    if (b = /* @__PURE__ */ te.createElement(h, o), /* @__PURE__ */ te.isValidElement(b))
      return b;
  } else
    b = rU(o);
  var _ = uU(u), S = Te(o, !0);
  if (_ && (c === "insideStart" || c === "insideEnd" || c === "end"))
    return iU(o, b, S);
  var x = _ ? oU(o) : lU(o);
  return /* @__PURE__ */ L.createElement(vf, Fu({
    className: ze("recharts-label", v)
  }, S, x, {
    breakAll: g
  }), b);
}
Gt.displayName = "Label";
var oP = function(t) {
  var n = t.cx, r = t.cy, o = t.angle, u = t.startAngle, c = t.endAngle, f = t.r, d = t.radius, h = t.innerRadius, y = t.outerRadius, v = t.x, g = t.y, b = t.top, _ = t.left, S = t.width, x = t.height, T = t.clockWise, E = t.labelViewBox;
  if (E)
    return E;
  if (fe(S) && fe(x)) {
    if (fe(v) && fe(g))
      return {
        x: v,
        y: g,
        width: S,
        height: x
      };
    if (fe(b) && fe(_))
      return {
        x: b,
        y: _,
        width: S,
        height: x
      };
  }
  return fe(v) && fe(g) ? {
    x: v,
    y: g,
    width: 0,
    height: 0
  } : fe(n) && fe(r) ? {
    cx: n,
    cy: r,
    startAngle: u || o || 0,
    endAngle: c || o || 0,
    innerRadius: h || 0,
    outerRadius: y || d || f || 0,
    clockWise: T
  } : t.viewBox ? t.viewBox : {};
}, cU = function(t, n) {
  return t ? t === !0 ? /* @__PURE__ */ L.createElement(Gt, {
    key: "label-implicit",
    viewBox: n
  }) : Tt(t) ? /* @__PURE__ */ L.createElement(Gt, {
    key: "label-implicit",
    viewBox: n,
    value: t
  }) : /* @__PURE__ */ te.isValidElement(t) ? t.type === Gt ? /* @__PURE__ */ te.cloneElement(t, {
    key: "label-implicit",
    viewBox: n
  }) : /* @__PURE__ */ L.createElement(Gt, {
    key: "label-implicit",
    content: t,
    viewBox: n
  }) : Ee(t) ? /* @__PURE__ */ L.createElement(Gt, {
    key: "label-implicit",
    content: t,
    viewBox: n
  }) : al(t) ? /* @__PURE__ */ L.createElement(Gt, Fu({
    viewBox: n
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, sU = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label)
    return null;
  var o = t.children, u = oP(t), c = rn(o, Gt).map(function(d, h) {
    return /* @__PURE__ */ te.cloneElement(d, {
      viewBox: n || u,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(h)
    });
  });
  if (!r)
    return c;
  var f = cU(t.label, n || u);
  return [f].concat(XL(c));
};
Gt.parseViewBox = oP;
Gt.renderCallByParent = sU;
var Cg, F2;
function fU() {
  if (F2) return Cg;
  F2 = 1;
  function e(t) {
    var n = t == null ? 0 : t.length;
    return n ? t[n - 1] : void 0;
  }
  return Cg = e, Cg;
}
var dU = fU();
const hU = /* @__PURE__ */ tt(dU);
function Wu(e) {
  "@babel/helpers - typeof";
  return Wu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wu(e);
}
var pU = ["valueAccessor"], vU = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function yU(e) {
  return xU(e) || bU(e) || gU(e) || mU();
}
function mU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gU(e, t) {
  if (e) {
    if (typeof e == "string") return Xb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Xb(e, t);
  }
}
function bU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function xU(e) {
  if (Array.isArray(e)) return Xb(e);
}
function Xb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Pf() {
  return Pf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Pf.apply(this, arguments);
}
function W2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Z2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? W2(Object(n), !0).forEach(function(r) {
      SU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : W2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function SU(e, t, n) {
  return t = _U(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function _U(e) {
  var t = OU(e, "string");
  return Wu(t) == "symbol" ? t : t + "";
}
function OU(e, t) {
  if (Wu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Q2(e, t) {
  if (e == null) return {};
  var n = wU(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function wU(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var AU = function(t) {
  return Array.isArray(t.value) ? hU(t.value) : t.value;
};
function hr(e) {
  var t = e.valueAccessor, n = t === void 0 ? AU : t, r = Q2(e, pU), o = r.data, u = r.dataKey, c = r.clockWise, f = r.id, d = r.textBreakAll, h = Q2(r, vU);
  return !o || !o.length ? null : /* @__PURE__ */ L.createElement(He, {
    className: "recharts-label-list"
  }, o.map(function(y, v) {
    var g = we(u) ? n(y, v) : Et(y && y.payload, u), b = we(f) ? {} : {
      id: "".concat(f, "-").concat(v)
    };
    return /* @__PURE__ */ L.createElement(Gt, Pf({}, Te(y, !0), h, b, {
      parentViewBox: y.parentViewBox,
      value: g,
      textBreakAll: d,
      viewBox: Gt.parseViewBox(we(c) ? y : Z2(Z2({}, y), {}, {
        clockWise: c
      })),
      key: "label-".concat(v),
      index: v
    }));
  }));
}
hr.displayName = "LabelList";
function TU(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ L.createElement(hr, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ L.isValidElement(e) || Ee(e) ? /* @__PURE__ */ L.createElement(hr, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : al(e) ? /* @__PURE__ */ L.createElement(hr, Pf({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function EU(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && n && !e.label)
    return null;
  var r = e.children, o = rn(r, hr).map(function(c, f) {
    return /* @__PURE__ */ te.cloneElement(c, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(f)
    });
  });
  if (!n)
    return o;
  var u = TU(e.label, t);
  return [u].concat(yU(o));
}
hr.renderCallByParent = EU;
function Zu(e) {
  "@babel/helpers - typeof";
  return Zu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zu(e);
}
function Vb() {
  return Vb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Vb.apply(this, arguments);
}
function J2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ej(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? J2(Object(n), !0).forEach(function(r) {
      jU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : J2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function jU(e, t, n) {
  return t = MU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function MU(e) {
  var t = CU(e, "string");
  return Zu(t) == "symbol" ? t : t + "";
}
function CU(e, t) {
  if (Zu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var DU = function(t, n) {
  var r = Zn(n - t), o = Math.min(Math.abs(n - t), 359.999);
  return r * o;
}, Ks = function(t) {
  var n = t.cx, r = t.cy, o = t.radius, u = t.angle, c = t.sign, f = t.isExternal, d = t.cornerRadius, h = t.cornerIsExternal, y = d * (f ? 1 : -1) + o, v = Math.asin(d / y) / Df, g = h ? u : u + c * v, b = Lt(n, r, y, g), _ = Lt(n, r, o, g), S = h ? u - c * v : u, x = Lt(n, r, y * Math.cos(v * Df), S);
  return {
    center: b,
    circleTangency: _,
    lineTangency: x,
    theta: v
  };
}, lP = function(t) {
  var n = t.cx, r = t.cy, o = t.innerRadius, u = t.outerRadius, c = t.startAngle, f = t.endAngle, d = DU(c, f), h = c + d, y = Lt(n, r, u, c), v = Lt(n, r, u, h), g = "M ".concat(y.x, ",").concat(y.y, `
    A `).concat(u, ",").concat(u, `,0,
    `).concat(+(Math.abs(d) > 180), ",").concat(+(c > h), `,
    `).concat(v.x, ",").concat(v.y, `
  `);
  if (o > 0) {
    var b = Lt(n, r, o, c), _ = Lt(n, r, o, h);
    g += "L ".concat(_.x, ",").concat(_.y, `
            A `).concat(o, ",").concat(o, `,0,
            `).concat(+(Math.abs(d) > 180), ",").concat(+(c <= h), `,
            `).concat(b.x, ",").concat(b.y, " Z");
  } else
    g += "L ".concat(n, ",").concat(r, " Z");
  return g;
}, PU = function(t) {
  var n = t.cx, r = t.cy, o = t.innerRadius, u = t.outerRadius, c = t.cornerRadius, f = t.forceCornerRadius, d = t.cornerIsExternal, h = t.startAngle, y = t.endAngle, v = Zn(y - h), g = Ks({
    cx: n,
    cy: r,
    radius: u,
    angle: h,
    sign: v,
    cornerRadius: c,
    cornerIsExternal: d
  }), b = g.circleTangency, _ = g.lineTangency, S = g.theta, x = Ks({
    cx: n,
    cy: r,
    radius: u,
    angle: y,
    sign: -v,
    cornerRadius: c,
    cornerIsExternal: d
  }), T = x.circleTangency, E = x.lineTangency, C = x.theta, j = d ? Math.abs(h - y) : Math.abs(h - y) - S - C;
  if (j < 0)
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
    A`).concat(u, ",").concat(u, ",0,").concat(+(j > 180), ",").concat(+(v < 0), ",").concat(T.x, ",").concat(T.y, `
    A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(E.x, ",").concat(E.y, `
  `);
  if (o > 0) {
    var A = Ks({
      cx: n,
      cy: r,
      radius: o,
      angle: h,
      sign: v,
      isExternal: !0,
      cornerRadius: c,
      cornerIsExternal: d
    }), M = A.circleTangency, N = A.lineTangency, z = A.theta, I = Ks({
      cx: n,
      cy: r,
      radius: o,
      angle: y,
      sign: -v,
      isExternal: !0,
      cornerRadius: c,
      cornerIsExternal: d
    }), B = I.circleTangency, k = I.lineTangency, V = I.theta, Q = d ? Math.abs(h - y) : Math.abs(h - y) - z - V;
    if (Q < 0 && c === 0)
      return "".concat(w, "L").concat(n, ",").concat(r, "Z");
    w += "L".concat(k.x, ",").concat(k.y, `
      A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(B.x, ",").concat(B.y, `
      A`).concat(o, ",").concat(o, ",0,").concat(+(Q > 180), ",").concat(+(v > 0), ",").concat(M.x, ",").concat(M.y, `
      A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(N.x, ",").concat(N.y, "Z");
  } else
    w += "L".concat(n, ",").concat(r, "Z");
  return w;
}, NU = {
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
  var n = ej(ej({}, NU), t), r = n.cx, o = n.cy, u = n.innerRadius, c = n.outerRadius, f = n.cornerRadius, d = n.forceCornerRadius, h = n.cornerIsExternal, y = n.startAngle, v = n.endAngle, g = n.className;
  if (c < u || y === v)
    return null;
  var b = ze("recharts-sector", g), _ = c - u, S = pi(f, _, 0, !0), x;
  return S > 0 && Math.abs(y - v) < 360 ? x = PU({
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
  }), /* @__PURE__ */ L.createElement("path", Vb({}, Te(n, !0), {
    className: b,
    d: x,
    role: "img"
  }));
};
function Qu(e) {
  "@babel/helpers - typeof";
  return Qu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qu(e);
}
function Fb() {
  return Fb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Fb.apply(this, arguments);
}
function tj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function nj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tj(Object(n), !0).forEach(function(r) {
      RU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function RU(e, t, n) {
  return t = $U(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $U(e) {
  var t = zU(e, "string");
  return Qu(t) == "symbol" ? t : t + "";
}
function zU(e, t) {
  if (Qu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Qu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var rj = {
  curveBasisClosed: nq,
  curveBasisOpen: rq,
  curveBasis: tq,
  curveBumpX: Uz,
  curveBumpY: Iz,
  curveLinearClosed: aq,
  curveLinear: dd,
  curveMonotoneX: iq,
  curveMonotoneY: oq,
  curveNatural: lq,
  curveStep: uq,
  curveStepAfter: sq,
  curveStepBefore: cq
}, Xs = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, fu = function(t) {
  return t.x;
}, du = function(t) {
  return t.y;
}, qU = function(t, n) {
  if (Ee(t))
    return t;
  var r = "curve".concat(sd(t));
  return (r === "curveMonotone" || r === "curveBump") && n ? rj["".concat(r).concat(n === "vertical" ? "Y" : "X")] : rj[r] || dd;
}, kU = function(t) {
  var n = t.type, r = n === void 0 ? "linear" : n, o = t.points, u = o === void 0 ? [] : o, c = t.baseLine, f = t.layout, d = t.connectNulls, h = d === void 0 ? !1 : d, y = qU(r, f), v = h ? u.filter(function(S) {
    return Xs(S);
  }) : u, g;
  if (Array.isArray(c)) {
    var b = h ? c.filter(function(S) {
      return Xs(S);
    }) : c, _ = v.map(function(S, x) {
      return nj(nj({}, S), {}, {
        base: b[x]
      });
    });
    return f === "vertical" ? g = qs().y(du).x1(fu).x0(function(S) {
      return S.base.x;
    }) : g = qs().x(fu).y1(du).y0(function(S) {
      return S.base.y;
    }), g.defined(Xs).curve(y), g(_);
  }
  return f === "vertical" && fe(c) ? g = qs().y(du).x1(fu).x0(c) : fe(c) ? g = qs().x(fu).y1(du).y0(c) : g = pC().x(fu).y(du), g.defined(Xs).curve(y), g(v);
}, di = function(t) {
  var n = t.className, r = t.points, o = t.path, u = t.pathRef;
  if ((!r || !r.length) && !o)
    return null;
  var c = r && r.length ? kU(t) : o;
  return /* @__PURE__ */ te.createElement("path", Fb({}, Te(t, !1), rf(t), {
    className: ze("recharts-curve", n),
    d: c,
    ref: u
  }));
}, Dg = { exports: {} }, Pg, aj;
function BU() {
  if (aj) return Pg;
  aj = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Pg = e, Pg;
}
var Ng, ij;
function LU() {
  if (ij) return Ng;
  ij = 1;
  var e = /* @__PURE__ */ BU();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Ng = function() {
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
  }, Ng;
}
var oj;
function UU() {
  return oj || (oj = 1, Dg.exports = /* @__PURE__ */ LU()()), Dg.exports;
}
var IU = /* @__PURE__ */ UU();
const Ye = /* @__PURE__ */ tt(IU), { getOwnPropertyNames: HU, getOwnPropertySymbols: GU } = Object, { hasOwnProperty: YU } = Object.prototype;
function Rg(e, t) {
  return function(r, o, u) {
    return e(r, o, u) && t(r, o, u);
  };
}
function Vs(e) {
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
function KU(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function lj(e) {
  return HU(e).concat(GU(e));
}
const XU = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => YU.call(e, t))
);
function Oi(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const VU = "__v", FU = "__o", WU = "_owner", { getOwnPropertyDescriptor: uj, keys: cj } = Object;
function ZU(e, t) {
  return e.byteLength === t.byteLength && Nf(new Uint8Array(e), new Uint8Array(t));
}
function QU(e, t, n) {
  let r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (!n.equals(e[r], t[r], r, r, e, t, n))
      return !1;
  return !0;
}
function JU(e, t) {
  return e.byteLength === t.byteLength && Nf(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function eI(e, t) {
  return Oi(e.getTime(), t.getTime());
}
function tI(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function nI(e, t) {
  return e === t;
}
function sj(e, t, n) {
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
const rI = Oi;
function aI(e, t, n) {
  const r = cj(e);
  let o = r.length;
  if (cj(t).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!cP(e, t, n, r[o]))
      return !1;
  return !0;
}
function hu(e, t, n) {
  const r = lj(e);
  let o = r.length;
  if (lj(t).length !== o)
    return !1;
  let u, c, f;
  for (; o-- > 0; )
    if (u = r[o], !cP(e, t, n, u) || (c = uj(e, u), f = uj(t, u), (c || f) && (!c || !f || c.configurable !== f.configurable || c.enumerable !== f.enumerable || c.writable !== f.writable)))
      return !1;
  return !0;
}
function iI(e, t) {
  return Oi(e.valueOf(), t.valueOf());
}
function oI(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function fj(e, t, n) {
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
function Nf(e, t) {
  let n = e.byteLength;
  if (t.byteLength !== n || e.byteOffset !== t.byteOffset)
    return !1;
  for (; n-- > 0; )
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function lI(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function cP(e, t, n, r) {
  return (r === WU || r === FU || r === VU) && (e.$$typeof || t.$$typeof) ? !0 : XU(t, r) && n.equals(e[r], t[r], r, r, e, t, n);
}
const uI = "[object ArrayBuffer]", cI = "[object Arguments]", sI = "[object Boolean]", fI = "[object DataView]", dI = "[object Date]", hI = "[object Error]", pI = "[object Map]", vI = "[object Number]", yI = "[object Object]", mI = "[object RegExp]", gI = "[object Set]", bI = "[object String]", xI = {
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
}, SI = "[object URL]", _I = Object.prototype.toString;
function OI({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: n, areDatesEqual: r, areErrorsEqual: o, areFunctionsEqual: u, areMapsEqual: c, areNumbersEqual: f, areObjectsEqual: d, arePrimitiveWrappersEqual: h, areRegExpsEqual: y, areSetsEqual: v, areTypedArraysEqual: g, areUrlsEqual: b, unknownTagComparators: _ }) {
  return function(x, T, E) {
    if (x === T)
      return !0;
    if (x == null || T == null)
      return !1;
    const C = typeof x;
    if (C !== typeof T)
      return !1;
    if (C !== "object")
      return C === "number" ? f(x, T, E) : C === "function" ? u(x, T, E) : !1;
    const j = x.constructor;
    if (j !== T.constructor)
      return !1;
    if (j === Object)
      return d(x, T, E);
    if (Array.isArray(x))
      return t(x, T, E);
    if (j === Date)
      return r(x, T, E);
    if (j === RegExp)
      return y(x, T, E);
    if (j === Map)
      return c(x, T, E);
    if (j === Set)
      return v(x, T, E);
    const w = _I.call(x);
    if (w === dI)
      return r(x, T, E);
    if (w === mI)
      return y(x, T, E);
    if (w === pI)
      return c(x, T, E);
    if (w === gI)
      return v(x, T, E);
    if (w === yI)
      return typeof x.then != "function" && typeof T.then != "function" && d(x, T, E);
    if (w === SI)
      return b(x, T, E);
    if (w === hI)
      return o(x, T, E);
    if (w === cI)
      return d(x, T, E);
    if (xI[w])
      return g(x, T, E);
    if (w === uI)
      return e(x, T, E);
    if (w === fI)
      return n(x, T, E);
    if (w === sI || w === vI || w === bI)
      return h(x, T, E);
    if (_) {
      let A = _[w];
      if (!A) {
        const M = KU(x);
        M && (A = _[M]);
      }
      if (A)
        return A(x, T, E);
    }
    return !1;
  };
}
function wI({ circular: e, createCustomConfig: t, strict: n }) {
  let r = {
    areArrayBuffersEqual: ZU,
    areArraysEqual: n ? hu : QU,
    areDataViewsEqual: JU,
    areDatesEqual: eI,
    areErrorsEqual: tI,
    areFunctionsEqual: nI,
    areMapsEqual: n ? Rg(sj, hu) : sj,
    areNumbersEqual: rI,
    areObjectsEqual: n ? hu : aI,
    arePrimitiveWrappersEqual: iI,
    areRegExpsEqual: oI,
    areSetsEqual: n ? Rg(fj, hu) : fj,
    areTypedArraysEqual: n ? Rg(Nf, hu) : Nf,
    areUrlsEqual: lI,
    unknownTagComparators: void 0
  };
  if (t && (r = Object.assign({}, r, t(r))), e) {
    const o = Vs(r.areArraysEqual), u = Vs(r.areMapsEqual), c = Vs(r.areObjectsEqual), f = Vs(r.areSetsEqual);
    r = Object.assign({}, r, {
      areArraysEqual: o,
      areMapsEqual: u,
      areObjectsEqual: c,
      areSetsEqual: f
    });
  }
  return r;
}
function AI(e) {
  return function(t, n, r, o, u, c, f) {
    return e(t, n, f);
  };
}
function TI({ circular: e, comparator: t, createState: n, equals: r, strict: o }) {
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
const EI = za();
za({ strict: !0 });
za({ circular: !0 });
za({
  circular: !0,
  strict: !0
});
za({
  createInternalComparator: () => Oi
});
za({
  strict: !0,
  createInternalComparator: () => Oi
});
za({
  circular: !0,
  createInternalComparator: () => Oi
});
za({
  circular: !0,
  createInternalComparator: () => Oi,
  strict: !0
});
function za(e = {}) {
  const { circular: t = !1, createInternalComparator: n, createState: r, strict: o = !1 } = e, u = wI(e), c = OI(u), f = n ? n(c) : AI(c);
  return TI({ circular: t, comparator: c, createState: r, equals: f, strict: o });
}
function jI(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function dj(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = -1, r = function o(u) {
    n < 0 && (n = u), u - n > t ? (e(u), n = -1) : jI(o);
  };
  requestAnimationFrame(r);
}
function Wb(e) {
  "@babel/helpers - typeof";
  return Wb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wb(e);
}
function MI(e) {
  return NI(e) || PI(e) || DI(e) || CI();
}
function CI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DI(e, t) {
  if (e) {
    if (typeof e == "string") return hj(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return hj(e, t);
  }
}
function hj(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function PI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function NI(e) {
  if (Array.isArray(e)) return e;
}
function RI() {
  var e = {}, t = function() {
    return null;
  }, n = !1, r = function o(u) {
    if (!n) {
      if (Array.isArray(u)) {
        if (!u.length)
          return;
        var c = u, f = MI(c), d = f[0], h = f.slice(1);
        if (typeof d == "number") {
          dj(o.bind(null, h), d);
          return;
        }
        o(d), dj(o.bind(null, h));
        return;
      }
      Wb(u) === "object" && (e = u, t(e)), typeof u == "function" && u();
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
function Ju(e) {
  "@babel/helpers - typeof";
  return Ju = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ju(e);
}
function pj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function vj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pj(Object(n), !0).forEach(function(r) {
      sP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sP(e, t, n) {
  return t = $I(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $I(e) {
  var t = zI(e, "string");
  return Ju(t) === "symbol" ? t : String(t);
}
function zI(e, t) {
  if (Ju(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ju(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var qI = function(t, n) {
  return [Object.keys(t), Object.keys(n)].reduce(function(r, o) {
    return r.filter(function(u) {
      return o.includes(u);
    });
  });
}, kI = function(t) {
  return t;
}, BI = function(t) {
  return t.replace(/([A-Z])/g, function(n) {
    return "-".concat(n.toLowerCase());
  });
}, Ou = function(t, n) {
  return Object.keys(n).reduce(function(r, o) {
    return vj(vj({}, r), {}, sP({}, o, t(o, n[o])));
  }, {});
}, yj = function(t, n, r) {
  return t.map(function(o) {
    return "".concat(BI(o), " ").concat(n, "ms ").concat(r);
  }).join(",");
};
function LI(e, t) {
  return HI(e) || II(e, t) || fP(e, t) || UI();
}
function UI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function II(e, t) {
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
function HI(e) {
  if (Array.isArray(e)) return e;
}
function GI(e) {
  return XI(e) || KI(e) || fP(e) || YI();
}
function YI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fP(e, t) {
  if (e) {
    if (typeof e == "string") return Zb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Zb(e, t);
  }
}
function KI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function XI(e) {
  if (Array.isArray(e)) return Zb(e);
}
function Zb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var Rf = 1e-4, dP = function(t, n) {
  return [0, 3 * t, 3 * n - 6 * t, 3 * t - 3 * n + 1];
}, hP = function(t, n) {
  return t.map(function(r, o) {
    return r * Math.pow(n, o);
  }).reduce(function(r, o) {
    return r + o;
  });
}, mj = function(t, n) {
  return function(r) {
    var o = dP(t, n);
    return hP(o, r);
  };
}, VI = function(t, n) {
  return function(r) {
    var o = dP(t, n), u = [].concat(GI(o.map(function(c, f) {
      return c * f;
    }).slice(1)), [0]);
    return hP(u, r);
  };
}, gj = function() {
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
          }), y = LI(h, 4);
          o = y[0], u = y[1], c = y[2], f = y[3];
        }
      }
    }
  var v = mj(o, c), g = mj(u, f), b = VI(o, c), _ = function(T) {
    return T > 1 ? 1 : T < 0 ? 0 : T;
  }, S = function(T) {
    for (var E = T > 1 ? 1 : T, C = E, j = 0; j < 8; ++j) {
      var w = v(C) - E, A = b(C);
      if (Math.abs(w - E) < Rf || A < Rf)
        return g(C);
      C = _(C - w / A);
    }
    return g(C);
  };
  return S.isStepper = !1, S;
}, FI = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.stiff, r = n === void 0 ? 100 : n, o = t.damping, u = o === void 0 ? 8 : o, c = t.dt, f = c === void 0 ? 17 : c, d = function(y, v, g) {
    var b = -(y - v) * r, _ = g * u, S = g + (b - _) * f / 1e3, x = g * f / 1e3 + y;
    return Math.abs(x - v) < Rf && Math.abs(S) < Rf ? [v, 0] : [x, S];
  };
  return d.isStepper = !0, d.dt = f, d;
}, WI = function() {
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
        return gj(o);
      case "spring":
        return FI();
      default:
        if (o.split("(")[0] === "cubic-bezier")
          return gj(o);
    }
  return typeof o == "function" ? o : null;
};
function ec(e) {
  "@babel/helpers - typeof";
  return ec = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ec(e);
}
function bj(e) {
  return JI(e) || QI(e) || pP(e) || ZI();
}
function ZI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function JI(e) {
  if (Array.isArray(e)) return Jb(e);
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
function Bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xj(Object(n), !0).forEach(function(r) {
      Qb(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Qb(e, t, n) {
  return t = e9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function e9(e) {
  var t = t9(e, "string");
  return ec(t) === "symbol" ? t : String(t);
}
function t9(e, t) {
  if (ec(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ec(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function n9(e, t) {
  return i9(e) || a9(e, t) || pP(e, t) || r9();
}
function r9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pP(e, t) {
  if (e) {
    if (typeof e == "string") return Jb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Jb(e, t);
  }
}
function Jb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function a9(e, t) {
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
function i9(e) {
  if (Array.isArray(e)) return e;
}
var $f = function(t, n, r) {
  return t + (n - t) * r;
}, e0 = function(t) {
  var n = t.from, r = t.to;
  return n !== r;
}, o9 = function e(t, n, r) {
  var o = Ou(function(u, c) {
    if (e0(c)) {
      var f = t(c.from, c.to, c.velocity), d = n9(f, 2), h = d[0], y = d[1];
      return Bt(Bt({}, c), {}, {
        from: h,
        velocity: y
      });
    }
    return c;
  }, n);
  return r < 1 ? Ou(function(u, c) {
    return e0(c) ? Bt(Bt({}, c), {}, {
      velocity: $f(c.velocity, o[u].velocity, r),
      from: $f(c.from, o[u].from, r)
    }) : c;
  }, n) : e(t, o, r - 1);
};
const l9 = (function(e, t, n, r, o) {
  var u = qI(e, t), c = u.reduce(function(x, T) {
    return Bt(Bt({}, x), {}, Qb({}, T, [e[T], t[T]]));
  }, {}), f = u.reduce(function(x, T) {
    return Bt(Bt({}, x), {}, Qb({}, T, {
      from: e[T],
      velocity: 0,
      to: t[T]
    }));
  }, {}), d = -1, h, y, v = function() {
    return null;
  }, g = function() {
    return Ou(function(T, E) {
      return E.from;
    }, f);
  }, b = function() {
    return !Object.values(f).filter(e0).length;
  }, _ = function(T) {
    h || (h = T);
    var E = T - h, C = E / n.dt;
    f = o9(n, f, C), o(Bt(Bt(Bt({}, e), t), g())), h = T, b() || (d = requestAnimationFrame(v));
  }, S = function(T) {
    y || (y = T);
    var E = (T - y) / r, C = Ou(function(w, A) {
      return $f.apply(void 0, bj(A).concat([n(E)]));
    }, c);
    if (o(Bt(Bt(Bt({}, e), t), C)), E < 1)
      d = requestAnimationFrame(v);
    else {
      var j = Ou(function(w, A) {
        return $f.apply(void 0, bj(A).concat([n(1)]));
      }, c);
      o(Bt(Bt(Bt({}, e), t), j));
    }
  };
  return v = n.isStepper ? _ : S, function() {
    return requestAnimationFrame(v), function() {
      cancelAnimationFrame(d);
    };
  };
});
function Bo(e) {
  "@babel/helpers - typeof";
  return Bo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bo(e);
}
var u9 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function c9(e, t) {
  if (e == null) return {};
  var n = s9(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function s9(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, u;
  for (u = 0; u < r.length; u++)
    o = r[u], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function $g(e) {
  return p9(e) || h9(e) || d9(e) || f9();
}
function f9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function d9(e, t) {
  if (e) {
    if (typeof e == "string") return t0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return t0(e, t);
  }
}
function h9(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function p9(e) {
  if (Array.isArray(e)) return t0(e);
}
function t0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Sj(e, t) {
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
    t % 2 ? Sj(Object(n), !0).forEach(function(r) {
      gu(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Sj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function gu(e, t, n) {
  return t = vP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function v9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function y9(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, vP(r.key), r);
  }
}
function m9(e, t, n) {
  return t && y9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function vP(e) {
  var t = g9(e, "string");
  return Bo(t) === "symbol" ? t : String(t);
}
function g9(e, t) {
  if (Bo(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Bo(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function b9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && n0(e, t);
}
function n0(e, t) {
  return n0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, n0(e, t);
}
function x9(e) {
  var t = S9();
  return function() {
    var r = zf(e), o;
    if (t) {
      var u = zf(this).constructor;
      o = Reflect.construct(r, arguments, u);
    } else
      o = r.apply(this, arguments);
    return r0(this, o);
  };
}
function r0(e, t) {
  if (t && (Bo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return a0(e);
}
function a0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function S9() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function zf(e) {
  return zf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, zf(e);
}
var Qn = /* @__PURE__ */ (function(e) {
  b9(n, e);
  var t = x9(n);
  function n(r, o) {
    var u;
    v9(this, n), u = t.call(this, r, o);
    var c = u.props, f = c.isActive, d = c.attributeName, h = c.from, y = c.to, v = c.steps, g = c.children, b = c.duration;
    if (u.handleStyleChange = u.handleStyleChange.bind(a0(u)), u.changeStyle = u.changeStyle.bind(a0(u)), !f || b <= 0)
      return u.state = {
        style: {}
      }, typeof g == "function" && (u.state = {
        style: y
      }), r0(u);
    if (v && v.length)
      u.state = {
        style: v[0].style
      };
    else if (h) {
      if (typeof g == "function")
        return u.state = {
          style: h
        }, r0(u);
      u.state = {
        style: d ? gu({}, d, h) : h
      };
    } else
      u.state = {
        style: {}
      };
    return u;
  }
  return m9(n, [{
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
            style: d ? gu({}, d, y) : y
          };
          this.state && g && (d && g[d] !== y || !d && g !== y) && this.setState(b);
          return;
        }
        if (!(EI(o.to, y) && o.canBegin && o.isActive)) {
          var _ = !o.canBegin || !o.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var S = _ || h ? v : o.to;
          if (this.state && g) {
            var x = {
              style: d ? gu({}, d, S) : S
            };
            (d && g[d] !== S || !d && g !== S) && this.setState(x);
          }
          this.runAnimation(Kn(Kn({}, this.props), {}, {
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
      var u = this, c = o.from, f = o.to, d = o.duration, h = o.easing, y = o.begin, v = o.onAnimationEnd, g = o.onAnimationStart, b = l9(c, f, WI(h), d, this.changeStyle), _ = function() {
        u.stopJSAnimation = b();
      };
      this.manager.start([g, y, _, d, v]);
    }
  }, {
    key: "runStepAnimation",
    value: function(o) {
      var u = this, c = o.steps, f = o.begin, d = o.onAnimationStart, h = c[0], y = h.style, v = h.duration, g = v === void 0 ? 0 : v, b = function(S, x, T) {
        if (T === 0)
          return S;
        var E = x.duration, C = x.easing, j = C === void 0 ? "ease" : C, w = x.style, A = x.properties, M = x.onAnimationEnd, N = T > 0 ? c[T - 1] : x, z = A || Object.keys(w);
        if (typeof j == "function" || j === "spring")
          return [].concat($g(S), [u.runJSAnimation.bind(u, {
            from: N.style,
            to: w,
            duration: E,
            easing: j
          }), E]);
        var I = yj(z, E, j), B = Kn(Kn(Kn({}, N.style), w), {}, {
          transition: I
        });
        return [].concat($g(S), [B, E, M]).filter(kI);
      };
      return this.manager.start([d].concat($g(c.reduce(b, [y, Math.max(g, f)])), [o.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(o) {
      this.manager || (this.manager = RI());
      var u = o.begin, c = o.duration, f = o.attributeName, d = o.to, h = o.easing, y = o.onAnimationStart, v = o.onAnimationEnd, g = o.steps, b = o.children, _ = this.manager;
      if (this.unSubscribe = _.subscribe(this.handleStyleChange), typeof h == "function" || typeof b == "function" || h === "spring") {
        this.runJSAnimation(o);
        return;
      }
      if (g.length > 1) {
        this.runStepAnimation(o);
        return;
      }
      var S = f ? gu({}, f, d) : d, x = yj(Object.keys(S), c, h);
      _.start([y, u, Kn(Kn({}, S), {}, {
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
      var d = c9(o, u9), h = te.Children.count(u), y = this.state.style;
      if (typeof u == "function")
        return u(y);
      if (!f || h === 0 || c <= 0)
        return u;
      var v = function(b) {
        var _ = b.props, S = _.style, x = S === void 0 ? {} : S, T = _.className, E = /* @__PURE__ */ te.cloneElement(b, Kn(Kn({}, d), {}, {
          style: Kn(Kn({}, x), y),
          className: T
        }));
        return E;
      };
      return h === 1 ? v(te.Children.only(u)) : /* @__PURE__ */ L.createElement("div", null, te.Children.map(u, function(g) {
        return v(g);
      }));
    }
  }]), n;
})(te.PureComponent);
Qn.displayName = "Animate";
Qn.defaultProps = {
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
Qn.propTypes = {
  from: Ye.oneOfType([Ye.object, Ye.string]),
  to: Ye.oneOfType([Ye.object, Ye.string]),
  attributeName: Ye.string,
  // animation duration
  duration: Ye.number,
  begin: Ye.number,
  easing: Ye.oneOfType([Ye.string, Ye.func]),
  steps: Ye.arrayOf(Ye.shape({
    duration: Ye.number.isRequired,
    style: Ye.object.isRequired,
    easing: Ye.oneOfType([Ye.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), Ye.func]),
    // transition css properties(dash case), optional
    properties: Ye.arrayOf("string"),
    onAnimationEnd: Ye.func
  })),
  children: Ye.oneOfType([Ye.node, Ye.func]),
  isActive: Ye.bool,
  canBegin: Ye.bool,
  onAnimationEnd: Ye.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: Ye.bool,
  onAnimationStart: Ye.func,
  onAnimationReStart: Ye.func
};
function tc(e) {
  "@babel/helpers - typeof";
  return tc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tc(e);
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
function _9(e, t) {
  return T9(e) || A9(e, t) || w9(e, t) || O9();
}
function O9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function w9(e, t) {
  if (e) {
    if (typeof e == "string") return _j(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _j(e, t);
  }
}
function _j(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function A9(e, t) {
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
function T9(e) {
  if (Array.isArray(e)) return e;
}
function Oj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function wj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Oj(Object(n), !0).forEach(function(r) {
      E9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Oj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function E9(e, t, n) {
  return t = j9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function j9(e) {
  var t = M9(e, "string");
  return tc(t) == "symbol" ? t : t + "";
}
function M9(e, t) {
  if (tc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (tc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Aj = function(t, n, r, o, u) {
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
}, C9 = function(t, n) {
  if (!t || !n)
    return !1;
  var r = t.x, o = t.y, u = n.x, c = n.y, f = n.width, d = n.height;
  if (Math.abs(f) > 0 && Math.abs(d) > 0) {
    var h = Math.min(u, u + f), y = Math.max(u, u + f), v = Math.min(c, c + d), g = Math.max(c, c + d);
    return r >= h && r <= y && o >= v && o <= g;
  }
  return !1;
}, D9 = {
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
}, D1 = function(t) {
  var n = wj(wj({}, D9), t), r = te.useRef(), o = te.useState(-1), u = _9(o, 2), c = u[0], f = u[1];
  te.useEffect(function() {
    if (r.current && r.current.getTotalLength)
      try {
        var j = r.current.getTotalLength();
        j && f(j);
      } catch {
      }
  }, []);
  var d = n.x, h = n.y, y = n.width, v = n.height, g = n.radius, b = n.className, _ = n.animationEasing, S = n.animationDuration, x = n.animationBegin, T = n.isAnimationActive, E = n.isUpdateAnimationActive;
  if (d !== +d || h !== +h || y !== +y || v !== +v || y === 0 || v === 0)
    return null;
  var C = ze("recharts-rectangle", b);
  return E ? /* @__PURE__ */ L.createElement(Qn, {
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
  }, function(j) {
    var w = j.width, A = j.height, M = j.x, N = j.y;
    return /* @__PURE__ */ L.createElement(Qn, {
      canBegin: c > 0,
      from: "0px ".concat(c === -1 ? 1 : c, "px"),
      to: "".concat(c, "px 0px"),
      attributeName: "strokeDasharray",
      begin: x,
      duration: S,
      isActive: T,
      easing: _
    }, /* @__PURE__ */ L.createElement("path", qf({}, Te(n, !0), {
      className: C,
      d: Aj(M, N, w, A, g),
      ref: r
    })));
  }) : /* @__PURE__ */ L.createElement("path", qf({}, Te(n, !0), {
    className: C,
    d: Aj(d, h, y, v, g)
  }));
};
function i0() {
  return i0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, i0.apply(this, arguments);
}
var jd = function(t) {
  var n = t.cx, r = t.cy, o = t.r, u = t.className, c = ze("recharts-dot", u);
  return n === +n && r === +r && o === +o ? /* @__PURE__ */ te.createElement("circle", i0({}, Te(t, !1), rf(t), {
    className: c,
    cx: n,
    cy: r,
    r: o
  })) : null;
};
function nc(e) {
  "@babel/helpers - typeof";
  return nc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nc(e);
}
var P9 = ["x", "y", "top", "left", "width", "height", "className"];
function o0() {
  return o0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o0.apply(this, arguments);
}
function Tj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function N9(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tj(Object(n), !0).forEach(function(r) {
      R9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function R9(e, t, n) {
  return t = $9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $9(e) {
  var t = z9(e, "string");
  return nc(t) == "symbol" ? t : t + "";
}
function z9(e, t) {
  if (nc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (nc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function q9(e, t) {
  if (e == null) return {};
  var n = k9(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function k9(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var B9 = function(t, n, r, o, u, c) {
  return "M".concat(t, ",").concat(u, "v").concat(o, "M").concat(c, ",").concat(n, "h").concat(r);
}, L9 = function(t) {
  var n = t.x, r = n === void 0 ? 0 : n, o = t.y, u = o === void 0 ? 0 : o, c = t.top, f = c === void 0 ? 0 : c, d = t.left, h = d === void 0 ? 0 : d, y = t.width, v = y === void 0 ? 0 : y, g = t.height, b = g === void 0 ? 0 : g, _ = t.className, S = q9(t, P9), x = N9({
    x: r,
    y: u,
    top: f,
    left: h,
    width: v,
    height: b
  }, S);
  return !fe(r) || !fe(u) || !fe(v) || !fe(b) || !fe(f) || !fe(h) ? null : /* @__PURE__ */ L.createElement("path", o0({}, Te(x, !0), {
    className: ze("recharts-cross", _),
    d: B9(r, u, v, b, f, h)
  }));
}, zg, Ej;
function U9() {
  if (Ej) return zg;
  Ej = 1;
  var e = qC(), t = e(Object.getPrototypeOf, Object);
  return zg = t, zg;
}
var qg, jj;
function I9() {
  if (jj) return qg;
  jj = 1;
  var e = Vr(), t = U9(), n = Fr(), r = "[object Object]", o = Function.prototype, u = Object.prototype, c = o.toString, f = u.hasOwnProperty, d = c.call(Object);
  function h(y) {
    if (!n(y) || e(y) != r)
      return !1;
    var v = t(y);
    if (v === null)
      return !0;
    var g = f.call(v, "constructor") && v.constructor;
    return typeof g == "function" && g instanceof g && c.call(g) == d;
  }
  return qg = h, qg;
}
var H9 = I9();
const G9 = /* @__PURE__ */ tt(H9);
var kg, Mj;
function Y9() {
  if (Mj) return kg;
  Mj = 1;
  var e = Vr(), t = Fr(), n = "[object Boolean]";
  function r(o) {
    return o === !0 || o === !1 || t(o) && e(o) == n;
  }
  return kg = r, kg;
}
var K9 = Y9();
const X9 = /* @__PURE__ */ tt(K9);
function rc(e) {
  "@babel/helpers - typeof";
  return rc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rc(e);
}
function kf() {
  return kf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, kf.apply(this, arguments);
}
function V9(e, t) {
  return Q9(e) || Z9(e, t) || W9(e, t) || F9();
}
function F9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function W9(e, t) {
  if (e) {
    if (typeof e == "string") return Cj(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Cj(e, t);
  }
}
function Cj(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Z9(e, t) {
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
function Q9(e) {
  if (Array.isArray(e)) return e;
}
function Dj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dj(Object(n), !0).forEach(function(r) {
      J9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function J9(e, t, n) {
  return t = eH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function eH(e) {
  var t = tH(e, "string");
  return rc(t) == "symbol" ? t : t + "";
}
function tH(e, t) {
  if (rc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (rc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nj = function(t, n, r, o, u) {
  var c = r - o, f;
  return f = "M ".concat(t, ",").concat(n), f += "L ".concat(t + r, ",").concat(n), f += "L ".concat(t + r - c / 2, ",").concat(n + u), f += "L ".concat(t + r - c / 2 - o, ",").concat(n + u), f += "L ".concat(t, ",").concat(n, " Z"), f;
}, nH = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, rH = function(t) {
  var n = Pj(Pj({}, nH), t), r = te.useRef(), o = te.useState(-1), u = V9(o, 2), c = u[0], f = u[1];
  te.useEffect(function() {
    if (r.current && r.current.getTotalLength)
      try {
        var C = r.current.getTotalLength();
        C && f(C);
      } catch {
      }
  }, []);
  var d = n.x, h = n.y, y = n.upperWidth, v = n.lowerWidth, g = n.height, b = n.className, _ = n.animationEasing, S = n.animationDuration, x = n.animationBegin, T = n.isUpdateAnimationActive;
  if (d !== +d || h !== +h || y !== +y || v !== +v || g !== +g || y === 0 && v === 0 || g === 0)
    return null;
  var E = ze("recharts-trapezoid", b);
  return T ? /* @__PURE__ */ L.createElement(Qn, {
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
    isActive: T
  }, function(C) {
    var j = C.upperWidth, w = C.lowerWidth, A = C.height, M = C.x, N = C.y;
    return /* @__PURE__ */ L.createElement(Qn, {
      canBegin: c > 0,
      from: "0px ".concat(c === -1 ? 1 : c, "px"),
      to: "".concat(c, "px 0px"),
      attributeName: "strokeDasharray",
      begin: x,
      duration: S,
      easing: _
    }, /* @__PURE__ */ L.createElement("path", kf({}, Te(n, !0), {
      className: E,
      d: Nj(M, N, j, w, A),
      ref: r
    })));
  }) : /* @__PURE__ */ L.createElement("g", null, /* @__PURE__ */ L.createElement("path", kf({}, Te(n, !0), {
    className: E,
    d: Nj(d, h, y, v, g)
  })));
}, aH = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function ac(e) {
  "@babel/helpers - typeof";
  return ac = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ac(e);
}
function iH(e, t) {
  if (e == null) return {};
  var n = oH(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function oH(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Rj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Bf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rj(Object(n), !0).forEach(function(r) {
      lH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Rj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function lH(e, t, n) {
  return t = uH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function uH(e) {
  var t = cH(e, "string");
  return ac(t) == "symbol" ? t : t + "";
}
function cH(e, t) {
  if (ac(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ac(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sH(e, t) {
  return Bf(Bf({}, t), e);
}
function fH(e, t) {
  return e === "symbols";
}
function $j(e) {
  var t = e.shapeType, n = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ L.createElement(D1, n);
    case "trapezoid":
      return /* @__PURE__ */ L.createElement(rH, n);
    case "sector":
      return /* @__PURE__ */ L.createElement(uP, n);
    case "symbols":
      if (fH(t))
        return /* @__PURE__ */ L.createElement(pd, n);
      break;
    default:
      return null;
  }
}
function dH(e) {
  return /* @__PURE__ */ te.isValidElement(e) ? e.props : e;
}
function l0(e) {
  var t = e.option, n = e.shapeType, r = e.propTransformer, o = r === void 0 ? sH : r, u = e.activeClassName, c = u === void 0 ? "recharts-active-shape" : u, f = e.isActive, d = iH(e, aH), h;
  if (/* @__PURE__ */ te.isValidElement(t))
    h = /* @__PURE__ */ te.cloneElement(t, Bf(Bf({}, d), dH(t)));
  else if (Ee(t))
    h = t(d);
  else if (G9(t) && !X9(t)) {
    var y = o(t, d);
    h = /* @__PURE__ */ L.createElement($j, {
      shapeType: n,
      elementProps: y
    });
  } else {
    var v = d;
    h = /* @__PURE__ */ L.createElement($j, {
      shapeType: n,
      elementProps: v
    });
  }
  return f ? /* @__PURE__ */ L.createElement(He, {
    className: c
  }, h) : h;
}
function Md(e, t) {
  return t != null && "trapezoids" in e.props;
}
function Cd(e, t) {
  return t != null && "sectors" in e.props;
}
function ic(e, t) {
  return t != null && "points" in e.props;
}
function hH(e, t) {
  var n, r, o = e.x === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.x) || e.x === t.x, u = e.y === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.y) || e.y === t.y;
  return o && u;
}
function pH(e, t) {
  var n = e.endAngle === t.endAngle, r = e.startAngle === t.startAngle;
  return n && r;
}
function vH(e, t) {
  var n = e.x === t.x, r = e.y === t.y, o = e.z === t.z;
  return n && r && o;
}
function yH(e, t) {
  var n;
  return Md(e, t) ? n = hH : Cd(e, t) ? n = pH : ic(e, t) && (n = vH), n;
}
function mH(e, t) {
  var n;
  return Md(e, t) ? n = "trapezoids" : Cd(e, t) ? n = "sectors" : ic(e, t) && (n = "points"), n;
}
function gH(e, t) {
  if (Md(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  if (Cd(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  return ic(e, t) ? t.payload : {};
}
function bH(e) {
  var t = e.activeTooltipItem, n = e.graphicalItem, r = e.itemData, o = mH(n, t), u = gH(n, t), c = r.filter(function(d, h) {
    var y = vi(u, d), v = n.props[o].filter(function(_) {
      var S = yH(n, t);
      return S(_, t);
    }), g = n.props[o].indexOf(v[v.length - 1]), b = h === g;
    return y && b;
  }), f = r.indexOf(c[c.length - 1]);
  return f;
}
var Bg, zj;
function xH() {
  if (zj) return Bg;
  zj = 1;
  var e = Math.ceil, t = Math.max;
  function n(r, o, u, c) {
    for (var f = -1, d = t(e((o - r) / (u || 1)), 0), h = Array(d); d--; )
      h[c ? d : ++f] = r, r += u;
    return h;
  }
  return Bg = n, Bg;
}
var Lg, qj;
function yP() {
  if (qj) return Lg;
  qj = 1;
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
  return Lg = r, Lg;
}
var Ug, kj;
function SH() {
  if (kj) return Ug;
  kj = 1;
  var e = xH(), t = md(), n = yP();
  function r(o) {
    return function(u, c, f) {
      return f && typeof f != "number" && t(u, c, f) && (c = f = void 0), u = n(u), c === void 0 ? (c = u, u = 0) : c = n(c), f = f === void 0 ? u < c ? 1 : -1 : n(f), e(u, c, f, o);
    };
  }
  return Ug = r, Ug;
}
var Ig, Bj;
function _H() {
  if (Bj) return Ig;
  Bj = 1;
  var e = SH(), t = e();
  return Ig = t, Ig;
}
var OH = _H();
const Lf = /* @__PURE__ */ tt(OH);
function oc(e) {
  "@babel/helpers - typeof";
  return oc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oc(e);
}
function Lj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Uj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lj(Object(n), !0).forEach(function(r) {
      mP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Lj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mP(e, t, n) {
  return t = wH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function wH(e) {
  var t = AH(e, "string");
  return oc(t) == "symbol" ? t : t + "";
}
function AH(e, t) {
  if (oc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (oc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var TH = ["Webkit", "Moz", "O", "ms"], EH = function(t, n) {
  var r = t.replace(/(\w)/, function(u) {
    return u.toUpperCase();
  }), o = TH.reduce(function(u, c) {
    return Uj(Uj({}, u), {}, mP({}, c + r, n));
  }, {});
  return o[t] = n, o;
};
function Lo(e) {
  "@babel/helpers - typeof";
  return Lo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Lo(e);
}
function Uf() {
  return Uf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Uf.apply(this, arguments);
}
function Ij(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Hg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ij(Object(n), !0).forEach(function(r) {
      gn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ij(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function jH(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Hj(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, bP(r.key), r);
  }
}
function MH(e, t, n) {
  return t && Hj(e.prototype, t), n && Hj(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function CH(e, t, n) {
  return t = If(t), DH(e, gP() ? Reflect.construct(t, n || [], If(e).constructor) : t.apply(e, n));
}
function DH(e, t) {
  if (t && (Lo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return PH(e);
}
function PH(e) {
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
function If(e) {
  return If = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, If(e);
}
function NH(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && u0(e, t);
}
function u0(e, t) {
  return u0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, u0(e, t);
}
function gn(e, t, n) {
  return t = bP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function bP(e) {
  var t = RH(e, "string");
  return Lo(t) == "symbol" ? t : t + "";
}
function RH(e, t) {
  if (Lo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Lo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var $H = function(t) {
  var n = t.data, r = t.startIndex, o = t.endIndex, u = t.x, c = t.width, f = t.travellerWidth;
  if (!n || !n.length)
    return {};
  var d = n.length, h = Su().domain(Lf(0, d)).range([u, u + c - f]), y = h.domain().map(function(v) {
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
}, Gj = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, Uo = /* @__PURE__ */ (function(e) {
  function t(n) {
    var r;
    return jH(this, t), r = CH(this, t, [n]), gn(r, "handleDrag", function(o) {
      r.leaveTimer && (clearTimeout(r.leaveTimer), r.leaveTimer = null), r.state.isTravellerMoving ? r.handleTravellerMove(o) : r.state.isSlideMoving && r.handleSlideDrag(o);
    }), gn(r, "handleTouchMove", function(o) {
      o.changedTouches != null && o.changedTouches.length > 0 && r.handleDrag(o.changedTouches[0]);
    }), gn(r, "handleDragEnd", function() {
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
    }), gn(r, "handleLeaveWrapper", function() {
      (r.state.isTravellerMoving || r.state.isSlideMoving) && (r.leaveTimer = window.setTimeout(r.handleDragEnd, r.props.leaveTimeOut));
    }), gn(r, "handleEnterSlideOrTraveller", function() {
      r.setState({
        isTextActive: !0
      });
    }), gn(r, "handleLeaveSlideOrTraveller", function() {
      r.setState({
        isTextActive: !1
      });
    }), gn(r, "handleSlideDragStart", function(o) {
      var u = Gj(o) ? o.changedTouches[0] : o;
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
  return NH(t, e), MH(t, [{
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
      var o = this.props, u = o.data, c = o.tickFormatter, f = o.dataKey, d = Et(u[r], f, r);
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
      var u = Gj(o) ? o.changedTouches[0] : o;
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
      var o = this.state, u = o.brushMoveStartX, c = o.movingTravellerId, f = o.endX, d = o.startX, h = this.state[c], y = this.props, v = y.x, g = y.width, b = y.travellerWidth, _ = y.onChange, S = y.gap, x = y.data, T = {
        startX: this.state.startX,
        endX: this.state.endX
      }, E = r.pageX - u;
      E > 0 ? E = Math.min(E, v + g - b - h) : E < 0 && (E = Math.max(E, v - h)), T[c] = h + E;
      var C = this.getIndex(T), j = C.startIndex, w = C.endIndex, A = function() {
        var N = x.length - 1;
        return c === "startX" && (f > d ? j % S === 0 : w % S === 0) || f < d && w === N || c === "endX" && (f > d ? w % S === 0 : j % S === 0) || f > d && w === N;
      };
      this.setState(gn(gn({}, c, h + E), "brushMoveStartX", r.pageX), function() {
        _ && A() && _(C);
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
          o === "startX" && b >= h || o === "endX" && b <= d || this.setState(gn({}, o, b), function() {
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
      return /* @__PURE__ */ L.createElement("rect", {
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
      var r = this.props, o = r.x, u = r.y, c = r.width, f = r.height, d = r.data, h = r.children, y = r.padding, v = te.Children.only(h);
      return v ? /* @__PURE__ */ L.cloneElement(v, {
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
      var u, c, f = this, d = this.props, h = d.y, y = d.travellerWidth, v = d.height, g = d.traveller, b = d.ariaLabel, _ = d.data, S = d.startIndex, x = d.endIndex, T = Math.max(r, this.props.x), E = Hg(Hg({}, Te(this.props, !1)), {}, {
        x: T,
        y: h,
        width: y,
        height: v
      }), C = b || "Min value: ".concat((u = _[S]) === null || u === void 0 ? void 0 : u.name, ", Max value: ").concat((c = _[x]) === null || c === void 0 ? void 0 : c.name);
      return /* @__PURE__ */ L.createElement(He, {
        tabIndex: 0,
        role: "slider",
        "aria-label": C,
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
      return /* @__PURE__ */ L.createElement("rect", {
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
      return /* @__PURE__ */ L.createElement(He, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ L.createElement(vf, Uf({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(v, g) - b,
        y: c + f / 2
      }, _), this.getTextOfTick(o)), /* @__PURE__ */ L.createElement(vf, Uf({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(v, g) + d + b,
        y: c + f / 2
      }, _), this.getTextOfTick(u)));
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props, o = r.data, u = r.className, c = r.children, f = r.x, d = r.y, h = r.width, y = r.height, v = r.alwaysShowText, g = this.state, b = g.startX, _ = g.endX, S = g.isTextActive, x = g.isSlideMoving, T = g.isTravellerMoving, E = g.isTravellerFocused;
      if (!o || !o.length || !fe(f) || !fe(d) || !fe(h) || !fe(y) || h <= 0 || y <= 0)
        return null;
      var C = ze("recharts-brush", u), j = L.Children.count(c) === 1, w = EH("userSelect", "none");
      return /* @__PURE__ */ L.createElement(He, {
        className: C,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: w
      }, this.renderBackground(), j && this.renderPanorama(), this.renderSlide(b, _), this.renderTravellerLayer(b, "startX"), this.renderTravellerLayer(_, "endX"), (S || x || T || E || v) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(r) {
      var o = r.x, u = r.y, c = r.width, f = r.height, d = r.stroke, h = Math.floor(u + f / 2) - 1;
      return /* @__PURE__ */ L.createElement(L.Fragment, null, /* @__PURE__ */ L.createElement("rect", {
        x: o,
        y: u,
        width: c,
        height: f,
        fill: d,
        stroke: "none"
      }), /* @__PURE__ */ L.createElement("line", {
        x1: o + 1,
        y1: h,
        x2: o + c - 1,
        y2: h,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ L.createElement("line", {
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
      return /* @__PURE__ */ L.isValidElement(r) ? u = /* @__PURE__ */ L.cloneElement(r, o) : Ee(r) ? u = r(o) : u = t.renderDefaultTraveller(o), u;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(r, o) {
      var u = r.data, c = r.width, f = r.x, d = r.travellerWidth, h = r.updateId, y = r.startIndex, v = r.endIndex;
      if (u !== o.prevData || h !== o.prevUpdateId)
        return Hg({
          prevData: u,
          prevTravellerWidth: d,
          prevUpdateId: h,
          prevX: f,
          prevWidth: c
        }, u && u.length ? $H({
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
})(te.PureComponent);
gn(Uo, "displayName", "Brush");
gn(Uo, "defaultProps", {
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
var Gg, Yj;
function zH() {
  if (Yj) return Gg;
  Yj = 1;
  var e = r1();
  function t(n, r) {
    var o;
    return e(n, function(u, c, f) {
      return o = r(u, c, f), !o;
    }), !!o;
  }
  return Gg = t, Gg;
}
var Yg, Kj;
function qH() {
  if (Kj) return Yg;
  Kj = 1;
  var e = CC(), t = Pa(), n = zH(), r = an(), o = md();
  function u(c, f, d) {
    var h = r(c) ? e : n;
    return d && o(c, f, d) && (f = void 0), h(c, t(f, 3));
  }
  return Yg = u, Yg;
}
var kH = qH();
const BH = /* @__PURE__ */ tt(kH);
var pr = function(t, n) {
  var r = t.alwaysShow, o = t.ifOverflow;
  return r && (o = "extendDomain"), o === n;
}, Kg, Xj;
function LH() {
  if (Xj) return Kg;
  Xj = 1;
  var e = VC();
  function t(n, r, o) {
    r == "__proto__" && e ? e(n, r, {
      configurable: !0,
      enumerable: !0,
      value: o,
      writable: !0
    }) : n[r] = o;
  }
  return Kg = t, Kg;
}
var Xg, Vj;
function UH() {
  if (Vj) return Xg;
  Vj = 1;
  var e = LH(), t = KC(), n = Pa();
  function r(o, u) {
    var c = {};
    return u = n(u, 3), t(o, function(f, d, h) {
      e(c, d, u(f, d, h));
    }), c;
  }
  return Xg = r, Xg;
}
var IH = UH();
const HH = /* @__PURE__ */ tt(IH);
var Vg, Fj;
function GH() {
  if (Fj) return Vg;
  Fj = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length; ++r < o; )
      if (!n(t[r], r, t))
        return !1;
    return !0;
  }
  return Vg = e, Vg;
}
var Fg, Wj;
function YH() {
  if (Wj) return Fg;
  Wj = 1;
  var e = r1();
  function t(n, r) {
    var o = !0;
    return e(n, function(u, c, f) {
      return o = !!r(u, c, f), o;
    }), o;
  }
  return Fg = t, Fg;
}
var Wg, Zj;
function KH() {
  if (Zj) return Wg;
  Zj = 1;
  var e = GH(), t = YH(), n = Pa(), r = an(), o = md();
  function u(c, f, d) {
    var h = r(c) ? e : t;
    return d && o(c, f, d) && (f = void 0), h(c, n(f, 3));
  }
  return Wg = u, Wg;
}
var XH = KH();
const xP = /* @__PURE__ */ tt(XH);
var VH = ["x", "y"];
function lc(e) {
  "@babel/helpers - typeof";
  return lc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, lc(e);
}
function c0() {
  return c0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, c0.apply(this, arguments);
}
function Qj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function pu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qj(Object(n), !0).forEach(function(r) {
      FH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function FH(e, t, n) {
  return t = WH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function WH(e) {
  var t = ZH(e, "string");
  return lc(t) == "symbol" ? t : t + "";
}
function ZH(e, t) {
  if (lc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (lc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function QH(e, t) {
  if (e == null) return {};
  var n = JH(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function JH(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function e7(e, t) {
  var n = e.x, r = e.y, o = QH(e, VH), u = "".concat(n), c = parseInt(u, 10), f = "".concat(r), d = parseInt(f, 10), h = "".concat(t.height || o.height), y = parseInt(h, 10), v = "".concat(t.width || o.width), g = parseInt(v, 10);
  return pu(pu(pu(pu(pu({}, t), o), c ? {
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
function Jj(e) {
  return /* @__PURE__ */ L.createElement(l0, c0({
    shapeType: "rectangle",
    propTransformer: e7,
    activeClassName: "recharts-active-bar"
  }, e));
}
var t7 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(r, o) {
    if (typeof t == "number") return t;
    var u = fe(r) || uz(r);
    return u ? t(r, o) : (u || mi(), n);
  };
}, n7 = ["value", "background"], SP;
function Io(e) {
  "@babel/helpers - typeof";
  return Io = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Io(e);
}
function r7(e, t) {
  if (e == null) return {};
  var n = a7(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function a7(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Hf() {
  return Hf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Hf.apply(this, arguments);
}
function eM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eM(Object(n), !0).forEach(function(r) {
      ja(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function i7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function tM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, OP(r.key), r);
  }
}
function o7(e, t, n) {
  return t && tM(e.prototype, t), n && tM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function l7(e, t, n) {
  return t = Gf(t), u7(e, _P() ? Reflect.construct(t, n || [], Gf(e).constructor) : t.apply(e, n));
}
function u7(e, t) {
  if (t && (Io(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return c7(e);
}
function c7(e) {
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
function Gf(e) {
  return Gf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Gf(e);
}
function s7(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && s0(e, t);
}
function s0(e, t) {
  return s0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, s0(e, t);
}
function ja(e, t, n) {
  return t = OP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function OP(e) {
  var t = f7(e, "string");
  return Io(t) == "symbol" ? t : t + "";
}
function f7(e, t) {
  if (Io(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Io(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Xr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    i7(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = l7(this, t, [].concat(o)), ja(n, "state", {
      isAnimationFinished: !1
    }), ja(n, "id", xi("recharts-bar-")), ja(n, "handleAnimationEnd", function() {
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
  return s7(t, e), o7(t, [{
    key: "renderRectanglesStatically",
    value: function(r) {
      var o = this, u = this.props, c = u.shape, f = u.dataKey, d = u.activeIndex, h = u.activeBar, y = Te(this.props, !1);
      return r && r.map(function(v, g) {
        var b = g === d, _ = b ? h : c, S = xt(xt(xt({}, y), v), {}, {
          isActive: b,
          option: _,
          index: g,
          dataKey: f,
          onAnimationStart: o.handleAnimationStart,
          onAnimationEnd: o.handleAnimationEnd
        });
        return /* @__PURE__ */ L.createElement(He, Hf({
          className: "recharts-bar-rectangle"
        }, Cu(o.props, v, g), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(v == null ? void 0 : v.x, "-").concat(v == null ? void 0 : v.y, "-").concat(v == null ? void 0 : v.value, "-").concat(g)
        }), /* @__PURE__ */ L.createElement(Jj, S));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var r = this, o = this.props, u = o.data, c = o.layout, f = o.isAnimationActive, d = o.animationBegin, h = o.animationDuration, y = o.animationEasing, v = o.animationId, g = this.state.prevData;
      return /* @__PURE__ */ L.createElement(Qn, {
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
        var _ = b.t, S = u.map(function(x, T) {
          var E = g && g[T];
          if (E) {
            var C = vt(E.x, x.x), j = vt(E.y, x.y), w = vt(E.width, x.width), A = vt(E.height, x.height);
            return xt(xt({}, x), {}, {
              x: C(_),
              y: j(_),
              width: w(_),
              height: A(_)
            });
          }
          if (c === "horizontal") {
            var M = vt(0, x.height), N = M(_);
            return xt(xt({}, x), {}, {
              y: x.y + x.height - N,
              height: N
            });
          }
          var z = vt(0, x.width), I = z(_);
          return xt(xt({}, x), {}, {
            width: I
          });
        });
        return /* @__PURE__ */ L.createElement(He, null, r.renderRectanglesStatically(S));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var r = this.props, o = r.data, u = r.isAnimationActive, c = this.state.prevData;
      return u && o && o.length && (!c || !vi(c, o)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(o);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var r = this, o = this.props, u = o.data, c = o.dataKey, f = o.activeIndex, d = Te(this.props.background, !1);
      return u.map(function(h, y) {
        h.value;
        var v = h.background, g = r7(h, n7);
        if (!v)
          return null;
        var b = xt(xt(xt(xt(xt({}, g), {}, {
          fill: "#eee"
        }, v), d), Cu(r.props, h, y)), {}, {
          onAnimationStart: r.handleAnimationStart,
          onAnimationEnd: r.handleAnimationEnd,
          dataKey: c,
          index: y,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ L.createElement(Jj, Hf({
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
      var u = this.props, c = u.data, f = u.xAxis, d = u.yAxis, h = u.layout, y = u.children, v = rn(y, sl);
      if (!v)
        return null;
      var g = h === "vertical" ? c[0].height / 2 : c[0].width / 2, b = function(x, T) {
        var E = Array.isArray(x.value) ? x.value[1] : x.value;
        return {
          x: x.x,
          y: x.y,
          value: E,
          errorVal: Et(x, T)
        };
      }, _ = {
        clipPath: r ? "url(#clipPath-".concat(o, ")") : null
      };
      return /* @__PURE__ */ L.createElement(He, _, v.map(function(S) {
        return /* @__PURE__ */ L.cloneElement(S, {
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
      var x = this.state.isAnimationFinished, T = ze("recharts-bar", c), E = f && f.allowDataOverflow, C = d && d.allowDataOverflow, j = E || C, w = we(S) ? this.id : S;
      return /* @__PURE__ */ L.createElement(He, {
        className: T
      }, E || C ? /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("clipPath", {
        id: "clipPath-".concat(w)
      }, /* @__PURE__ */ L.createElement("rect", {
        x: E ? h : h - v / 2,
        y: C ? y : y - g / 2,
        width: E ? v : v * 2,
        height: C ? g : g * 2
      }))) : null, /* @__PURE__ */ L.createElement(He, {
        className: "recharts-bar-rectangles",
        clipPath: j ? "url(#clipPath-".concat(w, ")") : null
      }, _ ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(j, w), (!b || x) && hr.renderCallByParent(this.props, u));
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
})(te.PureComponent);
SP = Xr;
ja(Xr, "displayName", "Bar");
ja(Xr, "defaultProps", {
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
ja(Xr, "getComposedData", function(e) {
  var t = e.props, n = e.item, r = e.barPosition, o = e.bandSize, u = e.xAxis, c = e.yAxis, f = e.xAxisTicks, d = e.yAxisTicks, h = e.stackedData, y = e.dataStartIndex, v = e.displayedData, g = e.offset, b = EL(r, n);
  if (!b)
    return null;
  var _ = t.layout, S = n.type.defaultProps, x = S !== void 0 ? xt(xt({}, S), n.props) : n.props, T = x.dataKey, E = x.children, C = x.minPointSize, j = _ === "horizontal" ? c : u, w = h ? j.scale.domain() : null, A = $L({
    numericAxis: j
  }), M = rn(E, gd), N = v.map(function(z, I) {
    var B, k, V, Q, K, R;
    h ? B = jL(h[y + I], w) : (B = Et(z, T), Array.isArray(B) || (B = [A, B]));
    var Y = t7(C, SP.defaultProps.minPointSize)(B[1], I);
    if (_ === "horizontal") {
      var J, G = [c.scale(B[0]), c.scale(B[1])], ee = G[0], P = G[1];
      k = U2({
        axis: u,
        ticks: f,
        bandSize: o,
        offset: b.offset,
        entry: z,
        index: I
      }), V = (J = P ?? ee) !== null && J !== void 0 ? J : void 0, Q = b.size;
      var U = ee - P;
      if (K = Number.isNaN(U) ? 0 : U, R = {
        x: k,
        y: c.y,
        width: Q,
        height: c.height
      }, Math.abs(Y) > 0 && Math.abs(K) < Math.abs(Y)) {
        var re = Zn(K || Y) * (Math.abs(Y) - Math.abs(K));
        V -= re, K += re;
      }
    } else {
      var se = [u.scale(B[0]), u.scale(B[1])], he = se[0], ye = se[1];
      if (k = he, V = U2({
        axis: c,
        ticks: d,
        bandSize: o,
        offset: b.offset,
        entry: z,
        index: I
      }), Q = ye - he, K = b.size, R = {
        x: u.x,
        y: V,
        width: u.width,
        height: K
      }, Math.abs(Y) > 0 && Math.abs(Q) < Math.abs(Y)) {
        var de = Zn(Q || Y) * (Math.abs(Y) - Math.abs(Q));
        Q += de;
      }
    }
    return xt(xt(xt({}, z), {}, {
      x: k,
      y: V,
      width: Q,
      height: K,
      value: h ? B : B[1],
      payload: z,
      background: R
    }, M && M[I] && M[I].props), {}, {
      tooltipPayload: [iP(n, z)],
      tooltipPosition: {
        x: k + Q / 2,
        y: V + K / 2
      }
    });
  });
  return xt({
    data: N,
    layout: _
  }, g);
});
function uc(e) {
  "@babel/helpers - typeof";
  return uc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, uc(e);
}
function d7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function nM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, wP(r.key), r);
  }
}
function h7(e, t, n) {
  return t && nM(e.prototype, t), n && nM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function rM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Xn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rM(Object(n), !0).forEach(function(r) {
      Dd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : rM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Dd(e, t, n) {
  return t = wP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function wP(e) {
  var t = p7(e, "string");
  return uc(t) == "symbol" ? t : t + "";
}
function p7(e, t) {
  if (uc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (uc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Pd = function(t, n, r, o, u) {
  var c = t.width, f = t.height, d = t.layout, h = t.children, y = Object.keys(n), v = {
    left: r.left,
    leftMirror: r.left,
    right: c - r.right,
    rightMirror: c - r.right,
    top: r.top,
    topMirror: r.top,
    bottom: f - r.bottom,
    bottomMirror: f - r.bottom
  }, g = !!bn(h, Xr);
  return y.reduce(function(b, _) {
    var S = n[_], x = S.orientation, T = S.domain, E = S.padding, C = E === void 0 ? {} : E, j = S.mirror, w = S.reversed, A = "".concat(x).concat(j ? "Mirror" : ""), M, N, z, I, B;
    if (S.type === "number" && (S.padding === "gap" || S.padding === "no-gap")) {
      var k = T[1] - T[0], V = 1 / 0, Q = S.categoricalDomain.sort(dz);
      if (Q.forEach(function(se, he) {
        he > 0 && (V = Math.min((se || 0) - (Q[he - 1] || 0), V));
      }), Number.isFinite(V)) {
        var K = V / k, R = S.layout === "vertical" ? r.height : r.width;
        if (S.padding === "gap" && (M = K * R / 2), S.padding === "no-gap") {
          var Y = pi(t.barCategoryGap, K * R), J = K * R / 2;
          M = J - Y - (J - Y) / R * Y;
        }
      }
    }
    o === "xAxis" ? N = [r.left + (C.left || 0) + (M || 0), r.left + r.width - (C.right || 0) - (M || 0)] : o === "yAxis" ? N = d === "horizontal" ? [r.top + r.height - (C.bottom || 0), r.top + (C.top || 0)] : [r.top + (C.top || 0) + (M || 0), r.top + r.height - (C.bottom || 0) - (M || 0)] : N = S.range, w && (N = [N[1], N[0]]);
    var G = AL(S, u, g), ee = G.scale, P = G.realScaleType;
    ee.domain(T).range(N), TL(ee);
    var U = RL(ee, Xn(Xn({}, S), {}, {
      realScaleType: P
    }));
    o === "xAxis" ? (B = x === "top" && !j || x === "bottom" && j, z = r.left, I = v[A] - B * S.height) : o === "yAxis" && (B = x === "left" && !j || x === "right" && j, z = v[A] - B * S.width, I = r.top);
    var re = Xn(Xn(Xn({}, S), U), {}, {
      realScaleType: P,
      x: z,
      y: I,
      scale: ee,
      width: o === "xAxis" ? r.width : S.width,
      height: o === "yAxis" ? r.height : S.height
    });
    return re.bandSize = Cf(re, U), !S.hide && o === "xAxis" ? v[A] += (B ? -1 : 1) * re.height : S.hide || (v[A] += (B ? -1 : 1) * re.width), Xn(Xn({}, b), {}, Dd({}, _, re));
  }, {});
}, AP = function(t, n) {
  var r = t.x, o = t.y, u = n.x, c = n.y;
  return {
    x: Math.min(r, u),
    y: Math.min(o, c),
    width: Math.abs(u - r),
    height: Math.abs(c - o)
  };
}, v7 = function(t) {
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
    d7(this, e), this.scale = t;
  }
  return h7(e, [{
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
Dd(TP, "EPS", 1e-4);
var P1 = function(t) {
  var n = Object.keys(t).reduce(function(r, o) {
    return Xn(Xn({}, r), {}, Dd({}, o, TP.create(t[o])));
  }, {});
  return Xn(Xn({}, n), {}, {
    apply: function(o) {
      var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = u.bandAware, f = u.position;
      return HH(o, function(d, h) {
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
function y7(e) {
  return (e % 180 + 180) % 180;
}
var m7 = function(t) {
  var n = t.width, r = t.height, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, u = y7(o), c = u * Math.PI / 180, f = Math.atan(r / n), d = c > f && c < Math.PI - f ? r / Math.sin(c) : n / Math.cos(c);
  return Math.abs(d);
}, Zg, aM;
function g7() {
  if (aM) return Zg;
  aM = 1;
  var e = Pa(), t = hc(), n = vd();
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
  return Zg = r, Zg;
}
var Qg, iM;
function b7() {
  if (iM) return Qg;
  iM = 1;
  var e = yP();
  function t(n) {
    var r = e(n), o = r % 1;
    return r === r ? o ? r - o : r : 0;
  }
  return Qg = t, Qg;
}
var Jg, oM;
function x7() {
  if (oM) return Jg;
  oM = 1;
  var e = UC(), t = Pa(), n = b7(), r = Math.max;
  function o(u, c, f) {
    var d = u == null ? 0 : u.length;
    if (!d)
      return -1;
    var h = f == null ? 0 : n(f);
    return h < 0 && (h = r(d + h, 0)), e(u, t(c, 3), h);
  }
  return Jg = o, Jg;
}
var eb, lM;
function S7() {
  if (lM) return eb;
  lM = 1;
  var e = g7(), t = x7(), n = e(t);
  return eb = n, eb;
}
var _7 = S7();
const O7 = /* @__PURE__ */ tt(_7);
var w7 = nC();
const A7 = /* @__PURE__ */ tt(w7);
var T7 = A7(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
}), N1 = /* @__PURE__ */ te.createContext(void 0), R1 = /* @__PURE__ */ te.createContext(void 0), EP = /* @__PURE__ */ te.createContext(void 0), jP = /* @__PURE__ */ te.createContext({}), MP = /* @__PURE__ */ te.createContext(void 0), CP = /* @__PURE__ */ te.createContext(0), DP = /* @__PURE__ */ te.createContext(0), uM = function(t) {
  var n = t.state, r = n.xAxisMap, o = n.yAxisMap, u = n.offset, c = t.clipPathId, f = t.children, d = t.width, h = t.height, y = T7(u);
  return /* @__PURE__ */ L.createElement(N1.Provider, {
    value: r
  }, /* @__PURE__ */ L.createElement(R1.Provider, {
    value: o
  }, /* @__PURE__ */ L.createElement(jP.Provider, {
    value: u
  }, /* @__PURE__ */ L.createElement(EP.Provider, {
    value: y
  }, /* @__PURE__ */ L.createElement(MP.Provider, {
    value: c
  }, /* @__PURE__ */ L.createElement(CP.Provider, {
    value: h
  }, /* @__PURE__ */ L.createElement(DP.Provider, {
    value: d
  }, f)))))));
}, E7 = function() {
  return te.useContext(MP);
}, PP = function(t) {
  var n = te.useContext(N1);
  n == null && mi();
  var r = n[t];
  return r == null && mi(), r;
}, j7 = function() {
  var t = te.useContext(N1);
  return Ta(t);
}, M7 = function() {
  var t = te.useContext(R1), n = O7(t, function(r) {
    return xP(r.domain, Number.isFinite);
  });
  return n || Ta(t);
}, NP = function(t) {
  var n = te.useContext(R1);
  n == null && mi();
  var r = n[t];
  return r == null && mi(), r;
}, C7 = function() {
  var t = te.useContext(EP);
  return t;
}, D7 = function() {
  return te.useContext(jP);
}, $1 = function() {
  return te.useContext(DP);
}, z1 = function() {
  return te.useContext(CP);
};
function Ho(e) {
  "@babel/helpers - typeof";
  return Ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ho(e);
}
function P7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function N7(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, $P(r.key), r);
  }
}
function R7(e, t, n) {
  return t && N7(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $7(e, t, n) {
  return t = Yf(t), z7(e, RP() ? Reflect.construct(t, n || [], Yf(e).constructor) : t.apply(e, n));
}
function z7(e, t) {
  if (t && (Ho(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return q7(e);
}
function q7(e) {
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
function Yf(e) {
  return Yf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Yf(e);
}
function k7(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && f0(e, t);
}
function f0(e, t) {
  return f0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, f0(e, t);
}
function cM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function sM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cM(Object(n), !0).forEach(function(r) {
      q1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function q1(e, t, n) {
  return t = $P(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $P(e) {
  var t = B7(e, "string");
  return Ho(t) == "symbol" ? t : t + "";
}
function B7(e, t) {
  if (Ho(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ho(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function L7(e, t) {
  return G7(e) || H7(e, t) || I7(e, t) || U7();
}
function U7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function I7(e, t) {
  if (e) {
    if (typeof e == "string") return fM(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return fM(e, t);
  }
}
function fM(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function H7(e, t) {
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
function G7(e) {
  if (Array.isArray(e)) return e;
}
function d0() {
  return d0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, d0.apply(this, arguments);
}
var Y7 = function(t, n) {
  var r;
  return /* @__PURE__ */ L.isValidElement(t) ? r = /* @__PURE__ */ L.cloneElement(t, n) : Ee(t) ? r = t(n) : r = /* @__PURE__ */ L.createElement("line", d0({}, n, {
    className: "recharts-reference-line-line"
  })), r;
}, K7 = function(t, n, r, o, u, c, f, d, h) {
  var y = u.x, v = u.y, g = u.width, b = u.height;
  if (r) {
    var _ = h.y, S = t.y.apply(_, {
      position: c
    });
    if (pr(h, "discard") && !t.y.isInRange(S))
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
    var T = h.x, E = t.x.apply(T, {
      position: c
    });
    if (pr(h, "discard") && !t.x.isInRange(E))
      return null;
    var C = [{
      x: E,
      y: v + b
    }, {
      x: E,
      y: v
    }];
    return f === "top" ? C.reverse() : C;
  }
  if (o) {
    var j = h.segment, w = j.map(function(A) {
      return t.apply(A, {
        position: c
      });
    });
    return pr(h, "discard") && BH(w, function(A) {
      return !t.isInRange(A);
    }) ? null : w;
  }
  return null;
};
function X7(e) {
  var t = e.x, n = e.y, r = e.segment, o = e.xAxisId, u = e.yAxisId, c = e.shape, f = e.className, d = e.alwaysShow, h = E7(), y = PP(o), v = NP(u), g = C7();
  if (!h || !g)
    return null;
  Ir(d === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var b = P1({
    x: y.scale,
    y: v.scale
  }), _ = Tt(t), S = Tt(n), x = r && r.length === 2, T = K7(b, _, S, x, g, e.position, y.orientation, v.orientation, e);
  if (!T)
    return null;
  var E = L7(T, 2), C = E[0], j = C.x, w = C.y, A = E[1], M = A.x, N = A.y, z = pr(e, "hidden") ? "url(#".concat(h, ")") : void 0, I = sM(sM({
    clipPath: z
  }, Te(e, !0)), {}, {
    x1: j,
    y1: w,
    x2: M,
    y2: N
  });
  return /* @__PURE__ */ L.createElement(He, {
    className: ze("recharts-reference-line", f)
  }, Y7(c, I), Gt.renderCallByParent(e, v7({
    x1: j,
    y1: w,
    x2: M,
    y2: N
  })));
}
var Nd = /* @__PURE__ */ (function(e) {
  function t() {
    return P7(this, t), $7(this, t, arguments);
  }
  return k7(t, e), R7(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ L.createElement(X7, this.props);
    }
  }]);
})(L.Component);
q1(Nd, "displayName", "ReferenceLine");
q1(Nd, "defaultProps", {
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
function dM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function hM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dM(Object(n), !0).forEach(function(r) {
      Rd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function V7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function F7(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, qP(r.key), r);
  }
}
function W7(e, t, n) {
  return t && F7(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Z7(e, t, n) {
  return t = Kf(t), Q7(e, zP() ? Reflect.construct(t, n || [], Kf(e).constructor) : t.apply(e, n));
}
function Q7(e, t) {
  if (t && (Go(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return J7(e);
}
function J7(e) {
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
function Kf(e) {
  return Kf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Kf(e);
}
function eG(e, t) {
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
  return t = qP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function qP(e) {
  var t = tG(e, "string");
  return Go(t) == "symbol" ? t : t + "";
}
function tG(e, t) {
  if (Go(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Go(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var nG = function(t) {
  var n = t.x, r = t.y, o = t.xAxis, u = t.yAxis, c = P1({
    x: o.scale,
    y: u.scale
  }), f = c.apply({
    x: n,
    y: r
  }, {
    bandAware: !0
  });
  return pr(t, "discard") && !c.isInRange(f) ? null : f;
}, $d = /* @__PURE__ */ (function(e) {
  function t() {
    return V7(this, t), Z7(this, t, arguments);
  }
  return eG(t, e), W7(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.x, u = r.y, c = r.r, f = r.alwaysShow, d = r.clipPathId, h = Tt(o), y = Tt(u);
      if (Ir(f === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !h || !y)
        return null;
      var v = nG(this.props);
      if (!v)
        return null;
      var g = v.x, b = v.y, _ = this.props, S = _.shape, x = _.className, T = pr(this.props, "hidden") ? "url(#".concat(d, ")") : void 0, E = hM(hM({
        clipPath: T
      }, Te(this.props, !0)), {}, {
        cx: g,
        cy: b
      });
      return /* @__PURE__ */ L.createElement(He, {
        className: ze("recharts-reference-dot", x)
      }, t.renderDot(S, E), Gt.renderCallByParent(this.props, {
        x: g - c,
        y: b - c,
        width: 2 * c,
        height: 2 * c
      }));
    }
  }]);
})(L.Component);
Rd($d, "displayName", "ReferenceDot");
Rd($d, "defaultProps", {
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
Rd($d, "renderDot", function(e, t) {
  var n;
  return /* @__PURE__ */ L.isValidElement(e) ? n = /* @__PURE__ */ L.cloneElement(e, t) : Ee(e) ? n = e(t) : n = /* @__PURE__ */ L.createElement(jd, h0({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), n;
});
function v0() {
  return v0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, v0.apply(this, arguments);
}
function Yo(e) {
  "@babel/helpers - typeof";
  return Yo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yo(e);
}
function pM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function vM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pM(Object(n), !0).forEach(function(r) {
      zd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function rG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function aG(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, BP(r.key), r);
  }
}
function iG(e, t, n) {
  return t && aG(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function oG(e, t, n) {
  return t = Xf(t), lG(e, kP() ? Reflect.construct(t, n || [], Xf(e).constructor) : t.apply(e, n));
}
function lG(e, t) {
  if (t && (Yo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return uG(e);
}
function uG(e) {
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
function Xf(e) {
  return Xf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Xf(e);
}
function cG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && y0(e, t);
}
function y0(e, t) {
  return y0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, y0(e, t);
}
function zd(e, t, n) {
  return t = BP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function BP(e) {
  var t = sG(e, "string");
  return Yo(t) == "symbol" ? t : t + "";
}
function sG(e, t) {
  if (Yo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var fG = function(t, n, r, o, u) {
  var c = u.x1, f = u.x2, d = u.y1, h = u.y2, y = u.xAxis, v = u.yAxis;
  if (!y || !v) return null;
  var g = P1({
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
  return pr(u, "discard") && (!g.isInRange(b) || !g.isInRange(_)) ? null : AP(b, _);
}, qd = /* @__PURE__ */ (function(e) {
  function t() {
    return rG(this, t), oG(this, t, arguments);
  }
  return cG(t, e), iG(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.x1, u = r.x2, c = r.y1, f = r.y2, d = r.className, h = r.alwaysShow, y = r.clipPathId;
      Ir(h === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var v = Tt(o), g = Tt(u), b = Tt(c), _ = Tt(f), S = this.props.shape;
      if (!v && !g && !b && !_ && !S)
        return null;
      var x = fG(v, g, b, _, this.props);
      if (!x && !S)
        return null;
      var T = pr(this.props, "hidden") ? "url(#".concat(y, ")") : void 0;
      return /* @__PURE__ */ L.createElement(He, {
        className: ze("recharts-reference-area", d)
      }, t.renderRect(S, vM(vM({
        clipPath: T
      }, Te(this.props, !0)), x)), Gt.renderCallByParent(this.props, x));
    }
  }]);
})(L.Component);
zd(qd, "displayName", "ReferenceArea");
zd(qd, "defaultProps", {
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
zd(qd, "renderRect", function(e, t) {
  var n;
  return /* @__PURE__ */ L.isValidElement(e) ? n = /* @__PURE__ */ L.cloneElement(e, t) : Ee(e) ? n = e(t) : n = /* @__PURE__ */ L.createElement(D1, v0({}, t, {
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
function dG(e, t, n) {
  var r = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return m7(r, n);
}
function hG(e, t, n) {
  var r = n === "width", o = e.x, u = e.y, c = e.width, f = e.height;
  return t === 1 ? {
    start: r ? o : u,
    end: r ? o + c : u + f
  } : {
    start: r ? o + c : u + f,
    end: r ? o : u
  };
}
function Vf(e, t, n, r, o) {
  if (e * t < e * r || e * t > e * o)
    return !1;
  var u = n();
  return e * (t - e * u / 2 - r) >= 0 && e * (t + e * u / 2 - o) <= 0;
}
function pG(e, t) {
  return LP(e, t + 1);
}
function vG(e, t, n, r, o) {
  for (var u = (r || []).slice(), c = t.start, f = t.end, d = 0, h = 1, y = c, v = function() {
    var _ = r == null ? void 0 : r[d];
    if (_ === void 0)
      return {
        v: LP(r, h)
      };
    var S = d, x, T = function() {
      return x === void 0 && (x = n(_, S)), x;
    }, E = _.coordinate, C = d === 0 || Vf(e, E, T, y, f);
    C || (d = 0, y = c, h += 1), C && (y = E + e * (T() / 2 + o), d += h);
  }, g; h <= u.length; )
    if (g = v(), g) return g.v;
  return [];
}
function cc(e) {
  "@babel/helpers - typeof";
  return cc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cc(e);
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
function It(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yM(Object(n), !0).forEach(function(r) {
      yG(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function yG(e, t, n) {
  return t = mG(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function mG(e) {
  var t = gG(e, "string");
  return cc(t) == "symbol" ? t : t + "";
}
function gG(e, t) {
  if (cc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (cc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bG(e, t, n, r, o) {
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
    var T = Vf(e, b.tickCoord, S, f, d);
    T && (d = b.tickCoord - e * (S() / 2 + o), u[g] = It(It({}, b), {}, {
      isShow: !0
    }));
  }, y = c - 1; y >= 0; y--)
    h(y);
  return u;
}
function xG(e, t, n, r, o, u) {
  var c = (r || []).slice(), f = c.length, d = t.start, h = t.end;
  if (u) {
    var y = r[f - 1], v = n(y, f - 1), g = e * (y.coordinate + e * v / 2 - h);
    c[f - 1] = y = It(It({}, y), {}, {
      tickCoord: g > 0 ? y.coordinate - g * e : y.coordinate
    });
    var b = Vf(e, y.tickCoord, function() {
      return v;
    }, d, h);
    b && (h = y.tickCoord - e * (v / 2 + o), c[f - 1] = It(It({}, y), {}, {
      isShow: !0
    }));
  }
  for (var _ = u ? f - 1 : f, S = function(E) {
    var C = c[E], j, w = function() {
      return j === void 0 && (j = n(C, E)), j;
    };
    if (E === 0) {
      var A = e * (C.coordinate - e * w() / 2 - d);
      c[E] = C = It(It({}, C), {}, {
        tickCoord: A < 0 ? C.coordinate - A * e : C.coordinate
      });
    } else
      c[E] = C = It(It({}, C), {}, {
        tickCoord: C.coordinate
      });
    var M = Vf(e, C.tickCoord, w, d, h);
    M && (d = C.tickCoord + e * (w() / 2 + o), c[E] = It(It({}, C), {}, {
      isShow: !0
    }));
  }, x = 0; x < _; x++)
    S(x);
  return c;
}
function k1(e, t, n) {
  var r = e.tick, o = e.ticks, u = e.viewBox, c = e.minTickGap, f = e.orientation, d = e.interval, h = e.tickFormatter, y = e.unit, v = e.angle;
  if (!o || !o.length || !r)
    return [];
  if (fe(d) || Na.isSsr)
    return pG(o, typeof d == "number" && fe(d) ? d : 0);
  var g = [], b = f === "top" || f === "bottom" ? "width" : "height", _ = y && b === "width" ? xu(y, {
    fontSize: t,
    letterSpacing: n
  }) : {
    width: 0,
    height: 0
  }, S = function(C, j) {
    var w = Ee(h) ? h(C.value, j) : C.value;
    return b === "width" ? dG(xu(w, {
      fontSize: t,
      letterSpacing: n
    }), _, v) : xu(w, {
      fontSize: t,
      letterSpacing: n
    })[b];
  }, x = o.length >= 2 ? Zn(o[1].coordinate - o[0].coordinate) : 1, T = hG(u, x, b);
  return d === "equidistantPreserveStart" ? vG(x, T, S, o, c) : (d === "preserveStart" || d === "preserveStartEnd" ? g = xG(x, T, S, o, c, d === "preserveStartEnd") : g = bG(x, T, S, o, c), g.filter(function(E) {
    return E.isShow;
  }));
}
var SG = ["viewBox"], _G = ["viewBox"], OG = ["ticks"];
function Ko(e) {
  "@babel/helpers - typeof";
  return Ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ko(e);
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
function mM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function wt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mM(Object(n), !0).forEach(function(r) {
      B1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function tb(e, t) {
  if (e == null) return {};
  var n = wG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function wG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function AG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, IP(r.key), r);
  }
}
function TG(e, t, n) {
  return t && gM(e.prototype, t), n && gM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function EG(e, t, n) {
  return t = Ff(t), jG(e, UP() ? Reflect.construct(t, n || [], Ff(e).constructor) : t.apply(e, n));
}
function jG(e, t) {
  if (t && (Ko(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return MG(e);
}
function MG(e) {
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
function Ff(e) {
  return Ff = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ff(e);
}
function CG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && m0(e, t);
}
function m0(e, t) {
  return m0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, m0(e, t);
}
function B1(e, t, n) {
  return t = IP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function IP(e) {
  var t = DG(e, "string");
  return Ko(t) == "symbol" ? t : t + "";
}
function DG(e, t) {
  if (Ko(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ko(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var fl = /* @__PURE__ */ (function(e) {
  function t(n) {
    var r;
    return AG(this, t), r = EG(this, t, [n]), r.state = {
      fontSize: "",
      letterSpacing: ""
    }, r;
  }
  return CG(t, e), TG(t, [{
    key: "shouldComponentUpdate",
    value: function(r, o) {
      var u = r.viewBox, c = tb(r, SG), f = this.props, d = f.viewBox, h = tb(f, _G);
      return !wo(u, d) || !wo(c, h) || !wo(o, this.state);
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
      var o = this.props, u = o.x, c = o.y, f = o.width, d = o.height, h = o.orientation, y = o.tickSize, v = o.mirror, g = o.tickMargin, b, _, S, x, T, E, C = v ? -1 : 1, j = r.tickSize || y, w = fe(r.tickCoord) ? r.tickCoord : r.coordinate;
      switch (h) {
        case "top":
          b = _ = r.coordinate, x = c + +!v * d, S = x - C * j, E = S - C * g, T = w;
          break;
        case "left":
          S = x = r.coordinate, _ = u + +!v * f, b = _ - C * j, T = b - C * g, E = w;
          break;
        case "right":
          S = x = r.coordinate, _ = u + +v * f, b = _ + C * j, T = b + C * g, E = w;
          break;
        default:
          b = _ = r.coordinate, x = c + +v * d, S = x + C * j, E = S + C * g, T = w;
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
          x: T,
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
      var r = this.props, o = r.x, u = r.y, c = r.width, f = r.height, d = r.orientation, h = r.mirror, y = r.axisLine, v = wt(wt(wt({}, Te(this.props, !1)), Te(y, !1)), {}, {
        fill: "none"
      });
      if (d === "top" || d === "bottom") {
        var g = +(d === "top" && !h || d === "bottom" && h);
        v = wt(wt({}, v), {}, {
          x1: o,
          y1: u + g * f,
          x2: o + c,
          y2: u + g * f
        });
      } else {
        var b = +(d === "left" && !h || d === "right" && h);
        v = wt(wt({}, v), {}, {
          x1: o + b * c,
          y1: u,
          x2: o + b * c,
          y2: u + f
        });
      }
      return /* @__PURE__ */ L.createElement("line", _o({}, v, {
        className: ze("recharts-cartesian-axis-line", Bn(y, "className"))
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
        var c = this, f = this.props, d = f.tickLine, h = f.stroke, y = f.tick, v = f.tickFormatter, g = f.unit, b = k1(wt(wt({}, this.props), {}, {
          ticks: r
        }), o, u), _ = this.getTickTextAnchor(), S = this.getTickVerticalAnchor(), x = Te(this.props, !1), T = Te(y, !1), E = wt(wt({}, x), {}, {
          fill: "none"
        }, Te(d, !1)), C = b.map(function(j, w) {
          var A = c.getTickLineCoord(j), M = A.line, N = A.tick, z = wt(wt(wt(wt({
            textAnchor: _,
            verticalAnchor: S
          }, x), {}, {
            stroke: "none",
            fill: h
          }, T), N), {}, {
            index: w,
            payload: j,
            visibleTicksCount: b.length,
            tickFormatter: v
          });
          return /* @__PURE__ */ L.createElement(He, _o({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(j.value, "-").concat(j.coordinate, "-").concat(j.tickCoord)
          }, Cu(c.props, j, w)), d && /* @__PURE__ */ L.createElement("line", _o({}, E, M, {
            className: ze("recharts-cartesian-axis-tick-line", Bn(d, "className"))
          })), y && t.renderTickItem(y, z, "".concat(Ee(v) ? v(j.value, w) : j.value).concat(g || "")));
        });
        return /* @__PURE__ */ L.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, C);
      }
    )
  }, {
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.axisLine, c = o.width, f = o.height, d = o.ticksGenerator, h = o.className, y = o.hide;
      if (y)
        return null;
      var v = this.props, g = v.ticks, b = tb(v, OG), _ = g;
      return Ee(d) && (_ = g && g.length > 0 ? d(this.props) : d(b)), c <= 0 || f <= 0 || !_ || !_.length ? null : /* @__PURE__ */ L.createElement(He, {
        className: ze("recharts-cartesian-axis", h),
        ref: function(x) {
          r.layerReference = x;
        }
      }, u && this.renderAxisLine(), this.renderTicks(_, this.state.fontSize, this.state.letterSpacing), Gt.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(r, o, u) {
      var c, f = ze(o.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ L.isValidElement(r) ? c = /* @__PURE__ */ L.cloneElement(r, wt(wt({}, o), {}, {
        className: f
      })) : Ee(r) ? c = r(wt(wt({}, o), {}, {
        className: f
      })) : c = /* @__PURE__ */ L.createElement(vf, _o({}, o, {
        className: "recharts-cartesian-axis-tick-value"
      }), u), c;
    }
  }]);
})(te.Component);
B1(fl, "displayName", "CartesianAxis");
B1(fl, "defaultProps", {
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
var PG = ["x1", "y1", "x2", "y2", "key"], NG = ["offset"];
function gi(e) {
  "@babel/helpers - typeof";
  return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gi(e);
}
function bM(e, t) {
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
    t % 2 ? bM(Object(n), !0).forEach(function(r) {
      RG(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function RG(e, t, n) {
  return t = $G(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $G(e) {
  var t = zG(e, "string");
  return gi(t) == "symbol" ? t : t + "";
}
function zG(e, t) {
  if (gi(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (gi(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
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
function xM(e, t) {
  if (e == null) return {};
  var n = qG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function qG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var kG = function(t) {
  var n = t.fill;
  if (!n || n === "none")
    return null;
  var r = t.fillOpacity, o = t.x, u = t.y, c = t.width, f = t.height, d = t.ry;
  return /* @__PURE__ */ L.createElement("rect", {
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
  if (/* @__PURE__ */ L.isValidElement(e))
    n = /* @__PURE__ */ L.cloneElement(e, t);
  else if (Ee(e))
    n = e(t);
  else {
    var r = t.x1, o = t.y1, u = t.x2, c = t.y2, f = t.key, d = xM(t, PG), h = Te(d, !1);
    h.offset;
    var y = xM(h, NG);
    n = /* @__PURE__ */ L.createElement("line", ui({}, y, {
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
function BG(e) {
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
  return /* @__PURE__ */ L.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, c);
}
function LG(e) {
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
  return /* @__PURE__ */ L.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, c);
}
function UG(e) {
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
    return /* @__PURE__ */ L.createElement("rect", {
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
  return /* @__PURE__ */ L.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, v);
}
function IG(e) {
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
    return /* @__PURE__ */ L.createElement("rect", {
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
  return /* @__PURE__ */ L.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, v);
}
var HG = function(t, n) {
  var r = t.xAxis, o = t.width, u = t.height, c = t.offset;
  return rP(k1(Yt(Yt(Yt({}, fl.defaultProps), r), {}, {
    ticks: Br(r, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: o,
      height: u
    }
  })), c.left, c.left + c.width, n);
}, GG = function(t, n) {
  var r = t.yAxis, o = t.width, u = t.height, c = t.offset;
  return rP(k1(Yt(Yt(Yt({}, fl.defaultProps), r), {}, {
    ticks: Br(r, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: o,
      height: u
    }
  })), c.top, c.top + c.height, n);
}, yo = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function bu(e) {
  var t, n, r, o, u, c, f = $1(), d = z1(), h = D7(), y = Yt(Yt({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : yo.stroke,
    fill: (n = e.fill) !== null && n !== void 0 ? n : yo.fill,
    horizontal: (r = e.horizontal) !== null && r !== void 0 ? r : yo.horizontal,
    horizontalFill: (o = e.horizontalFill) !== null && o !== void 0 ? o : yo.horizontalFill,
    vertical: (u = e.vertical) !== null && u !== void 0 ? u : yo.vertical,
    verticalFill: (c = e.verticalFill) !== null && c !== void 0 ? c : yo.verticalFill,
    x: fe(e.x) ? e.x : h.left,
    y: fe(e.y) ? e.y : h.top,
    width: fe(e.width) ? e.width : h.width,
    height: fe(e.height) ? e.height : h.height
  }), v = y.x, g = y.y, b = y.width, _ = y.height, S = y.syncWithTicks, x = y.horizontalValues, T = y.verticalValues, E = j7(), C = M7();
  if (!fe(b) || b <= 0 || !fe(_) || _ <= 0 || !fe(v) || v !== +v || !fe(g) || g !== +g)
    return null;
  var j = y.verticalCoordinatesGenerator || HG, w = y.horizontalCoordinatesGenerator || GG, A = y.horizontalPoints, M = y.verticalPoints;
  if ((!A || !A.length) && Ee(w)) {
    var N = x && x.length, z = w({
      yAxis: C ? Yt(Yt({}, C), {}, {
        ticks: N ? x : C.ticks
      }) : void 0,
      width: f,
      height: d,
      offset: h
    }, N ? !0 : S);
    Ir(Array.isArray(z), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(gi(z), "]")), Array.isArray(z) && (A = z);
  }
  if ((!M || !M.length) && Ee(j)) {
    var I = T && T.length, B = j({
      xAxis: E ? Yt(Yt({}, E), {}, {
        ticks: I ? T : E.ticks
      }) : void 0,
      width: f,
      height: d,
      offset: h
    }, I ? !0 : S);
    Ir(Array.isArray(B), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(gi(B), "]")), Array.isArray(B) && (M = B);
  }
  return /* @__PURE__ */ L.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ L.createElement(kG, {
    fill: y.fill,
    fillOpacity: y.fillOpacity,
    x: y.x,
    y: y.y,
    width: y.width,
    height: y.height,
    ry: y.ry
  }), /* @__PURE__ */ L.createElement(BG, ui({}, y, {
    offset: h,
    horizontalPoints: A,
    xAxis: E,
    yAxis: C
  })), /* @__PURE__ */ L.createElement(LG, ui({}, y, {
    offset: h,
    verticalPoints: M,
    xAxis: E,
    yAxis: C
  })), /* @__PURE__ */ L.createElement(UG, ui({}, y, {
    horizontalPoints: A
  })), /* @__PURE__ */ L.createElement(IG, ui({}, y, {
    verticalPoints: M
  })));
}
bu.displayName = "CartesianGrid";
var YG = ["type", "layout", "connectNulls", "ref"], KG = ["key"];
function Xo(e) {
  "@babel/helpers - typeof";
  return Xo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xo(e);
}
function SM(e, t) {
  if (e == null) return {};
  var n = XG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function XG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
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
function _M(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function mn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _M(Object(n), !0).forEach(function(r) {
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _M(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mo(e) {
  return ZG(e) || WG(e) || FG(e) || VG();
}
function VG() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function FG(e, t) {
  if (e) {
    if (typeof e == "string") return g0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return g0(e, t);
  }
}
function WG(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ZG(e) {
  if (Array.isArray(e)) return g0(e);
}
function g0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function QG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function OM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, YP(r.key), r);
  }
}
function JG(e, t, n) {
  return t && OM(e.prototype, t), n && OM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function eY(e, t, n) {
  return t = Wf(t), tY(e, GP() ? Reflect.construct(t, n || [], Wf(e).constructor) : t.apply(e, n));
}
function tY(e, t) {
  if (t && (Xo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return nY(e);
}
function nY(e) {
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
function Wf(e) {
  return Wf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Wf(e);
}
function rY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && b0(e, t);
}
function b0(e, t) {
  return b0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, b0(e, t);
}
function Vn(e, t, n) {
  return t = YP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function YP(e) {
  var t = aY(e, "string");
  return Xo(t) == "symbol" ? t : t + "";
}
function aY(e, t) {
  if (Xo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Lr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    QG(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = eY(this, t, [].concat(o)), Vn(n, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Vn(n, "generateSimpleStrokeDasharray", function(c, f) {
      return "".concat(f, "px ").concat(c - f, "px");
    }), Vn(n, "getStrokeDasharray", function(c, f, d) {
      var h = d.reduce(function(T, E) {
        return T + E;
      });
      if (!h)
        return n.generateSimpleStrokeDasharray(f, c);
      for (var y = Math.floor(c / h), v = c % h, g = f - c, b = [], _ = 0, S = 0; _ < d.length; S += d[_], ++_)
        if (S + d[_] > v) {
          b = [].concat(mo(d.slice(0, _)), [v - S]);
          break;
        }
      var x = b.length % 2 === 0 ? [0, g] : [g];
      return [].concat(mo(t.repeat(d, y)), mo(b), x).map(function(T) {
        return "".concat(T, "px");
      }).join(", ");
    }), Vn(n, "id", xi("recharts-line-")), Vn(n, "pathRef", function(c) {
      n.mainCurve = c;
    }), Vn(n, "handleAnimationEnd", function() {
      n.setState({
        isAnimationFinished: !0
      }), n.props.onAnimationEnd && n.props.onAnimationEnd();
    }), Vn(n, "handleAnimationStart", function() {
      n.setState({
        isAnimationFinished: !1
      }), n.props.onAnimationStart && n.props.onAnimationStart();
    }), n;
  }
  return rY(t, e), JG(t, [{
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
      var u = this.props, c = u.points, f = u.xAxis, d = u.yAxis, h = u.layout, y = u.children, v = rn(y, sl);
      if (!v)
        return null;
      var g = function(S, x) {
        return {
          x: S.x,
          y: S.y,
          value: S.value,
          errorVal: Et(S.payload, x)
        };
      }, b = {
        clipPath: r ? "url(#clipPath-".concat(o, ")") : null
      };
      return /* @__PURE__ */ L.createElement(He, b, v.map(function(_) {
        return /* @__PURE__ */ L.cloneElement(_, {
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
        var T = mn(mn(mn({
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
        return t.renderDotItem(d, T);
      }), _ = {
        clipPath: r ? "url(#clipPath-".concat(o ? "" : "dots-").concat(u, ")") : null
      };
      return /* @__PURE__ */ L.createElement(He, wu({
        className: "recharts-line-dots",
        key: "dots"
      }, _), b);
    }
  }, {
    key: "renderCurveStatically",
    value: function(r, o, u, c) {
      var f = this.props, d = f.type, h = f.layout, y = f.connectNulls;
      f.ref;
      var v = SM(f, YG), g = mn(mn(mn({}, Te(v, !0)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: o ? "url(#clipPath-".concat(u, ")") : null,
        points: r
      }, c), {}, {
        type: d,
        layout: h,
        connectNulls: y
      });
      return /* @__PURE__ */ L.createElement(di, wu({}, g, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(r, o) {
      var u = this, c = this.props, f = c.points, d = c.strokeDasharray, h = c.isAnimationActive, y = c.animationBegin, v = c.animationDuration, g = c.animationEasing, b = c.animationId, _ = c.animateNewValues, S = c.width, x = c.height, T = this.state, E = T.prevPoints, C = T.totalLength;
      return /* @__PURE__ */ L.createElement(Qn, {
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
      }, function(j) {
        var w = j.t;
        if (E) {
          var A = E.length / f.length, M = f.map(function(k, V) {
            var Q = Math.floor(V * A);
            if (E[Q]) {
              var K = E[Q], R = vt(K.x, k.x), Y = vt(K.y, k.y);
              return mn(mn({}, k), {}, {
                x: R(w),
                y: Y(w)
              });
            }
            if (_) {
              var J = vt(S * 2, k.x), G = vt(x / 2, k.y);
              return mn(mn({}, k), {}, {
                x: J(w),
                y: G(w)
              });
            }
            return mn(mn({}, k), {}, {
              x: k.x,
              y: k.y
            });
          });
          return u.renderCurveStatically(M, r, o);
        }
        var N = vt(0, C), z = N(w), I;
        if (d) {
          var B = "".concat(d).split(/[,\s]+/gim).map(function(k) {
            return parseFloat(k);
          });
          I = u.getStrokeDasharray(z, C, B);
        } else
          I = u.generateSimpleStrokeDasharray(C, z);
        return u.renderCurveStatically(f, r, o, {
          strokeDasharray: I
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function(r, o) {
      var u = this.props, c = u.points, f = u.isAnimationActive, d = this.state, h = d.prevPoints, y = d.totalLength;
      return f && c && c.length && (!h && y > 0 || !vi(h, c)) ? this.renderCurveWithAnimation(r, o) : this.renderCurveStatically(c, r, o);
    }
  }, {
    key: "render",
    value: function() {
      var r, o = this.props, u = o.hide, c = o.dot, f = o.points, d = o.className, h = o.xAxis, y = o.yAxis, v = o.top, g = o.left, b = o.width, _ = o.height, S = o.isAnimationActive, x = o.id;
      if (u || !f || !f.length)
        return null;
      var T = this.state.isAnimationFinished, E = f.length === 1, C = ze("recharts-line", d), j = h && h.allowDataOverflow, w = y && y.allowDataOverflow, A = j || w, M = we(x) ? this.id : x, N = (r = Te(c, !1)) !== null && r !== void 0 ? r : {
        r: 3,
        strokeWidth: 2
      }, z = N.r, I = z === void 0 ? 3 : z, B = N.strokeWidth, k = B === void 0 ? 2 : B, V = lC(c) ? c : {}, Q = V.clipDot, K = Q === void 0 ? !0 : Q, R = I * 2 + k;
      return /* @__PURE__ */ L.createElement(He, {
        className: C
      }, j || w ? /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("clipPath", {
        id: "clipPath-".concat(M)
      }, /* @__PURE__ */ L.createElement("rect", {
        x: j ? g : g - b / 2,
        y: w ? v : v - _ / 2,
        width: j ? b : b * 2,
        height: w ? _ : _ * 2
      })), !K && /* @__PURE__ */ L.createElement("clipPath", {
        id: "clipPath-dots-".concat(M)
      }, /* @__PURE__ */ L.createElement("rect", {
        x: g - R / 2,
        y: v - R / 2,
        width: b + R,
        height: _ + R
      }))) : null, !E && this.renderCurve(A, M), this.renderErrorBar(A, M), (E || c) && this.renderDots(A, K, M), (!S || T) && hr.renderCallByParent(this.props, f));
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
      for (var u = r.length % 2 !== 0 ? [].concat(mo(r), [0]) : r, c = [], f = 0; f < o; ++f)
        c = [].concat(mo(c), mo(u));
      return c;
    }
  }, {
    key: "renderDotItem",
    value: function(r, o) {
      var u;
      if (/* @__PURE__ */ L.isValidElement(r))
        u = /* @__PURE__ */ L.cloneElement(r, o);
      else if (Ee(r))
        u = r(o);
      else {
        var c = o.key, f = SM(o, KG), d = ze("recharts-line-dot", typeof r != "boolean" ? r.className : "");
        u = /* @__PURE__ */ L.createElement(jd, wu({
          key: c
        }, f, {
          className: d
        }));
      }
      return u;
    }
  }]);
})(te.PureComponent);
Vn(Lr, "displayName", "Line");
Vn(Lr, "defaultProps", {
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
Vn(Lr, "getComposedData", function(e) {
  var t = e.props, n = e.xAxis, r = e.yAxis, o = e.xAxisTicks, u = e.yAxisTicks, c = e.dataKey, f = e.bandSize, d = e.displayedData, h = e.offset, y = t.layout, v = d.map(function(g, b) {
    var _ = Et(g, c);
    return y === "horizontal" ? {
      x: ko({
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
      y: ko({
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
  return mn({
    points: v,
    layout: y
  }, h);
});
var iY = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], oY = ["key"], KP;
function Vo(e) {
  "@babel/helpers - typeof";
  return Vo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vo(e);
}
function XP(e, t) {
  if (e == null) return {};
  var n = lY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function lY(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function ci() {
  return ci = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ci.apply(this, arguments);
}
function wM(e, t) {
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
    t % 2 ? wM(Object(n), !0).forEach(function(r) {
      cr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function uY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function AM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, FP(r.key), r);
  }
}
function cY(e, t, n) {
  return t && AM(e.prototype, t), n && AM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function sY(e, t, n) {
  return t = Zf(t), fY(e, VP() ? Reflect.construct(t, n || [], Zf(e).constructor) : t.apply(e, n));
}
function fY(e, t) {
  if (t && (Vo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return dY(e);
}
function dY(e) {
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
function Zf(e) {
  return Zf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Zf(e);
}
function hY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && x0(e, t);
}
function x0(e, t) {
  return x0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, x0(e, t);
}
function cr(e, t, n) {
  return t = FP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function FP(e) {
  var t = pY(e, "string");
  return Vo(t) == "symbol" ? t : t + "";
}
function pY(e, t) {
  if (Vo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Vo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Zr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    uY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = sY(this, t, [].concat(o)), cr(n, "state", {
      isAnimationFinished: !0
    }), cr(n, "id", xi("recharts-area-")), cr(n, "handleAnimationEnd", function() {
      var c = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), Ee(c) && c();
    }), cr(n, "handleAnimationStart", function() {
      var c = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), Ee(c) && c();
    }), n;
  }
  return hY(t, e), cY(t, [{
    key: "renderDots",
    value: function(r, o, u) {
      var c = this.props.isAnimationActive, f = this.state.isAnimationFinished;
      if (c && !f)
        return null;
      var d = this.props, h = d.dot, y = d.points, v = d.dataKey, g = Te(this.props, !1), b = Te(h, !0), _ = y.map(function(x, T) {
        var E = wa(wa(wa({
          key: "dot-".concat(T),
          r: 3
        }, g), b), {}, {
          index: T,
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
      return /* @__PURE__ */ L.createElement(He, ci({
        className: "recharts-area-dots"
      }, S), _);
    }
  }, {
    key: "renderHorizontalRect",
    value: function(r) {
      var o = this.props, u = o.baseLine, c = o.points, f = o.strokeWidth, d = c[0].x, h = c[c.length - 1].x, y = r * Math.abs(d - h), v = Ea(c.map(function(g) {
        return g.y || 0;
      }));
      return fe(u) && typeof u == "number" ? v = Math.max(u, v) : u && Array.isArray(u) && u.length && (v = Math.max(Ea(u.map(function(g) {
        return g.y || 0;
      })), v)), fe(v) ? /* @__PURE__ */ L.createElement("rect", {
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
      return fe(u) && typeof u == "number" ? v = Math.max(u, v) : u && Array.isArray(u) && u.length && (v = Math.max(Ea(u.map(function(g) {
        return g.x || 0;
      })), v)), fe(v) ? /* @__PURE__ */ L.createElement("rect", {
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
      var b = XP(f, iY);
      return /* @__PURE__ */ L.createElement(He, {
        clipPath: u ? "url(#clipPath-".concat(c, ")") : null
      }, /* @__PURE__ */ L.createElement(di, ci({}, Te(b, !0), {
        points: r,
        connectNulls: v,
        type: h,
        baseLine: o,
        layout: d,
        stroke: "none",
        className: "recharts-area-area"
      })), y !== "none" && /* @__PURE__ */ L.createElement(di, ci({}, Te(this.props, !1), {
        className: "recharts-area-curve",
        layout: d,
        type: h,
        connectNulls: v,
        fill: "none",
        points: r
      })), y !== "none" && g && /* @__PURE__ */ L.createElement(di, ci({}, Te(this.props, !1), {
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
      return /* @__PURE__ */ L.createElement(Qn, {
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
      }, function(T) {
        var E = T.t;
        if (S) {
          var C = S.length / f.length, j = f.map(function(N, z) {
            var I = Math.floor(z * C);
            if (S[I]) {
              var B = S[I], k = vt(B.x, N.x), V = vt(B.y, N.y);
              return wa(wa({}, N), {}, {
                x: k(E),
                y: V(E)
              });
            }
            return N;
          }), w;
          if (fe(d) && typeof d == "number") {
            var A = vt(x, d);
            w = A(E);
          } else if (we(d) || il(d)) {
            var M = vt(x, 0);
            w = M(E);
          } else
            w = d.map(function(N, z) {
              var I = Math.floor(z * C);
              if (x[I]) {
                var B = x[I], k = vt(B.x, N.x), V = vt(B.y, N.y);
                return wa(wa({}, N), {}, {
                  x: k(E),
                  y: V(E)
                });
              }
              return N;
            });
          return u.renderAreaStatically(j, w, r, o);
        }
        return /* @__PURE__ */ L.createElement(He, null, /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("clipPath", {
          id: "animationClipPath-".concat(o)
        }, u.renderClipRect(E))), /* @__PURE__ */ L.createElement(He, {
          clipPath: "url(#animationClipPath-".concat(o, ")")
        }, u.renderAreaStatically(f, d, r, o)));
      });
    }
  }, {
    key: "renderArea",
    value: function(r, o) {
      var u = this.props, c = u.points, f = u.baseLine, d = u.isAnimationActive, h = this.state, y = h.prevPoints, v = h.prevBaseLine, g = h.totalLength;
      return d && c && c.length && (!y && g > 0 || !vi(y, c) || !vi(v, f)) ? this.renderAreaWithAnimation(r, o) : this.renderAreaStatically(c, f, r, o);
    }
  }, {
    key: "render",
    value: function() {
      var r, o = this.props, u = o.hide, c = o.dot, f = o.points, d = o.className, h = o.top, y = o.left, v = o.xAxis, g = o.yAxis, b = o.width, _ = o.height, S = o.isAnimationActive, x = o.id;
      if (u || !f || !f.length)
        return null;
      var T = this.state.isAnimationFinished, E = f.length === 1, C = ze("recharts-area", d), j = v && v.allowDataOverflow, w = g && g.allowDataOverflow, A = j || w, M = we(x) ? this.id : x, N = (r = Te(c, !1)) !== null && r !== void 0 ? r : {
        r: 3,
        strokeWidth: 2
      }, z = N.r, I = z === void 0 ? 3 : z, B = N.strokeWidth, k = B === void 0 ? 2 : B, V = lC(c) ? c : {}, Q = V.clipDot, K = Q === void 0 ? !0 : Q, R = I * 2 + k;
      return /* @__PURE__ */ L.createElement(He, {
        className: C
      }, j || w ? /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("clipPath", {
        id: "clipPath-".concat(M)
      }, /* @__PURE__ */ L.createElement("rect", {
        x: j ? y : y - b / 2,
        y: w ? h : h - _ / 2,
        width: j ? b : b * 2,
        height: w ? _ : _ * 2
      })), !K && /* @__PURE__ */ L.createElement("clipPath", {
        id: "clipPath-dots-".concat(M)
      }, /* @__PURE__ */ L.createElement("rect", {
        x: y - R / 2,
        y: h - R / 2,
        width: b + R,
        height: _ + R
      }))) : null, E ? null : this.renderArea(A, M), (c || E) && this.renderDots(A, K, M), (!S || T) && hr.renderCallByParent(this.props, f));
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
})(te.PureComponent);
KP = Zr;
cr(Zr, "displayName", "Area");
cr(Zr, "defaultProps", {
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
cr(Zr, "getBaseValue", function(e, t, n, r) {
  var o = e.layout, u = e.baseValue, c = t.props.baseValue, f = c ?? u;
  if (fe(f) && typeof f == "number")
    return f;
  var d = o === "horizontal" ? r : n, h = d.scale.domain();
  if (d.type === "number") {
    var y = Math.max(h[0], h[1]), v = Math.min(h[0], h[1]);
    return f === "dataMin" ? v : f === "dataMax" || y < 0 ? y : Math.max(Math.min(h[0], h[1]), 0);
  }
  return f === "dataMin" ? h[0] : f === "dataMax" ? h[1] : h[0];
});
cr(Zr, "getComposedData", function(e) {
  var t = e.props, n = e.item, r = e.xAxis, o = e.yAxis, u = e.xAxisTicks, c = e.yAxisTicks, f = e.bandSize, d = e.dataKey, h = e.stackedData, y = e.dataStartIndex, v = e.displayedData, g = e.offset, b = t.layout, _ = h && h.length, S = KP.getBaseValue(t, n, r, o), x = b === "horizontal", T = !1, E = v.map(function(j, w) {
    var A;
    _ ? A = h[y + w] : (A = Et(j, d), Array.isArray(A) ? T = !0 : A = [S, A]);
    var M = A[1] == null || _ && Et(j, d) == null;
    return x ? {
      x: ko({
        axis: r,
        ticks: u,
        bandSize: f,
        entry: j,
        index: w
      }),
      y: M ? null : o.scale(A[1]),
      value: A,
      payload: j
    } : {
      x: M ? null : r.scale(A[1]),
      y: ko({
        axis: o,
        ticks: c,
        bandSize: f,
        entry: j,
        index: w
      }),
      value: A,
      payload: j
    };
  }), C;
  return _ || T ? C = E.map(function(j) {
    var w = Array.isArray(j.value) ? j.value[0] : null;
    return x ? {
      x: j.x,
      y: w != null && j.y != null ? o.scale(w) : null
    } : {
      x: w != null ? r.scale(w) : null,
      y: j.y
    };
  }) : C = x ? o.scale(S) : r.scale(S), wa({
    points: E,
    baseLine: C,
    layout: b,
    isRange: T
  }, g);
});
cr(Zr, "renderDotItem", function(e, t) {
  var n;
  if (/* @__PURE__ */ L.isValidElement(e))
    n = /* @__PURE__ */ L.cloneElement(e, t);
  else if (Ee(e))
    n = e(t);
  else {
    var r = ze("recharts-area-dot", typeof e != "boolean" ? e.className : ""), o = t.key, u = XP(t, oY);
    n = /* @__PURE__ */ L.createElement(jd, ci({}, u, {
      key: o,
      className: r
    }));
  }
  return n;
});
function Fo(e) {
  "@babel/helpers - typeof";
  return Fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fo(e);
}
function vY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function yY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, QP(r.key), r);
  }
}
function mY(e, t, n) {
  return t && yY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function gY(e, t, n) {
  return t = Qf(t), bY(e, WP() ? Reflect.construct(t, n || [], Qf(e).constructor) : t.apply(e, n));
}
function bY(e, t) {
  if (t && (Fo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return xY(e);
}
function xY(e) {
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
function Qf(e) {
  return Qf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Qf(e);
}
function SY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && S0(e, t);
}
function S0(e, t) {
  return S0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, S0(e, t);
}
function ZP(e, t, n) {
  return t = QP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function QP(e) {
  var t = _Y(e, "string");
  return Fo(t) == "symbol" ? t : t + "";
}
function _Y(e, t) {
  if (Fo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Fo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kd = /* @__PURE__ */ (function(e) {
  function t() {
    return vY(this, t), gY(this, t, arguments);
  }
  return SY(t, e), mY(t, [{
    key: "render",
    value: function() {
      return null;
    }
  }]);
})(te.Component);
ZP(kd, "displayName", "ZAxis");
ZP(kd, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var OY = ["option", "isActive"];
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
function wY(e, t) {
  if (e == null) return {};
  var n = AY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function AY(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function TY(e) {
  var t = e.option, n = e.isActive, r = wY(e, OY);
  return typeof t == "string" ? /* @__PURE__ */ te.createElement(l0, Au({
    option: /* @__PURE__ */ te.createElement(pd, Au({
      type: t
    }, r)),
    isActive: n,
    shapeType: "symbols"
  }, r)) : /* @__PURE__ */ te.createElement(l0, Au({
    option: t,
    isActive: n,
    shapeType: "symbols"
  }, r));
}
function Wo(e) {
  "@babel/helpers - typeof";
  return Wo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wo(e);
}
function Tu() {
  return Tu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Tu.apply(this, arguments);
}
function TM(e, t) {
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
    t % 2 ? TM(Object(n), !0).forEach(function(r) {
      Ma(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : TM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function EY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function EM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, eN(r.key), r);
  }
}
function jY(e, t, n) {
  return t && EM(e.prototype, t), n && EM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function MY(e, t, n) {
  return t = Jf(t), CY(e, JP() ? Reflect.construct(t, n || [], Jf(e).constructor) : t.apply(e, n));
}
function CY(e, t) {
  if (t && (Wo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return DY(e);
}
function DY(e) {
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
function Jf(e) {
  return Jf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Jf(e);
}
function PY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _0(e, t);
}
function _0(e, t) {
  return _0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, _0(e, t);
}
function Ma(e, t, n) {
  return t = eN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function eN(e) {
  var t = NY(e, "string");
  return Wo(t) == "symbol" ? t : t + "";
}
function NY(e, t) {
  if (Wo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Bd = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    EY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = MY(this, t, [].concat(o)), Ma(n, "state", {
      isAnimationFinished: !1
    }), Ma(n, "handleAnimationEnd", function() {
      n.setState({
        isAnimationFinished: !0
      });
    }), Ma(n, "handleAnimationStart", function() {
      n.setState({
        isAnimationFinished: !1
      });
    }), Ma(n, "id", xi("recharts-scatter-")), n;
  }
  return PY(t, e), jY(t, [{
    key: "renderSymbolsStatically",
    value: function(r) {
      var o = this, u = this.props, c = u.shape, f = u.activeShape, d = u.activeIndex, h = Te(this.props, !1);
      return r.map(function(y, v) {
        var g = d === v, b = g ? f : c, _ = qn(qn({}, h), y);
        return /* @__PURE__ */ L.createElement(He, Tu({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(y == null ? void 0 : y.cx, "-").concat(y == null ? void 0 : y.cy, "-").concat(y == null ? void 0 : y.size, "-").concat(v)
        }, Cu(o.props, y, v), {
          role: "img"
        }), /* @__PURE__ */ L.createElement(TY, Tu({
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
      return /* @__PURE__ */ L.createElement(Qn, {
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
          var T = v && v[x];
          if (T) {
            var E = vt(T.cx, S.cx), C = vt(T.cy, S.cy), j = vt(T.size, S.size);
            return qn(qn({}, S), {}, {
              cx: E(b),
              cy: C(b),
              size: j(b)
            });
          }
          var w = vt(0, S.size);
          return qn(qn({}, S), {}, {
            size: w(b)
          });
        });
        return /* @__PURE__ */ L.createElement(He, null, r.renderSymbolsStatically(_));
      });
    }
  }, {
    key: "renderSymbols",
    value: function() {
      var r = this.props, o = r.points, u = r.isAnimationActive, c = this.state.prevPoints;
      return u && o && o.length && (!c || !vi(c, o)) ? this.renderSymbolsWithAnimation() : this.renderSymbolsStatically(o);
    }
  }, {
    key: "renderErrorBar",
    value: function() {
      var r = this.props.isAnimationActive;
      if (r && !this.state.isAnimationFinished)
        return null;
      var o = this.props, u = o.points, c = o.xAxis, f = o.yAxis, d = o.children, h = rn(d, sl);
      return h ? h.map(function(y, v) {
        var g = y.props, b = g.direction, _ = g.dataKey;
        return /* @__PURE__ */ L.cloneElement(y, {
          key: "".concat(b, "-").concat(_, "-").concat(u[v]),
          data: u,
          xAxis: c,
          yAxis: f,
          layout: b === "x" ? "vertical" : "horizontal",
          dataPointFormatter: function(x, T) {
            return {
              x: x.cx,
              y: x.cy,
              value: b === "x" ? +x.node.x : +x.node.y,
              errorVal: Et(x, T)
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
        y = o.map(function(C) {
          return {
            x: C.cx,
            y: C.cy
          };
        });
      else if (c === "fitting") {
        var g = fz(o), b = g.xmin, _ = g.xmax, S = g.a, x = g.b, T = function(j) {
          return S * j + x;
        };
        y = [{
          x: b,
          y: T(b)
        }, {
          x: _,
          y: T(_)
        }];
      }
      var E = qn(qn(qn({}, d), {}, {
        fill: "none",
        stroke: d && d.fill
      }, h), {}, {
        points: y
      });
      return /* @__PURE__ */ L.isValidElement(u) ? v = /* @__PURE__ */ L.cloneElement(u, E) : Ee(u) ? v = u(E) : v = /* @__PURE__ */ L.createElement(di, Tu({}, E, {
        type: f
      })), /* @__PURE__ */ L.createElement(He, {
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
      var x = this.state.isAnimationFinished, T = ze("recharts-scatter", f), E = d && d.allowDataOverflow, C = h && h.allowDataOverflow, j = E || C, w = we(_) ? this.id : _;
      return /* @__PURE__ */ L.createElement(He, {
        className: T,
        clipPath: j ? "url(#clipPath-".concat(w, ")") : null
      }, E || C ? /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("clipPath", {
        id: "clipPath-".concat(w)
      }, /* @__PURE__ */ L.createElement("rect", {
        x: E ? y : y - g / 2,
        y: C ? v : v - b / 2,
        width: E ? g : g * 2,
        height: C ? b : b * 2
      }))) : null, c && this.renderLine(), this.renderErrorBar(), /* @__PURE__ */ L.createElement(He, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!S || x) && hr.renderCallByParent(this.props, u));
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
})(te.PureComponent);
Ma(Bd, "displayName", "Scatter");
Ma(Bd, "defaultProps", {
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
Ma(Bd, "getComposedData", function(e) {
  var t = e.xAxis, n = e.yAxis, r = e.zAxis, o = e.item, u = e.displayedData, c = e.xAxisTicks, f = e.yAxisTicks, d = e.offset, h = o.props.tooltipType, y = rn(o.props.children, gd), v = we(t.dataKey) ? o.props.dataKey : t.dataKey, g = we(n.dataKey) ? o.props.dataKey : n.dataKey, b = r && r.dataKey, _ = r ? r.range : kd.defaultProps.range, S = _ && _[0], x = t.scale.bandwidth ? t.scale.bandwidth() : 0, T = n.scale.bandwidth ? n.scale.bandwidth() : 0, E = u.map(function(C, j) {
    var w = Et(C, v), A = Et(C, g), M = !we(b) && Et(C, b) || "-", N = [{
      name: we(t.dataKey) ? o.props.name : t.name || t.dataKey,
      unit: t.unit || "",
      value: w,
      payload: C,
      dataKey: v,
      type: h
    }, {
      name: we(n.dataKey) ? o.props.name : n.name || n.dataKey,
      unit: n.unit || "",
      value: A,
      payload: C,
      dataKey: g,
      type: h
    }];
    M !== "-" && N.push({
      name: r.name || r.dataKey,
      unit: r.unit || "",
      value: M,
      payload: C,
      dataKey: b,
      type: h
    });
    var z = ko({
      axis: t,
      ticks: c,
      bandSize: x,
      entry: C,
      index: j,
      dataKey: v
    }), I = ko({
      axis: n,
      ticks: f,
      bandSize: T,
      entry: C,
      index: j,
      dataKey: g
    }), B = M !== "-" ? r.scale(M) : S, k = Math.sqrt(Math.max(B, 0) / Math.PI);
    return qn(qn({}, C), {}, {
      cx: z,
      cy: I,
      x: z - k,
      y: I - k,
      xAxis: t,
      yAxis: n,
      zAxis: r,
      width: 2 * k,
      height: 2 * k,
      size: B,
      node: {
        x: w,
        y: A,
        z: M
      },
      tooltipPayload: N,
      tooltipPosition: {
        x: z,
        y: I
      },
      payload: C
    }, y && y[j] && y[j].props);
  });
  return qn({
    points: E
  }, d);
});
function Zo(e) {
  "@babel/helpers - typeof";
  return Zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zo(e);
}
function RY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function $Y(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, rN(r.key), r);
  }
}
function zY(e, t, n) {
  return t && $Y(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qY(e, t, n) {
  return t = ed(t), kY(e, tN() ? Reflect.construct(t, n || [], ed(e).constructor) : t.apply(e, n));
}
function kY(e, t) {
  if (t && (Zo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return BY(e);
}
function BY(e) {
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
function ed(e) {
  return ed = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ed(e);
}
function LY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && O0(e, t);
}
function O0(e, t) {
  return O0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, O0(e, t);
}
function nN(e, t, n) {
  return t = rN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function rN(e) {
  var t = UY(e, "string");
  return Zo(t) == "symbol" ? t : t + "";
}
function UY(e, t) {
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
function IY(e) {
  var t = e.xAxisId, n = $1(), r = z1(), o = PP(t);
  return o == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ te.createElement(fl, w0({}, o, {
      className: ze("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: r
      },
      ticksGenerator: function(c) {
        return Br(c, !0);
      }
    }))
  );
}
var sr = /* @__PURE__ */ (function(e) {
  function t() {
    return RY(this, t), qY(this, t, arguments);
  }
  return LY(t, e), zY(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ te.createElement(IY, this.props);
    }
  }]);
})(te.Component);
nN(sr, "displayName", "XAxis");
nN(sr, "defaultProps", {
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
function Qo(e) {
  "@babel/helpers - typeof";
  return Qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qo(e);
}
function HY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function GY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, oN(r.key), r);
  }
}
function YY(e, t, n) {
  return t && GY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function KY(e, t, n) {
  return t = td(t), XY(e, aN() ? Reflect.construct(t, n || [], td(e).constructor) : t.apply(e, n));
}
function XY(e, t) {
  if (t && (Qo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return VY(e);
}
function VY(e) {
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
function td(e) {
  return td = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, td(e);
}
function FY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && A0(e, t);
}
function A0(e, t) {
  return A0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, A0(e, t);
}
function iN(e, t, n) {
  return t = oN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function oN(e) {
  var t = WY(e, "string");
  return Qo(t) == "symbol" ? t : t + "";
}
function WY(e, t) {
  if (Qo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Qo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function T0() {
  return T0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, T0.apply(this, arguments);
}
var ZY = function(t) {
  var n = t.yAxisId, r = $1(), o = z1(), u = NP(n);
  return u == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ te.createElement(fl, T0({}, u, {
      className: ze("recharts-".concat(u.axisType, " ").concat(u.axisType), u.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: o
      },
      ticksGenerator: function(f) {
        return Br(f, !0);
      }
    }))
  );
}, fr = /* @__PURE__ */ (function(e) {
  function t() {
    return HY(this, t), KY(this, t, arguments);
  }
  return FY(t, e), YY(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ te.createElement(ZY, this.props);
    }
  }]);
})(te.Component);
iN(fr, "displayName", "YAxis");
iN(fr, "defaultProps", {
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
function jM(e) {
  return tK(e) || eK(e) || JY(e) || QY();
}
function QY() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function JY(e, t) {
  if (e) {
    if (typeof e == "string") return E0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return E0(e, t);
  }
}
function eK(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function tK(e) {
  if (Array.isArray(e)) return E0(e);
}
function E0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var j0 = function(t, n, r, o, u) {
  var c = rn(t, Nd), f = rn(t, $d), d = [].concat(jM(c), jM(f)), h = rn(t, qd), y = "".concat(o, "Id"), v = o[0], g = n;
  if (d.length && (g = d.reduce(function(S, x) {
    if (x.props[y] === r && pr(x.props, "extendDomain") && fe(x.props[v])) {
      var T = x.props[v];
      return [Math.min(S[0], T), Math.max(S[1], T)];
    }
    return S;
  }, g)), h.length) {
    var b = "".concat(v, "1"), _ = "".concat(v, "2");
    g = h.reduce(function(S, x) {
      if (x.props[y] === r && pr(x.props, "extendDomain") && fe(x.props[b]) && fe(x.props[_])) {
        var T = x.props[b], E = x.props[_];
        return [Math.min(S[0], T, E), Math.max(S[1], T, E)];
      }
      return S;
    }, g);
  }
  return u && u.length && (g = u.reduce(function(S, x) {
    return fe(x) ? [Math.min(S[0], x), Math.max(S[1], x)] : S;
  }, g)), g;
}, nb = { exports: {} }, MM;
function nK() {
  return MM || (MM = 1, (function(e) {
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
      var x = this._events[S], T = arguments.length, E, C;
      if (x.fn) {
        switch (x.once && this.removeListener(h, x.fn, void 0, !0), T) {
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
        for (C = 1, E = new Array(T - 1); C < T; C++)
          E[C - 1] = arguments[C];
        x.fn.apply(x.context, E);
      } else {
        var j = x.length, w;
        for (C = 0; C < j; C++)
          switch (x[C].once && this.removeListener(h, x[C].fn, void 0, !0), T) {
            case 1:
              x[C].fn.call(x[C].context);
              break;
            case 2:
              x[C].fn.call(x[C].context, y);
              break;
            case 3:
              x[C].fn.call(x[C].context, y, v);
              break;
            case 4:
              x[C].fn.call(x[C].context, y, v, g);
              break;
            default:
              if (!E) for (w = 1, E = new Array(T - 1); w < T; w++)
                E[w - 1] = arguments[w];
              x[C].fn.apply(x[C].context, E);
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
        for (var S = 0, x = [], T = _.length; S < T; S++)
          (_[S].fn !== y || g && !_[S].once || v && _[S].context !== v) && x.push(_[S]);
        x.length ? this._events[b] = x.length === 1 ? x[0] : x : c(this, b);
      }
      return this;
    }, f.prototype.removeAllListeners = function(h) {
      var y;
      return h ? (y = n ? n + h : h, this._events[y] && c(this, y)) : (this._events = new r(), this._eventsCount = 0), this;
    }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = n, f.EventEmitter = f, e.exports = f;
  })(nb)), nb.exports;
}
var rK = nK();
const aK = /* @__PURE__ */ tt(rK);
var rb = new aK(), ab = "recharts.syncMouseEvents";
function sc(e) {
  "@babel/helpers - typeof";
  return sc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sc(e);
}
function iK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oK(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, lN(r.key), r);
  }
}
function lK(e, t, n) {
  return t && oK(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ib(e, t, n) {
  return t = lN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function lN(e) {
  var t = uK(e, "string");
  return sc(t) == "symbol" ? t : t + "";
}
function uK(e, t) {
  if (sc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (sc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var cK = /* @__PURE__ */ (function() {
  function e() {
    iK(this, e), ib(this, "activeIndex", 0), ib(this, "coordinateList", []), ib(this, "layout", "horizontal");
  }
  return lK(e, [{
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
function sK(e, t, n) {
  if (n === "number" && t === !0 && Array.isArray(e)) {
    var r = e == null ? void 0 : e[0], o = e == null ? void 0 : e[1];
    if (r && o && fe(r) && fe(o))
      return !0;
  }
  return !1;
}
function fK(e, t, n, r) {
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
  var t = e.cx, n = e.cy, r = e.radius, o = e.startAngle, u = e.endAngle, c = Lt(t, n, r, o), f = Lt(t, n, r, u);
  return {
    points: [c, f],
    cx: t,
    cy: n,
    radius: r,
    startAngle: o,
    endAngle: u
  };
}
function dK(e, t, n) {
  var r, o, u, c;
  if (e === "horizontal")
    r = t.x, u = r, o = n.top, c = n.top + n.height;
  else if (e === "vertical")
    o = t.y, c = o, r = n.left, u = n.left + n.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var f = t.cx, d = t.cy, h = t.innerRadius, y = t.outerRadius, v = t.angle, g = Lt(f, d, h, v), b = Lt(f, d, y, v);
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
function fc(e) {
  "@babel/helpers - typeof";
  return fc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fc(e);
}
function CM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Fs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? CM(Object(n), !0).forEach(function(r) {
      hK(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : CM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function hK(e, t, n) {
  return t = pK(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function pK(e) {
  var t = vK(e, "string");
  return fc(t) == "symbol" ? t : t + "";
}
function vK(e, t) {
  if (fc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (fc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yK(e) {
  var t, n, r = e.element, o = e.tooltipEventType, u = e.isActive, c = e.activeCoordinate, f = e.activePayload, d = e.offset, h = e.activeTooltipIndex, y = e.tooltipAxisBandSize, v = e.layout, g = e.chartName, b = (t = r.props.cursor) !== null && t !== void 0 ? t : (n = r.type.defaultProps) === null || n === void 0 ? void 0 : n.cursor;
  if (!r || !b || !u || !c || g !== "ScatterChart" && o !== "axis")
    return null;
  var _, S = di;
  if (g === "ScatterChart")
    _ = c, S = L9;
  else if (g === "BarChart")
    _ = fK(v, c, d, y), S = D1;
  else if (v === "radial") {
    var x = uN(c), T = x.cx, E = x.cy, C = x.radius, j = x.startAngle, w = x.endAngle;
    _ = {
      cx: T,
      cy: E,
      startAngle: j,
      endAngle: w,
      innerRadius: C,
      outerRadius: C
    }, S = uP;
  } else
    _ = {
      points: dK(v, c, d)
    }, S = di;
  var A = Fs(Fs(Fs(Fs({
    stroke: "#ccc",
    pointerEvents: "none"
  }, d), _), Te(b, !1)), {}, {
    payload: f,
    payloadIndex: h,
    className: ze("recharts-tooltip-cursor", b.className)
  });
  return /* @__PURE__ */ te.isValidElement(b) ? /* @__PURE__ */ te.cloneElement(b, A) : /* @__PURE__ */ te.createElement(S, A);
}
var mK = ["item"], gK = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Jo(e) {
  "@babel/helpers - typeof";
  return Jo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jo(e);
}
function Oo() {
  return Oo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Oo.apply(this, arguments);
}
function DM(e, t) {
  return SK(e) || xK(e, t) || sN(e, t) || bK();
}
function bK() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xK(e, t) {
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
function SK(e) {
  if (Array.isArray(e)) return e;
}
function PM(e, t) {
  if (e == null) return {};
  var n = _K(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function _K(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function OK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wK(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, fN(r.key), r);
  }
}
function AK(e, t, n) {
  return t && wK(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function TK(e, t, n) {
  return t = nd(t), EK(e, cN() ? Reflect.construct(t, n || [], nd(e).constructor) : t.apply(e, n));
}
function EK(e, t) {
  if (t && (Jo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jK(e);
}
function jK(e) {
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
function nd(e) {
  return nd = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, nd(e);
}
function MK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && M0(e, t);
}
function M0(e, t) {
  return M0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, M0(e, t);
}
function el(e) {
  return PK(e) || DK(e) || sN(e) || CK();
}
function CK() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function sN(e, t) {
  if (e) {
    if (typeof e == "string") return C0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return C0(e, t);
  }
}
function DK(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function PK(e) {
  if (Array.isArray(e)) return C0(e);
}
function C0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function NM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function oe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? NM(Object(n), !0).forEach(function(r) {
      _e(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : NM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function _e(e, t, n) {
  return t = fN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function fN(e) {
  var t = NK(e, "string");
  return Jo(t) == "symbol" ? t : t + "";
}
function NK(e, t) {
  if (Jo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Jo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var RK = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, $K = {
  width: "100%",
  height: "100%"
}, dN = {
  x: 0,
  y: 0
};
function Ws(e) {
  return e;
}
var zK = function(t, n) {
  return n === "horizontal" ? t.x : n === "vertical" ? t.y : n === "centric" ? t.angle : t.radius;
}, qK = function(t, n, r, o) {
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
      return oe(oe(oe({}, o), Lt(o.cx, o.cy, f, c)), {}, {
        angle: c,
        radius: f
      });
    }
    var d = u.coordinate, h = o.angle;
    return oe(oe(oe({}, o), Lt(o.cx, o.cy, d, h)), {}, {
      angle: h,
      radius: d
    });
  }
  return dN;
}, Ld = function(t, n) {
  var r = n.graphicalItems, o = n.dataStartIndex, u = n.dataEndIndex, c = (r ?? []).reduce(function(f, d) {
    var h = d.props.data;
    return h && h.length ? [].concat(el(f), el(h)) : f;
  }, []);
  return c.length > 0 ? c : t && t.length && fe(o) && fe(u) ? t.slice(o, u + 1) : [];
};
function hN(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var D0 = function(t, n, r, o) {
  var u = t.graphicalItems, c = t.tooltipAxis, f = Ld(n, t);
  return r < 0 || !u || !u.length || r >= f.length ? null : u.reduce(function(d, h) {
    var y, v = (y = h.props.data) !== null && y !== void 0 ? y : n;
    v && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= r && (v = v.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var g;
    if (c.dataKey && !c.allowDuplicatedCategory) {
      var b = v === void 0 ? f : v;
      g = nf(b, c.dataKey, o);
    } else
      g = v && v[r] || f[r];
    return g ? [].concat(el(d), [iP(h, g)]) : d;
  }, []);
}, RM = function(t, n, r, o) {
  var u = o || {
    x: t.chartX,
    y: t.chartY
  }, c = zK(u, r), f = t.orderedTooltipTicks, d = t.tooltipAxis, h = t.tooltipTicks, y = bL(c, f, h, d);
  if (y >= 0 && h) {
    var v = h[y] && h[y].value, g = D0(t, n, y, v), b = qK(r, f, y, u);
    return {
      activeTooltipIndex: y,
      activeLabel: v,
      activePayload: g,
      activeCoordinate: b
    };
  }
  return null;
}, kK = function(t, n) {
  var r = n.axes, o = n.graphicalItems, u = n.axisType, c = n.axisIdKey, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.layout, v = t.children, g = t.stackOffset, b = nP(y, u);
  return r.reduce(function(_, S) {
    var x, T = S.type.defaultProps !== void 0 ? oe(oe({}, S.type.defaultProps), S.props) : S.props, E = T.type, C = T.dataKey, j = T.allowDataOverflow, w = T.allowDuplicatedCategory, A = T.scale, M = T.ticks, N = T.includeHidden, z = T[c];
    if (_[z])
      return _;
    var I = Ld(t.data, {
      graphicalItems: o.filter(function(U) {
        var re, se = c in U.props ? U.props[c] : (re = U.type.defaultProps) === null || re === void 0 ? void 0 : re[c];
        return se === z;
      }),
      dataStartIndex: d,
      dataEndIndex: h
    }), B = I.length, k, V, Q;
    sK(T.domain, j, E) && (k = Yb(T.domain, null, j), b && (E === "number" || A !== "auto") && (Q = _u(I, C, "category")));
    var K = hN(E);
    if (!k || k.length === 0) {
      var R, Y = (R = T.domain) !== null && R !== void 0 ? R : K;
      if (C) {
        if (k = _u(I, C, E), E === "category" && b) {
          var J = sz(k);
          w && J ? (V = k, k = Lf(0, B)) : w || (k = G2(Y, k, S).reduce(function(U, re) {
            return U.indexOf(re) >= 0 ? U : [].concat(el(U), [re]);
          }, []));
        } else if (E === "category")
          w ? k = k.filter(function(U) {
            return U !== "" && !we(U);
          }) : k = G2(Y, k, S).reduce(function(U, re) {
            return U.indexOf(re) >= 0 || re === "" || we(re) ? U : [].concat(el(U), [re]);
          }, []);
        else if (E === "number") {
          var G = wL(I, o.filter(function(U) {
            var re, se, he = c in U.props ? U.props[c] : (re = U.type.defaultProps) === null || re === void 0 ? void 0 : re[c], ye = "hide" in U.props ? U.props.hide : (se = U.type.defaultProps) === null || se === void 0 ? void 0 : se.hide;
            return he === z && (N || !ye);
          }), C, u, y);
          G && (k = G);
        }
        b && (E === "number" || A !== "auto") && (Q = _u(I, C, "category"));
      } else b ? k = Lf(0, B) : f && f[z] && f[z].hasStack && E === "number" ? k = g === "expand" ? [0, 1] : aP(f[z].stackGroups, d, h) : k = tP(I, o.filter(function(U) {
        var re = c in U.props ? U.props[c] : U.type.defaultProps[c], se = "hide" in U.props ? U.props.hide : U.type.defaultProps.hide;
        return re === z && (N || !se);
      }), E, y, !0);
      if (E === "number")
        k = j0(v, k, z, u, M), Y && (k = Yb(Y, k, j));
      else if (E === "category" && Y) {
        var ee = Y, P = k.every(function(U) {
          return ee.indexOf(U) >= 0;
        });
        P && (k = ee);
      }
    }
    return oe(oe({}, _), {}, _e({}, z, oe(oe({}, T), {}, {
      axisType: u,
      domain: k,
      categoricalDomain: Q,
      duplicateDomain: V,
      originalDomain: (x = T.domain) !== null && x !== void 0 ? x : K,
      isCategorical: b,
      layout: y
    })));
  }, {});
}, BK = function(t, n) {
  var r = n.graphicalItems, o = n.Axis, u = n.axisType, c = n.axisIdKey, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.layout, v = t.children, g = Ld(t.data, {
    graphicalItems: r,
    dataStartIndex: d,
    dataEndIndex: h
  }), b = g.length, _ = nP(y, u), S = -1;
  return r.reduce(function(x, T) {
    var E = T.type.defaultProps !== void 0 ? oe(oe({}, T.type.defaultProps), T.props) : T.props, C = E[c], j = hN("number");
    if (!x[C]) {
      S++;
      var w;
      return _ ? w = Lf(0, b) : f && f[C] && f[C].hasStack ? (w = aP(f[C].stackGroups, d, h), w = j0(v, w, C, u)) : (w = Yb(j, tP(g, r.filter(function(A) {
        var M, N, z = c in A.props ? A.props[c] : (M = A.type.defaultProps) === null || M === void 0 ? void 0 : M[c], I = "hide" in A.props ? A.props.hide : (N = A.type.defaultProps) === null || N === void 0 ? void 0 : N.hide;
        return z === C && !I;
      }), "number", y), o.defaultProps.allowDataOverflow), w = j0(v, w, C, u)), oe(oe({}, x), {}, _e({}, C, oe(oe({
        axisType: u
      }, o.defaultProps), {}, {
        hide: !0,
        orientation: Bn(RK, "".concat(u, ".").concat(S % 2), null),
        domain: w,
        originalDomain: j,
        isCategorical: _,
        layout: y
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return x;
  }, {});
}, LK = function(t, n) {
  var r = n.axisType, o = r === void 0 ? "xAxis" : r, u = n.AxisComp, c = n.graphicalItems, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.children, v = "".concat(o, "Id"), g = rn(y, u), b = {};
  return g && g.length ? b = kK(t, {
    axes: g,
    graphicalItems: c,
    axisType: o,
    axisIdKey: v,
    stackGroups: f,
    dataStartIndex: d,
    dataEndIndex: h
  }) : c && c.length && (b = BK(t, {
    Axis: u,
    graphicalItems: c,
    axisType: o,
    axisIdKey: v,
    stackGroups: f,
    dataStartIndex: d,
    dataEndIndex: h
  })), b;
}, UK = function(t) {
  var n = Ta(t), r = Br(n, !1, !0);
  return {
    tooltipTicks: r,
    orderedTooltipTicks: a1(r, function(o) {
      return o.coordinate;
    }),
    tooltipAxis: n,
    tooltipAxisBandSize: Cf(n, r)
  };
}, $M = function(t) {
  var n = t.children, r = t.defaultShowTooltip, o = bn(n, Uo), u = 0, c = 0;
  return t.data && t.data.length !== 0 && (c = t.data.length - 1), o && o.props && (o.props.startIndex >= 0 && (u = o.props.startIndex), o.props.endIndex >= 0 && (c = o.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: u,
    dataEndIndex: c,
    activeTooltipIndex: -1,
    isTooltipActive: !!r
  };
}, IK = function(t) {
  return !t || !t.length ? !1 : t.some(function(n) {
    var r = Ur(n && n.type);
    return r && r.indexOf("Bar") >= 0;
  });
}, zM = function(t) {
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
}, HK = function(t, n) {
  var r = t.props, o = t.graphicalItems, u = t.xAxisMap, c = u === void 0 ? {} : u, f = t.yAxisMap, d = f === void 0 ? {} : f, h = r.width, y = r.height, v = r.children, g = r.margin || {}, b = bn(v, Uo), _ = bn(v, Ao), S = Object.keys(d).reduce(function(w, A) {
    var M = d[A], N = M.orientation;
    return !M.mirror && !M.hide ? oe(oe({}, w), {}, _e({}, N, w[N] + M.width)) : w;
  }, {
    left: g.left || 0,
    right: g.right || 0
  }), x = Object.keys(c).reduce(function(w, A) {
    var M = c[A], N = M.orientation;
    return !M.mirror && !M.hide ? oe(oe({}, w), {}, _e({}, N, Bn(w, "".concat(N)) + M.height)) : w;
  }, {
    top: g.top || 0,
    bottom: g.bottom || 0
  }), T = oe(oe({}, x), S), E = T.bottom;
  b && (T.bottom += b.props.height || Uo.defaultProps.height), _ && n && (T = _L(T, o, r, n));
  var C = h - T.left - T.right, j = y - T.top - T.bottom;
  return oe(oe({
    brushBottom: E
  }, T), {}, {
    // never return negative values for height and width
    width: Math.max(C, 0),
    height: Math.max(j, 0)
  });
}, GK = function(t, n) {
  if (n === "xAxis")
    return t[n].width;
  if (n === "yAxis")
    return t[n].height;
}, Ud = function(t) {
  var n = t.chartName, r = t.GraphicalChild, o = t.defaultTooltipEventType, u = o === void 0 ? "axis" : o, c = t.validateTooltipEventTypes, f = c === void 0 ? ["axis"] : c, d = t.axisComponents, h = t.legendContent, y = t.formatAxisMap, v = t.defaultProps, g = function(T, E) {
    var C = E.graphicalItems, j = E.stackGroups, w = E.offset, A = E.updateId, M = E.dataStartIndex, N = E.dataEndIndex, z = T.barSize, I = T.layout, B = T.barGap, k = T.barCategoryGap, V = T.maxBarSize, Q = zM(I), K = Q.numericAxisName, R = Q.cateAxisName, Y = IK(C), J = [];
    return C.forEach(function(G, ee) {
      var P = Ld(T.data, {
        graphicalItems: [G],
        dataStartIndex: M,
        dataEndIndex: N
      }), U = G.type.defaultProps !== void 0 ? oe(oe({}, G.type.defaultProps), G.props) : G.props, re = U.dataKey, se = U.maxBarSize, he = U["".concat(K, "Id")], ye = U["".concat(R, "Id")], de = {}, Ce = d.reduce(function(Kt, ln) {
        var In = E["".concat(ln.axisType, "Map")], _t = U["".concat(ln.axisType, "Id")];
        In && In[_t] || ln.axisType === "zAxis" || mi();
        var gc = In[_t];
        return oe(oe({}, Kt), {}, _e(_e({}, ln.axisType, gc), "".concat(ln.axisType, "Ticks"), Br(gc)));
      }, de), ce = Ce[R], ge = Ce["".concat(R, "Ticks")], xe = j && j[he] && j[he].hasStack && zL(G, j[he].stackGroups), ae = Ur(G.type).indexOf("Bar") >= 0, De = Cf(ce, ge), Oe = [], ke = Y && xL({
        barSize: z,
        stackGroups: j,
        totalSize: GK(Ce, R)
      });
      if (ae) {
        var Qe, ct, on = we(se) ? V : se, _n = (Qe = (ct = Cf(ce, ge, !0)) !== null && ct !== void 0 ? ct : on) !== null && Qe !== void 0 ? Qe : 0;
        Oe = SL({
          barGap: B,
          barCategoryGap: k,
          bandSize: _n !== De ? _n : De,
          sizeList: ke[ye],
          maxBarSize: on
        }), _n !== De && (Oe = Oe.map(function(Kt) {
          return oe(oe({}, Kt), {}, {
            position: oe(oe({}, Kt.position), {}, {
              offset: Kt.position.offset - _n / 2
            })
          });
        }));
      }
      var On = G && G.type && G.type.getComposedData;
      On && J.push({
        props: oe(oe({}, On(oe(oe({}, Ce), {}, {
          displayedData: P,
          props: T,
          dataKey: re,
          item: G,
          bandSize: De,
          barPosition: Oe,
          offset: w,
          stackedData: xe,
          layout: I,
          dataStartIndex: M,
          dataEndIndex: N
        }))), {}, _e(_e(_e({
          key: G.key || "item-".concat(ee)
        }, K, Ce[K]), R, Ce[R]), "animationId", A)),
        childIndex: Oz(G, T.children),
        item: G
      });
    }), J;
  }, b = function(T, E) {
    var C = T.props, j = T.dataStartIndex, w = T.dataEndIndex, A = T.updateId;
    if (!iA({
      props: C
    }))
      return null;
    var M = C.children, N = C.layout, z = C.stackOffset, I = C.data, B = C.reverseStackOrder, k = zM(N), V = k.numericAxisName, Q = k.cateAxisName, K = rn(M, r), R = NL(I, K, "".concat(V, "Id"), "".concat(Q, "Id"), z, B), Y = d.reduce(function(U, re) {
      var se = "".concat(re.axisType, "Map");
      return oe(oe({}, U), {}, _e({}, se, LK(C, oe(oe({}, re), {}, {
        graphicalItems: K,
        stackGroups: re.axisType === V && R,
        dataStartIndex: j,
        dataEndIndex: w
      }))));
    }, {}), J = HK(oe(oe({}, Y), {}, {
      props: C,
      graphicalItems: K
    }), E == null ? void 0 : E.legendBBox);
    Object.keys(Y).forEach(function(U) {
      Y[U] = y(C, Y[U], J, U.replace("Map", ""), n);
    });
    var G = Y["".concat(Q, "Map")], ee = UK(G), P = g(C, oe(oe({}, Y), {}, {
      dataStartIndex: j,
      dataEndIndex: w,
      updateId: A,
      graphicalItems: K,
      stackGroups: R,
      offset: J
    }));
    return oe(oe({
      formattedGraphicalItems: P,
      graphicalItems: K,
      offset: J,
      stackGroups: R
    }, ee), Y);
  }, _ = /* @__PURE__ */ (function(x) {
    function T(E) {
      var C, j, w;
      return OK(this, T), w = TK(this, T, [E]), _e(w, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), _e(w, "accessibilityManager", new cK()), _e(w, "handleLegendBBoxUpdate", function(A) {
        if (A) {
          var M = w.state, N = M.dataStartIndex, z = M.dataEndIndex, I = M.updateId;
          w.setState(oe({
            legendBBox: A
          }, b({
            props: w.props,
            dataStartIndex: N,
            dataEndIndex: z,
            updateId: I
          }, oe(oe({}, w.state), {}, {
            legendBBox: A
          }))));
        }
      }), _e(w, "handleReceiveSyncEvent", function(A, M, N) {
        if (w.props.syncId === A) {
          if (N === w.eventEmitterSymbol && typeof w.props.syncMethod != "function")
            return;
          w.applySyncEvent(M);
        }
      }), _e(w, "handleBrushChange", function(A) {
        var M = A.startIndex, N = A.endIndex;
        if (M !== w.state.dataStartIndex || N !== w.state.dataEndIndex) {
          var z = w.state.updateId;
          w.setState(function() {
            return oe({
              dataStartIndex: M,
              dataEndIndex: N
            }, b({
              props: w.props,
              dataStartIndex: M,
              dataEndIndex: N,
              updateId: z
            }, w.state));
          }), w.triggerSyncEvent({
            dataStartIndex: M,
            dataEndIndex: N
          });
        }
      }), _e(w, "handleMouseEnter", function(A) {
        var M = w.getMouseInfo(A);
        if (M) {
          var N = oe(oe({}, M), {}, {
            isTooltipActive: !0
          });
          w.setState(N), w.triggerSyncEvent(N);
          var z = w.props.onMouseEnter;
          Ee(z) && z(N, A);
        }
      }), _e(w, "triggeredAfterMouseMove", function(A) {
        var M = w.getMouseInfo(A), N = M ? oe(oe({}, M), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        w.setState(N), w.triggerSyncEvent(N);
        var z = w.props.onMouseMove;
        Ee(z) && z(N, A);
      }), _e(w, "handleItemMouseEnter", function(A) {
        w.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: A,
            activePayload: A.tooltipPayload,
            activeCoordinate: A.tooltipPosition || {
              x: A.cx,
              y: A.cy
            }
          };
        });
      }), _e(w, "handleItemMouseLeave", function() {
        w.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), _e(w, "handleMouseMove", function(A) {
        A.persist(), w.throttleTriggeredAfterMouseMove(A);
      }), _e(w, "handleMouseLeave", function(A) {
        w.throttleTriggeredAfterMouseMove.cancel();
        var M = {
          isTooltipActive: !1
        };
        w.setState(M), w.triggerSyncEvent(M);
        var N = w.props.onMouseLeave;
        Ee(N) && N(M, A);
      }), _e(w, "handleOuterEvent", function(A) {
        var M = _z(A), N = Bn(w.props, "".concat(M));
        if (M && Ee(N)) {
          var z, I;
          /.*touch.*/i.test(M) ? I = w.getMouseInfo(A.changedTouches[0]) : I = w.getMouseInfo(A), N((z = I) !== null && z !== void 0 ? z : {}, A);
        }
      }), _e(w, "handleClick", function(A) {
        var M = w.getMouseInfo(A);
        if (M) {
          var N = oe(oe({}, M), {}, {
            isTooltipActive: !0
          });
          w.setState(N), w.triggerSyncEvent(N);
          var z = w.props.onClick;
          Ee(z) && z(N, A);
        }
      }), _e(w, "handleMouseDown", function(A) {
        var M = w.props.onMouseDown;
        if (Ee(M)) {
          var N = w.getMouseInfo(A);
          M(N, A);
        }
      }), _e(w, "handleMouseUp", function(A) {
        var M = w.props.onMouseUp;
        if (Ee(M)) {
          var N = w.getMouseInfo(A);
          M(N, A);
        }
      }), _e(w, "handleTouchMove", function(A) {
        A.changedTouches != null && A.changedTouches.length > 0 && w.throttleTriggeredAfterMouseMove(A.changedTouches[0]);
      }), _e(w, "handleTouchStart", function(A) {
        A.changedTouches != null && A.changedTouches.length > 0 && w.handleMouseDown(A.changedTouches[0]);
      }), _e(w, "handleTouchEnd", function(A) {
        A.changedTouches != null && A.changedTouches.length > 0 && w.handleMouseUp(A.changedTouches[0]);
      }), _e(w, "handleDoubleClick", function(A) {
        var M = w.props.onDoubleClick;
        if (Ee(M)) {
          var N = w.getMouseInfo(A);
          M(N, A);
        }
      }), _e(w, "handleContextMenu", function(A) {
        var M = w.props.onContextMenu;
        if (Ee(M)) {
          var N = w.getMouseInfo(A);
          M(N, A);
        }
      }), _e(w, "triggerSyncEvent", function(A) {
        w.props.syncId !== void 0 && rb.emit(ab, w.props.syncId, A, w.eventEmitterSymbol);
      }), _e(w, "applySyncEvent", function(A) {
        var M = w.props, N = M.layout, z = M.syncMethod, I = w.state.updateId, B = A.dataStartIndex, k = A.dataEndIndex;
        if (A.dataStartIndex !== void 0 || A.dataEndIndex !== void 0)
          w.setState(oe({
            dataStartIndex: B,
            dataEndIndex: k
          }, b({
            props: w.props,
            dataStartIndex: B,
            dataEndIndex: k,
            updateId: I
          }, w.state)));
        else if (A.activeTooltipIndex !== void 0) {
          var V = A.chartX, Q = A.chartY, K = A.activeTooltipIndex, R = w.state, Y = R.offset, J = R.tooltipTicks;
          if (!Y)
            return;
          if (typeof z == "function")
            K = z(J, A);
          else if (z === "value") {
            K = -1;
            for (var G = 0; G < J.length; G++)
              if (J[G].value === A.activeLabel) {
                K = G;
                break;
              }
          }
          var ee = oe(oe({}, Y), {}, {
            x: Y.left,
            y: Y.top
          }), P = Math.min(V, ee.x + ee.width), U = Math.min(Q, ee.y + ee.height), re = J[K] && J[K].value, se = D0(w.state, w.props.data, K), he = J[K] ? {
            x: N === "horizontal" ? J[K].coordinate : P,
            y: N === "horizontal" ? U : J[K].coordinate
          } : dN;
          w.setState(oe(oe({}, A), {}, {
            activeLabel: re,
            activeCoordinate: he,
            activePayload: se,
            activeTooltipIndex: K
          }));
        } else
          w.setState(A);
      }), _e(w, "renderCursor", function(A) {
        var M, N = w.state, z = N.isTooltipActive, I = N.activeCoordinate, B = N.activePayload, k = N.offset, V = N.activeTooltipIndex, Q = N.tooltipAxisBandSize, K = w.getTooltipEventType(), R = (M = A.props.active) !== null && M !== void 0 ? M : z, Y = w.props.layout, J = A.key || "_recharts-cursor";
        return /* @__PURE__ */ L.createElement(yK, {
          key: J,
          activeCoordinate: I,
          activePayload: B,
          activeTooltipIndex: V,
          chartName: n,
          element: A,
          isActive: R,
          layout: Y,
          offset: k,
          tooltipAxisBandSize: Q,
          tooltipEventType: K
        });
      }), _e(w, "renderPolarAxis", function(A, M, N) {
        var z = Bn(A, "type.axisType"), I = Bn(w.state, "".concat(z, "Map")), B = A.type.defaultProps, k = B !== void 0 ? oe(oe({}, B), A.props) : A.props, V = I && I[k["".concat(z, "Id")]];
        return /* @__PURE__ */ te.cloneElement(A, oe(oe({}, V), {}, {
          className: ze(z, V.className),
          key: A.key || "".concat(M, "-").concat(N),
          ticks: Br(V, !0)
        }));
      }), _e(w, "renderPolarGrid", function(A) {
        var M = A.props, N = M.radialLines, z = M.polarAngles, I = M.polarRadius, B = w.state, k = B.radiusAxisMap, V = B.angleAxisMap, Q = Ta(k), K = Ta(V), R = K.cx, Y = K.cy, J = K.innerRadius, G = K.outerRadius;
        return /* @__PURE__ */ te.cloneElement(A, {
          polarAngles: Array.isArray(z) ? z : Br(K, !0).map(function(ee) {
            return ee.coordinate;
          }),
          polarRadius: Array.isArray(I) ? I : Br(Q, !0).map(function(ee) {
            return ee.coordinate;
          }),
          cx: R,
          cy: Y,
          innerRadius: J,
          outerRadius: G,
          key: A.key || "polar-grid",
          radialLines: N
        });
      }), _e(w, "renderLegend", function() {
        var A = w.state.formattedGraphicalItems, M = w.props, N = M.children, z = M.width, I = M.height, B = w.props.margin || {}, k = z - (B.left || 0) - (B.right || 0), V = JD({
          children: N,
          formattedGraphicalItems: A,
          legendWidth: k,
          legendContent: h
        });
        if (!V)
          return null;
        var Q = V.item, K = PM(V, mK);
        return /* @__PURE__ */ te.cloneElement(Q, oe(oe({}, K), {}, {
          chartWidth: z,
          chartHeight: I,
          margin: B,
          onBBoxUpdate: w.handleLegendBBoxUpdate
        }));
      }), _e(w, "renderTooltip", function() {
        var A, M = w.props, N = M.children, z = M.accessibilityLayer, I = bn(N, xn);
        if (!I)
          return null;
        var B = w.state, k = B.isTooltipActive, V = B.activeCoordinate, Q = B.activePayload, K = B.activeLabel, R = B.offset, Y = (A = I.props.active) !== null && A !== void 0 ? A : k;
        return /* @__PURE__ */ te.cloneElement(I, {
          viewBox: oe(oe({}, R), {}, {
            x: R.left,
            y: R.top
          }),
          active: Y,
          label: K,
          payload: Y ? Q : [],
          coordinate: V,
          accessibilityLayer: z
        });
      }), _e(w, "renderBrush", function(A) {
        var M = w.props, N = M.margin, z = M.data, I = w.state, B = I.offset, k = I.dataStartIndex, V = I.dataEndIndex, Q = I.updateId;
        return /* @__PURE__ */ te.cloneElement(A, {
          key: A.key || "_recharts-brush",
          onChange: Ys(w.handleBrushChange, A.props.onChange),
          data: z,
          x: fe(A.props.x) ? A.props.x : B.left,
          y: fe(A.props.y) ? A.props.y : B.top + B.height + B.brushBottom - (N.bottom || 0),
          width: fe(A.props.width) ? A.props.width : B.width,
          startIndex: k,
          endIndex: V,
          updateId: "brush-".concat(Q)
        });
      }), _e(w, "renderReferenceElement", function(A, M, N) {
        if (!A)
          return null;
        var z = w, I = z.clipPathId, B = w.state, k = B.xAxisMap, V = B.yAxisMap, Q = B.offset, K = A.type.defaultProps || {}, R = A.props, Y = R.xAxisId, J = Y === void 0 ? K.xAxisId : Y, G = R.yAxisId, ee = G === void 0 ? K.yAxisId : G;
        return /* @__PURE__ */ te.cloneElement(A, {
          key: A.key || "".concat(M, "-").concat(N),
          xAxis: k[J],
          yAxis: V[ee],
          viewBox: {
            x: Q.left,
            y: Q.top,
            width: Q.width,
            height: Q.height
          },
          clipPathId: I
        });
      }), _e(w, "renderActivePoints", function(A) {
        var M = A.item, N = A.activePoint, z = A.basePoint, I = A.childIndex, B = A.isRange, k = [], V = M.props.key, Q = M.item.type.defaultProps !== void 0 ? oe(oe({}, M.item.type.defaultProps), M.item.props) : M.item.props, K = Q.activeDot, R = Q.dataKey, Y = oe(oe({
          index: I,
          dataKey: R,
          cx: N.x,
          cy: N.y,
          r: 4,
          fill: C1(M.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: N.payload,
          value: N.value
        }, Te(K, !1)), rf(K));
        return k.push(T.renderActiveDot(K, Y, "".concat(V, "-activePoint-").concat(I))), z ? k.push(T.renderActiveDot(K, oe(oe({}, Y), {}, {
          cx: z.x,
          cy: z.y
        }), "".concat(V, "-basePoint-").concat(I))) : B && k.push(null), k;
      }), _e(w, "renderGraphicChild", function(A, M, N) {
        var z = w.filterFormatItem(A, M, N);
        if (!z)
          return null;
        var I = w.getTooltipEventType(), B = w.state, k = B.isTooltipActive, V = B.tooltipAxis, Q = B.activeTooltipIndex, K = B.activeLabel, R = w.props.children, Y = bn(R, xn), J = z.props, G = J.points, ee = J.isRange, P = J.baseLine, U = z.item.type.defaultProps !== void 0 ? oe(oe({}, z.item.type.defaultProps), z.item.props) : z.item.props, re = U.activeDot, se = U.hide, he = U.activeBar, ye = U.activeShape, de = !!(!se && k && Y && (re || he || ye)), Ce = {};
        I !== "axis" && Y && Y.props.trigger === "click" ? Ce = {
          onClick: Ys(w.handleItemMouseEnter, A.props.onClick)
        } : I !== "axis" && (Ce = {
          onMouseLeave: Ys(w.handleItemMouseLeave, A.props.onMouseLeave),
          onMouseEnter: Ys(w.handleItemMouseEnter, A.props.onMouseEnter)
        });
        var ce = /* @__PURE__ */ te.cloneElement(A, oe(oe({}, z.props), Ce));
        function ge(ln) {
          return typeof V.dataKey == "function" ? V.dataKey(ln.payload) : null;
        }
        if (de)
          if (Q >= 0) {
            var xe, ae;
            if (V.dataKey && !V.allowDuplicatedCategory) {
              var De = typeof V.dataKey == "function" ? ge : "payload.".concat(V.dataKey.toString());
              xe = nf(G, De, K), ae = ee && P && nf(P, De, K);
            } else
              xe = G == null ? void 0 : G[Q], ae = ee && P && P[Q];
            if (ye || he) {
              var Oe = A.props.activeIndex !== void 0 ? A.props.activeIndex : Q;
              return [/* @__PURE__ */ te.cloneElement(A, oe(oe(oe({}, z.props), Ce), {}, {
                activeIndex: Oe
              })), null, null];
            }
            if (!we(xe))
              return [ce].concat(el(w.renderActivePoints({
                item: z,
                activePoint: xe,
                basePoint: ae,
                childIndex: Q,
                isRange: ee
              })));
          } else {
            var ke, Qe = (ke = w.getItemByXY(w.state.activeCoordinate)) !== null && ke !== void 0 ? ke : {
              graphicalItem: ce
            }, ct = Qe.graphicalItem, on = ct.item, _n = on === void 0 ? A : on, On = ct.childIndex, Kt = oe(oe(oe({}, z.props), Ce), {}, {
              activeIndex: On
            });
            return [/* @__PURE__ */ te.cloneElement(_n, Kt), null, null];
          }
        return ee ? [ce, null, null] : [ce, null];
      }), _e(w, "renderCustomized", function(A, M, N) {
        return /* @__PURE__ */ te.cloneElement(A, oe(oe({
          key: "recharts-customized-".concat(N)
        }, w.props), w.state));
      }), _e(w, "renderMap", {
        CartesianGrid: {
          handler: Ws,
          once: !0
        },
        ReferenceArea: {
          handler: w.renderReferenceElement
        },
        ReferenceLine: {
          handler: Ws
        },
        ReferenceDot: {
          handler: w.renderReferenceElement
        },
        XAxis: {
          handler: Ws
        },
        YAxis: {
          handler: Ws
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
      }), w.clipPathId = "".concat((C = E.id) !== null && C !== void 0 ? C : xi("recharts"), "-clip"), w.throttleTriggeredAfterMouseMove = eD(w.triggeredAfterMouseMove, (j = E.throttleDelay) !== null && j !== void 0 ? j : 1e3 / 60), w.state = {}, w;
    }
    return MK(T, x), AK(T, [{
      key: "componentDidMount",
      value: function() {
        var C, j;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (C = this.props.margin.left) !== null && C !== void 0 ? C : 0,
            top: (j = this.props.margin.top) !== null && j !== void 0 ? j : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var C = this.props, j = C.children, w = C.data, A = C.height, M = C.layout, N = bn(j, xn);
        if (N) {
          var z = N.props.defaultIndex;
          if (!(typeof z != "number" || z < 0 || z > this.state.tooltipTicks.length - 1)) {
            var I = this.state.tooltipTicks[z] && this.state.tooltipTicks[z].value, B = D0(this.state, w, z, I), k = this.state.tooltipTicks[z].coordinate, V = (this.state.offset.top + A) / 2, Q = M === "horizontal", K = Q ? {
              x: k,
              y: V
            } : {
              y: k,
              x: V
            }, R = this.state.formattedGraphicalItems.find(function(J) {
              var G = J.item;
              return G.type.name === "Scatter";
            });
            R && (K = oe(oe({}, K), R.props.points[z].tooltipPosition), B = R.props.points[z].tooltipPayload);
            var Y = {
              activeTooltipIndex: z,
              isTooltipActive: !0,
              activeLabel: I,
              activePayload: B,
              activeCoordinate: K
            };
            this.setState(Y), this.renderCursor(N), this.accessibilityManager.setIndex(z);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(C, j) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== j.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== C.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== C.margin) {
          var w, A;
          this.accessibilityManager.setDetails({
            offset: {
              left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
              top: (A = this.props.margin.top) !== null && A !== void 0 ? A : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(C) {
        hb([bn(C.children, xn)], [bn(this.props.children, xn)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var C = bn(this.props.children, xn);
        if (C && typeof C.props.shared == "boolean") {
          var j = C.props.shared ? "axis" : "item";
          return f.indexOf(j) >= 0 ? j : u;
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
      value: function(C) {
        if (!this.container)
          return null;
        var j = this.container, w = j.getBoundingClientRect(), A = c8(w), M = {
          chartX: Math.round(C.pageX - A.left),
          chartY: Math.round(C.pageY - A.top)
        }, N = w.width / j.offsetWidth || 1, z = this.inRange(M.chartX, M.chartY, N);
        if (!z)
          return null;
        var I = this.state, B = I.xAxisMap, k = I.yAxisMap, V = this.getTooltipEventType(), Q = RM(this.state, this.props.data, this.props.layout, z);
        if (V !== "axis" && B && k) {
          var K = Ta(B).scale, R = Ta(k).scale, Y = K && K.invert ? K.invert(M.chartX) : null, J = R && R.invert ? R.invert(M.chartY) : null;
          return oe(oe({}, M), {}, {
            xValue: Y,
            yValue: J
          }, Q);
        }
        return Q ? oe(oe({}, M), Q) : null;
      }
    }, {
      key: "inRange",
      value: function(C, j) {
        var w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, A = this.props.layout, M = C / w, N = j / w;
        if (A === "horizontal" || A === "vertical") {
          var z = this.state.offset, I = M >= z.left && M <= z.left + z.width && N >= z.top && N <= z.top + z.height;
          return I ? {
            x: M,
            y: N
          } : null;
        }
        var B = this.state, k = B.angleAxisMap, V = B.radiusAxisMap;
        if (k && V) {
          var Q = Ta(k);
          return X2({
            x: M,
            y: N
          }, Q);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var C = this.props.children, j = this.getTooltipEventType(), w = bn(C, xn), A = {};
        w && j === "axis" && (w.props.trigger === "click" ? A = {
          onClick: this.handleClick
        } : A = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var M = rf(this.props, this.handleOuterEvent);
        return oe(oe({}, M), A);
      }
    }, {
      key: "addListener",
      value: function() {
        rb.on(ab, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        rb.removeListener(ab, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(C, j, w) {
        for (var A = this.state.formattedGraphicalItems, M = 0, N = A.length; M < N; M++) {
          var z = A[M];
          if (z.item === C || z.props.key === C.key || j === Ur(z.item.type) && w === z.childIndex)
            return z;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var C = this.clipPathId, j = this.state.offset, w = j.left, A = j.top, M = j.height, N = j.width;
        return /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("clipPath", {
          id: C
        }, /* @__PURE__ */ L.createElement("rect", {
          x: w,
          y: A,
          height: M,
          width: N
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var C = this.state.xAxisMap;
        return C ? Object.entries(C).reduce(function(j, w) {
          var A = DM(w, 2), M = A[0], N = A[1];
          return oe(oe({}, j), {}, _e({}, M, N.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var C = this.state.yAxisMap;
        return C ? Object.entries(C).reduce(function(j, w) {
          var A = DM(w, 2), M = A[0], N = A[1];
          return oe(oe({}, j), {}, _e({}, M, N.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(C) {
        var j;
        return (j = this.state.xAxisMap) === null || j === void 0 || (j = j[C]) === null || j === void 0 ? void 0 : j.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(C) {
        var j;
        return (j = this.state.yAxisMap) === null || j === void 0 || (j = j[C]) === null || j === void 0 ? void 0 : j.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(C) {
        var j = this.state, w = j.formattedGraphicalItems, A = j.activeItem;
        if (w && w.length)
          for (var M = 0, N = w.length; M < N; M++) {
            var z = w[M], I = z.props, B = z.item, k = B.type.defaultProps !== void 0 ? oe(oe({}, B.type.defaultProps), B.props) : B.props, V = Ur(B.type);
            if (V === "Bar") {
              var Q = (I.data || []).find(function(J) {
                return C9(C, J);
              });
              if (Q)
                return {
                  graphicalItem: z,
                  payload: Q
                };
            } else if (V === "RadialBar") {
              var K = (I.data || []).find(function(J) {
                return X2(C, J);
              });
              if (K)
                return {
                  graphicalItem: z,
                  payload: K
                };
            } else if (Md(z, A) || Cd(z, A) || ic(z, A)) {
              var R = bH({
                graphicalItem: z,
                activeTooltipItem: A,
                itemData: k.data
              }), Y = k.activeIndex === void 0 ? R : k.activeIndex;
              return {
                graphicalItem: oe(oe({}, z), {}, {
                  childIndex: Y
                }),
                payload: ic(z, A) ? k.data[R] : z.props.data[R]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var C = this;
        if (!iA(this))
          return null;
        var j = this.props, w = j.children, A = j.className, M = j.width, N = j.height, z = j.style, I = j.compact, B = j.title, k = j.desc, V = PM(j, gK), Q = Te(V, !1);
        if (I)
          return /* @__PURE__ */ L.createElement(uM, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ L.createElement(vb, Oo({}, Q, {
            width: M,
            height: N,
            title: B,
            desc: k
          }), this.renderClipPath(), lA(w, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var K, R;
          Q.tabIndex = (K = this.props.tabIndex) !== null && K !== void 0 ? K : 0, Q.role = (R = this.props.role) !== null && R !== void 0 ? R : "application", Q.onKeyDown = function(J) {
            C.accessibilityManager.keyboardEvent(J);
          }, Q.onFocus = function() {
            C.accessibilityManager.focus();
          };
        }
        var Y = this.parseEventsOfWrapper();
        return /* @__PURE__ */ L.createElement(uM, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ L.createElement("div", Oo({
          className: ze("recharts-wrapper", A),
          style: oe({
            position: "relative",
            cursor: "default",
            width: M,
            height: N
          }, z)
        }, Y, {
          ref: function(G) {
            C.container = G;
          }
        }), /* @__PURE__ */ L.createElement(vb, Oo({}, Q, {
          width: M,
          height: N,
          title: B,
          desc: k,
          style: $K
        }), this.renderClipPath(), lA(w, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(te.Component);
  _e(_, "displayName", n), _e(_, "defaultProps", oe({
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
  }, v)), _e(_, "getDerivedStateFromProps", function(x, T) {
    var E = x.dataKey, C = x.data, j = x.children, w = x.width, A = x.height, M = x.layout, N = x.stackOffset, z = x.margin, I = T.dataStartIndex, B = T.dataEndIndex;
    if (T.updateId === void 0) {
      var k = $M(x);
      return oe(oe(oe({}, k), {}, {
        updateId: 0
      }, b(oe(oe({
        props: x
      }, k), {}, {
        updateId: 0
      }), T)), {}, {
        prevDataKey: E,
        prevData: C,
        prevWidth: w,
        prevHeight: A,
        prevLayout: M,
        prevStackOffset: N,
        prevMargin: z,
        prevChildren: j
      });
    }
    if (E !== T.prevDataKey || C !== T.prevData || w !== T.prevWidth || A !== T.prevHeight || M !== T.prevLayout || N !== T.prevStackOffset || !wo(z, T.prevMargin)) {
      var V = $M(x), Q = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: T.chartX,
        chartY: T.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: T.isTooltipActive
      }, K = oe(oe({}, RM(T, C, M)), {}, {
        updateId: T.updateId + 1
      }), R = oe(oe(oe({}, V), Q), K);
      return oe(oe(oe({}, R), b(oe({
        props: x
      }, R), T)), {}, {
        prevDataKey: E,
        prevData: C,
        prevWidth: w,
        prevHeight: A,
        prevLayout: M,
        prevStackOffset: N,
        prevMargin: z,
        prevChildren: j
      });
    }
    if (!hb(j, T.prevChildren)) {
      var Y, J, G, ee, P = bn(j, Uo), U = P && (Y = (J = P.props) === null || J === void 0 ? void 0 : J.startIndex) !== null && Y !== void 0 ? Y : I, re = P && (G = (ee = P.props) === null || ee === void 0 ? void 0 : ee.endIndex) !== null && G !== void 0 ? G : B, se = U !== I || re !== B, he = !we(C), ye = he && !se ? T.updateId : T.updateId + 1;
      return oe(oe({
        updateId: ye
      }, b(oe(oe({
        props: x
      }, T), {}, {
        updateId: ye,
        dataStartIndex: U,
        dataEndIndex: re
      }), T)), {}, {
        prevChildren: j,
        dataStartIndex: U,
        dataEndIndex: re
      });
    }
    return null;
  }), _e(_, "renderActiveDot", function(x, T, E) {
    var C;
    return /* @__PURE__ */ te.isValidElement(x) ? C = /* @__PURE__ */ te.cloneElement(x, T) : Ee(x) ? C = x(T) : C = /* @__PURE__ */ L.createElement(jd, T), /* @__PURE__ */ L.createElement(He, {
      className: "recharts-active-dot",
      key: E
    }, C);
  });
  var S = /* @__PURE__ */ te.forwardRef(function(T, E) {
    return /* @__PURE__ */ L.createElement(_, Oo({}, T, {
      ref: E
    }));
  });
  return S.displayName = _.displayName, S;
}, YK = Ud({
  chartName: "LineChart",
  GraphicalChild: Lr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: sr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }],
  formatAxisMap: Pd
}), KK = Ud({
  chartName: "BarChart",
  GraphicalChild: Xr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: sr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }],
  formatAxisMap: Pd
}), XK = Ud({
  chartName: "AreaChart",
  GraphicalChild: Zr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: sr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }],
  formatAxisMap: Pd
}), VK = Ud({
  chartName: "ComposedChart",
  GraphicalChild: [Lr, Zr, Xr, Bd],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: sr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }, {
    axisType: "zAxis",
    AxisComp: kd
  }],
  formatAxisMap: Pd
});
function Zs(e, t) {
  let n = 0, r = 0;
  for (const u of t)
    u == null || !isFinite(u) || (u < n && (n = u), u > r && (r = u));
  let o = 1;
  for (const u of [n, r]) o = Math.max(o, e(u).length);
  return Math.min(90, Math.ceil(o * 7) + 14);
}
const Qs = { top: 8, right: 12, bottom: 0, left: 0 }, qM = [
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
], go = "var(--nb-border)", P0 = "var(--nb-muted)", N0 = "var(--nb-text)", Js = "var(--nb-accent)", bo = "var(--nb-green)", kM = "var(--nb-red)", Oa = { fill: P0, fontSize: 12 }, ef = {
  backgroundColor: "var(--nb-panel-2)",
  border: "1px solid var(--nb-border)",
  borderRadius: 8,
  color: N0,
  fontSize: 13
};
function FK({
  rows: e,
  accounts: t,
  mode: n,
  range: r,
  masked: o = !1,
  compact: u = !0
}) {
  const c = r === "1d" || r === "1w", f = (j) => ti(j, c), d = (j, w) => w !== 0 ? (j - w) / Math.abs(w) : null, h = u ? GM : lr, y = (j) => o ? Eu(j) : h(j), v = (j) => o ? Eu(j) : lr(j, !0);
  if (n === "flow") {
    const j = m$(e, t, r), w = (M) => o ? M.toFixed(2) : cb(M), A = (M) => o ? M.toFixed(1) : h(M);
    return /* @__PURE__ */ $.jsx(Ls, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(KK, { data: j, margin: Qs, children: [
      /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
      /* @__PURE__ */ $.jsx(sr, { dataKey: "ts", tickFormatter: (M) => ti(M), tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ $.jsx(fr, { tickFormatter: (M) => A(M), tick: Oa, width: Zs(A, j.map((M) => M.flow)) }),
      /* @__PURE__ */ $.jsx(
        xn,
        {
          contentStyle: ef,
          labelFormatter: (M) => ti(M),
          formatter: (M) => [w(M), "Net flow"],
          cursor: { fill: go, fillOpacity: 0.4 }
        }
      ),
      /* @__PURE__ */ $.jsx(Xr, { dataKey: "flow", radius: [3, 3, 0, 0], isAnimationActive: !1, children: j.map((M, N) => /* @__PURE__ */ $.jsx(gd, { fill: M.flow >= 0 ? bo : kM, fillOpacity: 0.8 }, N)) })
    ] }) });
  }
  if (n === "total") {
    const j = Fn(e[0], t), w = e.map((A) => {
      const M = Fn(A, t);
      return { ts: A.ts, total: o ? d(M, j) : M };
    });
    return /* @__PURE__ */ $.jsx(Ls, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(XK, { data: w, margin: Qs, children: [
      /* @__PURE__ */ $.jsxs("defs", { children: [
        /* @__PURE__ */ $.jsxs("linearGradient", { id: "nw", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ $.jsx("stop", { offset: "0%", stopColor: Js, stopOpacity: 0.22 }),
          /* @__PURE__ */ $.jsx("stop", { offset: "100%", stopColor: Js, stopOpacity: 0 })
        ] }),
        /* @__PURE__ */ $.jsxs("linearGradient", { id: "nwline", x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ $.jsx("stop", { offset: "0%", stopColor: Js }),
          /* @__PURE__ */ $.jsx("stop", { offset: "100%", stopColor: bo })
        ] })
      ] }),
      /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
      /* @__PURE__ */ $.jsx(sr, { dataKey: "ts", tickFormatter: f, tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ $.jsx(fr, { tickFormatter: y, tick: Oa, width: Zs(y, w.map((A) => A.total)), domain: ["auto", "auto"] }),
      /* @__PURE__ */ $.jsx(
        xn,
        {
          contentStyle: ef,
          labelFormatter: (A) => ti(A, !0),
          formatter: (A) => [v(A), "Total"]
        }
      ),
      /* @__PURE__ */ $.jsx(
        Zr,
        {
          type: "monotone",
          dataKey: "total",
          stroke: "url(#nwline)",
          strokeWidth: 2.5,
          fill: "url(#nw)",
          dot: (A) => {
            const { cx: M, cy: N, index: z, key: I } = A;
            return z !== w.length - 1 || M == null || N == null ? /* @__PURE__ */ $.jsx("g", {}, I) : /* @__PURE__ */ $.jsxs("g", { children: [
              /* @__PURE__ */ $.jsx("circle", { cx: M, cy: N, r: 8, fill: bo, fillOpacity: 0.25 }),
              /* @__PURE__ */ $.jsx("circle", { cx: M, cy: N, r: 4, fill: bo })
            ] }, I);
          },
          activeDot: { r: 4, fill: bo, stroke: "none" },
          isAnimationActive: !1
        }
      )
    ] }) });
  }
  if (n === "category") {
    const j = (M) => M.category === "retirement", w = {
      retirement: Fn(e[0], t, j),
      other: Fn(e[0], t, (M) => !j(M)),
      debt: sb(e[0], t)
    }, A = e.map((M) => {
      const N = Fn(M, t, j), z = Fn(M, t, (B) => !j(B)), I = sb(M, t);
      return o ? {
        ts: M.ts,
        retirement: d(N, w.retirement),
        other: d(z, w.other),
        debt: d(I, w.debt)
      } : { ts: M.ts, retirement: N, other: z, debt: I };
    });
    return /* @__PURE__ */ $.jsx(Ls, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(YK, { data: A, margin: Qs, children: [
      /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
      /* @__PURE__ */ $.jsx(sr, { dataKey: "ts", tickFormatter: f, tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ $.jsx(
        fr,
        {
          tickFormatter: y,
          tick: Oa,
          width: Zs(y, A.flatMap((M) => [M.retirement, M.other, M.debt])),
          domain: ["auto", "auto"]
        }
      ),
      /* @__PURE__ */ $.jsx(
        xn,
        {
          contentStyle: ef,
          labelFormatter: (M) => ti(M, !0),
          formatter: (M, N) => [v(M), N]
        }
      ),
      /* @__PURE__ */ $.jsx(Lr, { type: "monotone", dataKey: "retirement", stroke: bo, strokeWidth: 2, dot: !1, isAnimationActive: !1 }),
      /* @__PURE__ */ $.jsx(Lr, { type: "monotone", dataKey: "other", stroke: Js, strokeWidth: 2, dot: !1, isAnimationActive: !1 }),
      /* @__PURE__ */ $.jsx(Lr, { type: "monotone", dataKey: "debt", stroke: kM, strokeWidth: 2, dot: !1, isAnimationActive: !1 })
    ] }) });
  }
  const g = (j) => o ? `${j >= 0 ? "+" : ""}${j.toFixed(2)}` : cb(j), b = (j) => o ? j.toFixed(1) : h(j), _ = g$(e, t, r), S = t.filter(
    (j) => _.some((w) => Math.abs(w.deltas[j.id] ?? 0) > 4e-3)
  ), x = _.map((j) => {
    const w = { ts: j.ts, net: j.net };
    for (const A of S) w[`a${A.id}`] = j.deltas[A.id] ?? 0;
    return w;
  }), T = _.flatMap((j) => {
    let w = 0, A = 0;
    for (const M of S) {
      const N = j.deltas[M.id] ?? 0;
      N >= 0 ? w += N : A += N;
    }
    return [w, A];
  }), E = (j) => `${j.org_name || j.org_domain} · ${j.nickname || j.name}`, C = ({
    active: j,
    payload: w,
    label: A
  }) => {
    if (!j || !w || w.length === 0) return null;
    const M = w.filter((z) => z.dataKey !== "net" && Math.abs(Number(z.value)) > 4e-3).sort((z, I) => Math.abs(Number(I.value)) - Math.abs(Number(z.value))), N = w.find((z) => z.dataKey === "net");
    return /* @__PURE__ */ $.jsxs("div", { style: { ...ef, padding: "8px 12px" }, children: [
      /* @__PURE__ */ $.jsx("div", { style: { marginBottom: 4 }, children: ti(A ?? 0) }),
      M.map((z) => {
        const I = S.find((B) => `a${B.id}` === z.dataKey);
        return /* @__PURE__ */ $.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 16 }, children: [
          /* @__PURE__ */ $.jsx("span", { style: { color: z.color }, children: I ? E(I) : String(z.dataKey) }),
          /* @__PURE__ */ $.jsx("span", { children: g(Number(z.value)) })
        ] }, String(z.dataKey));
      }),
      N && /* @__PURE__ */ $.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 16, marginTop: 4, color: P0 }, children: [
        /* @__PURE__ */ $.jsx("span", { children: "net" }),
        /* @__PURE__ */ $.jsx("span", { children: g(Number(N.value)) })
      ] })
    ] });
  };
  return /* @__PURE__ */ $.jsx(Ls, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(VK, { data: x, stackOffset: "sign", margin: Qs, children: [
    /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
    /* @__PURE__ */ $.jsx(sr, { dataKey: "ts", tickFormatter: (j) => ti(j), tick: Oa, minTickGap: 40 }),
    /* @__PURE__ */ $.jsx(fr, { tickFormatter: b, tick: Oa, width: Zs(b, T) }),
    /* @__PURE__ */ $.jsx(xn, { content: /* @__PURE__ */ $.jsx(C, {}), cursor: { fill: go, fillOpacity: 0.4 } }),
    /* @__PURE__ */ $.jsx(Nd, { y: 0, stroke: P0, strokeOpacity: 0.6 }),
    S.map((j, w) => /* @__PURE__ */ $.jsx(
      Xr,
      {
        dataKey: `a${j.id}`,
        stackId: "delta",
        fill: qM[w % qM.length],
        fillOpacity: 0.8,
        isAnimationActive: !1
      },
      j.id
    )),
    /* @__PURE__ */ $.jsx(
      Lr,
      {
        type: "monotone",
        dataKey: "net",
        stroke: N0,
        strokeWidth: 1.5,
        strokeOpacity: 0.65,
        strokeDasharray: "4 3",
        dot: { r: 2, fill: N0, strokeWidth: 0 },
        isAnimationActive: !1
      }
    )
  ] }) });
}
function pN({
  hass: e,
  config: t
}) {
  const n = jo.find((T) => T.key === (t.view ?? "all")) ?? jo[2], [r, o] = te.useState(t.range ?? "6m"), [u, c] = te.useState(
    t.mode && n.modes.includes(t.mode) ? t.mode : n.defaultMode
  ), { overview: f, series: d, masked: h, error: y } = q0(e, t.entry, r), v = ad(f), g = te.useMemo(() => v.filter(n.pick), [v, n]), b = te.useMemo(() => {
    if (!d) return [];
    const T = new Set(g.map((E) => E.id));
    return ZM(d.filter((E) => T.has(E.account_id)));
  }, [d, g]), _ = t.show_controls !== !1, S = _ && t.show_mode_selector !== !1 && n.modes.length > 1, x = _ && t.show_range_selector !== !1;
  return /* @__PURE__ */ $.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? n.label }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: (S || x) && /* @__PURE__ */ $.jsxs("span", { className: "controls", children: [
        S && /* @__PURE__ */ $.jsx(tf, { options: n.modes, value: u, onChange: c }),
        x && /* @__PURE__ */ $.jsx(tf, { options: z0, value: r, onChange: o })
      ] }) })
    ] }),
    y && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: y }),
    !y && (!f || !d) && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !y && f && d && b.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No data for this view yet." }),
    !y && f && d && b.length > 0 && /* @__PURE__ */ $.jsx(
      FK,
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
var ob = { exports: {} }, vu = {}, lb = { exports: {} }, ub = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var BM;
function WK() {
  return BM || (BM = 1, (function(e) {
    function t(R, Y) {
      var J = R.length;
      R.push(Y);
      e: for (; 0 < J; ) {
        var G = J - 1 >>> 1, ee = R[G];
        if (0 < o(ee, Y))
          R[G] = Y, R[J] = ee, J = G;
        else break e;
      }
    }
    function n(R) {
      return R.length === 0 ? null : R[0];
    }
    function r(R) {
      if (R.length === 0) return null;
      var Y = R[0], J = R.pop();
      if (J !== Y) {
        R[0] = J;
        e: for (var G = 0, ee = R.length, P = ee >>> 1; G < P; ) {
          var U = 2 * (G + 1) - 1, re = R[U], se = U + 1, he = R[se];
          if (0 > o(re, J))
            se < ee && 0 > o(he, re) ? (R[G] = he, R[se] = J, G = se) : (R[G] = re, R[U] = J, G = U);
          else if (se < ee && 0 > o(he, J))
            R[G] = he, R[se] = J, G = se;
          else break e;
        }
      }
      return Y;
    }
    function o(R, Y) {
      var J = R.sortIndex - Y.sortIndex;
      return J !== 0 ? J : R.id - Y.id;
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
    var d = [], h = [], y = 1, v = null, g = 3, b = !1, _ = !1, S = !1, x = !1, T = typeof setTimeout == "function" ? setTimeout : null, E = typeof clearTimeout == "function" ? clearTimeout : null, C = typeof setImmediate < "u" ? setImmediate : null;
    function j(R) {
      for (var Y = n(h); Y !== null; ) {
        if (Y.callback === null) r(h);
        else if (Y.startTime <= R)
          r(h), Y.sortIndex = Y.expirationTime, t(d, Y);
        else break;
        Y = n(h);
      }
    }
    function w(R) {
      if (S = !1, j(R), !_)
        if (n(d) !== null)
          _ = !0, A || (A = !0, k());
        else {
          var Y = n(h);
          Y !== null && K(w, Y.startTime - R);
        }
    }
    var A = !1, M = -1, N = 5, z = -1;
    function I() {
      return x ? !0 : !(e.unstable_now() - z < N);
    }
    function B() {
      if (x = !1, A) {
        var R = e.unstable_now();
        z = R;
        var Y = !0;
        try {
          e: {
            _ = !1, S && (S = !1, E(M), M = -1), b = !0;
            var J = g;
            try {
              t: {
                for (j(R), v = n(d); v !== null && !(v.expirationTime > R && I()); ) {
                  var G = v.callback;
                  if (typeof G == "function") {
                    v.callback = null, g = v.priorityLevel;
                    var ee = G(
                      v.expirationTime <= R
                    );
                    if (R = e.unstable_now(), typeof ee == "function") {
                      v.callback = ee, j(R), Y = !0;
                      break t;
                    }
                    v === n(d) && r(d), j(R);
                  } else r(d);
                  v = n(d);
                }
                if (v !== null) Y = !0;
                else {
                  var P = n(h);
                  P !== null && K(
                    w,
                    P.startTime - R
                  ), Y = !1;
                }
              }
              break e;
            } finally {
              v = null, g = J, b = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? k() : A = !1;
        }
      }
    }
    var k;
    if (typeof C == "function")
      k = function() {
        C(B);
      };
    else if (typeof MessageChannel < "u") {
      var V = new MessageChannel(), Q = V.port2;
      V.port1.onmessage = B, k = function() {
        Q.postMessage(null);
      };
    } else
      k = function() {
        T(B, 0);
      };
    function K(R, Y) {
      M = T(function() {
        R(e.unstable_now());
      }, Y);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(R) {
      R.callback = null;
    }, e.unstable_forceFrameRate = function(R) {
      0 > R || 125 < R ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : N = 0 < R ? Math.floor(1e3 / R) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return g;
    }, e.unstable_next = function(R) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = g;
      }
      var J = g;
      g = Y;
      try {
        return R();
      } finally {
        g = J;
      }
    }, e.unstable_requestPaint = function() {
      x = !0;
    }, e.unstable_runWithPriority = function(R, Y) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var J = g;
      g = R;
      try {
        return Y();
      } finally {
        g = J;
      }
    }, e.unstable_scheduleCallback = function(R, Y, J) {
      var G = e.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? G + J : G) : J = G, R) {
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
      return ee = J + ee, R = {
        id: y++,
        callback: Y,
        priorityLevel: R,
        startTime: J,
        expirationTime: ee,
        sortIndex: -1
      }, J > G ? (R.sortIndex = J, t(h, R), n(d) === null && R === n(h) && (S ? (E(M), M = -1) : S = !0, K(w, J - G))) : (R.sortIndex = ee, t(d, R), _ || b || (_ = !0, A || (A = !0, k()))), R;
    }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(R) {
      var Y = g;
      return function() {
        var J = g;
        g = Y;
        try {
          return R.apply(this, arguments);
        } finally {
          g = J;
        }
      };
    };
  })(ub)), ub;
}
var LM;
function ZK() {
  return LM || (LM = 1, lb.exports = WK()), lb.exports;
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
var UM;
function QK() {
  if (UM) return vu;
  UM = 1;
  var e = ZK(), t = R0(), n = YM();
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
  var v = Object.assign, g = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), C = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), I = Symbol.for("react.memo_cache_sentinel"), B = Symbol.iterator;
  function k(a) {
    return a === null || typeof a != "object" ? null : (a = B && a[B] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var V = Symbol.for("react.client.reference");
  function Q(a) {
    if (a == null) return null;
    if (typeof a == "function")
      return a.$$typeof === V ? null : a.displayName || a.name || null;
    if (typeof a == "string") return a;
    switch (a) {
      case S:
        return "Fragment";
      case T:
        return "Profiler";
      case x:
        return "StrictMode";
      case w:
        return "Suspense";
      case A:
        return "SuspenseList";
      case z:
        return "Activity";
    }
    if (typeof a == "object")
      switch (a.$$typeof) {
        case _:
          return "Portal";
        case C:
          return a.displayName || "Context";
        case E:
          return (a._context.displayName || "Context") + ".Consumer";
        case j:
          var i = a.render;
          return a = a.displayName, a || (a = i.displayName || i.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
        case M:
          return i = a.displayName || null, i !== null ? i : Q(a.type) || "Memo";
        case N:
          i = a._payload, a = a._init;
          try {
            return Q(a(i));
          } catch {
          }
      }
    return null;
  }
  var K = Array.isArray, R = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], ee = -1;
  function P(a) {
    return { current: a };
  }
  function U(a) {
    0 > ee || (a.current = G[ee], G[ee] = null, ee--);
  }
  function re(a, i) {
    ee++, G[ee] = a.current, a.current = i;
  }
  var se = P(null), he = P(null), ye = P(null), de = P(null);
  function Ce(a, i) {
    switch (re(ye, i), re(he, a), re(se, null), i.nodeType) {
      case 9:
      case 11:
        a = (a = i.documentElement) && (a = a.namespaceURI) ? cO(a) : 0;
        break;
      default:
        if (a = i.tagName, i = i.namespaceURI)
          i = cO(i), a = sO(i, a);
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
    U(se), re(se, a);
  }
  function ce() {
    U(se), U(he), U(ye);
  }
  function ge(a) {
    a.memoizedState !== null && re(de, a);
    var i = se.current, l = sO(i, a.type);
    i !== l && (re(he, a), re(se, l));
  }
  function xe(a) {
    he.current === a && (U(se), U(he)), de.current === a && (U(de), eu._currentValue = J);
  }
  var ae, De;
  function Oe(a) {
    if (ae === void 0)
      try {
        throw Error();
      } catch (l) {
        var i = l.stack.trim().match(/\n( *(at )?)/);
        ae = i && i[1] || "", De = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ae + a + De;
  }
  var ke = !1;
  function Qe(a, i) {
    if (!a || ke) return "";
    ke = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (i) {
              var ue = function() {
                throw Error();
              };
              if (Object.defineProperty(ue.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ue, []);
                } catch (ne) {
                  var Z = ne;
                }
                Reflect.construct(a, [], ue);
              } else {
                try {
                  ue.call();
                } catch (ne) {
                  Z = ne;
                }
                a.call(ue.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ne) {
                Z = ne;
              }
              (ue = a()) && typeof ue.catch == "function" && ue.catch(function() {
              });
            }
          } catch (ne) {
            if (ne && Z && typeof ne.stack == "string")
              return [ne.stack, Z.stack];
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
        var q = O.split(`
`), W = D.split(`
`);
        for (p = s = 0; s < q.length && !q[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; p < W.length && !W[p].includes(
          "DetermineComponentFrameRoot"
        ); )
          p++;
        if (s === q.length || p === W.length)
          for (s = q.length - 1, p = W.length - 1; 1 <= s && 0 <= p && q[s] !== W[p]; )
            p--;
        for (; 1 <= s && 0 <= p; s--, p--)
          if (q[s] !== W[p]) {
            if (s !== 1 || p !== 1)
              do
                if (s--, p--, 0 > p || q[s] !== W[p]) {
                  var ie = `
` + q[s].replace(" at new ", " at ");
                  return a.displayName && ie.includes("<anonymous>") && (ie = ie.replace("<anonymous>", a.displayName)), ie;
                }
              while (1 <= s && 0 <= p);
            break;
          }
      }
    } finally {
      ke = !1, Error.prepareStackTrace = l;
    }
    return (l = a ? a.displayName || a.name : "") ? Oe(l) : "";
  }
  function ct(a, i) {
    switch (a.tag) {
      case 26:
      case 27:
      case 5:
        return Oe(a.type);
      case 16:
        return Oe("Lazy");
      case 13:
        return a.child !== i && i !== null ? Oe("Suspense Fallback") : Oe("Suspense");
      case 19:
        return Oe("SuspenseList");
      case 0:
      case 15:
        return Qe(a.type, !1);
      case 11:
        return Qe(a.type.render, !1);
      case 1:
        return Qe(a.type, !0);
      case 31:
        return Oe("Activity");
      default:
        return "";
    }
  }
  function on(a) {
    try {
      var i = "", l = null;
      do
        i += ct(a, l), l = a, a = a.return;
      while (a);
      return i;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  var _n = Object.prototype.hasOwnProperty, On = e.unstable_scheduleCallback, Kt = e.unstable_cancelCallback, ln = e.unstable_shouldYield, In = e.unstable_requestPaint, _t = e.unstable_now, gc = e.unstable_getCurrentPriorityLevel, U1 = e.unstable_ImmediatePriority, I1 = e.unstable_UserBlockingPriority, bc = e.unstable_NormalPriority, mN = e.unstable_LowPriority, H1 = e.unstable_IdlePriority, gN = e.log, bN = e.unstable_setDisableYieldValue, dl = null, un = null;
  function Qr(a) {
    if (typeof gN == "function" && bN(a), un && typeof un.setStrictMode == "function")
      try {
        un.setStrictMode(dl, a);
      } catch {
      }
  }
  var cn = Math.clz32 ? Math.clz32 : _N, xN = Math.log, SN = Math.LN2;
  function _N(a) {
    return a >>>= 0, a === 0 ? 32 : 31 - (xN(a) / SN | 0) | 0;
  }
  var xc = 256, Sc = 262144, _c = 4194304;
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
  function Oc(a, i, l) {
    var s = a.pendingLanes;
    if (s === 0) return 0;
    var p = 0, m = a.suspendedLanes, O = a.pingedLanes;
    a = a.warmLanes;
    var D = s & 134217727;
    return D !== 0 ? (s = D & ~m, s !== 0 ? p = qa(s) : (O &= D, O !== 0 ? p = qa(O) : l || (l = D & ~a, l !== 0 && (p = qa(l))))) : (D = s & ~m, D !== 0 ? p = qa(D) : O !== 0 ? p = qa(O) : l || (l = s & ~a, l !== 0 && (p = qa(l)))), p === 0 ? 0 : i !== 0 && i !== p && (i & m) === 0 && (m = p & -p, l = i & -i, m >= l || m === 32 && (l & 4194048) !== 0) ? i : p;
  }
  function hl(a, i) {
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
  function G1() {
    var a = _c;
    return _c <<= 1, (_c & 62914560) === 0 && (_c = 4194304), a;
  }
  function Gd(a) {
    for (var i = [], l = 0; 31 > l; l++) i.push(a);
    return i;
  }
  function pl(a, i) {
    a.pendingLanes |= i, i !== 268435456 && (a.suspendedLanes = 0, a.pingedLanes = 0, a.warmLanes = 0);
  }
  function wN(a, i, l, s, p, m) {
    var O = a.pendingLanes;
    a.pendingLanes = l, a.suspendedLanes = 0, a.pingedLanes = 0, a.warmLanes = 0, a.expiredLanes &= l, a.entangledLanes &= l, a.errorRecoveryDisabledLanes &= l, a.shellSuspendCounter = 0;
    var D = a.entanglements, q = a.expirationTimes, W = a.hiddenUpdates;
    for (l = O & ~l; 0 < l; ) {
      var ie = 31 - cn(l), ue = 1 << ie;
      D[ie] = 0, q[ie] = -1;
      var Z = W[ie];
      if (Z !== null)
        for (W[ie] = null, ie = 0; ie < Z.length; ie++) {
          var ne = Z[ie];
          ne !== null && (ne.lane &= -536870913);
        }
      l &= ~ue;
    }
    s !== 0 && Y1(a, s, 0), m !== 0 && p === 0 && a.tag !== 0 && (a.suspendedLanes |= m & ~(O & ~i));
  }
  function Y1(a, i, l) {
    a.pendingLanes |= i, a.suspendedLanes &= ~i;
    var s = 31 - cn(i);
    a.entangledLanes |= i, a.entanglements[s] = a.entanglements[s] | 1073741824 | l & 261930;
  }
  function K1(a, i) {
    var l = a.entangledLanes |= i;
    for (a = a.entanglements; l; ) {
      var s = 31 - cn(l), p = 1 << s;
      p & i | a[s] & i && (a[s] |= i), l &= ~p;
    }
  }
  function X1(a, i) {
    var l = i & -i;
    return l = (l & 42) !== 0 ? 1 : Yd(l), (l & (a.suspendedLanes | i)) !== 0 ? 0 : l;
  }
  function Yd(a) {
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
  function Kd(a) {
    return a &= -a, 2 < a ? 8 < a ? (a & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function V1() {
    var a = Y.p;
    return a !== 0 ? a : (a = window.event, a === void 0 ? 32 : NO(a.type));
  }
  function F1(a, i) {
    var l = Y.p;
    try {
      return Y.p = a, i();
    } finally {
      Y.p = l;
    }
  }
  var Jr = Math.random().toString(36).slice(2), Nt = "__reactFiber$" + Jr, Ft = "__reactProps$" + Jr, Mi = "__reactContainer$" + Jr, Xd = "__reactEvents$" + Jr, AN = "__reactListeners$" + Jr, TN = "__reactHandles$" + Jr, W1 = "__reactResources$" + Jr, vl = "__reactMarker$" + Jr;
  function Vd(a) {
    delete a[Nt], delete a[Ft], delete a[Xd], delete a[AN], delete a[TN];
  }
  function Ci(a) {
    var i = a[Nt];
    if (i) return i;
    for (var l = a.parentNode; l; ) {
      if (i = l[Mi] || l[Nt]) {
        if (l = i.alternate, i.child !== null || l !== null && l.child !== null)
          for (a = mO(a); a !== null; ) {
            if (l = a[Nt]) return l;
            a = mO(a);
          }
        return i;
      }
      a = l, l = a.parentNode;
    }
    return null;
  }
  function Di(a) {
    if (a = a[Nt] || a[Mi]) {
      var i = a.tag;
      if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3)
        return a;
    }
    return null;
  }
  function yl(a) {
    var i = a.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return a.stateNode;
    throw Error(r(33));
  }
  function Pi(a) {
    var i = a[W1];
    return i || (i = a[W1] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), i;
  }
  function Mt(a) {
    a[vl] = !0;
  }
  var Z1 = /* @__PURE__ */ new Set(), Q1 = {};
  function ka(a, i) {
    Ni(a, i), Ni(a + "Capture", i);
  }
  function Ni(a, i) {
    for (Q1[a] = i, a = 0; a < i.length; a++)
      Z1.add(i[a]);
  }
  var EN = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), J1 = {}, ex = {};
  function jN(a) {
    return _n.call(ex, a) ? !0 : _n.call(J1, a) ? !1 : EN.test(a) ? ex[a] = !0 : (J1[a] = !0, !1);
  }
  function wc(a, i, l) {
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
  function Ac(a, i, l) {
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
  function mr(a, i, l, s) {
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
  function tx(a) {
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
  function Fd(a) {
    if (!a._valueTracker) {
      var i = tx(a) ? "checked" : "value";
      a._valueTracker = MN(
        a,
        i,
        "" + a[i]
      );
    }
  }
  function nx(a) {
    if (!a) return !1;
    var i = a._valueTracker;
    if (!i) return !0;
    var l = i.getValue(), s = "";
    return a && (s = tx(a) ? a.checked ? "true" : "false" : a.value), a = s, a !== l ? (i.setValue(a), !0) : !1;
  }
  function Tc(a) {
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
  function Wd(a, i, l, s, p, m, O, D) {
    a.name = "", O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" ? a.type = O : a.removeAttribute("type"), i != null ? O === "number" ? (i === 0 && a.value === "" || a.value != i) && (a.value = "" + wn(i)) : a.value !== "" + wn(i) && (a.value = "" + wn(i)) : O !== "submit" && O !== "reset" || a.removeAttribute("value"), i != null ? Zd(a, O, wn(i)) : l != null ? Zd(a, O, wn(l)) : s != null && a.removeAttribute("value"), p == null && m != null && (a.defaultChecked = !!m), p != null && (a.checked = p && typeof p != "function" && typeof p != "symbol"), D != null && typeof D != "function" && typeof D != "symbol" && typeof D != "boolean" ? a.name = "" + wn(D) : a.removeAttribute("name");
  }
  function rx(a, i, l, s, p, m, O, D) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (a.type = m), i != null || l != null) {
      if (!(m !== "submit" && m !== "reset" || i != null)) {
        Fd(a);
        return;
      }
      l = l != null ? "" + wn(l) : "", i = i != null ? "" + wn(i) : l, D || i === a.value || (a.value = i), a.defaultValue = i;
    }
    s = s ?? p, s = typeof s != "function" && typeof s != "symbol" && !!s, a.checked = D ? a.checked : !!s, a.defaultChecked = !!s, O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" && (a.name = O), Fd(a);
  }
  function Zd(a, i, l) {
    i === "number" && Tc(a.ownerDocument) === a || a.defaultValue === "" + l || (a.defaultValue = "" + l);
  }
  function Ri(a, i, l, s) {
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
  function ax(a, i, l) {
    if (i != null && (i = "" + wn(i), i !== a.value && (a.value = i), l == null)) {
      a.defaultValue !== i && (a.defaultValue = i);
      return;
    }
    a.defaultValue = l != null ? "" + wn(l) : "";
  }
  function ix(a, i, l, s) {
    if (i == null) {
      if (s != null) {
        if (l != null) throw Error(r(92));
        if (K(s)) {
          if (1 < s.length) throw Error(r(93));
          s = s[0];
        }
        l = s;
      }
      l == null && (l = ""), i = l;
    }
    l = wn(i), a.defaultValue = l, s = a.textContent, s === l && s !== "" && s !== null && (a.value = s), Fd(a);
  }
  function $i(a, i) {
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
  function ox(a, i, l) {
    var s = i.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? s ? a.setProperty(i, "") : i === "float" ? a.cssFloat = "" : a[i] = "" : s ? a.setProperty(i, l) : typeof l != "number" || l === 0 || DN.has(i) ? i === "float" ? a.cssFloat = l : a[i] = ("" + l).trim() : a[i] = l + "px";
  }
  function lx(a, i, l) {
    if (i != null && typeof i != "object")
      throw Error(r(62));
    if (a = a.style, l != null) {
      for (var s in l)
        !l.hasOwnProperty(s) || i != null && i.hasOwnProperty(s) || (s.indexOf("--") === 0 ? a.setProperty(s, "") : s === "float" ? a.cssFloat = "" : a[s] = "");
      for (var p in i)
        s = i[p], i.hasOwnProperty(p) && l[p] !== s && ox(a, p, s);
    } else
      for (var m in i)
        i.hasOwnProperty(m) && ox(a, m, i[m]);
  }
  function Qd(a) {
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
  function Ec(a) {
    return NN.test("" + a) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : a;
  }
  function gr() {
  }
  var Jd = null;
  function eh(a) {
    return a = a.target || a.srcElement || window, a.correspondingUseElement && (a = a.correspondingUseElement), a.nodeType === 3 ? a.parentNode : a;
  }
  var zi = null, qi = null;
  function ux(a) {
    var i = Di(a);
    if (i && (a = i.stateNode)) {
      var l = a[Ft] || null;
      e: switch (a = i.stateNode, i.type) {
        case "input":
          if (Wd(
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
                var p = s[Ft] || null;
                if (!p) throw Error(r(90));
                Wd(
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
              s = l[i], s.form === a.form && nx(s);
          }
          break e;
        case "textarea":
          ax(a, l.value, l.defaultValue);
          break e;
        case "select":
          i = l.value, i != null && Ri(a, !!l.multiple, i, !1);
      }
    }
  }
  var th = !1;
  function cx(a, i, l) {
    if (th) return a(i, l);
    th = !0;
    try {
      var s = a(i);
      return s;
    } finally {
      if (th = !1, (zi !== null || qi !== null) && (ps(), zi && (i = zi, a = qi, qi = zi = null, ux(i), a)))
        for (i = 0; i < a.length; i++) ux(a[i]);
    }
  }
  function ml(a, i) {
    var l = a.stateNode;
    if (l === null) return null;
    var s = l[Ft] || null;
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
  var br = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nh = !1;
  if (br)
    try {
      var gl = {};
      Object.defineProperty(gl, "passive", {
        get: function() {
          nh = !0;
        }
      }), window.addEventListener("test", gl, gl), window.removeEventListener("test", gl, gl);
    } catch {
      nh = !1;
    }
  var ea = null, rh = null, jc = null;
  function sx() {
    if (jc) return jc;
    var a, i = rh, l = i.length, s, p = "value" in ea ? ea.value : ea.textContent, m = p.length;
    for (a = 0; a < l && i[a] === p[a]; a++) ;
    var O = l - a;
    for (s = 1; s <= O && i[l - s] === p[m - s]; s++) ;
    return jc = p.slice(a, 1 < s ? 1 - s : void 0);
  }
  function Mc(a) {
    var i = a.keyCode;
    return "charCode" in a ? (a = a.charCode, a === 0 && i === 13 && (a = 13)) : a = i, a === 10 && (a = 13), 32 <= a || a === 13 ? a : 0;
  }
  function Cc() {
    return !0;
  }
  function fx() {
    return !1;
  }
  function Wt(a) {
    function i(l, s, p, m, O) {
      this._reactName = l, this._targetInst = p, this.type = s, this.nativeEvent = m, this.target = O, this.currentTarget = null;
      for (var D in a)
        a.hasOwnProperty(D) && (l = a[D], this[D] = l ? l(m) : m[D]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Cc : fx, this.isPropagationStopped = fx, this;
    }
    return v(i.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Cc);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Cc);
      },
      persist: function() {
      },
      isPersistent: Cc
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
  }, Dc = Wt(Ba), bl = v({}, Ba, { view: 0, detail: 0 }), RN = Wt(bl), ah, ih, xl, Pc = v({}, bl, {
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
    getModifierState: lh,
    button: 0,
    buttons: 0,
    relatedTarget: function(a) {
      return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    },
    movementX: function(a) {
      return "movementX" in a ? a.movementX : (a !== xl && (xl && a.type === "mousemove" ? (ah = a.screenX - xl.screenX, ih = a.screenY - xl.screenY) : ih = ah = 0, xl = a), ah);
    },
    movementY: function(a) {
      return "movementY" in a ? a.movementY : ih;
    }
  }), dx = Wt(Pc), $N = v({}, Pc, { dataTransfer: 0 }), zN = Wt($N), qN = v({}, bl, { relatedTarget: 0 }), oh = Wt(qN), kN = v({}, Ba, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), BN = Wt(kN), LN = v({}, Ba, {
    clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    }
  }), UN = Wt(LN), IN = v({}, Ba, { data: 0 }), hx = Wt(IN), HN = {
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
  function lh() {
    return KN;
  }
  var XN = v({}, bl, {
    key: function(a) {
      if (a.key) {
        var i = HN[a.key] || a.key;
        if (i !== "Unidentified") return i;
      }
      return a.type === "keypress" ? (a = Mc(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? GN[a.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: lh,
    charCode: function(a) {
      return a.type === "keypress" ? Mc(a) : 0;
    },
    keyCode: function(a) {
      return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    },
    which: function(a) {
      return a.type === "keypress" ? Mc(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    }
  }), VN = Wt(XN), FN = v({}, Pc, {
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
  }), px = Wt(FN), WN = v({}, bl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: lh
  }), ZN = Wt(WN), QN = v({}, Ba, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), JN = Wt(QN), eR = v({}, Pc, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), tR = Wt(eR), nR = v({}, Ba, {
    newState: 0,
    oldState: 0
  }), rR = Wt(nR), aR = [9, 13, 27, 32], uh = br && "CompositionEvent" in window, Sl = null;
  br && "documentMode" in document && (Sl = document.documentMode);
  var iR = br && "TextEvent" in window && !Sl, vx = br && (!uh || Sl && 8 < Sl && 11 >= Sl), yx = " ", mx = !1;
  function gx(a, i) {
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
  function bx(a) {
    return a = a.detail, typeof a == "object" && "data" in a ? a.data : null;
  }
  var ki = !1;
  function oR(a, i) {
    switch (a) {
      case "compositionend":
        return bx(i);
      case "keypress":
        return i.which !== 32 ? null : (mx = !0, yx);
      case "textInput":
        return a = i.data, a === yx && mx ? null : a;
      default:
        return null;
    }
  }
  function lR(a, i) {
    if (ki)
      return a === "compositionend" || !uh && gx(a, i) ? (a = sx(), jc = rh = ea = null, ki = !1, a) : null;
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
        return vx && i.locale !== "ko" ? null : i.data;
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
  function xx(a) {
    var i = a && a.nodeName && a.nodeName.toLowerCase();
    return i === "input" ? !!uR[a.type] : i === "textarea";
  }
  function Sx(a, i, l, s) {
    zi ? qi ? qi.push(s) : qi = [s] : zi = s, i = Ss(i, "onChange"), 0 < i.length && (l = new Dc(
      "onChange",
      "change",
      null,
      l,
      s
    ), a.push({ event: l, listeners: i }));
  }
  var _l = null, Ol = null;
  function cR(a) {
    rO(a, 0);
  }
  function Nc(a) {
    var i = yl(a);
    if (nx(i)) return a;
  }
  function _x(a, i) {
    if (a === "change") return i;
  }
  var Ox = !1;
  if (br) {
    var ch;
    if (br) {
      var sh = "oninput" in document;
      if (!sh) {
        var wx = document.createElement("div");
        wx.setAttribute("oninput", "return;"), sh = typeof wx.oninput == "function";
      }
      ch = sh;
    } else ch = !1;
    Ox = ch && (!document.documentMode || 9 < document.documentMode);
  }
  function Ax() {
    _l && (_l.detachEvent("onpropertychange", Tx), Ol = _l = null);
  }
  function Tx(a) {
    if (a.propertyName === "value" && Nc(Ol)) {
      var i = [];
      Sx(
        i,
        Ol,
        a,
        eh(a)
      ), cx(cR, i);
    }
  }
  function sR(a, i, l) {
    a === "focusin" ? (Ax(), _l = i, Ol = l, _l.attachEvent("onpropertychange", Tx)) : a === "focusout" && Ax();
  }
  function fR(a) {
    if (a === "selectionchange" || a === "keyup" || a === "keydown")
      return Nc(Ol);
  }
  function dR(a, i) {
    if (a === "click") return Nc(i);
  }
  function hR(a, i) {
    if (a === "input" || a === "change")
      return Nc(i);
  }
  function pR(a, i) {
    return a === i && (a !== 0 || 1 / a === 1 / i) || a !== a && i !== i;
  }
  var sn = typeof Object.is == "function" ? Object.is : pR;
  function wl(a, i) {
    if (sn(a, i)) return !0;
    if (typeof a != "object" || a === null || typeof i != "object" || i === null)
      return !1;
    var l = Object.keys(a), s = Object.keys(i);
    if (l.length !== s.length) return !1;
    for (s = 0; s < l.length; s++) {
      var p = l[s];
      if (!_n.call(i, p) || !sn(a[p], i[p]))
        return !1;
    }
    return !0;
  }
  function Ex(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function jx(a, i) {
    var l = Ex(a);
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
      l = Ex(l);
    }
  }
  function Mx(a, i) {
    return a && i ? a === i ? !0 : a && a.nodeType === 3 ? !1 : i && i.nodeType === 3 ? Mx(a, i.parentNode) : "contains" in a ? a.contains(i) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function Cx(a) {
    a = a != null && a.ownerDocument != null && a.ownerDocument.defaultView != null ? a.ownerDocument.defaultView : window;
    for (var i = Tc(a.document); i instanceof a.HTMLIFrameElement; ) {
      try {
        var l = typeof i.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) a = i.contentWindow;
      else break;
      i = Tc(a.document);
    }
    return i;
  }
  function fh(a) {
    var i = a && a.nodeName && a.nodeName.toLowerCase();
    return i && (i === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || i === "textarea" || a.contentEditable === "true");
  }
  var vR = br && "documentMode" in document && 11 >= document.documentMode, Bi = null, dh = null, Al = null, hh = !1;
  function Dx(a, i, l) {
    var s = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    hh || Bi == null || Bi !== Tc(s) || (s = Bi, "selectionStart" in s && fh(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), Al && wl(Al, s) || (Al = s, s = Ss(dh, "onSelect"), 0 < s.length && (i = new Dc(
      "onSelect",
      "select",
      null,
      i,
      l
    ), a.push({ event: i, listeners: s }), i.target = Bi)));
  }
  function La(a, i) {
    var l = {};
    return l[a.toLowerCase()] = i.toLowerCase(), l["Webkit" + a] = "webkit" + i, l["Moz" + a] = "moz" + i, l;
  }
  var Li = {
    animationend: La("Animation", "AnimationEnd"),
    animationiteration: La("Animation", "AnimationIteration"),
    animationstart: La("Animation", "AnimationStart"),
    transitionrun: La("Transition", "TransitionRun"),
    transitionstart: La("Transition", "TransitionStart"),
    transitioncancel: La("Transition", "TransitionCancel"),
    transitionend: La("Transition", "TransitionEnd")
  }, ph = {}, Px = {};
  br && (Px = document.createElement("div").style, "AnimationEvent" in window || (delete Li.animationend.animation, delete Li.animationiteration.animation, delete Li.animationstart.animation), "TransitionEvent" in window || delete Li.transitionend.transition);
  function Ua(a) {
    if (ph[a]) return ph[a];
    if (!Li[a]) return a;
    var i = Li[a], l;
    for (l in i)
      if (i.hasOwnProperty(l) && l in Px)
        return ph[a] = i[l];
    return a;
  }
  var Nx = Ua("animationend"), Rx = Ua("animationiteration"), $x = Ua("animationstart"), yR = Ua("transitionrun"), mR = Ua("transitionstart"), gR = Ua("transitioncancel"), zx = Ua("transitionend"), qx = /* @__PURE__ */ new Map(), vh = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  vh.push("scrollEnd");
  function Hn(a, i) {
    qx.set(a, i), ka(i, [a]);
  }
  var Rc = typeof reportError == "function" ? reportError : function(a) {
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
  }, Tn = [], Ui = 0, yh = 0;
  function $c() {
    for (var a = Ui, i = yh = Ui = 0; i < a; ) {
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
      m !== 0 && kx(l, p, m);
    }
  }
  function zc(a, i, l, s) {
    Tn[Ui++] = a, Tn[Ui++] = i, Tn[Ui++] = l, Tn[Ui++] = s, yh |= s, a.lanes |= s, a = a.alternate, a !== null && (a.lanes |= s);
  }
  function mh(a, i, l, s) {
    return zc(a, i, l, s), qc(a);
  }
  function Ia(a, i) {
    return zc(a, null, null, i), qc(a);
  }
  function kx(a, i, l) {
    a.lanes |= l;
    var s = a.alternate;
    s !== null && (s.lanes |= l);
    for (var p = !1, m = a.return; m !== null; )
      m.childLanes |= l, s = m.alternate, s !== null && (s.childLanes |= l), m.tag === 22 && (a = m.stateNode, a === null || a._visibility & 1 || (p = !0)), a = m, m = m.return;
    return a.tag === 3 ? (m = a.stateNode, p && i !== null && (p = 31 - cn(l), a = m.hiddenUpdates, s = a[p], s === null ? a[p] = [i] : s.push(i), i.lane = l | 536870912), m) : null;
  }
  function qc(a) {
    if (50 < Xl)
      throw Xl = 0, Tp = null, Error(r(185));
    for (var i = a.return; i !== null; )
      a = i, i = a.return;
    return a.tag === 3 ? a.stateNode : null;
  }
  var Ii = {};
  function bR(a, i, l, s) {
    this.tag = a, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function fn(a, i, l, s) {
    return new bR(a, i, l, s);
  }
  function gh(a) {
    return a = a.prototype, !(!a || !a.isReactComponent);
  }
  function xr(a, i) {
    var l = a.alternate;
    return l === null ? (l = fn(
      a.tag,
      i,
      a.key,
      a.mode
    ), l.elementType = a.elementType, l.type = a.type, l.stateNode = a.stateNode, l.alternate = a, a.alternate = l) : (l.pendingProps = i, l.type = a.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = a.flags & 65011712, l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, i = a.dependencies, l.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, l.sibling = a.sibling, l.index = a.index, l.ref = a.ref, l.refCleanup = a.refCleanup, l;
  }
  function Bx(a, i) {
    a.flags &= 65011714;
    var l = a.alternate;
    return l === null ? (a.childLanes = 0, a.lanes = i, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, a.type = l.type, i = l.dependencies, a.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
    }), a;
  }
  function kc(a, i, l, s, p, m) {
    var O = 0;
    if (s = a, typeof a == "function") gh(a) && (O = 1);
    else if (typeof a == "string")
      O = w3(
        a,
        l,
        se.current
      ) ? 26 : a === "html" || a === "head" || a === "body" ? 27 : 5;
    else
      e: switch (a) {
        case z:
          return a = fn(31, l, i, p), a.elementType = z, a.lanes = m, a;
        case S:
          return Ha(l.children, p, m, i);
        case x:
          O = 8, p |= 24;
          break;
        case T:
          return a = fn(12, l, i, p | 2), a.elementType = T, a.lanes = m, a;
        case w:
          return a = fn(13, l, i, p), a.elementType = w, a.lanes = m, a;
        case A:
          return a = fn(19, l, i, p), a.elementType = A, a.lanes = m, a;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case C:
                O = 10;
                break e;
              case E:
                O = 9;
                break e;
              case j:
                O = 11;
                break e;
              case M:
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
    return i = fn(O, l, i, p), i.elementType = a, i.type = s, i.lanes = m, i;
  }
  function Ha(a, i, l, s) {
    return a = fn(7, a, s, i), a.lanes = l, a;
  }
  function bh(a, i, l) {
    return a = fn(6, a, null, i), a.lanes = l, a;
  }
  function Lx(a) {
    var i = fn(18, null, null, 0);
    return i.stateNode = a, i;
  }
  function xh(a, i, l) {
    return i = fn(
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
  var Ux = /* @__PURE__ */ new WeakMap();
  function En(a, i) {
    if (typeof a == "object" && a !== null) {
      var l = Ux.get(a);
      return l !== void 0 ? l : (i = {
        value: a,
        source: i,
        stack: on(i)
      }, Ux.set(a, i), i);
    }
    return {
      value: a,
      source: i,
      stack: on(i)
    };
  }
  var Hi = [], Gi = 0, Bc = null, Tl = 0, jn = [], Mn = 0, ta = null, er = 1, tr = "";
  function Sr(a, i) {
    Hi[Gi++] = Tl, Hi[Gi++] = Bc, Bc = a, Tl = i;
  }
  function Ix(a, i, l) {
    jn[Mn++] = er, jn[Mn++] = tr, jn[Mn++] = ta, ta = a;
    var s = er;
    a = tr;
    var p = 32 - cn(s) - 1;
    s &= ~(1 << p), l += 1;
    var m = 32 - cn(i) + p;
    if (30 < m) {
      var O = p - p % 5;
      m = (s & (1 << O) - 1).toString(32), s >>= O, p -= O, er = 1 << 32 - cn(i) + p | l << p | s, tr = m + a;
    } else
      er = 1 << m | l << p | s, tr = a;
  }
  function Sh(a) {
    a.return !== null && (Sr(a, 1), Ix(a, 1, 0));
  }
  function _h(a) {
    for (; a === Bc; )
      Bc = Hi[--Gi], Hi[Gi] = null, Tl = Hi[--Gi], Hi[Gi] = null;
    for (; a === ta; )
      ta = jn[--Mn], jn[Mn] = null, tr = jn[--Mn], jn[Mn] = null, er = jn[--Mn], jn[Mn] = null;
  }
  function Hx(a, i) {
    jn[Mn++] = er, jn[Mn++] = tr, jn[Mn++] = ta, er = i.id, tr = i.overflow, ta = a;
  }
  var Rt = null, rt = null, qe = !1, na = null, Cn = !1, Oh = Error(r(519));
  function ra(a) {
    var i = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw El(En(i, a)), Oh;
  }
  function Gx(a) {
    var i = a.stateNode, l = a.type, s = a.memoizedProps;
    switch (i[Nt] = a, i[Ft] = s, l) {
      case "dialog":
        Ne("cancel", i), Ne("close", i);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ne("load", i);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Fl.length; l++)
          Ne(Fl[l], i);
        break;
      case "source":
        Ne("error", i);
        break;
      case "img":
      case "image":
      case "link":
        Ne("error", i), Ne("load", i);
        break;
      case "details":
        Ne("toggle", i);
        break;
      case "input":
        Ne("invalid", i), rx(
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
        Ne("invalid", i);
        break;
      case "textarea":
        Ne("invalid", i), ix(i, s.value, s.defaultValue, s.children);
    }
    l = s.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || i.textContent === "" + l || s.suppressHydrationWarning === !0 || lO(i.textContent, l) ? (s.popover != null && (Ne("beforetoggle", i), Ne("toggle", i)), s.onScroll != null && Ne("scroll", i), s.onScrollEnd != null && Ne("scrollend", i), s.onClick != null && (i.onclick = gr), i = !0) : i = !1, i || ra(a, !0);
  }
  function Yx(a) {
    for (Rt = a.return; Rt; )
      switch (Rt.tag) {
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
          Rt = Rt.return;
      }
  }
  function Yi(a) {
    if (a !== Rt) return !1;
    if (!qe) return Yx(a), qe = !0, !1;
    var i = a.tag, l;
    if ((l = i !== 3 && i !== 27) && ((l = i === 5) && (l = a.type, l = !(l !== "form" && l !== "button") || Up(a.type, a.memoizedProps)), l = !l), l && rt && ra(a), Yx(a), i === 13) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
      rt = yO(a);
    } else if (i === 31) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
      rt = yO(a);
    } else
      i === 27 ? (i = rt, ma(a.type) ? (a = Kp, Kp = null, rt = a) : rt = i) : rt = Rt ? Pn(a.stateNode.nextSibling) : null;
    return !0;
  }
  function Ga() {
    rt = Rt = null, qe = !1;
  }
  function wh() {
    var a = na;
    return a !== null && (en === null ? en = a : en.push.apply(
      en,
      a
    ), na = null), a;
  }
  function El(a) {
    na === null ? na = [a] : na.push(a);
  }
  var Ah = P(null), Ya = null, _r = null;
  function aa(a, i, l) {
    re(Ah, i._currentValue), i._currentValue = l;
  }
  function Or(a) {
    a._currentValue = Ah.current, U(Ah);
  }
  function Th(a, i, l) {
    for (; a !== null; ) {
      var s = a.alternate;
      if ((a.childLanes & i) !== i ? (a.childLanes |= i, s !== null && (s.childLanes |= i)) : s !== null && (s.childLanes & i) !== i && (s.childLanes |= i), a === l) break;
      a = a.return;
    }
  }
  function Eh(a, i, l, s) {
    var p = a.child;
    for (p !== null && (p.return = a); p !== null; ) {
      var m = p.dependencies;
      if (m !== null) {
        var O = p.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var D = m;
          m = p;
          for (var q = 0; q < i.length; q++)
            if (D.context === i[q]) {
              m.lanes |= l, D = m.alternate, D !== null && (D.lanes |= l), Th(
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
        O.lanes |= l, m = O.alternate, m !== null && (m.lanes |= l), Th(O, l, a), O = null;
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
  function Ki(a, i, l, s) {
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
          sn(p.pendingProps.value, O.value) || (a !== null ? a.push(D) : a = [D]);
        }
      } else if (p === de.current) {
        if (O = p.alternate, O === null) throw Error(r(387));
        O.memoizedState.memoizedState !== p.memoizedState.memoizedState && (a !== null ? a.push(eu) : a = [eu]);
      }
      p = p.return;
    }
    a !== null && Eh(
      i,
      a,
      l,
      s
    ), i.flags |= 262144;
  }
  function Lc(a) {
    for (a = a.firstContext; a !== null; ) {
      if (!sn(
        a.context._currentValue,
        a.memoizedValue
      ))
        return !0;
      a = a.next;
    }
    return !1;
  }
  function Ka(a) {
    Ya = a, _r = null, a = a.dependencies, a !== null && (a.firstContext = null);
  }
  function $t(a) {
    return Kx(Ya, a);
  }
  function Uc(a, i) {
    return Ya === null && Ka(a), Kx(a, i);
  }
  function Kx(a, i) {
    var l = i._currentValue;
    if (i = { context: i, memoizedValue: l, next: null }, _r === null) {
      if (a === null) throw Error(r(308));
      _r = i, a.dependencies = { lanes: 0, firstContext: i }, a.flags |= 524288;
    } else _r = _r.next = i;
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
  }, SR = e.unstable_scheduleCallback, _R = e.unstable_NormalPriority, yt = {
    $$typeof: C,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function jh() {
    return {
      controller: new xR(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function jl(a) {
    a.refCount--, a.refCount === 0 && SR(_R, function() {
      a.controller.abort();
    });
  }
  var Ml = null, Mh = 0, Xi = 0, Vi = null;
  function OR(a, i) {
    if (Ml === null) {
      var l = Ml = [];
      Mh = 0, Xi = Pp(), Vi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          l.push(s);
        }
      };
    }
    return Mh++, i.then(Xx, Xx), i;
  }
  function Xx() {
    if (--Mh === 0 && Ml !== null) {
      Vi !== null && (Vi.status = "fulfilled");
      var a = Ml;
      Ml = null, Xi = 0, Vi = null;
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
  var Vx = R.S;
  R.S = function(a, i) {
    D_ = _t(), typeof i == "object" && i !== null && typeof i.then == "function" && OR(a, i), Vx !== null && Vx(a, i);
  };
  var Xa = P(null);
  function Ch() {
    var a = Xa.current;
    return a !== null ? a : Je.pooledCache;
  }
  function Ic(a, i) {
    i === null ? re(Xa, Xa.current) : re(Xa, i.pool);
  }
  function Fx() {
    var a = Ch();
    return a === null ? null : { parent: yt._currentValue, pool: a };
  }
  var Fi = Error(r(460)), Dh = Error(r(474)), Hc = Error(r(542)), Gc = { then: function() {
  } };
  function Wx(a) {
    return a = a.status, a === "fulfilled" || a === "rejected";
  }
  function Zx(a, i, l) {
    switch (l = a[l], l === void 0 ? a.push(i) : l !== i && (i.then(gr, gr), i = l), i.status) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw a = i.reason, Jx(a), a;
      default:
        if (typeof i.status == "string") i.then(gr, gr);
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
            throw a = i.reason, Jx(a), a;
        }
        throw Fa = i, Fi;
    }
  }
  function Va(a) {
    try {
      var i = a._init;
      return i(a._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Fa = l, Fi) : l;
    }
  }
  var Fa = null;
  function Qx() {
    if (Fa === null) throw Error(r(459));
    var a = Fa;
    return Fa = null, a;
  }
  function Jx(a) {
    if (a === Fi || a === Hc)
      throw Error(r(483));
  }
  var Wi = null, Cl = 0;
  function Yc(a) {
    var i = Cl;
    return Cl += 1, Wi === null && (Wi = []), Zx(Wi, a, i);
  }
  function Dl(a, i) {
    i = i.props.ref, a.ref = i !== void 0 ? i : null;
  }
  function Kc(a, i) {
    throw i.$$typeof === g ? Error(r(525)) : (a = Object.prototype.toString.call(i), Error(
      r(
        31,
        a === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : a
      )
    ));
  }
  function eS(a) {
    function i(X, H) {
      if (a) {
        var F = X.deletions;
        F === null ? (X.deletions = [H], X.flags |= 16) : F.push(H);
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
      return X = xr(X, H), X.index = 0, X.sibling = null, X;
    }
    function m(X, H, F) {
      return X.index = F, a ? (F = X.alternate, F !== null ? (F = F.index, F < H ? (X.flags |= 67108866, H) : F) : (X.flags |= 67108866, H)) : (X.flags |= 1048576, H);
    }
    function O(X) {
      return a && X.alternate === null && (X.flags |= 67108866), X;
    }
    function D(X, H, F, le) {
      return H === null || H.tag !== 6 ? (H = bh(F, X.mode, le), H.return = X, H) : (H = p(H, F), H.return = X, H);
    }
    function q(X, H, F, le) {
      var be = F.type;
      return be === S ? ie(
        X,
        H,
        F.props.children,
        le,
        F.key
      ) : H !== null && (H.elementType === be || typeof be == "object" && be !== null && be.$$typeof === N && Va(be) === H.type) ? (H = p(H, F.props), Dl(H, F), H.return = X, H) : (H = kc(
        F.type,
        F.key,
        F.props,
        null,
        X.mode,
        le
      ), Dl(H, F), H.return = X, H);
    }
    function W(X, H, F, le) {
      return H === null || H.tag !== 4 || H.stateNode.containerInfo !== F.containerInfo || H.stateNode.implementation !== F.implementation ? (H = xh(F, X.mode, le), H.return = X, H) : (H = p(H, F.children || []), H.return = X, H);
    }
    function ie(X, H, F, le, be) {
      return H === null || H.tag !== 7 ? (H = Ha(
        F,
        X.mode,
        le,
        be
      ), H.return = X, H) : (H = p(H, F), H.return = X, H);
    }
    function ue(X, H, F) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return H = bh(
          "" + H,
          X.mode,
          F
        ), H.return = X, H;
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case b:
            return F = kc(
              H.type,
              H.key,
              H.props,
              null,
              X.mode,
              F
            ), Dl(F, H), F.return = X, F;
          case _:
            return H = xh(
              H,
              X.mode,
              F
            ), H.return = X, H;
          case N:
            return H = Va(H), ue(X, H, F);
        }
        if (K(H) || k(H))
          return H = Ha(
            H,
            X.mode,
            F,
            null
          ), H.return = X, H;
        if (typeof H.then == "function")
          return ue(X, Yc(H), F);
        if (H.$$typeof === C)
          return ue(
            X,
            Uc(X, H),
            F
          );
        Kc(X, H);
      }
      return null;
    }
    function Z(X, H, F, le) {
      var be = H !== null ? H.key : null;
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return be !== null ? null : D(X, H, "" + F, le);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case b:
            return F.key === be ? q(X, H, F, le) : null;
          case _:
            return F.key === be ? W(X, H, F, le) : null;
          case N:
            return F = Va(F), Z(X, H, F, le);
        }
        if (K(F) || k(F))
          return be !== null ? null : ie(X, H, F, le, null);
        if (typeof F.then == "function")
          return Z(
            X,
            H,
            Yc(F),
            le
          );
        if (F.$$typeof === C)
          return Z(
            X,
            H,
            Uc(X, F),
            le
          );
        Kc(X, F);
      }
      return null;
    }
    function ne(X, H, F, le, be) {
      if (typeof le == "string" && le !== "" || typeof le == "number" || typeof le == "bigint")
        return X = X.get(F) || null, D(H, X, "" + le, be);
      if (typeof le == "object" && le !== null) {
        switch (le.$$typeof) {
          case b:
            return X = X.get(
              le.key === null ? F : le.key
            ) || null, q(H, X, le, be);
          case _:
            return X = X.get(
              le.key === null ? F : le.key
            ) || null, W(H, X, le, be);
          case N:
            return le = Va(le), ne(
              X,
              H,
              F,
              le,
              be
            );
        }
        if (K(le) || k(le))
          return X = X.get(F) || null, ie(H, X, le, be, null);
        if (typeof le.then == "function")
          return ne(
            X,
            H,
            F,
            Yc(le),
            be
          );
        if (le.$$typeof === C)
          return ne(
            X,
            H,
            F,
            Uc(H, le),
            be
          );
        Kc(H, le);
      }
      return null;
    }
    function ve(X, H, F, le) {
      for (var be = null, Be = null, me = H, Me = H = 0, $e = null; me !== null && Me < F.length; Me++) {
        me.index > Me ? ($e = me, me = null) : $e = me.sibling;
        var Le = Z(
          X,
          me,
          F[Me],
          le
        );
        if (Le === null) {
          me === null && (me = $e);
          break;
        }
        a && me && Le.alternate === null && i(X, me), H = m(Le, H, Me), Be === null ? be = Le : Be.sibling = Le, Be = Le, me = $e;
      }
      if (Me === F.length)
        return l(X, me), qe && Sr(X, Me), be;
      if (me === null) {
        for (; Me < F.length; Me++)
          me = ue(X, F[Me], le), me !== null && (H = m(
            me,
            H,
            Me
          ), Be === null ? be = me : Be.sibling = me, Be = me);
        return qe && Sr(X, Me), be;
      }
      for (me = s(me); Me < F.length; Me++)
        $e = ne(
          me,
          X,
          Me,
          F[Me],
          le
        ), $e !== null && (a && $e.alternate !== null && me.delete(
          $e.key === null ? Me : $e.key
        ), H = m(
          $e,
          H,
          Me
        ), Be === null ? be = $e : Be.sibling = $e, Be = $e);
      return a && me.forEach(function(_a) {
        return i(X, _a);
      }), qe && Sr(X, Me), be;
    }
    function Se(X, H, F, le) {
      if (F == null) throw Error(r(151));
      for (var be = null, Be = null, me = H, Me = H = 0, $e = null, Le = F.next(); me !== null && !Le.done; Me++, Le = F.next()) {
        me.index > Me ? ($e = me, me = null) : $e = me.sibling;
        var _a = Z(X, me, Le.value, le);
        if (_a === null) {
          me === null && (me = $e);
          break;
        }
        a && me && _a.alternate === null && i(X, me), H = m(_a, H, Me), Be === null ? be = _a : Be.sibling = _a, Be = _a, me = $e;
      }
      if (Le.done)
        return l(X, me), qe && Sr(X, Me), be;
      if (me === null) {
        for (; !Le.done; Me++, Le = F.next())
          Le = ue(X, Le.value, le), Le !== null && (H = m(Le, H, Me), Be === null ? be = Le : Be.sibling = Le, Be = Le);
        return qe && Sr(X, Me), be;
      }
      for (me = s(me); !Le.done; Me++, Le = F.next())
        Le = ne(me, X, Me, Le.value, le), Le !== null && (a && Le.alternate !== null && me.delete(Le.key === null ? Me : Le.key), H = m(Le, H, Me), Be === null ? be = Le : Be.sibling = Le, Be = Le);
      return a && me.forEach(function($3) {
        return i(X, $3);
      }), qe && Sr(X, Me), be;
    }
    function We(X, H, F, le) {
      if (typeof F == "object" && F !== null && F.type === S && F.key === null && (F = F.props.children), typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case b:
            e: {
              for (var be = F.key; H !== null; ) {
                if (H.key === be) {
                  if (be = F.type, be === S) {
                    if (H.tag === 7) {
                      l(
                        X,
                        H.sibling
                      ), le = p(
                        H,
                        F.props.children
                      ), le.return = X, X = le;
                      break e;
                    }
                  } else if (H.elementType === be || typeof be == "object" && be !== null && be.$$typeof === N && Va(be) === H.type) {
                    l(
                      X,
                      H.sibling
                    ), le = p(H, F.props), Dl(le, F), le.return = X, X = le;
                    break e;
                  }
                  l(X, H);
                  break;
                } else i(X, H);
                H = H.sibling;
              }
              F.type === S ? (le = Ha(
                F.props.children,
                X.mode,
                le,
                F.key
              ), le.return = X, X = le) : (le = kc(
                F.type,
                F.key,
                F.props,
                null,
                X.mode,
                le
              ), Dl(le, F), le.return = X, X = le);
            }
            return O(X);
          case _:
            e: {
              for (be = F.key; H !== null; ) {
                if (H.key === be)
                  if (H.tag === 4 && H.stateNode.containerInfo === F.containerInfo && H.stateNode.implementation === F.implementation) {
                    l(
                      X,
                      H.sibling
                    ), le = p(H, F.children || []), le.return = X, X = le;
                    break e;
                  } else {
                    l(X, H);
                    break;
                  }
                else i(X, H);
                H = H.sibling;
              }
              le = xh(F, X.mode, le), le.return = X, X = le;
            }
            return O(X);
          case N:
            return F = Va(F), We(
              X,
              H,
              F,
              le
            );
        }
        if (K(F))
          return ve(
            X,
            H,
            F,
            le
          );
        if (k(F)) {
          if (be = k(F), typeof be != "function") throw Error(r(150));
          return F = be.call(F), Se(
            X,
            H,
            F,
            le
          );
        }
        if (typeof F.then == "function")
          return We(
            X,
            H,
            Yc(F),
            le
          );
        if (F.$$typeof === C)
          return We(
            X,
            H,
            Uc(X, F),
            le
          );
        Kc(X, F);
      }
      return typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint" ? (F = "" + F, H !== null && H.tag === 6 ? (l(X, H.sibling), le = p(H, F), le.return = X, X = le) : (l(X, H), le = bh(F, X.mode, le), le.return = X, X = le), O(X)) : l(X, H);
    }
    return function(X, H, F, le) {
      try {
        Cl = 0;
        var be = We(
          X,
          H,
          F,
          le
        );
        return Wi = null, be;
      } catch (me) {
        if (me === Fi || me === Hc) throw me;
        var Be = fn(29, me, null, X.mode);
        return Be.lanes = le, Be.return = X, Be;
      } finally {
      }
    };
  }
  var Wa = eS(!0), tS = eS(!1), ia = !1;
  function Ph(a) {
    a.updateQueue = {
      baseState: a.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Nh(a, i) {
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
    if (s = s.shared, (Ie & 2) !== 0) {
      var p = s.pending;
      return p === null ? i.next = i : (i.next = p.next, p.next = i), s.pending = i, i = qc(a), kx(a, null, l), i;
    }
    return zc(a, s, i, l), qc(a);
  }
  function Pl(a, i, l) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (l & 4194048) !== 0)) {
      var s = i.lanes;
      s &= a.pendingLanes, l |= s, i.lanes = l, K1(a, l);
    }
  }
  function Rh(a, i) {
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
  var $h = !1;
  function Nl() {
    if ($h) {
      var a = Vi;
      if (a !== null) throw a;
    }
  }
  function Rl(a, i, l, s) {
    $h = !1;
    var p = a.updateQueue;
    ia = !1;
    var m = p.firstBaseUpdate, O = p.lastBaseUpdate, D = p.shared.pending;
    if (D !== null) {
      p.shared.pending = null;
      var q = D, W = q.next;
      q.next = null, O === null ? m = W : O.next = W, O = q;
      var ie = a.alternate;
      ie !== null && (ie = ie.updateQueue, D = ie.lastBaseUpdate, D !== O && (D === null ? ie.firstBaseUpdate = W : D.next = W, ie.lastBaseUpdate = q));
    }
    if (m !== null) {
      var ue = p.baseState;
      O = 0, ie = W = q = null, D = m;
      do {
        var Z = D.lane & -536870913, ne = Z !== D.lane;
        if (ne ? (Re & Z) === Z : (s & Z) === Z) {
          Z !== 0 && Z === Xi && ($h = !0), ie !== null && (ie = ie.next = {
            lane: 0,
            tag: D.tag,
            payload: D.payload,
            callback: null,
            next: null
          });
          e: {
            var ve = a, Se = D;
            Z = i;
            var We = l;
            switch (Se.tag) {
              case 1:
                if (ve = Se.payload, typeof ve == "function") {
                  ue = ve.call(We, ue, Z);
                  break e;
                }
                ue = ve;
                break e;
              case 3:
                ve.flags = ve.flags & -65537 | 128;
              case 0:
                if (ve = Se.payload, Z = typeof ve == "function" ? ve.call(We, ue, Z) : ve, Z == null) break e;
                ue = v({}, ue, Z);
                break e;
              case 2:
                ia = !0;
            }
          }
          Z = D.callback, Z !== null && (a.flags |= 64, ne && (a.flags |= 8192), ne = p.callbacks, ne === null ? p.callbacks = [Z] : ne.push(Z));
        } else
          ne = {
            lane: Z,
            tag: D.tag,
            payload: D.payload,
            callback: D.callback,
            next: null
          }, ie === null ? (W = ie = ne, q = ue) : ie = ie.next = ne, O |= Z;
        if (D = D.next, D === null) {
          if (D = p.shared.pending, D === null)
            break;
          ne = D, D = ne.next, ne.next = null, p.lastBaseUpdate = ne, p.shared.pending = null;
        }
      } while (!0);
      ie === null && (q = ue), p.baseState = q, p.firstBaseUpdate = W, p.lastBaseUpdate = ie, m === null && (p.shared.lanes = 0), da |= O, a.lanes = O, a.memoizedState = ue;
    }
  }
  function nS(a, i) {
    if (typeof a != "function")
      throw Error(r(191, a));
    a.call(i);
  }
  function rS(a, i) {
    var l = a.callbacks;
    if (l !== null)
      for (a.callbacks = null, a = 0; a < l.length; a++)
        nS(l[a], i);
  }
  var Zi = P(null), Xc = P(0);
  function aS(a, i) {
    a = Pr, re(Xc, a), re(Zi, i), Pr = a | i.baseLanes;
  }
  function zh() {
    re(Xc, Pr), re(Zi, Zi.current);
  }
  function qh() {
    Pr = Xc.current, U(Zi), U(Xc);
  }
  var dn = P(null), Dn = null;
  function ua(a) {
    var i = a.alternate;
    re(ht, ht.current & 1), re(dn, a), Dn === null && (i === null || Zi.current !== null || i.memoizedState !== null) && (Dn = a);
  }
  function kh(a) {
    re(ht, ht.current), re(dn, a), Dn === null && (Dn = a);
  }
  function iS(a) {
    a.tag === 22 ? (re(ht, ht.current), re(dn, a), Dn === null && (Dn = a)) : ca();
  }
  function ca() {
    re(ht, ht.current), re(dn, dn.current);
  }
  function hn(a) {
    U(dn), Dn === a && (Dn = null), U(ht);
  }
  var ht = P(0);
  function Vc(a) {
    for (var i = a; i !== null; ) {
      if (i.tag === 13) {
        var l = i.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Gp(l) || Yp(l)))
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
  var wr = 0, je = null, Ve = null, mt = null, Fc = !1, Qi = !1, Za = !1, Wc = 0, $l = 0, Ji = null, AR = 0;
  function st() {
    throw Error(r(321));
  }
  function Bh(a, i) {
    if (i === null) return !1;
    for (var l = 0; l < i.length && l < a.length; l++)
      if (!sn(a[l], i[l])) return !1;
    return !0;
  }
  function Lh(a, i, l, s, p, m) {
    return wr = m, je = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, R.H = a === null || a.memoizedState === null ? IS : tp, Za = !1, m = l(s, p), Za = !1, Qi && (m = lS(
      i,
      l,
      s,
      p
    )), oS(a), m;
  }
  function oS(a) {
    R.H = kl;
    var i = Ve !== null && Ve.next !== null;
    if (wr = 0, mt = Ve = je = null, Fc = !1, $l = 0, Ji = null, i) throw Error(r(300));
    a === null || gt || (a = a.dependencies, a !== null && Lc(a) && (gt = !0));
  }
  function lS(a, i, l, s) {
    je = a;
    var p = 0;
    do {
      if (Qi && (Ji = null), $l = 0, Qi = !1, 25 <= p) throw Error(r(301));
      if (p += 1, mt = Ve = null, a.updateQueue != null) {
        var m = a.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      R.H = HS, m = i(l, s);
    } while (Qi);
    return m;
  }
  function TR() {
    var a = R.H, i = a.useState()[0];
    return i = typeof i.then == "function" ? zl(i) : i, a = a.useState()[0], (Ve !== null ? Ve.memoizedState : null) !== a && (je.flags |= 1024), i;
  }
  function Uh() {
    var a = Wc !== 0;
    return Wc = 0, a;
  }
  function Ih(a, i, l) {
    i.updateQueue = a.updateQueue, i.flags &= -2053, a.lanes &= ~l;
  }
  function Hh(a) {
    if (Fc) {
      for (a = a.memoizedState; a !== null; ) {
        var i = a.queue;
        i !== null && (i.pending = null), a = a.next;
      }
      Fc = !1;
    }
    wr = 0, mt = Ve = je = null, Qi = !1, $l = Wc = 0, Ji = null;
  }
  function Xt() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return mt === null ? je.memoizedState = mt = a : mt = mt.next = a, mt;
  }
  function pt() {
    if (Ve === null) {
      var a = je.alternate;
      a = a !== null ? a.memoizedState : null;
    } else a = Ve.next;
    var i = mt === null ? je.memoizedState : mt.next;
    if (i !== null)
      mt = i, Ve = a;
    else {
      if (a === null)
        throw je.alternate === null ? Error(r(467)) : Error(r(310));
      Ve = a, a = {
        memoizedState: Ve.memoizedState,
        baseState: Ve.baseState,
        baseQueue: Ve.baseQueue,
        queue: Ve.queue,
        next: null
      }, mt === null ? je.memoizedState = mt = a : mt = mt.next = a;
    }
    return mt;
  }
  function Zc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function zl(a) {
    var i = $l;
    return $l += 1, Ji === null && (Ji = []), a = Zx(Ji, a, i), i = je, (mt === null ? i.memoizedState : mt.next) === null && (i = i.alternate, R.H = i === null || i.memoizedState === null ? IS : tp), a;
  }
  function Qc(a) {
    if (a !== null && typeof a == "object") {
      if (typeof a.then == "function") return zl(a);
      if (a.$$typeof === C) return $t(a);
    }
    throw Error(r(438, String(a)));
  }
  function Gh(a) {
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
    if (i == null && (i = { data: [], index: 0 }), l === null && (l = Zc(), je.updateQueue = l), l.memoCache = i, l = i.data[i.index], l === void 0)
      for (l = i.data[i.index] = Array(a), s = 0; s < a; s++)
        l[s] = I;
    return i.index++, l;
  }
  function Ar(a, i) {
    return typeof i == "function" ? i(a) : i;
  }
  function Jc(a) {
    var i = pt();
    return Yh(i, Ve, a);
  }
  function Yh(a, i, l) {
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
      var D = O = null, q = null, W = i, ie = !1;
      do {
        var ue = W.lane & -536870913;
        if (ue !== W.lane ? (Re & ue) === ue : (wr & ue) === ue) {
          var Z = W.revertLane;
          if (Z === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: W.action,
              hasEagerState: W.hasEagerState,
              eagerState: W.eagerState,
              next: null
            }), ue === Xi && (ie = !0);
          else if ((wr & Z) === Z) {
            W = W.next, Z === Xi && (ie = !0);
            continue;
          } else
            ue = {
              lane: 0,
              revertLane: W.revertLane,
              gesture: null,
              action: W.action,
              hasEagerState: W.hasEagerState,
              eagerState: W.eagerState,
              next: null
            }, q === null ? (D = q = ue, O = m) : q = q.next = ue, je.lanes |= Z, da |= Z;
          ue = W.action, Za && l(m, ue), m = W.hasEagerState ? W.eagerState : l(m, ue);
        } else
          Z = {
            lane: ue,
            revertLane: W.revertLane,
            gesture: W.gesture,
            action: W.action,
            hasEagerState: W.hasEagerState,
            eagerState: W.eagerState,
            next: null
          }, q === null ? (D = q = Z, O = m) : q = q.next = Z, je.lanes |= ue, da |= ue;
        W = W.next;
      } while (W !== null && W !== i);
      if (q === null ? O = m : q.next = D, !sn(m, a.memoizedState) && (gt = !0, ie && (l = Vi, l !== null)))
        throw l;
      a.memoizedState = m, a.baseState = O, a.baseQueue = q, s.lastRenderedState = m;
    }
    return p === null && (s.lanes = 0), [a.memoizedState, s.dispatch];
  }
  function Kh(a) {
    var i = pt(), l = i.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = a;
    var s = l.dispatch, p = l.pending, m = i.memoizedState;
    if (p !== null) {
      l.pending = null;
      var O = p = p.next;
      do
        m = a(m, O.action), O = O.next;
      while (O !== p);
      sn(m, i.memoizedState) || (gt = !0), i.memoizedState = m, i.baseQueue === null && (i.baseState = m), l.lastRenderedState = m;
    }
    return [m, s];
  }
  function uS(a, i, l) {
    var s = je, p = pt(), m = qe;
    if (m) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = i();
    var O = !sn(
      (Ve || p).memoizedState,
      l
    );
    if (O && (p.memoizedState = l, gt = !0), p = p.queue, Fh(fS.bind(null, s, p, a), [
      a
    ]), p.getSnapshot !== i || O || mt !== null && mt.memoizedState.tag & 1) {
      if (s.flags |= 2048, eo(
        9,
        { destroy: void 0 },
        sS.bind(
          null,
          s,
          p,
          l,
          i
        ),
        null
      ), Je === null) throw Error(r(349));
      m || (wr & 127) !== 0 || cS(s, i, l);
    }
    return l;
  }
  function cS(a, i, l) {
    a.flags |= 16384, a = { getSnapshot: i, value: l }, i = je.updateQueue, i === null ? (i = Zc(), je.updateQueue = i, i.stores = [a]) : (l = i.stores, l === null ? i.stores = [a] : l.push(a));
  }
  function sS(a, i, l, s) {
    i.value = l, i.getSnapshot = s, dS(i) && hS(a);
  }
  function fS(a, i, l) {
    return l(function() {
      dS(i) && hS(a);
    });
  }
  function dS(a) {
    var i = a.getSnapshot;
    a = a.value;
    try {
      var l = i();
      return !sn(a, l);
    } catch {
      return !0;
    }
  }
  function hS(a) {
    var i = Ia(a, 2);
    i !== null && tn(i, a, 2);
  }
  function Xh(a) {
    var i = Xt();
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
      lastRenderedReducer: Ar,
      lastRenderedState: a
    }, i;
  }
  function pS(a, i, l, s) {
    return a.baseState = l, Yh(
      a,
      Ve,
      typeof s == "function" ? s : Ar
    );
  }
  function ER(a, i, l, s, p) {
    if (ns(a)) throw Error(r(485));
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
      R.T !== null ? l(!0) : m.isTransition = !1, s(m), l = i.pending, l === null ? (m.next = i.pending = m, vS(i, m)) : (m.next = l.next, i.pending = l.next = m);
    }
  }
  function vS(a, i) {
    var l = i.action, s = i.payload, p = a.state;
    if (i.isTransition) {
      var m = R.T, O = {};
      R.T = O;
      try {
        var D = l(p, s), q = R.S;
        q !== null && q(O, D), yS(a, i, D);
      } catch (W) {
        Vh(a, i, W);
      } finally {
        m !== null && O.types !== null && (m.types = O.types), R.T = m;
      }
    } else
      try {
        m = l(p, s), yS(a, i, m);
      } catch (W) {
        Vh(a, i, W);
      }
  }
  function yS(a, i, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(s) {
        mS(a, i, s);
      },
      function(s) {
        return Vh(a, i, s);
      }
    ) : mS(a, i, l);
  }
  function mS(a, i, l) {
    i.status = "fulfilled", i.value = l, gS(i), a.state = l, i = a.pending, i !== null && (l = i.next, l === i ? a.pending = null : (l = l.next, i.next = l, vS(a, l)));
  }
  function Vh(a, i, l) {
    var s = a.pending;
    if (a.pending = null, s !== null) {
      s = s.next;
      do
        i.status = "rejected", i.reason = l, gS(i), i = i.next;
      while (i !== s);
    }
    a.action = null;
  }
  function gS(a) {
    a = a.listeners;
    for (var i = 0; i < a.length; i++) (0, a[i])();
  }
  function bS(a, i) {
    return i;
  }
  function xS(a, i) {
    if (qe) {
      var l = Je.formState;
      if (l !== null) {
        e: {
          var s = je;
          if (qe) {
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
    return l = Xt(), l.memoizedState = l.baseState = i, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bS,
      lastRenderedState: i
    }, l.queue = s, l = BS.bind(
      null,
      je,
      s
    ), s.dispatch = l, s = Xh(!1), m = ep.bind(
      null,
      je,
      !1,
      s.queue
    ), s = Xt(), p = {
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
  function SS(a) {
    var i = pt();
    return _S(i, Ve, a);
  }
  function _S(a, i, l) {
    if (i = Yh(
      a,
      i,
      bS
    )[0], a = Jc(Ar)[0], typeof i == "object" && i !== null && typeof i.then == "function")
      try {
        var s = zl(i);
      } catch (O) {
        throw O === Fi ? Hc : O;
      }
    else s = i;
    i = pt();
    var p = i.queue, m = p.dispatch;
    return l !== i.memoizedState && (je.flags |= 2048, eo(
      9,
      { destroy: void 0 },
      jR.bind(null, p, l),
      null
    )), [s, m, a];
  }
  function jR(a, i) {
    a.action = i;
  }
  function OS(a) {
    var i = pt(), l = Ve;
    if (l !== null)
      return _S(i, l, a);
    pt(), i = i.memoizedState, l = pt();
    var s = l.queue.dispatch;
    return l.memoizedState = a, [i, s, !1];
  }
  function eo(a, i, l, s) {
    return a = { tag: a, create: l, deps: s, inst: i, next: null }, i = je.updateQueue, i === null && (i = Zc(), je.updateQueue = i), l = i.lastEffect, l === null ? i.lastEffect = a.next = a : (s = l.next, l.next = a, a.next = s, i.lastEffect = a), a;
  }
  function wS() {
    return pt().memoizedState;
  }
  function es(a, i, l, s) {
    var p = Xt();
    je.flags |= a, p.memoizedState = eo(
      1 | i,
      { destroy: void 0 },
      l,
      s === void 0 ? null : s
    );
  }
  function ts(a, i, l, s) {
    var p = pt();
    s = s === void 0 ? null : s;
    var m = p.memoizedState.inst;
    Ve !== null && s !== null && Bh(s, Ve.memoizedState.deps) ? p.memoizedState = eo(i, m, l, s) : (je.flags |= a, p.memoizedState = eo(
      1 | i,
      m,
      l,
      s
    ));
  }
  function AS(a, i) {
    es(8390656, 8, a, i);
  }
  function Fh(a, i) {
    ts(2048, 8, a, i);
  }
  function MR(a) {
    je.flags |= 4;
    var i = je.updateQueue;
    if (i === null)
      i = Zc(), je.updateQueue = i, i.events = [a];
    else {
      var l = i.events;
      l === null ? i.events = [a] : l.push(a);
    }
  }
  function TS(a) {
    var i = pt().memoizedState;
    return MR({ ref: i, nextImpl: a }), function() {
      if ((Ie & 2) !== 0) throw Error(r(440));
      return i.impl.apply(void 0, arguments);
    };
  }
  function ES(a, i) {
    return ts(4, 2, a, i);
  }
  function jS(a, i) {
    return ts(4, 4, a, i);
  }
  function MS(a, i) {
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
  function CS(a, i, l) {
    l = l != null ? l.concat([a]) : null, ts(4, 4, MS.bind(null, i, a), l);
  }
  function Wh() {
  }
  function DS(a, i) {
    var l = pt();
    i = i === void 0 ? null : i;
    var s = l.memoizedState;
    return i !== null && Bh(i, s[1]) ? s[0] : (l.memoizedState = [a, i], a);
  }
  function PS(a, i) {
    var l = pt();
    i = i === void 0 ? null : i;
    var s = l.memoizedState;
    if (i !== null && Bh(i, s[1]))
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
  function Zh(a, i, l) {
    return l === void 0 || (wr & 1073741824) !== 0 && (Re & 261930) === 0 ? a.memoizedState = i : (a.memoizedState = l, a = N_(), je.lanes |= a, da |= a, l);
  }
  function NS(a, i, l, s) {
    return sn(l, i) ? l : Zi.current !== null ? (a = Zh(a, l, s), sn(a, i) || (gt = !0), a) : (wr & 42) === 0 || (wr & 1073741824) !== 0 && (Re & 261930) === 0 ? (gt = !0, a.memoizedState = l) : (a = N_(), je.lanes |= a, da |= a, i);
  }
  function RS(a, i, l, s, p) {
    var m = Y.p;
    Y.p = m !== 0 && 8 > m ? m : 8;
    var O = R.T, D = {};
    R.T = D, ep(a, !1, i, l);
    try {
      var q = p(), W = R.S;
      if (W !== null && W(D, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var ie = wR(
          q,
          s
        );
        ql(
          a,
          i,
          ie,
          yn(a)
        );
      } else
        ql(
          a,
          i,
          s,
          yn(a)
        );
    } catch (ue) {
      ql(
        a,
        i,
        { then: function() {
        }, status: "rejected", reason: ue },
        yn()
      );
    } finally {
      Y.p = m, O !== null && D.types !== null && (O.types = D.types), R.T = O;
    }
  }
  function CR() {
  }
  function Qh(a, i, l, s) {
    if (a.tag !== 5) throw Error(r(476));
    var p = $S(a).queue;
    RS(
      a,
      p,
      i,
      J,
      l === null ? CR : function() {
        return zS(a), l(s);
      }
    );
  }
  function $S(a) {
    var i = a.memoizedState;
    if (i !== null) return i;
    i = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ar,
        lastRenderedState: J
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
        lastRenderedReducer: Ar,
        lastRenderedState: l
      },
      next: null
    }, a.memoizedState = i, a = a.alternate, a !== null && (a.memoizedState = i), i;
  }
  function zS(a) {
    var i = $S(a);
    i.next === null && (i = a.alternate.memoizedState), ql(
      a,
      i.next.queue,
      {},
      yn()
    );
  }
  function Jh() {
    return $t(eu);
  }
  function qS() {
    return pt().memoizedState;
  }
  function kS() {
    return pt().memoizedState;
  }
  function DR(a) {
    for (var i = a.return; i !== null; ) {
      switch (i.tag) {
        case 24:
        case 3:
          var l = yn();
          a = oa(l);
          var s = la(i, a, l);
          s !== null && (tn(s, i, l), Pl(s, i, l)), i = { cache: jh() }, a.payload = i;
          return;
      }
      i = i.return;
    }
  }
  function PR(a, i, l) {
    var s = yn();
    l = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ns(a) ? LS(i, l) : (l = mh(a, i, l, s), l !== null && (tn(l, a, s), US(l, i, s)));
  }
  function BS(a, i, l) {
    var s = yn();
    ql(a, i, l, s);
  }
  function ql(a, i, l, s) {
    var p = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ns(a)) LS(i, p);
    else {
      var m = a.alternate;
      if (a.lanes === 0 && (m === null || m.lanes === 0) && (m = i.lastRenderedReducer, m !== null))
        try {
          var O = i.lastRenderedState, D = m(O, l);
          if (p.hasEagerState = !0, p.eagerState = D, sn(D, O))
            return zc(a, i, p, 0), Je === null && $c(), !1;
        } catch {
        } finally {
        }
      if (l = mh(a, i, p, s), l !== null)
        return tn(l, a, s), US(l, i, s), !0;
    }
    return !1;
  }
  function ep(a, i, l, s) {
    if (s = {
      lane: 2,
      revertLane: Pp(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ns(a)) {
      if (i) throw Error(r(479));
    } else
      i = mh(
        a,
        l,
        s,
        2
      ), i !== null && tn(i, a, 2);
  }
  function ns(a) {
    var i = a.alternate;
    return a === je || i !== null && i === je;
  }
  function LS(a, i) {
    Qi = Fc = !0;
    var l = a.pending;
    l === null ? i.next = i : (i.next = l.next, l.next = i), a.pending = i;
  }
  function US(a, i, l) {
    if ((l & 4194048) !== 0) {
      var s = i.lanes;
      s &= a.pendingLanes, l |= s, i.lanes = l, K1(a, l);
    }
  }
  var kl = {
    readContext: $t,
    use: Qc,
    useCallback: st,
    useContext: st,
    useEffect: st,
    useImperativeHandle: st,
    useLayoutEffect: st,
    useInsertionEffect: st,
    useMemo: st,
    useReducer: st,
    useRef: st,
    useState: st,
    useDebugValue: st,
    useDeferredValue: st,
    useTransition: st,
    useSyncExternalStore: st,
    useId: st,
    useHostTransitionStatus: st,
    useFormState: st,
    useActionState: st,
    useOptimistic: st,
    useMemoCache: st,
    useCacheRefresh: st
  };
  kl.useEffectEvent = st;
  var IS = {
    readContext: $t,
    use: Qc,
    useCallback: function(a, i) {
      return Xt().memoizedState = [
        a,
        i === void 0 ? null : i
      ], a;
    },
    useContext: $t,
    useEffect: AS,
    useImperativeHandle: function(a, i, l) {
      l = l != null ? l.concat([a]) : null, es(
        4194308,
        4,
        MS.bind(null, i, a),
        l
      );
    },
    useLayoutEffect: function(a, i) {
      return es(4194308, 4, a, i);
    },
    useInsertionEffect: function(a, i) {
      es(4, 2, a, i);
    },
    useMemo: function(a, i) {
      var l = Xt();
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
      var s = Xt();
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
      var i = Xt();
      return a = { current: a }, i.memoizedState = a;
    },
    useState: function(a) {
      a = Xh(a);
      var i = a.queue, l = BS.bind(null, je, i);
      return i.dispatch = l, [a.memoizedState, l];
    },
    useDebugValue: Wh,
    useDeferredValue: function(a, i) {
      var l = Xt();
      return Zh(l, a, i);
    },
    useTransition: function() {
      var a = Xh(!1);
      return a = RS.bind(
        null,
        je,
        a.queue,
        !0,
        !1
      ), Xt().memoizedState = a, [!1, a];
    },
    useSyncExternalStore: function(a, i, l) {
      var s = je, p = Xt();
      if (qe) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = i(), Je === null)
          throw Error(r(349));
        (Re & 127) !== 0 || cS(s, i, l);
      }
      p.memoizedState = l;
      var m = { value: l, getSnapshot: i };
      return p.queue = m, AS(fS.bind(null, s, m, a), [
        a
      ]), s.flags |= 2048, eo(
        9,
        { destroy: void 0 },
        sS.bind(
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
      var a = Xt(), i = Je.identifierPrefix;
      if (qe) {
        var l = tr, s = er;
        l = (s & ~(1 << 32 - cn(s) - 1)).toString(32) + l, i = "_" + i + "R_" + l, l = Wc++, 0 < l && (i += "H" + l.toString(32)), i += "_";
      } else
        l = AR++, i = "_" + i + "r_" + l.toString(32) + "_";
      return a.memoizedState = i;
    },
    useHostTransitionStatus: Jh,
    useFormState: xS,
    useActionState: xS,
    useOptimistic: function(a) {
      var i = Xt();
      i.memoizedState = i.baseState = a;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return i.queue = l, i = ep.bind(
        null,
        je,
        !0,
        l
      ), l.dispatch = i, [a, i];
    },
    useMemoCache: Gh,
    useCacheRefresh: function() {
      return Xt().memoizedState = DR.bind(
        null,
        je
      );
    },
    useEffectEvent: function(a) {
      var i = Xt(), l = { impl: a };
      return i.memoizedState = l, function() {
        if ((Ie & 2) !== 0)
          throw Error(r(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, tp = {
    readContext: $t,
    use: Qc,
    useCallback: DS,
    useContext: $t,
    useEffect: Fh,
    useImperativeHandle: CS,
    useInsertionEffect: ES,
    useLayoutEffect: jS,
    useMemo: PS,
    useReducer: Jc,
    useRef: wS,
    useState: function() {
      return Jc(Ar);
    },
    useDebugValue: Wh,
    useDeferredValue: function(a, i) {
      var l = pt();
      return NS(
        l,
        Ve.memoizedState,
        a,
        i
      );
    },
    useTransition: function() {
      var a = Jc(Ar)[0], i = pt().memoizedState;
      return [
        typeof a == "boolean" ? a : zl(a),
        i
      ];
    },
    useSyncExternalStore: uS,
    useId: qS,
    useHostTransitionStatus: Jh,
    useFormState: SS,
    useActionState: SS,
    useOptimistic: function(a, i) {
      var l = pt();
      return pS(l, Ve, a, i);
    },
    useMemoCache: Gh,
    useCacheRefresh: kS
  };
  tp.useEffectEvent = TS;
  var HS = {
    readContext: $t,
    use: Qc,
    useCallback: DS,
    useContext: $t,
    useEffect: Fh,
    useImperativeHandle: CS,
    useInsertionEffect: ES,
    useLayoutEffect: jS,
    useMemo: PS,
    useReducer: Kh,
    useRef: wS,
    useState: function() {
      return Kh(Ar);
    },
    useDebugValue: Wh,
    useDeferredValue: function(a, i) {
      var l = pt();
      return Ve === null ? Zh(l, a, i) : NS(
        l,
        Ve.memoizedState,
        a,
        i
      );
    },
    useTransition: function() {
      var a = Kh(Ar)[0], i = pt().memoizedState;
      return [
        typeof a == "boolean" ? a : zl(a),
        i
      ];
    },
    useSyncExternalStore: uS,
    useId: qS,
    useHostTransitionStatus: Jh,
    useFormState: OS,
    useActionState: OS,
    useOptimistic: function(a, i) {
      var l = pt();
      return Ve !== null ? pS(l, Ve, a, i) : (l.baseState = a, [a, l.queue.dispatch]);
    },
    useMemoCache: Gh,
    useCacheRefresh: kS
  };
  HS.useEffectEvent = TS;
  function np(a, i, l, s) {
    i = a.memoizedState, l = l(s, i), l = l == null ? i : v({}, i, l), a.memoizedState = l, a.lanes === 0 && (a.updateQueue.baseState = l);
  }
  var rp = {
    enqueueSetState: function(a, i, l) {
      a = a._reactInternals;
      var s = yn(), p = oa(s);
      p.payload = i, l != null && (p.callback = l), i = la(a, p, s), i !== null && (tn(i, a, s), Pl(i, a, s));
    },
    enqueueReplaceState: function(a, i, l) {
      a = a._reactInternals;
      var s = yn(), p = oa(s);
      p.tag = 1, p.payload = i, l != null && (p.callback = l), i = la(a, p, s), i !== null && (tn(i, a, s), Pl(i, a, s));
    },
    enqueueForceUpdate: function(a, i) {
      a = a._reactInternals;
      var l = yn(), s = oa(l);
      s.tag = 2, i != null && (s.callback = i), i = la(a, s, l), i !== null && (tn(i, a, l), Pl(i, a, l));
    }
  };
  function GS(a, i, l, s, p, m, O) {
    return a = a.stateNode, typeof a.shouldComponentUpdate == "function" ? a.shouldComponentUpdate(s, m, O) : i.prototype && i.prototype.isPureReactComponent ? !wl(l, s) || !wl(p, m) : !0;
  }
  function YS(a, i, l, s) {
    a = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(l, s), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(l, s), i.state !== a && rp.enqueueReplaceState(i, i.state, null);
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
  function KS(a) {
    Rc(a);
  }
  function XS(a) {
    console.error(a);
  }
  function VS(a) {
    Rc(a);
  }
  function rs(a, i) {
    try {
      var l = a.onUncaughtError;
      l(i.value, { componentStack: i.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function FS(a, i, l) {
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
  function ap(a, i, l) {
    return l = oa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      rs(a, i);
    }, l;
  }
  function WS(a) {
    return a = oa(a), a.tag = 3, a;
  }
  function ZS(a, i, l, s) {
    var p = l.type.getDerivedStateFromError;
    if (typeof p == "function") {
      var m = s.value;
      a.payload = function() {
        return p(m);
      }, a.callback = function() {
        FS(i, l, s);
      };
    }
    var O = l.stateNode;
    O !== null && typeof O.componentDidCatch == "function" && (a.callback = function() {
      FS(i, l, s), typeof p != "function" && (ha === null ? ha = /* @__PURE__ */ new Set([this]) : ha.add(this));
      var D = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: D !== null ? D : ""
      });
    });
  }
  function NR(a, i, l, s, p) {
    if (l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (i = l.alternate, i !== null && Ki(
        i,
        l,
        p,
        !0
      ), l = dn.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Dn === null ? vs() : l.alternate === null && ft === 0 && (ft = 3), l.flags &= -257, l.flags |= 65536, l.lanes = p, s === Gc ? l.flags |= 16384 : (i = l.updateQueue, i === null ? l.updateQueue = /* @__PURE__ */ new Set([s]) : i.add(s), Mp(a, s, p)), !1;
          case 22:
            return l.flags |= 65536, s === Gc ? l.flags |= 16384 : (i = l.updateQueue, i === null ? (i = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, l.updateQueue = i) : (l = i.retryQueue, l === null ? i.retryQueue = /* @__PURE__ */ new Set([s]) : l.add(s)), Mp(a, s, p)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Mp(a, s, p), vs(), !1;
    }
    if (qe)
      return i = dn.current, i !== null ? ((i.flags & 65536) === 0 && (i.flags |= 256), i.flags |= 65536, i.lanes = p, s !== Oh && (a = Error(r(422), { cause: s }), El(En(a, l)))) : (s !== Oh && (i = Error(r(423), {
        cause: s
      }), El(
        En(i, l)
      )), a = a.current.alternate, a.flags |= 65536, p &= -p, a.lanes |= p, s = En(s, l), p = ap(
        a.stateNode,
        s,
        p
      ), Rh(a, p), ft !== 4 && (ft = 2)), !1;
    var m = Error(r(520), { cause: s });
    if (m = En(m, l), Kl === null ? Kl = [m] : Kl.push(m), ft !== 4 && (ft = 2), i === null) return !0;
    s = En(s, l), l = i;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, a = p & -p, l.lanes |= a, a = ap(l.stateNode, s, a), Rh(l, a), !1;
        case 1:
          if (i = l.type, m = l.stateNode, (l.flags & 128) === 0 && (typeof i.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (ha === null || !ha.has(m))))
            return l.flags |= 65536, p &= -p, l.lanes |= p, p = WS(p), ZS(
              p,
              a,
              l,
              s
            ), Rh(l, p), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var ip = Error(r(461)), gt = !1;
  function zt(a, i, l, s) {
    i.child = a === null ? tS(i, null, l, s) : Wa(
      i,
      a.child,
      l,
      s
    );
  }
  function QS(a, i, l, s, p) {
    l = l.render;
    var m = i.ref;
    if ("ref" in s) {
      var O = {};
      for (var D in s)
        D !== "ref" && (O[D] = s[D]);
    } else O = s;
    return Ka(i), s = Lh(
      a,
      i,
      l,
      O,
      m,
      p
    ), D = Uh(), a !== null && !gt ? (Ih(a, i, p), Tr(a, i, p)) : (qe && D && Sh(i), i.flags |= 1, zt(a, i, s, p), i.child);
  }
  function JS(a, i, l, s, p) {
    if (a === null) {
      var m = l.type;
      return typeof m == "function" && !gh(m) && m.defaultProps === void 0 && l.compare === null ? (i.tag = 15, i.type = m, e_(
        a,
        i,
        m,
        s,
        p
      )) : (a = kc(
        l.type,
        null,
        s,
        i,
        i.mode,
        p
      ), a.ref = i.ref, a.return = i, i.child = a);
    }
    if (m = a.child, !hp(a, p)) {
      var O = m.memoizedProps;
      if (l = l.compare, l = l !== null ? l : wl, l(O, s) && a.ref === i.ref)
        return Tr(a, i, p);
    }
    return i.flags |= 1, a = xr(m, s), a.ref = i.ref, a.return = i, i.child = a;
  }
  function e_(a, i, l, s, p) {
    if (a !== null) {
      var m = a.memoizedProps;
      if (wl(m, s) && a.ref === i.ref)
        if (gt = !1, i.pendingProps = s = m, hp(a, p))
          (a.flags & 131072) !== 0 && (gt = !0);
        else
          return i.lanes = a.lanes, Tr(a, i, p);
    }
    return op(
      a,
      i,
      l,
      s,
      p
    );
  }
  function t_(a, i, l, s) {
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
        return n_(
          a,
          i,
          m,
          l,
          s
        );
      }
      if ((l & 536870912) !== 0)
        i.memoizedState = { baseLanes: 0, cachePool: null }, a !== null && Ic(
          i,
          m !== null ? m.cachePool : null
        ), m !== null ? aS(i, m) : zh(), iS(i);
      else
        return s = i.lanes = 536870912, n_(
          a,
          i,
          m !== null ? m.baseLanes | l : l,
          l,
          s
        );
    } else
      m !== null ? (Ic(i, m.cachePool), aS(i, m), ca(), i.memoizedState = null) : (a !== null && Ic(i, null), zh(), ca());
    return zt(a, i, p, l), i.child;
  }
  function Bl(a, i) {
    return a !== null && a.tag === 22 || i.stateNode !== null || (i.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.sibling;
  }
  function n_(a, i, l, s, p) {
    var m = Ch();
    return m = m === null ? null : { parent: yt._currentValue, pool: m }, i.memoizedState = {
      baseLanes: l,
      cachePool: m
    }, a !== null && Ic(i, null), zh(), iS(i), a !== null && Ki(a, i, s, !0), i.childLanes = p, null;
  }
  function as(a, i) {
    return i = os(
      { mode: i.mode, children: i.children },
      a.mode
    ), i.ref = a.ref, a.child = i, i.return = a, i;
  }
  function r_(a, i, l) {
    return Wa(i, a.child, null, l), a = as(i, i.pendingProps), a.flags |= 2, hn(i), i.memoizedState = null, a;
  }
  function RR(a, i, l) {
    var s = i.pendingProps, p = (i.flags & 128) !== 0;
    if (i.flags &= -129, a === null) {
      if (qe) {
        if (s.mode === "hidden")
          return a = as(i, s), i.lanes = 536870912, Bl(null, a);
        if (kh(i), (a = rt) ? (a = vO(
          a,
          Cn
        ), a = a !== null && a.data === "&" ? a : null, a !== null && (i.memoizedState = {
          dehydrated: a,
          treeContext: ta !== null ? { id: er, overflow: tr } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Lx(a), l.return = i, i.child = l, Rt = i, rt = null)) : a = null, a === null) throw ra(i);
        return i.lanes = 536870912, null;
      }
      return as(i, s);
    }
    var m = a.memoizedState;
    if (m !== null) {
      var O = m.dehydrated;
      if (kh(i), p)
        if (i.flags & 256)
          i.flags &= -257, i = r_(
            a,
            i,
            l
          );
        else if (i.memoizedState !== null)
          i.child = a.child, i.flags |= 128, i = null;
        else throw Error(r(558));
      else if (gt || Ki(a, i, l, !1), p = (l & a.childLanes) !== 0, gt || p) {
        if (s = Je, s !== null && (O = X1(s, l), O !== 0 && O !== m.retryLane))
          throw m.retryLane = O, Ia(a, O), tn(s, a, O), ip;
        vs(), i = r_(
          a,
          i,
          l
        );
      } else
        a = m.treeContext, rt = Pn(O.nextSibling), Rt = i, qe = !0, na = null, Cn = !1, a !== null && Hx(i, a), i = as(i, s), i.flags |= 4096;
      return i;
    }
    return a = xr(a.child, {
      mode: s.mode,
      children: s.children
    }), a.ref = i.ref, i.child = a, a.return = i, a;
  }
  function is(a, i) {
    var l = i.ref;
    if (l === null)
      a !== null && a.ref !== null && (i.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (a === null || a.ref !== l) && (i.flags |= 4194816);
    }
  }
  function op(a, i, l, s, p) {
    return Ka(i), l = Lh(
      a,
      i,
      l,
      s,
      void 0,
      p
    ), s = Uh(), a !== null && !gt ? (Ih(a, i, p), Tr(a, i, p)) : (qe && s && Sh(i), i.flags |= 1, zt(a, i, l, p), i.child);
  }
  function a_(a, i, l, s, p, m) {
    return Ka(i), i.updateQueue = null, l = lS(
      i,
      s,
      l,
      p
    ), oS(a), s = Uh(), a !== null && !gt ? (Ih(a, i, m), Tr(a, i, m)) : (qe && s && Sh(i), i.flags |= 1, zt(a, i, l, m), i.child);
  }
  function i_(a, i, l, s, p) {
    if (Ka(i), i.stateNode === null) {
      var m = Ii, O = l.contextType;
      typeof O == "object" && O !== null && (m = $t(O)), m = new l(s, m), i.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = rp, i.stateNode = m, m._reactInternals = i, m = i.stateNode, m.props = s, m.state = i.memoizedState, m.refs = {}, Ph(i), O = l.contextType, m.context = typeof O == "object" && O !== null ? $t(O) : Ii, m.state = i.memoizedState, O = l.getDerivedStateFromProps, typeof O == "function" && (np(
        i,
        l,
        O,
        s
      ), m.state = i.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (O = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), O !== m.state && rp.enqueueReplaceState(m, m.state, null), Rl(i, s, m, p), Nl(), m.state = i.memoizedState), typeof m.componentDidMount == "function" && (i.flags |= 4194308), s = !0;
    } else if (a === null) {
      m = i.stateNode;
      var D = i.memoizedProps, q = Qa(l, D);
      m.props = q;
      var W = m.context, ie = l.contextType;
      O = Ii, typeof ie == "object" && ie !== null && (O = $t(ie));
      var ue = l.getDerivedStateFromProps;
      ie = typeof ue == "function" || typeof m.getSnapshotBeforeUpdate == "function", D = i.pendingProps !== D, ie || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (D || W !== O) && YS(
        i,
        m,
        s,
        O
      ), ia = !1;
      var Z = i.memoizedState;
      m.state = Z, Rl(i, s, m, p), Nl(), W = i.memoizedState, D || Z !== W || ia ? (typeof ue == "function" && (np(
        i,
        l,
        ue,
        s
      ), W = i.memoizedState), (q = ia || GS(
        i,
        l,
        q,
        s,
        Z,
        W,
        O
      )) ? (ie || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = s, i.memoizedState = W), m.props = s, m.state = W, m.context = O, s = q) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), s = !1);
    } else {
      m = i.stateNode, Nh(a, i), O = i.memoizedProps, ie = Qa(l, O), m.props = ie, ue = i.pendingProps, Z = m.context, W = l.contextType, q = Ii, typeof W == "object" && W !== null && (q = $t(W)), D = l.getDerivedStateFromProps, (W = typeof D == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (O !== ue || Z !== q) && YS(
        i,
        m,
        s,
        q
      ), ia = !1, Z = i.memoizedState, m.state = Z, Rl(i, s, m, p), Nl();
      var ne = i.memoizedState;
      O !== ue || Z !== ne || ia || a !== null && a.dependencies !== null && Lc(a.dependencies) ? (typeof D == "function" && (np(
        i,
        l,
        D,
        s
      ), ne = i.memoizedState), (ie = ia || GS(
        i,
        l,
        ie,
        s,
        Z,
        ne,
        q
      ) || a !== null && a.dependencies !== null && Lc(a.dependencies)) ? (W || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(s, ne, q), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        s,
        ne,
        q
      )), typeof m.componentDidUpdate == "function" && (i.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || O === a.memoizedProps && Z === a.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || O === a.memoizedProps && Z === a.memoizedState || (i.flags |= 1024), i.memoizedProps = s, i.memoizedState = ne), m.props = s, m.state = ne, m.context = q, s = ie) : (typeof m.componentDidUpdate != "function" || O === a.memoizedProps && Z === a.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || O === a.memoizedProps && Z === a.memoizedState || (i.flags |= 1024), s = !1);
    }
    return m = s, is(a, i), s = (i.flags & 128) !== 0, m || s ? (m = i.stateNode, l = s && typeof l.getDerivedStateFromError != "function" ? null : m.render(), i.flags |= 1, a !== null && s ? (i.child = Wa(
      i,
      a.child,
      null,
      p
    ), i.child = Wa(
      i,
      null,
      l,
      p
    )) : zt(a, i, l, p), i.memoizedState = m.state, a = i.child) : a = Tr(
      a,
      i,
      p
    ), a;
  }
  function o_(a, i, l, s) {
    return Ga(), i.flags |= 256, zt(a, i, l, s), i.child;
  }
  var lp = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function up(a) {
    return { baseLanes: a, cachePool: Fx() };
  }
  function cp(a, i, l) {
    return a = a !== null ? a.childLanes & ~l : 0, i && (a |= vn), a;
  }
  function l_(a, i, l) {
    var s = i.pendingProps, p = !1, m = (i.flags & 128) !== 0, O;
    if ((O = m) || (O = a !== null && a.memoizedState === null ? !1 : (ht.current & 2) !== 0), O && (p = !0, i.flags &= -129), O = (i.flags & 32) !== 0, i.flags &= -33, a === null) {
      if (qe) {
        if (p ? ua(i) : ca(), (a = rt) ? (a = vO(
          a,
          Cn
        ), a = a !== null && a.data !== "&" ? a : null, a !== null && (i.memoizedState = {
          dehydrated: a,
          treeContext: ta !== null ? { id: er, overflow: tr } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Lx(a), l.return = i, i.child = l, Rt = i, rt = null)) : a = null, a === null) throw ra(i);
        return Yp(a) ? i.lanes = 32 : i.lanes = 536870912, null;
      }
      var D = s.children;
      return s = s.fallback, p ? (ca(), p = i.mode, D = os(
        { mode: "hidden", children: D },
        p
      ), s = Ha(
        s,
        p,
        l,
        null
      ), D.return = i, s.return = i, D.sibling = s, i.child = D, s = i.child, s.memoizedState = up(l), s.childLanes = cp(
        a,
        O,
        l
      ), i.memoizedState = lp, Bl(null, s)) : (ua(i), sp(i, D));
    }
    var q = a.memoizedState;
    if (q !== null && (D = q.dehydrated, D !== null)) {
      if (m)
        i.flags & 256 ? (ua(i), i.flags &= -257, i = fp(
          a,
          i,
          l
        )) : i.memoizedState !== null ? (ca(), i.child = a.child, i.flags |= 128, i = null) : (ca(), D = s.fallback, p = i.mode, s = os(
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
        ), s = i.child, s.memoizedState = up(l), s.childLanes = cp(
          a,
          O,
          l
        ), i.memoizedState = lp, i = Bl(null, s));
      else if (ua(i), Yp(D)) {
        if (O = D.nextSibling && D.nextSibling.dataset, O) var W = O.dgst;
        O = W, s = Error(r(419)), s.stack = "", s.digest = O, El({ value: s, source: null, stack: null }), i = fp(
          a,
          i,
          l
        );
      } else if (gt || Ki(a, i, l, !1), O = (l & a.childLanes) !== 0, gt || O) {
        if (O = Je, O !== null && (s = X1(O, l), s !== 0 && s !== q.retryLane))
          throw q.retryLane = s, Ia(a, s), tn(O, a, s), ip;
        Gp(D) || vs(), i = fp(
          a,
          i,
          l
        );
      } else
        Gp(D) ? (i.flags |= 192, i.child = a.child, i = null) : (a = q.treeContext, rt = Pn(
          D.nextSibling
        ), Rt = i, qe = !0, na = null, Cn = !1, a !== null && Hx(i, a), i = sp(
          i,
          s.children
        ), i.flags |= 4096);
      return i;
    }
    return p ? (ca(), D = s.fallback, p = i.mode, q = a.child, W = q.sibling, s = xr(q, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = q.subtreeFlags & 65011712, W !== null ? D = xr(
      W,
      D
    ) : (D = Ha(
      D,
      p,
      l,
      null
    ), D.flags |= 2), D.return = i, s.return = i, s.sibling = D, i.child = s, Bl(null, s), s = i.child, D = a.child.memoizedState, D === null ? D = up(l) : (p = D.cachePool, p !== null ? (q = yt._currentValue, p = p.parent !== q ? { parent: q, pool: q } : p) : p = Fx(), D = {
      baseLanes: D.baseLanes | l,
      cachePool: p
    }), s.memoizedState = D, s.childLanes = cp(
      a,
      O,
      l
    ), i.memoizedState = lp, Bl(a.child, s)) : (ua(i), l = a.child, a = l.sibling, l = xr(l, {
      mode: "visible",
      children: s.children
    }), l.return = i, l.sibling = null, a !== null && (O = i.deletions, O === null ? (i.deletions = [a], i.flags |= 16) : O.push(a)), i.child = l, i.memoizedState = null, l);
  }
  function sp(a, i) {
    return i = os(
      { mode: "visible", children: i },
      a.mode
    ), i.return = a, a.child = i;
  }
  function os(a, i) {
    return a = fn(22, a, null, i), a.lanes = 0, a;
  }
  function fp(a, i, l) {
    return Wa(i, a.child, null, l), a = sp(
      i,
      i.pendingProps.children
    ), a.flags |= 2, i.memoizedState = null, a;
  }
  function u_(a, i, l) {
    a.lanes |= i;
    var s = a.alternate;
    s !== null && (s.lanes |= i), Th(a.return, i, l);
  }
  function dp(a, i, l, s, p, m) {
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
  function c_(a, i, l) {
    var s = i.pendingProps, p = s.revealOrder, m = s.tail;
    s = s.children;
    var O = ht.current, D = (O & 2) !== 0;
    if (D ? (O = O & 1 | 2, i.flags |= 128) : O &= 1, re(ht, O), zt(a, i, s, l), s = qe ? Tl : 0, !D && a !== null && (a.flags & 128) !== 0)
      e: for (a = i.child; a !== null; ) {
        if (a.tag === 13)
          a.memoizedState !== null && u_(a, l, i);
        else if (a.tag === 19)
          u_(a, l, i);
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
          a = l.alternate, a !== null && Vc(a) === null && (p = l), l = l.sibling;
        l = p, l === null ? (p = i.child, i.child = null) : (p = l.sibling, l.sibling = null), dp(
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
          if (a = p.alternate, a !== null && Vc(a) === null) {
            i.child = p;
            break;
          }
          a = p.sibling, p.sibling = l, l = p, p = a;
        }
        dp(
          i,
          !0,
          l,
          null,
          m,
          s
        );
        break;
      case "together":
        dp(
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
  function Tr(a, i, l) {
    if (a !== null && (i.dependencies = a.dependencies), da |= i.lanes, (l & i.childLanes) === 0)
      if (a !== null) {
        if (Ki(
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
      for (a = i.child, l = xr(a, a.pendingProps), i.child = l, l.return = i; a.sibling !== null; )
        a = a.sibling, l = l.sibling = xr(a, a.pendingProps), l.return = i;
      l.sibling = null;
    }
    return i.child;
  }
  function hp(a, i) {
    return (a.lanes & i) !== 0 ? !0 : (a = a.dependencies, !!(a !== null && Lc(a)));
  }
  function $R(a, i, l) {
    switch (i.tag) {
      case 3:
        Ce(i, i.stateNode.containerInfo), aa(i, yt, a.memoizedState.cache), Ga();
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
          return i.flags |= 128, kh(i), null;
        break;
      case 13:
        var s = i.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (ua(i), i.flags |= 128, null) : (l & i.child.childLanes) !== 0 ? l_(a, i, l) : (ua(i), a = Tr(
            a,
            i,
            l
          ), a !== null ? a.sibling : null);
        ua(i);
        break;
      case 19:
        var p = (a.flags & 128) !== 0;
        if (s = (l & i.childLanes) !== 0, s || (Ki(
          a,
          i,
          l,
          !1
        ), s = (l & i.childLanes) !== 0), p) {
          if (s)
            return c_(
              a,
              i,
              l
            );
          i.flags |= 128;
        }
        if (p = i.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), re(ht, ht.current), s) break;
        return null;
      case 22:
        return i.lanes = 0, t_(
          a,
          i,
          l,
          i.pendingProps
        );
      case 24:
        aa(i, yt, a.memoizedState.cache);
    }
    return Tr(a, i, l);
  }
  function s_(a, i, l) {
    if (a !== null)
      if (a.memoizedProps !== i.pendingProps)
        gt = !0;
      else {
        if (!hp(a, l) && (i.flags & 128) === 0)
          return gt = !1, $R(
            a,
            i,
            l
          );
        gt = (a.flags & 131072) !== 0;
      }
    else
      gt = !1, qe && (i.flags & 1048576) !== 0 && Ix(i, Tl, i.index);
    switch (i.lanes = 0, i.tag) {
      case 16:
        e: {
          var s = i.pendingProps;
          if (a = Va(i.elementType), i.type = a, typeof a == "function")
            gh(a) ? (s = Qa(a, s), i.tag = 1, i = i_(
              null,
              i,
              a,
              s,
              l
            )) : (i.tag = 0, i = op(
              null,
              i,
              a,
              s,
              l
            ));
          else {
            if (a != null) {
              var p = a.$$typeof;
              if (p === j) {
                i.tag = 11, i = QS(
                  null,
                  i,
                  a,
                  s,
                  l
                );
                break e;
              } else if (p === M) {
                i.tag = 14, i = JS(
                  null,
                  i,
                  a,
                  s,
                  l
                );
                break e;
              }
            }
            throw i = Q(a) || a, Error(r(306, i, ""));
          }
        }
        return i;
      case 0:
        return op(
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
        ), i_(
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
          p = m.element, Nh(a, i), Rl(i, s, null, l);
          var O = i.memoizedState;
          if (s = O.cache, aa(i, yt, s), s !== m.cache && Eh(
            i,
            [yt],
            l,
            !0
          ), Nl(), s = O.element, m.isDehydrated)
            if (m = {
              element: s,
              isDehydrated: !1,
              cache: O.cache
            }, i.updateQueue.baseState = m, i.memoizedState = m, i.flags & 256) {
              i = o_(
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
              ), El(p), i = o_(
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
              for (rt = Pn(a.firstChild), Rt = i, qe = !0, na = null, Cn = !0, l = tS(
                i,
                null,
                s,
                l
              ), i.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Ga(), s === p) {
              i = Tr(
                a,
                i,
                l
              );
              break e;
            }
            zt(a, i, s, l);
          }
          i = i.child;
        }
        return i;
      case 26:
        return is(a, i), a === null ? (l = SO(
          i.type,
          null,
          i.pendingProps,
          null
        )) ? i.memoizedState = l : qe || (l = i.type, a = i.pendingProps, s = _s(
          ye.current
        ).createElement(l), s[Nt] = i, s[Ft] = a, qt(s, l, a), Mt(s), i.stateNode = s) : i.memoizedState = SO(
          i.type,
          a.memoizedProps,
          i.pendingProps,
          a.memoizedState
        ), null;
      case 27:
        return ge(i), a === null && qe && (s = i.stateNode = gO(
          i.type,
          i.pendingProps,
          ye.current
        ), Rt = i, Cn = !0, p = rt, ma(i.type) ? (Kp = p, rt = Pn(s.firstChild)) : rt = p), zt(
          a,
          i,
          i.pendingProps.children,
          l
        ), is(a, i), a === null && (i.flags |= 4194304), i.child;
      case 5:
        return a === null && qe && ((p = s = rt) && (s = f3(
          s,
          i.type,
          i.pendingProps,
          Cn
        ), s !== null ? (i.stateNode = s, Rt = i, rt = Pn(s.firstChild), Cn = !1, p = !0) : p = !1), p || ra(i)), ge(i), p = i.type, m = i.pendingProps, O = a !== null ? a.memoizedProps : null, s = m.children, Up(p, m) ? s = null : O !== null && Up(p, O) && (i.flags |= 32), i.memoizedState !== null && (p = Lh(
          a,
          i,
          TR,
          null,
          null,
          l
        ), eu._currentValue = p), is(a, i), zt(a, i, s, l), i.child;
      case 6:
        return a === null && qe && ((a = l = rt) && (l = d3(
          l,
          i.pendingProps,
          Cn
        ), l !== null ? (i.stateNode = l, Rt = i, rt = null, a = !0) : a = !1), a || ra(i)), null;
      case 13:
        return l_(a, i, l);
      case 4:
        return Ce(
          i,
          i.stateNode.containerInfo
        ), s = i.pendingProps, a === null ? i.child = Wa(
          i,
          null,
          s,
          l
        ) : zt(a, i, s, l), i.child;
      case 11:
        return QS(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 7:
        return zt(
          a,
          i,
          i.pendingProps,
          l
        ), i.child;
      case 8:
        return zt(
          a,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 12:
        return zt(
          a,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 10:
        return s = i.pendingProps, aa(i, i.type, s.value), zt(a, i, s.children, l), i.child;
      case 9:
        return p = i.type._context, s = i.pendingProps.children, Ka(i), p = $t(p), s = s(p), i.flags |= 1, zt(a, i, s, l), i.child;
      case 14:
        return JS(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 15:
        return e_(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 19:
        return c_(a, i, l);
      case 31:
        return RR(a, i, l);
      case 22:
        return t_(
          a,
          i,
          l,
          i.pendingProps
        );
      case 24:
        return Ka(i), s = $t(yt), a === null ? (p = Ch(), p === null && (p = Je, m = jh(), p.pooledCache = m, m.refCount++, m !== null && (p.pooledCacheLanes |= l), p = m), i.memoizedState = { parent: s, cache: p }, Ph(i), aa(i, yt, p)) : ((a.lanes & l) !== 0 && (Nh(a, i), Rl(i, null, null, l), Nl()), p = a.memoizedState, m = i.memoizedState, p.parent !== s ? (p = { parent: s, cache: s }, i.memoizedState = p, i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = p), aa(i, yt, s)) : (s = m.cache, aa(i, yt, s), s !== p.cache && Eh(
          i,
          [yt],
          l,
          !0
        ))), zt(
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
  function Er(a) {
    a.flags |= 4;
  }
  function pp(a, i, l, s, p) {
    if ((i = (a.mode & 32) !== 0) && (i = !1), i) {
      if (a.flags |= 16777216, (p & 335544128) === p)
        if (a.stateNode.complete) a.flags |= 8192;
        else if (q_()) a.flags |= 8192;
        else
          throw Fa = Gc, Dh;
    } else a.flags &= -16777217;
  }
  function f_(a, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
      a.flags &= -16777217;
    else if (a.flags |= 16777216, !TO(i))
      if (q_()) a.flags |= 8192;
      else
        throw Fa = Gc, Dh;
  }
  function ls(a, i) {
    i !== null && (a.flags |= 4), a.flags & 16384 && (i = a.tag !== 22 ? G1() : 536870912, a.lanes |= i, ao |= i);
  }
  function Ll(a, i) {
    if (!qe)
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
    switch (_h(i), i.tag) {
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
        return l = i.stateNode, s = null, a !== null && (s = a.memoizedState.cache), i.memoizedState.cache !== s && (i.flags |= 2048), Or(yt), ce(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (a === null || a.child === null) && (Yi(i) ? Er(i) : a === null || a.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, wh())), at(i), null;
      case 26:
        var p = i.type, m = i.memoizedState;
        return a === null ? (Er(i), m !== null ? (at(i), f_(i, m)) : (at(i), pp(
          i,
          p,
          null,
          s,
          l
        ))) : m ? m !== a.memoizedState ? (Er(i), at(i), f_(i, m)) : (at(i), i.flags &= -16777217) : (a = a.memoizedProps, a !== s && Er(i), at(i), pp(
          i,
          p,
          a,
          s,
          l
        )), null;
      case 27:
        if (xe(i), l = ye.current, p = i.type, a !== null && i.stateNode != null)
          a.memoizedProps !== s && Er(i);
        else {
          if (!s) {
            if (i.stateNode === null)
              throw Error(r(166));
            return at(i), null;
          }
          a = se.current, Yi(i) ? Gx(i) : (a = gO(p, s, l), i.stateNode = a, Er(i));
        }
        return at(i), null;
      case 5:
        if (xe(i), p = i.type, a !== null && i.stateNode != null)
          a.memoizedProps !== s && Er(i);
        else {
          if (!s) {
            if (i.stateNode === null)
              throw Error(r(166));
            return at(i), null;
          }
          if (m = se.current, Yi(i))
            Gx(i);
          else {
            var O = _s(
              ye.current
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
            m[Nt] = i, m[Ft] = s;
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
            e: switch (qt(m, p, s), p) {
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
            s && Er(i);
          }
        }
        return at(i), pp(
          i,
          i.type,
          a === null ? null : a.memoizedProps,
          i.pendingProps,
          l
        ), null;
      case 6:
        if (a && i.stateNode != null)
          a.memoizedProps !== s && Er(i);
        else {
          if (typeof s != "string" && i.stateNode === null)
            throw Error(r(166));
          if (a = ye.current, Yi(i)) {
            if (a = i.stateNode, l = i.memoizedProps, s = null, p = Rt, p !== null)
              switch (p.tag) {
                case 27:
                case 5:
                  s = p.memoizedProps;
              }
            a[Nt] = i, a = !!(a.nodeValue === l || s !== null && s.suppressHydrationWarning === !0 || lO(a.nodeValue, l)), a || ra(i, !0);
          } else
            a = _s(a).createTextNode(
              s
            ), a[Nt] = i, i.stateNode = a;
        }
        return at(i), null;
      case 31:
        if (l = i.memoizedState, a === null || a.memoizedState !== null) {
          if (s = Yi(i), l !== null) {
            if (a === null) {
              if (!s) throw Error(r(318));
              if (a = i.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(557));
              a[Nt] = i;
            } else
              Ga(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            at(i), a = !1;
          } else
            l = wh(), a !== null && a.memoizedState !== null && (a.memoizedState.hydrationErrors = l), a = !0;
          if (!a)
            return i.flags & 256 ? (hn(i), i) : (hn(i), null);
          if ((i.flags & 128) !== 0)
            throw Error(r(558));
        }
        return at(i), null;
      case 13:
        if (s = i.memoizedState, a === null || a.memoizedState !== null && a.memoizedState.dehydrated !== null) {
          if (p = Yi(i), s !== null && s.dehydrated !== null) {
            if (a === null) {
              if (!p) throw Error(r(318));
              if (p = i.memoizedState, p = p !== null ? p.dehydrated : null, !p) throw Error(r(317));
              p[Nt] = i;
            } else
              Ga(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            at(i), p = !1;
          } else
            p = wh(), a !== null && a.memoizedState !== null && (a.memoizedState.hydrationErrors = p), p = !0;
          if (!p)
            return i.flags & 256 ? (hn(i), i) : (hn(i), null);
        }
        return hn(i), (i.flags & 128) !== 0 ? (i.lanes = l, i) : (l = s !== null, a = a !== null && a.memoizedState !== null, l && (s = i.child, p = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (p = s.alternate.memoizedState.cachePool.pool), m = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (m = s.memoizedState.cachePool.pool), m !== p && (s.flags |= 2048)), l !== a && l && (i.child.flags |= 8192), ls(i, i.updateQueue), at(i), null);
      case 4:
        return ce(), a === null && zp(i.stateNode.containerInfo), at(i), null;
      case 10:
        return Or(i.type), at(i), null;
      case 19:
        if (U(ht), s = i.memoizedState, s === null) return at(i), null;
        if (p = (i.flags & 128) !== 0, m = s.rendering, m === null)
          if (p) Ll(s, !1);
          else {
            if (ft !== 0 || a !== null && (a.flags & 128) !== 0)
              for (a = i.child; a !== null; ) {
                if (m = Vc(a), m !== null) {
                  for (i.flags |= 128, Ll(s, !1), a = m.updateQueue, i.updateQueue = a, ls(i, a), i.subtreeFlags = 0, a = l, l = i.child; l !== null; )
                    Bx(l, a), l = l.sibling;
                  return re(
                    ht,
                    ht.current & 1 | 2
                  ), qe && Sr(i, s.treeForkCount), i.child;
                }
                a = a.sibling;
              }
            s.tail !== null && _t() > ds && (i.flags |= 128, p = !0, Ll(s, !1), i.lanes = 4194304);
          }
        else {
          if (!p)
            if (a = Vc(m), a !== null) {
              if (i.flags |= 128, p = !0, a = a.updateQueue, i.updateQueue = a, ls(i, a), Ll(s, !0), s.tail === null && s.tailMode === "hidden" && !m.alternate && !qe)
                return at(i), null;
            } else
              2 * _t() - s.renderingStartTime > ds && l !== 536870912 && (i.flags |= 128, p = !0, Ll(s, !1), i.lanes = 4194304);
          s.isBackwards ? (m.sibling = i.child, i.child = m) : (a = s.last, a !== null ? a.sibling = m : i.child = m, s.last = m);
        }
        return s.tail !== null ? (a = s.tail, s.rendering = a, s.tail = a.sibling, s.renderingStartTime = _t(), a.sibling = null, l = ht.current, re(
          ht,
          p ? l & 1 | 2 : l & 1
        ), qe && Sr(i, s.treeForkCount), a) : (at(i), null);
      case 22:
      case 23:
        return hn(i), qh(), s = i.memoizedState !== null, a !== null ? a.memoizedState !== null !== s && (i.flags |= 8192) : s && (i.flags |= 8192), s ? (l & 536870912) !== 0 && (i.flags & 128) === 0 && (at(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : at(i), l = i.updateQueue, l !== null && ls(i, l.retryQueue), l = null, a !== null && a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== l && (i.flags |= 2048), a !== null && U(Xa), null;
      case 24:
        return l = null, a !== null && (l = a.memoizedState.cache), i.memoizedState.cache !== l && (i.flags |= 2048), Or(yt), at(i), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, i.tag));
  }
  function qR(a, i) {
    switch (_h(i), i.tag) {
      case 1:
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 3:
        return Or(yt), ce(), a = i.flags, (a & 65536) !== 0 && (a & 128) === 0 ? (i.flags = a & -65537 | 128, i) : null;
      case 26:
      case 27:
      case 5:
        return xe(i), null;
      case 31:
        if (i.memoizedState !== null) {
          if (hn(i), i.alternate === null)
            throw Error(r(340));
          Ga();
        }
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 13:
        if (hn(i), a = i.memoizedState, a !== null && a.dehydrated !== null) {
          if (i.alternate === null)
            throw Error(r(340));
          Ga();
        }
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 19:
        return U(ht), null;
      case 4:
        return ce(), null;
      case 10:
        return Or(i.type), null;
      case 22:
      case 23:
        return hn(i), qh(), a !== null && U(Xa), a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 24:
        return Or(yt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function d_(a, i) {
    switch (_h(i), i.tag) {
      case 3:
        Or(yt), ce();
        break;
      case 26:
      case 27:
      case 5:
        xe(i);
        break;
      case 4:
        ce();
        break;
      case 31:
        i.memoizedState !== null && hn(i);
        break;
      case 13:
        hn(i);
        break;
      case 19:
        U(ht);
        break;
      case 10:
        Or(i.type);
        break;
      case 22:
      case 23:
        hn(i), qh(), a !== null && U(Xa);
        break;
      case 24:
        Or(yt);
    }
  }
  function Ul(a, i) {
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
              var q = l, W = D;
              try {
                W();
              } catch (ie) {
                Xe(
                  p,
                  q,
                  ie
                );
              }
            }
          }
          s = s.next;
        } while (s !== m);
      }
    } catch (ie) {
      Xe(i, i.return, ie);
    }
  }
  function h_(a) {
    var i = a.updateQueue;
    if (i !== null) {
      var l = a.stateNode;
      try {
        rS(i, l);
      } catch (s) {
        Xe(a, a.return, s);
      }
    }
  }
  function p_(a, i, l) {
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
  function Il(a, i) {
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
  function nr(a, i) {
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
  function v_(a) {
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
  function vp(a, i, l) {
    try {
      var s = a.stateNode;
      i3(s, a.type, l, i), s[Ft] = i;
    } catch (p) {
      Xe(a, a.return, p);
    }
  }
  function y_(a) {
    return a.tag === 5 || a.tag === 3 || a.tag === 26 || a.tag === 27 && ma(a.type) || a.tag === 4;
  }
  function yp(a) {
    e: for (; ; ) {
      for (; a.sibling === null; ) {
        if (a.return === null || y_(a.return)) return null;
        a = a.return;
      }
      for (a.sibling.return = a.return, a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18; ) {
        if (a.tag === 27 && ma(a.type) || a.flags & 2 || a.child === null || a.tag === 4) continue e;
        a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function mp(a, i, l) {
    var s = a.tag;
    if (s === 5 || s === 6)
      a = a.stateNode, i ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(a, i) : (i = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, i.appendChild(a), l = l._reactRootContainer, l != null || i.onclick !== null || (i.onclick = gr));
    else if (s !== 4 && (s === 27 && ma(a.type) && (l = a.stateNode, i = null), a = a.child, a !== null))
      for (mp(a, i, l), a = a.sibling; a !== null; )
        mp(a, i, l), a = a.sibling;
  }
  function us(a, i, l) {
    var s = a.tag;
    if (s === 5 || s === 6)
      a = a.stateNode, i ? l.insertBefore(a, i) : l.appendChild(a);
    else if (s !== 4 && (s === 27 && ma(a.type) && (l = a.stateNode), a = a.child, a !== null))
      for (us(a, i, l), a = a.sibling; a !== null; )
        us(a, i, l), a = a.sibling;
  }
  function m_(a) {
    var i = a.stateNode, l = a.memoizedProps;
    try {
      for (var s = a.type, p = i.attributes; p.length; )
        i.removeAttributeNode(p[0]);
      qt(i, s, l), i[Nt] = a, i[Ft] = l;
    } catch (m) {
      Xe(a, a.return, m);
    }
  }
  var jr = !1, bt = !1, gp = !1, g_ = typeof WeakSet == "function" ? WeakSet : Set, Ct = null;
  function kR(a, i) {
    if (a = a.containerInfo, Bp = Ms, a = Cx(a), fh(a)) {
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
            var O = 0, D = -1, q = -1, W = 0, ie = 0, ue = a, Z = null;
            t: for (; ; ) {
              for (var ne; ue !== l || p !== 0 && ue.nodeType !== 3 || (D = O + p), ue !== m || s !== 0 && ue.nodeType !== 3 || (q = O + s), ue.nodeType === 3 && (O += ue.nodeValue.length), (ne = ue.firstChild) !== null; )
                Z = ue, ue = ne;
              for (; ; ) {
                if (ue === a) break t;
                if (Z === l && ++W === p && (D = O), Z === m && ++ie === s && (q = O), (ne = ue.nextSibling) !== null) break;
                ue = Z, Z = ue.parentNode;
              }
              ue = ne;
            }
            l = D === -1 || q === -1 ? null : { start: D, end: q };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Lp = { focusedElem: a, selectionRange: l }, Ms = !1, Ct = i; Ct !== null; )
      if (i = Ct, a = i.child, (i.subtreeFlags & 1028) !== 0 && a !== null)
        a.return = i, Ct = a;
      else
        for (; Ct !== null; ) {
          switch (i = Ct, m = i.alternate, a = i.flags, i.tag) {
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
                  var ve = Qa(
                    l.type,
                    p
                  );
                  a = s.getSnapshotBeforeUpdate(
                    ve,
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
                  Hp(a);
                else if (l === 1)
                  switch (a.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Hp(a);
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
            a.return = i.return, Ct = a;
            break;
          }
          Ct = i.return;
        }
  }
  function b_(a, i, l) {
    var s = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Cr(a, l), s & 4 && Ul(5, l);
        break;
      case 1:
        if (Cr(a, l), s & 4)
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
        s & 64 && h_(l), s & 512 && Il(l, l.return);
        break;
      case 3:
        if (Cr(a, l), s & 64 && (a = l.updateQueue, a !== null)) {
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
            rS(a, i);
          } catch (O) {
            Xe(l, l.return, O);
          }
        }
        break;
      case 27:
        i === null && s & 4 && m_(l);
      case 26:
      case 5:
        Cr(a, l), i === null && s & 4 && v_(l), s & 512 && Il(l, l.return);
        break;
      case 12:
        Cr(a, l);
        break;
      case 31:
        Cr(a, l), s & 4 && __(a, l);
        break;
      case 13:
        Cr(a, l), s & 4 && O_(a, l), s & 64 && (a = l.memoizedState, a !== null && (a = a.dehydrated, a !== null && (l = XR.bind(
          null,
          l
        ), h3(a, l))));
        break;
      case 22:
        if (s = l.memoizedState !== null || jr, !s) {
          i = i !== null && i.memoizedState !== null || bt, p = jr;
          var m = bt;
          jr = s, (bt = i) && !m ? Dr(
            a,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Cr(a, l), jr = p, bt = m;
        }
        break;
      case 30:
        break;
      default:
        Cr(a, l);
    }
  }
  function x_(a) {
    var i = a.alternate;
    i !== null && (a.alternate = null, x_(i)), a.child = null, a.deletions = null, a.sibling = null, a.tag === 5 && (i = a.stateNode, i !== null && Vd(i)), a.stateNode = null, a.return = null, a.dependencies = null, a.memoizedProps = null, a.memoizedState = null, a.pendingProps = null, a.stateNode = null, a.updateQueue = null;
  }
  var lt = null, Zt = !1;
  function Mr(a, i, l) {
    for (l = l.child; l !== null; )
      S_(a, i, l), l = l.sibling;
  }
  function S_(a, i, l) {
    if (un && typeof un.onCommitFiberUnmount == "function")
      try {
        un.onCommitFiberUnmount(dl, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        bt || nr(l, i), Mr(
          a,
          i,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        bt || nr(l, i);
        var s = lt, p = Zt;
        ma(l.type) && (lt = l.stateNode, Zt = !1), Mr(
          a,
          i,
          l
        ), Zl(l.stateNode), lt = s, Zt = p;
        break;
      case 5:
        bt || nr(l, i);
      case 6:
        if (s = lt, p = Zt, lt = null, Mr(
          a,
          i,
          l
        ), lt = s, Zt = p, lt !== null)
          if (Zt)
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
        lt !== null && (Zt ? (a = lt, hO(
          a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a,
          l.stateNode
        ), ho(a)) : hO(lt, l.stateNode));
        break;
      case 4:
        s = lt, p = Zt, lt = l.stateNode.containerInfo, Zt = !0, Mr(
          a,
          i,
          l
        ), lt = s, Zt = p;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, l, i), bt || sa(4, l, i), Mr(
          a,
          i,
          l
        );
        break;
      case 1:
        bt || (nr(l, i), s = l.stateNode, typeof s.componentWillUnmount == "function" && p_(
          l,
          i,
          s
        )), Mr(
          a,
          i,
          l
        );
        break;
      case 21:
        Mr(
          a,
          i,
          l
        );
        break;
      case 22:
        bt = (s = bt) || l.memoizedState !== null, Mr(
          a,
          i,
          l
        ), bt = s;
        break;
      default:
        Mr(
          a,
          i,
          l
        );
    }
  }
  function __(a, i) {
    if (i.memoizedState === null && (a = i.alternate, a !== null && (a = a.memoizedState, a !== null))) {
      a = a.dehydrated;
      try {
        ho(a);
      } catch (l) {
        Xe(i, i.return, l);
      }
    }
  }
  function O_(a, i) {
    if (i.memoizedState === null && (a = i.alternate, a !== null && (a = a.memoizedState, a !== null && (a = a.dehydrated, a !== null))))
      try {
        ho(a);
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
        return i === null && (i = a.stateNode = new g_()), i;
      case 22:
        return a = a.stateNode, i = a._retryCache, i === null && (i = a._retryCache = new g_()), i;
      default:
        throw Error(r(435, a.tag));
    }
  }
  function cs(a, i) {
    var l = BR(a);
    i.forEach(function(s) {
      if (!l.has(s)) {
        l.add(s);
        var p = VR.bind(null, a, s);
        s.then(p, p);
      }
    });
  }
  function Qt(a, i) {
    var l = i.deletions;
    if (l !== null)
      for (var s = 0; s < l.length; s++) {
        var p = l[s], m = a, O = i, D = O;
        e: for (; D !== null; ) {
          switch (D.tag) {
            case 27:
              if (ma(D.type)) {
                lt = D.stateNode, Zt = !1;
                break e;
              }
              break;
            case 5:
              lt = D.stateNode, Zt = !1;
              break e;
            case 3:
            case 4:
              lt = D.stateNode.containerInfo, Zt = !0;
              break e;
          }
          D = D.return;
        }
        if (lt === null) throw Error(r(160));
        S_(m, O, p), lt = null, Zt = !1, m = p.alternate, m !== null && (m.return = null), p.return = null;
      }
    if (i.subtreeFlags & 13886)
      for (i = i.child; i !== null; )
        w_(i, a), i = i.sibling;
  }
  var Gn = null;
  function w_(a, i) {
    var l = a.alternate, s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Qt(i, a), Jt(a), s & 4 && (sa(3, a, a.return), Ul(3, a), sa(5, a, a.return));
        break;
      case 1:
        Qt(i, a), Jt(a), s & 512 && (bt || l === null || nr(l, l.return)), s & 64 && jr && (a = a.updateQueue, a !== null && (s = a.callbacks, s !== null && (l = a.shared.hiddenCallbacks, a.shared.hiddenCallbacks = l === null ? s : l.concat(s))));
        break;
      case 26:
        var p = Gn;
        if (Qt(i, a), Jt(a), s & 512 && (bt || l === null || nr(l, l.return)), s & 4) {
          var m = l !== null ? l.memoizedState : null;
          if (s = a.memoizedState, l === null)
            if (s === null)
              if (a.stateNode === null) {
                e: {
                  s = a.type, l = a.memoizedProps, p = p.ownerDocument || p;
                  t: switch (s) {
                    case "title":
                      m = p.getElementsByTagName("title")[0], (!m || m[vl] || m[Nt] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = p.createElement(s), p.head.insertBefore(
                        m,
                        p.querySelector("head > title")
                      )), qt(m, s, l), m[Nt] = a, Mt(m), s = m;
                      break e;
                    case "link":
                      var O = wO(
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
                      m = p.createElement(s), qt(m, s, l), p.head.appendChild(m);
                      break;
                    case "meta":
                      if (O = wO(
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
                      m = p.createElement(s), qt(m, s, l), p.head.appendChild(m);
                      break;
                    default:
                      throw Error(r(468, s));
                  }
                  m[Nt] = a, Mt(m), s = m;
                }
                a.stateNode = s;
              } else
                AO(
                  p,
                  a.type,
                  a.stateNode
                );
            else
              a.stateNode = OO(
                p,
                s,
                a.memoizedProps
              );
          else
            m !== s ? (m === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : m.count--, s === null ? AO(
              p,
              a.type,
              a.stateNode
            ) : OO(
              p,
              s,
              a.memoizedProps
            )) : s === null && a.stateNode !== null && vp(
              a,
              a.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Qt(i, a), Jt(a), s & 512 && (bt || l === null || nr(l, l.return)), l !== null && s & 4 && vp(
          a,
          a.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Qt(i, a), Jt(a), s & 512 && (bt || l === null || nr(l, l.return)), a.flags & 32) {
          p = a.stateNode;
          try {
            $i(p, "");
          } catch (ve) {
            Xe(a, a.return, ve);
          }
        }
        s & 4 && a.stateNode != null && (p = a.memoizedProps, vp(
          a,
          p,
          l !== null ? l.memoizedProps : p
        )), s & 1024 && (gp = !0);
        break;
      case 6:
        if (Qt(i, a), Jt(a), s & 4) {
          if (a.stateNode === null)
            throw Error(r(162));
          s = a.memoizedProps, l = a.stateNode;
          try {
            l.nodeValue = s;
          } catch (ve) {
            Xe(a, a.return, ve);
          }
        }
        break;
      case 3:
        if (As = null, p = Gn, Gn = Os(i.containerInfo), Qt(i, a), Gn = p, Jt(a), s & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ho(i.containerInfo);
          } catch (ve) {
            Xe(a, a.return, ve);
          }
        gp && (gp = !1, A_(a));
        break;
      case 4:
        s = Gn, Gn = Os(
          a.stateNode.containerInfo
        ), Qt(i, a), Jt(a), Gn = s;
        break;
      case 12:
        Qt(i, a), Jt(a);
        break;
      case 31:
        Qt(i, a), Jt(a), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, cs(a, s)));
        break;
      case 13:
        Qt(i, a), Jt(a), a.child.flags & 8192 && a.memoizedState !== null != (l !== null && l.memoizedState !== null) && (fs = _t()), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, cs(a, s)));
        break;
      case 22:
        p = a.memoizedState !== null;
        var q = l !== null && l.memoizedState !== null, W = jr, ie = bt;
        if (jr = W || p, bt = ie || q, Qt(i, a), bt = ie, jr = W, Jt(a), s & 8192)
          e: for (i = a.stateNode, i._visibility = p ? i._visibility & -2 : i._visibility | 1, p && (l === null || q || jr || bt || Ja(a)), l = null, i = a; ; ) {
            if (i.tag === 5 || i.tag === 26) {
              if (l === null) {
                q = l = i;
                try {
                  if (m = q.stateNode, p)
                    O = m.style, typeof O.setProperty == "function" ? O.setProperty("display", "none", "important") : O.display = "none";
                  else {
                    D = q.stateNode;
                    var ue = q.memoizedProps.style, Z = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
                    D.style.display = Z == null || typeof Z == "boolean" ? "" : ("" + Z).trim();
                  }
                } catch (ve) {
                  Xe(q, q.return, ve);
                }
              }
            } else if (i.tag === 6) {
              if (l === null) {
                q = i;
                try {
                  q.stateNode.nodeValue = p ? "" : q.memoizedProps;
                } catch (ve) {
                  Xe(q, q.return, ve);
                }
              }
            } else if (i.tag === 18) {
              if (l === null) {
                q = i;
                try {
                  var ne = q.stateNode;
                  p ? pO(ne, !0) : pO(q.stateNode, !1);
                } catch (ve) {
                  Xe(q, q.return, ve);
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
        s & 4 && (s = a.updateQueue, s !== null && (l = s.retryQueue, l !== null && (s.retryQueue = null, cs(a, l))));
        break;
      case 19:
        Qt(i, a), Jt(a), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, cs(a, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Qt(i, a), Jt(a);
    }
  }
  function Jt(a) {
    var i = a.flags;
    if (i & 2) {
      try {
        for (var l, s = a.return; s !== null; ) {
          if (y_(s)) {
            l = s;
            break;
          }
          s = s.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var p = l.stateNode, m = yp(a);
            us(a, m, p);
            break;
          case 5:
            var O = l.stateNode;
            l.flags & 32 && ($i(O, ""), l.flags &= -33);
            var D = yp(a);
            us(a, D, O);
            break;
          case 3:
          case 4:
            var q = l.stateNode.containerInfo, W = yp(a);
            mp(
              a,
              W,
              q
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (ie) {
        Xe(a, a.return, ie);
      }
      a.flags &= -3;
    }
    i & 4096 && (a.flags &= -4097);
  }
  function A_(a) {
    if (a.subtreeFlags & 1024)
      for (a = a.child; a !== null; ) {
        var i = a;
        A_(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), a = a.sibling;
      }
  }
  function Cr(a, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; )
        b_(a, i.alternate, i), i = i.sibling;
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
          nr(i, i.return);
          var l = i.stateNode;
          typeof l.componentWillUnmount == "function" && p_(
            i,
            i.return,
            l
          ), Ja(i);
          break;
        case 27:
          Zl(i.stateNode);
        case 26:
        case 5:
          nr(i, i.return), Ja(i);
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
  function Dr(a, i, l) {
    for (l = l && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
      var s = i.alternate, p = a, m = i, O = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Dr(
            p,
            m,
            l
          ), Ul(4, m);
          break;
        case 1:
          if (Dr(
            p,
            m,
            l
          ), s = m, p = s.stateNode, typeof p.componentDidMount == "function")
            try {
              p.componentDidMount();
            } catch (W) {
              Xe(s, s.return, W);
            }
          if (s = m, p = s.updateQueue, p !== null) {
            var D = s.stateNode;
            try {
              var q = p.shared.hiddenCallbacks;
              if (q !== null)
                for (p.shared.hiddenCallbacks = null, p = 0; p < q.length; p++)
                  nS(q[p], D);
            } catch (W) {
              Xe(s, s.return, W);
            }
          }
          l && O & 64 && h_(m), Il(m, m.return);
          break;
        case 27:
          m_(m);
        case 26:
        case 5:
          Dr(
            p,
            m,
            l
          ), l && s === null && O & 4 && v_(m), Il(m, m.return);
          break;
        case 12:
          Dr(
            p,
            m,
            l
          );
          break;
        case 31:
          Dr(
            p,
            m,
            l
          ), l && O & 4 && __(p, m);
          break;
        case 13:
          Dr(
            p,
            m,
            l
          ), l && O & 4 && O_(p, m);
          break;
        case 22:
          m.memoizedState === null && Dr(
            p,
            m,
            l
          ), Il(m, m.return);
          break;
        case 30:
          break;
        default:
          Dr(
            p,
            m,
            l
          );
      }
      i = i.sibling;
    }
  }
  function bp(a, i) {
    var l = null;
    a !== null && a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), a = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (a = i.memoizedState.cachePool.pool), a !== l && (a != null && a.refCount++, l != null && jl(l));
  }
  function xp(a, i) {
    a = null, i.alternate !== null && (a = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== a && (i.refCount++, a != null && jl(a));
  }
  function Yn(a, i, l, s) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; )
        T_(
          a,
          i,
          l,
          s
        ), i = i.sibling;
  }
  function T_(a, i, l, s) {
    var p = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Yn(
          a,
          i,
          l,
          s
        ), p & 2048 && Ul(9, i);
        break;
      case 1:
        Yn(
          a,
          i,
          l,
          s
        );
        break;
      case 3:
        Yn(
          a,
          i,
          l,
          s
        ), p & 2048 && (a = null, i.alternate !== null && (a = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== a && (i.refCount++, a != null && jl(a)));
        break;
      case 12:
        if (p & 2048) {
          Yn(
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
          } catch (q) {
            Xe(i, i.return, q);
          }
        } else
          Yn(
            a,
            i,
            l,
            s
          );
        break;
      case 31:
        Yn(
          a,
          i,
          l,
          s
        );
        break;
      case 13:
        Yn(
          a,
          i,
          l,
          s
        );
        break;
      case 23:
        break;
      case 22:
        m = i.stateNode, O = i.alternate, i.memoizedState !== null ? m._visibility & 2 ? Yn(
          a,
          i,
          l,
          s
        ) : Hl(a, i) : m._visibility & 2 ? Yn(
          a,
          i,
          l,
          s
        ) : (m._visibility |= 2, to(
          a,
          i,
          l,
          s,
          (i.subtreeFlags & 10256) !== 0 || !1
        )), p & 2048 && bp(O, i);
        break;
      case 24:
        Yn(
          a,
          i,
          l,
          s
        ), p & 2048 && xp(i.alternate, i);
        break;
      default:
        Yn(
          a,
          i,
          l,
          s
        );
    }
  }
  function to(a, i, l, s, p) {
    for (p = p && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
      var m = a, O = i, D = l, q = s, W = O.flags;
      switch (O.tag) {
        case 0:
        case 11:
        case 15:
          to(
            m,
            O,
            D,
            q,
            p
          ), Ul(8, O);
          break;
        case 23:
          break;
        case 22:
          var ie = O.stateNode;
          O.memoizedState !== null ? ie._visibility & 2 ? to(
            m,
            O,
            D,
            q,
            p
          ) : Hl(
            m,
            O
          ) : (ie._visibility |= 2, to(
            m,
            O,
            D,
            q,
            p
          )), p && W & 2048 && bp(
            O.alternate,
            O
          );
          break;
        case 24:
          to(
            m,
            O,
            D,
            q,
            p
          ), p && W & 2048 && xp(O.alternate, O);
          break;
        default:
          to(
            m,
            O,
            D,
            q,
            p
          );
      }
      i = i.sibling;
    }
  }
  function Hl(a, i) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) {
        var l = a, s = i, p = s.flags;
        switch (s.tag) {
          case 22:
            Hl(l, s), p & 2048 && bp(
              s.alternate,
              s
            );
            break;
          case 24:
            Hl(l, s), p & 2048 && xp(s.alternate, s);
            break;
          default:
            Hl(l, s);
        }
        i = i.sibling;
      }
  }
  var Gl = 8192;
  function no(a, i, l) {
    if (a.subtreeFlags & Gl)
      for (a = a.child; a !== null; )
        E_(
          a,
          i,
          l
        ), a = a.sibling;
  }
  function E_(a, i, l) {
    switch (a.tag) {
      case 26:
        no(
          a,
          i,
          l
        ), a.flags & Gl && a.memoizedState !== null && A3(
          l,
          Gn,
          a.memoizedState,
          a.memoizedProps
        );
        break;
      case 5:
        no(
          a,
          i,
          l
        );
        break;
      case 3:
      case 4:
        var s = Gn;
        Gn = Os(a.stateNode.containerInfo), no(
          a,
          i,
          l
        ), Gn = s;
        break;
      case 22:
        a.memoizedState === null && (s = a.alternate, s !== null && s.memoizedState !== null ? (s = Gl, Gl = 16777216, no(
          a,
          i,
          l
        ), Gl = s) : no(
          a,
          i,
          l
        ));
        break;
      default:
        no(
          a,
          i,
          l
        );
    }
  }
  function j_(a) {
    var i = a.alternate;
    if (i !== null && (a = i.child, a !== null)) {
      i.child = null;
      do
        i = a.sibling, a.sibling = null, a = i;
      while (a !== null);
    }
  }
  function Yl(a) {
    var i = a.deletions;
    if ((a.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l];
          Ct = s, C_(
            s,
            a
          );
        }
      j_(a);
    }
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        M_(a), a = a.sibling;
  }
  function M_(a) {
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Yl(a), a.flags & 2048 && sa(9, a, a.return);
        break;
      case 3:
        Yl(a);
        break;
      case 12:
        Yl(a);
        break;
      case 22:
        var i = a.stateNode;
        a.memoizedState !== null && i._visibility & 2 && (a.return === null || a.return.tag !== 13) ? (i._visibility &= -3, ss(a)) : Yl(a);
        break;
      default:
        Yl(a);
    }
  }
  function ss(a) {
    var i = a.deletions;
    if ((a.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l];
          Ct = s, C_(
            s,
            a
          );
        }
      j_(a);
    }
    for (a = a.child; a !== null; ) {
      switch (i = a, i.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, i, i.return), ss(i);
          break;
        case 22:
          l = i.stateNode, l._visibility & 2 && (l._visibility &= -3, ss(i));
          break;
        default:
          ss(i);
      }
      a = a.sibling;
    }
  }
  function C_(a, i) {
    for (; Ct !== null; ) {
      var l = Ct;
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
          jl(l.memoizedState.cache);
      }
      if (s = l.child, s !== null) s.return = l, Ct = s;
      else
        e: for (l = a; Ct !== null; ) {
          s = Ct;
          var p = s.sibling, m = s.return;
          if (x_(s), s === l) {
            Ct = null;
            break e;
          }
          if (p !== null) {
            p.return = m, Ct = p;
            break e;
          }
          Ct = m;
        }
    }
  }
  var LR = {
    getCacheForType: function(a) {
      var i = $t(yt), l = i.data.get(a);
      return l === void 0 && (l = a(), i.data.set(a, l)), l;
    },
    cacheSignal: function() {
      return $t(yt).controller.signal;
    }
  }, UR = typeof WeakMap == "function" ? WeakMap : Map, Ie = 0, Je = null, Pe = null, Re = 0, Ke = 0, pn = null, fa = !1, ro = !1, Sp = !1, Pr = 0, ft = 0, da = 0, ei = 0, _p = 0, vn = 0, ao = 0, Kl = null, en = null, Op = !1, fs = 0, D_ = 0, ds = 1 / 0, hs = null, ha = null, Ot = 0, pa = null, io = null, Nr = 0, wp = 0, Ap = null, P_ = null, Xl = 0, Tp = null;
  function yn() {
    return (Ie & 2) !== 0 && Re !== 0 ? Re & -Re : R.T !== null ? Pp() : V1();
  }
  function N_() {
    if (vn === 0)
      if ((Re & 536870912) === 0 || qe) {
        var a = Sc;
        Sc <<= 1, (Sc & 3932160) === 0 && (Sc = 262144), vn = a;
      } else vn = 536870912;
    return a = dn.current, a !== null && (a.flags |= 32), vn;
  }
  function tn(a, i, l) {
    (a === Je && (Ke === 2 || Ke === 9) || a.cancelPendingCommit !== null) && (oo(a, 0), va(
      a,
      Re,
      vn,
      !1
    )), pl(a, l), ((Ie & 2) === 0 || a !== Je) && (a === Je && ((Ie & 2) === 0 && (ei |= l), ft === 4 && va(
      a,
      Re,
      vn,
      !1
    )), rr(a));
  }
  function R_(a, i, l) {
    if ((Ie & 6) !== 0) throw Error(r(327));
    var s = !l && (i & 127) === 0 && (i & a.expiredLanes) === 0 || hl(a, i), p = s ? GR(a, i) : jp(a, i, !0), m = s;
    do {
      if (p === 0) {
        ro && !s && va(a, i, 0, !1);
        break;
      } else {
        if (l = a.current.alternate, m && !IR(l)) {
          p = jp(a, i, !1), m = !1;
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
              p = Kl;
              var q = D.current.memoizedState.isDehydrated;
              if (q && (oo(D, O).flags |= 256), O = jp(
                D,
                O,
                !1
              ), O !== 2) {
                if (Sp && !q) {
                  D.errorRecoveryDisabledLanes |= m, ei |= m, p = 4;
                  break e;
                }
                m = en, en = p, m !== null && (en === null ? en = m : en.push.apply(
                  en,
                  m
                ));
              }
              p = O;
            }
            if (m = !1, p !== 2) continue;
          }
        }
        if (p === 1) {
          oo(a, 0), va(a, i, 0, !0);
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
                vn,
                !fa
              );
              break e;
            case 2:
              en = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((i & 62914560) === i && (p = fs + 300 - _t(), 10 < p)) {
            if (va(
              s,
              i,
              vn,
              !fa
            ), Oc(s, 0, !0) !== 0) break e;
            Nr = i, s.timeoutHandle = fO(
              $_.bind(
                null,
                s,
                l,
                en,
                hs,
                Op,
                i,
                vn,
                ei,
                ao,
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
          $_(
            s,
            l,
            en,
            hs,
            Op,
            i,
            vn,
            ei,
            ao,
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
    rr(a);
  }
  function $_(a, i, l, s, p, m, O, D, q, W, ie, ue, Z, ne) {
    if (a.timeoutHandle = -1, ue = i.subtreeFlags, ue & 8192 || (ue & 16785408) === 16785408) {
      ue = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: gr
      }, E_(
        i,
        m,
        ue
      );
      var ve = (m & 62914560) === m ? fs - _t() : (m & 4194048) === m ? D_ - _t() : 0;
      if (ve = T3(
        ue,
        ve
      ), ve !== null) {
        Nr = m, a.cancelPendingCommit = ve(
          H_.bind(
            null,
            a,
            i,
            m,
            l,
            s,
            p,
            O,
            D,
            q,
            ie,
            ue,
            null,
            Z,
            ne
          )
        ), va(a, m, O, !W);
        return;
      }
    }
    H_(
      a,
      i,
      m,
      l,
      s,
      p,
      O,
      D,
      q
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
            if (!sn(m(), p)) return !1;
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
    i &= ~_p, i &= ~ei, a.suspendedLanes |= i, a.pingedLanes &= ~i, s && (a.warmLanes |= i), s = a.expirationTimes;
    for (var p = i; 0 < p; ) {
      var m = 31 - cn(p), O = 1 << m;
      s[m] = -1, p &= ~O;
    }
    l !== 0 && Y1(a, l, i);
  }
  function ps() {
    return (Ie & 6) === 0 ? (Vl(0), !1) : !0;
  }
  function Ep() {
    if (Pe !== null) {
      if (Ke === 0)
        var a = Pe.return;
      else
        a = Pe, _r = Ya = null, Hh(a), Wi = null, Cl = 0, a = Pe;
      for (; a !== null; )
        d_(a.alternate, a), a = a.return;
      Pe = null;
    }
  }
  function oo(a, i) {
    var l = a.timeoutHandle;
    l !== -1 && (a.timeoutHandle = -1, u3(l)), l = a.cancelPendingCommit, l !== null && (a.cancelPendingCommit = null, l()), Nr = 0, Ep(), Je = a, Pe = l = xr(a.current, null), Re = i, Ke = 0, pn = null, fa = !1, ro = hl(a, i), Sp = !1, ao = vn = _p = ei = da = ft = 0, en = Kl = null, Op = !1, (i & 8) !== 0 && (i |= i & 32);
    var s = a.entangledLanes;
    if (s !== 0)
      for (a = a.entanglements, s &= i; 0 < s; ) {
        var p = 31 - cn(s), m = 1 << p;
        i |= a[p], s &= ~m;
      }
    return Pr = i, $c(), l;
  }
  function z_(a, i) {
    je = null, R.H = kl, i === Fi || i === Hc ? (i = Qx(), Ke = 3) : i === Dh ? (i = Qx(), Ke = 4) : Ke = i === ip ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1, pn = i, Pe === null && (ft = 1, rs(
      a,
      En(i, a.current)
    ));
  }
  function q_() {
    var a = dn.current;
    return a === null ? !0 : (Re & 4194048) === Re ? Dn === null : (Re & 62914560) === Re || (Re & 536870912) !== 0 ? a === Dn : !1;
  }
  function k_() {
    var a = R.H;
    return R.H = kl, a === null ? kl : a;
  }
  function B_() {
    var a = R.A;
    return R.A = LR, a;
  }
  function vs() {
    ft = 4, fa || (Re & 4194048) !== Re && dn.current !== null || (ro = !0), (da & 134217727) === 0 && (ei & 134217727) === 0 || Je === null || va(
      Je,
      Re,
      vn,
      !1
    );
  }
  function jp(a, i, l) {
    var s = Ie;
    Ie |= 2;
    var p = k_(), m = B_();
    (Je !== a || Re !== i) && (hs = null, oo(a, i)), i = !1;
    var O = ft;
    e: do
      try {
        if (Ke !== 0 && Pe !== null) {
          var D = Pe, q = pn;
          switch (Ke) {
            case 8:
              Ep(), O = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              dn.current === null && (i = !0);
              var W = Ke;
              if (Ke = 0, pn = null, lo(a, D, q, W), l && ro) {
                O = 0;
                break e;
              }
              break;
            default:
              W = Ke, Ke = 0, pn = null, lo(a, D, q, W);
          }
        }
        HR(), O = ft;
        break;
      } catch (ie) {
        z_(a, ie);
      }
    while (!0);
    return i && a.shellSuspendCounter++, _r = Ya = null, Ie = s, R.H = p, R.A = m, Pe === null && (Je = null, Re = 0, $c()), O;
  }
  function HR() {
    for (; Pe !== null; ) L_(Pe);
  }
  function GR(a, i) {
    var l = Ie;
    Ie |= 2;
    var s = k_(), p = B_();
    Je !== a || Re !== i ? (hs = null, ds = _t() + 500, oo(a, i)) : ro = hl(
      a,
      i
    );
    e: do
      try {
        if (Ke !== 0 && Pe !== null) {
          i = Pe;
          var m = pn;
          t: switch (Ke) {
            case 1:
              Ke = 0, pn = null, lo(a, i, m, 1);
              break;
            case 2:
            case 9:
              if (Wx(m)) {
                Ke = 0, pn = null, U_(i);
                break;
              }
              i = function() {
                Ke !== 2 && Ke !== 9 || Je !== a || (Ke = 7), rr(a);
              }, m.then(i, i);
              break e;
            case 3:
              Ke = 7;
              break e;
            case 4:
              Ke = 5;
              break e;
            case 7:
              Wx(m) ? (Ke = 0, pn = null, U_(i)) : (Ke = 0, pn = null, lo(a, i, m, 7));
              break;
            case 5:
              var O = null;
              switch (Pe.tag) {
                case 26:
                  O = Pe.memoizedState;
                case 5:
                case 27:
                  var D = Pe;
                  if (O ? TO(O) : D.stateNode.complete) {
                    Ke = 0, pn = null;
                    var q = D.sibling;
                    if (q !== null) Pe = q;
                    else {
                      var W = D.return;
                      W !== null ? (Pe = W, ys(W)) : Pe = null;
                    }
                    break t;
                  }
              }
              Ke = 0, pn = null, lo(a, i, m, 5);
              break;
            case 6:
              Ke = 0, pn = null, lo(a, i, m, 6);
              break;
            case 8:
              Ep(), ft = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        YR();
        break;
      } catch (ie) {
        z_(a, ie);
      }
    while (!0);
    return _r = Ya = null, R.H = s, R.A = p, Ie = l, Pe !== null ? 0 : (Je = null, Re = 0, $c(), ft);
  }
  function YR() {
    for (; Pe !== null && !ln(); )
      L_(Pe);
  }
  function L_(a) {
    var i = s_(a.alternate, a, Pr);
    a.memoizedProps = a.pendingProps, i === null ? ys(a) : Pe = i;
  }
  function U_(a) {
    var i = a, l = i.alternate;
    switch (i.tag) {
      case 15:
      case 0:
        i = a_(
          l,
          i,
          i.pendingProps,
          i.type,
          void 0,
          Re
        );
        break;
      case 11:
        i = a_(
          l,
          i,
          i.pendingProps,
          i.type.render,
          i.ref,
          Re
        );
        break;
      case 5:
        Hh(i);
      default:
        d_(l, i), i = Pe = Bx(i, Pr), i = s_(l, i, Pr);
    }
    a.memoizedProps = a.pendingProps, i === null ? ys(a) : Pe = i;
  }
  function lo(a, i, l, s) {
    _r = Ya = null, Hh(i), Wi = null, Cl = 0;
    var p = i.return;
    try {
      if (NR(
        a,
        p,
        i,
        l,
        Re
      )) {
        ft = 1, rs(
          a,
          En(l, a.current)
        ), Pe = null;
        return;
      }
    } catch (m) {
      if (p !== null) throw Pe = p, m;
      ft = 1, rs(
        a,
        En(l, a.current)
      ), Pe = null;
      return;
    }
    i.flags & 32768 ? (qe || s === 1 ? a = !0 : ro || (Re & 536870912) !== 0 ? a = !1 : (fa = a = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = dn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), I_(i, a)) : ys(i);
  }
  function ys(a) {
    var i = a;
    do {
      if ((i.flags & 32768) !== 0) {
        I_(
          i,
          fa
        );
        return;
      }
      a = i.return;
      var l = zR(
        i.alternate,
        i,
        Pr
      );
      if (l !== null) {
        Pe = l;
        return;
      }
      if (i = i.sibling, i !== null) {
        Pe = i;
        return;
      }
      Pe = i = a;
    } while (i !== null);
    ft === 0 && (ft = 5);
  }
  function I_(a, i) {
    do {
      var l = qR(a.alternate, a);
      if (l !== null) {
        l.flags &= 32767, Pe = l;
        return;
      }
      if (l = a.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !i && (a = a.sibling, a !== null)) {
        Pe = a;
        return;
      }
      Pe = a = l;
    } while (a !== null);
    ft = 6, Pe = null;
  }
  function H_(a, i, l, s, p, m, O, D, q) {
    a.cancelPendingCommit = null;
    do
      ms();
    while (Ot !== 0);
    if ((Ie & 6) !== 0) throw Error(r(327));
    if (i !== null) {
      if (i === a.current) throw Error(r(177));
      if (m = i.lanes | i.childLanes, m |= yh, wN(
        a,
        l,
        m,
        O,
        D,
        q
      ), a === Je && (Pe = Je = null, Re = 0), io = i, pa = a, Nr = l, wp = m, Ap = p, P_ = s, (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? (a.callbackNode = null, a.callbackPriority = 0, FR(bc, function() {
        return V_(), null;
      })) : (a.callbackNode = null, a.callbackPriority = 0), s = (i.flags & 13878) !== 0, (i.subtreeFlags & 13878) !== 0 || s) {
        s = R.T, R.T = null, p = Y.p, Y.p = 2, O = Ie, Ie |= 4;
        try {
          kR(a, i, l);
        } finally {
          Ie = O, Y.p = p, R.T = s;
        }
      }
      Ot = 1, G_(), Y_(), K_();
    }
  }
  function G_() {
    if (Ot === 1) {
      Ot = 0;
      var a = pa, i = io, l = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || l) {
        l = R.T, R.T = null;
        var s = Y.p;
        Y.p = 2;
        var p = Ie;
        Ie |= 4;
        try {
          w_(i, a);
          var m = Lp, O = Cx(a.containerInfo), D = m.focusedElem, q = m.selectionRange;
          if (O !== D && D && D.ownerDocument && Mx(
            D.ownerDocument.documentElement,
            D
          )) {
            if (q !== null && fh(D)) {
              var W = q.start, ie = q.end;
              if (ie === void 0 && (ie = W), "selectionStart" in D)
                D.selectionStart = W, D.selectionEnd = Math.min(
                  ie,
                  D.value.length
                );
              else {
                var ue = D.ownerDocument || document, Z = ue && ue.defaultView || window;
                if (Z.getSelection) {
                  var ne = Z.getSelection(), ve = D.textContent.length, Se = Math.min(q.start, ve), We = q.end === void 0 ? Se : Math.min(q.end, ve);
                  !ne.extend && Se > We && (O = We, We = Se, Se = O);
                  var X = jx(
                    D,
                    Se
                  ), H = jx(
                    D,
                    We
                  );
                  if (X && H && (ne.rangeCount !== 1 || ne.anchorNode !== X.node || ne.anchorOffset !== X.offset || ne.focusNode !== H.node || ne.focusOffset !== H.offset)) {
                    var F = ue.createRange();
                    F.setStart(X.node, X.offset), ne.removeAllRanges(), Se > We ? (ne.addRange(F), ne.extend(H.node, H.offset)) : (F.setEnd(H.node, H.offset), ne.addRange(F));
                  }
                }
              }
            }
            for (ue = [], ne = D; ne = ne.parentNode; )
              ne.nodeType === 1 && ue.push({
                element: ne,
                left: ne.scrollLeft,
                top: ne.scrollTop
              });
            for (typeof D.focus == "function" && D.focus(), D = 0; D < ue.length; D++) {
              var le = ue[D];
              le.element.scrollLeft = le.left, le.element.scrollTop = le.top;
            }
          }
          Ms = !!Bp, Lp = Bp = null;
        } finally {
          Ie = p, Y.p = s, R.T = l;
        }
      }
      a.current = i, Ot = 2;
    }
  }
  function Y_() {
    if (Ot === 2) {
      Ot = 0;
      var a = pa, i = io, l = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || l) {
        l = R.T, R.T = null;
        var s = Y.p;
        Y.p = 2;
        var p = Ie;
        Ie |= 4;
        try {
          b_(a, i.alternate, i);
        } finally {
          Ie = p, Y.p = s, R.T = l;
        }
      }
      Ot = 3;
    }
  }
  function K_() {
    if (Ot === 4 || Ot === 3) {
      Ot = 0, In();
      var a = pa, i = io, l = Nr, s = P_;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? Ot = 5 : (Ot = 0, io = pa = null, X_(a, a.pendingLanes));
      var p = a.pendingLanes;
      if (p === 0 && (ha = null), Kd(l), i = i.stateNode, un && typeof un.onCommitFiberRoot == "function")
        try {
          un.onCommitFiberRoot(
            dl,
            i,
            void 0,
            (i.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        i = R.T, p = Y.p, Y.p = 2, R.T = null;
        try {
          for (var m = a.onRecoverableError, O = 0; O < s.length; O++) {
            var D = s[O];
            m(D.value, {
              componentStack: D.stack
            });
          }
        } finally {
          R.T = i, Y.p = p;
        }
      }
      (Nr & 3) !== 0 && ms(), rr(a), p = a.pendingLanes, (l & 261930) !== 0 && (p & 42) !== 0 ? a === Tp ? Xl++ : (Xl = 0, Tp = a) : Xl = 0, Vl(0);
    }
  }
  function X_(a, i) {
    (a.pooledCacheLanes &= i) === 0 && (i = a.pooledCache, i != null && (a.pooledCache = null, jl(i)));
  }
  function ms() {
    return G_(), Y_(), K_(), V_();
  }
  function V_() {
    if (Ot !== 5) return !1;
    var a = pa, i = wp;
    wp = 0;
    var l = Kd(Nr), s = R.T, p = Y.p;
    try {
      Y.p = 32 > l ? 32 : l, R.T = null, l = Ap, Ap = null;
      var m = pa, O = Nr;
      if (Ot = 0, io = pa = null, Nr = 0, (Ie & 6) !== 0) throw Error(r(331));
      var D = Ie;
      if (Ie |= 4, M_(m.current), T_(
        m,
        m.current,
        O,
        l
      ), Ie = D, Vl(0, !1), un && typeof un.onPostCommitFiberRoot == "function")
        try {
          un.onPostCommitFiberRoot(dl, m);
        } catch {
        }
      return !0;
    } finally {
      Y.p = p, R.T = s, X_(a, i);
    }
  }
  function F_(a, i, l) {
    i = En(l, i), i = ap(a.stateNode, i, 2), a = la(a, i, 2), a !== null && (pl(a, 2), rr(a));
  }
  function Xe(a, i, l) {
    if (a.tag === 3)
      F_(a, a, l);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          F_(
            i,
            a,
            l
          );
          break;
        } else if (i.tag === 1) {
          var s = i.stateNode;
          if (typeof i.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (ha === null || !ha.has(s))) {
            a = En(l, a), l = WS(2), s = la(i, l, 2), s !== null && (ZS(
              l,
              s,
              i,
              a
            ), pl(s, 2), rr(s));
            break;
          }
        }
        i = i.return;
      }
  }
  function Mp(a, i, l) {
    var s = a.pingCache;
    if (s === null) {
      s = a.pingCache = new UR();
      var p = /* @__PURE__ */ new Set();
      s.set(i, p);
    } else
      p = s.get(i), p === void 0 && (p = /* @__PURE__ */ new Set(), s.set(i, p));
    p.has(l) || (Sp = !0, p.add(l), a = KR.bind(null, a, i, l), i.then(a, a));
  }
  function KR(a, i, l) {
    var s = a.pingCache;
    s !== null && s.delete(i), a.pingedLanes |= a.suspendedLanes & l, a.warmLanes &= ~l, Je === a && (Re & l) === l && (ft === 4 || ft === 3 && (Re & 62914560) === Re && 300 > _t() - fs ? (Ie & 2) === 0 && oo(a, 0) : _p |= l, ao === Re && (ao = 0)), rr(a);
  }
  function W_(a, i) {
    i === 0 && (i = G1()), a = Ia(a, i), a !== null && (pl(a, i), rr(a));
  }
  function XR(a) {
    var i = a.memoizedState, l = 0;
    i !== null && (l = i.retryLane), W_(a, l);
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
    s !== null && s.delete(i), W_(a, l);
  }
  function FR(a, i) {
    return On(a, i);
  }
  var gs = null, uo = null, Cp = !1, bs = !1, Dp = !1, ya = 0;
  function rr(a) {
    a !== uo && a.next === null && (uo === null ? gs = uo = a : uo = uo.next = a), bs = !0, Cp || (Cp = !0, ZR());
  }
  function Vl(a, i) {
    if (!Dp && bs) {
      Dp = !0;
      do
        for (var l = !1, s = gs; s !== null; ) {
          if (a !== 0) {
            var p = s.pendingLanes;
            if (p === 0) var m = 0;
            else {
              var O = s.suspendedLanes, D = s.pingedLanes;
              m = (1 << 31 - cn(42 | a) + 1) - 1, m &= p & ~(O & ~D), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (l = !0, eO(s, m));
          } else
            m = Re, m = Oc(
              s,
              s === Je ? m : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (m & 3) === 0 || hl(s, m) || (l = !0, eO(s, m));
          s = s.next;
        }
      while (l);
      Dp = !1;
    }
  }
  function WR() {
    Z_();
  }
  function Z_() {
    bs = Cp = !1;
    var a = 0;
    ya !== 0 && l3() && (a = ya);
    for (var i = _t(), l = null, s = gs; s !== null; ) {
      var p = s.next, m = Q_(s, i);
      m === 0 ? (s.next = null, l === null ? gs = p : l.next = p, p === null && (uo = l)) : (l = s, (a !== 0 || (m & 3) !== 0) && (bs = !0)), s = p;
    }
    Ot !== 0 && Ot !== 5 || Vl(a), ya !== 0 && (ya = 0);
  }
  function Q_(a, i) {
    for (var l = a.suspendedLanes, s = a.pingedLanes, p = a.expirationTimes, m = a.pendingLanes & -62914561; 0 < m; ) {
      var O = 31 - cn(m), D = 1 << O, q = p[O];
      q === -1 ? ((D & l) === 0 || (D & s) !== 0) && (p[O] = ON(D, i)) : q <= i && (a.expiredLanes |= D), m &= ~D;
    }
    if (i = Je, l = Re, l = Oc(
      a,
      a === i ? l : 0,
      a.cancelPendingCommit !== null || a.timeoutHandle !== -1
    ), s = a.callbackNode, l === 0 || a === i && (Ke === 2 || Ke === 9) || a.cancelPendingCommit !== null)
      return s !== null && s !== null && Kt(s), a.callbackNode = null, a.callbackPriority = 0;
    if ((l & 3) === 0 || hl(a, l)) {
      if (i = l & -l, i === a.callbackPriority) return i;
      switch (s !== null && Kt(s), Kd(l)) {
        case 2:
        case 8:
          l = I1;
          break;
        case 32:
          l = bc;
          break;
        case 268435456:
          l = H1;
          break;
        default:
          l = bc;
      }
      return s = J_.bind(null, a), l = On(l, s), a.callbackPriority = i, a.callbackNode = l, i;
    }
    return s !== null && s !== null && Kt(s), a.callbackPriority = 2, a.callbackNode = null, 2;
  }
  function J_(a, i) {
    if (Ot !== 0 && Ot !== 5)
      return a.callbackNode = null, a.callbackPriority = 0, null;
    var l = a.callbackNode;
    if (ms() && a.callbackNode !== l)
      return null;
    var s = Re;
    return s = Oc(
      a,
      a === Je ? s : 0,
      a.cancelPendingCommit !== null || a.timeoutHandle !== -1
    ), s === 0 ? null : (R_(a, s, i), Q_(a, _t()), a.callbackNode != null && a.callbackNode === l ? J_.bind(null, a) : null);
  }
  function eO(a, i) {
    if (ms()) return null;
    R_(a, i, !0);
  }
  function ZR() {
    c3(function() {
      (Ie & 6) !== 0 ? On(
        U1,
        WR
      ) : Z_();
    });
  }
  function Pp() {
    if (ya === 0) {
      var a = Xi;
      a === 0 && (a = xc, xc <<= 1, (xc & 261888) === 0 && (xc = 256)), ya = a;
    }
    return ya;
  }
  function tO(a) {
    return a == null || typeof a == "symbol" || typeof a == "boolean" ? null : typeof a == "function" ? a : Ec("" + a);
  }
  function nO(a, i) {
    var l = i.ownerDocument.createElement("input");
    return l.name = i.name, l.value = i.value, a.id && l.setAttribute("form", a.id), i.parentNode.insertBefore(l, i), a = new FormData(a), l.parentNode.removeChild(l), a;
  }
  function QR(a, i, l, s, p) {
    if (i === "submit" && l && l.stateNode === p) {
      var m = tO(
        (p[Ft] || null).action
      ), O = s.submitter;
      O && (i = (i = O[Ft] || null) ? tO(i.formAction) : O.getAttribute("formAction"), i !== null && (m = i, O = null));
      var D = new Dc(
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
                  var q = O ? nO(p, O) : new FormData(p);
                  Qh(
                    l,
                    {
                      pending: !0,
                      data: q,
                      method: p.method,
                      action: m
                    },
                    null,
                    q
                  );
                }
              } else
                typeof m == "function" && (D.preventDefault(), q = O ? nO(p, O) : new FormData(p), Qh(
                  l,
                  {
                    pending: !0,
                    data: q,
                    method: p.method,
                    action: m
                  },
                  m,
                  q
                ));
            },
            currentTarget: p
          }
        ]
      });
    }
  }
  for (var Np = 0; Np < vh.length; Np++) {
    var Rp = vh[Np], JR = Rp.toLowerCase(), e3 = Rp[0].toUpperCase() + Rp.slice(1);
    Hn(
      JR,
      "on" + e3
    );
  }
  Hn(Nx, "onAnimationEnd"), Hn(Rx, "onAnimationIteration"), Hn($x, "onAnimationStart"), Hn("dblclick", "onDoubleClick"), Hn("focusin", "onFocus"), Hn("focusout", "onBlur"), Hn(yR, "onTransitionRun"), Hn(mR, "onTransitionStart"), Hn(gR, "onTransitionCancel"), Hn(zx, "onTransitionEnd"), Ni("onMouseEnter", ["mouseout", "mouseover"]), Ni("onMouseLeave", ["mouseout", "mouseover"]), Ni("onPointerEnter", ["pointerout", "pointerover"]), Ni("onPointerLeave", ["pointerout", "pointerover"]), ka(
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
  var Fl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), t3 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fl)
  );
  function rO(a, i) {
    i = (i & 4) !== 0;
    for (var l = 0; l < a.length; l++) {
      var s = a[l], p = s.event;
      s = s.listeners;
      e: {
        var m = void 0;
        if (i)
          for (var O = s.length - 1; 0 <= O; O--) {
            var D = s[O], q = D.instance, W = D.currentTarget;
            if (D = D.listener, q !== m && p.isPropagationStopped())
              break e;
            m = D, p.currentTarget = W;
            try {
              m(p);
            } catch (ie) {
              Rc(ie);
            }
            p.currentTarget = null, m = q;
          }
        else
          for (O = 0; O < s.length; O++) {
            if (D = s[O], q = D.instance, W = D.currentTarget, D = D.listener, q !== m && p.isPropagationStopped())
              break e;
            m = D, p.currentTarget = W;
            try {
              m(p);
            } catch (ie) {
              Rc(ie);
            }
            p.currentTarget = null, m = q;
          }
      }
    }
  }
  function Ne(a, i) {
    var l = i[Xd];
    l === void 0 && (l = i[Xd] = /* @__PURE__ */ new Set());
    var s = a + "__bubble";
    l.has(s) || (aO(i, a, 2, !1), l.add(s));
  }
  function $p(a, i, l) {
    var s = 0;
    i && (s |= 4), aO(
      l,
      a,
      s,
      i
    );
  }
  var xs = "_reactListening" + Math.random().toString(36).slice(2);
  function zp(a) {
    if (!a[xs]) {
      a[xs] = !0, Z1.forEach(function(l) {
        l !== "selectionchange" && (t3.has(l) || $p(l, !1, a), $p(l, !0, a));
      });
      var i = a.nodeType === 9 ? a : a.ownerDocument;
      i === null || i[xs] || (i[xs] = !0, $p("selectionchange", !1, i));
    }
  }
  function aO(a, i, l, s) {
    switch (NO(i)) {
      case 2:
        var p = M3;
        break;
      case 8:
        p = C3;
        break;
      default:
        p = Zp;
    }
    l = p.bind(
      null,
      i,
      l,
      a
    ), p = void 0, !nh || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (p = !0), s ? p !== void 0 ? a.addEventListener(i, l, {
      capture: !0,
      passive: p
    }) : a.addEventListener(i, l, !0) : p !== void 0 ? a.addEventListener(i, l, {
      passive: p
    }) : a.addEventListener(i, l, !1);
  }
  function qp(a, i, l, s, p) {
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
              var q = O.tag;
              if ((q === 3 || q === 4) && O.stateNode.containerInfo === p)
                return;
              O = O.return;
            }
          for (; D !== null; ) {
            if (O = Ci(D), O === null) return;
            if (q = O.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              s = m = O;
              continue e;
            }
            D = D.parentNode;
          }
        }
        s = s.return;
      }
    cx(function() {
      var W = m, ie = eh(l), ue = [];
      e: {
        var Z = qx.get(a);
        if (Z !== void 0) {
          var ne = Dc, ve = a;
          switch (a) {
            case "keypress":
              if (Mc(l) === 0) break e;
            case "keydown":
            case "keyup":
              ne = VN;
              break;
            case "focusin":
              ve = "focus", ne = oh;
              break;
            case "focusout":
              ve = "blur", ne = oh;
              break;
            case "beforeblur":
            case "afterblur":
              ne = oh;
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
              ne = dx;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ne = zN;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ne = ZN;
              break;
            case Nx:
            case Rx:
            case $x:
              ne = BN;
              break;
            case zx:
              ne = JN;
              break;
            case "scroll":
            case "scrollend":
              ne = RN;
              break;
            case "wheel":
              ne = tR;
              break;
            case "copy":
            case "cut":
            case "paste":
              ne = UN;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ne = px;
              break;
            case "toggle":
            case "beforetoggle":
              ne = rR;
          }
          var Se = (i & 4) !== 0, We = !Se && (a === "scroll" || a === "scrollend"), X = Se ? Z !== null ? Z + "Capture" : null : Z;
          Se = [];
          for (var H = W, F; H !== null; ) {
            var le = H;
            if (F = le.stateNode, le = le.tag, le !== 5 && le !== 26 && le !== 27 || F === null || X === null || (le = ml(H, X), le != null && Se.push(
              Wl(H, le, F)
            )), We) break;
            H = H.return;
          }
          0 < Se.length && (Z = new ne(
            Z,
            ve,
            null,
            l,
            ie
          ), ue.push({ event: Z, listeners: Se }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (Z = a === "mouseover" || a === "pointerover", ne = a === "mouseout" || a === "pointerout", Z && l !== Jd && (ve = l.relatedTarget || l.fromElement) && (Ci(ve) || ve[Mi]))
            break e;
          if ((ne || Z) && (Z = ie.window === ie ? ie : (Z = ie.ownerDocument) ? Z.defaultView || Z.parentWindow : window, ne ? (ve = l.relatedTarget || l.toElement, ne = W, ve = ve ? Ci(ve) : null, ve !== null && (We = u(ve), Se = ve.tag, ve !== We || Se !== 5 && Se !== 27 && Se !== 6) && (ve = null)) : (ne = null, ve = W), ne !== ve)) {
            if (Se = dx, le = "onMouseLeave", X = "onMouseEnter", H = "mouse", (a === "pointerout" || a === "pointerover") && (Se = px, le = "onPointerLeave", X = "onPointerEnter", H = "pointer"), We = ne == null ? Z : yl(ne), F = ve == null ? Z : yl(ve), Z = new Se(
              le,
              H + "leave",
              ne,
              l,
              ie
            ), Z.target = We, Z.relatedTarget = F, le = null, Ci(ie) === W && (Se = new Se(
              X,
              H + "enter",
              ve,
              l,
              ie
            ), Se.target = F, Se.relatedTarget = We, le = Se), We = le, ne && ve)
              t: {
                for (Se = n3, X = ne, H = ve, F = 0, le = X; le; le = Se(le))
                  F++;
                le = 0;
                for (var be = H; be; be = Se(be))
                  le++;
                for (; 0 < F - le; )
                  X = Se(X), F--;
                for (; 0 < le - F; )
                  H = Se(H), le--;
                for (; F--; ) {
                  if (X === H || H !== null && X === H.alternate) {
                    Se = X;
                    break t;
                  }
                  X = Se(X), H = Se(H);
                }
                Se = null;
              }
            else Se = null;
            ne !== null && iO(
              ue,
              Z,
              ne,
              Se,
              !1
            ), ve !== null && We !== null && iO(
              ue,
              We,
              ve,
              Se,
              !0
            );
          }
        }
        e: {
          if (Z = W ? yl(W) : window, ne = Z.nodeName && Z.nodeName.toLowerCase(), ne === "select" || ne === "input" && Z.type === "file")
            var Be = _x;
          else if (xx(Z))
            if (Ox)
              Be = hR;
            else {
              Be = fR;
              var me = sR;
            }
          else
            ne = Z.nodeName, !ne || ne.toLowerCase() !== "input" || Z.type !== "checkbox" && Z.type !== "radio" ? W && Qd(W.elementType) && (Be = _x) : Be = dR;
          if (Be && (Be = Be(a, W))) {
            Sx(
              ue,
              Be,
              l,
              ie
            );
            break e;
          }
          me && me(a, Z, W), a === "focusout" && W && Z.type === "number" && W.memoizedProps.value != null && Zd(Z, "number", Z.value);
        }
        switch (me = W ? yl(W) : window, a) {
          case "focusin":
            (xx(me) || me.contentEditable === "true") && (Bi = me, dh = W, Al = null);
            break;
          case "focusout":
            Al = dh = Bi = null;
            break;
          case "mousedown":
            hh = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hh = !1, Dx(ue, l, ie);
            break;
          case "selectionchange":
            if (vR) break;
          case "keydown":
          case "keyup":
            Dx(ue, l, ie);
        }
        var Me;
        if (uh)
          e: {
            switch (a) {
              case "compositionstart":
                var $e = "onCompositionStart";
                break e;
              case "compositionend":
                $e = "onCompositionEnd";
                break e;
              case "compositionupdate":
                $e = "onCompositionUpdate";
                break e;
            }
            $e = void 0;
          }
        else
          ki ? gx(a, l) && ($e = "onCompositionEnd") : a === "keydown" && l.keyCode === 229 && ($e = "onCompositionStart");
        $e && (vx && l.locale !== "ko" && (ki || $e !== "onCompositionStart" ? $e === "onCompositionEnd" && ki && (Me = sx()) : (ea = ie, rh = "value" in ea ? ea.value : ea.textContent, ki = !0)), me = Ss(W, $e), 0 < me.length && ($e = new hx(
          $e,
          a,
          null,
          l,
          ie
        ), ue.push({ event: $e, listeners: me }), Me ? $e.data = Me : (Me = bx(l), Me !== null && ($e.data = Me)))), (Me = iR ? oR(a, l) : lR(a, l)) && ($e = Ss(W, "onBeforeInput"), 0 < $e.length && (me = new hx(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ie
        ), ue.push({
          event: me,
          listeners: $e
        }), me.data = Me)), QR(
          ue,
          a,
          W,
          l,
          ie
        );
      }
      rO(ue, i);
    });
  }
  function Wl(a, i, l) {
    return {
      instance: a,
      listener: i,
      currentTarget: l
    };
  }
  function Ss(a, i) {
    for (var l = i + "Capture", s = []; a !== null; ) {
      var p = a, m = p.stateNode;
      if (p = p.tag, p !== 5 && p !== 26 && p !== 27 || m === null || (p = ml(a, l), p != null && s.unshift(
        Wl(a, p, m)
      ), p = ml(a, i), p != null && s.push(
        Wl(a, p, m)
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
  function iO(a, i, l, s, p) {
    for (var m = i._reactName, O = []; l !== null && l !== s; ) {
      var D = l, q = D.alternate, W = D.stateNode;
      if (D = D.tag, q !== null && q === s) break;
      D !== 5 && D !== 26 && D !== 27 || W === null || (q = W, p ? (W = ml(l, m), W != null && O.unshift(
        Wl(l, W, q)
      )) : p || (W = ml(l, m), W != null && O.push(
        Wl(l, W, q)
      ))), l = l.return;
    }
    O.length !== 0 && a.push({ event: i, listeners: O });
  }
  var r3 = /\r\n?/g, a3 = /\u0000|\uFFFD/g;
  function oO(a) {
    return (typeof a == "string" ? a : "" + a).replace(r3, `
`).replace(a3, "");
  }
  function lO(a, i) {
    return i = oO(i), oO(a) === i;
  }
  function Fe(a, i, l, s, p, m) {
    switch (l) {
      case "children":
        typeof s == "string" ? i === "body" || i === "textarea" && s === "" || $i(a, s) : (typeof s == "number" || typeof s == "bigint") && i !== "body" && $i(a, "" + s);
        break;
      case "className":
        Ac(a, "class", s);
        break;
      case "tabIndex":
        Ac(a, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ac(a, l, s);
        break;
      case "style":
        lx(a, s, m);
        break;
      case "data":
        if (i !== "object") {
          Ac(a, "data", s);
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
        s = Ec("" + s), a.setAttribute(l, s);
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
        s = Ec("" + s), a.setAttribute(l, s);
        break;
      case "onClick":
        s != null && (a.onclick = gr);
        break;
      case "onScroll":
        s != null && Ne("scroll", a);
        break;
      case "onScrollEnd":
        s != null && Ne("scrollend", a);
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
        l = Ec("" + s), a.setAttributeNS(
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
        Ne("beforetoggle", a), Ne("toggle", a), wc(a, "popover", s);
        break;
      case "xlinkActuate":
        mr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        mr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        mr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        mr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        mr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        mr(
          a,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        mr(
          a,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        mr(
          a,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        mr(
          a,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          s
        );
        break;
      case "is":
        wc(a, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = PN.get(l) || l, wc(a, l, s));
    }
  }
  function kp(a, i, l, s, p, m) {
    switch (l) {
      case "style":
        lx(a, s, m);
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
        typeof s == "string" ? $i(a, s) : (typeof s == "number" || typeof s == "bigint") && $i(a, "" + s);
        break;
      case "onScroll":
        s != null && Ne("scroll", a);
        break;
      case "onScrollEnd":
        s != null && Ne("scrollend", a);
        break;
      case "onClick":
        s != null && (a.onclick = gr);
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
        if (!Q1.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (p = l.endsWith("Capture"), i = l.slice(2, p ? l.length - 7 : void 0), m = a[Ft] || null, m = m != null ? m[l] : null, typeof m == "function" && a.removeEventListener(i, m, p), typeof s == "function")) {
              typeof m != "function" && m !== null && (l in a ? a[l] = null : a.hasAttribute(l) && a.removeAttribute(l)), a.addEventListener(i, s, p);
              break e;
            }
            l in a ? a[l] = s : s === !0 ? a.setAttribute(l, "") : wc(a, l, s);
          }
    }
  }
  function qt(a, i, l) {
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
        Ne("error", a), Ne("load", a);
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
        Ne("invalid", a);
        var D = m = O = p = null, q = null, W = null;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var ie = l[s];
            if (ie != null)
              switch (s) {
                case "name":
                  p = ie;
                  break;
                case "type":
                  O = ie;
                  break;
                case "checked":
                  q = ie;
                  break;
                case "defaultChecked":
                  W = ie;
                  break;
                case "value":
                  m = ie;
                  break;
                case "defaultValue":
                  D = ie;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ie != null)
                    throw Error(r(137, i));
                  break;
                default:
                  Fe(a, i, s, ie, l, null);
              }
          }
        rx(
          a,
          m,
          D,
          q,
          W,
          O,
          p,
          !1
        );
        return;
      case "select":
        Ne("invalid", a), s = O = m = null;
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
        i = m, l = O, a.multiple = !!s, i != null ? Ri(a, !!s, i, !1) : l != null && Ri(a, !!s, l, !0);
        return;
      case "textarea":
        Ne("invalid", a), m = p = s = null;
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
        ix(a, s, p, m);
        return;
      case "option":
        for (q in l)
          if (l.hasOwnProperty(q) && (s = l[q], s != null))
            switch (q) {
              case "selected":
                a.selected = s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Fe(a, i, q, s, l, null);
            }
        return;
      case "dialog":
        Ne("beforetoggle", a), Ne("toggle", a), Ne("cancel", a), Ne("close", a);
        break;
      case "iframe":
      case "object":
        Ne("load", a);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Fl.length; s++)
          Ne(Fl[s], a);
        break;
      case "image":
        Ne("error", a), Ne("load", a);
        break;
      case "details":
        Ne("toggle", a);
        break;
      case "embed":
      case "source":
      case "link":
        Ne("error", a), Ne("load", a);
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
        for (W in l)
          if (l.hasOwnProperty(W) && (s = l[W], s != null))
            switch (W) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, i));
              default:
                Fe(a, i, W, s, l, null);
            }
        return;
      default:
        if (Qd(i)) {
          for (ie in l)
            l.hasOwnProperty(ie) && (s = l[ie], s !== void 0 && kp(
              a,
              i,
              ie,
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
        var p = null, m = null, O = null, D = null, q = null, W = null, ie = null;
        for (ne in l) {
          var ue = l[ne];
          if (l.hasOwnProperty(ne) && ue != null)
            switch (ne) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = ue;
              default:
                s.hasOwnProperty(ne) || Fe(a, i, ne, null, s, ue);
            }
        }
        for (var Z in s) {
          var ne = s[Z];
          if (ue = l[Z], s.hasOwnProperty(Z) && (ne != null || ue != null))
            switch (Z) {
              case "type":
                m = ne;
                break;
              case "name":
                p = ne;
                break;
              case "checked":
                W = ne;
                break;
              case "defaultChecked":
                ie = ne;
                break;
              case "value":
                O = ne;
                break;
              case "defaultValue":
                D = ne;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ne != null)
                  throw Error(r(137, i));
                break;
              default:
                ne !== ue && Fe(
                  a,
                  i,
                  Z,
                  ne,
                  s,
                  ue
                );
            }
        }
        Wd(
          a,
          O,
          D,
          q,
          W,
          ie,
          m,
          p
        );
        return;
      case "select":
        ne = O = D = Z = null;
        for (m in l)
          if (q = l[m], l.hasOwnProperty(m) && q != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                ne = q;
              default:
                s.hasOwnProperty(m) || Fe(
                  a,
                  i,
                  m,
                  null,
                  s,
                  q
                );
            }
        for (p in s)
          if (m = s[p], q = l[p], s.hasOwnProperty(p) && (m != null || q != null))
            switch (p) {
              case "value":
                Z = m;
                break;
              case "defaultValue":
                D = m;
                break;
              case "multiple":
                O = m;
              default:
                m !== q && Fe(
                  a,
                  i,
                  p,
                  m,
                  s,
                  q
                );
            }
        i = D, l = O, s = ne, Z != null ? Ri(a, !!l, Z, !1) : !!s != !!l && (i != null ? Ri(a, !!l, i, !0) : Ri(a, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        ne = Z = null;
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
                Z = p;
                break;
              case "defaultValue":
                ne = p;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(r(91));
                break;
              default:
                p !== m && Fe(a, i, O, p, s, m);
            }
        ax(a, Z, ne);
        return;
      case "option":
        for (var ve in l)
          if (Z = l[ve], l.hasOwnProperty(ve) && Z != null && !s.hasOwnProperty(ve))
            switch (ve) {
              case "selected":
                a.selected = !1;
                break;
              default:
                Fe(
                  a,
                  i,
                  ve,
                  null,
                  s,
                  Z
                );
            }
        for (q in s)
          if (Z = s[q], ne = l[q], s.hasOwnProperty(q) && Z !== ne && (Z != null || ne != null))
            switch (q) {
              case "selected":
                a.selected = Z && typeof Z != "function" && typeof Z != "symbol";
                break;
              default:
                Fe(
                  a,
                  i,
                  q,
                  Z,
                  s,
                  ne
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
          Z = l[Se], l.hasOwnProperty(Se) && Z != null && !s.hasOwnProperty(Se) && Fe(a, i, Se, null, s, Z);
        for (W in s)
          if (Z = s[W], ne = l[W], s.hasOwnProperty(W) && Z !== ne && (Z != null || ne != null))
            switch (W) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Z != null)
                  throw Error(r(137, i));
                break;
              default:
                Fe(
                  a,
                  i,
                  W,
                  Z,
                  s,
                  ne
                );
            }
        return;
      default:
        if (Qd(i)) {
          for (var We in l)
            Z = l[We], l.hasOwnProperty(We) && Z !== void 0 && !s.hasOwnProperty(We) && kp(
              a,
              i,
              We,
              void 0,
              s,
              Z
            );
          for (ie in s)
            Z = s[ie], ne = l[ie], !s.hasOwnProperty(ie) || Z === ne || Z === void 0 && ne === void 0 || kp(
              a,
              i,
              ie,
              Z,
              s,
              ne
            );
          return;
        }
    }
    for (var X in l)
      Z = l[X], l.hasOwnProperty(X) && Z != null && !s.hasOwnProperty(X) && Fe(a, i, X, null, s, Z);
    for (ue in s)
      Z = s[ue], ne = l[ue], !s.hasOwnProperty(ue) || Z === ne || Z == null && ne == null || Fe(a, i, ue, Z, s, ne);
  }
  function uO(a) {
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
        if (m && D && uO(O)) {
          for (O = 0, D = p.responseEnd, s += 1; s < l.length; s++) {
            var q = l[s], W = q.startTime;
            if (W > D) break;
            var ie = q.transferSize, ue = q.initiatorType;
            ie && uO(ue) && (q = q.responseEnd, O += ie * (q < D ? 1 : (D - W) / (q - W)));
          }
          if (--s, i += 8 * (m + O) / (p.duration / 1e3), a++, 10 < a) break;
        }
      }
      if (0 < a) return i / a / 1e6;
    }
    return navigator.connection && (a = navigator.connection.downlink, typeof a == "number") ? a : 5;
  }
  var Bp = null, Lp = null;
  function _s(a) {
    return a.nodeType === 9 ? a : a.ownerDocument;
  }
  function cO(a) {
    switch (a) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function sO(a, i) {
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
  function Up(a, i) {
    return a === "textarea" || a === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.children == "bigint" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Ip = null;
  function l3() {
    var a = window.event;
    return a && a.type === "popstate" ? a === Ip ? !1 : (Ip = a, !0) : (Ip = null, !1);
  }
  var fO = typeof setTimeout == "function" ? setTimeout : void 0, u3 = typeof clearTimeout == "function" ? clearTimeout : void 0, dO = typeof Promise == "function" ? Promise : void 0, c3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof dO < "u" ? function(a) {
    return dO.resolve(null).then(a).catch(s3);
  } : fO;
  function s3(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function ma(a) {
    return a === "head";
  }
  function hO(a, i) {
    var l = i, s = 0;
    do {
      var p = l.nextSibling;
      if (a.removeChild(l), p && p.nodeType === 8)
        if (l = p.data, l === "/$" || l === "/&") {
          if (s === 0) {
            a.removeChild(p), ho(i);
            return;
          }
          s--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          s++;
        else if (l === "html")
          Zl(a.ownerDocument.documentElement);
        else if (l === "head") {
          l = a.ownerDocument.head, Zl(l);
          for (var m = l.firstChild; m; ) {
            var O = m.nextSibling, D = m.nodeName;
            m[vl] || D === "SCRIPT" || D === "STYLE" || D === "LINK" && m.rel.toLowerCase() === "stylesheet" || l.removeChild(m), m = O;
          }
        } else
          l === "body" && Zl(a.ownerDocument.body);
      l = p;
    } while (l);
    ho(i);
  }
  function pO(a, i) {
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
  function Hp(a) {
    var i = a.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var l = i;
      switch (i = i.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Hp(l), Vd(l);
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
        if (!a[vl])
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
  function vO(a, i) {
    for (; a.nodeType !== 8; )
      if ((a.nodeType !== 1 || a.nodeName !== "INPUT" || a.type !== "hidden") && !i || (a = Pn(a.nextSibling), a === null)) return null;
    return a;
  }
  function Gp(a) {
    return a.data === "$?" || a.data === "$~";
  }
  function Yp(a) {
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
  var Kp = null;
  function yO(a) {
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
  function mO(a) {
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
  function gO(a, i, l) {
    switch (i = _s(l), a) {
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
  function Zl(a) {
    for (var i = a.attributes; i.length; )
      a.removeAttributeNode(i[0]);
    Vd(a);
  }
  var Nn = /* @__PURE__ */ new Map(), bO = /* @__PURE__ */ new Set();
  function Os(a) {
    return typeof a.getRootNode == "function" ? a.getRootNode() : a.nodeType === 9 ? a : a.ownerDocument;
  }
  var Rr = Y.d;
  Y.d = {
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
    var a = Rr.f(), i = ps();
    return a || i;
  }
  function v3(a) {
    var i = Di(a);
    i !== null && i.tag === 5 && i.type === "form" ? zS(i) : Rr.r(a);
  }
  var co = typeof document > "u" ? null : document;
  function xO(a, i, l) {
    var s = co;
    if (s && typeof i == "string" && i) {
      var p = An(i);
      p = 'link[rel="' + a + '"][href="' + p + '"]', typeof l == "string" && (p += '[crossorigin="' + l + '"]'), bO.has(p) || (bO.add(p), a = { rel: a, crossOrigin: l, href: i }, s.querySelector(p) === null && (i = s.createElement("link"), qt(i, "link", a), Mt(i), s.head.appendChild(i)));
    }
  }
  function y3(a) {
    Rr.D(a), xO("dns-prefetch", a, null);
  }
  function m3(a, i) {
    Rr.C(a, i), xO("preconnect", a, i);
  }
  function g3(a, i, l) {
    Rr.L(a, i, l);
    var s = co;
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
          m = so(a);
          break;
        case "script":
          m = fo(a);
      }
      Nn.has(m) || (a = v(
        {
          rel: "preload",
          href: i === "image" && l && l.imageSrcSet ? void 0 : a,
          as: i
        },
        l
      ), Nn.set(m, a), s.querySelector(p) !== null || i === "style" && s.querySelector(Ql(m)) || i === "script" && s.querySelector(Jl(m)) || (i = s.createElement("link"), qt(i, "link", a), Mt(i), s.head.appendChild(i)));
    }
  }
  function b3(a, i) {
    Rr.m(a, i);
    var l = co;
    if (l && a) {
      var s = i && typeof i.as == "string" ? i.as : "script", p = 'link[rel="modulepreload"][as="' + An(s) + '"][href="' + An(a) + '"]', m = p;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = fo(a);
      }
      if (!Nn.has(m) && (a = v({ rel: "modulepreload", href: a }, i), Nn.set(m, a), l.querySelector(p) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Jl(m)))
              return;
        }
        s = l.createElement("link"), qt(s, "link", a), Mt(s), l.head.appendChild(s);
      }
    }
  }
  function x3(a, i, l) {
    Rr.S(a, i, l);
    var s = co;
    if (s && a) {
      var p = Pi(s).hoistableStyles, m = so(a);
      i = i || "default";
      var O = p.get(m);
      if (!O) {
        var D = { loading: 0, preload: null };
        if (O = s.querySelector(
          Ql(m)
        ))
          D.loading = 5;
        else {
          a = v(
            { rel: "stylesheet", href: a, "data-precedence": i },
            l
          ), (l = Nn.get(m)) && Xp(a, l);
          var q = O = s.createElement("link");
          Mt(q), qt(q, "link", a), q._p = new Promise(function(W, ie) {
            q.onload = W, q.onerror = ie;
          }), q.addEventListener("load", function() {
            D.loading |= 1;
          }), q.addEventListener("error", function() {
            D.loading |= 2;
          }), D.loading |= 4, ws(O, i, s);
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
    Rr.X(a, i);
    var l = co;
    if (l && a) {
      var s = Pi(l).hoistableScripts, p = fo(a), m = s.get(p);
      m || (m = l.querySelector(Jl(p)), m || (a = v({ src: a, async: !0 }, i), (i = Nn.get(p)) && Vp(a, i), m = l.createElement("script"), Mt(m), qt(m, "link", a), l.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, s.set(p, m));
    }
  }
  function _3(a, i) {
    Rr.M(a, i);
    var l = co;
    if (l && a) {
      var s = Pi(l).hoistableScripts, p = fo(a), m = s.get(p);
      m || (m = l.querySelector(Jl(p)), m || (a = v({ src: a, async: !0, type: "module" }, i), (i = Nn.get(p)) && Vp(a, i), m = l.createElement("script"), Mt(m), qt(m, "link", a), l.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, s.set(p, m));
    }
  }
  function SO(a, i, l, s) {
    var p = (p = ye.current) ? Os(p) : null;
    if (!p) throw Error(r(446));
    switch (a) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (i = so(l.href), l = Pi(
          p
        ).hoistableStyles, s = l.get(i), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(i, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          a = so(l.href);
          var m = Pi(
            p
          ).hoistableStyles, O = m.get(a);
          if (O || (p = p.ownerDocument || p, O = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(a, O), (m = p.querySelector(
            Ql(a)
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
        return i = l.async, l = l.src, typeof l == "string" && i && typeof i != "function" && typeof i != "symbol" ? (i = fo(l), l = Pi(
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
  function so(a) {
    return 'href="' + An(a) + '"';
  }
  function Ql(a) {
    return 'link[rel="stylesheet"][' + a + "]";
  }
  function _O(a) {
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
    }), qt(i, "link", l), Mt(i), a.head.appendChild(i));
  }
  function fo(a) {
    return '[src="' + An(a) + '"]';
  }
  function Jl(a) {
    return "script[async]" + a;
  }
  function OO(a, i, l) {
    if (i.count++, i.instance === null)
      switch (i.type) {
        case "style":
          var s = a.querySelector(
            'style[data-href~="' + An(l.href) + '"]'
          );
          if (s)
            return i.instance = s, Mt(s), s;
          var p = v({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return s = (a.ownerDocument || a).createElement(
            "style"
          ), Mt(s), qt(s, "style", p), ws(s, l.precedence, a), i.instance = s;
        case "stylesheet":
          p = so(l.href);
          var m = a.querySelector(
            Ql(p)
          );
          if (m)
            return i.state.loading |= 4, i.instance = m, Mt(m), m;
          s = _O(l), (p = Nn.get(p)) && Xp(s, p), m = (a.ownerDocument || a).createElement("link"), Mt(m);
          var O = m;
          return O._p = new Promise(function(D, q) {
            O.onload = D, O.onerror = q;
          }), qt(m, "link", s), i.state.loading |= 4, ws(m, l.precedence, a), i.instance = m;
        case "script":
          return m = fo(l.src), (p = a.querySelector(
            Jl(m)
          )) ? (i.instance = p, Mt(p), p) : (s = l, (p = Nn.get(m)) && (s = v({}, l), Vp(s, p)), a = a.ownerDocument || a, p = a.createElement("script"), Mt(p), qt(p, "link", s), a.head.appendChild(p), i.instance = p);
        case "void":
          return null;
        default:
          throw Error(r(443, i.type));
      }
    else
      i.type === "stylesheet" && (i.state.loading & 4) === 0 && (s = i.instance, i.state.loading |= 4, ws(s, l.precedence, a));
    return i.instance;
  }
  function ws(a, i, l) {
    for (var s = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), p = s.length ? s[s.length - 1] : null, m = p, O = 0; O < s.length; O++) {
      var D = s[O];
      if (D.dataset.precedence === i) m = D;
      else if (m !== p) break;
    }
    m ? m.parentNode.insertBefore(a, m.nextSibling) : (i = l.nodeType === 9 ? l.head : l, i.insertBefore(a, i.firstChild));
  }
  function Xp(a, i) {
    a.crossOrigin == null && (a.crossOrigin = i.crossOrigin), a.referrerPolicy == null && (a.referrerPolicy = i.referrerPolicy), a.title == null && (a.title = i.title);
  }
  function Vp(a, i) {
    a.crossOrigin == null && (a.crossOrigin = i.crossOrigin), a.referrerPolicy == null && (a.referrerPolicy = i.referrerPolicy), a.integrity == null && (a.integrity = i.integrity);
  }
  var As = null;
  function wO(a, i, l) {
    if (As === null) {
      var s = /* @__PURE__ */ new Map(), p = As = /* @__PURE__ */ new Map();
      p.set(l, s);
    } else
      p = As, s = p.get(l), s || (s = /* @__PURE__ */ new Map(), p.set(l, s));
    if (s.has(a)) return s;
    for (s.set(a, null), l = l.getElementsByTagName(a), p = 0; p < l.length; p++) {
      var m = l[p];
      if (!(m[vl] || m[Nt] || a === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var O = m.getAttribute(i) || "";
        O = a + O;
        var D = s.get(O);
        D ? D.push(m) : s.set(O, [m]);
      }
    }
    return s;
  }
  function AO(a, i, l) {
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
  function TO(a) {
    return !(a.type === "stylesheet" && (a.state.loading & 3) === 0);
  }
  function A3(a, i, l, s) {
    if (l.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var p = so(s.href), m = i.querySelector(
          Ql(p)
        );
        if (m) {
          i = m._p, i !== null && typeof i == "object" && typeof i.then == "function" && (a.count++, a = Ts.bind(a), i.then(a, a)), l.state.loading |= 4, l.instance = m, Mt(m);
          return;
        }
        m = i.ownerDocument || i, s = _O(s), (p = Nn.get(p)) && Xp(s, p), m = m.createElement("link"), Mt(m);
        var O = m;
        O._p = new Promise(function(D, q) {
          O.onload = D, O.onerror = q;
        }), qt(m, "link", s), l.instance = m;
      }
      a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(l, i), (i = l.state.preload) && (l.state.loading & 3) === 0 && (a.count++, l = Ts.bind(a), i.addEventListener("load", l), i.addEventListener("error", l));
    }
  }
  var Fp = 0;
  function T3(a, i) {
    return a.stylesheets && a.count === 0 && js(a, a.stylesheets), 0 < a.count || 0 < a.imgCount ? function(l) {
      var s = setTimeout(function() {
        if (a.stylesheets && js(a, a.stylesheets), a.unsuspend) {
          var m = a.unsuspend;
          a.unsuspend = null, m();
        }
      }, 6e4 + i);
      0 < a.imgBytes && Fp === 0 && (Fp = 62500 * o3());
      var p = setTimeout(
        function() {
          if (a.waitingForImages = !1, a.count === 0 && (a.stylesheets && js(a, a.stylesheets), a.unsuspend)) {
            var m = a.unsuspend;
            a.unsuspend = null, m();
          }
        },
        (a.imgBytes > Fp ? 50 : 800) + i
      );
      return a.unsuspend = l, function() {
        a.unsuspend = null, clearTimeout(s), clearTimeout(p);
      };
    } : null;
  }
  function Ts() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) js(this, this.stylesheets);
      else if (this.unsuspend) {
        var a = this.unsuspend;
        this.unsuspend = null, a();
      }
    }
  }
  var Es = null;
  function js(a, i) {
    a.stylesheets = null, a.unsuspend !== null && (a.count++, Es = /* @__PURE__ */ new Map(), i.forEach(E3, a), Es = null, Ts.call(a));
  }
  function E3(a, i) {
    if (!(i.state.loading & 4)) {
      var l = Es.get(a);
      if (l) var s = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Es.set(a, l);
        for (var p = a.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < p.length; m++) {
          var O = p[m];
          (O.nodeName === "LINK" || O.getAttribute("media") !== "not all") && (l.set(O.dataset.precedence, O), s = O);
        }
        s && l.set(null, s);
      }
      p = i.instance, O = p.getAttribute("data-precedence"), m = l.get(O) || s, m === s && l.set(null, p), l.set(O, p), this.count++, s = Ts.bind(this), p.addEventListener("load", s), p.addEventListener("error", s), m ? m.parentNode.insertBefore(p, m.nextSibling) : (a = a.nodeType === 9 ? a.head : a, a.insertBefore(p, a.firstChild)), i.state.loading |= 4;
    }
  }
  var eu = {
    $$typeof: C,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function j3(a, i, l, s, p, m, O, D, q) {
    this.tag = 1, this.containerInfo = a, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Gd(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Gd(0), this.hiddenUpdates = Gd(null), this.identifierPrefix = s, this.onUncaughtError = p, this.onCaughtError = m, this.onRecoverableError = O, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function EO(a, i, l, s, p, m, O, D, q, W, ie, ue) {
    return a = new j3(
      a,
      i,
      l,
      O,
      q,
      W,
      ie,
      ue,
      D
    ), i = 1, m === !0 && (i |= 24), m = fn(3, null, null, i), a.current = m, m.stateNode = a, i = jh(), i.refCount++, a.pooledCache = i, i.refCount++, m.memoizedState = {
      element: s,
      isDehydrated: l,
      cache: i
    }, Ph(m), a;
  }
  function jO(a) {
    return a ? (a = Ii, a) : Ii;
  }
  function MO(a, i, l, s, p, m) {
    p = jO(p), s.context === null ? s.context = p : s.pendingContext = p, s = oa(i), s.payload = { element: l }, m = m === void 0 ? null : m, m !== null && (s.callback = m), l = la(a, s, i), l !== null && (tn(l, a, i), Pl(l, a, i));
  }
  function CO(a, i) {
    if (a = a.memoizedState, a !== null && a.dehydrated !== null) {
      var l = a.retryLane;
      a.retryLane = l !== 0 && l < i ? l : i;
    }
  }
  function Wp(a, i) {
    CO(a, i), (a = a.alternate) && CO(a, i);
  }
  function DO(a) {
    if (a.tag === 13 || a.tag === 31) {
      var i = Ia(a, 67108864);
      i !== null && tn(i, a, 67108864), Wp(a, 67108864);
    }
  }
  function PO(a) {
    if (a.tag === 13 || a.tag === 31) {
      var i = yn();
      i = Yd(i);
      var l = Ia(a, i);
      l !== null && tn(l, a, i), Wp(a, i);
    }
  }
  var Ms = !0;
  function M3(a, i, l, s) {
    var p = R.T;
    R.T = null;
    var m = Y.p;
    try {
      Y.p = 2, Zp(a, i, l, s);
    } finally {
      Y.p = m, R.T = p;
    }
  }
  function C3(a, i, l, s) {
    var p = R.T;
    R.T = null;
    var m = Y.p;
    try {
      Y.p = 8, Zp(a, i, l, s);
    } finally {
      Y.p = m, R.T = p;
    }
  }
  function Zp(a, i, l, s) {
    if (Ms) {
      var p = Qp(s);
      if (p === null)
        qp(
          a,
          i,
          s,
          Cs,
          l
        ), RO(a, s);
      else if (P3(
        p,
        a,
        i,
        l,
        s
      ))
        s.stopPropagation();
      else if (RO(a, s), i & 4 && -1 < D3.indexOf(a)) {
        for (; p !== null; ) {
          var m = Di(p);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var O = qa(m.pendingLanes);
                  if (O !== 0) {
                    var D = m;
                    for (D.pendingLanes |= 2, D.entangledLanes |= 2; O; ) {
                      var q = 1 << 31 - cn(O);
                      D.entanglements[1] |= q, O &= ~q;
                    }
                    rr(m), (Ie & 6) === 0 && (ds = _t() + 500, Vl(0));
                  }
                }
                break;
              case 31:
              case 13:
                D = Ia(m, 2), D !== null && tn(D, m, 2), ps(), Wp(m, 2);
            }
          if (m = Qp(s), m === null && qp(
            a,
            i,
            s,
            Cs,
            l
          ), m === p) break;
          p = m;
        }
        p !== null && s.stopPropagation();
      } else
        qp(
          a,
          i,
          s,
          null,
          l
        );
    }
  }
  function Qp(a) {
    return a = eh(a), Jp(a);
  }
  var Cs = null;
  function Jp(a) {
    if (Cs = null, a = Ci(a), a !== null) {
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
    return Cs = a, null;
  }
  function NO(a) {
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
        switch (gc()) {
          case U1:
            return 2;
          case I1:
            return 8;
          case bc:
          case mN:
            return 32;
          case H1:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ev = !1, ga = null, ba = null, xa = null, tu = /* @__PURE__ */ new Map(), nu = /* @__PURE__ */ new Map(), Sa = [], D3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function RO(a, i) {
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
        tu.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        nu.delete(i.pointerId);
    }
  }
  function ru(a, i, l, s, p, m) {
    return a === null || a.nativeEvent !== m ? (a = {
      blockedOn: i,
      domEventName: l,
      eventSystemFlags: s,
      nativeEvent: m,
      targetContainers: [p]
    }, i !== null && (i = Di(i), i !== null && DO(i)), a) : (a.eventSystemFlags |= s, i = a.targetContainers, p !== null && i.indexOf(p) === -1 && i.push(p), a);
  }
  function P3(a, i, l, s, p) {
    switch (i) {
      case "focusin":
        return ga = ru(
          ga,
          a,
          i,
          l,
          s,
          p
        ), !0;
      case "dragenter":
        return ba = ru(
          ba,
          a,
          i,
          l,
          s,
          p
        ), !0;
      case "mouseover":
        return xa = ru(
          xa,
          a,
          i,
          l,
          s,
          p
        ), !0;
      case "pointerover":
        var m = p.pointerId;
        return tu.set(
          m,
          ru(
            tu.get(m) || null,
            a,
            i,
            l,
            s,
            p
          )
        ), !0;
      case "gotpointercapture":
        return m = p.pointerId, nu.set(
          m,
          ru(
            nu.get(m) || null,
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
  function $O(a) {
    var i = Ci(a.target);
    if (i !== null) {
      var l = u(i);
      if (l !== null) {
        if (i = l.tag, i === 13) {
          if (i = c(l), i !== null) {
            a.blockedOn = i, F1(a.priority, function() {
              PO(l);
            });
            return;
          }
        } else if (i === 31) {
          if (i = f(l), i !== null) {
            a.blockedOn = i, F1(a.priority, function() {
              PO(l);
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
  function Ds(a) {
    if (a.blockedOn !== null) return !1;
    for (var i = a.targetContainers; 0 < i.length; ) {
      var l = Qp(a.nativeEvent);
      if (l === null) {
        l = a.nativeEvent;
        var s = new l.constructor(
          l.type,
          l
        );
        Jd = s, l.target.dispatchEvent(s), Jd = null;
      } else
        return i = Di(l), i !== null && DO(i), a.blockedOn = l, !1;
      i.shift();
    }
    return !0;
  }
  function zO(a, i, l) {
    Ds(a) && l.delete(i);
  }
  function N3() {
    ev = !1, ga !== null && Ds(ga) && (ga = null), ba !== null && Ds(ba) && (ba = null), xa !== null && Ds(xa) && (xa = null), tu.forEach(zO), nu.forEach(zO);
  }
  function Ps(a, i) {
    a.blockedOn === i && (a.blockedOn = null, ev || (ev = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      N3
    )));
  }
  var Ns = null;
  function qO(a) {
    Ns !== a && (Ns = a, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Ns === a && (Ns = null);
        for (var i = 0; i < a.length; i += 3) {
          var l = a[i], s = a[i + 1], p = a[i + 2];
          if (typeof s != "function") {
            if (Jp(s || l) === null)
              continue;
            break;
          }
          var m = Di(l);
          m !== null && (a.splice(i, 3), i -= 3, Qh(
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
  function ho(a) {
    function i(q) {
      return Ps(q, a);
    }
    ga !== null && Ps(ga, a), ba !== null && Ps(ba, a), xa !== null && Ps(xa, a), tu.forEach(i), nu.forEach(i);
    for (var l = 0; l < Sa.length; l++) {
      var s = Sa[l];
      s.blockedOn === a && (s.blockedOn = null);
    }
    for (; 0 < Sa.length && (l = Sa[0], l.blockedOn === null); )
      $O(l), l.blockedOn === null && Sa.shift();
    if (l = (a.ownerDocument || a).$$reactFormReplay, l != null)
      for (s = 0; s < l.length; s += 3) {
        var p = l[s], m = l[s + 1], O = p[Ft] || null;
        if (typeof m == "function")
          O || qO(l);
        else if (O) {
          var D = null;
          if (m && m.hasAttribute("formAction")) {
            if (p = m, O = m[Ft] || null)
              D = O.formAction;
            else if (Jp(p) !== null) continue;
          } else D = O.action;
          typeof D == "function" ? l[s + 1] = D : (l.splice(s, 3), s -= 3), qO(l);
        }
      }
  }
  function kO() {
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
  function tv(a) {
    this._internalRoot = a;
  }
  Rs.prototype.render = tv.prototype.render = function(a) {
    var i = this._internalRoot;
    if (i === null) throw Error(r(409));
    var l = i.current, s = yn();
    MO(l, s, a, i, null, null);
  }, Rs.prototype.unmount = tv.prototype.unmount = function() {
    var a = this._internalRoot;
    if (a !== null) {
      this._internalRoot = null;
      var i = a.containerInfo;
      MO(a.current, 2, null, a, null, null), ps(), i[Mi] = null;
    }
  };
  function Rs(a) {
    this._internalRoot = a;
  }
  Rs.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var i = V1();
      a = { blockedOn: null, target: a, priority: i };
      for (var l = 0; l < Sa.length && i !== 0 && i < Sa[l].priority; l++) ;
      Sa.splice(l, 0, a), l === 0 && $O(a);
    }
  };
  var BO = t.version;
  if (BO !== "19.2.8")
    throw Error(
      r(
        527,
        BO,
        "19.2.8"
      )
    );
  Y.findDOMNode = function(a) {
    var i = a._reactInternals;
    if (i === void 0)
      throw typeof a.render == "function" ? Error(r(188)) : (a = Object.keys(a).join(","), Error(r(268, a)));
    return a = h(i), a = a !== null ? y(a) : null, a = a === null ? null : a.stateNode, a;
  };
  var R3 = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: R,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $s = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$s.isDisabled && $s.supportsFiber)
      try {
        dl = $s.inject(
          R3
        ), un = $s;
      } catch {
      }
  }
  return vu.createRoot = function(a, i) {
    if (!o(a)) throw Error(r(299));
    var l = !1, s = "", p = KS, m = XS, O = VS;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (s = i.identifierPrefix), i.onUncaughtError !== void 0 && (p = i.onUncaughtError), i.onCaughtError !== void 0 && (m = i.onCaughtError), i.onRecoverableError !== void 0 && (O = i.onRecoverableError)), i = EO(
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
      kO
    ), a[Mi] = i.current, zp(a), new tv(i);
  }, vu.hydrateRoot = function(a, i, l) {
    if (!o(a)) throw Error(r(299));
    var s = !1, p = "", m = KS, O = XS, D = VS, q = null;
    return l != null && (l.unstable_strictMode === !0 && (s = !0), l.identifierPrefix !== void 0 && (p = l.identifierPrefix), l.onUncaughtError !== void 0 && (m = l.onUncaughtError), l.onCaughtError !== void 0 && (O = l.onCaughtError), l.onRecoverableError !== void 0 && (D = l.onRecoverableError), l.formState !== void 0 && (q = l.formState)), i = EO(
      a,
      1,
      !0,
      i,
      l ?? null,
      s,
      p,
      q,
      m,
      O,
      D,
      kO
    ), i.context = jO(null), l = i.current, s = yn(), s = Yd(s), p = oa(s), p.callback = null, la(l, p, s), l = s, i.current.lanes = l, pl(i, l), rr(i), a[Mi] = i.current, zp(a), new Rs(i);
  }, vu.version = "19.2.8", vu;
}
var IM;
function JK() {
  if (IM) return ob.exports;
  IM = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), ob.exports = QK(), ob.exports;
}
var eX = JK();
const tX = `
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
`, nX = `
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
function rX(e) {
  return `
  :host {
    display: block;
    position: relative;
    ${e === "ha" ? nX : tX}
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
function wi(e) {
  class t extends HTMLElement {
    constructor() {
      super(...arguments);
      ar(this, "_root");
      ar(this, "_mount");
      ar(this, "_overlay");
      ar(this, "_style");
      ar(this, "_hass");
      ar(this, "_config");
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
      if (this._style || (this._style = document.createElement("style"), c.appendChild(this._style)), this._style.textContent = rX(this._config.theme ?? "netwrth"), this._mount || (this._mount = document.createElement("div"), c.appendChild(this._mount), this._overlay = document.createElement("div"), this._overlay.className = "overlay", this._overlay.setAttribute("popover", "manual"), c.appendChild(this._overlay), this._root = eX.createRoot(this._mount)), this._config.allowed_user_id && ((h = this._hass.user) == null ? void 0 : h.id) !== this._config.allowed_user_id) {
        this._root.render(/* @__PURE__ */ $.jsx("div", { className: "card", children: /* @__PURE__ */ $.jsx("div", { className: "status", children: "This dashboard is private." }) }));
        return;
      }
      const f = e.component, d = this._hass;
      this._root.render(
        /* @__PURE__ */ $.jsx(FM.Provider, { value: this._overlay ?? null, children: /* @__PURE__ */ $.jsx(f, { hass: d, config: this._config }, `${(y = d.user) == null ? void 0 : y.id}:${JSON.stringify(this._config)}`) })
      );
    }
  }
  class n extends HTMLElement {
    constructor() {
      super(...arguments);
      ar(this, "_hass");
      ar(this, "_config");
      ar(this, "_entries");
    }
    set hass(c) {
      this._hass = c, this._entries || e$(c).then((f) => {
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
const Ai = {
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
}, Ti = {
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
}, Ei = { name: "entry", label: "Firefly connection", selector: {} }, ji = { name: "title", label: "Title", selector: { text: {} } }, L1 = {
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
}, Id = {
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
}, Hd = {
  name: "show_range_selector",
  label: "Show range selector",
  selector: { boolean: {} }
}, yN = {
  name: "compact",
  label: "Short axis amounts (₹1.2L instead of ₹1,20,000)",
  selector: { boolean: {} }
};
wi({
  tag: "family-finance-worth-card",
  name: "Finance worth chart",
  description: "Your total over time — the netwrth dashboard chart.",
  component: pN,
  schema: [
    ji,
    Ei,
    L1,
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
    Id,
    vN,
    Hd,
    yN,
    Ai,
    Ti
  ],
  stub: { view: "all", range: "6m" },
  size: 6
});
wi({
  tag: "family-finance-flow-card",
  name: "Finance balance movement",
  description: "Money kept vs burned per day/week/month (day-to-day accounts).",
  component: pN,
  defaults: { view: "daily", mode: "flow" },
  schema: [
    ji,
    Ei,
    Id,
    vN,
    Hd,
    yN,
    Ai,
    Ti
  ],
  stub: { range: "3m" },
  size: 6
});
wi({
  tag: "family-finance-stat-card",
  name: "Finance total",
  description: "One big number with its change over a window.",
  component: S$,
  schema: [
    ji,
    Ei,
    L1,
    Id,
    Hd,
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
    Ai,
    Ti
  ],
  stub: { view: "all", range: "1m" },
  size: 2
});
wi({
  tag: "family-finance-accounts-card",
  name: "Finance accounts",
  description: "Accounts grouped by kind with balances and sync freshness.",
  component: o$,
  schema: [
    ji,
    Ei,
    L1,
    Id,
    Hd,
    {
      name: "accounts",
      label: "Only these accounts (name match, empty = all)",
      selector: { text: { multiple: !0 } }
    },
    Ai,
    Ti
  ],
  stub: { view: "all", range: "1m" },
  size: 4
});
wi({
  tag: "family-finance-spending-card",
  name: "Finance spending",
  description: "Where the month's money went: totals, share donut, and theme breakdown.",
  component: y$,
  schema: [
    ji,
    Ei,
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
    Ai,
    Ti
  ],
  stub: {},
  size: 6
});
wi({
  tag: "family-finance-bills-card",
  name: "Finance recurring bills",
  description: "Calendar of the month's bills and income — charged, expected, and overdue.",
  component: f$,
  schema: [ji, Ei, Ai, Ti],
  stub: {},
  size: 5
});
wi({
  tag: "family-finance-cardcycle-card",
  name: "Finance credit cards",
  description: "Per credit card: balance through the month with payment markers.",
  component: h$,
  schema: [ji, Ei, Ai, Ti],
  stub: {},
  size: 4
});
console.info("%c netwrth cards %c loaded", "background:#60a5fa;color:#0b0f17;border-radius:3px 0 0 3px;padding:1px 4px", "background:#17202f;color:#e6edf7;border-radius:0 3px 3px 0;padding:1px 4px");
