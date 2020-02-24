var app = getApp(), http = require("../../../util/http.js"), WxParse = require("../../../util/wxParse/wxParse.js");

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "提现须知",
            height: 2 * app.globalData.height + 20
        },
        page: 1
    },
    onLoad: function(a) {
        app.authority(), this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx
        });
    },
    onShow: function() {
        var a = app.api_root + "User/get_raws_setting", e = this, t = app.getCache("userinfo"), i = new Object();
        i.token = t.token, i.openid = t.openid, i.much_id = app.siteInfo.uniacid, http.POST(a, {
            params: i,
            success: function(a) {
                console.log(a);
                var t = a.data.notice;
                WxParse.wxParse("article", "html", t, e, 5);
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(a) {}
                });
            }
        });
    },
    _navback: function() {
        wx.navigateBack();
    }
});