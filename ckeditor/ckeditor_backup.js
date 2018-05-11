﻿/*
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function() {
    if (!window.CKEDITOR || !window.CKEDITOR.dom) window.CKEDITOR || (window.CKEDITOR = function() {
            var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
                e = {
                    timestamp: "F7J8",
                    version: "4.5.3 (Full)",
                    revision: "6c70c82",
                    rnd: Math.floor(900 * Math.random()) + 100,
                    _: { pending: [], basePathSrcPattern: a },
                    status: "unloaded",
                    basePath: function() {
                        var b = window.CKEDITOR_BASEPATH || "";
                        if (!b)
                            for (var c = document.getElementsByTagName("script"), e = 0; e < c.length; e++) { var f = c[e].src.match(a); if (f) { b = f[1]; break } } - 1 == b.indexOf(":/") && "//" !=
                            b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + b : location.href.match(/^[^\?]*\/(?:)/)[0] + b);
                        if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                        return b
                    }(),
                    getUrl: function(a) {-1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                        this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp); return a },
                    domReady: function() {
                        function a() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b()) } catch (f) {} }

                        function b() { for (var a; a = c.shift();) a() }
                        var c = [];
                        return function(b) {
                            function h() { try { document.documentElement.doScroll("left") } catch (g) { setTimeout(h, 1); return } a() } c.push(b);
                            "complete" === document.readyState && setTimeout(a, 1);
                            if (1 == c.length)
                                if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                                    a, !1), window.addEventListener("load", a, !1);
                                else if (document.attachEvent) { document.attachEvent("onreadystatechange", a);
                                window.attachEvent("onload", a);
                                b = !1; try { b = !window.frameElement } catch (k) {} document.documentElement.doScroll && b && h() }
                        }
                    }()
                },
                b = window.CKEDITOR_GETURL;
            if (b) { var c = e.getUrl;
                e.getUrl = function(a) { return b.call(e, a) || c.call(e, a) } }
            return e
        }()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) { var e = CKEDITOR.event.prototype,
                    b; for (b in e) a[b] == null && (a[b] = e[b]) },
            CKEDITOR.event.prototype = function() {
                function a(a) { var d = e(this); return d[a] || (d[a] = new b(a)) }
                var e = function(a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) },
                    b = function(a) { this.name = a;
                        this.listeners = [] };
                b.prototype = { getListenerIndex: function(a) { for (var b = 0, e = this.listeners; b < e.length; b++)
                            if (e[b].fn == a) return b; return -1 } };
                return {
                    define: function(b, d) { var e = a.call(this, b);
                        CKEDITOR.tools.extend(e, d, true) },
                    on: function(b, d, e, j, f) {
                        function h(a, g, f, h) {
                            a = {
                                name: b,
                                sender: this,
                                editor: a,
                                data: g,
                                listenerData: j,
                                stop: f,
                                cancel: h,
                                removeListener: k
                            };
                            return d.call(e, a) === false ? false : a.data
                        }

                        function k() { m.removeListener(b, d) }
                        var g = a.call(this, b);
                        if (g.getListenerIndex(d) < 0) { g = g.listeners;
                            e || (e = this);
                            isNaN(f) && (f = 10); var m = this;
                            h.fn = d;
                            h.priority = f; for (var p = g.length - 1; p >= 0; p--)
                                if (g[p].priority <= f) { g.splice(p + 1, 0, h); return { removeListener: k } }
                            g.unshift(h) }
                        return { removeListener: k }
                    },
                    once: function() {
                        var a = Array.prototype.slice.call(arguments),
                            b = a[1];
                        a[1] = function(a) {
                            a.removeListener();
                            return b.apply(this,
                                arguments)
                        };
                        return this.on.apply(this, a)
                    },
                    capture: function() { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments);
                        CKEDITOR.event.useCapture = 0; return a },
                    fire: function() {
                        var a = 0,
                            b = function() { a = 1 },
                            i = 0,
                            j = function() { i = 1 };
                        return function(f, h, k) {
                            var g = e(this)[f],
                                f = a,
                                m = i;
                            a = i = 0;
                            if (g) { var p = g.listeners; if (p.length)
                                    for (var p = p.slice(0), q, o = 0; o < p.length; o++) { if (g.errorProof) try { q = p[o].call(this, k, h, b, j) } catch (n) {} else q = p[o].call(this, k, h, b, j);
                                        q === false ? i = 1 : typeof q != "undefined" && (h = q); if (a || i) break } } h =
                                i ? false : typeof h == "undefined" ? true : h;
                            a = f;
                            i = m;
                            return h
                        }
                    }(),
                    fireOnce: function(a, b, i) { b = this.fire(a, b, i);
                        delete e(this)[a]; return b },
                    removeListener: function(a, b) { var i = e(this)[a]; if (i) { var j = i.getListenerIndex(b);
                            j >= 0 && i.listeners.splice(j, 1) } },
                    removeAllListeners: function() { var a = e(this),
                            b; for (b in a) delete a[b] },
                    hasListeners: function(a) { return (a = e(this)[a]) && a.listeners.length > 0 }
                }
            }()), CKEDITOR.editor || (CKEDITOR.editor = function() { CKEDITOR._.pending.push([this, arguments]);
                CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire =
            function(a, e) { a in { instanceReady: 1, loaded: 1 } && (this[a] = true); return CKEDITOR.event.prototype.fire.call(this, a, e, this) }, CKEDITOR.editor.prototype.fireOnce = function(a, e) { a in { instanceReady: 1, loaded: 1 } && (this[a] = true); return CKEDITOR.event.prototype.fireOnce.call(this, a, e, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
            var a = navigator.userAgent.toLowerCase(),
                e = a.match(/edge[ \/](\d+.?\d*)/),
                b = a.indexOf("trident/") > -1,
                b = !(!e && !b),
                b = {
                    ie: b,
                    edge: !!e,
                    webkit: !b &&
                        a.indexOf(" applewebkit/") > -1,
                    air: a.indexOf(" adobeair/") > -1,
                    mac: a.indexOf("macintosh") > -1,
                    quirks: document.compatMode == "BackCompat" && (!document.documentMode || document.documentMode < 10),
                    mobile: a.indexOf("mobile") > -1,
                    iOS: /(ipad|iphone|ipod)/.test(a),
                    isCustomDomain: function() { if (!this.ie) return false; var a = document.domain,
                            b = window.location.hostname; return a != b && a != "[" + b + "]" },
                    secure: location.protocol == "https:"
                };
            b.gecko = navigator.product == "Gecko" && !b.webkit && !b.ie;
            if (b.webkit) a.indexOf("chrome") > -1 ? b.chrome =
                true : b.safari = true;
            var c = 0;
            if (b.ie) { c = e ? parseFloat(e[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode;
                b.ie9Compat = c == 9;
                b.ie8Compat = c == 8;
                b.ie7Compat = c == 7;
                b.ie6Compat = c < 7 || b.quirks }
            if (b.gecko)
                if (e = a.match(/rv:([\d\.]+)/)) { e = e[1].split(".");
                    c = e[0] * 1E4 + (e[1] || 0) * 100 + (e[2] || 0) * 1 }
            b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
            b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
            b.version = c;
            b.isCompatible = !(b.ie && c < 7) && !(b.gecko && c < 4E4) && !(b.webkit &&
                c < 534);
            b.hidpi = window.devicePixelRatio >= 2;
            b.needsBrFiller = b.gecko || b.webkit || b.ie && c > 10;
            b.needsNbspFiller = b.ie && c < 11;
            b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
            if (b.quirks) b.cssClass = b.cssClass + " cke_browser_quirks";
            if (b.ie) b.cssClass = b.cssClass + (" cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
            if (b.air) b.cssClass = b.cssClass + " cke_browser_air";
            if (b.iOS) b.cssClass = b.cssClass + " cke_browser_ios";
            if (b.hidpi) b.cssClass = b.cssClass + " cke_hidpi";
            return b
        }()),
        "unloaded" == CKEDITOR.status && function() {
            CKEDITOR.event.implementOn(CKEDITOR);
            CKEDITOR.loadFullCore = function() { if (CKEDITOR.status != "basic_ready") CKEDITOR.loadFullCore._load = 1;
                else { delete CKEDITOR.loadFullCore; var a = document.createElement("script");
                    a.type = "text/javascript";
                    a.src = CKEDITOR.basePath + "ckeditor.js";
                    document.getElementsByTagName("head")[0].appendChild(a) } };
            CKEDITOR.loadFullCoreTimeout = 0;
            CKEDITOR.add = function(a) {
                (this._.pending || (this._.pending = [])).push(a) };
            (function() {
                CKEDITOR.domReady(function() {
                    var a =
                        CKEDITOR.loadFullCore,
                        e = CKEDITOR.loadFullCoreTimeout;
                    if (a) { CKEDITOR.status = "basic_ready";
                        a && a._load ? a() : e && setTimeout(function() { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, e * 1E3) }
                })
            })();
            CKEDITOR.status = "basic_loaded"
        }(), CKEDITOR.dom = {},
        function() {
            var a = [],
                e = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
                b = /&/g,
                c = />/g,
                d = /</g,
                i = /"/g,
                j = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
                f = { lt: "<", gt: ">", amp: "&", quot: '"', nbsp: " ", shy: "­" },
                h = function(a, g) {
                    return g[0] == "#" ?
                        String.fromCharCode(parseInt(g.slice(1), 10)) : f[g]
                };
            CKEDITOR.on("reset", function() { a = [] });
            CKEDITOR.tools = {
                arrayCompare: function(a, g) { if (!a && !g) return true; if (!a || !g || a.length != g.length) return false; for (var b = 0; b < a.length; b++)
                        if (a[b] != g[b]) return false; return true },
                getIndex: function(a, g) { for (var b = 0; b < a.length; ++b)
                        if (g(a[b])) return b; return -1 },
                clone: function(a) {
                    var g;
                    if (a && a instanceof Array) { g = []; for (var b = 0; b < a.length; b++) g[b] = CKEDITOR.tools.clone(a[b]); return g }
                    if (a === null || typeof a != "object" || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
                    g = new a.constructor;
                    for (b in a) g[b] = CKEDITOR.tools.clone(a[b]);
                    return g
                },
                capitalize: function(a, g) { return a.charAt(0).toUpperCase() + (g ? a.slice(1) : a.slice(1).toLowerCase()) },
                extend: function(a) {
                    var g = arguments.length,
                        b, f;
                    if (typeof(b = arguments[g - 1]) == "boolean") g--;
                    else if (typeof(b = arguments[g - 2]) == "boolean") { f = arguments[g - 1];
                        g = g - 2 }
                    for (var h = 1; h < g; h++) {
                        var c = arguments[h],
                            d;
                        for (d in c)
                            if (b ===
                                true || a[d] == null)
                                if (!f || d in f) a[d] = c[d]
                    }
                    return a
                },
                prototypedCopy: function(a) { var g = function() {};
                    g.prototype = a; return new g },
                copy: function(a) { var g = {},
                        b; for (b in a) g[b] = a[b]; return g },
                isArray: function(a) { return Object.prototype.toString.call(a) == "[object Array]" },
                isEmpty: function(a) { for (var g in a)
                        if (a.hasOwnProperty(g)) return false; return true },
                cssVendorPrefix: function(a, g, b) { if (b) return e + a + ":" + g + ";" + a + ":" + g;
                    b = {};
                    b[a] = g;
                    b[e + a] = g; return b },
                cssStyleToDomStyle: function() {
                    var a = document.createElement("div").style,
                        g = typeof a.cssFloat != "undefined" ? "cssFloat" : typeof a.styleFloat != "undefined" ? "styleFloat" : "float";
                    return function(a) { return a == "float" ? g : a.replace(/-./g, function(a) { return a.substr(1).toUpperCase() }) }
                }(),
                buildStyleHtml: function(a) { for (var a = [].concat(a), g, b = [], f = 0; f < a.length; f++)
                        if (g = a[f]) /@import|[{}]/.test(g) ? b.push("<style>" + g + "</style>") : b.push('<link type="text/css" rel=stylesheet href="' + g + '">'); return b.join("") },
                htmlEncode: function(a) {
                    return a === void 0 || a === null ? "" : ("" + a).replace(b, "&amp;").replace(c,
                        "&gt;").replace(d, "&lt;")
                },
                htmlDecode: function(a) { return a.replace(j, h) },
                htmlEncodeAttr: function(a) { return CKEDITOR.tools.htmlEncode(a).replace(i, "&quot;") },
                htmlDecodeAttr: function(a) { return CKEDITOR.tools.htmlDecode(a) },
                transformPlainTextToHtml: function(a, g) {
                    var b = g == CKEDITOR.ENTER_BR,
                        f = this.htmlEncode(a.replace(/\r\n/g, "\n")),
                        f = f.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                        h = g == CKEDITOR.ENTER_P ? "p" : "div";
                    if (!b) {
                        var c = /\n{2}/g;
                        if (c.test(f)) var d = "<" + h + ">",
                            e = "</" + h + ">",
                            f = d + f.replace(c, function() {
                                return e +
                                    d
                            }) + e
                    }
                    f = f.replace(/\n/g, "<br>");
                    b || (f = f.replace(RegExp("<br>(?=</" + h + ">)"), function(a) { return CKEDITOR.tools.repeat(a, 2) }));
                    f = f.replace(/^ | $/g, "&nbsp;");
                    return f = f.replace(/(>|\s) /g, function(a, g) { return g + "&nbsp;" }).replace(/ (?=<)/g, "&nbsp;")
                },
                getNextNumber: function() { var a = 0; return function() { return ++a } }(),
                getNextId: function() { return "cke_" + this.getNextNumber() },
                getUniqueId: function() { for (var a = "e", g = 0; g < 8; g++) a = a + Math.floor((1 + Math.random()) * 65536).toString(16).substring(1); return a },
                override: function(a,
                    g) { var b = g(a);
                    b.prototype = a.prototype; return b },
                setTimeout: function(a, g, b, f, h) { h || (h = window);
                    b || (b = h); return h.setTimeout(function() { f ? a.apply(b, [].concat(f)) : a.apply(b) }, g || 0) },
                trim: function() { var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function(g) { return g.replace(a, "") } }(),
                ltrim: function() { var a = /^[ \t\n\r]+/g; return function(g) { return g.replace(a, "") } }(),
                rtrim: function() { var a = /[ \t\n\r]+$/g; return function(g) { return g.replace(a, "") } }(),
                indexOf: function(a, g) {
                    if (typeof g == "function")
                        for (var b =
                                0, f = a.length; b < f; b++) { if (g(a[b])) return b } else { if (a.indexOf) return a.indexOf(g);
                            b = 0; for (f = a.length; b < f; b++)
                                if (a[b] === g) return b }
                    return -1
                },
                search: function(a, g) { var b = CKEDITOR.tools.indexOf(a, g); return b >= 0 ? a[b] : null },
                bind: function(a, g) { return function() { return a.apply(g, arguments) } },
                createClass: function(a) {
                    var g = a.$,
                        b = a.base,
                        f = a.privates || a._,
                        h = a.proto,
                        a = a.statics;
                    !g && (g = function() { b && this.base.apply(this, arguments) });
                    if (f) var c = g,
                        g = function() {
                            var a = this._ || (this._ = {}),
                                g;
                            for (g in f) {
                                var b = f[g];
                                a[g] =
                                    typeof b == "function" ? CKEDITOR.tools.bind(b, this) : b
                            }
                            c.apply(this, arguments)
                        };
                    if (b) { g.prototype = this.prototypedCopy(b.prototype);
                        g.prototype.constructor = g;
                        g.base = b;
                        g.baseProto = b.prototype;
                        g.prototype.base = function() { this.base = b.prototype.base;
                            b.apply(this, arguments);
                            this.base = arguments.callee } } h && this.extend(g.prototype, h, true);
                    a && this.extend(g, a, true);
                    return g
                },
                addFunction: function(b, g) { return a.push(function() { return b.apply(g || this, arguments) }) - 1 },
                removeFunction: function(b) { a[b] = null },
                callFunction: function(b) {
                    var g =
                        a[b];
                    return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
                },
                cssLength: function() { var a = /^-?\d+\.?\d*px$/,
                        g; return function(b) { g = CKEDITOR.tools.trim(b + "") + "px"; return a.test(g) ? g : b || "" } }(),
                convertToPx: function() { var a; return function(g) { if (!a) { a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
                            CKEDITOR.document.getBody().append(a) } if (!/%$/.test(g)) { a.setStyle("width", g); return a.$.clientWidth } return g } }(),
                repeat: function(a, g) { return Array(g + 1).join(a) },
                tryThese: function() { for (var a, g = 0, b = arguments.length; g < b; g++) { var f = arguments[g]; try { a = f(); break } catch (h) {} } return a },
                genKey: function() { return Array.prototype.slice.call(arguments).join("-") },
                defer: function(a) { return function() { var g = arguments,
                            b = this;
                        window.setTimeout(function() { a.apply(b, g) }, 0) } },
                normalizeCssText: function(a, g) { var b = [],
                        f, h = CKEDITOR.tools.parseCssText(a, true, g); for (f in h) b.push(f + ":" + h[f]);
                    b.sort(); return b.length ? b.join(";") + ";" : "" },
                convertRgbToHex: function(a) { return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, f, h) { a = [b, f, h]; for (b = 0; b < 3; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2); return "#" + a.join("") }) },
                parseCssText: function(a, g, b) {
                    var f = {};
                    if (b) { b = new CKEDITOR.dom.element("span");
                        b.setAttribute("style", a);
                        a = CKEDITOR.tools.convertRgbToHex(b.getAttribute("style") || "") }
                    if (!a || a == ";") return f;
                    a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, b, h) {
                        if (g) {
                            b =
                                b.toLowerCase();
                            b == "font-family" && (h = h.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                            h = CKEDITOR.tools.trim(h)
                        }
                        f[b] = h
                    });
                    return f
                },
                writeCssText: function(a, g) { var b, f = []; for (b in a) f.push(b + ":" + a[b]);
                    g && f.sort(); return f.join("; ") },
                objectCompare: function(a, g, b) { var f; if (!a && !g) return true; if (!a || !g) return false; for (f in a)
                        if (a[f] != g[f]) return false; if (!b)
                        for (f in g)
                            if (a[f] != g[f]) return false; return true },
                objectKeys: function(a) { var g = [],
                        b; for (b in a) g.push(b); return g },
                convertArrayToObject: function(a,
                    g) { var b = {};
                    arguments.length == 1 && (g = true); for (var f = 0, h = a.length; f < h; ++f) b[a[f]] = g; return b },
                fixDomain: function() { for (var a;;) try { a = window.parent.document.domain; break } catch (g) { a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain; if (!a) break;
                        document.domain = a }
                    return !!a },
                eventsBuffer: function(a, g, b) {
                    function f() { c = (new Date).getTime();
                        h = false;
                        b ? g.call(b) : g() } var h, c = 0; return { input: function() { if (!h) { var g = (new Date).getTime() - c;
                                g < a ? h = setTimeout(f, a - g) : f() } }, reset: function() { h && clearTimeout(h);
                            h = c = 0 } } },
                enableHtml5Elements: function(a,
                    g) { for (var b = ["abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "main", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video"], f = b.length, h; f--;) { h = a.createElement(b[f]);
                        g && a.appendChild(h) } },
                checkIfAnyArrayItemMatches: function(a, g) { for (var b = 0, f = a.length; b < f; ++b)
                        if (a[b].match(g)) return true; return false },
                checkIfAnyObjectPropertyMatches: function(a, g) { for (var b in a)
                        if (b.match(g)) return true; return false },
                transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw=="
            }
        }(), CKEDITOR.dtd = function() {
            var a = CKEDITOR.tools.extend,
                e = function(a, g) { for (var b = CKEDITOR.tools.clone(a), f = 1; f < arguments.length; f++) { var g = arguments[f],
                            h; for (h in g) delete b[h] } return b },
                b = {},
                c = {},
                d = {
                    address: 1,
                    article: 1,
                    aside: 1,
                    blockquote: 1,
                    details: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    figure: 1,
                    footer: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    header: 1,
                    hgroup: 1,
                    hr: 1,
                    main: 1,
                    menu: 1,
                    nav: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    section: 1,
                    table: 1,
                    ul: 1
                },
                i = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 },
                j = {},
                f = { "#": 1 },
                h = { center: 1, dir: 1, noframes: 1 };
            a(b, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, f, {
                acronym: 1,
                applet: 1,
                basefont: 1,
                big: 1,
                font: 1,
                isindex: 1,
                strike: 1,
                style: 1,
                tt: 1
            });
            a(c, d, b, h);
            e = {
                a: e(b, { a: 1, button: 1 }),
                abbr: b,
                address: c,
                area: j,
                article: c,
                aside: c,
                audio: a({ source: 1, track: 1 }, c),
                b: b,
                base: j,
                bdi: b,
                bdo: b,
                blockquote: c,
                body: c,
                br: j,
                button: e(b, { a: 1, button: 1 }),
                canvas: b,
                caption: c,
                cite: b,
                code: b,
                col: j,
                colgroup: { col: 1 },
                command: j,
                datalist: a({ option: 1 }, b),
                dd: c,
                del: b,
                details: a({ summary: 1 }, c),
                dfn: b,
                div: c,
                dl: { dt: 1, dd: 1 },
                dt: c,
                em: b,
                embed: j,
                fieldset: a({ legend: 1 }, c),
                figcaption: c,
                figure: a({ figcaption: 1 }, c),
                footer: c,
                form: c,
                h1: b,
                h2: b,
                h3: b,
                h4: b,
                h5: b,
                h6: b,
                head: a({ title: 1, base: 1 }, i),
                header: c,
                hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
                hr: j,
                html: a({ head: 1, body: 1 }, c, i),
                i: b,
                iframe: f,
                img: j,
                input: j,
                ins: b,
                kbd: b,
                keygen: j,
                label: b,
                legend: b,
                li: c,
                link: j,
                main: c,
                map: c,
                mark: b,
                menu: a({ li: 1 }, c),
                meta: j,
                meter: e(b, { meter: 1 }),
                nav: c,
                noscript: a({ link: 1, meta: 1, style: 1 }, b),
                object: a({ param: 1 }, b),
                ol: { li: 1 },
                optgroup: { option: 1 },
                option: f,
                output: b,
                p: b,
                param: j,
                pre: b,
                progress: e(b, { progress: 1 }),
                q: b,
                rp: b,
                rt: b,
                ruby: a({ rp: 1, rt: 1 }, b),
                s: b,
                samp: b,
                script: f,
                section: c,
                select: {
                    optgroup: 1,
                    option: 1
                },
                small: b,
                source: j,
                span: b,
                strong: b,
                style: f,
                sub: b,
                summary: b,
                sup: b,
                table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 },
                tbody: { tr: 1 },
                td: c,
                textarea: f,
                tfoot: { tr: 1 },
                th: c,
                thead: { tr: 1 },
                time: e(b, { time: 1 }),
                title: f,
                tr: { th: 1, td: 1 },
                track: j,
                u: b,
                ul: { li: 1 },
                "var": b,
                video: a({ source: 1, track: 1 }, c),
                wbr: j,
                acronym: b,
                applet: a({ param: 1 }, c),
                basefont: j,
                big: b,
                center: c,
                dialog: j,
                dir: { li: 1 },
                font: b,
                isindex: j,
                noframes: c,
                strike: b,
                tt: b
            };
            a(e, {
                $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, d, h),
                $blockLimit: {
                    article: 1,
                    aside: 1,
                    audio: 1,
                    body: 1,
                    caption: 1,
                    details: 1,
                    dir: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    figcaption: 1,
                    figure: 1,
                    footer: 1,
                    form: 1,
                    header: 1,
                    hgroup: 1,
                    main: 1,
                    menu: 1,
                    nav: 1,
                    ol: 1,
                    section: 1,
                    table: 1,
                    td: 1,
                    th: 1,
                    tr: 1,
                    ul: 1,
                    video: 1
                },
                $cdata: { script: 1, style: 1 },
                $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 },
                $empty: {
                    area: 1,
                    base: 1,
                    basefont: 1,
                    br: 1,
                    col: 1,
                    command: 1,
                    dialog: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    isindex: 1,
                    keygen: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    source: 1,
                    track: 1,
                    wbr: 1
                },
                $inline: b,
                $list: { dl: 1, ol: 1, ul: 1 },
                $listItem: { dd: 1, dt: 1, li: 1 },
                $nonBodyContent: a({ body: 1, head: 1, html: 1 }, e.head),
                $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 },
                $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 },
                $removeEmpty: {
                    abbr: 1,
                    acronym: 1,
                    b: 1,
                    bdi: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    mark: 1,
                    meter: 1,
                    output: 1,
                    q: 1,
                    ruby: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    time: 1,
                    tt: 1,
                    u: 1,
                    "var": 1
                },
                $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 },
                $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 },
                $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 },
                $intermediate: {
                    caption: 1,
                    colgroup: 1,
                    dd: 1,
                    dt: 1,
                    figcaption: 1,
                    legend: 1,
                    li: 1,
                    optgroup: 1,
                    option: 1,
                    rp: 1,
                    rt: 1,
                    summary: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1
                }
            });
            return e
        }(), CKEDITOR.dom.event = function(a) { this.$ = a }, CKEDITOR.dom.event.prototype = {
            getKey: function() { return this.$.keyCode || this.$.which },
            getKeystroke: function() { var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a = a + CKEDITOR.CTRL;
                this.$.shiftKey && (a = a + CKEDITOR.SHIFT);
                this.$.altKey && (a = a + CKEDITOR.ALT); return a },
            preventDefault: function(a) { var e = this.$;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                a && this.stopPropagation() },
            stopPropagation: function() {
                var a = this.$;
                a.stopPropagation ?
                    a.stopPropagation() : a.cancelBubble = true
            },
            getTarget: function() { var a = this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null },
            getPhase: function() { return this.$.eventPhase || 2 },
            getPageOffset: function() { var a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
        }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING =
        1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(a) { if (a) this.$ = a }, CKEDITOR.dom.domObject.prototype = function() {
            var a = function(a, b) { return function(c) { typeof CKEDITOR != "undefined" && a.fire(b, new CKEDITOR.dom.event(c)) } };
            return {
                getPrivate: function() { var a; if (!(a = this.getCustomData("_"))) this.setCustomData("_", a = {}); return a },
                on: function(e) {
                    var b = this.getCustomData("_cke_nativeListeners");
                    if (!b) { b = {};
                        this.setCustomData("_cke_nativeListeners", b) }
                    if (!b[e]) {
                        b =
                            b[e] = a(this, e);
                        this.$.addEventListener ? this.$.addEventListener(e, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, b)
                    }
                    return CKEDITOR.event.prototype.on.apply(this, arguments)
                },
                removeListener: function(a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) { var b = this.getCustomData("_cke_nativeListeners"),
                            c = b && b[a]; if (c) { this.$.removeEventListener ? this.$.removeEventListener(a, c, false) : this.$.detachEvent && this.$.detachEvent("on" + a, c);
                            delete b[a] } } },
                removeAllListeners: function() { var a = this.getCustomData("_cke_nativeListeners"),
                        b; for (b in a) { var c = a[b];
                        this.$.detachEvent ? this.$.detachEvent("on" + b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, false);
                        delete a[b] } CKEDITOR.event.prototype.removeAllListeners.call(this) }
            }
        }(),
        function(a) {
            var e = {};
            CKEDITOR.on("reset", function() { e = {} });
            a.equals = function(a) { try { return a && a.$ === this.$ } catch (c) { return false } };
            a.setCustomData = function(a, c) { var d = this.getUniqueId();
                (e[d] || (e[d] = {}))[a] = c; return this };
            a.getCustomData = function(a) { var c = this.$["data-cke-expando"]; return (c = c && e[c]) && a in c ? c[a] : null };
            a.removeCustomData = function(a) { var c = this.$["data-cke-expando"],
                    c = c && e[c],
                    d, i; if (c) { d = c[a];
                    i = a in c;
                    delete c[a] } return i ? d : null };
            a.clearCustomData = function() { this.removeAllListeners(); var a = this.$["data-cke-expando"];
                a && delete e[a] };
            a.getUniqueId = function() { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) };
            CKEDITOR.event.implementOn(a)
        }(CKEDITOR.dom.domObject.prototype),
        CKEDITOR.dom.node = function(a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL =
        0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
            appendTo: function(a, e) { a.append(this, e); return a },
            clone: function(a, e) {
                function b(c) {
                    c["data-cke-expando"] && (c["data-cke-expando"] = false);
                    if (!(c.nodeType != CKEDITOR.NODE_ELEMENT && c.nodeType != CKEDITOR.NODE_DOCUMENT_FRAGMENT)) {
                        !e && c.nodeType == CKEDITOR.NODE_ELEMENT && c.removeAttribute("id", false);
                        if (a)
                            for (var c = c.childNodes, d = 0; d < c.length; d++) b(c[d])
                    }
                }

                function c(b) { if (!(b.type != CKEDITOR.NODE_ELEMENT && b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT)) { if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) { var d = b.getName();
                            d[0] == ":" && b.renameNode(d.substring(1)) } if (a)
                            for (d = 0; d < b.getChildCount(); d++) c(b.getChild(d)) } }
                var d = this.$.cloneNode(a);
                b(d);
                d = new CKEDITOR.dom.node(d);
                CKEDITOR.env.ie && (CKEDITOR.env.version < 9 && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)) && c(d);
                return d
            },
            hasPrevious: function() { return !!this.$.previousSibling },
            hasNext: function() { return !!this.$.nextSibling },
            insertAfter: function(a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a },
            insertBefore: function(a) { a.$.parentNode.insertBefore(this.$, a.$); return a },
            insertBeforeMe: function(a) { this.$.parentNode.insertBefore(a.$, this.$); return a },
            getAddress: function(a) { for (var e = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) { var d = c.parentNode;
                    d && e.unshift(this.getIndex.call({ $: c }, a));
                    c = d } return e },
            getDocument: function() { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) },
            getIndex: function(a) {
                function e(a, b) { var f = b ? a.nextSibling : a.previousSibling; return !f || f.nodeType != CKEDITOR.NODE_TEXT ? null : f.nodeValue ? f : e(f, b) }
                var b = this.$,
                    c = -1,
                    d;
                if (!this.$.parentNode || a && b.nodeType == CKEDITOR.NODE_TEXT && !b.nodeValue && !e(b) && !e(b, true)) return -1;
                do
                    if (!a || !(b != this.$ && b.nodeType == CKEDITOR.NODE_TEXT && (d || !b.nodeValue))) { c++;
                        d = b.nodeType == CKEDITOR.NODE_TEXT }
                while (b = b.previousSibling);
                return c
            },
            getNextSourceNode: function(a, e, b) { if (b && !b.call) var c = b,
                    b = function(a) { return !a.equals(c) }; var a = !a && this.getFirst && this.getFirst(),
                    d; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && b(this, true) === false) return null;
                    a = this.getNext() } for (; !a && (d = (d || this).getParent());) { if (b && b(d, true) === false) return null;
                    a = d.getNext() } return !a || b && b(a) === false ? null : e && e != a.type ? a.getNextSourceNode(false, e, b) : a },
            getPreviousSourceNode: function(a, e, b) {
                if (b && !b.call) var c = b,
                    b = function(a) { return !a.equals(c) };
                var a = !a && this.getLast && this.getLast(),
                    d;
                if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && b(this, true) === false) return null;
                    a = this.getPrevious() }
                for (; !a && (d = (d || this).getParent());) { if (b && b(d, true) === false) return null;
                    a = d.getPrevious() }
                return !a || b && b(a) === false ? null : e && a.type != e ? a.getPreviousSourceNode(false, e, b) : a
            },
            getPrevious: function(a) { var e = this.$,
                    b;
                do b = (e = e.previousSibling) && e.nodeType != 10 && new CKEDITOR.dom.node(e); while (b && a && !a(b)); return b },
            getNext: function(a) {
                var e = this.$,
                    b;
                do b = (e = e.nextSibling) &&
                    new CKEDITOR.dom.node(e); while (b && a && !a(b));
                return b
            },
            getParent: function(a) { var e = this.$.parentNode; return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || a && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) : null },
            getParents: function(a) { var e = this,
                    b = [];
                do b[a ? "push" : "unshift"](e); while (e = e.getParent()); return b },
            getCommonAncestor: function(a) {
                if (a.equals(this)) return this;
                if (a.contains && a.contains(this)) return a;
                var e = this.contains ? this : this.getParent();
                do
                    if (e.contains(a)) return e; while (e =
                    e.getParent());
                return null
            },
            getPosition: function(a) {
                var e = this.$,
                    b = a.$;
                if (e.compareDocumentPosition) return e.compareDocumentPosition(b);
                if (e == b) return CKEDITOR.POSITION_IDENTICAL;
                if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                    if (e.contains) { if (e.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (b.contains(e)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING }
                    if ("sourceIndex" in e) return e.sourceIndex < 0 || b.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED :
                        e.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                }
                for (var e = this.getAddress(), a = a.getAddress(), b = Math.min(e.length, a.length), c = 0; c < b; c++)
                    if (e[c] != a[c]) return e[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                return e.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
            },
            getAscendant: function(a, e) {
                var b = this.$,
                    c, d;
                if (!e) b = b.parentNode;
                if (typeof a == "function") { d = true;
                    c = a } else {
                    d =
                        false;
                    c = function(b) { b = typeof b.nodeName == "string" ? b.nodeName.toLowerCase() : ""; return typeof a == "string" ? b == a : b in a }
                }
                for (; b;) { if (c(d ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b); try { b = b.parentNode } catch (i) { b = null } }
                return null
            },
            hasAscendant: function(a, e) { var b = this.$; if (!e) b = b.parentNode; for (; b;) { if (b.nodeName && b.nodeName.toLowerCase() == a) return true;
                    b = b.parentNode } return false },
            move: function(a, e) { a.append(this.remove(), e) },
            remove: function(a) {
                var e = this.$,
                    b = e.parentNode;
                if (b) {
                    if (a)
                        for (; a =
                            e.firstChild;) b.insertBefore(e.removeChild(a), e);
                    b.removeChild(e)
                }
                return this
            },
            replace: function(a) { this.insertBefore(a);
                a.remove() },
            trim: function() { this.ltrim();
                this.rtrim() },
            ltrim: function() { for (var a; this.getFirst && (a = this.getFirst());) { if (a.type == CKEDITOR.NODE_TEXT) { var e = CKEDITOR.tools.ltrim(a.getText()),
                            b = a.getLength(); if (e) { if (e.length < b) { a.split(b - e.length);
                                this.$.removeChild(this.$.firstChild) } } else { a.remove(); continue } } break } },
            rtrim: function() {
                for (var a; this.getLast && (a = this.getLast());) {
                    if (a.type ==
                        CKEDITOR.NODE_TEXT) { var e = CKEDITOR.tools.rtrim(a.getText()),
                            b = a.getLength(); if (e) { if (e.length < b) { a.split(e.length);
                                this.$.lastChild.parentNode.removeChild(this.$.lastChild) } } else { a.remove(); continue } }
                    break
                }
                if (CKEDITOR.env.needsBrFiller)(a = this.$.lastChild) && (a.type == 1 && a.nodeName.toLowerCase() == "br") && a.parentNode.removeChild(a)
            },
            isReadOnly: function(a) {
                var e = this;
                this.type != CKEDITOR.NODE_ELEMENT && (e = this.getParent());
                CKEDITOR.env.edge && (e && e.is("textarea")) && (a = true);
                if (!a && e && typeof e.$.isContentEditable !=
                    "undefined") return !(e.$.isContentEditable || e.data("cke-editable"));
                for (; e;) { if (e.data("cke-editable")) return false; if (e.hasAttribute("contenteditable")) return e.getAttribute("contenteditable") == "false";
                    e = e.getParent() }
                return true
            }
        }), CKEDITOR.dom.window = function(a) { CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function() { this.$.focus() },
            getViewPaneSize: function() {
                var a = this.$.document,
                    e = a.compatMode ==
                    "CSS1Compat";
                return { width: (e ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (e ? a.documentElement.clientHeight : a.body.clientHeight) || 0 }
            },
            getScrollPosition: function() { var a = this.$; if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 };
                a = a.document; return { x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop || a.body.scrollTop || 0 } },
            getFrame: function() { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
        }), CKEDITOR.dom.document =
        function(a) { CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
            type: CKEDITOR.NODE_DOCUMENT,
            appendStyleSheet: function(a) { if (this.$.createStyleSheet) this.$.createStyleSheet(a);
                else { var e = new CKEDITOR.dom.element("link");
                    e.setAttributes({ rel: "stylesheet", type: "text/css", href: a });
                    this.getHead().append(e) } },
            appendStyleText: function(a) {
                if (this.$.createStyleSheet) {
                    var e = this.$.createStyleSheet("");
                    e.cssText =
                        a
                } else { var b = new CKEDITOR.dom.element("style", this);
                    b.append(new CKEDITOR.dom.text(a, this));
                    this.getHead().append(b) }
                return e || b.$.sheet
            },
            createElement: function(a, e) { var b = new CKEDITOR.dom.element(a, this); if (e) { e.attributes && b.setAttributes(e.attributes);
                    e.styles && b.setStyles(e.styles) } return b },
            createText: function(a) { return new CKEDITOR.dom.text(a, this) },
            focus: function() { this.getWindow().focus() },
            getActive: function() { var a; try { a = this.$.activeElement } catch (e) { return null } return new CKEDITOR.dom.element(a) },
            getById: function(a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null },
            getByAddress: function(a, e) { for (var b = this.$.documentElement, c = 0; b && c < a.length; c++) { var d = a[c]; if (e)
                        for (var i = -1, j = 0; j < b.childNodes.length; j++) { var f = b.childNodes[j]; if (!(e === true && f.nodeType == 3 && f.previousSibling && f.previousSibling.nodeType == 3)) { i++; if (i == d) { b = f; break } } } else b = b.childNodes[d] } return b ? new CKEDITOR.dom.node(b) : null },
            getElementsByTag: function(a, e) {
                !(CKEDITOR.env.ie && document.documentMode <= 8) && e &&
                    (a = e + ":" + a);
                return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
            },
            getHead: function() { var a = this.$.getElementsByTagName("head")[0]; return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true) },
            getBody: function() { return new CKEDITOR.dom.element(this.$.body) },
            getDocumentElement: function() { return new CKEDITOR.dom.element(this.$.documentElement) },
            getWindow: function() { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) },
            write: function(a) {
                this.$.open("text/html",
                    "replace");
                CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>"));
                this.$.write(a);
                this.$.close()
            },
            find: function(a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) },
            findOne: function(a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null },
            _getHtml5ShivFrag: function() {
                var a = this.getCustomData("html5ShivFrag");
                if (!a) {
                    a = this.$.createDocumentFragment();
                    CKEDITOR.tools.enableHtml5Elements(a, true);
                    this.setCustomData("html5ShivFrag", a)
                }
                return a
            }
        }), CKEDITOR.dom.nodeList = function(a) { this.$ = a }, CKEDITOR.dom.nodeList.prototype = { count: function() { return this.$.length }, getItem: function(a) { if (a < 0 || a >= this.$.length) return null; return (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null } }, CKEDITOR.dom.element = function(a, e) { typeof a == "string" && (a = (e ? e.$ : document).createElement(a));
            CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.element.get = function(a) {
            return (a = typeof a == "string" ? document.getElementById(a) || document.getElementsByName(a)[0] :
                a) && (a.$ ? a : new CKEDITOR.dom.element(a))
        }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function(a, e) { var b = new CKEDITOR.dom.element("div", e);
            b.setHtml(a); return b.getFirst().remove() }, CKEDITOR.dom.element.setMarker = function(a, e, b, c) {
            var d = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
                i = e.getCustomData("list_marker_names") || e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
            a[d] = e;
            i[b] = 1;
            return e.setCustomData(b, c)
        }, CKEDITOR.dom.element.clearAllMarkers = function(a) { for (var e in a) CKEDITOR.dom.element.clearMarkers(a, a[e], 1) }, CKEDITOR.dom.element.clearMarkers = function(a, e, b) { var c = e.getCustomData("list_marker_names"),
                d = e.getCustomData("list_marker_id"),
                i; for (i in c) e.removeCustomData(i);
            e.removeCustomData("list_marker_names"); if (b) { e.removeCustomData("list_marker_id");
                delete a[d] } },
        function() {
            function a(a, b) { return (" " + a + " ").replace(i, " ").indexOf(" " + b + " ") > -1 }

            function e(a) {
                var b =
                    true;
                if (!a.$.id) { a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber();
                    b = false }
                return function() { b || a.removeAttribute("id") }
            }

            function b(a, b) { return "#" + a.$.id + " " + b.split(/,\s*/).join(", #" + a.$.id + " ") }

            function c(a) { for (var b = 0, c = 0, g = j[a].length; c < g; c++) b = b + (parseInt(this.getComputedStyle(j[a][c]) || 0, 10) || 0); return b }
            var d = !!document.createElement("span").classList,
                i = /[\n\t\r]/g;
            CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_ELEMENT,
                addClass: d ? function(a) {
                    this.$.classList.add(a);
                    return this
                } : function(b) { var h = this.$.className;
                    h && (a(h, b) || (h = h + (" " + b)));
                    this.$.className = h || b; return this },
                removeClass: d ? function(a) { var b = this.$;
                    b.classList.remove(a);
                    b.className || b.removeAttribute("class"); return this } : function(b) { var h = this.getAttribute("class"); if (h && a(h, b))(h = h.replace(RegExp("(?:^|\\s+)" + b + "(?=\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", h) : this.removeAttribute("class"); return this },
                hasClass: function(b) { return a(this.$.className, b) },
                append: function(a, b) {
                    typeof a ==
                        "string" && (a = this.getDocument().createElement(a));
                    b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                    return a
                },
                appendHtml: function(a) { if (this.$.childNodes.length) { var b = new CKEDITOR.dom.element("div", this.getDocument());
                        b.setHtml(a);
                        b.moveChildren(this) } else this.setHtml(a) },
                appendText: function(a) { this.$.text != null && CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? this.$.text = this.$.text + a : this.append(new CKEDITOR.dom.text(a)) },
                appendBogus: function(a) {
                    if (a || CKEDITOR.env.needsBrFiller) {
                        for (a =
                            this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
                        if (!a || !a.is || !a.is("br")) { a = this.getDocument().createElement("br");
                            CKEDITOR.env.gecko && a.setAttribute("type", "_moz");
                            this.append(a) }
                    }
                },
                breakParent: function(a, b) { var c = new CKEDITOR.dom.range(this.getDocument());
                    c.setStartAfter(this);
                    c.setEndAfter(a); var g = c.extractContents(false, b || false);
                    c.insertNode(this.remove());
                    g.insertAfterNode(this) },
                contains: !document.compareDocumentPosition ? function(a) {
                    var b =
                        this.$;
                    return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
                } : function(a) { return !!(this.$.compareDocumentPosition(a.$) & 16) },
                focus: function() {
                    function a() { try { this.$.focus() } catch (b) {} } return function(b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(),
                getHtml: function() { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a },
                getOuterHtml: function() {
                    if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                    var a = this.$.ownerDocument.createElement("div");
                    a.appendChild(this.$.cloneNode(true));
                    return a.innerHTML
                },
                getClientRect: function() { var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());!a.width && (a.width = a.right - a.left);!a.height && (a.height = a.bottom - a.top); return a },
                setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(a) {
                    try { var b = this.$; if (this.getParent()) return b.innerHTML = a; var c = this.getDocument()._getHtml5ShivFrag();
                        c.appendChild(b);
                        b.innerHTML = a;
                        c.removeChild(b); return a } catch (g) {
                        this.$.innerHTML = "";
                        b = new CKEDITOR.dom.element("body",
                            this.getDocument());
                        b.$.innerHTML = a;
                        for (b = b.getChildren(); b.count();) this.append(b.getItem(0));
                        return a
                    }
                } : function(a) { return this.$.innerHTML = a },
                setText: function() { var a = document.createElement("p");
                    a.innerHTML = "x";
                    a = a.textContent; return function(b) { this.$[a ? "textContent" : "innerText"] = b } }(),
                getAttribute: function() {
                    var a = function(a) { return this.$.getAttribute(a, 2) };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
                        switch (a) {
                            case "class":
                                a = "className";
                                break;
                            case "http-equiv":
                                a =
                                    "httpEquiv";
                                break;
                            case "name":
                                return this.$.name;
                            case "tabindex":
                                a = this.$.getAttribute(a, 2);
                                a !== 0 && this.$.tabIndex === 0 && (a = null);
                                return a;
                            case "checked":
                                a = this.$.attributes.getNamedItem(a);
                                return (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                            case "hspace":
                            case "value":
                                return this.$[a];
                            case "style":
                                return this.$.style.cssText;
                            case "contenteditable":
                            case "contentEditable":
                                return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                        }
                        return this.$.getAttribute(a,
                            2)
                    } : a
                }(),
                getChildren: function() { return new CKEDITOR.dom.nodeList(this.$.childNodes) },
                getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(a) { var b = this.getWindow().$.getComputedStyle(this.$, null); return b ? b.getPropertyValue(a) : "" } : function(a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                getDtd: function() { var a = CKEDITOR.dtd[this.getName()];
                    this.getDtd = function() { return a }; return a },
                getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
                getTabIndex: function() { var a = this.$.tabIndex; return a === 0 && !CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0 ? -1 : a },
                getText: function() { return this.$.textContent || this.$.innerText || "" },
                getWindow: function() { return this.getDocument().getWindow() },
                getId: function() { return this.$.id || null },
                getNameAtt: function() { return this.$.name || null },
                getName: function() {
                    var a = this.$.nodeName.toLowerCase();
                    if (CKEDITOR.env.ie && document.documentMode <= 8) {
                        var b = this.$.scopeName;
                        b != "HTML" &&
                            (a = b.toLowerCase() + ":" + a)
                    }
                    this.getName = function() { return a };
                    return this.getName()
                },
                getValue: function() { return this.$.value },
                getFirst: function(a) { var b = this.$.firstChild;
                    (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getNext(a)); return b },
                getLast: function(a) { var b = this.$.lastChild;
                    (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getPrevious(a)); return b },
                getStyle: function(a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                is: function() {
                    var a = this.getName();
                    if (typeof arguments[0] == "object") return !!arguments[0][a];
                    for (var b = 0; b < arguments.length; b++)
                        if (arguments[b] == a) return true;
                    return false
                },
                isEditable: function(a) { var b = this.getName(); if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) return false; if (a !== false) { a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span; return !(!a || !a["#"]) } return true },
                isIdentical: function(a) {
                    var b =
                        this.clone(0, 1),
                        a = a.clone(0, 1);
                    b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                    a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                    if (b.$.isEqualNode) { b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText);
                        a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText); return b.$.isEqualNode(a.$) } b = b.getOuterHtml();
                    a = a.getOuterHtml();
                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                        var c =
                            this.getParent();
                        if (c.type == CKEDITOR.NODE_ELEMENT) { c = c.clone();
                            c.setHtml(b);
                            b = c.getHtml();
                            c.setHtml(a);
                            a = c.getHtml() }
                    }
                    return b == a
                },
                isVisible: function() { var a = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden",
                        b, c; if (a && CKEDITOR.env.webkit) { b = this.getWindow(); if (!b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement)) a = (new CKEDITOR.dom.element(c)).isVisible() } return !!a },
                isEmptyInlineRemoveable: function() {
                    if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return false;
                    for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) { var g = a.getItem(b); if (!(g.type == CKEDITOR.NODE_ELEMENT && g.data("cke-bookmark")) && (g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText()))) return false }
                    return true
                },
                hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
                    for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                        var c = a[b];
                        switch (c.nodeName) {
                            case "class":
                                if (this.getAttribute("class")) return true;
                            case "data-cke-expando":
                                continue;
                            default:
                                if (c.specified) return true
                        }
                    }
                    return false
                } : function() { var a = this.$.attributes,
                        b = a.length,
                        c = { "data-cke-expando": 1, _moz_dirty: 1 }; return b > 0 && (b > 2 || !c[a[0].nodeName] || b == 2 && !c[a[1].nodeName]) },
                hasAttribute: function() {
                    function a(b) {
                        var c = this.$.attributes.getNamedItem(b);
                        if (this.getName() == "input") switch (b) {
                            case "class":
                                return this.$.className.length > 0;
                            case "checked":
                                return !!this.$.checked;
                            case "value":
                                b = this.getAttribute("type");
                                return b == "checkbox" || b == "radio" ?
                                    this.$.value != "on" : !!this.$.value
                        }
                        return !c ? false : c.specified
                    }
                    return CKEDITOR.env.ie ? CKEDITOR.env.version < 8 ? function(b) { return b == "name" ? !!this.$.name : a.call(this, b) } : a : function(a) { return !!this.$.attributes.getNamedItem(a) }
                }(),
                hide: function() { this.setStyle("display", "none") },
                moveChildren: function(a, b) { var c = this.$,
                        a = a.$; if (c != a) { var g; if (b)
                            for (; g = c.lastChild;) a.insertBefore(c.removeChild(g), a.firstChild);
                        else
                            for (; g = c.firstChild;) a.appendChild(c.removeChild(g)) } },
                mergeSiblings: function() {
                    function a(b,
                        c, g) { if (c && c.type == CKEDITOR.NODE_ELEMENT) { for (var f = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();) { f.push(c);
                                c = g ? c.getNext() : c.getPrevious(); if (!c || c.type != CKEDITOR.NODE_ELEMENT) return } if (b.isIdentical(c)) { for (var d = g ? b.getLast() : b.getFirst(); f.length;) f.shift().move(b, !g);
                                c.moveChildren(b, !g);
                                c.remove();
                                d && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings() } } }
                    return function(b) { if (b === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) { a(this, this.getNext(), true);
                            a(this, this.getPrevious()) } }
                }(),
                show: function() { this.setStyles({ display: "", visibility: "" }) },
                setAttribute: function() {
                    var a = function(a, b) { this.$.setAttribute(a, b); return this };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(b, c) { b == "class" ? this.$.className = c : b == "style" ? this.$.style.cssText = c : b == "tabindex" ? this.$.tabIndex = c : b == "checked" ? this.$.checked = c : b == "contenteditable" ? a.call(this, "contentEditable", c) : a.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
                        if (b ==
                            "src" && c.match(/^http:\/\//)) try { a.apply(this, arguments) } catch (g) {} else a.apply(this, arguments);
                        return this
                    } : a
                }(),
                setAttributes: function(a) { for (var b in a) this.setAttribute(b, a[b]); return this },
                setValue: function(a) { this.$.value = a; return this },
                removeAttribute: function() {
                    var a = function(a) { this.$.removeAttribute(a) };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) { a == "class" ? a = "className" : a == "tabindex" ? a = "tabIndex" : a == "contenteditable" && (a = "contentEditable");
                            this.$.removeAttribute(a) } :
                        a
                }(),
                removeAttributes: function(a) { if (CKEDITOR.tools.isArray(a))
                        for (var b = 0; b < a.length; b++) this.removeAttribute(a[b]);
                    else
                        for (b in a) a.hasOwnProperty(b) && this.removeAttribute(b) },
                removeStyle: function(a) {
                    var b = this.$.style;
                    if (!b.removeProperty && (a == "border" || a == "margin" || a == "padding")) {
                        var c = ["top", "left", "right", "bottom"],
                            g;
                        a == "border" && (g = ["color", "style", "width"]);
                        for (var b = [], d = 0; d < c.length; d++)
                            if (g)
                                for (var e = 0; e < g.length; e++) b.push([a, c[d], g[e]].join("-"));
                            else b.push([a, c[d]].join("-"));
                        for (a =
                            0; a < b.length; a++) this.removeStyle(b[a])
                    } else { b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a));
                        this.$.style.cssText || this.removeAttribute("style") }
                },
                setStyle: function(a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this },
                setStyles: function(a) { for (var b in a) this.setStyle(b, a[b]); return this },
                setOpacity: function(a) {
                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                        a = Math.round(a * 100);
                        this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" +
                            a + ")")
                    } else this.setStyle("opacity", a)
                },
                unselectable: function() { this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), c = 0, g = b.count(); c < g; c++) { a = b.getItem(c);
                            a.setAttribute("unselectable", "on") } } },
                getPositionedAncestor: function() { for (var a = this; a.getName() != "html";) { if (a.getComputedStyle("position") != "static") return a;
                        a = a.getParent() } return null },
                getDocumentPosition: function(a) {
                    var b = 0,
                        c = 0,
                        g = this.getDocument(),
                        d = g.getBody(),
                        e = g.$.compatMode == "BackCompat";
                    if (document.documentElement.getBoundingClientRect) {
                        var i = this.$.getBoundingClientRect(),
                            o = g.$.documentElement,
                            j = o.clientTop || d.$.clientTop || 0,
                            l = o.clientLeft || d.$.clientLeft || 0,
                            s = true;
                        if (CKEDITOR.env.ie) { s = g.getDocumentElement().contains(this);
                            g = g.getBody().contains(this);
                            s = e && g || !e && s }
                        if (s) {
                            if (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version >= 12) { b = d.$.scrollLeft || o.scrollLeft;
                                c = d.$.scrollTop || o.scrollTop } else {
                                c = e ? d.$ :
                                    o;
                                b = c.scrollLeft;
                                c = c.scrollTop
                            }
                            b = i.left + b - l;
                            c = i.top + c - j
                        }
                    } else { j = this; for (l = null; j && !(j.getName() == "body" || j.getName() == "html");) { b = b + (j.$.offsetLeft - j.$.scrollLeft);
                            c = c + (j.$.offsetTop - j.$.scrollTop); if (!j.equals(this)) { b = b + (j.$.clientLeft || 0);
                                c = c + (j.$.clientTop || 0) } for (; l && !l.equals(j);) { b = b - l.$.scrollLeft;
                                c = c - l.$.scrollTop;
                                l = l.getParent() } l = j;
                            j = (i = j.$.offsetParent) ? new CKEDITOR.dom.element(i) : null } }
                    if (a) {
                        i = this.getWindow();
                        j = a.getWindow();
                        if (!i.equals(j) && i.$.frameElement) {
                            a = (new CKEDITOR.dom.element(i.$.frameElement)).getDocumentPosition(a);
                            b = b + a.x;
                            c = c + a.y
                        }
                    }
                    if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !e) { b = b + (this.$.clientLeft ? 1 : 0);
                        c = c + (this.$.clientTop ? 1 : 0) }
                    return { x: b, y: c }
                },
                scrollIntoView: function(a) {
                    var b = this.getParent();
                    if (b) {
                        do {
                            (b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1); if (b.is("html")) { var c = b.getWindow(); try { var g = c.$.frameElement;
                                    g && (b = new CKEDITOR.dom.element(g)) } catch (d) {} } } while (b = b.getParent())
                    }
                },
                scrollIntoParent: function(a, b, c) {
                    var g, d, e, i;

                    function o(b, g) { if (/body|html/.test(a.getName())) a.getWindow().$.scrollBy(b, g);
                        else { a.$.scrollLeft = a.$.scrollLeft + b;
                            a.$.scrollTop = a.$.scrollTop + g } }

                    function j(a, b) { var g = { x: 0, y: 0 }; if (!a.is(s ? "body" : "html")) { var c = a.$.getBoundingClientRect();
                            g.x = c.left;
                            g.y = c.top } c = a.getWindow(); if (!c.equals(b)) { c = j(CKEDITOR.dom.element.get(c.$.frameElement), b);
                            g.x = g.x + c.x;
                            g.y = g.y + c.y } return g }

                    function l(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 }!a &&
                        (a = this.getWindow());
                    e = a.getDocument();
                    var s = e.$.compatMode == "BackCompat";
                    a instanceof CKEDITOR.dom.window && (a = s ? e.getBody() : e.getDocumentElement());
                    e = a.getWindow();
                    d = j(this, e);
                    var t = j(a, e),
                        w = this.$.offsetHeight;
                    g = this.$.offsetWidth;
                    var v = a.$.clientHeight,
                        x = a.$.clientWidth;
                    e = d.x - l(this, "left") - t.x || 0;
                    i = d.y - l(this, "top") - t.y || 0;
                    g = d.x + g + l(this, "right") - (t.x + x) || 0;
                    d = d.y + w + l(this, "bottom") - (t.y + v) || 0;
                    if (i < 0 || d > 0) o(0, b === true ? i : b === false ? d : i < 0 ? i : d);
                    if (c && (e < 0 || g > 0)) o(e < 0 ? e : g, 0)
                },
                setState: function(a, b,
                    c) {
                    b = b || "cke";
                    switch (a) {
                        case CKEDITOR.TRISTATE_ON:
                            this.addClass(b + "_on");
                            this.removeClass(b + "_off");
                            this.removeClass(b + "_disabled");
                            c && this.setAttribute("aria-pressed", true);
                            c && this.removeAttribute("aria-disabled");
                            break;
                        case CKEDITOR.TRISTATE_DISABLED:
                            this.addClass(b + "_disabled");
                            this.removeClass(b + "_off");
                            this.removeClass(b + "_on");
                            c && this.setAttribute("aria-disabled", true);
                            c && this.removeAttribute("aria-pressed");
                            break;
                        default:
                            this.addClass(b + "_off");
                            this.removeClass(b + "_on");
                            this.removeClass(b +
                                "_disabled");
                            c && this.removeAttribute("aria-pressed");
                            c && this.removeAttribute("aria-disabled")
                    }
                },
                getFrameDocument: function() { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) },
                copyAttributes: function(a, b) {
                    for (var c = this.$.attributes, b = b || {}, g = 0; g < c.length; g++) {
                        var d = c[g],
                            e = d.nodeName.toLowerCase(),
                            i;
                        if (!(e in b))
                            if (e == "checked" && (i = this.getAttribute(e))) a.setAttribute(e, i);
                            else if (!CKEDITOR.env.ie || this.hasAttribute(e)) {
                            i = this.getAttribute(e);
                            if (i === null) i = d.nodeValue;
                            a.setAttribute(e, i)
                        }
                    }
                    if (this.$.style.cssText !== "") a.$.style.cssText = this.$.style.cssText
                },
                renameNode: function(a) { if (this.getName() != a) { var b = this.getDocument(),
                            a = new CKEDITOR.dom.element(a, b);
                        this.copyAttributes(a);
                        this.moveChildren(a);
                        this.getParent(true) && this.$.parentNode.replaceChild(a.$, this.$);
                        a.$["data-cke-expando"] = this.$["data-cke-expando"];
                        this.$ = a.$;
                        delete this.getName } },
                getChild: function() {
                    function a(b, c) { var g = b.childNodes; if (c >= 0 && c < g.length) return g[c] }
                    return function(b) {
                        var c =
                            this.$;
                        if (b.slice)
                            for (b = b.slice(); b.length > 0 && c;) c = a(c, b.shift());
                        else c = a(c, b);
                        return c ? new CKEDITOR.dom.node(c) : null
                    }
                }(),
                getChildCount: function() { return this.$.childNodes.length },
                disableContextMenu: function() { this.on("contextmenu", function(a) { a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault() }) },
                getDirection: function(a) {
                    return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" :
                        this.getStyle("direction") || this.getAttribute("dir")
                },
                data: function(a, b) { a = "data-" + a; if (b === void 0) return this.getAttribute(a);
                    b === false ? this.removeAttribute(a) : this.setAttribute(a, b); return null },
                getEditor: function() { var a = CKEDITOR.instances,
                        b, c; for (b in a) { c = a[b]; if (c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return c } return null },
                find: function(a) { var c = e(this),
                        a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this, a)));
                    c(); return a },
                findOne: function(a) {
                    var c = e(this),
                        a = this.$.querySelector(b(this, a));
                    c();
                    return a ? new CKEDITOR.dom.element(a) : null
                },
                forEach: function(a, b, c) { if (!c && (!b || this.type == b)) var g = a(this); if (g !== false)
                        for (var c = this.getChildren(), d = 0; d < c.count(); d++) { g = c.getItem(d);
                            g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : (!b || g.type == b) && a(g) } }
            });
            var j = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] };
            CKEDITOR.dom.element.prototype.setSize =
                function(a, b, d) { if (typeof b == "number") { if (d && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks)) b = b - c.call(this, a);
                        this.setStyle(a, b + "px") } };
            CKEDITOR.dom.element.prototype.getSize = function(a, b) { var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
                b && (d = d - c.call(this, a)); return d }
        }(), CKEDITOR.dom.documentFragment = function(a) { a = a || CKEDITOR.document;
            this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
            CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function(a) { a = a.$;
                    a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function() { var a = new CKEDITOR.dom.element("div");
                    this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") } }, !0, {
                append: 1,
                appendBogus: 1,
                clone: 1,
                getFirst: 1,
                getHtml: 1,
                getLast: 1,
                getParent: 1,
                getNext: 1,
                getPrevious: 1,
                appendTo: 1,
                moveChildren: 1,
                insertBefore: 1,
                insertAfterNode: 1,
                replace: 1,
                trim: 1,
                type: 1,
                ltrim: 1,
                rtrim: 1,
                getDocument: 1,
                getChildCount: 1,
                getChild: 1,
                getChildren: 1
            }),
        function() {
            function a(a, b) {
                var g = this.range;
                if (this._.end) return null;
                if (!this._.start) { this._.start = 1; if (g.collapsed) { this.end(); return null } g.optimize() }
                var c, d = g.startContainer;
                c = g.endContainer;
                var f = g.startOffset,
                    e = g.endOffset,
                    i, k = this.guard,
                    h = this.type,
                    j = a ? "getPreviousSourceNode" : "getNextSourceNode";
                if (!a && !this._.guardLTR) {
                    var u = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(),
                        r = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(e) : c.getNext();
                    this._.guardLTR = function(a,
                        b) { return (!b || !u.equals(a)) && (!r || !a.equals(r)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root)) }
                }
                if (a && !this._.guardRTL) { var y = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
                        z = d.type == CKEDITOR.NODE_ELEMENT ? f ? d.getChild(f - 1) : null : d.getPrevious();
                    this._.guardRTL = function(a, b) { return (!b || !y.equals(a)) && (!z || !a.equals(z)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root)) } }
                var B = a ? this._.guardRTL : this._.guardLTR;
                i = k ? function(a, b) { return B(a, b) === false ? false : k(a, b) } : B;
                if (this.current) c = this.current[j](false,
                    h, i);
                else { if (a) c.type == CKEDITOR.NODE_ELEMENT && (c = e > 0 ? c.getChild(e - 1) : i(c, true) === false ? null : c.getPreviousSourceNode(true, h, i));
                    else { c = d; if (c.type == CKEDITOR.NODE_ELEMENT && !(c = c.getChild(f))) c = i(d, true) === false ? null : d.getNextSourceNode(true, h, i) } c && i(c) === false && (c = null) }
                for (; c && !this._.end;) { this.current = c; if (!this.evaluator || this.evaluator(c) !== false) { if (!b) return c } else if (b && this.evaluator) return false;
                    c = c[j](false, h, i) } this.end();
                return this.current = null
            }

            function e(b) {
                for (var g, c = null; g = a.call(this,
                        b);) c = g;
                return c
            }
            CKEDITOR.dom.walker = CKEDITOR.tools.createClass({ $: function(a) { this.range = a;
                    this._ = {} }, proto: { end: function() { this._.end = 1 }, next: function() { return a.call(this) }, previous: function() { return a.call(this, 1) }, checkForward: function() { return a.call(this, 0, 1) !== false }, checkBackward: function() { return a.call(this, 1, 1) !== false }, lastForward: function() { return e.call(this) }, lastBackward: function() { return e.call(this, 1) }, reset: function() { delete this.current;
                        this._ = {} } } });
            var b = {
                    block: 1,
                    "list-item": 1,
                    table: 1,
                    "table-row-group": 1,
                    "table-header-group": 1,
                    "table-footer-group": 1,
                    "table-row": 1,
                    "table-column-group": 1,
                    "table-column": 1,
                    "table-cell": 1,
                    "table-caption": 1
                },
                c = { absolute: 1, fixed: 1 };
            CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) { return this.getComputedStyle("float") == "none" && !(this.getComputedStyle("position") in c) && b[this.getComputedStyle("display")] ? true : !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) };
            CKEDITOR.dom.walker.blockBoundary = function(a) {
                return function(b) {
                    return !(b.type ==
                        CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
                }
            };
            CKEDITOR.dom.walker.listItemBoundary = function() { return this.blockBoundary({ br: 1 }) };
            CKEDITOR.dom.walker.bookmark = function(a, b) {
                function g(a) { return a && a.getName && a.getName() == "span" && a.data("cke-bookmark") } return function(c) { var d, f;
                    d = c && c.type != CKEDITOR.NODE_ELEMENT && (f = c.getParent()) && g(f);
                    d = a ? d : d || g(c); return !!(b ^ d) } };
            CKEDITOR.dom.walker.whitespaces = function(a) {
                return function(b) {
                    var g;
                    b && b.type == CKEDITOR.NODE_TEXT && (g = !CKEDITOR.tools.trim(b.getText()) ||
                        CKEDITOR.env.webkit && b.getText() == "​");
                    return !!(a ^ g)
                }
            };
            CKEDITOR.dom.walker.invisible = function(a) { var b = CKEDITOR.dom.walker.whitespaces(),
                    g = CKEDITOR.env.webkit ? 1 : 0; return function(c) { if (b(c)) c = 1;
                    else { c.type == CKEDITOR.NODE_TEXT && (c = c.getParent());
                        c = c.$.offsetWidth <= g } return !!(a ^ c) } };
            CKEDITOR.dom.walker.nodeType = function(a, b) { return function(g) { return !!(b ^ g.type == a) } };
            CKEDITOR.dom.walker.bogus = function(a) {
                function b(a) { return !i(a) && !j(a) }
                return function(g) {
                    var c = CKEDITOR.env.needsBrFiller ? g.is && g.is("br") :
                        g.getText && d.test(g.getText());
                    if (c) { c = g.getParent();
                        g = g.getNext(b);
                        c = c.isBlockBoundary() && (!g || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) }
                    return !!(a ^ c)
                }
            };
            CKEDITOR.dom.walker.temp = function(a) { return function(b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                    b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b) } };
            var d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                i = CKEDITOR.dom.walker.whitespaces(),
                j = CKEDITOR.dom.walker.bookmark(),
                f = CKEDITOR.dom.walker.temp();
            CKEDITOR.dom.walker.ignored = function(a) {
                return function(b) {
                    b =
                        i(b) || j(b) || f(b);
                    return !!(a ^ b)
                }
            };
            var h = CKEDITOR.dom.walker.ignored();
            CKEDITOR.dom.walker.empty = function(a) { return function(b) { for (var g = 0, c = b.getChildCount(); g < c; ++g)
                        if (!h(b.getChild(g))) return !!a; return !a } };
            var k = CKEDITOR.dom.walker.empty(),
                g = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(a) { var b = {},
                        g; for (g in a) CKEDITOR.dtd[g]["#"] && (b[g] = 1); return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 });
            CKEDITOR.dom.walker.editable = function(a) {
                return function(b) {
                    return !!(a ^
                        (h(b) ? 0 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || (b.is("hr") || b.getAttribute("contenteditable") == "false") || !CKEDITOR.env.needsBrFiller && b.is(g) && k(b)) ? 1 : 0))
                }
            };
            CKEDITOR.dom.element.prototype.getBogus = function() { var a = this;
                do a = a.getPreviousSourceNode(); while (j(a) || i(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && d.test(a.getText())) ? a : false }
        }(),
        CKEDITOR.dom.range = function(a) { this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
            this.collapsed = true; var e = a instanceof CKEDITOR.dom.document;
            this.document = e ? a : a.getDocument();
            this.root = e ? a.getBody() : a },
        function() {
            function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset }

            function e(a, b, c, d, f) {
                function e(a, b, g, c) {
                    var d = g ? a.getPrevious() : a.getNext();
                    if (c && h) return d;
                    if (v || c) b.append(a.clone(true, f), g);
                    else {
                        a.remove();
                        j && b.append(a)
                    }
                    return d
                }

                function i() { var a, b, g, c = Math.min(E.length, H.length); for (a = 0; a < c; a++) { b = E[a];
                        g = H[a]; if (!b.equals(g)) return a } return a - 1 }

                function k() {
                    var b = L - 1,
                        c = A && D && !x.equals(u);
                    if (b < J - 1 || b < P - 1 || c) {
                        c ? a.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START) : P == b + 1 && B ? a.moveToPosition(H[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(H[b + 1], CKEDITOR.POSITION_BEFORE_START);
                        if (d)
                            if ((b = E[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT) {
                                c = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>',
                                    a.document);
                                c.insertAfter(b);
                                b.mergeSiblings(false);
                                a.moveToBookmark({ startNode: c })
                            }
                    } else a.collapse(true)
                }
                a.optimizeBookmark();
                var h = b === 0,
                    j = b == 1,
                    v = b == 2,
                    b = v || j,
                    x = a.startContainer,
                    u = a.endContainer,
                    r = a.startOffset,
                    y = a.endOffset,
                    z, B, A, D, C, G;
                if (v && u.type == CKEDITOR.NODE_TEXT && x.equals(u)) { x = a.document.createText(x.substring(r, y));
                    c.append(x) } else {
                    if (u.type == CKEDITOR.NODE_TEXT) v ? G = true : u = u.split(y);
                    else if (u.getChildCount() > 0)
                        if (y >= u.getChildCount()) { u = u.getChild(y - 1);
                            B = true } else u = u.getChild(y);
                    else D =
                        B = true;
                    if (x.type == CKEDITOR.NODE_TEXT) v ? C = true : x.split(r);
                    else if (x.getChildCount() > 0)
                        if (r === 0) { x = x.getChild(r);
                            z = true } else x = x.getChild(r - 1);
                    else A = z = true;
                    for (var E = x.getParents(), H = u.getParents(), L = i(), J = E.length - 1, P = H.length - 1, I = c, R, T, X, ca = -1, S = L; S <= J; S++) { T = E[S];
                        X = T.getNext(); for (S == J && !(T.equals(H[S]) && J < P) ? z ? e(T, I, false, A) : C && I.append(a.document.createText(T.substring(r))) : b && (R = I.append(T.clone(0, f))); X;) { if (X.equals(H[S])) { ca = S; break } X = e(X, I) } I = R } I = c;
                    for (S = L; S <= P; S++) {
                        c = H[S];
                        X = c.getPrevious();
                        if (c.equals(E[S])) b && (I = I.getChild(0));
                        else { S == P && !(c.equals(E[S]) && P < J) ? B ? e(c, I, false, D) : G && I.append(a.document.createText(c.substring(0, y))) : b && (R = I.append(c.clone(0, f))); if (S > ca)
                                for (; X;) X = e(X, I, true);
                            I = R }
                    }
                    v || k()
                }
            }

            function b() {
                var a = false,
                    b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(true),
                    d = CKEDITOR.dom.walker.bogus();
                return function(f) {
                    if (c(f) || b(f)) return true;
                    if (d(f) && !a) return a = true;
                    return f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) ||
                        f.type == CKEDITOR.NODE_ELEMENT && !f.is(i) ? false : true
                }
            }

            function c(a) { var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(1); return function(d) { return c(d) || b(d) ? true : !a && j(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) } }

            function d(a) { return function() { var b; return this[a ? "getPreviousNode" : "getNextNode"](function(a) {!b && k(a) && (b = a); return h(a) && !(j(a) && a.equals(b)) }) } }
            var i = {
                    abbr: 1,
                    acronym: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    "var": 1
                },
                j = CKEDITOR.dom.walker.bogus(),
                f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                h = CKEDITOR.dom.walker.editable(),
                k = CKEDITOR.dom.walker.ignored(true);
            CKEDITOR.dom.range.prototype = {
                clone: function() { var a = new CKEDITOR.dom.range(this.root);
                    a._setStartContainer(this.startContainer);
                    a.startOffset = this.startOffset;
                    a._setEndContainer(this.endContainer);
                    a.endOffset = this.endOffset;
                    a.collapsed = this.collapsed; return a },
                collapse: function(a) {
                    if (a) {
                        this._setEndContainer(this.startContainer);
                        this.endOffset = this.startOffset
                    } else { this._setStartContainer(this.endContainer);
                        this.startOffset = this.endOffset } this.collapsed = true
                },
                cloneContents: function(a) { var b = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || e(this, 2, b, false, typeof a == "undefined" ? true : a); return b },
                deleteContents: function(a) { this.collapsed || e(this, 0, null, a) },
                extractContents: function(a, b) { var c = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || e(this, 1, c, a, typeof b == "undefined" ? true : b); return c },
                createBookmark: function(a) {
                    var b, c, d, f, e = this.collapsed;
                    b = this.document.createElement("span");
                    b.data("cke-bookmark", 1);
                    b.setStyle("display", "none");
                    b.setHtml("&nbsp;");
                    if (a) { d = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                        b.setAttribute("id", d + (e ? "C" : "S")) }
                    if (!e) { c = b.clone();
                        c.setHtml("&nbsp;");
                        a && c.setAttribute("id", d + "E");
                        f = this.clone();
                        f.collapse();
                        f.insertNode(c) } f = this.clone();
                    f.collapse(true);
                    f.insertNode(b);
                    if (c) { this.setStartAfter(b);
                        this.setEndBefore(c) } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                    return { startNode: a ? d + (e ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: e }
                },
                createBookmark2: function() {
                    function a(g) {
                        var c = g.container,
                            d = g.offset,
                            f;
                        f = c;
                        var e = d;
                        f = f.type != CKEDITOR.NODE_ELEMENT || e === 0 || e == f.getChildCount() ? 0 : f.getChild(e - 1).type == CKEDITOR.NODE_TEXT && f.getChild(e).type == CKEDITOR.NODE_TEXT;
                        if (f) { c = c.getChild(d - 1);
                            d = c.getLength() } c.type == CKEDITOR.NODE_ELEMENT && d > 1 && (d = c.getChild(d - 1).getIndex(true) + 1);
                        if (c.type == CKEDITOR.NODE_TEXT) {
                            f = c;
                            for (e = 0;
                                (f = f.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;) e =
                                e + f.getLength();
                            f = e;
                            if (c.getText()) d = d + f;
                            else { e = c.getPrevious(b); if (f) { d = f;
                                    c = e ? e.getNext() : c.getParent().getFirst() } else { c = c.getParent();
                                    d = e ? e.getIndex(true) + 1 : 0 } }
                        }
                        g.container = c;
                        g.offset = d
                    }
                    var b = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, true);
                    return function(b) {
                        var c = this.collapsed,
                            d = { container: this.startContainer, offset: this.startOffset },
                            f = { container: this.endContainer, offset: this.endOffset };
                        if (b) { a(d);
                            c || a(f) }
                        return {
                            start: d.container.getAddress(b),
                            end: c ? null : f.container.getAddress(b),
                            startOffset: d.offset,
                            endOffset: f.offset,
                            normalized: b,
                            collapsed: c,
                            is2: true
                        }
                    }
                }(),
                moveToBookmark: function(a) { if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized),
                            c = a.startOffset,
                            d = a.end && this.document.getByAddress(a.end, a.normalized),
                            a = a.endOffset;
                        this.setStart(b, c);
                        d ? this.setEnd(d, a) : this.collapse(true) } else { b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode;
                        a = c ? this.document.getById(a.endNode) : a.endNode;
                        this.setStartBefore(b);
                        b.remove(); if (a) { this.setEndBefore(a);
                            a.remove() } else this.collapse(true) } },
                getBoundaryNodes: function() {
                    var a = this.startContainer,
                        b = this.endContainer,
                        c = this.startOffset,
                        d = this.endOffset,
                        f;
                    if (a.type == CKEDITOR.NODE_ELEMENT) { f = a.getChildCount(); if (f > c) a = a.getChild(c);
                        else if (f < 1) a = a.getPreviousSourceNode();
                        else { for (a = a.$; a.lastChild;) a = a.lastChild;
                            a = new CKEDITOR.dom.node(a);
                            a = a.getNextSourceNode() || a } }
                    if (b.type == CKEDITOR.NODE_ELEMENT) {
                        f = b.getChildCount();
                        if (f > d) b = b.getChild(d).getPreviousSourceNode(true);
                        else if (f < 1) b = b.getPreviousSourceNode();
                        else {
                            for (b = b.$; b.lastChild;) b =
                                b.lastChild;
                            b = new CKEDITOR.dom.node(b)
                        }
                    }
                    a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                    return { startNode: a, endNode: b }
                },
                getCommonAncestor: function(a, b) { var c = this.startContainer,
                        d = this.endContainer,
                        c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d); return b && !c.is ? c.getParent() : c },
                optimize: function() {
                    var a = this.startContainer,
                        b = this.startOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) :
                        this.setStartBefore(a));
                    a = this.endContainer;
                    b = this.endOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
                },
                optimizeBookmark: function() { var a = this.startContainer,
                        b = this.endContainer;
                    a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                    b && (b.is && b.is("span") && b.data("cke-bookmark")) && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) },
                trim: function(a, b) {
                    var c = this.startContainer,
                        d = this.startOffset,
                        f = this.collapsed;
                    if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) { if (d)
                            if (d >= c.getLength()) { d = c.getIndex() + 1;
                                c = c.getParent() } else { var e = c.split(d),
                                    d = c.getIndex() + 1,
                                    c = c.getParent(); if (this.startContainer.equals(this.endContainer)) this.setEnd(e, this.endOffset - this.startOffset);
                                else if (c.equals(this.endContainer)) this.endOffset = this.endOffset + 1 } else { d = c.getIndex();
                            c = c.getParent() } this.setStart(c, d); if (f) { this.collapse(true); return } } c = this.endContainer;
                    d = this.endOffset;
                    if (!b && !f && c && c.type == CKEDITOR.NODE_TEXT) {
                        if (d) {
                            d >= c.getLength() ||
                                c.split(d);
                            d = c.getIndex() + 1
                        } else d = c.getIndex();
                        c = c.getParent();
                        this.setEnd(c, d)
                    }
                },
                enlarge: function(a, b) {
                    function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a }
                    var d = RegExp(/[^\s\ufeff]/);
                    switch (a) {
                        case CKEDITOR.ENLARGE_INLINE:
                            var f = 1;
                        case CKEDITOR.ENLARGE_ELEMENT:
                            if (this.collapsed) break;
                            var e = this.getCommonAncestor(),
                                i = this.root,
                                k, h, j, v, x, u = false,
                                r, y;
                            r = this.startContainer;
                            var z = this.startOffset;
                            if (r.type == CKEDITOR.NODE_TEXT) {
                                if (z) {
                                    r = !CKEDITOR.tools.trim(r.substring(0,
                                        z)).length && r;
                                    u = !!r
                                }
                                if (r && !(v = r.getPrevious())) j = r.getParent()
                            } else { z && (v = r.getChild(z - 1) || r.getLast());
                                v || (j = r) }
                            for (j = c(j); j || v;) {
                                if (j && !v) {!x && j.equals(e) && (x = true); if (f ? j.isBlockBoundary() : !i.contains(j)) break; if (!u || j.getComputedStyle("display") != "inline") { u = false;
                                        x ? k = j : this.setStartBefore(j) } v = j.getPrevious() }
                                for (; v;) {
                                    r = false;
                                    if (v.type == CKEDITOR.NODE_COMMENT) v = v.getPrevious();
                                    else {
                                        if (v.type == CKEDITOR.NODE_TEXT) { y = v.getText();
                                            d.test(y) && (v = null);
                                            r = /[\s\ufeff]$/.test(y) } else if ((v.$.offsetWidth >
                                                (CKEDITOR.env.webkit ? 1 : 0) || b && v.is("br")) && !v.data("cke-bookmark"))
                                            if (u && CKEDITOR.dtd.$removeEmpty[v.getName()]) { y = v.getText(); if (d.test(y)) v = null;
                                                else
                                                    for (var z = v.$.getElementsByTagName("*"), B = 0, A; A = z[B++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[A.nodeName.toLowerCase()]) { v = null; break }
                                                v && (r = !!y.length) } else v = null;
                                        r && (u ? x ? k = j : j && this.setStartBefore(j) : u = true);
                                        if (v) { r = v.getPrevious(); if (!j && !r) { j = v;
                                                v = null; break } v = r } else j = null
                                    }
                                }
                                j && (j = c(j.getParent()))
                            }
                            r = this.endContainer;
                            z = this.endOffset;
                            j = v = null;
                            x = u = false;
                            var D = function(a, b) { var c = new CKEDITOR.dom.range(i);
                                c.setStart(a, b);
                                c.setEndAt(i, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c),
                                    g; for (c.guard = function(a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; g = c.next();) { if (g.type != CKEDITOR.NODE_TEXT) return false;
                                    y = g != a ? g.getText() : g.substring(b); if (d.test(y)) return false } return true };
                            if (r.type == CKEDITOR.NODE_TEXT)
                                if (CKEDITOR.tools.trim(r.substring(z)).length) u = true;
                                else {
                                    u = !r.getLength();
                                    if (z == r.getLength()) {
                                        if (!(v = r.getNext())) j =
                                            r.getParent()
                                    } else D(r, z) && (j = r.getParent())
                                }
                            else(v = r.getChild(z)) || (j = r);
                            for (; j || v;) {
                                if (j && !v) {!x && j.equals(e) && (x = true); if (f ? j.isBlockBoundary() : !i.contains(j)) break; if (!u || j.getComputedStyle("display") != "inline") { u = false;
                                        x ? h = j : j && this.setEndAfter(j) } v = j.getNext() }
                                for (; v;) {
                                    r = false;
                                    if (v.type == CKEDITOR.NODE_TEXT) { y = v.getText();
                                        D(v, 0) || (v = null);
                                        r = /^[\s\ufeff]/.test(y) } else if (v.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((v.$.offsetWidth > 0 || b && v.is("br")) && !v.data("cke-bookmark"))
                                            if (u && CKEDITOR.dtd.$removeEmpty[v.getName()]) {
                                                y =
                                                    v.getText();
                                                if (d.test(y)) v = null;
                                                else { z = v.$.getElementsByTagName("*"); for (B = 0; A = z[B++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[A.nodeName.toLowerCase()]) { v = null; break } } v && (r = !!y.length)
                                            } else v = null
                                    } else r = 1;
                                    r && u && (x ? h = j : this.setEndAfter(j));
                                    if (v) { r = v.getNext(); if (!j && !r) { j = v;
                                            v = null; break } v = r } else j = null
                                }
                                j && (j = c(j.getParent()))
                            }
                            if (k && h) { e = k.contains(h) ? h : k;
                                this.setStartBefore(e);
                                this.setEndAfter(e) }
                            break;
                        case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                        case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                            j = new CKEDITOR.dom.range(this.root);
                            i = this.root;
                            j.setStartAt(i, CKEDITOR.POSITION_AFTER_START);
                            j.setEnd(this.startContainer, this.startOffset);
                            j = new CKEDITOR.dom.walker(j);
                            var C, G, E = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null),
                                H = null,
                                L = function(a) { if (a.type == CKEDITOR.NODE_ELEMENT && a.getAttribute("contenteditable") == "false")
                                        if (H) { if (H.equals(a)) { H = null; return } } else H = a;
                                    else if (H) return; var b = E(a);
                                    b || (C = a); return b },
                                f = function(a) { var b = L(a);!b && (a.is && a.is("br")) && (G = a); return b };
                            j.guard = L;
                            j = j.lastBackward();
                            C = C || i;
                            this.setStartAt(C, !C.is("br") && (!j && this.checkStartOfBlock() || j && C.contains(j)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                            if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { j = this.clone();
                                j = new CKEDITOR.dom.walker(j); var J = CKEDITOR.dom.walker.whitespaces(),
                                    P = CKEDITOR.dom.walker.bookmark();
                                j.evaluator = function(a) { return !J(a) && !P(a) }; if ((j = j.previous()) && j.type == CKEDITOR.NODE_ELEMENT && j.is("br")) break } j = this.clone();
                            j.collapse();
                            j.setEndAt(i, CKEDITOR.POSITION_BEFORE_END);
                            j = new CKEDITOR.dom.walker(j);
                            j.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : L;
                            C = H = G = null;
                            j = j.lastForward();
                            C = C || i;
                            this.setEndAt(C, !j && this.checkEndOfBlock() || j && C.contains(j) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                            G && this.setEndAfter(G)
                    }
                },
                shrink: function(a, b, c) {
                    if (!this.collapsed) {
                        var a = a || CKEDITOR.SHRINK_TEXT,
                            d = this.clone(),
                            f = this.startContainer,
                            e = this.endContainer,
                            i = this.startOffset,
                            k = this.endOffset,
                            h = 1,
                            j = 1;
                        if (f && f.type == CKEDITOR.NODE_TEXT)
                            if (i)
                                if (i >= f.getLength()) d.setStartAfter(f);
                                else {
                                    d.setStartBefore(f);
                                    h = 0
                                }
                        else d.setStartBefore(f);
                        if (e && e.type == CKEDITOR.NODE_TEXT)
                            if (k)
                                if (k >= e.getLength()) d.setEndAfter(e);
                                else { d.setEndAfter(e);
                                    j = 0 }
                        else d.setEndBefore(e);
                        var d = new CKEDITOR.dom.walker(d),
                            v = CKEDITOR.dom.walker.bookmark();
                        d.evaluator = function(b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) };
                        var x;
                        d.guard = function(b, d) {
                            if (v(b)) return true;
                            if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(x) || c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() ||
                                b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return false;
                            !d && b.type == CKEDITOR.NODE_ELEMENT && (x = b);
                            return true
                        };
                        if (h)(f = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(f, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                        if (j) { d.reset();
                            (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END) }
                        return !(!h && !j)
                    }
                },
                insertNode: function(a) {
                    this.optimizeBookmark();
                    this.trim(false,
                        true);
                    var b = this.startContainer,
                        c = b.getChild(this.startOffset);
                    c ? a.insertBefore(c) : b.append(a);
                    a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                    this.setStartBefore(a)
                },
                moveToPosition: function(a, b) { this.setStartAt(a, b);
                    this.collapse(true) },
                moveToRange: function(a) { this.setStart(a.startContainer, a.startOffset);
                    this.setEnd(a.endContainer, a.endOffset) },
                selectNodeContents: function(a) { this.setStart(a, 0);
                    this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount()) },
                setStart: function(b,
                    c) { if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) { c = b.getIndex();
                        b = b.getParent() } this._setStartContainer(b);
                    this.startOffset = c; if (!this.endContainer) { this._setEndContainer(b);
                        this.endOffset = c } a(this) },
                setEnd: function(b, c) { if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) { c = b.getIndex() + 1;
                        b = b.getParent() } this._setEndContainer(b);
                    this.endOffset = c; if (!this.startContainer) { this._setStartContainer(b);
                        this.startOffset = c } a(this) },
                setStartAfter: function(a) {
                    this.setStart(a.getParent(),
                        a.getIndex() + 1)
                },
                setStartBefore: function(a) { this.setStart(a.getParent(), a.getIndex()) },
                setEndAfter: function(a) { this.setEnd(a.getParent(), a.getIndex() + 1) },
                setEndBefore: function(a) { this.setEnd(a.getParent(), a.getIndex()) },
                setStartAt: function(b, c) {
                    switch (c) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setStart(b, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setStartBefore(b);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setStartAfter(b)
                    }
                    a(this)
                },
                setEndAt: function(b, c) { switch (c) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setEnd(b, 0); break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setEndBefore(b); break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setEndAfter(b) } a(this) },
                fixBlock: function(a, b) {
                    var c = this.createBookmark(),
                        d = this.document.createElement(b);
                    this.collapse(a);
                    this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    this.extractContents().appendTo(d);
                    d.trim();
                    this.insertNode(d);
                    var f = d.getBogus();
                    f && f.remove();
                    d.appendBogus();
                    this.moveToBookmark(c);
                    return d
                },
                splitBlock: function(a, b) {
                    var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                        d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                        f = c.block,
                        e = d.block,
                        i = null;
                    if (!c.blockLimit.equals(d.blockLimit)) return null;
                    if (a != "br") {
                        if (!f) {
                            f = this.fixBlock(true, a);
                            e = (new CKEDITOR.dom.elementPath(this.endContainer,
                                this.root)).block
                        }
                        e || (e = this.fixBlock(false, a))
                    }
                    c = f && this.checkStartOfBlock();
                    d = e && this.checkEndOfBlock();
                    this.deleteContents();
                    if (f && f.equals(e))
                        if (d) { i = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                            this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END);
                            e = null } else if (c) { i = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                        this.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
                        f = null } else { e = this.splitElement(f, b || false);
                        f.is("ul", "ol") || f.appendBogus() }
                    return {
                        previousBlock: f,
                        nextBlock: e,
                        wasStartOfBlock: c,
                        wasEndOfBlock: d,
                        elementPath: i
                    }
                },
                splitElement: function(a, b) { if (!this.collapsed) return null;
                    this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var c = this.extractContents(false, b || false),
                        d = a.clone(false, b || false);
                    c.appendTo(d);
                    d.insertAfter(a);
                    this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return d },
                removeEmptyBlocksAtEnd: function() {
                    function a(g) { return function(a) { return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || g.is("table") && a.is("caption") ? false : true } }
                    var b = CKEDITOR.dom.walker.whitespaces(),
                        c = CKEDITOR.dom.walker.bookmark(false);
                    return function(b) { for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, e; f && !f.equals(d.root) && !f.getFirst(a(f));) { e = f.getParent();
                            this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END);
                            f.remove(1);
                            f = e } this.moveToBookmark(c) }
                }(),
                startPath: function() { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) },
                endPath: function() {
                    return new CKEDITOR.dom.elementPath(this.endContainer,
                        this.root)
                },
                checkBoundaryOfElement: function(a, b) { var d = b == CKEDITOR.START,
                        f = this.clone();
                    f.collapse(d);
                    f[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                    f = new CKEDITOR.dom.walker(f);
                    f.evaluator = c(d); return f[d ? "checkBackward" : "checkForward"]() },
                checkStartOfBlock: function() {
                    var a = this.startContainer,
                        c = this.startOffset;
                    if (CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT) { a = CKEDITOR.tools.ltrim(a.substring(0, c));
                        f.test(a) && this.trim(0, 1) } this.trim();
                    a = new CKEDITOR.dom.elementPath(this.startContainer,
                        this.root);
                    c = this.clone();
                    c.collapse(true);
                    c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                    a = new CKEDITOR.dom.walker(c);
                    a.evaluator = b();
                    return a.checkBackward()
                },
                checkEndOfBlock: function() {
                    var a = this.endContainer,
                        c = this.endOffset;
                    if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) { a = CKEDITOR.tools.rtrim(a.substring(c));
                        f.test(a) && this.trim(1, 0) } this.trim();
                    a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                    c = this.clone();
                    c.collapse(false);
                    c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                    a = new CKEDITOR.dom.walker(c);
                    a.evaluator = b();
                    return a.checkForward()
                },
                getPreviousNode: function(a, b, c) { var d = this.clone();
                    d.collapse(1);
                    d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                    c = new CKEDITOR.dom.walker(d);
                    c.evaluator = a;
                    c.guard = b; return c.previous() },
                getNextNode: function(a, b, c) { var d = this.clone();
                    d.collapse();
                    d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                    c = new CKEDITOR.dom.walker(d);
                    c.evaluator = a;
                    c.guard = b; return c.next() },
                checkReadOnly: function() {
                    function a(b, c) {
                        for (; b;) {
                            if (b.type ==
                                CKEDITOR.NODE_ELEMENT) { if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable")) return 0; if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                        }
                        return 1
                    }
                    return function() { var b = this.startContainer,
                            c = this.endContainer; return !(a(b, c) && a(c, b)) }
                }(),
                moveToElementEditablePosition: function(a, b) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(false)) { this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); return true }
                    for (var c =
                            0; a;) {
                        if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && f.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                            c = 1; break }
                        if (a.type == CKEDITOR.NODE_ELEMENT)
                            if (a.isEditable()) { this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                                c = 1 } else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                        else if (a.getAttribute("contenteditable") == "false" && a.is(CKEDITOR.dtd.$block)) { this.setStartBefore(a);
                            this.setEndAfter(a); return true }
                        var d = a,
                            e = c,
                            i = void 0;
                        d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(false) && (i = d[b ? "getLast" : "getFirst"](k));
                        !e && !i && (i = d[b ? "getPrevious" : "getNext"](k));
                        a = i
                    }
                    return !!c
                },
                moveToClosestEditablePosition: function(a, b) {
                    var c, d = 0,
                        f, e, i = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                    if (a) { c = new CKEDITOR.dom.range(this.root);
                        c.moveToPosition(a, i[b ? 0 : 1]) } else c = this.clone();
                    if (a && !a.is(CKEDITOR.dtd.$block)) d = 1;
                    else if (f = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) { d = 1; if ((e = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && f.getAttribute("contenteditable") == "false") { c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START);
                            c.setEndAt(f, CKEDITOR.POSITION_AFTER_END) } else if (!CKEDITOR.env.needsBrFiller && e && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers)) { c.setEnd(f, 0);
                            c.collapse() } else c.moveToPosition(f, i[b ? 1 : 0]) } d && this.moveToRange(c);
                    return !!d
                },
                moveToElementEditStart: function(a) { return this.moveToElementEditablePosition(a) },
                moveToElementEditEnd: function(a) { return this.moveToElementEditablePosition(a, true) },
                getEnclosedNode: function() { var a = this.clone();
                    a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a),
                        b = CKEDITOR.dom.walker.bookmark(false, true),
                        c = CKEDITOR.dom.walker.whitespaces(true);
                    a.evaluator = function(a) { return c(a) && b(a) }; var d = a.next();
                    a.reset(); return d && d.equals(a.previous()) ? d : null },
                getTouchedStartNode: function() {
                    var a =
                        this.startContainer;
                    return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
                },
                getTouchedEndNode: function() { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a },
                getNextEditableNode: d(),
                getPreviousEditableNode: d(1),
                scrollIntoView: function() {
                    var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document),
                        b, c, d, f = this.clone();
                    f.optimize();
                    if (d = f.startContainer.type == CKEDITOR.NODE_TEXT) {
                        c = f.startContainer.getText();
                        b = f.startContainer.split(f.startOffset);
                        a.insertAfter(f.startContainer)
                    } else f.insertNode(a);
                    a.scrollIntoView();
                    if (d) { f.startContainer.setText(c);
                        b.remove() } a.remove()
                },
                _setStartContainer: function(a) { this.startContainer = a },
                _setEndContainer: function(a) { this.endContainer = a }
            }
        }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3,
        CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict",
        function() {
            function a(a) { if (!(arguments.length < 1)) { this.range = a;
                    this.forceBrBreak = 0;
                    this.enlargeBr = 1;
                    this.enforceRealBlocks = 0;
                    this._ || (this._ = {}) } }

            function e(a) { var b = [];
                a.forEach(function(a) { if (a.getAttribute("contenteditable") == "true") { b.push(a); return false } }, CKEDITOR.NODE_ELEMENT, true); return b }

            function b(a, c, d, f) {
                a: {
                    f == null && (f = e(d));
                    for (var i; i = f.shift();)
                        if (i.getDtd().p) {
                            f = { element: i, remaining: f };
                            break a
                        }
                    f = null
                }
                if (!f) return 0;
                if ((i = CKEDITOR.filter.instances[f.element.data("cke-filter")]) && !i.check(c)) return b(a, c, d, f.remaining);c = new CKEDITOR.dom.range(f.element);c.selectNodeContents(f.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = i;a._.nestedEditable = { element: f.element, container: d, remaining: f.remaining, iterator: c };
                return 1
            }

            function c(a, b, c) {
                if (!b) return false;
                a = a.clone();
                a.collapse(!c);
                return a.checkBoundaryOfElement(b,
                    c ? CKEDITOR.START : CKEDITOR.END)
            }
            var d = /^[\r\n\t ]+$/,
                i = CKEDITOR.dom.walker.bookmark(false, true),
                j = CKEDITOR.dom.walker.whitespaces(true),
                f = function(a) { return i(a) && j(a) },
                h = { dd: 1, dt: 1, li: 1 };
            a.prototype = {
                getNextParagraph: function(a) {
                    var g, e, j, q, o, a = a || "p";
                    if (this._.nestedEditable) {
                        if (g = this._.nestedEditable.iterator.getNextParagraph(a)) { this.activeFilter = this._.nestedEditable.iterator.activeFilter; return g } this.activeFilter = this.filter;
                        if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) {
                            this.activeFilter =
                                this._.nestedEditable.iterator.activeFilter;
                            return this._.nestedEditable.iterator.getNextParagraph(a)
                        }
                        this._.nestedEditable = null
                    }
                    if (!this.range.root.getDtd()[a]) return null;
                    if (!this._.started) {
                        var n = this.range.clone();
                        e = n.startPath();
                        var l = n.endPath(),
                            s = !n.collapsed && c(n, e.block),
                            t = !n.collapsed && c(n, l.block, 1);
                        n.shrink(CKEDITOR.SHRINK_ELEMENT, true);
                        s && n.setStartAt(e.block, CKEDITOR.POSITION_BEFORE_END);
                        t && n.setEndAt(l.block, CKEDITOR.POSITION_AFTER_START);
                        e = n.endContainer.hasAscendant("pre", true) ||
                            n.startContainer.hasAscendant("pre", true);
                        n.enlarge(this.forceBrBreak && !e || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        if (!n.collapsed) {
                            e = new CKEDITOR.dom.walker(n.clone());
                            l = CKEDITOR.dom.walker.bookmark(true, true);
                            e.evaluator = l;
                            this._.nextNode = e.next();
                            e = new CKEDITOR.dom.walker(n.clone());
                            e.evaluator = l;
                            e = e.previous();
                            this._.lastNode = e.getNextSourceNode(true, null, n.root);
                            if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) &&
                                this._.lastNode.getParent().isBlockBoundary()) { l = this.range.clone();
                                l.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END); if (l.checkEndOfBlock()) { l = new CKEDITOR.dom.elementPath(l.endContainer, l.root);
                                    this._.lastNode = (l.block || l.blockLimit).getNextSourceNode(true) } }
                            if (!this._.lastNode || !n.root.contains(this._.lastNode)) { this._.lastNode = this._.docEndMarker = n.document.createText("");
                                this._.lastNode.insertAfter(e) } n = null
                        }
                        this._.started = 1;
                        e = n
                    }
                    l = this._.nextNode;
                    n = this._.lastNode;
                    for (this._.nextNode =
                        null; l;) {
                        var s = 0,
                            t = l.hasAscendant("pre"),
                            w = l.type != CKEDITOR.NODE_ELEMENT,
                            v = 0;
                        if (w) l.type == CKEDITOR.NODE_TEXT && d.test(l.getText()) && (w = 0);
                        else {
                            var x = l.getName();
                            if (CKEDITOR.dtd.$block[x] && l.getAttribute("contenteditable") == "false") { g = l;
                                b(this, a, g); break } else if (l.isBlockBoundary(this.forceBrBreak && !t && { br: 1 })) { if (x == "br") w = 1;
                                else if (!e && !l.getChildCount() && x != "hr") { g = l;
                                    j = l.equals(n); break } if (e) { e.setEndAt(l, CKEDITOR.POSITION_BEFORE_START); if (x != "br") this._.nextNode = l } s = 1 } else {
                                if (l.getFirst()) {
                                    if (!e) {
                                        e =
                                            this.range.clone();
                                        e.setStartAt(l, CKEDITOR.POSITION_BEFORE_START)
                                    }
                                    l = l.getFirst();
                                    continue
                                }
                                w = 1
                            }
                        }
                        if (w && !e) { e = this.range.clone();
                            e.setStartAt(l, CKEDITOR.POSITION_BEFORE_START) } j = (!s || w) && l.equals(n);
                        if (e && !s)
                            for (; !l.getNext(f) && !j;) { x = l.getParent(); if (x.isBlockBoundary(this.forceBrBreak && !t && { br: 1 })) { s = 1;
                                    w = 0;
                                    j || x.equals(n);
                                    e.setEndAt(x, CKEDITOR.POSITION_BEFORE_END); break } l = x;
                                w = 1;
                                j = l.equals(n);
                                v = 1 } w && e.setEndAt(l, CKEDITOR.POSITION_AFTER_END);
                        l = this._getNextSourceNode(l, v, n);
                        if ((j = !l) || s && e) break
                    }
                    if (!g) {
                        if (!e) {
                            this._.docEndMarker &&
                                this._.docEndMarker.remove();
                            return this._.nextNode = null
                        }
                        g = new CKEDITOR.dom.elementPath(e.startContainer, e.root);
                        l = g.blockLimit;
                        s = { div: 1, th: 1, td: 1 };
                        g = g.block;
                        if (!g && l && !this.enforceRealBlocks && s[l.getName()] && e.checkStartOfBlock() && e.checkEndOfBlock() && !l.equals(e.root)) g = l;
                        else if (!g || this.enforceRealBlocks && g.is(h)) { g = this.range.document.createElement(a);
                            e.extractContents().appendTo(g);
                            g.trim();
                            e.insertNode(g);
                            q = o = true } else if (g.getName() != "li") {
                            if (!e.checkStartOfBlock() || !e.checkEndOfBlock()) {
                                g =
                                    g.clone(false);
                                e.extractContents().appendTo(g);
                                g.trim();
                                o = e.splitBlock();
                                q = !o.wasStartOfBlock;
                                o = !o.wasEndOfBlock;
                                e.insertNode(g)
                            }
                        } else if (!j) this._.nextNode = g.equals(n) ? null : this._getNextSourceNode(e.getBoundaryNodes().endNode, 1, n)
                    }
                    if (q)(q = g.getPrevious()) && q.type == CKEDITOR.NODE_ELEMENT && (q.getName() == "br" ? q.remove() : q.getLast() && q.getLast().$.nodeName.toLowerCase() == "br" && q.getLast().remove());
                    if (o)(q = g.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && q.getName() == "br" && (!CKEDITOR.env.needsBrFiller || q.getPrevious(i) ||
                        q.getNext(i)) && q.remove();
                    if (!this._.nextNode) this._.nextNode = j || g.equals(n) || !n ? null : this._getNextSourceNode(g, 1, n);
                    return g
                },
                _getNextSourceNode: function(a, b, c) {
                    function d(a) { return !(a.equals(c) || a.equals(f)) } for (var f = this.range.root, a = a.getNextSourceNode(b, null, d); !i(a);) a = a.getNextSourceNode(b, null, d); return a }
            };
            CKEDITOR.dom.range.prototype.createIterator = function() { return new a(this) }
        }(), CKEDITOR.command = function(a, e) {
            this.uiItems = [];
            this.exec = function(b) {
                if (this.state == CKEDITOR.TRISTATE_DISABLED ||
                    !this.checkAllowed()) return false;
                this.editorFocus && a.focus();
                return this.fire("exec") === false ? true : e.exec.call(this, a, b) !== false
            };
            this.refresh = function(a, b) {
                if (!this.readOnly && a.readOnly) return true;
                if (this.context && !b.isContextFor(this.context)) { this.disable(); return true }
                if (!this.checkAllowed(true)) { this.disable(); return true } this.startDisabled || this.enable();
                this.modes && !this.modes[a.mode] && this.disable();
                return this.fire("refresh", { editor: a, path: b }) === false ? true : e.refresh && e.refresh.apply(this,
                    arguments) !== false
            };
            var b;
            this.checkAllowed = function(c) { return !c && typeof b == "boolean" ? b : b = a.activeFilter.checkFeature(this) };
            CKEDITOR.tools.extend(this, e, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!e.context, state: CKEDITOR.TRISTATE_DISABLED });
            CKEDITOR.event.call(this)
        }, CKEDITOR.command.prototype = {
            enable: function() { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(!this.preserveState || typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState) },
            disable: function() { this.setState(CKEDITOR.TRISTATE_DISABLED) },
            setState: function(a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return false;
                this.previousState = this.state;
                this.state = a;
                this.fire("state"); return true },
            toggleState: function() { this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF) }
        }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2,
        CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = { customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "<!DOCTYPE html>", bodyId: "", bodyClass: "", fullPage: !1, height: 200, extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] },
        function() {
            function a(a, b, c, d, g) {
                var f, e, a = [];
                for (f in b) {
                    e = b[f];
                    e = typeof e == "boolean" ? {} : typeof e == "function" ? { match: e } : D(e);
                    if (f.charAt(0) != "$") e.elements = f;
                    if (c) e.featureName = c.toLowerCase();
                    var i = e;
                    i.elements = j(i.elements, /\s+/) || null;
                    i.propertiesOnly = i.propertiesOnly || i.elements === true;
                    var h = /\s*,\s*/,
                        k = void 0;
                    for (k in H) {
                        i[k] = j(i[k], h) || null;
                        var o = i,
                            u = L[k],
                            m = j(i[L[k]], h),
                            l = i[k],
                            n = [],
                            E = true,
                            r = void 0;
                        m ? E = false : m = {};
                        for (r in l)
                            if (r.charAt(0) == "!") { r = r.slice(1);
                                n.push(r);
                                m[r] = true;
                                E = false }
                        for (; r = n.pop();) { l[r] = l["!" + r];
                            delete l["!" + r] } o[u] =
                            (E ? false : m) || null
                    }
                    i.match = i.match || null;
                    d.push(e);
                    a.push(e)
                }
                for (var b = g.elements, g = g.generic, t, c = 0, d = a.length; c < d; ++c) {
                    f = D(a[c]);
                    e = f.classes === true || f.styles === true || f.attributes === true;
                    i = f;
                    k = u = h = void 0;
                    for (h in H) i[h] = s(i[h]);
                    o = true;
                    for (k in L) { h = L[k];
                        u = i[h];
                        m = [];
                        l = void 0; for (l in u) l.indexOf("*") > -1 ? m.push(RegExp("^" + l.replace(/\*/g, ".*") + "$")) : m.push(l);
                        u = m; if (u.length) { i[h] = u;
                            o = false } } i.nothingRequired = o;
                    i.noProperties = !(i.attributes || i.classes || i.styles);
                    if (f.elements === true || f.elements === null) g[e ?
                        "unshift" : "push"](f);
                    else { i = f.elements;
                        delete f.elements; for (t in i)
                            if (b[t]) b[t][e ? "unshift" : "push"](f);
                            else b[t] = [f] }
                }
            }

            function e(a, c, d, g) {
                if (!a.match || a.match(c))
                    if (g || f(a, c)) {
                        if (!a.propertiesOnly) d.valid = true;
                        if (!d.allAttributes) d.allAttributes = b(a.attributes, c.attributes, d.validAttributes);
                        if (!d.allStyles) d.allStyles = b(a.styles, c.styles, d.validStyles);
                        if (!d.allClasses) {
                            a = a.classes;
                            c = c.classes;
                            g = d.validClasses;
                            if (a)
                                if (a === true) a = true;
                                else {
                                    for (var e = 0, i = c.length, h; e < i; ++e) { h = c[e];
                                        g[h] || (g[h] = a(h)) } a =
                                        false
                                }
                            else a = false;
                            d.allClasses = a
                        }
                    }
            }

            function b(a, b, c) { if (!a) return false; if (a === true) return true; for (var d in b) c[d] || (c[d] = a(d)); return false }

            function c(a, b, c) { if (!a.match || a.match(b)) { if (a.noProperties) return false;
                    c.hadInvalidAttribute = d(a.attributes, b.attributes) || c.hadInvalidAttribute;
                    c.hadInvalidStyle = d(a.styles, b.styles) || c.hadInvalidStyle;
                    a = a.classes;
                    b = b.classes; if (a) { for (var g = false, f = a === true, e = b.length; e--;)
                            if (f || a(b[e])) { b.splice(e, 1);
                                g = true }
                        a = g } else a = false;
                    c.hadInvalidClass = a || c.hadInvalidClass } }

            function d(a, b) { if (!a) return false; var c = false,
                    d = a === true,
                    g; for (g in b)
                    if (d || a(g)) { delete b[g];
                        c = true }
                return c }

            function i(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return false;
                a._.cachedChecks = {}; return true }

            function j(a, b) {
                if (!a) return false;
                if (a === true) return a;
                if (typeof a == "string") { a = C(a); return a == "*" ? true : CKEDITOR.tools.convertArrayToObject(a.split(b)) }
                if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : false;
                var c = {},
                    d = 0,
                    g;
                for (g in a) { c[g] = a[g];
                    d++ }
                return d ?
                    c : false
            }

            function f(a, b) { if (a.nothingRequired) return true; var c, d, g, f; if (g = a.requiredClasses) { f = b.classes; for (c = 0; c < g.length; ++c) { d = g[c]; if (typeof d == "string") { if (CKEDITOR.tools.indexOf(f, d) == -1) return false } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(f, d)) return false } } return h(b.styles, a.requiredStyles) && h(b.attributes, a.requiredAttributes) }

            function h(a, b) {
                if (!b) return true;
                for (var c = 0, d; c < b.length; ++c) {
                    d = b[c];
                    if (typeof d == "string") { if (!(d in a)) return false } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a,
                            d)) return false
                }
                return true
            }

            function k(a) { if (!a) return {}; for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length;) b[a.shift()] = G; return b }

            function g(a) { for (var b, c, d, g, f = {}, e = 1, a = C(a); b = a.match(J);) { if (c = b[2]) { d = m(c, "styles");
                        g = m(c, "attrs");
                        c = m(c, "classes") } else d = g = c = null;
                    f["$" + e++] = { elements: b[1], classes: c, styles: d, attributes: g };
                    a = a.slice(b[0].length) } return f }

            function m(a, b) { var c = a.match(P[b]); return c ? C(c[1]) : null }

            function p(a) {
                var b = a.styleBackup = a.attributes.style,
                    c = a.classBackup = a.attributes["class"];
                if (!a.styles) a.styles = CKEDITOR.tools.parseCssText(b || "", 1);
                if (!a.classes) a.classes = c ? c.split(/\s+/) : []
            }

            function q(a, b, d, g) {
                var f = 0,
                    i;
                if (g.toHtml) b.name = b.name.replace(I, "$1");
                if (g.doCallbacks && a.elementCallbacks) { a: for (var h = a.elementCallbacks, j = 0, k = h.length, o; j < k; ++j)
                        if (o = h[j](b)) { i = o; break a } if (i) return i }
                if (g.doTransform)
                    if (i = a._.transformations[b.name]) { p(b); for (h = 0; h < i.length; ++h) x(a, b, i[h]);
                        n(b) }
                if (g.doFilter) {
                    a: {
                        h = b.name;j = a._;a = j.allowedRules.elements[h];i = j.allowedRules.generic;h = j.disallowedRules.elements[h];
                        j = j.disallowedRules.generic;k = g.skipRequired;o = { valid: false, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: false, allClasses: false, allStyles: false, hadInvalidAttribute: false, hadInvalidClass: false, hadInvalidStyle: false };
                        var u, m;
                        if (!a && !i) a = null;
                        else { p(b); if (h) { u = 0; for (m = h.length; u < m; ++u)
                                    if (c(h[u], b, o) === false) { a = null; break a } } if (j) { u = 0; for (m = j.length; u < m; ++u) c(j[u], b, o) } if (a) { u = 0; for (m = a.length; u < m; ++u) e(a[u], b, o, k) } if (i) { u = 0; for (m = i.length; u < m; ++u) e(i[u], b, o, k) } a = o }
                    }
                    if (!a) {
                        d.push(b);
                        return A
                    }
                    if (!a.valid) { d.push(b); return A } m = a.validAttributes;
                    var s = a.validStyles;i = a.validClasses;
                    var h = b.attributes,
                        r = b.styles,
                        j = b.classes,
                        k = b.classBackup,
                        E = b.styleBackup,
                        t, q, v = [];o = [];
                    var H = /^data-cke-/;u = false;delete h.style;delete h["class"];delete b.classBackup;delete b.styleBackup;
                    if (!a.allAttributes)
                        for (t in h)
                            if (!m[t])
                                if (H.test(t)) { if (t != (q = t.replace(/^data-cke-saved-/, "")) && !m[q]) { delete h[t];
                                        u = true } } else { delete h[t];
                                    u = true }
                    if (!a.allStyles || a.hadInvalidStyle) {
                        for (t in r) a.allStyles || s[t] ?
                            v.push(t + ":" + r[t]) : u = true;
                        if (v.length) h.style = v.sort().join("; ")
                    } else if (E) h.style = E;
                    if (!a.allClasses || a.hadInvalidClass) { for (t = 0; t < j.length; ++t)(a.allClasses || i[j[t]]) && o.push(j[t]);
                        o.length && (h["class"] = o.sort().join(" "));
                        k && o.length < k.split(/\s+/).length && (u = true) } else k && (h["class"] = k);u && (f = A);
                    if (!g.skipFinalValidation && !l(b)) { d.push(b); return A }
                }
                if (g.toHtml) b.name = b.name.replace(R, "cke:$1");
                return f
            }

            function o(a) {
                var b = [],
                    c;
                for (c in a) c.indexOf("*") > -1 && b.push(c.replace(/\*/g, ".*"));
                return b.length ?
                    RegExp("^(?:" + b.join("|") + ")$") : null
            }

            function n(a) { var b = a.attributes,
                    c;
                delete b.style;
                delete b["class"]; if (c = CKEDITOR.tools.writeCssText(a.styles, true)) b.style = c;
                a.classes.length && (b["class"] = a.classes.sort().join(" ")) }

            function l(a) { switch (a.name) {
                    case "a":
                        if (!a.children.length && !a.attributes.name) return false; break;
                    case "img":
                        if (!a.attributes.src) return false } return true }

            function s(a) { if (!a) return false; if (a === true) return true; var b = o(a); return function(c) { return c in a || b && c.match(b) } }

            function t() { return new CKEDITOR.htmlParser.element("br") }

            function w(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.name == "br" || B.$block[a.name]) }

            function v(a, b, c) {
                var d = a.name;
                if (B.$empty[d] || !a.children.length)
                    if (d == "hr" && b == "br") a.replaceWith(t());
                    else { a.parent && c.push({ check: "it", el: a.parent });
                        a.remove() }
                else if (B.$block[d] || d == "tr")
                    if (b == "br") { if (a.previous && !w(a.previous)) { b = t();
                            b.insertBefore(a) } if (a.next && !w(a.next)) { b = t();
                            b.insertAfter(a) } a.replaceWithChildren() } else {
                        var d = a.children,
                            g;
                        b: {
                            g = B[b];
                            for (var f = 0, e = d.length, i; f < e; ++f) {
                                i = d[f];
                                if (i.type ==
                                    CKEDITOR.NODE_ELEMENT && !g[i.name]) { g = false; break b }
                            }
                            g = true
                        }
                        if (g) { a.name = b;
                            a.attributes = {};
                            c.push({ check: "parent-down", el: a }) } else {
                            g = a.parent;
                            for (var f = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || g.name == "body", h, j, e = d.length; e > 0;) {
                                i = d[--e];
                                if (f && (i.type == CKEDITOR.NODE_TEXT || i.type == CKEDITOR.NODE_ELEMENT && B.$inline[i.name])) { if (!h) { h = new CKEDITOR.htmlParser.element(b);
                                        h.insertAfter(a);
                                        c.push({ check: "parent-down", el: h }) } h.add(i, 0) } else {
                                    h = null;
                                    j = B[g.name] || B.span;
                                    i.insertAfter(a);
                                    g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT &&
                                        (i.type == CKEDITOR.NODE_ELEMENT && !j[i.name]) && c.push({ check: "el-up", el: i })
                                }
                            }
                            a.remove()
                        }
                    }
                else if (d in { style: 1, script: 1 }) a.remove();
                else { a.parent && c.push({ check: "it", el: a.parent });
                    a.replaceWithChildren() }
            }

            function x(a, b, c) { var d, g; for (d = 0; d < c.length; ++d) { g = c[d]; if ((!g.check || a.check(g.check, false)) && (!g.left || g.left(b))) { g.right(b, T); break } } }

            function u(a, b) {
                var c = b.getDefinition(),
                    d = c.attributes,
                    g = c.styles,
                    f, e, i, h;
                if (a.name != c.element) return false;
                for (f in d)
                    if (f == "class") {
                        c = d[f].split(/\s+/);
                        for (i =
                            a.classes.join("|"); h = c.pop();)
                            if (i.indexOf(h) == -1) return false
                    } else if (a.attributes[f] != d[f]) return false;
                for (e in g)
                    if (a.styles[e] != g[e]) return false;
                return true
            }

            function r(a, b) { var c, d; if (typeof a == "string") c = a;
                else if (a instanceof CKEDITOR.style) d = a;
                else { c = a[0];
                    d = a[1] } return [{ element: c, left: d, right: function(a, c) { c.transform(a, b) } }] }

            function y(a) { return function(b) { return u(b, a) } }

            function z(a) { return function(b, c) { c[a](b) } }
            var B = CKEDITOR.dtd,
                A = 1,
                D = CKEDITOR.tools.copy,
                C = CKEDITOR.tools.trim,
                G = "cke-test",
                E = ["", "p", "br", "div"];
            CKEDITOR.FILTER_SKIP_TREE = 2;
            CKEDITOR.filter = function(a) {
                this.allowedContent = [];
                this.disallowedContent = [];
                this.elementCallbacks = null;
                this.disabled = false;
                this.editor = null;
                this.id = CKEDITOR.tools.getNextNumber();
                this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {} };
                CKEDITOR.filter.instances[this.id] = this;
                if (a instanceof CKEDITOR.editor) {
                    a = this.editor = a;
                    this.customConfig = true;
                    var b = a.config.allowedContent;
                    if (b ===
                        true) this.disabled = true;
                    else { if (!b) this.customConfig = false;
                        this.allow(b, "config", 1);
                        this.allow(a.config.extraAllowedContent, "extra", 1);
                        this.allow(E[a.enterMode] + " " + E[a.shiftEnterMode], "default", 1);
                        this.disallow(a.config.disallowedContent) }
                } else { this.customConfig = false;
                    this.allow(a, "default", 1) }
            };
            CKEDITOR.filter.instances = {};
            CKEDITOR.filter.prototype = {
                allow: function(b, c, d) {
                    if (!i(this, b, d)) return false;
                    var f, e;
                    if (typeof b == "string") b = g(b);
                    else if (b instanceof CKEDITOR.style) {
                        if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor),
                            c, d);
                        f = b.getDefinition();
                        b = {};
                        d = f.attributes;
                        b[f.element] = f = { styles: f.styles, requiredStyles: f.styles && CKEDITOR.tools.objectKeys(f.styles) };
                        if (d) { d = D(d);
                            f.classes = d["class"] ? d["class"].split(/\s+/) : null;
                            f.requiredClasses = f.classes;
                            delete d["class"];
                            f.attributes = d;
                            f.requiredAttributes = d && CKEDITOR.tools.objectKeys(d) }
                    } else if (CKEDITOR.tools.isArray(b)) { for (f = 0; f < b.length; ++f) e = this.allow(b[f], c, d); return e } a(this, b, c, this.allowedContent, this._.allowedRules);
                    return true
                },
                applyTo: function(a, b, c, d) {
                    if (this.disabled) return false;
                    var g = this,
                        f = [],
                        e = this.editor && this.editor.config.protectedSource,
                        i, h = false,
                        j = { doFilter: !c, doTransform: true, doCallbacks: true, toHtml: b };
                    a.forEach(function(a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) { if (a.attributes["data-cke-filter"] == "off") return false; if (!b || !(a.name == "span" && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))) { i = q(g, a, f, j); if (i & A) h = true;
                                else if (i & 2) return false } } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var c;
                            a: {
                                var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/,
                                    ""));c = [];
                                var k, o, u;
                                if (e)
                                    for (o = 0; o < e.length; ++o)
                                        if ((u = d.match(e[o])) && u[0].length == d.length) { c = true; break a }
                                d = CKEDITOR.htmlParser.fragment.fromHtml(d);d.children.length == 1 && (k = d.children[0]).type == CKEDITOR.NODE_ELEMENT && q(g, k, c, j);c = !c.length
                            }
                            c || f.push(a)
                        }
                    }, null, true);
                    f.length && (h = true);
                    for (var k, a = [], d = E[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)], o; c = f.pop();) c.type == CKEDITOR.NODE_ELEMENT ? v(c, d, a) : c.remove();
                    for (; k = a.pop();) {
                        c = k.el;
                        if (c.parent) {
                            o = B[c.parent.name] || B.span;
                            switch (k.check) {
                                case "it":
                                    B.$removeEmpty[c.name] &&
                                        !c.children.length ? v(c, d, a) : l(c) || v(c, d, a);
                                    break;
                                case "el-up":
                                    c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !o[c.name] && v(c, d, a);
                                    break;
                                case "parent-down":
                                    c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !o[c.name] && v(c.parent, d, a)
                            }
                        }
                    }
                    return h
                },
                checkFeature: function(a) { if (this.disabled || !a) return true;
                    a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) },
                disable: function() { this.disabled = true },
                disallow: function(b) {
                    if (!i(this, b, true)) return false;
                    typeof b ==
                        "string" && (b = g(b));
                    a(this, b, null, this.disallowedContent, this._.disallowedRules);
                    return true
                },
                addContentForms: function(a) { if (!this.disabled && a) { var b, c, d = [],
                            g; for (b = 0; b < a.length && !g; ++b) { c = a[b]; if ((typeof c == "string" || c instanceof CKEDITOR.style) && this.check(c)) g = c } if (g) { for (b = 0; b < a.length; ++b) d.push(r(a[b], g));
                            this.addTransformations(d) } } },
                addElementCallback: function(a) { if (!this.elementCallbacks) this.elementCallbacks = [];
                    this.elementCallbacks.push(a) },
                addFeature: function(a) {
                    if (this.disabled || !a) return true;
                    a.toFeature && (a = a.toFeature(this.editor));
                    this.allow(a.allowedContent, a.name);
                    this.addTransformations(a.contentTransformations);
                    this.addContentForms(a.contentForms);
                    return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : true
                },
                addTransformations: function(a) {
                    var b, c;
                    if (!this.disabled && a) {
                        var d = this._.transformations,
                            g;
                        for (g = 0; g < a.length; ++g) {
                            b = a[g];
                            var f = void 0,
                                e = void 0,
                                i = void 0,
                                h = void 0,
                                j = void 0,
                                k = void 0;
                            c = [];
                            for (e = 0; e < b.length; ++e) {
                                i = b[e];
                                if (typeof i ==
                                    "string") { i = i.split(/\s*:\s*/);
                                    h = i[0];
                                    j = null;
                                    k = i[1] } else { h = i.check;
                                    j = i.left;
                                    k = i.right }
                                if (!f) { f = i;
                                    f = f.element ? f.element : h ? h.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element } j instanceof CKEDITOR.style && (j = y(j));
                                c.push({ check: h == f ? null : h, left: j, right: typeof k == "string" ? z(k) : k })
                            }
                            b = f;
                            d[b] || (d[b] = []);
                            d[b].push(c)
                        }
                    }
                },
                check: function(a, b, c) {
                    if (this.disabled) return true;
                    if (CKEDITOR.tools.isArray(a)) { for (var d = a.length; d--;)
                            if (this.check(a[d], b, c)) return true; return false }
                    var f, e;
                    if (typeof a == "string") {
                        e =
                            a + "<" + (b === false ? "0" : "1") + (c ? "1" : "0") + ">";
                        if (e in this._.cachedChecks) return this._.cachedChecks[e];
                        d = g(a).$1;
                        f = d.styles;
                        var i = d.classes;
                        d.name = d.elements;
                        d.classes = i = i ? i.split(/\s*,\s*/) : [];
                        d.styles = k(f);
                        d.attributes = k(d.attributes);
                        d.children = [];
                        i.length && (d.attributes["class"] = i.join(" "));
                        if (f) d.attributes.style = CKEDITOR.tools.writeCssText(d.styles);
                        f = d
                    } else {
                        d = a.getDefinition();
                        f = d.styles;
                        i = d.attributes || {};
                        if (f) { f = D(f);
                            i.style = CKEDITOR.tools.writeCssText(f, true) } else f = {};
                        f = {
                            name: d.element,
                            attributes: i,
                            classes: i["class"] ? i["class"].split(/\s+/) : [],
                            styles: f,
                            children: []
                        }
                    }
                    var i = CKEDITOR.tools.clone(f),
                        h = [],
                        j;
                    if (b !== false && (j = this._.transformations[f.name])) { for (d = 0; d < j.length; ++d) x(this, f, j[d]);
                        n(f) } q(this, i, h, { doFilter: true, doTransform: b !== false, skipRequired: !c, skipFinalValidation: !c });
                    b = h.length > 0 ? false : CKEDITOR.tools.objectCompare(f.attributes, i.attributes, true) ? true : false;
                    typeof a == "string" && (this._.cachedChecks[e] = b);
                    return b
                },
                getAllowedEnterMode: function() {
                    var a = ["p", "div", "br"],
                        b = {
                            p: CKEDITOR.ENTER_P,
                            div: CKEDITOR.ENTER_DIV,
                            br: CKEDITOR.ENTER_BR
                        };
                    return function(c, d) { var g = a.slice(),
                            f; if (this.check(E[c])) return c; for (d || (g = g.reverse()); f = g.pop();)
                            if (this.check(f)) return b[f]; return CKEDITOR.ENTER_BR }
                }(),
                destroy: function() { delete CKEDITOR.filter.instances[this.id];
                    delete this._;
                    delete this.allowedContent;
                    delete this.disallowedContent }
            };
            var H = { styles: 1, attributes: 1, classes: 1 },
                L = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" },
                J = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
                P = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ },
                I = /^cke:(object|embed|param)$/,
                R = /^(object|embed|param)$/,
                T = CKEDITOR.filter.transformationsTools = {
                    sizeToStyle: function(a) { this.lengthToStyle(a, "width");
                        this.lengthToStyle(a, "height") },
                    sizeToAttribute: function(a) { this.lengthToAttribute(a, "width");
                        this.lengthToAttribute(a, "height") },
                    lengthToStyle: function(a, b, c) { c = c || b; if (!(c in a.styles)) { var d = a.attributes[b]; if (d) { /^\d+$/.test(d) && (d = d + "px");
                                a.styles[c] = d } } delete a.attributes[b] },
                    lengthToAttribute: function(a, b, c) { c = c || b; if (!(c in a.attributes)) { var d = a.styles[b],
                                g = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                            g ? a.attributes[c] = g[1] : d == G && (a.attributes[c] = G) } delete a.styles[b] },
                    alignmentToStyle: function(a) { if (!("float" in a.styles)) { var b = a.attributes.align; if (b == "left" || b == "right") a.styles["float"] = b } delete a.attributes.align },
                    alignmentToAttribute: function(a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if (b == "left" || b == "right") a.attributes.align = b } delete a.styles["float"] },
                    matchesStyle: u,
                    transform: function(a, b) { if (typeof b == "string") a.name = b;
                        else { var c = b.getDefinition(),
                                d = c.styles,
                                g = c.attributes,
                                f, e, i, h;
                            a.name = c.element; for (f in g)
                                if (f == "class") { c = a.classes.join("|"); for (i = g[f].split(/\s+/); h = i.pop();) c.indexOf(h) == -1 && a.classes.push(h) } else a.attributes[f] = g[f]; for (e in d) a.styles[e] = d[e] } }
                }
        }(),
        function() {
            CKEDITOR.focusManager = function(a) { if (a.focusManager) return a.focusManager;
                this.hasFocus = false;
                this.currentActive = null;
                this._ = { editor: a }; return this };
            CKEDITOR.focusManager._ = { blurDelay: 200 };
            CKEDITOR.focusManager.prototype = {
                focus: function(a) { this._.timer && clearTimeout(this._.timer); if (a) this.currentActive = a; if (!this.hasFocus && !this._.locked) {
                        (a = CKEDITOR.currentInstance) && a.focusManager.blur(1);
                        this.hasFocus = true;
                        (a = this._.editor.container) && a.addClass("cke_focus");
                        this._.editor.fire("focus") } },
                lock: function() { this._.locked = 1 },
                unlock: function() { delete this._.locked },
                blur: function(a) {
                    function e() {
                        if (this.hasFocus) {
                            this.hasFocus = false;
                            var a = this._.editor.container;
                            a && a.removeClass("cke_focus");
                            this._.editor.fire("blur")
                        }
                    }
                    if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var b = CKEDITOR.focusManager._.blurDelay;
                        a || !b ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() { delete this._.timer;
                            e.call(this) }, b, this) }
                },
                add: function(a, e) {
                    var b = a.getCustomData("focusmanager");
                    if (!b || b != this) {
                        b && b.remove(a);
                        var b = "focus",
                            c = "blur";
                        if (e)
                            if (CKEDITOR.env.ie) { b = "focusin";
                                c = "focusout" } else CKEDITOR.event.useCapture = 1;
                        var d = { blur: function() { a.equals(this.currentActive) && this.blur() }, focus: function() { this.focus(a) } };
                        a.on(b, d.focus, this);
                        a.on(c, d.blur, this);
                        if (e) CKEDITOR.event.useCapture = 0;
                        a.setCustomData("focusmanager", this);
                        a.setCustomData("focusmanager_handlers", d)
                    }
                },
                remove: function(a) { a.removeCustomData("focusmanager"); var e = a.removeCustomData("focusmanager_handlers");
                    a.removeListener("blur", e.blur);
                    a.removeListener("focus", e.focus) }
            }
        }(), CKEDITOR.keystrokeHandler = function(a) { if (a.keystrokeHandler) return a.keystrokeHandler;
            this.keystrokes = {};
            this.blockedKeystrokes = {};
            this._ = { editor: a }; return this },
        function() {
            var a,
                e = function(b) { var b = b.data,
                        d = b.getKeystroke(),
                        e = this.keystrokes[d],
                        j = this._.editor;
                    a = j.fire("key", { keyCode: d, domEvent: b }) === false; if (!a) { e && (a = j.execCommand(e, { from: "keystrokeHandler" }) !== false);
                        a || (a = !!this.blockedKeystrokes[d]) } a && b.preventDefault(true); return !a },
                b = function(b) { if (a) { a = false;
                        b.data.preventDefault(true) } };
            CKEDITOR.keystrokeHandler.prototype = { attach: function(a) { a.on("keydown", e, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this) } }
        }(),
        function() {
            CKEDITOR.lang = {
                languages: {
                    af: 1,
                    ar: 1,
                    bg: 1,
                    bn: 1,
                    bs: 1,
                    ca: 1,
                    cs: 1,
                    cy: 1,
                    da: 1,
                    de: 1,
                    el: 1,
                    "en-au": 1,
                    "en-ca": 1,
                    "en-gb": 1,
                    en: 1,
                    eo: 1,
                    es: 1,
                    et: 1,
                    eu: 1,
                    fa: 1,
                    fi: 1,
                    fo: 1,
                    "fr-ca": 1,
                    fr: 1,
                    gl: 1,
                    gu: 1,
                    he: 1,
                    hi: 1,
                    hr: 1,
                    hu: 1,
                    id: 1,
                    is: 1,
                    it: 1,
                    ja: 1,
                    ka: 1,
                    km: 1,
                    ko: 1,
                    ku: 1,
                    lt: 1,
                    lv: 1,
                    mk: 1,
                    mn: 1,
                    ms: 1,
                    nb: 1,
                    nl: 1,
                    no: 1,
                    pl: 1,
                    "pt-br": 1,
                    pt: 1,
                    ro: 1,
                    ru: 1,
                    si: 1,
                    sk: 1,
                    sl: 1,
                    sq: 1,
                    "sr-latn": 1,
                    sr: 1,
                    sv: 1,
                    th: 1,
                    tr: 1,
                    tt: 1,
                    ug: 1,
                    uk: 1,
                    vi: 1,
                    "zh-cn": 1,
                    zh: 1
                },
                rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 },
                load: function(a, e, b) {
                    if (!a || !CKEDITOR.lang.languages[a]) a = this.detect(e, a);
                    var c = this,
                        e = function() {
                            c[a].dir =
                                c.rtl[a] ? "rtl" : "ltr";
                            b(a, c[a])
                        };
                    this[a] ? e() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), e, this)
                },
                detect: function(a, e) { var b = this.languages,
                        e = e || navigator.userLanguage || navigator.language || a,
                        c = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                        d = c[1],
                        c = c[2];
                    b[d + "-" + c] ? d = d + "-" + c : b[d] || (d = null);
                    CKEDITOR.lang.detect = d ? function() { return d } : function(a) { return a }; return d || a }
            }
        }(), CKEDITOR.scriptLoader = function() {
            var a = {},
                e = {};
            return {
                load: function(b, c, d, i) {
                    var j = typeof b == "string";
                    j && (b = [b]);
                    d || (d = CKEDITOR);
                    var f = b.length,
                        h = [],
                        k = [],
                        g = function(a) { c && (j ? c.call(d, a) : c.call(d, h, k)) };
                    if (f === 0) g(true);
                    else {
                        var m = function(a, b) {
                                (b ? h : k).push(a); if (--f <= 0) { i && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                                    g(b) } },
                            p = function(b, c) { a[b] = 1; var d = e[b];
                                delete e[b]; for (var g = 0; g < d.length; g++) d[g](b, c) },
                            q = function(b) {
                                if (a[b]) m(b, true);
                                else {
                                    var d = e[b] || (e[b] = []);
                                    d.push(m);
                                    if (!(d.length > 1)) {
                                        var g = new CKEDITOR.dom.element("script");
                                        g.setAttributes({ type: "text/javascript", src: b });
                                        if (c)
                                            if (CKEDITOR.env.ie &&
                                                CKEDITOR.env.version < 11) g.$.onreadystatechange = function() { if (g.$.readyState == "loaded" || g.$.readyState == "complete") { g.$.onreadystatechange = null;
                                                    p(b, true) } };
                                            else { g.$.onload = function() { setTimeout(function() { p(b, true) }, 0) };
                                                g.$.onerror = function() { p(b, false) } }
                                        g.appendTo(CKEDITOR.document.getHead())
                                    }
                                }
                            };
                        i && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                        for (var o = 0; o < f; o++) q(b[o])
                    }
                },
                queue: function() {
                    function a() { var b;
                        (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) }
                    var c = [];
                    return function(d,
                        e) { var j = this;
                        c.push({ scriptUrl: d, callback: function() { e && e.apply(this, arguments);
                                c.shift();
                                a.call(j) } });
                        c.length == 1 && a.call(this) }
                }()
            }
        }(), CKEDITOR.resourceManager = function(a, e) { this.basePath = a;
            this.fileName = e;
            this.registered = {};
            this.loaded = {};
            this.externals = {};
            this._ = { waitingList: {} } }, CKEDITOR.resourceManager.prototype = {
            add: function(a, e) {
                if (this.registered[a]) throw '[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.';
                var b = this.registered[a] = e || {};
                b.name = a;
                b.path = this.getPath(a);
                CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
                return this.get(a)
            },
            get: function(a) { return this.registered[a] || null },
            getPath: function(a) { var e = this.externals[a]; return CKEDITOR.getUrl(e && e.dir || this.basePath + a + "/") },
            getFilePath: function(a) { var e = this.externals[a]; return CKEDITOR.getUrl(this.getPath(a) + (e ? e.file : this.fileName + ".js")) },
            addExternal: function(a, e, b) {
                for (var a = a.split(","), c = 0; c < a.length; c++) {
                    var d = a[c];
                    b || (e = e.replace(/[^\/]+$/, function(a) { b = a; return "" }));
                    this.externals[d] = { dir: e, file: b || this.fileName + ".js" }
                }
            },
            load: function(a, e, b) {
                CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
                for (var c = this.loaded, d = this.registered, i = [], j = {}, f = {}, h = 0; h < a.length; h++) { var k = a[h]; if (k)
                        if (!c[k] && !d[k]) { var g = this.getFilePath(k);
                            i.push(g);
                            g in j || (j[g] = []);
                            j[g].push(k) } else f[k] = this.get(k) } CKEDITOR.scriptLoader.load(i, function(a, d) {
                    if (d.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + j[d[0]].join(",") + '" was not found at "' + d[0] + '".';
                    for (var g = 0; g < a.length; g++)
                        for (var i = j[a[g]],
                                h = 0; h < i.length; h++) { var k = i[h];
                            f[k] = this.get(k);
                            c[k] = 1 } e.call(b, f)
                }, this)
            }
        }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
            var e = {};
            return function(b, c, d) {
                var i = {},
                    j = function(b) {
                        a.call(this, b, function(a) {
                            CKEDITOR.tools.extend(i, a);
                            var b = [],
                                g;
                            for (g in a) {
                                var f = a[g],
                                    p = f && f.requires;
                                if (!e[g]) {
                                    if (f.icons)
                                        for (var q = f.icons.split(","), o = q.length; o--;) CKEDITOR.skin.addIcon(q[o], f.path + "icons/" + (CKEDITOR.env.hidpi &&
                                            f.hidpi ? "hidpi/" : "") + q[o] + ".png");
                                    e[g] = 1
                                }
                                if (p) { p.split && (p = p.split(",")); for (f = 0; f < p.length; f++) i[p[f]] || b.push(p[f]) }
                            }
                            if (b.length) j.call(this, b);
                            else { for (g in i) { f = i[g]; if (f.onLoad && !f.onLoad._called) { f.onLoad() === false && delete i[g];
                                        f.onLoad._called = 1 } } c && c.call(d || window, i) }
                        }, this)
                    };
                j.call(this, b)
            }
        }), CKEDITOR.plugins.setLang = function(a, e, b) { var c = this.get(a),
                a = c.langEntries || (c.langEntries = {}),
                c = c.lang || (c.lang = []);
            c.split && (c = c.split(","));
            CKEDITOR.tools.indexOf(c, e) == -1 && c.push(e);
            a[e] = b }, CKEDITOR.ui =
        function(a) { if (a.ui) return a.ui;
            this.items = {};
            this.instances = {};
            this.editor = a;
            this._ = { handlers: {} }; return this }, CKEDITOR.ui.prototype = {
            add: function(a, e, b) { b.name = a.toLowerCase(); var c = this.items[a] = { type: e, command: b.command || null, args: Array.prototype.slice.call(arguments, 2) };
                CKEDITOR.tools.extend(c, b) },
            get: function(a) { return this.instances[a] },
            create: function(a) {
                var e = this.items[a],
                    b = e && this._.handlers[e.type],
                    c = e && e.command && this.editor.getCommand(e.command),
                    b = b && b.create.apply(this, e.args);
                this.instances[a] =
                    b;
                c && c.uiItems.push(b);
                if (b && !b.type) b.type = e.type;
                return b
            },
            addHandler: function(a, e) { this._.handlers[a] = e },
            space: function(a) { return CKEDITOR.document.getById(this.spaceId(a)) },
            spaceId: function(a) { return this.editor.id + "_" + a }
        }, CKEDITOR.event.implementOn(CKEDITOR.ui),
        function() {
            function a(a, c, g) {
                CKEDITOR.event.call(this);
                a = a && CKEDITOR.tools.clone(a);
                if (c !== void 0) {
                    if (c instanceof CKEDITOR.dom.element) { if (!g) throw Error("One of the element modes must be specified."); } else throw Error("Expect element of type CKEDITOR.dom.element.");
                    if (CKEDITOR.env.ie && CKEDITOR.env.quirks && g == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                    if (!(g == CKEDITOR.ELEMENT_MODE_INLINE ? c.is(CKEDITOR.dtd.$editable) || c.is("textarea") : g == CKEDITOR.ELEMENT_MODE_REPLACE ? !c.is(CKEDITOR.dtd.$nonBodyContent) : 1)) throw Error('The specified element mode is not supported on element: "' + c.getName() + '".');
                    this.element = c;
                    this.elementMode = g;
                    this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (c.getId() || c.getNameAtt())
                } else this.elementMode =
                    CKEDITOR.ELEMENT_MODE_NONE;
                this._ = {};
                this.commands = {};
                this.templates = {};
                this.name = this.name || e();
                this.id = CKEDITOR.tools.getNextId();
                this.status = "unloaded";
                this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
                this.ui = new CKEDITOR.ui(this);
                this.focusManager = new CKEDITOR.focusManager(this);
                this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
                this.on("readOnly", b);
                this.on("selectionChange", function(a) { d(this, a.data.path) });
                this.on("activeFilterChange", function() { d(this, this.elementPath(), true) });
                this.on("mode", b);
                this.on("instanceReady", function() { this.config.startupFocus && this.focus() });
                CKEDITOR.fire("instanceCreated", null, this);
                CKEDITOR.add(this);
                CKEDITOR.tools.setTimeout(function() { j(this, a) }, 0, this)
            }

            function e() { do var a = "editor" + ++p; while (CKEDITOR.instances[a]); return a }

            function b() { var a = this.commands,
                    b; for (b in a) c(this, a[b]) }

            function c(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() }

            function d(a, b, c) {
                if (b) {
                    var d, g, f = a.commands;
                    for (g in f) { d = f[g];
                        (c || d.contextSensitive) && d.refresh(a, b) }
                }
            }

            function i(a) { var b = a.config.customConfig; if (!b) return false; var b = CKEDITOR.getUrl(b),
                    c = q[b] || (q[b] = {}); if (c.fn) { c.fn.call(a, a.config);
                    (CKEDITOR.getUrl(a.config.customConfig) == b || !i(a)) && a.fireOnce("customConfigLoaded") } else CKEDITOR.scriptLoader.queue(b, function() { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
                    i(a) }); return true }

            function j(a, b) {
                a.on("customConfigLoaded", function() {
                    if (b) {
                        if (b.on)
                            for (var c in b.on) a.on(c, b.on[c]);
                        CKEDITOR.tools.extend(a.config, b, true);
                        delete a.config.on
                    }
                    c = a.config;
                    a.readOnly = c.readOnly ? true : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : false;
                    a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) :
                        false;
                    a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                    a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                    a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
                    if (c.skin) CKEDITOR.skinName = c.skin;
                    a.fireOnce("configLoaded");
                    a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                    a.filter = a.activeFilter = new CKEDITOR.filter(a);
                    f(a)
                });
                if (b && b.customConfig != null) a.config.customConfig = b.customConfig;
                i(a) || a.fireOnce("customConfigLoaded")
            }

            function f(a) { CKEDITOR.skin.loadPart("editor", function() { h(a) }) }

            function h(a) { CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) { var d = a.config.title;
                    a.langCode = b;
                    a.lang = CKEDITOR.tools.prototypedCopy(c);
                    a.title = typeof d == "string" || d === false ? d : [a.lang.editor, a.name].join(", "); if (!a.config.contentsLangDirection) a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                    a.fire("langLoaded");
                    k(a) }) }

            function k(a) {
                a.getStylesSet(function(b) {
                    a.once("loaded",
                        function() { a.fire("stylesSet", { styles: b }) }, null, null, 1);
                    g(a)
                })
            }

            function g(a) {
                var b = a.config,
                    c = b.plugins,
                    d = b.extraPlugins,
                    g = b.removePlugins;
                if (d) var f = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                    c = c.replace(f, ""),
                    c = c + ("," + d);
                if (g) var e = RegExp("(?:^|,)(?:" + g.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                    c = c.replace(e, "");
                CKEDITOR.env.air && (c = c + ",adobeair");
                CKEDITOR.plugins.load(c.split(","), function(c) {
                    var d = [],
                        g = [],
                        f = [];
                    a.plugins = c;
                    for (var i in c) {
                        var h = c[i],
                            j = h.lang,
                            k = null,
                            m = h.requires,
                            l;
                        CKEDITOR.tools.isArray(m) && (m = m.join(","));
                        if (m && (l = m.match(e)))
                            for (; m = l.pop();) CKEDITOR.tools.setTimeout(function(a, b) { throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.'); }, 0, null, [m, i]);
                        if (j && !a.lang[i]) {
                            j.split && (j = j.split(","));
                            if (CKEDITOR.tools.indexOf(j, a.langCode) >= 0) k = a.langCode;
                            else { k = a.langCode.replace(/-.*/, "");
                                k = k != a.langCode && CKEDITOR.tools.indexOf(j, k) >= 0 ? k : CKEDITOR.tools.indexOf(j, "en") >= 0 ? "en" : j[0] }
                            if (!h.langEntries ||
                                !h.langEntries[k]) f.push(CKEDITOR.getUrl(h.path + "lang/" + k + ".js"));
                            else { a.lang[i] = h.langEntries[k];
                                k = null }
                        }
                        g.push(k);
                        d.push(h)
                    }
                    CKEDITOR.scriptLoader.load(f, function() {
                        for (var c = ["beforeInit", "init", "afterInit"], f = 0; f < c.length; f++)
                            for (var e = 0; e < d.length; e++) { var i = d[e];
                                f === 0 && (g[e] && i.lang && i.langEntries) && (a.lang[i.name] = i.langEntries[g[e]]); if (i[c[f]]) i[c[f]](a) } a.fireOnce("pluginsLoaded");
                        b.keystrokes && a.setKeystroke(a.config.keystrokes);
                        for (e = 0; e < a.config.blockedKeystrokes.length; e++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[e]] =
                            1;
                        a.status = "loaded";
                        a.fireOnce("loaded");
                        CKEDITOR.fire("instanceLoaded", null, a)
                    })
                })
            }

            function m() { var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) { var b = this.getData();
                    this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                    a.is("textarea") ? a.setValue(b) : a.setHtml(b); return true } return false } a.prototype = CKEDITOR.editor.prototype;
            CKEDITOR.editor = a;
            var p = 0,
                q = {};
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                addCommand: function(a, b) {
                    b.name = a.toLowerCase();
                    var d = new CKEDITOR.command(this,
                        b);
                    this.mode && c(this, d);
                    return this.commands[a] = d
                },
                _attachToForm: function() {
                    function a(d) { b.updateElement();
                        b._.required && (!c.getValue() && b.fire("required") === false) && d.data.preventDefault() }
                    var b = this,
                        c = b.element,
                        d = new CKEDITOR.dom.element(c.$.form);
                    if (c.is("textarea") && d) {
                        d.on("submit", a);
                        if (d.$.submit && d.$.submit.call && d.$.submit.apply) d.$.submit = CKEDITOR.tools.override(d.$.submit, function(b) { return function() { a();
                                b.apply ? b.apply(this) : b() } });
                        b.on("destroy", function() {
                            d.removeListener("submit",
                                a)
                        })
                    }
                },
                destroy: function(a) { this.fire("beforeDestroy");!a && m.call(this);
                    this.editable(null);
                    this.filter.destroy();
                    delete this.filter;
                    delete this.activeFilter;
                    this.status = "destroyed";
                    this.fire("destroy");
                    this.removeAllListeners();
                    CKEDITOR.remove(this);
                    CKEDITOR.fire("instanceDestroyed", null, this) },
                elementPath: function(a) { if (!a) { a = this.getSelection(); if (!a) return null;
                        a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null },
                createRange: function() {
                    var a = this.editable();
                    return a ?
                        new CKEDITOR.dom.range(a) : null
                },
                execCommand: function(a, b) { var c = this.getCommand(a),
                        d = { name: a, commandData: b, command: c }; if (c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== false) { d.returnValue = c.exec(d.commandData); if (!c.async && this.fire("afterCommandExec", d) !== false) return d.returnValue } return false },
                getCommand: function(a) { return this.commands[a] },
                getData: function(a) {
                    !a && this.fire("beforeGetData");
                    var b = this._.data;
                    if (typeof b != "string") b = (b = this.element) && this.elementMode ==
                        CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                    b = { dataValue: b };
                    !a && this.fire("getData", b);
                    return b.dataValue
                },
                getSnapshot: function() { var a = this.fire("getSnapshot"); if (typeof a != "string") a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""; return a },
                loadSnapshot: function(a) { this.fire("loadSnapshot", a) },
                setData: function(a, b, c) {
                    var d = true,
                        g = b;
                    if (b && typeof b == "object") { c = b.internal;
                        g = b.callback;
                        d = !b.noSnapshot }!c &&
                        d && this.fire("saveSnapshot");
                    if (g || !c) this.once("dataReady", function(a) {!c && d && this.fire("saveSnapshot");
                        g && g.call(a.editor) });
                    a = { dataValue: a };
                    !c && this.fire("setData", a);
                    this._.data = a.dataValue;
                    !c && this.fire("afterSetData", a)
                },
                setReadOnly: function(a) { a = a == null || a; if (this.readOnly != a) { this.readOnly = a;
                        this.keystrokeHandler.blockedKeystrokes[8] = +a;
                        this.editable().setReadOnly(a);
                        this.fire("readOnly") } },
                insertHtml: function(a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) },
                insertText: function(a) {
                    this.fire("insertText",
                        a)
                },
                insertElement: function(a) { this.fire("insertElement", a) },
                getSelectedHtml: function(a) { var b = this.editable(),
                        c = this.getSelection(),
                        c = c && c.getRanges(); if (!b || !c || c.length === 0) return null;
                    b = b.getHtmlFromRange(c[0]); return a ? b.getHtml() : b },
                extractSelectedHtml: function(a, b) { var c = this.editable(),
                        d = this.getSelection().getRanges(); if (!c || d.length === 0) return null;
                    d = d[0];
                    c = c.extractHtmlFromRange(d, b);
                    b || this.getSelection().selectRanges([d]); return a ? c.getHtml() : c },
                focus: function() { this.fire("beforeFocus") },
                checkDirty: function() { return this.status == "ready" && this._.previousValue !== this.getSnapshot() },
                resetDirty: function() { this._.previousValue = this.getSnapshot() },
                updateElement: function() { return m.call(this) },
                setKeystroke: function() { for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                            [].slice.call(arguments, 0)
                        ], c, d, g = b.length; g--;) { c = b[g];
                        d = 0; if (CKEDITOR.tools.isArray(c)) { d = c[1];
                            c = c[0] } d ? a[c] = d : delete a[c] } },
                addFeature: function(a) { return this.filter.addFeature(a) },
                setActiveFilter: function(a) { if (!a) a = this.filter; if (this.activeFilter !== a) { this.activeFilter = a;
                        this.fire("activeFilterChange");
                        a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, true)) } },
                setActiveEnterMode: function(a, b) {
                    a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
                    b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                    if (this.activeEnterMode != a || this.activeShiftEnterMode != b) {
                        this.activeEnterMode =
                            a;
                        this.activeShiftEnterMode = b;
                        this.fire("activeEnterModeChange")
                    }
                },
                showNotification: function(a) { alert(a) }
            })
        }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } },
        function() {
            var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
                e = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 };
            CKEDITOR.htmlParser.prototype = {
                onTagOpen: function() {},
                onTagClose: function() {},
                onText: function() {},
                onCDATA: function() {},
                onComment: function() {},
                parse: function(b) {
                    for (var c, d, i = 0, j; c = this._.htmlPartsRegex.exec(b);) {
                        d = c.index;
                        if (d > i) { i = b.substring(i, d); if (j) j.push(i);
                            else this.onText(i) } i = this._.htmlPartsRegex.lastIndex;
                        if (d = c[1]) {
                            d = d.toLowerCase();
                            if (j && CKEDITOR.dtd.$cdata[d]) {
                                this.onCDATA(j.join(""));
                                j = null
                            }
                            if (!j) { this.onTagClose(d); continue }
                        }
                        if (j) j.push(c[0]);
                        else if (d = c[3]) { d = d.toLowerCase(); if (!/="/.test(d)) { var f = {},
                                    h, k = c[4];
                                c = !!c[5]; if (k)
                                    for (; h = a.exec(k);) { var g = h[1].toLowerCase();
                                        h = h[2] || h[3] || h[4] || "";
                                        f[g] = !h && e[g] ? g : CKEDITOR.tools.htmlDecodeAttr(h) } this.onTagOpen(d, f, c);!j && CKEDITOR.dtd.$cdata[d] && (j = []) } } else if (d = c[2]) this.onComment(d)
                    }
                    if (b.length > i) this.onText(b.substring(i, b.length))
                }
            }
        }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function() { this._ = { output: [] } },
            proto: {
                openTag: function(a) { this._.output.push("<", a) },
                openTagClose: function(a, e) { e ? this._.output.push(" />") : this._.output.push(">") },
                attribute: function(a, e) { typeof e == "string" && (e = CKEDITOR.tools.htmlEncodeAttr(e));
                    this._.output.push(" ", a, '="', e, '"') },
                closeTag: function(a) { this._.output.push("</", a, ">") },
                text: function(a) { this._.output.push(a) },
                comment: function(a) { this._.output.push("<\!--", a, "--\>") },
                write: function(a) { this._.output.push(a) },
                reset: function() { this._.output = [];
                    this._.indent = false },
                getHtml: function(a) {
                    var e =
                        this._.output.join("");
                    a && this.reset();
                    return e
                }
            }
        }), "use strict",
        function() {
            CKEDITOR.htmlParser.node = function() {};
            CKEDITOR.htmlParser.node.prototype = {
                remove: function() { var a = this.parent.children,
                        e = CKEDITOR.tools.indexOf(a, this),
                        b = this.previous,
                        c = this.next;
                    b && (b.next = c);
                    c && (c.previous = b);
                    a.splice(e, 1);
                    this.parent = null },
                replaceWith: function(a) {
                    var e = this.parent.children,
                        b = CKEDITOR.tools.indexOf(e, this),
                        c = a.previous = this.previous,
                        d = a.next = this.next;
                    c && (c.next = a);
                    d && (d.previous = a);
                    e[b] = a;
                    a.parent = this.parent;
                    this.parent = null
                },
                insertAfter: function(a) { var e = a.parent.children,
                        b = CKEDITOR.tools.indexOf(e, a),
                        c = a.next;
                    e.splice(b + 1, 0, this);
                    this.next = a.next;
                    this.previous = a;
                    a.next = this;
                    c && (c.previous = this);
                    this.parent = a.parent },
                insertBefore: function(a) { var e = a.parent.children,
                        b = CKEDITOR.tools.indexOf(e, a);
                    e.splice(b, 0, this);
                    this.next = a;
                    (this.previous = a.previous) && (a.previous.next = this);
                    a.previous = this;
                    this.parent = a.parent },
                getAscendant: function(a) {
                    var e = typeof a == "function" ? a : typeof a == "string" ? function(b) {
                            return b.name ==
                                a
                        } : function(b) { return b.name in a },
                        b = this.parent;
                    for (; b && b.type == CKEDITOR.NODE_ELEMENT;) { if (e(b)) return b;
                        b = b.parent }
                    return null
                },
                wrapWith: function(a) { this.replaceWith(a);
                    a.add(this); return a },
                getIndex: function() { return CKEDITOR.tools.indexOf(this.parent.children, this) },
                getFilterContext: function(a) { return a || {} }
            }
        }(), "use strict", CKEDITOR.htmlParser.comment = function(a) { this.value = a;
            this._ = { isBlockLike: false } }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function(a, e) { var b = this.value; if (!(b = a.onComment(e, b, this))) { this.remove(); return false } if (typeof b != "string") { this.replaceWith(b); return false } this.value = b; return true }, writeHtml: function(a, e) { e && this.filter(e);
                a.comment(this.value) } }), "use strict",
        function() {
            CKEDITOR.htmlParser.text = function(a) { this.value = a;
                this._ = { isBlockLike: false } };
            CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_TEXT,
                filter: function(a,
                    e) { if (!(this.value = a.onText(e, this.value, this))) { this.remove(); return false } },
                writeHtml: function(a, e) { e && this.filter(e);
                    a.text(this.value) }
            })
        }(), "use strict",
        function() { CKEDITOR.htmlParser.cdata = function(a) { this.value = a };
            CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function() {}, writeHtml: function(a) { a.write(this.value) } }) }(), "use strict", CKEDITOR.htmlParser.fragment = function() {
            this.children = [];
            this.parent = null;
            this._ = {
                isBlockLike: true,
                hasInlineStarted: false
            }
        },
        function() {
            function a(a) { return a.attributes["data-cke-survive"] ? false : a.name == "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] }
            var e = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
                b = { ol: 1, ul: 1 },
                c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }),
                d = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" };
            CKEDITOR.htmlParser.fragment.fromHtml =
                function(i, j, f) {
                    function h(a) { var b; if (l.length > 0)
                            for (var c = 0; c < l.length; c++) { var d = l[c],
                                    g = d.name,
                                    f = CKEDITOR.dtd[g],
                                    e = t.name && CKEDITOR.dtd[t.name]; if ((!e || e[g]) && (!a || !f || f[a] || !CKEDITOR.dtd[a])) { if (!b) { k();
                                        b = 1 } d = d.clone();
                                    d.parent = t;
                                    t = d;
                                    l.splice(c, 1);
                                    c-- } else if (g == t.name) { m(t, t.parent, 1);
                                    c-- } } }

                    function k() { for (; s.length;) m(s.shift(), t) }

                    function g(a) {
                        if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                            var b = a.children.length,
                                c = a.children[b - 1],
                                d;
                            if (c && c.type == CKEDITOR.NODE_TEXT)(d = CKEDITOR.tools.rtrim(c.value)) ?
                                c.value = d : a.children.length = b - 1
                        }
                    }

                    function m(b, c, d) { var c = c || t || n,
                            e = t; if (b.previous === void 0) { if (p(c, b)) { t = c;
                                o.onTagOpen(f, {});
                                b.returnPoint = c = t } g(b);
                            (!a(b) || b.children.length) && c.add(b);
                            b.name == "pre" && (v = false);
                            b.name == "textarea" && (w = false) } if (b.returnPoint) { t = b.returnPoint;
                            delete b.returnPoint } else t = d ? c : e }

                    function p(a, b) {
                        if ((a == n || a.name == "body") && f && (!a.name || CKEDITOR.dtd[a.name][f])) {
                            var c, d;
                            return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline &&
                                !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                        }
                    }

                    function q(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false }
                    var o = new CKEDITOR.htmlParser,
                        n = j instanceof CKEDITOR.htmlParser.element ? j : typeof j == "string" ? new CKEDITOR.htmlParser.element(j) : new CKEDITOR.htmlParser.fragment,
                        l = [],
                        s = [],
                        t = n,
                        w = n.name == "textarea",
                        v = n.name == "pre";
                    o.onTagOpen = function(d, g, f, i) {
                        g = new CKEDITOR.htmlParser.element(d, g);
                        if (g.isUnknown && f) g.isEmpty =
                            true;
                        g.isOptionalClose = i;
                        if (a(g)) l.push(g);
                        else {
                            if (d == "pre") v = true;
                            else { if (d == "br" && v) { t.add(new CKEDITOR.htmlParser.text("\n")); return } d == "textarea" && (w = true) }
                            if (d == "br") s.push(g);
                            else {
                                for (;;) {
                                    i = (f = t.name) ? CKEDITOR.dtd[f] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
                                    if (!g.isUnknown && !t.isUnknown && !i[d])
                                        if (t.isOptionalClose) o.onTagClose(f);
                                        else if (d in b && f in b) {
                                        f = t.children;
                                        (f = f[f.length - 1]) && f.name == "li" || m(f = new CKEDITOR.htmlParser.element("li"), t);
                                        !g.returnPoint && (g.returnPoint = t);
                                        t = f
                                    } else if (d in CKEDITOR.dtd.$listItem && !q(d, f)) o.onTagOpen(d == "li" ? "ul" : "dl", {}, 0, 1);
                                    else if (f in e && !q(d, f)) {!g.returnPoint && (g.returnPoint = t);
                                        t = t.parent } else { f in CKEDITOR.dtd.$inline && l.unshift(t); if (t.parent) m(t, t.parent, 1);
                                        else { g.isOrphan = 1; break } } else break
                                }
                                h(d);
                                k();
                                g.parent = t;
                                g.isEmpty ? m(g) : t = g
                            }
                        }
                    };
                    o.onTagClose = function(a) {
                        for (var b = l.length - 1; b >= 0; b--)
                            if (a == l[b].name) { l.splice(b, 1); return }
                        for (var c = [], d = [], g = t; g != n && g.name != a;) { g._.isBlockLike || d.unshift(g);
                            c.push(g);
                            g = g.returnPoint || g.parent }
                        if (g !=
                            n) { for (b = 0; b < c.length; b++) { var e = c[b];
                                m(e, e.parent) } t = g;
                            g._.isBlockLike && k();
                            m(g, g.parent); if (g == t) t = t.parent;
                            l = l.concat(d) } a == "body" && (f = false)
                    };
                    o.onText = function(a) {
                        if ((!t._.hasInlineStarted || s.length) && !v && !w) { a = CKEDITOR.tools.ltrim(a); if (a.length === 0) return }
                        var b = t.name,
                            g = b ? CKEDITOR.dtd[b] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
                        if (!w && !g["#"] && b in e) { o.onTagOpen(d[b] || "");
                            o.onText(a) } else {
                            k();
                            h();
                            !v && !w && (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                            a = new CKEDITOR.htmlParser.text(a);
                            if (p(t, a)) this.onTagOpen(f, {}, 0, 1);
                            t.add(a)
                        }
                    };
                    o.onCDATA = function(a) { t.add(new CKEDITOR.htmlParser.cdata(a)) };
                    o.onComment = function(a) { k();
                        h();
                        t.add(new CKEDITOR.htmlParser.comment(a)) };
                    o.parse(i);
                    for (k(); t != n;) m(t, t.parent, 1);
                    g(n);
                    return n
                };
            CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
                add: function(a, b) {
                    isNaN(b) && (b = this.children.length);
                    var c = b > 0 ? this.children[b - 1] : null;
                    if (c) {
                        if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT) {
                            c.value = CKEDITOR.tools.rtrim(c.value);
                            if (c.value.length ===
                                0) { this.children.pop();
                                this.add(a); return }
                        }
                        c.next = a
                    }
                    a.previous = c;
                    a.parent = this;
                    this.children.splice(b, 0, a);
                    if (!this._.hasInlineStarted) this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
                },
                filter: function(a, b) { b = this.getFilterContext(b);
                    a.onRoot(b, this);
                    this.filterChildren(a, false, b) },
                filterChildren: function(a, b, c) {
                    if (this.childrenFilteredBy != a.id) {
                        c = this.getFilterContext(c);
                        if (b && !this.parent) a.onRoot(c, this);
                        this.childrenFilteredBy = a.id;
                        for (b = 0; b < this.children.length; b++) this.children[b].filter(a,
                            c) === false && b--
                    }
                },
                writeHtml: function(a, b) { b && this.filter(b);
                    this.writeChildrenHtml(a) },
                writeChildrenHtml: function(a, b, c) { var d = this.getFilterContext(); if (c && !this.parent && b) b.onRoot(d, this);
                    b && this.filterChildren(b, false, d);
                    b = 0;
                    c = this.children; for (d = c.length; b < d; b++) c[b].writeHtml(a) },
                forEach: function(a, b, c) { if (!c && (!b || this.type == b)) var d = a(this); if (d !== false)
                        for (var c = this.children, e = 0; e < c.length; e++) { d = c[e];
                            d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : (!b || d.type == b) && a(d) } },
                getFilterContext: function(a) {
                    return a || {}
                }
            }
        }(), "use strict",
        function() {
            function a() { this.rules = [] }

            function e(b, c, d, e) { var j, f; for (j in c) {
                    (f = b[j]) || (f = b[j] = new a);
                    f.add(c[j], d, e) } } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                $: function(b) { this.id = CKEDITOR.tools.getNextNumber();
                    this.elementNameRules = new a;
                    this.attributeNameRules = new a;
                    this.elementsRules = {};
                    this.attributesRules = {};
                    this.textRules = new a;
                    this.commentRules = new a;
                    this.rootRules = new a;
                    b && this.addRules(b, 10) },
                proto: {
                    addRules: function(a, c) {
                        var d;
                        if (typeof c == "number") d =
                            c;
                        else if (c && "priority" in c) d = c.priority;
                        typeof d != "number" && (d = 10);
                        typeof c != "object" && (c = {});
                        a.elementNames && this.elementNameRules.addMany(a.elementNames, d, c);
                        a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, d, c);
                        a.elements && e(this.elementsRules, a.elements, d, c);
                        a.attributes && e(this.attributesRules, a.attributes, d, c);
                        a.text && this.textRules.add(a.text, d, c);
                        a.comment && this.commentRules.add(a.comment, d, c);
                        a.root && this.rootRules.add(a.root, d, c)
                    },
                    applyTo: function(a) { a.filter(this) },
                    onElementName: function(a,
                        c) { return this.elementNameRules.execOnName(a, c) },
                    onAttributeName: function(a, c) { return this.attributeNameRules.execOnName(a, c) },
                    onText: function(a, c, d) { return this.textRules.exec(a, c, d) },
                    onComment: function(a, c, d) { return this.commentRules.exec(a, c, d) },
                    onRoot: function(a, c) { return this.rootRules.exec(a, c) },
                    onElement: function(a, c) {
                        for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], e, j = 0; j < 3; j++)
                            if (e = d[j]) {
                                e = e.exec(a, c, this);
                                if (e === false) return null;
                                if (e && e != c) return this.onNode(a,
                                    e);
                                if (c.parent && !c.name) break
                            }
                        return c
                    },
                    onNode: function(a, c) { var d = c.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null },
                    onAttribute: function(a, c, d, e) { return (d = this.attributesRules[d]) ? d.exec(a, e, c, this) : e }
                }
            });
            CKEDITOR.htmlParser.filterRulesGroup = a;
            a.prototype = {
                add: function(a, c, d) {
                    this.rules.splice(this.findIndex(c), 0, {
                        value: a,
                        priority: c,
                        options: d
                    })
                },
                addMany: function(a, c, d) { for (var e = [this.findIndex(c), 0], j = 0, f = a.length; j < f; j++) e.push({ value: a[j], priority: c, options: d });
                    this.rules.splice.apply(this.rules, e) },
                findIndex: function(a) { for (var c = this.rules, d = c.length - 1; d >= 0 && a < c[d].priority;) d--; return d + 1 },
                exec: function(a, c) {
                    var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
                        e = Array.prototype.slice.call(arguments, 1),
                        j = this.rules,
                        f = j.length,
                        h, k, g, m;
                    for (m = 0; m < f; m++) {
                        if (d) { h = c.type;
                            k = c.name } g = j[m];
                        if (!(a.nonEditable &&
                                !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable)) { g = g.value.apply(null, e); if (g === false || d && g && (g.name != k || g.type != h)) return g;
                            g != null && (e[0] = c = g) }
                    }
                    return c
                },
                execOnName: function(a, c) { for (var d = 0, e = this.rules, j = e.length, f; c && d < j; d++) { f = e[d];!(a.nonEditable && !f.options.applyToAll || a.nestedEditable && f.options.excludeNestedEditable) && (c = c.replace(f.value[0], f.value[1])) } return c }
            }
        }(),
        function() {
            function a(a, g) {
                function f(a) {
                    return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") :
                        new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 })
                }

                function e(a, d) {
                    return function(g) {
                        if (g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var e = [],
                                k = b(g),
                                j, m;
                            if (k)
                                for (h(k, 1) && e.push(k); k;) { if (i(k) && (j = c(k)) && h(j))
                                        if ((m = c(j)) && !i(m)) e.push(j);
                                        else { f(u).insertAfter(j);
                                            j.remove() }
                                    k = k.previous }
                            for (k = 0; k < e.length; k++) e[k].remove();
                            if (e = !a || (typeof d == "function" ? d(g) : d) !== false)
                                if (!u && !CKEDITOR.env.needsBrFiller && g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) e = false;
                                else if (!u && !CKEDITOR.env.needsBrFiller && (document.documentMode >
                                    7 || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem)) e = false;
                            else { e = b(g);
                                e = !e || g.name == "form" && e.name == "input" } e && g.add(f(a))
                        }
                    }
                }

                function h(a, b) {
                    if ((!u || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"]) return true;
                    var c;
                    if (a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(l))) {
                        if (c.index) {
                            (new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a);
                            a.value = c[0] }
                        if (!CKEDITOR.env.needsBrFiller && u && (!b || a.parent.name in m)) return true;
                        if (!u)
                            if ((c = a.previous) && c.name == "br" || !c || i(c)) return true
                    }
                    return false
                }
                var k = { elements: {} },
                    u = g == "html",
                    m = CKEDITOR.tools.extend({}, v),
                    E;
                for (E in m) "#" in t[E] || delete m[E];
                for (E in m) k.elements[E] = e(u, a.config.fillEmptyBlocks);
                k.root = e(u, false);
                k.elements.br = function(a) {
                    return function(b) {
                        if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var g = b.attributes;
                            if ("data-cke-bogus" in g || "data-cke-eol" in g) delete g["data-cke-bogus"];
                            else {
                                for (g = b.next; g && d(g);) g = g.next;
                                var e = c(b);
                                !g && i(b.parent) ? j(b.parent,
                                    f(a)) : i(g) && (e && !i(e)) && f(a).insertBefore(g)
                            }
                        }
                    }
                }(u);
                return k
            }

            function e(a, b) { return a != CKEDITOR.ENTER_BR && b !== false ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : false }

            function b(a) { for (a = a.children[a.children.length - 1]; a && d(a);) a = a.previous; return a }

            function c(a) { for (a = a.previous; a && d(a);) a = a.previous; return a }

            function d(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] }

            function i(a) {
                return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
                    v || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
            }

            function j(a, b) { var c = a.children[a.children.length - 1];
                a.children.push(b);
                b.parent = a; if (c) { c.next = b;
                    b.previous = c } }

            function f(a) { a = a.attributes;
                a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
                a.contenteditable = "false" }

            function h(a) { a = a.attributes; switch (a["data-cke-editable"]) {
                    case "true":
                        a.contenteditable = "true"; break;
                    case "1":
                        delete a.contenteditable } }

            function k(a) {
                return a.replace(z, function(a, b, c) {
                    return "<" + b + c.replace(B,
                        function(a, b) { return A.test(b) && c.indexOf("data-cke-saved-" + b) == -1 ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + ">"
                })
            }

            function g(a, b) { return a.replace(b, function(a, b, c) { a.indexOf("<textarea") === 0 && (a = b + q(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"); return "<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>" }) }

            function m(a) { return a.replace(G, function(a, b) { return decodeURIComponent(b) }) }

            function p(a) {
                return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) {
                    return "<\!--" +
                        s + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\>"
                })
            }

            function q(a) { return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) { return decodeURIComponent(b) }) }

            function o(a, b) { var c = b._.dataStore; return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) { return c && c[b] || "" }) }

            function n(a, b) {
                for (var c = [], d = b.config.protectedSource, g = b._.dataStore || (b._.dataStore = { id: 1 }), f = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g,
                        d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) { return "<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>" }), e = 0; e < d.length; e++) a = a.replace(d[e], function(a) { a = a.replace(f, function(a, b, d) { return c[d] }); return /cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>" });
                a = a.replace(f, function(a, b, d) { return "<\!--" + s + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>" });
                a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,
                    function(a) { return a.replace(/<\!--\{cke_protected\}([^>]*)--\>/g, function(a, b) { g[g.id] = decodeURIComponent(b); return "{cke_protected_" + g.id++ + "}" }) });
                return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, c, d, g) { return "<" + c + d + ">" + o(q(g), b) + "</" + c + ">" })
            }
            CKEDITOR.htmlDataProcessor = function(b) {
                var c, d, f = this;
                this.editor = b;
                this.dataFilter = c = new CKEDITOR.htmlParser.filter;
                this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
                this.writer = new CKEDITOR.htmlParser.basicWriter;
                c.addRules(x);
                c.addRules(u, { applyToAll: true });
                c.addRules(a(b, "data"), { applyToAll: true });
                d.addRules(r);
                d.addRules(y, { applyToAll: true });
                d.addRules(a(b, "html"), { applyToAll: true });
                b.on("toHtml", function(a) {
                    var a = a.data,
                        c = a.dataValue,
                        d, c = n(c, b),
                        c = g(c, C),
                        c = k(c),
                        c = g(c, D),
                        c = c.replace(E, "$1cke:$2"),
                        c = c.replace(L, "<cke:$1$2></cke:$1>"),
                        c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                        c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                    d = a.context || b.editable().getName();
                    var f;
                    if (CKEDITOR.env.ie &&
                        CKEDITOR.env.version < 9 && d == "pre") { d = "div";
                        c = "<pre>" + c + "</pre>";
                        f = 1 } d = b.document.createElement(d);
                    d.setHtml("a" + c);
                    c = d.getHtml().substr(1);
                    c = c.replace(RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
                    f && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
                    c = c.replace(H, "$1$2");
                    c = m(c);
                    c = q(c);
                    d = a.fixForBody === false ? false : e(a.enterMode, b.config.autoParagraph);
                    c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, d);
                    if (d) { f = c; if (!f.children.length && CKEDITOR.dtd[f.name][d]) { d = new CKEDITOR.htmlParser.element(d);
                            f.add(d) } } a.dataValue =
                        c
                }, null, null, 5);
                b.on("toHtml", function(a) { a.data.filter.applyTo(a.data.dataValue, true, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6);
                b.on("toHtml", function(a) { a.data.dataValue.filterChildren(f.dataFilter, true) }, null, null, 10);
                b.on("toHtml", function(a) { var a = a.data,
                        b = a.dataValue,
                        c = new CKEDITOR.htmlParser.basicWriter;
                    b.writeChildrenHtml(c);
                    b = c.getHtml(true);
                    a.dataValue = p(b) }, null, null, 15);
                b.on("toDataFormat", function(a) {
                    var c = a.data.dataValue;
                    a.data.enterMode != CKEDITOR.ENTER_BR &&
                        (c = c.replace(/^<br *\/?>/i, ""));
                    a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, e(a.data.enterMode, b.config.autoParagraph))
                }, null, null, 5);
                b.on("toDataFormat", function(a) { a.data.dataValue.filterChildren(f.htmlFilter, true) }, null, null, 10);
                b.on("toDataFormat", function(a) { a.data.filter.applyTo(a.data.dataValue, false, true) }, null, null, 11);
                b.on("toDataFormat", function(a) {
                    var c = a.data.dataValue,
                        d = f.writer;
                    d.reset();
                    c.writeChildrenHtml(d);
                    c = d.getHtml(true);
                    c = q(c);
                    c = o(c, b);
                    a.data.dataValue =
                        c
                }, null, null, 15)
            };
            CKEDITOR.htmlDataProcessor.prototype = {
                toHtml: function(a, b, c, d) { var g = this.editor,
                        f, e, i, h; if (b && typeof b == "object") { f = b.context;
                        c = b.fixForBody;
                        d = b.dontFilter;
                        e = b.filter;
                        i = b.enterMode;
                        h = b.protectedWhitespaces } else f = b;!f && f !== null && (f = g.editable().getName()); return g.fire("toHtml", { dataValue: a, context: f, fixForBody: c, dontFilter: d, filter: e || g.filter, enterMode: i || g.enterMode, protectedWhitespaces: h }).dataValue },
                toDataFormat: function(a, b) {
                    var c, d, g;
                    if (b) { c = b.context;
                        d = b.filter;
                        g = b.enterMode }!c &&
                        c !== null && (c = this.editor.editable().getName());
                    return this.editor.fire("toDataFormat", { dataValue: a, filter: d || this.editor.filter, context: c, enterMode: g || this.editor.enterMode }).dataValue
                }
            };
            var l = /(?:&nbsp;|\xa0)$/,
                s = "{cke_protected}",
                t = CKEDITOR.dtd,
                w = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
                v = CKEDITOR.tools.extend({}, t.$blockLimit, t.$block),
                x = { elements: { input: f, textarea: f } },
                u = { attributeNames: [
                        [/^on/, "data-cke-pa-on"],
                        [/^data-cke-expando$/, ""]
                    ] },
                r = {
                    elements: {
                        embed: function(a) {
                            var b = a.parent;
                            if (b && b.name == "object") { var c = b.attributes.width,
                                    b = b.attributes.height; if (c) a.attributes.width = c; if (b) a.attributes.height = b }
                        },
                        a: function(a) { if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"]) return false }
                    }
                },
                y = {
                    elementNames: [
                        [/^cke:/, ""],
                        [/^\?xml:namespace$/, ""]
                    ],
                    attributeNames: [
                        [/^data-cke-(saved|pa)-/, ""],
                        [/^data-cke-.*/, ""],
                        ["hidefocus", ""]
                    ],
                    elements: {
                        $: function(a) {
                            var b = a.attributes;
                            if (b) {
                                if (b["data-cke-temp"]) return false;
                                for (var c = ["name", "href", "src"], d, g = 0; g < c.length; g++) {
                                    d =
                                        "data-cke-saved-" + c[g];
                                    d in b && delete b[c[g]]
                                }
                            }
                            return a
                        },
                        table: function(a) { a.children.slice(0).sort(function(a, b) { var c, d; if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) { c = CKEDITOR.tools.indexOf(w, a.name);
                                    d = CKEDITOR.tools.indexOf(w, b.name) } if (!(c > -1 && d > -1 && c != d)) { c = a.parent ? a.getIndex() : -1;
                                    d = b.parent ? b.getIndex() : -1 } return c > d ? 1 : -1 }) },
                        param: function(a) { a.children = [];
                            a.isEmpty = true; return a },
                        span: function(a) { a.attributes["class"] == "Apple-style-span" && delete a.name },
                        html: function(a) {
                            delete a.attributes.contenteditable;
                            delete a.attributes["class"]
                        },
                        body: function(a) { delete a.attributes.spellcheck;
                            delete a.attributes.contenteditable },
                        style: function(a) { var b = a.children[0]; if (b && b.value) b.value = CKEDITOR.tools.trim(b.value); if (!a.attributes.type) a.attributes.type = "text/css" },
                        title: function(a) { var b = a.children[0];!b && j(a, b = new CKEDITOR.htmlParser.text);
                            b.value = a.attributes["data-cke-title"] || "" },
                        input: h,
                        textarea: h
                    },
                    attributes: { "class": function(a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false } }
                };
            if (CKEDITOR.env.ie) y.attributes.style = function(a) { return a.replace(/(^|;)([^\:]+)/g, function(a) { return a.toLowerCase() }) };
            var z = /<(a|area|img|input|source)\b([^>]*)>/gi,
                B = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
                A = /^(href|src|name)$/i,
                D = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
                C = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
                G = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
                E = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
                H = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
                L = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
        }(), "use strict", CKEDITOR.htmlParser.element = function(a, e) { this.name = a;
            this.attributes = e || {};
            this.children = []; var b = a || "",
                c = b.match(/^cke:(.*)/);
            c && (b = c[1]);
            b = !(!CKEDITOR.dtd.$nonBodyContent[b] && !CKEDITOR.dtd.$block[b] && !CKEDITOR.dtd.$listItem[b] && !CKEDITOR.dtd.$tableContent[b] && !(CKEDITOR.dtd.$nonEditable[b] || b == "br"));
            this.isEmpty = !!CKEDITOR.dtd.$empty[a];
            this.isUnknown = !CKEDITOR.dtd[a];
            this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b } },
        CKEDITOR.htmlParser.cssStyle = function(a) {
            var e = {};
            ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, d) { c == "font-family" && (d = d.replace(/["']/g, ""));
                e[c.toLowerCase()] = d });
            return {
                rules: e,
                populate: function(a) { var c = this.toString(); if (c) a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c },
                toString: function() {
                    var a = [],
                        c;
                    for (c in e) e[c] && a.push(c, ":", e[c], ";");
                    return a.join("")
                }
            }
        },
        function() {
            function a(a) { return function(b) { return b.type == CKEDITOR.NODE_ELEMENT && (typeof a == "string" ? b.name == a : b.name in a) } }
            var e = function(a, b) { a = a[0];
                    b = b[0]; return a < b ? -1 : a > b ? 1 : 0 },
                b = CKEDITOR.htmlParser.fragment.prototype;
            CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_ELEMENT,
                add: b.add,
                clone: function() { return new CKEDITOR.htmlParser.element(this.name, this.attributes) },
                filter: function(a,
                    b) {
                    var e = this,
                        j, f, b = e.getFilterContext(b);
                    if (b.off) return true;
                    if (!e.parent) a.onRoot(b, e);
                    for (;;) { j = e.name; if (!(f = a.onElementName(b, j))) { this.remove(); return false } e.name = f; if (!(e = a.onElement(b, e))) { this.remove(); return false } if (e !== this) { this.replaceWith(e); return false } if (e.name == j) break; if (e.type != CKEDITOR.NODE_ELEMENT) { this.replaceWith(e); return false } if (!e.name) { this.replaceWithChildren(); return false } } j = e.attributes;
                    var h, k;
                    for (h in j) {
                        k = h;
                        for (f = j[h];;)
                            if (k = a.onAttributeName(b, h))
                                if (k != h) {
                                    delete j[h];
                                    h = k
                                } else break;
                        else { delete j[h]; break } k && ((f = a.onAttribute(b, e, k, f)) === false ? delete j[k] : j[k] = f)
                    }
                    e.isEmpty || this.filterChildren(a, false, b);
                    return true
                },
                filterChildren: b.filterChildren,
                writeHtml: function(a, b) { b && this.filter(b); var i = this.name,
                        j = [],
                        f = this.attributes,
                        h, k;
                    a.openTag(i, f); for (h in f) j.push([h, f[h]]);
                    a.sortAttributes && j.sort(e);
                    h = 0; for (k = j.length; h < k; h++) { f = j[h];
                        a.attribute(f[0], f[1]) } a.openTagClose(i, this.isEmpty);
                    this.writeChildrenHtml(a);
                    this.isEmpty || a.closeTag(i) },
                writeChildrenHtml: b.writeChildrenHtml,
                replaceWithChildren: function() { for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
                    this.remove() },
                forEach: b.forEach,
                getFirst: function(b) { if (!b) return this.children.length ? this.children[0] : null;
                    typeof b != "function" && (b = a(b)); for (var d = 0, e = this.children.length; d < e; ++d)
                        if (b(this.children[d])) return this.children[d]; return null },
                getHtml: function() { var a = new CKEDITOR.htmlParser.basicWriter;
                    this.writeChildrenHtml(a); return a.getHtml() },
                setHtml: function(a) {
                    for (var a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children,
                            b = 0, e = a.length; b < e; ++b) a[b].parent = this
                },
                getOuterHtml: function() { var a = new CKEDITOR.htmlParser.basicWriter;
                    this.writeHtml(a); return a.getHtml() },
                split: function(a) { for (var b = this.children.splice(a, this.children.length - a), e = this.clone(), j = 0; j < b.length; ++j) b[j].parent = e;
                    e.children = b; if (b[0]) b[0].previous = null; if (a > 0) this.children[a - 1].next = null;
                    this.parent.add(e, this.getIndex() + 1); return e },
                addClass: function(a) {
                    if (!this.hasClass(a)) {
                        var b = this.attributes["class"] || "";
                        this.attributes["class"] = b + (b ? " " :
                            "") + a
                    }
                },
                removeClass: function(a) { var b = this.attributes["class"]; if (b)(b = CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"] },
                hasClass: function(a) { var b = this.attributes["class"]; return !b ? false : RegExp("(?:^|\\s)" + a + "(?=\\s|$)").test(b) },
                getFilterContext: function(a) {
                    var b = [];
                    a || (a = { off: false, nonEditable: false, nestedEditable: false });
                    !a.off && this.attributes["data-cke-processor"] == "off" && b.push("off", true);
                    !a.nonEditable && this.attributes.contenteditable ==
                        "false" ? b.push("nonEditable", true) : a.nonEditable && (!a.nestedEditable && this.attributes.contenteditable == "true") && b.push("nestedEditable", true);
                    if (b.length)
                        for (var a = CKEDITOR.tools.copy(a), e = 0; e < b.length; e = e + 2) a[b[e]] = b[e + 1];
                    return a
                }
            }, true)
        }(),
        function() {
            var a = {},
                e = /{([^}]+)}/g,
                b = /([\\'])/g,
                c = /\n/g,
                d = /\r/g;
            CKEDITOR.template = function(i) {
                if (a[i]) this.output = a[i];
                else {
                    var j = i.replace(b, "\\$1").replace(c, "\\n").replace(d, "\\r").replace(e, function(a, b) {
                        return "',data['" + b + "']==undefined?'{" + b + "}':data['" +
                            b + "'],'"
                    });
                    this.output = a[i] = Function("data", "buffer", "return buffer?buffer.push('" + j + "'):['" + j + "'].join('');")
                }
            }
        }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function(a) {
            CKEDITOR.instances[a.name] = a;
            a.on("focus", function() { if (CKEDITOR.currentInstance != a) { CKEDITOR.currentInstance = a;
                    CKEDITOR.fire("currentInstance") } });
            a.on("blur", function() { if (CKEDITOR.currentInstance == a) { CKEDITOR.currentInstance = null;
                    CKEDITOR.fire("currentInstance") } });
            CKEDITOR.fire("instance", null, a)
        }, CKEDITOR.remove = function(a) { delete CKEDITOR.instances[a.name] },
        function() { var a = {};
            CKEDITOR.addTemplate = function(e, b) { var c = a[e]; if (c) return c;
                c = { name: e, source: b };
                CKEDITOR.fire("template", c); return a[e] = new CKEDITOR.template(c.source) };
            CKEDITOR.getTemplate = function(e) { return a[e] } }(),
        function() { var a = [];
            CKEDITOR.addCss = function(e) { a.push(e) };
            CKEDITOR.getCss = function() { return a.join("\n") } }(), CKEDITOR.on("instanceDestroyed", function() {
            CKEDITOR.tools.isEmpty(this.instances) &&
                CKEDITOR.fire("reset")
        }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0,
        function() {
            CKEDITOR.inline = function(a, e) {
                if (!CKEDITOR.env.isCompatible) return null;
                a = CKEDITOR.dom.element.get(a);
                if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
                var b = new CKEDITOR.editor(e, a, CKEDITOR.ELEMENT_MODE_INLINE),
                    c = a.is("textarea") ? a : null;
                if (c) {
                    b.setData(c.getValue(), null, true);
                    a = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' +
                        !!b.readOnly + '" class="cke_textarea_inline">' + c.getValue() + "</div>", CKEDITOR.document);
                    a.insertAfter(c);
                    c.hide();
                    c.$.form && b._attachToForm()
                } else b.setData(a.getHtml(), null, true);
                b.on("loaded", function() { b.fire("uiReady");
                    b.editable(a);
                    b.container = a;
                    b.ui.contentsElement = a;
                    b.setData(b.getData(1));
                    b.resetDirty();
                    b.fire("contentDom");
                    b.mode = "wysiwyg";
                    b.fire("mode");
                    b.status = "ready";
                    b.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, b) }, null, null, 1E4);
                b.on("destroy", function() {
                    if (c) {
                        b.container.clearCustomData();
                        b.container.remove();
                        c.show()
                    }
                    b.element.clearCustomData();
                    delete b.element
                });
                return b
            };
            CKEDITOR.inlineAll = function() { var a, e, b; for (b in CKEDITOR.dtd.$editable)
                    for (var c = CKEDITOR.document.getElementsByTag(b), d = 0, i = c.count(); d < i; d++) { a = c.getItem(d); if (a.getAttribute("contenteditable") == "true") { e = { element: a, config: {} };
                            CKEDITOR.fire("inline", e) !== false && CKEDITOR.inline(a, e.config) } } };
            CKEDITOR.domReady(function() {!CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
        }(), CKEDITOR.replaceClass = "ckeditor",
        function() {
            function a(a,
                d, i, j) {
                if (!CKEDITOR.env.isCompatible) return null;
                a = CKEDITOR.dom.element.get(a);
                if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
                var f = new CKEDITOR.editor(d, a, j);
                if (j == CKEDITOR.ELEMENT_MODE_REPLACE) { a.setStyle("visibility", "hidden");
                    f._.required = a.hasAttribute("required");
                    a.removeAttribute("required") } i && f.setData(i, null, true);
                f.on("loaded", function() {
                    b(f);
                    j == CKEDITOR.ELEMENT_MODE_REPLACE && (f.config.autoUpdateElement && a.$.form) && f._attachToForm();
                    f.setMode(f.config.startupMode, function() { f.resetDirty();
                        f.status = "ready";
                        f.fireOnce("instanceReady");
                        CKEDITOR.fire("instanceReady", null, f) })
                });
                f.on("destroy", e);
                return f
            }

            function e() { var a = this.container,
                    b = this.element; if (a) { a.clearCustomData();
                    a.remove() } if (b) { b.clearCustomData(); if (this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE) { b.show();
                        this._.required && b.setAttribute("required", "required") } delete this.element } }

            function b(a) {
                var b = a.name,
                    e = a.element,
                    j = a.elementMode,
                    f = a.fire("uiSpace", {
                        space: "top",
                        html: ""
                    }).html,
                    h = a.fire("uiSpace", { space: "bottom", html: "" }).html,
                    k = new CKEDITOR.template('<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application"' + (a.title ? ' aria-labelledby="cke_{name}_arialbl"' : "") + ">" + (a.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : "") + '<{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'),
                    b = CKEDITOR.dom.element.createFromHtml(k.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: f ? '<span id="' + a.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + f + "</span>" : "", contentId: a.ui.spaceId("contents"), bottomHtml: h ? '<span id="' + a.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + h + "</span>" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" }));
                if (j == CKEDITOR.ELEMENT_MODE_REPLACE) { e.hide();
                    b.insertAfter(e) } else e.append(b);
                a.container = b;
                a.ui.contentsElement = a.ui.space("contents");
                f && a.ui.space("top").unselectable();
                h && a.ui.space("bottom").unselectable();
                e = a.config.width;
                j = a.config.height;
                e && b.setStyle("width", CKEDITOR.tools.cssLength(e));
                j && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(j));
                b.disableContextMenu();
                CKEDITOR.env.webkit && b.on("focus", function() { a.focus() });
                a.fireOnce("uiReady")
            }
            CKEDITOR.replace = function(b, d) { return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
            CKEDITOR.appendTo = function(b,
                d, e) { return a(b, d, e, CKEDITOR.ELEMENT_MODE_APPENDTO) };
            CKEDITOR.replaceAll = function() { for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) { var e = null,
                        j = a[b]; if (j.name || j.id) { if (typeof arguments[0] == "string") { if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(j.className)) continue } else if (typeof arguments[0] == "function") { e = {}; if (arguments[0](j, e) === false) continue } this.replace(j, e) } } };
            CKEDITOR.editor.prototype.addMode = function(a, b) {
                (this._.modes || (this._.modes = {}))[a] = b };
            CKEDITOR.editor.prototype.setMode =
                function(a, b) {
                    var e = this,
                        j = this._.modes;
                    if (!(a == e.mode || !j || !j[a])) {
                        e.fire("beforeSetMode", a);
                        if (e.mode) { var f = e.checkDirty(),
                                j = e._.previousModeData,
                                h, k = 0;
                            e.fire("beforeModeUnload");
                            e.editable(0);
                            e._.previousMode = e.mode;
                            e._.previousModeData = h = e.getData(1); if (e.mode == "source" && j == h) { e.fire("lockSnapshot", { forceUpdate: true });
                                k = 1 } e.ui.space("contents").setHtml("");
                            e.mode = "" } else e._.previousModeData = e.getData(1);
                        this._.modes[a](function() {
                            e.mode = a;
                            f !== void 0 && !f && e.resetDirty();
                            k ? e.fire("unlockSnapshot") :
                                a == "wysiwyg" && e.fire("saveSnapshot");
                            setTimeout(function() { e.fire("mode");
                                b && b.call(e) }, 0)
                        })
                    }
                };
            CKEDITOR.editor.prototype.resize = function(a, b, e, j) {
                var f = this.container,
                    h = this.ui.space("contents"),
                    k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement,
                    j = j ? this.container.getFirst(function(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : f;
                j.setSize("width", a, true);
                k && (k.style.width = "1%");
                var g = (j.$.offsetHeight || 0) - (h.$.clientHeight || 0),
                    f = Math.max(b - (e ? 0 : g),
                        0),
                    b = e ? b + g : b;
                h.setStyle("height", f + "px");
                k && (k.style.width = "100%");
                this.fire("resize", { outerHeight: b, contentsHeight: f, outerWidth: a || j.getSize("width") })
            };
            CKEDITOR.editor.prototype.getResizable = function(a) { return a ? this.ui.space("contents") : this.container };
            CKEDITOR.domReady(function() { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
        }(), CKEDITOR.config.startupMode = "wysiwyg",
        function() {
            var a, e, b, c;

            function d(a) {
                var b = a.editor,
                    c = a.data.path,
                    d = c.blockLimit,
                    e = a.data.selection,
                    h = e.getRanges()[0],
                    k;
                if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
                    if (e = i(e, c)) { e.appendBogus();
                        k = CKEDITOR.env.ie }
                if (g(b, c.block, d) && h.collapsed && !h.getCommonAncestor().isReadOnly()) {
                    c = h.clone();
                    c.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    d = new CKEDITOR.dom.walker(c);
                    d.guard = function(a) { return !f(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() };
                    if (!d.checkForward() || c.checkStartOfBlock() && c.checkEndOfBlock()) {
                        b = h.fixBlock(true, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p");
                        if (!CKEDITOR.env.needsBrFiller)(b =
                            b.getFirst(f)) && (b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/)) && b.remove();
                        k = 1;
                        a.cancel()
                    }
                }
                k && h.select()
            }

            function i(a, b) { if (a.isFake) return 0; var c = b.block || b.blockLimit,
                    d = c && c.getLast(f); if (c && c.isBlockBoundary() && (!d || !(d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary())) && !c.is("pre") && !c.getBogus()) return c }

            function j(a) { var b = a.data.getTarget(); if (b.is("input")) { b = b.getAttribute("type");
                    (b == "submit" || b == "reset") && a.data.preventDefault() } }

            function f(a) {
                return o(a) &&
                    n(a)
            }

            function h(a, b) { return function(c) { var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget,
                        d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null;
                    (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c) } }

            function k(a) {
                function b(a) { return function(b, d) { d && (b.type == CKEDITOR.NODE_ELEMENT && b.is(g)) && (c = b); if (!d && f(b) && (!a || !s(b))) return false } }
                var c, d = a.getRanges()[0],
                    a = a.root,
                    g = { table: 1, ul: 1, ol: 1, dl: 1 };
                if (d.startPath().contains(g)) {
                    var e = d.clone();
                    e.collapse(1);
                    e.setStartAt(a,
                        CKEDITOR.POSITION_AFTER_START);
                    a = new CKEDITOR.dom.walker(e);
                    a.guard = b();
                    a.checkBackward();
                    if (c) { e = d.clone();
                        e.collapse();
                        e.setEndAt(c, CKEDITOR.POSITION_AFTER_END);
                        a = new CKEDITOR.dom.walker(e);
                        a.guard = b(true);
                        c = false;
                        a.checkForward(); return c }
                }
                return null
            }

            function g(a, b, c) { return a.config.autoParagraph !== false && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && b.getAttribute("contenteditable") == "true") }

            function m(a) {
                return a.activeEnterMode != CKEDITOR.ENTER_BR && a.config.autoParagraph !==
                    false ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false
            }

            function p(a) { var b = a.editor;
                b.getSelection().scrollIntoView();
                setTimeout(function() { b.fire("saveSnapshot") }, 0) }

            function q(a, b, c) { for (var d = a.getCommonAncestor(b), b = a = c ? b : a;
                    (a = a.getParent()) && !d.equals(a) && a.getChildCount() == 1;) b = a;
                b.remove() } CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element,
                $: function(a, b) { this.base(b.$ || b);
                    this.editor = a;
                    this.status = "unloaded";
                    this.hasFocus = false;
                    this.setup() },
                proto: {
                    focus: function() {
                        var a;
                        if (CKEDITOR.env.webkit && !this.hasFocus) { a = this.editor._.previousActive || this.getDocument().getActive(); if (this.contains(a)) { a.focus(); return } }
                        try { this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]() } catch (b) { if (!CKEDITOR.env.ie) throw b; }
                        if (CKEDITOR.env.safari && !this.isInline()) { a = CKEDITOR.document.getActive();
                            a.equals(this.getWindow().getFrame()) || this.getWindow().focus() }
                    },
                    on: function(a, b) {
                        var c = Array.prototype.slice.call(arguments, 0);
                        if (CKEDITOR.env.ie && /^focus|blur$/.exec(a)) {
                            a =
                                a == "focus" ? "focusin" : "focusout";
                            b = h(b, this);
                            c[0] = a;
                            c[1] = b
                        }
                        return CKEDITOR.dom.element.prototype.on.apply(this, c)
                    },
                    attachListener: function(a) {!this._.listeners && (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1),
                            b = a.on.apply(a, b);
                        this._.listeners.push(b); return b },
                    clearListeners: function() { var a = this._.listeners; try { for (; a.length;) a.pop().removeListener() } catch (b) {} },
                    restoreAttrs: function() {
                        var a = this._.attrChanges,
                            b, c;
                        for (c in a)
                            if (a.hasOwnProperty(c)) {
                                b = a[c];
                                b !== null ? this.setAttribute(c,
                                    b) : this.removeAttribute(c)
                            }
                    },
                    attachClass: function(a) { var b = this.getCustomData("classes"); if (!this.hasClass(a)) {!b && (b = []);
                            b.push(a);
                            this.setCustomData("classes", b);
                            this.addClass(a) } },
                    changeAttr: function(a, b) { var c = this.getAttribute(a); if (b !== c) {!this._.attrChanges && (this._.attrChanges = {});
                            a in this._.attrChanges || (this._.attrChanges[a] = c);
                            this.setAttribute(a, b) } },
                    insertText: function(a) { this.editor.focus();
                        this.insertHtml(this.transformPlainTextToHtml(a), "text") },
                    transformPlainTextToHtml: function(a) {
                        var b =
                            this.editor.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
                        return CKEDITOR.tools.transformPlainTextToHtml(a, b)
                    },
                    insertHtml: function(a, b, c) { var d = this.editor;
                        d.focus();
                        d.fire("saveSnapshot");
                        c || (c = d.getSelection().getRanges()[0]);
                        w(this, b || "html", a, c);
                        c.select();
                        p(this);
                        this.editor.fire("afterInsertHtml", {}) },
                    insertHtmlIntoRange: function(a, b, c) { w(this, c || "html", a, b);
                        this.editor.fire("afterInsertHtml", { intoRange: b }) },
                    insertElement: function(a,
                        b) {
                        var c = this.editor;
                        c.focus();
                        c.fire("saveSnapshot");
                        var d = c.activeEnterMode,
                            c = c.getSelection(),
                            g = a.getName(),
                            g = CKEDITOR.dtd.$block[g];
                        b || (b = c.getRanges()[0]);
                        if (this.insertElementIntoRange(a, b)) {
                            b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                            if (g)
                                if ((g = a.getNext(function(a) { return f(a) && !s(a) })) && g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$block)) g.getDtd()["#"] ? b.moveToElementEditStart(g) : b.moveToElementEditEnd(a);
                                else if (!g && d != CKEDITOR.ENTER_BR) {
                                g = b.fixBlock(true, d == CKEDITOR.ENTER_DIV ?
                                    "div" : "p");
                                b.moveToElementEditStart(g)
                            }
                        }
                        c.selectRanges([b]);
                        p(this)
                    },
                    insertElementIntoSelection: function(a) { this.insertElement(a) },
                    insertElementIntoRange: function(a, b) {
                        var c = this.editor,
                            d = c.config.enterMode,
                            g = a.getName(),
                            e = CKEDITOR.dtd.$block[g];
                        if (b.checkReadOnly()) return false;
                        b.deleteContents(1);
                        b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) && v(b);
                        var f, h;
                        if (e)
                            for (;
                                (f = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[f.getName()]) && (!h || !h[g]);)
                                if (f.getName() in
                                    CKEDITOR.dtd.span) b.splitElement(f);
                                else if (b.checkStartOfBlock() && b.checkEndOfBlock()) { b.setStartBefore(f);
                            b.collapse(true);
                            f.remove() } else b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                        b.insertNode(a);
                        return true
                    },
                    setData: function(a, b) { b || (a = this.editor.dataProcessor.toHtml(a));
                        this.setHtml(a);
                        this.fixInitialSelection(); if (this.status == "unloaded") this.status = "ready";
                        this.editor.fire("dataReady") },
                    getData: function(a) {
                        var b = this.getHtml();
                        a || (b = this.editor.dataProcessor.toDataFormat(b));
                        return b
                    },
                    setReadOnly: function(a) { this.setAttribute("contenteditable", !a) },
                    detach: function() { this.removeClass("cke_editable");
                        this.status = "detached"; var a = this.editor;
                        this._.detach();
                        delete a.document;
                        delete a.window },
                    isInline: function() { return this.getDocument().equals(CKEDITOR.document) },
                    fixInitialSelection: function() {
                        function a() {
                            var b = c.getDocument().$,
                                d = b.getSelection(),
                                g;
                            if (d.anchorNode && d.anchorNode == c.$) g = true;
                            else if (CKEDITOR.env.webkit) {
                                var e = c.getDocument().getActive();
                                e && (e.equals(c) &&
                                    !d.anchorNode) && (g = true)
                            }
                            if (g) { g = new CKEDITOR.dom.range(c);
                                g.moveToElementEditStart(c);
                                b = b.createRange();
                                b.setStart(g.startContainer.$, g.startOffset);
                                b.collapse(true);
                                d.removeAllRanges();
                                d.addRange(b) }
                        }

                        function b() {
                            var a = c.getDocument().$,
                                d = a.selection,
                                g = c.getDocument().getActive();
                            if (d.type == "None" && g.equals(c)) {
                                d = new CKEDITOR.dom.range(c);
                                a = a.body.createTextRange();
                                d.moveToElementEditStart(c);
                                d = d.startContainer;
                                d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent());
                                a.moveToElementText(d.$);
                                a.collapse(true);
                                a.select()
                            }
                        }
                        var c = this;
                        if (CKEDITOR.env.ie && (CKEDITOR.env.version < 9 || CKEDITOR.env.quirks)) { if (this.hasFocus) { this.focus();
                                b() } } else if (this.hasFocus) { this.focus();
                            a() } else this.once("focus", function() { a() }, null, null, -999)
                    },
                    getHtmlFromRange: function(d) { if (d.collapsed) return new CKEDITOR.dom.documentFragment(d.document);
                        d = { doc: this.getDocument(), range: d.clone() };
                        a.detect(d, this);
                        e.exclude(d);
                        b.shrink(d);
                        d.fragment = d.range.cloneContents();
                        c.rebuild(d, this);
                        a.fix(d, this); return new CKEDITOR.dom.documentFragment(d.fragment.$) },
                    extractHtmlFromRange: function(a, b) {
                        var c = x,
                            d = { range: a, doc: a.document },
                            g = this.getHtmlFromRange(a);
                        if (a.collapsed) { a.optimize(); return g } a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                        c.table.detectPurge(d);
                        d.bookmark = a.createBookmark();
                        delete d.range;
                        var e = this.editor.createRange();
                        e.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
                        d.targetBookmark = e.createBookmark();
                        c.list.detectMerge(d, this);
                        c.table.detectRanges(d, this);
                        c.block.detectMerge(d, this);
                        if (d.tableContentsRanges) {
                            c.table.deleteRanges(d);
                            a.moveToBookmark(d.bookmark);
                            d.range = a
                        } else { a.moveToBookmark(d.bookmark);
                            d.range = a;
                            a.extractContents(c.detectExtractMerge(d)) } a.moveToBookmark(d.targetBookmark);
                        a.optimize();
                        c.fixUneditableRangePosition(a);
                        c.list.merge(d, this);
                        c.table.purge(d, this);
                        c.block.merge(d, this);
                        if (b) {
                            c = a.startPath();
                            if (d = a.checkStartOfBlock())
                                if (d = a.checkEndOfBlock())
                                    if (d = c.block)
                                        if (d = !a.root.equals(c.block)) { a: { var d = c.block.getElementsByTag("span"),
                                                    e = 0,
                                                    f; if (d)
                                                    for (; f = d.getItem(e++);)
                                                        if (!n(f)) { d = true; break a }
                                                d = false } d = !d }
                            if (d) {
                                a.moveToPosition(c.block,
                                    CKEDITOR.POSITION_BEFORE_START);
                                c.block.remove()
                            }
                        } else { c.autoParagraph(this.editor, a);
                            l(a.startContainer) && a.startContainer.appendBogus() } a.startContainer.mergeSiblings();
                        return g
                    },
                    setup: function() {
                        var a = this.editor;
                        this.attachListener(a, "beforeGetData", function() { var b = this.getData();
                            this.is("textarea") || a.config.ignoreEmptyParagraph !== false && (b = b.replace(t, function(a, b) { return b }));
                            a.setData(b, null, 1) }, this);
                        this.attachListener(a, "getSnapshot", function(a) { a.data = this.getData(1) }, this);
                        this.attachListener(a,
                            "afterSetData",
                            function() { this.setData(a.getData(1)) }, this);
                        this.attachListener(a, "loadSnapshot", function(a) { this.setData(a.data, 1) }, this);
                        this.attachListener(a, "beforeFocus", function() { var b = a.getSelection();
                            (b = b && b.getNative()) && b.type == "Control" || this.focus() }, this);
                        this.attachListener(a, "insertHtml", function(a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this);
                        this.attachListener(a, "insertElement", function(a) { this.insertElement(a.data) }, this);
                        this.attachListener(a, "insertText",
                            function(a) { this.insertText(a.data) }, this);
                        this.setReadOnly(a.readOnly);
                        this.attachClass("cke_editable");
                        a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : (a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || a.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO) && this.attachClass("cke_editable_themed");
                        this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                        a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
                        a.keystrokeHandler.attach(this);
                        this.on("blur", function() {
                            this.hasFocus =
                                false
                        }, null, null, -1);
                        this.on("focus", function() { this.hasFocus = true }, null, null, -1);
                        a.focusManager.add(this);
                        if (this.equals(CKEDITOR.document.getActive())) { this.hasFocus = true;
                            a.once("contentDom", function() { a.focusManager.focus(this) }, this) } this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                        if (!this.is("textarea")) {
                            a.document = this.getDocument();
                            a.window = this.getWindow();
                            var b = a.document;
                            this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                            var c = a.config.contentsLangDirection;
                            this.getDirection(1) !=
                                c && this.changeAttr("dir", c);
                            var d = CKEDITOR.getCss();
                            if (d) { c = b.getHead(); if (!c.getCustomData("stylesheet")) { d = b.appendStyleText(d);
                                    d = new CKEDITOR.dom.element(d.ownerNode || d.owningElement);
                                    c.setCustomData("stylesheet", d);
                                    d.data("cke-temp", 1) } } c = b.getCustomData("stylesheet_ref") || 0;
                            b.setCustomData("stylesheet_ref", c + 1);
                            this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                            this.attachListener(this, "click", function(a) {
                                var a = a.data,
                                    b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                                b && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                            });
                            var g = { 8: 1, 46: 1 };
                            this.attachListener(a, "key", function(b) {
                                if (a.readOnly) return true;
                                var c = b.data.domEvent.getKey(),
                                    d;
                                if (c in g) {
                                    var b = a.getSelection(),
                                        e, f = b.getRanges()[0],
                                        h = f.startPath(),
                                        i, j, m, c = c == 8;
                                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (e = b.getSelectedElement()) || (e = k(b))) { a.fire("saveSnapshot");
                                        f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);
                                        e.remove();
                                        f.select();
                                        a.fire("saveSnapshot");
                                        d = 1 } else if (f.collapsed)
                                        if ((i = h.block) && (m =
                                                i[c ? "getPrevious" : "getNext"](o)) && m.type == CKEDITOR.NODE_ELEMENT && m.is("table") && f[c ? "checkStartOfBlock" : "checkEndOfBlock"]()) { a.fire("saveSnapshot");
                                            f[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && i.remove();
                                            f["moveToElementEdit" + (c ? "End" : "Start")](m);
                                            f.select();
                                            a.fire("saveSnapshot");
                                            d = 1 } else if (h.blockLimit && h.blockLimit.is("td") && (j = h.blockLimit.getAscendant("table")) && f.checkBoundaryOfElement(j, c ? CKEDITOR.START : CKEDITOR.END) && (m = j[c ? "getPrevious" : "getNext"](o))) {
                                        a.fire("saveSnapshot");
                                        f["moveToElementEdit" +
                                            (c ? "End" : "Start")](m);
                                        f.checkStartOfBlock() && f.checkEndOfBlock() ? m.remove() : f.select();
                                        a.fire("saveSnapshot");
                                        d = 1
                                    } else if ((j = h.contains(["td", "th", "caption"])) && f.checkBoundaryOfElement(j, c ? CKEDITOR.START : CKEDITOR.END)) d = 1
                                }
                                return !d
                            });
                            a.blockless && (CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && this.attachListener(this, "keyup", function(b) { if (b.data.getKeystroke() in g && !this.getFirst(f)) { this.appendBogus();
                                    b = a.createRange();
                                    b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START);
                                    b.select() } });
                            this.attachListener(this,
                                "dblclick",
                                function(b) { if (a.readOnly) return false;
                                    b = { element: b.data.getTarget() };
                                    a.fire("doubleclick", b) });
                            CKEDITOR.env.ie && this.attachListener(this, "click", j);
                            (!CKEDITOR.env.ie || CKEDITOR.env.edge) && this.attachListener(this, "mousedown", function(b) { var c = b.data.getTarget(); if (c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly()) { a.getSelection().selectElement(c);
                                    c.is("input", "textarea", "select") && b.data.preventDefault() } });
                            CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(b) {
                                (b =
                                    b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b)
                            });
                            CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) { if (b.data.$.button == 2) { b = b.data.getTarget(); if (!b.getOuterHtml().replace(t, "")) { var c = a.createRange();
                                        c.moveToElementEditStart(b);
                                        c.select(true) } } });
                            if (CKEDITOR.env.webkit) {
                                this.attachListener(this, "click", function(a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() });
                                this.attachListener(this, "mouseup", function(a) {
                                    a.data.getTarget().is("input", "textarea") &&
                                        a.data.preventDefault()
                                })
                            }
                            CKEDITOR.env.webkit && this.attachListener(a, "key", function(b) {
                                if (a.readOnly) return true;
                                b = b.data.domEvent.getKey();
                                if (b in g) {
                                    var c = b == 8,
                                        d = a.getSelection().getRanges()[0],
                                        b = d.startPath();
                                    if (d.collapsed) {
                                        var e;
                                        a: {
                                            var f = b.block;
                                            if (f)
                                                if (d[c ? "checkStartOfBlock" : "checkEndOfBlock"]())
                                                    if (!d.moveToClosestEditablePosition(f, !c) || !d.collapsed) e = false;
                                                    else {
                                                        if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                                            var h = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
                                                            if (h && h.type == CKEDITOR.NODE_ELEMENT &&
                                                                h.is("hr")) { a.fire("saveSnapshot");
                                                                h.remove();
                                                                e = true; break a }
                                                        }
                                                        if ((d = d.startPath().block) && (!d || !d.contains(f))) { a.fire("saveSnapshot"); var k;
                                                            (k = (c ? d : f).getBogus()) && k.remove();
                                                            e = a.getSelection();
                                                            k = e.createBookmarks();
                                                            (c ? f : d).moveChildren(c ? d : f, false);
                                                            b.lastElement.mergeSiblings();
                                                            q(f, d, !c);
                                                            e.selectBookmarks(k);
                                                            e = true }
                                                    }
                                            else e = false;
                                            else e = false
                                        }
                                        if (!e) return
                                    } else {
                                        c = d;
                                        e = b.block;
                                        k = c.endPath().block;
                                        if (!e || !k || e.equals(k)) b = false;
                                        else {
                                            a.fire("saveSnapshot");
                                            (f = e.getBogus()) && f.remove();
                                            c.enlarge(CKEDITOR.ENLARGE_INLINE);
                                            c.deleteContents();
                                            if (k.getParent()) { k.moveChildren(e, false);
                                                b.lastElement.mergeSiblings();
                                                q(e, k, true) } c = a.getSelection().getRanges()[0];
                                            c.collapse(1);
                                            c.optimize();
                                            c.startContainer.getHtml() === "" && c.startContainer.appendBogus();
                                            c.select();
                                            b = true
                                        }
                                        if (!b) return
                                    }
                                    a.getSelection().scrollIntoView();
                                    a.fire("saveSnapshot");
                                    return false
                                }
                            }, this, null, 100)
                        }
                    }
                },
                _: {
                    detach: function() {
                        this.editor.setData(this.editor.getData(), 0, 1);
                        this.clearListeners();
                        this.restoreAttrs();
                        var a;
                        if (a = this.removeCustomData("classes"))
                            for (; a.length;) this.removeClass(a.pop());
                        if (!this.is("textarea")) { a = this.getDocument(); var b = a.getHead(); if (b.getCustomData("stylesheet")) { var c = a.getCustomData("stylesheet_ref"); if (--c) a.setCustomData("stylesheet_ref", c);
                                else { a.removeCustomData("stylesheet_ref");
                                    b.removeCustomData("stylesheet").remove() } } } this.editor.fire("contentDomUnload");
                        delete this.editor
                    }
                }
            });
            CKEDITOR.editor.prototype.editable = function(a) {
                var b = this._.editable;
                if (b && a) return 0;
                if (arguments.length) b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this,
                    a) : (b && b.detach(), null);
                return b
            };
            CKEDITOR.on("instanceLoaded", function(a) {
                var b = a.editor;
                b.on("insertElement", function(a) { a = a.data; if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) { a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                        a.setAttribute("contentEditable", false) } });
                b.on("selectionChange", function(a) {
                    if (!b.readOnly) {
                        var c = b.getSelection();
                        if (c && !c.isLocked) {
                            c = b.checkDirty();
                            b.fire("lockSnapshot");
                            d(a);
                            b.fire("unlockSnapshot");
                            !c && b.resetDirty()
                        }
                    }
                })
            });
            CKEDITOR.on("instanceCreated", function(a) {
                var b = a.editor;
                b.on("mode", function() {
                    var a = b.editable();
                    if (a && a.isInline()) {
                        var c = b.title;
                        a.changeAttr("role", "textbox");
                        a.changeAttr("aria-label", c);
                        c && a.changeAttr("title", c);
                        var d = b.fire("ariaEditorHelpLabel", {}).label;
                        if (d)
                            if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                                var g = CKEDITOR.tools.getNextId(),
                                    d = CKEDITOR.dom.element.createFromHtml('<span id="' + g + '" class="cke_voice_label">' + d + "</span>");
                                c.append(d);
                                a.changeAttr("aria-describedby", g)
                            }
                    }
                })
            });
            CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
            var o = CKEDITOR.dom.walker.whitespaces(true),
                n = CKEDITOR.dom.walker.bookmark(false, true),
                l = CKEDITOR.dom.walker.empty(),
                s = CKEDITOR.dom.walker.bogus(),
                t = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
                w = function() {
                    function a(b) { return b.type == CKEDITOR.NODE_ELEMENT }

                    function b(c, d) {
                        var g, e, f, h, i = [],
                            j = d.range.startContainer;
                        g = d.range.startPath();
                        for (var j = k[j.getName()], m = 0, o = c.getChildren(), E = o.count(), l = -1, s = -1, t = 0, q = g.contains(k.$list); m < E; ++m) {
                            g = o.getItem(m);
                            if (a(g)) {
                                f = g.getName();
                                if (q && f in CKEDITOR.dtd.$list) i = i.concat(b(g, d));
                                else {
                                    h = !!j[f];
                                    if (f == "br" && g.data("cke-eol") && (!m || m == E - 1)) { t = (e = m ? i[m - 1].node : o.getItem(m + 1)) && (!a(e) || !e.is("br"));
                                        e = e && a(e) && k.$block[e.getName()] } l == -1 && !h && (l = m);
                                    h || (s = m);
                                    i.push({
                                        isElement: 1,
                                        isLineBreak: t,
                                        isBlock: g.isBlockBoundary(),
                                        hasBlockSibling: e,
                                        node: g,
                                        name: f,
                                        allowed: h
                                    });
                                    e = t = 0
                                }
                            } else i.push({ isElement: 0, node: g, allowed: 1 })
                        }
                        if (l > -1) i[l].firstNotAllowed = 1;
                        if (s > -1) i[s].lastNotAllowed = 1;
                        return i
                    }

                    function c(b, d) { var g = [],
                            e = b.getChildren(),
                            f = e.count(),
                            h, i = 0,
                            j = k[d],
                            m = !b.is(k.$inline) || b.is("br"); for (m && g.push(" "); i < f; i++) { h = e.getItem(i);
                            a(h) && !h.is(j) ? g = g.concat(c(h, d)) : g.push(h) } m && g.push(" "); return g }

                    function d(b) { return b && a(b) && (b.is(k.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) }

                    function e(b, c, d, g) {
                        var f = b.clone(),
                            h, k;
                        f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                        if ((h = (new CKEDITOR.dom.walker(f)).next()) && a(h) && i[h.getName()] && (k = h.getPrevious()) && a(k) && !k.getParent().equals(b.startContainer) && d.contains(k) && g.contains(h) && h.isIdentical(k)) { h.moveChildren(k);
                            h.remove();
                            e(b, c, d, g) }
                    }

                    function h(b, c) {
                        function d(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) { b.remove(); return 1 } }
                        var g = c.endContainer.getChild(c.endOffset),
                            e = c.endContainer.getChild(c.endOffset - 1);
                        g && d(g, b[b.length - 1]);
                        if (e && d(e, b[0])) {
                            c.setEnd(c.endContainer,
                                c.endOffset - 1);
                            c.collapse()
                        }
                    }
                    var k = CKEDITOR.dtd,
                        i = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 },
                        j = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
                        o = CKEDITOR.tools.extend({}, k.$inline);
                    delete o.br;
                    return function(i, l, s, t) {
                        var q = i.editor,
                            v = false;
                        if (l == "unfiltered_html") { l = "html";
                            v = true }
                        if (!t.checkReadOnly()) {
                            var n = (new CKEDITOR.dom.elementPath(t.startContainer, t.root)).blockLimit || t.root,
                                i = {
                                    type: l,
                                    dontFilter: v,
                                    editable: i,
                                    editor: q,
                                    range: t,
                                    blockLimit: n,
                                    mergeCandidates: [],
                                    zombies: []
                                },
                                l = i.range,
                                t = i.mergeCandidates,
                                p, x;
                            if (i.type == "text" && l.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) { p = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", l.document);
                                l.insertNode(p);
                                l.setStartAfter(p) } v = new CKEDITOR.dom.elementPath(l.startContainer);
                            i.endPath = n = new CKEDITOR.dom.elementPath(l.endContainer);
                            if (!l.collapsed) { var q = n.block || n.blockLimit,
                                    w = l.getCommonAncestor();
                                q && (!q.equals(w) && !q.contains(w) && l.checkEndOfBlock()) && i.zombies.push(q);
                                l.deleteContents() }
                            for (;
                                (x = a(l.startContainer) &&
                                    l.startContainer.getChild(l.startOffset - 1)) && a(x) && x.isBlockBoundary() && v.contains(x);) l.moveToPosition(x, CKEDITOR.POSITION_BEFORE_END);
                            e(l, i.blockLimit, v, n);
                            if (p) { l.setEndBefore(p);
                                l.collapse();
                                p.remove() } p = l.startPath();
                            if (q = p.contains(d, false, 1)) { l.splitElement(q);
                                i.inlineStylesRoot = q;
                                i.inlineStylesPeak = p.lastElement } p = l.createBookmark();
                            (q = p.startNode.getPrevious(f)) && a(q) && d(q) && t.push(q);
                            (q = p.startNode.getNext(f)) && a(q) && d(q) && t.push(q);
                            for (q = p.startNode;
                                (q = q.getParent()) && d(q);) t.push(q);
                            l.moveToBookmark(p);
                            if (p = s) {
                                p = i.range;
                                if (i.type == "text" && i.inlineStylesRoot) { x = i.inlineStylesPeak;
                                    l = x.getDocument().createText("{cke-peak}"); for (t = i.inlineStylesRoot.getParent(); !x.equals(t);) { l = l.appendTo(x.clone());
                                        x = x.getParent() } s = l.getOuterHtml().split("{cke-peak}").join(s) } x = i.blockLimit.getName();
                                if (/^\s+|\s+$/.test(s) && "span" in CKEDITOR.dtd[x]) var C = '<span data-cke-marker="1">&nbsp;</span>',
                                    s = C + s + C;
                                s = i.editor.dataProcessor.toHtml(s, {
                                    context: null,
                                    fixForBody: false,
                                    protectedWhitespaces: !!C,
                                    dontFilter: i.dontFilter,
                                    filter: i.editor.activeFilter,
                                    enterMode: i.editor.activeEnterMode
                                });
                                x = p.document.createElement("body");
                                x.setHtml(s);
                                if (C) { x.getFirst().remove();
                                    x.getLast().remove() }
                                if ((C = p.startPath().block) && !(C.getChildCount() == 1 && C.getBogus())) a: { var K; if (x.getChildCount() == 1 && a(K = x.getFirst()) && K.is(j) && !K.hasAttribute("contenteditable")) { C = K.getElementsByTag("*");
                                        p = 0; for (t = C.count(); p < t; p++) { l = C.getItem(p); if (!l.is(o)) break a } K.moveChildren(K.getParent(1));
                                        K.remove() } } i.dataWrapper = x;
                                p = s
                            }
                            if (p) {
                                K = i.range;
                                p = K.document;
                                var F;
                                x = i.blockLimit;
                                var t = 0,
                                    M, C = [],
                                    N, U, s = q = 0,
                                    Q, V, l = K.startContainer,
                                    v = i.endPath.elements[0],
                                    Z, n = v.getPosition(l),
                                    w = !!v.getCommonAncestor(l) && n != CKEDITOR.POSITION_IDENTICAL && !(n & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED),
                                    l = b(i.dataWrapper, i);
                                for (h(l, K); t < l.length; t++) {
                                    n = l[t];
                                    if (F = n.isLineBreak) {
                                        F = K;
                                        Q = x;
                                        var O = void 0,
                                            $ = void 0;
                                        if (n.hasBlockSibling) F = 1;
                                        else {
                                            O = F.startContainer.getAscendant(k.$block, 1);
                                            if (!O || !O.is({ div: 1, p: 1 })) F = 0;
                                            else {
                                                $ = O.getPosition(Q);
                                                if ($ == CKEDITOR.POSITION_IDENTICAL ||
                                                    $ == CKEDITOR.POSITION_CONTAINS) F = 0;
                                                else { Q = F.splitElement(O);
                                                    F.moveToPosition(Q, CKEDITOR.POSITION_AFTER_START);
                                                    F = 1 }
                                            }
                                        }
                                    }
                                    if (F) s = t > 0;
                                    else {
                                        F = K.startPath();
                                        if (!n.isBlock && g(i.editor, F.block, F.blockLimit) && (U = m(i.editor))) { U = p.createElement(U);
                                            U.appendBogus();
                                            K.insertNode(U);
                                            CKEDITOR.env.needsBrFiller && (M = U.getBogus()) && M.remove();
                                            K.moveToPosition(U, CKEDITOR.POSITION_BEFORE_END) }
                                        if ((F = K.startPath().block) && !F.equals(N)) { if (M = F.getBogus()) { M.remove();
                                                C.push(F) } N = F } n.firstNotAllowed && (q = 1);
                                        if (q && n.isElement) {
                                            F =
                                                K.startContainer;
                                            for (Q = null; F && !k[F.getName()][n.name];) { if (F.equals(x)) { F = null; break } Q = F;
                                                F = F.getParent() }
                                            if (F) { if (Q) { V = K.splitElement(Q);
                                                    i.zombies.push(V);
                                                    i.zombies.push(Q) } } else { Q = x.getName();
                                                Z = !t;
                                                F = t == l.length - 1;
                                                Q = c(n.node, Q); for (var O = [], $ = Q.length, Y = 0, W = void 0, aa = 0, ea = -1; Y < $; Y++) { W = Q[Y]; if (W == " ") { if (!aa && (!Z || Y)) { O.push(new CKEDITOR.dom.text(" "));
                                                            ea = O.length } aa = 1 } else { O.push(W);
                                                        aa = 0 } } F && ea == O.length && O.pop();
                                                Z = O }
                                        }
                                        if (Z) { for (; F = Z.pop();) K.insertNode(F);
                                            Z = 0 } else K.insertNode(n.node);
                                        if (n.lastNotAllowed &&
                                            t < l.length - 1) {
                                            (V = w ? v : V) && K.setEndAt(V, CKEDITOR.POSITION_AFTER_START);
                                            q = 0 } K.collapse()
                                    }
                                }
                                if (l.length != 1) M = false;
                                else { M = l[0];
                                    M = M.isElement && M.node.getAttribute("contenteditable") == "false" }
                                if (M) { s = true;
                                    F = l[0].node;
                                    K.setStartAt(F, CKEDITOR.POSITION_BEFORE_START);
                                    K.setEndAt(F, CKEDITOR.POSITION_AFTER_END) } i.dontMoveCaret = s;
                                i.bogusNeededBlocks = C
                            }
                            M = i.range;
                            var ba;
                            V = i.bogusNeededBlocks;
                            for (Z = M.createBookmark(); N = i.zombies.pop();)
                                if (N.getParent()) { U = M.clone();
                                    U.moveToElementEditStart(N);
                                    U.removeEmptyBlocksAtEnd() }
                            if (V)
                                for (; N =
                                    V.pop();) CKEDITOR.env.needsBrFiller ? N.appendBogus() : N.append(M.document.createText(" "));
                            for (; N = i.mergeCandidates.pop();) N.mergeSiblings();
                            M.moveToBookmark(Z);
                            if (!i.dontMoveCaret) { for (N = a(M.startContainer) && M.startContainer.getChild(M.startOffset - 1); N && a(N) && !N.is(k.$empty);) { if (N.isBlockBoundary()) M.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END);
                                    else { if (d(N) && N.getHtml().match(/(\s|&nbsp;)$/g)) { ba = null; break } ba = M.clone();
                                        ba.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END) } N = N.getLast(f) } ba && M.moveToRange(ba) }
                        }
                    }
                }(),
                v = function() {
                    function a(b) { b = new CKEDITOR.dom.walker(b);
                        b.guard = function(a, b) { if (b) return false; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) };
                        b.evaluator = function(a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b }

                    function b(a, c, d) { c = a.getDocument().createElement(c);
                        a.append(c, d); return c }

                    function c(a) { var b = a.count(),
                            d; for (b; b-- > 0;) { d = a.getItem(b); if (!CKEDITOR.tools.trim(d.getHtml())) { d.appendBogus();
                                CKEDITOR.env.ie && (CKEDITOR.env.version < 9 && d.getChildCount()) && d.getFirst().remove() } } }
                    return function(d) {
                        var g = d.startContainer,
                            e = g.getAscendant("table", 1),
                            f = false;
                        c(e.getElementsByTag("td"));
                        c(e.getElementsByTag("th"));
                        e = d.clone();
                        e.setStart(g, 0);
                        e = a(e).lastBackward();
                        if (!e) { e = d.clone();
                            e.setEndAt(g, CKEDITOR.POSITION_BEFORE_END);
                            e = a(e).lastForward();
                            f = true } e || (e = g);
                        if (e.is("table")) { d.setStartAt(e, CKEDITOR.POSITION_BEFORE_START);
                            d.collapse(true);
                            e.remove() } else {
                            e.is({ tbody: 1, thead: 1, tfoot: 1 }) && (e = b(e, "tr", f));
                            e.is("tr") && (e = b(e, e.getParent().is("thead") ? "th" : "td", f));
                            (g = e.getBogus()) &&
                            g.remove();
                            d.moveToPosition(e, f ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END)
                        }
                    }
                }();
            a = {
                detect: function(a, b) { var c = a.range,
                        d = c.clone(),
                        g = c.clone(),
                        e = new CKEDITOR.dom.elementPath(c.startContainer, b),
                        f = new CKEDITOR.dom.elementPath(c.endContainer, b);
                    d.collapse(1);
                    g.collapse(); if (e.block && d.checkBoundaryOfElement(e.block, CKEDITOR.END)) { c.setStartAfter(e.block);
                        a.prependEolBr = 1 } if (f.block && g.checkBoundaryOfElement(f.block, CKEDITOR.START)) { c.setEndBefore(f.block);
                        a.appendEolBr = 1 } },
                fix: function(a,
                    b) { var c = b.getDocument(),
                        d; if (a.appendEolBr) { d = this.createEolBr(c);
                        a.fragment.append(d) } a.prependEolBr && (!d || d.getPrevious()) && a.fragment.append(this.createEolBr(c), 1) },
                createEolBr: function(a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
            };
            e = { exclude: function(a) { var b = a.range.getBoundaryNodes(),
                        c = b.startNode;
                    (b = b.endNode) && (s(b) && (!c || !c.equals(b))) && a.range.setEndBefore(b) } };
            c = {
                rebuild: function(a, b) {
                    var c = a.range,
                        d = c.getCommonAncestor(),
                        g = new CKEDITOR.dom.elementPath(d, b),
                        e = new CKEDITOR.dom.elementPath(c.startContainer,
                            b),
                        c = new CKEDITOR.dom.elementPath(c.endContainer, b),
                        f;
                    d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
                    if (g.blockLimit.is({ tr: 1, table: 1 })) { var h = g.contains("table").getParent();
                        f = function(a) { return !a.equals(h) } } else if (g.block && g.block.is(CKEDITOR.dtd.$listItem)) { e = e.contains(CKEDITOR.dtd.$list);
                        c = c.contains(CKEDITOR.dtd.$list); if (!e.equals(c)) { var i = g.contains(CKEDITOR.dtd.$list).getParent();
                            f = function(a) { return !a.equals(i) } } } f || (f = function(a) { return !a.equals(g.block) && !a.equals(g.blockLimit) });
                    this.rebuildFragment(a,
                        b, d, f)
                },
                rebuildFragment: function(a, b, c, d) { for (var g; c && !c.equals(b) && d(c);) { g = c.clone(0, 1);
                        a.fragment.appendTo(g);
                        a.fragment = g;
                        c = c.getParent() } }
            };
            b = { shrink: function(a) { var a = a.range,
                        b = a.startContainer,
                        c = a.endContainer,
                        d = a.startOffset,
                        g = a.endOffset;
                    b.type == CKEDITOR.NODE_ELEMENT && (b.equals(c) && b.is("tr") && ++d == g) && a.shrink(CKEDITOR.SHRINK_TEXT) } };
            var x = function() {
                function a(b, c) { var d = b.getParent(); if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d) }

                function b(c, d, g) {
                    a(d);
                    a(g, 1);
                    for (var e; e =
                        g.getNext();) { e.insertAfter(d);
                        d = e } l(c) && c.remove()
                }

                function c(a, b) { var d = new CKEDITOR.dom.range(a);
                    d.setStartAfter(b.startNode);
                    d.setEndBefore(b.endNode); return d }
                return {
                    list: {
                        detectMerge: function(a, b) {
                            var d = c(b, a.bookmark),
                                g = d.startPath(),
                                e = d.endPath(),
                                f = g.contains(CKEDITOR.dtd.$list),
                                h = e.contains(CKEDITOR.dtd.$list);
                            a.mergeList = f && h && f.getParent().equals(h.getParent()) && !f.equals(h);
                            a.mergeListItems = g.block && e.block && g.block.is(CKEDITOR.dtd.$listItem) && e.block.is(CKEDITOR.dtd.$listItem);
                            if (a.mergeList ||
                                a.mergeListItems) { d = d.clone();
                                d.setStartBefore(a.bookmark.startNode);
                                d.setEndAfter(a.bookmark.endNode);
                                a.mergeListBookmark = d.createBookmark() }
                        },
                        merge: function(a, c) {
                            if (a.mergeListBookmark) {
                                var d = a.mergeListBookmark.startNode,
                                    g = a.mergeListBookmark.endNode,
                                    e = new CKEDITOR.dom.elementPath(d, c),
                                    f = new CKEDITOR.dom.elementPath(g, c);
                                if (a.mergeList) { var h = e.contains(CKEDITOR.dtd.$list),
                                        i = f.contains(CKEDITOR.dtd.$list); if (!h.equals(i)) { i.moveChildren(h);
                                        i.remove() } }
                                if (a.mergeListItems) {
                                    e = e.contains(CKEDITOR.dtd.$listItem);
                                    f = f.contains(CKEDITOR.dtd.$listItem);
                                    e.equals(f) || b(f, d, g)
                                }
                                d.remove();
                                g.remove()
                            }
                        }
                    },
                    block: {
                        detectMerge: function(a, b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var c = new CKEDITOR.dom.range(b);
                                c.setStartBefore(a.bookmark.startNode);
                                c.setEndAfter(a.bookmark.endNode);
                                a.mergeBlockBookmark = c.createBookmark() } },
                        merge: function(a, c) {
                            if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                                var d = a.mergeBlockBookmark.startNode,
                                    g = a.mergeBlockBookmark.endNode,
                                    e = new CKEDITOR.dom.elementPath(d, c),
                                    f = new CKEDITOR.dom.elementPath(g,
                                        c),
                                    e = e.block,
                                    f = f.block;
                                e && (f && !e.equals(f)) && b(f, d, g);
                                d.remove();
                                g.remove()
                            }
                        }
                    },
                    table: function() {
                        function a(c) {
                            var g = [],
                                e, f = new CKEDITOR.dom.walker(c),
                                h = c.startPath().contains(d),
                                i = c.endPath().contains(d),
                                k = {};
                            f.guard = function(a, f) {
                                if (a.type == CKEDITOR.NODE_ELEMENT) { var j = "visited_" + (f ? "out" : "in"); if (a.getCustomData(j)) return;
                                    CKEDITOR.dom.element.setMarker(k, a, j, 1) }
                                if (f && h && a.equals(h)) { e = c.clone();
                                    e.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                                    g.push(e) } else if (!f && i && a.equals(i)) {
                                    e = c.clone();
                                    e.setStartAt(i,
                                        CKEDITOR.POSITION_AFTER_START);
                                    g.push(e)
                                } else if (!f && a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!h || b(a, h)) && (!i || b(a, i))) { e = c.clone();
                                    e.selectNodeContents(a);
                                    g.push(e) }
                            };
                            f.lastForward();
                            CKEDITOR.dom.element.clearAllMarkers(k);
                            return g
                        }

                        function b(a, c) { var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
                                g = a.getPosition(c); return g === CKEDITOR.POSITION_IDENTICAL ? false : (g & d) === 0 }
                        var d = { td: 1, th: 1, caption: 1 };
                        return {
                            detectPurge: function(a) {
                                var b = a.range,
                                    c = b.clone();
                                c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                                var c = new CKEDITOR.dom.walker(c),
                                    g = 0;
                                c.evaluator = function(a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++g };
                                c.checkForward();
                                if (g > 1) { var c = b.startPath().contains("table"),
                                        e = b.endPath().contains("table"); if (c && e && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(e, CKEDITOR.END)) { b = a.range.clone();
                                        b.setStartBefore(c);
                                        b.setEndAfter(e);
                                        a.purgeTableBookmark = b.createBookmark() } }
                            },
                            detectRanges: function(g, e) {
                                var f = c(e, g.bookmark),
                                    h = f.clone(),
                                    i, k, j = f.getCommonAncestor();
                                j.is(CKEDITOR.dtd.$tableContent) &&
                                    !j.is(d) && (j = j.getAscendant("table", true));
                                k = j;
                                j = new CKEDITOR.dom.elementPath(f.startContainer, k);
                                k = new CKEDITOR.dom.elementPath(f.endContainer, k);
                                j = j.contains("table");
                                k = k.contains("table");
                                if (j || k) {
                                    if (j && k && b(j, k)) { g.tableSurroundingRange = h;
                                        h.setStartAt(j, CKEDITOR.POSITION_AFTER_END);
                                        h.setEndAt(k, CKEDITOR.POSITION_BEFORE_START);
                                        h = f.clone();
                                        h.setEndAt(j, CKEDITOR.POSITION_AFTER_END);
                                        i = f.clone();
                                        i.setStartAt(k, CKEDITOR.POSITION_BEFORE_START);
                                        i = a(h).concat(a(i)) } else if (j) {
                                        if (!k) {
                                            g.tableSurroundingRange =
                                                h;
                                            h.setStartAt(j, CKEDITOR.POSITION_AFTER_END);
                                            f.setEndAt(j, CKEDITOR.POSITION_AFTER_END)
                                        }
                                    } else { g.tableSurroundingRange = h;
                                        h.setEndAt(k, CKEDITOR.POSITION_BEFORE_START);
                                        f.setStartAt(k, CKEDITOR.POSITION_AFTER_START) } g.tableContentsRanges = i ? i : a(f)
                                }
                            },
                            deleteRanges: function(a) { for (var b; b = a.tableContentsRanges.pop();) { b.extractContents();
                                    l(b.startContainer) && b.startContainer.appendBogus() } a.tableSurroundingRange && a.tableSurroundingRange.extractContents() },
                            purge: function(a) {
                                if (a.purgeTableBookmark) {
                                    var b = a.doc,
                                        c = a.range.clone(),
                                        b = b.createElement("p");
                                    b.insertBefore(a.purgeTableBookmark.startNode);
                                    c.moveToBookmark(a.purgeTableBookmark);
                                    c.deleteContents();
                                    a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                                }
                            }
                        }
                    }(),
                    detectExtractMerge: function(a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
                    fixUneditableRangePosition: function(a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, true) },
                    autoParagraph: function(a, b) {
                        var c =
                            b.startPath(),
                            d;
                        if (g(a, c.block, c.blockLimit) && (d = m(a))) { d = b.document.createElement(d);
                            d.appendBogus();
                            b.insertNode(d);
                            b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START) }
                    }
                }
            }()
        }(),
        function() {
            function a() {
                var a = this._.fakeSelection,
                    b;
                if (a) { b = this.getSelection(1); if (!b || !b.isHidden()) { a.reset();
                        a = 0 } }
                if (!a) { a = b || this.getSelection(1); if (!a || a.getType() == CKEDITOR.SELECTION_NONE) return } this.fire("selectionCheck", a);
                b = this.elementPath();
                if (!b.compare(this._.selectionPreviousPath)) {
                    if (CKEDITOR.env.webkit) this._.previousActive =
                        this.document.getActive();
                    this._.selectionPreviousPath = b;
                    this.fire("selectionChange", { selection: a, path: b })
                }
            }

            function e() { o = true; if (!q) { b.call(this);
                    q = CKEDITOR.tools.setTimeout(b, 200, this) } }

            function b() { q = null; if (o) { CKEDITOR.tools.setTimeout(a, 0, this);
                    o = false } }

            function c(a) { return n(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? true : false }

            function d(a) {
                function b(c, d) { return !c || c.type == CKEDITOR.NODE_TEXT ? false : a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) }
                if (!(a.root instanceof CKEDITOR.editable)) return false;
                var d = a.startContainer,
                    g = a.getPreviousNode(c, null, d),
                    e = a.getNextNode(c, null, d);
                return b(g) || b(e, 1) || !g && !e && !(d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary() && d.getBogus()) ? true : false
            }

            function i(a) { return a.getCustomData("cke-fillingChar") }

            function j(a, b) {
                var c = a && a.removeCustomData("cke-fillingChar");
                if (c) {
                    if (b !== false) {
                        var d, g = a.getDocument().getSelection().getNative(),
                            e = g && g.type != "None" && g.getRangeAt(0);
                        if (c.getLength() > 1 && e && e.intersectsNode(c.$)) {
                            d = h(g);
                            e =
                                g.focusNode == c.$ && g.focusOffset > 0;
                            g.anchorNode == c.$ && g.anchorOffset > 0 && d[0].offset--;
                            e && d[1].offset--
                        }
                    }
                    c.setText(f(c.getText()));
                    d && k(a.getDocument().$, d)
                }
            }

            function f(a) { return a.replace(/\u200B( )?/g, function(a) { return a[1] ? " " : "" }) }

            function h(a) { return [{ node: a.anchorNode, offset: a.anchorOffset }, { node: a.focusNode, offset: a.focusOffset }] }

            function k(a, b) { var c = a.getSelection(),
                    d = a.createRange();
                d.setStart(b[0].node, b[0].offset);
                d.collapse(true);
                c.removeAllRanges();
                c.addRange(d);
                c.extend(b[1].node, b[1].offset) }

            function g(a) {
                var b = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', a.document);
                a.fire("lockSnapshot");
                a.editable().append(b);
                var c = a.getSelection(1),
                    d = a.createRange(),
                    g = c.root.on("selectionchange", function(a) { a.cancel() }, null, null, 0);
                d.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
                d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                c.selectRanges([d]);
                g.removeListener();
                a.fire("unlockSnapshot");
                a._.hiddenSelectionContainer = b
            }

            function m(a) { var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function(c) { var d = c.data.getKeystroke(); if (b[d]) { var g = a.getSelection().getRanges(),
                            e = g[0]; if (g.length == 1 && e.collapsed)
                            if ((d = e[d < 38 ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && d.getAttribute("contenteditable") == "false") { a.getSelection().fake(d);
                                c.data.preventDefault();
                                c.cancel() } } } }

            function p(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    c.getCommonAncestor().isReadOnly() && a.splice(b,
                        1);
                    if (!c.collapsed) {
                        if (c.startContainer.isReadOnly())
                            for (var d = c.startContainer, g; d;) { if ((g = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly()) break;
                                g && d.getAttribute("contentEditable") == "false" && c.setStartAfter(d);
                                d = d.getParent() } d = c.startContainer;
                        g = c.endContainer;
                        var e = c.startOffset,
                            f = c.endOffset,
                            h = c.clone();
                        d && d.type == CKEDITOR.NODE_TEXT && (e >= d.getLength() ? h.setStartAfter(d) : h.setStartBefore(d));
                        g && g.type == CKEDITOR.NODE_TEXT && (f ? h.setEndAfter(g) : h.setEndBefore(g));
                        d = new CKEDITOR.dom.walker(h);
                        d.evaluator = function(d) { if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) { var g = c.clone();
                                c.setEndBefore(d);
                                c.collapsed && a.splice(b--, 1); if (!(d.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS)) { g.setStartAfter(d);
                                    g.collapsed || a.splice(b + 1, 0, g) } return true } return false };
                        d.next()
                    }
                }
                return a
            }
            var q, o, n = CKEDITOR.dom.walker.invisible(1),
                l = function() {
                    function a(b) {
                        return function(a) {
                            var c = a.editor.createRange();
                            c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                            return false
                        }
                    }

                    function b(a) { return function(b) { var c = b.editor,
                                d = c.createRange(),
                                g; if (!(g = d.moveToClosestEditablePosition(b.selected, a))) g = d.moveToClosestEditablePosition(b.selected, !a);
                            g && c.getSelection().selectRanges([d]);
                            c.fire("saveSnapshot");
                            b.selected.remove(); if (!g) { d.moveToElementEditablePosition(c.editable());
                                c.getSelection().selectRanges([d]) } c.fire("saveSnapshot"); return false } }
                    var c = a(),
                        d = a(1);
                    return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
                }();
            CKEDITOR.on("instanceCreated", function(b) {
                function c() {
                    var a =
                        d.getSelection();
                    a && a.removeAllRanges()
                }
                var d = b.editor;
                d.on("contentDom", function() {
                    function b() { t = new CKEDITOR.dom.selection(d.getSelection());
                        t.lock() }

                    function c() { f.removeListener("mouseup", c);
                        k.removeListener("mouseup", c); var a = CKEDITOR.document.$.selection,
                            b = a.createRange();
                        a.type != "None" && b.parentElement().ownerDocument == g.$ && b.select() }
                    var g = d.document,
                        f = CKEDITOR.document,
                        h = d.editable(),
                        i = g.getBody(),
                        k = g.getDocumentElement(),
                        l = h.isInline(),
                        o, t;
                    CKEDITOR.env.gecko && h.attachListener(h, "focus",
                        function(a) { a.removeListener(); if (o !== 0)
                                if ((a = d.getSelection().getNative()) && a.isCollapsed && a.anchorNode == h.$) { a = d.createRange();
                                    a.moveToElementEditStart(h);
                                    a.select() } }, null, null, -2);
                    h.attachListener(h, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() { o && CKEDITOR.env.webkit && (o = d._.previousActive && d._.previousActive.equals(g.getActive()));
                        d.unlockSelection(o);
                        o = 0 }, null, null, -1);
                    h.attachListener(h, "mousedown", function() { o = 0 });
                    if (CKEDITOR.env.ie || l) {
                        s ? h.attachListener(h, "beforedeactivate", b, null,
                            null, -1) : h.attachListener(d, "selectionCheck", b, null, null, -1);
                        h.attachListener(h, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() { d.lockSelection(t);
                            o = 1 }, null, null, -1);
                        h.attachListener(h, "mousedown", function() { o = 0 })
                    }
                    if (CKEDITOR.env.ie && !l) {
                        var q;
                        h.attachListener(h, "mousedown", function(a) { if (a.data.$.button == 2) { a = d.document.getSelection(); if (!a || a.getType() == CKEDITOR.SELECTION_NONE) q = d.window.getScrollPosition() } });
                        h.attachListener(h, "mouseup", function(a) {
                            if (a.data.$.button == 2 && q) {
                                d.document.$.documentElement.scrollLeft =
                                    q.x;
                                d.document.$.documentElement.scrollTop = q.y
                            }
                            q = null
                        });
                        if (g.$.compatMode != "BackCompat") {
                            if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) k.on("mousedown", function(a) {
                                function b(a) { a = a.data.$; if (d) { var c = i.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (g) {} d.setEndPoint(e.compareEndPoints("StartToStart", c) < 0 ? "EndToEnd" : "StartToStart", c);
                                        d.select() } }

                                function c() { k.removeListener("mousemove", b);
                                    f.removeListener("mouseup", c);
                                    k.removeListener("mouseup", c);
                                    d.select() } a = a.data;
                                if (a.getTarget().is("html") &&
                                    a.$.y < k.$.clientHeight && a.$.x < k.$.clientWidth) { var d = i.$.createTextRange(); try { d.moveToPoint(a.$.clientX, a.$.clientY) } catch (g) {} var e = d.duplicate();
                                    k.on("mousemove", b);
                                    f.on("mouseup", c);
                                    k.on("mouseup", c) }
                            });
                            if (CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11) k.on("mousedown", function(a) { if (a.data.getTarget().is("html")) { f.on("mouseup", c);
                                    k.on("mouseup", c) } })
                        }
                    }
                    h.attachListener(h, "selectionchange", a, d);
                    h.attachListener(h, "keyup", e, d);
                    h.attachListener(h, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                        d.forceNextSelectionCheck();
                        d.selectionChange(1)
                    });
                    if (l && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { var n;
                        h.attachListener(h, "mousedown", function() { n = 1 });
                        h.attachListener(g.getDocumentElement(), "mouseup", function() { n && e.call(d);
                            n = 0 }) } else h.attachListener(CKEDITOR.env.ie ? h : g.getDocumentElement(), "mouseup", e, d);
                    CKEDITOR.env.webkit && h.attachListener(g, "keydown", function(a) { switch (a.data.getKey()) {
                            case 13:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 39:
                            case 8:
                            case 45:
                            case 46:
                                j(h) } }, null, null, -1);
                    h.attachListener(h, "keydown", m(d),
                        null, null, -1)
                });
                d.on("setData", function() { d.unlockSelection();
                    CKEDITOR.env.webkit && c() });
                d.on("contentDomUnload", function() { d.unlockSelection() });
                if (CKEDITOR.env.ie9Compat) d.on("beforeDestroy", c, null, null, 9);
                d.on("dataReady", function() { delete d._.fakeSelection;
                    delete d._.hiddenSelectionContainer;
                    d.selectionChange(1) });
                d.on("loadSnapshot", function() {
                    var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
                        b = d.editable().getLast(a);
                    if (b && b.hasAttribute("data-cke-hidden-sel")) {
                        b.remove();
                        if (CKEDITOR.env.gecko)(a =
                            d.editable().getFirst(a)) && (a.is("br") && a.getAttribute("_moz_editor_bogus_node")) && a.remove()
                    }
                }, null, null, 100);
                d.on("key", function(a) { if (d.mode == "wysiwyg") { var b = d.getSelection(); if (b.isFake) { var c = l[a.data.keyCode]; if (c) return c({ editor: d, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
            });
            CKEDITOR.on("instanceReady", function(a) {
                function b() {
                    var a = d.editable();
                    if (a)
                        if (a = i(a)) {
                            var c = d.document.$.getSelection();
                            if (c.type != "None" && (c.anchorNode == a.$ || c.focusNode == a.$)) e = h(c);
                            g = a.getText();
                            a.setText(f(g))
                        }
                }

                function c() { var a = d.editable(); if (a)
                        if (a = i(a)) { a.setText(g); if (e) { k(d.document.$, e);
                                e = null } } }
                var d = a.editor,
                    g, e;
                if (CKEDITOR.env.webkit) { d.on("selectionChange", function() { var a = d.editable(),
                            b = i(a);
                        b && (b.getCustomData("ready") ? j(a) : b.setCustomData("ready", 1)) }, null, null, -1);
                    d.on("beforeSetMode", function() { j(d.editable()) }, null, null, -1);
                    d.on("beforeUndoImage", b);
                    d.on("afterUndoImage", c);
                    d.on("beforeGetData", b, null, null, 0);
                    d.on("getData", c) }
            });
            CKEDITOR.editor.prototype.selectionChange =
                function(b) {
                    (b ? a : e).call(this) };
            CKEDITOR.editor.prototype.getSelection = function(a) { if ((this._.savedSelection || this._.fakeSelection) && !a) return this._.savedSelection || this._.fakeSelection; return (a = this.editable()) && this.mode == "wysiwyg" ? new CKEDITOR.dom.selection(a) : null };
            CKEDITOR.editor.prototype.lockSelection = function(a) { a = a || this.getSelection(1); if (a.getType() != CKEDITOR.SELECTION_NONE) {!a.isLocked && a.lock();
                    this._.savedSelection = a; return true } return false };
            CKEDITOR.editor.prototype.unlockSelection =
                function(a) { var b = this._.savedSelection; if (b) { b.unlock(a);
                        delete this._.savedSelection; return true } return false };
            CKEDITOR.editor.prototype.forceNextSelectionCheck = function() { delete this._.selectionPreviousPath };
            CKEDITOR.dom.document.prototype.getSelection = function() { return new CKEDITOR.dom.selection(this) };
            CKEDITOR.dom.range.prototype.select = function() { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
                a.selectRanges([this]); return a };
            CKEDITOR.SELECTION_NONE = 1;
            CKEDITOR.SELECTION_TEXT = 2;
            CKEDITOR.SELECTION_ELEMENT = 3;
            var s = typeof window.getSelection != "function",
                t = 1;
            CKEDITOR.dom.selection = function(a) {
                if (a instanceof CKEDITOR.dom.selection) var b = a,
                    a = a.root;
                var c = a instanceof CKEDITOR.dom.element;
                this.rev = b ? b.rev : t++;
                this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
                this.root = c ? a : this.document.getBody();
                this.isLocked = 0;
                this._ = { cache: {} };
                if (b) {
                    CKEDITOR.tools.extend(this._.cache, b._.cache);
                    this.isFake = b.isFake;
                    this.isLocked =
                        b.isLocked;
                    return this
                }
                var a = this.getNative(),
                    d, g;
                if (a)
                    if (a.getRangeAt) d = (g = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer);
                    else { try { g = a.createRange() } catch (e) {} d = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement()) }
                if (!d || !(d.type == CKEDITOR.NODE_ELEMENT || d.type == CKEDITOR.NODE_TEXT) || !this.root.equals(d) && !this.root.contains(d)) {
                    this._.cache.type = CKEDITOR.SELECTION_NONE;
                    this._.cache.startElement = null;
                    this._.cache.selectedElement = null;
                    this._.cache.selectedText =
                        "";
                    this._.cache.ranges = new CKEDITOR.dom.rangeList
                }
                return this
            };
            var w = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 };
            CKEDITOR.dom.selection.prototype = {
                getNative: function() { return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = s ? this.document.$.selection : this.document.getWindow().$.getSelection() },
                getType: s ? function() {
                    var a = this._.cache;
                    if (a.type) return a.type;
                    var b = CKEDITOR.SELECTION_NONE;
                    try { var c = this.getNative(),
                            d = c.type; if (d == "Text") b = CKEDITOR.SELECTION_TEXT; if (d == "Control") b = CKEDITOR.SELECTION_ELEMENT; if (c.createRange().parentElement()) b = CKEDITOR.SELECTION_TEXT } catch (g) {}
                    return a.type = b
                } : function() {
                    var a = this._.cache;
                    if (a.type) return a.type;
                    var b = CKEDITOR.SELECTION_TEXT,
                        c = this.getNative();
                    if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
                    else if (c.rangeCount == 1) {
                        var c = c.getRangeAt(0),
                            d = c.startContainer;
                        if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && w[d.childNodes[c.startOffset].nodeName.toLowerCase()]) b =
                            CKEDITOR.SELECTION_ELEMENT
                    }
                    return a.type = b
                },
                getRanges: function() {
                    var a = s ? function() {
                        function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() }
                        var b = function(b, c) {
                            b = b.duplicate();
                            b.collapse(c);
                            var d = b.parentElement();
                            if (!d.hasChildNodes()) return { container: d, offset: 0 };
                            for (var g = d.children, e, f, h = b.duplicate(), i = 0, k = g.length - 1, j = -1, m, l; i <= k;) { j = Math.floor((i + k) / 2);
                                e = g[j];
                                h.moveToElementText(e);
                                m = h.compareEndPoints("StartToStart", b); if (m > 0) k = j - 1;
                                else if (m < 0) i = j + 1;
                                else return { container: d, offset: a(e) } }
                            if (j ==
                                -1 || j == g.length - 1 && m < 0) { h.moveToElementText(d);
                                h.setEndPoint("StartToStart", b);
                                h = h.text.replace(/(\r\n|\r)/g, "\n").length;
                                g = d.childNodes; if (!h) { e = g[g.length - 1]; return e.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: g.length } : { container: e, offset: e.nodeValue.length } } for (d = g.length; h > 0 && d > 0;) { f = g[--d]; if (f.nodeType == CKEDITOR.NODE_TEXT) { l = f;
                                        h = h - f.nodeValue.length } } return { container: l, offset: -h } } h.collapse(m > 0 ? true : false);
                            h.setEndPoint(m > 0 ? "StartToStart" : "EndToStart", b);
                            h = h.text.replace(/(\r\n|\r)/g,
                                "\n").length;
                            if (!h) return { container: d, offset: a(e) + (m > 0 ? 0 : 1) };
                            for (; h > 0;) try { f = e[m > 0 ? "previousSibling" : "nextSibling"]; if (f.nodeType == CKEDITOR.NODE_TEXT) { h = h - f.nodeValue.length;
                                    l = f } e = f } catch (o) { return { container: d, offset: a(e) } }
                            return { container: l, offset: m > 0 ? -h : l.nodeValue.length + h }
                        };
                        return function() {
                            var a = this.getNative(),
                                c = a && a.createRange(),
                                d = this.getType();
                            if (!a) return [];
                            if (d == CKEDITOR.SELECTION_TEXT) {
                                a = new CKEDITOR.dom.range(this.root);
                                d = b(c, true);
                                a.setStart(new CKEDITOR.dom.node(d.container), d.offset);
                                d = b(c);
                                a.setEnd(new CKEDITOR.dom.node(d.container), d.offset);
                                a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                                return [a]
                            }
                            if (d == CKEDITOR.SELECTION_ELEMENT) { for (var d = [], g = 0; g < c.length; g++) { for (var e = c.item(g), f = e.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < f.childNodes.length && f.childNodes[h] != e; h++);
                                    a.setStart(new CKEDITOR.dom.node(f), h);
                                    a.setEnd(new CKEDITOR.dom.node(f), h + 1);
                                    d.push(a) } return d }
                            return []
                        }
                    }() : function() {
                        var a = [],
                            b, c = this.getNative();
                        if (!c) return a;
                        for (var d = 0; d < c.rangeCount; d++) { var g = c.getRangeAt(d);
                            b = new CKEDITOR.dom.range(this.root);
                            b.setStart(new CKEDITOR.dom.node(g.startContainer), g.startOffset);
                            b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset);
                            a.push(b) }
                        return a
                    };
                    return function(b) { var c = this._.cache,
                            d = c.ranges; if (!d) c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this)); return !b ? d : p(new CKEDITOR.dom.rangeList(d.slice())) }
                }(),
                getStartElement: function() {
                    var a = this._.cache;
                    if (a.startElement !==
                        void 0) return a.startElement;
                    var b;
                    switch (this.getType()) {
                        case CKEDITOR.SELECTION_ELEMENT:
                            return this.getSelectedElement();
                        case CKEDITOR.SELECTION_TEXT:
                            var c = this.getRanges()[0];
                            if (c) {
                                if (c.collapsed) { b = c.startContainer;
                                    b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()) } else {
                                    for (c.optimize();;) { b = c.startContainer; if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary()) c.setStartAfter(b);
                                        else break } b = c.startContainer;
                                    if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                                    b = b.getChild(c.startOffset);
                                    if (!b || b.type != CKEDITOR.NODE_ELEMENT) b = c.startContainer;
                                    else
                                        for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) { b = c;
                                            c = c.getFirst() }
                                }
                                b = b.$
                            }
                    }
                    return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                },
                getSelectedElement: function() {
                    var a = this._.cache;
                    if (a.selectedElement !== void 0) return a.selectedElement;
                    var b = this,
                        c = CKEDITOR.tools.tryThese(function() { return b.getNative().createRange().item(0) }, function() {
                            for (var a = b.getRanges()[0].clone(), c, d, g = 2; g && (!(c = a.getEnclosedNode()) ||
                                    !(c.type == CKEDITOR.NODE_ELEMENT && w[c.getName()] && (d = c))); g--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
                            return d && d.$
                        });
                    return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                },
                getSelectedText: function() { var a = this._.cache; if (a.selectedText !== void 0) return a.selectedText; var b = this.getNative(),
                        b = s ? b.type == "Control" ? "" : b.createRange().text : b.toString(); return a.selectedText = b },
                lock: function() {
                    this.getRanges();
                    this.getStartElement();
                    this.getSelectedElement();
                    this.getSelectedText();
                    this._.cache.nativeSel =
                        null;
                    this.isLocked = 1
                },
                unlock: function(a) { if (this.isLocked) { if (a) var b = this.getSelectedElement(),
                            c = !b && this.getRanges(),
                            d = this.isFake;
                        this.isLocked = 0;
                        this.reset(); if (a)(a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c)) } },
                reset: function() {
                    this._.cache = {};
                    this.isFake = 0;
                    var a = this.root.editor;
                    if (a && a._.fakeSelection && this.rev == a._.fakeSelection.rev) {
                        delete a._.fakeSelection;
                        var b = a._.hiddenSelectionContainer;
                        if (b) {
                            var c = a.checkDirty();
                            a.fire("lockSnapshot");
                            b.remove();
                            a.fire("unlockSnapshot");
                            !c && a.resetDirty()
                        }
                        delete a._.hiddenSelectionContainer
                    }
                    this.rev = t++
                },
                selectElement: function(a) { var b = new CKEDITOR.dom.range(this.root);
                    b.setStartBefore(a);
                    b.setEndAfter(a);
                    this.selectRanges([b]) },
                selectRanges: function(a) {
                    var b = this.root.editor,
                        b = b && b._.hiddenSelectionContainer;
                    this.reset();
                    if (b)
                        for (var b = this.root, c, g = 0; g < a.length; ++g) { c = a[g]; if (c.endContainer.equals(b)) c.endOffset = Math.min(c.endOffset, b.getChildCount()) }
                    if (a.length)
                        if (this.isLocked) {
                            var e =
                                CKEDITOR.document.getActive();
                            this.unlock();
                            this.selectRanges(a);
                            this.lock();
                            e && !e.equals(this.root) && e.focus()
                        } else {
                            var f;
                            a: { var h, i; if (a.length == 1 && !(i = a[0]).collapsed && (f = i.getEnclosedNode()) && f.type == CKEDITOR.NODE_ELEMENT) { i = i.clone();
                                    i.shrink(CKEDITOR.SHRINK_ELEMENT, true); if ((h = i.getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT) f = h; if (f.getAttribute("contenteditable") == "false") break a } f = void 0 }
                            if (f) this.fake(f);
                            else {
                                if (s) {
                                    i = CKEDITOR.dom.walker.whitespaces(true);
                                    h = /\ufeff|\u00a0/;
                                    b = {
                                        table: 1,
                                        tbody: 1,
                                        tr: 1
                                    };
                                    if (a.length > 1) { f = a[a.length - 1];
                                        a[0].setEnd(f.endContainer, f.endOffset) } f = a[0];
                                    var a = f.collapsed,
                                        k, m, l;
                                    if ((c = f.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in w && (!c.is("a") || !c.getText())) try { l = c.$.createControlRange();
                                        l.addElement(c.$);
                                        l.select(); return } catch (o) {}
                                    if (f.startContainer.type == CKEDITOR.NODE_ELEMENT && f.startContainer.getName() in b || f.endContainer.type == CKEDITOR.NODE_ELEMENT && f.endContainer.getName() in b) { f.shrink(CKEDITOR.NODE_ELEMENT, true);
                                        a = f.collapsed } l =
                                        f.createBookmark();
                                    b = l.startNode;
                                    if (!a) e = l.endNode;
                                    l = f.document.$.body.createTextRange();
                                    l.moveToElementText(b.$);
                                    l.moveStart("character", 1);
                                    if (e) { h = f.document.$.body.createTextRange();
                                        h.moveToElementText(e.$);
                                        l.setEndPoint("EndToEnd", h);
                                        l.moveEnd("character", -1) } else { k = b.getNext(i);
                                        m = b.hasAscendant("pre");
                                        k = !(k && k.getText && k.getText().match(h)) && (m || !b.hasPrevious() || b.getPrevious().is && b.getPrevious().is("br"));
                                        m = f.document.createElement("span");
                                        m.setHtml("&#65279;");
                                        m.insertBefore(b);
                                        k && f.document.createText("﻿").insertBefore(b) } f.setStartBefore(b);
                                    b.remove();
                                    if (a) { if (k) { l.moveStart("character", -1);
                                            l.select();
                                            f.document.$.selection.clear() } else l.select();
                                        f.moveToPosition(m, CKEDITOR.POSITION_BEFORE_START);
                                        m.remove() } else { f.setEndBefore(e);
                                        e.remove();
                                        l.select() }
                                } else {
                                    e = this.getNative();
                                    if (!e) return;
                                    this.removeAllRanges();
                                    for (l = 0; l < a.length; l++) {
                                        if (l < a.length - 1) {
                                            k = a[l];
                                            m = a[l + 1];
                                            h = k.clone();
                                            h.setStart(k.endContainer, k.endOffset);
                                            h.setEnd(m.startContainer, m.startOffset);
                                            if (!h.collapsed) {
                                                h.shrink(CKEDITOR.NODE_ELEMENT, true);
                                                f = h.getCommonAncestor();
                                                h = h.getEnclosedNode();
                                                if (f.isReadOnly() || h && h.isReadOnly()) { m.setStart(k.startContainer, k.startOffset);
                                                    a.splice(l--, 1); continue }
                                            }
                                        }
                                        f = a[l];
                                        m = this.document.$.createRange();
                                        if (f.collapsed && CKEDITOR.env.webkit && d(f)) { k = this.root;
                                            j(k, false);
                                            h = k.getDocument().createText("​");
                                            k.setCustomData("cke-fillingChar", h);
                                            f.insertNode(h); if ((k = h.getNext()) && !h.getPrevious() && k.type == CKEDITOR.NODE_ELEMENT && k.getName() == "br") { j(this.root);
                                                f.moveToPosition(k, CKEDITOR.POSITION_BEFORE_START) } else f.moveToPosition(h, CKEDITOR.POSITION_AFTER_END) } m.setStart(f.startContainer.$,
                                            f.startOffset);
                                        try { m.setEnd(f.endContainer.$, f.endOffset) } catch (t) { if (t.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) { f.collapse(1);
                                                m.setEnd(f.endContainer.$, f.endOffset) } else throw t; } e.addRange(m)
                                    }
                                }
                                this.reset();
                                this.root.fire("selectionchange")
                            }
                        }
                },
                fake: function(a) {
                    var b = this.root.editor;
                    this.reset();
                    g(b);
                    var c = this._.cache,
                        d = new CKEDITOR.dom.range(this.root);
                    d.setStartBefore(a);
                    d.setEndAfter(a);
                    c.ranges = new CKEDITOR.dom.rangeList(d);
                    c.selectedElement = c.startElement = a;
                    c.type = CKEDITOR.SELECTION_ELEMENT;
                    c.selectedText = c.nativeSel = null;
                    this.isFake = 1;
                    this.rev = t++;
                    b._.fakeSelection = this;
                    this.root.fire("selectionchange")
                },
                isHidden: function() { var a = this.getCommonAncestor();
                    a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) },
                createBookmarks: function(a) { a = this.getRanges().createBookmarks(a);
                    this.isFake && (a.isFake = 1); return a },
                createBookmarks2: function(a) { a = this.getRanges().createBookmarks2(a);
                    this.isFake && (a.isFake = 1); return a },
                selectBookmarks: function(a) {
                    for (var b = [], c, d = 0; d < a.length; d++) { var g = new CKEDITOR.dom.range(this.root);
                        g.moveToBookmark(a[d]);
                        b.push(g) }
                    if (a.isFake) { c = b[0].getEnclosedNode(); if (!c || c.type != CKEDITOR.NODE_ELEMENT) a.isFake = 0 } a.isFake ? this.fake(c) : this.selectRanges(b);
                    return this
                },
                getCommonAncestor: function() { var a = this.getRanges(); return !a.length ? null : a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) },
                scrollIntoView: function() { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() },
                removeAllRanges: function() {
                    if (this.getType() !=
                        CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[s ? "empty" : "removeAllRanges"]() } catch (b) {} this.reset() }
                }
            }
        }(), "use strict", CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3,
        function() {
            function a(a, b) { for (var c, d; a = a.getParent();) { if (a.equals(b)) break; if (a.getAttribute("data-nostyle")) c = a;
                    else if (!d) { var g = a.getAttribute("contentEditable");
                        g == "false" ? c = a : g == "true" && (d = 1) } } return c }

            function e(b) {
                var d = b.document;
                if (b.collapsed) {
                    d = l(this, d);
                    b.insertNode(d);
                    b.moveToPosition(d,
                        CKEDITOR.POSITION_BEFORE_END)
                } else {
                    var g = this.element,
                        f = this._.definition,
                        h, k = f.ignoreReadonly,
                        i = k || f.includeReadonly;
                    i == null && (i = b.root.getCustomData("cke_includeReadonly"));
                    var j = CKEDITOR.dtd[g];
                    if (!j) { h = true;
                        j = CKEDITOR.dtd.span } b.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                    b.trim();
                    var m = b.createBookmark(),
                        o = m.startNode,
                        t = m.endNode,
                        s = o,
                        n;
                    if (!k) { var p = b.getCommonAncestor(),
                            k = a(o, p),
                            p = a(t, p);
                        k && (s = k.getNextSourceNode(true));
                        p && (t = p) }
                    for (s.getPosition(t) == CKEDITOR.POSITION_FOLLOWING && (s = 0); s;) {
                        k = false;
                        if (s.equals(t)) {
                            s =
                                null;
                            k = true
                        } else {
                            var w = s.type == CKEDITOR.NODE_ELEMENT ? s.getName() : null,
                                p = w && s.getAttribute("contentEditable") == "false",
                                v = w && s.getAttribute("data-nostyle");
                            if (w && s.data("cke-bookmark")) { s = s.getNextSourceNode(true); continue }
                            if (p && i && CKEDITOR.dtd.$block[w])
                                for (var x = s, u = c(x), r = void 0, y = u.length, z = 0, x = y && new CKEDITOR.dom.range(x.getDocument()); z < y; ++z) { var r = u[z],
                                        A = CKEDITOR.filter.instances[r.data("cke-filter")]; if (A ? A.check(this) : 1) { x.selectNodeContents(r);
                                        e.call(this, x) } } u = w ? !j[w] || v ? 0 : p && !i ? 0 : (s.getPosition(t) |
                                    D) == D && (!f.childRule || f.childRule(s)) : 1;
                            if (u)
                                if ((u = s.getParent()) && ((u.getDtd() || CKEDITOR.dtd.span)[g] || h) && (!f.parentRule || f.parentRule(u))) { if (!n && (!w || !CKEDITOR.dtd.$removeEmpty[w] || (s.getPosition(t) | D) == D)) { n = b.clone();
                                        n.setStartBefore(s) } w = s.type; if (w == CKEDITOR.NODE_TEXT || p || w == CKEDITOR.NODE_ELEMENT && !s.getChildCount()) { for (var w = s, $;
                                            (k = !w.getNext(B)) && ($ = w.getParent(), j[$.getName()]) && ($.getPosition(o) | C) == C && (!f.childRule || f.childRule($));) w = $;
                                        n.setEndAfter(w) } } else k = true;
                            else k = true;
                            s = s.getNextSourceNode(v ||
                                p)
                        }
                        if (k && n && !n.collapsed) {
                            for (var k = l(this, d), p = k.hasAttributes(), v = n.getCommonAncestor(), w = {}, u = {}, r = {}, y = {}, Y, W, aa; k && v;) { if (v.getName() == g) { for (Y in f.attributes)
                                        if (!y[Y] && (aa = v.getAttribute(W))) k.getAttribute(Y) == aa ? u[Y] = 1 : y[Y] = 1; for (W in f.styles)
                                        if (!r[W] && (aa = v.getStyle(W))) k.getStyle(W) == aa ? w[W] = 1 : r[W] = 1 } v = v.getParent() }
                            for (Y in u) k.removeAttribute(Y);
                            for (W in w) k.removeStyle(W);
                            p && !k.hasAttributes() && (k = null);
                            if (k) {
                                n.extractContents().appendTo(k);
                                n.insertNode(k);
                                q.call(this, k);
                                k.mergeSiblings();
                                CKEDITOR.env.ie || k.$.normalize()
                            } else { k = new CKEDITOR.dom.element("span");
                                n.extractContents().appendTo(k);
                                n.insertNode(k);
                                q.call(this, k);
                                k.remove(true) } n = null
                        }
                    }
                    b.moveToBookmark(m);
                    b.shrink(CKEDITOR.SHRINK_TEXT);
                    b.shrink(CKEDITOR.NODE_ELEMENT, true)
                }
            }

            function b(a) {
                function b() {
                    for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(i.getParent()), g = null, e = null, f = 0; f < a.elements.length; f++) {
                        var h = a.elements[f];
                        if (h == a.block || h == a.blockLimit) break;
                        j.checkElementRemovable(h,
                            true) && (g = h)
                    }
                    for (f = 0; f < c.elements.length; f++) { h = c.elements[f]; if (h == c.block || h == c.blockLimit) break;
                        j.checkElementRemovable(h, true) && (e = h) } e && i.breakParent(e);
                    g && d.breakParent(g)
                }
                a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                var c = a.createBookmark(),
                    d = c.startNode;
                if (a.collapsed) {
                    for (var g = new CKEDITOR.dom.elementPath(d.getParent(), a.root), e, f = 0, h; f < g.elements.length && (h = g.elements[f]); f++) {
                        if (h == g.block || h == g.blockLimit) break;
                        if (this.checkElementRemovable(h)) {
                            var k;
                            if (a.collapsed && (a.checkBoundaryOfElement(h,
                                    CKEDITOR.END) || (k = a.checkBoundaryOfElement(h, CKEDITOR.START)))) { e = h;
                                e.match = k ? "start" : "end" } else { h.mergeSiblings();
                                h.is(this.element) ? p.call(this, h) : o(h, w(this)[h.getName()]) }
                        }
                    }
                    if (e) { h = d; for (f = 0;; f++) { k = g.elements[f]; if (k.equals(e)) break;
                            else if (k.match) continue;
                            else k = k.clone();
                            k.append(h);
                            h = k } h[e.match == "start" ? "insertBefore" : "insertAfter"](e) }
                } else {
                    var i = c.endNode,
                        j = this;
                    b();
                    for (g = d; !g.equals(i);) {
                        e = g.getNextSourceNode();
                        if (g.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(g)) {
                            g.getName() ==
                                this.element ? p.call(this, g) : o(g, w(this)[g.getName()]);
                            if (e.type == CKEDITOR.NODE_ELEMENT && e.contains(d)) { b();
                                e = d.getNext() }
                        }
                        g = e
                    }
                }
                a.moveToBookmark(c);
                a.shrink(CKEDITOR.NODE_ELEMENT, true)
            }

            function c(a) { var b = [];
                a.forEach(function(a) { if (a.getAttribute("contenteditable") == "true") { b.push(a); return false } }, CKEDITOR.NODE_ELEMENT, true); return b }

            function d(a) {
                var b = a.getEnclosedNode() || a.getCommonAncestor(false, true);
                (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && s(a,
                    this)
            }

            function i(a) { var b = a.getCommonAncestor(true, true); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) { var b = this._.definition,
                        c = b.attributes; if (c)
                        for (var d in c) a.removeAttribute(d, c[d]); if (b.styles)
                        for (var g in b.styles) b.styles.hasOwnProperty(g) && a.removeStyle(g) } }

            function j(a) {
                var b = a.createBookmark(true),
                    c = a.createIterator();
                c.enforceRealBlocks = true;
                if (this._.enterMode) c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                for (var d, g = a.document, e; d = c.getNextParagraph();)
                    if (!d.isReadOnly() &&
                        (c.activeFilter ? c.activeFilter.check(this) : 1)) { e = l(this, g, d);
                        h(d, e) }
                a.moveToBookmark(b)
            }

            function f(a) { var b = a.createBookmark(1),
                    c = a.createIterator();
                c.enforceRealBlocks = true;
                c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var d, g; d = c.getNextParagraph();)
                    if (this.checkElementRemovable(d))
                        if (d.is("pre")) {
                            (g = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(g);
                            h(d, g) } else p.call(this, d);
                a.moveToBookmark(b) }

            function h(a,
                b) {
                var c = !b;
                if (c) { b = a.getDocument().createElement("div");
                    a.copyAttributes(b) }
                var d = b && b.is("pre"),
                    e = a.is("pre"),
                    f = !d && e;
                if (d && !e) {
                    e = b;
                    (f = a.getBogus()) && f.remove();
                    f = a.getHtml();
                    f = g(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                    f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                    f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                    f = f.replace(/<br\b[^>]*>/gi, "\n");
                    if (CKEDITOR.env.ie) { var h = a.getDocument().createElement("div");
                        h.append(e);
                        e.$.outerHTML = "<pre>" + f + "</pre>";
                        e.copyAttributes(h.getFirst());
                        e = h.getFirst().remove() } else e.setHtml(f);
                    b = e
                } else f ? b = m(c ? [a.getHtml()] : k(a), b) : a.moveChildren(b);
                b.replace(a);
                if (d) { var c = b,
                        i; if ((i = c.getPrevious(A)) && i.type == CKEDITOR.NODE_ELEMENT && i.is("pre")) { d = g(i.getHtml(), /\n$/, "") + "\n\n" + g(c.getHtml(), /^\n/, "");
                        CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d);
                        i.remove() } } else c && n(b)
            }

            function k(a) {
                var b = [];
                g(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) { return b + "</pre>" + c + "<pre>" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a,
                    c) { b.push(c) });
                return b
            }

            function g(a, b, c) { var d = "",
                    g = "",
                    a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) { b && (d = b);
                        c && (g = c); return "" }); return d + a.replace(b, c) + g }

            function m(a, b) {
                var c;
                a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
                for (var d = 0; d < a.length; d++) {
                    var e = a[d],
                        e = e.replace(/(\r\n|\r)/g, "\n"),
                        e = g(e, /^[ \t]*\n/, ""),
                        e = g(e, /\n$/, ""),
                        e = g(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
                            return a.length == 1 ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;",
                                a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                        }),
                        e = e.replace(/\n/g, "<br>"),
                        e = e.replace(/[ \t]{2,}/g, function(a) { return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " " });
                    if (c) { var f = b.clone();
                        f.setHtml(e);
                        c.append(f) } else b.setHtml(e)
                }
                return c || b
            }

            function p(a, b) {
                var c = this._.definition,
                    d = c.attributes,
                    c = c.styles,
                    g = w(this)[a.getName()],
                    e = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
                    f;
                for (f in d)
                    if (!((f == "class" || this._.definition.fullMatch) && a.getAttribute(f) != v(f, d[f])) && !(b && f.slice(0,
                            5) == "data-")) { e = a.hasAttribute(f);
                        a.removeAttribute(f) }
                for (var h in c)
                    if (!(this._.definition.fullMatch && a.getStyle(h) != v(h, c[h], true))) { e = e || !!a.getStyle(h);
                        a.removeStyle(h) }
                o(a, g, u[a.getName()]);
                e && (this._.definition.alwaysRemoveElement ? n(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? n(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            }

            function q(a) {
                for (var b = w(this), c = a.getElementsByTag(this.element), d, g = c.count(); --g >= 0;) {
                    d = c.getItem(g);
                    d.isReadOnly() || p.call(this, d, true)
                }
                for (var e in b)
                    if (e != this.element) { c = a.getElementsByTag(e); for (g = c.count() - 1; g >= 0; g--) { d = c.getItem(g);
                            d.isReadOnly() || o(d, b[e]) } }
            }

            function o(a, b, c) { if (b = b && b.attributes)
                    for (var d = 0; d < b.length; d++) { var g = b[d][0],
                            e; if (e = a.getAttribute(g)) { var f = b[d][1];
                            (f === null || f.test && f.test(e) || typeof f == "string" && e == f) && a.removeAttribute(g) } } c || n(a) }

            function n(a, b) {
                if (!a.hasAttributes() || b)
                    if (CKEDITOR.dtd.$block[a.getName()]) {
                        var c = a.getPrevious(A),
                            d = a.getNext(A);
                        c && (c.type ==
                            CKEDITOR.NODE_TEXT || !c.isBlockBoundary({ br: 1 })) && a.append("br", 1);
                        d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({ br: 1 })) && a.append("br");
                        a.remove(true)
                    } else { c = a.getFirst();
                        d = a.getLast();
                        a.remove(true); if (c) { c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings();
                            d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings() } }
            }

            function l(a, b, c) {
                var d;
                d = a.element;
                d == "*" && (d = "span");
                d = new CKEDITOR.dom.element(d, b);
                c && c.copyAttributes(d);
                d = s(d, a);
                b.getCustomData("doc_processing_style") && d.hasAttribute("id") ?
                    d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
                return d
            }

            function s(a, b) { var c = b._.definition,
                    d = c.attributes,
                    c = CKEDITOR.style.getStyleText(c); if (d)
                    for (var g in d) a.setAttribute(g, d[g]);
                c && a.setAttribute("style", c); return a }

            function t(a, b) { for (var c in a) a[c] = a[c].replace(z, function(a, c) { return b[c] }) }

            function w(a) {
                if (a._.overrides) return a._.overrides;
                var b = a._.overrides = {},
                    c = a._.definition.overrides;
                if (c) {
                    CKEDITOR.tools.isArray(c) || (c = [c]);
                    for (var d = 0; d < c.length; d++) {
                        var g = c[d],
                            e, f;
                        if (typeof g == "string") e = g.toLowerCase();
                        else { e = g.element ? g.element.toLowerCase() : a.element;
                            f = g.attributes } g = b[e] || (b[e] = {});
                        if (f) { var g = g.attributes = g.attributes || [],
                                h; for (h in f) g.push([h.toLowerCase(), f[h]]) }
                    }
                }
                return b
            }

            function v(a, b, c) { var d = new CKEDITOR.dom.element("span");
                d[c ? "setStyle" : "setAttribute"](a, b); return d[c ? "getStyle" : "getAttribute"](a) }

            function x(a, b, c) {
                for (var d = a.document, g = a.getRanges(), b = b ? this.removeFromRange : this.applyToRange, e, f = g.createIterator(); e = f.getNextRange();) b.call(this,
                    e, c);
                a.selectRanges(g);
                d.removeCustomData("doc_processing_style")
            }
            var u = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 },
                r = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 },
                y = /\s*(?:;\s*|$)/,
                z = /#\((.+?)\)/g,
                B = CKEDITOR.dom.walker.bookmark(0, 1),
                A = CKEDITOR.dom.walker.whitespaces(1);
            CKEDITOR.style = function(a, b) {
                if (typeof a.type == "string") return new CKEDITOR.style.customHandlers[a.type](a);
                var c = a.attributes;
                if (c && c.style) { a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style));
                    delete c.style }
                if (b) { a = CKEDITOR.tools.clone(a);
                    t(a.attributes, b);
                    t(a.styles, b) } c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
                this.type = a.type || (u[c] ? CKEDITOR.STYLE_BLOCK : r[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
                if (typeof this.element ==
                    "object") this.type = CKEDITOR.STYLE_OBJECT;
                this._ = { definition: a }
            };
            CKEDITOR.style.prototype = {
                apply: function(a) { if (a instanceof CKEDITOR.dom.document) return x.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; if (!b) this._.enterMode = a.activeEnterMode;
                        x.call(this, a.getSelection(), 0, a);
                        this._.enterMode = b } },
                remove: function(a) {
                    if (a instanceof CKEDITOR.dom.document) return x.call(this, a.getSelection(), 1);
                    if (this.checkApplicable(a.elementPath(), a)) {
                        var b = this._.enterMode;
                        if (!b) this._.enterMode = a.activeEnterMode;
                        x.call(this, a.getSelection(), 1, a);
                        this._.enterMode = b
                    }
                },
                applyToRange: function(a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? e : this.type == CKEDITOR.STYLE_BLOCK ? j : this.type == CKEDITOR.STYLE_OBJECT ? d : null; return this.applyToRange(a) },
                removeFromRange: function(a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? f : this.type == CKEDITOR.STYLE_OBJECT ? i : null; return this.removeFromRange(a) },
                applyToObject: function(a) { s(a, this) },
                checkActive: function(a, b) { switch (this.type) {
                        case CKEDITOR.STYLE_BLOCK:
                            return this.checkElementRemovable(a.block || a.blockLimit, true, b);
                        case CKEDITOR.STYLE_OBJECT:
                        case CKEDITOR.STYLE_INLINE:
                            for (var c = a.elements, d = 0, g; d < c.length; d++) { g = c[d]; if (!(this.type == CKEDITOR.STYLE_INLINE && (g == a.block || g == a.blockLimit))) { if (this.type == CKEDITOR.STYLE_OBJECT) { var e = g.getName(); if (!(typeof this.element == "string" ? e == this.element : e in this.element)) continue } if (this.checkElementRemovable(g, true, b)) return true } } } return false },
                checkApplicable: function(a, b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return false; switch (this.type) {
                        case CKEDITOR.STYLE_OBJECT:
                            return !!a.contains(this.element);
                        case CKEDITOR.STYLE_BLOCK:
                            return !!a.blockLimit.getDtd()[this.element] } return true },
                checkElementMatch: function(a, b) {
                    var c = this._.definition;
                    if (!a || !c.ignoreReadonly && a.isReadOnly()) return false;
                    var d = a.getName();
                    if (typeof this.element == "string" ? d == this.element : d in this.element) {
                        if (!b && !a.hasAttributes()) return true;
                        if (d =
                            c._AC) c = d;
                        else { var d = {},
                                g = 0,
                                e = c.attributes; if (e)
                                for (var f in e) { g++;
                                    d[f] = e[f] }
                            if (f = CKEDITOR.style.getStyleText(c)) { d.style || g++;
                                d.style = f } d._length = g;
                            c = c._AC = d }
                        if (c._length) { for (var h in c)
                                if (h != "_length") { g = a.getAttribute(h) || ""; if (h == "style") a: { d = c[h];typeof d == "string" && (d = CKEDITOR.tools.parseCssText(d));typeof g == "string" && (g = CKEDITOR.tools.parseCssText(g, true));f = void 0; for (f in d)
                                            if (!(f in g && (g[f] == d[f] || d[f] == "inherit" || g[f] == "inherit"))) { d = false; break a }
                                        d = true }
                                    else d = c[h] == g; if (d) { if (!b) return true } else if (b) return false }
                            if (b) return true } else return true
                    }
                    return false
                },
                checkElementRemovable: function(a, b, c) { if (this.checkElementMatch(a, b, c)) return true; if (b = w(this)[a.getName()]) { var d; if (!(b = b.attributes)) return true; for (c = 0; c < b.length; c++) { d = b[c][0]; if (d = a.getAttribute(d)) { var g = b[c][1]; if (g === null) return true; if (typeof g == "string") { if (d == g) return true } else if (g.test(d)) return true } } } return false },
                buildPreview: function(a) {
                    var b = this._.definition,
                        c = [],
                        d = b.element;
                    d == "bdo" && (d = "span");
                    var c = ["<", d],
                        g = b.attributes;
                    if (g)
                        for (var e in g) c.push(" ", e, '="', g[e], '"');
                    (g =
                        CKEDITOR.style.getStyleText(b)) && c.push(' style="', g, '"');
                    c.push(">", a || b.name, "</", d, ">");
                    return c.join("")
                },
                getDefinition: function() { return this._.definition }
            };
            CKEDITOR.style.getStyleText = function(a) { var b = a._ST; if (b) return b; var b = a.styles,
                    c = a.attributes && a.attributes.style || "",
                    d = "";
                c.length && (c = c.replace(y, ";")); for (var g in b) { var e = b[g],
                        f = (g + ":" + e).replace(y, ";");
                    e == "inherit" ? d = d + f : c = c + f } c.length && (c = CKEDITOR.tools.normalizeCssText(c, true)); return a._ST = c + d };
            CKEDITOR.style.customHandlers = {};
            CKEDITOR.style.addCustomHandler = function(a) { var b = function(a) { this._ = { definition: a };
                    this.setup && this.setup(a) };
                b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT }, a, true); return this.customHandlers[a.type] = b };
            var D = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
                C = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
        }(), CKEDITOR.styleCommand = function(a, e) {
            this.requiredContent =
                this.allowedContent = this.style = a;
            CKEDITOR.tools.extend(this, e, true)
        }, CKEDITOR.styleCommand.prototype.exec = function(a) { a.focus();
            this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style) }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function(a, e, b) {
            CKEDITOR.stylesSet.addExternal(a, e, "");
            CKEDITOR.stylesSet.load(a,
                b)
        }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            attachStyleStateChange: function(a, e) { var b = this._.styleStateChangeCallbacks; if (!b) { b = this._.styleStateChangeCallbacks = [];
                    this.on("selectionChange", function(a) { for (var d = 0; d < b.length; d++) { var e = b[d],
                                j = e.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                            e.fn.call(this, j) } }) } b.push({ style: a, fn: e }) },
            applyStyle: function(a) { a.apply(this) },
            removeStyle: function(a) { a.remove(this) },
            getStylesSet: function(a) {
                if (this._.stylesDefinitions) a(this._.stylesDefinitions);
                else { var e = this,
                        b = e.config.stylesCombo_stylesSet || e.config.stylesSet; if (b === false) a(null);
                    else if (b instanceof Array) { e._.stylesDefinitions = b;
                        a(b) } else { b || (b = "default"); var b = b.split(":"),
                            c = b[0];
                        CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                        CKEDITOR.stylesSet.load(c, function(b) { e._.stylesDefinitions = b[c];
                            a(e._.stylesDefinitions) }) } }
            }
        }), CKEDITOR.dom.comment = function(a, e) {
            typeof a == "string" && (a = (e ? e.$ : document).createComment(a));
            CKEDITOR.dom.domObject.call(this,
                a)
        }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function() { return "<\!--" + this.$.nodeValue + "--\>" } }), "use strict",
        function() {
            var a = {},
                e = {},
                b;
            for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
            for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (e[b] = 1);
            CKEDITOR.dom.elementPath = function(b, d) {
                var i = null,
                    j = null,
                    f = [],
                    h = b,
                    k, d = d || b.getDocument().getBody();
                do
                    if (h.type == CKEDITOR.NODE_ELEMENT) { f.push(h); if (!this.lastElement) { this.lastElement = h; if (h.is(CKEDITOR.dtd.$object) || h.getAttribute("contenteditable") == "false") continue } if (h.equals(d)) break; if (!j) { k = h.getName();
                            h.getAttribute("contenteditable") == "true" ? j = h : !i && e[k] && (i = h); if (a[k]) { var g; if (g = !i) { if (k = k == "div") { a: { k = h.getChildren();g = 0; for (var m = k.count(); g < m; g++) { var p = k.getItem(g); if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) { k = true; break a } } k = false } k = !k } g = k } g ? i = h : j = h } } }
                while (h =
                    h.getParent());
                j || (j = d);
                this.block = i;
                this.blockLimit = j;
                this.root = d;
                this.elements = f
            }
        }(), CKEDITOR.dom.elementPath.prototype = {
            compare: function(a) { var e = this.elements,
                    a = a && a.elements; if (!a || e.length != a.length) return false; for (var b = 0; b < e.length; b++)
                    if (!e[b].equals(a[b])) return false; return true },
            contains: function(a, e, b) {
                var c;
                typeof a == "string" && (c = function(b) { return b.getName() == a });
                a instanceof CKEDITOR.dom.element ? c = function(b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? c = function(b) {
                    return CKEDITOR.tools.indexOf(a,
                        b.getName()) > -1
                } : typeof a == "function" ? c = a : typeof a == "object" && (c = function(b) { return b.getName() in a });
                var d = this.elements,
                    i = d.length;
                e && i--;
                if (b) { d = Array.prototype.slice.call(d, 0);
                    d.reverse() }
                for (e = 0; e < i; e++)
                    if (c(d[e])) return d[e];
                return null
            },
            isContextFor: function(a) { var e; if (a in CKEDITOR.dtd.$block) { e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit; return !!e.getDtd()[a] } return true },
            direction: function() { return (this.block || this.blockLimit || this.root).getDirection(1) }
        },
        CKEDITOR.dom.text = function(a, e) { typeof a == "string" && (a = (e ? e.$ : document).createTextNode(a));
            this.$ = a }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
            type: CKEDITOR.NODE_TEXT,
            getLength: function() { return this.$.nodeValue.length },
            getText: function() { return this.$.nodeValue },
            setText: function(a) { this.$.nodeValue = a },
            split: function(a) {
                var e = this.$.parentNode,
                    b = e.childNodes.length,
                    c = this.getLength(),
                    d = this.getDocument(),
                    i = new CKEDITOR.dom.text(this.$.splitText(a),
                        d);
                if (e.childNodes.length == b)
                    if (a >= c) { i = d.createText("");
                        i.insertAfter(this) } else { a = d.createText("");
                        a.insertAfter(i);
                        a.remove() }
                return i
            },
            substring: function(a, e) { return typeof e != "number" ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, e) }
        }),
        function() {
            function a(a, c, d) {
                var e = a.serializable,
                    j = c[d ? "endContainer" : "startContainer"],
                    f = d ? "endOffset" : "startOffset",
                    h = e ? c.document.getById(a.startNode) : a.startNode,
                    a = e ? c.document.getById(a.endNode) : a.endNode;
                if (j.equals(h.getPrevious())) {
                    c.startOffset =
                        c.startOffset - j.getLength() - a.getPrevious().getLength();
                    j = a.getNext()
                } else if (j.equals(a.getPrevious())) { c.startOffset = c.startOffset - j.getLength();
                    j = a.getNext() } j.equals(h.getParent()) && c[f]++;
                j.equals(a.getParent()) && c[f]++;
                c[d ? "endContainer" : "startContainer"] = j;
                return c
            }
            CKEDITOR.dom.rangeList = function(a) { if (a instanceof CKEDITOR.dom.rangeList) return a;
                a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, e) };
            var e = {
                createIterator: function() {
                    var a = this,
                        c = CKEDITOR.dom.walker.bookmark(),
                        d = [],
                        e;
                    return {
                        getNextRange: function(j) {
                            e = e === void 0 ? 0 : e + 1;
                            var f = a[e];
                            if (f && a.length > 1) {
                                if (!e)
                                    for (var h = a.length - 1; h >= 0; h--) d.unshift(a[h].createBookmark(true));
                                if (j)
                                    for (var k = 0; a[e + k + 1];) { for (var g = f.document, j = 0, h = g.getById(d[k].endNode), g = g.getById(d[k + 1].startNode);;) { h = h.getNextSourceNode(false); if (g.equals(h)) j = 1;
                                            else if (c(h) || h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) continue; break } if (!j) break;
                                        k++ }
                                for (f.moveToBookmark(d.shift()); k--;) {
                                    h = a[++e];
                                    h.moveToBookmark(d.shift());
                                    f.setEnd(h.endContainer,
                                        h.endOffset)
                                }
                            }
                            return f
                        }
                    }
                },
                createBookmarks: function(b) { for (var c = [], d, e = 0; e < this.length; e++) { c.push(d = this[e].createBookmark(b, true)); for (var j = e + 1; j < this.length; j++) { this[j] = a(d, this[j]);
                            this[j] = a(d, this[j], true) } } return c },
                createBookmarks2: function(a) { for (var c = [], d = 0; d < this.length; d++) c.push(this[d].createBookmark2(a)); return c },
                moveToBookmarks: function(a) { for (var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c]) }
            }
        }(),
        function() {
            function a() {
                return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] ||
                    "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
            }

            function e(b) { var c = CKEDITOR.skin["ua_" + b],
                    d = CKEDITOR.env; if (c)
                    for (var c = c.split(",").sort(function(a, b) { return a > b ? -1 : 1 }), e = 0, f; e < c.length; e++) { f = c[e]; if (d.ie && (f.replace(/^ie/, "") == d.version || d.quirks && f == "iequirks")) f = "ie"; if (d[f]) { b = b + ("_" + c[e]); break } }
                return CKEDITOR.getUrl(a() + b + ".css") }

            function b(a, b) { if (!i[a]) { CKEDITOR.document.appendStyleSheet(e(a));
                    i[a] = 1 } b && b() }

            function c(a) {
                var b = a.getById(j);
                if (!b) {
                    b = a.getHead().append("style");
                    b.setAttribute("id",
                        j);
                    b.setAttribute("type", "text/css")
                }
                return b
            }

            function d(a, b, c) {
                var d, e, f;
                if (CKEDITOR.env.webkit) { b = b.split("}").slice(0, -1); for (e = 0; e < b.length; e++) b[e] = b[e].split("{") }
                for (var h = 0; h < a.length; h++)
                    if (CKEDITOR.env.webkit)
                        for (e = 0; e < b.length; e++) { f = b[e][1]; for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                            a[h].$.sheet.addRule(b[e][0], f) } else {
                            f = b;
                            for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                            CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a[h].$.styleSheet.cssText = a[h].$.styleSheet.cssText + f : a[h].$.innerHTML =
                                a[h].$.innerHTML + f
                        }
            }
            var i = {};
            CKEDITOR.skin = {
                path: a,
                loadPart: function(c, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() { b(c, d) }) : b(c, d) },
                getPath: function(a) { return CKEDITOR.getUrl(e(a)) },
                icons: {},
                addIcon: function(a, b, c, d) { a = a.toLowerCase();
                    this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || "16px" }) },
                getIconStyle: function(a, b, c, d, e) {
                    var f;
                    if (a) { a = a.toLowerCase();
                        b && (f = this.icons[a + "-rtl"]);
                        f || (f = this.icons[a]) } a = c ||
                        f && f.path || "";
                    d = d || f && f.offset;
                    e = e || f && f.bgsize || "16px";
                    return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;background-size:" + e + ";"
                }
            };
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                getUiColor: function() { return this.uiColor },
                setUiColor: function(a) {
                    var b = c(CKEDITOR.document);
                    return (this.setUiColor = function(a) { this.uiColor = a; var c = CKEDITOR.skin.chameleon,
                            e = "",
                            k = ""; if (typeof c == "function") { e = c(this, "editor");
                            k = c(this, "panel") } a = [
                            [h, a]
                        ];
                        d([b], e, a);
                        d(f, k, a) }).call(this,
                        a)
                }
            });
            var j = "cke_ui_color",
                f = [],
                h = /\$color/g;
            CKEDITOR.on("instanceLoaded", function(a) { if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) { var b = a.editor,
                        a = function(a) { a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(); if (!a.getById("cke_ui_color")) { a = c(a);
                                f.push(a); var e = b.getUiColor();
                                e && d([a], CKEDITOR.skin.chameleon(b, "panel"), [
                                    [h, e]
                                ]) } };
                    b.on("panelShow", a);
                    b.on("menuShow", a);
                    b.config.uiColor && b.setUiColor(b.config.uiColor) } })
        }(),
        function() {
            if (CKEDITOR.env.webkit) CKEDITOR.env.hc =
                false;
            else { var a = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>', CKEDITOR.document);
                a.appendTo(CKEDITOR.document.getHead()); try { var e = a.getComputedStyle("border-top-color"),
                        b = a.getComputedStyle("border-right-color");
                    CKEDITOR.env.hc = !!(e && e == b) } catch (c) { CKEDITOR.env.hc = false } a.remove() }
            if (CKEDITOR.env.hc) CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
            CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
            CKEDITOR.status = "loaded";
            CKEDITOR.fireOnce("loaded");
            if (a = CKEDITOR._.pending) { delete CKEDITOR._.pending; for (e = 0; e < a.length; e++) { CKEDITOR.editor.prototype.constructor.apply(a[e][0], a[e][1]);
                    CKEDITOR.add(a[e][0]) } }
        }(), CKEDITOR.skin.name = "moono", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8", CKEDITOR.skin.chameleon = function() {
            var a = function() {
                    return function(a, b) {
                        for (var e = a.match(/[^#]./g), j = 0; j < 3; j++) {
                            var f = e,
                                h = j,
                                k;
                            k = parseInt(e[j], 16);
                            k = ("0" + (b < 0 ?
                                0 | k * (1 + b) : 0 | k + (255 - k) * b).toString(16)).slice(-2);
                            f[h] = k
                        }
                        return "#" + e.join("")
                    }
                }(),
                e = function() { var a = new CKEDITOR.template("background:#{to};background-image:linear-gradient(to bottom,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');"); return function(b, e) { return a.output({ from: b, to: e }) } }(),
                b = {
                    editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
                    panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
                };
            return function(c, d) {
                var i = c.uiColor,
                    i = { id: "." + c.id, defaultBorder: a(i, -0.1), defaultGradient: e(a(i, 0.9), i), lightGradient: e(a(i, 1), a(i, 0.7)), mediumGradient: e(a(i, 0.8), a(i, 0.5)), ckeButtonOn: e(a(i, 0.6), a(i, 0.7)), ckeResizer: a(i, -0.4), ckeToolbarSeparator: a(i, 0.5), ckeColorauto: a(i, 0.8), dialogBody: a(i, 0.7), dialogTabSelected: e("#FFFFFF", "#FFFFFF"), dialogTabSelectedBorder: "#FFF", elementsPathColor: a(i, -0.6), elementsPathBg: i, menubuttonIcon: a(i, 0.5), menubuttonIconHover: a(i, 0.3) };
                return b[d].output(i).replace(/\[/g,
                    "{").replace(/\]/g, "}")
            }
        }(), CKEDITOR.plugins.add("dialogui", {
            onLoad: function() {
                var a = function(a) { this._ || (this._ = {});
                        this._["default"] = this._.initValue = a["default"] || "";
                        this._.required = a.required || false; for (var b = [this._], c = 1; c < arguments.length; c++) b.push(arguments[c]);
                        b.push(true);
                        CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ },
                    e = { build: function(a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } },
                    b = { build: function(a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } },
                    c = {
                        isChanged: function() {
                            return this.getValue() !=
                                this.getInitValue()
                        },
                        reset: function(a) { this.setValue(this.getInitValue(), a) },
                        setInitValue: function() { this._.initValue = this.getValue() },
                        resetInitValue: function() { this._.initValue = this._["default"] },
                        getInitValue: function() { return this._.initValue }
                    },
                    d = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                        onChange: function(a, b) {
                            if (!this._.domOnChangeRegistered) {
                                a.on("load", function() {
                                    this.getInputElement().on("change", function() {
                                        a.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() })
                                    }, this)
                                }, this);
                                this._.domOnChangeRegistered = true
                            }
                            this.on("change", b)
                        }
                    }, true),
                    i = /^on([A-Z]\w+)/,
                    j = function(a) { for (var b in a)(i.test(b) || b == "title" || b == "type") && delete a[b]; return a },
                    f = function(a) { a = a.data.getKeystroke();
                        a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") };
                CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function(b, c, d, e) {
                        if (!(arguments.length < 4)) {
                            var f = a.call(this, c);
                            f.labelId =
                                CKEDITOR.tools.getNextId() + "_label";
                            this._.children = [];
                            var i = { role: c.role || "presentation" };
                            if (c.includeLabel) i["aria-labelledby"] = f.labelId;
                            CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "div", null, i, function() {
                                var a = [],
                                    d = c.required ? " cke_required" : "";
                                if (c.labelLayout != "horizontal") a.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + f.labelId + '"', f.inputId ? ' for="' + f.inputId + '"' : "", (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", c.label, "</label>", '<div class="cke_dialog_ui_labeled_content"',
                                    c.controlStyle ? ' style="' + c.controlStyle + '"' : "", ' role="presentation">', e.call(this, b, c), "</div>");
                                else {
                                    d = { type: "hbox", widths: c.widths, padding: 0, children: [{ type: "html", html: '<label class="cke_dialog_ui_labeled_label' + d + '" id="' + f.labelId + '" for="' + f.inputId + '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(c.label) + "</label>" }, { type: "html", html: '<span class="cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style="' + c.controlStyle + '"' : "") + ">" + e.call(this, b, c) + "</span>" }] };
                                    CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, a)
                                }
                                return a.join("")
                            })
                        }
                    },
                    textInput: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                                i = { "class": "cke_dialog_ui_input_" + c.type, id: e, type: c.type };
                            if (c.validate) this.validate = c.validate;
                            if (c.maxLength) i.maxlength = c.maxLength;
                            if (c.size) i.size = c.size;
                            if (c.inputStyle) i.style = c.inputStyle;
                            var j = this,
                                o = false;
                            b.on("load", function() {
                                j.getInputElement().on("keydown", function(a) {
                                    a.data.getKeystroke() ==
                                        13 && (o = true)
                                });
                                j.getInputElement().on("keyup", function(a) { if (a.data.getKeystroke() == 13 && o) { b.getButton("ok") && setTimeout(function() { b.getButton("ok").click() }, 0);
                                        o = false } j.bidi && f.call(j, a) }, null, null, 1E3)
                            });
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                                var a = ['<div class="cke_dialog_ui_input_', c.type, '" role="presentation"'];
                                c.width && a.push('style="width:' + c.width + '" ');
                                a.push("><input ");
                                i["aria-labelledby"] = this._.labelId;
                                this._.required && (i["aria-required"] = this._.required);
                                for (var b in i) a.push(b +
                                    '="' + i[b] + '" ');
                                a.push(" /></div>");
                                return a.join("")
                            })
                        }
                    },
                    textarea: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            var e = this,
                                i = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                                j = {};
                            if (c.validate) this.validate = c.validate;
                            j.rows = c.rows || 5;
                            j.cols = c.cols || 20;
                            j["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || "");
                            if (typeof c.inputStyle != "undefined") j.style = c.inputStyle;
                            if (c.dir) j.dir = c.dir;
                            if (e.bidi) b.on("load", function() { e.getInputElement().on("keyup", f) }, e);
                            CKEDITOR.ui.dialog.labeledElement.call(this,
                                b, c, d,
                                function() { j["aria-labelledby"] = this._.labelId;
                                    this._.required && (j["aria-required"] = this._.required); var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', i, '" '],
                                        b; for (b in j) a.push(b + '="' + CKEDITOR.tools.htmlEncode(j[b]) + '" ');
                                    a.push(">", CKEDITOR.tools.htmlEncode(e._["default"]), "</textarea></div>"); return a.join("") })
                        }
                    },
                    checkbox: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            var e = a.call(this, c, { "default": !!c["default"] });
                            if (c.validate) this.validate = c.validate;
                            CKEDITOR.ui.dialog.uiElement.call(this,
                                b, c, d, "span", null, null,
                                function() {
                                    var a = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, true),
                                        d = [],
                                        g = CKEDITOR.tools.getNextId() + "_label",
                                        f = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": g };
                                    j(a);
                                    if (c["default"]) f.checked = "checked";
                                    if (typeof a.inputStyle != "undefined") a.style = a.inputStyle;
                                    e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, d, "input", null, f);
                                    d.push(' <label id="', g, '" for="', f.id, '"' + (c.labelStyle ? ' style="' + c.labelStyle +
                                        '"' : "") + ">", CKEDITOR.tools.htmlEncode(c.label), "</label>");
                                    return d.join("")
                                })
                        }
                    },
                    radio: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            if (!this._["default"]) this._["default"] = this._.initValue = c.items[0][1];
                            if (c.validate) this.validate = c.validate;
                            var e = [],
                                f = this;
                            c.role = "radiogroup";
                            c.includeLabel = true;
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                                for (var a = [], d = [], g = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", i = 0; i < c.items.length; i++) {
                                    var s = c.items[i],
                                        t = s[2] !== void 0 ? s[2] :
                                        s[0],
                                        w = s[1] !== void 0 ? s[1] : s[0],
                                        v = CKEDITOR.tools.getNextId() + "_radio_input",
                                        x = v + "_label",
                                        v = CKEDITOR.tools.extend({}, c, { id: v, title: null, type: null }, true),
                                        t = CKEDITOR.tools.extend({}, v, { title: t }, true),
                                        u = { type: "radio", "class": "cke_dialog_ui_radio_input", name: g, value: w, "aria-labelledby": x },
                                        r = [];
                                    if (f._["default"] == w) u.checked = "checked";
                                    j(v);
                                    j(t);
                                    if (typeof v.inputStyle != "undefined") v.style = v.inputStyle;
                                    v.keyboardFocusable = true;
                                    e.push(new CKEDITOR.ui.dialog.uiElement(b, v, r, "input", null, u));
                                    r.push(" ");
                                    new CKEDITOR.ui.dialog.uiElement(b,
                                        t, r, "label", null, { id: x, "for": u.id }, s[0]);
                                    a.push(r.join(""))
                                }
                                new CKEDITOR.ui.dialog.hbox(b, e, a, d);
                                return d.join("")
                            });
                            this._.children = e
                        }
                    },
                    button: function(b, c, d) {
                        if (arguments.length) {
                            typeof c == "function" && (c = c(b.getParentEditor()));
                            a.call(this, c, { disabled: c.disabled || false });
                            CKEDITOR.event.implementOn(this);
                            var e = this;
                            b.on("load", function() {
                                var a = this.getElement();
                                (function() {
                                    a.on("click", function(a) { e.click();
                                        a.data.preventDefault() });
                                    a.on("keydown", function(a) {
                                        if (a.data.getKeystroke() in { 32: 1 }) {
                                            e.click();
                                            a.data.preventDefault()
                                        }
                                    })
                                })();
                                a.unselectable()
                            }, this);
                            var f = CKEDITOR.tools.extend({}, c);
                            delete f.style;
                            var i = CKEDITOR.tools.getNextId() + "_label";
                            CKEDITOR.ui.dialog.uiElement.call(this, b, f, d, "a", null, { style: c.style, href: "javascript:void(0)", title: c.label, hidefocus: "true", "class": c["class"], role: "button", "aria-labelledby": i }, '<span id="' + i + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(c.label) + "</span>")
                        }
                    },
                    select: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            var e = a.call(this, c);
                            if (c.validate) this.validate =
                                c.validate;
                            e.inputId = CKEDITOR.tools.getNextId() + "_select";
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                                var a = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, true),
                                    d = [],
                                    g = [],
                                    f = { id: e.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId };
                                d.push('<div class="cke_dialog_ui_input_', c.type, '" role="presentation"');
                                c.width && d.push('style="width:' + c.width + '" ');
                                d.push(">");
                                if (c.size !== void 0) f.size = c.size;
                                if (c.multiple !== void 0) f.multiple =
                                    c.multiple;
                                j(a);
                                for (var i = 0, s; i < c.items.length && (s = c.items[i]); i++) g.push('<option value="', CKEDITOR.tools.htmlEncode(s[1] !== void 0 ? s[1] : s[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(s[0]));
                                if (typeof a.inputStyle != "undefined") a.style = a.inputStyle;
                                e.select = new CKEDITOR.ui.dialog.uiElement(b, a, d, "select", null, f, g.join(""));
                                d.push("</div>");
                                return d.join("")
                            })
                        }
                    },
                    file: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            c["default"] === void 0 && (c["default"] = "");
                            var e = CKEDITOR.tools.extend(a.call(this,
                                c), { definition: c, buttons: [] });
                            if (c.validate) this.validate = c.validate;
                            b.on("load", function() { CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file") });
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                                e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                                var a = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', e.frameId, '" title="', c.label, '" src="javascript:void('];
                                a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" +
                                    CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                                a.push(')"></iframe>');
                                return a.join("")
                            })
                        }
                    },
                    fileButton: function(b, c, d) {
                        var e = this;
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            if (c.validate) this.validate = c.validate;
                            var f = CKEDITOR.tools.extend({}, c),
                                i = f.onClick;
                            f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button";
                            f.onClick = function(a) { var d = c["for"]; if (!i || i.call(this, a) !== false) { b.getContentElement(d[0], d[1]).submit();
                                    this.disable() } };
                            b.on("load", function() {
                                b.getContentElement(c["for"][0],
                                    c["for"][1])._.buttons.push(e)
                            });
                            CKEDITOR.ui.dialog.button.call(this, b, f, d)
                        }
                    },
                    html: function() {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/,
                            b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                            c = /\/$/;
                        return function(d, e, f) {
                            if (!(arguments.length < 3)) {
                                var i = [],
                                    j = e.html;
                                j.charAt(0) != "<" && (j = "<span>" + j + "</span>");
                                var l = e.focus;
                                if (l) { var s = this.focus;
                                    this.focus = function() {
                                        (typeof l == "function" ? l : s).call(this);
                                        this.fire("focus") }; if (e.isFocusable) this.isFocusable = this.isFocusable;
                                    this.keyboardFocusable = true } CKEDITOR.ui.dialog.uiElement.call(this,
                                    d, e, i, "span", null, null, "");
                                i = i.join("").match(a);
                                j = j.match(b) || ["", "", ""];
                                if (c.test(j[1])) { j[1] = j[1].slice(0, -1);
                                    j[2] = "/" + j[2] } f.push([j[1], " ", i[1] || "", j[2]].join(""))
                            }
                        }
                    }(),
                    fieldset: function(a, b, c, d, e) { var f = e.label;
                        this._ = { children: b };
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e, d, "fieldset", null, null, function() { var a = [];
                            f && a.push("<legend" + (e.labelStyle ? ' style="' + e.labelStyle + '"' : "") + ">" + f + "</legend>"); for (var b = 0; b < c.length; b++) a.push(c[b]); return a.join("") }) }
                }, true);
                CKEDITOR.ui.dialog.html.prototype =
                    new CKEDITOR.ui.dialog.uiElement;
                CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, { setLabel: function(a) { var b = CKEDITOR.document.getById(this._.labelId);
                        b.getChildCount() < 1 ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a; return this }, getLabel: function() { var a = CKEDITOR.document.getById(this._.labelId); return !a || a.getChildCount() < 1 ? "" : a.getChild(0).getText() }, eventProcessors: d }, true);
                CKEDITOR.ui.dialog.button.prototype =
                    CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        click: function() { return !this._.disabled ? this.fire("click", { dialog: this._.dialog }) : false },
                        enable: function() { this._.disabled = false; var a = this.getElement();
                            a && a.removeClass("cke_disabled") },
                        disable: function() { this._.disabled = true;
                            this.getElement().addClass("cke_disabled") },
                        isVisible: function() { return this.getElement().getFirst().isVisible() },
                        isEnabled: function() { return !this._.disabled },
                        eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function(a, b) { this.on("click", function() { b.apply(this, arguments) }) } }, true),
                        accessKeyUp: function() { this.click() },
                        accessKeyDown: function() { this.focus() },
                        keyboardFocusable: true
                    }, true);
                CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function() { return CKEDITOR.document.getById(this._.inputId) },
                    focus: function() { var a = this.selectParentTab();
                        setTimeout(function() { var b = a.getInputElement();
                            b && b.$.focus() }, 0) },
                    select: function() {
                        var a =
                            this.selectParentTab();
                        setTimeout(function() { var b = a.getInputElement(); if (b) { b.$.focus();
                                b.$.select() } }, 0)
                    },
                    accessKeyUp: function() { this.select() },
                    setValue: function(a) { if (this.bidi) { var b = a && a.charAt(0);
                            (b = b == "‪" ? "ltr" : b == "‫" ? "rtl" : null) && (a = a.slice(1));
                            this.setDirectionMarker(b) } a || (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                    getValue: function() {
                        var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
                        if (this.bidi && a) {
                            var b = this.getDirectionMarker();
                            b && (a = (b == "ltr" ? "‪" : "‫") + a)
                        }
                        return a
                    },
                    setDirectionMarker: function(a) { var b = this.getInputElement();
                        a ? b.setAttributes({ dir: a, "data-cke-dir-marker": a }) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"]) },
                    getDirectionMarker: function() { return this.getInputElement().data("cke-dir-marker") },
                    keyboardFocusable: true
                }, c, true);
                CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
                CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, { getInputElement: function() { return this._.select.getElement() }, add: function(a, b, c) { var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                                e = this.getInputElement().$;
                            d.$.text = a;
                            d.$.value = b === void 0 || b === null ? a : b;
                            c === void 0 || c === null ? CKEDITOR.env.ie ? e.add(d.$) : e.add(d.$, null) : e.add(d.$, c); return this }, remove: function(a) { this.getInputElement().$.remove(a); return this }, clear: function() { for (var a = this.getInputElement().$; a.length > 0;) a.remove(0); return this }, keyboardFocusable: true },
                    c, true);
                CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getInputElement: function() { return this._.checkbox.getElement() },
                    setValue: function(a, b) { this.getInputElement().$.checked = a;!b && this.fire("change", { value: a }) },
                    getValue: function() { return this.getInputElement().$.checked },
                    accessKeyUp: function() { this.setValue(!this.getValue()) },
                    eventProcessors: {
                        onChange: function(a, b) {
                            if (!CKEDITOR.env.ie || CKEDITOR.env.version > 8) return d.onChange.apply(this, arguments);
                            a.on("load",
                                function() { var a = this._.checkbox.getElement();
                                    a.on("propertychange", function(b) { b = b.data.$;
                                        b.propertyName == "checked" && this.fire("change", { value: a.$.checked }) }, this) }, this);
                            this.on("change", b);
                            return null
                        }
                    },
                    keyboardFocusable: true
                }, c, true);
                CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setValue: function(a, b) { for (var c = this._.children, d, e = 0; e < c.length && (d = c[e]); e++) d.getElement().$.checked = d.getValue() == a;!b && this.fire("change", { value: a }) },
                    getValue: function() {
                        for (var a =
                                this._.children, b = 0; b < a.length; b++)
                            if (a[b].getElement().$.checked) return a[b].getValue();
                        return null
                    },
                    accessKeyUp: function() { var a = this._.children,
                            b; for (b = 0; b < a.length; b++)
                            if (a[b].getElement().$.checked) { a[b].getElement().focus(); return }
                        a[0].getElement().focus() },
                    eventProcessors: {
                        onChange: function(a, b) {
                            if (CKEDITOR.env.ie) {
                                a.on("load", function() {
                                    for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
                                        a = a.data.$;
                                        a.propertyName == "checked" && this.$.checked &&
                                            b.fire("change", { value: this.getAttribute("value") })
                                    })
                                }, this);
                                this.on("change", b)
                            } else return d.onChange.apply(this, arguments);
                            return null
                        }
                    }
                }, c, true);
                CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, c, {
                    getInputElement: function() { var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement() },
                    submit: function() { this.getInputElement().getParent().$.submit(); return this },
                    getAction: function() { return this.getInputElement().getParent().$.action },
                    registerEvents: function(a) { var b = /^on([A-Z]\w+)/,
                            c, d = function(a, b, c, d) { a.on("formLoaded", function() { a.getInputElement().on(c, d, a) }) },
                            e; for (e in a)
                            if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]); return this },
                    reset: function() {
                        function a() {
                            c.$.open();
                            var h = "";
                            d.size && (h = d.size - (CKEDITOR.env.ie ? 7 : 0));
                            var t = b.frameId + "_input";
                            c.$.write(['<html dir="' +
                                j + '" lang="' + l + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + j + '" lang="' + l + '" action="', CKEDITOR.tools.htmlEncode(d.action), '"><label id="', b.labelId, '" for="', t, '" style="display:none">', CKEDITOR.tools.htmlEncode(d.label), '</label><input style="width:100%" id="', t, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(h >
                                    0 ? h : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + i + ")}", "<\/script>"
                            ].join(""));
                            c.$.close();
                            for (h = 0; h < e.length; h++) e[h].enable()
                        }
                        var b = this._,
                            c = CKEDITOR.document.getById(b.frameId).getFrameDocument(),
                            d = b.definition,
                            e = b.buttons,
                            f = this.formLoadedNumber,
                            i = this.formUnloadNumber,
                            j = b.dialog._.editor.lang.dir,
                            l = b.dialog._.editor.langCode;
                        if (!f) { f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() { this.fire("formLoaded") }, this);
                            i = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() { this.getInputElement().clearCustomData() }, this);
                            this.getDialog()._.editor.on("destroy", function() { CKEDITOR.tools.removeFunction(f);
                                CKEDITOR.tools.removeFunction(i) }) } CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                    },
                    getValue: function() { return this.getInputElement().$.value || "" },
                    setInitValue: function() { this._.initValue = "" },
                    eventProcessors: {
                        onChange: function(a,
                            b) { if (!this._.domOnChangeRegistered) { this.on("formLoaded", function() { this.getInputElement().on("change", function() { this.fire("change", { value: this.getValue() }) }, this) }, this);
                                this._.domOnChangeRegistered = true } this.on("change", b) }
                    },
                    keyboardFocusable: true
                }, true);
                CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
                CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
                CKEDITOR.dialog.addUIElement("text", e);
                CKEDITOR.dialog.addUIElement("password",
                    e);
                CKEDITOR.dialog.addUIElement("textarea", b);
                CKEDITOR.dialog.addUIElement("checkbox", b);
                CKEDITOR.dialog.addUIElement("radio", b);
                CKEDITOR.dialog.addUIElement("button", b);
                CKEDITOR.dialog.addUIElement("select", b);
                CKEDITOR.dialog.addUIElement("file", b);
                CKEDITOR.dialog.addUIElement("fileButton", b);
                CKEDITOR.dialog.addUIElement("html", b);
                CKEDITOR.dialog.addUIElement("fieldset", {
                    build: function(a, b, c) {
                        for (var d = b.children, e, f = [], i = [], j = 0; j < d.length && (e = d[j]); j++) {
                            var l = [];
                            f.push(l);
                            i.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a,
                                e, l))
                        }
                        return new CKEDITOR.ui.dialog[b.type](a, i, f, c, b)
                    }
                })
            }
        }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2,
        function() {
            function a() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
                    if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null }

            function e() {
                for (var a =
                        this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
                    if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
                return null
            }

            function b(a, b) {
                for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; d < e; d++) {
                    var f = new CKEDITOR.dom.element(c[d]);
                    if (f.getAttribute("type").toLowerCase() == "text")
                        if (b) { f.setAttribute("value", f.getCustomData("fake_value") || "");
                            f.removeCustomData("fake_value") } else {
                            f.setCustomData("fake_value", f.getAttribute("value"));
                            f.setAttribute("value", "")
                        }
                }
            }

            function c(a, b) { var c = this.getInputElement();
                c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", true));
                a || (this.select ? this.select() : this.focus());
                b && alert(b);
                this.fire("validated", { valid: a, msg: b }) }

            function d() { var a = this.getInputElement();
                a && a.removeAttribute("aria-invalid") }

            function i(a) {
                var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", n).output({
                        id: CKEDITOR.tools.getNextNumber(),
                        editorId: a.id,
                        langDir: a.lang.dir,
                        langCode: a.langCode,
                        editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                        closeTitle: a.lang.common.close,
                        hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
                    })),
                    c = b.getChild([0, 0, 0, 0, 0]),
                    d = c.getChild(0),
                    e = c.getChild(1);
                a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks && !CKEDITOR.env.edge) {
                    a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
                    CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' +
                        a + '" tabIndex="-1"></iframe>').appendTo(c.getParent())
                }
                d.unselectable();
                e.unselectable();
                return { element: b, parts: { dialog: b.getChild(0), title: d, close: e, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]), footer: c.getChild([3, 0, 1, 0]) } }
            }

            function j(a, b, c) {
                this.element = b;
                this.focusIndex = c;
                this.tabIndex = 0;
                this.isFocusable = function() { return !b.getAttribute("disabled") && b.isVisible() };
                this.focus = function() { a._.currentFocusIndex = this.focusIndex;
                    this.element.focus() };
                b.on("keydown", function(a) {
                    a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click")
                });
                b.on("focus", function() { this.fire("mouseover") });
                b.on("blur", function() { this.fire("mouseout") })
            }

            function f(a) {
                function b() { a.layout() } var c = CKEDITOR.document.getWindow();
                c.on("resize", b);
                a.on("hide", function() { c.removeListener("resize", b) }) }

            function h(a, b) { this._ = { dialog: a };
                CKEDITOR.tools.extend(this, b) }

            function k(a) {
                function b(c) {
                    var i = a.getSize(),
                        j = CKEDITOR.document.getWindow().getViewPaneSize(),
                        k = c.data.$.screenX,
                        m = c.data.$.screenY,
                        l = k - d.x,
                        s = m - d.y;
                    d = { x: k, y: m };
                    e.x = e.x + l;
                    e.y = e.y + s;
                    a.move(e.x + h[3] < g ? -h[3] : e.x - h[1] > j.width - i.width - g ? j.width - i.width + (f.lang.dir == "rtl" ? 0 : h[1]) : e.x, e.y + h[0] < g ? -h[0] : e.y - h[2] > j.height - i.height - g ? j.height - i.height + h[2] : e.y, 1);
                    c.data.preventDefault()
                }

                function c() { CKEDITOR.document.removeListener("mousemove", b);
                    CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = r.getChild(0).getFrameDocument();
                        a.removeListener("mousemove", b);
                        a.removeListener("mouseup", c) } }
                var d = null,
                    e = null,
                    f = a.getParentEditor(),
                    g = f.config.dialog_magnetDistance,
                    h = CKEDITOR.skin.margins || [0, 0, 0, 0];
                typeof g == "undefined" && (g = 20);
                a.parts.title.on("mousedown", function(f) { d = { x: f.data.$.screenX, y: f.data.$.screenY };
                    CKEDITOR.document.on("mousemove", b);
                    CKEDITOR.document.on("mouseup", c);
                    e = a.getPosition(); if (CKEDITOR.env.ie6Compat) { var g = r.getChild(0).getFrameDocument();
                        g.on("mousemove", b);
                        g.on("mouseup", c) } f.data.preventDefault() }, a)
            }

            function g(a) {
                var b, c;

                function d(e) {
                    var l = h.lang.dir == "rtl",
                        s = m.width,
                        t = m.height,
                        o = s + (e.data.$.screenX - b) * (l ? -1 : 1) * (a._.moved ? 1 : 2),
                        q =
                        t + (e.data.$.screenY - c) * (a._.moved ? 1 : 2),
                        n = a._.element.getFirst(),
                        n = l && n.getComputedStyle("right"),
                        w = a.getPosition();
                    w.y + q > k.height && (q = k.height - w.y);
                    if ((l ? n : w.x) + o > k.width) o = k.width - (l ? n : w.x);
                    if (g == CKEDITOR.DIALOG_RESIZE_WIDTH || g == CKEDITOR.DIALOG_RESIZE_BOTH) s = Math.max(f.minWidth || 0, o - i);
                    if (g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH) t = Math.max(f.minHeight || 0, q - j);
                    a.resize(s, t);
                    a._.moved || a.layout();
                    e.data.preventDefault()
                }

                function e() {
                    CKEDITOR.document.removeListener("mouseup",
                        e);
                    CKEDITOR.document.removeListener("mousemove", d);
                    if (l) { l.remove();
                        l = null }
                    if (CKEDITOR.env.ie6Compat) { var a = r.getChild(0).getFrameDocument();
                        a.removeListener("mouseup", e);
                        a.removeListener("mousemove", d) }
                }
                var f = a.definition,
                    g = f.resizable;
                if (g != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var h = a.getParentEditor(),
                        i, j, k, m, l, s = CKEDITOR.tools.addFunction(function(f) {
                            m = a.getSize();
                            var g = a.parts.contents;
                            if (g.$.getElementsByTagName("iframe").length) {
                                l = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                                g.append(l)
                            }
                            j = m.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                            i = m.width - a.parts.contents.getSize("width", 1);
                            b = f.screenX;
                            c = f.screenY;
                            k = CKEDITOR.document.getWindow().getViewPaneSize();
                            CKEDITOR.document.on("mousemove", d);
                            CKEDITOR.document.on("mouseup", e);
                            if (CKEDITOR.env.ie6Compat) { g = r.getChild(0).getFrameDocument();
                                g.on("mousemove", d);
                                g.on("mouseup", e) } f.preventDefault && f.preventDefault()
                        });
                    a.on("load", function() {
                        var b = "";
                        g == CKEDITOR.DIALOG_RESIZE_WIDTH ?
                            b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                        b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + h.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(h.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + s + ', event )">' + (h.lang.dir == "ltr" ? "◢" : "◣") + "</div>");
                        a.parts.footer.append(b, 1)
                    });
                    h.on("destroy", function() { CKEDITOR.tools.removeFunction(s) })
                }
            }

            function m(a) { a.data.preventDefault(1) }

            function p(a) {
                var b = CKEDITOR.document.getWindow(),
                    c = a.config,
                    d = c.dialog_backgroundCoverColor || "white",
                    e = c.dialog_backgroundCoverOpacity,
                    f = c.baseFloatZIndex,
                    c = CKEDITOR.tools.genKey(d, e, f),
                    g = u[c];
                if (g) g.show();
                else {
                    f = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + d : "", '" class="cke_dialog_background_cover">'];
                    if (CKEDITOR.env.ie6Compat) {
                        d = "<html><body style=\\'background-color:" + d + ";\\'></body></html>";
                        f.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                        f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())");
                        f.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                    }
                    f.push("</div>");
                    g = CKEDITOR.dom.element.createFromHtml(f.join(""));
                    g.setOpacity(e !== void 0 ? e : 0.5);
                    g.on("keydown", m);
                    g.on("keypress", m);
                    g.on("keyup", m);
                    g.appendTo(CKEDITOR.document.getBody());
                    u[c] = g
                }
                a.focusManager.add(g);
                r = g;
                var a = function() { var a = b.getViewPaneSize();
                        g.setStyles({ width: a.width + "px", height: a.height + "px" }) },
                    h = function() { var a = b.getScrollPosition(),
                            c = CKEDITOR.dialog._.currentTop;
                        g.setStyles({ left: a.x + "px", top: a.y + "px" }); if (c) { do { a = c.getPosition();
                                c.move(a.x, a.y) } while (c = c._.parentDialog) } };
                x = a;
                b.on("resize", a);
                a();
                (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && g.focus();
                if (CKEDITOR.env.ie6Compat) {
                    var i = function() { h();
                        arguments.callee.prevScrollHandler.apply(this, arguments) };
                    b.$.setTimeout(function() {
                        i.prevScrollHandler =
                            window.onscroll || function() {};
                        window.onscroll = i
                    }, 0);
                    h()
                }
            }

            function q(a) { if (r) { a.focusManager.remove(r);
                    a = CKEDITOR.document.getWindow();
                    r.hide();
                    a.removeListener("resize", x);
                    CKEDITOR.env.ie6Compat && a.$.setTimeout(function() { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0);
                    x = null } }
            var o = CKEDITOR.tools.cssLength,
                n = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' +
                CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
            CKEDITOR.dialog = function(b, f) {
                function h() { var a = r._.focusList;
                    a.sort(function(a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c }

                function j(a) {
                    var b = r._.focusList,
                        a = a || 0;
                    if (!(b.length < 1)) {
                        var c = r._.currentFocusIndex;
                        r._.tabBarMode && a < 0 && (c = 0);
                        try { b[c].getInputElement().$.blur() } catch (d) {}
                        var e = c,
                            f = r._.pageCount > 1;
                        do {
                            e = e + a;
                            if (f && !r._.tabBarMode && (e == b.length || e == -1)) {
                                r._.tabBarMode = true;
                                r._.tabs[r._.currentTabId][0].focus();
                                r._.currentFocusIndex = -1;
                                return
                            }
                            e = (e + b.length) % b.length;
                            if (e == c) break
                        } while (a && !b[e].isFocusable());
                        b[e].focus();
                        b[e].type == "text" && b[e].select()
                    }
                }

                function m(c) {
                    if (r == CKEDITOR.dialog._.currentTop) {
                        var d = c.data.getKeystroke(),
                            f = b.lang.dir == "rtl",
                            g = [37, 38, 39, 40];
                        p = x = 0;
                        if (d == 9 || d == CKEDITOR.SHIFT + 9) { j(d == CKEDITOR.SHIFT + 9 ? -1 : 1);
                            p = 1 } else if (d == CKEDITOR.ALT + 121 && !r._.tabBarMode && r.getPageCount() > 1) { r._.tabBarMode = true;
                            r._.tabs[r._.currentTabId][0].focus();
                            r._.currentFocusIndex = -1;
                            p = 1 } else if (CKEDITOR.tools.indexOf(g,
                                d) != -1 && r._.tabBarMode) { d = CKEDITOR.tools.indexOf([f ? 39 : 37, 38], d) != -1 ? a.call(r) : e.call(r);
                            r.selectPage(d);
                            r._.tabs[d][0].focus();
                            p = 1 } else if ((d == 13 || d == 32) && r._.tabBarMode) { this.selectPage(this._.currentTabId);
                            this._.tabBarMode = false;
                            this._.currentFocusIndex = -1;
                            j(1);
                            p = 1 } else if (d == 13) { d = c.data.getTarget(); if (!d.is("a", "button", "select", "textarea") && (!d.is("input") || d.$.type != "button")) {
                                (d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d);
                                p = 1 } x = 1 } else if (d == 27) {
                            (d = this.getButton("cancel")) ?
                            CKEDITOR.tools.setTimeout(d.click, 0, d): this.fire("cancel", { hide: true }).hide !== false && this.hide();
                            x = 1
                        } else return;
                        s(c)
                    }
                }

                function s(a) { p ? a.data.preventDefault(1) : x && a.data.stopPropagation() }
                var t = CKEDITOR.dialog._.dialogDefinitions[f],
                    o = CKEDITOR.tools.clone(l),
                    q = b.config.dialog_buttonsOrder || "OS",
                    n = b.lang.dir,
                    w = {},
                    p, x;
                (q == "OS" && CKEDITOR.env.mac || q == "rtl" && n == "ltr" || q == "ltr" && n == "rtl") && o.buttons.reverse();
                t = CKEDITOR.tools.extend(t(b), o);
                t = CKEDITOR.tools.clone(t);
                t = new v(this, t);
                o = i(b);
                this._ = {
                    editor: b,
                    element: o.element,
                    name: f,
                    contentSize: { width: 0, height: 0 },
                    size: { width: 0, height: 0 },
                    contents: {},
                    buttons: {},
                    accessKeyMap: {},
                    tabs: {},
                    tabIdList: [],
                    currentTabId: null,
                    currentTabIndex: null,
                    pageCount: 0,
                    lastTab: null,
                    tabBarMode: false,
                    focusList: [],
                    currentFocusIndex: 0,
                    hasFocus: false
                };
                this.parts = o.parts;
                CKEDITOR.tools.setTimeout(function() { b.fire("ariaWidget", this.parts.contents) }, 0, this);
                o = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" };
                o[n == "rtl" ? "right" : "left"] = 0;
                this.parts.dialog.setStyles(o);
                CKEDITOR.event.call(this);
                this.definition = t = CKEDITOR.fire("dialogDefinition", { name: f, definition: t }, b).definition;
                if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) { o = b.config.removeDialogTabs.split(";"); for (n = 0; n < o.length; n++) { q = o[n].split(":"); if (q.length == 2) { var u = q[0];
                            w[u] || (w[u] = []);
                            w[u].push(q[1]) } } b._.removeDialogTabs = w }
                if (b._.removeDialogTabs && (w = b._.removeDialogTabs[f]))
                    for (n = 0; n < w.length; n++) t.removeContents(w[n]);
                if (t.onLoad) this.on("load", t.onLoad);
                if (t.onShow) this.on("show", t.onShow);
                if (t.onHide) this.on("hide", t.onHide);
                if (t.onOk) this.on("ok", function(a) { b.fire("saveSnapshot");
                    setTimeout(function() { b.fire("saveSnapshot") }, 0); if (t.onOk.call(this, a) === false) a.data.hide = false });
                this.state = CKEDITOR.DIALOG_STATE_IDLE;
                if (t.onCancel) this.on("cancel", function(a) { if (t.onCancel.call(this, a) === false) a.data.hide = false });
                var r = this,
                    y = function(a) { var b = r._.contents,
                            c = false,
                            d; for (d in b)
                            for (var e in b[d])
                                if (c = a.call(this, b[d][e])) return };
                this.on("ok", function(a) {
                    y(function(b) {
                        if (b.validate) {
                            var d =
                                b.validate(this),
                                e = typeof d == "string" || d === false;
                            if (e) { a.data.hide = false;
                                a.stop() } c.call(b, !e, typeof d == "string" ? d : void 0);
                            return e
                        }
                    })
                }, this, null, 0);
                this.on("cancel", function(a) { y(function(c) { if (c.isChanged()) { if (!b.config.dialog_noConfirmCancel && !confirm(b.lang.common.confirmCancel)) a.data.hide = false; return true } }) }, this, null, 0);
                this.parts.close.on("click", function(a) { this.fire("cancel", { hide: true }).hide !== false && this.hide();
                    a.data.preventDefault() }, this);
                this.changeFocus = j;
                var z = this._.element;
                b.focusManager.add(z, 1);
                this.on("show", function() { z.on("keydown", m, this); if (CKEDITOR.env.gecko) z.on("keypress", s, this) });
                this.on("hide", function() { z.removeListener("keydown", m);
                    CKEDITOR.env.gecko && z.removeListener("keypress", s);
                    y(function(a) { d.apply(a) }) });
                this.on("iframeAdded", function(a) {
                    (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", m, this, null, 0) });
                this.on("show", function() {
                    h();
                    var a = r._.pageCount > 1;
                    if (b.config.dialog_startupFocusTab && a) {
                        r._.tabBarMode = true;
                        r._.tabs[r._.currentTabId][0].focus();
                        r._.currentFocusIndex = -1
                    } else if (!this._.hasFocus) { this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1; if (t.onFocus)(a = t.onFocus.call(this)) && a.focus();
                        else j(1) }
                }, this, null, 4294967295);
                if (CKEDITOR.env.ie6Compat) this.on("load", function() { var a = this.getElement(),
                        b = a.getFirst();
                    b.remove();
                    b.appendTo(a) }, this);
                k(this);
                g(this);
                (new CKEDITOR.dom.text(t.title, CKEDITOR.document)).appendTo(this.parts.title);
                for (n = 0; n < t.contents.length; n++)(w = t.contents[n]) && this.addPage(w);
                this.parts.tabs.on("click",
                    function(a) { var b = a.data.getTarget(); if (b.hasClass("cke_dialog_tab")) { b = b.$.id;
                            this.selectPage(b.substring(4, b.lastIndexOf("_"))); if (this._.tabBarMode) { this._.tabBarMode = false;
                                this._.currentFocusIndex = -1;
                                j(1) } a.data.preventDefault() } }, this);
                n = [];
                w = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: t.buttons }, n).getChild();
                this.parts.footer.setHtml(n.join(""));
                for (n = 0; n < w.length; n++) this._.buttons[w[n].id] = w[n]
            };
            CKEDITOR.dialog.prototype = {
                destroy: function() { this.hide();
                    this._.element.remove() },
                resize: function() {
                    return function(a, b) {
                        if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) {
                            CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor);
                            this.fire("resize", { width: a, height: b }, this._.editor);
                            this.parts.contents.setStyles({ width: a + "px", height: b + "px" });
                            if (this._.editor.lang.dir == "rtl" && this._.position) this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width -
                                parseInt(this._.element.getFirst().getStyle("right"), 10);
                            this._.contentSize = { width: a, height: b }
                        }
                    }
                }(),
                getSize: function() { var a = this._.element.getFirst(); return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 } },
                move: function(a, b, c) {
                    var d = this._.element.getFirst(),
                        e = this._.editor.lang.dir == "rtl",
                        f = d.getComputedStyle("position") == "fixed";
                    CKEDITOR.env.ie && d.setStyle("zoom", "100%");
                    if (!f || !this._.position || !(this._.position.x == a && this._.position.y == b)) {
                        this._.position = { x: a, y: b };
                        if (!f) {
                            f = CKEDITOR.document.getWindow().getScrollPosition();
                            a = a + f.x;
                            b = b + f.y
                        }
                        if (e) { f = this.getSize();
                            a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a } b = { top: (b > 0 ? b : 0) + "px" };
                        b[e ? "right" : "left"] = (a > 0 ? a : 0) + "px";
                        d.setStyles(b);
                        c && (this._.moved = 1)
                    }
                },
                getPosition: function() { return CKEDITOR.tools.extend({}, this._.position) },
                show: function() {
                    var a = this._.element,
                        b = this.definition;
                    !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block");
                    this.resize(this._.contentSize && this._.contentSize.width ||
                        b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                    this.reset();
                    this.selectPage(this.definition.contents[0].id);
                    if (CKEDITOR.dialog._.currentZIndex === null) CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
                    this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10);
                    if (CKEDITOR.dialog._.currentTop === null) { CKEDITOR.dialog._.currentTop = this;
                        this._.parentDialog = null;
                        p(this._.editor) } else {
                        this._.parentDialog =
                            CKEDITOR.dialog._.currentTop;
                        this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2);
                        CKEDITOR.dialog._.currentTop = this
                    }
                    a.on("keydown", z);
                    a.on("keyup", B);
                    this._.hasFocus = false;
                    for (var c in b.contents)
                        if (b.contents[c]) {
                            var a = b.contents[c],
                                d = this._.tabs[a.id],
                                e = a.requiredContent,
                                g = 0;
                            if (d) {
                                for (var h in this._.contents[a.id]) {
                                    var i = this._.contents[a.id][h];
                                    if (!(i.type == "hbox" || i.type == "vbox" || !i.getInputElement()))
                                        if (i.requiredContent && !this._.editor.activeFilter.check(i.requiredContent)) i.disable();
                                        else { i.enable();
                                            g++ }
                                }!g || e && !this._.editor.activeFilter.check(e) ? d[0].addClass("cke_dialog_tab_disabled") : d[0].removeClass("cke_dialog_tab_disabled")
                            }
                        }
                    CKEDITOR.tools.setTimeout(function() { this.layout();
                        f(this);
                        this.parts.dialog.setStyle("visibility", "");
                        this.fireOnce("load", {});
                        CKEDITOR.ui.fire("ready", this);
                        this.fire("show", {});
                        this._.editor.fire("dialogShow", this);
                        this._.parentDialog || this._.editor.focusManager.lock();
                        this.foreach(function(a) { a.setInitValue && a.setInitValue() }) }, 100, this)
                },
                layout: function() {
                    var a =
                        this.parts.dialog,
                        b = this.getSize(),
                        c = CKEDITOR.document.getWindow().getViewPaneSize(),
                        d = (c.width - b.width) / 2,
                        e = (c.height - b.height) / 2;
                    CKEDITOR.env.ie6Compat || (b.height + (e > 0 ? e : 0) > c.height || b.width + (d > 0 ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                    this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e)
                },
                foreach: function(a) { for (var b in this._.contents)
                        for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this },
                reset: function() {
                    var a =
                        function(a) { a.reset && a.reset(1) };
                    return function() { this.foreach(a); return this }
                }(),
                setupContent: function() { var a = arguments;
                    this.foreach(function(b) { b.setup && b.setup.apply(b, a) }) },
                commitContent: function() { var a = arguments;
                    this.foreach(function(b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                        b.commit && b.commit.apply(b, a) }) },
                hide: function() {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {});
                        this._.editor.fire("dialogHide", this);
                        this.selectPage(this._.tabIdList[0]);
                        var a = this._.element;
                        a.setStyle("display", "none");
                        this.parts.dialog.setStyle("visibility", "hidden");
                        for (D(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                        if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst();
                            b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else q(this._.editor);
                        if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex - 10;
                        else { CKEDITOR.dialog._.currentZIndex = null;
                            a.removeListener("keydown", z);
                            a.removeListener("keyup", B); var c = this._.editor;
                            c.focus();
                            setTimeout(function() { c.focusManager.unlock();
                                CKEDITOR.env.iOS && c.window.focus() }, 0) } delete this._.parentDialog;
                        this.foreach(function(a) { a.resetInitValue && a.resetInitValue() });
                        this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                    }
                },
                addPage: function(a) {
                    if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                        for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) +
                                '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), e = this._.contents[a.id] = {}, f = d.getChild(), g = 0; d = f.shift();) {!d.notAllowed && (d.type != "hbox" && d.type != "vbox") && g++;
                            e[d.id] = d;
                            typeof d.getChild == "function" && f.push.apply(f, d.getChild()) }
                        if (!g) a.hidden = true;
                        b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                        b.setAttribute("role", "tabpanel");
                        d = CKEDITOR.env;
                        e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                        c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', e, '"', d.gecko && !d.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>"].join(""));
                        b.setAttribute("aria-labelledby", e);
                        this._.tabs[a.id] = [c, b];
                        this._.tabIdList.push(a.id);
                        !a.hidden && this._.pageCount++;
                        this._.lastTab = c;
                        this.updateStyle();
                        b.setAttribute("name",
                            a.id);
                        b.appendTo(this.parts.contents);
                        c.unselectable();
                        this.parts.tabs.append(c);
                        if (a.accessKey) { A(this, this, "CTRL+" + a.accessKey, G, C);
                            this._.accessKeyMap["CTRL+" + a.accessKey] = a.id }
                    }
                },
                selectPage: function(a) {
                    if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && this.fire("selectPage", { page: a, currentPage: this._.currentTabId }) !== false) {
                        for (var c in this._.tabs) {
                            var d = this._.tabs[c][0],
                                e = this._.tabs[c][1];
                            if (c != a) { d.removeClass("cke_dialog_tab_selected");
                                e.hide() } e.setAttribute("aria-hidden",
                                c != a)
                        }
                        var f = this._.tabs[a];
                        f[0].addClass("cke_dialog_tab_selected");
                        if (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) { b(f[1]);
                            f[1].show();
                            setTimeout(function() { b(f[1], 1) }, 0) } else f[1].show();
                        this._.currentTabId = a;
                        this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                    }
                },
                updateStyle: function() { this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page") },
                hidePage: function(b) {
                    var c = this._.tabs[b] && this._.tabs[b][0];
                    if (c && this._.pageCount != 1 && c.isVisible()) {
                        b == this._.currentTabId &&
                            this.selectPage(a.call(this));
                        c.hide();
                        this._.pageCount--;
                        this.updateStyle()
                    }
                },
                showPage: function(a) { if (a = this._.tabs[a] && this._.tabs[a][0]) { a.show();
                        this._.pageCount++;
                        this.updateStyle() } },
                getElement: function() { return this._.element },
                getName: function() { return this._.name },
                getContentElement: function(a, b) { var c = this._.contents[a]; return c && c[b] },
                getValueOf: function(a, b) { return this.getContentElement(a, b).getValue() },
                setValueOf: function(a, b, c) { return this.getContentElement(a, b).setValue(c) },
                getButton: function(a) { return this._.buttons[a] },
                click: function(a) { return this._.buttons[a].click() },
                disableButton: function(a) { return this._.buttons[a].disable() },
                enableButton: function(a) { return this._.buttons[a].enable() },
                getPageCount: function() { return this._.pageCount },
                getParentEditor: function() { return this._.editor },
                getSelectedElement: function() { return this.getParentEditor().getSelection().getSelectedElement() },
                addFocusable: function(a, b) {
                    if (typeof b == "undefined") { b = this._.focusList.length;
                        this._.focusList.push(new j(this, a, b)) } else {
                        this._.focusList.splice(b,
                            0, new j(this, a, b));
                        for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
                    }
                },
                setState: function(a) {
                    if (this.state != a) {
                        this.state = a;
                        if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                            if (!this.parts.spinner) {
                                var b = this.getParentEditor().lang.dir,
                                    c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": b == "rtl" ? "right" : "left" } };
                                c.styles["margin-" + (b == "rtl" ? "left" : "right")] = "8px";
                                this.parts.spinner = CKEDITOR.document.createElement("div", c);
                                this.parts.spinner.setHtml("&#8987;");
                                this.parts.spinner.appendTo(this.parts.title,
                                    1)
                            }
                            this.parts.spinner.show();
                            this.getButton("ok").disable()
                        } else if (a == CKEDITOR.DIALOG_STATE_IDLE) { this.parts.spinner && this.parts.spinner.hide();
                            this.getButton("ok").enable() } this.fire("state", a)
                    }
                }
            };
            CKEDITOR.tools.extend(CKEDITOR.dialog, {
                add: function(a, b) { if (!this._.dialogDefinitions[a] || typeof b == "function") this._.dialogDefinitions[a] = b },
                exists: function(a) { return !!this._.dialogDefinitions[a] },
                getCurrent: function() { return CKEDITOR.dialog._.currentTop },
                isTabEnabled: function(a, b, c) {
                    a = a.config.removeDialogTabs;
                    return !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
                },
                okButton: function() { var a = function(a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function(a) { a = a.data.dialog;
                                a.fire("ok", { hide: true }).hide !== false && a.hide() } }, b, true) };
                    a.type = "button";
                    a.override = function(b) { return CKEDITOR.tools.extend(function(c) { return a(c, b) }, { type: "button" }, true) }; return a }(),
                cancelButton: function() {
                    var a = function(a, b) {
                        b = b || {};
                        return CKEDITOR.tools.extend({
                            id: "cancel",
                            type: "button",
                            label: a.lang.common.cancel,
                            "class": "cke_dialog_ui_button_cancel",
                            onClick: function(a) { a = a.data.dialog;
                                a.fire("cancel", { hide: true }).hide !== false && a.hide() }
                        }, b, true)
                    };
                    a.type = "button";
                    a.override = function(b) { return CKEDITOR.tools.extend(function(c) { return a(c, b) }, { type: "button" }, true) };
                    return a
                }(),
                addUIElement: function(a, b) { this._.uiElementBuilders[a] = b }
            });
            CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null };
            CKEDITOR.event.implementOn(CKEDITOR.dialog);
            CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
            var l = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] },
                s = function(a, b, c) { for (var d = 0, e; e = a[d]; d++) { if (e.id == b) return e; if (c && e[c])
                            if (e = s(e[c], b, c)) return e } return null },
                t = function(a, b, c, d, e) { if (c) { for (var f = 0, g; g = a[f]; f++) { if (g.id == c) { a.splice(f, 0, b); return b } if (d && g[d])
                                if (g = t(g[d], b, c, d, true)) return g } if (e) return null } a.push(b); return b },
                w = function(a, b, c) {
                    for (var d =
                            0, e; e = a[d]; d++) { if (e.id == b) return a.splice(d, 1); if (c && e[c])
                            if (e = w(e[c], b, c)) return e }
                    return null
                },
                v = function(a, b) { this.dialog = a; for (var c = b.contents, d = 0, e; e = c[d]; d++) c[d] = e && new h(a, e);
                    CKEDITOR.tools.extend(this, b) };
            v.prototype = {
                getContents: function(a) { return s(this.contents, a) },
                getButton: function(a) { return s(this.buttons, a) },
                addContents: function(a, b) { return t(this.contents, a, b) },
                addButton: function(a, b) { return t(this.buttons, a, b) },
                removeContents: function(a) { w(this.contents, a) },
                removeButton: function(a) {
                    w(this.buttons,
                        a)
                }
            };
            h.prototype = { get: function(a) { return s(this.elements, a, "children") }, add: function(a, b) { return t(this.elements, a, b, "children") }, remove: function(a) { w(this.elements, a, "children") } };
            var x, u = {},
                r, y = {},
                z = function(a) { var b = a.data.$.ctrlKey || a.data.$.metaKey,
                        c = a.data.$.altKey,
                        d = a.data.$.shiftKey,
                        e = String.fromCharCode(a.data.$.keyCode); if ((b = y[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length) { b = b[b.length - 1];
                        b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key);
                        a.data.preventDefault() } },
                B = function(a) {
                    var b =
                        a.data.$.ctrlKey || a.data.$.metaKey,
                        c = a.data.$.altKey,
                        d = a.data.$.shiftKey,
                        e = String.fromCharCode(a.data.$.keyCode);
                    if ((b = y[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length) { b = b[b.length - 1]; if (b.keyup) { b.keyup.call(b.uiElement, b.dialog, b.key);
                            a.data.preventDefault() } }
                },
                A = function(a, b, c, d, e) {
                    (y[c] || (y[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: e || a.accessKeyUp, keydown: d || a.accessKeyDown }) },
                D = function(a) {
                    for (var b in y) {
                        for (var c = y[b], d = c.length - 1; d >= 0; d--)(c[d].dialog == a || c[d].uiElement ==
                            a) && c.splice(d, 1);
                        c.length === 0 && delete y[b]
                    }
                },
                C = function(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) },
                G = function() {};
            (function() {
                CKEDITOR.ui.dialog = {
                    uiElement: function(a, b, c, d, e, f, g) {
                        if (!(arguments.length < 4)) {
                            var h = (d.call ? d(b) : d) || "div",
                                i = ["<", h, " "],
                                j = (e && e.call ? e(b) : e) || {},
                                k = (f && f.call ? f(b) : f) || {},
                                m = (g && g.call ? g.call(this, a, b) : g) || "",
                                l = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
                            if (b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent)) {
                                j.display = "none";
                                this.notAllowed = true
                            }
                            k.id = l;
                            var t = {};
                            b.type && (t["cke_dialog_ui_" + b.type] = 1);
                            b.className && (t[b.className] = 1);
                            if (b.disabled) t.cke_disabled = 1;
                            for (var s = k["class"] && k["class"].split ? k["class"].split(" ") : [], l = 0; l < s.length; l++) s[l] && (t[s[l]] = 1);
                            s = [];
                            for (l in t) s.push(l);
                            k["class"] = s.join(" ");
                            if (b.title) k.title = b.title;
                            t = (b.style || "").split(";");
                            if (b.align) { s = b.align;
                                j["margin-left"] = s == "left" ? 0 : "auto";
                                j["margin-right"] = s == "right" ? 0 : "auto" }
                            for (l in j) t.push(l + ":" + j[l]);
                            b.hidden && t.push("display:none");
                            for (l = t.length - 1; l >= 0; l--) t[l] === "" && t.splice(l, 1);
                            if (t.length > 0) k.style = (k.style ? k.style + "; " : "") + t.join("; ");
                            for (l in k) i.push(l + '="' + CKEDITOR.tools.htmlEncode(k[l]) + '" ');
                            i.push(">", m, "</", h, ">");
                            c.push(i.join(""));
                            (this._ || (this._ = {})).dialog = a;
                            if (typeof b.isChanged == "boolean") this.isChanged = function() { return b.isChanged };
                            if (typeof b.isChanged == "function") this.isChanged = b.isChanged;
                            if (typeof b.setValue == "function") this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                                return function(c) {
                                    a.call(this,
                                        b.setValue.call(this, c))
                                }
                            });
                            if (typeof b.getValue == "function") this.getValue = CKEDITOR.tools.override(this.getValue, function(a) { return function() { return b.getValue.call(this, a.call(this)) } });
                            CKEDITOR.event.implementOn(this);
                            this.registerEvents(b);
                            this.accessKeyUp && (this.accessKeyDown && b.accessKey) && A(this, a, "CTRL+" + b.accessKey);
                            var o = this;
                            a.on("load", function() {
                                var b = o.getInputElement();
                                if (b) {
                                    var c = o.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                    b.on("focus",
                                        function() { a._.tabBarMode = false;
                                            a._.hasFocus = true;
                                            o.fire("focus");
                                            c && this.addClass(c) });
                                    b.on("blur", function() { o.fire("blur");
                                        c && this.removeClass(c) })
                                }
                            });
                            CKEDITOR.tools.extend(this, b);
                            if (this.keyboardFocusable) { this.tabIndex = b.tabIndex || 0;
                                this.focusIndex = a._.focusList.push(this) - 1;
                                this.on("focus", function() { a._.currentFocusIndex = o.focusIndex }) }
                        }
                    },
                    hbox: function(a, b, c, d, e) {
                        if (!(arguments.length < 4)) {
                            this._ || (this._ = {});
                            var f = this._.children = b,
                                g = e && e.widths || null,
                                h = e && e.height || null,
                                i, j = { role: "presentation" };
                            e && e.align && (j.align = e.align);
                            CKEDITOR.ui.dialog.uiElement.call(this, a, e || { type: "hbox" }, d, "table", {}, j, function() {
                                var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                                for (i = 0; i < c.length; i++) {
                                    var b = "cke_dialog_ui_hbox_child",
                                        d = [];
                                    i === 0 && (b = "cke_dialog_ui_hbox_first");
                                    i == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                    a.push('<td class="', b, '" role="presentation" ');
                                    g ? g[i] && d.push("width:" + o(g[i])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                    h && d.push("height:" + o(h));
                                    e && e.padding !== void 0 && d.push("padding:" +
                                        o(e.padding));
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && f[i].align) && d.push("text-align:" + f[i].align);
                                    d.length > 0 && a.push('style="' + d.join("; ") + '" ');
                                    a.push(">", c[i], "</td>")
                                }
                                a.push("</tr></tbody>");
                                return a.join("")
                            })
                        }
                    },
                    vbox: function(a, b, c, d, e) {
                        if (!(arguments.length < 3)) {
                            this._ || (this._ = {});
                            var f = this._.children = b,
                                g = e && e.width || null,
                                i = e && e.heights || null;
                            CKEDITOR.ui.dialog.uiElement.call(this, a, e || { type: "vbox" }, d, "div", null, { role: "presentation" }, function() {
                                var b = ['<table role="presentation" cellspacing="0" border="0" '];
                                b.push('style="');
                                e && e.expand && b.push("height:100%;");
                                b.push("width:" + o(g || "100%"), ";");
                                CKEDITOR.env.webkit && b.push("float:none;");
                                b.push('"');
                                b.push('align="', CKEDITOR.tools.htmlEncode(e && e.align || (a.getParentEditor().lang.dir == "ltr" ? "left" : "right")), '" ');
                                b.push("><tbody>");
                                for (var d = 0; d < c.length; d++) {
                                    var h = [];
                                    b.push('<tr><td role="presentation" ');
                                    g && h.push("width:" + o(g || "100%"));
                                    i ? h.push("height:" + o(i[d])) : e && e.expand && h.push("height:" + Math.floor(100 / c.length) + "%");
                                    e && e.padding !== void 0 && h.push("padding:" +
                                        o(e.padding));
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && f[d].align) && h.push("text-align:" + f[d].align);
                                    h.length > 0 && b.push('style="', h.join("; "), '" ');
                                    b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                                }
                                b.push("</tbody></table>");
                                return b.join("")
                            })
                        }
                    }
                }
            })();
            CKEDITOR.ui.dialog.uiElement.prototype = {
                getElement: function() { return CKEDITOR.document.getById(this.domId) },
                getInputElement: function() { return this.getElement() },
                getDialog: function() { return this._.dialog },
                setValue: function(a, b) {
                    this.getInputElement().setValue(a);
                    !b && this.fire("change", { value: a });
                    return this
                },
                getValue: function() { return this.getInputElement().getValue() },
                isChanged: function() { return false },
                selectParentTab: function() { for (var a = this.getInputElement();
                        (a = a.getParent()) && a.$.className.search("cke_dialog_page_contents") == -1;); if (!a) return this;
                    a = a.getAttribute("name");
                    this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this },
                focus: function() { this.selectParentTab().getInputElement().focus(); return this },
                registerEvents: function(a) {
                    var b =
                        /^on([A-Z]\w+)/,
                        c, d = function(a, b, c, d) { b.on("load", function() { a.getInputElement().on(c, d, a) }) },
                        e;
                    for (e in a)
                        if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
                    return this
                },
                eventProcessors: { onLoad: function(a, b) { a.on("load", b, this) }, onShow: function(a, b) { a.on("show", b, this) }, onHide: function(a, b) { a.on("hide", b, this) } },
                accessKeyDown: function() { this.focus() },
                accessKeyUp: function() {},
                disable: function() {
                    var a = this.getElement();
                    this.getInputElement().setAttribute("disabled", "true");
                    a.addClass("cke_disabled")
                },
                enable: function() { var a = this.getElement();
                    this.getInputElement().removeAttribute("disabled");
                    a.removeClass("cke_disabled") },
                isEnabled: function() { return !this.getElement().hasClass("cke_disabled") },
                isVisible: function() { return this.getInputElement().isVisible() },
                isFocusable: function() { return !this.isEnabled() || !this.isVisible() ? false : true }
            };
            CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, { getChild: function(a) { if (arguments.length < 1) return this._.children.concat();
                    a.splice || (a = [a]); return a.length < 2 ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, true);
            CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
            (function() {
                var a = {
                    build: function(a, b, c) {
                        for (var d = b.children, e, f = [], g = [], h = 0; h < d.length && (e = d[h]); h++) { var i = [];
                            f.push(i);
                            g.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, i)) }
                        return new CKEDITOR.ui.dialog[b.type](a,
                            g, f, c, b)
                    }
                };
                CKEDITOR.dialog.addUIElement("hbox", a);
                CKEDITOR.dialog.addUIElement("vbox", a)
            })();
            CKEDITOR.dialogCommand = function(a, b) { this.dialogName = a;
                CKEDITOR.tools.extend(this, b, true) };
            CKEDITOR.dialogCommand.prototype = { exec: function(a) { a.openDialog(this.dialogName) }, canUndo: false, editorFocus: 1 };
            (function() {
                var a = /^([a]|[^a])+$/,
                    b = /^\d*$/,
                    c = /^\d*(?:\.\d+)?$/,
                    d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                    e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                    f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
                CKEDITOR.VALIDATE_OR =
                    1;
                CKEDITOR.VALIDATE_AND = 2;
                CKEDITOR.dialog.validate = {
                    functions: function() { var a = arguments; return function() { var b = this && this.getValue ? this.getValue() : a[0],
                                c, d = CKEDITOR.VALIDATE_AND,
                                e = [],
                                f; for (f = 0; f < a.length; f++)
                                if (typeof a[f] == "function") e.push(a[f]);
                                else break; if (f < a.length && typeof a[f] == "string") { c = a[f];
                                f++ } f < a.length && typeof a[f] == "number" && (d = a[f]); var g = d == CKEDITOR.VALIDATE_AND ? true : false; for (f = 0; f < e.length; f++) g = d == CKEDITOR.VALIDATE_AND ? g && e[f](b) : g || e[f](b); return !g ? c : true } },
                    regex: function(a,
                        b) { return function(c) { c = this && this.getValue ? this.getValue() : c; return !a.test(c) ? b : true } },
                    notEmpty: function(b) { return this.regex(a, b) },
                    integer: function(a) { return this.regex(b, a) },
                    number: function(a) { return this.regex(c, a) },
                    cssLength: function(a) { return this.functions(function(a) { return e.test(CKEDITOR.tools.trim(a)) }, a) },
                    htmlLength: function(a) { return this.functions(function(a) { return d.test(CKEDITOR.tools.trim(a)) }, a) },
                    inlineStyle: function(a) {
                        return this.functions(function(a) { return f.test(CKEDITOR.tools.trim(a)) },
                            a)
                    },
                    equals: function(a, b) { return this.functions(function(b) { return b == a }, b) },
                    notEqual: function(a, b) { return this.functions(function(b) { return b != a }, b) }
                };
                CKEDITOR.on("instanceDestroyed", function(a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide(); for (var c in u) u[c].remove();
                        u = {} } var a = a.editor._.storedDialogs,
                        d; for (d in a) a[d].destroy() })
            })();
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                openDialog: function(a, b) {
                    var c = null,
                        d = CKEDITOR.dialog._.dialogDefinitions[a];
                    CKEDITOR.dialog._.currentTop === null && p(this);
                    if (typeof d == "function") { c = this._.storedDialogs || (this._.storedDialogs = {});
                        c = c[a] || (c[a] = new CKEDITOR.dialog(this, a));
                        b && b.call(c, c);
                        c.show() } else {
                        if (d == "failed") { q(this); throw Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); } typeof d == "string" && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
                            typeof CKEDITOR.dialog._.dialogDefinitions[a] != "function" && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                            this.openDialog(a,
                                b)
                        }, this, 0, 1)
                    }
                    CKEDITOR.skin.loadPart("dialog");
                    return c
                }
            })
        }(), CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function(a) { a.on("doubleclick", function(e) { e.data.dialog && a.openDialog(e.data.dialog) }, null, null, 999) } }),
        function() {
            CKEDITOR.plugins.add("a11yhelp", {
                requires: "dialog",
                availableLangs: {
                    af: 1,
                    ar: 1,
                    bg: 1,
                    ca: 1,
                    cs: 1,
                    cy: 1,
                    da: 1,
                    de: 1,
                    el: 1,
                    en: 1,
                    "en-gb": 1,
                    eo: 1,
                    es: 1,
                    et: 1,
                    fa: 1,
                    fi: 1,
                    fo: 1,
                    fr: 1,
                    "fr-ca": 1,
                    gl: 1,
                    gu: 1,
                    he: 1,
                    hi: 1,
                    hr: 1,
                    hu: 1,
                    id: 1,
                    it: 1,
                    ja: 1,
                    km: 1,
                    ko: 1,
                    ku: 1,
                    lt: 1,
                    lv: 1,
                    mk: 1,
                    mn: 1,
                    nb: 1,
                    nl: 1,
                    no: 1,
                    pl: 1,
                    pt: 1,
                    "pt-br": 1,
                    ro: 1,
                    ru: 1,
                    si: 1,
                    sk: 1,
                    sl: 1,
                    sq: 1,
                    sr: 1,
                    "sr-latn": 1,
                    sv: 1,
                    th: 1,
                    tr: 1,
                    tt: 1,
                    ug: 1,
                    uk: 1,
                    vi: 1,
                    zh: 1,
                    "zh-cn": 1
                },
                init: function(a) {
                    var e = this;
                    a.addCommand("a11yHelp", { exec: function() { var b = a.langCode,
                                b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                            CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function() { a.lang.a11yhelp = e.langEntries[b];
                                a.openDialog("a11yHelp") }) }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: false });
                    a.setKeystroke(CKEDITOR.ALT +
                        48, "a11yHelp");
                    CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
                    a.on("ariaEditorHelpLabel", function(b) { b.data.label = a.lang.common.editorHelp })
                }
            })
        }(), CKEDITOR.plugins.add("about", { requires: "dialog", init: function(a) { var e = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
                e.modes = { wysiwyg: 1, source: 1 };
                e.canUndo = false;
                e.readOnly = 1;
                a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.title, command: "about", toolbar: "about" });
                CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } }),
        CKEDITOR.plugins.add("basicstyles", {
            init: function(a) {
                var e = 0,
                    b = function(b, d, h, i) { if (i) { var i = new CKEDITOR.style(i),
                                g = c[h];
                            g.unshift(i);
                            a.attachStyleStateChange(i, function(b) {!a.readOnly && a.getCommand(h).setState(b) });
                            a.addCommand(h, new CKEDITOR.styleCommand(i, { contentForms: g }));
                            a.ui.addButton && a.ui.addButton(b, { label: d, command: h, toolbar: "basicstyles," + (e = e + 10) }) } },
                    c = {
                        bold: ["strong", "b", ["span", function(a) { a = a.styles["font-weight"]; return a == "bold" || +a >= 700 }]],
                        italic: ["em", "i", ["span", function(a) {
                            return a.styles["font-style"] ==
                                "italic"
                        }]],
                        underline: ["u", ["span", function(a) { return a.styles["text-decoration"] == "underline" }]],
                        strike: ["s", "strike", ["span", function(a) { return a.styles["text-decoration"] == "line-through" }]],
                        subscript: ["sub"],
                        superscript: ["sup"]
                    },
                    d = a.config,
                    i = a.lang.basicstyles;
                b("Bold", i.bold, "bold", d.coreStyles_bold);
                b("Italic", i.italic, "italic", d.coreStyles_italic);
                b("Underline", i.underline, "underline", d.coreStyles_underline);
                b("Strike", i.strike, "strike", d.coreStyles_strike);
                b("Subscript", i.subscript, "subscript",
                    d.coreStyles_subscript);
                b("Superscript", i.superscript, "superscript", d.coreStyles_superscript);
                a.setKeystroke([
                    [CKEDITOR.CTRL + 66, "bold"],
                    [CKEDITOR.CTRL + 73, "italic"],
                    [CKEDITOR.CTRL + 85, "underline"]
                ])
            }
        }), CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }, CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }, CKEDITOR.config.coreStyles_underline = { element: "u" }, CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" }, CKEDITOR.config.coreStyles_subscript = { element: "sub" }, CKEDITOR.config.coreStyles_superscript = { element: "sup" },
        function() {
            function a(a, b, c, d) {
                if (!a.isReadOnly() && !a.equals(c.editable())) {
                    CKEDITOR.dom.element.setMarker(d, a, "bidi_processed", 1);
                    for (var d = a, e = c.editable();
                        (d = d.getParent()) && !d.equals(e);)
                        if (d.getCustomData("bidi_processed")) { a.removeStyle("direction");
                            a.removeAttribute("dir"); return }
                    d = "useComputedState" in c.config ? c.config.useComputedState : 1;
                    if ((d ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != b) {
                        a.removeStyle("direction");
                        if (d) {
                            a.removeAttribute("dir");
                            b != a.getComputedStyle("direction") && a.setAttribute("dir", b)
                        } else a.setAttribute("dir", b);
                        c.forceNextSelectionCheck()
                    }
                }
            }

            function e(a, b, c) {
                var d = a.getCommonAncestor(false, true),
                    a = a.clone();
                a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                if (a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) {
                    for (var e; d && d.type == CKEDITOR.NODE_ELEMENT && (e = d.getParent()) && e.getChildCount() == 1 && !(d.getName() in b);) d = e;
                    return d.type == CKEDITOR.NODE_ELEMENT &&
                        d.getName() in b && d
                }
            }

            function b(b) {
                return {
                    context: "p",
                    allowedContent: { "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": { propertiesOnly: true, attributes: "dir" } },
                    requiredContent: "p[dir]",
                    refresh: function(a, b) {
                        var c = a.config.useComputedState,
                            d, c = c === void 0 || c;
                        if (!c) { d = b.lastElement; for (var e = a.editable(); d && !(d.getName() in j || d.equals(e));) { var f = d.getParent(); if (!f) break;
                                d = f } } d = d || b.block || b.blockLimit;
                        if (d.equals(a.editable()))(e = a.getSelection().getRanges()[0].getEnclosedNode()) && e.type ==
                            CKEDITOR.NODE_ELEMENT && (d = e);
                        if (d) { c = c ? d.getComputedStyle("direction") : d.getStyle("direction") || d.getAttribute("dir");
                            a.getCommand("bidirtl").setState(c == "rtl" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                            a.getCommand("bidiltr").setState(c == "ltr" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) } c = (b.block || b.blockLimit || a.editable()).getDirection(1);
                        if (c != (a._.selDir || a.lang.dir)) { a._.selDir = c;
                            a.fire("contentDirChanged", c) }
                    },
                    exec: function(c) {
                        var f = c.getSelection(),
                            h = c.config.enterMode,
                            j = f.getRanges();
                        if (j &&
                            j.length) {
                            for (var k = {}, l = f.createBookmarks(), j = j.createIterator(), s, t = 0; s = j.getNextRange(1);) {
                                var w = s.getEnclosedNode();
                                if (!w || w && !(w.type == CKEDITOR.NODE_ELEMENT && w.getName() in i)) w = e(s, d, h);
                                w && a(w, b, c, k);
                                var v = new CKEDITOR.dom.walker(s),
                                    x = l[t].startNode,
                                    u = l[t++].endNode;
                                v.evaluator = function(a) {
                                    var b = h == CKEDITOR.ENTER_P ? "p" : "div",
                                        c;
                                    if (c = a ? a.type == CKEDITOR.NODE_ELEMENT : false)
                                        if (c = a.getName() in d) {
                                            if (b = a.is(b)) b = ((b = a.getParent()) ? b.type == CKEDITOR.NODE_ELEMENT : false) && a.getParent().is("blockquote");
                                            c = !b && a.getPosition(x) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(u) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING
                                        }
                                    return !!c
                                };
                                for (; w = v.next();) a(w, b, c, k);
                                s = s.createIterator();
                                for (s.enlargeBr = h != CKEDITOR.ENTER_BR; w = s.getNextParagraph(h == CKEDITOR.ENTER_P ? "p" : "div");) a(w, b, c, k)
                            }
                            CKEDITOR.dom.element.clearAllMarkers(k);
                            c.forceNextSelectionCheck();
                            f.selectBookmarks(l);
                            c.focus()
                        }
                    }
                }
            }

            function c(a) {
                var b = a == f.setAttribute,
                    c = a == f.removeAttribute,
                    d = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
                return function(e, f) { if (!this.isReadOnly()) { var h; if (h = e == (b || c ? "dir" : "direction") || e == "style" && (c || d.test(f))) { a: { h = this; for (var i = h.getDocument().getBody().getParent(); h;) { if (h.equals(i)) { h = false; break a } h = h.getParent() } h = true } h = !h } if (h) { h = this.getDirection(1);
                            i = a.apply(this, arguments); if (h != this.getDirection(1)) { this.getDocument().fire("dirChanged", this); return i } } } return a.apply(this, arguments) }
            }
            var d = { table: 1, ul: 1, ol: 1, blockquote: 1, div: 1 },
                i = {},
                j = {};
            CKEDITOR.tools.extend(i, d, { tr: 1, p: 1, div: 1, li: 1 });
            CKEDITOR.tools.extend(j, i, { td: 1 });
            CKEDITOR.plugins.add("bidi", {
                init: function(a) {
                    function c(b, d, e, f, h) { a.addCommand(e, new CKEDITOR.command(a, f));
                        a.ui.addButton && a.ui.addButton(b, { label: d, command: e, toolbar: "bidi," + h }) }
                    if (!a.blockless) {
                        var d = a.lang.bidi;
                        c("BidiLtr", d.ltr, "bidiltr", b("ltr"), 10);
                        c("BidiRtl", d.rtl, "bidirtl", b("rtl"), 20);
                        a.on("contentDom", function() { a.document.on("dirChanged", function(b) { a.fire("dirChanged", { node: b.data, dir: b.data.getDirection(1) }) }) });
                        a.on("contentDirChanged", function(b) {
                            var b =
                                (a.lang.dir != b.data ? "add" : "remove") + "Class",
                                c = a.ui.space(a.config.toolbarLocation);
                            if (c) c[b]("cke_mixed_dir_content")
                        })
                    }
                }
            });
            for (var f = CKEDITOR.dom.element.prototype, h = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], k = 0; k < h.length; k++) f[h[k]] = CKEDITOR.tools.override(f[h[k]], c)
        }(),
        function() {
            var a = {
                exec: function(a) {
                    var b = a.getCommand("blockquote").state,
                        c = a.getSelection(),
                        d = c && c.getRanges()[0];
                    if (d) {
                        var i = c.createBookmarks();
                        if (CKEDITOR.env.ie) {
                            var j = i[0].startNode,
                                f = i[0].endNode,
                                h;
                            if (j &&
                                j.getParent().getName() == "blockquote")
                                for (h = j; h = h.getNext();)
                                    if (h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) { j.move(h, true); break }
                            if (f && f.getParent().getName() == "blockquote")
                                for (h = f; h = h.getPrevious();)
                                    if (h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) { f.move(h); break }
                        }
                        var k = d.createIterator();
                        k.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR;
                        if (b == CKEDITOR.TRISTATE_OFF) {
                            for (j = []; b = k.getNextParagraph();) j.push(b);
                            if (j.length < 1) {
                                b = a.document.createElement(a.config.enterMode == CKEDITOR.ENTER_P ?
                                    "p" : "div");
                                f = i.shift();
                                d.insertNode(b);
                                b.append(new CKEDITOR.dom.text("﻿", a.document));
                                d.moveToBookmark(f);
                                d.selectNodeContents(b);
                                d.collapse(true);
                                f = d.createBookmark();
                                j.push(b);
                                i.unshift(f)
                            }
                            h = j[0].getParent();
                            d = [];
                            for (f = 0; f < j.length; f++) { b = j[f];
                                h = h.getCommonAncestor(b.getParent()) }
                            for (b = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; b[h.getName()];) h = h.getParent();
                            for (f = null; j.length > 0;) { for (b = j.shift(); !b.getParent().equals(h);) b = b.getParent();
                                b.equals(f) || d.push(b);
                                f = b }
                            for (; d.length > 0;) {
                                b = d.shift();
                                if (b.getName() ==
                                    "blockquote") { for (f = new CKEDITOR.dom.documentFragment(a.document); b.getFirst();) { f.append(b.getFirst().remove());
                                        j.push(f.getLast()) } f.replace(b) } else j.push(b)
                            }
                            d = a.document.createElement("blockquote");
                            for (d.insertBefore(j[0]); j.length > 0;) { b = j.shift();
                                d.append(b) }
                        } else if (b == CKEDITOR.TRISTATE_ON) {
                            f = [];
                            for (h = {}; b = k.getNextParagraph();) {
                                for (j = d = null; b.getParent();) { if (b.getParent().getName() == "blockquote") { d = b.getParent();
                                        j = b; break } b = b.getParent() }
                                if (d && j && !j.getCustomData("blockquote_moveout")) {
                                    f.push(j);
                                    CKEDITOR.dom.element.setMarker(h, j, "blockquote_moveout", true)
                                }
                            }
                            CKEDITOR.dom.element.clearAllMarkers(h);
                            b = [];
                            j = [];
                            for (h = {}; f.length > 0;) { k = f.shift();
                                d = k.getParent(); if (k.getPrevious())
                                    if (k.getNext()) { k.breakParent(k.getParent());
                                        j.push(k.getNext()) } else k.remove().insertAfter(d);
                                else k.remove().insertBefore(d); if (!d.getCustomData("blockquote_processed")) { j.push(d);
                                    CKEDITOR.dom.element.setMarker(h, d, "blockquote_processed", true) } b.push(k) } CKEDITOR.dom.element.clearAllMarkers(h);
                            for (f = j.length - 1; f >= 0; f--) {
                                d =
                                    j[f];
                                a: { h = d; for (var k = 0, g = h.getChildCount(), m = void 0; k < g && (m = h.getChild(k)); k++)
                                        if (m.type == CKEDITOR.NODE_ELEMENT && m.isBlockBoundary()) { h = false; break a }
                                    h = true } h && d.remove()
                            }
                            if (a.config.enterMode == CKEDITOR.ENTER_BR)
                                for (d = true; b.length;) {
                                    k = b.shift();
                                    if (k.getName() == "div") {
                                        f = new CKEDITOR.dom.documentFragment(a.document);
                                        d && (k.getPrevious() && !(k.getPrevious().type == CKEDITOR.NODE_ELEMENT && k.getPrevious().isBlockBoundary())) && f.append(a.document.createElement("br"));
                                        for (d = k.getNext() && !(k.getNext().type ==
                                                CKEDITOR.NODE_ELEMENT && k.getNext().isBlockBoundary()); k.getFirst();) k.getFirst().remove().appendTo(f);
                                        d && f.append(a.document.createElement("br"));
                                        f.replace(k);
                                        d = false
                                    }
                                }
                        }
                        c.selectBookmarks(i);
                        a.focus()
                    }
                },
                refresh: function(a, b) { this.setState(a.elementPath(b.block || b.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) },
                context: "blockquote",
                allowedContent: "blockquote",
                requiredContent: "blockquote"
            };
            CKEDITOR.plugins.add("blockquote", {
                init: function(e) {
                    if (!e.blockless) {
                        e.addCommand("blockquote",
                            a);
                        e.ui.addButton && e.ui.addButton("Blockquote", { label: e.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })
                    }
                }
            })
        }(), "use strict",
        function() {
            function a(a, b, c) { if (!b.type) b.type = "auto"; if (c && a.fire("beforePaste", b) === false || !b.dataValue && b.dataTransfer.isEmpty()) return false; if (!b.dataValue) b.dataValue = ""; if (CKEDITOR.env.gecko && b.method == "drop" && a.toolbox) a.once("afterPaste", function() { a.toolbox.focus() }); return a.fire("paste", b) }

            function e(b) {
                function c() {
                    var a = b.editable();
                    if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                        var d =
                            function(a) { y.initPasteDataTransfer(a, b);
                                a.data.preventDefault() };
                        a.on("copy", d);
                        a.on("cut", d);
                        a.on("cut", function() { b.extractSelectedHtml() }, null, null, 999)
                    }
                    a.on(y.mainPasteEvent, function(a) { y.mainPasteEvent == "beforepaste" && z || x(a) });
                    if (y.mainPasteEvent == "beforepaste") {
                        a.on("paste", function(a) { if (!B) { f();
                                a.data.preventDefault();
                                x(a);
                                i("paste") || b.openDialog("paste") } });
                        a.on("contextmenu", h, null, null, 0);
                        a.on("beforepaste", function(a) { a.data && (!a.data.$.ctrlKey && !a.data.$.shiftKey) && h() }, null, null,
                            0)
                    }
                    a.on("beforecut", function() {!z && j(b) });
                    var e;
                    a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function() { e = setTimeout(function() { u() }, 0) });
                    b.on("destroy", function() { clearTimeout(e) });
                    a.on("keyup", u)
                }

                function d(a) {
                    return {
                        type: a,
                        canUndo: a == "cut",
                        startDisabled: true,
                        exec: function() {
                            this.type == "cut" && j();
                            var a;
                            var c = this.type;
                            if (CKEDITOR.env.ie) a = i(c);
                            else try { a = b.document.$.execCommand(c, false, null) } catch (d) { a = false } a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
                            return a
                        }
                    }
                }

                function e() { return { canUndo: false, async: true, exec: function(b, c) { var d = function(c, d) { c && a(b, c, !!d);
                                    b.fire("afterCommandExec", { name: "paste", command: e, returnValue: !!c }) },
                                e = this;
                            typeof c == "string" ? d({ dataValue: c, method: "paste", dataTransfer: y.initPasteDataTransfer() }, 1) : b.getClipboardData(d) } } }

                function f() { B = 1;
                    setTimeout(function() { B = 0 }, 100) }

                function h() { z = 1;
                    setTimeout(function() { z = 0 }, 10) }

                function i(a) {
                    var c = b.document,
                        d = c.getBody(),
                        e = false,
                        f = function() { e = true };
                    d.on(a, f);
                    CKEDITOR.env.version >
                        7 ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a);
                    d.removeListener(a, f);
                    return e
                }

                function j() { if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) { var a = b.getSelection(),
                            c, d, e; if (a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement())) { d = a.getRanges()[0];
                            e = b.document.createText("");
                            e.insertBefore(c);
                            d.setStartBefore(e);
                            d.setEndAfter(c);
                            a.selectRanges([d]);
                            setTimeout(function() { if (c.getParent()) { e.remove();
                                    a.selectElement(c) } }, 0) } } }

                function k(a, c) {
                    var d = b.document,
                        e = b.editable(),
                        f = function(a) { a.cancel() },
                        h;
                    if (!d.getById("cke_pastebin")) {
                        var i = b.getSelection(),
                            j = i.createBookmarks();
                        CKEDITOR.env.ie && i.root.fire("selectionchange");
                        var l = new CKEDITOR.dom.element((CKEDITOR.env.webkit || e.is("body")) && !CKEDITOR.env.ie ? "body" : "div", d);
                        l.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" });
                        var m = 0,
                            d = d.getWindow();
                        if (CKEDITOR.env.webkit) { e.append(l);
                            l.addClass("cke_editable"); if (!e.is("body")) { m = e.getComputedStyle("position") != "static" ? e : CKEDITOR.dom.element.get(e.$.offsetParent);
                                m = m.getDocumentPosition().y } } else e.getAscendant(CKEDITOR.env.ie ?
                            "body" : "html", 1).append(l);
                        l.setStyles({ position: "absolute", top: d.getScrollPosition().y - m + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 });
                        CKEDITOR.env.safari && l.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
                        if (m = l.getParent().isReadOnly()) { l.setOpacity(0);
                            l.setAttribute("contenteditable", true) } else l.setStyle(b.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px");
                        b.on("selectionChange", f, null, null, 0);
                        if (CKEDITOR.env.webkit ||
                            CKEDITOR.env.gecko) h = e.once("blur", f, null, null, -100);
                        m && l.focus();
                        m = new CKEDITOR.dom.range(l);
                        m.selectNodeContents(l);
                        var t = m.select();
                        CKEDITOR.env.ie && (h = e.once("blur", function() { b.lockSelection(t) }));
                        var s = CKEDITOR.document.getWindow().getScrollPosition().y;
                        setTimeout(function() {
                            if (CKEDITOR.env.webkit) CKEDITOR.document.getBody().$.scrollTop = s;
                            h && h.removeListener();
                            CKEDITOR.env.ie && e.focus();
                            i.selectBookmarks(j);
                            l.remove();
                            var a;
                            if (CKEDITOR.env.webkit && (a = l.getFirst()) && a.is && a.hasClass("Apple-style-span")) l =
                                a;
                            b.removeListener("selectionChange", f);
                            c(l.getHtml())
                        }, 0)
                    }
                }

                function w() { if (y.mainPasteEvent == "paste") { b.fire("beforePaste", { type: "auto", method: "paste" }); return false } b.focus();
                    f(); var a = b.focusManager;
                    a.lock(); if (b.editable().fire(y.mainPasteEvent) && !i("paste")) { a.unlock(); return false } a.unlock(); return true }

                function v(a) {
                    if (b.mode == "wysiwyg") switch (a.data.keyCode) {
                        case CKEDITOR.CTRL + 86:
                        case CKEDITOR.SHIFT + 45:
                            a = b.editable();
                            f();
                            y.mainPasteEvent == "paste" && a.fire("beforepaste");
                            break;
                        case CKEDITOR.CTRL +
                        88:
                        case CKEDITOR.SHIFT + 46:
                            b.fire("saveSnapshot");
                            setTimeout(function() { b.fire("saveSnapshot") }, 50)
                    }
                }

                function x(c) { var d = { type: "auto", method: "paste", dataTransfer: y.initPasteDataTransfer(c) };
                    d.dataTransfer.cacheData(); var e = b.fire("beforePaste", d) !== false; if (e && y.canClipboardApiBeTrusted(d.dataTransfer, b)) { c.data.preventDefault();
                        setTimeout(function() { a(b, d) }, 0) } else k(c, function(c) { d.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                        e && a(b, d) }) }

                function u() {
                    if (b.mode == "wysiwyg") {
                        var a =
                            r("paste");
                        b.getCommand("cut").setState(r("cut"));
                        b.getCommand("copy").setState(r("copy"));
                        b.getCommand("paste").setState(a);
                        b.fire("pasteState", a)
                    }
                }

                function r(a) { if (A && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if (a == "paste") return CKEDITOR.TRISTATE_OFF; var a = b.getSelection(),
                        c = a.getRanges(); return a.getType() == CKEDITOR.SELECTION_NONE || c.length == 1 && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF }
                var y = CKEDITOR.plugins.clipboard,
                    z = 0,
                    B = 0,
                    A = 0;
                (function() {
                    b.on("key", v);
                    b.on("contentDom",
                        c);
                    b.on("selectionChange", function(a) { A = a.data.selection.getRanges()[0].checkReadOnly();
                        u() });
                    b.contextMenu && b.contextMenu.addListener(function(a, b) { A = b.getRanges()[0].checkReadOnly(); return { cut: r("cut"), copy: r("copy"), paste: r("paste") } })
                })();
                (function() {
                    function a(c, d, e, f, h) { var i = b.lang.clipboard[d];
                        b.addCommand(d, e);
                        b.ui.addButton && b.ui.addButton(c, { label: i, command: d, toolbar: "clipboard," + f });
                        b.addMenuItems && b.addMenuItem(d, { label: i, command: d, group: "clipboard", order: h }) } a("Cut", "cut", d("cut"), 10,
                        1);
                    a("Copy", "copy", d("copy"), 20, 4);
                    a("Paste", "paste", e(), 30, 8)
                })();
                b.getClipboardData = function(a, c) {
                    function d(a) { a.removeListener();
                        a.cancel();
                        c(a.data) }

                    function e(a) { a.removeListener();
                        a.cancel();
                        j = true;
                        c({ type: i, dataValue: a.data, method: "paste" }) }

                    function f() { this.customTitle = a && a.title }
                    var h = false,
                        i = "auto",
                        j = false;
                    if (!c) { c = a;
                        a = null } b.on("paste", d, null, null, 0);
                    b.on("beforePaste", function(a) { a.removeListener();
                        h = true;
                        i = a.data.type }, null, null, 1E3);
                    if (w() === false) {
                        b.removeListener("paste", d);
                        if (h &&
                            b.fire("pasteDialog", f)) { b.on("pasteDialogCommit", e);
                            b.on("dialogHide", function(a) { a.removeListener();
                                a.data.removeListener("pasteDialogCommit", e);
                                setTimeout(function() { j || c(null) }, 10) }) } else c(null)
                    }
                }
            }

            function b(a) {
                if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html";
                return "htmlifiedtext"
            }

            function c(a, b) {
                function c(a) { return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" : "") } b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
                b = b.replace(/<\/?[A-Z]+>/g, function(a) { return a.toLowerCase() });
                if (b.match(/^[^<]$/)) return b;
                if (CKEDITOR.env.webkit && b.indexOf("<div>") > -1) {
                    b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>");
                    b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" +
                        b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) { return c(a.split("</div><div>").length + 1) }) + "</p>");
                    b = b.replace(/<\/div><div>/g, "<br>");
                    b = b.replace(/<\/?div>/g, "")
                }
                if (CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR) { CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>"));
                    b.indexOf("<br><br>") > -1 && (b = "<p>" + b.replace(/(<br>){2,}/g, function(a) { return c(a.length / 4) }) + "</p>") }
                return j(a, b)
            }

            function d() {
                function a() { var b = {},
                        c; for (c in CKEDITOR.dtd) c.charAt(0) != "$" && (c != "div" && c != "span") && (b[c] = 1); return b }
                var b, c;
                return { get: function(d) { if (d == "plain-text") return b || (b = new CKEDITOR.filter("br")); if (d == "semantic-content") { if (!(d = c)) { d = new CKEDITOR.filter;
                                d.allow({ $1: { elements: a(), attributes: true, styles: false, classes: false } });
                                d = c = d } return d } return d ? new CKEDITOR.filter(d) : null } }
            }

            function i(a, b, c) { var b = CKEDITOR.htmlParser.fragment.fromHtml(b),
                    d = new CKEDITOR.htmlParser.basicWriter;
                c.applyTo(b, true, false, a.activeEnterMode);
                b.writeHtml(d); return d.getHtml() }

            function j(a, b) {
                a.enterMode == CKEDITOR.ENTER_BR ?
                    b = b.replace(/(<\/p><p>)+/g, function(a) { return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
                return b
            }

            function f(a) { a.data.preventDefault();
                a.data.$.dataTransfer.dropEffect = "none" }

            function h(b) {
                var c = CKEDITOR.plugins.clipboard;
                b.on("contentDom", function() {
                    function d(c, e, f) {
                        e.select();
                        a(b, { dataTransfer: f, method: "drop" }, 1);
                        f.sourceEditor.fire("saveSnapshot");
                        f.sourceEditor.editable().extractHtmlFromRange(c);
                        f.sourceEditor.getSelection().selectRanges([c]);
                        f.sourceEditor.fire("saveSnapshot")
                    }

                    function e(d, f) { d.select();
                        a(b, { dataTransfer: f, method: "drop" }, 1);
                        c.resetDragDataTransfer() }

                    function f(a, c, d) { var e = { $: a.data.$, target: a.data.getTarget() }; if (c) e.dragRange = c; if (d) e.dropRange = d;
                        b.fire(a.name, e) === false && a.data.preventDefault() }

                    function h(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() }
                    var i = b.editable(),
                        j = CKEDITOR.plugins.clipboard.getDropTarget(b),
                        k = b.ui.space("top"),
                        w = b.ui.space("bottom");
                    c.preventDefaultDropOnElement(k);
                    c.preventDefaultDropOnElement(w);
                    i.attachListener(j, "dragstart", f);
                    i.attachListener(b, "dragstart", c.resetDragDataTransfer, c, null, 1);
                    i.attachListener(b, "dragstart", function(a) { c.initDragDataTransfer(a, b);
                        a = c.dragRange = b.getSelection().getRanges()[0]; if (CKEDITOR.env.ie && CKEDITOR.env.version < 10) { c.dragStartContainerChildCount = a ? h(a.startContainer) : null;
                            c.dragEndContainerChildCount = a ? h(a.endContainer) : null } }, null, null, 2);
                    i.attachListener(j, "dragend", f);
                    i.attachListener(b, "dragend", c.initDragDataTransfer,
                        c, null, 1);
                    i.attachListener(b, "dragend", c.resetDragDataTransfer, c, null, 100);
                    i.attachListener(j, "dragover", function(a) { var b = a.data.getTarget();
                        b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && (CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files")) && a.data.preventDefault() });
                    i.attachListener(j, "drop", function(a) {
                        a.data.preventDefault();
                        var d = a.data.getTarget();
                        if (!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) {
                            var d = c.getRangeAtDropPosition(a,
                                    b),
                                e = c.dragRange;
                            d && f(a, e, d)
                        }
                    });
                    i.attachListener(b, "drop", c.initDragDataTransfer, c, null, 1);
                    i.attachListener(b, "drop", function(a) { if (a = a.data) { var f = a.dropRange,
                                h = a.dragRange,
                                i = a.dataTransfer;
                            i.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function() { c.internalDrop(h, f, i, b) }, 0) : i.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(h, f, i) : e(f, i) } }, null, null, 9999)
                })
            }
            CKEDITOR.plugins.add("clipboard", {
                requires: "dialog",
                init: function(a) {
                    var f, j = d();
                    a.config.forcePasteAsPlainText ?
                        f = "plain-text" : a.config.pasteFilter ? f = a.config.pasteFilter : CKEDITOR.env.webkit && !("pasteFilter" in a.config) && (f = "semantic-content");
                    a.pasteFilter = j.get(f);
                    e(a);
                    h(a);
                    CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                    a.on("paste", function(b) {
                        if (!b.data.dataTransfer) b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer;
                        if (!b.data.dataValue) {
                            var c = b.data.dataTransfer,
                                d = c.getData("text/html");
                            if (d) { b.data.dataValue = d;
                                b.data.type = "html" } else if (d = c.getData("text/plain")) {
                                b.data.dataValue =
                                    a.editable().transformPlainTextToHtml(d);
                                b.data.type = "text"
                            }
                        }
                    }, null, null, 1);
                    a.on("paste", function(a) {
                        var b = a.data.dataValue,
                            c = CKEDITOR.dtd.$block;
                        if (b.indexOf("Apple-") > -1) {
                            b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " ");
                            a.data.type != "html" && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) { return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;") }));
                            if (b.indexOf('<br class="Apple-interchange-newline">') > -1) {
                                a.data.startsWithEOL = 1;
                                a.data.preSniffing = "html";
                                b = b.replace(/<br class="Apple-interchange-newline">/, "")
                            }
                            b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
                        }
                        if (b.match(/^<[^<]+cke_(editable|contents)/i)) { var d, e, f = new CKEDITOR.dom.element("div"); for (f.setHtml(b); f.getChildCount() == 1 && (d = f.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));) f = e = d;
                            e && (b = e.getHtml().replace(/<br>$/i, "")) } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
                            if (d.toLowerCase() in c) {
                                a.data.preSniffing =
                                    "html";
                                return "<" + d
                            }
                            return b
                        }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) { if (d in c) { a.data.endsWithEOL = 1; return "</" + d + ">" } return b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                        a.data.dataValue = b
                    }, null, null, 3);
                    a.on("paste", function(d) {
                        var d = d.data,
                            e = d.type,
                            f = d.dataValue,
                            h, k = a.config.clipboard_defaultContentType || "html",
                            t = d.dataTransfer.getTransferType(a);
                        h = e == "html" || d.preSniffing == "html" ? "html" : b(f);
                        h == "htmlifiedtext" && (f = c(a.config, f));
                        e == "text" && h == "html" ?
                            f = i(a, f, j.get("plain-text")) : t == CKEDITOR.DATA_TRANSFER_EXTERNAL && (a.pasteFilter && !d.dontFilter) && (f = i(a, f, a.pasteFilter));
                        d.startsWithEOL && (f = '<br data-cke-eol="1">' + f);
                        d.endsWithEOL && (f = f + '<br data-cke-eol="1">');
                        e == "auto" && (e = h == "html" || k == "html" ? "html" : "text");
                        d.type = e;
                        d.dataValue = f;
                        delete d.preSniffing;
                        delete d.startsWithEOL;
                        delete d.endsWithEOL
                    }, null, null, 6);
                    a.on("paste", function(b) {
                        b = b.data;
                        if (b.dataValue) {
                            a.insertHtml(b.dataValue, b.type, b.range);
                            setTimeout(function() { a.fire("afterPaste") },
                                0)
                        }
                    }, null, null, 1E3);
                    a.on("pasteDialog", function(b) { setTimeout(function() { a.openDialog("paste", b.data) }, 0) })
                }
            });
            CKEDITOR.plugins.clipboard = {
                isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
                isCustomDataTypesSupported: !CKEDITOR.env.ie,
                isFileApiSupported: !CKEDITOR.env.ie || CKEDITOR.env.version > 9,
                mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
                canClipboardApiBeTrusted: function(a, b) {
                    return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() ||
                        CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) ? true : false
                },
                getDropTarget: function(a) { var b = a.editable(); return CKEDITOR.env.ie && CKEDITOR.env.version < 9 || b.isInline() ? b : a.document },
                fixSplitNodesAfterDrop: function(a, b, c, d) {
                    function e(a, c, d) {
                        var f = a;
                        f.type == CKEDITOR.NODE_TEXT && (f = a.getParent());
                        if (f.equals(c) && d != c.getChildCount()) {
                            a = b;
                            c = a.startContainer.getChild(a.startOffset - 1);
                            d = a.startContainer.getChild(a.startOffset);
                            if (c && c.type == CKEDITOR.NODE_TEXT && d && d.type == CKEDITOR.NODE_TEXT) {
                                f =
                                    c.getLength();
                                c.setText(c.getText() + d.getText());
                                d.remove();
                                a.setStart(c, f);
                                a.collapse(true)
                            }
                            return true
                        }
                    }
                    var f = b.startContainer;
                    !(typeof d != "number" || typeof c != "number") && (f.type == CKEDITOR.NODE_ELEMENT && !e(a.startContainer, f, c)) && e(a.endContainer, f, d)
                },
                isDropRangeAffectedByDragRange: function(a, b) {
                    var c = b.startContainer,
                        d = b.endOffset;
                    return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() <
                        d ? true : false
                },
                internalDrop: function(b, c, d, e) {
                    var f = CKEDITOR.plugins.clipboard,
                        h = e.editable(),
                        i, j;
                    e.fire("saveSnapshot");
                    e.fire("lockSnapshot", { dontUpdate: 1 });
                    CKEDITOR.env.ie && CKEDITOR.env.version < 10 && this.fixSplitNodesAfterDrop(b, c, f.dragStartContainerChildCount, f.dragEndContainerChildCount);
                    (j = this.isDropRangeAffectedByDragRange(b, c)) || (i = b.createBookmark(false));
                    f = c.clone().createBookmark(false);
                    j && (i = b.createBookmark(false));
                    b = i.startNode;
                    j = i.endNode;
                    var k = f.startNode;
                    if (j && b.getPosition(k) == CKEDITOR.POSITION_PRECEDING &&
                        j.getPosition(k) == CKEDITOR.POSITION_FOLLOWING) { e.getSelection().selectRanges([c]);
                        b.remove();
                        j.remove();
                        k.remove() } else { b = e.createRange();
                        b.moveToBookmark(i);
                        h.extractHtmlFromRange(b, 1);
                        c = e.createRange();
                        c.moveToBookmark(f);
                        a(e, { dataTransfer: d, method: "drop", range: c }, 1) } e.fire("unlockSnapshot")
                },
                getRangeAtDropPosition: function(a, b) {
                    var c = a.data.$,
                        d = c.clientX,
                        e = c.clientY,
                        f = b.getSelection(true).getRanges()[0],
                        h = b.createRange();
                    if (a.data.testRange) return a.data.testRange;
                    if (document.caretRangeFromPoint) {
                        c =
                            b.document.$.caretRangeFromPoint(d, e);
                        h.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset);
                        h.collapse(true)
                    } else if (c.rangeParent) { h.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset);
                        h.collapse(true) } else {
                        if (CKEDITOR.env.ie && CKEDITOR.env.version > 8 && f && b.editable().hasFocus) return f;
                        if (document.body.createTextRange) {
                            b.focus();
                            c = b.document.getBody().$.createTextRange();
                            try {
                                for (var i = false, j = 0; j < 20 && !i; j++) {
                                    if (!i) try { c.moveToPoint(d, e - j);
                                        i = true } catch (k) {}
                                    if (!i) try {
                                        c.moveToPoint(d, e + j);
                                        i = true
                                    } catch (v) {}
                                }
                                if (i) { var x = "cke-temp-" + (new Date).getTime();
                                    c.pasteHTML('<span id="' + x + '">​</span>'); var u = b.document.getById(x);
                                    h.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START);
                                    u.remove() } else {
                                    var r = b.document.$.elementFromPoint(d, e),
                                        y = new CKEDITOR.dom.element(r),
                                        z;
                                    if (!y.equals(b.editable()) && y.getName() != "html") { z = y.getClientRect();
                                        d < z.left ? h.setStartAt(y, CKEDITOR.POSITION_AFTER_START) : h.setStartAt(y, CKEDITOR.POSITION_BEFORE_END);
                                        h.collapse(true) } else return f && f.startContainer && !f.startContainer.equals(b.editable()) ?
                                        f : null
                                }
                            } catch (B) { return null }
                        } else return null
                    }
                    return h
                },
                initDragDataTransfer: function(a, b) { var c = a.data.$ ? a.data.$.dataTransfer : null,
                        d = new this.dataTransfer(c, b);
                    c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d;
                    a.data.dataTransfer = d },
                resetDragDataTransfer: function() { this.dragData = null },
                initPasteDataTransfer: function(a, b) {
                    if (this.isCustomCopyCutSupported && a && a.data && a.data.$) {
                        var c = new this.dataTransfer(a.data.$.clipboardData, b);
                        if (this.copyCutData && c.id == this.copyCutData.id) { c = this.copyCutData;
                            c.$ = a.data.$.clipboardData } else this.copyCutData = c;
                        return c
                    }
                    return new this.dataTransfer(null, b)
                },
                preventDefaultDropOnElement: function(a) { a && a.on("dragover", f) }
            };
            var k = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
            CKEDITOR.plugins.clipboard.dataTransfer = function(a, b) {
                if (a) this.$ = a;
                this._ = {
                    metaRegExp: /^<meta.*?>/,
                    bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/,
                    fragmentRegExp: /<\!--(?:Start|End)Fragment--\>/g,
                    data: {},
                    files: [],
                    normalizeType: function(a) { a = a.toLowerCase(); return a == "text" || a == "text/plain" ? "Text" : a == "url" ? "URL" : a }
                };
                this.id = this.getData(k);
                if (!this.id) this.id = k == "Text" ? "" : "cke-" + CKEDITOR.tools.getUniqueId();
                if (k != "Text") try { this.$.setData(k, this.id) } catch (c) {}
                if (b) { this.sourceEditor = b;
                    this.setData("text/html", b.getSelectedHtml(1));
                    k != "Text" && !this.getData("text/plain") && this.setData("text/plain", b.getSelection().getSelectedText()) }
            };
            CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
            CKEDITOR.DATA_TRANSFER_CROSS_EDITORS =
                2;
            CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
            CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function(a) { var a = this._.normalizeType(a),
                        b = this._.data[a]; if (b === void 0 || b === null || b === "") try { b = this.$.getData(a) } catch (c) {}
                    if (b === void 0 || b === null || b === "") b = ""; if (a == "text/html") { b = b.replace(this._.metaRegExp, ""); if ((a = this._.bodyRegExp.exec(b)) && a.length) { b = a[1];
                            b = b.replace(this._.fragmentRegExp, "") } } else a == "Text" && (CKEDITOR.env.gecko && this.getFilesCount() && b.substring(0, 7) == "file://") && (b = ""); return b },
                setData: function(a, b) { a = this._.normalizeType(a);
                    this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || !(a != "URL" && a != "Text")) { if (k == "Text" && a == "Text") this.id = b; try { this.$.setData(a, b) } catch (c) {} } },
                getTransferType: function(a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL },
                cacheData: function() {
                    function a(c) { var c = b._.normalizeType(c),
                            d = b.getData(c);
                        d && (b._.data[c] = d) }
                    if (this.$) {
                        var b =
                            this,
                            c, d;
                        if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types)
                                for (c = 0; c < this.$.types.length; c++) a(this.$.types[c]) } else { a("Text");
                            a("URL") } d = this._getImageFromClipboard();
                        if (this.$ && this.$.files || d) { this._.files = []; for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
                            this._.files.length === 0 && d && this._.files.push(d) }
                    }
                },
                getFilesCount: function() {
                    return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ?
                        1 : 0
                },
                getFile: function(a) { return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : a === 0 ? this._getImageFromClipboard() : void 0 },
                isEmpty: function() {
                    var a = {},
                        b;
                    if (this.getFilesCount()) return false;
                    for (b in this._.data) a[b] = 1;
                    if (this.$)
                        if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types)
                                for (var c = 0; c < this.$.types.length; c++) a[this.$.types[c]] = 1 } else { a.Text = 1;
                            a.URL = 1 }
                    k != "Text" && (a[k] = 0);
                    for (b in a)
                        if (a[b] && this.getData(b) !== "") return false;
                    return true
                },
                _getImageFromClipboard: function() { var a; if (this.$ && this.$.items && this.$.items[0]) try { if ((a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) {} }
            }
        }(),
        function() {
            var a = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
            CKEDITOR.env.gecko &&
                CKEDITOR.env.mac && (a = a + ' onkeypress="return false;"');
            CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
            var a = a + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),
                a = a + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>',
                e = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"),
                b = CKEDITOR.addTemplate("button", a);
            CKEDITOR.plugins.add("button", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } });
            CKEDITOR.UI_BUTTON = "button";
            CKEDITOR.ui.button = function(a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function(b) { b.execCommand(a.command) } });
                this._ = {} };
            CKEDITOR.ui.button.handler = { create: function(a) { return new CKEDITOR.ui.button(a) } };
            CKEDITOR.ui.button.prototype = {
                render: function(a, d) {
                    function i() { var b = a.mode; if (b) { b = this.modes[b] ? n[b] !== void 0 ? n[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                            b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b;
                            this.setState(b);
                            this.refresh && this.refresh() } }
                    var j = CKEDITOR.env,
                        f = this._.id = CKEDITOR.tools.getNextId(),
                        h = "",
                        k = this.command,
                        g;
                    this._.editor = a;
                    var m = { id: f, button: this, editor: a, focus: function() { CKEDITOR.document.getById(f).focus() }, execute: function() { this.button.click(a) }, attach: function(a) { this.button.attach(a) } },
                        p = CKEDITOR.tools.addFunction(function(a) { if (m.onkey) { a = new CKEDITOR.dom.event(a); return m.onkey(m, a.getKeystroke()) !== false } }),
                        q = CKEDITOR.tools.addFunction(function(a) { var b;
                            m.onfocus && (b = m.onfocus(m, new CKEDITOR.dom.event(a)) !== false); return b }),
                        o = 0;
                    m.clickFn = g = CKEDITOR.tools.addFunction(function() { if (o) { a.unlockSelection(1);
                            o = 0 } m.execute();
                        j.iOS && a.focus() });
                    if (this.modes) {
                        var n = {};
                        a.on("beforeModeUnload", function() { if (a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED) n[a.mode] = this._.state }, this);
                        a.on("activeFilterChange", i, this);
                        a.on("mode", i, this);
                        !this.readOnly && a.on("readOnly", i, this)
                    } else if (k)
                        if (k = a.getCommand(k)) { k.on("state", function() { this.setState(k.state) }, this);
                            h = h + (k.state == CKEDITOR.TRISTATE_ON ? "on" : k.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off") }
                    if (this.directional) a.on("contentDirChanged", function(b) {
                        var d = CKEDITOR.document.getById(this._.id),
                            e = d.getFirst(),
                            b = b.data;
                        b != a.lang.dir ? d.addClass("cke_" + b) : d.removeClass("cke_ltr").removeClass("cke_rtl");
                        e.setAttribute("style",
                            CKEDITOR.skin.getIconStyle(s, b == "rtl", this.icon, this.iconOffset))
                    }, this);
                    k || (h = h + "off");
                    var l = this.name || this.command,
                        s = l;
                    if (this.icon && !/\./.test(this.icon)) { s = this.icon;
                        this.icon = null } h = {
                        id: f,
                        name: l,
                        iconName: s,
                        label: this.label,
                        cls: this.className || "",
                        state: h,
                        ariaDisabled: h == "disabled" ? "true" : "false",
                        title: this.title,
                        titleJs: j.gecko && !j.hc ? "" : (this.title || "").replace("'", ""),
                        hasArrow: this.hasArrow ? "true" : "false",
                        keydownFn: p,
                        focusFn: q,
                        clickFn: g,
                        style: CKEDITOR.skin.getIconStyle(s, a.lang.dir == "rtl",
                            this.icon, this.iconOffset),
                        arrowHtml: this.hasArrow ? e.output() : ""
                    };
                    b.output(h, d);
                    if (this.onRender) this.onRender();
                    return m
                },
                setState: function(a) {
                    if (this._.state == a) return false;
                    this._.state = a;
                    var b = CKEDITOR.document.getById(this._.id);
                    if (b) {
                        b.setState(a, "cke_button");
                        a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", true) : b.removeAttribute("aria-disabled");
                        if (this.hasArrow) {
                            a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label;
                            CKEDITOR.document.getById(this._.id +
                                "_label").setText(a)
                        } else a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", true) : b.removeAttribute("aria-pressed");
                        return true
                    }
                    return false
                },
                getState: function() { return this._.state },
                toFeature: function(a) { if (this._.feature) return this._.feature; var b = this;!this.allowedContent && (!this.requiredContent && this.command) && (b = a.getCommand(this.command) || b); return this._.feature = b }
            };
            CKEDITOR.ui.prototype.addButton = function(a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
        }(), CKEDITOR.plugins.add("panelbutton", {
            requires: "button",
            onLoad: function() {
                function a(a) { var b = this._; if (b.state != CKEDITOR.TRISTATE_DISABLED) { this.createPanel(a);
                        b.on ? b.panel.hide() : b.panel.showBlock(this._.id, this.document.getById(this._.id), 4) } } CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button,
                    $: function(e) { var b = e.panel || {};
                        delete e.panel;
                        this.base(e);
                        this.document = b.parent && b.parent.getDocument() || CKEDITOR.document;
                        b.block = { attributes: b.attributes };
                        this.hasArrow = b.toolbarRelated = true;
                        this.click = a;
                        this._ = { panelDefinition: b } },
                    statics: { handler: { create: function(a) { return new CKEDITOR.ui.panelButton(a) } } },
                    proto: {
                        createPanel: function(a) {
                            var b = this._;
                            if (!b.panel) {
                                var c = this._.panelDefinition,
                                    d = this._.panelDefinition.block,
                                    i = c.parent || CKEDITOR.document.getBody(),
                                    j = this._.panel = new CKEDITOR.ui.floatPanel(a, i, c),
                                    c = j.addBlock(b.id, d),
                                    f = this;
                                j.onShow = function() { f.className && this.element.addClass(f.className + "_panel");
                                    f.setState(CKEDITOR.TRISTATE_ON);
                                    b.on = 1;
                                    f.editorFocus && a.focus(); if (f.onOpen) f.onOpen() };
                                j.onHide = function(c) {
                                    f.className &&
                                        this.element.getFirst().removeClass(f.className + "_panel");
                                    f.setState(f.modes && f.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                    b.on = 0;
                                    if (!c && f.onClose) f.onClose()
                                };
                                j.onEscape = function() { j.hide(1);
                                    f.document.getById(b.id).focus() };
                                if (this.onBlock) this.onBlock(j, c);
                                c.onHide = function() { b.on = 0;
                                    f.setState(CKEDITOR.TRISTATE_OFF) }
                            }
                        }
                    }
                })
            },
            beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
        }), CKEDITOR.UI_PANELBUTTON = "panelbutton",
        function() {
            CKEDITOR.plugins.add("panel", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } });
            CKEDITOR.UI_PANEL = "panel";
            CKEDITOR.ui.panel = function(a, b) { b && CKEDITOR.tools.extend(this, b);
                CKEDITOR.tools.extend(this, { className: "", css: [] });
                this.id = CKEDITOR.tools.getNextId();
                this.document = a;
                this.isFramed = this.forceIFrame || this.css.length;
                this._ = { blocks: {} } };
            CKEDITOR.ui.panel.handler = { create: function(a) { return new CKEDITOR.ui.panel(a) } };
            var a = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
                e = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'),
                b = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
            CKEDITOR.ui.panel.prototype = {
                render: function(c, d) {
                    this.getHolderElement = function() {
                        var a = this._.holder;
                        if (!a) {
                            if (this.isFramed) {
                                var a =
                                    this.document.getById(this.id + "_frame"),
                                    c = a.getParent(),
                                    a = a.getFrameDocument();
                                CKEDITOR.env.iOS && c.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" });
                                c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() { this.isLoaded = true; if (this.onLoad) this.onLoad() }, this));
                                a.write(b.output(CKEDITOR.tools.extend({ css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" + c + ");" }, i)));
                                a.getWindow().$.CKEDITOR = CKEDITOR;
                                a.on("keydown", function(a) {
                                    var b = a.data.getKeystroke(),
                                        c = this.document.getById(this.id).getAttribute("dir");
                                    this._.onKeyDown && this._.onKeyDown(b) === false ? a.data.preventDefault() : (b == 27 || b == (c == "rtl" ? 39 : 37)) && this.onEscape && this.onEscape(b) === false && a.data.preventDefault()
                                }, this);
                                a = a.getBody();
                                a.unselectable();
                                CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
                            } else a = this.document.getById(this.id);
                            this._.holder = a
                        }
                        return a
                    };
                    var i = {
                        editorId: c.id,
                        id: this.id,
                        langCode: c.langCode,
                        dir: c.lang.dir,
                        cls: this.className,
                        frame: "",
                        env: CKEDITOR.env.cssClass,
                        "z-index": c.config.baseFloatZIndex +
                            1
                    };
                    if (this.isFramed) { var j = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                        i.frame = e.output({ id: this.id + "_frame", src: j }) } j = a.output(i);
                    d && d.push(j);
                    return j
                },
                addBlock: function(a, b) { b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
                    this._.currentBlock || this.showBlock(a); return b },
                getBlock: function(a) { return this._.blocks[a] },
                showBlock: function(a) { var a = this._.blocks[a],
                        b = this._.currentBlock,
                        e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                    b && b.hide();
                    this._.currentBlock = a;
                    CKEDITOR.fire("ariaWidget", e);
                    a._.focusIndex = -1;
                    this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                    a.show(); return a },
                destroy: function() { this.element && this.element.remove() }
            };
            CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                $: function(a, b) {
                    this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } }));
                    b && CKEDITOR.tools.extend(this, b);
                    this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] });
                    this.keys = {};
                    this._.focusIndex = -1;
                    this.element.disableContextMenu()
                },
                _: {
                    markItem: function(a) {
                        if (a != -1) {
                            a = this.element.getElementsByTag("a").getItem(this._.focusIndex = a);
                            CKEDITOR.env.webkit && a.getDocument().getWindow().focus();
                            a.focus();
                            this.onMark && this.onMark(a)
                        }
                    }
                },
                proto: {
                    show: function() { this.element.setStyle("display", "") },
                    hide: function() {
                        (!this.onHide || this.onHide.call(this) !== true) && this.element.setStyle("display", "none") },
                    onKeyDown: function(a, b) {
                        var e = this.keys[a];
                        switch (e) {
                            case "next":
                                for (var j = this._.focusIndex, e = this.element.getElementsByTag("a"), f; f = e.getItem(++j);)
                                    if (f.getAttribute("_cke_focus") && f.$.offsetWidth) { this._.focusIndex = j;
                                        f.focus(); break }
                                if (!f && !b) { this._.focusIndex = -1; return this.onKeyDown(a, 1) }
                                return false;
                            case "prev":
                                j = this._.focusIndex;
                                for (e = this.element.getElementsByTag("a"); j > 0 && (f = e.getItem(--j));) { if (f.getAttribute("_cke_focus") && f.$.offsetWidth) { this._.focusIndex = j;
                                        f.focus(); break } f = null }
                                if (!f && !b) { this._.focusIndex = e.count(); return this.onKeyDown(a, 1) }
                                return false;
                            case "click":
                            case "mouseup":
                                j = this._.focusIndex;
                                (f = j >= 0 && this.element.getElementsByTag("a").getItem(j)) && (f.$[e] ? f.$[e]() : f.$["on" + e]());
                                return false
                        }
                        return true
                    }
                }
            })
        }(), CKEDITOR.plugins.add("floatpanel", { requires: "panel" }),
        function() {
            function a(a,
                c, d, i, j) { var j = CKEDITOR.tools.genKey(c.getUniqueId(), d.getUniqueId(), a.lang.dir, a.uiColor || "", i.css || "", j || ""),
                    f = e[j]; if (!f) { f = e[j] = new CKEDITOR.ui.panel(c, i);
                    f.element = d.append(CKEDITOR.dom.element.createFromHtml(f.render(a), c));
                    f.element.setStyles({ display: "none", position: "absolute" }) } return f }
            var e = {};
            CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                $: function(b, c, d, e) {
                    function j() { g.hide() } d.forceIFrame = 1;
                    d.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (c = CKEDITOR.document.getById("cke_" +
                        b.name));
                    var f = c.getDocument(),
                        e = a(b, f, c, d, e || 0),
                        h = e.element,
                        k = h.getFirst(),
                        g = this;
                    h.disableContextMenu();
                    this.element = h;
                    this._ = { editor: b, panel: e, parentElement: c, definition: d, document: f, iframe: k, children: [], dir: b.lang.dir };
                    b.on("mode", j);
                    b.on("resize", j);
                    if (!CKEDITOR.env.iOS) f.getWindow().on("resize", j)
                },
                proto: {
                    addBlock: function(a, c) { return this._.panel.addBlock(a, c) },
                    addListBlock: function(a, c) { return this._.panel.addListBlock(a, c) },
                    getBlock: function(a) { return this._.panel.getBlock(a) },
                    showBlock: function(a,
                        c, d, e, j, f) {
                        var h = this._.panel,
                            k = h.showBlock(a);
                        this.allowBlur(false);
                        a = this._.editor.editable();
                        this._.returnFocus = a.hasFocus ? a : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                        this._.hideTimeout = 0;
                        var g = this.element,
                            a = this._.iframe,
                            a = CKEDITOR.env.ie && !CKEDITOR.env.edge ? a : new CKEDITOR.dom.window(a.$.contentWindow),
                            m = g.getDocument(),
                            p = this._.parentElement.getPositionedAncestor(),
                            q = c.getDocumentPosition(m),
                            m = p ? p.getDocumentPosition(m) : { x: 0, y: 0 },
                            o = this._.dir == "rtl",
                            n = q.x + (e || 0) - m.x,
                            l = q.y +
                            (j || 0) - m.y;
                        if (o && (d == 1 || d == 4)) n = n + c.$.offsetWidth;
                        else if (!o && (d == 2 || d == 3)) n = n + (c.$.offsetWidth - 1);
                        if (d == 3 || d == 4) l = l + (c.$.offsetHeight - 1);
                        this._.panel._.offsetParentId = c.getId();
                        g.setStyles({ top: l + "px", left: 0, display: "" });
                        g.setOpacity(0);
                        g.getFirst().removeStyle("width");
                        this._.editor.focusManager.add(a);
                        if (!this._.blurSet) {
                            CKEDITOR.event.useCapture = true;
                            a.on("blur", function(a) {
                                function b() { delete this._.returnFocus;
                                    this.hide() }
                                if (this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET &&
                                    this.visible && !this._.activeChild)
                                    if (CKEDITOR.env.iOS) { if (!this._.hideTimeout) this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this) } else b.call(this)
                            }, this);
                            a.on("focus", function() { this._.focused = true;
                                this.hideChild();
                                this.allowBlur(true) }, this);
                            if (CKEDITOR.env.iOS) { a.on("touchstart", function() { clearTimeout(this._.hideTimeout) }, this);
                                a.on("touchend", function() { this._.hideTimeout = 0;
                                    this.focus() }, this) } CKEDITOR.event.useCapture = false;
                            this._.blurSet = 1
                        }
                        h.onEscape = CKEDITOR.tools.bind(function(a) {
                            if (this.onEscape &&
                                this.onEscape(a) === false) return false
                        }, this);
                        CKEDITOR.tools.setTimeout(function() {
                            var a = CKEDITOR.tools.bind(function() {
                                g.removeStyle("width");
                                if (k.autoSize) {
                                    var a = k.element.getDocument(),
                                        a = (CKEDITOR.env.webkit ? k.element : a.getBody()).$.scrollWidth;
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((g.$.offsetWidth || 0) - (g.$.clientWidth || 0) + 3));
                                    g.setStyle("width", a + 10 + "px");
                                    a = k.element.$.scrollHeight;
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((g.$.offsetHeight || 0) - (g.$.clientHeight || 0) + 3));
                                    g.setStyle("height",
                                        a + "px");
                                    h._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                } else g.removeStyle("height");
                                o && (n = n - g.$.offsetWidth);
                                g.setStyle("left", n + "px");
                                var b = h.element.getWindow(),
                                    a = g.$.getBoundingClientRect(),
                                    b = b.getViewPaneSize(),
                                    c = a.width || a.right - a.left,
                                    d = a.height || a.bottom - a.top,
                                    e = o ? a.right : b.width - a.left,
                                    i = o ? b.width - a.right : a.left;
                                o ? e < c && (n = i > c ? n + c : b.width > c ? n - a.left : n - a.right + b.width) : e < c && (n = i > c ? n - c : b.width > c ? n - a.right + b.width : n - a.left);
                                c = a.top;
                                b.height - a.top < d && (l = c > d ? l - d : b.height >
                                    d ? l - a.bottom + b.height : l - a.top);
                                if (CKEDITOR.env.ie) { b = a = new CKEDITOR.dom.element(g.$.offsetParent);
                                    b.getName() == "html" && (b = b.getDocument().getBody());
                                    b.getComputedStyle("direction") == "rtl" && (n = CKEDITOR.env.ie8Compat ? n - g.getDocument().getDocumentElement().$.scrollLeft * 2 : n - (a.$.scrollWidth - a.$.clientWidth)) }
                                var a = g.getFirst(),
                                    j;
                                (j = a.getCustomData("activePanel")) && j.onHide && j.onHide.call(this, 1);
                                a.setCustomData("activePanel", this);
                                g.setStyles({ top: l + "px", left: n + "px" });
                                g.setOpacity(1);
                                f && f()
                            }, this);
                            h.isLoaded ?
                                a() : h.onLoad = a;
                            CKEDITOR.tools.setTimeout(function() { var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                                this.focus();
                                k.element.focus(); if (CKEDITOR.env.webkit) CKEDITOR.document.getBody().$.scrollTop = a;
                                this.allowBlur(true);
                                this._.editor.fire("panelShow", this) }, 0, this)
                        }, CKEDITOR.env.air ? 200 : 0, this);
                        this.visible = 1;
                        this.onShow && this.onShow.call(this)
                    },
                    focus: function() {
                        if (CKEDITOR.env.webkit) { var a = CKEDITOR.document.getActive();
                            a && !a.equals(this._.iframe) && a.$.blur() }(this._.lastFocused ||
                            this._.iframe.getFrameDocument().getWindow()).focus()
                    },
                    blur: function() { var a = this._.iframe.getFrameDocument().getActive();
                        a && a.is("a") && (this._.lastFocused = a) },
                    hide: function(a) {
                        if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                            this.hideChild();
                            CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
                            this.element.setStyle("display", "none");
                            this.visible = 0;
                            this.element.getFirst().removeCustomData("activePanel");
                            if (a = a && this._.returnFocus) {
                                CKEDITOR.env.webkit && a.type &&
                                    a.getWindow().$.focus();
                                a.focus()
                            }
                            delete this._.lastFocused;
                            this._.editor.fire("panelHide", this)
                        }
                    },
                    allowBlur: function(a) { var c = this._.panel; if (a !== void 0) c.allowBlur = a; return c.allowBlur },
                    showAsChild: function(a, c, d, e, j, f) {
                        if (!(this._.activeChild == a && a._.panel._.offsetParentId == d.getId())) {
                            this.hideChild();
                            a.onHide = CKEDITOR.tools.bind(function() { CKEDITOR.tools.setTimeout(function() { this._.focused || this.hide() }, 0, this) }, this);
                            this._.activeChild = a;
                            this._.focused = false;
                            a.showBlock(c, d, e, j, f);
                            this.blur();
                            (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() { a.element.getChild(0).$.style.cssText += "" }, 100)
                        }
                    },
                    hideChild: function(a) { var c = this._.activeChild; if (c) { delete c.onHide;
                            delete this._.activeChild;
                            c.hide();
                            a && this.focus() } }
                }
            });
            CKEDITOR.on("instanceDestroyed", function() { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
                    c; for (c in e) { var d = e[c];
                    a ? d.destroy() : d.element.hide() } a && (e = {}) })
        }(), CKEDITOR.plugins.add("colorbutton", {
            requires: "panelbutton,floatpanel",
            init: function(a) {
                function e(c,
                    e, h, k) {
                    var g = new CKEDITOR.style(d["colorButton_" + e + "Style"]),
                        m = CKEDITOR.tools.getNextId() + "_colorBox";
                    a.ui.add(c, CKEDITOR.UI_PANELBUTTON, {
                        label: h,
                        title: h,
                        modes: { wysiwyg: 1 },
                        editorFocus: 0,
                        toolbar: "colors," + k,
                        allowedContent: g,
                        requiredContent: g,
                        panel: { css: CKEDITOR.skin.getPath("editor"), attributes: { role: "listbox", "aria-label": i.panelTitle } },
                        onBlock: function(c, d) {
                            d.autoSize = true;
                            d.element.addClass("cke_colorblock");
                            d.element.setHtml(b(c, e, m));
                            d.element.getDocument().getBody().setStyle("overflow", "hidden");
                            CKEDITOR.ui.fire("ready", this);
                            var g = d.keys,
                                h = a.lang.dir == "rtl";
                            g[h ? 37 : 39] = "next";
                            g[40] = "next";
                            g[9] = "next";
                            g[h ? 39 : 37] = "prev";
                            g[38] = "prev";
                            g[CKEDITOR.SHIFT + 9] = "prev";
                            g[32] = "click"
                        },
                        refresh: function() { a.activeFilter.check(g) || this.setState(CKEDITOR.TRISTATE_DISABLED) },
                        onOpen: function() {
                            var b = a.getSelection(),
                                b = b && b.getStartElement(),
                                b = a.elementPath(b),
                                c;
                            if (b) {
                                b = b.block || b.blockLimit || a.document.getBody();
                                do c = b && b.getComputedStyle(e == "back" ? "background-color" : "color") || "transparent"; while (e == "back" &&
                                    c == "transparent" && b && (b = b.getParent()));
                                if (!c || c == "transparent") c = "#ffffff";
                                this._.panel._.iframe.getFrameDocument().getById(m).setStyle("background-color", c);
                                return c
                            }
                        }
                    })
                }

                function b(b, e, h) {
                    var k = [],
                        g = d.colorButton_colors.split(","),
                        m = a.plugins.colordialog && d.colorButton_enableMore !== false,
                        p = g.length + (m ? 2 : 1),
                        q = CKEDITOR.tools.addFunction(function(e, f) {
                            function g(a) {
                                this.removeListener("ok", g);
                                this.removeListener("cancel", g);
                                a.name == "ok" && h(this.getContentElement("picker", "selectedColor").getValue(),
                                    f)
                            }
                            var h = arguments.callee;
                            if (e == "?") a.openDialog("colordialog", function() { this.on("ok", g);
                                this.on("cancel", g) });
                            else { a.focus();
                                b.hide();
                                a.fire("saveSnapshot");
                                a.removeStyle(new CKEDITOR.style(d["colorButton_" + f + "Style"], { color: "inherit" })); if (e) { var i = d["colorButton_" + f + "Style"];
                                    i.childRule = f == "back" ? function(a) { return c(a) } : function(a) { return !(a.is("a") || a.getElementsByTag("a").count()) || c(a) };
                                    a.applyStyle(new CKEDITOR.style(i, { color: e })) } a.fire("saveSnapshot") }
                        });
                    k.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="',
                        i.auto, '" onclick="CKEDITOR.tools.callFunction(', q, ",null,'", e, "');return false;\" href=\"javascript:void('", i.auto, '\')" role="option" aria-posinset="1" aria-setsize="', p, '"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', h, '"></span></td><td colspan=7 align=center>', i.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
                    for (h = 0; h < g.length; h++) {
                        h % 8 === 0 && k.push("</tr><tr>");
                        var o = g[h].split("/"),
                            n = o[0],
                            l = o[1] || n;
                        o[1] || (n = "#" + n.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
                        o = a.lang.colorbutton.colors[l] || l;
                        k.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', o, '" onclick="CKEDITOR.tools.callFunction(', q, ",'", n, "','", e, "'); return false;\" href=\"javascript:void('", o, '\')" role="option" aria-posinset="', h + 2, '" aria-setsize="', p, '"><span class="cke_colorbox" style="background-color:#', l, '"></span></a></td>')
                    }
                    m && k.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="',
                        i.more, '" onclick="CKEDITOR.tools.callFunction(', q, ",'?','", e, "');return false;\" href=\"javascript:void('", i.more, "')\"", ' role="option" aria-posinset="', p, '" aria-setsize="', p, '">', i.more, "</a></td>");
                    k.push("</tr></table>");
                    return k.join("")
                }

                function c(a) { return a.getAttribute("contentEditable") == "false" || a.getAttribute("data-nostyle") }
                var d = a.config,
                    i = a.lang.colorbutton;
                if (!CKEDITOR.env.hc) { e("TextColor", "fore", i.textColorTitle, 10);
                    e("BGColor", "back", i.bgColorTitle, 20) }
            }
        }), CKEDITOR.config.colorButton_colors =
        "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF", CKEDITOR.config.colorButton_foreStyle = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] }, CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } }, CKEDITOR.plugins.colordialog = {
            requires: "dialog",
            init: function(a) {
                var e = new CKEDITOR.dialogCommand("colordialog");
                e.editorFocus = false;
                a.addCommand("colordialog", e);
                CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
                a.getColorFromDialog = function(b, c) {
                    var d = function(a) { this.removeListener("ok", d);
                            this.removeListener("cancel", d);
                            a = a.name == "ok" ? this.getValueOf("picker", "selectedColor") : null;
                            b.call(c, a) },
                        e = function(a) { a.on("ok", d);
                            a.on("cancel", d) };
                    a.execCommand("colordialog");
                    if (a._.storedDialogs && a._.storedDialogs.colordialog) e(a._.storedDialogs.colordialog);
                    else CKEDITOR.on("dialogDefinition", function(a) { if (a.data.name == "colordialog") { var b = a.data.definition;
                            a.removeListener();
                            b.onLoad = CKEDITOR.tools.override(b.onLoad, function(a) { return function() { e(this);
                                    b.onLoad = a;
                                    typeof a == "function" && a.call(this) } }) } })
                }
            }
        }, CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog), CKEDITOR.plugins.add("menu", {
            requires: "floatpanel",
            beforeInit: function(a) {
                for (var e = a.config.menu_groups.split(","), b = a._.menuGroups = {}, c = a._.menuItems = {}, d = 0; d < e.length; d++) b[e[d]] =
                    d + 1;
                a.addMenuGroup = function(a, c) { b[a] = c || 100 };
                a.addMenuItem = function(a, d) { b[d.group] && (c[a] = new CKEDITOR.menuItem(this, a, d)) };
                a.addMenuItems = function(a) { for (var b in a) this.addMenuItem(b, a[b]) };
                a.getMenuItem = function(a) { return c[a] };
                a.removeMenuItem = function(a) { delete c[a] }
            }
        }),
        function() {
            function a(a) { a.sort(function(a, b) { return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0 }) }
            var e = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (e = e + ' onkeypress="return false;"');
            CKEDITOR.env.gecko && (e = e + ' onblur="this.style.cssText = this.style.cssText;"');
            var e = e + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'),
                b = CKEDITOR.addTemplate("menuItem", e + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
                c = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
            CKEDITOR.menu = CKEDITOR.tools.createClass({
                $: function(a, b) { b = this._.definition = b || {};
                    this.id = CKEDITOR.tools.getNextId();
                    this.editor = a;
                    this.items = [];
                    this._.listeners = [];
                    this._.level = b.level || 1; var c = CKEDITOR.tools.extend({}, b.panel, { css: [CKEDITOR.skin.getPath("editor")], level: this._.level - 1, block: {} }),
                        e = c.block.attributes = c.attributes || {};!e.role && (e.role = "menu");
                    this._.panelDefinition = c },
                _: {
                    onShow: function() {
                        var a =
                            this.editor.getSelection(),
                            b = a && a.getStartElement(),
                            c = this.editor.elementPath(),
                            e = this._.listeners;
                        this.removeAll();
                        for (var h = 0; h < e.length; h++) { var k = e[h](b, a, c); if (k)
                                for (var g in k) { var m = this.editor.getMenuItem(g); if (m && (!m.command || this.editor.getCommand(m.command).state)) { m.state = k[g];
                                        this.add(m) } } }
                    },
                    onClick: function(a) { this.hide(); if (a.onClick) a.onClick();
                        else a.command && this.editor.execCommand(a.command) },
                    onEscape: function(a) { var b = this.parent;
                        b ? b._.panel.hideChild(1) : a == 27 && this.hide(1); return false },
                    onHide: function() { this.onHide && this.onHide() },
                    showSubMenu: function(a) {
                        var b = this._.subMenu,
                            c = this.items[a];
                        if (c = c.getItems && c.getItems()) {
                            if (b) b.removeAll();
                            else { b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, true));
                                b.parent = this;
                                b._.onClick = CKEDITOR.tools.bind(this._.onClick, this) }
                            for (var e in c) { var h = this.editor.getMenuItem(e); if (h) { h.state = c[e];
                                    b.add(h) } }
                            var k = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                                ("" + a));
                            setTimeout(function() { b.show(k, 2) }, 0)
                        } else this._.panel.hideChild(1)
                    }
                },
                proto: {
                    add: function(a) { if (!a.order) a.order = this.items.length;
                        this.items.push(a) },
                    removeAll: function() { this.items = [] },
                    show: function(b, c, e, f) {
                        if (!this.parent) { this._.onShow(); if (!this.items.length) return }
                        var c = c || (this.editor.lang.dir == "rtl" ? 2 : 1),
                            h = this.items,
                            k = this.editor,
                            g = this._.panel,
                            m = this._.element;
                        if (!g) {
                            g = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                            g.onEscape = CKEDITOR.tools.bind(function(a) { if (this._.onEscape(a) === false) return false }, this);
                            g.onShow = function() { g._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") };
                            g.onHide = CKEDITOR.tools.bind(function() { this._.onHide && this._.onHide() }, this);
                            m = g.addBlock(this.id, this._.panelDefinition.block);
                            m.autoSize = true;
                            var p = m.keys;
                            p[40] = "next";
                            p[9] = "next";
                            p[38] = "prev";
                            p[CKEDITOR.SHIFT + 9] = "prev";
                            p[k.lang.dir == "rtl" ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                            p[32] = CKEDITOR.env.ie ?
                                "mouseup" : "click";
                            CKEDITOR.env.ie && (p[13] = "mouseup");
                            m = this._.element = m.element;
                            p = m.getDocument();
                            p.getBody().setStyle("overflow", "hidden");
                            p.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                            this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) { clearTimeout(this._.showSubTimeout);
                                this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, k.config.menu_subMenuDelay || 400, this, [a]) }, this);
                            this._.itemOutFn = CKEDITOR.tools.addFunction(function() { clearTimeout(this._.showSubTimeout) },
                                this);
                            this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
                                else if (b.getItems) this._.showSubMenu(a);
                                else this._.onClick(b) }, this)
                        }
                        a(h);
                        for (var p = k.elementPath(), p = ['<div class="cke_menu' + (p && p.direction() != k.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], q = h.length, o = q && h[0].group, n = 0; n < q; n++) {
                            var l = h[n];
                            if (o != l.group) { p.push('<div class="cke_menuseparator" role="separator"></div>');
                                o = l.group } l.render(this,
                                n, p)
                        }
                        p.push("</div>");
                        m.setHtml(p.join(""));
                        CKEDITOR.ui.fire("ready", this);
                        this.parent ? this.parent._.panel.showAsChild(g, this.id, b, c, e, f) : g.showBlock(this.id, b, c, e, f);
                        k.fire("menuShow", [g])
                    },
                    addListener: function(a) { this._.listeners.push(a) },
                    hide: function(a) { this._.onHide && this._.onHide();
                        this._.panel && this._.panel.hide(a) }
                }
            });
            CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                $: function(a, b, c) {
                    CKEDITOR.tools.extend(this, c, { order: 0, className: "cke_menubutton__" + b });
                    this.group = a._.menuGroups[this.group];
                    this.editor = a;
                    this.name = b
                },
                proto: {
                    render: function(a, e, j) {
                        var f = a.id + ("" + e),
                            h = typeof this.state == "undefined" ? CKEDITOR.TRISTATE_OFF : this.state,
                            k = "",
                            g = h == CKEDITOR.TRISTATE_ON ? "on" : h == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                        this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (k = ' aria-checked="' + (h == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                        var m = this.getItems,
                            p = "&#" + (this.editor.lang.dir == "rtl" ? "9668" : "9658") + ";",
                            q = this.name;
                        if (this.icon && !/\./.test(this.icon)) q = this.icon;
                        a = {
                            id: f,
                            name: this.name,
                            iconName: q,
                            label: this.label,
                            cls: this.className || "",
                            state: g,
                            hasPopup: m ? "true" : "false",
                            disabled: h == CKEDITOR.TRISTATE_DISABLED,
                            title: this.label,
                            href: "javascript:void('" + (this.label || "").replace("'") + "')",
                            hoverFn: a._.itemOverFn,
                            moveOutFn: a._.itemOutFn,
                            clickFn: a._.itemClickFn,
                            index: e,
                            iconStyle: CKEDITOR.skin.getIconStyle(q, this.editor.lang.dir == "rtl", q == this.icon ? null : this.icon, this.iconOffset),
                            arrowHtml: m ? c.output({ label: p }) : "",
                            role: this.role ? this.role : "menuitem",
                            ariaChecked: k
                        };
                        b.output(a, j)
                    }
                }
            })
        }(), CKEDITOR.config.menu_groups =
        "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", CKEDITOR.plugins.add("contextmenu", {
            requires: "menu",
            onLoad: function() {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu,
                    $: function(a) { this.base.call(this, a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options } } }) },
                    proto: {
                        addTarget: function(a, e) {
                            a.on("contextmenu", function(a) {
                                var a =
                                    a.data,
                                    c = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
                                if (!e || !c) {
                                    a.preventDefault();
                                    if (CKEDITOR.env.mac && CKEDITOR.env.webkit) { var c = this.editor,
                                            j = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function(a) { return a.hasAttribute("contenteditable") }, true);
                                        j && j.getAttribute("contenteditable") == "false" && c.getSelection().fake(j) }
                                    var j = a.getTarget().getDocument(),
                                        f = a.getTarget().getDocument().getDocumentElement(),
                                        c = !j.equals(CKEDITOR.document),
                                        j = j.getWindow().getScrollPosition(),
                                        h = c ? a.$.clientX : a.$.pageX || j.x + a.$.clientX,
                                        k = c ? a.$.clientY : a.$.pageY || j.y + a.$.clientY;
                                    CKEDITOR.tools.setTimeout(function() { this.open(f, null, h, k) }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this);
                            if (CKEDITOR.env.webkit) { var b, c = function() { b = 0 };
                                a.on("keydown", function(a) { b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey });
                                a.on("keyup", c);
                                a.on("contextmenu", c) }
                        },
                        open: function(a, e, b, c) { this.editor.focus();
                            a = a || CKEDITOR.document.getDocumentElement();
                            this.editor.selectionChange(1);
                            this.show(a, e, b, c) }
                    }
                })
            },
            beforeInit: function(a) {
                var e =
                    a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
                a.on("contentDom", function() { e.addTarget(a.editable(), a.config.browserContextMenuOnCtrl !== false) });
                a.addCommand("contextMenu", { exec: function() { a.contextMenu.open(a.document.getBody()) } });
                a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
                a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        }),
        function() {
            function a(a) { var b = this.att,
                    a = a && a.hasAttribute(b) && a.getAttribute(b) || "";
                a !== void 0 && this.setValue(a) }

            function e() {
                for (var a, b = 0; b < arguments.length; b++)
                    if (arguments[b] instanceof CKEDITOR.dom.element) { a = arguments[b]; break }
                if (a) { var b = this.att,
                        e = this.getValue();
                    e ? a.setAttribute(b, e) : a.removeAttribute(b, e) }
            }
            var b = { id: 1, dir: 1, classes: 1, styles: 1 };
            CKEDITOR.plugins.add("dialogadvtab", {
                requires: "dialog",
                allowedContent: function(a) { a || (a = b); var d = [];
                    a.id && d.push("id");
                    a.dir && d.push("dir"); var e = "";
                    d.length && (e = e + ("[" + d.join(",") + "]"));
                    a.classes && (e = e + "(*)");
                    a.styles && (e = e + "{*}"); return e },
                createAdvancedTab: function(c, d, i) {
                    d || (d = b);
                    var j = c.lang.common,
                        f = {
                            id: "advanced",
                            label: j.advancedTab,
                            title: j.advancedTab,
                            elements: [{ type: "vbox", padding: 1, children: [] }]
                        },
                        h = [];
                    if (d.id || d.dir) { d.id && h.push({ id: "advId", att: "id", type: "text", requiredContent: i ? i + "[id]" : null, label: j.id, setup: a, commit: e });
                        d.dir && h.push({ id: "advLangDir", att: "dir", type: "select", requiredContent: i ? i + "[dir]" : null, label: j.langDir, "default": "", style: "width:100%", items: [
                                [j.notSet, ""],
                                [j.langDirLTR, "ltr"],
                                [j.langDirRTL, "rtl"]
                            ], setup: a, commit: e });
                        f.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(h) }) }
                    if (d.styles ||
                        d.classes) {
                        h = [];
                        d.styles && h.push({
                            id: "advStyles",
                            att: "style",
                            type: "text",
                            requiredContent: i ? i + "{cke-xyz}" : null,
                            label: j.styles,
                            "default": "",
                            validate: CKEDITOR.dialog.validate.inlineStyle(j.invalidInlineStyle),
                            onChange: function() {},
                            getStyle: function(a, b) { var c = this.getValue().match(RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i")); return c ? c[1] : b },
                            updateStyle: function(a, b) {
                                var d = this.getValue(),
                                    e = c.document.createElement("span");
                                e.setAttribute("style", d);
                                e.setStyle(a, b);
                                d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));
                                this.setValue(d, 1)
                            },
                            setup: a,
                            commit: e
                        });
                        d.classes && h.push({ type: "hbox", widths: ["45%", "55%"], children: [{ id: "advCSSClasses", att: "class", type: "text", requiredContent: i ? i + "(cke-xyz)" : null, label: j.cssClasses, "default": "", setup: a, commit: e }] });
                        f.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(h) })
                    }
                    return f
                }
            })
        }(),
        function() {
            CKEDITOR.plugins.add("div", {
                requires: "dialog",
                init: function(a) {
                    if (!a.blockless) {
                        var e = a.lang.div,
                            b = "div(*)";
                        CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") &&
                            (b = b + ";div[dir,id,lang,title]{*}");
                        a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", { allowedContent: b, requiredContent: "div", contextSensitive: true, refresh: function(a, b) { this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }));
                        a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" }));
                        a.addCommand("removediv", {
                            requiredContent: "div",
                            exec: function(a) {
                                function b(d) {
                                    if ((d = CKEDITOR.plugins.div.getSurroundDiv(a,
                                            d)) && !d.data("cke-div-added")) { k.push(d);
                                        d.data("cke-div-added") }
                                }
                                for (var e = a.getSelection(), j = e && e.getRanges(), f, h = e.createBookmarks(), k = [], g = 0; g < j.length; g++) { f = j[g]; if (f.collapsed) b(e.getStartElement());
                                    else { f = new CKEDITOR.dom.walker(f);
                                        f.evaluator = b;
                                        f.lastForward() } }
                                for (g = 0; g < k.length; g++) k[g].remove(true);
                                e.selectBookmarks(h)
                            }
                        });
                        a.ui.addButton && a.ui.addButton("CreateDiv", { label: e.toolbar, command: "creatediv", toolbar: "blocks,50" });
                        if (a.addMenuItems) {
                            a.addMenuItems({
                                editdiv: {
                                    label: e.edit,
                                    command: "editdiv",
                                    group: "div",
                                    order: 1
                                },
                                removediv: { label: e.remove, command: "removediv", group: "div", order: 5 }
                            });
                            a.contextMenu && a.contextMenu.addListener(function(b) { return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } : null })
                        }
                        CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js");
                        CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                    }
                }
            });
            CKEDITOR.plugins.div = {
                getSurroundDiv: function(a, e) {
                    var b = a.elementPath(e);
                    return a.elementPath(b.blockLimit).contains(function(a) {
                        return a.is("div") &&
                            !a.isReadOnly()
                    }, 1)
                }
            }
        }(),
        function() {
            var a;

            function e(c, e) {
                function f(a) { a = m.list[a]; if (a.equals(c.editable()) || a.getAttribute("contenteditable") == "true") { var b = c.createRange();
                        b.selectNodeContents(a);
                        b.select() } else c.getSelection().selectElement(a);
                    c.focus() }

                function h() { g && g.setHtml(b);
                    delete m.list }
                var k = c.ui.spaceId("path"),
                    g, m = c._.elementsPath,
                    p = m.idBase;
                e.html = e.html + ('<span id="' + k + '_label" class="cke_voice_label">' + c.lang.elementspath.eleLabel + '</span><span id="' + k + '" class="cke_path" role="group" aria-labelledby="' +
                    k + '_label">' + b + "</span>");
                c.on("uiReady", function() { var a = c.ui.space("path");
                    a && c.focusManager.add(a, 1) });
                m.onClick = f;
                var q = CKEDITOR.tools.addFunction(f),
                    o = CKEDITOR.tools.addFunction(function(a, b) {
                        var d = m.idBase,
                            e, b = new CKEDITOR.dom.event(b);
                        e = c.lang.dir == "rtl";
                        switch (b.getKeystroke()) {
                            case e ? 39:
                                37:
                                    case 9:
                                (e = CKEDITOR.document.getById(d + (a + 1))) || (e = CKEDITOR.document.getById(d + "0"));
                                e.focus();
                                return false;
                            case e ? 37:
                                39:
                                    case CKEDITOR.SHIFT + 9:
                                (e = CKEDITOR.document.getById(d + (a - 1))) || (e = CKEDITOR.document.getById(d +
                                    (m.list.length - 1)));
                                e.focus();
                                return false;
                            case 27:
                                c.focus();
                                return false;
                            case 13:
                            case 32:
                                f(a);
                                return false
                        }
                        return true
                    });
                c.on("selectionChange", function() {
                    for (var a = [], e = m.list = [], f = [], h = m.filters, j = true, v = c.elementPath().elements, x, u = v.length; u--;) {
                        var r = v[u],
                            y = 0;
                        x = r.data("cke-display-name") ? r.data("cke-display-name") : r.data("cke-real-element-type") ? r.data("cke-real-element-type") : r.getName();
                        j = r.hasAttribute("contenteditable") ? r.getAttribute("contenteditable") == "true" : j;
                        !j && !r.hasAttribute("contenteditable") &&
                            (y = 1);
                        for (var z = 0; z < h.length; z++) { var B = h[z](r, x); if (B === false) { y = 1; break } x = B || x }
                        if (!y) { e.unshift(r);
                            f.unshift(x) }
                    }
                    e = e.length;
                    for (h = 0; h < e; h++) { x = f[h];
                        j = c.lang.elementspath.eleTitle.replace(/%1/, x);
                        x = d.output({ id: p + h, label: j, text: x, jsTitle: "javascript:void('" + x + "')", index: h, keyDownFn: o, clickFn: q });
                        a.unshift(x) } g || (g = CKEDITOR.document.getById(k));
                    f = g;
                    f.setHtml(a.join("") + b);
                    c.fire("elementsPathUpdate", { space: f })
                });
                c.on("readOnly", h);
                c.on("contentDomUnload", h);
                c.addCommand("elementsPathFocus", a);
                c.setKeystroke(CKEDITOR.ALT +
                    122, "elementsPathFocus")
            }
            a = { editorFocus: false, readOnly: 1, exec: function(a) {
                    (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } };
            var b = '<span class="cke_path_empty">&nbsp;</span>',
                c = "";
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (c = c + ' onkeypress="return false;"');
            CKEDITOR.env.gecko && (c = c + ' onblur="this.style.cssText = this.style.cssText;"');
            var d = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' +
                c + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
            CKEDITOR.plugins.add("elementspath", { init: function(a) { a._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] };
                    a.on("uiSpace", function(b) { b.data.space == "bottom" && e(a, b.data) }) } })
        }(),
        function() {
            function a(a, b, c) {
                c = a.config.forceEnterMode || c;
                if (a.mode ==
                    "wysiwyg") { if (!b) b = a.activeEnterMode; if (!a.elementPath().isContextFor("p")) { b = CKEDITOR.ENTER_BR;
                        c = 1 } a.fire("saveSnapshot");
                    b == CKEDITOR.ENTER_BR ? j(a, b, null, c) : f(a, b, null, c);
                    a.fire("saveSnapshot") }
            }

            function e(a) { for (var a = a.getSelection().getRanges(true), b = a.length - 1; b > 0; b--) a[b].deleteContents(); return a[0] }

            function b(a) {
                var b = a.startContainer.getAscendant(function(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.getAttribute("contenteditable") == "true" }, true);
                if (a.root.equals(b)) return a;
                b = new CKEDITOR.dom.range(b);
                b.moveToRange(a);
                return b
            }
            CKEDITOR.plugins.add("enterkey", { init: function(b) { b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: false, exec: function(b) { a(b) } });
                    b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: false, exec: function(b) { a(b, b.activeShiftEnterMode, 1) } });
                    b.setKeystroke([
                        [13, "enter"],
                        [CKEDITOR.SHIFT + 13, "shiftEnter"]
                    ]) } });
            var c = CKEDITOR.dom.walker.whitespaces(),
                d = CKEDITOR.dom.walker.bookmark();
            CKEDITOR.plugins.enterkey = {
                enterBlock: function(a, f, i, p) {
                    if (i = i || e(a)) {
                        var i = b(i),
                            q = i.document,
                            o = i.checkStartOfBlock(),
                            n = i.checkEndOfBlock(),
                            l = a.elementPath(i.startContainer),
                            s = l.block,
                            t = f == CKEDITOR.ENTER_DIV ? "div" : "p",
                            w;
                        if (o && n) {
                            if (s && (s.is("li") || s.getParent().is("li"))) {
                                s.is("li") || (s = s.getParent());
                                i = s.getParent();
                                w = i.getParent();
                                var p = !s.hasPrevious(),
                                    v = !s.hasNext(),
                                    t = a.getSelection(),
                                    x = t.createBookmarks(),
                                    o = s.getDirection(1),
                                    n = s.getAttribute("class"),
                                    u = s.getAttribute("style"),
                                    r = w.getDirection(1) != o,
                                    a = a.enterMode != CKEDITOR.ENTER_BR || r || u || n;
                                if (w.is("li"))
                                    if (p || v) {
                                        p && v && i.remove();
                                        s[v ?
                                            "insertAfter" : "insertBefore"](w)
                                    } else s.breakParent(w);
                                else { if (a) { if (l.block.is("li")) { w = q.createElement(f == CKEDITOR.ENTER_P ? "p" : "div");
                                            r && w.setAttribute("dir", o);
                                            u && w.setAttribute("style", u);
                                            n && w.setAttribute("class", n);
                                            s.moveChildren(w) } else w = l.block; if (p || v) w[p ? "insertBefore" : "insertAfter"](i);
                                        else { s.breakParent(i);
                                            w.insertAfter(i) } } else { s.appendBogus(true); if (p || v)
                                            for (; q = s[p ? "getFirst" : "getLast"]();) q[p ? "insertBefore" : "insertAfter"](i);
                                        else
                                            for (s.breakParent(i); q = s.getLast();) q.insertAfter(i) } s.remove() } t.selectBookmarks(x);
                                return
                            }
                            if (s && s.getParent().is("blockquote")) { s.breakParent(s.getParent());
                                s.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || s.getPrevious().remove();
                                s.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || s.getNext().remove();
                                i.moveToElementEditStart(s);
                                i.select(); return }
                        } else if (s && s.is("pre") && !n) { j(a, f, i, p); return }
                        if (o = i.splitBlock(t)) {
                            f = o.previousBlock;
                            s = o.nextBlock;
                            l = o.wasStartOfBlock;
                            a = o.wasEndOfBlock;
                            if (s) { x = s.getParent(); if (x.is("li")) { s.breakParent(x);
                                    s.move(s.getNext(), 1) } } else if (f &&
                                (x = f.getParent()) && x.is("li")) { f.breakParent(x);
                                x = f.getNext();
                                i.moveToElementEditStart(x);
                                f.move(f.getPrevious()) }
                            if (!l && !a) {
                                if (s.is("li")) { w = i.clone();
                                    w.selectNodeContents(s);
                                    w = new CKEDITOR.dom.walker(w);
                                    w.evaluator = function(a) { return !(d(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) };
                                    (x = w.next()) && (x.type == CKEDITOR.NODE_ELEMENT && x.is("ul", "ol")) && (CKEDITOR.env.needsBrFiller ? q.createElement("br") : q.createText(" ")).insertBefore(x) } s &&
                                    i.moveToElementEditStart(s)
                            } else {
                                if (f) { if (f.is("li") || !h.test(f.getName()) && !f.is("pre")) w = f.clone() } else s && (w = s.clone());
                                if (w) p && !w.is("li") && w.renameNode(t);
                                else if (x && x.is("li")) w = x;
                                else { w = q.createElement(t);
                                    f && (v = f.getDirection()) && w.setAttribute("dir", v) }
                                if (q = o.elementPath) { p = 0; for (t = q.elements.length; p < t; p++) { x = q.elements[p]; if (x.equals(q.block) || x.equals(q.blockLimit)) break; if (CKEDITOR.dtd.$removeEmpty[x.getName()]) { x = x.clone();
                                            w.moveChildren(x);
                                            w.append(x) } } } w.appendBogus();
                                w.getParent() ||
                                    i.insertNode(w);
                                w.is("li") && w.removeAttribute("value");
                                if (CKEDITOR.env.ie && l && (!a || !f.getChildCount())) { i.moveToElementEditStart(a ? f : w);
                                    i.select() } i.moveToElementEditStart(l && !a ? s : w)
                            }
                            i.select();
                            i.scrollIntoView()
                        }
                    }
                },
                enterBr: function(a, b, c, d) {
                    if (c = c || e(a)) {
                        var i = c.document,
                            j = c.checkEndOfBlock(),
                            n = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
                            l = n.block,
                            s = l && n.block.getName();
                        if (!d && s == "li") f(a, b, c, d);
                        else {
                            if (!d && j && h.test(s))
                                if (j = l.getDirection()) {
                                    i = i.createElement("div");
                                    i.setAttribute("dir",
                                        j);
                                    i.insertAfter(l);
                                    c.setStart(i, 0)
                                } else { i.createElement("br").insertAfter(l);
                                    CKEDITOR.env.gecko && i.createText("").insertAfter(l);
                                    c.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START) }
                            else {
                                a = s == "pre" && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? i.createText("\r") : i.createElement("br");
                                c.deleteContents();
                                c.insertNode(a);
                                if (CKEDITOR.env.needsBrFiller) {
                                    i.createText("﻿").insertAfter(a);
                                    j && (l || n.blockLimit).appendBogus();
                                    a.getNext().$.nodeValue = "";
                                    c.setStartAt(a.getNext(),
                                        CKEDITOR.POSITION_AFTER_START)
                                } else c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)
                            }
                            c.collapse(true);
                            c.select();
                            c.scrollIntoView()
                        }
                    }
                }
            };
            var i = CKEDITOR.plugins.enterkey,
                j = i.enterBr,
                f = i.enterBlock,
                h = /^h[1-6]$/
        }(),
        function() {
            function a(a, b) {
                var c = {},
                    d = [],
                    i = { nbsp: " ", shy: "­", gt: ">", lt: "<", amp: "&", apos: "'", quot: '"' },
                    a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(a, e) { var f = b ? "&" + e + ";" : i[e];
                        c[f] = b ? i[e] : "&" + e + ";";
                        d.push(f); return "" });
                if (!b && a) {
                    var a = a.split(","),
                        j = document.createElement("div"),
                        f;
                    j.innerHTML = "&" + a.join(";&") + ";";
                    f = j.innerHTML;
                    j = null;
                    for (j = 0; j < f.length; j++) { var h = f.charAt(j);
                        c[h] = "&" + a[j] + ";";
                        d.push(h) }
                }
                c.regex = d.join(b ? "|" : "");
                return c
            }
            CKEDITOR.plugins.add("entities", {
                afterInit: function(e) {
                    function b(a) { return h[a] }

                    function c(a) { return d.entities_processNumerical == "force" || !j[a] ? "&#" + a.charCodeAt(0) + ";" : j[a] }
                    var d = e.config;
                    if (e = (e = e.dataProcessor) && e.htmlFilter) {
                        var i = [];
                        d.basicEntities !== false && i.push("nbsp,gt,lt,amp");
                        if (d.entities) {
                            i.length && i.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro");
                            d.entities_latin && i.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml");
                            d.entities_greek && i.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv");
                            d.entities_additional && i.push(d.entities_additional)
                        }
                        var j = a(i.join(",")),
                            f = j.regex ? "[" + j.regex + "]" : "a^";
                        delete j.regex;
                        d.entities && d.entities_processNumerical && (f = "[^ -~]|" + f);
                        var f = RegExp(f, "g"),
                            h = a("nbsp,gt,lt,amp,shy", true),
                            k = RegExp(h.regex, "g");
                        e.addRules({ text: function(a) { return a.replace(k, b).replace(f, c) } }, { applyToAll: true, excludeNestedEditable: true })
                    }
                }
            })
        }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional =
        "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            popup: function(a, e, b, c) {
                e = e || "80%";
                b = b || "70%";
                typeof e == "string" && (e.length > 1 && e.substr(e.length - 1, 1) == "%") && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10));
                typeof b == "string" && (b.length > 1 && b.substr(b.length - 1, 1) == "%") && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
                e < 640 && (e = 640);
                b < 420 && (b = 420);
                var d = parseInt((window.screen.height - b) / 2, 10),
                    i = parseInt((window.screen.width - e) / 2, 10),
                    c = (c || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") +
                    ",width=" + e + ",height=" + b + ",top=" + d + ",left=" + i,
                    j = window.open("", null, c, true);
                if (!j) return false;
                try { if (navigator.userAgent.toLowerCase().indexOf(" chrome/") == -1) { j.moveTo(i, d);
                        j.resizeTo(e, b) } j.focus();
                    j.location.href = a } catch (f) { window.open(a, null, c, true) }
                return true
            }
        }),
        function() {
            function a(a, b) { var c = []; if (b)
                    for (var d in b) c.push(d + "=" + encodeURIComponent(b[d]));
                else return a; return a + (a.indexOf("?") != -1 ? "&" : "?") + c.join("&") }

            function e(a) { a = a + ""; return a.charAt(0).toUpperCase() + a.substr(1) }

            function b() {
                var b =
                    this.getDialog(),
                    c = b.getParentEditor();
                c._.filebrowserSe = this;
                var d = c.config["filebrowser" + e(b.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%",
                    b = c.config["filebrowser" + e(b.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%",
                    f = this.filebrowser.params || {};
                f.CKEditor = c.name;
                f.CKEditorFuncNum = c._.filebrowserFn;
                if (!f.langCode) f.langCode = c.langCode;
                f = a(this.filebrowser.url, f);
                c.popup(f, d, b, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
            }

            function c() {
                var a =
                    this.getDialog();
                a.getParentEditor()._.filebrowserSe = this;
                return !a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? false : true
            }

            function d(b, c, d) { var e = d.params || {};
                e.CKEditor = b.name;
                e.CKEditorFuncNum = b._.filebrowserFn; if (!e.langCode) e.langCode = b.langCode;
                c.action = a(d.url, e);
                c.filebrowser = d }

            function i(a, f, g, j) {
                if (j && j.length)
                    for (var p, q = j.length; q--;) {
                        p = j[q];
                        (p.type == "hbox" || p.type == "vbox" || p.type == "fieldset") &&
                        i(a, f, g, p.children);
                        if (p.filebrowser) {
                            if (typeof p.filebrowser == "string") p.filebrowser = { action: p.type == "fileButton" ? "QuickUpload" : "Browse", target: p.filebrowser };
                            if (p.filebrowser.action == "Browse") { var o = p.filebrowser.url; if (o === void 0) { o = a.config["filebrowser" + e(f) + "BrowseUrl"]; if (o === void 0) o = a.config.filebrowserBrowseUrl } if (o) { p.onClick = b;
                                    p.filebrowser.url = o;
                                    p.hidden = false } } else if (p.filebrowser.action == "QuickUpload" && p["for"]) {
                                o = p.filebrowser.url;
                                if (o === void 0) {
                                    o = a.config["filebrowser" + e(f) + "UploadUrl"];
                                    if (o === void 0) o = a.config.filebrowserUploadUrl
                                }
                                if (o) { var n = p.onClick;
                                    p.onClick = function(a) { var b = a.sender; return n && n.call(b, a) === false ? false : c.call(b, a) };
                                    p.filebrowser.url = o;
                                    p.hidden = false;
                                    d(a, g.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser) }
                            }
                        }
                    }
            }

            function j(a, b, c) { if (c.indexOf(";") !== -1) { for (var c = c.split(";"), d = 0; d < c.length; d++)
                        if (j(a, b, c[d])) return true; return false } return (a = a.getContents(b).get(c).filebrowser) && a.url }

            function f(a, b) {
                var c = this._.filebrowserSe.getDialog(),
                    d = this._.filebrowserSe["for"],
                    e = this._.filebrowserSe.filebrowser.onSelect;
                d && c.getContentElement(d[0], d[1]).reset();
                if (!(typeof b == "function" && b.call(this._.filebrowserSe) === false) && !(e && e.call(this._.filebrowserSe, a, b) === false)) { typeof b == "string" && b && alert(b); if (a) { d = this._.filebrowserSe;
                        c = d.getDialog(); if (d = d.filebrowser.target || null) { d = d.split(":"); if (e = c.getContentElement(d[0], d[1])) { e.setValue(a);
                                c.selectPage(d[0]) } } } }
            }
            CKEDITOR.plugins.add("filebrowser", {
                requires: "popup",
                init: function(a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(f,
                        a);
                    a.on("destroy", function() { CKEDITOR.tools.removeFunction(this._.filebrowserFn) })
                }
            });
            CKEDITOR.on("dialogDefinition", function(a) { if (a.editor.plugins.filebrowser)
                    for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)
                        if (c = b.contents[d]) { i(a.editor, a.data.name, b, c.elements); if (c.hidden && c.filebrowser) c.hidden = !j(b, c.id, c.filebrowser) } })
        }(), CKEDITOR.plugins.add("find", {
            requires: "dialog",
            init: function(a) {
                var e = a.addCommand("find", new CKEDITOR.dialogCommand("find"));
                e.canUndo = false;
                e.readOnly = 1;
                a.addCommand("replace",
                    new CKEDITOR.dialogCommand("replace")).canUndo = false;
                if (a.ui.addButton) { a.ui.addButton("Find", { label: a.lang.find.find, command: "find", toolbar: "find,10" });
                    a.ui.addButton("Replace", { label: a.lang.find.replace, command: "replace", toolbar: "find,20" }) } CKEDITOR.dialog.add("find", this.path + "dialogs/find.js");
                CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js")
            }
        }), CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } },
        function() {
            function a(a, b) {
                var d = c.exec(a),
                    e =
                    c.exec(b);
                if (d) { if (!d[2] && e[2] == "px") return e[1]; if (d[2] == "px" && !e[2]) return e[1] + "px" }
                return b
            }
            var e = CKEDITOR.htmlParser.cssStyle,
                b = CKEDITOR.tools.cssLength,
                c = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
                d = {
                    elements: {
                        $: function(b) {
                            var c = b.attributes;
                            if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) {
                                var d = (new e(b)).rules,
                                    b = c.attributes,
                                    h = d.width,
                                    d = d.height;
                                h && (b.width = a(b.width, h));
                                d && (b.height =
                                    a(b.height, d))
                            }
                            return c
                        }
                    }
                };
            CKEDITOR.plugins.add("fakeobjects", { init: function(a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function(a) {
                    (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(d, { applyToAll: true }) } });
            CKEDITOR.editor.prototype.createFakeElement = function(a, c, d, h) {
                var k = this.lang.fakeobjects,
                    k = k[d] || k.unknown,
                    c = {
                        "class": c,
                        "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                        "data-cke-real-node-type": a.type,
                        alt: k,
                        title: k,
                        align: a.getAttribute("align") ||
                            ""
                    };
                if (!CKEDITOR.env.hc) c.src = CKEDITOR.tools.transparentImageData;
                d && (c["data-cke-real-element-type"] = d);
                if (h) { c["data-cke-resizable"] = h;
                    d = new e;
                    h = a.getAttribute("width");
                    a = a.getAttribute("height");
                    h && (d.rules.width = b(h));
                    a && (d.rules.height = b(a));
                    d.populate(c) }
                return this.document.createElement("img", { attributes: c })
            };
            CKEDITOR.editor.prototype.createFakeParserElement = function(a, c, d, h) {
                var k = this.lang.fakeobjects,
                    k = k[d] || k.unknown,
                    g;
                g = new CKEDITOR.htmlParser.basicWriter;
                a.writeHtml(g);
                g = g.getHtml();
                c = { "class": c, "data-cke-realelement": encodeURIComponent(g), "data-cke-real-node-type": a.type, alt: k, title: k, align: a.attributes.align || "" };
                if (!CKEDITOR.env.hc) c.src = CKEDITOR.tools.transparentImageData;
                d && (c["data-cke-real-element-type"] = d);
                if (h) { c["data-cke-resizable"] = h;
                    h = a.attributes;
                    a = new e;
                    d = h.width;
                    h = h.height;
                    d !== void 0 && (a.rules.width = b(d));
                    h !== void 0 && (a.rules.height = b(h));
                    a.populate(c) }
                return new CKEDITOR.htmlParser.element("img", c)
            };
            CKEDITOR.editor.prototype.restoreRealElement = function(b) {
                if (b.data("cke-real-node-type") !=
                    CKEDITOR.NODE_ELEMENT) return null;
                var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
                if (b.data("cke-resizable")) { var d = b.getStyle("width"),
                        b = b.getStyle("height");
                    d && c.setAttribute("width", a(c.getAttribute("width"), d));
                    b && c.setAttribute("height", a(c.getAttribute("height"), b)) }
                return c
            }
        }(),
        function() {
            function a(a) { a = a.attributes; return a.type == "application/x-shockwave-flash" || b.test(a.src || "") }

            function e(a, b) {
                return a.createFakeParserElement(b, "cke_flash",
                    "flash", true)
            }
            var b = /\.swf(?:$|\?)/i;
            CKEDITOR.plugins.add("flash", {
                requires: "dialog,fakeobjects",
                onLoad: function() { CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") },
                init: function(a) {
                    var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
                    CKEDITOR.dialog.isTabEnabled(a,
                        "flash", "properties") && (b = b + ";object[align]; embed[allowscriptaccess,quality,scale,wmode]");
                    CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b = b + ";object[id]{*}; embed[bgcolor]{*}(*)");
                    a.addCommand("flash", new CKEDITOR.dialogCommand("flash", { allowedContent: b, requiredContent: "embed" }));
                    a.ui.addButton && a.ui.addButton("Flash", { label: a.lang.common.flash, command: "flash", toolbar: "insert,20" });
                    CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
                    a.addMenuItems && a.addMenuItems({
                        flash: {
                            label: a.lang.flash.properties,
                            command: "flash",
                            group: "flash"
                        }
                    });
                    a.on("doubleclick", function(a) { var b = a.data.element; if (b.is("img") && b.data("cke-real-element-type") == "flash") a.data.dialog = "flash" });
                    a.contextMenu && a.contextMenu.addListener(function(a) { if (a && a.is("img") && !a.isReadOnly() && a.data("cke-real-element-type") == "flash") return { flash: CKEDITOR.TRISTATE_OFF } })
                },
                afterInit: function(b) {
                    var d = b.dataProcessor;
                    (d = d && d.dataFilter) && d.addRules({
                        elements: {
                            "cke:object": function(d) {
                                var j = d.attributes;
                                if ((!j.classid || !("" + j.classid).toLowerCase()) &&
                                    !a(d)) { for (j = 0; j < d.children.length; j++)
                                        if (d.children[j].name == "cke:embed") { if (!a(d.children[j])) break; return e(b, d) }
                                    return null }
                                return e(b, d)
                            },
                            "cke:embed": function(d) { return !a(d) ? null : e(b, d) }
                        }
                    }, 5)
                }
            })
        }(), CKEDITOR.tools.extend(CKEDITOR.config, { flashEmbedTagOnly: !1, flashAddEmbedTag: !0, flashConvertOnEdit: !1 }),
        function() {
            function a(a) {
                var d = a.config,
                    i = a.fire("uiSpace", { space: "top", html: "" }).html,
                    j = function() {
                        function f(a, c, d) { h.setStyle(c, b(d));
                            h.setStyle("position", a) }

                        function g(a) {
                            var b = k.getDocumentPosition();
                            switch (a) {
                                case "top":
                                    f("absolute", "top", b.y - t - x); break;
                                case "pin":
                                    f("fixed", "top", r); break;
                                case "bottom":
                                    f("absolute", "top", b.y + (l.height || l.bottom - l.top) + x) } i = a
                        }
                        var i, k, n, l, s, t, w, v = d.floatSpaceDockedOffsetX || 0,
                            x = d.floatSpaceDockedOffsetY || 0,
                            u = d.floatSpacePinnedOffsetX || 0,
                            r = d.floatSpacePinnedOffsetY || 0;
                        return function(f) {
                            if (k = a.editable()) {
                                var m = f && f.name == "focus";
                                m && h.show();
                                a.fire("floatingSpaceLayout", { show: m });
                                h.removeStyle("left");
                                h.removeStyle("right");
                                n = h.getClientRect();
                                l = k.getClientRect();
                                s = e.getViewPaneSize();
                                t = n.height;
                                w = "pageXOffset" in e.$ ? e.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                                if (i) {
                                    t + x <= l.top ? g("top") : t + x > s.height - l.bottom ? g("pin") : g("bottom");
                                    f = s.width / 2;
                                    f = d.floatSpacePreferRight ? "right" : l.left > 0 && l.right < s.width && l.width > n.width ? d.contentsLangDirection == "rtl" ? "right" : "left" : f - l.left > l.right - f ? "left" : "right";
                                    if (n.width > s.width) { f = "left";
                                        m = 0 } else {
                                        m = f == "left" ? l.left > 0 ? l.left : 0 : l.right < s.width ? s.width - l.right : 0;
                                        if (m + n.width > s.width) {
                                            f = f == "left" ? "right" : "left";
                                            m = 0
                                        }
                                    }
                                    h.setStyle(f, b((i == "pin" ? u : v) + m + (i == "pin" ? 0 : f == "left" ? w : -w)))
                                } else { i = "pin";
                                    g("pin");
                                    j(f) }
                            }
                        }
                    }();
                if (i) {
                    var f = new CKEDITOR.template('<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"' + (a.title ? ' aria-labelledby="cke_{name}_arialbl"' : " ") + ">" + (a.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' :
                            " ") + '<div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'),
                        h = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(f.output({ content: i, id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;z-index:" + (d.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.title }))),
                        k = CKEDITOR.tools.eventsBuffer(500, j),
                        g = CKEDITOR.tools.eventsBuffer(100, j);
                    h.unselectable();
                    h.on("mousedown", function(a) {
                        a = a.data;
                        a.getTarget().hasAscendant("a",
                            1) || a.preventDefault()
                    });
                    a.on("focus", function(b) { j(b);
                        a.on("change", k.input);
                        e.on("scroll", g.input);
                        e.on("resize", g.input) });
                    a.on("blur", function() { h.hide();
                        a.removeListener("change", k.input);
                        e.removeListener("scroll", g.input);
                        e.removeListener("resize", g.input) });
                    a.on("destroy", function() { e.removeListener("scroll", g.input);
                        e.removeListener("resize", g.input);
                        h.clearCustomData();
                        h.remove() });
                    a.focusManager.hasFocus && h.show();
                    a.focusManager.add(h, 1)
                }
            }
            var e = CKEDITOR.document.getWindow(),
                b = CKEDITOR.tools.cssLength;
            CKEDITOR.plugins.add("floatingspace", { init: function(b) { b.on("loaded", function() { a(this) }, null, null, 20) } })
        }(), CKEDITOR.plugins.add("listblock", {
            requires: "panel",
            onLoad: function() {
                var a = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'),
                    e = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),
                    b = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>'),
                    c = /\'/g;
                CKEDITOR.ui.panel.prototype.addListBlock = function(a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) };
                CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block,
                    $: function(a, b) {
                        var b = b || {},
                            c = b.attributes || (b.attributes = {});
                        (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = true);
                        !c.role && (c.role = "listbox");
                        this.base.apply(this, arguments);
                        this.element.setAttribute("role", c.role);
                        c = this.keys;
                        c[40] = "next";
                        c[9] = "next";
                        c[38] = "prev";
                        c[CKEDITOR.SHIFT + 9] = "prev";
                        c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                        CKEDITOR.env.ie && (c[13] = "mouseup");
                        this._.pendingHtml = [];
                        this._.pendingList = [];
                        this._.items = {};
                        this._.groups = {}
                    },
                    _: {
                        close: function() { if (this._.started) { var b = a.output({ items: this._.pendingList.join("") });
                                this._.pendingList = [];
                                this._.pendingHtml.push(b);
                                delete this._.started } },
                        getClick: function() {
                            if (!this._.click) this._.click =
                                CKEDITOR.tools.addFunction(function(a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this);
                            return this._.click
                        }
                    },
                    proto: {
                        add: function(a, b, j) { var f = CKEDITOR.tools.getNextId(); if (!this._.started) { this._.started = 1;
                                this._.size = this._.size || 0 } this._.items[a] = f; var h;
                            h = CKEDITOR.tools.htmlEncodeAttr(a).replace(c, "\\'");
                            a = { id: f, val: h, onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(j || a), text: b || a };
                            this._.pendingList.push(e.output(a)) },
                        startGroup: function(a) { this._.close(); var c = CKEDITOR.tools.getNextId();
                            this._.groups[a] = c;
                            this._.pendingHtml.push(b.output({ id: c, label: a })) },
                        commit: function() { this._.close();
                            this.element.appendHtml(this._.pendingHtml.join(""));
                            delete this._.size;
                            this._.pendingHtml = [] },
                        toggle: function(a) { var b = this.isMarked(a);
                            b ? this.unmark(a) : this.mark(a); return !b },
                        hideGroup: function(a) {
                            var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                            if (a) {
                                a.setStyle("display", "none");
                                b && b.getName() == "ul" &&
                                    b.setStyle("display", "none")
                            }
                        },
                        hideItem: function(a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") },
                        showAll: function() { var a = this._.items,
                                b = this._.groups,
                                c = this.element.getDocument(),
                                e; for (e in a) c.getById(a[e]).setStyle("display", ""); for (var h in b) { a = c.getById(b[h]);
                                e = a.getNext();
                                a.setStyle("display", "");
                                e && e.getName() == "ul" && e.setStyle("display", "") } },
                        mark: function(a) {
                            this.multiSelect || this.unmarkAll();
                            var a = this._.items[a],
                                b = this.element.getDocument().getById(a);
                            b.addClass("cke_selected");
                            this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", true);
                            this.onMark && this.onMark(b)
                        },
                        unmark: function(a) { var b = this.element.getDocument(),
                                a = this._.items[a],
                                c = b.getById(a);
                            c.removeClass("cke_selected");
                            b.getById(a + "_option").removeAttribute("aria-selected");
                            this.onUnmark && this.onUnmark(c) },
                        unmarkAll: function() {
                            var a = this._.items,
                                b = this.element.getDocument(),
                                c;
                            for (c in a) { var e = a[c];
                                b.getById(e).removeClass("cke_selected");
                                b.getById(e + "_option").removeAttribute("aria-selected") } this.onUnmark &&
                                this.onUnmark()
                        },
                        isMarked: function(a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") },
                        focus: function(a) { this._.focusIndex = -1; var b = this.element.getElementsByTag("a"),
                                c, e = -1; if (a)
                                for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++e);) { if (a.equals(c)) { this._.focusIndex = e; break } } else this.element.focus();
                            c && setTimeout(function() { c.focus() }, 0) }
                    }
                })
            }
        }), CKEDITOR.plugins.add("richcombo", {
            requires: "floatpanel,listblock,button",
            beforeInit: function(a) {
                a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
                    CKEDITOR.ui.richCombo.handler)
            }
        }),
        function() {
            var a = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (a = a + ' onkeypress="return false;"');
            CKEDITOR.env.gecko &&
                (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
            var a = a + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" :
                    CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"),
                e = CKEDITOR.addTemplate("combo", a);
            CKEDITOR.UI_RICHCOMBO = "richcombo";
            CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                $: function(a) {
                    CKEDITOR.tools.extend(this, a, { canGroup: false, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 });
                    a = this.panel || {};
                    delete this.panel;
                    this.id = CKEDITOR.tools.getNextNumber();
                    this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                    a.className = "cke_combopanel";
                    a.block = { multiSelect: a.multiSelect, attributes: a.attributes };
                    a.toolbarRelated = true;
                    this._ = { panelDefinition: a, items: {} }
                },
                proto: {
                    renderHtml: function(a) { var c = [];
                        this.render(a, c); return c.join("") },
                    render: function(a, c) {
                        function d() { if (this.getState() != CKEDITOR.TRISTATE_ON) { var c = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; if (a.readOnly && !this.readOnly) c = CKEDITOR.TRISTATE_DISABLED;
                                this.setState(c);
                                this.setValue("");
                                c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } }
                        var i = CKEDITOR.env,
                            j = "cke_" + this.id,
                            f = CKEDITOR.tools.addFunction(function(c) {
                                if (p) {
                                    a.unlockSelection(1);
                                    p = 0
                                }
                                k.execute(c)
                            }, this),
                            h = this,
                            k = { id: j, combo: this, focus: function() { CKEDITOR.document.getById(j).getChild(1).focus() }, execute: function(c) { var d = h._; if (d.state != CKEDITOR.TRISTATE_DISABLED) { h.createPanel(a); if (d.on) d.panel.hide();
                                        else { h.commit(); var e = h.getValue();
                                            e ? d.list.mark(e) : d.list.unmarkAll();
                                            d.panel.showBlock(h.id, new CKEDITOR.dom.element(c), 4) } } }, clickFn: f };
                        a.on("activeFilterChange", d, this);
                        a.on("mode", d, this);
                        a.on("selectionChange", d, this);
                        !this.readOnly && a.on("readOnly", d, this);
                        var g = CKEDITOR.tools.addFunction(function(c,
                                d) { var c = new CKEDITOR.dom.event(c),
                                    e = c.getKeystroke(); if (e == 40) a.once("panelShow", function(a) { a.data._.panel._.currentBlock.onKeyDown(40) }); switch (e) {
                                    case 13:
                                    case 32:
                                    case 40:
                                        CKEDITOR.tools.callFunction(f, d); break;
                                    default:
                                        k.onkey(k, e) } c.preventDefault() }),
                            m = CKEDITOR.tools.addFunction(function() { k.onfocus && k.onfocus() }),
                            p = 0;
                        k.keyDownFn = g;
                        i = {
                            id: j,
                            name: this.name || this.command,
                            label: this.label,
                            title: this.title,
                            cls: this.className || "",
                            titleJs: i.gecko && !i.hc ? "" : (this.title || "").replace("'", ""),
                            keydownFn: g,
                            focusFn: m,
                            clickFn: f
                        };
                        e.output(i, c);
                        if (this.onRender) this.onRender();
                        return k
                    },
                    createPanel: function(a) {
                        if (!this._.panel) {
                            var c = this._.panelDefinition,
                                d = this._.panelDefinition.block,
                                e = c.parent || CKEDITOR.document.getBody(),
                                j = "cke_combopanel__" + this.name,
                                f = new CKEDITOR.ui.floatPanel(a, e, c),
                                h = f.addListBlock(this.id, d),
                                k = this;
                            f.onShow = function() {
                                this.element.addClass(j);
                                k.setState(CKEDITOR.TRISTATE_ON);
                                k._.on = 1;
                                k.editorFocus && !a.focusManager.hasFocus && a.focus();
                                if (k.onOpen) k.onOpen();
                                a.once("panelShow",
                                    function() { h.focus(!h.multiSelect && k.getValue()) })
                            };
                            f.onHide = function(c) { this.element.removeClass(j);
                                k.setState(k.modes && k.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                k._.on = 0; if (!c && k.onClose) k.onClose() };
                            f.onEscape = function() { f.hide(1) };
                            h.onClick = function(a, b) { k.onClick && k.onClick.call(k, a, b);
                                f.hide() };
                            this._.panel = f;
                            this._.list = h;
                            f.getBlock(this.id).onHide = function() { k._.on = 0;
                                k.setState(CKEDITOR.TRISTATE_OFF) };
                            this.init && this.init()
                        }
                    },
                    setValue: function(a, c) {
                        this._.value = a;
                        var d =
                            this.document.getById("cke_" + this.id + "_text");
                        if (d) { if (!a && !c) { c = this.label;
                                d.addClass("cke_combo_inlinelabel") } else d.removeClass("cke_combo_inlinelabel");
                            d.setText(typeof c != "undefined" ? c : a) }
                    },
                    getValue: function() { return this._.value || "" },
                    unmarkAll: function() { this._.list.unmarkAll() },
                    mark: function(a) { this._.list.mark(a) },
                    hideItem: function(a) { this._.list.hideItem(a) },
                    hideGroup: function(a) { this._.list.hideGroup(a) },
                    showAll: function() { this._.list.showAll() },
                    add: function(a, c, d) {
                        this._.items[a] = d || a;
                        this._.list.add(a, c, d)
                    },
                    startGroup: function(a) { this._.list.startGroup(a) },
                    commit: function() { if (!this._.committed) { this._.list.commit();
                            this._.committed = 1;
                            CKEDITOR.ui.fire("ready", this) } this._.committed = 1 },
                    setState: function(a) { if (this._.state != a) { var c = this.document.getById("cke_" + this.id);
                            c.setState(a, "cke_combo");
                            a == CKEDITOR.TRISTATE_DISABLED ? c.setAttribute("aria-disabled", true) : c.removeAttribute("aria-disabled");
                            this._.state = a } },
                    getState: function() { return this._.state },
                    enable: function() {
                        this._.state ==
                            CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                    },
                    disable: function() { if (this._.state != CKEDITOR.TRISTATE_DISABLED) { this._.lastState = this._.state;
                            this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                },
                statics: { handler: { create: function(a) { return new CKEDITOR.ui.richCombo(a) } } }
            });
            CKEDITOR.ui.prototype.addRichCombo = function(a, c) { this.add(a, CKEDITOR.UI_RICHCOMBO, c) }
        }(),
        function() {
            function a(a, c, d, i, j, f, h, k) {
                for (var g = a.config, m = new CKEDITOR.style(h), p = j.split(";"), j = [], q = {}, o = 0; o < p.length; o++) {
                    var n = p[o];
                    if (n) { var n = n.split("/"),
                            l = {},
                            s = p[o] = n[0];
                        l[d] = j[o] = n[1] || s;
                        q[s] = new CKEDITOR.style(h, l);
                        q[s]._.definition.name = s } else p.splice(o--, 1)
                }
                a.ui.addRichCombo(c, {
                    label: i.label,
                    title: i.panelTitle,
                    toolbar: "styles," + k,
                    allowedContent: m,
                    requiredContent: m,
                    panel: { css: [CKEDITOR.skin.getPath("editor")].concat(g.contentsCss), multiSelect: false, attributes: { "aria-label": i.panelTitle } },
                    init: function() { this.startGroup(i.panelTitle); for (var a = 0; a < p.length; a++) { var b = p[a];
                            this.add(b, q[b].buildPreview(), b) } },
                    onClick: function(c) {
                        a.focus();
                        a.fire("saveSnapshot");
                        var d = this.getValue(),
                            f = q[c];
                        if (d && c != d) {
                            var g = q[d],
                                h = a.getSelection().getRanges()[0];
                            if (h.collapsed) {
                                var i = a.elementPath(),
                                    j = i.contains(function(a) { return g.checkElementRemovable(a) });
                                if (j) {
                                    var k = h.checkBoundaryOfElement(j, CKEDITOR.START),
                                        l = h.checkBoundaryOfElement(j, CKEDITOR.END);
                                    if (k && l) { for (k = h.createBookmark(); i = j.getFirst();) i.insertBefore(j);
                                        j.remove();
                                        h.moveToBookmark(k) } else if (k) h.moveToPosition(j, CKEDITOR.POSITION_BEFORE_START);
                                    else if (l) h.moveToPosition(j, CKEDITOR.POSITION_AFTER_END);
                                    else { h.splitElement(j);
                                        h.moveToPosition(j, CKEDITOR.POSITION_AFTER_END);
                                        e(h, i.elements.slice(), j) } a.getSelection().selectRanges([h])
                                }
                            } else a.removeStyle(g)
                        }
                        a[d == c ? "removeStyle" : "applyStyle"](f);
                        a.fire("saveSnapshot")
                    },
                    onRender: function() { a.on("selectionChange", function(c) { for (var d = this.getValue(), c = c.data.path.elements, e = 0, g; e < c.length; e++) { g = c[e]; for (var h in q)
                                    if (q[h].checkElementMatch(g, true, a)) { h != d && this.setValue(h); return } } this.setValue("", f) }, this) },
                    refresh: function() {
                        a.activeFilter.check(m) ||
                            this.setState(CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            }

            function e(a, c, d) { var i = c.pop(); if (i) { if (d) return e(a, c, i.equals(d) ? null : d);
                    d = i.clone();
                    a.insertNode(d);
                    a.moveToPosition(d, CKEDITOR.POSITION_AFTER_START);
                    e(a, c) } } CKEDITOR.plugins.add("font", { requires: "richcombo", init: function(b) { var c = b.config;
                    a(b, "Font", "family", b.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30);
                    a(b, "FontSize", "size", b.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40) } })
        }(), CKEDITOR.config.font_names =
        "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif", CKEDITOR.config.font_defaultLabel = "", CKEDITOR.config.font_style = {
            element: "span",
            styles: { "font-family": "#(family)" },
            overrides: [{
                element: "font",
                attributes: { face: null }
            }]
        }, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] }, CKEDITOR.plugins.add("format", {
            requires: "richcombo",
            init: function(a) {
                if (!a.blockless) {
                    for (var e = a.config, b = a.lang.format, c = e.format_tags.split(";"),
                            d = {}, i = 0, j = [], f = 0; f < c.length; f++) { var h = c[f],
                            k = new CKEDITOR.style(e["format_" + h]); if (!a.filter.customConfig || a.filter.check(k)) { i++;
                            d[h] = k;
                            d[h]._.enterMode = a.config.enterMode;
                            j.push(k) } } i !== 0 && a.ui.addRichCombo("Format", {
                        label: b.label,
                        title: b.panelTitle,
                        toolbar: "styles,20",
                        allowedContent: j,
                        panel: { css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss), multiSelect: false, attributes: { "aria-label": b.panelTitle } },
                        init: function() {
                            this.startGroup(b.panelTitle);
                            for (var a in d) {
                                var c = b["tag_" + a];
                                this.add(a,
                                    d[a].buildPreview(c), c)
                            }
                        },
                        onClick: function(b) { a.focus();
                            a.fire("saveSnapshot"); var b = d[b],
                                c = a.elementPath();
                            a[b.checkActive(c, a) ? "removeStyle" : "applyStyle"](b);
                            setTimeout(function() { a.fire("saveSnapshot") }, 0) },
                        onRender: function() { a.on("selectionChange", function(b) { var c = this.getValue(),
                                    b = b.data.path;
                                this.refresh(); for (var e in d)
                                    if (d[e].checkActive(b, a)) { e != c && this.setValue(e, a.lang.format["tag_" + e]); return }
                                this.setValue("") }, this) },
                        onOpen: function() {
                            this.showAll();
                            for (var b in d) a.activeFilter.check(d[b]) ||
                                this.hideItem(b)
                        },
                        refresh: function() { var b = a.elementPath(); if (b) { if (b.isContextFor("p"))
                                    for (var c in d)
                                        if (a.activeFilter.check(d[c])) return;
                                this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                    })
                }
            }
        }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = { element: "p" }, CKEDITOR.config.format_div = { element: "div" }, CKEDITOR.config.format_pre = { element: "pre" }, CKEDITOR.config.format_address = { element: "address" }, CKEDITOR.config.format_h1 = { element: "h1" }, CKEDITOR.config.format_h2 = { element: "h2" },
        CKEDITOR.config.format_h3 = { element: "h3" }, CKEDITOR.config.format_h4 = { element: "h4" }, CKEDITOR.config.format_h5 = { element: "h5" }, CKEDITOR.config.format_h6 = { element: "h6" }, CKEDITOR.plugins.add("forms", {
            requires: "dialog,fakeobjects",
            onLoad: function() { CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
                CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}") },
            init: function(a) {
                var e = a.lang,
                    b = 0,
                    c = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 },
                    d = { checkbox: "input[type,name,checked,required]", radio: "input[type,name,checked,required]", textfield: "input[type,name,value,size,maxlength,required]", textarea: "textarea[cols,rows,name,required]", select: "select[name,size,multiple,required]; option[value,selected]", button: "input[type,name,value]", form: "form[action,name,id,enctype,target,method]", hiddenfield: "input[type,name,value]", imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}" },
                    i = { checkbox: "input", radio: "input", textfield: "input", textarea: "textarea", select: "select", button: "input", form: "form", hiddenfield: "input", imagebutton: "input" },
                    j = function(c, f, h) { var j = { allowedContent: d[f], requiredContent: i[f] };
                        f == "form" && (j.context = "form");
                        a.addCommand(f, new CKEDITOR.dialogCommand(f, j));
                        a.ui.addButton && a.ui.addButton(c, { label: e.common[c.charAt(0).toLowerCase() + c.slice(1)], command: f, toolbar: "forms," + (b = b + 10) });
                        CKEDITOR.dialog.add(f, h) },
                    f = this.path + "dialogs/";
                !a.blockless && j("Form", "form",
                    f + "form.js");
                j("Checkbox", "checkbox", f + "checkbox.js");
                j("Radio", "radio", f + "radio.js");
                j("TextField", "textfield", f + "textfield.js");
                j("Textarea", "textarea", f + "textarea.js");
                j("Select", "select", f + "select.js");
                j("Button", "button", f + "button.js");
                var h = a.plugins.image;
                h && !a.plugins.image2 && j("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js");
                j("HiddenField", "hiddenfield", f + "hiddenfield.js");
                if (a.addMenuItems) {
                    j = {
                        checkbox: {
                            label: e.forms.checkboxAndRadio.checkboxTitle,
                            command: "checkbox",
                            group: "checkbox"
                        },
                        radio: { label: e.forms.checkboxAndRadio.radioTitle, command: "radio", group: "radio" },
                        textfield: { label: e.forms.textfield.title, command: "textfield", group: "textfield" },
                        hiddenfield: { label: e.forms.hidden.title, command: "hiddenfield", group: "hiddenfield" },
                        button: { label: e.forms.button.title, command: "button", group: "button" },
                        select: { label: e.forms.select.title, command: "select", group: "select" },
                        textarea: { label: e.forms.textarea.title, command: "textarea", group: "textarea" }
                    };
                    if (h) j.imagebutton = {
                        label: e.image.titleButton,
                        command: "imagebutton",
                        group: "imagebutton"
                    };
                    !a.blockless && (j.form = { label: e.forms.form.menu, command: "form", group: "form" });
                    a.addMenuItems(j)
                }
                if (a.contextMenu) {
                    !a.blockless && a.contextMenu.addListener(function(a, b, c) { if ((a = c.contains("form", 1)) && !a.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } });
                    a.contextMenu.addListener(function(a) {
                        if (a && !a.isReadOnly()) {
                            var b = a.getName();
                            if (b == "select") return { select: CKEDITOR.TRISTATE_OFF };
                            if (b == "textarea") return { textarea: CKEDITOR.TRISTATE_OFF };
                            if (b == "input") {
                                var d =
                                    a.getAttribute("type") || "text";
                                switch (d) {
                                    case "button":
                                    case "submit":
                                    case "reset":
                                        return { button: CKEDITOR.TRISTATE_OFF };
                                    case "checkbox":
                                        return { checkbox: CKEDITOR.TRISTATE_OFF };
                                    case "radio":
                                        return { radio: CKEDITOR.TRISTATE_OFF };
                                    case "image":
                                        return h ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null }
                                if (c[d]) return { textfield: CKEDITOR.TRISTATE_OFF }
                            }
                            if (b == "img" && a.data("cke-real-element-type") == "hiddenfield") return { hiddenfield: CKEDITOR.TRISTATE_OFF }
                        }
                    })
                }
                a.on("doubleclick", function(b) {
                    var d = b.data.element;
                    if (!a.blockless &&
                        d.is("form")) b.data.dialog = "form";
                    else if (d.is("select")) b.data.dialog = "select";
                    else if (d.is("textarea")) b.data.dialog = "textarea";
                    else if (d.is("img") && d.data("cke-real-element-type") == "hiddenfield") b.data.dialog = "hiddenfield";
                    else if (d.is("input")) {
                        d = d.getAttribute("type") || "text";
                        switch (d) {
                            case "button":
                            case "submit":
                            case "reset":
                                b.data.dialog = "button"; break;
                            case "checkbox":
                                b.data.dialog = "checkbox"; break;
                            case "radio":
                                b.data.dialog = "radio"; break;
                            case "image":
                                b.data.dialog = "imagebutton" }
                        if (c[d]) b.data.dialog =
                            "textfield"
                    }
                })
            },
            afterInit: function(a) { var e = a.dataProcessor,
                    b = e && e.htmlFilter,
                    e = e && e.dataFilter;
                CKEDITOR.env.ie && b && b.addRules({ elements: { input: function(a) { var a = a.attributes,
                                b = a.type; if (!b) a.type = "text";
                            (b == "checkbox" || b == "radio") && a.value == "on" && delete a.value } } }, { applyToAll: true });
                e && e.addRules({ elements: { input: function(b) { if (b.attributes.type == "hidden") return a.createFakeParserElement(b, "cke_hidden", "hiddenfield") } } }, { applyToAll: true }) }
        }),
        function() {
            var a = {
                canUndo: false,
                exec: function(a) {
                    var b =
                        a.document.createElement("hr");
                    a.insertElement(b)
                },
                allowedContent: "hr",
                requiredContent: "hr"
            };
            CKEDITOR.plugins.add("horizontalrule", { init: function(e) { if (!e.blockless) { e.addCommand("horizontalrule", a);
                        e.ui.addButton && e.ui.addButton("HorizontalRule", { label: e.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" }) } } })
        }(), CKEDITOR.plugins.add("htmlwriter", {
            init: function(a) {
                var e = new CKEDITOR.htmlWriter;
                e.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
                e.indentationChars = a.config.dataIndentationChars ||
                    "\t";
                a.dataProcessor.writer = e
            }
        }), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
            base: CKEDITOR.htmlParser.basicWriter,
            $: function() {
                this.base();
                this.indentationChars = "\t";
                this.selfClosingEnd = " />";
                this.lineBreakChars = "\n";
                this.sortAttributes = 1;
                this._.indent = 0;
                this._.indentation = "";
                this._.inPre = 0;
                this._.rules = {};
                var a = CKEDITOR.dtd,
                    e;
                for (e in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem, a.$tableContent)) this.setRules(e, {
                    indent: !a[e]["#"],
                    breakBeforeOpen: 1,
                    breakBeforeClose: !a[e]["#"],
                    breakAfterClose: 1,
                    needsSpace: e in a.$block && !(e in { li: 1, dt: 1, dd: 1 })
                });
                this.setRules("br", { breakAfterOpen: 1 });
                this.setRules("title", { indent: 0, breakAfterOpen: 0 });
                this.setRules("style", { indent: 0, breakBeforeClose: 1 });
                this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
            },
            proto: {
                openTag: function(a) {
                    var e = this._.rules[a];
                    this._.afterCloser && (e && e.needsSpace && this._.needsSpace) && this._.output.push("\n");
                    if (this._.indent) this.indentation();
                    else if (e && e.breakBeforeOpen) { this.lineBreak();
                        this.indentation() } this._.output.push("<",
                        a);
                    this._.afterCloser = 0
                },
                openTagClose: function(a, e) { var b = this._.rules[a]; if (e) { this._.output.push(this.selfClosingEnd); if (b && b.breakAfterClose) this._.needsSpace = b.needsSpace } else { this._.output.push(">"); if (b && b.indent) this._.indentation = this._.indentation + this.indentationChars } b && b.breakAfterOpen && this.lineBreak();
                    a == "pre" && (this._.inPre = 1) },
                attribute: function(a, e) {
                    if (typeof e == "string") { this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "&"));
                        e = CKEDITOR.tools.htmlEncodeAttr(e) } this._.output.push(" ",
                        a, '="', e, '"')
                },
                closeTag: function(a) { var e = this._.rules[a]; if (e && e.indent) this._.indentation = this._.indentation.substr(this.indentationChars.length); if (this._.indent) this.indentation();
                    else if (e && e.breakBeforeClose) { this.lineBreak();
                        this.indentation() } this._.output.push("</", a, ">");
                    a == "pre" && (this._.inPre = 0); if (e && e.breakAfterClose) { this.lineBreak();
                        this._.needsSpace = e.needsSpace } this._.afterCloser = 1 },
                text: function(a) { if (this._.indent) { this.indentation();!this._.inPre && (a = CKEDITOR.tools.ltrim(a)) } this._.output.push(a) },
                comment: function(a) { this._.indent && this.indentation();
                    this._.output.push("<\!--", a, "--\>") },
                lineBreak: function() {!this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars);
                    this._.indent = 1 },
                indentation: function() {!this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                    this._.indent = 0 },
                reset: function() { this._.output = [];
                    this._.indent = 0;
                    this._.indentation = "";
                    this._.afterCloser = 0;
                    this._.inPre = 0 },
                setRules: function(a, e) {
                    var b = this._.rules[a];
                    b ? CKEDITOR.tools.extend(b,
                        e, true) : this._.rules[a] = e
                }
            }
        }),
        function() {
            CKEDITOR.plugins.add("iframe", {
                requires: "dialog,fakeobjects",
                onLoad: function() { CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") },
                init: function(a) {
                    var e = a.lang.iframe,
                        b = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
                    a.plugins.dialogadvtab && (b = b + (";iframe" +
                        a.plugins.dialogadvtab.allowedContent({ id: 1, classes: 1, styles: 1 })));
                    CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
                    a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", { allowedContent: b, requiredContent: "iframe" }));
                    a.ui.addButton && a.ui.addButton("Iframe", { label: e.toolbar, command: "iframe", toolbar: "insert,80" });
                    a.on("doubleclick", function(a) { var b = a.data.element; if (b.is("img") && b.data("cke-real-element-type") == "iframe") a.data.dialog = "iframe" });
                    a.addMenuItems && a.addMenuItems({
                        iframe: {
                            label: e.title,
                            command: "iframe",
                            group: "image"
                        }
                    });
                    a.contextMenu && a.contextMenu.addListener(function(a) { if (a && a.is("img") && a.data("cke-real-element-type") == "iframe") return { iframe: CKEDITOR.TRISTATE_OFF } })
                },
                afterInit: function(a) { var e = a.dataProcessor;
                    (e = e && e.dataFilter) && e.addRules({ elements: { iframe: function(b) { return a.createFakeParserElement(b, "cke_iframe", "iframe", true) } } }) }
            })
        }(),
        function() {
            function a(a, c) { c || (c = a.getSelection().getSelectedElement()); if (c && c.is("img") && !c.data("cke-realelement") && !c.isReadOnly()) return c }

            function e(a) { var c = a.getStyle("float"); if (c == "inherit" || c == "none") c = 0;
                c || (c = a.getAttribute("align")); return c } CKEDITOR.plugins.add("image", {
                requires: "dialog",
                init: function(b) {
                    if (!b.plugins.image2) {
                        CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                        var c = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                        CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (c = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                        b.addCommand("image",
                            new CKEDITOR.dialogCommand("image", { allowedContent: c, requiredContent: "img[alt,src]", contentTransformations: [
                                    ["img{width}: sizeToStyle", "img[width]: sizeToAttribute"],
                                    ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]
                                ] }));
                        b.ui.addButton && b.ui.addButton("Image", { label: b.lang.common.image, command: "image", toolbar: "insert,10" });
                        b.on("doubleclick", function(a) { var b = a.data.element; if (b.is("img") && !b.data("cke-realelement") && !b.isReadOnly()) a.data.dialog = "image" });
                        b.addMenuItems && b.addMenuItems({
                            image: {
                                label: b.lang.image.menu,
                                command: "image",
                                group: "image"
                            }
                        });
                        b.contextMenu && b.contextMenu.addListener(function(c) { if (a(b, c)) return { image: CKEDITOR.TRISTATE_OFF } })
                    }
                },
                afterInit: function(b) {
                    function c(c) {
                        var i = b.getCommand("justify" + c);
                        if (i) {
                            if (c == "left" || c == "right") i.on("exec", function(i) { var f = a(b),
                                    h; if (f) { h = e(f); if (h == c) { f.removeStyle("float");
                                        c == e(f) && f.removeAttribute("align") } else f.setStyle("float", c);
                                    i.cancel() } });
                            i.on("refresh", function(i) {
                                var f = a(b);
                                if (f) {
                                    f = e(f);
                                    this.setState(f == c ? CKEDITOR.TRISTATE_ON : c == "right" || c == "left" ?
                                        CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                    i.cancel()
                                }
                            })
                        }
                    }
                    if (!b.plugins.image2) { c("left");
                        c("right");
                        c("center");
                        c("block") }
                }
            })
        }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0,
        function() {
            function a(a, d) {
                var i, j;
                d.on("refresh", function(a) { var c = [e],
                        d; for (d in a.data.states) c.push(a.data.states[d]);
                    this.setState(CKEDITOR.tools.search(c, b) ? b : e) }, d, null, 100);
                d.on("exec", function(b) { i = a.getSelection();
                    j = i.createBookmarks(1); if (!b.data) b.data = {};
                    b.data.done = false }, d, null, 0);
                d.on("exec", function() {
                    a.forceNextSelectionCheck();
                    i.selectBookmarks(j)
                }, d, null, 100)
            }
            var e = CKEDITOR.TRISTATE_DISABLED,
                b = CKEDITOR.TRISTATE_OFF;
            CKEDITOR.plugins.add("indent", {
                init: function(b) {
                    var d = CKEDITOR.plugins.indent.genericDefinition;
                    a(b, b.addCommand("indent", new d(true)));
                    a(b, b.addCommand("outdent", new d));
                    if (b.ui.addButton) { b.ui.addButton("Indent", { label: b.lang.indent.indent, command: "indent", directional: true, toolbar: "indent,20" });
                        b.ui.addButton("Outdent", { label: b.lang.indent.outdent, command: "outdent", directional: true, toolbar: "indent,10" }) } b.on("dirChanged",
                        function(a) {
                            var d = b.createRange(),
                                e = a.data.node;
                            d.setStartBefore(e);
                            d.setEndAfter(e);
                            for (var h = new CKEDITOR.dom.walker(d), k; k = h.next();)
                                if (k.type == CKEDITOR.NODE_ELEMENT)
                                    if (!k.equals(e) && k.getDirection()) { d.setStartAfter(k);
                                        h = new CKEDITOR.dom.walker(d) } else {
                                        var g = b.config.indentClasses;
                                        if (g)
                                            for (var m = a.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"], p = 0; p < g.length; p++)
                                                if (k.hasClass(g[p] + m[0])) { k.removeClass(g[p] + m[0]);
                                                    k.addClass(g[p] + m[1]) }
                                        g = k.getStyle("margin-right");
                                        m = k.getStyle("margin-left");
                                        g ? k.setStyle("margin-left",
                                            g) : k.removeStyle("margin-left");
                                        m ? k.setStyle("margin-right", m) : k.removeStyle("margin-right")
                                    }
                        })
                }
            });
            CKEDITOR.plugins.indent = {
                genericDefinition: function(a) { this.isIndent = !!a;
                    this.startDisabled = !this.isIndent },
                specificDefinition: function(a, b, e) { this.name = b;
                    this.editor = a;
                    this.jobs = {};
                    this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
                    this.isIndent = !!e;
                    this.relatedGlobal = e ? "indent" : "outdent";
                    this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9;
                    this.database = {} },
                registerCommands: function(a, b) {
                    a.on("pluginsLoaded", function() {
                        for (var a in b)(function(a,
                            b) { var c = a.getCommand(b.relatedGlobal),
                                d; for (d in b.jobs) { c.on("exec", function(c) { if (!c.data.done) { a.fire("lockSnapshot"); if (b.execJob(a, d)) c.data.done = true;
                                        a.fire("unlockSnapshot");
                                        CKEDITOR.dom.element.clearAllMarkers(b.database) } }, this, null, d);
                                c.on("refresh", function(c) { if (!c.data.states) c.data.states = {};
                                    c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path) }, this, null, d) } a.addFeature(b) })(this, b[a])
                    })
                }
            };
            CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function() {} };
            CKEDITOR.plugins.indent.specificDefinition.prototype = { execJob: function(a, b) { var i = this.jobs[b]; if (i.state != e) return i.exec.call(this, a) }, refreshJob: function(a, b, i) { b = this.jobs[b];
                    b.state = a.activeFilter.checkFeature(this) ? b.refresh.call(this, a, i) : e; return b.state }, getContext: function(a) { return a.contains(this.context) } }
        }(),
        function() {
            function a(a, b, c) {
                if (!a.getCustomData("indent_processed")) {
                    var d = this.editor,
                        g = this.isIndent;
                    if (b) {
                        d = a.$.className.match(this.classNameRegex);
                        c = 0;
                        if (d) { d = d[1];
                            c = CKEDITOR.tools.indexOf(b, d) + 1 }
                        if ((c = c + (g ? 1 : -1)) < 0) return;
                        c =
                            Math.min(c, b.length);
                        c = Math.max(c, 0);
                        a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, ""));
                        c > 0 && a.addClass(b[c - 1])
                    } else { var b = e(a, c),
                            c = parseInt(a.getStyle(b), 10),
                            i = d.config.indentOffset || 40;
                        isNaN(c) && (c = 0);
                        c = c + (g ? 1 : -1) * i; if (c < 0) return;
                        c = Math.max(c, 0);
                        c = Math.ceil(c / i) * i;
                        a.setStyle(b, c ? c + (d.config.indentUnit || "px") : "");
                        a.getAttribute("style") === "" && a.removeAttribute("style") } CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1)
                }
            }

            function e(a, b) {
                return (b || a.getComputedStyle("direction")) ==
                    "ltr" ? "margin-left" : "margin-right"
            }
            var b = CKEDITOR.dtd.$listItem,
                c = CKEDITOR.dtd.$list,
                d = CKEDITOR.TRISTATE_DISABLED,
                i = CKEDITOR.TRISTATE_OFF;
            CKEDITOR.plugins.add("indentblock", {
                requires: "indent",
                init: function(j) {
                    function f() {
                        h.specificDefinition.apply(this, arguments);
                        this.allowedContent = { "div h1 h2 h3 h4 h5 h6 ol p pre ul": { propertiesOnly: true, styles: !k ? "margin-left,margin-right" : null, classes: k || null } };
                        if (this.enterBr) this.allowedContent.div = true;
                        this.requiredContent = (this.enterBr ? "div" : "p") + (k ? "(" +
                            k.join(",") + ")" : "{margin-left}");
                        this.jobs = {
                            20: {
                                refresh: function(a, c) { var f = c.block || c.blockLimit; if (!f.is(b)) var h = f.getAscendant(b),
                                        f = h && c.contains(h) || f;
                                    f.is(b) && (f = f.getParent()); if (!this.enterBr && !this.getContext(c)) return d; if (k) { var h = k,
                                            f = f.$.className.match(this.classNameRegex),
                                            j = this.isIndent,
                                            h = f ? j ? f[1] != h.slice(-1) : true : j; return h ? i : d } return this.isIndent ? i : f ? CKEDITOR[(parseInt(f.getStyle(e(f)), 10) || 0) <= 0 ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : d },
                                exec: function(b) {
                                    var d = b.getSelection(),
                                        d = d &&
                                        d.getRanges()[0],
                                        e;
                                    if (e = b.elementPath().contains(c)) a.call(this, e, k);
                                    else { d = d.createIterator();
                                        b = b.config.enterMode;
                                        d.enforceRealBlocks = true; for (d.enlargeBr = b != CKEDITOR.ENTER_BR; e = d.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) e.isReadOnly() || a.call(this, e, k) }
                                    return true
                                }
                            }
                        }
                    }
                    var h = CKEDITOR.plugins.indent,
                        k = j.config.indentClasses;
                    h.registerCommands(j, { indentblock: new f(j, "indentblock", true), outdentblock: new f(j, "outdentblock") });
                    CKEDITOR.tools.extend(f.prototype, h.specificDefinition.prototype, {
                        context: {
                            div: 1,
                            dl: 1,
                            h1: 1,
                            h2: 1,
                            h3: 1,
                            h4: 1,
                            h5: 1,
                            h6: 1,
                            ul: 1,
                            ol: 1,
                            p: 1,
                            pre: 1,
                            table: 1
                        },
                        classNameRegex: k ? RegExp("(?:^|\\s+)(" + k.join("|") + ")(?=$|\\s)") : null
                    })
                }
            })
        }(),
        function() {
            function a(a) {
                function c(e) {
                    for (var h = q.startContainer, j = q.endContainer; h && !h.getParent().equals(e);) h = h.getParent();
                    for (; j && !j.getParent().equals(e);) j = j.getParent();
                    if (!h || !j) return false;
                    for (var o = h, h = [], n = false; !n;) { o.equals(j) && (n = true);
                        h.push(o);
                        o = o.getNext() }
                    if (h.length < 1) return false;
                    o = e.getParents(true);
                    for (j = 0; j < o.length; j++)
                        if (o[j].getName &&
                            i[o[j].getName()]) { e = o[j]; break }
                    for (var o = d.isIndent ? 1 : -1, j = h[0], h = h[h.length - 1], n = CKEDITOR.plugins.list.listToArray(e, g), x = n[h.getCustomData("listarray_index")].indent, j = j.getCustomData("listarray_index"); j <= h.getCustomData("listarray_index"); j++) { n[j].indent = n[j].indent + o; if (o > 0) { var p = n[j].parent;
                            n[j].parent = new CKEDITOR.dom.element(p.getName(), p.getDocument()) } }
                    for (j = h.getCustomData("listarray_index") + 1; j < n.length && n[j].indent > x; j++) n[j].indent = n[j].indent + o;
                    h = CKEDITOR.plugins.list.arrayToList(n,
                        g, null, a.config.enterMode, e.getDirection());
                    if (!d.isIndent) { var r; if ((r = e.getParent()) && r.is("li"))
                            for (var o = h.listNode.getChildren(), y = [], z, j = o.count() - 1; j >= 0; j--)(z = o.getItem(j)) && (z.is && z.is("li")) && y.push(z) } h && h.listNode.replace(e);
                    if (y && y.length)
                        for (j = 0; j < y.length; j++) { for (z = e = y[j];
                                (z = z.getNext()) && z.is && z.getName() in i;) { CKEDITOR.env.needsNbspFiller && !e.getFirst(b) && e.append(q.document.createText(" "));
                                e.append(z) } e.insertAfter(r) } h && a.fire("contentDomInvalidated");
                    return true
                }
                for (var d = this,
                        g = this.database, i = this.context, j = a.getSelection(), j = (j && j.getRanges()).createIterator(), q; q = j.getNextRange();) {
                    for (var o = q.getCommonAncestor(); o && !(o.type == CKEDITOR.NODE_ELEMENT && i[o.getName()]);) { if (a.editable().equals(o)) { o = false; break } o = o.getParent() } o || (o = q.startPath().contains(i)) && q.setEndAt(o, CKEDITOR.POSITION_BEFORE_END);
                    if (!o) {
                        var n = q.getEnclosedNode();
                        if (n && n.type == CKEDITOR.NODE_ELEMENT && n.getName() in i) {
                            q.setStartAt(n, CKEDITOR.POSITION_AFTER_START);
                            q.setEndAt(n, CKEDITOR.POSITION_BEFORE_END);
                            o = n
                        }
                    }
                    if (o && q.startContainer.type == CKEDITOR.NODE_ELEMENT && q.startContainer.getName() in i) { n = new CKEDITOR.dom.walker(q);
                        n.evaluator = e;
                        q.startContainer = n.next() }
                    if (o && q.endContainer.type == CKEDITOR.NODE_ELEMENT && q.endContainer.getName() in i) { n = new CKEDITOR.dom.walker(q);
                        n.evaluator = e;
                        q.endContainer = n.previous() }
                    if (o) return c(o)
                }
                return 0
            }

            function e(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") }

            function b(a) { return c(a) && d(a) }
            var c = CKEDITOR.dom.walker.whitespaces(true),
                d = CKEDITOR.dom.walker.bookmark(false,
                    true),
                i = CKEDITOR.TRISTATE_DISABLED,
                j = CKEDITOR.TRISTATE_OFF;
            CKEDITOR.plugins.add("indentlist", {
                requires: "indent",
                init: function(b) {
                    function c(b) {
                        d.specificDefinition.apply(this, arguments);
                        this.requiredContent = ["ul", "ol"];
                        b.on("key", function(a) { if (b.mode == "wysiwyg" && a.data.keyCode == this.indentKey) { var c = this.getContext(b.elementPath()); if (c && (!this.isIndent || !CKEDITOR.plugins.indentList.firstItemInPath(this.context, b.elementPath(), c))) { b.execCommand(this.relatedGlobal);
                                    a.cancel() } } }, this);
                        this.jobs[this.isIndent ?
                            10 : 30] = { refresh: this.isIndent ? function(a, b) { var c = this.getContext(b),
                                    d = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c); return !c || !this.isIndent || d ? i : j } : function(a, b) { return !this.getContext(b) || this.isIndent ? i : j }, exec: CKEDITOR.tools.bind(a, this) }
                    }
                    var d = CKEDITOR.plugins.indent;
                    d.registerCommands(b, { indentlist: new c(b, "indentlist", true), outdentlist: new c(b, "outdentlist") });
                    CKEDITOR.tools.extend(c.prototype, d.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
                }
            });
            CKEDITOR.plugins.indentList = {};
            CKEDITOR.plugins.indentList.firstItemInPath = function(a, b, c) { var d = b.contains(e);
                c || (c = b.contains(a)); return c && d && d.equals(c.getFirst(e)) }
        }(),
        function() {
            function a(a, b) {
                var b = b === void 0 || b,
                    e;
                if (b) e = a.getComputedStyle("text-align");
                else { for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) { e = a.getParent(); if (!e) break;
                        a = e } e = a.getStyle("text-align") || a.getAttribute("align") || "" } e && (e = e.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));
                !e && b && (e = a.getComputedStyle("direction") ==
                    "rtl" ? "right" : "left");
                return e
            }

            function e(a, b, e) {
                this.editor = a;
                this.name = b;
                this.value = e;
                this.context = "p";
                var b = a.config.justifyClasses,
                    j = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div";
                if (b) { switch (e) {
                        case "left":
                            this.cssClassName = b[0]; break;
                        case "center":
                            this.cssClassName = b[1]; break;
                        case "right":
                            this.cssClassName = b[2]; break;
                        case "justify":
                            this.cssClassName = b[3] } this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?=$|\\s)");
                    this.requiredContent = j + "(" + this.cssClassName + ")" } else this.requiredContent =
                    j + "{text-align}";
                this.allowedContent = { "caption div h1 h2 h3 h4 h5 h6 p pre td th li": { propertiesOnly: true, styles: this.cssClassName ? null : "text-align", classes: this.cssClassName || null } };
                if (a.config.enterMode == CKEDITOR.ENTER_BR) this.allowedContent.div = true
            }

            function b(a) {
                var b = a.editor,
                    e = b.createRange();
                e.setStartBefore(a.data.node);
                e.setEndAfter(a.data.node);
                for (var j = new CKEDITOR.dom.walker(e), f; f = j.next();)
                    if (f.type == CKEDITOR.NODE_ELEMENT)
                        if (!f.equals(a.data.node) && f.getDirection()) {
                            e.setStartAfter(f);
                            j = new CKEDITOR.dom.walker(e)
                        } else { var h = b.config.justifyClasses; if (h)
                                if (f.hasClass(h[0])) { f.removeClass(h[0]);
                                    f.addClass(h[2]) } else if (f.hasClass(h[2])) { f.removeClass(h[2]);
                                f.addClass(h[0]) } h = f.getStyle("text-align");
                            h == "left" ? f.setStyle("text-align", "right") : h == "right" && f.setStyle("text-align", "left") }
            }
            e.prototype = {
                exec: function(b) {
                    var d = b.getSelection(),
                        e = b.config.enterMode;
                    if (d) {
                        for (var j = d.createBookmarks(), f = d.getRanges(), h = this.cssClassName, k, g, m = b.config.useComputedState, m = m === void 0 || m, p =
                                f.length - 1; p >= 0; p--) { k = f[p].createIterator(); for (k.enlargeBr = e != CKEDITOR.ENTER_BR; g = k.getNextParagraph(e == CKEDITOR.ENTER_P ? "p" : "div");)
                                if (!g.isReadOnly()) { g.removeAttribute("align");
                                    g.removeStyle("text-align"); var q = h && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex, ""))),
                                        o = this.state == CKEDITOR.TRISTATE_OFF && (!m || a(g, true) != this.value);
                                    h ? o ? g.addClass(h) : q || g.removeAttribute("class") : o && g.setStyle("text-align", this.value) } } b.focus();
                        b.forceNextSelectionCheck();
                        d.selectBookmarks(j)
                    }
                },
                refresh: function(b, d) { var e = d.block || d.blockLimit;
                    this.setState(e.getName() != "body" && a(e, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }
            };
            CKEDITOR.plugins.add("justify", {
                init: function(a) {
                    if (!a.blockless) {
                        var d = new e(a, "justifyleft", "left"),
                            i = new e(a, "justifycenter", "center"),
                            j = new e(a, "justifyright", "right"),
                            f = new e(a, "justifyblock", "justify");
                        a.addCommand("justifyleft", d);
                        a.addCommand("justifycenter", i);
                        a.addCommand("justifyright", j);
                        a.addCommand("justifyblock",
                            f);
                        if (a.ui.addButton) { a.ui.addButton("JustifyLeft", { label: a.lang.justify.left, command: "justifyleft", toolbar: "align,10" });
                            a.ui.addButton("JustifyCenter", { label: a.lang.justify.center, command: "justifycenter", toolbar: "align,20" });
                            a.ui.addButton("JustifyRight", { label: a.lang.justify.right, command: "justifyright", toolbar: "align,30" });
                            a.ui.addButton("JustifyBlock", { label: a.lang.justify.block, command: "justifyblock", toolbar: "align,40" }) } a.on("dirChanged", b)
                    }
                }
            })
        }(), CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu",
            onLoad: function() {
                var a = function(a) {
                    var b = this._,
                        c = b.menu;
                    if (b.state !== CKEDITOR.TRISTATE_DISABLED)
                        if (b.on && c) c.hide();
                        else {
                            b.previousState = b.state;
                            if (!c) { c = b.menu = new CKEDITOR.menu(a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.common.options } } });
                                c.onHide = CKEDITOR.tools.bind(function() { var c = this.command ? a.getCommand(this.command).modes : this.modes;
                                    this.setState(!c || c[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED);
                                    b.on = 0 }, this);
                                this.onMenu && c.addListener(this.onMenu) } this.setState(CKEDITOR.TRISTATE_ON);
                            b.on = 1;
                            setTimeout(function() { c.show(CKEDITOR.document.getById(b.id), 4) }, 0)
                        }
                };
                CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function(e) { delete e.panel;
                        this.base(e);
                        this.hasArrow = true;
                        this.click = a }, statics: { handler: { create: function(a) { return new CKEDITOR.ui.menuButton(a) } } } })
            },
            beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
        }), CKEDITOR.UI_MENUBUTTON = "menubutton", "use strict",
        function() {
            CKEDITOR.plugins.add("language", {
                requires: "menubutton",
                init: function(a) {
                    var e = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"],
                        b = this,
                        c = a.lang.language,
                        d = {},
                        i, j, f, h;
                    a.addCommand("language", { allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", contextSensitive: true, exec: function(a, b) { var c = d["language_" + b]; if (c) a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style) }, refresh: function(a) { this.setState(b.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) } });
                    for (h = 0; h < e.length; h++) {
                        i =
                            e[h].split(":");
                        j = i[0];
                        f = "language_" + j;
                        d[f] = { label: i[1], langId: j, group: "language", order: h, ltr: ("" + i[2]).toLowerCase() != "rtl", onClick: function() { a.execCommand("language", this.langId) }, role: "menuitemcheckbox" };
                        d[f].style = new CKEDITOR.style({ element: "span", attributes: { lang: j, dir: d[f].ltr ? "ltr" : "rtl" } })
                    }
                    d.language_remove = { label: c.remove, group: "language_remove", state: CKEDITOR.TRISTATE_DISABLED, order: d.length, onClick: function() { var c = b.getCurrentLangElement(a);
                            c && a.execCommand("language", c.getAttribute("lang")) } };
                    a.addMenuGroup("language", 1);
                    a.addMenuGroup("language_remove");
                    a.addMenuItems(d);
                    a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, { label: c.button, allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", toolbar: "bidi,30", command: "language", onMenu: function() { var c = {},
                                e = b.getCurrentLangElement(a),
                                f; for (f in d) c[f] = CKEDITOR.TRISTATE_OFF;
                            c.language_remove = e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; if (e) c["language_" + e.getAttribute("lang")] = CKEDITOR.TRISTATE_ON; return c } })
                },
                getCurrentLangElement: function(a) {
                    var e =
                        a.elementPath(),
                        a = e && e.elements,
                        b;
                    if (e)
                        for (var c = 0; c < a.length; c++) { e = a[c];!b && (e.getName() == "span" && e.hasAttribute("dir") && e.hasAttribute("lang")) && (b = e) }
                    return b
                }
            })
        }(), "use strict",
        function() {
            function a(a) { return a.replace(/'/g, "\\$&") }

            function e(a) { for (var b, c = a.length, d = [], e = 0; e < c; e++) { b = a.charCodeAt(e);
                    d.push(b) } return "String.fromCharCode(" + d.join(",") + ")" }

            function b(b, c) {
                var d = b.plugins.link,
                    e = d.compiledProtectionFunction.params,
                    f, g;
                g = [d.compiledProtectionFunction.name, "("];
                for (var h = 0; h < e.length; h++) {
                    d =
                        e[h].toLowerCase();
                    f = c[d];
                    h > 0 && g.push(",");
                    g.push("'", f ? a(encodeURIComponent(c[d])) : "", "'")
                }
                g.push(")");
                return g.join("")
            }

            function c(a) { var a = a.config.emailProtection || "",
                    b; if (a && a != "encode") { b = {};
                    a.replace(/^([^(]+)\(([^)]+)\)$/, function(a, c, d) { b.name = c;
                        b.params = [];
                        d.replace(/[^,\s]+/g, function(a) { b.params.push(a) }) }) } return b } CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects",
                onLoad: function() {
                    function a(b) { return c.replace(/%1/g, b == "rtl" ? "right" : "left").replace(/%2/g, "cke_contents_" + b) }
                    var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
                        c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                    CKEDITOR.addCss(a("ltr") + a("rtl"))
                },
                init: function(a) {
                    var b = "a[!href]";
                    CKEDITOR.dialog.isTabEnabled(a,
                        "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));
                    CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]"));
                    a.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: b, requiredContent: "a[href]" }));
                    a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" }));
                    a.addCommand("unlink", new CKEDITOR.unlinkCommand);
                    a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                    a.setKeystroke(CKEDITOR.CTRL + 76, "link");
                    if (a.ui.addButton) { a.ui.addButton("Link", { label: a.lang.link.toolbar, command: "link", toolbar: "links,10" });
                        a.ui.addButton("Unlink", { label: a.lang.link.unlink, command: "unlink", toolbar: "links,20" });
                        a.ui.addButton("Anchor", { label: a.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" }) } CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                    CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
                    a.on("doubleclick", function(b) {
                        var c = CKEDITOR.plugins.link.getSelectedLink(a) ||
                            b.data.element;
                        if (!c.isReadOnly())
                            if (c.is("a")) { b.data.dialog = c.getAttribute("name") && (!c.getAttribute("href") || !c.getChildCount()) ? "anchor" : "link";
                                b.data.link = c } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c)) b.data.dialog = "anchor"
                    }, null, null, 0);
                    a.on("doubleclick", function(b) { b.data.dialog in { link: 1, anchor: 1 } && b.data.link && a.getSelection().selectElement(b.data.link) }, null, null, 20);
                    a.addMenuItems && a.addMenuItems({
                        anchor: { label: a.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 },
                        removeAnchor: { label: a.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 },
                        link: { label: a.lang.link.menu, command: "link", group: "link", order: 1 },
                        unlink: { label: a.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                    });
                    a.contextMenu && a.contextMenu.addListener(function(b) {
                        if (!b || b.isReadOnly()) return null;
                        b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b);
                        if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null;
                        var c = {};
                        b.getAttribute("href") && b.getChildCount() && (c = {
                            link: CKEDITOR.TRISTATE_OFF,
                            unlink: CKEDITOR.TRISTATE_OFF
                        });
                        if (b && b.hasAttribute("name")) c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF;
                        return c
                    });
                    this.compiledProtectionFunction = c(a)
                },
                afterInit: function(a) {
                    a.dataProcessor.dataFilter.addRules({ elements: { a: function(b) { return !b.attributes.name ? null : !b.children.length ? a.createFakeParserElement(b, "cke_anchor", "anchor") : null } } });
                    var b = a._.elementsPath && a._.elementsPath.filters;
                    b && b.push(function(b, c) {
                        if (c == "a" && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") &&
                                (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
                    })
                }
            });
            var d = /^javascript:/,
                i = /^mailto:([^?]+)(?:\?(.+))?$/,
                j = /subject=([^;?:@&=$,\/]*)/,
                f = /body=([^;?:@&=$,\/]*)/,
                h = /^#(.*)$/,
                k = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
                g = /^(_(?:self|top|parent|blank))$/,
                m = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
                p = /^javascript:([^(]+)\(([^)]+)\)$/,
                q = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
                o = /(?:^|,)([^=]+)=(\d+|yes|no)/gi,
                n = { id: "advId", dir: "advLangDir", accessKey: "advAccessKey", name: "advName", lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel" };
            CKEDITOR.plugins.link = {
                getSelectedLink: function(a) { var b = a.getSelection(),
                        c = b.getSelectedElement(); if (c && c.is("a")) return c; if (b = b.getRanges()[0]) { b.shrink(CKEDITOR.SHRINK_TEXT); return a.elementPath(b.getCommonAncestor()).contains("a", 1) } return null },
                getEditorAnchors: function(a) { for (var b = a.editable(), c = b.isInline() && !a.plugins.divarea ? a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), d = [], e = 0, f; f = b.getItem(e++);)
                        if (f.data("cke-saved-name") || f.hasAttribute("name")) d.push({ name: f.data("cke-saved-name") || f.getAttribute("name"), id: f.getAttribute("id") }); for (e = 0; f = c.getItem(e++);)(f = this.tryRestoreFakeAnchor(a, f)) && d.push({ name: f.getAttribute("name"), id: f.getAttribute("id") }); return d },
                fakeAnchor: true,
                tryRestoreFakeAnchor: function(a,
                    b) { if (b && b.data("cke-real-element-type") && b.data("cke-real-element-type") == "anchor") { var c = a.restoreRealElement(b); if (c.data("cke-saved-name")) return c } },
                parseLinkAttributes: function(a, b) {
                    var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "",
                        e = a.plugins.link.compiledProtectionFunction,
                        v = a.config.emailProtection,
                        x, u = {};
                    c.match(d) && (v == "encode" ? c = c.replace(m, function(a, b, c) { return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + (c && c.replace(/\\'/g, "'")) }) : v && c.replace(p, function(a,
                        b, c) { if (b == e.name) { u.type = "email"; for (var a = u.email = {}, b = /(^')|('$)/g, c = c.match(/[^,\s]+/g), d = c.length, f, g, h = 0; h < d; h++) { f = decodeURIComponent;
                                g = c[h].replace(b, "").replace(/\\'/g, "'");
                                g = f(g);
                                f = e.params[h].toLowerCase();
                                a[f] = g } a.address = [a.name, a.domain].join("@") } }));
                    if (!u.type)
                        if (v = c.match(h)) { u.type = "anchor";
                            u.anchor = {};
                            u.anchor.name = u.anchor.id = v[1] } else if (v = c.match(i)) { x = c.match(j);
                        c = c.match(f);
                        u.type = "email"; var r = u.email = {};
                        r.address = v[1];
                        x && (r.subject = decodeURIComponent(x[1]));
                        c && (r.body = decodeURIComponent(c[1])) } else if (c &&
                        (x = c.match(k))) { u.type = "url";
                        u.url = {};
                        u.url.protocol = x[1];
                        u.url.url = x[2] }
                    if (b) {
                        if (c = b.getAttribute("target")) u.target = { type: c.match(g) ? c : "frame", name: c };
                        else if (c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(q))
                            for (u.target = { type: "popup", name: c[1] }; v = o.exec(c[2]);)(v[2] == "yes" || v[2] == "1") && !(v[1] in { height: 1, width: 1, top: 1, left: 1 }) ? u.target[v[1]] = true : isFinite(v[2]) && (u.target[v[1]] = v[2]);
                        var c = {},
                            y;
                        for (y in n)(v = b.getAttribute(y)) && (c[n[y]] = v);
                        if (y = b.data("cke-saved-name") || c.advName) c.advName =
                            y;
                        if (!CKEDITOR.tools.isEmpty(c)) u.advanced = c
                    }
                    return u
                },
                getLinkAttributes: function(c, d) {
                    var f = c.config.emailProtection || "",
                        g = {};
                    switch (d.type) {
                        case "url":
                            var f = d.url && d.url.protocol !== void 0 ? d.url.protocol : "http://",
                                h = d.url && CKEDITOR.tools.trim(d.url.url) || "";
                            g["data-cke-saved-href"] = h.indexOf("/") === 0 ? h : f + h;
                            break;
                        case "anchor":
                            f = d.anchor && d.anchor.id;
                            g["data-cke-saved-href"] = "#" + (d.anchor && d.anchor.name || f || "");
                            break;
                        case "email":
                            var j = d.email,
                                h = j.address;
                            switch (f) {
                                case "":
                                case "encode":
                                    var i = encodeURIComponent(j.subject ||
                                            ""),
                                        k = encodeURIComponent(j.body || ""),
                                        j = [];
                                    i && j.push("subject=" + i);
                                    k && j.push("body=" + k);
                                    j = j.length ? "?" + j.join("&") : "";
                                    if (f == "encode") { f = ["javascript:void(location.href='mailto:'+", e(h)];
                                        j && f.push("+'", a(j), "'");
                                        f.push(")") } else f = ["mailto:", h, j];
                                    break;
                                default:
                                    f = h.split("@", 2);
                                    j.name = f[0];
                                    j.domain = f[1];
                                    f = ["javascript:", b(c, j)]
                            }
                            g["data-cke-saved-href"] = f.join("")
                    }
                    if (d.target)
                        if (d.target.type == "popup") {
                            for (var f = ["window.open(this.href, '", d.target.name || "", "', '"], o = ["resizable", "status", "location",
                                    "toolbar", "menubar", "fullscreen", "scrollbars", "dependent"
                                ], h = o.length, i = function(a) { d.target[a] && o.push(a + "=" + d.target[a]) }, j = 0; j < h; j++) o[j] = o[j] + (d.target[o[j]] ? "=yes" : "=no");
                            i("width");
                            i("left");
                            i("height");
                            i("top");
                            f.push(o.join(","), "'); return false;");
                            g["data-cke-pa-onclick"] = f.join("")
                        } else if (d.target.type != "notSet" && d.target.name) g.target = d.target.name;
                    if (d.advanced) { for (var m in n)(f = d.advanced[n[m]]) && (g[m] = f); if (g.name) g["data-cke-saved-name"] = g.name }
                    if (g["data-cke-saved-href"]) g.href =
                        g["data-cke-saved-href"];
                    m = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1 };
                    d.advanced && CKEDITOR.tools.extend(m, n);
                    for (var q in g) delete m[q];
                    return { set: g, removed: CKEDITOR.tools.objectKeys(m) }
                }
            };
            CKEDITOR.unlinkCommand = function() {};
            CKEDITOR.unlinkCommand.prototype = {
                exec: function(a) { var b = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 });
                    a.removeStyle(b) },
                refresh: function(a, b) {
                    var c = b.lastElement && b.lastElement.getAscendant("a", true);
                    c && c.getName() ==
                        "a" && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
                },
                contextSensitive: 1,
                startDisabled: 1,
                requiredContent: "a[href]"
            };
            CKEDITOR.removeAnchorCommand = function() {};
            CKEDITOR.removeAnchorCommand.prototype = {
                exec: function(a) {
                    var b = a.getSelection(),
                        c = b.createBookmarks(),
                        d;
                    if (b && (d = b.getSelectedElement()) && (!d.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d) : d.is("a"))) d.remove(1);
                    else if (d = CKEDITOR.plugins.link.getSelectedLink(a))
                        if (d.hasAttribute("href")) {
                            d.removeAttributes({
                                name: 1,
                                "data-cke-saved-name": 1
                            });
                            d.removeClass("cke_anchor")
                        } else d.remove(1);
                    b.selectBookmarks(c)
                },
                requiredContent: "a[name]"
            };
            CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: true, linkShowTargetTab: true })
        }(),
        function() {
            function a(a, b, c) {
                function d(c) { if ((i = j[c ? "getFirst" : "getLast"]()) && (!i.is || !i.isBlockBoundary()) && (k = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(true))) && (!k.is || !k.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](i) }
                for (var e =
                        CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) { var h = b.contents[g]; if ((h = h.getAscendant("li", true)) && !h.getCustomData("list_item_processed")) { f.push(h);
                        CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", true) } } h = null;
                for (g = 0; g < f.length; g++) { h = f[g].getCustomData("listarray_index");
                    e[h].indent = -1 }
                for (g = h + 1; g < e.length; g++)
                    if (e[g].indent > e[g - 1].indent + 1) { f = e[g - 1].indent + 1 - e[g].indent; for (h = e[g].indent; e[g] && e[g].indent >= h;) { e[g].indent = e[g].indent + f;
                            g++ } g-- }
                var j =
                    CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode,
                    i, k;
                d(true);
                d();
                j.replace(b.root);
                a.fire("contentDomInvalidated")
            }

            function e(a, b) { this.name = a;
                this.context = this.type = b;
                this.allowedContent = b + " li";
                this.requiredContent = b }

            function b(a, b, c, d) { for (var e, f; e = a[d ? "getLast" : "getFirst"](q);) {
                    (f = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", f);
                    e.remove();
                    c ? e[d ? "insertBefore" : "insertAfter"](c) : b.append(e, d) } }

            function c(a) {
                function c(d) {
                    var e = a[d ?
                        "getPrevious" : "getNext"](g);
                    if (e && e.type == CKEDITOR.NODE_ELEMENT && e.is(a.getName())) { b(a, e, null, !d);
                        a.remove();
                        a = e }
                }
                c();
                c(1)
            }

            function d(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] }

            function i(a, d, e) {
                a.fire("saveSnapshot");
                e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
                var f = e.extractContents();
                d.trim(false, true);
                var h = d.createBookmark(),
                    i = new CKEDITOR.dom.elementPath(d.startContainer),
                    k = i.block,
                    i =
                    i.lastElement.getAscendant("li", 1) || k,
                    q = new CKEDITOR.dom.elementPath(e.startContainer),
                    p = q.contains(CKEDITOR.dtd.$listItem),
                    q = q.contains(CKEDITOR.dtd.$list);
                if (k)(k = k.getBogus()) && k.remove();
                else if (q)(k = q.getPrevious(g)) && m(k) && k.remove();
                (k = f.getLast()) && (k.type == CKEDITOR.NODE_ELEMENT && k.is("br")) && k.remove();
                (k = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(k): d.startContainer.append(f);
                if (p)
                    if (f = j(p))
                        if (i.contains(p)) { b(f, p.getParent(), p);
                            f.remove() } else i.append(f);
                for (; e.checkStartOfBlock() &&
                    e.checkEndOfBlock();) { q = e.startPath();
                    f = q.block; if (!f) break; if (f.is("li")) { i = f.getParent();
                        f.equals(i.getLast(g)) && f.equals(i.getFirst(g)) && (f = i) } e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
                    f.remove() } e = e.clone();
                f = a.editable();
                e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
                e = new CKEDITOR.dom.walker(e);
                e.evaluator = function(a) { return g(a) && !m(a) };
                (e = e.next()) && (e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list) && c(e);
                d.moveToBookmark(h);
                d.select();
                a.fire("saveSnapshot")
            }

            function j(a) {
                return (a =
                    a.getLast(g)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in f ? a : null
            }
            var f = { ol: 1, ul: 1 },
                h = CKEDITOR.dom.walker.whitespaces(),
                k = CKEDITOR.dom.walker.bookmark(),
                g = function(a) { return !(h(a) || k(a)) },
                m = CKEDITOR.dom.walker.bogus();
            CKEDITOR.plugins.list = {
                listToArray: function(a, b, c, d, e) {
                    if (!f[a.getName()]) return [];
                    d || (d = 0);
                    c || (c = []);
                    for (var g = 0, h = a.getChildCount(); g < h; g++) {
                        var j = a.getChild(g);
                        j.type == CKEDITOR.NODE_ELEMENT && j.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(j, b, c, d + 1);
                        if (j.$.nodeName.toLowerCase() ==
                            "li") { var i = { parent: a, indent: d, element: j, contents: [] }; if (e) i.grandparent = e;
                            else { i.grandparent = a.getParent(); if (i.grandparent && i.grandparent.$.nodeName.toLowerCase() == "li") i.grandparent = i.grandparent.getParent() } b && CKEDITOR.dom.element.setMarker(b, j, "listarray_index", c.length);
                            c.push(i); for (var k = 0, m = j.getChildCount(), q; k < m; k++) { q = j.getChild(k);
                                q.type == CKEDITOR.NODE_ELEMENT && f[q.getName()] ? CKEDITOR.plugins.list.listToArray(q, b, c, d + 1, i.grandparent) : i.contents.push(q) } }
                    }
                    return c
                },
                arrayToList: function(a,
                    b, c, d, e) {
                    c || (c = 0);
                    if (!a || a.length < c + 1) return null;
                    for (var h, j = a[c].parent.getDocument(), i = new CKEDITOR.dom.documentFragment(j), m = null, q = c, p = Math.max(a[c].indent, 0), z = null, B, A, D = d == CKEDITOR.ENTER_P ? "p" : "div";;) {
                        var C = a[q];
                        h = C.grandparent;
                        B = C.element.getDirection(1);
                        if (C.indent == p) {
                            if (!m || a[q].parent.getName() != m.getName()) { m = a[q].parent.clone(false, 1);
                                e && m.setAttribute("dir", e);
                                i.append(m) } z = m.append(C.element.clone(0, 1));
                            B != m.getDirection(1) && z.setAttribute("dir", B);
                            for (h = 0; h < C.contents.length; h++) z.append(C.contents[h].clone(1,
                                1));
                            q++
                        } else if (C.indent == Math.max(p, 0) + 1) { C = a[q - 1].element.getDirection(1);
                            q = CKEDITOR.plugins.list.arrayToList(a, null, q, d, C != B ? B : null);!z.getChildCount() && (CKEDITOR.env.needsNbspFiller && j.$.documentMode <= 7) && z.append(j.createText(" "));
                            z.append(q.listNode);
                            q = q.nextIndex } else if (C.indent == -1 && !c && h) {
                            if (f[h.getName()]) { z = C.element.clone(false, true);
                                B != h.getDirection(1) && z.setAttribute("dir", B) } else z = new CKEDITOR.dom.documentFragment(j);
                            var m = h.getDirection(1) != B,
                                G = C.element,
                                E = G.getAttribute("class"),
                                H = G.getAttribute("style"),
                                L = z.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || m || H || E),
                                J, P = C.contents.length,
                                I;
                            for (h = 0; h < P; h++) {
                                J = C.contents[h];
                                if (k(J) && P > 1) L ? I = J.clone(1, 1) : z.append(J.clone(1, 1));
                                else if (J.type == CKEDITOR.NODE_ELEMENT && J.isBlockBoundary()) {
                                    m && !J.getDirection() && J.setAttribute("dir", B);
                                    A = J;
                                    var R = G.getAttribute("style");
                                    R && A.setAttribute("style", R.replace(/([^;])$/, "$1;") + (A.getAttribute("style") || ""));
                                    E && J.addClass(E);
                                    A = null;
                                    if (I) { z.append(I);
                                        I = null } z.append(J.clone(1,
                                        1))
                                } else if (L) { if (!A) { A = j.createElement(D);
                                        z.append(A);
                                        m && A.setAttribute("dir", B) } H && A.setAttribute("style", H);
                                    E && A.setAttribute("class", E); if (I) { A.append(I);
                                        I = null } A.append(J.clone(1, 1)) } else z.append(J.clone(1, 1))
                            }
                            if (I) {
                                (A || z).append(I);
                                I = null }
                            if (z.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && q != a.length - 1) { if (CKEDITOR.env.needsBrFiller)(B = z.getLast()) && (B.type == CKEDITOR.NODE_ELEMENT && B.is("br")) && B.remove();
                                B = z.getLast(g);
                                (!B || !(B.type == CKEDITOR.NODE_ELEMENT && B.is(CKEDITOR.dtd.$block))) && z.append(j.createElement("br")) } B =
                                z.$.nodeName.toLowerCase();
                            (B == "div" || B == "p") && z.appendBogus();
                            i.append(z);
                            m = null;
                            q++
                        } else return null;
                        A = null;
                        if (a.length <= q || Math.max(a[q].indent, 0) < p) break
                    }
                    if (b)
                        for (a = i.getFirst(); a;) { if (a.type == CKEDITOR.NODE_ELEMENT) { CKEDITOR.dom.element.clearMarkers(b, a); if (a.getName() in CKEDITOR.dtd.$listItem) { c = a;
                                    j = e = d = void 0; if (d = c.getDirection()) { for (e = c.getParent(); e && !(j = e.getDirection());) e = e.getParent();
                                        d == j && c.removeAttribute("dir") } } } a = a.getNextSourceNode() }
                    return { listNode: i, nextIndex: q }
                }
            };
            var p = /^h[1-6]$/,
                q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
            e.prototype = {
                exec: function(b) {
                    this.refresh(b, b.elementPath());
                    var d = b.config,
                        e = b.getSelection(),
                        h = e && e.getRanges();
                    if (this.state == CKEDITOR.TRISTATE_OFF) { var j = b.editable(); if (j.getFirst(g)) { var i = h.length == 1 && h[0];
                            (d = i && i.getEnclosedNode()) && (d.is && this.type == d.getName()) && this.setState(CKEDITOR.TRISTATE_ON) } else { d.enterMode == CKEDITOR.ENTER_BR ? j.appendBogus() : h[0].fixBlock(1, d.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                            e.selectRanges(h) } }
                    for (var d =
                            e.createBookmarks(true), j = [], k = {}, h = h.createIterator(), m = 0;
                        (i = h.getNextRange()) && ++m;) {
                        var q = i.getBoundaryNodes(),
                            r = q.startNode,
                            y = q.endNode;
                        r.type == CKEDITOR.NODE_ELEMENT && r.getName() == "td" && i.setStartAt(q.startNode, CKEDITOR.POSITION_AFTER_START);
                        y.type == CKEDITOR.NODE_ELEMENT && y.getName() == "td" && i.setEndAt(q.endNode, CKEDITOR.POSITION_BEFORE_END);
                        i = i.createIterator();
                        for (i.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; q = i.getNextParagraph();)
                            if (!q.getCustomData("list_block")) {
                                CKEDITOR.dom.element.setMarker(k,
                                    q, "list_block", 1);
                                for (var z = b.elementPath(q), r = z.elements, y = 0, z = z.blockLimit, B, A = r.length - 1; A >= 0 && (B = r[A]); A--)
                                    if (f[B.getName()] && z.contains(B)) { z.removeCustomData("list_group_object_" + m); if (r = B.getCustomData("list_group_object")) r.contents.push(q);
                                        else { r = { root: B, contents: [q] };
                                            j.push(r);
                                            CKEDITOR.dom.element.setMarker(k, B, "list_group_object", r) } y = 1; break }
                                if (!y) {
                                    y = z;
                                    if (y.getCustomData("list_group_object_" + m)) y.getCustomData("list_group_object_" + m).contents.push(q);
                                    else {
                                        r = { root: y, contents: [q] };
                                        CKEDITOR.dom.element.setMarker(k,
                                            y, "list_group_object_" + m, r);
                                        j.push(r)
                                    }
                                }
                            }
                    }
                    for (B = []; j.length > 0;) {
                        r = j.shift();
                        if (this.state == CKEDITOR.TRISTATE_OFF)
                            if (f[r.root.getName()]) {
                                h = b;
                                m = r;
                                r = k;
                                i = B;
                                y = CKEDITOR.plugins.list.listToArray(m.root, r);
                                z = [];
                                for (q = 0; q < m.contents.length; q++) { A = m.contents[q]; if ((A = A.getAscendant("li", true)) && !A.getCustomData("list_item_processed")) { z.push(A);
                                        CKEDITOR.dom.element.setMarker(r, A, "list_item_processed", true) } }
                                for (var A = m.root.getDocument(), D = void 0, C = void 0, q = 0; q < z.length; q++) {
                                    var G = z[q].getCustomData("listarray_index"),
                                        D = y[G].parent;
                                    if (!D.is(this.type)) { C = A.createElement(this.type);
                                        D.copyAttributes(C, { start: 1, type: 1 });
                                        C.removeStyle("list-style-type");
                                        y[G].parent = C }
                                }
                                r = CKEDITOR.plugins.list.arrayToList(y, r, null, h.config.enterMode);
                                y = void 0;
                                z = r.listNode.getChildCount();
                                for (q = 0; q < z && (y = r.listNode.getChild(q)); q++) y.getName() == this.type && i.push(y);
                                r.listNode.replace(m.root);
                                h.fire("contentDomInvalidated")
                            } else {
                                y = b;
                                q = r;
                                i = B;
                                z = q.contents;
                                h = q.root.getDocument();
                                m = [];
                                if (z.length == 1 && z[0].equals(q.root)) {
                                    r = h.createElement("div");
                                    z[0].moveChildren && z[0].moveChildren(r);
                                    z[0].append(r);
                                    z[0] = r
                                }
                                q = q.contents[0].getParent();
                                for (A = 0; A < z.length; A++) q = q.getCommonAncestor(z[A].getParent());
                                D = y.config.useComputedState;
                                y = r = void 0;
                                D = D === void 0 || D;
                                for (A = 0; A < z.length; A++)
                                    for (C = z[A]; G = C.getParent();) { if (G.equals(q)) { m.push(C);!y && C.getDirection() && (y = 1);
                                            C = C.getDirection(D);
                                            r !== null && (r = r && r != C ? null : C); break } C = G }
                                if (!(m.length < 1)) {
                                    z = m[m.length - 1].getNext();
                                    A = h.createElement(this.type);
                                    i.push(A);
                                    for (D = i = void 0; m.length;) {
                                        i = m.shift();
                                        D = h.createElement("li");
                                        if (i.is("pre") || p.test(i.getName()) || i.getAttribute("contenteditable") == "false") i.appendTo(D);
                                        else { i.copyAttributes(D); if (r && i.getDirection()) { D.removeStyle("direction");
                                                D.removeAttribute("dir") } i.moveChildren(D);
                                            i.remove() } D.appendTo(A)
                                    }
                                    r && y && A.setAttribute("dir", r);
                                    z ? A.insertBefore(z) : A.appendTo(q)
                                }
                            }
                        else this.state == CKEDITOR.TRISTATE_ON && f[r.root.getName()] && a.call(this, b, r, k)
                    }
                    for (A = 0; A < B.length; A++) c(B[A]);
                    CKEDITOR.dom.element.clearAllMarkers(k);
                    e.selectBookmarks(d);
                    b.focus()
                },
                refresh: function(a,
                    b) { var c = b.contains(f, 1),
                        d = b.blockLimit || b.root;
                    c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
            };
            CKEDITOR.plugins.add("list", {
                requires: "indentlist",
                init: function(a) {
                    if (!a.blockless) {
                        a.addCommand("numberedlist", new e("numberedlist", "ol"));
                        a.addCommand("bulletedlist", new e("bulletedlist", "ul"));
                        if (a.ui.addButton) {
                            a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: true, toolbar: "list,10" });
                            a.ui.addButton("BulletedList", { label: a.lang.list.bulletedlist, command: "bulletedlist", directional: true, toolbar: "list,20" })
                        }
                        a.on("key", function(b) {
                            var c = b.data.domEvent.getKey(),
                                e;
                            if (a.mode == "wysiwyg" && c in { 8: 1, 46: 1 }) {
                                var h = a.getSelection().getRanges()[0],
                                    k = h && h.startPath();
                                if (h && h.collapsed) {
                                    var q = c == 8,
                                        p = a.editable(),
                                        u = new CKEDITOR.dom.walker(h.clone());
                                    u.evaluator = function(a) { return g(a) && !m(a) };
                                    u.guard = function(a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) };
                                    c = h.clone();
                                    if (q) {
                                        var r;
                                        if ((r = k.contains(f)) && h.checkBoundaryOfElement(r, CKEDITOR.START) && (r = r.getParent()) && r.is("li") && (r = j(r))) { e = r;
                                            r = r.getPrevious(g);
                                            c.moveToPosition(r && m(r) ? r : e, CKEDITOR.POSITION_BEFORE_START) } else {
                                            u.range.setStartAt(p, CKEDITOR.POSITION_AFTER_START);
                                            u.range.setEnd(h.startContainer, h.startOffset);
                                            if ((r = u.previous()) && r.type == CKEDITOR.NODE_ELEMENT && (r.getName() in f || r.is("li"))) {
                                                if (!r.is("li")) { u.range.selectNodeContents(r);
                                                    u.reset();
                                                    u.evaluator = d;
                                                    r = u.previous() } e = r;
                                                c.moveToElementEditEnd(e);
                                                c.moveToPosition(c.endPath().block,
                                                    CKEDITOR.POSITION_BEFORE_END)
                                            }
                                        }
                                        if (e) { i(a, c, h);
                                            b.cancel() } else { var y = k.contains(f); if (y && h.checkBoundaryOfElement(y, CKEDITOR.START)) { e = y.getFirst(g); if (h.checkBoundaryOfElement(e, CKEDITOR.START)) { r = y.getPrevious(g); if (j(e)) { if (r) { h.moveToElementEditEnd(r);
                                                            h.select() } } else a.execCommand("outdent");
                                                    b.cancel() } } }
                                    } else if (e = k.contains("li")) {
                                        u.range.setEndAt(p, CKEDITOR.POSITION_BEFORE_END);
                                        q = (p = e.getLast(g)) && d(p) ? p : e;
                                        k = 0;
                                        if ((r = u.next()) && r.type == CKEDITOR.NODE_ELEMENT && r.getName() in f && r.equals(p)) {
                                            k =
                                                1;
                                            r = u.next()
                                        } else h.checkBoundaryOfElement(q, CKEDITOR.END) && (k = 2);
                                        if (k && r) { h = h.clone();
                                            h.moveToElementEditStart(r); if (k == 1) { c.optimize(); if (!c.startContainer.equals(e)) { for (e = c.startContainer; e.is(CKEDITOR.dtd.$inline);) { y = e;
                                                        e = e.getParent() } y && c.moveToPosition(y, CKEDITOR.POSITION_AFTER_END) } } if (k == 2) { c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END);
                                                h.endPath().block && h.moveToPosition(h.endPath().block, CKEDITOR.POSITION_AFTER_START) } i(a, c, h);
                                            b.cancel() }
                                    } else {
                                        u.range.setEndAt(p, CKEDITOR.POSITION_BEFORE_END);
                                        if ((r = u.next()) && r.type == CKEDITOR.NODE_ELEMENT && r.is(f)) { r = r.getFirst(g); if (k.block && h.checkStartOfBlock() && h.checkEndOfBlock()) { k.block.remove();
                                                h.moveToElementEditStart(r);
                                                h.select() } else if (j(r)) { h.moveToElementEditStart(r);
                                                h.select() } else { h = h.clone();
                                                h.moveToElementEditStart(r);
                                                i(a, c, h) } b.cancel() }
                                    }
                                    setTimeout(function() { a.selectionChange(1) })
                                }
                            }
                        })
                    }
                }
            })
        }(),
        function() {
            CKEDITOR.plugins.liststyle = {
                requires: "dialog,contextmenu",
                init: function(a) {
                    if (!a.blockless) {
                        var e;
                        e = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]" });
                        e = a.addCommand("numberedListStyle", e);
                        a.addFeature(e);
                        CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
                        e = new CKEDITOR.dialogCommand("bulletedListStyle", { requiredContent: "ul", allowedContent: "ul{list-style-type}" });
                        e = a.addCommand("bulletedListStyle", e);
                        a.addFeature(e);
                        CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
                        a.addMenuGroup("list", 108);
                        a.addMenuItems({
                            numberedlist: {
                                label: a.lang.liststyle.numberedTitle,
                                group: "list",
                                command: "numberedListStyle"
                            },
                            bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" }
                        });
                        a.contextMenu.addListener(function(a) { if (!a || a.isReadOnly()) return null; for (; a;) { var c = a.getName(); if (c == "ol") return { numberedlist: CKEDITOR.TRISTATE_OFF }; if (c == "ul") return { bulletedlist: CKEDITOR.TRISTATE_OFF };
                                a = a.getParent() } return null })
                    }
                }
            };
            CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
        }(), "use strict",
        function() {
            function a(a, b, c) {
                return g(b) && g(c) &&
                    c.equals(b.getNext(function(a) { return !(Q(a) || V(a) || m(a)) }))
            }

            function e(a) { this.upper = a[0];
                this.lower = a[1];
                this.set.apply(this, a.slice(2)) }

            function b(a) { var b = a.element; if (b && g(b))
                    if ((b = b.getAscendant(a.triggers, true)) && a.editable.contains(b)) { var c = i(b); if (c.getAttribute("contenteditable") == "true") return b; if (c.is(a.triggers)) return c }
                return null }

            function c(a, b, c) { w(a, b);
                w(a, c);
                a = b.size.bottom;
                c = c.size.top; return a && c ? 0 | (a + c) / 2 : a || c }

            function d(a, b, c) {
                return b = b[c ? "getPrevious" : "getNext"](function(b) {
                    return b &&
                        b.type == CKEDITOR.NODE_TEXT && !Q(b) || g(b) && !m(b) && !k(a, b)
                })
            }

            function i(a, b) { if (a.data("cke-editable")) return null; for (b || (a = a.getParent()); a;) { if (a.data("cke-editable")) break; if (a.hasAttribute("contenteditable")) return a;
                    a = a.getParent() } return null }

            function j(a) {
                var b = a.doc,
                    c = z('<span contenteditable="false" style="' + F + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b),
                    d = CKEDITOR.getUrl(this.path + "images/" + (B.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png");
                r(c, {
                    attach: function() {
                        this.wrap.getParent() ||
                            this.wrap.appendTo(a.editable, true);
                        return this
                    },
                    lineChildren: [r(z('<span title="' + a.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', b), {
                        base: F + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (B.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (B.hidpi ? "background-size: 9px 10px;" : ""),
                        looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;",
                            "top:-1px; border-radius: 0px 0px 2px 2px;"
                        ]
                    }), r(z(N, b), { base: M + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), r(z(N, b), { base: M + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })],
                    detach: function() { this.wrap.getParent() && this.wrap.remove(); return this },
                    mouseNear: function() {
                        w(a,
                            this);
                        var b = a.holdDistance,
                            c = this.size;
                        return c && a.mouse.y > c.top - b && a.mouse.y < c.bottom + b && a.mouse.x > c.left - b && a.mouse.x < c.right + b ? true : false
                    },
                    place: function() {
                        var b = a.view,
                            c = a.editable,
                            d = a.trigger,
                            e = d.upper,
                            f = d.lower,
                            g = e || f,
                            h = g.getParent(),
                            i = {};
                        this.trigger = d;
                        e && w(a, e, true);
                        f && w(a, f, true);
                        w(a, h, true);
                        a.inInlineMode && v(a, true);
                        if (h.equals(c)) { i.left = b.scroll.x;
                            i.right = -b.scroll.x;
                            i.width = "" } else {
                            i.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left :
                                0);
                            i.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x;
                            i.right = ""
                        }
                        if (e && f) i.top = e.size.margin.bottom === f.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom < f.size.margin.top ? e.size.bottom + e.size.margin.bottom : e.size.bottom + e.size.margin.bottom - f.size.margin.top;
                        else if (e) { if (!f) i.top = e.size.bottom + e.size.margin.bottom } else i.top = f.size.top - f.size.margin.top;
                        if (d.is(P) || i.top > b.scroll.y - 15 && i.top < b.scroll.y + 5) { i.top = a.inInlineMode ? 0 : b.scroll.y;
                            this.look(P) } else if (d.is(I) ||
                            i.top > b.pane.bottom - 5 && i.top < b.pane.bottom + 15) { i.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1;
                            this.look(I) } else { if (a.inInlineMode) i.top = i.top - (b.editable.top + b.editable.border.top);
                            this.look(R) }
                        if (a.inInlineMode) { i.top--;
                            i.top = i.top + b.editable.scroll.top;
                            i.left = i.left + b.editable.scroll.left }
                        for (var j in i) i[j] = CKEDITOR.tools.cssLength(i[j]);
                        this.setStyles(i)
                    },
                    look: function(a) {
                        if (this.oldLook != a) {
                            for (var b = this.lineChildren.length, c; b--;)(c =
                                this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                            this.oldLook = a
                        }
                    },
                    wrap: new y("span", a.doc)
                });
                for (b = c.lineChildren.length; b--;) c.lineChildren[b].appendTo(c);
                c.look(R);
                c.appendTo(c.wrap);
                c.unselectable();
                c.lineChildren[0].on("mouseup", function(b) { c.detach();
                    f(a, function(b) { var c = a.line.trigger;
                        b[c.is(G) ? "insertBefore" : "insertAfter"](c.is(G) ? c.lower : c.upper) }, true);
                    a.editor.focus();!B.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                    b.data.preventDefault(true) });
                c.on("mousedown",
                    function(a) { a.data.preventDefault(true) });
                a.line = c
            }

            function f(a, b, c) { var d = new CKEDITOR.dom.range(a.doc),
                    e = a.editor,
                    f; if (B.ie && a.enterMode == CKEDITOR.ENTER_BR) f = a.doc.createText(T);
                else { f = (f = i(a.element, true)) && f.data("cke-enter-mode") || a.enterMode;
                    f = new y(C[f], a.doc);
                    f.is("br") || a.doc.createText(T).appendTo(f) } c && e.fire("saveSnapshot");
                b(f);
                d.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);
                e.getSelection().selectRanges([d]);
                a.hotNode = f;
                c && e.fire("saveSnapshot") }

            function h(a, c) {
                return {
                    canUndo: true,
                    modes: { wysiwyg: 1 },
                    exec: function() {
                        function e(b) { var d = B.ie && B.version < 9 ? " " : T,
                                g = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
                            f(a, function(d) { g && a.hotNode && a.hotNode.remove();
                                d[c ? "insertAfter" : "insertBefore"](b);
                                d.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c });
                                a.lastCmdDirection = !!c });!B.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                            a.line.detach() }
                        return function(f) {
                            var f = f.getSelection().getStartElement(),
                                h, f =
                                f.getAscendant(da, 1);
                            if (!o(a, f) && f && !f.equals(a.editable) && !f.contains(a.editable)) { if ((h = i(f)) && h.getAttribute("contenteditable") == "false") f = h;
                                a.element = f;
                                h = d(a, f, !c); var j; if (g(h) && h.is(a.triggers) && h.is(S) && (!d(a, h, !c) || (j = d(a, h, !c)) && g(j) && j.is(a.triggers))) e(h);
                                else { j = b(a, f); if (g(j))
                                        if (d(a, j, !c))(f = d(a, j, !c)) && (g(f) && f.is(a.triggers)) && e(j);
                                        else e(j) } }
                        }
                    }()
                }
            }

            function k(a, b) { if (!b || !(b.type == CKEDITOR.NODE_ELEMENT && b.$)) return false; var c = a.line; return c.wrap.equals(b) || c.wrap.contains(b) }

            function g(a) {
                return a &&
                    a.type == CKEDITOR.NODE_ELEMENT && a.$
            }

            function m(a) { if (!g(a)) return false; var b; if (!(b = p(a)))
                    if (g(a)) { b = { left: 1, right: 1, center: 1 };
                        b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")]) } else b = false; return b }

            function p(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] }

            function q(a, b) { return g(b) ? b.is(a.triggers) : null }

            function o(a, b) { if (!b) return false; for (var c = b.getParents(1), d = c.length; d--;)
                    for (var e = a.tabuList.length; e--;)
                        if (c[d].hasAttribute(a.tabuList[e])) return true; return false }

            function n(a, b, c) { b = b[c ? "getLast" : "getFirst"](function(b) { return a.isRelevant(b) && !b.is(ca) }); if (!b) return false;
                w(a, b); return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y }

            function l(a) {
                var b = a.editable,
                    c = a.mouse,
                    d = a.view,
                    f = a.triggerOffset;
                v(a);
                var h = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) / 2),
                    b = b[h ? "getLast" : "getFirst"](function(a) { return !(Q(a) || V(a)) });
                if (!b) return null;
                k(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function(a) {
                    return !(Q(a) ||
                        V(a))
                }));
                if (!g(b) || m(b) || !q(a, b)) return null;
                w(a, b);
                if (!h && b.size.top >= 0 && c.y > 0 && c.y < b.size.top + f) { a = a.inInlineMode || d.scroll.y === 0 ? P : R; return new e([null, b, G, L, a]) }
                if (h && b.size.bottom <= d.pane.height && c.y > b.size.bottom - f && c.y < d.pane.height) { a = a.inInlineMode || b.size.bottom > d.pane.height - f && b.size.bottom < d.pane.height ? I : R; return new e([b, null, E, L, a]) }
                return null
            }

            function s(a) {
                var c = a.mouse,
                    f = a.view,
                    h = a.triggerOffset,
                    i = b(a);
                if (!i) return null;
                w(a, i);
                var h = Math.min(h, 0 | i.size.outerHeight / 2),
                    j = [],
                    k, l;
                if (c.y >
                    i.size.top - 1 && c.y < i.size.top + h) l = false;
                else if (c.y > i.size.bottom - h && c.y < i.size.bottom + 1) l = true;
                else return null;
                if (m(i) || n(a, i, l) || i.getParent().is(X)) return null;
                var o = d(a, i, !l);
                if (o) { if (o && o.type == CKEDITOR.NODE_TEXT) return null; if (g(o)) { if (m(o) || !q(a, o) || o.getParent().is(X)) return null;
                        j = [o, i][l ? "reverse" : "concat"]().concat([H, L]) } } else {
                    if (i.equals(a.editable[l ? "getLast" : "getFirst"](a.isRelevant))) {
                        v(a);
                        l && c.y > i.size.bottom - h && c.y < f.pane.height && i.size.bottom > f.pane.height - h && i.size.bottom < f.pane.height ?
                            k = I : c.y > 0 && c.y < i.size.top + h && (k = P)
                    } else k = R;
                    j = [null, i][l ? "reverse" : "concat"]().concat([l ? E : G, L, k, i.equals(a.editable[l ? "getLast" : "getFirst"](a.isRelevant)) ? l ? I : P : R])
                }
                return 0 in j ? new e(j) : null
            }

            function t(a, b, c, d) {
                for (var e = b.getDocumentPosition(), f = {}, g = {}, h = {}, i = {}, j = O.length; j--;) { f[O[j]] = parseInt(b.getComputedStyle.call(b, "border-" + O[j] + "-width"), 10) || 0;
                    h[O[j]] = parseInt(b.getComputedStyle.call(b, "padding-" + O[j]), 10) || 0;
                    g[O[j]] = parseInt(b.getComputedStyle.call(b, "margin-" + O[j]), 10) || 0 }(!c || d) &&
                x(a, d);
                i.top = e.y - (c ? 0 : a.view.scroll.y);
                i.left = e.x - (c ? 0 : a.view.scroll.x);
                i.outerWidth = b.$.offsetWidth;
                i.outerHeight = b.$.offsetHeight;
                i.height = i.outerHeight - (h.top + h.bottom + f.top + f.bottom);
                i.width = i.outerWidth - (h.left + h.right + f.left + f.right);
                i.bottom = i.top + i.outerHeight;
                i.right = i.left + i.outerWidth;
                if (a.inInlineMode) i.scroll = { top: b.$.scrollTop, left: b.$.scrollLeft };
                return r({ border: f, padding: h, margin: g, ignoreScroll: c }, i, true)
            }

            function w(a, b, c) {
                if (!g(b)) return b.size = null;
                if (b.size) {
                    if (b.size.ignoreScroll ==
                        c && b.size.date > new Date - K) return null
                } else b.size = {};
                return r(b.size, t(a, b, c), { date: +new Date }, true)
            }

            function v(a, b) { a.view.editable = t(a, a.editable, b, true) }

            function x(a, b) {
                if (!a.view) a.view = {};
                var c = a.view;
                if (b || !(c && c.date > new Date - K)) {
                    var d = a.win,
                        c = d.getScrollPosition(),
                        d = d.getViewPaneSize();
                    r(a.view, { scroll: { x: c.x, y: c.y, width: a.doc.$.documentElement.scrollWidth - d.width, height: a.doc.$.documentElement.scrollHeight - d.height }, pane: { width: d.width, height: d.height, bottom: d.height + c.y }, date: +new Date },
                        true)
                }
            }

            function u(a, b, c, d) { for (var f = d, g = d, h = 0, i = false, j = false, k = a.view.pane.height, l = a.mouse; l.y + h < k && l.y - h > 0;) { i || (i = b(f, d));
                    j || (j = b(g, d));!i && l.y - h > 0 && (f = c(a, { x: l.x, y: l.y - h }));!j && l.y + h < k && (g = c(a, { x: l.x, y: l.y + h })); if (i && j) break;
                    h = h + 2 } return new e([f, g, null, null]) } CKEDITOR.plugins.add("magicline", {
                init: function(a) {
                    var c = a.config,
                        i = c.magicline_triggerOffset || 30,
                        n = {
                            editor: a,
                            enterMode: c.enterMode,
                            triggerOffset: i,
                            holdDistance: 0 | i * (c.magicline_holdDistance || 0.5),
                            boxColor: c.magicline_color || "#ff0000",
                            rtl: c.contentsLangDirection == "rtl",
                            tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []),
                            triggers: c.magicline_everywhere ? da : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                        },
                        q, w, u;
                    n.isRelevant = function(a) { return g(a) && !k(n, a) && !m(a) };
                    a.on("contentDom", function() {
                        var g = a.editable(),
                            i = a.document,
                            m = a.window;
                        r(n, { editable: g, inInlineMode: g.isInline(), doc: i, win: m, hotNode: null }, true);
                        n.boundary = n.inInlineMode ? n.editable : n.doc.getDocumentElement();
                        if (!g.is(D.$inline)) {
                            n.inInlineMode && !p(g) &&
                                g.setStyles({ position: "relative", top: null, left: null });
                            j.call(this, n);
                            x(n);
                            g.attachListener(a, "beforeUndoImage", function() { n.line.detach() });
                            g.attachListener(a, "beforeGetData", function() { if (n.line.wrap.getParent()) { n.line.detach();
                                    a.once("getData", function() { n.line.attach() }, null, null, 1E3) } }, null, null, 0);
                            g.attachListener(n.inInlineMode ? i : i.getWindow().getFrame(), "mouseout", function(b) {
                                if (a.mode == "wysiwyg")
                                    if (n.inInlineMode) {
                                        var c = b.data.$.clientX,
                                            b = b.data.$.clientY;
                                        x(n);
                                        v(n, true);
                                        var d = n.view.editable,
                                            e = n.view.scroll;
                                        if (!(c > d.left - e.x && c < d.right - e.x) || !(b > d.top - e.y && b < d.bottom - e.y)) { clearTimeout(u);
                                            u = null;
                                            n.line.detach() }
                                    } else { clearTimeout(u);
                                        u = null;
                                        n.line.detach() }
                            });
                            g.attachListener(g, "keyup", function() { n.hiddenMode = 0 });
                            g.attachListener(g, "keydown", function(b) { if (a.mode == "wysiwyg") switch (b.data.getKeystroke()) {
                                    case 2228240:
                                    case 16:
                                        n.hiddenMode = 1;
                                        n.line.detach() } });
                            g.attachListener(n.inInlineMode ? g : i, "mousemove", function(b) {
                                w = true;
                                if (!(a.mode != "wysiwyg" || a.readOnly || u)) {
                                    var c = {
                                        x: b.data.$.clientX,
                                        y: b.data.$.clientY
                                    };
                                    u = setTimeout(function() { n.mouse = c;
                                        u = n.trigger = null;
                                        x(n); if (w && !n.hiddenMode && a.focusManager.hasFocus && !n.line.mouseNear() && (n.element = U(n, true))) { if ((n.trigger = l(n) || s(n) || Z(n)) && !o(n, n.trigger.upper || n.trigger.lower)) n.line.attach().place();
                                            else { n.trigger = null;
                                                n.line.detach() } w = false } }, 30)
                                }
                            });
                            g.attachListener(m, "scroll", function() { if (a.mode == "wysiwyg") { n.line.detach(); if (B.webkit) { n.hiddenMode = 1;
                                        clearTimeout(q);
                                        q = setTimeout(function() { if (!n.mouseDown) n.hiddenMode = 0 }, 50) } } });
                            g.attachListener(A ?
                                i : m, "mousedown",
                                function() { if (a.mode == "wysiwyg") { n.line.detach();
                                        n.hiddenMode = 1;
                                        n.mouseDown = 1 } });
                            g.attachListener(A ? i : m, "mouseup", function() { n.hiddenMode = 0;
                                n.mouseDown = 0 });
                            a.addCommand("accessPreviousSpace", h(n));
                            a.addCommand("accessNextSpace", h(n, true));
                            a.setKeystroke([
                                [c.magicline_keystrokePrevious, "accessPreviousSpace"],
                                [c.magicline_keystrokeNext, "accessNextSpace"]
                            ]);
                            a.on("loadSnapshot", function() {
                                var b, c, d, e;
                                for (e in { p: 1, br: 1, div: 1 }) {
                                    b = a.document.getElementsByTag(e);
                                    for (d = b.count(); d--;)
                                        if ((c =
                                                b.getItem(d)).data("cke-magicline-hot")) { n.hotNode = c;
                                            n.lastCmdDirection = c.data("cke-magicline-dir") === "true" ? true : false; return }
                                }
                            });
                            this.backdoor = { accessFocusSpace: f, boxTrigger: e, isLine: k, getAscendantTrigger: b, getNonEmptyNeighbour: d, getSize: t, that: n, triggerEdge: s, triggerEditable: l, triggerExpand: Z }
                        }
                    }, this)
                }
            });
            var r = CKEDITOR.tools.extend,
                y = CKEDITOR.dom.element,
                z = y.createFromHtml,
                B = CKEDITOR.env,
                A = CKEDITOR.env.ie && CKEDITOR.env.version < 9,
                D = CKEDITOR.dtd,
                C = {},
                G = 128,
                E = 64,
                H = 32,
                L = 16,
                J = 8,
                P = 4,
                I = 2,
                R = 1,
                T = " ",
                X =
                D.$listItem,
                ca = D.$tableContent,
                S = r({}, D.$nonEditable, D.$empty),
                da = D.$block,
                K = 100,
                F = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
                M = F + "border-color:transparent;display:block;border-style:solid;",
                N = "<span>" + T + "</span>";
            C[CKEDITOR.ENTER_BR] = "br";
            C[CKEDITOR.ENTER_P] = "p";
            C[CKEDITOR.ENTER_DIV] = "div";
            e.prototype = { set: function(a, b, c) { this.properties = a + b + (c || R); return this }, is: function(a) { return (this.properties & a) == a } };
            var U = function() {
                    function a(b, c) { var d = b.$.elementFromPoint(c.x, c.y); return d && d.nodeType ? new CKEDITOR.dom.element(d) : null } return function(b, c, d) { if (!b.mouse) return null; var e = b.doc,
                            f = b.line.wrap,
                            d = d || b.mouse,
                            g = a(e, d); if (c && k(b, g)) { f.hide();
                            g = a(e, d);
                            f.show() } return !g || !(g.type == CKEDITOR.NODE_ELEMENT && g.$) || B.ie && B.version < 9 && !b.boundary.equals(g) && !b.boundary.contains(g) ? null : g } }(),
                Q = CKEDITOR.dom.walker.whitespaces(),
                V = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
                Z = function() {
                    function b(e) {
                        var f =
                            e.element,
                            h, i, j;
                        if (!g(f) || f.contains(e.editable) || f.isReadOnly()) return null;
                        j = u(e, function(a, b) { return !b.equals(a) }, function(a, b) { return U(a, true, b) }, f);
                        h = j.upper;
                        i = j.lower;
                        if (a(e, h, i)) return j.set(H, J);
                        if (h && f.contains(h))
                            for (; !h.getParent().equals(f);) h = h.getParent();
                        else h = f.getFirst(function(a) { return d(e, a) });
                        if (i && f.contains(i))
                            for (; !i.getParent().equals(f);) i = i.getParent();
                        else i = f.getLast(function(a) { return d(e, a) });
                        if (!h || !i) return null;
                        w(e, h);
                        w(e, i);
                        if (!(e.mouse.y > h.size.top && e.mouse.y <
                                i.size.bottom)) return null;
                        for (var f = Number.MAX_VALUE, k, l, n, o; i && !i.equals(h);) { if (!(l = h.getNext(e.isRelevant))) break;
                            k = Math.abs(c(e, h, l) - e.mouse.y); if (k < f) { f = k;
                                n = h;
                                o = l } h = l;
                            w(e, h) }
                        if (!n || !o || !(e.mouse.y > n.size.top && e.mouse.y < o.size.bottom)) return null;
                        j.upper = n;
                        j.lower = o;
                        return j.set(H, J)
                    }

                    function d(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || V(b) || m(b) || k(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) }
                    return function(c) {
                        var d = b(c),
                            e;
                        if (e = d) {
                            e = d.upper;
                            var f = d.lower;
                            e = !e || !f || m(f) || m(e) || f.equals(e) ||
                                e.equals(f) || f.contains(e) || e.contains(f) ? false : q(c, e) && q(c, f) && a(c, e, f) ? true : false
                        }
                        return e ? d : null
                    }
                }(),
                O = ["top", "left", "right", "bottom"]
        }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52,
        function() {
            function a(a) {
                if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") return [];
                for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) {
                    var e = a.$.elements.namedItem(c[d]);
                    if (e) {
                        e = new CKEDITOR.dom.element(e);
                        b.push([e, e.nextSibling]);
                        e.remove()
                    }
                }
                return b
            }

            function e(a, b) { if (a && !(a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") && b.length > 0)
                    for (var c = b.length - 1; c >= 0; c--) { var d = b[c][0],
                            e = b[c][1];
                        e ? d.insertBefore(e) : d.appendTo(a) } }

            function b(b, c) { var d = a(b),
                    h = {},
                    k = b.$; if (!c) { h["class"] = k.className || "";
                    k.className = "" } h.inline = k.style.cssText || ""; if (!c) k.style.cssText = "position: static; overflow: visible";
                e(d); return h }

            function c(b, c) {
                var d = a(b),
                    h = b.$;
                if ("class" in c) h.className = c["class"];
                if ("inline" in c) h.style.cssText =
                    c.inline;
                e(d)
            }

            function d(a) { if (!a.editable().isInline()) { var b = CKEDITOR.instances,
                        c; for (c in b) { var d = b[c]; if (d.mode == "wysiwyg" && !d.readOnly) { d = d.document.getBody();
                            d.setAttribute("contentEditable", false);
                            d.setAttribute("contentEditable", true) } } if (a.editable().hasFocus) { a.toolbox.focus();
                        a.focus() } } } CKEDITOR.plugins.add("maximize", {
                init: function(a) {
                    function e() { var b = k.getViewPaneSize();
                        a.resize(b.width, b.height, null, true) }
                    if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var f = a.lang,
                            h = CKEDITOR.document,
                            k = h.getWindow(),
                            g, m, p, q = CKEDITOR.TRISTATE_OFF;
                        a.addCommand("maximize", {
                            modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS },
                            readOnly: 1,
                            editorFocus: false,
                            exec: function() {
                                var o = a.container.getFirst(function(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }),
                                    n = a.ui.space("contents");
                                if (a.mode == "wysiwyg") { var l = a.getSelection();
                                    g = l && l.getRanges();
                                    m = k.getScrollPosition() } else { var s = a.editable().$;
                                    g = !CKEDITOR.env.ie && [s.selectionStart, s.selectionEnd];
                                    m = [s.scrollLeft, s.scrollTop] }
                                if (this.state ==
                                    CKEDITOR.TRISTATE_OFF) {
                                    k.on("resize", e);
                                    p = k.getScrollPosition();
                                    for (l = a.container; l = l.getParent();) { l.setCustomData("maximize_saved_styles", b(l));
                                        l.setStyle("z-index", a.config.baseFloatZIndex - 5) } n.setCustomData("maximize_saved_styles", b(n, true));
                                    o.setCustomData("maximize_saved_styles", b(o, true));
                                    n = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 };
                                    h.getDocumentElement().setStyles(n);
                                    !CKEDITOR.env.gecko && h.getDocumentElement().setStyle("position", "fixed");
                                    (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) &&
                                    h.getBody().setStyles(n);
                                    CKEDITOR.env.ie ? setTimeout(function() { k.$.scrollTo(0, 0) }, 0) : k.$.scrollTo(0, 0);
                                    o.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                    o.$.offsetLeft;
                                    o.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" });
                                    o.addClass("cke_maximized");
                                    e();
                                    n = o.getDocumentPosition();
                                    o.setStyles({ left: -1 * n.x + "px", top: -1 * n.y + "px" });
                                    CKEDITOR.env.gecko && d(a)
                                } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                    k.removeListener("resize", e);
                                    for (var l = [n, o], t = 0; t < l.length; t++) {
                                        c(l[t],
                                            l[t].getCustomData("maximize_saved_styles"));
                                        l[t].removeCustomData("maximize_saved_styles")
                                    }
                                    for (l = a.container; l = l.getParent();) { c(l, l.getCustomData("maximize_saved_styles"));
                                        l.removeCustomData("maximize_saved_styles") } CKEDITOR.env.ie ? setTimeout(function() { k.$.scrollTo(p.x, p.y) }, 0) : k.$.scrollTo(p.x, p.y);
                                    o.removeClass("cke_maximized");
                                    if (CKEDITOR.env.webkit) { o.setStyle("display", "inline");
                                        setTimeout(function() { o.setStyle("display", "block") }, 0) } a.fire("resize", {
                                        outerHeight: a.container.$.offsetHeight,
                                        contentsHeight: n.$.offsetHeight,
                                        outerWidth: a.container.$.offsetWidth
                                    })
                                }
                                this.toggleState();
                                if (l = this.uiItems[0]) { n = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize;
                                    l = CKEDITOR.document.getById(l._.id);
                                    l.getChild(1).setHtml(n);
                                    l.setAttribute("title", n);
                                    l.setAttribute("href", 'javascript:void("' + n + '");') }
                                if (a.mode == "wysiwyg")
                                    if (g) { CKEDITOR.env.gecko && d(a);
                                        a.getSelection().selectRanges(g);
                                        (s = a.getSelection().getStartElement()) && s.scrollIntoView(true) } else k.$.scrollTo(m.x, m.y);
                                else { if (g) { s.selectionStart = g[0];
                                        s.selectionEnd = g[1] } s.scrollLeft = m[0];
                                    s.scrollTop = m[1] } g = m = null;
                                q = this.state;
                                a.fire("maximize", this.state)
                            },
                            canUndo: false
                        });
                        a.ui.addButton && a.ui.addButton("Maximize", { label: f.maximize.maximize, command: "maximize", toolbar: "tools,10" });
                        a.on("mode", function() { var b = a.getCommand("maximize");
                            b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : q) }, null, null, 100)
                    }
                }
            })
        }(), CKEDITOR.plugins.add("newpage", {
            init: function(a) {
                a.addCommand("newpage", {
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    exec: function(a) { var b = this;
                        a.setData(a.config.newpage_html || "", function() { a.focus();
                            setTimeout(function() { a.fire("afterCommandExec", { name: "newpage", command: b });
                                a.selectionChange() }, 200) }) },
                    async: true
                });
                a.ui.addButton && a.ui.addButton("NewPage", { label: a.lang.newpage.toolbar, command: "newpage", toolbar: "document,20" })
            }
        }), "use strict",
        function() {
            function a(a) {
                return {
                    "aria-label": a,
                    "class": "cke_pagebreak",
                    contenteditable: "false",
                    "data-cke-display-name": "pagebreak",
                    "data-cke-pagebreak": 1,
                    style: "page-break-after: always",
                    title: a
                }
            }
            CKEDITOR.plugins.add("pagebreak", {
                requires: "fakeobjects",
                onLoad: function() { var a = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;");
                    CKEDITOR.addCss("div.cke_pagebreak{" + a + "}") },
                init: function(a) {
                    if (!a.blockless) {
                        a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd);
                        a.ui.addButton && a.ui.addButton("PageBreak", { label: a.lang.pagebreak.toolbar, command: "pagebreak", toolbar: "insert,70" });
                        CKEDITOR.env.webkit && a.on("contentDom", function() { a.document.on("click", function(b) { b = b.data.getTarget();
                                b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b) }) })
                    }
                },
                afterInit: function(e) {
                    function b(b) { CKEDITOR.tools.extend(b.attributes, a(e.lang.pagebreak.alt), true);
                        b.children.length = 0 }
                    var c = e.dataProcessor,
                        d = c && c.dataFilter,
                        c = c && c.htmlFilter,
                        i = /page-break-after\s*:\s*always/i,
                        j = /display\s*:\s*none/i;
                    c &&
                        c.addRules({ attributes: { "class": function(a, b) { var c = a.replace("cke_pagebreak", ""); if (c != a) { var d = CKEDITOR.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>').children[0];
                                        b.children.length = 0;
                                        b.add(d);
                                        d = b.attributes;
                                        delete d["aria-label"];
                                        delete d.contenteditable;
                                        delete d.title } return c } } }, { applyToAll: true, priority: 5 });
                    d && d.addRules({
                        elements: {
                            div: function(a) {
                                if (a.attributes["data-cke-pagebreak"]) b(a);
                                else if (i.test(a.attributes.style)) {
                                    var c = a.children[0];
                                    c && (c.name == "span" &&
                                        j.test(c.attributes.style)) && b(a)
                                }
                            }
                        }
                    })
                }
            });
            CKEDITOR.plugins.pagebreakCmd = { exec: function(e) { var b = e.document.createElement("div", { attributes: a(e.lang.pagebreak.alt) });
                    e.insertElement(b) }, context: "div", allowedContent: { div: { styles: "!page-break-after" }, span: { match: function(a) { return (a = a.parent) && a.name == "div" && a.styles && a.styles["page-break-after"] }, styles: "display" } }, requiredContent: "div{page-break-after}" }
        }(),
        function() {
            function a(a, c, d) {
                var e = CKEDITOR.cleanWord;
                if (e) d();
                else {
                    a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile ||
                        c + "filter/default.js");
                    CKEDITOR.scriptLoader.load(a, d, null, true)
                }
                return !e
            }

            function e(a) { a.data.type = "html" } CKEDITOR.plugins.add("pastefromword", {
                requires: "clipboard",
                init: function(b) {
                    var c = 0,
                        d = this.path;
                    b.addCommand("pastefromword", {
                        canUndo: false,
                        async: true,
                        exec: function(a) {
                            var b = this;
                            c = 1;
                            a.once("beforePaste", e);
                            a.getClipboardData({ title: a.lang.pastefromword.title }, function(c) {
                                c && a.fire("paste", { type: "html", dataValue: c.dataValue, method: "paste", dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer() });
                                a.fire("afterCommandExec", { name: "pastefromword", command: b, returnValue: !!c })
                            })
                        }
                    });
                    b.ui.addButton && b.ui.addButton("PasteFromWord", { label: b.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" });
                    b.on("pasteState", function(a) { b.getCommand("pastefromword").setState(a.data) });
                    b.on("paste", function(e) {
                        var j = e.data,
                            f = j.dataValue;
                        if (f && (c || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(f))) {
                            j.dontFilter = true;
                            var h = a(b, d, function() {
                                if (h) b.fire("paste", j);
                                else if (!b.config.pasteFromWordPromptCleanup ||
                                    c || confirm(b.lang.pastefromword.confirmCleanup)) j.dataValue = CKEDITOR.cleanWord(f, b);
                                c = 0
                            });
                            h && e.cancel()
                        }
                    }, null, null, 3)
                }
            })
        }(),
        function() {
            var a = { canUndo: false, async: true, exec: function(e) { e.getClipboardData({ title: e.lang.pastetext.title }, function(b) { b && e.fire("paste", { type: "text", dataValue: b.dataValue, method: "paste", dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer() });
                        e.fire("afterCommandExec", { name: "pastetext", command: a, returnValue: !!b }) }) } };
            CKEDITOR.plugins.add("pastetext", {
                requires: "clipboard",
                init: function(e) { e.addCommand("pastetext", a);
                    e.ui.addButton && e.ui.addButton("PasteText", { label: e.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (e.config.forcePasteAsPlainText) e.on("beforePaste", function(a) { if (a.data.type != "html") a.data.type = "text" });
                    e.on("pasteState", function(a) { e.getCommand("pastetext").setState(a.data) }) }
            })
        }(),
        function() {
            var a, e = {
                modes: { wysiwyg: 1, source: 1 },
                canUndo: false,
                readOnly: 1,
                exec: function(b) {
                    var c, d = b.config,
                        e = d.baseHref ? '<base href="' + d.baseHref + '"/>' :
                        "";
                    if (d.fullPage) c = b.getData().replace(/<head>/, "$&" + e).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + b.lang.preview.preview);
                    else {
                        var d = "<body ",
                            j = b.document && b.document.getBody();
                        if (j) { j.getAttribute("id") && (d = d + ('id="' + j.getAttribute("id") + '" '));
                            j.getAttribute("class") && (d = d + ('class="' + j.getAttribute("class") + '" ')) } c = b.config.docType + '<html dir="' + b.config.contentsLangDirection + '"><head>' + e + "<title>" + b.lang.preview.preview + "</title>" + CKEDITOR.tools.buildStyleHtml(b.config.contentsCss) + "</head>" +
                            (d + ">") + b.getData() + "</body></html>"
                    }
                    e = 640;
                    d = 420;
                    j = 80;
                    try { var f = window.screen,
                            e = Math.round(f.width * 0.8),
                            d = Math.round(f.height * 0.7),
                            j = Math.round(f.width * 0.1) } catch (h) {}
                    if (b.fire("contentPreview", b = { dataValue: c }) === false) return false;
                    var f = "",
                        k;
                    if (CKEDITOR.env.ie) {
                        window._cke_htmlToLoad = b.dataValue;
                        k = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )";
                        f = ""
                    }
                    if (CKEDITOR.env.gecko) { window._cke_htmlToLoad = b.dataValue;
                        f = CKEDITOR.getUrl(a + "preview.html") } f = window.open(f, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + e + ",height=" + d + ",left=" + j);
                    if (CKEDITOR.env.ie && f) f.location = k;
                    if (!CKEDITOR.env.ie && !CKEDITOR.env.gecko) { k = f.document;
                        k.open();
                        k.write(b.dataValue);
                        k.close() }
                    return true
                }
            };
            CKEDITOR.plugins.add("preview", {
                init: function(b) {
                    if (b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        a = this.path;
                        b.addCommand("preview",
                            e);
                        b.ui.addButton && b.ui.addButton("Preview", { label: b.lang.preview.preview, command: "preview", toolbar: "document,40" })
                    }
                }
            })
        }(), CKEDITOR.plugins.add("print", { init: function(a) { if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) { a.addCommand("print", CKEDITOR.plugins.print);
                    a.ui.addButton && a.ui.addButton("Print", { label: a.lang.print.toolbar, command: "print", toolbar: "document,50" }) } } }), CKEDITOR.plugins.print = {
            exec: function(a) { CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print") },
            canUndo: !1,
            readOnly: 1,
            modes: { wysiwyg: 1 }
        }, CKEDITOR.plugins.add("removeformat", { init: function(a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
                a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } }), CKEDITOR.plugins.removeformat = {
            commands: {
                removeformat: {
                    exec: function(a) {
                        for (var e = a._.removeFormatRegex || (a._.removeFormatRegex = RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), b = a._.removeAttributes ||
                                (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), c = CKEDITOR.plugins.removeformat.filter, d = a.getSelection().getRanges(), i = d.createIterator(), j = function(a) { return a.type == CKEDITOR.NODE_ELEMENT }, f; f = i.getNextRange();) {
                            f.collapsed || f.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                            var h = f.createBookmark(),
                                k = h.startNode,
                                g = h.endNode,
                                m = function(b) { for (var d = a.elementPath(b), f = d.elements, g = 1, h; h = f[g]; g++) { if (h.equals(d.block) || h.equals(d.blockLimit)) break;
                                        e.test(h.getName()) && c(a, h) && b.breakParent(h) } };
                            m(k);
                            if (g) { m(g); for (k = k.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT); k;) { if (k.equals(g)) break; if (k.isReadOnly()) { if (k.getPosition(g) & CKEDITOR.POSITION_CONTAINS) break;
                                        k = k.getNext(j) } else { m = k.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT); if (!(k.getName() == "img" && k.data("cke-realelement")) && c(a, k))
                                            if (e.test(k.getName())) k.remove(1);
                                            else { k.removeAttributes(b);
                                                a.fire("removeFormatCleanup", k) }
                                        k = m } } } f.moveToBookmark(h)
                        }
                        a.forceNextSelectionCheck();
                        a.getSelection().selectRanges(d)
                    }
                }
            },
            filter: function(a, e) {
                for (var b =
                        a._.removeFormatFilters || [], c = 0; c < b.length; c++)
                    if (b[c](e) === false) return false;
                return true
            }
        }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function(a) { if (!this._.removeFormatFilters) this._.removeFormatFilters = [];
            this._.removeFormatFilters.push(a) }, CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", CKEDITOR.plugins.add("resize", {
            init: function(a) {
                var e,
                    b, c, d;

                function i(g) { var h = e,
                        i = b,
                        j = h + (g.data.$.screenX - c) * (k == "rtl" ? -1 : 1),
                        g = i + (g.data.$.screenY - d);
                    m && (h = Math.max(f.resize_minWidth, Math.min(j, f.resize_maxWidth)));
                    p && (i = Math.max(f.resize_minHeight, Math.min(g, f.resize_maxHeight)));
                    a.resize(m ? h : null, i) }

                function j() { CKEDITOR.document.removeListener("mousemove", i);
                    CKEDITOR.document.removeListener("mouseup", j); if (a.document) { a.document.removeListener("mousemove", i);
                        a.document.removeListener("mouseup", j) } }
                var f = a.config,
                    h = a.ui.spaceId("resizer"),
                    k = a.element ?
                    a.element.getDirection(1) : "ltr";
                !f.resize_dir && (f.resize_dir = "vertical");
                f.resize_maxWidth === void 0 && (f.resize_maxWidth = 3E3);
                f.resize_maxHeight === void 0 && (f.resize_maxHeight = 3E3);
                f.resize_minWidth === void 0 && (f.resize_minWidth = 750);
                f.resize_minHeight === void 0 && (f.resize_minHeight = 250);
                if (f.resize_enabled !== false) {
                    var g = null,
                        m = (f.resize_dir == "both" || f.resize_dir == "horizontal") && f.resize_minWidth != f.resize_maxWidth,
                        p = (f.resize_dir == "both" || f.resize_dir == "vertical") && f.resize_minHeight != f.resize_maxHeight,
                        q = CKEDITOR.tools.addFunction(function(h) { g || (g = a.getResizable());
                            e = g.$.offsetWidth || 0;
                            b = g.$.offsetHeight || 0;
                            c = h.screenX;
                            d = h.screenY;
                            f.resize_minWidth > e && (f.resize_minWidth = e);
                            f.resize_minHeight > b && (f.resize_minHeight = b);
                            CKEDITOR.document.on("mousemove", i);
                            CKEDITOR.document.on("mouseup", j); if (a.document) { a.document.on("mousemove", i);
                                a.document.on("mouseup", j) } h.preventDefault && h.preventDefault() });
                    a.on("destroy", function() { CKEDITOR.tools.removeFunction(q) });
                    a.on("uiSpace", function(b) {
                        if (b.data.space ==
                            "bottom") { var c = "";
                            m && !p && (c = " cke_resizer_horizontal");!m && p && (c = " cke_resizer_vertical"); var d = '<span id="' + h + '" class="cke_resizer' + c + " cke_resizer_" + k + '" title="' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + q + ', event)">' + (k == "ltr" ? "◢" : "◣") + "</span>";
                            k == "ltr" && c == "ltr" ? b.data.html = b.data.html + d : b.data.html = d + b.data.html }
                    }, a, null, 100);
                    a.on("maximize", function(b) { a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
                }
            }
        }),
        function() {
            var a = { readOnly: 1, exec: function(a) { if (a.fire("save"))
                        if (a = a.element.$.form) try { a.submit() } catch (b) { a.submit.click && a.submit.click() } } };
            CKEDITOR.plugins.add("save", { init: function(e) { if (e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE) { e.addCommand("save", a).modes = { wysiwyg: !!e.element.$.form };
                        e.ui.addButton && e.ui.addButton("Save", { label: e.lang.save.toolbar, command: "save", toolbar: "document,10" }) } } })
        }(), "use strict", CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog",
            tabToOpen: null,
            dialogName: "scaytDialog",
            init: function(a) {
                var e = this,
                    b = CKEDITOR.plugins.scayt;
                this.bindEvents(a);
                this.parseConfig(a);
                this.addRule(a);
                CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js"));
                this.addMenuItems(a);
                var c = a.lang.scayt,
                    d = CKEDITOR.env;
                a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                    label: c.text_title,
                    title: a.plugins.wsc ? a.lang.wsc.title : c.text_title,
                    modes: { wysiwyg: !(d.ie && (d.version < 8 || d.quirks)) },
                    toolbar: "spellchecker,20",
                    refresh: function() {
                        var c = a.ui.instances.Scayt.getState();
                        a.scayt && (c =
                            b.state[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                        a.fire("scaytButtonState", c)
                    },
                    onRender: function() { var b = this;
                        a.on("scaytButtonState", function(a) { typeof a.data !== void 0 && b.setState(a.data) }) },
                    onMenu: function() {
                        var c = a.scayt;
                        a.getMenuItem("scaytToggle").label = a.lang.scayt[c && b.state[a.name] ? "btn_disable" : "btn_enable"];
                        c = {
                            scaytToggle: CKEDITOR.TRISTATE_OFF,
                            scaytOptions: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytLangs: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytDict: c ?
                                CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytAbout: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                        };
                        a.config.scayt_uiTabs[0] || delete c.scaytOptions;
                        a.config.scayt_uiTabs[1] || delete c.scaytLangs;
                        a.config.scayt_uiTabs[2] || delete c.scaytDict;
                        return c
                    }
                });
                if (a.contextMenu && a.addMenuItems) {
                    a.contextMenu.addListener(function() {
                        var b = a.scayt,
                            c;
                        if (b) {
                            var d = b.getSelectionNode();
                            if (d = d ? d.getAttribute(b.getNodeAttribute()) : d) {
                                c = e.menuGenerator(a,
                                    d, e);
                                b.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" ."))
                            }
                        }
                        return c
                    });
                    a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function(b) { return function() { var c = a.scayt;
                            c && c.hideBanner(); return b.apply(this) } })
                }
            },
            addMenuItems: function(a) {
                var e = this,
                    b = CKEDITOR.plugins.scayt;
                a.addMenuGroup("scaytButton");
                var c = a.config.scayt_contextMenuItemsOrder.split("|");
                if (c && c.length)
                    for (var d = 0; d < c.length; d++) a.addMenuGroup("scayt_" + c[d], d - 10);
                a.addCommand("scaytToggle", { exec: function(a) { var c = a.scayt;
                        b.state[a.name] = !b.state[a.name];
                        b.state[a.name] === true ? c || b.createScayt(a) : c && b.destroy(a) } });
                a.addCommand("scaytAbout", { exec: function(a) { a.scayt.tabToOpen = "about";
                        a.lockSelection();
                        a.openDialog(e.dialogName) } });
                a.addCommand("scaytOptions", { exec: function(a) { a.scayt.tabToOpen = "options";
                        a.lockSelection();
                        a.openDialog(e.dialogName) } });
                a.addCommand("scaytLangs", { exec: function(a) { a.scayt.tabToOpen = "langs";
                        a.lockSelection();
                        a.openDialog(e.dialogName) } });
                a.addCommand("scaytDict", { exec: function(a) { a.scayt.tabToOpen = "dictionaries";
                        a.lockSelection();
                        a.openDialog(e.dialogName) } });
                c = {
                    scaytToggle: { label: a.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle" },
                    scaytAbout: { label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" },
                    scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" },
                    scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" },
                    scaytDict: {
                        label: a.lang.scayt.btn_dictionaries,
                        group: "scaytButton",
                        command: "scaytDict"
                    }
                };
                if (a.plugins.wsc) c.WSC = { label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function() { var b = CKEDITOR.plugins.scayt,
                            c = a.scayt,
                            d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); if (d = d.replace(/\s/g, "")) { c && (b.state[a.name] && c.setMarkupPaused) && c.setMarkupPaused(true);
                            a.lockSelection();
                            a.execCommand("checkspell") } else alert("Nothing to check!") } };
                a.addMenuItems(c)
            },
            bindEvents: function(a) {
                function e() {
                    var b = a.scayt;
                    if (b) {
                        b.removeMarkupInSelectionNode();
                        b.fire("startSpellCheck")
                    }
                }
                var b = CKEDITOR.plugins.scayt,
                    c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE,
                    d = function() { b.destroy(a) },
                    i = function() { b.state[a.name] && (!a.readOnly && !a.scayt) && b.createScayt(a) },
                    j = function() {
                        var b = a.editable();
                        b.attachListener(b, "focus", function() {
                            CKEDITOR.plugins.scayt && !a.scayt && setTimeout(i, 0);
                            var b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state[a.name] && a.scayt,
                                d, e;
                            if ((c || b) && a._.savedSelection)
                                for (var b = a._.savedSelection.getSelectedElement(), b = !b && a._.savedSelection.getRanges(),
                                        f = 0; f < b.length; f++) { e = b[f]; if (typeof e.startContainer.$.nodeValue === "string") { d = e.startContainer.getText().length;
                                        (d < e.startOffset || d < e.endOffset) && a.unlockSelection(false) } }
                        }, this, null, -10)
                    },
                    f = function() { if (c) { a.on("blur", d);
                            a.on("focus", i);
                            a.focusManager.hasFocus && i() } else i();
                        j() };
                a.on("contentDom", f);
                a.on("beforeCommandExec", function(c) {
                    var d;
                    if (c.data.name in b.options.disablingCommandExec && a.mode == "wysiwyg") { if (d = a.scayt) { b.destroy(a);
                            a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED) } } else if (c.data.name ===
                        "bold" || c.data.name === "italic" || c.data.name === "underline" || c.data.name === "strike" || c.data.name === "subscript" || c.data.name === "superscript" || c.data.name === "enter")
                        if (d = a.scayt) { d.removeMarkupInSelectionNode();
                            setTimeout(function() { d.fire("startSpellCheck") }, 0) }
                });
                a.on("beforeSetMode", function(c) { if (c.data == "source") { if (c = a.scayt) { b.destroy(a);
                            a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED) } a.document && a.document.getBody().removeAttribute("_jquid") } });
                a.on("afterCommandExec", function(b) {
                    var c;
                    if (a.mode == "wysiwyg" && (b.data.name == "undo" || b.data.name == "redo"))(c = a.scayt) && setTimeout(function() { c.fire("startSpellCheck") }, 250)
                });
                a.on("readOnly", function(c) { var d; if (c) { d = a.scayt; if (c.editor.readOnly === true) d && d.fire("removeMarkupInDocument", {});
                        else if (d) d.fire("startSpellCheck");
                        else if (c.editor.mode == "wysiwyg" && b.state[c.editor.name] === true) { b.createScayt(a);
                            c.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON) } } });
                a.on("beforeDestroy", d);
                a.on("setData", function() {
                    d();
                    (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ||
                        a.plugins.divarea) && f()
                }, this, null, 50);
                a.on("insertElement", function() { CKEDITOR.env.ie ? setTimeout(function() { e() }, 50) : e() }, this, null, 50);
                a.on("insertHtml", function() { e() }, this, null, 50);
                a.on("insertText", function() { e() }, this, null, 50);
                a.on("scaytDialogShown", function(b) { b.data.selectPage(a.scayt.tabToOpen) });
                a.on("paste", function() { var b = a.scayt;
                    b && b.removeMarkupInSelectionNode() }, null, null, 0)
            },
            parseConfig: function(a) {
                var e = CKEDITOR.plugins.scayt;
                e.replaceOldOptionsNames(a.config);
                if (typeof a.config.scayt_autoStartup !==
                    "boolean") a.config.scayt_autoStartup = false;
                e.state[a.name] = a.config.scayt_autoStartup;
                if (!a.config.scayt_contextCommands) a.config.scayt_contextCommands = "ignore|ignoreall|add";
                if (!a.config.scayt_contextMenuItemsOrder) a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control";
                if (!a.config.scayt_sLang) a.config.scayt_sLang = "en_US";
                if (a.config.scayt_maxSuggestions === void 0 || typeof a.config.scayt_maxSuggestions != "number" || a.config.scayt_maxSuggestions < 0) a.config.scayt_maxSuggestions = 5;
                if (a.config.scayt_minWordLength ===
                    void 0 || typeof a.config.scayt_minWordLength != "number" || a.config.scayt_minWordLength < 1) a.config.scayt_minWordLength = 4;
                if (a.config.scayt_customDictionaryIds === void 0 || typeof a.config.scayt_customDictionaryIds !== "string") a.config.scayt_customDictionaryIds = "";
                if (a.config.scayt_userDictionaryName === void 0 || typeof a.config.scayt_userDictionaryName !== "string") a.config.scayt_userDictionaryName = null;
                if (typeof a.config.scayt_uiTabs === "string" && a.config.scayt_uiTabs.split(",").length === 3) {
                    var b = [],
                        c = [];
                    a.config.scayt_uiTabs =
                        a.config.scayt_uiTabs.split(",");
                    CKEDITOR.tools.search(a.config.scayt_uiTabs, function(a) { if (Number(a) === 1 || Number(a) === 0) { c.push(true);
                            b.push(Number(a)) } else c.push(false) });
                    a.config.scayt_uiTabs = CKEDITOR.tools.search(c, false) === null ? b : [1, 1, 1]
                } else a.config.scayt_uiTabs = [1, 1, 1];
                if (typeof a.config.scayt_serviceProtocol != "string") a.config.scayt_serviceProtocol = null;
                if (typeof a.config.scayt_serviceHost != "string") a.config.scayt_serviceHost = null;
                if (typeof a.config.scayt_servicePort != "string") a.config.scayt_servicePort =
                    null;
                if (typeof a.config.scayt_servicePath != "string") a.config.scayt_servicePath = null;
                if (!a.config.scayt_moreSuggestions) a.config.scayt_moreSuggestions = "on";
                if (typeof a.config.scayt_customerId !== "string") a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2";
                if (typeof a.config.scayt_srcUrl !== "string") { e = document.location.protocol;
                    e = e.search(/https?:/) != -1 ? e : "http:";
                    a.config.scayt_srcUrl = e + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js" }
                if (typeof CKEDITOR.config.scayt_handleCheckDirty !==
                    "boolean") CKEDITOR.config.scayt_handleCheckDirty = true;
                if (typeof CKEDITOR.config.scayt_handleUndoRedo !== "boolean") CKEDITOR.config.scayt_handleUndoRedo = true;
                if (a.config.scayt_disableOptionsStorage) {
                    var e = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : typeof a.config.scayt_disableOptionsStorage === "string" ? [a.config.scayt_disableOptionsStorage] : void 0,
                        d = ["all", "options", "lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases",
                            "ignore-words-with-numbers"
                        ],
                        i = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"],
                        j = CKEDITOR.tools.search,
                        f = CKEDITOR.tools.indexOf;
                    a.config.scayt_disableOptionsStorage = function(a) { for (var b = [], c = 0; c < a.length; c++) { var e = a[c],
                                p = !!j(a, "options"); if (!j(d, e) || p && j(i, function(a) { if (a === "lang") return false })) return;
                            j(i, e) && i.splice(f(i, e), 1); if (e === "all" || p && j(a, "lang")) return [];
                            e === "options" && (i = ["lang"]) } return b = b.concat(i) }(e)
                }
            },
            addRule: function(a) {
                var e =
                    a.dataProcessor,
                    b = e && e.htmlFilter,
                    c = a._.elementsPath && a._.elementsPath.filters,
                    e = e && e.dataFilter,
                    d = a.addRemoveFormatFilter,
                    i = function(b) { var c = CKEDITOR.plugins.scayt; if (a.scayt && b.hasAttribute(c.options.data_attribute_name)) return false },
                    j = function(b) { var c = CKEDITOR.plugins.scayt,
                            d = true;
                        a.scayt && b.hasAttribute(c.options.data_attribute_name) && (d = false); return d };
                c && c.push(i);
                e && e.addRules({
                    elements: {
                        span: function(b) {
                            var c = CKEDITOR.plugins.scayt;
                            if (c && c.state[a.name] && b.classes && CKEDITOR.tools.search(b.classes,
                                    c.options.misspelled_word_class))
                                if (b.classes && b.parent.type === CKEDITOR.NODE_DOCUMENT_FRAGMENT) { delete b.attributes.style;
                                    delete b.name } else delete b.classes[CKEDITOR.tools.indexOf(b.classes, c.options.misspelled_word_class)];
                            return b
                        }
                    }
                });
                b && b.addRules({
                    elements: {
                        span: function(b) {
                            var c = CKEDITOR.plugins.scayt;
                            if (c && c.state[a.name] && b.hasClass(c.options.misspelled_word_class) && b.attributes[c.options.data_attribute_name]) {
                                b.removeClass(c.options.misspelled_word_class);
                                delete b.attributes[c.options.data_attribute_name];
                                delete b.name
                            }
                            return b
                        }
                    }
                });
                d && d.call(a, j)
            },
            scaytMenuDefinition: function(a) {
                var e = this,
                    a = a.scayt;
                return {
                    scayt_ignore: { label: a.getLocal("btn_ignore"), group: "scayt_control", order: 1, exec: function(a) { a.scayt.ignoreWord() } },
                    scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function(a) { a.scayt.ignoreAllWords() } },
                    scayt_add: { label: a.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function(a) { var c = a.scayt;
                            setTimeout(function() { c.addWordToUserDictionary() }, 10) } },
                    option: { label: a.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function(a) { a.scayt.tabToOpen = "options";
                            a.lockSelection();
                            a.openDialog(e.dialogName) }, verification: function(a) { return a.config.scayt_uiTabs[0] == 1 ? true : false } },
                    language: { label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function(a) { a.scayt.tabToOpen = "langs";
                            a.lockSelection();
                            a.openDialog(e.dialogName) }, verification: function(a) { return a.config.scayt_uiTabs[1] == 1 ? true : false } },
                    dictionary: {
                        label: a.getLocal("btn_dictionaries"),
                        group: "scayt_control",
                        order: 6,
                        exec: function(a) { a.scayt.tabToOpen = "dictionaries";
                            a.lockSelection();
                            a.openDialog(e.dialogName) },
                        verification: function(a) { return a.config.scayt_uiTabs[2] == 1 ? true : false }
                    },
                    about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function(a) { a.scayt.tabToOpen = "about";
                            a.lockSelection();
                            a.openDialog(e.dialogName) } }
                }
            },
            buildSuggestionMenuItems: function(a, e) {
                var b = {},
                    c = {},
                    d = a.scayt;
                if (e.length > 0 && e[0] !== "no_any_suggestions")
                    for (var i = 0; i < e.length; i++) {
                        var j = "scayt_suggest_" +
                            CKEDITOR.plugins.scayt.suggestions[i].replace(" ", "_");
                        a.addCommand(j, this.createCommand(CKEDITOR.plugins.scayt.suggestions[i]));
                        if (i < a.config.scayt_maxSuggestions) { a.addMenuItem(j, { label: e[i], command: j, group: "scayt_suggest", order: i + 1 });
                            b[j] = CKEDITOR.TRISTATE_OFF } else {
                            a.addMenuItem(j, { label: e[i], command: j, group: "scayt_moresuggest", order: i + 1 });
                            c[j] = CKEDITOR.TRISTATE_OFF;
                            if (a.config.scayt_moreSuggestions === "on") {
                                a.addMenuItem("scayt_moresuggest", {
                                    label: d.getLocal("btn_moreSuggestions"),
                                    group: "scayt_moresuggest",
                                    order: 10,
                                    getItems: function() { return c }
                                });
                                b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF
                            }
                        }
                    } else { b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED;
                        a.addCommand("no_scayt_suggest", { exec: function() {} });
                        a.addMenuItem("no_scayt_suggest", { label: d.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }) }
                return b
            },
            menuGenerator: function(a, e) {
                var b = a.scayt,
                    c = this.scaytMenuDefinition(a),
                    d = {},
                    i = a.config.scayt_contextCommands.split("|");
                b.fire("getSuggestionsList", {
                    lang: b.getLang(),
                    word: e
                });
                d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions);
                if (a.config.scayt_contextCommands == "off") return d;
                for (var j in c)
                    if (!(CKEDITOR.tools.indexOf(i, j.replace("scayt_", "")) == -1 && a.config.scayt_contextCommands != "all")) { d[j] = CKEDITOR.TRISTATE_OFF;
                        typeof c[j].verification === "function" && !c[j].verification(a) && delete d[j];
                        a.addCommand(j, { exec: c[j].exec });
                        a.addMenuItem(j, { label: a.lang.scayt[c[j].label] || c[j].label, command: j, group: c[j].group, order: c[j].order }) }
                return d
            },
            createCommand: function(a) { return { exec: function(e) { e.scayt.replaceSelectionNode({ word: a }) } } }
        }),
        CKEDITOR.plugins.scayt = {
            state: {},
            suggestions: [],
            loadingHelper: { loadOrder: [] },
            isLoading: !1,
            options: { disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word", misspelled_word_class: "scayt-misspell-word" },
            backCompatibilityMap: { scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath", scayt_customerid: "scayt_customerId" },
            replaceOldOptionsNames: function(a) {
                for (var e in a)
                    if (e in
                        this.backCompatibilityMap) { a[this.backCompatibilityMap[e]] = a[e];
                        delete a[e] }
            },
            createScayt: function(a) {
                var e = this;
                this.loadScaytLibrary(a, function(a) {
                    var c = {
                        lang: a.config.scayt_sLang,
                        container: a.editable().$.nodeName == "BODY" ? a.document.getWindow().$.frameElement : a.editable().$,
                        customDictionary: a.config.scayt_customDictionaryIds,
                        userDictionaryName: a.config.scayt_userDictionaryName,
                        localization: a.langCode,
                        customer_id: a.config.scayt_customerId,
                        debug: a.config.scayt_debug,
                        data_attribute_name: e.options.data_attribute_name,
                        misspelled_word_class: e.options.misspelled_word_class,
                        "options-to-restore": a.config.scayt_disableOptionsStorage,
                        focused: a.editable().hasFocus,
                        ignoreElementsRegex: a.config.scayt_elementsToIgnore,
                        minWordLength: a.config.scayt_minWordLength
                    };
                    if (a.config.scayt_serviceProtocol) c.service_protocol = a.config.scayt_serviceProtocol;
                    if (a.config.scayt_serviceHost) c.service_host = a.config.scayt_serviceHost;
                    if (a.config.scayt_servicePort) c.service_port = a.config.scayt_servicePort;
                    if (a.config.scayt_servicePath) c.service_path =
                        a.config.scayt_servicePath;
                    c = new SCAYT.CKSCAYT(c, function() {}, function() {});
                    c.subscribe("suggestionListSend", function(a) { for (var b = {}, c = [], e = 0; e < a.suggestionList.length; e++)
                            if (!b["word_" + a.suggestionList[e]]) { b["word_" + a.suggestionList[e]] = a.suggestionList[e];
                                c.push(a.suggestionList[e]) }
                        CKEDITOR.plugins.scayt.suggestions = c });
                    c.subscribe("selectionIsChanged", function() { a.getSelection().isLocked && a.lockSelection() });
                    a.scayt = c;
                    a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                })
            },
            destroy: function(a) { a.scayt && a.scayt.destroy();
                delete a.scayt;
                a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) },
            loadScaytLibrary: function(a, e) {
                var b = this,
                    c;
                if (typeof window.SCAYT === "undefined" || typeof window.SCAYT.CKSCAYT !== "function") {
                    if (!this.loadingHelper[a.name]) {
                        this.loadingHelper[a.name] = e;
                        this.loadingHelper.loadOrder.push(a.name);
                        c = new Date;
                        c = c.getTime();
                        c = a.config.scayt_srcUrl + "?" + c;
                        CKEDITOR.scriptLoader.load(c, function() {
                            var a;
                            CKEDITOR.fireOnce("scaytReady");
                            for (var c = 0; c < b.loadingHelper.loadOrder.length; c++) {
                                a =
                                    b.loadingHelper.loadOrder[c];
                                if (typeof b.loadingHelper[a] === "function") b.loadingHelper[a](CKEDITOR.instances[a]);
                                delete b.loadingHelper[a]
                            }
                            b.loadingHelper.loadOrder = []
                        })
                    }
                } else if (window.SCAYT && typeof window.SCAYT.CKSCAYT === "function") { CKEDITOR.fireOnce("scaytReady");
                    a.scayt || typeof e === "function" && e(a) }
            }
        }, CKEDITOR.on("dialogDefinition", function(a) { if (a.data.name === "scaytDialog") a.data.definition.dialog.on("cancel", function() { return false }, this, null, -1) }), CKEDITOR.on("scaytReady", function() {
            if (CKEDITOR.config.scayt_handleCheckDirty ===
                true) {
                var a = CKEDITOR.editor.prototype;
                a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function(a) { return function() { var c = null,
                            d = this.scayt; if (!CKEDITOR.plugins.scayt || !CKEDITOR.plugins.scayt.state[this.name] || !this.scayt) c = a.call(this);
                        else if (c = this.status == "ready") var e = d.removeMarkupFromString(this.getSnapshot()),
                            d = d.removeMarkupFromString(this._.previousValue),
                            c = c && d !== e; return c } });
                a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function(a) {
                    return function() {
                        var c = this.scayt;
                        !CKEDITOR.plugins.scayt ||
                            !CKEDITOR.plugins.scayt.state[this.name] || !this.scayt ? a.call(this) : this._.previousValue = c.removeMarkupFromString(this.getSnapshot())
                    }
                })
            }
            if (CKEDITOR.config.scayt_handleUndoRedo === true) {
                var a = CKEDITOR.plugins.undo.Image.prototype,
                    e = typeof a.equalsContent == "function" ? "equalsContent" : "equals";
                a[e] = CKEDITOR.tools.override(a[e], function(a) {
                    return function(c) {
                        var d = c.editor.scayt,
                            e = this.contents,
                            j = c.contents,
                            f = null;
                        if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state[c.editor.name] && c.editor.scayt) {
                            this.contents =
                                d.removeMarkupFromString(e) || "";
                            c.contents = d.removeMarkupFromString(j) || ""
                        }
                        f = a.apply(this, arguments);
                        this.contents = e;
                        c.contents = j;
                        return f
                    }
                })
            }
        }),
        function() {
            CKEDITOR.plugins.add("selectall", {
                init: function(a) {
                    a.addCommand("selectAll", {
                        modes: { wysiwyg: 1, source: 1 },
                        exec: function(a) {
                            var b = a.editable();
                            if (b.is("textarea")) { a = b.$; if (CKEDITOR.env.ie) a.createTextRange().execCommand("SelectAll");
                                else { a.selectionStart = 0;
                                    a.selectionEnd = a.value.length } a.focus() } else {
                                if (b.is("body")) a.document.$.execCommand("SelectAll",
                                    false, null);
                                else { var c = a.createRange();
                                    c.selectNodeContents(b);
                                    c.select() } a.forceNextSelectionCheck();
                                a.selectionChange()
                            }
                        },
                        canUndo: false
                    });
                    a.ui.addButton && a.ui.addButton("SelectAll", { label: a.lang.selectall.toolbar, command: "selectAll", toolbar: "selection,10" })
                }
            })
        }(),
        function() {
            var a = {
                readOnly: 1,
                preserveState: true,
                editorFocus: false,
                exec: function(a) { this.toggleState();
                    this.refresh(a) },
                refresh: function(a) {
                    if (a.document) {
                        var b = this.state == CKEDITOR.TRISTATE_ON && (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE ||
                            a.focusManager.hasFocus) ? "attachClass" : "removeClass";
                        a.editable()[b]("cke_show_blocks")
                    }
                }
            };
            CKEDITOR.plugins.add("showblocks", {
                onLoad: function() {
                    var a = ["p", "div", "pre", "address", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6"],
                        b, c, d, i, j = CKEDITOR.getUrl(this.path),
                        f = !(CKEDITOR.env.ie && CKEDITOR.env.version < 9),
                        h = f ? ":not([contenteditable=false]):not(.cke_show_blocks_off)" : "",
                        k, g;
                    for (b = c = d = i = ""; k = a.pop();) {
                        g = a.length ? "," : "";
                        b = b + (".cke_show_blocks " + k + h + g);
                        d = d + (".cke_show_blocks.cke_contents_ltr " + k + h + g);
                        i = i +
                            (".cke_show_blocks.cke_contents_rtl " + k + h + g);
                        c = c + (".cke_show_blocks " + k + h + "{background-image:url(" + CKEDITOR.getUrl(j + "images/block_" + k + ".png") + ")}")
                    }
                    CKEDITOR.addCss((b + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(c, d + "{background-position:top left;padding-left:8px}", i + "{background-position:top right;padding-right:8px}"));
                    f || CKEDITOR.addCss(".cke_show_blocks [contenteditable=false],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable=false],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable=false],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
                },
                init: function(e) {
                    function b() { c.refresh(e) }
                    if (!e.blockless) {
                        var c = e.addCommand("showblocks", a);
                        c.canUndo = false;
                        e.config.startupOutlineBlocks && c.setState(CKEDITOR.TRISTATE_ON);
                        e.ui.addButton && e.ui.addButton("ShowBlocks", { label: e.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" });
                        e.on("mode", function() { c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e) });
                        if (e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE) { e.on("focus", b);
                            e.on("blur", b) } e.on("contentDom", function() {
                            c.state != CKEDITOR.TRISTATE_DISABLED &&
                                c.refresh(e)
                        })
                    }
                }
            })
        }(),
        function() {
            var a = { preserveState: true, editorFocus: false, readOnly: 1, exec: function(a) { this.toggleState();
                    this.refresh(a) }, refresh: function(a) { if (a.document) { var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                        a.editable()[b]("cke_show_borders") } } };
            CKEDITOR.plugins.add("showborders", {
                modes: { wysiwyg: 1 },
                onLoad: function() {
                    var a;
                    a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : [".%1 table.%2,", ".%1 table.%2 > tr > td, .%1 table.%2 > tr > th,",
                        ".%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,", ".%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,", ".%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th", "{", "border : #d3d3d3 1px dotted", "}"
                    ]).join("").replace(/%2/g, "cke_show_border").replace(/%1/g, "cke_show_borders ");
                    CKEDITOR.addCss(a)
                },
                init: function(e) {
                    var b = e.addCommand("showborders", a);
                    b.canUndo = false;
                    e.config.startupShowBorders !== false && b.setState(CKEDITOR.TRISTATE_ON);
                    e.on("mode", function() {
                        b.state !=
                            CKEDITOR.TRISTATE_DISABLED && b.refresh(e)
                    }, null, null, 100);
                    e.on("contentDom", function() { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(e) });
                    e.on("removeFormatCleanup", function(a) { a = a.data;
                        e.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && (a.is("table") && (!a.hasAttribute("border") || parseInt(a.getAttribute("border"), 10) <= 0)) && a.addClass("cke_show_border") })
                },
                afterInit: function(a) {
                    var b = a.dataProcessor,
                        a = b && b.dataFilter,
                        b = b && b.htmlFilter;
                    a && a.addRules({
                        elements: {
                            table: function(a) {
                                var a = a.attributes,
                                    b = a["class"],
                                    e = parseInt(a.border, 10);
                                if ((!e || e <= 0) && (!b || b.indexOf("cke_show_border") == -1)) a["class"] = (b || "") + " cke_show_border"
                            }
                        }
                    });
                    b && b.addRules({ elements: { table: function(a) { var a = a.attributes,
                                    b = a["class"];
                                b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, "")) } } })
                }
            });
            CKEDITOR.on("dialogDefinition", function(a) {
                var b = a.data.name;
                if (b == "table" || b == "tableProperties") {
                    a = a.data.definition;
                    b = a.getContents("info").get("txtBorder");
                    b.commit = CKEDITOR.tools.override(b.commit,
                        function(a) { return function(b, e) { a.apply(this, arguments); var j = parseInt(this.getValue(), 10);
                                e[!j || j <= 0 ? "addClass" : "removeClass"]("cke_show_border") } });
                    if (a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) {
                        a.setup = CKEDITOR.tools.override(a.setup, function(a) { return function() { a.apply(this, arguments);
                                this.setValue(this.getValue().replace(/cke_show_border/, "")) } });
                        a.commit = CKEDITOR.tools.override(a.commit, function(a) {
                            return function(b, e) {
                                a.apply(this, arguments);
                                parseInt(e.getAttribute("border"),
                                    10) || e.addClass("cke_show_border")
                            }
                        })
                    }
                }
            })
        }(), CKEDITOR.plugins.add("smiley", { requires: "dialog", init: function(a) { a.config.smiley_path = a.config.smiley_path || this.path + "images/";
                a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" }));
                a.ui.addButton && a.ui.addButton("Smiley", { label: a.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" });
                CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js") } }), CKEDITOR.config.smiley_images =
        "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "), CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"),
        function() {
            CKEDITOR.plugins.add("sourcearea", {
                init: function(e) {
                    function b() { var a = d && this.equals(CKEDITOR.document.getActive());
                        this.hide();
                        this.setStyle("height", this.getParent().$.clientHeight + "px");
                        this.setStyle("width", this.getParent().$.clientWidth + "px");
                        this.show();
                        a && this.focus() }
                    if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var c = CKEDITOR.plugins.sourcearea;
                        e.addMode("source", function(c) {
                            var d = e.ui.space("contents").getDocument().createElement("textarea");
                            d.setStyles(CKEDITOR.tools.extend({
                                width: CKEDITOR.env.ie7Compat ?
                                    "99%" : "100%",
                                height: "100%",
                                resize: "none",
                                outline: "none",
                                "text-align": "left"
                            }, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4)));
                            d.setAttribute("dir", "ltr");
                            d.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
                            e.ui.space("contents").append(d);
                            d = e.editable(new a(e, d));
                            d.setData(e.getData(1));
                            if (CKEDITOR.env.ie) { d.attachListener(e, "resize", b, d);
                                d.attachListener(CKEDITOR.document.getWindow(), "resize", b, d);
                                CKEDITOR.tools.setTimeout(b, 0, d) } e.fire("ariaWidget",
                                this);
                            c()
                        });
                        e.addCommand("source", c.commands.source);
                        e.ui.addButton && e.ui.addButton("Source", { label: e.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" });
                        e.on("mode", function() { e.getCommand("source").setState(e.mode == "source" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) });
                        var d = CKEDITOR.env.ie && CKEDITOR.env.version == 9
                    }
                }
            });
            var a = CKEDITOR.tools.createClass({
                base: CKEDITOR.editable,
                proto: {
                    setData: function(a) { this.setValue(a);
                        this.status = "ready";
                        this.editor.fire("dataReady") },
                    getData: function() { return this.getValue() },
                    insertHtml: function() {},
                    insertElement: function() {},
                    insertText: function() {},
                    setReadOnly: function(a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") },
                    detach: function() { a.baseProto.detach.call(this);
                        this.clearCustomData();
                        this.remove() }
                }
            })
        }(), CKEDITOR.plugins.sourcearea = {
            commands: {
                source: {
                    modes: { wysiwyg: 1, source: 1 },
                    editorFocus: !1,
                    readOnly: 1,
                    exec: function(a) {
                        a.mode == "wysiwyg" && a.fire("saveSnapshot");
                        a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                        a.setMode(a.mode == "source" ? "wysiwyg" :
                            "source")
                    },
                    canUndo: !1
                }
            }
        }, CKEDITOR.plugins.add("specialchar", {
            availableLangs: { af: 1, ar: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, en: 1, "en-gb": 1, eo: 1, es: 1, et: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, pl: 1, pt: 1, "pt-br": 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 },
            requires: "dialog",
            init: function(a) {
                var e = this;
                CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
                a.addCommand("specialchar", {
                    exec: function() {
                        var b =
                            a.langCode,
                            b = e.availableLangs[b] ? b : e.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + b + ".js"), function() { CKEDITOR.tools.extend(a.lang.specialchar, e.langEntries[b]);
                            a.openDialog("specialchar") })
                    },
                    modes: { wysiwyg: 1 },
                    canUndo: false
                });
                a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
            }
        }), CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "),
        function() {
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo",
                init: function(a) {
                    var e = a.config,
                        b = a.lang.stylescombo,
                        c = {},
                        d = [],
                        i = [];
                    a.on("stylesSet", function(b) {
                        if (b = b.data.styles) {
                            for (var f, h, k, g = 0, m = b.length; g < m; g++) {
                                f = b[g];
                                if (!(a.blockless && f.element in CKEDITOR.dtd.$block)) {
                                    h = f.name;
                                    f = new CKEDITOR.style(f);
                                    if (!a.filter.customConfig || a.filter.check(f)) {
                                        f._name = h;
                                        f._.enterMode = e.enterMode;
                                        f._.type = k = f.assignedTo || f.type;
                                        f._.weight = g + (k == CKEDITOR.STYLE_OBJECT ? 1 : k == CKEDITOR.STYLE_BLOCK ? 2 : 3) * 1E3;
                                        c[h] = f;
                                        d.push(f);
                                        i.push(f)
                                    }
                                }
                            }
                            d.sort(function(a, b) { return a._.weight - b._.weight })
                        }
                    });
                    a.ui.addRichCombo("Styles", {
                        label: b.label,
                        title: b.panelTitle,
                        toolbar: "styles,10",
                        allowedContent: i,
                        panel: { css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss), multiSelect: true, attributes: { "aria-label": b.panelTitle } },
                        init: function() {
                            var a, c, e, i, g, m;
                            g = 0;
                            for (m = d.length; g < m; g++) {
                                a = d[g];
                                c = a._name;
                                i = a._.type;
                                if (i != e) { this.startGroup(b["panelTitle" + i]);
                                    e = i } this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(),
                                    c)
                            }
                            this.commit()
                        },
                        onClick: function(b) { a.focus();
                            a.fire("saveSnapshot"); var b = c[b],
                                d = a.elementPath();
                            a[b.checkActive(d, a) ? "removeStyle" : "applyStyle"](b);
                            a.fire("saveSnapshot") },
                        onRender: function() { a.on("selectionChange", function(b) { for (var d = this.getValue(), b = b.data.path.elements, e = 0, i = b.length, g; e < i; e++) { g = b[e]; for (var m in c)
                                        if (c[m].checkElementRemovable(g, true, a)) { m != d && this.setValue(m); return } } this.setValue("") }, this) },
                        onOpen: function() {
                            var d = a.getSelection().getSelectedElement(),
                                d = a.elementPath(d),
                                e = [0, 0, 0, 0];
                            this.showAll();
                            this.unmarkAll();
                            for (var h in c) { var i = c[h],
                                    g = i._.type;
                                i.checkApplicable(d, a, a.activeFilter) ? e[g]++ : this.hideItem(h);
                                i.checkActive(d, a) && this.mark(h) } e[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + CKEDITOR.STYLE_BLOCK]);
                            e[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + CKEDITOR.STYLE_INLINE]);
                            e[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + CKEDITOR.STYLE_OBJECT])
                        },
                        refresh: function() {
                            var b = a.elementPath();
                            if (b) {
                                for (var d in c)
                                    if (c[d].checkApplicable(b,
                                            a, a.activeFilter)) return;
                                this.setState(CKEDITOR.TRISTATE_DISABLED)
                            }
                        },
                        reset: function() { c = {};
                            d = [] }
                    })
                }
            })
        }(),
        function() {
            function a(a) {
                return {
                    editorFocus: false,
                    canUndo: false,
                    modes: { wysiwyg: 1 },
                    exec: function(b) {
                        if (b.editable().hasFocus) {
                            var c = b.getSelection(),
                                e;
                            if (e = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({ td: 1, th: 1 }, 1)) {
                                var c = b.createRange(),
                                    h = CKEDITOR.tools.tryThese(function() { var b = e.getParent().$.cells[e.$.cellIndex + (a ? -1 : 1)];
                                        b.parentNode.parentNode; return b }, function() {
                                        var b =
                                            e.getParent(),
                                            b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
                                        return b.cells[a ? b.cells.length - 1 : 0]
                                    });
                                if (!h && !a) { for (var k = e.getAscendant("table").$, h = e.getParent().$.cells, k = new CKEDITOR.dom.element(k.insertRow(-1), b.document), g = 0, m = h.length; g < m; g++) k.append((new CKEDITOR.dom.element(h[g], b.document)).clone(false, false)).appendBogus();
                                    c.moveToElementEditStart(k) } else if (h) { h = new CKEDITOR.dom.element(h);
                                    c.moveToElementEditStart(h);
                                    (!c.checkStartOfBlock() || !c.checkEndOfBlock()) && c.selectNodeContents(h) } else return true;
                                c.select(true);
                                return true
                            }
                        }
                        return false
                    }
                }
            }
            var e = { editorFocus: false, modes: { wysiwyg: 1, source: 1 } },
                b = { exec: function(a) { a.container.focusNext(true, a.tabIndex) } },
                c = { exec: function(a) { a.container.focusPrevious(true, a.tabIndex) } };
            CKEDITOR.plugins.add("tab", {
                init: function(d) {
                    for (var i = d.config.enableTabKeyTools !== false, j = d.config.tabSpaces || 0, f = ""; j--;) f = f + " ";
                    if (f) d.on("key", function(a) { if (a.data.keyCode == 9) { d.insertText(f);
                            a.cancel() } });
                    if (i) d.on("key", function(a) {
                        (a.data.keyCode == 9 && d.execCommand("selectNextCell") ||
                            a.data.keyCode == CKEDITOR.SHIFT + 9 && d.execCommand("selectPreviousCell")) && a.cancel()
                    });
                    d.addCommand("blur", CKEDITOR.tools.extend(b, e));
                    d.addCommand("blurBack", CKEDITOR.tools.extend(c, e));
                    d.addCommand("selectNextCell", a());
                    d.addCommand("selectPreviousCell", a(true))
                }
            })
        }(), CKEDITOR.dom.element.prototype.focusNext = function(a, e) {
            var b = e === void 0 ? this.getTabIndex() : e,
                c, d, i, j, f, h;
            if (b <= 0)
                for (f = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); f;) {
                    if (f.isVisible() && f.getTabIndex() === 0) { i = f; break } f = f.getNextSourceNode(false,
                        CKEDITOR.NODE_ELEMENT)
                } else
                    for (f = this.getDocument().getBody().getFirst(); f = f.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);) { if (!c)
                            if (!d && f.equals(this)) { d = true; if (a) { if (!(f = f.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT))) break;
                                    c = 1 } } else d && !this.contains(f) && (c = 1); if (f.isVisible() && !((h = f.getTabIndex()) < 0)) { if (c && h == b) { i = f; break } if (h > b && (!i || !j || h < j)) { i = f;
                                j = h } else if (!i && h === 0) { i = f;
                                j = h } } } i && i.focus()
        }, CKEDITOR.dom.element.prototype.focusPrevious = function(a, e) {
            for (var b = e === void 0 ? this.getTabIndex() :
                    e, c, d, i, j = 0, f, h = this.getDocument().getBody().getLast(); h = h.getPreviousSourceNode(false, CKEDITOR.NODE_ELEMENT);) { if (!c)
                    if (!d && h.equals(this)) { d = true; if (a) { if (!(h = h.getPreviousSourceNode(true, CKEDITOR.NODE_ELEMENT))) break;
                            c = 1 } } else d && !this.contains(h) && (c = 1); if (h.isVisible() && !((f = h.getTabIndex()) < 0))
                    if (b <= 0) { if (c && f === 0) { i = h; break } if (f > j) { i = h;
                            j = f } } else { if (c && f == b) { i = h; break } if (f < b && (!i || f > j)) { i = h;
                            j = f } } } i && i.focus()
        }, CKEDITOR.plugins.add("table", {
            requires: "dialog",
            init: function(a) {
                function e(a) {
                    return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function(a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } })
                }
                if (!a.blockless) {
                    var b = a.lang.table;
                    a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                        context: "table",
                        allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""),
                        requiredContent: "table",
                        contentTransformations: [
                            ["table{width}: sizeToStyle",
                                "table[width]: sizeToAttribute"
                            ]
                        ]
                    }));
                    a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e()));
                    a.addCommand("tableDelete", e({ exec: function(a) { var b = a.elementPath().contains("table", 1); if (b) { var e = b.getParent(),
                                    j = a.editable();
                                e.getChildCount() == 1 && (!e.is("td", "th") && !e.equals(j)) && (b = e);
                                a = a.createRange();
                                a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                                b.remove();
                                a.select() } } }));
                    a.ui.addButton && a.ui.addButton("Table", { label: b.toolbar, command: "table", toolbar: "insert,30" });
                    CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                    CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                    a.addMenuItems && a.addMenuItems({ table: { label: b.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: { label: b.deleteTable, command: "tableDelete", group: "table", order: 1 } });
                    a.on("doubleclick", function(a) { if (a.data.element.is("table")) a.data.dialog = "tableProperties" });
                    a.contextMenu && a.contextMenu.addListener(function() { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
                }
            }
        }),
        function() {
            function a(a) {
                function b(a) { if (!(c.length > 0) && a.type == CKEDITOR.NODE_ELEMENT && p.test(a.getName()) && !a.getCustomData("selected_cell")) { CKEDITOR.dom.element.setMarker(d, a, "selected_cell", true);
                        c.push(a) } }
                for (var a = a.getRanges(), c = [], d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    if (f.collapsed) { f = f.getCommonAncestor();
                        (f = f.getAscendant("td", true) || f.getAscendant("th", true)) && c.push(f) } else {
                        var f = new CKEDITOR.dom.walker(f),
                            g;
                        for (f.guard = b; g = f.next();)
                            if (g.type != CKEDITOR.NODE_ELEMENT || !g.is(CKEDITOR.dtd.table))
                                if ((g =
                                        g.getAscendant("td", true) || g.getAscendant("th", true)) && !g.getCustomData("selected_cell")) { CKEDITOR.dom.element.setMarker(d, g, "selected_cell", true);
                                    c.push(g) }
                    }
                }
                CKEDITOR.dom.element.clearAllMarkers(d);
                return c
            }

            function e(b, c) {
                for (var d = a(b), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], i = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[i]), h = c ? h : i, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length,
                        e = e.createElement("tr"), i = 0; f[i] && i < d; i++) { var j; if (f[i].rowSpan > 1 && h && f[i] == h[i]) { j = f[i];
                        j.rowSpan = j.rowSpan + 1 } else { j = (new CKEDITOR.dom.element(f[i])).clone();
                        j.removeAttribute("rowSpan");
                        j.appendBogus();
                        e.append(j);
                        j = j.$ } i = i + (j.colSpan - 1) } c ? e.insertBefore(g) : e.insertAfter(g)
            }

            function b(c) {
                if (c instanceof CKEDITOR.dom.selection) {
                    for (var d = a(c), e = d[0].getAscendant("table"), f = CKEDITOR.tools.buildTableMap(e), c = d[0].getParent().$.rowIndex, d = d[d.length - 1], g = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [],
                            h = c; h <= g; h++) { for (var i = f[h], j = new CKEDITOR.dom.element(e.$.rows[h]), k = 0; k < i.length; k++) { var m = new CKEDITOR.dom.element(i[k]),
                                p = m.getParent().$.rowIndex; if (m.$.rowSpan == 1) m.remove();
                            else { m.$.rowSpan = m.$.rowSpan - 1; if (p == h) { p = f[h + 1];
                                    p[k - 1] ? m.insertAfter(new CKEDITOR.dom.element(p[k - 1])) : (new CKEDITOR.dom.element(e.$.rows[h + 1])).append(m, 1) } } k = k + (m.$.colSpan - 1) } d.push(j) } f = e.$.rows;
                    e = new CKEDITOR.dom.element(f[g + 1] || (c > 0 ? f[c - 1] : null) || e.$.parentNode);
                    for (h = d.length; h >= 0; h--) b(d[h]);
                    return e
                }
                if (c instanceof CKEDITOR.dom.element) { e = c.getAscendant("table");
                    e.$.rows.length == 1 ? e.remove() : c.remove() }
                return null
            }

            function c(a, b) { for (var c = b ? Infinity : 0, d = 0; d < a.length; d++) { var e;
                    e = a[d]; for (var f = b, g = e.getParent().$.cells, h = 0, i = 0; i < g.length; i++) { var j = g[i],
                            h = h + (f ? 1 : j.colSpan); if (j == e.$) break } e = h - 1; if (b ? e < c : e > c) c = e } return c }

            function d(b, d) {
                for (var e = a(b), f = e[0].getAscendant("table"), g = c(e, 1), e = c(e), g = d ? g : e, h = CKEDITOR.tools.buildTableMap(f), f = [], e = [], i = h.length, j = 0; j < i; j++) {
                    f.push(h[j][g]);
                    e.push(d ? h[j][g - 1] : h[j][g +
                        1
                    ])
                }
                for (j = 0; j < i; j++)
                    if (f[j]) { if (f[j].colSpan > 1 && e[j] == f[j]) { g = f[j];
                            g.colSpan = g.colSpan + 1 } else { g = (new CKEDITOR.dom.element(f[j])).clone();
                            g.removeAttribute("colSpan");
                            g.appendBogus();
                            g[d ? "insertBefore" : "insertAfter"].call(g, new CKEDITOR.dom.element(f[j]));
                            g = g.$ } j = j + (g.rowSpan - 1) }
            }

            function i(a, b) { var c = a.getStartElement(); if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) { var d = c.clone();
                    d.appendBogus();
                    b ? d.insertBefore(c) : d.insertAfter(c) } }

            function j(b) {
                if (b instanceof CKEDITOR.dom.selection) {
                    var b =
                        a(b),
                        c = b[0] && b[0].getAscendant("table"),
                        d;
                    a: { var e = 0;d = b.length - 1; for (var g = {}, h, i; h = b[e++];) CKEDITOR.dom.element.setMarker(g, h, "delete_cell", true); for (e = 0; h = b[e++];)
                            if ((i = h.getPrevious()) && !i.getCustomData("delete_cell") || (i = h.getNext()) && !i.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(g);
                                d = i; break a }
                        CKEDITOR.dom.element.clearAllMarkers(g);i = b[0].getParent(); if (i = i.getPrevious()) d = i.getLast();
                        else { i = b[d].getParent();
                            d = (i = i.getNext()) ? i.getChild(0) : null } }
                    for (i = b.length - 1; i >=
                        0; i--) j(b[i]);
                    d ? f(d, true) : c && c.remove()
                } else if (b instanceof CKEDITOR.dom.element) { c = b.getParent();
                    c.getChildCount() == 1 ? c.remove() : b.remove() }
            }

            function f(a, b) { var c = a.getDocument(),
                    d = CKEDITOR.document; if (CKEDITOR.env.ie && CKEDITOR.env.version == 10) { d.focus();
                    c.focus() } c = new CKEDITOR.dom.range(c); if (!c["moveToElementEdit" + (b ? "End" : "Start")](a)) { c.selectNodeContents(a);
                    c.collapse(b ? false : true) } c.select(true) }

            function h(a, b, c) {
                a = a[b];
                if (typeof c == "undefined") return a;
                for (b = 0; a && b < a.length; b++) {
                    if (c.is &&
                        a[b] == c.$) return b;
                    if (b == c) return new CKEDITOR.dom.element(a[b])
                }
                return c.is ? -1 : null
            }

            function k(b, c, d) {
                var e = a(b),
                    f;
                if ((c ? e.length != 1 : e.length < 2) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return false;
                var g, b = e[0];
                f = b.getAscendant("table");
                var i = CKEDITOR.tools.buildTableMap(f),
                    j = i.length,
                    k = i[0].length,
                    m = b.getParent().$.rowIndex,
                    p = h(i, m, b);
                if (c) {
                    var y;
                    try {
                        var z = parseInt(b.getAttribute("rowspan"), 10) || 1;
                        g = parseInt(b.getAttribute("colspan"), 10) || 1;
                        y = i[c == "up" ? m - z : c == "down" ?
                            m + z : m][c == "left" ? p - g : c == "right" ? p + g : p]
                    } catch (B) { return false }
                    if (!y || b.$ == y) return false;
                    e[c == "up" || c == "left" ? "unshift" : "push"](new CKEDITOR.dom.element(y))
                }
                for (var c = b.getDocument(), A = m, z = y = 0, D = !d && new CKEDITOR.dom.documentFragment(c), C = 0, c = 0; c < e.length; c++) {
                    g = e[c];
                    var G = g.getParent(),
                        E = g.getFirst(),
                        H = g.$.colSpan,
                        L = g.$.rowSpan,
                        G = G.$.rowIndex,
                        J = h(i, G, g),
                        C = C + H * L,
                        z = Math.max(z, J - p + H);
                    y = Math.max(y, G - m + L);
                    if (!d) {
                        H = g;
                        (L = H.getBogus()) && L.remove();
                        H.trim();
                        if (g.getChildren().count()) {
                            if (G != A && E && (!E.isBlockBoundary ||
                                    !E.isBlockBoundary({ br: 1 })))(A = D.getLast(CKEDITOR.dom.walker.whitespaces(true))) && (!A.is || !A.is("br")) && D.append("br");
                            g.moveChildren(D)
                        }
                        c ? g.remove() : g.setHtml("")
                    }
                    A = G
                }
                if (d) return y * z == C;
                D.moveChildren(b);
                b.appendBogus();
                z >= k ? b.removeAttribute("rowSpan") : b.$.rowSpan = y;
                y >= j ? b.removeAttribute("colSpan") : b.$.colSpan = z;
                d = new CKEDITOR.dom.nodeList(f.$.rows);
                e = d.count();
                for (c = e - 1; c >= 0; c--) { f = d.getItem(c); if (!f.$.cells.length) { f.remove();
                        e++ } }
                return b
            }

            function g(b, c) {
                var d = a(b);
                if (d.length > 1) return false;
                if (c) return true;
                var d = d[0],
                    e = d.getParent(),
                    f = e.getAscendant("table"),
                    g = CKEDITOR.tools.buildTableMap(f),
                    i = e.$.rowIndex,
                    j = h(g, i, d),
                    k = d.$.rowSpan,
                    m;
                if (k > 1) { m = Math.ceil(k / 2); for (var k = Math.floor(k / 2), e = i + m, f = new CKEDITOR.dom.element(f.$.rows[e]), g = h(g, e), p, e = d.clone(), i = 0; i < g.length; i++) { p = g[i]; if (p.parentNode == f.$ && i > j) { e.insertBefore(new CKEDITOR.dom.element(p)); break } else p = null } p || f.append(e) } else { k = m = 1;
                    f = e.clone();
                    f.insertAfter(e);
                    f.append(e = d.clone());
                    p = h(g, i); for (j = 0; j < p.length; j++) p[j].rowSpan++ } e.appendBogus();
                d.$.rowSpan = m;
                e.$.rowSpan = k;
                m == 1 && d.removeAttribute("rowSpan");
                k == 1 && e.removeAttribute("rowSpan");
                return e
            }

            function m(b, c) {
                var d = a(b);
                if (d.length > 1) return false;
                if (c) return true;
                var d = d[0],
                    e = d.getParent(),
                    f = e.getAscendant("table"),
                    f = CKEDITOR.tools.buildTableMap(f),
                    g = h(f, e.$.rowIndex, d),
                    i = d.$.colSpan;
                if (i > 1) { e = Math.ceil(i / 2);
                    i = Math.floor(i / 2) } else { for (var i = e = 1, j = [], k = 0; k < f.length; k++) { var m = f[k];
                        j.push(m[g]);
                        m[g].rowSpan > 1 && (k = k + (m[g].rowSpan - 1)) } for (f = 0; f < j.length; f++) j[f].colSpan++ } f = d.clone();
                f.insertAfter(d);
                f.appendBogus();
                d.$.colSpan = e;
                f.$.colSpan = i;
                e == 1 && d.removeAttribute("colSpan");
                i == 1 && f.removeAttribute("colSpan");
                return f
            }
            var p = /^(?:td|th)$/;
            CKEDITOR.plugins.tabletools = {
                requires: "table,dialog,contextmenu",
                init: function(c) {
                    function h(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function(a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) }

                    function n(a, b) { var d = c.addCommand(a, b);
                        c.addFeature(d) }
                    var l = c.lang.table;
                    n("cellProperties", new CKEDITOR.dialogCommand("cellProperties", h({ allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: "table" })));
                    CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
                    n("rowDelete", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            f(b(a)) } }));
                    n("rowInsertBefore", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            e(a, true) } }));
                    n("rowInsertAfter", h({
                        requiredContent: "table",
                        exec: function(a) { a = a.getSelection();
                            e(a) }
                    }));
                    n("columnDelete", h({
                        requiredContent: "table",
                        exec: function(b) {
                            for (var b = b.getSelection(), b = a(b), c = b[0], d = b[b.length - 1], b = c.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(b), g, h, i = [], j = 0, k = e.length; j < k; j++)
                                for (var m = 0, l = e[j].length; m < l; m++) { e[j][m] == c.$ && (g = m);
                                    e[j][m] == d.$ && (h = m) }
                            for (j = g; j <= h; j++)
                                for (m = 0; m < e.length; m++) {
                                    d = e[m];
                                    c = new CKEDITOR.dom.element(b.$.rows[m]);
                                    d = new CKEDITOR.dom.element(d[j]);
                                    if (d.$) {
                                        d.$.colSpan == 1 ? d.remove() : d.$.colSpan = d.$.colSpan -
                                            1;
                                        m = m + (d.$.rowSpan - 1);
                                        c.$.cells.length || i.push(c)
                                    }
                                }
                            h = b.$.rows[0] && b.$.rows[0].cells;
                            g = new CKEDITOR.dom.element(h[g] || (g ? h[g - 1] : b.$.parentNode));
                            i.length == k && b.remove();
                            g && f(g, true)
                        }
                    }));
                    n("columnInsertBefore", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            d(a, true) } }));
                    n("columnInsertAfter", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            d(a) } }));
                    n("cellDelete", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            j(a) } }));
                    n("cellMerge", h({
                        allowedContent: "td[colspan,rowspan]",
                        requiredContent: "td[colspan,rowspan]",
                        exec: function(a) { f(k(a.getSelection()), true) }
                    }));
                    n("cellMergeRight", h({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function(a) { f(k(a.getSelection(), "right"), true) } }));
                    n("cellMergeDown", h({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function(a) { f(k(a.getSelection(), "down"), true) } }));
                    n("cellVerticalSplit", h({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function(a) { f(m(a.getSelection())) } }));
                    n("cellHorizontalSplit",
                        h({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function(a) { f(g(a.getSelection())) } }));
                    n("cellInsertBefore", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            i(a, true) } }));
                    n("cellInsertAfter", h({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                            i(a) } }));
                    c.addMenuItems && c.addMenuItems({
                        tablecell: {
                            label: l.cell.menu,
                            group: "tablecell",
                            order: 1,
                            getItems: function() {
                                var b = c.getSelection(),
                                    d = a(b);
                                return {
                                    tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                    tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                    tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                    tablecell_merge: k(b, null, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_merge_right: k(b, "right", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_merge_down: k(b, "down", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_split_vertical: m(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_split_horizontal: g(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_properties: d.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                                }
                            }
                        },
                        tablecell_insertBefore: { label: l.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 },
                        tablecell_insertAfter: { label: l.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 },
                        tablecell_delete: { label: l.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 },
                        tablecell_merge: { label: l.cell.merge, group: "tablecell", command: "cellMerge", order: 16 },
                        tablecell_merge_right: {
                            label: l.cell.mergeRight,
                            group: "tablecell",
                            command: "cellMergeRight",
                            order: 17
                        },
                        tablecell_merge_down: { label: l.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 },
                        tablecell_split_horizontal: { label: l.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 },
                        tablecell_split_vertical: { label: l.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 },
                        tablecell_properties: { label: l.cell.title, group: "tablecellproperties", command: "cellProperties", order: 21 },
                        tablerow: {
                            label: l.row.menu,
                            group: "tablerow",
                            order: 1,
                            getItems: function() {
                                return {
                                    tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                    tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                    tablerow_delete: CKEDITOR.TRISTATE_OFF
                                }
                            }
                        },
                        tablerow_insertBefore: { label: l.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 },
                        tablerow_insertAfter: { label: l.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 },
                        tablerow_delete: { label: l.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 },
                        tablecolumn: {
                            label: l.column.menu,
                            group: "tablecolumn",
                            order: 1,
                            getItems: function() {
                                return {
                                    tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                    tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                    tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                                }
                            }
                        },
                        tablecolumn_insertBefore: { label: l.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 },
                        tablecolumn_insertAfter: { label: l.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 },
                        tablecolumn_delete: { label: l.column.deleteColumn, group: "tablecolumn", command: "columnDelete", order: 15 }
                    });
                    c.contextMenu && c.contextMenu.addListener(function(a, b, c) {
                        return (a = c.contains({ td: 1, th: 1 },
                            1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null
                    })
                },
                getSelectedCells: a
            };
            CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
        }(), CKEDITOR.tools.buildTableMap = function(a) {
            for (var a = a.$.rows, e = -1, b = [], c = 0; c < a.length; c++) {
                e++;
                !b[e] && (b[e] = []);
                for (var d = -1, i = 0; i < a[c].cells.length; i++) {
                    var j = a[c].cells[i];
                    for (d++; b[e][d];) d++;
                    for (var f = isNaN(j.colSpan) ? 1 : j.colSpan, j = isNaN(j.rowSpan) ? 1 : j.rowSpan, h = 0; h < j; h++) {
                        b[e + h] || (b[e +
                            h] = []);
                        for (var k = 0; k < f; k++) b[e + h][d + k] = a[c].cells[i]
                    }
                    d = d + (f - 1)
                }
            }
            return b
        },
        function() {
            CKEDITOR.plugins.add("templates", { requires: "dialog", init: function(a) { CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
                    a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
                    a.ui.addButton && a.ui.addButton("Templates", { label: a.lang.templates.button, command: "templates", toolbar: "doctools,10" }) } });
            var a = {},
                e = {};
            CKEDITOR.addTemplates = function(b, c) { a[b] = c };
            CKEDITOR.getTemplates =
                function(b) { return a[b] };
            CKEDITOR.loadTemplates = function(a, c) { for (var d = [], i = 0, j = a.length; i < j; i++)
                    if (!e[a[i]]) { d.push(a[i]);
                        e[a[i]] = 1 }
                d.length ? CKEDITOR.scriptLoader.load(d, c) : setTimeout(c, 0) }
        }(), CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")], CKEDITOR.config.templates_replaceContent = !0,
        function() {
            function a(a) {
                function b() {
                    for (var g = c(), h = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), i = 0; i < h.length; i++) {
                        var k = h[i];
                        if (k != "/") {
                            typeof k == "string" && (k =
                                h[i] = { name: k });
                            var n, l = k.groups;
                            if (l)
                                for (var s = 0; s < l.length; s++) { n = l[s];
                                    (n = g[n]) && f(k, n) }(n = g[k.name]) && f(k, n)
                        }
                    }
                    return h
                }

                function c() { var b = {},
                        e, f, g; for (e in a.ui.items) { f = a.ui.items[e];
                        g = f.toolbar || "others";
                        g = g.split(",");
                        f = g[0];
                        g = parseInt(g[1] || -1, 10);
                        b[f] || (b[f] = []);
                        b[f].push({ name: e, order: g }) } for (f in b) b[f] = b[f].sort(function(a, b) { return a.order == b.order ? 0 : b.order < 0 ? -1 : a.order < 0 ? 1 : a.order < b.order ? -1 : 1 }); return b }

                function f(b, c) {
                    if (c.length) {
                        b.items ? b.items.push(a.ui.create("-")) : b.items = [];
                        for (var e; e =
                            c.shift();) { e = typeof e == "string" ? e : e.name; if (!k || CKEDITOR.tools.indexOf(k, e) == -1)(e = a.ui.create(e)) && a.addFeature(e) && b.items.push(e) }
                    }
                }

                function h(a) { var b = [],
                        c, d, e; for (c = 0; c < a.length; ++c) { d = a[c];
                        e = {}; if (d == "/") b.push(d);
                        else if (CKEDITOR.tools.isArray(d)) { f(e, CKEDITOR.tools.clone(d));
                            b.push(e) } else if (d.items) { f(e, CKEDITOR.tools.clone(d.items));
                            e.name = d.name;
                            b.push(e) } } return b }
                var k = a.config.removeButtons,
                    k = k && k.split(","),
                    g = a.config.toolbar;
                typeof g == "string" && (g = a.config["toolbar_" + g]);
                return a.toolbar =
                    g ? h(g) : b()
            }

            function e(a) { return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }]) }
            var b = function() {
                this.toolbars = [];
                this.focusCommandExecuted = false
            };
            b.prototype.focus = function() { for (var a = 0, b; b = this.toolbars[a++];)
                    for (var c = 0, e; e = b.items[c++];)
                        if (e.focus) { e.focus(); return } };
            var c = { modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function(a) { if (a.toolbox) { a.toolbox.focusCommandExecuted = true;
                        CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() { a.toolbox.focus() }, 100) : a.toolbox.focus() } } };
            CKEDITOR.plugins.add("toolbar", {
                requires: "button",
                init: function(d) {
                    var e, j = function(a, b) {
                        var c, g = d.lang.dir == "rtl",
                            m = d.config.toolbarGroupCycling,
                            p = g ? 37 : 39,
                            g = g ? 39 : 37,
                            m = m === void 0 || m;
                        switch (b) {
                            case 9:
                            case CKEDITOR.SHIFT + 9:
                                for (; !c || !c.items.length;) { c = b == 9 ? (c ? c.next : a.toolbar.next) || d.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) || d.toolbox.toolbars[d.toolbox.toolbars.length - 1]; if (c.items.length)
                                        for (a = c.items[e ? c.items.length - 1 : 0]; a && !a.focus;)(a = e ? a.previous : a.next) || (c = 0) } a && a.focus();
                                return false;
                            case p:
                                c = a;
                                do { c = c.next;!c && m && (c = a.toolbar.items[0]) } while (c && !c.focus);
                                c ? c.focus() : j(a, 9);
                                return false;
                            case 40:
                                if (a.button && a.button.hasArrow) {
                                    d.once("panelShow",
                                        function(a) { a.data._.panel._.currentBlock.onKeyDown(40) });
                                    a.execute()
                                } else j(a, b == 40 ? p : g);
                                return false;
                            case g:
                            case 38:
                                c = a;
                                do { c = c.previous;!c && m && (c = a.toolbar.items[a.toolbar.items.length - 1]) } while (c && !c.focus);
                                if (c) c.focus();
                                else { e = 1;
                                    j(a, CKEDITOR.SHIFT + 9);
                                    e = 0 }
                                return false;
                            case 27:
                                d.focus();
                                return false;
                            case 13:
                            case 32:
                                a.execute();
                                return false
                        }
                        return true
                    };
                    d.on("uiSpace", function(c) {
                        if (c.data.space == d.config.toolbarLocation) {
                            c.removeListener();
                            d.toolbox = new b;
                            var e = CKEDITOR.tools.getNextId(),
                                i = ['<span id="',
                                    e, '" class="cke_voice_label">', d.lang.toolbar.toolbars, "</span>", '<span id="' + d.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', e, '" onmousedown="return false;">'
                                ],
                                e = d.config.toolbarStartupExpanded !== false,
                                g, m;
                            d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && i.push('<span class="cke_toolbox_main"' + (e ? ">" : ' style="display:none">'));
                            for (var p = d.toolbox.toolbars, q = a(d), o = 0; o < q.length; o++) {
                                var n, l = 0,
                                    s, t = q[o],
                                    w;
                                if (t) {
                                    if (g) { i.push("</span>");
                                        m = g = 0 }
                                    if (t ===
                                        "/") i.push('<span class="cke_toolbar_break"></span>');
                                    else {
                                        w = t.items || t;
                                        for (var v = 0; v < w.length; v++) {
                                            var x = w[v],
                                                u;
                                            if (x)
                                                if (x.type == CKEDITOR.UI_SEPARATOR) m = g && x;
                                                else {
                                                    u = x.canGroup !== false;
                                                    if (!l) {
                                                        n = CKEDITOR.tools.getNextId();
                                                        l = { id: n, items: [] };
                                                        s = t.name && (d.lang.toolbar.toolbarGroups[t.name] || t.name);
                                                        i.push('<span id="', n, '" class="cke_toolbar"', s ? ' aria-labelledby="' + n + '_label"' : "", ' role="toolbar">');
                                                        s && i.push('<span id="', n, '_label" class="cke_voice_label">', s, "</span>");
                                                        i.push('<span class="cke_toolbar_start"></span>');
                                                        var r = p.push(l) - 1;
                                                        if (r > 0) { l.previous = p[r - 1];
                                                            l.previous.next = l }
                                                    }
                                                    if (u) { if (!g) { i.push('<span class="cke_toolgroup" role="presentation">');
                                                            g = 1 } } else if (g) { i.push("</span>");
                                                        g = 0 } n = function(a) { a = a.render(d, i);
                                                        r = l.items.push(a) - 1; if (r > 0) { a.previous = l.items[r - 1];
                                                            a.previous.next = a } a.toolbar = l;
                                                        a.onkey = j;
                                                        a.onfocus = function() { d.toolbox.focusCommandExecuted || d.focus() } };
                                                    if (m) { n(m);
                                                        m = 0 } n(x)
                                                }
                                        }
                                        if (g) { i.push("</span>");
                                            m = g = 0 } l && i.push('<span class="cke_toolbar_end"></span></span>')
                                    }
                                }
                            }
                            d.config.toolbarCanCollapse && i.push("</span>");
                            if (d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                var y = CKEDITOR.tools.addFunction(function() { d.execCommand("toolbarCollapse") });
                                d.on("destroy", function() { CKEDITOR.tools.removeFunction(y) });
                                d.addCommand("toolbarCollapse", {
                                    readOnly: 1,
                                    exec: function(a) {
                                        var b = a.ui.space("toolbar_collapser"),
                                            c = b.getPrevious(),
                                            d = a.ui.space("contents"),
                                            e = c.getParent(),
                                            f = parseInt(d.$.style.height, 10),
                                            g = e.$.offsetHeight,
                                            h = b.hasClass("cke_toolbox_collapser_min");
                                        if (h) {
                                            c.show();
                                            b.removeClass("cke_toolbox_collapser_min");
                                            b.setAttribute("title", a.lang.toolbar.toolbarCollapse)
                                        } else { c.hide();
                                            b.addClass("cke_toolbox_collapser_min");
                                            b.setAttribute("title", a.lang.toolbar.toolbarExpand) } b.getFirst().setText(h ? "▲" : "◀");
                                        d.setStyle("height", f - (e.$.offsetHeight - g) + "px");
                                        a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: d.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                    },
                                    modes: { wysiwyg: 1, source: 1 }
                                });
                                d.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                                i.push('<a title="' +
                                    (e ? d.lang.toolbar.toolbarCollapse : d.lang.toolbar.toolbarExpand) + '" id="' + d.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser');
                                e || i.push(" cke_toolbox_collapser_min");
                                i.push('" onclick="CKEDITOR.tools.callFunction(' + y + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                            }
                            i.push("</span>");
                            c.data.html = c.data.html + i.join("")
                        }
                    });
                    d.on("destroy", function() {
                        if (this.toolbox) {
                            var a, b = 0,
                                c, d, e;
                            for (a = this.toolbox.toolbars; b < a.length; b++) {
                                d = a[b].items;
                                for (c = 0; c < d.length; c++) {
                                    e = d[c];
                                    e.clickFn && CKEDITOR.tools.removeFunction(e.clickFn);
                                    e.keyDownFn && CKEDITOR.tools.removeFunction(e.keyDownFn)
                                }
                            }
                        }
                    });
                    d.on("uiReady", function() { var a = d.ui.space("toolbox");
                        a && d.focusManager.add(a, 1) });
                    d.addCommand("toolbarFocus", c);
                    d.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                    d.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                    d.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function() { return { render: function(a, b) { b.push('<span class="cke_toolbar_separator" role="separator"></span>'); return {} } } } })
                }
            });
            CKEDITOR.ui.prototype.addToolbarGroup =
                function(a, b, c) { var f = e(this.editor),
                        h = b === 0,
                        k = { name: a }; if (c) { if (c = CKEDITOR.tools.search(f, function(a) { return a.name == c })) {!c.groups && (c.groups = []); if (b) { b = CKEDITOR.tools.indexOf(c.groups, b); if (b >= 0) { c.groups.splice(b + 1, 0, a); return } } h ? c.groups.splice(0, 0, a) : c.groups.push(a); return } b = null } b && (b = CKEDITOR.tools.indexOf(f, function(a) { return a.name == b }));
                    h ? f.splice(0, 0, a) : typeof b == "number" ? f.splice(b + 1, 0, k) : f.push(a) }
        }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", "use strict",
        function() {
            var a = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90],
                e = { 8: 1, 46: 1 };
            CKEDITOR.plugins.add("undo", {
                init: function(c) {
                    function d(a) { g.enabled && a.data.command.canUndo !== false && g.save() }

                    function e() { g.enabled = c.readOnly ? false : c.mode == "wysiwyg";
                        g.onChange() }
                    var g = c.undoManager = new b(c),
                        j = g.editingHandler = new i(g),
                        p = c.addCommand("undo", { exec: function() { if (g.undo()) { c.selectionChange();
                                    this.fire("afterUndo") } }, startDisabled: true, canUndo: false }),
                        q = c.addCommand("redo", {
                            exec: function() {
                                if (g.redo()) {
                                    c.selectionChange();
                                    this.fire("afterRedo")
                                }
                            },
                            startDisabled: true,
                            canUndo: false
                        });
                    c.setKeystroke([
                        [a[0], "undo"],
                        [a[1], "redo"],
                        [a[2], "redo"]
                    ]);
                    g.onChange = function() { p.setState(g.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                        q.setState(g.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) };
                    c.on("beforeCommandExec", d);
                    c.on("afterCommandExec", d);
                    c.on("saveSnapshot", function(a) { g.save(a.data && a.data.contentOnly) });
                    c.on("contentDom", j.attachListeners, j);
                    c.on("instanceReady", function() { c.fire("saveSnapshot") });
                    c.on("beforeModeUnload", function() { c.mode == "wysiwyg" && g.save(true) });
                    c.on("mode", e);
                    c.on("readOnly", e);
                    if (c.ui.addButton) { c.ui.addButton("Undo", { label: c.lang.undo.undo, command: "undo", toolbar: "undo,10" });
                        c.ui.addButton("Redo", { label: c.lang.undo.redo, command: "redo", toolbar: "undo,20" }) } c.resetUndo = function() { g.reset();
                        c.fire("saveSnapshot") };
                    c.on("updateSnapshot", function() { g.currentImage && g.update() });
                    c.on("lockSnapshot", function(a) { a = a.data;
                        g.lock(a && a.dontUpdate, a && a.forceUpdate) });
                    c.on("unlockSnapshot",
                        g.unlock, g)
                }
            });
            CKEDITOR.plugins.undo = {};
            var b = CKEDITOR.plugins.undo.UndoManager = function(a) { this.strokesRecorded = [0, 0];
                this.locked = null;
                this.previousKeyGroup = -1;
                this.limit = a.config.undoStackSize || 20;
                this.strokesLimit = 25;
                this.editor = a;
                this.reset() };
            b.prototype = {
                type: function(a, c) {
                    var d = b.getKeyGroup(a),
                        e = this.strokesRecorded[d] + 1,
                        c = c || e >= this.strokesLimit;
                    if (!this.typing) { this.hasUndo = this.typing = true;
                        this.hasRedo = false;
                        this.onChange() }
                    if (c) { e = 0;
                        this.editor.fire("saveSnapshot") } else this.editor.fire("change");
                    this.strokesRecorded[d] = e;
                    this.previousKeyGroup = d
                },
                keyGroupChanged: function(a) { return b.getKeyGroup(a) != this.previousKeyGroup },
                reset: function() { this.snapshots = [];
                    this.index = -1;
                    this.currentImage = null;
                    this.hasRedo = this.hasUndo = false;
                    this.locked = null;
                    this.resetType() },
                resetType: function() { this.strokesRecorded = [0, 0];
                    this.typing = false;
                    this.previousKeyGroup = -1 },
                refreshState: function() { this.hasUndo = !!this.getNextImage(true);
                    this.hasRedo = !!this.getNextImage(false);
                    this.resetType();
                    this.onChange() },
                save: function(a,
                    b, d) {
                    var e = this.editor;
                    if (this.locked || e.status != "ready" || e.mode != "wysiwyg") return false;
                    var i = e.editable();
                    if (!i || i.status != "ready") return false;
                    i = this.snapshots;
                    b || (b = new c(e));
                    if (b.contents === false) return false;
                    if (this.currentImage)
                        if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return false } else d !== false && e.fire("change");
                    i.splice(this.index + 1, i.length - this.index - 1);
                    i.length == this.limit && i.shift();
                    this.index = i.push(b) - 1;
                    this.currentImage = b;
                    d !== false && this.refreshState();
                    return true
                },
                restoreImage: function(a) { var b = this.editor,
                        c; if (a.bookmarks) { b.focus();
                        c = b.getSelection() } this.locked = { level: 999 };
                    this.editor.loadSnapshot(a.contents); if (a.bookmarks) c.selectBookmarks(a.bookmarks);
                    else if (CKEDITOR.env.ie) { c = this.editor.document.getBody().$.createTextRange();
                        c.collapse(true);
                        c.select() } this.locked = null;
                    this.index = a.index;
                    this.currentImage = this.snapshots[this.index];
                    this.update();
                    this.refreshState();
                    b.fire("change") },
                getNextImage: function(a) {
                    var b = this.snapshots,
                        c = this.currentImage,
                        d;
                    if (c)
                        if (a)
                            for (d = this.index - 1; d >= 0; d--) { a = b[d]; if (!c.equalsContent(a)) { a.index = d; return a } } else
                                for (d = this.index + 1; d < b.length; d++) { a = b[d]; if (!c.equalsContent(a)) { a.index = d; return a } }
                    return null
                },
                redoable: function() { return this.enabled && this.hasRedo },
                undoable: function() { return this.enabled && this.hasUndo },
                undo: function() { if (this.undoable()) { this.save(true); var a = this.getNextImage(true); if (a) return this.restoreImage(a), true } return false },
                redo: function() {
                    if (this.redoable()) {
                        this.save(true);
                        if (this.redoable()) {
                            var a =
                                this.getNextImage(false);
                            if (a) return this.restoreImage(a), true
                        }
                    }
                    return false
                },
                update: function(a) { if (!this.locked) { a || (a = new c(this.editor)); for (var b = this.index, d = this.snapshots; b > 0 && this.currentImage.equalsContent(d[b - 1]);) b = b - 1;
                        d.splice(b, this.index - b + 1, a);
                        this.index = b;
                        this.currentImage = a } },
                updateSelection: function(a) { if (!this.snapshots.length) return false; var b = this.snapshots,
                        c = b[b.length - 1]; if (c.equalsContent(a) && !c.equalsSelection(a)) { this.currentImage = b[b.length - 1] = a; return true } return false },
                lock: function(a, b) { if (this.locked) this.locked.level++;
                    else if (a) this.locked = { level: 1 };
                    else { var d = null; if (b) d = true;
                        else { var e = new c(this.editor, true);
                            this.currentImage && this.currentImage.equalsContent(e) && (d = e) } this.locked = { update: d, level: 1 } } },
                unlock: function() { if (this.locked && !--this.locked.level) { var a = this.locked.update;
                        this.locked = null; if (a === true) this.update();
                        else if (a) { var b = new c(this.editor, true);
                            a.equalsContent(b) || this.update() } } }
            };
            b.navigationKeyCodes = {
                37: 1,
                38: 1,
                39: 1,
                40: 1,
                36: 1,
                35: 1,
                33: 1,
                34: 1
            };
            b.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 };
            b.isNavigationKey = function(a) { return !!b.navigationKeyCodes[a] };
            b.getKeyGroup = function(a) { var c = b.keyGroups; return e[a] ? c.FUNCTIONAL : c.PRINTABLE };
            b.getOppositeKeyGroup = function(a) { var c = b.keyGroups; return a == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL };
            b.ieFunctionalKeysBug = function(a) { return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL };
            var c = CKEDITOR.plugins.undo.Image = function(a, b) {
                    this.editor = a;
                    a.fire("beforeUndoImage");
                    var c = a.getSnapshot();
                    CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
                    this.contents = c;
                    if (!b) this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(true);
                    a.fire("afterUndoImage")
                },
                d = /\b(?:href|src|name)="[^"]*?"/gi;
            c.prototype = {
                equalsContent: function(a) { var b = this.contents,
                        a = a.contents; if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks)) { b = b.replace(d, "");
                        a = a.replace(d, "") } return b != a ? false : true },
                equalsSelection: function(a) {
                    var b = this.bookmarks,
                        a = a.bookmarks;
                    if (b || a) {
                        if (!b || !a || b.length !=
                            a.length) return false;
                        for (var c = 0; c < b.length; c++) { var d = b[c],
                                e = a[c]; if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end, e.end)) return false }
                    }
                    return true
                }
            };
            var i = CKEDITOR.plugins.undo.NativeEditingHandler = function(a) { this.undoManager = a;
                this.ignoreInputEvent = false;
                this.keyEventsStack = new j;
                this.lastKeydownImage = null };
            i.prototype = {
                onKeydown: function(d) {
                    var e = d.data.getKey();
                    if (e !== 229)
                        if (CKEDITOR.tools.indexOf(a,
                                d.data.getKeystroke()) > -1) d.data.preventDefault();
                        else { this.keyEventsStack.cleanUp(d);
                            d = this.undoManager;
                            this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e);
                            this.lastKeydownImage = new c(d.editor); if (b.isNavigationKey(e) || this.undoManager.keyGroupChanged(e))
                                if (d.strokesRecorded[0] || d.strokesRecorded[1]) { d.save(false, this.lastKeydownImage, false);
                                    d.resetType() } }
                },
                onInput: function() {
                    if (this.ignoreInputEvent) this.ignoreInputEvent = false;
                    else {
                        var a = this.keyEventsStack.getLast();
                        a || (a = this.keyEventsStack.push(0));
                        this.keyEventsStack.increment(a.keyCode);
                        if (this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit) { this.undoManager.type(a.keyCode, true);
                            this.keyEventsStack.resetInputs() }
                    }
                },
                onKeyup: function(a) { var d = this.undoManager,
                        a = a.data.getKey(),
                        e = this.keyEventsStack.getTotalInputs();
                    this.keyEventsStack.remove(a); if (!b.ieFunctionalKeysBug(a) || !this.lastKeydownImage || !this.lastKeydownImage.equalsContent(new c(d.editor, true)))
                        if (e > 0) d.type(a);
                        else if (b.isNavigationKey(a)) this.onNavigationKey(true) },
                onNavigationKey: function(a) { var b = this.undoManager;
                    (a || !b.save(true, null, false)) && b.updateSelection(new c(b.editor));
                    b.resetType() },
                ignoreInputEventListener: function() { this.ignoreInputEvent = true },
                attachListeners: function() {
                    var a = this.undoManager.editor,
                        c = a.editable(),
                        d = this;
                    c.attachListener(c, "keydown", function(a) { d.onKeydown(a); if (b.ieFunctionalKeysBug(a.data.getKey())) d.onInput() }, null, null, 999);
                    c.attachListener(c, CKEDITOR.env.ie ? "keypress" : "input", d.onInput, d, null, 999);
                    c.attachListener(c, "keyup",
                        d.onKeyup, d, null, 999);
                    c.attachListener(c, "paste", d.ignoreInputEventListener, d, null, 999);
                    c.attachListener(c, "drop", d.ignoreInputEventListener, d, null, 999);
                    c.attachListener(c.isInline() ? c : a.document.getDocumentElement(), "click", function() { d.onNavigationKey() }, null, null, 999);
                    c.attachListener(this.undoManager.editor, "blur", function() { d.keyEventsStack.remove(9) }, null, null, 999)
                }
            };
            var j = CKEDITOR.plugins.undo.KeyEventsStack = function() { this.stack = [] };
            j.prototype = {
                push: function(a) {
                    return this.stack[this.stack.push({
                        keyCode: a,
                        inputs: 0
                    }) - 1]
                },
                getLastIndex: function(a) { if (typeof a != "number") return this.stack.length - 1; for (var b = this.stack.length; b--;)
                        if (this.stack[b].keyCode == a) return b; return -1 },
                getLast: function(a) { a = this.getLastIndex(a); return a != -1 ? this.stack[a] : null },
                increment: function(a) { this.getLast(a).inputs++ },
                remove: function(a) { a = this.getLastIndex(a);
                    a != -1 && this.stack.splice(a, 1) },
                resetInputs: function(a) { if (typeof a == "number") this.getLast(a).inputs = 0;
                    else
                        for (a = this.stack.length; a--;) this.stack[a].inputs = 0 },
                getTotalInputs: function() {
                    for (var a =
                            this.stack.length, b = 0; a--;) b = b + this.stack[a].inputs;
                    return b
                },
                cleanUp: function(a) { a = a.data.$;!a.ctrlKey && !a.metaKey && this.remove(17);
                    a.shiftKey || this.remove(16);
                    a.altKey || this.remove(18) }
            }
        }(), CKEDITOR.plugins.add("wsc", {
            requires: "dialog",
            parseApi: function(a) { a.config.wsc_onFinish = typeof a.config.wsc_onFinish === "function" ? a.config.wsc_onFinish : function() {};
                a.config.wsc_onClose = typeof a.config.wsc_onClose === "function" ? a.config.wsc_onClose : function() {} },
            parseConfig: function(a) {
                a.config.wsc_customerId =
                    a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
                a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || "";
                a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
                a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
                CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd ||
                    "spell";
                CKEDITOR.config.wsc_version = "v4.3.0-master-d769233";
                CKEDITOR.config.wsc_removeGlobalVariable = true
            },
            init: function(a) {
                var e = CKEDITOR.env;
                this.parseConfig(a);
                this.parseApi(a);
                a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(e.ie && (e.version < 8 || e.quirks)) };
                typeof a.plugins.scayt == "undefined" && a.ui.addButton && a.ui.addButton("SpellChecker", {
                    label: a.lang.wsc.toolbar,
                    click: function(a) {
                        var c =
                            a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
                        (c = c.replace(/\s/g, "")) ? a.execCommand("checkspell"): alert("Nothing to check!")
                    },
                    toolbar: "spellchecker,10"
                });
                CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && CKEDITOR.env.version <= 7 ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
            }
        }),
        function() {
            function a(a) {
                var b = this.editor,
                    c = a.document,
                    f = c.body,
                    h = c.getElementById("cke_actscrpt");
                h && h.parentNode.removeChild(h);
                (h = c.getElementById("cke_shimscrpt")) && h.parentNode.removeChild(h);
                (h = c.getElementById("cke_basetagscrpt")) && h.parentNode.removeChild(h);
                f.contentEditable = true;
                if (CKEDITOR.env.ie) { f.hideFocus = true;
                    f.disabled = true;
                    f.removeAttribute("disabled") } delete this._.isLoadingData;
                this.$ = f;
                c = new CKEDITOR.dom.document(c);
                this.setup();
                this.fixInitialSelection();
                if (CKEDITOR.env.ie) {
                    c.getDocumentElement().addClass(c.$.compatMode);
                    b.config.enterMode != CKEDITOR.ENTER_P && this.attachListener(c, "selectionchange", function() {
                        var a =
                            c.getBody(),
                            d = b.getSelection(),
                            e = d && d.getRanges()[0];
                        e && (a.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i) && e.startContainer.equals(a)) && setTimeout(function() { e = b.getSelection().getRanges()[0]; if (!e.startContainer.equals("body")) { a.getFirst().remove(1);
                                e.moveToElementEditEnd(a);
                                e.select() } }, 0)
                    })
                }
                if (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version > 10) c.getDocumentElement().on("mousedown", function(a) { a.data.getTarget().is("html") && setTimeout(function() { b.editable().focus() }) });
                e(b);
                try {
                    b.document.$.execCommand("2D-position",
                        false, true)
                } catch (k) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie && b.document.$.compatMode == "CSS1Compat") && this.attachListener(this, "keydown", function(a) { var c = a.data.getKeystroke(); if (c == 33 || c == 34)
                        if (CKEDITOR.env.ie) setTimeout(function() { b.getSelection().scrollIntoView() }, 0);
                        else if (b.window.$.innerHeight > this.$.offsetHeight) { var d = b.createRange();
                        d[c == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                        d.select();
                        a.data.preventDefault() } });
                CKEDITOR.env.ie && this.attachListener(c, "blur", function() { try { c.$.selection.empty() } catch (a) {} });
                CKEDITOR.env.iOS && this.attachListener(c, "touchend", function() { a.focus() });
                f = b.document.getElementsByTag("title").getItem(0);
                f.data("cke-title", f.getText());
                if (CKEDITOR.env.ie) b.document.$.title = this._.docTitle;
                CKEDITOR.tools.setTimeout(function() { if (this.status == "unloaded") this.status = "ready";
                    b.fire("contentDom"); if (this._.isPendingFocus) { b.focus();
                        this._.isPendingFocus = false } setTimeout(function() { b.fire("dataReady") }, 0) }, 0, this)
            }

            function e(a) {
                function b() {
                    var e;
                    a.editable().attachListener(a, "selectionChange",
                        function() { var b = a.getSelection().getSelectedElement(); if (b) { if (e) { e.detachEvent("onresizestart", c);
                                    e = null } b.$.attachEvent("onresizestart", c);
                                e = b.$ } })
                }

                function c(a) { a.returnValue = false }
                if (CKEDITOR.env.gecko) try { var e = a.document.$;
                    e.execCommand("enableObjectResizing", false, !a.config.disableObjectResizing);
                    e.execCommand("enableInlineTableEditing", false, !a.config.disableNativeTableHandles) } catch (h) {} else CKEDITOR.env.ie && (CKEDITOR.env.version < 11 && a.config.disableObjectResizing) && b(a)
            }

            function b() {
                var a = [];
                if (CKEDITOR.document.$.documentMode >= 8) { a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}"); var b = [],
                        c; for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable=false]");
                    a.push(b.join(",") + "{display:inline-block}") } else if (CKEDITOR.env.gecko) { a.push("html{height:100% !important}");
                    a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}") } a.push("html{cursor:text;*cursor:auto}");
                a.push("img,input,textarea{cursor:default}");
                return a.join("\n")
            }
            CKEDITOR.plugins.add("wysiwygarea", {
                init: function(a) {
                    a.config.fullPage && a.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" });
                    a.addMode("wysiwyg", function(b) {
                        function e(f) { f && f.removeListener();
                            a.editable(new c(a, h.$.contentWindow.document.body));
                            a.setData(a.getData(1), b) }
                        var f = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
                            f = CKEDITOR.env.air ? "javascript:void(0)" :
                            CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(f) + "}())" : "",
                            h = CKEDITOR.dom.element.createFromHtml('<iframe src="' + f + '" frameBorder="0"></iframe>');
                        h.setStyles({ width: "100%", height: "100%" });
                        h.addClass("cke_wysiwyg_frame").addClass("cke_reset");
                        f = a.ui.space("contents");
                        f.append(h);
                        var k = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
                        if (k) h.on("load", e);
                        var g = a.title,
                            m = a.fire("ariaEditorHelpLabel", {}).label;
                        if (g) {
                            CKEDITOR.env.ie && m && (g = g + (", " + m));
                            h.setAttribute("title",
                                g)
                        }
                        if (m) { var g = CKEDITOR.tools.getNextId(),
                                p = CKEDITOR.dom.element.createFromHtml('<span id="' + g + '" class="cke_voice_label">' + m + "</span>");
                            f.append(p, 1);
                            h.setAttribute("aria-describedby", g) } a.on("beforeModeUnload", function(a) { a.removeListener();
                            p && p.remove() });
                        h.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" });
                        !k && e();
                        a.fire("ariaWidget", h)
                    })
                }
            });
            CKEDITOR.editor.prototype.addContentsCss = function(a) { var b = this.config,
                    c = b.contentsCss; if (!CKEDITOR.tools.isArray(c)) b.contentsCss = c ? [c] : [];
                b.contentsCss.push(a) };
            var c = CKEDITOR.tools.createClass({
                $: function() { this.base.apply(this, arguments);
                    this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(b) { CKEDITOR.tools.setTimeout(a, 0, this, b) }, this);
                    this._.docTitle = this.getWindow().getFrame().getAttribute("title") },
                base: CKEDITOR.editable,
                proto: {
                    setData: function(a, c) {
                        var e = this.editor;
                        if (c) { this.setHtml(a);
                            this.fixInitialSelection();
                            e.fire("dataReady") } else {
                            this._.isLoadingData = true;
                            e._.dataStore = { id: 1 };
                            var f = e.config,
                                h = f.fullPage,
                                k = f.docType,
                                g = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/,
                                    '<style data-cke-temp="1">');
                            h || (g = g + CKEDITOR.tools.buildStyleHtml(e.config.contentsCss));
                            var m = f.baseHref ? '<base href="' + f.baseHref + '" data-cke-temp="1" />' : "";
                            h && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) { e.docType = k = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function(a) { e.xmlDeclaration = a; return "" }));
                            a = e.dataProcessor.toHtml(a);
                            if (h) {
                                /<body[\s|>]/.test(a) || (a = "<body>" + a);
                                /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>");
                                /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) :
                                    a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>");
                                m && (a = a.replace(/<head[^>]*?>/, "$&" + m));
                                a = a.replace(/<\/head\s*>/, g + "$&");
                                a = k + a
                            } else a = f.docType + '<html dir="' + f.contentsLangDirection + '" lang="' + (f.contentsLanguage || e.langCode) + '"><head><title>' + this._.docTitle + "</title>" + m + g + "</head><body" + (f.bodyId ? ' id="' + f.bodyId + '"' : "") + (f.bodyClass ? ' class="' + f.bodyClass + '"' : "") + ">" + a + "</body></html>";
                            if (CKEDITOR.env.gecko) {
                                a = a.replace(/<body/, '<body contenteditable="true" ');
                                CKEDITOR.env.version <
                                    2E4 && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>"))
                            }
                            f = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>";
                            CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (f = f + '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>');
                            m && (CKEDITOR.env.ie && CKEDITOR.env.version < 10) && (f = f + '<script id="cke_basetagscrpt">var baseTag = document.querySelector( "base" );baseTag.href = baseTag.href;<\/script>');
                            a = a.replace(/(?=\s*<\/(:?head)>)/, f);
                            this.clearCustomData();
                            this.clearListeners();
                            e.fire("contentDomUnload");
                            var p = this.getDocument();
                            try { p.write(a) } catch (q) { setTimeout(function() { p.write(a) }, 0) }
                        }
                    },
                    getData: function(a) {
                        if (a) return this.getHtml();
                        var a = this.editor,
                            b = a.config,
                            c = b.fullPage,
                            e = c && a.docType,
                            h = c && a.xmlDeclaration,
                            k = this.getDocument(),
                            c = c ? k.getDocumentElement().getOuterHtml() : k.getBody().getHtml();
                        CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                        c = a.dataProcessor.toDataFormat(c);
                        h && (c = h + "\n" + c);
                        e && (c = e + "\n" + c);
                        return c
                    },
                    focus: function() { this._.isLoadingData ? this._.isPendingFocus = true : c.baseProto.focus.call(this) },
                    detach: function() {
                        var a = this.editor,
                            b = a.document,
                            a = a.window.getFrame();
                        c.baseProto.detach.call(this);
                        this.clearCustomData();
                        b.getDocumentElement().clearCustomData();
                        a.clearCustomData();
                        CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                        (b = a.removeCustomData("onResize")) && b.removeListener();
                        a.remove()
                    }
                }
            })
        }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.contentsCss = CKEDITOR.getUrl("contents.css"), CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,templates,toolbar,undo,wsc,wysiwygarea",
        CKEDITOR.config.skin = "moono",
        function() {
            var a = function(a, b) { for (var c = CKEDITOR.getUrl("plugins/" + b), a = a.split(","), d = 0; d < a.length; d++) CKEDITOR.skin.icons[a[d]] = { path: c, offset: -a[++d], bgsize: a[++d] } };
            CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,creatediv,456,,docprops-rtl,480,,docprops,504,,embed,528,,embedsemantic,552,,find-rtl,576,,find,600,,replace,624,,flash,648,,button,672,,checkbox,696,,form,720,,hiddenfield,744,,imagebutton,768,,radio,792,,select-rtl,816,,select,840,,textarea-rtl,864,,textarea,888,,textfield-rtl,912,,textfield,936,,horizontalrule,960,,iframe,984,,image,1008,,indent-rtl,1032,,indent,1056,,outdent-rtl,1080,,outdent,1104,,justifyblock,1128,,justifycenter,1152,,justifyleft,1176,,justifyright,1200,,language,1224,,anchor-rtl,1248,,anchor,1272,,link,1296,,unlink,1320,,bulletedlist-rtl,1344,,bulletedlist,1368,,numberedlist-rtl,1392,,numberedlist,1416,,mathjax,1440,,maximize,1464,,newpage-rtl,1488,,newpage,1512,,pagebreak-rtl,1536,,pagebreak,1560,,pastefromword-rtl,1584,,pastefromword,1608,,pastetext-rtl,1632,,pastetext,1656,,placeholder,1680,,preview-rtl,1704,,preview,1728,,print,1752,,removeformat,1776,,save,1800,,scayt,1824,,selectall,1848,,showblocks-rtl,1872,,showblocks,1896,,smiley,1920,,source-rtl,1944,,source,1968,,sourcedialog-rtl,1992,,sourcedialog,2016,,specialchar,2040,,table,2064,,templates-rtl,2088,,templates,2112,,uicolor,2136,,redo-rtl,2160,,redo,2184,,undo-rtl,2208,,undo,2232,,simplebox,4512,auto,spellchecker,2280,",
                "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,creatediv,456,auto,docprops-rtl,480,auto,docprops,504,auto,embed,528,auto,embedsemantic,552,auto,find-rtl,576,auto,find,600,auto,replace,624,auto,flash,648,auto,button,672,auto,checkbox,696,auto,form,720,auto,hiddenfield,744,auto,imagebutton,768,auto,radio,792,auto,select-rtl,816,auto,select,840,auto,textarea-rtl,864,auto,textarea,888,auto,textfield-rtl,912,auto,textfield,936,auto,horizontalrule,960,auto,iframe,984,auto,image,1008,auto,indent-rtl,1032,auto,indent,1056,auto,outdent-rtl,1080,auto,outdent,1104,auto,justifyblock,1128,auto,justifycenter,1152,auto,justifyleft,1176,auto,justifyright,1200,auto,language,1224,auto,anchor-rtl,1248,auto,anchor,1272,auto,link,1296,auto,unlink,1320,auto,bulletedlist-rtl,1344,auto,bulletedlist,1368,auto,numberedlist-rtl,1392,auto,numberedlist,1416,auto,mathjax,1440,auto,maximize,1464,auto,newpage-rtl,1488,auto,newpage,1512,auto,pagebreak-rtl,1536,auto,pagebreak,1560,auto,pastefromword-rtl,1584,auto,pastefromword,1608,auto,pastetext-rtl,1632,auto,pastetext,1656,auto,placeholder,1680,auto,preview-rtl,1704,auto,preview,1728,auto,print,1752,auto,removeformat,1776,auto,save,1800,auto,scayt,1824,auto,selectall,1848,auto,showblocks-rtl,1872,auto,showblocks,1896,auto,smiley,1920,auto,source-rtl,1944,auto,source,1968,auto,sourcedialog-rtl,1992,auto,sourcedialog,2016,auto,specialchar,2040,auto,table,2064,auto,templates-rtl,2088,auto,templates,2112,auto,uicolor,2136,auto,redo-rtl,2160,auto,redo,2184,auto,undo-rtl,2208,auto,undo,2232,auto,simplebox,2256,auto,spellchecker,2280,auto",
                "icons.png")
        }()
})();