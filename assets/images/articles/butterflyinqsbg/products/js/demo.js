(function(a) {
    var b = function() {
        var b = 65,
            c = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
            d = {
                eventName: "click",
                onShow: function() {},
                onBeforeShow: function() {},
                onHide: function() {},
                onChange: function() {},
                onSubmit: function() {},
                color: "ff0000",
                livePreview: !0,
                flat: !1
            },
            e = function(b, c) {
                var d = L(b);
                ba(c).data("colorpicker").fields.eq(1).val(d.r).end().eq(2).val(d.g).end().eq(3).val(d.b).end()
            },
            f = function(b, c) {
                ba(c).data("colorpicker").fields.eq(4).val(b.h).end().eq(5).val(b.s).end().eq(6).val(b.b).end()
            },
            g = function(b, c) {
                ba(c).data("colorpicker").fields.eq(0).val(N(b)).end()
            },
            h = function(b, c) {
                ba(c).data("colorpicker").selector.css("backgroundColor", "#" + N({
                    h: b.h,
                    s: 100,
                    b: 100
                })), a(c).data("colorpicker").selectorIndic.css({
                    left: parseInt(150 * b.s / 100, 10),
                    top: parseInt(150 * (100 - b.b) / 100, 10)
                })
            },
            i = function(b, c) {
                ba(c).data("colorpicker").hue.css("top", parseInt(150 - 150 * b.h / 360, 10))
            },
            j = function(b, c) {
                ba(c).data("colorpicker").currentColor.css("backgroundColor", "#" + N(b))
            },
            k = function(b, c) {
                ba(c).data("colorpicker").newColor.css("backgroundColor", "#" + N(b))
            },
            l = function(c) {
                var d = c.charCode || c.keyCode || -1;
                if (d > b && 90 >= d || 32 == d) return !1;
                var e = ba(this).parent().parent();
                e.data("colorpicker").livePreview === !0 && m.apply(this)
            },
            m = function(b) {
                var c, d = ba(this).parent().parent();
                d.data("colorpicker").color = c = this.parentNode.className.indexOf("_hex") > 0 ? J(H(this.value)) : this.parentNode.className.indexOf("_hsb") > 0 ? F({
                    h: parseInt(d.data("colorpicker").fields.eq(4).val(), 10),
                    s: parseInt(d.data("colorpicker").fields.eq(5).val(), 10),
                    b: parseInt(d.data("colorpicker").fields.eq(6).val(), 10)
                }) : K(G({
                    r: parseInt(d.data("colorpicker").fields.eq(1).val(), 10),
                    g: parseInt(d.data("colorpicker").fields.eq(2).val(), 10),
                    b: parseInt(d.data("colorpicker").fields.eq(3).val(), 10)
                })), b && (e(c, d.get(0)), g(c, d.get(0)), f(c, d.get(0))), h(c, d.get(0)), i(c, d.get(0)), k(c, d.get(0)), d.data("colorpicker").onChange.apply(d, [c, N(c), L(c)])
            },
            n = function() {
                var b = ba(this).parent().parent();
                b.data("colorpicker").fields.parent().removeClass("colorpicker_focus")
            },
            o = function() {
                b = this.parentNode.className.indexOf("_hex") > 0 ? 70 : 65, a(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus"), a(this).parent().addClass("colorpicker_focus")
            },
            p = function(b) {
                var c = ba(this).parent().find("input").focus(),
                    d = {
                        el: ba(this).parent().addClass("colorpicker_slider"),
                        max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
                        y: b.pageY,
                        field: c,
                        val: parseInt(c.val(), 10),
                        preview: ba(this).parent().parent().data("colorpicker").livePreview
                    };
                a(document).bind("mouseup", d, r), a(document).bind("mousemove", d, q)
            },
            q = function(ba) {
                return ba.data.field.val(Math.max(0, Math.min(ba.data.max, parseInt(ba.data.val + ba.pageY - ba.data.y, 10)))), ba.data.preview && m.apply(ba.data.field.get(0), [!0]), !1
            },
            r = function(b) {
                return m.apply(b.data.field.get(0), [!0]), b.data.el.removeClass("colorpicker_slider").find("input").focus(), ba(document).unbind("mouseup", r), ba(document).unbind("mousemove", q), !1
            },
            s = function() {
                var b = {
                    cal: ba(this).parent(),
                    y: ba(this).offset().top
                };
                b.preview = b.cal.data("colorpicker").livePreview, a(document).bind("mouseup", b, u), ba(document).bind("mousemove", b, t)
            },
            t = function(ba) {
                return m.apply(ba.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, ba.pageY - a.data.y))) / 150, 10)).get(0), [ba.data.preview]), !1
            },
            u = function(b) {
                return e(b.data.cal.data("colorpicker").color, b.data.cal.get(0)), g(b.data.cal.data("colorpicker").color, b.data.cal.get(0)), ba(document).unbind("mouseup", u), ba(document).unbind("mousemove", t), !1
            },
            v = function() {
                var b = {
                    cal: ba(this).parent(),
                    pos: ba(this).offset()
                };
                b.preview = b.cal.data("colorpicker").livePreview, ba(document).bind("mouseup", b, x), ba(document).bind("mousemove", b, w)
            },
            w = function(ba) {
                return m.apply(a.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, a.pageY - a.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, ba.pageX - ba.data.pos.left)) / 150, 10)).get(0), [ba.data.preview]), !1
            },
            x = function(b) {
                return e(b.data.cal.data("colorpicker").color, b.data.cal.get(0)), g(b.data.cal.data("colorpicker").color, b.data.cal.get(0)), ba(document).unbind("mouseup", x), ba(document).unbind("mousemove", w), !1
            },
            y = function() {
                ba(this).addClass("colorpicker_focus")
            },
            z = function() {
                ba(this).removeClass("colorpicker_focus")
            },
            A = function() {
                var b = ba(this).parent(),
                    c = b.data("colorpicker").color;
                b.data("colorpicker").origColor = c, j(c, b.get(0)), b.data("colorpicker").onSubmit(c, N(c), L(c), b.data("colorpicker").el)
            },
            B = function() {
                var b = ba("#" + a(this).data("colorpickerId"));
                b.data("colorpicker").onBeforeShow.apply(this, [b.get(0)]);
                var c = ba(this).offset(),
                    d = E(),
                    e = c.top + this.offsetHeight,
                    f = c.left;
                return e + 176 > d.t + d.h && (e -= this.offsetHeight + 176), f + 356 > d.l + d.w && (f -= 356), b.css({
                    left: f + "px",
                    top: e + "px"
                }), 0 != b.data("colorpicker").onShow.apply(this, [b.get(0)]) && b.show(), ba(document).bind("mousedown", {
                    cal: b
                }, C), !1
            },
            C = function(b) {
                D(b.data.cal.get(0), b.target, b.data.cal.get(0)) || (0 != b.data.cal.data("colorpicker").onHide.apply(this, [b.data.cal.get(0)]) && b.data.cal.hide(), ba(document).unbind("mousedown", C))
            },
            D = function(ba, b, c) {
                if (ba == b) return !0;
                if (ba.contains) return ba.contains(b);
                if (ba.compareDocumentPosition) return !!(16 & ba.compareDocumentPosition(b));
                for (var d = b.parentNode; d && d != c;) {
                    if (d == ba) return !0;
                    d = d.parentNode
                }
                return !1
            },
            E = function() {
                var ba = "CSS1Compat" == document.compatMode;
                return {
                    l: window.pageXOffset || (ba ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    t: window.pageYOffset || (ba ? document.documentElement.scrollTop : document.body.scrollTop),
                    w: window.innerWidth || (ba ? document.documentElement.clientWidth : document.body.clientWidth),
                    h: window.innerHeight || (ba ? document.documentElement.clientHeight : document.body.clientHeight)
                }
            },
            F = function(ba) {
                return {
                    h: Math.min(360, Math.max(0, ba.h)),
                    s: Math.min(100, Math.max(0, ba.s)),
                    b: Math.min(100, Math.max(0, ba.b))
                }
            },
            G = function(ba) {
                return {
                    r: Math.min(255, Math.max(0, ba.r)),
                    g: Math.min(255, Math.max(0, ba.g)),
                    b: Math.min(255, Math.max(0, ba.b))
                }
            },
            H = function(ba) {
                var b = 6 - ba.length;
                if (b > 0) {
                    for (var c = [], d = 0; b > d; d++) c.push("0");
                    c.push(ba), ba = c.join("")
                }
                return ba
            },
            I = function(ba) {
                var ba = parseInt(ba.indexOf("#") > -1 ? ba.substring(1) : ba, 16);
                return {
                    r: ba >> 16,
                    g: (65280 & ba) >> 8,
                    b: 255 & ba
                }
            },
            J = function(ba) {
                return K(I(ba))
            },
            K = function(ba) {
                var b = {
                        h: 0,
                        s: 0,
                        b: 0
                    },
                    c = Math.min(ba.r, ba.g, ba.b),
                    d = Math.max(ba.r, ba.g, ba.b),
                    e = d - c;
                return b.b = d, b.s = 0 != d ? 255 * e / d : 0, b.h = 0 != b.s ? ba.r == d ? (ba.g - ba.b) / e : ba.g == d ? 2 + (ba.b - ba.r) / e : 4 + (ba.r - ba.g) / e : -1, b.h *= 60, b.h < 0 && (b.h += 360), b.s *= 100 / 255, b.b *= 100 / 255, b
            },
            L = function(ba) {
                var b = {},
                    c = Math.round(ba.h),
                    d = Math.round(255 * ba.s / 100),
                    e = Math.round(255 * ba.b / 100);
                if (0 == d) b.r = b.g = b.b = e;
                else {
                    var f = e,
                        g = (255 - d) * e / 255,
                        h = (f - g) * (c % 60) / 60;
                    360 == c && (c = 0), 60 > c ? (b.r = f, b.b = g, b.g = g + h) : 120 > c ? (b.g = f, b.b = g, b.r = f - h) : 180 > c ? (b.g = f, b.r = g, b.b = g + h) : 240 > c ? (b.b = f, b.r = g, b.g = f - h) : 300 > c ? (b.b = f, b.g = g, b.r = g + h) : 360 > c ? (b.r = f, b.g = g, b.b = f - h) : (b.r = 0, b.g = 0, b.b = 0)
                }
                return {
                    r: Math.round(b.r),
                    g: Math.round(b.g),
                    b: Math.round(b.b)
                }
            },
            M = function(b) {
                var c = [b.r.toString(16), b.g.toString(16), b.b.toString(16)];
                return ba.each(c, function(ba, b) {
                    1 == b.length && (c[ba] = "0" + b)
                }), c.join("")
            },
            N = function(ba) {
                return M(L(ba))
            },
            O = function() {
                var b = ba(this).parent(),
                    c = b.data("colorpicker").origColor;
                b.data("colorpicker").color = c, e(c, b.get(0)), g(c, b.get(0)), f(c, b.get(0)), h(c, b.get(0)), i(c, b.get(0)), k(c, b.get(0))
            };
        return {
            init: function(b) {
                if (b = a.extend({}, d, b || {}), "string" == typeof b.color) b.color = J(b.color);
                else if (void 0 != b.color.r && void 0 != b.color.g && void 0 != b.color.b) b.color = K(b.color);
                else {
                    if (void 0 == b.color.h || void 0 == b.color.s || void 0 == b.color.b) return this;
                    b.color = F(b.color)
                }
                return this.each(function() {
                    if (!ba(this).data("colorpickerId")) {
                        var d = ba.extend({}, b);
                        d.origColor = b.color;
                        var q = "collorpicker_" + parseInt(1e3 * Math.random());
                        ba(this).data("colorpickerId", q);
                        var r = ba(c).attr("id", q);
                        d.flat ? r.appendTo(this).show() : r.appendTo(document.body), d.fields = r.find("input").bind("keyup", l).bind("change", m).bind("blur", n).bind("focus", o), r.find("span").bind("mousedown", p).end().find(">div.colorpicker_current_color").bind("click", O), d.selector = r.find("div.colorpicker_color").bind("mousedown", v), d.selectorIndic = d.selector.find("div div"), d.el = this, d.hue = r.find("div.colorpicker_hue div"), r.find("div.colorpicker_hue").bind("mousedown", s), d.newColor = r.find("div.colorpicker_new_color"), d.currentColor = r.find("div.colorpicker_current_color"), r.data("colorpicker", d), r.find("div.colorpicker_submit").bind("mouseenter", y).bind("mouseleave", z).bind("click", A), e(d.color, r.get(0)), f(d.color, r.get(0)), g(d.color, r.get(0)), i(d.color, r.get(0)), h(d.color, r.get(0)), j(d.color, r.get(0)), k(d.color, r.get(0)), d.flat ? r.css({
                            position: "relative",
                            display: "block"
                        }) : ba(this).bind(d.eventName, B)
                    }
                })
            },
            showPicker: function() {
                return this.each(function() {
                    ba(this).data("colorpickerId") && B.apply(this)
                })
            },
            hidePicker: function() {
                return this.each(function() {
                    ba(this).data("colorpickerId") && ba("#" + ba(this).data("colorpickerId")).hide()
                })
            },
            setColor: function(b) {
                if ("string" == typeof b) b = J(b);
                else if (void 0 != b.r && void 0 != b.g && void 0 != b.b) b = K(b);
                else {
                    if (void 0 == b.h || void 0 == b.s || void 0 == b.b) return this;
                    b = F(b)
                }
                return this.each(function() {
                    if (ba(this).data("colorpickerId")) {
                        var c = ba("#" + ba(this).data("colorpickerId"));
                        c.data("colorpicker").color = b, c.data("colorpicker").origColor = b, e(b, c.get(0)), f(b, c.get(0)), g(b, c.get(0)), i(b, c.get(0)), h(b, c.get(0)), j(b, c.get(0)), k(b, c.get(0))
                    }
                })
            }
        }
    }();
    ba.fn.extend({
        ColorPicker: b.init,
        ColorPickerHide: b.hidePicker,
        ColorPickerShow: b.showPicker,
        ColorPickerSetColor: b.setColor
    })
})(jQuery),

