var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "关于我们",
            height: 2 * app.globalData.height + 20
        },
        version: app.version,
        page: 1
    },
    onLoad: function(a) {
        app.authority(), this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            copyright: app.globalData.copyright
        });
    },
    call_phone: function(a) {
        var t = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onShow: function() {},
    _navback: function() {
        wx.navigateBack();
    },
    onShareAppMessage: function() {
        var a = app.globalData.forward;
        return console.log(a), a ? {
            title: a.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: a.reis_img,
            success: function(a) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(a) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(a) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(a) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});