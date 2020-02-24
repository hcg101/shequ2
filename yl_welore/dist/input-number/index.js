function addNum(t, e) {
    var a, n = void 0, i = void 0;
    try {
        n = t.toString().split(".")[1].length;
    } catch (t) {
        n = 0;
    }
    try {
        i = e.toString().split(".")[1].length;
    } catch (t) {
        i = 0;
    }
    return a = Math.pow(10, Math.max(n, i)), (Math.round(t * a) + Math.round(e * a)) / a;
}

Component({
    externalClasses: [ "i-class" ],
    properties: {
        size: String,
        value: {
            type: Number,
            value: 1
        },
        min: {
            type: Number,
            value: -1 / 0
        },
        max: {
            type: Number,
            value: 1 / 0
        },
        step: {
            type: Number,
            value: 1
        }
    },
    methods: {
        handleChangeStep: function(t, e) {
            var a = t.currentTarget.dataset, n = (void 0 === a ? {} : a).disabled, i = this.data.step, u = this.data.value;
            return n ? null : ("minus" === e ? u = addNum(u, -i) : "plus" === e && (u = addNum(u, i)), 
            u < this.data.min || u > this.data.max ? null : void this.handleEmit(u, e));
        },
        handleMinus: function(t) {
            this.handleChangeStep(t, "minus");
        },
        handlePlus: function(t) {
            this.handleChangeStep(t, "plus");
        },
        handleBlur: function(t) {
            var e = this, a = t.detail.value, n = this.data, i = n.min, u = n.max;
            a ? (u < (a = +a) ? a = u : a < i && (a = i), this.handleEmit(a)) : setTimeout(function() {
                e.handleEmit(a);
            }, 16);
        },
        handleEmit: function(t, e) {
            var a = {
                value: t
            };
            e && (a.type = e), this.triggerEvent("change", a);
        }
    }
});