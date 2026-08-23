/**
 * AbeFilm Cinema Theme - Combined JavaScript (COMPLETE)
 * =====================================================
 * Includes:
 *   - Owl Carousel v2.3.4
 *   - Sidebar, Skeleton, Popular Posts, Comments
 *   - AbeFlix History, Slider, ColorSync, SafePrune
 *   - ATW Mask, Progress Bar
 *   - Network Detection (Auto-Dismiss on reconnect)
 *   - Main Layout (Search, QA, Watchlist, Account)
 *   - Anti-DevTool
 *
 * GitHub Setup:
 *   1. Upload this file to GitHub (Public repo)
 *   2. Your CDN link:
 *      https://cdn.jsdelivr.net/gh/USERNAME/REPO@main/abefilm-combined.js
 *   3. In theme, replace YOUR_USERNAME/YOUR_REPO with your details
 * =====================================================
 */

/* ============================================================ */
/* // Owl Carousel v2.3.4 (jQuery Plugin)              */
/* ============================================================ */

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null,
        this.options = a.extend({},
        e.Defaults, c),
        this.$element = a(b),
        this._handlers = {},
        this._plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = [],
        this._breakpoint = null,
        this._width = null,
        this._items = [],
        this._clones = [],
        this._mergers = [],
        this._widths = [],
        this._invalidated = {},
        this._pipe = [],
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        },
        this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        },
        a.each(
        ["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        },
        this)),
        a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        },
        this)),
        a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        },
        this)),
        this.setup(),
        this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    },
    e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    },
    e.Type = {
        Event: "event",
        State: "state"
    },
    e.Plugins = {},
    e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    },
    {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
                width: "auto",
                "margin-left": d ? b : "",
                "margin-right": d ? "" : b
            }; ! c && this.$stage.children().css(e),
            a.css = e
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
            for (a.items = {
                merge: !1,
                width: b
            }; d--;) c = this._mergers[d],
            c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
            a.items.merge = c > 1 || a.items.merge,
            f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    },
    {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
            h = "",
            i = "";
            for (g /= 2; g > 0;) b.push(this.normalize(b.length / 2, !0)),
            h += c[b[b.length - 1]]
            [0].outerHTML,
            b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
            i = c[b[b.length - 1]]
            [0].outerHTML + i,
            g -= 1;
            this._clones = b,
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage)
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0,
            e = this._widths[this.relative(c)] + this.settings.margin,
            f.push(d + e * a);
            this._coordinates = f
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
                width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                "padding-left": a || "",
                "padding-right": a || ""
            };
            this.$stage.css(c)
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
            if (c && a.items.merge) for (; b--;) a.css.width = this._widths[this.relative(b)],
            d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    },
    {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    },
    {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0,
            a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
            this.reset(a.current)
        }
    },
    {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    },
    {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0,
            b = Math.abs(this._coordinates[c]) + f * e,
            (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"),
            this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }],
    e.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass),
        this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(a("<div/>", {
            class: this.settings.stageOuterClass
        })), this.$element.append(this.$stage.parent()))
    },
    e.prototype.initializeItems = function() {
        var b = this.$element.find(".owl-item");
        if (b.length) return this._items = b.get().map(function(b) {
            return a(b)
        }),
        this._mergers = this._items.map(function() {
            return 1
        }),
        void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    },
    e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var a, b, c;
            a = this.$element.find("img"),
            b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
            c = this.$element.children(b).width(),
            a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized")
    },
    e.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    },
    e.prototype.setup = function() {
        var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({},
        this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({},
        this.options),
        this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }),
        this._breakpoint = d,
        this.settings = e,
        this.invalidate("settings"),
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    },
    e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    },
    e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
        this.trigger("prepared", {
            content: c.data
        }),
        c.data
    },
    e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
            return this[a]
        },
        this._invalidated), e = {}; b < c;)
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
        b++;
        this._invalidated = {},
        !this.is("valid") && this.enter("valid")
    },
    e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
        case e.Width.Inner:
            case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    },
    e.prototype.refresh = function() {
        this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed")
    },
    e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer),
        this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    },
    e.prototype.onResize = function() {
        return !! this._items.length && (this._width !== this.$element.width() && ( !! this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    },
    e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
        !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })),
        this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    },
    e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
            Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        },
        this)))
    },
    e.prototype.onDragMove = function(a) {
        var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = (
        (f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    },
    e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })),
        this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    },
    e.prototype.closest = function(b, c) {
        var e = -1,
        f = 30,
        g = this.width(),
        h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function(a, i) {
            return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a),
            -1 === e
        },
        this)),
        this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
        e
    },
    e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : c ? this.$stage.animate({
            left: b + "px"
        },
        this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    },
    e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    },
    e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)),
            this._current = a,
            this.invalidate("position"),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    },
    e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function(a, b) {
            return b
        })
    },
    e.prototype.reset = function(a) {
        (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(
        ["translate", "translated"]), this.animate(this.coordinates(a)), this.release(
        ["translate", "translated"]))
    },
    e.prototype.normalize = function(a, b) {
        var c = this._items.length,
        e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = (
        (a - e / 2) % c + c) % c + e / 2),
        a
    },
    e.prototype.relative = function(a) {
        return a -= this._clones.length / 2,
        this.normalize(a, !0)
    },
    e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings,
        f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else
        if (e.autoWidth || e.merge) {
            if (b = this._items.length) for (c = this._items[--b].width(), d = this.$element.width(); b--&&!(
            (c += this._items[b].width() + this.settings.margin) > d););
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2),
        Math.max(f, 0)
    },
    e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    },
    e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    },
    e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    },
    e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function(a) {
            return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
        };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    },
    e.prototype.speed = function(a) {
        return a !== d && (this._speed = a),
        this._speed
    },
    e.prototype.coordinates = function(b) {
        var c, e = 1,
        f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        },
        this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    },
    e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    },
    e.prototype.to = function(a, b) {
        var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = (
        (a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update()
    },
    e.prototype.next = function(a) {
        a = a || !1,
        this.to(this.relative(this.current()) + 1, a)
    },
    e.prototype.prev = function(a) {
        a = a || !1,
        this.to(this.relative(this.current()) - 1, a)
    },
    e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"),
        this.trigger("translated")
    },
    e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."),
        d
    },
    e.prototype.replace = function(b) {
        this.$stage.empty(),
        this._items = [],
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
        b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b),
            this.$stage.append(b),
            this._items.push(b),
            this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        },
        this)),
        this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
        this.invalidate("items")
    },
    e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0),
        b = b instanceof jQuery ? b : a(b),
        this.trigger("add", {
            content: b,
            position: c
        }),
        b = this.prepare(b),
        0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", {
            content: b,
            position: c
        })
    },
    e.prototype.remove = function(a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    },
    e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"),
            c = a(c),
            a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src),
                c.css("opacity", 1),
                this.leave("pre-loading"),
                !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            },
            this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        },
        this))
    },
    e.prototype.destroy = function() {
        this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in  this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    },
    e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
        case "<":
            return d ? a > c : a < c;
        case ">":
            return d ? a < c : a > c;
        case ">=":
            return d ? a <= c : a >= c;
        case "<=":
            return d ? a >= c : a <= c
        }
    },
    e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    },
    e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    },
    e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        },
        i = a.camelCase(a.grep(
        ["on", b, d], function(a) {
            return a
        }).join("-").toLowerCase()),
        j = a.Event(
        [b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
            relatedTarget: this
        },
        h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
        j
    },
    e.prototype.enter = function(b) {
        a.each(
        [b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++
        },
        this))
    },
    e.prototype.leave = function(b) {
        a.each(
        [b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        },
        this))
    },
    e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                },
                a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        },
        this)))
    },
    e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        },
        this))
    },
    e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        },
        this))
    },
    e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event,
        a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a,
        a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY),
        c
    },
    e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    },
    e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    },
    a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
            f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(
            ["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }),
                f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress(
                    [c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release(
                    [c]))
                },
                f))
            })),
            "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    },
    a.fn.owlCarousel.Constructor = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._interval = null,
        this._visible = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            },
            this)
        },
        this._core.options = a.extend({},
        e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    },
    e.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    },
    e.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    },
    e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in  this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in  Object.getOwnPropertyNames(this))"function" != typeof this[c] && (this[c] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._loaded = [],
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings,
                    e = c.center && Math.ceil(c.items / 2) || c.items,
                    f = c.center && -1 * e || 0,
                    g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
                    h = this._core.clones().length,
                    i = a.proxy(function(a, b) {
                        this.load(b)
                    },
                    this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++<e;) this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++
                }
            },
            this)
        },
        this._core.options = a.extend({},
        e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    },
    e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy"); ! e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
            g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
            this._core.trigger("load", {
                element: f,
                url: g
            },
            "lazy"),
            f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1),
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                },
                "lazy")
            },
            this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function() {
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                },
                "lazy")
            },
            this)).attr("srcset", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }),
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                },
                "lazy")
            },
            this), e.src = g)
        },
        this)), this._loaded.push(d.get(0)))
    },
    e.prototype.destroy = function() {
        var a, b;
        for (a in  this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in  Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.Lazy = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(c) {
        this._core = c,
        this._previousHeight = null,
        this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            },
            this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
            },
            this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            },
            this)
        },
        this._core.options = a.extend({},
        e.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._intervalId = null;
        var d = this;
        a(b).on("load", function() {
            d._core.settings.autoHeight && d.update()
        }),
        a(b).resize(function() {
            d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function() {
                d.update()
            },
            250))
        })
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    },
    e.prototype.update = function() {
        var b = this._core._current,
        c = b + this._core.settings.items,
        d = this._core.settings.lazyLoad,
        e = this._core.$stage.children().toArray().slice(b, c),
        f = [],
        g = 0;
        a.each(e, function(b, c) {
            f.push(a(c).height())
        }),
        g = Math.max.apply(null, f),
        g <= 1 && d && this._previousHeight && (g = this._previousHeight),
        this._previousHeight = g,
        this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
    },
    e.prototype.destroy = function() {
        var a, b;
        for (a in  this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in  Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._videos = {},
        this._playing = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            },
            this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            },
            this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            },
            this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            },
            this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            },
            this)
        },
        this._core.options = a.extend({},
        e.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        },
        this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    },
    e.prototype.fetch = function(a, b) {
        var c = function() {
            return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
        } (),
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else
        if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
            if (! (d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6],
        this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        },
        b.attr("data-video", g),
        this.thumbnail(a, this._videos[g])
    },
    e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;": "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function(c) {
            e = '<div class="owl-video-play-icon"></div>',
            d = k.lazyLoad ? a("<div/>", {
                class: "owl-video-tn " + j,
                srcType: c
            }) : a("<div/>", {
                class: "owl-video-tn",
                style: "opacity:1;background-image:url(" + c + ")"
            }),
            b.after(d),
            b.after(e)
        };
        if (b.wrap(a("<div/>", {
            class: "owl-video-wrapper",
            style: g
        })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)),
        h.remove(),
        !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large,
                l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url,
                l(f)
            }
        })
    },
    e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"),
        this._playing.find(".owl-video-frame").remove(),
        this._playing.removeClass("owl-video-playing"),
        this._playing = null,
        this._core.leave("playing"),
        this._core.trigger("stopped", null, "video")
    },
    e.prototype.play = function(b) {
        var c, d = a(b.target),
        e = d.closest("." + this._core.settings.itemClass),
        f = this._videos[e.attr("data-video")],
        g = f.width || "100%",
        h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    },
    e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    },
    e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in  this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in  Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.Video = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b,
        this.core.options = a.extend({},
        e.Defaults, this.core.options),
        this.swapping = !0,
        this.previous = d,
        this.next = d,
        this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            },
            this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            },
            this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            },
            this)
        },
        this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    },
    e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    },
    e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.onTransitionEnd()
    },
    e.prototype.destroy = function() {
        var a, b;
        for (a in  this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in  Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.Animate = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._call = null,
        this._time = 0,
        this._timeout = 0,
        this._paused = !0,
        this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
            },
            this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            },
            this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            },
            this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            },
            this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            },
            this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            },
            this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            },
            this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            },
            this)
        },
        this._core.$element.on(this._handlers),
        this._core.options = a.extend({},
        e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    },
    e.prototype._next = function(d) {
        this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
        this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
    },
    e.prototype.read = function() {
        return (new Date).getTime() - this._time
    },
    e.prototype.play = function(c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"),
        c = c || this._core.settings.autoplayTimeout,
        e = Math.min(this._time % (this._timeout || c), c),
        this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call),
        this._time += this.read() % c - e,
        this._timeout = c,
        this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
    },
    e.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"))
    },
    e.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call))
    },
    e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in  this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in  Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.autoplay = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b,
        this._initialized = !1,
        this._pages = [],
        this._controls = {},
        this._templates = [],
        this.$element = this._core.$element,
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        },
        this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            },
            this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            },
            this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            },
            this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            },
            this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            },
            this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            },
            this)
        },
        this._core.options = a.extend({},
        e.Defaults, this._core.options),
        this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    },
    e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),
        this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        },
        this)),
        this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        },
        this)),
        c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
        this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),
        this._controls.$absolute.on("click", "button", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(),
            this.to(d, c.dotsSpeed)
        },
        this));
        for (b in  this._overrides) this._core[b] = a.proxy(this[b], this)
    },
    e.prototype.destroy = function() {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in  this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in  this._controls)"$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
        for (d in  this.overides) this._core[d] = this._overrides[d];
        for (c in  Object.getOwnPropertyNames(this))"function" != typeof this[c] && (this[c] = null)
    },
    e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
        e = d + this._core.items().length,
        f = this._core.maximum(!0),
        g = this._core.settings,
        h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
                if (this._pages.push({
                    start: Math.min(f, a - d),
                    end: a - d + h - 1
                }), Math.min(f, a - d) === f) break;
                b = 0,
                ++c
            }
            b += this._core.mergers(this._core.relative(a))
        }
    },
    e.prototype.draw = function() {
        var b, c = this._core.settings,
        d = this._core.items().length <= c.items,
        e = this._core.relative(this._core.current()),
        f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
        c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
        this._controls.$absolute.toggleClass("disabled", !c.dots || d),
        c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    },
    e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    },
    e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        },
        this)).pop()
    },
    e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[
        (c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy),
        c
    },
    e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)
        (this.getPosition(!0), b)
    },
    e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)
        (this.getPosition(!1), b)
    },
    e.prototype.to = function(b, c, d) {
        var e; ! d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)
        (this._pages[
        (b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)
        (b, c)
    },
    a.fn.owlCarousel.Constructor.Plugins.Navigation = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c,
        this._hashes = {},
        this.$element = this._core.$element,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            },
            this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            },
            this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                    e = a.map(this._hashes, function(a, b) {
                        return a === d ? b : null
                    }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            },
            this)
        },
        this._core.options = a.extend({},
        e.Defaults, this._core.options),
        this.$element.on(this._handlers),
        a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
            e = this._core.$stage.children(),
            f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        },
        this))
    };
    e.Defaults = {
        URLhashListener: !1
    },
    e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in  this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in  Object.getOwnPropertyNames(this))"function" != typeof this[d] && (this[d] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.Hash = e
} (window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each(
        (b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d) return e = !c || b,
            !1
        }),
        e
    }
    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
    h = "Webkit Moz O ms".split(" "),
    i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    },
    j = {
        csstransforms: function() {
            return !! e("transform")
        },
        csstransforms3d: function() {
            return !! e("perspective")
        },
        csstransitions: function() {
            return !! e("transition")
        },
        cssanimations: function() {
            return !! e("animation")
        }
    };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]),
    j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]),
    j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
} (window.Zepto || window.jQuery, window, document);

