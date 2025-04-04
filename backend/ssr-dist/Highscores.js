import we from "react";
var S = { exports: {} }, y = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fe;
function pe() {
  if (fe) return y;
  fe = 1;
  var u = Symbol.for("react.transitional.element"), p = Symbol.for("react.fragment");
  function _(C, c, f) {
    var x = null;
    if (f !== void 0 && (x = "" + f), c.key !== void 0 && (x = "" + c.key), "key" in c) {
      f = {};
      for (var b in c)
        b !== "key" && (f[b] = c[b]);
    } else f = c;
    return c = f.ref, {
      $$typeof: u,
      type: C,
      key: x,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return y.Fragment = p, y.jsx = _, y.jsxs = _, y;
}
var w = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var de;
function Ce() {
  return de || (de = 1, process.env.NODE_ENV !== "production" && function() {
    function u(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Te ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case P:
          return "Fragment";
        case ge:
          return "Portal";
        case L:
          return "Profiler";
        case F:
          return "StrictMode";
        case $:
          return "Suspense";
        case W:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case D:
            return (e.displayName || "Context") + ".Provider";
          case Z:
            return (e._context.displayName || "Context") + ".Consumer";
          case M:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case U:
            return t = e.displayName || null, t !== null ? t : u(e.type) || "Memo";
          case q:
            t = e._payload, e = e._init;
            try {
              return u(e(t));
            } catch {
            }
        }
      return null;
    }
    function p(e) {
      return "" + e;
    }
    function _(e) {
      try {
        p(e);
        var t = !1;
      } catch {
        t = !0;
      }
      if (t) {
        t = console;
        var n = t.error, s = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n.call(
          t,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          s
        ), p(e);
      }
    }
    function C() {
    }
    function c() {
      if (T === 0) {
        K = console.log, ee = console.info, re = console.warn, te = console.error, ne = console.group, oe = console.groupCollapsed, se = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: C,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      T++;
    }
    function f() {
      if (T--, T === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: E({}, e, { value: K }),
          info: E({}, e, { value: ee }),
          warn: E({}, e, { value: re }),
          error: E({}, e, { value: te }),
          group: E({}, e, { value: ne }),
          groupCollapsed: E({}, e, { value: oe }),
          groupEnd: E({}, e, { value: se })
        });
      }
      0 > T && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function x(e) {
      if (J === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          J = t && t[1] || "", le = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + J + e + le;
    }
    function b(e, t) {
      if (!e || z) return "";
      var n = G.get(e);
      if (n !== void 0) return n;
      z = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var s = null;
      s = j.H, j.H = null, c();
      try {
        var a = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var v = function() {
                  throw Error();
                };
                if (Object.defineProperty(v.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(v, []);
                  } catch (h) {
                    var k = h;
                  }
                  Reflect.construct(e, [], v);
                } else {
                  try {
                    v.call();
                  } catch (h) {
                    k = h;
                  }
                  e.call(v.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (h) {
                  k = h;
                }
                (v = e()) && typeof v.catch == "function" && v.catch(function() {
                });
              }
            } catch (h) {
              if (h && k && typeof h.stack == "string")
                return [h.stack, k.stack];
            }
            return [null, null];
          }
        };
        a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var l = Object.getOwnPropertyDescriptor(
          a.DetermineComponentFrameRoot,
          "name"
        );
        l && l.configurable && Object.defineProperty(
          a.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var o = a.DetermineComponentFrameRoot(), d = o[0], g = o[1];
        if (d && g) {
          var i = d.split(`
`), m = g.split(`
`);
          for (o = l = 0; l < i.length && !i[l].includes(
            "DetermineComponentFrameRoot"
          ); )
            l++;
          for (; o < m.length && !m[o].includes(
            "DetermineComponentFrameRoot"
          ); )
            o++;
          if (l === i.length || o === m.length)
            for (l = i.length - 1, o = m.length - 1; 1 <= l && 0 <= o && i[l] !== m[o]; )
              o--;
          for (; 1 <= l && 0 <= o; l--, o--)
            if (i[l] !== m[o]) {
              if (l !== 1 || o !== 1)
                do
                  if (l--, o--, 0 > o || i[l] !== m[o]) {
                    var R = `
` + i[l].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), typeof e == "function" && G.set(e, R), R;
                  }
                while (1 <= l && 0 <= o);
              break;
            }
        }
      } finally {
        z = !1, j.H = s, f(), Error.prepareStackTrace = n;
      }
      return i = (i = e ? e.displayName || e.name : "") ? x(i) : "", typeof e == "function" && G.set(e, i), i;
    }
    function O(e) {
      if (e == null) return "";
      if (typeof e == "function") {
        var t = e.prototype;
        return b(
          e,
          !(!t || !t.isReactComponent)
        );
      }
      if (typeof e == "string") return x(e);
      switch (e) {
        case $:
          return x("Suspense");
        case W:
          return x("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case M:
            return e = b(e.render, !1), e;
          case U:
            return O(e.type);
          case q:
            t = e._payload, e = e._init;
            try {
              return O(e(t));
            } catch {
            }
        }
      return "";
    }
    function A() {
      var e = j.A;
      return e === null ? null : e.getOwner();
    }
    function xe(e) {
      if (Q.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function ve(e, t) {
      function n() {
        ae || (ae = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          t
        ));
      }
      n.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: n,
        configurable: !0
      });
    }
    function je() {
      var e = u(this.type);
      return ie[e] || (ie[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function Ee(e, t, n, s, a, l) {
      return n = l.ref, e = {
        $$typeof: Y,
        type: e,
        key: t,
        props: l,
        _owner: a
      }, (n !== void 0 ? n : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: je
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function V(e, t, n, s, a, l) {
      if (typeof e == "string" || typeof e == "function" || e === P || e === L || e === F || e === $ || e === W || e === _e || typeof e == "object" && e !== null && (e.$$typeof === q || e.$$typeof === U || e.$$typeof === D || e.$$typeof === Z || e.$$typeof === M || e.$$typeof === Re || e.getModuleId !== void 0)) {
        var o = t.children;
        if (o !== void 0)
          if (s)
            if (H(o)) {
              for (s = 0; s < o.length; s++)
                X(o[s], e);
              Object.freeze && Object.freeze(o);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else X(o, e);
      } else
        o = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? s = "null" : H(e) ? s = "array" : e !== void 0 && e.$$typeof === Y ? (s = "<" + (u(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          s,
          o
        );
      if (Q.call(t, "key")) {
        o = u(e);
        var d = Object.keys(t).filter(function(i) {
          return i !== "key";
        });
        s = 0 < d.length ? "{key: someKey, " + d.join(": ..., ") + ": ...}" : "{key: someKey}", ce[o + s] || (d = 0 < d.length ? "{" + d.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          s,
          o,
          d,
          o
        ), ce[o + s] = !0);
      }
      if (o = null, n !== void 0 && (_(n), o = "" + n), xe(t) && (_(t.key), o = "" + t.key), "key" in t) {
        n = {};
        for (var g in t)
          g !== "key" && (n[g] = t[g]);
      } else n = t;
      return o && ve(
        n,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), Ee(e, o, l, a, A(), n);
    }
    function X(e, t) {
      if (typeof e == "object" && e && e.$$typeof !== ye) {
        if (H(e))
          for (var n = 0; n < e.length; n++) {
            var s = e[n];
            N(s) && B(s, t);
          }
        else if (N(e))
          e._store && (e._store.validated = 1);
        else if (e === null || typeof e != "object" ? n = null : (n = I && e[I] || e["@@iterator"], n = typeof n == "function" ? n : null), typeof n == "function" && n !== e.entries && (n = n.call(e), n !== e))
          for (; !(e = n.next()).done; )
            N(e.value) && B(e.value, t);
      }
    }
    function N(e) {
      return typeof e == "object" && e !== null && e.$$typeof === Y;
    }
    function B(e, t) {
      if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, t = me(t), !ue[t])) {
        ue[t] = !0;
        var n = "";
        e && e._owner != null && e._owner !== A() && (n = null, typeof e._owner.tag == "number" ? n = u(e._owner.type) : typeof e._owner.name == "string" && (n = e._owner.name), n = " It was passed a child from " + n + ".");
        var s = j.getCurrentStack;
        j.getCurrentStack = function() {
          var a = O(e.type);
          return s && (a += s() || ""), a;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          t,
          n
        ), j.getCurrentStack = s;
      }
    }
    function me(e) {
      var t = "", n = A();
      return n && (n = u(n.type)) && (t = `

Check the render method of \`` + n + "`."), t || (e = u(e)) && (t = `

Check the top-level render call using <` + e + ">."), t;
    }
    var be = we, Y = Symbol.for("react.transitional.element"), ge = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), D = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), _e = Symbol.for("react.offscreen"), I = Symbol.iterator, Te = Symbol.for("react.client.reference"), j = be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = Object.prototype.hasOwnProperty, E = Object.assign, Re = Symbol.for("react.client.reference"), H = Array.isArray, T = 0, K, ee, re, te, ne, oe, se;
    C.__reactDisabledLog = !0;
    var J, le, z = !1, G = new (typeof WeakMap == "function" ? WeakMap : Map)(), ye = Symbol.for("react.client.reference"), ae, ie = {}, ce = {}, ue = {};
    w.Fragment = P, w.jsx = function(e, t, n, s, a) {
      return V(e, t, n, !1, s, a);
    }, w.jsxs = function(e, t, n, s, a) {
      return V(e, t, n, !0, s, a);
    };
  }()), w;
}
var he;
function ke() {
  return he || (he = 1, process.env.NODE_ENV === "production" ? S.exports = pe() : S.exports = Ce()), S.exports;
}
var r = ke();
function Oe() {
  return /* @__PURE__ */ r.jsx("main", { children: /* @__PURE__ */ r.jsxs("div", { className: "mainDivHighScores", children: [
    /* @__PURE__ */ r.jsx("h2", { children: "Highest scores" }),
    /* @__PURE__ */ r.jsx("div", { children: /* @__PURE__ */ r.jsxs("table", { children: [
      /* @__PURE__ */ r.jsx("thead", { children: /* @__PURE__ */ r.jsxs("tr", { children: [
        /* @__PURE__ */ r.jsx("th", { children: "Name" }),
        /* @__PURE__ */ r.jsx("th", { children: "Time" }),
        /* @__PURE__ */ r.jsx("th", { children: "Guesses" }),
        /* @__PURE__ */ r.jsx("th", { children: "Wordlength" }),
        /* @__PURE__ */ r.jsx("th", { children: "Unique letter" })
      ] }) }),
      /* @__PURE__ */ r.jsxs("tbody", { children: [
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] }),
        /* @__PURE__ */ r.jsxs("tr", { children: [
          /* @__PURE__ */ r.jsx("td", { children: "Deansie" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 min 04 sec" }),
          /* @__PURE__ */ r.jsx("td", { children: "4" }),
          /* @__PURE__ */ r.jsx("td", { children: "5 letters" }),
          /* @__PURE__ */ r.jsx("td", { children: "Yes" })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  Oe as default
};
