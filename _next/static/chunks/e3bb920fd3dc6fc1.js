(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  16015,
  (e, s, t) => {},
  98547,
  (e, s, t) => {
    var r = e.i(47167);
    e.r(16015);
    var n = e.r(71645),
      i = n && "object" == typeof n && "default" in n ? n : { default: n },
      o = void 0 !== r.default && r.default.env && !0,
      a = function (e) {
        return "[object String]" === Object.prototype.toString.call(e);
      },
      c = (function () {
        function e(e) {
          var s = void 0 === e ? {} : e,
            t = s.name,
            r = void 0 === t ? "stylesheet" : t,
            n = s.optimizeForSpeed,
            i = void 0 === n ? o : n;
          d(a(r), "`name` must be a string"),
            (this._name = r),
            (this._deletedRulePlaceholder = "#" + r + "-deleted-rule____{}"),
            d("boolean" == typeof i, "`optimizeForSpeed` must be a boolean"),
            (this._optimizeForSpeed = i),
            (this._serverSheet = void 0),
            (this._tags = []),
            (this._injected = !1),
            (this._rulesCount = 0);
          var c =
            "undefined" != typeof window &&
            document.querySelector('meta[property="csp-nonce"]');
          this._nonce = c ? c.getAttribute("content") : null;
        }
        var s,
          t = e.prototype;
        return (
          (t.setOptimizeForSpeed = function (e) {
            d("boolean" == typeof e, "`setOptimizeForSpeed` accepts a boolean"),
              d(
                0 === this._rulesCount,
                "optimizeForSpeed cannot be when rules have already been inserted"
              ),
              this.flush(),
              (this._optimizeForSpeed = e),
              this.inject();
          }),
          (t.isOptimizeForSpeed = function () {
            return this._optimizeForSpeed;
          }),
          (t.inject = function () {
            var e = this;
            if (
              (d(!this._injected, "sheet already injected"),
              (this._injected = !0),
              "undefined" != typeof window && this._optimizeForSpeed)
            ) {
              (this._tags[0] = this.makeStyleTag(this._name)),
                (this._optimizeForSpeed = "insertRule" in this.getSheet()),
                this._optimizeForSpeed ||
                  (o ||
                    console.warn(
                      "StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."
                    ),
                  this.flush(),
                  (this._injected = !0));
              return;
            }
            this._serverSheet = {
              cssRules: [],
              insertRule: function (s, t) {
                return (
                  "number" == typeof t
                    ? (e._serverSheet.cssRules[t] = { cssText: s })
                    : e._serverSheet.cssRules.push({ cssText: s }),
                  t
                );
              },
              deleteRule: function (s) {
                e._serverSheet.cssRules[s] = null;
              },
            };
          }),
          (t.getSheetForTag = function (e) {
            if (e.sheet) return e.sheet;
            for (var s = 0; s < document.styleSheets.length; s++)
              if (document.styleSheets[s].ownerNode === e)
                return document.styleSheets[s];
          }),
          (t.getSheet = function () {
            return this.getSheetForTag(this._tags[this._tags.length - 1]);
          }),
          (t.insertRule = function (e, s) {
            if (
              (d(a(e), "`insertRule` accepts only strings"),
              "undefined" == typeof window)
            )
              return (
                "number" != typeof s && (s = this._serverSheet.cssRules.length),
                this._serverSheet.insertRule(e, s),
                this._rulesCount++
              );
            if (this._optimizeForSpeed) {
              var t = this.getSheet();
              "number" != typeof s && (s = t.cssRules.length);
              try {
                t.insertRule(e, s);
              } catch (s) {
                return (
                  o ||
                    console.warn(
                      "StyleSheet: illegal rule: \n\n" +
                        e +
                        "\n\nSee https://stackoverflow.com/q/20007992 for more info"
                    ),
                  -1
                );
              }
            } else {
              var r = this._tags[s];
              this._tags.push(this.makeStyleTag(this._name, e, r));
            }
            return this._rulesCount++;
          }),
          (t.replaceRule = function (e, s) {
            if (this._optimizeForSpeed || "undefined" == typeof window) {
              var t =
                "undefined" != typeof window
                  ? this.getSheet()
                  : this._serverSheet;
              if (
                (s.trim() || (s = this._deletedRulePlaceholder), !t.cssRules[e])
              )
                return e;
              t.deleteRule(e);
              try {
                t.insertRule(s, e);
              } catch (r) {
                o ||
                  console.warn(
                    "StyleSheet: illegal rule: \n\n" +
                      s +
                      "\n\nSee https://stackoverflow.com/q/20007992 for more info"
                  ),
                  t.insertRule(this._deletedRulePlaceholder, e);
              }
            } else {
              var r = this._tags[e];
              d(r, "old rule at index `" + e + "` not found"),
                (r.textContent = s);
            }
            return e;
          }),
          (t.deleteRule = function (e) {
            if ("undefined" == typeof window)
              return void this._serverSheet.deleteRule(e);
            if (this._optimizeForSpeed) this.replaceRule(e, "");
            else {
              var s = this._tags[e];
              d(s, "rule at index `" + e + "` not found"),
                s.parentNode.removeChild(s),
                (this._tags[e] = null);
            }
          }),
          (t.flush = function () {
            (this._injected = !1),
              (this._rulesCount = 0),
              "undefined" != typeof window
                ? (this._tags.forEach(function (e) {
                    return e && e.parentNode.removeChild(e);
                  }),
                  (this._tags = []))
                : (this._serverSheet.cssRules = []);
          }),
          (t.cssRules = function () {
            var e = this;
            return "undefined" == typeof window
              ? this._serverSheet.cssRules
              : this._tags.reduce(function (s, t) {
                  return (
                    t
                      ? (s = s.concat(
                          Array.prototype.map.call(
                            e.getSheetForTag(t).cssRules,
                            function (s) {
                              return s.cssText === e._deletedRulePlaceholder
                                ? null
                                : s;
                            }
                          )
                        ))
                      : s.push(null),
                    s
                  );
                }, []);
          }),
          (t.makeStyleTag = function (e, s, t) {
            s &&
              d(a(s), "makeStyleTag accepts only strings as second parameter");
            var r = document.createElement("style");
            this._nonce && r.setAttribute("nonce", this._nonce),
              (r.type = "text/css"),
              r.setAttribute("data-" + e, ""),
              s && r.appendChild(document.createTextNode(s));
            var n = document.head || document.getElementsByTagName("head")[0];
            return t ? n.insertBefore(r, t) : n.appendChild(r), r;
          }),
          (s = [
            {
              key: "length",
              get: function () {
                return this._rulesCount;
              },
            },
          ]),
          (function (e, s) {
            for (var t = 0; t < s.length; t++) {
              var r = s[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          })(e.prototype, s),
          e
        );
      })();
    function d(e, s) {
      if (!e) throw Error("StyleSheet: " + s + ".");
    }
    var f = function (e) {
        for (var s = 5381, t = e.length; t; ) s = (33 * s) ^ e.charCodeAt(--t);
        return s >>> 0;
      },
      l = {};
    function m(e, s) {
      if (!s) return "jsx-" + e;
      var t = String(s),
        r = e + t;
      return l[r] || (l[r] = "jsx-" + f(e + "-" + t)), l[r];
    }
    function x(e, s) {
      "undefined" == typeof window && (s = s.replace(/\/style/gi, "\\/style"));
      var t = e + s;
      return (
        l[t] || (l[t] = s.replace(/__jsx-style-dynamic-selector/g, e)), l[t]
      );
    }
    var b = (function () {
        function e(e) {
          var s = void 0 === e ? {} : e,
            t = s.styleSheet,
            r = void 0 === t ? null : t,
            n = s.optimizeForSpeed,
            i = void 0 !== n && n;
          (this._sheet =
            r || new c({ name: "styled-jsx", optimizeForSpeed: i })),
            this._sheet.inject(),
            r &&
              "boolean" == typeof i &&
              (this._sheet.setOptimizeForSpeed(i),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
            (this._fromServer = void 0),
            (this._indices = {}),
            (this._instancesCounts = {});
        }
        var s = e.prototype;
        return (
          (s.add = function (e) {
            var s = this;
            void 0 === this._optimizeForSpeed &&
              ((this._optimizeForSpeed = Array.isArray(e.children)),
              this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
              "undefined" == typeof window ||
                this._fromServer ||
                ((this._fromServer = this.selectFromServer()),
                (this._instancesCounts = Object.keys(this._fromServer).reduce(
                  function (e, s) {
                    return (e[s] = 0), e;
                  },
                  {}
                )));
            var t = this.getIdAndRules(e),
              r = t.styleId,
              n = t.rules;
            if (r in this._instancesCounts) {
              this._instancesCounts[r] += 1;
              return;
            }
            var i = n
              .map(function (e) {
                return s._sheet.insertRule(e);
              })
              .filter(function (e) {
                return -1 !== e;
              });
            (this._indices[r] = i), (this._instancesCounts[r] = 1);
          }),
          (s.remove = function (e) {
            var s = this,
              t = this.getIdAndRules(e).styleId;
            if (
              ((function (e, s) {
                if (!e) throw Error("StyleSheetRegistry: " + s + ".");
              })(t in this._instancesCounts, "styleId: `" + t + "` not found"),
              (this._instancesCounts[t] -= 1),
              this._instancesCounts[t] < 1)
            ) {
              var r = this._fromServer && this._fromServer[t];
              r
                ? (r.parentNode.removeChild(r), delete this._fromServer[t])
                : (this._indices[t].forEach(function (e) {
                    return s._sheet.deleteRule(e);
                  }),
                  delete this._indices[t]),
                delete this._instancesCounts[t];
            }
          }),
          (s.update = function (e, s) {
            this.add(s), this.remove(e);
          }),
          (s.flush = function () {
            this._sheet.flush(),
              this._sheet.inject(),
              (this._fromServer = void 0),
              (this._indices = {}),
              (this._instancesCounts = {});
          }),
          (s.cssRules = function () {
            var e = this,
              s = this._fromServer
                ? Object.keys(this._fromServer).map(function (s) {
                    return [s, e._fromServer[s]];
                  })
                : [],
              t = this._sheet.cssRules();
            return s.concat(
              Object.keys(this._indices)
                .map(function (s) {
                  return [
                    s,
                    e._indices[s]
                      .map(function (e) {
                        return t[e].cssText;
                      })
                      .join(e._optimizeForSpeed ? "" : "\n"),
                  ];
                })
                .filter(function (e) {
                  return !!e[1];
                })
            );
          }),
          (s.styles = function (e) {
            var s, t;
            return (
              (s = this.cssRules()),
              void 0 === (t = e) && (t = {}),
              s.map(function (e) {
                var s = e[0],
                  r = e[1];
                return i.default.createElement("style", {
                  id: "__" + s,
                  key: "__" + s,
                  nonce: t.nonce ? t.nonce : void 0,
                  dangerouslySetInnerHTML: { __html: r },
                });
              })
            );
          }),
          (s.getIdAndRules = function (e) {
            var s = e.children,
              t = e.dynamic,
              r = e.id;
            if (t) {
              var n = m(r, t);
              return {
                styleId: n,
                rules: Array.isArray(s)
                  ? s.map(function (e) {
                      return x(n, e);
                    })
                  : [x(n, s)],
              };
            }
            return { styleId: m(r), rules: Array.isArray(s) ? s : [s] };
          }),
          (s.selectFromServer = function () {
            return Array.prototype.slice
              .call(document.querySelectorAll('[id^="__jsx-"]'))
              .reduce(function (e, s) {
                return (e[s.id.slice(2)] = s), e;
              }, {});
          }),
          e
        );
      })(),
      u = n.createContext(null);
    function h() {
      return new b();
    }
    function p() {
      return n.useContext(u);
    }
    u.displayName = "StyleSheetContext";
    var j = i.default.useInsertionEffect || i.default.useLayoutEffect,
      g = "undefined" != typeof window ? h() : void 0;
    function v(e) {
      var s = g || p();
      return (
        s &&
          ("undefined" == typeof window
            ? s.add(e)
            : j(
                function () {
                  return (
                    s.add(e),
                    function () {
                      s.remove(e);
                    }
                  );
                },
                [e.id, String(e.dynamic)]
              )),
        null
      );
    }
    (v.dynamic = function (e) {
      return e
        .map(function (e) {
          return m(e[0], e[1]);
        })
        .join(" ");
    }),
      (t.StyleRegistry = function (e) {
        var s = e.registry,
          t = e.children,
          r = n.useContext(u),
          o = n.useState(function () {
            return r || s || h();
          })[0];
        return i.default.createElement(u.Provider, { value: o }, t);
      }),
      (t.createStyleRegistry = h),
      (t.style = v),
      (t.useStyleRegistry = p);
  },
  37902,
  (e, s, t) => {
    s.exports = e.r(98547).style;
  },
  81694,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(37902),
      r = e.i(71645),
      n = e.i(84306);
    e.i(1465);
    var i = e.i(34991);
    function o() {
      let [e, o] = (0, r.useState)(""),
        [a, c] = (0, r.useState)(0),
        [d, f] = (0, r.useState)(0),
        [l, m] = (0, r.useState)(0),
        [x, b] = (0, r.useState)(0),
        [u, h] = (0, r.useState)(!1),
        [p, j] = (0, r.useState)([]),
        [g, v] = (0, r.useState)({ seconds: 60, status: null }),
        [y, k] = (0, r.useState)([]);
      (0, r.useEffect)(() => {
        let e = (0, i.ref)(n.database, "ca"),
          s = (0, i.onValue)(e, (e) => {
            let s = e.val();
            s && o(s);
          }),
          t = (0, i.ref)(n.database, "burns"),
          r = (0, i.onValue)(t, (e) => {
            let s = e.val();
            s
              ? j(
                  Object.entries(s)
                    .map(([e, s]) => ({ id: e, ...s }))
                    .sort((e, s) => s.timestamp - e.timestamp)
                )
              : j([]);
          }),
          a = (0, i.ref)(n.database, "timer"),
          c = (0, i.onValue)(a, (e) => {
            let s = e.val();
            s && v(s);
          }),
          d = (0, i.ref)(n.database, "treasury_movements"),
          f = (0, i.onValue)(d, (e) => {
            let s = e.val();
            s
              ? k(
                  Object.entries(s)
                    .map(([e, s]) => ({ id: e, ...s }))
                    .sort((e, s) => s.timestamp - e.timestamp)
                )
              : k([]);
          });
        return () => {
          s(), r(), c(), f();
        };
      }, []),
        (0, r.useEffect)(() => {
          if (!e) return;
          let s = async () => {
            try {
              let s = await fetch(`/api/market-cap?ca=${e}`);
              if (s.ok) {
                let e = await s.json();
                e.success &&
                  (c(e.marketCap || 0),
                  f(e.totalSupply || 0),
                  b(e.volume24h || 0));
              }
            } catch (e) {
              console.error("Error fetching market data:", e);
            }
          };
          s();
          let t = setInterval(s, 3e4);
          return () => clearInterval(t);
        }, [e]),
        (0, r.useEffect)(() => {
          let e = (0, i.ref)(n.database, "holdersCount"),
            s = (0, i.onValue)(e, (e) => {
              let s = e.val();
              s && m(s);
            });
          return () => s();
        }, []);
      let N = (e) =>
          e && 0 !== e
            ? e >= 1e9
              ? `${(e / 1e9).toFixed(2)}B`
              : e >= 1e6
              ? `${(e / 1e6).toFixed(2)}M`
              : e >= 1e3
              ? `${(e / 1e3).toFixed(1)}K`
              : e.toLocaleString()
            : "0",
        w = p.reduce((e, s) => e + (s.tokensBurned || 0), 0) / 1e6,
        _ = p.length,
        S = (e) => {
          let s = Math.floor(e / 60);
          return `${s}:${(e % 60).toString().padStart(2, "0")}`;
        };
      return (0, s.jsxs)("div", {
        className: "jsx-b7934ff5881c1ed3 page",
        children: [
          (0, s.jsx)("video", {
            autoPlay: !0,
            muted: !0,
            loop: !0,
            playsInline: !0,
            className: "jsx-b7934ff5881c1ed3 video-bg",
            children: (0, s.jsx)("source", {
              src: "/video.mp4",
              type: "video/mp4",
              className: "jsx-b7934ff5881c1ed3",
            }),
          }),
          (0, s.jsx)("div", {
            className: "jsx-b7934ff5881c1ed3 video-overlay",
          }),
          (0, s.jsxs)("main", {
            className: "jsx-b7934ff5881c1ed3 main",
            children: [
              (0, s.jsx)("section", {
                className: "jsx-b7934ff5881c1ed3 hero",
                children: (0, s.jsxs)("div", {
                  className: "jsx-b7934ff5881c1ed3 hero-content",
                  children: [
                    (0, s.jsx)("h2", {
                      className: "jsx-b7934ff5881c1ed3 hero-title",
                      children: "$MooNutPeng",
                    }),
                    (0, s.jsxs)("div", {
                      className: "jsx-b7934ff5881c1ed3 timer-box",
                      children: [
                        (0, s.jsx)("span", {
                          className: "jsx-b7934ff5881c1ed3 timer-label",
                          children: "Total Supply",
                        }),
                        (0, s.jsx)("span", {
                          className: "jsx-b7934ff5881c1ed3 timer-value",
                          children: "🔥 1,000,000,000",
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: "jsx-b7934ff5881c1ed3 hero-stats",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "jsx-b7934ff5881c1ed3 hero-stat fire",
                          children: [
                            (0, s.jsx)("span", {
                              className: "jsx-b7934ff5881c1ed3 hero-stat-value",
                              children: "Locked",
                            }),
                            (0, s.jsx)("span", {
                              className: "jsx-b7934ff5881c1ed3 hero-stat-label",
                              children: "LP",
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "jsx-b7934ff5881c1ed3 hero-stat",
                          children: [
                            (0, s.jsx)("span", {
                              className: "jsx-b7934ff5881c1ed3 hero-stat-value",
                              children: "0/0",
                            }),
                            (0, s.jsx)("span", {
                              className: "jsx-b7934ff5881c1ed3 hero-stat-label",
                              children: "Tax",
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "jsx-b7934ff5881c1ed3 hero-stat",
                          children: [
                            (0, s.jsx)("span", {
                              className: "jsx-b7934ff5881c1ed3 hero-stat-value",
                              children: "Renounced",
                            }),
                            (0, s.jsx)("span", {
                              className: "jsx-b7934ff5881c1ed3 hero-stat-label",
                              children: "Contract",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)("button", {
                      onClick: () => {
                        e &&
                          (navigator.clipboard.writeText("0xf87E203DD47B445B6aBb07dAeEe119b294d16035"),
                          h(!0),
                          setTimeout(() => h(!1), 2e3));
                      },
                      className: "jsx-b7934ff5881c1ed3 ca-button",
                      children: [
                        (0, s.jsx)("code", {
                          className: "jsx-b7934ff5881c1ed3",
                          children: "0xf87E203DD47B445B6aBb07dAeEe119b294d16035" || "Loading...",
                        }),
                        (0, s.jsx)("span", {
                          className: "jsx-b7934ff5881c1ed3 copy-indicator",
                          children: u ? "✓ Copied!" : "Copy CA",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, s.jsxs)("section", {
                className: "jsx-b7934ff5881c1ed3 lore-section",
                children: [
                  (0, s.jsxs)("div", {
                    className: "jsx-b7934ff5881c1ed3 lore-header",
                    children: [
                      (0, s.jsx)("span", {
                        className: "jsx-b7934ff5881c1ed3 lore-tag",
                        children: "⚡ THE LORE",
                      }),
                      (0, s.jsx)("h3", {
                        className: "jsx-b7934ff5881c1ed3",
                        children: "The Fastest Runner of ethereum",
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "jsx-b7934ff5881c1ed3 lore-equation",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "jsx-b7934ff5881c1ed3 lore-token",
                        children: [
                          (0, s.jsx)("span", {
                            className: "jsx-b7934ff5881c1ed3 token-icon",
                            children: "🦛",
                          }),
                          (0, s.jsx)("span", {
                            className: "jsx-b7934ff5881c1ed3 token-name",
                            children: "$MooDeng",
                          }),
                        ],
                      }),
                      (0, s.jsx)("span", {
                        className: "jsx-b7934ff5881c1ed3 lore-plus",
                        children: "+",
                      }),
                      (0, s.jsxs)("div", {
                        className: "jsx-b7934ff5881c1ed3 lore-token",
                        children: [
                          (0, s.jsx)("span", {
                            className: "jsx-b7934ff5881c1ed3 token-icon",
                            children: "🐿️",
                          }),
                          (0, s.jsx)("span", {
                            className: "jsx-b7934ff5881c1ed3 token-name",
                            children: "$Pnut",
                          }),
                        ],
                      }),
                      (0, s.jsx)("span", {
                        className: "jsx-b7934ff5881c1ed3 lore-plus",
                        children: "+",
                      }),
                      (0, s.jsxs)("div", {
                        className: "jsx-b7934ff5881c1ed3 lore-token",
                        children: [
                          (0, s.jsx)("span", {
                            className: "jsx-b7934ff5881c1ed3 token-icon",
                            children: "🐧",
                          }),
                          (0, s.jsx)("span", {
                            className: "jsx-b7934ff5881c1ed3 token-name",
                            children: "$Penguin",
                          }),
                        ],
                      }),
                      (0, s.jsx)("span", {
                        className: "jsx-b7934ff5881c1ed3 lore-equals",
                        children: "=",
                      }),
                      (0, s.jsx)("div", {
                        className: "jsx-b7934ff5881c1ed3 lore-token result",
                        children: (0, s.jsx)("span", {
                          className: "jsx-b7934ff5881c1ed3 token-name",
                          children: "$MooNutPeng",
                        }),
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "jsx-b7934ff5881c1ed3 lore-story",
                    children: [
                      (0, s.jsx)("p", {
                        className: "jsx-b7934ff5881c1ed3 lore-text highlight",
                        children:
                          "Three animals. Each ran to 100M in 1-7 days.",
                      }),
                      (0, s.jsx)("p", {
                        className: "jsx-b7934ff5881c1ed3 lore-question",
                        children: "So the question is simple:",
                      }),
                      (0, s.jsx)("p", {
                        className: "jsx-b7934ff5881c1ed3 lore-answer",
                        children:
                          "How fast can one creature run if we combine all three?",
                      }),
                    ],
                  }),
                ],
              }),
              (0, s.jsxs)("section", {
                className: "jsx-b7934ff5881c1ed3 videos-section",
                children: [
                  (0, s.jsx)("div", {
                    className: "jsx-b7934ff5881c1ed3 section-header",
                    children: (0, s.jsxs)("div", {
                      className: "jsx-b7934ff5881c1ed3 section-title-group",
                      children: [
                        (0, s.jsx)("span", {
                          className: "jsx-b7934ff5881c1ed3 fire-icon",
                          children: "🎬",
                        }),
                        (0, s.jsx)("h3", {
                          className: "jsx-b7934ff5881c1ed3",
                          children: "Cinematic Videos",
                        }),
                      ],
                    }),
                  }),
                  (0, s.jsxs)("div", {
                    className: "jsx-b7934ff5881c1ed3 videos-gallery",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "jsx-b7934ff5881c1ed3 video-card",
                        children: [
                          (0, s.jsx)("video", {
                            autoPlay: !0,
                            muted: !0,
                            loop: !0,
                            playsInline: !0,
                            className: "jsx-b7934ff5881c1ed3",
                            children: (0, s.jsx)("source", {
                              src: "/videos/1.mp4",
                              type: "video/mp4",
                              className: "jsx-b7934ff5881c1ed3",
                            }),
                          }),
                          (0, s.jsx)("a", {
                            href: "/videos/1.mp4",
                            download: "MooNutPeng_Video_1.mp4",
                            className: "jsx-b7934ff5881c1ed3 download-btn",
                            children: (0, s.jsxs)("svg", {
                              viewBox: "0 0 24 24",
                              width: "18",
                              height: "18",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              className: "jsx-b7934ff5881c1ed3",
                              children: [
                                (0, s.jsx)("path", {
                                  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                                (0, s.jsx)("polyline", {
                                  points: "7 10 12 15 17 10",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                                (0, s.jsx)("line", {
                                  x1: "12",
                                  y1: "15",
                                  x2: "12",
                                  y2: "3",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        className: "jsx-b7934ff5881c1ed3 video-card",
                        children: [
                          (0, s.jsx)("video", {
                            autoPlay: !0,
                            muted: !0,
                            loop: !0,
                            playsInline: !0,
                            className: "jsx-b7934ff5881c1ed3",
                            children: (0, s.jsx)("source", {
                              src: "/videos/2.mp4",
                              type: "video/mp4",
                              className: "jsx-b7934ff5881c1ed3",
                            }),
                          }),
                          (0, s.jsx)("a", {
                            href: "/videos/2.mp4",
                            download: "MooNutPeng_Video_2.mp4",
                            className: "jsx-b7934ff5881c1ed3 download-btn",
                            children: (0, s.jsxs)("svg", {
                              viewBox: "0 0 24 24",
                              width: "18",
                              height: "18",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              className: "jsx-b7934ff5881c1ed3",
                              children: [
                                (0, s.jsx)("path", {
                                  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                                (0, s.jsx)("polyline", {
                                  points: "7 10 12 15 17 10",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                                (0, s.jsx)("line", {
                                  x1: "12",
                                  y1: "15",
                                  x2: "12",
                                  y2: "3",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        className: "jsx-b7934ff5881c1ed3 video-card",
                        children: [
                          (0, s.jsx)("video", {
                            autoPlay: !0,
                            muted: !0,
                            loop: !0,
                            playsInline: !0,
                            className: "jsx-b7934ff5881c1ed3",
                            children: (0, s.jsx)("source", {
                              src: "/videos/3.mp4",
                              type: "video/mp4",
                              className: "jsx-b7934ff5881c1ed3",
                            }),
                          }),
                          (0, s.jsx)("a", {
                            href: "/videos/3.mp4",
                            download: "MooNutPeng_Video_3.mp4",
                            className: "jsx-b7934ff5881c1ed3 download-btn",
                            children: (0, s.jsxs)("svg", {
                              viewBox: "0 0 24 24",
                              width: "18",
                              height: "18",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              className: "jsx-b7934ff5881c1ed3",
                              children: [
                                (0, s.jsx)("path", {
                                  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                                (0, s.jsx)("polyline", {
                                  points: "7 10 12 15 17 10",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                                (0, s.jsx)("line", {
                                  x1: "12",
                                  y1: "15",
                                  x2: "12",
                                  y2: "3",
                                  className: "jsx-b7934ff5881c1ed3",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              y.length > 0 &&
                (0, s.jsxs)("section", {
                  className: "jsx-b7934ff5881c1ed3 movements-section",
                  children: [
                    (0, s.jsxs)("div", {
                      className: "jsx-b7934ff5881c1ed3 section-header",
                      children: [
                        (0, s.jsx)("h3", {
                          className: "jsx-b7934ff5881c1ed3",
                          children: "Treasury Movements",
                        }),
                        (0, s.jsx)("span", {
                          className: "jsx-b7934ff5881c1ed3 transparent-badge",
                          children: "100% Transparent",
                        }),
                      ],
                    }),
                    (0, s.jsx)("p", {
                      className: "jsx-b7934ff5881c1ed3 movements-desc",
                      children:
                        "All transactions are recorded and verifiable on-chain.",
                    }),
                    (0, s.jsx)("div", {
                      className: "jsx-b7934ff5881c1ed3 movements-list",
                      children: y.map((e) =>
                        (0, s.jsxs)(
                          "div",
                          {
                            className: `jsx-b7934ff5881c1ed3 movement-row ${e.type}`,
                            children: [
                              (0, s.jsxs)("div", {
                                className: "jsx-b7934ff5881c1ed3 movement-left",
                                children: [
                                  (0, s.jsx)("span", {
                                    className: `jsx-b7934ff5881c1ed3 movement-type-badge ${e.type}`,
                                    children:
                                      "in" === e.type
                                        ? "↓"
                                        : "burn" === e.type
                                        ? "🔥"
                                        : "↑",
                                  }),
                                  (0, s.jsxs)("div", {
                                    className:
                                      "jsx-b7934ff5881c1ed3 movement-details",
                                    children: [
                                      (0, s.jsx)("span", {
                                        className:
                                          "jsx-b7934ff5881c1ed3 movement-concept",
                                        children: e.concept,
                                      }),
                                      (0, s.jsxs)("span", {
                                        className:
                                          "jsx-b7934ff5881c1ed3 movement-date",
                                        children: [
                                          new Date(
                                            e.timestamp
                                          ).toLocaleDateString(),
                                          " • ",
                                          new Date(
                                            e.timestamp
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                className:
                                  "jsx-b7934ff5881c1ed3 movement-right",
                                children: [
                                  (0, s.jsxs)("span", {
                                    className: `jsx-b7934ff5881c1ed3 movement-amount ${e.type}`,
                                    children: [
                                      "in" === e.type ? "+" : "-",
                                      e.amount,
                                    ],
                                  }),
                                  e.txLink &&
                                    (0, s.jsx)("a", {
                                      href: e.txLink,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className:
                                        "jsx-b7934ff5881c1ed3 movement-tx-link",
                                      children: "View TX ↗",
                                    }),
                                ],
                              }),
                            ],
                          },
                          e.id
                        )
                      ),
                    }),
                  ],
                }),
              (0, s.jsxs)("section", {
                className: "jsx-b7934ff5881c1ed3 links-section",
                children: [
                  (0, s.jsx)("a", {
                    href: "https://x.com/MooNutPeng_coin",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: "X Community",
                    className: "jsx-b7934ff5881c1ed3 link-icon-btn",
                    children: (0, s.jsx)("svg", {
                      viewBox: "0 0 24 24",
                      width: "24",
                      height: "24",
                      fill: "currentColor",
                      className: "jsx-b7934ff5881c1ed3",
                      children: (0, s.jsx)("path", {
                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                        className: "jsx-b7934ff5881c1ed3",
                      }),
                    }),
                  }),
                  (0, s.jsx)("a", {
                    href: `https://dexscreener.com/ethereum/0xf87E203DD47B445B6aBb07dAeEe119b294d16035`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: "DEX Screener",
                    className: "jsx-b7934ff5881c1ed3 link-icon-btn",
                    children: (0, s.jsxs)("svg", {
                      viewBox: "0 0 24 24",
                      width: "24",
                      height: "24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      className: "jsx-b7934ff5881c1ed3",
                      children: [
                        (0, s.jsx)("path", {
                          d: "M3 3v18h18",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                        (0, s.jsx)("path", {
                          d: "M18 9l-5 5-4-4-3 3",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                      ],
                    }),
                  }),
                  (0, s.jsx)("a", {
                    href: "https://www.coingecko.com/en/coins/ethereum",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: "CoinGecko",
                    className: "jsx-b7934ff5881c1ed3 link-icon-btn",
                    children: (0, s.jsxs)("svg", {
                      viewBox: "0 0 24 24",
                      width: "24",
                      height: "24",
                      fill: "currentColor",
                      className: "jsx-b7934ff5881c1ed3",
                      children: [
                        (0, s.jsx)("circle", {
                          cx: "12",
                          cy: "12",
                          r: "10",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                        (0, s.jsx)("circle", {
                          cx: "9",
                          cy: "10",
                          r: "2",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                        (0, s.jsx)("circle", {
                          cx: "15",
                          cy: "10",
                          r: "1.5",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                        (0, s.jsx)("path", {
                          d: "M8 15c2 2 6 2 8 0",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                      ],
                    }),
                  }),
                  (0, s.jsx)("a", {
                    href: `https://dextools.io/app/ether/pair-explorer/0xf87E203DD47B445B6aBb07dAeEe119b294d16035`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: "Dextools",
                    className: "jsx-b7934ff5881c1ed3 link-icon-btn",
                    children: (0, s.jsxs)("svg", {
                      viewBox: "0 0 24 24",
                      width: "24",
                      height: "24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      className: "jsx-b7934ff5881c1ed3",
                      children: [
                        (0, s.jsx)("circle", {
                          cx: "11",
                          cy: "11",
                          r: "8",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                        (0, s.jsx)("path", {
                          d: "M21 21l-4.35-4.35",
                          className: "jsx-b7934ff5881c1ed3",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
          (0, s.jsx)(t.default, {
            id: "b7934ff5881c1ed3",
            children:
              ".page.jsx-b7934ff5881c1ed3{color:#fff;background:#0c1929;min-height:100vh;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;position:relative}.video-bg.jsx-b7934ff5881c1ed3{object-fit:cover;z-index:0;width:100%;height:100%;position:fixed;top:0;left:0}.video-overlay.jsx-b7934ff5881c1ed3{z-index:1;background:linear-gradient(#0c1929b3 0%,#0c1929d9 50%,#0c1929fa 100%);width:100%;height:100%;position:fixed;top:0;left:0}.main.jsx-b7934ff5881c1ed3{z-index:2;max-width:1000px;margin:0 auto;padding:2rem 1.5rem;position:relative}.hero.jsx-b7934ff5881c1ed3{text-align:center;padding:3rem 0}.hero-content.jsx-b7934ff5881c1ed3{max-width:700px;margin:0 auto}.hero-title.jsx-b7934ff5881c1ed3{-webkit-text-fill-color:transparent;background:linear-gradient(135deg,#fff 0%,#87ceeb 50%,#5ba3c6 100%);-webkit-background-clip:text;background-clip:text;margin:0 0 1rem;font-size:3.5rem;font-weight:800}.timer-box.jsx-b7934ff5881c1ed3{background:linear-gradient(135deg,#8b5a2b4d,#a0522d33);border:2px solid #8b5a2b80;border-radius:16px;flex-direction:column;align-items:center;margin-bottom:2rem;padding:1.25rem 2.5rem;display:inline-flex}.timer-label.jsx-b7934ff5881c1ed3{color:#fff9;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.25rem;font-size:.7rem}.timer-value.jsx-b7934ff5881c1ed3{color:#d2691e;font-family:ui-monospace,SFMono-Regular,monospace;font-size:2rem;font-weight:700}.hero-stats.jsx-b7934ff5881c1ed3{grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem;display:grid}.hero-stat.jsx-b7934ff5881c1ed3{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#87cefa0d;border:1px solid #87cefa26;border-radius:12px;padding:1.25rem}.hero-stat.fire.jsx-b7934ff5881c1ed3{background:linear-gradient(135deg,#8b5a2b33,#d2691e1a);border-color:#d2691e66}.hero-stat-value.jsx-b7934ff5881c1ed3{color:#fff;margin-bottom:.25rem;font-size:1.5rem;font-weight:700;display:block}.hero-stat.fire.jsx-b7934ff5881c1ed3 .hero-stat-value.jsx-b7934ff5881c1ed3{color:#d2691e}.hero-stat-label.jsx-b7934ff5881c1ed3{color:#87cefa99;text-transform:uppercase;letter-spacing:.05em;font-size:.75rem}.ca-button.jsx-b7934ff5881c1ed3{cursor:pointer;background:#87cefa1a;border:1px solid #87cefa40;border-radius:12px;align-items:center;gap:1rem;padding:1rem 1.5rem;transition:all .2s;display:inline-flex}.ca-button.jsx-b7934ff5881c1ed3:hover{background:#87cefa26;border-color:#8b5a2b80}.ca-button.jsx-b7934ff5881c1ed3 code.jsx-b7934ff5881c1ed3{color:#fffc;font-family:ui-monospace,SFMono-Regular,monospace;font-size:.9rem}.copy-indicator.jsx-b7934ff5881c1ed3{color:#fff;background:linear-gradient(135deg,#8b5a2b,sienna);border-radius:6px;padding:.4rem .75rem;font-size:.8rem;font-weight:500}.lore-section.jsx-b7934ff5881c1ed3{text-align:center;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#87cefa08;border:1px solid #87cefa1f;border-radius:20px;margin-bottom:1.5rem;padding:2.5rem}.lore-header.jsx-b7934ff5881c1ed3{margin-bottom:2rem}.lore-tag.jsx-b7934ff5881c1ed3{color:#d2691e;text-transform:uppercase;letter-spacing:.15em;margin-bottom:.75rem;font-size:.75rem;display:inline-block}.lore-header.jsx-b7934ff5881c1ed3 h3.jsx-b7934ff5881c1ed3{-webkit-text-fill-color:transparent;background:linear-gradient(135deg,#fff,#87ceeb);-webkit-background-clip:text;background-clip:text;margin:0;font-size:1.75rem;font-weight:700}.lore-equation.jsx-b7934ff5881c1ed3{background:#0003;border-radius:16px;flex-wrap:wrap;justify-content:center;align-items:center;gap:1rem;margin-bottom:2rem;padding:1.5rem;display:flex}.lore-token.jsx-b7934ff5881c1ed3{background:#87cefa14;border:1px solid #87cefa26;border-radius:12px;flex-direction:column;align-items:center;gap:.5rem;padding:1rem 1.25rem;transition:all .2s;display:flex}.lore-token.jsx-b7934ff5881c1ed3:hover{border-color:#87cefa4d;transform:translateY(-2px)}.lore-token.result.jsx-b7934ff5881c1ed3{background:linear-gradient(135deg,#8b5a2b4d,#d2691e33);border-color:#d2691e66;transform:scale(1.1)}.lore-token.result.jsx-b7934ff5881c1ed3:hover{transform:scale(1.15)}.token-icon.jsx-b7934ff5881c1ed3{font-size:2rem}.token-name.jsx-b7934ff5881c1ed3{color:#fff;font-size:.85rem;font-weight:600}.lore-token.result.jsx-b7934ff5881c1ed3 .token-name.jsx-b7934ff5881c1ed3{color:#d2691e}.lore-plus.jsx-b7934ff5881c1ed3,.lore-equals.jsx-b7934ff5881c1ed3{color:#87cefa80;font-size:1.5rem;font-weight:700}.lore-equals.jsx-b7934ff5881c1ed3{color:#d2691e}.lore-story.jsx-b7934ff5881c1ed3{max-width:500px;margin:0 auto}.lore-text.jsx-b7934ff5881c1ed3{color:#ffffffb3;margin:0 0 1rem;font-size:1rem;line-height:1.6}.lore-text.highlight.jsx-b7934ff5881c1ed3{color:#fff;font-size:1.1rem;font-weight:500}.lore-question.jsx-b7934ff5881c1ed3{color:#87cefa99;margin:0 0 .5rem;font-size:.95rem;font-style:italic}.lore-answer.jsx-b7934ff5881c1ed3{-webkit-text-fill-color:transparent;background:linear-gradient(135deg,#d2691e,#f4a460);-webkit-background-clip:text;background-clip:text;margin:0;font-size:1.25rem;font-weight:700}.videos-section.jsx-b7934ff5881c1ed3{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#87cefa08;border:1px solid #87cefa1f;border-radius:16px;margin-bottom:1.5rem;padding:1.5rem}.videos-gallery.jsx-b7934ff5881c1ed3{grid-template-columns:repeat(3,1fr);gap:1rem;display:grid}.video-card.jsx-b7934ff5881c1ed3{aspect-ratio:9/16;background:#0000004d;border:1px solid #87cefa26;border-radius:12px;transition:all .3s;position:relative;overflow:hidden}.video-card.jsx-b7934ff5881c1ed3:hover{border-color:#d2691e66;transform:scale(1.02);box-shadow:0 8px 30px #0000004d}.video-card.jsx-b7934ff5881c1ed3 video.jsx-b7934ff5881c1ed3{object-fit:cover;width:100%;height:100%}.download-btn.jsx-b7934ff5881c1ed3{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;opacity:0;background:#0009;border-radius:50%;justify-content:center;align-items:center;width:40px;height:40px;text-decoration:none;transition:all .2s;display:flex;position:absolute;bottom:12px;right:12px}.video-card.jsx-b7934ff5881c1ed3:hover .download-btn.jsx-b7934ff5881c1ed3{opacity:1}.download-btn.jsx-b7934ff5881c1ed3:hover{background:#d2691ecc;transform:scale(1.1)}.burns-section.jsx-b7934ff5881c1ed3{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#87cefa08;border:1px solid #87cefa1f;border-radius:16px;margin-bottom:1.5rem;padding:1.5rem}.section-header.jsx-b7934ff5881c1ed3{justify-content:space-between;align-items:center;margin-bottom:1.25rem;display:flex}.section-title-group.jsx-b7934ff5881c1ed3{align-items:center;gap:.5rem;display:flex}.fire-icon.jsx-b7934ff5881c1ed3{font-size:1.25rem}.section-header.jsx-b7934ff5881c1ed3 h3.jsx-b7934ff5881c1ed3{color:#fff;margin:0;font-size:1.1rem;font-weight:600}.live-badge.jsx-b7934ff5881c1ed3{color:#22c55e;background:#22c55e26;border:1px solid #22c55e4d;border-radius:20px;align-items:center;gap:.5rem;padding:.35rem .75rem;font-size:.75rem;display:flex}.live-dot.jsx-b7934ff5881c1ed3{background:#22c55e;border-radius:50%;width:8px;height:8px;animation:2s infinite pulse}@keyframes pulse{0%,to{opacity:1;box-shadow:0 0 #22c55e66}50%{opacity:.8;box-shadow:0 0 0 6px #22c55e00}}.burns-summary.jsx-b7934ff5881c1ed3{grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;display:grid}.burn-stat.jsx-b7934ff5881c1ed3{background:#87cefa08;border:1px solid #87cefa1a;border-radius:12px;align-items:center;gap:1rem;padding:1.25rem;display:flex}.burn-stat.main.jsx-b7934ff5881c1ed3{background:linear-gradient(135deg,#d2691e33,#8b5a2b26);border-color:#d2691e59}.burn-stat-icon.jsx-b7934ff5881c1ed3{font-size:1.5rem}.burn-stat-info.jsx-b7934ff5881c1ed3{flex-direction:column;display:flex}.burn-stat-value.jsx-b7934ff5881c1ed3{color:#fff;font-size:1.25rem;font-weight:700}.burn-stat.main.jsx-b7934ff5881c1ed3 .burn-stat-value.jsx-b7934ff5881c1ed3{color:#d2691e}.burn-stat-label.jsx-b7934ff5881c1ed3{color:#87cefa80;text-transform:uppercase;letter-spacing:.05em;font-size:.7rem}.burns-list.jsx-b7934ff5881c1ed3{border-top:1px solid #87cefa1a;padding-top:1rem}.burns-list-title.jsx-b7934ff5881c1ed3{color:#87cefa80;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .75rem;font-size:.8rem;font-weight:500}.burn-row.jsx-b7934ff5881c1ed3{background:#d2691e14;border-left:3px solid #d2691e;border-radius:8px;justify-content:space-between;align-items:center;margin-bottom:.5rem;padding:.75rem 1rem;display:flex}.burn-left.jsx-b7934ff5881c1ed3{align-items:center;gap:.75rem;display:flex}.burn-icon.jsx-b7934ff5881c1ed3{font-size:1rem}.burn-details.jsx-b7934ff5881c1ed3{flex-direction:column;display:flex}.burn-amount.jsx-b7934ff5881c1ed3{color:#d2691e;font-weight:600}.burn-date.jsx-b7934ff5881c1ed3{color:#87cefa80;font-size:.7rem}.burn-tx-link.jsx-b7934ff5881c1ed3{color:#87ceeb;background:#87cefa1a;border-radius:6px;padding:.35rem .75rem;font-size:.75rem;text-decoration:none;transition:all .2s}.burn-tx-link.jsx-b7934ff5881c1ed3:hover{background:#87cefa33}.no-burns.jsx-b7934ff5881c1ed3{text-align:center;color:#87cefa80;padding:2rem}.movements-section.jsx-b7934ff5881c1ed3{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#87cefa08;border:1px solid #87cefa1f;border-radius:16px;margin-bottom:1.5rem;padding:1.5rem}.transparent-badge.jsx-b7934ff5881c1ed3{color:#87ceeb;background:#87cefa26;border:1px solid #87cefa4d;border-radius:20px;padding:.35rem .75rem;font-size:.75rem}.movements-desc.jsx-b7934ff5881c1ed3{color:#87cefa80;margin:0 0 1rem;font-size:.85rem}.movements-list.jsx-b7934ff5881c1ed3{flex-direction:column;gap:.5rem;display:flex}.movement-row.jsx-b7934ff5881c1ed3{background:#87cefa08;border-left:3px solid #87cefa33;border-radius:10px;justify-content:space-between;align-items:center;padding:1rem;display:flex}.movement-row.in.jsx-b7934ff5881c1ed3{background:#22c55e14;border-left-color:#22c55e}.movement-row.out.jsx-b7934ff5881c1ed3{background:#ef444414;border-left-color:#ef4444}.movement-row.burn.jsx-b7934ff5881c1ed3{background:#d2691e14;border-left-color:#d2691e}.movement-left.jsx-b7934ff5881c1ed3{align-items:center;gap:.75rem;display:flex}.movement-type-badge.jsx-b7934ff5881c1ed3{background:#87cefa1a;border-radius:50%;justify-content:center;align-items:center;width:32px;height:32px;font-size:.9rem;display:flex}.movement-type-badge.in.jsx-b7934ff5881c1ed3{background:#22c55e33}.movement-type-badge.out.jsx-b7934ff5881c1ed3{background:#ef444433}.movement-type-badge.burn.jsx-b7934ff5881c1ed3{background:#d2691e33}.movement-details.jsx-b7934ff5881c1ed3{flex-direction:column;display:flex}.movement-concept.jsx-b7934ff5881c1ed3{color:#fff;font-size:.9rem;font-weight:500}.movement-date.jsx-b7934ff5881c1ed3{color:#87cefa80;font-size:.7rem}.movement-right.jsx-b7934ff5881c1ed3{align-items:center;gap:1rem;display:flex}.movement-amount.jsx-b7934ff5881c1ed3{font-size:.95rem;font-weight:600}.movement-amount.in.jsx-b7934ff5881c1ed3{color:#22c55e}.movement-amount.out.jsx-b7934ff5881c1ed3{color:#ef4444}.movement-amount.burn.jsx-b7934ff5881c1ed3{color:#d2691e}.movement-tx-link.jsx-b7934ff5881c1ed3{color:#87ceeb;font-size:.75rem;text-decoration:none}.movement-tx-link.jsx-b7934ff5881c1ed3:hover{text-decoration:underline}.links-section.jsx-b7934ff5881c1ed3{justify-content:center;gap:1rem;display:flex}.link-icon-btn.jsx-b7934ff5881c1ed3{color:#ffffffb3;background:#87cefa0d;border:1px solid #87cefa26;border-radius:50%;justify-content:center;align-items:center;width:50px;height:50px;text-decoration:none;transition:all .2s;display:flex}.link-icon-btn.jsx-b7934ff5881c1ed3:hover{color:#fff;background:#87cefa1f;border-color:#87cefa4d;transform:translateY(-2px)}@media (width<=768px){.hero-title.jsx-b7934ff5881c1ed3{font-size:2.5rem}.hero-stats.jsx-b7934ff5881c1ed3{grid-template-columns:repeat(2,1fr)}.burns-summary.jsx-b7934ff5881c1ed3{grid-template-columns:1fr}.videos-gallery.jsx-b7934ff5881c1ed3{grid-template-columns:repeat(3,1fr);gap:.5rem}.movement-row.jsx-b7934ff5881c1ed3{flex-direction:column;align-items:flex-start;gap:.75rem}.movement-right.jsx-b7934ff5881c1ed3{justify-content:space-between;width:100%}.timer-value.jsx-b7934ff5881c1ed3{font-size:1.5rem}.lore-section.jsx-b7934ff5881c1ed3{padding:1.5rem}.lore-header.jsx-b7934ff5881c1ed3 h3.jsx-b7934ff5881c1ed3{font-size:1.4rem}.lore-equation.jsx-b7934ff5881c1ed3{gap:.5rem;padding:1rem}.lore-token.jsx-b7934ff5881c1ed3{padding:.75rem 1rem}.token-icon.jsx-b7934ff5881c1ed3{font-size:1.5rem}.token-name.jsx-b7934ff5881c1ed3{font-size:.75rem}.lore-plus.jsx-b7934ff5881c1ed3,.lore-equals.jsx-b7934ff5881c1ed3{font-size:1.2rem}.lore-answer.jsx-b7934ff5881c1ed3{font-size:1.1rem}}@media (width<=480px){.hero-title.jsx-b7934ff5881c1ed3{font-size:2rem}.hero-subtitle.jsx-b7934ff5881c1ed3{font-size:1rem}.ca-button.jsx-b7934ff5881c1ed3{flex-direction:column;gap:.5rem;width:100%}.ca-button.jsx-b7934ff5881c1ed3 code.jsx-b7934ff5881c1ed3{font-size:.7rem}.main.jsx-b7934ff5881c1ed3{padding:1rem}.hero.jsx-b7934ff5881c1ed3{padding:2rem 0}.hero-stat-value.jsx-b7934ff5881c1ed3{font-size:1.25rem}.timer-box.jsx-b7934ff5881c1ed3{padding:1rem 1.5rem}}",
          }),
        ],
      });
    }
    e.s(["default", () => o]);
  },
]);
