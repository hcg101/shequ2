Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../tab/index": {
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
        scroll: {
            type: Boolean,
            value: !1
        },
        fixed: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        changeCurrent: function() {
            var n = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.current, e = this.getRelationNodes("../tab/index");
            0 < e.length && e.forEach(function(e) {
                e.changeScroll(n.data.scroll), e.changeCurrent(e.data.key === t), e.changeCurrentColor(n.data.color);
            });
        },
        emitEvent: function(e) {
            this.triggerEvent("change", {
                key: e
            });
        }
    }
});