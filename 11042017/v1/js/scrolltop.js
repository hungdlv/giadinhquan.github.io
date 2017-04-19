(function (b) {
    function h(c) {
        return "object" == typeof c ? c : {
            top: c,
            left: c
        }
    }
    var l = b.scrollTo = function (c, d, a) {
            b(window).scrollTo(c, d, a)
        };
    l.defaults = {
        axis: "xy",
        duration: 1.3 <= parseFloat(b.fn.jquery) ? 0 : 1
    };
    l.window = function () {
        return b(window)._scrollable()
    };
    b.fn._scrollable = function () {
        return this.map(function () {
            if (this.nodeName && -1 == b.inArray(this.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])) return this;
            var c = (this.contentWindow || this).document || this.ownerDocument || this;
            return b.browser.safari || "BackCompat" == c.compatMode ? c.body : c.documentElement
        })
    };
    b.fn.scrollTo = function (c, d, a) {
        "object" == typeof d && (a = d, d = 0);
        "function" == typeof a && (a = {
            onAfter: a
        });
        "max" == c && (c = 9E9);
        a = b.extend({}, l.defaults, a);
        d = d || a.speed || a.duration;
        a.queue = a.queue && 1 < a.axis.length;
        a.queue && (d /= 2);
        a.offset = h(a.offset);
        a.over = h(a.over);
        return this._scrollable().each(function () {
            function n(b) {
                i.animate(e, d, a.easing, b &&
                function () {
                    b.call(this, c, a)
                })
            }
            var j = this,
                i = b(j),
                g = c,
                m, e = {},
                p = i.is("html,body");
            switch (typeof g) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(g)) {
                    g = h(g);
                    break
                }
                g = b(g, this);
            case "object":
                if (g.is || g.style) m = (g = b(g)).offset()
            }
            b.each(a.axis.split(""), function (c, b) {
                var d = "x" == b ? "Left" : "Top",
                    k = d.toLowerCase(),
                    f = "scroll" + d,
                    h = j[f],
                    o = l.max(j, b);
                m ? (e[f] = m[k] + (p ? 0 : h - i.offset()[k]), a.margin && (e[f] -= parseInt(g.css("margin" + d)) || 0, e[f] -= parseInt(g.css("border" + d + "Width")) || 0), e[f] += a.offset[k] || 0, a.over[k] && (e[f] += g["x" == b ? "width" : "height"]() * a.over[k])) : (d = g[k], e[f] = d.slice && "%" == d.slice(-1) ? parseFloat(d) / 100 * o : d);
                /^\d+$/.test(e[f]) && (e[f] = 0 >= e[f] ? 0 : Math.min(e[f], o));
                !c && a.queue && (h != e[f] && n(a.onAfterFirst), delete e[f])
            });
            n(a.onAfter)
        }).end()
    };
    l.max = function (c, d) {
        var a = "x" == d ? "Width" : "Height",
            h = "scroll" + a;
        if (!b(c).is("html,body")) return c[h] - b(c)[a.toLowerCase()]();
        var a = "client" + a,
            j = c.ownerDocument.documentElement,
            i = c.ownerDocument.body;
        return Math.max(j[h], i[h]) - Math.min(j[a], i[a])
    }
})(jQuery);
$(document).ready(function () {
    $(function () {
        $("#to_top").click(function () {
            $("body,html").animate({
                scrollTop: 0
            }, "normal");
            $("#page").animate({
                scrollTop: 0
            }, "normal");
            return !1
        })
    })
});