Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "i-class" ],
    properties: {
        title: {
            type: String
        },
        type: {
            type: String,
            value: "text"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        placeholder: {
            type: String,
            value: ""
        },
        autofocus: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: "normal"
        },
        right: {
            type: Boolean,
            value: !1
        },
        error: {
            type: Boolean,
            value: !1
        },
        maxlength: {
            type: Number
        }
    },
    methods: {
        handleInputChange: function(e) {
            var t = e.detail, a = (void 0 === t ? {} : t).value, n = void 0 === a ? "" : a;
            this.setData({
                value: n
            }), this.triggerEvent("change", e);
        },
        handleInputFocus: function(e) {
            this.triggerEvent("focus", e);
        },
        handleInputBlur: function(e) {
            this.triggerEvent("blur", e);
        }
    }
});