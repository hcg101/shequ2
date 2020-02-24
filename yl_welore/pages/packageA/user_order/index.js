var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "我的订单",
            height: 2 * app.globalData.height + 20
        },
        current: "tab1",
        my_list: [],
        refund_mod: !1,
        refund_del: !1,
        ok_mod: !1,
        page: 1
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height
        }), this.up_user_smail();
    },
    onShow: function() {},
    refund_mod: function(t) {
        this.setData({
            refund_mod: !0,
            id: t.currentTarget.dataset.id
        });
    },
    ok_mod: function(t) {
        this.setData({
            ok_mod: !0,
            id: t.currentTarget.dataset.id
        });
    },
    hideModal: function() {
        this.setData({
            refund_mod: !1,
            refund_del: !1,
            ok_mod: !1
        });
    },
    refund_del: function(t) {
        this.setData({
            refund_del: !0,
            id: t.currentTarget.dataset.id
        });
    },
    bindTextAreaBlur: function(t) {
        this.setData({
            refund_text: t.detail.value
        });
    },
    ok_mod_do: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
        e.id = this.data.id;
        var n = app.api_root + "User/ok_mod_do";
        http.POST(n, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.setData({
                    my_list: [],
                    page: 1
                }), a.hideModal(), a.up_user_smail()) : $Toast({
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
    refund_del_do: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
        e.id = this.data.id;
        var n = app.api_root + "User/refund_del_do";
        http.POST(n, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.setData({
                    my_list: [],
                    page: 1
                }), a.hideModal(), a.up_user_smail()) : $Toast({
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
    refund_do: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
        e.refund_text = this.data.refund_text, e.id = this.data.id;
        var n = app.api_root + "User/order_refund";
        http.POST(n, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.setData({
                    my_list: [],
                    page: 1
                }), a.hideModal(), a.up_user_smail()) : $Toast({
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
    handleChange: function(t) {
        var a = t.detail;
        this.setData({
            my_list: [],
            page: 1,
            current: a.key
        }), this.up_user_smail();
    },
    up_user_smail: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
        a.order_type = this.data.current, a.page = this.data.page;
        var n = app.api_root + "User/get_order_list", s = e.data.my_list;
        http.POST(n, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var a = 0; a < t.data.info.length; a++) s.push(t.data.info[a]);
                    e.setData({
                        my_list: s
                    });
                } else $Toast({
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
        }), this.up_user_smail(), $Toast.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), a = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (a.setData({
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