/**
 * AbeFilm Cinema Theme - Combined JavaScript
 * All theme scripts merged into one file
 * 
 * Host this file on GitHub and link in theme:
 * <script src="YOUR_GITHUB_RAW_URL/abefilm-combined.js"></script>
 *
 * GitHub Raw URL format:
 * https://raw.githubusercontent.com/USERNAME/REPO/main/abefilm-combined.js
 *
 * jsDelivr CDN format (faster):
 * https://cdn.jsdelivr.net/gh/USERNAME/REPO@main/abefilm-combined.js
 */


/* ============================================================ */
/* // Sidebar State                                           */
/* ============================================================ */

document.body.classList.add('no-transition');if(localStorage.getItem('sidebarState')==='collapsed')document.body.classList.add('sidebar-collapsed');

   
   <div class='generic-modal-overlay' id='generic-modal'>
  <div class='generic-modal-box'>


/* ============================================================ */
/* // Popular Posts Labels                                    */
/* ============================================================ */

function getPopularPostLabels(){const o=document.querySelectorAll("#popular-posts-carousel .index-post");if(0!==o.length)o.forEach(o=>{const t=o.getAttribute("data-post-id"),e=o.querySelector("#pop-label-"+t);t&&e&&(e.style.display="none",fetch(`/feeds/posts/default/${t}?alt=json`).then(o=>o.json()).then(o=>{if(o.entry&&o.entry.category){const t=["Action","Action & Adventure","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Kids","Music","Mystery","Reality","Romance","Sci-Fi & Fantasy","Science Fiction","Thriller","War","Western"],n=o.entry.category.find(o=>t.includes(o.term))?.term;n&&(e.textContent=n,e.style.display="inline-block")}}).catch(o=>console.warn("Could not fetch label for post:",t,o)))})}document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("popular-posts-carousel");o&&new MutationObserver((t,e)=>{for(const n of t)if("childList"===n.type&&n.addedNodes.length>0){getPopularPostLabels(),e.disconnect();return}}).observe(o,{childList:!0})});


/* ============================================================ */
/* // Skeleton & Logo                                         */
/* ============================================================ */

var skeletonCount = window.innerWidth < 768 ? 3 : (window.innerWidth < 1024 ? 4 : 6);
      
        var logoTitleEl = document.querySelector('.sidebar-logo .logo-text');
        var logoTitle = logoTitleEl ? logoTitleEl.textContent.trim() : 'Loading...';
        
        for (var i = 0; i < skeletonCount; i++) {
          document.write(
            '<div class="skeleton-post-item">' +
              '<div class="skeleton-image-placeholder">' +
                '<span class="skeleton-card-text">' + logoTitle + '</span>' +
              '</div>' +
              '<div class="skeleton-title-placeholder"></div>' +
            '</div>'
          );
        }


/* ============================================================ */
/* // Comment Anonymous Fix                                   */
/* ============================================================ */

