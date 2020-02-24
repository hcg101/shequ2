var app = getApp(), http = require("../../../util/http.js");

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "发帖须知",
            height: 2 * app.globalData.height + 20
        }
    },
    onLoad: function(t) {
        app.authority(), this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx
        });
    },
    onShow: function() {
        var t = app.api_root + "User/get_post_notice", a = this, i = app.getCache("userinfo"), e = new Object();
        e.token = i.token, e.openid = i.openid, e.much_id = app.siteInfo.uniacid, http.POST(t, {
            params: e,
            success: function(t) {
                a.setData({
                    info: t.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    _navback: function() {
        wx.navigateBack();
    }
});