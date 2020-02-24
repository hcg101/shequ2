var app = getApp(), http = require("../../../util/http.js"), WxParse = require("../../../util/wxParse/wxParse.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "收货地址",
            height: 2 * app.globalData.height + 20
        },
        user_info: {},
        is_submit: !1
    },
    onLoad: function(e) {
        app.authority(), this.setData({
            height: app.globalData.height,
            id: e.id,
            copyright: app.globalData.copyright
        }), this.get_user_info();
    },
    onShow: function() {},
    formSubmit: function(e) {
        var t = this;
        t.setData({
            is_submit: !0
        });
        var a = app.api_root + "User/exchange_goods_do", s = app.getCache("userinfo"), n = new Object();
        n.token = s.token, n.openid = s.openid, n.uid = s.uid, n.much_id = app.siteInfo.uniacid, 
        n.id = this.data.id, n.real_name = e.detail.value.real_name, n.phone = e.detail.value.phone, 
        n.address = e.detail.value.address, n.remark = e.detail.value.remarks, http.POST(a, {
            params: n,
            success: function(e) {
                console.log(e), "success" == e.data.status ? ($Toast({
                    content: e.data.msg
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/yl_welore/pages/packageA/user_order/index"
                    });
                }, 1500)) : ($Toast({
                    content: e.data.msg
                }), t.setData({
                    is_submit: !1
                }));
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
    get_user_info: function() {
        var e = app.api_root + "User/get_user_info", t = this, a = app.getCache("userinfo"), s = new Object();
        s.token = a.token, s.openid = a.openid, http.POST(e, {
            params: s,
            success: function(e) {
                console.log(e), "success" == e.data.status ? t.setData({
                    user_info: e.data.info
                }) : $Toast({
                    content: e.data.msg
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
    _navback: function() {
        var e = getCurrentPages(), t = (e[e.length - 1], e[e.length - 2]);
        1 != e.length ? (t.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var e = app.globalData.forward;
        return console.log(e), e ? {
            title: e.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: e.reis_img,
            success: function(e) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(e) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(e) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(e) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});