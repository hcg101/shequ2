Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../radio/index": {
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
        }
    },
    methods: {
        changeCurrent: function() {
            var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.current, e = this.getRelationNodes("../radio/index");
            0 < e.length && e.forEach(function(e) {
                e.changeCurrent(n === e.data.value);
            });
        },
        emitEvent: function(e) {
            this.triggerEvent("change", e);
        }
    }
});