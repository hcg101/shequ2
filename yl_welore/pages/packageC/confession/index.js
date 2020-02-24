var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "禁言申诉",
            height: 2 * app.globalData.height + 20
        },
        page: 1,
        sc_text: "",
        sc_msg: !1
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx
        });
    },
    onShow: function() {
        this.get_user_banned();
    },
    get_user_banned: function() {
        var t = app.api_root + "User/get_user_banned", a = this, e = app.getCache("userinfo"), s = new Object();
        s.token = e.token, s.openid = e.openid, s.much_id = app.siteInfo.uniacid, s.uid = e.uid, 
        http.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    info: t.data.info
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
    },
    user_mutter: function(t) {
        this.setData({
            sc_msg: !0,
            id: t.currentTarget.dataset.id
        });
    },
    is_sc_text: function(t) {
        this.setData({
            sc_text: t.detail.value
        });
    },
    hideModal: function() {
        this.setData({
            sc_msg: !1
        });
    },
    do_user_mutter: function() {
        var t = app.api_root + "User/do_user_mutter", a = this, e = app.getCache("userinfo"), s = new Object();
        s.token = e.token, s.openid = e.openid, s.much_id = app.siteInfo.uniacid, s.uid = e.uid, 
        s.id = this.data.info[this.data.id].id, s.tory_id = this.data.info[this.data.id].tory_id, 
        s.beget = this.data.sc_text, http.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a.setData({
                    sc_msg: !1
                }), $Toast({
                    content: t.data.msg
                }), a.get_user_banned()) : $Toast({
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
    },
    _navback: function() {
        wx.navigateBack();
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});