Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../grid-item/index": {
            type: "child",
            linked: function() {
                this.setGridItemWidth();
            },
            linkChanged: function() {
                this.setGridItemWidth();
            },
            unlinked: function() {
                this.setGridItemWidth();
            }
        }
    },
    methods: {
        setGridItemWidth: function() {
            var t = this.getRelationNodes("../grid-item/index"), i = 100 / t.length;
            t.forEach(function(t) {
                t.setData({
                    width: i + "%"
                });
            });
        }
    },
    ready: function() {
        this.setGridItemWidth();
    }
});