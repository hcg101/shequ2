var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        current: "tab1",
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "零钱明细",
            height: 2 * app.globalData.height + 20
        },
        pay_list: [],
        pay_index: 0,
        pay_info: {},
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
        }, {
            money: 1
        } ],
        money_index: 0,
        amount_list: [],
        page: 1,
        di_msg: !1,
        yes_mod: !1,
        withdraw: !1,
        withdraw_number: "",
        dh_confer_t: !1,
        dh_confer_j: !1,
        ji_money: "0.00",
        bei_money: "",
        ji_money_b: "0.00",
        bei_money_b: ""
    },
    onLoad: function(t) {
        app.authority(), this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            page: 1,
            design: app.globalData.design,
            copyright: app.globalData.copyright
        }), console.log(this.data.copyright), this.get_user_info(), this.get_user_amount();
    },
    onShow: function() {},
    dh_confer: function() {
        this.setData({
            dh_confer_t: !0
        });
    },
    get_num: function(t) {
        var e = t.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "", console.log(this.data.user_info.conch), 
            console.log(e), parseFloat(e) > parseFloat(this.data.user_info.conch) && (e = this.data.user_info.conch), 
            this.setData({
                ji_money: (10 * e).toFixed(2),
                bei_money: e
            });
        } else this.setData({
            ji_money: "0.00",
            bei_money: ""
        });
    },
    get_num_b: function(t) {
        var e = t.detail.value;
        if (console.log(e), "" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "", console.log(this.data.user_info.fraction), 
            console.log(e), parseFloat(e) > parseFloat(this.data.user_info.fraction) && (e = this.data.user_info.fraction);
            var n = (e / 10).toFixed(3), o = n.substr(0, n.length - 1);
            this.setData({
                ji_money_b: o,
                bei_money_b: e
            });
        } else this.setData({
            ji_money_b: "0.00",
            bei_money_b: ""
        });
    },
    add_bei_ji: function() {
        var e = this;
        if ("" == e.data.bei_money || e.data.bei_money <= 0) $Toast({
            content: "请填写正确兑换的数量"
        }); else {
            var t = app.api_root + "User/add_bei_ji", a = app.getCache("userinfo"), n = new Object();
            n.token = a.token, n.openid = a.openid, n.uid = a.uid, n.much_id = app.siteInfo.uniacid, 
            n.bei_money = e.data.bei_money, http.POST(t, {
                params: n,
                success: function(t) {
                    console.log(t), "success" == t.data.status ? (e.setData({
                        page: 1
                    }), $Toast({
                        content: t.data.msg
                    }), e.hideModal(), e.get_user_info(), e.get_user_amount()) : $Toast({
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
        }
    },
    set_this_money: function(t) {
        var e = t.detail.value, a = this.data.pay_money;
        a[6].money = e, this.setData({
            pay_money: a
        });
    },
    hideModal: function() {
        this.setData({
            dh_confer_j: !1,
            withdraw: !1,
            withdraw_card: !1,
            dh_confer_t: !1,
            ji_money: "0.00",
            bei_money: "",
            ji_money_b: "0.00",
            bei_money_b: ""
        });
    },
    yes_mod: function() {
        this.setData({
            dh_confer_j: !0
        });
    },
    get_ji_bei: function() {
        var e = this;
        if ("" == e.data.bei_money_b || e.data.bei_money_b <= 0) $Toast({
            content: "请填写正确兑换的数量"
        }); else {
            var t = app.api_root + "User/get_ji_bei", a = app.getCache("userinfo"), n = new Object();
            n.token = a.token, n.openid = a.openid, n.uid = a.uid, n.much_id = app.siteInfo.uniacid, 
            n.bei_money_b = e.data.ji_money_b, http.POST(t, {
                params: n,
                success: function(t) {
                    console.log(t), "success" == t.data.status ? (e.hideModal(), e.setData({
                        page: 1
                    }), $Toast({
                        content: t.data.msg
                    }), e.get_user_info(), e.get_user_amount()) : (e.setData({
                        yes_mod: !1
                    }), $Toast({
                        content: t.data.msg
                    }));
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
        }
    },
    handleChange: function(t) {
        var e = t.detail;
        this.setData({
            amount_list: [],
            page: 1
        }), this.setData({
            current: e.key
        }), this.get_user_amount();
    },
    get_pay: function() {
        var t = this, e = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        (t.animation = e).translateY(230).step(), t.setData({
            animationPay: e.export(),
            pay: !0
        }), setTimeout(function() {
            e.translateY(0).step(), t.setData({
                animationPay: e.export()
            });
        }, 100);
    },
    no_pay: function() {
        this.setData({
            pay: !1
        });
    },
    get_user_amount: function() {
        var t = app.api_root + "User/get_user_amount", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.uid = e.uid, n.much_id = app.siteInfo.uniacid, 
        n.page = this.data.page, n.evaluate = this.data.current;
        var o = a.data.amount_list;
        http.POST(t, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) o.push(t.data.info[e]);
                    a.setData({
                        amount_list: o,
                        setting: t.data.setting
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
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, http.POST(t, {
            params: n,
            success: function(t) {
                if ("success" == t.data.status) {
                    var e = (t.data.info.fraction / 10).toFixed(3);
                    a.setData({
                        user_info: t.data.info,
                        dd_fraction: e.substring(0, e.length - 1),
                        bei_ji: a.data.copyright.conch_convert - t.data.info.bei_ji < 0 ? 0 : a.data.copyright.conch_convert - t.data.info.bei_ji,
                        bei_ji_b: a.data.copyright.fraction_convert - t.data.info.ji_bei < 0 ? 0 : a.data.copyright.fraction_convert - t.data.info.ji_bei
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
    get_pay_money: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            money_index: e
        });
    },
    pay_submit: function() {
        var t = this.data.pay_money[this.data.money_index].money;
        if (console.log(t), t) {
            var i = this, e = app.getCache("userinfo"), a = new Object();
            a.token = e.token, a.openid = e.openid, a.uid = e.uid, a.much_id = app.siteInfo.uniacid, 
            a.money = t;
            var n = app.api_root + "Pay/do_pay";
            http.POST(n, {
                params: a,
                success: function(t) {
                    if (console.log(t), "OK" == t.data.return_msg) {
                        var e = (Date.parse(new Date()) / 1e3).toString(), a = "prepay_id=" + t.data.prepay_id, n = t.data.nonce_str, o = md5.hexMD5("appId=" + t.data.appid + "&nonceStr=" + n + "&package=" + a + "&signType=MD5&timeStamp=" + e + "&key=" + t.data.app_info.app_key).toUpperCase();
                        wx.requestPayment({
                            timeStamp: e,
                            nonceStr: n,
                            package: a,
                            signType: "MD5",
                            paySign: o,
                            success: function(t) {
                                $Toast({
                                    content: "充值成功！"
                                }), i.setData({
                                    page: 1,
                                    amount_list: []
                                }), i.get_user_info(), i.no_pay(), i.get_user_amount();
                            },
                            complete: function() {
                                i.setData({
                                    page: 1,
                                    amount_list: []
                                }), i.get_user_info(), i.no_pay(), i.get_user_amount();
                            }
                        });
                    } else $Toast({
                        content: "参数错误！"
                    }), i.get_pay();
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
        } else $Toast({
            content: "充值金额错误！"
        });
    },
    onPullDownRefresh: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.get_user_info(), this.get_user_amount(), $Toast.hide();
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_user_amount(), $Toast.hide();
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