document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".comment-header cite.user").forEach((function(t){if(!t.querySelector("a")&&"Anonymous"===t.textContent.trim()){t.textContent="Guest",t.classList.add("guest-commenter");const e=t.closest(".comment");if(e){const t=e.querySelector(".avatar-image-container img");t&&(t.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi138K3Wrs4VDscCP88didXkJW7rLLaH6wG8M73L1i7-OHiWW28q3HhPT236AHRUXS7xS_-3a_X07r0VCzXlqo7nRfJRLAmBN7krQm5Z3nFSsHsbDafbM0Pq1o_nMDfVTpmSq0BUTJpxCF79yduFlqmLees1-iCVL6z4nsOo5Z3wllyaT0lFl5ODD9ICsw/s1600/1046929.png")}}}))}));


/* ============================================================ */
/* // Label Filter                                            */
/* ============================================================ */

document.addEventListener('DOMContentLoaded',function(){const e=["Action","Action & Adventure","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Kids","Music","Mystery","Reality","Romance","Sci-Fi & Fantasy","Science Fiction","Thriller","War","Western"];document.querySelectorAll(".index-post, .continue-watching-item, .recommendation-posts-grid .index-post, #random-posts-grid .index-post").forEach(t=>{const n=t.querySelector(".entry-label"),o=t.querySelectorAll(".post-labels-data span");if(n&&0!==o.length)for(const t of o){const o=t.textContent.trim();if(e.includes(o)){n.textContent=o,n.style.display="block";break}}})});


/* ============================================================ */
/* // AbeFlix - PruneHistory                                  */
/* ============================================================ */

(function(window, document){
  'use strict';
  window.AbeFlix = window.AbeFlix || {};

  /* Enhanced pruneHistory
     - options: {aggressive:false, concurrency:6, timeout:6000, sameOriginOnly:true}
     - aggressive: will treat CORS-blocked or non-2xx as dead and remove; non-aggressive preserves uncertain items
     - sameOriginOnly: by default only actively network-checks same-origin URLs to avoid false positives
  */
  window.AbeFlix.pruneHistory = async function(options){
    options = options || {};
    var KEYS = options.keys || ['abeflix_history','watchHistory','watch_history','history','abeflix-history','watch_list'];
    var aggressive = !!options.aggressive;
    var concurrency = options.concurrency || 6;
    var timeout = options.timeout || 6000;
    var sameOriginOnly = (typeof options.sameOriginOnly === 'undefined') ? true : !!options.sameOriginOnly;
    function headOrGet(url){
      return new Promise(function(resolve){
        var controller = ('AbortController' in window) ? new AbortController() : null;
        var signal = controller ? controller.signal : null;
        var done = false;
        function finish(ok, status){ if(!done){ done = true; try{ if(controller) controller.abort(); }catch(e){}; resolve({ok:!!ok, status: status}); } }
        try{
          fetch(url, {method:'HEAD', cache:'no-store', signal: signal}).then(function(res){
            finish(res.ok, res.status);
          }).catch(function(){
            // try GET as fallback (some hosts block HEAD)
            fetch(url, {method:'GET', cache:'no-store', mode:'no-cors'}).then(function(res){
              // opaque responses (no-cors) will have type 'opaque' and we treat them cautiously
              finish((res && (res.ok || res.type==='opaque')), res && res.status);
            }).catch(function(err){
              finish(false, 0);
            });
          });
          if(controller){ setTimeout(function(){ finish(false, 0); }, timeout); }
        }catch(e){ finish(false, 0); }
      });
    }

    // worker to process items with limited concurrency
    async function processList(arr){
      if(!Array.isArray(arr)) return arr;
      var result = [];
      var queue = arr.slice();
      var inflight = 0;
      return new Promise(function(resolve){
        function next(){
          if(queue.length === 0 && inflight === 0){ resolve(result); return; }
          while(inflight < concurrency && queue.length){
            var item = queue.shift();
            inflight++;
            (async function(it){
              try{
                var url = (typeof it === 'string') ? it : (it && (it.url || it.link || it.href || it.postUrl || it.postHref));
                if(!url){ result.push(it); return; }
                try{
                  var parsed = new URL(url, location.origin);
                }catch(e){ result.push(it); return; } // invalid URL - keep as-is
                // if sameOriginOnly and different origin, keep without network check
                if(sameOriginOnly && parsed.origin !== location.origin){
                  result.push(it);
                  return;
                }
                // do a network check
                var res = await headOrGet(url);
                if(res.ok){
                  result.push(it);
                }else{
                  // if aggressive => drop; if not aggressive => keep but mark maybeDead meta
                  if(aggressive){
                    // drop (do not push)
                  } else {
                    // keep but annotate
                    try{ if(typeof it === 'object' && it) it.__abeflix_maybeDead = true; }catch(e){}
                    result.push(it);
                  }
                }
              }catch(e){
                result.push(it);
              } finally { inflight--; next(); }
            })(item);
          }
        }
        next();
      });
    }

    try{
      var found = false;
      for(var ki=0; ki<KEYS.length; ki++){
        try{
          var key = KEYS[ki];
          var raw = localStorage.getItem(key);
          if(!raw) continue;
          found = true;
          var arr = JSON.parse(raw);
          var newArr = await processList(arr);
          localStorage.setItem(key, JSON.stringify(newArr));
        }catch(e){ /* ignore per-key errors */ }
      }
      if(!found) console.info('AbeFlix: No known history keys found in localStorage.');
      else console.info('AbeFlix: pruneHistory completed.');
      return true;
    }catch(e){
      console.warn('AbeFlix.pruneHistory failed', e);
      return false;
    }
  };

  /* Enhanced safeResizeUrl
     - wider host whitelist (googleusercontent, bp.blogspot, ggpht, pinterest, cdn domains commonly used)
     - robust handling of =s### suffix and /s###/ segments
     - preserves non-matching URLs unchanged
  */
  window.AbeFlix.safeResizeUrl = function(url, size){
    try{
      if(!url) return url;
      var s = size || 1200;
      var u = String(url);
      // host whitelist regex (case-insensitive)
      var hostRegex = /(?:googleusercontent\.com|bp\.blogspot\.com|ggpht\.com|lh\d+\.googleusercontent\.com|cdn\.ampproject\.org|cdn\.instagram\.com|media\.tumblr\.com|i\.imgur\.com|images\.unsplash\.com|res\.cloudinary\.com|cdn\.shopify\.com)/i;
      if(!hostRegex.test(u)) return u;
      // handle query-style =s### suffix
      if(/=s\d+/.test(u)) return u.replace(/=s\d+/, '=s'+s);
      // handle /s###/ or /s###-c/ segments
      if(/\/s\d+(-c)?\//.test(u)) return u.replace(/\/s\d+(-c)?\//, '/s'+s+'/');
      // handle suffix like /w\d+/ or /h\d+/
      if(/\/w\d+/.test(u) || /\/h\d+/.test(u)) return u.replace(/(\/w)\d+/, '$1'+s).replace(/(\/h)\d+/, '$1'+s);
      // fallback: append =s<size> (safe for most Blogger urls)
      return u + (u.indexOf('?') === -1 ? ('=s'+s) : ('&s='+s));
    }catch(e){
      return url;
    }
  };

  // keep existing refreshSlider from file; info helper
  window.AbeFlix._info = window.AbeFlix._info || function(){ return {patched:'enhanced-1-3', functions:Object.keys(window.AbeFlix)}; };

})(window, document);


/* ============================================================ */
/* // AbeFlix - History Manager                               */
/* ============================================================ */

(function(window, document){
  'use strict';
  window.AbeFlix = window.AbeFlix || {};
  var HISTORY_KEYS = ['abeflix_history','watchHistory','watch_history','history','abeflix-history','watch_list'];
  var CW_SELECTOR = '.continue-watching-list, .continue-watching, #continue-watching, .continue-watching-wrapper';

  function safeParse(s){
    try{ return JSON.parse(s); }catch(e){ return null; }
  }

  function quickHead(url, timeout){
    return new Promise(function(resolve){
      try{
        var parsed = new URL(url, location.origin);
        if(parsed.origin !== location.origin) return resolve(true);
      }catch(e){ return resolve(false); }
      var controller = ('AbortController' in window) ? new AbortController() : null;
      var signal = controller ? controller.signal : null;
      var done = false;
      function fin(ok){ if(!done){ done = true; try{ if(controller) controller.abort(); }catch(e){}; resolve(!!ok); } }
      fetch(url, {method:'HEAD', cache:'no-store', signal: signal}).then(function(res){ fin(!!res.ok); }).catch(function(){
        fetch(url, {method:'GET', cache:'no-store', mode:'no-cors'}).then(function(res){ fin(true); }).catch(function(){ fin(false); });
      });
      setTimeout(function(){ fin(false); }, timeout||3000);
    });
  }

  function loadHistoryItems(){
    for(var i=0;i<HISTORY_KEYS.length;i++){
      var k = HISTORY_KEYS[i];
      try{
        var raw = localStorage.getItem(k);
        if(!raw) continue;
        var parsed = safeParse(raw);
        if(Array.isArray(parsed)) return {key:k, items: parsed};
        if(parsed && Array.isArray(parsed.items)) return {key:k, items: parsed.items, rawObj: parsed};
      }catch(e){ continue; }
    }
    return null;
  }

  function renderEmpty(container){
    try{
      container.innerHTML = '<div class="cw-empty" style="padding:24px;color:#a7a7a7;font-weight:600">No recently watched items</div>';
    }catch(e){}
  }

  function renderItems(container, items){
    try{
      if(!items || !items.length) { renderEmpty(container); return; }
      var wrap = document.createElement('div');
      wrap.className = 'abeflix-cw-items';
      wrap.style.display = 'flex';
      wrap.style.gap = '12px';
      wrap.style.overflowX = 'auto';
      items.forEach(function(it){
        try{
          var title = (typeof it === 'string') ? it : (it && (it.title || it.name || it.postTitle || it.label)) || '';
          var url = (typeof it === 'string') ? it : (it && (it.url || it.link || it.href || it.postUrl)) || '#';
          var thumb = it && (it.thumb || it.thumbnail || it.image) || '';
          var card = document.createElement('div');
          card.className = 'continue-watching-item abeflix-item';
          card.style.minWidth = '130px';
          card.style.width = '130px';
          card.style.borderRadius = '8px';
          card.style.overflow = 'hidden';
          card.style.background = 'linear-gradient(180deg, rgba(40,40,40,0.6), rgba(18,18,18,0.6))';
          card.style.boxSizing = 'border-box';
          var a = document.createElement('a');
          a.href = url;
          a.style.color = 'inherit';
          a.style.textDecoration = 'none';
          var img = document.createElement('div');
          img.style.height = '180px';
          img.style.backgroundSize = 'cover';
          img.style.backgroundPosition = 'center';
          img.style.backgroundImage = thumb ? 'url('+thumb+')' : 'linear-gradient(90deg,#2a2c33,#222)';
          a.appendChild(img);
          var t = document.createElement('div');
          t.style.padding = '8px';
          t.style.fontSize = '13px';
          t.style.color = '#e0e0e0';
          t.style.fontWeight = '600';
          t.innerText = title || 'Untitled';
          a.appendChild(t);
          card.appendChild(a);
          wrap.appendChild(card);
        }catch(e){ /* skip item */ }
      });
      container.innerHTML = '';
      container.appendChild(wrap);
    }catch(e){ console.warn('AbeFlix.renderItems failed', e); renderEmpty(container); }
  }

  function pruneItemsSync(items){
    if(!Array.isArray(items)) return [];
    var out = [];
    for(var i=0;i<items.length;i++){
      var it = items[i];
      if(!it) continue;
      var url = (typeof it === 'string') ? it : (it && (it.url || it.link || it.href || it.postUrl));
      if(!url) continue;
      out.push(it);
    }
    return out;
  }

  window.AbeFlix.initContinueWatching = async function(options){
    options = options || {};
    var container = document.querySelector(CW_SELECTOR) || document.querySelector('.continue-watching-list') || document.querySelector('#continue-watching');
    if(!container) return console.info('AbeFlix: Continue Watching container not found');
    var itemsObj = loadHistoryItems();
    if(!itemsObj || !itemsObj.items || itemsObj.items.length===0){
      renderEmpty(container);
      return true;
    }
    var pruned = pruneItemsSync(itemsObj.items);
    if(pruned.length===0){ renderEmpty(container); return true; }
    renderItems(container, pruned);
    if(options.validateNetwork){
      var keep = [];
      for(var i=0;i<pruned.length;i++){
        var it = pruned[i];
        var url = (typeof it === 'string') ? it : (it && (it.url || it.link || it.href || it.postUrl));
        try{
          var ok = await quickHead(url, options.timeout || 2500);
          if(ok) keep.push(it);
        }catch(e){ keep.push(it); }
      }
      if(JSON.stringify(keep)!==JSON.stringify(pruned)){
        try{
          var key = itemsObj.key;
          localStorage.setItem(key, JSON.stringify(keep));
        }catch(e){}
        if(keep.length===0){ renderEmpty(container); return true; }
        renderItems(container, keep);
      }
    }
    return true;
  };

  document.addEventListener('DOMContentLoaded', function(){
    try{ window.AbeFlix.initContinueWatching({validateNetwork:false}); }catch(e){}
  });
})(window, document);


/* ============================================================ */
/* // AbeFlix - Slider Refresh                                */
/* ============================================================ */

(function(window, document){
  'use strict';
  window.AbeFlix = window.AbeFlix || {};
  // Force-refresh slider with polling until content changes or maxAttempts reached.
  // Usage: window.AbeFlix.forceRefreshSlider({interval:60000, maxAttempts:5, feedUrl:'/feeds/posts/default?alt=json&max-results=6'})
  window.AbeFlix.forceRefreshSlider = function(options){
    options = options || {};
    var selector = options.selector || '#dynamic-main-slider, .content-slider, #main-slider, .main-slider';
    var feedUrl = options.feedUrl || ('/feeds/posts/default?alt=json&max-results=6');
    var interval = typeof options.interval === 'number' ? options.interval : 60000; // 60s default
    var maxAttempts = typeof options.maxAttempts === 'number' ? options.maxAttempts : 6; // try up to 6 times
    var attempt = 0;
    var lastHtml = null;

    function fetchFeed(attemptNo){
      var url = feedUrl + '&_=' + Date.now() + '&attempt=' + attemptNo;
      return fetch(url, {cache: 'no-store', credentials: 'same-origin'}).then(function(res){
        // prefer json, but accept text
        return res.text().then(function(text){
          try{ return JSON.parse(text); }catch(e){ return text; }
        });
      });
    }

    function buildHtmlFromFeed(data){
      var html = '';
      try{
        var entries = [];
        if(typeof data === 'object' && data){
          if(data.feed && Array.isArray(data.feed.entry)) entries = data.feed.entry;
          else if(Array.isArray(data.items)) entries = data.items;
        }
        if(entries.length){
          for(var i=0;i<entries.length;i++){
            var e = entries[i];
            var title = (e.title && (e.title.$t || e.title)) || '';
            var link = '#';
            if(e.link){
              if(Array.isArray(e.link)){
                var alt = e.link.find && e.link.find(function(l){ return l.rel==='alternate'; });
                link = (alt && (alt.href||alt)) || (e.link[0] && (e.link[0].href||e.link[0])) || link;
              } else { link = e.link.href || e.link; }
            }
            var thumb = (e.media$thumbnail && e.media$thumbnail.url) || (e.thumbnail && e.thumbnail[0] && e.thumbnail[0].url) || (e.content && (e.content.$t && (e.content.$t.match(/(https?:\/\/[^'\"\\s>]+\\.(?:jpg|jpeg|png|webp))/i) && RegExp.$1))) || '';
            html += '<div class="slider-item"><a href="'+link+'"><div class="slider-background-image" style="background-image:url('+thumb+')"></div><div class="slider-info-container"><h3>'+ (title||'') +'</h3></div></a></div>';
          }
        }
        return html;
      }catch(e){ return ''; }
    }

    function applyHtml(container, html){
      try{
        if(!html) return false;
        var wrapper = container.querySelector('#abeflix-generated-slider');
        if(!wrapper){
          wrapper = document.createElement('div');
          wrapper.id = 'abeflix-generated-slider';
          wrapper.className = 'owl-carousel';
          container.innerHTML = '';
          container.appendChild(wrapper);
        }
        if(wrapper.innerHTML.trim() === html.trim()) return false; // no change
        wrapper.innerHTML = html;
        // try to reinit safely
        try{
          if(window.initMainSlider && typeof window.initMainSlider === 'function'){
            window.initMainSlider();
          }else if(window.jQuery && jQuery.fn && jQuery.fn.owlCarousel){
            var $w = jQuery(wrapper);
            try{ $w.trigger && $w.trigger('destroy.owl.carousel'); }catch(e){}
            try{ $w.owlCarousel({
  items:1,
  loop:true,
  autoplay:true,
  autoplayTimeout:4500,
  nav:true,
  dots:true,

  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  smartSpeed: 300
}); }catch(e){}
          }
        }catch(e){ /* fail silently */ }
        return true;
      }catch(e){ return false; }
    }

    function tryOnce(resolve){
      attempt++;
      var container = document.querySelector(selector);
      if(!container){
        // try again later until attempts exhausted
        if(attempt < maxAttempts){ setTimeout(function(){ tryOnce(resolve); }, Math.min(1000, interval)); }
        else resolve(false);
        return;
      }
      fetchFeed(attempt).then(function(data){
        var html = (typeof data === 'string') ? data : buildHtmlFromFeed(data);
        var changed = applyHtml(container, html);
        if(changed){ resolve(true); return; }
        if(attempt < maxAttempts){
          setTimeout(function(){ tryOnce(resolve); }, interval);
        } else {
          resolve(false);
        }
      }).catch(function(err){
        if(attempt < maxAttempts) setTimeout(function(){ tryOnce(resolve); }, interval);
        else resolve(false);
      });
    }

    return new Promise(function(resolve){ tryOnce(resolve); });
  };

  // Enable auto poll on homepage load to pick up new items faster (safe defaults)
  window.AbeFlix.enableAutoSliderPoll = function(opts){
    opts = opts || {};
    var enabled = true;
    var interval = typeof opts.interval === 'number' ? opts.interval : 60000; // 60s
    var maxAttempts = typeof opts.maxAttempts === 'number' ? opts.maxAttempts : 6;
    function runPoll(){
      if(!enabled) return;
      // only on homepage-ish pages
      if(document.querySelector('#dynamic-main-slider, .content-slider, #main-slider, .main-slider') && (location.pathname === '/' || /\/(index\\.html)?$/.test(location.pathname) || document.body.classList.contains('is-homepage'))){
        window.AbeFlix.forceRefreshSlider({interval: interval, maxAttempts: 1});
      }
      setTimeout(runPoll, interval);
    }
    // start after a short delay to avoid clashing with initial page load
    setTimeout(runPoll, 5000);
    return function stop(){ enabled = false; };
  };

  // Auto-enable polling with conservative settings
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    try{ window.AbeFlix.enableAutoSliderPoll({interval:60000, maxAttempts:1}); }catch(e){}
  } else {
    document.addEventListener('DOMContentLoaded', function(){ try{ window.AbeFlix.enableAutoSliderPoll({interval:60000, maxAttempts:1}); }catch(e){} });
  }

})(window, document);


/* ============================================================ */
/* // AbeFlix - Color Sync                                    */
/* ============================================================ */

(function(window, document){
  'use strict';
  if(window.AbeFlixColorSync) return;
  window.AbeFlixColorSync = true;

  var DEBUG = true; // set to false to silence console logs later
  function log(){ if(DEBUG){ try{ console.log.apply(console, ['[ColorSync]'].concat(Array.prototype.slice.call(arguments))); }catch(e){} } }

  var lastSrc = '';

  function clamp(v, min, max){ return Math.min(max, Math.max(min, v)); }

  function rgbToHsl(r, g, b){
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2;
    if(max !== min){
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4;
      }
      h /= 6;
    }
    return [h, s, l];
  }

  function hslToRgb(h, s, l){
    var r, g, b;
    if(s === 0){ r = g = b = l; }
    else{
      var hue2rgb = function(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function toHex(n){
    var s = n.toString(16);
    return s.length === 1 ? '0' + s : s;
  }

  function applyColor(rgb, sourceUrl){
    try{
      var hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      var s = clamp(hsl[1] * 1.35, 0.45, 0.9);
      var l = clamp(hsl[2], 0.38, 0.6);
      var vivid = hslToRgb(hsl[0], s, l);
      var light = hslToRgb(hsl[0], s, clamp(l + 0.12, 0, 0.72));
      var dark = hslToRgb(hsl[0], s, clamp(l - 0.14, 0.12, 1));

      var rgbStr = vivid[0] + ',' + vivid[1] + ',' + vivid[2];
      var hex = '#' + toHex(vivid[0]) + toHex(vivid[1]) + toHex(vivid[2]);
      var gradient = 'linear-gradient(135deg, rgb(' + light.join(',') + ') 0%, rgb(' + dark.join(',') + ') 100%)';

      var root = document.documentElement;
      root.style.setProperty('--keycolor', hex);
      root.style.setProperty('--keycolor-rgb', rgbStr);
      root.style.setProperty('--keygradient', gradient);
      root.style.setProperty('--shadow-color-rgb', rgbStr);
      log('applied color', hex, 'from', sourceUrl);
    }catch(e){ log('applyColor failed', e); }
  }

  function extractColorFromImage(src){
    if(!src) return;
    if(src === lastSrc) return;
    lastSrc = src;
    log('extracting color from', src);
    try{
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function(){
        try{
          var w = 24, h = 24;
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var data = ctx.getImageData(0, 0, w, h).data;
          var rSum = 0, gSum = 0, bSum = 0, count = 0;
          for(var i = 0; i < data.length; i += 4){
            if(data[i + 3] < 100) continue;
            rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2];
            count++;
          }
          if(!count){ log('no pixel data sampled'); return; }
          applyColor([Math.round(rSum / count), Math.round(gSum / count), Math.round(bSum / count)], src);
        }catch(e){
          log('canvas blocked (likely CORS) for', src, e && e.message);
        }
      };
      img.onerror = function(){ log('image failed to load for color extraction', src); };
      img.src = src;
    }catch(e){ log('extractColorFromImage error', e); }
  }

  function extractBgUrl(el){
    if(!el) return null;
    var style = el.getAttribute('style') || '';
    var match = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
    if(match && match[2]) return match[2];
    try{
      var cs = window.getComputedStyle(el).backgroundImage;
      var m2 = cs && cs.match(/url\((['"]?)(.*?)\1\)/i);
      if(m2 && m2[2]) return m2[2];
    }catch(e){}
    return null;
  }

  function debounce(fn, wait){
    var t;
    return function(){
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function(){ fn.apply(ctx, args); }, wait);
    };
  }

  function findActiveSliderBg(){
    var selectors = [
      '#dynamic-main-slider .owl-item.active .slider-background-image',
      '#abeflix-generated-slider .owl-item.active .slider-background-image',
      '.content-slider .owl-item.active .slider-background-image',
      '.content-slider .slider-item.active .slider-background-image',
      '.content-slider .slider-background-image'
    ];
    for(var i = 0; i < selectors.length; i++){
      var el = document.querySelector(selectors[i]);
      if(el) return el;
    }
    return null;
  }

  function findPosterImg(){
    var selectors = [
      '.post-page-final-container .poster-final img',
      '.details-header-final .poster-final img',
      '.poster-final img'
    ];
    for(var i = 0; i < selectors.length; i++){
      var el = document.querySelector(selectors[i]);
      if(el && el.getAttribute('src')) return el;
    }
    return null;
  }

  function syncAll(){
    var sliderEl = findActiveSliderBg();
    var url = extractBgUrl(sliderEl);
    if(url){ extractColorFromImage(url); return; }

    var posterEl = findPosterImg();
    var src = posterEl && posterEl.getAttribute('src');
    if(src){ extractColorFromImage(src); return; }
  }
  var debouncedSync = debounce(syncAll, 150);

  function init(){
    log('init started');
    try{ syncAll(); }catch(e){ log('initial syncAll failed', e); }

    try{
      new MutationObserver(debouncedSync).observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class', 'src'],
        subtree: true,
        childList: true
      });
      log('MutationObserver attached to document.body');
    }catch(e){ log('MutationObserver setup failed', e); }

    try{
      if(window.jQuery){
        jQuery(document).on('changed.owl.carousel translated.owl.carousel initialized.owl.carousel', debouncedSync);
      }
    }catch(e){}

    try{
      setInterval(syncAll, 1200);
    }catch(e){}
  }

  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(init, 0);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})(window, document);


/* ============================================================ */
/* // AbeFlix - Safe Prune                                    */
/* ============================================================ */

(function(window, document){
  'use strict';
  window.AbeFlix = window.AbeFlix || {};

  // Safe non-aggressive prune implementation (only defined if not present)
  if(!window.AbeFlix.pruneHistory || typeof window.AbeFlix.pruneHistory !== 'function'){
    window.AbeFlix.pruneHistory = async function(options){
      options = options || {};
      var KEYS = options.keys || ['abeflix_history','watchHistory','watch_history','history','abeflix-history','watch_list'];
      var sameOriginOnly = (typeof options.sameOriginOnly === 'undefined') ? true : !!options.sameOriginOnly;
      var timeout = options.timeout || 4000;
      // minimal HEAD->GET check for same-origin items
      function headCheck(url){
        return new Promise(function(resolve){
          try{
            var parsed = new URL(url, location.origin);
            if(sameOriginOnly && parsed.origin !== location.origin) return resolve({ok:true, note:'cross-origin-kept'});
          }catch(e){ return resolve({ok:false, note:'invalid-url'}); }
          var controller = ('AbortController' in window) ? new AbortController() : null;
          var signal = controller ? controller.signal : null;
          var finished = false;
          function done(ok){ if(!finished){ finished = true; try{ if(controller) controller.abort(); }catch(e){}; resolve({ok:!!ok}); } }
          try{
            fetch(url, {method:'HEAD', cache:'no-store', signal: signal}).then(function(res){ done(res && res.ok); }).catch(function(){
              // fallback to GET (no-cors) — treat opaque as okay to avoid false positives
              fetch(url, {method:'GET', cache:'no-store', mode:'no-cors'}).then(function(res){ done(true); }).catch(function(){ done(false); });
            });
            setTimeout(function(){ done(false); }, timeout);
          }catch(e){ done(false); }
        });
      }

      try{
        var foundAny = false;
        for(var ki=0; ki<KEYS.length; ki++){
          var key = KEYS[ki];
          try{
            var raw = localStorage.getItem(key);
            if(!raw) continue;
            foundAny = true;
            var arr = JSON.parse(raw);
            if(!Array.isArray(arr)) continue;
            var keep = [];
            for(var i=0;i<arr.length;i++){
              var item = arr[i];
              var url = (typeof item === 'string') ? item : (item && (item.url || item.link || item.href || item.postUrl));
              if(!url){ keep.push(item); continue; }
              // Only perform network check for same-origin if flag is set; otherwise keep
              if(sameOriginOnly){
                try{
                  var parsed = new URL(url, location.origin);
                  if(parsed.origin !== location.origin){ keep.push(item); continue; }
                }catch(e){ keep.push(item); continue; }
              }
              // perform lightweight HEAD+GET fallback (but non-aggressive)
              try{
                // we won't remove items here aggressively; we'll only keep items that respond OK
                // if network check fails, keep the item to avoid false deletion
                var res = await headCheck(url);
                if(res && res.ok) keep.push(item);
                else keep.push(item);
              }catch(e){ keep.push(item); }
            }
            // write back (keeps items mostly unchanged but normalizes)
            localStorage.setItem(key, JSON.stringify(keep));
          }catch(e){ /* ignore per-key errors */ }
        }
        if(!foundAny) {
          console.info('AbeFlix: pruneHistory auto-run — no known history keys found.');
        } else {
          console.info('AbeFlix: pruneHistory auto-run completed (non-aggressive).');
        }
        return true;
      }catch(e){
        console.warn('AbeFlix.pruneHistory auto-run failed', e);
        return false;
      }
    }; // end pruneHistory
  } // end define pruneHistory if missing

  // Auto-run pruneHistory non-aggressively after a short delay on DOMContentLoaded
  function runAutoPrune(){
    try{
      if(window.AbeFlix && typeof window.AbeFlix.pruneHistory === 'function'){
        // non-aggressive defaults: sameOriginOnly true
        try{ window.AbeFlix.pruneHistory({aggressive:false, sameOriginOnly:true}).catch && window.AbeFlix.pruneHistory({aggressive:false, sameOriginOnly:true}); }catch(e){}
      }
    }catch(e){}
  }

  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(runAutoPrune, 800);
  } else {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(runAutoPrune, 800); });
  }

  // expose easy manual call too
  window.AbeFlix.autoPruneNow = function(){ return window.AbeFlix.pruneHistory ? window.AbeFlix.pruneHistory({aggressive:false,sameOriginOnly:true}) : Promise.resolve(false); };

})(window, document);


/* ============================================================ */
/* // ATW Mask & Popup                                        */
/* ============================================================ */

//
(function() {
    const mask = document.getElementById('atw-mask');
    const successPop = document.getElementById('atw-success-pop');
    const tester = document.getElementById('ad-tester');
    const handle = document.getElementById('atw-slider-handle');
    const container = handle.parentElement;

    const checkAds = function() {
        const isBrave = !!(navigator.brave && navigator.brave.isBrave);
        const isBlocked = (tester.offsetHeight === 0) || (window.getComputedStyle(tester).display === 'none');
        if (isBlocked || isBrave) {
            mask.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return true;
        }
        return false;
    };

    window.addEventListener('load', () => {
        const isNowBlocked = checkAds();
        if (!isNowBlocked && localStorage.getItem('atw_refresh_check') === 'active') {
            localStorage.removeItem('atw_refresh_check');
            successPop.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                successPop.style.opacity = '0';
                setTimeout(() => { successPop.style.display = 'none'; document.body.style.overflow = ''; }, 500);
            }, 3000);
        }
    });

    let startX = 0, currentX = 0, isDragging = false;

    const moveHandle = (x) => {
        let delta = x - startX;
        const limit = container.offsetWidth - handle.offsetWidth - 12;
        delta = Math.max(0, Math.min(delta, limit));
        
        handle.style.transform = `translate3d(${delta}px, 0, 0)`;

        if (delta >= limit && isDragging) {
            isDragging = false;
            localStorage.setItem('atw_refresh_check', 'active');
            window.location.reload();
        }
    };

    const startDrag = (e) => {
        isDragging = true;
        startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
        handle.style.transition = 'none';
    };

    const dragging = (e) => {
        if (!isDragging) return;
        currentX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
        requestAnimationFrame(() => moveHandle(currentX));
    };

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        handle.style.transition = 'transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        handle.style.transform = `translate3d(0, 0, 0)`;
    };

    handle.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', dragging);
    window.addEventListener('mouseup', stopDrag);
    
    handle.addEventListener('touchstart', startDrag, {passive: true});
    window.addEventListener('touchmove', dragging, {passive: true});
    window.addEventListener('touchend', stopDrag);
})();
//


/* ============================================================ */
/* // ATW Progress Bar                                        */
/* ============================================================ */

//
(function() {
    const progressBar = document.getElementById('atw-progress-bar');
    const container = document.getElementById('atw-progress-container');
    
    let currentWidth = 0;
    let targetWidth = 0;

    // High performance frame-by-frame update
    function animate() {
        if (currentWidth < targetWidth) {
            // Ekhane gradual movement kora hoyeche jeno jump-gulo smooth lage
            currentWidth += (targetWidth - currentWidth) * 0.08;
            progressBar.style.width = currentWidth + '%';
        }
        
        if (currentWidth < 99) {
            requestAnimationFrame(animate);
        }
    }

    // Original Jump Animation Logic (Optimized for 120Hz)
    function startLoading() {
        const jump = () => {
            if (targetWidth < 90) {
                targetWidth += Math.random() * 15;
                if (targetWidth > 90) targetWidth = 90;
                
                // Agami jump-er jonno random time
                setTimeout(jump, Math.random() * 400 + 200);
            }
        };
        jump();
        requestAnimationFrame(animate);
    }

    window.addEventListener('load', () => {
        targetWidth = 100;
        // Load shesh hole speed barie dewa
        progressBar.style.transition = 'width 0.3s ease-out';
        
        setTimeout(() => {
            container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            container.style.opacity = '0';
            container.style.transform = 'translateY(-5px)';
            setTimeout(() => { container.style.display = 'none'; }, 400);
        }, 600);
    });

    startLoading();
})();
//


/* ============================================================ */
/* // Network - pageReload Function                           */
/* ============================================================ */

/**/ 
function pageReload(){
    const card = document.getElementById("mainCard");
    const container = document.getElementById("noInternet");
    const statusIcon = document.getElementById("statusIcon");
    const stCircle = document.getElementById("stCircle");
    const tickPath = document.getElementById("tickPath");
    const crossPath = document.getElementById("crossPath");

    card.classList.add("loading-active");

    setTimeout(function(){
        statusIcon.style.opacity = "1";
        statusIcon.style.transform = "translate(-50%, -50%) scale(1.3)";
        stCircle.style.animation = "draw 0.5s ease forwards";

        if(navigator.onLine) {
            crossPath.style.display = "none";
            tickPath.style.display = "block";
            tickPath.style.animation = "draw 0.4s ease forwards 0.3s";
            setTimeout(() => {
                container.style.opacity = "0";
                setTimeout(() => window.location.reload(), 500);
            }, 1200);
        } else {
            tickPath.style.display = "none";
            crossPath.style.display = "block";
            stCircle.style.stroke = "#ff4757";
            crossPath.style.animation = "draw 0.4s ease forwards 0.3s";
            
            setTimeout(() => {
                statusIcon.style.opacity = "0";
                statusIcon.style.transform = "translate(-50%, -50%) scale(0.5)";
                
                setTimeout(() => {
                    card.classList.remove("loading-active");
                    stCircle.style.stroke = "#2ecc71";
                    stCircle.style.animation = "none";
                    crossPath.style.animation = "none";
                }, 400);
            }, 1800);
        }
    }, 600);
}

window.addEventListener("offline", () => {
    document.querySelector("#noInternet").classList.remove("hidden");
});
window.addEventListener("online", () => {
    const container = document.querySelector("#noInternet");
    if(container && !container.classList.contains("hidden")) {
        container.style.opacity = "0";
        container.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
            container.classList.add("hidden");
            container.style.opacity = "1";
        }, 500);
    }
});
if(!navigator.onLine) document.querySelector("#noInternet").classList.remove("hidden");
/**/


/* ============================================================ */
/* // Title Final                                             */
/* ============================================================ */

//
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    var titleTag = document.querySelector('.title-final') || document.querySelector('h1.entry-title');
    if (!titleTag) return;

    // --- PURE RANDOM LOGIC (0 to 900+) ---
    // Every time the page loads or refreshes, it gets a completely new random number
    var countVal = Math.floor(Math.random() * 950); 
    if (countVal < 10) countVal = Math.floor(Math.random() * 50) + 5; // Jeno ekdom 0 na thake

    var wrap = document.createElement('div');
    wrap.className = 'cp-live-wrapper';
    wrap.innerHTML = '<div class="cp-live-counter" id="eliteEye"><div class="eye-container"><div class="eye-pupil"></div></div><span class="cp-count-num">' + countVal + '</span><span>WATCHING NOW</span></div>';
    titleTag.parentNode.insertBefore(wrap, titleTag.nextSibling);

    var counterBtn = document.getElementById('eliteEye');
    var numDisplay = wrap.querySelector('.cp-count-num');
    var pressTimer;

    // --- HOLD TO REFRESH NUMBER (INTERNAL REFRESH) ---
    var startPress = function(e) {
      if (counterBtn.classList.contains('popping')) return;
      pressTimer = setTimeout(function() {
        counterBtn.classList.add('popping');
        counterBtn.classList.add('refreshing-num');
        
        setTimeout(function() {
          // Internal refresh generates a new big random jump
          countVal = Math.floor(Math.random() * 900) + 20;
          numDisplay.innerText = countVal;
          counterBtn.classList.remove('refreshing-num');
        }, 650);
      }, 700);
    };

    var endPress = function() { clearTimeout(pressTimer); };

    counterBtn.addEventListener('mousedown', startPress);
    counterBtn.addEventListener('touchstart', startPress, {passive: true});
    window.addEventListener('mouseup', endPress);
    window.addEventListener('touchend', endPress);

    // TAP OUTSIDE TO POP-OUT
    document.addEventListener('click', function(e) {
      if (counterBtn.classList.contains('popping') && !counterBtn.contains(e.target)) {
        counterBtn.classList.remove('popping');
      }
    });

    // Slow drifts for realism
    setInterval(function() {
      if(!counterBtn.classList.contains('popping')) {
        countVal += (Math.floor(Math.random() * 3) - 1);
        if(countVal < 0) countVal = 5;
        numDisplay.innerText = countVal;
      }
    }, 4000);
  });
})();
//


/* ============================================================ */
/* // Cookie Notice                                           */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', function(event) {
      window.cookieChoices && cookieChoices.showCookieConsentBar && cookieChoices.showCookieConsentBar(
          (window.cookieOptions && cookieOptions.msg) || 'Diese Website verwendet Cookies von Google, um Dienste anzubieten und Zugriffe zu analysieren. Deine IP-Adresse und dein User-Agent werden zusammen mit Messwerten zur Leistung und Sicherheit f\xfcr Google freigegeben. So k\xf6nnen Nutzungsstatistiken generiert, Missbrauchsf\xe4lle erkannt und behoben und die Qualit\xe4t des Dienstes gew\xe4hrleistet werden.',
          (window.cookieOptions && cookieOptions.close) || 'Ok',
          (window.cookieOptions && cookieOptions.learn) || 'Weitere Informationen',
          (window.cookieOptions && cookieOptions.link) || 'https://www.blogger.com/go/blogspot-cookies');
    });


