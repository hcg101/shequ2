var app = getApp(), http = require("../../../util/http.js"), WxParse = require("../../../util/wxParse/wxParse.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "商品详情",
            height: 2 * app.globalData.height + 20
        },
        good_info: {}
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            id: t.id,
            design: app.globalData.design
        }), this.get_goods();
    },
    onShow: function() {},
    exchange: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
        e.id = this.data.id;
        var o = app.api_root + "User/exchange_goods";
        http.POST(o, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? wx.redirectTo({
                    url: "/yl_welore/pages/packageA/good_address/index?id=" + a.data.id
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
    get_goods: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
        a.id = this.data.id;
        var o = app.api_root + "User/get_goods";
        http.POST(o, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    var a = t.data.info.product_detail;
                    e.setData({
                        good_info: t.data.info
                    }), WxParse.wxParse("article", "html", a, e, 5);
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
            path: "/yl_welore/pages/packageA/good_info/index?id=" + this.data.id,
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
            path: "/yl_welore/pages/packageA/good_info/index?id=" + this.data.id,
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