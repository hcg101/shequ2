Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../collapse-item/index": {
            type: "child"
        }
    },
    properties: {
        name: String,
        accordion: Boolean
    },
    methods: {
        clickfn: function(e) {
            var t = e.detail;
            this.getRelationNodes("../collapse-item/index").forEach(function(e) {
                t.name === e.data.name ? e.setData({
                    showContent: "i-collapse-item-show-content"
                }) : e.setData({
                    showContent: ""
                });
            });
        }
    }
});