(function(ba, b, c) {
    ba(c).ready(function() {
        ba("#hotspot").hotspot({
            responsive: !0
        })
    })
})(jQuery),







(function(ba, b) {
    function c() {
        this.settings = {
            show_on: "mouseover",
            responsive: !1
        }
    }

    function d(ba, b) {
        this.id = v, this.type = "spot", this.x = ba, this.y = b, this.content = "", this.html = '<div class="hb-spot hb-spot-object" id="hb-spot-' + this.id + '"><div class="hb-tooltip-wrap"><div class="hb-tooltip"></div></div></div>', this.css = "", this.root = "", this.width = 30, this.height = 30, this.tooltipWidth = "auto", this.tintColor = "#e52929", this.settings = {
            visible: "visible",
            show_on: s.settings.show_on,
            popup_position: "left",
            content: "",
            tooltip_width: 200,
            tooltip_auto_width: !0
        }, v++
    }

    function e(ba, b) {
        this.id = v, this.type = "rect", this.x = ba, this.y = b, this.width = 0, this.height = 0, this.content = "", this.popupPosition = 0, this.html = '<div class="hb-rect-spot hb-spot-object" id="hb-spot-' + this.id + '"><div class="hb-tooltip-wrap"><div class="hb-tooltip"></div></div></div>', this.css = "", this.root = "", this.tintColor = "#e52929", this.success = !0, this.settings = {
            visible: "invisible",
            show_on: s.settings.show_on,
            popup_position: "left",
            content: "",
            tooltip_width: 200,
            tooltip_auto_width: !0
        }, v++
    }

    function f() {
        s = new c, t = ba("#hb-map-wrap"), H = t.offset().left, I = t.offset().top;
        var b = new Image;
        b.src = t.find("img").attr("src"), b.complete ? (J = t.width(), K = t.height()) : b.onload = function() {
            J = t.width(), K = t.height()
        }, T = '<div class="hb-scale-handle"></div>', U = '<div class="hb-move-handle"></div>', ba("body").prepend('<div id="hb-help-tooltip"></div>'), V = ba("#hb-help-tooltip"), ba("#input-tint-color").ColorPicker({
            onChange: function(b, c) {
                ba("#input-tint-color").val(c), ba("#input-tint-color").css({
                    background: "#" + c
                }), W.set_tint_color("#" + c)
            }
        })
    }

    function g() {
        ba("#result").on("click", r), t.on("mousedown", function(b) {
            return B = x, C = y, ba(b.target).hasClass("hb-scale-handle") ? (R = !0, w = u[a(b.target).closest(".hb-spot-object").attr("id").replace("hb-spot-", "")], !1) : ba(b.target).hasClass("hb-move-handle") ? (P = !0, w = u[ba(b.target).closest(".hb-spot-object").attr("id").replace("hb-spot-", "")], !1) : ba(b.target).hasClass("hb-spot") ? (P = !0, w = u[ba(b.target).attr("id").replace("hb-spot-", "")], !1) : 0 != ba(b.target).closest(".hb-spot-object").length || ba(b.target).hasClass("hb-spot-object") ? void 0 : (L = !0, !1)
        }), ba(document).on("mousemove", function(ba) {
            return x = ba.pageX, y = ba.pageY, z = x - B, A = y - C, O && j(), w !== b ? R ? (B = x, C = y, R = !1, S = !0, void w.start_scaling()) : S ? void w.scale() : P ? (B = x, C = y, P = !1, Q = !0, void w.start_moving()) : Q ? void w.move() : L && !M ? void(z > 5 && A > 5 && (M = !0, N = !0, w = new e(x - H, y - I), w.init())) : N ? void w.draw() : void j() : void 0
        }), ba(document).on("mouseup", function(b) {
            return Q || S || P || R ? (Q = !1, S = !1, P = !1, void(R = !1)) : (M ? (w.end_drawing(), w.success ? (u.push(w), h()) : w.release(), M = !1, N = !1) : "hb-map-wrap" != ba(b.target).attr("id") && 0 == ba(b.target).closest("#hb-map-wrap").length || !L || (w = new d(x - H, y - I), u[v - 1] = w, w.init(), h()), void(L = !1))
        })
    }

    function h() {
        ba(".hb-scale-handle, .hb-move-handle, .hb-spot, .hb-spot-object").off(".hb"), ba(".hb-scale-handle").on("mouseover.hb", function() {
            i("scale")
        }), ba(".hb-scale-handle").on("mouseout.hb", function() {
            k()
        }), ba(".hb-move-handle").on("mouseover.hb", function() {
            i("move")
        }), ba(".hb-move-handle").on("mouseout.hb", function() {
            k()
        }), ba(".hb-spot").on("mouseover.hb", function() {
            i("move")
        }), ba(".hb-spot").on("mouseout.hb", function() {
            k()
        }), ba(".hb-spot-object").on("mouseup.hb", function() {
            ba(this).toggleClass("visible-tooltip"), u[ba(this).attr("id").replace("hb-spot-", "")].select()
        })
    }

    function i(ba) {
        V.html(ba), V.show(), V.css({
            left: x + 15,
            top: y + 15
        }), O = !0
    }

    function j() {
        V.css({
            left: x + 15,
            top: y + 15
        })
    }

    function k() {
        V.hide(), O = !1
    }

    function l() {
        ba("#visible-select").val(W.settings.visible), ba("#show-select").val(s.settings.show_on), ba("#position-select").val(W.settings.popup_position), ba("#content").val(W.settings.content), ba("#input-tint-color").ColorPickerSetColor(W.tintColor), ba("#input-tint-color").css({
            background: W.tintColor
        }), W.settings.tooltip_auto_width ? (ba("#tooltip-auto-width").attr("checked", "checked"), ba("#tooltip-width").attr("disabled", !0).val(W.settings.tooltip_width)) : (ba("#tooltip-auto-width").removeAttr("checked"), ba("#tooltip-width").attr("disabled", !1).val(W.settings.tooltip_width))
    }

    function m() {
        ba("#visible-select").on("change", function() {
            W && (W.settings.visible = ba(this).val(), W.apply_settings())
        }), ba("#show-select").on("change", function() {
            s.set("show_on", ba(this).val()), s.apply()
        }), ba("#checkbox-responsive").on("change", function() {
            s.settings.responsive = ba(this).prop("checked")
        }), ba("#position-select").on("change", function() {
            W && (W.settings.popup_position = ba(this).val(), W.apply_settings())
        }), ba("#content").on("change", function() {
            W && (W.settings.content = ba(this).val(), W.apply_settings())
        }), ba("#delete").on("click", function() {
            W && W.del()
        }), ba("#tooltip-auto-width").on("change", function() {
            1 == ba(this).get(0).checked ? (ba("#tooltip-width").attr("disabled", !0), W.settings.tooltip_auto_width = !0) : (ba("#tooltip-width").attr("disabled", !1), W.settings.tooltip_auto_width = !1), W.settings.tooltip_width = parseInt(ba("#tooltip-width").val().replace("px", "")), W.apply_settings()
        }), ba("#tooltip-width").on("change", function() {
            W.settings.tooltip_width = parseInt(ba("#tooltip-width").val().replace("px", "")), W.apply_settings()
        })
    }

    function n() {
        ba("#hb-settings-wrap").find("input, textarea, select").attr("disabled", !0)
    }

    function o() {
        ba("input, textarea, select").not("#tooltip-width").attr("disabled", !1), ba("#tooltip-auto-width").attr("checked") && ba("#tooltip-width").attr("disabled", !0)
    }

    function p(ba) {
        var b, c = "",
            d = u.length;
        for (c += '<div id="hotspot-' + ba + '" class="hs-wrap hs-loading">\n', c += '<img src="' + t.find("img").attr("src") + '">\n', b = 0; d > b; b++)
            if (u[b]) {
                var e = u[b].x / J * 100,
                    f = u[b].y / K * 100,
                    g = u[b].width / J * 100,
                    h = u[b].height / K * 100,
                    i = u[b].type;
                "spot" == i && (g = u[b].width, h = u[b].height), c += '<div class="hs-spot-object" data-tint-color="' + u[b].tintColor + '" data-type="' + u[b].type + '" data-x="' + e + '" data-y="' + f + '" data-width="' + g + '" data-height="' + h + '" data-popup-position="' + u[b].settings.popup_position + '" data-visible="' + u[b].settings.visible + '" data-tooltip-width="' + u[b].settings.tooltip_width + '" data-tooltip-auto-width="' + u[b].settings.tooltip_auto_width + '">\n', c += u[b].settings.content + "\n", c += "</div>\n"
            }
        return c += "</div>\n"
    }

    function q(ba) {
        var b = "";
        return b += '$("#hotspot-' + ba + '").hotspot({ "show_on" : "' + s.settings.show_on + '", "responsive" : ' + s.settings.responsive + " });"
    }

    function r() {
        var b = Math.round(100 * Math.random()),
            c = p(b);
        ba("#hb-html-code").val(c), ba("#hb-javascript-code").val(q(b)), ba("#hb-live-preview").html(c), ba("#hb-live-preview").find(".hs-wrap").hotspot({
            show_on: s.settings.show_on,
            responsive: s.settings.responsive
        })
    }
    var s, t = 0,
        u = new Array,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = !1,
        M = !1,
        N = !1,
        O = !1,
        P = !1,
        Q = !1,
        R = !1,
        S = !1,
        T = "",
        U = "",
        V = "",
        W = b;
    c.prototype.apply = function() {
        for (var ba = u.length, b = 0; ba > b; b++) u[b].settings.show_on = this.settings.show_on, u[b].apply_settings()
    }, c.prototype.set = function(ba, b) {
        var c = u.length;
        this.settings[ba] = b;
        for (var d = 0; c > d; d++) u[d].settings[ba] = this.settings[ba]
    }, d.prototype.init = function() {
        t.append(this.html), this.root = ba("#hb-spot-" + this.id), this.root.css({
            left: this.x,
            top: this.y,
            width: this.width,
            height: this.height,
            "margin-left": -this.width / 2,
            "margin-top": -this.height / 2
        }), this.apply_settings()
    }, d.prototype.start_moving = function() {
        D = this.x, E = this.y
    }, d.prototype.move = function() {
        this.x = D + z + this.width / 2 > J ? J - this.width / 2 : D + z - this.width / 2 < 0 ? this.width / 2 : D + z, this.y = E + A + this.height / 2 > K ? K - this.height / 2 : E + A - this.height / 2 < 0 ? this.height / 2 : E + A, this.root.css({
            left: this.x,
            top: this.y
        })
    }, d.prototype.select = function() {
        o(), ba(".hb-spot-object.selected").removeClass("selected"), this.root.addClass("selected"), W = this, l()
    }, d.prototype.del = function() {
        this.deselect(), n(), this.root.remove(), u[this.id] = null
    }, d.prototype.deselect = function() {
        this.root.removeClass("selected"), W = b
    }, d.prototype.apply_settings = function() {
        this.root.removeClass("left").removeClass("top").removeClass("bottom").removeClass("right").removeClass("mouseover").removeClass("always").removeClass("click").removeClass("visible").removeClass("invisible"), this.root.addClass(this.settings.popup_position), this.root.addClass(this.settings.show_on), this.root.addClass(this.settings.visible), this.root.find(".hb-tooltip").html(this.settings.content), this.root.find(".hb-tooltip-wrap").css(this.settings.tooltip_auto_width ? {
            width: "auto"
        } : {
            width: this.settings.tooltip_width
        })
    }, d.prototype.set_tint_color = function(ba) {
        var b = this;
        b.tintColor = ba, b.root.css({
            background: ba
        })
    }, e.prototype.init = function() {
        t.append(this.html), this.root = ba("#hb-spot-" + this.id), this.root.css({
            left: this.x,
            top: this.y
        }), this.apply_settings()
    }, e.prototype.draw = function() {
        this.width = 16 > z ? 16 : z, this.height = 16 > A ? 16 : A, this.width = this.width + this.x > J ? J - this.x : this.width, this.height = this.height + this.y > K ? K - this.y : this.height, this.root.css({
            width: this.width,
            height: this.height
        })
    }, e.prototype.end_drawing = function() {
        this.root.append(T), this.root.append(U), this.width < 16 && this.height < 16 && (this.success = !1)
    }, e.prototype.release = function() {
        this.root.remove(), v--
    }, e.prototype.start_moving = function() {
        D = this.x, E = this.y
    }, e.prototype.move = function() {
        this.x = D + z + this.width > J ? J - this.width : 0 > D + z ? 0 : D + z, this.y = E + A + this.height > K ? K - this.height : 0 > E + A ? 0 : E + A, this.root.css({
            left: this.x,
            top: this.y
        })
    }, e.prototype.start_scaling = function() {
        F = this.width, G = this.height
    }, e.prototype.scale = function() {
        this.width = 16 > F + z ? 16 : F + z, this.height = 16 > G + A ? 16 : G + A, this.width = this.width + this.x > J ? J - this.x : this.width, this.height = this.height + this.y > K ? K - this.y : this.height, this.root.css({
            width: this.width,
            height: this.height
        })
    }, e.prototype.select = function() {
        o(), ba(".hb-spot-object.selected").removeClass("selected"), this.root.addClass("selected"), W = this, l()
    }, e.prototype.del = function() {
        this.deselect(), n(), this.root.remove(), u[this.id] = null
    }, e.prototype.deselect = function() {
        this.root.removeClass("selected"), W = b
    }, e.prototype.apply_settings = function() {
        this.root.removeClass("left").removeClass("top").removeClass("bottom").removeClass("right").removeClass("always").removeClass("mouseover").removeClass("click").removeClass("visible").removeClass("invisible"), this.root.addClass(this.settings.popup_position), this.root.addClass(this.settings.show_on), this.root.addClass(this.settings.visible), this.root.find(".hb-tooltip").html(this.settings.content), this.root.find(".hb-tooltip-wrap").css(this.settings.tooltip_auto_width ? {
            width: "auto"
        } : {
            width: this.settings.tooltip_width
        })
    }, e.prototype.set_tint_color = function(ba) {
        var b = this;
        b.tintColor = ba, b.root.css({
            "border-color": ba
        })
    }, ba(document).ready(function() {
        f(), g(), m(), n()
    })
})(jQuery),







