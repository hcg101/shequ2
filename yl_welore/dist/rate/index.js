Component({
    externalClasses: [ "i-class" ],
    properties: {
        count: {
            type: Number,
            value: 5
        },
        value: {
            type: Number,
            value: 0
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        size: {
            type: Number,
            value: 20
        },
        name: {
            type: String,
            value: ""
        }
    },
    data: {
        touchesStart: {
            pageX: 0
        }
    },
    methods: {
        handleClick: function(e) {
            if (!this.data.disabled) {
                var t = e.currentTarget.dataset.index;
                this.triggerEvent("change", {
                    index: t + 1
                });
            }
        },
        handleTouchMove: function(e) {
            var t = this.data;
            if (!t.disabled && e.changedTouches[0]) {
                var a = e.changedTouches[0].pageX - t.touchesStart.pageX;
                if (!(a <= 0)) {
                    var i = Math.ceil(a / t.size);
                    i = i > t.count ? t.count : i, this.triggerEvent("change", {
                        index: i
                    });
                }
            }
        }
    },
    ready: function() {
        var t = this;
        wx.createSelectorQuery().in(this).select(".i-rate").boundingClientRect(function(e) {
            t.data.touchesStart.pageX = e.left || 0;
        }).exec();
    }
});