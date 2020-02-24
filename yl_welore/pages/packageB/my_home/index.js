function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        show: !0,
        sex: 1,
        user_info: {},
        current: "tab1",
        index_page: 1,
        pay_index: 1,
        data_list: [],
        new_list: [],
        page: 1,
        pay_di: !1,
        my_di: !1,
        del_mod: !1,
        liwu: !1,
        animationDataLi: {},
        li_number: 1,
        li_list: [],
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: "",
        purchase_paper_mod: !1,
        money: 0,
        money_id: 0,
        money_index: 0,
        one: 0,
        admin: 0
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            id: t.id,
            design: app.globalData.design
        }), this.get_user_info(), this.get_liwu_all(), this.get_my_list();
    },
    onShow: function() {
        var t = app.getCache("userinfo");
        this.setData({
            uid: t.uid
        }), this.get_user_info();
    },
    purchase_paper: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.money, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.one;
        this.setData({
            money: a,
            money_id: e,
            purchase_paper_mod: !0,
            money_index: i,
            one: n
        });
    },
    do_paper_money: function() {
        var t = app.api_root + "User/do_paper_money", i = this, e = app.getCache("userinfo"), a = new Object();
        a.token = e.token, a.openid = e.openid, a.much_id = app.siteInfo.uniacid, a.money_id = this.data.money_id, 
        a.money = this.data.money, http.POST(t, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    var e;
                    $Toast({
                        content: t.data.msg
                    });
                    var a = "new_list[" + i.data.one + "].list[" + i.data.money_index + "].purchase";
                    i.setData((_defineProperty(e = {}, a, "1"), _defineProperty(e, "purchase_paper_mod", !1), 
                    e)), console.log(a);
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
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key,
            pl_wey: t.currentTarget.dataset.wey
        });
    },
    home_pl_cai: function(t) {
        this.setData({
            home_pl_text: t.detail.value
        });
    },
    do_user_pl: function() {
        if ("" != this.data.home_pl_text) {
            wx.showLoading({
                title: "评论中...",
                mask: !0
            });
            var a = this, t = app.getCache("userinfo"), e = new Object();
            e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
            e.text = this.data.home_pl_text, e.id = this.data.pl_id, e.reply_type = 0;
            var i = app.api_root + "User/add_paper_reply";
            http.POST(i, {
                params: e,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), a.hideModal();
                        var e = a.data.new_list;
                        console.log(e), e[a.data.pl_wey].list[a.data.pl_key].study_repount = parseInt(e[a.data.pl_wey].list[a.data.pl_key].study_repount) + 1, 
                        a.setData({
                            new_list: e
                        }), wx.hideLoading();
                    } else $Toast({
                        content: t.data.msg
                    }), wx.hideLoading();
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
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
    get_liwu_all: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid;
        var i = app.api_root + "User/get_liwu";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    li_list: t.data.info,
                    user_liwu: t.data.user_info
                }) : e.setData({
                    li_if: !0,
                    li_msg: t.data.msg
                }), setTimeout(function() {
                    e.setData({
                        li_if: !1
                    });
                }, 3e3);
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
    get_liwu: function() {
        this.setData({
            liwu: !0
        });
    },
    liwu_index: function(t) {
        var e = t.currentTarget.dataset.k, a = (t.currentTarget.dataset.id, this.data.li_list[e]);
        this.setData({
            li_index: e,
            li_number: 1,
            li_sum: a.tr_conch
        });
    },
    colse_li: function() {
        this.setData({
            liwu: !1
        });
    },
    reward: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.num = this.data.li_number, a.uid = t.uid, 
        a.user_id = this.data.id, a.much_id = app.siteInfo.uniacid, a.li_id = this.data.li_list[this.data.li_index].id;
        var i = app.api_root + "User/user_reward";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), e.get_user_info(), e.get_liwu_all()) : $Toast({
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
    handleChange1: function(t) {
        var e = t.detail.value, a = this.data.li_list[this.data.li_index];
        this.setData({
            li_number: e,
            li_sum: (a.tr_conch * e).toFixed(2)
        });
    },
    handleChange: function(t) {
        var e = t.detail;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.setData({
            data_list: [],
            new_list: [],
            page: 1,
            index_page: 1,
            pay_di: !1,
            my_di: !1
        }), "tab1" == e.key && this.get_my_list(), "tab2" == e.key && this.get_my_pay(), 
        this.setData({
            current: e.key
        }), wx.hideLoading();
    },
    cancel: function() {
        var t = app.api_root + "User/get_user_cancel", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, i.uid = this.data.id, 
        i.this_uid = a.uid, i.is_user = this.data.user_info.is_user, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), e.get_user_info()) : $Toast({
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
    guard: function() {
        wx.navigateTo({
            url: "/yl_welore/pages/packageB/user_guard/index?id=" + this.data.id
        });
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info_my", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.uid = this.data.id, i.much_id = app.siteInfo.uniacid, 
        i.this_uid = a.uid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info,
                    admin: t.data.info.admin,
                    sex: t.data.info.gender
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
    get_my_pay: function() {
        var t = app.api_root + "User/get_my_list_sh", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.id = this.data.id, i.type = this.data.current, i.index_page = this.data.index_page, 
        i.version = app.version;
        var n = this.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        my_di: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        new_list: n
                    }), $Toast.hide();
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
    get_my_list: function() {
        var t = app.api_root + "User/get_my_list", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.id = this.data.id, i.type = this.data.current, i.index_page = this.data.index_page, 
        i.version = app.version;
        var n = this.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        my_di: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        new_list: n
                    }), $Toast.hide();
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
    del_mod: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            paper_id: e,
            del_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            home_pl_check: !1,
            purchase_paper_mod: !1
        });
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (this.setData({
            index_page: this.data.index_page + 1
        }), this.get_my_list()), "tab2" == this.data.current && (this.setData({
            page: this.data.page + 1
        }), this.get_my_pay()), $Toast.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return this.setData({
            show: !1
        }), t ? {
            title: t.title,
            path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
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
            path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
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