(function(ba) {
    function b(ba, b) {
        this.options = b, this.root = ba
    }
    b.prototype.init = function() {
        if (!this.root.hasClass("hs-loaded")) {
            var b = "",
                c = "",
                d = "auto",
                e = "",
                f = "",
                g = this.root.find("img"),
                h = g.width();
            g.height(), b += '<img src="' + g.first().attr("src") + '" class="hsmap-image">', this.root.find(".hs-spot-object").each(function() {
                var g = a(this).data("x"),
                    h = a(this).data("y"),
                    i = a(this).data("width"),
                    j = a(this).data("height"),
                    gh = a(this).find("img"),
                    k = 0,
                    l = 0,
                    m = a(this).data("tint-color"),
                    n = "",
                    o = "";
                "rect" == a(this).data("type") ? (c = "hs-rect", i += "%", j += "%", n = "border-color: " + m) : (c = "hs-spot", k = -i / 2, l = -j / 2, i += "px", j += "px", o = "background: " + m), e = "visible" == a(this).data("visible") ? "visible" : "", d = 0 == a(this).data("tooltip-auto-width") ? a(this).data("tooltip-width") + "px" : "auto", f = a(this).data("popup-position"), b += '<div class="' + c + " " + e + " " + f + ' hs-spot-object" style="left: ' + g + "%; top: " + h + "%; width: " + i + "; height: " + j + "; margin-left: " + k + "px; margin-top: " + l + 'px;">', b += '<img src="' + gh.first().attr("src") + '" class="hsmap-image">	', b += '	<div class="hs-spot-tooltip-outer">', b += '		<div class="hs-tooltip-buffer"></div>', b += '		<div class="hs-tooltip-wrap" style="width: ' + d + ';">', b += '			<div class="hs-tooltip">', b += a(this).html(), b += "			</div>", b += "		</div>", b += "	</div>", b += "</div>"
            }), this.root.html(b), this.root.removeClass("hs-loading"), this.root.addClass(this.options.show_on), this.root.addClass(this.options.color_scheme), this.options.transparent_spots && this.root.addClass("transparent-spots"), this.options.responsive ? this.root.addClass("responsive") : 0 != h && this.root.css({
                width: h
            }), "click" == this.options.show_on && ba(".hs-spot-object").on("click", function() {
                ba(this).toggleClass("visible-tooltip")
            }), "mouseover" == this.options.show_on && (ba(".hs-spot-object").on("mouseover", function() {
                ba(this).addClass("visible-tooltip")
            }), ba(".hs-spot-object").on("mouseout", function() {
                ba(this).removeClass("visible-tooltip")
            })), this.root.addClass("hs-loaded")
        }
    }, ba.fn.hotspots = function(c) {
        var d = {
            show_on: "mouseover",
            transparent_spots: !0,
            color_scheme: "red"
        };
        return O = ba.extend(!0, d, c), this.each(function() {
            var c = new b(ba(this), O);
            c.init()
        })
    }
})(jQuery);