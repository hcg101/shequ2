Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../tab-bar/index": {
            type: "parent"
        }
    },
    properties: {
        icon: {
            type: String,
            value: ""
        },
        currentIcon: {
            type: String,
            value: ""
        },
        img: {
            type: String,
            value: ""
        },
        currentImg: {
            type: String,
            value: ""
        },
        key: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        dot: {
            type: Boolean,
            value: !1
        },
        count: {
            type: Number,
            value: 0
        },
        color: {
            type: String,
            value: ""
        },
        yes_color: {
            type: String,
            value: ""
        }
    },
    data: {
        current: !1,
        currentColor: ""
    },
    methods: {
        changeCurrent: function(t) {
            this.setData({
                current: t
            });
        },
        changeCurrentColor: function(t) {
            this.setData({
                currentColor: t
            });
        },
        handleClickItem: function() {
            this.getRelationNodes("../tab-bar/index")[0].emitEvent(this.data.key);
        }
    }
});