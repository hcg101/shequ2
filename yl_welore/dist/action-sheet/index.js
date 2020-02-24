Component({
    externalClasses: [ "i-class", "i-class-mask", "i-class-header" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        showCancel: {
            type: Boolean,
            value: !1
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        actions: {
            type: Array,
            value: []
        },
        is_home: {
            type: String,
            value: ""
        }
    },
    methods: {
        handleClickMask: function() {
            this.data.maskClosable && this.handleClickCancel();
        },
        handleClickItem: function(e) {
            var a = e.currentTarget, l = ((void 0 === a ? {} : a).dataset || {}).index;
            this.triggerEvent("click", {
                index: l
            });
        },
        handleClickCancel: function() {
            this.triggerEvent("cancel");
        }
    }
});