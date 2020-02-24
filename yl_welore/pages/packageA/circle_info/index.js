function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        uid: 0,
        user_info: {},
        check_phone: !1,
        visible: !1,
        actions_name: "按发帖时间",
        actions: [ {
            name: "按发帖时间",
            type: "fatie"
        }, {
            name: "按最后回帖时间",
            type: "huifu"
        } ],
        show: !0,
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        getInfo: [],
        tory_list: [],
        huifu: !1,
        animationData: {},
        current: "tab1",
        set_guanzhu: "tab1",
        isPopping: !1,
        animPlus: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        page: 1,
        top_list: [],
        load: !1,
        guanzhu: !1,
        get_gz_text: "",
        get_gz_input: "",
        version: 0,
        purchase_paper_mod: !1,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: "",
        top_list_style: {
            height: 60,
            bottom: 10
        },
        admin: 0
    },
    onLoad: function(t) {
        var a;
        (this.setData({
            height: app.globalData.height,
            design: app.globalData.design,
            id: t.id,
            page: 1
        }), this.get_tory_info(), this.get_user_info(), this.get_placement_top(), 0 != this.data.show) && (this.setData({
            page: 1,
            tory_list: []
        }), (a = app.getCache("order_actions_o")) ? this.setData({
            actions_name: a.name
        }) : ((a = new Object()).type = "fatie", a.name = "按发帖时间", app.setCache("order_actions_o", a)), 
        this.add_trailing_list());
    },
    purchase_paper: function(t) {
        var a = t.currentTarget.dataset.type, e = t.currentTarget.dataset.id;
        if (console.log(this.data.this_da_qq), console.log(this.data.this_xiao_qq), 1 != this.data.this_da_qq && 1 != this.data.this_xiao_qq) {
            var i = t.currentTarget.dataset.money, n = t.currentTarget.dataset.index;
            this.setData({
                money: i,
                money_id: e,
                purchase_paper_mod: !0,
                money_index: n
            });
        } else wx.navigateTo({
            url: "/yl_welore/pages/packageA/article/index?id=" + e + "&type=" + a
        });
    },
    do_paper_money: function() {
        var t = app.api_root + "User/do_paper_money", i = this, a = app.getCache("userinfo"), e = new Object();
        e.token = a.token, e.openid = a.openid, e.much_id = app.siteInfo.uniacid, e.money_id = this.data.money_id, 
        e.money = this.data.money, http.POST(t, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    var a;
                    $Toast({
                        content: t.data.msg
                    });
                    var e = "tory_list[" + i.data.money_index + "].purchase";
                    i.setData((_defineProperty(a = {}, e, "1"), _defineProperty(a, "purchase_paper_mod", !1), 
                    a));
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
    getPhoneNumber: function(t) {
        if ("getPhoneNumber:ok" == t.detail.errMsg) {
            var a = app.api_root + "User/get_user_phone", e = this, i = app.getCache("userinfo"), n = new Object();
            n.token = i.token, n.openid = i.openid, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
            n.encryptedData = t.detail.encryptedData, n.iv = t.detail.iv, n.sessionKey = i.sessionKey, 
            console.log(n), http.POST(a, {
                params: n,
                success: function(t) {
                    $Toast({
                        content: t.data.msg
                    }), e.setData({
                        check_phone: !1
                    }), e.get_user_info();
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
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, http.POST(t, {
            params: i,
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
    handleCancel: function(t) {
        t.currentTarget.dataset.user_id, this.data.actions1, this.data.info;
        this.setData({
            visible: !0
        });
    },
    handleCancel1: function() {
        this.setData({
            visible: !1
        });
    },
    handleClickItem1: function(t) {
        var a = t.detail.index, e = this.data.actions[a];
        console.log(e), this.setData({
            visible: !1,
            order_time: e.type,
            actions_name: e.name
        });
        var i = new Object();
        i.type = e.type, i.name = e.name, app.setCache("order_actions_o", i);
        var n = app.getCache("order_actions_o");
        console.log(n), this.add_trailing_list();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key
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
            var e = this, t = app.getCache("userinfo"), a = new Object();
            a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
            a.text = this.data.home_pl_text, a.id = this.data.pl_id, a.reply_type = 0;
            var i = app.api_root + "User/add_paper_reply";
            http.POST(i, {
                params: a,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), e.hideModal();
                        var a = e.data.tory_list;
                        a[e.data.pl_key].study_repount = parseInt(a[e.data.pl_key].study_repount) + 1, e.setData({
                            tory_list: a
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
    handleChange: function(t) {
        var a = t.detail;
        this.setData({
            current: a.key
        });
    },
    handleChange_gz: function(t) {
        var a = t.detail;
        this.setData({
            set_guanzhu: a.key
        });
    },
    onShow: function() {
        var t = app.getCache("userinfo");
        this.setData({
            isPopping: !1,
            copyright: app.globalData.copyright,
            uid: t.uid
        }), this.check_login(), this.takeback(), this.get_diy(), this.get_user_info(), this.get_qq_info();
    },
    get_qq_info: function() {
        var t = app.api_root + "User/get_qq_info", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.much_id = app.siteInfo.uniacid, i.id = this.data.id, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    this_da_qq: t.data.info.this_da_qq,
                    this_xiao_qq: t.data.info.this_xiao_qq
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
    nav_add: function(t) {
        this.setData({
            copyright: app.globalData.copyright
        });
        var a = t.currentTarget.dataset.k, e = this.data.diy;
        if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone || 0 != this.data.version) {
            if ("tuwen" == a && wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            }), "tuya" == a) if (1 == e.user_vip.graffiti_member) {
                if (1 != e.vip) return void $Toast({
                    content: "VIP专属"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            });
            if ("yuyin" == a) if (1 == e.user_vip.voice_member) {
                if (1 != e.vip) return void $Toast({
                    content: "VIP专属"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            });
            if ("shipin" == a) if (1 == e.user_vip.video_member) {
                if (1 != e.vip) return void $Toast({
                    content: "VIP专属"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            });
        } else this.setData({
            check_phone: !0
        });
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", a = this, e = app.getCache("userinfo"), i = new Object();
        i.uid = e.uid, i.token = e.token, i.openid = e.openid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, http.POST(t, {
            params: i,
            success: function(t) {
                "账户未授权!" == t.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=2&id=" + a.data.id
                }), a.setData({
                    version: t.data.version,
                    diy: t.data,
                    add: t.data.pattern_data.release.list,
                    admin: t.data.admin
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
    get_placement_top: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.tory_id = this.data.id;
        var i = app.api_root + "User/get_placement_top";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    top_list: t.data.info,
                    top_list_style: t.data.style
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
    add_trailing_list: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        e.data.getInfo;
        a.token = t.token, a.openid = t.openid, a.uid = t.uid, a.much_id = app.siteInfo.uniacid, 
        a.tory_id = this.data.id, a.index_page = this.data.page, a.version = app.version;
        var i = app.getCache("order_actions_o");
        a.order_time = i ? i.type : this.data.order_time;
        var n = app.api_root + "User/get_index_list", o = e.data.tory_list;
        http.POST(n, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && e.setData({
                        load: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) o.push(t.data.info[a]);
                    e.setData({
                        tory_list: o,
                        version: t.data.version
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
    set_trailing: function() {
        this.setData({
            guanzhu: !0
        });
    },
    hideModal: function() {
        this.setData({
            guanzhu: !1,
            check_phone: !1,
            home_pl_check: !1,
            purchase_paper_mod: !1
        });
    },
    get_gz_text: function(t) {
        this.setData({
            get_gz_text: t.detail.value
        });
    },
    get_gz_input: function(t) {
        this.setData({
            get_gz_input: t.detail.value
        });
    },
    add_trailing: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object(), i = a.data.getInfo;
        if (e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.tory_id = this.data.id, e.is_trailing = 1 == i.is_trailing ? 1 : 0, e.trailing_type = "tab1" == this.data.set_guanzhu ? 0 : 1, 
        e.trailing_text = "tab1" == this.data.set_guanzhu ? this.data.get_gz_text : this.data.get_gz_input, 
        1 != a.data.guanzhu || e.trailing_text) {
            var n = app.api_root + "User/set_user_trailing";
            http.POST(n, {
                params: e,
                success: function(t) {
                    a.hideModal(), "success" == t.data.status && (i.is_trailing = 1 != i.is_trailing, 
                    a.setData({
                        getInfo: i
                    })), $Toast({
                        content: t.data.msg
                    }), a.setData({
                        get_gz_text: "",
                        get_gz_input: ""
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
        } else $Toast({
            content: "内容不能为空"
        });
    },
    get_tory_info: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.id = this.data.id, e.uid = t.uid, e.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_tory_info";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    getInfo: t.data.info,
                    title: t.data.info.realm_name
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
    plus: function() {
        var t = this;
        console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
            isPopping: !0
        })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
            isPopping: !1
        }));
    },
    popp: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(225).step(), a.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        e.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        i.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == this.data.version && o.translate(180, -105).rotateZ(360).opacity(1).height("65px").width("65px").step(), 
        n.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect: a.export(),
            animTranspond: e.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(0).step(), a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: a.export(),
            animTranspond: e.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    play: function(t) {
        for (var a = this, e = this.data.tory_list, i = 0; i < e.length; i++) e[i].is_voice = !1;
        this.setData({
            tory_list: e
        });
        var n = t.currentTarget.dataset.key;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), e[n].is_voice = !0, 
        this.setData({
            tory_list: e,
            tory_list_index: n
        }), innerAudioContext.onEnded(function(t) {
            e[n].is_voice = !1, a.setData({
                tory_list: e
            });
        });
    },
    add_top_zan: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.key, i = this, n = app.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.id = a, o.uid = n.uid, o.much_id = app.siteInfo.uniacid, 
        o.zan_type = 1 == this.data.top_list[e].is_info_zan ? 1 : 0;
        var s = i.data.top_list;
        wx.vibrateShort(), 0 == s[e].is_info_zan ? s[e].is_info_zan = !0 : s[e].is_info_zan = !1, 
        i.setData({
            top_list: s
        }), i.rotate3d_top(e), o.applaud_type = 0;
        var r = app.api_root + "User/add_user_zan";
        http.POST(r, {
            params: o,
            success: function(t) {
                var a = i.data.top_list;
                "success" == t.data.status ? (a[e].info_zan_count = t.data.info_zan_count, i.setData({
                    top_list: a
                })) : $Toast({
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
    add_zan: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.key, i = this, n = app.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.id = a, o.uid = n.uid, o.much_id = app.siteInfo.uniacid, 
        o.zan_type = 1 == this.data.tory_list[e].is_info_zan ? 1 : 0;
        var s = i.data.tory_list;
        wx.vibrateShort(), 0 == s[e].is_info_zan ? s[e].is_info_zan = !0 : s[e].is_info_zan = !1, 
        i.setData({
            tory_list: s
        }), i.rotate3d(e), o.applaud_type = 0;
        var r = app.api_root + "User/add_user_zan";
        http.POST(r, {
            params: o,
            success: function(t) {
                var a = i.data.tory_list;
                "success" == t.data.status ? (a[e].info_zan_count = t.data.info_zan_count, i.setData({
                    tory_list: a
                })) : $Toast({
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
    stop: function(t) {
        innerAudioContext.stop();
        var a = t.currentTarget.dataset.key, e = this.data.tory_list;
        e[a].is_voice = !1, this.setData({
            tory_list: e
        });
    },
    previewImage: function(t) {
        var a = t.target.dataset.src, e = t.target.dataset.id;
        wx.previewImage({
            current: a,
            urls: this.data.tory_list[e].image_part
        });
    },
    onPullDownRefresh: function() {
        setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.setData({
            page: 1,
            tory_list: []
        }), this.add_trailing_list();
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.add_trailing_list(), $Toast.hide();
    },
    rotate3d_top: function(a) {
        var e = this, t = e.data.top_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (e.animation_zan = i).rotate3d(0, 1, 0, 180).step(), t[a].animationData_zan = i.export(), 
        e.setData({
            top_list: t
        }), setTimeout(function() {
            var t = e.data.top_list;
            i.rotate3d(0, 1, 0, 0).step(), t[a].animationData_zan = i.export(), e.setData({
                top_list: t
            });
        }, 100);
    },
    rotate3d: function(a) {
        var e = this, t = e.data.tory_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (e.animation_zan = i).rotate3d(0, 1, 0, 180).step(), t[a].animationData_zan = i.export(), 
        e.setData({
            tory_list: t
        }), setTimeout(function() {
            var t = e.data.tory_list;
            i.rotate3d(0, 1, 0, 0).step(), t[a].animationData_zan = i.export(), e.setData({
                tory_list: t
            });
        }, 100);
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/packageA/circle_info/index?id=" + this.data.id,
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
            path: "/yl_welore/pages/packageA/circle_info/index?id=" + this.data.id,
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
    },
    check_login: function() {
        var i = "";
        wx.checkSession({
            success: function() {},
            fail: function() {
                wx.login({
                    success: function(t) {
                        if (t.code) {
                            var a = app.api_root + "Login/index", e = new Object();
                            e.code = t.code, e.much_id = app.siteInfo.uniacid, http.POST(a, {
                                params: e,
                                success: function(t) {
                                    if (console.log(t), 0 == t.data.code) {
                                        if (t.data.info.errcode) return $Toast({
                                            content: "获取用户信息失败"
                                        }), !1;
                                        t.data.info.openid, i = t.data.info.session_key;
                                        var a = app.getCache("userinfo");
                                        a.sessionKey = i, app.setCache("userinfo", a);
                                    }
                                }
                            });
                        } else $Toast({
                            content: "获取用户信息失败"
                        });
                    }
                });
            }
        });
    },
    _navback: function() {
        var t = getCurrentPages();
        t[t.length - 1], t[t.length - 2];
        1 != t.length ? wx.navigateBack() : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});