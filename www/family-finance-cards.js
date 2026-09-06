var I3 = Object.defineProperty;
var H3 = (e, t, n) => t in e ? I3(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var rr = (e, t, n) => H3(e, typeof t != "symbol" ? t + "" : t, n);
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
var ks = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var av = { exports: {} }, au = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var IO;
function G3() {
  if (IO) return au;
  IO = 1;
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
var HO;
function Y3() {
  return HO || (HO = 1, av.exports = G3()), av.exports;
}
var $ = Y3(), iv = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GO;
function K3() {
  if (GO) return Ae;
  GO = 1;
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
  function T() {
  }
  T.prototype = A.prototype;
  function M(P, I, re) {
    this.props = P, this.context = I, this.refs = x, this.updater = re || _;
  }
  var C = M.prototype = new T();
  C.constructor = M, S(C, A.prototype), C.isPureReactComponent = !0;
  var w = Array.isArray;
  function E() {
  }
  var j = { H: null, A: null, T: null, S: null }, N = Object.prototype.hasOwnProperty;
  function R(P, I, re) {
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
    return R(P.type, I, P.props);
  }
  function L(P) {
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
        switch (typeof P.status == "string" ? P.then(E, E) : (P.status = "pending", P.then(
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
  function z(P, I, re, se, pe) {
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
              return _e = P._init, z(
                _e(P._payload),
                I,
                re,
                se,
                pe
              );
          }
      }
    if (_e)
      return pe = pe(P), _e = se === "" ? "." + Y(P, 0) : se, w(pe) ? (re = "", _e != null && (re = _e.replace(V, "$&/") + "/"), z(pe, I, re, "", function(ge) {
        return ge;
      })) : pe != null && (L(pe) && (pe = k(
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
        se = P[ce], fe = Ce + Y(se, ce), _e += z(
          se,
          I,
          re,
          fe,
          pe
        );
    else if (ce = b(P), typeof ce == "function")
      for (P = ce.call(P), ce = 0; !(se = P.next()).done; )
        se = se.value, fe = Ce + Y(se, ce++), _e += z(
          se,
          I,
          re,
          fe,
          pe
        );
    else if (fe === "object") {
      if (typeof P.then == "function")
        return z(
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
    return z(P, se, "", "", function(fe) {
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
  }, J = {
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
      if (!L(P))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return P;
    }
  };
  return Ae.Activity = v, Ae.Children = J, Ae.Component = A, Ae.Fragment = n, Ae.Profiler = o, Ae.PureComponent = M, Ae.StrictMode = r, Ae.Suspense = d, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j, Ae.__COMPILER_RUNTIME = {
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
    return R(P.type, pe, se);
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
    return R(P, fe, pe);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(P) {
    return { $$typeof: f, render: P };
  }, Ae.isValidElement = L, Ae.lazy = function(P) {
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
      pe !== null && pe(re, se), typeof se == "object" && se !== null && typeof se.then == "function" && se.then(E, G);
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
var YO;
function q0() {
  return YO || (YO = 1, iv.exports = K3()), iv.exports;
}
var ee = q0();
const U = /* @__PURE__ */ tt(ee), xo = (e, t) => {
  const n = Math.sin(e * 127.1 + t * 311.7) * 43758.5453;
  return n - Math.floor(n);
}, X3 = (e, t, n, r, o) => {
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
}, V3 = (e, t, n, r, o) => {
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
}, F3 = (e, t, n, r, o) => {
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
}, W3 = (e, t, n, r, o) => {
  e.clearRect(0, 0, t, n);
  const u = 22;
  for (let c = u / 2; c < n; c += u)
    for (let f = u / 2; f < t; f += u) {
      const d = 0.07 + 0.16 * (0.5 + 0.5 * Math.sin(r * 0.7 + (f + c) * 0.014));
      e.fillStyle = o(d), e.beginPath(), e.arc(f, c, 1.5, 0, 7), e.fill();
    }
}, Z3 = { plexus: X3, mesh: V3, contour: F3, dots: W3 };
function Q3(e) {
  const t = getComputedStyle(e).color.match(/(\d+(?:\.\d+)?)/g);
  return t && t.length >= 3 ? [Number(t[0]), Number(t[1]), Number(t[2])] : [96, 165, 250];
}
const J3 = 1e3 / 30;
function tl({ effect: e }) {
  const t = ee.useRef(null);
  return ee.useEffect(() => {
    const n = t.current;
    if (!n || e === "off") return;
    const r = n.parentElement, o = n.getContext("2d");
    if (!r || !o) return;
    const u = Z3[e], [c, f, d] = Q3(n), h = (E) => `rgba(${c},${f},${d},${E})`, y = window.matchMedia("(prefers-reduced-motion: reduce)").matches, v = Math.min(window.devicePixelRatio || 1, 2);
    let g = 0, b = 0, _ = 0, S = !0, x = 0;
    const A = (E) => {
      _ = 0, !(!S || g === 0) && (E - x >= J3 && (x = E, u(o, g, b, E / 1e3, h)), y || (_ = requestAnimationFrame(A)));
    }, T = () => {
      _ || (_ = requestAnimationFrame(A));
    }, M = () => {
      const E = r.getBoundingClientRect();
      g = Math.round(E.width), b = Math.round(E.height), n.width = g * v, n.height = b * v, o.setTransform(v, 0, 0, v, 0, 0), x = 0, T();
    }, C = new ResizeObserver(M);
    C.observe(r);
    const w = new IntersectionObserver((E) => {
      S = E.some((j) => j.isIntersecting), S && T();
    });
    return w.observe(r), M(), () => {
      C.disconnect(), w.disconnect(), _ && cancelAnimationFrame(_);
    };
  }, [e]), e === "off" ? null : /* @__PURE__ */ $.jsx("div", { className: "ambient", "aria-hidden": !0, children: /* @__PURE__ */ $.jsx("canvas", { ref: t }) });
}
const VM = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}), e$ = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
}), k0 = "•••••";
function or(e, t = !1) {
  return (t ? e$ : VM).format(e);
}
const t$ = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1
});
function FM(e) {
  return t$.format(e);
}
function fb(e) {
  return `${e >= 0 ? "+" : ""}${VM.format(e)}`;
}
function Eu(e) {
  return isFinite(e) ? `${e >= 0 ? "+" : ""}${(e * 100).toFixed(1)}%` : "–";
}
const n$ = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric"
});
function KO(e) {
  return n$.format(e);
}
function r$(e, t = !1, n = !1) {
  return new Date(e).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    ...n ? { year: "numeric" } : {},
    ...t ? { hour: "numeric", minute: "2-digit" } : {}
  });
}
const B0 = ["1d", "1w", "1m", "3m", "6m", "1y", "all"], jo = [
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
], a$ = {
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
}, ju = (e) => a$[e.toLowerCase()] ?? ["#60a5fa", "#34d399", "#a78bfa", "#f472b6", "#fbbf24", "#22d3ee"][Array.from(e).reduce((t, n) => t * 31 + n.charCodeAt(0) >>> 0, 0) % 6], i$ = {
  weekly: 52 / 12,
  biweekly: 26 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  annual: 1 / 12
};
function Ht(e, t) {
  return t ? k0 : or(e, Math.abs(e) < 100);
}
function vi() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit" }).format(/* @__PURE__ */ new Date()).slice(0, 7);
}
const db = "1970-02";
function XO(e, t) {
  const [n, r] = e.split("-").map(Number);
  return new Date(Date.UTC(n, r - 1 + t, 1)).toISOString().slice(0, 7);
}
function fc(e) {
  const [t, n] = e.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}
function id({
  month: e,
  onChange: t,
  picker: n = !1
}) {
  return /* @__PURE__ */ $.jsxs("span", { className: "seg", children: [
    /* @__PURE__ */ $.jsx("button", { "aria-label": "Previous month", onClick: () => t(XO(e, -1)), disabled: e <= db, children: "‹" }),
    n ? /* @__PURE__ */ $.jsx(
      "input",
      {
        className: "month-picker",
        type: "month",
        "aria-label": "Reporting month",
        value: e,
        min: db,
        max: vi(),
        onChange: (r) => t(r.target.value)
      }
    ) : /* @__PURE__ */ $.jsx("button", { className: "active spend-month-label", children: fc(e) }),
    /* @__PURE__ */ $.jsx("button", { "aria-label": "Next month", onClick: () => t(XO(e, 1)), disabled: e >= vi(), children: "›" })
  ] });
}
function VO() {
  let e = vi();
  const t = /* @__PURE__ */ new Set();
  return {
    snapshot: () => e,
    subscribe: (n) => (t.add(n), () => {
      t.delete(n);
    }),
    select: (n) => {
      if (!(!/^\d{4}-(0[1-9]|1[0-2])$/.test(n) || n < db || n > vi() || n === e)) {
        e = n;
        for (const r of t) r();
      }
    }
  };
}
const FO = /* @__PURE__ */ new WeakMap();
function dc(e, t) {
  var r;
  const n = ee.useMemo(() => {
    var f;
    if (!t) return VO();
    let o = FO.get(e.connection);
    o || FO.set(e.connection, o = /* @__PURE__ */ new Map());
    const u = JSON.stringify([(f = e.user) == null ? void 0 : f.id, t]);
    let c = o.get(u);
    return c || o.set(u, c = VO()), c;
  }, [e.connection, (r = e.user) == null ? void 0 : r.id, t]);
  return [ee.useSyncExternalStore(n.subscribe, n.snapshot), n.select];
}
var ov = { exports: {} }, Ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var WO;
function o$() {
  if (WO) return Ut;
  WO = 1;
  var e = q0();
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
var ZO;
function WM() {
  if (ZO) return ov.exports;
  ZO = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), ov.exports = o$(), ov.exports;
}
var l$ = WM();
function u$(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/overview",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function ZM(e, t, n, r) {
  return e.connection.sendMessagePromise({
    type: "family_finance/series",
    range: n,
    ...r ? { month: r } : {},
    ...t ? { entry_id: t } : {}
  });
}
function c$(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_summary",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function QM(e, t, n) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_recurring",
    ...n ? { month: n } : {},
    ...t ? { entry_id: t } : {}
  });
}
function JM(e, t, n, r) {
  return e.connection.sendMessagePromise({
    type: "family_finance/spending_transactions",
    ...n ? { month: n } : {},
    ...r ? { theme: r } : {},
    ...t ? { entry_id: t } : {}
  });
}
function s$(e) {
  return e.connection.sendMessagePromise({ type: "family_finance/entries" });
}
const eC = ee.createContext(null);
function f$({ children: e }) {
  const t = ee.useContext(eC);
  return ee.useEffect(() => {
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
  }, [t]), t ? l$.createPortal(e, t) : /* @__PURE__ */ $.jsx($.Fragment, { children: e });
}
function nl(e) {
  return e.background ? e.background : e.theme === "ha" ? "off" : "plexus";
}
const d$ = 6e4;
function tC() {
  const e = ee.useRef(null), [t, n] = ee.useState(820);
  return ee.useEffect(() => {
    if (!e.current) return;
    const r = new ResizeObserver(([o]) => {
      o.contentRect.width > 0 && n(Math.max(280, o.contentRect.width));
    });
    return r.observe(e.current), () => r.disconnect();
  }, []), { ref: e, width: t };
}
function od(e, t, n, r) {
  var y, v;
  const [o, u] = ee.useState(null), [c, f] = ee.useState(0), d = ee.useCallback(() => f((g) => g + 1), []);
  ee.useEffect(() => {
    var x;
    let g = !0;
    const b = { source: n, connection: e.connection, userId: (x = e.user) == null ? void 0 : x.id, entry: t, month: r };
    Promise.all([u$(e, t, r), n(e, t)]).then(([A, T]) => {
      if (g) {
        if (A.currency !== "INR") throw new Error("Finance requires INR data");
        u({ ...b, overview: A, data: T.data, error: null });
      }
    }).catch((A) => {
      g && u({ ...b, overview: null, data: null, error: (A == null ? void 0 : A.message) ?? "Unable to load finance data" });
    });
    const _ = setInterval(d, d$), S = () => {
      document.visibilityState === "visible" && d();
    };
    return document.addEventListener("visibilitychange", S), () => {
      g = !1, clearInterval(_), document.removeEventListener("visibilitychange", S);
    };
  }, [e.connection, (y = e.user) == null ? void 0 : y.id, t, n, r, c, d]);
  const h = (o == null ? void 0 : o.source) === n && o.connection === e.connection && o.userId === ((v = e.user) == null ? void 0 : v.id) && o.entry === t && o.month === r ? o : null;
  return { overview: (h == null ? void 0 : h.overview) ?? null, data: (h == null ? void 0 : h.data) ?? null, masked: !1, error: (h == null ? void 0 : h.error) ?? null, refresh: d };
}
function L0(e, t, n, r) {
  const o = ee.useCallback(
    (y, v) => ZM(y, v, n, r).then((g) => ({ data: g.series, censored: g.censored })),
    [n, r]
  ), { overview: u, data: c, masked: f, error: d, refresh: h } = od(
    e,
    t,
    o,
    r
  );
  return { overview: u, series: c, masked: f, error: d, refresh: h };
}
function rf({
  options: e,
  value: t,
  onChange: n
}) {
  return /* @__PURE__ */ $.jsx("span", { className: "seg", children: e.map((r) => /* @__PURE__ */ $.jsx("button", { className: r === t ? "active" : "", onClick: () => n(r), children: r }, r)) });
}
function nC(e) {
  return ee.useMemo(
    () => e ? e.accounts.filter((t) => !t.hidden) : [],
    [e]
  );
}
const h$ = ["cash", "investment", "credit", "loan", "other"], QO = [
  ["#3b82f6", "#2563eb"],
  ["#10b981", "#059669"],
  ["#8b5cf6", "#6366f1"],
  ["#f59e0b", "#d97706"],
  ["#ec4899", "#db2777"],
  ["#06b6d4", "#0891b2"]
];
function p$(e) {
  const t = e.org_name || e.org_domain || e.provider || "?";
  let n = 0;
  for (let u = 0; u < t.length; u++) n = n * 31 + t.charCodeAt(u) | 0;
  const [r, o] = QO[Math.abs(n) % QO.length];
  return { letter: t.trim().charAt(0).toUpperCase() || "?", g1: r, g2: o };
}
function v$(e, t) {
  if (e.balance == null) return "–";
  const n = parseFloat(e.balance);
  return t ? `${n.toFixed(1)}%` : or(n, !0);
}
function y$({
  hass: e,
  config: t
}) {
  const n = jo.find((S) => S.key === (t.view ?? "all")) ?? jo[2], [r, o] = ee.useState(t.range ?? "1m"), [u] = dc(e, t.month_group), { overview: c, series: f, masked: d, error: h } = L0(e, t.entry, r, t.month_group ? u : void 0), y = (c == null ? void 0 : c.accounts) ?? [], v = t.accounts, g = ee.useMemo(() => {
    let S = y.filter(n.pick);
    if (v && v.length > 0) {
      const x = v.map((A) => A.trim().toLowerCase()).filter(Boolean);
      S = S.filter(
        (A) => x.some(
          (T) => (A.nickname ?? "").toLowerCase().includes(T) || A.name.toLowerCase().includes(T)
        )
      );
    }
    return S;
  }, [y, n, v]), b = ee.useMemo(() => {
    const S = /* @__PURE__ */ new Map();
    if (!f) return S;
    for (const x of f) {
      if (x.points.length < 2) continue;
      const A = [...x.points].sort(
        (C, w) => new Date(C.ts).getTime() - new Date(w.ts).getTime()
      ), T = parseFloat(A[0].balance), M = parseFloat(A[A.length - 1].balance);
      T !== 0 && S.set(x.account_id, (M - T) / Math.abs(T));
    }
    return S;
  }, [f]), _ = ee.useMemo(
    () => h$.map((S) => ({
      kind: S,
      accounts: g.filter((x) => x.kind === S)
    })).filter((S) => S.accounts.length > 0),
    [g]
  );
  return /* @__PURE__ */ $.jsxs("div", { className: "card", "data-reporting-month": t.month_group ? u : void 0, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Accounts" }),
      /* @__PURE__ */ $.jsxs("span", { className: "head-right", children: [
        t.month_group && /* @__PURE__ */ $.jsx("span", { className: "muted", title: "Closing balances for the selected month; current month is as of today", children: fc(u) }),
        !t.month_group && t.show_controls !== !1 && t.show_range_selector !== !1 && /* @__PURE__ */ $.jsx("span", { className: "controls", children: /* @__PURE__ */ $.jsx(rf, { options: B0, value: r, onChange: o }) })
      ] })
    ] }),
    h && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: h }),
    !h && !c && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !h && c && _.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No accounts." }),
    !h && c && _.length > 0 && /* @__PURE__ */ $.jsx("table", { children: /* @__PURE__ */ $.jsx("tbody", { children: _.map((S) => /* @__PURE__ */ $.jsx(
      m$,
      {
        kind: S.kind,
        accounts: S.accounts,
        masked: d,
        deltas: b
      },
      S.kind
    )) }) })
  ] });
}
function m$({
  kind: e,
  accounts: t,
  masked: n,
  deltas: r
}) {
  return /* @__PURE__ */ $.jsxs($.Fragment, { children: [
    /* @__PURE__ */ $.jsx("tr", { className: "kind-row", children: /* @__PURE__ */ $.jsx("td", { colSpan: 3, children: e }) }),
    t.map((o) => {
      const u = r.get(o.id), c = p$(o);
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
        /* @__PURE__ */ $.jsx("td", { className: "num", children: v$(o, n) }),
        /* @__PURE__ */ $.jsx("td", { className: `num row-delta ${u == null ? "muted" : u >= 0 ? "up" : "down"}`, children: u == null ? "–" : Eu(u) })
      ] }, o.id);
    })
  ] });
}
const ar = 310, qt = { top: 88, right: 16, bottom: 28, left: 16 }, JO = 24, Rr = 26, lv = /* @__PURE__ */ new Set(["weekly", "biweekly", "monthly", "quarterly", "annual"]), ew = {
  actual: "charged",
  expected: "expected around this day",
  overdue: "expected but not seen yet"
};
function iu(e) {
  return new Date(e).getUTCDate();
}
function g$({
  hass: e,
  config: t
}) {
  const { ref: n, width: r } = tC(), [o, u] = dc(e, t.month_group), [c, f] = ee.useState(null);
  ee.useEffect(() => f(null), [o]);
  const [d, h] = ee.useState(/* @__PURE__ */ new Set()), y = ee.useCallback(
    (G, J) => QM(G, J, o).then((P) => ({ data: P, censored: P.censored })),
    [o]
  ), { data: v, masked: g, error: b } = od(
    e,
    t.entry,
    y,
    o
  ), _ = (v == null ? void 0 : v.streams) ?? [], S = (v == null ? void 0 : v.expected) ?? [], x = (v == null ? void 0 : v.actuals) ?? [], A = (v == null ? void 0 : v.today) ?? "", T = g, M = ee.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const J of _) G.set(`${J.merchant_key}|${J.is_income}`, J);
    return G;
  }, [_]), C = ee.useMemo(() => {
    var J;
    const G = [];
    for (const P of x) {
      const I = M.get(`${P.merchant_key}|false`);
      P.is_income || !I || !lv.has(I.frequency) || G.push({
        id: `a-${P.merchant_key}-${P.date}`,
        merchantKey: P.merchant_key,
        name: I.merchant ?? P.merchant_key,
        logo: I.logo_url,
        day: iu(P.date),
        amount: parseFloat(P.amount),
        state: "actual",
        frequency: I.frequency,
        theme: I.theme
      });
    }
    for (const P of S)
      P.is_income || !lv.has(P.frequency) || G.push({
        id: `e-${P.merchant_key}-${P.date}`,
        merchantKey: P.merchant_key,
        name: P.merchant || P.merchant_key,
        logo: P.logo_url ?? null,
        day: iu(P.date),
        amount: P.amount,
        state: P.overdue ? "overdue" : "expected",
        frequency: P.frequency,
        theme: ((J = M.get(`${P.merchant_key}|false`)) == null ? void 0 : J.theme) ?? null
      });
    return G;
  }, [x, S, M]), w = ee.useMemo(() => {
    const G = [];
    for (const J of x) {
      if (!J.is_income) continue;
      const P = M.get(`${J.merchant_key}|true`);
      G.push({
        id: `ia-${J.merchant_key}-${J.date}`,
        merchantKey: J.merchant_key,
        name: (P == null ? void 0 : P.merchant) ?? J.merchant_key,
        logo: null,
        day: iu(J.date),
        amount: parseFloat(J.amount),
        state: "actual",
        frequency: (P == null ? void 0 : P.frequency) ?? "monthly",
        theme: null
      });
    }
    for (const J of S)
      J.is_income && G.push({
        id: `ie-${J.merchant_key}-${J.date}`,
        merchantKey: J.merchant_key,
        name: J.merchant || J.merchant_key,
        logo: null,
        day: iu(J.date),
        amount: J.amount,
        state: J.overdue ? "overdue" : "expected",
        frequency: J.frequency,
        theme: null
      });
    return G.sort((J, P) => J.day - P.day);
  }, [x, S, M]), E = ee.useMemo(
    () => _.filter(
      (G) => !G.is_income && (G.active && !lv.has(G.frequency) || !G.active && G.theme === "subscriptions")
    ),
    [_]
  ), j = A ? iu(A) : 0, N = C.map((G) => G.amount).filter((G) => G > 0), R = Math.max(1e-9, ...N), k = Math.min(R, ...N), L = r - qt.left - qt.right, q = ar - qt.top - qt.bottom, V = (G) => qt.left + (G - 1) / 30 * L, Y = Math.log(R) - Math.log(k), F = (G) => {
    const J = Y < 1e-6 ? 0.6 : (Math.log(Math.max(G, k)) - Math.log(k)) / Y;
    return ar - qt.bottom - (0.15 + 0.85 * J) * q;
  }, z = ee.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const P of C) G.set(P.day, [...G.get(P.day) ?? [], P]);
    const J = /* @__PURE__ */ new Map();
    for (const P of G.values())
      P.forEach((I, re) => J.set(I.id, (re - (P.length - 1) / 2) * (Rr + 6)));
    return J;
  }, [C]), K = (G) => {
    const J = ju(G.theme ?? "other");
    return G.state === "actual" ? {
      stemOpacity: 1,
      stem: "var(--nb-ink)",
      ring: J,
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
  }, ne = C.length === 0 && w.length === 0 && E.length === 0;
  return /* @__PURE__ */ $.jsxs("div", { className: "card", ref: n, "data-reporting-month": o, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Recurring bills" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: t.month_group ? /* @__PURE__ */ $.jsx("span", { className: "muted", children: fc(o) }) : /* @__PURE__ */ $.jsx(id, { month: o, onChange: u }) })
    ] }),
    b && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: b }),
    !b && !v && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !b && v && ne && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No recurring activity this month." }),
    !b && v && !ne && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
      (C.length > 0 || w.length > 0) && /* @__PURE__ */ $.jsxs(
        "svg",
        {
          viewBox: `0 0 ${r} ${ar}`,
          className: "spend-cal-svg",
          role: "img",
          "aria-label": "Recurring bills and income by day of month",
          children: [
            [1, 8, 15, 22, 29].map((G) => /* @__PURE__ */ $.jsxs("g", { children: [
              /* @__PURE__ */ $.jsx(
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
              /* @__PURE__ */ $.jsx("text", { x: V(G), y: ar - 8, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "12", children: G })
            ] }, G)),
            /* @__PURE__ */ $.jsx(
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
            j > 0 && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
              /* @__PURE__ */ $.jsx(
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
              /* @__PURE__ */ $.jsx("text", { x: V(j), y: 12, textAnchor: "middle", fill: "var(--nb-accent)", fontSize: "11", children: "today" })
            ] }),
            C.map((G) => {
              var fe;
              const J = K(G), P = V(G.day) + (z.get(G.id) ?? 0), I = F(G.amount), re = P < qt.left + 34 ? "start" : P > r - qt.right - 34 ? "end" : "middle", se = c === G.id, pe = `clip-${G.id.replace(/\W+/g, "-")}`;
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
                        y1: ar - qt.bottom,
                        x2: P,
                        y2: I + Rr / 2 + 2,
                        stroke: J.stem,
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        opacity: J.stemOpacity
                      }
                    ),
                    /* @__PURE__ */ $.jsx("circle", { cx: P, cy: I, r: Rr / 2 + 2, fill: J.chipFill, stroke: J.ring, strokeWidth: "2" }),
                    G.logo && !d.has(G.merchantKey) ? /* @__PURE__ */ $.jsxs($.Fragment, { children: [
                      /* @__PURE__ */ $.jsx("clipPath", { id: pe, children: /* @__PURE__ */ $.jsx("circle", { cx: P, cy: I, r: Rr / 2 }) }),
                      /* @__PURE__ */ $.jsx(
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
                    ] }) : /* @__PURE__ */ $.jsx(
                      "text",
                      {
                        x: P,
                        y: I + 5,
                        textAnchor: "middle",
                        fill: J.initialInk,
                        fontSize: "14",
                        fontWeight: "600",
                        children: G.name.charAt(0).toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ $.jsxs("text", { x: P, y: I - Rr / 2 - 6, textAnchor: re, fill: "var(--nb-text)", fontSize: "12", children: [
                      G.state === "expected" ? "~" : "",
                      Ht(G.amount, T)
                    ] }),
                    se && /* @__PURE__ */ $.jsx(
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
                    /* @__PURE__ */ $.jsx("title", { children: `${G.name} — ${ew[G.state]}, day ${G.day}${`: ${G.state === "actual" ? "" : "~"}${Ht(G.amount, T)}`} (${((fe = M.get(`${G.merchantKey}|false`)) == null ? void 0 : fe.frequency_label) ?? G.frequency})` })
                  ]
                },
                G.id
              );
            }),
            w.map((G) => {
              const J = V(G.day), P = G.state === "actual" ? 1 : G.state === "expected" ? 0.6 : 0.45;
              return /* @__PURE__ */ $.jsxs("g", { opacity: P, children: [
                /* @__PURE__ */ $.jsx(
                  "circle",
                  {
                    cx: J,
                    cy: JO,
                    r: 7,
                    fill: G.state === "actual" ? "var(--nb-green)" : "var(--nb-bg)",
                    stroke: "var(--nb-green)",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ $.jsx("text", { x: J, y: JO + 18, textAnchor: "middle", fill: "var(--nb-green)", fontSize: "10", children: Ht(G.amount, T) }),
                /* @__PURE__ */ $.jsx("title", { children: `${G.name} — income, ${ew[G.state]} (day ${G.day})${`: ${Ht(G.amount, T)}`}` })
              ] }, G.id);
            })
          ]
        }
      ),
      E.length > 0 && /* @__PURE__ */ $.jsx("div", { className: "spend-strip", children: E.map((G) => /* @__PURE__ */ $.jsxs(
        "span",
        {
          className: `spend-strip-item ${G.active ? "" : "lapsed"}`,
          title: G.active ? `${G.frequency_label ?? G.frequency}, last on ${G.last_seen.slice(0, 10)}` : `looks cancelled — last charged ${G.last_seen.slice(0, 10)}`,
          children: [
            G.merchant ?? G.merchant_key,
            /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
              ` ${Ht(parseFloat(G.average_amount), T)}`,
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
function b$(e) {
  const [t, n] = e.split("-").map(Number);
  return {
    from: new Date(Date.UTC(t, n - 1, 1)),
    to: new Date(Date.UTC(t, n, 1))
  };
}
function x$({
  hass: e,
  config: t
}) {
  const { ref: n, width: r } = tC(), [o, u] = dc(e, t.month_group), [c, f] = ee.useState(null), d = ee.useRef(null);
  ee.useEffect(() => {
    f(null);
  }, [o]);
  const [h, y] = ee.useState(null), v = (Y) => y(Y), g = ee.useCallback(
    (Y, F) => Promise.all([ZM(Y, F, "6m", o), JM(Y, F, o)]).then(
      ([z, K]) => ({
        data: { series: z.series, txns: K.transactions },
        censored: K.censored
      })
    ),
    [o]
  ), { overview: b, data: _, masked: S, error: x } = od(
    e,
    t.entry,
    g,
    o
  ), A = ee.useMemo(
    () => ((b == null ? void 0 : b.accounts) ?? []).filter((Y) => Y.kind === "credit"),
    [b]
  ), T = (_ == null ? void 0 : _.series) ?? [], M = (_ == null ? void 0 : _.txns) ?? [], C = S, { from: w, to: E } = b$(o), N = ee.useMemo(() => A.map((Y) => {
    var pe;
    const F = (((pe = T.find((fe) => fe.account_id === Y.id)) == null ? void 0 : pe.points) ?? []).map((fe) => ({ ts: new Date(fe.ts), debt: Math.max(0, -parseFloat(fe.balance)) })).filter((fe) => !isNaN(fe.debt)).sort((fe, _e) => fe.ts.getTime() - _e.ts.getTime()), z = F.filter((fe) => fe.ts < w), K = F.filter((fe) => fe.ts >= w && fe.ts < E), ne = F.filter((fe) => fe.ts >= E), G = M.filter((fe) => fe.account_id === Y.id && !fe.pending).map((fe) => ({ ...fe, v: parseFloat(fe.amount), date: new Date(fe.posted_at) })).sort((fe, _e) => fe.date.getTime() - _e.date.getTime());
    let J = 0, P = 0;
    const I = [];
    for (const fe of G)
      fe.v > 0 && fe.transaction_type === "withdrawal" ? J += fe.v : fe.v < 0 && fe.transaction_type === "transfer" && (P += -fe.v, I.push({ date: fe.date, amount: -fe.v }));
    const re = [...z.length ? [{ ...z[z.length - 1], ts: w }] : [], ...K];
    let se = [];
    if (z.length === 0 && (K.length > 0 || ne.length > 0)) {
      const fe = K.length > 0 ? K[0].ts : E, _e = K.length > 0 ? K[0].debt : ne[0].debt;
      let Ce = _e;
      const ce = [];
      for (const ge of [...G].reverse())
        ge.date >= fe || ge.date < w || (Ce = Math.max(0, Ce - ge.v), ce.unshift({ ts: ge.date, debt: Ce }));
      se = [{ ts: w, debt: ce.length ? ce[0].debt : Ce }, ...ce], K.length > 0 && se.push({ ts: fe, debt: _e });
    }
    return { card: Y, line: re, recon: se, spent: J, paid: P, payments: I };
  }), [A, T, M, w, E]).filter(
    (Y) => Y.line.length > 0 || Y.recon.length > 0 || Y.spent > 0 || Y.paid > 0
  ), R = N.find((Y) => Y.card.id === h) ?? N[0], k = R ? [R] : [], L = Math.round((E.getTime() - w.getTime()) / 864e5), q = (Y) => it.left + Math.min(Math.max((Y.getTime() - w.getTime()) / 864e5, 0), L) / L * (r - it.left - it.right), V = (Y, F) => {
    let z = null;
    for (const K of Y)
      if (K.ts.getTime() <= F) z = K.debt;
      else break;
    return z;
  };
  return /* @__PURE__ */ $.jsxs("div", { className: "card", ref: n, "data-reporting-month": o, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Card credit" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: t.month_group ? /* @__PURE__ */ $.jsx("span", { className: "muted", children: fc(o) }) : /* @__PURE__ */ $.jsx(id, { month: o, onChange: u }) })
    ] }),
    x && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: x }),
    !x && !_ && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !x && _ && N.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No credit-card activity this month." }),
    !x && _ && N.length > 1 && /* @__PURE__ */ $.jsx("div", { className: "spend-card-chips", children: N.map(({ card: Y }) => /* @__PURE__ */ $.jsx(
      "button",
      {
        className: `spend-card-chip ${R && Y.id === R.card.id ? "on" : ""}`,
        title: "Show this card",
        onClick: () => v(Y.id),
        children: Y.nickname ?? Y.name
      },
      Y.id
    )) }),
    !x && _ && k.map(({ card: Y, line: F, recon: z, spent: K, paid: ne, payments: G }) => {
      const J = Math.max(
        1,
        ...F.map((he) => he.debt),
        ...z.map((he) => he.debt),
        ...G.map((he) => he.amount)
      ), P = (he) => ir - it.bottom - he / J * (ir - it.top - it.bottom), I = /* @__PURE__ */ new Date(), re = I >= w && I < E ? q(I) : null, se = re ?? r - it.right, pe = (he, ue) => {
        let qe = "";
        return he.forEach((xe, Qe) => {
          qe += Qe === 0 ? `M${q(xe.ts)},${P(xe.debt)}` : `H${q(xe.ts)}V${P(xe.debt)}`;
        }), qe && ue && (qe += `H${se}`), qe;
      }, fe = pe(z, F.length === 0), _e = pe(F, !0), Ce = [...z, ...F].sort((he, ue) => he.ts.getTime() - ue.ts.getTime()), ce = Ce.length ? `${pe(Ce, !0)} V${ir - it.bottom} H${q(Ce[0].ts)} Z` : "", ge = Y.nickname ?? Y.name;
      return /* @__PURE__ */ $.jsxs("div", { className: "spend-card-row", children: [
        /* @__PURE__ */ $.jsxs("div", { className: "spend-card-head", children: [
          /* @__PURE__ */ $.jsx("span", { children: ge }),
          /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
            "spent ",
            Ht(K, C),
            " · paid ",
            Ht(ne, C),
            (F.length > 0 || z.length > 0) && ` · owing ${Ht((F[F.length - 1] ?? z[z.length - 1]).debt, C)}`
          ] })
        ] }),
        /* @__PURE__ */ $.jsxs(
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
              const Ye = w.getTime() + (xe - it.left) / (r - it.left - it.right) * L * 864e5;
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
                const Xt = F.length > 0 && Ye >= F[0].ts.getTime(), Zr = V(Xt ? F : z, Ye);
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
              /* @__PURE__ */ $.jsx("defs", { children: /* @__PURE__ */ $.jsxs("linearGradient", { id: `ccfill-${Y.id}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ $.jsx("stop", { offset: "0", stopColor: "var(--nb-ink)", stopOpacity: "0.26" }),
                /* @__PURE__ */ $.jsx("stop", { offset: "1", stopColor: "var(--nb-ink)", stopOpacity: "0" })
              ] }) }),
              [1, 8, 15, 22, 29].map((he) => {
                const ue = q(new Date(w.getTime() + (he - 1) * 864e5));
                return /* @__PURE__ */ $.jsxs("g", { children: [
                  /* @__PURE__ */ $.jsx(
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
                  /* @__PURE__ */ $.jsx("text", { x: ue, y: ir - 6, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "11", children: he })
                ] }, he);
              }),
              /* @__PURE__ */ $.jsx(
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
              /* @__PURE__ */ $.jsx("text", { x: it.left - 6, y: it.top + 4, textAnchor: "end", fill: "var(--nb-muted)", fontSize: "11", children: Ht(J, C) }),
              ce && /* @__PURE__ */ $.jsx("path", { d: ce, fill: `url(#ccfill-${Y.id})` }),
              fe && /* @__PURE__ */ $.jsx(
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
              _e && /* @__PURE__ */ $.jsx(
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
              re !== null && /* @__PURE__ */ $.jsxs("g", { children: [
                /* @__PURE__ */ $.jsx(
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
                /* @__PURE__ */ $.jsx(
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
              G.map((he, ue) => /* @__PURE__ */ $.jsxs("g", { children: [
                /* @__PURE__ */ $.jsx(
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
                /* @__PURE__ */ $.jsx(
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
                /* @__PURE__ */ $.jsxs(
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
                /* @__PURE__ */ $.jsx("title", { children: `payment ${he.date.toISOString().slice(0, 10)}${`: ${Ht(he.amount, C)}`}` })
              ] }, ue))
            ]
          }
        )
      ] }, Y.id);
    }),
    c && /* @__PURE__ */ $.jsx(f$, { children: /* @__PURE__ */ $.jsxs(
      "div",
      {
        className: "spend-hoverbubble",
        style: {
          left: Math.min(c.left, window.innerWidth - 240),
          top: c.top
        },
        children: [
          /* @__PURE__ */ $.jsx("div", { className: "spend-bubble-title", children: c.title }),
          /* @__PURE__ */ $.jsx("div", { className: "spend-bubble-rows", children: c.rows.map((Y) => /* @__PURE__ */ $.jsxs("div", { className: "spend-bubble-row", children: [
            /* @__PURE__ */ $.jsx("span", { className: "muted", children: Y.label }),
            /* @__PURE__ */ $.jsx("span", { children: Y.value })
          ] }, Y.label)) }),
          /* @__PURE__ */ $.jsx("div", { className: "muted spend-hoverbubble-note", children: c.note })
        ]
      }
    ) })
  ] });
}
function S$({ tx: e }) {
  const [t, n] = ee.useState(!1), r = e.merchant ?? e.merchant_key;
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
function _$({
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
    const x = b > Math.PI ? 1 : 0, A = (C, w) => `${h + C * Math.cos(w)},${h + C * Math.sin(w)}`, T = `M${A(f, _)} A${f},${f} 0 ${x} 1 ${A(f, S)} L${A(d, S)} A${d},${d} 0 ${x} 0 ${A(d, _)} Z`, M = (_ + S) / 2;
    return { ...g, d: T, mid: M, share: g.value / r };
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
    /* @__PURE__ */ $.jsx("text", { x: h, y: h - 2, textAnchor: "middle", fill: "var(--nb-text)", fontSize: "15", fontWeight: "600", children: n ? k0 : or(t) }),
    /* @__PURE__ */ $.jsx("text", { x: h, y: h + 14, textAnchor: "middle", fill: "var(--nb-muted)", fontSize: "10", children: "spent" })
  ] });
}
function O$({
  hass: e,
  config: t
}) {
  const [n, r] = dc(e, t.month_group), [o, u] = ee.useState(null), [c, f] = ee.useState(null), [d, h] = ee.useState(null), y = ee.useRef(0);
  ee.useEffect(() => (y.current += 1, u(null), f(null), h(null), () => {
    y.current += 1;
  }), [n]);
  const v = ee.useCallback(
    (R, k) => Promise.all([c$(R, k, n), QM(R, k, n)]).then(
      ([L, q]) => ({ data: { summary: L, recurring: q }, censored: L.censored })
    ),
    [n]
  ), { data: g, masked: b, error: _ } = od(
    e,
    t.entry,
    v,
    n
  ), S = (R) => {
    const k = ++y.current;
    if (h(null), o === R) {
      u(null), f(null);
      return;
    }
    u(R), f(null), JM(e, t.entry, n, R).then((L) => {
      k === y.current && f(L.transactions);
    }).catch(() => {
      k === y.current && h("Unable to load these transactions.");
    });
  }, x = (g == null ? void 0 : g.summary) ?? null, A = (g == null ? void 0 : g.recurring) ?? null, T = x ? x.themes.filter((R) => parseFloat(R.total) > 0) : [], M = Math.max(1e-9, ...T.map((R) => parseFloat(R.total))), w = (A ? A.streams.filter((R) => !R.is_income) : []).filter((R) => R.active), E = w.reduce(
    (R, k) => R + parseFloat(k.monthly_amount ?? k.average_amount) * (k.monthly_amount ? 1 : i$[k.frequency] ?? 1),
    0
  ), j = A ? A.expected.filter((R) => !R.is_income && !R.overdue).reduce((R, k) => R + k.amount, 0) : 0, N = x && n === vi() && j > 0 ? parseFloat(x.total_spend) + j : null;
  return /* @__PURE__ */ $.jsxs("div", { className: "card", "data-reporting-month": n, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Spending" }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: t.month_group ? /* @__PURE__ */ $.jsx("span", { className: "muted", children: fc(n) }) : /* @__PURE__ */ $.jsx(id, { month: n, onChange: r }) })
    ] }),
    _ && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: _ }),
    !_ && !x && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !_ && x && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
      t.show_stats !== !1 && /* @__PURE__ */ $.jsxs("div", { className: "spend-stats", children: [
        /* @__PURE__ */ $.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-label", children: "Spent" }),
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-value", children: or(parseFloat(x.total_spend)) }),
          N !== null && !b && /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
            "plus scheduled bills ~",
            or(N)
          ] })
        ] }),
        /* @__PURE__ */ $.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-label", children: "Income" }),
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-value up", children: or(parseFloat(x.total_income)) })
        ] }),
        /* @__PURE__ */ $.jsxs("div", { className: "spend-stat", children: [
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-label", children: "Recurring bills" }),
          /* @__PURE__ */ $.jsx("span", { className: "spend-stat-value", children: `${or(E)}/mo` }),
          /* @__PURE__ */ $.jsxs("span", { className: "muted", children: [
            w.length,
            " active"
          ] })
        ] })
      ] }),
      T.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No spending recorded this month." }),
      T.length > 0 && /* @__PURE__ */ $.jsxs("div", { className: "spend-themes-split", children: [
        t.show_donut !== !1 && /* @__PURE__ */ $.jsx(
          _$,
          {
            rows: T,
            totalSpend: parseFloat(x.total_spend),
            censored: b
          }
        ),
        /* @__PURE__ */ $.jsx("div", { className: "spend-themes-bars", children: T.map((R) => /* @__PURE__ */ $.jsxs("div", { children: [
          /* @__PURE__ */ $.jsxs(
            "button",
            {
              className: `spend-row ${o === R.theme ? "open" : ""}`,
              onClick: () => S(R.theme),
              children: [
                /* @__PURE__ */ $.jsxs("span", { className: "spend-row-label", children: [
                  /* @__PURE__ */ $.jsx(
                    "span",
                    {
                      className: "spend-theme-dot",
                      style: { background: ju(R.theme) }
                    }
                  ),
                  R.theme
                ] }),
                /* @__PURE__ */ $.jsx("span", { className: "spend-row-bar", children: /* @__PURE__ */ $.jsx(
                  "span",
                  {
                    className: "spend-row-fill",
                    style: {
                      width: `${parseFloat(R.total) / M * 100}%`,
                      "--bar-color": ju(R.theme)
                    }
                  }
                ) }),
                /* @__PURE__ */ $.jsx("span", { className: "spend-row-amount", children: Ht(parseFloat(R.total), b) }),
                /* @__PURE__ */ $.jsxs("span", { className: "muted spend-row-count", children: [
                  R.count,
                  "×"
                ] })
              ]
            }
          ),
          o === R.theme && /* @__PURE__ */ $.jsxs("div", { className: "spend-txns", children: [
            d && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: d }),
            c === null && !d && /* @__PURE__ */ $.jsx("div", { className: "muted", children: "Loading…" }),
            c !== null && [...c].sort(
              (k, L) => Number(L.pending) - Number(k.pending) || L.posted_at.localeCompare(k.posted_at)
            ).map((k) => /* @__PURE__ */ $.jsxs("div", { className: "spend-txn", children: [
              /* @__PURE__ */ $.jsx("span", { className: "muted spend-txn-date", children: new Date(k.posted_at).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                timeZone: "Asia/Kolkata"
              }) }),
              /* @__PURE__ */ $.jsx(S$, { tx: k }),
              /* @__PURE__ */ $.jsxs("span", { className: "spend-txn-desc", title: k.description, children: [
                k.merchant ?? k.description,
                k.pending ? " · pending" : ""
              ] }),
              /* @__PURE__ */ $.jsx("span", { className: "spend-txn-amount", children: Ht(parseFloat(k.amount), b) })
            ] }, k.id))
          ] })
        ] }, R.theme)) })
      ] })
    ] })
  ] });
}
function rC(e) {
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
function aC(e) {
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
function w$(e, t, n) {
  if (e.length === 0) return [];
  const r = aC(n), o = /* @__PURE__ */ new Map();
  for (const f of e) o.set(r(f.ts), Vn(f, t));
  const u = [...o.keys()].sort((f, d) => f - d);
  let c = Vn(e[0], t);
  return u.map((f) => {
    const d = o.get(f), h = d - c;
    return c = d, { ts: f, flow: h };
  });
}
function A$(e, t, n) {
  if (e.length === 0) return [];
  const r = aC(n), o = /* @__PURE__ */ new Map();
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
function hb(e, t) {
  let n = 0;
  for (const r of t) {
    const o = e.values[r.id] ?? 0;
    o < 0 && (n += o);
  }
  return n;
}
const tw = {
  Retirement: "#60a5fa",
  Taxable: "#818cf8",
  "Non-retirement": "#818cf8",
  Cash: "#34d399",
  Liquid: "#34d399",
  Debt: "#f472b6",
  "Credit cards": "#f472b6"
};
function T$(e, t, n) {
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
  const c = hb(r, n);
  return [
    { label: "Retirement", v: u },
    { label: "Non-retirement", v: o((f) => f.category !== "retirement" && (t[f.id] ?? 0) > 0) },
    { label: "Debt", v: c }
  ];
}
function E$({ parts: e }) {
  const t = e.filter((r) => r.v !== 0), n = t.reduce((r, o) => r + Math.abs(o.v), 0);
  return t.length < 2 || n === 0 ? null : /* @__PURE__ */ $.jsxs("div", { className: "comp", children: [
    /* @__PURE__ */ $.jsx("div", { className: "comp-bar", children: t.map((r) => /* @__PURE__ */ $.jsx(
      "span",
      {
        style: {
          background: tw[r.label] ?? "#8b9bb4",
          width: `${Math.abs(r.v) / n * 100}%`
        }
      },
      r.label
    )) }),
    /* @__PURE__ */ $.jsx("div", { className: "comp-legend", children: t.map((r) => /* @__PURE__ */ $.jsxs("span", { className: "comp-item", children: [
      /* @__PURE__ */ $.jsx("span", { className: "comp-dot", style: { background: tw[r.label] ?? "#8b9bb4" } }),
      r.label,
      " ",
      /* @__PURE__ */ $.jsx("b", { children: FM(r.v) })
    ] }, r.label)) })
  ] });
}
function j$({
  hass: e,
  config: t
}) {
  const n = jo.find((_) => _.key === (t.view ?? "all")) ?? jo[2], [r, o] = ee.useState(t.range ?? "1m"), { overview: u, series: c, masked: f, error: d } = L0(e, t.entry, r), h = nC(u), y = ee.useMemo(() => h.filter(n.pick), [h, n]), v = ee.useMemo(() => {
    if (!c) return null;
    const _ = new Set(y.map((T) => T.id)), S = rC(c.filter((T) => _.has(T.account_id)));
    if (S.length === 0) return null;
    const x = Vn(S[0], y), A = Vn(S[S.length - 1], y);
    return {
      last: A,
      diff: A - x,
      delta: x !== 0 ? (A - x) / Math.abs(x) : null,
      parts: T$(n.key, S[S.length - 1].values, y)
    };
  }, [c, y, n]), g = v != null && v.delta != null, b = t.layout === "banner";
  return /* @__PURE__ */ $.jsxs("div", { className: `card${b ? " stat-banner" : ""}`, children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? n.label }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: t.show_controls !== !1 && t.show_range_selector !== !1 && /* @__PURE__ */ $.jsx("span", { className: "controls", children: /* @__PURE__ */ $.jsx(rf, { options: B0, value: r, onChange: o }) }) })
    ] }),
    d && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: d }),
    !d && !v && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !d && v && f && // Censored: the dollar amount is redacted anyway, so promote the real
    // percent change to the big slot and drop the footer line entirely.
    /* @__PURE__ */ $.jsx(
      "div",
      {
        className: `stat-value ${g && !n.flow ? v.delta >= 0 ? "up" : "down" : ""}`,
        children: g && !n.flow ? Eu(v.delta) : k0
      }
    ),
    !d && v && !f && /* @__PURE__ */ $.jsxs($.Fragment, { children: [
      /* @__PURE__ */ $.jsx("div", { className: "stat-value", children: or(v.last) }),
      g && /* @__PURE__ */ $.jsxs("div", { className: "stat-delta", children: [
        /* @__PURE__ */ $.jsxs("span", { className: `chip ${v.diff >= 0 ? "up" : "down"}`, children: [
          fb(v.diff),
          !n.flow && ` (${Eu(v.delta)})`
        ] }),
        /* @__PURE__ */ $.jsxs("span", { children: [
          "over ",
          r
        ] })
      ] }),
      t.show_composition !== !1 && /* @__PURE__ */ $.jsx(E$, { parts: v.parts })
    ] })
  ] });
}
function iC(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = iC(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function $e() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = iC(e)) && (r && (r += " "), r += t);
  return r;
}
var uv, nw;
function ln() {
  if (nw) return uv;
  nw = 1;
  var e = Array.isArray;
  return uv = e, uv;
}
var cv, rw;
function oC() {
  if (rw) return cv;
  rw = 1;
  var e = typeof ks == "object" && ks && ks.Object === Object && ks;
  return cv = e, cv;
}
var sv, aw;
function vr() {
  if (aw) return sv;
  aw = 1;
  var e = oC(), t = typeof self == "object" && self && self.Object === Object && self, n = e || t || Function("return this")();
  return sv = n, sv;
}
var fv, iw;
function hc() {
  if (iw) return fv;
  iw = 1;
  var e = vr(), t = e.Symbol;
  return fv = t, fv;
}
var dv, ow;
function M$() {
  if (ow) return dv;
  ow = 1;
  var e = hc(), t = Object.prototype, n = t.hasOwnProperty, r = t.toString, o = e ? e.toStringTag : void 0;
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
  return dv = u, dv;
}
var hv, lw;
function C$() {
  if (lw) return hv;
  lw = 1;
  var e = Object.prototype, t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return hv = n, hv;
}
var pv, uw;
function Xr() {
  if (uw) return pv;
  uw = 1;
  var e = hc(), t = M$(), n = C$(), r = "[object Null]", o = "[object Undefined]", u = e ? e.toStringTag : void 0;
  function c(f) {
    return f == null ? f === void 0 ? o : r : u && u in Object(f) ? t(f) : n(f);
  }
  return pv = c, pv;
}
var vv, cw;
function Vr() {
  if (cw) return vv;
  cw = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return vv = e, vv;
}
var yv, sw;
function rl() {
  if (sw) return yv;
  sw = 1;
  var e = Xr(), t = Vr(), n = "[object Symbol]";
  function r(o) {
    return typeof o == "symbol" || t(o) && e(o) == n;
  }
  return yv = r, yv;
}
var mv, fw;
function U0() {
  if (fw) return mv;
  fw = 1;
  var e = ln(), t = rl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function o(u, c) {
    if (e(u))
      return !1;
    var f = typeof u;
    return f == "number" || f == "symbol" || f == "boolean" || u == null || t(u) ? !0 : r.test(u) || !n.test(u) || c != null && u in Object(c);
  }
  return mv = o, mv;
}
var gv, dw;
function Da() {
  if (dw) return gv;
  dw = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return gv = e, gv;
}
var bv, hw;
function I0() {
  if (hw) return bv;
  hw = 1;
  var e = Xr(), t = Da(), n = "[object AsyncFunction]", r = "[object Function]", o = "[object GeneratorFunction]", u = "[object Proxy]";
  function c(f) {
    if (!t(f))
      return !1;
    var d = e(f);
    return d == r || d == o || d == n || d == u;
  }
  return bv = c, bv;
}
var xv, pw;
function D$() {
  if (pw) return xv;
  pw = 1;
  var e = vr(), t = e["__core-js_shared__"];
  return xv = t, xv;
}
var Sv, vw;
function P$() {
  if (vw) return Sv;
  vw = 1;
  var e = D$(), t = (function() {
    var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!t && t in r;
  }
  return Sv = n, Sv;
}
var _v, yw;
function lC() {
  if (yw) return _v;
  yw = 1;
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
  return _v = n, _v;
}
var Ov, mw;
function N$() {
  if (mw) return Ov;
  mw = 1;
  var e = I0(), t = P$(), n = Da(), r = lC(), o = /[\\^$.*+?()[\]{}|]/g, u = /^\[object .+?Constructor\]$/, c = Function.prototype, f = Object.prototype, d = c.toString, h = f.hasOwnProperty, y = RegExp(
    "^" + d.call(h).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function v(g) {
    if (!n(g) || t(g))
      return !1;
    var b = e(g) ? y : u;
    return b.test(r(g));
  }
  return Ov = v, Ov;
}
var wv, gw;
function R$() {
  if (gw) return wv;
  gw = 1;
  function e(t, n) {
    return t == null ? void 0 : t[n];
  }
  return wv = e, wv;
}
var Av, bw;
function _i() {
  if (bw) return Av;
  bw = 1;
  var e = N$(), t = R$();
  function n(r, o) {
    var u = t(r, o);
    return e(u) ? u : void 0;
  }
  return Av = n, Av;
}
var Tv, xw;
function ld() {
  if (xw) return Tv;
  xw = 1;
  var e = _i(), t = e(Object, "create");
  return Tv = t, Tv;
}
var Ev, Sw;
function $$() {
  if (Sw) return Ev;
  Sw = 1;
  var e = ld();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Ev = t, Ev;
}
var jv, _w;
function z$() {
  if (_w) return jv;
  _w = 1;
  function e(t) {
    var n = this.has(t) && delete this.__data__[t];
    return this.size -= n ? 1 : 0, n;
  }
  return jv = e, jv;
}
var Mv, Ow;
function q$() {
  if (Ow) return Mv;
  Ow = 1;
  var e = ld(), t = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function o(u) {
    var c = this.__data__;
    if (e) {
      var f = c[u];
      return f === t ? void 0 : f;
    }
    return r.call(c, u) ? c[u] : void 0;
  }
  return Mv = o, Mv;
}
var Cv, ww;
function k$() {
  if (ww) return Cv;
  ww = 1;
  var e = ld(), t = Object.prototype, n = t.hasOwnProperty;
  function r(o) {
    var u = this.__data__;
    return e ? u[o] !== void 0 : n.call(u, o);
  }
  return Cv = r, Cv;
}
var Dv, Aw;
function B$() {
  if (Aw) return Dv;
  Aw = 1;
  var e = ld(), t = "__lodash_hash_undefined__";
  function n(r, o) {
    var u = this.__data__;
    return this.size += this.has(r) ? 0 : 1, u[r] = e && o === void 0 ? t : o, this;
  }
  return Dv = n, Dv;
}
var Pv, Tw;
function L$() {
  if (Tw) return Pv;
  Tw = 1;
  var e = $$(), t = z$(), n = q$(), r = k$(), o = B$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, Pv = u, Pv;
}
var Nv, Ew;
function U$() {
  if (Ew) return Nv;
  Ew = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Nv = e, Nv;
}
var Rv, jw;
function H0() {
  if (jw) return Rv;
  jw = 1;
  function e(t, n) {
    return t === n || t !== t && n !== n;
  }
  return Rv = e, Rv;
}
var $v, Mw;
function ud() {
  if (Mw) return $v;
  Mw = 1;
  var e = H0();
  function t(n, r) {
    for (var o = n.length; o--; )
      if (e(n[o][0], r))
        return o;
    return -1;
  }
  return $v = t, $v;
}
var zv, Cw;
function I$() {
  if (Cw) return zv;
  Cw = 1;
  var e = ud(), t = Array.prototype, n = t.splice;
  function r(o) {
    var u = this.__data__, c = e(u, o);
    if (c < 0)
      return !1;
    var f = u.length - 1;
    return c == f ? u.pop() : n.call(u, c, 1), --this.size, !0;
  }
  return zv = r, zv;
}
var qv, Dw;
function H$() {
  if (Dw) return qv;
  Dw = 1;
  var e = ud();
  function t(n) {
    var r = this.__data__, o = e(r, n);
    return o < 0 ? void 0 : r[o][1];
  }
  return qv = t, qv;
}
var kv, Pw;
function G$() {
  if (Pw) return kv;
  Pw = 1;
  var e = ud();
  function t(n) {
    return e(this.__data__, n) > -1;
  }
  return kv = t, kv;
}
var Bv, Nw;
function Y$() {
  if (Nw) return Bv;
  Nw = 1;
  var e = ud();
  function t(n, r) {
    var o = this.__data__, u = e(o, n);
    return u < 0 ? (++this.size, o.push([n, r])) : o[u][1] = r, this;
  }
  return Bv = t, Bv;
}
var Lv, Rw;
function cd() {
  if (Rw) return Lv;
  Rw = 1;
  var e = U$(), t = I$(), n = H$(), r = G$(), o = Y$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, Lv = u, Lv;
}
var Uv, $w;
function G0() {
  if ($w) return Uv;
  $w = 1;
  var e = _i(), t = vr(), n = e(t, "Map");
  return Uv = n, Uv;
}
var Iv, zw;
function K$() {
  if (zw) return Iv;
  zw = 1;
  var e = L$(), t = cd(), n = G0();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (n || t)(),
      string: new e()
    };
  }
  return Iv = r, Iv;
}
var Hv, qw;
function X$() {
  if (qw) return Hv;
  qw = 1;
  function e(t) {
    var n = typeof t;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? t !== "__proto__" : t === null;
  }
  return Hv = e, Hv;
}
var Gv, kw;
function sd() {
  if (kw) return Gv;
  kw = 1;
  var e = X$();
  function t(n, r) {
    var o = n.__data__;
    return e(r) ? o[typeof r == "string" ? "string" : "hash"] : o.map;
  }
  return Gv = t, Gv;
}
var Yv, Bw;
function V$() {
  if (Bw) return Yv;
  Bw = 1;
  var e = sd();
  function t(n) {
    var r = e(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return Yv = t, Yv;
}
var Kv, Lw;
function F$() {
  if (Lw) return Kv;
  Lw = 1;
  var e = sd();
  function t(n) {
    return e(this, n).get(n);
  }
  return Kv = t, Kv;
}
var Xv, Uw;
function W$() {
  if (Uw) return Xv;
  Uw = 1;
  var e = sd();
  function t(n) {
    return e(this, n).has(n);
  }
  return Xv = t, Xv;
}
var Vv, Iw;
function Z$() {
  if (Iw) return Vv;
  Iw = 1;
  var e = sd();
  function t(n, r) {
    var o = e(this, n), u = o.size;
    return o.set(n, r), this.size += o.size == u ? 0 : 1, this;
  }
  return Vv = t, Vv;
}
var Fv, Hw;
function Y0() {
  if (Hw) return Fv;
  Hw = 1;
  var e = K$(), t = V$(), n = F$(), r = W$(), o = Z$();
  function u(c) {
    var f = -1, d = c == null ? 0 : c.length;
    for (this.clear(); ++f < d; ) {
      var h = c[f];
      this.set(h[0], h[1]);
    }
  }
  return u.prototype.clear = e, u.prototype.delete = t, u.prototype.get = n, u.prototype.has = r, u.prototype.set = o, Fv = u, Fv;
}
var Wv, Gw;
function uC() {
  if (Gw) return Wv;
  Gw = 1;
  var e = Y0(), t = "Expected a function";
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
  return n.Cache = e, Wv = n, Wv;
}
var Zv, Yw;
function Q$() {
  if (Yw) return Zv;
  Yw = 1;
  var e = uC(), t = 500;
  function n(r) {
    var o = e(r, function(c) {
      return u.size === t && u.clear(), c;
    }), u = o.cache;
    return o;
  }
  return Zv = n, Zv;
}
var Qv, Kw;
function J$() {
  if (Kw) return Qv;
  Kw = 1;
  var e = Q$(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = e(function(o) {
    var u = [];
    return o.charCodeAt(0) === 46 && u.push(""), o.replace(t, function(c, f, d, h) {
      u.push(d ? h.replace(n, "$1") : f || c);
    }), u;
  });
  return Qv = r, Qv;
}
var Jv, Xw;
function K0() {
  if (Xw) return Jv;
  Xw = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length, u = Array(o); ++r < o; )
      u[r] = n(t[r], r, t);
    return u;
  }
  return Jv = e, Jv;
}
var ey, Vw;
function ez() {
  if (Vw) return ey;
  Vw = 1;
  var e = hc(), t = K0(), n = ln(), r = rl(), o = e ? e.prototype : void 0, u = o ? o.toString : void 0;
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
  return ey = c, ey;
}
var ty, Fw;
function cC() {
  if (Fw) return ty;
  Fw = 1;
  var e = ez();
  function t(n) {
    return n == null ? "" : e(n);
  }
  return ty = t, ty;
}
var ny, Ww;
function sC() {
  if (Ww) return ny;
  Ww = 1;
  var e = ln(), t = U0(), n = J$(), r = cC();
  function o(u, c) {
    return e(u) ? u : t(u, c) ? [u] : n(r(u));
  }
  return ny = o, ny;
}
var ry, Zw;
function fd() {
  if (Zw) return ry;
  Zw = 1;
  var e = rl();
  function t(n) {
    if (typeof n == "string" || e(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return ry = t, ry;
}
var ay, Qw;
function X0() {
  if (Qw) return ay;
  Qw = 1;
  var e = sC(), t = fd();
  function n(r, o) {
    o = e(o, r);
    for (var u = 0, c = o.length; r != null && u < c; )
      r = r[t(o[u++])];
    return u && u == c ? r : void 0;
  }
  return ay = n, ay;
}
var iy, Jw;
function fC() {
  if (Jw) return iy;
  Jw = 1;
  var e = X0();
  function t(n, r, o) {
    var u = n == null ? void 0 : e(n, r);
    return u === void 0 ? o : u;
  }
  return iy = t, iy;
}
var tz = fC();
const Bn = /* @__PURE__ */ tt(tz);
var oy, eA;
function nz() {
  if (eA) return oy;
  eA = 1;
  function e(t) {
    return t == null;
  }
  return oy = e, oy;
}
var rz = nz();
const we = /* @__PURE__ */ tt(rz);
var ly, tA;
function az() {
  if (tA) return ly;
  tA = 1;
  var e = Xr(), t = ln(), n = Vr(), r = "[object String]";
  function o(u) {
    return typeof u == "string" || !t(u) && n(u) && e(u) == r;
  }
  return ly = o, ly;
}
var iz = az();
const yi = /* @__PURE__ */ tt(iz);
var oz = I0();
const Ee = /* @__PURE__ */ tt(oz);
var lz = Da();
const al = /* @__PURE__ */ tt(lz);
var uy = { exports: {} }, He = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nA;
function uz() {
  if (nA) return He;
  nA = 1;
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
var rA;
function cz() {
  return rA || (rA = 1, uy.exports = uz()), uy.exports;
}
var sz = cz(), cy, aA;
function dC() {
  if (aA) return cy;
  aA = 1;
  var e = Xr(), t = Vr(), n = "[object Number]";
  function r(o) {
    return typeof o == "number" || t(o) && e(o) == n;
  }
  return cy = r, cy;
}
var sy, iA;
function fz() {
  if (iA) return sy;
  iA = 1;
  var e = dC();
  function t(n) {
    return e(n) && n != +n;
  }
  return sy = t, sy;
}
var dz = fz();
const il = /* @__PURE__ */ tt(dz);
var hz = dC();
const pz = /* @__PURE__ */ tt(hz);
var Wn = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, li = function(t) {
  return yi(t) && t.indexOf("%") === t.length - 1;
}, de = function(t) {
  return pz(t) && !il(t);
}, vz = function(t) {
  return we(t);
}, wt = function(t) {
  return de(t) || yi(t);
}, yz = 0, Oi = function(t) {
  var n = ++yz;
  return "".concat(t || "").concat(n);
}, mi = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!de(t) && !yi(t))
    return r;
  var u;
  if (li(t)) {
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
}, mz = function(t) {
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
function af(e, t, n) {
  return !e || !e.length ? null : e.find(function(r) {
    return r && (typeof t == "function" ? t(r) : Bn(r, t)) === n;
  });
}
var gz = function(t) {
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
}, bz = function(t, n) {
  return de(t) && de(n) ? t - n : yi(t) && yi(n) ? t.localeCompare(n) : t instanceof Date && n instanceof Date ? t.getTime() - n.getTime() : String(t).localeCompare(String(n));
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
function pb(e) {
  "@babel/helpers - typeof";
  return pb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pb(e);
}
var xz = ["viewBox", "children"], Sz = [
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
], oA = ["points", "pathLength"], fy = {
  svg: xz,
  polygon: oA,
  polyline: oA
}, V0 = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], of = function(t, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var r = t;
  if (/* @__PURE__ */ ee.isValidElement(t) && (r = t.props), !al(r))
    return null;
  var o = {};
  return Object.keys(r).forEach(function(u) {
    V0.includes(u) && (o[u] = n || function(c) {
      return r[u](r, c);
    });
  }), o;
}, _z = function(t, n, r) {
  return function(o) {
    return t(n, r, o), null;
  };
}, Mu = function(t, n, r) {
  if (!al(t) || pb(t) !== "object")
    return null;
  var o = null;
  return Object.keys(t).forEach(function(u) {
    var c = t[u];
    V0.includes(u) && typeof c == "function" && (o || (o = {}), o[u] = _z(c, n, r));
  }), o;
}, Oz = ["children"], wz = ["children"];
function lA(e, t) {
  if (e == null) return {};
  var n = Az(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Az(e, t) {
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
  "@babel/helpers - typeof";
  return vb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vb(e);
}
var uA = {
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
}, cA = null, dy = null, F0 = function e(t) {
  if (t === cA && Array.isArray(dy))
    return dy;
  var n = [];
  return ee.Children.forEach(t, function(r) {
    we(r) || (sz.isFragment(r) ? n = n.concat(e(r.props.children)) : n.push(r));
  }), dy = n, cA = t, n;
};
function on(e, t) {
  var n = [], r = [];
  return Array.isArray(t) ? r = t.map(function(o) {
    return Lr(o);
  }) : r = [Lr(t)], F0(e).forEach(function(o) {
    var u = Bn(o, "type.displayName") || Bn(o, "type.name");
    r.indexOf(u) !== -1 && n.push(o);
  }), n;
}
function xn(e, t) {
  var n = on(e, t);
  return n && n[0];
}
var sA = function(t) {
  if (!t || !t.props)
    return !1;
  var n = t.props, r = n.width, o = n.height;
  return !(!de(r) || r <= 0 || !de(o) || o <= 0);
}, Tz = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], Ez = function(t) {
  return t && t.type && yi(t.type) && Tz.indexOf(t.type) >= 0;
}, hC = function(t) {
  return t && vb(t) === "object" && "clipDot" in t;
}, jz = function(t, n, r, o) {
  var u, c = (u = fy == null ? void 0 : fy[o]) !== null && u !== void 0 ? u : [];
  return n.startsWith("data-") || !Ee(t) && (o && c.includes(n) || Sz.includes(n)) || r && V0.includes(n);
}, Te = function(t, n, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var o = t;
  if (/* @__PURE__ */ ee.isValidElement(t) && (o = t.props), !al(o))
    return null;
  var u = {};
  return Object.keys(o).forEach(function(c) {
    var f;
    jz((f = o) === null || f === void 0 ? void 0 : f[c], c, n, r) && (u[c] = o[c]);
  }), u;
}, yb = function e(t, n) {
  if (t === n)
    return !0;
  var r = ee.Children.count(t);
  if (r !== ee.Children.count(n))
    return !1;
  if (r === 0)
    return !0;
  if (r === 1)
    return fA(Array.isArray(t) ? t[0] : t, Array.isArray(n) ? n[0] : n);
  for (var o = 0; o < r; o++) {
    var u = t[o], c = n[o];
    if (Array.isArray(u) || Array.isArray(c)) {
      if (!e(u, c))
        return !1;
    } else if (!fA(u, c))
      return !1;
  }
  return !0;
}, fA = function(t, n) {
  if (we(t) && we(n))
    return !0;
  if (!we(t) && !we(n)) {
    var r = t.props || {}, o = r.children, u = lA(r, Oz), c = n.props || {}, f = c.children, d = lA(c, wz);
    return o && f ? wo(u, d) && yb(o, f) : !o && !f ? wo(u, d) : !1;
  }
  return !1;
}, dA = function(t, n) {
  var r = [], o = {};
  return F0(t).forEach(function(u, c) {
    if (Ez(u))
      r.push(u);
    else if (u) {
      var f = Lr(u.type), d = n[f] || {}, h = d.handler, y = d.once;
      if (h && (!y || !o[f])) {
        var v = h(u, f, c);
        r.push(v), o[f] = !0;
      }
    }
  }), r;
}, Mz = function(t) {
  var n = t && t.type;
  return n && uA[n] ? uA[n] : null;
}, Cz = function(t, n) {
  return F0(n).indexOf(t);
}, Dz = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function mb() {
  return mb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, mb.apply(this, arguments);
}
function Pz(e, t) {
  if (e == null) return {};
  var n = Nz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Nz(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function gb(e) {
  var t = e.children, n = e.width, r = e.height, o = e.viewBox, u = e.className, c = e.style, f = e.title, d = e.desc, h = Pz(e, Dz), y = o || {
    width: n,
    height: r,
    x: 0,
    y: 0
  }, v = $e("recharts-surface", u);
  return /* @__PURE__ */ U.createElement("svg", mb({}, Te(h, !0, "svg"), {
    className: v,
    width: n,
    height: r,
    style: c,
    viewBox: "".concat(y.x, " ").concat(y.y, " ").concat(y.width, " ").concat(y.height)
  }), /* @__PURE__ */ U.createElement("title", null, f), /* @__PURE__ */ U.createElement("desc", null, d), t);
}
var Rz = ["children", "className"];
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
function $z(e, t) {
  if (e == null) return {};
  var n = zz(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function zz(e, t) {
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
  var n = e.children, r = e.className, o = $z(e, Rz), u = $e("recharts-layer", r);
  return /* @__PURE__ */ U.createElement("g", bb({
    className: u
  }, Te(o, !0), {
    ref: t
  }), n);
}), Ur = function(t, n) {
  for (var r = arguments.length, o = new Array(r > 2 ? r - 2 : 0), u = 2; u < r; u++)
    o[u - 2] = arguments[u];
}, hy, hA;
function qz() {
  if (hA) return hy;
  hA = 1;
  function e(t, n, r) {
    var o = -1, u = t.length;
    n < 0 && (n = -n > u ? 0 : u + n), r = r > u ? u : r, r < 0 && (r += u), u = n > r ? 0 : r - n >>> 0, n >>>= 0;
    for (var c = Array(u); ++o < u; )
      c[o] = t[o + n];
    return c;
  }
  return hy = e, hy;
}
var py, pA;
function kz() {
  if (pA) return py;
  pA = 1;
  var e = qz();
  function t(n, r, o) {
    var u = n.length;
    return o = o === void 0 ? u : o, !r && o >= u ? n : e(n, r, o);
  }
  return py = t, py;
}
var vy, vA;
function pC() {
  if (vA) return vy;
  vA = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = t + n + r, u = "\\ufe0e\\ufe0f", c = "\\u200d", f = RegExp("[" + c + e + o + u + "]");
  function d(h) {
    return f.test(h);
  }
  return vy = d, vy;
}
var yy, yA;
function Bz() {
  if (yA) return yy;
  yA = 1;
  function e(t) {
    return t.split("");
  }
  return yy = e, yy;
}
var my, mA;
function Lz() {
  if (mA) return my;
  mA = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = t + n + r, u = "\\ufe0e\\ufe0f", c = "[" + e + "]", f = "[" + o + "]", d = "\\ud83c[\\udffb-\\udfff]", h = "(?:" + f + "|" + d + ")", y = "[^" + e + "]", v = "(?:\\ud83c[\\udde6-\\uddff]){2}", g = "[\\ud800-\\udbff][\\udc00-\\udfff]", b = "\\u200d", _ = h + "?", S = "[" + u + "]?", x = "(?:" + b + "(?:" + [y, v, g].join("|") + ")" + S + _ + ")*", A = S + _ + x, T = "(?:" + [y + f + "?", f, v, g, c].join("|") + ")", M = RegExp(d + "(?=" + d + ")|" + T + A, "g");
  function C(w) {
    return w.match(M) || [];
  }
  return my = C, my;
}
var gy, gA;
function Uz() {
  if (gA) return gy;
  gA = 1;
  var e = Bz(), t = pC(), n = Lz();
  function r(o) {
    return t(o) ? n(o) : e(o);
  }
  return gy = r, gy;
}
var by, bA;
function Iz() {
  if (bA) return by;
  bA = 1;
  var e = kz(), t = pC(), n = Uz(), r = cC();
  function o(u) {
    return function(c) {
      c = r(c);
      var f = t(c) ? n(c) : void 0, d = f ? f[0] : c.charAt(0), h = f ? e(f, 1).join("") : c.slice(1);
      return d[u]() + h;
    };
  }
  return by = o, by;
}
var xy, xA;
function Hz() {
  if (xA) return xy;
  xA = 1;
  var e = Iz(), t = e("toUpperCase");
  return xy = t, xy;
}
var Gz = Hz();
const dd = /* @__PURE__ */ tt(Gz);
function nt(e) {
  return function() {
    return e;
  };
}
const vC = Math.cos, lf = Math.sin, Qn = Math.sqrt, uf = Math.PI, hd = 2 * uf, xb = Math.PI, Sb = 2 * xb, ii = 1e-6, Yz = Sb - ii;
function yC(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function Kz(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return yC;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let o = 1, u = r.length; o < u; ++o)
      this._ += Math.round(arguments[o] * n) / n + r[o];
  };
}
class Xz {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? yC : Kz(t);
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
    else if (g > ii) if (!(Math.abs(v * d - h * y) > ii) || !u)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let b = r - c, _ = o - f, S = d * d + h * h, x = b * b + _ * _, A = Math.sqrt(S), T = Math.sqrt(g), M = u * Math.tan((xb - Math.acos((S + g - x) / (2 * A * T))) / 2), C = M / T, w = M / A;
      Math.abs(C - 1) > ii && this._append`L${t + C * y},${n + C * v}`, this._append`A${u},${u},0,0,${+(v * b > y * _)},${this._x1 = t + w * d},${this._y1 = n + w * h}`;
    }
  }
  arc(t, n, r, o, u, c) {
    if (t = +t, n = +n, r = +r, c = !!c, r < 0) throw new Error(`negative radius: ${r}`);
    let f = r * Math.cos(o), d = r * Math.sin(o), h = t + f, y = n + d, v = 1 ^ c, g = c ? o - u : u - o;
    this._x1 === null ? this._append`M${h},${y}` : (Math.abs(this._x1 - h) > ii || Math.abs(this._y1 - y) > ii) && this._append`L${h},${y}`, r && (g < 0 && (g = g % Sb + Sb), g > Yz ? this._append`A${r},${r},0,1,${v},${t - f},${n - d}A${r},${r},0,1,${v},${this._x1 = h},${this._y1 = y}` : g > ii && this._append`A${r},${r},0,${+(g >= xb)},${v},${this._x1 = t + r * Math.cos(u)},${this._y1 = n + r * Math.sin(u)}`);
  }
  rect(t, n, r, o) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+o}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function W0(e) {
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
  }, () => new Xz(t);
}
function Z0(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function mC(e) {
  this._context = e;
}
mC.prototype = {
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
function pd(e) {
  return new mC(e);
}
function gC(e) {
  return e[0];
}
function bC(e) {
  return e[1];
}
function xC(e, t) {
  var n = nt(!0), r = null, o = pd, u = null, c = W0(f);
  e = typeof e == "function" ? e : e === void 0 ? gC : nt(e), t = typeof t == "function" ? t : t === void 0 ? bC : nt(t);
  function f(d) {
    var h, y = (d = Z0(d)).length, v, g = !1, b;
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
function Bs(e, t, n) {
  var r = null, o = nt(!0), u = null, c = pd, f = null, d = W0(h);
  e = typeof e == "function" ? e : e === void 0 ? gC : nt(+e), t = typeof t == "function" ? t : nt(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? bC : nt(+n);
  function h(v) {
    var g, b, _, S = (v = Z0(v)).length, x, A = !1, T, M = new Array(S), C = new Array(S);
    for (u == null && (f = c(T = d())), g = 0; g <= S; ++g) {
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
    if (T) return f = null, T + "" || null;
  }
  function y() {
    return xC().defined(o).curve(c).context(u);
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
class SC {
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
function Vz(e) {
  return new SC(e, !0);
}
function Fz(e) {
  return new SC(e, !1);
}
const Q0 = {
  draw(e, t) {
    const n = Qn(t / uf);
    e.moveTo(n, 0), e.arc(0, 0, n, 0, hd);
  }
}, Wz = {
  draw(e, t) {
    const n = Qn(t / 5) / 2;
    e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
  }
}, _C = Qn(1 / 3), Zz = _C * 2, Qz = {
  draw(e, t) {
    const n = Qn(t / Zz), r = n * _C;
    e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
  }
}, Jz = {
  draw(e, t) {
    const n = Qn(t), r = -n / 2;
    e.rect(r, r, n, n);
  }
}, eq = 0.8908130915292852, OC = lf(uf / 10) / lf(7 * uf / 10), tq = lf(hd / 10) * OC, nq = -vC(hd / 10) * OC, rq = {
  draw(e, t) {
    const n = Qn(t * eq), r = tq * n, o = nq * n;
    e.moveTo(0, -n), e.lineTo(r, o);
    for (let u = 1; u < 5; ++u) {
      const c = hd * u / 5, f = vC(c), d = lf(c);
      e.lineTo(d * n, -f * n), e.lineTo(f * r - d * o, d * r + f * o);
    }
    e.closePath();
  }
}, Sy = Qn(3), aq = {
  draw(e, t) {
    const n = -Qn(t / (Sy * 3));
    e.moveTo(0, n * 2), e.lineTo(-Sy * n, -n), e.lineTo(Sy * n, -n), e.closePath();
  }
}, Rn = -0.5, $n = Qn(3) / 2, _b = 1 / Qn(12), iq = (_b / 2 + 1) * 3, oq = {
  draw(e, t) {
    const n = Qn(t / iq), r = n / 2, o = n * _b, u = r, c = n * _b + n, f = -u, d = c;
    e.moveTo(r, o), e.lineTo(u, c), e.lineTo(f, d), e.lineTo(Rn * r - $n * o, $n * r + Rn * o), e.lineTo(Rn * u - $n * c, $n * u + Rn * c), e.lineTo(Rn * f - $n * d, $n * f + Rn * d), e.lineTo(Rn * r + $n * o, Rn * o - $n * r), e.lineTo(Rn * u + $n * c, Rn * c - $n * u), e.lineTo(Rn * f + $n * d, Rn * d - $n * f), e.closePath();
  }
};
function lq(e, t) {
  let n = null, r = W0(o);
  e = typeof e == "function" ? e : nt(e || Q0), t = typeof t == "function" ? t : nt(t === void 0 ? 64 : +t);
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
function cf() {
}
function sf(e, t, n) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + n) / 6
  );
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
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        sf(this, this._x1, this._y1);
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
        sf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function uq(e) {
  return new wC(e);
}
function AC(e) {
  this._context = e;
}
AC.prototype = {
  areaStart: cf,
  areaEnd: cf,
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
        sf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function cq(e) {
  return new AC(e);
}
function TC(e) {
  this._context = e;
}
TC.prototype = {
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
        sf(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function sq(e) {
  return new TC(e);
}
function EC(e) {
  this._context = e;
}
EC.prototype = {
  areaStart: cf,
  areaEnd: cf,
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
function fq(e) {
  return new EC(e);
}
function SA(e) {
  return e < 0 ? -1 : 1;
}
function _A(e, t, n) {
  var r = e._x1 - e._x0, o = t - e._x1, u = (e._y1 - e._y0) / (r || o < 0 && -0), c = (n - e._y1) / (o || r < 0 && -0), f = (u * o + c * r) / (r + o);
  return (SA(u) + SA(c)) * Math.min(Math.abs(u), Math.abs(c), 0.5 * Math.abs(f)) || 0;
}
function OA(e, t) {
  var n = e._x1 - e._x0;
  return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function _y(e, t, n) {
  var r = e._x0, o = e._y0, u = e._x1, c = e._y1, f = (u - r) / 3;
  e._context.bezierCurveTo(r + f, o + f * t, u - f, c - f * n, u, c);
}
function ff(e) {
  this._context = e;
}
ff.prototype = {
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
        _y(this, this._t0, OA(this, this._t0));
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
          this._point = 3, _y(this, OA(this, n = _A(this, e, t)), n);
          break;
        default:
          _y(this, this._t0, n = _A(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
    }
  }
};
function jC(e) {
  this._context = new MC(e);
}
(jC.prototype = Object.create(ff.prototype)).point = function(e, t) {
  ff.prototype.point.call(this, t, e);
};
function MC(e) {
  this._context = e;
}
MC.prototype = {
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
function dq(e) {
  return new ff(e);
}
function hq(e) {
  return new jC(e);
}
function CC(e) {
  this._context = e;
}
CC.prototype = {
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
        for (var r = wA(e), o = wA(t), u = 0, c = 1; c < n; ++u, ++c)
          this._context.bezierCurveTo(r[0][u], o[0][u], r[1][u], o[1][u], e[c], t[c]);
    (this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function wA(e) {
  var t, n = e.length - 1, r, o = new Array(n), u = new Array(n), c = new Array(n);
  for (o[0] = 0, u[0] = 2, c[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) o[t] = 1, u[t] = 4, c[t] = 4 * e[t] + 2 * e[t + 1];
  for (o[n - 1] = 2, u[n - 1] = 7, c[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = o[t] / u[t - 1], u[t] -= r, c[t] -= r * c[t - 1];
  for (o[n - 1] = c[n - 1] / u[n - 1], t = n - 2; t >= 0; --t) o[t] = (c[t] - o[t + 1]) / u[t];
  for (u[n - 1] = (e[n] + o[n - 1]) / 2, t = 0; t < n - 1; ++t) u[t] = 2 * e[t + 1] - o[t + 1];
  return [o, u];
}
function pq(e) {
  return new CC(e);
}
function vd(e, t) {
  this._context = e, this._t = t;
}
vd.prototype = {
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
function vq(e) {
  return new vd(e, 0.5);
}
function yq(e) {
  return new vd(e, 0);
}
function mq(e) {
  return new vd(e, 1);
}
function Mo(e, t) {
  if ((c = e.length) > 1)
    for (var n = 1, r, o, u = e[t[0]], c, f = u.length; n < c; ++n)
      for (o = u, u = e[t[n]], r = 0; r < f; ++r)
        u[r][1] += u[r][0] = isNaN(o[r][1]) ? o[r][0] : o[r][1];
}
function Ob(e) {
  for (var t = e.length, n = new Array(t); --t >= 0; ) n[t] = t;
  return n;
}
function gq(e, t) {
  return e[t];
}
function bq(e) {
  const t = [];
  return t.key = e, t;
}
function xq() {
  var e = nt([]), t = Ob, n = Mo, r = gq;
  function o(u) {
    var c = Array.from(e.apply(this, arguments), bq), f, d = c.length, h = -1, y;
    for (const v of u)
      for (f = 0, ++h; f < d; ++f)
        (c[f][h] = [0, +r(v, c[f].key, h, u)]).data = v;
    for (f = 0, y = Z0(t(c)); f < d; ++f)
      c[y[f]].index = f;
    return n(c, y), c;
  }
  return o.keys = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : nt(Array.from(u)), o) : e;
  }, o.value = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : nt(+u), o) : r;
  }, o.order = function(u) {
    return arguments.length ? (t = u == null ? Ob : typeof u == "function" ? u : nt(Array.from(u)), o) : t;
  }, o.offset = function(u) {
    return arguments.length ? (n = u ?? Mo, o) : n;
  }, o;
}
function Sq(e, t) {
  if ((r = e.length) > 0) {
    for (var n, r, o = 0, u = e[0].length, c; o < u; ++o) {
      for (c = n = 0; n < r; ++n) c += e[n][o][1] || 0;
      if (c) for (n = 0; n < r; ++n) e[n][o][1] /= c;
    }
    Mo(e, t);
  }
}
function _q(e, t) {
  if ((o = e.length) > 0) {
    for (var n = 0, r = e[t[0]], o, u = r.length; n < u; ++n) {
      for (var c = 0, f = 0; c < o; ++c) f += e[c][n][1] || 0;
      r[n][1] += r[n][0] = -f / 2;
    }
    Mo(e, t);
  }
}
function Oq(e, t) {
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
    o[r - 1][1] += o[r - 1][0] = n, Mo(e, t);
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
var wq = ["type", "size", "sizeType"];
function wb() {
  return wb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, wb.apply(this, arguments);
}
function AA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function TA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? AA(Object(n), !0).forEach(function(r) {
      Aq(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : AA(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Aq(e, t, n) {
  return t = Tq(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Tq(e) {
  var t = Eq(e, "string");
  return Cu(t) == "symbol" ? t : t + "";
}
function Eq(e, t) {
  if (Cu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Cu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function jq(e, t) {
  if (e == null) return {};
  var n = Mq(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Mq(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var DC = {
  symbolCircle: Q0,
  symbolCross: Wz,
  symbolDiamond: Qz,
  symbolSquare: Jz,
  symbolStar: rq,
  symbolTriangle: aq,
  symbolWye: oq
}, Cq = Math.PI / 180, Dq = function(t) {
  var n = "symbol".concat(dd(t));
  return DC[n] || Q0;
}, Pq = function(t, n, r) {
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
      var o = 18 * Cq;
      return 1.25 * t * t * (Math.tan(o) - Math.tan(o * 2) * Math.pow(Math.tan(o), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, Nq = function(t, n) {
  DC["symbol".concat(dd(t))] = n;
}, yd = function(t) {
  var n = t.type, r = n === void 0 ? "circle" : n, o = t.size, u = o === void 0 ? 64 : o, c = t.sizeType, f = c === void 0 ? "area" : c, d = jq(t, wq), h = TA(TA({}, d), {}, {
    type: r,
    size: u,
    sizeType: f
  }), y = function() {
    var x = Dq(r), A = lq().type(x).size(Pq(u, f, r));
    return A();
  }, v = h.className, g = h.cx, b = h.cy, _ = Te(h, !0);
  return g === +g && b === +b && u === +u ? /* @__PURE__ */ U.createElement("path", wb({}, _, {
    className: $e("recharts-symbols", v),
    transform: "translate(".concat(g, ", ").concat(b, ")"),
    d: y()
  })) : null;
};
yd.registerSymbol = Nq;
function Co(e) {
  "@babel/helpers - typeof";
  return Co = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Co(e);
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
function EA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Rq(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? EA(Object(n), !0).forEach(function(r) {
      Du(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EA(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $q(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function zq(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, NC(r.key), r);
  }
}
function qq(e, t, n) {
  return t && zq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kq(e, t, n) {
  return t = df(t), Bq(e, PC() ? Reflect.construct(t, n || [], df(e).constructor) : t.apply(e, n));
}
function Bq(e, t) {
  if (t && (Co(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Lq(e);
}
function Lq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function PC() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (PC = function() {
    return !!e;
  })();
}
function df(e) {
  return df = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, df(e);
}
function Uq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Tb(e, t);
}
function Tb(e, t) {
  return Tb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Tb(e, t);
}
function Du(e, t, n) {
  return t = NC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function NC(e) {
  var t = Iq(e, "string");
  return Co(t) == "symbol" ? t : t + "";
}
function Iq(e, t) {
  if (Co(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Co(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var zn = 32, J0 = /* @__PURE__ */ (function(e) {
  function t() {
    return $q(this, t), kq(this, t, arguments);
  }
  return Uq(t, e), qq(t, [{
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
          var h = Rq({}, r);
          return delete h.legendIcon, /* @__PURE__ */ U.cloneElement(r.legendIcon, h);
        }
        return /* @__PURE__ */ U.createElement(yd, {
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
        var T = b.inactive ? h : b.color;
        return /* @__PURE__ */ U.createElement("li", Ab({
          className: x,
          style: v,
          key: "legend-item-".concat(_)
        }, Mu(r.props, b, _)), /* @__PURE__ */ U.createElement(gb, {
          width: c,
          height: c,
          viewBox: y,
          style: g
        }, r.renderIcon(b)), /* @__PURE__ */ U.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: T
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
})(ee.PureComponent);
Du(J0, "displayName", "Legend");
Du(J0, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Oy, jA;
function Hq() {
  if (jA) return Oy;
  jA = 1;
  var e = cd();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Oy = t, Oy;
}
var wy, MA;
function Gq() {
  if (MA) return wy;
  MA = 1;
  function e(t) {
    var n = this.__data__, r = n.delete(t);
    return this.size = n.size, r;
  }
  return wy = e, wy;
}
var Ay, CA;
function Yq() {
  if (CA) return Ay;
  CA = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Ay = e, Ay;
}
var Ty, DA;
function Kq() {
  if (DA) return Ty;
  DA = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Ty = e, Ty;
}
var Ey, PA;
function Xq() {
  if (PA) return Ey;
  PA = 1;
  var e = cd(), t = G0(), n = Y0(), r = 200;
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
  return Ey = o, Ey;
}
var jy, NA;
function RC() {
  if (NA) return jy;
  NA = 1;
  var e = cd(), t = Hq(), n = Gq(), r = Yq(), o = Kq(), u = Xq();
  function c(f) {
    var d = this.__data__ = new e(f);
    this.size = d.size;
  }
  return c.prototype.clear = t, c.prototype.delete = n, c.prototype.get = r, c.prototype.has = o, c.prototype.set = u, jy = c, jy;
}
var My, RA;
function Vq() {
  if (RA) return My;
  RA = 1;
  var e = "__lodash_hash_undefined__";
  function t(n) {
    return this.__data__.set(n, e), this;
  }
  return My = t, My;
}
var Cy, $A;
function Fq() {
  if ($A) return Cy;
  $A = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Cy = e, Cy;
}
var Dy, zA;
function $C() {
  if (zA) return Dy;
  zA = 1;
  var e = Y0(), t = Vq(), n = Fq();
  function r(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.__data__ = new e(); ++u < c; )
      this.add(o[u]);
  }
  return r.prototype.add = r.prototype.push = t, r.prototype.has = n, Dy = r, Dy;
}
var Py, qA;
function zC() {
  if (qA) return Py;
  qA = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length; ++r < o; )
      if (n(t[r], r, t))
        return !0;
    return !1;
  }
  return Py = e, Py;
}
var Ny, kA;
function qC() {
  if (kA) return Ny;
  kA = 1;
  function e(t, n) {
    return t.has(n);
  }
  return Ny = e, Ny;
}
var Ry, BA;
function kC() {
  if (BA) return Ry;
  BA = 1;
  var e = $C(), t = zC(), n = qC(), r = 1, o = 2;
  function u(c, f, d, h, y, v) {
    var g = d & r, b = c.length, _ = f.length;
    if (b != _ && !(g && _ > b))
      return !1;
    var S = v.get(c), x = v.get(f);
    if (S && x)
      return S == f && x == c;
    var A = -1, T = !0, M = d & o ? new e() : void 0;
    for (v.set(c, f), v.set(f, c); ++A < b; ) {
      var C = c[A], w = f[A];
      if (h)
        var E = g ? h(w, C, A, f, c, v) : h(C, w, A, c, f, v);
      if (E !== void 0) {
        if (E)
          continue;
        T = !1;
        break;
      }
      if (M) {
        if (!t(f, function(j, N) {
          if (!n(M, N) && (C === j || y(C, j, d, h, v)))
            return M.push(N);
        })) {
          T = !1;
          break;
        }
      } else if (!(C === w || y(C, w, d, h, v))) {
        T = !1;
        break;
      }
    }
    return v.delete(c), v.delete(f), T;
  }
  return Ry = u, Ry;
}
var $y, LA;
function Wq() {
  if (LA) return $y;
  LA = 1;
  var e = vr(), t = e.Uint8Array;
  return $y = t, $y;
}
var zy, UA;
function Zq() {
  if (UA) return zy;
  UA = 1;
  function e(t) {
    var n = -1, r = Array(t.size);
    return t.forEach(function(o, u) {
      r[++n] = [u, o];
    }), r;
  }
  return zy = e, zy;
}
var qy, IA;
function e1() {
  if (IA) return qy;
  IA = 1;
  function e(t) {
    var n = -1, r = Array(t.size);
    return t.forEach(function(o) {
      r[++n] = o;
    }), r;
  }
  return qy = e, qy;
}
var ky, HA;
function Qq() {
  if (HA) return ky;
  HA = 1;
  var e = hc(), t = Wq(), n = H0(), r = kC(), o = Zq(), u = e1(), c = 1, f = 2, d = "[object Boolean]", h = "[object Date]", y = "[object Error]", v = "[object Map]", g = "[object Number]", b = "[object RegExp]", _ = "[object Set]", S = "[object String]", x = "[object Symbol]", A = "[object ArrayBuffer]", T = "[object DataView]", M = e ? e.prototype : void 0, C = M ? M.valueOf : void 0;
  function w(E, j, N, R, k, L, q) {
    switch (N) {
      case T:
        if (E.byteLength != j.byteLength || E.byteOffset != j.byteOffset)
          return !1;
        E = E.buffer, j = j.buffer;
      case A:
        return !(E.byteLength != j.byteLength || !L(new t(E), new t(j)));
      case d:
      case h:
      case g:
        return n(+E, +j);
      case y:
        return E.name == j.name && E.message == j.message;
      case b:
      case S:
        return E == j + "";
      case v:
        var V = o;
      case _:
        var Y = R & c;
        if (V || (V = u), E.size != j.size && !Y)
          return !1;
        var F = q.get(E);
        if (F)
          return F == j;
        R |= f, q.set(E, j);
        var z = r(V(E), V(j), R, k, L, q);
        return q.delete(E), z;
      case x:
        if (C)
          return C.call(E) == C.call(j);
    }
    return !1;
  }
  return ky = w, ky;
}
var By, GA;
function BC() {
  if (GA) return By;
  GA = 1;
  function e(t, n) {
    for (var r = -1, o = n.length, u = t.length; ++r < o; )
      t[u + r] = n[r];
    return t;
  }
  return By = e, By;
}
var Ly, YA;
function Jq() {
  if (YA) return Ly;
  YA = 1;
  var e = BC(), t = ln();
  function n(r, o, u) {
    var c = o(r);
    return t(r) ? c : e(c, u(r));
  }
  return Ly = n, Ly;
}
var Uy, KA;
function ek() {
  if (KA) return Uy;
  KA = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length, u = 0, c = []; ++r < o; ) {
      var f = t[r];
      n(f, r, t) && (c[u++] = f);
    }
    return c;
  }
  return Uy = e, Uy;
}
var Iy, XA;
function tk() {
  if (XA) return Iy;
  XA = 1;
  function e() {
    return [];
  }
  return Iy = e, Iy;
}
var Hy, VA;
function nk() {
  if (VA) return Hy;
  VA = 1;
  var e = ek(), t = tk(), n = Object.prototype, r = n.propertyIsEnumerable, o = Object.getOwnPropertySymbols, u = o ? function(c) {
    return c == null ? [] : (c = Object(c), e(o(c), function(f) {
      return r.call(c, f);
    }));
  } : t;
  return Hy = u, Hy;
}
var Gy, FA;
function rk() {
  if (FA) return Gy;
  FA = 1;
  function e(t, n) {
    for (var r = -1, o = Array(t); ++r < t; )
      o[r] = n(r);
    return o;
  }
  return Gy = e, Gy;
}
var Yy, WA;
function ak() {
  if (WA) return Yy;
  WA = 1;
  var e = Xr(), t = Vr(), n = "[object Arguments]";
  function r(o) {
    return t(o) && e(o) == n;
  }
  return Yy = r, Yy;
}
var Ky, ZA;
function t1() {
  if (ZA) return Ky;
  ZA = 1;
  var e = ak(), t = Vr(), n = Object.prototype, r = n.hasOwnProperty, o = n.propertyIsEnumerable, u = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(c) {
    return t(c) && r.call(c, "callee") && !o.call(c, "callee");
  };
  return Ky = u, Ky;
}
var yu = { exports: {} }, Xy, QA;
function ik() {
  if (QA) return Xy;
  QA = 1;
  function e() {
    return !1;
  }
  return Xy = e, Xy;
}
yu.exports;
var JA;
function LC() {
  return JA || (JA = 1, (function(e, t) {
    var n = vr(), r = ik(), o = t && !t.nodeType && t, u = o && !0 && e && !e.nodeType && e, c = u && u.exports === o, f = c ? n.Buffer : void 0, d = f ? f.isBuffer : void 0, h = d || r;
    e.exports = h;
  })(yu, yu.exports)), yu.exports;
}
var Vy, eT;
function n1() {
  if (eT) return Vy;
  eT = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function n(r, o) {
    var u = typeof r;
    return o = o ?? e, !!o && (u == "number" || u != "symbol" && t.test(r)) && r > -1 && r % 1 == 0 && r < o;
  }
  return Vy = n, Vy;
}
var Fy, tT;
function r1() {
  if (tT) return Fy;
  tT = 1;
  var e = 9007199254740991;
  function t(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= e;
  }
  return Fy = t, Fy;
}
var Wy, nT;
function ok() {
  if (nT) return Wy;
  nT = 1;
  var e = Xr(), t = r1(), n = Vr(), r = "[object Arguments]", o = "[object Array]", u = "[object Boolean]", c = "[object Date]", f = "[object Error]", d = "[object Function]", h = "[object Map]", y = "[object Number]", v = "[object Object]", g = "[object RegExp]", b = "[object Set]", _ = "[object String]", S = "[object WeakMap]", x = "[object ArrayBuffer]", A = "[object DataView]", T = "[object Float32Array]", M = "[object Float64Array]", C = "[object Int8Array]", w = "[object Int16Array]", E = "[object Int32Array]", j = "[object Uint8Array]", N = "[object Uint8ClampedArray]", R = "[object Uint16Array]", k = "[object Uint32Array]", L = {};
  L[T] = L[M] = L[C] = L[w] = L[E] = L[j] = L[N] = L[R] = L[k] = !0, L[r] = L[o] = L[x] = L[u] = L[A] = L[c] = L[f] = L[d] = L[h] = L[y] = L[v] = L[g] = L[b] = L[_] = L[S] = !1;
  function q(V) {
    return n(V) && t(V.length) && !!L[e(V)];
  }
  return Wy = q, Wy;
}
var Zy, rT;
function UC() {
  if (rT) return Zy;
  rT = 1;
  function e(t) {
    return function(n) {
      return t(n);
    };
  }
  return Zy = e, Zy;
}
var mu = { exports: {} };
mu.exports;
var aT;
function lk() {
  return aT || (aT = 1, (function(e, t) {
    var n = oC(), r = t && !t.nodeType && t, o = r && !0 && e && !e.nodeType && e, u = o && o.exports === r, c = u && n.process, f = (function() {
      try {
        var d = o && o.require && o.require("util").types;
        return d || c && c.binding && c.binding("util");
      } catch {
      }
    })();
    e.exports = f;
  })(mu, mu.exports)), mu.exports;
}
var Qy, iT;
function IC() {
  if (iT) return Qy;
  iT = 1;
  var e = ok(), t = UC(), n = lk(), r = n && n.isTypedArray, o = r ? t(r) : e;
  return Qy = o, Qy;
}
var Jy, oT;
function uk() {
  if (oT) return Jy;
  oT = 1;
  var e = rk(), t = t1(), n = ln(), r = LC(), o = n1(), u = IC(), c = Object.prototype, f = c.hasOwnProperty;
  function d(h, y) {
    var v = n(h), g = !v && t(h), b = !v && !g && r(h), _ = !v && !g && !b && u(h), S = v || g || b || _, x = S ? e(h.length, String) : [], A = x.length;
    for (var T in h)
      (y || f.call(h, T)) && !(S && // Safari 9 has enumerable `arguments.length` in strict mode.
      (T == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      b && (T == "offset" || T == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      _ && (T == "buffer" || T == "byteLength" || T == "byteOffset") || // Skip index properties.
      o(T, A))) && x.push(T);
    return x;
  }
  return Jy = d, Jy;
}
var em, lT;
function ck() {
  if (lT) return em;
  lT = 1;
  var e = Object.prototype;
  function t(n) {
    var r = n && n.constructor, o = typeof r == "function" && r.prototype || e;
    return n === o;
  }
  return em = t, em;
}
var tm, uT;
function HC() {
  if (uT) return tm;
  uT = 1;
  function e(t, n) {
    return function(r) {
      return t(n(r));
    };
  }
  return tm = e, tm;
}
var nm, cT;
function sk() {
  if (cT) return nm;
  cT = 1;
  var e = HC(), t = e(Object.keys, Object);
  return nm = t, nm;
}
var rm, sT;
function fk() {
  if (sT) return rm;
  sT = 1;
  var e = ck(), t = sk(), n = Object.prototype, r = n.hasOwnProperty;
  function o(u) {
    if (!e(u))
      return t(u);
    var c = [];
    for (var f in Object(u))
      r.call(u, f) && f != "constructor" && c.push(f);
    return c;
  }
  return rm = o, rm;
}
var am, fT;
function pc() {
  if (fT) return am;
  fT = 1;
  var e = I0(), t = r1();
  function n(r) {
    return r != null && t(r.length) && !e(r);
  }
  return am = n, am;
}
var im, dT;
function md() {
  if (dT) return im;
  dT = 1;
  var e = uk(), t = fk(), n = pc();
  function r(o) {
    return n(o) ? e(o) : t(o);
  }
  return im = r, im;
}
var om, hT;
function dk() {
  if (hT) return om;
  hT = 1;
  var e = Jq(), t = nk(), n = md();
  function r(o) {
    return e(o, n, t);
  }
  return om = r, om;
}
var lm, pT;
function hk() {
  if (pT) return lm;
  pT = 1;
  var e = dk(), t = 1, n = Object.prototype, r = n.hasOwnProperty;
  function o(u, c, f, d, h, y) {
    var v = f & t, g = e(u), b = g.length, _ = e(c), S = _.length;
    if (b != S && !v)
      return !1;
    for (var x = b; x--; ) {
      var A = g[x];
      if (!(v ? A in c : r.call(c, A)))
        return !1;
    }
    var T = y.get(u), M = y.get(c);
    if (T && M)
      return T == c && M == u;
    var C = !0;
    y.set(u, c), y.set(c, u);
    for (var w = v; ++x < b; ) {
      A = g[x];
      var E = u[A], j = c[A];
      if (d)
        var N = v ? d(j, E, A, c, u, y) : d(E, j, A, u, c, y);
      if (!(N === void 0 ? E === j || h(E, j, f, d, y) : N)) {
        C = !1;
        break;
      }
      w || (w = A == "constructor");
    }
    if (C && !w) {
      var R = u.constructor, k = c.constructor;
      R != k && "constructor" in u && "constructor" in c && !(typeof R == "function" && R instanceof R && typeof k == "function" && k instanceof k) && (C = !1);
    }
    return y.delete(u), y.delete(c), C;
  }
  return lm = o, lm;
}
var um, vT;
function pk() {
  if (vT) return um;
  vT = 1;
  var e = _i(), t = vr(), n = e(t, "DataView");
  return um = n, um;
}
var cm, yT;
function vk() {
  if (yT) return cm;
  yT = 1;
  var e = _i(), t = vr(), n = e(t, "Promise");
  return cm = n, cm;
}
var sm, mT;
function GC() {
  if (mT) return sm;
  mT = 1;
  var e = _i(), t = vr(), n = e(t, "Set");
  return sm = n, sm;
}
var fm, gT;
function yk() {
  if (gT) return fm;
  gT = 1;
  var e = _i(), t = vr(), n = e(t, "WeakMap");
  return fm = n, fm;
}
var dm, bT;
function mk() {
  if (bT) return dm;
  bT = 1;
  var e = pk(), t = G0(), n = vk(), r = GC(), o = yk(), u = Xr(), c = lC(), f = "[object Map]", d = "[object Object]", h = "[object Promise]", y = "[object Set]", v = "[object WeakMap]", g = "[object DataView]", b = c(e), _ = c(t), S = c(n), x = c(r), A = c(o), T = u;
  return (e && T(new e(new ArrayBuffer(1))) != g || t && T(new t()) != f || n && T(n.resolve()) != h || r && T(new r()) != y || o && T(new o()) != v) && (T = function(M) {
    var C = u(M), w = C == d ? M.constructor : void 0, E = w ? c(w) : "";
    if (E)
      switch (E) {
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
  }), dm = T, dm;
}
var hm, xT;
function gk() {
  if (xT) return hm;
  xT = 1;
  var e = RC(), t = kC(), n = Qq(), r = hk(), o = mk(), u = ln(), c = LC(), f = IC(), d = 1, h = "[object Arguments]", y = "[object Array]", v = "[object Object]", g = Object.prototype, b = g.hasOwnProperty;
  function _(S, x, A, T, M, C) {
    var w = u(S), E = u(x), j = w ? y : o(S), N = E ? y : o(x);
    j = j == h ? v : j, N = N == h ? v : N;
    var R = j == v, k = N == v, L = j == N;
    if (L && c(S)) {
      if (!c(x))
        return !1;
      w = !0, R = !1;
    }
    if (L && !R)
      return C || (C = new e()), w || f(S) ? t(S, x, A, T, M, C) : n(S, x, j, A, T, M, C);
    if (!(A & d)) {
      var q = R && b.call(S, "__wrapped__"), V = k && b.call(x, "__wrapped__");
      if (q || V) {
        var Y = q ? S.value() : S, F = V ? x.value() : x;
        return C || (C = new e()), M(Y, F, A, T, C);
      }
    }
    return L ? (C || (C = new e()), r(S, x, A, T, M, C)) : !1;
  }
  return hm = _, hm;
}
var pm, ST;
function a1() {
  if (ST) return pm;
  ST = 1;
  var e = gk(), t = Vr();
  function n(r, o, u, c, f) {
    return r === o ? !0 : r == null || o == null || !t(r) && !t(o) ? r !== r && o !== o : e(r, o, u, c, n, f);
  }
  return pm = n, pm;
}
var vm, _T;
function bk() {
  if (_T) return vm;
  _T = 1;
  var e = RC(), t = a1(), n = 1, r = 2;
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
  return vm = o, vm;
}
var ym, OT;
function YC() {
  if (OT) return ym;
  OT = 1;
  var e = Da();
  function t(n) {
    return n === n && !e(n);
  }
  return ym = t, ym;
}
var mm, wT;
function xk() {
  if (wT) return mm;
  wT = 1;
  var e = YC(), t = md();
  function n(r) {
    for (var o = t(r), u = o.length; u--; ) {
      var c = o[u], f = r[c];
      o[u] = [c, f, e(f)];
    }
    return o;
  }
  return mm = n, mm;
}
var gm, AT;
function KC() {
  if (AT) return gm;
  AT = 1;
  function e(t, n) {
    return function(r) {
      return r == null ? !1 : r[t] === n && (n !== void 0 || t in Object(r));
    };
  }
  return gm = e, gm;
}
var bm, TT;
function Sk() {
  if (TT) return bm;
  TT = 1;
  var e = bk(), t = xk(), n = KC();
  function r(o) {
    var u = t(o);
    return u.length == 1 && u[0][2] ? n(u[0][0], u[0][1]) : function(c) {
      return c === o || e(c, o, u);
    };
  }
  return bm = r, bm;
}
var xm, ET;
function _k() {
  if (ET) return xm;
  ET = 1;
  function e(t, n) {
    return t != null && n in Object(t);
  }
  return xm = e, xm;
}
var Sm, jT;
function Ok() {
  if (jT) return Sm;
  jT = 1;
  var e = sC(), t = t1(), n = ln(), r = n1(), o = r1(), u = fd();
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
  return Sm = c, Sm;
}
var _m, MT;
function wk() {
  if (MT) return _m;
  MT = 1;
  var e = _k(), t = Ok();
  function n(r, o) {
    return r != null && t(r, o, e);
  }
  return _m = n, _m;
}
var Om, CT;
function Ak() {
  if (CT) return Om;
  CT = 1;
  var e = a1(), t = fC(), n = wk(), r = U0(), o = YC(), u = KC(), c = fd(), f = 1, d = 2;
  function h(y, v) {
    return r(y) && o(v) ? u(c(y), v) : function(g) {
      var b = t(g, y);
      return b === void 0 && b === v ? n(g, y) : e(v, b, f | d);
    };
  }
  return Om = h, Om;
}
var wm, DT;
function ol() {
  if (DT) return wm;
  DT = 1;
  function e(t) {
    return t;
  }
  return wm = e, wm;
}
var Am, PT;
function Tk() {
  if (PT) return Am;
  PT = 1;
  function e(t) {
    return function(n) {
      return n == null ? void 0 : n[t];
    };
  }
  return Am = e, Am;
}
var Tm, NT;
function Ek() {
  if (NT) return Tm;
  NT = 1;
  var e = X0();
  function t(n) {
    return function(r) {
      return e(r, n);
    };
  }
  return Tm = t, Tm;
}
var Em, RT;
function jk() {
  if (RT) return Em;
  RT = 1;
  var e = Tk(), t = Ek(), n = U0(), r = fd();
  function o(u) {
    return n(u) ? e(r(u)) : t(u);
  }
  return Em = o, Em;
}
var jm, $T;
function Pa() {
  if ($T) return jm;
  $T = 1;
  var e = Sk(), t = Ak(), n = ol(), r = ln(), o = jk();
  function u(c) {
    return typeof c == "function" ? c : c == null ? n : typeof c == "object" ? r(c) ? t(c[0], c[1]) : e(c) : o(c);
  }
  return jm = u, jm;
}
var Mm, zT;
function XC() {
  if (zT) return Mm;
  zT = 1;
  function e(t, n, r, o) {
    for (var u = t.length, c = r + (o ? 1 : -1); o ? c-- : ++c < u; )
      if (n(t[c], c, t))
        return c;
    return -1;
  }
  return Mm = e, Mm;
}
var Cm, qT;
function Mk() {
  if (qT) return Cm;
  qT = 1;
  function e(t) {
    return t !== t;
  }
  return Cm = e, Cm;
}
var Dm, kT;
function Ck() {
  if (kT) return Dm;
  kT = 1;
  function e(t, n, r) {
    for (var o = r - 1, u = t.length; ++o < u; )
      if (t[o] === n)
        return o;
    return -1;
  }
  return Dm = e, Dm;
}
var Pm, BT;
function Dk() {
  if (BT) return Pm;
  BT = 1;
  var e = XC(), t = Mk(), n = Ck();
  function r(o, u, c) {
    return u === u ? n(o, u, c) : e(o, t, c);
  }
  return Pm = r, Pm;
}
var Nm, LT;
function Pk() {
  if (LT) return Nm;
  LT = 1;
  var e = Dk();
  function t(n, r) {
    var o = n == null ? 0 : n.length;
    return !!o && e(n, r, 0) > -1;
  }
  return Nm = t, Nm;
}
var Rm, UT;
function Nk() {
  if (UT) return Rm;
  UT = 1;
  function e(t, n, r) {
    for (var o = -1, u = t == null ? 0 : t.length; ++o < u; )
      if (r(n, t[o]))
        return !0;
    return !1;
  }
  return Rm = e, Rm;
}
var $m, IT;
function Rk() {
  if (IT) return $m;
  IT = 1;
  function e() {
  }
  return $m = e, $m;
}
var zm, HT;
function $k() {
  if (HT) return zm;
  HT = 1;
  var e = GC(), t = Rk(), n = e1(), r = 1 / 0, o = e && 1 / n(new e([, -0]))[1] == r ? function(u) {
    return new e(u);
  } : t;
  return zm = o, zm;
}
var qm, GT;
function zk() {
  if (GT) return qm;
  GT = 1;
  var e = $C(), t = Pk(), n = Nk(), r = qC(), o = $k(), u = e1(), c = 200;
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
        var T = d[v], M = h ? h(T) : T;
        if (T = y || T !== 0 ? T : 0, _ && M === M) {
          for (var C = x.length; C--; )
            if (x[C] === M)
              continue e;
          h && x.push(M), S.push(T);
        } else g(x, M, y) || (x !== S && x.push(M), S.push(T));
      }
    return S;
  }
  return qm = f, qm;
}
var km, YT;
function qk() {
  if (YT) return km;
  YT = 1;
  var e = Pa(), t = zk();
  function n(r, o) {
    return r && r.length ? t(r, e(o, 2)) : [];
  }
  return km = n, km;
}
var kk = qk();
const KT = /* @__PURE__ */ tt(kk);
function VC(e, t, n) {
  return t === !0 ? KT(e, n) : Ee(t) ? KT(e, t) : e;
}
function Do(e) {
  "@babel/helpers - typeof";
  return Do = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Do(e);
}
var Bk = ["ref"];
function XT(e, t) {
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
    t % 2 ? XT(Object(n), !0).forEach(function(r) {
      gd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : XT(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Lk(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function VT(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, WC(r.key), r);
  }
}
function Uk(e, t, n) {
  return t && VT(e.prototype, t), n && VT(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Ik(e, t, n) {
  return t = hf(t), Hk(e, FC() ? Reflect.construct(t, n || [], hf(e).constructor) : t.apply(e, n));
}
function Hk(e, t) {
  if (t && (Do(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Gk(e);
}
function Gk(e) {
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
function hf(e) {
  return hf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, hf(e);
}
function Yk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Eb(e, t);
}
function Eb(e, t) {
  return Eb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Eb(e, t);
}
function gd(e, t, n) {
  return t = WC(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function WC(e) {
  var t = Kk(e, "string");
  return Do(t) == "symbol" ? t : t + "";
}
function Kk(e, t) {
  if (Do(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Do(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Xk(e, t) {
  if (e == null) return {};
  var n = Vk(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Vk(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Fk(e) {
  return e.value;
}
function Wk(e, t) {
  if (/* @__PURE__ */ U.isValidElement(e))
    return /* @__PURE__ */ U.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ U.createElement(e, t);
  t.ref;
  var n = Xk(t, Bk);
  return /* @__PURE__ */ U.createElement(J0, n);
}
var FT = 1, Ao = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    Lk(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = Ik(this, t, [].concat(o)), gd(n, "lastBoundingBox", {
      width: -1,
      height: -1
    }), n;
  }
  return Yk(t, e), Uk(t, [{
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
      o ? (Math.abs(o.width - this.lastBoundingBox.width) > FT || Math.abs(o.height - this.lastBoundingBox.height) > FT) && (this.lastBoundingBox.width = o.width, this.lastBoundingBox.height = o.height, r && r(o)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, r && r(null));
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
      }, Wk(u, $r($r({}, this.props), {}, {
        payload: VC(y, h, Fk)
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
})(ee.PureComponent);
gd(Ao, "displayName", "Legend");
gd(Ao, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var Bm, WT;
function Zk() {
  if (WT) return Bm;
  WT = 1;
  var e = hc(), t = t1(), n = ln(), r = e ? e.isConcatSpreadable : void 0;
  function o(u) {
    return n(u) || t(u) || !!(r && u && u[r]);
  }
  return Bm = o, Bm;
}
var Lm, ZT;
function ZC() {
  if (ZT) return Lm;
  ZT = 1;
  var e = BC(), t = Zk();
  function n(r, o, u, c, f) {
    var d = -1, h = r.length;
    for (u || (u = t), f || (f = []); ++d < h; ) {
      var y = r[d];
      o > 0 && u(y) ? o > 1 ? n(y, o - 1, u, c, f) : e(f, y) : c || (f[f.length] = y);
    }
    return f;
  }
  return Lm = n, Lm;
}
var Um, QT;
function Qk() {
  if (QT) return Um;
  QT = 1;
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
  return Um = e, Um;
}
var Im, JT;
function Jk() {
  if (JT) return Im;
  JT = 1;
  var e = Qk(), t = e();
  return Im = t, Im;
}
var Hm, eE;
function QC() {
  if (eE) return Hm;
  eE = 1;
  var e = Jk(), t = md();
  function n(r, o) {
    return r && e(r, o, t);
  }
  return Hm = n, Hm;
}
var Gm, tE;
function e8() {
  if (tE) return Gm;
  tE = 1;
  var e = pc();
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
  return Gm = t, Gm;
}
var Ym, nE;
function i1() {
  if (nE) return Ym;
  nE = 1;
  var e = QC(), t = e8(), n = t(e);
  return Ym = n, Ym;
}
var Km, rE;
function JC() {
  if (rE) return Km;
  rE = 1;
  var e = i1(), t = pc();
  function n(r, o) {
    var u = -1, c = t(r) ? Array(r.length) : [];
    return e(r, function(f, d, h) {
      c[++u] = o(f, d, h);
    }), c;
  }
  return Km = n, Km;
}
var Xm, aE;
function t8() {
  if (aE) return Xm;
  aE = 1;
  function e(t, n) {
    var r = t.length;
    for (t.sort(n); r--; )
      t[r] = t[r].value;
    return t;
  }
  return Xm = e, Xm;
}
var Vm, iE;
function n8() {
  if (iE) return Vm;
  iE = 1;
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
  return Vm = t, Vm;
}
var Fm, oE;
function r8() {
  if (oE) return Fm;
  oE = 1;
  var e = n8();
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
  return Fm = t, Fm;
}
var Wm, lE;
function a8() {
  if (lE) return Wm;
  lE = 1;
  var e = K0(), t = X0(), n = Pa(), r = JC(), o = t8(), u = UC(), c = r8(), f = ol(), d = ln();
  function h(y, v, g) {
    v.length ? v = e(v, function(S) {
      return d(S) ? function(x) {
        return t(x, S.length === 1 ? S[0] : S);
      } : S;
    }) : v = [f];
    var b = -1;
    v = e(v, u(n));
    var _ = r(y, function(S, x, A) {
      var T = e(v, function(M) {
        return M(S);
      });
      return { criteria: T, index: ++b, value: S };
    });
    return o(_, function(S, x) {
      return c(S, x, g);
    });
  }
  return Wm = h, Wm;
}
var Zm, uE;
function i8() {
  if (uE) return Zm;
  uE = 1;
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
  return Zm = e, Zm;
}
var Qm, cE;
function o8() {
  if (cE) return Qm;
  cE = 1;
  var e = i8(), t = Math.max;
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
  return Qm = n, Qm;
}
var Jm, sE;
function l8() {
  if (sE) return Jm;
  sE = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Jm = e, Jm;
}
var eg, fE;
function eD() {
  if (fE) return eg;
  fE = 1;
  var e = _i(), t = (function() {
    try {
      var n = e(Object, "defineProperty");
      return n({}, "", {}), n;
    } catch {
    }
  })();
  return eg = t, eg;
}
var tg, dE;
function u8() {
  if (dE) return tg;
  dE = 1;
  var e = l8(), t = eD(), n = ol(), r = t ? function(o, u) {
    return t(o, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(u),
      writable: !0
    });
  } : n;
  return tg = r, tg;
}
var ng, hE;
function c8() {
  if (hE) return ng;
  hE = 1;
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
  return ng = r, ng;
}
var rg, pE;
function s8() {
  if (pE) return rg;
  pE = 1;
  var e = u8(), t = c8(), n = t(e);
  return rg = n, rg;
}
var ag, vE;
function f8() {
  if (vE) return ag;
  vE = 1;
  var e = ol(), t = o8(), n = s8();
  function r(o, u) {
    return n(t(o, u, e), o + "");
  }
  return ag = r, ag;
}
var ig, yE;
function bd() {
  if (yE) return ig;
  yE = 1;
  var e = H0(), t = pc(), n = n1(), r = Da();
  function o(u, c, f) {
    if (!r(f))
      return !1;
    var d = typeof c;
    return (d == "number" ? t(f) && n(c, f.length) : d == "string" && c in f) ? e(f[c], u) : !1;
  }
  return ig = o, ig;
}
var og, mE;
function d8() {
  if (mE) return og;
  mE = 1;
  var e = ZC(), t = a8(), n = f8(), r = bd(), o = n(function(u, c) {
    if (u == null)
      return [];
    var f = c.length;
    return f > 1 && r(u, c[0], c[1]) ? c = [] : f > 2 && r(c[0], c[1], c[2]) && (c = [c[0]]), t(u, e(c, 1), []);
  });
  return og = o, og;
}
var h8 = d8();
const o1 = /* @__PURE__ */ tt(h8);
function Pu(e) {
  "@babel/helpers - typeof";
  return Pu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pu(e);
}
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
function p8(e, t) {
  return g8(e) || m8(e, t) || y8(e, t) || v8();
}
function v8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function y8(e, t) {
  if (e) {
    if (typeof e == "string") return gE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gE(e, t);
  }
}
function gE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function m8(e, t) {
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
function g8(e) {
  if (Array.isArray(e)) return e;
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
function lg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bE(Object(n), !0).forEach(function(r) {
      b8(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function b8(e, t, n) {
  return t = x8(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function x8(e) {
  var t = S8(e, "string");
  return Pu(t) == "symbol" ? t : t + "";
}
function S8(e, t) {
  if (Pu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Pu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _8(e) {
  return Array.isArray(e) && wt(e[0]) && wt(e[1]) ? e.join(" ~ ") : e;
}
var O8 = function(t) {
  var n = t.separator, r = n === void 0 ? " : " : n, o = t.contentStyle, u = o === void 0 ? {} : o, c = t.itemStyle, f = c === void 0 ? {} : c, d = t.labelStyle, h = d === void 0 ? {} : d, y = t.payload, v = t.formatter, g = t.itemSorter, b = t.wrapperClassName, _ = t.labelClassName, S = t.label, x = t.labelFormatter, A = t.accessibilityLayer, T = A === void 0 ? !1 : A, M = function() {
    if (y && y.length) {
      var q = {
        padding: 0,
        margin: 0
      }, V = (g ? o1(y, g) : y).map(function(Y, F) {
        if (Y.type === "none")
          return null;
        var z = lg({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: Y.color || "#000"
        }, f), K = Y.formatter || v || _8, ne = Y.value, G = Y.name, J = ne, P = G;
        if (K && J != null && P != null) {
          var I = K(ne, G, Y, F, y);
          if (Array.isArray(I)) {
            var re = p8(I, 2);
            J = re[0], P = re[1];
          } else
            J = I;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ U.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(F),
            style: z
          }, wt(P) ? /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, P) : null, wt(P) ? /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, r) : null, /* @__PURE__ */ U.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, J), /* @__PURE__ */ U.createElement("span", {
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
  }, C = lg({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, u), w = lg({
    margin: 0
  }, h), E = !we(S), j = E ? S : "", N = $e("recharts-default-tooltip", b), R = $e("recharts-tooltip-label", _);
  E && x && y !== void 0 && y !== null && (j = x(S, y));
  var k = T ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ U.createElement("div", jb({
    className: N,
    style: C
  }, k), /* @__PURE__ */ U.createElement("p", {
    className: R,
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
function Ls(e, t, n) {
  return t = w8(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function w8(e) {
  var t = A8(e, "string");
  return Nu(t) == "symbol" ? t : t + "";
}
function A8(e, t) {
  if (Nu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Nu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ou = "recharts-tooltip-wrapper", T8 = {
  visibility: "hidden"
};
function E8(e) {
  var t = e.coordinate, n = e.translateX, r = e.translateY;
  return $e(ou, Ls(Ls(Ls(Ls({}, "".concat(ou, "-right"), de(n) && t && de(t.x) && n >= t.x), "".concat(ou, "-left"), de(n) && t && de(t.x) && n < t.x), "".concat(ou, "-bottom"), de(r) && t && de(t.y) && r >= t.y), "".concat(ou, "-top"), de(r) && t && de(t.y) && r < t.y));
}
function xE(e) {
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
function j8(e) {
  var t = e.translateX, n = e.translateY, r = e.useTranslate3d;
  return {
    transform: r ? "translate3d(".concat(t, "px, ").concat(n, "px, 0)") : "translate(".concat(t, "px, ").concat(n, "px)")
  };
}
function M8(e) {
  var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTopLeft, o = e.position, u = e.reverseDirection, c = e.tooltipBox, f = e.useTranslate3d, d = e.viewBox, h, y, v;
  return c.height > 0 && c.width > 0 && n ? (y = xE({
    allowEscapeViewBox: t,
    coordinate: n,
    key: "x",
    offsetTopLeft: r,
    position: o,
    reverseDirection: u,
    tooltipDimension: c.width,
    viewBox: d,
    viewBoxDimension: d.width
  }), v = xE({
    allowEscapeViewBox: t,
    coordinate: n,
    key: "y",
    offsetTopLeft: r,
    position: o,
    reverseDirection: u,
    tooltipDimension: c.height,
    viewBox: d,
    viewBoxDimension: d.height
  }), h = j8({
    translateX: y,
    translateY: v,
    useTranslate3d: f
  })) : h = T8, {
    cssProperties: h,
    cssClasses: E8({
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
function SE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function _E(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? SE(Object(n), !0).forEach(function(r) {
      Cb(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : SE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function C8(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function D8(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, nD(r.key), r);
  }
}
function P8(e, t, n) {
  return t && D8(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function N8(e, t, n) {
  return t = pf(t), R8(e, tD() ? Reflect.construct(t, n || [], pf(e).constructor) : t.apply(e, n));
}
function R8(e, t) {
  if (t && (Po(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $8(e);
}
function $8(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function tD() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (tD = function() {
    return !!e;
  })();
}
function pf(e) {
  return pf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, pf(e);
}
function z8(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Mb(e, t);
}
function Mb(e, t) {
  return Mb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Mb(e, t);
}
function Cb(e, t, n) {
  return t = nD(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function nD(e) {
  var t = q8(e, "string");
  return Po(t) == "symbol" ? t : t + "";
}
function q8(e, t) {
  if (Po(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Po(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var OE = 1, k8 = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    C8(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = N8(this, t, [].concat(o)), Cb(n, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), Cb(n, "handleKeyDown", function(c) {
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
  return z8(t, e), P8(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var r = this.wrapperNode.getBoundingClientRect();
        (Math.abs(r.width - this.state.lastBoundingBox.width) > OE || Math.abs(r.height - this.state.lastBoundingBox.height) > OE) && this.setState({
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
      var r = this, o = this.props, u = o.active, c = o.allowEscapeViewBox, f = o.animationDuration, d = o.animationEasing, h = o.children, y = o.coordinate, v = o.hasPayload, g = o.isAnimationActive, b = o.offset, _ = o.position, S = o.reverseDirection, x = o.useTranslate3d, A = o.viewBox, T = o.wrapperStyle, M = M8({
        allowEscapeViewBox: c,
        coordinate: y,
        offsetTopLeft: b,
        position: _,
        reverseDirection: S,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: x,
        viewBox: A
      }), C = M.cssClasses, w = M.cssProperties, E = _E(_E({
        transition: g && u ? "transform ".concat(f, "ms ").concat(d) : void 0
      }, w), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && u && v ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, T);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ U.createElement("div", {
          tabIndex: -1,
          className: C,
          style: E,
          ref: function(N) {
            r.wrapperNode = N;
          }
        }, h)
      );
    }
  }]);
})(ee.PureComponent), B8 = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Na = {
  isSsr: B8()
};
function No(e) {
  "@babel/helpers - typeof";
  return No = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, No(e);
}
function wE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function AE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wE(Object(n), !0).forEach(function(r) {
      l1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function L8(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function U8(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, aD(r.key), r);
  }
}
function I8(e, t, n) {
  return t && U8(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function H8(e, t, n) {
  return t = vf(t), G8(e, rD() ? Reflect.construct(t, n || [], vf(e).constructor) : t.apply(e, n));
}
function G8(e, t) {
  if (t && (No(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Y8(e);
}
function Y8(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function rD() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (rD = function() {
    return !!e;
  })();
}
function vf(e) {
  return vf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, vf(e);
}
function K8(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Db(e, t);
}
function Db(e, t) {
  return Db = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Db(e, t);
}
function l1(e, t, n) {
  return t = aD(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function aD(e) {
  var t = X8(e, "string");
  return No(t) == "symbol" ? t : t + "";
}
function X8(e, t) {
  if (No(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (No(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function V8(e) {
  return e.dataKey;
}
function F8(e, t) {
  return /* @__PURE__ */ U.isValidElement(e) ? /* @__PURE__ */ U.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ U.createElement(e, t) : /* @__PURE__ */ U.createElement(O8, t);
}
var Sn = /* @__PURE__ */ (function(e) {
  function t() {
    return L8(this, t), H8(this, t, arguments);
  }
  return K8(t, e), I8(t, [{
    key: "render",
    value: function() {
      var r = this, o = this.props, u = o.active, c = o.allowEscapeViewBox, f = o.animationDuration, d = o.animationEasing, h = o.content, y = o.coordinate, v = o.filterNull, g = o.isAnimationActive, b = o.offset, _ = o.payload, S = o.payloadUniqBy, x = o.position, A = o.reverseDirection, T = o.useTranslate3d, M = o.viewBox, C = o.wrapperStyle, w = _ ?? [];
      v && w.length && (w = VC(_.filter(function(j) {
        return j.value != null && (j.hide !== !0 || r.props.includeHidden);
      }), S, V8));
      var E = w.length > 0;
      return /* @__PURE__ */ U.createElement(k8, {
        allowEscapeViewBox: c,
        animationDuration: f,
        animationEasing: d,
        isAnimationActive: g,
        active: u,
        coordinate: y,
        hasPayload: E,
        offset: b,
        position: x,
        reverseDirection: A,
        useTranslate3d: T,
        viewBox: M,
        wrapperStyle: C
      }, F8(h, AE(AE({}, this.props), {}, {
        payload: w
      })));
    }
  }]);
})(ee.PureComponent);
l1(Sn, "displayName", "Tooltip");
l1(Sn, "defaultProps", {
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
var ug, TE;
function W8() {
  if (TE) return ug;
  TE = 1;
  var e = vr(), t = function() {
    return e.Date.now();
  };
  return ug = t, ug;
}
var cg, EE;
function Z8() {
  if (EE) return cg;
  EE = 1;
  var e = /\s/;
  function t(n) {
    for (var r = n.length; r-- && e.test(n.charAt(r)); )
      ;
    return r;
  }
  return cg = t, cg;
}
var sg, jE;
function Q8() {
  if (jE) return sg;
  jE = 1;
  var e = Z8(), t = /^\s+/;
  function n(r) {
    return r && r.slice(0, e(r) + 1).replace(t, "");
  }
  return sg = n, sg;
}
var fg, ME;
function iD() {
  if (ME) return fg;
  ME = 1;
  var e = Q8(), t = Da(), n = rl(), r = NaN, o = /^[-+]0x[0-9a-f]+$/i, u = /^0b[01]+$/i, c = /^0o[0-7]+$/i, f = parseInt;
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
  return fg = d, fg;
}
var dg, CE;
function J8() {
  if (CE) return dg;
  CE = 1;
  var e = Da(), t = W8(), n = iD(), r = "Expected a function", o = Math.max, u = Math.min;
  function c(f, d, h) {
    var y, v, g, b, _, S, x = 0, A = !1, T = !1, M = !0;
    if (typeof f != "function")
      throw new TypeError(r);
    d = n(d) || 0, e(h) && (A = !!h.leading, T = "maxWait" in h, g = T ? o(n(h.maxWait) || 0, d) : g, M = "trailing" in h ? !!h.trailing : M);
    function C(V) {
      var Y = y, F = v;
      return y = v = void 0, x = V, b = f.apply(F, Y), b;
    }
    function w(V) {
      return x = V, _ = setTimeout(N, d), A ? C(V) : b;
    }
    function E(V) {
      var Y = V - S, F = V - x, z = d - Y;
      return T ? u(z, g - F) : z;
    }
    function j(V) {
      var Y = V - S, F = V - x;
      return S === void 0 || Y >= d || Y < 0 || T && F >= g;
    }
    function N() {
      var V = t();
      if (j(V))
        return R(V);
      _ = setTimeout(N, E(V));
    }
    function R(V) {
      return _ = void 0, M && y ? C(V) : (y = v = void 0, b);
    }
    function k() {
      _ !== void 0 && clearTimeout(_), x = 0, y = S = v = _ = void 0;
    }
    function L() {
      return _ === void 0 ? b : R(t());
    }
    function q() {
      var V = t(), Y = j(V);
      if (y = arguments, v = this, S = V, Y) {
        if (_ === void 0)
          return w(S);
        if (T)
          return clearTimeout(_), _ = setTimeout(N, d), C(S);
      }
      return _ === void 0 && (_ = setTimeout(N, d)), b;
    }
    return q.cancel = k, q.flush = L, q;
  }
  return dg = c, dg;
}
var hg, DE;
function eB() {
  if (DE) return hg;
  DE = 1;
  var e = J8(), t = Da(), n = "Expected a function";
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
  return hg = r, hg;
}
var tB = eB();
const oD = /* @__PURE__ */ tt(tB);
function Ru(e) {
  "@babel/helpers - typeof";
  return Ru = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ru(e);
}
function PE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Us(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? PE(Object(n), !0).forEach(function(r) {
      nB(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : PE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function nB(e, t, n) {
  return t = rB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function rB(e) {
  var t = aB(e, "string");
  return Ru(t) == "symbol" ? t : t + "";
}
function aB(e, t) {
  if (Ru(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ru(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function iB(e, t) {
  return cB(e) || uB(e, t) || lB(e, t) || oB();
}
function oB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lB(e, t) {
  if (e) {
    if (typeof e == "string") return NE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return NE(e, t);
  }
}
function NE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function uB(e, t) {
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
function cB(e) {
  if (Array.isArray(e)) return e;
}
var Is = /* @__PURE__ */ ee.forwardRef(function(e, t) {
  var n = e.aspect, r = e.initialDimension, o = r === void 0 ? {
    width: -1,
    height: -1
  } : r, u = e.width, c = u === void 0 ? "100%" : u, f = e.height, d = f === void 0 ? "100%" : f, h = e.minWidth, y = h === void 0 ? 0 : h, v = e.minHeight, g = e.maxHeight, b = e.children, _ = e.debounce, S = _ === void 0 ? 0 : _, x = e.id, A = e.className, T = e.onResize, M = e.style, C = M === void 0 ? {} : M, w = ee.useRef(null), E = ee.useRef();
  E.current = T, ee.useImperativeHandle(t, function() {
    return Object.defineProperty(w.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), w.current;
      },
      configurable: !0
    });
  });
  var j = ee.useState({
    containerWidth: o.width,
    containerHeight: o.height
  }), N = iB(j, 2), R = N[0], k = N[1], L = ee.useCallback(function(V, Y) {
    k(function(F) {
      var z = Math.round(V), K = Math.round(Y);
      return F.containerWidth === z && F.containerHeight === K ? F : {
        containerWidth: z,
        containerHeight: K
      };
    });
  }, []);
  ee.useEffect(function() {
    var V = function(G) {
      var J, P = G[0].contentRect, I = P.width, re = P.height;
      L(I, re), (J = E.current) === null || J === void 0 || J.call(E, I, re);
    };
    S > 0 && (V = oD(V, S, {
      trailing: !0,
      leading: !1
    }));
    var Y = new ResizeObserver(V), F = w.current.getBoundingClientRect(), z = F.width, K = F.height;
    return L(z, K), Y.observe(w.current), function() {
      Y.disconnect();
    };
  }, [L, S]);
  var q = ee.useMemo(function() {
    var V = R.containerWidth, Y = R.containerHeight;
    if (V < 0 || Y < 0)
      return null;
    Ur(li(c) || li(d), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, c, d), Ur(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
    var F = li(c) ? V : c, z = li(d) ? Y : d;
    n && n > 0 && (F ? z = F / n : z && (F = z * n), g && z > g && (z = g)), Ur(F > 0 || z > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, F, z, c, d, y, v, n);
    var K = !Array.isArray(b) && Lr(b.type).endsWith("Chart");
    return U.Children.map(b, function(ne) {
      return /* @__PURE__ */ U.isValidElement(ne) ? /* @__PURE__ */ ee.cloneElement(ne, Us({
        width: F,
        height: z
      }, K ? {
        style: Us({
          height: "100%",
          width: "100%",
          maxHeight: z,
          maxWidth: F
        }, ne.props.style)
      } : {})) : ne;
    });
  }, [n, b, d, g, v, y, R, c]);
  return /* @__PURE__ */ U.createElement("div", {
    id: x ? "".concat(x) : void 0,
    className: $e("recharts-responsive-container", A),
    style: Us(Us({}, C), {}, {
      width: c,
      height: d,
      minWidth: y,
      minHeight: v,
      maxHeight: g
    }),
    ref: w
  }, q);
}), xd = function(t) {
  return null;
};
xd.displayName = "Cell";
function $u(e) {
  "@babel/helpers - typeof";
  return $u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $u(e);
}
function RE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? RE(Object(n), !0).forEach(function(r) {
      sB(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : RE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sB(e, t, n) {
  return t = fB(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function fB(e) {
  var t = dB(e, "string");
  return $u(t) == "symbol" ? t : t + "";
}
function dB(e, t) {
  if ($u(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if ($u(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var po = {
  widthCache: {},
  cacheCount: 0
}, hB = 2e3, pB = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, $E = "recharts_measurement_span";
function vB(e) {
  var t = Pb({}, e);
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
  var r = vB(n), o = JSON.stringify({
    text: t,
    copyStyle: r
  });
  if (po.widthCache[o])
    return po.widthCache[o];
  try {
    var u = document.getElementById($E);
    u || (u = document.createElement("span"), u.setAttribute("id", $E), u.setAttribute("aria-hidden", "true"), document.body.appendChild(u));
    var c = Pb(Pb({}, pB), r);
    Object.assign(u.style, c), u.textContent = "".concat(t);
    var f = u.getBoundingClientRect(), d = {
      width: f.width,
      height: f.height
    };
    return po.widthCache[o] = d, ++po.cacheCount > hB && (po.cacheCount = 0, po.widthCache = {}), d;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, yB = function(t) {
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
function yf(e, t) {
  return xB(e) || bB(e, t) || gB(e, t) || mB();
}
function mB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gB(e, t) {
  if (e) {
    if (typeof e == "string") return zE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return zE(e, t);
  }
}
function zE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function bB(e, t) {
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
function xB(e) {
  if (Array.isArray(e)) return e;
}
function SB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qE(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, OB(r.key), r);
  }
}
function _B(e, t, n) {
  return t && qE(e.prototype, t), n && qE(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function OB(e) {
  var t = wB(e, "string");
  return zu(t) == "symbol" ? t : t + "";
}
function wB(e, t) {
  if (zu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (zu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var kE = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, BE = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, AB = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, TB = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, lD = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, EB = Object.keys(lD), So = "NaN";
function jB(e, t) {
  return e * lD[t];
}
var Hs = /* @__PURE__ */ (function() {
  function e(t, n) {
    SB(this, e), this.num = t, this.unit = n, this.num = t, this.unit = n, Number.isNaN(t) && (this.unit = ""), n !== "" && !AB.test(n) && (this.num = NaN, this.unit = ""), EB.includes(n) && (this.num = jB(t, n), this.unit = "px");
  }
  return _B(e, [{
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
      var r, o = (r = TB.exec(n)) !== null && r !== void 0 ? r : [], u = yf(o, 3), c = u[1], f = u[2];
      return new e(parseFloat(c), f ?? "");
    }
  }]);
})();
function uD(e) {
  if (e.includes(So))
    return So;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var n, r = (n = kE.exec(t)) !== null && n !== void 0 ? n : [], o = yf(r, 4), u = o[1], c = o[2], f = o[3], d = Hs.parse(u ?? ""), h = Hs.parse(f ?? ""), y = c === "*" ? d.multiply(h) : d.divide(h);
    if (y.isNaN())
      return So;
    t = t.replace(kE, y.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var v, g = (v = BE.exec(t)) !== null && v !== void 0 ? v : [], b = yf(g, 4), _ = b[1], S = b[2], x = b[3], A = Hs.parse(_ ?? ""), T = Hs.parse(x ?? ""), M = S === "+" ? A.add(T) : A.subtract(T);
    if (M.isNaN())
      return So;
    t = t.replace(BE, M.toString());
  }
  return t;
}
var LE = /\(([^()]*)\)/;
function MB(e) {
  for (var t = e; t.includes("("); ) {
    var n = LE.exec(t), r = yf(n, 2), o = r[1];
    t = t.replace(LE, uD(o));
  }
  return t;
}
function CB(e) {
  var t = e.replace(/\s+/g, "");
  return t = MB(t), t = uD(t), t;
}
function DB(e) {
  try {
    return CB(e);
  } catch {
    return So;
  }
}
function pg(e) {
  var t = DB(e.slice(5, -1));
  return t === So ? "" : t;
}
var PB = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], NB = ["dx", "dy", "angle", "className", "breakAll"];
function Nb() {
  return Nb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Nb.apply(this, arguments);
}
function UE(e, t) {
  if (e == null) return {};
  var n = RB(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function RB(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function IE(e, t) {
  return kB(e) || qB(e, t) || zB(e, t) || $B();
}
function $B() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zB(e, t) {
  if (e) {
    if (typeof e == "string") return HE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return HE(e, t);
  }
}
function HE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function qB(e, t) {
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
function kB(e) {
  if (Array.isArray(e)) return e;
}
var cD = /[ \f\n\r\t\v\u2028\u2029]+/, sD = function(t) {
  var n = t.children, r = t.breakAll, o = t.style;
  try {
    var u = [];
    we(n) || (r ? u = n.toString().split("") : u = n.toString().split(cD));
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
}, BB = function(t, n, r, o, u) {
  var c = t.maxLines, f = t.children, d = t.style, h = t.breakAll, y = de(c), v = f, g = function() {
    var F = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return F.reduce(function(z, K) {
      var ne = K.word, G = K.width, J = z[z.length - 1];
      if (J && (o == null || u || J.width + G + r < Number(o)))
        J.words.push(ne), J.width += G + r;
      else {
        var P = {
          words: [ne],
          width: G
        };
        z.push(P);
      }
      return z;
    }, []);
  }, b = g(n), _ = function(F) {
    return F.reduce(function(z, K) {
      return z.width > K.width ? z : K;
    });
  };
  if (!y)
    return b;
  for (var S = "…", x = function(F) {
    var z = v.slice(0, F), K = sD({
      breakAll: h,
      style: d,
      children: z + S
    }).wordsWithComputedWidth, ne = g(K), G = ne.length > c || _(ne).width > Number(o);
    return [G, ne];
  }, A = 0, T = v.length - 1, M = 0, C; A <= T && M <= v.length - 1; ) {
    var w = Math.floor((A + T) / 2), E = w - 1, j = x(E), N = IE(j, 2), R = N[0], k = N[1], L = x(w), q = IE(L, 1), V = q[0];
    if (!R && !V && (A = w + 1), R && V && (T = w - 1), !R && V) {
      C = k;
      break;
    }
    M++;
  }
  return C || b;
}, GE = function(t) {
  var n = we(t) ? [] : t.toString().split(cD);
  return [{
    words: n
  }];
}, LB = function(t) {
  var n = t.width, r = t.scaleToFit, o = t.children, u = t.style, c = t.breakAll, f = t.maxLines;
  if ((n || r) && !Na.isSsr) {
    var d, h, y = sD({
      breakAll: c,
      children: o,
      style: u
    });
    if (y) {
      var v = y.wordsWithComputedWidth, g = y.spaceWidth;
      d = v, h = g;
    } else
      return GE(o);
    return BB({
      breakAll: c,
      children: o,
      maxLines: f,
      style: u
    }, d, h, n, r);
  }
  return GE(o);
}, YE = "#808080", mf = function(t) {
  var n = t.x, r = n === void 0 ? 0 : n, o = t.y, u = o === void 0 ? 0 : o, c = t.lineHeight, f = c === void 0 ? "1em" : c, d = t.capHeight, h = d === void 0 ? "0.71em" : d, y = t.scaleToFit, v = y === void 0 ? !1 : y, g = t.textAnchor, b = g === void 0 ? "start" : g, _ = t.verticalAnchor, S = _ === void 0 ? "end" : _, x = t.fill, A = x === void 0 ? YE : x, T = UE(t, PB), M = ee.useMemo(function() {
    return LB({
      breakAll: T.breakAll,
      children: T.children,
      maxLines: T.maxLines,
      scaleToFit: v,
      style: T.style,
      width: T.width
    });
  }, [T.breakAll, T.children, T.maxLines, v, T.style, T.width]), C = T.dx, w = T.dy, E = T.angle, j = T.className, N = T.breakAll, R = UE(T, NB);
  if (!wt(r) || !wt(u))
    return null;
  var k = r + (de(C) ? C : 0), L = u + (de(w) ? w : 0), q;
  switch (S) {
    case "start":
      q = pg("calc(".concat(h, ")"));
      break;
    case "middle":
      q = pg("calc(".concat((M.length - 1) / 2, " * -").concat(f, " + (").concat(h, " / 2))"));
      break;
    default:
      q = pg("calc(".concat(M.length - 1, " * -").concat(f, ")"));
      break;
  }
  var V = [];
  if (v) {
    var Y = M[0].width, F = T.width;
    V.push("scale(".concat((de(F) ? F / Y : 1) / Y, ")"));
  }
  return E && V.push("rotate(".concat(E, ", ").concat(k, ", ").concat(L, ")")), V.length && (R.transform = V.join(" ")), /* @__PURE__ */ U.createElement("text", Nb({}, Te(R, !0), {
    x: k,
    y: L,
    className: $e("recharts-text", j),
    textAnchor: b,
    fill: A.includes("url") ? YE : A
  }), M.map(function(z, K) {
    var ne = z.words.join(N ? "" : " ");
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
function UB(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function u1(e) {
  let t, n, r;
  e.length !== 2 ? (t = Ca, n = (f, d) => Ca(e(f), d), r = (f, d) => e(f) - d) : (t = e === Ca || e === UB ? e : IB, n = e, r = e);
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
function IB() {
  return 0;
}
function fD(e) {
  return e === null ? NaN : +e;
}
function* HB(e, t) {
  for (let n of e)
    n != null && (n = +n) >= n && (yield n);
}
const GB = u1(Ca), vc = GB.right;
u1(fD).center;
class KE extends Map {
  constructor(t, n = XB) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null) for (const [r, o] of t) this.set(r, o);
  }
  get(t) {
    return super.get(XE(this, t));
  }
  has(t) {
    return super.has(XE(this, t));
  }
  set(t, n) {
    return super.set(YB(this, t), n);
  }
  delete(t) {
    return super.delete(KB(this, t));
  }
}
function XE({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : n;
}
function YB({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function KB({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) && (n = e.get(r), e.delete(r)), n;
}
function XB(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function VB(e = Ca) {
  if (e === Ca) return dD;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, n) => {
    const r = e(t, n);
    return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
  };
}
function dD(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const FB = Math.sqrt(50), WB = Math.sqrt(10), ZB = Math.sqrt(2);
function gf(e, t, n) {
  const r = (t - e) / Math.max(0, n), o = Math.floor(Math.log10(r)), u = r / Math.pow(10, o), c = u >= FB ? 10 : u >= WB ? 5 : u >= ZB ? 2 : 1;
  let f, d, h;
  return o < 0 ? (h = Math.pow(10, -o) / c, f = Math.round(e * h), d = Math.round(t * h), f / h < e && ++f, d / h > t && --d, h = -h) : (h = Math.pow(10, o) * c, f = Math.round(e / h), d = Math.round(t / h), f * h < e && ++f, d * h > t && --d), d < f && 0.5 <= n && n < 2 ? gf(e, t, n * 2) : [f, d, h];
}
function Rb(e, t, n) {
  if (t = +t, e = +e, n = +n, !(n > 0)) return [];
  if (e === t) return [e];
  const r = t < e, [o, u, c] = r ? gf(t, e, n) : gf(e, t, n);
  if (!(u >= o)) return [];
  const f = u - o + 1, d = new Array(f);
  if (r)
    if (c < 0) for (let h = 0; h < f; ++h) d[h] = (u - h) / -c;
    else for (let h = 0; h < f; ++h) d[h] = (u - h) * c;
  else if (c < 0) for (let h = 0; h < f; ++h) d[h] = (o + h) / -c;
  else for (let h = 0; h < f; ++h) d[h] = (o + h) * c;
  return d;
}
function $b(e, t, n) {
  return t = +t, e = +e, n = +n, gf(e, t, n)[2];
}
function zb(e, t, n) {
  t = +t, e = +e, n = +n;
  const r = t < e, o = r ? $b(t, e, n) : $b(e, t, n);
  return (r ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
function VE(e, t) {
  let n;
  for (const r of e)
    r != null && (n < r || n === void 0 && r >= r) && (n = r);
  return n;
}
function FE(e, t) {
  let n;
  for (const r of e)
    r != null && (n > r || n === void 0 && r >= r) && (n = r);
  return n;
}
function hD(e, t, n = 0, r = 1 / 0, o) {
  if (t = Math.floor(t), n = Math.floor(Math.max(0, n)), r = Math.floor(Math.min(e.length - 1, r)), !(n <= t && t <= r)) return e;
  for (o = o === void 0 ? dD : VB(o); r > n; ) {
    if (r - n > 600) {
      const d = r - n + 1, h = t - n + 1, y = Math.log(d), v = 0.5 * Math.exp(2 * y / 3), g = 0.5 * Math.sqrt(y * v * (d - v) / d) * (h - d / 2 < 0 ? -1 : 1), b = Math.max(n, Math.floor(t - h * v / d + g)), _ = Math.min(r, Math.floor(t + (d - h) * v / d + g));
      hD(e, t, b, _, o);
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
function QB(e, t, n) {
  if (e = Float64Array.from(HB(e)), !(!(r = e.length) || isNaN(t = +t))) {
    if (t <= 0 || r < 2) return FE(e);
    if (t >= 1) return VE(e);
    var r, o = (r - 1) * t, u = Math.floor(o), c = VE(hD(e, u).subarray(0, u + 1)), f = FE(e.subarray(u + 1));
    return c + (f - c) * (o - u);
  }
}
function JB(e, t, n = fD) {
  if (!(!(r = e.length) || isNaN(t = +t))) {
    if (t <= 0 || r < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[r - 1], r - 1, e);
    var r, o = (r - 1) * t, u = Math.floor(o), c = +n(e[u], u, e), f = +n(e[u + 1], u + 1, e);
    return c + (f - c) * (o - u);
  }
}
function e6(e, t, n) {
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
const qb = Symbol("implicit");
function c1() {
  var e = new KE(), t = [], n = [], r = qb;
  function o(u) {
    let c = e.get(u);
    if (c === void 0) {
      if (r !== qb) return r;
      e.set(u, c = t.push(u) - 1);
    }
    return n[c % n.length];
  }
  return o.domain = function(u) {
    if (!arguments.length) return t.slice();
    t = [], e = new KE();
    for (const c of u)
      e.has(c) || e.set(c, t.push(c) - 1);
    return o;
  }, o.range = function(u) {
    return arguments.length ? (n = Array.from(u), o) : n.slice();
  }, o.unknown = function(u) {
    return arguments.length ? (r = u, o) : r;
  }, o.copy = function() {
    return c1(t, n).unknown(r);
  }, Un.apply(o, arguments), o;
}
function qu() {
  var e = c1().unknown(void 0), t = e.domain, n = e.range, r = 0, o = 1, u, c, f = !1, d = 0, h = 0, y = 0.5;
  delete e.unknown;
  function v() {
    var g = t().length, b = o < r, _ = b ? o : r, S = b ? r : o;
    u = (S - _) / Math.max(1, g - d + h * 2), f && (u = Math.floor(u)), _ += (S - _ - u * (g - d)) * y, c = u * (1 - d), f && (_ = Math.round(_), c = Math.round(c));
    var x = e6(g).map(function(A) {
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
function pD(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return pD(t());
  }, e;
}
function Su() {
  return pD(qu.apply(null, arguments).paddingInner(1));
}
function s1(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function vD(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function yc() {
}
var ku = 0.7, bf = 1 / ku, To = "\\s*([+-]?\\d+)\\s*", Bu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", fr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", t6 = /^#([0-9a-f]{3,8})$/, n6 = new RegExp(`^rgb\\(${To},${To},${To}\\)$`), r6 = new RegExp(`^rgb\\(${fr},${fr},${fr}\\)$`), a6 = new RegExp(`^rgba\\(${To},${To},${To},${Bu}\\)$`), i6 = new RegExp(`^rgba\\(${fr},${fr},${fr},${Bu}\\)$`), o6 = new RegExp(`^hsl\\(${Bu},${fr},${fr}\\)$`), l6 = new RegExp(`^hsla\\(${Bu},${fr},${fr},${Bu}\\)$`), WE = {
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
s1(yc, Lu, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ZE,
  // Deprecated! Use color.formatHex.
  formatHex: ZE,
  formatHex8: u6,
  formatHsl: c6,
  formatRgb: QE,
  toString: QE
});
function ZE() {
  return this.rgb().formatHex();
}
function u6() {
  return this.rgb().formatHex8();
}
function c6() {
  return yD(this).formatHsl();
}
function QE() {
  return this.rgb().formatRgb();
}
function Lu(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = t6.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? JE(t) : n === 3 ? new an(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Gs(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Gs(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = n6.exec(e)) ? new an(t[1], t[2], t[3], 1) : (t = r6.exec(e)) ? new an(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = a6.exec(e)) ? Gs(t[1], t[2], t[3], t[4]) : (t = i6.exec(e)) ? Gs(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = o6.exec(e)) ? n2(t[1], t[2] / 100, t[3] / 100, 1) : (t = l6.exec(e)) ? n2(t[1], t[2] / 100, t[3] / 100, t[4]) : WE.hasOwnProperty(e) ? JE(WE[e]) : e === "transparent" ? new an(NaN, NaN, NaN, 0) : null;
}
function JE(e) {
  return new an(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Gs(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new an(e, t, n, r);
}
function s6(e) {
  return e instanceof yc || (e = Lu(e)), e ? (e = e.rgb(), new an(e.r, e.g, e.b, e.opacity)) : new an();
}
function kb(e, t, n, r) {
  return arguments.length === 1 ? s6(e) : new an(e, t, n, r ?? 1);
}
function an(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
s1(an, kb, vD(yc, {
  brighter(e) {
    return e = e == null ? bf : Math.pow(bf, e), new an(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ku : Math.pow(ku, e), new an(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new an(di(this.r), di(this.g), di(this.b), xf(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: e2,
  // Deprecated! Use color.formatHex.
  formatHex: e2,
  formatHex8: f6,
  formatRgb: t2,
  toString: t2
}));
function e2() {
  return `#${ui(this.r)}${ui(this.g)}${ui(this.b)}`;
}
function f6() {
  return `#${ui(this.r)}${ui(this.g)}${ui(this.b)}${ui((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function t2() {
  const e = xf(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${di(this.r)}, ${di(this.g)}, ${di(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function xf(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function di(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ui(e) {
  return e = di(e), (e < 16 ? "0" : "") + e.toString(16);
}
function n2(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Fn(e, t, n, r);
}
function yD(e) {
  if (e instanceof Fn) return new Fn(e.h, e.s, e.l, e.opacity);
  if (e instanceof yc || (e = Lu(e)), !e) return new Fn();
  if (e instanceof Fn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, o = Math.min(t, n, r), u = Math.max(t, n, r), c = NaN, f = u - o, d = (u + o) / 2;
  return f ? (t === u ? c = (n - r) / f + (n < r) * 6 : n === u ? c = (r - t) / f + 2 : c = (t - n) / f + 4, f /= d < 0.5 ? u + o : 2 - u - o, c *= 60) : f = d > 0 && d < 1 ? 0 : c, new Fn(c, f, d, e.opacity);
}
function d6(e, t, n, r) {
  return arguments.length === 1 ? yD(e) : new Fn(e, t, n, r ?? 1);
}
function Fn(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
s1(Fn, d6, vD(yc, {
  brighter(e) {
    return e = e == null ? bf : Math.pow(bf, e), new Fn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ku : Math.pow(ku, e), new Fn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - r;
    return new an(
      vg(e >= 240 ? e - 240 : e + 120, o, r),
      vg(e, o, r),
      vg(e < 120 ? e + 240 : e - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new Fn(r2(this.h), Ys(this.s), Ys(this.l), xf(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = xf(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${r2(this.h)}, ${Ys(this.s) * 100}%, ${Ys(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function r2(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ys(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function vg(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const f1 = (e) => () => e;
function h6(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function p6(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function v6(e) {
  return (e = +e) == 1 ? mD : function(t, n) {
    return n - t ? p6(t, n, e) : f1(isNaN(t) ? n : t);
  };
}
function mD(e, t) {
  var n = t - e;
  return n ? h6(e, n) : f1(isNaN(e) ? t : e);
}
const a2 = (function e(t) {
  var n = v6(t);
  function r(o, u) {
    var c = n((o = kb(o)).r, (u = kb(u)).r), f = n(o.g, u.g), d = n(o.b, u.b), h = mD(o.opacity, u.opacity);
    return function(y) {
      return o.r = c(y), o.g = f(y), o.b = d(y), o.opacity = h(y), o + "";
    };
  }
  return r.gamma = e, r;
})(1);
function y6(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), o;
  return function(u) {
    for (o = 0; o < n; ++o) r[o] = e[o] * (1 - u) + t[o] * u;
    return r;
  };
}
function m6(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function g6(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, o = new Array(r), u = new Array(n), c;
  for (c = 0; c < r; ++c) o[c] = ll(e[c], t[c]);
  for (; c < n; ++c) u[c] = t[c];
  return function(f) {
    for (c = 0; c < r; ++c) u[c] = o[c](f);
    return u;
  };
}
function b6(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function Sf(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function x6(e, t) {
  var n = {}, r = {}, o;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (o in t)
    o in e ? n[o] = ll(e[o], t[o]) : r[o] = t[o];
  return function(u) {
    for (o in n) r[o] = n[o](u);
    return r;
  };
}
var Bb = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, yg = new RegExp(Bb.source, "g");
function S6(e) {
  return function() {
    return e;
  };
}
function _6(e) {
  return function(t) {
    return e(t) + "";
  };
}
function O6(e, t) {
  var n = Bb.lastIndex = yg.lastIndex = 0, r, o, u, c = -1, f = [], d = [];
  for (e = e + "", t = t + ""; (r = Bb.exec(e)) && (o = yg.exec(t)); )
    (u = o.index) > n && (u = t.slice(n, u), f[c] ? f[c] += u : f[++c] = u), (r = r[0]) === (o = o[0]) ? f[c] ? f[c] += o : f[++c] = o : (f[++c] = null, d.push({ i: c, x: Sf(r, o) })), n = yg.lastIndex;
  return n < t.length && (u = t.slice(n), f[c] ? f[c] += u : f[++c] = u), f.length < 2 ? d[0] ? _6(d[0].x) : S6(t) : (t = d.length, function(h) {
    for (var y = 0, v; y < t; ++y) f[(v = d[y]).i] = v.x(h);
    return f.join("");
  });
}
function ll(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? f1(t) : (n === "number" ? Sf : n === "string" ? (r = Lu(t)) ? (t = r, a2) : O6 : t instanceof Lu ? a2 : t instanceof Date ? b6 : m6(t) ? y6 : Array.isArray(t) ? g6 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? x6 : Sf)(e, t);
}
function d1(e, t) {
  return e = +e, t = +t, function(n) {
    return Math.round(e * (1 - n) + t * n);
  };
}
function w6(e, t) {
  t === void 0 && (t = e, e = ll);
  for (var n = 0, r = t.length - 1, o = t[0], u = new Array(r < 0 ? 0 : r); n < r; ) u[n] = e(o, o = t[++n]);
  return function(c) {
    var f = Math.max(0, Math.min(r - 1, Math.floor(c *= r)));
    return u[f](c - f);
  };
}
function A6(e) {
  return function() {
    return e;
  };
}
function _f(e) {
  return +e;
}
var i2 = [0, 1];
function Ft(e) {
  return e;
}
function Lb(e, t) {
  return (t -= e = +e) ? function(n) {
    return (n - e) / t;
  } : A6(isNaN(t) ? NaN : 0.5);
}
function T6(e, t) {
  var n;
  return e > t && (n = e, e = t, t = n), function(r) {
    return Math.max(e, Math.min(t, r));
  };
}
function E6(e, t, n) {
  var r = e[0], o = e[1], u = t[0], c = t[1];
  return o < r ? (r = Lb(o, r), u = n(c, u)) : (r = Lb(r, o), u = n(u, c)), function(f) {
    return u(r(f));
  };
}
function j6(e, t, n) {
  var r = Math.min(e.length, t.length) - 1, o = new Array(r), u = new Array(r), c = -1;
  for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++c < r; )
    o[c] = Lb(e[c], e[c + 1]), u[c] = n(t[c], t[c + 1]);
  return function(f) {
    var d = vc(e, f, 1, r) - 1;
    return u[d](o[d](f));
  };
}
function mc(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Sd() {
  var e = i2, t = i2, n = ll, r, o, u, c = Ft, f, d, h;
  function y() {
    var g = Math.min(e.length, t.length);
    return c !== Ft && (c = T6(e[0], e[g - 1])), f = g > 2 ? j6 : E6, d = h = null, v;
  }
  function v(g) {
    return g == null || isNaN(g = +g) ? u : (d || (d = f(e.map(r), t, n)))(r(c(g)));
  }
  return v.invert = function(g) {
    return c(o((h || (h = f(t, e.map(r), Sf)))(g)));
  }, v.domain = function(g) {
    return arguments.length ? (e = Array.from(g, _f), y()) : e.slice();
  }, v.range = function(g) {
    return arguments.length ? (t = Array.from(g), y()) : t.slice();
  }, v.rangeRound = function(g) {
    return t = Array.from(g), n = d1, y();
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
function h1() {
  return Sd()(Ft, Ft);
}
function M6(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Of(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +e.slice(n + 1)
  ];
}
function Ro(e) {
  return e = Of(Math.abs(e)), e ? e[1] : NaN;
}
function C6(e, t) {
  return function(n, r) {
    for (var o = n.length, u = [], c = 0, f = e[0], d = 0; o > 0 && f > 0 && (d + f + 1 > r && (f = Math.max(1, r - d)), u.push(n.substring(o -= f, o + f)), !((d += f + 1) > r)); )
      f = e[c = (c + 1) % e.length];
    return u.reverse().join(t);
  };
}
function D6(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(n) {
      return e[+n];
    });
  };
}
var P6 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Uu(e) {
  if (!(t = P6.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new p1({
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
Uu.prototype = p1.prototype;
function p1(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
p1.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function N6(e) {
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
var wf;
function R6(e, t) {
  var n = Of(e, t);
  if (!n) return wf = void 0, e.toPrecision(t);
  var r = n[0], o = n[1], u = o - (wf = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, c = r.length;
  return u === c ? r : u > c ? r + new Array(u - c + 1).join("0") : u > 0 ? r.slice(0, u) + "." + r.slice(u) : "0." + new Array(1 - u).join("0") + Of(e, Math.max(0, t + u - 1))[0];
}
function o2(e, t) {
  var n = Of(e, t);
  if (!n) return e + "";
  var r = n[0], o = n[1];
  return o < 0 ? "0." + new Array(-o).join("0") + r : r.length > o + 1 ? r.slice(0, o + 1) + "." + r.slice(o + 1) : r + new Array(o - r.length + 2).join("0");
}
const l2 = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: M6,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => o2(e * 100, t),
  r: o2,
  s: R6,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function u2(e) {
  return e;
}
var c2 = Array.prototype.map, s2 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function $6(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? u2 : C6(c2.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", o = e.decimal === void 0 ? "." : e.decimal + "", u = e.numerals === void 0 ? u2 : D6(c2.call(e.numerals, String)), c = e.percent === void 0 ? "%" : e.percent + "", f = e.minus === void 0 ? "−" : e.minus + "", d = e.nan === void 0 ? "NaN" : e.nan + "";
  function h(v, g) {
    v = Uu(v);
    var b = v.fill, _ = v.align, S = v.sign, x = v.symbol, A = v.zero, T = v.width, M = v.comma, C = v.precision, w = v.trim, E = v.type;
    E === "n" ? (M = !0, E = "g") : l2[E] || (C === void 0 && (C = 12), w = !0, E = "g"), (A || b === "0" && _ === "=") && (A = !0, b = "0", _ = "=");
    var j = (g && g.prefix !== void 0 ? g.prefix : "") + (x === "$" ? n : x === "#" && /[boxX]/.test(E) ? "0" + E.toLowerCase() : ""), N = (x === "$" ? r : /[%p]/.test(E) ? c : "") + (g && g.suffix !== void 0 ? g.suffix : ""), R = l2[E], k = /[defgprs%]/.test(E);
    C = C === void 0 ? 6 : /[gprs]/.test(E) ? Math.max(1, Math.min(21, C)) : Math.max(0, Math.min(20, C));
    function L(q) {
      var V = j, Y = N, F, z, K;
      if (E === "c")
        Y = R(q) + Y, q = "";
      else {
        q = +q;
        var ne = q < 0 || 1 / q < 0;
        if (q = isNaN(q) ? d : R(Math.abs(q), C), w && (q = N6(q)), ne && +q == 0 && S !== "+" && (ne = !1), V = (ne ? S === "(" ? S : f : S === "-" || S === "(" ? "" : S) + V, Y = (E === "s" && !isNaN(q) && wf !== void 0 ? s2[8 + wf / 3] : "") + Y + (ne && S === "(" ? ")" : ""), k) {
          for (F = -1, z = q.length; ++F < z; )
            if (K = q.charCodeAt(F), 48 > K || K > 57) {
              Y = (K === 46 ? o + q.slice(F + 1) : q.slice(F)) + Y, q = q.slice(0, F);
              break;
            }
        }
      }
      M && !A && (q = t(q, 1 / 0));
      var G = V.length + q.length + Y.length, J = G < T ? new Array(T - G + 1).join(b) : "";
      switch (M && A && (q = t(J + q, J.length ? T - Y.length : 1 / 0), J = ""), _) {
        case "<":
          q = V + q + Y + J;
          break;
        case "=":
          q = V + J + q + Y;
          break;
        case "^":
          q = J.slice(0, G = J.length >> 1) + V + q + Y + J.slice(G);
          break;
        default:
          q = J + V + q + Y;
          break;
      }
      return u(q);
    }
    return L.toString = function() {
      return v + "";
    }, L;
  }
  function y(v, g) {
    var b = Math.max(-8, Math.min(8, Math.floor(Ro(g) / 3))) * 3, _ = Math.pow(10, -b), S = h((v = Uu(v), v.type = "f", v), { suffix: s2[8 + b / 3] });
    return function(x) {
      return S(_ * x);
    };
  }
  return {
    format: h,
    formatPrefix: y
  };
}
var Ks, v1, gD;
z6({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function z6(e) {
  return Ks = $6(e), v1 = Ks.format, gD = Ks.formatPrefix, Ks;
}
function q6(e) {
  return Math.max(0, -Ro(Math.abs(e)));
}
function k6(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ro(t) / 3))) * 3 - Ro(Math.abs(e)));
}
function B6(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Ro(t) - Ro(e)) + 1;
}
function bD(e, t, n, r) {
  var o = zb(e, t, n), u;
  switch (r = Uu(r ?? ",f"), r.type) {
    case "s": {
      var c = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN(u = k6(o, c)) && (r.precision = u), gD(r, c);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(u = B6(o, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = u - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(u = q6(o)) && (r.precision = u - (r.type === "%") * 2);
      break;
    }
  }
  return v1(r);
}
function Ra(e) {
  var t = e.domain;
  return e.ticks = function(n) {
    var r = t();
    return Rb(r[0], r[r.length - 1], n ?? 10);
  }, e.tickFormat = function(n, r) {
    var o = t();
    return bD(o[0], o[o.length - 1], n ?? 10, r);
  }, e.nice = function(n) {
    n == null && (n = 10);
    var r = t(), o = 0, u = r.length - 1, c = r[o], f = r[u], d, h, y = 10;
    for (f < c && (h = c, c = f, f = h, h = o, o = u, u = h); y-- > 0; ) {
      if (h = $b(c, f, n), h === d)
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
function Af() {
  var e = h1();
  return e.copy = function() {
    return mc(e, Af());
  }, Un.apply(e, arguments), Ra(e);
}
function xD(e) {
  var t;
  function n(r) {
    return r == null || isNaN(r = +r) ? t : r;
  }
  return n.invert = n, n.domain = n.range = function(r) {
    return arguments.length ? (e = Array.from(r, _f), n) : e.slice();
  }, n.unknown = function(r) {
    return arguments.length ? (t = r, n) : t;
  }, n.copy = function() {
    return xD(e).unknown(t);
  }, e = arguments.length ? Array.from(e, _f) : [0, 1], Ra(n);
}
function SD(e, t) {
  e = e.slice();
  var n = 0, r = e.length - 1, o = e[n], u = e[r], c;
  return u < o && (c = n, n = r, r = c, c = o, o = u, u = c), e[n] = t.floor(o), e[r] = t.ceil(u), e;
}
function f2(e) {
  return Math.log(e);
}
function d2(e) {
  return Math.exp(e);
}
function L6(e) {
  return -Math.log(-e);
}
function U6(e) {
  return -Math.exp(-e);
}
function I6(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function H6(e) {
  return e === 10 ? I6 : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function G6(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function h2(e) {
  return (t, n) => -e(-t, n);
}
function y1(e) {
  const t = e(f2, d2), n = t.domain;
  let r = 10, o, u;
  function c() {
    return o = G6(r), u = H6(r), n()[0] < 0 ? (o = h2(o), u = h2(u), e(L6, U6)) : e(f2, d2), t;
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
      A.length * 2 < x && (A = Rb(h, y, x));
    } else
      A = Rb(g, b, Math.min(b - g, x)).map(u);
    return v ? A.reverse() : A;
  }, t.tickFormat = (f, d) => {
    if (f == null && (f = 10), d == null && (d = r === 10 ? "s" : ","), typeof d != "function" && (!(r % 1) && (d = Uu(d)).precision == null && (d.trim = !0), d = v1(d)), f === 1 / 0) return d;
    const h = Math.max(1, r * f / t.ticks().length);
    return (y) => {
      let v = y / u(Math.round(o(y)));
      return v * r < r - 0.5 && (v *= r), v <= h ? d(y) : "";
    };
  }, t.nice = () => n(SD(n(), {
    floor: (f) => u(Math.floor(o(f))),
    ceil: (f) => u(Math.ceil(o(f)))
  })), t;
}
function _D() {
  const e = y1(Sd()).domain([1, 10]);
  return e.copy = () => mc(e, _D()).base(e.base()), Un.apply(e, arguments), e;
}
function p2(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function v2(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function m1(e) {
  var t = 1, n = e(p2(t), v2(t));
  return n.constant = function(r) {
    return arguments.length ? e(p2(t = +r), v2(t)) : t;
  }, Ra(n);
}
function OD() {
  var e = m1(Sd());
  return e.copy = function() {
    return mc(e, OD()).constant(e.constant());
  }, Un.apply(e, arguments);
}
function y2(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function Y6(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function K6(e) {
  return e < 0 ? -e * e : e * e;
}
function g1(e) {
  var t = e(Ft, Ft), n = 1;
  function r() {
    return n === 1 ? e(Ft, Ft) : n === 0.5 ? e(Y6, K6) : e(y2(n), y2(1 / n));
  }
  return t.exponent = function(o) {
    return arguments.length ? (n = +o, r()) : n;
  }, Ra(t);
}
function b1() {
  var e = g1(Sd());
  return e.copy = function() {
    return mc(e, b1()).exponent(e.exponent());
  }, Un.apply(e, arguments), e;
}
function X6() {
  return b1.apply(null, arguments).exponent(0.5);
}
function m2(e) {
  return Math.sign(e) * e * e;
}
function V6(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function wD() {
  var e = h1(), t = [0, 1], n = !1, r;
  function o(u) {
    var c = V6(e(u));
    return isNaN(c) ? r : n ? Math.round(c) : c;
  }
  return o.invert = function(u) {
    return e.invert(m2(u));
  }, o.domain = function(u) {
    return arguments.length ? (e.domain(u), o) : e.domain();
  }, o.range = function(u) {
    return arguments.length ? (e.range((t = Array.from(u, _f)).map(m2)), o) : t.slice();
  }, o.rangeRound = function(u) {
    return o.range(u).round(!0);
  }, o.round = function(u) {
    return arguments.length ? (n = !!u, o) : n;
  }, o.clamp = function(u) {
    return arguments.length ? (e.clamp(u), o) : e.clamp();
  }, o.unknown = function(u) {
    return arguments.length ? (r = u, o) : r;
  }, o.copy = function() {
    return wD(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
  }, Un.apply(o, arguments), Ra(o);
}
function AD() {
  var e = [], t = [], n = [], r;
  function o() {
    var c = 0, f = Math.max(1, t.length);
    for (n = new Array(f - 1); ++c < f; ) n[c - 1] = JB(e, c / f);
    return u;
  }
  function u(c) {
    return c == null || isNaN(c = +c) ? r : t[vc(n, c)];
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
    return AD().domain(e).range(t).unknown(r);
  }, Un.apply(u, arguments);
}
function TD() {
  var e = 0, t = 1, n = 1, r = [0.5], o = [0, 1], u;
  function c(d) {
    return d != null && d <= d ? o[vc(r, d, 0, n)] : u;
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
    return TD().domain([e, t]).range(o).unknown(u);
  }, Un.apply(Ra(c), arguments);
}
function ED() {
  var e = [0.5], t = [0, 1], n, r = 1;
  function o(u) {
    return u != null && u <= u ? t[vc(e, u, 0, r)] : n;
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
    return ED().domain(e).range(t).unknown(n);
  }, Un.apply(o, arguments);
}
const mg = /* @__PURE__ */ new Date(), gg = /* @__PURE__ */ new Date();
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
  }), n && (o.count = (u, c) => (mg.setTime(+u), gg.setTime(+c), e(mg), e(gg), Math.floor(n(mg, gg))), o.every = (u) => (u = Math.floor(u), !isFinite(u) || !(u > 0) ? null : u > 1 ? o.filter(r ? (c) => r(c) % u === 0 : (c) => o.count(0, c) % u === 0) : o)), o;
}
const Tf = Tt(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Tf.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Tt((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
  t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : Tf);
Tf.range;
const zr = 1e3, kn = zr * 60, qr = kn * 60, Hr = qr * 24, x1 = Hr * 7, g2 = Hr * 30, bg = Hr * 365, ci = Tt((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * zr);
}, (e, t) => (t - e) / zr, (e) => e.getUTCSeconds());
ci.range;
const S1 = Tt((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * zr);
}, (e, t) => {
  e.setTime(+e + t * kn);
}, (e, t) => (t - e) / kn, (e) => e.getMinutes());
S1.range;
const _1 = Tt((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * kn);
}, (e, t) => (t - e) / kn, (e) => e.getUTCMinutes());
_1.range;
const O1 = Tt((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * zr - e.getMinutes() * kn);
}, (e, t) => {
  e.setTime(+e + t * qr);
}, (e, t) => (t - e) / qr, (e) => e.getHours());
O1.range;
const w1 = Tt((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * qr);
}, (e, t) => (t - e) / qr, (e) => e.getUTCHours());
w1.range;
const gc = Tt(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * kn) / Hr,
  (e) => e.getDate() - 1
);
gc.range;
const _d = Tt((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Hr, (e) => e.getUTCDate() - 1);
_d.range;
const jD = Tt((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Hr, (e) => Math.floor(e / Hr));
jD.range;
function wi(e) {
  return Tt((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, n) => {
    t.setDate(t.getDate() + n * 7);
  }, (t, n) => (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * kn) / x1);
}
const Od = wi(0), Ef = wi(1), F6 = wi(2), W6 = wi(3), $o = wi(4), Z6 = wi(5), Q6 = wi(6);
Od.range;
Ef.range;
F6.range;
W6.range;
$o.range;
Z6.range;
Q6.range;
function Ai(e) {
  return Tt((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, n) => {
    t.setUTCDate(t.getUTCDate() + n * 7);
  }, (t, n) => (n - t) / x1);
}
const wd = Ai(0), jf = Ai(1), J6 = Ai(2), e4 = Ai(3), zo = Ai(4), t4 = Ai(5), n4 = Ai(6);
wd.range;
jf.range;
J6.range;
e4.range;
zo.range;
t4.range;
n4.range;
const A1 = Tt((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
A1.range;
const T1 = Tt((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
T1.range;
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
function MD(e, t, n, r, o, u) {
  const c = [
    [ci, 1, zr],
    [ci, 5, 5 * zr],
    [ci, 15, 15 * zr],
    [ci, 30, 30 * zr],
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
    [n, 1, x1],
    [t, 1, g2],
    [t, 3, 3 * g2],
    [e, 1, bg]
  ];
  function f(h, y, v) {
    const g = y < h;
    g && ([h, y] = [y, h]);
    const b = v && typeof v.range == "function" ? v : d(h, y, v), _ = b ? b.range(h, +y + 1) : [];
    return g ? _.reverse() : _;
  }
  function d(h, y, v) {
    const g = Math.abs(y - h) / v, b = u1(([, , x]) => x).right(c, g);
    if (b === c.length) return e.every(zb(h / bg, y / bg, v));
    if (b === 0) return Tf.every(Math.max(zb(h, y, v), 1));
    const [_, S] = c[g / c[b - 1][2] < c[b][2] / g ? b - 1 : b];
    return _.every(S);
  }
  return [f, d];
}
const [r4, a4] = MD(Yr, T1, wd, jD, w1, _1), [i4, o4] = MD(Gr, A1, Od, gc, O1, S1);
function xg(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Sg(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function uu(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function l4(e) {
  var t = e.dateTime, n = e.date, r = e.time, o = e.periods, u = e.days, c = e.shortDays, f = e.months, d = e.shortMonths, h = cu(o), y = su(o), v = cu(u), g = su(u), b = cu(c), _ = su(c), S = cu(f), x = su(f), A = cu(d), T = su(d), M = {
    a: K,
    A: ne,
    b: G,
    B: J,
    c: null,
    d: w2,
    e: w2,
    f: C4,
    g: L4,
    G: I4,
    H: E4,
    I: j4,
    j: M4,
    L: CD,
    m: D4,
    M: P4,
    p: P,
    q: I,
    Q: E2,
    s: j2,
    S: N4,
    u: R4,
    U: $4,
    V: z4,
    w: q4,
    W: k4,
    x: null,
    X: null,
    y: B4,
    Y: U4,
    Z: H4,
    "%": T2
  }, C = {
    a: re,
    A: se,
    b: pe,
    B: fe,
    c: null,
    d: A2,
    e: A2,
    f: X4,
    g: r5,
    G: i5,
    H: G4,
    I: Y4,
    j: K4,
    L: PD,
    m: V4,
    M: F4,
    p: _e,
    q: Ce,
    Q: E2,
    s: j2,
    S: W4,
    u: Z4,
    U: Q4,
    V: J4,
    w: e5,
    W: t5,
    x: null,
    X: null,
    y: n5,
    Y: a5,
    Z: o5,
    "%": T2
  }, w = {
    a: k,
    A: L,
    b: q,
    B: V,
    c: Y,
    d: _2,
    e: _2,
    f: O4,
    g: S2,
    G: x2,
    H: O2,
    I: O2,
    j: b4,
    L: _4,
    m: g4,
    M: x4,
    p: R,
    q: m4,
    Q: A4,
    s: T4,
    S: S4,
    u: d4,
    U: h4,
    V: p4,
    w: f4,
    W: v4,
    x: F,
    X: z,
    y: S2,
    Y: x2,
    Z: y4,
    "%": w4
  };
  M.x = E(n, M), M.X = E(r, M), M.c = E(t, M), C.x = E(n, C), C.X = E(r, C), C.c = E(t, C);
  function E(ce, ge) {
    return function(he) {
      var ue = [], qe = -1, xe = 0, Qe = ce.length, Ye, Et, un;
      for (he instanceof Date || (he = /* @__PURE__ */ new Date(+he)); ++qe < Qe; )
        ce.charCodeAt(qe) === 37 && (ue.push(ce.slice(xe, qe)), (Et = b2[Ye = ce.charAt(++qe)]) != null ? Ye = ce.charAt(++qe) : Et = Ye === "e" ? " " : "0", (un = ge[Ye]) && (Ye = un(he, Et)), ue.push(Ye), xe = qe + 1);
      return ue.push(ce.slice(xe, qe)), ue.join("");
    };
  }
  function j(ce, ge) {
    return function(he) {
      var ue = uu(1900, void 0, 1), qe = N(ue, ce, he += "", 0), xe, Qe;
      if (qe != he.length) return null;
      if ("Q" in ue) return new Date(ue.Q);
      if ("s" in ue) return new Date(ue.s * 1e3 + ("L" in ue ? ue.L : 0));
      if (ge && !("Z" in ue) && (ue.Z = 0), "p" in ue && (ue.H = ue.H % 12 + ue.p * 12), ue.m === void 0 && (ue.m = "q" in ue ? ue.q : 0), "V" in ue) {
        if (ue.V < 1 || ue.V > 53) return null;
        "w" in ue || (ue.w = 1), "Z" in ue ? (xe = Sg(uu(ue.y, 0, 1)), Qe = xe.getUTCDay(), xe = Qe > 4 || Qe === 0 ? jf.ceil(xe) : jf(xe), xe = _d.offset(xe, (ue.V - 1) * 7), ue.y = xe.getUTCFullYear(), ue.m = xe.getUTCMonth(), ue.d = xe.getUTCDate() + (ue.w + 6) % 7) : (xe = xg(uu(ue.y, 0, 1)), Qe = xe.getDay(), xe = Qe > 4 || Qe === 0 ? Ef.ceil(xe) : Ef(xe), xe = gc.offset(xe, (ue.V - 1) * 7), ue.y = xe.getFullYear(), ue.m = xe.getMonth(), ue.d = xe.getDate() + (ue.w + 6) % 7);
      } else ("W" in ue || "U" in ue) && ("w" in ue || (ue.w = "u" in ue ? ue.u % 7 : "W" in ue ? 1 : 0), Qe = "Z" in ue ? Sg(uu(ue.y, 0, 1)).getUTCDay() : xg(uu(ue.y, 0, 1)).getDay(), ue.m = 0, ue.d = "W" in ue ? (ue.w + 6) % 7 + ue.W * 7 - (Qe + 5) % 7 : ue.w + ue.U * 7 - (Qe + 6) % 7);
      return "Z" in ue ? (ue.H += ue.Z / 100 | 0, ue.M += ue.Z % 100, Sg(ue)) : xg(ue);
    };
  }
  function N(ce, ge, he, ue) {
    for (var qe = 0, xe = ge.length, Qe = he.length, Ye, Et; qe < xe; ) {
      if (ue >= Qe) return -1;
      if (Ye = ge.charCodeAt(qe++), Ye === 37) {
        if (Ye = ge.charAt(qe++), Et = w[Ye in b2 ? ge.charAt(qe++) : Ye], !Et || (ue = Et(ce, he, ue)) < 0) return -1;
      } else if (Ye != he.charCodeAt(ue++))
        return -1;
    }
    return ue;
  }
  function R(ce, ge, he) {
    var ue = h.exec(ge.slice(he));
    return ue ? (ce.p = y.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function k(ce, ge, he) {
    var ue = b.exec(ge.slice(he));
    return ue ? (ce.w = _.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function L(ce, ge, he) {
    var ue = v.exec(ge.slice(he));
    return ue ? (ce.w = g.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
  }
  function q(ce, ge, he) {
    var ue = A.exec(ge.slice(he));
    return ue ? (ce.m = T.get(ue[0].toLowerCase()), he + ue[0].length) : -1;
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
  function z(ce, ge, he) {
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
  function J(ce) {
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
      var ge = E(ce += "", M);
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
      var ge = E(ce += "", C);
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
var b2 = { "-": "", _: " ", 0: "0" }, Dt = /^\s*\d+/, u4 = /^%/, c4 = /[\\^$*+?|[\]().{}]/g;
function Le(e, t, n) {
  var r = e < 0 ? "-" : "", o = (r ? -e : e) + "", u = o.length;
  return r + (u < n ? new Array(n - u + 1).join(t) + o : o);
}
function s4(e) {
  return e.replace(c4, "\\$&");
}
function cu(e) {
  return new RegExp("^(?:" + e.map(s4).join("|") + ")", "i");
}
function su(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function f4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 1));
  return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function d4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 1));
  return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function h4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function p4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function v4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function x2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 4));
  return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function S2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function y4(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function m4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 1));
  return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function g4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function _2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function b4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 3));
  return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function O2(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function x4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function S4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 2));
  return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function _4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 3));
  return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function O4(e, t, n) {
  var r = Dt.exec(t.slice(n, n + 6));
  return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function w4(e, t, n) {
  var r = u4.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function A4(e, t, n) {
  var r = Dt.exec(t.slice(n));
  return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function T4(e, t, n) {
  var r = Dt.exec(t.slice(n));
  return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function w2(e, t) {
  return Le(e.getDate(), t, 2);
}
function E4(e, t) {
  return Le(e.getHours(), t, 2);
}
function j4(e, t) {
  return Le(e.getHours() % 12 || 12, t, 2);
}
function M4(e, t) {
  return Le(1 + gc.count(Gr(e), e), t, 3);
}
function CD(e, t) {
  return Le(e.getMilliseconds(), t, 3);
}
function C4(e, t) {
  return CD(e, t) + "000";
}
function D4(e, t) {
  return Le(e.getMonth() + 1, t, 2);
}
function P4(e, t) {
  return Le(e.getMinutes(), t, 2);
}
function N4(e, t) {
  return Le(e.getSeconds(), t, 2);
}
function R4(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function $4(e, t) {
  return Le(Od.count(Gr(e) - 1, e), t, 2);
}
function DD(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? $o(e) : $o.ceil(e);
}
function z4(e, t) {
  return e = DD(e), Le($o.count(Gr(e), e) + (Gr(e).getDay() === 4), t, 2);
}
function q4(e) {
  return e.getDay();
}
function k4(e, t) {
  return Le(Ef.count(Gr(e) - 1, e), t, 2);
}
function B4(e, t) {
  return Le(e.getFullYear() % 100, t, 2);
}
function L4(e, t) {
  return e = DD(e), Le(e.getFullYear() % 100, t, 2);
}
function U4(e, t) {
  return Le(e.getFullYear() % 1e4, t, 4);
}
function I4(e, t) {
  var n = e.getDay();
  return e = n >= 4 || n === 0 ? $o(e) : $o.ceil(e), Le(e.getFullYear() % 1e4, t, 4);
}
function H4(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + Le(t / 60 | 0, "0", 2) + Le(t % 60, "0", 2);
}
function A2(e, t) {
  return Le(e.getUTCDate(), t, 2);
}
function G4(e, t) {
  return Le(e.getUTCHours(), t, 2);
}
function Y4(e, t) {
  return Le(e.getUTCHours() % 12 || 12, t, 2);
}
function K4(e, t) {
  return Le(1 + _d.count(Yr(e), e), t, 3);
}
function PD(e, t) {
  return Le(e.getUTCMilliseconds(), t, 3);
}
function X4(e, t) {
  return PD(e, t) + "000";
}
function V4(e, t) {
  return Le(e.getUTCMonth() + 1, t, 2);
}
function F4(e, t) {
  return Le(e.getUTCMinutes(), t, 2);
}
function W4(e, t) {
  return Le(e.getUTCSeconds(), t, 2);
}
function Z4(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function Q4(e, t) {
  return Le(wd.count(Yr(e) - 1, e), t, 2);
}
function ND(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? zo(e) : zo.ceil(e);
}
function J4(e, t) {
  return e = ND(e), Le(zo.count(Yr(e), e) + (Yr(e).getUTCDay() === 4), t, 2);
}
function e5(e) {
  return e.getUTCDay();
}
function t5(e, t) {
  return Le(jf.count(Yr(e) - 1, e), t, 2);
}
function n5(e, t) {
  return Le(e.getUTCFullYear() % 100, t, 2);
}
function r5(e, t) {
  return e = ND(e), Le(e.getUTCFullYear() % 100, t, 2);
}
function a5(e, t) {
  return Le(e.getUTCFullYear() % 1e4, t, 4);
}
function i5(e, t) {
  var n = e.getUTCDay();
  return e = n >= 4 || n === 0 ? zo(e) : zo.ceil(e), Le(e.getUTCFullYear() % 1e4, t, 4);
}
function o5() {
  return "+0000";
}
function T2() {
  return "%";
}
function E2(e) {
  return +e;
}
function j2(e) {
  return Math.floor(+e / 1e3);
}
var vo, RD, $D;
l5({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function l5(e) {
  return vo = l4(e), RD = vo.format, vo.parse, $D = vo.utcFormat, vo.utcParse, vo;
}
function u5(e) {
  return new Date(e);
}
function c5(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function E1(e, t, n, r, o, u, c, f, d, h) {
  var y = h1(), v = y.invert, g = y.domain, b = h(".%L"), _ = h(":%S"), S = h("%I:%M"), x = h("%I %p"), A = h("%a %d"), T = h("%b %d"), M = h("%B"), C = h("%Y");
  function w(E) {
    return (d(E) < E ? b : f(E) < E ? _ : c(E) < E ? S : u(E) < E ? x : r(E) < E ? o(E) < E ? A : T : n(E) < E ? M : C)(E);
  }
  return y.invert = function(E) {
    return new Date(v(E));
  }, y.domain = function(E) {
    return arguments.length ? g(Array.from(E, c5)) : g().map(u5);
  }, y.ticks = function(E) {
    var j = g();
    return e(j[0], j[j.length - 1], E ?? 10);
  }, y.tickFormat = function(E, j) {
    return j == null ? w : h(j);
  }, y.nice = function(E) {
    var j = g();
    return (!E || typeof E.range != "function") && (E = t(j[0], j[j.length - 1], E ?? 10)), E ? g(SD(j, E)) : y;
  }, y.copy = function() {
    return mc(y, E1(e, t, n, r, o, u, c, f, d, h));
  }, y;
}
function s5() {
  return Un.apply(E1(i4, o4, Gr, A1, Od, gc, O1, S1, ci, RD).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function f5() {
  return Un.apply(E1(r4, a4, Yr, T1, wd, _d, w1, _1, ci, $D).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Ad() {
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
  return h.range = y(ll), h.rangeRound = y(d1), h.unknown = function(v) {
    return arguments.length ? (d = v, h) : d;
  }, function(v) {
    return u = v, n = v(e), r = v(t), o = n === r ? 0 : 1 / (r - n), h;
  };
}
function $a(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function zD() {
  var e = Ra(Ad()(Ft));
  return e.copy = function() {
    return $a(e, zD());
  }, Fr.apply(e, arguments);
}
function qD() {
  var e = y1(Ad()).domain([1, 10]);
  return e.copy = function() {
    return $a(e, qD()).base(e.base());
  }, Fr.apply(e, arguments);
}
function kD() {
  var e = m1(Ad());
  return e.copy = function() {
    return $a(e, kD()).constant(e.constant());
  }, Fr.apply(e, arguments);
}
function j1() {
  var e = g1(Ad());
  return e.copy = function() {
    return $a(e, j1()).exponent(e.exponent());
  }, Fr.apply(e, arguments);
}
function d5() {
  return j1.apply(null, arguments).exponent(0.5);
}
function BD() {
  var e = [], t = Ft;
  function n(r) {
    if (r != null && !isNaN(r = +r)) return t((vc(e, r, 1) - 1) / (e.length - 1));
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
    return Array.from({ length: r + 1 }, (o, u) => QB(e, u / r));
  }, n.copy = function() {
    return BD(t).domain(e);
  }, Fr.apply(n, arguments);
}
function Td() {
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
      var A, T, M;
      return arguments.length ? ([A, T, M] = x, h = w6(S, [A, T, M]), b) : [h(0), h(0.5), h(1)];
    };
  }
  return b.range = _(ll), b.rangeRound = _(d1), b.unknown = function(S) {
    return arguments.length ? (g = S, b) : g;
  }, function(S) {
    return y = S, o = S(e), u = S(t), c = S(n), f = o === u ? 0 : 0.5 / (u - o), d = u === c ? 0 : 0.5 / (c - u), r = u < o ? -1 : 1, b;
  };
}
function LD() {
  var e = Ra(Td()(Ft));
  return e.copy = function() {
    return $a(e, LD());
  }, Fr.apply(e, arguments);
}
function UD() {
  var e = y1(Td()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return $a(e, UD()).base(e.base());
  }, Fr.apply(e, arguments);
}
function ID() {
  var e = m1(Td());
  return e.copy = function() {
    return $a(e, ID()).constant(e.constant());
  }, Fr.apply(e, arguments);
}
function M1() {
  var e = g1(Td());
  return e.copy = function() {
    return $a(e, M1()).exponent(e.exponent());
  }, Fr.apply(e, arguments);
}
function h5() {
  return M1.apply(null, arguments).exponent(0.5);
}
const M2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: qu,
  scaleDiverging: LD,
  scaleDivergingLog: UD,
  scaleDivergingPow: M1,
  scaleDivergingSqrt: h5,
  scaleDivergingSymlog: ID,
  scaleIdentity: xD,
  scaleImplicit: qb,
  scaleLinear: Af,
  scaleLog: _D,
  scaleOrdinal: c1,
  scalePoint: Su,
  scalePow: b1,
  scaleQuantile: AD,
  scaleQuantize: TD,
  scaleRadial: wD,
  scaleSequential: zD,
  scaleSequentialLog: qD,
  scaleSequentialPow: j1,
  scaleSequentialQuantile: BD,
  scaleSequentialSqrt: d5,
  scaleSequentialSymlog: kD,
  scaleSqrt: X6,
  scaleSymlog: OD,
  scaleThreshold: ED,
  scaleTime: s5,
  scaleUtc: f5,
  tickFormat: bD
}, Symbol.toStringTag, { value: "Module" }));
var _g, C2;
function HD() {
  if (C2) return _g;
  C2 = 1;
  var e = rl();
  function t(n, r, o) {
    for (var u = -1, c = n.length; ++u < c; ) {
      var f = n[u], d = r(f);
      if (d != null && (h === void 0 ? d === d && !e(d) : o(d, h)))
        var h = d, y = f;
    }
    return y;
  }
  return _g = t, _g;
}
var Og, D2;
function p5() {
  if (D2) return Og;
  D2 = 1;
  function e(t, n) {
    return t > n;
  }
  return Og = e, Og;
}
var wg, P2;
function v5() {
  if (P2) return wg;
  P2 = 1;
  var e = HD(), t = p5(), n = ol();
  function r(o) {
    return o && o.length ? e(o, n, t) : void 0;
  }
  return wg = r, wg;
}
var y5 = v5();
const Ea = /* @__PURE__ */ tt(y5);
var Ag, N2;
function m5() {
  if (N2) return Ag;
  N2 = 1;
  function e(t, n) {
    return t < n;
  }
  return Ag = e, Ag;
}
var Tg, R2;
function g5() {
  if (R2) return Tg;
  R2 = 1;
  var e = HD(), t = m5(), n = ol();
  function r(o) {
    return o && o.length ? e(o, n, t) : void 0;
  }
  return Tg = r, Tg;
}
var b5 = g5();
const Ed = /* @__PURE__ */ tt(b5);
var Eg, $2;
function x5() {
  if ($2) return Eg;
  $2 = 1;
  var e = K0(), t = Pa(), n = JC(), r = ln();
  function o(u, c) {
    var f = r(u) ? e : n;
    return f(u, t(c, 3));
  }
  return Eg = o, Eg;
}
var jg, z2;
function S5() {
  if (z2) return jg;
  z2 = 1;
  var e = ZC(), t = x5();
  function n(r, o) {
    return e(t(r, o), 1);
  }
  return jg = n, jg;
}
var _5 = S5();
const O5 = /* @__PURE__ */ tt(_5);
var Mg, q2;
function w5() {
  if (q2) return Mg;
  q2 = 1;
  var e = a1();
  function t(n, r) {
    return e(n, r);
  }
  return Mg = t, Mg;
}
var A5 = w5();
const gi = /* @__PURE__ */ tt(A5);
var ul = 1e9, T5 = {
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
}, D1, ut = !0, Ln = "[DecimalError] ", hi = Ln + "Invalid argument: ", C1 = Ln + "Exponent out of range: ", cl = Math.floor, oi = Math.pow, E5 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, _n, Ct = 1e7, ot = 7, GD = 9007199254740991, Mf = cl(GD / ot), ve = {};
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
  return e = new t.constructor(e), t.s == e.s ? XD(t, e) : YD(t, (e.s = -e.s, e));
};
ve.modulo = ve.mod = function(e) {
  var t, n = this, r = n.constructor, o = r.precision;
  if (e = new r(e), !e.s) throw Error(Ln + "NaN");
  return n.s ? (ut = !1, t = Ir(n, e, 0, 1).times(e), ut = !0, n.minus(t)) : et(new r(n), o);
};
ve.naturalExponential = ve.exp = function() {
  return KD(this);
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
  return e = new t.constructor(e), t.s == e.s ? YD(t, e) : XD(t, (e.s = -e.s, e));
};
ve.precision = ve.sd = function(e) {
  var t, n, r, o = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(hi + e);
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
  for (e = xt(f), ut = !1, o = Math.sqrt(+f), o == 0 || o == 1 / 0 ? (t = lr(f.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = cl((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = c = n + 3; ; )
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
  return n = new r(n), e === void 0 ? n : (pr(e, 0, ul), t === void 0 ? t = r.rounding : pr(t, 0, 8), et(n, e + xt(n) + 1, t));
};
ve.toExponential = function(e, t) {
  var n, r = this, o = r.constructor;
  return e === void 0 ? n = bi(r, !0) : (pr(e, 0, ul), t === void 0 ? t = o.rounding : pr(t, 0, 8), r = et(new o(r), e + 1, t), n = bi(r, !0, e + 1)), n;
};
ve.toFixed = function(e, t) {
  var n, r, o = this, u = o.constructor;
  return e === void 0 ? bi(o) : (pr(e, 0, ul), t === void 0 ? t = u.rounding : pr(t, 0, 8), r = et(new u(o), e + xt(o) + 1, t), n = bi(r.abs(), !1, e + xt(r) + 1), o.isneg() && !o.isZero() ? "-" + n : n);
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
    if ((n = y < 0 ? -y : y) <= GD) {
      for (o = new d(_n), t = Math.ceil(r / ot + 4), ut = !1; n % 2 && (o = o.times(f), B2(o.d, t)), n = cl(n / 2), n !== 0; )
        f = f.times(f), B2(f.d, t);
      return ut = !0, e.s < 0 ? new d(_n).div(o) : et(o, r);
    }
  } else if (u < 0) throw Error(Ln + "NaN");
  return u = u < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, f.s = 1, ut = !1, o = e.times(Iu(f, r + h)), ut = !0, o = KD(o), o.s = u, o;
};
ve.toPrecision = function(e, t) {
  var n, r, o = this, u = o.constructor;
  return e === void 0 ? (n = xt(o), r = bi(o, n <= u.toExpNeg || n >= u.toExpPos)) : (pr(e, 1, ul), t === void 0 ? t = u.rounding : pr(t, 0, 8), o = et(new u(o), e, t), n = xt(o), r = bi(o, e <= n || n <= u.toExpNeg, e)), r;
};
ve.toSignificantDigits = ve.tosd = function(e, t) {
  var n = this, r = n.constructor;
  return e === void 0 ? (e = r.precision, t = r.rounding) : (pr(e, 1, ul), t === void 0 ? t = r.rounding : pr(t, 0, 8)), et(new r(n), e, t);
};
ve.toString = ve.valueOf = ve.val = ve.toJSON = ve[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = xt(e), n = e.constructor;
  return bi(e, t <= n.toExpNeg || t >= n.toExpPos);
};
function YD(e, t) {
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
    throw Error(hi + e);
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
    var f, d, h, y, v, g, b, _, S, x, A, T, M, C, w, E, j, N, R = r.constructor, k = r.s == o.s ? 1 : -1, L = r.d, q = o.d;
    if (!r.s) return new R(r);
    if (!o.s) throw Error(Ln + "Division by zero");
    for (d = r.e - o.e, j = q.length, w = L.length, b = new R(k), _ = b.d = [], h = 0; q[h] == (L[h] || 0); ) ++h;
    if (q[h] > (L[h] || 0) && --d, u == null ? T = u = R.precision : c ? T = u + (xt(r) - xt(o)) + 1 : T = u, T < 0) return new R(0);
    if (T = T / ot + 2 | 0, h = 0, j == 1)
      for (y = 0, q = q[0], T++; (h < w || y) && T--; h++)
        M = y * Ct + (L[h] || 0), _[h] = M / q | 0, y = M % q | 0;
    else {
      for (y = Ct / (q[0] + 1) | 0, y > 1 && (q = e(q, y), L = e(L, y), j = q.length, w = L.length), C = j, S = L.slice(0, j), x = S.length; x < j; ) S[x++] = 0;
      N = q.slice(), N.unshift(0), E = q[0], q[1] >= Ct / 2 && ++E;
      do
        y = 0, f = t(q, S, j, x), f < 0 ? (A = S[0], j != x && (A = A * Ct + (S[1] || 0)), y = A / E | 0, y > 1 ? (y >= Ct && (y = Ct - 1), v = e(q, y), g = v.length, x = S.length, f = t(v, S, g, x), f == 1 && (y--, n(v, j < g ? N : q, g))) : (y == 0 && (f = y = 1), v = q.slice()), g = v.length, g < x && v.unshift(0), n(S, v, x), f == -1 && (x = S.length, f = t(q, S, j, x), f < 1 && (y++, n(S, j < x ? N : q, x))), x = S.length) : f === 0 && (y++, S = [0]), _[h++] = y, f && S[0] ? S[x++] = L[C] || 0 : (S = [L[C]], x = 1);
      while ((C++ < w || S[0] !== void 0) && T--);
    }
    return _[0] || _.shift(), b.e = d, et(b, c ? u + xt(b) + 1 : u);
  };
})();
function KD(e, t) {
  var n, r, o, u, c, f, d = 0, h = 0, y = e.constructor, v = y.precision;
  if (xt(e) > 16) throw Error(C1 + xt(e));
  if (!e.s) return new y(_n);
  for (ut = !1, f = v, c = new y(0.03125); e.abs().gte(0.1); )
    e = e.times(c), h += 5;
  for (r = Math.log(oi(2, h)) / Math.LN10 * 2 + 5 | 0, f += r, n = o = u = new y(_n), y.precision = f; ; ) {
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
function Cg(e, t, n) {
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
    return t == null && (ut = !0), Cg(S, h);
  if (h += g, S.precision = h, n = lr(_), r = n.charAt(0), u = xt(b), Math.abs(u) < 15e14) {
    for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3; )
      b = b.times(e), n = lr(b.d), r = n.charAt(0), v++;
    u = xt(b), r > 1 ? (b = new S("0." + n), u++) : b = new S(r + "." + n.slice(1));
  } else
    return d = Cg(S, h + 2, x).times(u + ""), b = Iu(new S(r + "." + n.slice(1)), h - g).plus(d), S.precision = x, t == null ? (ut = !0, et(b, x)) : b;
  for (f = c = b = Ir(b.minus(_n), b.plus(_n), h), y = et(b.times(b), h), o = 3; ; ) {
    if (c = et(c.times(y), h), d = f.plus(Ir(c, new S(o), h)), lr(d.d).slice(0, h) === lr(f.d).slice(0, h))
      return f = f.times(2), u !== 0 && (f = f.plus(Cg(S, h + 2, x).times(u + ""))), f = Ir(f, new S(v), h), S.precision = x, t == null ? (ut = !0, et(f, x)) : f;
    f = d, o += 2;
  }
}
function k2(e, t) {
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
    if (e.d.push(+t), ut && (e.e > Mf || e.e < -Mf)) throw Error(C1 + n);
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
  if (n !== void 0 && (u = oi(10, c - o - 1), f = h / u % 10 | 0, d = t < 0 || v[y + 1] !== void 0 || h % u, d = n < 4 ? (f || d) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : f > 5 || f == 5 && (n == 4 || d || n == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (r > 0 ? o > 0 ? h / oi(10, c - o) : 0 : v[y - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0])
    return d ? (u = xt(e), v.length = 1, t = t - u - 1, v[0] = oi(10, (ot - t % ot) % ot), e.e = cl(-t / ot) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
  if (r == 0 ? (v.length = y, u = 1, y--) : (v.length = y + 1, u = oi(10, ot - r), v[y] = o > 0 ? (h / oi(10, c - o) % oi(10, o) | 0) * u : 0), d)
    for (; ; )
      if (y == 0) {
        (v[0] += u) == Ct && (v[0] = 1, ++e.e);
        break;
      } else {
        if (v[y] += u, v[y] != Ct) break;
        v[y--] = 0, u = 1;
      }
  for (r = v.length; v[--r] === 0; ) v.pop();
  if (ut && (e.e > Mf || e.e < -Mf))
    throw Error(C1 + xt(e));
  return e;
}
function XD(e, t) {
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
function bi(e, t, n) {
  var r, o = xt(e), u = lr(e.d), c = u.length;
  return t ? (n && (r = n - c) > 0 ? u = u.charAt(0) + "." + u.slice(1) + Aa(r) : c > 1 && (u = u.charAt(0) + "." + u.slice(1)), u = u + (o < 0 ? "e" : "e+") + o) : o < 0 ? (u = "0." + Aa(-o - 1) + u, n && (r = n - c) > 0 && (u += Aa(r))) : o >= c ? (u += Aa(o + 1 - c), n && (r = n - o - 1) > 0 && (u = u + "." + Aa(r))) : ((r = o + 1) < c && (u = u.slice(0, r) + "." + u.slice(r)), n && (r = n - c) > 0 && (o + 1 === c && (u += "."), u += Aa(r))), e.s < 0 ? "-" + u : u;
}
function B2(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function VD(e) {
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
        throw Error(hi + u);
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
      return k2(c, u.toString());
    } else if (typeof u != "string")
      throw Error(hi + u);
    if (u.charCodeAt(0) === 45 ? (u = u.slice(1), c.s = -1) : c.s = 1, E5.test(u)) k2(c, u);
    else throw Error(hi + u);
  }
  if (o.prototype = ve, o.ROUND_UP = 0, o.ROUND_DOWN = 1, o.ROUND_CEIL = 2, o.ROUND_FLOOR = 3, o.ROUND_HALF_UP = 4, o.ROUND_HALF_DOWN = 5, o.ROUND_HALF_EVEN = 6, o.ROUND_HALF_CEIL = 7, o.ROUND_HALF_FLOOR = 8, o.clone = VD, o.config = o.set = j5, e === void 0 && (e = {}), e)
    for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < r.length; ) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
  return o.config(e), o;
}
function j5(e) {
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
      else throw Error(hi + n + ": " + r);
  if ((r = e[n = "LN10"]) !== void 0)
    if (r == Math.LN10) this[n] = new this(r);
    else throw Error(hi + n + ": " + r);
  return this;
}
var D1 = VD(T5);
_n = new D1(1);
const Ze = D1;
function M5(e) {
  return N5(e) || P5(e) || D5(e) || C5();
}
function C5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function D5(e, t) {
  if (e) {
    if (typeof e == "string") return Ub(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ub(e, t);
  }
}
function P5(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function N5(e) {
  if (Array.isArray(e)) return Ub(e);
}
function Ub(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
var R5 = function(t) {
  return t;
}, FD = {}, WD = function(t) {
  return t === FD;
}, L2 = function(t) {
  return function n() {
    return arguments.length === 0 || arguments.length === 1 && WD(arguments.length <= 0 ? void 0 : arguments[0]) ? n : t.apply(void 0, arguments);
  };
}, $5 = function e(t, n) {
  return t === 1 ? n : L2(function() {
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    var c = o.filter(function(f) {
      return f !== FD;
    }).length;
    return c >= t ? n.apply(void 0, o) : e(t - c, L2(function() {
      for (var f = arguments.length, d = new Array(f), h = 0; h < f; h++)
        d[h] = arguments[h];
      var y = o.map(function(v) {
        return WD(v) ? d.shift() : v;
      });
      return n.apply(void 0, M5(y).concat(d));
    }));
  });
}, jd = function(t) {
  return $5(t.length, t);
}, Ib = function(t, n) {
  for (var r = [], o = t; o < n; ++o)
    r[o - t] = o;
  return r;
}, z5 = jd(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(n) {
    return t[n];
  }).map(e);
}), q5 = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  if (!n.length)
    return R5;
  var o = n.reverse(), u = o[0], c = o.slice(1);
  return function() {
    return c.reduce(function(f, d) {
      return d(f);
    }, u.apply(void 0, arguments));
  };
}, Hb = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, ZD = function(t) {
  var n = null, r = null;
  return function() {
    for (var o = arguments.length, u = new Array(o), c = 0; c < o; c++)
      u[c] = arguments[c];
    return n && u.every(function(f, d) {
      return f === n[d];
    }) || (n = u, r = t.apply(void 0, u)), r;
  };
};
function k5(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Ze(e).abs().log(10).toNumber()) + 1, t;
}
function B5(e, t, n) {
  for (var r = new Ze(e), o = 0, u = []; r.lt(t) && o < 1e5; )
    u.push(r.toNumber()), r = r.add(n), o++;
  return u;
}
var L5 = jd(function(e, t, n) {
  var r = +e, o = +t;
  return r + n * (o - r);
}), U5 = jd(function(e, t, n) {
  var r = t - +e;
  return r = r || 1 / 0, (n - e) / r;
}), I5 = jd(function(e, t, n) {
  var r = t - +e;
  return r = r || 1 / 0, Math.max(0, Math.min(1, (n - e) / r));
});
const Md = {
  rangeStep: B5,
  getDigitCount: k5,
  interpolateNumber: L5,
  uninterpolateNumber: U5,
  uninterpolateTruncation: I5
};
function Gb(e) {
  return Y5(e) || G5(e) || QD(e) || H5();
}
function H5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function G5(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function Y5(e) {
  if (Array.isArray(e)) return Yb(e);
}
function Hu(e, t) {
  return V5(e) || X5(e, t) || QD(e, t) || K5();
}
function K5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QD(e, t) {
  if (e) {
    if (typeof e == "string") return Yb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Yb(e, t);
  }
}
function Yb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function X5(e, t) {
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
function V5(e) {
  if (Array.isArray(e)) return e;
}
function JD(e) {
  var t = Hu(e, 2), n = t[0], r = t[1], o = n, u = r;
  return n > r && (o = r, u = n), [o, u];
}
function eP(e, t, n) {
  if (e.lte(0))
    return new Ze(0);
  var r = Md.getDigitCount(e.toNumber()), o = new Ze(10).pow(r), u = e.div(o), c = r !== 1 ? 0.05 : 0.1, f = new Ze(Math.ceil(u.div(c).toNumber())).add(n).mul(c), d = f.mul(o);
  return t ? d : new Ze(Math.ceil(d));
}
function F5(e, t, n) {
  var r = 1, o = new Ze(e);
  if (!o.isint() && n) {
    var u = Math.abs(e);
    u < 1 ? (r = new Ze(10).pow(Md.getDigitCount(e) - 1), o = new Ze(Math.floor(o.div(r).toNumber())).mul(r)) : u > 1 && (o = new Ze(Math.floor(e)));
  } else e === 0 ? o = new Ze(Math.floor((t - 1) / 2)) : n || (o = new Ze(Math.floor(e)));
  var c = Math.floor((t - 1) / 2), f = q5(z5(function(d) {
    return o.add(new Ze(d - c).mul(r)).toNumber();
  }), Ib);
  return f(0, t);
}
function tP(e, t, n, r) {
  var o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (n - 1)))
    return {
      step: new Ze(0),
      tickMin: new Ze(0),
      tickMax: new Ze(0)
    };
  var u = eP(new Ze(t).sub(e).div(n - 1), r, o), c;
  e <= 0 && t >= 0 ? c = new Ze(0) : (c = new Ze(e).add(t).div(2), c = c.sub(new Ze(c).mod(u)));
  var f = Math.ceil(c.sub(e).div(u).toNumber()), d = Math.ceil(new Ze(t).sub(c).div(u).toNumber()), h = f + d + 1;
  return h > n ? tP(e, t, n, r, o + 1) : (h < n && (d = t > 0 ? d + (n - h) : d, f = t > 0 ? f : f + (n - h)), {
    step: u,
    tickMin: c.sub(new Ze(f).mul(u)),
    tickMax: c.add(new Ze(d).mul(u))
  });
}
function W5(e) {
  var t = Hu(e, 2), n = t[0], r = t[1], o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = Math.max(o, 2), f = JD([n, r]), d = Hu(f, 2), h = d[0], y = d[1];
  if (h === -1 / 0 || y === 1 / 0) {
    var v = y === 1 / 0 ? [h].concat(Gb(Ib(0, o - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Gb(Ib(0, o - 1).map(function() {
      return -1 / 0;
    })), [y]);
    return n > r ? Hb(v) : v;
  }
  if (h === y)
    return F5(h, o, u);
  var g = tP(h, y, c, u), b = g.step, _ = g.tickMin, S = g.tickMax, x = Md.rangeStep(_, S.add(new Ze(0.1).mul(b)), b);
  return n > r ? Hb(x) : x;
}
function Z5(e, t) {
  var n = Hu(e, 2), r = n[0], o = n[1], u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, c = JD([r, o]), f = Hu(c, 2), d = f[0], h = f[1];
  if (d === -1 / 0 || h === 1 / 0)
    return [r, o];
  if (d === h)
    return [d];
  var y = Math.max(t, 2), v = eP(new Ze(h).sub(d).div(y - 1), u, 0), g = [].concat(Gb(Md.rangeStep(new Ze(d), new Ze(h).sub(new Ze(0.99).mul(v)), v)), [h]);
  return r > o ? Hb(g) : g;
}
var Q5 = ZD(W5), J5 = ZD(Z5), eL = "Invariant failed";
function xi(e, t) {
  throw new Error(eL);
}
var tL = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function qo(e) {
  "@babel/helpers - typeof";
  return qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qo(e);
}
function Cf() {
  return Cf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Cf.apply(this, arguments);
}
function nL(e, t) {
  return oL(e) || iL(e, t) || aL(e, t) || rL();
}
function rL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function aL(e, t) {
  if (e) {
    if (typeof e == "string") return U2(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return U2(e, t);
  }
}
function U2(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function iL(e, t) {
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
function oL(e) {
  if (Array.isArray(e)) return e;
}
function lL(e, t) {
  if (e == null) return {};
  var n = uL(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function uL(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function cL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function sL(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, aP(r.key), r);
  }
}
function fL(e, t, n) {
  return t && sL(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dL(e, t, n) {
  return t = Df(t), hL(e, nP() ? Reflect.construct(t, n || [], Df(e).constructor) : t.apply(e, n));
}
function hL(e, t) {
  if (t && (qo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return pL(e);
}
function pL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function nP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (nP = function() {
    return !!e;
  })();
}
function Df(e) {
  return Df = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Df(e);
}
function vL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Kb(e, t);
}
function Kb(e, t) {
  return Kb = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Kb(e, t);
}
function rP(e, t, n) {
  return t = aP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function aP(e) {
  var t = yL(e, "string");
  return qo(t) == "symbol" ? t : t + "";
}
function yL(e, t) {
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
    return cL(this, t), dL(this, t, arguments);
  }
  return vL(t, e), fL(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.offset, u = r.layout, c = r.width, f = r.dataKey, d = r.data, h = r.dataPointFormatter, y = r.xAxis, v = r.yAxis, g = lL(r, tL), b = Te(g, !1);
      this.props.direction === "x" && y.type !== "number" && xi();
      var _ = d.map(function(S) {
        var x = h(S, f), A = x.x, T = x.y, M = x.value, C = x.errorVal;
        if (!C)
          return null;
        var w = [], E, j;
        if (Array.isArray(C)) {
          var N = nL(C, 2);
          E = N[0], j = N[1];
        } else
          E = j = C;
        if (u === "vertical") {
          var R = y.scale, k = T + o, L = k + c, q = k - c, V = R(M - E), Y = R(M + j);
          w.push({
            x1: Y,
            y1: L,
            x2: Y,
            y2: q
          }), w.push({
            x1: V,
            y1: k,
            x2: Y,
            y2: k
          }), w.push({
            x1: V,
            y1: L,
            x2: V,
            y2: q
          });
        } else if (u === "horizontal") {
          var F = v.scale, z = A + o, K = z - c, ne = z + c, G = F(M - E), J = F(M + j);
          w.push({
            x1: K,
            y1: J,
            x2: ne,
            y2: J
          }), w.push({
            x1: z,
            y1: G,
            x2: z,
            y2: J
          }), w.push({
            x1: K,
            y1: G,
            x2: ne,
            y2: G
          });
        }
        return /* @__PURE__ */ U.createElement(Ie, Cf({
          className: "recharts-errorBar",
          key: "bar-".concat(w.map(function(P) {
            return "".concat(P.x1, "-").concat(P.x2, "-").concat(P.y1, "-").concat(P.y2);
          }))
        }, b), w.map(function(P) {
          return /* @__PURE__ */ U.createElement("line", Cf({}, P, {
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
rP(sl, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
rP(sl, "displayName", "ErrorBar");
function Gu(e) {
  "@babel/helpers - typeof";
  return Gu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gu(e);
}
function I2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ai(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? I2(Object(n), !0).forEach(function(r) {
      mL(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : I2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mL(e, t, n) {
  return t = gL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function gL(e) {
  var t = bL(e, "string");
  return Gu(t) == "symbol" ? t : t + "";
}
function bL(e, t) {
  if (Gu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Gu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var iP = function(t) {
  var n = t.children, r = t.formattedGraphicalItems, o = t.legendWidth, u = t.legendContent, c = xn(n, Ao);
  if (!c)
    return null;
  var f = Ao.defaultProps, d = f !== void 0 ? ai(ai({}, f), c.props) : {}, h;
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
    var v = y.item, g = v.type.defaultProps, b = g !== void 0 ? ai(ai({}, g), v.props) : {}, _ = b.dataKey, S = b.name, x = b.legendType, A = b.hide;
    return {
      inactive: A,
      dataKey: _,
      type: d.iconType || x || "square",
      color: P1(v),
      value: S || _,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: b
    };
  }), ai(ai(ai({}, d), Ao.getWithHeight(c, o)), {}, {
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
function H2(e) {
  return OL(e) || _L(e) || SL(e) || xL();
}
function xL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function SL(e, t) {
  if (e) {
    if (typeof e == "string") return Xb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Xb(e, t);
  }
}
function _L(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function OL(e) {
  if (Array.isArray(e)) return Xb(e);
}
function Xb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
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
function ft(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? G2(Object(n), !0).forEach(function(r) {
      Eo(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : G2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Eo(e, t, n) {
  return t = wL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function wL(e) {
  var t = AL(e, "string");
  return Yu(t) == "symbol" ? t : t + "";
}
function AL(e, t) {
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
function _u(e, t, n, r) {
  var o = O5(e, function(f) {
    return At(f, t);
  });
  if (n === "number") {
    var u = o.filter(function(f) {
      return de(f) || parseFloat(f);
    });
    return u.length ? [Ed(u), Ea(u)] : [1 / 0, -1 / 0];
  }
  var c = r ? o.filter(function(f) {
    return !we(f);
  }) : o;
  return c.map(function(f) {
    return wt(f) || f instanceof Date ? f : "";
  });
}
var TL = function(t) {
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
        var T = Math.min(y, g), M = Math.max(y, g);
        if (t > (T + v) / 2 && t <= (M + v) / 2) {
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
}, P1 = function(t) {
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
}, EL = function(t) {
  var n = t.barSize, r = t.totalSize, o = t.stackGroups, u = o === void 0 ? {} : o;
  if (!u)
    return {};
  for (var c = {}, f = Object.keys(u), d = 0, h = f.length; d < h; d++)
    for (var y = u[f[d]].stackGroups, v = Object.keys(y), g = 0, b = v.length; g < b; g++) {
      var _ = y[v[g]], S = _.items, x = _.cateAxisId, A = S.filter(function(j) {
        return Lr(j.type).indexOf("Bar") >= 0;
      });
      if (A && A.length) {
        var T = A[0].type.defaultProps, M = T !== void 0 ? ft(ft({}, T), A[0].props) : A[0].props, C = M.barSize, w = M[x];
        c[w] || (c[w] = []);
        var E = we(C) ? n : C;
        c[w].push({
          item: A[0],
          stackList: A.slice(1),
          barSize: we(E) ? void 0 : mi(E, r, 0)
        });
      }
    }
  return c;
}, jL = function(t) {
  var n = t.barGap, r = t.barCategoryGap, o = t.bandSize, u = t.sizeList, c = u === void 0 ? [] : u, f = t.maxBarSize, d = c.length;
  if (d < 1) return null;
  var h = mi(n, o, 0, !0), y, v = [];
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
      var E = {
        item: w.item,
        position: {
          offset: x.offset + x.size + h,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: g ? b : w.barSize
        }
      }, j = [].concat(H2(C), [E]);
      return x = j[j.length - 1].position, w.stackList && w.stackList.length && w.stackList.forEach(function(N) {
        j.push({
          item: N,
          position: x
        });
      }), j;
    }, v);
  } else {
    var A = mi(r, o, 0, !0);
    o - 2 * A - (d - 1) * h <= 0 && (h = 0);
    var T = (o - 2 * A - (d - 1) * h) / d;
    T > 1 && (T >>= 0);
    var M = f === +f ? Math.min(T, f) : T;
    y = c.reduce(function(C, w, E) {
      var j = [].concat(H2(C), [{
        item: w.item,
        position: {
          offset: A + (T + h) * E + (T - M) / 2,
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
}, ML = function(t, n, r, o) {
  var u = r.children, c = r.width, f = r.margin, d = c - (f.left || 0) - (f.right || 0), h = iP({
    children: u,
    legendWidth: d
  });
  if (h) {
    var y = o || {}, v = y.width, g = y.height, b = h.align, _ = h.verticalAlign, S = h.layout;
    if ((S === "vertical" || S === "horizontal" && _ === "middle") && b !== "center" && de(t[b]))
      return ft(ft({}, t), {}, Eo({}, b, t[b] + (v || 0)));
    if ((S === "horizontal" || S === "vertical" && b === "center") && _ !== "middle" && de(t[_]))
      return ft(ft({}, t), {}, Eo({}, _, t[_] + (g || 0)));
  }
  return t;
}, CL = function(t, n, r) {
  return we(n) ? !0 : t === "horizontal" ? n === "yAxis" : t === "vertical" || r === "x" ? n === "xAxis" : r === "y" ? n === "yAxis" : !0;
}, oP = function(t, n, r, o, u) {
  var c = n.props.children, f = on(c, sl).filter(function(h) {
    return CL(o, u, h.props.direction);
  });
  if (f && f.length) {
    var d = f.map(function(h) {
      return h.props.dataKey;
    });
    return t.reduce(function(h, y) {
      var v = At(y, r);
      if (we(v)) return h;
      var g = Array.isArray(v) ? [Ed(v), Ea(v)] : [v, v], b = d.reduce(function(_, S) {
        var x = At(y, S, 0), A = g[0] - Math.abs(Array.isArray(x) ? x[0] : x), T = g[1] + Math.abs(Array.isArray(x) ? x[1] : x);
        return [Math.min(A, _[0]), Math.max(T, _[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(b[0], h[0]), Math.max(b[1], h[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, DL = function(t, n, r, o, u) {
  var c = n.map(function(f) {
    return oP(t, f, r, u, o);
  }).filter(function(f) {
    return !we(f);
  });
  return c && c.length ? c.reduce(function(f, d) {
    return [Math.min(f[0], d[0]), Math.max(f[1], d[1])];
  }, [1 / 0, -1 / 0]) : null;
}, lP = function(t, n, r, o, u) {
  var c = n.map(function(d) {
    var h = d.props.dataKey;
    return r === "number" && h && oP(t, d, h, o) || _u(t, h, r, u);
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
}, uP = function(t, n) {
  return t === "horizontal" && n === "xAxis" || t === "vertical" && n === "yAxis" || t === "centric" && n === "angleAxis" || t === "radial" && n === "radiusAxis";
}, cP = function(t, n, r, o) {
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
}, Dg = /* @__PURE__ */ new WeakMap(), Xs = function(t, n) {
  if (typeof n != "function")
    return t;
  Dg.has(t) || Dg.set(t, /* @__PURE__ */ new WeakMap());
  var r = Dg.get(t);
  if (r.has(n))
    return r.get(n);
  var o = function() {
    t.apply(void 0, arguments), n.apply(void 0, arguments);
  };
  return r.set(n, o), o;
}, PL = function(t, n, r) {
  var o = t.scale, u = t.type, c = t.layout, f = t.axisType;
  if (o === "auto")
    return c === "radial" && f === "radiusAxis" ? {
      scale: qu(),
      realScaleType: "band"
    } : c === "radial" && f === "angleAxis" ? {
      scale: Af(),
      realScaleType: "linear"
    } : u === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !r) ? {
      scale: Su(),
      realScaleType: "point"
    } : u === "category" ? {
      scale: qu(),
      realScaleType: "band"
    } : {
      scale: Af(),
      realScaleType: "linear"
    };
  if (yi(o)) {
    var d = "scale".concat(dd(o));
    return {
      scale: (M2[d] || Su)(),
      realScaleType: M2[d] ? d : "point"
    };
  }
  return Ee(o) ? {
    scale: o
  } : {
    scale: Su(),
    realScaleType: "point"
  };
}, Y2 = 1e-4, NL = function(t) {
  var n = t.domain();
  if (!(!n || n.length <= 2)) {
    var r = n.length, o = t.range(), u = Math.min(o[0], o[1]) - Y2, c = Math.max(o[0], o[1]) + Y2, f = t(n[0]), d = t(n[r - 1]);
    (f < u || f > c || d < u || d > c) && t.domain([n[0], n[r - 1]]);
  }
}, RL = function(t, n) {
  if (!t)
    return null;
  for (var r = 0, o = t.length; r < o; r++)
    if (t[r].item === n)
      return t[r].position;
  return null;
}, $L = function(t, n) {
  if (!n || n.length !== 2 || !de(n[0]) || !de(n[1]))
    return t;
  var r = Math.min(n[0], n[1]), o = Math.max(n[0], n[1]), u = [t[0], t[1]];
  return (!de(t[0]) || t[0] < r) && (u[0] = r), (!de(t[1]) || t[1] > o) && (u[1] = o), u[0] > o && (u[0] = o), u[1] < r && (u[1] = r), u;
}, zL = function(t) {
  var n = t.length;
  if (!(n <= 0))
    for (var r = 0, o = t[0].length; r < o; ++r)
      for (var u = 0, c = 0, f = 0; f < n; ++f) {
        var d = il(t[f][r][1]) ? t[f][r][0] : t[f][r][1];
        d >= 0 ? (t[f][r][0] = u, t[f][r][1] = u + d, u = t[f][r][1]) : (t[f][r][0] = c, t[f][r][1] = c + d, c = t[f][r][1]);
      }
}, qL = function(t) {
  var n = t.length;
  if (!(n <= 0))
    for (var r = 0, o = t[0].length; r < o; ++r)
      for (var u = 0, c = 0; c < n; ++c) {
        var f = il(t[c][r][1]) ? t[c][r][0] : t[c][r][1];
        f >= 0 ? (t[c][r][0] = u, t[c][r][1] = u + f, u = t[c][r][1]) : (t[c][r][0] = 0, t[c][r][1] = 0);
      }
}, kL = {
  sign: zL,
  // @ts-expect-error definitelytyped types are incorrect
  expand: Sq,
  // @ts-expect-error definitelytyped types are incorrect
  none: Mo,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: _q,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: Oq,
  positive: qL
}, BL = function(t, n, r) {
  var o = n.map(function(f) {
    return f.props.dataKey;
  }), u = kL[r], c = xq().keys(o).value(function(f, d) {
    return +At(f, d, 0);
  }).order(Ob).offset(u);
  return c(t);
}, LL = function(t, n, r, o, u, c) {
  if (!t)
    return null;
  var f = c ? n.reverse() : n, d = {}, h = f.reduce(function(v, g) {
    var b, _ = (b = g.type) !== null && b !== void 0 && b.defaultProps ? ft(ft({}, g.type.defaultProps), g.props) : g.props, S = _.stackId, x = _.hide;
    if (x)
      return v;
    var A = _[r], T = v[A] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (wt(S)) {
      var M = T.stackGroups[S] || {
        numericAxisId: r,
        cateAxisId: o,
        items: []
      };
      M.items.push(g), T.hasStack = !0, T.stackGroups[S] = M;
    } else
      T.stackGroups[Oi("_stackId_")] = {
        numericAxisId: r,
        cateAxisId: o,
        items: [g]
      };
    return ft(ft({}, v), {}, Eo({}, A, T));
  }, d), y = {};
  return Object.keys(h).reduce(function(v, g) {
    var b = h[g];
    if (b.hasStack) {
      var _ = {};
      b.stackGroups = Object.keys(b.stackGroups).reduce(function(S, x) {
        var A = b.stackGroups[x];
        return ft(ft({}, S), {}, Eo({}, x, {
          numericAxisId: r,
          cateAxisId: o,
          items: A.items,
          stackedData: BL(t, A.items, u)
        }));
      }, _);
    }
    return ft(ft({}, v), {}, Eo({}, g, b));
  }, y);
}, UL = function(t, n) {
  var r = n.realScaleType, o = n.type, u = n.tickCount, c = n.originalDomain, f = n.allowDecimals, d = r || n.scale;
  if (d !== "auto" && d !== "linear")
    return null;
  if (u && o === "number" && c && (c[0] === "auto" || c[1] === "auto")) {
    var h = t.domain();
    if (!h.length)
      return null;
    var y = Q5(h, u, f);
    return t.domain([Ed(y), Ea(y)]), {
      niceTicks: y
    };
  }
  if (u && o === "number") {
    var v = t.domain(), g = J5(v, u, f);
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
      var f = af(n, "value", o[t.dataKey]);
      if (f)
        return f.coordinate + r / 2;
    }
    return n[u] ? n[u].coordinate + r / 2 : null;
  }
  var d = At(o, we(c) ? t.dataKey : c);
  return we(d) ? null : t.scale(d);
}
var K2 = function(t) {
  var n = t.axis, r = t.ticks, o = t.offset, u = t.bandSize, c = t.entry, f = t.index;
  if (n.type === "category")
    return r[f] ? r[f].coordinate + o : null;
  var d = At(c, n.dataKey, n.domain[f]);
  return we(d) ? null : n.scale(d) - u / 2 + o;
}, IL = function(t) {
  var n = t.numericAxis, r = n.scale.domain();
  if (n.type === "number") {
    var o = Math.min(r[0], r[1]), u = Math.max(r[0], r[1]);
    return o <= 0 && u >= 0 ? 0 : u < 0 ? u : o;
  }
  return r[0];
}, HL = function(t, n) {
  var r, o = (r = t.type) !== null && r !== void 0 && r.defaultProps ? ft(ft({}, t.type.defaultProps), t.props) : t.props, u = o.stackId;
  if (wt(u)) {
    var c = n[u];
    if (c) {
      var f = c.items.indexOf(t);
      return f >= 0 ? c.stackedData[f] : null;
    }
  }
  return null;
}, GL = function(t) {
  return t.reduce(function(n, r) {
    return [Ed(r.concat([n[0]]).filter(de)), Ea(r.concat([n[1]]).filter(de))];
  }, [1 / 0, -1 / 0]);
}, sP = function(t, n, r) {
  return Object.keys(t).reduce(function(o, u) {
    var c = t[u], f = c.stackedData, d = f.reduce(function(h, y) {
      var v = GL(y.slice(n, r + 1));
      return [Math.min(h[0], v[0]), Math.max(h[1], v[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(d[0], o[0]), Math.max(d[1], o[1])];
  }, [1 / 0, -1 / 0]).map(function(o) {
    return o === 1 / 0 || o === -1 / 0 ? 0 : o;
  });
}, X2 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, V2 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Vb = function(t, n, r) {
  if (Ee(t))
    return t(n, r);
  if (!Array.isArray(t))
    return n;
  var o = [];
  if (de(t[0]))
    o[0] = r ? t[0] : Math.min(t[0], n[0]);
  else if (X2.test(t[0])) {
    var u = +X2.exec(t[0])[1];
    o[0] = n[0] - u;
  } else Ee(t[0]) ? o[0] = t[0](n[0]) : o[0] = n[0];
  if (de(t[1]))
    o[1] = r ? t[1] : Math.max(t[1], n[1]);
  else if (V2.test(t[1])) {
    var c = +V2.exec(t[1])[1];
    o[1] = n[1] + c;
  } else Ee(t[1]) ? o[1] = t[1](n[1]) : o[1] = n[1];
  return o;
}, Pf = function(t, n, r) {
  if (t && t.scale && t.scale.bandwidth) {
    var o = t.scale.bandwidth();
    if (!r || o > 0)
      return o;
  }
  if (t && n && n.length >= 2) {
    for (var u = o1(n, function(v) {
      return v.coordinate;
    }), c = 1 / 0, f = 1, d = u.length; f < d; f++) {
      var h = u[f], y = u[f - 1];
      c = Math.min((h.coordinate || 0) - (y.coordinate || 0), c);
    }
    return c === 1 / 0 ? 0 : c;
  }
  return r ? void 0 : 0;
}, F2 = function(t, n, r) {
  return !t || !t.length || gi(t, Bn(r, "type.defaultProps.domain")) ? n : t;
}, fP = function(t, n) {
  var r = t.type.defaultProps ? ft(ft({}, t.type.defaultProps), t.props) : t.props, o = r.dataKey, u = r.name, c = r.unit, f = r.formatter, d = r.tooltipType, h = r.chartType, y = r.hide;
  return ft(ft({}, Te(t, !1)), {}, {
    dataKey: o,
    unit: c,
    formatter: f,
    name: u || o,
    color: P1(t),
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
      YL(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : W2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function YL(e, t, n) {
  return t = KL(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function KL(e) {
  var t = XL(e, "string");
  return Ku(t) == "symbol" ? t : t + "";
}
function XL(e, t) {
  if (Ku(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ku(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nf = Math.PI / 180, VL = function(t) {
  return t * 180 / Math.PI;
}, Bt = function(t, n, r, o) {
  return {
    x: t + Math.cos(-Nf * o) * r,
    y: n + Math.sin(-Nf * o) * r
  };
}, FL = function(t, n) {
  var r = t.x, o = t.y, u = n.x, c = n.y;
  return Math.sqrt(Math.pow(r - u, 2) + Math.pow(o - c, 2));
}, WL = function(t, n) {
  var r = t.x, o = t.y, u = n.cx, c = n.cy, f = FL({
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
    angle: VL(h),
    angleInRadian: h
  };
}, ZL = function(t) {
  var n = t.startAngle, r = t.endAngle, o = Math.floor(n / 360), u = Math.floor(r / 360), c = Math.min(o, u);
  return {
    startAngle: n - c * 360,
    endAngle: r - c * 360
  };
}, QL = function(t, n) {
  var r = n.startAngle, o = n.endAngle, u = Math.floor(r / 360), c = Math.floor(o / 360), f = Math.min(u, c);
  return t + f * 360;
}, Q2 = function(t, n) {
  var r = t.x, o = t.y, u = WL({
    x: r,
    y: o
  }, n), c = u.radius, f = u.angle, d = n.innerRadius, h = n.outerRadius;
  if (c < d || c > h)
    return !1;
  if (c === 0)
    return !0;
  var y = ZL(n), v = y.startAngle, g = y.endAngle, b = f, _;
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
  return _ ? Z2(Z2({}, n), {}, {
    radius: c,
    angle: QL(b, n)
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
var JL = ["offset"];
function eU(e) {
  return aU(e) || rU(e) || nU(e) || tU();
}
function tU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nU(e, t) {
  if (e) {
    if (typeof e == "string") return Fb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Fb(e, t);
  }
}
function rU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function aU(e) {
  if (Array.isArray(e)) return Fb(e);
}
function Fb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function iU(e, t) {
  if (e == null) return {};
  var n = oU(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function oU(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
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
function Ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? J2(Object(n), !0).forEach(function(r) {
      lU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : J2(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function lU(e, t, n) {
  return t = uU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function uU(e) {
  var t = cU(e, "string");
  return Xu(t) == "symbol" ? t : t + "";
}
function cU(e, t) {
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
var sU = function(t) {
  var n = t.value, r = t.formatter, o = we(t.children) ? n : t.children;
  return Ee(r) ? r(o) : o;
}, fU = function(t, n) {
  var r = Wn(n - t), o = Math.min(Math.abs(n - t), 360);
  return r * o;
}, dU = function(t, n, r) {
  var o = t.position, u = t.viewBox, c = t.offset, f = t.className, d = u, h = d.cx, y = d.cy, v = d.innerRadius, g = d.outerRadius, b = d.startAngle, _ = d.endAngle, S = d.clockWise, x = (v + g) / 2, A = fU(b, _), T = A >= 0 ? 1 : -1, M, C;
  o === "insideStart" ? (M = b + T * c, C = S) : o === "insideEnd" ? (M = _ - T * c, C = !S) : o === "end" && (M = _ + T * c, C = S), C = A <= 0 ? C : !C;
  var w = Bt(h, y, x, M), E = Bt(h, y, x, M + (C ? 1 : -1) * 359), j = "M".concat(w.x, ",").concat(w.y, `
    A`).concat(x, ",").concat(x, ",0,1,").concat(C ? 0 : 1, `,
    `).concat(E.x, ",").concat(E.y), N = we(t.id) ? Oi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ U.createElement("text", Vu({}, r, {
    dominantBaseline: "central",
    className: $e("recharts-radial-bar-label", f)
  }), /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("path", {
    id: N,
    d: j
  })), /* @__PURE__ */ U.createElement("textPath", {
    xlinkHref: "#".concat(N)
  }, n));
}, hU = function(t) {
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
  var x = (d + h) / 2, A = Bt(c, f, x, g), T = A.x, M = A.y;
  return {
    x: T,
    y: M,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, pU = function(t) {
  var n = t.viewBox, r = t.parentViewBox, o = t.offset, u = t.position, c = n, f = c.x, d = c.y, h = c.width, y = c.height, v = y >= 0 ? 1 : -1, g = v * o, b = v > 0 ? "end" : "start", _ = v > 0 ? "start" : "end", S = h >= 0 ? 1 : -1, x = S * o, A = S > 0 ? "end" : "start", T = S > 0 ? "start" : "end";
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
    var E = {
      x: f + h + x,
      y: d + y / 2,
      textAnchor: T,
      verticalAnchor: "middle"
    };
    return Ot(Ot({}, E), r ? {
      width: Math.max(r.x + r.width - E.x, 0),
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
    textAnchor: T,
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
    textAnchor: T,
    verticalAnchor: _
  }, j) : u === "insideTopRight" ? Ot({
    x: f + h - x,
    y: d + g,
    textAnchor: A,
    verticalAnchor: _
  }, j) : u === "insideBottomLeft" ? Ot({
    x: f + x,
    y: d + y - g,
    textAnchor: T,
    verticalAnchor: b
  }, j) : u === "insideBottomRight" ? Ot({
    x: f + h - x,
    y: d + y - g,
    textAnchor: A,
    verticalAnchor: b
  }, j) : al(u) && (de(u.x) || li(u.x)) && (de(u.y) || li(u.y)) ? Ot({
    x: f + mi(u.x, h),
    y: d + mi(u.y, y),
    textAnchor: "end",
    verticalAnchor: "end"
  }, j) : Ot({
    x: f + h / 2,
    y: d + y / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, j);
}, vU = function(t) {
  return "cx" in t && de(t.cx);
};
function Gt(e) {
  var t = e.offset, n = t === void 0 ? 5 : t, r = iU(e, JL), o = Ot({
    offset: n
  }, r), u = o.viewBox, c = o.position, f = o.value, d = o.children, h = o.content, y = o.className, v = y === void 0 ? "" : y, g = o.textBreakAll;
  if (!u || we(f) && we(d) && !/* @__PURE__ */ ee.isValidElement(h) && !Ee(h))
    return null;
  if (/* @__PURE__ */ ee.isValidElement(h))
    return /* @__PURE__ */ ee.cloneElement(h, o);
  var b;
  if (Ee(h)) {
    if (b = /* @__PURE__ */ ee.createElement(h, o), /* @__PURE__ */ ee.isValidElement(b))
      return b;
  } else
    b = sU(o);
  var _ = vU(u), S = Te(o, !0);
  if (_ && (c === "insideStart" || c === "insideEnd" || c === "end"))
    return dU(o, b, S);
  var x = _ ? hU(o) : pU(o);
  return /* @__PURE__ */ U.createElement(mf, Vu({
    className: $e("recharts-label", v)
  }, S, x, {
    breakAll: g
  }), b);
}
Gt.displayName = "Label";
var dP = function(t) {
  var n = t.cx, r = t.cy, o = t.angle, u = t.startAngle, c = t.endAngle, f = t.r, d = t.radius, h = t.innerRadius, y = t.outerRadius, v = t.x, g = t.y, b = t.top, _ = t.left, S = t.width, x = t.height, A = t.clockWise, T = t.labelViewBox;
  if (T)
    return T;
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
}, yU = function(t, n) {
  return t ? t === !0 ? /* @__PURE__ */ U.createElement(Gt, {
    key: "label-implicit",
    viewBox: n
  }) : wt(t) ? /* @__PURE__ */ U.createElement(Gt, {
    key: "label-implicit",
    viewBox: n,
    value: t
  }) : /* @__PURE__ */ ee.isValidElement(t) ? t.type === Gt ? /* @__PURE__ */ ee.cloneElement(t, {
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
  }) : al(t) ? /* @__PURE__ */ U.createElement(Gt, Vu({
    viewBox: n
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, mU = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label)
    return null;
  var o = t.children, u = dP(t), c = on(o, Gt).map(function(d, h) {
    return /* @__PURE__ */ ee.cloneElement(d, {
      viewBox: n || u,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(h)
    });
  });
  if (!r)
    return c;
  var f = yU(t.label, n || u);
  return [f].concat(eU(c));
};
Gt.parseViewBox = dP;
Gt.renderCallByParent = mU;
var Pg, ej;
function gU() {
  if (ej) return Pg;
  ej = 1;
  function e(t) {
    var n = t == null ? 0 : t.length;
    return n ? t[n - 1] : void 0;
  }
  return Pg = e, Pg;
}
var bU = gU();
const xU = /* @__PURE__ */ tt(bU);
function Fu(e) {
  "@babel/helpers - typeof";
  return Fu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fu(e);
}
var SU = ["valueAccessor"], _U = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function OU(e) {
  return EU(e) || TU(e) || AU(e) || wU();
}
function wU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function AU(e, t) {
  if (e) {
    if (typeof e == "string") return Wb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Wb(e, t);
  }
}
function TU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function EU(e) {
  if (Array.isArray(e)) return Wb(e);
}
function Wb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Rf() {
  return Rf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Rf.apply(this, arguments);
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
      jU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tj(Object(n)).forEach(function(r) {
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
  return Fu(t) == "symbol" ? t : t + "";
}
function CU(e, t) {
  if (Fu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Fu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rj(e, t) {
  if (e == null) return {};
  var n = DU(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function DU(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var PU = function(t) {
  return Array.isArray(t.value) ? xU(t.value) : t.value;
};
function dr(e) {
  var t = e.valueAccessor, n = t === void 0 ? PU : t, r = rj(e, SU), o = r.data, u = r.dataKey, c = r.clockWise, f = r.id, d = r.textBreakAll, h = rj(r, _U);
  return !o || !o.length ? null : /* @__PURE__ */ U.createElement(Ie, {
    className: "recharts-label-list"
  }, o.map(function(y, v) {
    var g = we(u) ? n(y, v) : At(y && y.payload, u), b = we(f) ? {} : {
      id: "".concat(f, "-").concat(v)
    };
    return /* @__PURE__ */ U.createElement(Gt, Rf({}, Te(y, !0), h, b, {
      parentViewBox: y.parentViewBox,
      value: g,
      textBreakAll: d,
      viewBox: Gt.parseViewBox(we(c) ? y : nj(nj({}, y), {}, {
        clockWise: c
      })),
      key: "label-".concat(v),
      index: v
    }));
  }));
}
dr.displayName = "LabelList";
function NU(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ U.createElement(dr, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ U.isValidElement(e) || Ee(e) ? /* @__PURE__ */ U.createElement(dr, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : al(e) ? /* @__PURE__ */ U.createElement(dr, Rf({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function RU(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && n && !e.label)
    return null;
  var r = e.children, o = on(r, dr).map(function(c, f) {
    return /* @__PURE__ */ ee.cloneElement(c, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(f)
    });
  });
  if (!n)
    return o;
  var u = NU(e.label, t);
  return [u].concat(OU(o));
}
dr.renderCallByParent = RU;
function Wu(e) {
  "@babel/helpers - typeof";
  return Wu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wu(e);
}
function Zb() {
  return Zb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Zb.apply(this, arguments);
}
function aj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ij(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? aj(Object(n), !0).forEach(function(r) {
      $U(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : aj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $U(e, t, n) {
  return t = zU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function zU(e) {
  var t = qU(e, "string");
  return Wu(t) == "symbol" ? t : t + "";
}
function qU(e, t) {
  if (Wu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kU = function(t, n) {
  var r = Wn(n - t), o = Math.min(Math.abs(n - t), 359.999);
  return r * o;
}, Vs = function(t) {
  var n = t.cx, r = t.cy, o = t.radius, u = t.angle, c = t.sign, f = t.isExternal, d = t.cornerRadius, h = t.cornerIsExternal, y = d * (f ? 1 : -1) + o, v = Math.asin(d / y) / Nf, g = h ? u : u + c * v, b = Bt(n, r, y, g), _ = Bt(n, r, o, g), S = h ? u - c * v : u, x = Bt(n, r, y * Math.cos(v * Nf), S);
  return {
    center: b,
    circleTangency: _,
    lineTangency: x,
    theta: v
  };
}, hP = function(t) {
  var n = t.cx, r = t.cy, o = t.innerRadius, u = t.outerRadius, c = t.startAngle, f = t.endAngle, d = kU(c, f), h = c + d, y = Bt(n, r, u, c), v = Bt(n, r, u, h), g = "M ".concat(y.x, ",").concat(y.y, `
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
}, BU = function(t) {
  var n = t.cx, r = t.cy, o = t.innerRadius, u = t.outerRadius, c = t.cornerRadius, f = t.forceCornerRadius, d = t.cornerIsExternal, h = t.startAngle, y = t.endAngle, v = Wn(y - h), g = Vs({
    cx: n,
    cy: r,
    radius: u,
    angle: h,
    sign: v,
    cornerRadius: c,
    cornerIsExternal: d
  }), b = g.circleTangency, _ = g.lineTangency, S = g.theta, x = Vs({
    cx: n,
    cy: r,
    radius: u,
    angle: y,
    sign: -v,
    cornerRadius: c,
    cornerIsExternal: d
  }), A = x.circleTangency, T = x.lineTangency, M = x.theta, C = d ? Math.abs(h - y) : Math.abs(h - y) - S - M;
  if (C < 0)
    return f ? "M ".concat(_.x, ",").concat(_.y, `
        a`).concat(c, ",").concat(c, ",0,0,1,").concat(c * 2, `,0
        a`).concat(c, ",").concat(c, ",0,0,1,").concat(-c * 2, `,0
      `) : hP({
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
    A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(T.x, ",").concat(T.y, `
  `);
  if (o > 0) {
    var E = Vs({
      cx: n,
      cy: r,
      radius: o,
      angle: h,
      sign: v,
      isExternal: !0,
      cornerRadius: c,
      cornerIsExternal: d
    }), j = E.circleTangency, N = E.lineTangency, R = E.theta, k = Vs({
      cx: n,
      cy: r,
      radius: o,
      angle: y,
      sign: -v,
      isExternal: !0,
      cornerRadius: c,
      cornerIsExternal: d
    }), L = k.circleTangency, q = k.lineTangency, V = k.theta, Y = d ? Math.abs(h - y) : Math.abs(h - y) - R - V;
    if (Y < 0 && c === 0)
      return "".concat(w, "L").concat(n, ",").concat(r, "Z");
    w += "L".concat(q.x, ",").concat(q.y, `
      A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(L.x, ",").concat(L.y, `
      A`).concat(o, ",").concat(o, ",0,").concat(+(Y > 180), ",").concat(+(v > 0), ",").concat(j.x, ",").concat(j.y, `
      A`).concat(c, ",").concat(c, ",0,0,").concat(+(v < 0), ",").concat(N.x, ",").concat(N.y, "Z");
  } else
    w += "L".concat(n, ",").concat(r, "Z");
  return w;
}, LU = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, pP = function(t) {
  var n = ij(ij({}, LU), t), r = n.cx, o = n.cy, u = n.innerRadius, c = n.outerRadius, f = n.cornerRadius, d = n.forceCornerRadius, h = n.cornerIsExternal, y = n.startAngle, v = n.endAngle, g = n.className;
  if (c < u || y === v)
    return null;
  var b = $e("recharts-sector", g), _ = c - u, S = mi(f, _, 0, !0), x;
  return S > 0 && Math.abs(y - v) < 360 ? x = BU({
    cx: r,
    cy: o,
    innerRadius: u,
    outerRadius: c,
    cornerRadius: Math.min(S, _ / 2),
    forceCornerRadius: d,
    cornerIsExternal: h,
    startAngle: y,
    endAngle: v
  }) : x = hP({
    cx: r,
    cy: o,
    innerRadius: u,
    outerRadius: c,
    startAngle: y,
    endAngle: v
  }), /* @__PURE__ */ U.createElement("path", Zb({}, Te(n, !0), {
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
function Qb() {
  return Qb = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Qb.apply(this, arguments);
}
function oj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function lj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? oj(Object(n), !0).forEach(function(r) {
      UU(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function UU(e, t, n) {
  return t = IU(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function IU(e) {
  var t = HU(e, "string");
  return Zu(t) == "symbol" ? t : t + "";
}
function HU(e, t) {
  if (Zu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var uj = {
  curveBasisClosed: cq,
  curveBasisOpen: sq,
  curveBasis: uq,
  curveBumpX: Vz,
  curveBumpY: Fz,
  curveLinearClosed: fq,
  curveLinear: pd,
  curveMonotoneX: dq,
  curveMonotoneY: hq,
  curveNatural: pq,
  curveStep: vq,
  curveStepAfter: mq,
  curveStepBefore: yq
}, Fs = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, fu = function(t) {
  return t.x;
}, du = function(t) {
  return t.y;
}, GU = function(t, n) {
  if (Ee(t))
    return t;
  var r = "curve".concat(dd(t));
  return (r === "curveMonotone" || r === "curveBump") && n ? uj["".concat(r).concat(n === "vertical" ? "Y" : "X")] : uj[r] || pd;
}, YU = function(t) {
  var n = t.type, r = n === void 0 ? "linear" : n, o = t.points, u = o === void 0 ? [] : o, c = t.baseLine, f = t.layout, d = t.connectNulls, h = d === void 0 ? !1 : d, y = GU(r, f), v = h ? u.filter(function(S) {
    return Fs(S);
  }) : u, g;
  if (Array.isArray(c)) {
    var b = h ? c.filter(function(S) {
      return Fs(S);
    }) : c, _ = v.map(function(S, x) {
      return lj(lj({}, S), {}, {
        base: b[x]
      });
    });
    return f === "vertical" ? g = Bs().y(du).x1(fu).x0(function(S) {
      return S.base.x;
    }) : g = Bs().x(fu).y1(du).y0(function(S) {
      return S.base.y;
    }), g.defined(Fs).curve(y), g(_);
  }
  return f === "vertical" && de(c) ? g = Bs().y(du).x1(fu).x0(c) : de(c) ? g = Bs().x(fu).y1(du).y0(c) : g = xC().x(fu).y(du), g.defined(Fs).curve(y), g(v);
}, pi = function(t) {
  var n = t.className, r = t.points, o = t.path, u = t.pathRef;
  if ((!r || !r.length) && !o)
    return null;
  var c = r && r.length ? YU(t) : o;
  return /* @__PURE__ */ ee.createElement("path", Qb({}, Te(t, !1), of(t), {
    className: $e("recharts-curve", n),
    d: c,
    ref: u
  }));
}, Ng = { exports: {} }, Rg, cj;
function KU() {
  if (cj) return Rg;
  cj = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Rg = e, Rg;
}
var $g, sj;
function XU() {
  if (sj) return $g;
  sj = 1;
  var e = /* @__PURE__ */ KU();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, $g = function() {
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
  }, $g;
}
var fj;
function VU() {
  return fj || (fj = 1, Ng.exports = /* @__PURE__ */ XU()()), Ng.exports;
}
var FU = /* @__PURE__ */ VU();
const Ge = /* @__PURE__ */ tt(FU), { getOwnPropertyNames: WU, getOwnPropertySymbols: ZU } = Object, { hasOwnProperty: QU } = Object.prototype;
function zg(e, t) {
  return function(r, o, u) {
    return e(r, o, u) && t(r, o, u);
  };
}
function Ws(e) {
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
function JU(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function dj(e) {
  return WU(e).concat(ZU(e));
}
const eI = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => QU.call(e, t))
);
function Ti(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const tI = "__v", nI = "__o", rI = "_owner", { getOwnPropertyDescriptor: hj, keys: pj } = Object;
function aI(e, t) {
  return e.byteLength === t.byteLength && $f(new Uint8Array(e), new Uint8Array(t));
}
function iI(e, t, n) {
  let r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (!n.equals(e[r], t[r], r, r, e, t, n))
      return !1;
  return !0;
}
function oI(e, t) {
  return e.byteLength === t.byteLength && $f(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function lI(e, t) {
  return Ti(e.getTime(), t.getTime());
}
function uI(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function cI(e, t) {
  return e === t;
}
function vj(e, t, n) {
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
const sI = Ti;
function fI(e, t, n) {
  const r = pj(e);
  let o = r.length;
  if (pj(t).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!vP(e, t, n, r[o]))
      return !1;
  return !0;
}
function hu(e, t, n) {
  const r = dj(e);
  let o = r.length;
  if (dj(t).length !== o)
    return !1;
  let u, c, f;
  for (; o-- > 0; )
    if (u = r[o], !vP(e, t, n, u) || (c = hj(e, u), f = hj(t, u), (c || f) && (!c || !f || c.configurable !== f.configurable || c.enumerable !== f.enumerable || c.writable !== f.writable)))
      return !1;
  return !0;
}
function dI(e, t) {
  return Ti(e.valueOf(), t.valueOf());
}
function hI(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function yj(e, t, n) {
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
function $f(e, t) {
  let n = e.byteLength;
  if (t.byteLength !== n || e.byteOffset !== t.byteOffset)
    return !1;
  for (; n-- > 0; )
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function pI(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function vP(e, t, n, r) {
  return (r === rI || r === nI || r === tI) && (e.$$typeof || t.$$typeof) ? !0 : eI(t, r) && n.equals(e[r], t[r], r, r, e, t, n);
}
const vI = "[object ArrayBuffer]", yI = "[object Arguments]", mI = "[object Boolean]", gI = "[object DataView]", bI = "[object Date]", xI = "[object Error]", SI = "[object Map]", _I = "[object Number]", OI = "[object Object]", wI = "[object RegExp]", AI = "[object Set]", TI = "[object String]", EI = {
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
}, jI = "[object URL]", MI = Object.prototype.toString;
function CI({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: n, areDatesEqual: r, areErrorsEqual: o, areFunctionsEqual: u, areMapsEqual: c, areNumbersEqual: f, areObjectsEqual: d, arePrimitiveWrappersEqual: h, areRegExpsEqual: y, areSetsEqual: v, areTypedArraysEqual: g, areUrlsEqual: b, unknownTagComparators: _ }) {
  return function(x, A, T) {
    if (x === A)
      return !0;
    if (x == null || A == null)
      return !1;
    const M = typeof x;
    if (M !== typeof A)
      return !1;
    if (M !== "object")
      return M === "number" ? f(x, A, T) : M === "function" ? u(x, A, T) : !1;
    const C = x.constructor;
    if (C !== A.constructor)
      return !1;
    if (C === Object)
      return d(x, A, T);
    if (Array.isArray(x))
      return t(x, A, T);
    if (C === Date)
      return r(x, A, T);
    if (C === RegExp)
      return y(x, A, T);
    if (C === Map)
      return c(x, A, T);
    if (C === Set)
      return v(x, A, T);
    const w = MI.call(x);
    if (w === bI)
      return r(x, A, T);
    if (w === wI)
      return y(x, A, T);
    if (w === SI)
      return c(x, A, T);
    if (w === AI)
      return v(x, A, T);
    if (w === OI)
      return typeof x.then != "function" && typeof A.then != "function" && d(x, A, T);
    if (w === jI)
      return b(x, A, T);
    if (w === xI)
      return o(x, A, T);
    if (w === yI)
      return d(x, A, T);
    if (EI[w])
      return g(x, A, T);
    if (w === vI)
      return e(x, A, T);
    if (w === gI)
      return n(x, A, T);
    if (w === mI || w === _I || w === TI)
      return h(x, A, T);
    if (_) {
      let E = _[w];
      if (!E) {
        const j = JU(x);
        j && (E = _[j]);
      }
      if (E)
        return E(x, A, T);
    }
    return !1;
  };
}
function DI({ circular: e, createCustomConfig: t, strict: n }) {
  let r = {
    areArrayBuffersEqual: aI,
    areArraysEqual: n ? hu : iI,
    areDataViewsEqual: oI,
    areDatesEqual: lI,
    areErrorsEqual: uI,
    areFunctionsEqual: cI,
    areMapsEqual: n ? zg(vj, hu) : vj,
    areNumbersEqual: sI,
    areObjectsEqual: n ? hu : fI,
    arePrimitiveWrappersEqual: dI,
    areRegExpsEqual: hI,
    areSetsEqual: n ? zg(yj, hu) : yj,
    areTypedArraysEqual: n ? zg($f, hu) : $f,
    areUrlsEqual: pI,
    unknownTagComparators: void 0
  };
  if (t && (r = Object.assign({}, r, t(r))), e) {
    const o = Ws(r.areArraysEqual), u = Ws(r.areMapsEqual), c = Ws(r.areObjectsEqual), f = Ws(r.areSetsEqual);
    r = Object.assign({}, r, {
      areArraysEqual: o,
      areMapsEqual: u,
      areObjectsEqual: c,
      areSetsEqual: f
    });
  }
  return r;
}
function PI(e) {
  return function(t, n, r, o, u, c, f) {
    return e(t, n, f);
  };
}
function NI({ circular: e, comparator: t, createState: n, equals: r, strict: o }) {
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
const RI = za();
za({ strict: !0 });
za({ circular: !0 });
za({
  circular: !0,
  strict: !0
});
za({
  createInternalComparator: () => Ti
});
za({
  strict: !0,
  createInternalComparator: () => Ti
});
za({
  circular: !0,
  createInternalComparator: () => Ti
});
za({
  circular: !0,
  createInternalComparator: () => Ti,
  strict: !0
});
function za(e = {}) {
  const { circular: t = !1, createInternalComparator: n, createState: r, strict: o = !1 } = e, u = DI(e), c = CI(u), f = n ? n(c) : PI(c);
  return NI({ circular: t, comparator: c, createState: r, equals: f, strict: o });
}
function $I(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function mj(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = -1, r = function o(u) {
    n < 0 && (n = u), u - n > t ? (e(u), n = -1) : $I(o);
  };
  requestAnimationFrame(r);
}
function Jb(e) {
  "@babel/helpers - typeof";
  return Jb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jb(e);
}
function zI(e) {
  return LI(e) || BI(e) || kI(e) || qI();
}
function qI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kI(e, t) {
  if (e) {
    if (typeof e == "string") return gj(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gj(e, t);
  }
}
function gj(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function BI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function LI(e) {
  if (Array.isArray(e)) return e;
}
function UI() {
  var e = {}, t = function() {
    return null;
  }, n = !1, r = function o(u) {
    if (!n) {
      if (Array.isArray(u)) {
        if (!u.length)
          return;
        var c = u, f = zI(c), d = f[0], h = f.slice(1);
        if (typeof d == "number") {
          mj(o.bind(null, h), d);
          return;
        }
        o(d), mj(o.bind(null, h));
        return;
      }
      Jb(u) === "object" && (e = u, t(e)), typeof u == "function" && u();
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
function xj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bj(Object(n), !0).forEach(function(r) {
      yP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function yP(e, t, n) {
  return t = II(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function II(e) {
  var t = HI(e, "string");
  return Qu(t) === "symbol" ? t : String(t);
}
function HI(e, t) {
  if (Qu(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Qu(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GI = function(t, n) {
  return [Object.keys(t), Object.keys(n)].reduce(function(r, o) {
    return r.filter(function(u) {
      return o.includes(u);
    });
  });
}, YI = function(t) {
  return t;
}, KI = function(t) {
  return t.replace(/([A-Z])/g, function(n) {
    return "-".concat(n.toLowerCase());
  });
}, Ou = function(t, n) {
  return Object.keys(n).reduce(function(r, o) {
    return xj(xj({}, r), {}, yP({}, o, t(o, n[o])));
  }, {});
}, Sj = function(t, n, r) {
  return t.map(function(o) {
    return "".concat(KI(o), " ").concat(n, "ms ").concat(r);
  }).join(",");
};
function XI(e, t) {
  return WI(e) || FI(e, t) || mP(e, t) || VI();
}
function VI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function FI(e, t) {
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
function WI(e) {
  if (Array.isArray(e)) return e;
}
function ZI(e) {
  return e9(e) || JI(e) || mP(e) || QI();
}
function QI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mP(e, t) {
  if (e) {
    if (typeof e == "string") return e0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return e0(e, t);
  }
}
function JI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function e9(e) {
  if (Array.isArray(e)) return e0(e);
}
function e0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var zf = 1e-4, gP = function(t, n) {
  return [0, 3 * t, 3 * n - 6 * t, 3 * t - 3 * n + 1];
}, bP = function(t, n) {
  return t.map(function(r, o) {
    return r * Math.pow(n, o);
  }).reduce(function(r, o) {
    return r + o;
  });
}, _j = function(t, n) {
  return function(r) {
    var o = gP(t, n);
    return bP(o, r);
  };
}, t9 = function(t, n) {
  return function(r) {
    var o = gP(t, n), u = [].concat(ZI(o.map(function(c, f) {
      return c * f;
    }).slice(1)), [0]);
    return bP(u, r);
  };
}, Oj = function() {
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
          }), y = XI(h, 4);
          o = y[0], u = y[1], c = y[2], f = y[3];
        }
      }
    }
  var v = _j(o, c), g = _j(u, f), b = t9(o, c), _ = function(A) {
    return A > 1 ? 1 : A < 0 ? 0 : A;
  }, S = function(A) {
    for (var T = A > 1 ? 1 : A, M = T, C = 0; C < 8; ++C) {
      var w = v(M) - T, E = b(M);
      if (Math.abs(w - T) < zf || E < zf)
        return g(M);
      M = _(M - w / E);
    }
    return g(M);
  };
  return S.isStepper = !1, S;
}, n9 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.stiff, r = n === void 0 ? 100 : n, o = t.damping, u = o === void 0 ? 8 : o, c = t.dt, f = c === void 0 ? 17 : c, d = function(y, v, g) {
    var b = -(y - v) * r, _ = g * u, S = g + (b - _) * f / 1e3, x = g * f / 1e3 + y;
    return Math.abs(x - v) < zf && Math.abs(S) < zf ? [v, 0] : [x, S];
  };
  return d.isStepper = !0, d.dt = f, d;
}, r9 = function() {
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
        return Oj(o);
      case "spring":
        return n9();
      default:
        if (o.split("(")[0] === "cubic-bezier")
          return Oj(o);
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
function wj(e) {
  return o9(e) || i9(e) || xP(e) || a9();
}
function a9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function i9(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function o9(e) {
  if (Array.isArray(e)) return n0(e);
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
function kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Aj(Object(n), !0).forEach(function(r) {
      t0(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Aj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function t0(e, t, n) {
  return t = l9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function l9(e) {
  var t = u9(e, "string");
  return Ju(t) === "symbol" ? t : String(t);
}
function u9(e, t) {
  if (Ju(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ju(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function c9(e, t) {
  return d9(e) || f9(e, t) || xP(e, t) || s9();
}
function s9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xP(e, t) {
  if (e) {
    if (typeof e == "string") return n0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return n0(e, t);
  }
}
function n0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function f9(e, t) {
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
function d9(e) {
  if (Array.isArray(e)) return e;
}
var qf = function(t, n, r) {
  return t + (n - t) * r;
}, r0 = function(t) {
  var n = t.from, r = t.to;
  return n !== r;
}, h9 = function e(t, n, r) {
  var o = Ou(function(u, c) {
    if (r0(c)) {
      var f = t(c.from, c.to, c.velocity), d = c9(f, 2), h = d[0], y = d[1];
      return kt(kt({}, c), {}, {
        from: h,
        velocity: y
      });
    }
    return c;
  }, n);
  return r < 1 ? Ou(function(u, c) {
    return r0(c) ? kt(kt({}, c), {}, {
      velocity: qf(c.velocity, o[u].velocity, r),
      from: qf(c.from, o[u].from, r)
    }) : c;
  }, n) : e(t, o, r - 1);
};
const p9 = (function(e, t, n, r, o) {
  var u = GI(e, t), c = u.reduce(function(x, A) {
    return kt(kt({}, x), {}, t0({}, A, [e[A], t[A]]));
  }, {}), f = u.reduce(function(x, A) {
    return kt(kt({}, x), {}, t0({}, A, {
      from: e[A],
      velocity: 0,
      to: t[A]
    }));
  }, {}), d = -1, h, y, v = function() {
    return null;
  }, g = function() {
    return Ou(function(A, T) {
      return T.from;
    }, f);
  }, b = function() {
    return !Object.values(f).filter(r0).length;
  }, _ = function(A) {
    h || (h = A);
    var T = A - h, M = T / n.dt;
    f = h9(n, f, M), o(kt(kt(kt({}, e), t), g())), h = A, b() || (d = requestAnimationFrame(v));
  }, S = function(A) {
    y || (y = A);
    var T = (A - y) / r, M = Ou(function(w, E) {
      return qf.apply(void 0, wj(E).concat([n(T)]));
    }, c);
    if (o(kt(kt(kt({}, e), t), M)), T < 1)
      d = requestAnimationFrame(v);
    else {
      var C = Ou(function(w, E) {
        return qf.apply(void 0, wj(E).concat([n(1)]));
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
function Bo(e) {
  "@babel/helpers - typeof";
  return Bo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bo(e);
}
var v9 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function y9(e, t) {
  if (e == null) return {};
  var n = m9(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function m9(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, u;
  for (u = 0; u < r.length; u++)
    o = r[u], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function qg(e) {
  return S9(e) || x9(e) || b9(e) || g9();
}
function g9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b9(e, t) {
  if (e) {
    if (typeof e == "string") return a0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return a0(e, t);
  }
}
function x9(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function S9(e) {
  if (Array.isArray(e)) return a0(e);
}
function a0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
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
function Yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tj(Object(n), !0).forEach(function(r) {
      gu(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function gu(e, t, n) {
  return t = SP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function _9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function O9(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, SP(r.key), r);
  }
}
function w9(e, t, n) {
  return t && O9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function SP(e) {
  var t = A9(e, "string");
  return Bo(t) === "symbol" ? t : String(t);
}
function A9(e, t) {
  if (Bo(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Bo(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function T9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && i0(e, t);
}
function i0(e, t) {
  return i0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, i0(e, t);
}
function E9(e) {
  var t = j9();
  return function() {
    var r = kf(e), o;
    if (t) {
      var u = kf(this).constructor;
      o = Reflect.construct(r, arguments, u);
    } else
      o = r.apply(this, arguments);
    return o0(this, o);
  };
}
function o0(e, t) {
  if (t && (Bo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return l0(e);
}
function l0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function j9() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function kf(e) {
  return kf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, kf(e);
}
var Zn = /* @__PURE__ */ (function(e) {
  T9(n, e);
  var t = E9(n);
  function n(r, o) {
    var u;
    _9(this, n), u = t.call(this, r, o);
    var c = u.props, f = c.isActive, d = c.attributeName, h = c.from, y = c.to, v = c.steps, g = c.children, b = c.duration;
    if (u.handleStyleChange = u.handleStyleChange.bind(l0(u)), u.changeStyle = u.changeStyle.bind(l0(u)), !f || b <= 0)
      return u.state = {
        style: {}
      }, typeof g == "function" && (u.state = {
        style: y
      }), o0(u);
    if (v && v.length)
      u.state = {
        style: v[0].style
      };
    else if (h) {
      if (typeof g == "function")
        return u.state = {
          style: h
        }, o0(u);
      u.state = {
        style: d ? gu({}, d, h) : h
      };
    } else
      u.state = {
        style: {}
      };
    return u;
  }
  return w9(n, [{
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
        if (!(RI(o.to, y) && o.canBegin && o.isActive)) {
          var _ = !o.canBegin || !o.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var S = _ || h ? v : o.to;
          if (this.state && g) {
            var x = {
              style: d ? gu({}, d, S) : S
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
      var u = this, c = o.from, f = o.to, d = o.duration, h = o.easing, y = o.begin, v = o.onAnimationEnd, g = o.onAnimationStart, b = p9(c, f, r9(h), d, this.changeStyle), _ = function() {
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
        var T = x.duration, M = x.easing, C = M === void 0 ? "ease" : M, w = x.style, E = x.properties, j = x.onAnimationEnd, N = A > 0 ? c[A - 1] : x, R = E || Object.keys(w);
        if (typeof C == "function" || C === "spring")
          return [].concat(qg(S), [u.runJSAnimation.bind(u, {
            from: N.style,
            to: w,
            duration: T,
            easing: C
          }), T]);
        var k = Sj(R, T, C), L = Yn(Yn(Yn({}, N.style), w), {}, {
          transition: k
        });
        return [].concat(qg(S), [L, T, j]).filter(YI);
      };
      return this.manager.start([d].concat(qg(c.reduce(b, [y, Math.max(g, f)])), [o.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(o) {
      this.manager || (this.manager = UI());
      var u = o.begin, c = o.duration, f = o.attributeName, d = o.to, h = o.easing, y = o.onAnimationStart, v = o.onAnimationEnd, g = o.steps, b = o.children, _ = this.manager;
      if (this.unSubscribe = _.subscribe(this.handleStyleChange), typeof h == "function" || typeof b == "function" || h === "spring") {
        this.runJSAnimation(o);
        return;
      }
      if (g.length > 1) {
        this.runStepAnimation(o);
        return;
      }
      var S = f ? gu({}, f, d) : d, x = Sj(Object.keys(S), c, h);
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
      var d = y9(o, v9), h = ee.Children.count(u), y = this.state.style;
      if (typeof u == "function")
        return u(y);
      if (!f || h === 0 || c <= 0)
        return u;
      var v = function(b) {
        var _ = b.props, S = _.style, x = S === void 0 ? {} : S, A = _.className, T = /* @__PURE__ */ ee.cloneElement(b, Yn(Yn({}, d), {}, {
          style: Yn(Yn({}, x), y),
          className: A
        }));
        return T;
      };
      return h === 1 ? v(ee.Children.only(u)) : /* @__PURE__ */ U.createElement("div", null, ee.Children.map(u, function(g) {
        return v(g);
      }));
    }
  }]), n;
})(ee.PureComponent);
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
function Bf() {
  return Bf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Bf.apply(this, arguments);
}
function M9(e, t) {
  return N9(e) || P9(e, t) || D9(e, t) || C9();
}
function C9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function D9(e, t) {
  if (e) {
    if (typeof e == "string") return Ej(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ej(e, t);
  }
}
function Ej(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function P9(e, t) {
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
function N9(e) {
  if (Array.isArray(e)) return e;
}
function jj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Mj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jj(Object(n), !0).forEach(function(r) {
      R9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jj(Object(n)).forEach(function(r) {
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
  return ec(t) == "symbol" ? t : t + "";
}
function z9(e, t) {
  if (ec(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ec(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cj = function(t, n, r, o, u) {
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
}, q9 = function(t, n) {
  if (!t || !n)
    return !1;
  var r = t.x, o = t.y, u = n.x, c = n.y, f = n.width, d = n.height;
  if (Math.abs(f) > 0 && Math.abs(d) > 0) {
    var h = Math.min(u, u + f), y = Math.max(u, u + f), v = Math.min(c, c + d), g = Math.max(c, c + d);
    return r >= h && r <= y && o >= v && o <= g;
  }
  return !1;
}, k9 = {
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
}, N1 = function(t) {
  var n = Mj(Mj({}, k9), t), r = ee.useRef(), o = ee.useState(-1), u = M9(o, 2), c = u[0], f = u[1];
  ee.useEffect(function() {
    if (r.current && r.current.getTotalLength)
      try {
        var C = r.current.getTotalLength();
        C && f(C);
      } catch {
      }
  }, []);
  var d = n.x, h = n.y, y = n.width, v = n.height, g = n.radius, b = n.className, _ = n.animationEasing, S = n.animationDuration, x = n.animationBegin, A = n.isAnimationActive, T = n.isUpdateAnimationActive;
  if (d !== +d || h !== +h || y !== +y || v !== +v || y === 0 || v === 0)
    return null;
  var M = $e("recharts-rectangle", b);
  return T ? /* @__PURE__ */ U.createElement(Zn, {
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
    isActive: T
  }, function(C) {
    var w = C.width, E = C.height, j = C.x, N = C.y;
    return /* @__PURE__ */ U.createElement(Zn, {
      canBegin: c > 0,
      from: "0px ".concat(c === -1 ? 1 : c, "px"),
      to: "".concat(c, "px 0px"),
      attributeName: "strokeDasharray",
      begin: x,
      duration: S,
      isActive: A,
      easing: _
    }, /* @__PURE__ */ U.createElement("path", Bf({}, Te(n, !0), {
      className: M,
      d: Cj(j, N, w, E, g),
      ref: r
    })));
  }) : /* @__PURE__ */ U.createElement("path", Bf({}, Te(n, !0), {
    className: M,
    d: Cj(d, h, y, v, g)
  }));
};
function u0() {
  return u0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, u0.apply(this, arguments);
}
var Cd = function(t) {
  var n = t.cx, r = t.cy, o = t.r, u = t.className, c = $e("recharts-dot", u);
  return n === +n && r === +r && o === +o ? /* @__PURE__ */ ee.createElement("circle", u0({}, Te(t, !1), of(t), {
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
var B9 = ["x", "y", "top", "left", "width", "height", "className"];
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
function L9(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dj(Object(n), !0).forEach(function(r) {
      U9(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function U9(e, t, n) {
  return t = I9(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function I9(e) {
  var t = H9(e, "string");
  return tc(t) == "symbol" ? t : t + "";
}
function H9(e, t) {
  if (tc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (tc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function G9(e, t) {
  if (e == null) return {};
  var n = Y9(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Y9(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var K9 = function(t, n, r, o, u, c) {
  return "M".concat(t, ",").concat(u, "v").concat(o, "M").concat(c, ",").concat(n, "h").concat(r);
}, X9 = function(t) {
  var n = t.x, r = n === void 0 ? 0 : n, o = t.y, u = o === void 0 ? 0 : o, c = t.top, f = c === void 0 ? 0 : c, d = t.left, h = d === void 0 ? 0 : d, y = t.width, v = y === void 0 ? 0 : y, g = t.height, b = g === void 0 ? 0 : g, _ = t.className, S = G9(t, B9), x = L9({
    x: r,
    y: u,
    top: f,
    left: h,
    width: v,
    height: b
  }, S);
  return !de(r) || !de(u) || !de(v) || !de(b) || !de(f) || !de(h) ? null : /* @__PURE__ */ U.createElement("path", c0({}, Te(x, !0), {
    className: $e("recharts-cross", _),
    d: K9(r, u, v, b, f, h)
  }));
}, kg, Pj;
function V9() {
  if (Pj) return kg;
  Pj = 1;
  var e = HC(), t = e(Object.getPrototypeOf, Object);
  return kg = t, kg;
}
var Bg, Nj;
function F9() {
  if (Nj) return Bg;
  Nj = 1;
  var e = Xr(), t = V9(), n = Vr(), r = "[object Object]", o = Function.prototype, u = Object.prototype, c = o.toString, f = u.hasOwnProperty, d = c.call(Object);
  function h(y) {
    if (!n(y) || e(y) != r)
      return !1;
    var v = t(y);
    if (v === null)
      return !0;
    var g = f.call(v, "constructor") && v.constructor;
    return typeof g == "function" && g instanceof g && c.call(g) == d;
  }
  return Bg = h, Bg;
}
var W9 = F9();
const Z9 = /* @__PURE__ */ tt(W9);
var Lg, Rj;
function Q9() {
  if (Rj) return Lg;
  Rj = 1;
  var e = Xr(), t = Vr(), n = "[object Boolean]";
  function r(o) {
    return o === !0 || o === !1 || t(o) && e(o) == n;
  }
  return Lg = r, Lg;
}
var J9 = Q9();
const eH = /* @__PURE__ */ tt(J9);
function nc(e) {
  "@babel/helpers - typeof";
  return nc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nc(e);
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
function tH(e, t) {
  return iH(e) || aH(e, t) || rH(e, t) || nH();
}
function nH() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rH(e, t) {
  if (e) {
    if (typeof e == "string") return $j(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $j(e, t);
  }
}
function $j(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function aH(e, t) {
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
function iH(e) {
  if (Array.isArray(e)) return e;
}
function zj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function qj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zj(Object(n), !0).forEach(function(r) {
      oH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function oH(e, t, n) {
  return t = lH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function lH(e) {
  var t = uH(e, "string");
  return nc(t) == "symbol" ? t : t + "";
}
function uH(e, t) {
  if (nc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (nc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kj = function(t, n, r, o, u) {
  var c = r - o, f;
  return f = "M ".concat(t, ",").concat(n), f += "L ".concat(t + r, ",").concat(n), f += "L ".concat(t + r - c / 2, ",").concat(n + u), f += "L ".concat(t + r - c / 2 - o, ",").concat(n + u), f += "L ".concat(t, ",").concat(n, " Z"), f;
}, cH = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, sH = function(t) {
  var n = qj(qj({}, cH), t), r = ee.useRef(), o = ee.useState(-1), u = tH(o, 2), c = u[0], f = u[1];
  ee.useEffect(function() {
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
  var T = $e("recharts-trapezoid", b);
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
    var C = M.upperWidth, w = M.lowerWidth, E = M.height, j = M.x, N = M.y;
    return /* @__PURE__ */ U.createElement(Zn, {
      canBegin: c > 0,
      from: "0px ".concat(c === -1 ? 1 : c, "px"),
      to: "".concat(c, "px 0px"),
      attributeName: "strokeDasharray",
      begin: x,
      duration: S,
      easing: _
    }, /* @__PURE__ */ U.createElement("path", Lf({}, Te(n, !0), {
      className: T,
      d: kj(j, N, C, w, E),
      ref: r
    })));
  }) : /* @__PURE__ */ U.createElement("g", null, /* @__PURE__ */ U.createElement("path", Lf({}, Te(n, !0), {
    className: T,
    d: kj(d, h, y, v, g)
  })));
}, fH = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function rc(e) {
  "@babel/helpers - typeof";
  return rc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rc(e);
}
function dH(e, t) {
  if (e == null) return {};
  var n = hH(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function hH(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
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
function Uf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bj(Object(n), !0).forEach(function(r) {
      pH(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Bj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function pH(e, t, n) {
  return t = vH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function vH(e) {
  var t = yH(e, "string");
  return rc(t) == "symbol" ? t : t + "";
}
function yH(e, t) {
  if (rc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (rc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function mH(e, t) {
  return Uf(Uf({}, t), e);
}
function gH(e, t) {
  return e === "symbols";
}
function Lj(e) {
  var t = e.shapeType, n = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ U.createElement(N1, n);
    case "trapezoid":
      return /* @__PURE__ */ U.createElement(sH, n);
    case "sector":
      return /* @__PURE__ */ U.createElement(pP, n);
    case "symbols":
      if (gH(t))
        return /* @__PURE__ */ U.createElement(yd, n);
      break;
    default:
      return null;
  }
}
function bH(e) {
  return /* @__PURE__ */ ee.isValidElement(e) ? e.props : e;
}
function s0(e) {
  var t = e.option, n = e.shapeType, r = e.propTransformer, o = r === void 0 ? mH : r, u = e.activeClassName, c = u === void 0 ? "recharts-active-shape" : u, f = e.isActive, d = dH(e, fH), h;
  if (/* @__PURE__ */ ee.isValidElement(t))
    h = /* @__PURE__ */ ee.cloneElement(t, Uf(Uf({}, d), bH(t)));
  else if (Ee(t))
    h = t(d);
  else if (Z9(t) && !eH(t)) {
    var y = o(t, d);
    h = /* @__PURE__ */ U.createElement(Lj, {
      shapeType: n,
      elementProps: y
    });
  } else {
    var v = d;
    h = /* @__PURE__ */ U.createElement(Lj, {
      shapeType: n,
      elementProps: v
    });
  }
  return f ? /* @__PURE__ */ U.createElement(Ie, {
    className: c
  }, h) : h;
}
function Dd(e, t) {
  return t != null && "trapezoids" in e.props;
}
function Pd(e, t) {
  return t != null && "sectors" in e.props;
}
function ac(e, t) {
  return t != null && "points" in e.props;
}
function xH(e, t) {
  var n, r, o = e.x === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.x) || e.x === t.x, u = e.y === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.y) || e.y === t.y;
  return o && u;
}
function SH(e, t) {
  var n = e.endAngle === t.endAngle, r = e.startAngle === t.startAngle;
  return n && r;
}
function _H(e, t) {
  var n = e.x === t.x, r = e.y === t.y, o = e.z === t.z;
  return n && r && o;
}
function OH(e, t) {
  var n;
  return Dd(e, t) ? n = xH : Pd(e, t) ? n = SH : ac(e, t) && (n = _H), n;
}
function wH(e, t) {
  var n;
  return Dd(e, t) ? n = "trapezoids" : Pd(e, t) ? n = "sectors" : ac(e, t) && (n = "points"), n;
}
function AH(e, t) {
  if (Dd(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  if (Pd(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  return ac(e, t) ? t.payload : {};
}
function TH(e) {
  var t = e.activeTooltipItem, n = e.graphicalItem, r = e.itemData, o = wH(n, t), u = AH(n, t), c = r.filter(function(d, h) {
    var y = gi(u, d), v = n.props[o].filter(function(_) {
      var S = OH(n, t);
      return S(_, t);
    }), g = n.props[o].indexOf(v[v.length - 1]), b = h === g;
    return y && b;
  }), f = r.indexOf(c[c.length - 1]);
  return f;
}
var Ug, Uj;
function EH() {
  if (Uj) return Ug;
  Uj = 1;
  var e = Math.ceil, t = Math.max;
  function n(r, o, u, c) {
    for (var f = -1, d = t(e((o - r) / (u || 1)), 0), h = Array(d); d--; )
      h[c ? d : ++f] = r, r += u;
    return h;
  }
  return Ug = n, Ug;
}
var Ig, Ij;
function _P() {
  if (Ij) return Ig;
  Ij = 1;
  var e = iD(), t = 1 / 0, n = 17976931348623157e292;
  function r(o) {
    if (!o)
      return o === 0 ? o : 0;
    if (o = e(o), o === t || o === -t) {
      var u = o < 0 ? -1 : 1;
      return u * n;
    }
    return o === o ? o : 0;
  }
  return Ig = r, Ig;
}
var Hg, Hj;
function jH() {
  if (Hj) return Hg;
  Hj = 1;
  var e = EH(), t = bd(), n = _P();
  function r(o) {
    return function(u, c, f) {
      return f && typeof f != "number" && t(u, c, f) && (c = f = void 0), u = n(u), c === void 0 ? (c = u, u = 0) : c = n(c), f = f === void 0 ? u < c ? 1 : -1 : n(f), e(u, c, f, o);
    };
  }
  return Hg = r, Hg;
}
var Gg, Gj;
function MH() {
  if (Gj) return Gg;
  Gj = 1;
  var e = jH(), t = e();
  return Gg = t, Gg;
}
var CH = MH();
const If = /* @__PURE__ */ tt(CH);
function ic(e) {
  "@babel/helpers - typeof";
  return ic = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ic(e);
}
function Yj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Kj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yj(Object(n), !0).forEach(function(r) {
      OP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function OP(e, t, n) {
  return t = DH(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function DH(e) {
  var t = PH(e, "string");
  return ic(t) == "symbol" ? t : t + "";
}
function PH(e, t) {
  if (ic(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ic(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var NH = ["Webkit", "Moz", "O", "ms"], RH = function(t, n) {
  var r = t.replace(/(\w)/, function(u) {
    return u.toUpperCase();
  }), o = NH.reduce(function(u, c) {
    return Kj(Kj({}, u), {}, OP({}, c + r, n));
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
function Xj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Yg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xj(Object(n), !0).forEach(function(r) {
      bn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Xj(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $H(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Vj(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, AP(r.key), r);
  }
}
function zH(e, t, n) {
  return t && Vj(e.prototype, t), n && Vj(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qH(e, t, n) {
  return t = Gf(t), kH(e, wP() ? Reflect.construct(t, n || [], Gf(e).constructor) : t.apply(e, n));
}
function kH(e, t) {
  if (t && (Lo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return BH(e);
}
function BH(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function wP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (wP = function() {
    return !!e;
  })();
}
function Gf(e) {
  return Gf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Gf(e);
}
function LH(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && f0(e, t);
}
function f0(e, t) {
  return f0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, f0(e, t);
}
function bn(e, t, n) {
  return t = AP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function AP(e) {
  var t = UH(e, "string");
  return Lo(t) == "symbol" ? t : t + "";
}
function UH(e, t) {
  if (Lo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Lo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var IH = function(t) {
  var n = t.data, r = t.startIndex, o = t.endIndex, u = t.x, c = t.width, f = t.travellerWidth;
  if (!n || !n.length)
    return {};
  var d = n.length, h = Su().domain(If(0, d)).range([u, u + c - f]), y = h.domain().map(function(v) {
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
}, Fj = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, Uo = /* @__PURE__ */ (function(e) {
  function t(n) {
    var r;
    return $H(this, t), r = qH(this, t, [n]), bn(r, "handleDrag", function(o) {
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
      var u = Fj(o) ? o.changedTouches[0] : o;
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
  return LH(t, e), zH(t, [{
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
      var u = Fj(o) ? o.changedTouches[0] : o;
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
      }, T = r.pageX - u;
      T > 0 ? T = Math.min(T, v + g - b - h) : T < 0 && (T = Math.max(T, v - h)), A[c] = h + T;
      var M = this.getIndex(A), C = M.startIndex, w = M.endIndex, E = function() {
        var N = x.length - 1;
        return c === "startX" && (f > d ? C % S === 0 : w % S === 0) || f < d && w === N || c === "endX" && (f > d ? w % S === 0 : C % S === 0) || f > d && w === N;
      };
      this.setState(bn(bn({}, c, h + T), "brushMoveStartX", r.pageX), function() {
        _ && E() && _(M);
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
      var r = this.props, o = r.x, u = r.y, c = r.width, f = r.height, d = r.data, h = r.children, y = r.padding, v = ee.Children.only(h);
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
      var u, c, f = this, d = this.props, h = d.y, y = d.travellerWidth, v = d.height, g = d.traveller, b = d.ariaLabel, _ = d.data, S = d.startIndex, x = d.endIndex, A = Math.max(r, this.props.x), T = Yg(Yg({}, Te(this.props, !1)), {}, {
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
      }, t.renderTraveller(g, T));
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
      }, /* @__PURE__ */ U.createElement(mf, Hf({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(v, g) - b,
        y: c + f / 2
      }, _), this.getTextOfTick(o)), /* @__PURE__ */ U.createElement(mf, Hf({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(v, g) + d + b,
        y: c + f / 2
      }, _), this.getTextOfTick(u)));
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props, o = r.data, u = r.className, c = r.children, f = r.x, d = r.y, h = r.width, y = r.height, v = r.alwaysShowText, g = this.state, b = g.startX, _ = g.endX, S = g.isTextActive, x = g.isSlideMoving, A = g.isTravellerMoving, T = g.isTravellerFocused;
      if (!o || !o.length || !de(f) || !de(d) || !de(h) || !de(y) || h <= 0 || y <= 0)
        return null;
      var M = $e("recharts-brush", u), C = U.Children.count(c) === 1, w = RH("userSelect", "none");
      return /* @__PURE__ */ U.createElement(Ie, {
        className: M,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: w
      }, this.renderBackground(), C && this.renderPanorama(), this.renderSlide(b, _), this.renderTravellerLayer(b, "startX"), this.renderTravellerLayer(_, "endX"), (S || x || A || T || v) && this.renderText());
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
        return Yg({
          prevData: u,
          prevTravellerWidth: d,
          prevUpdateId: h,
          prevX: f,
          prevWidth: c
        }, u && u.length ? IH({
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
})(ee.PureComponent);
bn(Uo, "displayName", "Brush");
bn(Uo, "defaultProps", {
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
var Kg, Wj;
function HH() {
  if (Wj) return Kg;
  Wj = 1;
  var e = i1();
  function t(n, r) {
    var o;
    return e(n, function(u, c, f) {
      return o = r(u, c, f), !o;
    }), !!o;
  }
  return Kg = t, Kg;
}
var Xg, Zj;
function GH() {
  if (Zj) return Xg;
  Zj = 1;
  var e = zC(), t = Pa(), n = HH(), r = ln(), o = bd();
  function u(c, f, d) {
    var h = r(c) ? e : n;
    return d && o(c, f, d) && (f = void 0), h(c, t(f, 3));
  }
  return Xg = u, Xg;
}
var YH = GH();
const KH = /* @__PURE__ */ tt(YH);
var hr = function(t, n) {
  var r = t.alwaysShow, o = t.ifOverflow;
  return r && (o = "extendDomain"), o === n;
}, Vg, Qj;
function XH() {
  if (Qj) return Vg;
  Qj = 1;
  var e = eD();
  function t(n, r, o) {
    r == "__proto__" && e ? e(n, r, {
      configurable: !0,
      enumerable: !0,
      value: o,
      writable: !0
    }) : n[r] = o;
  }
  return Vg = t, Vg;
}
var Fg, Jj;
function VH() {
  if (Jj) return Fg;
  Jj = 1;
  var e = XH(), t = QC(), n = Pa();
  function r(o, u) {
    var c = {};
    return u = n(u, 3), t(o, function(f, d, h) {
      e(c, d, u(f, d, h));
    }), c;
  }
  return Fg = r, Fg;
}
var FH = VH();
const WH = /* @__PURE__ */ tt(FH);
var Wg, eM;
function ZH() {
  if (eM) return Wg;
  eM = 1;
  function e(t, n) {
    for (var r = -1, o = t == null ? 0 : t.length; ++r < o; )
      if (!n(t[r], r, t))
        return !1;
    return !0;
  }
  return Wg = e, Wg;
}
var Zg, tM;
function QH() {
  if (tM) return Zg;
  tM = 1;
  var e = i1();
  function t(n, r) {
    var o = !0;
    return e(n, function(u, c, f) {
      return o = !!r(u, c, f), o;
    }), o;
  }
  return Zg = t, Zg;
}
var Qg, nM;
function JH() {
  if (nM) return Qg;
  nM = 1;
  var e = ZH(), t = QH(), n = Pa(), r = ln(), o = bd();
  function u(c, f, d) {
    var h = r(c) ? e : t;
    return d && o(c, f, d) && (f = void 0), h(c, n(f, 3));
  }
  return Qg = u, Qg;
}
var e7 = JH();
const TP = /* @__PURE__ */ tt(e7);
var t7 = ["x", "y"];
function oc(e) {
  "@babel/helpers - typeof";
  return oc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oc(e);
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
function pu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rM(Object(n), !0).forEach(function(r) {
      n7(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : rM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function n7(e, t, n) {
  return t = r7(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function r7(e) {
  var t = a7(e, "string");
  return oc(t) == "symbol" ? t : t + "";
}
function a7(e, t) {
  if (oc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (oc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
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
function l7(e, t) {
  var n = e.x, r = e.y, o = i7(e, t7), u = "".concat(n), c = parseInt(u, 10), f = "".concat(r), d = parseInt(f, 10), h = "".concat(t.height || o.height), y = parseInt(h, 10), v = "".concat(t.width || o.width), g = parseInt(v, 10);
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
function aM(e) {
  return /* @__PURE__ */ U.createElement(s0, d0({
    shapeType: "rectangle",
    propTransformer: l7,
    activeClassName: "recharts-active-bar"
  }, e));
}
var u7 = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(r, o) {
    if (typeof t == "number") return t;
    var u = de(r) || vz(r);
    return u ? t(r, o) : (u || xi(), n);
  };
}, c7 = ["value", "background"], EP;
function Io(e) {
  "@babel/helpers - typeof";
  return Io = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Io(e);
}
function s7(e, t) {
  if (e == null) return {};
  var n = f7(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function f7(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Yf() {
  return Yf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Yf.apply(this, arguments);
}
function iM(e, t) {
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
    t % 2 ? iM(Object(n), !0).forEach(function(r) {
      ja(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : iM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function d7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, MP(r.key), r);
  }
}
function h7(e, t, n) {
  return t && oM(e.prototype, t), n && oM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function p7(e, t, n) {
  return t = Kf(t), v7(e, jP() ? Reflect.construct(t, n || [], Kf(e).constructor) : t.apply(e, n));
}
function v7(e, t) {
  if (t && (Io(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return y7(e);
}
function y7(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function jP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (jP = function() {
    return !!e;
  })();
}
function Kf(e) {
  return Kf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Kf(e);
}
function m7(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && h0(e, t);
}
function h0(e, t) {
  return h0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, h0(e, t);
}
function ja(e, t, n) {
  return t = MP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function MP(e) {
  var t = g7(e, "string");
  return Io(t) == "symbol" ? t : t + "";
}
function g7(e, t) {
  if (Io(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Io(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Kr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    d7(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = p7(this, t, [].concat(o)), ja(n, "state", {
      isAnimationFinished: !1
    }), ja(n, "id", Oi("recharts-bar-")), ja(n, "handleAnimationEnd", function() {
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
  return m7(t, e), h7(t, [{
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
        return /* @__PURE__ */ U.createElement(Ie, Yf({
          className: "recharts-bar-rectangle"
        }, Mu(o.props, v, g), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(v == null ? void 0 : v.x, "-").concat(v == null ? void 0 : v.y, "-").concat(v == null ? void 0 : v.value, "-").concat(g)
        }), /* @__PURE__ */ U.createElement(aM, S));
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
          var T = g && g[A];
          if (T) {
            var M = pt(T.x, x.x), C = pt(T.y, x.y), w = pt(T.width, x.width), E = pt(T.height, x.height);
            return bt(bt({}, x), {}, {
              x: M(_),
              y: C(_),
              width: w(_),
              height: E(_)
            });
          }
          if (c === "horizontal") {
            var j = pt(0, x.height), N = j(_);
            return bt(bt({}, x), {}, {
              y: x.y + x.height - N,
              height: N
            });
          }
          var R = pt(0, x.width), k = R(_);
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
      return u && o && o.length && (!c || !gi(c, o)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(o);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var r = this, o = this.props, u = o.data, c = o.dataKey, f = o.activeIndex, d = Te(this.props.background, !1);
      return u.map(function(h, y) {
        h.value;
        var v = h.background, g = s7(h, c7);
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
        return /* @__PURE__ */ U.createElement(aM, Yf({
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
      var u = this.props, c = u.data, f = u.xAxis, d = u.yAxis, h = u.layout, y = u.children, v = on(y, sl);
      if (!v)
        return null;
      var g = h === "vertical" ? c[0].height / 2 : c[0].width / 2, b = function(x, A) {
        var T = Array.isArray(x.value) ? x.value[1] : x.value;
        return {
          x: x.x,
          y: x.y,
          value: T,
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
      var x = this.state.isAnimationFinished, A = $e("recharts-bar", c), T = f && f.allowDataOverflow, M = d && d.allowDataOverflow, C = T || M, w = we(S) ? this.id : S;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: A
      }, T || M ? /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-".concat(w)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: T ? h : h - v / 2,
        y: M ? y : y - g / 2,
        width: T ? v : v * 2,
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
})(ee.PureComponent);
EP = Kr;
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
  var t = e.props, n = e.item, r = e.barPosition, o = e.bandSize, u = e.xAxis, c = e.yAxis, f = e.xAxisTicks, d = e.yAxisTicks, h = e.stackedData, y = e.dataStartIndex, v = e.displayedData, g = e.offset, b = RL(r, n);
  if (!b)
    return null;
  var _ = t.layout, S = n.type.defaultProps, x = S !== void 0 ? bt(bt({}, S), n.props) : n.props, A = x.dataKey, T = x.children, M = x.minPointSize, C = _ === "horizontal" ? c : u, w = h ? C.scale.domain() : null, E = IL({
    numericAxis: C
  }), j = on(T, xd), N = v.map(function(R, k) {
    var L, q, V, Y, F, z;
    h ? L = $L(h[y + k], w) : (L = At(R, A), Array.isArray(L) || (L = [E, L]));
    var K = u7(M, EP.defaultProps.minPointSize)(L[1], k);
    if (_ === "horizontal") {
      var ne, G = [c.scale(L[0]), c.scale(L[1])], J = G[0], P = G[1];
      q = K2({
        axis: u,
        ticks: f,
        bandSize: o,
        offset: b.offset,
        entry: R,
        index: k
      }), V = (ne = P ?? J) !== null && ne !== void 0 ? ne : void 0, Y = b.size;
      var I = J - P;
      if (F = Number.isNaN(I) ? 0 : I, z = {
        x: q,
        y: c.y,
        width: Y,
        height: c.height
      }, Math.abs(K) > 0 && Math.abs(F) < Math.abs(K)) {
        var re = Wn(F || K) * (Math.abs(K) - Math.abs(F));
        V -= re, F += re;
      }
    } else {
      var se = [u.scale(L[0]), u.scale(L[1])], pe = se[0], fe = se[1];
      if (q = pe, V = K2({
        axis: c,
        ticks: d,
        bandSize: o,
        offset: b.offset,
        entry: R,
        index: k
      }), Y = fe - pe, F = b.size, z = {
        x: u.x,
        y: V,
        width: u.width,
        height: F
      }, Math.abs(K) > 0 && Math.abs(Y) < Math.abs(K)) {
        var _e = Wn(Y || K) * (Math.abs(K) - Math.abs(Y));
        Y += _e;
      }
    }
    return bt(bt(bt({}, R), {}, {
      x: q,
      y: V,
      width: Y,
      height: F,
      value: h ? L : L[1],
      payload: R,
      background: z
    }, j && j[k] && j[k].props), {}, {
      tooltipPayload: [fP(n, R)],
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
function b7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, CP(r.key), r);
  }
}
function x7(e, t, n) {
  return t && lM(e.prototype, t), n && lM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
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
function Kn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uM(Object(n), !0).forEach(function(r) {
      Nd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : uM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Nd(e, t, n) {
  return t = CP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function CP(e) {
  var t = S7(e, "string");
  return lc(t) == "symbol" ? t : t + "";
}
function S7(e, t) {
  if (lc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (lc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rd = function(t, n, r, o, u) {
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
    var S = n[_], x = S.orientation, A = S.domain, T = S.padding, M = T === void 0 ? {} : T, C = S.mirror, w = S.reversed, E = "".concat(x).concat(C ? "Mirror" : ""), j, N, R, k, L;
    if (S.type === "number" && (S.padding === "gap" || S.padding === "no-gap")) {
      var q = A[1] - A[0], V = 1 / 0, Y = S.categoricalDomain.sort(bz);
      if (Y.forEach(function(se, pe) {
        pe > 0 && (V = Math.min((se || 0) - (Y[pe - 1] || 0), V));
      }), Number.isFinite(V)) {
        var F = V / q, z = S.layout === "vertical" ? r.height : r.width;
        if (S.padding === "gap" && (j = F * z / 2), S.padding === "no-gap") {
          var K = mi(t.barCategoryGap, F * z), ne = F * z / 2;
          j = ne - K - (ne - K) / z * K;
        }
      }
    }
    o === "xAxis" ? N = [r.left + (M.left || 0) + (j || 0), r.left + r.width - (M.right || 0) - (j || 0)] : o === "yAxis" ? N = d === "horizontal" ? [r.top + r.height - (M.bottom || 0), r.top + (M.top || 0)] : [r.top + (M.top || 0) + (j || 0), r.top + r.height - (M.bottom || 0) - (j || 0)] : N = S.range, w && (N = [N[1], N[0]]);
    var G = PL(S, u, g), J = G.scale, P = G.realScaleType;
    J.domain(A).range(N), NL(J);
    var I = UL(J, Kn(Kn({}, S), {}, {
      realScaleType: P
    }));
    o === "xAxis" ? (L = x === "top" && !C || x === "bottom" && C, R = r.left, k = v[E] - L * S.height) : o === "yAxis" && (L = x === "left" && !C || x === "right" && C, R = v[E] - L * S.width, k = r.top);
    var re = Kn(Kn(Kn({}, S), I), {}, {
      realScaleType: P,
      x: R,
      y: k,
      scale: J,
      width: o === "xAxis" ? r.width : S.width,
      height: o === "yAxis" ? r.height : S.height
    });
    return re.bandSize = Pf(re, I), !S.hide && o === "xAxis" ? v[E] += (L ? -1 : 1) * re.height : S.hide || (v[E] += (L ? -1 : 1) * re.width), Kn(Kn({}, b), {}, Nd({}, _, re));
  }, {});
}, DP = function(t, n) {
  var r = t.x, o = t.y, u = n.x, c = n.y;
  return {
    x: Math.min(r, u),
    y: Math.min(o, c),
    width: Math.abs(u - r),
    height: Math.abs(c - o)
  };
}, _7 = function(t) {
  var n = t.x1, r = t.y1, o = t.x2, u = t.y2;
  return DP({
    x: n,
    y: r
  }, {
    x: o,
    y: u
  });
}, PP = /* @__PURE__ */ (function() {
  function e(t) {
    b7(this, e), this.scale = t;
  }
  return x7(e, [{
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
Nd(PP, "EPS", 1e-4);
var R1 = function(t) {
  var n = Object.keys(t).reduce(function(r, o) {
    return Kn(Kn({}, r), {}, Nd({}, o, PP.create(t[o])));
  }, {});
  return Kn(Kn({}, n), {}, {
    apply: function(o) {
      var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = u.bandAware, f = u.position;
      return WH(o, function(d, h) {
        return n[h].apply(d, {
          bandAware: c,
          position: f
        });
      });
    },
    isInRange: function(o) {
      return TP(o, function(u, c) {
        return n[c].isInRange(u);
      });
    }
  });
};
function O7(e) {
  return (e % 180 + 180) % 180;
}
var w7 = function(t) {
  var n = t.width, r = t.height, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, u = O7(o), c = u * Math.PI / 180, f = Math.atan(r / n), d = c > f && c < Math.PI - f ? r / Math.sin(c) : n / Math.cos(c);
  return Math.abs(d);
}, Jg, cM;
function A7() {
  if (cM) return Jg;
  cM = 1;
  var e = Pa(), t = pc(), n = md();
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
  return Jg = r, Jg;
}
var eb, sM;
function T7() {
  if (sM) return eb;
  sM = 1;
  var e = _P();
  function t(n) {
    var r = e(n), o = r % 1;
    return r === r ? o ? r - o : r : 0;
  }
  return eb = t, eb;
}
var tb, fM;
function E7() {
  if (fM) return tb;
  fM = 1;
  var e = XC(), t = Pa(), n = T7(), r = Math.max;
  function o(u, c, f) {
    var d = u == null ? 0 : u.length;
    if (!d)
      return -1;
    var h = f == null ? 0 : n(f);
    return h < 0 && (h = r(d + h, 0)), e(u, t(c, 3), h);
  }
  return tb = o, tb;
}
var nb, dM;
function j7() {
  if (dM) return nb;
  dM = 1;
  var e = A7(), t = E7(), n = e(t);
  return nb = n, nb;
}
var M7 = j7();
const C7 = /* @__PURE__ */ tt(M7);
var D7 = uC();
const P7 = /* @__PURE__ */ tt(D7);
var N7 = P7(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
}), $1 = /* @__PURE__ */ ee.createContext(void 0), z1 = /* @__PURE__ */ ee.createContext(void 0), NP = /* @__PURE__ */ ee.createContext(void 0), RP = /* @__PURE__ */ ee.createContext({}), $P = /* @__PURE__ */ ee.createContext(void 0), zP = /* @__PURE__ */ ee.createContext(0), qP = /* @__PURE__ */ ee.createContext(0), hM = function(t) {
  var n = t.state, r = n.xAxisMap, o = n.yAxisMap, u = n.offset, c = t.clipPathId, f = t.children, d = t.width, h = t.height, y = N7(u);
  return /* @__PURE__ */ U.createElement($1.Provider, {
    value: r
  }, /* @__PURE__ */ U.createElement(z1.Provider, {
    value: o
  }, /* @__PURE__ */ U.createElement(RP.Provider, {
    value: u
  }, /* @__PURE__ */ U.createElement(NP.Provider, {
    value: y
  }, /* @__PURE__ */ U.createElement($P.Provider, {
    value: c
  }, /* @__PURE__ */ U.createElement(zP.Provider, {
    value: h
  }, /* @__PURE__ */ U.createElement(qP.Provider, {
    value: d
  }, f)))))));
}, R7 = function() {
  return ee.useContext($P);
}, kP = function(t) {
  var n = ee.useContext($1);
  n == null && xi();
  var r = n[t];
  return r == null && xi(), r;
}, $7 = function() {
  var t = ee.useContext($1);
  return Ta(t);
}, z7 = function() {
  var t = ee.useContext(z1), n = C7(t, function(r) {
    return TP(r.domain, Number.isFinite);
  });
  return n || Ta(t);
}, BP = function(t) {
  var n = ee.useContext(z1);
  n == null && xi();
  var r = n[t];
  return r == null && xi(), r;
}, q7 = function() {
  var t = ee.useContext(NP);
  return t;
}, k7 = function() {
  return ee.useContext(RP);
}, q1 = function() {
  return ee.useContext(qP);
}, k1 = function() {
  return ee.useContext(zP);
};
function Ho(e) {
  "@babel/helpers - typeof";
  return Ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ho(e);
}
function B7(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function L7(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, UP(r.key), r);
  }
}
function U7(e, t, n) {
  return t && L7(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function I7(e, t, n) {
  return t = Xf(t), H7(e, LP() ? Reflect.construct(t, n || [], Xf(e).constructor) : t.apply(e, n));
}
function H7(e, t) {
  if (t && (Ho(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return G7(e);
}
function G7(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function LP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (LP = function() {
    return !!e;
  })();
}
function Xf(e) {
  return Xf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Xf(e);
}
function Y7(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && p0(e, t);
}
function p0(e, t) {
  return p0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, p0(e, t);
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
      B1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function B1(e, t, n) {
  return t = UP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function UP(e) {
  var t = K7(e, "string");
  return Ho(t) == "symbol" ? t : t + "";
}
function K7(e, t) {
  if (Ho(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ho(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function X7(e, t) {
  return Z7(e) || W7(e, t) || F7(e, t) || V7();
}
function V7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function F7(e, t) {
  if (e) {
    if (typeof e == "string") return yM(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return yM(e, t);
  }
}
function yM(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function W7(e, t) {
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
function Z7(e) {
  if (Array.isArray(e)) return e;
}
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
var Q7 = function(t, n) {
  var r;
  return /* @__PURE__ */ U.isValidElement(t) ? r = /* @__PURE__ */ U.cloneElement(t, n) : Ee(t) ? r = t(n) : r = /* @__PURE__ */ U.createElement("line", v0({}, n, {
    className: "recharts-reference-line-line"
  })), r;
}, J7 = function(t, n, r, o, u, c, f, d, h) {
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
    var A = h.x, T = t.x.apply(A, {
      position: c
    });
    if (hr(h, "discard") && !t.x.isInRange(T))
      return null;
    var M = [{
      x: T,
      y: v + b
    }, {
      x: T,
      y: v
    }];
    return f === "top" ? M.reverse() : M;
  }
  if (o) {
    var C = h.segment, w = C.map(function(E) {
      return t.apply(E, {
        position: c
      });
    });
    return hr(h, "discard") && KH(w, function(E) {
      return !t.isInRange(E);
    }) ? null : w;
  }
  return null;
};
function eG(e) {
  var t = e.x, n = e.y, r = e.segment, o = e.xAxisId, u = e.yAxisId, c = e.shape, f = e.className, d = e.alwaysShow, h = R7(), y = kP(o), v = BP(u), g = q7();
  if (!h || !g)
    return null;
  Ur(d === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var b = R1({
    x: y.scale,
    y: v.scale
  }), _ = wt(t), S = wt(n), x = r && r.length === 2, A = J7(b, _, S, x, g, e.position, y.orientation, v.orientation, e);
  if (!A)
    return null;
  var T = X7(A, 2), M = T[0], C = M.x, w = M.y, E = T[1], j = E.x, N = E.y, R = hr(e, "hidden") ? "url(#".concat(h, ")") : void 0, k = vM(vM({
    clipPath: R
  }, Te(e, !0)), {}, {
    x1: C,
    y1: w,
    x2: j,
    y2: N
  });
  return /* @__PURE__ */ U.createElement(Ie, {
    className: $e("recharts-reference-line", f)
  }, Q7(c, k), Gt.renderCallByParent(e, _7({
    x1: C,
    y1: w,
    x2: j,
    y2: N
  })));
}
var $d = /* @__PURE__ */ (function(e) {
  function t() {
    return B7(this, t), I7(this, t, arguments);
  }
  return Y7(t, e), U7(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ U.createElement(eG, this.props);
    }
  }]);
})(U.Component);
B1($d, "displayName", "ReferenceLine");
B1($d, "defaultProps", {
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
function y0() {
  return y0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, y0.apply(this, arguments);
}
function Go(e) {
  "@babel/helpers - typeof";
  return Go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Go(e);
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
function gM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mM(Object(n), !0).forEach(function(r) {
      zd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function tG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function nG(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, HP(r.key), r);
  }
}
function rG(e, t, n) {
  return t && nG(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function aG(e, t, n) {
  return t = Vf(t), iG(e, IP() ? Reflect.construct(t, n || [], Vf(e).constructor) : t.apply(e, n));
}
function iG(e, t) {
  if (t && (Go(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return oG(e);
}
function oG(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function IP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (IP = function() {
    return !!e;
  })();
}
function Vf(e) {
  return Vf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Vf(e);
}
function lG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && m0(e, t);
}
function m0(e, t) {
  return m0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, m0(e, t);
}
function zd(e, t, n) {
  return t = HP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function HP(e) {
  var t = uG(e, "string");
  return Go(t) == "symbol" ? t : t + "";
}
function uG(e, t) {
  if (Go(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Go(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var cG = function(t) {
  var n = t.x, r = t.y, o = t.xAxis, u = t.yAxis, c = R1({
    x: o.scale,
    y: u.scale
  }), f = c.apply({
    x: n,
    y: r
  }, {
    bandAware: !0
  });
  return hr(t, "discard") && !c.isInRange(f) ? null : f;
}, qd = /* @__PURE__ */ (function(e) {
  function t() {
    return tG(this, t), aG(this, t, arguments);
  }
  return lG(t, e), rG(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.x, u = r.y, c = r.r, f = r.alwaysShow, d = r.clipPathId, h = wt(o), y = wt(u);
      if (Ur(f === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !h || !y)
        return null;
      var v = cG(this.props);
      if (!v)
        return null;
      var g = v.x, b = v.y, _ = this.props, S = _.shape, x = _.className, A = hr(this.props, "hidden") ? "url(#".concat(d, ")") : void 0, T = gM(gM({
        clipPath: A
      }, Te(this.props, !0)), {}, {
        cx: g,
        cy: b
      });
      return /* @__PURE__ */ U.createElement(Ie, {
        className: $e("recharts-reference-dot", x)
      }, t.renderDot(S, T), Gt.renderCallByParent(this.props, {
        x: g - c,
        y: b - c,
        width: 2 * c,
        height: 2 * c
      }));
    }
  }]);
})(U.Component);
zd(qd, "displayName", "ReferenceDot");
zd(qd, "defaultProps", {
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
zd(qd, "renderDot", function(e, t) {
  var n;
  return /* @__PURE__ */ U.isValidElement(e) ? n = /* @__PURE__ */ U.cloneElement(e, t) : Ee(e) ? n = e(t) : n = /* @__PURE__ */ U.createElement(Cd, y0({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), n;
});
function g0() {
  return g0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, g0.apply(this, arguments);
}
function Yo(e) {
  "@babel/helpers - typeof";
  return Yo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yo(e);
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
function xM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bM(Object(n), !0).forEach(function(r) {
      kd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fG(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, YP(r.key), r);
  }
}
function dG(e, t, n) {
  return t && fG(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function hG(e, t, n) {
  return t = Ff(t), pG(e, GP() ? Reflect.construct(t, n || [], Ff(e).constructor) : t.apply(e, n));
}
function pG(e, t) {
  if (t && (Yo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return vG(e);
}
function vG(e) {
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
function yG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && b0(e, t);
}
function b0(e, t) {
  return b0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, b0(e, t);
}
function kd(e, t, n) {
  return t = YP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function YP(e) {
  var t = mG(e, "string");
  return Yo(t) == "symbol" ? t : t + "";
}
function mG(e, t) {
  if (Yo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var gG = function(t, n, r, o, u) {
  var c = u.x1, f = u.x2, d = u.y1, h = u.y2, y = u.xAxis, v = u.yAxis;
  if (!y || !v) return null;
  var g = R1({
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
  return hr(u, "discard") && (!g.isInRange(b) || !g.isInRange(_)) ? null : DP(b, _);
}, Bd = /* @__PURE__ */ (function(e) {
  function t() {
    return sG(this, t), hG(this, t, arguments);
  }
  return yG(t, e), dG(t, [{
    key: "render",
    value: function() {
      var r = this.props, o = r.x1, u = r.x2, c = r.y1, f = r.y2, d = r.className, h = r.alwaysShow, y = r.clipPathId;
      Ur(h === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var v = wt(o), g = wt(u), b = wt(c), _ = wt(f), S = this.props.shape;
      if (!v && !g && !b && !_ && !S)
        return null;
      var x = gG(v, g, b, _, this.props);
      if (!x && !S)
        return null;
      var A = hr(this.props, "hidden") ? "url(#".concat(y, ")") : void 0;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: $e("recharts-reference-area", d)
      }, t.renderRect(S, xM(xM({
        clipPath: A
      }, Te(this.props, !0)), x)), Gt.renderCallByParent(this.props, x));
    }
  }]);
})(U.Component);
kd(Bd, "displayName", "ReferenceArea");
kd(Bd, "defaultProps", {
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
kd(Bd, "renderRect", function(e, t) {
  var n;
  return /* @__PURE__ */ U.isValidElement(e) ? n = /* @__PURE__ */ U.cloneElement(e, t) : Ee(e) ? n = e(t) : n = /* @__PURE__ */ U.createElement(N1, g0({}, t, {
    className: "recharts-reference-area-rect"
  })), n;
});
function KP(e, t, n) {
  if (t < 1)
    return [];
  if (t === 1 && n === void 0)
    return e;
  for (var r = [], o = 0; o < e.length; o += t)
    r.push(e[o]);
  return r;
}
function bG(e, t, n) {
  var r = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return w7(r, n);
}
function xG(e, t, n) {
  var r = n === "width", o = e.x, u = e.y, c = e.width, f = e.height;
  return t === 1 ? {
    start: r ? o : u,
    end: r ? o + c : u + f
  } : {
    start: r ? o + c : u + f,
    end: r ? o : u
  };
}
function Wf(e, t, n, r, o) {
  if (e * t < e * r || e * t > e * o)
    return !1;
  var u = n();
  return e * (t - e * u / 2 - r) >= 0 && e * (t + e * u / 2 - o) <= 0;
}
function SG(e, t) {
  return KP(e, t + 1);
}
function _G(e, t, n, r, o) {
  for (var u = (r || []).slice(), c = t.start, f = t.end, d = 0, h = 1, y = c, v = function() {
    var _ = r == null ? void 0 : r[d];
    if (_ === void 0)
      return {
        v: KP(r, h)
      };
    var S = d, x, A = function() {
      return x === void 0 && (x = n(_, S)), x;
    }, T = _.coordinate, M = d === 0 || Wf(e, T, A, y, f);
    M || (d = 0, y = c, h += 1), M && (y = T + e * (A() / 2 + o), d += h);
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
function It(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? SM(Object(n), !0).forEach(function(r) {
      OG(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : SM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function OG(e, t, n) {
  return t = wG(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function wG(e) {
  var t = AG(e, "string");
  return uc(t) == "symbol" ? t : t + "";
}
function AG(e, t) {
  if (uc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (uc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function TG(e, t, n, r, o) {
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
    var A = Wf(e, b.tickCoord, S, f, d);
    A && (d = b.tickCoord - e * (S() / 2 + o), u[g] = It(It({}, b), {}, {
      isShow: !0
    }));
  }, y = c - 1; y >= 0; y--)
    h(y);
  return u;
}
function EG(e, t, n, r, o, u) {
  var c = (r || []).slice(), f = c.length, d = t.start, h = t.end;
  if (u) {
    var y = r[f - 1], v = n(y, f - 1), g = e * (y.coordinate + e * v / 2 - h);
    c[f - 1] = y = It(It({}, y), {}, {
      tickCoord: g > 0 ? y.coordinate - g * e : y.coordinate
    });
    var b = Wf(e, y.tickCoord, function() {
      return v;
    }, d, h);
    b && (h = y.tickCoord - e * (v / 2 + o), c[f - 1] = It(It({}, y), {}, {
      isShow: !0
    }));
  }
  for (var _ = u ? f - 1 : f, S = function(T) {
    var M = c[T], C, w = function() {
      return C === void 0 && (C = n(M, T)), C;
    };
    if (T === 0) {
      var E = e * (M.coordinate - e * w() / 2 - d);
      c[T] = M = It(It({}, M), {}, {
        tickCoord: E < 0 ? M.coordinate - E * e : M.coordinate
      });
    } else
      c[T] = M = It(It({}, M), {}, {
        tickCoord: M.coordinate
      });
    var j = Wf(e, M.tickCoord, w, d, h);
    j && (d = M.tickCoord + e * (w() / 2 + o), c[T] = It(It({}, M), {}, {
      isShow: !0
    }));
  }, x = 0; x < _; x++)
    S(x);
  return c;
}
function L1(e, t, n) {
  var r = e.tick, o = e.ticks, u = e.viewBox, c = e.minTickGap, f = e.orientation, d = e.interval, h = e.tickFormatter, y = e.unit, v = e.angle;
  if (!o || !o.length || !r)
    return [];
  if (de(d) || Na.isSsr)
    return SG(o, typeof d == "number" && de(d) ? d : 0);
  var g = [], b = f === "top" || f === "bottom" ? "width" : "height", _ = y && b === "width" ? xu(y, {
    fontSize: t,
    letterSpacing: n
  }) : {
    width: 0,
    height: 0
  }, S = function(M, C) {
    var w = Ee(h) ? h(M.value, C) : M.value;
    return b === "width" ? bG(xu(w, {
      fontSize: t,
      letterSpacing: n
    }), _, v) : xu(w, {
      fontSize: t,
      letterSpacing: n
    })[b];
  }, x = o.length >= 2 ? Wn(o[1].coordinate - o[0].coordinate) : 1, A = xG(u, x, b);
  return d === "equidistantPreserveStart" ? _G(x, A, S, o, c) : (d === "preserveStart" || d === "preserveStartEnd" ? g = EG(x, A, S, o, c, d === "preserveStartEnd") : g = TG(x, A, S, o, c), g.filter(function(T) {
    return T.isShow;
  }));
}
var jG = ["viewBox"], MG = ["viewBox"], CG = ["ticks"];
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
function _t(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _M(Object(n), !0).forEach(function(r) {
      U1(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _M(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function rb(e, t) {
  if (e == null) return {};
  var n = DG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function DG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function PG(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function OM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, VP(r.key), r);
  }
}
function NG(e, t, n) {
  return t && OM(e.prototype, t), n && OM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function RG(e, t, n) {
  return t = Zf(t), $G(e, XP() ? Reflect.construct(t, n || [], Zf(e).constructor) : t.apply(e, n));
}
function $G(e, t) {
  if (t && (Ko(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return zG(e);
}
function zG(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function XP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (XP = function() {
    return !!e;
  })();
}
function Zf(e) {
  return Zf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Zf(e);
}
function qG(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && x0(e, t);
}
function x0(e, t) {
  return x0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, x0(e, t);
}
function U1(e, t, n) {
  return t = VP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function VP(e) {
  var t = kG(e, "string");
  return Ko(t) == "symbol" ? t : t + "";
}
function kG(e, t) {
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
    return PG(this, t), r = RG(this, t, [n]), r.state = {
      fontSize: "",
      letterSpacing: ""
    }, r;
  }
  return qG(t, e), NG(t, [{
    key: "shouldComponentUpdate",
    value: function(r, o) {
      var u = r.viewBox, c = rb(r, jG), f = this.props, d = f.viewBox, h = rb(f, MG);
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
      var o = this.props, u = o.x, c = o.y, f = o.width, d = o.height, h = o.orientation, y = o.tickSize, v = o.mirror, g = o.tickMargin, b, _, S, x, A, T, M = v ? -1 : 1, C = r.tickSize || y, w = de(r.tickCoord) ? r.tickCoord : r.coordinate;
      switch (h) {
        case "top":
          b = _ = r.coordinate, x = c + +!v * d, S = x - M * C, T = S - M * g, A = w;
          break;
        case "left":
          S = x = r.coordinate, _ = u + +!v * f, b = _ - M * C, A = b - M * g, T = w;
          break;
        case "right":
          S = x = r.coordinate, _ = u + +v * f, b = _ + M * C, A = b + M * g, T = w;
          break;
        default:
          b = _ = r.coordinate, x = c + +v * d, S = x + M * C, T = S + M * g, A = w;
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
          y: T
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
      return /* @__PURE__ */ U.createElement("line", _o({}, v, {
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
        var c = this, f = this.props, d = f.tickLine, h = f.stroke, y = f.tick, v = f.tickFormatter, g = f.unit, b = L1(_t(_t({}, this.props), {}, {
          ticks: r
        }), o, u), _ = this.getTickTextAnchor(), S = this.getTickVerticalAnchor(), x = Te(this.props, !1), A = Te(y, !1), T = _t(_t({}, x), {}, {
          fill: "none"
        }, Te(d, !1)), M = b.map(function(C, w) {
          var E = c.getTickLineCoord(C), j = E.line, N = E.tick, R = _t(_t(_t(_t({
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
          return /* @__PURE__ */ U.createElement(Ie, _o({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(C.value, "-").concat(C.coordinate, "-").concat(C.tickCoord)
          }, Mu(c.props, C, w)), d && /* @__PURE__ */ U.createElement("line", _o({}, T, j, {
            className: $e("recharts-cartesian-axis-tick-line", Bn(d, "className"))
          })), y && t.renderTickItem(y, R, "".concat(Ee(v) ? v(C.value, w) : C.value).concat(g || "")));
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
      var v = this.props, g = v.ticks, b = rb(v, CG), _ = g;
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
      })) : c = /* @__PURE__ */ U.createElement(mf, _o({}, o, {
        className: "recharts-cartesian-axis-tick-value"
      }), u), c;
    }
  }]);
})(ee.Component);
U1(fl, "displayName", "CartesianAxis");
U1(fl, "defaultProps", {
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
var BG = ["x1", "y1", "x2", "y2", "key"], LG = ["offset"];
function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Si(e);
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
function Yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wM(Object(n), !0).forEach(function(r) {
      UG(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function UG(e, t, n) {
  return t = IG(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function IG(e) {
  var t = HG(e, "string");
  return Si(t) == "symbol" ? t : t + "";
}
function HG(e, t) {
  if (Si(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Si(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function si() {
  return si = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, si.apply(this, arguments);
}
function AM(e, t) {
  if (e == null) return {};
  var n = GG(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function GG(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var YG = function(t) {
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
function FP(e, t) {
  var n;
  if (/* @__PURE__ */ U.isValidElement(e))
    n = /* @__PURE__ */ U.cloneElement(e, t);
  else if (Ee(e))
    n = e(t);
  else {
    var r = t.x1, o = t.y1, u = t.x2, c = t.y2, f = t.key, d = AM(t, BG), h = Te(d, !1);
    h.offset;
    var y = AM(h, LG);
    n = /* @__PURE__ */ U.createElement("line", si({}, y, {
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
function KG(e) {
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
    return FP(o, h);
  });
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, c);
}
function XG(e) {
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
    return FP(o, h);
  });
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, c);
}
function VG(e) {
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
function FG(e) {
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
var WG = function(t, n) {
  var r = t.xAxis, o = t.width, u = t.height, c = t.offset;
  return cP(L1(Yt(Yt(Yt({}, fl.defaultProps), r), {}, {
    ticks: kr(r, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: o,
      height: u
    }
  })), c.left, c.left + c.width, n);
}, ZG = function(t, n) {
  var r = t.yAxis, o = t.width, u = t.height, c = t.offset;
  return cP(L1(Yt(Yt(Yt({}, fl.defaultProps), r), {}, {
    ticks: kr(r, !0),
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
  var t, n, r, o, u, c, f = q1(), d = k1(), h = k7(), y = Yt(Yt({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : yo.stroke,
    fill: (n = e.fill) !== null && n !== void 0 ? n : yo.fill,
    horizontal: (r = e.horizontal) !== null && r !== void 0 ? r : yo.horizontal,
    horizontalFill: (o = e.horizontalFill) !== null && o !== void 0 ? o : yo.horizontalFill,
    vertical: (u = e.vertical) !== null && u !== void 0 ? u : yo.vertical,
    verticalFill: (c = e.verticalFill) !== null && c !== void 0 ? c : yo.verticalFill,
    x: de(e.x) ? e.x : h.left,
    y: de(e.y) ? e.y : h.top,
    width: de(e.width) ? e.width : h.width,
    height: de(e.height) ? e.height : h.height
  }), v = y.x, g = y.y, b = y.width, _ = y.height, S = y.syncWithTicks, x = y.horizontalValues, A = y.verticalValues, T = $7(), M = z7();
  if (!de(b) || b <= 0 || !de(_) || _ <= 0 || !de(v) || v !== +v || !de(g) || g !== +g)
    return null;
  var C = y.verticalCoordinatesGenerator || WG, w = y.horizontalCoordinatesGenerator || ZG, E = y.horizontalPoints, j = y.verticalPoints;
  if ((!E || !E.length) && Ee(w)) {
    var N = x && x.length, R = w({
      yAxis: M ? Yt(Yt({}, M), {}, {
        ticks: N ? x : M.ticks
      }) : void 0,
      width: f,
      height: d,
      offset: h
    }, N ? !0 : S);
    Ur(Array.isArray(R), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(Si(R), "]")), Array.isArray(R) && (E = R);
  }
  if ((!j || !j.length) && Ee(C)) {
    var k = A && A.length, L = C({
      xAxis: T ? Yt(Yt({}, T), {}, {
        ticks: k ? A : T.ticks
      }) : void 0,
      width: f,
      height: d,
      offset: h
    }, k ? !0 : S);
    Ur(Array.isArray(L), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(Si(L), "]")), Array.isArray(L) && (j = L);
  }
  return /* @__PURE__ */ U.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ U.createElement(YG, {
    fill: y.fill,
    fillOpacity: y.fillOpacity,
    x: y.x,
    y: y.y,
    width: y.width,
    height: y.height,
    ry: y.ry
  }), /* @__PURE__ */ U.createElement(KG, si({}, y, {
    offset: h,
    horizontalPoints: E,
    xAxis: T,
    yAxis: M
  })), /* @__PURE__ */ U.createElement(XG, si({}, y, {
    offset: h,
    verticalPoints: j,
    xAxis: T,
    yAxis: M
  })), /* @__PURE__ */ U.createElement(VG, si({}, y, {
    horizontalPoints: E
  })), /* @__PURE__ */ U.createElement(FG, si({}, y, {
    verticalPoints: j
  })));
}
bu.displayName = "CartesianGrid";
var QG = ["type", "layout", "connectNulls", "ref"], JG = ["key"];
function Xo(e) {
  "@babel/helpers - typeof";
  return Xo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xo(e);
}
function TM(e, t) {
  if (e == null) return {};
  var n = eY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function eY(e, t) {
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
function EM(e, t) {
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
    t % 2 ? EM(Object(n), !0).forEach(function(r) {
      Xn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mo(e) {
  return aY(e) || rY(e) || nY(e) || tY();
}
function tY() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nY(e, t) {
  if (e) {
    if (typeof e == "string") return S0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return S0(e, t);
  }
}
function rY(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function aY(e) {
  if (Array.isArray(e)) return S0(e);
}
function S0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function iY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function jM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ZP(r.key), r);
  }
}
function oY(e, t, n) {
  return t && jM(e.prototype, t), n && jM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function lY(e, t, n) {
  return t = Qf(t), uY(e, WP() ? Reflect.construct(t, n || [], Qf(e).constructor) : t.apply(e, n));
}
function uY(e, t) {
  if (t && (Xo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return cY(e);
}
function cY(e) {
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
function sY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _0(e, t);
}
function _0(e, t) {
  return _0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, _0(e, t);
}
function Xn(e, t, n) {
  return t = ZP(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function ZP(e) {
  var t = fY(e, "string");
  return Xo(t) == "symbol" ? t : t + "";
}
function fY(e, t) {
  if (Xo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Br = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    iY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = lY(this, t, [].concat(o)), Xn(n, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Xn(n, "generateSimpleStrokeDasharray", function(c, f) {
      return "".concat(f, "px ").concat(c - f, "px");
    }), Xn(n, "getStrokeDasharray", function(c, f, d) {
      var h = d.reduce(function(A, T) {
        return A + T;
      });
      if (!h)
        return n.generateSimpleStrokeDasharray(f, c);
      for (var y = Math.floor(c / h), v = c % h, g = f - c, b = [], _ = 0, S = 0; _ < d.length; S += d[_], ++_)
        if (S + d[_] > v) {
          b = [].concat(mo(d.slice(0, _)), [v - S]);
          break;
        }
      var x = b.length % 2 === 0 ? [0, g] : [g];
      return [].concat(mo(t.repeat(d, y)), mo(b), x).map(function(A) {
        return "".concat(A, "px");
      }).join(", ");
    }), Xn(n, "id", Oi("recharts-line-")), Xn(n, "pathRef", function(c) {
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
  return sY(t, e), oY(t, [{
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
      var u = this.props, c = u.points, f = u.xAxis, d = u.yAxis, h = u.layout, y = u.children, v = on(y, sl);
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
      return /* @__PURE__ */ U.createElement(Ie, wu({
        className: "recharts-line-dots",
        key: "dots"
      }, _), b);
    }
  }, {
    key: "renderCurveStatically",
    value: function(r, o, u, c) {
      var f = this.props, d = f.type, h = f.layout, y = f.connectNulls;
      f.ref;
      var v = TM(f, QG), g = gn(gn(gn({}, Te(v, !0)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: o ? "url(#clipPath-".concat(u, ")") : null,
        points: r
      }, c), {}, {
        type: d,
        layout: h,
        connectNulls: y
      });
      return /* @__PURE__ */ U.createElement(pi, wu({}, g, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(r, o) {
      var u = this, c = this.props, f = c.points, d = c.strokeDasharray, h = c.isAnimationActive, y = c.animationBegin, v = c.animationDuration, g = c.animationEasing, b = c.animationId, _ = c.animateNewValues, S = c.width, x = c.height, A = this.state, T = A.prevPoints, M = A.totalLength;
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
        if (T) {
          var E = T.length / f.length, j = f.map(function(q, V) {
            var Y = Math.floor(V * E);
            if (T[Y]) {
              var F = T[Y], z = pt(F.x, q.x), K = pt(F.y, q.y);
              return gn(gn({}, q), {}, {
                x: z(w),
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
        var N = pt(0, M), R = N(w), k;
        if (d) {
          var L = "".concat(d).split(/[,\s]+/gim).map(function(q) {
            return parseFloat(q);
          });
          k = u.getStrokeDasharray(R, M, L);
        } else
          k = u.generateSimpleStrokeDasharray(M, R);
        return u.renderCurveStatically(f, r, o, {
          strokeDasharray: k
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function(r, o) {
      var u = this.props, c = u.points, f = u.isAnimationActive, d = this.state, h = d.prevPoints, y = d.totalLength;
      return f && c && c.length && (!h && y > 0 || !gi(h, c)) ? this.renderCurveWithAnimation(r, o) : this.renderCurveStatically(c, r, o);
    }
  }, {
    key: "render",
    value: function() {
      var r, o = this.props, u = o.hide, c = o.dot, f = o.points, d = o.className, h = o.xAxis, y = o.yAxis, v = o.top, g = o.left, b = o.width, _ = o.height, S = o.isAnimationActive, x = o.id;
      if (u || !f || !f.length)
        return null;
      var A = this.state.isAnimationFinished, T = f.length === 1, M = $e("recharts-line", d), C = h && h.allowDataOverflow, w = y && y.allowDataOverflow, E = C || w, j = we(x) ? this.id : x, N = (r = Te(c, !1)) !== null && r !== void 0 ? r : {
        r: 3,
        strokeWidth: 2
      }, R = N.r, k = R === void 0 ? 3 : R, L = N.strokeWidth, q = L === void 0 ? 2 : L, V = hC(c) ? c : {}, Y = V.clipDot, F = Y === void 0 ? !0 : Y, z = k * 2 + q;
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
        x: g - z / 2,
        y: v - z / 2,
        width: b + z,
        height: _ + z
      }))) : null, !T && this.renderCurve(E, j), this.renderErrorBar(E, j), (T || c) && this.renderDots(E, F, j), (!S || A) && dr.renderCallByParent(this.props, f));
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
      if (/* @__PURE__ */ U.isValidElement(r))
        u = /* @__PURE__ */ U.cloneElement(r, o);
      else if (Ee(r))
        u = r(o);
      else {
        var c = o.key, f = TM(o, JG), d = $e("recharts-line-dot", typeof r != "boolean" ? r.className : "");
        u = /* @__PURE__ */ U.createElement(Cd, wu({
          key: c
        }, f, {
          className: d
        }));
      }
      return u;
    }
  }]);
})(ee.PureComponent);
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
  return gn({
    points: v,
    layout: y
  }, h);
});
var dY = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], hY = ["key"], QP;
function Vo(e) {
  "@babel/helpers - typeof";
  return Vo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vo(e);
}
function JP(e, t) {
  if (e == null) return {};
  var n = pY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function pY(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function fi() {
  return fi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, fi.apply(this, arguments);
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
function wa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? MM(Object(n), !0).forEach(function(r) {
      ur(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : MM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function vY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function CM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, tN(r.key), r);
  }
}
function yY(e, t, n) {
  return t && CM(e.prototype, t), n && CM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function mY(e, t, n) {
  return t = Jf(t), gY(e, eN() ? Reflect.construct(t, n || [], Jf(e).constructor) : t.apply(e, n));
}
function gY(e, t) {
  if (t && (Vo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return bY(e);
}
function bY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function eN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (eN = function() {
    return !!e;
  })();
}
function Jf(e) {
  return Jf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Jf(e);
}
function xY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && O0(e, t);
}
function O0(e, t) {
  return O0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, O0(e, t);
}
function ur(e, t, n) {
  return t = tN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function tN(e) {
  var t = SY(e, "string");
  return Vo(t) == "symbol" ? t : t + "";
}
function SY(e, t) {
  if (Vo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Vo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Wr = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    vY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = mY(this, t, [].concat(o)), ur(n, "state", {
      isAnimationFinished: !0
    }), ur(n, "id", Oi("recharts-area-")), ur(n, "handleAnimationEnd", function() {
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
  return xY(t, e), yY(t, [{
    key: "renderDots",
    value: function(r, o, u) {
      var c = this.props.isAnimationActive, f = this.state.isAnimationFinished;
      if (c && !f)
        return null;
      var d = this.props, h = d.dot, y = d.points, v = d.dataKey, g = Te(this.props, !1), b = Te(h, !0), _ = y.map(function(x, A) {
        var T = wa(wa(wa({
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
        return t.renderDotItem(h, T);
      }), S = {
        clipPath: r ? "url(#clipPath-".concat(o ? "" : "dots-").concat(u, ")") : null
      };
      return /* @__PURE__ */ U.createElement(Ie, fi({
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
      var b = JP(f, dY);
      return /* @__PURE__ */ U.createElement(Ie, {
        clipPath: u ? "url(#clipPath-".concat(c, ")") : null
      }, /* @__PURE__ */ U.createElement(pi, fi({}, Te(b, !0), {
        points: r,
        connectNulls: v,
        type: h,
        baseLine: o,
        layout: d,
        stroke: "none",
        className: "recharts-area-area"
      })), y !== "none" && /* @__PURE__ */ U.createElement(pi, fi({}, Te(this.props, !1), {
        className: "recharts-area-curve",
        layout: d,
        type: h,
        connectNulls: v,
        fill: "none",
        points: r
      })), y !== "none" && g && /* @__PURE__ */ U.createElement(pi, fi({}, Te(this.props, !1), {
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
        var T = A.t;
        if (S) {
          var M = S.length / f.length, C = f.map(function(N, R) {
            var k = Math.floor(R * M);
            if (S[k]) {
              var L = S[k], q = pt(L.x, N.x), V = pt(L.y, N.y);
              return wa(wa({}, N), {}, {
                x: q(T),
                y: V(T)
              });
            }
            return N;
          }), w;
          if (de(d) && typeof d == "number") {
            var E = pt(x, d);
            w = E(T);
          } else if (we(d) || il(d)) {
            var j = pt(x, 0);
            w = j(T);
          } else
            w = d.map(function(N, R) {
              var k = Math.floor(R * M);
              if (x[k]) {
                var L = x[k], q = pt(L.x, N.x), V = pt(L.y, N.y);
                return wa(wa({}, N), {}, {
                  x: q(T),
                  y: V(T)
                });
              }
              return N;
            });
          return u.renderAreaStatically(C, w, r, o);
        }
        return /* @__PURE__ */ U.createElement(Ie, null, /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
          id: "animationClipPath-".concat(o)
        }, u.renderClipRect(T))), /* @__PURE__ */ U.createElement(Ie, {
          clipPath: "url(#animationClipPath-".concat(o, ")")
        }, u.renderAreaStatically(f, d, r, o)));
      });
    }
  }, {
    key: "renderArea",
    value: function(r, o) {
      var u = this.props, c = u.points, f = u.baseLine, d = u.isAnimationActive, h = this.state, y = h.prevPoints, v = h.prevBaseLine, g = h.totalLength;
      return d && c && c.length && (!y && g > 0 || !gi(y, c) || !gi(v, f)) ? this.renderAreaWithAnimation(r, o) : this.renderAreaStatically(c, f, r, o);
    }
  }, {
    key: "render",
    value: function() {
      var r, o = this.props, u = o.hide, c = o.dot, f = o.points, d = o.className, h = o.top, y = o.left, v = o.xAxis, g = o.yAxis, b = o.width, _ = o.height, S = o.isAnimationActive, x = o.id;
      if (u || !f || !f.length)
        return null;
      var A = this.state.isAnimationFinished, T = f.length === 1, M = $e("recharts-area", d), C = v && v.allowDataOverflow, w = g && g.allowDataOverflow, E = C || w, j = we(x) ? this.id : x, N = (r = Te(c, !1)) !== null && r !== void 0 ? r : {
        r: 3,
        strokeWidth: 2
      }, R = N.r, k = R === void 0 ? 3 : R, L = N.strokeWidth, q = L === void 0 ? 2 : L, V = hC(c) ? c : {}, Y = V.clipDot, F = Y === void 0 ? !0 : Y, z = k * 2 + q;
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
        x: y - z / 2,
        y: h - z / 2,
        width: b + z,
        height: _ + z
      }))) : null, T ? null : this.renderArea(E, j), (c || T) && this.renderDots(E, F, j), (!S || A) && dr.renderCallByParent(this.props, f));
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
})(ee.PureComponent);
QP = Wr;
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
  var t = e.props, n = e.item, r = e.xAxis, o = e.yAxis, u = e.xAxisTicks, c = e.yAxisTicks, f = e.bandSize, d = e.dataKey, h = e.stackedData, y = e.dataStartIndex, v = e.displayedData, g = e.offset, b = t.layout, _ = h && h.length, S = QP.getBaseValue(t, n, r, o), x = b === "horizontal", A = !1, T = v.map(function(C, w) {
    var E;
    _ ? E = h[y + w] : (E = At(C, d), Array.isArray(E) ? A = !0 : E = [S, E]);
    var j = E[1] == null || _ && At(C, d) == null;
    return x ? {
      x: ko({
        axis: r,
        ticks: u,
        bandSize: f,
        entry: C,
        index: w
      }),
      y: j ? null : o.scale(E[1]),
      value: E,
      payload: C
    } : {
      x: j ? null : r.scale(E[1]),
      y: ko({
        axis: o,
        ticks: c,
        bandSize: f,
        entry: C,
        index: w
      }),
      value: E,
      payload: C
    };
  }), M;
  return _ || A ? M = T.map(function(C) {
    var w = Array.isArray(C.value) ? C.value[0] : null;
    return x ? {
      x: C.x,
      y: w != null && C.y != null ? o.scale(w) : null
    } : {
      x: w != null ? r.scale(w) : null,
      y: C.y
    };
  }) : M = x ? o.scale(S) : r.scale(S), wa({
    points: T,
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
    var r = $e("recharts-area-dot", typeof e != "boolean" ? e.className : ""), o = t.key, u = JP(t, hY);
    n = /* @__PURE__ */ U.createElement(Cd, fi({}, u, {
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
function _Y(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function OY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, aN(r.key), r);
  }
}
function wY(e, t, n) {
  return t && OY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function AY(e, t, n) {
  return t = ed(t), TY(e, nN() ? Reflect.construct(t, n || [], ed(e).constructor) : t.apply(e, n));
}
function TY(e, t) {
  if (t && (Fo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return EY(e);
}
function EY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function nN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (nN = function() {
    return !!e;
  })();
}
function ed(e) {
  return ed = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ed(e);
}
function jY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && w0(e, t);
}
function w0(e, t) {
  return w0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, w0(e, t);
}
function rN(e, t, n) {
  return t = aN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function aN(e) {
  var t = MY(e, "string");
  return Fo(t) == "symbol" ? t : t + "";
}
function MY(e, t) {
  if (Fo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Fo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ld = /* @__PURE__ */ (function(e) {
  function t() {
    return _Y(this, t), AY(this, t, arguments);
  }
  return jY(t, e), wY(t, [{
    key: "render",
    value: function() {
      return null;
    }
  }]);
})(ee.Component);
rN(Ld, "displayName", "ZAxis");
rN(Ld, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var CY = ["option", "isActive"];
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
function DY(e, t) {
  if (e == null) return {};
  var n = PY(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function PY(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function NY(e) {
  var t = e.option, n = e.isActive, r = DY(e, CY);
  return typeof t == "string" ? /* @__PURE__ */ ee.createElement(s0, Au({
    option: /* @__PURE__ */ ee.createElement(yd, Au({
      type: t
    }, r)),
    isActive: n,
    shapeType: "symbols"
  }, r)) : /* @__PURE__ */ ee.createElement(s0, Au({
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
function DM(e, t) {
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
    t % 2 ? DM(Object(n), !0).forEach(function(r) {
      Ma(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : DM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function RY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function PM(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, oN(r.key), r);
  }
}
function $Y(e, t, n) {
  return t && PM(e.prototype, t), n && PM(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function zY(e, t, n) {
  return t = td(t), qY(e, iN() ? Reflect.construct(t, n || [], td(e).constructor) : t.apply(e, n));
}
function qY(e, t) {
  if (t && (Wo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kY(e);
}
function kY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function iN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (iN = function() {
    return !!e;
  })();
}
function td(e) {
  return td = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, td(e);
}
function BY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && A0(e, t);
}
function A0(e, t) {
  return A0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, A0(e, t);
}
function Ma(e, t, n) {
  return t = oN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function oN(e) {
  var t = LY(e, "string");
  return Wo(t) == "symbol" ? t : t + "";
}
function LY(e, t) {
  if (Wo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ud = /* @__PURE__ */ (function(e) {
  function t() {
    var n;
    RY(this, t);
    for (var r = arguments.length, o = new Array(r), u = 0; u < r; u++)
      o[u] = arguments[u];
    return n = zY(this, t, [].concat(o)), Ma(n, "state", {
      isAnimationFinished: !1
    }), Ma(n, "handleAnimationEnd", function() {
      n.setState({
        isAnimationFinished: !0
      });
    }), Ma(n, "handleAnimationStart", function() {
      n.setState({
        isAnimationFinished: !1
      });
    }), Ma(n, "id", Oi("recharts-scatter-")), n;
  }
  return BY(t, e), $Y(t, [{
    key: "renderSymbolsStatically",
    value: function(r) {
      var o = this, u = this.props, c = u.shape, f = u.activeShape, d = u.activeIndex, h = Te(this.props, !1);
      return r.map(function(y, v) {
        var g = d === v, b = g ? f : c, _ = qn(qn({}, h), y);
        return /* @__PURE__ */ U.createElement(Ie, Tu({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(y == null ? void 0 : y.cx, "-").concat(y == null ? void 0 : y.cy, "-").concat(y == null ? void 0 : y.size, "-").concat(v)
        }, Mu(o.props, y, v), {
          role: "img"
        }), /* @__PURE__ */ U.createElement(NY, Tu({
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
            var T = pt(A.cx, S.cx), M = pt(A.cy, S.cy), C = pt(A.size, S.size);
            return qn(qn({}, S), {}, {
              cx: T(b),
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
      return u && o && o.length && (!c || !gi(c, o)) ? this.renderSymbolsWithAnimation() : this.renderSymbolsStatically(o);
    }
  }, {
    key: "renderErrorBar",
    value: function() {
      var r = this.props.isAnimationActive;
      if (r && !this.state.isAnimationFinished)
        return null;
      var o = this.props, u = o.points, c = o.xAxis, f = o.yAxis, d = o.children, h = on(d, sl);
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
        var g = gz(o), b = g.xmin, _ = g.xmax, S = g.a, x = g.b, A = function(C) {
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
      var T = qn(qn(qn({}, d), {}, {
        fill: "none",
        stroke: d && d.fill
      }, h), {}, {
        points: y
      });
      return /* @__PURE__ */ U.isValidElement(u) ? v = /* @__PURE__ */ U.cloneElement(u, T) : Ee(u) ? v = u(T) : v = /* @__PURE__ */ U.createElement(pi, Tu({}, T, {
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
      var x = this.state.isAnimationFinished, A = $e("recharts-scatter", f), T = d && d.allowDataOverflow, M = h && h.allowDataOverflow, C = T || M, w = we(_) ? this.id : _;
      return /* @__PURE__ */ U.createElement(Ie, {
        className: A,
        clipPath: C ? "url(#clipPath-".concat(w, ")") : null
      }, T || M ? /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
        id: "clipPath-".concat(w)
      }, /* @__PURE__ */ U.createElement("rect", {
        x: T ? y : y - g / 2,
        y: M ? v : v - b / 2,
        width: T ? g : g * 2,
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
})(ee.PureComponent);
Ma(Ud, "displayName", "Scatter");
Ma(Ud, "defaultProps", {
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
Ma(Ud, "getComposedData", function(e) {
  var t = e.xAxis, n = e.yAxis, r = e.zAxis, o = e.item, u = e.displayedData, c = e.xAxisTicks, f = e.yAxisTicks, d = e.offset, h = o.props.tooltipType, y = on(o.props.children, xd), v = we(t.dataKey) ? o.props.dataKey : t.dataKey, g = we(n.dataKey) ? o.props.dataKey : n.dataKey, b = r && r.dataKey, _ = r ? r.range : Ld.defaultProps.range, S = _ && _[0], x = t.scale.bandwidth ? t.scale.bandwidth() : 0, A = n.scale.bandwidth ? n.scale.bandwidth() : 0, T = u.map(function(M, C) {
    var w = At(M, v), E = At(M, g), j = !we(b) && At(M, b) || "-", N = [{
      name: we(t.dataKey) ? o.props.name : t.name || t.dataKey,
      unit: t.unit || "",
      value: w,
      payload: M,
      dataKey: v,
      type: h
    }, {
      name: we(n.dataKey) ? o.props.name : n.name || n.dataKey,
      unit: n.unit || "",
      value: E,
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
    var R = ko({
      axis: t,
      ticks: c,
      bandSize: x,
      entry: M,
      index: C,
      dataKey: v
    }), k = ko({
      axis: n,
      ticks: f,
      bandSize: A,
      entry: M,
      index: C,
      dataKey: g
    }), L = j !== "-" ? r.scale(j) : S, q = Math.sqrt(Math.max(L, 0) / Math.PI);
    return qn(qn({}, M), {}, {
      cx: R,
      cy: k,
      x: R - q,
      y: k - q,
      xAxis: t,
      yAxis: n,
      zAxis: r,
      width: 2 * q,
      height: 2 * q,
      size: L,
      node: {
        x: w,
        y: E,
        z: j
      },
      tooltipPayload: N,
      tooltipPosition: {
        x: R,
        y: k
      },
      payload: M
    }, y && y[C] && y[C].props);
  });
  return qn({
    points: T
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
function UY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function IY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, cN(r.key), r);
  }
}
function HY(e, t, n) {
  return t && IY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function GY(e, t, n) {
  return t = nd(t), YY(e, lN() ? Reflect.construct(t, n || [], nd(e).constructor) : t.apply(e, n));
}
function YY(e, t) {
  if (t && (Zo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return KY(e);
}
function KY(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function lN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (lN = function() {
    return !!e;
  })();
}
function nd(e) {
  return nd = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, nd(e);
}
function XY(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && T0(e, t);
}
function T0(e, t) {
  return T0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, T0(e, t);
}
function uN(e, t, n) {
  return t = cN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function cN(e) {
  var t = VY(e, "string");
  return Zo(t) == "symbol" ? t : t + "";
}
function VY(e, t) {
  if (Zo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function E0() {
  return E0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, E0.apply(this, arguments);
}
function FY(e) {
  var t = e.xAxisId, n = q1(), r = k1(), o = kP(t);
  return o == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ ee.createElement(fl, E0({}, o, {
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
    return UY(this, t), GY(this, t, arguments);
  }
  return XY(t, e), HY(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ ee.createElement(FY, this.props);
    }
  }]);
})(ee.Component);
uN(cr, "displayName", "XAxis");
uN(cr, "defaultProps", {
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
function WY(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ZY(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, dN(r.key), r);
  }
}
function QY(e, t, n) {
  return t && ZY(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function JY(e, t, n) {
  return t = rd(t), eK(e, sN() ? Reflect.construct(t, n || [], rd(e).constructor) : t.apply(e, n));
}
function eK(e, t) {
  if (t && (Qo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return tK(e);
}
function tK(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function sN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (sN = function() {
    return !!e;
  })();
}
function rd(e) {
  return rd = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, rd(e);
}
function nK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && j0(e, t);
}
function j0(e, t) {
  return j0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, j0(e, t);
}
function fN(e, t, n) {
  return t = dN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function dN(e) {
  var t = rK(e, "string");
  return Qo(t) == "symbol" ? t : t + "";
}
function rK(e, t) {
  if (Qo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Qo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function M0() {
  return M0 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, M0.apply(this, arguments);
}
var aK = function(t) {
  var n = t.yAxisId, r = q1(), o = k1(), u = BP(n);
  return u == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ ee.createElement(fl, M0({}, u, {
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
    return WY(this, t), JY(this, t, arguments);
  }
  return nK(t, e), QY(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ ee.createElement(aK, this.props);
    }
  }]);
})(ee.Component);
fN(sr, "displayName", "YAxis");
fN(sr, "defaultProps", {
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
function NM(e) {
  return uK(e) || lK(e) || oK(e) || iK();
}
function iK() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oK(e, t) {
  if (e) {
    if (typeof e == "string") return C0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return C0(e, t);
  }
}
function lK(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function uK(e) {
  if (Array.isArray(e)) return C0(e);
}
function C0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var D0 = function(t, n, r, o, u) {
  var c = on(t, $d), f = on(t, qd), d = [].concat(NM(c), NM(f)), h = on(t, Bd), y = "".concat(o, "Id"), v = o[0], g = n;
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
        var A = x.props[b], T = x.props[_];
        return [Math.min(S[0], A, T), Math.max(S[1], A, T)];
      }
      return S;
    }, g);
  }
  return u && u.length && (g = u.reduce(function(S, x) {
    return de(x) ? [Math.min(S[0], x), Math.max(S[1], x)] : S;
  }, g)), g;
}, ab = { exports: {} }, RM;
function cK() {
  return RM || (RM = 1, (function(e) {
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
      var x = this._events[S], A = arguments.length, T, M;
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
        for (M = 1, T = new Array(A - 1); M < A; M++)
          T[M - 1] = arguments[M];
        x.fn.apply(x.context, T);
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
              if (!T) for (w = 1, T = new Array(A - 1); w < A; w++)
                T[w - 1] = arguments[w];
              x[M].fn.apply(x[M].context, T);
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
  })(ab)), ab.exports;
}
var sK = cK();
const fK = /* @__PURE__ */ tt(sK);
var ib = new fK(), ob = "recharts.syncMouseEvents";
function cc(e) {
  "@babel/helpers - typeof";
  return cc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cc(e);
}
function dK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function hK(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, hN(r.key), r);
  }
}
function pK(e, t, n) {
  return t && hK(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function lb(e, t, n) {
  return t = hN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function hN(e) {
  var t = vK(e, "string");
  return cc(t) == "symbol" ? t : t + "";
}
function vK(e, t) {
  if (cc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (cc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var yK = /* @__PURE__ */ (function() {
  function e() {
    dK(this, e), lb(this, "activeIndex", 0), lb(this, "coordinateList", []), lb(this, "layout", "horizontal");
  }
  return pK(e, [{
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
function mK(e, t, n) {
  if (n === "number" && t === !0 && Array.isArray(e)) {
    var r = e == null ? void 0 : e[0], o = e == null ? void 0 : e[1];
    if (r && o && de(r) && de(o))
      return !0;
  }
  return !1;
}
function gK(e, t, n, r) {
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
function pN(e) {
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
function bK(e, t, n) {
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
      return pN(t);
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
function $M(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Zs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $M(Object(n), !0).forEach(function(r) {
      xK(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $M(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function xK(e, t, n) {
  return t = SK(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function SK(e) {
  var t = _K(e, "string");
  return sc(t) == "symbol" ? t : t + "";
}
function _K(e, t) {
  if (sc(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (sc(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function OK(e) {
  var t, n, r = e.element, o = e.tooltipEventType, u = e.isActive, c = e.activeCoordinate, f = e.activePayload, d = e.offset, h = e.activeTooltipIndex, y = e.tooltipAxisBandSize, v = e.layout, g = e.chartName, b = (t = r.props.cursor) !== null && t !== void 0 ? t : (n = r.type.defaultProps) === null || n === void 0 ? void 0 : n.cursor;
  if (!r || !b || !u || !c || g !== "ScatterChart" && o !== "axis")
    return null;
  var _, S = pi;
  if (g === "ScatterChart")
    _ = c, S = X9;
  else if (g === "BarChart")
    _ = gK(v, c, d, y), S = N1;
  else if (v === "radial") {
    var x = pN(c), A = x.cx, T = x.cy, M = x.radius, C = x.startAngle, w = x.endAngle;
    _ = {
      cx: A,
      cy: T,
      startAngle: C,
      endAngle: w,
      innerRadius: M,
      outerRadius: M
    }, S = pP;
  } else
    _ = {
      points: bK(v, c, d)
    }, S = pi;
  var E = Zs(Zs(Zs(Zs({
    stroke: "#ccc",
    pointerEvents: "none"
  }, d), _), Te(b, !1)), {}, {
    payload: f,
    payloadIndex: h,
    className: $e("recharts-tooltip-cursor", b.className)
  });
  return /* @__PURE__ */ ee.isValidElement(b) ? /* @__PURE__ */ ee.cloneElement(b, E) : /* @__PURE__ */ ee.createElement(S, E);
}
var wK = ["item"], AK = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
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
function zM(e, t) {
  return jK(e) || EK(e, t) || yN(e, t) || TK();
}
function TK() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function EK(e, t) {
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
function jK(e) {
  if (Array.isArray(e)) return e;
}
function qM(e, t) {
  if (e == null) return {};
  var n = MK(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      r = u[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function MK(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function CK(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function DK(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, mN(r.key), r);
  }
}
function PK(e, t, n) {
  return t && DK(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function NK(e, t, n) {
  return t = ad(t), RK(e, vN() ? Reflect.construct(t, n || [], ad(e).constructor) : t.apply(e, n));
}
function RK(e, t) {
  if (t && (Jo(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $K(e);
}
function $K(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function vN() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (vN = function() {
    return !!e;
  })();
}
function ad(e) {
  return ad = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ad(e);
}
function zK(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && P0(e, t);
}
function P0(e, t) {
  return P0 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, P0(e, t);
}
function el(e) {
  return BK(e) || kK(e) || yN(e) || qK();
}
function qK() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yN(e, t) {
  if (e) {
    if (typeof e == "string") return N0(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return N0(e, t);
  }
}
function kK(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function BK(e) {
  if (Array.isArray(e)) return N0(e);
}
function N0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function kM(e, t) {
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
    t % 2 ? kM(Object(n), !0).forEach(function(r) {
      Oe(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kM(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Oe(e, t, n) {
  return t = mN(t), t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function mN(e) {
  var t = LK(e, "string");
  return Jo(t) == "symbol" ? t : t + "";
}
function LK(e, t) {
  if (Jo(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Jo(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var UK = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, IK = {
  width: "100%",
  height: "100%"
}, gN = {
  x: 0,
  y: 0
};
function Qs(e) {
  return e;
}
var HK = function(t, n) {
  return n === "horizontal" ? t.x : n === "vertical" ? t.y : n === "centric" ? t.angle : t.radius;
}, GK = function(t, n, r, o) {
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
  return gN;
}, Id = function(t, n) {
  var r = n.graphicalItems, o = n.dataStartIndex, u = n.dataEndIndex, c = (r ?? []).reduce(function(f, d) {
    var h = d.props.data;
    return h && h.length ? [].concat(el(f), el(h)) : f;
  }, []);
  return c.length > 0 ? c : t && t.length && de(o) && de(u) ? t.slice(o, u + 1) : [];
};
function bN(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var R0 = function(t, n, r, o) {
  var u = t.graphicalItems, c = t.tooltipAxis, f = Id(n, t);
  return r < 0 || !u || !u.length || r >= f.length ? null : u.reduce(function(d, h) {
    var y, v = (y = h.props.data) !== null && y !== void 0 ? y : n;
    v && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= r && (v = v.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var g;
    if (c.dataKey && !c.allowDuplicatedCategory) {
      var b = v === void 0 ? f : v;
      g = af(b, c.dataKey, o);
    } else
      g = v && v[r] || f[r];
    return g ? [].concat(el(d), [fP(h, g)]) : d;
  }, []);
}, BM = function(t, n, r, o) {
  var u = o || {
    x: t.chartX,
    y: t.chartY
  }, c = HK(u, r), f = t.orderedTooltipTicks, d = t.tooltipAxis, h = t.tooltipTicks, y = TL(c, f, h, d);
  if (y >= 0 && h) {
    var v = h[y] && h[y].value, g = R0(t, n, y, v), b = GK(r, f, y, u);
    return {
      activeTooltipIndex: y,
      activeLabel: v,
      activePayload: g,
      activeCoordinate: b
    };
  }
  return null;
}, YK = function(t, n) {
  var r = n.axes, o = n.graphicalItems, u = n.axisType, c = n.axisIdKey, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.layout, v = t.children, g = t.stackOffset, b = uP(y, u);
  return r.reduce(function(_, S) {
    var x, A = S.type.defaultProps !== void 0 ? ie(ie({}, S.type.defaultProps), S.props) : S.props, T = A.type, M = A.dataKey, C = A.allowDataOverflow, w = A.allowDuplicatedCategory, E = A.scale, j = A.ticks, N = A.includeHidden, R = A[c];
    if (_[R])
      return _;
    var k = Id(t.data, {
      graphicalItems: o.filter(function(I) {
        var re, se = c in I.props ? I.props[c] : (re = I.type.defaultProps) === null || re === void 0 ? void 0 : re[c];
        return se === R;
      }),
      dataStartIndex: d,
      dataEndIndex: h
    }), L = k.length, q, V, Y;
    mK(A.domain, C, T) && (q = Vb(A.domain, null, C), b && (T === "number" || E !== "auto") && (Y = _u(k, M, "category")));
    var F = bN(T);
    if (!q || q.length === 0) {
      var z, K = (z = A.domain) !== null && z !== void 0 ? z : F;
      if (M) {
        if (q = _u(k, M, T), T === "category" && b) {
          var ne = mz(q);
          w && ne ? (V = q, q = If(0, L)) : w || (q = F2(K, q, S).reduce(function(I, re) {
            return I.indexOf(re) >= 0 ? I : [].concat(el(I), [re]);
          }, []));
        } else if (T === "category")
          w ? q = q.filter(function(I) {
            return I !== "" && !we(I);
          }) : q = F2(K, q, S).reduce(function(I, re) {
            return I.indexOf(re) >= 0 || re === "" || we(re) ? I : [].concat(el(I), [re]);
          }, []);
        else if (T === "number") {
          var G = DL(k, o.filter(function(I) {
            var re, se, pe = c in I.props ? I.props[c] : (re = I.type.defaultProps) === null || re === void 0 ? void 0 : re[c], fe = "hide" in I.props ? I.props.hide : (se = I.type.defaultProps) === null || se === void 0 ? void 0 : se.hide;
            return pe === R && (N || !fe);
          }), M, u, y);
          G && (q = G);
        }
        b && (T === "number" || E !== "auto") && (Y = _u(k, M, "category"));
      } else b ? q = If(0, L) : f && f[R] && f[R].hasStack && T === "number" ? q = g === "expand" ? [0, 1] : sP(f[R].stackGroups, d, h) : q = lP(k, o.filter(function(I) {
        var re = c in I.props ? I.props[c] : I.type.defaultProps[c], se = "hide" in I.props ? I.props.hide : I.type.defaultProps.hide;
        return re === R && (N || !se);
      }), T, y, !0);
      if (T === "number")
        q = D0(v, q, R, u, j), K && (q = Vb(K, q, C));
      else if (T === "category" && K) {
        var J = K, P = q.every(function(I) {
          return J.indexOf(I) >= 0;
        });
        P && (q = J);
      }
    }
    return ie(ie({}, _), {}, Oe({}, R, ie(ie({}, A), {}, {
      axisType: u,
      domain: q,
      categoricalDomain: Y,
      duplicateDomain: V,
      originalDomain: (x = A.domain) !== null && x !== void 0 ? x : F,
      isCategorical: b,
      layout: y
    })));
  }, {});
}, KK = function(t, n) {
  var r = n.graphicalItems, o = n.Axis, u = n.axisType, c = n.axisIdKey, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.layout, v = t.children, g = Id(t.data, {
    graphicalItems: r,
    dataStartIndex: d,
    dataEndIndex: h
  }), b = g.length, _ = uP(y, u), S = -1;
  return r.reduce(function(x, A) {
    var T = A.type.defaultProps !== void 0 ? ie(ie({}, A.type.defaultProps), A.props) : A.props, M = T[c], C = bN("number");
    if (!x[M]) {
      S++;
      var w;
      return _ ? w = If(0, b) : f && f[M] && f[M].hasStack ? (w = sP(f[M].stackGroups, d, h), w = D0(v, w, M, u)) : (w = Vb(C, lP(g, r.filter(function(E) {
        var j, N, R = c in E.props ? E.props[c] : (j = E.type.defaultProps) === null || j === void 0 ? void 0 : j[c], k = "hide" in E.props ? E.props.hide : (N = E.type.defaultProps) === null || N === void 0 ? void 0 : N.hide;
        return R === M && !k;
      }), "number", y), o.defaultProps.allowDataOverflow), w = D0(v, w, M, u)), ie(ie({}, x), {}, Oe({}, M, ie(ie({
        axisType: u
      }, o.defaultProps), {}, {
        hide: !0,
        orientation: Bn(UK, "".concat(u, ".").concat(S % 2), null),
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
}, XK = function(t, n) {
  var r = n.axisType, o = r === void 0 ? "xAxis" : r, u = n.AxisComp, c = n.graphicalItems, f = n.stackGroups, d = n.dataStartIndex, h = n.dataEndIndex, y = t.children, v = "".concat(o, "Id"), g = on(y, u), b = {};
  return g && g.length ? b = YK(t, {
    axes: g,
    graphicalItems: c,
    axisType: o,
    axisIdKey: v,
    stackGroups: f,
    dataStartIndex: d,
    dataEndIndex: h
  }) : c && c.length && (b = KK(t, {
    Axis: u,
    graphicalItems: c,
    axisType: o,
    axisIdKey: v,
    stackGroups: f,
    dataStartIndex: d,
    dataEndIndex: h
  })), b;
}, VK = function(t) {
  var n = Ta(t), r = kr(n, !1, !0);
  return {
    tooltipTicks: r,
    orderedTooltipTicks: o1(r, function(o) {
      return o.coordinate;
    }),
    tooltipAxis: n,
    tooltipAxisBandSize: Pf(n, r)
  };
}, LM = function(t) {
  var n = t.children, r = t.defaultShowTooltip, o = xn(n, Uo), u = 0, c = 0;
  return t.data && t.data.length !== 0 && (c = t.data.length - 1), o && o.props && (o.props.startIndex >= 0 && (u = o.props.startIndex), o.props.endIndex >= 0 && (c = o.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: u,
    dataEndIndex: c,
    activeTooltipIndex: -1,
    isTooltipActive: !!r
  };
}, FK = function(t) {
  return !t || !t.length ? !1 : t.some(function(n) {
    var r = Lr(n && n.type);
    return r && r.indexOf("Bar") >= 0;
  });
}, UM = function(t) {
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
}, WK = function(t, n) {
  var r = t.props, o = t.graphicalItems, u = t.xAxisMap, c = u === void 0 ? {} : u, f = t.yAxisMap, d = f === void 0 ? {} : f, h = r.width, y = r.height, v = r.children, g = r.margin || {}, b = xn(v, Uo), _ = xn(v, Ao), S = Object.keys(d).reduce(function(w, E) {
    var j = d[E], N = j.orientation;
    return !j.mirror && !j.hide ? ie(ie({}, w), {}, Oe({}, N, w[N] + j.width)) : w;
  }, {
    left: g.left || 0,
    right: g.right || 0
  }), x = Object.keys(c).reduce(function(w, E) {
    var j = c[E], N = j.orientation;
    return !j.mirror && !j.hide ? ie(ie({}, w), {}, Oe({}, N, Bn(w, "".concat(N)) + j.height)) : w;
  }, {
    top: g.top || 0,
    bottom: g.bottom || 0
  }), A = ie(ie({}, x), S), T = A.bottom;
  b && (A.bottom += b.props.height || Uo.defaultProps.height), _ && n && (A = ML(A, o, r, n));
  var M = h - A.left - A.right, C = y - A.top - A.bottom;
  return ie(ie({
    brushBottom: T
  }, A), {}, {
    // never return negative values for height and width
    width: Math.max(M, 0),
    height: Math.max(C, 0)
  });
}, ZK = function(t, n) {
  if (n === "xAxis")
    return t[n].width;
  if (n === "yAxis")
    return t[n].height;
}, Hd = function(t) {
  var n = t.chartName, r = t.GraphicalChild, o = t.defaultTooltipEventType, u = o === void 0 ? "axis" : o, c = t.validateTooltipEventTypes, f = c === void 0 ? ["axis"] : c, d = t.axisComponents, h = t.legendContent, y = t.formatAxisMap, v = t.defaultProps, g = function(A, T) {
    var M = T.graphicalItems, C = T.stackGroups, w = T.offset, E = T.updateId, j = T.dataStartIndex, N = T.dataEndIndex, R = A.barSize, k = A.layout, L = A.barGap, q = A.barCategoryGap, V = A.maxBarSize, Y = UM(k), F = Y.numericAxisName, z = Y.cateAxisName, K = FK(M), ne = [];
    return M.forEach(function(G, J) {
      var P = Id(A.data, {
        graphicalItems: [G],
        dataStartIndex: j,
        dataEndIndex: N
      }), I = G.type.defaultProps !== void 0 ? ie(ie({}, G.type.defaultProps), G.props) : G.props, re = I.dataKey, se = I.maxBarSize, pe = I["".concat(F, "Id")], fe = I["".concat(z, "Id")], _e = {}, Ce = d.reduce(function(Kt, Xt) {
        var Zr = T["".concat(Xt.axisType, "Map")], Lt = I["".concat(Xt.axisType, "Id")];
        Zr && Zr[Lt] || Xt.axisType === "zAxis" || xi();
        var xc = Zr[Lt];
        return ie(ie({}, Kt), {}, Oe(Oe({}, Xt.axisType, xc), "".concat(Xt.axisType, "Ticks"), kr(xc)));
      }, _e), ce = Ce[z], ge = Ce["".concat(z, "Ticks")], he = C && C[pe] && C[pe].hasStack && HL(G, C[pe].stackGroups), ue = Lr(G.type).indexOf("Bar") >= 0, qe = Pf(ce, ge), xe = [], Qe = K && EL({
        barSize: R,
        stackGroups: C,
        totalSize: ZK(Ce, z)
      });
      if (ue) {
        var Ye, Et, un = we(se) ? V : se, Wt = (Ye = (Et = Pf(ce, ge, !0)) !== null && Et !== void 0 ? Et : un) !== null && Ye !== void 0 ? Ye : 0;
        xe = jL({
          barGap: L,
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
          key: G.key || "item-".concat(J)
        }, F, Ce[F]), z, Ce[z]), "animationId", E)),
        childIndex: Cz(G, A.children),
        item: G
      });
    }), ne;
  }, b = function(A, T) {
    var M = A.props, C = A.dataStartIndex, w = A.dataEndIndex, E = A.updateId;
    if (!sA({
      props: M
    }))
      return null;
    var j = M.children, N = M.layout, R = M.stackOffset, k = M.data, L = M.reverseStackOrder, q = UM(N), V = q.numericAxisName, Y = q.cateAxisName, F = on(j, r), z = LL(k, F, "".concat(V, "Id"), "".concat(Y, "Id"), R, L), K = d.reduce(function(I, re) {
      var se = "".concat(re.axisType, "Map");
      return ie(ie({}, I), {}, Oe({}, se, XK(M, ie(ie({}, re), {}, {
        graphicalItems: F,
        stackGroups: re.axisType === V && z,
        dataStartIndex: C,
        dataEndIndex: w
      }))));
    }, {}), ne = WK(ie(ie({}, K), {}, {
      props: M,
      graphicalItems: F
    }), T == null ? void 0 : T.legendBBox);
    Object.keys(K).forEach(function(I) {
      K[I] = y(M, K[I], ne, I.replace("Map", ""), n);
    });
    var G = K["".concat(Y, "Map")], J = VK(G), P = g(M, ie(ie({}, K), {}, {
      dataStartIndex: C,
      dataEndIndex: w,
      updateId: E,
      graphicalItems: F,
      stackGroups: z,
      offset: ne
    }));
    return ie(ie({
      formattedGraphicalItems: P,
      graphicalItems: F,
      offset: ne,
      stackGroups: z
    }, J), K);
  }, _ = /* @__PURE__ */ (function(x) {
    function A(T) {
      var M, C, w;
      return CK(this, A), w = NK(this, A, [T]), Oe(w, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), Oe(w, "accessibilityManager", new yK()), Oe(w, "handleLegendBBoxUpdate", function(E) {
        if (E) {
          var j = w.state, N = j.dataStartIndex, R = j.dataEndIndex, k = j.updateId;
          w.setState(ie({
            legendBBox: E
          }, b({
            props: w.props,
            dataStartIndex: N,
            dataEndIndex: R,
            updateId: k
          }, ie(ie({}, w.state), {}, {
            legendBBox: E
          }))));
        }
      }), Oe(w, "handleReceiveSyncEvent", function(E, j, N) {
        if (w.props.syncId === E) {
          if (N === w.eventEmitterSymbol && typeof w.props.syncMethod != "function")
            return;
          w.applySyncEvent(j);
        }
      }), Oe(w, "handleBrushChange", function(E) {
        var j = E.startIndex, N = E.endIndex;
        if (j !== w.state.dataStartIndex || N !== w.state.dataEndIndex) {
          var R = w.state.updateId;
          w.setState(function() {
            return ie({
              dataStartIndex: j,
              dataEndIndex: N
            }, b({
              props: w.props,
              dataStartIndex: j,
              dataEndIndex: N,
              updateId: R
            }, w.state));
          }), w.triggerSyncEvent({
            dataStartIndex: j,
            dataEndIndex: N
          });
        }
      }), Oe(w, "handleMouseEnter", function(E) {
        var j = w.getMouseInfo(E);
        if (j) {
          var N = ie(ie({}, j), {}, {
            isTooltipActive: !0
          });
          w.setState(N), w.triggerSyncEvent(N);
          var R = w.props.onMouseEnter;
          Ee(R) && R(N, E);
        }
      }), Oe(w, "triggeredAfterMouseMove", function(E) {
        var j = w.getMouseInfo(E), N = j ? ie(ie({}, j), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        w.setState(N), w.triggerSyncEvent(N);
        var R = w.props.onMouseMove;
        Ee(R) && R(N, E);
      }), Oe(w, "handleItemMouseEnter", function(E) {
        w.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: E,
            activePayload: E.tooltipPayload,
            activeCoordinate: E.tooltipPosition || {
              x: E.cx,
              y: E.cy
            }
          };
        });
      }), Oe(w, "handleItemMouseLeave", function() {
        w.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), Oe(w, "handleMouseMove", function(E) {
        E.persist(), w.throttleTriggeredAfterMouseMove(E);
      }), Oe(w, "handleMouseLeave", function(E) {
        w.throttleTriggeredAfterMouseMove.cancel();
        var j = {
          isTooltipActive: !1
        };
        w.setState(j), w.triggerSyncEvent(j);
        var N = w.props.onMouseLeave;
        Ee(N) && N(j, E);
      }), Oe(w, "handleOuterEvent", function(E) {
        var j = Mz(E), N = Bn(w.props, "".concat(j));
        if (j && Ee(N)) {
          var R, k;
          /.*touch.*/i.test(j) ? k = w.getMouseInfo(E.changedTouches[0]) : k = w.getMouseInfo(E), N((R = k) !== null && R !== void 0 ? R : {}, E);
        }
      }), Oe(w, "handleClick", function(E) {
        var j = w.getMouseInfo(E);
        if (j) {
          var N = ie(ie({}, j), {}, {
            isTooltipActive: !0
          });
          w.setState(N), w.triggerSyncEvent(N);
          var R = w.props.onClick;
          Ee(R) && R(N, E);
        }
      }), Oe(w, "handleMouseDown", function(E) {
        var j = w.props.onMouseDown;
        if (Ee(j)) {
          var N = w.getMouseInfo(E);
          j(N, E);
        }
      }), Oe(w, "handleMouseUp", function(E) {
        var j = w.props.onMouseUp;
        if (Ee(j)) {
          var N = w.getMouseInfo(E);
          j(N, E);
        }
      }), Oe(w, "handleTouchMove", function(E) {
        E.changedTouches != null && E.changedTouches.length > 0 && w.throttleTriggeredAfterMouseMove(E.changedTouches[0]);
      }), Oe(w, "handleTouchStart", function(E) {
        E.changedTouches != null && E.changedTouches.length > 0 && w.handleMouseDown(E.changedTouches[0]);
      }), Oe(w, "handleTouchEnd", function(E) {
        E.changedTouches != null && E.changedTouches.length > 0 && w.handleMouseUp(E.changedTouches[0]);
      }), Oe(w, "handleDoubleClick", function(E) {
        var j = w.props.onDoubleClick;
        if (Ee(j)) {
          var N = w.getMouseInfo(E);
          j(N, E);
        }
      }), Oe(w, "handleContextMenu", function(E) {
        var j = w.props.onContextMenu;
        if (Ee(j)) {
          var N = w.getMouseInfo(E);
          j(N, E);
        }
      }), Oe(w, "triggerSyncEvent", function(E) {
        w.props.syncId !== void 0 && ib.emit(ob, w.props.syncId, E, w.eventEmitterSymbol);
      }), Oe(w, "applySyncEvent", function(E) {
        var j = w.props, N = j.layout, R = j.syncMethod, k = w.state.updateId, L = E.dataStartIndex, q = E.dataEndIndex;
        if (E.dataStartIndex !== void 0 || E.dataEndIndex !== void 0)
          w.setState(ie({
            dataStartIndex: L,
            dataEndIndex: q
          }, b({
            props: w.props,
            dataStartIndex: L,
            dataEndIndex: q,
            updateId: k
          }, w.state)));
        else if (E.activeTooltipIndex !== void 0) {
          var V = E.chartX, Y = E.chartY, F = E.activeTooltipIndex, z = w.state, K = z.offset, ne = z.tooltipTicks;
          if (!K)
            return;
          if (typeof R == "function")
            F = R(ne, E);
          else if (R === "value") {
            F = -1;
            for (var G = 0; G < ne.length; G++)
              if (ne[G].value === E.activeLabel) {
                F = G;
                break;
              }
          }
          var J = ie(ie({}, K), {}, {
            x: K.left,
            y: K.top
          }), P = Math.min(V, J.x + J.width), I = Math.min(Y, J.y + J.height), re = ne[F] && ne[F].value, se = R0(w.state, w.props.data, F), pe = ne[F] ? {
            x: N === "horizontal" ? ne[F].coordinate : P,
            y: N === "horizontal" ? I : ne[F].coordinate
          } : gN;
          w.setState(ie(ie({}, E), {}, {
            activeLabel: re,
            activeCoordinate: pe,
            activePayload: se,
            activeTooltipIndex: F
          }));
        } else
          w.setState(E);
      }), Oe(w, "renderCursor", function(E) {
        var j, N = w.state, R = N.isTooltipActive, k = N.activeCoordinate, L = N.activePayload, q = N.offset, V = N.activeTooltipIndex, Y = N.tooltipAxisBandSize, F = w.getTooltipEventType(), z = (j = E.props.active) !== null && j !== void 0 ? j : R, K = w.props.layout, ne = E.key || "_recharts-cursor";
        return /* @__PURE__ */ U.createElement(OK, {
          key: ne,
          activeCoordinate: k,
          activePayload: L,
          activeTooltipIndex: V,
          chartName: n,
          element: E,
          isActive: z,
          layout: K,
          offset: q,
          tooltipAxisBandSize: Y,
          tooltipEventType: F
        });
      }), Oe(w, "renderPolarAxis", function(E, j, N) {
        var R = Bn(E, "type.axisType"), k = Bn(w.state, "".concat(R, "Map")), L = E.type.defaultProps, q = L !== void 0 ? ie(ie({}, L), E.props) : E.props, V = k && k[q["".concat(R, "Id")]];
        return /* @__PURE__ */ ee.cloneElement(E, ie(ie({}, V), {}, {
          className: $e(R, V.className),
          key: E.key || "".concat(j, "-").concat(N),
          ticks: kr(V, !0)
        }));
      }), Oe(w, "renderPolarGrid", function(E) {
        var j = E.props, N = j.radialLines, R = j.polarAngles, k = j.polarRadius, L = w.state, q = L.radiusAxisMap, V = L.angleAxisMap, Y = Ta(q), F = Ta(V), z = F.cx, K = F.cy, ne = F.innerRadius, G = F.outerRadius;
        return /* @__PURE__ */ ee.cloneElement(E, {
          polarAngles: Array.isArray(R) ? R : kr(F, !0).map(function(J) {
            return J.coordinate;
          }),
          polarRadius: Array.isArray(k) ? k : kr(Y, !0).map(function(J) {
            return J.coordinate;
          }),
          cx: z,
          cy: K,
          innerRadius: ne,
          outerRadius: G,
          key: E.key || "polar-grid",
          radialLines: N
        });
      }), Oe(w, "renderLegend", function() {
        var E = w.state.formattedGraphicalItems, j = w.props, N = j.children, R = j.width, k = j.height, L = w.props.margin || {}, q = R - (L.left || 0) - (L.right || 0), V = iP({
          children: N,
          formattedGraphicalItems: E,
          legendWidth: q,
          legendContent: h
        });
        if (!V)
          return null;
        var Y = V.item, F = qM(V, wK);
        return /* @__PURE__ */ ee.cloneElement(Y, ie(ie({}, F), {}, {
          chartWidth: R,
          chartHeight: k,
          margin: L,
          onBBoxUpdate: w.handleLegendBBoxUpdate
        }));
      }), Oe(w, "renderTooltip", function() {
        var E, j = w.props, N = j.children, R = j.accessibilityLayer, k = xn(N, Sn);
        if (!k)
          return null;
        var L = w.state, q = L.isTooltipActive, V = L.activeCoordinate, Y = L.activePayload, F = L.activeLabel, z = L.offset, K = (E = k.props.active) !== null && E !== void 0 ? E : q;
        return /* @__PURE__ */ ee.cloneElement(k, {
          viewBox: ie(ie({}, z), {}, {
            x: z.left,
            y: z.top
          }),
          active: K,
          label: F,
          payload: K ? Y : [],
          coordinate: V,
          accessibilityLayer: R
        });
      }), Oe(w, "renderBrush", function(E) {
        var j = w.props, N = j.margin, R = j.data, k = w.state, L = k.offset, q = k.dataStartIndex, V = k.dataEndIndex, Y = k.updateId;
        return /* @__PURE__ */ ee.cloneElement(E, {
          key: E.key || "_recharts-brush",
          onChange: Xs(w.handleBrushChange, E.props.onChange),
          data: R,
          x: de(E.props.x) ? E.props.x : L.left,
          y: de(E.props.y) ? E.props.y : L.top + L.height + L.brushBottom - (N.bottom || 0),
          width: de(E.props.width) ? E.props.width : L.width,
          startIndex: q,
          endIndex: V,
          updateId: "brush-".concat(Y)
        });
      }), Oe(w, "renderReferenceElement", function(E, j, N) {
        if (!E)
          return null;
        var R = w, k = R.clipPathId, L = w.state, q = L.xAxisMap, V = L.yAxisMap, Y = L.offset, F = E.type.defaultProps || {}, z = E.props, K = z.xAxisId, ne = K === void 0 ? F.xAxisId : K, G = z.yAxisId, J = G === void 0 ? F.yAxisId : G;
        return /* @__PURE__ */ ee.cloneElement(E, {
          key: E.key || "".concat(j, "-").concat(N),
          xAxis: q[ne],
          yAxis: V[J],
          viewBox: {
            x: Y.left,
            y: Y.top,
            width: Y.width,
            height: Y.height
          },
          clipPathId: k
        });
      }), Oe(w, "renderActivePoints", function(E) {
        var j = E.item, N = E.activePoint, R = E.basePoint, k = E.childIndex, L = E.isRange, q = [], V = j.props.key, Y = j.item.type.defaultProps !== void 0 ? ie(ie({}, j.item.type.defaultProps), j.item.props) : j.item.props, F = Y.activeDot, z = Y.dataKey, K = ie(ie({
          index: k,
          dataKey: z,
          cx: N.x,
          cy: N.y,
          r: 4,
          fill: P1(j.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: N.payload,
          value: N.value
        }, Te(F, !1)), of(F));
        return q.push(A.renderActiveDot(F, K, "".concat(V, "-activePoint-").concat(k))), R ? q.push(A.renderActiveDot(F, ie(ie({}, K), {}, {
          cx: R.x,
          cy: R.y
        }), "".concat(V, "-basePoint-").concat(k))) : L && q.push(null), q;
      }), Oe(w, "renderGraphicChild", function(E, j, N) {
        var R = w.filterFormatItem(E, j, N);
        if (!R)
          return null;
        var k = w.getTooltipEventType(), L = w.state, q = L.isTooltipActive, V = L.tooltipAxis, Y = L.activeTooltipIndex, F = L.activeLabel, z = w.props.children, K = xn(z, Sn), ne = R.props, G = ne.points, J = ne.isRange, P = ne.baseLine, I = R.item.type.defaultProps !== void 0 ? ie(ie({}, R.item.type.defaultProps), R.item.props) : R.item.props, re = I.activeDot, se = I.hide, pe = I.activeBar, fe = I.activeShape, _e = !!(!se && q && K && (re || pe || fe)), Ce = {};
        k !== "axis" && K && K.props.trigger === "click" ? Ce = {
          onClick: Xs(w.handleItemMouseEnter, E.props.onClick)
        } : k !== "axis" && (Ce = {
          onMouseLeave: Xs(w.handleItemMouseLeave, E.props.onMouseLeave),
          onMouseEnter: Xs(w.handleItemMouseEnter, E.props.onMouseEnter)
        });
        var ce = /* @__PURE__ */ ee.cloneElement(E, ie(ie({}, R.props), Ce));
        function ge(Xt) {
          return typeof V.dataKey == "function" ? V.dataKey(Xt.payload) : null;
        }
        if (_e)
          if (Y >= 0) {
            var he, ue;
            if (V.dataKey && !V.allowDuplicatedCategory) {
              var qe = typeof V.dataKey == "function" ? ge : "payload.".concat(V.dataKey.toString());
              he = af(G, qe, F), ue = J && P && af(P, qe, F);
            } else
              he = G == null ? void 0 : G[Y], ue = J && P && P[Y];
            if (fe || pe) {
              var xe = E.props.activeIndex !== void 0 ? E.props.activeIndex : Y;
              return [/* @__PURE__ */ ee.cloneElement(E, ie(ie(ie({}, R.props), Ce), {}, {
                activeIndex: xe
              })), null, null];
            }
            if (!we(he))
              return [ce].concat(el(w.renderActivePoints({
                item: R,
                activePoint: he,
                basePoint: ue,
                childIndex: Y,
                isRange: J
              })));
          } else {
            var Qe, Ye = (Qe = w.getItemByXY(w.state.activeCoordinate)) !== null && Qe !== void 0 ? Qe : {
              graphicalItem: ce
            }, Et = Ye.graphicalItem, un = Et.item, Wt = un === void 0 ? E : un, On = Et.childIndex, Kt = ie(ie(ie({}, R.props), Ce), {}, {
              activeIndex: On
            });
            return [/* @__PURE__ */ ee.cloneElement(Wt, Kt), null, null];
          }
        return J ? [ce, null, null] : [ce, null];
      }), Oe(w, "renderCustomized", function(E, j, N) {
        return /* @__PURE__ */ ee.cloneElement(E, ie(ie({
          key: "recharts-customized-".concat(N)
        }, w.props), w.state));
      }), Oe(w, "renderMap", {
        CartesianGrid: {
          handler: Qs,
          once: !0
        },
        ReferenceArea: {
          handler: w.renderReferenceElement
        },
        ReferenceLine: {
          handler: Qs
        },
        ReferenceDot: {
          handler: w.renderReferenceElement
        },
        XAxis: {
          handler: Qs
        },
        YAxis: {
          handler: Qs
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
      }), w.clipPathId = "".concat((M = T.id) !== null && M !== void 0 ? M : Oi("recharts"), "-clip"), w.throttleTriggeredAfterMouseMove = oD(w.triggeredAfterMouseMove, (C = T.throttleDelay) !== null && C !== void 0 ? C : 1e3 / 60), w.state = {}, w;
    }
    return zK(A, x), PK(A, [{
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
        var M = this.props, C = M.children, w = M.data, E = M.height, j = M.layout, N = xn(C, Sn);
        if (N) {
          var R = N.props.defaultIndex;
          if (!(typeof R != "number" || R < 0 || R > this.state.tooltipTicks.length - 1)) {
            var k = this.state.tooltipTicks[R] && this.state.tooltipTicks[R].value, L = R0(this.state, w, R, k), q = this.state.tooltipTicks[R].coordinate, V = (this.state.offset.top + E) / 2, Y = j === "horizontal", F = Y ? {
              x: q,
              y: V
            } : {
              y: q,
              x: V
            }, z = this.state.formattedGraphicalItems.find(function(ne) {
              var G = ne.item;
              return G.type.name === "Scatter";
            });
            z && (F = ie(ie({}, F), z.props.points[R].tooltipPosition), L = z.props.points[R].tooltipPayload);
            var K = {
              activeTooltipIndex: R,
              isTooltipActive: !0,
              activeLabel: k,
              activePayload: L,
              activeCoordinate: F
            };
            this.setState(K), this.renderCursor(N), this.accessibilityManager.setIndex(R);
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
          var w, E;
          this.accessibilityManager.setDetails({
            offset: {
              left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
              top: (E = this.props.margin.top) !== null && E !== void 0 ? E : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(M) {
        yb([xn(M.children, Sn)], [xn(this.props.children, Sn)]) || this.displayDefaultTooltip();
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
        var C = this.container, w = C.getBoundingClientRect(), E = yB(w), j = {
          chartX: Math.round(M.pageX - E.left),
          chartY: Math.round(M.pageY - E.top)
        }, N = w.width / C.offsetWidth || 1, R = this.inRange(j.chartX, j.chartY, N);
        if (!R)
          return null;
        var k = this.state, L = k.xAxisMap, q = k.yAxisMap, V = this.getTooltipEventType(), Y = BM(this.state, this.props.data, this.props.layout, R);
        if (V !== "axis" && L && q) {
          var F = Ta(L).scale, z = Ta(q).scale, K = F && F.invert ? F.invert(j.chartX) : null, ne = z && z.invert ? z.invert(j.chartY) : null;
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
        var w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, E = this.props.layout, j = M / w, N = C / w;
        if (E === "horizontal" || E === "vertical") {
          var R = this.state.offset, k = j >= R.left && j <= R.left + R.width && N >= R.top && N <= R.top + R.height;
          return k ? {
            x: j,
            y: N
          } : null;
        }
        var L = this.state, q = L.angleAxisMap, V = L.radiusAxisMap;
        if (q && V) {
          var Y = Ta(q);
          return Q2({
            x: j,
            y: N
          }, Y);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var M = this.props.children, C = this.getTooltipEventType(), w = xn(M, Sn), E = {};
        w && C === "axis" && (w.props.trigger === "click" ? E = {
          onClick: this.handleClick
        } : E = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var j = of(this.props, this.handleOuterEvent);
        return ie(ie({}, j), E);
      }
    }, {
      key: "addListener",
      value: function() {
        ib.on(ob, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        ib.removeListener(ob, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(M, C, w) {
        for (var E = this.state.formattedGraphicalItems, j = 0, N = E.length; j < N; j++) {
          var R = E[j];
          if (R.item === M || R.props.key === M.key || C === Lr(R.item.type) && w === R.childIndex)
            return R;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var M = this.clipPathId, C = this.state.offset, w = C.left, E = C.top, j = C.height, N = C.width;
        return /* @__PURE__ */ U.createElement("defs", null, /* @__PURE__ */ U.createElement("clipPath", {
          id: M
        }, /* @__PURE__ */ U.createElement("rect", {
          x: w,
          y: E,
          height: j,
          width: N
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var M = this.state.xAxisMap;
        return M ? Object.entries(M).reduce(function(C, w) {
          var E = zM(w, 2), j = E[0], N = E[1];
          return ie(ie({}, C), {}, Oe({}, j, N.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var M = this.state.yAxisMap;
        return M ? Object.entries(M).reduce(function(C, w) {
          var E = zM(w, 2), j = E[0], N = E[1];
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
        var C = this.state, w = C.formattedGraphicalItems, E = C.activeItem;
        if (w && w.length)
          for (var j = 0, N = w.length; j < N; j++) {
            var R = w[j], k = R.props, L = R.item, q = L.type.defaultProps !== void 0 ? ie(ie({}, L.type.defaultProps), L.props) : L.props, V = Lr(L.type);
            if (V === "Bar") {
              var Y = (k.data || []).find(function(ne) {
                return q9(M, ne);
              });
              if (Y)
                return {
                  graphicalItem: R,
                  payload: Y
                };
            } else if (V === "RadialBar") {
              var F = (k.data || []).find(function(ne) {
                return Q2(M, ne);
              });
              if (F)
                return {
                  graphicalItem: R,
                  payload: F
                };
            } else if (Dd(R, E) || Pd(R, E) || ac(R, E)) {
              var z = TH({
                graphicalItem: R,
                activeTooltipItem: E,
                itemData: q.data
              }), K = q.activeIndex === void 0 ? z : q.activeIndex;
              return {
                graphicalItem: ie(ie({}, R), {}, {
                  childIndex: K
                }),
                payload: ac(R, E) ? q.data[z] : R.props.data[z]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var M = this;
        if (!sA(this))
          return null;
        var C = this.props, w = C.children, E = C.className, j = C.width, N = C.height, R = C.style, k = C.compact, L = C.title, q = C.desc, V = qM(C, AK), Y = Te(V, !1);
        if (k)
          return /* @__PURE__ */ U.createElement(hM, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ U.createElement(gb, Oo({}, Y, {
            width: j,
            height: N,
            title: L,
            desc: q
          }), this.renderClipPath(), dA(w, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var F, z;
          Y.tabIndex = (F = this.props.tabIndex) !== null && F !== void 0 ? F : 0, Y.role = (z = this.props.role) !== null && z !== void 0 ? z : "application", Y.onKeyDown = function(ne) {
            M.accessibilityManager.keyboardEvent(ne);
          }, Y.onFocus = function() {
            M.accessibilityManager.focus();
          };
        }
        var K = this.parseEventsOfWrapper();
        return /* @__PURE__ */ U.createElement(hM, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ U.createElement("div", Oo({
          className: $e("recharts-wrapper", E),
          style: ie({
            position: "relative",
            cursor: "default",
            width: j,
            height: N
          }, R)
        }, K, {
          ref: function(G) {
            M.container = G;
          }
        }), /* @__PURE__ */ U.createElement(gb, Oo({}, Y, {
          width: j,
          height: N,
          title: L,
          desc: q,
          style: IK
        }), this.renderClipPath(), dA(w, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(ee.Component);
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
    var T = x.dataKey, M = x.data, C = x.children, w = x.width, E = x.height, j = x.layout, N = x.stackOffset, R = x.margin, k = A.dataStartIndex, L = A.dataEndIndex;
    if (A.updateId === void 0) {
      var q = LM(x);
      return ie(ie(ie({}, q), {}, {
        updateId: 0
      }, b(ie(ie({
        props: x
      }, q), {}, {
        updateId: 0
      }), A)), {}, {
        prevDataKey: T,
        prevData: M,
        prevWidth: w,
        prevHeight: E,
        prevLayout: j,
        prevStackOffset: N,
        prevMargin: R,
        prevChildren: C
      });
    }
    if (T !== A.prevDataKey || M !== A.prevData || w !== A.prevWidth || E !== A.prevHeight || j !== A.prevLayout || N !== A.prevStackOffset || !wo(R, A.prevMargin)) {
      var V = LM(x), Y = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: A.chartX,
        chartY: A.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: A.isTooltipActive
      }, F = ie(ie({}, BM(A, M, j)), {}, {
        updateId: A.updateId + 1
      }), z = ie(ie(ie({}, V), Y), F);
      return ie(ie(ie({}, z), b(ie({
        props: x
      }, z), A)), {}, {
        prevDataKey: T,
        prevData: M,
        prevWidth: w,
        prevHeight: E,
        prevLayout: j,
        prevStackOffset: N,
        prevMargin: R,
        prevChildren: C
      });
    }
    if (!yb(C, A.prevChildren)) {
      var K, ne, G, J, P = xn(C, Uo), I = P && (K = (ne = P.props) === null || ne === void 0 ? void 0 : ne.startIndex) !== null && K !== void 0 ? K : k, re = P && (G = (J = P.props) === null || J === void 0 ? void 0 : J.endIndex) !== null && G !== void 0 ? G : L, se = I !== k || re !== L, pe = !we(M), fe = pe && !se ? A.updateId : A.updateId + 1;
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
  }), Oe(_, "renderActiveDot", function(x, A, T) {
    var M;
    return /* @__PURE__ */ ee.isValidElement(x) ? M = /* @__PURE__ */ ee.cloneElement(x, A) : Ee(x) ? M = x(A) : M = /* @__PURE__ */ U.createElement(Cd, A), /* @__PURE__ */ U.createElement(Ie, {
      className: "recharts-active-dot",
      key: T
    }, M);
  });
  var S = /* @__PURE__ */ ee.forwardRef(function(A, T) {
    return /* @__PURE__ */ U.createElement(_, Oo({}, A, {
      ref: T
    }));
  });
  return S.displayName = _.displayName, S;
}, QK = Hd({
  chartName: "LineChart",
  GraphicalChild: Br,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }],
  formatAxisMap: Rd
}), JK = Hd({
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
  formatAxisMap: Rd
}), eX = Hd({
  chartName: "AreaChart",
  GraphicalChild: Wr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }],
  formatAxisMap: Rd
}), tX = Hd({
  chartName: "ComposedChart",
  GraphicalChild: [Br, Wr, Kr, Ud],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: sr
  }, {
    axisType: "zAxis",
    AxisComp: Ld
  }],
  formatAxisMap: Rd
});
function Js(e, t) {
  let n = 0, r = 0;
  for (const u of t)
    u == null || !isFinite(u) || (u < n && (n = u), u > r && (r = u));
  let o = 1;
  for (const u of [n, r]) o = Math.max(o, e(u).length);
  return Math.min(90, Math.ceil(o * 7) + 14);
}
const ef = { top: 8, right: 12, bottom: 0, left: 0 }, IM = [
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
], go = "var(--nb-border)", $0 = "var(--nb-muted)", z0 = "var(--nb-text)", tf = "var(--nb-accent)", bo = "var(--nb-green)", HM = "var(--nb-red)", Oa = { fill: $0, fontSize: 12 }, nf = {
  backgroundColor: "var(--nb-panel-2)",
  border: "1px solid var(--nb-border)",
  borderRadius: 8,
  color: z0,
  fontSize: 13
};
function nX({
  rows: e,
  accounts: t,
  mode: n,
  range: r,
  masked: o = !1,
  compact: u = !0
}) {
  const c = r === "1d" || r === "1w", f = KO(Date.now()), d = e.some((j) => KO(j.ts) !== f), h = (j, N = !1) => r$(j, N, d), y = (j) => h(j, c), v = (j, N) => N !== 0 ? (j - N) / Math.abs(N) : null, g = u ? FM : or, b = (j) => o ? Eu(j) : g(j), _ = (j) => o ? Eu(j) : or(j, !0);
  if (n === "flow") {
    const j = w$(e, t, r), N = (k) => o ? k.toFixed(2) : fb(k), R = (k) => o ? k.toFixed(1) : g(k);
    return /* @__PURE__ */ $.jsx(Is, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(JK, { data: j, margin: ef, children: [
      /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
      /* @__PURE__ */ $.jsx(cr, { dataKey: "ts", tickFormatter: (k) => h(k), tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ $.jsx(sr, { tickFormatter: (k) => R(k), tick: Oa, width: Js(R, j.map((k) => k.flow)) }),
      /* @__PURE__ */ $.jsx(
        Sn,
        {
          contentStyle: nf,
          labelFormatter: (k) => h(k),
          formatter: (k) => [N(k), "Net flow"],
          cursor: { fill: go, fillOpacity: 0.4 }
        }
      ),
      /* @__PURE__ */ $.jsx(Kr, { dataKey: "flow", radius: [3, 3, 0, 0], isAnimationActive: !1, children: j.map((k, L) => /* @__PURE__ */ $.jsx(xd, { fill: k.flow >= 0 ? bo : HM, fillOpacity: 0.8 }, L)) })
    ] }) });
  }
  if (n === "total") {
    const j = Vn(e[0], t), N = e.map((R) => {
      const k = Vn(R, t);
      return { ts: R.ts, total: o ? v(k, j) : k };
    });
    return /* @__PURE__ */ $.jsx(Is, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(eX, { data: N, margin: ef, children: [
      /* @__PURE__ */ $.jsxs("defs", { children: [
        /* @__PURE__ */ $.jsxs("linearGradient", { id: "nw", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ $.jsx("stop", { offset: "0%", stopColor: tf, stopOpacity: 0.22 }),
          /* @__PURE__ */ $.jsx("stop", { offset: "100%", stopColor: tf, stopOpacity: 0 })
        ] }),
        /* @__PURE__ */ $.jsxs("linearGradient", { id: "nwline", x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ $.jsx("stop", { offset: "0%", stopColor: tf }),
          /* @__PURE__ */ $.jsx("stop", { offset: "100%", stopColor: bo })
        ] })
      ] }),
      /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
      /* @__PURE__ */ $.jsx(cr, { dataKey: "ts", tickFormatter: y, tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ $.jsx(sr, { tickFormatter: b, tick: Oa, width: Js(b, N.map((R) => R.total)), domain: ["auto", "auto"] }),
      /* @__PURE__ */ $.jsx(
        Sn,
        {
          contentStyle: nf,
          labelFormatter: (R) => h(R, !0),
          formatter: (R) => [_(R), "Total"]
        }
      ),
      /* @__PURE__ */ $.jsx(
        Wr,
        {
          type: "monotone",
          dataKey: "total",
          stroke: "url(#nwline)",
          strokeWidth: 2.5,
          fill: "url(#nw)",
          dot: (R) => {
            const { cx: k, cy: L, index: q, key: V } = R;
            return q !== N.length - 1 || k == null || L == null ? /* @__PURE__ */ $.jsx("g", {}, V) : /* @__PURE__ */ $.jsxs("g", { children: [
              /* @__PURE__ */ $.jsx("circle", { cx: k, cy: L, r: 8, fill: bo, fillOpacity: 0.25 }),
              /* @__PURE__ */ $.jsx("circle", { cx: k, cy: L, r: 4, fill: bo })
            ] }, V);
          },
          activeDot: { r: 4, fill: bo, stroke: "none" },
          isAnimationActive: !1
        }
      )
    ] }) });
  }
  if (n === "category") {
    const j = (k) => k.category === "retirement", N = {
      retirement: Vn(e[0], t, j),
      other: Vn(e[0], t, (k) => !j(k)),
      debt: hb(e[0], t)
    }, R = e.map((k) => {
      const L = Vn(k, t, j), q = Vn(k, t, (Y) => !j(Y)), V = hb(k, t);
      return o ? {
        ts: k.ts,
        retirement: v(L, N.retirement),
        other: v(q, N.other),
        debt: v(V, N.debt)
      } : { ts: k.ts, retirement: L, other: q, debt: V };
    });
    return /* @__PURE__ */ $.jsx(Is, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(QK, { data: R, margin: ef, children: [
      /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
      /* @__PURE__ */ $.jsx(cr, { dataKey: "ts", tickFormatter: y, tick: Oa, minTickGap: 40 }),
      /* @__PURE__ */ $.jsx(
        sr,
        {
          tickFormatter: b,
          tick: Oa,
          width: Js(b, R.flatMap((k) => [k.retirement, k.other, k.debt])),
          domain: ["auto", "auto"]
        }
      ),
      /* @__PURE__ */ $.jsx(
        Sn,
        {
          contentStyle: nf,
          labelFormatter: (k) => h(k, !0),
          formatter: (k, L) => [_(k), L]
        }
      ),
      /* @__PURE__ */ $.jsx(Br, { type: "monotone", dataKey: "retirement", stroke: bo, strokeWidth: 2, dot: !1, isAnimationActive: !1 }),
      /* @__PURE__ */ $.jsx(Br, { type: "monotone", dataKey: "other", stroke: tf, strokeWidth: 2, dot: !1, isAnimationActive: !1 }),
      /* @__PURE__ */ $.jsx(Br, { type: "monotone", dataKey: "debt", stroke: HM, strokeWidth: 2, dot: !1, isAnimationActive: !1 })
    ] }) });
  }
  const S = (j) => o ? `${j >= 0 ? "+" : ""}${j.toFixed(2)}` : fb(j), x = (j) => o ? j.toFixed(1) : g(j), A = A$(e, t, r), T = t.filter(
    (j) => A.some((N) => Math.abs(N.deltas[j.id] ?? 0) > 4e-3)
  ), M = A.map((j) => {
    const N = { ts: j.ts, net: j.net };
    for (const R of T) N[`a${R.id}`] = j.deltas[R.id] ?? 0;
    return N;
  }), C = A.flatMap((j) => {
    let N = 0, R = 0;
    for (const k of T) {
      const L = j.deltas[k.id] ?? 0;
      L >= 0 ? N += L : R += L;
    }
    return [N, R];
  }), w = (j) => `${j.org_name || j.org_domain} · ${j.nickname || j.name}`, E = ({
    active: j,
    payload: N,
    label: R
  }) => {
    if (!j || !N || N.length === 0) return null;
    const k = N.filter((q) => q.dataKey !== "net" && Math.abs(Number(q.value)) > 4e-3).sort((q, V) => Math.abs(Number(V.value)) - Math.abs(Number(q.value))), L = N.find((q) => q.dataKey === "net");
    return /* @__PURE__ */ $.jsxs("div", { style: { ...nf, padding: "8px 12px" }, children: [
      /* @__PURE__ */ $.jsx("div", { style: { marginBottom: 4 }, children: h(R ?? 0) }),
      k.map((q) => {
        const V = T.find((Y) => `a${Y.id}` === q.dataKey);
        return /* @__PURE__ */ $.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 16 }, children: [
          /* @__PURE__ */ $.jsx("span", { style: { color: q.color }, children: V ? w(V) : String(q.dataKey) }),
          /* @__PURE__ */ $.jsx("span", { children: S(Number(q.value)) })
        ] }, String(q.dataKey));
      }),
      L && /* @__PURE__ */ $.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 16, marginTop: 4, color: $0 }, children: [
        /* @__PURE__ */ $.jsx("span", { children: "net" }),
        /* @__PURE__ */ $.jsx("span", { children: S(Number(L.value)) })
      ] })
    ] });
  };
  return /* @__PURE__ */ $.jsx(Is, { width: "100%", height: 340, children: /* @__PURE__ */ $.jsxs(tX, { data: M, stackOffset: "sign", margin: ef, children: [
    /* @__PURE__ */ $.jsx(bu, { stroke: go, strokeDasharray: "3 3" }),
    /* @__PURE__ */ $.jsx(cr, { dataKey: "ts", tickFormatter: (j) => h(j), tick: Oa, minTickGap: 40 }),
    /* @__PURE__ */ $.jsx(sr, { tickFormatter: x, tick: Oa, width: Js(x, C) }),
    /* @__PURE__ */ $.jsx(Sn, { content: /* @__PURE__ */ $.jsx(E, {}), cursor: { fill: go, fillOpacity: 0.4 } }),
    /* @__PURE__ */ $.jsx($d, { y: 0, stroke: $0, strokeOpacity: 0.6 }),
    T.map((j, N) => /* @__PURE__ */ $.jsx(
      Kr,
      {
        dataKey: `a${j.id}`,
        stackId: "delta",
        fill: IM[N % IM.length],
        fillOpacity: 0.8,
        isAnimationActive: !1
      },
      j.id
    )),
    /* @__PURE__ */ $.jsx(
      Br,
      {
        type: "monotone",
        dataKey: "net",
        stroke: z0,
        strokeWidth: 1.5,
        strokeOpacity: 0.65,
        strokeDasharray: "4 3",
        dot: { r: 2, fill: z0, strokeWidth: 0 },
        isAnimationActive: !1
      }
    )
  ] }) });
}
function xN({
  hass: e,
  config: t
}) {
  const n = jo.find((A) => A.key === (t.view ?? "all")) ?? jo[2], [r, o] = ee.useState(t.range ?? "6m"), [u, c] = ee.useState(
    t.mode && n.modes.includes(t.mode) ? t.mode : n.defaultMode
  ), { overview: f, series: d, masked: h, error: y } = L0(e, t.entry, r), v = nC(f), g = ee.useMemo(() => v.filter(n.pick), [v, n]), b = ee.useMemo(() => {
    if (!d) return [];
    const A = new Set(g.map((T) => T.id));
    return rC(d.filter((T) => A.has(T.account_id)));
  }, [d, g]), _ = t.show_controls !== !1, S = _ && t.show_mode_selector !== !1 && n.modes.length > 1, x = _ && t.show_range_selector !== !1;
  return /* @__PURE__ */ $.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ $.jsx(tl, { effect: nl(t) }),
    /* @__PURE__ */ $.jsxs("div", { className: "head", children: [
      /* @__PURE__ */ $.jsx("h2", { children: t.title ?? n.label }),
      /* @__PURE__ */ $.jsx("span", { className: "head-right", children: (S || x) && /* @__PURE__ */ $.jsxs("span", { className: "controls", children: [
        S && /* @__PURE__ */ $.jsx(rf, { options: n.modes, value: u, onChange: c }),
        x && /* @__PURE__ */ $.jsx(rf, { options: B0, value: r, onChange: o })
      ] }) })
    ] }),
    y && /* @__PURE__ */ $.jsx("div", { className: "error-box", children: y }),
    !y && (!f || !d) && /* @__PURE__ */ $.jsx("div", { className: "status", children: "Loading…" }),
    !y && f && d && b.length === 0 && /* @__PURE__ */ $.jsx("div", { className: "status", children: "No data for this view yet." }),
    !y && f && d && b.length > 0 && /* @__PURE__ */ $.jsx(
      nX,
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
function rX({ hass: e, config: t }) {
  const [n, r] = dc(e, t.month_group);
  return /* @__PURE__ */ $.jsxs("div", { className: "card reporting-month-card", children: [
    /* @__PURE__ */ $.jsx("h2", { children: t.title ?? "Reporting month" }),
    /* @__PURE__ */ $.jsxs("div", { className: "reporting-month-controls", children: [
      /* @__PURE__ */ $.jsx(id, { month: n, onChange: r, picker: !0 }),
      /* @__PURE__ */ $.jsx("span", { className: "seg", children: /* @__PURE__ */ $.jsx("button", { disabled: n === vi(), onClick: () => r(vi()), children: "This month" }) })
    ] })
  ] });
}
var ub = { exports: {} }, vu = {}, cb = { exports: {} }, sb = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GM;
function aX() {
  return GM || (GM = 1, (function(e) {
    function t(z, K) {
      var ne = z.length;
      z.push(K);
      e: for (; 0 < ne; ) {
        var G = ne - 1 >>> 1, J = z[G];
        if (0 < o(J, K))
          z[G] = K, z[ne] = J, ne = G;
        else break e;
      }
    }
    function n(z) {
      return z.length === 0 ? null : z[0];
    }
    function r(z) {
      if (z.length === 0) return null;
      var K = z[0], ne = z.pop();
      if (ne !== K) {
        z[0] = ne;
        e: for (var G = 0, J = z.length, P = J >>> 1; G < P; ) {
          var I = 2 * (G + 1) - 1, re = z[I], se = I + 1, pe = z[se];
          if (0 > o(re, ne))
            se < J && 0 > o(pe, re) ? (z[G] = pe, z[se] = ne, G = se) : (z[G] = re, z[I] = ne, G = I);
          else if (se < J && 0 > o(pe, ne))
            z[G] = pe, z[se] = ne, G = se;
          else break e;
        }
      }
      return K;
    }
    function o(z, K) {
      var ne = z.sortIndex - K.sortIndex;
      return ne !== 0 ? ne : z.id - K.id;
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
    var d = [], h = [], y = 1, v = null, g = 3, b = !1, _ = !1, S = !1, x = !1, A = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
    function C(z) {
      for (var K = n(h); K !== null; ) {
        if (K.callback === null) r(h);
        else if (K.startTime <= z)
          r(h), K.sortIndex = K.expirationTime, t(d, K);
        else break;
        K = n(h);
      }
    }
    function w(z) {
      if (S = !1, C(z), !_)
        if (n(d) !== null)
          _ = !0, E || (E = !0, q());
        else {
          var K = n(h);
          K !== null && F(w, K.startTime - z);
        }
    }
    var E = !1, j = -1, N = 5, R = -1;
    function k() {
      return x ? !0 : !(e.unstable_now() - R < N);
    }
    function L() {
      if (x = !1, E) {
        var z = e.unstable_now();
        R = z;
        var K = !0;
        try {
          e: {
            _ = !1, S && (S = !1, T(j), j = -1), b = !0;
            var ne = g;
            try {
              t: {
                for (C(z), v = n(d); v !== null && !(v.expirationTime > z && k()); ) {
                  var G = v.callback;
                  if (typeof G == "function") {
                    v.callback = null, g = v.priorityLevel;
                    var J = G(
                      v.expirationTime <= z
                    );
                    if (z = e.unstable_now(), typeof J == "function") {
                      v.callback = J, C(z), K = !0;
                      break t;
                    }
                    v === n(d) && r(d), C(z);
                  } else r(d);
                  v = n(d);
                }
                if (v !== null) K = !0;
                else {
                  var P = n(h);
                  P !== null && F(
                    w,
                    P.startTime - z
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
          K ? q() : E = !1;
        }
      }
    }
    var q;
    if (typeof M == "function")
      q = function() {
        M(L);
      };
    else if (typeof MessageChannel < "u") {
      var V = new MessageChannel(), Y = V.port2;
      V.port1.onmessage = L, q = function() {
        Y.postMessage(null);
      };
    } else
      q = function() {
        A(L, 0);
      };
    function F(z, K) {
      j = A(function() {
        z(e.unstable_now());
      }, K);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, e.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : N = 0 < z ? Math.floor(1e3 / z) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return g;
    }, e.unstable_next = function(z) {
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
        return z();
      } finally {
        g = ne;
      }
    }, e.unstable_requestPaint = function() {
      x = !0;
    }, e.unstable_runWithPriority = function(z, K) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var ne = g;
      g = z;
      try {
        return K();
      } finally {
        g = ne;
      }
    }, e.unstable_scheduleCallback = function(z, K, ne) {
      var G = e.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? G + ne : G) : ne = G, z) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return J = ne + J, z = {
        id: y++,
        callback: K,
        priorityLevel: z,
        startTime: ne,
        expirationTime: J,
        sortIndex: -1
      }, ne > G ? (z.sortIndex = ne, t(h, z), n(d) === null && z === n(h) && (S ? (T(j), j = -1) : S = !0, F(w, ne - G))) : (z.sortIndex = J, t(d, z), _ || b || (_ = !0, E || (E = !0, q()))), z;
    }, e.unstable_shouldYield = k, e.unstable_wrapCallback = function(z) {
      var K = g;
      return function() {
        var ne = g;
        g = K;
        try {
          return z.apply(this, arguments);
        } finally {
          g = ne;
        }
      };
    };
  })(sb)), sb;
}
var YM;
function iX() {
  return YM || (YM = 1, cb.exports = aX()), cb.exports;
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
var KM;
function oX() {
  if (KM) return vu;
  KM = 1;
  var e = iX(), t = q0(), n = WM();
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
  var v = Object.assign, g = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), T = Symbol.for("react.consumer"), M = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), R = Symbol.for("react.activity"), k = Symbol.for("react.memo_cache_sentinel"), L = Symbol.iterator;
  function q(a) {
    return a === null || typeof a != "object" ? null : (a = L && a[L] || a["@@iterator"], typeof a == "function" ? a : null);
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
      case E:
        return "SuspenseList";
      case R:
        return "Activity";
    }
    if (typeof a == "object")
      switch (a.$$typeof) {
        case _:
          return "Portal";
        case M:
          return a.displayName || "Context";
        case T:
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
  var F = Array.isArray, z = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], J = -1;
  function P(a) {
    return { current: a };
  }
  function I(a) {
    0 > J || (a.current = G[J], G[J] = null, J--);
  }
  function re(a, i) {
    J++, G[J] = a.current, a.current = i;
  }
  var se = P(null), pe = P(null), fe = P(null), _e = P(null);
  function Ce(a, i) {
    switch (re(fe, i), re(pe, a), re(se, null), i.nodeType) {
      case 9:
      case 11:
        a = (a = i.documentElement) && (a = a.namespaceURI) ? fO(a) : 0;
        break;
      default:
        if (a = i.tagName, i = i.namespaceURI)
          i = fO(i), a = dO(i, a);
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
    var i = se.current, l = dO(i, a.type);
    i !== l && (re(pe, a), re(se, l));
  }
  function he(a) {
    pe.current === a && (I(se), I(pe)), _e.current === a && (I(_e), eu._currentValue = ne);
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
        var B = O.split(`
`), Z = D.split(`
`);
        for (p = s = 0; s < B.length && !B[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; p < Z.length && !Z[p].includes(
          "DetermineComponentFrameRoot"
        ); )
          p++;
        if (s === B.length || p === Z.length)
          for (s = B.length - 1, p = Z.length - 1; 1 <= s && 0 <= p && B[s] !== Z[p]; )
            p--;
        for (; 1 <= s && 0 <= p; s--, p--)
          if (B[s] !== Z[p]) {
            if (s !== 1 || p !== 1)
              do
                if (s--, p--, 0 > p || B[s] !== Z[p]) {
                  var ae = `
` + B[s].replace(" at new ", " at ");
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
  var Wt = Object.prototype.hasOwnProperty, On = e.unstable_scheduleCallback, Kt = e.unstable_cancelCallback, Xt = e.unstable_shouldYield, Zr = e.unstable_requestPaint, Lt = e.unstable_now, xc = e.unstable_getCurrentPriorityLevel, H1 = e.unstable_ImmediatePriority, G1 = e.unstable_UserBlockingPriority, Sc = e.unstable_NormalPriority, ON = e.unstable_LowPriority, Y1 = e.unstable_IdlePriority, wN = e.log, AN = e.unstable_setDisableYieldValue, dl = null, cn = null;
  function Qr(a) {
    if (typeof wN == "function" && AN(a), cn && typeof cn.setStrictMode == "function")
      try {
        cn.setStrictMode(dl, a);
      } catch {
      }
  }
  var sn = Math.clz32 ? Math.clz32 : jN, TN = Math.log, EN = Math.LN2;
  function jN(a) {
    return a >>>= 0, a === 0 ? 32 : 31 - (TN(a) / EN | 0) | 0;
  }
  var _c = 256, Oc = 262144, wc = 4194304;
  function La(a) {
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
  function Ac(a, i, l) {
    var s = a.pendingLanes;
    if (s === 0) return 0;
    var p = 0, m = a.suspendedLanes, O = a.pingedLanes;
    a = a.warmLanes;
    var D = s & 134217727;
    return D !== 0 ? (s = D & ~m, s !== 0 ? p = La(s) : (O &= D, O !== 0 ? p = La(O) : l || (l = D & ~a, l !== 0 && (p = La(l))))) : (D = s & ~m, D !== 0 ? p = La(D) : O !== 0 ? p = La(O) : l || (l = s & ~a, l !== 0 && (p = La(l)))), p === 0 ? 0 : i !== 0 && i !== p && (i & m) === 0 && (m = p & -p, l = i & -i, m >= l || m === 32 && (l & 4194048) !== 0) ? i : p;
  }
  function hl(a, i) {
    return (a.pendingLanes & ~(a.suspendedLanes & ~a.pingedLanes) & i) === 0;
  }
  function MN(a, i) {
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
  function K1() {
    var a = wc;
    return wc <<= 1, (wc & 62914560) === 0 && (wc = 4194304), a;
  }
  function Kd(a) {
    for (var i = [], l = 0; 31 > l; l++) i.push(a);
    return i;
  }
  function pl(a, i) {
    a.pendingLanes |= i, i !== 268435456 && (a.suspendedLanes = 0, a.pingedLanes = 0, a.warmLanes = 0);
  }
  function CN(a, i, l, s, p, m) {
    var O = a.pendingLanes;
    a.pendingLanes = l, a.suspendedLanes = 0, a.pingedLanes = 0, a.warmLanes = 0, a.expiredLanes &= l, a.entangledLanes &= l, a.errorRecoveryDisabledLanes &= l, a.shellSuspendCounter = 0;
    var D = a.entanglements, B = a.expirationTimes, Z = a.hiddenUpdates;
    for (l = O & ~l; 0 < l; ) {
      var ae = 31 - sn(l), le = 1 << ae;
      D[ae] = 0, B[ae] = -1;
      var Q = Z[ae];
      if (Q !== null)
        for (Z[ae] = null, ae = 0; ae < Q.length; ae++) {
          var te = Q[ae];
          te !== null && (te.lane &= -536870913);
        }
      l &= ~le;
    }
    s !== 0 && X1(a, s, 0), m !== 0 && p === 0 && a.tag !== 0 && (a.suspendedLanes |= m & ~(O & ~i));
  }
  function X1(a, i, l) {
    a.pendingLanes |= i, a.suspendedLanes &= ~i;
    var s = 31 - sn(i);
    a.entangledLanes |= i, a.entanglements[s] = a.entanglements[s] | 1073741824 | l & 261930;
  }
  function V1(a, i) {
    var l = a.entangledLanes |= i;
    for (a = a.entanglements; l; ) {
      var s = 31 - sn(l), p = 1 << s;
      p & i | a[s] & i && (a[s] |= i), l &= ~p;
    }
  }
  function F1(a, i) {
    var l = i & -i;
    return l = (l & 42) !== 0 ? 1 : Xd(l), (l & (a.suspendedLanes | i)) !== 0 ? 0 : l;
  }
  function Xd(a) {
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
  function Vd(a) {
    return a &= -a, 2 < a ? 8 < a ? (a & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function W1() {
    var a = K.p;
    return a !== 0 ? a : (a = window.event, a === void 0 ? 32 : $O(a.type));
  }
  function Z1(a, i) {
    var l = K.p;
    try {
      return K.p = a, i();
    } finally {
      K.p = l;
    }
  }
  var Jr = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + Jr, Zt = "__reactProps$" + Jr, Mi = "__reactContainer$" + Jr, Fd = "__reactEvents$" + Jr, DN = "__reactListeners$" + Jr, PN = "__reactHandles$" + Jr, Q1 = "__reactResources$" + Jr, vl = "__reactMarker$" + Jr;
  function Wd(a) {
    delete a[Pt], delete a[Zt], delete a[Fd], delete a[DN], delete a[PN];
  }
  function Ci(a) {
    var i = a[Pt];
    if (i) return i;
    for (var l = a.parentNode; l; ) {
      if (i = l[Mi] || l[Pt]) {
        if (l = i.alternate, i.child !== null || l !== null && l.child !== null)
          for (a = bO(a); a !== null; ) {
            if (l = a[Pt]) return l;
            a = bO(a);
          }
        return i;
      }
      a = l, l = a.parentNode;
    }
    return null;
  }
  function Di(a) {
    if (a = a[Pt] || a[Mi]) {
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
    var i = a[Q1];
    return i || (i = a[Q1] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), i;
  }
  function jt(a) {
    a[vl] = !0;
  }
  var J1 = /* @__PURE__ */ new Set(), ex = {};
  function Ua(a, i) {
    Ni(a, i), Ni(a + "Capture", i);
  }
  function Ni(a, i) {
    for (ex[a] = i, a = 0; a < i.length; a++)
      J1.add(i[a]);
  }
  var NN = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), tx = {}, nx = {};
  function RN(a) {
    return Wt.call(nx, a) ? !0 : Wt.call(tx, a) ? !1 : NN.test(a) ? nx[a] = !0 : (tx[a] = !0, !1);
  }
  function Tc(a, i, l) {
    if (RN(i))
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
  function Ec(a, i, l) {
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
  function rx(a) {
    var i = a.type;
    return (a = a.nodeName) && a.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function $N(a, i, l) {
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
  function Zd(a) {
    if (!a._valueTracker) {
      var i = rx(a) ? "checked" : "value";
      a._valueTracker = $N(
        a,
        i,
        "" + a[i]
      );
    }
  }
  function ax(a) {
    if (!a) return !1;
    var i = a._valueTracker;
    if (!i) return !0;
    var l = i.getValue(), s = "";
    return a && (s = rx(a) ? a.checked ? "true" : "false" : a.value), a = s, a !== l ? (i.setValue(a), !0) : !1;
  }
  function jc(a) {
    if (a = a || (typeof document < "u" ? document : void 0), typeof a > "u") return null;
    try {
      return a.activeElement || a.body;
    } catch {
      return a.body;
    }
  }
  var zN = /[\n"\\]/g;
  function An(a) {
    return a.replace(
      zN,
      function(i) {
        return "\\" + i.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Qd(a, i, l, s, p, m, O, D) {
    a.name = "", O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" ? a.type = O : a.removeAttribute("type"), i != null ? O === "number" ? (i === 0 && a.value === "" || a.value != i) && (a.value = "" + wn(i)) : a.value !== "" + wn(i) && (a.value = "" + wn(i)) : O !== "submit" && O !== "reset" || a.removeAttribute("value"), i != null ? Jd(a, O, wn(i)) : l != null ? Jd(a, O, wn(l)) : s != null && a.removeAttribute("value"), p == null && m != null && (a.defaultChecked = !!m), p != null && (a.checked = p && typeof p != "function" && typeof p != "symbol"), D != null && typeof D != "function" && typeof D != "symbol" && typeof D != "boolean" ? a.name = "" + wn(D) : a.removeAttribute("name");
  }
  function ix(a, i, l, s, p, m, O, D) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (a.type = m), i != null || l != null) {
      if (!(m !== "submit" && m !== "reset" || i != null)) {
        Zd(a);
        return;
      }
      l = l != null ? "" + wn(l) : "", i = i != null ? "" + wn(i) : l, D || i === a.value || (a.value = i), a.defaultValue = i;
    }
    s = s ?? p, s = typeof s != "function" && typeof s != "symbol" && !!s, a.checked = D ? a.checked : !!s, a.defaultChecked = !!s, O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean" && (a.name = O), Zd(a);
  }
  function Jd(a, i, l) {
    i === "number" && jc(a.ownerDocument) === a || a.defaultValue === "" + l || (a.defaultValue = "" + l);
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
  function ox(a, i, l) {
    if (i != null && (i = "" + wn(i), i !== a.value && (a.value = i), l == null)) {
      a.defaultValue !== i && (a.defaultValue = i);
      return;
    }
    a.defaultValue = l != null ? "" + wn(l) : "";
  }
  function lx(a, i, l, s) {
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
    l = wn(i), a.defaultValue = l, s = a.textContent, s === l && s !== "" && s !== null && (a.value = s), Zd(a);
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
  var qN = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ux(a, i, l) {
    var s = i.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? s ? a.setProperty(i, "") : i === "float" ? a.cssFloat = "" : a[i] = "" : s ? a.setProperty(i, l) : typeof l != "number" || l === 0 || qN.has(i) ? i === "float" ? a.cssFloat = l : a[i] = ("" + l).trim() : a[i] = l + "px";
  }
  function cx(a, i, l) {
    if (i != null && typeof i != "object")
      throw Error(r(62));
    if (a = a.style, l != null) {
      for (var s in l)
        !l.hasOwnProperty(s) || i != null && i.hasOwnProperty(s) || (s.indexOf("--") === 0 ? a.setProperty(s, "") : s === "float" ? a.cssFloat = "" : a[s] = "");
      for (var p in i)
        s = i[p], i.hasOwnProperty(p) && l[p] !== s && ux(a, p, s);
    } else
      for (var m in i)
        i.hasOwnProperty(m) && ux(a, m, i[m]);
  }
  function eh(a) {
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
  var kN = /* @__PURE__ */ new Map([
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
  ]), BN = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Mc(a) {
    return BN.test("" + a) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : a;
  }
  function mr() {
  }
  var th = null;
  function nh(a) {
    return a = a.target || a.srcElement || window, a.correspondingUseElement && (a = a.correspondingUseElement), a.nodeType === 3 ? a.parentNode : a;
  }
  var zi = null, qi = null;
  function sx(a) {
    var i = Di(a);
    if (i && (a = i.stateNode)) {
      var l = a[Zt] || null;
      e: switch (a = i.stateNode, i.type) {
        case "input":
          if (Qd(
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
                Qd(
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
              s = l[i], s.form === a.form && ax(s);
          }
          break e;
        case "textarea":
          ox(a, l.value, l.defaultValue);
          break e;
        case "select":
          i = l.value, i != null && Ri(a, !!l.multiple, i, !1);
      }
    }
  }
  var rh = !1;
  function fx(a, i, l) {
    if (rh) return a(i, l);
    rh = !0;
    try {
      var s = a(i);
      return s;
    } finally {
      if (rh = !1, (zi !== null || qi !== null) && (ys(), zi && (i = zi, a = qi, qi = zi = null, sx(i), a)))
        for (i = 0; i < a.length; i++) sx(a[i]);
    }
  }
  function ml(a, i) {
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
  var gr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ah = !1;
  if (gr)
    try {
      var gl = {};
      Object.defineProperty(gl, "passive", {
        get: function() {
          ah = !0;
        }
      }), window.addEventListener("test", gl, gl), window.removeEventListener("test", gl, gl);
    } catch {
      ah = !1;
    }
  var ea = null, ih = null, Cc = null;
  function dx() {
    if (Cc) return Cc;
    var a, i = ih, l = i.length, s, p = "value" in ea ? ea.value : ea.textContent, m = p.length;
    for (a = 0; a < l && i[a] === p[a]; a++) ;
    var O = l - a;
    for (s = 1; s <= O && i[l - s] === p[m - s]; s++) ;
    return Cc = p.slice(a, 1 < s ? 1 - s : void 0);
  }
  function Dc(a) {
    var i = a.keyCode;
    return "charCode" in a ? (a = a.charCode, a === 0 && i === 13 && (a = 13)) : a = i, a === 10 && (a = 13), 32 <= a || a === 13 ? a : 0;
  }
  function Pc() {
    return !0;
  }
  function hx() {
    return !1;
  }
  function Qt(a) {
    function i(l, s, p, m, O) {
      this._reactName = l, this._targetInst = p, this.type = s, this.nativeEvent = m, this.target = O, this.currentTarget = null;
      for (var D in a)
        a.hasOwnProperty(D) && (l = a[D], this[D] = l ? l(m) : m[D]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Pc : hx, this.isPropagationStopped = hx, this;
    }
    return v(i.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Pc);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Pc);
      },
      persist: function() {
      },
      isPersistent: Pc
    }), i;
  }
  var Ia = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(a) {
      return a.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Nc = Qt(Ia), bl = v({}, Ia, { view: 0, detail: 0 }), LN = Qt(bl), oh, lh, xl, Rc = v({}, bl, {
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
    getModifierState: ch,
    button: 0,
    buttons: 0,
    relatedTarget: function(a) {
      return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    },
    movementX: function(a) {
      return "movementX" in a ? a.movementX : (a !== xl && (xl && a.type === "mousemove" ? (oh = a.screenX - xl.screenX, lh = a.screenY - xl.screenY) : lh = oh = 0, xl = a), oh);
    },
    movementY: function(a) {
      return "movementY" in a ? a.movementY : lh;
    }
  }), px = Qt(Rc), UN = v({}, Rc, { dataTransfer: 0 }), IN = Qt(UN), HN = v({}, bl, { relatedTarget: 0 }), uh = Qt(HN), GN = v({}, Ia, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), YN = Qt(GN), KN = v({}, Ia, {
    clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    }
  }), XN = Qt(KN), VN = v({}, Ia, { data: 0 }), vx = Qt(VN), FN = {
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
  }, WN = {
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
  }, ZN = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function QN(a) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(a) : (a = ZN[a]) ? !!i[a] : !1;
  }
  function ch() {
    return QN;
  }
  var JN = v({}, bl, {
    key: function(a) {
      if (a.key) {
        var i = FN[a.key] || a.key;
        if (i !== "Unidentified") return i;
      }
      return a.type === "keypress" ? (a = Dc(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? WN[a.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ch,
    charCode: function(a) {
      return a.type === "keypress" ? Dc(a) : 0;
    },
    keyCode: function(a) {
      return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    },
    which: function(a) {
      return a.type === "keypress" ? Dc(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    }
  }), eR = Qt(JN), tR = v({}, Rc, {
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
  }), yx = Qt(tR), nR = v({}, bl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ch
  }), rR = Qt(nR), aR = v({}, Ia, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), iR = Qt(aR), oR = v({}, Rc, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), lR = Qt(oR), uR = v({}, Ia, {
    newState: 0,
    oldState: 0
  }), cR = Qt(uR), sR = [9, 13, 27, 32], sh = gr && "CompositionEvent" in window, Sl = null;
  gr && "documentMode" in document && (Sl = document.documentMode);
  var fR = gr && "TextEvent" in window && !Sl, mx = gr && (!sh || Sl && 8 < Sl && 11 >= Sl), gx = " ", bx = !1;
  function xx(a, i) {
    switch (a) {
      case "keyup":
        return sR.indexOf(i.keyCode) !== -1;
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
  function Sx(a) {
    return a = a.detail, typeof a == "object" && "data" in a ? a.data : null;
  }
  var ki = !1;
  function dR(a, i) {
    switch (a) {
      case "compositionend":
        return Sx(i);
      case "keypress":
        return i.which !== 32 ? null : (bx = !0, gx);
      case "textInput":
        return a = i.data, a === gx && bx ? null : a;
      default:
        return null;
    }
  }
  function hR(a, i) {
    if (ki)
      return a === "compositionend" || !sh && xx(a, i) ? (a = dx(), Cc = ih = ea = null, ki = !1, a) : null;
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
        return mx && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var pR = {
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
  function _x(a) {
    var i = a && a.nodeName && a.nodeName.toLowerCase();
    return i === "input" ? !!pR[a.type] : i === "textarea";
  }
  function Ox(a, i, l, s) {
    zi ? qi ? qi.push(s) : qi = [s] : zi = s, i = Os(i, "onChange"), 0 < i.length && (l = new Nc(
      "onChange",
      "change",
      null,
      l,
      s
    ), a.push({ event: l, listeners: i }));
  }
  var _l = null, Ol = null;
  function vR(a) {
    iO(a, 0);
  }
  function $c(a) {
    var i = yl(a);
    if (ax(i)) return a;
  }
  function wx(a, i) {
    if (a === "change") return i;
  }
  var Ax = !1;
  if (gr) {
    var fh;
    if (gr) {
      var dh = "oninput" in document;
      if (!dh) {
        var Tx = document.createElement("div");
        Tx.setAttribute("oninput", "return;"), dh = typeof Tx.oninput == "function";
      }
      fh = dh;
    } else fh = !1;
    Ax = fh && (!document.documentMode || 9 < document.documentMode);
  }
  function Ex() {
    _l && (_l.detachEvent("onpropertychange", jx), Ol = _l = null);
  }
  function jx(a) {
    if (a.propertyName === "value" && $c(Ol)) {
      var i = [];
      Ox(
        i,
        Ol,
        a,
        nh(a)
      ), fx(vR, i);
    }
  }
  function yR(a, i, l) {
    a === "focusin" ? (Ex(), _l = i, Ol = l, _l.attachEvent("onpropertychange", jx)) : a === "focusout" && Ex();
  }
  function mR(a) {
    if (a === "selectionchange" || a === "keyup" || a === "keydown")
      return $c(Ol);
  }
  function gR(a, i) {
    if (a === "click") return $c(i);
  }
  function bR(a, i) {
    if (a === "input" || a === "change")
      return $c(i);
  }
  function xR(a, i) {
    return a === i && (a !== 0 || 1 / a === 1 / i) || a !== a && i !== i;
  }
  var fn = typeof Object.is == "function" ? Object.is : xR;
  function wl(a, i) {
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
  function Mx(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Cx(a, i) {
    var l = Mx(a);
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
      l = Mx(l);
    }
  }
  function Dx(a, i) {
    return a && i ? a === i ? !0 : a && a.nodeType === 3 ? !1 : i && i.nodeType === 3 ? Dx(a, i.parentNode) : "contains" in a ? a.contains(i) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function Px(a) {
    a = a != null && a.ownerDocument != null && a.ownerDocument.defaultView != null ? a.ownerDocument.defaultView : window;
    for (var i = jc(a.document); i instanceof a.HTMLIFrameElement; ) {
      try {
        var l = typeof i.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) a = i.contentWindow;
      else break;
      i = jc(a.document);
    }
    return i;
  }
  function hh(a) {
    var i = a && a.nodeName && a.nodeName.toLowerCase();
    return i && (i === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || i === "textarea" || a.contentEditable === "true");
  }
  var SR = gr && "documentMode" in document && 11 >= document.documentMode, Bi = null, ph = null, Al = null, vh = !1;
  function Nx(a, i, l) {
    var s = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    vh || Bi == null || Bi !== jc(s) || (s = Bi, "selectionStart" in s && hh(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), Al && wl(Al, s) || (Al = s, s = Os(ph, "onSelect"), 0 < s.length && (i = new Nc(
      "onSelect",
      "select",
      null,
      i,
      l
    ), a.push({ event: i, listeners: s }), i.target = Bi)));
  }
  function Ha(a, i) {
    var l = {};
    return l[a.toLowerCase()] = i.toLowerCase(), l["Webkit" + a] = "webkit" + i, l["Moz" + a] = "moz" + i, l;
  }
  var Li = {
    animationend: Ha("Animation", "AnimationEnd"),
    animationiteration: Ha("Animation", "AnimationIteration"),
    animationstart: Ha("Animation", "AnimationStart"),
    transitionrun: Ha("Transition", "TransitionRun"),
    transitionstart: Ha("Transition", "TransitionStart"),
    transitioncancel: Ha("Transition", "TransitionCancel"),
    transitionend: Ha("Transition", "TransitionEnd")
  }, yh = {}, Rx = {};
  gr && (Rx = document.createElement("div").style, "AnimationEvent" in window || (delete Li.animationend.animation, delete Li.animationiteration.animation, delete Li.animationstart.animation), "TransitionEvent" in window || delete Li.transitionend.transition);
  function Ga(a) {
    if (yh[a]) return yh[a];
    if (!Li[a]) return a;
    var i = Li[a], l;
    for (l in i)
      if (i.hasOwnProperty(l) && l in Rx)
        return yh[a] = i[l];
    return a;
  }
  var $x = Ga("animationend"), zx = Ga("animationiteration"), qx = Ga("animationstart"), _R = Ga("transitionrun"), OR = Ga("transitionstart"), wR = Ga("transitioncancel"), kx = Ga("transitionend"), Bx = /* @__PURE__ */ new Map(), mh = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  mh.push("scrollEnd");
  function In(a, i) {
    Bx.set(a, i), Ua(i, [a]);
  }
  var zc = typeof reportError == "function" ? reportError : function(a) {
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
  }, Tn = [], Ui = 0, gh = 0;
  function qc() {
    for (var a = Ui, i = gh = Ui = 0; i < a; ) {
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
      m !== 0 && Lx(l, p, m);
    }
  }
  function kc(a, i, l, s) {
    Tn[Ui++] = a, Tn[Ui++] = i, Tn[Ui++] = l, Tn[Ui++] = s, gh |= s, a.lanes |= s, a = a.alternate, a !== null && (a.lanes |= s);
  }
  function bh(a, i, l, s) {
    return kc(a, i, l, s), Bc(a);
  }
  function Ya(a, i) {
    return kc(a, null, null, i), Bc(a);
  }
  function Lx(a, i, l) {
    a.lanes |= l;
    var s = a.alternate;
    s !== null && (s.lanes |= l);
    for (var p = !1, m = a.return; m !== null; )
      m.childLanes |= l, s = m.alternate, s !== null && (s.childLanes |= l), m.tag === 22 && (a = m.stateNode, a === null || a._visibility & 1 || (p = !0)), a = m, m = m.return;
    return a.tag === 3 ? (m = a.stateNode, p && i !== null && (p = 31 - sn(l), a = m.hiddenUpdates, s = a[p], s === null ? a[p] = [i] : s.push(i), i.lane = l | 536870912), m) : null;
  }
  function Bc(a) {
    if (50 < Xl)
      throw Xl = 0, jp = null, Error(r(185));
    for (var i = a.return; i !== null; )
      a = i, i = a.return;
    return a.tag === 3 ? a.stateNode : null;
  }
  var Ii = {};
  function AR(a, i, l, s) {
    this.tag = a, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function dn(a, i, l, s) {
    return new AR(a, i, l, s);
  }
  function xh(a) {
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
  function Ux(a, i) {
    a.flags &= 65011714;
    var l = a.alternate;
    return l === null ? (a.childLanes = 0, a.lanes = i, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, a.type = l.type, i = l.dependencies, a.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
    }), a;
  }
  function Lc(a, i, l, s, p, m) {
    var O = 0;
    if (s = a, typeof a == "function") xh(a) && (O = 1);
    else if (typeof a == "string")
      O = C3(
        a,
        l,
        se.current
      ) ? 26 : a === "html" || a === "head" || a === "body" ? 27 : 5;
    else
      e: switch (a) {
        case R:
          return a = dn(31, l, i, p), a.elementType = R, a.lanes = m, a;
        case S:
          return Ka(l.children, p, m, i);
        case x:
          O = 8, p |= 24;
          break;
        case A:
          return a = dn(12, l, i, p | 2), a.elementType = A, a.lanes = m, a;
        case w:
          return a = dn(13, l, i, p), a.elementType = w, a.lanes = m, a;
        case E:
          return a = dn(19, l, i, p), a.elementType = E, a.lanes = m, a;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case M:
                O = 10;
                break e;
              case T:
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
  function Ka(a, i, l, s) {
    return a = dn(7, a, s, i), a.lanes = l, a;
  }
  function Sh(a, i, l) {
    return a = dn(6, a, null, i), a.lanes = l, a;
  }
  function Ix(a) {
    var i = dn(18, null, null, 0);
    return i.stateNode = a, i;
  }
  function _h(a, i, l) {
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
  var Hx = /* @__PURE__ */ new WeakMap();
  function En(a, i) {
    if (typeof a == "object" && a !== null) {
      var l = Hx.get(a);
      return l !== void 0 ? l : (i = {
        value: a,
        source: i,
        stack: un(i)
      }, Hx.set(a, i), i);
    }
    return {
      value: a,
      source: i,
      stack: un(i)
    };
  }
  var Hi = [], Gi = 0, Uc = null, Tl = 0, jn = [], Mn = 0, ta = null, Jn = 1, er = "";
  function xr(a, i) {
    Hi[Gi++] = Tl, Hi[Gi++] = Uc, Uc = a, Tl = i;
  }
  function Gx(a, i, l) {
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
  function Oh(a) {
    a.return !== null && (xr(a, 1), Gx(a, 1, 0));
  }
  function wh(a) {
    for (; a === Uc; )
      Uc = Hi[--Gi], Hi[Gi] = null, Tl = Hi[--Gi], Hi[Gi] = null;
    for (; a === ta; )
      ta = jn[--Mn], jn[Mn] = null, er = jn[--Mn], jn[Mn] = null, Jn = jn[--Mn], jn[Mn] = null;
  }
  function Yx(a, i) {
    jn[Mn++] = Jn, jn[Mn++] = er, jn[Mn++] = ta, Jn = i.id, er = i.overflow, ta = a;
  }
  var Nt = null, rt = null, ze = !1, na = null, Cn = !1, Ah = Error(r(519));
  function ra(a) {
    var i = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw El(En(i, a)), Ah;
  }
  function Kx(a) {
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
        for (l = 0; l < Fl.length; l++)
          Pe(Fl[l], i);
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
        Pe("invalid", i), ix(
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
        Pe("invalid", i), lx(i, s.value, s.defaultValue, s.children);
    }
    l = s.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || i.textContent === "" + l || s.suppressHydrationWarning === !0 || cO(i.textContent, l) ? (s.popover != null && (Pe("beforetoggle", i), Pe("toggle", i)), s.onScroll != null && Pe("scroll", i), s.onScrollEnd != null && Pe("scrollend", i), s.onClick != null && (i.onclick = mr), i = !0) : i = !1, i || ra(a, !0);
  }
  function Xx(a) {
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
  function Yi(a) {
    if (a !== Nt) return !1;
    if (!ze) return Xx(a), ze = !0, !1;
    var i = a.tag, l;
    if ((l = i !== 3 && i !== 27) && ((l = i === 5) && (l = a.type, l = !(l !== "form" && l !== "button") || Hp(a.type, a.memoizedProps)), l = !l), l && rt && ra(a), Xx(a), i === 13) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
      rt = gO(a);
    } else if (i === 31) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
      rt = gO(a);
    } else
      i === 27 ? (i = rt, ma(a.type) ? (a = Vp, Vp = null, rt = a) : rt = i) : rt = Nt ? Pn(a.stateNode.nextSibling) : null;
    return !0;
  }
  function Xa() {
    rt = Nt = null, ze = !1;
  }
  function Th() {
    var a = na;
    return a !== null && (nn === null ? nn = a : nn.push.apply(
      nn,
      a
    ), na = null), a;
  }
  function El(a) {
    na === null ? na = [a] : na.push(a);
  }
  var Eh = P(null), Va = null, Sr = null;
  function aa(a, i, l) {
    re(Eh, i._currentValue), i._currentValue = l;
  }
  function _r(a) {
    a._currentValue = Eh.current, I(Eh);
  }
  function jh(a, i, l) {
    for (; a !== null; ) {
      var s = a.alternate;
      if ((a.childLanes & i) !== i ? (a.childLanes |= i, s !== null && (s.childLanes |= i)) : s !== null && (s.childLanes & i) !== i && (s.childLanes |= i), a === l) break;
      a = a.return;
    }
  }
  function Mh(a, i, l, s) {
    var p = a.child;
    for (p !== null && (p.return = a); p !== null; ) {
      var m = p.dependencies;
      if (m !== null) {
        var O = p.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var D = m;
          m = p;
          for (var B = 0; B < i.length; B++)
            if (D.context === i[B]) {
              m.lanes |= l, D = m.alternate, D !== null && (D.lanes |= l), jh(
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
        O.lanes |= l, m = O.alternate, m !== null && (m.lanes |= l), jh(O, l, a), O = null;
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
          fn(p.pendingProps.value, O.value) || (a !== null ? a.push(D) : a = [D]);
        }
      } else if (p === _e.current) {
        if (O = p.alternate, O === null) throw Error(r(387));
        O.memoizedState.memoizedState !== p.memoizedState.memoizedState && (a !== null ? a.push(eu) : a = [eu]);
      }
      p = p.return;
    }
    a !== null && Mh(
      i,
      a,
      l,
      s
    ), i.flags |= 262144;
  }
  function Ic(a) {
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
  function Fa(a) {
    Va = a, Sr = null, a = a.dependencies, a !== null && (a.firstContext = null);
  }
  function Rt(a) {
    return Vx(Va, a);
  }
  function Hc(a, i) {
    return Va === null && Fa(a), Vx(a, i);
  }
  function Vx(a, i) {
    var l = i._currentValue;
    if (i = { context: i, memoizedValue: l, next: null }, Sr === null) {
      if (a === null) throw Error(r(308));
      Sr = i, a.dependencies = { lanes: 0, firstContext: i }, a.flags |= 524288;
    } else Sr = Sr.next = i;
    return l;
  }
  var TR = typeof AbortController < "u" ? AbortController : function() {
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
  }, ER = e.unstable_scheduleCallback, jR = e.unstable_NormalPriority, vt = {
    $$typeof: M,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ch() {
    return {
      controller: new TR(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function jl(a) {
    a.refCount--, a.refCount === 0 && ER(jR, function() {
      a.controller.abort();
    });
  }
  var Ml = null, Dh = 0, Xi = 0, Vi = null;
  function MR(a, i) {
    if (Ml === null) {
      var l = Ml = [];
      Dh = 0, Xi = Rp(), Vi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          l.push(s);
        }
      };
    }
    return Dh++, i.then(Fx, Fx), i;
  }
  function Fx() {
    if (--Dh === 0 && Ml !== null) {
      Vi !== null && (Vi.status = "fulfilled");
      var a = Ml;
      Ml = null, Xi = 0, Vi = null;
      for (var i = 0; i < a.length; i++) (0, a[i])();
    }
  }
  function CR(a, i) {
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
  var Wx = z.S;
  z.S = function(a, i) {
    N_ = Lt(), typeof i == "object" && i !== null && typeof i.then == "function" && MR(a, i), Wx !== null && Wx(a, i);
  };
  var Wa = P(null);
  function Ph() {
    var a = Wa.current;
    return a !== null ? a : Je.pooledCache;
  }
  function Gc(a, i) {
    i === null ? re(Wa, Wa.current) : re(Wa, i.pool);
  }
  function Zx() {
    var a = Ph();
    return a === null ? null : { parent: vt._currentValue, pool: a };
  }
  var Fi = Error(r(460)), Nh = Error(r(474)), Yc = Error(r(542)), Kc = { then: function() {
  } };
  function Qx(a) {
    return a = a.status, a === "fulfilled" || a === "rejected";
  }
  function Jx(a, i, l) {
    switch (l = a[l], l === void 0 ? a.push(i) : l !== i && (i.then(mr, mr), i = l), i.status) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw a = i.reason, tS(a), a;
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
            throw a = i.reason, tS(a), a;
        }
        throw Qa = i, Fi;
    }
  }
  function Za(a) {
    try {
      var i = a._init;
      return i(a._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Qa = l, Fi) : l;
    }
  }
  var Qa = null;
  function eS() {
    if (Qa === null) throw Error(r(459));
    var a = Qa;
    return Qa = null, a;
  }
  function tS(a) {
    if (a === Fi || a === Yc)
      throw Error(r(483));
  }
  var Wi = null, Cl = 0;
  function Xc(a) {
    var i = Cl;
    return Cl += 1, Wi === null && (Wi = []), Jx(Wi, a, i);
  }
  function Dl(a, i) {
    i = i.props.ref, a.ref = i !== void 0 ? i : null;
  }
  function Vc(a, i) {
    throw i.$$typeof === g ? Error(r(525)) : (a = Object.prototype.toString.call(i), Error(
      r(
        31,
        a === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : a
      )
    ));
  }
  function nS(a) {
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
      return H === null || H.tag !== 6 ? (H = Sh(W, X.mode, oe), H.return = X, H) : (H = p(H, W), H.return = X, H);
    }
    function B(X, H, W, oe) {
      var be = W.type;
      return be === S ? ae(
        X,
        H,
        W.props.children,
        oe,
        W.key
      ) : H !== null && (H.elementType === be || typeof be == "object" && be !== null && be.$$typeof === N && Za(be) === H.type) ? (H = p(H, W.props), Dl(H, W), H.return = X, H) : (H = Lc(
        W.type,
        W.key,
        W.props,
        null,
        X.mode,
        oe
      ), Dl(H, W), H.return = X, H);
    }
    function Z(X, H, W, oe) {
      return H === null || H.tag !== 4 || H.stateNode.containerInfo !== W.containerInfo || H.stateNode.implementation !== W.implementation ? (H = _h(W, X.mode, oe), H.return = X, H) : (H = p(H, W.children || []), H.return = X, H);
    }
    function ae(X, H, W, oe, be) {
      return H === null || H.tag !== 7 ? (H = Ka(
        W,
        X.mode,
        oe,
        be
      ), H.return = X, H) : (H = p(H, W), H.return = X, H);
    }
    function le(X, H, W) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return H = Sh(
          "" + H,
          X.mode,
          W
        ), H.return = X, H;
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case b:
            return W = Lc(
              H.type,
              H.key,
              H.props,
              null,
              X.mode,
              W
            ), Dl(W, H), W.return = X, W;
          case _:
            return H = _h(
              H,
              X.mode,
              W
            ), H.return = X, H;
          case N:
            return H = Za(H), le(X, H, W);
        }
        if (F(H) || q(H))
          return H = Ka(
            H,
            X.mode,
            W,
            null
          ), H.return = X, H;
        if (typeof H.then == "function")
          return le(X, Xc(H), W);
        if (H.$$typeof === M)
          return le(
            X,
            Hc(X, H),
            W
          );
        Vc(X, H);
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
            return W.key === be ? B(X, H, W, oe) : null;
          case _:
            return W.key === be ? Z(X, H, W, oe) : null;
          case N:
            return W = Za(W), Q(X, H, W, oe);
        }
        if (F(W) || q(W))
          return be !== null ? null : ae(X, H, W, oe, null);
        if (typeof W.then == "function")
          return Q(
            X,
            H,
            Xc(W),
            oe
          );
        if (W.$$typeof === M)
          return Q(
            X,
            H,
            Hc(X, W),
            oe
          );
        Vc(X, W);
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
            ) || null, B(H, X, oe, be);
          case _:
            return X = X.get(
              oe.key === null ? W : oe.key
            ) || null, Z(H, X, oe, be);
          case N:
            return oe = Za(oe), te(
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
            Xc(oe),
            be
          );
        if (oe.$$typeof === M)
          return te(
            X,
            H,
            W,
            Hc(H, oe),
            be
          );
        Vc(H, oe);
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
      return a && me.forEach(function(U3) {
        return i(X, U3);
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
                  } else if (H.elementType === be || typeof be == "object" && be !== null && be.$$typeof === N && Za(be) === H.type) {
                    l(
                      X,
                      H.sibling
                    ), oe = p(H, W.props), Dl(oe, W), oe.return = X, X = oe;
                    break e;
                  }
                  l(X, H);
                  break;
                } else i(X, H);
                H = H.sibling;
              }
              W.type === S ? (oe = Ka(
                W.props.children,
                X.mode,
                oe,
                W.key
              ), oe.return = X, X = oe) : (oe = Lc(
                W.type,
                W.key,
                W.props,
                null,
                X.mode,
                oe
              ), Dl(oe, W), oe.return = X, X = oe);
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
              oe = _h(W, X.mode, oe), oe.return = X, X = oe;
            }
            return O(X);
          case N:
            return W = Za(W), We(
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
            Xc(W),
            oe
          );
        if (W.$$typeof === M)
          return We(
            X,
            H,
            Hc(X, W),
            oe
          );
        Vc(X, W);
      }
      return typeof W == "string" && W !== "" || typeof W == "number" || typeof W == "bigint" ? (W = "" + W, H !== null && H.tag === 6 ? (l(X, H.sibling), oe = p(H, W), oe.return = X, X = oe) : (l(X, H), oe = Sh(W, X.mode, oe), oe.return = X, X = oe), O(X)) : l(X, H);
    }
    return function(X, H, W, oe) {
      try {
        Cl = 0;
        var be = We(
          X,
          H,
          W,
          oe
        );
        return Wi = null, be;
      } catch (me) {
        if (me === Fi || me === Yc) throw me;
        var ke = dn(29, me, null, X.mode);
        return ke.lanes = oe, ke.return = X, ke;
      } finally {
      }
    };
  }
  var Ja = nS(!0), rS = nS(!1), ia = !1;
  function Rh(a) {
    a.updateQueue = {
      baseState: a.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function $h(a, i) {
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
      return p === null ? i.next = i : (i.next = p.next, p.next = i), s.pending = i, i = Bc(a), Lx(a, null, l), i;
    }
    return kc(a, s, i, l), Bc(a);
  }
  function Pl(a, i, l) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (l & 4194048) !== 0)) {
      var s = i.lanes;
      s &= a.pendingLanes, l |= s, i.lanes = l, V1(a, l);
    }
  }
  function zh(a, i) {
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
  var qh = !1;
  function Nl() {
    if (qh) {
      var a = Vi;
      if (a !== null) throw a;
    }
  }
  function Rl(a, i, l, s) {
    qh = !1;
    var p = a.updateQueue;
    ia = !1;
    var m = p.firstBaseUpdate, O = p.lastBaseUpdate, D = p.shared.pending;
    if (D !== null) {
      p.shared.pending = null;
      var B = D, Z = B.next;
      B.next = null, O === null ? m = Z : O.next = Z, O = B;
      var ae = a.alternate;
      ae !== null && (ae = ae.updateQueue, D = ae.lastBaseUpdate, D !== O && (D === null ? ae.firstBaseUpdate = Z : D.next = Z, ae.lastBaseUpdate = B));
    }
    if (m !== null) {
      var le = p.baseState;
      O = 0, ae = Z = B = null, D = m;
      do {
        var Q = D.lane & -536870913, te = Q !== D.lane;
        if (te ? (Ne & Q) === Q : (s & Q) === Q) {
          Q !== 0 && Q === Xi && (qh = !0), ae !== null && (ae = ae.next = {
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
          }, ae === null ? (Z = ae = te, B = le) : ae = ae.next = te, O |= Q;
        if (D = D.next, D === null) {
          if (D = p.shared.pending, D === null)
            break;
          te = D, D = te.next, te.next = null, p.lastBaseUpdate = te, p.shared.pending = null;
        }
      } while (!0);
      ae === null && (B = le), p.baseState = B, p.firstBaseUpdate = Z, p.lastBaseUpdate = ae, m === null && (p.shared.lanes = 0), da |= O, a.lanes = O, a.memoizedState = le;
    }
  }
  function aS(a, i) {
    if (typeof a != "function")
      throw Error(r(191, a));
    a.call(i);
  }
  function iS(a, i) {
    var l = a.callbacks;
    if (l !== null)
      for (a.callbacks = null, a = 0; a < l.length; a++)
        aS(l[a], i);
  }
  var Zi = P(null), Fc = P(0);
  function oS(a, i) {
    a = Dr, re(Fc, a), re(Zi, i), Dr = a | i.baseLanes;
  }
  function kh() {
    re(Fc, Dr), re(Zi, Zi.current);
  }
  function Bh() {
    Dr = Fc.current, I(Zi), I(Fc);
  }
  var hn = P(null), Dn = null;
  function ua(a) {
    var i = a.alternate;
    re(dt, dt.current & 1), re(hn, a), Dn === null && (i === null || Zi.current !== null || i.memoizedState !== null) && (Dn = a);
  }
  function Lh(a) {
    re(dt, dt.current), re(hn, a), Dn === null && (Dn = a);
  }
  function lS(a) {
    a.tag === 22 ? (re(dt, dt.current), re(hn, a), Dn === null && (Dn = a)) : ca();
  }
  function ca() {
    re(dt, dt.current), re(hn, hn.current);
  }
  function pn(a) {
    I(hn), Dn === a && (Dn = null), I(dt);
  }
  var dt = P(0);
  function Wc(a) {
    for (var i = a; i !== null; ) {
      if (i.tag === 13) {
        var l = i.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Kp(l) || Xp(l)))
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
  var Or = 0, je = null, Ve = null, yt = null, Zc = !1, Qi = !1, ei = !1, Qc = 0, $l = 0, Ji = null, DR = 0;
  function ct() {
    throw Error(r(321));
  }
  function Uh(a, i) {
    if (i === null) return !1;
    for (var l = 0; l < i.length && l < a.length; l++)
      if (!fn(a[l], i[l])) return !1;
    return !0;
  }
  function Ih(a, i, l, s, p, m) {
    return Or = m, je = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, z.H = a === null || a.memoizedState === null ? GS : rp, ei = !1, m = l(s, p), ei = !1, Qi && (m = cS(
      i,
      l,
      s,
      p
    )), uS(a), m;
  }
  function uS(a) {
    z.H = kl;
    var i = Ve !== null && Ve.next !== null;
    if (Or = 0, yt = Ve = je = null, Zc = !1, $l = 0, Ji = null, i) throw Error(r(300));
    a === null || mt || (a = a.dependencies, a !== null && Ic(a) && (mt = !0));
  }
  function cS(a, i, l, s) {
    je = a;
    var p = 0;
    do {
      if (Qi && (Ji = null), $l = 0, Qi = !1, 25 <= p) throw Error(r(301));
      if (p += 1, yt = Ve = null, a.updateQueue != null) {
        var m = a.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      z.H = YS, m = i(l, s);
    } while (Qi);
    return m;
  }
  function PR() {
    var a = z.H, i = a.useState()[0];
    return i = typeof i.then == "function" ? zl(i) : i, a = a.useState()[0], (Ve !== null ? Ve.memoizedState : null) !== a && (je.flags |= 1024), i;
  }
  function Hh() {
    var a = Qc !== 0;
    return Qc = 0, a;
  }
  function Gh(a, i, l) {
    i.updateQueue = a.updateQueue, i.flags &= -2053, a.lanes &= ~l;
  }
  function Yh(a) {
    if (Zc) {
      for (a = a.memoizedState; a !== null; ) {
        var i = a.queue;
        i !== null && (i.pending = null), a = a.next;
      }
      Zc = !1;
    }
    Or = 0, yt = Ve = je = null, Qi = !1, $l = Qc = 0, Ji = null;
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
  function Jc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function zl(a) {
    var i = $l;
    return $l += 1, Ji === null && (Ji = []), a = Jx(Ji, a, i), i = je, (yt === null ? i.memoizedState : yt.next) === null && (i = i.alternate, z.H = i === null || i.memoizedState === null ? GS : rp), a;
  }
  function es(a) {
    if (a !== null && typeof a == "object") {
      if (typeof a.then == "function") return zl(a);
      if (a.$$typeof === M) return Rt(a);
    }
    throw Error(r(438, String(a)));
  }
  function Kh(a) {
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
    if (i == null && (i = { data: [], index: 0 }), l === null && (l = Jc(), je.updateQueue = l), l.memoCache = i, l = i.data[i.index], l === void 0)
      for (l = i.data[i.index] = Array(a), s = 0; s < a; s++)
        l[s] = k;
    return i.index++, l;
  }
  function wr(a, i) {
    return typeof i == "function" ? i(a) : i;
  }
  function ts(a) {
    var i = ht();
    return Xh(i, Ve, a);
  }
  function Xh(a, i, l) {
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
      var D = O = null, B = null, Z = i, ae = !1;
      do {
        var le = Z.lane & -536870913;
        if (le !== Z.lane ? (Ne & le) === le : (Or & le) === le) {
          var Q = Z.revertLane;
          if (Q === 0)
            B !== null && (B = B.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }), le === Xi && (ae = !0);
          else if ((Or & Q) === Q) {
            Z = Z.next, Q === Xi && (ae = !0);
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
            }, B === null ? (D = B = le, O = m) : B = B.next = le, je.lanes |= Q, da |= Q;
          le = Z.action, ei && l(m, le), m = Z.hasEagerState ? Z.eagerState : l(m, le);
        } else
          Q = {
            lane: le,
            revertLane: Z.revertLane,
            gesture: Z.gesture,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          }, B === null ? (D = B = Q, O = m) : B = B.next = Q, je.lanes |= le, da |= le;
        Z = Z.next;
      } while (Z !== null && Z !== i);
      if (B === null ? O = m : B.next = D, !fn(m, a.memoizedState) && (mt = !0, ae && (l = Vi, l !== null)))
        throw l;
      a.memoizedState = m, a.baseState = O, a.baseQueue = B, s.lastRenderedState = m;
    }
    return p === null && (s.lanes = 0), [a.memoizedState, s.dispatch];
  }
  function Vh(a) {
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
  function sS(a, i, l) {
    var s = je, p = ht(), m = ze;
    if (m) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = i();
    var O = !fn(
      (Ve || p).memoizedState,
      l
    );
    if (O && (p.memoizedState = l, mt = !0), p = p.queue, Zh(hS.bind(null, s, p, a), [
      a
    ]), p.getSnapshot !== i || O || yt !== null && yt.memoizedState.tag & 1) {
      if (s.flags |= 2048, eo(
        9,
        { destroy: void 0 },
        dS.bind(
          null,
          s,
          p,
          l,
          i
        ),
        null
      ), Je === null) throw Error(r(349));
      m || (Or & 127) !== 0 || fS(s, i, l);
    }
    return l;
  }
  function fS(a, i, l) {
    a.flags |= 16384, a = { getSnapshot: i, value: l }, i = je.updateQueue, i === null ? (i = Jc(), je.updateQueue = i, i.stores = [a]) : (l = i.stores, l === null ? i.stores = [a] : l.push(a));
  }
  function dS(a, i, l, s) {
    i.value = l, i.getSnapshot = s, pS(i) && vS(a);
  }
  function hS(a, i, l) {
    return l(function() {
      pS(i) && vS(a);
    });
  }
  function pS(a) {
    var i = a.getSnapshot;
    a = a.value;
    try {
      var l = i();
      return !fn(a, l);
    } catch {
      return !0;
    }
  }
  function vS(a) {
    var i = Ya(a, 2);
    i !== null && rn(i, a, 2);
  }
  function Fh(a) {
    var i = Vt();
    if (typeof a == "function") {
      var l = a;
      if (a = l(), ei) {
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
  function yS(a, i, l, s) {
    return a.baseState = l, Xh(
      a,
      Ve,
      typeof s == "function" ? s : wr
    );
  }
  function NR(a, i, l, s, p) {
    if (as(a)) throw Error(r(485));
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
      z.T !== null ? l(!0) : m.isTransition = !1, s(m), l = i.pending, l === null ? (m.next = i.pending = m, mS(i, m)) : (m.next = l.next, i.pending = l.next = m);
    }
  }
  function mS(a, i) {
    var l = i.action, s = i.payload, p = a.state;
    if (i.isTransition) {
      var m = z.T, O = {};
      z.T = O;
      try {
        var D = l(p, s), B = z.S;
        B !== null && B(O, D), gS(a, i, D);
      } catch (Z) {
        Wh(a, i, Z);
      } finally {
        m !== null && O.types !== null && (m.types = O.types), z.T = m;
      }
    } else
      try {
        m = l(p, s), gS(a, i, m);
      } catch (Z) {
        Wh(a, i, Z);
      }
  }
  function gS(a, i, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(s) {
        bS(a, i, s);
      },
      function(s) {
        return Wh(a, i, s);
      }
    ) : bS(a, i, l);
  }
  function bS(a, i, l) {
    i.status = "fulfilled", i.value = l, xS(i), a.state = l, i = a.pending, i !== null && (l = i.next, l === i ? a.pending = null : (l = l.next, i.next = l, mS(a, l)));
  }
  function Wh(a, i, l) {
    var s = a.pending;
    if (a.pending = null, s !== null) {
      s = s.next;
      do
        i.status = "rejected", i.reason = l, xS(i), i = i.next;
      while (i !== s);
    }
    a.action = null;
  }
  function xS(a) {
    a = a.listeners;
    for (var i = 0; i < a.length; i++) (0, a[i])();
  }
  function SS(a, i) {
    return i;
  }
  function _S(a, i) {
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
      lastRenderedReducer: SS,
      lastRenderedState: i
    }, l.queue = s, l = US.bind(
      null,
      je,
      s
    ), s.dispatch = l, s = Fh(!1), m = np.bind(
      null,
      je,
      !1,
      s.queue
    ), s = Vt(), p = {
      state: i,
      dispatch: null,
      action: a,
      pending: null
    }, s.queue = p, l = NR.bind(
      null,
      je,
      p,
      m,
      l
    ), p.dispatch = l, s.memoizedState = a, [i, l, !1];
  }
  function OS(a) {
    var i = ht();
    return wS(i, Ve, a);
  }
  function wS(a, i, l) {
    if (i = Xh(
      a,
      i,
      SS
    )[0], a = ts(wr)[0], typeof i == "object" && i !== null && typeof i.then == "function")
      try {
        var s = zl(i);
      } catch (O) {
        throw O === Fi ? Yc : O;
      }
    else s = i;
    i = ht();
    var p = i.queue, m = p.dispatch;
    return l !== i.memoizedState && (je.flags |= 2048, eo(
      9,
      { destroy: void 0 },
      RR.bind(null, p, l),
      null
    )), [s, m, a];
  }
  function RR(a, i) {
    a.action = i;
  }
  function AS(a) {
    var i = ht(), l = Ve;
    if (l !== null)
      return wS(i, l, a);
    ht(), i = i.memoizedState, l = ht();
    var s = l.queue.dispatch;
    return l.memoizedState = a, [i, s, !1];
  }
  function eo(a, i, l, s) {
    return a = { tag: a, create: l, deps: s, inst: i, next: null }, i = je.updateQueue, i === null && (i = Jc(), je.updateQueue = i), l = i.lastEffect, l === null ? i.lastEffect = a.next = a : (s = l.next, l.next = a, a.next = s, i.lastEffect = a), a;
  }
  function TS() {
    return ht().memoizedState;
  }
  function ns(a, i, l, s) {
    var p = Vt();
    je.flags |= a, p.memoizedState = eo(
      1 | i,
      { destroy: void 0 },
      l,
      s === void 0 ? null : s
    );
  }
  function rs(a, i, l, s) {
    var p = ht();
    s = s === void 0 ? null : s;
    var m = p.memoizedState.inst;
    Ve !== null && s !== null && Uh(s, Ve.memoizedState.deps) ? p.memoizedState = eo(i, m, l, s) : (je.flags |= a, p.memoizedState = eo(
      1 | i,
      m,
      l,
      s
    ));
  }
  function ES(a, i) {
    ns(8390656, 8, a, i);
  }
  function Zh(a, i) {
    rs(2048, 8, a, i);
  }
  function $R(a) {
    je.flags |= 4;
    var i = je.updateQueue;
    if (i === null)
      i = Jc(), je.updateQueue = i, i.events = [a];
    else {
      var l = i.events;
      l === null ? i.events = [a] : l.push(a);
    }
  }
  function jS(a) {
    var i = ht().memoizedState;
    return $R({ ref: i, nextImpl: a }), function() {
      if ((Ue & 2) !== 0) throw Error(r(440));
      return i.impl.apply(void 0, arguments);
    };
  }
  function MS(a, i) {
    return rs(4, 2, a, i);
  }
  function CS(a, i) {
    return rs(4, 4, a, i);
  }
  function DS(a, i) {
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
  function PS(a, i, l) {
    l = l != null ? l.concat([a]) : null, rs(4, 4, DS.bind(null, i, a), l);
  }
  function Qh() {
  }
  function NS(a, i) {
    var l = ht();
    i = i === void 0 ? null : i;
    var s = l.memoizedState;
    return i !== null && Uh(i, s[1]) ? s[0] : (l.memoizedState = [a, i], a);
  }
  function RS(a, i) {
    var l = ht();
    i = i === void 0 ? null : i;
    var s = l.memoizedState;
    if (i !== null && Uh(i, s[1]))
      return s[0];
    if (s = a(), ei) {
      Qr(!0);
      try {
        a();
      } finally {
        Qr(!1);
      }
    }
    return l.memoizedState = [s, i], s;
  }
  function Jh(a, i, l) {
    return l === void 0 || (Or & 1073741824) !== 0 && (Ne & 261930) === 0 ? a.memoizedState = i : (a.memoizedState = l, a = $_(), je.lanes |= a, da |= a, l);
  }
  function $S(a, i, l, s) {
    return fn(l, i) ? l : Zi.current !== null ? (a = Jh(a, l, s), fn(a, i) || (mt = !0), a) : (Or & 42) === 0 || (Or & 1073741824) !== 0 && (Ne & 261930) === 0 ? (mt = !0, a.memoizedState = l) : (a = $_(), je.lanes |= a, da |= a, i);
  }
  function zS(a, i, l, s, p) {
    var m = K.p;
    K.p = m !== 0 && 8 > m ? m : 8;
    var O = z.T, D = {};
    z.T = D, np(a, !1, i, l);
    try {
      var B = p(), Z = z.S;
      if (Z !== null && Z(D, B), B !== null && typeof B == "object" && typeof B.then == "function") {
        var ae = CR(
          B,
          s
        );
        ql(
          a,
          i,
          ae,
          mn(a)
        );
      } else
        ql(
          a,
          i,
          s,
          mn(a)
        );
    } catch (le) {
      ql(
        a,
        i,
        { then: function() {
        }, status: "rejected", reason: le },
        mn()
      );
    } finally {
      K.p = m, O !== null && D.types !== null && (O.types = D.types), z.T = O;
    }
  }
  function zR() {
  }
  function ep(a, i, l, s) {
    if (a.tag !== 5) throw Error(r(476));
    var p = qS(a).queue;
    zS(
      a,
      p,
      i,
      ne,
      l === null ? zR : function() {
        return kS(a), l(s);
      }
    );
  }
  function qS(a) {
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
  function kS(a) {
    var i = qS(a);
    i.next === null && (i = a.alternate.memoizedState), ql(
      a,
      i.next.queue,
      {},
      mn()
    );
  }
  function tp() {
    return Rt(eu);
  }
  function BS() {
    return ht().memoizedState;
  }
  function LS() {
    return ht().memoizedState;
  }
  function qR(a) {
    for (var i = a.return; i !== null; ) {
      switch (i.tag) {
        case 24:
        case 3:
          var l = mn();
          a = oa(l);
          var s = la(i, a, l);
          s !== null && (rn(s, i, l), Pl(s, i, l)), i = { cache: Ch() }, a.payload = i;
          return;
      }
      i = i.return;
    }
  }
  function kR(a, i, l) {
    var s = mn();
    l = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, as(a) ? IS(i, l) : (l = bh(a, i, l, s), l !== null && (rn(l, a, s), HS(l, i, s)));
  }
  function US(a, i, l) {
    var s = mn();
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
    if (as(a)) IS(i, p);
    else {
      var m = a.alternate;
      if (a.lanes === 0 && (m === null || m.lanes === 0) && (m = i.lastRenderedReducer, m !== null))
        try {
          var O = i.lastRenderedState, D = m(O, l);
          if (p.hasEagerState = !0, p.eagerState = D, fn(D, O))
            return kc(a, i, p, 0), Je === null && qc(), !1;
        } catch {
        } finally {
        }
      if (l = bh(a, i, p, s), l !== null)
        return rn(l, a, s), HS(l, i, s), !0;
    }
    return !1;
  }
  function np(a, i, l, s) {
    if (s = {
      lane: 2,
      revertLane: Rp(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, as(a)) {
      if (i) throw Error(r(479));
    } else
      i = bh(
        a,
        l,
        s,
        2
      ), i !== null && rn(i, a, 2);
  }
  function as(a) {
    var i = a.alternate;
    return a === je || i !== null && i === je;
  }
  function IS(a, i) {
    Qi = Zc = !0;
    var l = a.pending;
    l === null ? i.next = i : (i.next = l.next, l.next = i), a.pending = i;
  }
  function HS(a, i, l) {
    if ((l & 4194048) !== 0) {
      var s = i.lanes;
      s &= a.pendingLanes, l |= s, i.lanes = l, V1(a, l);
    }
  }
  var kl = {
    readContext: Rt,
    use: es,
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
  kl.useEffectEvent = ct;
  var GS = {
    readContext: Rt,
    use: es,
    useCallback: function(a, i) {
      return Vt().memoizedState = [
        a,
        i === void 0 ? null : i
      ], a;
    },
    useContext: Rt,
    useEffect: ES,
    useImperativeHandle: function(a, i, l) {
      l = l != null ? l.concat([a]) : null, ns(
        4194308,
        4,
        DS.bind(null, i, a),
        l
      );
    },
    useLayoutEffect: function(a, i) {
      return ns(4194308, 4, a, i);
    },
    useInsertionEffect: function(a, i) {
      ns(4, 2, a, i);
    },
    useMemo: function(a, i) {
      var l = Vt();
      i = i === void 0 ? null : i;
      var s = a();
      if (ei) {
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
        if (ei) {
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
      }, s.queue = a, a = a.dispatch = kR.bind(
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
      a = Fh(a);
      var i = a.queue, l = US.bind(null, je, i);
      return i.dispatch = l, [a.memoizedState, l];
    },
    useDebugValue: Qh,
    useDeferredValue: function(a, i) {
      var l = Vt();
      return Jh(l, a, i);
    },
    useTransition: function() {
      var a = Fh(!1);
      return a = zS.bind(
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
        (Ne & 127) !== 0 || fS(s, i, l);
      }
      p.memoizedState = l;
      var m = { value: l, getSnapshot: i };
      return p.queue = m, ES(hS.bind(null, s, m, a), [
        a
      ]), s.flags |= 2048, eo(
        9,
        { destroy: void 0 },
        dS.bind(
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
        l = (s & ~(1 << 32 - sn(s) - 1)).toString(32) + l, i = "_" + i + "R_" + l, l = Qc++, 0 < l && (i += "H" + l.toString(32)), i += "_";
      } else
        l = DR++, i = "_" + i + "r_" + l.toString(32) + "_";
      return a.memoizedState = i;
    },
    useHostTransitionStatus: tp,
    useFormState: _S,
    useActionState: _S,
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
      return i.queue = l, i = np.bind(
        null,
        je,
        !0,
        l
      ), l.dispatch = i, [a, i];
    },
    useMemoCache: Kh,
    useCacheRefresh: function() {
      return Vt().memoizedState = qR.bind(
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
  }, rp = {
    readContext: Rt,
    use: es,
    useCallback: NS,
    useContext: Rt,
    useEffect: Zh,
    useImperativeHandle: PS,
    useInsertionEffect: MS,
    useLayoutEffect: CS,
    useMemo: RS,
    useReducer: ts,
    useRef: TS,
    useState: function() {
      return ts(wr);
    },
    useDebugValue: Qh,
    useDeferredValue: function(a, i) {
      var l = ht();
      return $S(
        l,
        Ve.memoizedState,
        a,
        i
      );
    },
    useTransition: function() {
      var a = ts(wr)[0], i = ht().memoizedState;
      return [
        typeof a == "boolean" ? a : zl(a),
        i
      ];
    },
    useSyncExternalStore: sS,
    useId: BS,
    useHostTransitionStatus: tp,
    useFormState: OS,
    useActionState: OS,
    useOptimistic: function(a, i) {
      var l = ht();
      return yS(l, Ve, a, i);
    },
    useMemoCache: Kh,
    useCacheRefresh: LS
  };
  rp.useEffectEvent = jS;
  var YS = {
    readContext: Rt,
    use: es,
    useCallback: NS,
    useContext: Rt,
    useEffect: Zh,
    useImperativeHandle: PS,
    useInsertionEffect: MS,
    useLayoutEffect: CS,
    useMemo: RS,
    useReducer: Vh,
    useRef: TS,
    useState: function() {
      return Vh(wr);
    },
    useDebugValue: Qh,
    useDeferredValue: function(a, i) {
      var l = ht();
      return Ve === null ? Jh(l, a, i) : $S(
        l,
        Ve.memoizedState,
        a,
        i
      );
    },
    useTransition: function() {
      var a = Vh(wr)[0], i = ht().memoizedState;
      return [
        typeof a == "boolean" ? a : zl(a),
        i
      ];
    },
    useSyncExternalStore: sS,
    useId: BS,
    useHostTransitionStatus: tp,
    useFormState: AS,
    useActionState: AS,
    useOptimistic: function(a, i) {
      var l = ht();
      return Ve !== null ? yS(l, Ve, a, i) : (l.baseState = a, [a, l.queue.dispatch]);
    },
    useMemoCache: Kh,
    useCacheRefresh: LS
  };
  YS.useEffectEvent = jS;
  function ap(a, i, l, s) {
    i = a.memoizedState, l = l(s, i), l = l == null ? i : v({}, i, l), a.memoizedState = l, a.lanes === 0 && (a.updateQueue.baseState = l);
  }
  var ip = {
    enqueueSetState: function(a, i, l) {
      a = a._reactInternals;
      var s = mn(), p = oa(s);
      p.payload = i, l != null && (p.callback = l), i = la(a, p, s), i !== null && (rn(i, a, s), Pl(i, a, s));
    },
    enqueueReplaceState: function(a, i, l) {
      a = a._reactInternals;
      var s = mn(), p = oa(s);
      p.tag = 1, p.payload = i, l != null && (p.callback = l), i = la(a, p, s), i !== null && (rn(i, a, s), Pl(i, a, s));
    },
    enqueueForceUpdate: function(a, i) {
      a = a._reactInternals;
      var l = mn(), s = oa(l);
      s.tag = 2, i != null && (s.callback = i), i = la(a, s, l), i !== null && (rn(i, a, l), Pl(i, a, l));
    }
  };
  function KS(a, i, l, s, p, m, O) {
    return a = a.stateNode, typeof a.shouldComponentUpdate == "function" ? a.shouldComponentUpdate(s, m, O) : i.prototype && i.prototype.isPureReactComponent ? !wl(l, s) || !wl(p, m) : !0;
  }
  function XS(a, i, l, s) {
    a = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(l, s), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(l, s), i.state !== a && ip.enqueueReplaceState(i, i.state, null);
  }
  function ti(a, i) {
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
  function VS(a) {
    zc(a);
  }
  function FS(a) {
    console.error(a);
  }
  function WS(a) {
    zc(a);
  }
  function is(a, i) {
    try {
      var l = a.onUncaughtError;
      l(i.value, { componentStack: i.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function ZS(a, i, l) {
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
  function op(a, i, l) {
    return l = oa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      is(a, i);
    }, l;
  }
  function QS(a) {
    return a = oa(a), a.tag = 3, a;
  }
  function JS(a, i, l, s) {
    var p = l.type.getDerivedStateFromError;
    if (typeof p == "function") {
      var m = s.value;
      a.payload = function() {
        return p(m);
      }, a.callback = function() {
        ZS(i, l, s);
      };
    }
    var O = l.stateNode;
    O !== null && typeof O.componentDidCatch == "function" && (a.callback = function() {
      ZS(i, l, s), typeof p != "function" && (ha === null ? ha = /* @__PURE__ */ new Set([this]) : ha.add(this));
      var D = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: D !== null ? D : ""
      });
    });
  }
  function BR(a, i, l, s, p) {
    if (l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (i = l.alternate, i !== null && Ki(
        i,
        l,
        p,
        !0
      ), l = hn.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Dn === null ? ms() : l.alternate === null && st === 0 && (st = 3), l.flags &= -257, l.flags |= 65536, l.lanes = p, s === Kc ? l.flags |= 16384 : (i = l.updateQueue, i === null ? l.updateQueue = /* @__PURE__ */ new Set([s]) : i.add(s), Dp(a, s, p)), !1;
          case 22:
            return l.flags |= 65536, s === Kc ? l.flags |= 16384 : (i = l.updateQueue, i === null ? (i = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, l.updateQueue = i) : (l = i.retryQueue, l === null ? i.retryQueue = /* @__PURE__ */ new Set([s]) : l.add(s)), Dp(a, s, p)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Dp(a, s, p), ms(), !1;
    }
    if (ze)
      return i = hn.current, i !== null ? ((i.flags & 65536) === 0 && (i.flags |= 256), i.flags |= 65536, i.lanes = p, s !== Ah && (a = Error(r(422), { cause: s }), El(En(a, l)))) : (s !== Ah && (i = Error(r(423), {
        cause: s
      }), El(
        En(i, l)
      )), a = a.current.alternate, a.flags |= 65536, p &= -p, a.lanes |= p, s = En(s, l), p = op(
        a.stateNode,
        s,
        p
      ), zh(a, p), st !== 4 && (st = 2)), !1;
    var m = Error(r(520), { cause: s });
    if (m = En(m, l), Kl === null ? Kl = [m] : Kl.push(m), st !== 4 && (st = 2), i === null) return !0;
    s = En(s, l), l = i;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, a = p & -p, l.lanes |= a, a = op(l.stateNode, s, a), zh(l, a), !1;
        case 1:
          if (i = l.type, m = l.stateNode, (l.flags & 128) === 0 && (typeof i.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (ha === null || !ha.has(m))))
            return l.flags |= 65536, p &= -p, l.lanes |= p, p = QS(p), JS(
              p,
              a,
              l,
              s
            ), zh(l, p), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var lp = Error(r(461)), mt = !1;
  function $t(a, i, l, s) {
    i.child = a === null ? rS(i, null, l, s) : Ja(
      i,
      a.child,
      l,
      s
    );
  }
  function e_(a, i, l, s, p) {
    l = l.render;
    var m = i.ref;
    if ("ref" in s) {
      var O = {};
      for (var D in s)
        D !== "ref" && (O[D] = s[D]);
    } else O = s;
    return Fa(i), s = Ih(
      a,
      i,
      l,
      O,
      m,
      p
    ), D = Hh(), a !== null && !mt ? (Gh(a, i, p), Ar(a, i, p)) : (ze && D && Oh(i), i.flags |= 1, $t(a, i, s, p), i.child);
  }
  function t_(a, i, l, s, p) {
    if (a === null) {
      var m = l.type;
      return typeof m == "function" && !xh(m) && m.defaultProps === void 0 && l.compare === null ? (i.tag = 15, i.type = m, n_(
        a,
        i,
        m,
        s,
        p
      )) : (a = Lc(
        l.type,
        null,
        s,
        i,
        i.mode,
        p
      ), a.ref = i.ref, a.return = i, i.child = a);
    }
    if (m = a.child, !vp(a, p)) {
      var O = m.memoizedProps;
      if (l = l.compare, l = l !== null ? l : wl, l(O, s) && a.ref === i.ref)
        return Ar(a, i, p);
    }
    return i.flags |= 1, a = br(m, s), a.ref = i.ref, a.return = i, i.child = a;
  }
  function n_(a, i, l, s, p) {
    if (a !== null) {
      var m = a.memoizedProps;
      if (wl(m, s) && a.ref === i.ref)
        if (mt = !1, i.pendingProps = s = m, vp(a, p))
          (a.flags & 131072) !== 0 && (mt = !0);
        else
          return i.lanes = a.lanes, Ar(a, i, p);
    }
    return up(
      a,
      i,
      l,
      s,
      p
    );
  }
  function r_(a, i, l, s) {
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
        return a_(
          a,
          i,
          m,
          l,
          s
        );
      }
      if ((l & 536870912) !== 0)
        i.memoizedState = { baseLanes: 0, cachePool: null }, a !== null && Gc(
          i,
          m !== null ? m.cachePool : null
        ), m !== null ? oS(i, m) : kh(), lS(i);
      else
        return s = i.lanes = 536870912, a_(
          a,
          i,
          m !== null ? m.baseLanes | l : l,
          l,
          s
        );
    } else
      m !== null ? (Gc(i, m.cachePool), oS(i, m), ca(), i.memoizedState = null) : (a !== null && Gc(i, null), kh(), ca());
    return $t(a, i, p, l), i.child;
  }
  function Bl(a, i) {
    return a !== null && a.tag === 22 || i.stateNode !== null || (i.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.sibling;
  }
  function a_(a, i, l, s, p) {
    var m = Ph();
    return m = m === null ? null : { parent: vt._currentValue, pool: m }, i.memoizedState = {
      baseLanes: l,
      cachePool: m
    }, a !== null && Gc(i, null), kh(), lS(i), a !== null && Ki(a, i, s, !0), i.childLanes = p, null;
  }
  function os(a, i) {
    return i = us(
      { mode: i.mode, children: i.children },
      a.mode
    ), i.ref = a.ref, a.child = i, i.return = a, i;
  }
  function i_(a, i, l) {
    return Ja(i, a.child, null, l), a = os(i, i.pendingProps), a.flags |= 2, pn(i), i.memoizedState = null, a;
  }
  function LR(a, i, l) {
    var s = i.pendingProps, p = (i.flags & 128) !== 0;
    if (i.flags &= -129, a === null) {
      if (ze) {
        if (s.mode === "hidden")
          return a = os(i, s), i.lanes = 536870912, Bl(null, a);
        if (Lh(i), (a = rt) ? (a = mO(
          a,
          Cn
        ), a = a !== null && a.data === "&" ? a : null, a !== null && (i.memoizedState = {
          dehydrated: a,
          treeContext: ta !== null ? { id: Jn, overflow: er } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Ix(a), l.return = i, i.child = l, Nt = i, rt = null)) : a = null, a === null) throw ra(i);
        return i.lanes = 536870912, null;
      }
      return os(i, s);
    }
    var m = a.memoizedState;
    if (m !== null) {
      var O = m.dehydrated;
      if (Lh(i), p)
        if (i.flags & 256)
          i.flags &= -257, i = i_(
            a,
            i,
            l
          );
        else if (i.memoizedState !== null)
          i.child = a.child, i.flags |= 128, i = null;
        else throw Error(r(558));
      else if (mt || Ki(a, i, l, !1), p = (l & a.childLanes) !== 0, mt || p) {
        if (s = Je, s !== null && (O = F1(s, l), O !== 0 && O !== m.retryLane))
          throw m.retryLane = O, Ya(a, O), rn(s, a, O), lp;
        ms(), i = i_(
          a,
          i,
          l
        );
      } else
        a = m.treeContext, rt = Pn(O.nextSibling), Nt = i, ze = !0, na = null, Cn = !1, a !== null && Yx(i, a), i = os(i, s), i.flags |= 4096;
      return i;
    }
    return a = br(a.child, {
      mode: s.mode,
      children: s.children
    }), a.ref = i.ref, i.child = a, a.return = i, a;
  }
  function ls(a, i) {
    var l = i.ref;
    if (l === null)
      a !== null && a.ref !== null && (i.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (a === null || a.ref !== l) && (i.flags |= 4194816);
    }
  }
  function up(a, i, l, s, p) {
    return Fa(i), l = Ih(
      a,
      i,
      l,
      s,
      void 0,
      p
    ), s = Hh(), a !== null && !mt ? (Gh(a, i, p), Ar(a, i, p)) : (ze && s && Oh(i), i.flags |= 1, $t(a, i, l, p), i.child);
  }
  function o_(a, i, l, s, p, m) {
    return Fa(i), i.updateQueue = null, l = cS(
      i,
      s,
      l,
      p
    ), uS(a), s = Hh(), a !== null && !mt ? (Gh(a, i, m), Ar(a, i, m)) : (ze && s && Oh(i), i.flags |= 1, $t(a, i, l, m), i.child);
  }
  function l_(a, i, l, s, p) {
    if (Fa(i), i.stateNode === null) {
      var m = Ii, O = l.contextType;
      typeof O == "object" && O !== null && (m = Rt(O)), m = new l(s, m), i.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = ip, i.stateNode = m, m._reactInternals = i, m = i.stateNode, m.props = s, m.state = i.memoizedState, m.refs = {}, Rh(i), O = l.contextType, m.context = typeof O == "object" && O !== null ? Rt(O) : Ii, m.state = i.memoizedState, O = l.getDerivedStateFromProps, typeof O == "function" && (ap(
        i,
        l,
        O,
        s
      ), m.state = i.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (O = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), O !== m.state && ip.enqueueReplaceState(m, m.state, null), Rl(i, s, m, p), Nl(), m.state = i.memoizedState), typeof m.componentDidMount == "function" && (i.flags |= 4194308), s = !0;
    } else if (a === null) {
      m = i.stateNode;
      var D = i.memoizedProps, B = ti(l, D);
      m.props = B;
      var Z = m.context, ae = l.contextType;
      O = Ii, typeof ae == "object" && ae !== null && (O = Rt(ae));
      var le = l.getDerivedStateFromProps;
      ae = typeof le == "function" || typeof m.getSnapshotBeforeUpdate == "function", D = i.pendingProps !== D, ae || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (D || Z !== O) && XS(
        i,
        m,
        s,
        O
      ), ia = !1;
      var Q = i.memoizedState;
      m.state = Q, Rl(i, s, m, p), Nl(), Z = i.memoizedState, D || Q !== Z || ia ? (typeof le == "function" && (ap(
        i,
        l,
        le,
        s
      ), Z = i.memoizedState), (B = ia || KS(
        i,
        l,
        B,
        s,
        Q,
        Z,
        O
      )) ? (ae || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = s, i.memoizedState = Z), m.props = s, m.state = Z, m.context = O, s = B) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), s = !1);
    } else {
      m = i.stateNode, $h(a, i), O = i.memoizedProps, ae = ti(l, O), m.props = ae, le = i.pendingProps, Q = m.context, Z = l.contextType, B = Ii, typeof Z == "object" && Z !== null && (B = Rt(Z)), D = l.getDerivedStateFromProps, (Z = typeof D == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (O !== le || Q !== B) && XS(
        i,
        m,
        s,
        B
      ), ia = !1, Q = i.memoizedState, m.state = Q, Rl(i, s, m, p), Nl();
      var te = i.memoizedState;
      O !== le || Q !== te || ia || a !== null && a.dependencies !== null && Ic(a.dependencies) ? (typeof D == "function" && (ap(
        i,
        l,
        D,
        s
      ), te = i.memoizedState), (ae = ia || KS(
        i,
        l,
        ae,
        s,
        Q,
        te,
        B
      ) || a !== null && a.dependencies !== null && Ic(a.dependencies)) ? (Z || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(s, te, B), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        s,
        te,
        B
      )), typeof m.componentDidUpdate == "function" && (i.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 1024), i.memoizedProps = s, i.memoizedState = te), m.props = s, m.state = te, m.context = B, s = ae) : (typeof m.componentDidUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || O === a.memoizedProps && Q === a.memoizedState || (i.flags |= 1024), s = !1);
    }
    return m = s, ls(a, i), s = (i.flags & 128) !== 0, m || s ? (m = i.stateNode, l = s && typeof l.getDerivedStateFromError != "function" ? null : m.render(), i.flags |= 1, a !== null && s ? (i.child = Ja(
      i,
      a.child,
      null,
      p
    ), i.child = Ja(
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
  function u_(a, i, l, s) {
    return Xa(), i.flags |= 256, $t(a, i, l, s), i.child;
  }
  var cp = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sp(a) {
    return { baseLanes: a, cachePool: Zx() };
  }
  function fp(a, i, l) {
    return a = a !== null ? a.childLanes & ~l : 0, i && (a |= yn), a;
  }
  function c_(a, i, l) {
    var s = i.pendingProps, p = !1, m = (i.flags & 128) !== 0, O;
    if ((O = m) || (O = a !== null && a.memoizedState === null ? !1 : (dt.current & 2) !== 0), O && (p = !0, i.flags &= -129), O = (i.flags & 32) !== 0, i.flags &= -33, a === null) {
      if (ze) {
        if (p ? ua(i) : ca(), (a = rt) ? (a = mO(
          a,
          Cn
        ), a = a !== null && a.data !== "&" ? a : null, a !== null && (i.memoizedState = {
          dehydrated: a,
          treeContext: ta !== null ? { id: Jn, overflow: er } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Ix(a), l.return = i, i.child = l, Nt = i, rt = null)) : a = null, a === null) throw ra(i);
        return Xp(a) ? i.lanes = 32 : i.lanes = 536870912, null;
      }
      var D = s.children;
      return s = s.fallback, p ? (ca(), p = i.mode, D = us(
        { mode: "hidden", children: D },
        p
      ), s = Ka(
        s,
        p,
        l,
        null
      ), D.return = i, s.return = i, D.sibling = s, i.child = D, s = i.child, s.memoizedState = sp(l), s.childLanes = fp(
        a,
        O,
        l
      ), i.memoizedState = cp, Bl(null, s)) : (ua(i), dp(i, D));
    }
    var B = a.memoizedState;
    if (B !== null && (D = B.dehydrated, D !== null)) {
      if (m)
        i.flags & 256 ? (ua(i), i.flags &= -257, i = hp(
          a,
          i,
          l
        )) : i.memoizedState !== null ? (ca(), i.child = a.child, i.flags |= 128, i = null) : (ca(), D = s.fallback, p = i.mode, s = us(
          { mode: "visible", children: s.children },
          p
        ), D = Ka(
          D,
          p,
          l,
          null
        ), D.flags |= 2, s.return = i, D.return = i, s.sibling = D, i.child = s, Ja(
          i,
          a.child,
          null,
          l
        ), s = i.child, s.memoizedState = sp(l), s.childLanes = fp(
          a,
          O,
          l
        ), i.memoizedState = cp, i = Bl(null, s));
      else if (ua(i), Xp(D)) {
        if (O = D.nextSibling && D.nextSibling.dataset, O) var Z = O.dgst;
        O = Z, s = Error(r(419)), s.stack = "", s.digest = O, El({ value: s, source: null, stack: null }), i = hp(
          a,
          i,
          l
        );
      } else if (mt || Ki(a, i, l, !1), O = (l & a.childLanes) !== 0, mt || O) {
        if (O = Je, O !== null && (s = F1(O, l), s !== 0 && s !== B.retryLane))
          throw B.retryLane = s, Ya(a, s), rn(O, a, s), lp;
        Kp(D) || ms(), i = hp(
          a,
          i,
          l
        );
      } else
        Kp(D) ? (i.flags |= 192, i.child = a.child, i = null) : (a = B.treeContext, rt = Pn(
          D.nextSibling
        ), Nt = i, ze = !0, na = null, Cn = !1, a !== null && Yx(i, a), i = dp(
          i,
          s.children
        ), i.flags |= 4096);
      return i;
    }
    return p ? (ca(), D = s.fallback, p = i.mode, B = a.child, Z = B.sibling, s = br(B, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = B.subtreeFlags & 65011712, Z !== null ? D = br(
      Z,
      D
    ) : (D = Ka(
      D,
      p,
      l,
      null
    ), D.flags |= 2), D.return = i, s.return = i, s.sibling = D, i.child = s, Bl(null, s), s = i.child, D = a.child.memoizedState, D === null ? D = sp(l) : (p = D.cachePool, p !== null ? (B = vt._currentValue, p = p.parent !== B ? { parent: B, pool: B } : p) : p = Zx(), D = {
      baseLanes: D.baseLanes | l,
      cachePool: p
    }), s.memoizedState = D, s.childLanes = fp(
      a,
      O,
      l
    ), i.memoizedState = cp, Bl(a.child, s)) : (ua(i), l = a.child, a = l.sibling, l = br(l, {
      mode: "visible",
      children: s.children
    }), l.return = i, l.sibling = null, a !== null && (O = i.deletions, O === null ? (i.deletions = [a], i.flags |= 16) : O.push(a)), i.child = l, i.memoizedState = null, l);
  }
  function dp(a, i) {
    return i = us(
      { mode: "visible", children: i },
      a.mode
    ), i.return = a, a.child = i;
  }
  function us(a, i) {
    return a = dn(22, a, null, i), a.lanes = 0, a;
  }
  function hp(a, i, l) {
    return Ja(i, a.child, null, l), a = dp(
      i,
      i.pendingProps.children
    ), a.flags |= 2, i.memoizedState = null, a;
  }
  function s_(a, i, l) {
    a.lanes |= i;
    var s = a.alternate;
    s !== null && (s.lanes |= i), jh(a.return, i, l);
  }
  function pp(a, i, l, s, p, m) {
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
  function f_(a, i, l) {
    var s = i.pendingProps, p = s.revealOrder, m = s.tail;
    s = s.children;
    var O = dt.current, D = (O & 2) !== 0;
    if (D ? (O = O & 1 | 2, i.flags |= 128) : O &= 1, re(dt, O), $t(a, i, s, l), s = ze ? Tl : 0, !D && a !== null && (a.flags & 128) !== 0)
      e: for (a = i.child; a !== null; ) {
        if (a.tag === 13)
          a.memoizedState !== null && s_(a, l, i);
        else if (a.tag === 19)
          s_(a, l, i);
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
          a = l.alternate, a !== null && Wc(a) === null && (p = l), l = l.sibling;
        l = p, l === null ? (p = i.child, i.child = null) : (p = l.sibling, l.sibling = null), pp(
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
          if (a = p.alternate, a !== null && Wc(a) === null) {
            i.child = p;
            break;
          }
          a = p.sibling, p.sibling = l, l = p, p = a;
        }
        pp(
          i,
          !0,
          l,
          null,
          m,
          s
        );
        break;
      case "together":
        pp(
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
      for (a = i.child, l = br(a, a.pendingProps), i.child = l, l.return = i; a.sibling !== null; )
        a = a.sibling, l = l.sibling = br(a, a.pendingProps), l.return = i;
      l.sibling = null;
    }
    return i.child;
  }
  function vp(a, i) {
    return (a.lanes & i) !== 0 ? !0 : (a = a.dependencies, !!(a !== null && Ic(a)));
  }
  function UR(a, i, l) {
    switch (i.tag) {
      case 3:
        Ce(i, i.stateNode.containerInfo), aa(i, vt, a.memoizedState.cache), Xa();
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
          return i.flags |= 128, Lh(i), null;
        break;
      case 13:
        var s = i.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (ua(i), i.flags |= 128, null) : (l & i.child.childLanes) !== 0 ? c_(a, i, l) : (ua(i), a = Ar(
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
            return f_(
              a,
              i,
              l
            );
          i.flags |= 128;
        }
        if (p = i.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), re(dt, dt.current), s) break;
        return null;
      case 22:
        return i.lanes = 0, r_(
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
  function d_(a, i, l) {
    if (a !== null)
      if (a.memoizedProps !== i.pendingProps)
        mt = !0;
      else {
        if (!vp(a, l) && (i.flags & 128) === 0)
          return mt = !1, UR(
            a,
            i,
            l
          );
        mt = (a.flags & 131072) !== 0;
      }
    else
      mt = !1, ze && (i.flags & 1048576) !== 0 && Gx(i, Tl, i.index);
    switch (i.lanes = 0, i.tag) {
      case 16:
        e: {
          var s = i.pendingProps;
          if (a = Za(i.elementType), i.type = a, typeof a == "function")
            xh(a) ? (s = ti(a, s), i.tag = 1, i = l_(
              null,
              i,
              a,
              s,
              l
            )) : (i.tag = 0, i = up(
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
                i.tag = 11, i = e_(
                  null,
                  i,
                  a,
                  s,
                  l
                );
                break e;
              } else if (p === j) {
                i.tag = 14, i = t_(
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
        return up(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 1:
        return s = i.type, p = ti(
          s,
          i.pendingProps
        ), l_(
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
          p = m.element, $h(a, i), Rl(i, s, null, l);
          var O = i.memoizedState;
          if (s = O.cache, aa(i, vt, s), s !== m.cache && Mh(
            i,
            [vt],
            l,
            !0
          ), Nl(), s = O.element, m.isDehydrated)
            if (m = {
              element: s,
              isDehydrated: !1,
              cache: O.cache
            }, i.updateQueue.baseState = m, i.memoizedState = m, i.flags & 256) {
              i = u_(
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
              ), El(p), i = u_(
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
              for (rt = Pn(a.firstChild), Nt = i, ze = !0, na = null, Cn = !0, l = rS(
                i,
                null,
                s,
                l
              ), i.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Xa(), s === p) {
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
        return ls(a, i), a === null ? (l = OO(
          i.type,
          null,
          i.pendingProps,
          null
        )) ? i.memoizedState = l : ze || (l = i.type, a = i.pendingProps, s = ws(
          fe.current
        ).createElement(l), s[Pt] = i, s[Zt] = a, zt(s, l, a), jt(s), i.stateNode = s) : i.memoizedState = OO(
          i.type,
          a.memoizedProps,
          i.pendingProps,
          a.memoizedState
        ), null;
      case 27:
        return ge(i), a === null && ze && (s = i.stateNode = xO(
          i.type,
          i.pendingProps,
          fe.current
        ), Nt = i, Cn = !0, p = rt, ma(i.type) ? (Vp = p, rt = Pn(s.firstChild)) : rt = p), $t(
          a,
          i,
          i.pendingProps.children,
          l
        ), ls(a, i), a === null && (i.flags |= 4194304), i.child;
      case 5:
        return a === null && ze && ((p = s = rt) && (s = m3(
          s,
          i.type,
          i.pendingProps,
          Cn
        ), s !== null ? (i.stateNode = s, Nt = i, rt = Pn(s.firstChild), Cn = !1, p = !0) : p = !1), p || ra(i)), ge(i), p = i.type, m = i.pendingProps, O = a !== null ? a.memoizedProps : null, s = m.children, Hp(p, m) ? s = null : O !== null && Hp(p, O) && (i.flags |= 32), i.memoizedState !== null && (p = Ih(
          a,
          i,
          PR,
          null,
          null,
          l
        ), eu._currentValue = p), ls(a, i), $t(a, i, s, l), i.child;
      case 6:
        return a === null && ze && ((a = l = rt) && (l = g3(
          l,
          i.pendingProps,
          Cn
        ), l !== null ? (i.stateNode = l, Nt = i, rt = null, a = !0) : a = !1), a || ra(i)), null;
      case 13:
        return c_(a, i, l);
      case 4:
        return Ce(
          i,
          i.stateNode.containerInfo
        ), s = i.pendingProps, a === null ? i.child = Ja(
          i,
          null,
          s,
          l
        ) : $t(a, i, s, l), i.child;
      case 11:
        return e_(
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
        return p = i.type._context, s = i.pendingProps.children, Fa(i), p = Rt(p), s = s(p), i.flags |= 1, $t(a, i, s, l), i.child;
      case 14:
        return t_(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 15:
        return n_(
          a,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 19:
        return f_(a, i, l);
      case 31:
        return LR(a, i, l);
      case 22:
        return r_(
          a,
          i,
          l,
          i.pendingProps
        );
      case 24:
        return Fa(i), s = Rt(vt), a === null ? (p = Ph(), p === null && (p = Je, m = Ch(), p.pooledCache = m, m.refCount++, m !== null && (p.pooledCacheLanes |= l), p = m), i.memoizedState = { parent: s, cache: p }, Rh(i), aa(i, vt, p)) : ((a.lanes & l) !== 0 && ($h(a, i), Rl(i, null, null, l), Nl()), p = a.memoizedState, m = i.memoizedState, p.parent !== s ? (p = { parent: s, cache: s }, i.memoizedState = p, i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = p), aa(i, vt, s)) : (s = m.cache, aa(i, vt, s), s !== p.cache && Mh(
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
  function yp(a, i, l, s, p) {
    if ((i = (a.mode & 32) !== 0) && (i = !1), i) {
      if (a.flags |= 16777216, (p & 335544128) === p)
        if (a.stateNode.complete) a.flags |= 8192;
        else if (B_()) a.flags |= 8192;
        else
          throw Qa = Kc, Nh;
    } else a.flags &= -16777217;
  }
  function h_(a, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
      a.flags &= -16777217;
    else if (a.flags |= 16777216, !jO(i))
      if (B_()) a.flags |= 8192;
      else
        throw Qa = Kc, Nh;
  }
  function cs(a, i) {
    i !== null && (a.flags |= 4), a.flags & 16384 && (i = a.tag !== 22 ? K1() : 536870912, a.lanes |= i, ao |= i);
  }
  function Ll(a, i) {
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
  function IR(a, i, l) {
    var s = i.pendingProps;
    switch (wh(i), i.tag) {
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
        return l = i.stateNode, s = null, a !== null && (s = a.memoizedState.cache), i.memoizedState.cache !== s && (i.flags |= 2048), _r(vt), ce(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (a === null || a.child === null) && (Yi(i) ? Tr(i) : a === null || a.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, Th())), at(i), null;
      case 26:
        var p = i.type, m = i.memoizedState;
        return a === null ? (Tr(i), m !== null ? (at(i), h_(i, m)) : (at(i), yp(
          i,
          p,
          null,
          s,
          l
        ))) : m ? m !== a.memoizedState ? (Tr(i), at(i), h_(i, m)) : (at(i), i.flags &= -16777217) : (a = a.memoizedProps, a !== s && Tr(i), at(i), yp(
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
          a = se.current, Yi(i) ? Kx(i) : (a = xO(p, s, l), i.stateNode = a, Tr(i));
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
          if (m = se.current, Yi(i))
            Kx(i);
          else {
            var O = ws(
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
        return at(i), yp(
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
          if (a = fe.current, Yi(i)) {
            if (a = i.stateNode, l = i.memoizedProps, s = null, p = Nt, p !== null)
              switch (p.tag) {
                case 27:
                case 5:
                  s = p.memoizedProps;
              }
            a[Pt] = i, a = !!(a.nodeValue === l || s !== null && s.suppressHydrationWarning === !0 || cO(a.nodeValue, l)), a || ra(i, !0);
          } else
            a = ws(a).createTextNode(
              s
            ), a[Pt] = i, i.stateNode = a;
        }
        return at(i), null;
      case 31:
        if (l = i.memoizedState, a === null || a.memoizedState !== null) {
          if (s = Yi(i), l !== null) {
            if (a === null) {
              if (!s) throw Error(r(318));
              if (a = i.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(557));
              a[Pt] = i;
            } else
              Xa(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            at(i), a = !1;
          } else
            l = Th(), a !== null && a.memoizedState !== null && (a.memoizedState.hydrationErrors = l), a = !0;
          if (!a)
            return i.flags & 256 ? (pn(i), i) : (pn(i), null);
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
              p[Pt] = i;
            } else
              Xa(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            at(i), p = !1;
          } else
            p = Th(), a !== null && a.memoizedState !== null && (a.memoizedState.hydrationErrors = p), p = !0;
          if (!p)
            return i.flags & 256 ? (pn(i), i) : (pn(i), null);
        }
        return pn(i), (i.flags & 128) !== 0 ? (i.lanes = l, i) : (l = s !== null, a = a !== null && a.memoizedState !== null, l && (s = i.child, p = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (p = s.alternate.memoizedState.cachePool.pool), m = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (m = s.memoizedState.cachePool.pool), m !== p && (s.flags |= 2048)), l !== a && l && (i.child.flags |= 8192), cs(i, i.updateQueue), at(i), null);
      case 4:
        return ce(), a === null && kp(i.stateNode.containerInfo), at(i), null;
      case 10:
        return _r(i.type), at(i), null;
      case 19:
        if (I(dt), s = i.memoizedState, s === null) return at(i), null;
        if (p = (i.flags & 128) !== 0, m = s.rendering, m === null)
          if (p) Ll(s, !1);
          else {
            if (st !== 0 || a !== null && (a.flags & 128) !== 0)
              for (a = i.child; a !== null; ) {
                if (m = Wc(a), m !== null) {
                  for (i.flags |= 128, Ll(s, !1), a = m.updateQueue, i.updateQueue = a, cs(i, a), i.subtreeFlags = 0, a = l, l = i.child; l !== null; )
                    Ux(l, a), l = l.sibling;
                  return re(
                    dt,
                    dt.current & 1 | 2
                  ), ze && xr(i, s.treeForkCount), i.child;
                }
                a = a.sibling;
              }
            s.tail !== null && Lt() > ps && (i.flags |= 128, p = !0, Ll(s, !1), i.lanes = 4194304);
          }
        else {
          if (!p)
            if (a = Wc(m), a !== null) {
              if (i.flags |= 128, p = !0, a = a.updateQueue, i.updateQueue = a, cs(i, a), Ll(s, !0), s.tail === null && s.tailMode === "hidden" && !m.alternate && !ze)
                return at(i), null;
            } else
              2 * Lt() - s.renderingStartTime > ps && l !== 536870912 && (i.flags |= 128, p = !0, Ll(s, !1), i.lanes = 4194304);
          s.isBackwards ? (m.sibling = i.child, i.child = m) : (a = s.last, a !== null ? a.sibling = m : i.child = m, s.last = m);
        }
        return s.tail !== null ? (a = s.tail, s.rendering = a, s.tail = a.sibling, s.renderingStartTime = Lt(), a.sibling = null, l = dt.current, re(
          dt,
          p ? l & 1 | 2 : l & 1
        ), ze && xr(i, s.treeForkCount), a) : (at(i), null);
      case 22:
      case 23:
        return pn(i), Bh(), s = i.memoizedState !== null, a !== null ? a.memoizedState !== null !== s && (i.flags |= 8192) : s && (i.flags |= 8192), s ? (l & 536870912) !== 0 && (i.flags & 128) === 0 && (at(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : at(i), l = i.updateQueue, l !== null && cs(i, l.retryQueue), l = null, a !== null && a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== l && (i.flags |= 2048), a !== null && I(Wa), null;
      case 24:
        return l = null, a !== null && (l = a.memoizedState.cache), i.memoizedState.cache !== l && (i.flags |= 2048), _r(vt), at(i), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, i.tag));
  }
  function HR(a, i) {
    switch (wh(i), i.tag) {
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
          Xa();
        }
        return a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 13:
        if (pn(i), a = i.memoizedState, a !== null && a.dehydrated !== null) {
          if (i.alternate === null)
            throw Error(r(340));
          Xa();
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
        return pn(i), Bh(), a !== null && I(Wa), a = i.flags, a & 65536 ? (i.flags = a & -65537 | 128, i) : null;
      case 24:
        return _r(vt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function p_(a, i) {
    switch (wh(i), i.tag) {
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
        pn(i), Bh(), a !== null && I(Wa);
        break;
      case 24:
        _r(vt);
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
              var B = l, Z = D;
              try {
                Z();
              } catch (ae) {
                Xe(
                  p,
                  B,
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
  function v_(a) {
    var i = a.updateQueue;
    if (i !== null) {
      var l = a.stateNode;
      try {
        iS(i, l);
      } catch (s) {
        Xe(a, a.return, s);
      }
    }
  }
  function y_(a, i, l) {
    l.props = ti(
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
  function m_(a) {
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
  function mp(a, i, l) {
    try {
      var s = a.stateNode;
      f3(s, a.type, l, i), s[Zt] = i;
    } catch (p) {
      Xe(a, a.return, p);
    }
  }
  function g_(a) {
    return a.tag === 5 || a.tag === 3 || a.tag === 26 || a.tag === 27 && ma(a.type) || a.tag === 4;
  }
  function gp(a) {
    e: for (; ; ) {
      for (; a.sibling === null; ) {
        if (a.return === null || g_(a.return)) return null;
        a = a.return;
      }
      for (a.sibling.return = a.return, a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18; ) {
        if (a.tag === 27 && ma(a.type) || a.flags & 2 || a.child === null || a.tag === 4) continue e;
        a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function bp(a, i, l) {
    var s = a.tag;
    if (s === 5 || s === 6)
      a = a.stateNode, i ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(a, i) : (i = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, i.appendChild(a), l = l._reactRootContainer, l != null || i.onclick !== null || (i.onclick = mr));
    else if (s !== 4 && (s === 27 && ma(a.type) && (l = a.stateNode, i = null), a = a.child, a !== null))
      for (bp(a, i, l), a = a.sibling; a !== null; )
        bp(a, i, l), a = a.sibling;
  }
  function ss(a, i, l) {
    var s = a.tag;
    if (s === 5 || s === 6)
      a = a.stateNode, i ? l.insertBefore(a, i) : l.appendChild(a);
    else if (s !== 4 && (s === 27 && ma(a.type) && (l = a.stateNode), a = a.child, a !== null))
      for (ss(a, i, l), a = a.sibling; a !== null; )
        ss(a, i, l), a = a.sibling;
  }
  function b_(a) {
    var i = a.stateNode, l = a.memoizedProps;
    try {
      for (var s = a.type, p = i.attributes; p.length; )
        i.removeAttributeNode(p[0]);
      zt(i, s, l), i[Pt] = a, i[Zt] = l;
    } catch (m) {
      Xe(a, a.return, m);
    }
  }
  var Er = !1, gt = !1, xp = !1, x_ = typeof WeakSet == "function" ? WeakSet : Set, Mt = null;
  function GR(a, i) {
    if (a = a.containerInfo, Up = Ds, a = Px(a), hh(a)) {
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
            var O = 0, D = -1, B = -1, Z = 0, ae = 0, le = a, Q = null;
            t: for (; ; ) {
              for (var te; le !== l || p !== 0 && le.nodeType !== 3 || (D = O + p), le !== m || s !== 0 && le.nodeType !== 3 || (B = O + s), le.nodeType === 3 && (O += le.nodeValue.length), (te = le.firstChild) !== null; )
                Q = le, le = te;
              for (; ; ) {
                if (le === a) break t;
                if (Q === l && ++Z === p && (D = O), Q === m && ++ae === s && (B = O), (te = le.nextSibling) !== null) break;
                le = Q, Q = le.parentNode;
              }
              le = te;
            }
            l = D === -1 || B === -1 ? null : { start: D, end: B };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ip = { focusedElem: a, selectionRange: l }, Ds = !1, Mt = i; Mt !== null; )
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
                  var ye = ti(
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
                  Yp(a);
                else if (l === 1)
                  switch (a.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Yp(a);
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
  function S_(a, i, l) {
    var s = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Mr(a, l), s & 4 && Ul(5, l);
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
            var p = ti(
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
        s & 64 && v_(l), s & 512 && Il(l, l.return);
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
            iS(a, i);
          } catch (O) {
            Xe(l, l.return, O);
          }
        }
        break;
      case 27:
        i === null && s & 4 && b_(l);
      case 26:
      case 5:
        Mr(a, l), i === null && s & 4 && m_(l), s & 512 && Il(l, l.return);
        break;
      case 12:
        Mr(a, l);
        break;
      case 31:
        Mr(a, l), s & 4 && w_(a, l);
        break;
      case 13:
        Mr(a, l), s & 4 && A_(a, l), s & 64 && (a = l.memoizedState, a !== null && (a = a.dehydrated, a !== null && (l = JR.bind(
          null,
          l
        ), b3(a, l))));
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
  function __(a) {
    var i = a.alternate;
    i !== null && (a.alternate = null, __(i)), a.child = null, a.deletions = null, a.sibling = null, a.tag === 5 && (i = a.stateNode, i !== null && Wd(i)), a.stateNode = null, a.return = null, a.dependencies = null, a.memoizedProps = null, a.memoizedState = null, a.pendingProps = null, a.stateNode = null, a.updateQueue = null;
  }
  var lt = null, Jt = !1;
  function jr(a, i, l) {
    for (l = l.child; l !== null; )
      O_(a, i, l), l = l.sibling;
  }
  function O_(a, i, l) {
    if (cn && typeof cn.onCommitFiberUnmount == "function")
      try {
        cn.onCommitFiberUnmount(dl, l);
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
        ), Zl(l.stateNode), lt = s, Jt = p;
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
        lt !== null && (Jt ? (a = lt, vO(
          a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a,
          l.stateNode
        ), ho(a)) : vO(lt, l.stateNode));
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
        gt || (tr(l, i), s = l.stateNode, typeof s.componentWillUnmount == "function" && y_(
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
  function w_(a, i) {
    if (i.memoizedState === null && (a = i.alternate, a !== null && (a = a.memoizedState, a !== null))) {
      a = a.dehydrated;
      try {
        ho(a);
      } catch (l) {
        Xe(i, i.return, l);
      }
    }
  }
  function A_(a, i) {
    if (i.memoizedState === null && (a = i.alternate, a !== null && (a = a.memoizedState, a !== null && (a = a.dehydrated, a !== null))))
      try {
        ho(a);
      } catch (l) {
        Xe(i, i.return, l);
      }
  }
  function YR(a) {
    switch (a.tag) {
      case 31:
      case 13:
      case 19:
        var i = a.stateNode;
        return i === null && (i = a.stateNode = new x_()), i;
      case 22:
        return a = a.stateNode, i = a._retryCache, i === null && (i = a._retryCache = new x_()), i;
      default:
        throw Error(r(435, a.tag));
    }
  }
  function fs(a, i) {
    var l = YR(a);
    i.forEach(function(s) {
      if (!l.has(s)) {
        l.add(s);
        var p = e3.bind(null, a, s);
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
        O_(m, O, p), lt = null, Jt = !1, m = p.alternate, m !== null && (m.return = null), p.return = null;
      }
    if (i.subtreeFlags & 13886)
      for (i = i.child; i !== null; )
        T_(i, a), i = i.sibling;
  }
  var Hn = null;
  function T_(a, i) {
    var l = a.alternate, s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        en(i, a), tn(a), s & 4 && (sa(3, a, a.return), Ul(3, a), sa(5, a, a.return));
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
                      m = p.getElementsByTagName("title")[0], (!m || m[vl] || m[Pt] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = p.createElement(s), p.head.insertBefore(
                        m,
                        p.querySelector("head > title")
                      )), zt(m, s, l), m[Pt] = a, jt(m), s = m;
                      break e;
                    case "link":
                      var O = TO(
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
                      if (O = TO(
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
                EO(
                  p,
                  a.type,
                  a.stateNode
                );
            else
              a.stateNode = AO(
                p,
                s,
                a.memoizedProps
              );
          else
            m !== s ? (m === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : m.count--, s === null ? EO(
              p,
              a.type,
              a.stateNode
            ) : AO(
              p,
              s,
              a.memoizedProps
            )) : s === null && a.stateNode !== null && mp(
              a,
              a.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        en(i, a), tn(a), s & 512 && (gt || l === null || tr(l, l.return)), l !== null && s & 4 && mp(
          a,
          a.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (en(i, a), tn(a), s & 512 && (gt || l === null || tr(l, l.return)), a.flags & 32) {
          p = a.stateNode;
          try {
            $i(p, "");
          } catch (ye) {
            Xe(a, a.return, ye);
          }
        }
        s & 4 && a.stateNode != null && (p = a.memoizedProps, mp(
          a,
          p,
          l !== null ? l.memoizedProps : p
        )), s & 1024 && (xp = !0);
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
        if (Es = null, p = Hn, Hn = As(i.containerInfo), en(i, a), Hn = p, tn(a), s & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ho(i.containerInfo);
          } catch (ye) {
            Xe(a, a.return, ye);
          }
        xp && (xp = !1, E_(a));
        break;
      case 4:
        s = Hn, Hn = As(
          a.stateNode.containerInfo
        ), en(i, a), tn(a), Hn = s;
        break;
      case 12:
        en(i, a), tn(a);
        break;
      case 31:
        en(i, a), tn(a), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, fs(a, s)));
        break;
      case 13:
        en(i, a), tn(a), a.child.flags & 8192 && a.memoizedState !== null != (l !== null && l.memoizedState !== null) && (hs = Lt()), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, fs(a, s)));
        break;
      case 22:
        p = a.memoizedState !== null;
        var B = l !== null && l.memoizedState !== null, Z = Er, ae = gt;
        if (Er = Z || p, gt = ae || B, en(i, a), gt = ae, Er = Z, tn(a), s & 8192)
          e: for (i = a.stateNode, i._visibility = p ? i._visibility & -2 : i._visibility | 1, p && (l === null || B || Er || gt || ni(a)), l = null, i = a; ; ) {
            if (i.tag === 5 || i.tag === 26) {
              if (l === null) {
                B = l = i;
                try {
                  if (m = B.stateNode, p)
                    O = m.style, typeof O.setProperty == "function" ? O.setProperty("display", "none", "important") : O.display = "none";
                  else {
                    D = B.stateNode;
                    var le = B.memoizedProps.style, Q = le != null && le.hasOwnProperty("display") ? le.display : null;
                    D.style.display = Q == null || typeof Q == "boolean" ? "" : ("" + Q).trim();
                  }
                } catch (ye) {
                  Xe(B, B.return, ye);
                }
              }
            } else if (i.tag === 6) {
              if (l === null) {
                B = i;
                try {
                  B.stateNode.nodeValue = p ? "" : B.memoizedProps;
                } catch (ye) {
                  Xe(B, B.return, ye);
                }
              }
            } else if (i.tag === 18) {
              if (l === null) {
                B = i;
                try {
                  var te = B.stateNode;
                  p ? yO(te, !0) : yO(B.stateNode, !1);
                } catch (ye) {
                  Xe(B, B.return, ye);
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
        s & 4 && (s = a.updateQueue, s !== null && (l = s.retryQueue, l !== null && (s.retryQueue = null, fs(a, l))));
        break;
      case 19:
        en(i, a), tn(a), s & 4 && (s = a.updateQueue, s !== null && (a.updateQueue = null, fs(a, s)));
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
          if (g_(s)) {
            l = s;
            break;
          }
          s = s.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var p = l.stateNode, m = gp(a);
            ss(a, m, p);
            break;
          case 5:
            var O = l.stateNode;
            l.flags & 32 && ($i(O, ""), l.flags &= -33);
            var D = gp(a);
            ss(a, D, O);
            break;
          case 3:
          case 4:
            var B = l.stateNode.containerInfo, Z = gp(a);
            bp(
              a,
              Z,
              B
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
  function E_(a) {
    if (a.subtreeFlags & 1024)
      for (a = a.child; a !== null; ) {
        var i = a;
        E_(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), a = a.sibling;
      }
  }
  function Mr(a, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; )
        S_(a, i.alternate, i), i = i.sibling;
  }
  function ni(a) {
    for (a = a.child; a !== null; ) {
      var i = a;
      switch (i.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sa(4, i, i.return), ni(i);
          break;
        case 1:
          tr(i, i.return);
          var l = i.stateNode;
          typeof l.componentWillUnmount == "function" && y_(
            i,
            i.return,
            l
          ), ni(i);
          break;
        case 27:
          Zl(i.stateNode);
        case 26:
        case 5:
          tr(i, i.return), ni(i);
          break;
        case 22:
          i.memoizedState === null && ni(i);
          break;
        case 30:
          ni(i);
          break;
        default:
          ni(i);
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
          ), Ul(4, m);
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
              var B = p.shared.hiddenCallbacks;
              if (B !== null)
                for (p.shared.hiddenCallbacks = null, p = 0; p < B.length; p++)
                  aS(B[p], D);
            } catch (Z) {
              Xe(s, s.return, Z);
            }
          }
          l && O & 64 && v_(m), Il(m, m.return);
          break;
        case 27:
          b_(m);
        case 26:
        case 5:
          Cr(
            p,
            m,
            l
          ), l && s === null && O & 4 && m_(m), Il(m, m.return);
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
          ), l && O & 4 && w_(p, m);
          break;
        case 13:
          Cr(
            p,
            m,
            l
          ), l && O & 4 && A_(p, m);
          break;
        case 22:
          m.memoizedState === null && Cr(
            p,
            m,
            l
          ), Il(m, m.return);
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
  function Sp(a, i) {
    var l = null;
    a !== null && a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), a = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (a = i.memoizedState.cachePool.pool), a !== l && (a != null && a.refCount++, l != null && jl(l));
  }
  function _p(a, i) {
    a = null, i.alternate !== null && (a = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== a && (i.refCount++, a != null && jl(a));
  }
  function Gn(a, i, l, s) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; )
        j_(
          a,
          i,
          l,
          s
        ), i = i.sibling;
  }
  function j_(a, i, l, s) {
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
        ), p & 2048 && Ul(9, i);
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
        ), p & 2048 && (a = null, i.alternate !== null && (a = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== a && (i.refCount++, a != null && jl(a)));
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
          } catch (B) {
            Xe(i, i.return, B);
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
        ) : Hl(a, i) : m._visibility & 2 ? Gn(
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
        )), p & 2048 && Sp(O, i);
        break;
      case 24:
        Gn(
          a,
          i,
          l,
          s
        ), p & 2048 && _p(i.alternate, i);
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
  function to(a, i, l, s, p) {
    for (p = p && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
      var m = a, O = i, D = l, B = s, Z = O.flags;
      switch (O.tag) {
        case 0:
        case 11:
        case 15:
          to(
            m,
            O,
            D,
            B,
            p
          ), Ul(8, O);
          break;
        case 23:
          break;
        case 22:
          var ae = O.stateNode;
          O.memoizedState !== null ? ae._visibility & 2 ? to(
            m,
            O,
            D,
            B,
            p
          ) : Hl(
            m,
            O
          ) : (ae._visibility |= 2, to(
            m,
            O,
            D,
            B,
            p
          )), p && Z & 2048 && Sp(
            O.alternate,
            O
          );
          break;
        case 24:
          to(
            m,
            O,
            D,
            B,
            p
          ), p && Z & 2048 && _p(O.alternate, O);
          break;
        default:
          to(
            m,
            O,
            D,
            B,
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
            Hl(l, s), p & 2048 && Sp(
              s.alternate,
              s
            );
            break;
          case 24:
            Hl(l, s), p & 2048 && _p(s.alternate, s);
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
        M_(
          a,
          i,
          l
        ), a = a.sibling;
  }
  function M_(a, i, l) {
    switch (a.tag) {
      case 26:
        no(
          a,
          i,
          l
        ), a.flags & Gl && a.memoizedState !== null && D3(
          l,
          Hn,
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
        var s = Hn;
        Hn = As(a.stateNode.containerInfo), no(
          a,
          i,
          l
        ), Hn = s;
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
  function C_(a) {
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
          Mt = s, P_(
            s,
            a
          );
        }
      C_(a);
    }
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        D_(a), a = a.sibling;
  }
  function D_(a) {
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
        a.memoizedState !== null && i._visibility & 2 && (a.return === null || a.return.tag !== 13) ? (i._visibility &= -3, ds(a)) : Yl(a);
        break;
      default:
        Yl(a);
    }
  }
  function ds(a) {
    var i = a.deletions;
    if ((a.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l];
          Mt = s, P_(
            s,
            a
          );
        }
      C_(a);
    }
    for (a = a.child; a !== null; ) {
      switch (i = a, i.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, i, i.return), ds(i);
          break;
        case 22:
          l = i.stateNode, l._visibility & 2 && (l._visibility &= -3, ds(i));
          break;
        default:
          ds(i);
      }
      a = a.sibling;
    }
  }
  function P_(a, i) {
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
          jl(l.memoizedState.cache);
      }
      if (s = l.child, s !== null) s.return = l, Mt = s;
      else
        e: for (l = a; Mt !== null; ) {
          s = Mt;
          var p = s.sibling, m = s.return;
          if (__(s), s === l) {
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
  var KR = {
    getCacheForType: function(a) {
      var i = Rt(vt), l = i.data.get(a);
      return l === void 0 && (l = a(), i.data.set(a, l)), l;
    },
    cacheSignal: function() {
      return Rt(vt).controller.signal;
    }
  }, XR = typeof WeakMap == "function" ? WeakMap : Map, Ue = 0, Je = null, De = null, Ne = 0, Ke = 0, vn = null, fa = !1, ro = !1, Op = !1, Dr = 0, st = 0, da = 0, ri = 0, wp = 0, yn = 0, ao = 0, Kl = null, nn = null, Ap = !1, hs = 0, N_ = 0, ps = 1 / 0, vs = null, ha = null, St = 0, pa = null, io = null, Pr = 0, Tp = 0, Ep = null, R_ = null, Xl = 0, jp = null;
  function mn() {
    return (Ue & 2) !== 0 && Ne !== 0 ? Ne & -Ne : z.T !== null ? Rp() : W1();
  }
  function $_() {
    if (yn === 0)
      if ((Ne & 536870912) === 0 || ze) {
        var a = Oc;
        Oc <<= 1, (Oc & 3932160) === 0 && (Oc = 262144), yn = a;
      } else yn = 536870912;
    return a = hn.current, a !== null && (a.flags |= 32), yn;
  }
  function rn(a, i, l) {
    (a === Je && (Ke === 2 || Ke === 9) || a.cancelPendingCommit !== null) && (oo(a, 0), va(
      a,
      Ne,
      yn,
      !1
    )), pl(a, l), ((Ue & 2) === 0 || a !== Je) && (a === Je && ((Ue & 2) === 0 && (ri |= l), st === 4 && va(
      a,
      Ne,
      yn,
      !1
    )), nr(a));
  }
  function z_(a, i, l) {
    if ((Ue & 6) !== 0) throw Error(r(327));
    var s = !l && (i & 127) === 0 && (i & a.expiredLanes) === 0 || hl(a, i), p = s ? WR(a, i) : Cp(a, i, !0), m = s;
    do {
      if (p === 0) {
        ro && !s && va(a, i, 0, !1);
        break;
      } else {
        if (l = a.current.alternate, m && !VR(l)) {
          p = Cp(a, i, !1), m = !1;
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
              var B = D.current.memoizedState.isDehydrated;
              if (B && (oo(D, O).flags |= 256), O = Cp(
                D,
                O,
                !1
              ), O !== 2) {
                if (Op && !B) {
                  D.errorRecoveryDisabledLanes |= m, ri |= m, p = 4;
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
          if ((i & 62914560) === i && (p = hs + 300 - Lt(), 10 < p)) {
            if (va(
              s,
              i,
              yn,
              !fa
            ), Ac(s, 0, !0) !== 0) break e;
            Pr = i, s.timeoutHandle = hO(
              q_.bind(
                null,
                s,
                l,
                nn,
                vs,
                Ap,
                i,
                yn,
                ri,
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
          q_(
            s,
            l,
            nn,
            vs,
            Ap,
            i,
            yn,
            ri,
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
    nr(a);
  }
  function q_(a, i, l, s, p, m, O, D, B, Z, ae, le, Q, te) {
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
      }, M_(
        i,
        m,
        le
      );
      var ye = (m & 62914560) === m ? hs - Lt() : (m & 4194048) === m ? N_ - Lt() : 0;
      if (ye = P3(
        le,
        ye
      ), ye !== null) {
        Pr = m, a.cancelPendingCommit = ye(
          Y_.bind(
            null,
            a,
            i,
            m,
            l,
            s,
            p,
            O,
            D,
            B,
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
    Y_(
      a,
      i,
      m,
      l,
      s,
      p,
      O,
      D,
      B
    );
  }
  function VR(a) {
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
    i &= ~wp, i &= ~ri, a.suspendedLanes |= i, a.pingedLanes &= ~i, s && (a.warmLanes |= i), s = a.expirationTimes;
    for (var p = i; 0 < p; ) {
      var m = 31 - sn(p), O = 1 << m;
      s[m] = -1, p &= ~O;
    }
    l !== 0 && X1(a, l, i);
  }
  function ys() {
    return (Ue & 6) === 0 ? (Vl(0), !1) : !0;
  }
  function Mp() {
    if (De !== null) {
      if (Ke === 0)
        var a = De.return;
      else
        a = De, Sr = Va = null, Yh(a), Wi = null, Cl = 0, a = De;
      for (; a !== null; )
        p_(a.alternate, a), a = a.return;
      De = null;
    }
  }
  function oo(a, i) {
    var l = a.timeoutHandle;
    l !== -1 && (a.timeoutHandle = -1, p3(l)), l = a.cancelPendingCommit, l !== null && (a.cancelPendingCommit = null, l()), Pr = 0, Mp(), Je = a, De = l = br(a.current, null), Ne = i, Ke = 0, vn = null, fa = !1, ro = hl(a, i), Op = !1, ao = yn = wp = ri = da = st = 0, nn = Kl = null, Ap = !1, (i & 8) !== 0 && (i |= i & 32);
    var s = a.entangledLanes;
    if (s !== 0)
      for (a = a.entanglements, s &= i; 0 < s; ) {
        var p = 31 - sn(s), m = 1 << p;
        i |= a[p], s &= ~m;
      }
    return Dr = i, qc(), l;
  }
  function k_(a, i) {
    je = null, z.H = kl, i === Fi || i === Yc ? (i = eS(), Ke = 3) : i === Nh ? (i = eS(), Ke = 4) : Ke = i === lp ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1, vn = i, De === null && (st = 1, is(
      a,
      En(i, a.current)
    ));
  }
  function B_() {
    var a = hn.current;
    return a === null ? !0 : (Ne & 4194048) === Ne ? Dn === null : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0 ? a === Dn : !1;
  }
  function L_() {
    var a = z.H;
    return z.H = kl, a === null ? kl : a;
  }
  function U_() {
    var a = z.A;
    return z.A = KR, a;
  }
  function ms() {
    st = 4, fa || (Ne & 4194048) !== Ne && hn.current !== null || (ro = !0), (da & 134217727) === 0 && (ri & 134217727) === 0 || Je === null || va(
      Je,
      Ne,
      yn,
      !1
    );
  }
  function Cp(a, i, l) {
    var s = Ue;
    Ue |= 2;
    var p = L_(), m = U_();
    (Je !== a || Ne !== i) && (vs = null, oo(a, i)), i = !1;
    var O = st;
    e: do
      try {
        if (Ke !== 0 && De !== null) {
          var D = De, B = vn;
          switch (Ke) {
            case 8:
              Mp(), O = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              hn.current === null && (i = !0);
              var Z = Ke;
              if (Ke = 0, vn = null, lo(a, D, B, Z), l && ro) {
                O = 0;
                break e;
              }
              break;
            default:
              Z = Ke, Ke = 0, vn = null, lo(a, D, B, Z);
          }
        }
        FR(), O = st;
        break;
      } catch (ae) {
        k_(a, ae);
      }
    while (!0);
    return i && a.shellSuspendCounter++, Sr = Va = null, Ue = s, z.H = p, z.A = m, De === null && (Je = null, Ne = 0, qc()), O;
  }
  function FR() {
    for (; De !== null; ) I_(De);
  }
  function WR(a, i) {
    var l = Ue;
    Ue |= 2;
    var s = L_(), p = U_();
    Je !== a || Ne !== i ? (vs = null, ps = Lt() + 500, oo(a, i)) : ro = hl(
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
              Ke = 0, vn = null, lo(a, i, m, 1);
              break;
            case 2:
            case 9:
              if (Qx(m)) {
                Ke = 0, vn = null, H_(i);
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
              Qx(m) ? (Ke = 0, vn = null, H_(i)) : (Ke = 0, vn = null, lo(a, i, m, 7));
              break;
            case 5:
              var O = null;
              switch (De.tag) {
                case 26:
                  O = De.memoizedState;
                case 5:
                case 27:
                  var D = De;
                  if (O ? jO(O) : D.stateNode.complete) {
                    Ke = 0, vn = null;
                    var B = D.sibling;
                    if (B !== null) De = B;
                    else {
                      var Z = D.return;
                      Z !== null ? (De = Z, gs(Z)) : De = null;
                    }
                    break t;
                  }
              }
              Ke = 0, vn = null, lo(a, i, m, 5);
              break;
            case 6:
              Ke = 0, vn = null, lo(a, i, m, 6);
              break;
            case 8:
              Mp(), st = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        ZR();
        break;
      } catch (ae) {
        k_(a, ae);
      }
    while (!0);
    return Sr = Va = null, z.H = s, z.A = p, Ue = l, De !== null ? 0 : (Je = null, Ne = 0, qc(), st);
  }
  function ZR() {
    for (; De !== null && !Xt(); )
      I_(De);
  }
  function I_(a) {
    var i = d_(a.alternate, a, Dr);
    a.memoizedProps = a.pendingProps, i === null ? gs(a) : De = i;
  }
  function H_(a) {
    var i = a, l = i.alternate;
    switch (i.tag) {
      case 15:
      case 0:
        i = o_(
          l,
          i,
          i.pendingProps,
          i.type,
          void 0,
          Ne
        );
        break;
      case 11:
        i = o_(
          l,
          i,
          i.pendingProps,
          i.type.render,
          i.ref,
          Ne
        );
        break;
      case 5:
        Yh(i);
      default:
        p_(l, i), i = De = Ux(i, Dr), i = d_(l, i, Dr);
    }
    a.memoizedProps = a.pendingProps, i === null ? gs(a) : De = i;
  }
  function lo(a, i, l, s) {
    Sr = Va = null, Yh(i), Wi = null, Cl = 0;
    var p = i.return;
    try {
      if (BR(
        a,
        p,
        i,
        l,
        Ne
      )) {
        st = 1, is(
          a,
          En(l, a.current)
        ), De = null;
        return;
      }
    } catch (m) {
      if (p !== null) throw De = p, m;
      st = 1, is(
        a,
        En(l, a.current)
      ), De = null;
      return;
    }
    i.flags & 32768 ? (ze || s === 1 ? a = !0 : ro || (Ne & 536870912) !== 0 ? a = !1 : (fa = a = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = hn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), G_(i, a)) : gs(i);
  }
  function gs(a) {
    var i = a;
    do {
      if ((i.flags & 32768) !== 0) {
        G_(
          i,
          fa
        );
        return;
      }
      a = i.return;
      var l = IR(
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
  function G_(a, i) {
    do {
      var l = HR(a.alternate, a);
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
  function Y_(a, i, l, s, p, m, O, D, B) {
    a.cancelPendingCommit = null;
    do
      bs();
    while (St !== 0);
    if ((Ue & 6) !== 0) throw Error(r(327));
    if (i !== null) {
      if (i === a.current) throw Error(r(177));
      if (m = i.lanes | i.childLanes, m |= gh, CN(
        a,
        l,
        m,
        O,
        D,
        B
      ), a === Je && (De = Je = null, Ne = 0), io = i, pa = a, Pr = l, Tp = m, Ep = p, R_ = s, (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? (a.callbackNode = null, a.callbackPriority = 0, t3(Sc, function() {
        return W_(), null;
      })) : (a.callbackNode = null, a.callbackPriority = 0), s = (i.flags & 13878) !== 0, (i.subtreeFlags & 13878) !== 0 || s) {
        s = z.T, z.T = null, p = K.p, K.p = 2, O = Ue, Ue |= 4;
        try {
          GR(a, i, l);
        } finally {
          Ue = O, K.p = p, z.T = s;
        }
      }
      St = 1, K_(), X_(), V_();
    }
  }
  function K_() {
    if (St === 1) {
      St = 0;
      var a = pa, i = io, l = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || l) {
        l = z.T, z.T = null;
        var s = K.p;
        K.p = 2;
        var p = Ue;
        Ue |= 4;
        try {
          T_(i, a);
          var m = Ip, O = Px(a.containerInfo), D = m.focusedElem, B = m.selectionRange;
          if (O !== D && D && D.ownerDocument && Dx(
            D.ownerDocument.documentElement,
            D
          )) {
            if (B !== null && hh(D)) {
              var Z = B.start, ae = B.end;
              if (ae === void 0 && (ae = Z), "selectionStart" in D)
                D.selectionStart = Z, D.selectionEnd = Math.min(
                  ae,
                  D.value.length
                );
              else {
                var le = D.ownerDocument || document, Q = le && le.defaultView || window;
                if (Q.getSelection) {
                  var te = Q.getSelection(), ye = D.textContent.length, Se = Math.min(B.start, ye), We = B.end === void 0 ? Se : Math.min(B.end, ye);
                  !te.extend && Se > We && (O = We, We = Se, Se = O);
                  var X = Cx(
                    D,
                    Se
                  ), H = Cx(
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
          Ds = !!Up, Ip = Up = null;
        } finally {
          Ue = p, K.p = s, z.T = l;
        }
      }
      a.current = i, St = 2;
    }
  }
  function X_() {
    if (St === 2) {
      St = 0;
      var a = pa, i = io, l = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || l) {
        l = z.T, z.T = null;
        var s = K.p;
        K.p = 2;
        var p = Ue;
        Ue |= 4;
        try {
          S_(a, i.alternate, i);
        } finally {
          Ue = p, K.p = s, z.T = l;
        }
      }
      St = 3;
    }
  }
  function V_() {
    if (St === 4 || St === 3) {
      St = 0, Zr();
      var a = pa, i = io, l = Pr, s = R_;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? St = 5 : (St = 0, io = pa = null, F_(a, a.pendingLanes));
      var p = a.pendingLanes;
      if (p === 0 && (ha = null), Vd(l), i = i.stateNode, cn && typeof cn.onCommitFiberRoot == "function")
        try {
          cn.onCommitFiberRoot(
            dl,
            i,
            void 0,
            (i.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        i = z.T, p = K.p, K.p = 2, z.T = null;
        try {
          for (var m = a.onRecoverableError, O = 0; O < s.length; O++) {
            var D = s[O];
            m(D.value, {
              componentStack: D.stack
            });
          }
        } finally {
          z.T = i, K.p = p;
        }
      }
      (Pr & 3) !== 0 && bs(), nr(a), p = a.pendingLanes, (l & 261930) !== 0 && (p & 42) !== 0 ? a === jp ? Xl++ : (Xl = 0, jp = a) : Xl = 0, Vl(0);
    }
  }
  function F_(a, i) {
    (a.pooledCacheLanes &= i) === 0 && (i = a.pooledCache, i != null && (a.pooledCache = null, jl(i)));
  }
  function bs() {
    return K_(), X_(), V_(), W_();
  }
  function W_() {
    if (St !== 5) return !1;
    var a = pa, i = Tp;
    Tp = 0;
    var l = Vd(Pr), s = z.T, p = K.p;
    try {
      K.p = 32 > l ? 32 : l, z.T = null, l = Ep, Ep = null;
      var m = pa, O = Pr;
      if (St = 0, io = pa = null, Pr = 0, (Ue & 6) !== 0) throw Error(r(331));
      var D = Ue;
      if (Ue |= 4, D_(m.current), j_(
        m,
        m.current,
        O,
        l
      ), Ue = D, Vl(0, !1), cn && typeof cn.onPostCommitFiberRoot == "function")
        try {
          cn.onPostCommitFiberRoot(dl, m);
        } catch {
        }
      return !0;
    } finally {
      K.p = p, z.T = s, F_(a, i);
    }
  }
  function Z_(a, i, l) {
    i = En(l, i), i = op(a.stateNode, i, 2), a = la(a, i, 2), a !== null && (pl(a, 2), nr(a));
  }
  function Xe(a, i, l) {
    if (a.tag === 3)
      Z_(a, a, l);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          Z_(
            i,
            a,
            l
          );
          break;
        } else if (i.tag === 1) {
          var s = i.stateNode;
          if (typeof i.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (ha === null || !ha.has(s))) {
            a = En(l, a), l = QS(2), s = la(i, l, 2), s !== null && (JS(
              l,
              s,
              i,
              a
            ), pl(s, 2), nr(s));
            break;
          }
        }
        i = i.return;
      }
  }
  function Dp(a, i, l) {
    var s = a.pingCache;
    if (s === null) {
      s = a.pingCache = new XR();
      var p = /* @__PURE__ */ new Set();
      s.set(i, p);
    } else
      p = s.get(i), p === void 0 && (p = /* @__PURE__ */ new Set(), s.set(i, p));
    p.has(l) || (Op = !0, p.add(l), a = QR.bind(null, a, i, l), i.then(a, a));
  }
  function QR(a, i, l) {
    var s = a.pingCache;
    s !== null && s.delete(i), a.pingedLanes |= a.suspendedLanes & l, a.warmLanes &= ~l, Je === a && (Ne & l) === l && (st === 4 || st === 3 && (Ne & 62914560) === Ne && 300 > Lt() - hs ? (Ue & 2) === 0 && oo(a, 0) : wp |= l, ao === Ne && (ao = 0)), nr(a);
  }
  function Q_(a, i) {
    i === 0 && (i = K1()), a = Ya(a, i), a !== null && (pl(a, i), nr(a));
  }
  function JR(a) {
    var i = a.memoizedState, l = 0;
    i !== null && (l = i.retryLane), Q_(a, l);
  }
  function e3(a, i) {
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
    s !== null && s.delete(i), Q_(a, l);
  }
  function t3(a, i) {
    return On(a, i);
  }
  var xs = null, uo = null, Pp = !1, Ss = !1, Np = !1, ya = 0;
  function nr(a) {
    a !== uo && a.next === null && (uo === null ? xs = uo = a : uo = uo.next = a), Ss = !0, Pp || (Pp = !0, r3());
  }
  function Vl(a, i) {
    if (!Np && Ss) {
      Np = !0;
      do
        for (var l = !1, s = xs; s !== null; ) {
          if (a !== 0) {
            var p = s.pendingLanes;
            if (p === 0) var m = 0;
            else {
              var O = s.suspendedLanes, D = s.pingedLanes;
              m = (1 << 31 - sn(42 | a) + 1) - 1, m &= p & ~(O & ~D), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (l = !0, nO(s, m));
          } else
            m = Ne, m = Ac(
              s,
              s === Je ? m : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (m & 3) === 0 || hl(s, m) || (l = !0, nO(s, m));
          s = s.next;
        }
      while (l);
      Np = !1;
    }
  }
  function n3() {
    J_();
  }
  function J_() {
    Ss = Pp = !1;
    var a = 0;
    ya !== 0 && h3() && (a = ya);
    for (var i = Lt(), l = null, s = xs; s !== null; ) {
      var p = s.next, m = eO(s, i);
      m === 0 ? (s.next = null, l === null ? xs = p : l.next = p, p === null && (uo = l)) : (l = s, (a !== 0 || (m & 3) !== 0) && (Ss = !0)), s = p;
    }
    St !== 0 && St !== 5 || Vl(a), ya !== 0 && (ya = 0);
  }
  function eO(a, i) {
    for (var l = a.suspendedLanes, s = a.pingedLanes, p = a.expirationTimes, m = a.pendingLanes & -62914561; 0 < m; ) {
      var O = 31 - sn(m), D = 1 << O, B = p[O];
      B === -1 ? ((D & l) === 0 || (D & s) !== 0) && (p[O] = MN(D, i)) : B <= i && (a.expiredLanes |= D), m &= ~D;
    }
    if (i = Je, l = Ne, l = Ac(
      a,
      a === i ? l : 0,
      a.cancelPendingCommit !== null || a.timeoutHandle !== -1
    ), s = a.callbackNode, l === 0 || a === i && (Ke === 2 || Ke === 9) || a.cancelPendingCommit !== null)
      return s !== null && s !== null && Kt(s), a.callbackNode = null, a.callbackPriority = 0;
    if ((l & 3) === 0 || hl(a, l)) {
      if (i = l & -l, i === a.callbackPriority) return i;
      switch (s !== null && Kt(s), Vd(l)) {
        case 2:
        case 8:
          l = G1;
          break;
        case 32:
          l = Sc;
          break;
        case 268435456:
          l = Y1;
          break;
        default:
          l = Sc;
      }
      return s = tO.bind(null, a), l = On(l, s), a.callbackPriority = i, a.callbackNode = l, i;
    }
    return s !== null && s !== null && Kt(s), a.callbackPriority = 2, a.callbackNode = null, 2;
  }
  function tO(a, i) {
    if (St !== 0 && St !== 5)
      return a.callbackNode = null, a.callbackPriority = 0, null;
    var l = a.callbackNode;
    if (bs() && a.callbackNode !== l)
      return null;
    var s = Ne;
    return s = Ac(
      a,
      a === Je ? s : 0,
      a.cancelPendingCommit !== null || a.timeoutHandle !== -1
    ), s === 0 ? null : (z_(a, s, i), eO(a, Lt()), a.callbackNode != null && a.callbackNode === l ? tO.bind(null, a) : null);
  }
  function nO(a, i) {
    if (bs()) return null;
    z_(a, i, !0);
  }
  function r3() {
    v3(function() {
      (Ue & 6) !== 0 ? On(
        H1,
        n3
      ) : J_();
    });
  }
  function Rp() {
    if (ya === 0) {
      var a = Xi;
      a === 0 && (a = _c, _c <<= 1, (_c & 261888) === 0 && (_c = 256)), ya = a;
    }
    return ya;
  }
  function rO(a) {
    return a == null || typeof a == "symbol" || typeof a == "boolean" ? null : typeof a == "function" ? a : Mc("" + a);
  }
  function aO(a, i) {
    var l = i.ownerDocument.createElement("input");
    return l.name = i.name, l.value = i.value, a.id && l.setAttribute("form", a.id), i.parentNode.insertBefore(l, i), a = new FormData(a), l.parentNode.removeChild(l), a;
  }
  function a3(a, i, l, s, p) {
    if (i === "submit" && l && l.stateNode === p) {
      var m = rO(
        (p[Zt] || null).action
      ), O = s.submitter;
      O && (i = (i = O[Zt] || null) ? rO(i.formAction) : O.getAttribute("formAction"), i !== null && (m = i, O = null));
      var D = new Nc(
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
                  var B = O ? aO(p, O) : new FormData(p);
                  ep(
                    l,
                    {
                      pending: !0,
                      data: B,
                      method: p.method,
                      action: m
                    },
                    null,
                    B
                  );
                }
              } else
                typeof m == "function" && (D.preventDefault(), B = O ? aO(p, O) : new FormData(p), ep(
                  l,
                  {
                    pending: !0,
                    data: B,
                    method: p.method,
                    action: m
                  },
                  m,
                  B
                ));
            },
            currentTarget: p
          }
        ]
      });
    }
  }
  for (var $p = 0; $p < mh.length; $p++) {
    var zp = mh[$p], i3 = zp.toLowerCase(), o3 = zp[0].toUpperCase() + zp.slice(1);
    In(
      i3,
      "on" + o3
    );
  }
  In($x, "onAnimationEnd"), In(zx, "onAnimationIteration"), In(qx, "onAnimationStart"), In("dblclick", "onDoubleClick"), In("focusin", "onFocus"), In("focusout", "onBlur"), In(_R, "onTransitionRun"), In(OR, "onTransitionStart"), In(wR, "onTransitionCancel"), In(kx, "onTransitionEnd"), Ni("onMouseEnter", ["mouseout", "mouseover"]), Ni("onMouseLeave", ["mouseout", "mouseover"]), Ni("onPointerEnter", ["pointerout", "pointerover"]), Ni("onPointerLeave", ["pointerout", "pointerover"]), Ua(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ua(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ua("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ua(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ua(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ua(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Fl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), l3 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fl)
  );
  function iO(a, i) {
    i = (i & 4) !== 0;
    for (var l = 0; l < a.length; l++) {
      var s = a[l], p = s.event;
      s = s.listeners;
      e: {
        var m = void 0;
        if (i)
          for (var O = s.length - 1; 0 <= O; O--) {
            var D = s[O], B = D.instance, Z = D.currentTarget;
            if (D = D.listener, B !== m && p.isPropagationStopped())
              break e;
            m = D, p.currentTarget = Z;
            try {
              m(p);
            } catch (ae) {
              zc(ae);
            }
            p.currentTarget = null, m = B;
          }
        else
          for (O = 0; O < s.length; O++) {
            if (D = s[O], B = D.instance, Z = D.currentTarget, D = D.listener, B !== m && p.isPropagationStopped())
              break e;
            m = D, p.currentTarget = Z;
            try {
              m(p);
            } catch (ae) {
              zc(ae);
            }
            p.currentTarget = null, m = B;
          }
      }
    }
  }
  function Pe(a, i) {
    var l = i[Fd];
    l === void 0 && (l = i[Fd] = /* @__PURE__ */ new Set());
    var s = a + "__bubble";
    l.has(s) || (oO(i, a, 2, !1), l.add(s));
  }
  function qp(a, i, l) {
    var s = 0;
    i && (s |= 4), oO(
      l,
      a,
      s,
      i
    );
  }
  var _s = "_reactListening" + Math.random().toString(36).slice(2);
  function kp(a) {
    if (!a[_s]) {
      a[_s] = !0, J1.forEach(function(l) {
        l !== "selectionchange" && (l3.has(l) || qp(l, !1, a), qp(l, !0, a));
      });
      var i = a.nodeType === 9 ? a : a.ownerDocument;
      i === null || i[_s] || (i[_s] = !0, qp("selectionchange", !1, i));
    }
  }
  function oO(a, i, l, s) {
    switch ($O(i)) {
      case 2:
        var p = $3;
        break;
      case 8:
        p = z3;
        break;
      default:
        p = Jp;
    }
    l = p.bind(
      null,
      i,
      l,
      a
    ), p = void 0, !ah || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (p = !0), s ? p !== void 0 ? a.addEventListener(i, l, {
      capture: !0,
      passive: p
    }) : a.addEventListener(i, l, !0) : p !== void 0 ? a.addEventListener(i, l, {
      passive: p
    }) : a.addEventListener(i, l, !1);
  }
  function Bp(a, i, l, s, p) {
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
              var B = O.tag;
              if ((B === 3 || B === 4) && O.stateNode.containerInfo === p)
                return;
              O = O.return;
            }
          for (; D !== null; ) {
            if (O = Ci(D), O === null) return;
            if (B = O.tag, B === 5 || B === 6 || B === 26 || B === 27) {
              s = m = O;
              continue e;
            }
            D = D.parentNode;
          }
        }
        s = s.return;
      }
    fx(function() {
      var Z = m, ae = nh(l), le = [];
      e: {
        var Q = Bx.get(a);
        if (Q !== void 0) {
          var te = Nc, ye = a;
          switch (a) {
            case "keypress":
              if (Dc(l) === 0) break e;
            case "keydown":
            case "keyup":
              te = eR;
              break;
            case "focusin":
              ye = "focus", te = uh;
              break;
            case "focusout":
              ye = "blur", te = uh;
              break;
            case "beforeblur":
            case "afterblur":
              te = uh;
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
              te = px;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              te = IN;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              te = rR;
              break;
            case $x:
            case zx:
            case qx:
              te = YN;
              break;
            case kx:
              te = iR;
              break;
            case "scroll":
            case "scrollend":
              te = LN;
              break;
            case "wheel":
              te = lR;
              break;
            case "copy":
            case "cut":
            case "paste":
              te = XN;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              te = yx;
              break;
            case "toggle":
            case "beforetoggle":
              te = cR;
          }
          var Se = (i & 4) !== 0, We = !Se && (a === "scroll" || a === "scrollend"), X = Se ? Q !== null ? Q + "Capture" : null : Q;
          Se = [];
          for (var H = Z, W; H !== null; ) {
            var oe = H;
            if (W = oe.stateNode, oe = oe.tag, oe !== 5 && oe !== 26 && oe !== 27 || W === null || X === null || (oe = ml(H, X), oe != null && Se.push(
              Wl(H, oe, W)
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
          if (Q = a === "mouseover" || a === "pointerover", te = a === "mouseout" || a === "pointerout", Q && l !== th && (ye = l.relatedTarget || l.fromElement) && (Ci(ye) || ye[Mi]))
            break e;
          if ((te || Q) && (Q = ae.window === ae ? ae : (Q = ae.ownerDocument) ? Q.defaultView || Q.parentWindow : window, te ? (ye = l.relatedTarget || l.toElement, te = Z, ye = ye ? Ci(ye) : null, ye !== null && (We = u(ye), Se = ye.tag, ye !== We || Se !== 5 && Se !== 27 && Se !== 6) && (ye = null)) : (te = null, ye = Z), te !== ye)) {
            if (Se = px, oe = "onMouseLeave", X = "onMouseEnter", H = "mouse", (a === "pointerout" || a === "pointerover") && (Se = yx, oe = "onPointerLeave", X = "onPointerEnter", H = "pointer"), We = te == null ? Q : yl(te), W = ye == null ? Q : yl(ye), Q = new Se(
              oe,
              H + "leave",
              te,
              l,
              ae
            ), Q.target = We, Q.relatedTarget = W, oe = null, Ci(ae) === Z && (Se = new Se(
              X,
              H + "enter",
              ye,
              l,
              ae
            ), Se.target = W, Se.relatedTarget = We, oe = Se), We = oe, te && ye)
              t: {
                for (Se = u3, X = te, H = ye, W = 0, oe = X; oe; oe = Se(oe))
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
            te !== null && lO(
              le,
              Q,
              te,
              Se,
              !1
            ), ye !== null && We !== null && lO(
              le,
              We,
              ye,
              Se,
              !0
            );
          }
        }
        e: {
          if (Q = Z ? yl(Z) : window, te = Q.nodeName && Q.nodeName.toLowerCase(), te === "select" || te === "input" && Q.type === "file")
            var ke = wx;
          else if (_x(Q))
            if (Ax)
              ke = bR;
            else {
              ke = mR;
              var me = yR;
            }
          else
            te = Q.nodeName, !te || te.toLowerCase() !== "input" || Q.type !== "checkbox" && Q.type !== "radio" ? Z && eh(Z.elementType) && (ke = wx) : ke = gR;
          if (ke && (ke = ke(a, Z))) {
            Ox(
              le,
              ke,
              l,
              ae
            );
            break e;
          }
          me && me(a, Q, Z), a === "focusout" && Z && Q.type === "number" && Z.memoizedProps.value != null && Jd(Q, "number", Q.value);
        }
        switch (me = Z ? yl(Z) : window, a) {
          case "focusin":
            (_x(me) || me.contentEditable === "true") && (Bi = me, ph = Z, Al = null);
            break;
          case "focusout":
            Al = ph = Bi = null;
            break;
          case "mousedown":
            vh = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vh = !1, Nx(le, l, ae);
            break;
          case "selectionchange":
            if (SR) break;
          case "keydown":
          case "keyup":
            Nx(le, l, ae);
        }
        var Me;
        if (sh)
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
          ki ? xx(a, l) && (Re = "onCompositionEnd") : a === "keydown" && l.keyCode === 229 && (Re = "onCompositionStart");
        Re && (mx && l.locale !== "ko" && (ki || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && ki && (Me = dx()) : (ea = ae, ih = "value" in ea ? ea.value : ea.textContent, ki = !0)), me = Os(Z, Re), 0 < me.length && (Re = new vx(
          Re,
          a,
          null,
          l,
          ae
        ), le.push({ event: Re, listeners: me }), Me ? Re.data = Me : (Me = Sx(l), Me !== null && (Re.data = Me)))), (Me = fR ? dR(a, l) : hR(a, l)) && (Re = Os(Z, "onBeforeInput"), 0 < Re.length && (me = new vx(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ae
        ), le.push({
          event: me,
          listeners: Re
        }), me.data = Me)), a3(
          le,
          a,
          Z,
          l,
          ae
        );
      }
      iO(le, i);
    });
  }
  function Wl(a, i, l) {
    return {
      instance: a,
      listener: i,
      currentTarget: l
    };
  }
  function Os(a, i) {
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
  function u3(a) {
    if (a === null) return null;
    do
      a = a.return;
    while (a && a.tag !== 5 && a.tag !== 27);
    return a || null;
  }
  function lO(a, i, l, s, p) {
    for (var m = i._reactName, O = []; l !== null && l !== s; ) {
      var D = l, B = D.alternate, Z = D.stateNode;
      if (D = D.tag, B !== null && B === s) break;
      D !== 5 && D !== 26 && D !== 27 || Z === null || (B = Z, p ? (Z = ml(l, m), Z != null && O.unshift(
        Wl(l, Z, B)
      )) : p || (Z = ml(l, m), Z != null && O.push(
        Wl(l, Z, B)
      ))), l = l.return;
    }
    O.length !== 0 && a.push({ event: i, listeners: O });
  }
  var c3 = /\r\n?/g, s3 = /\u0000|\uFFFD/g;
  function uO(a) {
    return (typeof a == "string" ? a : "" + a).replace(c3, `
`).replace(s3, "");
  }
  function cO(a, i) {
    return i = uO(i), uO(a) === i;
  }
  function Fe(a, i, l, s, p, m) {
    switch (l) {
      case "children":
        typeof s == "string" ? i === "body" || i === "textarea" && s === "" || $i(a, s) : (typeof s == "number" || typeof s == "bigint") && i !== "body" && $i(a, "" + s);
        break;
      case "className":
        Ec(a, "class", s);
        break;
      case "tabIndex":
        Ec(a, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ec(a, l, s);
        break;
      case "style":
        cx(a, s, m);
        break;
      case "data":
        if (i !== "object") {
          Ec(a, "data", s);
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
        s = Mc("" + s), a.setAttribute(l, s);
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
        s = Mc("" + s), a.setAttribute(l, s);
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
        l = Mc("" + s), a.setAttributeNS(
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
        Pe("beforetoggle", a), Pe("toggle", a), Tc(a, "popover", s);
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
        Tc(a, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = kN.get(l) || l, Tc(a, l, s));
    }
  }
  function Lp(a, i, l, s, p, m) {
    switch (l) {
      case "style":
        cx(a, s, m);
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
        if (!ex.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (p = l.endsWith("Capture"), i = l.slice(2, p ? l.length - 7 : void 0), m = a[Zt] || null, m = m != null ? m[l] : null, typeof m == "function" && a.removeEventListener(i, m, p), typeof s == "function")) {
              typeof m != "function" && m !== null && (l in a ? a[l] = null : a.hasAttribute(l) && a.removeAttribute(l)), a.addEventListener(i, s, p);
              break e;
            }
            l in a ? a[l] = s : s === !0 ? a.setAttribute(l, "") : Tc(a, l, s);
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
        var D = m = O = p = null, B = null, Z = null;
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
                  B = ae;
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
        ix(
          a,
          m,
          D,
          B,
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
        i = m, l = O, a.multiple = !!s, i != null ? Ri(a, !!s, i, !1) : l != null && Ri(a, !!s, l, !0);
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
        lx(a, s, p, m);
        return;
      case "option":
        for (B in l)
          if (l.hasOwnProperty(B) && (s = l[B], s != null))
            switch (B) {
              case "selected":
                a.selected = s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Fe(a, i, B, s, l, null);
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
        for (s = 0; s < Fl.length; s++)
          Pe(Fl[s], a);
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
        if (eh(i)) {
          for (ae in l)
            l.hasOwnProperty(ae) && (s = l[ae], s !== void 0 && Lp(
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
  function f3(a, i, l, s) {
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
        var p = null, m = null, O = null, D = null, B = null, Z = null, ae = null;
        for (te in l) {
          var le = l[te];
          if (l.hasOwnProperty(te) && le != null)
            switch (te) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                B = le;
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
        Qd(
          a,
          O,
          D,
          B,
          Z,
          ae,
          m,
          p
        );
        return;
      case "select":
        te = O = D = Q = null;
        for (m in l)
          if (B = l[m], l.hasOwnProperty(m) && B != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                te = B;
              default:
                s.hasOwnProperty(m) || Fe(
                  a,
                  i,
                  m,
                  null,
                  s,
                  B
                );
            }
        for (p in s)
          if (m = s[p], B = l[p], s.hasOwnProperty(p) && (m != null || B != null))
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
                m !== B && Fe(
                  a,
                  i,
                  p,
                  m,
                  s,
                  B
                );
            }
        i = D, l = O, s = te, Q != null ? Ri(a, !!l, Q, !1) : !!s != !!l && (i != null ? Ri(a, !!l, i, !0) : Ri(a, !!l, l ? [] : "", !1));
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
        ox(a, Q, te);
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
        for (B in s)
          if (Q = s[B], te = l[B], s.hasOwnProperty(B) && Q !== te && (Q != null || te != null))
            switch (B) {
              case "selected":
                a.selected = Q && typeof Q != "function" && typeof Q != "symbol";
                break;
              default:
                Fe(
                  a,
                  i,
                  B,
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
        if (eh(i)) {
          for (var We in l)
            Q = l[We], l.hasOwnProperty(We) && Q !== void 0 && !s.hasOwnProperty(We) && Lp(
              a,
              i,
              We,
              void 0,
              s,
              Q
            );
          for (ae in s)
            Q = s[ae], te = l[ae], !s.hasOwnProperty(ae) || Q === te || Q === void 0 && te === void 0 || Lp(
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
  function sO(a) {
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
  function d3() {
    if (typeof performance.getEntriesByType == "function") {
      for (var a = 0, i = 0, l = performance.getEntriesByType("resource"), s = 0; s < l.length; s++) {
        var p = l[s], m = p.transferSize, O = p.initiatorType, D = p.duration;
        if (m && D && sO(O)) {
          for (O = 0, D = p.responseEnd, s += 1; s < l.length; s++) {
            var B = l[s], Z = B.startTime;
            if (Z > D) break;
            var ae = B.transferSize, le = B.initiatorType;
            ae && sO(le) && (B = B.responseEnd, O += ae * (B < D ? 1 : (D - Z) / (B - Z)));
          }
          if (--s, i += 8 * (m + O) / (p.duration / 1e3), a++, 10 < a) break;
        }
      }
      if (0 < a) return i / a / 1e6;
    }
    return navigator.connection && (a = navigator.connection.downlink, typeof a == "number") ? a : 5;
  }
  var Up = null, Ip = null;
  function ws(a) {
    return a.nodeType === 9 ? a : a.ownerDocument;
  }
  function fO(a) {
    switch (a) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function dO(a, i) {
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
  function Hp(a, i) {
    return a === "textarea" || a === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.children == "bigint" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Gp = null;
  function h3() {
    var a = window.event;
    return a && a.type === "popstate" ? a === Gp ? !1 : (Gp = a, !0) : (Gp = null, !1);
  }
  var hO = typeof setTimeout == "function" ? setTimeout : void 0, p3 = typeof clearTimeout == "function" ? clearTimeout : void 0, pO = typeof Promise == "function" ? Promise : void 0, v3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof pO < "u" ? function(a) {
    return pO.resolve(null).then(a).catch(y3);
  } : hO;
  function y3(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function ma(a) {
    return a === "head";
  }
  function vO(a, i) {
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
  function yO(a, i) {
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
  function Yp(a) {
    var i = a.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var l = i;
      switch (i = i.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yp(l), Wd(l);
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
  function m3(a, i, l, s) {
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
  function g3(a, i, l) {
    if (i === "") return null;
    for (; a.nodeType !== 3; )
      if ((a.nodeType !== 1 || a.nodeName !== "INPUT" || a.type !== "hidden") && !l || (a = Pn(a.nextSibling), a === null)) return null;
    return a;
  }
  function mO(a, i) {
    for (; a.nodeType !== 8; )
      if ((a.nodeType !== 1 || a.nodeName !== "INPUT" || a.type !== "hidden") && !i || (a = Pn(a.nextSibling), a === null)) return null;
    return a;
  }
  function Kp(a) {
    return a.data === "$?" || a.data === "$~";
  }
  function Xp(a) {
    return a.data === "$!" || a.data === "$?" && a.ownerDocument.readyState !== "loading";
  }
  function b3(a, i) {
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
  var Vp = null;
  function gO(a) {
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
  function bO(a) {
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
  function xO(a, i, l) {
    switch (i = ws(l), a) {
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
    Wd(a);
  }
  var Nn = /* @__PURE__ */ new Map(), SO = /* @__PURE__ */ new Set();
  function As(a) {
    return typeof a.getRootNode == "function" ? a.getRootNode() : a.nodeType === 9 ? a : a.ownerDocument;
  }
  var Nr = K.d;
  K.d = {
    f: x3,
    r: S3,
    D: _3,
    C: O3,
    L: w3,
    m: A3,
    X: E3,
    S: T3,
    M: j3
  };
  function x3() {
    var a = Nr.f(), i = ys();
    return a || i;
  }
  function S3(a) {
    var i = Di(a);
    i !== null && i.tag === 5 && i.type === "form" ? kS(i) : Nr.r(a);
  }
  var co = typeof document > "u" ? null : document;
  function _O(a, i, l) {
    var s = co;
    if (s && typeof i == "string" && i) {
      var p = An(i);
      p = 'link[rel="' + a + '"][href="' + p + '"]', typeof l == "string" && (p += '[crossorigin="' + l + '"]'), SO.has(p) || (SO.add(p), a = { rel: a, crossOrigin: l, href: i }, s.querySelector(p) === null && (i = s.createElement("link"), zt(i, "link", a), jt(i), s.head.appendChild(i)));
    }
  }
  function _3(a) {
    Nr.D(a), _O("dns-prefetch", a, null);
  }
  function O3(a, i) {
    Nr.C(a, i), _O("preconnect", a, i);
  }
  function w3(a, i, l) {
    Nr.L(a, i, l);
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
      ), Nn.set(m, a), s.querySelector(p) !== null || i === "style" && s.querySelector(Ql(m)) || i === "script" && s.querySelector(Jl(m)) || (i = s.createElement("link"), zt(i, "link", a), jt(i), s.head.appendChild(i)));
    }
  }
  function A3(a, i) {
    Nr.m(a, i);
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
        s = l.createElement("link"), zt(s, "link", a), jt(s), l.head.appendChild(s);
      }
    }
  }
  function T3(a, i, l) {
    Nr.S(a, i, l);
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
          ), (l = Nn.get(m)) && Fp(a, l);
          var B = O = s.createElement("link");
          jt(B), zt(B, "link", a), B._p = new Promise(function(Z, ae) {
            B.onload = Z, B.onerror = ae;
          }), B.addEventListener("load", function() {
            D.loading |= 1;
          }), B.addEventListener("error", function() {
            D.loading |= 2;
          }), D.loading |= 4, Ts(O, i, s);
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
  function E3(a, i) {
    Nr.X(a, i);
    var l = co;
    if (l && a) {
      var s = Pi(l).hoistableScripts, p = fo(a), m = s.get(p);
      m || (m = l.querySelector(Jl(p)), m || (a = v({ src: a, async: !0 }, i), (i = Nn.get(p)) && Wp(a, i), m = l.createElement("script"), jt(m), zt(m, "link", a), l.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, s.set(p, m));
    }
  }
  function j3(a, i) {
    Nr.M(a, i);
    var l = co;
    if (l && a) {
      var s = Pi(l).hoistableScripts, p = fo(a), m = s.get(p);
      m || (m = l.querySelector(Jl(p)), m || (a = v({ src: a, async: !0, type: "module" }, i), (i = Nn.get(p)) && Wp(a, i), m = l.createElement("script"), jt(m), zt(m, "link", a), l.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, s.set(p, m));
    }
  }
  function OO(a, i, l, s) {
    var p = (p = fe.current) ? As(p) : null;
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
          }, Nn.set(a, l), m || M3(
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
  function wO(a) {
    return v({}, a, {
      "data-precedence": a.precedence,
      precedence: null
    });
  }
  function M3(a, i, l, s) {
    a.querySelector('link[rel="preload"][as="style"][' + i + "]") ? s.loading = 1 : (i = a.createElement("link"), s.preload = i, i.addEventListener("load", function() {
      return s.loading |= 1;
    }), i.addEventListener("error", function() {
      return s.loading |= 2;
    }), zt(i, "link", l), jt(i), a.head.appendChild(i));
  }
  function fo(a) {
    return '[src="' + An(a) + '"]';
  }
  function Jl(a) {
    return "script[async]" + a;
  }
  function AO(a, i, l) {
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
          ), jt(s), zt(s, "style", p), Ts(s, l.precedence, a), i.instance = s;
        case "stylesheet":
          p = so(l.href);
          var m = a.querySelector(
            Ql(p)
          );
          if (m)
            return i.state.loading |= 4, i.instance = m, jt(m), m;
          s = wO(l), (p = Nn.get(p)) && Fp(s, p), m = (a.ownerDocument || a).createElement("link"), jt(m);
          var O = m;
          return O._p = new Promise(function(D, B) {
            O.onload = D, O.onerror = B;
          }), zt(m, "link", s), i.state.loading |= 4, Ts(m, l.precedence, a), i.instance = m;
        case "script":
          return m = fo(l.src), (p = a.querySelector(
            Jl(m)
          )) ? (i.instance = p, jt(p), p) : (s = l, (p = Nn.get(m)) && (s = v({}, l), Wp(s, p)), a = a.ownerDocument || a, p = a.createElement("script"), jt(p), zt(p, "link", s), a.head.appendChild(p), i.instance = p);
        case "void":
          return null;
        default:
          throw Error(r(443, i.type));
      }
    else
      i.type === "stylesheet" && (i.state.loading & 4) === 0 && (s = i.instance, i.state.loading |= 4, Ts(s, l.precedence, a));
    return i.instance;
  }
  function Ts(a, i, l) {
    for (var s = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), p = s.length ? s[s.length - 1] : null, m = p, O = 0; O < s.length; O++) {
      var D = s[O];
      if (D.dataset.precedence === i) m = D;
      else if (m !== p) break;
    }
    m ? m.parentNode.insertBefore(a, m.nextSibling) : (i = l.nodeType === 9 ? l.head : l, i.insertBefore(a, i.firstChild));
  }
  function Fp(a, i) {
    a.crossOrigin == null && (a.crossOrigin = i.crossOrigin), a.referrerPolicy == null && (a.referrerPolicy = i.referrerPolicy), a.title == null && (a.title = i.title);
  }
  function Wp(a, i) {
    a.crossOrigin == null && (a.crossOrigin = i.crossOrigin), a.referrerPolicy == null && (a.referrerPolicy = i.referrerPolicy), a.integrity == null && (a.integrity = i.integrity);
  }
  var Es = null;
  function TO(a, i, l) {
    if (Es === null) {
      var s = /* @__PURE__ */ new Map(), p = Es = /* @__PURE__ */ new Map();
      p.set(l, s);
    } else
      p = Es, s = p.get(l), s || (s = /* @__PURE__ */ new Map(), p.set(l, s));
    if (s.has(a)) return s;
    for (s.set(a, null), l = l.getElementsByTagName(a), p = 0; p < l.length; p++) {
      var m = l[p];
      if (!(m[vl] || m[Pt] || a === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var O = m.getAttribute(i) || "";
        O = a + O;
        var D = s.get(O);
        D ? D.push(m) : s.set(O, [m]);
      }
    }
    return s;
  }
  function EO(a, i, l) {
    a = a.ownerDocument || a, a.head.insertBefore(
      l,
      i === "title" ? a.querySelector("head > title") : null
    );
  }
  function C3(a, i, l) {
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
  function jO(a) {
    return !(a.type === "stylesheet" && (a.state.loading & 3) === 0);
  }
  function D3(a, i, l, s) {
    if (l.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var p = so(s.href), m = i.querySelector(
          Ql(p)
        );
        if (m) {
          i = m._p, i !== null && typeof i == "object" && typeof i.then == "function" && (a.count++, a = js.bind(a), i.then(a, a)), l.state.loading |= 4, l.instance = m, jt(m);
          return;
        }
        m = i.ownerDocument || i, s = wO(s), (p = Nn.get(p)) && Fp(s, p), m = m.createElement("link"), jt(m);
        var O = m;
        O._p = new Promise(function(D, B) {
          O.onload = D, O.onerror = B;
        }), zt(m, "link", s), l.instance = m;
      }
      a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(l, i), (i = l.state.preload) && (l.state.loading & 3) === 0 && (a.count++, l = js.bind(a), i.addEventListener("load", l), i.addEventListener("error", l));
    }
  }
  var Zp = 0;
  function P3(a, i) {
    return a.stylesheets && a.count === 0 && Cs(a, a.stylesheets), 0 < a.count || 0 < a.imgCount ? function(l) {
      var s = setTimeout(function() {
        if (a.stylesheets && Cs(a, a.stylesheets), a.unsuspend) {
          var m = a.unsuspend;
          a.unsuspend = null, m();
        }
      }, 6e4 + i);
      0 < a.imgBytes && Zp === 0 && (Zp = 62500 * d3());
      var p = setTimeout(
        function() {
          if (a.waitingForImages = !1, a.count === 0 && (a.stylesheets && Cs(a, a.stylesheets), a.unsuspend)) {
            var m = a.unsuspend;
            a.unsuspend = null, m();
          }
        },
        (a.imgBytes > Zp ? 50 : 800) + i
      );
      return a.unsuspend = l, function() {
        a.unsuspend = null, clearTimeout(s), clearTimeout(p);
      };
    } : null;
  }
  function js() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Cs(this, this.stylesheets);
      else if (this.unsuspend) {
        var a = this.unsuspend;
        this.unsuspend = null, a();
      }
    }
  }
  var Ms = null;
  function Cs(a, i) {
    a.stylesheets = null, a.unsuspend !== null && (a.count++, Ms = /* @__PURE__ */ new Map(), i.forEach(N3, a), Ms = null, js.call(a));
  }
  function N3(a, i) {
    if (!(i.state.loading & 4)) {
      var l = Ms.get(a);
      if (l) var s = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ms.set(a, l);
        for (var p = a.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < p.length; m++) {
          var O = p[m];
          (O.nodeName === "LINK" || O.getAttribute("media") !== "not all") && (l.set(O.dataset.precedence, O), s = O);
        }
        s && l.set(null, s);
      }
      p = i.instance, O = p.getAttribute("data-precedence"), m = l.get(O) || s, m === s && l.set(null, p), l.set(O, p), this.count++, s = js.bind(this), p.addEventListener("load", s), p.addEventListener("error", s), m ? m.parentNode.insertBefore(p, m.nextSibling) : (a = a.nodeType === 9 ? a.head : a, a.insertBefore(p, a.firstChild)), i.state.loading |= 4;
    }
  }
  var eu = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0
  };
  function R3(a, i, l, s, p, m, O, D, B) {
    this.tag = 1, this.containerInfo = a, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Kd(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kd(0), this.hiddenUpdates = Kd(null), this.identifierPrefix = s, this.onUncaughtError = p, this.onCaughtError = m, this.onRecoverableError = O, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = B, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function MO(a, i, l, s, p, m, O, D, B, Z, ae, le) {
    return a = new R3(
      a,
      i,
      l,
      O,
      B,
      Z,
      ae,
      le,
      D
    ), i = 1, m === !0 && (i |= 24), m = dn(3, null, null, i), a.current = m, m.stateNode = a, i = Ch(), i.refCount++, a.pooledCache = i, i.refCount++, m.memoizedState = {
      element: s,
      isDehydrated: l,
      cache: i
    }, Rh(m), a;
  }
  function CO(a) {
    return a ? (a = Ii, a) : Ii;
  }
  function DO(a, i, l, s, p, m) {
    p = CO(p), s.context === null ? s.context = p : s.pendingContext = p, s = oa(i), s.payload = { element: l }, m = m === void 0 ? null : m, m !== null && (s.callback = m), l = la(a, s, i), l !== null && (rn(l, a, i), Pl(l, a, i));
  }
  function PO(a, i) {
    if (a = a.memoizedState, a !== null && a.dehydrated !== null) {
      var l = a.retryLane;
      a.retryLane = l !== 0 && l < i ? l : i;
    }
  }
  function Qp(a, i) {
    PO(a, i), (a = a.alternate) && PO(a, i);
  }
  function NO(a) {
    if (a.tag === 13 || a.tag === 31) {
      var i = Ya(a, 67108864);
      i !== null && rn(i, a, 67108864), Qp(a, 67108864);
    }
  }
  function RO(a) {
    if (a.tag === 13 || a.tag === 31) {
      var i = mn();
      i = Xd(i);
      var l = Ya(a, i);
      l !== null && rn(l, a, i), Qp(a, i);
    }
  }
  var Ds = !0;
  function $3(a, i, l, s) {
    var p = z.T;
    z.T = null;
    var m = K.p;
    try {
      K.p = 2, Jp(a, i, l, s);
    } finally {
      K.p = m, z.T = p;
    }
  }
  function z3(a, i, l, s) {
    var p = z.T;
    z.T = null;
    var m = K.p;
    try {
      K.p = 8, Jp(a, i, l, s);
    } finally {
      K.p = m, z.T = p;
    }
  }
  function Jp(a, i, l, s) {
    if (Ds) {
      var p = ev(s);
      if (p === null)
        Bp(
          a,
          i,
          s,
          Ps,
          l
        ), zO(a, s);
      else if (k3(
        p,
        a,
        i,
        l,
        s
      ))
        s.stopPropagation();
      else if (zO(a, s), i & 4 && -1 < q3.indexOf(a)) {
        for (; p !== null; ) {
          var m = Di(p);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var O = La(m.pendingLanes);
                  if (O !== 0) {
                    var D = m;
                    for (D.pendingLanes |= 2, D.entangledLanes |= 2; O; ) {
                      var B = 1 << 31 - sn(O);
                      D.entanglements[1] |= B, O &= ~B;
                    }
                    nr(m), (Ue & 6) === 0 && (ps = Lt() + 500, Vl(0));
                  }
                }
                break;
              case 31:
              case 13:
                D = Ya(m, 2), D !== null && rn(D, m, 2), ys(), Qp(m, 2);
            }
          if (m = ev(s), m === null && Bp(
            a,
            i,
            s,
            Ps,
            l
          ), m === p) break;
          p = m;
        }
        p !== null && s.stopPropagation();
      } else
        Bp(
          a,
          i,
          s,
          null,
          l
        );
    }
  }
  function ev(a) {
    return a = nh(a), tv(a);
  }
  var Ps = null;
  function tv(a) {
    if (Ps = null, a = Ci(a), a !== null) {
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
    return Ps = a, null;
  }
  function $O(a) {
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
        switch (xc()) {
          case H1:
            return 2;
          case G1:
            return 8;
          case Sc:
          case ON:
            return 32;
          case Y1:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var nv = !1, ga = null, ba = null, xa = null, tu = /* @__PURE__ */ new Map(), nu = /* @__PURE__ */ new Map(), Sa = [], q3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function zO(a, i) {
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
    }, i !== null && (i = Di(i), i !== null && NO(i)), a) : (a.eventSystemFlags |= s, i = a.targetContainers, p !== null && i.indexOf(p) === -1 && i.push(p), a);
  }
  function k3(a, i, l, s, p) {
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
  function qO(a) {
    var i = Ci(a.target);
    if (i !== null) {
      var l = u(i);
      if (l !== null) {
        if (i = l.tag, i === 13) {
          if (i = c(l), i !== null) {
            a.blockedOn = i, Z1(a.priority, function() {
              RO(l);
            });
            return;
          }
        } else if (i === 31) {
          if (i = f(l), i !== null) {
            a.blockedOn = i, Z1(a.priority, function() {
              RO(l);
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
  function Ns(a) {
    if (a.blockedOn !== null) return !1;
    for (var i = a.targetContainers; 0 < i.length; ) {
      var l = ev(a.nativeEvent);
      if (l === null) {
        l = a.nativeEvent;
        var s = new l.constructor(
          l.type,
          l
        );
        th = s, l.target.dispatchEvent(s), th = null;
      } else
        return i = Di(l), i !== null && NO(i), a.blockedOn = l, !1;
      i.shift();
    }
    return !0;
  }
  function kO(a, i, l) {
    Ns(a) && l.delete(i);
  }
  function B3() {
    nv = !1, ga !== null && Ns(ga) && (ga = null), ba !== null && Ns(ba) && (ba = null), xa !== null && Ns(xa) && (xa = null), tu.forEach(kO), nu.forEach(kO);
  }
  function Rs(a, i) {
    a.blockedOn === i && (a.blockedOn = null, nv || (nv = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      B3
    )));
  }
  var $s = null;
  function BO(a) {
    $s !== a && ($s = a, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        $s === a && ($s = null);
        for (var i = 0; i < a.length; i += 3) {
          var l = a[i], s = a[i + 1], p = a[i + 2];
          if (typeof s != "function") {
            if (tv(s || l) === null)
              continue;
            break;
          }
          var m = Di(l);
          m !== null && (a.splice(i, 3), i -= 3, ep(
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
    function i(B) {
      return Rs(B, a);
    }
    ga !== null && Rs(ga, a), ba !== null && Rs(ba, a), xa !== null && Rs(xa, a), tu.forEach(i), nu.forEach(i);
    for (var l = 0; l < Sa.length; l++) {
      var s = Sa[l];
      s.blockedOn === a && (s.blockedOn = null);
    }
    for (; 0 < Sa.length && (l = Sa[0], l.blockedOn === null); )
      qO(l), l.blockedOn === null && Sa.shift();
    if (l = (a.ownerDocument || a).$$reactFormReplay, l != null)
      for (s = 0; s < l.length; s += 3) {
        var p = l[s], m = l[s + 1], O = p[Zt] || null;
        if (typeof m == "function")
          O || BO(l);
        else if (O) {
          var D = null;
          if (m && m.hasAttribute("formAction")) {
            if (p = m, O = m[Zt] || null)
              D = O.formAction;
            else if (tv(p) !== null) continue;
          } else D = O.action;
          typeof D == "function" ? l[s + 1] = D : (l.splice(s, 3), s -= 3), BO(l);
        }
      }
  }
  function LO() {
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
  function rv(a) {
    this._internalRoot = a;
  }
  zs.prototype.render = rv.prototype.render = function(a) {
    var i = this._internalRoot;
    if (i === null) throw Error(r(409));
    var l = i.current, s = mn();
    DO(l, s, a, i, null, null);
  }, zs.prototype.unmount = rv.prototype.unmount = function() {
    var a = this._internalRoot;
    if (a !== null) {
      this._internalRoot = null;
      var i = a.containerInfo;
      DO(a.current, 2, null, a, null, null), ys(), i[Mi] = null;
    }
  };
  function zs(a) {
    this._internalRoot = a;
  }
  zs.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var i = W1();
      a = { blockedOn: null, target: a, priority: i };
      for (var l = 0; l < Sa.length && i !== 0 && i < Sa[l].priority; l++) ;
      Sa.splice(l, 0, a), l === 0 && qO(a);
    }
  };
  var UO = t.version;
  if (UO !== "19.2.8")
    throw Error(
      r(
        527,
        UO,
        "19.2.8"
      )
    );
  K.findDOMNode = function(a) {
    var i = a._reactInternals;
    if (i === void 0)
      throw typeof a.render == "function" ? Error(r(188)) : (a = Object.keys(a).join(","), Error(r(268, a)));
    return a = h(i), a = a !== null ? y(a) : null, a = a === null ? null : a.stateNode, a;
  };
  var L3 = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qs.isDisabled && qs.supportsFiber)
      try {
        dl = qs.inject(
          L3
        ), cn = qs;
      } catch {
      }
  }
  return vu.createRoot = function(a, i) {
    if (!o(a)) throw Error(r(299));
    var l = !1, s = "", p = VS, m = FS, O = WS;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (s = i.identifierPrefix), i.onUncaughtError !== void 0 && (p = i.onUncaughtError), i.onCaughtError !== void 0 && (m = i.onCaughtError), i.onRecoverableError !== void 0 && (O = i.onRecoverableError)), i = MO(
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
      LO
    ), a[Mi] = i.current, kp(a), new rv(i);
  }, vu.hydrateRoot = function(a, i, l) {
    if (!o(a)) throw Error(r(299));
    var s = !1, p = "", m = VS, O = FS, D = WS, B = null;
    return l != null && (l.unstable_strictMode === !0 && (s = !0), l.identifierPrefix !== void 0 && (p = l.identifierPrefix), l.onUncaughtError !== void 0 && (m = l.onUncaughtError), l.onCaughtError !== void 0 && (O = l.onCaughtError), l.onRecoverableError !== void 0 && (D = l.onRecoverableError), l.formState !== void 0 && (B = l.formState)), i = MO(
      a,
      1,
      !0,
      i,
      l ?? null,
      s,
      p,
      B,
      m,
      O,
      D,
      LO
    ), i.context = CO(null), l = i.current, s = mn(), s = Xd(s), p = oa(s), p.callback = null, la(l, p, s), l = s, i.current.lanes = l, pl(i, l), nr(i), a[Mi] = i.current, kp(a), new zs(i);
  }, vu.version = "19.2.8", vu;
}
var XM;
function lX() {
  if (XM) return ub.exports;
  XM = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), ub.exports = oX(), ub.exports;
}
var uX = lX();
const cX = `
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
`, sX = `
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
function fX(e) {
  return `
  :host {
    display: block;
    position: relative;
    ${e === "ha" ? sX : cX}
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
  .reporting-month-card, .reporting-month-controls {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .reporting-month-card { justify-content: space-between; }
  .reporting-month-card h2 { margin: 0; }
  .month-picker {
    color-scheme: dark; color: var(--nb-text); background: var(--nb-panel-2);
    border: 0; font: inherit; padding: 6px 8px; width: 172px; min-height: 36px;
    box-sizing: border-box;
  }
  .month-picker:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: -2px; }
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
function qa(e) {
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
      if (this._style || (this._style = document.createElement("style"), c.appendChild(this._style)), this._style.textContent = fX(this._config.theme ?? "netwrth"), this._mount || (this._mount = document.createElement("div"), c.appendChild(this._mount), this._overlay = document.createElement("div"), this._overlay.className = "overlay", this._overlay.setAttribute("popover", "manual"), c.appendChild(this._overlay), this._root = uX.createRoot(this._mount)), this._config.allowed_user_id && ((h = this._hass.user) == null ? void 0 : h.id) !== this._config.allowed_user_id) {
        this._root.render(/* @__PURE__ */ $.jsx("div", { className: "card", children: /* @__PURE__ */ $.jsx("div", { className: "status", children: "This dashboard is private." }) }));
        return;
      }
      const f = e.component, d = this._hass;
      this._root.render(
        /* @__PURE__ */ $.jsx(eC.Provider, { value: this._overlay ?? null, children: /* @__PURE__ */ $.jsx(f, { hass: d, config: this._config }, `${(y = d.user) == null ? void 0 : y.id}:${JSON.stringify(this._config)}`) })
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
      this._hass = c, this._entries || s$(c).then((f) => {
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
const ka = {
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
}, Ei = {
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
}, ji = { name: "entry", label: "Firefly connection", selector: {} }, bc = { name: "month_group", label: "Shared month group", selector: { text: {} } }, Ba = { name: "title", label: "Title", selector: { text: {} } }, I1 = {
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
}, Gd = {
  name: "range",
  label: "Default range",
  selector: {
    select: {
      mode: "dropdown",
      options: ["1d", "1w", "1m", "3m", "6m", "1y", "all"].map((e) => ({ value: e, label: e }))
    }
  }
}, SN = {
  name: "show_mode_selector",
  label: "Show mode selector",
  selector: { boolean: {} }
}, Yd = {
  name: "show_range_selector",
  label: "Show range selector",
  selector: { boolean: {} }
}, _N = {
  name: "compact",
  label: "Short axis amounts (₹1.2L instead of ₹1,20,000)",
  selector: { boolean: {} }
};
qa({
  tag: "family-finance-month-card",
  name: "Finance reporting month",
  description: "Select the month for spending, accounts, bills and credit cards.",
  component: rX,
  defaults: { month_group: "finance" },
  schema: [Ba, bc, ka],
  stub: { month_group: "finance" },
  size: 1
});
qa({
  tag: "family-finance-worth-card",
  name: "Finance worth chart",
  description: "Your total over time — the netwrth dashboard chart.",
  component: xN,
  schema: [
    Ba,
    ji,
    I1,
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
    Gd,
    SN,
    Yd,
    _N,
    ka,
    Ei
  ],
  stub: { view: "all", range: "6m" },
  size: 6
});
qa({
  tag: "family-finance-flow-card",
  name: "Finance balance movement",
  description: "Money kept vs burned per day/week/month (day-to-day accounts).",
  component: xN,
  defaults: { view: "daily", mode: "flow" },
  schema: [
    Ba,
    ji,
    Gd,
    SN,
    Yd,
    _N,
    ka,
    Ei
  ],
  stub: { range: "3m" },
  size: 6
});
qa({
  tag: "family-finance-stat-card",
  name: "Finance total",
  description: "One big number with its change over a window.",
  component: j$,
  schema: [
    Ba,
    ji,
    I1,
    Gd,
    Yd,
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
    ka,
    Ei
  ],
  stub: { view: "all", range: "1m" },
  size: 2
});
qa({
  tag: "family-finance-accounts-card",
  name: "Finance accounts",
  description: "Accounts grouped by kind with balances and sync freshness.",
  component: y$,
  schema: [
    bc,
    Ba,
    ji,
    I1,
    Gd,
    Yd,
    {
      name: "accounts",
      label: "Only these accounts (name match, empty = all)",
      selector: { text: { multiple: !0 } }
    },
    ka,
    Ei
  ],
  stub: { view: "all", range: "1m" },
  size: 4
});
qa({
  tag: "family-finance-spending-card",
  name: "Finance spending",
  description: "Where the month's money went: totals, share donut, and theme breakdown.",
  component: O$,
  schema: [
    bc,
    Ba,
    ji,
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
    ka,
    Ei
  ],
  stub: {},
  size: 6
});
qa({
  tag: "family-finance-bills-card",
  name: "Finance recurring bills",
  description: "Calendar of the month's bills and income — charged, expected, and overdue.",
  component: g$,
  schema: [Ba, ji, bc, ka, Ei],
  stub: {},
  size: 5
});
qa({
  tag: "family-finance-cardcycle-card",
  name: "Finance credit cards",
  description: "Per credit card: balance through the month with payment markers.",
  component: x$,
  schema: [Ba, ji, bc, ka, Ei],
  stub: {},
  size: 4
});
console.info("%c netwrth cards %c loaded", "background:#60a5fa;color:#0b0f17;border-radius:3px 0 0 3px;padding:1px 4px", "background:#17202f;color:#e6edf7;border-radius:0 3px 3px 0;padding:1px 4px");
