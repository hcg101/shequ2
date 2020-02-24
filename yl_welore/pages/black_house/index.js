var app = getApp(), http = require("../../util/http.js");

Page({
    data: {},
    onGotUserInfo: function(t) {
        app.getCache("userinfo") || app.getUserInfo(t.detail.userInfo, function(t) {
            1e3 != app && wx.navigateBack();
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu(), this.get_user_info();
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", e = this, n = app.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, http.POST(t, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info
                }) : $Toast({
                    content: t.data.msg
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
    }
});