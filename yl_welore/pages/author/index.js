var app = getApp(), http = require("../../util/http.js");

Page({
    data: {
        copyright: {},
        type: 0
    },
    onGotUserInfo: function(e) {
        app.removeCache("userinfo");
        var t = this;
        app.getCache("userinfo") || app.getUserInfo(e.detail.userInfo, function(e) {
            1e3 != app && (0 == t.data.type && wx.reLaunch({
                url: "/yl_welore/pages/index/index"
            }), 1 == t.data.type && wx.reLaunch({
                url: "/yl_welore/pages/packageA/article/index?id=" + t.data.id + "&info_type=" + t.data.info_type
            }), 2 == t.data.type && wx.reLaunch({
                url: "/yl_welore/pages/packageA/circle_info/index?id=" + t.data.id
            }));
        });
    },
    onLoad: function(e) {
        this.setData({
            type: e.type,
            info_type: e.info_type,
            id: e.id
        }), wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu(), this.authority();
    },
    authority: function() {
        var e = app.api_root + "Login/get_authority", t = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, http.POST(e, {
            params: i,
            success: function(e) {
                console.log(e), t.setData({
                    copyright: e.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    closeAuth:function(){
        // 直接返回首页
       wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        })
    }
});