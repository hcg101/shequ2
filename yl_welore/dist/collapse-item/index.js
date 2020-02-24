Component({
    externalClasses: [ "i-class-content", "i-class-title", "i-class" ],
    relations: {
        "../collapse/index": {
            type: "parent",
            linked: function(t) {
                var e = {
                    accordion: t.data.accordion
                };
                t.data.name === this.data.name && (e.showContent = "i-collapse-item-show-content"), 
                this.setData(e);
            }
        }
    },
    properties: {
        title: String,
        name: String
    },
    data: {
        showContent: "",
        accordion: !1
    },
    options: {
        multipleSlots: !0
    },
    methods: {
        trigger: function(t) {
            var e = this.data;
            e.accordion ? this.triggerEvent("collapse", {
                name: e.name
            }, {
                composed: !0,
                bubbles: !0
            }) : this.setData({
                showContent: e.showContent ? "" : "i-collapse-item-show-content"
            });
        }
    }
});