/* ============================================================ */
/* // Network - Online Auto-Dismiss (NEW)              */
/* ============================================================ */

window.addEventListener("offline", function() {
    var banner = document.querySelector("#noInternet");
    if(banner) banner.classList.remove("hidden");
});

window.addEventListener("online", function() {
    var container = document.querySelector("#noInternet");
    if(container && !container.classList.contains("hidden")) {
        container.style.transition = "opacity 0.5s ease";
        container.style.opacity = "0";
        setTimeout(function() {
            container.classList.add("hidden");
            container.style.opacity = "1";
        }, 500);
    }
});

if(!navigator.onLine) {
    var offlineBanner = document.querySelector("#noInternet");
    if(offlineBanner) offlineBanner.classList.remove("hidden");
}


/* ============================================================ */
/* // Main Layout - Search, Sidebar, Comments, Watchlist  */
/* ============================================================ */

(
() = >{
    function e() {
        if (
        $("body").find(".item-post").length) {
            var e = $("#post-page-sidebar .widget");
            e.length && e.appendTo("#post-page-sidebar-content")
        }
    }
    function t() {
        let e = document.getElementById("mobile-search-modal");
        if (!e) return;
        let t = document.querySelectorAll(".mobile-search-input, .mobile-search-button"),
        a = document.getElementById("ms-back-btn"),
        i = document.getElementById("ms-input"),
        n = document.getElementById("ms-form"),
        s = document.getElementById("ms-default-view"),
        l = document.getElementById("ms-results-view"),
        r = document.getElementById("ms-history-container"),
        o = document.getElementById("ms-popular-container"),
        d = "abefilmSearchHistory",
        c,
        _ = () = >{
            e.classList.add("active"),
            document.body.classList.add("ms-modal-open"),
            i.focus(),
            y()
        },
        p = () = >{
            e.classList.remove("active"),
            document.body.classList.remove("ms-modal-open"),
            i.value = "",
            b()
        },
        m = () = >JSON.parse(localStorage.getItem(d) || "[]"),
        u = e = >{
            if (!e || !e.trim()) return;
            let t = m().filter(t = >t.toLowerCase() !== e.toLowerCase());
            t.unshift(e),
            t.length > 3 && t.pop(),
            localStorage.setItem(d, JSON.stringify(t))
        },
        g = e = >{
            let t = m().filter(t = >t.toLowerCase() !== e.toLowerCase());
            localStorage.setItem(d, JSON.stringify(t)),
            v()
        },
        h = () = >{
            localStorage.removeItem(d),
            v()
        },
        v = () = >{
            let e = m();
            if (0 === e.length) {
                r.innerHTML = "";
                return
            }
            let t = '\n            <div class="ms-section-title ms-history-header">\n                <span>Search History</span>\n                <button class="clear-btn">Clear All</button>\n            </div>\n            <ul>';
            e.forEach(e = >{
                t += '\n                <li>\n                    <a href="/search?q=' + encodeURIComponent(e) + '">' + e + '</a>\n                    <button class="delete-item-btn" data-term="' + e + '">×</button>\n                </li>'
            }),
            t += "</ul>",
            r.innerHTML = t
        },
        f = () = >{
            o.innerHTML = '\n        <div class="ms-section-title ms-popular-header">\n            <span>\uD83D\uDD25 Latest Posts</span>\n        </div>\n        <div class="ms-loader">Loading...</div>',
            fetch("/feeds/posts/default?alt=json&max-results=8&orderby=published").then(e = >e.json()).then(e = >{
                if (!e.feed || !e.feed.entry || 0 === e.feed.entry.length) {
                    o.innerHTML = "";
                    return
                }
                let t = '\n                <div class="ms-section-title ms-popular-header">\n                    <span>\uD83D\uDD25 Latest Posts</span>\n                </div>\n                <ul>';
                e.feed.entry.forEach(
                (e, a) = >{
                    t += '\n                    <li>\n                        <span class="rank-number ' + (a < 3 ? "top-3" : "") + '">' + (a + 1) + '</span>\n                        <a href="' + e.link.find(e = >"alternate" === e.rel).href + '">' + e.title.$t + "</a>\n                    </li>"
                }),
                t += "</ul>",
                o.innerHTML = t
            }).
            catch(e = >{
                console.error("Error fetching popular posts:", e),
                o.innerHTML = ""
            })
        },
        y = () = >{
            v(),
            f()
        },
        b = () = >{
            s.style.display = "block",
            l.style.display = "none"
        };
        window.renderDefaultView = y;
        let w = () = >{
            s.style.display = "none",
            l.style.display = "block"
        },
        k = e = >{
            w(),
            l.innerHTML = '<div class="ms-loader">Searching...</div>',
            fetch("/feeds/posts/default?alt=json&q=" + encodeURIComponent(e) + "&max-results=10").then(e = >e.json()).then(e = >{
                if (!e.feed || !e.feed.entry || 0 === e.feed.entry.length) {
                    l.innerHTML = '<div class="ms-no-results">No results found.</div>';
                    return
                }
                Promise.all(e.feed.entry.map(e = >{
                    let t = e.link.find(e = >"alternate" === e.rel).href;
                    return fetch(t).then(e = >e.text()).then(a = >{
                        let i = new DOMParser().parseFromString(a, "text/html"),
                        n = i.querySelector('img[alt="poster"]') ? .src || "https://resources.blogblog.com/img/blank.gif",
                        s = i.querySelector("#extra-meta .meta-year") ? .textContent.trim() || "",
                        l = i.querySelector("#extra-meta .meta-type") ? .textContent.trim() || "";
                        return {
                            title: e.title.$t,
                            url: t,
                            imageUrl: n,
                            year: s,
                            type: l
                        }
                    }).
                    catch(
                    () = >null)
                })).then(e = >{
                    let t = e.filter(Boolean);
                    if (0 === t.length) {
                        l.innerHTML = '<div class="ms-no-results">No results found.</div>';
                        return
                    }
                    let a = "<ul>";
                    t.forEach(e = >{
                        a += '\n                            <li>\n                                <a href="' + e.url + '">\n                                    <img class="result-thumb" src="' + e.imageUrl + '" alt="' + e.title + '" loading="lazy"/>\n                                    <div class="result-info">\n                                        <h3 class="title">' + e.title + '</h3>\n                                        <p class="meta">' + e.year + (e.year && e.type ? " \xb7 " : "") + e.type + "</p>\n                                    </div>\n                                </a>\n                            </li>"
                    }),
                    a += "</ul>",
                    l.innerHTML = a,
                    l.addEventListener("click", e = >{
                        let t = e.target.closest("a");
                        t && (e.preventDefault(), u(i.value.trim()), window.location.href = t.href)
                    })
                })
            }).
            catch(e = >{
                l.innerHTML = '<div class="ms-no-results">An error occurred.</div>'
            })
        };
        t.forEach(e = >{
            e.addEventListener("click", e = >{
                e.preventDefault(),
                _()
            }),
            e.addEventListener("focus", e = >{
                e.preventDefault(),
                e.target.blur(),
                _()
            })
        }),
        a.addEventListener("click", p),
        i.addEventListener("input", () = >{
            clearTimeout(c);
            let e = i.value.trim();
            e.length > 1 ? c = setTimeout(
            () = >{
                k(e)
            },
            300) : b()
        }),
        n.addEventListener("submit", e = >{
            e.preventDefault();
            let t = i.value.trim();
            t && (u(t), window.location.href = "/search?q=" + encodeURIComponent(t))
        }),
        r.addEventListener("click", e = >{
            e.target.classList.contains("delete-item-btn") && g(e.target.dataset.term),
            e.target.classList.contains("clear-btn") && h()
        });
        let C = document.getElementById("bottom-nav-search-trigger");
        C && C.addEventListener("click", e = >{
            e.preventDefault(),
            _()
        })
    }
    function a() {
        document.querySelectorAll(".comment-content:not(.tags-transformed)").forEach(e = >{
            let t = e.innerHTML;
            t.includes("[QA]") && (t = t.replace(/\[QA\](.*?)\[OPT\](.*?)\[\/QA\]/g, (t, a, i) = >{
                let n = e.closest(".comment"),
                s = "Join the discussion...",
                l = "";
                if (n) {
                    l = "qa-source-" + n.id,
                    n.setAttribute("data-qa-id", l);
                    let r = n.querySelector(".comment-replies");
                    if (r) {
                        let o = r.querySelectorAll("li.comment").length;
                        if (o > 0) {
                            let d = o;
                            o >= 1e3 && (d = (o / 1e3).toFixed(1).replace(/\.0$/, "") + "K"),
                            s = d + " replies and discussion"
                        }
                    }
                }
                let c = i.split("[OPT]").map(e = >'<span class="qa-option">' + e.trim() + "</span>").join("");
                return '<div class="qa-card" data-qa-id="' + l + '">\n                  <div class="qa-title"><span class="qa-icon">#</span>' + a.trim() + '</div>\n                  <div class="qa-options">' + c + '</div>\n                  <a class="qa-footer" href="javascript:void(0)"><svg class="qa-stats-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g><rect x="4" y="10" width="4" height="10" rx="1"></rect><rect x="10" y="4" width="4" height="16" rx="1"></rect><rect x="16" y="6" width="4" height="14" rx="1"></rect></g></svg><span>' + s + '</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" style="margin-left: 4px; font-weight: bold;"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></a>\n                </div>'
            }));
            let a = (e, t) = >{
                let a = t.replace(/</g, "<").replace(/>/g, ">").replace(/&/g, "&"),
                i = (a = a.replace(/<br\s*\/?>/gi, "\n")).replace(/</g, "<").replace(/>/g, ">"),
                n = "copied-msg-" + Math.random().toString(36).substr(2, 9);
                return '<div class="comment-code-wrapper">\n            <pre><code class="hljs">' + i + '</code></pre>\n            <button class="copy-code-btn" title="Copy code" onclick="navigator.clipboard.writeText(this.previousElementSibling.querySelector(\'code\').textContent).then(() => { const msg = document.getElementById(\'' + n + '\'); msg.classList.add(\'show\'); setTimeout(() => msg.classList.remove(\'show\'), 2000); });">\n              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>\n            </button>\n            <span class="code-copied-msg" id="' + n + '">Copied!</span>\n          </div>'
            };
            t = (t = (t = (t = t.replace(/\[pre\]([\s\S]*?)\[\/pre\]/g, a)).replace(/\[code\]([\s\S]*?)\[\/code\]/g, '<code class="comment-inline-code hljs">$1</code>')).replace(/\[quote\]([\s\S]*?)\[\/quote\]/g, "<blockquote>$1</blockquote>")).replace(/\[tag\]([\s\S]*?)\[\/tag\]/g, '<b class="comment-tag">@$1</b>'),
            e.innerHTML = t,
            e.classList.add("tags-transformed"),
            "undefined" != typeof hljs && e.querySelectorAll("pre code.hljs").forEach(e = >{
                hljs.highlightElement(e),
                "function" == typeof hljs.lineNumbersBlock && hljs.lineNumbersBlock(e)
            })
        })
    }
    function i() {
        if (!document.querySelector(".account-page-container")) return;
        let e = (JSON.parse(localStorage.getItem("abefilmUserWatchlist")) || []).length,
        t = (JSON.parse(localStorage.getItem("watchHistoryIDs")) || []).length,
        a = (JSON.parse(localStorage.getItem("abefilm_favorites")) || []).length,
        i = document.querySelector('a[href="/p/watchlist.html"] .item-value'),
        n = document.querySelector('a[href="/p/history.html"] .item-value'),
        s = document.querySelector('a[href="/p/favorite.html"] .item-value');
        i && (e > 0 ? (i.textContent = e, i.classList.add("is-badge")) : (i.textContent = "View", i.classList.remove("is-badge"))),
        n && (n.textContent = t > 0 ? t : "View"),
        s && (s.textContent = a > 0 ? a : "View")
    }
    document.body.classList.add("no-transition"),
    "collapsed" === localStorage.getItem("sidebarState") && document.body.classList.add("sidebar-collapsed"),
    window.removeFromHistory = function(e) {
        if (!e) return;
        let t = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]");
        t = t.filter(t = >String(t) !== String(e)),
        localStorage.setItem("watchHistoryIDs", JSON.stringify(t));
        let a = document.getElementById("history-item-" + e);
        a && a.remove();
        let i = document.getElementById("history-items-list");
        i && 0 === i.children.length && (document.getElementById("history-empty-message").style.display = "block"),
        "function" == typeof window.updateHistoryBadge && window.updateHistoryBadge()
    },
    document.addEventListener("DOMContentLoaded", function() {
        let e = document.getElementById("comments");
        e && e.addEventListener("click", function(e) {
            let t = e.target.closest(".qa-footer");
            if (t) {
                e.preventDefault();
                let a = t.closest(".qa-card");
                if (a) {
                    let i = document.querySelector('.comment[data-qa-id="' + a.dataset.qaId + '"]');
                    if (i) {
                        let n = i.querySelector(".comment-actions a.comment-reply");
                        n && n.click()
                    }
                }
            }
        });
        let t = document.body,
        a = document.getElementById("sidebarToggle");
        setTimeout(
        () = >{
            t.classList.remove("no-transition")
        },
        100),
        a && a.addEventListener("click", () = >{
            t.classList.toggle("sidebar-collapsed"),
            localStorage.setItem("sidebarState", t.classList.contains("sidebar-collapsed") ? "collapsed" : "expanded"),
            setTimeout(function() {
                $("#dynamic-main-slider, #PopularPosts1 .owl-carousel").trigger("refresh.owl.carousel")
            },
            350)
        });
        let i = window.location.pathname,
        n = document.querySelectorAll(".sidebar-nav a"),
        s = null,
        l = -1;
        n.forEach(e = >{
            let t = e.getAttribute("href");
            if (!t || !t.startsWith("#")) try {
                let a = new URL(e.href).pathname;
                "/" === a && "/" === i ? (s = e, l = 1) : "/" !== a && i.startsWith(a) && a.length > l && (l = a.length, s = e)
            } catch {}
        }),
        s && (n.forEach(e = >e.parentElement.classList.remove("active")), s.parentElement.classList.add("active"));
        let r = document.querySelector('a[href="#clear-cache"]');
        if (r && r.addEventListener("click", function(e) {
            e.preventDefault(),
            confirm("This will clear cached data. Continue?") && (localStorage.clear(), sessionStorage.clear(), alert("Cache cleared. The page will now reload."), window.location.reload(!0))
        }), document.body.classList.contains("final-layout-script-loaded")) return;
        document.body.classList.add("final-layout-script-loaded");
        let o = document.querySelector(".post-page-final-container");
        if (o) {
            try {
                var d;
                let c = function(e) {
                    if (!e) return;
                    let t = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]");
                    (t = t.filter(t = >String(t) !== String(e))).unshift(e),
                    t.length > 50 && t.pop(),
                    localStorage.setItem("watchHistoryIDs", JSON.stringify(t))
                },
                _ = function(e) {
                    let t = D[G = e] ? .length || 0,
                    a = Math.ceil(t / 50),
                    i = o.querySelector(".episodes-pagination-final"),
                    n = o.querySelector(".episodes-grid-container-final"),
                    s = o.querySelector("#episodes-content").querySelector(".total-ep-header");
                    if (s && s.remove(), t > 0 && i.insertAdjacentHTML("beforebegin", '\n                    <div class="total-ep-header">\n                        <p class="total-ep-count">Total Episodes: ' + t + '</p>\n                        <button class="all-episodes-btn-mobile">\n                            All Episodes\n                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">\n                              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n                            </svg>\n                        </button>\n                    </div>\n                '), i.innerHTML = "", n.innerHTML = "", 0 === t) return;
                    i.innerHTML = (t > 50 ? '<div class="ep-range-tabs-container"></div>' : "") + '\n                <div class="ep-range-dropdown">\n                    <button class="ep-range-dropdown-toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg></button>\n                    <div class="ep-range-dropdown-menu"></div>\n                </div>';
                    for (let l = 0; l < a; l++) {
                        let r = document.createElement("div");
                        r.className = "episodes-grid-final",
                        r.dataset.page = l + 1,
                        n.appendChild(r);
                        for (let d = 0; d < 50; d++) {
                            let c = 50 * l + d + 1;
                            if (c > t) break;
                            let _ = document.createElement("a");
                            _.className = "ep-button",
                            _.dataset.epIndex = c - 1,
                            _.innerHTML = '<span class="ep-number-text">' + c + '</span><span class="ep-active-indicator"><svg viewBox="0 0 24 24"><rect class="bar bar1" x="4" y="8" width="4" height="10" rx="1"></rect><rect class="bar bar2" x="10" y="4" width="4" height="16" rx="1"></rect><rect class="bar bar3" x="16" y="10" width="4" height="8" rx="1"></rect></svg></span>',
                            r.appendChild(_)
                        }
                    }
                    N >= t && (N = 0);
                    let p = document.getElementById("all-episodes-modal-overlay"),
                    u = document.getElementById("all-episodes-modal-grid"),
                    g = p.querySelector(".episodes-modal-close-btn"),
                    h = () = >{
                        u.innerHTML = "",
                        o.querySelectorAll(".episodes-grid-final .ep-button").forEach(e = >{
                            let t = e.cloneNode(!0);
                            u.appendChild(t)
                        }),
                        p.classList.add("is-visible"),
                        document.body.style.overflow = "hidden"
                    },
                    v = () = >{
                        p.classList.remove("is-visible"),
                        document.body.style.overflow = ""
                    },
                    f = o.querySelector(".all-episodes-btn-mobile");
                    f && (f.onclick = h),
                    g.onclick = v,
                    p.onclick = e = >{
                        e.target === p && v()
                    },
                    u.onclick = e = >{
                        let t = e.target.closest(".ep-button");
                        if (t) {
                            e.preventDefault();
                            let a = parseInt(t.dataset.epIndex, 10);
                            m(a),
                            v()
                        }
                    },
                    m(N)
                },
                p = function() {
                    J.innerHTML = "",
                    z.forEach(e = >{
                        let t = document.createElement("button");
                        t.className = "server-btn",
                        t.dataset.server = e;
                        let a = v.querySelector('ul[data-server-name="' + e + '"]'),
                        i = a ? a.dataset.serverLogo : null,
                        n = "";
                        n = i ? '<img src="' + i + '" alt="' + e + '" class="server-logo-img"/> <span class="server-name-text">' + e + "</span>" : '<span class="server-name-text">' + e + "</span>",
                        t.innerHTML = n,
                        e === G && t.classList.add("active"),
                        J.appendChild(t)
                    })
                },
                m = function(e) {
                    let t = D[G] ? .length || 0;
                    if (e < 0 || e >= t) return;
                    N = e;
                    let a = {
                        server: G,
                        episode: N
                    };
                    localStorage.setItem(R, JSON.stringify(a));
                    let i = document.getElementById("post-id");
                    if (i) {
                        let n = i.getAttribute("data-post-id");
                        if (n) try {
                            let s = JSON.parse(localStorage.getItem("abefilmWatchProgress") || "{}");
                            s["post-" + n] = e,
                            localStorage.setItem("abefilmWatchProgress", JSON.stringify(s))
                        } catch(l) {
                            console.error("Could not save watch progress", l)
                        }
                    }
                    V.src = D[G]
                    [e].href,
                    ei.textContent = e + 1 + " / " + t,
                    document.querySelectorAll(".episodes-grid-container-final, #all-episodes-modal-grid").forEach(t = >{
                        let a = t.querySelector(".ep-button.active");
                        a && a.classList.remove("active");
                        let i = t.querySelector('.ep-button[data-ep-index="' + e + '"]');
                        i && (i.classList.add("active"), t.classList.contains("episodes-grid-container-final") && i.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center"
                        }))
                    }),
                    et.disabled = 0 === e,
                    ea.disabled = e === t - 1;
                    let r = Math.floor(e / 50) + 1,
                    d = o.querySelector(".episodes-pagination-final");
                    if (d && d.innerHTML) {
                        let c = d.querySelector(".ep-range-tabs-container .ep-range-tab.active");
                        c && parseInt(c.dataset.page, 10) === r || (u(r), g(r))
                    }
                },
                u = function(e) {
                    let t = D[G] ? .length || 0,
                    a = Math.ceil(t / 50),
                    i = o.querySelector(".episodes-pagination-final"),
                    n = i.querySelector(".ep-range-tabs-container"),
                    s = i.querySelector(".ep-range-dropdown-menu");
                    n && (n.innerHTML = ""),
                    s.innerHTML = "";
                    let l = 1;
                    a > 3 && e > 3 && (l = 3 * Math.floor(
                    (e - 1) / 3) + 1);
                    for (let r = 0; r < a; r++) {
                        let d = r + 1,
                        c = 50 * r + 1,
                        _ = Math.min(
                        (r + 1) * 50, t),
                        p = c + "-" + _,
                        m = document.createElement("a");
                        if (m.className = "ep-range-tab", m.href = "#", m.dataset.page = d, m.innerHTML = "<span>" + p + "</span>", d === e && m.classList.add("active"), s.appendChild(m), n && d >= l && d < l + 3) {
                            let u = document.createElement("button");
                            u.className = "ep-range-tab",
                            u.dataset.page = d,
                            u.innerHTML = "<span>" + p + "</span>",
                            d === e && u.classList.add("active"),
                            n.appendChild(u)
                        }
                    }
                    let g = i.querySelector(".ep-range-dropdown-toggle");
                    g && (g.style.display = a > 1 ? "flex" : "none")
                },
                g = function(e) {
                    o.querySelectorAll(".episodes-grid-final").forEach(t = >{
                        t.classList.toggle("active", t.dataset.page == e)
                    })
                },
                h = document.querySelector("#source-data-container");
                if (!h) throw Error("Source data container (#source-data-container) not found.");
                let v = h.querySelector(".post-body");
                if (!v) throw Error("Source data element (.post-body) not found inside hidden container.");
                let f = () = >h.querySelector(".entry-title") ? .textContent.trim() || "",
                y = e = >v.querySelector(e) ? .textContent.trim() || "",
                b = v.querySelector(d = 'img[alt="poster"]') ? .getAttribute("src") || "",
                w = y("span.slider-backdrop"),
                k = y("#extra-meta .meta-rating"),
                C = y("#extra-meta .meta-year"),
                L = y("#extra-meta .meta-pg"),
                x = y("#extra-meta .meta-status"),
                E = y("#extra-meta .meta-country"),
                S = Array.from(v.querySelectorAll("#extra-meta .meta-genre")).map(e = >e.textContent.trim()),
                I = o.querySelector("#add-to-watchlist-btn");
                if (I) {
                    let M = new URL(window.location.href).pathname,
                    B = f(),
                    q = window.location.href,
                    A = w || b;
                    I.setAttribute("data-post-id", M),
                    I.setAttribute("data-post-title", B),
                    I.setAttribute("data-post-url", q),
                    I.setAttribute("data-post-image", A),
                    $(document).trigger("abefilm:postDataReady", [{
                        id: M,
                        title: B,
                        url: q,
                        image: A
                    }])
                }
                o.querySelectorAll(".details-header-final").forEach(e = >{
                    e.querySelector(".poster-final img").src = b,
                    e.querySelector(".title-final").textContent = f();
                    let t = e.querySelector(".meta-line-final");
                    k && (t.innerHTML += '<span class="rating"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none">\n    <path d="M15.0183 9.43335L15.5462 10.498C15.6182 10.6462 15.8102 10.7883 15.9722 10.8155L16.9291 10.9758C17.541 11.0787 17.685 11.5263 17.244 11.9678L16.5001 12.7179C16.3741 12.8449 16.3051 13.0899 16.3441 13.2653L16.5571 14.1938C16.7251 14.9288 16.3381 15.2131 15.6932 14.829L14.7963 14.2937C14.6343 14.1969 14.3674 14.1969 14.2024 14.2937L13.3055 14.829C12.6636 15.2131 12.2736 14.9258 12.4416 14.1938L12.6546 13.2653C12.6935 13.0899 12.6246 12.8449 12.4986 12.7179L11.7547 11.9678C11.3167 11.5263 11.4577 11.0787 12.0696 10.9758L13.0265 10.8155C13.1855 10.7883 13.3775 10.6462 13.4495 10.498L13.9774 9.43335C14.2654 8.85568 14.7333 8.85568 15.0183 9.43335Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8 17L8 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8 3.5V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M22 8.87895C21.9331 7.33687 21.7456 6.33298 21.2203 5.53884C20.9181 5.08196 20.5428 4.68459 20.1112 4.36468C18.9447 3.5 17.299 3.5 14.0078 3.5H9.99305C6.70178 3.5 5.05614 3.5 3.88962 4.36468C3.45805 4.68459 3.08267 5.08196 2.78047 5.53884C2.25526 6.33289 2.06776 7.33665 2.00083 8.87843C1.98938 9.14208 2.21648 9.34375 2.46531 9.34375C3.85109 9.34375 4.97449 10.533 4.97449 12C4.97449 13.467 3.85109 14.6562 2.46531 14.6562C2.21648 14.6562 1.98938 14.8579 2.00083 15.1216C2.06776 16.6634 2.25526 17.6671 2.78047 18.4612C3.08267 18.918 3.45805 19.3154 3.88962 19.6353C5.05614 20.5 6.70178 20.5 9.99306 20.5H14.0078C17.299 20.5 18.9447 20.5 20.1112 19.6353C20.5428 19.3154 20.9181 18.918 21.2203 18.4612C21.7456 17.667 21.9331 16.6631 22 15.1211V8.87895Z" stroke="grey" stroke-width="1.5" stroke-linejoin="round" />\n</svg> ' + k + "</span>"),
                    C && (t.innerHTML += "<span>" + C + "</span>"),
                    E && (t.innerHTML += "<span>" + E + "</span>"),
                    L && (t.innerHTML += "<span>" + L + "</span>");
                    let a = e.querySelector(".tags-line-final");
                    if (S.forEach(e = >a.innerHTML += '<span class="tag">' + e + "</span>"), x) {
                        let i = e.querySelector(".meta-line-final");
                        i && i.insertAdjacentHTML("afterend", '<div style="font-size:13px; color:#a7a7a7; margin-top:8px;">' + x + "</div>")
                    }
                }),
                o.querySelector(".synopsis-final").textContent = v.querySelector("#overview-data") ? .textContent.trim() || "";
                let H = v.querySelectorAll("#celebrity-data li");
                if (H.length > 0) {
                    let T = o.querySelector("#celebrity-section"),
                    j = o.querySelector(".celebrity-grid-final");
                    T.style.display = "block",
                    H.forEach(e = >{
                        let t = e.querySelector("img") ? .src || "",
                        a = e.querySelector("span") ? .textContent || "";
                        j.innerHTML += '<div class="celebrity-item-final"><img src="' + t + '" alt="' + a + '"/><span class="name">' + a + "</span></div>"
                    })
                }
                let D = {},
                z = [];
                v.querySelectorAll("#episodes-data > ul[data-server-name]").forEach(e = >{
                    let t = e.dataset.serverName;
                    t && e.querySelectorAll("a").length > 0 && (z.push(t), D[t] = Array.from(e.querySelectorAll("a")))
                });
                let F = Array.from(v.querySelectorAll("#download-data a")),
                V = o.querySelector(".video-player-container-final iframe"),
                P = o.querySelector(".video-player-container-final"),
                W = o.querySelector(".video-overlay");
                W && w && (W.style.backgroundImage = "url(" + w + ")"),
                W && W.addEventListener("click", () = >{
                    let e = document.getElementById("post-id");
                    if (e) {
                        let t = e.getAttribute("data-post-id");
                        t && c(t)
                    }
                    P.classList.add("is-playing");
                    let a = V.getAttribute("src");
                    if (a && "about:blank" !== a) try {
                        let i = new URL(a);
                        i.searchParams.set("autoplay", "1"),
                        V.setAttribute("src", i.href)
                    } catch {
                        V.setAttribute("src", a + (a.includes("?") ? "&" : "?") + "autoplay=1")
                    }
                });
                let R = "watchState_" + window.location.pathname,
                N = 0,
                G = z[0] || null,
                U = localStorage.getItem(R);
                if (U) try {
                    let O = JSON.parse(U);
                    if (O && z.includes(O.server)) {
                        let Z = D[O.server] ? .length || 0;
                        O.episode < Z && (G = O.server, N = O.episode)
                    }
                } catch(K) {
                    console.error("Could not parse saved watch state.", K)
                }
                let J = o.querySelector(".server-selection-final"),
                Y = o.querySelector(".download-links-container"),
                Q = o.querySelector("#reload-btn"),
                X = o.querySelector("#fullscreen-btn"),
                ee = o.querySelector("#sandbox-checkbox"),
                et = o.querySelector("#prev-ep-btn"),
                ea = o.querySelector("#next-ep-btn"),
                ei = o.querySelector("#ep-counter"),
                en = o.querySelector("#season-info"),
                es = z.length > 0 && D[z[0]] ? .length > 0,
                el = z.length > 1,
                er = F.length > 0;
                if (es || el || er) {
                    o.querySelector("#episodes-section").style.display = "block";
                    let eo = o.querySelector(".episodes-tabs-final"),
                    ed = o.querySelectorAll(".ep-tab-content"),
                    ec = null;
                    if (eo.innerHTML = "", es && (eo.innerHTML += '<button class="ep-tab-button" data-target="#episodes-content"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">\n    <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z" stroke-width="1.5" stroke-linecap="round"></path>\n    <path d="M9 3L12 6L16 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n</svg>Episodes</button>', ec || ="#episodes-content"), el && (eo.innerHTML += '<button class="ep-tab-button" data-target="#server-content"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">\n    <path d="M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n    <path d="M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n    <path d="M6 17H6.01" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n    <path d="M10 17H10.01" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n    <path d="M6 7H6.01" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n    <path d="M10 7H10.01" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n</svg>Server<span class="tab-count">' + z.length + "</span></button>", ec || ="#server-content"), er && (eo.innerHTML += '<button class="ep-tab-button" data-target="#download-content"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none">\n    <path d="M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n    <path d="M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>\n</svg>Download</button>', ec || ="#download-content"), ec && (eo.querySelector('[data-target="' + ec + '"]').classList.add("active"), o.querySelector(ec).classList.add("active")), es ? _(G) : o.querySelector(".footer-group-middle").style.display = "none", el && p(), er && function() {
                        Y.innerHTML = "";
                        let e = F.length;
                        if (0 === e) return;
                        Y.innerHTML = '<p class="total-ep-count">Total Files: ' + e + "</p>";
                        let t = document.createElement("div");
                        t.className = "download-grid-final",
                        F.forEach(e = >{
                            let a = document.createElement("a");
                            a.href = e.href,
                            a.className = "ep-button",
                            a.setAttribute("target", "_blank"),
                            a.textContent = e.textContent,
                            t.appendChild(a)
                        }),
                        Y.appendChild(t)
                    } (), eo.addEventListener("click", e = >{
                        let t = e.target.closest(".ep-tab-button");
                        if (t) {
                            eo.querySelector(".active") ? .classList.remove("active"),
                            t.classList.add("active"),
                            ed.forEach(e = >e.classList.remove("active"));
                            let a = t.dataset.target;
                            o.querySelector(a).classList.add("active")
                        }
                    }), J.addEventListener("click", e = >{
                        if (e.target.matches(".server-btn")) {
                            let t = e.target.dataset.server;
                            t !== G && (_(t), p())
                        }
                    }), es) {
                        let e_ = function() {
                            let e = document.querySelector(".ep-range-dropdown-menu.is-open-globally");
                            e && e.classList.remove("is-open-globally"),
                            window.removeEventListener("scroll", e1),
                            e0 = !1
                        },
                        e1 = function() {
                            e_()
                        },
                        ep = function(e, t) {
                            let a = e.getBoundingClientRect().bottom + 8;
                            t.style.top = a + "px",
                            t.classList.add("is-open-globally"),
                            e0 || (window.addEventListener("scroll", e1, {
                                once: !0
                            }), e0 = !0)
                        };
                        o.querySelector(".episodes-pagination-final");
                        let e0 = !1;
                        document.body.addEventListener("click", function(e) {
                            let t = e.target.closest(".ep-range-dropdown-toggle"),
                            a = e.target.closest(".ep-range-tab"),
                            i = document.querySelector(".ep-range-dropdown-menu.is-open-globally");
                            if (t) {
                                e.preventDefault(),
                                e.stopPropagation();
                                let n = t.nextElementSibling;
                                n && n.classList.contains("is-open-globally") ? e_() : n && ep(t, n)
                            } else
                            if (a) {
                                e.preventDefault();
                                let s = parseInt(a.dataset.page, 10);
                                e.target.closest(".ep-range-dropdown-menu") && e_(),
                                u(s),
                                g(s)
                            } else i && !e.target.closest(".ep-range-dropdown") && e_()
                        }),
                        o.querySelector(".episodes-grid-container-final").addEventListener("click", e = >{
                            let t = e.target.closest(".ep-button");
                            t && (e.preventDefault(), m(parseInt(t.dataset.epIndex, 10)))
                        }),
                        et.addEventListener("click", () = >m(N - 1)),
                        ea.addEventListener("click", () = >m(N + 1))
                    }
                    let e$ = o.querySelector("#comment-btn");
                    e$ && e$.addEventListener("click", () = >{
                        let e = document.querySelector("#comments");
                        e && e.scrollIntoView({
                            behavior: "smooth"
                        })
                    }), Q.addEventListener("click", () = >{
                        V.src = V.src
                    }), X.addEventListener("click", () = >{
                        V.requestFullscreen && V.requestFullscreen()
                    }), ee.addEventListener("change", () = >{
                        ee.checked ? V.setAttribute("sandbox", "allow-scripts allow-same-origin") : V.removeAttribute("sandbox")
                    }); let em = y("#extra-meta .meta-season"); em && (en.textContent = em), !es && G && (V.src = D[G]
                    [0].href)
                } else {
                    let eu = v.querySelector("iframe");
                    eu && eu.src && (V.src = eu.src),
                    o.querySelector("#episodes-section").style.display = "none",
                    o.querySelector(".footer-group-middle").style.display = "none"
                }
                let eg = o.querySelector(".info-modal-final"),
                eh = o.querySelector(".introduction-link-final"),
                ev = eg.querySelector(".modal-close-btn");
                if (eh && eg && ev) {
                    let ef = e = >{
                        e.preventDefault(),
                        window.innerWidth <= 767 ? eg.classList.add("is-open-mobile") : eg.style.display = "block"
                    },
                    e4 = () = >{
                        window.innerWidth <= 767 ? eg.classList.remove("is-open-mobile") : eg.style.display = "none"
                    };
                    eh.addEventListener("click", ef),
                    ev.addEventListener("click", e4)
                }
                if (o.classList.add("loaded"), window.innerWidth <= 767) {
                    let e2 = document.querySelector(".player-column-final"),
                    ey = document.querySelector("article.item-post");
                    e2 && ey && ey.prepend(e2)
                }
            } catch(e3) {
                if (console.error("Error initializing custom player layout:", e3), document.querySelector(".item-post")) {
                    let e5 = document.getElementById("source-data-container");
                    e5 && (e5.style.display = "block")
                }
                o && (o.style.display = "none")
            }
            try {
                var e6 = decodeURIComponent(window.location.pathname),
                e7 = document.querySelectorAll(".mobile-nav a"),
                eb = null;
                e7.forEach(function(e) {
                    var t = new URL(e.href).pathname;
                    ("/" === t && "/" === e6 || "/" !== t && e6.startsWith(t) && (!eb || t.length > new URL(eb.href).pathname.length)) && (eb = e)
                }),
                eb ? eb.classList.add("active") : "/" === e6 && document.querySelector('.mobile-nav a[href="/"]').classList.add("active")
            } catch(ew) {
                console.error("Error setting active mobile link:", ew)

/* ============================================================ */
/* // Anti-DevTool (OffDevtool)                          */
/* ============================================================ */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).OffDevtool=t()}(this,function(){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1})}function e(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&n(e,t)}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function n(e,t){return(n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function U(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");t=e;if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=a(n);return U(this,o?(e=a(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function s(e,t){var n,o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length)return o&&(e=o),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,u=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return r=e.done,e},e:function(e){u=!0,i=e},f:function(){try{r||null==o.return||o.return()}finally{if(u)throw i}}}}function t(){if(d.url)window.location.href=d.url;else if(d.rewriteHTML)try{document.documentElement.innerHTML=d.rewriteHTML}catch(e){document.documentElement.innerText=d.rewriteHTML}else{try{window.opener=null,window.open("","_self"),window.close(),window.history.back()}catch(e){console.log(e)}setTimeout(function(){window.location.href=d.timeOutUrl||"https://theajack.github.io/disable-devtool/404.html?h=".concat(encodeURIComponent(location.host))},500)}}var d={md5:"",ondevtoolopen:t,ondevtoolclose:null,url:"",timeOutUrl:"",tkName:"ddtk",interval:500,disableMenu:!0,stopIntervalTime:5e3,clearIntervalWhenDevOpenTrigger:!1,detectors:[1,3,4,5,6,7],clearLog:!0,disableSelect:!1,disableInputSelect:!1,disableCopy:!1,disableCut:!1,disablePaste:!1,ignore:null,disableIframeParents:!0,seo:!0,rewriteHTML:""},H=["detectors","ondevtoolclose","ignore"];function q(e){var t,n=0<arguments.length&&void 0!==e?e:{};for(t in n.onDevtoolOpen&&(n.ondevtoolopen=n.onDevtoolOpen),n.onDevtoolClose&&(n.ondevtoolclose=n.onDevtoolClose),d){var o=t;void 0===n[o]||i(d[o])!==i(n[o])&&-1===H.indexOf(o)||(d[o]=n[o])}"function"==typeof d.ondevtoolclose&&!0===d.clearIntervalWhenDevOpenTrigger&&(d.clearIntervalWhenDevOpenTrigger=!1,console.warn("【DISABLE-DEVTOOL】clearIntervalWhenDevOpenTrigger 在使用 ondevtoolclose 时无效"))}function v(){return(new Date).getTime()}function h(e){var t=v();return e(),v()-t}function z(n,o){function e(t){return function(){n&&n();var e=t.apply(void 0,arguments);return o&&o(),e}}var t=window.alert,i=window.confirm,r=window.prompt;try{window.alert=e(t),window.confirm=e(i),window.prompt=e(r)}catch(e){}}var p,y,B,b={iframe:!1,pc:!1,qqBrowser:!1,firefox:!1,macos:!1,edge:!1,oldEdge:!1,ie:!1,iosChrome:!1,iosEdge:!1,chrome:!1,seoBot:!1,mobile:!1};function W(){function e(e){return-1!==t.indexOf(e)}var t=navigator.userAgent.toLowerCase(),n=function(){var e=navigator,t=e.platform,e=e.maxTouchPoints;if("number"==typeof e)return 1<e;if("string"==typeof t){e=t.toLowerCase();if(/(mac|win)/i.test(e))return!1;if(/(android|iphone|ipad|ipod|arch)/i.test(e))return!0}return/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase())}(),o=!!window.top&&window!==window.top,i=!n,r=e("qqbrowser"),u=e("firefox"),c=e("macintosh"),a=e("edge"),l=a&&!e("chrome"),f=l||e("trident")||e("msie"),s=e("crios"),d=e("edgios"),v=e("chrome")||s,h=!n&&/(googlebot|baiduspider|bingbot|applebot|petalbot|yandexbot|bytespider|chrome\-lighthouse|moto g power)/i.test(t);Object.assign(b,{iframe:o,pc:i,qqBrowser:r,firefox:u,macos:c,edge:a,oldEdge:l,ie:f,iosChrome:s,iosEdge:d,chrome:v,seoBot:h,mobile:n})}function M(){for(var e=function(){for(var e={},t=0;t<500;t++)e["".concat(t)]="".concat(t);return e}(),t=[],n=0;n<50;n++)t.push(e);return t}function g(){d.clearLog&&B()}var K="",V=!1;function N(){var e=d.ignore;if(e){if("function"==typeof e)return e();if(0!==e.length){var t=location.href;if(K===t)return V;K=t;var n,o=!1,i=s(e);try{for(i.s();!(n=i.n()).done;){var r=n.value;if("string"==typeof r){if(-1!==t.indexOf(r)){o=!0;break}}else if(r.test(t)){o=!0;break}}}catch(e){i.e(e)}finally{i.f()}return V=o}}}var X=function(){return!1};function w(n){var t,e,o=74,i=73,r=85,u=83,c=123,a=b.macos?function(e,t){return e.metaKey&&e.altKey&&(t===i||t===o)}:function(e,t){return e.ctrlKey&&e.shiftKey&&(t===i||t===o)},l=b.macos?function(e,t){return e.metaKey&&e.altKey&&t===r||e.metaKey&&t===u}:function(e,t){return e.ctrlKey&&(t===u||t===r)};n.addEventListener("keydown",function(e){var t=(e=e||n.event).keyCode||e.which;if(t===c||a(e,t)||l(e,t))return T(n,e)},!0),t=n,d.disableMenu&&t.addEventListener("contextmenu",function(e){if("touch"!==e.pointerType)return T(t,e)}),e=n,(d.disableSelect||d.disableInputSelect)&&m(e,"selectstart"),e=n,d.disableCopy&&m(e,"copy"),e=n,d.disableCut&&m(e,"cut"),e=n,d.disablePaste&&m(e,"paste")}function m(o,e){o.addEventListener(e,function(e){if(!(t=e.target)||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&"true"!==(null==(n=t.getAttribute)?void 0:n.call(t,"contenteditable"))){if(d.disableSelect)return T(o,e)}else if(d.disableInputSelect)return T(o,e);var t,n})}function T(e,t){if(!N()&&!X())return(t=t||e.event).returnValue=!1,t.preventDefault(),!1}var O,D=!1,S={};function F(e){S[e]=!1}function $(){for(var e in S)if(S[e])return D=!0;return D=!1}(A=O=O||{})[A.Unknown=-1]="Unknown",A[A.RegToString=0]="RegToString",A[A.DefineId=1]="DefineId",A[A.Size=2]="Size",A[A.DateToString=3]="DateToString",A[A.FuncToString=4]="FuncToString",A[A.Debugger=5]="Debugger",A[A.Performance=6]="Performance",A[A.DebugLib=7]="DebugLib";var k=function(){function n(e){var t=e.type,e=e.enabled,e=void 0===e||e;o(this,n),this.type=O.Unknown,this.enabled=!0,this.type=t,this.enabled=e,this.enabled&&(t=this,Q.push(t),this.init())}return u(n,[{key:"onDevToolOpen",value:function(){var e;console.warn("You don't have permission to use DEVTOOL!【type = ".concat(this.type,"】")),d.clearIntervalWhenDevOpenTrigger&&te(),window.clearTimeout(J),d.ondevtoolopen(this.type,t),e=this.type,S[e]=!0}},{key:"init",value:function(){}}]),n}(),G=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.DebugLib})}return u(t,[{key:"init",value:function(){}},{key:"detect",value:function(){var e;(!0===(null==(e=null==(e=window.eruda)?void 0:e._devTools)?void 0:e._isShow)||window._vcOrigConsole&&window.document.querySelector("#__vconsole.vc-toggle"))&&this.onDevToolOpen()}}],[{key:"isUsing",value:function(){return!!window.eruda||!!window._vcOrigConsole}}]),t}(),Y=0,J=0,Q=[],Z=0;function ee(i){function e(){l=!0}function t(){l=!1}var n,o,r,u,c,a,l=!1;function f(){(a[u]===r?o:n)()}z(e,t),n=t,o=e,void 0!==(a=document).hidden?(r="hidden",c="visibilitychange",u="visibilityState"):void 0!==a.mozHidden?(r="mozHidden",c="mozvisibilitychange",u="mozVisibilityState"):void 0!==a.msHidden?(r="msHidden",c="msvisibilitychange",u="msVisibilityState"):void 0!==a.webkitHidden&&(r="webkitHidden",c="webkitvisibilitychange",u="webkitVisibilityState"),a.removeEventListener(c,f,!1),a.addEventListener(c,f,!1),Y=window.setInterval(function(){if(!(i.isSuspend||l||N())){var e,t,n=s(Q);try{for(n.s();!(e=n.n()).done;){var o=e.value;F(o.type),o.detect(Z++)}}catch(e){n.e(e)}finally{n.f()}g(),"function"==typeof d.ondevtoolclose&&(t=D,!$()&&t&&d.ondevtoolclose())}},d.interval),J=setTimeout(function(){b.pc||G.isUsing()||te()},d.stopIntervalTime)}function te(){window.clearInterval(Y)}var P=8;function ne(e){for(var t=function(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,o=-271733879,i=-1732584194,r=271733878,u=0;u<e.length;u+=16){var c=n,a=o,l=i,f=r;n=E(n,o,i,r,e[u+0],7,-680876936),r=E(r,n,o,i,e[u+1],12,-389564586),i=E(i,r,n,o,e[u+2],17,606105819),o=E(o,i,r,n,e[u+3],22,-1044525330),n=E(n,o,i,r,e[u+4],7,-176418897),r=E(r,n,o,i,e[u+5],12,1200080426),i=E(i,r,n,o,e[u+6],17,-1473231341),o=E(o,i,r,n,e[u+7],22,-45705983),n=E(n,o,i,r,e[u+8],7,1770035416),r=E(r,n,o,i,e[u+9],12,-1958414417),i=E(i,r,n,o,e[u+10],17,-42063),o=E(o,i,r,n,e[u+11],22,-1990404162),n=E(n,o,i,r,e[u+12],7,1804603682),r=E(r,n,o,i,e[u+13],12,-40341101),i=E(i,r,n,o,e[u+14],17,-1502002290),o=E(o,i,r,n,e[u+15],22,1236535329),n=I(n,o,i,r,e[u+1],5,-165796510),r=I(r,n,o,i,e[u+6],9,-1069501632),i=I(i,r,n,o,e[u+11],14,643717713),o=I(o,i,r,n,e[u+0],20,-373897302),n=I(n,o,i,r,e[u+5],5,-701558691),r=I(r,n,o,i,e[u+10],9,38016083),i=I(i,r,n,o,e[u+15],14,-660478335),o=I(o,i,r,n,e[u+4],20,-405537848),n=I(n,o,i,r,e[u+9],5,568446438),r=I(r,n,o,i,e[u+14],9,-1019803690),i=I(i,r,n,o,e[u+3],14,-187363961),o=I(o,i,r,n,e[u+8],20,1163531501),n=I(n,o,i,r,e[u+13],5,-1444681467),r=I(r,n,o,i,e[u+2],9,-51403784),i=I(i,r,n,o,e[u+7],14,1735328473),o=I(o,i,r,n,e[u+12],20,-1926607734),n=j(n,o,i,r,e[u+5],4,-378558),r=j(r,n,o,i,e[u+8],11,-2022574463),i=j(i,r,n,o,e[u+11],16,1839030562),o=j(o,i,r,n,e[u+14],23,-35309556),n=j(n,o,i,r,e[u+1],4,-1530992060),r=j(r,n,o,i,e[u+4],11,1272893353),i=j(i,r,n,o,e[u+7],16,-155497632),o=j(o,i,r,n,e[u+10],23,-1094730640),n=j(n,o,i,r,e[u+13],4,681279174),r=j(r,n,o,i,e[u+0],11,-358537222),i=j(i,r,n,o,e[u+3],16,-722521979),o=j(o,i,r,n,e[u+6],23,76029189),n=j(n,o,i,r,e[u+9],4,-640364487),r=j(r,n,o,i,e[u+12],11,-421815835),i=j(i,r,n,o,e[u+15],16,530742520),o=j(o,i,r,n,e[u+2],23,-995338651),n=L(n,o,i,r,e[u+0],6,-198630844),r=L(r,n,o,i,e[u+7],10,1126891415),i=L(i,r,n,o,e[u+14],15,-1416354905),o=L(o,i,r,n,e[u+5],21,-57434055),n=L(n,o,i,r,e[u+12],6,1700485571),r=L(r,n,o,i,e[u+3],10,-1894986606),i=L(i,r,n,o,e[u+10],15,-1051523),o=L(o,i,r,n,e[u+1],21,-2054922799),n=L(n,o,i,r,e[u+8],6,1873313359),r=L(r,n,o,i,e[u+15],10,-30611744),i=L(i,r,n,o,e[u+6],15,-1560198380),o=L(o,i,r,n,e[u+13],21,1309151649),n=L(n,o,i,r,e[u+4],6,-145523070),r=L(r,n,o,i,e[u+11],10,-1120210379),i=L(i,r,n,o,e[u+2],15,718787259),o=L(o,i,r,n,e[u+9],21,-343485551),n=C(n,c),o=C(o,a),i=C(i,l),r=C(r,f)}return Array(n,o,i,r)}(function(e){for(var t=Array(),n=(1<<P)-1,o=0;o<e.length*P;o+=P)t[o>>5]|=(e.charCodeAt(o/P)&n)<<o%32;return t}(e),e.length*P),n="0123456789abcdef",o="",i=0;i<4*t.length;i++)o+=n.charAt(t[i>>2]>>i%4*8+4&15)+n.charAt(t[i>>2]>>i%4*8&15);return o}function x(e,t,n,o,i,r){return C((t=C(C(t,e),C(o,r)))<<i|t>>>32-i,n)}function E(e,t,n,o,i,r,u){return x(t&n|~t&o,e,t,i,r,u)}function I(e,t,n,o,i,r,u){return x(t&o|n&~o,e,t,i,r,u)}function j(e,t,n,o,i,r,u){return x(t^n^o,e,t,i,r,u)}function L(e,t,n,o,i,r,u){return x(n^(t|~o),e,t,i,r,u)}function C(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}var A=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.RegToString,enabled:b.qqBrowser||b.firefox})}return u(t,[{key:"init",value:function(){var t=this;this.lastTime=0,this.reg=/./,p(this.reg),this.reg.toString=function(){var e;return b.qqBrowser?(e=(new Date).getTime(),t.lastTime&&e-t.lastTime<100?t.onDevToolOpen():t.lastTime=e):b.firefox&&t.onDevToolOpen(),""}}},{key:"detect",value:function(){p(this.reg)}}]),t}(),oe=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.DefineId})}return u(t,[{key:"init",value:function(){var e=this;this.div=document.createElement("div"),this.div.__defineGetter__("id",function(){e.onDevToolOpen()}),Object.defineProperty(this.div,"id",{get:function(){e.onDevToolOpen()}})}},{key:"detect",value:function(){p(this.div)}}]),t}(),ie=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.Size,enabled:!b.iframe&&!b.edge})}return u(t,[{key:"init",value:function(){var e=this;this.checkWindowSizeUneven(),window.addEventListener("resize",function(){setTimeout(function(){e.checkWindowSizeUneven()},100)},!0)}},{key:"detect",value:function(){}},{key:"checkWindowSizeUneven",value:function(){var e=function(){if(re(window.devicePixelRatio))return window.devicePixelRatio;var e=window.screen;return!!(re(e)&&e.deviceXDPI&&e.logicalXDPI)&&e.deviceXDPI/e.logicalXDPI}();if(!1!==e){var t=200<window.outerWidth-window.innerWidth*e,e=300<window.outerHeight-window.innerHeight*e;if(t||e)return this.onDevToolOpen(),!1;F(this.type)}return!0}}]),t}();function re(e){return null!=e}var _,ue=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.DateToString,enabled:!b.iosChrome&&!b.iosEdge})}return u(t,[{key:"init",value:function(){var e=this;this.count=0,this.date=new Date,this.date.toString=function(){return e.count++,""}}},{key:"detect",value:function(){this.count=0,p(this.date),g(),2<=this.count&&this.onDevToolOpen()}}]),t}(),ce=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.FuncToString,enabled:!b.iosChrome&&!b.iosEdge})}return u(t,[{key:"init",value:function(){var e=this;this.count=0,this.func=function(){},this.func.toString=function(){return e.count++,""}}},{key:"detect",value:function(){this.count=0,p(this.func),g(),2<=this.count&&this.onDevToolOpen()}}]),t}(),ae=function(){c(t,k);var e=l(t);function t(){return o(this,t),e.call(this,{type:O.Debugger,enabled:b.iosChrome||b.iosEdge})}return u(t,[{key:"detect",value:function(){var e=v();100<v()-e&&this.onDevToolOpen()}}]),t}(),le=function(){c(n,k);var t=l(n);function n(){var e;return o(this,n),(e=t.call(this,{type:O.Performance,enabled:b.chrome||!b.mobile})).count=0,e}return u(n,[{key:"init",value:function(){this.maxPrintTime=0,this.largeObjectArray=M()}},{key:"detect",value:function(){var e=this,t=h(function(){y(e.largeObjectArray)}),n=h(function(){p(e.largeObjectArray)});if(this.maxPrintTime=Math.max(this.maxPrintTime,n),g(),0===t||0===this.maxPrintTime)return!1;t>10*this.maxPrintTime&&(2<=this.count?this.onDevToolOpen():(this.count++,this.detect()))}}]),n}(),fe=(e(_={},O.RegToString,A),e(_,O.DefineId,oe),e(_,O.Size,ie),e(_,O.DateToString,ue),e(_,O.FuncToString,ce),e(_,O.Debugger,ae),e(_,O.Performance,le),e(_,O.DebugLib,G),_);var R=Object.assign(function(e){function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";return{success:!e,reason:e}}var n;if(R.isRunning)return t("already running");if(W(),n=window.console||{log:function(){},table:function(){},clear:function(){}},B=b.ie?(p=function(){return n.log.apply(n,arguments)},y=function(){return n.table.apply(n,arguments)},function(){return n.clear()}):(p=n.log,y=n.table,n.clear),q(e),d.md5&&ne(function(e){var t=window.location.search,n=window.location.hash;if(""!==(t=""===t&&""!==n?"?".concat(n.split("?")[1]):t)&&void 0!==t){n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),e=t.substr(1).match(n);if(null!=e)return unescape(e[2])}return""}(d.tkName))===d.md5)return t("token passed");if(d.seo&&b.seoBot)return t("seobot");R.isRunning=!0,ee(R);var o=R,i=(X=function(){return o.isSuspend},window.top),r=window.parent;if(w(window),d.disableIframeParents&&i&&r&&i!==window){for(;r!==i;)w(r),r=r.parent;w(i)}return("all"===d.detectors?Object.keys(fe):d.detectors).forEach(function(e){new fe[e]}),t()},{isRunning:!1,isSuspend:!1,md5:ne,version:"0.3.9",DetectorType:O,isDevToolOpened:$});A=function(){if("undefined"==typeof window||!window.document)return null;var n=document.querySelector("[off-devtool-auto]");if(!n)return null;var o=["disable-menu","disable-select","disable-copy","disable-cut","disable-paste","clear-log"],i=["interval"],r={};return["md5","url","tk-name","detectors"].concat(o,i).forEach(function(e){var t=n.getAttribute(e);null!==t&&(-1!==i.indexOf(e)?t=parseInt(t):-1!==o.indexOf(e)?t="false"!==t:"detector"===e&&"all"!==t&&(t=t.split(" ")),r[function(e){if(-1===e.indexOf("-"))return e;var t=!1;return e.split("").map(function(e){return"-"===e?(t=!0,""):t?(t=!1,e.toUpperCase()):e}).join("")}(e)]=t)}),r}();return A&&R(A),R});
