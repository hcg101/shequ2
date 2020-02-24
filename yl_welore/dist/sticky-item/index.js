Component({
    externalClasses: [ "i-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../sticky/index": {
            type: "parent"
        }
    },
    data: {
        top: 0,
        height: 0,
        isFixed: !1,
        index: -1
    },
    methods: {
        updateScrollTopChange: function(t) {
            var e = this.data, i = e.top, a = e.height;
            this.setData({
                isFixed: i <= t && t < i + a
            });
        },
        updateDataChange: function(e) {
            var i = this;
            wx.createSelectorQuery().in(this).select(".i-sticky-item").boundingClientRect(function(t) {
                t && i.setData({
                    top: t.top,
                    height: t.height,
                    index: e
                });
            }).exec();
        }
    }
});