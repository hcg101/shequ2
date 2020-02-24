var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "提现",
            height: 2 * app.globalData.height + 20
        },
        setting: {},
        withdraw: !1,
        withdraw_money: "",
        withdraw_number: ""
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            page: 1
        });
    },
    onShow: function() {
        this.get_raws_setting();
    },
    get_raws_setting: function() {
        var t = app.api_root + "User/get_raws_setting", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        http.POST(t, {
            params: i,
            success: function(t) {
                a.setData({
                    setting: t.data
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
    get_withdraw_card: function(t) {
        this.setData({
            withdraw_number: t.detail.value
        });
    },
    get_money: function(t) {
        var a = t.detail.value.replace(".", "");
        this.setData({
            withdraw_money: a
        });
    },
    withdraw: function() {
        this.setData({
            withdraw: !0
        });
    },
    hideModal: function() {
        this.setData({
            withdraw: !1
        });
    },
    withdraw_do: function() {
        if (this.hideModal(), 1 == this.data.setting.open_offline_payment && "" == this.data.withdraw_number) return $Toast({
            content: "支付宝账号不能为空"
        }), !1;
        if ("" == this.data.withdraw_money || this.data.withdraw_money <= 0) return $Toast({
            content: "提现金额不正确"
        }), !1;
        var t = app.api_root + "User/withdraw", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.withdraw_number = this.data.withdraw_number, i.withdraw_money = this.data.withdraw_money, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), a.hideModal(), t.data.status, $Toast({
                    content: t.data.msg
                }), a.setData({
                    withdraw_money: "",
                    withdraw_number: ""
                }), a.get_raws_setting();
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