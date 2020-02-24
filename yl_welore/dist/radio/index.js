var prefixCls = "i-radio";

Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../radio-group/index": {
            type: "parent"
        }
    },
    properties: {
        value: {
            type: String,
            value: ""
        },
        checked: {
            type: Boolean,
            value: !1
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "#2d8cf0"
        },
        position: {
            type: String,
            value: "left",
            observer: "setPosition"
        }
    },
    data: {
        checked: !0,
        positionCls: prefixCls + "-radio-left"
    },
    attached: function() {
        this.setPosition();
    },
    methods: {
        changeCurrent: function(e) {
            this.setData({
                checked: e
            });
        },
        radioChange: function() {
            if (!this.data.disabled) {
                var e = {
                    current: !this.data.checked,
                    value: this.data.value
                }, t = this.getRelationNodes("../radio-group/index")[0];
                t ? t.emitEvent(e) : this.triggerEvent("change", e);
            }
        },
        setPosition: function() {
            this.setData({
                positionCls: -1 !== this.data.position.indexOf("left") ? prefixCls + "-radio-left" : prefixCls + "-radio-right"
            });
        }
    }
});