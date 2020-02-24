Component({
    externalClasses: [ "i-class", "i-class-alone" ],
    properties: {
        count: {
            type: Number,
            value: 0,
            observer: "finalCount"
        },
        overflowCount: {
            type: Number,
            value: 99
        },
        dot: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        finalCount: 0
    },
    methods: {
        finalCount: function() {
            this.setData({
                finalCount: parseInt(this.data.count) >= parseInt(this.data.overflowCount) ? this.data.overflowCount + "+" : this.data.count
            });
        }
    }
});