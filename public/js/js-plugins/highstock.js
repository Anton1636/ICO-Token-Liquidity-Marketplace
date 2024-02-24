/*
 Highstock JS v6.1.4 (2018-09-25)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(P, J) {
    "object" === typeof module && module.exports ? module.exports = P.document ? J(P) : J : "function" === typeof define && define.amd ? define(function() {
        return J(P)
    }) : P.Highcharts = J(P)
})("undefined" !== typeof window ? window : this, function(P) {
    var J = function() {
        var a = "undefined" === typeof P ? window : P,
            E = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            G = E && E.createElementNS && !!E.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            q = /(edge|msie|trident)/i.test(F) && !a.opera,
            l = -1 !== F.indexOf("Firefox"),
            f = -1 !== F.indexOf("Chrome"),
            u = l && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "6.1.4",
            deg2rad: 2 * Math.PI / 360,
            doc: E,
            hasBidiBug: u,
            hasTouch: E && void 0 !== E.documentElement.ontouchstart,
            isMS: q,
            isWebKit: -1 !== F.indexOf("AppleWebKit"),
            isFirefox: l,
            isChrome: f,
            isSafari: !f && -1 !== F.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: G,
            win: a,
            marginNames: ["plotTop",
                "marginRight", "marginBottom", "plotLeft"
            ],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        a.timers = [];
        var E = a.charts,
            F = a.doc,
            G = a.win;
        a.error = function(q, l) {
            q = a.isNumber(q) ? "Highcharts error #" + q + ": www.highcharts.com/errors/" + q : q;
            if (l) throw Error(q);
            G.console && console.log(q)
        };
        a.Fx = function(a, l, f) {
            this.options = l;
            this.elem = a;
            this.prop = f
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    l = this.paths[1],
                    f = [],
                    u = this.now,
                    C = a.length,
                    r;
                if (1 === u) f = this.toD;
                else if (C === l.length && 1 > u)
                    for (; C--;) r = parseFloat(a[C]),
                        f[C] = isNaN(r) ? l[C] : u * parseFloat(l[C] - r) + r;
                else f = l;
                this.elem.attr("d", f, null, !0)
            },
            update: function() {
                var a = this.elem,
                    l = this.prop,
                    f = this.now,
                    u = this.options.step;
                if (this[l + "Setter"]) this[l + "Setter"]();
                else a.attr ? a.element && a.attr(l, f, null, !0) : a.style[l] = f + this.unit;
                u && u.call(a, f, this)
            },
            run: function(q, l, f) {
                var u = this,
                    C = u.options,
                    r = function(a) {
                        return r.stopped ? !1 : u.step(a)
                    },
                    y = G.requestAnimationFrame || function(a) {
                        setTimeout(a, 13)
                    },
                    p = function() {
                        for (var d = 0; d < a.timers.length; d++) a.timers[d]() || a.timers.splice(d--,
                            1);
                        a.timers.length && y(p)
                    };
                q !== l || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = q, this.end = l, this.unit = f, this.now = this.start, this.pos = 0, r.elem = this.elem, r.prop = this.prop, r() && 1 === a.timers.push(r) && y(p)) : (delete C.curAnim[this.prop], C.complete && 0 === a.keys(C.curAnim).length && C.complete.call(this.elem))
            },
            step: function(q) {
                var l = +new Date,
                    f, u = this.options,
                    C = this.elem,
                    r = u.complete,
                    y = u.duration,
                    p = u.curAnim;
                C.attr && !C.element ? q = !1 : q || l >= y + this.startTime ? (this.now = this.end, this.pos =
                    1, this.update(), f = p[this.prop] = !0, a.objectEach(p, function(a) {
                        !0 !== a && (f = !1)
                    }), f && r && r.call(C), q = !1) : (this.pos = u.easing((l - this.startTime) / y), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0);
                return q
            },
            initPath: function(q, l, f) {
                function u(a) {
                    var b, d;
                    for (c = a.length; c--;) b = "M" === a[c] || "L" === a[c], d = /[a-zA-Z]/.test(a[c + 3]), b && d && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2])
                }

                function C(a, b) {
                    for (; a.length < m;) {
                        a[0] = b[m - a.length];
                        var d = a.slice(0, g);
                        [].splice.apply(a, [0, 0].concat(d));
                        x && (d =
                            a.slice(a.length - g), [].splice.apply(a, [a.length, 0].concat(d)), c--)
                    }
                    a[0] = "M"
                }

                function r(a, c) {
                    for (var d = (m - a.length) / g; 0 < d && d--;) b = a.slice().splice(a.length / B - g, g * B), b[0] = c[m - g - d * g], e && (b[g - 6] = b[g - 2], b[g - 5] = b[g - 1]), [].splice.apply(a, [a.length / B, 0].concat(b)), x && d--
                }
                l = l || "";
                var y, p = q.startX,
                    d = q.endX,
                    e = -1 < l.indexOf("C"),
                    g = e ? 7 : 3,
                    m, b, c;
                l = l.split(" ");
                f = f.slice();
                var x = q.isArea,
                    B = x ? 2 : 1,
                    t;
                e && (u(l), u(f));
                if (p && d) {
                    for (c = 0; c < p.length; c++)
                        if (p[c] === d[0]) {
                            y = c;
                            break
                        } else if (p[0] === d[d.length - p.length + c]) {
                        y = c;
                        t = !0;
                        break
                    }
                    void 0 === y && (l = [])
                }
                l.length && a.isNumber(y) && (m = f.length + y * B * g, t ? (C(l, f), r(f, l)) : (C(f, l), r(l, f)));
                return [l, f]
            },
            fillSetter: function() {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            },
            strokeSetter: function() {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function() {
            var q, l = arguments,
                f, u = {},
                C = function(f, y) {
                    "object" !== typeof f && (f = {});
                    a.objectEach(y, function(p, d) {
                        !a.isObject(p, !0) || a.isClass(p) || a.isDOMElement(p) ? f[d] = y[d] : f[d] = C(f[d] || {},
                            p)
                    });
                    return f
                };
            !0 === l[0] && (u = l[1], l = Array.prototype.slice.call(l, 2));
            f = l.length;
            for (q = 0; q < f; q++) u = C(u, l[q]);
            return u
        };
        a.pInt = function(a, l) {
            return parseInt(a, l || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(q, l) {
            return !!q && "object" === typeof q && (!l || !a.isArray(q))
        };
        a.isDOMElement = function(q) {
            return a.isObject(q) && "number" === typeof q.nodeType
        };
        a.isClass = function(q) {
            var l =
                q && q.constructor;
            return !(!a.isObject(q, !0) || a.isDOMElement(q) || !l || !l.name || "Object" === l.name)
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function(a, l) {
            for (var f = a.length; f--;)
                if (a[f] === l) {
                    a.splice(f, 1);
                    break
                }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(q, l, f) {
            var u;
            a.isString(l) ? a.defined(f) ? q.setAttribute(l, f) : q && q.getAttribute && ((u = q.getAttribute(l)) || "class" !== l || (u = q.getAttribute(l + "Name"))) : a.defined(l) && a.isObject(l) &&
                a.objectEach(l, function(a, f) {
                    q.setAttribute(f, a)
                });
            return u
        };
        a.splat = function(q) {
            return a.isArray(q) ? q : [q]
        };
        a.syncTimeout = function(a, l, f) {
            if (l) return setTimeout(a, l, f);
            a.call(0, f)
        };
        a.clearTimeout = function(q) {
            a.defined(q) && clearTimeout(q)
        };
        a.extend = function(a, l) {
            var f;
            a || (a = {});
            for (f in l) a[f] = l[f];
            return a
        };
        a.pick = function() {
            var a = arguments,
                l, f, u = a.length;
            for (l = 0; l < u; l++)
                if (f = a[l], void 0 !== f && null !== f) return f
        };
        a.css = function(q, l) {
            a.isMS && !a.svg && l && void 0 !== l.opacity && (l.filter = "alpha(opacity\x3d" +
                100 * l.opacity + ")");
            a.extend(q.style, l)
        };
        a.createElement = function(q, l, f, u, C) {
            q = F.createElement(q);
            var r = a.css;
            l && a.extend(q, l);
            C && r(q, {
                padding: 0,
                border: "none",
                margin: 0
            });
            f && r(q, f);
            u && u.appendChild(q);
            return q
        };
        a.extendClass = function(q, l) {
            var f = function() {};
            f.prototype = new q;
            a.extend(f.prototype, l);
            return f
        };
        a.pad = function(a, l, f) {
            return Array((l || 2) + 1 - String(a).replace("-", "").length).join(f || 0) + a
        };
        a.relativeLength = function(a, l, f) {
            return /%$/.test(a) ? l * parseFloat(a) / 100 + (f || 0) : parseFloat(a)
        };
        a.wrap =
            function(a, l, f) {
                var u = a[l];
                a[l] = function() {
                    var a = Array.prototype.slice.call(arguments),
                        r = arguments,
                        y = this;
                    y.proceed = function() {
                        u.apply(y, arguments.length ? arguments : r)
                    };
                    a.unshift(u);
                    a = f.apply(this, a);
                    y.proceed = null;
                    return a
                }
            };
        a.formatSingle = function(q, l, f) {
            var u = /\.([0-9])/,
                C = a.defaultOptions.lang;
            /f$/.test(q) ? (f = (f = q.match(u)) ? f[1] : -1, null !== l && (l = a.numberFormat(l, f, C.decimalPoint, -1 < q.indexOf(",") ? C.thousandsSep : ""))) : l = (f || a.time).dateFormat(q, l);
            return l
        };
        a.format = function(q, l, f) {
            for (var u = "{",
                    C = !1, r, y, p, d, e = [], g; q;) {
                u = q.indexOf(u);
                if (-1 === u) break;
                r = q.slice(0, u);
                if (C) {
                    r = r.split(":");
                    y = r.shift().split(".");
                    d = y.length;
                    g = l;
                    for (p = 0; p < d; p++) g && (g = g[y[p]]);
                    r.length && (g = a.formatSingle(r.join(":"), g, f));
                    e.push(g)
                } else e.push(r);
                q = q.slice(u + 1);
                u = (C = !C) ? "}" : "{"
            }
            e.push(q);
            return e.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(q, l, f, u, C) {
            var r, y = q;
            f = a.pick(f, 1);
            r = q / f;
            l || (l = C ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === u && (1 === f ? l = a.grep(l, function(a) {
                return 0 === a % 1
            }) : .1 >= f && (l = [1 / f])));
            for (u = 0; u < l.length && !(y = l[u], C && y * f >= q || !C && r <= (l[u] + (l[u + 1] || l[u])) / 2); u++);
            return y = a.correctFloat(y * f, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, l) {
            var f = a.length,
                u, C;
            for (C = 0; C < f; C++) a[C].safeI = C;
            a.sort(function(a, f) {
                u = l(a, f);
                return 0 === u ? a.safeI - f.safeI : u
            });
            for (C = 0; C < f; C++) delete a[C].safeI
        };
        a.arrayMin = function(a) {
            for (var l = a.length, f = a[0]; l--;) a[l] < f && (f = a[l]);
            return f
        };
        a.arrayMax = function(a) {
            for (var l =
                    a.length, f = a[0]; l--;) a[l] > f && (f = a[l]);
            return f
        };
        a.destroyObjectProperties = function(q, l) {
            a.objectEach(q, function(a, u) {
                a && a !== l && a.destroy && a.destroy();
                delete q[u]
            })
        };
        a.discardElement = function(q) {
            var l = a.garbageBin;
            l || (l = a.createElement("div"));
            q && l.appendChild(q);
            l.innerHTML = ""
        };
        a.correctFloat = function(a, l) {
            return parseFloat(a.toPrecision(l || 14))
        };
        a.setAnimation = function(q, l) {
            l.renderer.globalAnimation = a.pick(q, l.options.chart.animation, !0)
        };
        a.animObject = function(q) {
            return a.isObject(q) ? a.merge(q) : {
                duration: q ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(q, l, f, u) {
            q = +q || 0;
            l = +l;
            var C = a.defaultOptions.lang,
                r = (q.toString().split(".")[1] || "").split("e")[0].length,
                y, p, d = q.toString().split("e"); - 1 === l ? l = Math.min(r, 20) : a.isNumber(l) ? l && d[1] && 0 > d[1] && (y = l + +d[1], 0 <= y ? (d[0] = (+d[0]).toExponential(y).split("e")[0], l = y) : (d[0] = d[0].split(".")[0] || 0, q = 20 > l ? (d[0] * Math.pow(10, d[1])).toFixed(l) : 0, d[1] = 0)) : l = 2;
            p = (Math.abs(d[1] ?
                d[0] : q) + Math.pow(10, -Math.max(l, r) - 1)).toFixed(l);
            r = String(a.pInt(p));
            y = 3 < r.length ? r.length % 3 : 0;
            f = a.pick(f, C.decimalPoint);
            u = a.pick(u, C.thousandsSep);
            q = (0 > q ? "-" : "") + (y ? r.substr(0, y) + u : "");
            q += r.substr(y).replace(/(\d{3})(?=\d)/g, "$1" + u);
            l && (q += f + p.slice(-l));
            d[1] && 0 !== +q && (q += "e" + d[1]);
            return q
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(q, l, f) {
            if ("width" === l) return Math.max(0, Math.min(q.offsetWidth, q.scrollWidth) - a.getStyle(q, "padding-left") - a.getStyle(q,
                "padding-right"));
            if ("height" === l) return Math.max(0, Math.min(q.offsetHeight, q.scrollHeight) - a.getStyle(q, "padding-top") - a.getStyle(q, "padding-bottom"));
            G.getComputedStyle || a.error(27, !0);
            if (q = G.getComputedStyle(q, void 0)) q = q.getPropertyValue(l), a.pick(f, "opacity" !== l) && (q = a.pInt(q));
            return q
        };
        a.inArray = function(q, l, f) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(l, q, f)
        };
        a.grep = function(q, l) {
            return (a.filterPolyfill || Array.prototype.filter).call(q, l)
        };
        a.find = Array.prototype.find ? function(a,
            l) {
            return a.find(l)
        } : function(a, l) {
            var f, u = a.length;
            for (f = 0; f < u; f++)
                if (l(a[f], f)) return a[f]
        };
        a.some = function(q, l, f) {
            return (a.somePolyfill || Array.prototype.some).call(q, l, f)
        };
        a.map = function(a, l) {
            for (var f = [], u = 0, C = a.length; u < C; u++) f[u] = l.call(a[u], a[u], u, a);
            return f
        };
        a.keys = function(q) {
            return (a.keysPolyfill || Object.keys).call(void 0, q)
        };
        a.reduce = function(q, l, f) {
            return (a.reducePolyfill || Array.prototype.reduce).apply(q, 2 < arguments.length ? [l, f] : [l])
        };
        a.offset = function(a) {
            var l = F.documentElement;
            a = a.parentElement ||
                a.parentNode ? a.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
            return {
                top: a.top + (G.pageYOffset || l.scrollTop) - (l.clientTop || 0),
                left: a.left + (G.pageXOffset || l.scrollLeft) - (l.clientLeft || 0)
            }
        };
        a.stop = function(q, l) {
            for (var f = a.timers.length; f--;) a.timers[f].elem !== q || l && l !== a.timers[f].prop || (a.timers[f].stopped = !0)
        };
        a.each = function(q, l, f) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(q, l, f)
        };
        a.objectEach = function(a, l, f) {
            for (var u in a) a.hasOwnProperty(u) && l.call(f || a[u], a[u], u, a)
        };
        a.addEvent = function(q,
            l, f, u) {
            var C, r = q.addEventListener || a.addEventListenerPolyfill;
            C = "function" === typeof q && q.prototype ? q.prototype.protoEvents = q.prototype.protoEvents || {} : q.hcEvents = q.hcEvents || {};
            a.Point && q instanceof a.Point && q.series && q.series.chart && (q.series.chart.runTrackerClick = !0);
            r && r.call(q, l, f, !1);
            C[l] || (C[l] = []);
            C[l].push(f);
            u && a.isNumber(u.order) && (f.order = u.order, C[l].sort(function(a, p) {
                return a.order - p.order
            }));
            return function() {
                a.removeEvent(q, l, f)
            }
        };
        a.removeEvent = function(q, l, f) {
            function u(p, d) {
                var e =
                    q.removeEventListener || a.removeEventListenerPolyfill;
                e && e.call(q, p, d, !1)
            }

            function C(p) {
                var d, e;
                q.nodeName && (l ? (d = {}, d[l] = !0) : d = p, a.objectEach(d, function(a, d) {
                    if (p[d])
                        for (e = p[d].length; e--;) u(d, p[d][e])
                }))
            }
            var r, y;
            a.each(["protoEvents", "hcEvents"], function(p) {
                var d = q[p];
                d && (l ? (r = d[l] || [], f ? (y = a.inArray(f, r), -1 < y && (r.splice(y, 1), d[l] = r), u(l, f)) : (C(d), d[l] = [])) : (C(d), q[p] = {}))
            })
        };
        a.fireEvent = function(q, l, f, u) {
            var C, r, y, p, d;
            f = f || {};
            F.createEvent && (q.dispatchEvent || q.fireEvent) ? (C = F.createEvent("Events"),
                C.initEvent(l, !0, !0), a.extend(C, f), q.dispatchEvent ? q.dispatchEvent(C) : q.fireEvent(l, C)) : a.each(["protoEvents", "hcEvents"], function(e) {
                if (q[e])
                    for (r = q[e][l] || [], y = r.length, f.target || a.extend(f, {
                            preventDefault: function() {
                                f.defaultPrevented = !0
                            },
                            target: q,
                            type: l
                        }), p = 0; p < y; p++)(d = r[p]) && !1 === d.call(q, f) && f.preventDefault()
            });
            u && !f.defaultPrevented && u.call(q, f)
        };
        a.animate = function(q, l, f) {
            var u, C = "",
                r, y, p;
            a.isObject(f) || (p = arguments, f = {
                duration: p[2],
                easing: p[3],
                complete: p[4]
            });
            a.isNumber(f.duration) || (f.duration =
                400);
            f.easing = "function" === typeof f.easing ? f.easing : Math[f.easing] || Math.easeInOutSine;
            f.curAnim = a.merge(l);
            a.objectEach(l, function(d, e) {
                a.stop(q, e);
                y = new a.Fx(q, f, e);
                r = null;
                "d" === e ? (y.paths = y.initPath(q, q.d, l.d), y.toD = l.d, u = 0, r = 1) : q.attr ? u = q.attr(e) : (u = parseFloat(a.getStyle(q, e)) || 0, "opacity" !== e && (C = "px"));
                r || (r = d);
                r && r.match && r.match("px") && (r = r.replace(/px/g, ""));
                y.run(u, r, C)
            })
        };
        a.seriesType = function(q, l, f, u, C) {
            var r = a.getOptions(),
                y = a.seriesTypes;
            r.plotOptions[q] = a.merge(r.plotOptions[l], f);
            y[q] = a.extendClass(y[l] || function() {}, u);
            y[q].prototype.type = q;
            C && (y[q].prototype.pointClass = a.extendClass(a.Point, C));
            return y[q]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                l = 0;
            return function() {
                return "highcharts-" + a + "-" + l++
            }
        }();
        G.jQuery && (G.jQuery.fn.highcharts = function() {
            var q = [].slice.call(arguments);
            if (this[0]) return q[0] ? (new(a[a.isString(q[0]) ? q.shift() : "Chart"])(this[0], q[0], q[1]), this) : E[a.attr(this[0], "data-highcharts-chart")]
        })
    })(J);
    (function(a) {
        var E = a.each,
            F = a.isNumber,
            G = a.map,
            q = a.merge,
            l = a.pInt;
        a.Color = function(f) {
            if (!(this instanceof a.Color)) return new a.Color(f);
            this.init(f)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [l(a[1]), l(a[2]), l(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [l(a[1]), l(a[2]), l(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(f) {
                var l,
                    C, r, y;
                if ((this.input = f = this.names[f && f.toLowerCase ? f.toLowerCase() : ""] || f) && f.stops) this.stops = G(f.stops, function(p) {
                    return new a.Color(p[1])
                });
                else if (f && f.charAt && "#" === f.charAt() && (l = f.length, f = parseInt(f.substr(1), 16), 7 === l ? C = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1] : 4 === l && (C = [(f & 3840) >> 4 | (f & 3840) >> 8, (f & 240) >> 4 | f & 240, (f & 15) << 4 | f & 15, 1])), !C)
                    for (r = this.parsers.length; r-- && !C;) y = this.parsers[r], (l = y.regex.exec(f)) && (C = y.parse(l));
                this.rgba = C || []
            },
            get: function(a) {
                var f = this.input,
                    l = this.rgba,
                    r;
                this.stops ?
                    (r = q(f), r.stops = [].concat(r.stops), E(this.stops, function(f, p) {
                        r.stops[p] = [r.stops[p][0], f.get(a)]
                    })) : r = l && F(l[0]) ? "rgb" === a || !a && 1 === l[3] ? "rgb(" + l[0] + "," + l[1] + "," + l[2] + ")" : "a" === a ? l[3] : "rgba(" + l.join(",") + ")" : f;
                return r
            },
            brighten: function(a) {
                var f, C = this.rgba;
                if (this.stops) E(this.stops, function(f) {
                    f.brighten(a)
                });
                else if (F(a) && 0 !== a)
                    for (f = 0; 3 > f; f++) C[f] += l(255 * a), 0 > C[f] && (C[f] = 0), 255 < C[f] && (C[f] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function(a, l) {
                var f = this.rgba,
                    r = a.rgba;
                r.length && f && f.length ? (a = 1 !== r[3] || 1 !== f[3], l = (a ? "rgba(" : "rgb(") + Math.round(r[0] + (f[0] - r[0]) * (1 - l)) + "," + Math.round(r[1] + (f[1] - r[1]) * (1 - l)) + "," + Math.round(r[2] + (f[2] - r[2]) * (1 - l)) + (a ? "," + (r[3] + (f[3] - r[3]) * (1 - l)) : "") + ")") : l = a.input || "none";
                return l
            }
        };
        a.color = function(f) {
            return new a.Color(f)
        }
    })(J);
    (function(a) {
        var E, F, G = a.addEvent,
            q = a.animate,
            l = a.attr,
            f = a.charts,
            u = a.color,
            C = a.css,
            r = a.createElement,
            y = a.defined,
            p = a.deg2rad,
            d = a.destroyObjectProperties,
            e = a.doc,
            g = a.each,
            m = a.extend,
            b = a.erase,
            c = a.grep,
            x = a.hasTouch,
            B = a.inArray,
            t = a.isArray,
            n = a.isFirefox,
            L = a.isMS,
            z = a.isObject,
            D = a.isString,
            h = a.isWebKit,
            I = a.merge,
            H = a.noop,
            v = a.objectEach,
            w = a.pick,
            k = a.pInt,
            A = a.removeEvent,
            Q = a.stop,
            T = a.svg,
            K = a.SVG_NS,
            O = a.symbolSizes,
            N = a.win;
        E = a.SVGElement = function() {
            return this
        };
        m(E.prototype, {
            opacity: 1,
            SVG_NS: K,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(a, b) {
                this.element = "span" === b ? r(b) : e.createElementNS(this.SVG_NS,
                    b);
                this.renderer = a
            },
            animate: function(b, k, c) {
                k = a.animObject(w(k, this.renderer.globalAnimation, !0));
                0 !== k.duration ? (c && (k.complete = c), q(this, b, k)) : (this.attr(b, null, c), k.step && k.step.call(this));
                return this
            },
            complexColor: function(b, k, c) {
                var M = this.renderer,
                    A, d, h, m, K, w, e, x, n, B, z, D = [],
                    H;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    b.radialGradient ? d = "radialGradient" : b.linearGradient && (d = "linearGradient");
                    d && (h = b[d], K = M.gradients, e = b.stops, B = c.radialReference, t(h) && (b[d] = h = {
                        x1: h[0],
                        y1: h[1],
                        x2: h[2],
                        y2: h[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === d && B && !y(h.gradientUnits) && (m = h, h = I(h, M.getRadialAttr(B, m), {
                        gradientUnits: "userSpaceOnUse"
                    })), v(h, function(a, b) {
                        "id" !== b && D.push(b, a)
                    }), v(e, function(a) {
                        D.push(a)
                    }), D = D.join(","), K[D] ? z = K[D].attr("id") : (h.id = z = a.uniqueKey(), K[D] = w = M.createElement(d).attr(h).add(M.defs), w.radAttr = m, w.stops = [], g(e, function(b) {
                        0 === b[1].indexOf("rgba") ? (A = a.color(b[1]), x = A.get("rgb"), n = A.get("a")) : (x = b[1], n = 1);
                        b = M.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": x,
                            "stop-opacity": n
                        }).add(w);
                        w.stops.push(b)
                    })), H = "url(" + M.url + "#" + z + ")", c.setAttribute(k, H), c.gradient = D, b.toString = function() {
                        return H
                    })
                })
            },
            applyTextOutline: function(k) {
                var c = this.element,
                    M, A, d, h, m; - 1 !== k.indexOf("contrast") && (k = k.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                k = k.split(" ");
                A = k[k.length - 1];
                if ((d = k[0]) && "none" !== d && a.svg) {
                    this.fakeTS = !0;
                    k = [].slice.call(c.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    d = d.replace(/(^[\d\.]+)(.*?)$/g, function(a,
                        b, k) {
                        return 2 * b + k
                    });
                    for (m = k.length; m--;) M = k[m], "highcharts-text-outline" === M.getAttribute("class") && b(k, c.removeChild(M));
                    h = c.firstChild;
                    g(k, function(a, b) {
                        0 === b && (a.setAttribute("x", c.getAttribute("x")), b = c.getAttribute("y"), a.setAttribute("y", b || 0), null === b && c.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        l(a, {
                            "class": "highcharts-text-outline",
                            fill: A,
                            stroke: A,
                            "stroke-width": d,
                            "stroke-linejoin": "round"
                        });
                        c.insertBefore(a, h)
                    })
                }
            },
            attr: function(a, b, k, c) {
                var M, A = this.element,
                    d, h = this,
                    m, K;
                "string" === typeof a &&
                    void 0 !== b && (M = a, a = {}, a[M] = b);
                "string" === typeof a ? h = (this[a + "Getter"] || this._defaultGetter).call(this, a, A) : (v(a, function(b, k) {
                    m = !1;
                    c || Q(this, k);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(k) && (d || (this.symbolAttr(a), d = !0), m = !0);
                    !this.rotation || "x" !== k && "y" !== k || (this.doTransform = !0);
                    m || (K = this[k + "Setter"] || this._defaultSetter, K.call(this, b, k, A), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(k) && this.updateShadows(k, b, K))
                }, this), this.afterSetters());
                k && k.call(this);
                return h
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a, b, k) {
                for (var c = this.shadows, M = c.length; M--;) k.call(c[M], "height" === a ? Math.max(b - (c[M].cutHeight || 0), 0) : "d" === a ? this.d : b, a, c[M])
            },
            addClass: function(a, b) {
                var k = this.attr("class") || ""; - 1 === k.indexOf(a) && (b || (a = (k + (k ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== B(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function(a) {
                return this.attr("class",
                    (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var b = this;
                g("x y r start end width height innerR anchorX anchorY".split(" "), function(k) {
                    b[k] = w(a[k], b[k])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, b) {
                var k;
                b = b || a.strokeWidth || 0;
                k = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + k;
                a.y = Math.floor(a.y || this.y || 0) + k;
                a.width = Math.floor((a.width ||
                    this.width || 0) - 2 * k);
                a.height = Math.floor((a.height || this.height || 0) - 2 * k);
                y(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function(a) {
                var b = this.styles,
                    c = {},
                    A = this.element,
                    d, M = "",
                    h, K = !b,
                    w = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && v(a, function(a, k) {
                    a !== b[k] && (c[k] = a, K = !0)
                });
                K && (b && (a = m(b, c)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === A.nodeName.toLowerCase() && a.width && (d = this.textWidth = k(a.width))), this.styles = a, d && !T && this.renderer.forExport &&
                    delete a.width, A.namespaceURI === this.SVG_NS ? (h = function(a, b) {
                        return "-" + b.toLowerCase()
                    }, v(a, function(a, b) {
                        -1 === B(b, w) && (M += b.replace(/([A-Z])/g, h) + ":" + a + ";")
                    }), M && l(A, "style", M)) : C(A, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, b) {
                var k = this,
                    c = k.element;
                x && "click" === a ? (c.ontouchstart = function(a) {
                    k.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(c, a)
                }, c.onclick = function(a) {
                    (-1 === N.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (k.touchEventFired || 0)) && b.call(c, a)
                }) : c["on" + a] = b;
                return this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function(a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    b = this.translateY || 0,
                    k = this.scaleX,
                    c = this.scaleY,
                    A = this.inverted,
                    d = this.rotation,
                    h = this.matrix,
                    m = this.element;
                A && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                y(h) && a.push("matrix(" + h.join(",") + ")");
                A ? a.push("rotate(90) scale(-1,1)") : d && a.push("rotate(" + d + " " + w(this.rotationOriginX, m.getAttribute("x"), 0) + " " + w(this.rotationOriginY, m.getAttribute("y") || 0) + ")");
                (y(k) || y(c)) && a.push("scale(" + w(k, 1) + " " + w(c, 1) + ")");
                a.length && m.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, k, c) {
                var A, d, h, M, m = {};
                d = this.renderer;
                h = d.alignedObjects;
                var K, v;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !c || D(c)) this.alignTo = A = c || "renderer", b(h, this), h.push(this), c = null
                } else a = this.alignOptions, k = this.alignByTranslate, A = this.alignTo;
                c = w(c, d[A], d);
                A = a.align;
                d = a.verticalAlign;
                h = (c.x || 0) + (a.x || 0);
                M = (c.y || 0) + (a.y || 0);
                "right" === A ? K = 1 : "center" === A && (K = 2);
                K && (h += (c.width - (a.width || 0)) / K);
                m[k ? "translateX" : "x"] = Math.round(h);
                "bottom" === d ? v = 1 : "middle" === d && (v = 2);
                v && (M += (c.height - (a.height || 0)) / v);
                m[k ? "translateY" : "y"] = Math.round(M);
                this[this.placed ? "animate" : "attr"](m);
                this.placed = !0;
                this.alignAttr = m;
                return this
            },
            getBBox: function(a, b) {
                var k, c = this.renderer,
                    A, d = this.element,
                    h = this.styles,
                    M, K = this.textStr,
                    v, e = c.cache,
                    x = c.cacheKeys,
                    n;
                b = w(b, this.rotation);
                A = b * p;
                M = h && h.fontSize;
                y(K) && (n = K.toString(), -1 === n.indexOf("\x3c") && (n = n.replace(/[0-9]/g, "0")), n += ["", b || 0, M, this.textWidth, h && h.textOverflow].join());
                n && !a && (k = e[n]);
                if (!k) {
                    if (d.namespaceURI ===
                        this.SVG_NS || c.forExport) {
                        try {
                            (v = this.fakeTS && function(a) {
                                g(d.querySelectorAll(".highcharts-text-outline"), function(b) {
                                    b.style.display = a
                                })
                            }) && v("none"), k = d.getBBox ? m({}, d.getBBox()) : {
                                width: d.offsetWidth,
                                height: d.offsetHeight
                            }, v && v("")
                        } catch (U) {}
                        if (!k || 0 > k.width) k = {
                            width: 0,
                            height: 0
                        }
                    } else k = this.htmlGetBBox();
                    c.isSVG && (a = k.width, c = k.height, h && "11px" === h.fontSize && 17 === Math.round(c) && (k.height = c = 14), b && (k.width = Math.abs(c * Math.sin(A)) + Math.abs(a * Math.cos(A)), k.height = Math.abs(c * Math.cos(A)) + Math.abs(a *
                        Math.sin(A))));
                    if (n && 0 < k.height) {
                        for (; 250 < x.length;) delete e[x.shift()];
                        e[n] || x.push(n);
                        e[n] = k
                    }
                }
                return k
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var b = this.renderer,
                    k = this.element,
                    c;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) c = this.zIndexSetter();
                c || (a ? a.element : b.box).appendChild(k);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    k = a.element || {},
                    c = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup,
                    A = k.ownerSVGElement,
                    d = a.clipPath;
                k.onclick = k.onmouseout = k.onmouseover = k.onmousemove = k.point = null;
                Q(a);
                d && A && (g(A.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    var b = a.getAttribute("clip-path"),
                        k = d.element.id;
                    (-1 < b.indexOf("(#" + k + ")") || -1 < b.indexOf('("#' + k + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = d.destroy());
                if (a.stops) {
                    for (A = 0; A < a.stops.length; A++) a.stops[A] = a.stops[A].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(k);
                for (a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) k = c.parentGroup, a.safeRemoveChild(c.div), delete c.div, c = k;
                a.alignTo && b(a.renderer.alignedObjects, a);
                v(a, function(b, k) {
                    delete a[k]
                });
                return null
            },
            shadow: function(a, b, k) {
                var c = [],
                    A, d, h = this.element,
                    m, v, K, M;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    v = w(a.width, 3);
                    K = (a.opacity || .15) / v;
                    M = this.parentInverted ? "(-1,-1)" : "(" + w(a.offsetX, 1) + ", " + w(a.offsetY, 1) + ")";
                    for (A = 1; A <= v; A++) d = h.cloneNode(0), m = 2 * v + 1 - 2 * A, l(d, {
                        stroke: a.color || "#000000",
                        "stroke-opacity": K * A,
                        "stroke-width": m,
                        transform: "translate" + M,
                        fill: "none"
                    }), d.setAttribute("class", (d.getAttribute("class") || "") + " highcharts-shadow"), k && (l(d, "height", Math.max(l(d, "height") - m, 0)), d.cutHeight = m), b ? b.element.appendChild(d) : h.parentNode && h.parentNode.insertBefore(d,
                        h), c.push(d);
                    this.shadows = c
                }
                return this
            },
            destroyShadows: function() {
                g(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = w(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, b, k) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) &&
                    (a = "M 0 0");
                this[b] !== a && (k.setAttribute(b, a), this[b] = a)
            },
            dashstyleSetter: function(a) {
                var b, c = this["stroke-width"];
                "inherit" === c && (c = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = k(a[b]) * c;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray",
                        a)
                }
            },
            alignSetter: function(a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, b, k) {
                this[b] = a;
                k.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = e.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(e.createTextNode(String(w(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, b, k) {
                "string" === typeof a ? k.setAttribute(b, a) : a && this.complexColor(a, b, k)
            },
            visibilitySetter: function(a, b, k) {
                "inherit" === a ? k.removeAttribute(b) : this[b] !== a && k.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function(a, b) {
                var c = this.renderer,
                    A = this.parentGroup,
                    d = (A || c).element || c.box,
                    h, m = this.element,
                    v, K, c = d === c.box;
                h = this.added;
                var w;
                y(a) ? (m.setAttribute("data-z-index",
                    a), a = +a, this[b] === a && (h = !1)) : y(this[b]) && m.removeAttribute("data-z-index");
                this[b] = a;
                if (h) {
                    (a = this.zIndex) && A && (A.handleZ = !0);
                    b = d.childNodes;
                    for (w = b.length - 1; 0 <= w && !v; w--)
                        if (A = b[w], h = A.getAttribute("data-z-index"), K = !y(h), A !== m)
                            if (0 > a && K && !c && !w) d.insertBefore(m, b[w]), v = !0;
                            else if (k(h) <= a || K && (!y(a) || 0 <= a)) d.insertBefore(m, b[w + 1] || null), v = !0;
                    v || (d.insertBefore(m, b[c ? 3 : 0] || null), v = !0)
                }
                return v
            },
            _defaultSetter: function(a, b, k) {
                k.setAttribute(b, a)
            }
        });
        E.prototype.yGetter = E.prototype.xGetter;
        E.prototype.translateXSetter =
            E.prototype.translateYSetter = E.prototype.rotationSetter = E.prototype.verticalAlignSetter = E.prototype.rotationOriginXSetter = E.prototype.rotationOriginYSetter = E.prototype.scaleXSetter = E.prototype.scaleYSetter = E.prototype.matrixSetter = function(a, b) {
                this[b] = a;
                this.doTransform = !0
            };
        E.prototype["stroke-widthSetter"] = E.prototype.strokeSetter = function(a, b, k) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (E.prototype.fillSetter.call(this, this.stroke, "stroke", k), k.setAttribute("stroke-width", this["stroke-width"]),
                this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (k.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        m(F.prototype, {
            Element: E,
            SVG_NS: K,
            init: function(a, b, k, c, A, d) {
                var m;
                c = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(c));
                m = c.element;
                a.appendChild(m);
                l(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && l(m, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = m;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (n || h) && e.getElementsByTagName("base").length ? N.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(e.createTextNode("Created with Highstock 6.1.4"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = d;
                this.forExport = A;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, k, !1);
                var v;
                n && a.getBoundingClientRect && (b = function() {
                    C(a, {
                        left: 0,
                        top: 0
                    });
                    v = a.getBoundingClientRect();
                    C(a, {
                        left: Math.ceil(v.left) - v.left + "px",
                        top: Math.ceil(v.top) - v.top + "px"
                    })
                }, b(), this.unSubPixelFix = G(N, "resize", b))
            },
            getStyle: function(a) {
                return this.style = m({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                d(this.gradients || {});
                this.gradients =
                    null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: H,
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            truncate: function(a, b, k, c, A, d, h) {
                var m = this,
                    v = a.rotation,
                    K, w = c ? 1 : 0,
                    n = (k || c).length,
                    g = n,
                    x = [],
                    B = function(a) {
                        b.firstChild && b.removeChild(b.firstChild);
                        a && b.appendChild(e.createTextNode(a))
                    },
                    z = function(d, v) {
                        v = v || d;
                        if (void 0 ===
                            x[v])
                            if (b.getSubStringLength) try {
                                x[v] = A + b.getSubStringLength(0, c ? v + 1 : v)
                            } catch (ga) {} else B(h(k || c, d)), x[v] = A + m.getSpanWidth(a, b);
                        return x[v]
                    },
                    t, D;
                a.rotation = 0;
                t = z(b.textContent.length);
                if (D = A + t > d) {
                    for (; w <= n;) g = Math.ceil((w + n) / 2), c && (K = h(c, g)), t = z(g, K && K.length - 1), w === n ? w = n + 1 : t > d ? n = g - 1 : w = g;
                    0 === n ? B("") : k && n === k.length - 1 || B(K || h(k || c, g))
                }
                c && c.splice(0, g);
                a.actualWidth = t;
                a.rotation = v;
                return D
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function(a) {
                var b =
                    a.element,
                    A = this,
                    d = A.forExport,
                    h = w(a.textStr, "").toString(),
                    m = -1 !== h.indexOf("\x3c"),
                    n = b.childNodes,
                    x, z = l(b, "x"),
                    t = a.styles,
                    D = a.textWidth,
                    H = t && t.lineHeight,
                    Q = t && t.textOutline,
                    p = t && "ellipsis" === t.textOverflow,
                    I = t && "nowrap" === t.whiteSpace,
                    M = t && t.fontSize,
                    O, f, L = n.length,
                    t = D && !a.added && this.box,
                    r = function(a) {
                        var c;
                        c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : M || A.style.fontSize || 12;
                        return H ? k(H) : A.fontMetrics(c, a.getAttribute("style") ? a : b).h
                    },
                    y = function(a, b) {
                        v(A.escapes, function(k, c) {
                            b && -1 !==
                                B(k, b) || (a = a.toString().replace(new RegExp(k, "g"), c))
                        });
                        return a
                    },
                    N = function(a, b) {
                        var k;
                        k = a.indexOf("\x3c");
                        a = a.substring(k, a.indexOf("\x3e") - k);
                        k = a.indexOf(b + "\x3d");
                        if (-1 !== k && (k = k + b.length + 1, b = a.charAt(k), '"' === b || "'" === b)) return a = a.substring(k + 1), a.substring(0, a.indexOf(b))
                    };
                O = [h, p, I, H, Q, M, D].join();
                if (O !== a.textCache) {
                    for (a.textCache = O; L--;) b.removeChild(n[L]);
                    m || Q || p || D || -1 !== h.indexOf(" ") ? (t && t.appendChild(b), h = m ? h.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
                            '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [h], h = c(h, function(a) {
                            return "" !== a
                        }), g(h, function(k, c) {
                            var h, m = 0,
                                v = 0;
                            k = k.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                            h = k.split("|||");
                            g(h, function(k) {
                                if ("" !== k || 1 === h.length) {
                                    var w = {},
                                        n = e.createElementNS(A.SVG_NS, "tspan"),
                                        g, t;
                                    (g = N(k, "class")) && l(n, "class", g);
                                    if (g = N(k, "style")) g = g.replace(/(;| |^)color([ :])/,
                                        "$1fill$2"), l(n, "style", g);
                                    (t = N(k, "href")) && !d && (l(n, "onclick", 'location.href\x3d"' + t + '"'), l(n, "class", "highcharts-anchor"), C(n, {
                                        cursor: "pointer"
                                    }));
                                    k = y(k.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== k) {
                                        n.appendChild(e.createTextNode(k));
                                        m ? w.dx = 0 : c && null !== z && (w.x = z);
                                        l(n, w);
                                        b.appendChild(n);
                                        !m && f && (!T && d && C(n, {
                                            display: "block"
                                        }), l(n, "dy", r(n)));
                                        if (D) {
                                            var B = k.replace(/([^\^])-/g, "$1- ").split(" "),
                                                w = !I && (1 < h.length || c || 1 < B.length);
                                            t = 0;
                                            var H = r(n);
                                            if (p) x = A.truncate(a, n, k, void 0, 0, Math.max(0, D - parseInt(M ||
                                                12, 10)), function(a, b) {
                                                return a.substring(0, b) + "\u2026"
                                            });
                                            else if (w)
                                                for (; B.length;) B.length && !I && 0 < t && (n = e.createElementNS(K, "tspan"), l(n, {
                                                    dy: H,
                                                    x: z
                                                }), g && l(n, "style", g), n.appendChild(e.createTextNode(B.join(" ").replace(/- /g, "-"))), b.appendChild(n)), A.truncate(a, n, null, B, 0 === t ? v : 0, D, function(a, b) {
                                                    return B.slice(0, b).join(" ").replace(/- /g, "-")
                                                }), v = a.actualWidth, t++
                                        }
                                        m++
                                    }
                                }
                            });
                            f = f || b.childNodes.length
                        }), p && x && a.attr("title", y(a.textStr, ["\x26lt;", "\x26gt;"])), t && t.removeChild(b), Q && a.applyTextOutline &&
                        a.applyTextOutline(Q)) : b.appendChild(e.createTextNode(y(h)))
                }
            },
            getContrast: function(a) {
                a = u(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, b, k, c, A, d, h, v, K) {
                var w = this.label(a, b, k, K, null, null, null, null, "button"),
                    e = 0;
                w.attr(I({
                    padding: 8,
                    r: 2
                }, A));
                var n, g, x, t;
                A = I({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, A);
                n = A.style;
                delete A.style;
                d = I(A, {
                    fill: "#e6e6e6"
                }, d);
                g = d.style;
                delete d.style;
                h = I(A, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, h);
                x = h.style;
                delete h.style;
                v = I(A, {
                    style: {
                        color: "#cccccc"
                    }
                }, v);
                t = v.style;
                delete v.style;
                G(w.element, L ? "mouseover" : "mouseenter", function() {
                    3 !== e && w.setState(1)
                });
                G(w.element, L ? "mouseout" : "mouseleave", function() {
                    3 !== e && w.setState(e)
                });
                w.setState = function(a) {
                    1 !== a && (w.state = e = a);
                    w.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    w.attr([A, d, h, v][a ||
                        0
                    ]).css([n, g, x, t][a || 0])
                };
                w.attr(A).css(m({
                    cursor: "default"
                }, n));
                return w.on("click", function(a) {
                    3 !== e && c.call(w, a)
                })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function(a) {
                var b = {
                    fill: "none"
                };
                t(a) ? b.d = a : z(a) && m(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function(a, b, k) {
                a = z(a) ? a : {
                    x: a,
                    y: b,
                    r: k
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function(a, b, k) {
                    k.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function(a, b, k, c, A, d) {
                z(a) ? (c = a, b = c.y, k = c.r, a = c.x) : c = {
                    innerR: c,
                    start: A,
                    end: d
                };
                a = this.symbol("arc", a, b, k, k, c);
                a.r = k;
                return a
            },
            rect: function(a, b, k, c, A, d) {
                A = z(a) ? a.r : A;
                var h = this.createElement("rect");
                a = z(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(k, 0),
                    height: Math.max(c, 0)
                };
                void 0 !== d && (a.strokeWidth = d, a = h.crisp(a));
                a.fill = "none";
                A && (a.r = A);
                h.rSetter = function(a, b, k) {
                    l(k, {
                        rx: a,
                        ry: a
                    })
                };
                return h.attr(a)
            },
            setSize: function(a, b, k) {
                var c = this.alignedObjects,
                    A = c.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: w(k, !0) ? void 0 : 0
                    }); A--;) c[A].align()
            },
            g: function(a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function(a, b, k, c, A, d) {
                var h = {
                        preserveAspectRatio: "none"
                    },
                    v, K = function(a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
                    },
                    w = function(b) {
                        K(v.element, a);
                        d.call(v, b)
                    };
                1 < arguments.length && m(h, {
                    x: b,
                    y: k,
                    width: c,
                    height: A
                });
                v = this.createElement("image").attr(h);
                d ? (K(v.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), h = new N.Image, G(h, "load", w), h.src = a, h.complete && w({})) : K(v.element, a);
                return v
            },
            symbol: function(a, b, k, c, A, d) {
                var h = this,
                    v, K = /^url\((.*?)\)$/,
                    n = K.test(a),
                    x = !n && (this.symbols[a] ? a : "circle"),
                    t = x && this.symbols[x],
                    B = y(b) && t && t.call(this.symbols, Math.round(b), Math.round(k), c, A, d),
                    z, D;
                t ? (v = this.path(B), v.attr("fill", "none"), m(v, {
                    symbolName: x,
                    x: b,
                    y: k,
                    width: c,
                    height: A
                }), d && m(v, d)) : n && (z = a.match(K)[1], v = this.image(z), v.imgwidth = w(O[z] && O[z].width, d && d.width), v.imgheight = w(O[z] && O[z].height, d && d.height), D = function() {
                        v.attr({
                            width: v.width,
                            height: v.height
                        })
                    }, g(["width", "height"], function(a) {
                        v[a + "Setter"] = function(a, b) {
                            var k = {},
                                c = this["img" + b],
                                A = "width" === b ? "translateX" : "translateY";
                            this[b] = a;
                            y(c) && (this.element && this.element.setAttribute(b, c), this.alignByTranslate || (k[A] = ((this[b] || 0) - c) / 2, this.attr(k)))
                        }
                    }), y(b) && v.attr({
                        x: b,
                        y: k
                    }), v.isImg = !0, y(v.imgwidth) &&
                    y(v.imgheight) ? D() : (v.attr({
                        width: 0,
                        height: 0
                    }), r("img", {
                        onload: function() {
                            var a = f[h.chartIndex];
                            0 === this.width && (C(this, {
                                position: "absolute",
                                top: "-999em"
                            }), e.body.appendChild(this));
                            O[z] = {
                                width: this.width,
                                height: this.height
                            };
                            v.imgwidth = this.width;
                            v.imgheight = this.height;
                            v.element && D();
                            this.parentNode && this.parentNode.removeChild(this);
                            h.imgCount--;
                            if (!h.imgCount && a && a.onload) a.onload()
                        },
                        src: z
                    }), this.imgCount++));
                return v
            },
            symbols: {
                circle: function(a, b, k, c) {
                    return this.arc(a + k / 2, b + c / 2, k / 2, c / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function(a, b, k, c) {
                    return ["M", a, b, "L", a + k, b, a + k, b + c, a, b + c, "Z"]
                },
                triangle: function(a, b, k, c) {
                    return ["M", a + k / 2, b, "L", a + k, b + c, a, b + c, "Z"]
                },
                "triangle-down": function(a, b, k, c) {
                    return ["M", a, b, "L", a + k, b, a + k / 2, b + c, "Z"]
                },
                diamond: function(a, b, k, c) {
                    return ["M", a + k / 2, b, "L", a + k, b + c / 2, a + k / 2, b + c, a, b + c / 2, "Z"]
                },
                arc: function(a, b, k, c, A) {
                    var d = A.start,
                        h = A.r || k,
                        v = A.r || c || k,
                        m = A.end - .001;
                    k = A.innerR;
                    c = w(A.open, .001 > Math.abs(A.end - A.start - 2 * Math.PI));
                    var K = Math.cos(d),
                        e = Math.sin(d),
                        n = Math.cos(m),
                        m = Math.sin(m);
                    A = .001 > A.end - d - Math.PI ? 0 : 1;
                    h = ["M", a + h * K, b + v * e, "A", h, v, 0, A, 1, a + h * n, b + v * m];
                    y(k) && h.push(c ? "M" : "L", a + k * n, b + k * m, "A", k, k, 0, A, 0, a + k * K, b + k * e);
                    h.push(c ? "" : "Z");
                    return h
                },
                callout: function(a, b, k, c, A) {
                    var d = Math.min(A && A.r || 0, k, c),
                        h = d + 6,
                        v = A && A.anchorX;
                    A = A && A.anchorY;
                    var m;
                    m = ["M", a + d, b, "L", a + k - d, b, "C", a + k, b, a + k, b, a + k, b + d, "L", a + k, b + c - d, "C", a + k, b + c, a + k, b + c, a + k - d, b + c, "L", a + d, b + c, "C", a, b + c, a, b + c, a, b + c - d, "L", a, b + d, "C", a, b, a, b, a + d, b];
                    v && v > k ? A > b + h && A < b + c - h ? m.splice(13, 3, "L", a + k, A - 6, a + k + 6, A, a + k, A + 6, a + k,
                        b + c - d) : m.splice(13, 3, "L", a + k, c / 2, v, A, a + k, c / 2, a + k, b + c - d) : v && 0 > v ? A > b + h && A < b + c - h ? m.splice(33, 3, "L", a, A + 6, a - 6, A, a, A - 6, a, b + d) : m.splice(33, 3, "L", a, c / 2, v, A, a, c / 2, a, b + d) : A && A > c && v > a + h && v < a + k - h ? m.splice(23, 3, "L", v + 6, b + c, v, b + c + 6, v - 6, b + c, a + d, b + c) : A && 0 > A && v > a + h && v < a + k - h && m.splice(3, 3, "L", v - 6, b, v, b - 6, v + 6, b, k - d, b);
                    return m
                }
            },
            clipRect: function(b, k, c, A) {
                var d = a.uniqueKey(),
                    h = this.createElement("clipPath").attr({
                        id: d
                    }).add(this.defs);
                b = this.rect(b, k, c, A, 0).add(h);
                b.id = d;
                b.clipPath = h;
                b.count = 0;
                return b
            },
            text: function(a,
                b, k, c) {
                var A = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, b, k);
                A.x = Math.round(b || 0);
                k && (A.y = Math.round(k));
                if (a || 0 === a) A.text = a;
                a = this.createElement("text").attr(A);
                c || (a.xSetter = function(a, b, k) {
                    var c = k.getElementsByTagName("tspan"),
                        A, d = k.getAttribute(b),
                        h;
                    for (h = 0; h < c.length; h++) A = c[h], A.getAttribute(b) === d && A.setAttribute(b, a);
                    k.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? k(a) : /em/.test(a) ?
                    parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function(a, b, k) {
                var c = a;
                b && k && (c = Math.max(c * Math.cos(b * p), 4));
                return {
                    x: -a / 3 * Math.sin(b * p),
                    y: c
                }
            },
            label: function(b, k, c, d, h, v, K, w, e) {
                var n = this,
                    x = n.g("button" !== e && "label"),
                    t = x.text = n.text("", 0, 0, K).attr({
                        zIndex: 1
                    }),
                    B, z, D = 0,
                    H = 3,
                    Q = 0,
                    p, T, O, f, L, r = {},
                    l, N, M = /^url\((.*?)\)$/.test(d),
                    C = M,
                    u, q, S, W;
                e && x.addClass("highcharts-" + e);
                C = M;
                u = function() {
                    return (l || 0) % 2 / 2
                };
                q = function() {
                    var a =
                        t.element.style,
                        b = {};
                    z = (void 0 === p || void 0 === T || L) && y(t.textStr) && t.getBBox();
                    x.width = (p || z.width || 0) + 2 * H + Q;
                    x.height = (T || z.height || 0) + 2 * H;
                    N = H + n.fontMetrics(a && a.fontSize, t).b;
                    C && (B || (x.box = B = n.symbols[d] || M ? n.symbol(d) : n.rect(), B.addClass(("button" === e ? "" : "highcharts-label-box") + (e ? " highcharts-" + e + "-box" : "")), B.add(x), a = u(), b.x = a, b.y = (w ? -N : 0) + a), b.width = Math.round(x.width), b.height = Math.round(x.height), B.attr(m(b, r)), r = {})
                };
                S = function() {
                    var a = Q + H,
                        b;
                    b = w ? 0 : N;
                    y(p) && z && ("center" === L || "right" === L) && (a += {
                        center: .5,
                        right: 1
                    }[L] * (p - z.width));
                    if (a !== t.x || b !== t.y) t.attr("x", a), t.hasBoxWidthChanged && (z = t.getBBox(!0), q()), void 0 !== b && t.attr("y", b);
                    t.x = a;
                    t.y = b
                };
                W = function(a, b) {
                    B ? B.attr(a, b) : r[a] = b
                };
                x.onAdd = function() {
                    t.add(x);
                    x.attr({
                        text: b || 0 === b ? b : "",
                        x: k,
                        y: c
                    });
                    B && y(h) && x.attr({
                        anchorX: h,
                        anchorY: v
                    })
                };
                x.widthSetter = function(b) {
                    p = a.isNumber(b) ? b : null
                };
                x.heightSetter = function(a) {
                    T = a
                };
                x["text-alignSetter"] = function(a) {
                    L = a
                };
                x.paddingSetter = function(a) {
                    y(a) && a !== H && (H = x.padding = a, S())
                };
                x.paddingLeftSetter = function(a) {
                    y(a) &&
                        a !== Q && (Q = a, S())
                };
                x.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== D && (D = a, z && x.attr({
                        x: O
                    }))
                };
                x.textSetter = function(a) {
                    void 0 !== a && t.textSetter(a);
                    q();
                    S()
                };
                x["stroke-widthSetter"] = function(a, b) {
                    a && (C = !0);
                    l = this["stroke-width"] = a;
                    W(b, a)
                };
                x.strokeSetter = x.fillSetter = x.rSetter = function(a, b) {
                    "r" !== b && ("fill" === b && a && (C = !0), x[b] = a);
                    W(b, a)
                };
                x.anchorXSetter = function(a, b) {
                    h = x.anchorX = a;
                    W(b, Math.round(a) - u() - O)
                };
                x.anchorYSetter = function(a, b) {
                    v = x.anchorY = a;
                    W(b, a - f)
                };
                x.xSetter = function(a) {
                    x.x = a;
                    D && (a -= D * ((p || z.width) + 2 * H), x["forceAnimate:x"] = !0);
                    O = Math.round(a);
                    x.attr("translateX", O)
                };
                x.ySetter = function(a) {
                    f = x.y = Math.round(a);
                    x.attr("translateY", f)
                };
                var R = x.css;
                return m(x, {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = I(a);
                            g(x.textProps, function(k) {
                                void 0 !== a[k] && (b[k] = a[k], delete a[k])
                            });
                            t.css(b);
                            "width" in b && q()
                        }
                        return R.call(x, a)
                    },
                    getBBox: function() {
                        return {
                            width: z.width + 2 * H,
                            height: z.height + 2 * H,
                            x: z.x - H,
                            y: z.y - H
                        }
                    },
                    shadow: function(a) {
                        a && (q(), B && B.shadow(a));
                        return x
                    },
                    destroy: function() {
                        A(x.element, "mouseenter");
                        A(x.element, "mouseleave");
                        t && (t = t.destroy());
                        B && (B = B.destroy());
                        E.prototype.destroy.call(x);
                        x = n = q = S = W = null
                    }
                })
            }
        });
        a.Renderer = F
    })(J);
    (function(a) {
        var E = a.attr,
            F = a.createElement,
            G = a.css,
            q = a.defined,
            l = a.each,
            f = a.extend,
            u = a.isFirefox,
            C = a.isMS,
            r = a.isWebKit,
            y = a.pick,
            p = a.pInt,
            d = a.SVGRenderer,
            e = a.win,
            g = a.wrap;
        f(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = "SPAN" === this.element.tagName && a && "width" in a,
                    c = y(b && a.width, void 0);
                b && (delete a.width, this.textWidth = c, this.htmlUpdateTransform());
                a && "ellipsis" ===
                    a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = f(this.styles, a);
                G(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        c = this.translateX || 0,
                        d = this.translateY || 0,
                        e = this.x || 0,
                        t = this.y || 0,
                        n = this.textAlign || "left",
                        g = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[n],
                        z = this.styles,
                        D = z && z.whiteSpace;
                    G(b, {
                        marginLeft: c,
                        marginTop: d
                    });
                    this.shadows && l(this.shadows, function(a) {
                        G(a, {
                            marginLeft: c + 1,
                            marginTop: d + 1
                        })
                    });
                    this.inverted && l(b.childNodes, function(c) {
                        a.invertChild(c, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var z = this.rotation,
                            h = this.textWidth && p(this.textWidth),
                            I = [z, n, b.innerHTML, this.textWidth, this.textAlign].join(),
                            H;
                        (H = h !== this.oldTextWidth) && !(H = h > this.oldTextWidth) && ((H = this.textPxLength) || (G(b, {
                            width: "",
                            whiteSpace: D || "nowrap"
                        }), H = b.offsetWidth), H = H > h);
                        H && /[ \-]/.test(b.textContent || b.innerText) ? (G(b, {
                            width: h + "px",
                            display: "block",
                            whiteSpace: D ||
                                "normal"
                        }), this.oldTextWidth = h, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        I !== this.cTT && (D = a.fontMetrics(b.style.fontSize).b, !q(z) || z === (this.oldRotation || 0) && n === this.oldAlign || this.setSpanRotation(z, g, D), this.getSpanCorrection(!q(z) && this.textPxLength || b.offsetWidth, D, g, z, n));
                        G(b, {
                            left: e + (this.xCorr || 0) + "px",
                            top: t + (this.yCorr || 0) + "px"
                        });
                        this.cTT = I;
                        this.oldRotation = z;
                        this.oldAlign = n
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, c) {
                var d = {},
                    m = this.renderer.getTransformKey();
                d[m] =
                    d.transform = "rotate(" + a + "deg)";
                d[m + (u ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px";
                G(this.element, d)
            },
            getSpanCorrection: function(a, b, c) {
                this.xCorr = -a * c;
                this.yCorr = -b
            }
        });
        f(d.prototype, {
            getTransformKey: function() {
                return C && !/Edge/.test(e.navigator.userAgent) ? "-ms-transform" : r ? "-webkit-transform" : u ? "MozTransform" : e.opera ? "-o-transform" : ""
            },
            html: function(a, b, c) {
                var d = this.createElement("span"),
                    m = d.element,
                    e = d.renderer,
                    n = e.isSVG,
                    p = function(a, b) {
                        l(["opacity", "visibility"], function(c) {
                            g(a, c +
                                "Setter",
                                function(a, c, d, h) {
                                    a.call(this, c, d, h);
                                    b[d] = c
                                })
                        });
                        a.addedSetters = !0
                    };
                d.textSetter = function(a) {
                    a !== m.innerHTML && delete this.bBox;
                    this.textStr = a;
                    m.innerHTML = y(a, "");
                    d.doTransform = !0
                };
                n && p(d, d.element.style);
                d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    d[b] = a;
                    d.doTransform = !0
                };
                d.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                d.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(c)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                m.style.whiteSpace = "nowrap";
                d.css = d.htmlCss;
                n && (d.add = function(a) {
                    var b, c = e.box.parentNode,
                        n = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) n.push(a), a = a.parentGroup;
                            l(n.reverse(), function(a) {
                                function h(b, k) {
                                    a[k] = b;
                                    "translateX" === k ? m.left = b + "px" : m.top = b + "px";
                                    a.doTransform = !0
                                }
                                var m, k = E(a.element, "class");
                                k && (k = {
                                    className: k
                                });
                                b = a.div = a.div || F("div", k, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || c);
                                m = b.style;
                                f(a, {
                                    classSetter: function(a) {
                                        return function(b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(b),
                                    on: function() {
                                        n[0].div && d.on.apply({
                                            element: n[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: h,
                                    translateYSetter: h
                                });
                                a.addedSetters || p(a, m)
                            })
                        }
                    } else b = c;
                    b.appendChild(m);
                    d.added = !0;
                    d.alignOnAdd && d.htmlUpdateTransform();
                    return d
                });
                return d
            }
        })
    })(J);
    (function(a) {
        var E = a.defined,
            F = a.each,
            G = a.extend,
            q = a.merge,
            l = a.pick,
            f = a.timeUnits,
            u = a.win;
        a.Time = function(a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(a) {
                var f = l(a && a.useUTC, !0),
                    y = this;
                this.options = a = q(!0, this.options || {}, a);
                this.Date = a.Date || u.Date;
                this.timezoneOffset = (this.useUTC = f) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(f && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function(a, d) {
                        var e = d.getTime(),
                            g = e - y.getTimezoneOffset(d);
                        d.setTime(g);
                        a = d["getUTC" + a]();
                        d.setTime(e);
                        return a
                    },
                    this.set = function(a, d, e) {
                        var g;
                        if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === d.getTimezoneOffset() % 60) d["set" + a](e);
                        else g = y.getTimezoneOffset(d), g = d.getTime() - g, d.setTime(g), d["setUTC" + a](e), a = y.getTimezoneOffset(d), g = d.getTime() + a, d.setTime(g)
                    }) : f ? (this.get = function(a, d) {
                    return d["getUTC" + a]()
                }, this.set = function(a, d, e) {
                    return d["setUTC" + a](e)
                }) : (this.get = function(a, d) {
                    return d["get" + a]()
                }, this.set = function(a, d, e) {
                    return d["set" + a](e)
                })
            },
            makeTime: function(f, r, y, p, d, e) {
                var g, m, b;
                this.useUTC ?
                    (g = this.Date.UTC.apply(0, arguments), m = this.getTimezoneOffset(g), g += m, b = this.getTimezoneOffset(g), m !== b ? g += b - m : m - 36E5 !== this.getTimezoneOffset(g - 36E5) || a.isSafari || (g -= 36E5)) : g = (new this.Date(f, r, l(y, 1), l(p, 0), l(d, 0), l(e, 0))).getTime();
                return g
            },
            timezoneOffsetFunction: function() {
                var f = this,
                    r = this.options,
                    l = u.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (r.timezone) {
                    if (l) return function(a) {
                        return 6E4 * -l.tz(a, r.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC &&
                    r.getTimezoneOffset ? function(a) {
                        return 6E4 * r.getTimezoneOffset(a)
                    } : function() {
                        return 6E4 * (f.timezoneOffset || 0)
                    }
            },
            dateFormat: function(f, l, y) {
                if (!a.defined(l) || isNaN(l)) return a.defaultOptions.lang.invalidDate || "";
                f = a.pick(f, "%Y-%m-%d %H:%M:%S");
                var p = this,
                    d = new this.Date(l),
                    e = this.get("Hours", d),
                    g = this.get("Day", d),
                    m = this.get("Date", d),
                    b = this.get("Month", d),
                    c = this.get("FullYear", d),
                    x = a.defaultOptions.lang,
                    B = x.weekdays,
                    t = x.shortWeekdays,
                    n = a.pad,
                    d = a.extend({
                        a: t ? t[g] : B[g].substr(0, 3),
                        A: B[g],
                        d: n(m),
                        e: n(m,
                            2, " "),
                        w: g,
                        b: x.shortMonths[b],
                        B: x.months[b],
                        m: n(b + 1),
                        o: b + 1,
                        y: c.toString().substr(2, 2),
                        Y: c,
                        H: n(e),
                        k: e,
                        I: n(e % 12 || 12),
                        l: e % 12 || 12,
                        M: n(p.get("Minutes", d)),
                        p: 12 > e ? "AM" : "PM",
                        P: 12 > e ? "am" : "pm",
                        S: n(d.getSeconds()),
                        L: n(Math.floor(l % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(d, function(a, b) {
                    for (; - 1 !== f.indexOf("%" + b);) f = f.replace("%" + b, "function" === typeof a ? a.call(p, l) : a)
                });
                return y ? f.substr(0, 1).toUpperCase() + f.substr(1) : f
            },
            getTimeTicks: function(a, r, y, p) {
                var d = this,
                    e = [],
                    g, m = {},
                    b;
                g = new d.Date(r);
                var c = a.unitRange,
                    x = a.count || 1,
                    B;
                p = l(p, 1);
                if (E(r)) {
                    d.set("Milliseconds", g, c >= f.second ? 0 : x * Math.floor(d.get("Milliseconds", g) / x));
                    c >= f.second && d.set("Seconds", g, c >= f.minute ? 0 : x * Math.floor(d.get("Seconds", g) / x));
                    c >= f.minute && d.set("Minutes", g, c >= f.hour ? 0 : x * Math.floor(d.get("Minutes", g) / x));
                    c >= f.hour && d.set("Hours", g, c >= f.day ? 0 : x * Math.floor(d.get("Hours", g) / x));
                    c >= f.day && d.set("Date", g, c >= f.month ? 1 : x * Math.floor(d.get("Date", g) / x));
                    c >= f.month && (d.set("Month", g, c >= f.year ? 0 : x * Math.floor(d.get("Month", g) / x)), b = d.get("FullYear",
                        g));
                    c >= f.year && d.set("FullYear", g, b - b % x);
                    c === f.week && (b = d.get("Day", g), d.set("Date", g, d.get("Date", g) - b + p + (b < p ? -7 : 0)));
                    b = d.get("FullYear", g);
                    p = d.get("Month", g);
                    var t = d.get("Date", g),
                        n = d.get("Hours", g);
                    r = g.getTime();
                    d.variableTimezone && (B = y - r > 4 * f.month || d.getTimezoneOffset(r) !== d.getTimezoneOffset(y));
                    r = g.getTime();
                    for (g = 1; r < y;) e.push(r), r = c === f.year ? d.makeTime(b + g * x, 0) : c === f.month ? d.makeTime(b, p + g * x) : !B || c !== f.day && c !== f.week ? B && c === f.hour && 1 < x ? d.makeTime(b, p, t, n + g * x) : r + c * x : d.makeTime(b, p, t + g * x * (c ===
                        f.day ? 1 : 7)), g++;
                    e.push(r);
                    c <= f.hour && 1E4 > e.length && F(e, function(a) {
                        0 === a % 18E5 && "000000000" === d.dateFormat("%H%M%S%L", a) && (m[a] = "day")
                    })
                }
                e.info = G(a, {
                    higherRanks: m,
                    totalRange: c * x
                });
                return e
            }
        }
    })(J);
    (function(a) {
        var E = a.color,
            F = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: E("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(E) {
            a.defaultOptions = F(!0, a.defaultOptions, E);
            a.time.update(F(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(F(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function(F, q, l) {
            return a.time.dateFormat(F, q, l)
        }
    })(J);
    (function(a) {
        var E = a.correctFloat,
            F = a.defined,
            G = a.destroyObjectProperties,
            q = a.fireEvent,
            l = a.isNumber,
            f = a.merge,
            u = a.pick,
            C = a.deg2rad;
        a.Tick = function(a, f, p, d) {
            this.axis = a;
            this.pos = f;
            this.type = p || "";
            this.isNewLabel = this.isNew = !0;
            p || d || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    l = a.options,
                    p =
                    a.chart,
                    d = a.categories,
                    e = a.names,
                    g = this.pos,
                    m = l.labels,
                    b = a.tickPositions,
                    c = g === b[0],
                    x = g === b[b.length - 1],
                    e = d ? u(d[g], e[g], g) : g,
                    d = this.label,
                    b = b.info,
                    B;
                a.isDatetimeAxis && b && (B = l.dateTimeLabelFormats[b.higherRanks[g] || b.unitName]);
                this.isFirst = c;
                this.isLast = x;
                l = {
                    axis: a,
                    chart: p,
                    isFirst: c,
                    isLast: x,
                    dateTimeLabelFormat: B,
                    value: a.isLog ? E(a.lin2log(e)) : e,
                    pos: g
                };
                l = a.labelFormatter.call(l, l);
                if (F(d)) d && d.textStr !== l && (!d.textWidth || m.style && m.style.width || d.styles.width || d.css({
                    width: null
                }), d.attr({
                    text: l
                }));
                else {
                    if (this.label = d = F(l) && m.enabled ? p.renderer.text(l, 0, 0, m.useHTML).css(f(m.style)).add(a.labelGroup) : null) d.textPxLength = d.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var f = this.axis,
                    p = f.options.labels,
                    d = a.x,
                    e = f.chart.chartWidth,
                    g = f.chart.spacing,
                    m = u(f.labelLeft, Math.min(f.pos, g[3])),
                    g = u(f.labelRight, Math.max(f.isRadial ? 0 : f.pos + f.len, e - g[1])),
                    b = this.label,
                    c = this.rotation,
                    x = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[f.labelAlign || b.attr("align")],
                    B = b.getBBox().width,
                    t = f.getSlotWidth(this),
                    n = t,
                    l = 1,
                    z, D = {};
                if (c || "justify" !== u(p.overflow, "justify")) 0 > c && d - x * B < m ? z = Math.round(d / Math.cos(c * C) - m) : 0 < c && d + x * B > g && (z = Math.round((e - d) / Math.cos(c * C)));
                else if (e = d + (1 - x) * B, d - x * B < m ? n = a.x + n * (1 - x) - m : e > g && (n = g - a.x + n * x, l = -1), n = Math.min(t, n), n < t && "center" === f.labelAlign && (a.x += l * (t - n - x * (t - Math.min(B, n)))), B > n || f.autoRotation && (b.styles || {}).width) z = n;
                z && (D.width = z, (p.style || {}).textOverflow || (D.textOverflow = "ellipsis"),
                    b.css(D))
            },
            getPosition: function(f, l, p, d) {
                var e = this.axis,
                    g = e.chart,
                    m = d && g.oldChartHeight || g.chartHeight;
                f = {
                    x: f ? a.correctFloat(e.translate(l + p, null, null, d) + e.transB) : e.left + e.offset + (e.opposite ? (d && g.oldChartWidth || g.chartWidth) - e.right - e.left : 0),
                    y: f ? m - e.bottom + e.offset - (e.opposite ? e.height : 0) : a.correctFloat(m - e.translate(l + p, null, null, d) - e.transB)
                };
                q(this, "afterGetPosition", {
                    pos: f
                });
                return f
            },
            getLabelPosition: function(a, f, p, d, e, g, m, b) {
                var c = this.axis,
                    x = c.transA,
                    B = c.reversed,
                    t = c.staggerLines,
                    n = c.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    l = e.y,
                    z = d || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ? .5 : 1),
                    D = {};
                F(l) || (l = 0 === c.side ? p.rotation ? -8 : -p.getBBox().height : 2 === c.side ? n.y + 8 : Math.cos(p.rotation * C) * (n.y - p.getBBox(!1, 0).height / 2));
                a = a + e.x + z + n.x - (g && d ? g * x * (B ? -1 : 1) : 0);
                f = f + l - (g && !d ? g * x * (B ? 1 : -1) : 0);
                t && (p = m / (b || 1) % t, c.opposite && (p = t - p - 1), f += c.labelOffset / t * p);
                D.x = a;
                D.y = Math.round(f);
                q(this, "afterGetLabelPosition", {
                    pos: D
                });
                return D
            },
            getMarkPath: function(a, f, p, d, e, g) {
                return g.crispLine(["M", a, f, "L", a + (e ? 0 : -p), f +
                    (e ? p : 0)
                ], d)
            },
            renderGridLine: function(a, f, p) {
                var d = this.axis,
                    e = d.options,
                    g = this.gridLine,
                    m = {},
                    b = this.pos,
                    c = this.type,
                    x = d.tickmarkOffset,
                    B = d.chart.renderer,
                    t = c ? c + "Grid" : "grid",
                    n = e[t + "LineWidth"],
                    l = e[t + "LineColor"],
                    e = e[t + "LineDashStyle"];
                g || (m.stroke = l, m["stroke-width"] = n, e && (m.dashstyle = e), c || (m.zIndex = 1), a && (m.opacity = 0), this.gridLine = g = B.path().attr(m).addClass("highcharts-" + (c ? c + "-" : "") + "grid-line").add(d.gridGroup));
                if (!a && g && (a = d.getPlotLinePath(b + x, g.strokeWidth() * p, a, !0))) g[this.isNew ? "attr" :
                    "animate"]({
                    d: a,
                    opacity: f
                })
            },
            renderMark: function(a, f, p) {
                var d = this.axis,
                    e = d.options,
                    g = d.chart.renderer,
                    m = this.type,
                    b = m ? m + "Tick" : "tick",
                    c = d.tickSize(b),
                    x = this.mark,
                    B = !x,
                    t = a.x;
                a = a.y;
                var n = u(e[b + "Width"], !m && d.isXAxis ? 1 : 0),
                    e = e[b + "Color"];
                c && (d.opposite && (c[0] = -c[0]), B && (this.mark = x = g.path().addClass("highcharts-" + (m ? m + "-" : "") + "tick").add(d.axisGroup), x.attr({
                    stroke: e,
                    "stroke-width": n
                })), x[B ? "attr" : "animate"]({
                    d: this.getMarkPath(t, a, c[0], x.strokeWidth() * p, d.horiz, g),
                    opacity: f
                }))
            },
            renderLabel: function(a,
                f, p, d) {
                var e = this.axis,
                    g = e.horiz,
                    m = e.options,
                    b = this.label,
                    c = m.labels,
                    x = c.step,
                    e = e.tickmarkOffset,
                    B = !0,
                    t = a.x;
                a = a.y;
                b && l(t) && (b.xy = a = this.getLabelPosition(t, a, b, g, c, e, d, x), this.isFirst && !this.isLast && !u(m.showFirstLabel, 1) || this.isLast && !this.isFirst && !u(m.showLastLabel, 1) ? B = !1 : !g || c.step || c.rotation || f || 0 === p || this.handleOverflow(a), x && d % x && (B = !1), B && l(a.y) ? (a.opacity = p, b[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (b.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(f, l, p) {
                var d =
                    this.axis,
                    e = d.horiz,
                    g = this.getPosition(e, this.pos, d.tickmarkOffset, l),
                    m = g.x,
                    b = g.y,
                    d = e && m === d.pos + d.len || !e && b === d.pos ? -1 : 1;
                p = u(p, 1);
                this.isActive = !0;
                this.renderGridLine(l, p, d);
                this.renderMark(g, p, d);
                this.renderLabel(g, l, p, f);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function() {
                G(this, this.axis)
            }
        }
    })(J);
    var ea = function(a) {
        var E = a.addEvent,
            F = a.animObject,
            G = a.arrayMax,
            q = a.arrayMin,
            l = a.color,
            f = a.correctFloat,
            u = a.defaultOptions,
            C = a.defined,
            r = a.deg2rad,
            y = a.destroyObjectProperties,
            p = a.each,
            d =
            a.extend,
            e = a.fireEvent,
            g = a.format,
            m = a.getMagnitude,
            b = a.grep,
            c = a.inArray,
            x = a.isArray,
            B = a.isNumber,
            t = a.isString,
            n = a.merge,
            L = a.normalizeTickInterval,
            z = a.objectEach,
            D = a.pick,
            h = a.removeEvent,
            I = a.splat,
            H = a.syncTimeout,
            v = a.Tick,
            w = function() {
                this.init.apply(this, arguments)
            };
        a.extend(w.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var k = b.isX,
                    A = this;
                A.chart = a;
                A.horiz = a.inverted && !A.isZAxis ? !k : k;
                A.isXAxis = k;
                A.coll = A.coll || (k ? "xAxis" : "yAxis");
                e(this, "init", {
                    userOptions: b
                });
                A.opposite = b.opposite;
                A.side = b.side || (A.horiz ? A.opposite ? 0 : 2 : A.opposite ? 1 : 3);
                A.setOptions(b);
                var d = this.options,
                    h = d.type;
                A.labelFormatter = d.labels.formatter || A.defaultLabelFormatter;
                A.userOptions = b;
                A.minPixelPadding = 0;
                A.reversed = d.reversed;
                A.visible = !1 !== d.visible;
                A.zoomEnabled = !1 !== d.zoomEnabled;
                A.hasNames = "category" === h || !0 === d.categories;
                A.categories = d.categories || A.hasNames;
                A.names || (A.names = [], A.names.keys = {});
                A.plotLinesAndBandsGroups = {};
                A.isLog = "logarithmic" === h;
                A.isDatetimeAxis = "datetime" === h;
                A.positiveValuesOnly = A.isLog && !A.allowNegativeLog;
                A.isLinked = C(d.linkedTo);
                A.ticks = {};
                A.labelEdge = [];
                A.minorTicks = {};
                A.plotLinesAndBands = [];
                A.alternateBands = {};
                A.len = 0;
                A.minRange = A.userMinRange = d.minRange || d.maxZoom;
                A.range = d.range;
                A.offset = d.offset || 0;
                A.stacks = {};
                A.oldStacks = {};
                A.stacksTouched = 0;
                A.max = null;
                A.min = null;
                A.crosshair = D(d.crosshair, I(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
                b = A.options.events; - 1 === c(A, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, A) : a.axes.push(A), a[A.coll].push(A));
                A.series = A.series || [];
                a.inverted && !A.isZAxis && k && void 0 === A.reversed && (A.reversed = !0);
                z(b, function(a, b) {
                    E(A, b, a)
                });
                A.lin2log = d.linearToLogConverter || A.lin2log;
                A.isLog && (A.val2lin = A.log2lin, A.lin2val = A.lin2log);
                e(this, "afterInit")
            },
            setOptions: function(a) {
                this.options =
                    n(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], n(u[this.coll], a));
                e(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    c = this.value,
                    d = b.chart.time,
                    h = b.categories,
                    v = this.dateTimeLabelFormat,
                    m = u.lang,
                    w = m.numericSymbols,
                    m = m.numericSymbolMagnitude || 1E3,
                    e = w && w.length,
                    n, t = b.options.labels.format,
                    b = b.isLog ? Math.abs(c) : b.tickInterval;
                if (t) n = g(t, this, d);
                else if (h) n = c;
                else if (v) n = d.dateFormat(v, c);
                else if (e && 1E3 <= b)
                    for (; e-- && void 0 === n;) d = Math.pow(m, e + 1), b >= d && 0 === 10 * c % d && null !== w[e] && 0 !== c && (n = a.numberFormat(c / d, -1) + w[e]);
                void 0 === n && (n = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return n
            },
            getSeriesExtremes: function() {
                var a = this,
                    c = a.chart;
                e(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    p(a.series,
                        function(k) {
                            if (k.visible || !c.options.chart.ignoreHiddenSeries) {
                                var A = k.options,
                                    d = A.threshold,
                                    h;
                                a.hasVisibleSeries = !0;
                                a.positiveValuesOnly && 0 >= d && (d = null);
                                if (a.isXAxis) A = k.xData, A.length && (k = q(A), h = G(A), B(k) || k instanceof Date || (A = b(A, B), k = q(A), h = G(A)), A.length && (a.dataMin = Math.min(D(a.dataMin, A[0], k), k), a.dataMax = Math.max(D(a.dataMax, A[0], h), h)));
                                else if (k.getExtremes(), h = k.dataMax, k = k.dataMin, C(k) && C(h) && (a.dataMin = Math.min(D(a.dataMin, k), k), a.dataMax = Math.max(D(a.dataMax, h), h)), C(d) && (a.threshold =
                                        d), !A.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                            }
                        })
                });
                e(this, "afterGetSeriesExtremes")
            },
            translate: function(a, b, c, d, h, v) {
                var k = this.linkedParent || this,
                    A = 1,
                    m = 0,
                    w = d ? k.oldTransA : k.transA;
                d = d ? k.oldMin : k.min;
                var n = k.minPixelPadding;
                h = (k.isOrdinal || k.isBroken || k.isLog && h) && k.lin2val;
                w || (w = k.transA);
                c && (A *= -1, m = k.len);
                k.reversed && (A *= -1, m -= A * (k.sector || k.len));
                b ? (a = (a * A + m - n) / w + d, h && (a = k.lin2val(a))) : (h && (a = k.val2lin(a)), a = B(d) ? A * (a - d) * w + m + A * n + (B(v) ? w * v : 0) : void 0);
                return a
            },
            toPixels: function(a,
                b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, c, d, h) {
                var k = this.chart,
                    A = this.left,
                    v = this.top,
                    m, w, n = c && k.oldChartHeight || k.chartHeight,
                    e = c && k.oldChartWidth || k.chartWidth,
                    K;
                m = this.transB;
                var t = function(a, b, k) {
                    if (a < b || a > k) d ? a = Math.min(Math.max(b, a), k) : K = !0;
                    return a
                };
                h = D(h, this.translate(a, null, null, c));
                h = Math.min(Math.max(-1E5, h), 1E5);
                a = c = Math.round(h + m);
                m = w = Math.round(n -
                    h - m);
                B(h) ? this.horiz ? (m = v, w = n - this.bottom, a = c = t(a, A, A + this.width)) : (a = A, c = e - this.right, m = w = t(m, v, v + this.height)) : (K = !0, d = !1);
                return K && !d ? null : k.renderer.crispLine(["M", a, m, "L", c, w], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var k, A = f(Math.floor(b / a) * a);
                c = f(Math.ceil(c / a) * a);
                var d = [],
                    h;
                f(A + a) === A && (h = 20);
                if (this.single) return [b];
                for (b = A; b <= c;) {
                    d.push(b);
                    b = f(b + a, h);
                    if (b === k) break;
                    k = b
                }
                return d
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 === a.minorTicks ? D(a.minorTickInterval, "auto") :
                    !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a = this,
                    b = a.options,
                    c = a.tickPositions,
                    d = a.minorTickInterval,
                    h = [],
                    v = a.pointRangePadding || 0,
                    m = a.min - v,
                    v = a.max + v,
                    w = v - m;
                if (w && w / d < a.len / 3)
                    if (a.isLog) p(this.paddedTicks, function(b, k, c) {
                        k && h.push.apply(h, a.getLogTickPositions(d, c[k - 1], c[k], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) h = h.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), m, v, b.startOfWeek));
                else
                    for (b = m + (c[0] - m) % d; b <= v && b !== h[0]; b +=
                        d) h.push(b);
                0 !== h.length && a.trimTicks(h);
                return h
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    d, h, v, m, w, n, e, t;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (C(a.min) || C(a.max) ? this.minRange = null : (p(this.series, function(a) {
                    n = a.xData;
                    for (m = e = a.xIncrement ? 1 : n.length - 1; 0 < m; m--)
                        if (w = n[m] - n[m - 1], void 0 === v || w < v) v = w
                }), this.minRange = Math.min(5 * v, this.dataMax - this.dataMin)));
                c - b < this.minRange && (h = this.dataMax - this.dataMin >= this.minRange, t = this.minRange, d = (t - c + b) / 2, d = [b - d, D(a.min,
                    b - d)], h && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = G(d), c = [b + t, D(a.max, b + t)], h && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = q(c), c - b < t && (d[0] = c - t, d[1] = D(a.min, c - t), b = G(d)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : p(this.series, function(b) {
                    var c = b.closestPointRange,
                        k = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && C(c) && k && (a = C(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function(a) {
                var b = x(this.categories),
                    k = b ? this.categories :
                    this.names,
                    d = a.options.x,
                    h;
                a.series.requireSorting = !1;
                C(d) || (d = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? c(a.name, k) : D(k.keys[a.name], -1)); - 1 === d ? b || (h = k.length) : h = d;
                void 0 !== h && (this.names[h] = a.name, this.names.keys[a.name] = h);
                return h
            },
            updateNames: function() {
                var b = this,
                    c = this.names;
                0 < c.length && (p(a.keys(c.keys), function(a) {
                    delete c.keys[a]
                }), c.length = 0, this.minRange = this.userMinRange, p(this.series || [], function(a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    p(a.points, function(c, k) {
                        var d;
                        c.options && (d = b.nameToX(c), void 0 !== d && d !== c.x && (c.x = d, a.xData[k] = d))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    c = b.max - b.min,
                    k = b.axisPointRange || 0,
                    d, h = 0,
                    v = 0,
                    m = b.linkedParent,
                    w = !!b.categories,
                    n = b.transA,
                    g = b.isXAxis;
                if (g || w || k) d = b.getClosest(), m ? (h = m.minPointOffset, v = m.pointRangePadding) : p(b.series, function(a) {
                    var c = w ? 1 : g ? D(a.options.pointRange, d, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    k = Math.max(k, c);
                    b.single || (h = Math.max(h, t(a) ? 0 : c / 2), v = Math.max(v, "on" ===
                        a ? 0 : c))
                }), m = b.ordinalSlope && d ? b.ordinalSlope / d : 1, b.minPointOffset = h *= m, b.pointRangePadding = v *= m, b.pointRange = Math.min(k, c), g && (b.closestPointRange = d);
                a && (b.oldTransA = n);
                b.translationSlope = b.transA = n = b.options.staticScale || b.len / (c + v || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = n * h;
                e(this, "afterSetAxisTranslation")
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(b) {
                var c = this,
                    k = c.chart,
                    d = c.options,
                    h = c.isLog,
                    v = c.isDatetimeAxis,
                    w = c.isXAxis,
                    n = c.isLinked,
                    t = d.maxPadding,
                    g = d.minPadding,
                    x = d.tickInterval,
                    z = d.tickPixelInterval,
                    H = c.categories,
                    I = B(c.threshold) ? c.threshold : null,
                    l = c.softThreshold,
                    r, y, u, q;
                v || H || n || this.getTickAmount();
                u = D(c.userMin, d.min);
                q = D(c.userMax, d.max);
                n ? (c.linkedParent = k[c.coll][d.linkedTo], k = c.linkedParent.getExtremes(), c.min = D(k.min, k.dataMin), c.max = D(k.max, k.dataMax), d.type !== c.linkedParent.options.type && a.error(11, 1)) : (!l && C(I) && (c.dataMin >= I ? (r = I, g = 0) : c.dataMax <= I && (y = I, t = 0)), c.min = D(u, r, c.dataMin), c.max = D(q, y, c.dataMax));
                h && (c.positiveValuesOnly &&
                    !b && 0 >= Math.min(c.min, D(c.dataMin, c.min)) && a.error(10, 1), c.min = f(c.log2lin(c.min), 15), c.max = f(c.log2lin(c.max), 15));
                c.range && C(c.max) && (c.userMin = c.min = u = Math.max(c.dataMin, c.minFromRange()), c.userMax = q = c.max, c.range = null);
                e(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(H || c.axisPointRange || c.usePercentage || n) && C(c.min) && C(c.max) && (k = c.max - c.min) && (!C(u) && g && (c.min -= k * g), !C(q) && t && (c.max += k * t));
                B(d.softMin) && !B(c.userMin) && (c.min = Math.min(c.min, d.softMin));
                B(d.softMax) &&
                    !B(c.userMax) && (c.max = Math.max(c.max, d.softMax));
                B(d.floor) && (c.min = Math.max(c.min, d.floor));
                B(d.ceiling) && (c.max = Math.min(c.max, d.ceiling));
                l && C(c.dataMin) && (I = I || 0, !C(u) && c.min < I && c.dataMin >= I ? c.min = I : !C(q) && c.max > I && c.dataMax <= I && (c.max = I));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : n && !x && z === c.linkedParent.options.tickPixelInterval ? x = c.linkedParent.tickInterval : D(x, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, H ? 1 : (c.max - c.min) * z / Math.max(c.len, z));
                w &&
                    !b && p(c.series, function(a) {
                        a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                    });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !x && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                b = D(d.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !x && c.tickInterval < b && (c.tickInterval = b);
                v || h || x || (c.tickInterval = L(c.tickInterval, null, m(c.tickInterval), D(d.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var b = this.options,
                    c, d = b.tickPositions;
                c = this.getMinorTickInterval();
                var h = b.tickPositioner,
                    v = b.startOnTick,
                    m = b.endOnTick;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
                this.single = this.min === this.max &&
                    C(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = c = d && d.slice();
                !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], a.error(19)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) :
                    this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, h && (h = h.apply(this, [this.min, this.max]))) && (this.tickPositions = c = h);
                this.paddedTicks = c.slice(0);
                this.trimTicks(c, v, m);
                this.isLinked || (this.single && 2 > c.length && (this.min -= .5, this.max += .5), d || h || this.adjustTickAmount());
                e(this, "afterSetTickPositions")
            },
            trimTicks: function(a, b, c) {
                var k = a[0],
                    d = a[a.length - 1],
                    h = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b &&
                        -Infinity !== k) this.min = k;
                    else
                        for (; this.min - h > a[0];) a.shift();
                    if (c) this.max = d;
                    else
                        for (; this.max + h < a[a.length - 1];) a.pop();
                    0 === a.length && C(k) && !this.options.tickPositions && a.push((d + k) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || p(this.chart[this.coll], function(c) {
                    var k = c.options,
                        k = [c.horiz ? k.left : k.top, k.width, k.height, k.pane].join();
                    c.series.length && (a[k] ? b = !0 : a[k] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !C(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    d = this.finalTickAmt,
                    h = b && b.length,
                    v = D(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (h < c) {
                        for (; b.length < c;) b.length %
                            2 || this.min === v ? b.push(f(b[b.length - 1] + a)) : b.unshift(f(b[0] - a));
                        this.transA *= (h - 1) / (c - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else h > c && (this.tickInterval *= 2, this.setTickPositions());
                    if (C(d)) {
                        for (a = c = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                p(this.series, function(b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                e(this, "afterSetScale")
            },
            setExtremes: function(a, b, c, h, v) {
                var k = this,
                    m = k.chart;
                c = D(c, !0);
                p(k.series,
                    function(a) {
                        delete a.kdTree
                    });
                v = d(v, {
                    min: a,
                    max: b
                });
                e(k, "setExtremes", v, function() {
                    k.userMin = a;
                    k.userMax = b;
                    k.eventArgs = v;
                    c && m.redraw(h)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    k = this.dataMax,
                    d = this.options,
                    h = Math.min(c, D(d.min, c)),
                    d = Math.max(k, D(d.max, k));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (C(c) && (a < h && (a = h), a > d && (a = d)), C(k) && (b < h && (b = h), b > d && (b = d))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var b = this.chart,
                    c = this.options,
                    d = c.offsets || [0, 0, 0, 0],
                    h = this.horiz,
                    v = this.width = Math.round(a.relativeLength(D(c.width, b.plotWidth - d[3] + d[1]), b.plotWidth)),
                    m = this.height = Math.round(a.relativeLength(D(c.height, b.plotHeight - d[0] + d[2]), b.plotHeight)),
                    w = this.top = Math.round(a.relativeLength(D(c.top, b.plotTop + d[0]), b.plotHeight, b.plotTop)),
                    c = this.left = Math.round(a.relativeLength(D(c.left, b.plotLeft + d[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - m - w;
                this.right = b.chartWidth - v - c;
                this.len = Math.max(h ? v : m, 0);
                this.pos =
                    h ? c : w
            },
            getExtremes: function() {
                var a = this.isLog;
                return {
                    min: a ? f(this.lin2log(this.min)) : this.min,
                    max: a ? f(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = b ? this.lin2log(this.min) : this.min,
                    b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = c : Infinity === a ? a = b : c > a ? a = c : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (D(a, 0) - 90 * this.side + 720) % 360;
                return 15 <
                    a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    k = D(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (k && c) return "inside" === b[a + "Position"] && (c = -c), [c, k]
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    d = c,
                    h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    v, m = a.rotation,
                    w = this.labelMetrics(),
                    n, e = Number.MAX_VALUE,
                    t, g = function(a) {
                        a /= h || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return f(a * c)
                    };
                b ? (t = !a.staggerLines && !a.step && (C(m) ? [m] : h < D(a.autoRotationLimit, 80) && a.autoRotation)) && p(t, function(a) {
                    var b;
                    if (a === m || a && -90 <= a && 90 >= a) n = g(Math.abs(w.h / Math.sin(r * a))), b = n + Math.abs(a / 360), b < e && (e = b, v = a, d = n)
                }) : a.step || (d = g(w.h));
                this.autoRotation = t;
                this.labelRotation = D(v, m);
                return d
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    h = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / d || !b && (c.style && parseInt(c.style.width, 10) || h && h - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    d = this.ticks,
                    h = this.options.labels,
                    v = h && h.style || {},
                    m = this.horiz,
                    w = this.getSlotWidth(),
                    n = Math.max(1, Math.round(w - 2 * (h.padding || 5))),
                    e = {},
                    g = this.labelMetrics(),
                    x =
                    h.style && h.style.textOverflow,
                    B, z, D = 0,
                    H;
                t(h.rotation) || (e.rotation = h.rotation || 0);
                p(c, function(a) {
                    (a = d[a]) && a.label && a.label.textPxLength > D && (D = a.label.textPxLength)
                });
                this.maxLabelLength = D;
                if (this.autoRotation) D > n && D > g.h ? e.rotation = this.labelRotation : this.labelRotation = 0;
                else if (w && (B = n, !x))
                    for (z = "clip", n = c.length; !m && n--;)
                        if (H = c[n], H = d[H].label) H.styles && "ellipsis" === H.styles.textOverflow ? H.css({
                            textOverflow: "clip"
                        }) : H.textPxLength > w && H.css({
                            width: w + "px"
                        }), H.getBBox().height > this.len / c.length - (g.h -
                            g.f) && (H.specificTextOverflow = "ellipsis");
                e.rotation && (B = D > .5 * a.chartHeight ? .33 * a.chartHeight : D, x || (z = "ellipsis"));
                if (this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation)) e.align = this.labelAlign;
                p(c, function(a) {
                    var b = (a = d[a]) && a.label,
                        c = v.width,
                        k = {};
                    b && (b.attr(e), B && !c && "nowrap" !== v.whiteSpace && (B < b.textPxLength || "SPAN" === b.element.tagName) ? (k.width = B, x || (k.textOverflow = b.specificTextOverflow || z), b.css(k)) : b.styles && b.styles.width && !k.width && !c && b.css({
                            width: null
                        }), delete b.specificTextOverflow,
                        a.rotation = e.rotation)
                });
                this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || C(this.min) && C(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function(a) {
                var b = this.chart.renderer,
                    c = this.horiz,
                    d = this.opposite,
                    k = this.options.title,
                    h;
                this.axisTitle || ((h = k.textAlign) || (h = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: d ? "right" : "left",
                    middle: "center",
                    high: d ? "left" : "right"
                })[k.align]), this.axisTitle = b.text(k.text, 0,
                    0, k.useHTML).attr({
                    zIndex: 7,
                    rotation: k.rotation || 0,
                    align: h
                }).addClass("highcharts-axis-title").css(n(k.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
                k.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new v(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    d = a.options,
                    h = a.tickPositions,
                    v = a.ticks,
                    m = a.horiz,
                    w = a.side,
                    n = b.inverted && !a.isZAxis ? [1, 0, 3, 2][w] : w,
                    t, g,
                    x = 0,
                    B, H = 0,
                    I = d.title,
                    f = d.labels,
                    l = 0,
                    L = b.axisOffset,
                    b = b.clipOffset,
                    r = [-1, 1, 1, -1][w],
                    y = d.className,
                    u = a.axisParent,
                    q = this.tickSize("tick");
                t = a.hasData();
                a.showAxis = g = t || D(d.showEmpty, !0);
                a.staggerLines = a.horiz && f.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: d.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (y || "")).add(u), a.axisGroup = c.g("axis").attr({
                    zIndex: d.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (y || "")).add(u), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: f.zIndex ||
                        7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (y || "")).add(u));
                t || a.isLinked ? (p(h, function(b, c) {
                    a.generateTick(b, c)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === w || 2 === w || {
                    1: "left",
                    3: "right"
                }[w] === a.labelAlign, D(f.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && p(h, function(a) {
                    l = Math.max(v[a].getLabelSize(), l)
                }), a.staggerLines && (l *= a.staggerLines), a.labelOffset = l * (a.opposite ? -1 : 1)) : z(v, function(a, b) {
                    a.destroy();
                    delete v[b]
                });
                I && I.text && !1 !== I.enabled && (a.addTitle(g),
                    g && !1 !== I.reserveSpace && (a.titleOffset = x = a.axisTitle.getBBox()[m ? "height" : "width"], B = I.offset, H = C(B) ? 0 : D(I.margin, m ? 5 : 10)));
                a.renderLine();
                a.offset = r * D(d.offset, L[w]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === w ? -a.labelMetrics().h : 2 === w ? a.tickRotCorr.y : 0;
                H = Math.abs(l) + H;
                l && (H = H - c + r * (m ? D(f.y, a.tickRotCorr.y + 8 * r) : f.x));
                a.axisTitleMargin = D(B, H);
                L[w] = Math.max(L[w], a.axisTitleMargin + x + r * a.offset, H, t && h.length && q ? q[0] + r * a.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[n] = Math.max(b[n],
                    d);
                e(this, "afterGetOffset")
            },
            getLinePath: function(a) {
                var b = this.chart,
                    c = this.opposite,
                    d = this.offset,
                    k = this.horiz,
                    h = this.left + (c ? this.width : 0) + d,
                    d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
                c && (a *= -1);
                return b.renderer.crispLine(["M", k ? this.left : h, k ? d : this.top, "L", k ? b.chartWidth - this.right : h, k ? d : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    d = this.len,
                    h = this.options.title,
                    v = a ? b : c,
                    m = this.opposite,
                    w = this.offset,
                    n = h.x || 0,
                    e = h.y || 0,
                    t = this.axisTitle,
                    g = this.chart.renderer.fontMetrics(h.style && h.style.fontSize, t),
                    t = Math.max(t.getBBox(null, 0).height - g.h - 1, 0),
                    d = {
                        low: v + (a ? 0 : d),
                        middle: v + d / 2,
                        high: v + (a ? d : 0)
                    }[h.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (m ? -1 : 1) * this.axisTitleMargin + [-t, t, g.f, -t][this.side];
                return {
                    x: a ? d + n : b + (m ? this.width :
                        0) + w + n,
                    y: a ? b + e - (m ? this.height : 0) + w : d + e
                }
            },
            renderMinorTick: function(a) {
                var b = this.chart.hasRendered && B(this.oldMin),
                    c = this.minorTicks;
                c[a] || (c[a] = new v(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function(a, b) {
                var c = this.isLinked,
                    d = this.ticks,
                    h = this.chart.hasRendered && B(this.oldMin);
                if (!c || a >= this.min && a <= this.max) d[a] || (d[a] = new v(this, a)), h && d[a].isNew && d[a].render(b, !0, .1), d[a].render(b)
            },
            render: function() {
                var b = this,
                    c = b.chart,
                    d = b.options,
                    h = b.isLog,
                    m = b.isLinked,
                    w = b.tickPositions,
                    n = b.axisTitle,
                    t = b.ticks,
                    g = b.minorTicks,
                    x = b.alternateBands,
                    D = d.stackLabels,
                    I = d.alternateGridColor,
                    f = b.tickmarkOffset,
                    l = b.axisLine,
                    L = b.showAxis,
                    r = F(c.renderer.globalAnimation),
                    y, u;
                b.labelEdge.length = 0;
                b.overlap = !1;
                p([t, g, x], function(a) {
                    z(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || m) b.minorTickInterval && !b.categories && p(b.getMinorTickPositions(), function(a) {
                    b.renderMinorTick(a)
                }), w.length && (p(w, function(a, c) {
                    b.renderTick(a, c)
                }), f && (0 === b.min || b.single) && (t[-1] || (t[-1] = new v(b, -1, null, !0)), t[-1].render(-1))), I && p(w, function(d, k) {
                    u = void 0 !== w[k + 1] ? w[k + 1] + f : b.max - f;
                    0 === k % 2 && d < b.max && u <= b.max + (c.polar ? -f : f) && (x[d] || (x[d] = new a.PlotLineOrBand(b)), y = d + f, x[d].options = {
                        from: h ? b.lin2log(y) : y,
                        to: h ? b.lin2log(u) : u,
                        color: I
                    }, x[d].render(), x[d].isActive = !0)
                }), b._addedPlotLB || (p((d.plotLines || []).concat(d.plotBands || []), function(a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                p([t, g, x], function(a) {
                    var b, d = [],
                        h = r.duration;
                    z(a, function(a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, d.push(b))
                    });
                    H(function() {
                        for (b = d.length; b--;) a[d[b]] && !a[d[b]].isActive && (a[d[b]].destroy(), delete a[d[b]])
                    }, a !== x && c.hasRendered && h ? h : 0)
                });
                l && (l[l.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(l.strokeWidth())
                }), l.isPlaced = !0, l[L ? "show" : "hide"](!0));
                n && L && (d = b.getTitlePosition(), B(d.y) ? (n[n.isNew ? "attr" : "animate"](d), n.isNew = !1) : (n.attr("y", -9999), n.isNew = !0));
                D && D.enabled && b.renderStackTotals();
                b.isDirty = !1;
                e(this, "afterRender")
            },
            redraw: function() {
                this.visible && (this.render(), p(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                p(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    d = b.stacks,
                    k = b.plotLinesAndBands,
                    v;
                e(this, "destroy", {
                    keepEvents: a
                });
                a || h(b);
                z(d, function(a, b) {
                    y(a);
                    d[b] = null
                });
                p([b.ticks, b.minorTicks, b.alternateBands], function(a) {
                    y(a)
                });
                if (k)
                    for (a = k.length; a--;) k[a].destroy();
                p("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "), function(a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (v in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[v] =
                    b.plotLinesAndBandsGroups[v].destroy();
                z(b, function(a, d) {
                    -1 === c(d, b.keepProps) && delete b[d]
                })
            },
            drawCrosshair: function(a, b) {
                var c, d = this.crosshair,
                    h = D(d.snap, !0),
                    k, v = this.cross;
                e(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (C(b) || !h)) {
                    h ? C(b) && (k = D(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    C(k) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : D(b.stackY, b.y)), null, null, null, k) || null);
                    if (!C(c)) {
                        this.hideCrosshair();
                        return
                    }
                    h = this.categories && !this.isRadial;
                    v || (this.cross = v = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h ? "category " : "thin ") + d.className).attr({
                        zIndex: D(d.zIndex, 2)
                    }).add(), v.attr({
                        stroke: d.color || (h ? l("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": D(d.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), d.dashStyle && v.attr({
                        dashstyle: d.dashStyle
                    }));
                    v.show().attr({
                        d: c
                    });
                    h && !d.width && v.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e =
                        a
                } else this.hideCrosshair();
                e(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = w
    }(J);
    (function(a) {
        var E = a.Axis,
            F = a.getMagnitude,
            G = a.normalizeTickInterval,
            q = a.timeUnits;
        E.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        E.prototype.normalizeTimeTickInterval = function(a, f) {
            var l = f || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            f = l[l.length - 1];
            var C = q[f[0]],
                r = f[1],
                y;
            for (y = 0; y < l.length && !(f = l[y], C = q[f[0]], r = f[1], l[y + 1] && a <= (C * r[r.length - 1] + q[l[y + 1][0]]) / 2); y++);
            C === q.year && a < 5 * C && (r = [1, 2, 5]);
            a = G(a / C, r, "year" === f[0] ? Math.max(F(a / C), 1) : 1);
            return {
                unitRange: C,
                count: a,
                unitName: f[0]
            }
        }
    })(J);
    (function(a) {
        var E = a.Axis,
            F = a.getMagnitude,
            G = a.map,
            q = a.normalizeTickInterval,
            l = a.pick;
        E.prototype.getLogTickPositions = function(a, u, C, r) {
            var f = this.options,
                p = this.len,
                d = [];
            r || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), d = this.getLinearTickPositions(a, u, C);
            else if (.08 <= a)
                for (var p = Math.floor(u), e, g, m, b, c, f = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < C + 1 && !c; p++)
                    for (g = f.length, e = 0; e < g && !c; e++) m = this.log2lin(this.lin2log(p) * f[e]), m > u && (!r || b <= C) && void 0 !== b && d.push(b), b > C && (c = !0), b = m;
            else u = this.lin2log(u), C = this.lin2log(C), a = r ? this.getMinorTickInterval() : f.tickInterval, a = l("auto" === a ? null : a, this._minorAutoInterval, f.tickPixelInterval /
                (r ? 5 : 1) * (C - u) / ((r ? p / this.tickPositions.length : p) || 1)), a = q(a, null, F(a)), d = G(this.getLinearTickPositions(a, u, C), this.log2lin), r || (this._minorAutoInterval = a / 5);
            r || (this.tickInterval = a);
            return d
        };
        E.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        E.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(J);
    (function(a, E) {
        var F = a.arrayMax,
            G = a.arrayMin,
            q = a.defined,
            l = a.destroyObjectProperties,
            f = a.each,
            u = a.erase,
            C = a.merge,
            r = a.pick;
        a.PlotLineOrBand = function(a, p) {
            this.axis = a;
            p && (this.options = p, this.id =
                p.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var f = this,
                    p = f.axis,
                    d = p.horiz,
                    e = f.options,
                    g = e.label,
                    m = f.label,
                    b = e.to,
                    c = e.from,
                    x = e.value,
                    B = q(c) && q(b),
                    t = q(x),
                    n = f.svgElem,
                    l = !n,
                    z = [],
                    D = e.color,
                    h = r(e.zIndex, 0),
                    I = e.events,
                    z = {
                        "class": "highcharts-plot-" + (B ? "band " : "line ") + (e.className || "")
                    },
                    H = {},
                    v = p.chart.renderer,
                    w = B ? "bands" : "lines";
                p.isLog && (c = p.log2lin(c), b = p.log2lin(b), x = p.log2lin(x));
                t ? (z.stroke = D, z["stroke-width"] = e.width, e.dashStyle && (z.dashstyle = e.dashStyle)) : B && (D && (z.fill = D), e.borderWidth &&
                    (z.stroke = e.borderColor, z["stroke-width"] = e.borderWidth));
                H.zIndex = h;
                w += "-" + h;
                (D = p.plotLinesAndBandsGroups[w]) || (p.plotLinesAndBandsGroups[w] = D = v.g("plot-" + w).attr(H).add());
                l && (f.svgElem = n = v.path().attr(z).add(D));
                if (t) z = p.getPlotLinePath(x, n.strokeWidth());
                else if (B) z = p.getPlotBandPath(c, b, e);
                else return;
                l && z && z.length ? (n.attr({
                    d: z
                }), I && a.objectEach(I, function(a, b) {
                    n.on(b, function(a) {
                        I[b].apply(f, [a])
                    })
                })) : n && (z ? (n.show(), n.animate({
                    d: z
                })) : (n.hide(), m && (f.label = m = m.destroy())));
                g && q(g.text) && z &&
                    z.length && 0 < p.width && 0 < p.height && !z.isFlat ? (g = C({
                        align: d && B && "center",
                        x: d ? !B && 4 : 10,
                        verticalAlign: !d && B && "middle",
                        y: d ? B ? 16 : 10 : B ? 6 : -4,
                        rotation: d && !B && 90
                    }, g), this.renderLabel(g, z, B, h)) : m && m.hide();
                return f
            },
            renderLabel: function(a, p, d, e) {
                var g = this.label,
                    m = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = e, this.label = g = m.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                e = p.xBounds || [p[1], p[4], d ? p[6] : p[1]];
                p = p.yBounds || [p[2], p[5], d ? p[7] : p[2]];
                d = G(e);
                m = G(p);
                g.align(a, !1, {
                    x: d,
                    y: m,
                    width: F(e) - d,
                    height: F(p) - m
                });
                g.show()
            },
            destroy: function() {
                u(this.axis.plotLinesAndBands, this);
                delete this.axis;
                l(this)
            }
        };
        a.extend(E.prototype, {
            getPlotBandPath: function(a, p) {
                var d = this.getPlotLinePath(p, null, null, !0),
                    e = this.getPlotLinePath(a, null, null, !0),
                    g = [],
                    m = this.horiz,
                    b = 1,
                    c;
                a = a < this.min && p < this.min || a > this.max && p > this.max;
                if (e && d)
                    for (a && (c = e.toString() === d.toString(), b = 0), a = 0; a < e.length; a += 6) m && d[a +
                        1] === e[a + 1] ? (d[a + 1] += b, d[a + 4] += b) : m || d[a + 2] !== e[a + 2] || (d[a + 2] += b, d[a + 5] += b), g.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], d[a + 4], d[a + 5], d[a + 1], d[a + 2], "z"), g.isFlat = c;
                return g
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(f, p) {
                var d = (new a.PlotLineOrBand(this, f)).render(),
                    e = this.userOptions;
                d && (p && (e[p] = e[p] || [], e[p].push(f)), this.plotLinesAndBands.push(d));
                return d
            },
            removePlotBandOrLine: function(a) {
                for (var p =
                        this.plotLinesAndBands, d = this.options, e = this.userOptions, g = p.length; g--;) p[g].id === a && p[g].destroy();
                f([d.plotLines || [], e.plotLines || [], d.plotBands || [], e.plotBands || []], function(d) {
                    for (g = d.length; g--;) d[g].id === a && u(d, d[g])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(J, ea);
    (function(a) {
        var E = a.doc,
            F = a.each,
            G = a.extend,
            q = a.format,
            l = a.isNumber,
            f = a.map,
            u = a.merge,
            C = a.pick,
            r = a.splat,
            y = a.syncTimeout,
            p = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this,
                arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, e) {
                this.chart = a;
                this.options = e;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = e.split && !a.inverted;
                this.shared = e.shared || this.split;
                this.outside = e.outside && !this.split
            },
            cleanSplit: function(a) {
                F(this.chart.series, function(d) {
                    var e = d && d.tt;
                    e && (!e.isActive || a ? d.tt = e.destroy() : e.isActive = !1)
                })
            },
            getLabel: function() {
                var d = this.chart.renderer,
                    e = this.options,
                    g;
                this.label || (this.outside && (this.container = g = a.doc.createElement("div"), g.className =
                    "highcharts-tooltip-container", a.css(g, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: e.style && e.style.pointerEvents
                    }), a.doc.body.appendChild(g), this.renderer = d = new a.Renderer(g, 0, 0)), this.split ? this.label = d.g("tooltip") : (this.label = d.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                    padding: e.padding,
                    r: e.borderRadius
                }), this.label.attr({
                    fill: e.backgroundColor,
                    "stroke-width": e.borderWidth
                }).css(e.style).shadow(e.shadow)), this.outside && (this.label.attr({
                        x: this.distance,
                        y: this.distance
                    }),
                    this.label.xSetter = function(a) {
                        g.style.left = a + "px"
                    }, this.label.ySetter = function(a) {
                        g.style.top = a + "px"
                    }), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                u(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, u(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function(d, e, g, m) {
                var b = this,
                    c = b.now,
                    x = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(d - c.x) || 1 < Math.abs(e - c.y)),
                    B = b.followPointer || 1 < b.len;
                G(c, {
                    x: x ? (2 * c.x + d) / 3 : d,
                    y: x ? (c.y + e) / 2 : e,
                    anchorX: B ? void 0 : x ? (2 * c.anchorX + g) / 3 : g,
                    anchorY: B ? void 0 : x ? (c.anchorY + m) / 2 : m
                });
                b.getLabel().attr(c);
                x && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    b && b.move(d, e, g, m)
                }, 32))
            },
            hide: function(d) {
                var e = this;
                a.clearTimeout(this.hideTimer);
                d = C(d, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = y(function() {
                    e.getLabel()[d ? "fadeOut" : "hide"]();
                    e.isHidden = !0
                }, d))
            },
            getAnchor: function(a, e) {
                var d = this.chart,
                    m = d.pointer,
                    b = d.inverted,
                    c = d.plotTop,
                    x = d.plotLeft,
                    B = 0,
                    t = 0,
                    n, p;
                a = r(a);
                this.followPointer && e ? (void 0 === e.chartX && (e = m.normalize(e)), a = [e.chartX - d.plotLeft, e.chartY - c]) : a[0].tooltipPos ? a = a[0].tooltipPos : (F(a, function(a) {
                    n = a.series.yAxis;
                    p = a.series.xAxis;
                    B += a.plotX + (!b && p ? p.left - x : 0);
                    t += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) +
                        (!b && n ? n.top - c : 0)
                }), B /= a.length, t /= a.length, a = [b ? d.plotWidth - t : B, this.shared && !b && 1 < a.length && e ? e.chartY - c : b ? d.plotHeight - B : t]);
                return f(a, Math.round)
            },
            getPosition: function(a, e, g) {
                var d = this.chart,
                    b = this.distance,
                    c = {},
                    x = d.inverted && g.h || 0,
                    B, t = this.outside,
                    n = t ? E.documentElement.clientWidth - 2 * b : d.chartWidth,
                    p = t ? Math.max(E.body.scrollHeight, E.documentElement.scrollHeight, E.body.offsetHeight, E.documentElement.offsetHeight, E.documentElement.clientHeight) : d.chartHeight,
                    z = d.pointer.chartPosition,
                    D = ["y",
                        p, e, (t ? z.top - b : 0) + g.plotY + d.plotTop, t ? 0 : d.plotTop, t ? p : d.plotTop + d.plotHeight
                    ],
                    h = ["x", n, a, (t ? z.left - b : 0) + g.plotX + d.plotLeft, t ? 0 : d.plotLeft, t ? n : d.plotLeft + d.plotWidth],
                    I = !this.followPointer && C(g.ttBelow, !d.inverted === !!g.negative),
                    H = function(a, d, h, k, v, m) {
                        var w = h < k - b,
                            n = k + b + h < d,
                            e = k - b - h;
                        k += b;
                        if (I && n) c[a] = k;
                        else if (!I && w) c[a] = e;
                        else if (w) c[a] = Math.min(m - h, 0 > e - x ? e : e - x);
                        else if (n) c[a] = Math.max(v, k + x + h > d ? k : k + x);
                        else return !1
                    },
                    v = function(a, d, h, k) {
                        var v;
                        k < b || k > d - b ? v = !1 : c[a] = k < h / 2 ? 1 : k > d - h / 2 ? d - h - 2 : k - h / 2;
                        return v
                    },
                    w = function(a) {
                        var b = D;
                        D = h;
                        h = b;
                        B = a
                    },
                    k = function() {
                        !1 !== H.apply(0, D) ? !1 !== v.apply(0, h) || B || (w(!0), k()) : B ? c.x = c.y = 0 : (w(!0), k())
                    };
                (d.inverted || 1 < this.len) && w();
                k();
                return c
            },
            defaultFormatter: function(a) {
                var d = this.points || r(this),
                    g;
                g = [a.tooltipFooterHeaderFormatter(d[0])];
                g = g.concat(a.bodyFormatter(d));
                g.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return g
            },
            refresh: function(d, e) {
                var g, m = this.options,
                    b, c = d,
                    x, B = {},
                    t = [];
                g = m.formatter || this.defaultFormatter;
                var B = this.shared,
                    n;
                m.enabled && (a.clearTimeout(this.hideTimer),
                    this.followPointer = r(c)[0].series.tooltipOptions.followPointer, x = this.getAnchor(c, e), e = x[0], b = x[1], !B || c.series && c.series.noSharedTooltip ? B = c.getLabelConfig() : (F(c, function(a) {
                        a.setState("hover");
                        t.push(a.getLabelConfig())
                    }), B = {
                        x: c[0].category,
                        y: c[0].y
                    }, B.points = t, c = c[0]), this.len = t.length, B = g.call(B, this), n = c.series, this.distance = C(n.tooltipOptions.distance, 16), !1 === B ? this.hide() : (g = this.getLabel(), this.isHidden && g.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(B, r(d)) : (m.style.width || g.css({
                            width: this.chart.spacingBox.width
                        }),
                        g.attr({
                            text: B && B.join ? B.join("") : B
                        }), g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + C(c.colorIndex, n.colorIndex)), g.attr({
                            stroke: m.borderColor || c.color || n.color || "#666666"
                        }), this.updatePosition({
                            plotX: e,
                            plotY: b,
                            negative: c.negative,
                            ttBelow: c.ttBelow,
                            h: x[2] || 0
                        })), this.isHidden = !1))
            },
            renderSplit: function(d, e) {
                var g = this,
                    m = [],
                    b = this.chart,
                    c = b.renderer,
                    x = !0,
                    B = this.options,
                    t = 0,
                    n, p = this.getLabel(),
                    z = b.plotTop;
                a.isString(d) && (d = [!1, d]);
                F(d.slice(0, e.length + 1), function(a, d) {
                    if (!1 !==
                        a) {
                        d = e[d - 1] || {
                            isHeader: !0,
                            plotX: e[0].plotX
                        };
                        var h = d.series || g,
                            H = h.tt,
                            v = d.series || {},
                            w = "highcharts-color-" + C(d.colorIndex, v.colorIndex, "none");
                        H || (h.tt = H = c.label(null, null, null, "callout", null, null, B.useHTML).addClass("highcharts-tooltip-box " + w + (d.isHeader ? " highcharts-tooltip-header" : "")).attr({
                            padding: B.padding,
                            r: B.borderRadius,
                            fill: B.backgroundColor,
                            stroke: B.borderColor || d.color || v.color || "#333333",
                            "stroke-width": B.borderWidth
                        }).add(p));
                        H.isActive = !0;
                        H.attr({
                            text: a
                        });
                        H.css(B.style).shadow(B.shadow);
                        a = H.getBBox();
                        v = a.width + H.strokeWidth();
                        d.isHeader ? (t = a.height, b.xAxis[0].opposite && (n = !0, z -= t), v = Math.max(0, Math.min(d.plotX + b.plotLeft - v / 2, b.chartWidth + (b.scrollablePixels ? b.scrollablePixels - b.marginRight : 0) - v))) : v = d.plotX + b.plotLeft - C(B.distance, 16) - v;
                        0 > v && (x = !1);
                        a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                        a -= z;
                        d.isHeader && (a = n ? -t : b.plotHeight + t);
                        m.push({
                            target: a,
                            rank: d.isHeader ? 1 : 0,
                            size: h.tt.getBBox().height + 1,
                            point: d,
                            x: v,
                            tt: H
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(m, b.plotHeight +
                    t);
                F(m, function(a) {
                    var c = a.point,
                        d = c.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: x || c.isHeader ? a.x : c.plotX + b.plotLeft + C(B.distance, 16),
                        y: a.pos + z,
                        anchorX: c.isHeader ? c.plotX + b.plotLeft : c.plotX + d.xAxis.pos,
                        anchorY: c.isHeader ? b.plotTop + b.plotHeight / 2 : c.plotY + d.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var d = this.chart,
                    g = this.getLabel(),
                    m = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a),
                    b = a.plotX + d.plotLeft;
                a = a.plotY + d.plotTop;
                var c;
                this.outside && (c = (this.options.borderWidth ||
                    0) + 2 * this.distance, this.renderer.setSize(g.width + c, g.height + c, !1), b += d.pointer.chartPosition.left - m.x, a += d.pointer.chartPosition.top - m.y);
                this.move(Math.round(m.x), Math.round(m.y || 0), b, a)
            },
            getDateFormat: function(a, e, g, m) {
                var b = this.chart.time,
                    c = b.dateFormat("%m-%d %H:%M:%S.%L", e),
                    d, B, t = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    n = "millisecond";
                for (B in p) {
                    if (a === p.week && +b.dateFormat("%w", e) === g && "00:00:00.000" === c.substr(6)) {
                        B = "week";
                        break
                    }
                    if (p[B] > a) {
                        B = n;
                        break
                    }
                    if (t[B] && c.substr(t[B]) !== "01-01 00:00:00.000".substr(t[B])) break;
                    "week" !== B && (n = B)
                }
                B && (d = m[B]);
                return d
            },
            getXDateFormat: function(a, e, g) {
                e = e.dateTimeLabelFormats;
                var d = g && g.closestPointRange;
                return (d ? this.getDateFormat(d, a.x, g.options.startOfWeek, e) : e.day) || e.year
            },
            tooltipFooterHeaderFormatter: function(a, e) {
                e = e ? "footer" : "header";
                var d = a.series,
                    m = d.tooltipOptions,
                    b = m.xDateFormat,
                    c = d.xAxis,
                    x = c && "datetime" === c.options.type && l(a.key),
                    B = m[e + "Format"];
                x && !b && (b = this.getXDateFormat(a, m, c));
                x && b && F(a.point && a.point.tooltipDateKeys || ["key"], function(a) {
                    B = B.replace("{point." +
                        a + "}", "{point." + a + ":" + b + "}")
                });
                return q(B, {
                    point: a,
                    series: d
                }, this.chart.time)
            },
            bodyFormatter: function(a) {
                return f(a, function(a) {
                    var d = a.series.tooltipOptions;
                    return (d[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.attr,
            G = a.charts,
            q = a.color,
            l = a.css,
            f = a.defined,
            u = a.each,
            C = a.extend,
            r = a.find,
            y = a.fireEvent,
            p = a.isNumber,
            d = a.isObject,
            e = a.offset,
            g = a.pick,
            m = a.splat,
            b = a.Tooltip;
        a.Pointer =
            function(a, b) {
                this.init(a, b)
            };
        a.Pointer.prototype = {
            init: function(a, d) {
                this.options = d;
                this.chart = a;
                this.runChartClick = d.chart.events && !!d.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                b && (a.tooltip = new b(a, d.tooltip), this.followTouchMove = g(d.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    d = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (d = g(c.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a &&
                    !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            },
            normalize: function(a, b) {
                var c;
                c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = e(this.chart.container));
                return C(a, {
                    chartX: Math.round(c.pageX - b.left),
                    chartY: Math.round(c.pageY - b.top)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                u(this.chart.axes, function(c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function(a, b,
                m) {
                var c;
                u(a, function(a) {
                    var n = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(m, n);
                    if ((n = d(a, !0)) && !(n = !d(c, !0))) var n = c.distX - a.distX,
                        e = c.dist - a.dist,
                        t = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex),
                        n = 0 < (0 !== n && b ? n : 0 !== e ? e : 0 !== t ? t : c.series.index > a.series.index ? -1 : 1);
                    n && (c = a)
                });
                return c
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function(a, b) {
                var c =
                    a.series,
                    d = c.xAxis,
                    c = c.yAxis,
                    m = g(a.clientX, a.plotX),
                    e = a.shapeArgs;
                if (d && c) return b ? {
                    chartX: d.len + d.pos - m,
                    chartY: c.len + c.pos - a.plotY
                } : {
                    chartX: m + d.pos,
                    chartY: a.plotY + c.pos
                };
                if (e && e.x && e.y) return {
                    chartX: e.x,
                    chartY: e.y
                }
            },
            getHoverData: function(b, m, e, t, n, p, z) {
                var c, h = [],
                    x = z && z.isBoosting;
                t = !(!t || !b);
                z = m && !m.stickyTracking ? [m] : a.grep(e, function(a) {
                    return a.visible && !(!n && a.directTouch) && g(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                m = (c = t ? b : this.findNearestKDPoint(z, n, p)) && c.series;
                c && (n && !m.noSharedTooltip ?
                    (z = a.grep(e, function(a) {
                        return a.visible && !(!n && a.directTouch) && g(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }), u(z, function(a) {
                        var b = r(a.points, function(a) {
                            return a.x === c.x && !a.isNull
                        });
                        d(b) && (x && (b = a.getPoint(b)), h.push(b))
                    })) : h.push(c));
                return {
                    hoverPoint: c,
                    hoverSeries: m,
                    hoverPoints: h
                }
            },
            runPointActions: function(b, d) {
                var c = this.chart,
                    m = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
                    n = m ? m.shared : !1,
                    e = d || c.hoverPoint,
                    x = e && e.series || c.hoverSeries,
                    x = this.getHoverData(e, x, c.series, "touchmove" !==
                        b.type && (!!d || x && x.directTouch && this.isDirectTouch), n, b, {
                            isBoosting: c.isBoosting
                        }),
                    D, e = x.hoverPoint;
                D = x.hoverPoints;
                d = (x = x.hoverSeries) && x.tooltipOptions.followPointer;
                n = n && x && !x.noSharedTooltip;
                if (e && (e !== c.hoverPoint || m && m.isHidden)) {
                    u(c.hoverPoints || [], function(b) {
                        -1 === a.inArray(b, D) && b.setState()
                    });
                    u(D || [], function(a) {
                        a.setState("hover")
                    });
                    if (c.hoverSeries !== x) x.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!e.series) return;
                    e.firePointEvent("mouseOver");
                    c.hoverPoints =
                        D;
                    c.hoverPoint = e;
                    m && m.refresh(n ? D : e, b)
                } else d && m && !m.isHidden && (e = m.getAnchor([{}], b), m.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = E(c.container.ownerDocument, "mousemove", function(b) {
                    var c = G[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                u(c.axes, function(c) {
                    var d = g(c.crosshair.snap, !0),
                        h = d ? a.find(D, function(a) {
                            return a.series[c.coll] === c
                        }) : void 0;
                    h || !d ? c.drawCrosshair(b, h) : c.hideCrosshair()
                })
            },
            reset: function(a, b) {
                var c = this.chart,
                    d = c.hoverSeries,
                    n = c.hoverPoint,
                    e = c.hoverPoints,
                    g = c.tooltip,
                    x = g && g.shared ? e : n;
                a && x && u(m(x), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) g && x && (g.refresh(x), g.shared && e ? u(e, function(a) {
                    a.setState(a.state, !0);
                    a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a);
                    a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a)
                }) : n && (n.setState(n.state, !0), u(c.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, n)
                })));
                else {
                    if (n) n.onMouseOut();
                    e && u(e, function(a) {
                        a.setState()
                    });
                    if (d) d.onMouseOut();
                    g && g.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    u(c.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var c = this.chart,
                    d;
                u(c.series, function(m) {
                    d = a || m.getPlotBox();
                    m.xAxis && m.xAxis.zoomEnabled && m.group && (m.group.attr(d), m.markerGroup && (m.markerGroup.attr(d), m.markerGroup.clip(b ? c.clipRect : null)), m.dataLabelsGroup && m.dataLabelsGroup.attr(d))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    d = a.chartX,
                    m = a.chartY,
                    e = this.zoomHor,
                    g = this.zoomVert,
                    D = b.plotLeft,
                    h = b.plotTop,
                    p = b.plotWidth,
                    H = b.plotHeight,
                    v, w = this.selectionMarker,
                    k = this.mouseDownX,
                    A = this.mouseDownY,
                    f = c.panKey && a[c.panKey + "Key"];
                w && w.touch || (d < D ? d = D : d > D + p && (d = D + p), m < h ? m = h : m > h + H && (m = h + H), this.hasDragged = Math.sqrt(Math.pow(k - d, 2) + Math.pow(A - m, 2)), 10 < this.hasDragged &&
                    (v = b.isInsidePlot(k - D, A - h), b.hasCartesianSeries && (this.zoomX || this.zoomY) && v && !f && !w && (this.selectionMarker = w = b.renderer.rect(D, h, e ? 1 : p, g ? 1 : H, 0).attr({
                        fill: c.selectionMarkerFill || q("#335cad").setOpacity(.25).get(),
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), w && e && (d -= k, w.attr({
                        width: Math.abs(d),
                        x: (0 < d ? 0 : d) + k
                    })), w && g && (d = m - A, w.attr({
                        height: Math.abs(d),
                        y: (0 < d ? 0 : d) + A
                    })), v && !w && c.panning && b.pan(a, c.panning)))
            },
            drop: function(a) {
                var b = this,
                    c = this.chart,
                    d = this.hasPinched;
                if (this.selectionMarker) {
                    var m = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        e = this.selectionMarker,
                        g = e.attr ? e.attr("x") : e.x,
                        D = e.attr ? e.attr("y") : e.y,
                        h = e.attr ? e.attr("width") : e.width,
                        I = e.attr ? e.attr("height") : e.height,
                        H;
                    if (this.hasDragged || d) u(c.axes, function(c) {
                        if (c.zoomEnabled && f(c.min) && (d || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[c.coll]])) {
                            var v = c.horiz,
                                k = "touchend" === a.type ? c.minPixelPadding : 0,
                                e = c.toValue((v ? g : D) + k),
                                v = c.toValue((v ? g + h : D + I) - k);
                            m[c.coll].push({
                                axis: c,
                                min: Math.min(e, v),
                                max: Math.max(e, v)
                            });
                            H = !0
                        }
                    }), H && y(c, "selection", m, function(a) {
                        c.zoom(C(a,
                            d ? {
                                animation: !1
                            } : null))
                    });
                    p(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    d && this.scaleGroups()
                }
                c && p(c.index) && (l(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(b) {
                G[a.hoverChartIndex] && G[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var b =
                    this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var c = G[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var c = this.chart;
                f(a.hoverChartIndex) && G[a.hoverChartIndex] && G[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function(a, b) {
                for (var c; a;) {
                    if (c = F(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") ||
                        this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    d = b.plotLeft,
                    m = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (y(c.series, "click", C(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (C(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - m) && y(b, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    d = b.chart.container,
                    m = d.ownerDocument;
                d.onmousedown = function(a) {
                    b.onContainerMouseDown(a)
                };
                d.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                d.onclick = function(a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = E(d, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = E(m, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (d.ontouchstart = function(a) {
                    b.onContainerTouchStart(a)
                }, d.ontouchmove = function(a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = E(m, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, c) {
                    b[c] = null
                })
            }
        }
    })(J);
    (function(a) {
        var E = a.charts,
            F = a.each,
            G = a.extend,
            q = a.map,
            l = a.noop,
            f = a.pick;
        G(a.Pointer.prototype, {
            pinchTranslate: function(a, f, l, q, p, d) {
                this.zoomHor &&
                    this.pinchTranslateDirection(!0, a, f, l, q, p, d);
                this.zoomVert && this.pinchTranslateDirection(!1, a, f, l, q, p, d)
            },
            pinchTranslateDirection: function(a, f, l, q, p, d, e, g) {
                var m = this.chart,
                    b = a ? "x" : "y",
                    c = a ? "X" : "Y",
                    x = "chart" + c,
                    B = a ? "width" : "height",
                    t = m["plot" + (a ? "Left" : "Top")],
                    n, r, z = g || 1,
                    D = m.inverted,
                    h = m.bounds[a ? "h" : "v"],
                    I = 1 === f.length,
                    H = f[0][x],
                    v = l[0][x],
                    w = !I && f[1][x],
                    k = !I && l[1][x],
                    A;
                l = function() {
                    !I && 20 < Math.abs(H - w) && (z = g || Math.abs(v - k) / Math.abs(H - w));
                    r = (t - v) / z + H;
                    n = m["plot" + (a ? "Width" : "Height")] / z
                };
                l();
                f = r;
                f < h.min ?
                    (f = h.min, A = !0) : f + n > h.max && (f = h.max - n, A = !0);
                A ? (v -= .8 * (v - e[b][0]), I || (k -= .8 * (k - e[b][1])), l()) : e[b] = [v, k];
                D || (d[b] = r - t, d[B] = n);
                d = D ? 1 / z : z;
                p[B] = n;
                p[b] = f;
                q[D ? a ? "scaleY" : "scaleX" : "scale" + c] = z;
                q["translate" + c] = d * t + (v - d * H)
            },
            pinch: function(a) {
                var u = this,
                    r = u.chart,
                    y = u.pinchDown,
                    p = a.touches,
                    d = p.length,
                    e = u.lastValidTouch,
                    g = u.hasZoom,
                    m = u.selectionMarker,
                    b = {},
                    c = 1 === d && (u.inClass(a.target, "highcharts-tracker") && r.runTrackerClick || u.runChartClick),
                    x = {};
                1 < d && (u.initiated = !0);
                g && u.initiated && !c && a.preventDefault();
                q(p, function(a) {
                    return u.normalize(a)
                });
                "touchstart" === a.type ? (F(p, function(a, b) {
                        y[b] = {
                            chartX: a.chartX,
                            chartY: a.chartY
                        }
                    }), e.x = [y[0].chartX, y[1] && y[1].chartX], e.y = [y[0].chartY, y[1] && y[1].chartY], F(r.axes, function(a) {
                        if (a.zoomEnabled) {
                            var b = r.bounds[a.horiz ? "h" : "v"],
                                c = a.minPixelPadding,
                                d = a.toPixels(f(a.options.min, a.dataMin)),
                                m = a.toPixels(f(a.options.max, a.dataMax)),
                                e = Math.max(d, m);
                            b.min = Math.min(a.pos, Math.min(d, m) - c);
                            b.max = Math.max(a.pos + a.len, e + c)
                        }
                    }), u.res = !0) : u.followTouchMove && 1 === d ? this.runPointActions(u.normalize(a)) :
                    y.length && (m || (u.selectionMarker = m = G({
                        destroy: l,
                        touch: !0
                    }, r.plotBox)), u.pinchTranslate(y, p, b, m, x, e), u.hasPinched = g, u.scaleGroups(b, x), u.res && (u.res = !1, this.reset(!1, 0)))
            },
            touch: function(l, q) {
                var r = this.chart,
                    u, p;
                if (r.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = r.index;
                1 === l.touches.length ? (l = this.normalize(l), (p = r.isInsidePlot(l.chartX - r.plotLeft, l.chartY - r.plotTop)) && !r.openMenu ? (q && this.runPointActions(l), "touchmove" === l.type && (q = this.pinchDown, u = q[0] ?
                    4 <= Math.sqrt(Math.pow(q[0].chartX - l.chartX, 2) + Math.pow(q[0].chartY - l.chartY, 2)) : !1), f(u, !0) && this.pinch(l)) : q && this.reset()) : 2 === l.touches.length && this.pinch(l)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(f) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(f)
            }
        })
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.charts,
            G = a.css,
            q = a.doc,
            l = a.extend,
            f = a.noop,
            u = a.Pointer,
            C = a.removeEvent,
            r = a.win,
            y = a.wrap;
        if (!a.hasTouch && (r.PointerEvent || r.MSPointerEvent)) {
            var p = {},
                d = !!r.PointerEvent,
                e = function() {
                    var d = [];
                    d.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(p, function(a) {
                        d.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return d
                },
                g = function(d, b, c, g) {
                    "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (g(d), g = F[a.hoverChartIndex].pointer, g[b]({
                        type: c,
                        target: d.currentTarget,
                        preventDefault: f,
                        touches: e()
                    }))
                };
            l(u.prototype, {
                onContainerPointerDown: function(a) {
                    g(a, "onContainerTouchStart",
                        "touchstart",
                        function(a) {
                            p[a.pointerId] = {
                                pageX: a.pageX,
                                pageY: a.pageY,
                                target: a.currentTarget
                            }
                        })
                },
                onContainerPointerMove: function(a) {
                    g(a, "onContainerTouchMove", "touchmove", function(a) {
                        p[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        p[a.pointerId].target || (p[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    g(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete p[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(q, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            y(u.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && G(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            y(u.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(E)
            });
            y(u.prototype, "destroy", function(a) {
                this.batchMSEvents(C);
                a.call(this)
            })
        }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.css,
            G = a.discardElement,
            q = a.defined,
            l = a.each,
            f = a.fireEvent,
            u = a.isFirefox,
            C = a.marginNames,
            r = a.merge,
            y = a.pick,
            p = a.setAnimation,
            d = a.stableSort,
            e = a.win,
            g = a.wrap;
        a.Legend = function(a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function(a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), E(this.chart, "endResize", function() {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = E(this.chart, "render", function() {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender &&
                    this.unchartrender())
            },
            setOptions: function(a) {
                var b = y(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = r(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = y(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function(a, b) {
                var c = this.chart;
                this.setOptions(r(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                y(b, !0) && c.redraw();
                f(this,
                    "afterUpdate")
            },
            colorizeItem: function(a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options,
                    d = a.legendItem,
                    m = a.legendLine,
                    e = a.legendSymbol,
                    n = this.itemHiddenStyle.color,
                    c = b ? c.itemStyle.color : n,
                    g = b ? a.color || n : n,
                    z = a.options && a.options.marker,
                    p = {
                        fill: g
                    };
                d && d.css({
                    fill: c,
                    color: c
                });
                m && m.attr({
                    stroke: g
                });
                e && (z && e.isMarker && (p = a.pointAttribs(), b || (p.stroke = p.fill = n)), e.attr(p));
                f(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            },
            positionItems: function() {
                l(this.allItems,
                    this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    d = a._legendItemPos,
                    m = d[0],
                    d = d[1],
                    e = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[q(a.translateY) ? "animate" : "attr"]({
                    translateX: b ? m : this.legendWidth - m - 2 * c - 4,
                    translateY: d
                });
                e && (e.x = m, e.y = d)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                l(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && G(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] &&
                        (this[a] = this[a].destroy())
                }
                l(this.getAllItems(), function(b) {
                    l(["legendItem", "legendGroup"], a, b)
                });
                l("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    b, c = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                a && (b = a.translateY, l(this.allItems, function(e) {
                    var m = e.checkbox,
                        n;
                    m && (n = b + d + m.y + (this.scrollOffset || 0) + 3, F(m, {
                        left: a.translateX + e.checkboxOffset + m.x - 20 + "px",
                        top: n + "px",
                        display: n > b - 6 && n < b + c - 6 ?
                            "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    b = this.padding,
                    c = a.title,
                    d = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(c.style).add(this.group)), a = this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: d
                }));
                this.titleHeight = d
            },
            setText: function(d) {
                var b = this.options;
                d.legendItem.attr({
                    text: b.labelFormat ? a.format(b.labelFormat, d, this.chart.time) : b.labelFormatter.call(d)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    d = this.options,
                    e = this.symbolWidth,
                    m = d.symbolPadding,
                    n = this.itemStyle,
                    g = this.itemHiddenStyle,
                    z = "horizontal" === d.layout ? y(d.itemDistance, 20) : 0,
                    p = !d.rtl,
                    h = a.legendItem,
                    f = !a.series,
                    H = !f && a.series.drawLegendSymbol ? a.series : a,
                    v = H.options,
                    v = this.createCheckboxForItem && v && v.showCheckbox,
                    z = e + m + z + (v ? 20 : 0),
                    w = d.useHTML,
                    k = a.options.className;
                h || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + H.type + "-series highcharts-color-" + a.colorIndex + (k ? " " + k :
                    "") + (f ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = h = c.text("", p ? e + m : -m, this.baseline || 0, w).css(r(a.visible ? n : g)).attr({
                    align: p ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (e = n.fontSize, this.fontMetrics = c.fontMetrics(e, h), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, h.attr("y", this.baseline)), this.symbolHeight = d.symbolHeight || this.fontMetrics.f, H.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, h, w), v && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                n.width || h.css({
                    width: (d.itemWidth || d.width || b.spacingBox.width) - z
                });
                this.setText(a);
                b = h.getBBox();
                a.itemWidth = a.checkboxOffset = d.itemWidth || a.legendItemWidth || b.width + z;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function(a) {
                var b = this.options,
                    c = this.padding,
                    d = "horizontal" === b.layout,
                    e = a.itemHeight,
                    m = b.itemMarginBottom ||
                    0,
                    n = this.itemMarginTop,
                    g = d ? y(b.itemDistance, 20) : 0,
                    z = b.width,
                    p = z || this.chart.spacingBox.width - 2 * c - b.x,
                    b = b.alignColumns && this.totalItemWidth > p ? this.maxItemWidth : a.itemWidth;
                d && this.itemX - c + b > p && (this.itemX = c, this.itemY += n + this.lastLineHeight + m, this.lastLineHeight = 0);
                this.lastItemY = n + this.itemY + m;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                d ? this.itemX += b : (this.itemY += n + e + m, this.lastLineHeight = e);
                this.offsetWidth = z || Math.max((d ? this.itemX - c - (a.checkbox ?
                    0 : g) : b) + c, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                l(this.chart.series, function(b) {
                    var c = b && b.options;
                    b && y(c.showInLegend, q(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                f(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, b) {
                var c = this.chart,
                    d = this.options,
                    e = this.getAlignment();
                e && l([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(m, n) {
                    m.test(e) && !q(a[n]) && (c[C[n]] = Math.max(c[C[n]], c.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * d[n % 2 ? "x" : "y"] + y(d.margin, 12) + b[n] + (0 === n && void 0 !== c.options.title.margin ? c.titleOffset + c.options.title.margin : 0)))
                })
            },
            proximatePositions: function() {
                var d = this.chart,
                    b = [],
                    c = "left" === this.options.align;
                l(this.allItems, function(e) {
                    var m, g;
                    m = c;
                    e.xAxis && e.points && (e.xAxis.options.reversed && (m = !m), m = a.find(m ? e.points : e.points.slice(0).reverse(), function(b) {
                        return a.isNumber(b.plotY)
                    }), g = e.legendGroup.getBBox().height, b.push({
                        target: e.visible ? (m ? m.plotY : e.xAxis.height) - .3 * g : d.plotHeight,
                        size: g,
                        item: e
                    }))
                }, this);
                a.distribute(b, d.plotHeight);
                l(b, function(a) {
                    a.item._legendItemPos[1] = d.plotTop - d.spacing[0] + a.pos
                })
            },
            render: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.group,
                    e, g, t, n = this.box,
                    p = this.options,
                    z = this.padding;
                this.itemX = z;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth =
                    0;
                c || (this.group = c = b.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(c), this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                e = this.getAllItems();
                d(e, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                p.reversed && e.reverse();
                this.allItems = e;
                this.display = g = !!e.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                l(e, this.renderItem, this);
                l(e, this.layoutItem, this);
                e = (p.width || this.offsetWidth) +
                    z;
                t = this.lastItemY + this.lastLineHeight + this.titleHeight;
                t = this.handleOverflow(t);
                t += z;
                n || (this.box = n = b.rect().addClass("highcharts-legend-box").attr({
                    r: p.borderRadius
                }).add(c), n.isNew = !0);
                n.attr({
                    stroke: p.borderColor,
                    "stroke-width": p.borderWidth || 0,
                    fill: p.backgroundColor || "none"
                }).shadow(p.shadow);
                0 < e && 0 < t && (n[n.isNew ? "attr" : "animate"](n.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: e,
                    height: t
                }, n.strokeWidth())), n.isNew = !1);
                n[g ? "show" : "hide"]();
                this.legendWidth = e;
                this.legendHeight = t;
                g && (b = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) &&
                    (b = r(b, {
                        y: b.y + a.titleOffset + a.options.title.margin
                    })), c.align(r(p, {
                        width: e,
                        height: t,
                        verticalAlign: this.proximate ? "top" : p.verticalAlign
                    }), !0, b));
                this.proximate || this.positionItems()
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    d = c.renderer,
                    e = this.options,
                    m = e.y,
                    n = this.padding,
                    c = c.spacingBox.height + ("top" === e.verticalAlign ? -m : m) - n,
                    m = e.maxHeight,
                    g, p = this.clipRect,
                    f = e.navigation,
                    h = y(f.animation, !0),
                    I = f.arrowSize || 12,
                    H = this.nav,
                    v = this.pages,
                    w, k = this.allItems,
                    A = function(a) {
                        "number" === typeof a ? p.attr({
                                height: a
                            }) :
                            p && (b.clipRect = p.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + n + "px,9999px," + (n + a) + "px,0)" : "auto")
                    };
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (c /= 2);
                m && (c = Math.min(c, m));
                v.length = 0;
                a > c && !1 !== f.enabled ? (this.clipHeight = g = Math.max(c - 20 - this.titleHeight - n, 0), this.currentPage = y(this.currentPage, 1), this.fullHeight = a, l(k, function(a, b) {
                    var c = a._legendItemPos[1],
                        d = Math.round(a.legendItem.getBBox().height),
                        h = v.length;
                    if (!h || c - v[h - 1] > g &&
                        (w || c) !== v[h - 1]) v.push(w || c), h++;
                    a.pageIx = h - 1;
                    w && (k[b - 1].pageIx = h - 1);
                    b === k.length - 1 && c + d - v[h - 1] > g && (v.push(c), a.pageIx = h);
                    c !== w && (w = c)
                }), p || (p = b.clipRect = d.clipRect(0, n, 9999, 0), b.contentGroup.clip(p)), A(g), H || (this.nav = H = d.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = d.symbol("triangle", 0, 0, I, I).on("click", function() {
                    b.scroll(-1, h)
                }).add(H), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation").css(f.style).add(H), this.down = d.symbol("triangle-down", 0, 0, I, I).on("click", function() {
                    b.scroll(1,
                        h)
                }).add(H)), b.scroll(0), a = c) : H && (A(), this.nav = H.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, b) {
                var c = this.pages,
                    d = c.length;
                a = this.currentPage + a;
                var e = this.clipHeight,
                    m = this.options.navigation,
                    n = this.pager,
                    g = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== b && p(b, this.chart), this.nav.attr({
                        translateX: g,
                        translateY: e + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    n.attr({
                        text: a + "/" + d
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? m.inactiveColor : m.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === d ? m.inactiveColor : m.activeColor
                    }).css({
                        cursor: a === d ? "default" : "pointer"
                    }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, b) {
                var c = a.symbolHeight,
                    d = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, d ? c : a.symbolWidth, c, y(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    c = b.marker,
                    d = a.symbolWidth,
                    e = a.symbolHeight,
                    g = e / 2,
                    n = this.chart.renderer,
                    m = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var p;
                p = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle &&
                    (p.dashstyle = b.dashStyle);
                this.legendLine = n.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(p).add(m);
                c && !1 !== c.enabled && d && (b = Math.min(y(c.radius, g), g), 0 === this.symbol.indexOf("url") && (c = r(c, {
                    width: e,
                    height: e
                }), b = 0), this.legendSymbol = c = n.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(m), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(e.navigator.userAgent) || u) && g(a.Legend.prototype, "positionItem", function(a, b) {
            var c = this,
                d = function() {
                    b._legendItemPos && a.call(c, b)
                };
            d();
            setTimeout(d)
        })
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.animate,
            G = a.animObject,
            q = a.attr,
            l = a.doc,
            f = a.Axis,
            u = a.createElement,
            C = a.defaultOptions,
            r = a.discardElement,
            y = a.charts,
            p = a.css,
            d = a.defined,
            e = a.each,
            g = a.extend,
            m = a.find,
            b = a.fireEvent,
            c = a.grep,
            x = a.isNumber,
            B = a.isObject,
            t = a.isString,
            n = a.Legend,
            L = a.marginNames,
            z = a.merge,
            D = a.objectEach,
            h = a.Pointer,
            I = a.pick,
            H = a.pInt,
            v = a.removeEvent,
            w = a.seriesTypes,
            k = a.splat,
            A = a.syncTimeout,
            Q = a.win,
            T = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a,
            b, c) {
            return new T(a, b, c)
        };
        g(T.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (t(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(c, d) {
                var h, k, v = c.series,
                    e = c.plotOptions || {};
                b(this, "init", {
                    args: arguments
                }, function() {
                    c.series = null;
                    h = z(C, c);
                    for (k in h.plotOptions) h.plotOptions[k].tooltip = e[k] && z(e[k].tooltip) || void 0;
                    h.tooltip.userOptions = c.chart && c.chart.forExport && c.tooltip.userOptions || c.tooltip;
                    h.series = c.series = v;
                    this.userOptions = c;
                    var w =
                        h.chart,
                        n = w.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = d;
                    this.isResizing = 0;
                    this.options = h;
                    this.axes = [];
                    this.series = [];
                    this.time = c.time && a.keys(c.time).length ? new a.Time(c.time) : a.time;
                    this.hasCartesianSeries = w.showAxes;
                    var g = this;
                    g.index = y.length;
                    y.push(g);
                    a.chartCount++;
                    n && D(n, function(a, b) {
                        E(g, b, a)
                    });
                    g.xAxis = [];
                    g.yAxis = [];
                    g.pointCount = g.colorCounter = g.symbolCounter = 0;
                    b(g, "afterInit");
                    g.firstRender()
                })
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = w[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function(a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(c) {
                b(this, "beforeRedraw");
                var d = this.axes,
                    h = this.series,
                    k = this.pointer,
                    v = this.legend,
                    w = this.userOptions.legend,
                    n = this.isDirtyLegend,
                    m, p, A = this.hasCartesianSeries,
                    H = this.isDirtyBox,
                    z, t = this.renderer,
                    f = t.isHidden(),
                    D = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(c, this);
                f && this.temporaryDisplay();
                this.layOutTitles();
                for (c = h.length; c--;)
                    if (z = h[c], z.options.stacking && (m = !0, z.isDirty)) {
                        p = !0;
                        break
                    }
                if (p)
                    for (c = h.length; c--;) z = h[c], z.options.stacking && (z.isDirty = !0);
                e(h, function(a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), n = !0) : w && (w.labelFormatter || w.labelFormat) && (n = !0));
                    a.isDirtyData && b(a, "updatedData")
                });
                n && v && v.options.enabled &&
                    (v.render(), this.isDirtyLegend = !1);
                m && this.getStacks();
                A && e(d, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                A && (e(d, function(a) {
                    a.isDirty && (H = !0)
                }), e(d, function(a) {
                    var c = a.min + "," + a.max;
                    a.extKey !== c && (a.extKey = c, D.push(function() {
                        b(a, "afterSetExtremes", g(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (H || m) && a.redraw()
                }));
                H && this.drawChartBox();
                b(this, "predraw");
                e(h, function(a) {
                    (H || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                k && k.reset(!0);
                t.draw();
                b(this, "redraw");
                b(this,
                    "render");
                f && this.temporaryDisplay(!0);
                e(D, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                var c, d = this.series,
                    h;
                c = m(this.axes, b) || m(this.series, b);
                for (h = 0; !c && h < d.length; h++) c = m(d[h].points || [], b);
                return c
            },
            getAxes: function() {
                var a = this,
                    c = this.options,
                    d = c.xAxis = k(c.xAxis || {}),
                    c = c.yAxis = k(c.yAxis || {});
                b(this, "getAxes");
                e(d, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                e(c, function(a, b) {
                    a.index = b
                });
                d = d.concat(c);
                e(d, function(b) {
                    new f(a, b)
                });
                b(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                e(this.series, function(b) {
                    a = a.concat(c(b.data || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return c(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var d = this,
                    h = d.options,
                    k;
                k = h.title = z({
                    style: {
                        color: "#333333",
                        fontSize: h.isStock ? "16px" : "18px"
                    }
                }, h.title, a);
                h = h.subtitle = z({
                    style: {
                        color: "#666666"
                    }
                }, h.subtitle, b);
                e([
                    ["title", a, k],
                    ["subtitle", b, h]
                ], function(a, b) {
                    var c = a[0],
                        h = d[c],
                        k = a[1];
                    a = a[2];
                    h && k && (d[c] = h = h.destroy());
                    a && !h && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function(a) {
                        d.setTitle(!b && a, b && a)
                    }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, d = this.renderer,
                    h = this.spacingBox;
                e(["title", "subtitle"], function(a) {
                    var c = this[a],
                        k = this.options[a];
                    a = "title" === a ? -3 : k.verticalAlign ? 0 : b + 2;
                    var v;
                    c && (v = k.style.fontSize, v = d.fontMetrics(v, c).b, c.css({
                        width: (k.width || h.width + k.widthAdjust) + "px"
                    }).align(g({
                        y: a +
                            v
                    }, k), !1, "spacingBox"), k.floating || k.verticalAlign || (b = Math.ceil(b + c.getBBox(k.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && I(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    h = this.renderTo;
                d(c) || (this.containerWidth = a.getStyle(h, "width"));
                d(b) || (this.containerHeight = a.getStyle(h, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth ||
                    600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (l.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        l.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, l.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === l.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var c, d = this.options,
                    h = d.chart,
                    k, v;
                c = this.renderTo;
                var e = a.uniqueKey(),
                    w;
                c || (this.renderTo = c = h.renderTo);
                t(c) && (this.renderTo = c = l.getElementById(c));
                c || a.error(13, !0);
                k = H(q(c, "data-highcharts-chart"));
                x(k) && y[k] && y[k].hasRendered && y[k].destroy();
                q(c, "data-highcharts-chart", this.index);
                c.innerHTML = "";
                h.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                k = this.chartWidth;
                v = this.chartHeight;
                w = g({
                    position: "relative",
                    overflow: "hidden",
                    width: k + "px",
                    height: v + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, h.style);
                this.container = c = u("div", {
                    id: e
                }, w, c);
                this._cursor = c.style.cursor;
                this.renderer =
                    new(a[h.renderer] || a.Renderer)(c, k, v, null, h.forExport, d.exporting && d.exporting.allowHTML);
                this.setClassName(h.className);
                this.renderer.setStyle(h.style);
                this.renderer.chartIndex = this.index;
                b(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var c = this.spacing,
                    h = this.margin,
                    k = this.titleOffset;
                this.resetMargins();
                k && !d(h[0]) && (this.plotTop = Math.max(this.plotTop, k + this.options.title.margin + c[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(h, c);
                b(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && e(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                e(L, function(h, k) {
                    d(c[k]) || (a[h] += b[k])
                });
                a.setChartSize()
            },
            reflow: function(b) {
                var c = this,
                    h = c.options.chart,
                    k = c.renderTo,
                    v = d(h.width) && d(h.height),
                    e = h.width || a.getStyle(k, "width"),
                    h = h.height || a.getStyle(k, "height"),
                    k = b ? b.target : Q;
                if (!v && !c.isPrinting && e && h && (k === Q || k === l)) {
                    if (e !== c.containerWidth || h !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout =
                        A(function() {
                            c.container && c.setSize(void 0, void 0, !1)
                        }, b ? 100 : 0);
                    c.containerWidth = e;
                    c.containerHeight = h
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = E(Q, "resize", function(a) {
                    b.reflow(a)
                }), E(this, "destroy", this.unbindReflow))
            },
            setSize: function(c, d, h) {
                var k = this,
                    v = k.renderer;
                k.isResizing += 1;
                a.setAnimation(h, k);
                k.oldChartHeight = k.chartHeight;
                k.oldChartWidth = k.chartWidth;
                void 0 !== c && (k.options.chart.width =
                    c);
                void 0 !== d && (k.options.chart.height = d);
                k.getChartSize();
                c = v.globalAnimation;
                (c ? F : p)(k.container, {
                    width: k.chartWidth + "px",
                    height: k.chartHeight + "px"
                }, c);
                k.setChartSize(!0);
                v.setSize(k.chartWidth, k.chartHeight, h);
                e(k.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                k.isDirtyLegend = !0;
                k.isDirtyBox = !0;
                k.layOutTitles();
                k.getMargins();
                k.redraw(h);
                k.oldChartHeight = null;
                b(k, "resize");
                A(function() {
                    k && b(k, "endResize", null, function() {
                        --k.isResizing
                    })
                }, G(c).duration)
            },
            setChartSize: function(a) {
                var c = this.inverted,
                    d = this.renderer,
                    h = this.chartWidth,
                    k = this.chartHeight,
                    v = this.options.chart,
                    w = this.spacing,
                    n = this.clipOffset,
                    g, m, p, A;
                this.plotLeft = g = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(h - g - this.marginRight));
                this.plotHeight = A = Math.max(0, Math.round(k - m - this.marginBottom));
                this.plotSizeX = c ? A : p;
                this.plotSizeY = c ? p : A;
                this.plotBorderWidth = v.plotBorderWidth || 0;
                this.spacingBox = d.spacingBox = {
                    x: w[3],
                    y: w[0],
                    width: h - w[3] - w[1],
                    height: k - w[0] - w[2]
                };
                this.plotBox =
                    d.plotBox = {
                        x: g,
                        y: m,
                        width: p,
                        height: A
                    };
                h = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(Math.max(h, n[3]) / 2);
                d = Math.ceil(Math.max(h, n[0]) / 2);
                this.clipBox = {
                    x: c,
                    y: d,
                    width: Math.floor(this.plotSizeX - Math.max(h, n[1]) / 2 - c),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(h, n[2]) / 2 - d))
                };
                a || e(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                b(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                e(["margin", "spacing"], function(c) {
                    var d = b[c],
                        h = B(d) ? d : [d, d, d, d];
                    e(["Top", "Right", "Bottom", "Left"], function(d, k) {
                        a[c][k] = I(b[c + d], h[k])
                    })
                });
                e(L, function(b, c) {
                    a[b] = I(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    c = this.renderer,
                    d = this.chartWidth,
                    h = this.chartHeight,
                    k = this.chartBackground,
                    v = this.plotBackground,
                    e = this.plotBorder,
                    w, n = this.plotBGImage,
                    g = a.backgroundColor,
                    m = a.plotBackgroundColor,
                    p = a.plotBackgroundImage,
                    A, H = this.plotLeft,
                    z = this.plotTop,
                    t = this.plotWidth,
                    f = this.plotHeight,
                    D = this.plotBox,
                    I = this.clipRect,
                    l = this.clipBox,
                    x = "animate";
                k || (this.chartBackground = k = c.rect().addClass("highcharts-background").add(), x = "attr");
                w = a.borderWidth || 0;
                A = w + (a.shadow ? 8 : 0);
                g = {
                    fill: g || "none"
                };
                if (w || k["stroke-width"]) g.stroke = a.borderColor, g["stroke-width"] = w;
                k.attr(g).shadow(a.shadow);
                k[x]({
                    x: A / 2,
                    y: A / 2,
                    width: d - A - w % 2,
                    height: h - A - w % 2,
                    r: a.borderRadius
                });
                x = "animate";
                v || (x = "attr", this.plotBackground = v = c.rect().addClass("highcharts-plot-background").add());
                v[x](D);
                v.attr({
                    fill: m || "none"
                }).shadow(a.plotShadow);
                p && (n ? n.animate(D) : this.plotBGImage = c.image(p, H, z, t, f).add());
                I ? I.animate({
                    width: l.width,
                    height: l.height
                }) : this.clipRect = c.clipRect(l);
                x = "animate";
                e || (x = "attr", this.plotBorder = e = c.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                e.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                e[x](e.crisp({
                    x: H,
                    y: z,
                    width: t,
                    height: f
                }, -e.strokeWidth()));
                this.isDirtyBox = !1;
                b(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, d = a.options.series,
                    h, k;
                e(["inverted", "angular", "polar"], function(v) {
                    c = w[b.type || b.defaultSeriesType];
                    k = b[v] || c && c.prototype[v];
                    for (h = d && d.length; !k && h--;)(c = w[d[h].type]) && c.prototype[v] && (k = !0);
                    a[v] = k
                })
            },
            linkSeries: function() {
                var a = this,
                    c = a.series;
                e(c, function(a) {
                    a.linkedSeries.length = 0
                });
                e(c, function(b) {
                    var c = b.options.linkedTo;
                    t(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = I(b.options.visible, c.options.visible, b.visible))
                });
                b(this, "afterLinkSeries")
            },
            renderSeries: function() {
                e(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && e(b.items, function(c) {
                    var d = g(b.style, c.style),
                        h = H(d.left) + a.plotLeft,
                        k = H(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, h, k).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    d, h, k;
                this.setTitle();
                this.legend = new n(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                e(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                h = 1.1 < c / this.plotWidth;
                k = 1.05 < d / this.plotHeight;
                if (h || k) e(a, function(a) {
                    (a.horiz && h || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && e(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive &&
                    this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = z(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (Q.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var c = this,
                    d = c.axes,
                    h = c.series,
                    k = c.container,
                    w, g = k && k.parentNode;
                b(c, "destroy");
                c.renderer.forExport ? a.erase(y, c) : y[c.index] = void 0;
                a.chartCount--;
                c.renderTo.removeAttribute("data-highcharts-chart");
                v(c);
                for (w = d.length; w--;) d[w] = d[w].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (w = h.length; w--;) h[w] = h[w].destroy();
                e("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var b = c[a];
                    b &&
                        b.destroy && (c[a] = b.destroy())
                });
                k && (k.innerHTML = "", v(k), g && r(k));
                D(c, function(a, b) {
                    delete c[b]
                })
            },
            firstRender: function() {
                var a = this,
                    c = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    e(c.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    b(a, "beforeRender");
                    h && (a.pointer = new h(a, c));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                e([this.callback].concat(this.callbacks),
                    function(a) {
                        a && void 0 !== this.index && a.apply(this, [this])
                    }, this);
                b(this, "load");
                b(this, "render");
                d(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.Chart,
            G = a.each;
        E(F, "afterSetChartSize", function(q) {
            var l = this.options.chart.scrollablePlotArea;
            (l = l && l.minWidth) && !this.renderer.forExport && (this.scrollablePixels = l = Math.max(0, l - this.chartWidth)) && (this.plotWidth += l, this.clipBox.width += l, q.skipAxes || G(this.axes, function(f) {
                1 === f.side ? f.getPlotLinePath =
                    function() {
                        var l = this.right,
                            q;
                        this.right = l - f.chart.scrollablePixels;
                        q = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this.right = l;
                        return q
                    } : (f.setAxisSize(), f.setAxisTranslation())
            }))
        });
        E(F, "render", function() {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        F.prototype.setUpScrolling = function() {
            this.scrollingContainer = a.createElement("div", {
                    className: "highcharts-scrolling"
                }, {
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch"
                },
                this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        F.prototype.applyFixed = function() {
            var q = this.container,
                l, f, u = !this.fixedDiv;
            u && (this.fixedDiv = a.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer =
                l = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = l.path().attr({
                    fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), a.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"], function(f) {
                    a.each(q.querySelectorAll(f),
                        function(a) {
                            (a.namespaceURI === l.SVG_NS ? l.box : l.box.parentNode).appendChild(a);
                            a.style.pointerEvents = "auto"
                        })
                }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            f = this.chartWidth + this.scrollablePixels;
            a.stop(this.container);
            this.container.style.width = f + "px";
            this.renderer.boxWrapper.attr({
                width: f,
                height: this.chartHeight,
                viewBox: [0, 0, f, this.chartHeight].join(" ")
            });
            this.chartBackground.attr({
                width: f
            });
            u && (f = this.options.chart.scrollablePlotArea, f.scrollPositionX && (this.scrollingContainer.scrollLeft =
                this.scrollablePixels * f.scrollPositionX));
            u = this.axisOffset;
            f = this.plotTop - u[0] - 1;
            var u = this.plotTop + this.plotHeight + u[2],
                C = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, f, "L", this.plotLeft - 1, f, "L", this.plotLeft - 1, u, "L", 0, u, "Z", "M", C, f, "L", this.chartWidth, f, "L", this.chartWidth, u, "L", C, u, "Z"] : ["M", 0, 0]
            })
        }
    })(J);
    (function(a) {
        var E, F = a.each,
            G = a.extend,
            q = a.erase,
            l = a.fireEvent,
            f = a.format,
            u = a.isArray,
            C = a.isNumber,
            r = a.pick,
            y = a.removeEvent;
        a.Point =
            E = function() {};
        a.Point.prototype = {
            init: function(a, d, e) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, e);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length, e = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : e = a.colorIndex;
                this.colorIndex = r(this.colorIndex, e);
                a.chart.pointCount++;
                l(this, "afterInit");
                return this
            },
            applyOptions: function(a, d) {
                var e = this.series,
                    g = e.options.pointValKey || e.pointValKey;
                a = E.prototype.optionsToObject.call(this,
                    a);
                G(this, a);
                this.options = this.options ? G(this.options, a) : a;
                a.group && delete this.group;
                g && (this.y = this[g]);
                this.isNull = r(this.isValid && !this.isValid(), null === this.x || !C(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
                void 0 === this.x && e && (this.x = void 0 === d ? e.autoIncrement(this) : d);
                return this
            },
            setNestedProperty: function(p, d, e) {
                e = e.split(".");
                a.reduce(e, function(e, m, b, c) {
                    e[m] = c.length - 1 === b ? d : a.isObject(e[m], !0) ? e[m] : {};
                    return e[m]
                }, p);
                return p
            },
            optionsToObject: function(p) {
                var d = {},
                    e = this.series,
                    g = e.options.keys,
                    m = g || e.pointArrayMap || ["y"],
                    b = m.length,
                    c = 0,
                    f = 0;
                if (C(p) || null === p) d[m[0]] = p;
                else if (u(p))
                    for (!g && p.length > b && (e = typeof p[0], "string" === e ? d.name = p[0] : "number" === e && (d.x = p[0]), c++); f < b;) g && void 0 === p[c] || (0 < m[f].indexOf(".") ? a.Point.prototype.setNestedProperty(d, p[c], m[f]) : d[m[f]] = p[c]), c++, f++;
                else "object" === typeof p && (d = p, p.dataLabels && (e._hasPointLabels = !0), p.marker && (e._hasPointMarkers = !0));
                return d
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a = this.series,
                    d = a.zones,
                    a = a.zoneAxis || "y",
                    e = 0,
                    g;
                for (g = d[e]; this[a] >= g.value;) g = d[++e];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = g && g.color && !this.options.color ? g.color : this.nonZonedColor;
                return g
            },
            destroy: function() {
                var a = this.series.chart,
                    d = a.hoverPoints,
                    e;
                a.pointCount--;
                d && (this.setState(), q(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) y(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (e in this) this[e] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel",
                        "dataLabelUpper", "connector", "shadowGroup"
                    ], d, e = 6; e--;) d = a[e], this[d] && (this[d] = this[d].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var d = this.series,
                    e = d.tooltipOptions,
                    g = r(e.valueDecimals, ""),
                    m = e.valuePrefix || "",
                    b = e.valueSuffix || "";
                F(d.pointArrayMap || ["y"], function(c) {
                    c = "{point." +
                        c;
                    if (m || b) a = a.replace(RegExp(c + "}", "g"), m + c + "}" + b);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + g + "f}")
                });
                return f(a, {
                    point: this,
                    series: this.series
                }, d.chart.time)
            },
            firePointEvent: function(a, d, e) {
                var g = this,
                    m = this.series.options;
                (m.point.events[a] || g.options && g.options.events && g.options.events[a]) && this.importEvents();
                "click" === a && m.allowPointSelect && (e = function(a) {
                    g.select && g.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                l(this, a, d, e)
            },
            visible: !0
        }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.animObject,
            G = a.arrayMax,
            q = a.arrayMin,
            l = a.correctFloat,
            f = a.defaultOptions,
            u = a.defaultPlotOptions,
            C = a.defined,
            r = a.each,
            y = a.erase,
            p = a.extend,
            d = a.fireEvent,
            e = a.grep,
            g = a.isArray,
            m = a.isNumber,
            b = a.isString,
            c = a.merge,
            x = a.objectEach,
            B = a.pick,
            t = a.removeEvent,
            n = a.splat,
            L = a.SVGElement,
            z = a.syncTimeout,
            D = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {}
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    h, e = a.series,
                    k;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                p(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                h = b.events;
                x(h, function(a, b) {
                    E(c, b, a)
                });
                if (h && h.click || b.point && b.point.events &&
                    b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                r(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                e.length && (k = e[e.length - 1]);
                c._i = B(k && k._i, -1) + 1;
                a.orderSeries(this.insert(e));
                d(this, "afterInit")
            },
            insert: function(a) {
                var b = this.options.index,
                    c;
                if (m(b)) {
                    for (c = a.length; c--;)
                        if (b >= B(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return B(c, a.length -
                    1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    v;
                r(b.axisTypes || [], function(h) {
                    r(d[h], function(a) {
                        v = a.options;
                        if (c[h] === v.index || void 0 !== c[h] && c[h] === v.id || void 0 === c[h] && 0 === v.index) b.insert(a.series), b[h] = a, a.isDirty = !0
                    });
                    b[h] || b.optionalAxis === h || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    d = arguments,
                    h = m(b) ? function(d) {
                        var h = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = h
                    } : function(a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                r(c.parallelArrays, h)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    e = this.chart.time,
                    b = B(b, a.pointStart, 0);
                this.pointInterval = c = B(this.pointInterval, a.pointInterval, 1);
                d && (a = new e.Date(b), "day" === d ? e.set("Date", a, e.get("Date", a) + c) : "month" === d ? e.set("Month", a, e.get("Month", a) + c) : "year" === d && e.set("FullYear", a, e.get("FullYear", a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    h = b.options,
                    v = h.plotOptions,
                    e = (b.userOptions || {}).plotOptions || {},
                    k = v[this.type];
                this.userOptions = a;
                b = c(k, v.series, a);
                this.tooltipOptions = c(f.tooltip, f.plotOptions.series && f.plotOptions.series.tooltip, f.plotOptions[this.type].tooltip, h.tooltip.userOptions, v.series && v.series.tooltip, v[this.type].tooltip, a.tooltip);
                this.stickyTracking = B(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === k.marker && delete b.marker;
                this.zoneAxis =
                    b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && C(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                d(this, "afterSetOptions", {
                    options: b
                });
                return b
            },
            getName: function() {
                return this.name || "Series " + (this.index + 1)
            },
            getCyclic: function(a, b, c) {
                var d, h = this.chart,
                    k = this.userOptions,
                    e = a + "Index",
                    n = a + "Counter",
                    g = c ? c.length : B(h.options.chart[a + "Count"], h[a + "Count"]);
                b || (d = B(k[e], k["_" + e]), C(d) || (h.series.length || (h[n] = 0), k["_" + e] = d = h[n] % g, h[n] += 1), c && (b = c[d]));
                void 0 !== d && (this[e] = d);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || u[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function(b) {
                var c = this.options,
                    d = this.points,
                    h = [],
                    e, k, n, g = this.requireSorting;
                r(b, function(b) {
                    var k;
                    k = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b).x;
                    m(k) && (k = a.inArray(k, this.xData, n), -1 === k || d[k].touched ? h.push(b) : b !== c.data[k] ? (d[k].update(b, !1, null, !1), d[k].touched = !0, g && (n = k + 1)) : d[k] && (d[k].touched = !0), e = !0)
                }, this);
                if (e)
                    for (b = d.length; b--;) k = d[b], k.touched || k.remove(!1), k.touched = !1;
                else if (b.length === d.length) r(b, function(a, b) {
                    d[b].update && a !== c.data[b] &&
                        d[b].update(a, !1, null, !1)
                });
                else return !1;
                r(h, function(a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function(c, d, e, v) {
                var h = this,
                    k = h.points,
                    n = k && k.length || 0,
                    z, t = h.options,
                    f = h.chart,
                    p = null,
                    D = h.xAxis,
                    l = t.turboThreshold,
                    x = this.xData,
                    H = this.yData,
                    I = (z = h.pointArrayMap) && z.length,
                    q;
                c = c || [];
                z = c.length;
                d = B(d, !0);
                !1 !== v && z && n && !h.cropped && !h.hasGroupedData && h.visible && !h.isSeriesBoosting && (q = this.updateData(c));
                if (!q) {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    r(this.parallelArrays, function(a) {
                        h[a + "Data"].length =
                            0
                    });
                    if (l && z > l) {
                        for (e = 0; null === p && e < z;) p = c[e], e++;
                        if (m(p))
                            for (e = 0; e < z; e++) x[e] = this.autoIncrement(), H[e] = c[e];
                        else if (g(p))
                            if (I)
                                for (e = 0; e < z; e++) p = c[e], x[e] = p[0], H[e] = p.slice(1, I + 1);
                            else
                                for (e = 0; e < z; e++) p = c[e], x[e] = p[0], H[e] = p[1];
                        else a.error(12)
                    } else
                        for (e = 0; e < z; e++) void 0 !== c[e] && (p = {
                            series: h
                        }, h.pointClass.prototype.applyOptions.apply(p, [c[e]]), h.updateParallelArrays(p, e));
                    H && b(H[0]) && a.error(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = c;
                    for (e = n; e--;) k[e] && k[e].destroy && k[e].destroy();
                    D && (D.minRange =
                        D.userMinRange);
                    h.isDirty = f.isDirtyBox = !0;
                    h.isDirtyData = !!k;
                    e = !1
                }
                "point" === t.legendType && (this.processData(), this.generatePoints());
                d && f.redraw(e)
            },
            processData: function(b) {
                var c = this.xData,
                    d = this.yData,
                    h = c.length,
                    e;
                e = 0;
                var k, n, g = this.xAxis,
                    m, z = this.options;
                m = z.cropThreshold;
                var p = this.getExtremesFromAll || z.getExtremesFromAll,
                    t = this.isCartesian,
                    z = g && g.val2lin,
                    f = g && g.isLog,
                    D = this.requireSorting,
                    l, x;
                if (t && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !b) return !1;
                g && (b = g.getExtremes(), l = b.min, x = b.max);
                t && this.sorted && !p && (!m || h > m || this.forceCrop) && (c[h - 1] < l || c[0] > x ? (c = [], d = []) : this.yData && (c[0] < l || c[h - 1] > x) && (e = this.cropData(this.xData, this.yData, l, x), c = e.xData, d = e.yData, e = e.start, k = !0));
                for (m = c.length || 1; --m;) h = f ? z(c[m]) - z(c[m - 1]) : c[m] - c[m - 1], 0 < h && (void 0 === n || h < n) ? n = h : 0 > h && D && (a.error(15), D = !1);
                this.cropped = k;
                this.cropStart = e;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = n
            },
            cropData: function(a, b, c, d, e) {
                var k = a.length,
                    h = 0,
                    v = k,
                    n;
                e = B(e, this.cropShoulder, 1);
                for (n = 0; n < k; n++)
                    if (a[n] >=
                        c) {
                        h = Math.max(0, n - e);
                        break
                    }
                for (c = n; c < k; c++)
                    if (a[c] > d) {
                        v = c + e;
                        break
                    }
                return {
                    xData: a.slice(h, v),
                    yData: b.slice(h, v),
                    start: h,
                    end: v
                }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    d, e = this.processedXData,
                    k = this.processedYData,
                    g = this.pointClass,
                    m = e.length,
                    z = this.cropStart || 0,
                    t, f = this.hasGroupedData,
                    a = a.keys,
                    D, l = [],
                    x;
                c || f || (c = [], c.length = b.length, c = this.data = c);
                a && f && (this.options.keys = !1);
                for (x = 0; x < m; x++) t = z + x, f ? (D = (new g).init(this, [e[x]].concat(n(k[x]))), D.dataGroup = this.groupMap[x],
                    D.dataGroup.options && (D.options = D.dataGroup.options, p(D, D.dataGroup.options))) : (D = c[t]) || void 0 === b[t] || (c[t] = D = (new g).init(this, b[t], e[x])), D && (D.index = t, l[x] = D);
                this.options.keys = a;
                if (c && (m !== (d = c.length) || f))
                    for (x = 0; x < d; x++) x !== z || f || (x += m), c[x] && (c[x].destroyElements(), c[x].plotX = void 0);
                this.data = c;
                this.points = l
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    d, h = [],
                    k = 0;
                d = this.xAxis.getExtremes();
                var e = d.min,
                    n = d.max,
                    z, t, f = this.requireSorting ? 1 : 0,
                    p, D;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (D = 0; D < d; D++)
                    if (t = c[D], p = a[D], z = (m(p, !0) || g(p)) && (!b.positiveValuesOnly || p.length || 0 < p), t = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[D + f] || t) >= e && (c[D - f] || t) <= n, z && t)
                        if (z = p.length)
                            for (; z--;) "number" === typeof p[z] && (h[k++] = p[z]);
                        else h[k++] = p;
                this.dataMin = q(h);
                this.dataMax = G(h)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    e = c.categories,
                    n = this.yAxis,
                    k = this.points,
                    g = k.length,
                    z = !!this.modifyValue,
                    p = a.pointPlacement,
                    t = "between" === p || m(p),
                    f = a.threshold,
                    D = a.startFromThreshold ? f : 0,
                    x, r, q, u, L = Number.MAX_VALUE;
                "between" === p && (p = .5);
                m(p) && (p *= B(a.pointRange || c.pointRange));
                for (a = 0; a < g; a++) {
                    var y = k[a],
                        F = y.x,
                        E = y.y;
                    r = y.low;
                    var G = b && n.stacks[(this.negStacks && E < (D ? 0 : f) ? "-" : "") + this.stackKey],
                        J;
                    n.positiveValuesOnly && null !== E && 0 >= E && (y.isNull = !0);
                    y.plotX = x = l(Math.min(Math.max(-1E5, c.translate(F, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                    b && this.visible && !y.isNull && G && G[F] && (u = this.getStackIndicator(u,
                        F, this.index), J = G[F], E = J.points[u.key], r = E[0], E = E[1], r === D && u.key === G[F].base && (r = B(m(f) && f, n.min)), n.positiveValuesOnly && 0 >= r && (r = null), y.total = y.stackTotal = J.total, y.percentage = J.total && y.y / J.total * 100, y.stackY = E, J.setOffset(this.pointXOffset || 0, this.barW || 0));
                    y.yBottom = C(r) ? Math.min(Math.max(-1E5, n.translate(r, 0, 1, 0, 1)), 1E5) : null;
                    z && (E = this.modifyValue(E, y));
                    y.plotY = r = "number" === typeof E && Infinity !== E ? Math.min(Math.max(-1E5, n.translate(E, 0, 1, 0, 1)), 1E5) : void 0;
                    y.isInside = void 0 !== r && 0 <= r && r <= n.len &&
                        0 <= x && x <= c.len;
                    y.clientX = t ? l(c.translate(F, 0, 0, 0, 1, p)) : x;
                    y.negative = y.y < (f || 0);
                    y.category = e && void 0 !== e[y.x] ? e[y.x] : y.x;
                    y.isNull || (void 0 !== q && (L = Math.min(L, Math.abs(x - q))), q = x);
                    y.zone = this.zones.length && y.getZone()
                }
                this.closestPointRangePx = L;
                d(this, "afterTranslate")
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return e(a || this.points || [], function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    h = b.inverted,
                    k = this.clipBox,
                    e = k || b.clipBox,
                    n = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, e.height, c.xAxis, c.yAxis].join(),
                    g = b[n],
                    m = b[n + "m"];
                g || (a && (e.width = 0, h && (e.x = b.plotSizeX), b[n + "m"] = m = d.clipRect(h ? b.plotSizeX + 99 : -99, h ? -b.plotLeft : -b.plotTop, 99, h ? b.chartWidth : b.chartHeight)), b[n] = g = d.clipRect(e), g.count = {
                    length: 0
                });
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || k ? g : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey = n);
                a || (g.count[this.index] &&
                    (delete g.count[this.index], --g.count.length), 0 === g.count.length && n && b[n] && (k || (b[n] = b[n].destroy()), b[n + "m"] && (b[n + "m"] = b[n + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = F(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: 0
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                d(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    c, d, e, k, n = this.options.marker,
                    g, m, z, p = this[this.specialGroup] || this.markerGroup,
                    t, f = B(n.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= n.enabledThreshold * n.radius);
                if (!1 !== n.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) d = a[c], k = d.graphic, g = d.marker || {}, m = !!d.marker, e = f && void 0 === g.enabled || g.enabled, z = d.isInside, e && !d.isNull ? (e = B(g.symbol, this.symbol), t = this.markerAttribs(d, d.selected && "select"), k ? k[z ? "show" : "hide"](!0).animate(t) : z && (0 < t.width || d.hasImage) && (d.graphic =
                        k = b.renderer.symbol(e, t.x, t.y, t.width, t.height, m ? g : n).add(p)), k && k.attr(this.pointAttribs(d, d.selected && "select")), k && k.addClass(d.getClassName(), !0)) : k && (d.graphic = k.destroy())
            },
            markerAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a.marker || {},
                    h = d.symbol || c.symbol,
                    k = B(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], k = B(b && b.radius, c && c.radius, k + (c && c.radiusPlus || 0)));
                a.hasImage = h && 0 === h.indexOf("url");
                a.hasImage && (k = 0);
                a = {
                    x: Math.floor(a.plotX) - k,
                    y: a.plotY - k
                };
                k && (a.width = a.height =
                    2 * k);
                return a
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    h = d && d.marker || {},
                    k = this.color,
                    e = d && d.color,
                    n = a && a.color,
                    d = B(h.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                k = e || a || n || k;
                a = h.fillColor || c.fillColor || k;
                k = h.lineColor || c.lineColor || k;
                b && (c = c.states[b], b = h.states && h.states[b] || {}, d = B(b.lineWidth, c.lineWidth, d + B(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, k = b.lineColor || c.lineColor || k);
                return {
                    stroke: k,
                    "stroke-width": d,
                    fill: a
                }
            },
            destroy: function() {
                var b =
                    this,
                    c = b.chart,
                    e = /AppleWebKit\/533/.test(D.navigator.userAgent),
                    v, n, k = b.data || [],
                    g, m;
                d(b, "destroy");
                t(b);
                r(b.axisTypes || [], function(a) {
                    (m = b[a]) && m.series && (y(m.series, b), m.isDirty = m.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (n = k.length; n--;)(g = k[n]) && g.destroy && g.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                x(b, function(a, b) {
                    a instanceof L && !a.survive && (v = e && "group" === b ? "hide" : "destroy", a[v]())
                });
                c.hoverSeries === b && (c.hoverSeries = null);
                y(c.series, b);
                c.orderSeries();
                x(b, function(a, c) {
                    delete b[c]
                })
            },
            getGraphPath: function(a, b, c) {
                var d = this,
                    e = d.options,
                    k = e.step,
                    h, n = [],
                    g = [],
                    m;
                a = a || d.points;
                (h = a.reversed) && a.reverse();
                (k = {
                    right: 1,
                    center: 2
                }[k] || k && 3) && h && (k = 4 - k);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                r(a, function(h, v) {
                    var w = h.plotX,
                        z = h.plotY,
                        p = a[v - 1];
                    (h.leftCliff || p && p.rightCliff) && !c && (m = !0);
                    h.isNull && !C(b) && 0 < v ? m = !e.connectNulls : h.isNull && !b ? m = !0 : (0 === v || m ? v = ["M", h.plotX, h.plotY] : d.getPointSpline ? v = d.getPointSpline(a, h, v) : k ? (v = 1 === k ? ["L", p.plotX, z] : 2 ===
                        k ? ["L", (p.plotX + w) / 2, p.plotY, "L", (p.plotX + w) / 2, z] : ["L", w, p.plotY], v.push("L", w, z)) : v = ["L", w, z], g.push(h.x), k && (g.push(h.x), 2 === k && g.push(h.x)), n.push.apply(n, v), m = !1)
                });
                n.xMap = g;
                return d.graphPath = n
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ],
                    d = a.getZonesGraphs(d);
                r(d, function(d, k) {
                    var e = d[0],
                        h = a[e];
                    h ? (h.endX = a.preventGraphAnimation ? null : c.xMap, h.animate({
                        d: c
                    })) : c.length && (a[e] =
                        a.chart.renderer.path(c).addClass(d[1]).attr({
                            zIndex: 1
                        }).add(a.group), h = {
                            stroke: d[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, d[3] ? h.dashstyle = d[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[e].attr(h).shadow(2 > k && b.shadow));
                    h && (h.startX = c.xMap, h.isArea = c.isArea)
                })
            },
            getZonesGraphs: function(a) {
                r(this.zones, function(b, c) {
                        a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || this.color, b.dashStyle || this.options.dashStyle])
                    },
                    this);
                return a
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    e, k, n = this.clips || [],
                    g, m = this.graph,
                    z = this.area,
                    p = Math.max(b.chartWidth, b.chartHeight),
                    t = this[(this.zoneAxis || "y") + "Axis"],
                    f, D, l = b.inverted,
                    x, q, u, L, y = !1;
                d.length && (m || z) && t && void 0 !== t.min && (D = t.reversed, x = t.horiz, m && !this.showLine && m.hide(), z && z.hide(), f = t.getExtremes(), r(d, function(d, h) {
                    e = D ? x ? b.plotWidth : 0 : x ? 0 : t.toPixels(f.min);
                    e = Math.min(Math.max(B(k, e), 0), p);
                    k = Math.min(Math.max(Math.round(t.toPixels(B(d.value,
                        f.max), !0)), 0), p);
                    y && (e = k = t.toPixels(f.max));
                    q = Math.abs(e - k);
                    u = Math.min(e, k);
                    L = Math.max(e, k);
                    t.isXAxis ? (g = {
                        x: l ? L : u,
                        y: 0,
                        width: q,
                        height: p
                    }, x || (g.x = b.plotHeight - g.x)) : (g = {
                        x: 0,
                        y: l ? L : u,
                        width: p,
                        height: q
                    }, x && (g.y = b.plotWidth - g.y));
                    l && c.isVML && (g = t.isXAxis ? {
                        x: 0,
                        y: D ? u : L,
                        height: g.width,
                        width: b.chartWidth
                    } : {
                        x: g.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: g.height,
                        height: b.chartHeight
                    });
                    n[h] ? n[h].animate(g) : (n[h] = c.clipRect(g), m && a["zone-graph-" + h].clip(n[h]), z && a["zone-area-" + h].clip(n[h]));
                    y = d.value > f.max;
                    a.resetZones &&
                        0 === k && (k = void 0)
                }), this.clips = n)
            },
            invertGroups: function(a) {
                function b() {
                    r(["group", "markerGroup"], function(b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    e;
                c.xAxis && (e = E(d, "resize", b), E(c, "destroy", e), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, d, e) {
                var k = this[a],
                    h = !k;
                h && (this[a] = k = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(e));
                k.addClass("highcharts-" + b + " highcharts-series-" +
                    this.index + " highcharts-" + this.type + "-series " + (C(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (k.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                k.attr({
                    visibility: c
                })[h ? "attr" : "animate"](this.getPlotBox());
                return k
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, e =
                    a.options,
                    n = !!a.animate && b.renderer.isSVG && F(e.animation).duration,
                    k = a.visible ? "inherit" : "hidden",
                    g = e.zIndex,
                    m = a.hasRendered,
                    p = b.seriesGroup,
                    t = b.inverted;
                c = a.plotGroup("group", "series", k, g, p);
                a.markerGroup = a.plotGroup("markerGroup", "markers", k, g, p);
                n && a.animate(!0);
                c.inverted = a.isCartesian ? t : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(t);
                !1 === e.clip ||
                    a.sharedClipKey || m || c.clip(b.clipRect);
                n && a.animate();
                m || (a.animationTimeout = z(function() {
                    a.afterAnimate()
                }, n));
                a.isDirty = !1;
                a.hasRendered = !0;
                d(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: B(d && d.left, a.plotLeft),
                    translateY: B(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, d, k) {
                    var e, h;
                    if (h = c && c.length) return e = b.kdAxisArray[d % k], c.sort(function(a, b) {
                        return a[e] - b[e]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0, h), d + 1, k),
                        right: a(c.slice(h + 1), d + 1, k)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 :
                    1;
                delete b.kdTree;
                z(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, n, g) {
                    var v = b.point,
                        m = d.kdAxisArray[n % g],
                        w, z, p = v;
                    z = C(a[e]) && C(v[e]) ? Math.pow(a[e] - v[e], 2) : null;
                    w = C(a[k]) && C(v[k]) ? Math.pow(a[k] - v[k], 2) : null;
                    w = (z || 0) + (w || 0);
                    v.dist = C(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                    v.distX = C(z) ? Math.sqrt(z) : Number.MAX_VALUE;
                    m = a[m] - v[m];
                    w = 0 > m ? "left" : "right";
                    z = 0 > m ? "right" : "left";
                    b[w] && (w = c(a, b[w], n + 1, g), p = w[h] < p[h] ?
                        w : v);
                    b[z] && Math.sqrt(m * m) < p[h] && (a = c(a, b[z], n + 1, g), p = a[h] < p[h] ? a : p);
                    return p
                }
                var d = this,
                    e = this.kdAxisArray[0],
                    k = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(J);
    (function(a) {
        var E = a.Axis,
            F = a.Chart,
            G = a.correctFloat,
            q = a.defined,
            l = a.destroyObjectProperties,
            f = a.each,
            u = a.format,
            C = a.objectEach,
            r = a.pick,
            y = a.Series;
        a.StackItem = function(a, d, e, g, m) {
            var b = a.chart.inverted;
            this.axis = a;
            this.isNegative = e;
            this.options = d;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = m;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: d.align || (b ? e ? "left" : "right" : "center"),
                verticalAlign: d.verticalAlign || (b ? "middle" : e ? "bottom" : "top"),
                y: r(d.y, b ? 4 : e ? 14 : -6),
                x: r(d.x, b ? e ? -6 : 6 : 0)
            };
            this.textAlign = d.textAlign || (b ? e ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function() {
                l(this, this.axis)
            },
            render: function(a) {
                var d = this.axis.chart,
                    e = this.options,
                    g = e.format,
                    g = g ? u(g, this, d.time) :
                    e.formatter.call(this);
                this.label ? this.label.attr({
                    text: g,
                    visibility: "hidden"
                }) : this.label = d.renderer.text(g, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(a);
                this.label.labelrank = d.plotHeight
            },
            setOffset: function(a, d) {
                var e = this.axis,
                    g = e.chart,
                    m = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    b = e.translate(0),
                    b = q(m) && Math.abs(m - b);
                a = g.xAxis[0].translate(this.x) + a;
                e = q(m) && this.getStackBox(g, this, a, m, d, b, e);
                (d = this.label) && e && (d.align(this.alignOptions,
                    null, e), e = d.alignAttr, d[!1 === this.options.crop || g.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0))
            },
            getStackBox: function(a, d, e, g, m, b, c) {
                var p = d.axis.reversed,
                    f = a.inverted;
                a = c.height + c.pos - (f ? a.plotLeft : a.plotTop);
                d = d.isNegative && !p || !d.isNegative && p;
                return {
                    x: f ? d ? g : g - b : e,
                    y: f ? a - e - m : d ? a - g - b : a - g,
                    width: f ? b : m,
                    height: f ? m : b
                }
            }
        };
        F.prototype.getStacks = function() {
            var a = this;
            f(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            f(a.series, function(d) {
                !d.options.stacking || !0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries ||
                    (d.stackKey = d.type + r(d.options.stack, ""))
            })
        };
        E.prototype.buildStacks = function() {
            var a = this.series,
                d = r(this.options.reversedStacks, !0),
                e = a.length,
                g;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (g = e; g--;) a[d ? g : e - g - 1].setStackedPoints();
                for (g = 0; g < e; g++) a[g].modifyStacks()
            }
        };
        E.prototype.renderStackTotals = function() {
            var a = this.chart,
                d = a.renderer,
                e = this.stacks,
                g = this.stackTotalGroup;
            g || (this.stackTotalGroup = g = d.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            g.translate(a.plotLeft, a.plotTop);
            C(e, function(a) {
                C(a, function(a) {
                    a.render(g)
                })
            })
        };
        E.prototype.resetStacks = function() {
            var a = this,
                d = a.stacks;
            a.isXAxis || C(d, function(d) {
                C(d, function(e, m) {
                    e.touched < a.stacksTouched ? (e.destroy(), delete d[m]) : (e.total = null, e.cumulative = null)
                })
            })
        };
        E.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), C(a, function(a) {
                C(a, function(a) {
                    a.cumulative = a.total
                })
            }))
        };
        y.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var f =
                    this.processedXData,
                    d = this.processedYData,
                    e = [],
                    g = d.length,
                    m = this.options,
                    b = m.threshold,
                    c = r(m.startFromThreshold && b, 0),
                    l = m.stack,
                    m = m.stacking,
                    B = this.stackKey,
                    t = "-" + B,
                    n = this.negStacks,
                    u = this.yAxis,
                    z = u.stacks,
                    D = u.oldStacks,
                    h, I, H, v, w, k, A;
                u.stacksTouched += 1;
                for (w = 0; w < g; w++) k = f[w], A = d[w], h = this.getStackIndicator(h, k, this.index), v = h.key, H = (I = n && A < (c ? 0 : b)) ? t : B, z[H] || (z[H] = {}), z[H][k] || (D[H] && D[H][k] ? (z[H][k] = D[H][k], z[H][k].total = null) : z[H][k] = new a.StackItem(u, u.options.stackLabels, I, k, l)), H = z[H][k], null !==
                    A ? (H.points[v] = H.points[this.index] = [r(H.cumulative, c)], q(H.cumulative) || (H.base = v), H.touched = u.stacksTouched, 0 < h.index && !1 === this.singleStacks && (H.points[v][0] = H.points[this.index + "," + k + ",0"][0])) : H.points[v] = H.points[this.index] = null, "percent" === m ? (I = I ? B : t, n && z[I] && z[I][k] ? (I = z[I][k], H.total = I.total = Math.max(I.total, H.total) + Math.abs(A) || 0) : H.total = G(H.total + (Math.abs(A) || 0))) : H.total = G(H.total + (A || 0)), H.cumulative = r(H.cumulative, c) + (A || 0), null !== A && (H.points[v].push(H.cumulative), e[w] = H.cumulative);
                "percent" === m && (u.usePercentage = !0);
                this.stackedYData = e;
                u.oldStacks = {}
            }
        };
        y.prototype.modifyStacks = function() {
            var a = this,
                d = a.stackKey,
                e = a.yAxis.stacks,
                g = a.processedXData,
                m, b = a.options.stacking;
            a[b + "Stacker"] && f([d, "-" + d], function(c) {
                for (var d = g.length, f, t; d--;)
                    if (f = g[d], m = a.getStackIndicator(m, f, a.index, c), t = (f = e[c] && e[c][f]) && f.points[m.key]) a[b + "Stacker"](t, f, d)
            })
        };
        y.prototype.percentStacker = function(a, d, e) {
            d = d.total ? 100 / d.total : 0;
            a[0] = G(a[0] * d);
            a[1] = G(a[1] * d);
            this.stackedYData[e] = a[1]
        };
        y.prototype.getStackIndicator =
            function(a, d, e, g) {
                !q(a) || a.x !== d || g && a.key !== g ? a = {
                    x: d,
                    index: 0,
                    key: g
                } : a.index++;
                a.key = [e, d, a.index].join();
                return a
            }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.animate,
            G = a.Axis,
            q = a.createElement,
            l = a.css,
            f = a.defined,
            u = a.each,
            C = a.erase,
            r = a.extend,
            y = a.fireEvent,
            p = a.inArray,
            d = a.isNumber,
            e = a.isObject,
            g = a.isArray,
            m = a.merge,
            b = a.objectEach,
            c = a.pick,
            x = a.Point,
            B = a.Series,
            t = a.seriesTypes,
            n = a.setAnimation,
            L = a.splat;
        r(a.Chart.prototype, {
            addSeries: function(a, b, d) {
                var e, h = this;
                a && (b = c(b, !0), y(h, "addSeries", {
                        options: a
                    },
                    function() {
                        e = h.initSeries(a);
                        h.isDirtyLegend = !0;
                        h.linkSeries();
                        y(h, "afterAddSeries");
                        b && h.redraw(d)
                    }));
                return e
            },
            addAxis: function(a, b, d, e) {
                var h = b ? "xAxis" : "yAxis",
                    n = this.options;
                a = m(a, {
                    index: this[h].length,
                    isX: b
                });
                b = new G(this, a);
                n[h] = L(n[h] || {});
                n[h].push(a);
                c(d, !0) && this.redraw(e);
                return b
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = c.loading,
                    n = function() {
                        d && l(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = q("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = q("span", {
                    className: "highcharts-loading-inner"
                }, null, d), E(b, "redraw", n));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                l(d, r(e.style, {
                    zIndex: 10
                }));
                l(b.loadingSpan, e.labelStyle);
                b.loadingShown || (l(d, {
                    opacity: 0,
                    display: ""
                }), F(d, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration || 0
                }));
                b.loadingShown = !0;
                n()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className =
                    "highcharts-loading highcharts-loading-hidden", F(b, {
                        opacity: 0
                    }, {
                        duration: a.loading.hideDuration || 100,
                        complete: function() {
                            l(b, {
                                display: "none"
                            })
                        }
                    }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function(a, e, h, n) {
                var g = this,
                    v = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    w = a.chart,
                    k, t, z = [];
                y(g, "update", {
                    options: a
                });
                if (w) {
                    m(!0, g.options.chart, w);
                    "className" in w && g.setClassName(w.className);
                    "reflow" in w && g.setReflow(w.reflow);
                    if ("inverted" in w || "polar" in w || "type" in w) g.propFromSeries(), k = !0;
                    "alignTicks" in w && (k = !0);
                    b(w, function(a, b) {
                        -1 !== p("chart." + b, g.propsRequireUpdateSeries) && (t = !0); - 1 !== p(b, g.propsRequireDirtyBox) && (g.isDirtyBox = !0)
                    });
                    "style" in w && g.renderer.setStyle(w.style)
                }
                a.colors &&
                    (this.options.colors = a.colors);
                a.plotOptions && m(!0, this.options.plotOptions, a.plotOptions);
                b(a, function(a, b) {
                    if (g[b] && "function" === typeof g[b].update) g[b].update(a, !1);
                    else if ("function" === typeof g[v[b]]) g[v[b]](a);
                    "chart" !== b && -1 !== p(b, g.propsRequireUpdateSeries) && (t = !0)
                });
                u("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
                    var c;
                    a[b] && ("series" === b && (c = [], u(g[b], function(a, b) {
                        a.options.isInternal || c.push(b)
                    })), u(L(a[b]), function(a, d) {
                        (d = f(a.id) && g.get(a.id) || g[b][c ? c[d] : d]) && d.coll ===
                            b && (d.update(a, !1), h && (d.touched = !0));
                        if (!d && h)
                            if ("series" === b) g.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) g.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), h && u(g[b], function(a) {
                        a.touched || a.options.isInternal ? delete a.touched : z.push(a)
                    }))
                });
                u(z, function(a) {
                    a.remove(!1)
                });
                k && u(g.axes, function(a) {
                    a.update({}, !1)
                });
                t && u(g.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && m(!0, g.options.loading, a.loading);
                k = w && w.width;
                w = w && w.height;
                d(k) && k !== g.chartWidth || d(w) && w !== g.chartHeight ? g.setSize(k,
                    w, n) : c(e, !0) && g.redraw(n);
                y(g, "afterUpdate", {
                    options: a
                })
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        r(x.prototype, {
            update: function(a, b, d, g) {
                function h() {
                    n.applyOptions(a);
                    null === n.y && k && (n.graphic = k.destroy());
                    e(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (n.graphic = k.destroy()), a && a.dataLabels && n.dataLabel && (n.dataLabel = n.dataLabel.destroy()), n.connector && (n.connector = n.connector.destroy()));
                    t = n.index;
                    m.updateParallelArrays(n, t);
                    z.data[t] = e(z.data[t], !0) || e(a, !0) ? n.options :
                        c(a, z.data[t]);
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (f.isDirtyBox = !0);
                    "point" === z.legendType && (f.isDirtyLegend = !0);
                    b && f.redraw(d)
                }
                var n = this,
                    m = n.series,
                    k = n.graphic,
                    t, f = m.chart,
                    z = m.options;
                b = c(b, !0);
                !1 === g ? h() : n.firePointEvent("update", {
                    options: a
                }, h)
            },
            remove: function(a, b) {
                this.series.removePoint(p(this, this.series.data), a, b)
            }
        });
        r(B.prototype, {
            addPoint: function(a, b, d, e) {
                var h = this.options,
                    n = this.data,
                    g = this.chart,
                    k = this.xAxis,
                    k = k && k.hasNames && k.names,
                    m = h.data,
                    t, f, z = this.xData,
                    p, l;
                b = c(b, !0);
                t = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(t, [a]);
                l = t.x;
                p = z.length;
                if (this.requireSorting && l < z[p - 1])
                    for (f = !0; p && z[p - 1] > l;) p--;
                this.updateParallelArrays(t, "splice", p, 0, 0);
                this.updateParallelArrays(t, p);
                k && t.name && (k[l] = t.name);
                m.splice(p, 0, a);
                f && (this.data.splice(p, 0, null), this.processData());
                "point" === h.legendType && this.generatePoints();
                d && (n[0] && n[0].remove ? n[0].remove(!1) : (n.shift(), this.updateParallelArrays(t, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(e)
            },
            removePoint: function(a, b, d) {
                var e = this,
                    h = e.data,
                    g = h[a],
                    m = e.points,
                    k = e.chart,
                    t = function() {
                        m && m.length === h.length && m.splice(a, 1);
                        h.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(g || {
                            series: e
                        }, "splice", a, 1);
                        g && g.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        b && k.redraw()
                    };
                n(d, k);
                b = c(b, !0);
                g ? g.firePointEvent("remove", null, t) : t()
            },
            remove: function(a, b, d) {
                function e() {
                    h.destroy();
                    n.isDirtyLegend = n.isDirtyBox = !0;
                    n.linkSeries();
                    c(a, !0) && n.redraw(b)
                }
                var h = this,
                    n = h.chart;
                !1 !== d ? y(h,
                    "remove", null, e) : e()
            },
            update: function(b, d) {
                var e = this,
                    n = e.chart,
                    g = e.userOptions,
                    v = e.oldType || e.type,
                    w = b.type || g.type || n.options.chart.type,
                    k = t[v].prototype,
                    f, z = ["group", "markerGroup", "dataLabelsGroup"],
                    l = ["navigatorSeries", "baseSeries"],
                    D = e.finishedAnimating && {
                        animation: !1
                    },
                    x = ["data", "name", "turboThreshold"],
                    B = a.keys(b),
                    q = 0 < B.length;
                u(B, function(a) {
                    -1 === p(a, x) && (q = !1)
                });
                if (q) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1);
                else {
                    l = z.concat(l);
                    u(l, function(a) {
                        l[a] = e[a];
                        delete e[a]
                    });
                    b = m(g, D, {
                        index: e.index,
                        pointStart: c(g.pointStart, e.xData[0])
                    }, {
                        data: e.options.data
                    }, b);
                    e.remove(!1, null, !1);
                    for (f in k) e[f] = void 0;
                    t[w || v] ? r(e, t[w || v].prototype) : a.error(17, !0);
                    u(l, function(a) {
                        e[a] = l[a]
                    });
                    e.init(n, b);
                    b.zIndex !== g.zIndex && u(z, function(a) {
                        e[a] && e[a].attr({
                            zIndex: b.zIndex
                        })
                    });
                    e.oldType = v;
                    n.linkSeries()
                }
                y(this, "afterUpdate");
                c(d, !0) && n.redraw(q ? void 0 : !1)
            },
            setName: function(a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        r(G.prototype, {
            update: function(a,
                d) {
                var e = this.chart,
                    n = a && a.events || {};
                a = m(this.userOptions, a);
                e.options[this.coll].indexOf && (e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)] = a);
                b(e.options[this.coll].events, function(a, b) {
                    "undefined" === typeof n[b] && (n[b] = void 0)
                });
                this.destroy(!0);
                this.init(e, r(a, {
                    events: n
                }));
                e.isDirtyBox = !0;
                c(d, !0) && e.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, d = this.coll, e = this.series, n = e.length; n--;) e[n] && e[n].remove(!1);
                C(b.axes, this);
                C(b[d], this);
                g(b.options[d]) ? b.options[d].splice(this.options.index,
                    1) : delete b.options[d];
                u(b[d], function(a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                c(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(J);
    (function(a) {
        var E = a.color,
            F = a.each,
            G = a.map,
            q = a.pick,
            l = a.Series,
            f = a.seriesType;
        f("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(f) {
                var l = [],
                    r = [],
                    u = this.xAxis,
                    p = this.yAxis,
                    d = p.stacks[this.stackKey],
                    e = {},
                    g = this.index,
                    m = p.series,
                    b = m.length,
                    c, x = q(p.options.reversedStacks, !0) ? 1 : -1,
                    B;
                f = f || this.points;
                if (this.options.stacking) {
                    for (B = 0; B < f.length; B++) f[B].leftNull = f[B].rightNull = null, e[f[B].x] = f[B];
                    a.objectEach(d, function(a, b) {
                        null !== a.total && r.push(b)
                    });
                    r.sort(function(a, b) {
                        return a - b
                    });
                    c = G(m, function() {
                        return this.visible
                    });
                    F(r, function(a, n) {
                        var m = 0,
                            f, t;
                        if (e[a] && !e[a].isNull) l.push(e[a]), F([-1, 1], function(h) {
                            var m = 1 === h ? "rightNull" : "leftNull",
                                p = 0,
                                v = d[r[n + h]];
                            if (v)
                                for (B = g; 0 <= B && B < b;) f = v.points[B], f || (B === g ? e[a][m] = !0 : c[B] && (t = d[a].points[B]) && (p -= t[1] - t[0])), B += x;
                            e[a][1 === h ? "rightCliff" : "leftCliff"] = p
                        });
                        else {
                            for (B = g; 0 <= B && B < b;) {
                                if (f = d[a].points[B]) {
                                    m = f[1];
                                    break
                                }
                                B += x
                            }
                            m = p.translate(m, 0, 1, 0, 1);
                            l.push({
                                isNull: !0,
                                plotX: u.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: m,
                                yBottom: m
                            })
                        }
                    })
                }
                return l
            },
            getGraphPath: function(a) {
                var f = l.prototype.getGraphPath,
                    r = this.options,
                    u = r.stacking,
                    p = this.yAxis,
                    d, e, g = [],
                    m = [],
                    b = this.index,
                    c, x = p.stacks[this.stackKey],
                    B = r.threshold,
                    t = p.getThreshold(r.threshold),
                    n, r = r.connectNulls || "percent" === u,
                    L = function(d,
                        e, h) {
                        var n = a[d];
                        d = u && x[n.x].points[b];
                        var f = n[h + "Null"] || 0;
                        h = n[h + "Cliff"] || 0;
                        var v, w, n = !0;
                        h || f ? (v = (f ? d[0] : d[1]) + h, w = d[0] + h, n = !!f) : !u && a[e] && a[e].isNull && (v = w = B);
                        void 0 !== v && (m.push({
                            plotX: c,
                            plotY: null === v ? t : p.getThreshold(v),
                            isNull: n,
                            isCliff: !0
                        }), g.push({
                            plotX: c,
                            plotY: null === w ? t : p.getThreshold(w),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                u && (a = this.getStackPoints(a));
                for (d = 0; d < a.length; d++)
                    if (e = a[d].isNull, c = q(a[d].rectPlotX, a[d].plotX), n = q(a[d].yBottom, t), !e || r) r || L(d, d - 1, "left"), e && !u && r || (m.push(a[d]), g.push({
                        x: d,
                        plotX: c,
                        plotY: n
                    })), r || L(d, d + 1, "right");
                d = f.call(this, m, !0, !0);
                g.reversed = !0;
                e = f.call(this, g, !0, !0);
                e.length && (e[0] = "L");
                e = d.concat(e);
                f = f.call(this, m, !1, r);
                e.xMap = d.xMap;
                this.areaPath = e;
                return f
            },
            drawGraph: function() {
                this.areaPath = [];
                l.prototype.drawGraph.apply(this);
                var a = this,
                    f = this.areaPath,
                    r = this.options,
                    y = [
                        ["area", "highcharts-area", this.color, r.fillColor]
                    ];
                F(this.zones, function(f, d) {
                    y.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + f.className, f.color || a.color, f.fillColor ||
                        r.fillColor
                    ])
                });
                F(y, function(p) {
                    var d = p[0],
                        e = a[d];
                    e ? (e.endX = a.preventGraphAnimation ? null : f.xMap, e.animate({
                        d: f
                    })) : (e = a[d] = a.chart.renderer.path(f).addClass(p[1]).attr({
                        fill: q(p[3], E(p[2]).setOpacity(q(r.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), e.isArea = !0);
                    e.startX = f.xMap;
                    e.shiftUnit = r.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(J);
    (function(a) {
        var E = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, G, q) {
                var l = G.plotX,
                    f = G.plotY,
                    u = a[q - 1];
                q = a[q + 1];
                var C, r, y, p;
                if (u && !u.isNull && !1 !== u.doCurve && !G.isCliff && q && !q.isNull && !1 !== q.doCurve && !G.isCliff) {
                    a = u.plotY;
                    y = q.plotX;
                    q = q.plotY;
                    var d = 0;
                    C = (1.5 * l + u.plotX) / 2.5;
                    r = (1.5 * f + a) / 2.5;
                    y = (1.5 * l + y) / 2.5;
                    p = (1.5 * f + q) / 2.5;
                    y !== C && (d = (p - r) * (y - l) / (y - C) + f - p);
                    r += d;
                    p += d;
                    r > a && r > f ? (r = Math.max(a, f), p = 2 * f - r) : r < a && r < f && (r = Math.min(a, f), p = 2 * f - r);
                    p > q && p > f ? (p = Math.max(q, f), r = 2 * f - p) : p < q && p < f && (p = Math.min(q, f), r = 2 * f - p);
                    G.rightContX = y;
                    G.rightContY = p
                }
                G = ["C", E(u.rightContX, u.plotX), E(u.rightContY, u.plotY), E(C, l), E(r, f), l, f];
                u.rightContX =
                    u.rightContY = null;
                return G
            }
        })
    })(J);
    (function(a) {
        var E = a.seriesTypes.area.prototype,
            F = a.seriesType;
        F("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: E.getStackPoints,
            getGraphPath: E.getGraphPath,
            drawGraph: E.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(J);
    (function(a) {
        var E = a.animObject,
            F = a.color,
            G = a.each,
            q = a.extend,
            l = a.isNumber,
            f = a.merge,
            u = a.pick,
            C = a.Series,
            r = a.seriesType,
            y = a.svg;
        r("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                C.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && G(d.series, function(d) {
                    d.type ===
                        a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    d = a.options,
                    e = a.xAxis,
                    g = a.yAxis,
                    m = e.options.reversedStacks,
                    m = e.reversed && !m || !e.reversed && m,
                    b, c = {},
                    f = 0;
                !1 === d.grouping ? f = 1 : G(a.chart.series, function(d) {
                    var e = d.options,
                        n = d.yAxis,
                        h;
                    d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || g.len !== n.len || g.pos !== n.pos || (e.stacking ? (b = d.stackKey, void 0 === c[b] && (c[b] = f++), h = c[b]) : !1 !== e.grouping && (h = f++), d.columnIndex = h)
                });
                var l = Math.min(Math.abs(e.transA) * (e.ordinalSlope ||
                        d.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
                    t = l * d.groupPadding,
                    n = (l - 2 * t) / (f || 1),
                    d = Math.min(d.maxPointWidth || e.len, u(d.pointWidth, n * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (n - d) / 2 + (t + ((a.columnIndex || 0) + (m ? 1 : 0)) * n - l / 2) * (m ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, d, e, g) {
                var m = this.chart,
                    b = this.borderWidth,
                    c = -(b % 2 ? .5 : 0),
                    b = b % 2 ? .5 : 1;
                m.inverted && m.renderer.isVML && (b += 1);
                this.options.crisp && (e = Math.round(a + e) + c, a = Math.round(a) + c, e -= a);
                g = Math.round(d + g) + b;
                c = .5 >= Math.abs(d) &&
                    .5 < g;
                d = Math.round(d) + b;
                g -= d;
                c && g && (--d, g += 1);
                return {
                    x: a,
                    y: d,
                    width: e,
                    height: g
                }
            },
            translate: function() {
                var a = this,
                    d = a.chart,
                    e = a.options,
                    g = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    g = a.borderWidth = u(e.borderWidth, g ? 0 : 1),
                    m = a.yAxis,
                    b = e.threshold,
                    c = a.translatedThreshold = m.getThreshold(b),
                    f = u(e.minPointLength, 5),
                    l = a.getColumnMetrics(),
                    t = l.width,
                    n = a.barW = Math.max(t, 1 + 2 * g),
                    r = a.pointXOffset = l.offset;
                d.inverted && (c -= .5);
                e.pointPadding && (n = Math.ceil(n));
                C.prototype.translate.apply(a);
                G(a.points, function(e) {
                    var g =
                        u(e.yBottom, c),
                        h = 999 + Math.abs(g),
                        h = Math.min(Math.max(-h, e.plotY), m.len + h),
                        l = e.plotX + r,
                        p = n,
                        v = Math.min(h, g),
                        w, k = Math.max(h, g) - v;
                    f && Math.abs(k) < f && (k = f, w = !m.reversed && !e.negative || m.reversed && e.negative, e.y === b && a.dataMax <= b && m.min < b && (w = !w), v = Math.abs(v - c) > f ? g - f : c - (w ? f : 0));
                    e.barX = l;
                    e.pointWidth = t;
                    e.tooltipPos = d.inverted ? [m.len + m.pos - d.plotLeft - h, a.xAxis.len - l - p / 2, k] : [l + p / 2, h + m.pos - d.plotTop, k];
                    e.shapeType = "rect";
                    e.shapeArgs = a.crispCol.apply(a, e.isNull ? [l, c, p, 0] : [l, v, p, k])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, d) {
                var e = this.options,
                    g, m = this.pointAttrToOptions || {};
                g = m.stroke || "borderColor";
                var b = m["stroke-width"] || "borderWidth",
                    c = a && a.color || this.color,
                    l = a && a[g] || e[g] || this.color || c,
                    p = a && a[b] || e[b] || this[b] || 0,
                    m = e.dashStyle;
                a && this.zones.length && (c = a.getZone(), c = a.options.color || c && c.color || this.color);
                d && (a = f(e.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, c = a.color ||
                    void 0 !== d && F(c).brighten(a.brightness).get() || c, l = a[g] || l, p = a[b] || p, m = a.dashStyle || m);
                g = {
                    fill: c,
                    stroke: l,
                    "stroke-width": p
                };
                m && (g.dashstyle = m);
                return g
            },
            drawPoints: function() {
                var a = this,
                    d = this.chart,
                    e = a.options,
                    g = d.renderer,
                    m = e.animationLimit || 250,
                    b;
                G(a.points, function(c) {
                    var p = c.graphic,
                        B = p && d.pointCount < m ? "animate" : "attr";
                    if (l(c.plotY) && null !== c.y) {
                        b = c.shapeArgs;
                        if (p) p[B](f(b));
                        else c.graphic = p = g[c.shapeType](b).add(c.group || a.group);
                        e.borderRadius && p.attr({
                            r: e.borderRadius
                        });
                        p[B](a.pointAttribs(c,
                            c.selected && "select")).shadow(e.shadow, null, e.stacking && !e.borderRadius);
                        p.addClass(c.getClassName(), !0)
                    } else p && (c.graphic = p.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    e = this.yAxis,
                    g = d.options,
                    m = this.chart.inverted,
                    b = {},
                    c = m ? "translateX" : "translateY",
                    f;
                y && (a ? (b.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(g.threshold))), m ? b.translateX = a - e.len : b.translateY = a, d.group.attr(b)) : (f = d.group.attr(c), d.group.animate({
                    scaleY: 1
                }, q(E(d.options.animation), {
                    step: function(a, g) {
                        b[c] = f + g.pos * (e.pos -
                            f);
                        d.group.attr(b)
                    }
                })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && G(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                C.prototype.remove.apply(a, arguments)
            }
        })
    })(J);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(J);
    (function(a) {
        var E = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && E.prototype.drawGraph.call(this)
            }
        })
    })(J);
    (function(a) {
        var E = a.deg2rad,
            F = a.isNumber,
            G = a.pick,
            q = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    f = this.chart,
                    u = 2 * (a.slicedOffset || 0),
                    C = f.plotWidth - 2 * u,
                    f = f.plotHeight - 2 * u,
                    r = a.center,
                    r = [G(r[0], "50%"), G(r[1], "50%"), a.size || "100%", a.innerSize || 0],
                    y = Math.min(C, f),
                    p, d;
                for (p = 0; 4 > p; ++p) d = r[p], a = 2 > p || 2 === p && /%$/.test(d), r[p] = q(d, [C, f, y, r[2]][p]) + (a ? u : 0);
                r[3] > r[2] && (r[3] = r[2]);
                return r
            },
            getStartAndEndRadians: function(a, f) {
                a = F(a) ? a : 0;
                f = F(f) && f > a && 360 > f - a ? f : a + 360;
                return {
                    start: E * (a + -90),
                    end: E * (f + -90)
                }
            }
        }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.CenteredSeriesMixin,
            G = a.defined,
            q = a.each,
            l = a.extend,
            f = F.getStartAndEndRadians,
            u = a.inArray,
            C = a.noop,
            r = a.pick,
            y = a.Point,
            p = a.Series,
            d = a.seriesType,
            e = a.setAnimation;
        d("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var d = this,
                    b = d.points,
                    c = d.startAngleRad;
                a || (q(b, function(a) {
                    var b = a.graphic,
                        e = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || d.center[3] / 2,
                        start: c,
                        end: c
                    }), b.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, d.options.animation))
                }), d.animate = null)
            },
            updateTotals: function() {
                var a, d = 0,
                    b = this.points,
                    c = b.length,
                    e, f = this.options.ignoreHiddenPoint;
                for (a = 0; a < c; a++) e = b[a], d += f && !e.visible ? 0 : e.isNull ?
                    0 : e.y;
                this.total = d;
                for (a = 0; a < c; a++) e = b[a], e.percentage = 0 < d && (e.visible || !f) ? e.y / d * 100 : 0, e.total = d
            },
            generatePoints: function() {
                p.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function(a) {
                this.generatePoints();
                var d = 0,
                    b = this.options,
                    c = b.slicedOffset,
                    e = c + (b.borderWidth || 0),
                    g, t, n, l = f(b.startAngle, b.endAngle),
                    z = this.startAngleRad = l.start,
                    l = (this.endAngleRad = l.end) - z,
                    p = this.points,
                    h, q = b.dataLabels.distance,
                    b = b.ignoreHiddenPoint,
                    u, v = p.length,
                    w;
                a || (this.center = a = this.getCenter());
                this.getX =
                    function(b, c, d) {
                        n = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                        return a[0] + (c ? -1 : 1) * Math.cos(n) * (a[2] / 2 + d.labelDistance)
                    };
                for (u = 0; u < v; u++) {
                    w = p[u];
                    w.labelDistance = r(w.options.dataLabels && w.options.dataLabels.distance, q);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, w.labelDistance);
                    g = z + d * l;
                    if (!b || w.visible) d += w.percentage / 100;
                    t = z + d * l;
                    w.shapeType = "arc";
                    w.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * g) / 1E3,
                        end: Math.round(1E3 * t) / 1E3
                    };
                    n = (t + g) / 2;
                    n > 1.5 * Math.PI ?
                        n -= 2 * Math.PI : n < -Math.PI / 2 && (n += 2 * Math.PI);
                    w.slicedTranslation = {
                        translateX: Math.round(Math.cos(n) * c),
                        translateY: Math.round(Math.sin(n) * c)
                    };
                    t = Math.cos(n) * a[2] / 2;
                    h = Math.sin(n) * a[2] / 2;
                    w.tooltipPos = [a[0] + .7 * t, a[1] + .7 * h];
                    w.half = n < -Math.PI / 2 || n > Math.PI / 2 ? 1 : 0;
                    w.angle = n;
                    g = Math.min(e, w.labelDistance / 5);
                    w.labelPos = [a[0] + t + Math.cos(n) * w.labelDistance, a[1] + h + Math.sin(n) * w.labelDistance, a[0] + t + Math.cos(n) * g, a[1] + h + Math.sin(n) * g, a[0] + t, a[1] + h, 0 > w.labelDistance ? "center" : w.half ? "right" : "left", n]
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    d = a.chart.renderer,
                    b, c, e, f, t = a.options.shadow;
                t && !a.shadowGroup && (a.shadowGroup = d.g("shadow").add(a.group));
                q(a.points, function(n) {
                    c = n.graphic;
                    if (n.isNull) c && (n.graphic = c.destroy());
                    else {
                        f = n.shapeArgs;
                        b = n.getTranslate();
                        var g = n.shadowGroup;
                        t && !g && (g = n.shadowGroup = d.g("shadow").add(a.shadowGroup));
                        g && g.attr(b);
                        e = a.pointAttribs(n, n.selected && "select");
                        c ? c.setRadialReference(a.center).attr(e).animate(l(f, b)) : (n.graphic = c = d[n.shapeType](f).setRadialReference(a.center).attr(b).add(a.group),
                            c.attr(e).attr({
                                "stroke-linejoin": "round"
                            }).shadow(t, g));
                        c.attr({
                            visibility: n.visible ? "inherit" : "hidden"
                        });
                        c.addClass(n.getClassName())
                    }
                })
            },
            searchPoint: C,
            sortByAngle: function(a, d) {
                a.sort(function(a, c) {
                    return void 0 !== a.angle && (c.angle - a.angle) * d
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: F.getCenter,
            getSymbol: C
        }, {
            init: function() {
                y.prototype.init.apply(this, arguments);
                var a = this,
                    d;
                a.name = r(a.name, "Slice");
                d = function(b) {
                    a.slice("select" === b.type)
                };
                E(a, "select", d);
                E(a, "unselect",
                    d);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, d) {
                var b = this,
                    c = b.series,
                    e = c.chart,
                    g = c.options.ignoreHiddenPoint;
                d = r(d, g);
                a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, c.options.data[u(b, c.data)] = b.options, q(["graphic", "dataLabel", "connector", "shadowGroup"], function(c) {
                    if (b[c]) b[c][a ? "show" : "hide"](!0)
                }), b.legendItem && e.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), g && (c.isDirty = !0), d && e.redraw())
            },
            slice: function(a,
                d, b) {
                var c = this.series;
                e(b, c.chart);
                r(d, !0);
                this.sliced = this.options.sliced = G(a) ? a : !this.sliced;
                c.options.data[u(this, c.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, {
                    innerR: this.shapeArgs.r -
                        1,
                    start: d.start,
                    end: d.end
                })
            }
        })
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.arrayMax,
            G = a.defined,
            q = a.each,
            l = a.extend,
            f = a.format,
            u = a.map,
            C = a.merge,
            r = a.noop,
            y = a.pick,
            p = a.relativeLength,
            d = a.Series,
            e = a.seriesTypes,
            g = a.some,
            m = a.stableSort;
        a.distribute = function(b, c, d) {
            function e(a, b) {
                return a.target - b.target
            }
            var f, n = !0,
                l = b,
                z = [],
                p;
            p = 0;
            var h = l.reducedLen || c;
            for (f = b.length; f--;) p += b[f].size;
            if (p > h) {
                m(b, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = f = 0; p <= h;) p += b[f].size, f++;
                z = b.splice(f - 1, b.length)
            }
            m(b, e);
            for (b = u(b, function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: y(a.align, .5)
                    }
                }); n;) {
                for (f = b.length; f--;) n = b[f], p = (Math.min.apply(0, n.targets) + Math.max.apply(0, n.targets)) / 2, n.pos = Math.min(Math.max(0, p - n.size * n.align), c - n.size);
                f = b.length;
                for (n = !1; f--;) 0 < f && b[f - 1].pos + b[f - 1].size > b[f].pos && (b[f - 1].size += b[f].size, b[f - 1].targets = b[f - 1].targets.concat(b[f].targets), b[f - 1].align = .5, b[f - 1].pos + b[f - 1].size > c && (b[f - 1].pos = c - b[f - 1].size), b.splice(f, 1), n = !0)
            }
            l.push.apply(l, z);
            f = 0;
            g(b, function(b) {
                var e =
                    0;
                if (g(b.targets, function() {
                        l[f].pos = b.pos + e;
                        if (Math.abs(l[f].pos - l[f].target) > d) return q(l.slice(0, f + 1), function(a) {
                            delete a.pos
                        }), l.reducedLen = (l.reducedLen || c) - .1 * c, l.reducedLen > .1 * c && a.distribute(l, c, d), !0;
                        e += l[f].size;
                        f++
                    })) return !0
            });
            m(l, e)
        };
        d.prototype.drawDataLabels = function() {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }
            var c = this,
                d = c.chart,
                e = c.options,
                g = e.dataLabels,
                n = c.points,
                m, l, p = c.hasRendered || 0,
                h, r, u = y(g.defer, !!e.animation),
                v = d.renderer;
            if (g.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(g), r = c.plotGroup("dataLabelsGroup", "data-labels", u && !p ? "hidden" : "visible", g.zIndex || 6), u && (r.attr({
                opacity: +p
            }), p || E(c, "afterAnimate", function() {
                c.visible && r.show(!0);
                r[e.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), l = g, q(n, function(n) {
                var k, w = n.dataLabel,
                    t, p, z = n.connector,
                    D = !w,
                    x;
                m = n.dlOptions ||
                    n.options && n.options.dataLabels;
                (k = y(m && m.enabled, l.enabled) && !n.isNull) && (k = !0 === b(n, m || g));
                k && (g = C(l, m), t = n.getLabelConfig(), x = g[n.formatPrefix + "Format"] || g.format, h = G(x) ? f(x, t, d.time) : (g[n.formatPrefix + "Formatter"] || g.formatter).call(t, g), x = g.style, t = g.rotation, x.color = y(g.color, x.color, c.color, "#000000"), "contrast" === x.color && (n.contrastColor = v.getContrast(n.color || c.color), x.color = g.inside || 0 > y(n.labelDistance, g.distance) || e.stacking ? n.contrastColor : "#000000"), e.cursor && (x.cursor = e.cursor), p = {
                    fill: g.backgroundColor,
                    stroke: g.borderColor,
                    "stroke-width": g.borderWidth,
                    r: g.borderRadius || 0,
                    rotation: t,
                    padding: g.padding,
                    zIndex: 1
                }, a.objectEach(p, function(a, b) {
                    void 0 === a && delete p[b]
                }));
                !w || k && G(h) ? k && G(h) && (w ? p.text = h : (w = n.dataLabel = t ? v.text(h, 0, -9999, g.useHTML).addClass("highcharts-data-label") : v.label(h, 0, -9999, g.shape, null, null, g.useHTML, null, "data-label"), w.addClass(" highcharts-data-label-color-" + n.colorIndex + " " + (g.className || "") + (g.useHTML ? " highcharts-tracker" : ""))), w.attr(p), w.css(x).shadow(g.shadow),
                    w.added || w.add(r), c.alignDataLabel(n, w, g, null, D)) : (n.dataLabel = w = w.destroy(), z && (n.connector = z.destroy()))
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        d.prototype.alignDataLabel = function(a, c, d, e, g) {
            var b = this.chart,
                m = b.inverted,
                f = y(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                t = y(a.plotY, -9999),
                h = c.getBBox(),
                p, x = d.rotation,
                v = d.align,
                w = this.visible && (a.series.forceDL || b.isInsidePlot(f, Math.round(t), m) || e && b.isInsidePlot(f, m ? e.x + 1 : e.y + e.height - 1, m)),
                k = "justify" === y(d.overflow, "justify");
            if (w && (p = d.style.fontSize,
                    p = b.renderer.fontMetrics(p, c).b, e = l({
                        x: m ? this.yAxis.len - t : f,
                        y: Math.round(m ? this.xAxis.len - f : t),
                        width: 0,
                        height: 0
                    }, e), l(d, {
                        width: h.width,
                        height: h.height
                    }), x ? (k = !1, f = b.renderer.rotCorr(p, x), f = {
                        x: e.x + d.x + e.width / 2 + f.x,
                        y: e.y + d.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[d.verticalAlign] * e.height
                    }, c[g ? "attr" : "animate"](f).attr({
                        align: v
                    }), t = (x + 720) % 360, t = 180 < t && 360 > t, "left" === v ? f.y -= t ? h.height : 0 : "center" === v ? (f.x -= h.width / 2, f.y -= h.height / 2) : "right" === v && (f.x -= h.width, f.y -= t ? 0 : h.height), c.placed = !0, c.alignAttr = f) : (c.align(d,
                        null, e), f = c.alignAttr), k && 0 <= e.height ? a.isLabelJustified = this.justifyDataLabel(c, d, f, h, e, g) : y(d.crop, !0) && (w = b.isInsidePlot(f.x, f.y) && b.isInsidePlot(f.x + h.width, f.y + h.height)), d.shape && !x)) c[g ? "attr" : "animate"]({
                anchorX: m ? b.plotWidth - a.plotY : a.plotX,
                anchorY: m ? b.plotHeight - a.plotX : a.plotY
            });
            w || (c.attr({
                y: -9999
            }), c.placed = !1)
        };
        d.prototype.justifyDataLabel = function(a, c, d, e, g, n) {
            var b = this.chart,
                f = c.align,
                m = c.verticalAlign,
                h, l, t = a.box ? 0 : a.padding || 0;
            h = d.x + t;
            0 > h && ("right" === f ? c.align = "left" : c.x = -h, l = !0);
            h = d.x + e.width - t;
            h > b.plotWidth && ("left" === f ? c.align = "right" : c.x = b.plotWidth - h, l = !0);
            h = d.y + t;
            0 > h && ("bottom" === m ? c.verticalAlign = "top" : c.y = -h, l = !0);
            h = d.y + e.height - t;
            h > b.plotHeight && ("top" === m ? c.verticalAlign = "bottom" : c.y = b.plotHeight - h, l = !0);
            l && (a.placed = !n, a.align(c, null, g));
            return l
        };
        e.pie && (e.pie.prototype.drawDataLabels = function() {
            var b = this,
                c = b.data,
                e, g = b.chart,
                f = b.options.dataLabels,
                n = y(f.connectorPadding, 10),
                m = y(f.connectorWidth, 1),
                l = g.plotWidth,
                p = g.plotHeight,
                h = Math.round(g.chartWidth / 3),
                r, u =
                b.center,
                v = u[2] / 2,
                w = u[1],
                k, A, C, E, K = [
                    [],
                    []
                ],
                O, N, M, S, R = [0, 0, 0, 0];
            b.visible && (f.enabled || b._hasPointLabels) && (q(c, function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), d.prototype.drawDataLabels.apply(b), q(c, function(a) {
                a.dataLabel && (a.visible ? (K[a.half].push(a), a.dataLabel._pos = null, !G(f.style.width) && !G(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width >
                    h && (a.dataLabel.css({
                        width: .7 * h
                    }), a.dataLabel.shortened = !0)) : a.dataLabel = a.dataLabel.destroy())
            }), q(K, function(c, d) {
                var h, m, t = c.length,
                    z = [],
                    D;
                if (t)
                    for (b.sortByAngle(c, d - .5), 0 < b.maxLabelDistance && (h = Math.max(0, w - v - b.maxLabelDistance), m = Math.min(w + v + b.maxLabelDistance, g.plotHeight), q(c, function(a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, w - v - a.labelDistance), a.bottom = Math.min(w + v + a.labelDistance, g.plotHeight), D = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                target: a.labelPos[1] - a.top + D /
                                    2,
                                size: D,
                                rank: a.y
                            }, z.push(a.distributeBox))
                        }), h = m + D - h, a.distribute(z, h, h / 5)), S = 0; S < t; S++) e = c[S], C = e.labelPos, k = e.dataLabel, M = !1 === e.visible ? "hidden" : "inherit", N = h = C[1], z && G(e.distributeBox) && (void 0 === e.distributeBox.pos ? M = "hidden" : (E = e.distributeBox.size, N = e.top + e.distributeBox.pos)), delete e.positionIndex, O = f.justify ? u[0] + (d ? -1 : 1) * (v + e.labelDistance) : b.getX(N < e.top + 2 || N > e.bottom - 2 ? h : N, d, e), k._attr = {
                        visibility: M,
                        align: C[6]
                    }, k._pos = {
                        x: O + f.x + ({
                            left: n,
                            right: -n
                        }[C[6]] || 0),
                        y: N + f.y - 10
                    }, C.x = O, C.y = N, y(f.crop, !0) && (A = k.getBBox().width, h = null, O - A < n && 1 === d ? (h = Math.round(A - O + n), R[3] = Math.max(h, R[3])) : O + A > l - n && 0 === d && (h = Math.round(O + A - l + n), R[1] = Math.max(h, R[1])), 0 > N - E / 2 ? R[0] = Math.max(Math.round(-N + E / 2), R[0]) : N + E / 2 > p && (R[2] = Math.max(Math.round(N + E / 2 - p), R[2])), k.sideOverflow = h)
            }), 0 === F(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), m && q(this.points, function(a) {
                var c;
                r = a.connector;
                if ((k = a.dataLabel) && k._pos && a.visible && 0 < a.labelDistance) {
                    M = k._attr.visibility;
                    if (c = !r) a.connector = r = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" +
                        a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), r.attr({
                        "stroke-width": m,
                        stroke: f.connectorColor || a.color || "#666666"
                    });
                    r[c ? "attr" : "animate"]({
                        d: b.connectorPath(a.labelPos)
                    });
                    r.attr("visibility", M)
                } else r && (a.connector = r.destroy())
            }))
        }, e.pie.prototype.connectorPath = function(a) {
            var b = a.x,
                d = a.y;
            return y(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), d, "C", b, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L",
                a[4], a[5]
            ]
        }, e.pie.prototype.placeDataLabels = function() {
            q(this.points, function(a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, e.pie.prototype.alignDataLabel = r, e.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                d = this.options,
                e = d.center,
                g = d.minSize || 80,
                n, f = null !== d.size;
            f || (null !== e[0] ? n = Math.max(b[2] - Math.max(a[1], a[3]), g) : (n = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? n = Math.max(Math.min(n, b[2] - Math.max(a[0], a[2])), g) : (n = Math.max(Math.min(n, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2), n < b[2] ? (b[2] = n, b[3] = Math.min(p(d.innerSize || 0, n), n), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : f = !0);
            return f
        });
        e.column && (e.column.prototype.alignDataLabel = function(a, c, e, g, f) {
            var b = this.chart.inverted,
                m = a.series,
                l = a.dlBox || a.shapeArgs,
                p = y(a.below, a.plotY > y(this.translatedThreshold, m.yAxis.len)),
                h = y(e.inside, !!this.options.stacking);
            l && (g = C(l), 0 > g.y && (g.height += g.y, g.y = 0), l = g.y + g.height - m.yAxis.len, 0 < l && (g.height -= l), b && (g = {
                x: m.yAxis.len - g.y - g.height,
                y: m.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), h || (b ? (g.x += p ? 0 : g.width, g.width = 0) : (g.y += p ? g.height : 0, g.height = 0)));
            e.align = y(e.align, !b || h ? "center" : p ? "right" : "left");
            e.verticalAlign = y(e.verticalAlign, b || h ? "middle" : p ? "top" : "bottom");
            d.prototype.alignDataLabel.call(this,
                a, c, e, g, f);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(J);
    (function(a) {
        var E = a.Chart,
            F = a.each,
            G = a.objectEach,
            q = a.pick;
        a = a.addEvent;
        a(E, "render", function() {
            var a = [];
            F(this.labelCollectors || [], function(f) {
                a = a.concat(f())
            });
            F(this.yAxis || [], function(f) {
                f.options.stackLabels && !f.options.stackLabels.allowOverlap && G(f.stacks, function(f) {
                    G(f, function(f) {
                        a.push(f.label)
                    })
                })
            });
            F(this.series || [], function(f) {
                var l = f.options.dataLabels,
                    C = f.dataLabelCollections || ["dataLabel"];
                (l.enabled || f._hasPointLabels) && !l.allowOverlap && f.visible && F(C, function(l) {
                    F(f.points, function(f) {
                        f[l] && f.visible && (f[l].labelrank = q(f.labelrank, f.shapeArgs && f.shapeArgs.height), a.push(f[l]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        E.prototype.hideOverlappingLabels = function(a) {
            var f = a.length,
                l = this.renderer,
                q, r, y, p, d, e, g = function(a, b, c, d, e, g, n, f) {
                    return !(e > a + c || e + n < a || g > b + d || g + f < b)
                };
            y = function(a) {
                var b, c, d, e = 2 * (a.box ? 0 : a.padding || 0);
                d = 0;
                if (a && (!a.alignAttr || a.placed)) return b = a.alignAttr || {
                    x: a.attr("x"),
                    y: a.attr("y")
                }, c = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height, d = l.fontMetrics(null, a.element).h), {
                    x: b.x + (c.translateX || 0),
                    y: b.y + (c.translateY || 0) - d,
                    width: a.width - e,
                    height: a.height - e
                }
            };
            for (r = 0; r < f; r++)
                if (q = a[r]) q.oldOpacity = q.opacity, q.newOpacity = 1, q.absoluteBox = y(q);
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < f; r++)
                for (e = (y = a[r]) && y.absoluteBox, q = r + 1; q < f; ++q)
                    if (d = (p = a[q]) && p.absoluteBox, e && d && y !== p && 0 !== y.newOpacity && 0 !== p.newOpacity && (d = g(e.x,
                            e.y, e.width, e.height, d.x, d.y, d.width, d.height)))(y.labelrank < p.labelrank ? y : p).newOpacity = 0;
            F(a, function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)) : a.attr({
                    opacity: c
                })), a.isOld = !0)
            })
        }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.Chart,
            G = a.createElement,
            q = a.css,
            l = a.defaultOptions,
            f = a.defaultPlotOptions,
            u = a.each,
            C = a.extend,
            r = a.fireEvent,
            y = a.hasTouch,
            p = a.inArray,
            d = a.isObject,
            e = a.Legend,
            g = a.merge,
            m = a.pick,
            b = a.Point,
            c = a.Series,
            x = a.seriesTypes,
            B = a.svg,
            t;
        t = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart.pointer,
                    c = function(a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                u(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (u(a.trackerGroups, function(d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout",
                            function(a) {
                                b.onTrackerMouseOut(a)
                            });
                        if (y) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(q).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                r(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    g = a.chart,
                    f = g.pointer,
                    m = g.renderer,
                    w = g.options.tooltip.snap,
                    k = a.tracker,
                    l, p = function() {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    t = "rgba(192,192,192," + (B ? .0001 : .002) + ")";
                if (e && !c)
                    for (l = e + 1; l--;) "M" === d[l] && d.splice(l +
                        1, 0, d[l + 1] - w, d[l + 2], "L"), (l && "M" === d[l] || l === e) && d.splice(l, 0, "L", d[l - 2] + w, d[l - 1]);
                k ? k.attr({
                    d: d
                }) : a.graph && (a.tracker = m.path(d).attr({
                    "stroke-linejoin": "round",
                    stroke: t,
                    fill: c ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * w),
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), u([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function(a) {
                        f.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (y) a.on("touchstart", p)
                }));
                r(this, "afterDrawTracker")
            }
        };
        x.column && (x.column.prototype.drawTracker = t.drawTrackerPoint);
        x.pie && (x.pie.prototype.drawTracker = t.drawTrackerPoint);
        x.scatter && (x.scatter.prototype.drawTracker = t.drawTrackerPoint);
        C(e.prototype, {
            setItemEvents: function(a, c, d) {
                var e = this,
                    h = e.chart.renderer.boxWrapper,
                    n = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
                (d ? c : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    h.addClass(n);
                    c.css(e.options.itemHoverStyle)
                }).on("mouseout", function() {
                    c.css(g(a.visible ? e.itemStyle : e.itemHiddenStyle));
                    h.removeClass(n);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    h.removeClass(n);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : r(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = G("input", {
                        type: "checkbox",
                        className: "highcharts-legend-checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle,
                    this.chart.container);
                E(a.checkbox, "click", function(b) {
                    r(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        l.legend.itemStyle.cursor = "pointer";
        C(F.prototype, {
            showResetZoom: function() {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = l.lang,
                    d = b.options.chart.resetZoomButton,
                    e = d.theme,
                    g = e.states,
                    f = "chart" === d.relativeTo ? null : "plotBox";
                r(this, "beforeShowResetZoom", null, function() {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, g && g.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, f)
                })
            },
            zoomOut: function() {
                r(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(a) {
                var b, c = this.pointer,
                    e = !1,
                    h;
                !a || a.resetSelection ? (u(this.axes, function(a) {
                    b = a.zoom()
                }), c.initiated = !1) : u(a.xAxis.concat(a.yAxis), function(a) {
                    var d = a.axis;
                    c[d.isXAxis ? "zoomX" : "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn && (e = !0))
                });
                h = this.resetZoomButton;
                e && !h ? this.showResetZoom() : !e && d(h) && (this.resetZoomButton = h.destroy());
                b && this.redraw(m(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && u(d, function(a) {
                    a.setState()
                });
                u("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        h = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        g = c[d],
                        k = (b.pointRange || 0) / 2,
                        n = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                        f = b.getExtremes(),
                        m = b.toValue(g - h, !0) + k * n,
                        n = b.toValue(g + b.len - h, !0) - k * n,
                        l = n < m,
                        g = l ? n : m,
                        m = l ? m : n,
                        n = Math.min(f.dataMin, k ? f.min :
                            b.toValue(b.toPixels(f.min) - b.minPixelPadding)),
                        k = Math.max(f.dataMax, k ? f.max : b.toValue(b.toPixels(f.max) + b.minPixelPadding)),
                        l = n - g;
                    0 < l && (m += l, g = n);
                    l = m - k;
                    0 < l && (m = k, g -= l);
                    b.series.length && g !== f.min && m !== f.max && (b.setExtremes(g, m, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = h
                });
                e && c.redraw(!1);
                q(c.container, {
                    cursor: "move"
                })
            }
        });
        C(b.prototype, {
            select: function(a, b) {
                var c = this,
                    d = c.series,
                    e = d.chart;
                a = m(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[p(c,
                        d.data)] = c.options;
                    c.setState(a && "select");
                    b || u(e.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[p(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                u(a.hoverPoints || [], function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = g(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function(a, c) {
                        E(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    e = this.series,
                    g = e.options.states[a || "normal"] || {},
                    n = f[e.type].marker && e.options.marker,
                    v = n && !1 === n.enabled,
                    l = n && n.states && n.states[a || "normal"] || {},
                    k = !1 === l.enabled,
                    p = e.stateMarkerGraphic,
                    t = this.marker || {},
                    x = e.chart,
                    q = e.halo,
                    B, u = n && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (k || v && !1 === l.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
                    u && (B = e.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(e.pointAttribs(this, a), m(x.options.chart.animation, g.animation)), B && this.graphic.animate(B, m(x.options.chart.animation, l.animation,
                        n.animation)), p && p.hide();
                    else {
                        if (a && l) {
                            n = t.symbol || e.symbol;
                            p && p.currentSymbol !== n && (p = p.destroy());
                            if (p) p[b ? "animate" : "attr"]({
                                x: B.x,
                                y: B.y
                            });
                            else n && (e.stateMarkerGraphic = p = x.renderer.symbol(n, B.x, B.y, B.width, B.height).add(e.markerGroup), p.currentSymbol = n);
                            p && p.attr(e.pointAttribs(this, a))
                        }
                        p && (p[a && x.isInsidePlot(c, d, x.inverted) ? "show" : "hide"](), p.element.point = this)
                    }(c = g.halo) && c.size ? (q || (e.halo = q = x.renderer.path().add((this.graphic || p).parentGroup)), q.show()[b ? "animate" : "attr"]({
                            d: this.haloPath(c.size)
                        }),
                        q.attr({
                            "class": "highcharts-halo highcharts-color-" + m(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""),
                            zIndex: -1
                        }), q.point = this, q.attr(C({
                            fill: this.color || e.color,
                            "fill-opacity": c.opacity
                        }, c.attributes))) : q && q.point && q.point.haloPath && q.animate({
                        d: q.point.haloPath(0)
                    }, null, q.hide);
                    this.state = a;
                    r(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        C(c.prototype, {
            onMouseOver: function() {
                var a =
                    this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && r(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && r(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    d = b.graph,
                    e = c.states,
                    g = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !==
                    a && (u([b.group, b.markerGroup, b.dataLabelsGroup], function(c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (g = e[a].lineWidth || g + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (g = {
                            "stroke-width": g
                        }, d.animate(g, m(e[a || "normal"] && e[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(g), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    g, f = d.options.chart.ignoreHiddenSeries,
                    n = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !n : a) ? "show" : "hide";
                u(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && u(d.series, function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                u(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                f && (d.isDirtyBox = !0);
                r(c, g);
                !1 !== b && d.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                r(this, a ? "select" : "unselect")
            },
            drawTracker: t.drawTrackerGraph
        })
    })(J);
    (function(a) {
        var E = a.Chart,
            F = a.each,
            G = a.inArray,
            q = a.isArray,
            l = a.isObject,
            f = a.pick,
            u = a.splat;
        E.prototype.setResponsive = function(f) {
            var l = this.options.responsive,
                q = [],
                p = this.currentResponsive;
            l && l.rules && F(l.rules, function(d) {
                void 0 === d._id && (d._id = a.uniqueKey());
                this.matchResponsiveRule(d, q,
                    f)
            }, this);
            var d = a.merge.apply(0, a.map(q, function(d) {
                    return a.find(l.rules, function(a) {
                        return a._id === d
                    }).chartOptions
                })),
                q = q.toString() || void 0;
            q !== (p && p.ruleIds) && (p && this.update(p.undoOptions, f), q ? (this.currentResponsive = {
                ruleIds: q,
                mergedOptions: d,
                undoOptions: this.currentOptions(d)
            }, this.update(d, f)) : this.currentResponsive = void 0)
        };
        E.prototype.matchResponsiveRule = function(a, l) {
            var q = a.condition;
            (q.callback || function() {
                return this.chartWidth <= f(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= f(q.maxHeight,
                    Number.MAX_VALUE) && this.chartWidth >= f(q.minWidth, 0) && this.chartHeight >= f(q.minHeight, 0)
            }).call(this) && l.push(a._id)
        };
        E.prototype.currentOptions = function(f) {
            function r(f, d, e, g) {
                var m;
                a.objectEach(f, function(a, c) {
                    if (!g && -1 < G(c, ["series", "xAxis", "yAxis"]))
                        for (a = u(a), e[c] = [], m = 0; m < a.length; m++) d[c][m] && (e[c][m] = {}, r(a[m], d[c][m], e[c][m], g + 1));
                    else l(a) ? (e[c] = q(a) ? [] : {}, r(a, d[c] || {}, e[c], g + 1)) : e[c] = d[c] || null
                })
            }
            var y = {};
            r(f, this.options, y, 0);
            return y
        }
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.Axis,
            G = a.Chart,
            q = a.css,
            l = a.defined,
            f = a.each,
            u = a.extend,
            C = a.noop,
            r = a.pick,
            y = a.timeUnits,
            p = a.wrap;
        p(a.Series.prototype, "init", function(a) {
            var d;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (d = this.xAxis) && d.options.ordinal && E(this, "updatedData", function() {
                delete d.ordinalIndex
            })
        });
        p(F.prototype, "getTimeTicks", function(a, e, g, f, b, c, p, q) {
            var d = 0,
                n, m, x = {},
                r, h, B, u = [],
                v = -Number.MAX_VALUE,
                w = this.options.tickPixelInterval,
                k = this.chart.time;
            if (!this.options.ordinal && !this.options.breaks || !c || 3 > c.length || void 0 ===
                g) return a.call(this, e, g, f, b);
            h = c.length;
            for (n = 0; n < h; n++) {
                B = n && c[n - 1] > f;
                c[n] < g && (d = n);
                if (n === h - 1 || c[n + 1] - c[n] > 5 * p || B) {
                    if (c[n] > v) {
                        for (m = a.call(this, e, c[d], c[n], b); m.length && m[0] <= v;) m.shift();
                        m.length && (v = m[m.length - 1]);
                        u = u.concat(m)
                    }
                    d = n + 1
                }
                if (B) break
            }
            a = m.info;
            if (q && a.unitRange <= y.hour) {
                n = u.length - 1;
                for (d = 1; d < n; d++) k.dateFormat("%d", u[d]) !== k.dateFormat("%d", u[d - 1]) && (x[u[d]] = "day", r = !0);
                r && (x[u[0]] = "day");
                a.higherRanks = x
            }
            u.info = a;
            if (q && l(w)) {
                q = k = u.length;
                n = [];
                var A;
                for (r = []; q--;) d = this.translate(u[q]),
                    A && (r[q] = A - d), n[q] = A = d;
                r.sort();
                r = r[Math.floor(r.length / 2)];
                r < .6 * w && (r = null);
                q = u[k - 1] > f ? k - 1 : k;
                for (A = void 0; q--;) d = n[q], f = Math.abs(A - d), A && f < .8 * w && (null === r || f < .8 * r) ? (x[u[q]] && !x[u[q + 1]] ? (f = q + 1, A = d) : f = q, u.splice(f, 1)) : A = d
            }
            return u
        });
        u(F.prototype, {
            beforeSetTickPositions: function() {
                var a, e = [],
                    g, m = !1,
                    b, c = this.getExtremes(),
                    p = c.min,
                    q = c.max,
                    t, n = this.isXAxis && !!this.options.breaks,
                    c = this.options.ordinal,
                    u = Number.MAX_VALUE,
                    z = this.chart.options.chart.ignoreHiddenSeries;
                b = "highcharts-navigator-xaxis" === this.options.className;
                var D;
                !this.options.overscroll || this.max !== this.dataMax || this.chart.mouseIsDown && !b || this.eventArgs && (!this.eventArgs || "navigator" === this.eventArgs.trigger) || (this.max += this.options.overscroll, !b && l(this.userMin) && (this.min += this.options.overscroll));
                if (c || n) {
                    f(this.series, function(b, c) {
                        g = [];
                        if (!(z && !1 === b.visible || !1 === b.takeOrdinalPosition && !n) && (e = e.concat(b.processedXData), a = e.length, e.sort(function(a, b) {
                                return a - b
                            }), u = Math.min(u, r(b.closestPointRange, u)), a)) {
                            for (c = 0; c < a - 1;) e[c] !== e[c + 1] && g.push(e[c +
                                1]), c++;
                            g[0] !== e[0] && g.unshift(e[0]);
                            e = g
                        }
                        b.isSeriesBoosting && (D = !0)
                    });
                    D && (e.length = 0);
                    a = e.length;
                    if (2 < a) {
                        b = e[1] - e[0];
                        for (t = a - 1; t-- && !m;) e[t + 1] - e[t] !== b && (m = !0);
                        !this.options.keepOrdinalPadding && (e[0] - p > b || q - e[e.length - 1] > b) && (m = !0)
                    } else this.options.overscroll && (2 === a ? u = e[1] - e[0] : 1 === a ? (u = this.options.overscroll, e = [e[0], e[0] + u]) : u = this.overscrollPointsRange);
                    m ? (this.options.overscroll && (this.overscrollPointsRange = u, e = e.concat(this.getOverscrollPositions())), this.ordinalPositions = e, b = this.ordinal2lin(Math.max(p,
                        e[0]), !0), t = Math.max(this.ordinal2lin(Math.min(q, e[e.length - 1]), !0), 1), this.ordinalSlope = q = (q - p) / (t - b), this.ordinalOffset = p - b * q) : (this.overscrollPointsRange = r(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
                }
                this.isOrdinal = c && m;
                this.groupIntervalFactor = null
            },
            val2lin: function(a, e) {
                var d = this.ordinalPositions;
                if (d) {
                    var f = d.length,
                        b, c;
                    for (b = f; b--;)
                        if (d[b] === a) {
                            c = b;
                            break
                        }
                    for (b = f - 1; b--;)
                        if (a > d[b] || 0 === b) {
                            a = (a - d[b]) / (d[b + 1] - d[b]);
                            c = b +
                                a;
                            break
                        }
                    e = e ? c : this.ordinalSlope * (c || 0) + this.ordinalOffset
                } else e = a;
                return e
            },
            lin2val: function(a, e) {
                var d = this.ordinalPositions;
                if (d) {
                    var f = this.ordinalSlope,
                        b = this.ordinalOffset,
                        c = d.length - 1,
                        l;
                    if (e) 0 > a ? a = d[0] : a > c ? a = d[c] : (c = Math.floor(a), l = a - c);
                    else
                        for (; c--;)
                            if (e = f * c + b, a >= e) {
                                f = f * (c + 1) + b;
                                l = (a - e) / (f - e);
                                break
                            } return void 0 !== l && void 0 !== d[c] ? d[c] + (l ? l * (d[c + 1] - d[c]) : 0) : a
                }
                return a
            },
            getExtendedPositions: function() {
                var a = this,
                    e = a.chart,
                    g = a.series[0].currentDataGrouping,
                    m = a.ordinalIndex,
                    b = g ? g.count + g.unitName :
                    "raw",
                    c = a.options.overscroll,
                    l = a.getExtremes(),
                    p, t;
                m || (m = a.ordinalIndex = {});
                m[b] || (p = {
                    series: [],
                    chart: e,
                    getExtremes: function() {
                        return {
                            min: l.dataMin,
                            max: l.dataMax + c
                        }
                    },
                    options: {
                        ordinal: !0
                    },
                    val2lin: F.prototype.val2lin,
                    ordinal2lin: F.prototype.ordinal2lin
                }, f(a.series, function(b) {
                    t = {
                        xAxis: p,
                        xData: b.xData.slice(),
                        chart: e,
                        destroyGroupedData: C
                    };
                    t.xData = t.xData.concat(a.getOverscrollPositions());
                    t.options = {
                        dataGrouping: g ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [
                                [g.unitName, [g.count]]
                            ]
                        } : {
                            enabled: !1
                        }
                    };
                    b.processData.apply(t);
                    p.series.push(t)
                }), a.beforeSetTickPositions.apply(p), m[b] = p.ordinalPositions);
                return m[b]
            },
            getOverscrollPositions: function() {
                var d = this.options.overscroll,
                    e = this.overscrollPointsRange,
                    g = [],
                    f = this.dataMax;
                if (a.defined(e))
                    for (g.push(f); f <= this.dataMax + d;) f += e, g.push(f);
                return g
            },
            getGroupIntervalFactor: function(a, e, g) {
                var d;
                g = g.processedXData;
                var b = g.length,
                    c = [];
                d = this.groupIntervalFactor;
                if (!d) {
                    for (d = 0; d < b - 1; d++) c[d] = g[d + 1] - g[d];
                    c.sort(function(a, b) {
                        return a - b
                    });
                    c = c[Math.floor(b /
                        2)];
                    a = Math.max(a, g[0]);
                    e = Math.min(e, g[b - 1]);
                    this.groupIntervalFactor = d = b * c / (e - a)
                }
                return d
            },
            postProcessTickInterval: function(a) {
                var d = this.ordinalSlope;
                return d ? this.options.breaks ? this.closestPointRange || a : a / (d / this.closestPointRange) : a
            }
        });
        F.prototype.ordinal2lin = F.prototype.val2lin;
        p(G.prototype, "pan", function(a, e) {
            var d = this.xAxis[0],
                m = d.options.overscroll,
                b = e.chartX,
                c = !1;
            if (d.options.ordinal && d.series.length) {
                var l = this.mouseDownX,
                    p = d.getExtremes(),
                    t = p.dataMax,
                    n = p.min,
                    r = p.max,
                    z = this.hoverPoints,
                    D = d.closestPointRange || d.overscrollPointsRange,
                    l = (l - b) / (d.translationSlope * (d.ordinalSlope || D)),
                    h = {
                        ordinalPositions: d.getExtendedPositions()
                    },
                    D = d.lin2val,
                    u = d.val2lin,
                    y;
                h.ordinalPositions ? 1 < Math.abs(l) && (z && f(z, function(a) {
                        a.setState()
                    }), 0 > l ? (z = h, y = d.ordinalPositions ? d : h) : (z = d.ordinalPositions ? d : h, y = h), h = y.ordinalPositions, t > h[h.length - 1] && h.push(t), this.fixedRange = r - n, l = d.toFixedRange(null, null, D.apply(z, [u.apply(z, [n, !0]) + l, !0]), D.apply(y, [u.apply(y, [r, !0]) + l, !0])), l.min >= Math.min(p.dataMin, n) &&
                    l.max <= Math.max(t, r) + m && d.setExtremes(l.min, l.max, !0, !1, {
                        trigger: "pan"
                    }), this.mouseDownX = b, q(this.container, {
                        cursor: "move"
                    })) : c = !0
            } else c = !0;
            c && (m && (d.max = d.dataMax + m), a.apply(this, Array.prototype.slice.call(arguments, 1)))
        })
    })(J);
    (function(a) {
        function E() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function F(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, q(this.pointArrayMap, ["y"]))
        }
        var G = a.addEvent,
            q = a.pick,
            l = a.wrap,
            f = a.each,
            u = a.extend,
            C = a.isArray,
            r = a.fireEvent,
            y = a.Axis,
            p = a.Series;
        u(y.prototype, {
            isInBreak: function(a, e) {
                var d = a.repeat || Infinity,
                    f = a.from,
                    b = a.to - a.from;
                e = e >= f ? (e - f) % d : d - (f - e) % d;
                return a.inclusive ? e <= b : e < b && 0 !== e
            },
            isInAnyBreak: function(a, e) {
                var d = this.options.breaks,
                    f = d && d.length,
                    b, c, l;
                if (f) {
                    for (; f--;) this.isInBreak(d[f], a) && (b = !0, c || (c = q(d[f].showPoints, this.isXAxis ? !1 : !0)));
                    l = b && e ? b && !c : b
                }
                return l
            }
        });
        G(y, "afterSetTickPositions", function() {
            if (this.options.breaks) {
                var a = this.tickPositions,
                    e = this.tickPositions.info,
                    g = [],
                    f;
                for (f = 0; f < a.length; f++) this.isInAnyBreak(a[f]) ||
                    g.push(a[f]);
                this.tickPositions = g;
                this.tickPositions.info = e
            }
        });
        G(y, "afterSetOptions", function() {
            this.options.breaks && this.options.breaks.length && (this.options.ordinal = !1)
        });
        G(y, "afterInit", function() {
            var a = this,
                e;
            e = this.options.breaks;
            a.isBroken = C(e) && !!e.length;
            a.isBroken && (a.val2lin = function(d) {
                var e = d,
                    b, c;
                for (c = 0; c < a.breakArray.length; c++)
                    if (b = a.breakArray[c], b.to <= d) e -= b.len;
                    else if (b.from >= d) break;
                else if (a.isInBreak(b, d)) {
                    e -= d - b.from;
                    break
                }
                return e
            }, a.lin2val = function(d) {
                var e, b;
                for (b = 0; b < a.breakArray.length &&
                    !(e = a.breakArray[b], e.from >= d); b++) e.to < d ? d += e.len : a.isInBreak(e, d) && (d += e.len);
                return d
            }, a.setExtremes = function(a, d, b, c, e) {
                for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
                for (; this.isInAnyBreak(d);) d -= this.closestPointRange;
                y.prototype.setExtremes.call(this, a, d, b, c, e)
            }, a.setAxisTranslation = function(d) {
                y.prototype.setAxisTranslation.call(this, d);
                d = a.options.breaks;
                var e = [],
                    b = [],
                    c = 0,
                    g, l, p = a.userMin || a.min,
                    n = a.userMax || a.max,
                    u = q(a.pointRangePadding, 0),
                    z, D;
                f(d, function(b) {
                    l = b.repeat || Infinity;
                    a.isInBreak(b,
                        p) && (p += b.to % l - p % l);
                    a.isInBreak(b, n) && (n -= n % l - b.from % l)
                });
                f(d, function(a) {
                    z = a.from;
                    for (l = a.repeat || Infinity; z - l > p;) z -= l;
                    for (; z < p;) z += l;
                    for (D = z; D < n; D += l) e.push({
                        value: D,
                        move: "in"
                    }), e.push({
                        value: D + (a.to - a.from),
                        move: "out",
                        size: a.breakSize
                    })
                });
                e.sort(function(a, b) {
                    return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                });
                g = 0;
                z = p;
                f(e, function(a) {
                    g += "in" === a.move ? 1 : -1;
                    1 === g && "in" === a.move && (z = a.value);
                    0 === g && (b.push({
                            from: z,
                            to: a.value,
                            len: a.value - z - (a.size || 0)
                        }), c += a.value - z -
                        (a.size || 0))
                });
                a.breakArray = b;
                a.unitLength = n - p - c + u;
                r(a, "afterBreaks");
                a.options.staticScale ? a.transA = a.options.staticScale : a.unitLength && (a.transA *= (n - a.min + u) / a.unitLength);
                u && (a.minPixelPadding = a.transA * a.minPointOffset);
                a.min = p;
                a.max = n
            })
        });
        l(p.prototype, "generatePoints", function(a) {
            a.apply(this, E(arguments));
            var d = this.xAxis,
                f = this.yAxis,
                m = this.points,
                b, c = m.length,
                l = this.options.connectNulls,
                p;
            if (d && f && (d.options.breaks || f.options.breaks))
                for (; c--;) b = m[c], p = null === b.y && !1 === l, p || !d.isInAnyBreak(b.x, !0) && !f.isInAnyBreak(b.y, !0) || (m.splice(c, 1), this.data[c] && this.data[c].destroyElements())
        });
        a.Series.prototype.drawBreaks = function(a, e) {
            var d = this,
                m = d.points,
                b, c, l, p;
            a && f(e, function(e) {
                b = a.breakArray || [];
                c = a.isXAxis ? a.min : q(d.options.threshold, a.min);
                f(m, function(d) {
                    p = q(d["stack" + e.toUpperCase()], d[e]);
                    f(b, function(b) {
                        l = !1;
                        if (c < b.from && p > b.to || c > b.from && p < b.from) l = "pointBreak";
                        else if (c < b.from && p > b.from && p < b.to || c > b.from && p > b.to && p < b.from) l = "pointInBreak";
                        l && r(a, l, {
                            point: d,
                            brk: b
                        })
                    })
                })
            })
        };
        a.Series.prototype.gappedPath =
            function() {
                var d = this.currentDataGrouping,
                    e = d && d.totalRange,
                    d = this.options.gapSize,
                    f = this.points.slice(),
                    l = f.length - 1,
                    b = this.yAxis;
                if (d && 0 < l)
                    for ("value" !== this.options.gapUnit && (d *= this.closestPointRange), e && e > d && (d = e); l--;) f[l + 1].x - f[l].x > d && (e = (f[l].x + f[l + 1].x) / 2, f.splice(l + 1, 0, {
                        isNull: !0,
                        x: e
                    }), this.options.stacking && (e = b.stacks[this.stackKey][e] = new a.StackItem(b, b.options.stackLabels, !1, e, this.stack), e.total = 0));
                return this.getGraphPath(f)
            };
        l(a.seriesTypes.column.prototype, "drawPoints", F);
        l(a.Series.prototype,
            "drawPoints", F)
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.arrayMax,
            G = a.arrayMin,
            q = a.Axis,
            l = a.defaultPlotOptions,
            f = a.defined,
            u = a.each,
            C = a.extend,
            r = a.format,
            y = a.isNumber,
            p = a.merge,
            d = a.pick,
            e = a.Point,
            g = a.Series,
            m = a.Tooltip,
            b = a.wrap,
            c = g.prototype,
            x = c.processData,
            B = c.generatePoints,
            t = {
                approximation: "average",
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M",
                        "%A, %b %e, %H:%M", "-%H:%M"
                    ],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            },
            n = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                    approximation: "sum",
                    groupPixelWidth: 10
                },
                arearange: {
                    approximation: "range"
                },
                areasplinerange: {
                    approximation: "range"
                },
                columnrange: {
                    approximation: "range",
                    groupPixelWidth: 10
                },
                candlestick: {
                    approximation: "ohlc",
                    groupPixelWidth: 10
                },
                ohlc: {
                    approximation: "ohlc",
                    groupPixelWidth: 5
                }
            },
            L = a.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ],
            z = a.approximations = {
                sum: function(a) {
                    var b = a.length,
                        c;
                    if (!b && a.hasNulls) c = null;
                    else if (b)
                        for (c = 0; b--;) c += a[b];
                    return c
                },
                average: function(a) {
                    var b = a.length;
                    a = z.sum(a);
                    y(a) && b && (a /= b);
                    return a
                },
                averages: function() {
                    var a = [];
                    u(arguments, function(b) {
                        a.push(z.average(b))
                    });
                    return void 0 === a[0] ? void 0 : a
                },
                open: function(a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                },
                high: function(a) {
                    return a.length ? F(a) : a.hasNulls ? null : void 0
                },
                low: function(a) {
                    return a.length ? G(a) : a.hasNulls ? null : void 0
                },
                close: function(a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                },
                ohlc: function(a, b, c, d) {
                    a = z.open(a);
                    b = z.high(b);
                    c = z.low(c);
                    d = z.close(d);
                    if (y(a) || y(b) || y(c) || y(d)) return [a, b, c, d]
                },
                range: function(a, b) {
                    a = z.low(a);
                    b = z.high(b);
                    if (y(a) ||
                        y(b)) return [a, b];
                    if (null === a && null === b) return null
                }
            };
        c.groupData = function(a, b, c, d) {
            var e = this,
                g = e.data,
                k = e.options.data,
                h = [],
                l = [],
                m = [],
                p = a.length,
                q, r, x = !!b,
                D = [];
            d = "function" === typeof d ? d : z[d] || n[e.type] && z[n[e.type].approximation] || z[t.approximation];
            var B = e.pointArrayMap,
                C = B && B.length,
                H = ["x"].concat(B || ["y"]),
                E = 0,
                L = 0,
                F, I;
            C ? u(B, function() {
                D.push([])
            }) : D.push([]);
            F = C || 1;
            for (I = 0; I <= p && !(a[I] >= c[0]); I++);
            for (I; I <= p; I++) {
                for (; void 0 !== c[E + 1] && a[I] >= c[E + 1] || I === p;) {
                    q = c[E];
                    e.dataGroupInfo = {
                        start: L,
                        length: D[0].length
                    };
                    r = d.apply(e, D);
                    f(e.dataGroupInfo.options) || (e.dataGroupInfo.options = e.pointClass.prototype.optionsToObject.call({
                        series: e
                    }, e.options.data[L]), u(H, function(a) {
                        delete e.dataGroupInfo.options[a]
                    }));
                    void 0 !== r && (h.push(q), l.push(r), m.push(e.dataGroupInfo));
                    L = I;
                    for (q = 0; q < F; q++) D[q].length = 0, D[q].hasNulls = !1;
                    E += 1;
                    if (I === p) break
                }
                if (I === p) break;
                if (B) {
                    q = e.cropStart + I;
                    r = g && g[q] || e.pointClass.prototype.applyOptions.apply({
                        series: e
                    }, [k[q]]);
                    var G;
                    for (q = 0; q < C; q++) G = r[B[q]], y(G) ? D[q].push(G) : null === G && (D[q].hasNulls = !0)
                } else q = x ? b[I] : null, y(q) ? D[0].push(q) : null === q && (D[0].hasNulls = !0)
            }
            return [h, l, m]
        };
        c.processData = function() {
            var a = this.chart,
                b = this.options.dataGrouping,
                e = !1 !== this.allowDG && b && d(b.enabled, a.options.isStock),
                g = this.visible || !a.options.chart.ignoreHiddenSeries,
                n, l = this.currentDataGrouping,
                k;
            this.forceCrop = e;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== x.apply(this, arguments) && e) {
                this.destroyGroupedData();
                var m, p = b.groupAll ? this.xData : this.processedXData,
                    t = b.groupAll ? this.yData : this.processedYData,
                    q = a.plotSizeX,
                    a = this.xAxis,
                    r = a.options.ordinal,
                    z = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (z) {
                    this.isDirty = n = !0;
                    this.points = null;
                    e = a.getExtremes();
                    k = e.min;
                    e = e.max;
                    r = r && a.getGroupIntervalFactor(k, e, this) || 1;
                    z = z * (e - k) / q * r;
                    q = a.getTimeTicks(a.normalizeTimeTickInterval(z, b.units || L), Math.min(k, p[0]), Math.max(e, p[p.length - 1]), a.options.startOfWeek, p, this.closestPointRange);
                    t = c.groupData.apply(this, [p, t, q, b.approximation]);
                    p = t[0];
                    r = t[1];
                    if (b.smoothed && p.length) {
                        m = p.length - 1;
                        for (p[m] =
                            Math.min(p[m], e); m-- && 0 < m;) p[m] += z / 2;
                        p[0] = Math.max(p[0], k)
                    }
                    k = q.info;
                    this.closestPointRange = q.info.totalRange;
                    this.groupMap = t[2];
                    if (f(p[0]) && p[0] < a.dataMin && g) {
                        if (!f(a.options.min) && a.min <= a.dataMin || a.min === a.dataMin) a.min = p[0];
                        a.dataMin = p[0]
                    }
                    b.groupAll && (b = this.cropData(p, r, a.min, a.max, 1), p = b.xData, r = b.yData);
                    this.processedXData = p;
                    this.processedYData = r
                } else this.groupMap = null;
                this.hasGroupedData = n;
                this.currentDataGrouping = k;
                this.preventGraphAnimation = (l && l.totalRange) !== (k && k.totalRange)
            }
        };
        c.destroyGroupedData =
            function() {
                var a = this.groupedData;
                u(a || [], function(b, c) {
                    b && (a[c] = b.destroy ? b.destroy() : null)
                });
                this.groupedData = null
            };
        c.generatePoints = function() {
            B.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        E(e, "update", function() {
            if (this.dataGroup) return a.error(24), !1
        });
        b(m.prototype, "tooltipFooterHeaderFormatter", function(a, b, c) {
            var d = this.chart.time,
                e = b.series,
                f = e.tooltipOptions,
                k = e.options.dataGrouping,
                g = f.xDateFormat,
                h, n = e.xAxis;
            return n && "datetime" === n.options.type &&
                k && y(b.key) ? (a = e.currentDataGrouping, k = k.dateTimeLabelFormats, a ? (n = k[a.unitName], 1 === a.count ? g = n[0] : (g = n[1], h = n[2])) : !g && k && (g = this.getXDateFormat(b, f, n)), g = d.dateFormat(g, b.key), h && (g += d.dateFormat(h, b.key + a.totalRange - 1)), r(f[(c ? "footer" : "header") + "Format"], {
                    point: C(b.point, {
                        key: g
                    }),
                    series: e
                }, d)) : a.call(this, b, c)
        });
        E(g, "destroy", c.destroyGroupedData);
        E(g, "afterSetOptions", function(a) {
            a = a.options;
            var b = this.type,
                c = this.chart.options.plotOptions,
                d = l[b].dataGrouping,
                e = this.useCommonDataGrouping && t;
            if (n[b] || e) d || (d = p(t, n[b])), a.dataGrouping = p(e, d, c.series && c.series.dataGrouping, c[b].dataGrouping, this.userOptions.dataGrouping);
            this.chart.options.isStock && (this.requireSorting = !0)
        });
        E(q, "afterSetScale", function() {
            u(this.series, function(a) {
                a.hasProcessed = !1
            })
        });
        q.prototype.getGroupPixelWidth = function() {
            var a = this.series,
                b = a.length,
                c, d = 0,
                e = !1,
                f;
            for (c = b; c--;)(f = a[c].options.dataGrouping) && (d = Math.max(d, f.groupPixelWidth));
            for (c = b; c--;)(f = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData ||
                a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / d || b && f.forced) && (e = !0);
            return e ? d : 0
        };
        q.prototype.setDataGrouping = function(a, b) {
            var c;
            b = d(b, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof q)
                for (c = this.series.length; c--;) this.series[c].update({
                    dataGrouping: a
                }, !1);
            else u(this.chart.options.series, function(b) {
                b.dataGrouping = a
            }, !1);
            this.ordinalSlope = null;
            b && this.chart.redraw()
        }
    })(J);
    (function(a) {
        var E = a.each,
            F = a.Point,
            G = a.seriesType,
            q = a.seriesTypes;
        G("ohlc", "column", {
            lineWidth: 1,
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'
            },
            threshold: null,
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            stickyTracking: !0
        }, {
            directTouch: !1,
            pointArrayMap: ["open", "high", "low", "close"],
            toYData: function(a) {
                return [a.open, a.high, a.low, a.close]
            },
            pointValKey: "close",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            init: function() {
                q.column.prototype.init.apply(this, arguments);
                this.options.stacking = !1
            },
            pointAttribs: function(a, f) {
                f = q.column.prototype.pointAttribs.call(this, a, f);
                var l = this.options;
                delete f.fill;
                !a.options.color && l.upColor && a.open < a.close &&
                    (f.stroke = l.upColor);
                return f
            },
            translate: function() {
                var a = this,
                    f = a.yAxis,
                    u = !!a.modifyValue,
                    C = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                q.column.prototype.translate.apply(a);
                E(a.points, function(l) {
                    E([l.open, l.high, l.low, l.close, l.low], function(q, p) {
                        null !== q && (u && (q = a.modifyValue(q)), l[C[p]] = f.toPixels(q, !0))
                    });
                    l.tooltipPos[1] = l.plotHigh + f.pos - a.chart.plotTop
                })
            },
            drawPoints: function() {
                var a = this,
                    f = a.chart;
                E(a.points, function(l) {
                    var q, r, u, p, d = l.graphic,
                        e, g = !d;
                    void 0 !== l.plotY && (d || (l.graphic =
                        d = f.renderer.path().add(a.group)), d.attr(a.pointAttribs(l, l.selected && "select")), r = d.strokeWidth() % 2 / 2, e = Math.round(l.plotX) - r, u = Math.round(l.shapeArgs.width / 2), p = ["M", e, Math.round(l.yBottom), "L", e, Math.round(l.plotHigh)], null !== l.open && (q = Math.round(l.plotOpen) + r, p.push("M", e, q, "L", e - u, q)), null !== l.close && (q = Math.round(l.plotClose) + r, p.push("M", e, q, "L", e + u, q)), d[g ? "attr" : "animate"]({
                        d: p
                    }).addClass(l.getClassName(), !0))
                })
            },
            animate: null
        }, {
            getClassName: function() {
                return F.prototype.getClassName.call(this) +
                    (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
        })
    })(J);
    (function(a) {
        var E = a.defaultPlotOptions,
            F = a.each,
            G = a.merge,
            q = a.seriesType,
            l = a.seriesTypes;
        q("candlestick", "ohlc", G(E.column, {
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            tooltip: E.ohlc.tooltip,
            threshold: null,
            lineColor: "#000000",
            lineWidth: 1,
            upColor: "#ffffff",
            stickyTracking: !0
        }), {
            pointAttribs: function(a, q) {
                var f = l.column.prototype.pointAttribs.call(this, a, q),
                    r = this.options,
                    u = a.open < a.close,
                    p = r.lineColor || this.color;
                f["stroke-width"] = r.lineWidth;
                f.fill = a.options.color || (u ? r.upColor || this.color : this.color);
                f.stroke = a.lineColor || (u ? r.upLineColor || p : p);
                q && (a = r.states[q], f.fill = a.color || f.fill, f.stroke = a.lineColor || f.stroke, f["stroke-width"] = a.lineWidth || f["stroke-width"]);
                return f
            },
            drawPoints: function() {
                var a = this,
                    l = a.chart,
                    q = a.yAxis.reversed;
                F(a.points, function(f) {
                    var r = f.graphic,
                        p, d, e, g, m, b, c, x = !r;
                    void 0 !== f.plotY && (r || (f.graphic = r = l.renderer.path().add(a.group)), r.attr(a.pointAttribs(f, f.selected && "select")).shadow(a.options.shadow), m = r.strokeWidth() %
                        2 / 2, b = Math.round(f.plotX) - m, p = f.plotOpen, d = f.plotClose, e = Math.min(p, d), p = Math.max(p, d), c = Math.round(f.shapeArgs.width / 2), d = q ? p !== f.yBottom : Math.round(e) !== Math.round(f.plotHigh), g = q ? Math.round(e) !== Math.round(f.plotHigh) : p !== f.yBottom, e = Math.round(e) + m, p = Math.round(p) + m, m = [], m.push("M", b - c, p, "L", b - c, e, "L", b + c, e, "L", b + c, p, "Z", "M", b, e, "L", b, d ? Math.round(q ? f.yBottom : f.plotHigh) : e, "M", b, p, "L", b, g ? Math.round(q ? f.plotHigh : f.yBottom) : p), r[x ? "attr" : "animate"]({
                            d: m
                        }).addClass(f.getClassName(), !0))
                })
            }
        })
    })(J);
    ea = function(a) {
        var E = a.each,
            F = a.defined,
            G = a.seriesTypes,
            q = a.stableSort;
        return {
            getPlotBox: function() {
                return a.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            },
            translate: function() {
                G.column.prototype.translate.apply(this);
                var a = this.options,
                    f = this.chart,
                    u = this.points,
                    C = u.length - 1,
                    r, y, p = a.onSeries,
                    p = p && f.get(p),
                    a = a.onKey || "y",
                    d = p && p.options.step,
                    e = p && p.points,
                    g = e && e.length,
                    m = f.inverted,
                    b = this.xAxis,
                    c = this.yAxis,
                    x = 0,
                    B, t, n, L;
                if (p && p.visible && g)
                    for (x =
                        (p.pointXOffset || 0) + (p.barW || 0) / 2, r = p.currentDataGrouping, t = e[g - 1].x + (r ? r.totalRange : 0), q(u, function(a, b) {
                            return a.x - b.x
                        }), a = "plot" + a[0].toUpperCase() + a.substr(1); g-- && u[C] && !(B = e[g], r = u[C], r.y = B.y, B.x <= r.x && void 0 !== B[a] && (r.x <= t && (r.plotY = B[a], B.x < r.x && !d && (n = e[g + 1]) && void 0 !== n[a] && (L = (r.x - B.x) / (n.x - B.x), r.plotY += L * (n[a] - B[a]), r.y += L * (n.y - B.y))), C--, g++, 0 > C)););
                E(u, function(a, d) {
                    var e;
                    a.plotX += x;
                    if (void 0 === a.plotY || m) 0 <= a.plotX && a.plotX <= b.len ? m ? (a.plotY = b.translate(a.x, 0, 1, 0, 1), a.plotX = F(a.y) ?
                        c.translate(a.y, 0, 0, 0, 1) : 0) : a.plotY = f.chartHeight - b.bottom - (b.opposite ? b.height : 0) + b.offset - c.top : a.shapeArgs = {};
                    (y = u[d - 1]) && y.plotX === a.plotX && (void 0 === y.stackIndex && (y.stackIndex = 0), e = y.stackIndex + 1);
                    a.stackIndex = e
                });
                this.onSeries = p
            }
        }
    }(J);
    (function(a, E) {
        function F(a) {
            d[a + "pin"] = function(e, f, b, c, l) {
                var g = l && l.anchorX;
                l = l && l.anchorY;
                "circle" === a && c > b && (e -= Math.round((c - b) / 2), b = c);
                e = d[a](e, f, b, c);
                g && l && (e.push("M", "circle" === a ? e[1] - e[4] : e[1] + e[4] / 2, f > l ? f : f + c, "L", g, l), e = e.concat(d.circle(g - 1, l - 1, 2,
                    2)));
                return e
            }
        }
        var G = a.addEvent,
            q = a.each,
            l = a.merge,
            f = a.noop,
            u = a.Renderer,
            C = a.Series,
            r = a.seriesType,
            y = a.TrackerMixin,
            p = a.VMLRenderer,
            d = a.SVGRenderer.prototype.symbols;
        r("flags", "column", {
            pointRange: 0,
            allowOverlapX: !1,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {
                pointFormat: "{point.text}\x3cbr/\x3e"
            },
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {
                hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: C.prototype.init,
            pointAttribs: function(a, d) {
                var e = this.options,
                    b = a && a.color || this.color,
                    c = e.lineColor,
                    f = a && a.lineWidth;
                a = a && a.fillColor || e.fillColor;
                d && (a = e.states[d].fillColor, c = e.states[d].lineColor, f = e.states[d].lineWidth);
                return {
                    fill: a || b,
                    stroke: c || b,
                    "stroke-width": f || e.lineWidth || 0
                }
            },
            translate: E.translate,
            getPlotBox: E.getPlotBox,
            drawPoints: function() {
                var d = this.points,
                    f = this.chart,
                    m = f.renderer,
                    b, c, p = f.inverted,
                    r = this.options,
                    t = r.y,
                    n, u, z, D, h, y, C = this.yAxis,
                    v = {},
                    w = [];
                for (u = d.length; u--;) z = d[u], y = (p ? z.plotY : z.plotX) > this.xAxis.len, b = z.plotX, D = z.stackIndex, n = z.options.shape || r.shape, c = z.plotY, void 0 !== c && (c = z.plotY + t - (void 0 !== D && D * r.stackDistance)), z.anchorX = D ? void 0 : z.plotX, h = D ? void 0 : z.plotY, D = z.graphic, void 0 !== c && 0 <= b && !y ? (D || (D = z.graphic = m.label("", null, null, n, null, null, r.useHTML).attr(this.pointAttribs(z)).css(l(r.style, z.style)).attr({
                        align: "flag" === n ? "left" : "center",
                        width: r.width,
                        height: r.height,
                        "text-align": r.textAlign
                    }).addClass("highcharts-point").add(this.markerGroup),
                    z.graphic.div && (z.graphic.div.point = z), D.shadow(r.shadow), D.isNew = !0), 0 < b && (b -= D.strokeWidth() % 2), n = {
                    y: c,
                    anchorY: h
                }, r.allowOverlapX && (n.x = b, n.anchorX = z.anchorX), D.attr({
                    text: z.options.title || r.title || "A"
                })[D.isNew ? "attr" : "animate"](n), r.allowOverlapX || (v[z.plotX] ? v[z.plotX].size = Math.max(v[z.plotX].size, D.width) : v[z.plotX] = {
                    align: 0,
                    size: D.width,
                    target: b,
                    anchorX: b
                }), z.tooltipPos = [b, c + C.pos - f.plotTop]) : D && (z.graphic = D.destroy());
                r.allowOverlapX || (a.objectEach(v, function(a) {
                        a.plotX = a.anchorX;
                        w.push(a)
                    }),
                    a.distribute(w, p ? C.len : this.xAxis.len, 100), q(d, function(a) {
                        var b = a.graphic && v[a.plotX];
                        b && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({
                            x: b.pos,
                            anchorX: a.anchorX
                        }), b.pos ? a.graphic.isNew = !1 : (a.graphic.attr({
                            x: -9999,
                            anchorX: -9999
                        }), a.graphic.isNew = !0))
                    }));
                r.useHTML && a.wrap(this.markerGroup, "on", function(b) {
                    return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            },
            drawTracker: function() {
                var a = this.points;
                y.drawTrackerPoint.apply(this);
                q(a, function(d) {
                    var e =
                        d.graphic;
                    e && G(e.element, "mouseover", function() {
                        0 < d.stackIndex && !d.raised && (d._y = e.y, e.attr({
                            y: d._y - 8
                        }), d.raised = !0);
                        q(a, function(a) {
                            a !== d && a.raised && a.graphic && (a.graphic.attr({
                                y: a._y
                            }), a.raised = !1)
                        })
                    })
                })
            },
            animate: function(a) {
                a ? this.setClip() : this.animate = null
            },
            setClip: function() {
                C.prototype.setClip.apply(this, arguments);
                !1 !== this.options.clip && this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey])
            },
            buildKDTree: f,
            invertGroups: f
        });
        d.flag = function(a, f, l, b, c) {
            var e = c && c.anchorX ||
                a;
            c = c && c.anchorY || f;
            return d.circle(e - 1, c - 1, 2, 2).concat(["M", e, c, "L", a, f + b, a, f, a + l, f, a + l, f + b, a, f + b, "Z"])
        };
        F("circle");
        F("square");
        u === p && q(["flag", "circlepin", "squarepin"], function(a) {
            p.prototype.symbols[a] = d[a]
        })
    })(J, ea);
    (function(a) {
        function E(a, c, d) {
            this.init(a, c, d)
        }
        var F = a.addEvent,
            G = a.Axis,
            q = a.correctFloat,
            l = a.defaultOptions,
            f = a.defined,
            u = a.destroyObjectProperties,
            C = a.each,
            r = a.fireEvent,
            y = a.hasTouch,
            p = a.merge,
            d = a.pick,
            e = a.removeEvent,
            g, m = {
                height: a.isTouchDevice ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: void 0,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            };
        l.scrollbar = p(!0, m, l.scrollbar);
        a.swapXY = g = function(a, c) {
            var b = a.length,
                d;
            if (c)
                for (c = 0; c < b; c += 3) d = a[c + 1], a[c + 1] = a[c + 2], a[c + 2] = d;
            return a
        };
        E.prototype = {
            init: function(a, c,
                e) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = c;
                this.options = p(m, c);
                this.chart = e;
                this.size = d(this.options.size, this.options.height);
                c.enabled && (this.render(), this.initEvents(), this.addEvents())
            },
            render: function() {
                var a = this.renderer,
                    c = this.options,
                    d = this.size,
                    e;
                this.group = e = a.g("scrollbar").attr({
                    zIndex: c.zIndex,
                    translateY: -99999
                }).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: c.trackBorderRadius || 0,
                    height: d,
                    width: d
                }).add(e);
                this.track.attr({
                    fill: c.trackBackgroundColor,
                    stroke: c.trackBorderColor,
                    "stroke-width": c.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = a.g().add(e);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: d,
                    width: d,
                    r: c.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(g(["M", -3, d / 4, "L", -3, 2 * d / 3, "M", 0, d / 4, "L", 0, 2 * d / 3, "M", 3, d / 4, "L", 3, 2 * d / 3], c.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                this.scrollbar.attr({
                    fill: c.barBackgroundColor,
                    stroke: c.barBorderColor,
                    "stroke-width": c.barBorderWidth
                });
                this.scrollbarRifles.attr({
                    stroke: c.rifleColor,
                    "stroke-width": 1
                });
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            },
            position: function(a, c, d, e) {
                var b = this.options.vertical,
                    f = 0,
                    g = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = c + this.trackBorderWidth;
                this.width = d;
                this.xOffset = this.height = e;
                this.yOffset = f;
                b ? (this.width = this.yOffset = d = f = this.size, this.xOffset = c = 0, this.barWidth = e - 2 * d, this.x = a += this.options.margin) : (this.height = this.xOffset = e = c = this.size, this.barWidth = d - 2 * e, this.y += this.options.margin);
                this.group[g]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[g]({
                    width: d,
                    height: e
                });
                this.scrollbarButtons[1][g]({
                    translateX: b ? 0 : d - c,
                    translateY: b ? e - f : 0
                })
            },
            drawScrollbarButton: function(a) {
                var b = this.renderer,
                    d = this.scrollbarButtons,
                    e = this.options,
                    f = this.size,
                    n;
                n = b.g().add(this.group);
                d.push(n);
                n = b.rect().addClass("highcharts-scrollbar-button").add(n);
                n.attr({
                    stroke: e.buttonBorderColor,
                    "stroke-width": e.buttonBorderWidth,
                    fill: e.buttonBackgroundColor
                });
                n.attr(n.crisp({
                    x: -.5,
                    y: -.5,
                    width: f + 1,
                    height: f + 1,
                    r: e.buttonBorderRadius
                }, n.strokeWidth()));
                n = b.path(g(["M", f / 2 + (a ? -1 : 1), f / 2 - 3, "L", f / 2 + (a ? -1 : 1), f / 2 + 3, "L", f / 2 + (a ? 2 : -2), f / 2], e.vertical)).addClass("highcharts-scrollbar-arrow").add(d[a]);
                n.attr({
                    fill: e.buttonArrowColor
                })
            },
            setRange: function(a, c) {
                var b = this.options,
                    d = b.vertical,
                    e = b.minWidth,
                    g = this.barWidth,
                    l, m, p = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                f(g) && (a = Math.max(a, 0), l = Math.ceil(g * a), this.calculatedWidth = m = q(g * Math.min(c, 1) - l), m < e && (l = (g - e + m) * a, m = e), e = Math.floor(l + this.xOffset + this.yOffset), g = m / 2 - .5, this.from = a, this.to = c, d ? (this.scrollbarGroup[p]({
                    translateY: e
                }), this.scrollbar[p]({
                    height: m
                }), this.scrollbarRifles[p]({
                    translateY: g
                }), this.scrollbarTop = e, this.scrollbarLeft = 0) : (this.scrollbarGroup[p]({
                        translateX: e
                    }),
                    this.scrollbar[p]({
                        width: m
                    }), this.scrollbarRifles[p]({
                        translateX: g
                    }), this.scrollbarLeft = e, this.scrollbarTop = 0), 12 >= m ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === b.showFull && (0 >= a && 1 <= c ? this.group.hide() : this.group.show()), this.rendered = !0)
            },
            initEvents: function() {
                var a = this;
                a.mouseMoveHandler = function(b) {
                    var c = a.chart.pointer.normalize(b),
                        d = a.options.vertical ? "chartY" : "chartX",
                        e = a.initPositions;
                    !a.grabbedCenter || b.touches && 0 === b.touches[0][d] || (c = a.cursorToScrollbarPosition(c)[d],
                        d = a[d], d = c - d, a.hasDragged = !0, a.updatePosition(e[0] + d, e[1] + d), a.hasDragged && r(a, "changed", {
                            from: a.from,
                            to: a.to,
                            trigger: "scrollbar",
                            DOMType: b.type,
                            DOMEvent: b
                        }))
                };
                a.mouseUpHandler = function(b) {
                    a.hasDragged && r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function(b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function(b) {
                    var c = q(a.to - a.from) * a.options.step;
                    a.updatePosition(q(a.from - c), q(a.to - c));
                    r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.buttonToMaxClick = function(b) {
                    var c = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + c, a.to + c);
                    r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.trackClick = function(b) {
                    var c = a.chart.pointer.normalize(b),
                        d = a.to - a.from,
                        e = a.y + a.scrollbarTop,
                        f = a.x + a.scrollbarLeft;
                    a.options.vertical && c.chartY > e || !a.options.vertical &&
                        c.chartX > f ? a.updatePosition(a.from + d, a.to + d) : a.updatePosition(a.from - d, a.to - d);
                    r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                }
            },
            cursorToScrollbarPosition: function(a) {
                var b = this.options,
                    b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
                }
            },
            updatePosition: function(a, c) {
                1 < c && (a = q(1 - q(c - a)), c = 1);
                0 > a && (c = q(c - a), a = 0);
                this.from = a;
                this.to = c
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart.renderer, p(!0, this.options, a), this.chart)
            },
            addEvents: function() {
                var a = this.options.inverted ? [1, 0] : [0, 1],
                    c = this.scrollbarButtons,
                    d = this.scrollbarGroup.element,
                    e = this.mouseDownHandler,
                    f = this.mouseMoveHandler,
                    g = this.mouseUpHandler,
                    a = [
                        [c[a[0]].element, "click", this.buttonToMinClick],
                        [c[a[1]].element, "click", this.buttonToMaxClick],
                        [this.track.element, "click", this.trackClick],
                        [d, "mousedown", e],
                        [d.ownerDocument, "mousemove", f],
                        [d.ownerDocument, "mouseup", g]
                    ];
                y && a.push([d, "touchstart", e], [d.ownerDocument, "touchmove", f], [d.ownerDocument, "touchend", g]);
                C(a, function(a) {
                    F.apply(null, a)
                });
                this._events = a
            },
            removeEvents: function() {
                C(this._events, function(a) {
                    e.apply(null, a)
                });
                this._events.length = 0
            },
            destroy: function() {
                var a = this.chart.scroller;
                this.removeEvents();
                C(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function(a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, u(a.scrollbarButtons))
            }
        };
        F(G, "afterInit", function() {
            var a =
                this;
            a.options.scrollbar && a.options.scrollbar.enabled && (a.options.scrollbar.vertical = !a.horiz, a.options.startOnTick = a.options.endOnTick = !1, a.scrollbar = new E(a.chart.renderer, a.options.scrollbar, a.chart), F(a.scrollbar, "changed", function(b) {
                var c = Math.min(d(a.options.min, a.min), a.min, a.dataMin),
                    e = Math.max(d(a.options.max, a.max), a.max, a.dataMax) - c,
                    f;
                a.horiz && !a.reversed || !a.horiz && a.reversed ? (f = c + e * this.to, c += e * this.from) : (f = c + e * (1 - this.from), c += e * (1 - this.to));
                a.setExtremes(c, f, !0, !1, b)
            }))
        });
        F(G, "afterRender",
            function() {
                var a = Math.min(d(this.options.min, this.min), this.min, d(this.dataMin, this.min)),
                    c = Math.max(d(this.options.max, this.max), this.max, d(this.dataMax, this.max)),
                    e = this.scrollbar,
                    g = this.titleOffset || 0;
                if (e) {
                    this.horiz ? (e.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : g + this.axisTitleMargin + this.offset), this.width, this.height), g = 1) : (e.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? g + this.axisTitleMargin + this.offset : 0), this.top,
                        this.width, this.height), g = 0);
                    if (!this.opposite && !this.horiz || this.opposite && this.horiz) this.chart.scrollbarsOffsets[g] += this.scrollbar.size + this.scrollbar.options.margin;
                    isNaN(a) || isNaN(c) || !f(this.min) || !f(this.max) ? e.setRange(0, 0) : (g = (this.min - a) / (c - a), a = (this.max - a) / (c - a), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(g, a) : e.setRange(1 - a, 1 - g))
                }
            });
        F(G, "afterGetOffset", function() {
            var a = this.horiz ? 2 : 1,
                c = this.scrollbar;
            c && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[a] +=
                c.size + c.options.margin)
        });
        a.Scrollbar = E
    })(J);
    (function(a) {
        function E(a) {
            this.init(a)
        }
        var F = a.addEvent,
            G = a.Axis,
            q = a.Chart,
            l = a.color,
            f = a.defaultOptions,
            u = a.defined,
            C = a.destroyObjectProperties,
            r = a.each,
            y = a.erase,
            p = a.error,
            d = a.extend,
            e = a.grep,
            g = a.hasTouch,
            m = a.isArray,
            b = a.isNumber,
            c = a.isObject,
            x = a.isTouchDevice,
            B = a.merge,
            t = a.pick,
            n = a.removeEvent,
            L = a.Scrollbar,
            z = a.Series,
            D = a.seriesTypes,
            h = a.wrap,
            I = [].concat(a.defaultDataGroupingUnits),
            H = function(a) {
                var c = e(arguments, b);
                if (c.length) return Math[a].apply(0,
                    c)
            };
        I[4] = ["day", [1, 2, 3, 4]];
        I[5] = ["week", [1, 2, 3]];
        D = void 0 === D.areaspline ? "line" : "areaspline";
        d(f, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: l("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: D,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: I
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    pointRange: 0,
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        a.Renderer.prototype.symbols["navigator-handle"] = function(a, b, c, d, e) {
            a = e.width / 2;
            b = Math.round(a / 3) + .5;
            e = e.height;
            return ["M", -a - 1, .5, "L", a, .5, "L", a, e + .5, "L", -a - 1, e + .5, "L", -a - 1, .5, "M", -b, 4, "L", -b, e - 3, "M", b - 1, 4, "L", b - 1, e - 3]
        };
        E.prototype = {
            drawHandle: function(a, b, c, d) {
                var e = this.navigatorOptions.handles.height;
                this.handles[b][d](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) +
                        .5 - e)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - e / 2 - 1)
                })
            },
            drawOutline: function(a, b, c, d) {
                var e = this.navigatorOptions.maskInside,
                    k = this.outline.strokeWidth(),
                    f = k / 2,
                    k = k % 2 / 2,
                    g = this.outlineHeight,
                    h = this.scrollbarHeight,
                    n = this.size,
                    l = this.left - h,
                    m = this.top;
                c ? (l -= f, c = m + b + k, b = m + a + k, a = ["M", l + g, m - h - k, "L", l + g, c, "L", l, c, "L", l, b, "L", l + g, b, "L", l + g, m + n + h].concat(e ? ["M", l + g, c - f, "L", l + g, b + f] : [])) : (a += l + h - k, b += l + h - k, m += f, a = ["M", l, m, "L", a, m, "L", a, m + g, "L", b, m + g, "L",
                    b, m, "L", l + n + 2 * h, m
                ].concat(e ? ["M", a - f, m, "L", b + f, m] : []));
                this.outline[d]({
                    d: a
                })
            },
            drawMasks: function(a, b, c, d) {
                var e = this.left,
                    k = this.top,
                    f = this.height,
                    g, h, n, l;
                c ? (n = [e, e, e], l = [k, k + a, k + b], h = [f, f, f], g = [a, b - a, this.size - b]) : (n = [e, e + a, e + b], l = [k, k, k], h = [a, b - a, this.size - b], g = [f, f, f]);
                r(this.shades, function(a, b) {
                    a[d]({
                        x: n[b],
                        y: l[b],
                        width: h[b],
                        height: g[b]
                    })
                })
            },
            renderElements: function() {
                var a = this,
                    b = a.navigatorOptions,
                    c = b.maskInside,
                    d = a.chart,
                    e = d.inverted,
                    f = d.renderer,
                    g;
                a.navigatorGroup = g = f.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                var h = {
                    cursor: e ? "ns-resize" : "ew-resize"
                };
                r([!c, c, !c], function(c, d) {
                    a.shades[d] = f.rect().addClass("highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")).attr({
                        fill: c ? b.maskFill : "rgba(0,0,0,0)"
                    }).css(1 === d && h).add(g)
                });
                a.outline = f.path().addClass("highcharts-navigator-outline").attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                }).add(g);
                b.handles.enabled && r([0, 1], function(c) {
                    b.handles.inverted = d.inverted;
                    a.handles[c] = f.symbol(b.handles.symbols[c], -b.handles.width /
                        2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                    a.handles[c].attr({
                        zIndex: 7 - c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(g);
                    var e = b.handles;
                    a.handles[c].attr({
                        fill: e.backgroundColor,
                        stroke: e.borderColor,
                        "stroke-width": e.lineWidth
                    }).css(h)
                })
            },
            update: function(a) {
                r(this.series || [], function(a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                B(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            },
            render: function(c,
                d, e, f) {
                var k = this.chart,
                    g, h, n = this.scrollbarHeight,
                    l, m = this.xAxis;
                g = m.fake ? k.xAxis[0] : m;
                var p = this.navigatorEnabled,
                    v, w = this.rendered;
                h = k.inverted;
                var q, r = k.xAxis[0].minRange,
                    z = k.xAxis[0].options.maxRange;
                if (!this.hasDragged || u(e)) {
                    if (!b(c) || !b(d))
                        if (w) e = 0, f = t(m.width, g.width);
                        else return;
                    this.left = t(m.left, k.plotLeft + n + (h ? k.plotWidth : 0));
                    this.size = v = l = t(m.len, (h ? k.plotHeight : k.plotWidth) - 2 * n);
                    k = h ? n : l + 2 * n;
                    e = t(e, m.toPixels(c, !0));
                    f = t(f, m.toPixels(d, !0));
                    b(e) && Infinity !== Math.abs(e) || (e = 0, f = k);
                    c = m.toValue(e, !0);
                    d = m.toValue(f, !0);
                    q = Math.abs(a.correctFloat(d - c));
                    q < r ? this.grabbedLeft ? e = m.toPixels(d - r, !0) : this.grabbedRight && (f = m.toPixels(c + r, !0)) : u(z) && q > z && (this.grabbedLeft ? e = m.toPixels(d - z, !0) : this.grabbedRight && (f = m.toPixels(c + z, !0)));
                    this.zoomedMax = Math.min(Math.max(e, f, 0), v);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(e, f), 0), v);
                    this.range = this.zoomedMax - this.zoomedMin;
                    v = Math.round(this.zoomedMax);
                    e = Math.round(this.zoomedMin);
                    p && (this.navigatorGroup.attr({
                            visibility: "visible"
                        }),
                        w = w && !this.hasDragged ? "animate" : "attr", this.drawMasks(e, v, h, w), this.drawOutline(e, v, h, w), this.navigatorOptions.handles.enabled && (this.drawHandle(e, 0, h, w), this.drawHandle(v, 1, h, w)));
                    this.scrollbar && (h ? (h = this.top - n, g = this.left - n + (p || !g.opposite ? 0 : (g.titleOffset || 0) + g.axisTitleMargin), n = l + 2 * n) : (h = this.top + (p ? this.height : -n), g = this.left - n), this.scrollbar.position(g, h, k, n), this.scrollbar.setRange(this.zoomedMin / (l || 1), this.zoomedMax / (l || 1)));
                    this.rendered = !0
                }
            },
            addMouseEvents: function() {
                var a = this,
                    b = a.chart,
                    c = b.container,
                    d = [],
                    e, f;
                a.mouseMoveHandler = e = function(b) {
                    a.onMouseMove(b)
                };
                a.mouseUpHandler = f = function(b) {
                    a.onMouseUp(b)
                };
                d = a.getPartsEvents("mousedown");
                d.push(F(c, "mousemove", e), F(c.ownerDocument, "mouseup", f));
                g && (d.push(F(c, "touchmove", e), F(c.ownerDocument, "touchend", f)), d.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = d;
                a.series && a.series[0] && d.push(F(a.series[0].xAxis, "foundExtremes", function() {
                    b.navigator.modifyNavigatorAxisExtremes()
                }))
            },
            getPartsEvents: function(a) {
                var b = this,
                    c = [];
                r(["shades", "handles"], function(d) {
                    r(b[d], function(e, k) {
                        c.push(F(e.element, a, function(a) {
                            b[d + "Mousedown"](a, k)
                        }))
                    })
                });
                return c
            },
            shadesMousedown: function(a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    g = this.size,
                    h = this.range,
                    n = a.chartX,
                    l, m;
                c.inverted && (n = a.chartY, f = this.top);
                1 === b ? (this.grabbedCenter = n, this.fixedWidth = h, this.dragOffset = n - e) : (a = n - f - h / 2, 0 === b ? a = Math.max(0, a) : 2 === b && a + h >= g && (a = g - h, this.reversedExtremes ? (a -= h, m = this.getUnionExtremes().dataMin) :
                    l = this.getUnionExtremes().dataMax), a !== e && (this.fixedWidth = h, b = d.toFixedRange(a, a + h, m, l), u(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                    trigger: "navigator"
                })))
            },
            handlesMousedown: function(a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d = this.reversedExtremes;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            },
            onMouseMove: function(b) {
                var c = this,
                    d = c.chart,
                    e = c.left,
                    f = c.navigatorSize,
                    g = c.range,
                    h = c.dragOffset,
                    n = d.inverted;
                b.touches && 0 === b.touches[0].pageX || (b = d.pointer.normalize(b), d = b.chartX, n && (e = c.top, d = b.chartY), c.grabbedLeft ? (c.hasDragged = !0, c.render(0, 0, d - e, c.otherHandlePos)) : c.grabbedRight ? (c.hasDragged = !0, c.render(0, 0, c.otherHandlePos, d - e)) : c.grabbedCenter && (c.hasDragged = !0, d < h ? d = h : d > f + h - g && (d = f + h - g), c.render(0, 0, d - h, d - h + g)), c.hasDragged && c.scrollbar && t(c.scrollbar.options.liveRedraw,
                    a.svg && !x && !this.chart.isBoosting) && (b.DOMType = b.type, setTimeout(function() {
                    c.onMouseUp(b)
                }, 0)))
            },
            onMouseUp: function(a) {
                var b = this.chart,
                    c = this.xAxis,
                    d = this.scrollbar,
                    e, f, g = a.DOMEvent || a;
                (!this.hasDragged || d && d.hasDragged) && "scrollbar" !== a.trigger || (d = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? e = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (f = this.fixedExtreme), this.zoomedMax === this.size && (f = this.reversedExtremes ? d.dataMin : d.dataMax), 0 === this.zoomedMin && (e = this.reversedExtremes ?
                    d.dataMax : d.dataMin), c = c.toFixedRange(this.zoomedMin, this.zoomedMax, e, f), u(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, {
                    trigger: "navigator",
                    triggerOp: "navigator-drag",
                    DOMEvent: g
                }));
                "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
            },
            removeEvents: function() {
                this.eventsToUnbind && (r(this.eventsToUnbind, function(a) {
                        a()
                    }), this.eventsToUnbind =
                    void 0);
                this.removeBaseSeriesEvents()
            },
            removeBaseSeriesEvents: function() {
                var a = this.baseSeries || [];
                this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && r(a, function(a) {
                    n(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && n(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            },
            init: function(a) {
                var b = a.options,
                    c = b.navigator,
                    d = c.enabled,
                    e = b.scrollbar,
                    f = e.enabled,
                    b = d ? c.height : 0,
                    g = f ? e.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height =
                    b;
                this.scrollbarHeight = g;
                this.scrollbarEnabled = f;
                this.navigatorEnabled = d;
                this.navigatorOptions = c;
                this.scrollbarOptions = e;
                this.outlineHeight = b + g;
                this.opposite = t(c.opposite, !d && a.inverted);
                var h = this,
                    d = h.baseSeries,
                    e = a.xAxis.length,
                    f = a.yAxis.length,
                    n = d && d[0] && d[0].xAxis || a.xAxis[0] || {
                        options: {}
                    };
                a.isDirtyBox = !0;
                h.navigatorEnabled ? (h.xAxis = new G(a, B({
                        breaks: n.options.breaks,
                        ordinal: n.options.ordinal
                    }, c.xAxis, {
                        id: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        isX: !0,
                        type: "datetime",
                        index: e,
                        isInternal: !0,
                        offset: 0,
                        keepOrdinalPadding: !0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: !1
                    }, a.inverted ? {
                        offsets: [g, 0, -g, 0],
                        width: b
                    } : {
                        offsets: [0, -g, 0, g],
                        height: b
                    })), h.yAxis = new G(a, B(c.yAxis, {
                        id: "navigator-y-axis",
                        alignTicks: !1,
                        offset: 0,
                        index: f,
                        isInternal: !0,
                        zoomEnabled: !1
                    }, a.inverted ? {
                        width: b
                    } : {
                        height: b
                    })), d || c.series.data ? h.updateNavigatorSeries(!1) : 0 === a.series.length && (h.unbindRedraw = F(a, "beforeRedraw", function() {
                        0 < a.series.length && !h.series && (h.setBaseSeries(), h.unbindRedraw())
                    })), h.reversedExtremes =
                    a.inverted && !h.xAxis.reversed || !a.inverted && h.xAxis.reversed, h.renderElements(), h.addMouseEvents()) : h.xAxis = {
                    translate: function(b, c) {
                        var d = a.xAxis[0],
                            e = d.getExtremes(),
                            f = d.len - 2 * g,
                            k = H("min", d.options.min, e.dataMin),
                            d = H("max", d.options.max, e.dataMax) - k;
                        return c ? b * d / f + k : f * (b - k) / d
                    },
                    toPixels: function(a) {
                        return this.translate(a)
                    },
                    toValue: function(a) {
                        return this.translate(a, !0)
                    },
                    toFixedRange: G.prototype.toFixedRange,
                    fake: !0
                };
                a.options.scrollbar.enabled && (a.scrollbar = h.scrollbar = new L(a.renderer, B(a.options.scrollbar, {
                    margin: h.navigatorEnabled ? 0 : 10,
                    vertical: a.inverted
                }), a), F(h.scrollbar, "changed", function(b) {
                    var c = h.size,
                        d = c * this.to,
                        c = c * this.from;
                    h.hasDragged = h.scrollbar.hasDragged;
                    h.render(0, 0, c, d);
                    (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType && "touchmove" !== b.DOMType) && setTimeout(function() {
                        h.onMouseUp(b)
                    })
                }));
                h.addBaseSeriesEvents();
                h.addChartEvents()
            },
            getUnionExtremes: function(a) {
                var b = this.chart.xAxis[0],
                    c = this.xAxis,
                    d = c.options,
                    e = b.options,
                    f;
                a && null === b.dataMin || (f = {
                    dataMin: t(d && d.min, H("min",
                        e.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: t(d && d.max, H("max", e.max, b.dataMax, c.dataMax, c.max))
                });
                return f
            },
            setBaseSeries: function(a, b) {
                var c = this.chart,
                    d = this.baseSeries = [];
                a = a || c.options && c.options.navigator.baseSeries || 0;
                r(c.series || [], function(b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) || d.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(!0, b)
            },
            updateNavigatorSeries: function(b, c) {
                var e = this,
                    g = e.chart,
                    h = e.baseSeries,
                    l, p, v = e.navigatorOptions.series,
                    t, q = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: !1,
                        isInternal: !0
                    },
                    w = e.series = a.grep(e.series || [], function(b) {
                        var c = b.baseSeries;
                        return 0 > a.inArray(c, h) ? (c && (n(c, "updatedData", e.updatedDataHandler), delete c.navigatorSeries), b.chart && b.destroy(), !1) : !0
                    });
                h && h.length && r(h, function(a) {
                    var b = a.navigatorSeries,
                        k = d({
                                color: a.color,
                                visible: a.visible
                            }, m(v) ? f.navigator.series :
                            v);
                    b && !1 === e.navigatorOptions.adaptToUpdatedData || (q.name = "Navigator " + h.length, l = a.options || {}, t = l.navigatorOptions || {}, p = B(l, q, k, t), k = t.data || k.data, e.hasNavigatorData = e.hasNavigatorData || !!k, p.data = k || l.data && l.data.slice(0), b && b.options ? b.update(p, c) : (a.navigatorSeries = g.initSeries(p), a.navigatorSeries.baseSeries = a, w.push(a.navigatorSeries)))
                });
                if (v.data && (!h || !h.length) || m(v)) e.hasNavigatorData = !1, v = a.splat(v), r(v, function(a, b) {
                    q.name = "Navigator " + (w.length + 1);
                    p = B(f.navigator.series, {
                        color: g.series[b] &&
                            !g.series[b].options.isInternal && g.series[b].color || g.options.colors[b] || g.options.colors[0]
                    }, q, a);
                    p.data = a.data;
                    p.data && (e.hasNavigatorData = !0, w.push(g.initSeries(p)))
                });
                b && this.addBaseSeriesEvents()
            },
            addBaseSeriesEvents: function() {
                var a = this,
                    b = a.baseSeries || [];
                b[0] && b[0].xAxis && F(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                r(b, function(b) {
                    F(b, "show", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                    });
                    F(b, "hide", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    });
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && F(b, "updatedData", this.updatedDataHandler);
                    F(b, "remove", function() {
                        this.navigatorSeries && (y(a.series, this.navigatorSeries), u(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            },
            modifyNavigatorAxisExtremes: function() {
                var a = this.xAxis,
                    b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            },
            modifyBaseAxisExtremes: function() {
                var a =
                    this.chart.navigator,
                    c = this.getExtremes(),
                    d = c.dataMin,
                    e = c.dataMax,
                    c = c.max - c.min,
                    f = a.stickToMin,
                    g = a.stickToMax,
                    h = t(this.options.overscroll, 0),
                    n, l, m = a.series && a.series[0],
                    p = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (f && (l = d, n = l + c), g && (n = e + h, f || (l = Math.max(n - c, m && m.xData ? m.xData[0] : -Number.MAX_VALUE))), p && (f || g) && b(l) && (this.min = this.userMin = l, this.max = this.userMax = n));
                a.stickToMin = a.stickToMax = null
            },
            updatedDataHandler: function() {
                var a = this.chart.navigator,
                    c =
                    this.navigatorSeries;
                a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = b(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !a.stickToMax);
                c && !a.hasNavigatorData && (c.options.pointStart = this.xData[0], c.setData(this.options.data, !1, null, !1))
            },
            addChartEvents: function() {
                this.eventsToUnbind || (this.eventsToUnbind = []);
                this.eventsToUnbind.push(F(this.chart, "redraw", function() {
                    var a = this.navigator,
                        b = a && (a.baseSeries &&
                            a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min, b.max)
                }), F(this.chart, "getMargins", function() {
                    var a = this.navigator,
                        b = a.opposite ? "plotTop" : "marginBottom";
                    this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                    this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
            },
            destroy: function() {
                this.removeEvents();
                this.xAxis && (y(this.chart.xAxis, this.xAxis), y(this.chart.axes, this.xAxis));
                this.yAxis && (y(this.chart.yAxis, this.yAxis),
                    y(this.chart.axes, this.yAxis));
                r(this.series || [], function(a) {
                    a.destroy && a.destroy()
                });
                r("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function(a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                r([this.handles], function(a) {
                    C(a)
                }, this)
            }
        };
        a.Navigator = E;
        h(G.prototype, "zoom", function(a, b, c) {
            var d = this.chart,
                e = d.options,
                f = e.chart.zoomType,
                k = e.chart.pinchType,
                g = e.navigator,
                e = e.rangeSelector,
                h;
            this.isXAxis &&
                (g && g.enabled || e && e.enabled) && (!x && "x" === f || x && "x" === k ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : (!x && "xy" === f || x && "xy" === k) && this.options.range && (d = this.previousZoom, u(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !== h ? h : a.call(this, b, c)
        });
        F(q, "beforeRender", function() {
            var a = this.options;
            if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new E(this)
        });
        F(q, "afterSetChartSize", function() {
            var a = this.legend,
                b = this.navigator,
                c,
                d, e, f;
            b && (d = a && a.options, e = b.xAxis, f = b.yAxis, c = b.scrollbarHeight, this.inverted ? (b.left = b.opposite ? this.chartWidth - c - b.height : this.spacing[3] + c, b.top = this.plotTop + c) : (b.left = this.plotLeft + c, b.top = b.navigatorOptions.top || this.chartHeight - b.height - c - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (d && "bottom" === d.verticalAlign && d.enabled && !d.floating ? a.legendHeight + t(d.margin, 10) : 0)), e && f && (this.inverted ? e.options.left = f.options.left = b.left : e.options.top =
                f.options.top = b.top, e.setAxisSize(), f.setAxisSize()))
        });
        F(q, "update", function(a) {
            var b = a.options.navigator || {},
                c = a.options.scrollbar || {};
            this.navigator || this.scroller || !b.enabled && !c.enabled || (B(!0, this.options.navigator, b), B(!0, this.options.scrollbar, c), delete a.options.navigator, delete a.options.scrollbar)
        });
        F(q, "afterUpdate", function() {
            this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new E(this))
        });
        h(z.prototype, "addPoint",
            function(a, b, d, e, f) {
                var k = this.options.turboThreshold;
                k && this.xData.length > k && c(b, !0) && this.chart.navigator && p(20, !0);
                a.call(this, b, d, e, f)
            });
        F(q, "afterAddSeries", function() {
            this.navigator && this.navigator.setBaseSeries(null, !1)
        });
        F(z, "afterUpdate", function() {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
        });
        q.prototype.callbacks.push(function(a) {
            var b = a.navigator;
            b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        })
    })(J);
    (function(a) {
        function E(a) {
            this.init(a)
        }
        var F = a.addEvent,
            G = a.Axis,
            q = a.Chart,
            l = a.css,
            f = a.createElement,
            u = a.defaultOptions,
            C = a.defined,
            r = a.destroyObjectProperties,
            y = a.discardElement,
            p = a.each,
            d = a.extend,
            e = a.fireEvent,
            g = a.isNumber,
            m = a.merge,
            b = a.pick,
            c = a.pInt,
            x = a.splat,
            B = a.wrap;
        d(u, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        u.lang = m(u.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        E.prototype = {
            clickButton: function(a, c) {
                var d = this,
                    e = d.chart,
                    f = d.buttonOptions[a],
                    h = e.xAxis[0],
                    n = e.scroller && e.scroller.getUnionExtremes() || h || {},
                    l = n.dataMin,
                    m = n.dataMax,
                    t, k = h && Math.round(Math.min(h.max, b(m, h.max))),
                    q = f.type,
                    r, n = f._range,
                    u, y, B, C = f.dataGrouping;
                if (null !== l && null !== m) {
                    e.fixedRange = n;
                    C && (this.forcedDataGrouping = !0, G.prototype.setDataGrouping.call(h || {
                        chart: this.chart
                    }, C, !1), this.frozenStates = f.preserveDataGrouping);
                    if ("month" === q || "year" === q) h ? (q = {
                        range: f,
                        max: k,
                        chart: e,
                        dataMin: l,
                        dataMax: m
                    }, t = h.minFromRange.call(q), g(q.newMax) && (k = q.newMax)) : n = f;
                    else if (n) t = Math.max(k - n, l), k = Math.min(t + n, m);
                    else if ("ytd" === q)
                        if (h) void 0 === m && (l = Number.MAX_VALUE, m = Number.MIN_VALUE, p(e.series, function(a) {
                            a = a.xData;
                            l = Math.min(a[0], l);
                            m = Math.max(a[a.length - 1], m)
                        }), c = !1), k = d.getYTDExtremes(m, l, e.time.useUTC), t = u = k.min, k = k.max;
                        else {
                            F(e, "beforeRender", function() {
                                d.clickButton(a)
                            });
                            return
                        }
                    else "all" === q && h && (t = l, k = m);
                    t += f._offsetMin;
                    k += f._offsetMax;
                    d.setSelected(a);
                    h ? h.setExtremes(t, k, b(c, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: f
                    }) : (r = x(e.options.xAxis)[0], B = r.range, r.range = n, y = r.min, r.min = u, F(e, "load", function() {
                        r.range = B;
                        r.min = y
                    }))
                }
            },
            setSelected: function(a) {
                this.selected = this.options.selected = a
            },
            defaultButtons: [{
                type: "month",
                count: 1,
                text: "1m"
            }, {
                type: "month",
                count: 3,
                text: "3m"
            }, {
                type: "month",
                count: 6,
                text: "6m"
            }, {
                type: "ytd",
                text: "YTD"
            }, {
                type: "year",
                count: 1,
                text: "1y"
            }, {
                type: "all",
                text: "All"
            }],
            init: function(a) {
                var b =
                    this,
                    c = a.options.rangeSelector,
                    d = c.buttons || [].concat(b.defaultButtons),
                    f = c.selected,
                    g = function() {
                        var a = b.minInput,
                            c = b.maxInput;
                        a && a.blur && e(a, "blur");
                        c && c.blur && e(c, "blur")
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                a.extraTopMargin = c.height;
                b.buttonOptions = d;
                this.unMouseDown = F(a.container, "mousedown", g);
                this.unResize = F(a, "resize", g);
                p(d, b.computeButtonRange);
                void 0 !== f && d[f] && this.clickButton(f, !1);
                F(a, "load", function() {
                    a.xAxis && a.xAxis[0] && F(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange &&
                            "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function() {
                var a = this,
                    b = this.chart,
                    c = b.xAxis[0],
                    d = Math.round(c.max - c.min),
                    e = !c.hasVisibleSeries,
                    f = b.scroller && b.scroller.getUnionExtremes() || c,
                    l = f.dataMin,
                    m = f.dataMax,
                    b = a.getYTDExtremes(m, l, b.time.useUTC),
                    q = b.min,
                    r = b.max,
                    k = a.selected,
                    u = g(k),
                    x = a.options.allButtonsEnabled,
                    y = a.buttons;
                p(a.buttonOptions, function(b, f) {
                    var g = b._range,
                        h = b.type,
                        n = b.count ||
                        1,
                        p = y[f],
                        t = 0;
                    b = b._offsetMax - b._offsetMin;
                    f = f === k;
                    var v = g > m - l,
                        w = g < c.minRange,
                        z = !1,
                        A = !1,
                        g = g === d;
                    ("month" === h || "year" === h) && d + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[h] * n - b && d - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[h] * n + b ? g = !0 : "ytd" === h ? (g = r - q + b === d, z = !f) : "all" === h && (g = c.max - c.min >= m - l, A = !f && u && g);
                    h = !x && (v || w || A || e);
                    n = f && g || g && !u && !z || f && a.frozenStates;
                    h ? t = 3 : n && (u = !0, t = 2);
                    p.state !== t && p.setState(t)
                })
            },
            computeButtonRange: function(a) {
                var c = a.type,
                    d = a.count || 1,
                    e = {
                        millisecond: 1,
                        second: 1E3,
                        minute: 6E4,
                        hour: 36E5,
                        day: 864E5,
                        week: 6048E5
                    };
                if (e[c]) a._range = e[c] * d;
                else if ("month" === c || "year" === c) a._range = 864E5 * {
                    month: 30,
                    year: 365
                }[c] * d;
                a._offsetMin = b(a.offsetMin, 0);
                a._offsetMax = b(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            },
            setInputValue: function(a, b) {
                var c = this.chart.options.rangeSelector,
                    d = this.chart.time,
                    e = this[a + "Input"];
                C(b) && (e.previousValue = e.HCTime, e.HCTime = b);
                e.value = d.dateFormat(c.inputEditDateFormat || "%Y-%m-%d", e.HCTime);
                this[a + "DateBox"].attr({
                    text: d.dateFormat(c.inputDateFormat || "%b %e, %Y", e.HCTime)
                })
            },
            showInput: function(a) {
                var b = this.inputGroup,
                    c = this[a + "DateBox"];
                l(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function(a) {
                l(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                });
                this.setInputValue(a)
            },
            drawInput: function(a) {
                function b() {
                    var a = w.value,
                        b = (t.inputDateParser || Date.parse)(a),
                        d = p.xAxis[0],
                        f = p.scroller && p.scroller.xAxis ? p.scroller.xAxis : d,
                        k = f.dataMin,
                        f = f.dataMax;
                    b !== w.previousValue && (w.previousValue =
                        b, g(b) || (b = a.split("-"), b = Date.UTC(c(b[0]), c(b[1]) - 1, c(b[2]))), g(b) && (p.time.useUTC || (b += 6E4 * (new Date).getTimezoneOffset()), v ? b > e.maxInput.HCTime ? b = void 0 : b < k && (b = k) : b < e.minInput.HCTime ? b = void 0 : b > f && (b = f), void 0 !== b && d.setExtremes(v ? b : d.min, v ? d.max : b, void 0, void 0, {
                            trigger: "rangeSelectorInput"
                        })))
                }
                var e = this,
                    p = e.chart,
                    q = p.renderer.style || {},
                    h = p.renderer,
                    t = p.options.rangeSelector,
                    r = e.div,
                    v = "min" === a,
                    w, k, A = this.inputGroup;
                this[a + "Label"] = k = h.label(u.lang[v ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                    padding: 2
                }).add(A);
                A.offset += k.width + 5;
                this[a + "DateBox"] = h = h.label("", A.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: t.inputBoxWidth || 90,
                    height: t.inputBoxHeight || 17,
                    "text-align": "center",
                    stroke: t.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1
                }).on("click", function() {
                    e.showInput(a);
                    e[a + "Input"].focus()
                }).add(A);
                A.offset += h.width + (v ? 10 : 0);
                this[a + "Input"] = w = f("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {
                    top: p.plotTop + "px"
                }, r);
                k.css(m(q, t.labelStyle));
                h.css(m({
                        color: "#333333"
                    },
                    q, t.inputStyle));
                l(w, d({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: q.fontSize,
                    fontFamily: q.fontFamily,
                    top: "-9999em"
                }, t.inputStyle));
                w.onfocus = function() {
                    e.showInput(a)
                };
                w.onblur = function() {
                    e.hideInput(a)
                };
                w.onchange = b;
                w.onkeypress = function(a) {
                    13 === a.keyCode && b()
                }
            },
            getPosition: function() {
                var a = this.chart,
                    b = a.options.rangeSelector,
                    a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y -
                        10
                }
            },
            getYTDExtremes: function(a, b, c) {
                var d = this.chart.time,
                    e = new d.Date(a),
                    f = d.get("FullYear", e);
                c = c ? d.Date.UTC(f, 0, 1) : +new d.Date(f, 0, 1);
                b = Math.max(b || 0, c);
                e = e.getTime();
                return {
                    max: Math.min(a || e, e),
                    min: b
                }
            },
            render: function(a, c) {
                var d = this,
                    e = d.chart,
                    g = e.renderer,
                    h = e.container,
                    l = e.options,
                    n = l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions,
                    m = u.lang,
                    q = d.div,
                    k = l.rangeSelector,
                    t = b(l.chart.style && l.chart.style.zIndex, 0) + 1,
                    l = k.floating,
                    r = d.buttons,
                    q = d.inputGroup,
                    x = k.buttonTheme,
                    y = k.buttonPosition,
                    B = k.inputPosition,
                    C = k.inputEnabled,
                    E = x && x.states,
                    F = e.plotLeft,
                    G, J = d.buttonGroup,
                    X;
                X = d.rendered;
                var Y = d.options.verticalAlign,
                    aa = e.legend,
                    ba = aa && aa.options,
                    ca = y.y,
                    Z = B.y,
                    da = X || !1,
                    fa = da ? "animate" : "attr",
                    V = 0,
                    U = 0,
                    P;
                if (!1 !== k.enabled) {
                    X || (d.group = X = g.g("range-selector-group").attr({
                        zIndex: 7
                    }).add(), d.buttonGroup = J = g.g("range-selector-buttons").add(X), d.zoomText = g.text(m.rangeSelectorZoom, 0, 15).css(k.labelStyle).add(J), p(d.buttonOptions, function(a, b) {
                        r[b] = g.button(a.text, 0, 0, function() {
                            var c =
                                a.events && a.events.click,
                                e;
                            c && (e = c.call(a));
                            !1 !== e && d.clickButton(b);
                            d.isActive = !0
                        }, x, E && E.hover, E && E.select, E && E.disabled).attr({
                            "text-align": "center"
                        }).add(J)
                    }), !1 !== C && (d.div = q = f("div", null, {
                        position: "relative",
                        height: 0,
                        zIndex: t
                    }), h.parentNode.insertBefore(q, h), d.inputGroup = q = g.g("input-group").add(X), q.offset = 0, d.drawInput("min"), d.drawInput("max")));
                    d.zoomText[fa]({
                        x: b(F + y.x, F)
                    });
                    G = b(F + y.x, F) + d.zoomText.getBBox().width + 5;
                    p(d.buttonOptions, function(a, c) {
                        r[c][fa]({
                            x: G
                        });
                        G += r[c].width + b(k.buttonSpacing,
                            5)
                    });
                    F = e.plotLeft - e.spacing[3];
                    d.updateButtonStates();
                    n && this.titleCollision(e) && "top" === Y && "right" === y.align && y.y + J.getBBox().height - 12 < (n.y || 0) + n.height && (V = -40);
                    "left" === y.align ? P = y.x - e.spacing[3] : "right" === y.align && (P = y.x + V - e.spacing[1]);
                    J.align({
                        y: y.y,
                        width: J.getBBox().width,
                        align: y.align,
                        x: P
                    }, !0, e.spacingBox);
                    d.group.placed = da;
                    d.buttonGroup.placed = da;
                    !1 !== C && (V = n && this.titleCollision(e) && "top" === Y && "right" === B.align && B.y - q.getBBox().height - 12 < (n.y || 0) + n.height + e.spacing[0] ? -40 : 0, "left" === B.align ?
                        P = F : "right" === B.align && (P = -Math.max(e.axisOffset[1], -V)), q.align({
                            y: B.y,
                            width: q.getBBox().width,
                            align: B.align,
                            x: B.x + P - 2
                        }, !0, e.spacingBox), h = q.alignAttr.translateX + q.alignOptions.x - V + q.getBBox().x + 2, n = q.alignOptions.width, m = J.alignAttr.translateX + J.getBBox().x, P = J.getBBox().width + 20, (B.align === y.align || m + P > h && h + n > m && ca < Z + q.getBBox().height) && q.attr({
                            translateX: q.alignAttr.translateX + (e.axisOffset[1] >= -V ? 0 : -V),
                            translateY: q.alignAttr.translateY + J.getBBox().height + 10
                        }), d.setInputValue("min", a), d.setInputValue("max",
                            c), d.inputGroup.placed = da);
                    d.group.align({
                        verticalAlign: Y
                    }, !0, e.spacingBox);
                    a = d.group.getBBox().height + 20;
                    c = d.group.alignAttr.translateY;
                    "bottom" === Y && (aa = ba && "bottom" === ba.verticalAlign && ba.enabled && !ba.floating ? aa.legendHeight + b(ba.margin, 10) : 0, a = a + aa - 20, U = c - a - (l ? 0 : k.y) - 10);
                    if ("top" === Y) l && (U = 0), e.titleOffset && (U = e.titleOffset + e.options.title.margin), U += e.margin[0] - e.spacing[0] || 0;
                    else if ("middle" === Y)
                        if (Z === ca) U = 0 > Z ? c + void 0 : c;
                        else if (Z || ca) U = 0 > Z || 0 > ca ? U - Math.min(Z, ca) : c - a + NaN;
                    d.group.translate(k.x,
                        k.y + Math.floor(U));
                    !1 !== C && (d.minInput.style.marginTop = d.group.translateY + "px", d.maxInput.style.marginTop = d.group.translateY + "px");
                    d.rendered = !0
                }
            },
            getHeight: function() {
                var a = this.options,
                    b = this.group,
                    c = a.y,
                    d = a.buttonPosition.y,
                    a = a.inputPosition.y,
                    b = b ? b.getBBox(!0).height + 13 + c : 0,
                    c = Math.min(a, d);
                if (0 > a && 0 > d || 0 < a && 0 < d) b += Math.abs(c);
                return b
            },
            titleCollision: function(a) {
                return !(a.options.title.text || a.options.subtitle.text)
            },
            update: function(a) {
                var b = this.chart;
                m(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                b.rangeSelector.render()
            },
            destroy: function() {
                var b = this,
                    c = b.minInput,
                    d = b.maxInput;
                b.unMouseDown();
                b.unResize();
                r(b.buttons);
                c && (c.onfocus = c.onblur = c.onchange = null);
                d && (d.onfocus = d.onblur = d.onchange = null);
                a.objectEach(b, function(a, c) {
                    a && "chart" !== c && (a.destroy ? a.destroy() : a.nodeType && y(this[c]));
                    a !== E.prototype[c] && (b[c] = null)
                }, this)
            }
        };
        G.prototype.toFixedRange = function(a, c, d, e) {
            var f = this.chart && this.chart.fixedRange;
            a = b(d, this.translate(a, !0, !this.horiz));
            c = b(e, this.translate(c, !0, !this.horiz));
            d = f && (c - a) / f;
            .7 < d && 1.3 > d && (e ? a = c - f : c = a + f);
            g(a) && g(c) || (a = c = void 0);
            return {
                min: a,
                max: c
            }
        };
        G.prototype.minFromRange = function() {
            var a = this.range,
                c = {
                    month: "Month",
                    year: "FullYear"
                }[a.type],
                d, e = this.max,
                f, h, l = function(a, b) {
                    var d = new Date(a),
                        e = d["get" + c]();
                    d["set" + c](e + b);
                    e === d["get" + c]() && d.setDate(0);
                    return d.getTime() - a
                };
            g(a) ? (d = e - a, h = a) : (d = e + l(e, -a.count), this.chart && (this.chart.fixedRange = e - d));
            f = b(this.dataMin, Number.MIN_VALUE);
            g(d) || (d = f);
            d <= f && (d = f, void 0 === h && (h = l(d, a.count)), this.newMax = Math.min(d +
                h, this.dataMax));
            g(e) || (d = void 0);
            return d
        };
        F(q, "afterGetContainer", function() {
            this.options.rangeSelector.enabled && (this.rangeSelector = new E(this))
        });
        B(q.prototype, "render", function(a, b, c) {
            var d = this.axes,
                e = this.rangeSelector;
            e && (p(d, function(a) {
                a.updateNames();
                a.setScale()
            }), this.getAxisMargins(), e.render(), d = e.options.verticalAlign, e.options.floating || ("bottom" === d ? this.extraBottomMargin = !0 : "middle" !== d && (this.extraTopMargin = !0)));
            a.call(this, b, c)
        });
        F(q, "update", function(a) {
            var b = a.options.rangeSelector;
            a = this.rangeSelector;
            var c = this.extraBottomMargin,
                d = this.extraTopMargin;
            b && b.enabled && !C(a) && (this.options.rangeSelector.enabled = !0, this.rangeSelector = new E(this));
            this.extraTopMargin = this.extraBottomMargin = !1;
            a && (a.render(), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== c || this.extraTopMargin !== d) && (this.isDirtyBox = !0)
        });
        B(q.prototype, "redraw", function(a, b, c) {
            var d =
                this.rangeSelector;
            d && !d.options.floating && (d.render(), d = d.options.verticalAlign, "bottom" === d ? this.extraBottomMargin = !0 : "middle" !== d && (this.extraTopMargin = !0));
            a.call(this, b, c)
        });
        F(q, "getMargins", function() {
            var a = this.rangeSelector;
            a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
        });
        q.prototype.callbacks.push(function(a) {
            function b() {
                c = a.xAxis[0].getExtremes();
                g(c.min) && d.render(c.min, c.max)
            }
            var c, d = a.rangeSelector,
                e, f;
            d && (f = F(a.xAxis[0], "afterSetExtremes",
                function(a) {
                    d.render(a.min, a.max)
                }), e = F(a, "redraw", b), b());
            F(a, "destroy", function() {
                d && (e(), f())
            })
        });
        a.RangeSelector = E
    })(J);
    (function(a) {
        var E = a.addEvent,
            F = a.arrayMax,
            G = a.arrayMin,
            q = a.Axis,
            l = a.Chart,
            f = a.defined,
            u = a.each,
            C = a.extend,
            r = a.format,
            y = a.grep,
            p = a.inArray,
            d = a.isNumber,
            e = a.isString,
            g = a.map,
            m = a.merge,
            b = a.pick,
            c = a.Point,
            x = a.Renderer,
            B = a.Series,
            t = a.splat,
            n = a.SVGRenderer,
            J = a.VMLRenderer,
            z = a.wrap,
            D = B.prototype,
            h = D.init,
            I = D.processData,
            H = c.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function(c,
            d, f) {
            var k = e(c) || c.nodeName,
                h = arguments[k ? 1 : 0],
                n = h.series,
                p = a.getOptions(),
                q, r = b(h.navigator && h.navigator.enabled, p.navigator.enabled, !0),
                v = r ? {
                    startOnTick: !1,
                    endOnTick: !1
                } : null,
                u = {
                    marker: {
                        enabled: !1,
                        radius: 2
                    }
                },
                w = {
                    shadow: !1,
                    borderWidth: 0
                };
            h.xAxis = g(t(h.xAxis || {}), function(a, b) {
                return m({
                    minPadding: 0,
                    maxPadding: 0,
                    overscroll: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                }, p.xAxis, p.xAxis && p.xAxis[b], a, {
                    type: "datetime",
                    categories: null
                }, v)
            });
            h.yAxis = g(t(h.yAxis || {}), function(a,
                c) {
                q = b(a.opposite, !0);
                return m({
                    labels: {
                        y: -2
                    },
                    opposite: q,
                    showLastLabel: !(!a.categories && "category" !== a.type),
                    title: {
                        text: null
                    }
                }, p.yAxis, p.yAxis && p.yAxis[c], a)
            });
            h.series = null;
            h = m({
                chart: {
                    panning: !0,
                    pinchType: "x"
                },
                navigator: {
                    enabled: r
                },
                scrollbar: {
                    enabled: b(p.scrollbar.enabled, !0)
                },
                rangeSelector: {
                    enabled: b(p.rangeSelector.enabled, !0)
                },
                title: {
                    text: null
                },
                tooltip: {
                    split: b(p.tooltip.split, !0),
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                },
                plotOptions: {
                    line: u,
                    spline: u,
                    area: u,
                    areaspline: u,
                    arearange: u,
                    areasplinerange: u,
                    column: w,
                    columnrange: w,
                    candlestick: w,
                    ohlc: w
                }
            }, h, {
                isStock: !0
            });
            h.series = n;
            return k ? new l(c, h, f) : new l(h, d)
        };
        z(q.prototype, "autoLabelAlign", function(a) {
            var b = this.chart,
                c = this.options,
                b = b._labelPanes = b._labelPanes || {},
                d = this.options.labels;
            return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, "right") : a.apply(this, [].slice.call(arguments, 1))
        });
        E(q, "destroy", function() {
            var a = this.chart,
                b = this.options &&
                this.options.top + "," + this.options.height;
            b && a._labelPanes && a._labelPanes[b] === this && delete a._labelPanes[b]
        });
        z(q.prototype, "getPlotLinePath", function(c, h, k, l, m, n) {
            var q = this,
                r = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                v = q.chart,
                t = v.renderer,
                w = q.left,
                x = q.top,
                y, A, z, B, C = [],
                D = [],
                E, F;
            if ("xAxis" !== q.coll && "yAxis" !== q.coll) return c.apply(this, [].slice.call(arguments, 1));
            D = function(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = q.options[b];
                return d(a) ? [v[b][a]] : e(a) ? [v.get(a)] : g(r, function(a) {
                    return a[b]
                })
            }(q.coll);
            u(q.isXAxis ? v.yAxis : v.xAxis, function(a) {
                if (f(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = f(a.options[b]) ? v[b][a.options[b]] : v[b][0];
                    q === b && D.push(a)
                }
            });
            E = D.length ? [] : [q.isXAxis ? v.yAxis[0] : v.xAxis[0]];
            u(D, function(b) {
                -1 !== p(b, E) || a.find(E, function(a) {
                    return a.pos === b.pos && a.len === b.len
                }) || E.push(b)
            });
            F = b(n, q.translate(h, null, null, l));
            d(F) && (q.horiz ? u(E, function(a) {
                var b;
                A = a.pos;
                B = A + a.len;
                y = z = Math.round(F + q.transB);
                if (y < w || y > w + q.width) m ? y = z = Math.min(Math.max(w,
                    y), w + q.width) : b = !0;
                b || C.push("M", y, A, "L", z, B)
            }) : u(E, function(a) {
                var b;
                y = a.pos;
                z = y + a.len;
                A = B = Math.round(x + q.height - F);
                if (A < x || A > x + q.height) m ? A = B = Math.min(Math.max(x, A), q.top + q.height) : b = !0;
                b || C.push("M", y, A, "L", z, B)
            }));
            return 0 < C.length ? t.crispPolyLine(C, k || 1) : null
        });
        n.prototype.crispPolyLine = function(a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a
        };
        x === J && (J.prototype.crispPolyLine = n.prototype.crispPolyLine);
        z(q.prototype, "hideCrosshair", function(a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        E(q, "afterDrawCrosshair", function(a) {
            var c, d;
            if (f(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                var e = this.chart,
                    g = this.options.crosshair.label,
                    h = this.horiz;
                c = this.opposite;
                d = this.left;
                var l = this.top,
                    m = this.crossLabel,
                    n = g.format,
                    p = "",
                    q = "inside" === this.options.tickPosition,
                    v = !1 !== this.crosshair.snap,
                    t = 0,
                    u = a.e || this.cross && this.cross.e,
                    x = a.point;
                a = this.lin2log;
                var y,
                    z;
                this.isLog ? (y = a(this.min), z = a(this.max)) : (y = this.min, z = this.max);
                a = h ? "center" : c ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                m || (m = this.crossLabel = e.renderer.label(null, null, null, g.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                    align: g.align || a,
                    padding: b(g.padding, 8),
                    r: b(g.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup), m.attr({
                    fill: g.backgroundColor || this.series[0] && this.series[0].color ||
                        "#666666",
                    stroke: g.borderColor || "",
                    "stroke-width": g.borderWidth || 0
                }).css(C({
                    color: "#ffffff",
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, g.style)));
                h ? (a = v ? x.plotX + d : u.chartX, l += c ? 0 : this.height) : (a = c ? this.width + d : 0, l = v ? x.plotY + l : u.chartY);
                n || g.formatter || (this.isDatetimeAxis && (p = "%b %d, %Y"), n = "{value" + (p ? ":" + p : "") + "}");
                p = v ? x[this.isXAxis ? "x" : "y"] : this.toValue(h ? u.chartX : u.chartY);
                m.attr({
                    text: n ? r(n, {
                        value: p
                    }, e.time) : g.formatter.call(this, p),
                    x: a,
                    y: l,
                    visibility: p < y || p > z ? "hidden" : "visible"
                });
                g = m.getBBox();
                if (h) {
                    if (q && !c || !q && c) l = m.y - g.height
                } else l = m.y - g.height / 2;
                h ? (c = d - g.x, d = d + this.width - g.x) : (c = "left" === this.labelAlign ? d : 0, d = "right" === this.labelAlign ? d + this.width : e.chartWidth);
                m.translateX < c && (t = c - m.translateX);
                m.translateX + g.width >= d && (t = -(m.translateX + g.width - d));
                m.attr({
                    x: a + t,
                    y: l,
                    anchorX: h ? a : this.opposite ? 0 : e.chartWidth,
                    anchorY: h ? this.opposite ? e.chartHeight : 0 : l + g.height / 2
                })
            }
        });
        D.init = function() {
            h.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        D.setCompare = function(a) {
            this.modifyValue =
                "value" === a || "percent" === a ? function(b, c) {
                    var d = this.compareValue;
                    if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
                } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        D.processData = function() {
            var a, b = -1,
                c, e, f = !0 === this.options.compareStart ? 0 : 1,
                g, h;
            I.apply(this, arguments);
            if (this.xAxis && this.processedYData)
                for (c = this.processedXData, e = this.processedYData, g = e.length, this.pointArrayMap && (b = p("close", this.pointArrayMap), -1 === b && (b = p(this.pointValKey || "y", this.pointArrayMap))), a = 0; a < g - f; a++)
                    if (h = e[a] && -1 < b ? e[a][b] : e[a], d(h) && c[a + f] >= this.xAxis.min && 0 !== h) {
                        this.compareValue = h;
                        break
                    }
        };
        z(D, "getExtremes", function(a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = G(b), this.dataMax = F(b))
        });
        q.prototype.setCompare = function(a, c) {
            this.isXAxis || (u(this.series, function(b) {
                b.setCompare(a)
            }), b(c, !0) && this.chart.redraw())
        };
        c.prototype.tooltipFormatter =
            function(c) {
                c = c.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, b(this.series.tooltipOptions.changeDecimals, 2)));
                return H.apply(this, [c])
            };
        z(B.prototype, "render", function(a) {
            var b;
            this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (b = this.yAxis.len - (this.xAxis.axisLine ? Math.floor(this.xAxis.axisLine.strokeWidth() / 2) : 0), !this.clipBox && this.animate ? (this.clipBox = m(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height =
                b) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
                width: this.xAxis.len,
                height: b
            }) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = b));
            a.call(this)
        });
        z(l.prototype, "getSelectedPoints", function(a) {
            var b = a.call(this);
            u(this.series, function(a) {
                a.hasGroupedData && (b = b.concat(y(a.points || [], function(a) {
                    return a.selected
                })))
            });
            return b
        });
        E(l, "update", function(a) {
            a = a.options;
            "scrollbar" in a && this.navigator && (m(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar)
        })
    })(J);
    return J
});