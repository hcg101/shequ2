var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "订单详情",
            height: 2 * app.globalData.height + 20
        },
        order_info: {}
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            id: t.id,
            design: app.globalData.design
        }), this.get_my_order();
    },
    onShow: function() {},
    get_my_order: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
        e.id = this.data.id;
        var i = app.api_root + "User/get_my_order";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    order_info: t.data.info
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
    copyBtn: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.no,
            success: function(t) {}
        });
    },
    _navback: function() {
        var t = getCurrentPages(), a = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (a.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});