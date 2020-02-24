Component({
    properties: {
        target: Number,
        showDay: Boolean,
        callback: String,
        format: Array,
        clearTimer: Boolean
    },
    externalClasses: [ "countdown-class" ],
    data: {
        time: "",
        resultFormat: [],
        changeFormat: !1
    },
    ready: function() {
        this.getFormat();
    },
    methods: {
        getFormat: function() {
            var t = this.data, a = t.format.length;
            if (t.showDay || t.resultFormat.push(""), 3 <= a) {
                for (var e = 0; e < a && !(4 <= t.resultFormat.length); e++) t.format[e] && t.resultFormat.push(t.format[e].toString());
                4 <= t.resultFormat.length && (t.changeFormat = !0);
            }
            this.getLastTime();
        },
        init: function() {
            var t = this;
            setTimeout(function() {
                t.getLastTime.call(t);
            }, 1e3);
        },
        getLastTime: function() {
            var t = this.data, a = Math.ceil((t.target - new Date().getTime()) / 1e3), e = "", r = "00:00:00", o = "00", s = t.resultFormat;
            if (0 < a) {
                o = this.formatNum(parseInt(a / 86400));
                var i = a % 86400, n = this.formatNum(parseInt(i / 3600));
                i %= 3600;
                var m = this.formatNum(parseInt(i / 60)), h = this.formatNum(i % 60);
                r = t.changeFormat ? "" + n + s[1] + m + s[2] + h + s[3] : n + ":" + m + ":" + h, 
                t.clearTimer || this.init.call(this);
            } else this.endfn();
            e = t.showDay ? t.changeFormat ? "" + o + s[0] + " " + r : o + "d " + r : r, this.setData({
                time: e
            });
        },
        formatNum: function(t) {
            return 9 < t ? t : "0" + t;
        },
        endfn: function() {
            this.triggerEvent("callback", {});
        }
    }
});