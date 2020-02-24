var app = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(n) {
        console.log(n);
        var o = n.url + "?";
        for (var t in n) "url" != t && (o += t + "=" + n[t] + "&");
        console.log(o.substr(0, o.length - 1)), this.setData({
            url: o.substr(0, o.length - 1),
            height: app.globalData.height
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});