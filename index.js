!function e(t, n, o) {
    function r(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(a, !0);
                if (i) return i(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = n[a] = {exports: {}};
            t[a][0].call(c.exports, (function (e) {
                var n = t[a][1][e];
                return r(n || e)
            }), c, c.exports, e, t, n, o)
        }
        return n[a].exports
    }

    for (var i = "function" == typeof require && require, a = 0; a < o.length; a++) r(o[a]);
    return r
}({
    1: [function (e, t, n) {
        function o() {
            f && s && (f = !1, s.length ? d = s.concat(d) : m = -1, d.length && r())
        }

        function r() {
            if (!f) {
                var e = u(o);
                f = !0;
                for (var t = d.length; t;) {
                    for (s = d, d = []; ++m < t;) s && s[m].run();
                    m = -1, t = d.length
                }
                s = null, f = !1, c(e)
            }
        }

        function i(e, t) {
            this.fun = e, this.array = t
        }

        function a() {
        }

        var s, l = t.exports = {}, u = setTimeout, c = clearTimeout, d = [], f = !1, m = -1;
        l.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            d.push(new i(e, t)), 1 !== d.length || f || u(r, 0)
        }, i.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = a, l.addListener = a, l.once = a, l.off = a, l.removeListener = a, l.removeAllListeners = a, l.emit = a, l.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, l.cwd = function () {
            return "/"
        }, l.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, l.umask = function () {
            return 0
        }
    }, {}], 2: [function (e, t, n) {
        t.exports = e(4), t.exports.color = e(3)
    }, {3: 3, 4: 4}], 3: [function (e, t, n) {
        var o = t.exports = o || {};
        o.color = o.color || {}, o.utils = o.utils || {}, o.utils.common = function () {
            var e = Array.prototype.forEach, t = Array.prototype.slice;
            return {
                BREAK: {}, extend: function (e) {
                    return this.each(t.call(arguments, 1), (function (t) {
                        for (var n in t) this.isUndefined(t[n]) || (e[n] = t[n])
                    }), this), e
                }, defaults: function (e) {
                    return this.each(t.call(arguments, 1), (function (t) {
                        for (var n in t) this.isUndefined(e[n]) && (e[n] = t[n])
                    }), this), e
                }, compose: function () {
                    var e = t.call(arguments);
                    return function () {
                        for (var n = t.call(arguments), o = e.length - 1; o >= 0; o--) n = [e[o].apply(this, n)];
                        return n[0]
                    }
                }, each: function (t, n, o) {
                    if (e && t.forEach === e) t.forEach(n, o); else if (t.length === t.length + 0) {
                        for (var r = 0, i = t.length; i > r; r++) if (r in t && n.call(o, t[r], r) === this.BREAK) return
                    } else for (var r in t) if (n.call(o, t[r], r) === this.BREAK) return
                }, defer: function (e) {
                    setTimeout(e, 0)
                }, toArray: function (e) {
                    return e.toArray ? e.toArray() : t.call(e)
                }, isUndefined: function (e) {
                    return void 0 === e
                }, isNull: function (e) {
                    return null === e
                }, isNaN: function (e) {
                    return e != e
                }, isArray: Array.isArray || function (e) {
                    return e.constructor === Array
                }, isObject: function (e) {
                    return e === Object(e)
                }, isNumber: function (e) {
                    return e === e + 0
                }, isString: function (e) {
                    return e === e + ""
                }, isBoolean: function (e) {
                    return !1 === e || !0 === e
                }, isFunction: function (e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }
        }(), o.color.toString = function (e) {
            return function (t) {
                if (1 == t.a || e.isUndefined(t.a)) {
                    for (var n = t.hex.toString(16); n.length < 6;) n = "0" + n;
                    return "#" + n
                }
                return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
            }
        }(o.utils.common), o.Color = o.color.Color = function (e, t, n, o) {
            function r(e, t, n) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "RGB" === this.__state.space || a(this, t, n), this.__state[t]
                    }, set: function (e) {
                        "RGB" !== this.__state.space && (a(this, t, n), this.__state.space = "RGB"), this.__state[t] = e
                    }
                })
            }

            function i(e, t) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "HSV" === this.__state.space || s(this), this.__state[t]
                    }, set: function (e) {
                        "HSV" !== this.__state.space && (s(this), this.__state.space = "HSV"), this.__state[t] = e
                    }
                })
            }

            function a(e, n, r) {
                if ("HEX" === e.__state.space) e.__state[n] = t.component_from_hex(e.__state.hex, r); else {
                    if ("HSV" !== e.__state.space) throw"Corrupted color state";
                    o.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                }
            }

            function s(e) {
                var n = t.rgb_to_hsv(e.r, e.g, e.b);
                o.extend(e.__state, {
                    s: n.s,
                    v: n.v
                }), o.isNaN(n.h) ? o.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = n.h
            }

            var l = function () {
                if (this.__state = e.apply(this, arguments), !1 === this.__state) throw"Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1
            };
            return l.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], o.extend(l.prototype, {
                toString: function () {
                    return n(this)
                }, toOriginal: function () {
                    return this.__state.conversion.write(this)
                }
            }), r(l.prototype, "r", 2), r(l.prototype, "g", 1), r(l.prototype, "b", 0), i(l.prototype, "h"), i(l.prototype, "s"), i(l.prototype, "v"), Object.defineProperty(l.prototype, "a", {
                get: function () {
                    return this.__state.a
                }, set: function (e) {
                    this.__state.a = e
                }
            }), Object.defineProperty(l.prototype, "hex", {
                get: function () {
                    return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
                }, set: function (e) {
                    this.__state.space = "HEX", this.__state.hex = e
                }
            }), l
        }(o.color.interpret = function (e, t) {
            var n, o, r = [{
                litmus: t.isString, conversions: {
                    THREE_CHAR_HEX: {
                        read: function (e) {
                            var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                            return null !== t && {
                                space: "HEX",
                                hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                            }
                        }, write: e
                    }, SIX_CHAR_HEX: {
                        read: function (e) {
                            var t = e.match(/^#([A-F0-9]{6})$/i);
                            return null !== t && {space: "HEX", hex: parseInt("0x" + t[1].toString())}
                        }, write: e
                    }, CSS_RGB: {
                        read: function (e) {
                            var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null !== t && {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3])
                            }
                        }, write: e
                    }, CSS_RGBA: {
                        read: function (e) {
                            var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                            return null !== t && {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3]),
                                a: parseFloat(t[4])
                            }
                        }, write: e
                    }
                }
            }, {
                litmus: t.isNumber, conversions: {
                    HEX: {
                        read: function (e) {
                            return {space: "HEX", hex: e, conversionName: "HEX"}
                        }, write: function (e) {
                            return e.hex
                        }
                    }
                }
            }, {
                litmus: t.isArray, conversions: {
                    RGB_ARRAY: {
                        read: function (e) {
                            return 3 == e.length && {space: "RGB", r: e[0], g: e[1], b: e[2]}
                        }, write: function (e) {
                            return [e.r, e.g, e.b]
                        }
                    }, RGBA_ARRAY: {
                        read: function (e) {
                            return 4 == e.length && {space: "RGB", r: e[0], g: e[1], b: e[2], a: e[3]}
                        }, write: function (e) {
                            return [e.r, e.g, e.b, e.a]
                        }
                    }
                }
            }, {
                litmus: t.isObject, conversions: {
                    RGBA_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a)) && {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b,
                                a: e.a
                            }
                        }, write: function (e) {
                            return {r: e.r, g: e.g, b: e.b, a: e.a}
                        }
                    }, RGB_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b)) && {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b
                            }
                        }, write: function (e) {
                            return {r: e.r, g: e.g, b: e.b}
                        }
                    }, HSVA_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a)) && {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v,
                                a: e.a
                            }
                        }, write: function (e) {
                            return {h: e.h, s: e.s, v: e.v, a: e.a}
                        }
                    }, HSV_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v)) && {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v
                            }
                        }, write: function (e) {
                            return {h: e.h, s: e.s, v: e.v}
                        }
                    }
                }
            }];
            return function () {
                o = !1;
                var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                return t.each(r, (function (r) {
                    return r.litmus(e) ? (t.each(r.conversions, (function (r, i) {
                        return n = r.read(e), !1 === o && !1 !== n ? (o = n, n.conversionName = i, n.conversion = r, t.BREAK) : void 0
                    })), t.BREAK) : void 0
                })), o
            }
        }(o.color.toString, o.utils.common), o.color.math = function () {
            var e;
            return {
                hsv_to_rgb: function (e, t, n) {
                    var o = Math.floor(e / 60) % 6, r = e / 60 - Math.floor(e / 60), i = n * (1 - t),
                        a = n * (1 - r * t), s = n * (1 - (1 - r) * t),
                        l = [[n, s, i], [a, n, i], [i, n, s], [i, a, n], [s, i, n], [n, i, a]][o];
                    return {r: 255 * l[0], g: 255 * l[1], b: 255 * l[2]}
                }, rgb_to_hsv: function (e, t, n) {
                    var o, r = Math.min(e, t, n), i = Math.max(e, t, n), a = i - r;
                    return 0 == i ? {
                        h: NaN,
                        s: 0,
                        v: 0
                    } : (o = e == i ? (t - n) / a : t == i ? 2 + (n - e) / a : 4 + (e - t) / a, 0 > (o /= 6) && (o += 1), {
                        h: 360 * o,
                        s: a / i,
                        v: i / 255
                    })
                }, rgb_to_hex: function (e, t, n) {
                    var o = this.hex_with_component(0, 2, e);
                    return o = this.hex_with_component(o, 1, t), this.hex_with_component(o, 0, n)
                }, component_from_hex: function (e, t) {
                    return e >> 8 * t & 255
                }, hex_with_component: function (t, n, o) {
                    return o << (e = 8 * n) | t & ~(255 << e)
                }
            }
        }(), o.color.toString, o.utils.common)
    }, {}], 4: [function (e, t, n) {
        var o = t.exports = o || {};
        o.gui = o.gui || {}, o.utils = o.utils || {}, o.controllers = o.controllers || {}, o.dom = o.dom || {}, o.color = o.color || {}, o.utils.css = {
            load: function (e, t) {
                var n = (t = t || document).createElement("link");
                n.type = "text/css", n.rel = "stylesheet", n.href = e, t.getElementsByTagName("head")[0].appendChild(n)
            }, inject: function (e, t) {
                t = t || document;
                var n = document.createElement("style");
                n.type = "text/css", n.innerHTML = e, t.getElementsByTagName("head")[0].appendChild(n)
            }
        }, o.utils.common = function () {
            var e = Array.prototype.forEach, t = Array.prototype.slice;
            return {
                BREAK: {}, extend: function (e) {
                    return this.each(t.call(arguments, 1), (function (t) {
                        for (var n in t) this.isUndefined(t[n]) || (e[n] = t[n])
                    }), this), e
                }, defaults: function (e) {
                    return this.each(t.call(arguments, 1), (function (t) {
                        for (var n in t) this.isUndefined(e[n]) && (e[n] = t[n])
                    }), this), e
                }, compose: function () {
                    var e = t.call(arguments);
                    return function () {
                        for (var n = t.call(arguments), o = e.length - 1; o >= 0; o--) n = [e[o].apply(this, n)];
                        return n[0]
                    }
                }, each: function (t, n, o) {
                    if (e && t.forEach === e) t.forEach(n, o); else if (t.length === t.length + 0) {
                        for (var r = 0, i = t.length; i > r; r++) if (r in t && n.call(o, t[r], r) === this.BREAK) return
                    } else for (var r in t) if (n.call(o, t[r], r) === this.BREAK) return
                }, defer: function (e) {
                    setTimeout(e, 0)
                }, toArray: function (e) {
                    return e.toArray ? e.toArray() : t.call(e)
                }, isUndefined: function (e) {
                    return void 0 === e
                }, isNull: function (e) {
                    return null === e
                }, isNaN: function (e) {
                    return e != e
                }, isArray: Array.isArray || function (e) {
                    return e.constructor === Array
                }, isObject: function (e) {
                    return e === Object(e)
                }, isNumber: function (e) {
                    return e === e + 0
                }, isString: function (e) {
                    return e === e + ""
                }, isBoolean: function (e) {
                    return !1 === e || !0 === e
                }, isFunction: function (e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }
        }(), o.controllers.Controller = function (e) {
            var t = function (e, t) {
                this.initialValue = e[t], this.domElement = document.createElement("div"), this.object = e, this.property = t, this.__onChange = void 0, this.__onFinishChange = void 0
            };
            return e.extend(t.prototype, {
                onChange: function (e) {
                    return this.__onChange = e, this
                }, onFinishChange: function (e) {
                    return this.__onFinishChange = e, this
                }, setValue: function (e) {
                    return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this
                }, getValue: function () {
                    return this.object[this.property]
                }, updateDisplay: function () {
                    return this
                }, isModified: function () {
                    return this.initialValue !== this.getValue()
                }
            }), t
        }(o.utils.common), o.dom.dom = function (e) {
            function t(t) {
                if ("0" === t || e.isUndefined(t)) return 0;
                var n = t.match(o);
                return e.isNull(n) ? 0 : parseFloat(n[1])
            }

            var n = {};
            e.each({
                HTMLEvents: ["change"],
                MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
                KeyboardEvents: ["keydown"]
            }, (function (t, o) {
                e.each(t, (function (e) {
                    n[e] = o
                }))
            }));
            var o = /(\d+(\.\d+)?)px/, r = {
                makeSelectable: function (e, t) {
                    void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function () {
                        return !1
                    } : function () {
                    }, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off")
                }, makeFullscreen: function (t, n, o) {
                    e.isUndefined(n) && (n = !0), e.isUndefined(o) && (o = !0), t.style.position = "absolute", n && (t.style.left = 0, t.style.right = 0), o && (t.style.top = 0, t.style.bottom = 0)
                }, fakeEvent: function (t, o, r, i) {
                    r = r || {};
                    var a = n[o];
                    if (!a) throw new Error("Event type " + o + " not supported.");
                    var s = document.createEvent(a);
                    switch (a) {
                        case"MouseEvents":
                            var l = r.x || r.clientX || 0, u = r.y || r.clientY || 0;
                            s.initMouseEvent(o, r.bubbles || !1, r.cancelable || !0, window, r.clickCount || 1, 0, 0, l, u, !1, !1, !1, !1, 0, null);
                            break;
                        case"KeyboardEvents":
                            var c = s.initKeyboardEvent || s.initKeyEvent;
                            e.defaults(r, {
                                cancelable: !0,
                                ctrlKey: !1,
                                altKey: !1,
                                shiftKey: !1,
                                metaKey: !1,
                                keyCode: void 0,
                                charCode: void 0
                            }), c(o, r.bubbles || !1, r.cancelable, window, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, r.keyCode, r.charCode);
                            break;
                        default:
                            s.initEvent(o, r.bubbles || !1, r.cancelable || !0)
                    }
                    e.defaults(s, i), t.dispatchEvent(s)
                }, bind: function (e, t, n, o) {
                    return o = o || !1, e.addEventListener ? e.addEventListener(t, n, o) : e.attachEvent && e.attachEvent("on" + t, n), r
                }, unbind: function (e, t, n, o) {
                    return o = o || !1, e.removeEventListener ? e.removeEventListener(t, n, o) : e.detachEvent && e.detachEvent("on" + t, n), r
                }, addClass: function (e, t) {
                    if (void 0 === e.className) e.className = t; else if (e.className !== t) {
                        var n = e.className.split(/ +/);
                        -1 == n.indexOf(t) && (n.push(t), e.className = n.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
                    }
                    return r
                }, removeClass: function (e, t) {
                    if (t) if (void 0 === e.className) ; else if (e.className === t) e.removeAttribute("class"); else {
                        var n = e.className.split(/ +/), o = n.indexOf(t);
                        -1 != o && (n.splice(o, 1), e.className = n.join(" "))
                    } else e.className = void 0;
                    return r
                }, hasClass: function (e, t) {
                    return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1
                }, getWidth: function (e) {
                    var n = getComputedStyle(e);
                    return t(n["border-left-width"]) + t(n["border-right-width"]) + t(n["padding-left"]) + t(n["padding-right"]) + t(n.width)
                }, getHeight: function (e) {
                    var n = getComputedStyle(e);
                    return t(n["border-top-width"]) + t(n["border-bottom-width"]) + t(n["padding-top"]) + t(n["padding-bottom"]) + t(n.height)
                }, getOffset: function (e) {
                    var t = {left: 0, top: 0};
                    if (e.offsetParent) do {
                        t.left += e.offsetLeft, t.top += e.offsetTop
                    } while (e = e.offsetParent);
                    return t
                }, isActive: function (e) {
                    return e === document.activeElement && (e.type || e.href)
                }
            };
            return r
        }(o.utils.common), o.controllers.OptionController = function (e, t, n) {
            var o = function (e, r, i) {
                o.superclass.call(this, e, r);
                var a = this;
                if (this.__select = document.createElement("select"), n.isArray(i)) {
                    var s = {};
                    n.each(i, (function (e) {
                        s[e] = e
                    })), i = s
                }
                n.each(i, (function (e, t) {
                    var n = document.createElement("option");
                    n.innerHTML = t, n.setAttribute("value", e), a.__select.appendChild(n)
                })), this.updateDisplay(), t.bind(this.__select, "change", (function () {
                    var e = this.options[this.selectedIndex].value;
                    a.setValue(e)
                })), this.domElement.appendChild(this.__select)
            };
            return o.superclass = e, n.extend(o.prototype, e.prototype, {
                setValue: function (e) {
                    var t = o.superclass.prototype.setValue.call(this, e);
                    return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), t
                }, updateDisplay: function () {
                    return this.__select.value = this.getValue(), o.superclass.prototype.updateDisplay.call(this)
                }
            }), o
        }(o.controllers.Controller, o.dom.dom, o.utils.common), o.controllers.NumberController = function (e, t) {
            var n = function (e, o, r) {
                n.superclass.call(this, e, o), r = r || {}, this.__min = r.min, this.__max = r.max, this.__step = r.step, t.isUndefined(this.__step) ? 0 == this.initialValue ? this.__impliedStep = 1 : this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step, this.__precision = function (e) {
                    return (e = e.toString()).indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0
                }(this.__impliedStep)
            };
            return n.superclass = e, t.extend(n.prototype, e.prototype, {
                setValue: function (e) {
                    return void 0 !== this.__min && e < this.__min ? e = this.__min : void 0 !== this.__max && e > this.__max && (e = this.__max), void 0 !== this.__step && e % this.__step != 0 && (e = Math.round(e / this.__step) * this.__step), n.superclass.prototype.setValue.call(this, e)
                }, min: function (e) {
                    return this.__min = e, this
                }, max: function (e) {
                    return this.__max = e, this
                }, step: function (e) {
                    return this.__step = e, this
                }
            }), n
        }(o.controllers.Controller, o.utils.common), o.controllers.NumberControllerBox = function (e, t, n) {
            var o = function (e, r, i) {
                function a() {
                    var e = parseFloat(c.__input.value);
                    n.isNaN(e) || c.setValue(e)
                }

                function s(e) {
                    var t = u - e.clientY;
                    c.setValue(c.getValue() + t * c.__impliedStep), u = e.clientY
                }

                function l() {
                    t.unbind(window, "mousemove", s), t.unbind(window, "mouseup", l)
                }

                this.__truncationSuspended = !1, o.superclass.call(this, e, r, i);
                var u, c = this;
                this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), t.bind(this.__input, "change", a), t.bind(this.__input, "blur", (function () {
                    a(), c.__onFinishChange && c.__onFinishChange.call(c, c.getValue())
                })), t.bind(this.__input, "mousedown", (function (e) {
                    t.bind(window, "mousemove", s), t.bind(window, "mouseup", l), u = e.clientY
                })), t.bind(this.__input, "keydown", (function (e) {
                    13 === e.keyCode && (c.__truncationSuspended = !0, this.blur(), c.__truncationSuspended = !1)
                })), this.updateDisplay(), this.domElement.appendChild(this.__input)
            };
            return o.superclass = e, n.extend(o.prototype, e.prototype, {
                updateDisplay: function () {
                    return this.__input.value = this.__truncationSuspended ? this.getValue() : function (e, t) {
                        var n = Math.pow(10, t);
                        return Math.round(e * n) / n
                    }(this.getValue(), this.__precision), o.superclass.prototype.updateDisplay.call(this)
                }
            }), o
        }(o.controllers.NumberController, o.dom.dom, o.utils.common), o.controllers.NumberControllerSlider = function (e, t, n, o, r) {
            var i = function (e, n, o, r, a) {
                function s(e) {
                    e.preventDefault();
                    var n = t.getOffset(u.__background), o = t.getWidth(u.__background);
                    return u.setValue(function (e, t, n, o, r) {
                        return o + (e - t) / (n - t) * (r - o)
                    }(e.clientX, n.left, n.left + o, u.__min, u.__max)), !1
                }

                function l() {
                    t.unbind(window, "mousemove", s), t.unbind(window, "mouseup", l), u.__onFinishChange && u.__onFinishChange.call(u, u.getValue())
                }

                i.superclass.call(this, e, n, {min: o, max: r, step: a});
                var u = this;
                this.__background = document.createElement("div"), this.__foreground = document.createElement("div"), t.bind(this.__background, "mousedown", (function (e) {
                    t.bind(window, "mousemove", s), t.bind(window, "mouseup", l), s(e)
                })), t.addClass(this.__background, "slider"), t.addClass(this.__foreground, "slider-fg"), this.updateDisplay(), this.__background.appendChild(this.__foreground), this.domElement.appendChild(this.__background)
            };
            return i.superclass = e, i.useDefaultStyles = function () {
                n.inject(".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}")
            }, o.extend(i.prototype, e.prototype, {
                updateDisplay: function () {
                    var e = (this.getValue() - this.__min) / (this.__max - this.__min);
                    return this.__foreground.style.width = 100 * e + "%", i.superclass.prototype.updateDisplay.call(this)
                }
            }), i
        }(o.controllers.NumberController, o.dom.dom, o.utils.css, o.utils.common), o.controllers.FunctionController = function (e, t, n) {
            var o = function (e, n, r) {
                o.superclass.call(this, e, n);
                var i = this;
                this.__button = document.createElement("div"), this.__button.innerHTML = void 0 === r ? "Fire" : r, t.bind(this.__button, "click", (function (e) {
                    return e.preventDefault(), i.fire(), !1
                })), t.addClass(this.__button, "button"), this.domElement.appendChild(this.__button)
            };
            return o.superclass = e, n.extend(o.prototype, e.prototype, {
                fire: function () {
                    this.__onChange && this.__onChange.call(this), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.getValue().call(this.object)
                }
            }), o
        }(o.controllers.Controller, o.dom.dom, o.utils.common), o.controllers.BooleanController = function (e, t, n) {
            var o = function (e, n) {
                o.superclass.call(this, e, n);
                var r = this;
                this.__prev = this.getValue(), this.__checkbox = document.createElement("input"), this.__checkbox.setAttribute("type", "checkbox"), t.bind(this.__checkbox, "change", (function () {
                    r.setValue(!r.__prev)
                }), !1), this.domElement.appendChild(this.__checkbox), this.updateDisplay()
            };
            return o.superclass = e, n.extend(o.prototype, e.prototype, {
                setValue: function (e) {
                    var t = o.superclass.prototype.setValue.call(this, e);
                    return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), t
                }, updateDisplay: function () {
                    return !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1, o.superclass.prototype.updateDisplay.call(this)
                }
            }), o
        }(o.controllers.Controller, o.dom.dom, o.utils.common), o.color.toString = function (e) {
            return function (t) {
                if (1 == t.a || e.isUndefined(t.a)) {
                    for (var n = t.hex.toString(16); n.length < 6;) n = "0" + n;
                    return "#" + n
                }
                return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
            }
        }(o.utils.common), o.color.interpret = function (e, t) {
            var n, o, r = [{
                litmus: t.isString, conversions: {
                    THREE_CHAR_HEX: {
                        read: function (e) {
                            var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                            return null !== t && {
                                space: "HEX",
                                hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                            }
                        }, write: e
                    }, SIX_CHAR_HEX: {
                        read: function (e) {
                            var t = e.match(/^#([A-F0-9]{6})$/i);
                            return null !== t && {space: "HEX", hex: parseInt("0x" + t[1].toString())}
                        }, write: e
                    }, CSS_RGB: {
                        read: function (e) {
                            var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null !== t && {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3])
                            }
                        }, write: e
                    }, CSS_RGBA: {
                        read: function (e) {
                            var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                            return null !== t && {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3]),
                                a: parseFloat(t[4])
                            }
                        }, write: e
                    }
                }
            }, {
                litmus: t.isNumber, conversions: {
                    HEX: {
                        read: function (e) {
                            return {space: "HEX", hex: e, conversionName: "HEX"}
                        }, write: function (e) {
                            return e.hex
                        }
                    }
                }
            }, {
                litmus: t.isArray, conversions: {
                    RGB_ARRAY: {
                        read: function (e) {
                            return 3 == e.length && {space: "RGB", r: e[0], g: e[1], b: e[2]}
                        }, write: function (e) {
                            return [e.r, e.g, e.b]
                        }
                    }, RGBA_ARRAY: {
                        read: function (e) {
                            return 4 == e.length && {space: "RGB", r: e[0], g: e[1], b: e[2], a: e[3]}
                        }, write: function (e) {
                            return [e.r, e.g, e.b, e.a]
                        }
                    }
                }
            }, {
                litmus: t.isObject, conversions: {
                    RGBA_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a)) && {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b,
                                a: e.a
                            }
                        }, write: function (e) {
                            return {r: e.r, g: e.g, b: e.b, a: e.a}
                        }
                    }, RGB_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b)) && {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b
                            }
                        }, write: function (e) {
                            return {r: e.r, g: e.g, b: e.b}
                        }
                    }, HSVA_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a)) && {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v,
                                a: e.a
                            }
                        }, write: function (e) {
                            return {h: e.h, s: e.s, v: e.v, a: e.a}
                        }
                    }, HSV_OBJ: {
                        read: function (e) {
                            return !!(t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v)) && {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v
                            }
                        }, write: function (e) {
                            return {h: e.h, s: e.s, v: e.v}
                        }
                    }
                }
            }];
            return function () {
                o = !1;
                var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                return t.each(r, (function (r) {
                    return r.litmus(e) ? (t.each(r.conversions, (function (r, i) {
                        return n = r.read(e), !1 === o && !1 !== n ? (o = n, n.conversionName = i, n.conversion = r, t.BREAK) : void 0
                    })), t.BREAK) : void 0
                })), o
            }
        }(o.color.toString, o.utils.common), o.GUI = o.gui.GUI = function (e, t, n, o, r, i, a, s, l, u, c, d, f, m, p) {
            function v(e, t, n, i) {
                if (void 0 === t[n]) throw new Error("Object " + t + ' has no property "' + n + '"');
                var a;
                if (i.color) a = new c(t, n); else {
                    var s = [t, n].concat(i.factoryArgs);
                    a = o.apply(e, s)
                }
                i.before instanceof r && (i.before = i.before.__li), _(e, a), m.addClass(a.domElement, "c");
                var l = document.createElement("span");
                m.addClass(l, "property-name"), l.innerHTML = a.property;
                var u = document.createElement("div");
                u.appendChild(l), u.appendChild(a.domElement);
                var d = h(e, u, i.before);
                return m.addClass(d, P.CLASS_CONTROLLER_ROW), m.addClass(d, typeof a.getValue()), g(e, d, a), e.__controllers.push(a), a
            }

            function h(e, t, n) {
                var o = document.createElement("li");
                return t && o.appendChild(t), n ? e.__ul.insertBefore(o, params.before) : e.__ul.appendChild(o), e.onResize(), o
            }

            function g(e, t, n) {
                if (n.__li = t, n.__gui = e, p.extend(n, {
                    options: function (t) {
                        return arguments.length > 1 ? (n.remove(), v(e, n.object, n.property, {
                            before: n.__li.nextElementSibling,
                            factoryArgs: [p.toArray(arguments)]
                        })) : p.isArray(t) || p.isObject(t) ? (n.remove(), v(e, n.object, n.property, {
                            before: n.__li.nextElementSibling,
                            factoryArgs: [t]
                        })) : void 0
                    }, name: function (e) {
                        return n.__li.firstElementChild.firstElementChild.innerHTML = e, n
                    }, listen: function () {
                        return n.__gui.listen(n), n
                    }, remove: function () {
                        return n.__gui.remove(n), n
                    }
                }), n instanceof l) {
                    var o = new s(n.object, n.property, {min: n.__min, max: n.__max, step: n.__step});
                    p.each(["updateDisplay", "onChange", "onFinishChange"], (function (e) {
                        var t = n[e], r = o[e];
                        n[e] = o[e] = function () {
                            var e = Array.prototype.slice.call(arguments);
                            return t.apply(n, e), r.apply(o, e)
                        }
                    })), m.addClass(t, "has-slider"), n.domElement.insertBefore(o.domElement, n.domElement.firstElementChild)
                } else if (n instanceof s) {
                    var r = function (t) {
                        return p.isNumber(n.__min) && p.isNumber(n.__max) ? (n.remove(), v(e, n.object, n.property, {
                            before: n.__li.nextElementSibling,
                            factoryArgs: [n.__min, n.__max, n.__step]
                        })) : t
                    };
                    n.min = p.compose(r, n.min), n.max = p.compose(r, n.max)
                } else n instanceof i ? (m.bind(t, "click", (function () {
                    m.fakeEvent(n.__checkbox, "click")
                })), m.bind(n.__checkbox, "click", (function (e) {
                    e.stopPropagation()
                }))) : n instanceof a ? (m.bind(t, "click", (function () {
                    m.fakeEvent(n.__button, "click")
                })), m.bind(t, "mouseover", (function () {
                    m.addClass(n.__button, "hover")
                })), m.bind(t, "mouseout", (function () {
                    m.removeClass(n.__button, "hover")
                }))) : n instanceof c && (m.addClass(t, "color"), n.updateDisplay = p.compose((function (e) {
                    return t.style.borderLeftColor = n.__color.toString(), e
                }), n.updateDisplay), n.updateDisplay());
                n.setValue = p.compose((function (t) {
                    return e.getRoot().__preset_select && n.isModified() && C(e.getRoot(), !0), t
                }), n.setValue)
            }

            function _(e, t) {
                var n = e.getRoot(), o = n.__rememberedObjects.indexOf(t.object);
                if (-1 != o) {
                    var r = n.__rememberedObjectIndecesToControllers[o];
                    if (void 0 === r && (r = {}, n.__rememberedObjectIndecesToControllers[o] = r), r[t.property] = t, n.load && n.load.remembered) {
                        var i, a = n.load.remembered;
                        if (a[e.preset]) i = a[e.preset]; else {
                            if (!a[D]) return;
                            i = a[D]
                        }
                        if (i[o] && void 0 !== i[o][t.property]) {
                            var s = i[o][t.property];
                            t.initialValue = s, t.setValue(s)
                        }
                    }
                }
            }

            function x(e, t) {
                return document.location.href + "." + t
            }

            function b(e) {
                function t() {
                    u.style.display = e.useLocalStorage ? "block" : "none"
                }

                var n = e.__save_row = document.createElement("li");
                m.addClass(e.domElement, "has-save"), e.__ul.insertBefore(n, e.__ul.firstChild), m.addClass(n, "save-row");
                var o = document.createElement("span");
                o.innerHTML = "&nbsp;", m.addClass(o, "button gears");
                var r = document.createElement("span");
                r.innerHTML = "Save", m.addClass(r, "button"), m.addClass(r, "save");
                var i = document.createElement("span");
                i.innerHTML = "New", m.addClass(i, "button"), m.addClass(i, "save-as");
                var a = document.createElement("span");
                a.innerHTML = "Revert", m.addClass(a, "button"), m.addClass(a, "revert");
                var s = e.__preset_select = document.createElement("select");
                if (e.load && e.load.remembered ? p.each(e.load.remembered, (function (t, n) {
                    S(e, n, n == e.preset)
                })) : S(e, D, !1), m.bind(s, "change", (function () {
                    for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].innerHTML = e.__preset_select[t].value;
                    e.preset = this.value
                })), n.appendChild(s), n.appendChild(o), n.appendChild(r), n.appendChild(i), n.appendChild(a), R) {
                    var l = document.getElementById("dg-save-locally"),
                        u = document.getElementById("dg-local-explain");
                    l.style.display = "block";
                    var c = document.getElementById("dg-local-storage");
                    "true" === localStorage.getItem(x(0, "isLocal")) && c.setAttribute("checked", "checked"), t(), m.bind(c, "change", (function () {
                        e.useLocalStorage = !e.useLocalStorage, t()
                    }))
                }
                var d = document.getElementById("dg-new-constructor");
                m.bind(d, "keydown", (function (e) {
                    !e.metaKey || 67 !== e.which && 67 != e.keyCode || A.hide()
                })), m.bind(o, "click", (function () {
                    d.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2), A.show(), d.focus(), d.select()
                })), m.bind(r, "click", (function () {
                    e.save()
                })), m.bind(i, "click", (function () {
                    var t = prompt("Enter a new preset name.");
                    t && e.saveAs(t)
                })), m.bind(a, "click", (function () {
                    e.revert()
                }))
            }

            function y(e, t) {
                e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px")
            }

            function w(e, t) {
                var n = {};
                return p.each(e.__rememberedObjects, (function (o, r) {
                    var i = {}, a = e.__rememberedObjectIndecesToControllers[r];
                    p.each(a, (function (e, n) {
                        i[n] = t ? e.initialValue : e.getValue()
                    })), n[r] = i
                })), n
            }

            function S(e, t, n) {
                var o = document.createElement("option");
                o.innerHTML = t, o.value = t, e.__preset_select.appendChild(o), n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1)
            }

            function C(e, t) {
                var n = e.__preset_select[e.__preset_select.selectedIndex];
                n.innerHTML = t ? n.value + "*" : n.value
            }

            function E(e) {
                0 != e.length && d((function () {
                    E(e)
                })), p.each(e, (function (e) {
                    e.updateDisplay()
                }))
            }

            e.inject(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");
            var A, T, D = "Default", R = function () {
                try {
                    return "localStorage" in window && null !== window.localStorage
                } catch (e) {
                    return !1
                }
            }(), z = !0, M = !1, I = [], P = function (e) {
                function t() {
                    localStorage.setItem(x(0, "gui"), JSON.stringify(n.getSaveObject()))
                }

                var n = this;
                this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), m.addClass(this.domElement, "dg"), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], e = e || {}, e = p.defaults(e, {
                    autoPlace: !0,
                    width: P.DEFAULT_WIDTH
                }), e = p.defaults(e, {
                    resizable: e.autoPlace,
                    hideable: e.autoPlace
                }), p.isUndefined(e.load) ? e.load = {preset: D} : e.preset && (e.load.preset = e.preset), p.isUndefined(e.parent) && e.hideable && I.push(this), e.resizable = p.isUndefined(e.parent) && e.resizable, e.autoPlace && p.isUndefined(e.scrollable) && (e.scrollable = !0);
                var o = R && "true" === localStorage.getItem(x(0, "isLocal"));
                if (Object.defineProperties(this, {
                    parent: {
                        get: function () {
                            return e.parent
                        }
                    }, scrollable: {
                        get: function () {
                            return e.scrollable
                        }
                    }, autoPlace: {
                        get: function () {
                            return e.autoPlace
                        }
                    }, preset: {
                        get: function () {
                            return n.parent ? n.getRoot().preset : e.load.preset
                        }, set: function (t) {
                            n.parent ? n.getRoot().preset = t : e.load.preset = t, function (e) {
                                for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].value == e.preset && (e.__preset_select.selectedIndex = t)
                            }(this), n.revert()
                        }
                    }, width: {
                        get: function () {
                            return e.width
                        }, set: function (t) {
                            e.width = t, y(n, t)
                        }
                    }, name: {
                        get: function () {
                            return e.name
                        }, set: function (t) {
                            e.name = t, i && (i.innerHTML = e.name)
                        }
                    }, closed: {
                        get: function () {
                            return e.closed
                        }, set: function (t) {
                            e.closed = t, e.closed ? m.addClass(n.__ul, P.CLASS_CLOSED) : m.removeClass(n.__ul, P.CLASS_CLOSED), this.onResize(), n.__closeButton && (n.__closeButton.innerHTML = t ? P.TEXT_OPEN : P.TEXT_CLOSED)
                        }
                    }, load: {
                        get: function () {
                            return e.load
                        }
                    }, useLocalStorage: {
                        get: function () {
                            return o
                        }, set: function (e) {
                            R && (o = e, e ? m.bind(window, "unload", t) : m.unbind(window, "unload", t), localStorage.setItem(x(0, "isLocal"), e))
                        }
                    }
                }), p.isUndefined(e.parent)) {
                    if (e.closed = !1, m.addClass(this.domElement, P.CLASS_MAIN), m.makeSelectable(this.domElement, !1), R && o) {
                        n.useLocalStorage = !0;
                        var r = localStorage.getItem(x(0, "gui"));
                        r && (e.load = JSON.parse(r))
                    }
                    this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = P.TEXT_CLOSED, m.addClass(this.__closeButton, P.CLASS_CLOSE_BUTTON), this.domElement.appendChild(this.__closeButton), m.bind(this.__closeButton, "click", (function () {
                        n.closed = !n.closed
                    }))
                } else {
                    void 0 === e.closed && (e.closed = !0);
                    var i = document.createTextNode(e.name);
                    m.addClass(i, "controller-name");
                    var a = h(n, i);
                    m.addClass(this.__ul, P.CLASS_CLOSED), m.addClass(a, "title"), m.bind(a, "click", (function (e) {
                        return e.preventDefault(), n.closed = !n.closed, !1
                    })), e.closed || (this.closed = !1)
                }
                e.autoPlace && (p.isUndefined(e.parent) && (z && (T = document.createElement("div"), m.addClass(T, "dg"), m.addClass(T, P.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(T), z = !1), T.appendChild(this.domElement), m.addClass(this.domElement, P.CLASS_AUTO_PLACE)), this.parent || y(n, e.width)), m.bind(window, "resize", (function () {
                    n.onResize()
                })), m.bind(this.__ul, "webkitTransitionEnd", (function () {
                    n.onResize()
                })), m.bind(this.__ul, "transitionend", (function () {
                    n.onResize()
                })), m.bind(this.__ul, "oTransitionEnd", (function () {
                    n.onResize()
                })), this.onResize(), e.resizable && function (e) {
                    function t(t) {
                        return t.preventDefault(), r = t.clientX, m.addClass(e.__closeButton, P.CLASS_DRAG), m.bind(window, "mousemove", n), m.bind(window, "mouseup", o), !1
                    }

                    function n(t) {
                        return t.preventDefault(), e.width += r - t.clientX, e.onResize(), r = t.clientX, !1
                    }

                    function o() {
                        m.removeClass(e.__closeButton, P.CLASS_DRAG), m.unbind(window, "mousemove", n), m.unbind(window, "mouseup", o)
                    }

                    var r;
                    e.__resize_handle = document.createElement("div"), p.extend(e.__resize_handle.style, {
                        width: "6px",
                        marginLeft: "-3px",
                        height: "200px",
                        cursor: "ew-resize",
                        position: "absolute"
                    }), m.bind(e.__resize_handle, "mousedown", t), m.bind(e.__closeButton, "mousedown", t), e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild)
                }(this), n.getRoot(), e.parent || function () {
                    var e = n.getRoot();
                    e.width += 1, p.defer((function () {
                        e.width -= 1
                    }))
                }()
            };
            return P.toggleHide = function () {
                M = !M, p.each(I, (function (e) {
                    e.domElement.style.zIndex = M ? -999 : 999, e.domElement.style.opacity = M ? 0 : 1
                }))
            }, P.CLASS_AUTO_PLACE = "a", P.CLASS_AUTO_PLACE_CONTAINER = "ac", P.CLASS_MAIN = "main", P.CLASS_CONTROLLER_ROW = "cr", P.CLASS_TOO_TALL = "taller-than-window", P.CLASS_CLOSED = "closed", P.CLASS_CLOSE_BUTTON = "close-button", P.CLASS_DRAG = "drag", P.DEFAULT_WIDTH = 245, P.TEXT_CLOSED = "Close Controls", P.TEXT_OPEN = "Open Controls", m.bind(window, "keydown", (function (e) {
                "text" === document.activeElement.type || 72 !== e.which && 72 != e.keyCode || P.toggleHide()
            }), !1), p.extend(P.prototype, {
                add: function (e, t) {
                    return v(this, e, t, {factoryArgs: Array.prototype.slice.call(arguments, 2)})
                }, addColor: function (e, t) {
                    return v(this, e, t, {color: !0})
                }, remove: function (e) {
                    this.__ul.removeChild(e.__li), this.__controllers.slice(this.__controllers.indexOf(e), 1);
                    var t = this;
                    p.defer((function () {
                        t.onResize()
                    }))
                }, destroy: function () {
                    this.autoPlace && T.removeChild(this.domElement)
                }, addFolder: function (e) {
                    if (void 0 !== this.__folders[e]) throw new Error('You already have a folder in this GUI by the name "' + e + '"');
                    var t = {name: e, parent: this};
                    t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed, t.load = this.load.folders[e]);
                    var n = new P(t);
                    this.__folders[e] = n;
                    var o = h(this, n.domElement);
                    return m.addClass(o, "folder"), n
                }, open: function () {
                    this.closed = !1
                }, close: function () {
                    this.closed = !0
                }, onResize: function () {
                    var e = this.getRoot();
                    if (e.scrollable) {
                        var t = m.getOffset(e.__ul).top, n = 0;
                        p.each(e.__ul.childNodes, (function (t) {
                            e.autoPlace && t === e.__save_row || (n += m.getHeight(t))
                        })), window.innerHeight - t - 20 < n ? (m.addClass(e.domElement, P.CLASS_TOO_TALL), e.__ul.style.height = window.innerHeight - t - 20 + "px") : (m.removeClass(e.domElement, P.CLASS_TOO_TALL), e.__ul.style.height = "auto")
                    }
                    e.__resize_handle && p.defer((function () {
                        e.__resize_handle.style.height = e.__ul.offsetHeight + "px"
                    })), e.__closeButton && (e.__closeButton.style.width = e.width + "px")
                }, remember: function () {
                    if (p.isUndefined(A) && ((A = new f).domElement.innerHTML = t), this.parent) throw new Error("You can only call remember on a top level GUI.");
                    var e = this;
                    p.each(Array.prototype.slice.call(arguments), (function (t) {
                        0 == e.__rememberedObjects.length && b(e), -1 == e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t)
                    })), this.autoPlace && y(this, this.width)
                }, getRoot: function () {
                    for (var e = this; e.parent;) e = e.parent;
                    return e
                }, getSaveObject: function () {
                    var e = this.load;
                    return e.closed = this.closed, this.__rememberedObjects.length > 0 && (e.preset = this.preset, e.remembered || (e.remembered = {}), e.remembered[this.preset] = w(this)), e.folders = {}, p.each(this.__folders, (function (t, n) {
                        e.folders[n] = t.getSaveObject()
                    })), e
                }, save: function () {
                    this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = w(this), C(this, !1)
                }, saveAs: function (e) {
                    this.load.remembered || (this.load.remembered = {}, this.load.remembered[D] = w(this, !0)), this.load.remembered[e] = w(this), this.preset = e, S(this, e, !0)
                }, revert: function (e) {
                    p.each(this.__controllers, (function (t) {
                        this.getRoot().load.remembered ? _(e || this.getRoot(), t) : t.setValue(t.initialValue)
                    }), this), p.each(this.__folders, (function (e) {
                        e.revert(e)
                    })), e || C(this.getRoot(), !1)
                }, listen: function (e) {
                    var t = 0 == this.__listening.length;
                    this.__listening.push(e), t && E(this.__listening)
                }
            }), P
        }(o.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', 0, o.controllers.factory = function (e, t, n, o, r, i, a) {
            return function (s, l) {
                var u = s[l];
                return a.isArray(arguments[2]) || a.isObject(arguments[2]) ? new e(s, l, arguments[2]) : a.isNumber(u) ? a.isNumber(arguments[2]) && a.isNumber(arguments[3]) ? new n(s, l, arguments[2], arguments[3]) : new t(s, l, {
                    min: arguments[2],
                    max: arguments[3]
                }) : a.isString(u) ? new o(s, l) : a.isFunction(u) ? new r(s, l, "") : a.isBoolean(u) ? new i(s, l) : void 0
            }
        }(o.controllers.OptionController, o.controllers.NumberControllerBox, o.controllers.NumberControllerSlider, o.controllers.StringController = function (e, t, n) {
            var o = function (e, n) {
                function r() {
                    i.setValue(i.__input.value)
                }

                o.superclass.call(this, e, n);
                var i = this;
                this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), t.bind(this.__input, "keyup", r), t.bind(this.__input, "change", r), t.bind(this.__input, "blur", (function () {
                    i.__onFinishChange && i.__onFinishChange.call(i, i.getValue())
                })), t.bind(this.__input, "keydown", (function (e) {
                    13 === e.keyCode && this.blur()
                })), this.updateDisplay(), this.domElement.appendChild(this.__input)
            };
            return o.superclass = e, n.extend(o.prototype, e.prototype, {
                updateDisplay: function () {
                    return t.isActive(this.__input) || (this.__input.value = this.getValue()), o.superclass.prototype.updateDisplay.call(this)
                }
            }), o
        }(o.controllers.Controller, o.dom.dom, o.utils.common), o.controllers.FunctionController, o.controllers.BooleanController, o.utils.common), o.controllers.Controller, o.controllers.BooleanController, o.controllers.FunctionController, o.controllers.NumberControllerBox, o.controllers.NumberControllerSlider, o.controllers.OptionController, o.controllers.ColorController = function (e, t, n, o, r) {
            function i(e, t, n, o) {
                e.style.background = "", r.each(s, (function (r) {
                    e.style.cssText += "background: " + r + "linear-gradient(" + t + ", " + n + " 0%, " + o + " 100%); "
                }))
            }

            var a = function (e, s) {
                function l(e) {
                    f(e), t.bind(window, "mousemove", f), t.bind(window, "mouseup", u)
                }

                function u() {
                    t.unbind(window, "mousemove", f), t.unbind(window, "mouseup", u)
                }

                function c() {
                    var e = o(this.value);
                    !1 !== e ? (p.__color.__state = e, p.setValue(p.__color.toOriginal())) : this.value = p.__color.toString()
                }

                function d() {
                    t.unbind(window, "mousemove", m), t.unbind(window, "mouseup", d)
                }

                function f(e) {
                    e.preventDefault();
                    var n = t.getWidth(p.__saturation_field), o = t.getOffset(p.__saturation_field),
                        r = (e.clientX - o.left + document.body.scrollLeft) / n,
                        i = 1 - (e.clientY - o.top + document.body.scrollTop) / n;
                    return i > 1 ? i = 1 : 0 > i && (i = 0), r > 1 ? r = 1 : 0 > r && (r = 0), p.__color.v = i, p.__color.s = r, p.setValue(p.__color.toOriginal()), !1
                }

                function m(e) {
                    e.preventDefault();
                    var n = t.getHeight(p.__hue_field), o = t.getOffset(p.__hue_field),
                        r = 1 - (e.clientY - o.top + document.body.scrollTop) / n;
                    return r > 1 ? r = 1 : 0 > r && (r = 0), p.__color.h = 360 * r, p.setValue(p.__color.toOriginal()), !1
                }

                a.superclass.call(this, e, s), this.__color = new n(this.getValue()), this.__temp = new n(0);
                var p = this;
                this.domElement = document.createElement("div"), t.makeSelectable(this.domElement, !1), this.__selector = document.createElement("div"), this.__selector.className = "selector", this.__saturation_field = document.createElement("div"), this.__saturation_field.className = "saturation-field", this.__field_knob = document.createElement("div"), this.__field_knob.className = "field-knob", this.__field_knob_border = "2px solid ", this.__hue_knob = document.createElement("div"), this.__hue_knob.className = "hue-knob", this.__hue_field = document.createElement("div"), this.__hue_field.className = "hue-field", this.__input = document.createElement("input"), this.__input.type = "text", this.__input_textShadow = "0 1px 1px ", t.bind(this.__input, "keydown", (function (e) {
                    13 === e.keyCode && c.call(this)
                })), t.bind(this.__input, "blur", c), t.bind(this.__selector, "mousedown", (function (e) {
                    t.addClass(this, "drag").bind(window, "mouseup", (function (e) {
                        t.removeClass(p.__selector, "drag")
                    }))
                }));
                var v = document.createElement("div");
                r.extend(this.__selector.style, {
                    width: "122px",
                    height: "102px",
                    padding: "3px",
                    backgroundColor: "#222",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
                }), r.extend(this.__field_knob.style, {
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    border: this.__field_knob_border + (this.__color.v < .5 ? "#fff" : "#000"),
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                    borderRadius: "12px",
                    zIndex: 1
                }), r.extend(this.__hue_knob.style, {
                    position: "absolute",
                    width: "15px",
                    height: "2px",
                    borderRight: "4px solid #fff",
                    zIndex: 1
                }), r.extend(this.__saturation_field.style, {
                    width: "100px",
                    height: "100px",
                    border: "1px solid #555",
                    marginRight: "3px",
                    display: "inline-block",
                    cursor: "pointer"
                }), r.extend(v.style, {
                    width: "100%",
                    height: "100%",
                    background: "none"
                }), i(v, "top", "rgba(0,0,0,0)", "#000"), r.extend(this.__hue_field.style, {
                    width: "15px",
                    height: "100px",
                    display: "inline-block",
                    border: "1px solid #555",
                    cursor: "ns-resize"
                }), function (e) {
                    e.style.background = "", e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
                }(this.__hue_field), r.extend(this.__input.style, {
                    outline: "none",
                    textAlign: "center",
                    color: "#fff",
                    border: 0,
                    fontWeight: "bold",
                    textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
                }), t.bind(this.__saturation_field, "mousedown", l), t.bind(this.__field_knob, "mousedown", l), t.bind(this.__hue_field, "mousedown", (function (e) {
                    m(e), t.bind(window, "mousemove", m), t.bind(window, "mouseup", d)
                })), this.__saturation_field.appendChild(v), this.__selector.appendChild(this.__field_knob), this.__selector.appendChild(this.__saturation_field), this.__selector.appendChild(this.__hue_field), this.__hue_field.appendChild(this.__hue_knob), this.domElement.appendChild(this.__input), this.domElement.appendChild(this.__selector), this.updateDisplay()
            };
            a.superclass = e, r.extend(a.prototype, e.prototype, {
                updateDisplay: function () {
                    var e = o(this.getValue());
                    if (!1 !== e) {
                        var t = !1;
                        r.each(n.COMPONENTS, (function (n) {
                            return r.isUndefined(e[n]) || r.isUndefined(this.__color.__state[n]) || e[n] === this.__color.__state[n] ? void 0 : (t = !0, {})
                        }), this), t && r.extend(this.__color.__state, e)
                    }
                    r.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
                    var a = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0, s = 255 - a;
                    r.extend(this.__field_knob.style, {
                        marginLeft: 100 * this.__color.s - 7 + "px",
                        marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                        backgroundColor: this.__temp.toString(),
                        border: this.__field_knob_border + "rgb(" + a + "," + a + "," + a + ")"
                    }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, i(this.__saturation_field, "left", "#fff", this.__temp.toString()), r.extend(this.__input.style, {
                        backgroundColor: this.__input.value = this.__color.toString(),
                        color: "rgb(" + a + "," + a + "," + a + ")",
                        textShadow: this.__input_textShadow + "rgba(" + s + "," + s + "," + s + ",.7)"
                    })
                }
            });
            var s = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
            return a
        }(o.controllers.Controller, o.dom.dom, o.color.Color = function (e, t, n, o) {
            function r(e, t, n) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "RGB" === this.__state.space || a(this, t, n), this.__state[t]
                    }, set: function (e) {
                        "RGB" !== this.__state.space && (a(this, t, n), this.__state.space = "RGB"), this.__state[t] = e
                    }
                })
            }

            function i(e, t) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "HSV" === this.__state.space || s(this), this.__state[t]
                    }, set: function (e) {
                        "HSV" !== this.__state.space && (s(this), this.__state.space = "HSV"), this.__state[t] = e
                    }
                })
            }

            function a(e, n, r) {
                if ("HEX" === e.__state.space) e.__state[n] = t.component_from_hex(e.__state.hex, r); else {
                    if ("HSV" !== e.__state.space) throw"Corrupted color state";
                    o.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                }
            }

            function s(e) {
                var n = t.rgb_to_hsv(e.r, e.g, e.b);
                o.extend(e.__state, {
                    s: n.s,
                    v: n.v
                }), o.isNaN(n.h) ? o.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = n.h
            }

            var l = function () {
                if (this.__state = e.apply(this, arguments), !1 === this.__state) throw"Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1
            };
            return l.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], o.extend(l.prototype, {
                toString: function () {
                    return n(this)
                }, toOriginal: function () {
                    return this.__state.conversion.write(this)
                }
            }), r(l.prototype, "r", 2), r(l.prototype, "g", 1), r(l.prototype, "b", 0), i(l.prototype, "h"), i(l.prototype, "s"), i(l.prototype, "v"), Object.defineProperty(l.prototype, "a", {
                get: function () {
                    return this.__state.a
                }, set: function (e) {
                    this.__state.a = e
                }
            }), Object.defineProperty(l.prototype, "hex", {
                get: function () {
                    return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
                }, set: function (e) {
                    this.__state.space = "HEX", this.__state.hex = e
                }
            }), l
        }(o.color.interpret, o.color.math = function () {
            var e;
            return {
                hsv_to_rgb: function (e, t, n) {
                    var o = Math.floor(e / 60) % 6, r = e / 60 - Math.floor(e / 60), i = n * (1 - t),
                        a = n * (1 - r * t), s = n * (1 - (1 - r) * t),
                        l = [[n, s, i], [a, n, i], [i, n, s], [i, a, n], [s, i, n], [n, i, a]][o];
                    return {r: 255 * l[0], g: 255 * l[1], b: 255 * l[2]}
                }, rgb_to_hsv: function (e, t, n) {
                    var o, r = Math.min(e, t, n), i = Math.max(e, t, n), a = i - r;
                    return 0 == i ? {
                        h: NaN,
                        s: 0,
                        v: 0
                    } : (o = e == i ? (t - n) / a : t == i ? 2 + (n - e) / a : 4 + (e - t) / a, 0 > (o /= 6) && (o += 1), {
                        h: 360 * o,
                        s: a / i,
                        v: i / 255
                    })
                }, rgb_to_hex: function (e, t, n) {
                    var o = this.hex_with_component(0, 2, e);
                    return o = this.hex_with_component(o, 1, t), this.hex_with_component(o, 0, n)
                }, component_from_hex: function (e, t) {
                    return e >> 8 * t & 255
                }, hex_with_component: function (t, n, o) {
                    return o << (e = 8 * n) | t & ~(255 << e)
                }
            }
        }(), o.color.toString, o.utils.common), o.color.interpret, o.utils.common), o.utils.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
            window.setTimeout(e, 1e3 / 60)
        }, o.dom.CenteredDiv = function (e, t) {
            var n = function () {
                this.backgroundElement = document.createElement("div"), t.extend(this.backgroundElement.style, {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    top: 0,
                    left: 0,
                    display: "none",
                    zIndex: "1000",
                    opacity: 0,
                    WebkitTransition: "opacity 0.2s linear"
                }), e.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), t.extend(this.domElement.style, {
                    position: "fixed",
                    display: "none",
                    zIndex: "1001",
                    opacity: 0,
                    WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
                }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
                var n = this;
                e.bind(this.backgroundElement, "click", (function () {
                    n.hide()
                }))
            };
            return n.prototype.show = function () {
                var e = this;
                this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), t.defer((function () {
                    e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)"
                }))
            }, n.prototype.hide = function () {
                var t = this, n = function () {
                    t.domElement.style.display = "none", t.backgroundElement.style.display = "none", e.unbind(t.domElement, "webkitTransitionEnd", n), e.unbind(t.domElement, "transitionend", n), e.unbind(t.domElement, "oTransitionEnd", n)
                };
                e.bind(this.domElement, "webkitTransitionEnd", n), e.bind(this.domElement, "transitionend", n), e.bind(this.domElement, "oTransitionEnd", n), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)"
            }, n.prototype.layout = function () {
                this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + "px"
            }, n
        }(o.dom.dom, o.utils.common), o.dom.dom, o.utils.common)
    }, {}], 5: [function (e, t, n) {
        function o(e, t, n) {
            var o = l[t];
            if (void 0 === o && (o = function (e) {
                var t = s(e), n = a(t);
                return l[t] = l[e] = l[n] = n, n
            }(t)), o) {
                if (void 0 === n) return e.style[o];
                "number" == typeof n && (n += u[o] || ""), e.style[o] = n
            }
        }

        function r(e, t) {
            for (var n in t) t.hasOwnProperty(n) && o(e, n, t[n])
        }

        function i() {
            2 === arguments.length ? r(arguments[0], arguments[1]) : o(arguments[0], arguments[1], arguments[2])
        }

        var a = e(6), s = e(7), l = {float: "cssFloat"}, u = {};
        ["top", "right", "bottom", "left", "width", "height", "fontSize", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding", "margin", "perspective"].forEach((function (e) {
            u[e] = "px"
        })), t.exports = i, t.exports.set = i, t.exports.get = function (e, t) {
            return Array.isArray(t) ? t.reduce((function (t, n) {
                return t[n] = o(e, n || ""), t
            }), {}) : o(e, t || "")
        }
    }, {6: 6, 7: 7}], 6: [function (e, t, n) {
        var o = null;
        t.exports = function (e) {
            var t = ["Moz", "Khtml", "Webkit", "O", "ms"], n = e.charAt(0).toUpperCase() + e.slice(1);
            if (o || (o = document.createElement("div")), e in o.style) return e;
            for (var r = t.length; r--;) if (t[r] + n in o.style) return t[r] + n;
            return !1
        }
    }, {}], 7: [function (e, t, n) {
        var o = e(8);
        t.exports = function (e) {
            return o(e).replace(/\s(\w)/g, (function (e, t) {
                return t.toUpperCase()
            }))
        }
    }, {8: 8}], 8: [function (e, t, n) {
        var o = e(9);
        t.exports = function (e) {
            return o(e).replace(/[\W_]+(.|$)/g, (function (e, t) {
                return t ? " " + t : ""
            }))
        }
    }, {9: 9}], 9: [function (e, t, n) {
        t.exports = function (e) {
            return o.test(e) || (i.test(e) && (e = function (e) {
                return e.replace(a, (function (e, t) {
                    return t ? " " + t : ""
                }))
            }(e)), r.test(e) && (e = function (e) {
                return e.replace(s, (function (e, t, n) {
                    return t + " " + n.toLowerCase().split("").join(" ")
                }))
            }(e))), e.toLowerCase()
        };
        var o = /\s/, r = /[a-z][A-Z]/, i = /[\W_]/, a = /[\W_]+(.|$)/g, s = /(.)([A-Z]+)/g
    }, {}], 10: [function (e, t, n) {
        t.exports = function (e, t, n) {
            if (null != e) for (var o = -1, r = e.length; ++o < r && !1 !== t.call(n, e[o], o, e);) ;
        }
    }, {}], 11: [function (e, t, n) {
        var o = e(17), r = e(16), i = e(23);
        t.exports = function (e) {
            switch (o(e)) {
                case"Object":
                    return function (e) {
                        return r(e) ? i({}, e) : e
                    }(e);
                case"Array":
                    return function (e) {
                        return e.slice()
                    }(e);
                case"RegExp":
                    return function (e) {
                        var t = "";
                        return t += e.multiline ? "m" : "", t += e.global ? "g" : "", t += e.ignoreCase ? "i" : "", new RegExp(e.source, t)
                    }(e);
                case"Date":
                    return function (e) {
                        return new Date(+e)
                    }(e);
                default:
                    return e
            }
        }
    }, {16: 16, 17: 17, 23: 23}], 12: [function (e, t, n) {
        function o(e, t) {
            switch (a(e)) {
                case"Object":
                    return function (e, t) {
                        if (s(e)) {
                            var n = {};
                            return i(e, (function (e, n) {
                                this[n] = o(e, t)
                            }), n), n
                        }
                        return t ? t(e) : e
                    }(e, t);
                case"Array":
                    return function (e, t) {
                        for (var n = [], r = -1, i = e.length; ++r < i;) n[r] = o(e[r], t);
                        return n
                    }(e, t);
                default:
                    return r(e)
            }
        }

        var r = e(11), i = e(19), a = e(17), s = e(16);
        t.exports = o
    }, {11: 11, 16: 16, 17: 17, 19: 19}], 13: [function (e, t, n) {
        var o = e(14), r = Array.isArray || function (e) {
            return o(e, "Array")
        };
        t.exports = r
    }, {14: 14}], 14: [function (e, t, n) {
        var o = e(17);
        t.exports = function (e, t) {
            return o(e) === t
        }
    }, {17: 17}], 15: [function (e, t, n) {
        var o = e(14);
        t.exports = function (e) {
            return o(e, "Object")
        }
    }, {14: 14}], 16: [function (e, t, n) {
        t.exports = function (e) {
            return !!e && "object" == typeof e && e.constructor === Object
        }
    }, {}], 17: [function (e, t, n) {
        var o = /^\[object (.*)\]$/, r = Object.prototype.toString;
        t.exports = function (e) {
            return null === e ? "Null" : undefined === e ? "Undefined" : o.exec(r.call(e))[1]
        }
    }, {}], 18: [function (e, t, n) {
        function o(e, t, n, o) {
            return e.call(o, t[n], n, t)
        }

        var r, i, a = e(20);
        t.exports = function (e, t, n) {
            var s, l = 0;
            for (s in null == r && function () {
                for (var e in i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], r = !0, {toString: null}) r = !1
            }(), e) if (!1 === o(t, e, s, n)) break;
            if (r) for (var u = e.constructor, c = !!u && e === u.prototype; (s = i[l++]) && ("constructor" === s && (c || !a(e, s)) || e[s] === Object.prototype[s] || !1 !== o(t, e, s, n));) ;
        }
    }, {20: 20}], 19: [function (e, t, n) {
        var o = e(20), r = e(18);
        t.exports = function (e, t, n) {
            r(e, (function (r, i) {
                return o(e, i) ? t.call(n, e[i], i, e) : void 0
            }))
        }
    }, {18: 18, 20: 20}], 20: [function (e, t, n) {
        t.exports = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
    }, {}], 21: [function (e, t, n) {
        var o = e(19), r = Object.keys || function (e) {
            var t = [];
            return o(e, (function (e, n) {
                t.push(n)
            })), t
        };
        t.exports = r
    }, {19: 19}], 22: [function (e, t, n) {
        var o = e(20), r = e(12), i = e(15);
        t.exports = function e() {
            var t, n, a, s, l = 1;
            for (s = r(arguments[0]); a = arguments[l++];) for (t in a) o(a, t) && (n = a[t], i(n) && i(s[t]) ? s[t] = e(s[t], n) : s[t] = r(n));
            return s
        }
    }, {12: 12, 15: 15, 20: 20}], 23: [function (e, t, n) {
        function o(e, t) {
            this[t] = e
        }

        var r = e(19);
        t.exports = function (e, t) {
            for (var n, i = 0, a = arguments.length; ++i < a;) null != (n = arguments[i]) && r(n, o, e);
            return e
        }
    }, {19: 19}], 24: [function (e, t, n) {
        var o = e(28), r = e(13), i = e(20);
        t.exports = function (e, t) {
            for (var n, a, s, l, u = (e || "").replace("?", "").split("&"), c = -1, d = {}; a = u[++c];) n = a.indexOf("="), l = a.substring(0, n), s = decodeURIComponent(a.substring(n + 1)), !1 !== t && (s = o(s)), i(d, l) ? r(d[l]) ? d[l].push(s) : d[l] = [d[l], s] : d[l] = s;
            return d
        }
    }, {13: 13, 20: 20, 28: 28}], 25: [function (e, t, n) {
        var o = e(19), r = e(13), i = e(10);
        t.exports = function (e) {
            var t, n, a = [];
            return o(e, (function (e, o) {
                r(e) ? (t = o + "=", n = new RegExp("&" + o + "+=$"), i(e, (function (e) {
                    t += encodeURIComponent(e) + "&" + o + "="
                })), a.push(t.replace(n, ""))) : a.push(o + "=" + encodeURIComponent(e))
            })), a.length ? "?" + a.join("&") : ""
        }
    }, {10: 10, 13: 13, 19: 19}], 26: [function (e, t, n) {
        t.exports = function (e) {
            e = e.replace(/#.*/, "");
            var t = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(e);
            return t ? decodeURIComponent(t[0].replace(/\+/g, " ")) : ""
        }
    }, {}], 27: [function (e, t, n) {
        var o = e(24), r = e(26);
        t.exports = function (e, t) {
            return o(r(e), t)
        }
    }, {24: 24, 26: 26}], 28: [function (e, t, n) {
        var o;
        t.exports = function (e) {
            return null === e || "null" === e ? null : "true" === e || "false" !== e && (e === o || "undefined" === e ? o : "" === e || isNaN(e) ? e : parseFloat(e))
        }
    }, {}], 29: [function (e, t, n) {
        for (var o = e(30), r = "undefined" == typeof window ? {} : window, i = ["moz", "webkit"], a = "AnimationFrame", s = r["request" + a], l = r["cancel" + a] || r["cancelRequest" + a], u = 0; u < i.length && !s; u++) s = r[i[u] + "Request" + a], l = r[i[u] + "Cancel" + a] || r[i[u] + "CancelRequest" + a];
        if (!s || !l) {
            var c = 0, d = 0, f = [];
            s = function (e) {
                if (0 === f.length) {
                    var t = o(), n = Math.max(0, 16.666666666666668 - (t - c));
                    c = n + t, setTimeout((function () {
                        var e = f.slice(0);
                        f.length = 0;
                        for (var t = 0; t < e.length; t++) if (!e[t].cancelled) try {
                            e[t].callback(c)
                        } catch (e) {
                            setTimeout((function () {
                                throw e
                            }), 0)
                        }
                    }), Math.round(n))
                }
                return f.push({handle: ++d, callback: e, cancelled: !1}), d
            }, l = function (e) {
                for (var t = 0; t < f.length; t++) f[t].handle === e && (f[t].cancelled = !0)
            }
        }
        t.exports = function (e) {
            return s.call(r, e)
        }, t.exports.cancel = function () {
            l.apply(r, arguments)
        }
    }, {30: 30}], 30: [function (e, t, n) {
        (function (e) {
            (function () {
                var n, o, r;
                "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function () {
                    return performance.now()
                } : null != e && e.hrtime ? (t.exports = function () {
                    return (n() - r) / 1e6
                }, o = e.hrtime, r = (n = function () {
                    var e;
                    return 1e9 * (e = o())[0] + e[1]
                })()) : Date.now ? (t.exports = function () {
                    return Date.now() - r
                }, r = Date.now()) : (t.exports = function () {
                    return (new Date).getTime() - r
                }, r = (new Date).getTime())
            }).call(this)
        }).call(this, e(1))
    }, {1: 1}], 31: [function (e, t, n) {
        var o = function () {
            function e(e) {
                return r.appendChild(e.dom), e
            }

            function t(e) {
                for (var t = 0; t < r.children.length; t++) r.children[t].style.display = t === e ? "block" : "none";
                n = e
            }

            var n = 0, r = document.createElement("div");
            r.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", r.addEventListener("click", (function (e) {
                e.preventDefault(), t(++n % r.children.length)
            }), !1);
            var i = (performance || Date).now(), a = i, s = 0, l = e(new o.Panel("FPS", "#0ff", "#002")),
                u = e(new o.Panel("MS", "#0f0", "#020"));
            if (self.performance && self.performance.memory) var c = e(new o.Panel("MB", "#f08", "#201"));
            return t(0), {
                REVISION: 16, dom: r, addPanel: e, showPanel: t, begin: function () {
                    i = (performance || Date).now()
                }, end: function () {
                    s++;
                    var e = (performance || Date).now();
                    if (u.update(e - i, 200), e > a + 1e3 && (l.update(1e3 * s / (e - a), 100), a = e, s = 0, c)) {
                        var t = performance.memory;
                        c.update(t.usedJSHeapSize / 1048576, t.jsHeapSizeLimit / 1048576)
                    }
                    return e
                }, update: function () {
                    i = this.end()
                }, domElement: r, setMode: t
            }
        };
        o.Panel = function (e, t, n) {
            var o = 1 / 0, r = 0, i = Math.round, a = i(window.devicePixelRatio || 1), s = 80 * a, l = 48 * a,
                u = 3 * a, c = 2 * a, d = 3 * a, f = 15 * a, m = 74 * a, p = 30 * a,
                v = document.createElement("canvas");
            v.width = s, v.height = l, v.style.cssText = "width:80px;height:48px";
            var h = v.getContext("2d");
            return h.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif", h.textBaseline = "top", h.fillStyle = n, h.fillRect(0, 0, s, l), h.fillStyle = t, h.fillText(e, u, c), h.fillRect(d, f, m, p), h.fillStyle = n, h.globalAlpha = .9, h.fillRect(d, f, m, p), {
                dom: v,
                update: function (l, g) {
                    o = Math.min(o, l), r = Math.max(r, l), h.fillStyle = n, h.globalAlpha = 1, h.fillRect(0, 0, s, f), h.fillStyle = t, h.fillText(i(l) + " " + e + " (" + i(o) + "-" + i(r) + ")", u, c), h.drawImage(v, d + a, f, m - a, p, d, f, m - a, p), h.fillRect(d + m - a, f, a, p), h.fillStyle = n, h.globalAlpha = .9, h.fillRect(d + m - a, f, a, i((1 - l / g) * p))
                }
            }
        }, "object" == typeof t && (t.exports = o)
    }, {}], 32: [function (e, t, n) {
        t.exports = window.THREE
    }, {}], 33: [function (e, t, n) {
        var o, r, i, a, s, l = e(32), u = n.rawShaderPrefix = o, c = (n.vertexShader = o, n.copyMaterial = o);
        n.init = function (e) {
            r || (r = e, u = n.rawShaderPrefix = "precision " + r.capabilities.precision + " float;\n", a = new l.Scene, (s = new l.Camera).position.z = 1, c = n.copyMaterial = new l.RawShaderMaterial({
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: o
                    }
                },
                vertexShader: n.vertexShader = u + "#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 v_uv;\n\nvoid main() {\n    v_uv = uv;\n    gl_Position = vec4( position, 1.0 );\n}\n",
                fragmentShader: u + "#define GLSLIFY 1\nuniform sampler2D u_texture;\n\nvarying vec2 v_uv;\n\nvoid main() {\n    gl_FragColor = texture2D( u_texture, v_uv );\n}\n"
            }), i = new l.Mesh(new l.PlaneBufferGeometry(2, 2), c), a.add(i))
        }, n.copy = function (e, t) {
            i.material = c, c.uniforms.u_texture.value = e, t ? r.render(a, s, t) : r.render(a, s)
        }, n.render = function (e, t) {
            i.material = e, t ? r.render(a, s, t) : r.render(a, s)
        }, n.createRenderTarget = function (e, t, n, o, r, i) {
            var a = new l.WebGLRenderTarget(e || 1, t || 1, {
                format: n || l.RGBFormat,
                type: o || l.UnsignedByteType,
                minFilter: r || l.LinearFilter,
                magFilter: i || l.LinearFilter
            });
            return a.texture.generateMipMaps = !1, a
        }, n.getColorState = function () {
            return {
                autoClearColor: r.autoClearColor,
                clearColor: r.getClearColor().getHex(),
                clearAlpha: r.getClearAlpha()
            }
        }, n.setColorState = function (e) {
            r.setClearColor(e.clearColor, e.clearAlpha), r.autoClearColor = e.autoClearColor
        }
    }, {32: 32}], 34: [function (e, t, n) {
        var o = (e(49), e(32));
        n.mesh = undefined, n.init = function () {
            var e = new o.PlaneBufferGeometry(4500, 4500, 10, 10),
                t = new o.MeshStandardMaterial({roughness: .7, metalness: 1, color: 3355443, emissive: 0}),
                r = n.mesh = new o.Mesh(e, t);
            r.rotation.x = -1.57, r.receiveShadow = !0
        }
    }, {32: 32, 49: 49}], 35: [function (e, t, n) {
        var o, r = (e(49), e(32)), i = n.mesh = o, a = (n.pointLight = o, n.spot = o);
        n.init = function () {
            (i = n.mesh = new r.Object3D).position.set(0, 1e3, 1e3);
            var e = new r.AmbientLight(3355443);
            i.add(e), (a = n.spot = new r.SpotLight(16777215, 1, 0, Math.PI / 2, 1)).target.position.set(0, -1e3, -1e3), a.castShadow = !0, a.shadow.camera.near = 50, a.shadow.camera.far = 2500, a.shadow.camera.fov = 120, a.shadow.bias = 3e-4, a.shadow.darkness = 1, a.shadow.mapSize.width = 1024, a.shadow.mapSize.height = 2048, i.add(a);
            var t = new r.DirectionalLight(12225419, .5);
            t.position.set(1, 1, 1), i.add(t);
            var o = new r.DirectionalLight(9157300, .3);
            o.position.set(1, 1, -1), i.add(o)
        }, n.update = function (e, t) {
            1 * e
        }
    }, {32: 32, 49: 49}], 36: [function (e, t, n) {
        var o, r = e(49), i = e(32), a = e(51), s = e(42), l = e(46), u = e(35), c = n.mesh = o;
        n.init = function (e, t, s) {
            (h = new i.Camera).position.z = 1, b = new i.Scene, v = new i.Scene, f = t, m = s, d = e, A = new i.Vector2, function () {
                for (var e, t = new Float32Array(3 * M), n = r.particleSize, o = 0; M > o; o++) t[0 + (e = 3 * o)] = (o % R + .5) / R, t[e + 1] = (.5 + ~~(o / R)) / z, t[e + 2] = (2e4 + 24e3 * Math.pow(Math.random(), 5)) / n;
                (p = new i.BufferGeometry).addAttribute("position", new i.BufferAttribute(t, 3))
            }(), function () {
                var e = new i.ShaderMaterial({
                    uniforms: {
                        uParticleSize: {type: "f", value: 1},
                        uTexturePosition: {type: "t", value: o},
                        uTexturePrevPosition: {type: "t", value: o},
                        uCameraPosition: {type: "v3", value: f.position},
                        uPrevModelViewMatrix: {type: "m4", value: new i.Matrix4},
                        uMotionMultiplier: {type: "f", value: 1}
                    },
                    vertexShader: a("#define GLSLIFY 1\nuniform sampler2D uTexturePosition;\nuniform sampler2D uTexturePrevPosition;\nuniform vec3 uCameraPosition;\nuniform float uParticleSize;\n\nuniform mat4 uPrevModelViewMatrix;\n\nvarying float vHalfSize;\nvarying float vDepth;\nvarying vec2 vMotion;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( uTexturePosition, position.xy );\n    vec4 prevPositionInfo = texture2D( uTexturePrevPosition, position.xy );\n\n    vec4 mvPosition = modelViewMatrix * vec4( positionInfo.xyz, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n\n    vDepth = -mvPosition.z;\n    gl_PointSize = position.z / gl_Position.z * smoothstep(0.0, 0.2, fract(positionInfo.w)) * uParticleSize;\n\n    vHalfSize = gl_PointSize * 0.5;\n\n    vec4 pos = projectionMatrix * mvPosition;\n    vec4 prevPos = projectionMatrix * uPrevModelViewMatrix * vec4( prevPositionInfo.xyz, 1.0 );\n    vMotion = (pos.xy / pos.w - prevPos.xy / prevPos.w) * 0.5 * step(fract(positionInfo.w), fract(prevPositionInfo.w));\n\n    gl_Position = pos;\n\n}\n"),
                    fragmentShader: a("#define GLSLIFY 1\nvarying float vDepth;\nvarying float vHalfSize;\nvarying vec2 vMotion;\n\nuniform float uMotionMultiplier;\n\nconst float EPS = 0.001;\n\nvoid main() {\n\n    vec2 toCenter = (gl_PointCoord.xy - 0.5) * 2.0;\n    float isVisible = step(-1.0 + EPS, -length(toCenter));\n    if(isVisible < 0.5) discard;\n    gl_FragColor = vec4(vMotion * uMotionMultiplier, gl_FragCoord.z, vDepth);\n    // gl_FragColor = vec4(vDepth, smoothstep(vHalfSize - 6.0, vHalfSize, d * vHalfSize), 0.0, 1.0);\n\n}\n"),
                    blending: i.NoBlending
                });
                (y = new i.WebGLRenderTarget(1, 1, {
                    minFilter: i.NearestFilter,
                    magFilter: i.NearestFilter,
                    type: i.FloatType,
                    format: i.RGBAFormat,
                    stencilBuffer: !1,
                    transparent: !0
                })).material = e, r.distanceMap = y
            }(), function () {
                var e = new i.ShaderMaterial({
                    uniforms: {
                        uTexturePosition: {type: "t", value: o},
                        uDepth: {type: "t", value: y},
                        uResolution: {type: "v2", value: A},
                        uParticleSize: {type: "f", value: 1}
                    },
                    vertexShader: a("#define GLSLIFY 1\nuniform sampler2D uTexturePosition;\nuniform float uParticleSize;\n\nvarying float vHalfSize;\nvarying float vLife;\nvarying float vDepth;\nvarying float vColor;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( uTexturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    vDepth = -mvPosition.z;\n    vLife = fract(positionInfo.w);\n\n    gl_Position = projectionMatrix * mvPosition;\n    gl_PointSize = position.z / gl_Position.z * smoothstep(0.0, 0.2, vLife) * uParticleSize;\n    vHalfSize = gl_PointSize * 0.5;\n\n    vColor = (floor(positionInfo.w) / 8192.0 * 2.0) - 1.0;\n}\n"),
                    fragmentShader: a("#define GLSLIFY 1\nvarying float vHalfSize;\nvarying float vDepth;\nvarying float vLife;\nvarying float vColor;\n\nuniform float uInset;\nuniform vec2 uResolution;\nuniform sampler2D uDepth;\n\nconst float EPS = 0.001;\n\nvoid main() {\n\n    vec2 toCenter = (gl_PointCoord.xy - 0.5) * 2.0;\n    float isVisible = step(-1.0 + EPS, -length(toCenter));\n    if(isVisible < 0.5) discard;\n\n    vec2 uv = gl_FragCoord.xy  / uResolution;\n\n    float centerZ = texture2D( uDepth, gl_FragCoord.xy  / uResolution ).w;\n    float zLength = sqrt(1.0 - toCenter.x * toCenter.x - toCenter.y * toCenter.y) * vHalfSize;\n    float z = centerZ - vDepth + zLength;\n\n    isVisible *= step(EPS, z);\n    toCenter.xy *= z;\n    gl_FragColor = vec4(toCenter, z,  ceil(z / zLength) + vColor * 0.00001 * z ) * isVisible;\n\n}\n\n"),
                    blending: i.CustomBlending,
                    blendEquation: i.AddEquation,
                    blendSrc: i.OneFactor,
                    blendDst: i.OneFactor,
                    blendEquationAlpha: i.AddEquation,
                    blendSrcAlpha: i.OneFactor,
                    blendDstAlpha: i.OneFactor,
                    transparent: !0
                });
                (w = new i.WebGLRenderTarget(1, 1, {
                    minFilter: i.NearestFilter,
                    magFilter: i.NearestFilter,
                    format: i.RGBAFormat,
                    type: i.FloatType,
                    depthWrite: !1,
                    depthBuffer: !1,
                    stencilBuffer: !1
                })).material = e
            }(), S = new i.ShaderMaterial({
                uniforms: {
                    tDiffuse: {type: "t", value: w},
                    uResolution: {type: "v2", value: A},
                    uOffset: {type: "f", value: 0}
                },
                vertexShader: a("#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n"),
                fragmentShader: a("#define GLSLIFY 1\nuniform sampler2D tDiffuse;\nuniform float uOffset;\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec4 center = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );\n    if(center.z > 0.001) {\n\n        float w = floor(center.w + 0.5);\n        float ww = smoothstep(0.5, 5.0, w);\n        float offset = uOffset * ww;\n        vec3 sum = vec3( 0.0 );\n        float sumC = 0.0;\n        vec4 color = texture2D( tDiffuse, vec2( vUv.x - 4.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.051;\n        sumC += fract(color.w + 0.5) * 0.051;\n\n        color = texture2D( tDiffuse, vec2( vUv.x - 3.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.0918;\n        sumC += fract(color.w + 0.5) * 0.0918;\n\n        color = texture2D( tDiffuse, vec2( vUv.x - 2.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.12245;\n        sumC += fract(color.w + 0.5) * 0.12245;\n\n        color = texture2D( tDiffuse, vec2( vUv.x - 1.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.1531;\n        sumC += fract(color.w + 0.5) * 0.1531;\n\n        color = center;\n        sum += color.xyz * 0.1633;\n        sumC += fract(color.w + 0.5) * 0.1633;\n\n        color = texture2D( tDiffuse, vec2( vUv.x + 1.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.1531;\n        sumC += fract(color.w + 0.5) * 0.1531;\n\n        color = texture2D( tDiffuse, vec2( vUv.x + 2.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.12245;\n        sumC += fract(color.w + 0.5) * 0.12245;\n\n        color = texture2D( tDiffuse, vec2( vUv.x + 3.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.0918;\n        sumC += fract(color.w + 0.5) * 0.0918;\n\n        color = texture2D( tDiffuse, vec2( vUv.x + 4.0 * offset, vUv.y ) );\n        sum += color.xyz * 0.051;\n        sumC += fract(color.w + 0.5) * 0.051;\n\n        center = mix(center, vec4(sum.xyz, w + sumC - 0.5 ), ww);\n        // center.zw = mix(center.zw, vec2(sum.z, w + sumC - 0.5), 0.00035);\n    }\n\n    gl_FragColor = center;\n\n}\n"),
                transparent: !0,
                blending: i.NoBlending
            }), E = new i.WebGLRenderTarget(1, 1, {
                minFilter: i.NearestFilter,
                magFilter: i.NearestFilter,
                format: i.RGBAFormat,
                type: i.FloatType,
                stencilBuffer: !1
            }), C = new i.ShaderMaterial({
                uniforms: {
                    tDiffuse: {type: "t", value: E},
                    uResolution: {type: "v2", value: A},
                    uOffset: {type: "f", value: 0}
                },
                vertexShader: a("#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n"),
                fragmentShader: a("#define GLSLIFY 1\nuniform sampler2D tDiffuse;\nuniform float uOffset;\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec4 center = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );\n    if(center.z > 0.001) {\n\n        float w = floor(center.w + 0.5);\n        float ww = smoothstep(0.5, 5.0, w);\n        float offset = uOffset * ww;\n        vec3 sum = vec3( 0.0 );\n        float sumC = 0.0;\n        vec4 color = texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * offset ) );\n        sum += color.xyz * 0.051;\n        sumC += fract(color.w + 0.5) * 0.051;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * offset ) );\n        sum += color.xyz * 0.0918;\n        sumC += fract(color.w + 0.5) * 0.0918;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * offset ) );\n        sum += color.xyz * 0.12245;\n        sumC += fract(color.w + 0.5) * 0.12245;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * offset ) );\n        sum += color.xyz * 0.1531;\n        sumC += fract(color.w + 0.5) * 0.1531;\n\n        color = center;\n        sum += color.xyz * 0.1633;\n        sumC += fract(color.w + 0.5) * 0.1633;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * offset ) );\n        sum += color.xyz * 0.1531;\n        sumC += fract(color.w + 0.5) * 0.1531;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * offset ) );\n        sum += color.xyz * 0.12245;\n        sumC += fract(color.w + 0.5) * 0.12245;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * offset ) );\n        sum += color.xyz * 0.0918;\n        sumC += fract(color.w + 0.5) * 0.0918;\n\n        color = texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * offset ) );\n        sum += color.xyz * 0.051;\n        sumC += fract(color.w + 0.5) * 0.051;\n\n        center = mix(center, vec4(sum.xyz, w + sumC - 0.5 ), ww);\n        // center.zw = mix(center.zw, vec2(sum.z, w + sumC - 0.5), 0.00035);\n    }\n\n    gl_FragColor = center;\n\n}\n"),
                transparent: !0,
                blending: i.NoBlending
            }), (_ = new i.Points(p, w.material)).frustumCulled = !1;
            var l = new i.PlaneBufferGeometry(2, 2),
                T = i.UniformsUtils.merge([i.UniformsLib.ambient, i.UniformsLib.lights]);
            T.uDepth = {type: "t", value: y}, T.uAdditive = {type: "t", value: w}, T.uResolution = {
                type: "v2",
                value: A
            }, T.uCameraInverse = {type: "m4", value: f.matrixWorld}, T.uCameraRotationInverse = {
                type: "m4",
                value: new i.Matrix4
            }, T.uProjectMatrix = {type: "m4", value: f.projectionMatrix}, T.uProjectMatrixInverse = {
                type: "m4",
                value: new i.Matrix4
            }, T.uFogColor = {type: "c", value: new i.Color}, T.uColor1 = {
                type: "c",
                value: new i.Color
            }, T.uColor2 = {type: "c", value: new i.Color}, T.uLightPosition = {
                type: "v3",
                value: u.mesh.position
            }, x = new i.ShaderMaterial({
                uniforms: T,
                transparent: !0,
                depthWrite: !1,
                vertexShader: a("#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n"),
                fragmentShader: a("#define GLSLIFY 1\nuniform float uTime;\nuniform vec2 uResolution;\nuniform vec3 uFogColor;\nuniform vec3 uLightPosition;\nuniform mat4 uProjectMatrix;\nuniform mat4 uProjectMatrixInverse;\nuniform mat4 uCameraInverse;\nuniform mat4 uCameraRotationInverse;\n\nuniform mat4 spotShadowMatrix[1];\nuniform sampler2D spotShadowMap[1];\n\nuniform vec3 uColor1;\nuniform vec3 uColor2;\n\nuniform sampler2D uDepth;\nuniform sampler2D uAdditive;\n// uniform sampler2D uSphereMap;\nvarying vec2 vUv;\n\nfloat mod289_0(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 mod289_0(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 perm(vec4 x){return mod289_0(((x * 34.0) + 1.0) * x);}\n\nfloat noise(vec3 p){\n    vec3 a = floor(p);\n    vec3 d = p - a;\n    d = d * d * (3.0 - 2.0 * d);\n\n    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);\n    vec4 k1 = perm(b.xyxy);\n    vec4 k2 = perm(k1.xyxy + b.zzww);\n\n    vec4 c = k2 + a.zzzz;\n    vec4 k3 = perm(c);\n    vec4 k4 = perm(c + 1.0);\n\n    vec4 o1 = fract(k3 * (1.0 / 41.0));\n    vec4 o2 = fract(k4 * (1.0 / 41.0));\n\n    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);\n    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);\n\n    return o4.y * d.y + o4.x * (1.0 - d.y);\n}\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289_1(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute(vec4 x) {\n     return mod289_1(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n     return mod289_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289_1(i);\n  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0 = grad4(j0,   ip);\n  vec4 p1 = grad4(j1.x, ip);\n  vec4 p2 = grad4(j1.y, ip);\n  vec4 p3 = grad4(j1.z, ip);\n  vec4 p4 = grad4(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n\nconst float gamma_0 = 2.2;\n\nfloat toLinear(float v) {\n  return pow(v, gamma_0);\n}\n\nvec2 toLinear(vec2 v) {\n  return pow(v, vec2(gamma_0));\n}\n\nvec3 toLinear(vec3 v) {\n  return pow(v, vec3(gamma_0));\n}\n\nvec4 toLinear(vec4 v) {\n  return vec4(toLinear(v.rgb), v.a);\n}\n\nconst float gamma_1 = 2.2;\n\nfloat toGamma(float v) {\n  return pow(v, 1.0 / gamma_1);\n}\n\nvec2 toGamma(vec2 v) {\n  return pow(v, vec2(1.0 / gamma_1));\n}\n\nvec3 toGamma(vec3 v) {\n  return pow(v, vec3(1.0 / gamma_1));\n}\n\nvec4 toGamma(vec4 v) {\n  return vec4(toGamma(v.rgb), v.a);\n}\n\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\n#define LOG2 1.442695\n\nvec3 blendOverlay(in vec3 base,in  vec3 blend) {\n    return mix(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, step(base, vec3(0.5)));\n}\n\nfloat rand(float n){return fract(sin(n) * 43758.5453123);}\n\nfloat unpackDepth( const in vec4 rgba_depth ) {\n\n    const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n    return dot( rgba_depth, bit_shift );\n\n}\n\nfloat texture2DCompare( sampler2D depths, vec2 uv, float compare, float range ) {\n    float depth = unpackDepth( texture2D(depths, uv ) );\n    return step(compare, depth) + smoothstep( range - compare, -compare , -depth );\n    // return step( compare, unpackDepth( texture2D( depths, uv ) ) );\n}\n\nfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare, float range ) {\n\n    const vec2 offset = vec2( 0.0, 1.0 );\n\n    vec2 texelSize = vec2( 1.0 ) / size;\n    vec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\n    float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare, range );\n    float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare, range );\n    float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare, range );\n    float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare, range );\n\n    vec2 f = fract( uv * size + 0.5 );\n\n    float a = mix( lb, lt, f.y );\n    float b = mix( rb, rt, f.y );\n    float c = mix( a, b, f.x );\n\n    return c;\n\n}\n\nfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowSize, vec4 shadowCoord, float range ) {\n\n        shadowCoord.xyz /= shadowCoord.w;\n        shadowCoord.z += shadowBias;\n\n        bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n        bool inFrustum = all( inFrustumVec );\n\n        bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n        bool frustumTest = all( frustumTestVec );\n\n        if ( frustumTest ) {\n\n            // return texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z, range );\n\n            float t = floor(noise(shadowCoord.xyz) * 275121.351);\n            vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n            // return texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z, range );\n\n            return (\n                texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z, range ) * 2.0 +\n                texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( (rand(t + 214.43) - 0.5) * shadowSize, (rand(t + 412.321) - 0.5) * shadowSize) , shadowCoord.z, range ) +\n                texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( (rand(t + 321.743) - 0.5) * shadowSize, (rand(t + 113.5) - 0.5) * shadowSize) , shadowCoord.z, range ) +\n                texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( (rand(t + 312.632) - 0.5) * shadowSize, (rand(t + 53.26) - 0.5) * shadowSize) , shadowCoord.z, range ) +\n                texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( (rand(t + 632.62) - 0.5) * shadowSize, (rand(t + 34.513) - 0.5) * shadowSize) , shadowCoord.z, range )\n            ) * ( 1.0 / 6.0 );\n        }\n\n        return 1.0;\n}\n\nvoid main() {\n\n    vec4 merged = texture2D( uAdditive, vUv );\n    // vec4 outer = merged;\n\n    float alpha = smoothstep(0.0, 0.01, merged.z);\n\n    if(alpha < 0.001) discard;\n\n    merged.xy /= merged.z;\n\n    float centerZ = texture2D( uDepth, gl_FragCoord.xy  / uResolution ).a;\n\n    centerZ  = 0.5 * (-uProjectMatrix[2].z * centerZ + uProjectMatrix[3].z) / centerZ + 0.5;\n    if(centerZ > 1.0) discard;\n    vec3 ndc = (vec3 (gl_FragCoord.xy / uResolution, centerZ) - 0.5) * 2.0;\n    vec4 tmp4 = uProjectMatrixInverse * vec4(ndc, 1.0);\n    vec3 viewPosition = tmp4.xyz / tmp4.w;\n    float roundW = floor(merged.w + 0.5);\n    viewPosition.z += merged.z / roundW; // no perspective on the particles\n\n    tmp4 = uCameraInverse * vec4(viewPosition , 1.0);\n    vec3 worldPosition = tmp4.xyz / tmp4.w;\n\n    // if(worldPosition.y < -200.0) discard;\n    alpha *= smoothstep(-205.0, -200.0, worldPosition.y);\n\n    float colorRatio = smoothstep(-1.0, 1.0, (merged.w - roundW) / merged.z * 100000.0);\n\n    merged.y *= -1.0;\n    merged.z = sqrt(1.0 - merged.x * merged.x - merged.y * merged.y);\n    merged.xyz = normalize(merged.xyz);\n\n    vec3 lightPosition = uLightPosition - worldPosition;\n    vec3 lightDirection = normalize(lightPosition);\n\n    vec3 color = mix(uColor1, uColor2, colorRatio);\n\n    float light = max(0.0, dot(normalize((uCameraRotationInverse * vec4(merged.xyz, 1.0)).xyz), lightDirection));\n    light *= (1.0 - smoothstep(500.0, 2500.0, length(lightPosition)));\n    color = mix(color, max(color, vec3(1.0, 0.902, 0.8)), light * 0.45);\n\n    // shadow\n    vec4 spotShadowCoord = spotShadowMatrix[0] * vec4(worldPosition.xyz, 1.0);\n    color.xyz *= 0.5 + getShadow( spotShadowMap[0], vec2(1024.0, 2048.0), 0.0, .004, spotShadowCoord, mix(0.0005, 0.0225, light) ) * 0.5;\n\n    // fog\n    float fogFactor = whiteCompliment( exp2( - 0.00075 * 0.00075 * viewPosition.z * viewPosition.z * LOG2 ) );\n    color.xyz = mix(color.xyz, uFogColor, pow(fogFactor, 6.5));\n\n    gl_FragColor = vec4(color.xyz, alpha);\n\n}\n\n")
            }), c = n.mesh = new i.Mesh(l, x), v.add(c), g = new i.ShaderMaterial({
                uniforms: {uTexturePosition: {type: "t", value: null}, uParticleSize: {type: "f", value: 1}},
                vertexShader: a("#define GLSLIFY 1\nuniform sampler2D uTexturePosition;\nuniform float uParticleSize;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( uTexturePosition, position.xy );\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( positionInfo.xyz, 1.0 );\n    gl_PointSize = position.z / gl_Position.z * 0.65 * smoothstep(0.0, 0.2, fract(positionInfo.w)) * uParticleSize;\n\n}\n"),
                fragmentShader: a("#define GLSLIFY 1\n// chunk(common);\n// chunk(logdepthbuf_pars_fragment);\n\nvec4 pack_depth( const in float depth ) {\n\n     const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n     const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n     vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );\n     res -= res.xxyz * bit_mask;\n     return res;\n\n}\n\nvoid main() {\n\n    if(length(gl_PointCoord.xy - 0.5) > 0.5) discard;\n      // chunk(logdepthbuf_fragment);\n\n     #ifdef USE_LOGDEPTHBUF_EXT\n\n           gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );\n\n     #else\n\n           gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n\n     #endif\n\n      //gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );\n      //float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );\n      //gl_FragData[ 0 ] = pack_depth( z );\n      //gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );\n\n}\n"),
                blending: i.NoBlending,
                depthTest: !0,
                depthWrite: !0
            }), _.castShadow = !0, _.customDepthMaterial = g
        }, n.resize = function (e, t) {
            T = e, D = t, A.set(e, t), y.setSize(e, t), w.setSize(e, t), E.setSize(e, t)
        }, n.preRender = function () {
            b.add(_);
            var e = d.autoClearColor, t = d.getClearColor().getHex(), n = d.getClearAlpha();
            d.setClearColor(0, 0), d.clearTarget(y, !0, !0, !0), _.material = y.material, y.material.uniforms.uTexturePrevPosition.value = l.prevPositionRenderTarget, y.material.uniforms.uTexturePosition.value = l.positionRenderTarget, y.material.uniforms.uParticleSize.value = r.particleSize, d.render(b, f, y), s.skipMatrixUpdate || y.material.uniforms.uPrevModelViewMatrix.value.copy(_.modelViewMatrix), d.setClearColor(0, 0), d.clearTarget(w, !0, !0, !0), _.material = w.material, w.material.uniforms.uTexturePosition.value = l.positionRenderTarget, w.material.uniforms.uParticleSize.value = r.particleSize, d.render(b, f, w);
            var o = r.blur;
            o && (S.uniforms.uOffset.value = o / T, C.uniforms.uOffset.value = o / D, d.clearTarget(E, !0, !0, !0), c.material = S, d.render(v, h, E), d.clearTarget(w, !0, !0, !0), c.material = C, d.render(v, h, w), c.material = x), d.setClearColor(t, n), d.autoClearColor = e, d.setViewport(0, 0, T, D), _.material = r.ignoredMaterial, g.uniforms.uTexturePosition.value = l.positionRenderTarget, g.uniforms.uParticleSize.value = r.particleSize, m.add(_)
        }, n.update = function (e, t) {
            var n = d.autoClearColor, o = d.getClearColor().getHex(), i = d.getClearAlpha();
            d.autoClearColor = !1, x.uniforms.uColor1.value.setStyle(r.color1), x.uniforms.uColor2.value.setStyle(r.color2), x.uniforms.spotShadowMap.value = [u.spot.shadow.map], x.uniforms.spotShadowMatrix.value = [u.spot.shadow.matrix], x.uniforms.uCameraRotationInverse.value.extractRotation(f.matrixWorld), x.uniforms.uProjectMatrixInverse.value.getInverse(f.projectionMatrix), d.render(v, h, e), d.setClearColor(o, i), d.autoClearColor = n
        };
        var d, f, m, p, v, h, g, _, x, b, y, w, S, C, E, A, T, D, R = r.simulatorTextureWidth,
            z = r.simulatorTextureHeight, M = R * z
    }, {32: 32, 35: 35, 42: 42, 46: 46, 49: 49, 51: 51}], 37: [function (e, t, n) {
        function o() {
        }

        var r = e(32), i = e(40), a = e(33), s = e(22);
        t.exports = o;
        var l = o.prototype;
        l.init = function (e) {
            s(this, {
                uniforms: {
                    u_texture: {type: "t", value: undefined},
                    u_resolution: {type: "v2", value: i.resolution},
                    u_aspect: {type: "f", value: 1}
                }, enabled: !0, vertexShader: "", fragmentShader: "", isRawMaterial: !0, addRawShaderPrefix: !0
            }, e), this.vertexShader || (this.vertexShader = this.isRawMaterial ? a.vertexShader : u), this.addRawShaderPrefix && this.isRawMaterial && (this.vertexShader = a.rawShaderPrefix + this.vertexShader, this.fragmentShader = a.rawShaderPrefix + this.fragmentShader), this.material = new r[this.isRawMaterial ? "RawShaderMaterial" : "ShaderMaterial"]({
                uniforms: this.uniforms,
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader
            })
        }, l.resize = function (e, t) {
        }, l.render = function (e, t, n) {
            return this.uniforms.u_texture.value = t, this.uniforms.u_aspect.value = this.uniforms.u_resolution.value.x / this.uniforms.u_resolution.value.y, i.render(this.material, n)
        };
        var u = "#define GLSLIFY 1\nvarying vec2 v_uv;\n\nvoid main() {\n    v_uv = uv;\n    gl_Position = vec4( position, 1.0 );\n}\n"
    }, {22: 22, 32: 32, 33: 33, 40: 40}], 38: [function (e, t, n) {
        var o, r = e(37), i = e(40), a = e(33), s = e(32), l = (n = t.exports = new r, r.prototype);
        n.init = function () {
            l.init.call(this, {
                uniforms: {u_blurTexture: {type: "t", value: o}, u_amount: {type: "f", value: 0}},
                fragmentShader: "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform sampler2D u_blurTexture;\n\nuniform float u_amount;\n\nvarying vec2 v_uv;\n\nvoid main()\n{\n\n    vec3 baseColor = texture2D(u_texture, v_uv).rgb;\n    vec3 blurColor = texture2D(u_blurTexture, v_uv).rgb;\n    vec3 color = mix(baseColor, 1.0 - ((1.0 - baseColor) * (1.0 - blurColor)), u_amount);\n    // vec3 color = mix(baseColor, max(baseColor, blurColor), u_amount);\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"
            }), u = new s.RawShaderMaterial({
                uniforms: {
                    u_texture: {type: "t", value: o},
                    u_delta: {type: "v2", value: new s.Vector2}
                },
                vertexShader: a.vertexShader,
                fragmentShader: a.rawShaderPrefix + "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform vec2 u_delta;\n\nvarying vec2 v_uv;\n\nvoid main()\n{\n\n    vec3 color = texture2D( u_texture, v_uv ).rgb * 0.1633;\n\n    vec2 delta = u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.1531;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.1531;\n\n    delta += u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.12245;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.12245;\n\n    delta += u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.0918;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.0918;\n\n    delta += u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.051;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.051;\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"
            })
        }, n.render = function (e, t, o) {
            var r = i.getRenderTarget(c), s = i.getRenderTarget(c);
            i.releaseRenderTarget(r, s);
            var d = n.blurRadius;
            u.uniforms.u_texture.value = t, u.uniforms.u_delta.value.set(d / i.resolution.x, 0), a.render(u, r), d = n.blurRadius, u.uniforms.u_texture.value = r, u.uniforms.u_delta.value.set(0, d / i.resolution.y), a.render(u, s), this.uniforms.u_blurTexture.value = s, this.uniforms.u_amount.value = n.amount, l.render.call(this, e, t, o)
        }, n.blurRadius = 1, n.amount = .3;
        var u, c = 1
    }, {32: 32, 33: 33, 37: 37, 40: 40}], 39: [function (e, t, n) {
        var o, r, i, a, s = e(49), l = e(37), u = e(40), c = e(33), d = e(32),
            f = (n = t.exports = new l, l.prototype);
        n.init = function () {
            i = c.createRenderTarget(1, 1, d.RGBAFormat, d.FloatType), f.init.call(this, {
                uniforms: {
                    u_distance: {
                        type: "t",
                        value: o
                    },
                    u_dofDistance: {type: "f", value: 0},
                    u_delta: {type: "v2", value: new d.Vector2},
                    u_mouse: {type: "v2", value: s.mouse},
                    u_amount: {type: "f", value: 1}
                },
                fragmentShader: "#define GLSLIFY 1\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\nuniform sampler2D u_distance;\nuniform vec2 u_mouse;\nuniform float u_dofDistance;\nuniform vec2 u_delta;\nuniform float u_amount;\n\nvoid main() {\n\n    vec2 resolutionInverted = 1.0 / u_resolution;\n    vec2 uv = gl_FragCoord.xy * resolutionInverted;\n\n    float centerZ = texture2D( u_distance, uv ).a;\n    // float mouseCenterZ = texture2D( u_distance, (u_mouse + 1.0) * 0.5 ).r;\n    // mouseCenterZ = mix(mouseCenterZ, uCameraDistance, step(-0.1, -mouseCenterZ));\n    // float bias = smoothstep(0.0, 300.0, distance(centerZ, mouseCenterZ));\n\n    float bias = smoothstep(0.0, 300.0, distance(centerZ, u_dofDistance));\n\n    vec2 d = u_delta * resolutionInverted * bias * u_amount;\n\n    vec4 sum = vec4(0.0);\n    vec4 center = texture2D( u_texture, uv );\n    d *= length(center.xyz);\n    sum += texture2D( u_texture, ( uv - d * 4. ) ) * 0.051;\n    sum += texture2D( u_texture, ( uv - d * 3. ) ) * 0.0918;\n    sum += texture2D( u_texture, ( uv - d * 2. ) ) * 0.12245;\n    sum += texture2D( u_texture, ( uv - d * 1. ) ) * 0.1531;\n    sum += center * 0.1633;\n    sum += texture2D( u_texture, ( uv + d * 1. ) ) * 0.1531;\n    sum += texture2D( u_texture, ( uv + d * 2. ) ) * 0.12245;\n    sum += texture2D( u_texture, ( uv + d * 3. ) ) * 0.0918;\n    sum += texture2D( u_texture, ( uv + d * 4. ) ) * 0.051;\n\n    gl_FragColor = sum;\n}\n"
            }), a = new Float32Array(4), r = new d.RawShaderMaterial({
                uniforms: {
                    u_distance: {type: "t", value: o},
                    u_mouse: {type: "v2", value: s.mouse}
                },
                transparent: !0,
                blending: d.NoBlending,
                vertexShader: this.vertexShader,
                fragmentShader: c.rawShaderPrefix + "#define GLSLIFY 1\nuniform vec2 u_mouse;\n\nuniform sampler2D u_distance;\n\nvoid main() {\n\n    gl_FragColor = vec4(texture2D( u_distance, (u_mouse + 1.0) * 0.5).a, 0.0, 0.0, 1.0);\n\n}\n"
            })
        }, n.render = function (e, t, n) {
            var o = u.camera.position.length();
            s.dofMouse ? (r.uniforms.u_distance.value = s.distanceMap, c.render(r, i), u.renderer.readRenderTargetPixels(i, 0, 0, 1, 1, a), o = a[0] || o) : o = s.dofFocusZ;
            var l = this.uniforms, d = l.u_dofDistance.value;
            l.u_dofDistance.value += .1 * (o - d), l.u_amount.value = s.dof, l.u_distance.value = s.distanceMap, l.u_delta.value.set(1, 0), t = f.render.call(this, e, t), l.u_delta.value.set(0, 1), f.render.call(this, e, t, n)
        }
    }, {32: 32, 33: 33, 37: 37, 40: 40, 49: 49}], 40: [function (e, t, n) {
        function o(e) {
            return e.enabled
        }

        function r() {
            var e = f;
            f = n.toRenderTarget = d, d = n.fromRenderTarget = e
        }

        function i(e) {
            return p[e] || (p[e] = [])
        }

        var a, s = e(32), l = e(33), u = e(22);
        n.init = function (e, t, o) {
            (d = n.fromRenderTarget = l.createRenderTarget()).depthBuffer = !0, d.stencilBuffer = !0, (f = n.toRenderTarget = l.createRenderTarget()).depthBuffer = !0, f.stencilBuffer = !0, m = n.resolution = new s.Vector2, n.renderer = e, n.scene = t, n.camera = o
        }, n.resize = function (e, t) {
            m.set(e, t), d.setSize(e, t), f.setSize(e, t), n.camera.aspect = e / t, n.camera.updateProjectionMatrix(), n.renderer.setSize(e, t);
            for (var o = 0, r = c.length; r > o; o++) c[o].resize(e, t)
        }, n.renderQueue = function (e) {
            var t = c.filter(o);
            if (t.length) {
                n.renderer.render(n.scene, n.camera, f), r();
                for (var i = 0, a = t.length; a > i; i++) t[i].render(e, d, i === a - 1)
            } else n.renderer.render(n.scene, n.camera)
        }, n.renderScene = function (e, t, o) {
            t = t || n.scene, o = o || n.camera, e ? n.renderer.render(t, o, e) : n.renderer.render(t, o)
        }, n.render = function (e, t) {
            return l.render(e, t ? a : f), r(), d
        }, n.swapRenderTarget = r, n.getRenderTarget = function (e, t) {
            e = e || 0, t = +(t || 0);
            var n, o = m.x >> e, r = m.y >> e, a = e + "_" + t, c = i(a);
            return c.length ? (n = c.pop(), u(n, h)) : ((n = l.createRenderTarget(o, r, t ? s.RGBAFormat : s.RGBFormat))._listId = a, v[a] = v[a] || 0), v[a]++, n.width === o && n.height === r || n.setSize(o, r), n
        }, n.releaseRenderTarget = function (e) {
            for (var t, n, o, r, a, s = arguments, l = 0, u = s.length; u > l; l++) {
                for (a = i(r = (e = s[l])._listId), t = !1, v[r]--, n = 0, o = a.length; o > n; n++) if (a[n] === e) {
                    t = !0;
                    break
                }
                t || a.push(e)
            }
        }, n.resolution = a;
        var c = n.queue = [], d = n.fromRenderTarget = a, f = n.toRenderTarget = a, m = n.resolution = a, p = {},
            v = {}, h = {depthBuffer: !1, texture: {generateMipmaps: !1}};
        n.renderer = a, n.scene = a, n.camera = a
    }, {22: 22, 32: 32, 33: 33}], 41: [function (e, t, n) {
        var o = e(37);
        t.exports = new o;
        var r = o.prototype;
        t.exports.init = function (e) {
            var t = e ? "#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform vec2 u_resolution;\n\nvarying vec2 v_uv;\n\n//To save 9 dependent texture reads, you can compute\n//these in the vertex shader and use the optimized\n//frag.glsl function in your frag shader. \n\n//This is best suited for mobile devices, like iOS.\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n\t\t\tout vec2 v_rgbNW, out vec2 v_rgbNE,\n\t\t\tout vec2 v_rgbSW, out vec2 v_rgbSE,\n\t\t\tout vec2 v_rgbM) {\n\tvec2 inverseVP = 1.0 / resolution.xy;\n\tv_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n\tv_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n\tv_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n\tv_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n\tv_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main() {\n\n   vec2 fragCoord = uv * u_resolution;\n   texcoords(fragCoord, u_resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n    v_uv = uv;\n    gl_Position = vec4( position, 1.0 );\n\n}\n" : "",
                n = e ? '#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\n\nvarying vec2 v_uv;\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent \n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE, \n            vec2 v_rgbSW, vec2 v_rgbSE, \n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n    vec2 fragCoord = v_uv * u_resolution;\n\n    gl_FragColor = fxaa(u_texture, fragCoord, u_resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n' : '#define GLSLIFY 1\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent \n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE, \n            vec2 v_rgbSW, vec2 v_rgbSE, \n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n//To save 9 dependent texture reads, you can compute\n//these in the vertex shader and use the optimized\n//frag.glsl function in your frag shader. \n\n//This is best suited for mobile devices, like iOS.\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n\t\t\tout vec2 v_rgbNW, out vec2 v_rgbNE,\n\t\t\tout vec2 v_rgbSW, out vec2 v_rgbSE,\n\t\t\tout vec2 v_rgbM) {\n\tvec2 inverseVP = 1.0 / resolution.xy;\n\tv_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n\tv_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n\tv_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n\tv_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n\tv_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvec4 apply(sampler2D tex, vec2 fragCoord, vec2 resolution) {\n\tmediump vec2 v_rgbNW;\n\tmediump vec2 v_rgbNE;\n\tmediump vec2 v_rgbSW;\n\tmediump vec2 v_rgbSE;\n\tmediump vec2 v_rgbM;\n\n\t//compute the texture coords\n\ttexcoords(fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\t\n\t//compute FXAA\n\treturn fxaa(tex, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n\nvoid main() {\n    gl_FragColor = apply(u_texture, gl_FragCoord.xy, u_resolution);\n}\n';
            r.init.call(this, {uniforms: {}, vertexShader: t, fragmentShader: n})
        }
    }, {37: 37}], 42: [function (e, t, n) {
        function o(e, t) {
            if (e ? (h = e, g = t) : (e = h, t = g), !n.useSampling) {
                var o = ~~(e * n.linesRenderTargetScale), r = ~~(t * n.linesRenderTargetScale);
                i.setSize(o, r);
                var a, s = !n.useDithering, l = s ? o * r : function (e, t) {
                    return 1 & e && 1 & t ? ((e - 1) * (t - 1) >> 1) + (e >> 1) + (t >> 1) : e * t >> 1
                }(o, r);
                l > u.length / 6 && (u = new Float32Array(6 * l), c = new w.BufferAttribute(u, 3), d.removeAttribute("position"), d.addAttribute("position", c));
                var f, m, _ = 0, x = o * r;
                for (a = 0; x > a; a++) f = a % o, m = ~~(a / o), (s || f + (1 & m) & 1) && (u[_ + 0] = u[_ + 3] = (f + .5) / o, u[_ + 1] = u[_ + 4] = (m + .5) / r, u[_ + 2] = 0, u[_ + 5] = .001 + .999 * Math.random(), _ += 6);
                c.needsUpdate = !0, d.drawRange.count = 2 * l
            }
            p = n.useDithering, v = n.useSampling
        }

        var r, i, a, s, l, u, c, d, f, m, p, v, h, g, _ = e(49), x = e(37), b = e(40), y = e(33), w = e(32),
            S = (n = t.exports = new x, x.prototype);
        n.init = function (e) {
            var t = b.renderer.getContext();
            t.getExtension("OES_texture_float") && t.getExtension("OES_texture_float_linear") || alert("no float linear support"), i = y.createRenderTarget(1, 1, w.RGBAFormat, w.FloatType), (s = new w.Camera).position.z = 1, l = new w.Scene, S.init.call(this, {
                uniforms: {
                    u_lineAlphaMultiplier: {
                        type: "f",
                        value: 1
                    }, u_linesTexture: {type: "t", value: i}, u_motionTexture: {type: "t", value: _.distanceMap}
                },
                fragmentShader: "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform sampler2D u_linesTexture;\nuniform float u_lineAlphaMultiplier;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec3 base = texture2D( u_texture, v_uv.xy ).rgb;\n    vec4 lines = texture2D( u_linesTexture, v_uv.xy );\n\n    vec3 color = (base + lines.rgb * u_lineAlphaMultiplier) / (lines.a * u_lineAlphaMultiplier + 1.0);\n\n    gl_FragColor = vec4( color, 1.0 );\n\n}\n"
            }), u = [], d = new w.BufferGeometry, f = new w.RawShaderMaterial({
                uniforms: {
                    u_texture: {type: "t", value: r},
                    u_motionTexture: {type: "t", value: _.distanceMap},
                    u_resolution: {type: "v2", value: b.resolution},
                    u_maxDistance: {type: "f", value: 1},
                    u_jitter: {type: "f", value: .3},
                    u_fadeStrength: {type: "f", value: 1},
                    u_motionMultiplier: {type: "f", value: 1},
                    u_depthTest: {type: "f", value: 0},
                    u_opacity: {type: "f", value: 1},
                    u_leaning: {type: "f", value: .5},
                    u_depthBias: {type: "f", value: .01}
                },
                vertexShader: y.rawShaderPrefix + "#define GLSLIFY 1\nattribute vec3 position;\n\nuniform sampler2D u_texture;\nuniform sampler2D u_motionTexture;\n\nuniform vec2 u_resolution;\nuniform float u_maxDistance;\nuniform float u_jitter;\nuniform float u_motionMultiplier;\nuniform float u_leaning;\n\nvarying vec3 v_color;\nvarying float v_ratio;\nvarying float v_depth;\nvarying vec2 v_uv;\n\nvoid main() {\n\n    v_color = texture2D( u_texture, position.xy ).rgb;\n\n    float side = step(0.001, position.z);\n\n    v_ratio = side;\n\n    vec3 motion = texture2D( u_motionTexture, position.xy ).xyz;\n    v_depth = motion.z;\n\n    vec2 offset = motion.xy * u_resolution * u_motionMultiplier;\n    float offsetDistance = length(offset);\n    if(offsetDistance > u_maxDistance) {\n        offset = normalize(offset) * u_maxDistance;\n    }\n\n    vec2 pos = position.xy * 2.0 - 1.0 - offset / u_resolution * 2.0 * (1.0 - position.z * u_jitter) * (side - u_leaning);\n    v_uv = pos * 0.5 + 0.5;\n\n    gl_Position = vec4( pos, 0.0, 1.0 );\n\n}\n",
                fragmentShader: y.rawShaderPrefix + "#define GLSLIFY 1\nuniform sampler2D u_motionTexture;\nuniform float u_depthTest;\nuniform float u_opacity;\nuniform float u_leaning;\nuniform float u_fadeStrength;\nuniform float u_depthBias;\nuniform float u_useDepthWeight;\n\nvarying vec3 v_color;\nvarying float v_ratio;\nvarying float v_depth;\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec3 motion = texture2D( u_motionTexture, v_uv ).xyz;\n\n    float alpha = smoothstep(0.0, u_leaning, v_ratio) * (1.0 - smoothstep (u_leaning, 1.0, v_ratio));\n\n    alpha = pow(alpha, u_fadeStrength) * u_opacity;\n\n    if(alpha < 0.00392157) {\n        discard;\n    }\n\n    float threshold = v_depth * step(0.0001, motion.z);\n    alpha *= max(1.0 - u_depthTest, smoothstep(threshold - u_depthBias, threshold, motion.z));\n\n    gl_FragColor = vec4( v_color * alpha, alpha );\n\n}\n",
                blending: w.CustomBlending,
                blendEquation: w.AddEquation,
                blendSrc: w.OneFactor,
                blendDst: w.OneFactor,
                blendEquationAlpha: w.AddEquation,
                blendSrcAlpha: w.OneFactor,
                blendDstAlpha: w.OneFactor,
                depthTest: !1,
                depthWrite: !1,
                transparent: !0
            }), a = new w.LineSegments(d, f), l.add(a), m = new w.RawShaderMaterial({
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: r
                    },
                    u_motionTexture: {type: "t", value: _.distanceMap},
                    u_resolution: {type: "v2", value: b.resolution},
                    u_maxDistance: {type: "f", value: 1},
                    u_fadeStrength: {type: "f", value: 1},
                    u_motionMultiplier: {type: "f", value: 1},
                    u_leaning: {type: "f", value: .5}
                },
                defines: {SAMPLE_COUNT: e || 21},
                vertexShader: this.material.vertexShader,
                fragmentShader: y.rawShaderPrefix + "#define SAMPLE_COUNT " + (e || 21) + "\n#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform sampler2D u_motionTexture;\n\nuniform vec2 u_resolution;\nuniform float u_maxDistance;\nuniform float u_motionMultiplier;\nuniform float u_leaning;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 motion = texture2D( u_motionTexture, v_uv ).xy;\n\n    vec2 offset = motion * u_resolution * u_motionMultiplier;\n    float offsetDistance = length(offset);\n    if(offsetDistance > u_maxDistance) {\n        offset = normalize(offset) * u_maxDistance;\n    }\n    vec2 delta = - offset / u_resolution * 2.0 / float(SAMPLE_COUNT);\n    vec2 pos = v_uv - delta * u_leaning * float(SAMPLE_COUNT);\n    vec3 color = vec3(0.0);\n\n    for(int i = 0; i < SAMPLE_COUNT; i++) {\n        color += texture2D( u_texture, pos ).rgb;\n        pos += delta;\n    }\n\n    gl_FragColor = vec4( color / float(SAMPLE_COUNT), 1.0 );\n\n}\n"
            })
        }, n.resize = o, n.render = function (e, t, r) {
            (p !== n.useDithering || v !== n.useSampling) && o();
            var a = n.useSampling, u = y.getColorState();
            b.renderer.setClearColor(0, 1), a || (f.uniforms.u_maxDistance.value = n.maxDistance, f.uniforms.u_jitter.value = n.jitter, f.uniforms.u_fadeStrength.value = n.fadeStrength, f.uniforms.u_motionMultiplier.value = n.motionMultiplier, f.uniforms.u_depthTest.value = n.depthTest, f.uniforms.u_opacity.value = n.opacity, f.uniforms.u_leaning.value = Math.max(.001, Math.min(.999, n.leaning)), f.uniforms.u_depthBias.value = Math.max(1e-5, n.depthBias), f.uniforms.u_texture.value = t, b.renderer.setClearColor(0, 0), b.renderer.clearTarget(i, !0, !0, !0), b.renderer.render(l, s, i)), y.setColorState(u), a ? (m.uniforms.u_maxDistance.value = n.maxDistance, m.uniforms.u_fadeStrength.value = n.fadeStrength, m.uniforms.u_motionMultiplier.value = n.motionMultiplier, m.uniforms.u_leaning.value = Math.max(.001, Math.min(.999, n.leaning)), m.uniforms.u_texture.value = t, b.render(m, r)) : (this.uniforms.u_lineAlphaMultiplier.value = 1 + n.useDithering, S.render.call(this, e, t, r))
        }, n.useSampling = !1, n.skipMatrixUpdate = !1, n.fadeStrength = 1, n.motionMultiplier = 1, n.maxDistance = 100, n.leaning = .5, n.jitter = 0, n.opacity = 1, n.depthBias = .002, n.depthTest = !1, n.useDithering = !1, n.linesRenderTargetScale = 1 / 3
    }, {32: 32, 33: 33, 37: 37, 40: 40, 49: 49}], 43: [function (e, t, n) {
        var o = e(37), r = (e(40), e(33), e(36)), i = (n = (e(32), t.exports = new o), o.prototype);
        n.init = function () {
            i.init.call(this)
        }, n.render = function (e, t, n) {
            r.update(t)
        }
    }, {32: 32, 33: 33, 36: 36, 37: 37, 40: 40}], 44: [function (e, t, n) {
        var o, r = e(40), i = e(41), a = e(38), s = e(45), l = e(42), u = e(39), c = e(43), d = e(33);
        n.init = function (e, t, n) {
            e, t, o = o, r.init(e, t, n), c.init(), r.queue.push(c), i.init(), r.queue.push(i), u.init(), r.queue.push(u), l.init(), r.queue.push(l), a.init(), r.queue.push(a), s.init(), r.queue.push(s)
        }, n.resize = function (e, t) {
            r.resize(e, t)
        }, n.render = function (e) {
            r.renderQueue(e), n.visualizeTarget && d.copy(n.visualizeTarget)
        }, n.visualizeTarget = undefined
    }, {33: 33, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 45: 45}], 45: [function (e, t, n) {
        var o = e(37);
        t.exports = new o;
        var r = o.prototype;
        t.exports.init = function () {
            r.init.call(this, {
                uniforms: {u_reduction: {type: "f", value: .3}, u_boost: {type: "f", value: 1.2}},
                fragmentShader: "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform vec2 u_resolution;\nuniform float u_aspect;\n\nuniform float u_reduction;\nuniform float u_boost;\n\nvarying vec2 v_uv;\n\nfloat range(float vmin, float vmax, float value) {\n  return (value - vmin) / (vmax - vmin);\n}\n\nvoid main() {\n\n  vec4 color = texture2D( u_texture, v_uv );\n\n  vec2 center = u_resolution * 0.5;\n  float vignette = range(0.25, 1.0, length( v_uv - vec2(0.5) ));\n  vignette = u_boost - vignette * u_reduction;\n\n  color.rgb *= vignette;\n  gl_FragColor = color;\n\n}\n"
            })
        }
    }, {37: 37}], 46: [function (e, t, n) {
        function o(e, t) {
            d.material = i, i.uniforms.texture.value = e, c.render(f, m, t)
        }

        var r, i, a, s, l, u, c, d, f, m, p = e(49), v = e(32), h = e(47), g = e(33), _ = e(51),
            x = n.TEXTURE_WIDTH = p.simulatorTextureWidth, b = n.TEXTURE_HEIGHT = p.simulatorTextureHeight,
            y = n.AMOUNT = x * b;
        n.init = function (e) {
            c = e, new v.Vector3;
            var t = "precision " + p.capablePrecision + " float;\n", n = c.getContext();
            return n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? n.getExtension("OES_texture_float") ? (f = new v.Scene, (m = new v.Camera).position.z = 1, i = new v.RawShaderMaterial({
                uniforms: {
                    resolution: {
                        type: "v2",
                        value: new v.Vector2(x, b)
                    }, texture: {type: "t", value: r}
                },
                vertexShader: t + _("#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n"),
                fragmentShader: t + _("#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    gl_FragColor = texture2D( texture, uv );\n}\n")
            }), a = new v.RawShaderMaterial({
                uniforms: {
                    resolution: {type: "v2", value: new v.Vector2(x, b)},
                    texturePosition: {type: "t", value: r},
                    textureDefaultPosition: {type: "t", value: r},
                    speed: {type: "f", value: 0},
                    curlSize: {type: "f", value: 0},
                    dieSpeed: {type: "f", value: 0},
                    deltaRatio: {type: "f", value: 1},
                    radius: {type: "f", value: 0},
                    time: {type: "f", value: 0},
                    initAnimation: {type: "f", value: 0},
                    uBoundBox: {type: "v3", value: h.boundBox},
                    uSliceInfo: {type: "v4", value: h.sliceInfo},
                    uTextureVolume: {type: "t", value: h.renderTarget},
                    uEmitterDistanceRatio: {type: "f", value: 0},
                    uEmitterSpeed: {type: "f", value: 0}
                },
                vertexShader: t + _("#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n"),
                fragmentShader: t + _("#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texturePosition;\nuniform sampler2D textureDefaultPosition;\nuniform float time;\nuniform float speed;\nuniform float curlSize;\nuniform float dieSpeed;\nuniform float radius;\nuniform float initAnimation;\nuniform float deltaRatio;\n\nuniform vec3 uBoundBox;\nuniform float uEmitterDistanceRatio;\nuniform float uEmitterSpeed;\n\nuniform sampler2D uTextureVolume;\nuniform vec4 uSliceInfo;\n\nvec4 mod289(vec4 x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n    vec4 p,s;\n\n    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n    s = vec4(lessThan(p, vec4(0.0)));\n    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n    return p;\n}\n\n#define F4 0.309016994374947451\n\nvec4 simplexNoiseDerivatives (vec4 v) {\n    const vec4  C = vec4( 0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);\n\n    vec4 i  = floor(v + dot(v, vec4(F4)) );\n    vec4 x0 = v -   i + dot(i, C.xxxx);\n\n    vec4 i0;\n    vec3 isX = step( x0.yzw, x0.xxx );\n    vec3 isYZ = step( x0.zww, x0.yyz );\n    i0.x = isX.x + isX.y + isX.z;\n    i0.yzw = 1.0 - isX;\n    i0.y += isYZ.x + isYZ.y;\n    i0.zw += 1.0 - isYZ.xy;\n    i0.z += isYZ.z;\n    i0.w += 1.0 - isYZ.z;\n\n    vec4 i3 = clamp( i0, 0.0, 1.0 );\n    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n    vec4 x1 = x0 - i1 + C.xxxx;\n    vec4 x2 = x0 - i2 + C.yyyy;\n    vec4 x3 = x0 - i3 + C.zzzz;\n    vec4 x4 = x0 + C.wwww;\n\n    i = mod289(i);\n    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n    vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n    vec4 p0 = grad4(j0,   ip);\n    vec4 p1 = grad4(j1.x, ip);\n    vec4 p2 = grad4(j1.y, ip);\n    vec4 p3 = grad4(j1.z, ip);\n    vec4 p4 = grad4(j1.w, ip);\n\n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    p4 *= taylorInvSqrt(dot(p4,p4));\n\n    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point\n    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));\n\n    vec3 m0 = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0); //(0.5 - x^2) where x is the distance\n    vec2 m1 = max(0.5 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);\n\n    vec3 temp0 = -6.0 * m0 * m0 * values0;\n    vec2 temp1 = -6.0 * m1 * m1 * values1;\n\n    vec3 mmm0 = m0 * m0 * m0;\n    vec2 mmm1 = m1 * m1 * m1;\n\n    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;\n    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;\n    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;\n    float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;\n\n    return vec4(dx, dy, dz, dw) * 49.0;\n}\n\nvec3 curl( in vec3 p, in float noiseTime, in float persistence ) {\n\n    vec4 xNoisePotentialDerivatives = vec4(0.0);\n    vec4 yNoisePotentialDerivatives = vec4(0.0);\n    vec4 zNoisePotentialDerivatives = vec4(0.0);\n\n    for (int i = 0; i < 3; ++i) {\n\n        float twoPowI = pow(2.0, float(i));\n        float scale = 0.5 * twoPowI * pow(persistence, float(i));\n\n        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;\n        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;\n        zNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;\n    }\n\n    return vec3(\n        zNoisePotentialDerivatives[1] - yNoisePotentialDerivatives[2],\n        xNoisePotentialDerivatives[2] - zNoisePotentialDerivatives[0],\n        yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[1]\n    );\n\n}\n\n// http://jsfiddle.net/greggman/gSnHZ/\n\n// vec2 computeSliceOffset(float slice, float slicesPerRow, vec2 sliceSize) {\n//  return sliceSize * vec2(mod(slice, slicesPerRow), floor(slice / slicesPerRow));\n// }\n\nvec2 computeSliceOffset(float slice, vec4 sliceInfo) {\n    return sliceInfo.zw * vec2(mod(slice, sliceInfo.y), floor(slice * sliceInfo.z));\n}\n\n// sliceInfo.x = size aka volumeSliceColumn * volumeSliceRow\n// sliceInfo.y = slicesPerRow\n// sliceInfo.z = 1.0 / slicesPerRow\n// sliceInfo.w = 1.0 / floor((sliceInfo.x + sliceInfo.y - 1.0) * sliceInfo.z);\n\nvec4 sampleAs3DTexture(sampler2D tex, vec3 texCoord, vec4 sliceInfo) {\n    // vec4 sampleAs3DTexture(sampler2D tex, vec3 texCoord, float size, float slicesPerRow, vec2 sliceSize) {\n    // float numRows = floor((size + slicesPerRow - 1.0) / slicesPerRow);\n    float slice = texCoord.z * sliceInfo.x;\n    float sliceZ = floor(slice);\n\n    // vec2 sliceSize = vec2(1.0 / slicesPerRow, 1.0 / numRows);\n\n    vec2 slice0Offset = computeSliceOffset(sliceZ, sliceInfo);\n    vec2 slice1Offset = computeSliceOffset(sliceZ + 1.0, sliceInfo);\n\n    vec2 slicePixelSize = sliceInfo.zw / sliceInfo.x;\n\n    vec2 uv = slicePixelSize * 0.5 + texCoord.xy * (sliceInfo.zw - slicePixelSize);\n    vec4 slice0Color = texture2D(tex, slice0Offset + uv);\n    vec4 slice1Color = texture2D(tex, slice1Offset + uv);\n    return mix(slice0Color, slice1Color, fract(slice));\n}\n\nvec3 getColor3(in vec3 pos) {\n    return sampleAs3DTexture( uTextureVolume, floor(pos + vec3(uBoundBox.x * 0.5, 200.0, uBoundBox.z * 0.5)) / uBoundBox, uSliceInfo).rgb;\n}\n\nvoid main() {\n\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 positionInfo = texture2D( texturePosition, uv );\n    vec3 position = positionInfo.xyz * smoothstep(0.0, 0.3, initAnimation);\n    float color;\n\n    float life = fract(positionInfo.w) - dieSpeed * deltaRatio;\n    float side = step(0.5, uv.x) * 2.0 - 1.0;\n    float initForce = pow(initAnimation, 2.5);\n\n    if(life < 0.001) {\n        positionInfo = texture2D( textureDefaultPosition, uv );\n        position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2) * radius;\n        position.x += side * uBoundBox.x * 0.5 * uEmitterDistanceRatio * initForce;\n        color = side * 0.5 + 0.5;\n        life = 0.5 + fract(positionInfo.w * 21.4131 + time) * 0.499;\n    } else {\n        position.x -= speed * side * uEmitterSpeed * smoothstep(-1.0, -0.5, -life) * initForce * deltaRatio;\n        position += curl(position * curlSize, time * 2.3, 1.2 + (1.0 - life) * 0.35) * speed * (1.75 - life) * deltaRatio;\n\n        vec3 color3 = getColor3(positionInfo.xyz);\n\n        // color3 += getColor3(positionInfo.xyz + vec3(1.0, 0.0, 0.0));\n        // color3 += getColor3(positionInfo.xyz + vec3(-1.0, 0.0, 0.0));\n        // color3 += getColor3(positionInfo.xyz + vec3(0.0, 1.0, 0.0));\n        // color3 += getColor3(positionInfo.xyz + vec3(0.0, -1.0, 0.0));\n        // color3 += getColor3(positionInfo.xyz + vec3(0.0, 0.0, 1.0));\n        // color3 += getColor3(positionInfo.xyz + vec3(0.0, 0.0, -1.0));\n\n        color = clamp((color3.r - color3.g) / max(0.0, color3.b), -1.0, 1.0)  * 0.5 + 0.5;\n\n    }\n\n    life = life + floor(color * 8192.0);\n    position.xyz = clamp(position.xyz, vec3(-uBoundBox.x * 0.49, -198.0, -uBoundBox.z * 0.49), vec3(uBoundBox.x * 0.49, uBoundBox.y -198.0, uBoundBox.z * 0.49));\n    gl_FragColor = vec4(position, life);\n\n}\n"),
                blending: v.NoBlending,
                transparent: !1,
                depthWrite: !1,
                depthTest: !1
            }), d = new v.Mesh(new v.PlaneBufferGeometry(2, 2), i), f.add(d), l = new v.WebGLRenderTarget(x, b, {
                wrapS: v.ClampToEdgeWrapping,
                wrapT: v.ClampToEdgeWrapping,
                minFilter: v.NearestFilter,
                magFilter: v.NearestFilter,
                format: v.RGBAFormat,
                type: v.FloatType,
                depthWrite: !1,
                depthBuffer: !1,
                stencilBuffer: !1
            }), u = l.clone(), o(function () {
                for (var e, t, n, o, r = new Float32Array(4 * y), i = 0; y > i; i++) e = 4 * i, t = 150 * Math.random(), n = (Math.random() - .5) * Math.PI, o = Math.random() * Math.PI * 2, r[e + 0] = t * Math.cos(o) * Math.cos(n), r[e + 1] = t * Math.sin(n), r[e + 2] = t * Math.sin(o) * Math.cos(n), r[e + 3] = .002 + .998 * Math.random();
                var a = new v.DataTexture(r, x, b, v.RGBAFormat, v.FloatType);
                return a.minFilter = v.NearestFilter, a.magFilter = v.NearestFilter, a.needsUpdate = !0, a.generateMipmaps = !1, a.flipY = !1, s = a, a
            }(), l), void o(l, u)) : void alert("No OES_texture_float support for float textures!") : void alert("No support for vertex shader textures!")
        }, n.update = function (e) {
            if (e *= p.speed, p.speed || p.dieSpeed) {
                var t = g.getColorState();
                c.autoClearColor = !1, a.uniforms.curlSize.value = p.curlSize, a.uniforms.dieSpeed.value = p.dieSpeed, a.uniforms.radius.value = p.radius, a.uniforms.speed.value = p.speed, a.uniforms.initAnimation.value = n.initAnimation, a.uniforms.uEmitterDistanceRatio.value = p.emitterDistanceRatio, a.uniforms.uEmitterSpeed.value = p.emitterSpeed, a.uniforms.deltaRatio.value = p.deltaRatio, function (e) {
                    var t = l;
                    l = u, u = t, d.material = a, a.uniforms.textureDefaultPosition.value = s, a.uniforms.texturePosition.value = u, a.uniforms.time.value += .001 * e, c.render(f, m, l)
                }(e), g.setColorState(t), n.positionRenderTarget = l, n.prevPositionRenderTarget = u
            }
        }, n.positionRenderTarget = r, n.prevPositionRenderTarget = r, n.initAnimation = 0
    }, {32: 32, 33: 33, 47: 47, 49: 49, 51: 51}], 47: [function (e, t, n) {
        var o, r, i, a, s, l = e(49), u = e(32), c = e(46), d = e(51),
            f = n.TEXTURE_WIDTH = l.volumeWidth * l.volumeSliceColumn,
            m = n.TEXTURE_HEIGHT = l.volumeHeight * l.volumeSliceRow;
        n.init = function (e) {
            r = e, new u.Vector4, a = new u.Scene, (s = new u.OrthographicCamera(-f / 2, f / 2, m / 2, -m / 2, 1, 3)).position.z = 2, n.sliceInfo = new u.Vector4(l.volumeSliceColumn * l.volumeSliceRow, l.volumeSliceColumn, 1 / l.volumeSliceColumn, 1 / Math.floor((l.volumeSliceColumn * l.volumeSliceRow + l.volumeSliceColumn - 1) / l.volumeSliceColumn)), v = n.resolution = new u.Vector3(l.volumeWidth, l.volumeHeight, l.volumeDepth), (h = n.boundBox = new u.Vector3).copy(v).multiplyScalar(l.volumeScale), p = n.renderTarget = new u.WebGLRenderTarget(f, m, {
                wrapS: u.ClampToEdgeWrapping,
                wrapT: u.ClampToEdgeWrapping,
                minFilter: u.LinearFilter,
                magFilter: u.LinearFilter,
                format: u.RGBFormat,
                depthWrite: !1,
                depthBuffer: !1,
                stencilBuffer: !1
            });
            for (var t, c = l.simulatorTextureWidth, g = l.simulatorTextureHeight, _ = c * g, x = new Float32Array(3 * _), b = 0; _ > b; b++) x[(t = 3 * b) + 0] = (b % c + .5) / c, x[t + 1] = (.5 + ~~(b / c)) / g, x[t + 2] = 0;
            var y = new u.BufferGeometry;
            y.addAttribute("position", new u.BufferAttribute(x, 3));
            var w = new u.ShaderMaterial({
                uniforms: {
                    texturePosition: {type: "t", value: o},
                    resolution: {type: "v3", value: v},
                    uBoundBox: {type: "v3", value: h},
                    textureResolution: {type: "v2", value: new u.Vector2(f, m)},
                    sliceInfo: {type: "v4", value: n.sliceInfo}
                },
                vertexShader: d("#define GLSLIFY 1\n// attribute vec3 position;\n\nuniform vec3 resolution;\nuniform vec3 uBoundBox;\nuniform vec2 textureResolution;\n\nuniform sampler2D texturePosition;\nuniform vec4 sliceInfo;\n\nvarying float vColor;\n// varying float vWeight;\n\n// http://jsfiddle.net/greggman/gSnHZ/\n\n// sliceInfo.x = size aka volumeSliceColumn * volumeSliceRow\n// sliceInfo.y = slicesPerRow\n// sliceInfo.z = 1.0 / slicesPerRow\n// sliceInfo.w = 1.0 / floor((sliceInfo.x + sliceInfo.y - 1.0) * sliceInfo.z);\nvec2 coord3To2(vec3 texCoord, vec4 sliceInfo) {\n    float sliceZ = floor(texCoord.z * sliceInfo.x);\n    vec2 slicePixelSize = sliceInfo.zw / sliceInfo.x;\n    return sliceInfo.zw * vec2(mod(sliceZ, sliceInfo.y), floor(sliceZ * sliceInfo.z)) + slicePixelSize * 0.5 + texCoord.xy * (sliceInfo.zw - slicePixelSize);\n}\n\nvoid main() {\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n    vec3 position = positionInfo.xyz;\n    position = floor(position + vec3(uBoundBox.x * 0.5, 200.0, uBoundBox.z * 0.5)) / uBoundBox.y * 128.0;\n    gl_Position = vec4( (coord3To2(position / resolution, sliceInfo) * 2.0 - 1.0), 0.0, 1.0 );\n    gl_PointSize = 1.0;\n    vColor = floor(positionInfo.w) / 8192.0;\n    // vWeight = 0.01 + fract(positionInfo.w) * 0.99;\n}\n"),
                fragmentShader: d("#define GLSLIFY 1\nvarying float vColor;\n// varying float vWeight;\n\nvoid main() {\n    gl_FragColor = vec4(vColor, 1.0 - vColor, 1.0, 1.0);\n    // gl_FragColor = vec4(vColor * vWeight, (1.0 - vColor) * vWeight, vWeight, 1.0);\n}\n"),
                blending: u.AdditiveBlending,
                transparent: !1,
                depthWrite: !1,
                depthTest: !1
            });
            (i = new u.Points(y, w)).frustumCulled = !1, a.add(i)
        }, n.update = function (e) {
            var t = r.autoClearColor, n = r.getClearColor().getHex(), o = r.getClearAlpha();
            r.autoClearColor = !1, r.setClearColor(0, 0), r.clearTarget(p), r.setViewport(0, 0, f, m), i.material.uniforms.texturePosition.value = c.positionRenderTarget, r.render(a, s, p), r.setClearColor(n, o), r.autoClearColor = t, r.setViewport(0, 0, l.width, l.height)
        }, n.sliceInfo = o;
        var p = n.renderTarget = o, v = n.resolution = o, h = n.boundBox = o
    }, {32: 32, 46: 46, 49: 49, 51: 51}], 48: [function (e, t, n) {
        THREE.OrbitControls = function (e, t) {
            function n() {
                return 2 * Math.PI / 60 / 60 * u.autoRotateSpeed
            }

            function o() {
                return Math.pow(.95, u.zoomSpeed)
            }

            function r(e) {
                if (!1 !== u.enabled) {
                    e.preventDefault();
                    var t = u.domElement === document ? u.domElement.body : u.domElement;
                    if (R === D.ROTATE) {
                        if (!0 === u.noRotate) return;
                        f.set(e.clientX, e.clientY), m.subVectors(f, d), u.rotateLeft(2 * Math.PI * m.x / t.clientWidth * u.rotateSpeed), u.rotateUp(2 * Math.PI * m.y / t.clientHeight * u.rotateSpeed), d.copy(f)
                    } else if (R === D.DOLLY) {
                        if (!0 === u.noZoom) return;
                        b.set(e.clientX, e.clientY), y.subVectors(b, x), y.y > 0 ? u.dollyIn() : y.y < 0 && u.dollyOut(), x.copy(b)
                    } else if (R === D.PAN) {
                        if (!0 === u.noPan) return;
                        v.set(e.clientX, e.clientY), h.subVectors(v, p), u.pan(h.x, h.y), p.copy(v)
                    }
                    R !== D.NONE && u.update()
                }
            }

            function i() {
                !1 !== u.enabled && (document.removeEventListener("mousemove", r, !1), document.removeEventListener("mouseup", i, !1), u.dispatchEvent(N), R = D.NONE)
            }

            function a(e) {
                if (!1 !== u.enabled && !0 !== u.noZoom && R === D.NONE) {
                    e.preventDefault(), e.stopPropagation();
                    var t = 0;
                    void 0 !== e.wheelDelta ? t = e.wheelDelta : void 0 !== e.detail && (t = -e.detail), t > 0 ? u.dollyOut() : 0 > t && u.dollyIn(), u.update(), u.dispatchEvent(P), u.dispatchEvent(N)
                }
            }

            this.object = e, this.domElement = void 0 !== t ? t : document, this.rotateEaseRatio = .02, this.zoomEaseRatio = .05, this.enabled = !0, this.target = new THREE.Vector3, this.center = this.target, this.noZoom = !1, this.zoomSpeed = 1, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.noRotate = !1, this.rotateSpeed = 1, this.noPan = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.noKeys = !1, this.keys = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                BOTTOM: 40
            }, this.mouseButtons = {ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT};
            var s, l, u = this, c = 1e-6, d = new THREE.Vector2, f = new THREE.Vector2, m = new THREE.Vector2,
                p = new THREE.Vector2, v = new THREE.Vector2, h = new THREE.Vector2, g = new THREE.Vector3,
                _ = new THREE.Vector3, x = new THREE.Vector2, b = new THREE.Vector2, y = new THREE.Vector2, w = 0,
                S = 0, C = 1, E = new THREE.Vector3, A = new THREE.Vector3, T = new THREE.Quaternion,
                D = {NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5},
                R = D.NONE;
            this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom;
            var z = (new THREE.Quaternion).setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0)),
                M = z.clone().inverse(), I = {type: "change"}, P = {type: "start"}, N = {type: "end"};
            this.rotateLeft = function (e) {
                void 0 === e && (e = n()), S -= e
            }, this.rotateUp = function (e) {
                void 0 === e && (e = n()), w -= e
            }, this.panLeft = function (e) {
                var t = this.object.matrix.elements;
                g.set(t[0], t[1], t[2]), g.multiplyScalar(-e), E.add(g)
            }, this.panUp = function (e) {
                var t = this.object.matrix.elements;
                g.set(t[4], t[5], t[6]), g.multiplyScalar(e), E.add(g)
            }, this.pan = function (e, t) {
                var n = u.domElement === document ? u.domElement.body : u.domElement;
                if (u.object instanceof THREE.PerspectiveCamera) {
                    var o = u.object.position.clone().sub(u.target).length();
                    o *= Math.tan(u.object.fov / 2 * Math.PI / 180), u.panLeft(2 * e * o / n.clientHeight), u.panUp(2 * t * o / n.clientHeight)
                } else u.object instanceof THREE.OrthographicCamera ? (u.panLeft(e * (u.object.right - u.object.left) / n.clientWidth), u.panUp(t * (u.object.top - u.object.bottom) / n.clientHeight)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")
            }, this.dollyIn = function (e) {
                void 0 === e && (e = o()), u.object instanceof THREE.PerspectiveCamera ? C /= e : u.object instanceof THREE.OrthographicCamera ? (u.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * e)), u.object.updateProjectionMatrix(), u.dispatchEvent(I)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
            }, this.dollyOut = function (e) {
                void 0 === e && (e = o()), u.object instanceof THREE.PerspectiveCamera ? C *= e : u.object instanceof THREE.OrthographicCamera ? (u.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / e)), u.object.updateProjectionMatrix(), u.dispatchEvent(I)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
            }, this.update = function () {
                var e = this.object.position;
                _.copy(e).sub(this.target), _.applyQuaternion(z), s = Math.atan2(_.x, _.z), l = Math.atan2(Math.sqrt(_.x * _.x + _.z * _.z), _.y), this.autoRotate && R === D.NONE && this.rotateLeft(n());
                var t = S * this.rotateEaseRatio, o = w * this.rotateEaseRatio, r = (C - 1) * this.zoomEaseRatio;
                s += t, l += o, s = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, s)), l = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, l)), l = Math.max(c, Math.min(Math.PI - c, l));
                var i = _.length() * (1 + r);
                i = Math.max(this.minDistance, Math.min(this.maxDistance, i)), this.target.add(E), _.x = i * Math.sin(l) * Math.sin(s), _.y = i * Math.cos(l), _.z = i * Math.sin(l) * Math.cos(s), _.applyQuaternion(M), e.copy(this.target).add(_), this.object.lookAt(this.target), S -= t, w -= o, C /= 1 + r, E.set(0, 0, 0), (A.distanceToSquared(this.object.position) > c || 8 * (1 - T.dot(this.object.quaternion)) > c) && (this.dispatchEvent(I), A.copy(this.object.position), T.copy(this.object.quaternion))
            }, this.reset = function () {
                R = D.NONE, this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(I), this.update()
            }, this.getPolarAngle = function () {
                return l
            }, this.getAzimuthalAngle = function () {
                return s
            }, this.domElement.addEventListener("contextmenu", (function (e) {
                e.preventDefault()
            }), !1), this.domElement.addEventListener("mousedown", (function (e) {
                if (!1 !== u.enabled) {
                    if (e.preventDefault(), e.button === u.mouseButtons.ORBIT) {
                        if (!0 === u.noRotate) return;
                        R = D.ROTATE, d.set(e.clientX, e.clientY)
                    } else if (e.button === u.mouseButtons.ZOOM) {
                        if (!0 === u.noZoom) return;
                        R = D.DOLLY, x.set(e.clientX, e.clientY)
                    } else if (e.button === u.mouseButtons.PAN) {
                        if (!0 === u.noPan) return;
                        R = D.PAN, p.set(e.clientX, e.clientY)
                    }
                    R !== D.NONE && (document.addEventListener("mousemove", r, !1), document.addEventListener("mouseup", i, !1), u.dispatchEvent(P))
                }
            }), !1), this.domElement.addEventListener("mousewheel", a, !1), this.domElement.addEventListener("DOMMouseScroll", a, !1), this.domElement.addEventListener("touchstart", (function (e) {
                if (!1 !== u.enabled) {
                    switch (e.touches.length) {
                        case 1:
                            if (!0 === u.noRotate) return;
                            R = D.TOUCH_ROTATE, d.set(e.touches[0].pageX, e.touches[0].pageY);
                            break;
                        case 2:
                            if (!0 === u.noZoom) return;
                            R = D.TOUCH_DOLLY;
                            var t = e.touches[0].pageX - e.touches[1].pageX,
                                n = e.touches[0].pageY - e.touches[1].pageY, o = Math.sqrt(t * t + n * n);
                            x.set(0, o);
                            break;
                        case 3:
                            if (!0 === u.noPan) return;
                            R = D.TOUCH_PAN, p.set(e.touches[0].pageX, e.touches[0].pageY);
                            break;
                        default:
                            R = D.NONE
                    }
                    R !== D.NONE && u.dispatchEvent(P)
                }
            }), !1), this.domElement.addEventListener("touchend", (function () {
                !1 !== u.enabled && (u.dispatchEvent(N), R = D.NONE)
            }), !1), this.domElement.addEventListener("touchmove", (function (e) {
                if (!1 !== u.enabled) {
                    e.preventDefault(), e.stopPropagation();
                    var t = u.domElement === document ? u.domElement.body : u.domElement;
                    switch (e.touches.length) {
                        case 1:
                            if (!0 === u.noRotate) return;
                            if (R !== D.TOUCH_ROTATE) return;
                            f.set(e.touches[0].pageX, e.touches[0].pageY), m.subVectors(f, d), u.rotateLeft(2 * Math.PI * m.x / t.clientWidth * u.rotateSpeed), u.rotateUp(2 * Math.PI * m.y / t.clientHeight * u.rotateSpeed), d.copy(f), u.update();
                            break;
                        case 2:
                            if (!0 === u.noZoom) return;
                            if (R !== D.TOUCH_DOLLY) return;
                            var n = e.touches[0].pageX - e.touches[1].pageX,
                                o = e.touches[0].pageY - e.touches[1].pageY, r = Math.sqrt(n * n + o * o);
                            b.set(0, r), y.subVectors(b, x), y.y > 0 ? u.dollyOut() : y.y < 0 && u.dollyIn(), x.copy(b), u.update();
                            break;
                        case 3:
                            if (!0 === u.noPan) return;
                            if (R !== D.TOUCH_PAN) return;
                            v.set(e.touches[0].pageX, e.touches[0].pageY), h.subVectors(v, p), u.pan(h.x, h.y), p.copy(v), u.update();
                            break;
                        default:
                            R = D.NONE
                    }
                }
            }), !1), window.addEventListener("keydown", (function (e) {
                if (!1 !== u.enabled && !0 !== u.noKeys && !0 !== u.noPan) switch (e.keyCode) {
                    case u.keys.UP:
                        u.pan(0, u.keyPanSpeed), u.update();
                        break;
                    case u.keys.BOTTOM:
                        u.pan(0, -u.keyPanSpeed), u.update();
                        break;
                    case u.keys.LEFT:
                        u.pan(u.keyPanSpeed, 0), u.update();
                        break;
                    case u.keys.RIGHT:
                        u.pan(-u.keyPanSpeed, 0), u.update()
                }
            }), !1), this.update()
        }, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, t.exports = THREE.OrbitControls
    }, {}], 49: [function (e, t, n) {
        var o = e(27), r = e(21), i = n.query = o(window.location.href.replace("#", "?"));
        n.useStats = !1;
        var a = {
            "4k": [64, 64, .3],
            "8k": [128, 64, .3],
            "16k": [128, 128, .3],
            "32k": [256, 128, .5],
            "65k": [256, 256, .6],
            "131k": [512, 256, .65],
            "252k": [512, 512, .7],
            "524k": [1024, 512, .75],
            "1m": [1024, 1024, .8],
            "2m": [2048, 1024, .85],
            "4m": [2048, 2048, .9]
        };
        n.amountList = r(a), i.amount = a[i.amount] ? i.amount : "4k";
        var s = a[i.amount];
        n.simulatorTextureWidth = s[0],
            n.simulatorTextureHeight = s[1],
            n.emitterDistanceRatio = .65,
            n.emitterSpeed = 20,
            n.volumeWidth = 256,
            n.volumeHeight = 128,
            n.volumeDepth = 128,
            n.volumeSliceColumn = 8,
            n.volumeSliceRow = 16,
            n.volumeScale = 7,
            n.speed = speed,
            n.dieSpeed = dieSpeed,
            n.radius = radius,
            n.blur = blur,
            n.curlSize = 55e-5,
            n.particleSize = 32,
            n.bgColor = bgcolor,
            n.color1 = color1,
            n.color2 = color2,
            n.dof = 0,
            n.dofFocus = 1,
            n.uDofDistance = 0,
            n.dofFocusZ = 0,
            n.dofMouse = !1;
        var l = n.motionBlurQualityMap = {best: 1, high: .5, medium: 1 / 3, low: .25};
        n.motionBlurQualityList = r(l), i.motionBlurQuality = l[i.motionBlurQuality] ? i.motionBlurQuality : "medium", n.fxaa = !0, n.motionBlur = !0, n.motionBlurPause = !1, n.bloom = !1, n.vignette = !1, n.vignetteMultiplier = .8, n.capablePrecision = undefined
    }, {21: 21, 27: 27}], 50: [function (e, t, n) {
        function o() {
            i.parentNode.removeChild(i), r()
        }

        var r, i, a, s = e(49), l = /(iPad|iPhone|Android)/i.test(navigator.userAgent);
        n.pass = function (e) {
            l ? (r = e, (i = document.querySelector(".mobile")).style.display = "block", (a = document.querySelector(".mobile-bypass")) && a.addEventListener("click", o)) : e()
        }, s.isMobile = l
    }, {49: 49}], 51: [function (e, t, n) {
        function o(e, t, n) {
            return a[t.trim()] = n, ""
        }

        function r(e, t) {
            var n = "// chunk_begin(" + t + ");\n" + s.ShaderChunk[t] + "\n// chunk_end(" + t + ");\\n";
            for (var o in a) n = n.replace(o, a[o]);
            return n
        }

        function i(e, t) {
            return t
        }

        var a, s = e(32), l = /\/\/\s?chunk_replace\s(.+)([\d\D]+)\/\/\s?end_chunk_replace/gm,
            u = /\/\/\s?chunk\(\s?(\w+)\s?\);/g, c = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+)?/g;
        t.exports = function (e) {
            return function (e) {
                return e.replace(c, i)
            }(e = function (e) {
                return e.replace(u, r)
            }(e = function (e) {
                return a = {}, e.replace(l, o)
            }(e)))
        }
    }, {32: 32}], 52: [function (e, t, n) {
        function o(e) {
            S.mouse.x = e.pageX / k * 2 - 1, S.mouse.y = -e.pageY / U * 2 + 1
        }

        function r(e) {
            32 === e.keyCode && (S.speed = 0 === S.speed ? .45 : 0, S.dieSpeed = 0 === S.dieSpeed ? dieSpeedDefault : 0)
        }

        function i() {
            k = window.innerWidth, U = window.innerHeight, M.resize(k, U), P.resize(k, U)
        }

        function a() {
            var e = Date.now();
            b(a), S.useStats && l.begin(), j || function (e, t) {
                var n;
                e = e || 0, S.deltaRatio = e / 16.666667, L.skipMatrixUpdate = !(S.dieSpeed || S.speed) && S.motionBlurPause, m.setStyle(S.bgColor);
                var o = z.mesh.material.color;
                o.lerp(m, 1), M.mesh.material.uniforms.uFogColor.value.copy(o), d.fog.color.copy(o), f.setClearColor(o.getHex()), W = Math.min(W + 25e-5 * e, 1), D.initAnimation = W, I.boundBox.copy(I.resolution).multiplyScalar(S.volumeScale), u.maxDistance = 1 > W ? C.lerp(1800, 1400, W) : 2400, u.update(), R.update(e, c), c.updateMatrixWorld(), V.origin.setFromMatrixPosition(c.matrixWorld), V.direction.set(S.mouse.x, S.mouse.y, .5).unproject(c).sub(V.origin).normalize();
                var r = V.origin.length() / Math.cos(Math.PI - V.direction.angleTo(V.origin));
                V.origin.add(V.direction.multiplyScalar(1 * r)), D.update(e), I.update(e), M.preRender(e);
                var i = 10 * (1 - (n = Math.min(1.2 * (1 - 2 * Math.abs(W - .5)), 1)));
                n = C.unLerp(.5, .6, W);
                G.set(S.emitterDistanceRatio * I.boundBox.x * .5 * S.dofFocus, 0, 0), S.dofFocusZ = c.position.distanceTo(G), F.enabled = !!S.fxaa, N.enabled = !!S.dof, L.enabled = !!S.motionBlur, O.enabled = !!S.vignette, B.enabled = !!S.bloom, P.render(e, t)
            }(e - H), S.useStats && l.end(), H = e
        }

        var s, l, u, c, d, f, m, p, v, h, g = e(2), _ = e(31), x = e(5), b = e(29), y = e(32), w = e(48), S = e(49),
            C = e(53), E = e(50), A = e(25), T = e(33), D = e(46), R = e(35), z = e(34), M = e(36), I = e(47),
            P = e(44), N = e(39), O = e(45), L = e(42), F = e(41), B = (O = e(45), e(38)), k = 0, U = 0, H = 0,
            V = new y.Ray, G = new y.Vector3, W = 0, j = !1;
        E.pass((function () {
            function e(e, t) {
                for (var n, o = 0, r = (e = e.length ? e : [e]).length; r > o; o++) (n = e[o]).__li.style.pointerEvents = t ? "auto" : "none", n.domElement.parentNode.style.opacity = t ? 1 : .1
            }

            S.useStats && (l = new _, x(l.domElement, {
                position: "absolute",
                left: "0px",
                top: "0px",
                zIndex: 2048
            }), document.body.appendChild(l.domElement)), m = new y.Color(S.bgColor), S.mouse = new y.Vector2(0, 0), S.mouse3d = V.origin, S.ignoredMaterial = new y.Material, f = new y.WebGLRenderer({
                premultipliedAlpha: !1,
                preserveDrawingBuffer: !0
            }), T.init(f);
            var t = f.renderBufferDirect;
            f.renderBufferDirect = function (e, n, o, r) {
                r !== S.ignoredMaterial && t.apply(this, arguments)
            }, S.capablePrecision = f.capabilities.precision, f.setClearColor(S.bgColor), f.autoClearColor = !0, f.shadowMap.type = y.PCFSoftShadowMap, f.shadowMap.enabled = !0, document.body.appendChild(f.domElement), (d = new y.Scene).fog = new y.FogExp2(m, .001), (c = S.camera = new y.PerspectiveCamera(45, 1, 10, 5e3)).position.set(1e3, 100, 700).normalize().multiplyScalar(3e3), S.cameraPosition = c.position, R.init(f), d.add(R.mesh), P.init(f, d, c), I.init(f), D.init(f), M.init(f, c, d), z.init(f), z.mesh.position.y = -200, d.add(z.mesh), (u = new w(c, f.domElement)).target.y = 100, u.minPolarAngle = .3, u.maxPolarAngle = Math.PI / 2 + .1, u.update();
            var n = (s = new g.GUI).addFolder("Simulator");
            n.add(S.query, "amount", S.amountList).onChange((function () {
                confirm("It will restart the demo") && (window.location.href = window.location.href.split("#")[0] + A(S.query).replace("?", "#"), window.location.reload())
            })), n.add(S, "speed", 0, .7).listen(), n.add(S, "dieSpeed", 0, .02).name("fade speed").listen(), n.add(S, "radius", .1, 1), n.add(S, "curlSize", 1e-4, .003).name("curl size"), n.add(S, "emitterDistanceRatio", 0, 1).name("emitter distance"), n.add(S, "emitterSpeed", -50, 50).name("emitter speed");
            var b = s.addFolder("Rendering");
            b.add(S, "blur", 0, 5), b.add(S, "particleSize", 1, 64).name("particle size"), b.addColor(S, "bgColor"), b.addColor(S, "color1"), b.addColor(S, "color2");
            var C = s.addFolder("Post-Processing"), E = C.add(S, "dof", 0, 3, 1e-4).listen(),
                N = C.add(S, "dofMouse").name("dof on mouse").listen();
            E.onChange(e.bind(this, N)), e(N, b.add(S, "dofFocus", -1, 1, .001).name("dof focus side"), S.dof), C.add(S, "fxaa").listen(), L.maxDistance = 120, L.motionMultiplier = 4, L.linesRenderTargetScale = S.motionBlurQualityMap[S.query.motionBlurQuality];
            var O = C.add(S, "motionBlur"),
                F = [C.add(L, "maxDistance", 1, 300).name("motion distance").listen(), C.add(L, "motionMultiplier", .1, 15).name("motion multiplier").listen(), C.add(S.query, "motionBlurQuality", S.motionBlurQualityList).name("motion quality").onChange((function (e) {
                    L.linesRenderTargetScale = S.motionBlurQualityMap[e], L.resize()
                }))];
            O.onChange(e.bind(this, F)), e(F, S.motionBlur);
            var k = C.add(S, "bloom");
            F = [C.add(B, "blurRadius", 0, 3).name("bloom radius"), C.add(B, "amount", 0, 3).name("bloom amount")], k.onChange(e.bind(this, F)), e(F, S.bloom), C.add(S, "vignette"), C.open();
            var U = function (e) {
                e.preventDefault(), this.blur()
            };
            Array.prototype.forEach.call(s.domElement.querySelectorAll('input[type="checkbox"],select'), (function (e) {
                e.onkeyup = e.onkeydown = U, e.style.color = "#000"
            })), s.add({
                fn: function () {
                    j = !0;
                    var e = document.createElement("a");
                    e.download = "capture.png", e.href = f.domElement.toDataURL(), e.click(), j = !1
                }
            }, "fn").name("save as image"), S.isMobile ? s.close() : (n.open(), b.open()), window.addEventListener("resize", i), window.addEventListener("mousemove", o), window.addEventListener("touchmove", function (e) {
                return function (t) {
                    e(t.changedTouches[0])
                }
            }(o)), window.addEventListener("keyup", r), H = Date.now(), i(), a()
        }))
    }, {
        2: 2,
        25: 25,
        29: 29,
        31: 31,
        32: 32,
        33: 33,
        34: 34,
        35: 35,
        36: 36,
        38: 38,
        39: 39,
        41: 41,
        42: 42,
        44: 44,
        45: 45,
        46: 46,
        47: 47,
        48: 48,
        49: 49,
        5: 5,
        50: 50,
        53: 53
    }], 53: [function (e, t, n) {
        function o(e, t, n) {
            return e >= n ? 0 : n >= t ? 1 : (n - e) / (t - e)
        }

        function r(e) {
            return e - Math.floor(e)
        }

        for (var i in Math) n[i] = Math[i];
        n.step = function (e, t) {
            return e > t ? 0 : 1
        }, n.smoothstep = function (e, t, n) {
            return (n = o(e, t, n)) * n(3 - 2 * n)
        }, n.clamp = function (e, t, n) {
            return t > e ? t : e > n ? n : e
        }, n.mix = n.lerp = function (e, t, n) {
            return 0 >= n ? e : n >= 1 ? t : e + (t - e) * n
        }, n.unMix = n.unLerp = o, n.unClampedMix = n.unClampedLerp = function (e, t, n) {
            return e + (t - e) * n
        }, n.upClampedUnMix = n.unClampedUnLerp = function (e, t, n) {
            return (n - e) / (t - e)
        }, n.fract = r, n.hash = function (e) {
            return r(43758.5453123 * Math.sin(e))
        }, n.hash2 = function (e, t) {
            return r(43758.5453 * Math.sin(12.9898 * e + 4.1414 * t))
        }, n.sign = function (e) {
            return e ? 0 > e ? -1 : 1 : 0
        };
        var a = Math.PI;
        n.TAU = 2 * a
    }, {}]
}, {}, [52]);