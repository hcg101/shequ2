var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, default_data = {
    visible: !1,
    content: "",
    duration: 2,
    type: "default"
}, timmer = null;

Component({
    externalClasses: [ "i-class" ],
    data: _extends({}, default_data),
    methods: {
        handleShow: function(t) {
            var e = this, a = t.type, i = void 0 === a ? "default" : a, n = t.duration, d = void 0 === n ? 2 : n;
            this.setData(_extends({}, t, {
                type: i,
                duration: d,
                visible: !0
            }));
            var r = 1e3 * this.data.duration;
            timmer && clearTimeout(timmer), 0 !== r && (timmer = setTimeout(function() {
                e.handleHide(), timmer = null;
            }, r));
        },
        handleHide: function() {
            this.setData(_extends({}, default_data));
        }
    }
});