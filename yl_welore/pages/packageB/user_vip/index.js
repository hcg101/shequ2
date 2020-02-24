var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "VIP会员",
            height: 2 * app.globalData.height + 20
        },
        pay_list: [],
        pay_index: 0,
        pay_info: {},
        visible_bei: !1,
        pay: !1,
        animationPay: {},
        pay_money: [ {
            money: 6
        }, {
            money: 30
        }, {
            money: 68
        }, {
            money: 168
        }, {
            money: 328
        }, {
            money: 648
        } ],
        money_index: 0
    },
    onLoad: function(t) {
        app.authority(), this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            design: app.globalData.design,
            copyright: app.globalData.copyright
        }), console.log(this.data.copyright);
    },
    onShow: function() {
        this.get_user_hon(), this.get_user_info();
    },
    get_pay: function() {
        var t = this, a = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        (t.animation = a).translateY(230).step(), t.setData({
            animationPay: a.export(),
            pay: !0
        }), setTimeout(function() {
            a.translateY(0).step(), t.setData({
                animationPay: a.export()
            });
        }, 100);
    },
    no_pay: function() {
        this.setData({
            pay: !1
        });
    },
    beiClose: function() {
        this.setData({
            visible_bei: !1
        });
    },
    beiOk: function() {
        this.setData({
            visible_bei: !1
        }), this.bei_pay();
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info
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
    get_user_hon: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid;
        var n = app.api_root + "User/get_user_honorary";
        http.POST(n, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    pay_list: t.data.info,
                    pay_info: t.data.info[0]
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
    get_pay_index: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            pay_index: a,
            pay_info: this.data.pay_list[a]
        });
    },
    get_pay_money: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            money_index: a
        });
    },
    pay_check: function() {
        this.setData({
            visible_bei: !0
        });
    },
    bei_pay: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.time = this.data.pay_info.time;
        var n = app.api_root + "Pay/index";
        http.POST(n, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_user_info(), a.get_user_hon()) : 1 == a.data.copyright.recharge_arbor ? ($Toast({
                    content: t.data.msg
                }), a.get_pay()) : $Toast({
                    content: "余额不足！"
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
    pay_submit: function() {
        var t = this.data.pay_money[this.data.money_index].money, o = this, a = app.getCache("userinfo"), e = new Object();
        e.token = a.token, e.openid = a.openid, e.uid = a.uid, e.much_id = app.siteInfo.uniacid, 
        e.money = t;
        var n = app.api_root + "Pay/do_pay";
        http.POST(n, {
            params: e,
            success: function(t) {
                if (console.log(t), "OK" == t.data.return_msg) {
                    var a = (Date.parse(new Date()) / 1e3).toString(), e = "prepay_id=" + t.data.prepay_id, n = t.data.nonce_str, i = md5.hexMD5("appId=" + t.data.appid + "&nonceStr=" + n + "&package=" + e + "&signType=MD5&timeStamp=" + a + "&key=" + t.data.app_info.app_key).toUpperCase();
                    wx.requestPayment({
                        timeStamp: a,
                        nonceStr: n,
                        package: e,
                        signType: "MD5",
                        paySign: i,
                        success: function(t) {
                            $Toast({
                                content: "充值成功！"
                            }), o.get_user_info(), o.no_pay();
                        },
                        complete: function() {
                            o.get_user_info(), o.no_pay();
                        }
                    });
                } else $Toast({
                    content: t.data.msg
                }), o.get_pay();
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