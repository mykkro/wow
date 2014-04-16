// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\
(function(n) {
    var e, t, r = "0.4.2",
        f = "hasOwnProperty",
        i = /[\.\/]/,
        o = "*",
        u = function() {}, l = function(n, e) {
            return n - e
        }, s = {
            n: {}
        }, p = function(n, r) {
            n += "";
            var f, i = t,
                o = Array.prototype.slice.call(arguments, 2),
                u = p.listeners(n),
                s = 0,
                a = [],
                c = {}, h = [],
                d = e;
            e = n, t = 0;
            for (var g = 0, v = u.length; v > g; g++) "zIndex" in u[g] && (a.push(u[g].zIndex), 0 > u[g].zIndex && (c[u[g].zIndex] = u[g]));
            for (a.sort(l); 0 > a[s];)
                if (f = c[a[s++]], h.push(f.apply(r, o)), t) return t = i, h;
            for (g = 0; v > g; g++)
                if (f = u[g], "zIndex" in f)
                    if (f.zIndex == a[s]) {
                        if (h.push(f.apply(r, o)), t) break;
                        do
                            if (s++, f = c[a[s]], f && h.push(f.apply(r, o)), t) break; while (f)
                    } else c[f.zIndex] = f;
                    else if (h.push(f.apply(r, o)), t) break;
            return t = i, e = d, h.length ? h : null
        };
    p._events = s, p.listeners = function(n) {
        var e, t, r, f, u, l, p, a, c = n.split(i),
            h = s,
            d = [h],
            g = [];
        for (f = 0, u = c.length; u > f; f++) {
            for (a = [], l = 0, p = d.length; p > l; l++)
                for (h = d[l].n, t = [h[c[f]], h[o]], r = 2; r--;) e = t[r], e && (a.push(e), g = g.concat(e.f || []));
            d = a
        }
        return g
    }, p.on = function(n, e) {
        if (n += "", "function" != typeof e) return function() {};
        for (var t = n.split(i), r = s, f = 0, o = t.length; o > f; f++) r = r.n, r = r.hasOwnProperty(t[f]) && r[t[f]] || (r[t[f]] = {
            n: {}
        });
        for (r.f = r.f || [], f = 0, o = r.f.length; o > f; f++)
            if (r.f[f] == e) return u;
        return r.f.push(e),
        function(n) {
            +n == +n && (e.zIndex = +n)
        }
    }, p.f = function(n) {
        var e = [].slice.call(arguments, 1);
        return function() {
            p.apply(null, [n, null].concat(e).concat([].slice.call(arguments, 0)))
        }
    }, p.stop = function() {
        t = 1
    }, p.nt = function(n) {
        return n ? RegExp("(?:\\.|\\/|^)" + n + "(?:\\.|\\/|$)").test(e) : e
    }, p.nts = function() {
        return e.split(i)
    }, p.off = p.unbind = function(n, e) {
        if (!n) return p._events = s = {
            n: {}
        }, void 0;
        var t, r, u, l, a, c, h, d = n.split(i),
            g = [s];
        for (l = 0, a = d.length; a > l; l++)
            for (c = 0; g.length > c; c += u.length - 2) {
                if (u = [c, 1], t = g[c].n, d[l] != o) t[d[l]] && u.push(t[d[l]]);
                else
                    for (r in t) t[f](r) && u.push(t[r]);
                g.splice.apply(g, u)
            }
        for (l = 0, a = g.length; a > l; l++)
            for (t = g[l]; t.n;) {
                if (e) {
                    if (t.f) {
                        for (c = 0, h = t.f.length; h > c; c++)
                            if (t.f[c] == e) {
                                t.f.splice(c, 1);
                                break
                            }!t.f.length && delete t.f
                    }
                    for (r in t.n)
                        if (t.n[f](r) && t.n[r].f) {
                            var v = t.n[r].f;
                            for (c = 0, h = v.length; h > c; c++)
                                if (v[c] == e) {
                                    v.splice(c, 1);
                                    break
                                }!v.length && delete t.n[r].f
                        }
                } else {
                    delete t.f;
                    for (r in t.n) t.n[f](r) && t.n[r].f && delete t.n[r].f
                }
                t = t.n
            }
    }, p.once = function(n, e) {
        var t = function() {
            return p.unbind(n, t), e.apply(this, arguments)
        };
        return p.on(n, t)
    }, p.version = r, p.toString = function() {
        return "You are running Eve " + r
    }, "undefined" != typeof module && module.exports ? module.exports = p : "undefined" != typeof define ? define("eve", [], function() {
        return p
    }) : n.eve = p
})(this);
(function(t, e) {
    "function" == typeof define && define.amd ? define("raphael", ["eve"], e) : t.Raphael = e(t.eve)
})(this, function(t) {
    function e(n) {
        if (e.is(n, "function")) return y ? n() : t.on("raphael.DOMload", n);
        if (e.is(n, W)) return e._engine.create[T](e, n.splice(0, 3 + e.is(n[0], G))).add(n);
        var r = Array.prototype.slice.call(arguments, 0);
        if (e.is(r[r.length - 1], "function")) {
            var i = r.pop();
            return y ? i.call(e._engine.create[T](e, r)) : t.on("raphael.DOMload", function() {
                i.call(e._engine.create[T](e, r))
            })
        }
        return e._engine.create[T](e, arguments)
    }

    function n(t) {
        if (Object(t) !== t) return t;
        var e = new t.constructor;
        for (var r in t) t[B](r) && (e[r] = n(t[r]));
        return e
    }

    function r(t, e) {
        for (var n = 0, r = t.length; r > n; n++)
            if (t[n] === e) return t.push(t.splice(n, 1)[0])
    }

    function i(t, e, n) {
        function i() {
            var a = Array.prototype.slice.call(arguments, 0),
                s = a.join("␀"),
                o = i.cache = i.cache || {}, u = i.count = i.count || [];
            return o[B](s) ? (r(u, s), n ? n(o[s]) : o[s]) : (u.length >= 1e3 && delete o[u.shift()], u.push(s), o[s] = t[T](e, a), n ? n(o[s]) : o[s])
        }
        return i
    }

    function a() {
        return this.hex
    }

    function s(t, e) {
        for (var n = [], r = 0, i = t.length; i - 2 * !e > r; r += 2) {
            var a = [{
                x: +t[r - 2],
                y: +t[r - 1]
            }, {
                x: +t[r],
                y: +t[r + 1]
            }, {
                x: +t[r + 2],
                y: +t[r + 3]
            }, {
                x: +t[r + 4],
                y: +t[r + 5]
            }];
            e ? r ? i - 4 == r ? a[3] = {
                x: +t[0],
                y: +t[1]
            } : i - 2 == r && (a[2] = {
                x: +t[0],
                y: +t[1]
            }, a[3] = {
                x: +t[2],
                y: +t[3]
            }) : a[0] = {
                x: +t[i - 2],
                y: +t[i - 1]
            } : i - 4 == r ? a[3] = a[2] : r || (a[0] = {
                x: +t[r],
                y: +t[r + 1]
            }), n.push(["C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y])
        }
        return n
    }

    function o(t, e, n, r, i) {
        var a = -3 * e + 9 * n - 9 * r + 3 * i,
            s = t * a + 6 * e - 12 * n + 6 * r;
        return t * s - 3 * e + 3 * n
    }

    function u(t, e, n, r, i, a, s, u, l) {
        null == l && (l = 1), l = l > 1 ? 1 : 0 > l ? 0 : l;
        for (var h = l / 2, c = 12, f = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], d = 0, g = 0; c > g; g++) {
            var x = h * f[g] + h,
                v = o(x, t, n, i, s),
                m = o(x, e, r, a, u),
                y = v * v + m * m;
            d += p[g] * D.sqrt(y)
        }
        return h * d
    }

    function l(t, e, n, r, i, a, s, o, l) {
        if (!(0 > l || l > u(t, e, n, r, i, a, s, o))) {
            var h, c = 1,
                f = c / 2,
                p = c - f,
                d = .01;
            for (h = u(t, e, n, r, i, a, s, o, p); V(h - l) > d;) f /= 2, p += (l > h ? 1 : -1) * f, h = u(t, e, n, r, i, a, s, o, p);
            return p
        }
    }

    function h(t, e, n, r, i, a, s, o) {
        if (!(z(t, n) < O(i, s) || O(t, n) > z(i, s) || z(e, r) < O(a, o) || O(e, r) > z(a, o))) {
            var u = (t * r - e * n) * (i - s) - (t - n) * (i * o - a * s),
                l = (t * r - e * n) * (a - o) - (e - r) * (i * o - a * s),
                h = (t - n) * (a - o) - (e - r) * (i - s);
            if (h) {
                var c = u / h,
                    f = l / h,
                    p = +c.toFixed(2),
                    d = +f.toFixed(2);
                if (!(+O(t, n).toFixed(2) > p || p > +z(t, n).toFixed(2) || +O(i, s).toFixed(2) > p || p > +z(i, s).toFixed(2) || +O(e, r).toFixed(2) > d || d > +z(e, r).toFixed(2) || +O(a, o).toFixed(2) > d || d > +z(a, o).toFixed(2))) return {
                    x: c,
                    y: f
                }
            }
        }
    }

    function c(t, n, r) {
        var i = e.bezierBBox(t),
            a = e.bezierBBox(n);
        if (!e.isBBoxIntersect(i, a)) return r ? 0 : [];
        for (var s = u.apply(0, t), o = u.apply(0, n), l = ~~ (s / 5), c = ~~ (o / 5), f = [], p = [], d = {}, g = r ? 0 : [], x = 0; l + 1 > x; x++) {
            var v = e.findDotsAtSegment.apply(e, t.concat(x / l));
            f.push({
                x: v.x,
                y: v.y,
                t: x / l
            })
        }
        for (x = 0; c + 1 > x; x++) v = e.findDotsAtSegment.apply(e, n.concat(x / c)), p.push({
            x: v.x,
            y: v.y,
            t: x / c
        });
        for (x = 0; l > x; x++)
            for (var m = 0; c > m; m++) {
                var y = f[x],
                    b = f[x + 1],
                    _ = p[m],
                    w = p[m + 1],
                    k = .001 > V(b.x - y.x) ? "y" : "x",
                    B = .001 > V(w.x - _.x) ? "y" : "x",
                    S = h(y.x, y.y, b.x, b.y, _.x, _.y, w.x, w.y);
                if (S) {
                    if (d[S.x.toFixed(4)] == S.y.toFixed(4)) continue;
                    d[S.x.toFixed(4)] = S.y.toFixed(4);
                    var C = y.t + V((S[k] - y[k]) / (b[k] - y[k])) * (b.t - y.t),
                        F = _.t + V((S[B] - _[B]) / (w[B] - _[B])) * (w.t - _.t);
                    C >= 0 && 1 >= C && F >= 0 && 1 >= F && (r ? g++ : g.push({
                        x: S.x,
                        y: S.y,
                        t1: C,
                        t2: F
                    }))
                }
            }
        return g
    }

    function f(t, n, r) {
        t = e._path2curve(t), n = e._path2curve(n);
        for (var i, a, s, o, u, l, h, f, p, d, g = r ? 0 : [], x = 0, v = t.length; v > x; x++) {
            var m = t[x];
            if ("M" == m[0]) i = u = m[1], a = l = m[2];
            else {
                "C" == m[0] ? (p = [i, a].concat(m.slice(1)), i = p[6], a = p[7]) : (p = [i, a, i, a, u, l, u, l], i = u, a = l);
                for (var y = 0, b = n.length; b > y; y++) {
                    var _ = n[y];
                    if ("M" == _[0]) s = h = _[1], o = f = _[2];
                    else {
                        "C" == _[0] ? (d = [s, o].concat(_.slice(1)), s = d[6], o = d[7]) : (d = [s, o, s, o, h, f, h, f], s = h, o = f);
                        var w = c(p, d, r);
                        if (r) g += w;
                        else {
                            for (var k = 0, B = w.length; B > k; k++) w[k].segment1 = x, w[k].segment2 = y, w[k].bez1 = p, w[k].bez2 = d;
                            g = g.concat(w)
                        }
                    }
                }
            }
        }
        return g
    }

    function p(t, e, n, r, i, a) {
        null != t ? (this.a = +t, this.b = +e, this.c = +n, this.d = +r, this.e = +i, this.f = +a) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
    }

    function d() {
        return this.x + E + this.y + E + this.width + " × " + this.height
    }

    function g(t, e, n, r, i, a) {
        function s(t) {
            return ((c * t + h) * t + l) * t
        }

        function o(t, e) {
            var n = u(t, e);
            return ((d * n + p) * n + f) * n
        }

        function u(t, e) {
            var n, r, i, a, o, u;
            for (i = t, u = 0; 8 > u; u++) {
                if (a = s(i) - t, e > V(a)) return i;
                if (o = (3 * c * i + 2 * h) * i + l, 1e-6 > V(o)) break;
                i -= a / o
            }
            if (n = 0, r = 1, i = t, n > i) return n;
            if (i > r) return r;
            for (; r > n;) {
                if (a = s(i), e > V(a - t)) return i;
                t > a ? n = i : r = i, i = (r - n) / 2 + n
            }
            return i
        }
        var l = 3 * e,
            h = 3 * (r - e) - l,
            c = 1 - l - h,
            f = 3 * n,
            p = 3 * (i - n) - f,
            d = 1 - f - p;
        return o(t, 1 / (200 * a))
    }

    function x(t, e) {
        var n = [],
            r = {};
        if (this.ms = e, this.times = 1, t) {
            for (var i in t) t[B](i) && (r[J(i)] = t[i], n.push(J(i)));
            n.sort(he)
        }
        this.anim = r, this.top = n[n.length - 1], this.percents = n
    }

    function v(n, r, i, a, s, o) {
        i = J(i);
        var u, l, h, c, f, d, x = n.ms,
            v = {}, m = {}, y = {};
        if (a)
            for (w = 0, k = on.length; k > w; w++) {
                var b = on[w];
                if (b.el.id == r.id && b.anim == n) {
                    b.percent != i ? (on.splice(w, 1), h = 1) : l = b, r.attr(b.totalOrigin);
                    break
                }
            } else a = +m;
        for (var w = 0, k = n.percents.length; k > w; w++) {
            if (n.percents[w] == i || n.percents[w] > a * n.top) {
                i = n.percents[w], f = n.percents[w - 1] || 0, x = x / n.top * (i - f), c = n.percents[w + 1], u = n.anim[i];
                break
            }
            a && r.attr(n.anim[n.percents[w]])
        }
        if (u) {
            if (l) l.initstatus = a, l.start = new Date - l.ms * a;
            else {
                for (var S in u)
                    if (u[B](S) && (ne[B](S) || r.paper.customAttributes[B](S))) switch (v[S] = r.attr(S), null == v[S] && (v[S] = ee[S]), m[S] = u[S], ne[S]) {
                        case G:
                            y[S] = (m[S] - v[S]) / x;
                            break;
                        case "colour":
                            v[S] = e.getRGB(v[S]);
                            var C = e.getRGB(m[S]);
                            y[S] = {
                                r: (C.r - v[S].r) / x,
                                g: (C.g - v[S].g) / x,
                                b: (C.b - v[S].b) / x
                            };
                            break;
                        case "path":
                            var F = Re(v[S], m[S]),
                                T = F[1];
                            for (v[S] = F[0], y[S] = [], w = 0, k = v[S].length; k > w; w++) {
                                y[S][w] = [0];
                                for (var A = 1, P = v[S][w].length; P > A; A++) y[S][w][A] = (T[w][A] - v[S][w][A]) / x
                            }
                            break;
                        case "transform":
                            var E = r._,
                                R = Oe(E[S], m[S]);
                            if (R)
                                for (v[S] = R.from, m[S] = R.to, y[S] = [], y[S].real = !0, w = 0, k = v[S].length; k > w; w++)
                                    for (y[S][w] = [v[S][w][0]], A = 1, P = v[S][w].length; P > A; A++) y[S][w][A] = (m[S][w][A] - v[S][w][A]) / x;
                            else {
                                var q = r.matrix || new p,
                                    j = {
                                        _: {
                                            transform: E.transform
                                        },
                                        getBBox: function() {
                                            return r.getBBox(1)
                                        }
                                    };
                                v[S] = [q.a, q.b, q.c, q.d, q.e, q.f], De(j, m[S]), m[S] = j._.transform, y[S] = [(j.matrix.a - q.a) / x, (j.matrix.b - q.b) / x, (j.matrix.c - q.c) / x, (j.matrix.d - q.d) / x, (j.matrix.e - q.e) / x, (j.matrix.f - q.f) / x]
                            }
                            break;
                        case "csv":
                            var D = M(u[S])[I](_),
                                z = M(v[S])[I](_);
                            if ("clip-rect" == S)
                                for (v[S] = z, y[S] = [], w = z.length; w--;) y[S][w] = (D[w] - v[S][w]) / x;
                            m[S] = D;
                            break;
                        default:
                            for (D = [][L](u[S]), z = [][L](v[S]), y[S] = [], w = r.paper.customAttributes[S].length; w--;) y[S][w] = ((D[w] || 0) - (z[w] || 0)) / x
                    }
                    var O = u.easing, V = e.easing_formulas[O];
                if (!V)
                    if (V = M(O).match(Z), V && 5 == V.length) {
                        var X = V;
                        V = function(t) {
                            return g(t, +X[1], +X[2], +X[3], +X[4], x)
                        }
                    } else V = fe;
                if (d = u.start || n.start || +new Date, b = {
                    anim: n,
                    percent: i,
                    timestamp: d,
                    start: d + (n.del || 0),
                    status: 0,
                    initstatus: a || 0,
                    stop: !1,
                    ms: x,
                    easing: V,
                    from: v,
                    diff: y,
                    to: m,
                    el: r,
                    callback: u.callback,
                    prev: f,
                    next: c,
                    repeat: o || n.times,
                    origin: r.attr(),
                    totalOrigin: s
                }, on.push(b), a && !l && !h && (b.stop = !0, b.start = new Date - x * a, 1 == on.length)) return ln();
                h && (b.start = new Date - b.ms * a), 1 == on.length && un(ln)
            }
            t("raphael.anim.start." + r.id, r, n)
        }
    }

    function m(t) {
        for (var e = 0; on.length > e; e++) on[e].el.paper == t && on.splice(e--, 1)
    }
    e.version = "2.1.0", e.eve = t;
    var y, b, _ = /[, ]+/,
        w = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        }, k = /\{(\d+)\}/g,
        B = "hasOwnProperty",
        S = {
            doc: document,
            win: window
        }, C = {
            was: Object.prototype[B].call(S.win, "Raphael"),
            is: S.win.Raphael
        }, F = function() {
            this.ca = this.customAttributes = {}
        }, T = "apply",
        L = "concat",
        A = "createTouch" in S.doc,
        P = "",
        E = " ",
        M = String,
        I = "split",
        R = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [I](E),
        q = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        }, j = M.prototype.toLowerCase,
        D = Math,
        z = D.max,
        O = D.min,
        V = D.abs,
        X = D.pow,
        Y = D.PI,
        G = "number",
        N = "string",
        W = "array",
        $ = Object.prototype.toString,
        H = (e._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
        U = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        }, Z = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        Q = D.round,
        J = parseFloat,
        K = parseInt,
        te = M.prototype.toUpperCase,
        ee = e._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        }, ne = e._availableAnimAttrs = {
            blur: G,
            "clip-rect": "csv",
            cx: G,
            cy: G,
            fill: "colour",
            "fill-opacity": G,
            "font-size": G,
            height: G,
            opacity: G,
            path: "path",
            r: G,
            rx: G,
            ry: G,
            stroke: "colour",
            "stroke-opacity": G,
            "stroke-width": G,
            transform: "transform",
            width: G,
            x: G,
            y: G
        }, re = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        ie = {
            hs: 1,
            rg: 1
        }, ae = /,?([achlmqrstvxz]),?/gi,
        se = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        oe = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        ue = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
        le = (e._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
        he = function(t, e) {
            return J(t) - J(e)
        }, ce = function() {}, fe = function(t) {
            return t
        }, pe = e._rectPath = function(t, e, n, r, i) {
            return i ? [
                ["M", t + i, e],
                ["l", n - 2 * i, 0],
                ["a", i, i, 0, 0, 1, i, i],
                ["l", 0, r - 2 * i],
                ["a", i, i, 0, 0, 1, -i, i],
                ["l", 2 * i - n, 0],
                ["a", i, i, 0, 0, 1, -i, -i],
                ["l", 0, 2 * i - r],
                ["a", i, i, 0, 0, 1, i, -i],
                ["z"]
            ] : [
                ["M", t, e],
                ["l", n, 0],
                ["l", 0, r],
                ["l", -n, 0],
                ["z"]
            ]
        }, de = function(t, e, n, r) {
            return null == r && (r = n), [
                ["M", t, e],
                ["m", 0, -r],
                ["a", n, r, 0, 1, 1, 0, 2 * r],
                ["a", n, r, 0, 1, 1, 0, -2 * r],
                ["z"]
            ]
        }, ge = e._getPath = {
            path: function(t) {
                return t.attr("path")
            },
            circle: function(t) {
                var e = t.attrs;
                return de(e.cx, e.cy, e.r)
            },
            ellipse: function(t) {
                var e = t.attrs;
                return de(e.cx, e.cy, e.rx, e.ry)
            },
            rect: function(t) {
                var e = t.attrs;
                return pe(e.x, e.y, e.width, e.height, e.r)
            },
            image: function(t) {
                var e = t.attrs;
                return pe(e.x, e.y, e.width, e.height)
            },
            text: function(t) {
                var e = t._getBBox();
                return pe(e.x, e.y, e.width, e.height)
            },
            set: function(t) {
                var e = t._getBBox();
                return pe(e.x, e.y, e.width, e.height)
            }
        }, xe = e.mapPath = function(t, e) {
            if (!e) return t;
            var n, r, i, a, s, o, u;
            for (t = Re(t), i = 0, s = t.length; s > i; i++)
                for (u = t[i], a = 1, o = u.length; o > a; a += 2) n = e.x(u[a], u[a + 1]), r = e.y(u[a], u[a + 1]), u[a] = n, u[a + 1] = r;
            return t
        };
    if (e._g = S, e.type = S.win.SVGAngle || S.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == e.type) {
        var ve, me = S.doc.createElement("div");
        if (me.innerHTML = '<v:shape adj="1"/>', ve = me.firstChild, ve.style.behavior = "url(#default#VML)", !ve || "object" != typeof ve.adj) return e.type = P;
        me = null
    }
    e.svg = !(e.vml = "VML" == e.type), e._Paper = F, e.fn = b = F.prototype = e.prototype, e._id = 0, e._oid = 0, e.is = function(t, e) {
        return e = j.call(e), "finite" == e ? !U[B](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || $.call(t).slice(8, -1).toLowerCase() == e
    }, e.angle = function(t, n, r, i, a, s) {
        if (null == a) {
            var o = t - r,
                u = n - i;
            return o || u ? (180 + 180 * D.atan2(-u, -o) / Y + 360) % 360 : 0
        }
        return e.angle(t, n, a, s) - e.angle(r, i, a, s)
    }, e.rad = function(t) {
        return t % 360 * Y / 180
    }, e.deg = function(t) {
        return 180 * t / Y % 360
    }, e.snapTo = function(t, n, r) {
        if (r = e.is(r, "finite") ? r : 10, e.is(t, W)) {
            for (var i = t.length; i--;)
                if (r >= V(t[i] - n)) return t[i]
        } else {
            t = +t;
            var a = n % t;
            if (r > a) return n - a;
            if (a > t - r) return n - a + t
        }
        return n
    }, e.createUUID = function(t, e) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase()
        }
    }(/[xy]/g, function(t) {
        var e = 0 | 16 * D.random(),
            n = "x" == t ? e : 8 | 3 & e;
        return n.toString(16)
    }), e.setWindow = function(n) {
        t("raphael.setWindow", e, S.win, n), S.win = n, S.doc = S.win.document, e._engine.initWin && e._engine.initWin(S.win)
    };
    var ye = function(t) {
        if (e.vml) {
            var n, r = /^\s+|\s+$/g;
            try {
                var a = new ActiveXObject("htmlfile");
                a.write("<body>"), a.close(), n = a.body
            } catch (s) {
                n = createPopup().document.body
            }
            var o = n.createTextRange();
            ye = i(function(t) {
                try {
                    n.style.color = M(t).replace(r, P);
                    var e = o.queryCommandValue("ForeColor");
                    return e = (255 & e) << 16 | 65280 & e | (16711680 & e) >>> 16, "#" + ("000000" + e.toString(16)).slice(-6)
                } catch (i) {
                    return "none"
                }
            })
        } else {
            var u = S.doc.createElement("i");
            u.title = "Raphaël Colour Picker", u.style.display = "none", S.doc.body.appendChild(u), ye = i(function(t) {
                return u.style.color = t, S.doc.defaultView.getComputedStyle(u, P).getPropertyValue("color")
            })
        }
        return ye(t)
    }, be = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        }, _e = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        }, we = function() {
            return this.hex
        }, ke = function(t, n, r) {
            if (null == n && e.is(t, "object") && "r" in t && "g" in t && "b" in t && (r = t.b, n = t.g, t = t.r), null == n && e.is(t, N)) {
                var i = e.getRGB(t);
                t = i.r, n = i.g, r = i.b
            }
            return (t > 1 || n > 1 || r > 1) && (t /= 255, n /= 255, r /= 255), [t, n, r]
        }, Be = function(t, n, r, i) {
            t *= 255, n *= 255, r *= 255;
            var a = {
                r: t,
                g: n,
                b: r,
                hex: e.rgb(t, n, r),
                toString: we
            };
            return e.is(i, "finite") && (a.opacity = i), a
        };
    e.color = function(t) {
        var n;
        return e.is(t, "object") && "h" in t && "s" in t && "b" in t ? (n = e.hsb2rgb(t), t.r = n.r, t.g = n.g, t.b = n.b, t.hex = n.hex) : e.is(t, "object") && "h" in t && "s" in t && "l" in t ? (n = e.hsl2rgb(t), t.r = n.r, t.g = n.g, t.b = n.b, t.hex = n.hex) : (e.is(t, "string") && (t = e.getRGB(t)), e.is(t, "object") && "r" in t && "g" in t && "b" in t ? (n = e.rgb2hsl(t), t.h = n.h, t.s = n.s, t.l = n.l, n = e.rgb2hsb(t), t.v = n.b) : (t = {
            hex: "none"
        }, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = we, t
    }, e.hsb2rgb = function(t, e, n, r) {
        this.is(t, "object") && "h" in t && "s" in t && "b" in t && (n = t.b, e = t.s, t = t.h, r = t.o), t *= 360;
        var i, a, s, o, u;
        return t = t % 360 / 60, u = n * e, o = u * (1 - V(t % 2 - 1)), i = a = s = n - u, t = ~~t, i += [u, o, 0, 0, o, u][t], a += [o, u, u, o, 0, 0][t], s += [0, 0, o, u, u, o][t], Be(i, a, s, r)
    }, e.hsl2rgb = function(t, e, n, r) {
        this.is(t, "object") && "h" in t && "s" in t && "l" in t && (n = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || n > 1) && (t /= 360, e /= 100, n /= 100), t *= 360;
        var i, a, s, o, u;
        return t = t % 360 / 60, u = 2 * e * (.5 > n ? n : 1 - n), o = u * (1 - V(t % 2 - 1)), i = a = s = n - u / 2, t = ~~t, i += [u, o, 0, 0, o, u][t], a += [o, u, u, o, 0, 0][t], s += [0, 0, o, u, u, o][t], Be(i, a, s, r)
    }, e.rgb2hsb = function(t, e, n) {
        n = ke(t, e, n), t = n[0], e = n[1], n = n[2];
        var r, i, a, s;
        return a = z(t, e, n), s = a - O(t, e, n), r = 0 == s ? null : a == t ? (e - n) / s : a == e ? (n - t) / s + 2 : (t - e) / s + 4, r = 60 * ((r + 360) % 6) / 360, i = 0 == s ? 0 : s / a, {
            h: r,
            s: i,
            b: a,
            toString: be
        }
    }, e.rgb2hsl = function(t, e, n) {
        n = ke(t, e, n), t = n[0], e = n[1], n = n[2];
        var r, i, a, s, o, u;
        return s = z(t, e, n), o = O(t, e, n), u = s - o, r = 0 == u ? null : s == t ? (e - n) / u : s == e ? (n - t) / u + 2 : (t - e) / u + 4, r = 60 * ((r + 360) % 6) / 360, a = (s + o) / 2, i = 0 == u ? 0 : .5 > a ? u / (2 * a) : u / (2 - 2 * a), {
            h: r,
            s: i,
            l: a,
            toString: _e
        }
    }, e._path2string = function() {
        return this.join(",").replace(ae, "$1")
    }, e._preload = function(t, e) {
        var n = S.doc.createElement("img");
        n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function() {
            e.call(this), this.onload = null, S.doc.body.removeChild(this)
        }, n.onerror = function() {
            S.doc.body.removeChild(this)
        }, S.doc.body.appendChild(n), n.src = t
    }, e.getRGB = i(function(t) {
        if (!t || (t = M(t)).indexOf("-") + 1) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: a
        };
        if ("none" == t) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            toString: a
        };
        !(ie[B](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = ye(t));
        var n, r, i, s, o, u, l = t.match(H);
        return l ? (l[2] && (i = K(l[2].substring(5), 16), r = K(l[2].substring(3, 5), 16), n = K(l[2].substring(1, 3), 16)), l[3] && (i = K((o = l[3].charAt(3)) + o, 16), r = K((o = l[3].charAt(2)) + o, 16), n = K((o = l[3].charAt(1)) + o, 16)), l[4] && (u = l[4][I](re), n = J(u[0]), "%" == u[0].slice(-1) && (n *= 2.55), r = J(u[1]), "%" == u[1].slice(-1) && (r *= 2.55), i = J(u[2]), "%" == u[2].slice(-1) && (i *= 2.55), "rgba" == l[1].toLowerCase().slice(0, 4) && (s = J(u[3])), u[3] && "%" == u[3].slice(-1) && (s /= 100)), l[5] ? (u = l[5][I](re), n = J(u[0]), "%" == u[0].slice(-1) && (n *= 2.55), r = J(u[1]), "%" == u[1].slice(-1) && (r *= 2.55), i = J(u[2]), "%" == u[2].slice(-1) && (i *= 2.55), ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (n /= 360), "hsba" == l[1].toLowerCase().slice(0, 4) && (s = J(u[3])), u[3] && "%" == u[3].slice(-1) && (s /= 100), e.hsb2rgb(n, r, i, s)) : l[6] ? (u = l[6][I](re), n = J(u[0]), "%" == u[0].slice(-1) && (n *= 2.55), r = J(u[1]), "%" == u[1].slice(-1) && (r *= 2.55), i = J(u[2]), "%" == u[2].slice(-1) && (i *= 2.55), ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (n /= 360), "hsla" == l[1].toLowerCase().slice(0, 4) && (s = J(u[3])), u[3] && "%" == u[3].slice(-1) && (s /= 100), e.hsl2rgb(n, r, i, s)) : (l = {
            r: n,
            g: r,
            b: i,
            toString: a
        }, l.hex = "#" + (16777216 | i | r << 8 | n << 16).toString(16).slice(1), e.is(s, "finite") && (l.opacity = s), l)) : {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: a
        }
    }, e), e.hsb = i(function(t, n, r) {
        return e.hsb2rgb(t, n, r).hex
    }), e.hsl = i(function(t, n, r) {
        return e.hsl2rgb(t, n, r).hex
    }), e.rgb = i(function(t, e, n) {
        return "#" + (16777216 | n | e << 8 | t << 16).toString(16).slice(1)
    }), e.getColor = function(t) {
        var e = this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: t || .75
        }, n = this.hsb2rgb(e.h, e.s, e.b);
        return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, 0 >= e.s && (this.getColor.start = {
            h: 0,
            s: 1,
            b: e.b
        })), n.hex
    }, e.getColor.reset = function() {
        delete this.start
    }, e.parsePathString = function(t) {
        if (!t) return null;
        var n = Se(t);
        if (n.arr) return Fe(n.arr);
        var r = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        }, i = [];
        return e.is(t, W) && e.is(t[0], W) && (i = Fe(t)), i.length || M(t).replace(se, function(t, e, n) {
            var a = [],
                s = e.toLowerCase();
            if (n.replace(ue, function(t, e) {
                e && a.push(+e)
            }), "m" == s && a.length > 2 && (i.push([e][L](a.splice(0, 2))), s = "l", e = "m" == e ? "l" : "L"), "r" == s) i.push([e][L](a));
            else
                for (; a.length >= r[s] && (i.push([e][L](a.splice(0, r[s]))), r[s]););
        }), i.toString = e._path2string, n.arr = Fe(i), i
    }, e.parseTransformString = i(function(t) {
        if (!t) return null;
        var n = [];
        return e.is(t, W) && e.is(t[0], W) && (n = Fe(t)), n.length || M(t).replace(oe, function(t, e, r) {
            var i = [];
            j.call(e), r.replace(ue, function(t, e) {
                e && i.push(+e)
            }), n.push([e][L](i))
        }), n.toString = e._path2string, n
    });
    var Se = function(t) {
        var e = Se.ps = Se.ps || {};
        return e[t] ? e[t].sleep = 100 : e[t] = {
            sleep: 100
        }, setTimeout(function() {
            for (var n in e) e[B](n) && n != t && (e[n].sleep--, !e[n].sleep && delete e[n])
        }), e[t]
    };
    e.findDotsAtSegment = function(t, e, n, r, i, a, s, o, u) {
        var l = 1 - u,
            h = X(l, 3),
            c = X(l, 2),
            f = u * u,
            p = f * u,
            d = h * t + 3 * c * u * n + 3 * l * u * u * i + p * s,
            g = h * e + 3 * c * u * r + 3 * l * u * u * a + p * o,
            x = t + 2 * u * (n - t) + f * (i - 2 * n + t),
            v = e + 2 * u * (r - e) + f * (a - 2 * r + e),
            m = n + 2 * u * (i - n) + f * (s - 2 * i + n),
            y = r + 2 * u * (a - r) + f * (o - 2 * a + r),
            b = l * t + u * n,
            _ = l * e + u * r,
            w = l * i + u * s,
            k = l * a + u * o,
            B = 90 - 180 * D.atan2(x - m, v - y) / Y;
        return (x > m || y > v) && (B += 180), {
            x: d,
            y: g,
            m: {
                x: x,
                y: v
            },
            n: {
                x: m,
                y: y
            },
            start: {
                x: b,
                y: _
            },
            end: {
                x: w,
                y: k
            },
            alpha: B
        }
    }, e.bezierBBox = function(t, n, r, i, a, s, o, u) {
        e.is(t, "array") || (t = [t, n, r, i, a, s, o, u]);
        var l = Ie.apply(null, t);
        return {
            x: l.min.x,
            y: l.min.y,
            x2: l.max.x,
            y2: l.max.y,
            width: l.max.x - l.min.x,
            height: l.max.y - l.min.y
        }
    }, e.isPointInsideBBox = function(t, e, n) {
        return e >= t.x && t.x2 >= e && n >= t.y && t.y2 >= n
    }, e.isBBoxIntersect = function(t, n) {
        var r = e.isPointInsideBBox;
        return r(n, t.x, t.y) || r(n, t.x2, t.y) || r(n, t.x, t.y2) || r(n, t.x2, t.y2) || r(t, n.x, n.y) || r(t, n.x2, n.y) || r(t, n.x, n.y2) || r(t, n.x2, n.y2) || (t.x < n.x2 && t.x > n.x || n.x < t.x2 && n.x > t.x) && (t.y < n.y2 && t.y > n.y || n.y < t.y2 && n.y > t.y)
    }, e.pathIntersection = function(t, e) {
        return f(t, e)
    }, e.pathIntersectionNumber = function(t, e) {
        return f(t, e, 1)
    }, e.isPointInsidePath = function(t, n, r) {
        var i = e.pathBBox(t);
        return e.isPointInsideBBox(i, n, r) && 1 == f(t, [
            ["M", n, r],
            ["H", i.x2 + 10]
        ], 1) % 2
    }, e._removedFactory = function(e) {
        return function() {
            t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e)
        }
    };
    var Ce = e.pathBBox = function(t) {
        var e = Se(t);
        if (e.bbox) return n(e.bbox);
        if (!t) return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            x2: 0,
            y2: 0
        };
        t = Re(t);
        for (var r, i = 0, a = 0, s = [], o = [], u = 0, l = t.length; l > u; u++)
            if (r = t[u], "M" == r[0]) i = r[1], a = r[2], s.push(i), o.push(a);
            else {
                var h = Ie(i, a, r[1], r[2], r[3], r[4], r[5], r[6]);
                s = s[L](h.min.x, h.max.x), o = o[L](h.min.y, h.max.y), i = r[5], a = r[6]
            }
        var c = O[T](0, s),
            f = O[T](0, o),
            p = z[T](0, s),
            d = z[T](0, o),
            g = p - c,
            x = d - f,
            v = {
                x: c,
                y: f,
                x2: p,
                y2: d,
                width: g,
                height: x,
                cx: c + g / 2,
                cy: f + x / 2
            };
        return e.bbox = n(v), v
    }, Fe = function(t) {
            var r = n(t);
            return r.toString = e._path2string, r
        }, Te = e._pathToRelative = function(t) {
            var n = Se(t);
            if (n.rel) return Fe(n.rel);
            e.is(t, W) && e.is(t && t[0], W) || (t = e.parsePathString(t));
            var r = [],
                i = 0,
                a = 0,
                s = 0,
                o = 0,
                u = 0;
            "M" == t[0][0] && (i = t[0][1], a = t[0][2], s = i, o = a, u++, r.push(["M", i, a]));
            for (var l = u, h = t.length; h > l; l++) {
                var c = r[l] = [],
                    f = t[l];
                if (f[0] != j.call(f[0])) switch (c[0] = j.call(f[0]), c[0]) {
                    case "a":
                        c[1] = f[1], c[2] = f[2], c[3] = f[3], c[4] = f[4], c[5] = f[5], c[6] = +(f[6] - i).toFixed(3), c[7] = +(f[7] - a).toFixed(3);
                        break;
                    case "v":
                        c[1] = +(f[1] - a).toFixed(3);
                        break;
                    case "m":
                        s = f[1], o = f[2];
                    default:
                        for (var p = 1, d = f.length; d > p; p++) c[p] = +(f[p] - (p % 2 ? i : a)).toFixed(3)
                } else {
                    c = r[l] = [], "m" == f[0] && (s = f[1] + i, o = f[2] + a);
                    for (var g = 0, x = f.length; x > g; g++) r[l][g] = f[g]
                }
                var v = r[l].length;
                switch (r[l][0]) {
                    case "z":
                        i = s, a = o;
                        break;
                    case "h":
                        i += +r[l][v - 1];
                        break;
                    case "v":
                        a += +r[l][v - 1];
                        break;
                    default:
                        i += +r[l][v - 2], a += +r[l][v - 1]
                }
            }
            return r.toString = e._path2string, n.rel = Fe(r), r
        }, Le = e._pathToAbsolute = function(t) {
            var n = Se(t);
            if (n.abs) return Fe(n.abs);
            if (e.is(t, W) && e.is(t && t[0], W) || (t = e.parsePathString(t)), !t || !t.length) return [["M", 0, 0]];
            var r = [],
                i = 0,
                a = 0,
                o = 0,
                u = 0,
                l = 0;
            "M" == t[0][0] && (i = +t[0][1], a = +t[0][2], o = i, u = a, l++, r[0] = ["M", i, a]);
            for (var h, c, f = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), p = l, d = t.length; d > p; p++) {
                if (r.push(h = []), c = t[p], c[0] != te.call(c[0])) switch (h[0] = te.call(c[0]), h[0]) {
                    case "A":
                        h[1] = c[1], h[2] = c[2], h[3] = c[3], h[4] = c[4], h[5] = c[5], h[6] = +(c[6] + i), h[7] = +(c[7] + a);
                        break;
                    case "V":
                        h[1] = +c[1] + a;
                        break;
                    case "H":
                        h[1] = +c[1] + i;
                        break;
                    case "R":
                        for (var g = [i, a][L](c.slice(1)), x = 2, v = g.length; v > x; x++) g[x] = +g[x] + i, g[++x] = +g[x] + a;
                        r.pop(), r = r[L](s(g, f));
                        break;
                    case "M":
                        o = +c[1] + i, u = +c[2] + a;
                    default:
                        for (x = 1, v = c.length; v > x; x++) h[x] = +c[x] + (x % 2 ? i : a)
                } else if ("R" == c[0]) g = [i, a][L](c.slice(1)), r.pop(), r = r[L](s(g, f)), h = ["R"][L](c.slice(-2));
                else
                    for (var m = 0, y = c.length; y > m; m++) h[m] = c[m];
                switch (h[0]) {
                    case "Z":
                        i = o, a = u;
                        break;
                    case "H":
                        i = h[1];
                        break;
                    case "V":
                        a = h[1];
                        break;
                    case "M":
                        o = h[h.length - 2], u = h[h.length - 1];
                    default:
                        i = h[h.length - 2], a = h[h.length - 1]
                }
            }
            return r.toString = e._path2string, n.abs = Fe(r), r
        }, Ae = function(t, e, n, r) {
            return [t, e, n, r, n, r]
        }, Pe = function(t, e, n, r, i, a) {
            var s = 1 / 3,
                o = 2 / 3;
            return [s * t + o * n, s * e + o * r, s * i + o * n, s * a + o * r, i, a]
        }, Ee = function(t, e, n, r, a, s, o, u, l, h) {
            var c, f = 120 * Y / 180,
                p = Y / 180 * (+a || 0),
                d = [],
                g = i(function(t, e, n) {
                    var r = t * D.cos(n) - e * D.sin(n),
                        i = t * D.sin(n) + e * D.cos(n);
                    return {
                        x: r,
                        y: i
                    }
                });
            if (h) B = h[0], S = h[1], w = h[2], k = h[3];
            else {
                c = g(t, e, -p), t = c.x, e = c.y, c = g(u, l, -p), u = c.x, l = c.y;
                var x = (D.cos(Y / 180 * a), D.sin(Y / 180 * a), (t - u) / 2),
                    v = (e - l) / 2,
                    m = x * x / (n * n) + v * v / (r * r);
                m > 1 && (m = D.sqrt(m), n = m * n, r = m * r);
                var y = n * n,
                    b = r * r,
                    _ = (s == o ? -1 : 1) * D.sqrt(V((y * b - y * v * v - b * x * x) / (y * v * v + b * x * x))),
                    w = _ * n * v / r + (t + u) / 2,
                    k = _ * -r * x / n + (e + l) / 2,
                    B = D.asin(((e - k) / r).toFixed(9)),
                    S = D.asin(((l - k) / r).toFixed(9));
                B = w > t ? Y - B : B, S = w > u ? Y - S : S, 0 > B && (B = 2 * Y + B), 0 > S && (S = 2 * Y + S), o && B > S && (B -= 2 * Y), !o && S > B && (S -= 2 * Y)
            }
            var C = S - B;
            if (V(C) > f) {
                var F = S,
                    T = u,
                    A = l;
                S = B + f * (o && S > B ? 1 : -1), u = w + n * D.cos(S), l = k + r * D.sin(S), d = Ee(u, l, n, r, a, 0, o, T, A, [S, F, w, k])
            }
            C = S - B;
            var P = D.cos(B),
                E = D.sin(B),
                M = D.cos(S),
                R = D.sin(S),
                q = D.tan(C / 4),
                j = 4 / 3 * n * q,
                z = 4 / 3 * r * q,
                O = [t, e],
                X = [t + j * E, e - z * P],
                G = [u + j * R, l - z * M],
                N = [u, l];
            if (X[0] = 2 * O[0] - X[0], X[1] = 2 * O[1] - X[1], h) return [X, G, N][L](d);
            d = [X, G, N][L](d).join()[I](",");
            for (var W = [], $ = 0, H = d.length; H > $; $++) W[$] = $ % 2 ? g(d[$ - 1], d[$], p).y : g(d[$], d[$ + 1], p).x;
            return W
        }, Me = function(t, e, n, r, i, a, s, o, u) {
            var l = 1 - u;
            return {
                x: X(l, 3) * t + 3 * X(l, 2) * u * n + 3 * l * u * u * i + X(u, 3) * s,
                y: X(l, 3) * e + 3 * X(l, 2) * u * r + 3 * l * u * u * a + X(u, 3) * o
            }
        }, Ie = i(function(t, e, n, r, i, a, s, o) {
            var u, l = i - 2 * n + t - (s - 2 * i + n),
                h = 2 * (n - t) - 2 * (i - n),
                c = t - n,
                f = (-h + D.sqrt(h * h - 4 * l * c)) / 2 / l,
                p = (-h - D.sqrt(h * h - 4 * l * c)) / 2 / l,
                d = [e, o],
                g = [t, s];
            return V(f) > "1e12" && (f = .5), V(p) > "1e12" && (p = .5), f > 0 && 1 > f && (u = Me(t, e, n, r, i, a, s, o, f), g.push(u.x), d.push(u.y)), p > 0 && 1 > p && (u = Me(t, e, n, r, i, a, s, o, p), g.push(u.x), d.push(u.y)), l = a - 2 * r + e - (o - 2 * a + r), h = 2 * (r - e) - 2 * (a - r), c = e - r, f = (-h + D.sqrt(h * h - 4 * l * c)) / 2 / l, p = (-h - D.sqrt(h * h - 4 * l * c)) / 2 / l, V(f) > "1e12" && (f = .5), V(p) > "1e12" && (p = .5), f > 0 && 1 > f && (u = Me(t, e, n, r, i, a, s, o, f), g.push(u.x), d.push(u.y)), p > 0 && 1 > p && (u = Me(t, e, n, r, i, a, s, o, p), g.push(u.x), d.push(u.y)), {
                min: {
                    x: O[T](0, g),
                    y: O[T](0, d)
                },
                max: {
                    x: z[T](0, g),
                    y: z[T](0, d)
                }
            }
        }),
        Re = e._path2curve = i(function(t, e) {
            var n = !e && Se(t);
            if (!e && n.curve) return Fe(n.curve);
            for (var r = Le(t), i = e && Le(e), a = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, s = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, o = (function(t, e) {
                    var n, r;
                    if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                    switch (!(t[0] in {
                        T: 1,
                        Q: 1
                    }) && (e.qx = e.qy = null), t[0]) {
                        case "M":
                            e.X = t[1], e.Y = t[2];
                            break;
                        case "A":
                            t = ["C"][L](Ee[T](0, [e.x, e.y][L](t.slice(1))));
                            break;
                        case "S":
                            n = e.x + (e.x - (e.bx || e.x)), r = e.y + (e.y - (e.by || e.y)), t = ["C", n, r][L](t.slice(1));
                            break;
                        case "T":
                            e.qx = e.x + (e.x - (e.qx || e.x)), e.qy = e.y + (e.y - (e.qy || e.y)), t = ["C"][L](Pe(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                            break;
                        case "Q":
                            e.qx = t[1], e.qy = t[2], t = ["C"][L](Pe(e.x, e.y, t[1], t[2], t[3], t[4]));
                            break;
                        case "L":
                            t = ["C"][L](Ae(e.x, e.y, t[1], t[2]));
                            break;
                        case "H":
                            t = ["C"][L](Ae(e.x, e.y, t[1], e.y));
                            break;
                        case "V":
                            t = ["C"][L](Ae(e.x, e.y, e.x, t[1]));
                            break;
                        case "Z":
                            t = ["C"][L](Ae(e.x, e.y, e.X, e.Y))
                    }
                    return t
                }), u = function(t, e) {
                    if (t[e].length > 7) {
                        t[e].shift();
                        for (var n = t[e]; n.length;) t.splice(e++, 0, ["C"][L](n.splice(0, 6)));
                        t.splice(e, 1), c = z(r.length, i && i.length || 0)
                    }
                }, l = function(t, e, n, a, s) {
                    t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", a.x, a.y]), n.bx = 0, n.by = 0, n.x = t[s][1], n.y = t[s][2], c = z(r.length, i && i.length || 0))
                }, h = 0, c = z(r.length, i && i.length || 0); c > h; h++) {
                r[h] = o(r[h], a), u(r, h), i && (i[h] = o(i[h], s)), i && u(i, h), l(r, i, a, s, h), l(i, r, s, a, h);
                var f = r[h],
                    p = i && i[h],
                    d = f.length,
                    g = i && p.length;
                a.x = f[d - 2], a.y = f[d - 1], a.bx = J(f[d - 4]) || a.x, a.by = J(f[d - 3]) || a.y, s.bx = i && (J(p[g - 4]) || s.x), s.by = i && (J(p[g - 3]) || s.y), s.x = i && p[g - 2], s.y = i && p[g - 1]
            }
            return i || (n.curve = Fe(r)), i ? [r, i] : r
        }, null, Fe),
        qe = (e._parseDots = i(function(t) {
            for (var n = [], r = 0, i = t.length; i > r; r++) {
                var a = {}, s = t[r].match(/^([^:]*):?([\d\.]*)/);
                if (a.color = e.getRGB(s[1]), a.color.error) return null;
                a.color = a.color.hex, s[2] && (a.offset = s[2] + "%"), n.push(a)
            }
            for (r = 1, i = n.length - 1; i > r; r++)
                if (!n[r].offset) {
                    for (var o = J(n[r - 1].offset || 0), u = 0, l = r + 1; i > l; l++)
                        if (n[l].offset) {
                            u = n[l].offset;
                            break
                        }
                    u || (u = 100, l = i), u = J(u);
                    for (var h = (u - o) / (l - r + 1); l > r; r++) o += h, n[r].offset = o + "%"
                }
            return n
        }), e._tear = function(t, e) {
            t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next)
        }),
        je = (e._tofront = function(t, e) {
            e.top !== t && (qe(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t)
        }, e._toback = function(t, e) {
            e.bottom !== t && (qe(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t)
        }, e._insertafter = function(t, e, n) {
            qe(t, n), e == n.top && (n.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t
        }, e._insertbefore = function(t, e, n) {
            qe(t, n), e == n.bottom && (n.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e
        }, e.toMatrix = function(t, e) {
            var n = Ce(t),
                r = {
                    _: {
                        transform: P
                    },
                    getBBox: function() {
                        return n
                    }
                };
            return De(r, e), r.matrix
        }),
        De = (e.transformPath = function(t, e) {
            return xe(t, je(t, e))
        }, e._extractTransform = function(t, n) {
            if (null == n) return t._.transform;
            n = M(n).replace(/\.{3}|\u2026/g, t._.transform || P);
            var r = e.parseTransformString(n),
                i = 0,
                a = 0,
                s = 0,
                o = 1,
                u = 1,
                l = t._,
                h = new p;
            if (l.transform = r || [], r)
                for (var c = 0, f = r.length; f > c; c++) {
                    var d, g, x, v, m, y = r[c],
                        b = y.length,
                        _ = M(y[0]).toLowerCase(),
                        w = y[0] != _,
                        k = w ? h.invert() : 0;
                    "t" == _ && 3 == b ? w ? (d = k.x(0, 0), g = k.y(0, 0), x = k.x(y[1], y[2]), v = k.y(y[1], y[2]), h.translate(x - d, v - g)) : h.translate(y[1], y[2]) : "r" == _ ? 2 == b ? (m = m || t.getBBox(1), h.rotate(y[1], m.x + m.width / 2, m.y + m.height / 2), i += y[1]) : 4 == b && (w ? (x = k.x(y[2], y[3]), v = k.y(y[2], y[3]), h.rotate(y[1], x, v)) : h.rotate(y[1], y[2], y[3]), i += y[1]) : "s" == _ ? 2 == b || 3 == b ? (m = m || t.getBBox(1), h.scale(y[1], y[b - 1], m.x + m.width / 2, m.y + m.height / 2), o *= y[1], u *= y[b - 1]) : 5 == b && (w ? (x = k.x(y[3], y[4]), v = k.y(y[3], y[4]), h.scale(y[1], y[2], x, v)) : h.scale(y[1], y[2], y[3], y[4]), o *= y[1], u *= y[2]) : "m" == _ && 7 == b && h.add(y[1], y[2], y[3], y[4], y[5], y[6]), l.dirtyT = 1, t.matrix = h
                }
            t.matrix = h, l.sx = o, l.sy = u, l.deg = i, l.dx = a = h.e, l.dy = s = h.f, 1 == o && 1 == u && !i && l.bbox ? (l.bbox.x += +a, l.bbox.y += +s) : l.dirtyT = 1
        }),
        ze = function(t) {
            var e = t[0];
            switch (e.toLowerCase()) {
                case "t":
                    return [e, 0, 0];
                case "m":
                    return [e, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                case "s":
                    return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
            }
        }, Oe = e._equaliseTransform = function(t, n) {
            n = M(n).replace(/\.{3}|\u2026/g, t), t = e.parseTransformString(t) || [], n = e.parseTransformString(n) || [];
            for (var r, i, a, s, o = z(t.length, n.length), u = [], l = [], h = 0; o > h; h++) {
                if (a = t[h] || ze(n[h]), s = n[h] || ze(a), a[0] != s[0] || "r" == a[0].toLowerCase() && (a[2] != s[2] || a[3] != s[3]) || "s" == a[0].toLowerCase() && (a[3] != s[3] || a[4] != s[4])) return;
                for (u[h] = [], l[h] = [], r = 0, i = z(a.length, s.length); i > r; r++) r in a && (u[h][r] = a[r]), r in s && (l[h][r] = s[r])
            }
            return {
                from: u,
                to: l
            }
        };
    e._getContainer = function(t, n, r, i) {
        var a;
        return a = null != i || e.is(t, "object") ? t : S.doc.getElementById(t), null != a ? a.tagName ? null == n ? {
            container: a,
            width: a.style.pixelWidth || a.offsetWidth,
            height: a.style.pixelHeight || a.offsetHeight
        } : {
            container: a,
            width: n,
            height: r
        } : {
            container: 1,
            x: t,
            y: n,
            width: r,
            height: i
        } : void 0
    }, e.pathToRelative = Te, e._engine = {}, e.path2curve = Re, e.matrix = function(t, e, n, r, i, a) {
        return new p(t, e, n, r, i, a)
    },
    function(t) {
        function n(t) {
            return t[0] * t[0] + t[1] * t[1]
        }

        function r(t) {
            var e = D.sqrt(n(t));
            t[0] && (t[0] /= e), t[1] && (t[1] /= e)
        }
        t.add = function(t, e, n, r, i, a) {
            var s, o, u, l, h = [
                    [],
                    [],
                    []
                ],
                c = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ],
                f = [
                    [t, n, i],
                    [e, r, a],
                    [0, 0, 1]
                ];
            for (t && t instanceof p && (f = [
                [t.a, t.c, t.e],
                [t.b, t.d, t.f],
                [0, 0, 1]
            ]), s = 0; 3 > s; s++)
                for (o = 0; 3 > o; o++) {
                    for (l = 0, u = 0; 3 > u; u++) l += c[s][u] * f[u][o];
                    h[s][o] = l
                }
            this.a = h[0][0], this.b = h[1][0], this.c = h[0][1], this.d = h[1][1], this.e = h[0][2], this.f = h[1][2]
        }, t.invert = function() {
            var t = this,
                e = t.a * t.d - t.b * t.c;
            return new p(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
        }, t.clone = function() {
            return new p(this.a, this.b, this.c, this.d, this.e, this.f)
        }, t.translate = function(t, e) {
            this.add(1, 0, 0, 1, t, e)
        }, t.scale = function(t, e, n, r) {
            null == e && (e = t), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(t, 0, 0, e, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r)
        }, t.rotate = function(t, n, r) {
            t = e.rad(t), n = n || 0, r = r || 0;
            var i = +D.cos(t).toFixed(9),
                a = +D.sin(t).toFixed(9);
            this.add(i, a, -a, i, n, r), this.add(1, 0, 0, 1, -n, -r)
        }, t.x = function(t, e) {
            return t * this.a + e * this.c + this.e
        }, t.y = function(t, e) {
            return t * this.b + e * this.d + this.f
        }, t.get = function(t) {
            return +this[M.fromCharCode(97 + t)].toFixed(4)
        }, t.toString = function() {
            return e.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        }, t.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        }, t.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)]
        }, t.split = function() {
            var t = {};
            t.dx = this.e, t.dy = this.f;
            var i = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            t.scalex = D.sqrt(n(i[0])), r(i[0]), t.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * t.shear, i[1][1] - i[0][1] * t.shear], t.scaley = D.sqrt(n(i[1])), r(i[1]), t.shear /= t.scaley;
            var a = -i[0][1],
                s = i[1][1];
            return 0 > s ? (t.rotate = e.deg(D.acos(s)), 0 > a && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(D.asin(a)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
        }, t.toTransformString = function(t) {
            var e = t || this[I]();
            return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : P) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : P) + (e.rotate ? "r" + [e.rotate, 0, 0] : P)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
        }
    }(p.prototype);
    var Ve = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    b.safari = "Apple Computer, Inc." == navigator.vendor && (Ve && 4 > Ve[1] || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Ve && 8 > Ve[1] ? function() {
        var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function() {
            t.remove()
        })
    } : ce;
    for (var Xe = function() {
        this.returnValue = !1
    }, Ye = function() {
            return this.originalEvent.preventDefault()
        }, Ge = function() {
            this.cancelBubble = !0
        }, Ne = function() {
            return this.originalEvent.stopPropagation()
        }, We = function() {
            return S.doc.addEventListener ? function(t, e, n, r) {
                var i = A && q[e] ? q[e] : e,
                    a = function(i) {
                        var a = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                            s = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft,
                            o = i.clientX + s,
                            u = i.clientY + a;
                        if (A && q[B](e))
                            for (var l = 0, h = i.targetTouches && i.targetTouches.length; h > l; l++)
                                if (i.targetTouches[l].target == t) {
                                    var c = i;
                                    i = i.targetTouches[l], i.originalEvent = c, i.preventDefault = Ye, i.stopPropagation = Ne;
                                    break
                                }
                        return n.call(r, i, o, u)
                    };
                return t.addEventListener(i, a, !1),
                function() {
                    return t.removeEventListener(i, a, !1), !0
                }
            } : S.doc.attachEvent ? function(t, e, n, r) {
                var i = function(t) {
                    t = t || S.win.event;
                    var e = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                        i = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft,
                        a = t.clientX + i,
                        s = t.clientY + e;
                    return t.preventDefault = t.preventDefault || Xe, t.stopPropagation = t.stopPropagation || Ge, n.call(r, t, a, s)
                };
                t.attachEvent("on" + e, i);
                var a = function() {
                    return t.detachEvent("on" + e, i), !0
                };
                return a
            } : void 0
        }(), $e = [], He = function(e) {
            for (var n, r = e.clientX, i = e.clientY, a = S.doc.documentElement.scrollTop || S.doc.body.scrollTop, s = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft, o = $e.length; o--;) {
                if (n = $e[o], A) {
                    for (var u, l = e.touches.length; l--;)
                        if (u = e.touches[l], u.identifier == n.el._drag.id) {
                            r = u.clientX, i = u.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                            break
                        }
                } else e.preventDefault();
                var h, c = n.el.node,
                    f = c.nextSibling,
                    p = c.parentNode,
                    d = c.style.display;
                S.win.opera && p.removeChild(c), c.style.display = "none", h = n.el.paper.getElementByPoint(r, i), c.style.display = d, S.win.opera && (f ? p.insertBefore(c, f) : p.appendChild(c)), h && t("raphael.drag.over." + n.el.id, n.el, h), r += s, i += a, t("raphael.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e)
            }
        }, Ue = function(n) {
            e.unmousemove(He).unmouseup(Ue);
            for (var r, i = $e.length; i--;) r = $e[i], r.el._drag = {}, t("raphael.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, n);
            $e = []
        }, Ze = e.el = {}, Qe = R.length; Qe--;)(function(t) {
        e[t] = Ze[t] = function(n, r) {
            return e.is(n, "function") && (this.events = this.events || [], this.events.push({
                name: t,
                f: n,
                unbind: We(this.shape || this.node || S.doc, t, n, r || this)
            })), this
        }, e["un" + t] = Ze["un" + t] = function(e) {
            for (var n = this.events || [], r = n.length; r--;)
                if (n[r].name == t && n[r].f == e) return n[r].unbind(), n.splice(r, 1), !n.length && delete this.events, this;
            return this
        }
    })(R[Qe]);
    Ze.data = function(n, r) {
        var i = le[this.id] = le[this.id] || {};
        if (1 == arguments.length) {
            if (e.is(n, "object")) {
                for (var a in n) n[B](a) && this.data(a, n[a]);
                return this
            }
            return t("raphael.data.get." + this.id, this, i[n], n), i[n]
        }
        return i[n] = r, t("raphael.data.set." + this.id, this, r, n), this
    }, Ze.removeData = function(t) {
        return null == t ? le[this.id] = {} : le[this.id] && delete le[this.id][t], this
    }, Ze.getData = function() {
        return n(le[this.id] || {})
    }, Ze.hover = function(t, e, n, r) {
        return this.mouseover(t, n).mouseout(e, r || n)
    }, Ze.unhover = function(t, e) {
        return this.unmouseover(t).unmouseout(e)
    };
    var Je = [];
    Ze.drag = function(n, r, i, a, s, o) {
        function u(u) {
            (u.originalEvent || u).preventDefault();
            var l = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                h = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft;
            this._drag.x = u.clientX + h, this._drag.y = u.clientY + l, this._drag.id = u.identifier, !$e.length && e.mousemove(He).mouseup(Ue), $e.push({
                el: this,
                move_scope: a,
                start_scope: s,
                end_scope: o
            }), r && t.on("raphael.drag.start." + this.id, r), n && t.on("raphael.drag.move." + this.id, n), i && t.on("raphael.drag.end." + this.id, i), t("raphael.drag.start." + this.id, s || a || this, u.clientX + h, u.clientY + l, u)
        }
        return this._drag = {}, Je.push({
            el: this,
            start: u
        }), this.mousedown(u), this
    }, Ze.onDragOver = function(e) {
        e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id)
    }, Ze.undrag = function() {
        for (var n = Je.length; n--;) Je[n].el == this && (this.unmousedown(Je[n].start), Je.splice(n, 1), t.unbind("raphael.drag.*." + this.id));
        !Je.length && e.unmousemove(He).unmouseup(Ue), $e = []
    }, b.circle = function(t, n, r) {
        var i = e._engine.circle(this, t || 0, n || 0, r || 0);
        return this.__set__ && this.__set__.push(i), i
    }, b.rect = function(t, n, r, i, a) {
        var s = e._engine.rect(this, t || 0, n || 0, r || 0, i || 0, a || 0);
        return this.__set__ && this.__set__.push(s), s
    }, b.ellipse = function(t, n, r, i) {
        var a = e._engine.ellipse(this, t || 0, n || 0, r || 0, i || 0);
        return this.__set__ && this.__set__.push(a), a
    }, b.path = function(t) {
        t && !e.is(t, N) && !e.is(t[0], W) && (t += P);
        var n = e._engine.path(e.format[T](e, arguments), this);
        return this.__set__ && this.__set__.push(n), n
    }, b.image = function(t, n, r, i, a) {
        var s = e._engine.image(this, t || "about:blank", n || 0, r || 0, i || 0, a || 0);
        return this.__set__ && this.__set__.push(s), s
    }, b.text = function(t, n, r) {
        var i = e._engine.text(this, t || 0, n || 0, M(r));
        return this.__set__ && this.__set__.push(i), i
    }, b.set = function(t) {
        !e.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
        var n = new cn(t);
        return this.__set__ && this.__set__.push(n), n.paper = this, n.type = "set", n
    }, b.setStart = function(t) {
        this.__set__ = t || this.set()
    }, b.setFinish = function() {
        var t = this.__set__;
        return delete this.__set__, t
    }, b.setSize = function(t, n) {
        return e._engine.setSize.call(this, t, n)
    }, b.setViewBox = function(t, n, r, i, a) {
        return e._engine.setViewBox.call(this, t, n, r, i, a)
    }, b.top = b.bottom = null, b.raphael = e;
    var Ke = function(t) {
        var e = t.getBoundingClientRect(),
            n = t.ownerDocument,
            r = n.body,
            i = n.documentElement,
            a = i.clientTop || r.clientTop || 0,
            s = i.clientLeft || r.clientLeft || 0,
            o = e.top + (S.win.pageYOffset || i.scrollTop || r.scrollTop) - a,
            u = e.left + (S.win.pageXOffset || i.scrollLeft || r.scrollLeft) - s;
        return {
            y: o,
            x: u
        }
    };
    b.getElementByPoint = function(t, e) {
        var n = this,
            r = n.canvas,
            i = S.doc.elementFromPoint(t, e);
        if (S.win.opera && "svg" == i.tagName) {
            var a = Ke(r),
                s = r.createSVGRect();
            s.x = t - a.x, s.y = e - a.y, s.width = s.height = 1;
            var o = r.getIntersectionList(s, null);
            o.length && (i = o[o.length - 1])
        }
        if (!i) return null;
        for (; i.parentNode && i != r.parentNode && !i.raphael;) i = i.parentNode;
        return i == n.canvas.parentNode && (i = r), i = i && i.raphael ? n.getById(i.raphaelid) : null
    }, b.getElementsByBBox = function(t) {
        var n = this.set();
        return this.forEach(function(r) {
            e.isBBoxIntersect(r.getBBox(), t) && n.push(r)
        }), n
    }, b.getById = function(t) {
        for (var e = this.bottom; e;) {
            if (e.id == t) return e;
            e = e.next
        }
        return null
    }, b.forEach = function(t, e) {
        for (var n = this.bottom; n;) {
            if (t.call(e, n) === !1) return this;
            n = n.next
        }
        return this
    }, b.getElementsByPoint = function(t, e) {
        var n = this.set();
        return this.forEach(function(r) {
            r.isPointInside(t, e) && n.push(r)
        }), n
    }, Ze.isPointInside = function(t, n) {
        var r = this.realPath = this.realPath || ge[this.type](this);
        return e.isPointInsidePath(r, t, n)
    }, Ze.getBBox = function(t) {
        if (this.removed) return {};
        var e = this._;
        return t ? ((e.dirty || !e.bboxwt) && (this.realPath = ge[this.type](this), e.bboxwt = Ce(this.realPath), e.bboxwt.toString = d, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && ((e.dirty || !this.realPath) && (e.bboxwt = 0, this.realPath = ge[this.type](this)), e.bbox = Ce(xe(this.realPath, this.matrix)), e.bbox.toString = d, e.dirty = e.dirtyT = 0), e.bbox)
    }, Ze.clone = function() {
        if (this.removed) return null;
        var t = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(t), t
    }, Ze.glow = function(t) {
        if ("text" == this.type) return null;
        t = t || {};
        var e = {
            width: (t.width || 10) + (+this.attr("stroke-width") || 1),
            fill: t.fill || !1,
            opacity: t.opacity || .5,
            offsetx: t.offsetx || 0,
            offsety: t.offsety || 0,
            color: t.color || "#000"
        }, n = e.width / 2,
            r = this.paper,
            i = r.set(),
            a = this.realPath || ge[this.type](this);
        a = this.matrix ? xe(a, this.matrix) : a;
        for (var s = 1; n + 1 > s; s++) i.push(r.path(a).attr({
            stroke: e.color,
            fill: e.fill ? e.color : "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
            "stroke-width": +(e.width / n * s).toFixed(3),
            opacity: +(e.opacity / n).toFixed(3)
        }));
        return i.insertBefore(this).translate(e.offsetx, e.offsety)
    };
    var tn = function(t, n, r, i, a, s, o, h, c) {
        return null == c ? u(t, n, r, i, a, s, o, h) : e.findDotsAtSegment(t, n, r, i, a, s, o, h, l(t, n, r, i, a, s, o, h, c))
    }, en = function(t, n) {
            return function(r, i, a) {
                r = Re(r);
                for (var s, o, u, l, h, c = "", f = {}, p = 0, d = 0, g = r.length; g > d; d++) {
                    if (u = r[d], "M" == u[0]) s = +u[1], o = +u[2];
                    else {
                        if (l = tn(s, o, u[1], u[2], u[3], u[4], u[5], u[6]), p + l > i) {
                            if (n && !f.start) {
                                if (h = tn(s, o, u[1], u[2], u[3], u[4], u[5], u[6], i - p), c += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y], a) return c;
                                f.start = c, c = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, u[5], u[6]].join(), p += l, s = +u[5], o = +u[6];
                                continue
                            }
                            if (!t && !n) return h = tn(s, o, u[1], u[2], u[3], u[4], u[5], u[6], i - p), {
                                x: h.x,
                                y: h.y,
                                alpha: h.alpha
                            }
                        }
                        p += l, s = +u[5], o = +u[6]
                    }
                    c += u.shift() + u
                }
                return f.end = c, h = t ? p : n ? f : e.findDotsAtSegment(s, o, u[0], u[1], u[2], u[3], u[4], u[5], 1), h.alpha && (h = {
                    x: h.x,
                    y: h.y,
                    alpha: h.alpha
                }), h
            }
        }, nn = en(1),
        rn = en(),
        an = en(0, 1);
    e.getTotalLength = nn, e.getPointAtLength = rn, e.getSubpath = function(t, e, n) {
        if (1e-6 > this.getTotalLength(t) - n) return an(t, e).end;
        var r = an(t, n, 1);
        return e ? an(r, e).end : r
    }, Ze.getTotalLength = function() {
        return "path" == this.type ? this.node.getTotalLength ? this.node.getTotalLength() : nn(this.attrs.path) : void 0
    }, Ze.getPointAtLength = function(t) {
        return "path" == this.type ? rn(this.attrs.path, t) : void 0
    }, Ze.getSubpath = function(t, n) {
        return "path" == this.type ? e.getSubpath(this.attrs.path, t, n) : void 0
    };
    var sn = e.easing_formulas = {
        linear: function(t) {
            return t
        },
        "<": function(t) {
            return X(t, 1.7)
        },
        ">": function(t) {
            return X(t, .48)
        },
        "<>": function(t) {
            var e = .48 - t / 1.04,
                n = D.sqrt(.1734 + e * e),
                r = n - e,
                i = X(V(r), 1 / 3) * (0 > r ? -1 : 1),
                a = -n - e,
                s = X(V(a), 1 / 3) * (0 > a ? -1 : 1),
                o = i + s + .5;
            return 3 * (1 - o) * o * o + o * o * o
        },
        backIn: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        },
        backOut: function(t) {
            t -= 1;
            var e = 1.70158;
            return t * t * ((e + 1) * t + e) + 1
        },
        elastic: function(t) {
            return t == !! t ? t : X(2, -10 * t) * D.sin((t - .075) * 2 * Y / .3) + 1
        },
        bounce: function(t) {
            var e, n = 7.5625,
                r = 2.75;
            return 1 / r > t ? e = n * t * t : 2 / r > t ? (t -= 1.5 / r, e = n * t * t + .75) : 2.5 / r > t ? (t -= 2.25 / r, e = n * t * t + .9375) : (t -= 2.625 / r, e = n * t * t + .984375), e
        }
    };
    sn.easeIn = sn["ease-in"] = sn["<"], sn.easeOut = sn["ease-out"] = sn[">"], sn.easeInOut = sn["ease-in-out"] = sn["<>"], sn["back-in"] = sn.backIn, sn["back-out"] = sn.backOut;
    var on = [],
        un = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            setTimeout(t, 16)
        }, ln = function() {
            for (var n = +new Date, r = 0; on.length > r; r++) {
                var i = on[r];
                if (!i.el.removed && !i.paused) {
                    var a, s, o = n - i.start,
                        u = i.ms,
                        l = i.easing,
                        h = i.from,
                        c = i.diff,
                        f = i.to,
                        p = (i.t, i.el),
                        d = {}, g = {};
                    if (i.initstatus ? (o = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * u, i.status = i.initstatus, delete i.initstatus, i.stop && on.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (o / u)) / i.anim.top, !(0 > o))
                        if (u > o) {
                            var x = l(o / u);
                            for (var m in h)
                                if (h[B](m)) {
                                    switch (ne[m]) {
                                        case G:
                                            a = +h[m] + x * u * c[m];
                                            break;
                                        case "colour":
                                            a = "rgb(" + [hn(Q(h[m].r + x * u * c[m].r)), hn(Q(h[m].g + x * u * c[m].g)), hn(Q(h[m].b + x * u * c[m].b))].join(",") + ")";
                                            break;
                                        case "path":
                                            a = [];
                                            for (var y = 0, b = h[m].length; b > y; y++) {
                                                a[y] = [h[m][y][0]];
                                                for (var _ = 1, w = h[m][y].length; w > _; _++) a[y][_] = +h[m][y][_] + x * u * c[m][y][_];
                                                a[y] = a[y].join(E)
                                            }
                                            a = a.join(E);
                                            break;
                                        case "transform":
                                            if (c[m].real)
                                                for (a = [], y = 0, b = h[m].length; b > y; y++)
                                                    for (a[y] = [h[m][y][0]], _ = 1, w = h[m][y].length; w > _; _++) a[y][_] = h[m][y][_] + x * u * c[m][y][_];
                                            else {
                                                var k = function(t) {
                                                    return +h[m][t] + x * u * c[m][t]
                                                };
                                                a = [
                                                    ["m", k(0), k(1), k(2), k(3), k(4), k(5)]
                                                ]
                                            }
                                            break;
                                        case "csv":
                                            if ("clip-rect" == m)
                                                for (a = [], y = 4; y--;) a[y] = +h[m][y] + x * u * c[m][y];
                                            break;
                                        default:
                                            var S = [][L](h[m]);
                                            for (a = [], y = p.paper.customAttributes[m].length; y--;) a[y] = +S[y] + x * u * c[m][y]
                                    }
                                    d[m] = a
                                }
                            p.attr(d),
                            function(e, n, r) {
                                setTimeout(function() {
                                    t("raphael.anim.frame." + e, n, r)
                                })
                            }(p.id, p, i.anim)
                        } else {
                            if (function(n, r, i) {
                                setTimeout(function() {
                                    t("raphael.anim.frame." + r.id, r, i), t("raphael.anim.finish." + r.id, r, i), e.is(n, "function") && n.call(r)
                                })
                            }(i.callback, p, i.anim), p.attr(f), on.splice(r--, 1), i.repeat > 1 && !i.next) {
                                for (s in f) f[B](s) && (g[s] = i.totalOrigin[s]);
                                i.el.attr(g), v(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1)
                            }
                            i.next && !i.stop && v(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat)
                        }
                }
            }
            e.svg && p && p.paper && p.paper.safari(), on.length && un(ln)
        }, hn = function(t) {
            return t > 255 ? 255 : 0 > t ? 0 : t
        };
    Ze.animateWith = function(t, n, r, i, a, s) {
        var o = this;
        if (o.removed) return s && s.call(o), o;
        var u = r instanceof x ? r : e.animation(r, i, a, s);
        v(u, o, u.percents[0], null, o.attr());
        for (var l = 0, h = on.length; h > l; l++)
            if (on[l].anim == n && on[l].el == t) {
                on[h - 1].start = on[l].start;
                break
            }
        return o
    }, Ze.onAnimation = function(e) {
        return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this
    }, x.prototype.delay = function(t) {
        var e = new x(this.anim, this.ms);
        return e.times = this.times, e.del = +t || 0, e
    }, x.prototype.repeat = function(t) {
        var e = new x(this.anim, this.ms);
        return e.del = this.del, e.times = D.floor(z(t, 0)) || 1, e
    }, e.animation = function(t, n, r, i) {
        if (t instanceof x) return t;
        (e.is(r, "function") || !r) && (i = i || r || null, r = null), t = Object(t), n = +n || 0;
        var a, s, o = {};
        for (s in t) t[B](s) && J(s) != s && J(s) + "%" != s && (a = !0, o[s] = t[s]);
        return a ? (r && (o.easing = r), i && (o.callback = i), new x({
            100: o
        }, n)) : new x(t, n)
    }, Ze.animate = function(t, n, r, i) {
        var a = this;
        if (a.removed) return i && i.call(a), a;
        var s = t instanceof x ? t : e.animation(t, n, r, i);
        return v(s, a, s.percents[0], null, a.attr()), a
    }, Ze.setTime = function(t, e) {
        return t && null != e && this.status(t, O(e, t.ms) / t.ms), this
    }, Ze.status = function(t, e) {
        var n, r, i = [],
            a = 0;
        if (null != e) return v(t, this, -1, O(e, 1)), this;
        for (n = on.length; n > a; a++)
            if (r = on[a], r.el.id == this.id && (!t || r.anim == t)) {
                if (t) return r.status;
                i.push({
                    anim: r.anim,
                    status: r.status
                })
            }
        return t ? 0 : i
    }, Ze.pause = function(e) {
        for (var n = 0; on.length > n; n++) on[n].el.id != this.id || e && on[n].anim != e || t("raphael.anim.pause." + this.id, this, on[n].anim) !== !1 && (on[n].paused = !0);
        return this
    }, Ze.resume = function(e) {
        for (var n = 0; on.length > n; n++)
            if (on[n].el.id == this.id && (!e || on[n].anim == e)) {
                var r = on[n];
                t("raphael.anim.resume." + this.id, this, r.anim) !== !1 && (delete r.paused, this.status(r.anim, r.status))
            }
        return this
    }, Ze.stop = function(e) {
        for (var n = 0; on.length > n; n++) on[n].el.id != this.id || e && on[n].anim != e || t("raphael.anim.stop." + this.id, this, on[n].anim) !== !1 && on.splice(n--, 1);
        return this
    }, t.on("raphael.remove", m), t.on("raphael.clear", m), Ze.toString = function() {
        return "Raphaël’s object"
    };
    var cn = function(t) {
        if (this.items = [], this.length = 0, this.type = "set", t)
            for (var e = 0, n = t.length; n > e; e++)!t[e] || t[e].constructor != Ze.constructor && t[e].constructor != cn || (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
    }, fn = cn.prototype;
    fn.push = function() {
        for (var t, e, n = 0, r = arguments.length; r > n; n++) t = arguments[n], !t || t.constructor != Ze.constructor && t.constructor != cn || (e = this.items.length, this[e] = this.items[e] = t, this.length++);
        return this
    }, fn.pop = function() {
        return this.length && delete this[this.length--], this.items.pop()
    }, fn.forEach = function(t, e) {
        for (var n = 0, r = this.items.length; r > n; n++)
            if (t.call(e, this.items[n], n) === !1) return this;
        return this
    };
    for (var pn in Ze) Ze[B](pn) && (fn[pn] = function(t) {
        return function() {
            var e = arguments;
            return this.forEach(function(n) {
                n[t][T](n, e)
            })
        }
    }(pn));
    return fn.attr = function(t, n) {
        if (t && e.is(t, W) && e.is(t[0], "object"))
            for (var r = 0, i = t.length; i > r; r++) this.items[r].attr(t[r]);
        else
            for (var a = 0, s = this.items.length; s > a; a++) this.items[a].attr(t, n);
        return this
    }, fn.clear = function() {
        for (; this.length;) this.pop()
    }, fn.splice = function(t, e) {
        t = 0 > t ? z(this.length + t, 0) : t, e = z(0, O(this.length - t, e));
        var n, r = [],
            i = [],
            a = [];
        for (n = 2; arguments.length > n; n++) a.push(arguments[n]);
        for (n = 0; e > n; n++) i.push(this[t + n]);
        for (; this.length - t > n; n++) r.push(this[t + n]);
        var s = a.length;
        for (n = 0; s + r.length > n; n++) this.items[t + n] = this[t + n] = s > n ? a[n] : r[n - s];
        for (n = this.items.length = this.length -= e - s; this[n];) delete this[n++];
        return new cn(i)
    }, fn.exclude = function(t) {
        for (var e = 0, n = this.length; n > e; e++)
            if (this[e] == t) return this.splice(e, 1), !0
    }, fn.animate = function(t, n, r, i) {
        (e.is(r, "function") || !r) && (i = r || null);
        var a, s, o = this.items.length,
            u = o,
            l = this;
        if (!o) return this;
        i && (s = function() {
            !--o && i.call(l)
        }), r = e.is(r, N) ? r : s;
        var h = e.animation(t, n, r, s);
        for (a = this.items[--u].animate(h); u--;) this.items[u] && !this.items[u].removed && this.items[u].animateWith(a, h, h);
        return this
    }, fn.insertAfter = function(t) {
        for (var e = this.items.length; e--;) this.items[e].insertAfter(t);
        return this
    }, fn.getBBox = function() {
        for (var t = [], e = [], n = [], r = [], i = this.items.length; i--;)
            if (!this.items[i].removed) {
                var a = this.items[i].getBBox();
                t.push(a.x), e.push(a.y), n.push(a.x + a.width), r.push(a.y + a.height)
            }
        return t = O[T](0, t), e = O[T](0, e), n = z[T](0, n), r = z[T](0, r), {
            x: t,
            y: e,
            x2: n,
            y2: r,
            width: n - t,
            height: r - e
        }
    }, fn.clone = function(t) {
        t = this.paper.set();
        for (var e = 0, n = this.items.length; n > e; e++) t.push(this.items[e].clone());
        return t
    }, fn.toString = function() {
        return "Raphaël‘s set"
    }, fn.glow = function(t) {
        var e = this.paper.set();
        return this.forEach(function(n) {
            var r = n.glow(t);
            null != r && r.forEach(function(t) {
                e.push(t)
            })
        }), e
    }, e.registerFont = function(t) {
        if (!t.face) return t;
        this.fonts = this.fonts || {};
        var e = {
            w: t.w,
            face: {},
            glyphs: {}
        }, n = t.face["font-family"];
        for (var r in t.face) t.face[B](r) && (e.face[r] = t.face[r]);
        if (this.fonts[n] ? this.fonts[n].push(e) : this.fonts[n] = [e], !t.svg) {
            e.face["units-per-em"] = K(t.face["units-per-em"], 10);
            for (var i in t.glyphs)
                if (t.glyphs[B](i)) {
                    var a = t.glyphs[i];
                    if (e.glyphs[i] = {
                        w: a.w,
                        k: {},
                        d: a.d && "M" + a.d.replace(/[mlcxtrv]/g, function(t) {
                            return {
                                l: "L",
                                c: "C",
                                x: "z",
                                t: "m",
                                r: "l",
                                v: "c"
                            }[t] || "M"
                        }) + "z"
                    }, a.k)
                        for (var s in a.k) a[B](s) && (e.glyphs[i].k[s] = a.k[s])
                }
        }
        return t
    }, b.getFont = function(t, n, r, i) {
        if (i = i || "normal", r = r || "normal", n = +n || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[n] || 400, e.fonts) {
            var a = e.fonts[t];
            if (!a) {
                var s = RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, P) + "(\\s|$)", "i");
                for (var o in e.fonts)
                    if (e.fonts[B](o) && s.test(o)) {
                        a = e.fonts[o];
                        break
                    }
            }
            var u;
            if (a)
                for (var l = 0, h = a.length; h > l && (u = a[l], u.face["font-weight"] != n || u.face["font-style"] != r && u.face["font-style"] || u.face["font-stretch"] != i); l++);
            return u
        }
    }, b.print = function(t, n, r, i, a, s, o) {
        s = s || "middle", o = z(O(o || 0, 1), -1);
        var u, l = M(r)[I](P),
            h = 0,
            c = 0,
            f = P;
        if (e.is(i, "string") && (i = this.getFont(i)), i) {
            u = (a || 16) / i.face["units-per-em"];
            for (var p = i.face.bbox[I](_), d = +p[0], g = p[3] - p[1], x = 0, v = +p[1] + ("baseline" == s ? g + +i.face.descent : g / 2), m = 0, y = l.length; y > m; m++) {
                if ("\n" == l[m]) h = 0, w = 0, c = 0, x += g;
                else {
                    var b = c && i.glyphs[l[m - 1]] || {}, w = i.glyphs[l[m]];
                    h += c ? (b.w || i.w) + (b.k && b.k[l[m]] || 0) + i.w * o : 0, c = 1
                }
                w && w.d && (f += e.transformPath(w.d, ["t", h * u, x * u, "s", u, u, d, v, "t", (t - d) / u, (n - v) / u]))
            }
        }
        return this.path(f).attr({
            fill: "#000",
            stroke: "none"
        })
    }, b.add = function(t) {
        if (e.is(t, "array"))
            for (var n, r = this.set(), i = 0, a = t.length; a > i; i++) n = t[i] || {}, w[B](n.type) && r.push(this[n.type]().attr(n));
        return r
    }, e.format = function(t, n) {
        var r = e.is(n, W) ? [0][L](n) : arguments;
        return t && e.is(t, N) && r.length - 1 && (t = t.replace(k, function(t, e) {
            return null == r[++e] ? P : r[e]
        })), t || P
    }, e.fullfill = function() {
        var t = /\{([^\}]+)\}/g,
            e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            n = function(t, n, r) {
                var i = r;
                return n.replace(e, function(t, e, n, r, a) {
                    e = e || r, i && (e in i && (i = i[e]), "function" == typeof i && a && (i = i()))
                }), i = (null == i || i == r ? t : i) + ""
            };
        return function(e, r) {
            return (e + "").replace(t, function(t, e) {
                return n(t, e, r)
            })
        }
    }(), e.ninja = function() {
        return C.was ? S.win.Raphael = C.is : delete Raphael, e
    }, e.st = fn,
    function(t, n, r) {
        function i() {
            /in/.test(t.readyState) ? setTimeout(i, 9) : e.eve("raphael.DOMload")
        }
        null == t.readyState && t.addEventListener && (t.addEventListener(n, r = function() {
            t.removeEventListener(n, r, !1), t.readyState = "complete"
        }, !1), t.readyState = "loading"), i()
    }(document, "DOMContentLoaded"), C.was ? S.win.Raphael = e : Raphael = e, t.on("raphael.DOMload", function() {
        y = !0
    }), e
});
(function(t, e) {
    "function" == typeof define && define.amd ? require(["raphael"], e) : t.Raphael && e(t.Raphael)
})(this, function(t) {
    if (t.svg) {
        var e = "hasOwnProperty",
            r = String,
            n = parseFloat,
            i = parseInt,
            a = Math,
            s = a.max,
            o = a.abs,
            u = a.pow,
            h = /[, ]+/,
            l = t.eve,
            c = "",
            f = " ",
            p = "http://www.w3.org/1999/xlink",
            d = {
                block: "M5,0 0,2.5 5,5z",
                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                open: "M6,1 1,3.5 6,6",
                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
            }, g = {};
        t.toString = function() {
            return "Your browser supports SVG.\nYou are running Raphaël " + this.version
        };
        var x = function(n, i) {
            if (i) {
                "string" == typeof n && (n = x(n));
                for (var a in i) i[e](a) && ("xlink:" == a.substring(0, 6) ? n.setAttributeNS(p, a.substring(6), r(i[a])) : n.setAttribute(a, r(i[a])))
            } else n = t._g.doc.createElementNS("http://www.w3.org/2000/svg", n), n.style && (n.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            return n
        }, v = function(e, i) {
                var h = "linear",
                    l = e.id + i,
                    f = .5,
                    p = .5,
                    d = e.node,
                    g = e.paper,
                    v = d.style,
                    y = t._g.doc.getElementById(l);
                if (!y) {
                    if (i = r(i).replace(t._radial_gradient, function(t, e, r) {
                        if (h = "radial", e && r) {
                            f = n(e), p = n(r);
                            var i = 2 * (p > .5) - 1;
                            u(f - .5, 2) + u(p - .5, 2) > .25 && (p = a.sqrt(.25 - u(f - .5, 2)) * i + .5) && .5 != p && (p = p.toFixed(5) - 1e-5 * i)
                        }
                        return c
                    }), i = i.split(/\s*\-\s*/), "linear" == h) {
                        var m = i.shift();
                        if (m = -n(m), isNaN(m)) return null;
                        var b = [0, 0, a.cos(t.rad(m)), a.sin(t.rad(m))],
                            _ = 1 / (s(o(b[2]), o(b[3])) || 1);
                        b[2] *= _, b[3] *= _, 0 > b[2] && (b[0] = -b[2], b[2] = 0), 0 > b[3] && (b[1] = -b[3], b[3] = 0)
                    }
                    var w = t._parseDots(i);
                    if (!w) return null;
                    if (l = l.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && l != e.gradient.id && (g.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                        y = x(h + "Gradient", {
                            id: l
                        }), e.gradient = y, x(y, "radial" == h ? {
                            fx: f,
                            fy: p
                        } : {
                            x1: b[0],
                            y1: b[1],
                            x2: b[2],
                            y2: b[3],
                            gradientTransform: e.matrix.invert()
                        }), g.defs.appendChild(y);
                        for (var k = 0, C = w.length; C > k; k++) y.appendChild(x("stop", {
                            offset: w[k].offset ? w[k].offset : k ? "100%" : "0%",
                            "stop-color": w[k].color || "#fff"
                        }))
                    }
                }
                return x(d, {
                    fill: "url(#" + l + ")",
                    opacity: 1,
                    "fill-opacity": 1
                }), v.fill = c, v.opacity = 1, v.fillOpacity = 1, 1
            }, y = function(t) {
                var e = t.getBBox(1);
                x(t.pattern, {
                    patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"
                })
            }, m = function(n, i, a) {
                if ("path" == n.type) {
                    for (var s, o, u, h, l, f = r(i).toLowerCase().split("-"), p = n.paper, v = a ? "end" : "start", y = n.node, m = n.attrs, b = m["stroke-width"], _ = f.length, w = "classic", k = 3, C = 3, B = 5; _--;) switch (f[_]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            w = f[_];
                            break;
                        case "wide":
                            C = 5;
                            break;
                        case "narrow":
                            C = 2;
                            break;
                        case "long":
                            k = 5;
                            break;
                        case "short":
                            k = 2
                    }
                    if ("open" == w ? (k += 2, C += 2, B += 2, u = 1, h = a ? 4 : 1, l = {
                        fill: "none",
                        stroke: m.stroke
                    }) : (h = u = k / 2, l = {
                        fill: m.stroke,
                        stroke: "none"
                    }), n._.arrows ? a ? (n._.arrows.endPath && g[n._.arrows.endPath]--, n._.arrows.endMarker && g[n._.arrows.endMarker]--) : (n._.arrows.startPath && g[n._.arrows.startPath]--, n._.arrows.startMarker && g[n._.arrows.startMarker]--) : n._.arrows = {}, "none" != w) {
                        var S = "raphael-marker-" + w,
                            A = "raphael-marker-" + v + w + k + C;
                        t._g.doc.getElementById(S) ? g[S]++ : (p.defs.appendChild(x(x("path"), {
                            "stroke-linecap": "round",
                            d: d[w],
                            id: S
                        })), g[S] = 1);
                        var T, M = t._g.doc.getElementById(A);
                        M ? (g[A]++, T = M.getElementsByTagName("use")[0]) : (M = x(x("marker"), {
                            id: A,
                            markerHeight: C,
                            markerWidth: k,
                            orient: "auto",
                            refX: h,
                            refY: C / 2
                        }), T = x(x("use"), {
                            "xlink:href": "#" + S,
                            transform: (a ? "rotate(180 " + k / 2 + " " + C / 2 + ") " : c) + "scale(" + k / B + "," + C / B + ")",
                            "stroke-width": (1 / ((k / B + C / B) / 2)).toFixed(4)
                        }), M.appendChild(T), p.defs.appendChild(M), g[A] = 1), x(T, l);
                        var F = u * ("diamond" != w && "oval" != w);
                        a ? (s = n._.arrows.startdx * b || 0, o = t.getTotalLength(m.path) - F * b) : (s = F * b, o = t.getTotalLength(m.path) - (n._.arrows.enddx * b || 0)), l = {}, l["marker-" + v] = "url(#" + A + ")", (o || s) && (l.d = Raphael.getSubpath(m.path, s, o)), x(y, l), n._.arrows[v + "Path"] = S, n._.arrows[v + "Marker"] = A, n._.arrows[v + "dx"] = F, n._.arrows[v + "Type"] = w, n._.arrows[v + "String"] = i
                    } else a ? (s = n._.arrows.startdx * b || 0, o = t.getTotalLength(m.path) - s) : (s = 0, o = t.getTotalLength(m.path) - (n._.arrows.enddx * b || 0)), n._.arrows[v + "Path"] && x(y, {
                        d: Raphael.getSubpath(m.path, s, o)
                    }), delete n._.arrows[v + "Path"], delete n._.arrows[v + "Marker"], delete n._.arrows[v + "dx"], delete n._.arrows[v + "Type"], delete n._.arrows[v + "String"];
                    for (l in g)
                        if (g[e](l) && !g[l]) {
                            var L = t._g.doc.getElementById(l);
                            L && L.parentNode.removeChild(L)
                        }
                }
            }, b = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            }, _ = function(t, e, n) {
                if (e = b[r(e).toLowerCase()]) {
                    for (var i = t.attrs["stroke-width"] || "1", a = {
                            round: i,
                            square: i,
                            butt: 0
                        }[t.attrs["stroke-linecap"] || n["stroke-linecap"]] || 0, s = [], o = e.length; o--;) s[o] = e[o] * i + (o % 2 ? 1 : -1) * a;
                    x(t.node, {
                        "stroke-dasharray": s.join(",")
                    })
                }
            }, w = function(n, a) {
                var u = n.node,
                    l = n.attrs,
                    f = u.style.visibility;
                u.style.visibility = "hidden";
                for (var d in a)
                    if (a[e](d)) {
                        if (!t._availableAttrs[e](d)) continue;
                        var g = a[d];
                        switch (l[d] = g, d) {
                            case "blur":
                                n.blur(g);
                                break;
                            case "href":
                            case "title":
                            case "target":
                                var b = u.parentNode;
                                if ("a" != b.tagName.toLowerCase()) {
                                    var w = x("a");
                                    b.insertBefore(w, u), w.appendChild(u), b = w
                                }
                                "target" == d ? b.setAttributeNS(p, "show", "blank" == g ? "new" : g) : b.setAttributeNS(p, d, g);
                                break;
                            case "cursor":
                                u.style.cursor = g;
                                break;
                            case "transform":
                                n.transform(g);
                                break;
                            case "arrow-start":
                                m(n, g);
                                break;
                            case "arrow-end":
                                m(n, g, 1);
                                break;
                            case "clip-rect":
                                var k = r(g).split(h);
                                if (4 == k.length) {
                                    n.clip && n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);
                                    var B = x("clipPath"),
                                        S = x("rect");
                                    B.id = t.createUUID(), x(S, {
                                        x: k[0],
                                        y: k[1],
                                        width: k[2],
                                        height: k[3]
                                    }), B.appendChild(S), n.paper.defs.appendChild(B), x(u, {
                                        "clip-path": "url(#" + B.id + ")"
                                    }), n.clip = S
                                }
                                if (!g) {
                                    var A = u.getAttribute("clip-path");
                                    if (A) {
                                        var T = t._g.doc.getElementById(A.replace(/(^url\(#|\)$)/g, c));
                                        T && T.parentNode.removeChild(T), x(u, {
                                            "clip-path": c
                                        }), delete n.clip
                                    }
                                }
                                break;
                            case "path":
                                "path" == n.type && (x(u, {
                                    d: g ? l.path = t._pathToAbsolute(g) : "M0,0"
                                }), n._.dirty = 1, n._.arrows && ("startString" in n._.arrows && m(n, n._.arrows.startString), "endString" in n._.arrows && m(n, n._.arrows.endString, 1)));
                                break;
                            case "width":
                                if (u.setAttribute(d, g), n._.dirty = 1, !l.fx) break;
                                d = "x", g = l.x;
                            case "x":
                                l.fx && (g = -l.x - (l.width || 0));
                            case "rx":
                                if ("rx" == d && "rect" == n.type) break;
                            case "cx":
                                u.setAttribute(d, g), n.pattern && y(n), n._.dirty = 1;
                                break;
                            case "height":
                                if (u.setAttribute(d, g), n._.dirty = 1, !l.fy) break;
                                d = "y", g = l.y;
                            case "y":
                                l.fy && (g = -l.y - (l.height || 0));
                            case "ry":
                                if ("ry" == d && "rect" == n.type) break;
                            case "cy":
                                u.setAttribute(d, g), n.pattern && y(n), n._.dirty = 1;
                                break;
                            case "r":
                                "rect" == n.type ? x(u, {
                                    rx: g,
                                    ry: g
                                }) : u.setAttribute(d, g), n._.dirty = 1;
                                break;
                            case "src":
                                "image" == n.type && u.setAttributeNS(p, "href", g);
                                break;
                            case "stroke-width":
                                (1 != n._.sx || 1 != n._.sy) && (g /= s(o(n._.sx), o(n._.sy)) || 1), n.paper._vbSize && (g *= n.paper._vbSize), u.setAttribute(d, g), l["stroke-dasharray"] && _(n, l["stroke-dasharray"], a), n._.arrows && ("startString" in n._.arrows && m(n, n._.arrows.startString), "endString" in n._.arrows && m(n, n._.arrows.endString, 1));
                                break;
                            case "stroke-dasharray":
                                _(n, g, a);
                                break;
                            case "fill":
                                var M = r(g).match(t._ISURL);
                                if (M) {
                                    B = x("pattern");
                                    var F = x("image");
                                    B.id = t.createUUID(), x(B, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    }), x(F, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": M[1]
                                    }), B.appendChild(F),
                                    function(e) {
                                        t._preload(M[1], function() {
                                            var t = this.offsetWidth,
                                                r = this.offsetHeight;
                                            x(e, {
                                                width: t,
                                                height: r
                                            }), x(F, {
                                                width: t,
                                                height: r
                                            }), n.paper.safari()
                                        })
                                    }(B), n.paper.defs.appendChild(B), x(u, {
                                        fill: "url(#" + B.id + ")"
                                    }), n.pattern = B, n.pattern && y(n);
                                    break
                                }
                                var L = t.getRGB(g);
                                if (L.error) {
                                    if (("circle" == n.type || "ellipse" == n.type || "r" != r(g).charAt()) && v(n, g)) {
                                        if ("opacity" in l || "fill-opacity" in l) {
                                            var N = t._g.doc.getElementById(u.getAttribute("fill").replace(/^url\(#|\)$/g, c));
                                            if (N) {
                                                var P = N.getElementsByTagName("stop");
                                                x(P[P.length - 1], {
                                                    "stop-opacity": ("opacity" in l ? l.opacity : 1) * ("fill-opacity" in l ? l["fill-opacity"] : 1)
                                                })
                                            }
                                        }
                                        l.gradient = g, l.fill = "none";
                                        break
                                    }
                                } else delete a.gradient, delete l.gradient, !t.is(l.opacity, "undefined") && t.is(a.opacity, "undefined") && x(u, {
                                    opacity: l.opacity
                                }), !t.is(l["fill-opacity"], "undefined") && t.is(a["fill-opacity"], "undefined") && x(u, {
                                    "fill-opacity": l["fill-opacity"]
                                });
                                L[e]("opacity") && x(u, {
                                    "fill-opacity": L.opacity > 1 ? L.opacity / 100 : L.opacity
                                });
                            case "stroke":
                                L = t.getRGB(g), u.setAttribute(d, L.hex), "stroke" == d && L[e]("opacity") && x(u, {
                                    "stroke-opacity": L.opacity > 1 ? L.opacity / 100 : L.opacity
                                }), "stroke" == d && n._.arrows && ("startString" in n._.arrows && m(n, n._.arrows.startString), "endString" in n._.arrows && m(n, n._.arrows.endString, 1));
                                break;
                            case "gradient":
                                ("circle" == n.type || "ellipse" == n.type || "r" != r(g).charAt()) && v(n, g);
                                break;
                            case "opacity":
                                l.gradient && !l[e]("stroke-opacity") && x(u, {
                                    "stroke-opacity": g > 1 ? g / 100 : g
                                });
                            case "fill-opacity":
                                if (l.gradient) {
                                    N = t._g.doc.getElementById(u.getAttribute("fill").replace(/^url\(#|\)$/g, c)), N && (P = N.getElementsByTagName("stop"), x(P[P.length - 1], {
                                        "stop-opacity": g
                                    }));
                                    break
                                }
                            default:
                                "font-size" == d && (g = i(g, 10) + "px");
                                var E = d.replace(/(\-.)/g, function(t) {
                                    return t.substring(1).toUpperCase()
                                });
                                u.style[E] = g, n._.dirty = 1, u.setAttribute(d, g)
                        }
                    }
                C(n, a), u.style.visibility = f
            }, k = 1.2,
            C = function(n, a) {
                if ("text" == n.type && (a[e]("text") || a[e]("font") || a[e]("font-size") || a[e]("x") || a[e]("y"))) {
                    var s = n.attrs,
                        o = n.node,
                        u = o.firstChild ? i(t._g.doc.defaultView.getComputedStyle(o.firstChild, c).getPropertyValue("font-size"), 10) : 10;
                    if (a[e]("text")) {
                        for (s.text = a.text; o.firstChild;) o.removeChild(o.firstChild);
                        for (var h, l = r(a.text).split("\n"), f = [], p = 0, d = l.length; d > p; p++) h = x("tspan"), p && x(h, {
                            dy: u * k,
                            x: s.x
                        }), h.appendChild(t._g.doc.createTextNode(l[p])), o.appendChild(h), f[p] = h
                    } else
                        for (f = o.getElementsByTagName("tspan"), p = 0, d = f.length; d > p; p++) p ? x(f[p], {
                            dy: u * k,
                            x: s.x
                        }) : x(f[0], {
                            dy: 0
                        });
                    x(o, {
                        x: s.x,
                        y: s.y
                    }), n._.dirty = 1;
                    var g = n._getBBox(),
                        v = s.y - (g.y + g.height / 2);
                    v && t.is(v, "finite") && x(f[0], {
                        dy: v
                    })
                }
            }, B = function(e, r) {
                this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.matrix = t.matrix(), this.realPath = null, this.paper = r, this.attrs = this.attrs || {}, this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    deg: 0,
                    dx: 0,
                    dy: 0,
                    dirty: 1
                }, !r.bottom && (r.bottom = this), this.prev = r.top, r.top && (r.top.next = this), r.top = this, this.next = null
            }, S = t.el;
        B.prototype = S, S.constructor = B, t._engine.path = function(t, e) {
            var r = x("path");
            e.canvas && e.canvas.appendChild(r);
            var n = new B(r, e);
            return n.type = "path", w(n, {
                fill: "none",
                stroke: "#000",
                path: t
            }), n
        }, S.rotate = function(t, e, i) {
            if (this.removed) return this;
            if (t = r(t).split(h), t.length - 1 && (e = n(t[1]), i = n(t[2])), t = n(t[0]), null == i && (e = i), null == e || null == i) {
                var a = this.getBBox(1);
                e = a.x + a.width / 2, i = a.y + a.height / 2
            }
            return this.transform(this._.transform.concat([
                ["r", t, e, i]
            ])), this
        }, S.scale = function(t, e, i, a) {
            if (this.removed) return this;
            if (t = r(t).split(h), t.length - 1 && (e = n(t[1]), i = n(t[2]), a = n(t[3])), t = n(t[0]), null == e && (e = t), null == a && (i = a), null == i || null == a) var s = this.getBBox(1);
            return i = null == i ? s.x + s.width / 2 : i, a = null == a ? s.y + s.height / 2 : a, this.transform(this._.transform.concat([
                ["s", t, e, i, a]
            ])), this
        }, S.translate = function(t, e) {
            return this.removed ? this : (t = r(t).split(h), t.length - 1 && (e = n(t[1])), t = n(t[0]) || 0, e = +e || 0, this.transform(this._.transform.concat([
                ["t", t, e]
            ])), this)
        }, S.transform = function(r) {
            var n = this._;
            if (null == r) return n.transform;
            if (t._extractTransform(this, r), this.clip && x(this.clip, {
                transform: this.matrix.invert()
            }), this.pattern && y(this), this.node && x(this.node, {
                transform: this.matrix
            }), 1 != n.sx || 1 != n.sy) {
                var i = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                this.attr({
                    "stroke-width": i
                })
            }
            return this
        }, S.hide = function() {
            return !this.removed && this.paper.safari(this.node.style.display = "none"), this
        }, S.show = function() {
            return !this.removed && this.paper.safari(this.node.style.display = ""), this
        }, S.remove = function() {
            if (!this.removed && this.node.parentNode) {
                var e = this.paper;
                e.__set__ && e.__set__.exclude(this), l.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), t._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                for (var r in this) this[r] = "function" == typeof this[r] ? t._removedFactory(r) : null;
                this.removed = !0
            }
        }, S._getBBox = function() {
            if ("none" == this.node.style.display) {
                this.show();
                var t = !0
            }
            var e = {};
            try {
                e = this.node.getBBox()
            } catch (r) {} finally {
                e = e || {}
            }
            return t && this.hide(), e
        }, S.attr = function(r, n) {
            if (this.removed) return this;
            if (null == r) {
                var i = {};
                for (var a in this.attrs) this.attrs[e](a) && (i[a] = this.attrs[a]);
                return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
            }
            if (null == n && t.is(r, "string")) {
                if ("fill" == r && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                if ("transform" == r) return this._.transform;
                for (var s = r.split(h), o = {}, u = 0, c = s.length; c > u; u++) r = s[u], o[r] = r in this.attrs ? this.attrs[r] : t.is(this.paper.customAttributes[r], "function") ? this.paper.customAttributes[r].def : t._availableAttrs[r];
                return c - 1 ? o : o[s[0]]
            }
            if (null == n && t.is(r, "array")) {
                for (o = {}, u = 0, c = r.length; c > u; u++) o[r[u]] = this.attr(r[u]);
                return o
            }
            if (null != n) {
                var f = {};
                f[r] = n
            } else null != r && t.is(r, "object") && (f = r);
            for (var p in f) l("raphael.attr." + p + "." + this.id, this, f[p]);
            for (p in this.paper.customAttributes)
                if (this.paper.customAttributes[e](p) && f[e](p) && t.is(this.paper.customAttributes[p], "function")) {
                    var d = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
                    this.attrs[p] = f[p];
                    for (var g in d) d[e](g) && (f[g] = d[g])
                }
            return w(this, f), this
        }, S.toFront = function() {
            if (this.removed) return this;
            "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
            var e = this.paper;
            return e.top != this && t._tofront(this, e), this
        }, S.toBack = function() {
            if (this.removed) return this;
            var e = this.node.parentNode;
            return "a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper), this.paper, this
        }, S.insertAfter = function(e) {
            if (this.removed) return this;
            var r = e.node || e[e.length - 1].node;
            return r.nextSibling ? r.parentNode.insertBefore(this.node, r.nextSibling) : r.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this
        }, S.insertBefore = function(e) {
            if (this.removed) return this;
            var r = e.node || e[0].node;
            return r.parentNode.insertBefore(this.node, r), t._insertbefore(this, e, this.paper), this
        }, S.blur = function(e) {
            var r = this;
            if (0 !== +e) {
                var n = x("filter"),
                    i = x("feGaussianBlur");
                r.attrs.blur = e, n.id = t.createUUID(), x(i, {
                    stdDeviation: +e || 1.5
                }), n.appendChild(i), r.paper.defs.appendChild(n), r._blur = n, x(r.node, {
                    filter: "url(#" + n.id + ")"
                })
            } else r._blur && (r._blur.parentNode.removeChild(r._blur), delete r._blur, delete r.attrs.blur), r.node.removeAttribute("filter")
        }, t._engine.circle = function(t, e, r, n) {
            var i = x("circle");
            t.canvas && t.canvas.appendChild(i);
            var a = new B(i, t);
            return a.attrs = {
                cx: e,
                cy: r,
                r: n,
                fill: "none",
                stroke: "#000"
            }, a.type = "circle", x(i, a.attrs), a
        }, t._engine.rect = function(t, e, r, n, i, a) {
            var s = x("rect");
            t.canvas && t.canvas.appendChild(s);
            var o = new B(s, t);
            return o.attrs = {
                x: e,
                y: r,
                width: n,
                height: i,
                r: a || 0,
                rx: a || 0,
                ry: a || 0,
                fill: "none",
                stroke: "#000"
            }, o.type = "rect", x(s, o.attrs), o
        }, t._engine.ellipse = function(t, e, r, n, i) {
            var a = x("ellipse");
            t.canvas && t.canvas.appendChild(a);
            var s = new B(a, t);
            return s.attrs = {
                cx: e,
                cy: r,
                rx: n,
                ry: i,
                fill: "none",
                stroke: "#000"
            }, s.type = "ellipse", x(a, s.attrs), s
        }, t._engine.image = function(t, e, r, n, i, a) {
            var s = x("image");
            x(s, {
                x: r,
                y: n,
                width: i,
                height: a,
                preserveAspectRatio: "none"
            }), s.setAttributeNS(p, "href", e), t.canvas && t.canvas.appendChild(s);
            var o = new B(s, t);
            return o.attrs = {
                x: r,
                y: n,
                width: i,
                height: a,
                src: e
            }, o.type = "image", o
        }, t._engine.text = function(e, r, n, i) {
            var a = x("text");
            e.canvas && e.canvas.appendChild(a);
            var s = new B(a, e);
            return s.attrs = {
                x: r,
                y: n,
                "text-anchor": "middle",
                text: i,
                font: t._availableAttrs.font,
                stroke: "none",
                fill: "#000"
            }, s.type = "text", w(s, s.attrs), s
        }, t._engine.setSize = function(t, e) {
            return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
        }, t._engine.create = function() {
            var e = t._getContainer.apply(0, arguments),
                r = e && e.container,
                n = e.x,
                i = e.y,
                a = e.width,
                s = e.height;
            if (!r) throw Error("SVG container not found.");
            var o, u = x("svg"),
                h = "overflow:hidden;";
            return n = n || 0, i = i || 0, a = a || 512, s = s || 342, x(u, {
                height: s,
                version: 1.1,
                width: a,
                xmlns: "http://www.w3.org/2000/svg"
            }), 1 == r ? (u.style.cssText = h + "position:absolute;left:" + n + "px;top:" + i + "px", t._g.doc.body.appendChild(u), o = 1) : (u.style.cssText = h + "position:relative", r.firstChild ? r.insertBefore(u, r.firstChild) : r.appendChild(u)), r = new t._Paper, r.width = a, r.height = s, r.canvas = u, r.clear(), r._left = r._top = 0, o && (r.renderfix = function() {}), r.renderfix(), r
        }, t._engine.setViewBox = function(t, e, r, n, i) {
            l("raphael.setViewBox", this, this._viewBox, [t, e, r, n, i]);
            var a, o, u = s(r / this.width, n / this.height),
                h = this.top,
                c = i ? "meet" : "xMinYMin";
            for (null == t ? (this._vbSize && (u = 1), delete this._vbSize, a = "0 0 " + this.width + f + this.height) : (this._vbSize = u, a = t + f + e + f + r + f + n), x(this.canvas, {
                viewBox: a,
                preserveAspectRatio: c
            }); u && h;) o = "stroke-width" in h.attrs ? h.attrs["stroke-width"] : 1, h.attr({
                "stroke-width": o
            }), h._.dirty = 1, h._.dirtyT = 1, h = h.prev;
            return this._viewBox = [t, e, r, n, !! i], this
        }, t.prototype.renderfix = function() {
            var t, e = this.canvas,
                r = e.style;
            try {
                t = e.getScreenCTM() || e.createSVGMatrix()
            } catch (n) {
                t = e.createSVGMatrix()
            }
            var i = -t.e % 1,
                a = -t.f % 1;
            (i || a) && (i && (this._left = (this._left + i) % 1, r.left = this._left + "px"), a && (this._top = (this._top + a) % 1, r.top = this._top + "px"))
        }, t.prototype.clear = function() {
            t.eve("raphael.clear", this);
            for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);
            this.bottom = this.top = null, (this.desc = x("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël " + t.version)), e.appendChild(this.desc), e.appendChild(this.defs = x("defs"))
        }, t.prototype.remove = function() {
            l("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null
        };
        var A = t.st;
        for (var T in S) S[e](T) && !A[e](T) && (A[T] = function(t) {
            return function() {
                var e = arguments;
                return this.forEach(function(r) {
                    r[t].apply(r, e)
                })
            }
        }(T))
    }
});
(function(t, e) {
    "function" == typeof define && define.amd ? require(["raphael"], e) : t.Raphael && e(t.Raphael)
})(this, function(t) {
    if (t.vml) {
        var e = "hasOwnProperty",
            r = String,
            i = parseFloat,
            n = Math,
            a = n.round,
            s = n.max,
            o = n.min,
            l = n.abs,
            h = "fill",
            u = /[, ]+/,
            c = t.eve,
            f = " progid:DXImageTransform.Microsoft",
            p = " ",
            d = "",
            g = {
                M: "m",
                L: "l",
                C: "c",
                Z: "x",
                m: "t",
                l: "r",
                c: "v",
                z: "x"
            }, x = /([clmz]),?([^clmz]*)/gi,
            v = / progid:\S+Blur\([^\)]+\)/g,
            y = /-?[^,\s-]+/g,
            m = "position:absolute;left:0;top:0;width:1px;height:1px",
            b = 21600,
            _ = {
                path: 1,
                rect: 1,
                image: 1
            }, w = {
                circle: 1,
                ellipse: 1
            }, k = function(e) {
                var i = /[ahqstv]/gi,
                    n = t._pathToAbsolute;
                if (r(e).match(i) && (n = t._path2curve), i = /[clmz]/g, n == t._pathToAbsolute && !r(e).match(i)) {
                    var s = r(e).replace(x, function(t, e, r) {
                        var i = [],
                            n = "m" == e.toLowerCase(),
                            s = g[e];
                        return r.replace(y, function(t) {
                            n && 2 == i.length && (s += i + g["m" == e ? "l" : "L"], i = []), i.push(a(t * b))
                        }), s + i
                    });
                    return s
                }
                var o, l, h = n(e);
                s = [];
                for (var u = 0, c = h.length; c > u; u++) {
                    o = h[u], l = h[u][0].toLowerCase(), "z" == l && (l = "x");
                    for (var f = 1, v = o.length; v > f; f++) l += a(o[f] * b) + (f != v - 1 ? "," : d);
                    s.push(l)
                }
                return s.join(p)
            }, C = function(e, r, i) {
                var n = t.matrix();
                return n.rotate(-e, .5, .5), {
                    dx: n.x(r, i),
                    dy: n.y(r, i)
                }
            }, B = function(t, e, r, i, n, a) {
                var s = t._,
                    o = t.matrix,
                    u = s.fillpos,
                    c = t.node,
                    f = c.style,
                    d = 1,
                    g = "",
                    x = b / e,
                    v = b / r;
                if (f.visibility = "hidden", e && r) {
                    if (c.coordsize = l(x) + p + l(v), f.rotation = a * (0 > e * r ? -1 : 1), a) {
                        var y = C(a, i, n);
                        i = y.dx, n = y.dy
                    }
                    if (0 > e && (g += "x"), 0 > r && (g += " y") && (d = -1), f.flip = g, c.coordorigin = i * -x + p + n * -v, u || s.fillsize) {
                        var m = c.getElementsByTagName(h);
                        m = m && m[0], c.removeChild(m), u && (y = C(a, o.x(u[0], u[1]), o.y(u[0], u[1])), m.position = y.dx * d + p + y.dy * d), s.fillsize && (m.size = s.fillsize[0] * l(e) + p + s.fillsize[1] * l(r)), c.appendChild(m)
                    }
                    f.visibility = "visible"
                }
            };
        t.toString = function() {
            return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
        };
        var S = function(t, e, i) {
            for (var n = r(e).toLowerCase().split("-"), a = i ? "end" : "start", s = n.length, o = "classic", l = "medium", h = "medium"; s--;) switch (n[s]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    o = n[s];
                    break;
                case "wide":
                case "narrow":
                    h = n[s];
                    break;
                case "long":
                case "short":
                    l = n[s]
            }
            var u = t.node.getElementsByTagName("stroke")[0];
            u[a + "arrow"] = o, u[a + "arrowlength"] = l, u[a + "arrowwidth"] = h
        }, A = function(n, l) {
                n.attrs = n.attrs || {};
                var c = n.node,
                    f = n.attrs,
                    g = c.style,
                    x = _[n.type] && (l.x != f.x || l.y != f.y || l.width != f.width || l.height != f.height || l.cx != f.cx || l.cy != f.cy || l.rx != f.rx || l.ry != f.ry || l.r != f.r),
                    v = w[n.type] && (f.cx != l.cx || f.cy != l.cy || f.r != l.r || f.rx != l.rx || f.ry != l.ry),
                    y = n;
                for (var m in l) l[e](m) && (f[m] = l[m]);
                if (x && (f.path = t._getPath[n.type](n), n._.dirty = 1), l.href && (c.href = l.href), l.title && (c.title = l.title), l.target && (c.target = l.target), l.cursor && (g.cursor = l.cursor), "blur" in l && n.blur(l.blur), (l.path && "path" == n.type || x) && (c.path = k(~r(f.path).toLowerCase().indexOf("r") ? t._pathToAbsolute(f.path) : f.path), "image" == n.type && (n._.fillpos = [f.x, f.y], n._.fillsize = [f.width, f.height], B(n, 1, 1, 0, 0, 0))), "transform" in l && n.transform(l.transform), v) {
                    var C = +f.cx,
                        A = +f.cy,
                        N = +f.rx || +f.r || 0,
                        E = +f.ry || +f.r || 0;
                    c.path = t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a((C - N) * b), a((A - E) * b), a((C + N) * b), a((A + E) * b), a(C * b))
                }
                if ("clip-rect" in l) {
                    var M = r(l["clip-rect"]).split(u);
                    if (4 == M.length) {
                        M[2] = +M[2] + +M[0], M[3] = +M[3] + +M[1];
                        var z = c.clipRect || t._g.doc.createElement("div"),
                            F = z.style;
                        F.clip = t.format("rect({1}px {2}px {3}px {0}px)", M), c.clipRect || (F.position = "absolute", F.top = 0, F.left = 0, F.width = n.paper.width + "px", F.height = n.paper.height + "px", c.parentNode.insertBefore(z, c), z.appendChild(c), c.clipRect = z)
                    }
                    l["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
                }
                if (n.textpath) {
                    var R = n.textpath.style;
                    l.font && (R.font = l.font), l["font-family"] && (R.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), l["font-size"] && (R.fontSize = l["font-size"]), l["font-weight"] && (R.fontWeight = l["font-weight"]), l["font-style"] && (R.fontStyle = l["font-style"])
                }
                if ("arrow-start" in l && S(y, l["arrow-start"]), "arrow-end" in l && S(y, l["arrow-end"], 1), null != l.opacity || null != l["stroke-width"] || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
                    var P = c.getElementsByTagName(h),
                        I = !1;
                    if (P = P && P[0], !P && (I = P = L(h)), "image" == n.type && l.src && (P.src = l.src), l.fill && (P.on = !0), (null == P.on || "none" == l.fill || null === l.fill) && (P.on = !1), P.on && l.fill) {
                        var j = r(l.fill).match(t._ISURL);
                        if (j) {
                            P.parentNode == c && c.removeChild(P), P.rotate = !0, P.src = j[1], P.type = "tile";
                            var q = n.getBBox(1);
                            P.position = q.x + p + q.y, n._.fillpos = [q.x, q.y], t._preload(j[1], function() {
                                n._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else P.color = t.getRGB(l.fill).hex, P.src = d, P.type = "solid", t.getRGB(l.fill).error && (y.type in {
                            circle: 1,
                            ellipse: 1
                        } || "r" != r(l.fill).charAt()) && T(y, l.fill, P) && (f.fill = "none", f.gradient = l.fill, P.rotate = !1)
                    }
                    if ("fill-opacity" in l || "opacity" in l) {
                        var D = ((+f["fill-opacity"] + 1 || 2) - 1) * ((+f.opacity + 1 || 2) - 1) * ((+t.getRGB(l.fill).o + 1 || 2) - 1);
                        D = o(s(D, 0), 1), P.opacity = D, P.src && (P.color = "none")
                    }
                    c.appendChild(P);
                    var O = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0],
                        V = !1;
                    !O && (V = O = L("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (O.on = !0), ("none" == l.stroke || null === l.stroke || null == O.on || 0 == l.stroke || 0 == l["stroke-width"]) && (O.on = !1);
                    var Y = t.getRGB(l.stroke);
                    O.on && l.stroke && (O.color = Y.hex), D = ((+f["stroke-opacity"] + 1 || 2) - 1) * ((+f.opacity + 1 || 2) - 1) * ((+Y.o + 1 || 2) - 1);
                    var G = .75 * (i(l["stroke-width"]) || 1);
                    if (D = o(s(D, 0), 1), null == l["stroke-width"] && (G = f["stroke-width"]), l["stroke-width"] && (O.weight = G), G && 1 > G && (D *= G) && (O.weight = 1), O.opacity = D, l["stroke-linejoin"] && (O.joinstyle = l["stroke-linejoin"] || "miter"), O.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (O.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), l["stroke-dasharray"]) {
                        var W = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        };
                        O.dashstyle = W[e](l["stroke-dasharray"]) ? W[l["stroke-dasharray"]] : d
                    }
                    V && c.appendChild(O)
                }
                if ("text" == y.type) {
                    y.paper.canvas.style.display = d;
                    var X = y.paper.span,
                        H = 100,
                        U = f.font && f.font.match(/\d+(?:\.\d*)?(?=px)/);
                    g = X.style, f.font && (g.font = f.font), f["font-family"] && (g.fontFamily = f["font-family"]), f["font-weight"] && (g.fontWeight = f["font-weight"]), f["font-style"] && (g.fontStyle = f["font-style"]), U = i(f["font-size"] || U && U[0]) || 10, g.fontSize = U * H + "px", y.textpath.string && (X.innerHTML = r(y.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var $ = X.getBoundingClientRect();
                    y.W = f.w = ($.right - $.left) / H, y.H = f.h = ($.bottom - $.top) / H, y.X = f.x, y.Y = f.y + y.H / 2, ("x" in l || "y" in l) && (y.path.v = t.format("m{0},{1}l{2},{1}", a(f.x * b), a(f.y * b), a(f.x * b) + 1));
                    for (var Z = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Q = 0, J = Z.length; J > Q; Q++)
                        if (Z[Q] in l) {
                            y._.dirty = 1;
                            break
                        }
                    switch (f["text-anchor"]) {
                        case "start":
                            y.textpath.style["v-text-align"] = "left", y.bbx = y.W / 2;
                            break;
                        case "end":
                            y.textpath.style["v-text-align"] = "right", y.bbx = -y.W / 2;
                            break;
                        default:
                            y.textpath.style["v-text-align"] = "center", y.bbx = 0
                    }
                    y.textpath.style["v-text-kern"] = !0
                }
            }, T = function(e, a, s) {
                e.attrs = e.attrs || {};
                var o = (e.attrs, Math.pow),
                    l = "linear",
                    h = ".5 .5";
                if (e.attrs.gradient = a, a = r(a).replace(t._radial_gradient, function(t, e, r) {
                    return l = "radial", e && r && (e = i(e), r = i(r), o(e - .5, 2) + o(r - .5, 2) > .25 && (r = n.sqrt(.25 - o(e - .5, 2)) * (2 * (r > .5) - 1) + .5), h = e + p + r), d
                }), a = a.split(/\s*\-\s*/), "linear" == l) {
                    var u = a.shift();
                    if (u = -i(u), isNaN(u)) return null
                }
                var c = t._parseDots(a);
                if (!c) return null;
                if (e = e.shape || e.node, c.length) {
                    e.removeChild(s), s.on = !0, s.method = "none", s.color = c[0].color, s.color2 = c[c.length - 1].color;
                    for (var f = [], g = 0, x = c.length; x > g; g++) c[g].offset && f.push(c[g].offset + p + c[g].color);
                    s.colors = f.length ? f.join() : "0% " + s.color, "radial" == l ? (s.type = "gradientTitle", s.focus = "100%", s.focussize = "0 0", s.focusposition = h, s.angle = 0) : (s.type = "gradient", s.angle = (270 - u) % 360), e.appendChild(s)
                }
                return 1
            }, N = function(e, r) {
                this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = r, this.matrix = t.matrix(), this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    dx: 0,
                    dy: 0,
                    deg: 0,
                    dirty: 1,
                    dirtyT: 1
                }, !r.bottom && (r.bottom = this), this.prev = r.top, r.top && (r.top.next = this), r.top = this, this.next = null
            }, E = t.el;
        N.prototype = E, E.constructor = N, E.transform = function(e) {
            if (null == e) return this._.transform;
            var i, n = this.paper._viewBoxShift,
                a = n ? "s" + [n.scale, n.scale] + "-1-1t" + [n.dx, n.dy] : d;
            n && (i = e = r(e).replace(/\.{3}|\u2026/g, this._.transform || d)), t._extractTransform(this, a + e);
            var s, o = this.matrix.clone(),
                l = this.skew,
                h = this.node,
                u = ~r(this.attrs.fill).indexOf("-"),
                c = !r(this.attrs.fill).indexOf("url(");
            if (o.translate(-.5, -.5), c || u || "image" == this.type)
                if (l.matrix = "1 0 0 1", l.offset = "0 0", s = o.split(), u && s.noRotation || !s.isSimple) {
                    h.style.filter = o.toFilter();
                    var f = this.getBBox(),
                        g = this.getBBox(1),
                        x = f.x - g.x,
                        v = f.y - g.y;
                    h.coordorigin = x * -b + p + v * -b, B(this, 1, 1, x, v, 0)
                } else h.style.filter = d, B(this, s.scalex, s.scaley, s.dx, s.dy, s.rotate);
                else h.style.filter = d, l.matrix = r(o), l.offset = o.offset();
            return i && (this._.transform = i), this
        }, E.rotate = function(t, e, n) {
            if (this.removed) return this;
            if (null != t) {
                if (t = r(t).split(u), t.length - 1 && (e = i(t[1]), n = i(t[2])), t = i(t[0]), null == n && (e = n), null == e || null == n) {
                    var a = this.getBBox(1);
                    e = a.x + a.width / 2, n = a.y + a.height / 2
                }
                return this._.dirtyT = 1, this.transform(this._.transform.concat([
                    ["r", t, e, n]
                ])), this
            }
        }, E.translate = function(t, e) {
            return this.removed ? this : (t = r(t).split(u), t.length - 1 && (e = i(t[1])), t = i(t[0]) || 0, e = +e || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += e), this.transform(this._.transform.concat([
                ["t", t, e]
            ])), this)
        }, E.scale = function(t, e, n, a) {
            if (this.removed) return this;
            if (t = r(t).split(u), t.length - 1 && (e = i(t[1]), n = i(t[2]), a = i(t[3]), isNaN(n) && (n = null), isNaN(a) && (a = null)), t = i(t[0]), null == e && (e = t), null == a && (n = a), null == n || null == a) var s = this.getBBox(1);
            return n = null == n ? s.x + s.width / 2 : n, a = null == a ? s.y + s.height / 2 : a, this.transform(this._.transform.concat([
                ["s", t, e, n, a]
            ])), this._.dirtyT = 1, this
        }, E.hide = function() {
            return !this.removed && (this.node.style.display = "none"), this
        }, E.show = function() {
            return !this.removed && (this.node.style.display = d), this
        }, E._getBBox = function() {
            return this.removed ? {} : {
                x: this.X + (this.bbx || 0) - this.W / 2,
                y: this.Y - this.H,
                width: this.W,
                height: this.H
            }
        }, E.remove = function() {
            if (!this.removed && this.node.parentNode) {
                this.paper.__set__ && this.paper.__set__.exclude(this), t.eve.unbind("raphael.*.*." + this.id), t._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
                this.removed = !0
            }
        }, E.attr = function(r, i) {
            if (this.removed) return this;
            if (null == r) {
                var n = {};
                for (var a in this.attrs) this.attrs[e](a) && (n[a] = this.attrs[a]);
                return n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n.transform = this._.transform, n
            }
            if (null == i && t.is(r, "string")) {
                if (r == h && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                for (var s = r.split(u), o = {}, l = 0, f = s.length; f > l; l++) r = s[l], o[r] = r in this.attrs ? this.attrs[r] : t.is(this.paper.customAttributes[r], "function") ? this.paper.customAttributes[r].def : t._availableAttrs[r];
                return f - 1 ? o : o[s[0]]
            }
            if (this.attrs && null == i && t.is(r, "array")) {
                for (o = {}, l = 0, f = r.length; f > l; l++) o[r[l]] = this.attr(r[l]);
                return o
            }
            var p;
            null != i && (p = {}, p[r] = i), null == i && t.is(r, "object") && (p = r);
            for (var d in p) c("raphael.attr." + d + "." + this.id, this, p[d]);
            if (p) {
                for (d in this.paper.customAttributes)
                    if (this.paper.customAttributes[e](d) && p[e](d) && t.is(this.paper.customAttributes[d], "function")) {
                        var g = this.paper.customAttributes[d].apply(this, [].concat(p[d]));
                        this.attrs[d] = p[d];
                        for (var x in g) g[e](x) && (p[x] = g[x])
                    }
                p.text && "text" == this.type && (this.textpath.string = p.text), A(this, p)
            }
            return this
        }, E.toFront = function() {
            return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t._tofront(this, this.paper), this
        }, E.toBack = function() {
            return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper)), this)
        }, E.insertAfter = function(e) {
            return this.removed ? this : (e.constructor == t.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this)
        }, E.insertBefore = function(e) {
            return this.removed ? this : (e.constructor == t.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), t._insertbefore(this, e, this.paper), this)
        }, E.blur = function(e) {
            var r = this.node.runtimeStyle,
                i = r.filter;
            i = i.replace(v, d), 0 !== +e ? (this.attrs.blur = e, r.filter = i + p + f + ".Blur(pixelradius=" + (+e || 1.5) + ")", r.margin = t.format("-{0}px 0 0 -{0}px", a(+e || 1.5))) : (r.filter = i, r.margin = 0, delete this.attrs.blur)
        }, t._engine.path = function(t, e) {
            var r = L("shape");
            r.style.cssText = m, r.coordsize = b + p + b, r.coordorigin = e.coordorigin;
            var i = new N(r, e),
                n = {
                    fill: "none",
                    stroke: "#000"
                };
            t && (n.path = t), i.type = "path", i.path = [], i.Path = d, A(i, n), e.canvas.appendChild(r);
            var a = L("skew");
            return a.on = !0, r.appendChild(a), i.skew = a, i.transform(d), i
        }, t._engine.rect = function(e, r, i, n, a, s) {
            var o = t._rectPath(r, i, n, a, s),
                l = e.path(o),
                h = l.attrs;
            return l.X = h.x = r, l.Y = h.y = i, l.W = h.width = n, l.H = h.height = a, h.r = s, h.path = o, l.type = "rect", l
        }, t._engine.ellipse = function(t, e, r, i, n) {
            var a = t.path();
            return a.attrs, a.X = e - i, a.Y = r - n, a.W = 2 * i, a.H = 2 * n, a.type = "ellipse", A(a, {
                cx: e,
                cy: r,
                rx: i,
                ry: n
            }), a
        }, t._engine.circle = function(t, e, r, i) {
            var n = t.path();
            return n.attrs, n.X = e - i, n.Y = r - i, n.W = n.H = 2 * i, n.type = "circle", A(n, {
                cx: e,
                cy: r,
                r: i
            }), n
        }, t._engine.image = function(e, r, i, n, a, s) {
            var o = t._rectPath(i, n, a, s),
                l = e.path(o).attr({
                    stroke: "none"
                }),
                u = l.attrs,
                c = l.node,
                f = c.getElementsByTagName(h)[0];
            return u.src = r, l.X = u.x = i, l.Y = u.y = n, l.W = u.width = a, l.H = u.height = s, u.path = o, l.type = "image", f.parentNode == c && c.removeChild(f), f.rotate = !0, f.src = r, f.type = "tile", l._.fillpos = [i, n], l._.fillsize = [a, s], c.appendChild(f), B(l, 1, 1, 0, 0, 0), l
        }, t._engine.text = function(e, i, n, s) {
            var o = L("shape"),
                l = L("path"),
                h = L("textpath");
            i = i || 0, n = n || 0, s = s || "", l.v = t.format("m{0},{1}l{2},{1}", a(i * b), a(n * b), a(i * b) + 1), l.textpathok = !0, h.string = r(s), h.on = !0, o.style.cssText = m, o.coordsize = b + p + b, o.coordorigin = "0 0";
            var u = new N(o, e),
                c = {
                    fill: "#000",
                    stroke: "none",
                    font: t._availableAttrs.font,
                    text: s
                };
            u.shape = o, u.path = l, u.textpath = h, u.type = "text", u.attrs.text = r(s), u.attrs.x = i, u.attrs.y = n, u.attrs.w = 1, u.attrs.h = 1, A(u, c), o.appendChild(h), o.appendChild(l), e.canvas.appendChild(o);
            var f = L("skew");
            return f.on = !0, o.appendChild(f), u.skew = f, u.transform(d), u
        }, t._engine.setSize = function(e, r) {
            var i = this.canvas.style;
            return this.width = e, this.height = r, e == +e && (e += "px"), r == +r && (r += "px"), i.width = e, i.height = r, i.clip = "rect(0 " + e + " " + r + " 0)", this._viewBox && t._engine.setViewBox.apply(this, this._viewBox), this
        }, t._engine.setViewBox = function(e, r, i, n, a) {
            t.eve("raphael.setViewBox", this, this._viewBox, [e, r, i, n, a]);
            var o, l, h = this.width,
                u = this.height,
                c = 1 / s(i / h, n / u);
            return a && (o = u / n, l = h / i, h > i * o && (e -= (h - i * o) / 2 / o), u > n * l && (r -= (u - n * l) / 2 / l)), this._viewBox = [e, r, i, n, !! a], this._viewBoxShift = {
                dx: -e,
                dy: -r,
                scale: c
            }, this.forEach(function(t) {
                t.transform("...")
            }), this
        };
        var L;
        t._engine.initWin = function(t) {
            var e = t.document;
            e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), L = function(t) {
                    return e.createElement("<rvml:" + t + ' class="rvml">')
                }
            } catch (r) {
                L = function(t) {
                    return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        }, t._engine.initWin(t._g.win), t._engine.create = function() {
            var e = t._getContainer.apply(0, arguments),
                r = e.container,
                i = e.height,
                n = e.width,
                a = e.x,
                s = e.y;
            if (!r) throw Error("VML container not found.");
            var o = new t._Paper,
                l = o.canvas = t._g.doc.createElement("div"),
                h = l.style;
            return a = a || 0, s = s || 0, n = n || 512, i = i || 342, o.width = n, o.height = i, n == +n && (n += "px"), i == +i && (i += "px"), o.coordsize = 1e3 * b + p + 1e3 * b, o.coordorigin = "0 0", o.span = t._g.doc.createElement("span"), o.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", l.appendChild(o.span), h.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", n, i), 1 == r ? (t._g.doc.body.appendChild(l), h.left = a + "px", h.top = s + "px", h.position = "absolute") : r.firstChild ? r.insertBefore(l, r.firstChild) : r.appendChild(l), o.renderfix = function() {}, o
        }, t.prototype.clear = function() {
            t.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = t._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
        }, t.prototype.remove = function() {
            t.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
            for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
            return !0
        };
        var M = t.st;
        for (var z in E) E[e](z) && !M[e](z) && (M[z] = function(t) {
            return function() {
                var e = arguments;
                return this.forEach(function(r) {
                    r[t].apply(r, e)
                })
            }
        }(z))
    }
});
