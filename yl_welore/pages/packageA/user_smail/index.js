var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "站内信",
            height: 2 * app.globalData.height + 20
        },
        my_list: [],
        del_mod: !1,
        bj_mod: !1
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height
        }), this.get_my_rec();
    },
    onShow: function() {},
    del_user_smail: function(t) {
        this.setData({
            del_id: t.currentTarget.dataset.id,
            del_mod: !0
        });
    },
    get_all_mod: function() {
        this.setData({
            bj_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            bj_mod: !1
        });
    },
    get_all: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid;
        var n = app.api_root + "User/up_user_smail_all";
        http.POST(n, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), e.hideModal(), e.get_my_rec()) : $Toast({
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
    up_user_smail: function(t) {
        var e = this, a = app.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, n.much_id = app.siteInfo.uniacid, n.id = t.currentTarget.dataset.id;
        var s = app.api_root + "User/up_user_smail";
        http.POST(s, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.get_my_rec() : $Toast({
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
    del_do: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.id = this.data.del_id;
        var n = app.api_root + "User/del_user_smail";
        http.POST(n, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (e.setData({
                    del_mod: !1
                }), $Toast({
                    content: t.data.msg
                }), e.get_my_rec()) : $Toast({
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
    get_my_rec: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid;
        var n = app.api_root + "User/get_user_smail";
        http.POST(n, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    my_list: t.data.info
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
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_rec(), $Toast.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
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