﻿/*
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
    if (window.CKEDITOR && window.CKEDITOR.dom) return; window.CKEDITOR || (window.CKEDITOR = function () {
        var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, d = {
            timestamp: "I2EI", version: "4.9.0", revision: "9204212", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: a }, status: "unloaded", basePath: function () {
                var b = window.CKEDITOR_BASEPATH || ""; if (!b) for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) { var g = c[d].src.match(a); if (g) { b = g[1]; break } } -1 == b.indexOf(":/") && "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] +
                    b : location.href.match(/^[^\?]*\/(?:)/)[0] + b); if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return b
            }(), getUrl: function (a) { -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp); return a }, domReady: function () {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded",
                            a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                    } catch (c) { }
                } function b() { for (var a; a = c.shift();)a() } var c = []; return function (b) {
                    function d() { try { document.documentElement.doScroll("left") } catch (e) { setTimeout(d, 1); return } a() } c.push(b); "complete" === document.readyState && setTimeout(a, 1); if (1 == c.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange",
                            a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (r) { } document.documentElement.doScroll && b && d()
                    }
                }
            }()
        }, b = window.CKEDITOR_GETURL; if (b) { var c = d.getUrl; d.getUrl = function (a) { return b.call(d, a) || c.call(d, a) } } return d
    }());
    CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (a) { var d = CKEDITOR.event.prototype, b; for (b in d) null == a[b] && (a[b] = d[b]) }, CKEDITOR.event.prototype = function () {
        function a(a) { var f = d(this); return f[a] || (f[a] = new b(a)) } var d = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, b = function (a) { this.name = a; this.listeners = [] }; b.prototype = { getListenerIndex: function (a) { for (var b = 0, d = this.listeners; b < d.length; b++)if (d[b].fn == a) return b; return -1 } };
        return {
            define: function (b, d) { var h = a.call(this, b); CKEDITOR.tools.extend(h, d, !0) }, on: function (b, d, h, k, g) { function m(e, a, y, x) { e = { name: b, sender: this, editor: e, data: a, listenerData: k, stop: y, cancel: x, removeListener: r }; return !1 === d.call(h, e) ? !1 : e.data } function r() { y.removeListener(b, d) } var e = a.call(this, b); if (0 > e.getListenerIndex(d)) { e = e.listeners; h || (h = this); isNaN(g) && (g = 10); var y = this; m.fn = d; m.priority = g; for (var x = e.length - 1; 0 <= x; x--)if (e[x].priority <= g) return e.splice(x + 1, 0, m), { removeListener: r }; e.unshift(m) } return { removeListener: r } },
            once: function () { var a = Array.prototype.slice.call(arguments), b = a[1]; a[1] = function (a) { a.removeListener(); return b.apply(this, arguments) }; return this.on.apply(this, a) }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                var a = 0, b = function () { a = 1 }, h = 0, k = function () { h = 1 }; return function (g, m, r) {
                    var e = d(this)[g]; g = a; var y = h; a = h = 0; if (e) {
                        var x = e.listeners; if (x.length) for (var x = x.slice(0), B, D = 0; D < x.length; D++) {
                            if (e.errorProof) try {
                                B =
                                    x[D].call(this, r, m, b, k)
                            } catch (w) { } else B = x[D].call(this, r, m, b, k); !1 === B ? h = 1 : "undefined" != typeof B && (m = B); if (a || h) break
                        }
                    } m = h ? !1 : "undefined" == typeof m ? !0 : m; a = g; h = y; return m
                }
            }(), fireOnce: function (a, b, h) { b = this.fire(a, b, h); delete d(this)[a]; return b }, removeListener: function (a, b) { var h = d(this)[a]; if (h) { var k = h.getListenerIndex(b); 0 <= k && h.listeners.splice(k, 1) } }, removeAllListeners: function () { var a = d(this), b; for (b in a) delete a[b] }, hasListeners: function (a) { return (a = d(this)[a]) && 0 < a.listeners.length }
        }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, d, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function () {
        var a = navigator.userAgent.toLowerCase(), d = a.match(/edge[ \/](\d+.?\d*)/), b = -1 < a.indexOf("trident/"), b = !(!d && !b), b = {
            ie: b, edge: !!d, webkit: !b && -1 < a.indexOf(" applewebkit/"), air: -1 < a.indexOf(" adobeair/"), mac: -1 < a.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < a.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(a), isCustomDomain: function () {
                if (!this.ie) return !1; var a = document.domain, b = window.location.hostname;
                return a != b && a != "[" + b + "]"
            }, secure: "https:" == location.protocol
        }; b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie; b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0); var c = 0; b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks); b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split("."), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0)); b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
        b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); b.version = c; b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c); b.hidpi = 2 <= window.devicePixelRatio; b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c; b.needsNbspFiller = b.ie && 11 > c; b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown"); b.quirks && (b.cssClass += " cke_browser_quirks"); b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version)); b.air && (b.cssClass += " cke_browser_air");
        b.iOS && (b.cssClass += " cke_browser_ios"); b.hidpi && (b.cssClass += " cke_hidpi"); return b
    }());
    "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var a = document.createElement("script"); a.type = "text/javascript"; a.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add = function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () {
            CKEDITOR.domReady(function () {
                var a =
                    CKEDITOR.loadFullCore, d = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : d && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * d))
            })
        })(); CKEDITOR.status = "basic_loaded"
    }(); "use strict"; CKEDITOR.VERBOSITY_WARN = 1; CKEDITOR.VERBOSITY_ERROR = 2; CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR; CKEDITOR.warn = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: d }) };
    CKEDITOR.error = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: a, additionalData: d }) };
    CKEDITOR.on("log", function (a) { if (window.console && window.console.log) { var d = console[a.data.type] ? a.data.type : "log", b = a.data.errorCode; if (a = a.data.additionalData) console[d]("[CKEDITOR] Error code: " + b + ".", a); else console[d]("[CKEDITOR] Error code: " + b + "."); console[d]("[CKEDITOR] For more information about this error go to https://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_errors-section-" + b) } }, null, null, 999); CKEDITOR.dom = {};
    (function () {
        var a = [], d = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", b = /&/g, c = />/g, f = /</g, h = /"/g, k = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, g = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, m = function (a, e) { return "#" == e[0] ? String.fromCharCode(parseInt(e.slice(1), 10)) : g[e] }; CKEDITOR.on("reset", function () { a = [] }); CKEDITOR.tools = {
            arrayCompare: function (a, e) {
                if (!a && !e) return !0; if (!a || !e || a.length != e.length) return !1; for (var b = 0; b < a.length; b++)if (a[b] != e[b]) return !1;
                return !0
            }, getIndex: function (a, e) { for (var b = 0; b < a.length; ++b)if (e(a[b])) return b; return -1 }, clone: function (a) { var e; if (a && a instanceof Array) { e = []; for (var b = 0; b < a.length; b++)e[b] = CKEDITOR.tools.clone(a[b]); return e } if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a; e = new a.constructor; for (b in a) e[b] = CKEDITOR.tools.clone(a[b]); return e }, capitalize: function (a, e) {
                return a.charAt(0).toUpperCase() +
                    (e ? a.slice(1) : a.slice(1).toLowerCase())
            }, extend: function (a) { var e = arguments.length, b, c; "boolean" == typeof (b = arguments[e - 1]) ? e-- : "boolean" == typeof (b = arguments[e - 2]) && (c = arguments[e - 1], e -= 2); for (var g = 1; g < e; g++) { var d = arguments[g], m; for (m in d) if (!0 === b || null == a[m]) if (!c || m in c) a[m] = d[m] } return a }, prototypedCopy: function (a) { var e = function () { }; e.prototype = a; return new e }, copy: function (a) { var e = {}, b; for (b in a) e[b] = a[b]; return e }, isArray: function (a) { return "[object Array]" == Object.prototype.toString.call(a) },
            isEmpty: function (a) { for (var e in a) if (a.hasOwnProperty(e)) return !1; return !0 }, cssVendorPrefix: function (a, e, b) { if (b) return d + a + ":" + e + ";" + a + ":" + e; b = {}; b[a] = e; b[d + a] = e; return b }, cssStyleToDomStyle: function () { var a = document.createElement("div").style, e = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float"; return function (a) { return "float" == a ? e : a.replace(/-./g, function (a) { return a.substr(1).toUpperCase() }) } }(), buildStyleHtml: function (a) {
                a = [].concat(a); for (var e,
                    b = [], c = 0; c < a.length; c++)if (e = a[c]) /@import|[{}]/.test(e) ? b.push("\x3cstyle\x3e" + e + "\x3c/style\x3e") : b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + e + '"\x3e'); return b.join("")
            }, htmlEncode: function (a) { return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(f, "\x26lt;") }, htmlDecode: function (a) { return a.replace(k, m) }, htmlEncodeAttr: function (a) { return CKEDITOR.tools.htmlEncode(a).replace(h, "\x26quot;") }, htmlDecodeAttr: function (a) { return CKEDITOR.tools.htmlDecode(a) },
            transformPlainTextToHtml: function (a, e) {
                var b = e == CKEDITOR.ENTER_BR, c = this.htmlEncode(a.replace(/\r\n/g, "\n")), c = c.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), g = e == CKEDITOR.ENTER_P ? "p" : "div"; if (!b) { var d = /\n{2}/g; if (d.test(c)) var m = "\x3c" + g + "\x3e", p = "\x3c/" + g + "\x3e", c = m + c.replace(d, function () { return p + m }) + p } c = c.replace(/\n/g, "\x3cbr\x3e"); b || (c = c.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + g + "\x3e)"), function (a) { return CKEDITOR.tools.repeat(a, 2) })); c = c.replace(/^ | $/g, "\x26nbsp;"); return c = c.replace(/(>|\s) /g,
                    function (a, e) { return e + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
            }, getNextNumber: function () { var a = 0; return function () { return ++a } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () { for (var a = "e", e = 0; 8 > e; e++)a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return a }, override: function (a, e) { var b = e(a); b.prototype = a.prototype; return b }, setTimeout: function (a, e, b, c, g) {
                g || (g = window); b || (b = g); return g.setTimeout(function () { c ? a.apply(b, [].concat(c)) : a.apply(b) },
                    e || 0)
            }, trim: function () { var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (e) { return e.replace(a, "") } }(), ltrim: function () { var a = /^[ \t\n\r]+/g; return function (e) { return e.replace(a, "") } }(), rtrim: function () { var a = /[ \t\n\r]+$/g; return function (e) { return e.replace(a, "") } }(), indexOf: function (a, e) { if ("function" == typeof e) for (var b = 0, c = a.length; b < c; b++) { if (e(a[b])) return b } else { if (a.indexOf) return a.indexOf(e); b = 0; for (c = a.length; b < c; b++)if (a[b] === e) return b } return -1 }, search: function (a, e) {
                var b = CKEDITOR.tools.indexOf(a,
                    e); return 0 <= b ? a[b] : null
            }, bind: function (a, e) { return function () { return a.apply(e, arguments) } }, createClass: function (a) {
                var e = a.$, b = a.base, c = a.privates || a._, g = a.proto; a = a.statics; !e && (e = function () { b && this.base.apply(this, arguments) }); if (c) var d = e, e = function () { var a = this._ || (this._ = {}), e; for (e in c) { var b = c[e]; a[e] = "function" == typeof b ? CKEDITOR.tools.bind(b, this) : b } d.apply(this, arguments) }; b && (e.prototype = this.prototypedCopy(b.prototype), e.prototype.constructor = e, e.base = b, e.baseProto = b.prototype, e.prototype.base =
                    function () { this.base = b.prototype.base; b.apply(this, arguments); this.base = arguments.callee }); g && this.extend(e.prototype, g, !0); a && this.extend(e, a, !0); return e
            }, addFunction: function (b, e) { return a.push(function () { return b.apply(e || this, arguments) }) - 1 }, removeFunction: function (b) { a[b] = null }, callFunction: function (b) { var e = a[b]; return e && e.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () {
                var a = /^-?\d+\.?\d*px$/, e; return function (b) {
                    e = CKEDITOR.tools.trim(b + "") + "px"; return a.test(e) ?
                        e : b || ""
                }
            }(), convertToPx: function () { var a; return function (e) { a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a)); return /%$/.test(e) ? e : (a.setStyle("width", e), a.$.clientWidth) } }(), repeat: function (a, e) { return Array(e + 1).join(a) }, tryThese: function () { for (var a, e = 0, b = arguments.length; e < b; e++) { var c = arguments[e]; try { a = c(); break } catch (g) { } } return a },
            genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (a) { return function () { var e = arguments, b = this; window.setTimeout(function () { a.apply(b, e) }, 0) } }, normalizeCssText: function (a, e) { var b = [], c, g = CKEDITOR.tools.parseCssText(a, !0, e); for (c in g) b.push(c + ":" + g[c]); b.sort(); return b.length ? b.join(";") + ";" : "" }, convertRgbToHex: function (a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, c, g) {
                    a = [b, c, g]; for (b = 0; 3 > b; b++)a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            }, normalizeHex: function (a) { return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (a, b, c, g) { a = b.toLowerCase(); 3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join("")); return "#" + a + g }) }, parseCssText: function (a, e, b) {
                var c = {}; b && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || ""); a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a))); if (!a || ";" == a) return c; a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
                    function (a, b, g) { e && (b = b.toLowerCase(), "font-family" == b && (g = g.replace(/\s*,\s*/g, ",")), g = CKEDITOR.tools.trim(g)); c[b] = g }); return c
            }, writeCssText: function (a, e) { var b, c = []; for (b in a) c.push(b + ":" + a[b]); e && c.sort(); return c.join("; ") }, objectCompare: function (a, e, b) { var c; if (!a && !e) return !0; if (!a || !e) return !1; for (c in a) if (a[c] != e[c]) return !1; if (!b) for (c in e) if (a[c] != e[c]) return !1; return !0 }, objectKeys: function (a) { var e = [], b; for (b in a) e.push(b); return e }, convertArrayToObject: function (a, e) {
                var b = {}; 1 ==
                    arguments.length && (e = !0); for (var c = 0, g = a.length; c < g; ++c)b[a[c]] = e; return b
            }, fixDomain: function () { for (var a; ;)try { a = window.parent.document.domain; break } catch (e) { a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain; if (!a) break; document.domain = a } return !!a }, eventsBuffer: function (a, e, b) { function c() { d = (new Date).getTime(); g = !1; b ? e.call(b) : e() } var g, d = 0; return { input: function () { if (!g) { var e = (new Date).getTime() - d; e < a ? g = setTimeout(c, a - e) : c() } }, reset: function () { g && clearTimeout(g); g = d = 0 } } }, enableHtml5Elements: function (a,
                e) { for (var b = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), c = b.length, g; c--;)g = a.createElement(b[c]), e && a.appendChild(g) }, checkIfAnyArrayItemMatches: function (a, e) { for (var b = 0, c = a.length; b < c; ++b)if (a[b].match(e)) return !0; return !1 }, checkIfAnyObjectPropertyMatches: function (a, e) { for (var b in a) if (b.match(e)) return !0; return !1 }, keystrokeToString: function (a, e) {
                    var b = this.keystrokeToArray(a,
                        e); b.display = b.display.join("+"); b.aria = b.aria.join("+"); return b
                }, keystrokeToArray: function (a, e) { var b = e & 16711680, c = e & 65535, g = CKEDITOR.env.mac, d = [], m = []; b & CKEDITOR.CTRL && (d.push(g ? "⌘" : a[17]), m.push(g ? a[224] : a[17])); b & CKEDITOR.ALT && (d.push(g ? "⌥" : a[18]), m.push(a[18])); b & CKEDITOR.SHIFT && (d.push(g ? "⇧" : a[16]), m.push(a[16])); c && (a[c] ? (d.push(a[c]), m.push(a[c])) : (d.push(String.fromCharCode(c)), m.push(String.fromCharCode(c)))); return { display: d, aria: m } }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
            getCookie: function (a) { a = a.toLowerCase(); for (var e = document.cookie.split(";"), b, c, g = 0; g < e.length; g++)if (b = e[g].split("\x3d"), c = decodeURIComponent(CKEDITOR.tools.trim(b[0]).toLowerCase()), c === a) return decodeURIComponent(1 < b.length ? b[1] : ""); return null }, setCookie: function (a, b) { document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b) + ";path\x3d/" }, getCsrfToken: function () {
                var a = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!a || 40 != a.length) {
                    var a = [], b = ""; if (window.crypto && window.crypto.getRandomValues) a =
                        new Uint8Array(40), window.crypto.getRandomValues(a); else for (var c = 0; 40 > c; c++)a.push(Math.floor(256 * Math.random())); for (c = 0; c < a.length; c++)var g = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[c] % 36), b = b + (.5 < Math.random() ? g.toUpperCase() : g); a = b; CKEDITOR.tools.setCookie("ckCsrfToken", a)
                } return a
            }, escapeCss: function (a) { return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : "" }, getMouseButton: function (a) {
                var b = (a = a.data) && a.$; return a &&
                    b ? CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 4 === b.button ? CKEDITOR.MOUSE_BUTTON_MIDDLE : 1 === b.button ? CKEDITOR.MOUSE_BUTTON_LEFT : CKEDITOR.MOUSE_BUTTON_RIGHT : b.button : !1
            }, convertHexStringToBytes: function (a) { var b = [], c = a.length / 2, g; for (g = 0; g < c; g++)b.push(parseInt(a.substr(2 * g, 2), 16)); return b }, convertBytesToBase64: function (a) {
                var b = "", c = a.length, g; for (g = 0; g < c; g += 3) {
                    var d = a.slice(g, g + 3), m = d.length, f = [], p; if (3 > m) for (p = m; 3 > p; p++)d[p] = 0; f[0] = (d[0] & 252) >> 2; f[1] = (d[0] & 3) << 4 | d[1] >> 4; f[2] = (d[1] & 15) << 2 | (d[2] & 192) >>
                        6; f[3] = d[2] & 63; for (p = 0; 4 > p; p++)b = p <= m ? b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f[p]) : b + "\x3d"
                } return b
            }, style: {
                parse: {
                    _colors: {
                        aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD", blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED",
                        cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgreen: "#006400", darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF",
                        dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080",
                        lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371",
                        mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD",
                        powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399", red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFFFFF",
                        whitesmoke: "#F5F5F5", yellow: "#FFFF00", yellowgreen: "#9ACD32"
                    }, _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "), _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/, _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (a) {
                        var b = {}, c = this._findColor(a); c.length && (b.color = c[0], CKEDITOR.tools.array.forEach(c,
                            function (b) { a = a.replace(b, "") })); if (a = CKEDITOR.tools.trim(a)) b.unprocessed = a; return b
                    }, margin: function (a) { function b(a) { c.top = g[a[0]]; c.right = g[a[1]]; c.bottom = g[a[2]]; c.left = g[a[3]] } var c = {}, g = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"]; switch (g.length) { case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }return c }, border: function (a) {
                        var b = {}, c = a.split(/\s+/g); a = CKEDITOR.tools.style.parse._findColor(a); a.length && (b.color = a[0]);
                        CKEDITOR.tools.array.forEach(c, function (a) { b.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, a) ? !b.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) && (b.width = a) : b.style = a }); return b
                    }, _findColor: function (a) { var b = [], c = CKEDITOR.tools.array, b = b.concat(a.match(this._rgbaRegExp) || []), b = b.concat(a.match(this._hslaRegExp) || []); return b = b.concat(c.filter(a.split(/\s+/), function (a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors })) }
                }
            },
            array: { filter: function (a, b, c) { var g = []; this.forEach(a, function (d, m) { b.call(c, d, m, a) && g.push(d) }); return g }, forEach: function (a, b, c) { var g = a.length, d; for (d = 0; d < g; d++)b.call(c, a[d], d, a) }, map: function (a, b, c) { for (var g = [], d = 0; d < a.length; d++)g.push(b.call(c, a[d], d, a)); return g }, reduce: function (a, b, c, g) { for (var d = 0; d < a.length; d++)c = b.call(g, c, a[d], d, a); return c }, every: function (a, b, c) { if (!a.length) return !0; b = this.filter(a, b, c); return a.length === b.length } }, object: {
                findKey: function (a, b) {
                    if ("object" !== typeof a) return null;
                    for (var c in a) if (a[c] === b) return c; return null
                }, merge: function (a, b) { var c = CKEDITOR.tools, g = c.clone(a), d = c.clone(b); c.array.forEach(c.objectKeys(d), function (a) { g[a] = "object" === typeof d[a] && "object" === typeof g[a] ? c.object.merge(g[a], d[a]) : d[a] }); return g }
            }
        }; CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE = 1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
    })();
    CKEDITOR.dtd = function () {
        var a = CKEDITOR.tools.extend, d = function (a, b) { for (var c = CKEDITOR.tools.clone(a), g = 1; g < arguments.length; g++) { b = arguments[g]; for (var d in b) delete c[d] } return c }, b = {}, c = {}, f = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, h = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, k = {}, g = { "#": 1 }, m = { center: 1, dir: 1, noframes: 1 };
        a(b, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, g, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(c, f, b, m); d = {
            a: d(b, { a: 1, button: 1 }), abbr: b, address: c,
            area: k, article: c, aside: c, audio: a({ source: 1, track: 1 }, c), b: b, base: k, bdi: b, bdo: b, blockquote: c, body: c, br: k, button: d(b, { a: 1, button: 1 }), canvas: b, caption: c, cite: b, code: b, col: k, colgroup: { col: 1 }, command: k, datalist: a({ option: 1 }, b), dd: c, del: b, details: a({ summary: 1 }, c), dfn: b, div: c, dl: { dt: 1, dd: 1 }, dt: c, em: b, embed: k, fieldset: a({ legend: 1 }, c), figcaption: c, figure: a({ figcaption: 1 }, c), footer: c, form: c, h1: b, h2: b, h3: b, h4: b, h5: b, h6: b, head: a({ title: 1, base: 1 }, h), header: c, hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, hr: k, html: a({
                head: 1,
                body: 1
            }, c, h), i: b, iframe: g, img: k, input: k, ins: b, kbd: b, keygen: k, label: b, legend: b, li: c, link: k, main: c, map: c, mark: b, menu: a({ li: 1 }, c), meta: k, meter: d(b, { meter: 1 }), nav: c, noscript: a({ link: 1, meta: 1, style: 1 }, b), object: a({ param: 1 }, b), ol: { li: 1 }, optgroup: { option: 1 }, option: g, output: b, p: b, param: k, pre: b, progress: d(b, { progress: 1 }), q: b, rp: b, rt: b, ruby: a({ rp: 1, rt: 1 }, b), s: b, samp: b, script: g, section: c, select: { optgroup: 1, option: 1 }, small: b, source: k, span: b, strong: b, style: g, sub: b, summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, b),
            sup: b, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: c, textarea: g, tfoot: { tr: 1 }, th: c, thead: { tr: 1 }, time: d(b, { time: 1 }), title: g, tr: { th: 1, td: 1 }, track: k, u: b, ul: { li: 1 }, "var": b, video: a({ source: 1, track: 1 }, c), wbr: k, acronym: b, applet: a({ param: 1 }, c), basefont: k, big: b, center: c, dialog: k, dir: { li: 1 }, font: b, isindex: k, noframes: c, strike: b, tt: b
        }; a(d, {
            $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, f, m), $blockLimit: {
                article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1,
                fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1
            }, $cdata: { script: 1, style: 1 }, $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 }, $empty: {
                area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1,
                track: 1, wbr: 1
            }, $inline: b, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: a({ body: 1, head: 1, html: 1 }, d.head), $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: {
                abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1,
                s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1
            }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
        }); return d
    }();
    CKEDITOR.dom.event = function (a) { this.$ = a };
    CKEDITOR.dom.event.prototype = {
        getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () { var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL; this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a }, preventDefault: function (a) { var d = this.$; d.preventDefault ? d.preventDefault() : d.returnValue = !1; a && this.stopPropagation() }, stopPropagation: function () { var a = this.$; a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 }, getTarget: function () {
            var a =
                this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null
        }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () { var a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
    }; CKEDITOR.CTRL = 1114112; CKEDITOR.SHIFT = 2228224; CKEDITOR.ALT = 4456448; CKEDITOR.EVENT_PHASE_CAPTURING = 1; CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3; CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) };
    CKEDITOR.dom.domObject.prototype = function () {
        var a = function (a, b) { return function (c) { "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c)) } }; return {
            getPrivate: function () { var a; (a = this.getCustomData("_")) || this.setCustomData("_", a = {}); return a }, on: function (d) {
                var b = this.getCustomData("_cke_nativeListeners"); b || (b = {}, this.setCustomData("_cke_nativeListeners", b)); b[d] || (b = b[d] = a(this, d), this.$.addEventListener ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" +
                    d, b)); return CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) { var b = this.getCustomData("_cke_nativeListeners"), c = b && b[a]; c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a]) } }, removeAllListeners: function () {
                var a = this.getCustomData("_cke_nativeListeners"), b; for (b in a) {
                    var c = a[b]; this.$.detachEvent ? this.$.detachEvent("on" +
                        b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1); delete a[b]
                } CKEDITOR.event.prototype.removeAllListeners.call(this)
            }
        }
    }();
    (function (a) {
        var d = {}; CKEDITOR.on("reset", function () { d = {} }); a.equals = function (a) { try { return a && a.$ === this.$ } catch (c) { return !1 } }; a.setCustomData = function (a, c) { var f = this.getUniqueId(); (d[f] || (d[f] = {}))[a] = c; return this }; a.getCustomData = function (a) { var c = this.$["data-cke-expando"]; return (c = c && d[c]) && a in c ? c[a] : null }; a.removeCustomData = function (a) { var c = this.$["data-cke-expando"], c = c && d[c], f, h; c && (f = c[a], h = a in c, delete c[a]); return h ? f : null }; a.clearCustomData = function () {
            this.removeAllListeners(); var a =
                this.$["data-cke-expando"]; a && delete d[a]
        }; a.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(a)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function (a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this }; CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject; CKEDITOR.NODE_ELEMENT = 1; CKEDITOR.NODE_DOCUMENT = 9; CKEDITOR.NODE_TEXT = 3; CKEDITOR.NODE_COMMENT = 8; CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0; CKEDITOR.POSITION_DISCONNECTED = 1; CKEDITOR.POSITION_FOLLOWING = 2; CKEDITOR.POSITION_PRECEDING = 4; CKEDITOR.POSITION_IS_CONTAINED = 8; CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (a, d) { a.append(this, d); return a }, clone: function (a, d) {
            function b(c) { c["data-cke-expando"] && (c["data-cke-expando"] = !1); if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) { c = c.childNodes; for (var f = 0; f < c.length; f++)b(c[f]) } } function c(b) {
                if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d =
                            b.getName(); ":" == d[0] && b.renameNode(d.substring(1))
                    } if (a) for (d = 0; d < b.getChildCount(); d++)c(b.getChild(d))
                }
            } var f = this.$.cloneNode(a); b(f); f = new CKEDITOR.dom.node(f); CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(f); return f
        }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a }, insertBefore: function (a) {
            a.$.parentNode.insertBefore(this.$,
                a.$); return a
        }, insertBeforeMe: function (a) { this.$.parentNode.insertBefore(a.$, this.$); return a }, getAddress: function (a) { for (var d = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) { var f = c.parentNode; f && d.unshift(this.getIndex.call({ $: c }, a)); c = f } return d }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (a) {
            function d(a, c) {
                var m = c ? a.nextSibling : a.previousSibling; return m && m.nodeType == CKEDITOR.NODE_TEXT ? b(m) ? d(m,
                    c) : m : null
            } function b(a) { return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE } var c = this.$, f = -1, h; if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !d(c) && !d(c, !0)) return -1; do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (h || b(c)) || (f++ , h = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling); return f
        }, getNextSourceNode: function (a, d, b) {
            if (b && !b.call) { var c = b; b = function (a) { return !a.equals(c) } } a = !a && this.getFirst && this.getFirst(); var f; if (!a) {
                if (this.type ==
                    CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getNext()
            } for (; !a && (f = (f || this).getParent());) { if (b && !1 === b(f, !0)) return null; a = f.getNext() } return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
        }, getPreviousSourceNode: function (a, d, b) {
            if (b && !b.call) { var c = b; b = function (a) { return !a.equals(c) } } a = !a && this.getLast && this.getLast(); var f; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getPrevious() } for (; !a && (f = (f || this).getParent());) {
                if (b && !1 ===
                    b(f, !0)) return null; a = f.getPrevious()
            } return !a || b && !1 === b(a) ? null : d && a.type != d ? a.getPreviousSourceNode(!1, d, b) : a
        }, getPrevious: function (a) { var d = this.$, b; do b = (d = d.previousSibling) && 10 != d.nodeType && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b }, getNext: function (a) { var d = this.$, b; do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b }, getParent: function (a) {
            var d = this.$.parentNode; return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ?
                new CKEDITOR.dom.node(d) : null
        }, getParents: function (a) { var d = this, b = []; do b[a ? "push" : "unshift"](d); while (d = d.getParent()); return b }, getCommonAncestor: function (a) { if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; var d = this.contains ? this : this.getParent(); do if (d.contains(a)) return d; while (d = d.getParent()); return null }, getPosition: function (a) {
            var d = this.$, b = a.$; if (d.compareDocumentPosition) return d.compareDocumentPosition(b); if (d == b) return CKEDITOR.POSITION_IDENTICAL; if (this.type ==
                CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) { if (d.contains) { if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING } if ("sourceIndex" in d) return 0 > d.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING } d = this.getAddress(); a = a.getAddress(); for (var b = Math.min(d.length, a.length), c = 0; c < b; c++)if (d[c] !=
                    a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return d.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (a, d) {
            var b = this.$, c, f; d || (b = b.parentNode); "function" == typeof a ? (f = !0, c = a) : (f = !1, c = function (b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a }); for (; b;) {
                if (c(f ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
                try { b = b.parentNode } catch (h) { b = null }
            } return null
        }, hasAscendant: function (a, d) { var b = this.$; d || (b = b.parentNode); for (; b;) { if (b.nodeName && b.nodeName.toLowerCase() == a) return !0; b = b.parentNode } return !1 }, move: function (a, d) { a.append(this.remove(), d) }, remove: function (a) { var d = this.$, b = d.parentNode; if (b) { if (a) for (; a = d.firstChild;)b.insertBefore(d.removeChild(a), d); b.removeChild(d) } return this }, replace: function (a) { this.insertBefore(a); a.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
            for (var a; this.getFirst &&
                (a = this.getFirst());) { if (a.type == CKEDITOR.NODE_TEXT) { var d = CKEDITOR.tools.ltrim(a.getText()), b = a.getLength(); if (d) d.length < b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue } } break }
        }, rtrim: function () {
            for (var a; this.getLast && (a = this.getLast());) { if (a.type == CKEDITOR.NODE_TEXT) { var d = CKEDITOR.tools.rtrim(a.getText()), b = a.getLength(); if (d) d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break } CKEDITOR.env.needsBrFiller &&
                (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
        }, isReadOnly: function (a) { var d = this; this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent()); CKEDITOR.env.edge && d && d.is("textarea", "input") && (a = !0); if (!a && d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable")); for (; d;) { if (d.data("cke-editable")) return !1; if (d.hasAttribute("contenteditable")) return "false" == d.getAttribute("contenteditable"); d = d.getParent() } return !0 }
    });
    CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () { this.$.focus() }, getViewPaneSize: function () { var a = this.$.document, d = "CSS1Compat" == a.compatMode; return { width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } }, getScrollPosition: function () {
            var a = this.$; if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 }; a = a.document; return {
                x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop ||
                    a.body.scrollTop || 0
            }
        }, getFrame: function () { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
    }); CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) { if (this.$.createStyleSheet) this.$.createStyleSheet(a); else { var d = new CKEDITOR.dom.element("link"); d.setAttributes({ rel: "stylesheet", type: "text/css", href: a }); this.getHead().append(d) } }, appendStyleText: function (a) {
            if (this.$.createStyleSheet) { var d = this.$.createStyleSheet(""); d.cssText = a } else { var b = new CKEDITOR.dom.element("style", this); b.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(b) } return d ||
                b.$.sheet
        }, createElement: function (a, d) { var b = new CKEDITOR.dom.element(a, this); d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles)); return b }, createText: function (a) { return new CKEDITOR.dom.text(a, this) }, focus: function () { this.getWindow().focus() }, getActive: function () { var a; try { a = this.$.activeElement } catch (d) { return null } return new CKEDITOR.dom.element(a) }, getById: function (a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null }, getByAddress: function (a, d) {
            for (var b =
                this.$.documentElement, c = 0; b && c < a.length; c++) { var f = a[c]; if (d) for (var h = -1, k = 0; k < b.childNodes.length; k++) { var g = b.childNodes[k]; if (!0 !== d || 3 != g.nodeType || !g.previousSibling || 3 != g.previousSibling.nodeType) if (h++ , h == f) { b = g; break } } else b = b.childNodes[f] } return b ? new CKEDITOR.dom.node(b) : null
        }, getElementsByTag: function (a, d) { CKEDITOR.env.ie && 8 >= document.documentMode || !d || (a = d + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) }, getHead: function () {
            var a = this.$.getElementsByTagName("head")[0];
            return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
        }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) }, write: function (a) {
            this.$.open("text/html", "replace"); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' +
                CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(a); this.$.close()
        }, find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) }, findOne: function (a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null }, _getHtml5ShivFrag: function () { var a = this.getCustomData("html5ShivFrag"); a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a)); return a }
    }); CKEDITOR.dom.nodeList = function (a) { this.$ = a };
    CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null }, toArray: function () { return CKEDITOR.tools.array.map(this.$, function (a) { return new CKEDITOR.dom.node(a) }) } }; CKEDITOR.dom.element = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.element.get = function (a) { return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) }; CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node; CKEDITOR.dom.element.createFromHtml = function (a, d) { var b = new CKEDITOR.dom.element("div", d); b.setHtml(a); return b.getFirst().remove() };
    CKEDITOR.dom.element.setMarker = function (a, d, b, c) { var f = d.getCustomData("list_marker_id") || d.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), h = d.getCustomData("list_marker_names") || d.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); a[f] = d; h[b] = 1; return d.setCustomData(b, c) }; CKEDITOR.dom.element.clearAllMarkers = function (a) { for (var d in a) CKEDITOR.dom.element.clearMarkers(a, a[d], 1) };
    CKEDITOR.dom.element.clearMarkers = function (a, d, b) { var c = d.getCustomData("list_marker_names"), f = d.getCustomData("list_marker_id"), h; for (h in c) d.removeCustomData(h); d.removeCustomData("list_marker_names"); b && (d.removeCustomData("list_marker_id"), delete a[f]) };
    (function () {
        function a(a, b) { return -1 < (" " + a + " ").replace(h, " ").indexOf(" " + b + " ") } function d(a) { var b = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1); return function () { b || a.removeAttribute("id") } } function b(a, b) { var c = CKEDITOR.tools.escapeCss(a.$.id); return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ") } function c(a) { for (var b = 0, c = 0, e = k[a].length; c < e; c++)b += parseFloat(this.getComputedStyle(k[a][c]) || 0, 10) || 0; return b } var f = document.createElement("_").classList, f = "undefined" !== typeof f &&
            null !== String(f.add).match(/\[Native code\]/gi), h = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_ELEMENT, addClass: f ? function (a) { this.$.classList.add(a); return this } : function (b) { var c = this.$.className; c && (a(c, b) || (c += " " + b)); this.$.className = c || b; return this }, removeClass: f ? function (a) { var b = this.$; b.classList.remove(a); b.className || b.removeAttribute("class"); return this } : function (b) {
                    var c = this.getAttribute("class"); c && a(c, b) && ((c = c.replace(new RegExp("(?:^|\\s+)" +
                        b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", c) : this.removeAttribute("class")); return this
                }, hasClass: function (b) { return a(this.$.className, b) }, append: function (a, b) { "string" == typeof a && (a = this.getDocument().createElement(a)); b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a }, appendHtml: function (a) { if (this.$.childNodes.length) { var b = new CKEDITOR.dom.element("div", this.getDocument()); b.setHtml(a); b.moveChildren(this) } else this.setHtml(a) }, appendText: function (a) {
                    null !=
                        this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
                }, appendBogus: function (a) { if (a || CKEDITOR.env.needsBrFiller) { for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a)) } }, breakParent: function (a, b) {
                    var c = new CKEDITOR.dom.range(this.getDocument()); c.setStartAfter(this); c.setEndAfter(a);
                    var e = c.extractContents(!1, b || !1), d; c.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (c = new CKEDITOR.dom.element("div"); d = e.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d); c.insertAfter(this); c.remove(!0) } else e.insertAfterNode(this)
                }, contains: document.compareDocumentPosition ? function (a) { return !!(this.$.compareDocumentPosition(a.$) & 16) } : function (a) {
                    var b = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) :
                        b != a.$ && b.contains(a.$)
                }, focus: function () { function a() { try { this.$.focus() } catch (b) { } } return function (b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () { if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0)); return a.innerHTML }, getClientRect: function () {
                    var a = CKEDITOR.tools.extend({},
                        this.$.getBoundingClientRect()); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a
                }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) { try { var b = this.$; if (this.getParent()) return b.innerHTML = a; var c = this.getDocument()._getHtml5ShivFrag(); c.appendChild(b); b.innerHTML = a; c.removeChild(b); return a } catch (e) { this.$.innerHTML = ""; b = new CKEDITOR.dom.element("body", this.getDocument()); b.$.innerHTML = a; for (b = b.getChildren(); b.count();)this.append(b.getItem(0)); return a } } :
                    function (a) { return this.$.innerHTML = a }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (b) { this.$[a ? "textContent" : "innerText"] = b } }(), getAttribute: function () {
                        var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                            switch (a) {
                                case "class": a = "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": return a = this.$.getAttribute(a,
                                    2), 0 !== a && 0 === this.$.tabIndex && (a = null), a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                            }return this.$.getAttribute(a, 2)
                        } : a
                    }(), getAttributes: function (a) {
                        var b = {}, c = this.$.attributes, e; a = CKEDITOR.tools.isArray(a) ?
                            a : []; for (e = 0; e < c.length; e++)-1 === CKEDITOR.tools.indexOf(a, c[e].name) && (b[c[e].name] = c[e].value); return b
                    }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) { var b = this.getWindow().$.getComputedStyle(this.$, null); return b ? b.getPropertyValue(a) : "" } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] }, getDtd: function () {
                        var a = CKEDITOR.dtd[this.getName()]; this.getDtd =
                            function () { return a }; return a
                    }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" }, getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () { return this.$.name || null }, getName: function () {
                        var a = this.$.nodeName.toLowerCase();
                        if (CKEDITOR.env.ie && 8 >= document.documentMode) { var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName()
                    }, getValue: function () { return this.$.value }, getFirst: function (a) { var b = this.$.firstChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a)); return b }, getLast: function (a) { var b = this.$.lastChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)); return b }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var b = 0; b < arguments.length; b++)if (arguments[b] == a) return !0; return !1 }, isEditable: function (a) {
                    var b = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] ||
                        CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
                }, isIdentical: function (a) {
                    var b = this.clone(0, 1); a = a.clone(0, 1); b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$); b = b.getOuterHtml(); a =
                        a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var c = this.getParent(); c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml()) } return b == a
                }, isVisible: function () { var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), b, c; a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible())); return !!a }, isEmptyInlineRemoveable: function () {
                    if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                    for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) { var e = a.getItem(b); if (e.type != CKEDITOR.NODE_ELEMENT || !e.data("cke-bookmark")) if (e.type == CKEDITOR.NODE_ELEMENT && !e.isEmptyInlineRemoveable() || e.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(e.getText())) return !1 } return !0
                }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
                    for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                        var c = a[b]; switch (c.nodeName) {
                            case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue;
                            default: if (c.specified) return !0
                        }
                    } return !1
                } : function () { var a = this.$.attributes, b = a.length, c = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName]) }, hasAttribute: function () {
                    function a(b) {
                        var c = this.$.attributes.getNamedItem(b); if ("input" == this.getName()) switch (b) { case "class": return 0 < this.$.className.length; case "checked": return !!this.$.checked; case "value": return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value }return c ?
                            c.specified : !1
                    } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (b) { return "name" == b ? !!this.$.name : a.call(this, b) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, b) { var c = this.$; a = a.$; if (c != a) { var e; if (b) for (; e = c.lastChild;)a.insertBefore(c.removeChild(e), a.firstChild); else for (; e = c.firstChild;)a.appendChild(c.removeChild(e)) } }, mergeSiblings: function () {
                    function a(b, c, e) {
                        if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                            for (var d =
                                []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)if (d.push(c), c = e ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return; if (b.isIdentical(c)) { for (var g = e ? b.getLast() : b.getFirst(); d.length;)d.shift().move(b, !e); c.moveChildren(b, !e); c.remove(); g && g.type == CKEDITOR.NODE_ELEMENT && g.mergeSiblings() }
                        }
                    } return function (b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
                }(), show: function () {
                    this.setStyles({
                        display: "",
                        visibility: ""
                    })
                }, setAttribute: function () {
                    var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, c) { "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) {
                        if ("src" == b && c.match(/^http:\/\//)) try {
                            a.apply(this,
                                arguments)
                        } catch (e) { } else a.apply(this, arguments); return this
                    } : a
                }(), setAttributes: function (a) { for (var b in a) this.setAttribute(b, a[b]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () { var a = function (a) { this.$.removeAttribute(a) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a }(), removeAttributes: function (a) {
                    if (CKEDITOR.tools.isArray(a)) for (var b =
                        0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
                }, removeStyle: function (a) {
                    var b = this.$.style; if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else {
                        var c = ["top", "left", "right", "bottom"], e; "border" == a && (e = ["color", "style", "width"]); for (var b = [], d = 0; d < c.length; d++)if (e) for (var x =
                            0; x < e.length; x++)b.push([a, c[d], e[x]].join("-")); else b.push([a, c[d]].join("-")); for (a = 0; a < b.length; a++)this.removeStyle(b[a])
                    }
                }, setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this }, setStyles: function (a) { for (var b in a) this.setStyle(b, a[b]); return this }, setOpacity: function (a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) }, unselectable: function () {
                    this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                        "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), c = 0, e = b.count(); c < e; c++)a = b.getItem(c), a.setAttribute("unselectable", "on") }
                }, getPositionedAncestor: function () { for (var a = this; "html" != a.getName();) { if ("static" != a.getComputedStyle("position")) return a; a = a.getParent() } return null }, getDocumentPosition: function (a) {
                    var b = 0, c = 0, e = this.getDocument(), d = e.getBody(), x = "BackCompat" == e.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                        8 !== CKEDITOR.env.version : 1)) { var f = this.$.getBoundingClientRect(), h = e.$.documentElement, w = h.clientTop || d.$.clientTop || 0, p = h.clientLeft || d.$.clientLeft || 0, k = !0; CKEDITOR.env.ie && (k = e.getDocumentElement().contains(this), e = e.getBody().contains(this), k = x && e || !x && k); k && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || h.scrollLeft, c = d.$.scrollTop || h.scrollTop) : (c = x ? d.$ : h, b = c.scrollLeft, c = c.scrollTop), b = f.left + b - p, c = f.top + c - w) } else for (w = this, p = null; w && "body" != w.getName() &&
                            "html" != w.getName();) { b += w.$.offsetLeft - w.$.scrollLeft; c += w.$.offsetTop - w.$.scrollTop; w.equals(this) || (b += w.$.clientLeft || 0, c += w.$.clientTop || 0); for (; p && !p.equals(w);)b -= p.$.scrollLeft, c -= p.$.scrollTop, p = p.getParent(); p = w; w = (f = w.$.offsetParent) ? new CKEDITOR.dom.element(f) : null } a && (f = this.getWindow(), w = a.getWindow(), !f.equals(w) && f.$.frameElement && (a = (new CKEDITOR.dom.element(f.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                                x || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0); return { x: b, y: c }
                }, scrollIntoView: function (a) { var b = this.getParent(); if (b) { do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) { var c = b.getWindow(); try { var e = c.$.frameElement; e && (b = new CKEDITOR.dom.element(e)) } catch (d) { } } while (b = b.getParent()) } }, scrollIntoParent: function (a, b, c) {
                    var e, d, x, f; function h(b, c) {
                        /body|html/.test(a.getName()) ?
                            a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft += b, a.$.scrollTop += c)
                    } function w(a, b) { var c = { x: 0, y: 0 }; if (!a.is(k ? "body" : "html")) { var e = a.$.getBoundingClientRect(); c.x = e.left; c.y = e.top } e = a.getWindow(); e.equals(b) || (e = w(CKEDITOR.dom.element.get(e.$.frameElement), b), c.x += e.x, c.y += e.y); return c } function p(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 } !a && (a = this.getWindow()); x = a.getDocument(); var k = "BackCompat" == x.$.compatMode; a instanceof CKEDITOR.dom.window && (a = k ? x.getBody() : x.getDocumentElement());
                    CKEDITOR.env.webkit && (x = this.getEditor(!1)) && (x._.previousScrollTop = null); x = a.getWindow(); d = w(this, x); var u = w(a, x), K = this.$.offsetHeight; e = this.$.offsetWidth; var l = a.$.clientHeight, q = a.$.clientWidth; x = d.x - p(this, "left") - u.x || 0; f = d.y - p(this, "top") - u.y || 0; e = d.x + e + p(this, "right") - (u.x + q) || 0; d = d.y + K + p(this, "bottom") - (u.y + l) || 0; (0 > f || 0 < d) && h(0, !0 === b ? f : !1 === b ? d : 0 > f ? f : d); c && (0 > x || 0 < e) && h(0 > x ? x : e, 0)
                }, setState: function (a, b, c) {
                    b = b || "cke"; switch (a) {
                        case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b +
                            "_off"); this.removeClass(b + "_disabled"); c && this.setAttribute("aria-pressed", !0); c && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on"); c && this.setAttribute("aria-disabled", !0); c && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                    }
                },
                getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                    var c = this.$.attributes; b = b || {}; for (var e = 0; e < c.length; e++) { var d = c[e], x = d.nodeName.toLowerCase(), f; if (!(x in b)) if ("checked" == x && (f = this.getAttribute(x))) a.setAttribute(x, f); else if (!CKEDITOR.env.ie || this.hasAttribute(x)) f = this.getAttribute(x), null === f && (f = d.nodeValue), a.setAttribute(x, f) } "" !== this.$.style.cssText &&
                        (a.$.style.cssText = this.$.style.cssText)
                }, renameNode: function (a) { if (this.getName() != a) { var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$); a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$; delete this.getName } }, getChild: function () {
                    function a(b, c) { var e = b.childNodes; if (0 <= c && c < e.length) return e[c] } return function (b) {
                        var c = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && c;)c = a(c,
                            b.shift()); else c = a(c, b); return c ? new CKEDITOR.dom.node(c) : null
                    }
                }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () { function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu", function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() }) }, getDirection: function (a) {
                    return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                        "ltr" : this.getStyle("direction") || this.getAttribute("dir")
                }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) { var b = CKEDITOR.instances, c, e, d; a = a || void 0 === a; for (c in b) if (e = b[c], e.element.equals(this) && e.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = e.editable()) && (d.equals(this) || d.contains(this))) return e; return null }, find: function (a) {
                    var c = d(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
                        a))); c(); return a
                }, findOne: function (a) { var c = d(this); a = this.$.querySelector(b(this, a)); c(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, c) { if (!(c || b && this.type != b)) var e = a(this); if (!1 !== e) { c = this.getChildren(); for (var d = 0; d < c.count(); d++)e = c.getItem(d), e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, b) : b && e.type != b || a(e) } }
            }); var k = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] };
        CKEDITOR.dom.element.prototype.setSize = function (a, b, d) { "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px")) }; CKEDITOR.dom.element.prototype.getSize = function (a, b) { var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0; b && (d -= c.call(this, a)); return d }
    })(); CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () { var a = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") } }, !0, {
        append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1,
        insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1
    });
    (function () {
        function a(a, b) {
            var c = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (c.collapsed) return this.end(), null; c.optimize() } var e, d = c.startContainer; e = c.endContainer; var f = c.startOffset, y = c.endOffset, h, l = this.guard, q = this.type, F = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) {
                var g = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), k = e.type == CKEDITOR.NODE_ELEMENT ? e.getChild(y) : e.getNext(); this._.guardLTR = function (a, b) {
                    return (!b || !g.equals(a)) && (!k ||
                        !a.equals(k)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            } if (a && !this._.guardRTL) { var M = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), t = d.type == CKEDITOR.NODE_ELEMENT ? f ? d.getChild(f - 1) : null : d.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !M.equals(a)) && (!t || !a.equals(t)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } } var C = a ? this._.guardRTL : this._.guardLTR; h = l ? function (a, b) { return !1 === C(a, b) ? !1 : l(a, b) } : C; this.current ? e = this.current[F](!1, q, h) : (a ? e.type == CKEDITOR.NODE_ELEMENT &&
                (e = 0 < y ? e.getChild(y - 1) : !1 === h(e, !0) ? null : e.getPreviousSourceNode(!0, q, h)) : (e = d, e.type == CKEDITOR.NODE_ELEMENT && ((e = e.getChild(f)) || (e = !1 === h(d, !0) ? null : d.getNextSourceNode(!0, q, h)))), e && !1 === h(e) && (e = null)); for (; e && !this._.end;) { this.current = e; if (!this.evaluator || !1 !== this.evaluator(e)) { if (!b) return e } else if (b && this.evaluator) return !1; e = e[F](!1, q, h) } this.end(); return this.current = null
        } function d(b) { for (var c, e = null; c = a.call(this, b);)e = c; return e } CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function (a) {
                this.range =
                    a; this._ = {}
            }, proto: { end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () { return a.call(this, 1) }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return d.call(this) }, lastBackward: function () { return d.call(this, 1) }, reset: function () { delete this.current; this._ = {} } }
        }); var b = {
            block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1, "table-column-group": 1,
            "table-column": 1, "table-cell": 1, "table-caption": 1
        }, c = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) };
        CKEDITOR.dom.walker.bookmark = function (a, b) { function c(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") } return function (e) { var d, f; d = e && e.type != CKEDITOR.NODE_ELEMENT && (f = e.getParent()) && c(f); d = a ? d : d || c(e); return !!(b ^ d) } }; CKEDITOR.dom.walker.whitespaces = function (a) { return function (b) { var c; b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE); return !!(a ^ c) } }; CKEDITOR.dom.walker.invisible =
            function (a) { var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.env.webkit ? 1 : 0; return function (e) { b(e) ? e = 1 : (e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), e = e.$.offsetWidth <= c); return !!(a ^ e) } }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (c) { return !!(b ^ c.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
                function b(a) { return !h(a) && !k(a) } return function (c) {
                    var e = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && f.test(c.getText()); e && (e = c.getParent(), c = c.getNext(b), e = e.isBlockBoundary() &&
                        (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())); return !!(a ^ e)
                }
            }; CKEDITOR.dom.walker.temp = function (a) { return function (b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b) } }; var f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, h = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), g = CKEDITOR.dom.walker.temp(), m = function (a) { return k(a) || h(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) }; CKEDITOR.dom.walker.ignored =
                function (a) { return function (b) { b = h(b) || k(b) || g(b); return !!(a ^ b) } }; var r = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty = function (a) { return function (b) { for (var c = 0, e = b.getChildCount(); c < e; ++c)if (!r(b.getChild(c))) return !!a; return !a } }; var e = CKEDITOR.dom.walker.empty(), y = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var b = {}, c; for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1); return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable = function (a) {
                    return function (b) {
                        b =
                            r(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(y) && e(b)) ? !0 : !1; return !!(a ^ b)
                    }
                }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (m(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && f.test(a.getText())) ? a : !1 }
    })();
    CKEDITOR.dom.range = function (a) { this.endOffset = this.endContainer = this.startOffset = this.startContainer = null; this.collapsed = !0; var d = a instanceof CKEDITOR.dom.document; this.document = d ? a : a.getDocument(); this.root = d ? a.getBody() : a };
    (function () {
        function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function d(a, b, c, d, f) {
            function h(a, b, c, e) { var d = c ? a.getPrevious() : a.getNext(); if (e && k) return d; l || e ? b.append(a.clone(!0, f), c) : (a.remove(), r && b.append(a, c)); return d } function p() { var a, b, c, e = Math.min(O.length, n.length); for (a = 0; a < e; a++)if (b = O[a], c = n[a], !b.equals(c)) return a; return a - 1 } function g() {
                var b = N - 1, c = C && z && !q.equals(F); b < v - 1 || b < A - 1 || c ? (c ? a.moveToPosition(F,
                    CKEDITOR.POSITION_BEFORE_START) : A == b + 1 && t ? a.moveToPosition(n[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(n[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = O[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: c }))) : a.collapse(!0)
            } a.optimizeBookmark(); var k = 0 === b, r = 1 == b, l = 2 == b; b = l || r; var q = a.startContainer, F = a.endContainer,
                L = a.startOffset, E = a.endOffset, M, t, C, z, H, P; if (l && F.type == CKEDITOR.NODE_TEXT && (q.equals(F) || q.type === CKEDITOR.NODE_ELEMENT && q.getFirst().equals(F))) c.append(a.document.createText(F.substring(L, E))); else {
                    F.type == CKEDITOR.NODE_TEXT ? l ? P = !0 : F = F.split(E) : 0 < F.getChildCount() ? E >= F.getChildCount() ? (F = F.getChild(E - 1), t = !0) : F = F.getChild(E) : z = t = !0; q.type == CKEDITOR.NODE_TEXT ? l ? H = !0 : q.split(L) : 0 < q.getChildCount() ? 0 === L ? (q = q.getChild(L), M = !0) : q = q.getChild(L - 1) : C = M = !0; for (var O = q.getParents(), n = F.getParents(), N = p(),
                        v = O.length - 1, A = n.length - 1, G = c, I, X, V, da = -1, Q = N; Q <= v; Q++) { X = O[Q]; V = X.getNext(); for (Q != v || X.equals(n[Q]) && v < A ? b && (I = G.append(X.clone(0, f))) : M ? h(X, G, !1, C) : H && G.append(a.document.createText(X.substring(L))); V;) { if (V.equals(n[Q])) { da = Q; break } V = h(V, G) } G = I } G = c; for (Q = N; Q <= A; Q++)if (c = n[Q], V = c.getPrevious(), c.equals(O[Q])) b && (G = G.getChild(0)); else { Q != A || c.equals(O[Q]) && A < v ? b && (I = G.append(c.clone(0, f))) : t ? h(c, G, !1, z) : P && G.append(a.document.createText(c.substring(0, E))); if (Q > da) for (; V;)V = h(V, G, !0); G = I } l || g()
                }
        }
        function b() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), d = CKEDITOR.dom.walker.bogus(); return function (f) { return c(f) || b(f) ? !0 : d(f) && !a ? a = !0 : f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(h) ? !1 : !0 } } function c(a) { var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1); return function (d) { return c(d) || b(d) ? !0 : !a && k(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) } }
        function f(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && r(a) && (b = a); return m(a) && !(k(a) && a.equals(b)) }) } } var h = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, k = CKEDITOR.dom.walker.bogus(), g = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, m = CKEDITOR.dom.walker.editable(), r = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype = {
            clone: function () {
                var a =
                    new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a
            }, collapse: function (a) { a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset); this.collapsed = !0 }, cloneContents: function (a) {
                var b = new CKEDITOR.dom.documentFragment(this.document); this.collapsed ||
                    d(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b
            }, deleteContents: function (a) { this.collapsed || d(this, 0, null, a) }, extractContents: function (a, b) { var c = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || d(this, 1, c, a, "undefined" == typeof b ? !0 : b); return c }, createBookmark: function (a) {
                var b, c, d, f, h = this.collapsed; b = this.document.createElement("span"); b.data("cke-bookmark", 1); b.setStyle("display", "none"); b.setHtml("\x26nbsp;"); a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id",
                    d + (h ? "C" : "S"))); h || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), f = this.clone(), f.collapse(), f.insertNode(c)); f = this.clone(); f.collapse(!0); f.insertNode(b); c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? d + (h ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: h }
            }, createBookmark2: function () {
                function a(b) {
                    var e = b.container, d = b.offset, p; p = e; var f = d; p = p.type != CKEDITOR.NODE_ELEMENT || 0 === f || f == p.getChildCount() ?
                        0 : p.getChild(f - 1).type == CKEDITOR.NODE_TEXT && p.getChild(f).type == CKEDITOR.NODE_TEXT; p && (e = e.getChild(d - 1), d = e.getLength()); if (e.type == CKEDITOR.NODE_ELEMENT && 0 < d) { a: { for (p = e; d--;)if (f = p.getChild(d).getIndex(!0), 0 <= f) { d = f; break a } d = -1 } d += 1 } if (e.type == CKEDITOR.NODE_TEXT) {
                            p = e; for (f = 0; (p = p.getPrevious()) && p.type == CKEDITOR.NODE_TEXT;)f += p.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length; p = f; e.getText() ? d += p : (f = e.getPrevious(c), p ? (d = p, e = f ? f.getNext() : e.getParent().getFirst()) : (e =
                                e.getParent(), d = f ? f.getIndex(!0) + 1 : 0))
                        } b.container = e; b.offset = d
                } function b(a, c) { var e = c.getCustomData("cke-fillingChar"); if (e) { var d = a.container; e.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent())) } } var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (c) {
                    var d = this.collapsed, f = { container: this.startContainer, offset: this.startOffset }, p = { container: this.endContainer, offset: this.endOffset }; c && (a(f),
                        b(f, this.root), d || (a(p), b(p, this.root))); return { start: f.container.getAddress(c), end: d ? null : p.container.getAddress(c), startOffset: f.offset, endOffset: p.offset, normalized: c, collapsed: d, is2: !0 }
                }
            }(), moveToBookmark: function (a) {
                if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, c); d ? this.setEnd(d, a) : this.collapse(!0) } else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode,
                    a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
            }, getBoundaryNodes: function () {
                var a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset, f; if (a.type == CKEDITOR.NODE_ELEMENT) if (f = a.getChildCount(), f > c) a = a.getChild(c); else if (1 > f) a = a.getPreviousSourceNode(); else { for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } if (b.type == CKEDITOR.NODE_ELEMENT) if (f = b.getChildCount(),
                    f > d) b = b.getChild(d).getPreviousSourceNode(!0); else if (1 > f) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
            }, getCommonAncestor: function (a, b) { var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d); return b && !c.is ? c.getParent() : c }, optimize: function () {
                var a =
                    this.startContainer, b = this.startOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            }, optimizeBookmark: function () { var a = this.startContainer, b = this.endContainer; a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) },
            trim: function (a, b) {
                var c = this.startContainer, d = this.startOffset, f = this.collapsed; if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) { if (d) if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent(); else { var h = c.split(d), d = c.getIndex() + 1, c = c.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(h, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1) } else d = c.getIndex(), c = c.getParent(); this.setStart(c, d); if (f) { this.collapse(!0); return } } c = this.endContainer; d = this.endOffset;
                b || f || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
            }, enlarge: function (a, b) {
                function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var d = new RegExp(/[^\s\ufeff]/); switch (a) {
                    case CKEDITOR.ENLARGE_INLINE: var f = 1; case CKEDITOR.ENLARGE_ELEMENT: var h = function (a, b) {
                        var c = new CKEDITOR.dom.range(g); c.setStart(a, b); c.setEndAt(g, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c),
                            e; for (c.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; e = c.next();) { if (e.type != CKEDITOR.NODE_TEXT) return !1; M = e != a ? e.getText() : e.substring(b); if (d.test(M)) return !1 } return !0
                    }; if (this.collapsed) break; var p = this.getCommonAncestor(), g = this.root, k, r, l, q, F, L = !1, E, M; E = this.startContainer; var t = this.startOffset; E.type == CKEDITOR.NODE_TEXT ? (t && (E = !CKEDITOR.tools.trim(E.substring(0, t)).length && E, L = !!E), E && ((q = E.getPrevious()) || (l = E.getParent()))) : (t && (q = E.getChild(t - 1) || E.getLast()),
                        q || (l = E)); for (l = c(l); l || q;) {
                            if (l && !q) { !F && l.equals(p) && (F = !0); if (f ? l.isBlockBoundary() : !g.contains(l)) break; L && "inline" == l.getComputedStyle("display") || (L = !1, F ? k = l : this.setStartBefore(l)); q = l.getPrevious() } for (; q;)if (E = !1, q.type == CKEDITOR.NODE_COMMENT) q = q.getPrevious(); else {
                                if (q.type == CKEDITOR.NODE_TEXT) M = q.getText(), d.test(M) && (q = null), E = /[\s\ufeff]$/.test(M); else if ((q.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && q.is("br")) && !q.data("cke-bookmark")) if (L && CKEDITOR.dtd.$removeEmpty[q.getName()]) {
                                    M =
                                        q.getText(); if (d.test(M)) q = null; else for (var t = q.$.getElementsByTagName("*"), C = 0, z; z = t[C++];)if (!CKEDITOR.dtd.$removeEmpty[z.nodeName.toLowerCase()]) { q = null; break } q && (E = !!M.length)
                                } else q = null; E && (L ? F ? k = l : l && this.setStartBefore(l) : L = !0); if (q) { E = q.getPrevious(); if (!l && !E) { l = q; q = null; break } q = E } else l = null
                            } l && (l = c(l.getParent()))
                        } E = this.endContainer; t = this.endOffset; l = q = null; F = L = !1; E.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(E.substring(t)).length ? L = !0 : (L = !E.getLength(), t == E.getLength() ? (q = E.getNext()) ||
                            (l = E.getParent()) : h(E, t) && (l = E.getParent())) : (q = E.getChild(t)) || (l = E); for (; l || q;) {
                                if (l && !q) { !F && l.equals(p) && (F = !0); if (f ? l.isBlockBoundary() : !g.contains(l)) break; L && "inline" == l.getComputedStyle("display") || (L = !1, F ? r = l : l && this.setEndAfter(l)); q = l.getNext() } for (; q;) {
                                    E = !1; if (q.type == CKEDITOR.NODE_TEXT) M = q.getText(), h(q, 0) || (q = null), E = /^[\s\ufeff]/.test(M); else if (q.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((0 < q.$.offsetWidth || b && q.is("br")) && !q.data("cke-bookmark")) if (L && CKEDITOR.dtd.$removeEmpty[q.getName()]) {
                                            M =
                                                q.getText(); if (d.test(M)) q = null; else for (t = q.$.getElementsByTagName("*"), C = 0; z = t[C++];)if (!CKEDITOR.dtd.$removeEmpty[z.nodeName.toLowerCase()]) { q = null; break } q && (E = !!M.length)
                                        } else q = null
                                    } else E = 1; E && L && (F ? r = l : this.setEndAfter(l)); if (q) { E = q.getNext(); if (!l && !E) { l = q; q = null; break } q = E } else l = null
                                } l && (l = c(l.getParent()))
                            } k && r && (p = k.contains(r) ? r : k, this.setStartBefore(p), this.setEndAfter(p)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: l = new CKEDITOR.dom.range(this.root);
                        g = this.root; l.setStartAt(g, CKEDITOR.POSITION_AFTER_START); l.setEnd(this.startContainer, this.startOffset); l = new CKEDITOR.dom.walker(l); var H, P, O = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), n = null, N = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (n) { if (n.equals(a)) { n = null; return } } else n = a; else if (n) return; var b = O(a); b || (H = a); return b }, f = function (a) { var b = N(a); !b && a.is && a.is("br") && (P = a); return b }; l.guard = N; l = l.lastBackward();
                        H = H || g; this.setStartAt(H, !H.is("br") && (!l && this.checkStartOfBlock() || l && H.contains(l)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { l = this.clone(); l = new CKEDITOR.dom.walker(l); var v = CKEDITOR.dom.walker.whitespaces(), A = CKEDITOR.dom.walker.bookmark(); l.evaluator = function (a) { return !v(a) && !A(a) }; if ((l = l.previous()) && l.type == CKEDITOR.NODE_ELEMENT && l.is("br")) break } l = this.clone(); l.collapse(); l.setEndAt(g, CKEDITOR.POSITION_BEFORE_END); l = new CKEDITOR.dom.walker(l);
                        l.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : N; H = n = P = null; l = l.lastForward(); H = H || g; this.setEndAt(H, !l && this.checkEndOfBlock() || l && H.contains(l) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); P && this.setEndAfter(P)
                }
            }, shrink: function (a, b, c) {
                var d = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0, f = c && c.skipBogus; if (!this.collapsed) {
                    a = a || CKEDITOR.SHRINK_TEXT; var h = this.clone(), p = this.startContainer, g = this.endContainer, k = this.startOffset,
                        r = this.endOffset, l = c = 1; p && p.type == CKEDITOR.NODE_TEXT && (k ? k >= p.getLength() ? h.setStartAfter(p) : (h.setStartBefore(p), c = 0) : h.setStartBefore(p)); g && g.type == CKEDITOR.NODE_TEXT && (r ? r >= g.getLength() ? h.setEndAfter(g) : (h.setEndAfter(g), l = 0) : h.setEndBefore(g)); var h = new CKEDITOR.dom.walker(h), q = CKEDITOR.dom.walker.bookmark(), F = CKEDITOR.dom.walker.bogus(); h.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; var L; h.guard = function (b, c) {
                            if (f && F(b) || q(b)) return !0;
                            if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(L) || !1 === d && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; c || b.type != CKEDITOR.NODE_ELEMENT || (L = b); return !0
                        }; c && (p = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(p, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); l && (h.reset(), (h = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(h, b ? CKEDITOR.POSITION_BEFORE_END :
                            CKEDITOR.POSITION_AFTER_END)); return !(!c && !l)
                }
            }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, c = b.getChild(this.startOffset); c ? a.insertBefore(c) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) }, moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) }, selectNodeContents: function (a) {
                this.setStart(a,
                    0); this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            }, setStart: function (b, c) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset = c; this.endContainer || (this._setEndContainer(b), this.endOffset = c); a(this) }, setEnd: function (b, c) {
                b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent()); this._setEndContainer(b); this.endOffset = c; this.startContainer ||
                    (this._setStartContainer(b), this.startOffset = c); a(this)
            }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b,
                        b.getLength()) : this.setStart(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b)
                }a(this)
            }, setEndAt: function (b, c) { switch (c) { case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b) }a(this) },
            fixBlock: function (a, b) { var c = this.createBookmark(), d = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(d); d.trim(); this.insertNode(d); var f = d.getBogus(); f && f.remove(); d.appendBogus(); this.moveToBookmark(c); return d }, splitBlock: function (a, b) {
                var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root), d = new CKEDITOR.dom.elementPath(this.endContainer, this.root), f = c.block, h = d.block, p = null; if (!c.blockLimit.equals(d.blockLimit)) return null;
                "br" != a && (f || (f = this.fixBlock(!0, a), h = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), h || (h = this.fixBlock(!1, a))); c = f && this.checkStartOfBlock(); d = h && this.checkEndOfBlock(); this.deleteContents(); f && f.equals(h) && (d ? (p = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END), h = null) : c ? (p = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f = null) : (h = this.splitElement(f,
                    b || !1), f.is("ul", "ol") || f.appendBogus())); return { previousBlock: f, nextBlock: h, wasStartOfBlock: c, wasEndOfBlock: d, elementPath: p }
            }, splitElement: function (a, b) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var c = this.extractContents(!1, b || !1), d = a.clone(!1, b || !1); c.appendTo(d); d.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return d }, removeEmptyBlocksAtEnd: function () {
                function a(d) {
                    return function (a) {
                        return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() ||
                            d.is("table") && a.is("caption") ? !1 : !0
                    }
                } var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!1); return function (b) { for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, h; f && !f.equals(d.root) && !f.getFirst(a(f));)h = f.getParent(), this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), f = h; this.moveToBookmark(c) }
            }(), startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) }, endPath: function () {
                return new CKEDITOR.dom.elementPath(this.endContainer,
                    this.root)
            }, checkBoundaryOfElement: function (a, b) { var d = b == CKEDITOR.START, f = this.clone(); f.collapse(d); f[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); f = new CKEDITOR.dom.walker(f); f.evaluator = c(d); return f[d ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function () {
                var a = this.startContainer, c = this.startOffset; CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), g.test(a) && this.trim(0, 1)); this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer,
                    this.root); c = this.clone(); c.collapse(!0); c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkBackward()
            }, checkEndOfBlock: function () {
                var a = this.endContainer, c = this.endOffset; CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), g.test(a) && this.trim(1, 0)); this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); c = this.clone(); c.collapse(!1); c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkForward()
            }, getPreviousNode: function (a, b, c) { var d = this.clone(); d.collapse(1); d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.previous() }, getNextNode: function (a, b, c) { var d = this.clone(); d.collapse(); d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.next() }, checkReadOnly: function () {
                function a(b, c) {
                    for (; b;) {
                        if (b.type ==
                            CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                    } return 1
                } return function () { var b = this.startContainer, c = this.endContainer; return !(a(b, c) && a(c, b)) }
            }(), moveToElementEditablePosition: function (a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                    !0; for (var c = 0; a;) {
                        if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && g.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); c = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                        else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var d = a, f = c, h = void 0; d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (h = d[b ? "getLast" : "getFirst"](r)); f || h || (h = d[b ? "getPrevious" : "getNext"](r)); a = h
                    } return !!c
            }, moveToClosestEditablePosition: function (a, b) {
                var c, d = 0, f, h, p = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, p[b ? 0 : 1])) : c = this.clone(); if (a &&
                    !a.is(CKEDITOR.dtd.$block)) d = 1; else if (f = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (h = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && "false" == f.getAttribute("contenteditable") ? (c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(f, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && h && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(f, 0), c.collapse()) : c.moveToPosition(f, p[b ? 1 : 0]); d && this.moveToRange(c); return !!d
            }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) },
            moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () { var a = this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return c(a) && b(a) }; var d = a.next(); a.reset(); return d && d.equals(a.previous()) ? d : null }, getTouchedStartNode: function () {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            }, getTouchedEndNode: function () { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a }, getNextEditableNode: f(), getPreviousEditableNode: f(1), _getTableElement: function (a) {
                a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.startContainer, c = this.endContainer, d = b.getAscendant("table", !0), f = c.getAscendant("table", !0); return CKEDITOR.env.safari && d && c.equals(this.root) ?
                    b.getAscendant(a, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : d && f && (d.equals(f) || d.contains(f) || f.contains(d)) ? b.getAscendant(a, !0) : null
            }, scrollIntoView: function () {
                var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, c, d, f = this.clone(); f.optimize(); (d = f.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = f.startContainer.getText(), b = f.startContainer.split(f.startOffset), a.insertAfter(f.startContainer)) : f.insertNode(a); a.scrollIntoView();
                d && (f.startContainer.setText(c), b.remove()); a.remove()
            }, _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a, b) {
                var c = this.getCommonAncestor(), d = this.getBoundaryNodes(), f = [], h, p, g, k; if (c && c.find) for (p = c.find(a), h = 0; h < p.count(); h++)if (c = p.getItem(h), b || !c.isReadOnly()) g = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), k = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED ||
                    d.endNode.equals(c), g && k && f.push(c); return f
            }
        }; CKEDITOR.dom.range.mergeRanges = function (a) {
            return CKEDITOR.tools.array.reduce(a, function (a, b) {
                var c = a[a.length - 1], d = !1; b = b.clone(); b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (c) { var e = new CKEDITOR.dom.range(b.root), d = new CKEDITOR.dom.walker(e), f = CKEDITOR.dom.walker.whitespaces(); e.setStart(c.endContainer, c.endOffset); e.setEnd(b.startContainer, b.startOffset); for (e = d.next(); f(e) || b.endContainer.equals(e);)e = d.next(); d = !e } d ? c.setEnd(b.endContainer, b.endOffset) :
                    a.push(b); return a
            }, [])
        }
    })(); CKEDITOR.POSITION_AFTER_START = 1; CKEDITOR.POSITION_BEFORE_END = 2; CKEDITOR.POSITION_BEFORE_START = 3; CKEDITOR.POSITION_AFTER_END = 4; CKEDITOR.ENLARGE_ELEMENT = 1; CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2; CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3; CKEDITOR.ENLARGE_INLINE = 4; CKEDITOR.START = 1; CKEDITOR.END = 2; CKEDITOR.SHRINK_ELEMENT = 1; CKEDITOR.SHRINK_TEXT = 2; "use strict";
    (function () {
        function a(a) { 1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {})) } function d(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function b(a, c, f, h) {
            a: { null == h && (h = d(f)); for (var g; g = h.shift();)if (g.getDtd().p) { h = { element: g, remaining: h }; break a } h = null } if (!h) return 0; if ((g = CKEDITOR.filter.instances[h.element.data("cke-filter")]) && !g.check(c)) return b(a,
                c, f, h.remaining); c = new CKEDITOR.dom.range(h.element); c.selectNodeContents(h.element); c = c.createIterator(); c.enlargeBr = a.enlargeBr; c.enforceRealBlocks = a.enforceRealBlocks; c.activeFilter = c.filter = g; a._.nestedEditable = { element: h.element, container: f, remaining: h.remaining, iterator: c }; return 1
        } function c(a, b, c) { if (!b) return !1; a = a.clone(); a.collapse(!c); return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END) } var f = /^[\r\n\t ]+$/, h = CKEDITOR.dom.walker.bookmark(!1, !0), k = CKEDITOR.dom.walker.whitespaces(!0),
            g = function (a) { return h(a) && k(a) }, m = { dd: 1, dt: 1, li: 1 }; a.prototype = {
                getNextParagraph: function (a) {
                    var d, k, x, B, D; a = a || "p"; if (this._.nestedEditable) {
                        if (d = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, d; this.activeFilter = this.filter; if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable =
                            null
                    } if (!this.range.root.getDtd()[a]) return null; if (!this._.started) {
                        var w = this.range.clone(); k = w.startPath(); var p = w.endPath(), J = !w.collapsed && c(w, k.block), u = !w.collapsed && c(w, p.block, 1); w.shrink(CKEDITOR.SHRINK_ELEMENT, !0); J && w.setStartAt(k.block, CKEDITOR.POSITION_BEFORE_END); u && w.setEndAt(p.block, CKEDITOR.POSITION_AFTER_START); k = w.endContainer.hasAscendant("pre", !0) || w.startContainer.hasAscendant("pre", !0); w.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        w.collapsed || (k = new CKEDITOR.dom.walker(w.clone()), p = CKEDITOR.dom.walker.bookmark(!0, !0), k.evaluator = p, this._.nextNode = k.next(), k = new CKEDITOR.dom.walker(w.clone()), k.evaluator = p, k = k.previous(), this._.lastNode = k.getNextSourceNode(!0, null, w.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (p = this.range.clone(), p.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), p.checkEndOfBlock() &&
                            (p = new CKEDITOR.dom.elementPath(p.endContainer, p.root), this._.lastNode = (p.block || p.blockLimit).getNextSourceNode(!0))), this._.lastNode && w.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = w.document.createText(""), this._.lastNode.insertAfter(k)), w = null); this._.started = 1; k = w
                    } p = this._.nextNode; w = this._.lastNode; for (this._.nextNode = null; p;) {
                        var J = 0, u = p.hasAscendant("pre"), K = p.type != CKEDITOR.NODE_ELEMENT, l = 0; if (K) p.type == CKEDITOR.NODE_TEXT && f.test(p.getText()) && (K = 0); else {
                            var q = p.getName();
                            if (CKEDITOR.dtd.$block[q] && "false" == p.getAttribute("contenteditable")) { d = p; b(this, a, d); break } else if (p.isBlockBoundary(this.forceBrBreak && !u && { br: 1 })) { if ("br" == q) K = 1; else if (!k && !p.getChildCount() && "hr" != q) { d = p; x = p.equals(w); break } k && (k.setEndAt(p, CKEDITOR.POSITION_BEFORE_START), "br" != q && (this._.nextNode = p)); J = 1 } else { if (p.getFirst()) { k || (k = this.range.clone(), k.setStartAt(p, CKEDITOR.POSITION_BEFORE_START)); p = p.getFirst(); continue } K = 1 }
                        } K && !k && (k = this.range.clone(), k.setStartAt(p, CKEDITOR.POSITION_BEFORE_START));
                        x = (!J || K) && p.equals(w); if (k && !J) for (; !p.getNext(g) && !x;) { q = p.getParent(); if (q.isBlockBoundary(this.forceBrBreak && !u && { br: 1 })) { J = 1; K = 0; x || q.equals(w); k.setEndAt(q, CKEDITOR.POSITION_BEFORE_END); break } p = q; K = 1; x = p.equals(w); l = 1 } K && k.setEndAt(p, CKEDITOR.POSITION_AFTER_END); p = this._getNextSourceNode(p, l, w); if ((x = !p) || J && k) break
                    } if (!d) {
                        if (!k) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; d = new CKEDITOR.dom.elementPath(k.startContainer, k.root); p = d.blockLimit; J = { div: 1, th: 1, td: 1 };
                        d = d.block; !d && p && !this.enforceRealBlocks && J[p.getName()] && k.checkStartOfBlock() && k.checkEndOfBlock() && !p.equals(k.root) ? d = p : !d || this.enforceRealBlocks && d.is(m) ? (d = this.range.document.createElement(a), k.extractContents().appendTo(d), d.trim(), k.insertNode(d), B = D = !0) : "li" != d.getName() ? k.checkStartOfBlock() && k.checkEndOfBlock() || (d = d.clone(!1), k.extractContents().appendTo(d), d.trim(), D = k.splitBlock(), B = !D.wasStartOfBlock, D = !D.wasEndOfBlock, k.insertNode(d)) : x || (this._.nextNode = d.equals(w) ? null : this._getNextSourceNode(k.getBoundaryNodes().endNode,
                            1, w))
                    } B && (B = d.getPrevious()) && B.type == CKEDITOR.NODE_ELEMENT && ("br" == B.getName() ? B.remove() : B.getLast() && "br" == B.getLast().$.nodeName.toLowerCase() && B.getLast().remove()); D && (B = d.getLast()) && B.type == CKEDITOR.NODE_ELEMENT && "br" == B.getName() && (!CKEDITOR.env.needsBrFiller || B.getPrevious(h) || B.getNext(h)) && B.remove(); this._.nextNode || (this._.nextNode = x || d.equals(w) || !w ? null : this._getNextSourceNode(d, 1, w)); return d
                }, _getNextSourceNode: function (a, b, c) {
                    function d(a) { return !(a.equals(c) || a.equals(f)) } var f =
                        this.range.root; for (a = a.getNextSourceNode(b, null, d); !h(a);)a = a.getNextSourceNode(b, null, d); return a
                }
            }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
    })();
    CKEDITOR.command = function (a, d) {
        this.uiItems = []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire("exec") ? !0 : !1 !== d.exec.call(this, a, b) }; this.refresh = function (a, b) {
            if (!this.readOnly && a.readOnly) return !0; if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh",
                { editor: a, path: b }) ? !0 : d.refresh && !1 !== d.refresh.apply(this, arguments)
        }; var b; this.checkAllowed = function (c) { return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b }; CKEDITOR.tools.extend(this, d, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!d.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
        enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire("state"); return !0 }, toggleState: function () {
            this.state == CKEDITOR.TRISTATE_OFF ?
                this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    }; CKEDITOR.event.implementOn(CKEDITOR.command.prototype); CKEDITOR.ENTER_P = 1; CKEDITOR.ENTER_BR = 2; CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = { customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"), extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] };
    (function () {
        function a(a, b, c, d, f) {
            var e, v; a = []; for (e in b) {
                v = b[e]; v = "boolean" == typeof v ? {} : "function" == typeof v ? { match: v } : C(v); "$" != e.charAt(0) && (v.elements = e); c && (v.featureName = c.toLowerCase()); var l = v; l.elements = k(l.elements, /\s+/) || null; l.propertiesOnly = l.propertiesOnly || !0 === l.elements; var n = /\s*,\s*/, p = void 0; for (p in P) {
                    l[p] = k(l[p], n) || null; var h = l, q = O[p], t = k(l[O[p]], n), A = l[p], z = [], g = !0, H = void 0; t ? g = !1 : t = {}; for (H in A) "!" == H.charAt(0) && (H = H.slice(1), z.push(H), t[H] = !0, g = !1); for (; H = z.pop();)A[H] =
                        A["!" + H], delete A["!" + H]; h[q] = (g ? !1 : t) || null
                } l.match = l.match || null; d.push(v); a.push(v)
            } b = f.elements; f = f.generic; var F; c = 0; for (d = a.length; c < d; ++c) {
                e = C(a[c]); v = !0 === e.classes || !0 === e.styles || !0 === e.attributes; l = e; p = q = n = void 0; for (n in P) l[n] = J(l[n]); h = !0; for (p in O) { n = O[p]; q = l[n]; t = []; A = void 0; for (A in q) -1 < A.indexOf("*") ? t.push(new RegExp("^" + A.replace(/\*/g, ".*") + "$")) : t.push(A); q = t; q.length && (l[n] = q, h = !1) } l.nothingRequired = h; l.noProperties = !(l.attributes || l.classes || l.styles); if (!0 === e.elements ||
                    null === e.elements) f[v ? "unshift" : "push"](e); else for (F in l = e.elements, delete e.elements, l) if (b[F]) b[F][v ? "unshift" : "push"](e); else b[F] = [e]
            }
        } function d(a, c, d, f) {
            if (!a.match || a.match(c)) if (f || g(a, c)) if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses) {
                a = a.classes; c = c.classes; f = d.validClasses; if (a) if (!0 === a) a = !0; else {
                    for (var e = 0, v = c.length, l; e < v; ++e)l = c[e], f[l] ||
                        (f[l] = a(l)); a = !1
                } else a = !1; d.allClasses = a
            }
        } function b(a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (var d in b) c[d] || (c[d] = a(d)); return !1 } function c(a, b, c) { if (!a.match || a.match(b)) { if (a.noProperties) return !1; c.hadInvalidAttribute = f(a.attributes, b.attributes) || c.hadInvalidAttribute; c.hadInvalidStyle = f(a.styles, b.styles) || c.hadInvalidStyle; a = a.classes; b = b.classes; if (a) { for (var d = !1, e = !0 === a, v = b.length; v--;)if (e || a(b[v])) b.splice(v, 1), d = !0; a = d } else a = !1; c.hadInvalidClass = a || c.hadInvalidClass } } function f(a,
            b) { if (!a) return !1; var c = !1, d = !0 === a, f; for (f in b) if (d || a(f)) delete b[f], c = !0; return c } function h(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function k(a, b) { if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = z(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1; var c = {}, d = 0, f; for (f in a) c[f] = a[f], d++; return d ? c : !1 } function g(a, b) {
                if (a.nothingRequired) return !0;
                var c, d, f, e; if (f = a.requiredClasses) for (e = b.classes, c = 0; c < f.length; ++c)if (d = f[c], "string" == typeof d) { if (-1 == CKEDITOR.tools.indexOf(e, d)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(e, d)) return !1; return m(b.styles, a.requiredStyles) && m(b.attributes, a.requiredAttributes)
            } function m(a, b) { if (!b) return !0; for (var c = 0, d; c < b.length; ++c)if (d = b[c], "string" == typeof d) { if (!(d in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1; return !0 } function r(a) {
                if (!a) return {};
                a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test"; return b
            } function e(a) { var b, c, d, f, e = {}, v = 1; for (a = z(a); b = a.match(n);)(c = b[2]) ? (d = y(c, "styles"), f = y(c, "attrs"), c = y(c, "classes")) : d = f = c = null, e["$" + v++] = { elements: b[1], classes: c, styles: d, attributes: f }, a = a.slice(b[0].length); return e } function y(a, b) { var c = a.match(N[b]); return c ? z(c[1]) : null } function x(a) {
                var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b ||
                    "", 1)); a.classes || (a.classes = c ? c.split(/\s+/) : [])
            } function B(a, b, f, e) {
                var l = 0, n; e.toHtml && (b.name = b.name.replace(v, "$1")); if (e.doCallbacks && a.elementCallbacks) { a: { n = a.elementCallbacks; for (var h = 0, t = n.length, C; h < t; ++h)if (C = n[h](b)) { n = C; break a } n = void 0 } if (n) return n } if (e.doTransform && (n = a._.transformations[b.name])) { x(b); for (h = 0; h < n.length; ++h)q(a, b, n[h]); w(b) } if (e.doFilter) {
                    a: {
                        h = b.name; t = a._; a = t.allowedRules.elements[h]; n = t.allowedRules.generic; h = t.disallowedRules.elements[h]; t = t.disallowedRules.generic;
                        C = e.skipRequired; var z = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }, k, g; if (a || n) { x(b); if (h) for (k = 0, g = h.length; k < g; ++k)if (!1 === c(h[k], b, z)) { a = null; break a } if (t) for (k = 0, g = t.length; k < g; ++k)c(t[k], b, z); if (a) for (k = 0, g = a.length; k < g; ++k)d(a[k], b, z, C); if (n) for (k = 0, g = n.length; k < g; ++k)d(n[k], b, z, C); a = z } else a = null
                    } if (!a || !a.valid) return f.push(b), 1; g = a.validAttributes; var H = a.validStyles;
                    n = a.validClasses; var h = b.attributes, F = b.styles, t = b.classes; C = b.classBackup; var L = b.styleBackup, G, N, E = [], z = [], O = /^data-cke-/; k = !1; delete h.style; delete h["class"]; delete b.classBackup; delete b.styleBackup; if (!a.allAttributes) for (G in h) g[G] || (O.test(G) ? G == (N = G.replace(/^data-cke-saved-/, "")) || g[N] || (delete h[G], k = !0) : (delete h[G], k = !0)); if (!a.allStyles || a.hadInvalidStyle) { for (G in F) a.allStyles || H[G] ? E.push(G + ":" + F[G]) : k = !0; E.length && (h.style = E.sort().join("; ")) } else L && (h.style = L); if (!a.allClasses ||
                        a.hadInvalidClass) { for (G = 0; G < t.length; ++G)(a.allClasses || n[t[G]]) && z.push(t[G]); z.length && (h["class"] = z.sort().join(" ")); C && z.length < C.split(/\s+/).length && (k = !0) } else C && (h["class"] = C); k && (l = 1); if (!e.skipFinalValidation && !p(b)) return f.push(b), 1
                } e.toHtml && (b.name = b.name.replace(A, "cke:$1")); return l
            } function D(a) { var b = [], c; for (c in a) -1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*")); return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null } function w(a) {
                var b = a.attributes, c; delete b.style; delete b["class"];
                if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c; a.classes.length && (b["class"] = a.classes.sort().join(" "))
            } function p(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function J(a) { if (!a) return !1; if (!0 === a) return !0; var b = D(a); return function (c) { return c in a || b && c.match(b) } } function u() { return new CKEDITOR.htmlParser.element("br") } function K(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && ("br" ==
                    a.name || t.$block[a.name])
            } function l(a, b, c) {
                var d = a.name; if (t.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(u()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove()); else if (t.$block[d] || "tr" == d) if ("br" == b) a.previous && !K(a.previous) && (b = u(), b.insertBefore(a)), a.next && !K(a.next) && (b = u(), b.insertAfter(a)), a.replaceWithChildren(); else {
                    var d = a.children, f; b: { f = t[b]; for (var e = 0, v = d.length, l; e < v; ++e)if (l = d[e], l.type == CKEDITOR.NODE_ELEMENT && !f[l.name]) { f = !1; break b } f = !0 } if (f) a.name = b, a.attributes =
                        {}, c.push({ check: "parent-down", el: a }); else { f = a.parent; for (var e = f.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == f.name, n, h, v = d.length; 0 < v;)l = d[--v], e && (l.type == CKEDITOR.NODE_TEXT || l.type == CKEDITOR.NODE_ELEMENT && t.$inline[l.name]) ? (n || (n = new CKEDITOR.htmlParser.element(b), n.insertAfter(a), c.push({ check: "parent-down", el: n })), n.add(l, 0)) : (n = null, h = t[f.name] || t.span, l.insertAfter(a), f.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || l.type != CKEDITOR.NODE_ELEMENT || h[l.name] || c.push({ check: "el-up", el: l })); a.remove() }
                } else d in
                    { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
            } function q(a, b, c) { var d, f; for (d = 0; d < c.length; ++d)if (f = c[d], !(f.check && !a.check(f.check, !1) || f.left && !f.left(b))) { f.right(b, G); break } } function F(a, b) {
                var c = b.getDefinition(), d = c.attributes, f = c.styles, e, v, l, n; if (a.name != c.element) return !1; for (e in d) if ("class" == e) for (c = d[e].split(/\s+/), l = a.classes.join("|"); n = c.pop();) { if (-1 == l.indexOf(n)) return !1 } else if (a.attributes[e] != d[e]) return !1; for (v in f) if (a.styles[v] !=
                    f[v]) return !1; return !0
            } function L(a, b) { var c, d; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]); return [{ element: c, left: d, right: function (a, c) { c.transform(a, b) } }] } function E(a) { return function (b) { return F(b, a) } } function M(a) { return function (b, c) { c[a](b) } } var t = CKEDITOR.dtd, C = CKEDITOR.tools.copy, z = CKEDITOR.tools.trim, H = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a) {
                this.allowedContent = []; this.disallowedContent = []; this.elementCallbacks = null; this.disabled =
                    !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; if (a instanceof CKEDITOR.editor) {
                        a = this.editor = a; this.customConfig = !0; var b = a.config.allowedContent; !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(H[a.enterMode] + " " + H[a.shiftEnterMode],
                            "default", 1), this.disallow(a.config.disallowedContent))
                    } else this.customConfig = !1, this.allow(a, "default", 1)
            }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
                allow: function (b, c, d) {
                    if (!h(this, b, d)) return !1; var f, v; if ("string" == typeof b) b = e(b); else if (b instanceof CKEDITOR.style) {
                        if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d); f = b.getDefinition(); b = {}; d = f.attributes; b[f.element] = f = { styles: f.styles, requiredStyles: f.styles && CKEDITOR.tools.objectKeys(f.styles) };
                        d && (d = C(d), f.classes = d["class"] ? d["class"].split(/\s+/) : null, f.requiredClasses = f.classes, delete d["class"], f.attributes = d, f.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
                    } else if (CKEDITOR.tools.isArray(b)) { for (f = 0; f < b.length; ++f)v = this.allow(b[f], c, d); return v } a(this, b, c, this.allowedContent, this._.allowedRules); return !0
                }, applyTo: function (a, b, c, d) {
                    if (this.disabled) return !1; var f = this, e = [], v = this.editor && this.editor.config.protectedSource, n, h = !1, q = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b };
                    a.forEach(function (a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) { if ("off" == a.attributes["data-cke-filter"]) return !1; if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-")) if (n = B(f, a, e, q), n & 1) h = !0; else if (n & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var c; a: {
                                var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); c = []; var l, p, t; if (v) for (p = 0; p < v.length; ++p)if ((t = d.match(v[p])) && t[0].length == d.length) {
                                    c = !0;
                                    break a
                                } d = CKEDITOR.htmlParser.fragment.fromHtml(d); 1 == d.children.length && (l = d.children[0]).type == CKEDITOR.NODE_ELEMENT && B(f, l, c, q); c = !c.length
                            } c || e.push(a)
                        }
                    }, null, !0); e.length && (h = !0); var C; a = []; d = H[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var z; c = e.pop();)c.type == CKEDITOR.NODE_ELEMENT ? l(c, d, a) : c.remove(); for (; C = a.pop();)if (c = C.el, c.parent) switch (z = t[c.parent.name] || t.span, C.check) {
                        case "it": t.$removeEmpty[c.name] && !c.children.length ? l(c, d, a) : p(c) || l(c, d, a); break; case "el-up": c.parent.type ==
                            CKEDITOR.NODE_DOCUMENT_FRAGMENT || z[c.name] || l(c, d, a); break; case "parent-down": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || z[c.name] || l(c.parent, d, a)
                    }return h
                }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (b) { if (!h(this, b, !0)) return !1; "string" == typeof b && (b = e(b)); a(this, b, null, this.disallowedContent, this._.disallowedRules); return !0 },
                addContentForms: function (a) { if (!this.disabled && a) { var b, c, d = [], f; for (b = 0; b < a.length && !f; ++b)c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (f = c); if (f) { for (b = 0; b < a.length; ++b)d.push(L(a[b], f)); this.addTransformations(d) } } }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                    if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations);
                    this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
                }, addTransformations: function (a) {
                    var b, c; if (!this.disabled && a) {
                        var d = this._.transformations, f; for (f = 0; f < a.length; ++f) {
                            b = a[f]; var e = void 0, v = void 0, l = void 0, n = void 0, h = void 0, p = void 0; c = []; for (v = 0; v < b.length; ++v)l = b[v], "string" == typeof l ? (l = l.split(/\s*:\s*/), n = l[0], h = null, p = l[1]) : (n = l.check, h = l.left, p = l.right), e || (e = l, e = e.element ? e.element : n ? n.match(/^([a-z0-9]+)/i)[0] :
                                e.left.getDefinition().element), h instanceof CKEDITOR.style && (h = E(h)), c.push({ check: n == e ? null : n, left: h, right: "string" == typeof p ? M(p) : p }); b = e; d[b] || (d[b] = []); d[b].push(c)
                        }
                    }
                }, check: function (a, b, c) {
                    if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var d = a.length; d--;)if (this.check(a[d], b, c)) return !0; return !1 } var f, v; if ("string" == typeof a) {
                        v = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e"; if (v in this._.cachedChecks) return this._.cachedChecks[v]; d = e(a).$1; f = d.styles; var l = d.classes; d.name = d.elements;
                        d.classes = l = l ? l.split(/\s*,\s*/) : []; d.styles = r(f); d.attributes = r(d.attributes); d.children = []; l.length && (d.attributes["class"] = l.join(" ")); f && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles)); f = d
                    } else d = a.getDefinition(), f = d.styles, l = d.attributes || {}, f && !CKEDITOR.tools.isEmpty(f) ? (f = C(f), l.style = CKEDITOR.tools.writeCssText(f, !0)) : f = {}, f = { name: d.element, attributes: l, classes: l["class"] ? l["class"].split(/\s+/) : [], styles: f, children: [] }; var l = CKEDITOR.tools.clone(f), n = [], h; if (!1 !== b && (h = this._.transformations[f.name])) {
                        for (d =
                            0; d < h.length; ++d)q(this, f, h[d]); w(f)
                    } B(this, l, n, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c }); b = 0 < n.length ? !1 : CKEDITOR.tools.objectCompare(f.attributes, l.attributes, !0) ? !0 : !1; "string" == typeof a && (this._.cachedChecks[v] = b); return b
                }, getAllowedEnterMode: function () {
                    var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, d) {
                        var f = a.slice(), e; if (this.check(H[c])) return c; for (d || (f = f.reverse()); e = f.pop();)if (this.check(e)) return b[e];
                        return CKEDITOR.ENTER_BR
                    }
                }(), clone: function () { var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent); a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a }, destroy: function () { delete CKEDITOR.filter.instances[this.id]; delete this._; delete this.allowedContent; delete this.disallowedContent }
            };
        var P = { styles: 1, attributes: 1, classes: 1 }, O = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, n = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, N = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, v = /^cke:(object|embed|param)$/, A = /^(object|embed|param)$/, G; G = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function (a) { this.lengthToStyle(a, "width"); this.lengthToStyle(a, "height") }, sizeToAttribute: function (a) {
                this.lengthToAttribute(a,
                    "width"); this.lengthToAttribute(a, "height")
            }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var d = a.attributes[b]; d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d) } delete a.attributes[b] }, lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var d = a.styles[b], f = d && d.match(/^(\d+)(?:\.\d*)?px$/); f ? a.attributes[c] = f[1] : "cke-test" == d && (a.attributes[c] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) {
                if (!("float" in a.styles)) {
                    var b = a.attributes.align; if ("left" == b || "right" ==
                        b) a.styles["float"] = b
                } delete a.attributes.align
            }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] }, splitBorderShorthand: function (a) { if (a.styles.border) { var b = CKEDITOR.tools.style.parse.border(a.styles.border); b.color && (a.styles["border-color"] = b.color); b.style && (a.styles["border-style"] = b.style); b.width && (a.styles["border-width"] = b.width); delete a.styles.border } }, listTypeToStyle: function (a) {
                if (a.attributes.type) switch (a.attributes.type) {
                    case "a": a.styles["list-style-type"] =
                        "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman"; break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type
                }
            }, splitMarginShorthand: function (a) {
                function b(d) { a.styles["margin-top"] = c[d[0]]; a.styles["margin-right"] = c[d[1]]; a.styles["margin-bottom"] = c[d[2]]; a.styles["margin-left"] = c[d[3]] } if (a.styles.margin) {
                    var c =
                        a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"]; switch (c.length) { case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }delete a.styles.margin
                }
            }, matchesStyle: F, transform: function (a, b) {
                if ("string" == typeof b) a.name = b; else {
                    var c = b.getDefinition(), d = c.styles, f = c.attributes, e, l, v, n; a.name = c.element; for (e in f) if ("class" == e) for (c = a.classes.join("|"), v = f[e].split(/\s+/); n = v.pop();)-1 == c.indexOf(n) && a.classes.push(n); else a.attributes[e] = f[e]; for (l in d) a.styles[l] =
                        d[l]
                }
            }
        }
    })();
    (function () {
        CKEDITOR.focusManager = function (a) { if (a.focusManager) return a.focusManager; this.hasFocus = !1; this.currentActive = null; this._ = { editor: a }; return this }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
            focus: function (a) { this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus")) }, lock: function () {
                this._.locked =
                    1
            }, unlock: function () { delete this._.locked }, blur: function (a) { function d() { if (this.hasFocus) { this.hasFocus = !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur") } } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var b = CKEDITOR.focusManager._.blurDelay; a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; d.call(this) }, b, this) } }, add: function (a, d) {
                var b = a.getCustomData("focusmanager"); if (!b || b != this) {
                    b && b.remove(a); var b =
                        "focus", c = "blur"; d && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1); var f = { blur: function () { a.equals(this.currentActive) && this.blur() }, focus: function () { this.focus(a) } }; a.on(b, f.focus, this); a.on(c, f.blur, this); d && (CKEDITOR.event.useCapture = 0); a.setCustomData("focusmanager", this); a.setCustomData("focusmanager_handlers", f)
                }
            }, remove: function (a) {
                a.removeCustomData("focusmanager"); var d = a.removeCustomData("focusmanager_handlers"); a.removeListener("blur", d.blur); a.removeListener("focus",
                    d.focus)
            }
        }
    })(); CKEDITOR.keystrokeHandler = function (a) { if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes = {}; this._ = { editor: a }; return this };
    (function () { var a, d = function (b) { b = b.data; var d = b.getKeystroke(), h = this.keystrokes[d], k = this._.editor; a = !1 === k.fire("key", { keyCode: d, domEvent: b }); a || (h && (a = !1 !== k.execCommand(h, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[d])); a && b.preventDefault(!0); return !a }, b = function (b) { a && (a = !1, b.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", d, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this) } } })();
    (function () {
        CKEDITOR.lang = {
            languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (a, d, b) {
                a && CKEDITOR.lang.languages[a] ||
                    (a = this.detect(d, a)); var c = this; d = function () { c[a].dir = c.rtl[a] ? "rtl" : "ltr"; b(a, c[a]) }; this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), d, this)
            }, detect: function (a, d) { var b = this.languages; d = d || navigator.userLanguage || navigator.language || a; var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), f = c[1], c = c[2]; b[f + "-" + c] ? f = f + "-" + c : b[f] || (f = null); CKEDITOR.lang.detect = f ? function () { return f } : function (a) { return a }; return f || a }
        }
    })();
    CKEDITOR.scriptLoader = function () {
        var a = {}, d = {}; return {
            load: function (b, c, f, h) {
                var k = "string" == typeof b; k && (b = [b]); f || (f = CKEDITOR); var g = b.length, m = [], r = [], e = function (a) { c && (k ? c.call(f, a) : c.call(f, m, r)) }; if (0 === g) e(!0); else {
                    var y = function (a, b) { (b ? m : r).push(a); 0 >= --g && (h && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), e(b)) }, x = function (b, c) { a[b] = 1; var f = d[b]; delete d[b]; for (var e = 0; e < f.length; e++)f[e](b, c) }, B = function (b) {
                        if (a[b]) y(b, !0); else {
                            var f = d[b] || (d[b] = []); f.push(y); if (!(1 < f.length)) {
                                var e =
                                    new CKEDITOR.dom.element("script"); e.setAttributes({ type: "text/javascript", src: b }); c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? e.$.onreadystatechange = function () { if ("loaded" == e.$.readyState || "complete" == e.$.readyState) e.$.onreadystatechange = null, x(b, !0) } : (e.$.onload = function () { setTimeout(function () { x(b, !0) }, 0) }, e.$.onerror = function () { x(b, !1) })); e.appendTo(CKEDITOR.document.getHead())
                            }
                        }
                    }; h && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var D = 0; D < g; D++)B(b[D])
                }
            },
            queue: function () { function a() { var b; (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) } var c = []; return function (d, h) { var k = this; c.push({ scriptUrl: d, callback: function () { h && h.apply(this, arguments); c.shift(); a.call(k) } }); 1 == c.length && a.call(this) } }()
        }
    }(); CKEDITOR.resourceManager = function (a, d) { this.basePath = a; this.fileName = d; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } };
    CKEDITOR.resourceManager.prototype = {
        add: function (a, d) { if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.'); var b = this.registered[a] = d || {}; b.name = a; b.path = this.getPath(a); CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b); return this.get(a) }, get: function (a) { return this.registered[a] || null }, getPath: function (a) { var d = this.externals[a]; return CKEDITOR.getUrl(d && d.dir || this.basePath + a + "/") }, getFilePath: function (a) {
            var d = this.externals[a];
            return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + ".js"))
        }, addExternal: function (a, d, b) { a = a.split(","); for (var c = 0; c < a.length; c++) { var f = a[c]; b || (d = d.replace(/[^\/]+$/, function (a) { b = a; return "" })); this.externals[f] = { dir: d, file: b || this.fileName + ".js" } } }, load: function (a, d, b) {
            CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var c = this.loaded, f = this.registered, h = [], k = {}, g = {}, m = 0; m < a.length; m++) {
                var r = a[m]; if (r) if (c[r] || f[r]) g[r] = this.get(r); else {
                    var e = this.getFilePath(r); h.push(e); e in k || (k[e] =
                        []); k[e].push(r)
                }
            } CKEDITOR.scriptLoader.load(h, function (a, f) { if (f.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[f[0]].join(",") + '" was not found at "' + f[0] + '".'); for (var e = 0; e < a.length; e++)for (var h = k[a[e]], m = 0; m < h.length; m++) { var p = h[m]; g[p] = this.get(p); c[p] = 1 } d.call(b, g) }, this)
        }
    }; CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
        var d = {}; return function (b, c, f) {
            var h = {}, k = function (b) {
                a.call(this, b, function (a) {
                    CKEDITOR.tools.extend(h, a); var b = [], e; for (e in a) { var g = a[e], x = g && g.requires; if (!d[e]) { if (g.icons) for (var B = g.icons.split(","), D = B.length; D--;)CKEDITOR.skin.addIcon(B[D], g.path + "icons/" + (CKEDITOR.env.hidpi && g.hidpi ? "hidpi/" : "") + B[D] + ".png"); d[e] = 1 } if (x) for (x.split && (x = x.split(",")), g = 0; g < x.length; g++)h[x[g]] || b.push(x[g]) } if (b.length) k.call(this,
                        b); else { for (e in h) g = h[e], g.onLoad && !g.onLoad._called && (!1 === g.onLoad() && delete h[e], g.onLoad._called = 1); c && c.call(f || window, h) }
                }, this)
            }; k.call(this, b)
        }
    }); CKEDITOR.plugins.setLang = function (a, d, b) { var c = this.get(a); a = c.langEntries || (c.langEntries = {}); c = c.lang || (c.lang = []); c.split && (c = c.split(",")); -1 == CKEDITOR.tools.indexOf(c, d) && c.push(d); a[d] = b }; CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this };
    CKEDITOR.ui.prototype = {
        add: function (a, d, b) { b.name = a.toLowerCase(); var c = this.items[a] = { type: d, command: b.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(c, b) }, get: function (a) { return this.instances[a] }, create: function (a) { var d = this.items[a], b = d && this._.handlers[d.type], c = d && d.command && this.editor.getCommand(d.command), b = b && b.create.apply(this, d.args); this.instances[a] = b; c && c.uiItems.push(b); b && !b.type && (b.type = d.type); return b }, addHandler: function (a, d) {
            this._.handlers[a] =
                d
        }, space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) }, spaceId: function (a) { return this.editor.id + "_" + a }
    }; CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function () {
        function a(a, f, e) {
            CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a); if (void 0 !== f) {
                if (!(f instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element."); if (!e) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && e == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!b(f, e)) throw Error('The specified element mode is not supported on element: "' + f.getName() + '".');
                this.element = f; this.elementMode = e; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (f.getId() || f.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || d(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly",
                c); this.on("selectionChange", function (a) { h(this, a.data.path) }); this.on("activeFilterChange", function () { h(this, this.elementPath(), !0) }); this.on("mode", c); this.on("instanceReady", function () { if (this.config.startupFocus) { if ("end" === this.config.startupFocus) { var a = this.createRange(); a.selectNodeContents(this.editable()); a.shrink(CKEDITOR.SHRINK_ELEMENT, !0); a.collapse(); this.getSelection().selectRanges([a]) } this.focus() } }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () {
                    "destroyed" !==
                        this.status ? g(this, a) : CKEDITOR.warn("editor-incorrect-destroy")
                }, 0, this)
        } function d() { do var a = "editor" + ++D; while (CKEDITOR.instances[a]); return a } function b(a, b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function c() { var a = this.commands, b; for (b in a) f(this, a[b]) } function f(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function h(a,
            b, c) { if (b) { var d, f, e = a.commands; for (f in e) d = e[f], (c || d.contextSensitive) && d.refresh(a, b) } } function k(a) { var b = a.config.customConfig; if (!b) return !1; var b = CKEDITOR.getUrl(b), c = w[b] || (w[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () { }; k(a) }); return !0 } function g(a, b) {
                a.on("customConfigLoaded", function () {
                    if (b) {
                        if (b.on) for (var c in b.on) a.on(c,
                            b.on[c]); CKEDITOR.tools.extend(a.config, b, !0); delete a.config.on
                    } c = a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) :
                        !1; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); m(a)
                }); b && null != b.customConfig && (a.config.customConfig = b.customConfig); k(a) || a.fireOnce("customConfigLoaded")
            }
        function m(a) { CKEDITOR.skin.loadPart("editor", function () { r(a) }) } function r(a) { CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) { var d = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(c); a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire("langLoaded"); e(a) }) } function e(a) {
            a.getStylesSet(function (b) {
                a.once("loaded",
                    function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); y(a)
            })
        } function y(a) {
            var b = a.config, c = b.plugins, d = b.extraPlugins, f = b.removePlugins; if (d) var e = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(e, ""), c = c + ("," + d); if (f) var h = new RegExp("(?:^|,)(?:" + f.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(h, ""); CKEDITOR.env.air && (c += ",adobeair"); CKEDITOR.plugins.load(c.split(","), function (c) {
                var d = [], f = [], e = []; a.plugins = c; for (var l in c) {
                    var q = c[l], k = q.lang, g = null,
                        O = q.requires, n; CKEDITOR.tools.isArray(O) && (O = O.join(",")); if (O && (n = O.match(h))) for (; O = n.pop();)CKEDITOR.error("editor-plugin-required", { plugin: O.replace(",", ""), requiredBy: l }); k && !a.lang[l] && (k.split && (k = k.split(",")), 0 <= CKEDITOR.tools.indexOf(k, a.langCode) ? g = a.langCode : (g = a.langCode.replace(/-.*/, ""), g = g != a.langCode && 0 <= CKEDITOR.tools.indexOf(k, g) ? g : 0 <= CKEDITOR.tools.indexOf(k, "en") ? "en" : k[0]), q.langEntries && q.langEntries[g] ? (a.lang[l] = q.langEntries[g], g = null) : e.push(CKEDITOR.getUrl(q.path + "lang/" +
                            g + ".js"))); f.push(g); d.push(q)
                } CKEDITOR.scriptLoader.load(e, function () {
                    for (var c = ["beforeInit", "init", "afterInit"], e = 0; e < c.length; e++)for (var l = 0; l < d.length; l++) { var n = d[l]; 0 === e && f[l] && n.lang && n.langEntries && (a.lang[n.name] = n.langEntries[f[l]]); if (n[c[e]]) n[c[e]](a) } a.fireOnce("pluginsLoaded"); b.keystrokes && a.setKeystroke(a.config.keystrokes); for (l = 0; l < a.config.blockedKeystrokes.length; l++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[l]] = 1; a.status = "loaded"; a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        } function x() { var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) { var b = this.getData(); this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return !0 } return !1 } function B(a, b) {
            function c(a) { var b = a.startContainer, d = a.endContainer; return b.is && (b.is("tr") || b.is("td") && b.equals(d) && a.endOffset === b.getChildCount()) ? !0 : !1 } function d(a) {
                var b = a.startContainer; return b.is("tr") ? a.cloneContents() :
                    b.clone(!0)
            } for (var f = new CKEDITOR.dom.documentFragment, e, h, g, k = 0; k < a.length; k++) { var M = a[k], t = M.startContainer.getAscendant("tr", !0); c(M) ? (e || (e = t.getAscendant("table").clone(), e.append(t.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), f.append(e), e = e.findOne("thead, tbody, tfoot")), h && h.equals(t) || (h = t, g = t.clone(), e.append(g)), g.append(d(M))) : f.append(M.cloneContents()) } return e ? f : b.getHtmlFromRange(a[0])
        } a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var D = 0, w = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
            {
                addCommand: function (a, b) { b.name = a.toLowerCase(); var c = new CKEDITOR.command(this, b); this.mode && f(this, c); return this.commands[a] = c }, _attachToForm: function () {
                    function a(b) { c.updateElement(); c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault() } function b(a) { return !!(a && a.call && a.apply) } var c = this, d = c.element, f = new CKEDITOR.dom.element(d.$.form); d.is("textarea") && f && (f.on("submit", a), b(f.$.submit) && (f.$.submit = CKEDITOR.tools.override(f.$.submit, function (b) {
                        return function () {
                            a();
                            b.apply ? b.apply(this) : b()
                        }
                    })), c.on("destroy", function () { f.removeListener("submit", a) }))
                }, destroy: function (a) { this.fire("beforeDestroy"); !a && x.call(this); this.editable(null); this.filter && (this.filter.destroy(), delete this.filter); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this) }, elementPath: function (a) {
                    if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a,
                        this.editable()) : null
                }, createRange: function () { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null }, execCommand: function (a, b) { var c = this.getCommand(a), d = { name: a, commandData: b || {}, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1 }, getCommand: function (a) { return this.commands[a] }, getData: function (a) {
                    !a && this.fire("beforeGetData"); var b = this._.data;
                    "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""); b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue
                }, getSnapshot: function () { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, c) {
                    var d = !0, f = b; b && "object" ==
                        typeof b && (c = b.internal, f = b.callback, d = !b.noSnapshot); !c && d && this.fire("saveSnapshot"); if (f || !c) this.once("dataReady", function (a) { !c && d && this.fire("saveSnapshot"); f && f.call(a.editor) }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a)
                }, setReadOnly: function (a) { a = null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) }, insertHtml: function (a, b, c) {
                    this.fire("insertHtml",
                        { dataValue: a, mode: b, range: c })
                }, insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) { this.fire("insertElement", a) }, getSelectedHtml: function (a) { var b = this.editable(), c = this.getSelection(), c = c && c.getRanges(); if (!b || !c || 0 === c.length) return null; b = B(c, b); return a ? b.getHtml() : b }, extractSelectedHtml: function (a, b) {
                    var c = this.editable(), d = this.getSelection().getRanges(), f = new CKEDITOR.dom.documentFragment, e; if (!c || 0 === d.length) return null; for (e = 0; e < d.length; e++)f.append(c.extractHtmlFromRange(d[e],
                        b)); b || this.getSelection().selectRanges([d[0]]); return a ? f.getHtml() : f
                }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () { return "ready" == this.status && this._.previousValue !== this.getSnapshot() }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return x.call(this) }, setKeystroke: function () {
                    for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, d, f = b.length; f--;)c = b[f], d = 0, CKEDITOR.tools.isArray(c) &&
                        (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
                }, getCommandKeystroke: function (a) { if (a = "string" === typeof a ? this.getCommand(a) : a) { var b = CKEDITOR.tools.object.findKey(this.commands, a), c = this.keystrokeHandler.keystrokes, d; if (a.fakeKeystroke) return a.fakeKeystroke; for (d in c) if (c.hasOwnProperty(d) && c[d] == b) return d } return null }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) {
                    a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ?
                        this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
                }, setActiveEnterMode: function (a, b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") }, showNotification: function (a) { alert(a) }
            })
    })();
    CKEDITOR.ELEMENT_MODE_NONE = 0; CKEDITOR.ELEMENT_MODE_REPLACE = 1; CKEDITOR.ELEMENT_MODE_APPENDTO = 2; CKEDITOR.ELEMENT_MODE_INLINE = 3; CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } };
    (function () {
        var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, d = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
            onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (b) {
                for (var c, f, h = 0, k; c = this._.htmlPartsRegex.exec(b);) {
                    f = c.index; if (f > h) if (h = b.substring(h, f), k) k.push(h); else this.onText(h);
                    h = this._.htmlPartsRegex.lastIndex; if (f = c[1]) if (f = f.toLowerCase(), k && CKEDITOR.dtd.$cdata[f] && (this.onCDATA(k.join("")), k = null), !k) { this.onTagClose(f); continue } if (k) k.push(c[0]); else if (f = c[3]) { if (f = f.toLowerCase(), !/="/.test(f)) { var g = {}, m, r = c[4]; c = !!c[5]; if (r) for (; m = a.exec(r);) { var e = m[1].toLowerCase(); m = m[2] || m[3] || m[4] || ""; g[e] = !m && d[e] ? e : CKEDITOR.tools.htmlDecodeAttr(m) } this.onTagOpen(f, g, c); !k && CKEDITOR.dtd.$cdata[f] && (k = []) } } else if (f = c[2]) this.onComment(f)
                } if (b.length > h) this.onText(b.substring(h,
                    b.length))
            }
        }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () { this._ = { output: [] } }, proto: {
            openTag: function (a) { this._.output.push("\x3c", a) }, openTagClose: function (a, d) { d ? this._.output.push(" /\x3e") : this._.output.push("\x3e") }, attribute: function (a, d) { "string" == typeof d && (d = CKEDITOR.tools.htmlEncodeAttr(d)); this._.output.push(" ", a, '\x3d"', d, '"') }, closeTag: function (a) { this._.output.push("\x3c/", a, "\x3e") }, text: function (a) { this._.output.push(a) }, comment: function (a) {
                this._.output.push("\x3c!--", a,
                    "--\x3e")
            }, write: function (a) { this._.output.push(a) }, reset: function () { this._.output = []; this._.indent = !1 }, getHtml: function (a) { var d = this._.output.join(""); a && this.reset(); return d }
        }
    }); "use strict";
    (function () {
        CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
            remove: function () { var a = this.parent.children, d = CKEDITOR.tools.indexOf(a, this), b = this.previous, c = this.next; b && (b.next = c); c && (c.previous = b); a.splice(d, 1); this.parent = null }, replaceWith: function (a) { var d = this.parent.children, b = CKEDITOR.tools.indexOf(d, this), c = a.previous = this.previous, f = a.next = this.next; c && (c.next = a); f && (f.previous = a); d[b] = a; a.parent = this.parent; this.parent = null }, insertAfter: function (a) {
                var d = a.parent.children,
                    b = CKEDITOR.tools.indexOf(d, a), c = a.next; d.splice(b + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; c && (c.previous = this); this.parent = a.parent
            }, insertBefore: function (a) { var d = a.parent.children, b = CKEDITOR.tools.indexOf(d, a); d.splice(b, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next = this); a.previous = this; this.parent = a.parent }, getAscendant: function (a) {
                var d = "function" == typeof a ? a : "string" == typeof a ? function (b) { return b.name == a } : function (b) { return b.name in a }, b = this.parent; for (; b &&
                    b.type == CKEDITOR.NODE_ELEMENT;) { if (d(b)) return b; b = b.parent } return null
            }, wrapWith: function (a) { this.replaceWith(a); a.add(this); return a }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (a) { return a || {} }
        }
    })(); "use strict"; CKEDITOR.htmlParser.comment = function (a) { this.value = a; this._ = { isBlockLike: !1 } };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function (a, d) { var b = this.value; if (!(b = a.onComment(d, b, this))) return this.remove(), !1; if ("string" != typeof b) return this.replaceWith(b), !1; this.value = b; return !0 }, writeHtml: function (a, d) { d && this.filter(d); a.comment(this.value) } }); "use strict";
    (function () { CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (a, d) { if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1 }, writeHtml: function (a, d) { d && this.filter(d); a.text(this.value) } }) })(); "use strict";
    (function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function () { }, writeHtml: function (a) { a.write(this.value) } }) })(); "use strict"; CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } };
    (function () {
        function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var d = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), b = { ol: 1, ul: 1 }, c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }), f = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" }; CKEDITOR.htmlParser.fragment.fromHtml =
            function (h, k, g) {
                function m(a) { var b; if (0 < p.length) for (var c = 0; c < p.length; c++) { var d = p[c], f = d.name, e = CKEDITOR.dtd[f], l = u.name && CKEDITOR.dtd[u.name]; l && !l[f] || a && e && !e[a] && CKEDITOR.dtd[a] ? f == u.name && (y(u, u.parent, 1), c--) : (b || (r(), b = 1), d = d.clone(), d.parent = u, u = d, p.splice(c, 1), c--) } } function r() { for (; J.length;)y(J.shift(), u) } function e(a) {
                    if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                        var b = a.children.length, c = a.children[b - 1], d; c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ?
                            c.value = d : a.children.length = b - 1)
                    }
                } function y(b, c, d) { c = c || u || w; var f = u; void 0 === b.previous && (x(c, b) && (u = c, D.onTagOpen(g, {}), b.returnPoint = c = u), e(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (l = !1), "textarea" == b.name && (K = !1)); b.returnPoint ? (u = b.returnPoint, delete b.returnPoint) : u = d ? c : f } function x(a, b) {
                    if ((a == w || "body" == a.name) && g && (!a.name || CKEDITOR.dtd[a.name][g])) {
                        var c, d; return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) &&
                            !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                } function B(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var D = new CKEDITOR.htmlParser, w = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment, p = [], J = [], u = w, K = "textarea" == w.name, l = "pre" == w.name; D.onTagOpen = function (f, e, h, g) {
                    e = new CKEDITOR.htmlParser.element(f, e); e.isUnknown && h && (e.isEmpty = !0); e.isOptionalClose = g;
                    if (a(e)) p.push(e); else {
                        if ("pre" == f) l = !0; else { if ("br" == f && l) { u.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == f && (K = !0) } if ("br" == f) J.push(e); else {
                            for (; !(g = (h = u.name) ? CKEDITOR.dtd[h] || (u._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, e.isUnknown || u.isUnknown || g[f]);)if (u.isOptionalClose) D.onTagClose(h); else if (f in b && h in b) h = u.children, (h = h[h.length - 1]) && "li" == h.name || y(h = new CKEDITOR.htmlParser.element("li"), u), !e.returnPoint && (e.returnPoint = u), u = h; else if (f in CKEDITOR.dtd.$listItem &&
                                !B(f, h)) D.onTagOpen("li" == f ? "ul" : "dl", {}, 0, 1); else if (h in d && !B(f, h)) !e.returnPoint && (e.returnPoint = u), u = u.parent; else if (h in CKEDITOR.dtd.$inline && p.unshift(u), u.parent) y(u, u.parent, 1); else { e.isOrphan = 1; break } m(f); r(); e.parent = u; e.isEmpty ? y(e) : u = e
                        }
                    }
                }; D.onTagClose = function (a) {
                    for (var b = p.length - 1; 0 <= b; b--)if (a == p[b].name) { p.splice(b, 1); return } for (var c = [], d = [], f = u; f != w && f.name != a;)f._.isBlockLike || d.unshift(f), c.push(f), f = f.returnPoint || f.parent; if (f != w) {
                        for (b = 0; b < c.length; b++) { var e = c[b]; y(e, e.parent) } u =
                            f; f._.isBlockLike && r(); y(f, f.parent); f == u && (u = u.parent); p = p.concat(d)
                    } "body" == a && (g = !1)
                }; D.onText = function (a) { if (!(u._.hasInlineStarted && !J.length || l || K) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return; var b = u.name, e = b ? CKEDITOR.dtd[b] || (u._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c; if (!K && !e["#"] && b in d) D.onTagOpen(f[b] || ""), D.onText(a); else { r(); m(); l || K || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); a = new CKEDITOR.htmlParser.text(a); if (x(u, a)) this.onTagOpen(g, {}, 0, 1); u.add(a) } }; D.onCDATA =
                    function (a) { u.add(new CKEDITOR.htmlParser.cdata(a)) }; D.onComment = function (a) { r(); m(); u.add(new CKEDITOR.htmlParser.comment(a)) }; D.parse(h); for (r(); u != w;)y(u, u.parent, 1); e(w); return w
            }; CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                    isNaN(b) && (b = this.children.length); var c = 0 < b ? this.children[b - 1] : null; if (c) {
                        if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) { this.children.pop(); this.add(a); return } c.next =
                            a
                    } a.previous = c; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
                }, filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) }, filterChildren: function (a, b, c) {
                    if (this.childrenFilteredBy != a.id) {
                        c = this.getFilterContext(c); if (b && !this.parent) a.onRoot(c, this); this.childrenFilteredBy = a.id; for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a,
                            c) && b--
                    }
                }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, c) { var d = this.getFilterContext(); if (c && !this.parent && b) b.onRoot(d, this); b && this.filterChildren(b, !1, d); b = 0; c = this.children; for (d = c.length; b < d; b++)c[b].writeHtml(a) }, forEach: function (a, b, c) { if (!(c || b && this.type != b)) var d = a(this); if (!1 !== d) { c = this.children; for (var f = 0; f < c.length; f++)d = c[f], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : b && d.type != b || a(d) } }, getFilterContext: function (a) {
                    return a ||
                        {}
                }
            }
    })(); "use strict";
    (function () {
        function a() { this.rules = [] } function d(b, c, d, h) { var k, g; for (k in c) (g = b[k]) || (g = b[k] = new a), g.add(c[k], d, h) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (b) { this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a; this.attributeNameRules = new a; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a; this.commentRules = new a; this.rootRules = new a; b && this.addRules(b, 10) }, proto: {
                addRules: function (a, c) {
                    var f; "number" == typeof c ? f = c : c && "priority" in c && (f =
                        c.priority); "number" != typeof f && (f = 10); "object" != typeof c && (c = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, f, c); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, f, c); a.elements && d(this.elementsRules, a.elements, f, c); a.attributes && d(this.attributesRules, a.attributes, f, c); a.text && this.textRules.add(a.text, f, c); a.comment && this.commentRules.add(a.comment, f, c); a.root && this.rootRules.add(a.root, f, c)
                }, applyTo: function (a) { a.filter(this) }, onElementName: function (a, c) {
                    return this.elementNameRules.execOnName(a,
                        c)
                }, onAttributeName: function (a, c) { return this.attributeNameRules.execOnName(a, c) }, onText: function (a, c, d) { return this.textRules.exec(a, c, d) }, onComment: function (a, c, d) { return this.commentRules.exec(a, c, d) }, onRoot: function (a, c) { return this.rootRules.exec(a, c) }, onElement: function (a, c) { for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], h, k = 0; 3 > k; k++)if (h = d[k]) { h = h.exec(a, c, this); if (!1 === h) return null; if (h && h != c) return this.onNode(a, h); if (c.parent && !c.name) break } return c },
                onNode: function (a, c) { var d = c.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null }, onAttribute: function (a, c, d, h) { return (d = this.attributesRules[d]) ? d.exec(a, h, c, this) : h }
            }
        }); CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype = {
            add: function (a, c, d) { this.rules.splice(this.findIndex(c), 0, { value: a, priority: c, options: d }) }, addMany: function (a,
                c, d) { for (var h = [this.findIndex(c), 0], k = 0, g = a.length; k < g; k++)h.push({ value: a[k], priority: c, options: d }); this.rules.splice.apply(this.rules, h) }, findIndex: function (a) { for (var c = this.rules, d = c.length - 1; 0 <= d && a < c[d].priority;)d--; return d + 1 }, exec: function (a, c) {
                    var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment, h = Array.prototype.slice.call(arguments, 1), k = this.rules, g = k.length, m, r, e, y; for (y = 0; y < g; y++)if (d && (m = c.type, r = c.name), e = k[y], !(a.nonEditable && !e.options.applyToAll ||
                        a.nestedEditable && e.options.excludeNestedEditable)) { e = e.value.apply(null, h); if (!1 === e || d && e && (e.name != r || e.type != m)) return e; null != e && (h[0] = c = e) } return c
                }, execOnName: function (a, c) { for (var d = 0, h = this.rules, k = h.length, g; c && d < k; d++)g = h[d], a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable || (c = c.replace(g.value[0], g.value[1])); return c }
        }
    })();
    (function () {
        function a(a, d) {
            function e(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function n(a, d) {
                return function (f) {
                    if (f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var l = [], v = b(f), n, C; if (v) for (t(v, 1) && l.push(v); v;)h(v) && (n = c(v)) && t(n) && ((C = c(n)) && !h(C) ? l.push(n) : (e(z).insertAfter(n), n.remove())), v = v.previous; for (v = 0; v < l.length; v++)l[v].remove(); if (l = !a || !1 !== ("function" == typeof d ? d(f) : d)) z || CKEDITOR.env.needsBrFiller ||
                            f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? z || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem) ? (l = b(f), l = !l || "form" == f.name && "input" == l.name) : l = !1 : l = !1; l && f.add(e(a))
                    }
                }
            } function t(a, b) {
                if ((!z || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(p)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a),
                    a.value = c[0]), !CKEDITOR.env.needsBrFiller && z && (!b || a.parent.name in g) || !z && ((c = a.previous) && "br" == c.name || !c || h(c))) ? !0 : !1
            } var C = { elements: {} }, z = "html" == d, g = CKEDITOR.tools.extend({}, l), q; for (q in g) "#" in u[q] || delete g[q]; for (q in g) C.elements[q] = n(z, a.config.fillEmptyBlocks); C.root = n(z, !1); C.elements.br = function (a) {
                return function (b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d = b.attributes; if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"]; else {
                            for (d = b.next; d && f(d);)d =
                                d.next; var l = c(b); !d && h(b.parent) ? k(b.parent, e(a)) : h(d) && l && !h(l) && e(a).insertBefore(d)
                        }
                    }
                }
            }(z); return C
        } function d(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function b(a) { for (a = a.children[a.children.length - 1]; a && f(a);)a = a.previous; return a } function c(a) { for (a = a.previous; a && f(a);)a = a.previous; return a } function f(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] } function h(a) {
            return a &&
                (a.type == CKEDITOR.NODE_ELEMENT && a.name in l || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        } function k(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function g(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function m(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function r(a) {
            return a.replace(M,
                function (a, b, c) { return "\x3c" + b + c.replace(t, function (a, b) { return C.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e" })
        } function e(a, b) { return a.replace(b, function (a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + B(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) } function y(a) { return a.replace(P, function (a, b) { return decodeURIComponent(b) }) } function x(a) {
            return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                function (a) { return "\x3c!--" + J + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
        } function B(a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }) } function D(a, b) { var c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" }) } function w(a, b) {
            var c = [], d = b.config.protectedSource, f = b._.dataStore || (b._.dataStore =
                { id: 1 }), e = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) { return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" }); for (var l = 0; l < d.length; l++)a = a.replace(d[l], function (a) { a = a.replace(e, function (a, b, d) { return c[d] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" }); a = a.replace(e, function (a, b, d) {
                    return "\x3c!--" + J + (b ? "{C}" :
                        "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
                }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) { return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a, b) { f[f.id] = decodeURIComponent(b); return "{cke_protected_" + f.id++ + "}" }) }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, d, f) { return "\x3c" + c + d + "\x3e" + D(B(f), b) + "\x3c/" + c + "\x3e" })
        } CKEDITOR.htmlDataProcessor = function (b) {
            var c,
                f, l = this; this.editor = b; this.dataFilter = c = new CKEDITOR.htmlParser.filter; this.htmlFilter = f = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; c.addRules(q); c.addRules(F, { applyToAll: !0 }); c.addRules(a(b, "data"), { applyToAll: !0 }); f.addRules(L); f.addRules(E, { applyToAll: !0 }); f.addRules(a(b, "html"), { applyToAll: !0 }); b.on("toHtml", function (a) {
                    a = a.data; var c = a.dataValue, f, c = w(c, b), c = e(c, H), c = r(c), c = e(c, z), c = c.replace(O, "$1cke:$2"), c = c.replace(N, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                        c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2"); f = a.context || b.editable().getName(); var l; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == f && (f = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", l = 1); f = b.document.createElement(f); f.setHtml("a" + c); c = f.getHtml().substr(1); c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""); l && (c = c.replace(/^<pre>|<\/pre>$/gi, "")); c = c.replace(n, "$1$2"); c = y(c); c = B(c); f = !1 === a.fixForBody ? !1 :
                            d(a.enterMode, b.config.autoParagraph); c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, f); f && (l = c, !l.children.length && CKEDITOR.dtd[l.name][f] && (f = new CKEDITOR.htmlParser.element(f), l.add(f))); a.dataValue = c
                }, null, null, 5); b.on("toHtml", function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6); b.on("toHtml", function (a) { a.data.dataValue.filterChildren(l.dataFilter, !0) }, null, null, 10); b.on("toHtml", function (a) {
                    a = a.data; var b = a.dataValue,
                        c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = x(b)
                }, null, null, 15); b.on("toDataFormat", function (a) { var c = a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph)) }, null, null, 5); b.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(l.htmlFilter, !0) }, null, null, 10); b.on("toDataFormat", function (a) {
                    a.data.filter.applyTo(a.data.dataValue,
                        !1, !0)
                }, null, null, 11); b.on("toDataFormat", function (a) { var c = a.data.dataValue, d = l.writer; d.reset(); c.writeChildrenHtml(d); c = d.getHtml(!0); c = B(c); c = D(c, b); a.data.dataValue = c }, null, null, 15)
        }; CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function (a, b, c, d) {
                var f = this.editor, e, l, n, h; b && "object" == typeof b ? (e = b.context, c = b.fixForBody, d = b.dontFilter, l = b.filter, n = b.enterMode, h = b.protectedWhitespaces) : e = b; e || null === e || (e = f.editable().getName()); return f.fire("toHtml", {
                    dataValue: a, context: e, fixForBody: c, dontFilter: d,
                    filter: l || f.filter, enterMode: n || f.enterMode, protectedWhitespaces: h
                }).dataValue
            }, toDataFormat: function (a, b) { var c, d, f; b && (c = b.context, d = b.filter, f = b.enterMode); c || null === c || (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat", { dataValue: a, filter: d || this.editor.filter, context: c, enterMode: f || this.editor.enterMode }).dataValue }
        }; var p = /(?:&nbsp;|\xa0)$/, J = "{cke_protected}", u = CKEDITOR.dtd, K = "caption colgroup col thead tfoot tbody".split(" "), l = CKEDITOR.tools.extend({}, u.$blockLimit,
            u.$block), q = { elements: { input: g, textarea: g } }, F = { attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: { iframe: function (a) { if (a.attributes && a.attributes.src) { var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src } } } }, L = {
                elements: {
                    embed: function (a) {
                        var b = a.parent; if (b && "object" == b.name) {
                            var c = b.attributes.width, b = b.attributes.height;
                            c && (a.attributes.width = c); b && (a.attributes.height = b)
                        }
                    }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 }
                }
            }, E = {
                elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                    $: function (a) { var b = a.attributes; if (b) { if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"], d, f = 0; f < c.length; f++)d = "data-cke-saved-" + c[f], d in b && delete b[c[f]] } return a },
                    table: function (a) { a.children.slice(0).sort(function (a, b) { var c, d; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(K, a.name), d = CKEDITOR.tools.indexOf(K, b.name)); -1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1); return c > d ? 1 : -1 }) }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) { "Apple-style-span" == a.attributes["class"] && delete a.name }, html: function (a) { delete a.attributes.contenteditable; delete a.attributes["class"] }, body: function (a) {
                        delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable
                    }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) { var b = a.children[0]; !b && k(a, b = new CKEDITOR.htmlParser.text); b.value = a.attributes["data-cke-title"] || "" }, input: m, textarea: m
                }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
            }; CKEDITOR.env.ie && (E.attributes.style = function (a) {
                return a.replace(/(^|;)([^\:]+)/g,
                    function (a) { return a.toLowerCase() })
            }); var M = /<(a|area|img|input|source)\b([^>]*)>/gi, t = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, C = /^(href|src|name)$/i, z = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, H = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, P = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, O = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, n = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, N = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })();
    "use strict"; CKEDITOR.htmlParser.element = function (a, d) { this.name = a; this.attributes = d || {}; this.children = []; var b = a || "", c = b.match(/^cke:(.*)/); c && (b = c[1]); b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b } };
    CKEDITOR.htmlParser.cssStyle = function (a) {
        var d = {}; ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, c, f) { "font-family" == c && (f = f.replace(/["']/g, "")); d[c.toLowerCase()] = f }); return {
            rules: d, populate: function (a) { var c = this.toString(); c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c) }, toString: function () {
                var a = [], c;
                for (c in d) d[c] && a.push(c, ":", d[c], ";"); return a.join("")
            }
        }
    };
    (function () {
        function a(a) { return function (b) { return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a) } } var d = function (a, b) { a = a[0]; b = b[0]; return a < b ? -1 : a > b ? 1 : 0 }, b = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT, add: b.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, b) {
                var d = this, k, g; b = d.getFilterContext(b); if (b.off) return !0;
                if (!d.parent) a.onRoot(b, d); for (; ;) { k = d.name; if (!(g = a.onElementName(b, k))) return this.remove(), !1; d.name = g; if (!(d = a.onElement(b, d))) return this.remove(), !1; if (d !== this) return this.replaceWith(d), !1; if (d.name == k) break; if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1; if (!d.name) return this.replaceWithChildren(), !1 } k = d.attributes; var m, r; for (m in k) {
                    for (g = k[m]; ;)if (r = a.onAttributeName(b, m)) if (r != m) delete k[m], m = r; else break; else { delete k[m]; break } r && (!1 === (g = a.onAttribute(b, d, r, g)) ? delete k[r] :
                        k[r] = g)
                } d.isEmpty || this.filterChildren(a, !1, b); return !0
            }, filterChildren: b.filterChildren, writeHtml: function (a, b) { b && this.filter(b); var h = this.name, k = [], g = this.attributes, m, r; a.openTag(h, g); for (m in g) k.push([m, g[m]]); a.sortAttributes && k.sort(d); m = 0; for (r = k.length; m < r; m++)g = k[m], a.attribute(g[0], g[1]); a.openTagClose(h, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(h) }, writeChildrenHtml: b.writeChildrenHtml, replaceWithChildren: function () {
                for (var a = this.children, b = a.length; b;)a[--b].insertAfter(this);
                this.remove()
            }, forEach: b.forEach, getFirst: function (b) { if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b && (b = a(b)); for (var d = 0, h = this.children.length; d < h; ++d)if (b(this.children[d])) return this.children[d]; return null }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var b = 0, d = a.length; b < d; ++b)a[b].parent = this }, getOuterHtml: function () {
                var a =
                    new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml()
            }, split: function (a) { for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), k = 0; k < b.length; ++k)b[k].parent = d; d.children = b; b[0] && (b[0].previous = null); 0 < a && (this.children[a - 1].next = null); this.parent.add(d, this.getIndex() + 1); return d }, find: function (a, b) {
                void 0 === b && (b = !1); var d = [], k; for (k = 0; k < this.children.length; k++) {
                    var g = this.children[k]; "function" == typeof a && a(g) ? d.push(g) : "string" == typeof a && g.name === a && d.push(g);
                    b && g.find && (d = d.concat(g.find(a, b)))
                } return d
            }, addClass: function (a) { if (!this.hasClass(a)) { var b = this.attributes["class"] || ""; this.attributes["class"] = b + (b ? " " : "") + a } }, removeClass: function (a) { var b = this.attributes["class"]; b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]) }, hasClass: function (a) { var b = this.attributes["class"]; return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1 }, getFilterContext: function (a) {
                var b =
                    []; a || (a = { off: !1, nonEditable: !1, nestedEditable: !1 }); a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0); if (b.length) { a = CKEDITOR.tools.copy(a); for (var d = 0; d < b.length; d += 2)a[b[d]] = b[d + 1] } return a
            }
        }, !0)
    })();
    (function () { var a = /{([^}]+)}/g; CKEDITOR.template = function (a) { this.source = String(a) }; CKEDITOR.template.prototype.output = function (d, b) { var c = this.source.replace(a, function (a, b) { return void 0 !== d[b] ? d[b] : a }); return b ? b.push(c) : c } })(); delete CKEDITOR.loadFullCore; CKEDITOR.instances = {}; CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function (a) { CKEDITOR.instances[a.name] = a; a.on("focus", function () { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) }); a.on("blur", function () { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) }); CKEDITOR.fire("instance", null, a) }; CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] };
    (function () { var a = {}; CKEDITOR.addTemplate = function (d, b) { var c = a[d]; if (c) return c; c = { name: d, source: b }; CKEDITOR.fire("template", c); return a[d] = new CKEDITOR.template(c.source) }; CKEDITOR.getTemplate = function (d) { return a[d] } })(); (function () { var a = []; CKEDITOR.addCss = function (d) { a.push(d) }; CKEDITOR.getCss = function () { return a.join("\n") } })(); CKEDITOR.on("instanceDestroyed", function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }); CKEDITOR.TRISTATE_ON = 1; CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function () {
        CKEDITOR.inline = function (a, d) {
            if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; var b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE), c = a.is("textarea") ? a : null; c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document),
                a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0); b.on("loaded", function () { b.fire("uiReady"); b.editable(a); b.container = a; b.ui.contentsElement = a; b.setData(b.getData(1)); b.resetDirty(); b.fire("contentDom"); b.mode = "wysiwyg"; b.fire("mode"); b.status = "ready"; b.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, b) }, null, null, 1E4); b.on("destroy", function () { c && (b.container.clearCustomData(), b.container.remove(), c.show()); b.element.clearCustomData(); delete b.element });
            return b
        }; CKEDITOR.inlineAll = function () { var a, d, b; for (b in CKEDITOR.dtd.$editable) for (var c = CKEDITOR.document.getElementsByTag(b), f = 0, h = c.count(); f < h; f++)a = c.getItem(f), "true" == a.getAttribute("contenteditable") && (d = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", d) && CKEDITOR.inline(a, d.config)) }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
    })(); CKEDITOR.replaceClass = "ckeditor";
    (function () {
        function a(a, f, h, k) {
            if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; var g = new CKEDITOR.editor(f, a, k); k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), g._.required = a.hasAttribute("required"), a.removeAttribute("required")); h && g.setData(h, null, !0); g.on("loaded", function () {
                b(g); k == CKEDITOR.ELEMENT_MODE_REPLACE && g.config.autoUpdateElement &&
                    a.$.form && g._attachToForm(); g.setMode(g.config.startupMode, function () { g.resetDirty(); g.status = "ready"; g.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, g) })
            }); g.on("destroy", d); return g
        } function d() { var a = this.container, b = this.element; a && (a.clearCustomData(), a.remove()); b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element) } function b(a) {
            var b = a.name, d = a.element, k = a.elementMode, g =
                a.fire("uiSpace", { space: "top", html: "" }).html, m = a.fire("uiSpace", { space: "bottom", html: "" }).html, r = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                b = CKEDITOR.dom.element.createFromHtml(r.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: g ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + g + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: m ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + m + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" })); k == CKEDITOR.ELEMENT_MODE_REPLACE ?
                    (d.hide(), b.insertAfter(d)) : d.append(b); a.container = b; a.ui.contentsElement = a.ui.space("contents"); g && a.ui.space("top").unselectable(); m && a.ui.space("bottom").unselectable(); d = a.config.width; k = a.config.height; d && b.setStyle("width", CKEDITOR.tools.cssLength(d)); k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k)); b.disableContextMenu(); CKEDITOR.env.webkit && b.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
        } CKEDITOR.replace = function (b, d) { return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
        CKEDITOR.appendTo = function (b, d, h) { return a(b, d, h, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) { var d = null, k = a[b]; if (k.name || k.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](k, d))) continue; this.replace(k, d) } } }; CKEDITOR.editor.prototype.addMode = function (a, b) {
            (this._.modes || (this._.modes =
                {}))[a] = b
        }; CKEDITOR.editor.prototype.setMode = function (a, b) {
            var d = this, k = this._.modes; if (a != d.mode && k && k[a]) {
                d.fire("beforeSetMode", a); if (d.mode) { var g = d.checkDirty(), k = d._.previousModeData, m, r = 0; d.fire("beforeModeUnload"); d.editable(0); d._.previousMode = d.mode; d._.previousModeData = m = d.getData(1); "source" == d.mode && k == m && (d.fire("lockSnapshot", { forceUpdate: !0 }), r = 1); d.ui.space("contents").setHtml(""); d.mode = "" } else d._.previousModeData = d.getData(1); this._.modes[a](function () {
                    d.mode = a; void 0 !== g && !g &&
                        d.resetDirty(); r ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot"); setTimeout(function () { d.fire("mode"); b && b.call(d) }, 0)
                })
            }
        }; CKEDITOR.editor.prototype.resize = function (a, b, d, k) {
            var g = this.container, m = this.ui.space("contents"), r = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; k = k ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : g; k.setSize("width", a, !0); r && (r.style.width = "1%"); var e = (k.$.offsetHeight || 0) - (m.$.clientHeight ||
                0), g = Math.max(b - (d ? 0 : e), 0); b = d ? b + e : b; m.setStyle("height", g + "px"); r && (r.style.width = "100%"); this.fire("resize", { outerHeight: b, contentsHeight: g, outerWidth: a || k.getSize("width") })
        }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
    })(); CKEDITOR.config.startupMode = "wysiwyg";
    (function () {
        function a(a) {
            var b = a.editor, e = a.data.path, f = e.blockLimit, h = a.data.selection, g = h.getRanges()[0], t; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (h = d(h, e)) h.appendBogus(), t = CKEDITOR.env.ie; k(b, e.block, f) && g.collapsed && !g.getCommonAncestor().isReadOnly() && (e = g.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f = new CKEDITOR.dom.walker(e), f.guard = function (a) { return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !f.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) &&
                (b = g.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), t = 1, a.cancel()); t && g.select()
        } function d(a, b) { if (a.isFake) return 0; var d = b.block || b.blockLimit, e = d && d.getLast(c); if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus())) return d } function b(a) {
            var b = a.data.getTarget(); b.is("input") &&
                (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
        } function c(a) { return e(a) && y(a) } function f(a, b) { return function (c) { var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c) } } function h(a) {
            function b(a) { return function (b, e) { e && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b); if (!(e || !c(b) || a && B(b))) return !1 } } var d, e = a.getRanges()[0]; a = a.root;
            var f = { table: 1, ul: 1, ol: 1, dl: 1 }; if (e.startPath().contains(f)) { var h = e.clone(); h.collapse(1); h.setStartAt(a, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(h); a.guard = b(); a.checkBackward(); if (d) return h = e.clone(), h.collapse(), h.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(h), a.guard = b(!0), d = !1, a.checkForward(), d } return null
        } function k(a, b, c) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable")) }
        function g(a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function m(a) { var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") }, 0) } function r(a, b, c) { var d = a.getCommonAncestor(b); for (b = a = c ? b : a; (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();)b = a; b.remove() } var e, y, x, B, D, w, p, J, u, K; CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element, $: function (a, b) {
                this.base(b.$ ||
                    b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup()
            }, proto: {
                focus: function () {
                    var a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try {
                        if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) {
                            var b =
                                this.$.scrollTop; this.$.focus(); this.$.scrollTop = b
                        } else this.$.focus(); else this.$.setActive()
                    } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                }, on: function (a, b) { var c = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = f(b, this), c[0] = a, c[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, c) }, attachListener: function (a) {
                    !this._.listeners &&
                        (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b); this._.listeners.push(b); return b
                }, clearListeners: function () { var a = this._.listeners; try { for (; a.length;)a.pop().removeListener() } catch (b) { } }, restoreAttrs: function () { var a = this._.attrChanges, b, c; for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c)) }, attachClass: function (a) {
                    var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes",
                        b), this.addClass(a))
                }, changeAttr: function (a, b) { var c = this.getAttribute(a); b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b)) }, insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), "text") }, transformPlainTextToHtml: function (a) {
                    var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a,
                        b)
                }, insertHtml: function (a, b, c) { var d = this.editor; d.focus(); d.fire("saveSnapshot"); c || (c = d.getSelection().getRanges()[0]); w(this, b || "html", a, c); c.select(); m(this); this.editor.fire("afterInsertHtml", {}) }, insertHtmlIntoRange: function (a, b, c) { w(this, c || "html", a, b); this.editor.fire("afterInsertHtml", { intoRange: b }) }, insertElement: function (a, b) {
                    var d = this.editor; d.focus(); d.fire("saveSnapshot"); var e = d.activeEnterMode, d = d.getSelection(), f = a.getName(), f = CKEDITOR.dtd.$block[f]; b || (b = d.getRanges()[0]); this.insertElementIntoRange(a,
                        b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function (a) { return c(a) && !B(a) })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || e == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0, e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(f)))); d.selectRanges([b]); m(this)
                }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                    var c = this.editor, d = c.config.enterMode,
                        e = a.getName(), f = CKEDITOR.dtd.$block[e]; if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? p(b) : b.startContainer.is(CKEDITOR.dtd.$list) && J(b)); var t, C; if (f) for (; (t = b.getCommonAncestor(0, 1)) && (C = CKEDITOR.dtd[t.getName()]) && (!C || !C[e]);)t.getName() in CKEDITOR.dtd.span ? b.splitElement(t) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(t), b.collapse(!0), t.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ?
                            "div" : "p", c.editable()); b.insertNode(a); return !0
                }, setData: function (a, b) { b || (a = this.editor.dataProcessor.toHtml(a)); this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady") }, getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () {
                    this.removeClass("cke_editable"); this.status = "detached"; var a = this.editor; this._.detach();
                    delete a.document; delete a.window
                }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) }, fixInitialSelection: function () {
                    function a() {
                        var b = c.getDocument().$, d = b.getSelection(), e; a: if (d.anchorNode && d.anchorNode == c.$) e = !0; else { if (CKEDITOR.env.webkit && (e = c.getDocument().getActive()) && e.equals(c) && !d.anchorNode) { e = !0; break a } e = void 0 } e && (e = new CKEDITOR.dom.range(c), e.moveToElementEditStart(c), b = b.createRange(), b.setStart(e.startContainer.$, e.startOffset), b.collapse(!0), d.removeAllRanges(),
                            d.addRange(b))
                    } function b() { var a = c.getDocument().$, d = a.selection, e = c.getDocument().getActive(); "None" == d.type && e.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select()) } var c = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(), a(); else this.once("focus",
                        function () { a() }, null, null, -999)
                }, getHtmlFromRange: function (a) { if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document); a = { doc: this.getDocument(), range: a.clone() }; u.eol.detect(a, this); u.bogus.exclude(a); u.cell.shrink(a); a.fragment = a.range.cloneContents(); u.tree.rebuild(a, this); u.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$) }, extractHtmlFromRange: function (a, b) {
                    var c = K, d = { range: a, doc: a.document }, e = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(), e; a.enlarge(CKEDITOR.ENLARGE_INLINE,
                        1); c.table.detectPurge(d); d.bookmark = a.createBookmark(); delete d.range; var f = this.editor.createRange(); f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); d.targetBookmark = f.createBookmark(); c.list.detectMerge(d, this); c.table.detectRanges(d, this); c.block.detectMerge(d, this); d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d))); a.moveToBookmark(d.targetBookmark); a.optimize();
                    c.fixUneditableRangePosition(a); c.list.merge(d, this); c.table.purge(d, this); c.block.merge(d, this); if (b) { c = a.startPath(); if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var d = c.block.getElementsByTag("span"), f = 0, t; if (d) for (; t = d.getItem(f++);)if (!y(t)) { d = !0; break a } d = !1 } d = !d } d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), x(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings();
                    return e
                }, setup: function () {
                    var a = this.editor; this.attachListener(a, "beforeGetData", function () { var b = this.getData(); this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(D, function (a, b) { return b })); a.setData(b, null, 1) }, this); this.attachListener(a, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(a, "afterSetData", function () { this.setData(a.getData(1)) }, this); this.attachListener(a, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(a,
                        "beforeFocus", function () { var b = a.getSelection(); (b = b && b.getNative()) && "Control" == b.type || this.focus() }, this); this.attachListener(a, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(a, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass("cke_editable"); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") :
                            a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll", function () { a._.previousScrollTop = a.editable().$.scrollTop }, null,
                                null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) { var d = function () { var b = a.editable(); null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d)) }; this.on("scroll", d) } a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () { a.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr("tabindex", a.tabIndex); if (!this.is("textarea")) {
                                    a.document =
                                        this.getDocument(); a.window = this.getWindow(); var f = a.document; this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker); var g = a.config.contentsLangDirection; this.getDirection(1) != g && this.changeAttr("dir", g); var k = CKEDITOR.getCss(); if (k) {
                                            var g = f.getHead(), p = g.getCustomData("stylesheet"); p ? k != p.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? p.$.styleSheet.cssText = k : p.setText(k)) : (k = f.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), g.setCustomData("stylesheet",
                                                k), k.data("cke-temp", 1))
                                        } g = f.getCustomData("stylesheet_ref") || 0; f.setCustomData("stylesheet_ref", g + 1); this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var t = { 8: 1, 46: 1 }; this.attachListener(a, "key", function (b) {
                                            if (a.readOnly) return !0; var c = b.data.domEvent.getKey(), d; b = a.getSelection(); if (0 !== b.getRanges().length) {
                                                if (c in
                                                    t) {
                                                    var f, g = b.getRanges()[0], n = g.startPath(), k, v, A, c = 8 == c; CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (f = b.getSelectedElement()) || (f = h(b)) ? (a.fire("saveSnapshot"), g.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove(), g.select(), a.fire("saveSnapshot"), d = 1) : g.collapsed && ((k = n.block) && (A = k[c ? "getPrevious" : "getNext"](e)) && A.type == CKEDITOR.NODE_ELEMENT && A.is("table") && g[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), g[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && k.remove(), g["moveToElementEdit" +
                                                        (c ? "End" : "Start")](A), g.select(), a.fire("saveSnapshot"), d = 1) : n.blockLimit && n.blockLimit.is("td") && (v = n.blockLimit.getAscendant("table")) && g.checkBoundaryOfElement(v, c ? CKEDITOR.START : CKEDITOR.END) && (A = v[c ? "getPrevious" : "getNext"](e)) ? (a.fire("saveSnapshot"), g["moveToElementEdit" + (c ? "End" : "Start")](A), g.checkStartOfBlock() && g.checkEndOfBlock() ? A.remove() : g.select(), a.fire("saveSnapshot"), d = 1) : (v = n.contains(["td", "th", "caption"])) && g.checkBoundaryOfElement(v, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                                                } return !d
                                            }
                                        });
                                    a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function (b) { b.data.getKeystroke() in t && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select()) }); this.attachListener(this, "dblclick", function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire("doubleclick", b) }); CKEDITOR.env.ie && this.attachListener(this, "click", b); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown",
                                        function (b) { var c = b.data.getTarget(); c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault()) }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) { (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
                                            if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(D, ""))) {
                                                var c = a.createRange();
                                                c.moveToElementEditStart(b); c.select(!0)
                                            }
                                        }); CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                                            if (a.readOnly) return !0; var c = b.data.domEvent.getKey(); if (c in t && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                                var c = 8 == c, d = b.getRanges()[0]; b = d.startPath();
                                                if (d.collapsed) a: {
                                                    var e = b.block; if (e && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(e, !c) && d.collapsed) {
                                                        if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) { var f = d.startContainer.getChild(d.startOffset - (c ? 1 : 0)); if (f && f.type == CKEDITOR.NODE_ELEMENT && f.is("hr")) { a.fire("saveSnapshot"); f.remove(); b = !0; break a } } d = d.startPath().block; if (!d || d && d.contains(e)) b = void 0; else {
                                                            a.fire("saveSnapshot"); var n; (n = (c ? d : e).getBogus()) && n.remove(); n = a.getSelection(); f = n.createBookmarks();
                                                            (c ? e : d).moveChildren(c ? d : e, !1); b.lastElement.mergeSiblings(); r(e, d, !c); n.selectBookmarks(f); b = !0
                                                        }
                                                    } else b = !1
                                                } else c = d, n = b.block, d = c.endPath().block, n && d && !n.equals(d) ? (a.fire("saveSnapshot"), (e = n.getBogus()) && e.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(n, !1), b.lastElement.mergeSiblings(), r(n, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1; if (!b) return;
                                                a.getSelection().scrollIntoView(); a.fire("saveSnapshot"); return !1
                                            }
                                        }, this, null, 100)
                                }
                }
            }, _: {
                detach: function () {
                    this.editor.setData(this.editor.getData(), 0, 1); this.clearListeners(); this.restoreAttrs(); var a; if (a = this.removeCustomData("classes")) for (; a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) { a = this.getDocument(); var b = a.getHead(); if (b.getCustomData("stylesheet")) { var c = a.getCustomData("stylesheet_ref"); --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove()) } } this.editor.fire("contentDomUnload");
                    delete this.editor
                }
            }
        }); CKEDITOR.editor.prototype.editable = function (a) { var b = this._.editable; if (b && a) return 0; arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null)); return b }; CKEDITOR.on("instanceLoaded", function (b) {
            var c = b.editor; c.on("insertElement", function (a) {
                a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ?
                    "true" : "1"), a.setAttribute("contentEditable", !1))
            }); c.on("selectionChange", function (b) { if (!c.readOnly) { var d = c.getSelection(); d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty()) } })
        }); CKEDITOR.on("instanceCreated", function (a) {
            var b = a.editor; b.on("mode", function () {
                var a = b.editable(); if (a && a.isInline()) {
                    var c = b.title; a.changeAttr("role", "textbox"); a.changeAttr("aria-label", c); c && a.changeAttr("title", c); var d = b.fire("ariaEditorHelpLabel", {}).label;
                    if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) { var e = CKEDITOR.tools.getNextId(), d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e"); c.append(d); a.changeAttr("aria-describedby", e) }
                }
            })
        }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"); e = CKEDITOR.dom.walker.whitespaces(!0); y = CKEDITOR.dom.walker.bookmark(!1, !0); x = CKEDITOR.dom.walker.empty();
        B = CKEDITOR.dom.walker.bogus(); D = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; w = function () {
            function a(b) { return b.type == CKEDITOR.NODE_ELEMENT } function b(c, d) {
                var e, f, t, g, h = [], k = d.range.startContainer; e = d.range.startPath(); for (var k = C[k.getName()], z = 0, H = c.getChildren(), p = H.count(), m = -1, r = -1, P = 0, E = e.contains(C.$list); z < p; ++z)e = H.getItem(z), a(e) ? (t = e.getName(), E && t in CKEDITOR.dtd.$list ? h = h.concat(b(e, d)) : (g = !!k[t],
                    "br" != t || !e.data("cke-eol") || z && z != p - 1 || (P = (f = z ? h[z - 1].node : H.getItem(z + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && C.$block[f.getName()]), -1 != m || g || (m = z), g || (r = z), h.push({ isElement: 1, isLineBreak: P, isBlock: e.isBlockBoundary(), hasBlockSibling: f, node: e, name: t, allowed: g }), f = P = 0)) : h.push({ isElement: 0, node: e, allowed: 1 }); -1 < m && (h[m].firstNotAllowed = 1); -1 < r && (h[r].lastNotAllowed = 1); return h
            } function d(b, c) {
                var e = [], f = b.getChildren(), t = f.count(), h, g = 0, z = C[c], k = !b.is(C.$inline) || b.is("br"); for (k && e.push(" "); g < t; g++)h =
                    f.getItem(g), a(h) && !h.is(z) ? e = e.concat(d(h, c)) : e.push(h); k && e.push(" "); return e
            } function e(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function f(b) { return b && a(b) && (b.is(C.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) } function h(b, c, d, e) {
                var f = b.clone(), t, g; f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (t = (new CKEDITOR.dom.walker(f)).next()) && a(t) && z[t.getName()] && (g = t.getPrevious()) && a(g) && !g.getParent().equals(b.startContainer) && d.contains(g) && e.contains(t) && t.isIdentical(g) &&
                    (t.moveChildren(g), t.remove(), h(b, c, d, e))
            } function t(b, c) { function d(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 } var e = c.endContainer.getChild(c.endOffset), f = c.endContainer.getChild(c.endOffset - 1); e && d(e, b[b.length - 1]); f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse()) } var C = CKEDITOR.dtd, z = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, H = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, p = CKEDITOR.tools.extend({},
                C.$inline); delete p.br; return function (z, n, N, v) {
                    var A = z.editor, G = !1; "unfiltered_html" == n && (n = "html", G = !0); if (!v.checkReadOnly()) {
                        var I = (new CKEDITOR.dom.elementPath(v.startContainer, v.root)).blockLimit || v.root; z = { type: n, dontFilter: G, editable: z, editor: A, range: v, blockLimit: I, mergeCandidates: [], zombies: [] }; n = z.range; v = z.mergeCandidates; var m, r; "text" == z.type && n.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (m = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", n.document), n.insertNode(m),
                            n.setStartAfter(m)); G = new CKEDITOR.dom.elementPath(n.startContainer); z.endPath = I = new CKEDITOR.dom.elementPath(n.endContainer); if (!n.collapsed) { var A = I.block || I.blockLimit, x = n.getCommonAncestor(); A && !A.equals(x) && !A.contains(x) && n.checkEndOfBlock() && z.zombies.push(A); n.deleteContents() } for (; (r = e(n)) && a(r) && r.isBlockBoundary() && G.contains(r);)n.moveToPosition(r, CKEDITOR.POSITION_BEFORE_END); h(n, z.blockLimit, G, I); m && (n.setEndBefore(m), n.collapse(), m.remove()); m = n.startPath(); if (A = m.contains(f, !1, 1)) n.splitElement(A),
                                z.inlineStylesRoot = A, z.inlineStylesPeak = m.lastElement; m = n.createBookmark(); (A = m.startNode.getPrevious(c)) && a(A) && f(A) && v.push(A); (A = m.startNode.getNext(c)) && a(A) && f(A) && v.push(A); for (A = m.startNode; (A = A.getParent()) && f(A);)v.push(A); n.moveToBookmark(m); if (m = N) {
                                    m = z.range; if ("text" == z.type && z.inlineStylesRoot) { r = z.inlineStylesPeak; n = r.getDocument().createText("{cke-peak}"); for (v = z.inlineStylesRoot.getParent(); !r.equals(v);)n = n.appendTo(r.clone()), r = r.getParent(); N = n.getOuterHtml().split("{cke-peak}").join(N) } r =
                                        z.blockLimit.getName(); if (/^\s+|\s+$/.test(N) && "span" in CKEDITOR.dtd[r]) { var w = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; N = w + N + w } N = z.editor.dataProcessor.toHtml(N, { context: null, fixForBody: !1, protectedWhitespaces: !!w, dontFilter: z.dontFilter, filter: z.editor.activeFilter, enterMode: z.editor.activeEnterMode }); r = m.document.createElement("body"); r.setHtml(N); w && (r.getFirst().remove(), r.getLast().remove()); if ((w = m.startPath().block) && (1 != w.getChildCount() || !w.getBogus())) a: {
                                            var y; if (1 ==
                                                r.getChildCount() && a(y = r.getFirst()) && y.is(H) && !y.hasAttribute("contenteditable")) { w = y.getElementsByTag("*"); m = 0; for (v = w.count(); m < v; m++)if (n = w.getItem(m), !n.is(p)) break a; y.moveChildren(y.getParent(1)); y.remove() }
                                        } z.dataWrapper = r; m = N
                                } if (m) {
                                    y = z.range; m = y.document; var u; r = z.blockLimit; v = 0; var B, w = [], D, T; N = A = 0; var J, K; n = y.startContainer; var G = z.endPath.elements[0], W, I = G.getPosition(n), x = !!G.getCommonAncestor(n) && I != CKEDITOR.POSITION_IDENTICAL && !(I & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                                    n = b(z.dataWrapper, z); for (t(n, y); v < n.length; v++) {
                                        I = n[v]; if (u = I.isLineBreak) { u = y; J = r; var S = void 0, Y = void 0; I.hasBlockSibling ? u = 1 : (S = u.startContainer.getAscendant(C.$block, 1)) && S.is({ div: 1, p: 1 }) ? (Y = S.getPosition(J), Y == CKEDITOR.POSITION_IDENTICAL || Y == CKEDITOR.POSITION_CONTAINS ? u = 0 : (J = u.splitElement(S), u.moveToPosition(J, CKEDITOR.POSITION_AFTER_START), u = 1)) : u = 0 } if (u) N = 0 < v; else {
                                            u = y.startPath(); !I.isBlock && k(z.editor, u.block, u.blockLimit) && (T = g(z.editor)) && (T = m.createElement(T), T.appendBogus(), y.insertNode(T),
                                                CKEDITOR.env.needsBrFiller && (B = T.getBogus()) && B.remove(), y.moveToPosition(T, CKEDITOR.POSITION_BEFORE_END)); if ((u = y.startPath().block) && !u.equals(D)) { if (B = u.getBogus()) B.remove(), w.push(u); D = u } I.firstNotAllowed && (A = 1); if (A && I.isElement) {
                                                    u = y.startContainer; for (J = null; u && !C[u.getName()][I.name];) { if (u.equals(r)) { u = null; break } J = u; u = u.getParent() } if (u) J && (K = y.splitElement(J), z.zombies.push(K), z.zombies.push(J)); else {
                                                        J = r.getName(); W = !v; u = v == n.length - 1; J = d(I.node, J); for (var S = [], Y = J.length, Z = 0, ba = void 0,
                                                            ca = 0, U = -1; Z < Y; Z++)ba = J[Z], " " == ba ? (ca || W && !Z || (S.push(new CKEDITOR.dom.text(" ")), U = S.length), ca = 1) : (S.push(ba), ca = 0); u && U == S.length && S.pop(); W = S
                                                    }
                                                } if (W) { for (; u = W.pop();)y.insertNode(u); W = 0 } else y.insertNode(I.node); I.lastNotAllowed && v < n.length - 1 && ((K = x ? G : K) && y.setEndAt(K, CKEDITOR.POSITION_AFTER_START), A = 0); y.collapse()
                                        }
                                    } 1 != n.length ? B = !1 : (B = n[0], B = B.isElement && "false" == B.node.getAttribute("contenteditable")); B && (N = !0, u = n[0].node, y.setStartAt(u, CKEDITOR.POSITION_BEFORE_START), y.setEndAt(u, CKEDITOR.POSITION_AFTER_END));
                                    z.dontMoveCaret = N; z.bogusNeededBlocks = w
                                } B = z.range; var R; K = z.bogusNeededBlocks; for (W = B.createBookmark(); D = z.zombies.pop();)D.getParent() && (T = B.clone(), T.moveToElementEditStart(D), T.removeEmptyBlocksAtEnd()); if (K) for (; D = K.pop();)CKEDITOR.env.needsBrFiller ? D.appendBogus() : D.append(B.document.createText(" ")); for (; D = z.mergeCandidates.pop();)D.mergeSiblings(); B.moveToBookmark(W); if (!z.dontMoveCaret) {
                                    for (D = e(B); D && a(D) && !D.is(C.$empty);) {
                                        if (D.isBlockBoundary()) B.moveToPosition(D, CKEDITOR.POSITION_BEFORE_END);
                                        else { if (f(D) && D.getHtml().match(/(\s|&nbsp;)$/g)) { R = null; break } R = B.clone(); R.moveToPosition(D, CKEDITOR.POSITION_BEFORE_END) } D = D.getLast(c)
                                    } R && B.moveToRange(R)
                                }
                    }
                }
        }(); p = function () {
            function a(b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b } function b(a, c, d) { c = a.getDocument().createElement(c); a.append(c, d); return c } function c(a) {
                var b = a.count(),
                    d; for (b; 0 < b--;)d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
            } return function (d) {
                var e = d.startContainer, f = e.getAscendant("table", 1), t = !1; c(f.getElementsByTag("td")); c(f.getElementsByTag("th")); f = d.clone(); f.setStart(e, 0); f = a(f).lastBackward(); f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), t = !0); f || (f = e); f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START),
                    d.collapse(!0), f.remove()) : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, "tr", t)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", t)), (e = f.getBogus()) && e.remove(), d.moveToPosition(f, t ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }(); J = function () {
            function a(b) {
                b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) {
                    return a.type == CKEDITOR.NODE_ELEMENT &&
                        a.is(CKEDITOR.dtd.$listItem)
                }; return b
            } return function (b) { var c = b.startContainer, d = !1, e; e = b.clone(); e.setStart(c, 0); e = a(e).lastBackward(); e || (e = b.clone(), e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), e = a(e).lastForward(), d = !0); e || (e = c); e.is(CKEDITOR.dtd.$list) ? (b.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), e.remove()) : ((c = e.getBogus()) && c.remove(), b.moveToPosition(e, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select()) }
        }(); u = {
            eol: {
                detect: function (a, b) {
                    var c = a.range,
                        d = c.clone(), e = c.clone(), f = new CKEDITOR.dom.elementPath(c.startContainer, b), t = new CKEDITOR.dom.elementPath(c.endContainer, b); d.collapse(1); e.collapse(); f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1); t.block && e.checkBoundaryOfElement(t.block, CKEDITOR.START) && (c.setEndBefore(t.block), a.appendEolBr = 1)
                }, fix: function (a, b) {
                    var c = b.getDocument(), d; a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d)); !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c),
                        1)
                }, createEolBr: function (a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
            }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode; !b || !B(b) || c && c.equals(b) || a.range.setEndBefore(b) } }, tree: {
                rebuild: function (a, b) {
                    var c = a.range, d = c.getCommonAncestor(), e = new CKEDITOR.dom.elementPath(d, b), f = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), t; d.type == CKEDITOR.NODE_TEXT && (d = d.getParent()); if (e.blockLimit.is({
                        tr: 1,
                        table: 1
                    })) { var g = e.contains("table").getParent(); t = function (a) { return !a.equals(g) } } else if (e.block && e.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) { var h = e.contains(CKEDITOR.dtd.$list).getParent(); t = function (a) { return !a.equals(h) } } t || (t = function (a) { return !a.equals(e.block) && !a.equals(e.blockLimit) }); this.rebuildFragment(a, b, d, t)
                }, rebuildFragment: function (a, b, c, d) {
                    for (var e; c && !c.equals(b) && d(c);)e = c.clone(0, 1), a.fragment.appendTo(e),
                        a.fragment = e, c = c.getParent()
                }
            }, cell: { shrink: function (a) { a = a.range; var b = a.startContainer, c = a.endContainer, d = a.startOffset, e = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT) } }
        }; K = function () {
            function a(b, c) { var d = b.getParent(); if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d) } function b(c, d, e) { a(d); a(e, 1); for (var f; f = e.getNext();)f.insertAfter(d), d = f; x(c) && c.remove() } function c(a, b) {
                var d = new CKEDITOR.dom.range(a); d.setStartAfter(b.startNode);
                d.setEndBefore(b.endNode); return d
            } return {
                list: {
                    detectMerge: function (a, b) {
                        var d = c(b, a.bookmark), e = d.startPath(), f = d.endPath(), g = e.contains(CKEDITOR.dtd.$list), h = f.contains(CKEDITOR.dtd.$list); a.mergeList = g && h && g.getParent().equals(h.getParent()) && !g.equals(h); a.mergeListItems = e.block && f.block && e.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark =
                            d.createBookmark()
                    }, merge: function (a, c) { if (a.mergeListBookmark) { var d = a.mergeListBookmark.startNode, e = a.mergeListBookmark.endNode, f = new CKEDITOR.dom.elementPath(d, c), g = new CKEDITOR.dom.elementPath(e, c); if (a.mergeList) { var h = f.contains(CKEDITOR.dtd.$list), k = g.contains(CKEDITOR.dtd.$list); h.equals(k) || (k.moveChildren(h), k.remove()) } a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), g = g.contains(CKEDITOR.dtd.$listItem), f.equals(g) || b(g, d, e)); d.remove(); e.remove() } }
                }, block: {
                    detectMerge: function (a,
                        b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode); c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark() } }, merge: function (a, c) { if (a.mergeBlockBookmark && !a.purgeTableBookmark) { var d = a.mergeBlockBookmark.startNode, e = a.mergeBlockBookmark.endNode, f = new CKEDITOR.dom.elementPath(d, c), g = new CKEDITOR.dom.elementPath(e, c), f = f.block, g = g.block; f && g && !f.equals(g) && b(g, d, e); d.remove(); e.remove() } }
                }, table: function () {
                    function a(c) {
                        var e =
                            [], f, g = new CKEDITOR.dom.walker(c), h = c.startPath().contains(d), k = c.endPath().contains(d), n = {}; g.guard = function (a, g) {
                                if (a.type == CKEDITOR.NODE_ELEMENT) { var A = "visited_" + (g ? "out" : "in"); if (a.getCustomData(A)) return; CKEDITOR.dom.element.setMarker(n, a, A, 1) } if (g && h && a.equals(h)) f = c.clone(), f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), e.push(f); else if (!g && k && a.equals(k)) f = c.clone(), f.setStartAt(k, CKEDITOR.POSITION_AFTER_START), e.push(f); else {
                                    if (A = !g) A = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!h || b(a, h)) && (!k ||
                                        b(a, k)); if (!A && (A = g)) if (a.is(d)) var A = h && h.getAscendant("table", !0), l = k && k.getAscendant("table", !0), H = a.getAscendant("table", !0), A = A && A.contains(H) || l && l.contains(H); else A = void 0; A && (f = c.clone(), f.selectNodeContents(a), e.push(f))
                                }
                            }; g.lastForward(); CKEDITOR.dom.element.clearAllMarkers(n); return e
                    } function b(a, c) { var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED, e = a.getPosition(c); return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d) } var d = { td: 1, th: 1, caption: 1 }; return {
                        detectPurge: function (a) {
                            var b =
                                a.range, c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c), e = 0; c.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e }; c.checkForward(); if (1 < e) { var c = b.startPath().contains("table"), f = b.endPath().contains("table"); c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark()) }
                        }, detectRanges: function (e, f) {
                            var g = c(f, e.bookmark), h = g.clone(),
                                k, l, n = g.getCommonAncestor(); n.is(CKEDITOR.dtd.$tableContent) && !n.is(d) && (n = n.getAscendant("table", !0)); l = n; n = new CKEDITOR.dom.elementPath(g.startContainer, l); l = new CKEDITOR.dom.elementPath(g.endContainer, l); n = n.contains("table"); l = l.contains("table"); if (n || l) n && l && b(n, l) ? (e.tableSurroundingRange = h, h.setStartAt(n, CKEDITOR.POSITION_AFTER_END), h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), h = g.clone(), h.setEndAt(n, CKEDITOR.POSITION_AFTER_END), k = g.clone(), k.setStartAt(l, CKEDITOR.POSITION_BEFORE_START),
                                    k = a(h).concat(a(k))) : n ? l || (e.tableSurroundingRange = h, h.setStartAt(n, CKEDITOR.POSITION_AFTER_END), g.setEndAt(n, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange = h, h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), g.setStartAt(l, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = k ? k : a(g)
                        }, deleteRanges: function (a) { for (var b; b = a.tableContentsRanges.pop();)b.extractContents(), x(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents() }, purge: function (a) {
                            if (a.purgeTableBookmark) {
                                var b =
                                    a.doc, c = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark); c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                            }
                        }
                    }
                }(), detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) }, fixUneditableRangePosition: function (a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) }, autoParagraph: function (a, b) {
                    var c =
                        b.startPath(), d; k(a, c.block, c.blockLimit) && (d = g(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START))
                }
            }
        }()
    })();
    (function () {
        function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function d(b, c) {
            if (0 === b.length || a(b[0].getEnclosedNode())) return !1; var d, e; if ((d = !c && 1 === b.length) && !(d = b[0].collapsed)) { var f = b[0]; d = f.startContainer.getAscendant({ td: 1, th: 1 }, !0); var g = f.endContainer.getAscendant({ td: 1, th: 1 }, !0); e = CKEDITOR.tools.trim; d && d.equals(g) && !d.findOne("td, th, tr, tbody, table") ? (f = f.cloneContents(), d = f.getFirst() ? e(f.getFirst().getText()) !== e(d.getText()) : !0) : d = !1 } if (d) return !1;
            for (e = 0; e < b.length; e++)if (d = b[e]._getTableElement(), !d) return !1; return !0
        } function b(a) { function b(a) { a = a.find("td, th"); var c = [], d; for (d = 0; d < a.count(); d++)c.push(a.getItem(d)); return c } var c = [], d, e; for (e = 0; e < a.length; e++)d = a[e]._getTableElement(), d.is && d.is({ td: 1, th: 1 }) ? c.push(d) : c = c.concat(b(d)); return c } function c(a) {
            a = b(a); var c = "", d = [], e, f; for (f = 0; f < a.length; f++)e && !e.equals(a[f].getAscendant("tr")) ? (c += d.join("\t") + "\n", e = a[f].getAscendant("tr"), d = []) : 0 === f && (e = a[f].getAscendant("tr")), d.push(a[f].getText());
            return c += d.join("\t")
        } function f(a) { var b = this.root.editor, d = b.getSelection(1); this.reset(); l = !0; d.root.once("selectionchange", function (a) { a.cancel() }, null, null, 0); d.selectRanges([a[0]]); d = this._.cache; d.ranges = new CKEDITOR.dom.rangeList(a); d.type = CKEDITOR.SELECTION_TEXT; d.selectedElement = a[0]._getTableElement(); d.selectedText = c(a); d.nativeSel = null; this.isFake = 1; this.rev = J++; b._.fakeSelection = this; l = !1; this.root.fire("selectionchange") } function h() {
            var b = this._.fakeSelection, c; if (b) {
                c = this.getSelection(1);
                var e; if (!(e = !c) && (e = !c.isHidden())) {
                    e = b; var f = c.getRanges(), g = e.getRanges(), h = f.length && f[0]._getTableElement() && f[0]._getTableElement().getAscendant("table", !0), n = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0), k = 1 === f.length && f[0]._getTableElement() && f[0]._getTableElement().is("table"), v = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"); if (a(e.getSelectedElement())) e = !1; else {
                        var A = 1 === f.length && f[0].collapsed, g = d(f, !!CKEDITOR.env.webkit) &&
                            d(g); h = h && n ? h.equals(n) || n.contains(h) : !1; h && (A || g) ? (k && !v && e.selectRanges(f), e = !0) : e = !1
                    } e = !e
                } e && (b.reset(), b = 0)
            } if (!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return; this.fire("selectionCheck", b); c = this.elementPath(); c.compare(this._.selectionPreviousPath) || (e = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), CKEDITOR.env.webkit && !e && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange",
                { selection: b, path: c }))
        } function k() { F = !0; q || (g.call(this), q = CKEDITOR.tools.setTimeout(g, 200, this)) } function g() { q = null; F && (CKEDITOR.tools.setTimeout(h, 0, this), F = !1) } function m(a) { return L(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function r(a) {
            function b(c, d) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; var c = a.startContainer, d = a.getPreviousNode(m, null, c), e = a.getNextNode(m, null,
                c); return b(d) || b(e, 1) || !(d || e || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
        } function e(a) { y(a, !1); var b = a.getDocument().createText(u); a.setCustomData("cke-fillingChar", b); return b } function y(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar"); if (c) {
                if (!1 !== b) {
                    var d = a.getDocument().getSelection().getNative(), e = d && "None" != d.type && d.getRangeAt(0), f = u.length; if (c.getLength() > f && e && e.intersectsNode(c.$)) {
                        var n = [{ node: d.anchorNode, offset: d.anchorOffset }, { node: d.focusNode, offset: d.focusOffset }];
                        d.anchorNode == c.$ && d.anchorOffset > f && (n[0].offset -= f); d.focusNode == c.$ && d.focusOffset > f && (n[1].offset -= f)
                    }
                } c.setText(x(c.getText(), 1)); n && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(n[0].node, n[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(n[1].node, n[1].offset))
            }
        } function x(a, b) { return b ? a.replace(K, function (a, b) { return b ? " " : "" }) : a.replace(u, "") } function B(a, b) {
            var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' +
                (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(c); var d = a.getSelection(1), e = a.createRange(), f = d.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); e.setStartAt(c, CKEDITOR.POSITION_AFTER_START); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); d.selectRanges([e]); f.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = c
        } function D(a) {
            var b =
                { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) { var d = c.data.getKeystroke(); if (b[d]) { var e = a.getSelection().getRanges(), f = e[0]; 1 == e.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel()) } }
        } function w(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
                    if (c.startContainer.isReadOnly()) for (var d =
                        c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());)e && "false" == d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent(); d = c.startContainer; e = c.endContainer; var f = c.startOffset, n = c.endOffset, g = c.clone(); d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? g.setStartAfter(d) : g.setStartBefore(d)); e && e.type == CKEDITOR.NODE_TEXT && (n ? g.setEndAfter(e) : g.setEndBefore(e)); d = new CKEDITOR.dom.walker(g); d.evaluator = function (d) {
                            if (d.type == CKEDITOR.NODE_ELEMENT &&
                                d.isReadOnly()) { var e = c.clone(); c.setEndBefore(d); c.collapsed && a.splice(b--, 1); d.getPosition(g.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b + 1, 0, e)); return !0 } return !1
                        }; d.next()
                }
            } return a
        } var p = "function" != typeof window.getSelection, J = 1, u = CKEDITOR.tools.repeat("​", 7), K = new RegExp(u + "( )?", "g"), l, q, F, L = CKEDITOR.dom.walker.invisible(1), E = function () {
            function a(b) {
                return function (a) {
                    var c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                    return !1
                }
            } function b(a) { return function (b) { var c = b.editor, d = c.createRange(), e; if (!c.readOnly) return (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a)), e && c.getSelection().selectRanges([d]), c.fire("saveSnapshot"), b.selected.remove(), e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d])), c.fire("saveSnapshot"), !1 } } var c = a(), d = a(1); return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
        }(); CKEDITOR.on("instanceCreated", function (a) {
            function b() {
                var a =
                    c.getSelection(); a && a.removeAllRanges()
            } var c = a.editor; c.on("contentDom", function () {
                function a() { r = new CKEDITOR.dom.selection(c.getSelection()); r.lock() } function b() { f.removeListener("mouseup", b); t.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, c = a.createRange(); "None" != a.type && c.parentElement() && c.parentElement().ownerDocument == e.$ && c.select() } function d(a) {
                    if (CKEDITOR.env.ie) {
                        var b = (a = a.getRanges()[0]) ? a.startContainer.getAscendant(function (a) {
                            return a.type == CKEDITOR.NODE_ELEMENT &&
                                ("false" == a.getAttribute("contenteditable") || "true" == a.getAttribute("contenteditable"))
                        }, !0) : null; return a && "false" == b.getAttribute("contenteditable") && b
                    }
                } var e = c.document, f = CKEDITOR.document, g = c.editable(), l = e.getBody(), t = e.getDocumentElement(), C = g.isInline(), m, r; CKEDITOR.env.gecko && g.attachListener(g, "focus", function (a) { a.removeListener(); 0 !== m && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$ && (a = c.createRange(), a.moveToElementEditStart(g), a.select()) }, null, null, -2); g.attachListener(g,
                    CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () { m && CKEDITOR.env.webkit && (m = c._.previousActive && c._.previousActive.equals(e.getActive())) && null != c._.previousScrollTop && c._.previousScrollTop != g.$.scrollTop && (g.$.scrollTop = c._.previousScrollTop); c.unlockSelection(m); m = 0 }, null, null, -1); g.attachListener(g, "mousedown", function () { m = 0 }); if (CKEDITOR.env.ie || C) p ? g.attachListener(g, "beforedeactivate", a, null, null, -1) : g.attachListener(c, "selectionCheck", a, null, null, -1), g.attachListener(g, CKEDITOR.env.webkit ?
                        "DOMFocusOut" : "blur", function () { c.lockSelection(r); m = 1 }, null, null, -1), g.attachListener(g, "mousedown", function () { m = 0 }); if (CKEDITOR.env.ie && !C) {
                            var x; g.attachListener(g, "mousedown", function (a) { 2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (x = c.window.getScrollPosition())) }); g.attachListener(g, "mouseup", function (a) { 2 == a.data.$.button && x && (c.document.$.documentElement.scrollLeft = x.x, c.document.$.documentElement.scrollTop = x.y); x = null }); if ("BackCompat" != e.$.compatMode) {
                                if (CKEDITOR.env.ie7Compat ||
                                    CKEDITOR.env.ie6Compat) {
                                    var q, u; t.on("mousedown", function (a) {
                                        function b(a) { a = a.data.$; if (q) { var c = l.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (d) { } q.setEndPoint(0 > u.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c); q.select() } } function c() { t.removeListener("mousemove", b); f.removeListener("mouseup", c); t.removeListener("mouseup", c); q.select() } a = a.data; if (a.getTarget().is("html") && a.$.y < t.$.clientHeight && a.$.x < t.$.clientWidth) {
                                            q = l.$.createTextRange(); try {
                                                q.moveToPoint(a.$.clientX,
                                                    a.$.clientY)
                                            } catch (d) { } u = q.duplicate(); t.on("mousemove", b); f.on("mouseup", c); t.on("mouseup", c)
                                        }
                                    })
                                } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) t.on("mousedown", function (a) { a.data.getTarget().is("html") && (f.on("mouseup", b), t.on("mouseup", b)) })
                            }
                        } g.attachListener(g, "selectionchange", h, c); g.attachListener(g, "keyup", k, c); g.attachListener(g, "keydown", function (a) { var b = this.getSelection(1); d(b) && (b.selectElement(d(b)), a.data.preventDefault()) }, c); g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" :
                            "focus", function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (C && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { var w; g.attachListener(g, "mousedown", function () { w = 1 }); g.attachListener(e.getDocumentElement(), "mouseup", function () { w && k.call(c); w = 0 }) } else g.attachListener(CKEDITOR.env.ie ? g : e.getDocumentElement(), "mouseup", k, c); CKEDITOR.env.webkit && g.attachListener(e, "keydown", function (a) {
                                switch (a.data.getKey()) {
                                    case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: g.hasFocus &&
                                        y(g)
                                }
                            }, null, null, -1); g.attachListener(g, "keydown", D(c), null, null, -1)
            }); c.on("setData", function () { c.unlockSelection(); CKEDITOR.env.webkit && b() }); c.on("contentDomUnload", function () { c.unlockSelection() }); if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9); c.on("dataReady", function () { delete c._.fakeSelection; delete c._.hiddenSelectionContainer; c.selectionChange(1) }); c.on("loadSnapshot", function () {
                var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = c.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") &&
                    (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
            }, null, null, 100); c.on("key", function (a) { if ("wysiwyg" == c.mode) { var b = c.getSelection(); if (b.isFake) { var d = E[a.data.keyCode]; if (d) return d({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
        }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
            var b = a.editor; b.on("selectionChange", function () {
                var a = b.editable(), c = a.getCustomData("cke-fillingChar");
                c && (c.getCustomData("ready") ? (y(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1))
            }, null, null, -1); b.on("beforeSetMode", function () { y(b.editable()) }, null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = x(a.data)) }, b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = x(a.data.dataValue) }, null, null, 0)
        }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? h : k).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) {
            return !this._.savedSelection && !this._.fakeSelection ||
                a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
        }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath };
        CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
            if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var c = a instanceof CKEDITOR.dom.element;
            this.rev = b ? b.rev : J++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var d, e; if (a) if (a.getRangeAt) d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer); else { try { e = a.createRange() } catch (f) { } d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement()) } if (!d ||
                d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
        }; var M = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
            _removeFillingCharSequenceString: x,
            _createFillingCharSequenceNode: e, FILLING_CHAR_SEQUENCE: u
        }); CKEDITOR.dom.selection.prototype = {
            getNative: function () { return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = p ? this.document.$.selection : this.document.getWindow().$.getSelection() }, getType: p ? function () {
                var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try {
                    var c = this.getNative(), d = c.type; "Text" == d && (b = CKEDITOR.SELECTION_TEXT); "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() &&
                        (b = CKEDITOR.SELECTION_TEXT)
                } catch (e) { } return a.type = b
            } : function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) { var c = c.getRangeAt(0), d = c.startContainer; d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && M[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) } return a.type = b }, getRanges: function () {
                var a = p ? function () {
                    function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() }
                    var b = function (b, c) {
                        b = b.duplicate(); b.collapse(c); var d = b.parentElement(); if (!d.hasChildNodes()) return { container: d, offset: 0 }; for (var e = d.children, f, g, h = b.duplicate(), k = 0, l = e.length - 1, t = -1, m, p; k <= l;)if (t = Math.floor((k + l) / 2), f = e[t], h.moveToElementText(f), m = h.compareEndPoints("StartToStart", b), 0 < m) l = t - 1; else if (0 > m) k = t + 1; else return { container: d, offset: a(f) }; if (-1 == t || t == e.length - 1 && 0 > m) {
                            h.moveToElementText(d); h.setEndPoint("StartToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; e = d.childNodes; if (!h) return f =
                                e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: e.length } : { container: f, offset: f.nodeValue.length }; for (d = e.length; 0 < h && 0 < d;)g = e[--d], g.nodeType == CKEDITOR.NODE_TEXT && (p = g, h -= g.nodeValue.length); return { container: p, offset: -h }
                        } h.collapse(0 < m ? !0 : !1); h.setEndPoint(0 < m ? "StartToStart" : "EndToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; if (!h) return { container: d, offset: a(f) + (0 < m ? 0 : 1) }; for (; 0 < h;)try {
                            g = f[0 < m ? "previousSibling" : "nextSibling"], g.nodeType == CKEDITOR.NODE_TEXT && (h -= g.nodeValue.length,
                                p = g), f = g
                        } catch (r) { return { container: d, offset: a(f) } } return { container: p, offset: 0 < m ? -h : p.nodeValue.length + h }
                    }; return function () {
                        var a = this.getNative(), c = a && a.createRange(), d = this.getType(); if (!a) return []; if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() &&
                            a.collapse(), [a]; if (d == CKEDITOR.SELECTION_ELEMENT) { for (var d = [], e = 0; e < c.length; e++) { for (var f = c.item(e), g = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < g.childNodes.length && g.childNodes[h] != f; h++); a.setStart(new CKEDITOR.dom.node(g), h); a.setEnd(new CKEDITOR.dom.node(g), h + 1); d.push(a) } return d } return []
                    }
                }() : function () {
                    var a = [], b, c = this.getNative(); if (!c) return a; for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(e.startContainer),
                            e.startOffset); b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset); a.push(b)
                    } return a
                }; return function (b) { var c = this._.cache, d = c.ranges; d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this))); return b ? w(new CKEDITOR.dom.rangeList(d.slice())) : d }
            }(), getStartElement: function () {
                var a = this._.cache; if (void 0 !== a.startElement) return a.startElement; var b; switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0];
                        if (c) { if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else { for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer } b = b.$ }
                }return a.startElement = b ?
                    new CKEDITOR.dom.element(b) : null
            }, getSelectedElement: function () { var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement; var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () { for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && M[c.getName()] && (d = c)); e--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return d && d.$ }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null }, getSelectedText: function () {
                var a =
                    this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = p ? "Control" == b.type ? "" : b.createRange().text : b.toString(); return a.selectedText = b
            }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                if (this.isLocked) {
                    if (a) var b = this.getSelectedElement(), c = this.getRanges(), e = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body",
                        1) && (d(c) ? f.call(this, c) : e ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
                }
            }, reset: function () { this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) { var c = a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !c && a.resetDirty() } delete a._.hiddenSelectionContainer } else CKEDITOR.warn("selection-fake-reset"); this.rev = J++ }, selectElement: function (a) {
                var b =
                    new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b])
            }, selectRanges: function (a) {
                var b = this.root.editor, c = b && b._.hiddenSelectionContainer; this.reset(); if (c) for (var c = this.root, g, h = 0; h < a.length; ++h)g = a[h], g.endContainer.equals(c) && (g.endOffset = Math.min(g.endOffset, c.getChildCount())); if (a.length) if (this.isLocked) { var k = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); k && !k.equals(this.root) && k.focus() } else {
                    var n; a: {
                        var m, v; if (1 == a.length &&
                            !(v = a[0]).collapsed && (n = v.getEnclosedNode()) && n.type == CKEDITOR.NODE_ELEMENT && (v = v.clone(), v.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (m = v.getEnclosedNode()) && m.type == CKEDITOR.NODE_ELEMENT && (n = m), "false" == n.getAttribute("contenteditable"))) break a; n = void 0
                    } if (n) this.fake(n); else if (b && b.plugins.tableselection && CKEDITOR.plugins.tableselection.isSupportedEnvironment && d(a) && !l) f.call(this, a); else {
                        if (p) {
                            m = CKEDITOR.dom.walker.whitespaces(!0); n = /\ufeff|\u00a0/; v = { table: 1, tbody: 1, tr: 1 }; 1 < a.length && (b = a[a.length -
                                1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var A, G, I; if ((c = b.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in M && (!c.is("a") || !c.getText())) try { I = c.$.createControlRange(); I.addElement(c.$); I.select(); return } catch (q) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in v || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in v) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; I = b.createBookmark(); v = I.startNode; a || (k = I.endNode);
                            I = b.document.$.body.createTextRange(); I.moveToElementText(v.$); I.moveStart("character", 1); k ? (n = b.document.$.body.createTextRange(), n.moveToElementText(k.$), I.setEndPoint("EndToEnd", n), I.moveEnd("character", -1)) : (A = v.getNext(m), G = v.hasAscendant("pre"), A = !(A && A.getText && A.getText().match(n)) && (G || !v.hasPrevious() || v.getPrevious().is && v.getPrevious().is("br")), G = b.document.createElement("span"), G.setHtml("\x26#65279;"), G.insertBefore(v), A && b.document.createText("﻿").insertBefore(v)); b.setStartBefore(v);
                            v.remove(); a ? (A ? (I.moveStart("character", -1), I.select(), b.document.$.selection.clear()) : I.select(), b.moveToPosition(G, CKEDITOR.POSITION_BEFORE_START), G.remove()) : (b.setEndBefore(k), k.remove(), I.select())
                        } else {
                            k = this.getNative(); if (!k) return; this.removeAllRanges(); for (I = 0; I < a.length; I++) {
                                if (I < a.length - 1 && (A = a[I], G = a[I + 1], n = A.clone(), n.setStart(A.endContainer, A.endOffset), n.setEnd(G.startContainer, G.startOffset), !n.collapsed && (n.shrink(CKEDITOR.NODE_ELEMENT, !0), b = n.getCommonAncestor(), n = n.getEnclosedNode(),
                                    b.isReadOnly() || n && n.isReadOnly()))) { G.setStart(A.startContainer, A.startOffset); a.splice(I--, 1); continue } b = a[I]; G = this.document.$.createRange(); b.collapsed && CKEDITOR.env.webkit && r(b) && (n = e(this.root), b.insertNode(n), (A = n.getNext()) && !n.getPrevious() && A.type == CKEDITOR.NODE_ELEMENT && "br" == A.getName() ? (y(this.root), b.moveToPosition(A, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(n, CKEDITOR.POSITION_AFTER_END)); G.setStart(b.startContainer.$, b.startOffset); try { G.setEnd(b.endContainer.$, b.endOffset) } catch (x) {
                                        if (0 <=
                                            x.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), G.setEnd(b.endContainer.$, b.endOffset); else throw x;
                                    } k.addRange(G)
                            }
                        } this.reset(); this.root.fire("selectionchange")
                    }
                }
            }, fake: function (a, b) {
                var c = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label")); this.reset(); B(c, b); var d = this._.cache, e = new CKEDITOR.dom.range(this.root); e.setStartBefore(a); e.setEndAfter(a); d.ranges = new CKEDITOR.dom.rangeList(e); d.selectedElement = d.startElement = a; d.type = CKEDITOR.SELECTION_ELEMENT;
                d.selectedText = d.nativeSel = null; this.isFake = 1; this.rev = J++; c._.fakeSelection = this; this.root.fire("selectionchange")
            }, isHidden: function () { var a = this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) }, isInTable: function (a) { return d(this.getRanges(), a) }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) { a = this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a }, createBookmarks2: function (a) {
                a =
                    this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a
            }, selectBookmarks: function (a) { for (var b = [], c, e = 0; e < a.length; e++) { var f = new CKEDITOR.dom.range(this.root); f.moveToBookmark(a[e]); b.push(f) } a.isFake && (c = d(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !d(b) ? this.fake(c) : this.selectRanges(b); return this }, getCommonAncestor: function () {
                var a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length -
                    1].endContainer) : null
            }, scrollIntoView: function () { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[p ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
        }
    })(); "use strict"; CKEDITOR.STYLE_BLOCK = 1; CKEDITOR.STYLE_INLINE = 2; CKEDITOR.STYLE_OBJECT = 3;
    (function () {
        function a(a, b) { for (var c, d; (a = a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) c = a; else if (!d) { var e = a.getAttribute("contentEditable"); "false" == e ? c = a : "true" == e && (d = 1) } return c } function d(a, b, c, d) { return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a)) } function b(c) {
            var e = c.document; if (c.collapsed) e = J(this, e), c.insertNode(e), c.moveToPosition(e, CKEDITOR.POSITION_BEFORE_END); else {
                var g = this.element, h = this._.definition, k, l = h.ignoreReadonly, m = l || h.includeReadonly; null ==
                    m && (m = c.root.getCustomData("cke_includeReadonly")); var p = CKEDITOR.dtd[g]; p || (k = !0, p = CKEDITOR.dtd.span); c.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.trim(); var r = c.createBookmark(), t = r.startNode, x = r.endNode, q = t, u; if (!l) { var w = c.getCommonAncestor(), l = a(t, w), w = a(x, w); l && (q = l.getNextSourceNode(!0)); w && (x = w) } for (q.getPosition(x) == CKEDITOR.POSITION_FOLLOWING && (q = 0); q;) {
                        l = !1; if (q.equals(x)) q = null, l = !0; else {
                            var y = q.type == CKEDITOR.NODE_ELEMENT ? q.getName() : null, w = y && "false" == q.getAttribute("contentEditable"), B = y &&
                                q.getAttribute("data-nostyle"); if (y && q.data("cke-bookmark")) { q = q.getNextSourceNode(!0); continue } if (w && m && CKEDITOR.dtd.$block[y]) for (var E = q, C = f(E), F = void 0, H = C.length, K = 0, E = H && new CKEDITOR.dom.range(E.getDocument()); K < H; ++K) { var F = C[K], L = CKEDITOR.filter.instances[F.data("cke-filter")]; if (L ? L.check(this) : 1) E.selectNodeContents(F), b.call(this, E) } C = y ? !p[y] || B ? 0 : w && !m ? 0 : d(q, x, h, P) : 1; if (C) if (F = q.getParent(), C = h, H = g, K = k, !F || !(F.getDtd() || CKEDITOR.dtd.span)[H] && !K || C.parentRule && !C.parentRule(F)) l = !0; else {
                                    if (u ||
                                        y && CKEDITOR.dtd.$removeEmpty[y] && (q.getPosition(x) | P) != P || (u = c.clone(), u.setStartBefore(q)), y = q.type, y == CKEDITOR.NODE_TEXT || w || y == CKEDITOR.NODE_ELEMENT && !q.getChildCount()) { for (var y = q, M; (l = !y.getNext(z)) && (M = y.getParent(), p[M.getName()]) && d(M, t, h, O);)y = M; u.setEndAfter(y) }
                                } else l = !0; q = q.getNextSourceNode(B || w)
                        } if (l && u && !u.collapsed) {
                            for (var l = J(this, e), w = l.hasAttributes(), B = u.getCommonAncestor(), y = {}, C = {}, F = {}, H = {}, U, R, aa; l && B;) {
                                if (B.getName() == g) {
                                    for (U in h.attributes) !H[U] && (aa = B.getAttribute(R)) &&
                                        (l.getAttribute(U) == aa ? C[U] = 1 : H[U] = 1); for (R in h.styles) !F[R] && (aa = B.getStyle(R)) && (l.getStyle(R) == aa ? y[R] = 1 : F[R] = 1)
                                } B = B.getParent()
                            } for (U in C) l.removeAttribute(U); for (R in y) l.removeStyle(R); w && !l.hasAttributes() && (l = null); l ? (u.extractContents().appendTo(l), u.insertNode(l), D.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), u.extractContents().appendTo(l), u.insertNode(l), D.call(this, l), l.remove(!0)); u = null
                        }
                    } c.moveToBookmark(r); c.shrink(CKEDITOR.SHRINK_TEXT);
                c.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }
        } function c(a) {
            function b() { for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(p.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) { var h = a.elements[g]; if (h == a.block || h == a.blockLimit) break; r.checkElementRemovable(h, !0) && (e = h) } for (g = 0; g < c.elements.length; g++) { h = c.elements[g]; if (h == c.block || h == c.blockLimit) break; r.checkElementRemovable(h, !0) && (f = h) } f && p.breakParent(f); e && d.breakParent(e) } a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); var c =
                a.createBookmark(), d = c.startNode, e = this._.definition.alwaysRemoveElement; if (a.collapsed) {
                    for (var f = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, h = 0, k; h < f.elements.length && (k = f.elements[h]) && k != f.block && k != f.blockLimit; h++)if (this.checkElementRemovable(k)) { var m; !e && a.collapsed && (a.checkBoundaryOfElement(k, CKEDITOR.END) || (m = a.checkBoundaryOfElement(k, CKEDITOR.START))) ? (g = k, g.match = m ? "start" : "end") : (k.mergeSiblings(), k.is(this.element) ? B.call(this, k) : w(k, l(this)[k.getName()])) } if (g) {
                        e = d; for (h =
                            0; ; h++) { k = f.elements[h]; if (k.equals(g)) break; else if (k.match) continue; else k = k.clone(); k.append(e); e = k } e["start" == g.match ? "insertBefore" : "insertAfter"](g)
                    }
                } else { var p = c.endNode, r = this; b(); for (f = d; !f.equals(p);)g = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? B.call(this, f) : w(f, l(this)[f.getName()]), g.type == CKEDITOR.NODE_ELEMENT && g.contains(d) && (b(), g = d.getNext())), f = g } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
        } function f(a) {
            var b =
                []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b
        } function h(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && u(a, this) } function k(a) {
            var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition, c = b.attributes; if (c) for (var d in c) a.removeAttribute(d, c[d]); if (b.styles) for (var e in b.styles) b.styles.hasOwnProperty(e) &&
                    a.removeStyle(e)
            }
        } function g(a) { var b = a.createBookmark(!0), c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var d, e = a.document, f; d = c.getNextParagraph();)!d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = J(this, e, d), r(d, f)); a.moveToBookmark(b) } function m(a) {
            var b = a.createBookmark(1), c = a.createIterator(); c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var d, e; d = c.getNextParagraph();)this.checkElementRemovable(d) &&
                (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), r(d, e)) : B.call(this, d)); a.moveToBookmark(b)
        } function r(a, b) {
            var c = !b; c && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var d = b && b.is("pre"), f = a.is("pre"), g = !d && f; if (d && !f) {
                f = b; (g = a.getBogus()) && g.remove(); g = a.getHtml(); g = y(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); g = g.replace(/([ \t\n\r]+|&nbsp;)/g,
                    " "); g = g.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var h = a.getDocument().createElement("div"); h.append(f); f.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e"; f.copyAttributes(h.getFirst()); f = h.getFirst().remove() } else f.setHtml(g); b = f
            } else g ? b = x(c ? [a.getHtml()] : e(a), b) : a.moveChildren(b); b.replace(a); if (d) {
                var c = b, k; (k = c.getPrevious(H)) && k.type == CKEDITOR.NODE_ELEMENT && k.is("pre") && (d = y(k.getHtml(), /\n$/, "") + "\n\n" + y(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" :
                    c.setHtml(d), k.remove())
            } else c && p(b)
        } function e(a) { var b = []; y(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function y(a, b, c) { var d = "", e = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (d = b); c && (e = c); return "" }); return d + a.replace(b, c) + e } function x(a, b) {
            var c;
            1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var d = 0; d < a.length; d++) {
                var e = a[d], e = e.replace(/(\r\n|\r)/g, "\n"), e = y(e, /^[ \t]*\n/, ""), e = y(e, /\n$/, ""), e = y(e, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), e = e.replace(/\n/g, "\x3cbr\x3e"), e = e.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }); if (c) {
                    var f = b.clone(); f.setHtml(e);
                    c.append(f)
                } else b.setHtml(e)
            } return c || b
        } function B(a, b) {
            var c = this._.definition, d = c.attributes, c = c.styles, e = l(this)[a.getName()], f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c), g; for (g in d) if ("class" != g && !this._.definition.fullMatch || a.getAttribute(g) == q(g, d[g])) b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), a.removeAttribute(g)); for (var h in c) this._.definition.fullMatch && a.getStyle(h) != q(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h)); w(a, e, E[a.getName()]); f && (this._.definition.alwaysRemoveElement ?
                p(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? p(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        } function D(a) { for (var b = l(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;)d = c.getItem(e), d.isReadOnly() || B.call(this, d, !0); for (var f in b) if (f != this.element) for (c = a.getElementsByTag(f), e = c.count() - 1; 0 <= e; e--)d = c.getItem(e), d.isReadOnly() || w(d, b[f]) } function w(a, b, c) {
            if (b = b && b.attributes) for (var d = 0; d < b.length; d++) {
                var e = b[d][0],
                    f; if (f = a.getAttribute(e)) { var g = b[d][1]; (null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(e) }
            } c || p(a)
        } function p(a, b) {
            if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(H), d = a.getNext(H); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1); !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
        } function J(a, b, c) { var d; d = a.element; "*" == d && (d = "span"); d = new CKEDITOR.dom.element(d, b); c && c.copyAttributes(d); d = u(d, a); b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return d } function u(a, b) { var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c); if (d) for (var e in d) a.setAttribute(e, d[e]); c && a.setAttribute("style", c); return a } function K(a,
            b) { for (var c in a) a[c] = a[c].replace(C, function (a, c) { return b[c] }) } function l(a) { if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides; if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (var d = 0; d < c.length; d++) { var e = c[d], f, g; "string" == typeof e ? f = e.toLowerCase() : (f = e.element ? e.element.toLowerCase() : a.element, g = e.attributes); e = b[f] || (b[f] = {}); if (g) { var e = e.attributes = e.attributes || [], h; for (h in g) e.push([h.toLowerCase(), g[h]]) } } } return b } function q(a, b, c) {
                var d = new CKEDITOR.dom.element("span");
                d[c ? "setStyle" : "setAttribute"](a, b); return d[c ? "getStyle" : "getAttribute"](a)
            } function F(a, b) { function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var d in a) if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1; return !0 } function L(a, b, c) {
                var d = a.document, e = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange; var f, g; if (a.isFake && a.isInTable()) for (f =
                    [], g = 0; g < e.length; g++)f.push(e[g].clone()); for (var h = e.createIterator(); g = h.getNextRange();)b.call(this, g, c); a.selectRanges(f || e); d.removeCustomData("doc_processing_style")
            } var E = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, M = {
                a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1,
                dd: 1, form: 1, audio: 1, video: 1
            }, t = /\s*(?:;\s*|$)/, C = /#\((.+?)\)/g, z = CKEDITOR.dom.walker.bookmark(0, 1), H = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), K(a.attributes, b), K(a.styles, b)); c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() :
                    a.element : "*"; this.type = a.type || (E[c] ? CKEDITOR.STYLE_BLOCK : M[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
            }; CKEDITOR.style.prototype = {
                apply: function (a) { if (a instanceof CKEDITOR.dom.document) return L.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); L.call(this, a.getSelection(), 0, a); this._.enterMode = b } }, remove: function (a) {
                    if (a instanceof
                        CKEDITOR.dom.document) return L.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); L.call(this, a.getSelection(), 1, a); this._.enterMode = b }
                }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? h : null; return this.applyToRange(a) }, removeFromRange: function (a) {
                    this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ?
                        m : this.type == CKEDITOR.STYLE_OBJECT ? k : null; return this.removeFromRange(a)
                }, applyToObject: function (a) { u(a, this) }, checkActive: function (a, b) {
                    switch (this.type) {
                        case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var c = a.elements, d = 0, e; d < c.length; d++)if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) {
                            if (this.type == CKEDITOR.STYLE_OBJECT) {
                                var f = e.getName(); if (!("string" == typeof this.element ?
                                    f == this.element : f in this.element)) continue
                            } if (this.checkElementRemovable(e, !0, b)) return !0
                        }
                    }return !1
                }, checkApplicable: function (a, b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                    var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1; var d = a.getName(); if ("string" == typeof this.element ?
                        d == this.element : d in this.element) { if (!b && !a.hasAttributes()) return !0; if (d = c._AC) c = d; else { var d = {}, e = 0, f = c.attributes; if (f) for (var g in f) e++ , d[g] = f[g]; if (g = CKEDITOR.style.getStyleText(c)) d.style || e++ , d.style = g; d._length = e; c = c._AC = d } if (c._length) { for (var h in c) if ("_length" != h) if (d = a.getAttribute(h) || "", "style" == h ? F(c[h], d) : c[h] == d) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0 } return !1
                }, checkElementRemovable: function (a, b, c) {
                    if (this.checkElementMatch(a, b, c)) return !0; if (b = l(this)[a.getName()]) {
                        var d;
                        if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++)if (d = b[c][0], d = a.getAttribute(d)) { var e = b[c][1]; if (null === e) return !0; if ("string" == typeof e) { if (d == e) return !0 } else if (e.test(d)) return !0 }
                    } return !1
                }, buildPreview: function (a) { var b = this._.definition, c = [], d = b.element; "bdo" == d && (d = "span"); var c = ["\x3c", d], e = b.attributes; if (e) for (var f in e) c.push(" ", f, '\x3d"', e[f], '"'); (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"'); c.push("\x3e", a || b.name, "\x3c/", d, "\x3e"); return c.join("") }, getDefinition: function () { return this._.definition }
            };
        CKEDITOR.style.getStyleText = function (a) { var b = a._ST; if (b) return b; var b = a.styles, c = a.attributes && a.attributes.style || "", d = ""; c.length && (c = c.replace(t, ";")); for (var e in b) { var f = b[e], g = (e + ":" + f).replace(t, ";"); "inherit" == f ? d += g : c += g } c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + d }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.addCustomHandler = function (a) {
            var b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
                { assignedTo: CKEDITOR.STYLE_OBJECT }, a, !0); return this.customHandlers[a.type] = b
        }; var P = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, O = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    })(); CKEDITOR.styleCommand = function (a, d) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, d, !0) };
    CKEDITOR.styleCommand.prototype.exec = function (a) { a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style) }; CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"); CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet); CKEDITOR.loadStylesSet = function (a, d, b) { CKEDITOR.stylesSet.addExternal(a, d, ""); CKEDITOR.stylesSet.load(a, b) };
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function (a, d) { var b = this._.styleStateChangeCallbacks; b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function (a) { for (var d = 0; d < b.length; d++) { var h = b[d], k = h.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; h.fn.call(this, k) } })); b.push({ style: a, fn: d }) }, applyStyle: function (a) { a.apply(this) }, removeStyle: function (a) { a.remove(this) }, getStylesSet: function (a) {
            if (this._.stylesDefinitions) a(this._.stylesDefinitions);
            else { var d = this, b = d.config.stylesCombo_stylesSet || d.config.stylesSet; if (!1 === b) a(null); else if (b instanceof Array) d._.stylesDefinitions = b, a(b); else { b || (b = "default"); var b = b.split(":"), c = b[0]; CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(c, function (b) { d._.stylesDefinitions = b[c]; a(d._.stylesDefinitions) }) } }
        }
    });
    CKEDITOR.dom.comment = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }); "use strict";
    (function () {
        var a = {}, d = {}, b; for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1); for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1); CKEDITOR.dom.elementPath = function (b, f) {
            var h = null, k = null, g = [], m = b, r; f = f || b.getDocument().getBody(); m || (m = f); do if (m.type == CKEDITOR.NODE_ELEMENT) {
                g.push(m); if (!this.lastElement && (this.lastElement = m, m.is(CKEDITOR.dtd.$object) || "false" == m.getAttribute("contenteditable"))) continue; if (m.equals(f)) break; if (!k && (r = m.getName(),
                    "true" == m.getAttribute("contenteditable") ? k = m : !h && d[r] && (h = m), a[r])) { if (r = !h && "div" == r) { a: { r = m.getChildren(); for (var e = 0, y = r.count(); e < y; e++) { var x = r.getItem(e); if (x.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[x.getName()]) { r = !0; break a } } r = !1 } r = !r } r ? h = m : k = m }
            } while (m = m.getParent()); k || (k = f); this.block = h; this.blockLimit = k; this.root = f; this.elements = g
        }
    })();
    CKEDITOR.dom.elementPath.prototype = {
        compare: function (a) { var d = this.elements; a = a && a.elements; if (!a || d.length != a.length) return !1; for (var b = 0; b < d.length; b++)if (!d[b].equals(a[b])) return !1; return !0 }, contains: function (a, d, b) {
            var c = 0, f; "string" == typeof a && (f = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element ? f = function (b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? f = function (b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? f = a : "object" == typeof a && (f = function (b) {
                return b.getName() in
                    a
            }); var h = this.elements, k = h.length; d && (b ? c += 1 : --k); b && (h = Array.prototype.slice.call(h, 0), h.reverse()); for (; c < k; c++)if (f(h[c])) return h[c]; return null
        }, isContextFor: function (a) { var d; return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0 }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
    };
    CKEDITOR.dom.text = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createTextNode(a)); this.$ = a }; CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length }, getText: function () { return this.$.nodeValue }, setText: function (a) { this.$.nodeValue = a }, split: function (a) { var d = this.$.parentNode, b = d.childNodes.length, c = this.getLength(), f = this.getDocument(), h = new CKEDITOR.dom.text(this.$.splitText(a), f); d.childNodes.length == b && (a >= c ? (h = f.createText(""), h.insertAfter(this)) : (a = f.createText(""), a.insertAfter(h), a.remove())); return h }, substring: function (a,
            d) { return "number" != typeof d ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d) }
    });
    (function () {
        function a(a, c, d) { var h = a.serializable, k = c[d ? "endContainer" : "startContainer"], g = d ? "endOffset" : "startOffset", m = h ? c.document.getById(a.startNode) : a.startNode; a = h ? c.document.getById(a.endNode) : a.endNode; k.equals(m.getPrevious()) ? (c.startOffset = c.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (c.startOffset -= k.getLength(), k = a.getNext()); k.equals(m.getParent()) && c[g]++; k.equals(a.getParent()) && c[g]++; c[d ? "endContainer" : "startContainer"] = k; return c }
        CKEDITOR.dom.rangeList = function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, d) }; var d = {
            createIterator: function () {
                var a = this, c = CKEDITOR.dom.walker.bookmark(), d = [], h; return {
                    getNextRange: function (k) {
                        h = void 0 === h ? 0 : h + 1; var g = a[h]; if (g && 1 < a.length) {
                            if (!h) for (var m = a.length - 1; 0 <= m; m--)d.unshift(a[m].createBookmark(!0)); if (k) for (var r = 0; a[h + r + 1];) {
                                var e = g.document; k = 0; m = e.getById(d[r].endNode); for (e = e.getById(d[r + 1].startNode); ;) {
                                    m =
                                        m.getNextSourceNode(!1); if (e.equals(m)) k = 1; else if (c(m) || m.type == CKEDITOR.NODE_ELEMENT && m.isBlockBoundary()) continue; break
                                } if (!k) break; r++
                            } for (g.moveToBookmark(d.shift()); r--;)m = a[++h], m.moveToBookmark(d.shift()), g.setEnd(m.endContainer, m.endOffset)
                        } return g
                    }
                }
            }, createBookmarks: function (b) { for (var c = [], d, h = 0; h < this.length; h++) { c.push(d = this[h].createBookmark(b, !0)); for (var k = h + 1; k < this.length; k++)this[k] = a(d, this[k]), this[k] = a(d, this[k], !0) } return c }, createBookmarks2: function (a) {
                for (var c = [], d = 0; d <
                    this.length; d++)c.push(this[d].createBookmark2(a)); return c
            }, moveToBookmarks: function (a) { for (var c = 0; c < this.length; c++)this[c].moveToBookmark(a[c]) }
        }
    })();
    (function () {
        function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function d(b) { var c = CKEDITOR.skin["ua_" + b], d = CKEDITOR.env; if (c) for (var c = c.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), f = 0, g; f < c.length; f++)if (g = c[f], d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == g) && (g = "ie"), d[g]) { b += "_" + c[f]; break } return CKEDITOR.getUrl(a() + b + ".css") } function b(a, b) { h[a] || (CKEDITOR.document.appendStyleSheet(d(a)), h[a] = 1); b && b() } function c(a) {
            var b =
                a.getById(k); b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css")); return b
        } function f(a, b, c) {
            var d, f, g; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), f = 0; f < b.length; f++)b[f] = b[f].split("{"); for (var h = 0; h < a.length; h++)if (CKEDITOR.env.webkit) for (f = 0; f < b.length; f++) { g = b[f][1]; for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]); a[h].$.sheet.addRule(b[f][0], g) } else {
                g = b; for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ?
                    a[h].$.styleSheet.cssText += g : a[h].$.innerHTML += g
            }
        } var h = {}; CKEDITOR.skin = {
            path: a, loadPart: function (c, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () { b(c, d) }) : b(c, d) }, getPath: function (a) { return CKEDITOR.getUrl(d(a)) }, icons: {}, addIcon: function (a, b, c, d) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || "16px" }) }, getIconStyle: function (a, b, c, d, f) {
                var g; a && (a = a.toLowerCase(), b && (g = this.icons[a + "-rtl"]),
                    g || (g = this.icons[a])); a = c || g && g.path || ""; d = d || g && g.offset; f = f || g && g.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + f + ";"
            }
        }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function () { return this.uiColor }, setUiColor: function (a) {
                var b = c(CKEDITOR.document); return (this.setUiColor = function (a) {
                    this.uiColor = a; var c = CKEDITOR.skin.chameleon, d = "", h = ""; "function" == typeof c && (d = c(this, "editor"), h =
                        c(this, "panel")); a = [[m, a]]; f([b], d, a); f(g, h, a)
                }).call(this, a)
            }
        }); var k = "cke_ui_color", g = [], m = /\$color/g; CKEDITOR.on("instanceLoaded", function (a) { if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) { var b = a.editor; a = function (a) { a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(); if (!a.getById("cke_ui_color")) { a = c(a); g.push(a); var d = b.getUiColor(); d && f([a], CKEDITOR.skin.chameleon(b, "panel"), [[m, d]]) } }; b.on("panelShow", a); b.on("menuShow", a); b.config.uiColor && b.setUiColor(b.config.uiColor) } })
    })();
    (function () {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else { var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document); a.appendTo(CKEDITOR.document.getHead()); try { var d = a.getComputedStyle("border-top-color"), b = a.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !(!d || d != b) } catch (c) { CKEDITOR.env.hc = !1 } a.remove() } CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, d = 0; d < a.length; d++)CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
    })();/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
    CKEDITOR.skin.name = "moono-lisa"; CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko"; CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8";
    CKEDITOR.skin.chameleon = function () {
        var b = function () { return function (b, d) { for (var a = b.match(/[^#]./g), e = 0; 3 > e; e++) { var f = e, c; c = parseInt(a[e], 16); c = ("0" + (0 > d ? 0 | c * (1 + d) : 0 | c + (255 - c) * d).toString(16)).slice(-2); a[f] = c } return "#" + a.join("") } }(), f = { editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "), panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ") };
        return function (g, d) { var a = b(g.uiColor, .4), a = { id: "." + g.id, defaultBorder: b(a, -.2), toolbarElementsBorder: b(a, -.25), defaultBackground: a, lightBackground: b(a, .8), darkBackground: b(a, -.15), ckeButtonOn: b(a, .4), ckeResizer: b(a, -.4), ckeColorauto: b(a, .8), dialogBody: b(a, .7), dialogTab: b(a, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: b(a, -.6), menubuttonHover: b(a, .1), menubuttonIcon: b(a, .5), menubuttonIconHover: b(a, .3) }; return f[d].output(a).replace(/\[/g, "{").replace(/\]/g, "}") }
    }(); CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var h = function (b) { this._ || (this._ = {}); this._["default"] = this._.initValue = b["default"] || ""; this._.required = b.required || !1; for (var a = [this._], d = 1; d < arguments.length; d++)a.push(arguments[d]); a.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, a); return this._ }, v = { build: function (b, a, d) { return new CKEDITOR.ui.dialog.textInput(b, a, d) } }, n = { build: function (b, a, d) { return new CKEDITOR.ui.dialog[a.type](b, a, d) } }, q = {
                isChanged: function () {
                    return this.getValue() !=
                        this.getInitValue()
                }, reset: function (b) { this.setValue(this.getInitValue(), b) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
            }, r = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (b, a) {
                    this._.domOnChangeRegistered || (b.on("load", function () {
                        this.getInputElement().on("change", function () { b.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                            this)
                    }, this), this._.domOnChangeRegistered = !0); this.on("change", a)
                }
            }, !0), x = /^on([A-Z]\w+)/, t = function (b) { for (var a in b) (x.test(a) || "title" == a || "type" == a) && delete b[a]; return b }, w = function (b) { b = b.data.getKeystroke(); b == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : b == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (b, a, d, f) {
                    if (!(4 > arguments.length)) {
                        var c = h.call(this, a); c.labelId = CKEDITOR.tools.getNextId() +
                            "_label"; this._.children = []; var e = { role: a.role || "presentation" }; a.includeLabel && (e["aria-labelledby"] = c.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, e, function () {
                                var e = [], g = a.required ? " cke_required" : ""; "horizontal" != a.labelLayout ? e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + c.labelId + '"', c.inputId ? ' for\x3d"' + c.inputId + '"' : "", (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", a.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                    a.controlStyle ? ' style\x3d"' + a.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, a), "\x3c/div\x3e") : (g = {
                                        type: "hbox", widths: a.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + c.labelId + '" for\x3d"' + c.inputId + '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(a.label) + "\x3c/label\x3e" }, {
                                            type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style\x3d"' + a.controlStyle +
                                                '"' : "") + "\x3e" + f.call(this, b, a) + "\x3c/span\x3e"
                                        }]
                                    }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, e)); return e.join("")
                            })
                    }
                }, textInput: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a); var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", c = { "class": "cke_dialog_ui_input_" + a.type, id: f, type: a.type }; a.validate && (this.validate = a.validate); a.maxLength && (c.maxlength = a.maxLength); a.size && (c.size = a.size); a.inputStyle && (c.style = a.inputStyle); var e = this, m = !1; b.on("load", function () {
                            e.getInputElement().on("keydown",
                                function (a) { 13 == a.data.getKeystroke() && (m = !0) }); e.getInputElement().on("keyup", function (a) { 13 == a.data.getKeystroke() && m && (b.getButton("ok") && setTimeout(function () { b.getButton("ok").click() }, 0), m = !1); e.bidi && w.call(e, a) }, null, null, 1E3)
                        }); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            var b = ['\x3cdiv class\x3d"cke_dialog_ui_input_', a.type, '" role\x3d"presentation"']; a.width && b.push('style\x3d"width:' + a.width + '" '); b.push("\x3e\x3cinput "); c["aria-labelledby"] = this._.labelId; this._.required &&
                                (c["aria-required"] = this._.required); for (var e in c) b.push(e + '\x3d"' + c[e] + '" '); b.push(" /\x3e\x3c/div\x3e"); return b.join("")
                        })
                    }
                }, textarea: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a); var f = this, c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", e = {}; a.validate && (this.validate = a.validate); e.rows = a.rows || 5; e.cols = a.cols || 20; e["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || ""); "undefined" != typeof a.inputStyle && (e.style = a.inputStyle); a.dir && (e.dir = a.dir); if (f.bidi) b.on("load",
                            function () { f.getInputElement().on("keyup", w) }, f); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () { e["aria-labelledby"] = this._.labelId; this._.required && (e["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', c, '" '], b; for (b in e) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(e[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e"); return a.join("") })
                    }
                }, checkbox: function (b,
                    a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a, { "default": !!a["default"] }); a.validate && (this.validate = a.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function () {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), e = [], d = CKEDITOR.tools.getNextId() + "_label", g = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": d }; t(c); a["default"] && (g.checked = "checked"); "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                            f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, e, "input", null, g); e.push(' \x3clabel id\x3d"', d, '" for\x3d"', g.id, '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(a.label), "\x3c/label\x3e"); return e.join("")
                        })
                    }
                }, radio: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a); this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]); a.validate && (this.validate = a.validate); var f = [], c = this; a.role = "radiogroup"; a.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this,
                            b, a, d, function () {
                                for (var e = [], d = [], g = (a.id ? a.id : CKEDITOR.tools.getNextId()) + "_radio", k = 0; k < a.items.length; k++) {
                                    var l = a.items[k], h = void 0 !== l[2] ? l[2] : l[0], n = void 0 !== l[1] ? l[1] : l[0], p = CKEDITOR.tools.getNextId() + "_radio_input", q = p + "_label", p = CKEDITOR.tools.extend({}, a, { id: p, title: null, type: null }, !0), h = CKEDITOR.tools.extend({}, p, { title: h }, !0), r = { type: "radio", "class": "cke_dialog_ui_radio_input", name: g, value: n, "aria-labelledby": q }, u = []; c._["default"] == n && (r.checked = "checked"); t(p); t(h); "undefined" != typeof p.inputStyle &&
                                        (p.style = p.inputStyle); p.keyboardFocusable = !0; f.push(new CKEDITOR.ui.dialog.uiElement(b, p, u, "input", null, r)); u.push(" "); new CKEDITOR.ui.dialog.uiElement(b, h, u, "label", null, { id: q, "for": r.id }, l[0]); e.push(u.join(""))
                                } new CKEDITOR.ui.dialog.hbox(b, f, e, d); return d.join("")
                            }); this._.children = f
                    }
                }, button: function (b, a, d) {
                    if (arguments.length) {
                        "function" == typeof a && (a = a(b.getParentEditor())); h.call(this, a, { disabled: a.disabled || !1 }); CKEDITOR.event.implementOn(this); var f = this; b.on("load", function () {
                            var a = this.getElement();
                            (function () { a.on("click", function (a) { f.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) }) })(); a.unselectable()
                        }, this); var c = CKEDITOR.tools.extend({}, a); delete c.style; var e = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, { style: a.style, href: "javascript:void(0)", title: a.label, hidefocus: "true", "class": a["class"], role: "button", "aria-labelledby": e }, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
                            CKEDITOR.tools.htmlEncode(a.label) + "\x3c/span\x3e")
                    }
                }, select: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a); a.validate && (this.validate = a.validate); f.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), e = [], d = [], g = { id: f.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId }; e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                a.type, '" role\x3d"presentation"'); a.width && e.push('style\x3d"width:' + a.width + '" '); e.push("\x3e"); void 0 !== a.size && (g.size = a.size); void 0 !== a.multiple && (g.multiple = a.multiple); t(c); for (var k = 0, l; k < a.items.length && (l = a.items[k]); k++)d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0])); "undefined" != typeof c.inputStyle && (c.style = c.inputStyle); f.select = new CKEDITOR.ui.dialog.uiElement(b, c, e, "select", null,
                                    g, d.join("")); e.push("\x3c/div\x3e"); return e.join("")
                        })
                    }
                }, file: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === a["default"] && (a["default"] = ""); var f = CKEDITOR.tools.extend(h.call(this, a), { definition: a, buttons: [] }); a.validate && (this.validate = a.validate); b.on("load", function () { CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            f.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var b = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                                f.frameId, '" title\x3d"', a.label, '" src\x3d"javascript:void(']; b.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); b.push(')"\x3e\x3c/iframe\x3e'); return b.join("")
                        })
                    }
                }, fileButton: function (b, a, d) {
                    var f = this; if (!(3 > arguments.length)) {
                        h.call(this, a); a.validate && (this.validate = a.validate); var c = CKEDITOR.tools.extend({}, a), e = c.onClick; c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button"; c.onClick = function (c) {
                            var d =
                                a["for"]; c = e ? e.call(this, c) : !1; !1 !== c && ("xhr" !== c && b.getContentElement(d[0], d[1]).submit(), this.disable())
                        }; b.on("load", function () { b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(f) }); CKEDITOR.ui.dialog.button.call(this, b, c, d)
                    }
                }, html: function () {
                    var b = /^\s*<[\w:]+\s+([^>]*)?>/, a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, d = /\/$/; return function (f, c, e) {
                        if (!(3 > arguments.length)) {
                            var m = [], g = c.html; "\x3c" != g.charAt(0) && (g = "\x3cspan\x3e" + g + "\x3c/span\x3e"); var k = c.focus; if (k) {
                                var l = this.focus;
                                this.focus = function () { ("function" == typeof k ? k : l).call(this); this.fire("focus") }; c.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0
                            } CKEDITOR.ui.dialog.uiElement.call(this, f, c, m, "span", null, null, ""); m = m.join("").match(b); g = g.match(a) || ["", "", ""]; d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]); e.push([g[1], " ", m[1] || "", g[2]].join(""))
                        }
                    }
                }(), fieldset: function (b, a, d, f, c) {
                    var e = c.label; this._ = { children: a }; CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, "fieldset", null, null, function () {
                        var a =
                            []; e && a.push("\x3clegend" + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + e + "\x3c/legend\x3e"); for (var b = 0; b < d.length; b++)a.push(d[b]); return a.join("")
                    })
                }
            }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (b) {
                    var a = CKEDITOR.document.getById(this._.labelId); 1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue =
                        b; return this
                }, getLabel: function () { var b = CKEDITOR.document.getById(this._.labelId); return !b || 1 > b.getChildCount() ? "" : b.getChild(0).getText() }, eventProcessors: r
            }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) }, enable: function () { this._.disabled = !1; var b = this.getElement(); b && b.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") },
                isVisible: function () { return this.getElement().getFirst().isVisible() }, isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (b, a) { this.on("click", function () { a.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() }, accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
            }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
                focus: function () { var b = this.selectParentTab(); setTimeout(function () { var a = b.getInputElement(); a && a.$.focus() }, 0) }, select: function () { var b = this.selectParentTab(); setTimeout(function () { var a = b.getInputElement(); a && (a.$.focus(), a.$.select()) }, 0) }, accessKeyUp: function () { this.select() }, setValue: function (b) { if (this.bidi) { var a = b && b.charAt(0); (a = "‪" == a ? "ltr" : "‫" == a ? "rtl" : null) && (b = b.slice(1)); this.setDirectionMarker(a) } b || (b = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                getValue: function () { var b = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && b) { var a = this.getDirectionMarker(); a && (b = ("ltr" == a ? "‪" : "‫") + b) } return b }, setDirectionMarker: function (b) { var a = this.getInputElement(); b ? a.setAttributes({ dir: b, "data-cke-dir-marker": b }) : this.getDirectionMarker() && a.removeAttributes(["dir", "data-cke-dir-marker"]) }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
            }, q, !0); CKEDITOR.ui.dialog.textarea.prototype =
                new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function () { return this._.select.getElement() }, add: function (b, a, d) { var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), c = this.getInputElement().$; f.$.text = b; f.$.value = void 0 === a || null === a ? b : a; void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(f.$) : c.add(f.$, null) : c.add(f.$, d); return this }, remove: function (b) {
                        this.getInputElement().$.remove(b);
                        return this
                    }, clear: function () { for (var b = this.getInputElement().$; 0 < b.length;)b.remove(0); return this }, keyboardFocusable: !0
                }, q, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getInputElement: function () { return this._.checkbox.getElement() }, setValue: function (b, a) { this.getInputElement().$.checked = b; !a && this.fire("change", { value: b }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                        onChange: function (b,
                            a) { if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments); b.on("load", function () { var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this) }, this); this.on("change", a); return null }
                    }, keyboardFocusable: !0
                }, q, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setValue: function (b, a) {
                        for (var d = this._.children, f, c = 0; c < d.length && (f = d[c]); c++)f.getElement().$.checked =
                            f.getValue() == b; !a && this.fire("change", { value: b })
                    }, getValue: function () { for (var b = this._.children, a = 0; a < b.length; a++)if (b[a].getElement().$.checked) return b[a].getValue(); return null }, accessKeyUp: function () { var b = this._.children, a; for (a = 0; a < b.length; a++)if (b[a].getElement().$.checked) { b[a].getElement().focus(); return } b[0].getElement().focus() }, eventProcessors: {
                        onChange: function (b, a) {
                            if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments); b.on("load", function () {
                                for (var a =
                                    this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                            }, this); this.on("change", a); return null
                        }
                    }
                }, q, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, q, {
                    getInputElement: function () {
                        var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) :
                            this.getElement()
                    }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (b) { var a = /^on([A-Z]\w+)/, d, f = function (a, b, c, d) { a.on("formLoaded", function () { a.getInputElement().on(c, d, a) }) }, c; for (c in b) if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : f(this, this._.dialog, d[1].toLowerCase(), b[c]); return this }, reset: function () {
                        function b() {
                            d.$.open();
                            var b = ""; f.size && (b = f.size - (CKEDITOR.env.ie ? 7 : 0)); var h = a.frameId + "_input"; d.$.write(['\x3chtml dir\x3d"' + g + '" lang\x3d"' + k + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + g + '" lang\x3d"' + k + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', a.labelId, '" for\x3d"', h, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                                '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', h, '" aria-labelledby\x3d"', a.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + m + ")}", "\x3c/script\x3e"].join(""));
                            d.$.close(); for (b = 0; b < c.length; b++)c[b].enable()
                        } var a = this._, d = CKEDITOR.document.getById(a.frameId).getFrameDocument(), f = a.definition, c = a.buttons, e = this.formLoadedNumber, m = this.formUnloadNumber, g = a.dialog._.editor.lang.dir, k = a.dialog._.editor.langCode; e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), m = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () {
                            CKEDITOR.tools.removeFunction(e);
                            CKEDITOR.tools.removeFunction(m)
                        })); CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
                    }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: { onChange: function (b, a) { this._.domOnChangeRegistered || (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", a) } }, keyboardFocusable: !0
                }, !0); CKEDITOR.ui.dialog.fileButton.prototype =
                    new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", v); CKEDITOR.dialog.addUIElement("password", v); CKEDITOR.dialog.addUIElement("textarea", n); CKEDITOR.dialog.addUIElement("checkbox", n); CKEDITOR.dialog.addUIElement("radio", n); CKEDITOR.dialog.addUIElement("button", n); CKEDITOR.dialog.addUIElement("select", n); CKEDITOR.dialog.addUIElement("file", n); CKEDITOR.dialog.addUIElement("fileButton", n); CKEDITOR.dialog.addUIElement("html",
                        n); CKEDITOR.dialog.addUIElement("fieldset", { build: function (b, a, d) { for (var f = a.children, c, e = [], h = [], g = 0; g < f.length && (c = f[g]); g++) { var k = []; e.push(k); h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, k)) } return new CKEDITOR.ui.dialog[a.type](b, h, e, d, a) } })
        }
    }); CKEDITOR.DIALOG_RESIZE_NONE = 0; CKEDITOR.DIALOG_RESIZE_WIDTH = 1; CKEDITOR.DIALOG_RESIZE_HEIGHT = 2; CKEDITOR.DIALOG_RESIZE_BOTH = 3; CKEDITOR.DIALOG_STATE_IDLE = 1; CKEDITOR.DIALOG_STATE_BUSY = 2;
    (function () {
        function x() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function A() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function K(a, b) {
            for (var c = a.$.getElementsByTagName("input"),
                e = 0, d = c.length; e < d; e++) { var f = new CKEDITOR.dom.element(c[e]); "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", ""))) }
        } function T(a, b) { var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b }) }
        function U() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") } function V(a) {
            var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", W).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), c = b.getChild([0, 0, 0, 0, 0]), e = c.getChild(0), d = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
            !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); e.unselectable(); d.unselectable(); return {
                element: b, parts: {
                    dialog: b.getChild(0), title: e, close: d, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]),
                    footer: c.getChild([3, 0, 1, 0])
                }
            }
        } function L(a, b, c) { this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute("disabled") && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") }) } function X(a) {
            function b() { a.layout() } var c = CKEDITOR.document.getWindow();
            c.on("resize", b); a.on("hide", function () { c.removeListener("resize", b) })
        } function M(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function Y(a) {
            function b(b) { var c = a.getSize(), k = CKEDITOR.document.getWindow().getViewPaneSize(), q = b.data.$.screenX, n = b.data.$.screenY, r = q - e.x, l = n - e.y; e = { x: q, y: n }; d.x += r; d.y += l; a.move(d.x + h[3] < g ? -h[3] : d.x - h[1] > k.width - c.width - g ? k.width - c.width + ("rtl" == f.lang.dir ? 0 : h[1]) : d.x, d.y + h[0] < g ? -h[0] : d.y - h[2] > k.height - c.height - g ? k.height - c.height + h[2] : d.y, 1); b.data.preventDefault() }
            function c() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = u.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) } } var e = null, d = null, f = a.getParentEditor(), g = f.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof g && (g = 20); a.parts.title.on("mousedown", function (g) {
                e = { x: g.data.$.screenX, y: g.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup",
                    c); d = a.getPosition(); if (CKEDITOR.env.ie6Compat) { var f = u.getChild(0).getFrameDocument(); f.on("mousemove", b); f.on("mouseup", c) } g.data.preventDefault()
            }, a)
        } function Z(a) {
            function b(b) {
                var c = "rtl" == f.lang.dir, n = k.width, q = k.height, G = n + (b.data.$.screenX - m.x) * (c ? -1 : 1) * (a._.moved ? 1 : 2), H = q + (b.data.$.screenY - m.y) * (a._.moved ? 1 : 2), B = a._.element.getFirst(), B = c && B.getComputedStyle("right"), C = a.getPosition(); C.y + H > p.height && (H = p.height - C.y); (c ? B : C.x) + G > p.width && (G = p.width - (c ? B : C.x)); if (d == CKEDITOR.DIALOG_RESIZE_WIDTH ||
                    d == CKEDITOR.DIALOG_RESIZE_BOTH) n = Math.max(e.minWidth || 0, G - g); if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT || d == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(e.minHeight || 0, H - h); a.resize(n, q); a._.moved || a.layout(); b.data.preventDefault()
            } function c() { CKEDITOR.document.removeListener("mouseup", c); CKEDITOR.document.removeListener("mousemove", b); q && (q.remove(), q = null); if (CKEDITOR.env.ie6Compat) { var a = u.getChild(0).getFrameDocument(); a.removeListener("mouseup", c); a.removeListener("mousemove", b) } } var e = a.definition, d = e.resizable;
            if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
                var f = a.getParentEditor(), g, h, p, m, k, q, n = CKEDITOR.tools.addFunction(function (d) {
                    k = a.getSize(); var e = a.parts.contents; e.$.getElementsByTagName("iframe").length && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), e.append(q)); h = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)); g = k.width - a.parts.contents.getSize("width",
                        1); m = { x: d.screenX, y: d.screenY }; p = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); CKEDITOR.env.ie6Compat && (e = u.getChild(0).getFrameDocument(), e.on("mousemove", b), e.on("mouseup", c)); d.preventDefault && d.preventDefault()
                }); a.on("load", function () {
                    var b = ""; d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
                        b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                }); f.on("destroy", function () { CKEDITOR.tools.removeFunction(n) })
            }
        } function I(a) { a.data.preventDefault(1) } function N(a) {
            var b = CKEDITOR.document.getWindow(), c = a.config, e = CKEDITOR.skinName || a.config.skin, d = c.dialog_backgroundCoverColor || ("moono-lisa" == e ? "black" : "white"), e = c.dialog_backgroundCoverOpacity,
                f = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, e, f), g = z[c]; g ? g.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
                    f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 !== e ? e : .5), g.on("keydown", I), g.on("keypress", I), g.on("keyup", I), g.appendTo(CKEDITOR.document.getBody()),
                    z[c] = g); a.focusManager.add(g); u = g; a = function () { var a = b.getViewPaneSize(); g.setStyles({ width: a.width + "px", height: a.height + "px" }) }; var h = function () { var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop; g.setStyles({ left: a.x + "px", top: a.y + "px" }); if (c) { do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog) } }; J = a; b.on("resize", a); a(); CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus(); if (CKEDITOR.env.ie6Compat) {
                        var p = function () { h(); arguments.callee.prevScrollHandler.apply(this, arguments) }; b.$.setTimeout(function () {
                            p.prevScrollHandler =
                                window.onscroll || function () { }; window.onscroll = p
                        }, 0); h()
                    }
        } function O(a) { u && (a.focusManager.remove(u), a = CKEDITOR.document.getWindow(), u.hide(), a.removeListener("resize", J), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0), J = null) } var v = CKEDITOR.tools.cssLength, W = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
            CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
        CKEDITOR.dialog = function (a, b) {
            function c() { var a = l._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function e(a) {
                var b = l._.focusList; a = a || 0; if (!(1 > b.length)) {
                    var c = l._.currentFocusIndex; l._.tabBarMode && 0 > a && (c = 0); try { b[c].getInputElement().$.blur() } catch (d) { } var e = c, g = 1 < l._.pageCount; do {
                        e += a; if (g && !l._.tabBarMode && (e == b.length || -1 == e)) {
                            l._.tabBarMode = !0; l._.tabs[l._.currentTabId][0].focus();
                            l._.currentFocusIndex = -1; return
                        } e = (e + b.length) % b.length; if (e == c) break
                    } while (a && !b[e].isFocusable()); b[e].focus(); "text" == b[e].type && b[e].select()
                }
            } function d(b) {
                if (l == CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(), d = "rtl" == a.lang.dir, g = [37, 38, 39, 40]; q = n = 0; if (9 == c || c == CKEDITOR.SHIFT + 9) e(c == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1; else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && 1 < l.getPageCount()) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1, q = 1; else if (-1 != CKEDITOR.tools.indexOf(g,
                        c) && l._.tabBarMode) c = -1 != CKEDITOR.tools.indexOf([d ? 39 : 37, 38], c) ? x.call(l) : A.call(l), l.selectPage(c), l._.tabs[c][0].focus(), q = 1; else if (13 != c && 32 != c || !l._.tabBarMode) if (13 == c) c = b.data.getTarget(), c.is("a", "button", "select", "textarea") || c.is("input") && "button" == c.$.type || ((c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), q = 1), n = 1; else if (27 == c) (c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), n = 1; else return; else this.selectPage(this._.currentTabId),
                            this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1), q = 1; f(b)
                }
            } function f(a) { q ? a.data.preventDefault(1) : n && a.data.stopPropagation() } var g = CKEDITOR.dialog._.dialogDefinitions[b], h = CKEDITOR.tools.clone(aa), p = a.config.dialog_buttonsOrder || "OS", m = a.lang.dir, k = {}, q, n; ("OS" == p && CKEDITOR.env.mac || "rtl" == p && "ltr" == m || "ltr" == p && "rtl" == m) && h.buttons.reverse(); g = CKEDITOR.tools.extend(g(a), h); g = CKEDITOR.tools.clone(g); g = new P(this, g); h = V(a); this._ = {
                editor: a, element: h.element, name: b, contentSize: { width: 0, height: 0 },
                size: { width: 0, height: 0 }, contents: {}, buttons: {}, accessKeyMap: {}, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
            }; this.parts = h.parts; CKEDITOR.tools.setTimeout(function () { a.fire("ariaWidget", this.parts.contents) }, 0, this); h = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" }; h["rtl" == m ? "right" : "left"] = 0; this.parts.dialog.setStyles(h); CKEDITOR.event.call(this); this.definition = g = CKEDITOR.fire("dialogDefinition",
                { name: b, definition: g }, a).definition; if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) { h = a.config.removeDialogTabs.split(";"); for (m = 0; m < h.length; m++)if (p = h[m].split(":"), 2 == p.length) { var r = p[0]; k[r] || (k[r] = []); k[r].push(p[1]) } a._.removeDialogTabs = k } if (a._.removeDialogTabs && (k = a._.removeDialogTabs[b])) for (m = 0; m < k.length; m++)g.removeContents(k[m]); if (g.onLoad) this.on("load", g.onLoad); if (g.onShow) this.on("show", g.onShow); if (g.onHide) this.on("hide", g.onHide); if (g.onOk) this.on("ok", function (b) {
                    a.fire("saveSnapshot");
                    setTimeout(function () { a.fire("saveSnapshot") }, 0); !1 === g.onOk.call(this, b) && (b.data.hide = !1)
                }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (g.onCancel) this.on("cancel", function (a) { !1 === g.onCancel.call(this, a) && (a.data.hide = !1) }); var l = this, t = function (a) { var b = l._.contents, c = !1, d; for (d in b) for (var e in b[d]) if (c = a.call(this, b[d][e])) return }; this.on("ok", function (a) {
                    t(function (b) {
                        if (b.validate) {
                            var c = b.validate(this), d = "string" == typeof c || !1 === c; d && (a.data.hide = !1, a.stop()); T.call(b, !d, "string" == typeof c ?
                                c : void 0); return d
                        }
                    })
                }, this, null, 0); this.on("cancel", function (b) { t(function (c) { if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = e; var y = this._.element; a.focusManager.add(y, 1); this.on("show", function () { y.on("keydown", d, this); if (CKEDITOR.env.gecko) y.on("keypress", f, this) }); this.on("hide",
                    function () { y.removeListener("keydown", d); CKEDITOR.env.gecko && y.removeListener("keypress", f); t(function (a) { U.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", d, this, null, 0) }); this.on("show", function () {
                        c(); var b = 1 < l._.pageCount; a.config.dialog_startupFocusTab && b ? (l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length - 1, g.onFocus ?
                            (b = g.onFocus.call(this)) && b.focus() : e(1))
                    }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); Y(this); Z(this); (new CKEDITOR.dom.text(g.title, CKEDITOR.document)).appendTo(this.parts.title); for (m = 0; m < g.contents.length; m++)(k = g.contents[m]) && this.addPage(k); this.parts.tabs.on("click", function (a) {
                        var b = a.data.getTarget(); b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                            this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1)), a.data.preventDefault())
                    }, this); m = []; k = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: g.buttons }, m).getChild(); this.parts.footer.setHtml(m.join("")); for (m = 0; m < k.length; m++)this._.buttons[k[m].id] = k[m]
        }; CKEDITOR.dialog.prototype = {
            destroy: function () { this.hide(); this._.element.remove() }, resize: function () {
                return function (a, b) {
                    this._.contentSize && this._.contentSize.width ==
                        a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor), this.fire("resize", { width: a, height: b }, this._.editor), this.parts.contents.setStyles({ width: a + "px", height: b + "px" }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = { width: a, height: b })
                }
            }(), getSize: function () {
                var a = this._.element.getFirst();
                return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
            }, move: function (a, b, c) {
                var e = this._.element.getFirst(), d = "rtl" == this._.editor.lang.dir, f = "fixed" == e.getComputedStyle("position"); CKEDITOR.env.ie && e.setStyle("zoom", "100%"); f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = { x: a, y: b }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), d && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = { top: (0 < b ? b : 0) + "px" },
                    b[d ? "right" : "left"] = (0 < a ? a : 0) + "px", e.setStyles(b), c && (this._.moved = 1))
            }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                var a = this._.element, b = this.definition; a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody()); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null ===
                    this._.currentTabId && this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, N(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex /
                        2), CKEDITOR.dialog._.currentTop = this); a.on("keydown", Q); a.on("keyup", R); this._.hasFocus = !1; for (var c in b.contents) if (b.contents[c]) {
                            var a = b.contents[c], e = this._.tabs[a.id], d = a.requiredContent, f = 0; if (e) {
                                for (var g in this._.contents[a.id]) { var h = this._.contents[a.id][g]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++)) } !f || d && !this._.editor.activeFilter.check(d) ? e[0].addClass("cke_dialog_tab_disabled") :
                                    e[0].removeClass("cke_dialog_tab_disabled")
                            }
                        } CKEDITOR.tools.setTimeout(function () { this.layout(); X(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
            }, layout: function () {
                var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), e =
                    (c.width - b.width) / 2, d = (c.height - b.height) / 2; CKEDITOR.env.ie6Compat || (b.height + (0 < d ? d : 0) > c.height || b.width + (0 < e ? e : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed")); this.move(this._.moved ? this._.position.x : e, this._.moved ? this._.position.y : d)
            }, foreach: function (a) { for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this }, reset: function () { var a = function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this } }(),
            setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]); var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility",
                        "hidden"); for (ba(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else O(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10; else {
                            CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", Q); a.removeListener("keyup", R); var c = this._.editor;
                            c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0)
                        } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            }, addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox", className: "cke_dialog_page_contents",
                        children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;"
                    }, b), d = this._.contents[a.id] = {}, f = e.getChild(), g = 0; e = f.shift();)e.notAllowed || "hbox" == e.type || "vbox" == e.type || g++ , d[e.id] = e, "function" == typeof e.getChild && f.push.apply(f, e.getChild()); g || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); e = CKEDITOR.env; d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
                        0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', d, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", d); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++; this._.lastTab = c; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey &&
                            (S(this, this, "CTRL+" + a.accessKey, ca, da), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            }, selectPage: function (a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                    for (var b in this._.tabs) { var c = this._.tabs[b][0], e = this._.tabs[b][1]; b != a && (c.removeClass("cke_dialog_tab_selected"), e.hide()); e.setAttribute("aria-hidden", b != a) } var d = this._.tabs[a]; d[0].addClass("cke_dialog_tab_selected"); CKEDITOR.env.ie6Compat ||
                        CKEDITOR.env.ie7Compat ? (K(d[1]), d[1].show(), setTimeout(function () { K(d[1], 1) }, 0)) : d[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (a) { var b = this._.tabs[a] && this._.tabs[a][0]; b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(x.call(this)), b.hide(), this._.pageCount-- , this.updateStyle()) }, showPage: function (a) {
                if (a =
                    this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++ , this.updateStyle()
            }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() }, setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() },
            enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a, b) { if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new L(this, a, b)); else { this._.focusList.splice(b, 0, new L(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++ } },
            setState: function (a) {
                if (this.state != a) {
                    this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) { if (!this.parts.spinner) { var b = this.getParentEditor().lang.dir, c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px"; this.parts.spinner = CKEDITOR.document.createElement("div", c); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1) } this.parts.spinner.show(); this.getButton("ok").disable() } else a ==
                        CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable()); this.fire("state", a)
                }
            }
        }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop }, isTabEnabled: function (a, b, c) {
                a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)",
                    "i")))
            }, okButton: function () { var a = function (a, c) { c = c || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, c, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                var a = function (a, c) {
                    c = c || {}; return CKEDITOR.tools.extend({
                        id: "cancel", type: "button", label: a.lang.common.cancel,
                        "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() }
                    }, c, !0)
                }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a
            }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
        }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var aa = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }, D = function (a, b, c) { for (var e = 0, d; d = a[e]; e++)if (d.id == b || c && d[c] && (d = D(d[c], b, c))) return d; return null }, E = function (a, b, c, e, d) { if (c) { for (var f = 0, g; g = a[f]; f++) { if (g.id == c) return a.splice(f, 0, b), b; if (e && g[e] && (g = E(g[e], b, c, e, !0))) return g } if (d) return null } a.push(b); return b }, F = function (a, b, c) {
            for (var e = 0, d; d = a[e]; e++) {
                if (d.id == b) return a.splice(e, 1); if (c && d[c] && (d = F(d[c],
                    b, c))) return d
            } return null
        }, P = function (a, b) { this.dialog = a; for (var c = b.contents, e = 0, d; d = c[e]; e++)c[e] = d && new M(a, d); CKEDITOR.tools.extend(this, b) }; P.prototype = { getContents: function (a) { return D(this.contents, a) }, getButton: function (a) { return D(this.buttons, a) }, addContents: function (a, b) { return E(this.contents, a, b) }, addButton: function (a, b) { return E(this.buttons, a, b) }, removeContents: function (a) { F(this.contents, a) }, removeButton: function (a) { F(this.buttons, a) } }; M.prototype = {
            get: function (a) {
                return D(this.elements,
                    a, "children")
            }, add: function (a, b) { return E(this.elements, a, b, "children") }, remove: function (a) { F(this.elements, a, "children") }
        }; var J, z = {}, u, w = {}, Q = function (a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()) }, R = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey,
                e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()))
        }, S = function (a, b, c, e, d) { (w[c] || (w[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e || a.accessKeyDown }) }, ba = function (a) { for (var b in w) { for (var c = w[b], e = c.length - 1; 0 <= e; e--)c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1); 0 === c.length && delete w[b] } }, da = function (a,
            b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) }, ca = function () { }; (function () {
                CKEDITOR.ui.dialog = {
                    uiElement: function (a, b, c, e, d, f, g) {
                        if (!(4 > arguments.length)) {
                            var h = (e.call ? e(b) : e) || "div", p = ["\x3c", h, " "], m = (d && d.call ? d(b) : d) || {}, k = (f && f.call ? f(b) : f) || {}, q = (g && g.call ? g.call(this, a, b) : g) || "", n = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0); k.id = n; var r = {}; b.type && (r["cke_dialog_ui_" +
                                b.type] = 1); b.className && (r[b.className] = 1); b.disabled && (r.cke_disabled = 1); for (var l = k["class"] && k["class"].split ? k["class"].split(" ") : [], n = 0; n < l.length; n++)l[n] && (r[l[n]] = 1); l = []; for (n in r) l.push(n); k["class"] = l.join(" "); b.title && (k.title = b.title); r = (b.style || "").split(";"); b.align && (l = b.align, m["margin-left"] = "left" == l ? 0 : "auto", m["margin-right"] = "right" == l ? 0 : "auto"); for (n in m) r.push(n + ":" + m[n]); b.hidden && r.push("display:none"); for (n = r.length - 1; 0 <= n; n--)"" === r[n] && r.splice(n, 1); 0 < r.length && (k.style =
                                    (k.style ? k.style + "; " : "") + r.join("; ")); for (n in k) p.push(n + '\x3d"' + CKEDITOR.tools.htmlEncode(k[n]) + '" '); p.push("\x3e", q, "\x3c/", h, "\x3e"); c.push(p.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (c) { a.call(this, b.setValue.call(this, c)) } })); "function" == typeof b.getValue &&
                                        (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && S(this, a, "CTRL+" + b.accessKey); var t = this; a.on("load", function () {
                                            var b = t.getInputElement(); if (b) {
                                                var c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus", function () {
                                                    a._.tabBarMode = !1; a._.hasFocus = !0; t.fire("focus");
                                                    c && this.addClass(c)
                                                }); b.on("blur", function () { t.fire("blur"); c && this.removeClass(c) })
                                            }
                                        }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = t.focusIndex }))
                        }
                    }, hbox: function (a, b, c, e, d) {
                        if (!(4 > arguments.length)) {
                            this._ || (this._ = {}); var f = this._.children = b, g = d && d.widths || null, h = d && d.height || null, p, m = { role: "presentation" }; d && d.align && (m.align = d.align); CKEDITOR.ui.dialog.uiElement.call(this,
                                a, d || { type: "hbox" }, e, "table", {}, m, function () {
                                    var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (p = 0; p < c.length; p++) {
                                        var b = "cke_dialog_ui_hbox_child", e = []; 0 === p && (b = "cke_dialog_ui_hbox_first"); p == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); g ? g[p] && e.push("width:" + v(g[p])) : e.push("width:" + Math.floor(100 / c.length) + "%"); h && e.push("height:" + v(h)); d && void 0 !== d.padding && e.push("padding:" + v(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks &&
                                            f[p].align && e.push("text-align:" + f[p].align); 0 < e.length && a.push('style\x3d"' + e.join("; ") + '" '); a.push("\x3e", c[p], "\x3c/td\x3e")
                                    } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                                })
                        }
                    }, vbox: function (a, b, c, e, d) {
                        if (!(3 > arguments.length)) {
                            this._ || (this._ = {}); var f = this._.children = b, g = d && d.width || null, h = d && d.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "vbox" }, e, "div", null, { role: "presentation" }, function () {
                                var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                                b.push('style\x3d"'); d && d.expand && b.push("height:100%;"); b.push("width:" + v(g || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var e = 0; e < c.length; e++) {
                                    var k = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); g && k.push("width:" + v(g || "100%")); h ? k.push("height:" + v(h[e])) : d && d.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
                                    d && void 0 !== d.padding && k.push("padding:" + v(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && f[e].align && k.push("text-align:" + f[e].align); 0 < k.length && b.push('style\x3d"', k.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                                } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                            })
                        }
                    }
                }
            })(); CKEDITOR.ui.dialog.uiElement.prototype = {
                getElement: function () { return CKEDITOR.document.getById(this.domId) }, getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog },
                setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire("change", { value: a }); return this }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () { for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this }, focus: function () {
                    this.selectParentTab().getInputElement().focus();
                    return this
                }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, e = function (a, b, c, d) { b.on("load", function () { a.getInputElement().on(c, d, a) }) }, d; for (d in a) if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]); return this }, eventProcessors: { onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) { a.on("show", b, this) }, onHide: function (a, b) { a.on("hide", b, this) } }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { },
                disable: function () { var a = this.getElement(); this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled") }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() }, isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
            }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                    var a = {
                        build: function (a, c, e) {
                            for (var d = c.children, f, g = [], h = [], p = 0; p < d.length && (f = d[p]); p++) { var m = []; g.push(m); h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, m)) } return new CKEDITOR.ui.dialog[c.type](a,
                                h, g, e, c)
                        }
                    }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
                })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) }, canUndo: !1, editorFocus: 1 }; (function () {
                    var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                        f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                            functions: function () {
                                var a = arguments; return function () {
                                    var b = this && this.getValue ? this.getValue() : a[0], c, d = CKEDITOR.VALIDATE_AND, e = [], f; for (f = 0; f < a.length; f++)if ("function" == typeof a[f]) e.push(a[f]); else break; f < a.length && "string" == typeof a[f] && (c = a[f], f++); f < a.length && "number" == typeof a[f] && (d = a[f]); var n = d == CKEDITOR.VALIDATE_AND ? !0 : !1; for (f = 0; f < e.length; f++)n = d == CKEDITOR.VALIDATE_AND ? n &&
                                        e[f](b) : n || e[f](b); return n ? !0 : c
                                }
                            }, regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(c, a) }, cssLength: function (a) { return this.functions(function (a) { return d.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                                return this.functions(function (a) { return f.test(CKEDITOR.tools.trim(a)) },
                                    a)
                            }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                        }; CKEDITOR.on("instanceDestroyed", function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (var c in z) z[c].remove(); z = {} } a = a.editor._.storedDialogs; for (var d in a) a[d].destroy() })
                })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function (a, b) {
                        var c = null, e = CKEDITOR.dialog._.dialogDefinitions[a];
                        null === CKEDITOR.dialog._.currentTop && N(this); if ("function" == typeof e) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show(); else {
                            if ("failed" == e) throw O(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof e && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function () {
                                "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"); this.openDialog(a,
                                    b)
                            }, this, 0, 1)
                        } CKEDITOR.skin.loadPart("dialog"); return c
                    }
                })
    })(); CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function (x) { x.on("doubleclick", function (A) { A.data.dialog && x.openDialog(A.data.dialog) }, null, null, 999) } }); CKEDITOR.plugins.add("about", { requires: "dialog", init: function (a) { var b = a.addCommand("about", new CKEDITOR.dialogCommand("about")); b.modes = { wysiwyg: 1, source: 1 }; b.canUndo = !1; b.readOnly = 1; a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.dlgTitle, command: "about", toolbar: "about" }); CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } }); (function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog", availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 }, init: function (b) {
                var c = this; b.addCommand("a11yHelp", {
                    exec: function () {
                        var a =
                            b.langCode, a = c.availableLangs[a] ? a : c.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + a + ".js"), function () { b.lang.a11yhelp = c.langEntries[a]; b.openDialog("a11yHelp") })
                    }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: !1
                }); b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"); b.on("ariaEditorHelpLabel", function (a) { a.data.label = b.lang.common.editorHelp })
            }
        })
    })(); CKEDITOR.plugins.add("basicstyles", {
        init: function (c) {
            var e = 0, d = function (g, d, b, a) { if (a) { a = new CKEDITOR.style(a); var f = h[b]; f.unshift(a); c.attachStyleStateChange(a, function (a) { !c.readOnly && c.getCommand(b).setState(a) }); c.addCommand(b, new CKEDITOR.styleCommand(a, { contentForms: f })); c.ui.addButton && c.ui.addButton(g, { label: d, command: b, toolbar: "basicstyles," + (e += 10) }) } }, h = {
                bold: ["strong", "b", ["span", function (a) { a = a.styles["font-weight"]; return "bold" == a || 700 <= +a }]], italic: ["em", "i", ["span", function (a) {
                    return "italic" ==
                        a.styles["font-style"]
                }]], underline: ["u", ["span", function (a) { return "underline" == a.styles["text-decoration"] }]], strike: ["s", "strike", ["span", function (a) { return "line-through" == a.styles["text-decoration"] }]], subscript: ["sub"], superscript: ["sup"]
            }, b = c.config, a = c.lang.basicstyles; d("Bold", a.bold, "bold", b.coreStyles_bold); d("Italic", a.italic, "italic", b.coreStyles_italic); d("Underline", a.underline, "underline", b.coreStyles_underline); d("Strike", a.strike, "strike", b.coreStyles_strike); d("Subscript", a.subscript,
                "subscript", b.coreStyles_subscript); d("Superscript", a.superscript, "superscript", b.coreStyles_superscript); c.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }); CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }; CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }; CKEDITOR.config.coreStyles_underline = { element: "u" }; CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" }; CKEDITOR.config.coreStyles_subscript = { element: "sub" };
    CKEDITOR.config.coreStyles_superscript = { element: "sup" }; (function () {
        var m = {
            exec: function (g) {
                var a = g.getCommand("blockquote").state, k = g.getSelection(), c = k && k.getRanges()[0]; if (c) {
                    var h = k.createBookmarks(); if (CKEDITOR.env.ie) { var e = h[0].startNode, b = h[0].endNode, d; if (e && "blockquote" == e.getParent().getName()) for (d = e; d = d.getNext();)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { e.move(d, !0); break } if (b && "blockquote" == b.getParent().getName()) for (d = b; d = d.getPrevious();)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { b.move(d); break } } var f = c.createIterator();
                    f.enlargeBr = g.config.enterMode != CKEDITOR.ENTER_BR; if (a == CKEDITOR.TRISTATE_OFF) {
                        for (e = []; a = f.getNextParagraph();)e.push(a); 1 > e.length && (a = g.document.createElement(g.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), b = h.shift(), c.insertNode(a), a.append(new CKEDITOR.dom.text("﻿", g.document)), c.moveToBookmark(b), c.selectNodeContents(a), c.collapse(!0), b = c.createBookmark(), e.push(a), h.unshift(b)); d = e[0].getParent(); c = []; for (b = 0; b < e.length; b++)a = e[b], d = d.getCommonAncestor(a.getParent()); for (a = {
                            table: 1, tbody: 1,
                            tr: 1, ol: 1, ul: 1
                        }; a[d.getName()];)d = d.getParent(); for (b = null; 0 < e.length;) { for (a = e.shift(); !a.getParent().equals(d);)a = a.getParent(); a.equals(b) || c.push(a); b = a } for (; 0 < c.length;)if (a = c.shift(), "blockquote" == a.getName()) { for (b = new CKEDITOR.dom.documentFragment(g.document); a.getFirst();)b.append(a.getFirst().remove()), e.push(b.getLast()); b.replace(a) } else e.push(a); c = g.document.createElement("blockquote"); for (c.insertBefore(e[0]); 0 < e.length;)a = e.shift(), c.append(a)
                    } else if (a == CKEDITOR.TRISTATE_ON) {
                        b = [];
                        for (d = {}; a = f.getNextParagraph();) { for (e = c = null; a.getParent();) { if ("blockquote" == a.getParent().getName()) { c = a.getParent(); e = a; break } a = a.getParent() } c && e && !e.getCustomData("blockquote_moveout") && (b.push(e), CKEDITOR.dom.element.setMarker(d, e, "blockquote_moveout", !0)) } CKEDITOR.dom.element.clearAllMarkers(d); a = []; e = []; for (d = {}; 0 < b.length;)f = b.shift(), c = f.getParent(), f.getPrevious() ? f.getNext() ? (f.breakParent(f.getParent()), e.push(f.getNext())) : f.remove().insertAfter(c) : f.remove().insertBefore(c), c.getCustomData("blockquote_processed") ||
                            (e.push(c), CKEDITOR.dom.element.setMarker(d, c, "blockquote_processed", !0)), a.push(f); CKEDITOR.dom.element.clearAllMarkers(d); for (b = e.length - 1; 0 <= b; b--) { c = e[b]; a: { d = c; for (var f = 0, m = d.getChildCount(), l = void 0; f < m && (l = d.getChild(f)); f++)if (l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) { d = !1; break a } d = !0 } d && c.remove() } if (g.config.enterMode == CKEDITOR.ENTER_BR) for (c = !0; a.length;)if (f = a.shift(), "div" == f.getName()) {
                                b = new CKEDITOR.dom.documentFragment(g.document); !c || !f.getPrevious() || f.getPrevious().type ==
                                    CKEDITOR.NODE_ELEMENT && f.getPrevious().isBlockBoundary() || b.append(g.document.createElement("br")); for (c = f.getNext() && !(f.getNext().type == CKEDITOR.NODE_ELEMENT && f.getNext().isBlockBoundary()); f.getFirst();)f.getFirst().remove().appendTo(b); c && b.append(g.document.createElement("br")); b.replace(f); c = !1
                            }
                    } k.selectBookmarks(h); g.focus()
                }
            }, refresh: function (g, a) { this.setState(g.elementPath(a.block || a.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }, context: "blockquote", allowedContent: "blockquote",
            requiredContent: "blockquote"
        }; CKEDITOR.plugins.add("blockquote", { init: function (g) { g.blockless || (g.addCommand("blockquote", m), g.ui.addButton && g.ui.addButton("Blockquote", { label: g.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })) } })
    })(); (function () {
        function q(b, a) { CKEDITOR.tools.extend(this, a, { editor: b, id: "cke-" + CKEDITOR.tools.getUniqueId(), area: b._.notificationArea }); a.type || (this.type = "info"); this.element = this._createElement(); b.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element) } function r(b) {
            var a = this; this.editor = b; this.notifications = []; this.element = this._createElement(); this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout,
                this); b.on("destroy", function () { a._removeListeners(); a.element.remove() })
        } CKEDITOR.plugins.add("notification", {
            init: function (b) {
                function a(b) { var a = new CKEDITOR.dom.element("div"); a.setStyles({ position: "fixed", "margin-left": "-9999px" }); a.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); a.setText(b); CKEDITOR.document.getBody().append(a); setTimeout(function () { a.remove() }, 100) } b._.notificationArea = new r(b); b.showNotification = function (a, d, e) {
                    var f, l; "progress" == d ? f = e : l = e; a = new CKEDITOR.plugins.notification(b,
                        { message: a, type: d, progress: f, duration: l }); a.show(); return a
                }; b.on("key", function (c) { if (27 == c.data.keyCode) { var d = b._.notificationArea.notifications; d.length && (a(b.lang.notification.closed), d[d.length - 1].hide(), c.cancel()) } })
            }
        }); q.prototype = {
            show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) }, update: function (b) {
                var a = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: b }) && (a = !1); var c = this.element, d = c.findOne(".cke_notification_message"),
                    e = c.findOne(".cke_notification_progress"), f = b.type; c.removeAttribute("role"); b.progress && "progress" != this.type && (f = "progress"); f && (c.removeClass(this._getClass()), c.removeAttribute("aria-label"), this.type = f, c.addClass(this._getClass()), c.setAttribute("aria-label", this.type), "progress" != this.type || e ? "progress" != this.type && e && e.remove() : (e = this._createProgressElement(), e.insertBefore(d))); void 0 !== b.message && (this.message = b.message, d.setHtml(this.message)); void 0 !== b.progress && (this.progress = b.progress,
                        e && e.setStyle("width", this._getPercentageProgress())); a && b.important && (c.setAttribute("role", "alert"), this.isVisible() || this.area.add(this)); this.duration = b.duration; this._hideAfterTimeout()
            }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () { return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this) }, _createElement: function () {
                var b = this, a, c, d = this.editor.lang.common.close; a = new CKEDITOR.dom.element("div"); a.addClass("cke_notification");
                a.addClass(this._getClass()); a.setAttributes({ id: this.id, role: "alert", "aria-label": this.type }); "progress" == this.type && a.append(this._createProgressElement()); c = new CKEDITOR.dom.element("p"); c.addClass("cke_notification_message"); c.setHtml(this.message); a.append(c); c = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + d + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); a.append(c); c.on("click",
                    function () { b.editor.focus(); b.hide() }); return a
            }, _getClass: function () { return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type }, _createProgressElement: function () { var b = new CKEDITOR.dom.element("span"); b.addClass("cke_notification_progress"); b.setStyle("width", this._getPercentageProgress()); return b }, _getPercentageProgress: function () { return Math.round(100 * (this.progress || 0)) + "%" }, _hideAfterTimeout: function () {
                var b = this, a; this._hideTimeoutId && clearTimeout(this._hideTimeoutId);
                if ("number" == typeof this.duration) a = this.duration; else if ("info" == this.type || "success" == this.type) a = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; a && (b._hideTimeoutId = setTimeout(function () { b.hide() }, a))
            }
        }; r.prototype = {
            add: function (b) { this.notifications.push(b); this.element.append(b.element); 1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout() }, remove: function (b) {
                var a = CKEDITOR.tools.indexOf(this.notifications,
                    b); 0 > a || (this.notifications.splice(a, 1), b.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
            }, _createElement: function () { var b = this.editor, a = b.config, c = new CKEDITOR.dom.element("div"); c.addClass("cke_notifications_area"); c.setAttribute("id", "cke_notifications_area_" + b.name); c.setStyle("z-index", a.baseFloatZIndex - 2); return c }, _attachListeners: function () {
                var b = CKEDITOR.document.getWindow(), a = this.editor; b.on("scroll", this._uiBuffer.input); b.on("resize", this._uiBuffer.input);
                a.on("change", this._changeBuffer.input); a.on("floatingSpaceLayout", this._layout, this, null, 20); a.on("blur", this._layout, this, null, 20)
            }, _removeListeners: function () { var b = CKEDITOR.document.getWindow(), a = this.editor; b.removeListener("scroll", this._uiBuffer.input); b.removeListener("resize", this._uiBuffer.input); a.removeListener("change", this._changeBuffer.input); a.removeListener("floatingSpaceLayout", this._layout); a.removeListener("blur", this._layout) }, _layout: function () {
                function b() {
                    a.setStyle("left",
                        k(n + d.width - g - h))
                } var a = this.element, c = this.editor, d = c.ui.contentsElement.getClientRect(), e = c.ui.contentsElement.getDocumentPosition(), f, l, u = a.getClientRect(), m, g = this._notificationWidth, h = this._notificationMargin; m = CKEDITOR.document.getWindow(); var p = m.getScrollPosition(), t = m.getViewPaneSize(), q = CKEDITOR.document.getBody(), r = q.getDocumentPosition(), k = CKEDITOR.tools.cssLength; g && h || (m = this.element.getChild(0), g = this._notificationWidth = m.getClientRect().width, h = this._notificationMargin = parseInt(m.getComputedStyle("margin-left"),
                    10) + parseInt(m.getComputedStyle("margin-right"), 10)); c.toolbar && (f = c.ui.space("top"), l = f.getClientRect()); f && f.isVisible() && l.bottom > d.top && l.bottom < d.bottom - u.height ? a.setStyles({ position: "fixed", top: k(l.bottom) }) : 0 < d.top ? a.setStyles({ position: "absolute", top: k(e.y) }) : e.y + d.height - u.height > p.y ? a.setStyles({ position: "fixed", top: 0 }) : a.setStyles({ position: "absolute", top: k(e.y + d.height - u.height) }); var n = "fixed" == a.getStyle("position") ? d.left : "static" != q.getComputedStyle("position") ? e.x - r.x : e.x; d.width <
                        g + h ? e.x + g + h > p.x + t.width ? b() : a.setStyle("left", k(n)) : e.x + g + h > p.x + t.width ? a.setStyle("left", k(n)) : e.x + d.width / 2 + g / 2 + h > p.x + t.width ? a.setStyle("left", k(n - e.x + p.x + t.width - g - h)) : 0 > d.left + d.width - g - h ? b() : 0 > d.left + d.width / 2 - g / 2 ? a.setStyle("left", k(n - e.x + p.x)) : a.setStyle("left", k(n + d.width / 2 - g / 2 - h / 2))
            }
        }; CKEDITOR.plugins.notification = q
    })(); (function () {
        var c = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (c +=
            ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'), c = c + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
                v = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), w = CKEDITOR.addTemplate("button", c); CKEDITOR.plugins.add("button", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } };
        CKEDITOR.ui.button.prototype = {
            render: function (a, b) {
                function c() { var f = a.mode; f && (f = this.modes[f] ? void 0 !== n[f] ? n[f] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, f = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : f, this.setState(f), this.refresh && this.refresh()) } var n = null, p = CKEDITOR.env, q = this._.id = CKEDITOR.tools.getNextId(), g = "", d = this.command, t, k, l; this._.editor = a; var e = {
                    id: q, button: this, editor: a, focus: function () { CKEDITOR.document.getById(q).focus() }, execute: function () { this.button.click(a) },
                    attach: function (a) { this.button.attach(a) }
                }, x = CKEDITOR.tools.addFunction(function (a) { if (e.onkey) return a = new CKEDITOR.dom.event(a), !1 !== e.onkey(e, a.getKeystroke()) }), y = CKEDITOR.tools.addFunction(function (a) { var b; e.onfocus && (b = !1 !== e.onfocus(e, new CKEDITOR.dom.event(a))); return b }), u = 0; e.clickFn = t = CKEDITOR.tools.addFunction(function () { u && (a.unlockSelection(1), u = 0); e.execute(); p.iOS && a.focus() }); this.modes ? (n = {}, a.on("beforeModeUnload", function () {
                    a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (n[a.mode] =
                        this._.state)
                }, this), a.on("activeFilterChange", c, this), a.on("mode", c, this), !this.readOnly && a.on("readOnly", c, this)) : d && (d = a.getCommand(d)) && (d.on("state", function () { this.setState(d.state) }, this), g += d.state == CKEDITOR.TRISTATE_ON ? "on" : d.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); var m; if (this.directional) a.on("contentDirChanged", function (b) {
                    var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(); b = b.data; b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl"); d.setAttribute("style",
                        CKEDITOR.skin.getIconStyle(m, "rtl" == b, this.icon, this.iconOffset))
                }, this); d ? (k = a.getCommandKeystroke(d)) && (l = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, k)) : g += "off"; k = this.name || this.command; var h = null, r = this.icon; m = k; this.icon && !/\./.test(this.icon) ? (m = this.icon, r = null) : (this.icon && (h = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (h = this.iconHiDpi)); h ? (CKEDITOR.skin.addIcon(h, h), r = null) : h = m; g = {
                    id: q, name: k, iconName: m, label: this.label, cls: this.className || "", state: g, ariaDisabled: "disabled" ==
                        g ? "true" : "false", title: this.title + (l ? " (" + l.display + ")" : ""), ariaShortcut: l ? a.lang.common.keyboardShortcut + " " + l.aria : "", titleJs: p.gecko && !p.hc ? "" : (this.title || "").replace("'", ""), hasArrow: this.hasArrow ? "true" : "false", keydownFn: x, focusFn: y, clickFn: t, style: CKEDITOR.skin.getIconStyle(h, "rtl" == a.lang.dir, r, this.iconOffset), arrowHtml: this.hasArrow ? v.output() : ""
                }; w.output(g, b); if (this.onRender) this.onRender(); return e
            }, setState: function (a) {
                if (this._.state == a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
            }, getState: function () { return this._.state }, toFeature: function (a) {
                if (this._.feature) return this._.feature;
                var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature = b
            }
        }; CKEDITOR.ui.prototype.addButton = function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
    })(); (function () {
        function D(a) {
            function d() { for (var b = f(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || v(a), n = 0; n < e.length; n++) { var g = e[n]; if ("/" != g) { "string" == typeof g && (g = e[n] = { name: g }); var l, d = g.groups; if (d) for (var h = 0; h < d.length; h++)l = d[h], (l = b[l]) && c(g, l); (l = b[g.name]) && c(g, l) } } return e } function f() {
                var b = {}, c, e, g; for (c in a.ui.items) e = a.ui.items[c], g = e.toolbar || "others", g = g.split(","), e = g[0], g = parseInt(g[1] || -1, 10), b[e] || (b[e] = []), b[e].push({ name: c, order: g }); for (e in b) b[e] = b[e].sort(function (b,
                    a) { return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1 }); return b
            } function c(c, e) { if (e.length) { c.items ? c.items.push(a.ui.create("-")) : c.items = []; for (var d; d = e.shift();)d = "string" == typeof d ? d : d.name, b && -1 != CKEDITOR.tools.indexOf(b, d) || (d = a.ui.create(d)) && a.addFeature(d) && c.items.push(d) } } function h(b) {
                var a = [], e, d, h; for (e = 0; e < b.length; ++e)d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
                    h.name = d.name, a.push(h)); return a
            } var b = a.config.removeButtons, b = b && b.split(","), e = a.config.toolbar; "string" == typeof e && (e = a.config["toolbar_" + e]); return a.toolbar = e ? h(e) : d()
        } function v(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, {
                name: "paragraph", groups: ["list",
                    "indent", "blocks", "align", "bidi"]
            }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
        } var z = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; z.prototype.focus = function () { for (var a = 0, d; d = this.toolbars[a++];)for (var f = 0, c; c = d.items[f++];)if (c.focus) { c.focus(); return } }; var E = {
            modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () { a.toolbox.focus() },
                    100) : a.toolbox.focus())
            }
        }; CKEDITOR.plugins.add("toolbar", {
            requires: "button", init: function (a) {
                var d, f = function (c, h) {
                    var b, e = "rtl" == a.lang.dir, k = a.config.toolbarGroupCycling, q = e ? 37 : 39, e = e ? 39 : 37, k = void 0 === k || k; switch (h) {
                        case 9: case CKEDITOR.SHIFT + 9: for (; !b || !b.items.length;)if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length) for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) ||
                            (b = 0); c && c.focus(); return !1; case q: b = c; do b = b.next, !b && k && (b = c.toolbar.items[0]); while (b && !b.focus); b ? b.focus() : f(c, 9); return !1; case 40: return c.button && c.button.hasArrow ? c.execute() : f(c, 40 == h ? q : e), !1; case e: case 38: b = c; do b = b.previous, !b && k && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus); b ? b.focus() : (d = 1, f(c, CKEDITOR.SHIFT + 9), d = 0); return !1; case 27: return a.focus(), !1; case 13: case 32: return c.execute(), !1
                    }return !0
                }; a.on("uiSpace", function (c) {
                    if (c.data.space == a.config.toolbarLocation) {
                        c.removeListener();
                        a.toolbox = new z; var d = CKEDITOR.tools.getNextId(), b = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', a.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + a.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'], d = !1 !== a.config.toolbarStartupExpanded, e, k; a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && b.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e'));
                        for (var q = a.toolbox.toolbars, n = D(a), g = n.length, l = 0; l < g; l++) {
                            var r, m = 0, w, p = n[l], v = "/" !== p && ("/" === n[l + 1] || l == g - 1), x; if (p) if (e && (b.push("\x3c/span\x3e"), k = e = 0), "/" === p) b.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                x = p.items || p; for (var y = 0; y < x.length; y++) {
                                    var t = x[y], A; if (t) {
                                        var B = function (c) { c = c.render(a, b); u = m.items.push(c) - 1; 0 < u && (c.previous = m.items[u - 1], c.previous.next = c); c.toolbar = m; c.onkey = f; c.onfocus = function () { a.toolbox.focusCommandExecuted || a.focus() } }; if (t.type == CKEDITOR.UI_SEPARATOR) k =
                                            e && t; else {
                                            A = !1 !== t.canGroup; if (!m) {
                                                r = CKEDITOR.tools.getNextId(); m = { id: r, items: [] }; w = p.name && (a.lang.toolbar.toolbarGroups[p.name] || p.name); b.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (v ? ' cke_toolbar_last"' : '"'), w ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e'); w && b.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', w, "\x3c/span\x3e"); b.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e'); var u = q.push(m) - 1; 0 < u && (m.previous = q[u - 1], m.previous.next =
                                                    m)
                                            } A ? e || (b.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), e = 1) : e && (b.push("\x3c/span\x3e"), e = 0); k && (B(k), k = 0); B(t)
                                        }
                                    }
                                } e && (b.push("\x3c/span\x3e"), k = e = 0); m && b.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                            }
                        } a.config.toolbarCanCollapse && b.push("\x3c/span\x3e"); if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var C = CKEDITOR.tools.addFunction(function () { a.execCommand("toolbarCollapse") }); a.on("destroy", function () { CKEDITOR.tools.removeFunction(C) });
                            a.addCommand("toolbarCollapse", {
                                readOnly: 1, exec: function (b) {
                                    var a = b.ui.space("toolbar_collapser"), c = a.getPrevious(), d = b.ui.space("contents"), e = c.getParent(), h = parseInt(d.$.style.height, 10), g = e.$.offsetHeight, f = a.hasClass("cke_toolbox_collapser_min"); f ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand)); a.getFirst().setText(f ? "▲" : "◀"); d.setStyle("height",
                                        h - (e.$.offsetHeight - g) + "px"); b.fire("resize", { outerHeight: b.container.$.offsetHeight, contentsHeight: d.$.offsetHeight, outerWidth: b.container.$.offsetWidth })
                                }, modes: { wysiwyg: 1, source: 1 }
                            }); a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); b.push('\x3ca title\x3d"' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id\x3d"' + a.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser'); d || b.push(" cke_toolbox_collapser_min");
                            b.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + C + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                        } b.push("\x3c/span\x3e"); c.data.html += b.join("")
                    }
                }); a.on("destroy", function () { if (this.toolbox) { var a, d = 0, b, e, f; for (a = this.toolbox.toolbars; d < a.length; d++)for (e = a[d].items, b = 0; b < e.length; b++)f = e[b], f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn), f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn) } }); a.on("uiReady", function () {
                    var c = a.ui.space("toolbox"); c && a.focusManager.add(c,
                        1)
                }); a.addCommand("toolbarFocus", E); a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); a.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); a.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, d) { d.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
            }
        }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, d, f) {
            var c = v(this.editor), h = 0 === d, b = { name: a }; if (f) {
                if (f = CKEDITOR.tools.search(c, function (a) { return a.name == f })) {
                    !f.groups && (f.groups = []); if (d &&
                        (d = CKEDITOR.tools.indexOf(f.groups, d), 0 <= d)) { f.groups.splice(d + 1, 0, a); return } h ? f.groups.splice(0, 0, a) : f.groups.push(a); return
                } d = null
            } d && (d = CKEDITOR.tools.indexOf(c, function (a) { return a.name == d })); h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
        }
    })(); CKEDITOR.UI_SEPARATOR = "separator"; CKEDITOR.config.toolbarLocation = "top"; (function () {
        function r(a, b, c) { b.type || (b.type = "auto"); if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1; b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus() }); return a.fire("paste", b) } function x(a) {
            function b() {
                var b = a.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                    var c = function (b) {
                        a.getSelection().isCollapsed() || (a.readOnly && "cut" == b.name || p.initPasteDataTransfer(b,
                            a), b.data.preventDefault())
                    }; b.on("copy", c); b.on("cut", c); b.on("cut", function () { a.readOnly || a.extractSelectedHtml() }, null, null, 999)
                } b.on(p.mainPasteEvent, function (a) { "beforepaste" == p.mainPasteEvent && m || l(a) }); "beforepaste" == p.mainPasteEvent && (b.on("paste", function (a) { u || (g(), a.data.preventDefault(), l(a), e("paste")) }), b.on("contextmenu", h, null, null, 0), b.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || h() }, null, null, 0)); b.on("beforecut", function () { !m && f(a) }); var d; b.attachListener(CKEDITOR.env.ie ?
                    b : a.document.getDocumentElement(), "mouseup", function () { d = setTimeout(function () { t() }, 0) }); a.on("destroy", function () { clearTimeout(d) }); b.on("keyup", t)
            } function c(b) { return { type: b, canUndo: "cut" == b, startDisabled: !0, fakeKeystroke: "cut" == b ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { "cut" == this.type && f(); var b; var c = this.type; if (CKEDITOR.env.ie) b = e(c); else try { b = a.document.$.execCommand(c, !1, null) } catch (d) { b = !1 } b || a.showNotification(a.lang.clipboard[this.type + "Error"]); return b } } } function d() {
                return {
                    canUndo: !1,
                    async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (a, b) {
                        function c(b, h) { h = "undefined" !== typeof h ? h : !0; b ? (b.method = "paste", b.dataTransfer || (b.dataTransfer = p.initPasteDataTransfer()), r(a, b, h)) : e && !a._.forcePasteDialog && a.showNotification(n, "info", a.config.clipboard_notificationDuration); a._.forcePasteDialog = !1; a.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!b }) } b = "undefined" !== typeof b && null !== b ? b : {}; var d = this, e = "undefined" !== typeof b.notification ? b.notification : !0, h = b.type, f = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard,
                            a.getCommandKeystroke(this)), n = "string" === typeof e ? e : a.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + f.aria + '"\x3e' + f.display + "\x3c/kbd\x3e"), f = "string" === typeof b ? b : b.dataValue; h && !0 !== a.config.forcePasteAsPlainText && "allow-word" !== a.config.forcePasteAsPlainText ? a._.nextPasteType = h : delete a._.nextPasteType; "string" === typeof f ? c({ dataValue: f }) : a.getClipboardData(c)
                    }
                }
            } function g() { u = 1; setTimeout(function () { u = 0 }, 100) } function h() { m = 1; setTimeout(function () { m = 0 }, 10) } function e(b) {
                var c =
                    a.document, d = c.getBody(), e = !1, h = function () { e = !0 }; d.on(b, h); 7 < CKEDITOR.env.version ? c.$.execCommand(b) : c.$.selection.createRange().execCommand(b); d.removeListener(b, h); return e
            } function f() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var b = a.getSelection(), c, d, e; b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement()) && (d = b.getRanges()[0], e = a.document.createText(""), e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), b.selectRanges([d]), setTimeout(function () { c.getParent() && (e.remove(), b.selectElement(c)) },
                        0))
                }
            } function k(b, c) {
                var d = a.document, e = a.editable(), h = function (a) { a.cancel() }, f; if (!d.getById("cke_pastebin")) {
                    var n = a.getSelection(), g = n.createBookmarks(); CKEDITOR.env.ie && n.root.fire("selectionchange"); var l = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie ? "div" : "body", d); l.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var k = 0, d = d.getWindow(); CKEDITOR.env.webkit ? (e.append(l), l.addClass("cke_editable"), e.is("body") || (k = "static" != e.getComputedStyle("position") ?
                        e : CKEDITOR.dom.element.get(e.$.offsetParent), k = k.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(l); l.setStyles({ position: "absolute", top: d.getScrollPosition().y - k + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 }); CKEDITOR.env.safari && l.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (k = l.getParent().isReadOnly()) ? (l.setOpacity(0), l.setAttribute("contenteditable", !0)) : l.setStyle("ltr" == a.config.contentsLangDirection ?
                            "left" : "right", "-10000px"); a.on("selectionChange", h, null, null, 0); if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) f = e.once("blur", h, null, null, -100); k && l.focus(); k = new CKEDITOR.dom.range(l); k.selectNodeContents(l); var t = k.select(); CKEDITOR.env.ie && (f = e.once("blur", function () { a.lockSelection(t) })); var q = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () {
                                CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = q); f && f.removeListener(); CKEDITOR.env.ie && e.focus(); n.selectBookmarks(g);
                                l.remove(); var b; CKEDITOR.env.webkit && (b = l.getFirst()) && b.is && b.hasClass("Apple-style-span") && (l = b); a.removeListener("selectionChange", h); c(l.getHtml())
                            }, 0)
                }
            } function y() { if ("paste" == p.mainPasteEvent) return a.fire("beforePaste", { type: "auto", method: "paste" }), !1; a.focus(); g(); var b = a.focusManager; b.lock(); if (a.editable().fire(p.mainPasteEvent) && !e("paste")) return b.unlock(), !1; b.unlock(); return !0 } function n(b) {
                if ("wysiwyg" == a.mode) switch (b.data.keyCode) {
                    case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: b =
                        a.editable(); g(); "paste" == p.mainPasteEvent && b.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT + 46: a.fire("saveSnapshot"), setTimeout(function () { a.fire("saveSnapshot") }, 50)
                }
            } function l(b) {
                var c = { type: "auto", method: "paste", dataTransfer: p.initPasteDataTransfer(b) }; c.dataTransfer.cacheData(); var d = !1 !== a.fire("beforePaste", c); d && p.canClipboardApiBeTrusted(c.dataTransfer, a) ? (b.data.preventDefault(), setTimeout(function () { r(a, c) }, 0)) : k(b, function (b) {
                    c.dataValue = b.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,
                        ""); d && r(a, c)
                })
            } function t() { if ("wysiwyg" == a.mode) { var b = q("paste"); a.getCommand("cut").setState(q("cut")); a.getCommand("copy").setState(q("copy")); a.getCommand("paste").setState(b); a.fire("pasteState", b) } } function q(b) { if (v && b in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == b) return CKEDITOR.TRISTATE_OFF; b = a.getSelection(); var c = b.getRanges(); return b.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF } var p = CKEDITOR.plugins.clipboard,
                m = 0, u = 0, v = 0; (function () {
                    a.on("key", n); a.on("contentDom", b); a.on("selectionChange", function (a) { v = a.data.selection.getRanges()[0].checkReadOnly(); t() }); if (a.contextMenu) { a.contextMenu.addListener(function (a, b) { v = b.getRanges()[0].checkReadOnly(); return { cut: q("cut"), copy: q("copy"), paste: q("paste") } }); var c = null; a.on("menuShow", function () { c && (c.removeListener(), c = null); var b = a.contextMenu.findItemByCommandName("paste"); b && b.element && (c = b.element.on("touchend", function () { a._.forcePasteDialog = !0 })) }) } if (a.ui.addButton) a.once("instanceReady",
                        function () { a._.pasteButtons && CKEDITOR.tools.array.forEach(a._.pasteButtons, function (b) { if (b = a.ui.get(b)) CKEDITOR.document.getById(b._.id).on("touchend", function () { a._.forcePasteDialog = !0 }) }) })
                })(); (function () {
                    function b(c, d, e, h, f) { var n = a.lang.clipboard[d]; a.addCommand(d, e); a.ui.addButton && a.ui.addButton(c, { label: n, command: d, toolbar: "clipboard," + h }); a.addMenuItems && a.addMenuItem(d, { label: n, command: d, group: "clipboard", order: f }) } b("Cut", "cut", c("cut"), 10, 1); b("Copy", "copy", c("copy"), 20, 4); b("Paste",
                        "paste", d(), 30, 8); a._.pasteButtons || (a._.pasteButtons = []); a._.pasteButtons.push("Paste")
                })(); a.getClipboardData = function (b, c) {
                    function d(a) { a.removeListener(); a.cancel(); c(a.data) } function e(a) { a.removeListener(); a.cancel(); c({ type: f, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" }) } var h = !1, f = "auto"; c || (c = b, b = null); a.on("beforePaste", function (a) { a.removeListener(); h = !0; f = a.data.type }, null, null, 1E3); a.on("paste", d, null, null, 0); !1 === y() && (a.removeListener("paste", d), a._.forcePasteDialog &&
                        h && a.fire("pasteDialog") ? (a.on("pasteDialogCommit", e), a.on("dialogHide", function (a) { a.removeListener(); a.data.removeListener("pasteDialogCommit", e); a.data._.committed || c(null) })) : c(null))
                }
        } function z(a) {
            if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html";
            return "htmlifiedtext"
        } function A(a, b) {
            function c(a) { return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "") } b = b.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"),
                b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) { return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return c(a.length / 4) }) + "\x3c/p\x3e")); return B(a, b)
        } function C() {
            function a() {
                var a =
                    {}, b; for (b in CKEDITOR.dtd) "$" != b.charAt(0) && "div" != b && "span" != b && (a[b] = 1); return a
            } var b = {}; return { get: function (c) { return "plain-text" == c ? b.plainText || (b.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = b.semanticContent) || (c = new CKEDITOR.filter, c.allow({ $1: { elements: a(), attributes: !0, styles: !1, classes: !1 } }), c = b.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null } }
        } function w(a, b, c) {
            b = CKEDITOR.htmlParser.fragment.fromHtml(b); var d = new CKEDITOR.htmlParser.basicWriter; c.applyTo(b, !0, !1,
                a.activeEnterMode); b.writeHtml(d); return d.getHtml()
        } function B(a, b) { a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) { return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b } function D(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function E(a) {
            var b = CKEDITOR.plugins.clipboard; a.on("contentDom", function () {
                function c(b, c, e) {
                    c.select(); r(a, {
                        dataTransfer: e,
                        method: "drop"
                    }, 1); e.sourceEditor.fire("saveSnapshot"); e.sourceEditor.editable().extractHtmlFromRange(b); e.sourceEditor.getSelection().selectRanges([b]); e.sourceEditor.fire("saveSnapshot")
                } function d(c, e) { c.select(); r(a, { dataTransfer: e, method: "drop" }, 1); b.resetDragDataTransfer() } function g(b, c, e) { var d = { $: b.data.$, target: b.data.getTarget() }; c && (d.dragRange = c); e && (d.dropRange = e); !1 === a.fire(b.name, d) && b.data.preventDefault() } function h(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() }
                var e = a.editable(), f = CKEDITOR.plugins.clipboard.getDropTarget(a), k = a.ui.space("top"), m = a.ui.space("bottom"); b.preventDefaultDropOnElement(k); b.preventDefaultDropOnElement(m); e.attachListener(f, "dragstart", g); e.attachListener(a, "dragstart", b.resetDragDataTransfer, b, null, 1); e.attachListener(a, "dragstart", function (c) { b.initDragDataTransfer(c, a) }, null, null, 2); e.attachListener(a, "dragstart", function () {
                    var c = b.dragRange = a.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (b.dragStartContainerChildCount =
                        c ? h(c.startContainer) : null, b.dragEndContainerChildCount = c ? h(c.endContainer) : null)
                }, null, null, 100); e.attachListener(f, "dragend", g); e.attachListener(a, "dragend", b.initDragDataTransfer, b, null, 1); e.attachListener(a, "dragend", b.resetDragDataTransfer, b, null, 100); e.attachListener(f, "dragover", function (a) {
                    if (CKEDITOR.env.edge) a.data.preventDefault(); else {
                        var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") &&
                            a.data.preventDefault()
                    }
                }); e.attachListener(f, "drop", function (c) { if (!c.data.$.defaultPrevented) { c.data.preventDefault(); var e = c.data.getTarget(); if (!e.isReadOnly() || e.type == CKEDITOR.NODE_ELEMENT && e.is("html")) { var e = b.getRangeAtDropPosition(c, a), d = b.dragRange; e && g(c, d, e) } } }, null, null, 9999); e.attachListener(a, "drop", b.initDragDataTransfer, b, null, 1); e.attachListener(a, "drop", function (e) {
                    if (e = e.data) {
                        var h = e.dropRange, f = e.dragRange, g = e.dataTransfer; g.getTransferType(a) == CKEDITOR.DATA_TRANSFER_INTERNAL ?
                            setTimeout(function () { b.internalDrop(f, h, g, a) }, 0) : g.getTransferType(a) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(f, h, g) : d(h, g)
                    }
                }, null, null, 9999)
            })
        } var m; CKEDITOR.plugins.add("clipboard", {
            requires: "dialog,notification,toolbar", init: function (a) {
                var b, c = C(); a.config.forcePasteAsPlainText ? b = "plain-text" : a.config.pasteFilter ? b = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (b = "semantic-content"); a.pasteFilter = c.get(b); x(a); E(a); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path +
                    "dialogs/paste.js")); if (CKEDITOR.env.gecko) {
                        var d = ["image/png", "image/jpeg", "image/gif"], g; a.on("paste", function (b) {
                            var c = b.data, f = c.dataTransfer; if (!c.dataValue && "paste" == c.method && f && 1 == f.getFilesCount() && g != f.id && (f = f.getFile(0), -1 != CKEDITOR.tools.indexOf(d, f.type))) {
                                var k = new FileReader; k.addEventListener("load", function () { b.data.dataValue = '\x3cimg src\x3d"' + k.result + '" /\x3e'; a.fire("paste", b.data) }, !1); k.addEventListener("abort", function () { a.fire("paste", b.data) }, !1); k.addEventListener("error",
                                    function () { a.fire("paste", b.data) }, !1); k.readAsDataURL(f); g = c.dataTransfer.id; b.stop()
                            }
                        }, null, null, 1)
                    } a.on("paste", function (b) { b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!b.data.dataValue) { var c = b.data.dataTransfer, d = c.getData("text/html"); if (d) b.data.dataValue = d, b.data.type = "html"; else if (d = c.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text" } }, null, null, 1); a.on("paste", function (a) {
                        var b = a.data.dataValue,
                            c = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
                        if (b.match(/^<[^<]+cke_(editable|contents)/i)) { var d, g, n = new CKEDITOR.dom.element("div"); for (n.setHtml(b); 1 == n.getChildCount() && (d = n.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));)n = g = d; g && (b = g.getHtml().replace(/<br>$/i, "")) } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, d) { return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, d) {
                            return d in
                                c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b
                        }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                    }, null, null, 3); a.on("paste", function (b) {
                        b = b.data; var d = a._.nextPasteType || b.type, f = b.dataValue, g, m = a.config.clipboard_defaultContentType || "html", n = b.dataTransfer.getTransferType(a); g = "html" == d || "html" == b.preSniffing ? "html" : z(f); delete a._.nextPasteType; "htmlifiedtext" == g && (f = A(a.config, f)); "text" == d && "html" == g ? f = w(a, f, c.get("plain-text")) : n == CKEDITOR.DATA_TRANSFER_EXTERNAL && a.pasteFilter &&
                            !b.dontFilter && (f = w(a, f, a.pasteFilter)); b.startsWithEOL && (f = '\x3cbr data-cke-eol\x3d"1"\x3e' + f); b.endsWithEOL && (f += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" == d && (d = "html" == g || "html" == m ? "html" : "text"); b.type = d; b.dataValue = f; delete b.preSniffing; delete b.startsWithEOL; delete b.endsWithEOL
                    }, null, null, 6); a.on("paste", function (b) { b = b.data; b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () { a.fire("afterPaste") }, 0)) }, null, null, 1E3); a.on("pasteDialog", function (b) {
                        setTimeout(function () {
                            a.openDialog("paste",
                                b.data)
                        }, 0)
                    })
            }
        }); CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: (!CKEDITOR.env.ie || 16 <= CKEDITOR.env.version) && !CKEDITOR.env.iOS, isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste", addPasteButton: function (a, b, c) { a.ui.addButton && (a.ui.addButton(b, c), a._.pasteButtons || (a._.pasteButtons = []), a._.pasteButtons.push(b)) }, canClipboardApiBeTrusted: function (a,
                b) { return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1 }, getDropTarget: function (a) { var b = a.editable(); return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document }, fixSplitNodesAfterDrop: function (a, b, c, d) {
                    function g(a, c, d) {
                        var g = a; g.type == CKEDITOR.NODE_TEXT && (g =
                            a.getParent()); if (g.equals(c) && d != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, d), b.collapse(!0)), !0
                    } var h = b.startContainer; "number" == typeof d && "number" == typeof c && h.type == CKEDITOR.NODE_ELEMENT && (g(a.startContainer, h, c) || g(a.endContainer, h, d))
                }, isDropRangeAffectedByDragRange: function (a, b) {
                    var c =
                        b.startContainer, d = b.endOffset; return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < d ? !0 : !1
                }, internalDrop: function (a, b, c, d) {
                    var g = CKEDITOR.plugins.clipboard, h = d.editable(), e, f; d.fire("saveSnapshot"); d.fire("lockSnapshot", { dontUpdate: 1 }); CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(a, b, g.dragStartContainerChildCount, g.dragEndContainerChildCount);
                    (f = this.isDropRangeAffectedByDragRange(a, b)) || (e = a.createBookmark(!1)); g = b.clone().createBookmark(!1); f && (e = a.createBookmark(!1)); a = e.startNode; b = e.endNode; f = g.startNode; b && a.getPosition(f) & CKEDITOR.POSITION_PRECEDING && b.getPosition(f) & CKEDITOR.POSITION_FOLLOWING && f.insertBefore(a); a = d.createRange(); a.moveToBookmark(e); h.extractHtmlFromRange(a, 1); b = d.createRange(); b.moveToBookmark(g); r(d, { dataTransfer: c, method: "drop", range: b }, 1); d.fire("unlockSnapshot")
                }, getRangeAtDropPosition: function (a, b) {
                    var c =
                        a.data.$, d = c.clientX, g = c.clientY, h = b.getSelection(!0).getRanges()[0], e = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, g)) c = b.document.$.caretRangeFromPoint(d, g), e.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), e.collapse(!0); else if (c.rangeParent) e.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), e.collapse(!0); else {
                            if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && h && b.editable().hasFocus) return h; if (document.body.createTextRange) {
                                b.focus();
                                c = b.document.getBody().$.createTextRange(); try {
                                    for (var f = !1, k = 0; 20 > k && !f; k++) { if (!f) try { c.moveToPoint(d, g - k), f = !0 } catch (m) { } if (!f) try { c.moveToPoint(d, g + k), f = !0 } catch (n) { } } if (f) { var l = "cke-temp-" + (new Date).getTime(); c.pasteHTML('\x3cspan id\x3d"' + l + '"\x3e​\x3c/span\x3e'); var t = b.document.getById(l); e.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START); t.remove() } else {
                                        var q = b.document.$.elementFromPoint(d, g), p = new CKEDITOR.dom.element(q), r; if (p.equals(b.editable()) || "html" == p.getName()) return h && h.startContainer &&
                                            !h.startContainer.equals(b.editable()) ? h : null; r = p.getClientRect(); d < r.left ? e.setStartAt(p, CKEDITOR.POSITION_AFTER_START) : e.setStartAt(p, CKEDITOR.POSITION_BEFORE_END); e.collapse(!0)
                                    }
                                } catch (u) { return null }
                            } else return null
                        } return e
                }, initDragDataTransfer: function (a, b) {
                    var c = a.data.$ ? a.data.$.dataTransfer : null, d = new this.dataTransfer(c, b); "dragstart" === a.name && d.storeId(); c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d; a.data.dataTransfer =
                        d
                }, resetDragDataTransfer: function () { this.dragData = null }, initPasteDataTransfer: function (a, b) { if (this.isCustomCopyCutSupported) { if (a && a.data && a.data.$) { var c = a.data.$.clipboardData, d = new this.dataTransfer(c, b); "copy" !== a.name && "cut" !== a.name || d.storeId(); this.copyCutData && d.id == this.copyCutData.id ? (d = this.copyCutData, d.$ = c) : this.copyCutData = d; return d } return new this.dataTransfer(null, b) } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b) }, preventDefaultDropOnElement: function (a) {
                    a &&
                        a.on("dragover", D)
                }
        }; m = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
            a && (this.$ = a); this._ = { metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g, data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a } }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this);
            this.id = this.getData(m); this.id || (this.id = "Text" == m ? "" : "cke-" + CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == m || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
        }; CKEDITOR.DATA_TRANSFER_INTERNAL = 1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
            getData: function (a, b) {
                a = this._.normalizeType(a); var c = "text/html" == a && b ? this._.nativeHtmlCache :
                    this._.data[a]; if (void 0 === c || null === c || "" === c) { if (this._.fallbackDataTransfer.isRequired()) c = this._.fallbackDataTransfer.getData(a, b); else try { c = this.$.getData(a) || "" } catch (d) { c = "" } "text/html" != a || b || (c = this._stripHtml(c)) } "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == c.substring(0, 7) && (c = ""); if ("string" === typeof c) var g = c.indexOf("\x3c/html\x3e"), c = -1 !== g ? c.substring(0, g + 7) : c; return c
            }, setData: function (a, b) {
                a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b),
                    this._.nativeHtmlCache = b) : this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == m && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try { this.$.setData(a, b) } catch (c) { }
            }, storeId: function () { "Text" !== m && this.setData(m, this.id) }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL },
            cacheData: function () {
                function a(a) { a = b._.normalizeType(a); var c = b.getData(a); "text/html" == a && (b._.nativeHtmlCache = b.getData(a, !0), c = b._stripHtml(c)); c && (b._.data[a] = c) } if (this.$) {
                    var b = this, c, d; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (c = 0; c < this.$.types.length; c++)a(this.$.types[c]) } else a("Text"), a("URL"); d = this._getImageFromClipboard(); if (this.$ && this.$.files || d) {
                        this._.files = []; if (this.$.files && this.$.files.length) for (c = 0; c < this.$.files.length; c++)this._.files.push(this.$.files[c]);
                        0 === this._.files.length && d && this._.files.push(d)
                    }
                }
            }, getFilesCount: function () { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) { return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0 }, isEmpty: function () {
                var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.objectKeys(this._.data),
                    function (b) { a[b] = 1 }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (var c = 0; c < this.$.types.length; c++)a[this.$.types[c]] = 1 } else a.Text = 1, a.URL = 1; "Text" != m && (a[m] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0
            }, _getImageFromClipboard: function () { var a; if (this.$ && this.$.items && this.$.items[0]) try { if ((a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) {
                if (a && a.length) {
                    a = a.replace(this._.metaRegExp, ""); var b = this._.bodyRegExp.exec(a);
                    b && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, ""))
                } return a
            }
        }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported = null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
            isRequired: function () {
                var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null ===
                    a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (c) { } } else return !1; return !a._isCustomMimeTypeSupported
            }, getData: function (a, b) {
                var c = this._getData(this._customDataFallbackType, !0); if (b) return c; var c = this._extractDataComment(c), d = null, d = a === this._customDataFallbackType ? c.content : c.data && c.data[a] ? c.data[a] : this._getData(a,
                    !0); return null !== d ? d : ""
            }, setData: function (a, b) {
                var c = a === this._customDataFallbackType; c && (b = this._applyDataComment(b, this._getFallbackTypeData())); var d = b, g = this._dataTransfer.$; try { g.setData(a, d), c && (this._dataTransfer._.nativeHtmlCache = d) } catch (h) {
                    if (this._isUnsupportedMimeTypeError(h)) {
                        c = CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(c._customTypes, a) && c._customTypes.push(a); var c = this._getFallbackTypeContent(), e = this._getFallbackTypeData(); e[a] = d; try {
                            d = this._applyDataComment(c,
                                e), g.setData(this._customDataFallbackType, d), this._dataTransfer._.nativeHtmlCache = d
                        } catch (f) { d = "" }
                    }
                } return d
            }, _getData: function (a, b) { var c = this._dataTransfer._.data; if (!b && c[a]) return c[a]; try { return this._dataTransfer.$.getData(a) } catch (d) { return null } }, _getFallbackTypeContent: function () { var a = this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content); return a }, _getFallbackTypeData: function () {
                var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes,
                    b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, c = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== c[a] ? b[a] = c[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b
            }, _isUnsupportedMimeTypeError: function (a) { return a.message && -1 !== a.message.search(/element not found/gi) }, _extractDataComment: function (a) {
                var b = { data: null, content: a || "" }; if (a && 16 < a.length) {
                    var c; (c = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && c[1] && (b.data = JSON.parse(decodeURIComponent(c[1])),
                        b.content = a.replace(c[0], ""))
                } return b
            }, _applyDataComment: function (a, b) { var c = ""; b && CKEDITOR.tools.objectKeys(b).length && (c = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return c + (a && a.length ? a : "") }
        }
    })(); CKEDITOR.config.clipboard_notificationDuration = 1E4; (function () {
        CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, b) { b && CKEDITOR.tools.extend(this, b); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} } }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var g = CKEDITOR.addTemplate("panel",
            '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), h = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'), k = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
        CKEDITOR.ui.panel.prototype = {
            render: function (a, b) {
                this.getHolderElement = function () {
                    var a = this._.holder; if (!a) {
                        if (this.isFramed) {
                            var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() }, this)); a.write(k.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" +
                                    b + ");"
                            }, e))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("keydown", function (a) { var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir"); this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                        } else a = this.document.getById(this.id); this._.holder = a
                    } return a
                }; var e = {
                    editorId: a.id, id: this.id, langCode: a.langCode,
                    dir: a.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": a.config.baseFloatZIndex + 1
                }; if (this.isFramed) { var d = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; e.frame = h.output({ id: this.id + "_frame", src: d }) } d = g.output(e); b && b.push(d); return d
            }, addBlock: function (a, b) {
                b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
                    b); this._.currentBlock || this.showBlock(a); return b
            }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) { a = this._.blocks[a]; var b = this._.currentBlock, e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); b && b.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", e); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a }, destroy: function () { this.element && this.element.remove() }
        }; CKEDITOR.ui.panel.block =
            CKEDITOR.tools.createClass({
                $: function (a, b) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); b && CKEDITOR.tools.extend(this, b); this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() }, _: {
                    markItem: function (a) {
                        -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                            a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                    }, markFirstDisplayed: function (a) { for (var b = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, e = this._.getItems(), d, c, f = e.count() - 1; 0 <= f; f--)if (d = e.getItem(f), d.getAscendant(b) || (c = d, this._.focusIndex = f), "true" == d.getAttribute("aria-selected")) { c = d; this._.focusIndex = f; break } c && (a && a(), CKEDITOR.env.webkit && c.getDocument().getWindow().focus(), c.focus(), this.onMark && this.onMark(c)) },
                    getItems: function () { return this.element.getElementsByTag("a") }
                }, proto: {
                    show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, b) {
                        var e = this.keys[a]; switch (e) {
                            case "next": for (var d = this._.focusIndex, e = this.element.getElementsByTag("a"), c; c = e.getItem(++d);)if (c.getAttribute("_cke_focus") && c.$.offsetWidth) { this._.focusIndex = d; c.focus(); break } return c || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a,
                                1)); case "prev": d = this._.focusIndex; for (e = this.element.getElementsByTag("a"); 0 < d && (c = e.getItem(--d));) { if (c.getAttribute("_cke_focus") && c.$.offsetWidth) { this._.focusIndex = d; c.focus(); break } c = null } return c || b ? !1 : (this._.focusIndex = e.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return d = this._.focusIndex, (c = 0 <= d && this.element.getElementsByTag("a").getItem(d)) && (c.$[e] ? c.$[e]() : c.$["on" + e]()), !1
                        }return !0
                    }
                }
            })
    })(); CKEDITOR.plugins.add("floatpanel", { requires: "panel" });
    (function () {
        function v(a, b, c, m, h) { h = CKEDITOR.tools.genKey(b.getUniqueId(), c.getUniqueId(), a.lang.dir, a.uiColor || "", m.css || "", h || ""); var g = f[h]; g || (g = f[h] = new CKEDITOR.ui.panel(b, m), g.element = c.append(CKEDITOR.dom.element.createFromHtml(g.render(a), b)), g.element.setStyles({ display: "none", position: "absolute" })); return g } var f = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (a, b, c, m) {
                function h() { e.hide() } c.forceIFrame = 1; c.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
                    (b = CKEDITOR.document.getById("cke_" + a.name)); var g = b.getDocument(); m = v(a, g, b, c, m || 0); var n = m.element, k = n.getFirst(), e = this; n.disableContextMenu(); this.element = n; this._ = { editor: a, panel: m, parentElement: b, definition: c, document: g, iframe: k, children: [], dir: a.lang.dir, showBlockParams: null }; a.on("mode", h); a.on("resize", h); g.getWindow().on("resize", function () { this.reposition() }, this)
            }, proto: {
                addBlock: function (a, b) { return this._.panel.addBlock(a, b) }, addListBlock: function (a, b) {
                    return this._.panel.addListBlock(a,
                        b)
                }, getBlock: function (a) { return this._.panel.getBlock(a) }, showBlock: function (a, b, c, m, h, g) {
                    var n = this._.panel, k = n.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var e = this._.editor.editable(); this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; var l = this.element, e = this._.iframe, e = CKEDITOR.env.ie && !CKEDITOR.env.edge ? e : new CKEDITOR.dom.window(e.$.contentWindow), f = l.getDocument(), r = this._.parentElement.getPositionedAncestor(),
                        t = b.getDocumentPosition(f), f = r ? r.getDocumentPosition(f) : { x: 0, y: 0 }, q = "rtl" == this._.dir, d = t.x + (m || 0) - f.x, p = t.y + (h || 0) - f.y; !q || 1 != c && 4 != c ? q || 2 != c && 3 != c || (d += b.$.offsetWidth - 1) : d += b.$.offsetWidth; if (3 == c || 4 == c) p += b.$.offsetHeight - 1; this._.panel._.offsetParentId = b.getId(); l.setStyles({ top: p + "px", left: 0, display: "" }); l.setOpacity(0); l.getFirst().removeStyle("width"); this._.editor.focusManager.add(e); this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on("blur", function (a) {
                            function u() {
                                delete this._.returnFocus;
                                this.hide()
                            } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(u, 0, this)) : u.call(this))
                        }, this), e.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (e.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), e.on("touchend", function () { this._.hideTimeout = 0; this.focus() }, this)), CKEDITOR.event.useCapture = !1,
                            this._.blurSet = 1); n.onEscape = CKEDITOR.tools.bind(function (a) { if (this.onEscape && !1 === this.onEscape(a)) return !1 }, this); CKEDITOR.tools.setTimeout(function () {
                                var a = CKEDITOR.tools.bind(function () {
                                    var a = l; a.removeStyle("width"); if (k.autoSize) {
                                        var b = k.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? k.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width", b + 10 + "px"); b = k.element.$.scrollHeight; CKEDITOR.env.ie &&
                                            CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3); a.setStyle("height", b + "px"); n._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                    } else a.removeStyle("height"); q && (d -= l.$.offsetWidth); l.setStyle("left", d + "px"); var b = n.element.getWindow(), a = l.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, e = a.height || a.bottom - a.top, m = q ? a.right : b.width - a.left, h = q ? b.width - a.right : a.left; q ? m < c && (d = h > c ? d + c : b.width > c ? d - a.left : d - a.right + b.width) :
                                        m < c && (d = h > c ? d - c : b.width > c ? d - a.right + b.width : d - a.left); c = a.top; b.height - a.top < e && (p = c > e ? p - e : b.height > e ? p - a.bottom + b.height : p - a.top); CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(l.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (d = CKEDITOR.env.ie8Compat ? d - 2 * l.getDocument().getDocumentElement().$.scrollLeft : d - (a.$.scrollWidth - a.$.clientWidth))); var a = l.getFirst(), f; (f = a.getCustomData("activePanel")) && f.onHide && f.onHide.call(this, 1); a.setCustomData("activePanel",
                                            this); l.setStyles({ top: p + "px", left: d + "px" }); l.setOpacity(1); g && g()
                                }, this); n.isLoaded ? a() : n.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); k.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () { k.markFirstDisplayed ? k.markFirstDisplayed() : k._.markFirstDisplayed() }, 0) : k.markFirstDisplayed ? k.markFirstDisplayed() :
                                        k._.markFirstDisplayed(); this._.editor.fire("panelShow", this)
                                }, 0, this)
                            }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                }, reposition: function () { var a = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a)) }, focus: function () { if (CKEDITOR.env.webkit) { var a = CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur() } (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() }, blur: function () {
                    var a =
                        this._.iframe.getFrameDocument().getActive(); a && a.is("a") && (this._.lastFocused = a)
                }, hide: function (a) {
                    if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                        this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus(); delete this._.lastFocused; this._.showBlockParams =
                            null; this._.editor.fire("panelHide", this)
                    }
                }, allowBlur: function (a) { var b = this._.panel; void 0 !== a && (b.allowBlur = a); return b.allowBlur }, showAsChild: function (a, b, c, f, h, g) {
                    if (this._.activeChild != a || a._.panel._.offsetParentId != c.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, c, f, h, g), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
                        a.element.getChild(0).$.style.cssText +=
                            ""
                    }, 100)
                }, hideChild: function (a) { var b = this._.activeChild; b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
            }
        }); CKEDITOR.on("instanceDestroyed", function () { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), b; for (b in f) { var c = f[b]; a ? c.destroy() : c.element.hide() } a && (f = {}) })
    })(); CKEDITOR.plugins.add("menu", { requires: "floatpanel", beforeInit: function (l) { for (var h = l.config.menu_groups.split(","), r = l._.menuGroups = {}, t = l._.menuItems = {}, n = 0; n < h.length; n++)r[h[n]] = n + 1; l.addMenuGroup = function (a, b) { r[a] = b || 100 }; l.addMenuItem = function (a, b) { r[b.group] && (t[a] = new CKEDITOR.menuItem(this, a, b)) }; l.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; l.getMenuItem = function (a) { return t[a] }; l.removeMenuItem = function (a) { delete t[a] } } });
    (function () {
        function l(a) { a.sort(function (a, d) { return a.group < d.group ? -1 : a.group > d.group ? 1 : a.order < d.order ? -1 : a.order > d.order ? 1 : 0 }) } var h = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (h += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (h += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); var h = h + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'), r = CKEDITOR.addTemplate("menuItem",
            h + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'), t = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
            n = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                $: function (a, b) {
                    b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var d = CKEDITOR.tools.extend({}, b.panel, { css: [CKEDITOR.skin.getPath("editor")], level: this._.level - 1, block: {} }), m = d.block.attributes = d.attributes || {}; !m.role && (m.role = "menu"); this._.panelDefinition =
                        d
                }, _: {
                    onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), d = this.editor.elementPath(), m = this._.listeners; this.removeAll(); for (var g = 0; g < m.length; g++) { var k = m[g](b, a, d); if (k) for (var e in k) { var f = this.editor.getMenuItem(e); !f || f.command && !this.editor.getCommand(f.command).state || (f.state = k[e], this.add(f)) } } }, onClick: function (a) { this.hide(); if (a.onClick) a.onClick(); else a.command && this.editor.execCommand(a.command) }, onEscape: function (a) {
                        var b = this.parent; b ? b._.panel.hideChild(1) :
                            27 == a && this.hide(1); return !1
                    }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                        var b = this._.subMenu, d = this.items[a]; if (d = d.getItems && d.getItems()) {
                            b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var m in d) { var g = this.editor.getMenuItem(m); g && (g.state = d[m], b.add(g)) } var k = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                                String(a)); setTimeout(function () { b.show(k, 2) }, 0)
                        } else this._.panel.hideChild(1)
                    }
                }, proto: {
                    add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (a, b, d, m) {
                        if (!this.parent && (this._.onShow(), !this.items.length)) return; b = b || ("rtl" == this.editor.lang.dir ? 2 : 1); var g = this.items, k = this.editor, e = this._.panel, f = this._.element; if (!e) {
                            e = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                            e.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); e.onShow = function () { e._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; e.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); f = e.addBlock(this.id, this._.panelDefinition.block); f.autoSize = !0; var c = f.keys; c[40] = "next"; c[9] = "next"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c["rtl" == k.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; c[32] = CKEDITOR.env.ie ? "mouseup" :
                                "click"; CKEDITOR.env.ie && (c[13] = "mouseup"); f = this._.element = f.element; c = f.getDocument(); c.getBody().setStyle("overflow", "hidden"); c.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, k.config.menu_subMenuDelay || 400, this, [a]) }, this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this);
                            this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                        } l(g); for (var c = k.elementPath(), c = ['\x3cdiv class\x3d"cke_menu' + (c && c.direction() != k.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], h = g.length, n = h && g[0].group, q = 0; q < h; q++) {
                            var p = g[q]; n != p.group && (c.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
                                n = p.group); p.render(this, q, c)
                        } c.push("\x3c/div\x3e"); f.setHtml(c.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(e, this.id, a, b, d, m) : e.showBlock(this.id, a, b, d, m); k.fire("menuShow", [e])
                    }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }, findItemByCommandName: function (a) {
                        var b = CKEDITOR.tools.array.filter(this.items, function (b) { return a === b.command }); return b.length ? (b = b[0], {
                            item: b,
                            element: this._.element.findOne("." + b.className)
                        }) : null
                    }
                }
            }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                $: function (a, b, d) { CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                    render: function (a, b, d) {
                        var h = a.id + String(b), g = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, k = "", e = this.editor, f, c, l = g == CKEDITOR.TRISTATE_ON ? "on" : g == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"; this.role in {
                            menuitemcheckbox: 1,
                            menuitemradio: 1
                        } && (k = ' aria-checked\x3d"' + (g == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var u = this.getItems, q = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", p = this.name; this.icon && !/\./.test(this.icon) && (p = this.icon); this.command && (f = e.getCommand(this.command), (f = e.getCommandKeystroke(f)) && (c = CKEDITOR.tools.keystrokeToString(e.lang.common.keyboard, f))); a = {
                            id: h, name: this.name, iconName: p, label: this.label, cls: this.className || "", state: l, hasPopup: u ? "true" : "false", disabled: g == CKEDITOR.TRISTATE_DISABLED,
                            title: this.label + (c ? " (" + c.display + ")" : ""), ariaShortcut: c ? e.lang.common.keyboardShortcut + " " + c.aria : "", href: "javascript:void('" + (this.label || "").replace("'") + "')", hoverFn: a._.itemOverFn, moveOutFn: a._.itemOutFn, clickFn: a._.itemClickFn, index: b, iconStyle: CKEDITOR.skin.getIconStyle(p, "rtl" == this.editor.lang.dir, p == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: c ? n.output({ shortcut: c.display }) : "", arrowHtml: u ? t.output({ label: q }) : "", role: this.role ? this.role : "menuitem", ariaChecked: k
                        }; r.output(a, d)
                    }
                }
            })
    })();
    CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div"; CKEDITOR.plugins.add("contextmenu", {
        requires: "menu", onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu, $: function (a) { this.base.call(this, a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options } } }) }, proto: {
                    addTarget: function (a, e) {
                        a.on("contextmenu", function (a) {
                            a = a.data; var c = CKEDITOR.env.webkit ? f : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!e || !c) {
                                a.preventDefault(); if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                    var c = this.editor,
                                        b = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); b && "false" == b.getAttribute("contenteditable") && c.getSelection().fake(b)
                                } var b = a.getTarget().getDocument(), d = a.getTarget().getDocument().getDocumentElement(), c = !b.equals(CKEDITOR.document), b = b.getWindow().getScrollPosition(), g = c ? a.$.clientX : a.$.pageX || b.x + a.$.clientX, h = c ? a.$.clientY : a.$.pageY || b.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(d, null, g, h) }, CKEDITOR.env.ie ?
                                    200 : 0, this)
                            }
                        }, this); if (CKEDITOR.env.webkit) { var f, d = function () { f = 0 }; a.on("keydown", function (a) { f = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on("keyup", d); a.on("contextmenu", d) }
                    }, open: function (a, e, f, d) { !1 !== this.editor.config.enableContextMenu && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, e, f, d)) }
                }
            })
        }, beforeInit: function (a) {
            var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a); a.on("contentDom", function () {
                e.addTarget(a.editable(),
                    !1 !== a.config.browserContextMenuOnCtrl)
            }); a.addCommand("contextMenu", { exec: function () { a.contextMenu.open(a.document.getBody()) } }); a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
        }
    }); CKEDITOR.plugins.add("resize", {
        init: function (b) {
            function f(d) { var e = c.width, m = c.height, f = e + (d.data.$.screenX - n.x) * ("rtl" == g ? -1 : 1); d = m + (d.data.$.screenY - n.y); h && (e = Math.max(a.resize_minWidth, Math.min(f, a.resize_maxWidth))); p && (m = Math.max(a.resize_minHeight, Math.min(d, a.resize_maxHeight))); b.resize(h ? e : null, m) } function k() {
                CKEDITOR.document.removeListener("mousemove", f); CKEDITOR.document.removeListener("mouseup", k); b.document && (b.document.removeListener("mousemove", f), b.document.removeListener("mouseup",
                    k))
            } var a = b.config, r = b.ui.spaceId("resizer"), g = b.element ? b.element.getDirection(1) : "ltr"; !a.resize_dir && (a.resize_dir = "vertical"); void 0 === a.resize_maxWidth && (a.resize_maxWidth = 3E3); void 0 === a.resize_maxHeight && (a.resize_maxHeight = 3E3); void 0 === a.resize_minWidth && (a.resize_minWidth = 750); void 0 === a.resize_minHeight && (a.resize_minHeight = 250); if (!1 !== a.resize_enabled) {
                var l = null, n, c, h = ("both" == a.resize_dir || "horizontal" == a.resize_dir) && a.resize_minWidth != a.resize_maxWidth, p = ("both" == a.resize_dir || "vertical" ==
                    a.resize_dir) && a.resize_minHeight != a.resize_maxHeight, q = CKEDITOR.tools.addFunction(function (d) { l || (l = b.getResizable()); c = { width: l.$.offsetWidth || 0, height: l.$.offsetHeight || 0 }; n = { x: d.screenX, y: d.screenY }; a.resize_minWidth > c.width && (a.resize_minWidth = c.width); a.resize_minHeight > c.height && (a.resize_minHeight = c.height); CKEDITOR.document.on("mousemove", f); CKEDITOR.document.on("mouseup", k); b.document && (b.document.on("mousemove", f), b.document.on("mouseup", k)); d.preventDefault && d.preventDefault() }); b.on("destroy",
                        function () { CKEDITOR.tools.removeFunction(q) }); b.on("uiSpace", function (a) { if ("bottom" == a.data.space) { var e = ""; h && !p && (e = " cke_resizer_horizontal"); !h && p && (e = " cke_resizer_vertical"); var c = '\x3cspan id\x3d"' + r + '" class\x3d"cke_resizer' + e + " cke_resizer_" + g + '" title\x3d"' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event)"\x3e' + ("ltr" == g ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == g && "ltr" == e ? a.data.html += c : a.data.html = c + a.data.html } }, b, null, 100); b.on("maximize",
                            function (a) { b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
            }
        }
    }); (function () {
        function q(a, c) {
            function k(b) { b = h.list[b]; var e; b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (e = a.createRange(), e.selectNodeContents(b), e = e.select()) : (e = a.getSelection(), e.selectElement(b)); CKEDITOR.env.ie && a.fire("selectionChange", { selection: e, path: new CKEDITOR.dom.elementPath(b) }); a.focus() } function l() { m && m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete h.list } var n = a.ui.spaceId("path"), m, h = a._.elementsPath, q = h.idBase; c.html += '\x3cspan id\x3d"' +
                n + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + n + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + n + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e'; a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); h.onClick = k; var v = CKEDITOR.tools.addFunction(k), w = CKEDITOR.tools.addFunction(function (b, e) {
                    var g = h.idBase, d; e = new CKEDITOR.dom.event(e); d = "rtl" == a.lang.dir; switch (e.getKeystroke()) {
                        case d ?
                            39 : 37: case 9: return (d = CKEDITOR.document.getById(g + (b + 1))) || (d = CKEDITOR.document.getById(g + "0")), d.focus(), !1; case d ? 37 : 39: case CKEDITOR.SHIFT + 9: return (d = CKEDITOR.document.getById(g + (b - 1))) || (d = CKEDITOR.document.getById(g + (h.list.length - 1))), d.focus(), !1; case 27: return a.focus(), !1; case 13: case 32: return k(b), !1
                    }return !0
                }); a.on("selectionChange", function (b) {
                    for (var e = [], g = h.list = [], d = [], c = h.filters, p = !0, k = b.data.path.elements, u = k.length; u--;) {
                        var f = k[u], r = 0; b = f.data("cke-display-name") ? f.data("cke-display-name") :
                            f.data("cke-real-element-type") ? f.data("cke-real-element-type") : f.getName(); (p = f.hasAttribute("contenteditable") ? "true" == f.getAttribute("contenteditable") : p) || f.hasAttribute("contenteditable") || (r = 1); for (var t = 0; t < c.length; t++) { var l = c[t](f, b); if (!1 === l) { r = 1; break } b = l || b } r || (g.unshift(f), d.unshift(b))
                    } g = g.length; for (c = 0; c < g; c++)b = d[c], p = a.lang.elementspath.eleTitle.replace(/%1/, b), b = x.output({ id: q + c, label: p, text: b, jsTitle: "javascript:void('" + b + "')", index: c, keyDownFn: w, clickFn: v }), e.unshift(b); m ||
                        (m = CKEDITOR.document.getById(n)); d = m; d.setHtml(e.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); a.fire("elementsPathUpdate", { space: d })
                }); a.on("readOnly", l); a.on("contentDomUnload", l); a.addCommand("elementsPathFocus", y.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        } var y = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }, c = ""; CKEDITOR.env.gecko &&
            CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (c += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var x = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + c + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
        CKEDITOR.plugins.add("elementspath", { init: function (a) { a._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; a.on("uiSpace", function (c) { "bottom" == c.data.space && q(a, c.data) }) } })
    })(); (function () {
        function q(b, d, a) { a = b.config.forceEnterMode || a; if ("wysiwyg" == b.mode) { d || (d = b.activeEnterMode); var h = b.elementPath(); h && !h.isContextFor("p") && (d = CKEDITOR.ENTER_BR, a = 1); b.fire("saveSnapshot"); d == CKEDITOR.ENTER_BR ? t(b, d, null, a) : u(b, d, null, a); b.fire("saveSnapshot") } } function v(b) { b = b.getSelection().getRanges(!0); for (var d = b.length - 1; 0 < d; d--)b[d].deleteContents(); return b[0] } function y(b) {
            var d = b.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") },
                !0); if (b.root.equals(d)) return b; d = new CKEDITOR.dom.range(d); d.moveToRange(b); return d
        } CKEDITOR.plugins.add("enterkey", { init: function (b) { b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { q(b) } }); b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { q(b, b.activeShiftEnterMode, 1) } }); b.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]]) } }); var z = CKEDITOR.dom.walker.whitespaces(), A = CKEDITOR.dom.walker.bookmark(); CKEDITOR.plugins.enterkey = {
            enterBlock: function (b,
                d, a, h) {
                if (a = a || v(b)) {
                    a = y(a); var f = a.document, k = a.checkStartOfBlock(), m = a.checkEndOfBlock(), l = b.elementPath(a.startContainer), c = l.block, n = d == CKEDITOR.ENTER_DIV ? "div" : "p", e; if (k && m) {
                        if (c && (c.is("li") || c.getParent().is("li"))) {
                            c.is("li") || (c = c.getParent()); a = c.getParent(); e = a.getParent(); h = !c.hasPrevious(); var p = !c.hasNext(), n = b.getSelection(), g = n.createBookmarks(), k = c.getDirection(1), m = c.getAttribute("class"), r = c.getAttribute("style"), q = e.getDirection(1) != k; b = b.enterMode != CKEDITOR.ENTER_BR || q || r || m;
                            if (e.is("li")) h || p ? (h && p && a.remove(), c[p ? "insertAfter" : "insertBefore"](e)) : c.breakParent(e); else {
                                if (b) if (l.block.is("li") ? (e = f.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"), q && e.setAttribute("dir", k), r && e.setAttribute("style", r), m && e.setAttribute("class", m), c.moveChildren(e)) : e = l.block, h || p) e[h ? "insertBefore" : "insertAfter"](a); else c.breakParent(a), e.insertAfter(a); else if (c.appendBogus(!0), h || p) for (; f = c[h ? "getFirst" : "getLast"]();)f[h ? "insertBefore" : "insertAfter"](a); else for (c.breakParent(a); f = c.getLast();)f.insertAfter(a);
                                c.remove()
                            } n.selectBookmarks(g); return
                        } if (c && c.getParent().is("blockquote")) { c.breakParent(c.getParent()); c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove(); c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove(); a.moveToElementEditStart(c); a.select(); return }
                    } else if (c && c.is("pre") && !m) { t(b, d, a, h); return } if (k = a.splitBlock(n)) {
                        d = k.previousBlock; c = k.nextBlock; l = k.wasStartOfBlock; b = k.wasEndOfBlock; c ? (g = c.getParent(), g.is("li") && (c.breakParent(g),
                            c.move(c.getNext(), 1))) : d && (g = d.getParent()) && g.is("li") && (d.breakParent(g), g = d.getNext(), a.moveToElementEditStart(g), d.move(d.getPrevious())); if (l || b) {
                                if (d) { if (d.is("li") || !w.test(d.getName()) && !d.is("pre")) e = d.clone() } else c && (e = c.clone()); e ? h && !e.is("li") && e.renameNode(n) : g && g.is("li") ? e = g : (e = f.createElement(n), d && (p = d.getDirection()) && e.setAttribute("dir", p)); if (f = k.elementPath) for (h = 0, n = f.elements.length; h < n; h++) {
                                    g = f.elements[h]; if (g.equals(f.block) || g.equals(f.blockLimit)) break; CKEDITOR.dtd.$removeEmpty[g.getName()] &&
                                        (g = g.clone(), e.moveChildren(g), e.append(g))
                                } e.appendBogus(); e.getParent() || a.insertNode(e); e.is("li") && e.removeAttribute("value"); !CKEDITOR.env.ie || !l || b && d.getChildCount() || (a.moveToElementEditStart(b ? d : e), a.select()); a.moveToElementEditStart(l && !b ? c : e)
                            } else c.is("li") && (e = a.clone(), e.selectNodeContents(c), e = new CKEDITOR.dom.walker(e), e.evaluator = function (a) { return !(A(a) || z(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) }, (g = e.next()) &&
                                g.type == CKEDITOR.NODE_ELEMENT && g.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? f.createElement("br") : f.createText(" ")).insertBefore(g)), c && a.moveToElementEditStart(c); a.select(); a.scrollIntoView()
                    }
                }
            }, enterBr: function (b, d, a, h) {
                if (a = a || v(b)) {
                    var f = a.document, k = a.checkEndOfBlock(), m = new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()), l = m.block, c = l && m.block.getName(); h || "li" != c ? (!h && k && w.test(c) ? (k = l.getDirection()) ? (f = f.createElement("div"), f.setAttribute("dir", k), f.insertAfter(l), a.setStart(f,
                        0)) : (f.createElement("br").insertAfter(l), CKEDITOR.env.gecko && f.createText("").insertAfter(l), a.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (b = "pre" == c && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), a.deleteContents(), a.insertNode(b), CKEDITOR.env.needsBrFiller ? (f.createText("﻿").insertAfter(b), k && (l || m.blockLimit).appendBogus(), b.getNext().$.nodeValue = "", a.setStartAt(b.getNext(), CKEDITOR.POSITION_AFTER_START)) :
                            a.setStartAt(b, CKEDITOR.POSITION_AFTER_END)), a.collapse(!0), a.select(), a.scrollIntoView()) : u(b, d, a, h)
                }
            }
        }; var x = CKEDITOR.plugins.enterkey, t = x.enterBr, u = x.enterBlock, w = /^h[1-6]$/
    })(); (function () {
        function k(b, f) { var g = {}, c = [], e = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' }; b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (b, a) { var d = f ? "\x26" + a + ";" : e[a]; g[d] = f ? e[a] : "\x26" + a + ";"; c.push(d); return "" }); if (!f && b) { b = b.split(","); var a = document.createElement("div"), d; a.innerHTML = "\x26" + b.join(";\x26") + ";"; d = a.innerHTML; a = null; for (a = 0; a < d.length; a++) { var h = d.charAt(a); g[h] = "\x26" + b[a] + ";"; c.push(h) } } g.regex = c.join(f ? "|" : ""); return g } CKEDITOR.plugins.add("entities",
            {
                afterInit: function (b) {
                    function f(a) { return h[a] } function g(b) { return "force" != c.entities_processNumerical && a[b] ? a[b] : "\x26#" + b.charCodeAt(0) + ";" } var c = b.config; if (b = (b = b.dataProcessor) && b.htmlFilter) {
                        var e = []; !1 !== c.basicEntities && e.push("nbsp,gt,lt,amp"); c.entities && (e.length && e.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                            c.entities_latin && e.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), c.entities_greek && e.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                            c.entities_additional && e.push(c.entities_additional)); var a = k(e.join(",")), d = a.regex ? "[" + a.regex + "]" : "a^"; delete a.regex; c.entities && c.entities_processNumerical && (d = "[^ -~]|" + d); var d = new RegExp(d, "g"), h = k("nbsp,gt,lt,amp,shy", !0), l = new RegExp(h.regex, "g"); b.addRules({ text: function (a) { return a.replace(l, f).replace(d, g) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                    }
                }
            })
    })(); CKEDITOR.config.basicEntities = !0; CKEDITOR.config.entities = !0; CKEDITOR.config.entities_latin = !0; CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39"; CKEDITOR.plugins.add("htmlwriter", { init: function (b) { var a = new CKEDITOR.htmlWriter; a.forceSimpleAmpersand = b.config.forceSimpleAmpersand; a.indentationChars = b.config.dataIndentationChars || "\t"; b.dataProcessor.writer = a } });
    CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var b = CKEDITOR.dtd, a; for (a in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent)) this.setRules(a, {
                indent: !b[a]["#"], breakBeforeOpen: 1, breakBeforeClose: !b[a]["#"], breakAfterClose: 1, needsSpace: a in
                    b.$block && !(a in { li: 1, dt: 1, dd: 1 })
            }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
        }, proto: {
            openTag: function (b) { var a = this._.rules[b]; this._.afterCloser && a && a.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ? this.indentation() : a && a.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", b); this._.afterCloser = 0 },
            openTagClose: function (b, a) { var c = this._.rules[b]; a ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) : (this._.output.push("\x3e"), c && c.indent && (this._.indentation += this.indentationChars)); c && c.breakAfterOpen && this.lineBreak(); "pre" == b && (this._.inPre = 1) }, attribute: function (b, a) { "string" == typeof a && (this.forceSimpleAmpersand && (a = a.replace(/&amp;/g, "\x26")), a = CKEDITOR.tools.htmlEncodeAttr(a)); this._.output.push(" ", b, '\x3d"', a, '"') }, closeTag: function (b) {
                var a =
                    this._.rules[b]; a && a.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : a && a.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push("\x3c/", b, "\x3e"); "pre" == b && (this._.inPre = 0); a && a.breakAfterClose && (this.lineBreak(), this._.needsSpace = a.needsSpace); this._.afterCloser = 1
            }, text: function (b) { this._.indent && (this.indentation(), !this._.inPre && (b = CKEDITOR.tools.ltrim(b))); this._.output.push(b) }, comment: function (b) {
                this._.indent &&
                    this.indentation(); this._.output.push("\x3c!--", b, "--\x3e")
            }, lineBreak: function () { !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent = 1 }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () { this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser = 0; this._.inPre = 0; this._.needsSpace = 0 }, setRules: function (b, a) {
                var c = this._.rules[b]; c ? CKEDITOR.tools.extend(c, a, !0) : this._.rules[b] =
                    a
            }
        }
    }); (function () {
        function m(a) {
            function f(a) { var b = !1; g.attachListener(g, "keydown", function () { var d = c.getBody().getElementsByTag(a); if (!b) { for (var e = 0; e < d.count(); e++)d.getItem(e).setCustomData("retain", !0); b = !0 } }, null, null, 1); g.attachListener(g, "keyup", function () { var d = c.getElementsByTag(a); b && (1 == d.count() && !d.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(d.getItem(0).getAttributes()) && d.getItem(0).remove(1), b = !1) }) } var b = this.editor, c = a.document, d = c.body, e = c.getElementById("cke_actscrpt");
            e && e.parentNode.removeChild(e); (e = c.getElementById("cke_shimscrpt")) && e.parentNode.removeChild(e); (e = c.getElementById("cke_basetagscrpt")) && e.parentNode.removeChild(e); d.contentEditable = !0; CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = d; c = new CKEDITOR.dom.document(c); this.setup(); this.fixInitialSelection(); var g = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && c.getDocumentElement().addClass(c.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge &&
                b.enterMode != CKEDITOR.ENTER_P ? f("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && b.enterMode != CKEDITOR.ENTER_DIV && f("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) c.getDocumentElement().on("mousedown", function (a) { a.data.getTarget().is("html") && setTimeout(function () { b.editable().focus() }) }); n(b); try { b.document.$.execCommand("2D-position", !1, !0) } catch (h) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == b.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                    var c =
                        a.data.getKeystroke(); if (33 == c || 34 == c) if (CKEDITOR.env.ie) setTimeout(function () { b.getSelection().scrollIntoView() }, 0); else if (b.window.$.innerHeight > this.$.offsetHeight) { var d = b.createRange(); d[33 == c ? "moveToElementEditStart" : "moveToElementEditEnd"](this); d.select(); a.data.preventDefault() }
                }); CKEDITOR.env.ie && this.attachListener(c, "blur", function () { try { c.$.selection.empty() } catch (a) { } }); CKEDITOR.env.iOS && this.attachListener(c, "touchend", function () { a.focus() }); d = b.document.getElementsByTag("title").getItem(0);
            d.data("cke-title", d.getText()); CKEDITOR.env.ie && (b.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () { "unloaded" == this.status && (this.status = "ready"); b.fire("contentDom"); this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1); setTimeout(function () { b.fire("dataReady") }, 0) }, 0, this)
        } function n(a) {
            function f() {
                var c; a.editable().attachListener(a, "selectionChange", function () {
                    var d = a.getSelection().getSelectedElement(); d && (c && (c.detachEvent("onresizestart", b), c = null), d.$.attachEvent("onresizestart",
                        b), c = d.$)
                })
            } function b(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try { var c = a.document.$; c.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing); c.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles) } catch (d) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && f(a)
        } function p() {
            var a = []; if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}"); var f = [], b; for (b in CKEDITOR.dtd.$removeEmpty) f.push("html.CSS1Compat " +
                    b + "[contenteditable\x3dfalse]"); a.push(f.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")); a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
        } var l; CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                }); a.addMode("wysiwyg", function (f) {
                    function b(b) { b && b.removeListener(); a.editable(new l(a, d.$.contentWindow.document.body)); a.setData(a.getData(1), f) } var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(c) + "}())" : "", d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
                    d.setStyles({ width: "100%", height: "100%" }); d.addClass("cke_wysiwyg_frame").addClass("cke_reset"); c = a.ui.space("contents"); c.append(d); var e = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (e) d.on("load", b); var g = a.title, h = a.fire("ariaEditorHelpLabel", {}).label; g && (CKEDITOR.env.ie && h && (g += ", " + h), d.setAttribute("title", g)); if (h) {
                        var g = CKEDITOR.tools.getNextId(), k = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + h + "\x3c/span\x3e"); c.append(k, 1); d.setAttribute("aria-describedby",
                            g)
                    } a.on("beforeModeUnload", function (a) { a.removeListener(); k && k.remove() }); d.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" }); !e && b(); a.fire("ariaWidget", d)
                })
            }
        }); CKEDITOR.editor.prototype.addContentsCss = function (a) { var f = this.config, b = f.contentsCss; CKEDITOR.tools.isArray(b) || (f.contentsCss = b ? [b] : []); f.contentsCss.push(a) }; l = CKEDITOR.tools.createClass({
            $: function () {
                this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (a) {
                    CKEDITOR.tools.setTimeout(m,
                        0, this, a)
                }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            }, base: CKEDITOR.editable, proto: {
                setData: function (a, f) {
                    var b = this.editor; if (f) this.setHtml(a), this.fixInitialSelection(), b.fire("dataReady"); else {
                        this._.isLoadingData = !0; b._.dataStore = { id: 1 }; var c = b.config, d = c.fullPage, e = c.docType, g = CKEDITOR.tools.buildStyleHtml(p()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); d || (g += CKEDITOR.tools.buildStyleHtml(b.config.contentsCss)); var h = c.baseHref ? '\x3cbase href\x3d"' +
                            c.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) { b.docType = e = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { b.xmlDeclaration = a; return "" })); a = b.dataProcessor.toHtml(a); d ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
                                h && (a = a.replace(/<head[^>]*?>/, "$\x26" + h)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a = e + a) : a = c.docType + '\x3chtml dir\x3d"' + c.contentsLangDirection + '" lang\x3d"' + (c.contentsLanguage || b.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + h + g + "\x3c/head\x3e\x3cbody" + (c.bodyId ? ' id\x3d"' + c.bodyId + '"' : "") + (c.bodyClass ? ' class\x3d"' + c.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version &&
                                    (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e"))); c = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                        h && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e'); a = a.replace(/(?=\s*<\/(:?head)>)/, c); this.clearCustomData(); this.clearListeners(); b.fire("contentDomUnload"); var k = this.getDocument(); try { k.write(a) } catch (l) { setTimeout(function () { k.write(a) }, 0) }
                    }
                }, getData: function (a) {
                    if (a) return this.getHtml(); a = this.editor; var f = a.config, b = f.fullPage, c = b && a.docType, d = b && a.xmlDeclaration,
                        e = this.getDocument(), b = b ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml(); CKEDITOR.env.gecko && f.enterMode != CKEDITOR.ENTER_BR && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, "")); b = a.dataProcessor.toDataFormat(b); d && (b = d + "\n" + b); c && (b = c + "\n" + b); return b
                }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : l.baseProto.focus.call(this) }, detach: function () {
                    var a = this.editor, f = a.document, b; try { b = a.window.getFrame() } catch (c) { } l.baseProto.detach.call(this); this.clearCustomData(); f.getDocumentElement().clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); b && b.getParent() ? (b.clearCustomData(), (a = b.removeCustomData("onResize")) && a.removeListener(), b.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                }
            }
        })
    })(); CKEDITOR.config.disableObjectResizing = !1; CKEDITOR.config.disableNativeTableHandles = !0; CKEDITOR.config.disableNativeSpellChecker = !0; (function () {
        function e(b, a) { a || (a = b.getSelection().getSelectedElement()); if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly()) return a } function f(b) { var a = b.getStyle("float"); if ("inherit" == a || "none" == a) a = 0; a || (a = b.getAttribute("align")); return a } CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (b) {
                if (!b.plugins.image2) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); b.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: a, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); b.ui.addButton && b.ui.addButton("Image", { label: b.lang.common.image, command: "image", toolbar: "insert,10" }); b.on("doubleclick", function (b) {
                        var a =
                            b.data.element; !a.is("img") || a.data("cke-realelement") || a.isReadOnly() || (b.data.dialog = "image")
                    }); b.addMenuItems && b.addMenuItems({ image: { label: b.lang.image.menu, command: "image", group: "image" } }); b.contextMenu && b.contextMenu.addListener(function (a) { if (e(b, a)) return { image: CKEDITOR.TRISTATE_OFF } })
                }
            }, afterInit: function (b) {
                function a(a) {
                    var d = b.getCommand("justify" + a); if (d) {
                        if ("left" == a || "right" == a) d.on("exec", function (d) {
                            var c = e(b), g; c && (g = f(c), g == a ? (c.removeStyle("float"), a == f(c) && c.removeAttribute("align")) :
                                c.setStyle("float", a), d.cancel())
                        }); d.on("refresh", function (d) { var c = e(b); c && (c = f(c), this.setState(c == a ? CKEDITOR.TRISTATE_ON : "right" == a || "left" == a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), d.cancel()) })
                    }
                } b.plugins.image2 || (a("left"), a("right"), a("center"), a("block"))
            }
        })
    })(); CKEDITOR.config.image_removeLinkByEmptyURL = !0; (function () {
        function m(a, b) { var e, f; b.on("refresh", function (a) { var b = [k], c; for (c in a.data.states) b.push(a.data.states[c]); this.setState(CKEDITOR.tools.search(b, p) ? p : k) }, b, null, 100); b.on("exec", function (b) { e = a.getSelection(); f = e.createBookmarks(1); b.data || (b.data = {}); b.data.done = !1 }, b, null, 0); b.on("exec", function () { a.forceNextSelectionCheck(); e.selectBookmarks(f) }, b, null, 100) } var k = CKEDITOR.TRISTATE_DISABLED, p = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
            init: function (a) {
                var b = CKEDITOR.plugins.indent.genericDefinition;
                m(a, a.addCommand("indent", new b(!0))); m(a, a.addCommand("outdent", new b)); a.ui.addButton && (a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" })); a.on("dirChanged", function (b) {
                    var f = a.createRange(), l = b.data.node; f.setStartBefore(l); f.setEndAfter(l); for (var n = new CKEDITOR.dom.walker(f), c; c = n.next();)if (c.type == CKEDITOR.NODE_ELEMENT) if (!c.equals(l) &&
                        c.getDirection()) f.setStartAfter(c), n = new CKEDITOR.dom.walker(f); else { var d = a.config.indentClasses; if (d) for (var g = "ltr" == b.data.dir ? ["_rtl", ""] : ["", "_rtl"], h = 0; h < d.length; h++)c.hasClass(d[h] + g[0]) && (c.removeClass(d[h] + g[0]), c.addClass(d[h] + g[1])); d = c.getStyle("margin-right"); g = c.getStyle("margin-left"); d ? c.setStyle("margin-left", d) : c.removeStyle("margin-left"); g ? c.setStyle("margin-right", g) : c.removeStyle("margin-right") }
                })
            }
        }); CKEDITOR.plugins.indent = {
            genericDefinition: function (a) {
                this.isIndent = !!a;
                this.startDisabled = !this.isIndent
            }, specificDefinition: function (a, b, e) { this.name = b; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!e; this.relatedGlobal = e ? "indent" : "outdent"; this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9; this.database = {} }, registerCommands: function (a, b) {
                a.on("pluginsLoaded", function () {
                    for (var a in b) (function (a, b) {
                        var e = a.getCommand(b.relatedGlobal), c; for (c in b.jobs) e.on("exec", function (d) {
                            d.data.done || (a.fire("lockSnapshot"), b.execJob(a, c) && (d.data.done =
                                !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
                        }, this, null, c), e.on("refresh", function (d) { d.data.states || (d.data.states = {}); d.data.states[b.name + "@" + c] = b.refreshJob(a, c, d.data.path) }, this, null, c); a.addFeature(b)
                    })(this, b[a])
                })
            }
        }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function (a, b) { var e = this.jobs[b]; if (e.state != k) return e.exec.call(this, a) }, refreshJob: function (a,
                b, e) { b = this.jobs[b]; a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, e) : b.state = k; return b.state }, getContext: function (a) { return a.contains(this.context) }
        }
    })(); (function () {
        function w(f) {
            function g(b) {
                for (var e = c.startContainer, a = c.endContainer; e && !e.getParent().equals(b);)e = e.getParent(); for (; a && !a.getParent().equals(b);)a = a.getParent(); if (!e || !a) return !1; for (var d = [], h = !1; !h;)e.equals(a) && (h = !0), d.push(e), e = e.getNext(); if (1 > d.length) return !1; e = b.getParents(!0); for (a = 0; a < e.length; a++)if (e[a].getName && p[e[a].getName()]) { b = e[a]; break } for (var e = k.isIndent ? 1 : -1, a = d[0], d = d[d.length - 1], h = CKEDITOR.plugins.list.listToArray(b, q), m = h[d.getCustomData("listarray_index")].indent,
                    a = a.getCustomData("listarray_index"); a <= d.getCustomData("listarray_index"); a++)if (h[a].indent += e, 0 < e) { for (var g = h[a].parent, n = a - 1; 0 <= n; n--)if (h[n].indent === e) { g = h[n].parent; break } h[a].parent = new CKEDITOR.dom.element(g.getName(), g.getDocument()) } for (a = d.getCustomData("listarray_index") + 1; a < h.length && h[a].indent > m; a++)h[a].indent += e; e = CKEDITOR.plugins.list.arrayToList(h, q, null, f.config.enterMode, b.getDirection()); if (!k.isIndent) {
                        var t; if ((t = b.getParent()) && t.is("li")) for (var d = e.listNode.getChildren(),
                            r = [], l, a = d.count() - 1; 0 <= a; a--)(l = d.getItem(a)) && l.is && l.is("li") && r.push(l)
                    } e && e.listNode.replace(b); if (r && r.length) for (a = 0; a < r.length; a++) { for (l = b = r[a]; (l = l.getNext()) && l.is && l.getName() in p;)CKEDITOR.env.needsNbspFiller && !b.getFirst(x) && b.append(c.document.createText(" ")), b.append(l); b.insertAfter(t) } e && f.fire("contentDomInvalidated"); return !0
            } for (var k = this, q = this.database, p = this.context, c, m = f.getSelection(), m = (m && m.getRanges()).createIterator(); c = m.getNextRange();) {
                for (var b = c.getCommonAncestor(); b &&
                    (b.type != CKEDITOR.NODE_ELEMENT || !p[b.getName()]);) { if (f.editable().equals(b)) { b = !1; break } b = b.getParent() } b || (b = c.startPath().contains(p)) && c.setEndAt(b, CKEDITOR.POSITION_BEFORE_END); if (!b) { var d = c.getEnclosedNode(); d && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in p && (c.setStartAt(d, CKEDITOR.POSITION_AFTER_START), c.setEndAt(d, CKEDITOR.POSITION_BEFORE_END), b = d) } b && c.startContainer.type == CKEDITOR.NODE_ELEMENT && c.startContainer.getName() in p && (d = new CKEDITOR.dom.walker(c), d.evaluator = n, c.startContainer =
                        d.next()); b && c.endContainer.type == CKEDITOR.NODE_ELEMENT && c.endContainer.getName() in p && (d = new CKEDITOR.dom.walker(c), d.evaluator = n, c.endContainer = d.previous()); if (b) return g(b)
            } return 0
        } function n(f) { return f.type == CKEDITOR.NODE_ELEMENT && f.is("li") } function x(f) { return y(f) && z(f) } var y = CKEDITOR.dom.walker.whitespaces(!0), z = CKEDITOR.dom.walker.bookmark(!1, !0), u = CKEDITOR.TRISTATE_DISABLED, v = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
            requires: "indent", init: function (f) {
                function g(f) {
                    k.specificDefinition.apply(this,
                        arguments); this.requiredContent = ["ul", "ol"]; f.on("key", function (g) { var c = f.elementPath(); if ("wysiwyg" == f.mode && g.data.keyCode == this.indentKey && c) { var m = this.getContext(c); !m || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, m) || (f.execCommand(this.relatedGlobal), g.cancel()) } }, this); this.jobs[this.isIndent ? 10 : 30] = {
                            refresh: this.isIndent ? function (f, c) { var g = this.getContext(c), b = CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, g); return g && this.isIndent && !b ? v : u } : function (f,
                                c) { return !this.getContext(c) || this.isIndent ? u : v }, exec: CKEDITOR.tools.bind(w, this)
                        }
                } var k = CKEDITOR.plugins.indent; k.registerCommands(f, { indentlist: new g(f, "indentlist", !0), outdentlist: new g(f, "outdentlist") }); CKEDITOR.tools.extend(g.prototype, k.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
            }
        }); CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (f, g, k) { var q = g.contains(n); k || (k = g.contains(f)); return k && q && q.equals(k.getFirst(n)) }
    })(); (function () {
        function I(b, m, e) {
            function c(c) { if (!(!(a = d[c ? "getFirst" : "getLast"]()) || a.is && a.isBlockBoundary() || !(p = m.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || p.is && p.isBlockBoundary({ br: 1 }))) b.document.createElement("br")[c ? "insertBefore" : "insertAfter"](a) } for (var f = CKEDITOR.plugins.list.listToArray(m.root, e), g = [], k = 0; k < m.contents.length; k++) {
                var h = m.contents[k]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e,
                    h, "list_item_processed", !0))
            } h = null; for (k = 0; k < g.length; k++)h = g[k].getCustomData("listarray_index"), f[h].indent = -1; for (k = h + 1; k < f.length; k++)if (f[k].indent > f[k - 1].indent + 1) { g = f[k - 1].indent + 1 - f[k].indent; for (h = f[k].indent; f[k] && f[k].indent >= h;)f[k].indent += g, k++; k-- } var d = CKEDITOR.plugins.list.arrayToList(f, e, null, b.config.enterMode, m.root.getAttribute("dir")).listNode, a, p; c(!0); c(); d.replace(m.root); b.fire("contentDomInvalidated")
        } function B(b, m) {
            this.name = b; this.context = this.type = m; this.allowedContent =
                m + " li"; this.requiredContent = m
        } function E(b, m, e, c) { for (var f, g; f = b[c ? "getLast" : "getFirst"](J);)(g = f.getDirection(1)) !== m.getDirection(1) && f.setAttribute("dir", g), f.remove(), e ? f[c ? "insertBefore" : "insertAfter"](e) : m.append(f, c) } function F(b) { function m(e) { var c = b[e ? "getPrevious" : "getNext"](u); c && c.type == CKEDITOR.NODE_ELEMENT && c.is(b.getName()) && (E(b, c, null, !e), b.remove(), b = c) } m(); m(1) } function G(b) {
            return b.type == CKEDITOR.NODE_ELEMENT && (b.getName() in CKEDITOR.dtd.$block || b.getName() in CKEDITOR.dtd.$listItem) &&
                CKEDITOR.dtd[b.getName()]["#"]
        } function C(b, m, e) {
            b.fire("saveSnapshot"); e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); var c = e.extractContents(); m.trim(!1, !0); var f = m.createBookmark(), g = new CKEDITOR.dom.elementPath(m.startContainer), k = g.block, g = g.lastElement.getAscendant("li", 1) || k, h = new CKEDITOR.dom.elementPath(e.startContainer), d = h.contains(CKEDITOR.dtd.$listItem), h = h.contains(CKEDITOR.dtd.$list); k ? (k = k.getBogus()) && k.remove() : h && (k = h.getPrevious(u)) && z(k) && k.remove(); (k = c.getLast()) && k.type == CKEDITOR.NODE_ELEMENT &&
                k.is("br") && k.remove(); (k = m.startContainer.getChild(m.startOffset)) ? c.insertBefore(k) : m.startContainer.append(c); d && (c = A(d)) && (g.contains(d) ? (E(c, d.getParent(), d), c.remove()) : g.append(c)); for (; e.checkStartOfBlock() && e.checkEndOfBlock();) { h = e.startPath(); c = h.block; if (!c) break; c.is("li") && (g = c.getParent(), c.equals(g.getLast(u)) && c.equals(g.getFirst(u)) && (c = g)); e.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START); c.remove() } e = e.clone(); c = b.editable(); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e);
            e.evaluator = function (a) { return u(a) && !z(a) }; (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && F(e); m.moveToBookmark(f); m.select(); b.fire("saveSnapshot")
        } function A(b) { return (b = b.getLast(u)) && b.type == CKEDITOR.NODE_ELEMENT && b.getName() in v ? b : null } var v = { ol: 1, ul: 1 }, K = CKEDITOR.dom.walker.whitespaces(), H = CKEDITOR.dom.walker.bookmark(), u = function (b) { return !(K(b) || H(b)) }, z = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
            listToArray: function (b, m, e, c, f) {
                if (!v[b.getName()]) return [];
                c || (c = 0); e || (e = []); for (var g = 0, k = b.getChildCount(); g < k; g++) {
                    var h = b.getChild(g); h.type == CKEDITOR.NODE_ELEMENT && h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, m, e, c + 1); if ("li" == h.$.nodeName.toLowerCase()) {
                        var d = { parent: b, indent: c, element: h, contents: [] }; f ? d.grandparent = f : (d.grandparent = b.getParent(), d.grandparent && "li" == d.grandparent.$.nodeName.toLowerCase() && (d.grandparent = d.grandparent.getParent())); m && CKEDITOR.dom.element.setMarker(m, h, "listarray_index", e.length); e.push(d);
                        for (var a = 0, p = h.getChildCount(), l; a < p; a++)l = h.getChild(a), l.type == CKEDITOR.NODE_ELEMENT && v[l.getName()] ? CKEDITOR.plugins.list.listToArray(l, m, e, c + 1, d.grandparent) : d.contents.push(l)
                    }
                } return e
            }, arrayToList: function (b, m, e, c, f) {
                e || (e = 0); if (!b || b.length < e + 1) return null; for (var g, k = b[e].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(k), d = null, a = e, p = Math.max(b[e].indent, 0), l = null, q, n, t = c == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var r = b[a]; g = r.grandparent; q = r.element.getDirection(1); if (r.indent == p) {
                        d && b[a].parent.getName() ==
                            d.getName() || (d = b[a].parent.clone(!1, 1), f && d.setAttribute("dir", f), h.append(d)); l = d.append(r.element.clone(0, 1)); q != d.getDirection(1) && l.setAttribute("dir", q); for (g = 0; g < r.contents.length; g++)l.append(r.contents[g].clone(1, 1)); a++
                    } else if (r.indent == Math.max(p, 0) + 1) r = b[a - 1].element.getDirection(1), a = CKEDITOR.plugins.list.arrayToList(b, null, a, c, r != q ? q : null), !l.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= k.$.documentMode && l.append(k.createText(" ")), l.append(a.listNode), a = a.nextIndex; else if (-1 ==
                        r.indent && !e && g) {
                        v[g.getName()] ? (l = r.element.clone(!1, !0), q != g.getDirection(1) && l.setAttribute("dir", q)) : l = new CKEDITOR.dom.documentFragment(k); var d = g.getDirection(1) != q, y = r.element, D = y.getAttribute("class"), z = y.getAttribute("style"), A = l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (c != CKEDITOR.ENTER_BR || d || z || D), w, B = r.contents.length, x; for (g = 0; g < B; g++)if (w = r.contents[g], H(w) && 1 < B) A ? x = w.clone(1, 1) : l.append(w.clone(1, 1)); else if (w.type == CKEDITOR.NODE_ELEMENT && w.isBlockBoundary()) {
                            d && !w.getDirection() &&
                                w.setAttribute("dir", q); n = w; var C = y.getAttribute("style"); C && n.setAttribute("style", C.replace(/([^;])$/, "$1;") + (n.getAttribute("style") || "")); D && w.addClass(D); n = null; x && (l.append(x), x = null); l.append(w.clone(1, 1))
                        } else A ? (n || (n = k.createElement(t), l.append(n), d && n.setAttribute("dir", q)), z && n.setAttribute("style", z), D && n.setAttribute("class", D), x && (n.append(x), x = null), n.append(w.clone(1, 1))) : l.append(w.clone(1, 1)); x && ((n || l).append(x), x = null); l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && a != b.length - 1 && (CKEDITOR.env.needsBrFiller &&
                            (q = l.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && q.is("br") && q.remove(), (q = l.getLast(u)) && q.type == CKEDITOR.NODE_ELEMENT && q.is(CKEDITOR.dtd.$block) || l.append(k.createElement("br"))); q = l.$.nodeName.toLowerCase(); "div" != q && "p" != q || l.appendBogus(); h.append(l); d = null; a++
                    } else return null; n = null; if (b.length <= a || Math.max(b[a].indent, 0) < p) break
                } if (m) for (b = h.getFirst(); b;) {
                    if (b.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(m, b), b.getName() in CKEDITOR.dtd.$listItem && (e = b, k = f = c = void 0, c = e.getDirection()))) {
                        for (f =
                            e.getParent(); f && !(k = f.getDirection());)f = f.getParent(); c == k && e.removeAttribute("dir")
                    } b = b.getNextSourceNode()
                } return { listNode: h, nextIndex: a }
            }
        }; var L = /^h[1-6]$/, J = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); B.prototype = {
            exec: function (b) {
                this.refresh(b, b.elementPath()); var m = b.config, e = b.getSelection(), c = e && e.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var f = b.editable(); if (f.getFirst(u)) { var g = 1 == c.length && c[0]; (m = g && g.getEnclosedNode()) && m.is && this.type == m.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else m.enterMode ==
                        CKEDITOR.ENTER_BR ? f.appendBogus() : c[0].fixBlock(1, m.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), e.selectRanges(c)
                } for (var m = e.createBookmarks(!0), f = [], k = {}, c = c.createIterator(), h = 0; (g = c.getNextRange()) && ++h;) {
                    var d = g.getBoundaryNodes(), a = d.startNode, p = d.endNode; a.type == CKEDITOR.NODE_ELEMENT && "td" == a.getName() && g.setStartAt(d.startNode, CKEDITOR.POSITION_AFTER_START); p.type == CKEDITOR.NODE_ELEMENT && "td" == p.getName() && g.setEndAt(d.endNode, CKEDITOR.POSITION_BEFORE_END); g = g.createIterator(); for (g.forceBrBreak =
                        this.state == CKEDITOR.TRISTATE_OFF; d = g.getNextParagraph();)if (!d.getCustomData("list_block")) {
                            CKEDITOR.dom.element.setMarker(k, d, "list_block", 1); for (var l = b.elementPath(d), a = l.elements, p = 0, l = l.blockLimit, q, n = a.length - 1; 0 <= n && (q = a[n]); n--)if (v[q.getName()] && l.contains(q)) { l.removeCustomData("list_group_object_" + h); (a = q.getCustomData("list_group_object")) ? a.contents.push(d) : (a = { root: q, contents: [d] }, f.push(a), CKEDITOR.dom.element.setMarker(k, q, "list_group_object", a)); p = 1; break } p || (p = l, p.getCustomData("list_group_object_" +
                                h) ? p.getCustomData("list_group_object_" + h).contents.push(d) : (a = { root: p, contents: [d] }, CKEDITOR.dom.element.setMarker(k, p, "list_group_object_" + h, a), f.push(a)))
                        }
                } for (q = []; 0 < f.length;)if (a = f.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (v[a.root.getName()]) {
                    c = b; h = a; a = k; g = q; p = CKEDITOR.plugins.list.listToArray(h.root, a); l = []; for (d = 0; d < h.contents.length; d++)n = h.contents[d], (n = n.getAscendant("li", !0)) && !n.getCustomData("list_item_processed") && (l.push(n), CKEDITOR.dom.element.setMarker(a, n, "list_item_processed",
                        !0)); for (var n = h.root.getDocument(), t = void 0, r = void 0, d = 0; d < l.length; d++) { var y = l[d].getCustomData("listarray_index"), t = p[y].parent; t.is(this.type) || (r = n.createElement(this.type), t.copyAttributes(r, { start: 1, type: 1 }), r.removeStyle("list-style-type"), p[y].parent = r) } a = CKEDITOR.plugins.list.arrayToList(p, a, null, c.config.enterMode); p = void 0; l = a.listNode.getChildCount(); for (d = 0; d < l && (p = a.listNode.getChild(d)); d++)p.getName() == this.type && g.push(p); a.listNode.replace(h.root); c.fire("contentDomInvalidated")
                } else {
                    p =
                        b; g = a; d = q; l = g.contents; c = g.root.getDocument(); h = []; 1 == l.length && l[0].equals(g.root) && (a = c.createElement("div"), l[0].moveChildren && l[0].moveChildren(a), l[0].append(a), l[0] = a); g = g.contents[0].getParent(); for (n = 0; n < l.length; n++)g = g.getCommonAncestor(l[n].getParent()); t = p.config.useComputedState; p = a = void 0; t = void 0 === t || t; for (n = 0; n < l.length; n++)for (r = l[n]; y = r.getParent();) { if (y.equals(g)) { h.push(r); !p && r.getDirection() && (p = 1); r = r.getDirection(t); null !== a && (a = a && a != r ? null : r); break } r = y } if (!(1 > h.length)) {
                            l =
                                h[h.length - 1].getNext(); n = c.createElement(this.type); d.push(n); for (t = d = void 0; h.length;)d = h.shift(), t = c.createElement("li"), r = d, r.is("pre") || L.test(r.getName()) || "false" == r.getAttribute("contenteditable") ? d.appendTo(t) : (d.copyAttributes(t), a && d.getDirection() && (t.removeStyle("direction"), t.removeAttribute("dir")), d.moveChildren(t), d.remove()), t.appendTo(n); a && p && n.setAttribute("dir", a); l ? n.insertBefore(l) : n.appendTo(g)
                        }
                } else this.state == CKEDITOR.TRISTATE_ON && v[a.root.getName()] && I.call(this, b, a, k);
                for (n = 0; n < q.length; n++)F(q[n]); CKEDITOR.dom.element.clearAllMarkers(k); e.selectBookmarks(m); b.focus()
            }, refresh: function (b, m) { var e = m.contains(v, 1), c = m.blockLimit || m.root; e && c.contains(e) ? this.setState(e.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
        }; CKEDITOR.plugins.add("list", {
            requires: "indentlist", init: function (b) {
                b.blockless || (b.addCommand("numberedlist", new B("numberedlist", "ol")), b.addCommand("bulletedlist", new B("bulletedlist", "ul")), b.ui.addButton &&
                    (b.ui.addButton("NumberedList", { label: b.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), b.ui.addButton("BulletedList", { label: b.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), b.on("key", function (m) {
                        var e = m.data.domEvent.getKey(), c; if ("wysiwyg" == b.mode && e in { 8: 1, 46: 1 }) {
                            var f = b.getSelection().getRanges()[0], g = f && f.startPath(); if (f && f.collapsed) {
                                var k = 8 == e, h = b.editable(), d = new CKEDITOR.dom.walker(f.clone()); d.evaluator = function (a) {
                                    return u(a) &&
                                        !z(a)
                                }; d.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; e = f.clone(); if (k) {
                                    var a; (a = g.contains(v)) && f.checkBoundaryOfElement(a, CKEDITOR.START) && (a = a.getParent()) && a.is("li") && (a = A(a)) ? (c = a, a = a.getPrevious(u), e.moveToPosition(a && z(a) ? a : c, CKEDITOR.POSITION_BEFORE_START)) : (d.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START), d.range.setEnd(f.startContainer, f.startOffset), (a = d.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in v || a.is("li")) && (a.is("li") || (d.range.selectNodeContents(a),
                                        d.reset(), d.evaluator = G, a = d.previous()), c = a, e.moveToElementEditEnd(c), e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (c) C(b, e, f), m.cancel(); else { var p = g.contains(v); p && f.checkBoundaryOfElement(p, CKEDITOR.START) && (c = p.getFirst(u), f.checkBoundaryOfElement(c, CKEDITOR.START) && (a = p.getPrevious(u), A(c) ? a && (f.moveToElementEditEnd(a), f.select()) : b.execCommand("outdent"), m.cancel())) }
                                } else if (c = g.contains("li")) {
                                    if (d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), k = (h = c.getLast(u)) &&
                                        G(h) ? h : c, g = 0, (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in v && a.equals(h) ? (g = 1, a = d.next()) : f.checkBoundaryOfElement(k, CKEDITOR.END) && (g = 2), g && a) {
                                        f = f.clone(); f.moveToElementEditStart(a); if (1 == g && (e.optimize(), !e.startContainer.equals(c))) { for (c = e.startContainer; c.is(CKEDITOR.dtd.$inline);)p = c, c = c.getParent(); p && e.moveToPosition(p, CKEDITOR.POSITION_AFTER_END) } 2 == g && (e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START));
                                        C(b, e, f); m.cancel()
                                    }
                                } else d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(v) && (a = a.getFirst(u), g.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (g.block.remove(), f.moveToElementEditStart(a), f.select()) : A(a) ? (f.moveToElementEditStart(a), f.select()) : (f = f.clone(), f.moveToElementEditStart(a), C(b, e, f)), m.cancel()); setTimeout(function () { b.selectionChange(1) })
                            }
                        }
                    }))
            }
        })
    })(); (function () {
        function V(a, c, d) { return n(c) && n(d) && d.equals(c.getNext(function (a) { return !(E(a) || F(a) || u(a)) })) } function z(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) } function O(a) { var c = a.element; if (c && n(c) && (c = c.getAscendant(a.triggers, !0)) && a.editable.contains(c)) { var d = P(c); if ("true" == d.getAttribute("contenteditable")) return c; if (d.is(a.triggers)) return d } return null } function ka(a, c, d) { r(a, c); r(a, d); a = c.size.bottom; d = d.size.top; return a && d ? 0 | (a + d) / 2 : a || d } function w(a, c, d) {
            return c =
                c[d ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !E(b) || n(b) && !u(b) && !A(a, b) })
        } function q(a, c, d) { return a > c && a < d } function P(a, c) { if (a.data("cke-editable")) return null; for (c || (a = a.getParent()); a && !a.data("cke-editable");) { if (a.hasAttribute("contenteditable")) return a; a = a.getParent() } return null } function la(a) {
            var c = a.doc, d = G('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + Q + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e',
                c), b = CKEDITOR.getUrl(this.path + "images/" + (t.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); v(d, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this }, lineChildren: [v(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', c), {
                        base: Q + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + b + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (t.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" :
                            "") + (t.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
                    }), v(G(W, c), { base: X + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), v(G(W, c), {
                        base: X + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px",
                            "border-width:0 8px 8px 0;top:0px"]
                    })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () { r(a, this); var b = a.holdDistance, c = this.size; return c && q(a.mouse.y, c.top - b, c.bottom + b) && q(a.mouse.x, c.left - b, c.right + b) ? !0 : !1 }, place: function () {
                        var b = a.view, c = a.editable, d = a.trigger, h = d.upper, g = d.lower, l = h || g, p = l.getParent(), m = {}; this.trigger = d; h && r(a, h, !0); g && r(a, g, !0); r(a, p, !0); a.inInlineMode && H(a, !0); p.equals(c) ? (m.left = b.scroll.x, m.right = -b.scroll.x, m.width = "") : (m.left =
                            l.size.left - l.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), m.width = l.size.outerWidth + l.size.margin.left + l.size.margin.right + b.scroll.x, m.right = ""); h && g ? m.top = h.size.margin.bottom === g.size.margin.top ? 0 | h.size.bottom + h.size.margin.bottom / 2 : h.size.margin.bottom < g.size.margin.top ? h.size.bottom + h.size.margin.bottom : h.size.bottom + h.size.margin.bottom - g.size.margin.top : h ? g || (m.top = h.size.bottom + h.size.margin.bottom) : m.top = g.size.top - g.size.margin.top; d.is(C) || q(m.top,
                                b.scroll.y - 15, b.scroll.y + 5) ? (m.top = a.inInlineMode ? 0 : b.scroll.y, this.look(C)) : d.is(D) || q(m.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (m.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(D)) : (a.inInlineMode && (m.top -= b.editable.top + b.editable.border.top), this.look(x)); a.inInlineMode && (m.top-- , m.top += b.editable.scroll.top, m.left += b.editable.scroll.left); for (var n in m) m[n] = CKEDITOR.tools.cssLength(m[n]); this.setStyles(m)
                    }, look: function (a) {
                        if (this.oldLook !=
                            a) { for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]); this.oldLook = a }
                    }, wrap: new R("span", a.doc)
                }); for (c = d.lineChildren.length; c--;)d.lineChildren[c].appendTo(d); d.look(x); d.appendTo(d.wrap); d.unselectable(); d.lineChildren[0].on("mouseup", function (b) {
                    d.detach(); S(a, function (b) { var c = a.line.trigger; b[c.is(I) ? "insertBefore" : "insertAfter"](c.is(I) ? c.lower : c.upper) }, !0); a.editor.focus(); t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
                    b.data.preventDefault(!0)
                }); d.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = d
        } function S(a, c, d) { var b = new CKEDITOR.dom.range(a.doc), e = a.editor, f; t.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(J) : (f = (f = P(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new R(K[f], a.doc), f.is("br") || a.doc.createText(J).appendTo(f)); d && e.fire("saveSnapshot"); c(f); b.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); e.getSelection().selectRanges([b]); a.hotNode = f; d && e.fire("saveSnapshot") }
        function Y(a, c) {
            return {
                canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                    function d(b) { var d = t.ie && 9 > t.version ? " " : J, f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c; S(a, function (d) { f && a.hotNode && a.hotNode.remove(); d[c ? "insertAfter" : "insertBefore"](b); d.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c }); a.lastCmdDirection = !!c }); t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach() } return function (b) {
                        b = b.getSelection().getStartElement();
                        var e; b = b.getAscendant(Z, 1); if (!aa(a, b) && b && !b.equals(a.editable) && !b.contains(a.editable)) { (e = P(b)) && "false" == e.getAttribute("contenteditable") && (b = e); a.element = b; e = w(a, b, !c); var f; n(e) && e.is(a.triggers) && e.is(ma) && (!w(a, e, !c) || (f = w(a, e, !c)) && n(f) && f.is(a.triggers)) ? d(e) : (f = O(a, b), n(f) && (w(a, f, !c) ? (b = w(a, f, !c)) && n(b) && b.is(a.triggers) && d(f) : d(f))) }
                    }
                }()
            }
        } function A(a, c) { if (!c || c.type != CKEDITOR.NODE_ELEMENT || !c.$) return !1; var d = a.line; return d.wrap.equals(c) || d.wrap.contains(c) } function n(a) {
            return a &&
                a.type == CKEDITOR.NODE_ELEMENT && a.$
        } function u(a) { if (!n(a)) return !1; var c; (c = ba(a)) || (n(a) ? (c = { left: 1, right: 1, center: 1 }, c = !(!c[a.getComputedStyle("float")] && !c[a.getAttribute("align")])) : c = !1); return c } function ba(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] } function L(a, c) { return n(c) ? c.is(a.triggers) : null } function aa(a, c) { if (!c) return !1; for (var d = c.getParents(1), b = d.length; b--;)for (var e = a.tabuList.length; e--;)if (d[b].hasAttribute(a.tabuList[e])) return !0; return !1 } function na(a,
            c, d) { c = c[d ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(oa) }); if (!c) return !1; r(a, c); return d ? c.size.top > a.mouse.y : c.size.bottom < a.mouse.y } function ca(a) {
                var c = a.editable, d = a.mouse, b = a.view, e = a.triggerOffset; H(a); var f = d.y > (a.inInlineMode ? b.editable.top + b.editable.height / 2 : Math.min(b.editable.height, b.pane.height) / 2), c = c[f ? "getLast" : "getFirst"](function (a) { return !(E(a) || F(a)) }); if (!c) return null; A(a, c) && (c = a.line.wrap[f ? "getPrevious" : "getNext"](function (a) { return !(E(a) || F(a)) }));
                if (!n(c) || u(c) || !L(a, c)) return null; r(a, c); return !f && 0 <= c.size.top && q(d.y, 0, c.size.top + e) ? (a = a.inInlineMode || 0 === b.scroll.y ? C : x, new z([null, c, I, M, a])) : f && c.size.bottom <= b.pane.height && q(d.y, c.size.bottom - e, b.pane.height) ? (a = a.inInlineMode || q(c.size.bottom, b.pane.height - e, b.pane.height) ? D : x, new z([c, null, da, M, a])) : null
            } function ea(a) {
                var c = a.mouse, d = a.view, b = a.triggerOffset, e = O(a); if (!e) return null; r(a, e); var b = Math.min(b, 0 | e.size.outerHeight / 2), f = [], k, h; if (q(c.y, e.size.top - 1, e.size.top + b)) h = !1; else if (q(c.y,
                    e.size.bottom - b, e.size.bottom + 1)) h = !0; else return null; if (u(e) || na(a, e, h) || e.getParent().is(fa)) return null; var g = w(a, e, !h); if (g) { if (g && g.type == CKEDITOR.NODE_TEXT) return null; if (n(g)) { if (u(g) || !L(a, g) || g.getParent().is(fa)) return null; f = [g, e][h ? "reverse" : "concat"]().concat([T, M]) } } else e.equals(a.editable[h ? "getLast" : "getFirst"](a.isRelevant)) ? (H(a), h && q(c.y, e.size.bottom - b, d.pane.height) && q(e.size.bottom, d.pane.height - b, d.pane.height) ? k = D : q(c.y, 0, e.size.top + b) && (k = C)) : k = x, f = [null, e][h ? "reverse" :
                        "concat"]().concat([h ? da : I, M, k, e.equals(a.editable[h ? "getLast" : "getFirst"](a.isRelevant)) ? h ? D : C : x]); return 0 in f ? new z(f) : null
            } function U(a, c, d, b) {
                for (var e = c.getDocumentPosition(), f = {}, k = {}, h = {}, g = {}, l = y.length; l--;)f[y[l]] = parseInt(c.getComputedStyle.call(c, "border-" + y[l] + "-width"), 10) || 0, h[y[l]] = parseInt(c.getComputedStyle.call(c, "padding-" + y[l]), 10) || 0, k[y[l]] = parseInt(c.getComputedStyle.call(c, "margin-" + y[l]), 10) || 0; d && !b || N(a, b); g.top = e.y - (d ? 0 : a.view.scroll.y); g.left = e.x - (d ? 0 : a.view.scroll.x);
                g.outerWidth = c.$.offsetWidth; g.outerHeight = c.$.offsetHeight; g.height = g.outerHeight - (h.top + h.bottom + f.top + f.bottom); g.width = g.outerWidth - (h.left + h.right + f.left + f.right); g.bottom = g.top + g.outerHeight; g.right = g.left + g.outerWidth; a.inInlineMode && (g.scroll = { top: c.$.scrollTop, left: c.$.scrollLeft }); return v({ border: f, padding: h, margin: k, ignoreScroll: d }, g, !0)
            } function r(a, c, d) {
                if (!n(c)) return c.size = null; if (!c.size) c.size = {}; else if (c.size.ignoreScroll == d && c.size.date > new Date - ga) return null; return v(c.size,
                    U(a, c, d), { date: +new Date }, !0)
            } function H(a, c) { a.view.editable = U(a, a.editable, c, !0) } function N(a, c) { a.view || (a.view = {}); var d = a.view; if (!(!c && d && d.date > new Date - ga)) { var b = a.win, d = b.getScrollPosition(), b = b.getViewPaneSize(); v(a.view, { scroll: { x: d.x, y: d.y, width: a.doc.$.documentElement.scrollWidth - b.width, height: a.doc.$.documentElement.scrollHeight - b.height }, pane: { width: b.width, height: b.height, bottom: b.height + d.y }, date: +new Date }, !0) } } function pa(a, c, d, b) {
                for (var e = b, f = b, k = 0, h = !1, g = !1, l = a.view.pane.height,
                    p = a.mouse; p.y + k < l && 0 < p.y - k;) { h || (h = c(e, b)); g || (g = c(f, b)); !h && 0 < p.y - k && (e = d(a, { x: p.x, y: p.y - k })); !g && p.y + k < l && (f = d(a, { x: p.x, y: p.y + k })); if (h && g) break; k += 2 } return new z([e, f, null, null])
            } CKEDITOR.plugins.add("magicline", {
                init: function (a) {
                    var c = a.config, d = c.magicline_triggerOffset || 30, b = {
                        editor: a, enterMode: c.enterMode, triggerOffset: d, holdDistance: 0 | d * (c.magicline_holdDistance || .5), boxColor: c.magicline_color || "#ff0000", rtl: "rtl" == c.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList ||
                            []), triggers: c.magicline_everywhere ? Z : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    }, e, f, k; b.isRelevant = function (a) { return n(a) && !A(b, a) && !u(a) }; a.on("contentDom", function () {
                        var d = a.editable(), g = a.document, l = a.window; v(b, { editable: d, inInlineMode: d.isInline(), doc: g, win: l, hotNode: null }, !0); b.boundary = b.inInlineMode ? b.editable : b.doc.getDocumentElement(); d.is(B.$inline) || (b.inInlineMode && !ba(d) && d.setStyles({ position: "relative", top: null, left: null }), la.call(this, b), N(b), d.attachListener(a, "beforeUndoImage",
                            function () { b.line.detach() }), d.attachListener(a, "beforeGetData", function () { b.line.wrap.getParent() && (b.line.detach(), a.once("getData", function () { b.line.attach() }, null, null, 1E3)) }, null, null, 0), d.attachListener(b.inInlineMode ? g : g.getWindow().getFrame(), "mouseout", function (c) {
                                if ("wysiwyg" == a.mode) if (b.inInlineMode) { var d = c.data.$.clientX; c = c.data.$.clientY; N(b); H(b, !0); var e = b.view.editable, f = b.view.scroll; d > e.left - f.x && d < e.right - f.x && c > e.top - f.y && c < e.bottom - f.y || (clearTimeout(k), k = null, b.line.detach()) } else clearTimeout(k),
                                    k = null, b.line.detach()
                            }), d.attachListener(d, "keyup", function () { b.hiddenMode = 0 }), d.attachListener(d, "keydown", function (c) { if ("wysiwyg" == a.mode) switch (c.data.getKeystroke()) { case 2228240: case 16: b.hiddenMode = 1, b.line.detach() } }), d.attachListener(b.inInlineMode ? d : g, "mousemove", function (c) {
                                f = !0; if ("wysiwyg" == a.mode && !a.readOnly && !k) {
                                    var d = { x: c.data.$.clientX, y: c.data.$.clientY }; k = setTimeout(function () {
                                        b.mouse = d; k = b.trigger = null; N(b); f && !b.hiddenMode && a.focusManager.hasFocus && !b.line.mouseNear() && (b.element =
                                            ha(b, !0)) && ((b.trigger = ca(b) || ea(b) || ia(b)) && !aa(b, b.trigger.upper || b.trigger.lower) ? b.line.attach().place() : (b.trigger = null, b.line.detach()), f = !1)
                                    }, 30)
                                }
                            }), d.attachListener(l, "scroll", function () { "wysiwyg" == a.mode && (b.line.detach(), t.webkit && (b.hiddenMode = 1, clearTimeout(e), e = setTimeout(function () { b.mouseDown || (b.hiddenMode = 0) }, 50))) }), d.attachListener(ja ? g : l, "mousedown", function () { "wysiwyg" == a.mode && (b.line.detach(), b.hiddenMode = 1, b.mouseDown = 1) }), d.attachListener(ja ? g : l, "mouseup", function () {
                                b.hiddenMode =
                                    0; b.mouseDown = 0
                            }), a.addCommand("accessPreviousSpace", Y(b)), a.addCommand("accessNextSpace", Y(b, !0)), a.setKeystroke([[c.magicline_keystrokePrevious, "accessPreviousSpace"], [c.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () { var c, d, e, f; for (f in { p: 1, br: 1, div: 1 }) for (c = a.document.getElementsByTag(f), e = c.count(); e--;)if ((d = c.getItem(e)).data("cke-magicline-hot")) { b.hotNode = d; b.lastCmdDirection = "true" === d.data("cke-magicline-dir") ? !0 : !1; return } }), this.backdoor = {
                                accessFocusSpace: S,
                                boxTrigger: z, isLine: A, getAscendantTrigger: O, getNonEmptyNeighbour: w, getSize: U, that: b, triggerEdge: ea, triggerEditable: ca, triggerExpand: ia
                            })
                    }, this)
                }
            }); var v = CKEDITOR.tools.extend, R = CKEDITOR.dom.element, G = R.createFromHtml, t = CKEDITOR.env, ja = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, B = CKEDITOR.dtd, K = {}, I = 128, da = 64, T = 32, M = 16, C = 4, D = 2, x = 1, J = " ", fa = B.$listItem, oa = B.$tableContent, ma = v({}, B.$nonEditable, B.$empty), Z = B.$block, ga = 100, Q = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
                X = Q + "border-color:transparent;display:block;border-style:solid;", W = "\x3cspan\x3e" + J + "\x3c/span\x3e"; K[CKEDITOR.ENTER_BR] = "br"; K[CKEDITOR.ENTER_P] = "p"; K[CKEDITOR.ENTER_DIV] = "div"; z.prototype = { set: function (a, c, d) { this.properties = a + c + (d || x); return this }, is: function (a) { return (this.properties & a) == a } }; var ha = function () {
                    function a(a, d) { var b = a.$.elementFromPoint(d.x, d.y); return b && b.nodeType ? new CKEDITOR.dom.element(b) : null } return function (c, d, b) {
                        if (!c.mouse) return null; var e = c.doc, f = c.line.wrap; b = b || c.mouse;
                        var k = a(e, b); d && A(c, k) && (f.hide(), k = a(e, b), f.show()); return !k || k.type != CKEDITOR.NODE_ELEMENT || !k.$ || t.ie && 9 > t.version && !c.boundary.equals(k) && !c.boundary.contains(k) ? null : k
                    }
                }(), E = CKEDITOR.dom.walker.whitespaces(), F = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), ia = function () {
                    function a(a) {
                        var b = a.element, e, f, k; if (!n(b) || b.contains(a.editable) || b.isReadOnly()) return null; k = pa(a, function (a, b) { return !b.equals(a) }, function (a, b) { return ha(a, !0, b) }, b); e = k.upper; f = k.lower; if (V(a, e, f)) return k.set(T,
                            8); if (e && b.contains(e)) for (; !e.getParent().equals(b);)e = e.getParent(); else e = b.getFirst(function (b) { return c(a, b) }); if (f && b.contains(f)) for (; !f.getParent().equals(b);)f = f.getParent(); else f = b.getLast(function (b) { return c(a, b) }); if (!e || !f) return null; r(a, e); r(a, f); if (!q(a.mouse.y, e.size.top, f.size.bottom)) return null; for (var b = Number.MAX_VALUE, h, g, l, p; f && !f.equals(e) && (g = e.getNext(a.isRelevant));)h = Math.abs(ka(a, e, g) - a.mouse.y), h < b && (b = h, l = e, p = g), e = g, r(a, e); if (!l || !p || !q(a.mouse.y, l.size.top, p.size.bottom)) return null;
                        k.upper = l; k.lower = p; return k.set(T, 8)
                    } function c(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || F(b) || u(b) || A(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (c) { var b = a(c), e; if (e = b) { e = b.upper; var f = b.lower; e = !e || !f || u(f) || u(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ? !1 : L(c, e) && L(c, f) && V(c, e, f) ? !0 : !1 } return e ? b : null }
                }(), y = ["top", "left", "right", "bottom"]
    })(); CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51;
    CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52; (function () {
        var f = { canUndo: !1, async: !0, exec: function (a, b) { var c = a.lang, e = CKEDITOR.tools.keystrokeToString(c.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)), d = b && "undefined" !== typeof b.notification ? b.notification : !b || !b.from || "keystrokeHandler" === b.from && CKEDITOR.env.ie, c = d && "string" === typeof d ? d : c.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + e.aria + '"\x3e' + e.display + "\x3c/kbd\x3e"); a.execCommand("paste", { type: "text", notification: d ? c : !1 }) } }; CKEDITOR.plugins.add("pastetext",
            { requires: "clipboard", init: function (a) { var b = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; a.addCommand("pastetext", f); a.setKeystroke(b, "pastetext"); CKEDITOR.plugins.clipboard.addPasteButton(a, "PasteText", { label: a.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (a.config.forcePasteAsPlainText) a.on("beforePaste", function (a) { "html" != a.data.type && (a.data.type = "text") }); a.on("pasteState", function (b) { a.getCommand("pastetext").setState(b.data) }) } })
    })(); (function () {
        function l(a, f, e) { var h = CKEDITOR.cleanWord; h ? e() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || f + "filter/default.js"), CKEDITOR.scriptLoader.load(a, e, null, !0)); return !h } CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard", init: function (a) {
                function f(a) {
                    var b = CKEDITOR.plugins.pastefromword && CKEDITOR.plugins.pastefromword.images, c, d = []; if (b && a.editor.filter.check("img[src]") && (c = b.extractTagsFromHtml(a.data.dataValue), 0 !== c.length && (b = b.extractFromRtf(a.data.dataTransfer["text/rtf"]),
                        0 !== b.length && (CKEDITOR.tools.array.forEach(b, function (a) { d.push(a.type ? "data:" + a.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(a.hex)) : null) }, this), c.length === d.length)))) for (b = 0; b < c.length; b++)0 === c[b].indexOf("file://") && d[b] && (a.data.dataValue = a.data.dataValue.replace(c[b], d[b]))
                } var e = 0, h = this.path, m = void 0 === a.config.pasteFromWord_inlineImages ? !0 : a.config.pasteFromWord_inlineImages; a.addCommand("pastefromword", {
                    canUndo: !1, async: !0, exec: function (a,
                        b) { e = 1; a.execCommand("paste", { type: "html", notification: b && "undefined" !== typeof b.notification ? b.notification : !0 }) }
                }); CKEDITOR.plugins.clipboard.addPasteButton(a, "PasteFromWord", { label: a.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" }); a.on("paste", function (f) {
                    var b = f.data, c = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? b.dataTransfer.getData("text/html", !0) : null, d = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? b.dataTransfer.getData("text/rtf") : null, c = c ||
                        b.dataValue, g = { dataValue: c, dataTransfer: { "text/rtf": d } }, d = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, d = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(c) || d.test(c); if (c && (e || d) && (!1 !== a.fire("pasteFromWord", g) || e)) {
                            b.dontFilter = !0; var k = l(a, h, function () {
                                if (k) a.fire("paste", b); else if (!a.config.pasteFromWordPromptCleanup || e || confirm(a.lang.pastefromword.confirmCleanup)) g.dataValue = CKEDITOR.cleanWord(g.dataValue, a), a.fire("afterPasteFromWord",
                                    g), b.dataValue = g.dataValue, !0 === a.config.forcePasteAsPlainText ? b.type = "text" : CKEDITOR.env.ie && "allow-word" === a.config.forcePasteAsPlainText && (b.type = "html"); e = 0
                            }); k && f.cancel()
                        }
                }, null, null, 3); if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && m) a.on("afterPasteFromWord", f)
            }
        })
    })(); CKEDITOR.plugins.add("removeformat", { init: function (a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } });
    CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (a) {
                    for (var h = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), e = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), f = CKEDITOR.plugins.removeformat.filter, m = a.getSelection().getRanges(), n = m.createIterator(), p = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, c; c = n.getNextRange();) {
                        c.collapsed || c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var l = c.createBookmark(), b = l.startNode, d = l.endNode, k = function (b) { for (var c = a.elementPath(b), e = c.elements, d = 1, g; (g = e[d]) && !g.equals(c.block) && !g.equals(c.blockLimit); d++)h.test(g.getName()) && f(a, g) && b.breakParent(g) }; k(b); if (d) for (k(d), b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); b && !b.equals(d);)if (b.isReadOnly()) { if (b.getPosition(d) & CKEDITOR.POSITION_CONTAINS) break; b = b.getNext(p) } else k = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == b.getName() && b.data("cke-realelement") || !f(a, b) || (h.test(b.getName()) ?
                            b.remove(1) : (b.removeAttributes(e), a.fire("removeFormatCleanup", b))), b = k; c.moveToBookmark(l)
                    } a.forceNextSelectionCheck(); a.getSelection().selectRanges(m)
                }
            }
        }, filter: function (a, h) { for (var e = a._.removeFormatFilters || [], f = 0; f < e.length; f++)if (!1 === e[f](h)) return !1; return !0 }
    }; CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) }; CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var";
    CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign"; (function () {
        var f = { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; a.editable()[b]("cke_show_borders") } } }; CKEDITOR.plugins.add("showborders", {
            modes: { wysiwyg: 1 }, onLoad: function () {
                var a; a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                    "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(a)
            }, init: function (a) {
                var b = a.addCommand("showborders", f); b.canUndo = !1; !1 !== a.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON); a.on("mode", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }, null, null, 100); a.on("contentDom", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }); a.on("removeFormatCleanup", function (d) {
                    d = d.data; a.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && d.is("table") && (!d.hasAttribute("border") ||
                        0 >= parseInt(d.getAttribute("border"), 10)) && d.addClass("cke_show_border")
                })
            }, afterInit: function (a) {
                var b = a.dataProcessor; a = b && b.dataFilter; b = b && b.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; var b = a["class"], c = parseInt(a.border, 10); c && !(0 >= c) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border") } } }); b && b.addRules({
                    elements: {
                        table: function (a) {
                            a = a.attributes; var b = a["class"]; b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                ""))
                        }
                    }
                })
            }
        }); CKEDITOR.on("dialogDefinition", function (a) {
            var b = a.data.name; if ("table" == b || "tableProperties" == b) if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function (a) { return function (b, c) { a.apply(this, arguments); var e = parseInt(this.getValue(), 10); c[!e || 0 >= e ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                return function () {
                    a.apply(this,
                        arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                }
            }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (b, c) { a.apply(this, arguments); parseInt(c.getAttribute("border"), 10) || c.addClass("cke_show_border") } })
        })
    })(); (function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (a) {
                function d() { var a = e && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show(); a && this.focus() } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = CKEDITOR.plugins.sourcearea; a.addMode("source", function (e) {
                        var b = a.ui.space("contents").getDocument().createElement("textarea"); b.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ?
                                "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", a.config.sourceAreaTabSize || 4))); b.setAttribute("dir", "ltr"); b.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"); a.ui.space("contents").append(b); b = a.editable(new c(a, b)); b.setData(a.getData(1)); CKEDITOR.env.ie && (b.attachListener(a, "resize", d, b), b.attachListener(CKEDITOR.document.getWindow(), "resize", d, b), CKEDITOR.tools.setTimeout(d, 0, b)); a.fire("ariaWidget",
                            this); e()
                    }); a.addCommand("source", f.commands.source); a.ui.addButton && a.ui.addButton("Source", { label: a.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); a.on("mode", function () { a.getCommand("source").setState("source" == a.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var e = CKEDITOR.env.ie && 9 == CKEDITOR.env.version
                }
            }
        }); var c = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (a) { this.setValue(a); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() },
                insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () { c.baseProto.detach.call(this); this.clearCustomData(); this.remove() }
            }
        })
    })();
    CKEDITOR.plugins.sourcearea = { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (c) { "wysiwyg" == c.mode && c.fire("saveSnapshot"); c.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); c.setMode("source" == c.mode ? "wysiwyg" : "source") }, canUndo: !1 } } }; CKEDITOR.plugins.add("specialchar", {
        availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 }, requires: "dialog", init: function (a) {
            var c = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); a.addCommand("specialchar",
                { exec: function () { var b = a.langCode, b = c.availableLangs[b] ? b : c.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + b + ".js"), function () { CKEDITOR.tools.extend(a.lang.specialchar, c.langEntries[b]); a.openDialog("specialchar") }) }, modes: { wysiwyg: 1 }, canUndo: !1 }); a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
        }
    }); CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "); (function () {
        function k(c) {
            return {
                editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (d) {
                    if (d.editable().hasFocus) {
                        var e = d.getSelection(), b; if (b = (new CKEDITOR.dom.elementPath(e.getCommonAncestor(), e.root)).contains({ td: 1, th: 1 }, 1)) {
                            var e = d.createRange(), a = CKEDITOR.tools.tryThese(function () { var a = b.getParent().$.cells[b.$.cellIndex + (c ? -1 : 1)]; a.parentNode.parentNode; return a }, function () {
                                var a = b.getParent(), a = a.getAscendant("table").$.rows[a.$.rowIndex + (c ? -1 : 1)]; return a.cells[c ? a.cells.length - 1 :
                                    0]
                            }); if (a || c) if (a) a = new CKEDITOR.dom.element(a), e.moveToElementEditStart(a), e.checkStartOfBlock() && e.checkEndOfBlock() || e.selectNodeContents(a); else return !0; else { for (var f = b.getAscendant("table").$, a = b.getParent().$.cells, f = new CKEDITOR.dom.element(f.insertRow(-1), d.document), g = 0, h = a.length; g < h; g++)f.append((new CKEDITOR.dom.element(a[g], d.document)).clone(!1, !1)).appendBogus(); e.moveToElementEditStart(f) } e.select(!0); return !0
                        }
                    } return !1
                }
            }
        } var h = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, g = {
            exec: function (c) {
                c.container.focusNext(!0,
                    c.tabIndex)
            }
        }, f = { exec: function (c) { c.container.focusPrevious(!0, c.tabIndex) } }; CKEDITOR.plugins.add("tab", {
            init: function (c) {
                for (var d = !1 !== c.config.enableTabKeyTools, e = c.config.tabSpaces || 0, b = ""; e--;)b += " "; if (b) c.on("key", function (a) { 9 == a.data.keyCode && (c.insertText(b), a.cancel()) }); if (d) c.on("key", function (a) { (9 == a.data.keyCode && c.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && c.execCommand("selectPreviousCell")) && a.cancel() }); c.addCommand("blur", CKEDITOR.tools.extend(g, h)); c.addCommand("blurBack",
                    CKEDITOR.tools.extend(f, h)); c.addCommand("selectNextCell", k()); c.addCommand("selectPreviousCell", k(!0))
            }
        })
    })();
    CKEDITOR.dom.element.prototype.focusNext = function (k, h) {
        var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e, b, a; if (0 >= g) for (b = this.getNextSourceNode(k, CKEDITOR.NODE_ELEMENT); b;) { if (b.isVisible() && 0 === b.getTabIndex()) { d = b; break } b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (b = this.getDocument().getBody().getFirst(); b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!f) if (!c && b.equals(this)) { if (c = !0, k) { if (!(b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; f = 1 } } else c && !this.contains(b) &&
                (f = 1); if (b.isVisible() && !(0 > (a = b.getTabIndex()))) { if (f && a == g) { d = b; break } a > g && (!d || !e || a < e) ? (d = b, e = a) : d || 0 !== a || (d = b, e = a) }
        } d && d.focus()
    };
    CKEDITOR.dom.element.prototype.focusPrevious = function (k, h) { for (var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e = 0, b, a = this.getDocument().getBody().getLast(); a = a.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) { if (!f) if (!c && a.equals(this)) { if (c = !0, k) { if (!(a = a.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; f = 1 } } else c && !this.contains(a) && (f = 1); if (a.isVisible() && !(0 > (b = a.getTabIndex()))) if (0 >= g) { if (f && 0 === b) { d = a; break } b > e && (d = a, e = b) } else { if (f && b == g) { d = a; break } b < g && (!d || b > e) && (d = a, e = b) } } d && d.focus() }; CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (a) {
            function f(c) { return CKEDITOR.tools.extend(c || {}, { contextSensitive: 1, refresh: function (c, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
                var e = a.lang.table; a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table", allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (a.plugins.dialogadvtab ?
                        "table" + a.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                            element: "table", right: function (c) {
                                if (c.styles) {
                                    var a; if (c.styles.border) a = CKEDITOR.tools.style.parse.border(c.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                        var b = c.styles; b["border-left"] && b["border-left"] === b["border-right"] && b["border-right"] === b["border-top"] && b["border-top"] === b["border-bottom"] &&
                                            (a = CKEDITOR.tools.style.parse.border(b["border-top"]))
                                    } a && a.style && "solid" === a.style && a.width && 0 !== parseFloat(a.width) && (c.attributes.border = 1); "collapse" == c.styles["border-collapse"] && (c.attributes.cellspacing = 0)
                                }
                            }
                        }]]
                })); a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", f())); a.addCommand("tableDelete", f({
                    exec: function (a) {
                        var d = a.elementPath().contains("table", 1); if (d) {
                            var b = d.getParent(), e = a.editable(); 1 != b.getChildCount() || b.is("td", "th") || b.equals(e) || (d = b); a = a.createRange();
                            a.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); d.remove(); a.select()
                        }
                    }
                })); a.ui.addButton && a.ui.addButton("Table", { label: e.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); a.addMenuItems && a.addMenuItems({ table: { label: e.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: { label: e.deleteTable, command: "tableDelete", group: "table", order: 1 } }); a.on("doubleclick", function (a) {
                    a.data.element.is("table") &&
                        (a.data.dialog = "tableProperties")
                }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
            }
        }
    }); (function () {
        function q(d, f) {
            function b(a) { return f ? f.contains(a) && a.getAscendant("table", !0).equals(f) : !0 } function c(b) { 0 < e.length || b.type != CKEDITOR.NODE_ELEMENT || !F.test(b.getName()) || b.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(a, b, "selected_cell", !0), e.push(b)) } var e = [], a = {}; if (!d) return e; for (var g = d.getRanges(), k = 0; k < g.length; k++) {
                var h = g[k]; if (h.collapsed) (h = h.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && b(h) && e.push(h); else {
                    var h = new CKEDITOR.dom.walker(h), l; for (h.guard =
                        c; l = h.next();)l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({ td: 1, th: 1 }, !0)) && !l.getCustomData("selected_cell") && b(l) && (CKEDITOR.dom.element.setMarker(a, l, "selected_cell", !0), e.push(l))
                }
            } CKEDITOR.dom.element.clearAllMarkers(a); return e
        } function r(d, f) {
            for (var b = D(d) ? d : q(d), c = b[0], e = c.getAscendant("table"), c = c.getDocument(), a = b[0].getParent(), g = a.$.rowIndex, b = b[b.length - 1], k = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = new CKEDITOR.dom.element(e.$.rows[k]), g = f ? g : k, a = f ? a : b,
                b = CKEDITOR.tools.buildTableMap(e), e = b[g], g = f ? b[g - 1] : b[g + 1], b = b[0].length, c = c.createElement("tr"), k = 0; e[k] && k < b; k++) { var h; 1 < e[k].rowSpan && g && e[k] == g[k] ? (h = e[k], h.rowSpan += 1) : (h = (new CKEDITOR.dom.element(e[k])).clone(), h.removeAttribute("rowSpan"), h.appendBogus(), c.append(h), h = h.$); k += h.colSpan - 1 } f ? c.insertBefore(a) : c.insertAfter(a); return c
        } function B(d) {
            if (d instanceof CKEDITOR.dom.selection) {
                var f = d.getRanges(), b = q(d), c = b[0].getAscendant("table"), e = CKEDITOR.tools.buildTableMap(c), a = b[0].getParent().$.rowIndex,
                    b = b[b.length - 1], g = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = []; d.reset(); for (d = a; d <= g; d++) { for (var k = e[d], h = new CKEDITOR.dom.element(c.$.rows[d]), l = 0; l < k.length; l++) { var m = new CKEDITOR.dom.element(k[l]), n = m.getParent().$.rowIndex; 1 == m.$.rowSpan ? m.remove() : (--m.$.rowSpan, n == d && (n = e[d + 1], n[l - 1] ? m.insertAfter(new CKEDITOR.dom.element(n[l - 1])) : (new CKEDITOR.dom.element(c.$.rows[d + 1])).append(m, 1))); l += m.$.colSpan - 1 } b.push(h) } e = c.$.rows; f[0].moveToPosition(c, CKEDITOR.POSITION_BEFORE_START); a = new CKEDITOR.dom.element(e[g +
                        1] || (0 < a ? e[a - 1] : null) || c.$.parentNode); for (d = b.length; 0 <= d; d--)B(b[d]); return c.$.parentNode ? a : (f[0].select(), null)
            } d instanceof CKEDITOR.dom.element && (c = d.getAscendant("table"), 1 == c.$.rows.length ? c.remove() : d.remove()); return null
        } function v(d) { for (var f = d.getParent().$.cells, b = 0, c = 0; c < f.length; c++) { var e = f[c], b = b + e.colSpan; if (e == d.$) break } return b - 1 } function w(d, f) { for (var b = f ? Infinity : 0, c = 0; c < d.length; c++) { var e = v(d[c]); if (f ? e < b : e > b) b = e } return b } function u(d, f) {
            for (var b = D(d) ? d : q(d), c = b[0].getAscendant("table"),
                e = w(b, 1), b = w(b), a = f ? e : b, g = CKEDITOR.tools.buildTableMap(c), c = [], e = [], b = [], k = g.length, h = 0; h < k; h++)c.push(g[h][a]), e.push(f ? g[h][a - 1] : g[h][a + 1]); for (h = 0; h < k; h++)c[h] && (1 < c[h].colSpan && e[h] == c[h] ? (g = c[h], g.colSpan += 1) : (a = new CKEDITOR.dom.element(c[h]), g = a.clone(), g.removeAttribute("colSpan"), g.appendBogus(), g[f ? "insertBefore" : "insertAfter"].call(g, a), b.push(g), g = g.$), h += g.rowSpan - 1); return b
        } function y(d) {
            function f(a) {
                var b, c, d; b = a.getRanges(); if (1 !== b.length) return a; b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a;
                c = b.endContainer; d = c.getName().toLowerCase(); if ("td" !== d && "th" !== d) return a; for ((d = c.getPrevious()) || (d = c.getParent().getPrevious().getLast()); d.type !== CKEDITOR.NODE_TEXT && "br" !== d.getName().toLowerCase();)if (d = d.getLast(), !d) return a; b.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); return b.select()
            } CKEDITOR.env.webkit && !d.isFake && (d = f(d)); var b = d.getRanges(), c = q(d), e = c[0], a = c[c.length - 1], c = e.getAscendant("table"), g = CKEDITOR.tools.buildTableMap(c), k, h, l = []; d.reset(); var m = 0; for (d = g.length; m < d; m++)for (var n =
                0, p = g[m].length; n < p; n++)void 0 === k && g[m][n] == e.$ && (k = n), g[m][n] == a.$ && (h = n); for (m = k; m <= h; m++)for (n = 0; n < g.length; n++)a = g[n], e = new CKEDITOR.dom.element(c.$.rows[n]), a = new CKEDITOR.dom.element(a[m]), a.$ && (1 == a.$.colSpan ? a.remove() : --a.$.colSpan, n += a.$.rowSpan - 1, e.$.cells.length || l.push(e)); k = g[0].length - 1 > h ? new CKEDITOR.dom.element(g[0][h + 1]) : k && -1 !== g[0][k - 1].cellIndex ? new CKEDITOR.dom.element(g[0][k - 1]) : new CKEDITOR.dom.element(c.$.parentNode); l.length == d && (b[0].moveToPosition(c, CKEDITOR.POSITION_AFTER_END),
                    b[0].select(), c.remove()); return k
        } function t(d, f) { var b = d.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (b) { var c = b.clone(); c.appendBogus(); f ? c.insertBefore(b) : c.insertAfter(b) } } function z(d) {
            if (d instanceof CKEDITOR.dom.selection) {
                var f = d.getRanges(), b = q(d), c = b[0] && b[0].getAscendant("table"), e; a: {
                    var a = 0; e = b.length - 1; for (var g = {}, k, h; k = b[a++];)CKEDITOR.dom.element.setMarker(g, k, "delete_cell", !0); for (a = 0; k = b[a++];)if ((h = k.getPrevious()) && !h.getCustomData("delete_cell") || (h = k.getNext()) && !h.getCustomData("delete_cell")) {
                        CKEDITOR.dom.element.clearAllMarkers(g);
                        e = h; break a
                    } CKEDITOR.dom.element.clearAllMarkers(g); a = b[0].getParent(); (a = a.getPrevious()) ? e = a.getLast() : (a = b[e].getParent(), e = (a = a.getNext()) ? a.getChild(0) : null)
                } d.reset(); for (d = b.length - 1; 0 <= d; d--)z(b[d]); e ? p(e, !0) : c && (f[0].moveToPosition(c, CKEDITOR.POSITION_BEFORE_START), f[0].select(), c.remove())
            } else d instanceof CKEDITOR.dom.element && (f = d.getParent(), 1 == f.getChildCount() ? f.remove() : d.remove())
        } function p(d, f) {
            var b = d.getDocument(), c = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version &&
                (c.focus(), b.focus()); b = new CKEDITOR.dom.range(b); b["moveToElementEdit" + (f ? "End" : "Start")](d) || (b.selectNodeContents(d), b.collapse(f ? !1 : !0)); b.select(!0)
        } function A(d, f, b) { d = d[f]; if ("undefined" == typeof b) return d; for (f = 0; d && f < d.length; f++) { if (b.is && d[f] == b.$) return f; if (f == b) return new CKEDITOR.dom.element(d[f]) } return b.is ? -1 : null } function x(d, f, b) {
            var c = q(d), e; if ((f ? 1 != c.length : 2 > c.length) || (e = d.getCommonAncestor()) && e.type == CKEDITOR.NODE_ELEMENT && e.is("table")) return !1; var a; d = c[0]; e = d.getAscendant("table");
            var g = CKEDITOR.tools.buildTableMap(e), k = g.length, h = g[0].length, l = d.getParent().$.rowIndex, m = A(g, l, d); if (f) { var n; try { var p = parseInt(d.getAttribute("rowspan"), 10) || 1; a = parseInt(d.getAttribute("colspan"), 10) || 1; n = g["up" == f ? l - p : "down" == f ? l + p : l]["left" == f ? m - a : "right" == f ? m + a : m] } catch (x) { return !1 } if (!n || d.$ == n) return !1; c["up" == f || "left" == f ? "unshift" : "push"](new CKEDITOR.dom.element(n)) } f = d.getDocument(); var r = l, p = n = 0, u = !b && new CKEDITOR.dom.documentFragment(f), w = 0; for (f = 0; f < c.length; f++) {
                a = c[f]; var t = a.getParent(),
                    y = a.getFirst(), v = a.$.colSpan, z = a.$.rowSpan, t = t.$.rowIndex, B = A(g, t, a), w = w + v * z, p = Math.max(p, B - m + v); n = Math.max(n, t - l + z); b || (v = a, (z = v.getBogus()) && z.remove(), v.trim(), a.getChildren().count() && (t == r || !y || y.isBlockBoundary && y.isBlockBoundary({ br: 1 }) || (r = u.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !r || r.is && r.is("br") || u.append("br")), a.moveChildren(u)), f ? a.remove() : a.setHtml("")); r = t
            } if (b) return n * p == w; u.moveChildren(d); d.appendBogus(); p >= h ? d.removeAttribute("rowSpan") : d.$.rowSpan = n; n >= k ? d.removeAttribute("colSpan") :
                d.$.colSpan = p; b = new CKEDITOR.dom.nodeList(e.$.rows); c = b.count(); for (f = c - 1; 0 <= f; f--)e = b.getItem(f), e.$.cells.length || (e.remove(), c++); return d
        } function C(d, f) {
            var b = q(d); if (1 < b.length) return !1; if (f) return !0; var b = b[0], c = b.getParent(), e = c.getAscendant("table"), a = CKEDITOR.tools.buildTableMap(e), g = c.$.rowIndex, k = A(a, g, b), h = b.$.rowSpan, l; if (1 < h) {
                l = Math.ceil(h / 2); for (var h = Math.floor(h / 2), c = g + l, e = new CKEDITOR.dom.element(e.$.rows[c]), a = A(a, c), m, c = b.clone(), g = 0; g < a.length; g++)if (m = a[g], m.parentNode == e.$ &&
                    g > k) { c.insertBefore(new CKEDITOR.dom.element(m)); break } else m = null; m || e.append(c)
            } else for (h = l = 1, e = c.clone(), e.insertAfter(c), e.append(c = b.clone()), m = A(a, g), k = 0; k < m.length; k++)m[k].rowSpan++; c.appendBogus(); b.$.rowSpan = l; c.$.rowSpan = h; 1 == l && b.removeAttribute("rowSpan"); 1 == h && c.removeAttribute("rowSpan"); return c
        } function E(d, f) {
            var b = q(d); if (1 < b.length) return !1; if (f) return !0; var b = b[0], c = b.getParent(), e = c.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(e), a = A(e, c.$.rowIndex, b), g = b.$.colSpan;
            if (1 < g) c = Math.ceil(g / 2), g = Math.floor(g / 2); else { for (var g = c = 1, k = [], h = 0; h < e.length; h++) { var l = e[h]; k.push(l[a]); 1 < l[a].rowSpan && (h += l[a].rowSpan - 1) } for (e = 0; e < k.length; e++)k[e].colSpan++ } e = b.clone(); e.insertAfter(b); e.appendBogus(); b.$.colSpan = c; e.$.colSpan = g; 1 == c && b.removeAttribute("colSpan"); 1 == g && e.removeAttribute("colSpan"); return e
        } var F = /^(?:td|th)$/, D = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu", init: function (d) {
                function f(a) {
                    return CKEDITOR.tools.extend(a ||
                        {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } })
                } function b(a, b) { var c = d.addCommand(a, b); d.addFeature(c) } var c = d.lang.table, e = CKEDITOR.tools.style.parse; b("cellProperties", new CKEDITOR.dialogCommand("cellProperties", f({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: "table", contentTransformations: [[{
                        element: "td", left: function (a) {
                            return a.styles.background &&
                                e.background(a.styles.background).color
                        }, right: function (a) { a.styles["background-color"] = e.background(a.styles.background).color }
                    }, { element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign }, right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign } }], [{
                        element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) {
                            CKEDITOR.tools.array.forEach(a.children, function (b) {
                                b.name in { td: 1, th: 1 } &&
                                    (b.attributes["cke-row-height"] = a.styles.height)
                            }); delete a.styles.height
                        }
                    }], [{ element: "td", check: "td{height}", left: function (a) { return (a = a.attributes) && a["cke-row-height"] }, right: function (a) { a.styles.height = a.attributes["cke-row-height"]; delete a.attributes["cke-row-height"] } }]]
                }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); b("rowDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = B(a)) && p(a) } })); b("rowInsertBefore", f({
                    requiredContent: "table", exec: function (a) {
                        a =
                            a.getSelection(); a = q(a); r(a, !0)
                    }
                })); b("rowInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); r(a) } })); b("columnDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = y(a)) && p(a, !0) } })); b("columnInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); u(a, !0) } })); b("columnInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); u(a) } })); b("cellDelete", f({
                    requiredContent: "table", exec: function (a) {
                        a =
                            a.getSelection(); z(a)
                    }
                })); b("cellMerge", f({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a, b) { b.cell = x(a.getSelection()); p(b.cell, !0) } })); b("cellMergeRight", f({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a, b) { b.cell = x(a.getSelection(), "right"); p(b.cell, !0) } })); b("cellMergeDown", f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = x(a.getSelection(), "down"); p(b.cell, !0) } })); b("cellVerticalSplit",
                    f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) { p(E(a.getSelection())) } })); b("cellHorizontalSplit", f({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { p(C(a.getSelection())) } })); b("cellInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); t(a, !0) } })); b("cellInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); t(a) } })); d.addMenuItems && d.addMenuItems({
                        tablecell: {
                            label: c.cell.menu, group: "tablecell",
                            order: 1, getItems: function () {
                                var a = d.getSelection(), b = q(a); return {
                                    tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: x(a, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: x(a, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: x(a, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: E(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_split_horizontal: C(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_properties: 0 < b.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                                }
                            }
                        }, tablecell_insertBefore: { label: c.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 }, tablecell_insertAfter: { label: c.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: c.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: {
                            label: c.cell.merge,
                            group: "tablecell", command: "cellMerge", order: 16
                        }, tablecell_merge_right: { label: c.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: { label: c.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: { label: c.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: c.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: {
                            label: c.cell.title,
                            group: "tablecellproperties", command: "cellProperties", order: 21
                        }, tablerow: { label: c.row.menu, group: "tablerow", order: 1, getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } }, tablerow_insertBefore: { label: c.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: c.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: {
                            label: c.row.deleteRow,
                            group: "tablerow", command: "rowDelete", order: 15
                        }, tablecolumn: { label: c.column.menu, group: "tablecolumn", order: 1, getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } }, tablecolumn_insertBefore: { label: c.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: c.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: {
                            label: c.column.deleteColumn,
                            group: "tablecolumn", command: "columnDelete", order: 15
                        }
                    }); d.contextMenu && d.contextMenu.addListener(function (a, b, c) { return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
            }, getCellColIndex: v, insertRow: r, insertColumn: u, getSelectedCells: q
        }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    })();
    CKEDITOR.tools.buildTableMap = function (q, r, B, v, w) { q = q.$.rows; B = B || 0; v = "number" === typeof v ? v : q.length - 1; w = "number" === typeof w ? w : -1; var u = -1, y = []; for (r = r || 0; r <= v; r++) { u++; !y[u] && (y[u] = []); for (var t = -1, z = B; z <= (-1 === w ? q[r].cells.length - 1 : w); z++) { var p = q[r].cells[z]; if (!p) break; for (t++; y[u][t];)t++; for (var A = isNaN(p.colSpan) ? 1 : p.colSpan, p = isNaN(p.rowSpan) ? 1 : p.rowSpan, x = 0; x < p && !(r + x > v); x++) { y[u + x] || (y[u + x] = []); for (var C = 0; C < A; C++)y[u + x][t + C] = q[r].cells[z] } t += A - 1; if (-1 !== w && t >= w) break } } return y }; (function () {
        function B(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function x(a, b) {
            var c = a.getAscendant("table"), d = b.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(c), h = n(a), m = n(b), l = [], k = {}, f, p; c.contains(d) && (b = b.getAscendant({ td: 1, th: 1 }), m = n(b)); h > m && (c = h, h = m, m = c, c = a, a = b, b = c); for (c = 0; c < e[h].length; c++)if (a.$ === e[h][c]) { f = c; break } for (c = 0; c < e[m].length; c++)if (b.$ === e[m][c]) { p = c; break } f > p && (c = f, f = p, p = c); for (c = h; c <= m; c++)for (h = f; h <= p; h++)d = new CKEDITOR.dom.element(e[c][h]),
                d.$ && !d.getCustomData("selected_cell") && (l.push(d), CKEDITOR.dom.element.setMarker(k, d, "selected_cell", !0)); CKEDITOR.dom.element.clearAllMarkers(k); return l
        } function H(a) { if (a) return a = a.clone(), a.enlarge(CKEDITOR.ENLARGE_ELEMENT), (a = a.getEnclosedNode()) && a.is && a.is(CKEDITOR.dtd.$tableContent) } function I(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function y(a, b) {
            var c = a.editable().find(".cke_table-faked-selection"), d; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor");
            for (d = 0; d < c.count(); d++)c.getItem(d).removeClass("cke_table-faked-selection"); 0 < c.count() && c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table", !1); a.fire("unlockSnapshot"); b && (g = { active: !1 }, a.getSelection().isInTable() && a.getSelection().reset())
        } function t(a, b) { var c = [], d, e; for (e = 0; e < b.length; e++)d = a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d); a.getSelection().selectRanges(c) } function J(a) {
            var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() ||
                (b = x(b.getItem(0), b.getItem(b.count() - 1)), t(a, b))
        } function K(a, b, c) { var d = u(a.getSelection(!0)); b = b.is("table") ? null : b; var e; (e = g.active && !g.first) && !(e = b) && (e = a.getSelection().getRanges(), e = 1 < d.length || e[0] && !e[0].collapsed ? !0 : !1); if (e) g.first = b || d[0], g.dirty = b ? !1 : 1 !== d.length; else if (g.active && b && g.first.getAscendant("table").equals(b.getAscendant("table"))) { d = x(g.first, b); if (!g.dirty && 1 === d.length && !B(c.data.getTarget())) return y(a, "mouseup" === c.name); g.dirty = !0; g.last = b; t(a, d) } } function L(a) {
            var b =
                (a = a.editor || a.sender.editor) && a.getSelection(), c = b && b.getRanges() || [], d; if (b && (y(a), b.isInTable() && b.isFake)) { 1 === c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (d = c[0]._getTableElement()); d = u(b, d); a.fire("lockSnapshot"); for (b = 0; b < d.length; b++)d[b].addClass("cke_table-faked-selection"); 0 < d.length && (a.editable().addClass("cke_table-faked-selection-editor"), d[0].getAscendant("table").data("cke-table-faked-selection-table", "")); a.fire("unlockSnapshot") }
        } function n(a) {
            return a.getAscendant("tr",
                !0).$.rowIndex
        } function v(a) {
            function b(a, b) { return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(f) : !1 } function c(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(e.document) } function d(a, d, e, k) { return ("mousedown" !== a.name || CKEDITOR.tools.getMouseButton(a) !== CKEDITOR.MOUSE_BUTTON_LEFT && k) && ("mouseup" !== a.name || c(a.data.getTarget()) || b(e, k)) ? !1 : !0 } if (a.data.getTarget().getName && ("mouseup" === a.name || !B(a.data.getTarget()))) {
                var e = a.editor || a.listenerData.editor,
                    h = e.getSelection(1), m = I(e), l = a.data.getTarget(), k = l && l.getAscendant({ td: 1, th: 1 }, !0), l = l && l.getAscendant("table", !0), f = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; d(a, h, m, l) && y(e, !0); !g.active && "mousedown" === a.name && CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT && l && (g = { active: !0 }, CKEDITOR.document.on("mouseup", v, null, { editor: e })); (k || l) && K(e, k || l, a); "mouseup" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT && (c(a.data.getTarget()) || b(m, l)) && J(e), g = { active: !1 },
                        CKEDITOR.document.removeListener("mouseup", v))
            }
        } function M(a) { var b = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0); b && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault()) } function N(a, b) {
            function c(a) { a.cancel() } var d = a.getSelection(), e = d.createBookmarks(), h = a.document, m = a.createRange(), l = h.getDocumentElement().$, k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, f = a.blockless || CKEDITOR.env.ie ? "span" : "div", p, r, C, g; h.getById("cke_table_copybin") || (p = h.createElement(f), r = h.createElement(f),
                r.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), p.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }), p.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), p.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), r.append(p), a.editable().append(r), g = a.on("selectionChange", c, null, null, 0), k && (C = l.scrollTop), m.selectNodeContents(p), m.select(), k && (l.scrollTop = C), setTimeout(function () {
                    r.remove(); d.selectBookmarks(e); g.removeListener(); a.fire("unlockSnapshot");
                    b && (a.extractSelectedHtml(), a.fire("saveSnapshot"))
                }, 100))
        } function D(a) { var b = a.editor || a.sender.editor; b.getSelection().isInTable() && N(b, "cut" === a.name) } function q(a) { this._reset(); a && this.setSelectedCells(a) } function z(a, b, c) { a.on("beforeCommandExec", function (d) { -1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && (d.data.selectedCells = u(a.getSelection())) }); a.on("afterCommandExec", function (d) { -1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data) }) } var g = { active: !1 }, w, u, A, E, F; q.prototype =
            {}; q.prototype._reset = function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; q.prototype.setSelectedCells = function (a) { this._reset(); a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all = a; this.cells.first = a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr") }; q.prototype.getTableMap = function () {
                var a = A(this.cells.first), b; a: {
                    b = this.cells.last; var c = b.getAscendant("table"), d = n(b), c = CKEDITOR.tools.buildTableMap(c),
                        e; for (e = 0; e < c[d].length; e++)if ((new CKEDITOR.dom.element(c[d][e])).equals(b)) { b = e; break a } b = void 0
                } return CKEDITOR.tools.buildTableMap(this._getTable(), n(this.rows.first), a, n(this.rows.last), b)
            }; q.prototype._getTable = function () { return this.rows.first.getAscendant("table") }; q.prototype.insertRow = function (a, b, c) {
                if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var d = this.cells.first.$.cellIndex, e = this.cells.last.$.cellIndex, h = c ? [] : this.cells.all, m, l = 0; l < a; l++)m = E(c ? this.cells.all : h, b), m = CKEDITOR.tools.array.filter(m.find("td, th").toArray(),
                    function (a) { return c ? !0 : a.$.cellIndex >= d && a.$.cellIndex <= e }), h = b ? m.concat(h) : h.concat(m); this.setSelectedCells(h)
            }; q.prototype.insertColumn = function (a) { function b(a) { a = n(a); return a >= e && a <= h } if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var c = this.cells, d = c.all, e = n(c.first), h = n(c.last), c = 0; c < a; c++)d = d.concat(CKEDITOR.tools.array.filter(F(d), b)); this.setSelectedCells(d) }; q.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; q.prototype._arraySortByDOMOrder =
                function (a) { a.sort(function (a, c) { return a.getPosition(c) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var G = {
                    onPaste: function (a) {
                        function b(a) { return Math.max.apply(null, CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0)) } function c(a) { var b = d.createRange(); b.selectNodeContents(a); b.select() } var d = a.editor, e = d.getSelection(), h = u(e), m = this.findTableInPastedContent(d, a.data.dataValue), l = e.isInTable(!0) && this.isBoundarySelection(e), k, f; !h.length || 1 === h.length && !H(e.getRanges()[0]) && !l || l && !m || (h = h[0].getAscendant("table"),
                            k = new q(u(e, h)), d.once("afterPaste", function () { var a; if (f) { a = new CKEDITOR.dom.element(f[0][0]); var b = f[f.length - 1]; a = x(a, new CKEDITOR.dom.element(b[b.length - 1])) } else a = k.cells.all; t(d, a) }), m ? (a.stop(), l ? (k.insertRow(1, 1 === l, !0), e.selectElement(k.rows.first)) : (k.emptyCells(), t(d, k.cells.all)), a = k.getTableMap(), f = CKEDITOR.tools.buildTableMap(m), k.insertRow(f.length - a.length), k.insertColumn(b(f) - b(a)), a = k.getTableMap(), this.pasteTable(k, a, f), d.fire("saveSnapshot"), setTimeout(function () { d.fire("afterPaste") },
                                0)) : (c(k.cells.first), d.once("afterPaste", function () { d.fire("lockSnapshot"); k.emptyCells(k.cells.all.slice(1)); t(d, k.cells.all); d.fire("unlockSnapshot") })))
                    }, isBoundarySelection: function (a) { a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) { if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2 } return 0 }, findTableInPastedContent: function (a, b) {
                        var c = a.dataProcessor, d = new CKEDITOR.dom.element("body"); c || (c = new CKEDITOR.htmlDataProcessor(a));
                        d.setHtml(c.toHtml(b), { fixForBody: !1 }); return 1 < d.getChildCount() ? null : d.findOne("table")
                    }, pasteTable: function (a, b, c) {
                        var d, e = A(a.cells.first), h = a._getTable(), m = {}, l, k, f, p; for (f = 0; f < c.length; f++)for (l = new CKEDITOR.dom.element(h.$.rows[a.rows.first.$.rowIndex + f]), p = 0; p < c[f].length; p++)if (k = new CKEDITOR.dom.element(c[f][p]), d = b[f] && b[f][p] ? new CKEDITOR.dom.element(b[f][p]) : null, k && !k.getCustomData("processed")) {
                            if (d && d.getParent()) k.replace(d); else if (0 === p || c[f][p - 1]) (d = 0 !== p ? new CKEDITOR.dom.element(c[f][p -
                                1]) : null) && l.equals(d.getParent()) ? k.insertAfter(d) : 0 < e ? l.$.cells[e] ? k.insertAfter(new CKEDITOR.dom.element(l.$.cells[e])) : l.append(k) : l.append(k, !0); CKEDITOR.dom.element.setMarker(m, k, "processed", !0)
                        } else k.getCustomData("processed") && d && d.remove(); CKEDITOR.dom.element.clearAllMarkers(m)
                    }
                }; CKEDITOR.plugins.tableselection = {
                    getCellsBetween: x, keyboardIntegration: function (a) {
                        function b(a) {
                            var b = a.getEnclosedNode(); b && b.is({ td: 1, th: 1 }) ? a.getEnclosedNode().setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"),
                                function (a) { a.appendBogus() })
                        } var c = a.editable(); c.attachListener(c, "keydown", function (a) {
                            function c(b, e) {
                                if (!e.length) return null; var f = a.createRange(), h = CKEDITOR.dom.range.mergeRanges(e); CKEDITOR.tools.array.forEach(h, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var r = h[0].getBoundaryNodes(), g = r.startNode, r = r.endNode; if (g && g.is && g.is(m)) {
                                    for (var q = g.getAscendant("table", !0), n = g.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, q), t = !1, u = function (a) { return !g.contains(a) && a.is && a.is("td", "th") }; n &&
                                        !u(n);)n = n.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, q); !n && r && r.is && !r.is("table") && r.getNext() && (n = r.getNext().findOne("td, th"), t = !0); if (n) f["moveToElementEdit" + (t ? "Start" : "End")](n); else f.setStartBefore(g.getAscendant("table", !0)), f.collapse(!0); h[0].deleteContents(); return [f]
                                } if (g) return f.moveToElementEditablePosition(g), [f]
                            } var h = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }, m = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete m.td; delete m.th; return function (l) {
                                var k = l.data.getKey(),
                                    f, m = 37 === k || 38 == k, g, n, q; if (h[k] && (f = a.getSelection()) && f.isInTable() && f.isFake) if (g = f.getRanges(), n = g[0]._getTableElement(), q = g[g.length - 1]._getTableElement(), l.data.preventDefault(), l.cancel(), 8 < k && 46 > k) g[0].moveToElementEditablePosition(m ? n : q, !m), f.selectRanges([g[0]]); else { for (l = 0; l < g.length; l++)b(g[l]); (l = c(n, g)) ? g = l : g[0].moveToElementEditablePosition(n); f.selectRanges(g); a.fire("saveSnapshot") }
                            }
                        }(a), null, null, -1); c.attachListener(c, "keypress", function (d) {
                            var c = a.getSelection(), h = d.data.$.charCode ||
                                13 === d.data.getKey(), g; if (c && c.isInTable() && c.isFake && h && !(d.data.getKeystroke() & CKEDITOR.CTRL)) { d = c.getRanges(); h = d[0].getEnclosedNode().getAscendant({ td: 1, th: 1 }, !0); for (g = 0; g < d.length; g++)b(d[g]); h && (d[0].moveToElementEditablePosition(h), c.selectRanges([d[0]])) }
                        }, null, null, -1)
                    }, isSupportedEnvironment: !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version)
                }; CKEDITOR.plugins.add("tableselection", {
                    requires: "clipboard,tabletools", onLoad: function () {
                        w = CKEDITOR.plugins.tabletools; u = w.getSelectedCells; A = w.getCellColIndex;
                        E = w.insertRow; F = w.insertColumn; CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css")
                    }, init: function (a) {
                        CKEDITOR.plugins.tableselection.isSupportedEnvironment && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function () {
                            var b = a.editable(), c = b.isInline() ? b : a.document, d = { editor: a }; b.attachListener(c, "mousedown", v, null, d); b.attachListener(c, "mousemove", v, null, d); b.attachListener(c, "mouseup", v, null, d); b.attachListener(b, "dragstart", M); b.attachListener(a,
                                "selectionCheck", L); CKEDITOR.plugins.tableselection.keyboardIntegration(a); CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", D), b.attachListener(b, "copy", D))
                        }), a.on("paste", G.onPaste, G), z(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, c) { t(a, c.selectedCells) }), z(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, c) { t(a, [c.commandData.cell]) }), z(a, ["cellDelete"],
                            function (a) { y(a, !0) }))
                    }
                })
    })(); (function () {
        var g = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], n = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
            init: function (a) {
                function b(a) { d.enabled && !1 !== a.data.command.canUndo && d.save() } function c() { d.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode; d.onChange() } var d = a.undoManager = new e(a), l = d.editingHandler = new k(d), f = a.addCommand("undo", { exec: function () { d.undo() && (a.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0, canUndo: !1 }), h = a.addCommand("redo", {
                    exec: function () {
                        d.redo() &&
                            (a.selectionChange(), this.fire("afterRedo"))
                    }, startDisabled: !0, canUndo: !1
                }); a.setKeystroke([[g[0], "undo"], [g[1], "redo"], [g[2], "redo"]]); d.onChange = function () { f.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); h.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) }; a.on("beforeCommandExec", b); a.on("afterCommandExec", b); a.on("saveSnapshot", function (a) { d.save(a.data && a.data.contentOnly) }); a.on("contentDom", l.attachListeners, l); a.on("instanceReady", function () { a.fire("saveSnapshot") });
                a.on("beforeModeUnload", function () { "wysiwyg" == a.mode && d.save(!0) }); a.on("mode", c); a.on("readOnly", c); a.ui.addButton && (a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }), a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" })); a.resetUndo = function () { d.reset(); a.fire("saveSnapshot") }; a.on("updateSnapshot", function () { d.currentImage && d.update() }); a.on("lockSnapshot", function (a) { a = a.data; d.lock(a && a.dontUpdate, a && a.forceUpdate) }); a.on("unlockSnapshot",
                    d.unlock, d)
            }
        }); CKEDITOR.plugins.undo = {}; var e = CKEDITOR.plugins.undo.UndoManager = function (a) { this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit = 25; this.editor = a; this.reset() }; e.prototype = {
            type: function (a, b) {
                var c = e.getKeyGroup(a), d = this.strokesRecorded[c] + 1; b = b || d >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); b ? (d = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[c] =
                    d; this.previousKeyGroup = c
            }, keyGroupChanged: function (a) { return e.getKeyGroup(a) != this.previousKeyGroup }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () { this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup = -1 }, refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() }, save: function (a, b, c) {
                var d = this.editor; if (this.locked ||
                    "ready" != d.status || "wysiwyg" != d.mode) return !1; var e = d.editable(); if (!e || "ready" != e.status) return !1; e = this.snapshots; b || (b = new f(d)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && d.fire("change"); e.splice(this.index + 1, e.length - this.index - 1); e.length == this.limit && e.shift(); this.index = e.push(b) - 1; this.currentImage = b; !1 !== c && this.refreshState(); return !0
            }, restoreImage: function (a) {
                var b = this.editor,
                    c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents); a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState(); b.fire("change")
            }, getNextImage: function (a) {
                var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; 0 <= d; d--) {
                    if (a = b[d], !c.equalsContent(a)) return a.index =
                        d, a
                } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a)) return a.index = d, a; return null
            }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () { if (this.undoable()) { this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 }, redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) {
                if (!this.locked) {
                    a ||
                        (a = new f(this.editor)); for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b - 1]);)--b; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a
                }
            }, updateSelection: function (a) { if (!this.snapshots.length) return !1; var b = this.snapshots, c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1 }, lock: function (a, b) {
                if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else {
                    var c = null; if (b) c = !0; else {
                        var d = new f(this.editor,
                            !0); this.currentImage && this.currentImage.equalsContent(d) && (c = d)
                    } this.locked = { update: c, level: 1 }
                }
            }, unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { var b = new f(this.editor, !0); a.equalsContent(b) || this.update() } } }
        }; e.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; e.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; e.isNavigationKey = function (a) { return !!e.navigationKeyCodes[a] }; e.getKeyGroup = function (a) {
            var b = e.keyGroups;
            return n[a] ? b.FUNCTIONAL : b.PRINTABLE
        }; e.getOppositeKeyGroup = function (a) { var b = e.keyGroups; return a == b.FUNCTIONAL ? b.PRINTABLE : b.FUNCTIONAL }; e.ieFunctionalKeysBug = function (a) { return CKEDITOR.env.ie && e.getKeyGroup(a) == e.keyGroups.FUNCTIONAL }; var f = CKEDITOR.plugins.undo.Image = function (a, b) { this.editor = a; a.fire("beforeUndoImage"); var c = a.getSnapshot(); CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, "")); this.contents = c; b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0)); a.fire("afterUndoImage") },
            h = /\b(?:href|src|name)="[^"]*?"/gi; f.prototype = {
                equalsContent: function (a) { var b = this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(h, ""), a = a.replace(h, "")); return b != a ? !1 : !0 }, equalsSelection: function (a) {
                    var b = this.bookmarks; a = a.bookmarks; if (b || a) {
                        if (!b || !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) {
                            var d = b[c], e = a[c]; if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end,
                                e.end)) return !1
                        }
                    } return !0
                }
            }; var k = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new m; this.lastKeydownImage = null }; k.prototype = {
                onKeydown: function (a) {
                    var b = a.data.getKey(); if (229 !== b) if (-1 < CKEDITOR.tools.indexOf(g, a.data.getKeystroke())) a.data.preventDefault(); else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(b) || this.keyEventsStack.push(b), this.lastKeydownImage = new f(a.editor), e.isNavigationKey(b) ||
                        this.undoManager.keyGroupChanged(b)) if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1, this.lastKeydownImage, !1), a.resetType()
                }, onInput: function () { if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else { var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0)); this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) } }, onKeyup: function (a) {
                    var b = this.undoManager;
                    a = a.data.getKey(); var c = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a); if (!(e.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new f(b.editor, !0)))) if (0 < c) b.type(a); else if (e.isNavigationKey(a)) this.onNavigationKey(!0)
                }, onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new f(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () {
                    this.ignoreInputEvent =
                        !1
                }, attachListeners: function () {
                    var a = this.undoManager.editor, b = a.editable(), c = this; b.attachListener(b, "keydown", function (a) { c.onKeydown(a); if (e.ieFunctionalKeysBug(a.data.getKey())) c.onInput() }, null, null, 999); b.attachListener(b, CKEDITOR.env.ie ? "keypress" : "input", c.onInput, c, null, 999); b.attachListener(b, "keyup", c.onKeyup, c, null, 999); b.attachListener(b, "paste", c.ignoreInputEventListener, c, null, 999); b.attachListener(b, "drop", c.ignoreInputEventListener, c, null, 999); a.on("afterPaste", c.activateInputEventListener,
                        c, null, 999); b.attachListener(b.isInline() ? b : a.document.getDocumentElement(), "click", function () { c.onNavigationKey() }, null, null, 999); b.attachListener(this.undoManager.editor, "blur", function () { c.keyEventsStack.remove(9) }, null, null, 999)
                }
            }; var m = CKEDITOR.plugins.undo.KeyEventsStack = function () { this.stack = [] }; m.prototype = {
                push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) {
                    if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode ==
                        a) return b; return -1
                }, getLast: function (a) { a = this.getLastIndex(a); return -1 != a ? this.stack[a] : null }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) { a = this.getLastIndex(a); -1 != a && this.stack.splice(a, 1) }, resetInputs: function (a) { if ("number" == typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0 }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) {
                    a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17);
                    a.shiftKey || this.remove(16); a.altKey || this.remove(18)
                }
            }
    })(); CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var d = function (c) {
                var a = this._, b = a.menu; a.state !== CKEDITOR.TRISTATE_DISABLED && (a.on && b ? b.hide() : (a.previousState = a.state, b || (b = a.menu = new CKEDITOR.menu(c, { panel: { className: "cke_menu_panel", attributes: { "aria-label": c.lang.common.options } } }), b.onHide = CKEDITOR.tools.bind(function () { var b = this.command ? c.getCommand(this.command).modes : this.modes; this.setState(!b || b[c.mode] ? a.previousState : CKEDITOR.TRISTATE_DISABLED); a.on = 0 }, this),
                    this.onMenu && b.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), a.on = 1, setTimeout(function () { b.show(CKEDITOR.document.getById(a.id), 4) }, 0)))
            }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function (c) { delete c.panel; this.base(c); this.hasArrow = !0; this.click = d }, statics: { handler: { create: function (c) { return new CKEDITOR.ui.menuButton(c) } } } })
        }, beforeInit: function (d) { d.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
    });
    CKEDITOR.UI_MENUBUTTON = "menubutton"; (function () {
        function m(a, d) { CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, d, !0); this.inline = this.editable.isInline(); this.inline || (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"] } function n(a, d) { CKEDITOR.tools.extend(this, d, { editor: a }, !0) } function p(a, d) {
            var b = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: b, inline: b.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() },
                d, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var c = CKEDITOR.tools.bind(this.queryViewport, this), e = CKEDITOR.tools.bind(this.hideVisible, this), g = CKEDITOR.tools.bind(this.removeAll, this); b.attachListener(this.winTop, "resize", c); b.attachListener(this.winTop, "scroll", c); b.attachListener(this.winTop, "resize", e); b.attachListener(this.win, "scroll", e); b.attachListener(this.inline ? b : this.frame, "mouseout", function (a) {
                    var b = a.data.$.clientX; a = a.data.$.clientY;
                    this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width || 0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                }, this); b.attachListener(a, "resize", c); b.attachListener(a, "mode", g); a.on("destroy", g); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                    lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                        t, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, q, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, q, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                })
        } function l(a) {
            var d; if (d = a && a.type == CKEDITOR.NODE_ELEMENT) d = !(r[a.getComputedStyle("float")] || r[a.getAttribute("align")]); return d &&
                !u[a.getComputedStyle("position")]
        } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE = 1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; m.prototype = {
            start: function (a) {
                var d = this, b = this.editor, c = this.doc, e, g, f, h, k = CKEDITOR.tools.eventsBuffer(50, function () { b.readOnly || "wysiwyg" != b.mode || (d.relations = {}, (g = c.$.elementFromPoint(f, h)) && g.nodeType && (e = new CKEDITOR.dom.element(g), d.traverseSearch(e), isNaN(f + h) || d.pixelSearch(e, f, h), a && a(d.relations, f, h))) }); this.listener = this.editable.attachListener(this.target,
                    "mousemove", function (a) { f = a.data.$.clientX; h = a.data.$.clientY; k.input() }); this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { k.reset() })
            }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () {
                var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (d) {
                    var b = this.editor.createRange(); b.moveToPosition(this.relations[d.uid].element,
                        a[d.type]); return b
                }
            }(), store: function () { function a(a, b, c) { var e = a.getUniqueId(); e in c ? c[e].type |= b : c[e] = { element: a, type: b } } return function (d, b) { var c; b & CKEDITOR.LINEUTILS_AFTER && l(c = d.getNext()) && c.isVisible() && (a(c, CKEDITOR.LINEUTILS_BEFORE, this.relations), b ^= CKEDITOR.LINEUTILS_AFTER); b & CKEDITOR.LINEUTILS_INSIDE && l(c = d.getFirst()) && c.isVisible() && (a(c, CKEDITOR.LINEUTILS_BEFORE, this.relations), b ^= CKEDITOR.LINEUTILS_INSIDE); a(d, b, this.relations) } }(), traverseSearch: function (a) {
                var d, b, c; do if (c = a.$["data-cke-expando"],
                    !(c && c in this.relations)) { if (a.equals(this.editable)) break; if (l(a)) for (d in this.lookups) (b = this.lookups[d](a)) && this.store(a, b) } while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
            }, pixelSearch: function () {
                function a(a, c, e, g, f) { for (var h = 0, k; f(e);) { e += g; if (25 == ++h) break; if (k = this.doc.$.elementFromPoint(c, e)) if (k == a) h = 0; else if (d(a, k) && (h = 0, l(k = new CKEDITOR.dom.element(k)))) return k } } var d = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, c) { return a.contains(c) } :
                    function (a, c) { return !!(a.compareDocumentPosition(c) & 16) }; return function (b, c, d) { var g = this.win.getViewPaneSize().height, f = a.call(this, b.$, c, d, -1, function (a) { return 0 < a }); c = a.call(this, b.$, c, d, 1, function (a) { return a < g }); if (f) for (this.traverseSearch(f); !f.getParent().equals(b);)f = f.getParent(); if (c) for (this.traverseSearch(c); !c.getParent().equals(b);)c = c.getParent(); for (; f || c;) { f && (f = f.getNext(l)); if (!f || f.equals(c)) break; this.traverseSearch(f); c && (c = c.getPrevious(l)); if (!c || c.equals(f)) break; this.traverseSearch(c) } }
            }(),
            greedySearch: function () { this.relations = {}; for (var a = this.editable.getElementsByTag("*"), d = 0, b, c, e; b = a.getItem(d++);)if (!b.equals(this.editable) && b.type == CKEDITOR.NODE_ELEMENT && (b.hasAttribute("contenteditable") || !b.isReadOnly()) && l(b) && b.isVisible()) for (e in this.lookups) (c = this.lookups[e](b)) && this.store(b, c); return this.relations }
        }; n.prototype = {
            locate: function () {
                function a(a, b) {
                    var c = a.element[b === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return c && l(c) ? (a.siblingRect = c.getClientRect(),
                        b == CKEDITOR.LINEUTILS_BEFORE ? (a.siblingRect.bottom + a.elementRect.top) / 2 : (a.elementRect.bottom + a.siblingRect.top) / 2) : b == CKEDITOR.LINEUTILS_BEFORE ? a.elementRect.top : a.elementRect.bottom
                } return function (d) {
                    var b; this.locations = {}; for (var c in d) b = d[c], b.elementRect = b.element.getClientRect(), b.type & CKEDITOR.LINEUTILS_BEFORE && this.store(c, CKEDITOR.LINEUTILS_BEFORE, a(b, CKEDITOR.LINEUTILS_BEFORE)), b.type & CKEDITOR.LINEUTILS_AFTER && this.store(c, CKEDITOR.LINEUTILS_AFTER, a(b, CKEDITOR.LINEUTILS_AFTER)), b.type &
                        CKEDITOR.LINEUTILS_INSIDE && this.store(c, CKEDITOR.LINEUTILS_INSIDE, (b.elementRect.top + b.elementRect.bottom) / 2); return this.locations
                }
            }(), sort: function () { var a, d, b, c; return function (e, g) { a = this.locations; d = []; for (var f in a) for (var h in a[f]) if (b = Math.abs(e - a[f][h]), d.length) { for (c = 0; c < d.length; c++)if (b < d[c].dist) { d.splice(c, 0, { uid: +f, type: h, dist: b }); break } c == d.length && d.push({ uid: +f, type: h, dist: b }) } else d.push({ uid: +f, type: h, dist: b }); return "undefined" != typeof g ? d.slice(0, g) : d } }(), store: function (a,
                d, b) { this.locations[a] || (this.locations[a] = {}); this.locations[a][d] = b }
        }; var q = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, t = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; p.prototype = {
            removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) {
                var d = a.getUniqueId();
                a.hide(); this.hidden[d] = a; delete this.visible[d]
            }, showLine: function (a) { var d = a.getUniqueId(); a.show(); this.visible[d] = a; delete this.hidden[d] }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, d) {
                var b, c, e; if (b = this.getStyle(a.uid, a.type)) {
                    for (e in this.visible) if (this.visible[e].getCustomData("hash") !== this.hash) { c = this.visible[e]; break } if (!c) for (e in this.hidden) if (this.hidden[e].getCustomData("hash") !== this.hash) {
                        this.showLine(c = this.hidden[e]);
                        break
                    } c || this.showLine(c = this.addLine()); c.setCustomData("hash", this.hash); this.visible[c.getUniqueId()] = c; c.setStyles(b); d && d(c)
                }
            }, getStyle: function (a, d) {
                var b = this.relations[a], c = this.locations[a][d], e = {}; e.width = b.siblingRect ? Math.max(b.siblingRect.width, b.elementRect.width) : b.elementRect.width; e.top = this.inline ? c + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + c; if (e.top - this.winTopScroll.y < this.rect.top || e.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ?
                    e.left = b.elementRect.left - this.rect.relativeX : (0 < b.elementRect.left ? e.left = this.rect.left + b.elementRect.left : (e.width += b.elementRect.left, e.left = this.rect.left), 0 < (b = e.left + e.width - (this.rect.left + this.winPane.width)) && (e.width -= b)); e.left += this.winTopScroll.x; for (var g in e) e[g] = CKEDITOR.tools.cssLength(e[g]); return e
            }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, d) { this.relations = a; this.locations = d; this.hash = Math.random() },
            cleanup: function () { var a, d; for (d in this.visible) a = this.visible[d], a.getCustomData("hash") !== this.hash && this.hideLine(a) }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                a = a.getClientRect(); var d = this.container.getDocumentPosition(), b = this.container.getComputedStyle("position"); a.relativeX = a.relativeY =
                    0; "static" != b && (a.relativeY = d.y, a.relativeX = d.x, a.top -= a.relativeY, a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
            }
        }; var r = { left: 1, right: 1, center: 1 }, u = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: m, locator: n, liner: p }
    })(); (function () {
        function f(a) { return a.getName && !a.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
            init: function (a) {
                if (CKEDITOR.env.webkit) {
                    var b = CKEDITOR.plugins.widgetselection; a.on("contentDom", function (a) {
                        a = a.editor; var d = a.document, e = a.editable(); e.attachListener(d, "keydown", function (a) { a.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () { b.addFillers(e) || b.removeFillers(e) }, 0) }, null, null, -1); a.on("selectionCheck", function (a) { b.removeFillers(a.editor.editable()) });
                        a.on("paste", function (a) { a.data.dataValue = b.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && b.addSelectAllIntegration(a)
                    })
                }
            }
        }); CKEDITOR.plugins.widgetselection = {
            startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit", fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (a) {
                var b = a.editor; if (!this.isWholeContentSelected(a) && 0 < a.getChildCount()) {
                    var c = a.getFirst(f), d = a.getLast(f); c && c.type == CKEDITOR.NODE_ELEMENT && !c.isEditable() && (this.startFiller = this.createFiller(),
                        a.append(this.startFiller, 1)); d && d.type == CKEDITOR.NODE_ELEMENT && !d.isEditable() && (this.endFiller = this.createFiller(!0), a.append(this.endFiller, 0)); if (this.hasFiller(a)) return b = b.createRange(), b.selectNodeContents(a), b.select(), !0
                } return !1
            }, removeFillers: function (a) {
                if (this.hasFiller(a) && !this.isWholeContentSelected(a)) {
                    var b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), c = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && b && this.startFiller.equals(b) ?
                        this.removeFiller(this.startFiller, a) : this.startFiller = b; this.endFiller && c && this.endFiller.equals(c) ? this.removeFiller(this.endFiller, a) : this.endFiller = c
                }
            }, cleanPasteData: function (a) { a && a.length && (a = a.replace(this.createFillerRegex(), "").replace(this.createFillerRegex(!0), "")); return a }, isWholeContentSelected: function (a) {
                var b = a.editor.getSelection().getRanges()[0]; return !b || b && b.collapsed ? !1 : (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(b && a && b.startContainer && b.endContainer && 0 === b.startOffset &&
                    b.endOffset === a.getChildCount() && b.startContainer.equals(a) && b.endContainer.equals(a)))
            }, hasFiller: function (a) { return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (a) {
                var b = new CKEDITOR.dom.element(this.fillerTagName); b.setHtml(this.fillerContent); b.setAttribute(this.fillerAttribute, a ? "end" : "start"); b.setAttribute("data-cke-temp", 1); b.setStyles({
                    display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0,
                    overflow: "hidden"
                }); return b
            }, removeFiller: function (a, b) {
                if (a) {
                    var c = b.editor, d = b.editor.getSelection().getRanges()[0].startPath(), e = c.createRange(), g, f; d.contains(a) && (g = a.getHtml(), f = !0); d = "start" == a.getAttribute(this.fillerAttribute); a.remove(); g && 0 < g.length && g != this.fillerContent ? (b.insertHtmlIntoRange(g, c.getSelection().getRanges()[0]), e.setStartAt(b.getChild(b.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), c.getSelection().selectRanges([e])) : f && (d ? e.setStartAt(b.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) :
                        e.setEndAt(b.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), b.editor.getSelection().selectRanges([e]))
                }
            }, createFillerRegex: function (a) { var b = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi, "\x3e[^\x3c]*\x3c"); return new RegExp((a ? "" : "^") + b + (a ? "$" : "")) }, addSelectAllIntegration: function (a) { var b = this; a.editable().attachListener(a, "beforeCommandExec", function (c) { var d = a.editable(); "selectAll" == c.data.name && d && b.addFillers(d) }, null, null, 9999) }
        }
    })(); (function () {
        function p(a) { this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; I(this); J(this); this.on("checkWidgets", K); this.editor.on("contentDomInvalidated", this.checkWidgets, this); L(this); M(this); N(this); O(this); P(this) } function g(a, b, c, d, e) {
            var f = a.editor; CKEDITOR.tools.extend(this, d, {
                editor: f, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({},
                    "function" == typeof d.defaults ? d.defaults() : d.defaults), dataReady: !1, inited: !1, ready: !1, edit: g.prototype.edit, focusedEditable: null, definition: d, repository: a, draggable: !1 !== d.draggable, _: { downcastFn: d.downcast && "string" == typeof d.downcast ? d.downcasts[d.downcast] : d.downcast }
            }, !0); a.fire("instanceCreated", this); Q(this, d); this.init && this.init(); this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); e && this.setData(e); this.data.classes || this.setData("classes",
                this.getClasses()); this.dataReady = !0; r(this); this.fire("data", this.data); this.isInited() && f.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
        } function q(a, b, c) { CKEDITOR.dom.element.call(this, b.$); this.editor = a; this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR } function R(a,
            b) {
            a.addCommand(b.name, {
                exec: function (a, d) {
                    function e() { a.widgets.finalizeCreation(k) } var f = a.widgets.focused; if (f && f.name == b.name) f.edit(); else if (b.insert) b.insert(); else if (b.template) {
                        var f = "function" == typeof b.defaults ? b.defaults() : b.defaults, f = CKEDITOR.dom.element.createFromHtml(b.template.output(f)), h, l = a.widgets.wrapElement(f, b.name), k = new CKEDITOR.dom.documentFragment(l.getDocument()); k.append(l); (h = a.widgets.initOn(f, b, d && d.startupData)) ? (f = h.once("edit", function (b) {
                            if (b.data.dialog) h.once("dialog",
                                function (b) { b = b.data; var d, f; d = b.once("ok", e, null, null, 20); f = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(h, !0) }); b.once("hide", function () { d.removeListener(); f.removeListener() }) }); else e()
                        }, null, null, 999), h.edit(), f.removeListener()) : e()
                    }
                }, allowedContent: b.allowedContent, requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
            })
        } function S(a, b) {
            function c(a, c) {
                var d = b.upcast.split(","), e, f; for (f = 0; f < d.length; f++)if (e =
                    d[f], e === a.name) return b.upcasts[e].call(this, a, c); return !1
            } function d(b, c, d) { var e = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > d }); 0 > e && (e = a._.upcasts.length); a._.upcasts.splice(e, 0, [CKEDITOR.tools.bind(b, c), c.name, d]) } var e = b.upcast, f = b.upcastPriority || 10; e && ("string" == typeof e ? d(c, b, f) : d(e, b, f))
        } function t(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } } function K(a) {
            a = a.data; if ("wysiwyg" ==
                this.editor.mode) {
                var b = this.editor.editable(), c = this.instances, d, e, f, h; if (b) {
                    for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0); if (a && a.initOnlyNew) c = this.initOnAll(); else { var l = b.find(".cke_widget_wrapper"), c = []; d = 0; for (e = l.count(); d < e; d++) { f = l.getItem(d); if (h = !this.getByElement(f, !0)) { a: { h = T; for (var k = f; k = k.getParent();)if (h(k)) { h = !0; break a } h = !1 } h = !h } h && b.contains(f) && (f.addClass("cke_widget_new"), c.push(this.initOn(f.getFirst(g.isDomWidgetElement)))) } } a && a.focusInited &&
                        1 == c.length && c[0].focus()
                }
            }
        } function u(a) { if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) { var b = v(a), c = w(a), d = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] = 1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), d = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] = 1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), d = !0); d && (a.attributes["data-cke-widget-white-space"] = 1) } } function v(a) {
            return a.find(function (a) {
                return 3 ===
                    a.type
            }, !0).shift()
        } function w(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function x(a, b, c) { if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d = {}); a = d[b]; a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent)); return a } function U(a) {
            var b = [], c = a._.upcasts, d = a._.upcastCallbacks; return {
                toBeWrapped: b, iterator: function (a) {
                    var f, h, l, k, m; if ("data-cke-widget-wrapper" in
                        a.attributes) return (a = a.getFirst(g.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (m = c.length) { if (a.attributes["data-cke-widget-upcasted"]) return !1; k = 0; for (f = d.length; k < f; ++k)if (!1 === d[k](a)) return; for (k = 0; k < m; ++k)if (f = c[k], l = {}, h = f[0](a, l)) return h instanceof CKEDITOR.htmlParser.element && (a = h), a.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(l)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, f[1]]), !1 }
                }
            }
        } function y(a, b) {
            return {
                tabindex: -1,
                contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "")
            }
        } function z(a, b, c) { if (a.type == CKEDITOR.NODE_ELEMENT) { var d = CKEDITOR.dtd[a.name]; if (d && !d[c.name]) { var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length || d.remove(); return z(e, b, c) } } a.add(c, b) } function A(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function T(a) { return a.hasAttribute("data-cke-temp") }
        function n(a, b, c, d) { var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable = b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"), b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot") }
        function V(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function W(a, b) { return CKEDITOR.tools.trim(b) } function O(a) {
            var b = a.editor, c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) { var e = c.data.target; g.isDomDragHandler(e) && (e = a.getByElement(e), c.data.dataTransfer.setData("cke/widget-id", e.id), b.focus(), e.focus()) }); b.on("drop", function (c) {
                var e = c.data.dataTransfer, f = e.getData("cke/widget-id"), h = e.getTransferType(b),
                    e = b.createRange(); "" !== f && h === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c.cancel() : "" !== f && h == CKEDITOR.DATA_TRANSFER_INTERNAL && (f = a.instances[f]) && (e.setStartBefore(f.wrapper), e.setEndAfter(f.wrapper), c.data.dragRange = e, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, c.data.dataTransfer.setData("text/html", b.editable().getHtmlFromRange(e).getHtml()), b.widgets.destroy(f, !0))
            }); b.on("contentDom", function () {
                var d = b.editable(); CKEDITOR.tools.extend(a,
                    {
                        finder: new c.finder(b, { lookups: { "default": function (b) { if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !g.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) { var c = g.getNestedEditable(d, b); if (c) { b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent; if (c && b && !c.check(b)) return } return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER } } } }), locator: new c.locator(b), liner: new c.liner(b, {
                            lineStyle: {
                                cursor: "move !important",
                                "border-top-color": "#666"
                            }, tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" }
                        })
                    }, !0)
            })
        } function M(a) {
            var b = a.editor; b.on("contentDom", function () {
                var c = b.editable(), d = c.isInline() ? c : b.document, e, f; c.attachListener(d, "mousedown", function (c) {
                    var d = c.data.getTarget(); e = d instanceof CKEDITOR.dom.element ? a.getByElement(d) : null; f = 0; e && (e.inline && d.type == CKEDITOR.NODE_ELEMENT && d.hasAttribute("data-cke-widget-drag-handler") ? (f = 1, a.focused != e && b.getSelection().removeAllRanges()) :
                        g.getNestedEditable(e.wrapper, d) ? e = null : (c.data.preventDefault(), CKEDITOR.env.ie || e.focus()))
                }); c.attachListener(d, "mouseup", function () { f && e && e.wrapper && (f = 0, e.focus()) }); CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () { setTimeout(function () { e && e.wrapper && c.contains(e.wrapper) && (e.focus(), e = null) }) })
            }); b.on("doubleclick", function (b) { var d = a.getByElement(b.data.element); if (d && !g.getNestedEditable(d.wrapper, b.data.element)) return d.fire("doubleclick", { element: b.data.element }) }, null, null, 1)
        }
        function N(a) {
            a.editor.on("key", function (b) { var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 == c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed && d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e }, null,
                null, 1)
        } function P(a) { function b(b) { a.focused && B(a.focused, "cut" == b.name) } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) }) } function L(a) {
            var b = a.editor; b.on("selectionCheck", function () { a.fire("checkSelection") }); a.on("checkSelection", a.checkSelection, a); b.on("selectionChange", function (c) {
                var d = (c = g.getNestedEditable(b.editable(), c.data.selection.getStartElement())) && a.getByElement(c), e = a.widgetHoldingFocusedEditable; e ? e === d &&
                    e.focusedEditable.equals(c) || (n(a, e, null), d && c && n(a, d, c)) : d && c && n(a, d, c)
            }); b.on("dataReady", function () { C(a).commit() }); b.on("blur", function () { var b; (b = a.focused) && t(a, b); (b = a.widgetHoldingFocusedEditable) && n(a, b, null) })
        } function J(a) {
            var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                var e = CKEDITOR.tools.getNextNumber(), f = []; b.data.downcastingSessionId = e; c[e] = f; b.data.dataValue.forEach(function (b) {
                    var c = b.attributes, d; if ("data-cke-widget-white-space" in c) {
                        d = v(b); var e = w(b); d.parent.attributes["data-cke-white-space-first"] &&
                            (d.value = d.value.replace(/^&nbsp;/g, " ")); e.parent.attributes["data-cke-white-space-last"] && (e.value = e.value.replace(/&nbsp;$/g, " "))
                    } if ("data-cke-widget-id" in c) { if (c = a.instances[c["data-cke-widget-id"]]) d = b.getFirst(g.isParserWidgetElement), f.push({ wrapper: b, element: d, widget: c, editables: {} }), "1" != d.attributes["data-cke-widget-keep-attr"] && delete d.attributes["data-widget"] } else if ("data-cke-widget-editable" in c) return f[f.length - 1].editables[c["data-cke-widget-editable"]] = b, !1
                }, CKEDITOR.NODE_ELEMENT,
                    !0)
            }, null, null, 8); b.on("toDataFormat", function (a) { if (a.data.downcastingSessionId) { a = c[a.data.downcastingSessionId]; for (var b, f, h, l, g, m; b = a.shift();) { f = b.widget; h = b.element; l = f._.downcastFn && f._.downcastFn.call(f, h); for (m in b.editables) g = b.editables[m], delete g.attributes.contenteditable, g.setHtml(f.editables[m].getData()); l || (l = h); b.wrapper.replaceWith(l) } } }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
        } function I(a) {
            var b = a.editor, c, d; b.on("toHtml", function (b) {
                var d = U(a), h;
                for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); h = d.toBeWrapped.pop();) { var l = h[0], k = l.parent; k.type == CKEDITOR.NODE_ELEMENT && k.attributes["data-cke-widget-wrapper"] && k.replaceWith(l); a.wrapElement(h[0], h[1]) } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length && g.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && g.isParserWidgetWrapper(b.data.dataValue.children[0])
            }, null, null, 8); b.on("dataReady", function () {
                if (d) for (var c = b.editable().find(".cke_widget_wrapper"),
                    f, h, l = 0, k = c.count(); l < k; ++l)f = c.getItem(l), h = f.getFirst(g.isDomWidgetElement), h.type == CKEDITOR.NODE_ELEMENT && h.data("widget") ? (h.replace(f), a.wrapElement(h)) : f.remove(); d = 0; a.destroyAll(!0); a.initOnAll()
            }); b.on("loadSnapshot", function (b) { /data-cke-widget/.test(b.data) && (d = 1); a.destroyAll(!0) }, null, null, 9); b.on("paste", function (a) {
                a = a.data; a.dataValue = a.dataValue.replace(X, W); a.range && (a = g.getNestedEditable(b.editable(), a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) &&
                    b.setActiveFilter(a)
            }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
        } function C(a) {
            var b = a.selected, c = [], d = b.slice(0), e = null; return {
                select: function (a) { 0 > CKEDITOR.tools.indexOf(b, a) && c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this }, focus: function (a) { e = a; return this }, commit: function () {
                    var f = a.focused !== e, h, g; a.editor.fire("lockSnapshot"); for (f &&
                        (h = a.focused) && t(a, h); h = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, h), 1), h.isInited() && (g = h.editor.checkDirty(), h.setSelected(!1), !g && h.editor.resetDirty()); f && e && (g = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", { widget: e }), e.setFocused(!0), !g && a.editor.resetDirty()); for (; h = c.pop();)b.push(h), h.setSelected(!0); a.editor.fire("unlockSnapshot")
                }
            }
        } function D(a, b, c) {
            var d = 0; b = E(b); var e = a.data.classes || {}, f; if (b) {
                for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f],
                    d = 1); d && a.setData("classes", e)
            }
        } function F(a) { a.cancel() } function B(a, b) {
            var c = a.editor, d = c.document, e = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version; if (!d.getById("cke_copybin")) {
                var f = !c.blockless && !CKEDITOR.env.ie || e ? "div" : "span", e = d.createElement(f), h = d.createElement(f), f = CKEDITOR.env.ie && 9 > CKEDITOR.env.version; h.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); e.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); e.setStyle("ltr" == c.config.contentsLangDirection ? "left" :
                    "right", "-5000px"); var g = c.createRange(); g.setStartBefore(a.wrapper); g.setEndAfter(a.wrapper); e.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + c.editable().getHtmlFromRange(g).getHtml() + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e'); c.fire("saveSnapshot"); c.fire("lockSnapshot"); h.append(e); c.editable().append(h); var k = c.on("selectionChange", F, null, null, 0), m = a.repository.on("checkSelection", F, null, null, 0); if (f) var n = d.getDocumentElement().$, p = n.scrollTop; g = c.createRange();
                g.selectNodeContents(e); g.select(); f && (n.scrollTop = p); setTimeout(function () { b || a.focus(); h.remove(); k.removeListener(); m.removeListener(); c.fire("unlockSnapshot"); b && !c.readOnly && (a.repository.del(a), c.fire("saveSnapshot")) }, 100)
            }
        } function E(a) { return (a = (a = a.getDefinition().attributes) && a["class"]) ? a.split(/\s+/) : null } function G() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function H() {
            CKEDITOR.env.gecko &&
                this.editor.unlockSelection(); CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1))
        } function Y(a) { var b = null; a.on("data", function () { var a = this.data.classes, d; if (b != a) { for (d in b) a && a[d] || this.removeClass(d); for (d in a) this.addClass(d); b = a } }) } function Z(a) {
            a.on("data", function () {
                if (a.wrapper) {
                    var b = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role", "region"); a.wrapper.setAttribute("aria-label",
                        b)
                }
            }, null, null, 9999)
        } function aa(a) {
            if (a.draggable) {
                var b = a.editor, c = a.wrapper.getLast(g.isDomDragHandlerContainer), d; c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({ "class": "cke_reset cke_widget_drag_handler_container", style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png)" }), d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({
                    "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1",
                    src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation"
                }), a.inline && d.setAttribute("draggable", "true"), c.append(d), a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() }); a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a); setTimeout(function () { a.on("data", a.updateDragHandlerPosition, a) }, 50); if (!a.inline && (d.on("mousedown", ba, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart", function (a) { a.data.preventDefault(!0) });
                a.dragHandlerContainer = c
            }
        } function ba(a) {
            function b() { var b; for (q.reset(); b = g.pop();)b.removeListener(); var c = k; b = a.sender; var d = this.repository.finder, e = this.repository.liner, f = this.editor, h = this.editor.editable(); CKEDITOR.tools.isEmpty(e.visible) || (c = d.getRange(c[0]), this.focus(), f.fire("drop", { dropRange: c, target: c.startContainer })); h.removeClass("cke_widget_dragging"); e.hideVisible(); f.fire("dragend", { target: b }) } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                var c = this.repository.finder,
                    d = this.repository.locator, e = this.repository.liner, f = this.editor, h = f.editable(), g = [], k = [], m, n; this.repository._.draggedWidget = this; var p = c.greedySearch(), q = CKEDITOR.tools.eventsBuffer(50, function () { m = d.locate(p); k = d.sort(n, 1); k.length && (e.prepare(p, m), e.placeLine(k[0]), e.cleanup()) }); h.addClass("cke_widget_dragging"); g.push(h.on("mousemove", function (a) { n = a.data.$.clientY; q.input() })); f.fire("dragstart", { target: a.sender }); g.push(f.document.once("mouseup", b, this)); h.isInline() || g.push(CKEDITOR.document.once("mouseup",
                        b, this))
            }
        } function ca(a) { var b, c, d = a.editables; a.editables = {}; if (a.editables) for (b in d) c = d[b], a.initEditable(b, "string" == typeof c ? { selector: c } : c) } function da(a) { if (a.mask) { var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img", a.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_mask" }), a.wrapper.append(b)); a.mask = b } } function ea(a) {
            if (a.parts) {
                var b = {}, c, d; for (d in a.parts) c = a.wrapper.findOne(a.parts[d]), b[d] = c; a.parts =
                    b
            }
        } function Q(a, b) {
            fa(a); ea(a); ca(a); da(a); aa(a); Y(a); Z(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart", function (b) { var d = b.data.getTarget(); g.getNestedEditable(a, d) || a.inline && g.isDomDragHandler(d) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new"); a.element.addClass("cke_widget_element"); a.on("key", function (b) {
                b = b.data.keyCode; if (13 == b) a.edit(); else {
                    if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) { B(a, b == CKEDITOR.CTRL + 88); return } if (b in ga || CKEDITOR.CTRL & b || CKEDITOR.ALT &
                        b) return
                } return !1
            }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
        } function fa(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function r(a) { a.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(a.data))) } function ha() {
            function a() { } function b(a, b, c) { return c && this.checkElement(a) ? (a = c.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } var c = {}; CKEDITOR.style.addCustomHandler({
                type: "widget",
                setup: function (a) { this.widget = a.widget; if (this.group = "string" == typeof a.group ? [a.group] : a.group) { a = this.widget; var b; c[a] || (c[a] = {}); for (var f = 0, h = this.group.length; f < h; f++)b = this.group[f], c[a][b] || (c[a][b] = []), c[a][b].push(this) } }, apply: function (a) { var b; a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this)) }, remove: function (a) {
                    a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(),
                        a) && a.widgets.focused.removeStyle(this)
                }, removeStylesFromSameGroup: function (a) { var b, f, h = !1; if (!(a instanceof CKEDITOR.editor)) return !1; f = a.elementPath(); if (this.checkApplicable(f, a)) for (var g = 0, k = this.group.length; g < k; g++) { b = c[this.widget][this.group[g]]; for (var m = 0; m < b.length; m++)b[m] !== this && b[m].checkActive(f, a) && (a.widgets.focused.removeStyle(b[m]), h = !0) } return h }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) {
                    return b instanceof CKEDITOR.editor ?
                        this.checkElement(a.lastElement) : !1
                }, checkElementMatch: b, checkElementRemovable: b, checkElement: function (a) { return g.isDomWidgetWrapper(a) ? (a = a.getFirst(g.isDomWidgetElement)) && a.data("widget") == this.widget : !1 }, buildPreview: function (a) { return a || this._.definition.name }, toAllowedContentRules: function (a) {
                    if (!a) return null; a = a.widgets.registered[this.widget]; var b, c = {}; if (!a) return null; if (a.styleableElements) {
                        b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 };
                        return c
                    } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null
                }, getClassesArray: function () { var a = this._.definition.attributes && this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null }, applyToRange: a, removeFromRange: a, applyToObject: a
            })
        } CKEDITOR.plugins.add("widget", {
            requires: "lineutils,clipboard,widgetselection", onLoad: function () {
                void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}"),
                    ha())
            }, beforeInit: function (a) { void 0 !== CKEDITOR.document.$.querySelectorAll && (a.widgets = new p(a)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); V(a) } }
        }); p.prototype = {
            MIN_SELECTION_CHECK_INTERVAL: 500, add: function (a, b) {
                b = CKEDITOR.tools.prototypedCopy(b); b.name = a; b._ = b._ || {}; this.editor.fire("widgetDefinition",
                    b); b.template && (b.template = new CKEDITOR.template(b.template)); R(this.editor, b); S(this, b); return this.registered[a] = b
            }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) }, checkSelection: function () {
                var a = this.editor.getSelection(), b = a.getSelectedElement(), c = C(this), d; if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = g.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b));
                c.commit()
            }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) { if (this.focused === a) { var b = a.editor, c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c]) } a.wrapper.remove(); this.destroy(a, !0) }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && n(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a,
                b) { var c, d, e = this.instances; if (b && !a) { d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f), !0)) && this.destroy(c) } else for (d in e) c = e[d], this.destroy(c, a) }, finalizeCreation: function (a) { (a = a.getFirst()) && g.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () {
                    function a(a) { return a.is(b) && a.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, d) {
                        if (!b) return null;
                        var e = a(b); if (!d && !e) { var f = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(f) && !(e = a(b))) } return this.instances[e] || null
                    }
                }(), initOn: function (a, b, c) { b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")]; if (!b) return null; var d = this.wrapElement(a, b.name); return d ? d.hasClass("cke_widget_new") ? (a = new g(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null }, initOnAll: function (a) {
                    a = (a || this.editor.editable()).find(".cke_widget_new");
                    for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(g.isDomWidgetElement))) && b.push(c); return b
                }, onWidget: function (a) { var b = Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) { var d = this.instances[c]; d.name == a && d.on.apply(d, b) } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) }) }, parseElementClasses: function (a) {
                    if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ?
                        c : null
                }, wrapElement: function (a, b) {
                    var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                        b = b || a.data("widget"); d = this.registered[b]; if (!d) return null; if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c; a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = A(d, a.getName())) && u(a); c = new CKEDITOR.dom.element(e ? "span" : "div"); c.setAttributes(y(e, b)); c.data("cke-display-name", d.pathName ? d.pathName : a.getName());
                        a.getParent(!0) && c.replace(a); a.appendTo(c)
                    } else if (a instanceof CKEDITOR.htmlParser.element) {
                        b = b || a.attributes["data-widget"]; d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = A(d, a.name)) && u(a); c = new CKEDITOR.htmlParser.element(e ? "span" : "div", y(e, b)); c.attributes["data-cke-display-name"] =
                            d.pathName ? d.pathName : a.name; d = a.parent; var f; d && (f = a.getIndex(), a.remove()); c.add(a); d && z(d, f, c)
                    } return c
                }, _tests_createEditableFilter: x
        }; CKEDITOR.event.implementOn(p.prototype); g.prototype = {
            addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(g.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { D(this, a, 1) }, checkStyleActive: function (a) { a = E(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                this.fire("destroy"); if (this.editables) for (var b in this.editables) this.destroyEditable(b,
                    a); a || ("0" == this.element.data("cke-widget-keep-attr") && this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
            }, destroyEditable: function (a, b) {
                var c = this.editables[a]; c.removeListener("focus", H); c.removeListener("blur", G); this.editor.focusManager.remove(c); b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"),
                    c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
            }, edit: function () {
                var a = { dialog: this.dialog }, b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) {
                    var d, e; !1 !== b.fire("dialog", a) && (d = a.on("show", function () { a.setupContent(b) }), e = a.on("ok", function () {
                        var d, e = b.on("data", function (a) { d = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b);
                        e.removeListener(); d && (b.fire("data", b.data), b.editor.fire("saveSnapshot"))
                    }), a.once("hide", function () { d.removeListener(); e.removeListener() }))
                }); return !0
            }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) }, hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, b) {
                var c = this._findOneNotNested(b.selector); return c && c.is(CKEDITOR.dtd.$editable) ? (c = new q(this.editor, c, { filter: x.call(this.repository, this.name, a, b) }), this.editables[a] =
                    c, c.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": c.enterMode }), c.filter && c.data("cke-filter", c.filter.id), c.addClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), b.pathName && c.data("cke-display-name", b.pathName), this.editor.focusManager.add(c), c.on("focus", H, this), CKEDITOR.env.ie && c.on("blur", G, this), c._.initialSetData = !0, c.setData(c.getHtml()), !0) : !1
            }, _findOneNotNested: function (a) {
                a = this.wrapper.find(a); for (var b, c, d = 0; d < a.count(); d++)if (b =
                    a.getItem(d), c = b.getAscendant(g.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null
            }, isInited: function () { return !(!this.wrapper || !this.inited) }, isReady: function () { return this.isInited() && this.ready }, focus: function () { var a = this.editor.getSelection(); if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus() }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(g.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) {
                D(this,
                    a, 0)
            }, setData: function (a, b) { var c = this.data, d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (r(this), this.fire("data", c)); return this }, setFocused: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused"); this.fire(a ? "focus" : "blur"); return this }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                var a =
                    this.editor, b = this.element.$, c = this._.dragHandlerOffset, b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px", display: "block" }), a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
            }
        }; CKEDITOR.event.implementOn(g.prototype); g.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : g.isDomNestedEditable(b) ? b : g.getNestedEditable(a, b.getParent()) }; g.isDomDragHandler = function (a) {
            return a.type ==
                CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler")
        }; g.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; g.isDomNestedEditable = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable") }; g.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; g.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") };
        g.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; g.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] }; g.isParserWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; g.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; q.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
            setData: function (a) {
                this._.initialSetData ||
                    this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this)
            }, getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
        }); var X = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
            ga = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; CKEDITOR.plugins.widget = g; g.repository = p; g.nestedEditable = q
    })(); (function () {
        var q = !1; CKEDITOR.plugins.add("balloonpanel", { init: function () { q || (CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/balloonpanel.css"), q = !0) } }); CKEDITOR.ui.balloonPanel = function (a, b) {
            this.editor = a; CKEDITOR.tools.extend(this, { width: 360, height: "auto", triangleWidth: 20, triangleHeight: 20, triangleMinDistance: 40 }, b, !0); this.templates = {}; for (var c in this.templateDefinitions) this.templates[c] = new CKEDITOR.template(this.templateDefinitions[c]); this.parts = {}; this.focusables =
                {}; this.showListeners = {}; this.activeShowListeners = {}; this.rect = { visible: !1 }; this.build(); a.on("destroy", function () { this.destroy() }, this)
        }; CKEDITOR.ui.balloonPanel.prototype = {
            templateDefinitions: {
                panel: '\x3cdiv class\x3d"cke {id} cke_reset_all cke_chrome cke_balloon cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"dialog" style\x3d"{style}" tabindex\x3d"-1" aria-labelledby\x3d"cke_{name}_arialbl"\x3e\x3c/div\x3e',
                content: '\x3cdiv class\x3d"cke_balloon_content"\x3e{content}\x3c/div\x3e', title: '\x3cdiv class\x3d"cke_balloon_title" role\x3d"presentation"\x3e{title}\x3c/div\x3e', close: '\x3ca class\x3d"cke_balloon_close_button" href\x3d"javascript:void(0)" title\x3d"Close" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e', triangleOuter: '\x3cspan class\x3d"cke_balloon_triangle cke_balloon_triangle_outer"\x3e\x3c/span\x3e', triangleInner: '\x3cspan class\x3d"cke_balloon_triangle cke_balloon_triangle_inner"\x3e\x26#8203;\x3c/span\x3e'
            },
            build: function () {
                var a = this.editor; this.parts = {
                    title: CKEDITOR.dom.element.createFromHtml(this.templates.title.output({ title: this.title })), close: CKEDITOR.dom.element.createFromHtml(this.templates.close.output()), panel: CKEDITOR.dom.element.createFromHtml(this.templates.panel.output({ id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;", voiceLabel: a.lang.editorPanel + ", " + a.name })), content: CKEDITOR.dom.element.createFromHtml(this.templates.content.output({
                        content: this.content ||
                            ""
                    })), triangleOuter: CKEDITOR.dom.element.createFromHtml(this.templates.triangleOuter.output()), triangleInner: CKEDITOR.dom.element.createFromHtml(this.templates.triangleInner.output())
                }; this.parts.panel.append(this.parts.title, 1); this.parts.panel.append(this.parts.close, 1); this.parts.panel.append(this.parts.triangleOuter); this.parts.panel.append(this.parts.content); this.parts.triangleOuter.append(this.parts.triangleInner); this.registerFocusable(this.parts.panel); this.registerFocusable(this.parts.close);
                this.parts.title.unselectable(); this.parts.close.unselectable(); CKEDITOR.document.getBody().append(this.parts.panel); this.resize(this.width, this.height); this.on("show", this.activateShowListeners, this); this.on("hide", this.deactivateShowListeners, this); this.parts.close.on("click", function (a) { this.hide(); a.data.preventDefault() }, this)
            }, show: function () { this.rect.visible || (this.rect.visible = !0, this.parts.panel.show(), this.fire("show")) }, hide: function () {
                this.rect.visible && (this.rect.visible = !1, this.parts.panel.hide(),
                    this.blur(), this.fire("hide"))
            }, blur: function () { this.editor.focus() }, move: function (a, b) { this.rect.left = b; this.rect.top = a; this.parts.panel.setStyles({ left: CKEDITOR.tools.cssLength(b), top: CKEDITOR.tools.cssLength(a) }) }, attach: function () {
                function a(a, b) { var c = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)), d = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)); return c * d } function b(a, b, c, d) { a = { top: a, left: b }; a.right = a.left + c; a.bottom = a.top + d; return a } var c, l, t, r, q = {
                    right: "left",
                    top: "bottom", topLeft: "bottomLeft", topRight: "bottomRight", bottom: "top", bottomLeft: "topLeft", bottomRight: "topRight", left: "right"
                }; return function (u, h) {
                    if (h instanceof CKEDITOR.dom.element || !h) h = { focusElement: h }; h = CKEDITOR.tools.extend(h, { show: !0 }); !0 === h.show && this.show(); this.fire("attach"); c = CKEDITOR.document.getWindow(); l = this.editor.window.getFrame(); t = this.editor.editable(); r = t.isInline(); var p = this.getWidth(), d = this.getHeight(), f = this._getAbsoluteRect(u), m = this._getAbsoluteRect(r ? t : l), g = c.getViewPaneSize(),
                        k = c.getScrollPosition(), g = { top: Math.max(m.top, k.y), left: Math.max(m.left, k.x), right: Math.min(m.right, g.width + k.x), bottom: Math.min(m.bottom, g.height + k.y) }; r && this.editor.elementMode === CKEDITOR.ELEMENT_MODE_INLINE && (g = this._getViewPaneRect(c), g.right += this.triangleWidth, g.bottom += this.triangleHeight); this._adjustElementRect(f, r ? g : m); var m = p * d, f = this._getAlignments(f, p, d), e, n; for (n in f) {
                            k = b(f[n].top, f[n].left, p, d); k = f[n].areaDifference = m - a(k, g); if (0 === k) { e = n; break } e || (e = n); k < f[e].areaDifference && (e =
                                n)
                        } p = (d = this.parts.panel.getAscendant(function (a) { return a instanceof CKEDITOR.dom.document ? !1 : "static" !== a.getComputedStyle("position") })) ? parseInt(d.getComputedStyle("margin-left"), 10) : 0; d = d ? parseInt(d.getComputedStyle("margin-top"), 10) : 0; this.move(f[e].top - d, f[e].left - p); e = e.split(" "); this.setTriangle(q[e[0]], e[1]); !1 !== h.focusElement && (h.focusElement || this.parts.panel).focus()
                }
            }(), resize: function (a, b) {
                this.rect.width = a; this.rect.height = b; this.parts.panel.setStyles({
                    width: CKEDITOR.tools.cssLength(a),
                    height: CKEDITOR.tools.cssLength(b)
                })
            }, getWidth: function () { return "auto" === this.rect.width ? this.parts.panel.getClientRect().width : this.rect.width }, getHeight: function () { return "auto" === this.rect.height ? this.parts.panel.getClientRect().height : this.rect.height }, setTriangle: function (a, b) {
                var c = this.parts.triangleOuter, l = this.parts.triangleInner; this.triangleSide && (c.removeClass("cke_balloon_triangle_" + this.triangleSide), c.removeClass("cke_balloon_triangle_align_" + this.triangleAlign), l.removeClass("cke_balloon_triangle_" +
                    this.triangleSide)); this.triangleSide = a; this.triangleAlign = b; c.addClass("cke_balloon_triangle_" + a); c.addClass("cke_balloon_triangle_align_" + b); l.addClass("cke_balloon_triangle_" + a)
            }, registerFocusable: function (a) { this.editor.focusManager.add(a); this.focusables[a.getUniqueId()] = a }, deregisterFocusable: function (a) { this.editor.focusManager.remove(a); delete this.focusables[a.getUniqueId()] }, addShowListener: function (a) {
                var b = CKEDITOR.tools.getNextNumber(); this.showListeners[b] = a; this.rect.visible && this.activateShowListener(b);
                var c = this; return { removeListener: function () { c.removeShowListener(b) } }
            }, removeShowListener: function (a) { this.deactivateShowListener(a); delete this.showListeners[a] }, activateShowListener: function (a) { this.activeShowListeners[a] = this.showListeners[a].call(this) }, deactivateShowListener: function (a) { this.activeShowListeners[a] && this.activeShowListeners[a].removeListener(); delete this.activeShowListeners[a] }, activateShowListeners: function () { for (var a in this.showListeners) this.activateShowListener(a) }, deactivateShowListeners: function () { for (var a in this.activeShowListeners) this.deactivateShowListener(a) },
            destroy: function () { this.deactivateShowListeners(); this.parts.panel.remove() }, setTitle: function (a) { this.parts.title.setHtml(a) }, _getAlignments: function (a, b, c) {
                return {
                    "right vcenter": { top: a.top + a.height / 2 - c / 2, left: a.right + this.triangleWidth }, "left vcenter": { top: a.top + a.height / 2 - c / 2, left: a.left - b - this.triangleWidth }, "top hcenter": { top: a.top - c - this.triangleHeight, left: a.left + a.width / 2 - b / 2 }, "top left": { top: a.top - c - this.triangleHeight, left: a.left + a.width / 2 - this.triangleMinDistance }, "top right": {
                        top: a.top -
                            c - this.triangleHeight, left: a.right - a.width / 2 - b + this.triangleMinDistance
                    }, "bottom hcenter": { top: a.bottom + this.triangleHeight, left: a.left + a.width / 2 - b / 2 }, "bottom left": { top: a.bottom + this.triangleHeight, left: a.left + a.width / 2 - this.triangleMinDistance }, "bottom right": { top: a.bottom + this.triangleHeight, left: a.right - a.width / 2 - b + this.triangleMinDistance }
                }
            }, _adjustElementRect: function (a, b) {
                a.left = Math.max(b.left, Math.min(b.right - 1, a.left)); a.right = Math.max(b.left, Math.min(b.right, a.right)); a.top = Math.max(b.top,
                    Math.min(b.bottom - 1, a.top)); a.bottom = Math.max(b.top, Math.min(b.bottom, a.bottom))
            }, _getViewPaneRect: function (a) { var b = a.getScrollPosition(); a = a.getViewPaneSize(); return { top: b.y, bottom: b.y + a.height, left: b.x, right: b.x + a.width } }, _getAbsoluteRect: function (a) {
                var b = a.getClientRect(), c = CKEDITOR.document.getWindow().getScrollPosition(), l = this.editor.window.getFrame(); this.editor.editable().isInline() || a.equals(l) ? (b.top += c.y, b.left += c.x) : (a = l.getClientRect(), b.top = a.top + b.top + c.y, b.left = a.left + b.left + c.x);
                b.right = b.left + b.width; b.bottom = b.top + b.height; return b
            }
        }; CKEDITOR.event.implementOn(CKEDITOR.ui.balloonPanel.prototype)
    })(); !function () {
        var D, E, F, G, H, I, J, A, B, K, L, M, N, C, O, P, Q, R, S, T; P = function () {
            function a() { } return a.prototype = { fixesMapping: {}, config: {} }, a.prototype.constructor = a, a.fixes = {}, a.prototype.process = function (b, m, a) { }, a.prototype.filterIssues = function (b, m) { if (this._filterIssue) { var a = this; b.filter(function (b) { return a._filterIssue.call(a, b, m) }) } }, a.prototype.getIssueDetails = function (b, m) { }, a.getFixType = function (b, m) { a.fixes[b] ? m && m(a.fixes[b]) : (a.fixes[b] = void 0, m && m(void 0), !0) }, a.prototype.getFixes = function (b,
                m, a) { var h = this.fixesMapping[b.id]; if (h && h.length) { var q, v = [], x = function (b) { v.push(b); v.length === h.length && m(v) }; for (q = 0; q < h.length; q++)CKEDITOR.plugins.a11ychecker.quickFixes.getInstance({ name: h[q], callback: x, issue: b, langCode: a }) } else m([]) }, a.prototype.createConfig = function (b) { return {} }, a.prototype._filterIssue = null, a
        }(); Q = function () {
            function a(b, m) { CKEDITOR.tools.extend(this, b, !0); this.engine = m } return a.testability = { ERROR: 1, WARNING: .5, NOTICE: 0 }, a.prototype = {
                testability: a.testability.NOTICE, element: null,
                originalElement: null, details: null, engine: null, id: null, _ignored: null
            }, a.prototype.constructor = a, a.prototype.setIgnored = function (b) { var m = (this.element.data("a11y-ignore") || "").split(","); if (this._ignored = null, b) m[0] || 1 !== m.length ? m.push(this.id) : m[0] = this.id; else for (; -1 !== (b = CKEDITOR.tools.indexOf(m, this.id));)m.splice(b, 1); this.element.data("a11y-ignore", m.join(",") || !1) }, a.prototype.isIgnored = function () { return null === this._ignored && (this._ignored = this.checkIgnored()), this._ignored }, a.prototype.ignore =
                function () { this.setIgnored(!0) }, a.prototype.checkIgnored = function () { var b = this.element.data("a11y-ignore") || ""; return -1 !== CKEDITOR.tools.indexOf(b.split(","), this.id) }, a.prototype.getDetails = function (b) { if (this.details) b(this.details); else { var m = this; this.engine.getIssueDetails(this, function (a) { m.details = a; b(a) }) } }, a
        }(); R = function () {
            function a() { this.list = [] } function b(b, a) { return b.element.getPosition(a.element) & CKEDITOR.POSITION_FOLLOWING ? 1 : -1 } return a.prototype = { list: [], currentIndex: -1 }, a.prototype.constructor =
                a, a.prototype.each = function (b) { var a = this.list; if (a.map) a.map(b, this); else for (var h = 0, q = a.length; q > h; h++)b.call(this, a[h]) }, a.prototype.count = function (b) { if (b) { for (var a = b = 0, a = 0; a < this.list.length; a++)this.list[a].isIgnored() || (b += 1); return b } return this.list.length }, a.prototype.addItem = function (b) { this.list.push(b) }, a.prototype.getItem = function (b) { return (b = this.list[b]) ? b : null }, a.prototype.clear = function () { this.list.splice(0, this.list.length); this.resetFocus() }, a.prototype.resetFocus = function () {
                    if (-1 !==
                        this.currentIndex) { var b = this.getFocused(); this.currentIndex = -1; this.fire("focusChanged", { current: null, previous: b }) }
                }, a.prototype.getFocused = function () { return -1 != this.currentIndex ? this.getItem(this.currentIndex) : null }, a.prototype.moveTo = function (b) { if (!this.getItem(b)) return !1; var a = this.getFocused(); return this.currentIndex = b, this.fire("focusChanged", { current: this.getItem(b), previous: a }), !0 }, a.prototype.next = function () {
                    return this.count() ? (this.currentIndex + 1 > this.count() - 1 ? 0 !== this.currentIndex &&
                        this.moveTo(0) : this.moveTo(this.currentIndex + 1), this.getFocused()) : null
                }, a.prototype.prev = function () { if (!this.count()) return null; var b = this.count() - 1; return 0 === this.currentIndex || -1 == this.currentIndex ? this.currentIndex != b && this.moveTo(b) : this.moveTo(this.currentIndex - 1), this.getFocused() }, a.prototype.getIssueByElement = function (b) { var a = null; return this.each(function (h) { h.element.equals(b) && (a = h) }), a }, a.prototype.getIssuesByElement = function (b, a) {
                    for (var h, q, v = [], x = this.list, z = 0, w = x.length; w > z; z++)h =
                        x[z], q = !a || !h.isIgnored(), h.element.equals(b) && q && v.push(h); return v
                }, a.prototype.indexOf = function (b) { return CKEDITOR.tools.indexOf(this.list, b) }, a.prototype.getIssueByIndex = function (b) { return this.getItem(b).element }, a.prototype.sort = function () { this.list.sort(b) }, a.prototype.filter = function (b) { return this.list = this.list.filter(b), this.list }, CKEDITOR.event.implementOn(a.prototype), a
        }(); S = function () {
            function a(b, a, n, h) { this.title = b; this.descr = a; this.path = n || []; this.data = h } return a.prototype = {}, a.prototype.constructor =
                a, a
        }(); D = function (a) {
            function b(b) { a.call(this, b) } b.prototype = new a; b.prototype.constructor = b; b.prototype._langDictionary = {}; var m = {}, n = []; return b.prototype.get = function (b) { return b.langCode = b.langCode || "en", this.deferGetCall(b.langCode, arguments) ? void 0 : (CKEDITOR.plugins.a11ychecker.dev || (b.name = b.langCode + "/" + b.name), a.prototype.get.call(this, b)) }, b.prototype.getInstance = function (b) {
                b = b || {}; var a = b.name, m = b.langCode || "en", n = this; this.get({
                    name: a, callback: function (z) {
                        z = new z(b.issue); CKEDITOR.plugins.a11ychecker.dev &&
                            (z.lang = n._langDictionary[m][a]); b.callback(z)
                    }, langCode: m
                })
            }, b.prototype.deferGetCall = function (b, a) { var m = CKEDITOR.tools.indexOf; return !CKEDITOR.plugins.a11ychecker.dev || this._langDictionary[b] ? !1 : (this._addDeferredGet(b, a), -1 === m(n, b) && (n.push(b), CKEDITOR.scriptLoader.load(this.basePath + "lang/" + b + ".js")), !0) }, b.prototype.add = function (b, m) { return a.prototype.add.call(this, b, m) }, b.prototype.lang = function (b, a) {
                this._langDictionary[b] = a; var n = m[b]; if (n) for (var x = n.length - 1; 0 <= x; x--)this.get.apply(this,
                    n[x])
            }, b.prototype._addDeferredGet = function (b, a) { m[b] ? m[b].push(a) : m[b] = [a] }, b.prototype._getDeferredGetCount = function (b) { return m[b] ? m[b].length : 0 }, b.prototype._clearDeferredGetQueue = function () { m = {} }, b
        }(function () {
            function a(b) { this.basePath = b || "" } a.prototype = {}; a.prototype.constructor = a; var b = {}, m = {}; return a.prototype.get = function (a) { var h, q, v = a.name, x = a.callback; return b[v] ? void x(b[v]) : (m[v] || (m[v] = []), m[v].push(x), void (!1 !== b[v] && (h = { name: v }, b[v] = !1, q = this.fire("requested", h), !1 !== q && this.requestQuickFix(a)))) },
                a.prototype.requestQuickFix = function (b) { CKEDITOR.scriptLoader.load(this.basePath + b.name + ".js") }, a.prototype.add = function (a, h) { var q, v = m[a] || [], x = v.length; b[a] = h; for (q = 0; x > q; q++)v[q](h); delete m[a] }, a.prototype.setLoadedTypes = function (a) { b = a }, a.prototype.getLoadedTypes = function () { return b }, a.prototype.getWaitingCallbacks = function () { return m }, CKEDITOR.event.implementOn(a.prototype), a
        }()); E = function () {
            function a(b) { this.controller = b; this._storedSel = null } return a.prototype = {}, a.prototype.constructor =
                a, a.prototype.init = function () { var b = this.controller, a = b.editor; a && a.fire("lockSnapshot", { dontUpdate: !0 }); b.issues && b.editableDecorator.markIssues(b.issues); CKEDITOR.env.chrome && b.editor && (this._storedSel = b.editor.getSelection().createBookmarks()) }, a.prototype.close = function () {
                    var b = this.controller; b.editableDecorator.removeMarkup(); b.viewerController && b.viewerController.viewer.panel.hide(); b.issues && b.issues.resetFocus(); this._storedSel && this.controller.editor.getSelection().selectBookmarks(this._storedSel);
                    this.controller.editor.fire("unlockSnapshot")
                }, a.prototype.unsetStoredSelection = function () { var b = this._storedSel; b && (this.removeBookmark(b), this._storedSel = null) }, a.prototype.removeBookmark = function (b) { for (var a = 0; a < b.length; a++) { var n = b[a]; n.startNode.remove(); n.endNode && n.endNode.remove() } }, a
        }(); F = function () {
            function a(b) { this.controller = b } return a.prototype = {}, a.prototype.constructor = a, a.prototype.init = function () { this.controller.viewerController.startListening() }, a.prototype.close = function () { this.controller.viewerController.stopListening() },
                a
        }(); G = function () { function a(b) { this.controller = b } return a.prototype = {}, a.prototype.constructor = a, a.prototype.init = function () { this.controller.editor.editable().addClass("cke_loading") }, a.prototype.close = function () { this.controller.editor.editable().removeClass("cke_loading") }, a }(); H = function () {
            function a(b) { (this.editor = b) && this.addListeners() } return a.prototype = {}, a.prototype.constructor = a, a.prototype.testabilityClasses = { 0: "cke_a11yc_notice", "0.5": "cke_a11yc_warning", 1: "cke_a11yc_error" }, a.ID_ATTRIBUTE_NAME =
                "quail-id", a.ID_ATTRIBUTE_NAME_FULL = "data-quail-id", a.INITIAL_ID_VALUE = 1, a.prototype.editable = function () { return this.editor.editable() }, a.prototype.markIssues = function (b) { var a, n, h = b.count(); for (n = 0; h > n; n++)a = b.getItem(n), this.markIssueElement(a, b) }, a.prototype.addListeners = function () {
                    var b = this.editor, m = b.editable(), n = CKEDITOR.tools.bind(this.clickListener, this); if (!m) throw Error("Editable not available"); m.attachListener(m, "click", n); b.on("contentDom", function () {
                        var a = b.editable(); a.attachListener(a,
                            "click", n)
                    }); b.dataProcessor.htmlFilter.addRules({ elements: { $: function (m) { return b._.a11ychecker.disableFilterStrip || delete m.attributes[a.ID_ATTRIBUTE_NAME_FULL], b.config.a11ychecker_noIgnoreData && delete m.attributes["data-a11y-ignore"], m } } })
                }, a.prototype.applyMarkup = function () {
                    var b = this.editable(), m = !!this.editor.plugins.fakeobjects, n = a.INITIAL_ID_VALUE; b.forEach(function (b) {
                        b.data(a.ID_ATTRIBUTE_NAME, n); if (m && null !== b.data("cke-real-node-type")) {
                            var q = a.ID_ATTRIBUTE_NAME_FULL, v = n, v = String(v),
                                x = new RegExp("(\\s+" + q + '\x3d"\\d+")', "g"), q = decodeURIComponent(b.data("cke-realelement")).replace(x, "").replace(/^(<\w+\s)/, "$1" + q + '\x3d"' + CKEDITOR.tools.htmlEncodeAttr(v) + '" '); b.data("cke-realelement", encodeURIComponent(q))
                        } return n += 1, !0
                    }, CKEDITOR.NODE_ELEMENT, !1)
                }, a.prototype.decorateScratchpad = function (b) { b.data(a.ID_ATTRIBUTE_NAME, a.INITIAL_ID_VALUE) }, a.prototype.removeMarkup = function () {
                    var b = this.editable(), m = !!this.editor.plugins.fakeobjects, n = this.unmarkIssueElement; b.forEach(function (b) {
                        b.removeAttribute &&
                            b.removeAttribute(a.ID_ATTRIBUTE_NAME_FULL); if (m && null !== b.data("cke-real-node-type")) { var q = new RegExp("(\\s+" + a.ID_ATTRIBUTE_NAME_FULL + '\x3d"\\d+")', "g"), q = decodeURIComponent(b.data("cke-realelement")).replace(q, ""); b.data("cke-realelement", encodeURIComponent(q)) } b.hasClass("cke_a11yc_issue") && n(b)
                    }, CKEDITOR.NODE_ELEMENT, !1)
                }, a.prototype.clickListener = function (b) {
                    b = b.data.getTarget(); var a = this.editor._.a11ychecker; if (!b.hasClass("cke_a11yc_issue")) {
                        var n, h = b.getParents(!0); b = null; for (n = 0; n < h.length; n++)if (h[n].hasClass("cke_a11yc_issue")) {
                            b =
                                h[n]; break
                        }
                    } b && !b.hasClass("cke_a11yc_focused") ? (a.showIssueByElement(b, function () { this.viewer.navigation.parts.next.focus() }), a.setMode(1)) : a.enabled && (a.mode.unsetStoredSelection && a.mode.unsetStoredSelection(), a.setMode(2))
                }, a.prototype.resolveEditorElements = function (b) { var m, n, h, q, v = this.editable(); h = 0; for (q = b.count(); q > h; h++)m = b.getItem(h), n = m.originalElement.data(a.ID_ATTRIBUTE_NAME), n === String(a.INITIAL_ID_VALUE) ? m.element = v : m.element = v.findOne("*[" + a.ID_ATTRIBUTE_NAME_FULL + '\x3d"' + n + '"]') },
                a.prototype.markIgnoredIssue = function (b) { b.element.addClass("cke_a11yc_ignored") }, a.prototype.markIssueElement = function (b, a) { var n = b.element, h = b.testability, q = b.isIgnored() && !a.getIssuesByElement(n, !0).length; void 0 === h && (h = 1); n.addClass("cke_a11yc_issue"); q ? this.markIgnoredIssue(b) : (n.addClass(this.testabilityClasses[h]), n.removeClass("cke_a11yc_ignored")) }, a.prototype.unmarkIssueElement = function (b, a) { var n = b.removeClass ? b : b.element; a || n.removeClass("cke_a11yc_issue"); n.removeClass("cke_a11yc_error").removeClass("cke_a11yc_warning").removeClass("cke_a11yc_notice").removeClass("cke_a11yc_ignored").removeClass("cke_a11yc_focused") },
                a
        }(); I = function () {
            function a() { } return a.prototype = { preferredIssue: null }, a.prototype.constructor = a, a.prototype.set = function (b) { this.preferredIssue = b }, a.prototype.unset = function (b) { this.set(null) }, a.prototype.getFromList = function (b) {
                var m = null, n = this.preferredIssue && this.preferredIssue.element, h = !1; return 0 === b.count() ? m : n ? (n && a._nodeIsRemoved(n) && (n = a._retreiveElementFromSelection(n.getDocument())), b.each(function (b) {
                    h || (b.element.equals(n) ? (h = !0, m = b) : !m && b.element.getPosition(n) & CKEDITOR.POSITION_FOLLOWING &&
                        (m = b))
                }), m || b.getItem(0)) : b.getItem(0)
            }, a._retreiveElementFromSelection = function (b) { return (b = b.getSelection()) ? b.getCommonAncestor() : null }, a.prototype.getFromListIndex = function (b) { var a = this.getFromList(b); return a ? b.indexOf(a) : null }, a._nodeIsRemoved = function (b) { b = b.getParents(); return !(b[0] && "html" == b[0].getName()) }, a
        }(); J = function () {
            function a(b) { this.controller = b } return a.prototype = {
                show: function () { this.getEditorCommand().setState(CKEDITOR.TRISTATE_ON) }, hide: function () { this._selectIssue(); this.getEditorCommand().setState(CKEDITOR.TRISTATE_OFF) },
                update: function () { this.controller.issues.on("focusChanged", this.focusChanged, this) }, focusChanged: function (b) { b = b.data; b.previous && this.unmarkFocus(b.previous.element); b.current && this.markFocus(b.current.element) }, unmarkFocus: function (b) { b.removeClass("cke_a11yc_focused") }, markFocus: function (b) { b.addClass("cke_a11yc_focused") }, getEditorCommand: function () { return this.controller.editor.getCommand("a11ychecker") }
            }, a.prototype.constructor = a, a.prototype._selectIssue = function () {
                var b = this.controller, a = b.issues.getFocused();
                a && b._withUndoManager(function () { var n = b.editor, h = b.mode; b.editableDecorator.removeMarkup(); n.getSelection().selectElement(a.element); h.unsetStoredSelection && h.unsetStoredSelection(); n.fire("updateSnapshot"); h.unsetStoredSelection && (h._storedSel = n.getSelection().createBookmarks()) })
            }, a
        }(); A = function () {
            function a(b) {
                this.viewer = b; this.templates = {}; for (var a in this.templateDefinitions) this.templates[a] = new CKEDITOR.template(this.templateDefinitions[a]); this.parts = {}; this.lang = b.editor.lang.a11ychecker;
                this.build()
            } return a.prototype = {
                templateDefinitions: { wrapper: '\x3cdiv class\x3d"cke_a11yc_ui_desc_wrapper"\x3e\x3c/div\x3e', title: '\x3cstrong class\x3d"cke_a11yc_ui_desc_title" aria-live\x3d"polite"\x3e\x3c/strong\x3e', info: '\x3cp class\x3d"cke_a11yc_ui_desc_info" aria-live\x3d"polite"\x3e\x3c/p\x3e' }, setTitle: function (b) { this.parts.title.setHtml(b) }, setInfo: function (b) { this.parts.info.setHtml(b) }, build: function () {
                    this.parts = {
                        wrapper: CKEDITOR.dom.element.createFromHtml(this.templates.wrapper.output()),
                        title: CKEDITOR.dom.element.createFromHtml(this.templates.title.output()), info: CKEDITOR.dom.element.createFromHtml(this.templates.info.output())
                    }; this.parts.title.appendTo(this.parts.wrapper); this.parts.info.appendTo(this.parts.wrapper)
                }
            }, CKEDITOR.event.implementOn(a.prototype), a
        }(); B = function () {
            function a(b, a) {
                this.viewer = b; this.lang = a; this.templates = {}; for (var h in this.templateDefinitions) this.templates[h] = new CKEDITOR.template(this.templateDefinitions[h]); this.templates.counterText = new CKEDITOR.template(this.lang.navigationCounter);
                this.parts = {}; this.build()
            } function b(b, a) { return function (h) { h.data.getKeystroke() == b && (a.call(this), h.data.preventDefault()) } } return a.prototype = {
                templateDefinitions: { wrapper: '\x3cdiv class\x3d"cke_a11yc_ui_navigation"\x3e\x3c/div\x3e', counter: '\x3cdiv class\x3d"cke_a11yc_ui_navigation_counter" aria-live\x3d"polite"\x3e\x3c/div\x3e', buttonWrapper: '\x3cdiv class\x3d"cke_a11yc_ui_button_wrapper"\x3e\x3c/div\x3e', button: '\x3ca href\x3d"javascript:void(0)" hidefocus\x3d"true" class\x3d"cke_a11yc_ui_button cke_a11yc_ui_{class}" role\x3d"button"\x3e\x3cspan class\x3d"cke_a11yc_ui_button"\x3e\x3cspan\x3e{text}\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e' },
                update: function (b, a, h) { var q = this.lang.testability; h = q[void 0 !== h ? h : 1]; this.parts.counter.setText(this.templates.counterText.output({ current: b + 1, total: a, testability: h })); for (var v in q) this.parts.wrapper.removeClass("cke_a11yc_testability_" + q[v]); this.parts.wrapper.addClass("cke_a11yc_testability_" + h) }, build: function () {
                    this.parts = {
                        wrapper: CKEDITOR.dom.element.createFromHtml(this.templates.wrapper.output()), counter: CKEDITOR.dom.element.createFromHtml(this.templates.counter.output()), previous: CKEDITOR.dom.element.createFromHtml(this.templates.button.output({
                            title: this.lang.navigationPrevTitle,
                            "class": "previous", text: this.lang.navigationPrev
                        })), next: CKEDITOR.dom.element.createFromHtml(this.templates.button.output({ title: this.lang.navigationNextTitle, "class": "next", text: this.lang.navigationNext }))
                    }; var a = CKEDITOR.dom.element.createFromHtml(this.templates.buttonWrapper.output()), n = a.clone(); a.append(this.parts.previous); n.append(this.parts.next); this.parts.wrapper.append(this.parts.counter); this.parts.wrapper.append(a); this.parts.wrapper.append(n); this.parts.previous.unselectable(); this.parts.next.unselectable();
                    a = b(32, function (b) { this.fire("click") }); this.parts.previous.on("keydown", a); this.parts.next.on("keydown", a); this.parts.previous.on("click", function () { this.fire("previous") }, this); this.parts.next.on("click", function () { this.fire("next") }, this)
                }
            }, CKEDITOR.event.implementOn(a.prototype), a
        }(); K = function (a) {
            function b(b) { this.viewer = b; this.templates = {}; for (var a in this.templateDefinitions) this.templates[a] = new CKEDITOR.template(this.templateDefinitions[a]); this.inputs = {}; this.parts = {}; this.build() } function m(b,
                a) { return function (m) { var v = m.data.getKeystroke(), x = CKEDITOR.tools; (x.isArray(b) ? -1 !== x.indexOf(b, v) : v == b) && (a.call(this, m), m.data.preventDefault()) } } return b.prototype = {
                    templateDefinitions: {
                        wrapper: '\x3cdiv role\x3d"presentation" class\x3d"cke_a11yc_ui_form"\x3e\x3c/div\x3e', fieldset: '\x3cdiv role\x3d"presentation" class\x3d"cke_a11yc_ui_form_fieldset"\x3e\x3c/div\x3e', actionset: '\x3cdiv role\x3d"presentation" class\x3d"cke_a11yc_ui_form_actionset"\x3e\x3c/div\x3e', buttonWrapper: '\x3cdiv class\x3d"cke_a11yc_ui_button_wrapper {class}"\x3e\x3c/div\x3e',
                        button: '\x3ca href\x3d"javascript:void(0)" hidefocus\x3d"true" class\x3d"cke_a11yc_ui_button {class}" role\x3d"button"\x3e\x3cspan class\x3d"cke_a11yc_ui_button"\x3e{text}\x3c/span\x3e\x3c/a\x3e'
                    }, addInput: function (b, m) { this.inputs[b] = new (a[CKEDITOR.tools.capitalize(m.type)])(b, m); this.inputs[b].wrapper.appendTo(this.parts.fieldset); this.fire("addInput", this.inputs[b]) }, removeInput: function (b) { this.inputs[b].remove(); this.fire("removeInput", this.inputs[b]); this.inputs[b] = null }, setInputs: function (b) {
                        this.removeInputs();
                        this.inputs = {}; for (var a in b) this.addInput(a, b[a])
                    }, removeInputs: function () { for (var b in this.inputs) this.removeInput(b) }, serialize: function () { var b = {}, a; for (a in this.inputs) b[a] = this.inputs[a].getValue(); return b }, build: function () {
                        var b = this.viewer.editor.lang.a11ychecker; this.parts = {
                            wrapper: CKEDITOR.dom.element.createFromHtml(this.templates.wrapper.output()), fieldset: CKEDITOR.dom.element.createFromHtml(this.templates.fieldset.output()), actionset: CKEDITOR.dom.element.createFromHtml(this.templates.actionset.output()),
                            quickfixButton: CKEDITOR.dom.element.createFromHtml(this.templates.button.output({ title: b.quickFixButtonTitle, text: b.quickFixButton, "class": "cke_a11yc_ui_button_ok" })), ignoreButton: CKEDITOR.dom.element.createFromHtml(this.templates.button.output({ title: b.ignoreBtnTitle, text: b.ignoreBtn, "class": "cke_a11yc_ui_button_ignore" }))
                        }; this.parts.fieldset.appendTo(this.parts.wrapper); this.parts.actionset.appendTo(this.parts.wrapper); var b = CKEDITOR.dom.element.createFromHtml(this.templates.buttonWrapper.output({ "class": "cke_a11yc_ui_button_ok_wrapper" })),
                            a = CKEDITOR.dom.element.createFromHtml(this.templates.buttonWrapper.output({ "class": "cke_a11yc_ui_button_ignore_wrapper" })); this.parts.quickfixButton.appendTo(b); this.parts.ignoreButton.appendTo(a); b.appendTo(this.parts.actionset); a.appendTo(this.parts.actionset); this.parts.quickfixButton.on("click", function (b) { this.fire("submit"); b.data.preventDefault() }, this); this.parts.fieldset.on("keydown", m(13, function (b) { this.fire("submit") }), this); this.parts.quickfixButton.on("keydown", m(32, function (b) { this.fire("submit") }),
                                this); this.parts.ignoreButton.on("click", function (b) { this.fire("ignore"); b.data.preventDefault() }, this); this.parts.ignoreButton.on("keydown", function (b) { 32 == b.data.getKeystroke() && (b.data.preventDefault(), this.fire("ignore")) }, this)
                    }, show: function () { this.parts.fieldset.show(); this.parts.quickfixButton.show() }, hide: function () { this.parts.fieldset.hide(); this.parts.quickfixButton.hide() }, setIgnored: function (b) {
                        var a = this.parts.ignoreButton; a.getFirst().setHtml(this.viewer.editor.lang.a11ychecker[b ? "stopIgnoreBtn" :
                            "ignoreBtn"]); a.setAttribute("aria-pressed", b)
                    }
                }, CKEDITOR.event.implementOn(b.prototype), b
        }(function (a) {
            var b = {
                Text: function (b, n) { a.apply(this, arguments); this.input = CKEDITOR.dom.element.createFromHtml(this.inputTemplate.output({ id: this.id })); this.input.appendTo(this.wrapper); this.setInitialValue() }, Checkbox: function (b, n) { a.apply(this, arguments); this.input = CKEDITOR.dom.element.createFromHtml(this.inputTemplate.output({ id: this.id })); this.input.appendTo(this.wrapper); this.setInitialValue() }, Select: function (b,
                    n) { var h, q; a.apply(this, arguments); this.options = {}; this.input = CKEDITOR.dom.element.createFromHtml(this.inputTemplate.output({ id: this.id })); for (h in n.options) q = new CKEDITOR.dom.element("option"), q.setText(n.options[h]), q.setAttribute("value", h), q.appendTo(this.input), this.options[h] = q; this.input.appendTo(this.wrapper); this.setInitialValue() }
            }; return b.Text.prototype = CKEDITOR.tools.extend(new a, { inputTemplate: new CKEDITOR.template('\x3cinput class\x3d"cke_a11yc_ui_input cke_a11yc_ui_input_text" type\x3d"text" id\x3d{id} aria-labelledby\x3d"{id}_label" aria-required\x3d"true"\x3e') }),
                b.Checkbox.prototype = CKEDITOR.tools.extend(new a, { inputTemplate: new CKEDITOR.template('\x3cinput class\x3d"cke_a11yc_ui_input cke_a11yc_ui_input_checkbox" type\x3d"checkbox" id\x3d{id} aria-labelledby\x3d"{id}_label" aria-required\x3d"true"\x3e'), getValue: function () { return this.input.$.checked } }, !0), b.Select.prototype = CKEDITOR.tools.extend(new a, { inputTemplate: new CKEDITOR.template('\x3cselect class\x3d"cke_a11yc_ui_input_select" id\x3d{id} aria-labelledby\x3d"{id}_label" aria-required\x3d"true"\x3e\x3c/select\x3e') }),
                b
        }(function () {
            function a(b, a) { a && (CKEDITOR.tools.extend(this, a, !0), this.name = b, this.id = CKEDITOR.tools.getNextId() + "_input", this.wrapper = CKEDITOR.dom.element.createFromHtml(this.wrapperTemplate.output({ label: this.label, id: this.id }))) } return a.prototype = {
                wrapperTemplate: new CKEDITOR.template('\x3cdiv role\x3d"presentation" class\x3d"cke_a11yc_ui_input_wrapper"\x3e\x3clabel class\x3d"cke_a11yc_ui_input_label" id\x3d"{id}_label" for\x3d"{id}"\x3e{label}\x3c/label\x3e\x3c/div\x3e'), getValue: function () { return this.input.getValue() },
                setValue: function (b) { this.input.setValue(b) }, setInitialValue: function () { void 0 !== this.value && this.setValue(this.value) }, remove: function () { this.wrapper.remove() }
            }, a
        }())); L = function () {
            function a(b) { this.viewer = b; this.templates = {}; for (var a in this.templateDefinitions) this.templates[a] = new CKEDITOR.template(this.templateDefinitions[a]); this.parts = {}; this.build() } return a.prototype = {
                templateDefinitions: {
                    wrapper: '\x3cdiv class\x3d"cke_a11yc_ui_listening"\x3e\x3c/div\x3e', info: "\x3cp\x3e{text}\x3c/p\x3e",
                    button: '\x3ca href\x3d"javascript:void(0)" title\x3d"{title}" hidefocus\x3d"true" class\x3d"cke_a11yc_ui_button" role\x3d"button"\x3e\x3cspan class\x3d"cke_a11yc_ui_button"\x3e{text}\x3c/span\x3e\x3c/a\x3e'
                }, build: function () {
                    var b = this.viewer.editor.lang.a11ychecker; this.parts = {
                        wrapper: CKEDITOR.dom.element.createFromHtml(this.templates.wrapper.output()), info: CKEDITOR.dom.element.createFromHtml(this.templates.info.output({ text: b.listeningInfo })), button: CKEDITOR.dom.element.createFromHtml(this.templates.button.output({
                            title: b.listeningCheckAgain,
                            text: b.listeningCheckAgain
                        }))
                    }; this.parts.wrapper.append(this.parts.info); this.parts.wrapper.append(this.parts.button); this.parts.button.on("click", function () { this.fire("check") }, this)
                }
            }, CKEDITOR.event.implementOn(a.prototype), a
        }(); M = function () {
            function a() { this.list = [] } return a.prototype = {}, a.prototype.constructor = a, a.prototype.count = function () { return this.list.length }, a.prototype.addItem = function (b) { b.on("keydown", this.keyDownListener, this); this.list.push(b); this.sort() }, a.prototype.removeItem =
                function (b) { "number" != typeof b && (b = CKEDITOR.tools.indexOf(this.list, b)); this.list[b].removeListener("keydown", this.keyDownListener); this.list.splice(b, 1) }, a.prototype.getItem = function (b) { return this.list[b] }, a.prototype.keyDownListener = function (b) { var a = CKEDITOR.tools.indexOf(this.list, b.sender), n = b.data.getKey(), h = b.data.getKeystroke(); -1 !== a && 1 !== this.list.length && 9 == n && (a = h & CKEDITOR.SHIFT ? this.getPrev(a) : this.getNext(a)) && (a.focus(), b.data.preventDefault(1), b.data.stopPropagation()) }, a.prototype.getNext =
                function (b) { var a, n = 0, h = this.list.length; "number" == typeof b && h > b + 1 && (n = b + 1); a = this.getItem(n); for (b = 1; h - 1 > b && !a.isVisible(); b++)a = n + b, a >= h && (a -= h), a = this.getItem(a); return b != h - 1 || a.isVisible() ? a : void 0 }, a.prototype.getPrev = function (b) { var a, n = this.list.length, h = n - 1; "number" == typeof b && 0 < b && (h = b - 1); a = this.getItem(h); for (b = 1; n - 1 > b && !a.isVisible(); b++)a = h - b, 0 > a && (a = n + a), a = this.getItem(a); return b != n - 1 || a.isVisible() ? a : void 0 }, a.prototype.sort = function () { this.list.sort(this._sort) }, a.prototype._sort =
                function (b, a) { return b.getPosition(a) & CKEDITOR.POSITION_FOLLOWING ? 1 : -1 }, a
        }(); N = function () {
            function a(b, a) { this.viewer = b; CKEDITOR.tools.extend(this, a); this.panelShowListeners = this.panelShowListeners(b); this.activePanelShowlisteners = [] } return a.prototype = {
                enterMode: function () { this.init && this.init(this.viewer); this.addPanelShowListeners() }, leaveMode: function () { this.close && this.close(this.viewer); this.removePanelShowListeners() }, addPanelShowListener: function (b) { this.activePanelShowlisteners.push(b) },
                addPanelShowListeners: function (b) { if (this.panelShowListeners) for (b = 0; b < this.panelShowListeners.length; b++)this.addPanelShowListener(this.viewer.panel.addShowListener(this.panelShowListeners[b])) }, removePanelShowListeners: function () { for (var b; b = this.activePanelShowlisteners.pop();)b.removeListener() }
            }, a
        }(); A = function (a) {
            function b(b, n) {
                var h = b.editor; this.editor = h; var q = this.viewer = new a(h, n); this.a11ychecker = b; q.panel.on("attach", function () {
                    if (CKEDITOR.env.chrome) {
                        var a = q.panel.parts.panel, n = new CKEDITOR.dom.range(a.getDocument()),
                            h = a.findOne(".cke_balloon_title"); n.setStart(h, 0); n.setEnd(h, 0); a.getDocument().getSelection().selectRanges([n])
                    } this.update(b.issues.getFocused())
                }, this); q.panel.parts.close.on("click", function (b) { this.a11ychecker.close() }, this); q.navigation.on("previous", function (a) { b.prev() }); q.navigation.on("next", function (a) { b.next() }); q.form.on("submit", this.quickFixAccepted, null, null, 8); q.form.on("ignore", b.ignoreIssue, b); q.form.on("ignore", function () { this.updateForm(b.issues.getFocused()) }, this); this.on("next",
                    function (b) { q.navigation.parts.next.focus() }, null, null, 20); this.on("prev", function (b) { q.navigation.parts.previous.focus() }, null, null, 20); q.listeningIndicator.on("check", function () { b.check({ ui: !0 }); b.editor.focus() }, this)
            } return b.prototype = {
                update: function (b) { var a = this.a11ychecker.issues; this.viewer.navigation.update(a.indexOf(b), a.count(), b.testability); this.updateDescription(b); this.updateForm(b) }, updateDescription: function (b) {
                    var a = this.viewer.description; b.getDetails(function (b) {
                        a.setTitle(b.title);
                        a.setInfo(b.descr)
                    })
                }, updateForm: function (b) { var a = this, h = a.viewer.form, q = a.a11ychecker.getQuickFixLang(); h.setIgnored(b.isIgnored()); h.setInputs({}); h.hide(); b.engine.getFixes(b, function (b) { var m = b.length; m && (a.quickFixSelected = b[0]); for (var z = 0; m > z; z++)b[z].display(h, a.editor); m && h.show() }, q) }, quickFixAccepted: function (b) {
                    var a, h = this.viewer.editor._.a11ychecker, q = h.viewerController, v = this.serialize(); (q = q.quickFixSelected) ? (a = q.validate(v), a.length) ? (alert(a.join(",")), a = CKEDITOR.tools.objectKeys(this.inputs),
                        a.length && this.inputs[a[0]].input.focus(), b.cancel()) : h.applyQuickFix(q, v) : (console.erorr("No quickfix available!"), b.cancel())
                }, showIssue: function (b, a) { b.element.scrollIntoView(); this.viewer.panel.attach(b.element); a && (a.event && this.fire(a.event), a.callback && a.callback.call(this)) }, startListening: function () { this.viewer.setMode("listening"); this.viewer.panel.show(); this.editor.focus() }, stopListening: function () { this.viewer.panel.hide(); this.viewer.setMode("checking") }
            }, CKEDITOR.event.implementOn(b.prototype),
                b
        }(function (a, b, m, n, h, q) {
            function v(b, a) {
                this.editor = b; this.panel = new CKEDITOR.ui.balloonPanel(b, a); this.focusManager = new h; this.modes = {}; this.mode = null; this.lang = b.lang.a11ychecker; var m = this; this.panel.registerFocusable = function (b) { m.focusManager.addItem(b); m.editor.focusManager.add(b) }; this.panel.deregisterFocusable = function (b) { m.focusManager.removeItem(b); m.editor.focusManager.remove(b) }; this.panel.addShowListener(function () {
                    return this.parts.close.on("click", function (b) {
                        this.blur(); this.hide();
                        b.data.preventDefault()
                    }, this)
                }); this.panel.addShowListener(function () { return this.parts.panel.on("keydown", function (b) { 27 == b.data.getKeystroke() && (this.blur(), this.hide(), b.data.preventDefault()) }, this) }); this.setupNavigation(); this.setupDescription(); this.setupForm(); this.setupListeningIndicator(); this.panel.registerFocusable(this.panel.parts.close); this.setupModes(); this.setMode("checking"); this._fixAria()
            } return v.SCROLL_THROTTLING_RATE = 50, v.prototype = {
                modesDefinition: {
                    listening: {
                        attachToViewport: function (b) {
                            b.panel.parts.panel.setStyles({
                                right: "10px",
                                bottom: "10px"
                            })
                        }, attachToEditable: function (b) { var a = b.editor.ui.space("contents").getClientRect(), m = b.editor.document.getDocumentElement().getClientRect(), h = CKEDITOR.document.getWindow().getViewPaneSize(); b.panel.parts.panel.setStyles({ right: a.width - m.width + 10 + "px", bottom: h.height - a.bottom + 10 + "px" }) }, init: function (b) {
                            var a = this; b.panel.parts.panel.addClass("cke_a11yc_mode_listening"); b.panel.resize(250, "auto"); CKEDITOR.tools.setTimeout(function () {
                                var m = b.panel.parts.panel.getClientRect(), h = CKEDITOR.document.getWindow().getViewPaneSize();
                                b.panel.parts.panel.setStyles({ position: "fixed", top: null, left: null, right: h.width - m.right + "px", bottom: h.height - m.bottom + "px" }); CKEDITOR.tools.setTimeout(function () { var m = b.editor.getCommand("maximize"); a[m && 1 === m.state ? "attachToEditable" : "attachToViewport"](b) }, 0)
                            }, 0, this)
                        }, close: function (b) { b.panel.parts.panel.removeClass("cke_a11yc_mode_listening"); b.panel.resize(b.panel.width, b.panel.height); b.panel.parts.panel.setStyles({ position: "absolute", right: null, bottom: null }) }, panelShowListeners: function (b) {
                            var a =
                                this; return [function () { return this.editor.on("maximize", function (m) { a[1 === m.data ? "attachToEditable" : "attachToViewport"](b) }) }]
                        }
                    }, checking: { panelShowListeners: function (b) { return [function () { var a = b.editor, m = CKEDITOR.tools.eventsBuffer(v.SCROLL_THROTTLING_RATE, function () { var m = a._.a11ychecker.issues.getFocused(); m && b.panel.attach(m.element, !1) }); return this.editor.window.on("scroll", m.input) }, function () { return this.editor.on("resize", function () { this.blur(); this.hide() }, this) }] } }
                }, setupNavigation: function () {
                    this.navigation =
                        new b(this, this.editor.lang.a11ychecker); this.panel.registerFocusable(this.navigation.parts.previous); this.panel.registerFocusable(this.navigation.parts.next); this.panel.parts.content.append(this.navigation.parts.wrapper)
                }, setupDescription: function () { this.description = new a(this); this.panel.parts.content.append(this.description.parts.wrapper) }, setupForm: function () {
                    this.form = new m(this, this.editor.lang.a11ychecker); this.form.on("addInput", function (b) { this.panel.registerFocusable(b.data.input) }, this);
                    this.form.on("removeInput", function (b) { this.panel.deregisterFocusable(b.data.input) }, this); this.panel.registerFocusable(this.form.parts.ignoreButton); this.panel.registerFocusable(this.form.parts.quickfixButton); this.panel.parts.content.append(this.form.parts.wrapper)
                }, setupListeningIndicator: function () { this.listeningIndicator = new n(this); this.panel.registerFocusable(this.listeningIndicator.parts.button); this.panel.parts.content.append(this.listeningIndicator.parts.wrapper) }, setupModes: function () {
                    for (var b in this.modesDefinition) this.modes[b] =
                        new q(this, this.modesDefinition[b])
                }, setMode: function (b) { this.mode && this.modes[this.mode].leaveMode(); this.modes[b].enterMode(); this.mode = b }, _fixAria: function () { var b = this.panel.parts.panel, a = CKEDITOR.tools.getNextId(), m = CKEDITOR.tools.getNextId(), h = CKEDITOR.tools.getNextId(); this.panel.parts.title.setAttribute("id", a); this.navigation.parts.counter.setAttribute("id", m); this.description.parts.wrapper.setAttribute("id", h); b.setAttribute("aria-labelledby", a + " " + m); b.setAttribute("aria-describedby", h) }
            },
                v
        }(A, B, K, L, M, N)); B = function () {
            function a(b) { if (this.controller = b, b) { var m = a.parseConfig(b.editor.config.a11ychecker_keystrokes); this.setEditorHotkeys(b.editor, m); this.setBalloonHotkeys(b.viewerController, m) } } return a.prototype = {}, a.prototype.constructor = a, a.prototype.setEditorHotkeys = function (b, a) { for (var n in a) b.setKeystroke(Number(n), a[n]) }, a.prototype.setBalloonHotkeys = function (b, a) {
                var n = this, h = n.controller.editor, q = b.viewer.panel, v = q.parts.panel; q.addShowListener(function () {
                    return v.on("keydown",
                        n.getBalloonKeydown(h, a))
                })
            }, a.prototype.getBalloonKeydown = function (b, a) { return function (n) { var h = a[n.data.getKeystroke()]; h && (b.execCommand(h), n.data.preventDefault()) } }, a.parseConfig = function (b) { var a, n = {}, h = b || {}, q = { open: CKEDITOR.CTRL + CKEDITOR.ALT + 69, next: CKEDITOR.CTRL + 69, prev: CKEDITOR.CTRL + CKEDITOR.SHIFT + 69, listen: CKEDITOR.SHIFT + 27, close: 27 }; for (a in q) void 0 === h[a] && (h[a] = q[a]), b = "open" == a ? "" : "." + a, n[h[a]] = "a11ychecker" + b; return n }, a
        }(); C = function () {
            function a() { } return a.getPreferredLanguage =
                function (b, a, n, h) { h = h || window.navigator; b = [b, a, "en"]; a = /([a-z]+)(?:-([a-z]+))?/; var q = h.language || h.userLanguage; h = CKEDITOR.tools.indexOf; q && b.splice(1, 0, q); for (var q = 0, v = b.length; v > q; q++)if (b[q]) { var x = b[q].toLowerCase(), z = x.match(a), w = z[1]; if (z[2] && -1 !== h(n, x)) return x; if (-1 !== h(n, w)) return w } return null }, a
        }(); O = function (a, b, m, n, h, q, v, x, z) {
            function w(b) {
                this._ = {}; this.editor = b; this.editableDecorator = new n(this.editor); this.ui = new q(this); this.preferredIssueFinder = new h; b && (this.viewerController =
                    new v(this, { title: b.lang.a11ychecker.balloonLabel }), this.attachEditorListeners(b), this.hotkeyManager = new x(this))
            } return w.modes = { CHECKING: 1, LISTENING: 2, BUSY: 3 }, w.prototype = { issues: null, viewerController: null, enabled: !1, disableFilterStrip: !1 }, w.prototype.constructor = w, w.prototype.setEngine = function (b) { this.engine = b }, w.prototype.exec = function (b) { return this.enabled ? void this.close() : (this.issues && this.issues.clear(), this.enable(), void this.check({ ui: !0, callback: b })) }, w.prototype.listen = function () {
                if (this.enabled) {
                    var b =
                        w.modes; if (this.modeType === b.LISTENING) this.check(); else { var a = this.issues.getFocused() && this.issues.getFocused().element; this.setMode(b.LISTENING); a && this.editor.getSelection().selectElement(a) }
                }
            }, w.prototype.check = function (b) {
                b = b || {}; var a, h = this, m = h.editor; this.setMode(w.modes.BUSY); b.ui && this.ui.show(); a = this.getTempOutput(); this.editableDecorator.applyMarkup(); this.editableDecorator.decorateScratchpad(a); this.disableFilterStrip = !0; a.setHtml(m.getData()); this.disableFilterStrip = !1; CKEDITOR.document.getBody().append(a);
                this.engine.process(this, a, function (a) { h._engineProcessed.call(h, a, b) })
            }, w.prototype.disable = function () { this.enabled && (this.enabled = !1, this.fire("disabled")) }, w.prototype.enable = function () { this.enabled || (this.enabled = !0, this.fire("enabled"), this.setMode(w.modes.CHECKING)) }, w.prototype.next = function (b) { var a; 0 !== this.issues.count() && (a = this.issues.next(), this.viewerController.showIssue(a, { event: "next", callback: b })) }, w.prototype.prev = function (b) {
                var a; 0 !== this.issues.count() && (a = this.issues.prev(),
                    this.viewerController.showIssue(a, { event: "prev", callback: b }))
            }, w.prototype.showIssue = function (b, a) { var h, m, n = this.issues, q = b, z = function () { this.viewer.navigation.parts.next.focus(); a && a.call(this) }; return "number" != typeof q && (q = n.indexOf(q)), h = n.getItem(q), h && h == n.getFocused() ? (z.call(this.viewerController), !0) : (m = n.moveTo(q), m && this.viewerController && this.viewerController.showIssue(n.getItem(q), { callback: z }), m) }, w.prototype.showIssueByElement = function (b, a) {
                var h = this.issues.getIssueByElement(b); return h ?
                    this.showIssue(h, a) : !1
            }, w.prototype.ignoreIssue = function () { var b = this.issues.getFocused(); b && (b.setIgnored(!b.isIgnored()), this.editableDecorator.markIssueElement(b, this.issues)) }, w.prototype.close = function () { this.enabled && (this.ui.hide(), this.disable(), this.issues.clear(), this.preferredIssueFinder.unset(), this.mode.close(), this.mode = null, this.modeType = null) }, w.prototype.setMode = function (h) {
                var n, q = {}; if (q[w.modes.CHECKING] = a, q[w.modes.LISTENING] = b, q[w.modes.BUSY] = m, n = q[h], !n) throw Error("Invalid mode value, use Controller.modes members");
                h !== this.modeType && (this.mode && this.mode.close(), this.mode = new n(this), this.mode.init(), this.modeType = h)
            }, w.prototype.attachEditorListeners = function (b) { var a = this, h = "a11ychecker a11ychecker.listen a11ychecker.next a11ychecker.prev a11ychecker.close wysiwyg source".split(" "); b.on("beforeSetMode", function () { a.close() }); b.on("beforeCommandExec", function (b) { -1 === CKEDITOR.tools.indexOf(h, String(b.data.name)) && a.enabled && a.setMode(w.modes.LISTENING) }, null, null, 9999) }, w.prototype.applyQuickFix = function (b,
                a) { this._withUndoManager(function () { var a = this.mode, h = this.editor; this.editableDecorator.removeMarkup(); b.markSelection(h, h.getSelection()); a.unsetStoredSelection && a.unsetStoredSelection(); this.editor.fire("updateSnapshot") }); b.fix(a, CKEDITOR.tools.bind(this._onQuickFix, this)) }, w.prototype._onQuickFix = function (b) { this._withUndoManager(function () { this.editor.fire("saveSnapshot") }); !1 !== this.fire("fixed", { quickFix: b, issue: b.issue }, this.editor) && this.check({ ui: !0 }) }, w.prototype._setIssueList = function (b) {
                    var a =
                        this; b.sort(); b.on("focusChanged", function (b) { (b = b.data.current) && a.preferredIssueFinder.set(b) }); a.issues = b
                }, w.prototype.onNoIssues = function () { alert(this.editor.lang.a11ychecker.noIssuesMessage); this.close() }, w.prototype.getTempOutput = function () { var b = this._; return b.scratchpad || (b.scratchpad = CKEDITOR.document.createElement("div"), b.scratchpad.setStyle("display", "none")), b.scratchpad }, w.prototype.getQuickFixLang = function () {
                    var b = this.editor, a = b.config, b = b.plugins.a11ychecker.quickFixesLang.split(",");
                    return z.getPreferredLanguage(a.language, a.defaultLanguage, b) || b[0]
                }, w.prototype._engineProcessed = function (b, a) { var h, m; this.editableDecorator.resolveEditorElements(b); this._setIssueList(b); this.setMode(w.modes.CHECKING); a.ui && this.ui.update(); h = this.fire("checked", { issues: b }); a.callback && a.callback.call(this, !0 === b.count(!0), b); !1 !== h && (b.count() ? (m = this.preferredIssueFinder.getFromListIndex(b) || 0, m >= b.count() && (m = 0), this.showIssue(b.getItem(m))) : this.onNoIssues()) }, w.prototype._withUndoManager =
                function (b) { var a = this.editor, h = !!a.undoManager.locked; h && a.fire("unlockSnapshot"); b.call(this); h && a.fire("lockSnapshot", { dontUpdate: !0 }) }, CKEDITOR.event.implementOn(w.prototype), w
        }(E, F, G, H, I, J, A, B, C); T = function () {
            function a() { } return a.prototype = { guideline: "aAdjacentWithSameResourceShouldBeCombined aImgAltNotRepetitive aLinksAreSeparatedByPrintableCharacters aMustNotHaveJavascriptHref aSuspiciousLinkText blockquoteNotUsedForIndentation documentVisualListsAreMarkedUp headerH1 headerH2 headerH3 headerH4 imgAltIsDifferent imgAltIsTooLong imgAltNotEmptyInAnchor imgAltTextNotRedundant imgHasAlt imgShouldNotHaveTitle pNotUsedAsHeader tableDataShouldHaveTh imgWithEmptyAlt".split(" ") },
                a
        }(); (function () {
            function a(b) { return v(b) ? q(b, "a11ychecker.next", "next") : void 0 } function b(b) { return v(b) ? q(b, "a11ychecker.prev", "prev") : void 0 } function m(b) { return q(b, "a11ychecker", "exec") } function n(b) { return b._.a11ychecker.listen() } function h(b) { return b._.a11ychecker.close() } function q(b, a, h) { return b._.a11ychecker[h](function () { b.fire("afterCommandExec", { name: a, command: b.getCommand(a), commandData: {} }) }) } function v(b) { return (b = b._.a11ychecker) && b.modeType === b.constructor.modes.CHECKING } function x(b) {
                var a =
                    this.config, h = a.contentsCss; CKEDITOR.tools.isArray(h) || (a.contentsCss = h ? [h] : []); a.contentsCss.push(b)
            } CKEDITOR.plugins.add("a11ychecker", {
                requires: "balloonpanel", lang: "en,nl,de", quickFixesLang: "en,nl,de", icons: "a11ychecker", hidpi: !0, onLoad: function () {
                    var b = this.path; CKEDITOR.document.appendStyleSheet(b + "skins/" + this.getStylesSkinName() + "/a11ychecker.css"); CKEDITOR.tools.extend(CKEDITOR.plugins.a11ychecker, { Engine: P, Issue: Q, IssueList: R, IssueDetails: S }); CKEDITOR.plugins.a11ychecker.quickFixes = new D(b +
                        "quickfix/")
                }, beforeInit: function (b) { var a = this; b.config.a11ychecker_noIgnoreData || b.filter.allow("*[data-a11y-ignore]", "a11ychecker"); this.createTemporaryNamespace(b); b.once("instanceReady", function () { !function (h) { var m = new h(b), n = b._.a11ychecker; b._.a11ychecker = m; n.getEngineType(function (h) { m.setEngine(new h(a)); m.engine.config = m.engine.createConfig(b); n.fire("loaded", null, b) }) }(O) }); a.commandRegister.call(a, b); a.guiRegister(b) }, guiRegister: function (b) {
                    var a = this.path + "skins/" + this.getStylesSkinName() +
                        "/contents.css", h = b.addContentsCss || x; b.ui.addButton && b.ui.addButton("A11ychecker", { label: b.lang.a11ychecker.toolbar, command: "a11ychecker", toolbar: "document,10" }); h.call(b, a)
                }, commandRegister: function (q) {
                    q.addCommand("a11ychecker", { exec: m, async: !0, canUndo: !1, editorFocus: !1 }); q.addCommand("a11ychecker.listen", { exec: n, canUndo: !1, editorFocus: !1 }); q.addCommand("a11ychecker.next", { exec: a, async: !0, canUndo: !1, editorFocus: !1 }); q.addCommand("a11ychecker.prev", { exec: b, async: !0, canUndo: !1, editorFocus: !1 }); q.addCommand("a11ychecker.close",
                        { exec: h })
                }, createTemporaryNamespace: function (b) {
                    b._.a11ychecker = {
                        getEngineType: function (b) {
                            function a(b) { this.jsonPath = (b ? b.path : "") + "libs/quail/" } var h = CKEDITOR.plugins.a11ychecker, m = h.Engine, n = h.IssueList, q = h.Issue, v = h.IssueDetails, x = window.jQuery || window.$; !0; (function () {
                                if (!x || !x.fn) throw Error("Missing jQuery. Accessibility Checker's default engine, Quail.js requires jQuery to work correctly."); x.fn.quail || !function (b) {
                                    Function.prototype.bind = Function.prototype.bind || function (b) {
                                        if ("function" !=
                                            typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); var a = Array.prototype.slice, f = a.call(arguments, 1), e = this, g = function () { }, k = function () { return e.apply(this instanceof g ? this : b || window, f.concat(a.call(arguments))) }; return g.prototype = this.prototype, k.prototype = new g, k
                                    }; var a = {
                                        options: {}, components: {}, lib: {}, testabilityTranslation: { 0: "suggestion", "0.5": "moderate", 1: "severe" }, html: null, strings: {}, accessibilityResults: {}, accessibilityTests: null, guidelines: {
                                            wcag: {
                                                setup: function (b,
                                                    a, f) { f = f || {}; for (var e in this.successCriteria) if (this.successCriteria.hasOwnProperty(e)) { var g = this.successCriteria[e]; g.registerTests(b); a && a.listenTo && "function" == typeof a.listenTo && f.successCriteriaEvaluated && a.listenTo(g, "successCriteriaEvaluated", f.successCriteriaEvaluated) } }, successCriteria: {}
                                            }
                                        }, tests: {}, textSelector: ":not(:empty)", suspectPHeaderTags: "strong b em i u font".split(" "), suspectPCSSStyles: ["color", "font-weight", "font-size", "font-family"], focusElements: "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
                                        emoticonRegex: /((?::|;|B|P|=)(?:-)?(?:\)|\(|o|O|D|P))/g, selfClosingTags: "area base br col command embed hr img input keygen link meta param source track wbr".split(" "), optionalClosingTags: ["p", "li", "th", "tr", "td"], run: function (d) {
                                            function c(b, d, a) {
                                                if (a.guideline && a.guideline.length) { b.tests = b.lib.TestCollection([], { scope: b.html || null }); for (var e = 0, c = a.guideline.length; c > e; ++e) { var f = a.guideline[e]; d[f] && (d[f].scope = b.html || null, b.tests.set(f, d[f])) } } else b.tests = b.lib.TestCollection(d, {
                                                    scope: b.html ||
                                                        null
                                                })
                                            } function f() {
                                                if ("undefined" != typeof d.customTests) for (var b in d.customTests) d.customTests.hasOwnProperty(b) && (d.customTests[b].scope = a.html || null, a.tests.set(b, d.customTests[b])); b = function () { }; for (var e in a.guidelines) a.guidelines[e] && "function" == typeof a.guidelines[e].setup && a.guidelines[e].setup(a.tests, this, { successCriteriaEvaluated: d.successCriteriaEvaluated || b }); a.tests.run({
                                                    preFilter: d.preFilter || function () { }, caseResolve: d.caseResolve || function () { }, testComplete: d.testComplete || function () { },
                                                    testCollectionComplete: d.testCollectionComplete || function () { }, complete: d.complete || function () { }
                                                })
                                            } if (d.reset && (a.accessibilityResults = {}), a.tests = a.lib.TestCollection([], { scope: a.html || null }), "undefined" != typeof quailBuilderTests) a.tests = a.lib.TestCollection(quailBuilderTests, { scope: a.html || null }), f.call(a); else if ("wcag2" === d.guideline) a.lib.wcag2.run(d); else if (d.accessibilityTests) c(a, d.accessibilityTests, d), f.call(a); else {
                                                var e = d.jsonPath; "string" == typeof d.guideline && (e += "/guidelines/" + d.guideline);
                                                b.ajax({ url: e + "/tests.json", dataType: "json", success: function (b) { "object" == typeof b && (c(a, b, d), f.call(a)) }, error: function () { throw Error("Tests could not be loaded"); } })
                                            }
                                        }, listenTo: function (b, a, f) { f = f.bind(this); b.registerListener.call(b, a, f) }, getConfiguration: function (b) { return (b = (b = (b = (b = this.tests.find(b)) && b.get("guidelines")) && this.options.guidelineName && b[this.options.guidelineName]) && b.configuration) ? b : !1 }, isUnreadable: function (b) { return "string" != typeof b ? !0 : b.trim().length ? !1 : !0 }, isDataTable: function (d) {
                                            if (3 >
                                                d.find("tr").length) return !1; if (d.find("th[scope]").length) return !0; var a = d.find("tr:has(td)").length, f = d.find("td[rowspan], td[colspan]"), e = !0; if (f.length) { var g = {}; f.each(function () { "undefined" == typeof g[b(this).index()] && (g[b(this).index()] = 0); g[b(this).index()]++ }); b.each(g, function (b, d) { a > d && (e = !1) }) } d = d.find("table"); if (d.length) { var k = {}; d.each(function () { var d = b(this).parent("td").index(); !1 !== d && "undefined" == typeof k[d] && (k[d] = 0); k[d]++ }); b.each(k, function (b, d) { a > d && (e = !1) }) } return e
                                        }, getTextContents: function (b) {
                                            if (b.is("p, pre, blockquote, ol, ul, li, dl, dt, dd, figure, figcaption")) return b.text();
                                            var a = ""; b = b[0].childNodes; for (var f = 0, e = b.length; e > f; f += 1)3 === b[f].nodeType && (a += b[f].nodeValue); return a
                                        }, validURL: function (b) { return -1 === b.search(" ") }, cleanString: function (b) { return b.toLowerCase().replace(/^\s\s*/, "") }, containsReadableText: function (d, c) { if ((d = d.clone(), d.find("option").remove(), !a.isUnreadable(d.text())) || !a.isUnreadable(d.attr("alt"))) return !0; if (c) { var f = !1; if (d.find("*").each(function () { a.containsReadableText(b(this), !0) && (f = !0) }), f) return !0 } return !1 }
                                    }; if (window && (window.quail =
                                        a), b.fn.quail = function (b) { return this.length ? (a.options = b, a.html = this, a.run(b), this) : this }, b.expr[":"].quailCss = function (d, a, f) { a = f[3].split(/\s*=\s*/); return -1 < b(d).css(a[0]).search(a[1]) }, a.components.acronym = function (d, a, f) {
                                            a.get("$scope").each(function () {
                                                var d = b(this), g = {}, k = {}; d.find("acronym[title], abbr[title]").each(function () { k[b(this).text().toUpperCase().trim()] = b(this).attr("title") }); d.find("p, div, h1, h2, h3, h4, h5").each(function () {
                                                    var d = b(this), e = d.text().split(" "), t = []; 1 < e.length &&
                                                        d.text().toUpperCase() !== d.text() ? (b.each(e, function (b, d) { 2 > d.length || (d = d.replace(/[^a-zA-Zs]/, ""), d.toUpperCase() === d && "undefined" == typeof k[d.toUpperCase().trim()] && ("undefined" == typeof g[d.toUpperCase()] && t.push(d), g[d.toUpperCase()] = d)) }), a.add(f(t.length ? { element: this, expected: d.closest(".quail-test").data("expected"), info: { acronyms: t }, status: "failed" } : { element: this, expected: d.closest(".quail-test").data("expected"), status: "passed" }))) : a.add(f({
                                                            element: this, expected: d.closest(".quail-test").data("expected"),
                                                            status: "passed"
                                                        }))
                                                })
                                            })
                                        }, a.components.color = function () {
                                            function d(d) { return "" !== b.trim(d) } var c = {
                                                cache: {}, getLuminosity: function (b, d) {
                                                    var a = "getLuminosity_" + b + "_" + d; if (b = c.parseColor(b), d = c.parseColor(d), void 0 !== c.cache[a]) return c.cache[a]; var k, l, p = b.r / 255, t = b.g / 255, r = b.b / 255, p = .03928 >= p ? p / 12.92 : Math.pow((p + .055) / 1.055, 2.4), t = .03928 >= t ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4), r = .03928 >= r ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4), u = d.r / 255, y = d.g / 255, h = d.b / 255, u = .03928 >= u ? u / 12.92 : Math.pow((u + .055) / 1.055, 2.4),
                                                        y = .03928 >= y ? y / 12.92 : Math.pow((y + .055) / 1.055, 2.4), h = .03928 >= h ? h / 12.92 : Math.pow((h + .055) / 1.055, 2.4); return k = .2126 * p + .7152 * t + .0722 * r, l = .2126 * u + .7152 * y + .0722 * h, c.cache[a] = Math.round((Math.max(k, l) + .05) / (Math.min(k, l) + .05) * 10) / 10, c.cache[a]
                                                }, fetchImageColorAtPixel: function (b, d, a) { d = "undefined" != typeof d ? d : 1; a = "undefined" != typeof a ? a : 1; var c = document.createElement("canvas").getContext("2d"); c.drawImage(b, 0, 0); b = c.getImageData(d, a, 1, 1).data; return "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" }, testElmContrast: function (b,
                                                    d, a) { var k = c.getColor(d, "background"); return c.testElmBackground(b, d, k, a) }, testElmBackground: function (b, d, a, k) { var l, p = c.getColor(d, "foreground"); return "wcag" === b ? l = c.passesWCAGColor(d, p, a, k) : "wai" === b && (l = c.passesWAIColor(p, a)), l }, passesWCAGColor: function (b, d, g, k) { var l = a.components.convertToPx(b.css("fontSize")); "undefined" == typeof k && (18 <= l ? k = 3 : (b = b.css("fontWeight"), k = 14 <= l && ("bold" === b || 700 <= parseInt(b, 10)) ? 3 : 4.5)); return c.getLuminosity(d, g) > k }, passesWAIColor: function (b, d) {
                                                        var a = c.getWAIErtContrast(b,
                                                            d), k = c.getWAIErtBrightness(b, d); return 500 < a && 125 < k
                                                    }, getWAIErtContrast: function (b, d) { var a = c.getWAIDiffs(b, d); return a.red + a.green + a.blue }, getWAIErtBrightness: function (b, d) { var a = c.getWAIDiffs(b, d); return (299 * a.red + 587 * a.green + 114 * a.blue) / 1E3 }, getWAIDiffs: function (b, d) { return { red: Math.abs(b.r - d.r), green: Math.abs(b.g - d.g), blue: Math.abs(b.b - d.b) } }, getColor: function (d, a) {
                                                        var g = c; d.attr("data-cacheId") || d.attr("data-cacheId", "id_" + Math.random()); var k = "getColor_" + a + "_" + d.attr("data-cacheId"); if (void 0 !==
                                                            c.cache[k]) return c.cache[k]; if ("foreground" === a) return c.cache[k] = d.css("color") ? d.css("color") : "rgb(0,0,0)", c.cache[k]; var l = d.css("background-color"); return c.hasBackgroundColor(l) ? (c.cache[k] = l, c.cache[k]) : (d.parents().each(function () { var d = b(this).css("background-color"); return c.hasBackgroundColor(d) ? g.cache[k] = d : void 0 }), c.cache[k] = "rgb(255,255,255)", c.cache[k])
                                                    }, getForeground: function (b) { return c.getColor(b, "foreground") }, parseColor: function (b) {
                                                        return "object" == typeof b ? b : "#" === b.substr(0,
                                                            1) ? { r: parseInt(b.substr(1, 2), 16), g: parseInt(b.substr(3, 2), 16), b: parseInt(b.substr(5, 2), 16), a: !1 } : "rgb" === b.substr(0, 3) ? (b = b.replace("rgb(", "").replace("rgba(", "").replace(")", "").split(","), { r: b[0], g: b[1], b: b[2], a: "undefined" == typeof b[3] ? !1 : b[3] }) : void 0
                                                    }, getBackgroundImage: function (d) {
                                                        d.attr("data-cacheId") || d.attr("data-cacheId", "id_" + Math.random()); var a = "getBackgroundImage_" + d.attr("data-cacheId"); if (void 0 !== c.cache[a]) return c.cache[a]; for (d = d[0]; d && 1 === d.nodeType && "BODY" !== d.nodeName && "HTML" !==
                                                            d.nodeName;) { var g = b(d).css("background-image"); if (g && "none" !== g && -1 !== g.search(/^(.*?)url(.*?)$/i)) return c.cache[a] = g.replace("url(", "").replace(/['"]/g, "").replace(")", ""), c.cache[a]; d = d.parentNode } return c.cache[a] = !1, !1
                                                    }, getBackgroundGradient: function (d) {
                                                        d.attr("data-cacheId") || d.attr("data-cacheId", "id_" + Math.random()); var a = "getBackgroundGradient_" + d.attr("data-cacheId"); if (void 0 !== c.cache[a]) return c.cache[a]; var g = function (d) { return "" !== b.trim(d) }; for (d = d[0]; d && 1 === d.nodeType && "BODY" !==
                                                            d.nodeName && "HTML" !== d.nodeName && !c.hasBackgroundColor(b(d).css("background-color"));) { var k = b(d).css("backgroundImage"); if (k && "none" !== k && -1 !== k.search(/^(.*?)gradient(.*?)$/i) && (k = k.match(/gradient(\(.*\))/g), 0 < k.length)) return k = k[0].replace(/(linear|radial|from|\bto\b|gradient|top|left|bottom|right|\d*%)/g, ""), c.cache[a] = b.grep(k.match(/(rgb\([^\)]+\)|#[a-z\d]*|[a-z]*)/g), g), c.cache[a]; d = d.parentNode } return c.cache[a] = !1, !1
                                                    }, getAverageRGB: function (b) {
                                                        var d = b.src; if (void 0 !== c.cache[d]) return c.cache[d];
                                                        var a, k, l, p = { r: 0, g: 0, b: 0 }; k = document.createElement("canvas"); var t = k.getContext && k.getContext("2d"), r = -4, u = { r: 0, g: 0, b: 0, a: 0 }, y = 0; if (!t) return c.cache[d] = p, p; l = k.height = b.height; k = k.width = b.width; t.drawImage(b, 0, 0); try { a = t.getImageData(0, 0, k, l) } catch (h) { return c.cache[d] = p, p } for (b = a.data.length; (r += 20) < b;)++y, u.r += a.data[r], u.g += a.data[r + 1], u.b += a.data[r + 2]; return u.r = ~~(u.r / y), u.g = ~~(u.g / y), u.b = ~~(u.b / y), c.cache[d] = u, u
                                                    }, colorToHex: function (b) {
                                                        var d = /rgba?\((\d+), (\d+), (\d+)/.exec(b); return d ? "#" +
                                                            (16777216 | d[1] << 16 | d[2] << 8 | d[3]).toString(16).substr(1) : b
                                                    }, hasBackgroundColor: function (b) { return "rgba(0, 0, 0, 0)" !== b && "transparent" !== b }, traverseVisualTreeForBackground: function (a, e) {
                                                        a.attr("data-cacheId") || a.attr("data-cacheId", "id_" + Math.random()); var g = "traverseVisualTreeForBackground_" + a.attr("data-cacheId") + "_" + e; if (void 0 !== c.cache[g]) return c.cache[g]; var k, l = []; a[0].scrollIntoView(); var p = a.offset().left - b(window).scrollLeft(), t = a.offset().top - b(window).scrollTop(); l.push({ element: a, visibility: a.css("visibility") });
                                                        a.css("visibility", "hidden"); for (var r = document.elementFromPoint(p, t); void 0 === k && r && "BODY" !== r.tagName && "HTML" !== r.tagName;) {
                                                            var r = b(r), u, y = r.css("backgroundColor"); switch (e) {
                                                                case "background-color": c.hasBackgroundColor(y) && (k = y); break; case "background-gradient": if (c.hasBackgroundColor(y)) { k = !1; continue } if (u = r.css("backgroundImage"), u && "none" !== u && -1 !== u.search(/^(.*?)gradient(.*?)$/i)) y = u.match(/gradient(\(.*\))/g), 0 < y.length && (y = y[0].replace(/(linear|radial|from|\bto\b|gradient|top|left|bottom|right|\d*%)/g,
                                                                    ""), k = b.grep(y.match(/(rgb\([^\)]+\)|#[a-z\d]*|[a-z]*)/g), d)); break; case "background-image": if (c.hasBackgroundColor(y)) { k = !1; continue } (u = r.css("backgroundImage")) && "none" !== u && -1 !== u.search(/^(.*?)url(.*?)$/i) && (k = u.replace("url(", "").replace(/['"]/g, "").replace(")", ""))
                                                            }l.push({ element: r, visibility: r.css("visibility") }); r.css("visibility", "hidden"); r = document.elementFromPoint(p, t)
                                                        } for (p = 0; p < l.length; p++)l[p].element.css("visibility", l[p].visibility); return c.cache[g] = k, k
                                                    }, getBehindElementBackgroundColor: function (b) {
                                                        return c.traverseVisualTreeForBackground(b,
                                                            "background-color")
                                                    }, getBehindElementBackgroundGradient: function (b) { return c.traverseVisualTreeForBackground(b, "background-gradient") }, getBehindElementBackgroundImage: function (b) { return c.traverseVisualTreeForBackground(b, "background-image") }
                                            }; return {
                                                colors: c, textShouldBeTested: function (d) { d = d.parentNode; var e = b(d); return 1 !== d.nodeType ? !1 : -1 !== "script style title object applet embed template noscript".split(" ").indexOf(d.nodeName.toLowerCase()) ? !1 : a.isUnreadable(e.text()) ? !1 : !0 }, postInvoke: function (b) {
                                                    var d =
                                                        {}; b = b.groupCasesBySelector(); for (var a in b) b.hasOwnProperty(a) && b[a].each(function (b, c) { c.get("status") === d && (d[a] = "") }); return Object.keys(d).length === Object.keys(b).length
                                                }, buildCase: function (b, d, c, k, l, p) { b.add(d({ element: c, expected: a.components.resolveExpectation(c, l), message: p, status: k })) }
                                            }
                                        }(), a.components.content = {
                                            findContent: function (d) {
                                                var a = d; return d.is("[role\x3dmain]") ? d : d.find("[role\x3dmain]").length ? d.find("[role\x3dmain]").first() : 0 === d.find("p").length ? d : (d.find("p").each(function () {
                                                    var d =
                                                        b(this).parent(), e = d.get(0), g = d.data("content-score") || 0; d.data("content-score") || (g = d.find("p").length, e.className.match(/(comment|meta|footer|footnote)/) ? g -= 50 : e.className.match(/((^|\\s)(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)(\\s|$))/) && (g += 25), e.id.match(/(comment|meta|footer|footnote)/) ? g -= 50 : e.id.match(/^(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)$/) && (g += 25), d.data("content-score", g)); g += b(this).text().split(",").length; ("undefined" ==
                                                            typeof a.data("content-score") || g > a.data("content-score")) && (a = d)
                                                }), a)
                                            }
                                        }, a.components.convertToPx = function (d) { if (-1 < d.search("px")) return parseInt(d, 10); d = b('\x3cdiv style\x3d"display: none; font-size: 1em; margin: 0; padding:0; height: ' + d + '; line-height: 1; border:0;"\x3e\x26nbsp;\x3c/div\x3e').appendTo(a.html); var c = d.height(); return d.remove(), c }, a.components.event = function (d, a, f, e) {
                                            var g = a.get("$scope"), g = e.selector && g.find(e.selector) || g.find("*"), k = e.searchEvent || "", l = e.correspondingEvent ||
                                                ""; g.each(function () { var e, g = k.replace("on", ""), r = d.components.hasEventListener(b(this), g); b._data && (e = b._data(this, "events")); e = e && e[g] && !!e[g].length; var g = !!l.length, u = d.components.hasEventListener(b(this), l.replace("on", "")), y = b(this).closest(".quail-test").data("expected"); a.add(f({ element: this, expected: y })).set(!r && !e || g && u ? { status: "passed" } : { status: "failed" }) })
                                        }, a.components.hasEventListener = function (d, a) {
                                            return "undefined" != typeof b(d).attr("on" + a) ? !0 : b._data(b(d)[0], "events") && "undefined" !=
                                                typeof b._data(b(d)[0], "events")[a] ? !0 : b(d).is("a[href], input, button, video, textarea") && "undefined" != typeof b(d)[0][a] && ("click" === a || "focus" === a) && -1 < b(d)[0][a].toString().search(/^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code\]\s*}\s*$/i) ? !1 : "undefined" != typeof b(d)[0][a]
                                        }, a.components.headingLevel = function (d, a, f, e) {
                                            var g = !1; a.get("$scope").find(":header").each(function () {
                                                var k = parseInt(b(this).get(0).tagName.substr(-1, 1), 10);
                                                a.add(f(g === e.headingLevel && k > g + 1 ? { element: this, expected: d.components.resolveExpectation(this), status: "failed" } : { element: this, expected: d.components.resolveExpectation(this), status: "passed" })); g = k
                                            })
                                        }, a.components.htmlSource = {
                                            getHtml: function (d) { if ("undefined" != typeof a.options.htmlSource && a.options.htmlSource) return void d(a.options.htmlSource, this.parseHtml(a.options.htmlSource)); var c = b.ajax({ url: window.location.href, async: !1 }); c && "undefined" != typeof c.responseText && d(c.responseText, this.parseHtml(c.responseText)) },
                                            traverse: function (d, a, f, e) { var g = this; "undefined" == typeof e && a(d, f, !1); "undefined" != typeof d.children && (d.childCount = 1, b.each(d.children, function (b, e) { a(e, d.childCount, d); g.traverse(e, a, d.childCount, !0); "tag" === e.type && d.childCount++ })); b.isArray(d) && b.each(d, function (b, d) { g.traverse(d, a) }) }, addSelector: function (b, a, f) {
                                                if ("tag" === b.type && "undefined" != typeof b.name && "undefined" == typeof b.selector) return b.selector = f && "undefined" != typeof f.selector ? f.selector.slice() : [], f = b.name, "undefined" != typeof b.attributes &&
                                                    ("undefined" != typeof b.attributes.id ? f += "#" + b.attributes.id[0] : "undefined" != typeof b.attributes["class"] && (f += "." + b.attributes["class"][0].replace(/\s/, "."))), !a || "undefined" != typeof b.attributes && "undefined" != typeof b.attributes.id || (f += ":nth-child(" + a + ")"), b.selector.push(f), b.selector
                                            }, parseHtml: function (b) {
                                                if ("undefined" == typeof Tautologistics) return !1; b = b.replace(/<!doctype ([^>]*)>/g, ""); var a = new Tautologistics.NodeHtmlParser.HtmlBuilder(function () { }, {}); (new Tautologistics.NodeHtmlParser.Parser(a)).parseComplete(b);
                                                b = a.dom; return this.traverse(b, this.addSelector), b
                                            }
                                        }, "undefined" != typeof Tautologistics) Tautologistics.NodeHtmlParser.HtmlBuilder.prototype.write = function (b) {
                                            if (this._done && this.handleCallback(Error("Writing to the builder after done() called is not allowed without a reset()")), this._options.includeLocation && "attr" !== b.type && (b.location = this._getLocation(), this._updateLocation(b)), "text" !== b.type || !this._options.ignoreWhitespace || !HtmlBuilder.reWhitespace.test(b.data)) {
                                                var a, f; if (this._tagStack.last()) if (a =
                                                    this._tagStack.last(), "tag" === b.type) if ("/" === b.name.charAt(0)) { if (f = this._options.caseSensitiveTags ? b.name.substring(1) : b.name.substring(1).toLowerCase(), a.name === f && (a.closingTag = !0), !this.isEmptyTag(b)) { for (b = this._tagStack.length - 1; -1 < b && this._tagStack[b--].name !== f;); if (-1 < b || this._tagStack[0].name === f) for (; b < this._tagStack.length - 1;)this._tagStack.pop() } } else "attr" === b.type ? (a.attributes || (a.attributes = {}), "undefined" == typeof a.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()] &&
                                                        (a.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()] = []), a.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()].push(b.data)) : (f = this._copyElement(b), a.children || (a.children = []), a.children.push(f), this.isEmptyTag(f) || this._tagStack.push(f), "tag" === b.type && (this._lastTag = f)); else a = this._tagStack.last(), "attr" === b.type ? (a.attributes || (a.attributes = {}), "undefined" == typeof a.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()] && (a.attributes[this._options.caseSensitiveAttr ?
                                                            b.name : b.name.toLowerCase()] = []), a.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()].push(b.data)) : (a.children || (a.children = []), a.children.push(this._copyElement(b))); else "tag" === b.type ? "/" !== b.name.charAt(0) && (f = this._copyElement(b), f.closingTag = !0, this.dom.push(f), this.isEmptyTag(f) || this._tagStack.push(f), this._lastTag = f) : "attr" === b.type && this._lastTag ? (this._lastTag.attributes || (this._lastTag.attributes = {}), "undefined" == typeof this._lastTag.attributes[this._options.caseSensitiveAttr ?
                                                                b.name : b.name.toLowerCase()] && (this._lastTag.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()] = []), this._lastTag.attributes[this._options.caseSensitiveAttr ? b.name : b.name.toLowerCase()].push(b.data)) : this.dom.push(this._copyElement(b))
                                            }
                                        }; a.components.htmlTagValidator = function () {
                                            var b, a, f, e, g, k, l = /[dD]/, p = /[a-z0-9-]/, t = /^\x3c!--.*--\x3e/, r = "area base br col command embed hr img input keygen link meta param source track wbr".split(" "), u = ["pre", "code", "textarea", "script", "style"],
                                                y = ["p", "li", "tr", "th", "td"], h = function (b) { var d = Error("Ending tag not found for: " + b.name + " at line: " + b.line + " char: " + b["char"] + " starting tags: " + f[0].name); throw d.lineData = b, d; }, m = function (g, l, t) { p.test(g) ? a += g : "/" === g ? b = w : "!" === g ? (a = "", b = X) : -1 < r.indexOf(a) ? k.strict_self_closing_tags ? b = n : (a = "", b = v) : (f.push({ name: a, line: l + 1, "char": t }), -1 < u.indexOf(a) ? (a = "", --e, b = z) : (a = "", --e, b = q)) }, n = function (e, f, g) {
                                                    if ("/" === e) a = "", b = U; else if ("\x3e" === e) throw e = { name: a, line: f + 1, "char": g }, f = Error("Ending `/` not found for: `" +
                                                        e.name + "` at line: " + e.line + " char: " + e["char"]), f.lineData = e.name, f;
                                                }, q = function (a) { "\x3e" === a && (b = U) }, v = function (a) { "\x3c" === a && (b = m) }, w = function (e) { function g() { var e = f.pop(); e.name === a ? b = v : -1 < y.indexOf(e.name) ? g() : h(e) } p.test(e) ? a += e : (g(), a = "") }, x = function (a) { "/" === a ? b = w : (--e, b = m) }, U = function (a) { "\x3c" === a && (b = x) }, z = function (a) { "\x3c" === a && (b = W) }, W = function (a) { "/" === a && (b = A) }, A = function (e) { p.test(e) ? a += e : (e = f.pop(), e.name === a ? b = v : h(e), a = "") }, X = function (f) { l.test(f) ? (a = "", b = v) : (e -= 3, b = B) }, B = function (a,
                                                    e, c) { g || (g = { content: "", line: e + 1, "char": c + 1, name: "comment" }); g.content += a; t.test(g.content) && (g = null, b = v) }; return function (l, r) { var p = null; try { var t, u = l.split("\n"); b = v; a = ""; f = []; g = null; k = r || {}; for (var m = 0, n = u.length; n > m; m++)for (e = 0, t = u[m].length; t > e && b; e++)b(u[m][e], m, e); if (g) { var q = Error("Comment ending not found for: `comment` at line: " + g.line + " char: " + g["char"]); throw q.lineData = g, q; } if (0 < f.length) { var V = f[f.length - 1]; -1 === y.indexOf(V.name) && h(V) } p = null } catch (Y) { p = Y.message } finally { return p } }
                                        }();
                                    a.components.label = function (d, a, f, e) { a.get("$scope").each(function () { var g = b(this); g.find(e.selector).each(function () { a.add(f(b(this).parent("label").length && g.find("label[for\x3d" + b(this).attr("id") + "]").length && d.containsReadableText(b(this).parent("label")) || d.containsReadableText(g.find("label[for\x3d" + b(this).attr("id") + "]")) ? { element: this, expected: b(this).closest(".quail-test").data("expected"), status: "passed" } : { element: this, expected: b(this).closest(".quail-test").data("expected"), status: "failed" })) }) }) };
                                    a.components.labelProximity = function (d, a, f, e) { var g = a.get("$scope"); g.find(e.selector).each(function () { var d = g.find("label[for\x3d" + b(this).attr("id") + "]").first(); a.add(f(d.length && b(this).parent().is(d.parent()) ? { element: this, expected: b(this).closest(".quail-test").data("expected"), status: "passed" } : { element: this, expected: b(this).closest(".quail-test").data("expected"), status: "failed" })) }) }; a.components.language = {
                                        maximumDistance: 300, textDirection: {
                                            rtl: /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm,
                                            ltr: /[\u0041-\u007A]|[\u00C0-\u02AF]|[\u0388-\u058F]/gm
                                        }, textDirectionChanges: { rtl: /[\u200E]|&rlm;/gm, ltr: /[\u200F]|&lrm;/gm }, scripts: { basicLatin: { regularExpression: /[\u0041-\u007F]/g, languages: "ceb en eu ha haw id la nr nso so ss st sw tlh tn ts xh zu af az ca cs cy da de es et fi fr hr hu is it lt lv nl no pl pt ro sk sl sq sv tl tr ve vi".split(" ") }, arabic: { regularExpression: /[\u0600-\u06FF]/g, languages: ["ar", "fa", "ps", "ur"] }, cryllic: { regularExpression: /[\u0400-\u04FF]|[\u0500-\u052F]/g, languages: "bg kk ky mk mn ru sr uk uz".split(" ") } },
                                        scriptSingletons: {
                                            bn: /[\u0980-\u09FF]/g, bo: /[\u0F00-\u0FFF]/g, el: /[\u0370-\u03FF]/g, gu: /[\u0A80-\u0AFF]/g, he: /[\u0590-\u05FF]/g, hy: /[\u0530-\u058F]/g, ja: /[\u3040-\u309F]|[\u30A0-\u30FF]/g, ka: /[\u10A0-\u10FF]/g, km: /[\u1780-\u17FF]|[\u19E0-\u19FF]/g, kn: /[\u0C80-\u0CFF]/g, ko: /[\u1100-\u11FF]|[\u3130-\u318F]|[\uAC00-\uD7AF]/g, lo: /[\u0E80-\u0EFF]/g, ml: /[\u0D00-\u0D7F]/g, mn: /[\u1800-\u18AF]/g, or: /[\u0B00-\u0B7F]/g, pa: /[\u0A00-\u0A7F]/g, si: /[\u0D80-\u0DFF]/g, ta: /[\u0B80-\u0BFF]/g, te: /[\u0C00-\u0C7F]/g, th: /[\u0E00-\u0E7F]/g,
                                            zh: /[\u3100-\u312F]|[\u2F00-\u2FDF]/g
                                        }, getDocumentLanguage: function (b, c) { var f = navigator.language || navigator.userLanguage; return "undefined" != typeof a.options.language && (f = a.options.language), b.parents("[lang]").length && (f = b.parents("[lang]:first").attr("lang")), "undefined" != typeof b.attr("lang") && (f = b.attr("lang")), f = f.toLowerCase().trim(), c ? f.split("-")[0] : f }
                                    }; a.components.placeholder = function (d, a, f, e) {
                                        var g = function (d, e) { a.add(f({ element: d, expected: b(d).closest(".quail-test").data("expected"), status: e })) };
                                        a.get("$scope").find(e.selector).each(function () {
                                            var a = ""; if ("none" === b(this).css("display") && !b(this).is("title")) return void g(this, "inapplicable"); if ("undefined" != typeof e.attribute) { if (("undefined" == typeof b(this).attr(e.attribute) || "tabindex" === e.attribute && 0 >= b(this).attr(e.attribute)) && !e.content) return void g(this, "failed"); b(this).attr(e.attribute) && "undefined" !== b(this).attr(e.attribute) && (a += b(this).attr(e.attribute)) } if (("undefined" == typeof e.attribute || !e.attribute || e.content) && (a += b(this).text(),
                                                b(this).find("img[alt]").each(function () { a += b(this).attr("alt") })), "string" == typeof a && 0 < a.length) { var a = d.cleanString(a), c = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g.exec(a.toLowerCase()); c && c[0].length ? g(this, "failed") : e.empty && d.isUnreadable(a) ? g(this, "failed") : -1 < d.strings.placeholders.indexOf(a) ? g(this, "failed") : g(this, "passed") } else e.empty && "number" != typeof a && g(this, "failed")
                                        })
                                    }; a.components.resolveExpectation = function (d, a) {
                                        var f, e = b(d).closest(".quail-test"), g = e.data("expected"); a || (f = e.data("expected"));
                                        var k = "string" == typeof g && g.split("|"); if (a && 0 === k.length && -1 < g.indexOf(":") && (k = [g]), 0 < k.length && 1 === d.nodeType) for (var l, p = 0, t = k.length; t > p; ++p)if (g = k[p].split(":"), a) { if (g[0] === a) { if (!g[1] || "ignore" === g[1]) return; f = g[1] } } else if (l = b(g[0], e), 1 === l.length && d === l.get(0)) { if (!g[1] || "ignore" === g[1]) return; f = g[1] } return f
                                    }; a.components.selector = function (d, a, f, e) {
                                        this.get("$scope").each(function () {
                                            var f = b(this), k = b(this).find(e.selector); k.length ? k.each(function () {
                                                var f, g = b(this); f = e.test && !g.is(e.test) ?
                                                    "passed" : "failed"; a.add(d.lib.Case({ element: this, expected: g.closest(".quail-test").data("expected"), status: f }))
                                            }) : a.add(d.lib.Case({ element: void 0, expected: f.data("expected") || f.find("[data-expected]").data("expected"), status: e.test ? "inapplicable" : "passed" }))
                                        })
                                    }; a.statistics = {
                                        setDecimal: function (b, a) { var f = Math.pow(10, a || 0); return a ? Math.round(f * b) / f : b }, average: function (b, c) { for (var f = b.length, e = 0; f--;)e += b[f]; return a.statistics.setDecimal(e / b.length, c) }, variance: function (b, c) {
                                            for (var f = a.statistics.average(b,
                                                c), e = b.length, g = 0; e--;)g += Math.pow(b[e] - f, 2); return g /= b.length, a.statistics.setDecimal(g, c)
                                        }, standardDeviation: function (b, c) { var f = Math.sqrt(a.statistics.variance(b, c)); return a.statistics.setDecimal(f, c) }
                                    }; a.components.textStatistics = {
                                        cleanText: function (b) { return b.replace(/[,:;()\-]/, " ").replace(/[\.!?]/, ".").replace(/[ ]*(\n|\r\n|\r)[ ]*/, " ").replace(/([\.])[\. ]+/, "$1").replace(/[ ]*([\.])/, "$1").replace(/[ ]+/, " ").toLowerCase() }, sentenceCount: function (b) { return b.split(".").length + 1 }, wordCount: function (b) {
                                            return b.split(" ").length +
                                                1
                                        }, averageWordsPerSentence: function (b) { return this.wordCount(b) / this.sentenceCount(b) }, averageSyllablesPerWord: function (a) { var c = this, f = 0, e = c.wordCount(a); return e ? (b.each(a.split(" "), function (b, a) { f += c.syllableCount(a) }), f / e) : 0 }, syllableCount: function (b) { return (b = b.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").match(/[aeiouy]{1,2}/g)) && 0 !== b.length ? b.length : 1 }
                                    }; a.components.video = {
                                        isVideo: function (a) {
                                            var c = !1; return b.each(this.providers, function () { a.is(this.selector) && this.isVideo(a) && (c = !0) }),
                                                c
                                        }, findVideos: function (a, c) { b.each(this.providers, function (f, e) { a.find(this.selector).each(function () { var a = b(this); e.isVideo(a) && e.hasCaptions(a, c) }) }) }, providers: {
                                            youTube: {
                                                selector: "a, iframe", apiUrl: "http://gdata.youtube.com/feeds/api/videos/?q\x3d%video\x26caption\x26v\x3d2\x26alt\x3djson", isVideo: function (b) { return !1 !== this.getVideoId(b) ? !0 : !1 }, getVideoId: function (b) {
                                                    var a = b.is("iframe") ? "src" : "href"; return (b = b.attr(a).match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&\?]*).*/)) &&
                                                        11 === b[7].length ? b[7] : !1
                                                }, hasCaptions: function (a, c) { var f = this.getVideoId(a); b.ajax({ url: this.apiUrl.replace("%video", f), async: !1, dataType: "json", success: function (b) { c(a, 0 < b.feed.openSearch$totalResults.$t) } }) }
                                            }, flash: {
                                                selector: "object", isVideo: function (a) { var c = !1; return 0 === a.find("param").length ? !1 : (a.find("param[name\x3dflashvars]").each(function () { -1 < b(this).attr("value").search(/\.(flv|mp4)/i) && (c = !0) }), c) }, hasCaptions: function (a, c) {
                                                    var f = !1; a.find("param[name\x3dflashvars]").each(function () {
                                                        (-1 <
                                                            b(this).attr("value").search("captions") && -1 < b(this).attr("value").search(".srt") || -1 < b(this).attr("value").search("captions.pluginmode")) && (f = !0)
                                                    }); c(a, f)
                                                }
                                            }, videoElement: {
                                                selector: "video", isVideo: function (b) { return b.is("video") }, hasCaptions: function (d, c) {
                                                    var f = d.find("track[kind\x3dsubtitles], track[kind\x3dcaptions]"); if (!f.length) return void c(d, !1); var e = a.components.language.getDocumentLanguage(d, !0); d.parents("[lang]").length && (e = d.parents("[lang]").first().attr("lang").split("-")[0]); var g =
                                                        !1; return f.each(function () { if (!b(this).attr("srclang") || b(this).attr("srclang").toLowerCase() === e) { g = !0; try { 404 === b.ajax({ url: b(this).attr("src"), type: "HEAD", async: !1, error: function () { } }).status && (g = !1) } catch (a) { } } }), g ? void c(d, !0) : void c(d, !1)
                                                }
                                            }
                                        }
                                    }; a.strings.colors = {
                                        aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0",
                                        chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff",
                                        dimgray: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2",
                                        lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970",
                                        mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460",
                                        seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32"
                                    }; a.strings.languageCodes = "bh bi nb bs br bg my es ca km ch ce ny ny zh za cu cu cv kw co cr hr cs da dv dv nl dz en eo et ee fo fj fi nl fr ff gd gl lg ka de ki el kl gn gu ht ht ha he hz hi ho hu is io ig id ia ie iu ik ga it ja jv kl kn kr ks kk ki rw ky kv kg ko kj ku kj ky lo la lv lb li li li ln lt lu lb mk mg ms ml dv mt gv mi mr mh ro ro mn na nv nv nd nr ng ne nd se no nb nn ii ny nn ie oc oj cu cu cu or om os os pi pa ps fa pl pt pa ps qu ro rm rn ru sm sg sa sc gd sr sn ii sd si si sk sl so st nr es su sw ss sv tl ty tg ta tt te th bo ti to ts tn tr tk tw ug uk ur ug uz ca ve vi vo wa cy fy wo xh yi yo za zu".split(" ");
                                    a.strings.newWindow = [/new (browser )?(window|frame)/, /popup (window|frame)/]; a.strings.placeholders = "title,untitled,untitled document,this is the title,the title,content, ,new page,new,nbsp,\x26nbsp;,spacer,image,img,photo,frame,frame title,iframe,iframe title,legend".split(","); a.strings.redundant = { inputImage: ["submit", "button"], link: "link to;link;go to;click here;link;click;more".split(";"), required: ["*"] }; a.strings.siteMap = ["site map", "map", "sitemap"]; a.strings.skipContent = [/(jump|skip) (.*) (content|main|post)/i];
                                    a.strings.suspiciousLinks = "click here,click,more,here,read more,download,add,delete,clone,order,view,read,clic aqu\x26iacute;,clic,haga clic,m\x26aacute;s,aqu\x26iacute;,image".split(","); a.strings.symbols = ["|", "*", /\*/g, "\x3cbr\x3e*", "\x26bull;", "\x26#8226", "♦", "›", "»", "‣", "▶", ".", "◦", "✓", "◽", "•", "—", "◾"]; a.KINGStrongList = function (a, c, f) {
                                        c.get("$scope").find("strong").each(function () {
                                            var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set({
                                                status: b(this).parent().is("li") ?
                                                    "passed" : "failed"
                                            })
                                        })
                                    }; a.KINGUseCurrencyAsSymbol = function (a, c, f) { c.get("$scope").find("p").each(function (e, g) { var k = "dollar euro pound franc krona rupee ruble dinar".split(" "), k = new RegExp("\\d{1,}\\s*(" + k.join("|") + ")\\w*\\b|(" + k.join("|") + ")\\w*\\b\\s*\\d{1,}", "ig"), l = a.getTextContents(b(g)), p = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(p); p.set({ status: k.test(l) ? "failed" : "passed" }) }) }; a.KINGUseLongDateFormat = function (a, c, f) {
                                        c.get("$scope").find("a, article, aside, b, blockquote, caption, cite, dd, del, div, em, figcaption, footer, h1, h2, h3, h4, h5, h6, header, i, label, legend, li, mark, nav, option, p, q, s, section, small, span, strong, sub, summary, sup, td, th, title, u").each(function (a,
                                            d) { var k, l = /\d{1,2}([.\/-])\d{1,2}\1\d{2,4}/g, p = d.childNodes, t = !1, r = [], u = 0; for (k = p.length; k > u; u++)p[u].nodeType === Node.TEXT_NODE && r.push(p[u]); for (u = 0; u < r.length && !t; u++)l.test(r[u].nodeValue) && (t = !0); k = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(k); k.set({ status: t ? "failed" : "passed" }) })
                                    }; a.KINGUsePercentageWithSymbol = function (a, c, f) {
                                        c.get("$scope").find("p").each(function (e, g) {
                                            var k = ["percent", "pct\\."], k = new RegExp("\\d{1,}\\s*(" + k.join("|") + ")|(" + k.join("|") +
                                                ")\\s*\\d{1,}", "ig"), l = a.getTextContents(b(g)), p = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(p); p.set({ status: k.test(l) ? "failed" : "passed" })
                                        })
                                    }; a.aAdjacentWithSameResourceShouldBeCombined = function (a, c, f) {
                                        function e(a, d) { var e = b(d), g = d.getAttribute("href"), r = e.find("+ a"); if (r.length) { var r = r[0].getAttribute("href"), u = "passed", e = f({ element: d, expected: e.closest(".quail-test").data("expected") }); g === r && (u = "failed"); c.add(e); e.set({ status: u }) } } function g(a, d) {
                                            var e =
                                                f({ element: d }); c.add(e); e.set({ status: "inapplicable", expected: b(d).closest(".quail-test").data("expected") })
                                        } c.get("$scope").each(function (a, d) { var c = b(d), f = 0 < c.find("a + a").length; c.find("a").each(f ? e : g) })
                                    }; a.aImgAltNotRepetitive = function (a, c, f) {
                                        c.get("$scope").find("a img[alt]").each(function () {
                                            var e = c.add(f({ element: this })), g = b(this).closest(".quail-test").data("expected"); e.set(a.cleanString(b(this).attr("alt")) === a.cleanString(b(this).parent("a").text()) ? { expected: g, status: "failed" } : {
                                                expected: g,
                                                status: "passed"
                                            })
                                        })
                                    }; a.aInPHasADistinctStyle = function (a, c, f) {
                                        function e(b) { return 0 < b.outerWidth() - b.innerWidth() || 0 < b.outerHeight() - b.innerHeight() } function g(a, d) { var c = !1, f = ["font-weight", "font-style"], g = a.css("text-decoration"); return "none" !== g && g !== d.css("text-decoration") && (c = !0), "rgba(0, 0, 0, 0)" !== a.css("background-color") && f.push("background"), b.each(f, function (b, e) { c || a.css(e) === d.css(e) || (c = !0) }), c || e(a) } var k = /^([\s|-]|>|<|\\|\/|&(gt|lt);)*$/i; c.get("$scope").each(function () {
                                            b(this).find("p a[href]:visible").each(function () {
                                                var a =
                                                    b(this), d = a.closest("p"), e = a.parent(), r = f({ element: this, expected: a.closest(".quail-test").data("expected") }); c.add(r); var u = a.text().trim(), y = d.clone().find("a[href]").remove().end().text(); if ("" === u || y.match(k)) r.set("status", "inapplicable"); else if (a.css("color") === d.css("color")) r.set("status", "passed"); else if (g(a, d)) r.set("status", "passed"); else {
                                                        var y = "block" === a.css("display"), h = a.css("position"); y || "relative" !== h && "static" !== h ? r.set("status", "passed") : 0 < a.find("img").length ? r.set("status",
                                                            "passed") : e.text().trim() === u && g(e, d) ? r.set("status", "passed") : r.set("status", "failed")
                                                    }
                                            })
                                        })
                                    }; a.aLinkTextDoesNotBeginWithRedundantWord = function (a, c, f) {
                                        c.get("$scope").find("a").each(function () {
                                            var e = b(this), g = ""; b(this).find("img[alt]").length && (g += b(this).find("img[alt]:first").attr("alt")); var g = g + b(this).text(), g = g.toLowerCase(), k; b.each(a.strings.redundant.link, function (b, a) { -1 < g.search(a) && (k = c.add(f({ element: this, expected: e.closest(".quail-test").data("expected"), status: "failed" }))) }); k || c.add(f({
                                                element: this,
                                                expected: e.closest(".quail-test").data("expected"), status: "passed"
                                            }))
                                        })
                                    }; a.aLinkWithNonText = function (a, c, f) {
                                        c.get("$scope").find("a").each(function () {
                                            var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); if (c.add(e), !b(this).is("a:has(img, object, embed)[href]")) return void e.set({ status: "inapplicable" }); if (!a.isUnreadable(b(this).text())) return void e.set({ status: "passed" }); var g = 0; b(this).find("img, object, embed").each(function () {
                                                (b(this).is("img") && a.isUnreadable(b(this).attr("alt")) ||
                                                    !b(this).is("img") && a.isUnreadable(b(this).attr("title"))) && g++
                                            }); e.set(b(this).find("img, object, embed").length === g ? { status: "failed" } : { status: "passed" })
                                        })
                                    }; a.aLinksAreSeparatedByPrintableCharacters = function (a, c, f) { c.get("$scope").find("a").each(function () { var e = c.add(f({ element: this })), g = b(this).closest(".quail-test").data("expected"); b(this).next("a").length && e.set(a.isUnreadable(b(this).get(0).nextSibling.wholeText) ? { expected: g, status: "failed" } : { expected: g, status: "passed" }) }) }; a.aLinksDontOpenNewWindow =
                                        function (a, c, f) {
                                            c.get("$scope").find("a").not("[target\x3d_new], [target\x3d_blank]").each(function () { c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: "passed" })) }); c.get("$scope").find("a[target\x3d_new], a[target\x3d_blank]").each(function () {
                                                var e = b(this), g = !1, k = 0, l = e.text() + " " + e.attr("title"), p = ""; do p = a.strings.newWindow[k], -1 < l.search(p) && (g = !0), ++k; while (!g && k < a.strings.newWindow.length); c.add(f(g ? {
                                                    element: this, expected: e.closest(".quail-test").data("expected"),
                                                    status: "passed"
                                                } : { element: this, expected: e.closest(".quail-test").data("expected"), status: "failed" }))
                                            })
                                        }; a.aLinksNotSeparatedBySymbols = function (a, c, f) {
                                            c.get("$scope").find("a").each(function () {
                                                var e = b(this); if (e.next("a").length) {
                                                    var g = e.get(0).nextSibling.wholeText; "string" == typeof g ? -1 !== a.strings.symbols.indexOf(g.toLowerCase().trim()) && c.add(f({ element: this, expected: e.closest(".quail-test").data("expected"), status: "failed" })) : c.add(f({
                                                        element: this, expected: e.closest(".quail-test").data("expected"),
                                                        status: "passed"
                                                    }))
                                                } else c.add(f({ status: "inapplicable" }))
                                            })
                                        }; a.aMustContainText = function (a, c, f) { c.get("$scope").find("a").each(function () { var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); return c.add(e), b(this).attr("href") && "none" !== b(this).css("display") ? void e.set(a.containsReadableText(b(this), !0) ? { status: "passed" } : { status: "failed" }) : void e.set({ status: "inapplicable" }) }) }; a.aSuspiciousLinkText = function (a, c, f) {
                                            c.get("$scope").find("a").each(function () {
                                                var e = f({
                                                    element: this,
                                                    expected: b(this).closest(".quail-test").data("expected")
                                                }); if (c.add(e), !b(this).attr("href")) return void e.set({ status: "inapplicable" }); var g = b(this).text(); b(this).find("img[alt]").each(function () { g += b(this).attr("alt") }); e.set(-1 < a.strings.suspiciousLinks.indexOf(a.cleanString(g)) ? { status: "failed" } : { status: "passed" })
                                            })
                                        }; a.animatedGifMayBePresent = function (a, c, f) {
                                            function e(b, a, d) {
                                                if ("gif" !== a) return void d(!1); var e = new XMLHttpRequest; e.open("GET", b, !0); e.responseType = "arraybuffer"; e.addEventListener("load",
                                                    function () { var b = new Uint8Array(e.response), a = 0; if (71 !== b[0] || 73 !== b[1] || 70 !== b[2] || 56 !== b[3]) return void d(!1); for (var c = 0; c < b.length - 9; c++)if (0 !== b[c] || 33 !== b[c + 1] || 249 !== b[c + 2] || 4 !== b[c + 3] || 0 !== b[c + 8] || 44 !== b[c + 9] && 33 !== b[c + 9] || a++ , 1 < a) return void d(!0); d(!1) }); e.send()
                                            } c.get("$scope").find("img").each(function () {
                                                var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this).attr("src"), l = b(this).attr("src").split(".").pop().toLowerCase(); return "gif" !==
                                                    l ? void a.set({ status: "inapplicable" }) : void e(d, l, function (b) { return b ? void a.set({ status: "cantTell" }) : void a.set({ status: "inapplicable" }) })
                                            })
                                        }; a.appletContainsTextEquivalent = function (a, c, f) { c.get("$scope").find('applet[alt\x3d""], applet:not(applet[alt])').each(function () { var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(e); e.set(a.isUnreadable(b(this).text()) ? { status: "failed" } : { status: "passed" }) }) }; a.ariaOrphanedContent = function (a, c, f) {
                                            c.get("$scope").each(function () {
                                                var a =
                                                    b(this), d = !!a.attr("role"), k = !!a.find("[role]").length; if (!d && !k) return void c.add(f({ expected: a.data("expected"), status: "inapplicable" })); d = a.find("*:not(*[role] *, *[role], script, meta, link)"); d.length ? d.each(function () { c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: "failed" })) }) : c.add(f({ expected: a.data("expected"), status: "passed" }))
                                            })
                                        }; a.audioMayBePresent = function (a, c, f) {
                                            var e = "mp3 m4p ogg oga opus wav wma wv".split(" "); c.get("$scope").each(function () {
                                                var a =
                                                    b(this), d = !1; a.find("object, audio").each(function () { d = !0; c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: "cantTell" })) }); a.find("a[href]").each(function () { var a = b(this), g = a.attr("href").split(".").pop(); -1 !== b.inArray(g, e) && (d = !0, c.add(f({ element: this, expected: a.closest(".quail-test").data("expected"), status: "cantTell" }))) }); d || c.add(f({ element: this, status: "inapplicable", expected: b(this).closest(".quail-test").data("expected") }))
                                            })
                                        }; a.blockquoteUseForQuotations =
                                            function (a, c, f) { c.get("$scope").find("p").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); return c.add(a), 0 < b(this).parents("blockquote").length ? void a.set({ status: "inapplicable" }) : void a.set(-1 < b(this).text().substr(0, 1).search(/'|"|«|“|「/) && -1 < b(this).text().substr(-1, 1).search(/'|"|»|„|」/) ? { status: "failed" } : { status: "passed" }) }) }; a.closingTagsAreUsed = function (a, c, f) {
                                                a.components.htmlSource.getHtml(function (e, g) {
                                                    a.components.htmlSource.traverse(g,
                                                        function (e) {
                                                            if ("tag" === e.type && b.isArray(e.selector)) {
                                                                var g; g = /#/.test(e.selector.slice(-1)[0]) ? e.selector.slice(-1)[0] : e.selector.join(" \x3e "); var p = b(g, c.get("$scope")).get(0); p || (p = e.raw || g); c.add(f("undefined" != typeof e.closingTag || e.closingTag || -1 !== a.selfClosingTags.indexOf(e.name.toLowerCase()) ? { element: p, expected: "object" == typeof p && 1 === p.nodeType && b(p).closest(".quail-test").data("expected") || null, status: "passed" } : {
                                                                    element: p, expected: "object" == typeof p && 1 === p.nodeType && b(p).closest(".quail-test").data("expected") ||
                                                                        null, status: "failed"
                                                                }))
                                                            }
                                                        })
                                                })
                                            }; a.colorBackgroundGradientContrast = function (a, c, f, e) {
                                                var g = a.components.color.colors, k = a.components.color.buildCase; c.get("$scope").each(function () {
                                                    for (var l = document.evaluate("descendant::text()[normalize-space()]", this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), p = [], t = l.iterateNext(); t;)a.components.color.textShouldBeTested(t) && p.push(t.parentNode), t = l.iterateNext(); 0 === p.length && k(c, f, null, "inapplicable", "", "There is no text to evaluate"); p.forEach(function (a) {
                                                        var d =
                                                            b(a), l, p, t; if (l = g.getBackgroundGradient(d)) { for (var h = 0; h < l.length; h++)"rgb" === l[h].substr(0, 3) && (l[h] = g.colorToHex(l[h])); p = new Rainbow; p.setSpectrumByArray(l); t = l.length * e.gradientSampleMultiplier; l = !1; for (h = 0; !l && t > h; h++)g.testElmBackground(e.algorithm, d, "#" + p.colourAt(h)) || (k(c, f, a, "failed", "colorBackgroundGradientContrast", "The background gradient makes the text unreadable"), l = !0); l || k(c, f, a, "passed", "colorBackgroundGradientContrast", "The background gradient does not affect readability") }
                                                    })
                                                })
                                            };
                                    a.colorBackgroundImageContrast = function (a, c, f, e) {
                                        function g(b, a, d, e, c) {
                                            var f = k.getBackgroundImage(e); if (f) {
                                                var g = document.createElement("img"); g.crossOrigin = "Anonymous"; g.onload = function () { var f = k.getAverageRGB(g); k.testElmBackground(d.algorithm, e, f) ? l(b, a, c, "passed", p, "The element's background image does not affect readability") : l(b, a, c, "failed", p, "The element's background image makes the text unreadable") }; g.onerror = g.onabort = function () {
                                                    l(b, a, c, "cantTell", p, "The element's background image could not be loaded (" +
                                                        f + ")")
                                                }; g.src = f
                                            }
                                        } var k = a.components.color.colors, l = a.components.color.buildCase, p = "colorBackgroundImageContrast"; c.get("$scope").each(function () { for (var k = document.evaluate("descendant::text()[normalize-space()]", this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), r = [], p = k.iterateNext(); p;)a.components.color.textShouldBeTested(p) && r.push(p.parentNode), p = k.iterateNext(); 0 === r.length && l(c, f, null, "inapplicable", "", "There is no text to evaluate"); r.forEach(function (a) { g(c, f, e, b(a), a) }) })
                                    }; a.colorElementBehindBackgroundGradientContrast =
                                        function (a, c, f, e) {
                                            var g = a.components.color.colors, k = a.components.color.buildCase; c.get("$scope").each(function () {
                                                for (var l = document.evaluate("descendant::text()[normalize-space()]", this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), p = [], t = l.iterateNext(); t;)a.components.color.textShouldBeTested(t) && p.push(t.parentNode), t = l.iterateNext(); 0 === p.length && k(c, f, null, "inapplicable", "", "There is no text to evaluate"); p.forEach(function (a) {
                                                    var d = b(a), l; if (d.is("option") || (l = g.getBehindElementBackgroundGradient(d)),
                                                        l) { for (var p = 0; p < l.length; p++)"rgb" === l[p].substr(0, 3) && (l[p] = g.colorToHex(l[p])); var t = new Rainbow; t.setSpectrumByArray(l); var h = l.length * e.gradientSampleMultiplier; l = !1; for (p = 0; !l && h > p; p++)l = !g.testElmBackground(e.algorithm, d, "#" + t.colourAt(p)); l ? k(c, f, a, "failed", "colorElementBehindBackgroundGradientContrast", "The background gradient of the element behind this element makes the text unreadable") : k(c, f, a, "passed", "colorElementBehindBackgroundGradientContrast", "The background gradient of the element behind this element does not affect readability") }
                                                })
                                            })
                                        };
                                    a.colorElementBehindBackgroundImageContrast = function (a, c, f, e) {
                                        function g(b, a, d, e, c) {
                                            var f; if (e.is("option") || (f = k.getBehindElementBackgroundImage(e)), f) {
                                                var g = document.createElement("img"); g.crossOrigin = "Anonymous"; g.onload = function () { var f = k.getAverageRGB(g); k.testElmBackground(d.algorithm, e, f) ? l(b, a, c, "passed", p, "The background image of the element behind this element does not affect readability") : l(b, a, c, "failed", p, "The background image of the element behind this element makes the text unreadable") };
                                                g.onerror = g.onabort = function () { l(b, a, c, "cantTell", p, "The background image of the element behind this element could not be loaded (" + f + ")") }; g.src = f
                                            }
                                        } var k = a.components.color.colors, l = a.components.color.buildCase, p = "colorElementBehindBackgroundImageContrast"; c.get("$scope").each(function () {
                                            for (var k = document.evaluate("descendant::text()[normalize-space()]", this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), r = [], p = k.iterateNext(); p;)a.components.color.textShouldBeTested(p) && r.push(p.parentNode),
                                                p = k.iterateNext(); 0 === r.length && l(c, f, null, "inapplicable", "", "There is no text to evaluate"); r.forEach(function (a) { g(c, f, e, b(a), a) })
                                        })
                                    }; a.colorElementBehindContrast = function (a, c, f, e) {
                                        var g = a.components.color.colors, k = a.components.color.buildCase; c.get("$scope").each(function () {
                                            for (var l = document.evaluate("descendant::text()[normalize-space()]", this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), p = [], t = l.iterateNext(); t;)a.components.color.textShouldBeTested(t) && p.push(t.parentNode), t = l.iterateNext();
                                            0 === p.length && k(c, f, null, "inapplicable", "", "There is no text to evaluate"); p.forEach(function (a) { var d = b(a), l; if (d.is("option") || (l = g.getBehindElementBackgroundColor(d)), l) g.testElmBackground(e.algorithm, d, l) ? k(c, f, a, "passed", "colorElementBehindContrast", "The element behind this element does not affect readability") : k(c, f, a, "failed", "colorElementBehindContrast", "The element behind this element makes the text unreadable") })
                                        })
                                    }; a.colorFontContrast = function (a, c, f, e) {
                                        var g = a.components.color.colors, k =
                                            a.components.color.buildCase; c.get("$scope").each(function () {
                                                for (var l = document.evaluate("descendant::text()[normalize-space()]", this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), p = [], t = l.iterateNext(); t;)a.components.color.textShouldBeTested(t) && p.push(t.parentNode), t = l.iterateNext(); 0 === p.length && k(c, f, null, "inapplicable", "", "There is no text to evaluate"); p.forEach(function (a) {
                                                    var d = b(a); g.testElmContrast(e.algorithm, d) ? k(c, f, a, "passed", "colorFontContrast", "The font contrast of the text is sufficient for readability") :
                                                        k(c, f, a, "failed", "colorFontContrast", "The font contrast of the text impairs readability")
                                                })
                                            })
                                    }; a.contentPositioningShouldNotChangeMeaning = function (a, c, f) {
                                        var e = ["top", "left", "right", "bottom"], g = {}, k = !1; c.get("$scope").find("*:has(*:quailCss(position\x3dabsolute))").each(function () {
                                            g = { top: {}, left: {}, right: {}, bottom: {} }; k = !1; var a = b(this); a.find("h1, h2, h3, h4, h5, h6, p, blockquote, ol, li, ul, dd, dt").filter(":quailCss(position\x3dabsolute)").each(function () {
                                                for (var a = 0; a < e.length; a++)"undefined" !=
                                                    typeof b(this).css(e[a]) && "auto" !== b(this).css(e[a]) && ("undefined" == typeof g[e[a]][b(this).css(e[a])] && (g[e[a]][b(this).css(e[a])] = 0), g[e[a]][b(this).css(e[a])]++)
                                            }); b.each(e, function () { b.each(g[this], function () { 2 < this && !k && (k = !0, c.add(f({ element: a.get(0), expected: a.closest(".quail-test").data("expected"), status: "failed" }))) }) })
                                        })
                                    }; a.definitionListsAreUsed = function (a, c, f) {
                                        c.get("$scope").find("dl").each(function () {
                                            var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a);
                                            a.set({ status: "inapplicable" })
                                        }); c.get("$scope").find("p, li").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this); b(this).find("span, strong, em, b, i").each(function () { if (50 > b(this).text().length && 0 === d.text().search(b(this).text())) { if (b(this).is("span") && b(this).css("font-weight") === d.css("font-weight") && b(this).css("font-style") === d.css("font-style")) return void a.set({ status: "passed" }); a.set({ status: "failed" }) } }) })
                                    }; a.doNotUseGraphicalSymbolToConveyInformation =
                                        function (a, c, f) {
                                            c.get("$scope").find(a.textSelector + ":not(abbr, acronym)").each(function () { var e = b(this).text(); 0 === e.replace(/[\W\s]+/g, "").length ? -1 === "✓".indexOf(e) && c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" })) : c.add(f(1 === e.length && 0 <= "?xo[]()+-!*xX".indexOf(e) ? { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : { element: this, expected: a.components.resolveExpectation(this), status: "passed" })) }); c.get("$scope").find(a.textSelector).filter("abbr, acronym").each(function () {
                                                c.add(f({
                                                    element: this,
                                                    expected: a.components.resolveExpectation(this), status: "inapplicable"
                                                }))
                                            })
                                        }; a.doctypeProvided = function (a, c, f) { a = c.get("$scope").get(0); c.add(f(0 !== b(a.doctype).length || document.doctype ? { element: a, expected: "pass", status: "passed" } : { element: a, expected: "fail", status: "failed" })) }; a.documentAbbrIsUsed = function (b, a, f) { b.components.acronym(b, a, f, "abbr") }; a.documentAcronymsHaveElement = function (b, a, f) { b.components.acronym(b, a, f, "acronym") }; a.documentIDsMustBeUnique = function (a, c, f) {
                                            c.get("$scope").each(function () {
                                                0 ===
                                                    b(this).children().length && c.add(f({ element: this, status: "inapplicable", expected: b(this).closest(".quail-test").data("expected") }))
                                            }); c.get("$scope").find(":not([id])").each(function () { c.add(f({ element: this, status: "inapplicable", expected: b(this).closest(".quail-test").data("expected") })) }); c.get("$scope").each(function () {
                                                var e = {}; b(this).find("[id]").each(function () {
                                                    var g = f({ element: this, expected: a.components.resolveExpectation(this) }); c.add(g); "undefined" == typeof e[b(this).attr("id")] && 0 === Object.keys(e).length ?
                                                        (g.set({ status: "inapplicable" }), e[b(this).attr("id")] = b(this).attr("id")) : "undefined" == typeof e[b(this).attr("id")] ? (g.set({ status: "passed" }), e[b(this).attr("id")] = b(this).attr("id")) : g.set({ status: "failed" })
                                                })
                                            })
                                        }; a.documentIsWrittenClearly = function (a, c, f) {
                                            c.get("$scope").find(a.textSelector).each(function () {
                                                var e = a.components.textStatistics.cleanText(b(this).text()), g = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); return c.add(g), a.isUnreadable(e) ? void g.set({ status: "inapplicable" }) :
                                                    void g.set(60 > Math.round(206.835 - 1.015 * a.components.textStatistics.averageWordsPerSentence(e) - 84.6 * a.components.textStatistics.averageSyllablesPerWord(e)) ? { status: "failed" } : { status: "passed" })
                                            })
                                        }; a.documentLangIsISO639Standard = function (a, c, f) {
                                            var e = c.get("$scope").is("html") ? c.get("$scope") : c.get("$scope").find("html").first(); f = f({ element: e[0], expected: e.closest(".quail-test").length ? e.closest(".quail-test").data("expected") : e.data("expected") }); var g = e.attr("lang"), k = !1; c.add(f); e.is("html") && "undefined" !=
                                                typeof g ? (b.each(a.strings.languageCodes, function (b, a) { k || 0 !== g.indexOf(a) || (k = !0) }), f.set(k ? null === g.match(/^[a-z]{2}(-[A-Z]{2})?$/) ? { status: "failed" } : { status: "passed" } : { status: "failed" })) : f.set({ status: "inapplicable" })
                                        }; a.documentStrictDocType = function (b, a, f) {
                                            a.add(f("undefined" != typeof document.doctype && document.doctype && -1 !== document.doctype.systemId.search("strict") ? { element: document, expected: a.get("$scope").data("expected"), status: "passed" } : {
                                                element: document, expected: a.get("$scope").data("expected"),
                                                status: "failed"
                                            }))
                                        }; a.documentTitleIsShort = function (b, a, f) { b = a.get("$scope").find("head title:first"); f = f({ element: b, expected: b.closest(".quail-test").data("expected") }); return a.add(f), b.length ? void f.set({ status: 150 < b.text().length ? "failed" : "passed" }) : void f.set({ element: a.get("$scope"), status: "inapplicable" }) }; a.documentValidatesToDocType = function () { "undefined" == typeof document.doctype }; a.documentVisualListsAreMarkedUp = function (a, c, f) {
                                            var e = RegExp("(^|\x3cbr[^\x3e]*\x3e)[\\s]*(♦|›|»|‣|▶|◦|✓|◽|•|—|◾|-\\D|\\\\|\\*(?!\\*)|\\.\\s|x\\s|\x26bull;|\x26#8226;|\x26gt;|[0-9]+\\.|\\(?[0-9]+\\)|[\\u25A0-\\u25FF]|[IVX]{1,5}\\.\\s)",
                                                "gi"); c.get("$scope").find(a.textSelector).each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this).html().match(e); a.set({ status: d && 2 < d.length ? "failed" : "passed" }) })
                                        }; a.elementAttributesAreValid = function (a, c, f) {
                                            a.components.htmlSource.getHtml(function (e, g) {
                                                g && a.components.htmlSource.traverse(g, function (a) {
                                                    if ("undefined" != typeof a.raw && b.isArray(a.selector)) {
                                                        var d, e = !1; d = /#/.test(a.selector.slice(-1)[0]) ? a.selector.slice(-1)[0] : a.selector.join(" \x3e ");
                                                        var g = b(d, c.get("$scope")).get(0); g || (g = a.raw || d); (d = a.raw.match(/\'|\"/g)) && 0 !== d.length % 2 && (c.add(f({ element: g, expected: "object" == typeof g && 1 === g.nodeType && b(g).closest(".quail-test").data("expected") || null, status: "failed" })), e = !0); -1 < a.raw.search(/([a-z]*)=(\'|\")([a-z\.]*)(\'|\")[a-z]/i) && (c.add(f({ element: g, expected: "object" == typeof g && 1 === g.nodeType && b(g).closest(".quail-test").data("expected") || null, status: "failed" })), e = !0); a = a.raw.split("\x3d"); a.shift(); b.each(a, function () {
                                                            -1 === this.search(/\'|\"/) &&
                                                                -1 < this.search(/\s/i) && (c.add(f({ element: g, expected: "object" == typeof g && 1 === g.nodeType && b(g).closest(".quail-test").data("expected") || null, status: "failed" })), e = !0)
                                                        }); e || c.add(f({ element: g, expected: "object" == typeof g && 1 === g.nodeType && b(g).closest(".quail-test").data("expected") || null, status: "passed" }))
                                                    }
                                                })
                                            })
                                        }; a.elementsDoNotHaveDuplicateAttributes = function (a, c, f) {
                                            a.components.htmlSource.getHtml(function (e, g) {
                                                g && a.components.htmlSource.traverse(g, function (a) {
                                                    if ("tag" === a.type && b.isArray(a.selector)) {
                                                        var d;
                                                        d = /#/.test(a.selector.slice(-1)[0]) ? a.selector.slice(-1)[0] : a.selector.join(" \x3e "); var e = b(d, c.get("$scope")).get(0); if (e || (e = a.raw || d), "undefined" != typeof a.attributes) {
                                                            var g = []; b.each(a.attributes, function (b, a) { 1 < a.length && g.push(a) }); c.add(f(g.length ? { element: e, expected: "object" == typeof e && 1 === e.nodeType && b(e).closest(".quail-test").data("expected") || null, info: g, status: "failed" } : {
                                                                element: e, expected: "object" == typeof e && 1 === e.nodeType && b(e).closest(".quail-test").data("expected") || null, info: g,
                                                                status: "passed"
                                                            }))
                                                        }
                                                    }
                                                })
                                            })
                                        }; a.embedHasAssociatedNoEmbed = function (a, c, f) { c.get("$scope").find("embed").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set({ status: b(this).find("noembed").length || b(this).next().is("noembed") ? "passed" : "failed" }) }) }; a.emoticonsExcessiveUse = function (a, c, f) {
                                            c.get("$scope").find(a.textSelector).each(function () {
                                                var e = 0, g = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(g); b.each(b(this).text().split(" "),
                                                    function (b, c) { -1 < c.search(a.emoticonRegex) && e++ }); g.set(0 === e ? { status: "inapplicable" } : { status: 4 < e ? "failed" : "passed" })
                                            })
                                        }; a.emoticonsMissingAbbr = function (a, c, f) {
                                            c.get("$scope").find(a.textSelector + ":not(abbr, acronym)").each(function () {
                                                var e = b(this).clone(), g = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(g); e.find("abbr, acronym").each(function () { b(this).remove() }); var k = "passed"; b.each(e.text().split(" "), function (b, e) { -1 < e.search(a.emoticonRegex) && (k = "failed") });
                                                g.set({ status: k })
                                            })
                                        }; a.focusIndicatorVisible = function (a, c, f) {
                                            c.get("$scope").find(a.focusElements).each(function () {
                                                var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(e); var g = b(this).css("border-width"); b(this).css("border-color"); var k = b(this).css("background-color"), l = b(this).css("box-shadow"); if (b(this).focus(), k.trim() !== b(this).css("background-color").trim()) return b(this).blur(), void e.set({ status: "passed" }); k = a.components.convertToPx(b(this).css("border-width"));
                                                return 2 < k && k !== a.components.convertToPx(g) ? (b(this).blur(), void e.set({ status: "passed" })) : (g = b(this).css("box-shadow") && "none" !== b(this).css("box-shadow") ? b(this).css("box-shadow").match(/(-?\d+px)|(rgb\(.+\))/g) : !1) && b(this).css("box-shadow") !== l && 3 < a.components.convertToPx(g[3]) ? (b(this).blur(), void e.set({ status: "passed" })) : (b(this).blur(), void e.set({ status: "failed" }))
                                            })
                                        }; a.formWithRequiredLabel = function (a, c, f) {
                                            var e, g = a.strings.redundant, k = !1; g.required[g.required.indexOf("*")] = /\*/g; c.get("$scope").each(function () {
                                                b(this).find("label").each(function () {
                                                    var l =
                                                        b(this).text().toLowerCase(), p = b(this), h = c.add(f({ element: this, expected: a.components.resolveExpectation(this) })), r; for (r in g.required) 0 <= l.search(r) && !c.get("$scope").find("#" + p.attr("for")).attr("aria-required") && h.set({ status: "failed" }); k = p.css("color") + p.css("font-weight") + p.css("background-color"); e && k !== e && h.set({ status: "failed" }); e = k; "undefined" == typeof h.get("status") && h.set({ status: "passed" })
                                                })
                                            })
                                        }; a.headerTextIsTooLong = function (a, c, f) {
                                            c.get("$scope").find("h1, h2, h3, h4, h5, h6").each(function () {
                                                var a =
                                                    f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: 128 < b(this).text().replace(/^\s+|\s+$/gm, "").length ? "failed" : "passed" }); c.add(a)
                                            })
                                        }; a.headersAttrRefersToATableCell = function (a, c, f) {
                                            c.get("$scope").find("table").each(function () {
                                                var a = this, d = f({ element: a, expected: b(this).closest(".quail-test").data("expected") }); c.add(d); var k = b(a).find("th[headers], td[headers]"); return 0 === k.length ? void d.set({ status: "inapplicable" }) : void k.each(function () {
                                                    var c = b(this).attr("headers").split(/\s+/);
                                                    b.each(c, function (c, f) { return "" === f || 0 < b(a).find("th#" + f + ",td#" + f).length ? void d.set({ status: "passed" }) : void d.set({ status: "failed" }) })
                                                })
                                            })
                                        }; a.headersUseToMarkSections = function (a, c, f) {
                                            c.get("$scope").find("p").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this); d.find("strong:first, em:first, i:first, b:first").each(function () { a.set({ status: d.text().trim() === b(this).text().trim() ? "failed" : "passed" }) }) }); c.get("$scope").find("ul, ol").each(function () {
                                                var a =
                                                    f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this); if (d.prevAll(":header").length || d.find("li").length !== d.find("li:has(a)").length) return void a.set({ status: "passed" }); var k = !0; d.find("li:has(a)").each(function () { b(this).text().trim() !== b(this).find("a:first").text().trim() && (k = !1) }); k && a.set({ status: "failed" })
                                            })
                                        }; a.headersUsedToIndicateMainContent = function (a, c, f) {
                                            c.get("$scope").each(function () {
                                                var e = b(this), e = a.components.content.findContent(e); c.add(f("undefined" ==
                                                    typeof e || 0 !== e.find(":header").length && e.find(a.textSelector).first().is(":header") ? { element: e.get(0), expected: e.closest(".quail-test").data("expected"), status: "passed" } : { element: e.get(0), expected: e.closest(".quail-test").data("expected"), status: "failed" }))
                                            })
                                        }; a.idRefHasCorrespondingId = function (a, c, f) {
                                            c.get("$scope").find("label[for], *[aria-activedescendant]").each(function () {
                                                var a = b(this), d = f({ element: this, expected: a.closest(".quail-test").data("expected") }); c.add(d); a = a.attr("for") || a.attr("aria-activedescendant");
                                                d.set(0 === c.get("$scope").find("#" + a).length ? { status: "failed" } : { status: "passed" })
                                            })
                                        }; a.idrefsHasCorrespondingId = function (a, c, f) {
                                            function e(a) { var d = []; return b.each("headers aria-controls aria-describedby aria-flowto aria-labelledby aria-owns".split(" "), function (b, e) { var c = a.attr(e); return "undefined" != typeof c && !1 !== c ? void (d = c) : void 0 }), d.split(/\s+/) } c.get("$scope").each(function () {
                                                var a = b(this).find("td[headers], th[headers], [aria-controls], [aria-describedby], [aria-flowto], [aria-labelledby], [aria-owns]");
                                                return 0 === a.length ? void c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: "inapplicable" })) : void a.each(function () { var a = c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected") })), d = e(b(this)), g = "passed"; b.each(d, function (a, d) { return "" !== d && 0 === b("#" + d).length ? void (g = "failed") : void 0 }); a.set({ status: g }) })
                                            })
                                        }; a.imgAltIsDifferent = function (a, c, f) {
                                            c.get("$scope").find("img:not([src])").each(function () {
                                                var a = f({
                                                    element: this, expected: b(this).closest(".quail-test").data("expected"),
                                                    status: "inapplicable"
                                                }); c.add(a)
                                            }); c.get("$scope").find("img[alt][src]").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(b(this).attr("src") === b(this).attr("alt") || b(this).attr("src").split("/").pop() === b(this).attr("alt") ? { status: "failed" } : { status: "passed" }) })
                                        }; a.imgAltIsTooLong = function (a, c, f) {
                                            c.get("$scope").find("img[alt]").each(function () {
                                                var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set({
                                                    status: 100 <
                                                        b(this).attr("alt").length ? "failed" : "passed"
                                                })
                                            })
                                        }; a.imgAltNotEmptyInAnchor = function (a, c, f) { c.get("$scope").find("a[href]:has(img)").each(function () { var e = b(this), g = e.text(), k = f({ element: this, expected: e.closest(".quail-test").data("expected") }); c.add(k); e.find("img[alt]").each(function () { g += " " + b(this).attr("alt") }); k.set(a.isUnreadable(g) ? { status: "failed" } : { status: "passed" }) }) }; a.imgAltTextNotRedundant = function (a, c, f) {
                                            var e = {}; c.get("$scope").find("img[alt]").each(function () {
                                                var a = f({
                                                    element: this,
                                                    expected: b(this).closest(".quail-test").data("expected")
                                                }); c.add(a); "undefined" == typeof e[b(this).attr("alt")] ? e[b(this).attr("alt")] = b(this).attr("src") : a.set(e[b(this).attr("alt")] !== b(this).attr("src") ? { status: "failed" } : { status: "passed" })
                                            })
                                        }; a.imgGifNoFlicker = function (a, c, f) {
                                            c.get("$scope").find('img[src$\x3d".gif"]').each(function () {
                                                var a = b(this), d = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(d); b.ajax({
                                                    url: a.attr("src"), dataType: "text", success: function (b) {
                                                        d.set(-1 !==
                                                            b.search("NETSCAPE2.0") ? { status: "failed" } : { status: "inapplicable" })
                                                    }
                                                })
                                            })
                                        }; a.imgHasLongDesc = function (a, c, f) { c.get("$scope").find("img[longdesc]").each(function () { var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(e); e.set(b(this).attr("longdesc") !== b(this).attr("alt") && a.validURL(b(this).attr("longdesc")) ? { status: "passed" } : { status: "failed" }) }) }; a.imgImportantNoSpacerAlt = function (a, c, f) {
                                            c.get("$scope").find("img[alt]").each(function () {
                                                var e = b(this).width() ? b(this).width() :
                                                    parseInt(b(this).attr("width"), 10), g = b(this).height() ? b(this).height() : parseInt(b(this).attr("height"), 10), k = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(k); k.set(a.isUnreadable(b(this).attr("alt").trim()) && 0 < b(this).attr("alt").length && 50 < e && 50 < g ? { status: "failed" } : { status: "passed" })
                                            })
                                        }; a.imgMapAreasHaveDuplicateLink = function (a, c, f) {
                                            var e = {}; c.get("$scope").find("a").each(function () { e[b(this).attr("href")] = b(this).attr("href") }); c.get("$scope").find("img[usemap]").each(function () {
                                                var a =
                                                    f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this), l = c.get("$scope").find(d.attr("usemap")); l.length || (l = c.get("$scope").find('map[name\x3d"' + d.attr("usemap").replace("#", "") + '"]')); l.length ? l.find("area").each(function () { a.set("undefined" == typeof e[b(this).attr("href")] ? { status: "failed" } : { status: "passed" }) }) : a.set({ status: "inapplicable" })
                                            })
                                        }; a.imgNonDecorativeHasAlt = function (a, c, f) {
                                            c.get("$scope").find("img[alt]").each(function () {
                                                var e = f({
                                                    element: this,
                                                    expected: b(this).closest(".quail-test").data("expected")
                                                }); c.add(e); e.set(a.isUnreadable(b(this).attr("alt")) && (100 < b(this).width() || 100 < b(this).height()) ? { status: "failed" } : { status: "passed" })
                                            })
                                        }; a.imgWithMathShouldHaveMathEquivalent = function (a, c, f) { c.get("$scope").find("img:not(img:has(math), img:has(tagName))").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); b(this).parent().find("math").length || a.set({ status: "failed" }) }) }; a.inputCheckboxRequiresFieldset =
                                            function (a, c, f) { c.get("$scope").find(":checkbox").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(b(this).parents("fieldset").length ? { status: "passed" } : { status: "failed" }) }) }; a.inputImageAltIsNotFileName = function (a, c, f) {
                                                c.get("$scope").find("input[type\x3dimage][alt]").each(function () {
                                                    var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(b(this).attr("src") === b(this).attr("alt") ? { status: "failed" } :
                                                        { status: "passed" })
                                                })
                                            }; a.inputImageAltIsShort = function (a, c, f) { c.get("$scope").find("input[type\x3dimage]").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(100 < b(this).attr("alt").length ? { status: "failed" } : { status: "passed" }) }) }; a.inputImageAltNotRedundant = function (a, c, f) {
                                                c.get("$scope").find("input[type\x3dimage][alt]").each(function () {
                                                    var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(e); e.set(-1 < a.strings.redundant.inputImage.indexOf(a.cleanString(b(this).attr("alt"))) ?
                                                        { status: "failed" } : { status: "passed" })
                                                })
                                            }; a.inputWithoutLabelHasTitle = function (a, c, f) {
                                                c.get("$scope").each(function () {
                                                    var e = b(this).find("input, select, textarea"); if (0 === e.length) return e = f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: "inapplicable" }), void c.add(e); e.each(function () {
                                                        var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); return c.add(e), "none" === b(this).css("display") ? void e.set({ status: "inapplicable" }) : void e.set(c.get("$scope").find("label[for\x3d" +
                                                            b(this).attr("id") + "]").length || b(this).attr("title") && !a.isUnreadable(b(this).attr("title")) ? { status: "passed" } : { status: "failed" })
                                                    })
                                                })
                                            }; a.labelMustBeUnique = function (a, c, f) {
                                                var e = {}; c.get("$scope").find("label[for]").each(function () { "undefined" == typeof e[b(this).attr("for")] && (e[b(this).attr("for")] = 0); e[b(this).attr("for")]++ }); c.get("$scope").find("label[for]").each(function () {
                                                    var a = f({
                                                        element: this, expected: b(this).closest(".quail-test").data("expected"), status: 1 === e[b(this).attr("for")] ? "passed" :
                                                            "failed"
                                                    }); c.add(a)
                                                })
                                            }; a.labelsAreAssignedToAnInput = function (a, c, f) { c.get("$scope").find("label").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(b(this).attr("for") && c.get("$scope").find("#" + b(this).attr("for")).length && c.get("$scope").find("#" + b(this).attr("for")).is(":input") ? { status: "passed" } : { status: "failed" }) }) }; a.languageChangesAreIdentified = function (a, c, f) {
                                                var e, g, k, l, p, h = c.get("$scope"), r = a.components.language.getDocumentLanguage(h,
                                                    !0), u = function (e, c, f, g) { var k; e = e.find("[lang\x3d" + c + "]"); return 0 === e.length ? !0 : (f = f.length, e.each(function () { (k = a.getTextContents(b(this)).match(g)) && (f -= k.length) }), 0 < f) }, m = function (b) { return b.attr("lang") ? b.attr("lang").trim().toLowerCase().split("-")[0] : b.parents("[lang]").length ? b.parents("[lang]:first").attr("lang").trim().toLowerCase().split("-")[0] : a.components.language.getDocumentLanguage(h, !0) }; h.find(a.textSelector).each(function () {
                                                        l = this; k = b(this); r = m(k); e = a.getTextContents(k); p = !1;
                                                        b.each(a.components.language.scriptSingletons, function (b, h) { b !== r && (g = e.match(h), g && g.length && u(k, b, g, h) && (c.add(f({ element: l, expected: a.components.resolveExpectation(l), info: { language: b }, status: "failed" })), p = !0)) }); b.each(a.components.language.scripts, function (b, h) { -1 === h.languages.indexOf(r) && (g = e.match(h.regularExpression), g && g.length && u(k, b, g, void 0) && (c.add(f({ element: l, expected: a.components.resolveExpectation(l), info: { language: b }, status: "failed" })), p = !0)) }); "undefined" != typeof guessLanguage &&
                                                            !k.find("[lang]").length && 400 < k.text().trim().length && guessLanguage.info(k.text(), function (b) { b[0] !== r && (c.add(f({ element: l, expected: a.components.resolveExpectation(l), info: { language: b[0] }, status: "failed" })), p = !0) }); p || c.add(f({ element: l, expected: a.components.resolveExpectation(l), status: "passed" }))
                                                    })
                                            }; a.languageDirAttributeIsUsed = function (a, c, f) {
                                                function e() {
                                                    var e = b(this), l = e.attr("dir"); l || (l = e.closest("[dir]").attr("dir") || l); "string" == typeof l && (l = l.toLowerCase()); "undefined" == typeof g[l] && (l =
                                                        "ltr"); var p = "ltr" === l ? "rtl" : "ltr"; if (l = a.getTextContents(e).match(g[p])) { var h = l.length; e.find("[dir\x3d" + p + "]").each(function () { var b = e[0].textContent.match(g[p]); b && (h -= b.length) }); c.add(f({ element: this, expected: a.components.resolveExpectation(this) })).set({ status: 0 < h ? "failed" : "passed" }) }
                                                } var g = a.components.language.textDirection; c.get("$scope").each(function () { b(this).find(a.textSelector).each(e) })
                                            }; a.languageDirectionPunctuation = function (a, c, f) {
                                                var e = c.get("$scope"), g = {}, k = /[\u2000-\u206F]|[!"#$%&'\(\)\]\[\*+,\-.\/:;<=>?@^_`{|}~]/gi,
                                                    l = e.attr("dir") ? e.attr("dir").toLowerCase() : "ltr", h = "ltr" === l ? "rtl" : "ltr", t = a.components.language.textDirection; e.each(function () {
                                                        b(this).find(a.textSelector).each(function () {
                                                            var e = b(this); l = e.attr("dir") ? e.attr("dir").toLowerCase() : e.parent("[dir]").first().attr("dir") ? e.parent("[dir]").first().attr("dir").toLowerCase() : l; "undefined" == typeof t[l] && (l = "ltr"); h = "ltr" === l ? "rtl" : "ltr"; var e = a.getTextContents(e), u = e.match(t[h]), m = c.add(f({ element: this, expected: a.components.resolveExpectation(this) }));
                                                            if (!u) return void m.set({ status: "inapplicable" }); for (var n = e.search(t[h]), u = e.lastIndexOf(u.pop()); g = k.exec(e);)if (g.index === n - 1 || g.index === u + 1) return void m.set({ status: "failed" }); m.set({ status: "passed" })
                                                        })
                                                    })
                                            }; a.languageUnicodeDirection = function (a, c, f) {
                                                var e = c.get("$scope"), g = a.components.language.textDirection, k = a.components.language.textDirectionChanges; e.each(function () {
                                                    b(this).find(a.textSelector).each(function () {
                                                        var e = c.add(f({ element: this, expected: a.components.resolveExpectation(this) })), h =
                                                            b(this).text().trim(), t = -1 !== h.substr(0, 1).search(g.ltr) ? "rtl" : "ltr"; e.set(-1 === h.search(g[t]) ? { status: "inapplicable" } : -1 !== h.search(k[t]) ? { status: "passed" } : { status: "failed" })
                                                    })
                                                })
                                            }; a.linkHasAUniqueContext = function (a, c, f) {
                                                function e(a) { var d = b(a); a = d; for (d = g(d.text()); !a.is("body, html") && -1 === t.indexOf(a.css("display"));)a = a.parent(); var e = a.text().match(/[^\.!\?]+[\.!\?]+/g); null === e && (e = [a.text()]); for (a = 0; a < e.length; a += 1)if (-1 !== g(e[a]).indexOf(d)) return e[a].trim() } function g(a) {
                                                    var b = a.match(/\w+/g);
                                                    return null !== b && (a = b.join(" ")), a.toLowerCase()
                                                } function k(a, b) { return g("" + a) !== g("" + b) } function l(a, d) {
                                                    if (a.href === d.href || k(a.title, d.title)) return !1; var c = b(a).closest("p, li, dd, dt, td, th"), f = b(d).closest("p, li, dd, dt, td, th"); if (0 !== c.length && 0 !== f.length && k(h(c), h(f)) || c.is("td, th") && !f.is("td, th")) return !1; if (c.is("td, th") && f.is("td, th")) {
                                                        var l = !1, t = []; if (c.tableHeaders().each(function () { t.push(g(b(this).text())) }), f.tableHeaders().each(function () {
                                                            var a = g(b(this).text()), a = t.indexOf(a);
                                                            -1 === a ? l = !0 : t.splice(a, 1)
                                                        }), l || 0 < t.length) return !1
                                                    } return k(e(a), e(d)) ? !1 : !0
                                                } function h(a) { var b = a.text(); return a.find("img[alt]").each(function () { b += " " + this.alt.trim() }), g(b) } var t = "block flex list-item table table-caption table-cell".split(" "); c.get("$scope").each(function () {
                                                    var a = b(this), d = a.find("a[href]:visible"), e = {}; 0 === d.length && (a = f({ element: this, status: "inapplicable", expected: a.closest(".quail-test").data("expected") }), c.add(a)); d.each(function () {
                                                        var a = h(b(this)); "undefined" == typeof e[a] &&
                                                            (e[a] = []); e[a].push(this)
                                                    }); b.each(e, function (a, d) { for (; 1 < d.length;) { for (var e = d.pop(), g = !1, k = d.length - 1; 0 <= k; --k) { var h = d[k]; l(e, h) && (g = !0, d.splice(k, 1), c.add(f({ element: h, status: "failed", expected: b(h).closest(".quail-test").data("expected") }))) } c.add(f({ element: e, status: g ? "failed" : "passed", expected: b(e).closest(".quail-test").data("expected") })) } 1 === d.length && c.add(f({ element: d[0], status: "passed", expected: b(d[0]).closest(".quail-test").data("expected") })) })
                                                })
                                            }; a.listNotUsedForFormatting = function (a,
                                                c, f) { c.get("$scope").find("ol, ul").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(2 > b(this).find("li").length ? { status: "failed" } : { status: "passed" }) }) }; a.listOfLinksUseList = function (a, c, f) {
                                                    var e = /(♦|›|»|‣|▶|.|◦|>|✓|◽|•|—|◾|\||\*|&bull;|&#8226;)/g; c.get("$scope").find("a").each(function () {
                                                        var g = c.add(f({ element: this })), k = b(this).closest(".quail-test").data("expected"); if (b(this).next("a").length) {
                                                            var l = b(this).get(0).nextSibling.wholeText.replace(e,
                                                                ""); g.set(!b(this).parent("li").length && a.isUnreadable(l) ? { expected: k, status: "failed" } : { expected: k, status: "passed" })
                                                        }
                                                    })
                                                }; a.newWindowIsOpened = function (a, c, f) { var e, g = window.open; window.open = function (a) { c.each(function (b, d) { -1 < d.get("element").href.indexOf(a) && d.set("status", "failed") }) }; c.get("$scope").find("a").each(function () { e = f({ element: this, expected: a.components.resolveExpectation(this) }); c.add(e); b(this).trigger("click") }); window.open = g }; a.pNotUsedAsHeader = function (a, c, f) {
                                                    c.get("$scope").find("p").each(function () {
                                                        var e =
                                                            f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(e); 1 <= b(this).text().search(".") && e.set({ status: "inapplicable" }); var g = !1; if (1 > b(this).text().search(".")) {
                                                                var k = b(this), l = k.prev("p"); b.each(a.suspectPHeaderTags, function (a, d) { k.find(d).length && k.find(d).each(function () { b(this).text().trim() === k.text().trim() && (e.set({ status: "failed" }), g = !0) }) }); l.length && b.each(a.suspectPCSSStyles, function (a, b) { return k.css(b) !== l.css(b) ? (e.set({ status: "failed" }), g = !0, !1) : void 0 });
                                                                "bold" === k.css("font-weight") && (e.set({ status: "failed" }), g = !0)
                                                            } g || e.set({ status: "passed" })
                                                    })
                                                }; a.paragraphIsWrittenClearly = function (a, c, f) { c.get("$scope").find("p").each(function () { var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(e); var g = a.components.textStatistics.cleanText(b(this).text()); e.set(60 > Math.round(206.835 - 1.015 * a.components.textStatistics.averageWordsPerSentence(g) - 84.6 * a.components.textStatistics.averageSyllablesPerWord(g)) ? { status: "failed" } : { status: "passed" }) }) };
                                    a.preShouldNotBeUsedForTabularLayout = function (a, c, f) { c.get("$scope").find("pre").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this).text().split(/[\n\r]+/); a.set({ status: 1 < d.length && -1 < b(this).text().search(/\t/) ? "failed" : "passed" }) }) }; a.scriptFocusIndicatorVisible = function () {
                                        a.html.find(a.focusElements).each(function () {
                                            var d, c, f, e; f = []; for (var g = 0, k = document.styleSheets.length; k > g; ++g) {
                                                d = document.styleSheets[g]; c = d.cssRules || d.rules;
                                                for (var l = c.length - 1; 0 <= l; --l)e = c[l], e.selectorText && -1 !== e.selectorText.indexOf(":focus") && (f.push({ css: e.cssText, index: l, sheet: g }), d.deleteRule(l))
                                            } c = b(this).css("border-width"); b(this).css("border-color"); e = b(this).css("background-color"); d = b(this).css("box-shadow"); k = b(this).css("outline-width"); b(this).css("outline-color"); b(this).focus(); l = a.components.convertToPx(b(this).css("outline-width")); if (2 < l && l !== a.components.convertToPx(k) || e !== b(this).css("background-color")) return void b(this).blur();
                                            e = a.components.convertToPx(b(this).css("border-width")); if (2 < e && e !== a.components.convertToPx(c) || (c = b(this).css("box-shadow") && "none" !== b(this).css("box-shadow") ? b(this).css("box-shadow").match(/(-?\d+px)|(rgb\(.+\))/g) : !1) && b(this).css("box-shadow") !== d && 3 < a.components.convertToPx(c[3])) return void b(this).blur(); b(this).blur(); for (c = f.length - 1; 0 <= c; --g)d = f[c], document.styleSheets[d.sheet].insertRule(d.css, d.index); a.testFails("scriptFocusIndicatorVisible", b(this))
                                        })
                                    }; a.selectJumpMenu = function (a,
                                        c, f) { var e = c.get("$scope"); 0 !== e.find("select").length && e.find("select").each(function () { c.add(f(0 === b(this).parent("form").find(":submit").length && a.components.hasEventListener(b(this), "change") ? { element: this, expected: b(this).closest(".quail-test").data("expected"), status: "failed" } : { element: this, expected: b(this).closest(".quail-test").data("expected"), status: "passed" })) }) }; a.siteMap = function (a, c, f) {
                                            var e = !0, g = f({ element: c.get("$scope").get(0), expected: c.get("$scope").data("expected") }); c.add(g);
                                            c.get("$scope").find("a").each(function () { if ("passed" !== g.get("status")) { var c = b(this).text().toLowerCase(); return b.each(a.strings.siteMap, function (a, b) { return -1 < c.search(b) ? void (e = !1) : void 0 }), !1 === e ? void g.set({ status: "failed" }) : void (e && g.set({ status: "passed" })) } })
                                        }; a.skipToContentLinkProvided = function (a, c, f) {
                                            c.get("$scope").each(function () {
                                                var e = b(this), g = !1; e.find('a[href*\x3d"#"]').each(function () {
                                                    if (!g) for (var k = b(this), l = k.attr("href").split("#").pop(), l = e.find("#" + l), h = a.strings.skipContent.slice(); !g &&
                                                        h.length;) { var t = h.pop(); if (-1 < k.text().search(t) && l.length) { if (k.focus(), k.is(":visible") && "hidden" !== k.css("visibility")) return g = !0, void c.add(f({ element: k.get(0), expected: k.closest(".quail-test").data("expected"), status: "passed" })); k.blur() } }
                                                }); g || c.add(f({ expected: e.data("expected") || e.find("[data-expected]").data("expected"), status: "failed" }))
                                            })
                                        }; a.tabIndexFollowsLogicalOrder = function (a, c, f) {
                                            c.get("$scope").each(function () {
                                                var e = 0; b(this).find("[tabindex]").each(function () {
                                                    var g = b(this).attr("tabindex");
                                                    c.add(f(0 <= parseInt(g, 10) && parseInt(g, 10) !== e + 1 ? { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : { element: this, expected: a.components.resolveExpectation(this), status: "passed" })); e++
                                                })
                                            })
                                        }; a.tableAxisHasCorrespondingId = function (a, c, f) { c.get("$scope").find("[axis]").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(0 === b(this).parents("table").first().find("th#" + b(this).attr("axis")).length ? { status: "failed" } : { status: "passed" }) }) };
                                    a.tableHeaderLabelMustBeTerse = function (a, c, f) { c.get("$scope").find("th, table tr:first td").each(function () { var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); a.set(20 < b(this).text().length && (!b(this).attr("abbr") || 20 < b(this).attr("abbr").length) ? { status: "failed" } : { status: "passed" }) }) }; a.tableLayoutDataShouldNotHaveTh = function (a, c, f) {
                                        c.get("$scope").find("table").each(function () {
                                            var e = f({ element: this, expected: b(this).closest(".quail-test").data("expected") });
                                            c.add(e); e.set(0 !== b(this).find("th").length ? a.isDataTable(b(this)) ? { status: "passed" } : { status: "failed" } : { status: "inapplicable" })
                                        })
                                    }; a.tableLayoutHasNoCaption = function (a, c, f) { c.get("$scope").find("table").each(function () { c.add(f(b(this).find("caption").length ? a.isDataTable(b(this)) ? { element: this, expected: a.components.resolveExpectation(this), status: "passed" } : { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : { element: this, expected: a.components.resolveExpectation(this), status: "inapplicable" })) }) };
                                    a.tableLayoutHasNoSummary = function (a, c, f) { c.get("$scope").each(function () { b(this).find("table[summary]").each(function () { c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected") })).set(a.isDataTable(b(this)) || a.isUnreadable(b(this).attr("summary")) ? { status: "passed" } : { status: "failed" }) }) }) }; a.tableLayoutMakesSenseLinearized = function (a, c, f) {
                                        c.get("$scope").find("table").each(function () {
                                            a.isDataTable(b(this)) || c.add(f({
                                                element: this, expected: a.components.resolveExpectation(this),
                                                status: "failed"
                                            }))
                                        })
                                    }; a.tableNotUsedForLayout = function (a, c, f) { c.get("$scope").find("table").each(function () { c.add(f(a.isDataTable(b(this)) ? { element: this, expected: a.components.resolveExpectation(this), status: "passed" } : { element: this, expected: a.components.resolveExpectation(this), status: "failed" })) }) }; a.tableShouldUseHeaderIDs = function (a, c, f) {
                                        c.get("$scope").find("table").each(function () {
                                            var e = b(this), g = !1; a.isDataTable(e) && (e.find("th").each(function () {
                                                g || b(this).attr("id") || (g = !0, c.add(f({
                                                    element: this,
                                                    expected: a.components.resolveExpectation(this), status: "failed"
                                                })))
                                            }), g || e.find("td[header]").each(function () { g || b.each(b(this).attr("header").split(" "), function (b, l) { e.find("#" + l).length || (g = !0, c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" }))) }) }))
                                        })
                                    }; a.tableSummaryDoesNotDuplicateCaption = function (a, c, f) {
                                        c.get("$scope").find("table[summary]:has(caption)").each(function () {
                                            c.add(f(a.cleanString(b(this).attr("summary")) === a.cleanString(b(this).find("caption:first").text()) ?
                                                { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : { element: this, expected: a.components.resolveExpectation(this), status: "passed" }))
                                        })
                                    }; a.tableSummaryIsNotTooLong = function (a, c, f) { c.get("$scope").find("table[summary]").each(function () { 100 < b(this).attr("summary").trim().length && c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" })) }) }; a.tableUseColGroup = function (a, c, f) {
                                        c.get("$scope").find("table").each(function () {
                                            a.isDataTable(b(this)) && !b(this).find("colgroup").length &&
                                                c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" }))
                                        })
                                    }; a.tableUsesAbbreviationForHeader = function (a, c, f) { c.get("$scope").find("th:not(th[abbr])").each(function () { 20 < b(this).text().length && c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" })) }) }; a.tableUsesScopeForRow = function (a, c, f) {
                                        c.get("$scope").find("table").each(function () {
                                            b(this).find("td:first-child").each(function () {
                                                var e = b(this).next("td"); ("bold" === b(this).css("font-weight") &&
                                                    "bold" !== e.css("font-weight") || b(this).find("strong").length && !e.find("strong").length) && c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" }))
                                            }); b(this).find("td:last-child").each(function () { var e = b(this).prev("td"); ("bold" === b(this).css("font-weight") && "bold" !== e.css("font-weight") || b(this).find("strong").length && !e.find("strong").length) && c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" })) })
                                        })
                                    }; a.tableWithMoreHeadersUseID = function (a,
                                        c, f) { c.get("$scope").find("table:has(th)").each(function () { var e = 0; b(this).find("tr").each(function () { b(this).find("th").length && e++; 1 < e && !b(this).find("th[id]").length && c.add(f({ element: this, expected: a.components.resolveExpectation(this), status: "failed" })) }) }) }; a.tabularDataIsInTable = function (a, c, f) {
                                            c.get("$scope").find("pre").each(function () {
                                                c.add(f(0 <= b(this).html().search("\t") ? { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : {
                                                    element: this, expected: a.components.resolveExpectation(this),
                                                    status: "passed"
                                                }))
                                            })
                                        }; a.tagsAreNestedCorrectly = function (a, b, f) { a.components.htmlSource.getHtml(function (e) { e = a.components.htmlTagValidator(e); var g = f({ expected: b.get("$scope").filter(".quail-test").eq(0).data("expected") }); b.add(g); g.set(e ? { status: "failed", html: e } : { status: "passed" }) }) }; a.textIsNotSmall = function (a, c, f) {
                                            c.get("$scope").find(a.textSelector).each(function () {
                                                var e = b(this).css("font-size"); 0 < e.search("em") && (e = a.components.convertToPx(e)); e = parseInt(e.replace("px", ""), 10); c.add(f(10 > e ?
                                                    { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : { element: this, expected: a.components.resolveExpectation(this), status: "passed" }))
                                            })
                                        }; a.userInputMayBeRequired = function (a, c, f) {
                                            c.get("$scope").each(function () {
                                                var a = f({ element: this, expected: b(this).closest(".quail-test").data("expected") }); c.add(a); var d = b(this).find("form"), k = 0, l = b(this).find("input:not(form input, [type\x3dbutton],[type\x3dreset],[type\x3dimage],[type\x3dsubmit],[type\x3dhidden])"); return d.each(function () {
                                                    var a =
                                                        b(this).find("input:not([type\x3dbutton],[type\x3dreset],[type\x3dimage],[type\x3dsubmit],[type\x3dhidden])"); 1 < a.length && (k = a.length)
                                                }), 0 < k ? void a.set({ status: "cantTell" }) : 1 < l.length ? void a.set({ status: "cantTell" }) : void a.set({ status: "inapplicable" })
                                            })
                                        }; a.videoMayBePresent = function (a, c, f) {
                                            var e = "webm flv ogv ogg avi mov qt wmv asf mp4 m4p m4v mpg mp2 mpeg mpg mpe mpv m2v 3gp 3g2".split(" "), g = ["//www.youtube.com/embed/", "//player.vimeo.com/video/"]; c.get("$scope").each(function () {
                                                var a = b(this), d =
                                                    !1; a.find("object, video").each(function () { d = !0; c.add(f({ element: this, expected: b(this).closest(".quail-test").data("expected"), status: "cantTell" })) }); a.find("a[href]").each(function () { var a = b(this), g = a.attr("href").split(".").pop(); -1 !== b.inArray(g, e) && (d = !0, c.add(f({ element: this, expected: a.closest(".quail-test").data("expected"), status: "cantTell" }))) }); a.find("iframe").each(function () {
                                                        -1 === this.src.indexOf(g[0]) && -1 === this.src.indexOf(g[1]) || (d = !0, c.add(f({
                                                            element: this, expected: a.closest(".quail-test").data("expected"),
                                                            status: "cantTell"
                                                        })))
                                                    }); d || c.add(f({ element: this, status: "inapplicable", expected: b(this).closest(".quail-test").data("expected") }))
                                            })
                                        }; a.videosEmbeddedOrLinkedNeedCaptions = function (a, b, f) { a.components.video.findVideos(b.get("$scope"), function (e, g) { b.add(f(g ? { element: e[0], expected: a.components.resolveExpectation(e), status: "passed" } : { element: e[0], expected: a.components.resolveExpectation(e), status: "failed" })) }) }; a.whiteSpaceInWord = function (a, c, f) {
                                            var e, g; c.get("$scope").find(a.textSelector).each(function () {
                                                g =
                                                    b(this).text() ? b(this).text().match(/[^\s\\]/g) : !1; e = b(this).text() ? b(this).text().match(/[^\s\\]\s[^\s\\]/g) : !1; c.add(f(g && e && 3 < e.length && e.length >= g.length / 2 - 2 ? { element: this, expected: a.components.resolveExpectation(this), status: "failed" } : { element: this, expected: a.components.resolveExpectation(this), status: "passed" }))
                                            })
                                        }; a.whiteSpaceNotUsedForFormatting = function (a, c, f) {
                                            c.get("$scope").find(a.textSelector).each(function () {
                                                var e = c.add(f({ element: this, expected: a.components.resolveExpectation(this) }));
                                                if (0 === b(this).find("br").length) return void e.set({ status: "passed" }); var g = b(this).html().toLowerCase().split(/(<br\ ?\/?>)+/), k = 0; b.each(g, function (a, b) { -1 !== b.search(/(\s|\&nbsp;){2,}/g) && k++ }); e.set(1 < k ? { status: "failed" } : { status: "cantTell" })
                                            })
                                        }; a.lib.Case = function () {
                                            function a(b) { return new a.fn.init(b) } return a.fn = a.prototype = {
                                                constructor: a, init: function (a) {
                                                    this.listeners = {}; this.timeout = null; this.attributes = a || {}; var b = this; return this.attributes.status && "untested" !== this.attributes.status ?
                                                        setTimeout(function () { b.resolve() }, 0) : (this.attributes.status = "untested", this.timeout = setTimeout(function () { b.giveup() }, 350)), this
                                                }, attributes: null, get: function (a) { return this.attributes[a] }, set: function (a, b) { var d = !1; if ("object" == typeof a) for (var g in a) a.hasOwnProperty(g) && ("status" === g && (d = !0), this.attributes[g] = a[g]); else "status" === a && (d = !0), this.attributes[a] = b; return d && this.resolve(), this }, hasStatus: function (a) {
                                                    "object" != typeof a && (a = [a]); for (var b = this.get("status"), d = 0, g = a.length; g > d; ++d)if (a[d] ===
                                                        b) return !0; return !1
                                                }, resolve: function () {
                                                    clearTimeout(this.timeout); var a, b = this.attributes.element; b && b.nodeType && 1 === b.nodeType && (this.attributes.selector = this.defineUniqueSelector(b), this.attributes.html || (this.attributes.html = "", "HTML" === b.nodeName || "BODY" === b.nodeName ? this.attributes.html = "\x3c" + b.nodeName + "\x3e" : "string" == typeof b.outerHTML && (a = b.outerHTML.trim().replace(/(\r\n|\n|\r)/gm, "").replace(/>\s+</g, "\x3e\x3c"), 200 < a.length && (a = a.substr(0, 200) + "... [truncated]"), this.attributes.html =
                                                        a))); this.dispatch("resolve", this)
                                                }, giveup: function () { clearTimeout(this.timeout); this.attributes.status = "notTested"; this.dispatch("timeout", this) }, listenTo: function (a, b, d) { d = d.bind(this); a.registerListener.call(a, b, d) }, registerListener: function (a, b) { this.listeners[a] || (this.listeners[a] = []); this.listeners[a].push(b) }, dispatch: function (a) { if (this.listeners[a] && this.listeners[a].length) { var b = [].slice.call(arguments); this.listeners[a].forEach(function (a) { a.apply(null, b) }) } }, defineUniqueSelector: function (a) {
                                                    function d(a) {
                                                        a =
                                                            a.className || ""; return 0 < a.length && (a = a.split(/\s+/), a = g(a, function (a) { return /active|enabled|disabled|first|last|only|collapsed|open|clearfix|processed/.test(a) }), 0 < a.length) ? "." + a.join(".") : ""
                                                    } function e(a) {
                                                        var e = "", c = "", g = !1, h = !0; do {
                                                            var u = "", c = a.id || ""; if (0 < (c = (0 < c.length && (u = "#" + c), u)).length) { e = c + " " + e; break } !g && 0 < (c = d(a)).length && (e = c + " " + e, 1 === b(e).length && (g = !0)); if (h) {
                                                                var h = void 0, u = "", m = ["href", "type"]; if ("undefined" != typeof a && "undefined" != typeof a.attributes && null !== a.attributes) for (var n =
                                                                    0, q = m.length; q > n; n++)(h = a.attributes[m[n]] && a.attributes[m[n]].value) && (u += "[" + m[n] + '\x3d"' + h + '"]'); h = u; 0 < (c = h).length && (e = c + e); e = a.nodeName.toLowerCase() + e; h = !1
                                                            } a = a.parentNode
                                                        } while (a && 1 === a.nodeType && "BODY" !== a.nodeName && "HTML" !== a.nodeName); return e.trim()
                                                    } function g(a, b) { for (var d = [], e = 0, c = a.length; c > e; e++)b.call(null, a[e]) || d.push(a[e]); return d } return a && e(a)
                                                }, push: [].push, sort: [].sort, concat: [].concat, splice: [].splice
                                            }, a.fn.init.prototype = a.fn, a
                                        }(); a.lib.Section = function () {
                                            function b(a, f) {
                                                return new b.fn.init(a,
                                                    f)
                                            } return b.fn = b.prototype = {
                                                constructor: b, init: function (b, d) { if (!b) return this; if (this.id = b, d.techniques && d.techniques.length) for (var e = 0, g = d.techniques.length; g > e; ++e)this.push(a.lib.Technique(d.techniques[e])); return this }, length: 0, each: function (a) { for (var b = [].slice.call(arguments, 1), d = 0, g = this.length; g > d; ++d)b.unshift(this[d]), b.unshift(d), a.apply(this[d], b); return this }, find: function (a) { for (var b = 0, d = this.length; d > b; ++b)if (this[b].get("name") === a) return this[b]; return null }, set: function (b, d) {
                                                    for (var e =
                                                        0, g = this.length; g > e; ++e)if (this[e].get("name") === b) return this[e].set(d), this[e]; e = a.lib.Test(b, d); return this.push(e), e
                                                }, addTechnique: function (a) { this.push(a) }, regiterTechniqueTestResult: function () { }, push: [].push, sort: [].sort, splice: [].splice
                                            }, b.fn.init.prototype = b.fn, b
                                        }(); a.lib.SuccessCriteria = function () {
                                            function d(a) { return new d.fn.init(a) } function c(a) { return Object.keys(a).length } return d.fn = d.prototype = {
                                                constructor: d, init: function (a) {
                                                    return this.listeners = {}, this.attributes = this.attributes ||
                                                        {}, this.attributes.status = "untested", this.attributes.results = {}, this.attributes.totals = {}, this.set(a || {}), this
                                                }, length: 0, attributes: null, get: function (a) { if ("$scope" === a) { var d = this.attributes.scope, c = b(this.attributes.scope); return this.attributes[a] ? this.attributes[a] : d ? c : b(document) } return this.attributes[a] }, set: function (a, b) { if ("object" == typeof a) for (var d in a) a.hasOwnProperty(d) && (this.attributes[d] = a[d]); else this.attributes[a] = b; return this }, each: function (a) {
                                                    for (var b = [].slice.call(arguments,
                                                        1), d = 0, c = this.length; c > d && (b.unshift(this[d]), b.unshift(d), !1 !== a.apply(this[d], b)); ++d); return this
                                                }, add: function (a) { this.find(a.get("selector")) || this.push(a) }, find: function (a) { for (var b = 0, d = this.length; d > b; ++b)if (this[b].get("selector") === a) return this[b]; return null }, registerTests: function (a) { var b = this.get("preEvaluator"), d = !0; "undefined" != typeof b && (d = b.call(this, a)); d || this.set("status", "inapplicable"); this.set("tests", a); this.listenTo(a, "complete", this.evaluate) }, filterTests: function (b) {
                                                    var d =
                                                        new a.lib.TestCollection, c = this.get("name"); if (!c) throw Error("Success Criteria instances require a name in order to have tests filtered."); var k = c.split(":")[1]; return b.each(function (a, b) { var c = b.getGuidelineCoverage("wcag"), f; for (f in c) c.hasOwnProperty(f) && f === k && d.add(b) }), d
                                                }, addConclusion: function (b, d) {
                                                    this.get("results")[b] || (this.get("results")[b] = a.lib.Test()); this.get("results")[b].push(d); this.get("totals")[b] || (this.get("totals")[b] = 0); ++this.get("totals")[b]; this.get("totals").cases ||
                                                        (this.get("totals").cases = 0); ++this.get("totals").cases
                                                }, evaluate: function (a, b) { if ("inapplicable" !== this.get("status")) { var d = this, k = this.filterTests(b); 0 === k.length ? this.set("status", "noTestCoverage") : (k.each(function (a, b) { b.each(function (a, b) { d.addConclusion(b.get("status"), b) }) }), 0 === c(this.get("results")) ? this.set("status", "noResults") : this.set("status", "tested")) } this.report() }, report: function () {
                                                    var a = Array.prototype.slice.call(arguments), a = [].concat(["successCriteriaEvaluated", this, this.get("tests")],
                                                        a); this.dispatch.apply(this, a)
                                                }, listenTo: function (a, b, d) { d = d.bind(this); a.registerListener.call(a, b, d) }, registerListener: function (a, b) { this.listeners[a] || (this.listeners[a] = []); this.listeners[a].push(b) }, dispatch: function (a) { if (this.listeners[a] && this.listeners[a].length) { var b = [].slice.call(arguments); this.listeners[a].forEach(function (a) { a.apply(null, b) }) } }, push: [].push, sort: [].sort, splice: [].splice
                                            }, d.fn.init.prototype = d.fn, d
                                        }(); a.lib.Technique = function () {
                                            function a(b, f) {
                                                return new a.fn.init(b,
                                                    f)
                                            } return a.fn = a.prototype = {
                                                constructor: a, init: function (a, b) { return this.listeners = {}, a ? (this.attributes = b || {}, this.attributes.name = a, this) : this }, length: 0, attributes: {}, each: function (a) { for (var b = [].slice.call(arguments, 1), d = 0, g = this.length; g > d; ++d)b.unshift(this[d]), b.unshift(d), a.apply(this[d], b); return this }, get: function (a) { return this.attributes[a] }, set: function (a, b) { if ("object" == typeof a) for (var d in a) a.hasOwnProperty(d) && (this.attributes[d] = a[d]); else this.attributes[a] = b; return this }, addTest: function () { },
                                                report: function (a, b) { window.console && window.console.log(this.get("name"), b.status, b, b[0] && b[0].status) }, listenTo: function (a, b, d) { d = d.bind(this); a.registerListener.call(a, b, d) }, registerListener: function (a, b) { this.listeners[a] || (this.listeners[a] = []); this.listeners[a].push(b) }, dispatch: function (a) { if (this.listeners[a] && this.listeners[a].length) { var b = [].slice.call(arguments); this.listeners[a].forEach(function (a) { a.apply(null, b) }) } }, push: [].push, sort: [].sort, splice: [].splice
                                            }, a.fn.init.prototype = a.fn,
                                                a
                                        }(); a.lib.Test = function () {
                                            function d(a, b) { return new d.fn.init(a, b) } function c(a) { a = "undefined" == typeof a ? !0 : a; this.each(function (b, d) { d.get("status") || (a = !1) }); a ? (this.testComplete = null, this.attributes.complete = !0, this.determineStatus()) : this.testComplete() } function f(a, b, d) { var c, f; return function () { var h = this, r = arguments, u = d && !c; return clearTimeout(c), c = setTimeout(function () { c = null; d || (f = a.apply(h, r)) }, b), u && (f = a.apply(h, r)), f } } return d.fn = d.prototype = {
                                                constructor: d, init: function (a, b) {
                                                    return this.listeners =
                                                        {}, this.length = 0, a ? (this.attributes = b || {}, this.attributes.name = a, this.attributes.status = "untested", this.attributes.complete = !1, this) : this
                                                }, length: 0, attributes: null, each: function (a) { for (var b = [].slice.call(arguments, 1), d = 0, c = this.length; c > d; ++d)b.unshift(this[d]), b.unshift(d), a.apply(this[d], b); return this }, get: function (a) { if ("$scope" === a) { var d = this.attributes.scope, c = b(this.attributes.scope); return this.attributes[a] ? this.attributes[a] : d ? c : b(document) } return this.attributes[a] }, set: function (a, b) {
                                                    var d =
                                                        !1; if ("object" == typeof a) for (var c in a) a.hasOwnProperty(c) && ("status" === c && (d = !0), this.attributes[c] = a[c]); else "status" === a && (d = !0), this.attributes[a] = b; return d && this.resolve(), this
                                                }, add: function (a) { return this.listenTo(a, "resolve", this.caseResponded), this.listenTo(a, "timeout", this.caseResponded), a.status && a.dispatch("resolve", a), this.push(a), a }, invoke: function () {
                                                    if (this.testComplete) throw Error("The test " + this.get("name") + " is already running."); if (this.attributes.complete) throw Error("The test " +
                                                        this.get("name") + " has already been run."); var b = this.get("type"), d = this.get("options") || {}, k = this.get("callback"); if (this.testComplete = f(c.bind(this), 400), this.testComplete(!1), "custom" === b) if ("function" == typeof k) try { k.call(this, a, this, a.lib.Case, d) } catch (l) { window.console && window.console.error && window.console.error(l) } else {
                                                            if ("custom" !== b || "function" != typeof a[k]) throw Error("The callback " + k + " cannot be invoked."); try { a[k].call(this, a, this, a.lib.Case, d) } catch (h) {
                                                                window.console && window.console.error &&
                                                                    window.console.error(h)
                                                            }
                                                        } else { if ("function" != typeof a.components[b]) throw Error("The component type " + b + " is not defined."); try { a.components[b].call(this, a, this, a.lib.Case, d) } catch (m) { window.console && window.console.error && window.console.error(m) } } return this.testComplete(), this
                                                }, findByStatus: function (a) { if (a) { var b = new d; "string" == typeof a && (a = [a]); for (var c = 0, f = a.length; f > c; ++c) { var h = a[c]; this.each(function (a, d) { d.get("status") === h && b.add(d) }) } return b } }, findCasesBySelector: function (a) {
                                                    var b = this.groupCasesBySelector();
                                                    return b.hasOwnProperty(a) ? b[a] : new d
                                                }, findCaseByHtml: function (b) { for (var d, c = 0, f = this.length; f > c; ++c)if (d = this[c], b === d.get("html")) return d; return a.lib.Case() }, groupCasesBySelector: function () { var a = {}; return this.each(function (b, c) { var f = c.get("selector"); a[f] || (a[f] = new d); a[f].add(c) }), a }, groupCasesByHtml: function () { var a = {}; return this.each(function (b, c) { var f = c.get("html"); a[f] || (a[f] = new d); a[f].add(c) }), a }, getGuidelineCoverage: function (a) { var b = this.get("guidelines"); return b && b[a] || {} },
                                                caseResponded: function (a, b) { this.dispatch(a, this, b); "function" == typeof this.testComplete && this.testComplete() }, determineStatus: function () {
                                                    var b, d = this.get("type"); a.components[d] && "function" == typeof a.components[d].postInvoke && (b = a.components[d].postInvoke.call(this, this)); this.set(!0 === b ? { status: "passed" } : this.findByStatus(["cantTell"]).length === this.length ? { status: "cantTell" } : this.findByStatus(["inapplicable"]).length === this.length ? { status: "inapplicable" } : this.findByStatus(["failed", "untested"]).length ?
                                                        { status: "failed" } : { status: "passed" })
                                                }, resolve: function () { this.dispatch("complete", this) }, testComplete: null, listenTo: function (a, b, d) { d = d.bind(this); a.registerListener.call(a, b, d) }, registerListener: function (a, b) { this.listeners[a] || (this.listeners[a] = []); this.listeners[a].push(b) }, dispatch: function (a) { if (this.listeners[a] && this.listeners[a].length) { var b = [].slice.call(arguments); this.listeners[a].forEach(function (a) { a.apply(null, b) }) } }, push: [].push, sort: [].sort, concat: [].concat, splice: [].splice
                                            }, d.fn.init.prototype =
                                                d.fn, d
                                        }(); a.lib.TestCollection = function () {
                                            function b(a) { return new b.fn.init(a) } function c() { var a = !0; this.each(function (b, d) { d.get("complete") || (a = !1) }); a ? (this.testsComplete = null, this.dispatch("complete", this)) : this.testsComplete() } function f(a, b, d) { var c, f; return function () { var h = this, r = arguments, u = d && !c; return clearTimeout(c), c = setTimeout(function () { c = null; d || (f = a.apply(h, r)) }, b), u && (f = a.apply(h, r)), f } } return b.fn = b.prototype = {
                                                constructor: b, init: function (b, d) {
                                                    if (this.listeners = {}, d = d || {}, !b) return this;
                                                    if ("object" == typeof b) { var c, f; for (f in b) b.hasOwnProperty(f) && (b[f].scope = b[f].scope || d.scope, c = new a.lib.Test(f, b[f]), this.listenTo(c, "results", this.report), this.push(c)) } return this
                                                }, length: 0, run: function (a) {
                                                    var b = this; return a = a || {}, this.each(function (d, c) { a.preFilter && b.listenTo(c, "resolve", function (b, d, c) { !1 === a.preFilter(b, d, c) && (c.attributes.status = "notTested", c.attributes.expected = null) }); a.caseResolve && b.listenTo(c, "resolve", a.caseResolve); a.testComplete && b.listenTo(c, "complete", a.testComplete) }),
                                                        a.testCollectionComplete && b.listenTo(b, "complete", a.testCollectionComplete), this.testsComplete = f(c.bind(this), 500), this.each(function (a, b) { b.invoke() }), this.testsComplete(), this
                                                }, each: function (a) { for (var b = [].slice.call(arguments, 1), d = 0, c = this.length; c > d && (b.unshift(this[d]), b.unshift(d), !1 !== a.apply(this[d], b)); ++d); return this }, add: function (a) { this.find(a.get("name")) || this.push(a) }, find: function (a) { for (var b = 0, d = this.length; d > b; ++b)if (this[b].get("name") === a) return this[b]; return null }, findByGuideline: function (a) {
                                                    var c =
                                                        { wcag: function (c, f) { function g(a, c, e) { var f = new b; return this.each(function (b, d) { var g = d.get("guidelines"); if (g = g[a] && g[a][c] && g[a][c].techniques) for (var k = 0, h = g.length; h > k; ++k)g[k] === e && (f.listenTo(d, "results", f.report), f.add(d)) }), f } var k = c.id, h = f.get("name"); return k && h ? g.call(this, a, k, h) : void 0 } }; if (c[a]) { var f = [].slice.call(arguments, 1); return c[a].apply(this, f) }
                                                }, findByStatus: function (a) {
                                                    if (a) {
                                                        var c = new b; "string" == typeof a && (a = [a]); for (var f = 0, h = a.length; h > f; ++f) {
                                                            var m = a[f]; this.each(function (a,
                                                                b) { b.get("status") === m && c.add(b) })
                                                        } return c
                                                    }
                                                }, set: function (b, d) { for (var c = 0, f = this.length; f > c; ++c)if (this[c].get("name") === b) return this[c].set(d), this[c]; c = a.lib.Test(b, d); return this.push(c), c }, testsComplete: null, report: function () { this.dispatch.apply(this, arguments) }, listenTo: function (a, b, d) { d = d.bind(this); a.registerListener.call(a, b, d) }, registerListener: function (a, b) { this.listeners[a] || (this.listeners[a] = []); this.listeners[a].push(b) }, dispatch: function (a) {
                                                    if (this.listeners[a] && this.listeners[a].length) {
                                                        var b =
                                                            [].slice.call(arguments); this.listeners[a].forEach(function (a) { a.apply(null, b) })
                                                    }
                                                }, push: [].push, sort: [].sort, splice: [].splice
                                            }, b.fn.init.prototype = b.fn, b
                                        }(); a.lib.WCAGGuideline = function () {
                                            var b = function (a) { return new b.fn.init(a) }; return b.fn = b.prototype = {
                                                constructor: b, init: function (b) {
                                                    if (!b) return this; this.techniques = []; var d, e, g, k, h; if ("object" == typeof b && b.guidelines) {
                                                        d = b.guidelines; for (var m in d) if (d.hasOwnProperty(m)) {
                                                            if (e = d[m], e.techniques && e.techniques.length && (g = e.techniques, delete e.techniques),
                                                                e = a.lib.Section(m, e), g.length) for (var n = 0, r = g.length; r > n; ++n) { if (k = g[n], !b.techniques[k]) throw Error("Definition for Technique " + k + " is missing from the guideline specification"); (h = this.findTechnique(k)) || (h = a.lib.Technique(k, b.techniques[k]), this.techniques.push(h)); e.addTechnique(h) } this.push(e)
                                                        }
                                                    } return this
                                                }, length: 0, each: function (a) { for (var b = [].slice.call(arguments, 1), d = 0, g = this.length; g > d; ++d)b.unshift(this[d]), b.unshift(d), a.apply(this[d], b); return this }, find: function (a) {
                                                    for (var b = 0, d = this.length; d >
                                                        b; ++b)if (this[b].get("name") === a) return this[b]; return null
                                                }, findTechnique: function (a) { for (var b = 0, d = this.techniques.length; d > b; ++b)if (this.techniques[b].get("name") === a) return this.techniques[b]; return null }, set: function (b, d) { for (var e = 0, g = this.length; g > e; ++e)if (this[e].get("name") === b) return this[e].set(d), this[e]; e = a.lib.Test(b, d); return this.push(e), e }, evaluate: function () { }, results: function () { }, push: [].push, sort: [].sort, splice: [].splice
                                            }, b.fn.init.prototype = b.fn, b
                                        }(); (function (a) {
                                            function b(c,
                                                e, f, g) { f = e.attr("rowspan") || 1; e = e.attr("scope"); if ("col" === e) return !0; if (-1 !== n.indexOf(e)) return !1; for (e = 0; e < f * c[g].length - 1; e += 1)if (a(c[g + e % f][~~(e / f)]).is("td")) return !1; return !0 } function f(e, f, g, k) { var h = f.attr("colspan") || 1, l = f.attr("scope"); if ("row" === l) return !0; if (-1 !== n.indexOf(l) || b(e, f, g, k)) return !1; for (f = 0; f < h * e.length - 1; f += 1)if (a(e[~~(f / h)][g + f % h]).is("td")) return !1; return !0 } function e(e, g, k, h, l) {
                                                    var m, n, p = a(), t = a(e[k][g]), q = []; for (t.is("th") ? (n = [{ cell: t, x: g, y: k }], m = !0) : (m = !1, n = []); 0 <=
                                                        g && 0 <= k; g += h, k += l) { var v = a(e[k][g]), w = 0 === h ? "col" : "row"; if (v.is("th")) { m = !0; n.push({ cell: v, x: g, y: k }); var x = !1; -1 === l && f(e, v, g, k) || -1 === h && b(e, v, g, k) ? x = !0 : a.each(q, function (b, c) { var e = +v.attr(w + "span") || 1, f = +a(c.cell).attr(w + "span") || 1; e === f && (-1 === l && c.x === g || -1 === h && c.y === k) && (x = !0) }); !1 === x && (p = p.add(v)) } else v.is("td") && !0 === m && (m = !1, q.push(n), n = a()) } return p
                                                } function g(b) {
                                                    var c = b.closest("table"); b = b.attr("headers").split(/\s/); var e = a(); return a.each(b, function (b, f) {
                                                        e = e.add(a("th#" + f + ", td#" +
                                                            f, c))
                                                    }), e
                                                } function k(a, b) { for (var d, c = 0, e = 0; void 0 === d;) { if (void 0 === a[e]) return; a[e][c] === b[0] ? d = c : c + 1 === a[e].length ? (e += 1, c = 0) : c += 1 } return { x: d, y: e } } function h(b, c) { var f, g = a(), l = k(c, b), m = +b.attr("rowspan") || 1, n = +b.attr("colspan") || 1; for (f = 0; n > f; f++)g = g.add(e(c, l.x + f, l.y, 0, -1)); for (f = 0; m > f; f++)g = g.add(e(c, l.x, l.y + f, -1, 0)); return g } function m(b, c) { var e = k(c, b), f = a(); b.closest("thead, tbody, tfoot").find("th[scope\x3drowgroup]").each(function () { var b = k(c, a(this)); b.x <= e.x && b.y <= e.y && (f = f.add(this)) }) }
                                            var n = ["row", "col", "rowgroup", "colgroup"]; a.fn.getTableMap = function () { var b = []; return this.find("tr").each(function (c) { "undefined" == typeof b[c] && (b[c] = []); var e = b[c]; a(this).children().each(function () { var f, g, k; g = a(this); var h = +g.attr("rowspan") || 1, l = +g.attr("colspan") || 1; g = 0; for (k = e.length; k >= g; g += 1)void 0 === f && void 0 === e[g] && (f = g); g = 0; for (k = l * h; k > g; g += 1)void 0 === b[c + ~~(g / l)] && (b[c + ~~(g / l)] = []), b[c + ~~(g / l)][f + g % l] = this }) }), b }; a.fn.tableHeaders = function () {
                                                var b = a(); return this.each(function () {
                                                    var c =
                                                        a(this); if (!c.is(":not(td, th)")) if (c.is("[headers]")) b = b.add(g(c)); else { var e = c.closest("table").getTableMap(); b = b.add(h(c, e)).add(m(c, e)) }
                                                }), b.not(":empty").not(this)
                                            }
                                        })(jQuery); a.lib.wcag2 = function () {
                                            function d(d, f, k, h) {
                                                var m, n, r = []; f = b.map(f, function (b) { return new a.lib.wcag2.Criterion(b, k, h, d.subject) }); b.each(f, function (a, b) { r.push.apply(r, b.getTests()) }); n = []; m = []; b.each(r, function (a, b) { -1 === n.indexOf(b.title.en) && (n.push(b.title.en), m.push(b)) }); b(a.html).quail({
                                                    accessibilityTests: m, testCollectionComplete: c(f,
                                                        d.testCollectionComplete)
                                                })
                                            } function c(a, d) { return function (c, f) { "complete" === c && (f = b.map(a, function (a) { return a.getResult(f) })); d(c, f) } } var f = { async: !1, dataType: "json" }; return { run: function (a) { a.wcag2Structure && a.accessibilityTests && a.preconditionTests ? d(a, a.wcag2Structure, a.accessibilityTests, a.preconditionTests) : b.when(b.ajax(a.jsonPath + "/wcag2.json", f), b.ajax(a.jsonPath + "/tests.json", f), b.ajax(a.jsonPath + "/preconditions.json", f)).done(function (b, c, f) { d(a, b[0], c[0], f[0]) }) } }
                                        }(); a.guidelines.wcag.successCriteria["1.1.1"] =
                                            function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.1.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {
                                                    F3: "Using CSS to include images that convey important information", F13: "Having a text alternative that does not include information that is conveyed by color differences in the image", F20: "Not updating text alternatives when changes to non-text content occur", F30: "Using text alternatives that are not alternatives (e.g., filenames or placeholder text)", F38: "Not marking up decorative images in HTML in a way that allows assistive technology to ignore them",
                                                    F39: 'Providing a text alternative that is not null (e.g., alt\x3d"spacer" or alt\x3d"image") for images that should be ignored by assistive technology', F65: 'Omitting the alt attribute or text alternative on img elements, area elements, and input elements of type "image"', F67: "Providing long descriptions for non-text content that does not serve the same purpose or does not present the same information", F71: "Using text look-alikes to represent text without providing a text alternative", F72: "Using ASCII art without providing a text alternative"
                                                },
                                                    a
                                            }(a); a.guidelines.wcag.successCriteria["1.2.1"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.2.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.2.2"] = function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.2.2", preEvaluator: function () { return !0 } }); return a.techniques = { G93: "Providing open (always visible) captions", G87: "Providing closed captions" }, a.failures = {
                                                    F74: "Not labeling a synchronized media alternative to text as an alternative",
                                                    F75: "Providing synchronized media without captions when the synchronized media presents more information than is presented on the page", F8: "Captions omitting some dialogue or important sound effects"
                                                }, a
                                            }(a); a.guidelines.wcag.successCriteria["1.2.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.2.3", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.2.4"] = function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.2.4", preEvaluator: function () { return !0 } });
                                                return a.techniques = { G9: "Creating captions for live synchronized media", G93: "Providing open (always visible) captions", G87: "Providing closed captions using any readily available media format that has a video player that supports closed captioning" }, a.failures = {}, a
                                            }(a); a.guidelines.wcag.successCriteria["1.2.5"] = function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.2.5", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                    G78: "Providing a second, user-selectable, audio track that includes audio descriptions",
                                                    G173: "Providing a version of a movie with audio descriptions", "SC1.2.8": "Providing a movie with extended audio descriptions", G8: "Providing a movie with extended audio descriptions", G203: "Using a static text alternative to describe a talking head video"
                                                }, a.failures = {}, a
                                            }(a); a.guidelines.wcag.successCriteria["1.2.7"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.2.7", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.2.8"] = function (a) {
                                                a =
                                                    a.lib.SuccessCriteria({ name: "wcag:1.2.8", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a
                                            }(a); a.guidelines.wcag.successCriteria["1.2.9"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.2.9", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.3.1"] = function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.3.1", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                    G115: "Using semantic elements to mark up structure AND H49: Using semantic markup to mark emphasized or special text",
                                                    G117: "Using text to convey information that is conveyed by variations in presentation of text", G140: "Separating information and structure from presentation to enable different presentations", G138: "Using semantic markup whenever color cues are used", H48: "Using ol, ul and dl for lists or groups of links", H42: "Using h1-h6 to identify headings", SCR21: "Using functions of the Document Object Model (DOM) to add content to a page (Scripting)", H51: "Using table markup to present tabular information", H39: "Using caption elements to associate data table captions with data tables",
                                                    H73: "Using the summary attribute of the table element to give an overview of data tables", H63: "Using the scope attribute to associate header cells and data cells in data tables", H43: "Using id and headers attributes to associate data cells with header cells in data tables", H44: "Using label elements to associate text labels with form controls", H65: "Using the title attribute to identify form controls when the label element cannot be used", H71: "Providing a description for groups of form controls using fieldset and legend elements",
                                                    H85: "Using OPTGROUP to group OPTION elements inside a SELECT", ARIA11: "Using ARIA landmarks to identify regions of a page (ARIA)", ARIA12: "Using role\x3dheading to identify headings (ARIA)", ARIA13: "Using aria-labelledby to name regions and landmarks (ARIA)", ARIA16: "Using aria-labelledby to provide a name for user interface controls (ARIA)", ARIA17: "Using grouping roles to identify related form controls (ARIA)"
                                                }, a.failures = {
                                                    F2: "Using changes in text presentation to convey information without using the appropriate markup or text",
                                                    F17: "Insufficient information in DOM to determine one-to-one relationships (e.g., between labels with same id) in HTML", F42: "Using scripting events to emulate links in a way that is not programmatically determinable", F43: "Using structural markup in a way that does not represent relationships in the content", F87: "Inserting non-decorative content by using :before and :after pseudo-elements and the content property in CSS", F46: "Using th elements, caption elements, or non-empty summary attributes in layout tables",
                                                    F48: "Using the pre element to markup tabular information", F90: "Incorrectly associating table headers and content via the headers and id attributes", F91: "Not correctly marking up table headers", F33: "Using white space characters to create multiple columns in plain text content", F34: "Using white space characters to format tables in plain text content", F68: "Association of label and user interface controls not being programmatically determinable"
                                                }, a
                                            }(a); a.guidelines.wcag.successCriteria["1.3.2"] = function (a) {
                                                a =
                                                    a.lib.SuccessCriteria({ name: "wcag:1.3.2", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                        G57: "Ordering the content in a meaningful sequence (scope: for all the content in the Web page)", H34: "Using a Unicode right-to-left mark (RLM) or left-to-right mark (LRM) to mix text direction inline (languageUnicodeDirection)", H56: "Using the dir attribute on an inline element to resolve problems with nested directional runs", C6: "Positioning content based on structural markup (CSS)", C8: "Using CSS letter-spacing to control spacing within a word",
                                                        C27: "Making the DOM order match the visual order (CSS)"
                                                    }, a.failures = { F49: "Using an HTML layout table that does not make sense when linearized", F32: "Using white space characters to control spacing within a word (whiteSpaceInWord)", F1: "Changing the meaning of content by positioning information with CSS", F34: "Using white space characters to format tables in plain text content (tabularDataIsInTable)", F33: "Using white space characters to create multiple columns in plain text content (tabularDataIsInTable)" },
                                                        a
                                            }(a); a.guidelines.wcag.successCriteria["1.3.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.3.3", preEvaluator: function () { return !0 } }); return a.techniques = { G96: "Providing textual identification of items that otherwise rely only on sensory information to be understood" }, a.failures = { F14: "Identifying content only by its shape or location", F26: "Using a graphical symbol alone to convey information" }, a }(a); a.guidelines.wcag.successCriteria["1.4.1"] = function (a) {
                                                a = a.lib.SuccessCriteria({
                                                    name: "wcag:1.4.1",
                                                    preEvaluator: function () { return !0 }
                                                }); return a.techniques = {}, a.failures = {}, a
                                            }(a); a.guidelines.wcag.successCriteria["1.4.2"] = function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.4.2", preEvaluator: function () { return !!b("audio, video, object, embed").length } }); return a.techniques = { G60: "Playing a sound that turns off automatically within three seconds", G170: "Providing a control near the beginning of the Web page that turns off sounds that play automatically", G171: "Playing sounds only on user request" }, a.failures =
                                                    { F23: "Playing a sound longer than 3 seconds where there is no mechanism to turn it off" }, a
                                            }(a); a.guidelines.wcag.successCriteria["1.4.3"] = function (a) {
                                                a = a.lib.SuccessCriteria({ name: "wcag:1.4.3", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                    G148: "Not specifying background color, not specifying text color, and not using technology features that change those defaults", G174: "Providing a control with a sufficient contrast ratio that allows users to switch to a presentation that uses sufficient contrast",
                                                    G18: "Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text for situation A AND G145: Ensuring that a contrast ratio of at least 3:1 exists between text (and images of text) and background behind the text for situation B"
                                                }, a.failures = { F24: "Specifying foreground colors without specifying background colors or vice versa", F83: "Using background images that do not provide sufficient contrast with foreground text (or images of text)" }, a
                                            }(a);
                                    a.guidelines.wcag.successCriteria["1.4.4"] = function (a) {
                                        a = a.lib.SuccessCriteria({ name: "wcag:1.4.4", preEvaluator: function () { return !0 } }); return a.techniques = {
                                            G142: "Using a technology that has commonly-available user agents that support zoom", C12: "Using percent for font sizes", C13: "Using named font sizes", C14: "Using em units for font, sizes", SCR34: "Calculating size and ,position in a way that scales with text size (Scripting)", G146: "Using liquid layout", G178: "Providing controls on the Web page that allow users to incrementally change the size of all text on the page up to 200 percent",
                                            G179: "Ensuring that there is no loss of content or functionality when the text resizes and text containers do not change their width"
                                        }, a.failures = { F69: "Resizing visually rendered text up to 200 percent causes the text, image or controls to be clipped, truncated or obscured", F80: "Text-based form controls do not resize when visually rendered text is resized up to 200%" }, a
                                    }(a); a.guidelines.wcag.successCriteria["1.4.5"] = function (a) {
                                        a = a.lib.SuccessCriteria({ name: "wcag:1.4.5", preEvaluator: function () { return !!document.querySelectorAll("img, map").length } });
                                        return a.techniques = { C22: "Using CSS to control visual presentation of text (CSS)", C30: "Using CSS to replace text with images of text and providing user interface controls to switch", G140: "Separating information and structure from presentation to enable different presentations" }, a.failures = {}, a
                                    }(a); a.guidelines.wcag.successCriteria["1.4.6"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.4.6", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.4.7"] =
                                        function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.4.7", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.4.8"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.4.8", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["1.4.9"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:1.4.9", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.1.1"] =
                                            function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.1.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.1.2"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.1.2", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.1.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.1.3", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.2.1"] =
                                                function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.2.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.2.2"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.2.2", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.2.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.2.3", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.2.4"] =
                                                    function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.2.4", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.2.5"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.2.5", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.3.1"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.3.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.3.2"] =
                                                        function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.3.2", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.1"] = function (a) {
                                                            a = a.lib.SuccessCriteria({ name: "wcag:2.4.1", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                                G1: "Adding a link at the top of each page that goes directly to the main content area", G123: "Adding a link at the beginning of a block of repeated content to go to the end of the block", G124: "Adding links at the top of the page to each area of the content",
                                                                H69: "Providing heading elements at the beginning of each section of content", H70: "Using frame elements to group blocks of repeated material AND H64: Using the title attribute of the frame and iframe elements", SCR28: "Using an expandable and collapsible menu to bypass block of content"
                                                            }, a.failures = {}, a
                                                        }(a); a.guidelines.wcag.successCriteria["2.4.10"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.10", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.2"] =
                                                            function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.2", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.3", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.4"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.4", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.5"] =
                                                                function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.5", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.6"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.6", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.7"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.7", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.8"] =
                                                                    function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.8", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["2.4.9"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:2.4.9", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.1.1"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.1.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.1.2"] =
                                                                        function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.1.2", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.1.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.1.3", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.1.4"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.1.4", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.1.5"] =
                                                                            function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.1.5", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.1.6"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.1.6", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.2.1"] = function (a) {
                                                                                a = a.lib.SuccessCriteria({ name: "wcag:3.2.1", preEvaluator: function () { return !0 } }); return a.techniques = { G107: 'Using "activate" rather than "focus" as a trigger for changes of context' },
                                                                                    a.failures = { F52: "Opening a new window as soon as a new page is loaded", F55: "Using script to remove focus when focus is received" }, a
                                                                            }(a); a.guidelines.wcag.successCriteria["3.2.2"] = function (a) {
                                                                                a = a.lib.SuccessCriteria({ name: "wcag:3.2.2", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                                                    G80: "Providing a submit button to initiate a change of context", H32: "Providing submit buttons", H84: "Using a button with a select element to perform an action", G13: "Describing what will happen before a change to a form control that causes a change of context to occur is made",
                                                                                    SCR19: "Using an onchange event on a select element without causing a change of context"
                                                                                }, a.failures = { F36: "Automatically submitting a form and presenting new content without prior warning when the last field in the form is given a value", F37: "Launching a new window without prior warning when the status of a radio button, check box or select list is changed", F76: "Providing instruction material about the change of context by change of setting in a user interface element at a location that users may bypass" },
                                                                                    a
                                                                            }(a); a.guidelines.wcag.successCriteria["3.2.3"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.2.3", preEvaluator: function () { return !0 } }); return a.techniques = { G61: "Presenting repeated components in the same relative order each time they appear" }, a.failures = { F66: "Presenting navigation links in a different relative order on different pages" }, a }(a); a.guidelines.wcag.successCriteria["3.2.4"] = function (a) {
                                                                                a = a.lib.SuccessCriteria({ name: "wcag:3.2.4", preEvaluator: function () { return !0 } }); return a.techniques =
                                                                                    { G197: "Using labels, names, and text alternatives consistently for content that has the same functionality AND following the sufficient techniques for Success Criterion 1.1.1 and sufficient techniques for Success Criterion 4.1.2 for providing labels, names, and text alternatives." }, a.failures = { F31: "Using two different labels for the same function on different Web pages within a set of Web pages" }, a
                                                                            }(a); a.guidelines.wcag.successCriteria["3.2.5"] = function (a) {
                                                                                a = a.lib.SuccessCriteria({
                                                                                    name: "wcag:3.2.5",
                                                                                    preEvaluator: function () { return !0 }
                                                                                }); return a.techniques = {}, a.failures = {}, a
                                                                            }(a); a.guidelines.wcag.successCriteria["3.3.1"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.3.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.3.2"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.3.2", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.3.3"] = function (a) {
                                                                                a = a.lib.SuccessCriteria({
                                                                                    name: "wcag:3.3.3",
                                                                                    preEvaluator: function () { function a(b) { return !!this.querySelectorAll('[type\x3d"' + b + '"]').length } function b(a) { var c = Object.keys(a)[0]; return !!this.querySelectorAll("[" + c + '\x3d"' + a[c] + '"]').length } var d = "checkbox color date datetime datetime-local email file hidden month number password radio range search tel time url week".split(" "), g = [{ required: "required" }, { "aria-required": "true" }]; return document.querySelectorAll("form").length ? d.some(a, document) || g.some(b, document) ? !0 : void 0 : !1 }
                                                                                }); return a.techniques =
                                                                                    {
                                                                                        G83: "Providing text descriptions to identify required fields that were not completed", ARIA2: "Identifying a required field with the aria-required property", ARIA18: "Using aria-alertdialog to Identify Errors (ARIA)", G85: "Providing a text description when user input falls outside the required format or values", G177: "Providing suggested correction text", SCR18: "Providing client-side validation and alert (Scripting)", SCR32: "Providing client-side validation and adding error text via the DOM (Scripting)",
                                                                                        G84: "Providing a text description when the user provides information that is not in the list of allowed values"
                                                                                    }, a.failures = {}, a
                                                                            }(a); a.guidelines.wcag.successCriteria["3.3.4"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.3.4", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.3.5"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.3.5", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["3.3.6"] =
                                                                                function (a) { a = a.lib.SuccessCriteria({ name: "wcag:3.3.6", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["4.1.1"] = function (a) { a = a.lib.SuccessCriteria({ name: "wcag:4.1.1", preEvaluator: function () { return !0 } }); return a.techniques = {}, a.failures = {}, a }(a); a.guidelines.wcag.successCriteria["4.1.2"] = function (a) {
                                                                                    a = a.lib.SuccessCriteria({ name: "wcag:4.1.2", preEvaluator: function () { return !0 } }); return a.techniques = {
                                                                                        ARIA14: "Using aria-label to provide an invisible label where a visible label cannot be used",
                                                                                        ARIA16: "Using aria-labelledby to provide a name for user interface controls", G108: "Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes using technology-specific techniques below:", H91: "Using HTML form controls and links", H44: "Using label elements to associate text labels with form controls", H64: "Using the title attribute of the frame and iframe elements", H65: "Using the title attribute to identify form controls when the label element cannot be used",
                                                                                        H88: "Using HTML according to spec"
                                                                                    }, a.failures = {
                                                                                        F59: "Using script to make div or span a user interface control in HTML without providing a role for the control (This failure may be solved in the future using DHTML roadmap techniques.)", F20: "Not updating text alternatives when changes to non-text content occur", F68: "Association of label and user interface controls not being programmatically determined", F79: "Focus state of a user interface component not being programmatically determinable or no notification of change of focus state available",
                                                                                        F86: "Not providing names for each part of a multi-part form field, such as a US telephone number", F89: "Using null alt on an image where the image is the only content in a link"
                                                                                    }, a
                                                                                }(a); a.lib.wcag2.Criterion = function () {
                                                                                    function d(c, d) { var e = a.lib.wcag2.EarlAssertion.getResultPriority, g = { result: d }; return b.each(c, function (a, b) { e(g) < e(b) && (g.result = b.outcome.result) }), g } return function (c, f, e, g) {
                                                                                        var k = [], h = {}, m = c["default"] || "untested", n = c.id; (b.isArray(c.testAggregators) && (k = b.map(c.testAggregators, function (b) {
                                                                                            return new a.lib.wcag2.TestAggregator(b,
                                                                                                f, g)
                                                                                        })), b.isArray(c.preconditions)) && k.push(new a.lib.wcag2.TestAggregator({ type: "stacking", tests: c.preconditions }, e, g)); return h.getResult = function (c) { var e, f = []; return b.each(k, function (a, b) { var d = b.getResults(c); f.push.apply(f, d) }), e = new a.lib.wcag2.EarlAssertion({ testRequirement: n, outcome: d(f, m), subject: g }), 0 < f.length && (e.hasPart = f), e }, h.getTests = function () { var a = []; return b.each(k, function (b, c) { a.push.apply(a, c.tests) }), a }, h
                                                                                    }
                                                                                }(); a.lib.wcag2.EarlAssertion = function () {
                                                                                    function a(c) {
                                                                                        b.extend(this,
                                                                                            c, e); this.outcome = b.extend({}, this.outcome)
                                                                                    } var c, f = ["untested", "inapplicable", "passed", "cantTell", "failed"], e = { type: "assertion", subject: c, assertedBy: { type: "earl:Software", name: "QuailJS" }, mode: "automated" }; return window && window.location && (c = window.location.href), a.getResultPriority = function (a) { return "object" == typeof a && (a = a.outcome ? a.outcome.result : a.result), f.indexOf(a) }, a
                                                                                }(); a.lib.wcag2.TestAggregator = function () {
                                                                                    function d(a, c) { b.each(a, function (a, b) { b.each(function () { c.call(this, b, this) }) }) } function c(a) {
                                                                                        var c =
                                                                                            [], d = []; return b.each(a, function (a, b) { var c = []; b.each(function () { c.push(this.get("element")); m.add(this) }); d.push(c) }), b.each(d, function (a, d) { if (0 === a) return void (c = d); var e = []; b.each(d, function (a, b) { -1 !== c.indexOf(b) && e.push(b) }); c = e }), c
                                                                                    } function f(a) { var b = []; return d(a, function (a, c) { var d = c.get("element"); -1 === b.indexOf(d) && (b.push(d), m.add(c)) }), b } function e(c, d) { var e = []; return b.each(c, function (b, c) { var f = new a.lib.wcag2.EarlAssertion(d); c && (f.outcome.pointer = m.getPointer(c)); e.push(f) }), e }
                                                                                    function g(b, f) { var g = jQuery.unique(c(f)), k = e(jQuery.unique(g), { testCase: b.id, outcome: { result: "failed" } }); return d(f, function (c, d) { var e = d.get("status"), f = a.lib.wcag2.EarlAssertion.getResultPriority, h = k[g.indexOf(d.get("element"))]; if (b[e] && (e = b[e]), h && f(h) >= f(e)) f = h.outcome.pointer, h.outcome = { result: e, info: c.get("title") }, f && (h.outcome.pointer = f) }), k } function k(b, c) {
                                                                                        var g = f(c), k = e(g, { testCase: b.id, outcome: { result: "untested" } }); return d(c, function (c, d) {
                                                                                            var e = d.get("status"), f = a.lib.wcag2.EarlAssertion.getResultPriority,
                                                                                                h = k[g.indexOf(d.get("element"))]; b[e] && (e = b[e]); h && f(h) < f(e) && (h.outcome = { result: e, info: c.get("title") })
                                                                                        }), k
                                                                                    } function h(a, c, d) { b.extend(this, { id: a.tests.join("+"), subject: d }, a); this.tests = b.map(this.tests, function (a) { return c[a] }) } var m = {
                                                                                        elms: [], pointers: [], add: function (a) { var b; -1 === m.elms.indexOf(a.get("element")) && (a.get("html") && (b = [{ type: "CharSnippetCompoundPointer", chars: a.get("html"), CSSSelector: a.get("selector") }]), m.elms.push(a.get("element")), m.pointers.push(b)) }, getPointer: function (a) {
                                                                                            a =
                                                                                                m.elms.indexOf(a); return m.pointers[a]
                                                                                        }
                                                                                    }; return h.prototype.filterDataToTests = function (a) { var c = b.map(this.tests, function (a) { return a.name }), d = []; return b.each(a, function (a, b) { -1 !== c.indexOf(b.get("name")) && d.push(b) }), d }, h.prototype.getResults = function (b) {
                                                                                        var c, d; b = this.filterDataToTests(b); return 1 === b.length || "combined" === this.type ? c = g(this, b) : "stacking" === this.type ? c = k(this, b) : window && window.console.error("Unknown type for aggregator " + this.id), c ? (0 === c.length && (d = new a.lib.wcag2.EarlAssertion({
                                                                                            testCase: this.id,
                                                                                            subject: this.subject, outcome: { result: "inapplicable" }
                                                                                        }), c.push(d)), c) : void 0
                                                                                    }, h
                                                                                }()
                                }(jQuery)
                            })(); a.prototype = new m; a.prototype.constructor = a; a.prototype.fixesMapping = {
                                imgHasAlt: ["ImgAlt"], imgImportantNoSpacerAlt: ["ImgAlt"], KINGUseLongDateFormat: ["DateUnfold"], aAdjacentWithSameResourceShouldBeCombined: ["AnchorsMerge"], imgAltNotEmptyInAnchor: ["ImgAlt"], imgAltIsDifferent: ["ImgAlt"], imgShouldNotHaveTitle: ["AttributeRenameDefault"], tableUsesCaption: ["AddTableCaption"], imgAltIsTooLong: ["ImgAlt"], pNotUsedAsHeader: ["ParagraphToHeader"],
                                headerH1: ["ParagraphToHeader"], headerH2: ["ParagraphToHeader"], headerH3: ["ParagraphToHeader"], headerH4: ["ParagraphToHeader"], headerH5: ["ParagraphToHeader"], headerH6: ["ParagraphToHeader"], tableDataShouldHaveTh: ["TableHeaders"], imgWithEmptyAlt: ["ImgAltNonEmpty"]
                            }; a.prototype.issueDetails = {}; a.prototype.process = function (a, b, d) {
                                var c = window.jQuery, f = a.editor.config.a11ychecker_quailParams || {}, e = this; CKEDITOR.tools.extend(f, {
                                    reset: !0, guideline: this.config.guideline, testCollectionComplete: function (c, f) {
                                        var h =
                                            e.getIssuesFromCollection(f, a.editor); e.filterIssues(h, b); d && d(h)
                                    }
                                }, !0); f.jsonPath || (f.jsonPath = this.jsonPath); c(b.$).quail(f)
                            }; a.prototype.getIssuesFromCollection = function (a, b) { var d = new n, c = this; return a.each(function (a, e) { var g = e.get("name"); "failed" === e.get("status") && (c.issueDetails[g] || (c.issueDetails[g] = c.getIssueDetailsFromTest(e, b)), c.addIssuesFromTest(e, d)) }), d }; a.prototype.getIssueDetailsFromTest = function (a, b) {
                                function d(a, b) {
                                    var c = CKEDITOR.tools.objectKeys(a), c = C.getPreferredLanguage(b.language,
                                        b.defaultLanguage, c); return String(a[c])
                                } var c = [], f = a.get("guidelines").wcag, e = f && CKEDITOR.tools.objectKeys(f)[0]; e && (c.push("WCAG2.0"), c.push(e), c.push(f[e].techniques.join(","))); f = a.get("title") || {}; e = a.get("description") || {}; return new v(d(f, b.config), d(e, b.config), c)
                            }; a.prototype.addIssuesFromTest = function (a, b) {
                                var d = this, c = a.get("name"), f = a.get("testability"); a.each(function (a, g) {
                                    if (d.isValidTestCase(g)) {
                                        var h, l = g.attributes; "failed" == l.status && (h = new q({
                                            originalElement: new CKEDITOR.dom.element(l.element),
                                            testability: f, id: c
                                        }, d), b.addItem(h))
                                    }
                                })
                            }; a.prototype.isValidTestCase = function (a) { a = a.attributes.element; return a instanceof HTMLElement && null !== a.parentNode }; a.prototype.getIssueDetails = function (a, b) { b(this.issueDetails[a.id]) }; a.prototype._filterIssue = function (a, b) { var d, c = a.originalElement; return 0 == c instanceof CKEDITOR.dom.element ? !1 : (d = c.$, d && d.tagName ? !0 : !1) }; a.prototype.createConfig = function (a) {
                                var b = new T; a = a.config.a11ychecker_quailParams; return a && a.guideline && (b.guideline = a.guideline),
                                    b
                            }; b(a)
                        }
                    }; CKEDITOR.event.implementOn(b._.a11ychecker)
                }, getStylesSkinName: function () { var a = "moono-lisa"; return "moono" == CKEDITOR.skinName && (a = "moono"), a }
            }); CKEDITOR.plugins.a11ychecker = { rev: "14ca0937f699f447087e8386e5d49f92a4daea3c" }
        })()
    }(); (function () {
        function m(a) { CKEDITOR.tools.extend(this, a); this.queue = []; this.init ? this.init(CKEDITOR.tools.bind(function () { for (var a; a = this.queue.pop();)a.call(this); this.ready = !0 }, this)) : this.ready = !0 } function p(a) {
            var b = a.config.codeSnippet_codeClass, e = /\r?\n/g, h = new CKEDITOR.dom.element("textarea"); a.widgets.add("codeSnippet", {
                allowedContent: "pre; code(language-*)", requiredContent: "pre", styleableElements: "pre", template: '\x3cpre\x3e\x3ccode class\x3d"' + b + '"\x3e\x3c/code\x3e\x3c/pre\x3e', dialog: "codeSnippet",
                pathName: a.lang.codesnippet.pathName, mask: !0, parts: { pre: "pre", code: "code" }, highlight: function () { var d = this, c = this.data, b = function (a) { d.parts.code.setHtml(n ? a : a.replace(e, "\x3cbr\x3e")) }; b(CKEDITOR.tools.htmlEncode(c.code)); a._.codesnippet.highlighter.highlight(c.code, c.lang, function (d) { a.fire("lockSnapshot"); b(d); a.fire("unlockSnapshot") }) }, data: function () {
                    var a = this.data, b = this.oldData; a.code && this.parts.code.setHtml(CKEDITOR.tools.htmlEncode(a.code)); b && a.lang != b.lang && this.parts.code.removeClass("language-" +
                        b.lang); a.lang && (this.parts.code.addClass("language-" + a.lang), this.highlight()); this.oldData = CKEDITOR.tools.copy(a)
                }, upcast: function (d, c) {
                    if ("pre" == d.name) {
                        for (var g = [], e = d.children, k, l = e.length - 1; 0 <= l; l--)k = e[l], k.type == CKEDITOR.NODE_TEXT && k.value.match(q) || g.push(k); var f; if (1 == g.length && "code" == (f = g[0]).name && 1 == f.children.length && f.children[0].type == CKEDITOR.NODE_TEXT) {
                            if (g = a._.codesnippet.langsRegex.exec(f.attributes["class"])) c.lang = g[1]; h.setHtml(f.getHtml()); c.code = h.getValue(); f.addClass(b);
                            return d
                        }
                    }
                }, downcast: function (a) { var c = a.getFirst("code"); c.children.length = 0; c.removeClass(b); c.add(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.code))); return a }
            }); var q = /^[\s\n\r]*$/
        } var n = !CKEDITOR.env.ie || 8 < CKEDITOR.env.version; CKEDITOR.plugins.add("codesnippet", {
            requires: "widget,dialog", beforeInit: function (a) {
                a._.codesnippet = {}; this.setHighlighter = function (b) {
                    a._.codesnippet.highlighter = b; b = a._.codesnippet.langs = a.config.codeSnippet_languages || b.languages; a._.codesnippet.langsRegex =
                        new RegExp("(?:^|\\s)language-(" + CKEDITOR.tools.objectKeys(b).join("|") + ")(?:\\s|$)")
                }
            }, onLoad: function () { CKEDITOR.dialog.add("codeSnippet", this.path + "dialogs/codesnippet.js") }, init: function (a) { a.ui.addButton && a.ui.addButton("CodeSnippet", { label: a.lang.codesnippet.button, command: "codeSnippet", toolbar: "insert,10" }) }, afterInit: function (a) {
                var b = this.path; p(a); if (!a._.codesnippet.highlighter) {
                    var e = new CKEDITOR.plugins.codesnippet.highlighter({
                        languages: {
                            apache: "Apache", bash: "Bash", coffeescript: "CoffeeScript",
                            cpp: "C++", cs: "C#", css: "CSS", diff: "Diff", html: "HTML", http: "HTTP", ini: "INI", java: "Java", javascript: "JavaScript", json: "JSON", makefile: "Makefile", markdown: "Markdown", nginx: "Nginx", objectivec: "Objective-C", perl: "Perl", php: "PHP", python: "Python", ruby: "Ruby", sql: "SQL", vbscript: "VBScript", xhtml: "XHTML", xml: "XML"
                        }, init: function (h) {
                            var e = this; n && CKEDITOR.scriptLoader.load(b + "lib/highlight/highlight.pack.js", function () { e.hljs = window.hljs; h() }); a.addContentsCss && a.addContentsCss(b + "lib/highlight/styles/" + a.config.codeSnippet_theme +
                                ".css")
                        }, highlighter: function (a, b, d) { (a = this.hljs.highlightAuto(a, this.hljs.getLanguage(b) ? [b] : void 0)) && d(a.value) }
                    }); this.setHighlighter(e)
                }
            }
        }); CKEDITOR.plugins.codesnippet = { highlighter: m }; m.prototype.highlight = function () { var a = arguments; this.ready ? this.highlighter.apply(this, a) : this.queue.push(function () { this.highlighter.apply(this, a) }) }
    })(); CKEDITOR.config.codeSnippet_codeClass = "hljs"; CKEDITOR.config.codeSnippet_theme = "default"; CKEDITOR.plugins.add("find", {
        requires: "dialog", init: function (a) {
            var b = a.addCommand("find", new CKEDITOR.dialogCommand("find")); b.canUndo = !1; b.readOnly = 1; a.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = !1; a.ui.addButton && (a.ui.addButton("Find", { label: a.lang.find.find, command: "find", toolbar: "find,10" }), a.ui.addButton("Replace", { label: a.lang.find.replace, command: "replace", toolbar: "find,20" })); CKEDITOR.dialog.add("find", this.path + "dialogs/find.js"); CKEDITOR.dialog.add("replace", this.path +
                "dialogs/find.js")
        }
    }); CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } }; (function () {
        function q(a, c) { c = void 0 === c || c; var b; if (c) b = a.getComputedStyle("text-align"); else { for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) { b = a.getParent(); if (!b) break; a = b } b = a.getStyle("text-align") || a.getAttribute("align") || "" } b && (b = b.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")); !b && c && (b = "rtl" == a.getComputedStyle("direction") ? "right" : "left"); return b } function h(a, c, b) {
            this.editor = a; this.name = c; this.value = b; this.context = "p"; c = a.config.justifyClasses; var f = a.config.enterMode ==
                CKEDITOR.ENTER_P ? "p" : "div"; if (c) { switch (b) { case "left": this.cssClassName = c[0]; break; case "center": this.cssClassName = c[1]; break; case "right": this.cssClassName = c[2]; break; case "justify": this.cssClassName = c[3] }this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + c.join("|") + ")(?\x3d$|\\s)"); this.requiredContent = f + "(" + this.cssClassName + ")" } else this.requiredContent = f + "{text-align}"; this.allowedContent = {
                    "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                        propertiesOnly: !0, styles: this.cssClassName ? null : "text-align",
                        classes: this.cssClassName || null
                    }
                }; a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
        } function m(a) {
            var c = a.editor, b = c.createRange(); b.setStartBefore(a.data.node); b.setEndAfter(a.data.node); for (var f = new CKEDITOR.dom.walker(b), d; d = f.next();)if (d.type == CKEDITOR.NODE_ELEMENT) if (!d.equals(a.data.node) && d.getDirection()) b.setStartAfter(d), f = new CKEDITOR.dom.walker(b); else {
                var e = c.config.justifyClasses; e && (d.hasClass(e[0]) ? (d.removeClass(e[0]), d.addClass(e[2])) : d.hasClass(e[2]) && (d.removeClass(e[2]),
                    d.addClass(e[0]))); e = d.getStyle("text-align"); "left" == e ? d.setStyle("text-align", "right") : "right" == e && d.setStyle("text-align", "left")
            }
        } h.prototype = {
            exec: function (a) {
                var c = a.getSelection(), b = a.config.enterMode; if (c) {
                    for (var f = c.createBookmarks(), d = c.getRanges(), e = this.cssClassName, h, g, k = a.config.useComputedState, k = void 0 === k || k, n = d.length - 1; 0 <= n; n--)for (h = d[n].createIterator(), h.enlargeBr = b != CKEDITOR.ENTER_BR; g = h.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");)if (!g.isReadOnly()) {
                        var l = g.getName(),
                            p; p = a.activeFilter.check(l + "{text-align}"); if ((l = a.activeFilter.check(l + "(" + e + ")")) || p) { g.removeAttribute("align"); g.removeStyle("text-align"); var m = e && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex, ""))), r = this.state == CKEDITOR.TRISTATE_OFF && (!k || q(g, !0) != this.value); e && l ? r ? g.addClass(e) : m || g.removeAttribute("class") : r && p && g.setStyle("text-align", this.value) }
                    } a.focus(); a.forceNextSelectionCheck(); c.selectBookmarks(f)
                }
            }, refresh: function (a, c) {
                var b = c.block || c.blockLimit,
                    f = b.getName(), d = b.equals(a.editable()), f = this.cssClassName ? a.activeFilter.check(f + "(" + this.cssClassName + ")") : a.activeFilter.check(f + "{text-align}"); d && 1 === c.elements.length ? this.setState(CKEDITOR.TRISTATE_OFF) : !d && f ? this.setState(q(b, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            }
        }; CKEDITOR.plugins.add("justify", {
            init: function (a) {
                if (!a.blockless) {
                    var c = new h(a, "justifyleft", "left"), b = new h(a, "justifycenter", "center"),
                        f = new h(a, "justifyright", "right"), d = new h(a, "justifyblock", "justify"); a.addCommand("justifyleft", c); a.addCommand("justifycenter", b); a.addCommand("justifyright", f); a.addCommand("justifyblock", d); a.ui.addButton && (a.ui.addButton("JustifyLeft", { label: a.lang.common.alignLeft, command: "justifyleft", toolbar: "align,10" }), a.ui.addButton("JustifyCenter", { label: a.lang.common.center, command: "justifycenter", toolbar: "align,20" }), a.ui.addButton("JustifyRight", {
                            label: a.lang.common.alignRight, command: "justifyright",
                            toolbar: "align,30"
                        }), a.ui.addButton("JustifyBlock", { label: a.lang.common.justify, command: "justifyblock", toolbar: "align,40" })); a.on("dirChanged", m)
                }
            }
        })
    })(); (function () {
        CKEDITOR.plugins.add("language", {
            requires: "menubutton", init: function (a) {
                var b = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"], c = this, d = a.lang.language, e = {}, g, h, k, f; a.addCommand("language", {
                    allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", contextSensitive: !0, exec: function (a, b) { var c = e["language_" + b]; if (c) a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style) }, refresh: function (a) {
                        this.setState(c.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON :
                            CKEDITOR.TRISTATE_OFF)
                    }
                }); for (f = 0; f < b.length; f++)g = b[f].split(":"), h = g[0], k = "language_" + h, e[k] = { label: g[1], langId: h, group: "language", order: f, ltr: "rtl" != ("" + g[2]).toLowerCase(), onClick: function () { a.execCommand("language", this.langId) }, role: "menuitemcheckbox" }, e[k].style = new CKEDITOR.style({ element: "span", attributes: { lang: h, dir: e[k].ltr ? "ltr" : "rtl" } }); e.language_remove = {
                    label: d.remove, group: "language_remove", state: CKEDITOR.TRISTATE_DISABLED, order: e.length, onClick: function () {
                        var b = c.getCurrentLangElement(a);
                        b && a.execCommand("language", b.getAttribute("lang"))
                    }
                }; a.addMenuGroup("language", 1); a.addMenuGroup("language_remove"); a.addMenuItems(e); a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                    label: d.button, allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", toolbar: "bidi,30", command: "language", onMenu: function () {
                        var b = {}, d = c.getCurrentLangElement(a), f; for (f in e) b[f] = CKEDITOR.TRISTATE_OFF; b.language_remove = d ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; d && (b["language_" + d.getAttribute("lang")] =
                            CKEDITOR.TRISTATE_ON); return b
                    }
                }); a.addRemoveFormatFilter && a.addRemoveFormatFilter(function (a) { return !(a.is("span") && a.getAttribute("dir") && a.getAttribute("lang")) })
            }, getCurrentLangElement: function (a) { var b = a.elementPath(); a = b && b.elements; var c; if (b) for (var d = 0; d < a.length; d++)b = a[d], !c && "span" == b.getName() && b.hasAttribute("dir") && b.hasAttribute("lang") && (c = b); return c }
        })
    })(); (function () {
        CKEDITOR.plugins.liststyle = {
            requires: "dialog,contextmenu", init: function (a) {
                if (!a.blockless) {
                    var b; b = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]", contentTransformations: [["ol: listTypeToStyle"]] }); b = a.addCommand("numberedListStyle", b); a.addFeature(b); CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js"); b = new CKEDITOR.dialogCommand("bulletedListStyle", {
                        requiredContent: "ul",
                        allowedContent: "ul{list-style-type}", contentTransformations: [["ul: listTypeToStyle"]]
                    }); b = a.addCommand("bulletedListStyle", b); a.addFeature(b); CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"); a.addMenuGroup("list", 108); a.addMenuItems({ numberedlist: { label: a.lang.liststyle.numberedTitle, group: "list", command: "numberedListStyle" }, bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" } }); a.contextMenu.addListener(function (a) {
                        if (!a || a.isReadOnly()) return null;
                        for (; a;) { var b = a.getName(); if ("ol" == b) return { numberedlist: CKEDITOR.TRISTATE_OFF }; if ("ul" == b) return { bulletedlist: CKEDITOR.TRISTATE_OFF }; a = a.getParent() } return null
                    })
                }
            }
        }; CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
    })(); (function () {
        var k = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var c = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass"; a.editable()[c]("cke_show_blocks") } } }; CKEDITOR.plugins.add("showblocks", {
            onLoad: function () {
                var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), c, b, e, f, k = CKEDITOR.getUrl(this.path), l = !(CKEDITOR.env.ie &&
                    9 > CKEDITOR.env.version), g = l ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "", d, h; for (c = b = e = f = ""; d = a.pop();)h = a.length ? "," : "", c += ".cke_show_blocks " + d + g + h, e += ".cke_show_blocks.cke_contents_ltr " + d + g + h, f += ".cke_show_blocks.cke_contents_rtl " + d + g + h, b += ".cke_show_blocks " + d + g + "{background-image:url(" + CKEDITOR.getUrl(k + "images/block_" + d + ".png") + ")}"; CKEDITOR.addCss((c + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(b, e + "{background-position:top left;padding-left:8px}",
                        f + "{background-position:top right;padding-right:8px}")); l || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
            }, init: function (a) {
                function c() { b.refresh(a) }
                if (!a.blockless) { var b = a.addCommand("showblocks", k); b.canUndo = !1; a.config.startupOutlineBlocks && b.setState(CKEDITOR.TRISTATE_ON); a.ui.addButton && a.ui.addButton("ShowBlocks", { label: a.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" }); a.on("mode", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a.on("focus", c), a.on("blur", c)); a.on("contentDom", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }) }
            }
        })
    })(); (function () {
        function g(a, b) { var c = l.exec(a), d = l.exec(b); if (c) { if (!c[2] && "px" == d[2]) return d[1]; if ("px" == c[2] && !d[2]) return d[1] + "px" } return b } var k = CKEDITOR.htmlParser.cssStyle, h = CKEDITOR.tools.cssLength, l = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, m = {
            elements: {
                $: function (a) {
                    var b = a.attributes; if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                        var c = (new k(a)).rules; a = b.attributes; var d = c.width,
                            c = c.height; d && (a.width = g(a.width, d)); c && (a.height = g(a.height, c))
                    } return b
                }
            }
        }; CKEDITOR.plugins.add("fakeobjects", { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(m, { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement = function (a, b, c, d) {
            var e = this.lang.fakeobjects, e = e[c] || e.unknown; b = {
                "class": b, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type,
                alt: e, title: e, align: a.getAttribute("align") || ""
            }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b["data-cke-real-element-type"] = c); d && (b["data-cke-resizable"] = d, c = new k, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b)); return this.document.createElement("img", { attributes: b })
        }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, c, d) {
            var e = this.lang.fakeobjects, e = e[c] || e.unknown, f; f = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(f); f = f.getHtml(); b = { "class": b, "data-cke-realelement": encodeURIComponent(f), "data-cke-real-node-type": a.type, alt: e, title: e, align: a.attributes.align || "" }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b["data-cke-real-element-type"] = c); d && (b["data-cke-resizable"] = d, d = a.attributes, a = new k, c = d.width, d = d.height, void 0 !== c && (a.rules.width = h(c)), void 0 !== d && (a.rules.height = h(d)), a.populate(b)); return new CKEDITOR.htmlParser.element("img", b)
        }; CKEDITOR.editor.prototype.restoreRealElement =
            function (a) { if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document); if (a.data("cke-resizable")) { var c = a.getStyle("width"); a = a.getStyle("height"); c && b.setAttribute("width", g(b.getAttribute("width"), c)); a && b.setAttribute("height", g(b.getAttribute("height"), a)) } return b }
    })(); CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var f = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), g = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
                h = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), k = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block, $: function (a, b) {
                        b = b || {}; var c = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0); !c.role &&
                            (c.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", c.role); c = this.keys; c[40] = "next"; c[9] = "next"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (c[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                    }, _: {
                        close: function () { if (this._.started) { var a = f.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(a); delete this._.started } }, getClick: function () {
                            this._.click ||
                                (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click
                        }
                    }, proto: {
                        add: function (a, b, c) {
                            var d = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = d; var e; e = CKEDITOR.tools.htmlEncodeAttr(a).replace(k, "\\'"); a = { id: d, val: e, onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(c || a), text: b || a };
                            this._.pendingList.push(g.output(a))
                        }, startGroup: function (a) { this._.close(); var b = CKEDITOR.tools.getNextId(); this._.groups[a] = b; this._.pendingHtml.push(h.output({ id: b, label: a })) }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) {
                            var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display",
                                "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                        }, hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") }, showAll: function () { var a = this._.items, b = this._.groups, c = this.element.getDocument(), d; for (d in a) c.getById(a[d]).setStyle("display", ""); for (var e in b) a = c.getById(b[e]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display", "") }, mark: function (a) {
                            this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a);
                            b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b)
                        }, markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) { var b = this.element.getDocument(); a = this._.items[a]; var c = b.getById(a); c.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected"); this.onUnmark && this.onUnmark(c) }, unmarkAll: function () {
                            var a = this._.items, b = this.element.getDocument(),
                                c; for (c in a) { var d = a[c]; b.getById(d).removeClass("cke_selected"); b.getById(d + "_option").removeAttribute("aria-selected") } this.onUnmark && this.onUnmark()
                        }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) {
                            this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), c, d = -1; if (a) for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++d);) { if (a.equals(c)) { this._.focusIndex = d; break } } else this.element.focus();
                            c && setTimeout(function () { c.focus() }, 0)
                        }
                    }
                })
        }
    }); CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function (c) { c.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } });
    (function () {
        var c = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (c += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
            (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), k = CKEDITOR.addTemplate("combo", c); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                $: function (a) {
                    CKEDITOR.tools.extend(this, a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel";
                    a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {} }
                }, proto: {
                    renderHtml: function (a) { var b = []; this.render(a, b); return b.join("") }, render: function (a, b) {
                        function f() { if (this.getState() != CKEDITOR.TRISTATE_ON) { var b = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (b = CKEDITOR.TRISTATE_DISABLED); this.setState(b); this.setValue(""); b != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } } var c =
                            CKEDITOR.env, h = "cke_" + this.id, e = CKEDITOR.tools.addFunction(function (b) { l && (a.unlockSelection(1), l = 0); g.execute(b) }, this), d = this, g = { id: h, combo: this, focus: function () { CKEDITOR.document.getById(h).getChild(1).focus() }, execute: function (b) { var c = d._; if (c.state != CKEDITOR.TRISTATE_DISABLED) if (d.createPanel(a), c.on) c.panel.hide(); else { d.commit(); var f = d.getValue(); f ? c.list.mark(f) : c.list.unmarkAll(); c.panel.showBlock(d.id, new CKEDITOR.dom.element(b), 4) } }, clickFn: e }; a.on("activeFilterChange", f, this); a.on("mode",
                                f, this); a.on("selectionChange", f, this); !this.readOnly && a.on("readOnly", f, this); var m = CKEDITOR.tools.addFunction(function (a, b) { a = new CKEDITOR.dom.event(a); var d = a.getKeystroke(); switch (d) { case 13: case 32: case 40: CKEDITOR.tools.callFunction(e, b); break; default: g.onkey(g, d) }a.preventDefault() }), n = CKEDITOR.tools.addFunction(function () { g.onfocus && g.onfocus() }), l = 0; g.keyDownFn = m; c = {
                                    id: h, name: this.name || this.command, label: this.label, title: this.title, cls: this.className || "", titleJs: c.gecko && !c.hc ? "" : (this.title ||
                                        "").replace("'", ""), keydownFn: m, focusFn: n, clickFn: e
                                }; k.output(c, b); if (this.onRender) this.onRender(); return g
                    }, createPanel: function (a) {
                        if (!this._.panel) {
                            var b = this._.panelDefinition, c = this._.panelDefinition.block, k = b.parent || CKEDITOR.document.getBody(), h = "cke_combopanel__" + this.name, e = new CKEDITOR.ui.floatPanel(a, k, b), b = e.addListBlock(this.id, c), d = this; e.onShow = function () { this.element.addClass(h); d.setState(CKEDITOR.TRISTATE_ON); d._.on = 1; d.editorFocus && !a.focusManager.hasFocus && a.focus(); if (d.onOpen) d.onOpen() };
                            e.onHide = function (b) { this.element.removeClass(h); d.setState(d.modes && d.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); d._.on = 0; if (!b && d.onClose) d.onClose() }; e.onEscape = function () { e.hide(1) }; b.onClick = function (a, b) { d.onClick && d.onClick.call(d, a, b); e.hide() }; this._.panel = e; this._.list = b; e.getBlock(this.id).onHide = function () { d._.on = 0; d.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                        }
                    }, setValue: function (a, b) {
                        this._.value = a; var c = this.document.getById("cke_" + this.id + "_text"); c &&
                            (a || b ? c.removeClass("cke_combo_inlinelabel") : (b = this.label, c.addClass("cke_combo_inlinelabel")), c.setText("undefined" != typeof b ? b : a))
                    }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) }, hideItem: function (a) { this._.list.hideItem(a) }, hideGroup: function (a) { this._.list.hideGroup(a) }, showAll: function () { this._.list.showAll() }, add: function (a, b, c) { this._.items[a] = c || a; this._.list.add(a, b, c) }, startGroup: function (a) { this._.list.startGroup(a) },
                    commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)); this._.committed = 1 }, setState: function (a) { if (this._.state != a) { var b = this.document.getById("cke_" + this.id); b.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"); this._.state = a } }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () {
                        this._.state !=
                            CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
                    }
                }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
            }); CKEDITOR.ui.prototype.addRichCombo = function (a, b) { this.add(a, CKEDITOR.UI_RICHCOMBO, b) }
    })(); CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,resize,elementspath,enterkey,entities,htmlwriter,wysiwygarea,image,indent,indentlist,list,magicline,pastetext,pastefromword,removeformat,showborders,sourcearea,specialchar,tab,table,tabletools,tableselection,undo,menubutton,lineutils,widgetselection,widget,balloonpanel,a11ychecker,codesnippet,find,justify,language,liststyle,showblocks,fakeobjects,listblock,richcombo'; CKEDITOR.config.skin = 'moono-lisa'; (function () { var setIcons = function (icons, strip) { var path = CKEDITOR.getUrl('plugins/' + strip); icons = icons.split(','); for (var i = 0; i < icons.length; i++)CKEDITOR.skin.icons[icons[i]] = { path: path, offset: -icons[++i], bgsize: icons[++i] }; }; if (CKEDITOR.env.hidpi) setIcons('about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,blockquote,168,,copy-rtl,192,,copy,216,,cut-rtl,240,,cut,264,,paste-rtl,288,,paste,312,,image,336,,indent-rtl,360,,indent,384,,outdent-rtl,408,,outdent,432,,bulletedlist-rtl,456,,bulletedlist,480,,numberedlist-rtl,504,,numberedlist,528,,pastetext-rtl,552,,pastetext,576,,pastefromword-rtl,600,,pastefromword,624,,removeformat,648,,source-rtl,672,,source,696,,specialchar,720,,table,744,,redo-rtl,768,,redo,792,,undo-rtl,816,,undo,840,,a11ychecker,864,,codesnippet,888,,find-rtl,912,,find,936,,replace,960,,justifyblock,984,,justifycenter,1008,,justifyleft,1032,,justifyright,1056,,language,1080,,showblocks-rtl,1104,,showblocks,1128,', 'icons_hidpi.png'); else setIcons('about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,blockquote,168,auto,copy-rtl,192,auto,copy,216,auto,cut-rtl,240,auto,cut,264,auto,paste-rtl,288,auto,paste,312,auto,image,336,auto,indent-rtl,360,auto,indent,384,auto,outdent-rtl,408,auto,outdent,432,auto,bulletedlist-rtl,456,auto,bulletedlist,480,auto,numberedlist-rtl,504,auto,numberedlist,528,auto,pastetext-rtl,552,auto,pastetext,576,auto,pastefromword-rtl,600,auto,pastefromword,624,auto,removeformat,648,auto,source-rtl,672,auto,source,696,auto,specialchar,720,auto,table,744,auto,redo-rtl,768,auto,redo,792,auto,undo-rtl,816,auto,undo,840,auto,a11ychecker,864,auto,codesnippet,888,auto,find-rtl,912,auto,find,936,auto,replace,960,auto,justifyblock,984,auto,justifycenter,1008,auto,justifyleft,1032,auto,justifyright,1056,auto,language,1080,auto,showblocks-rtl,1104,auto,showblocks,1128,auto', 'icons.png'); })(); CKEDITOR.lang.languages = { "en": 1 };
}());