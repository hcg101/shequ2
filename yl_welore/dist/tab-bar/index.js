var app = getApp(), http = require("../../util/http.js");

Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../tab-bar-item/index": {
            type: "child",
            linked: function() {
                this.changeCurrent();
            },
            linkChanged: function() {
                this.changeCurrent();
            },
            unlinked: function() {
                this.changeCurrent();
            }
        }
    },
    properties: {
        current: {
            type: String,
            value: "",
            observer: "changeCurrent"
        },
        color: {
            type: String,
            value: ""
        },
        fixed: {
            type: Boolean,
            value: !1
        },
        background: {
            type: String,
            value: ""
        },
        height: {
            type: String,
            value: ""
        }
    },
    data: {
        list: []
    },
    methods: {
        changeCurrent: function() {
            var e = this, n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.current, t = this.getRelationNodes("../tab-bar-item/index");
            if (0 < t.length) {
                var a = [];
                t.forEach(function(t) {
                    t.changeCurrent(t.data.key === n), t.changeCurrentColor(e.data.color), a.push({
                        key: t.data.key
                    });
                }), this.setData({
                    list: a
                });
            }
        },
        emitEvent: function(t) {
            this.triggerEvent("change", {
                key: t
            });
        },
        handleClickItem: function(t) {
            var e = t.currentTarget.dataset.key;
            this.emitEvent(e);
        }
    }
});