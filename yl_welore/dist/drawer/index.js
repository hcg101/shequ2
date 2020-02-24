Component({
    externalClasses: [ "i-class" ],
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        mask: {
            type: Boolean,
            value: !0
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        mode: {
            type: String,
            value: "left"
        }
    },
    data: {},
    methods: {
        handleMaskClick: function() {
            this.data.maskClosable && this.triggerEvent("close", {});
        }
    }
});