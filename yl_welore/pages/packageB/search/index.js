var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "搜一搜",
            height: 2 * app.globalData.height + 20
        },
        new_list: [],
        page: 1,
        di_msg: !1,
        get_search: "",
        show: !0,
        clean: !1,
        set_list: !1,
        territory: []
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            design: app.globalData.design
        });
    },
    onShow: function() {
        if (0 != this.data.show) {
            var t = app.getCache("search");
            this.setData({
                page: 1,
                new_list: []
            }), t ? (this.setData({
                is_search: !0
            }), this.get_arr_dx(t)) : this.setData({
                is_search: !1
            });
        }
    },
    get_search: function(t) {
        var a = t.detail.value;
        this.setData({
            get_search: a
        });
    },
    col_search: function() {
        this.setData({
            get_search: "",
            set_list: !1
        });
    },
    lishi_search: function(t) {
        this.setData({
            get_search: t.currentTarget.dataset.search
        }), this.setData({
            page: 1,
            new_list: []
        }), this.get_index_list();
    },
    removeStorage: function() {
        this.setData({
            clean: !0
        });
    },
    Close_no: function() {
        this.setData({
            clean: !1
        });
    },
    Close_ok: function() {
        this.setData({
            clean: !1,
            get_lishi: [],
            is_search: !1
        }), app.removeCache("search");
    },
    submit_search: function() {
        var t = this;
        "" != t.data.get_search ? (t.setData({
            page: 1,
            new_list: []
        }), t.get_index_list()) : $Toast({
            content: "搜索内容呢？"
        });
    },
    get_arr_dx: function(t) {
        var a = this, e = app.getCache("userinfo"), s = new Object();
        s.token = e.token, s.openid = e.openid, s.arr = t;
        var i = app.api_root + "User/set_arr_dx";
        http.POST(i, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status && a.setData({
                    get_lishi: t.data.info
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
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.key, s = this, i = app.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.id = a, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
        n.zan_type = 1 == this.data.new_list[e].is_info_zan ? 1 : 0;
        var o = app.api_root + "User/add_user_zan";
        http.POST(o, {
            params: n,
            success: function(t) {
                var a = s.data.new_list;
                "success" == t.data.status ? (a[e].is_info_zan = t.data.info_zan, a[e].info_zan_count = t.data.info_zan_count, 
                s.setData({
                    new_list: a
                }), s.rotate3d(e)) : $Toast({
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
    get_index_list: function() {
        var t = app.api_root + "User/get_search_list", s = this, a = app.getCache("userinfo"), e = new Object();
        e.token = a.token, e.openid = a.openid, e.page = this.data.page, e.search = this.data.get_search, 
        e.much_id = app.siteInfo.uniacid;
        var i = s.data.new_list;
        http.POST(t, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && s.setData({
                        di_msg: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) i.push(t.data.info[a]);
                    s.setData({
                        new_list: i,
                        set_list: !0,
                        territory: t.data.territory,
                        is_search_yes: t.data.is_search_yes
                    });
                    var e = app.getCache("search");
                    if (e) {
                        for (a = 0; a < e.length; a++) if (e[a].search == s.data.get_search) return void console.log("相同");
                        e.push({
                            search: s.data.get_search
                        }), app.setCache("search", e);
                    } else app.setCache("search", [ {
                        search: s.data.get_search
                    } ]);
                    $Toast.hide();
                }
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
    previewImage: function(t) {
        this.setData({
            show: !1
        });
        var a = t.target.dataset.src, e = t.target.dataset.id;
        wx.previewImage({
            current: a,
            urls: this.data.new_list[e].image_part
        });
    },
    play: function(t) {
        for (var a = this, e = this.data.new_list, s = 0; s < e.length; s++) e[s].is_voice = !1;
        this.setData({
            new_list: e
        });
        var i = t.currentTarget.dataset.key;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), e[i].is_voice = !0, 
        this.setData({
            new_list: e,
            new_list_index: i
        }), innerAudioContext.onEnded(function(t) {
            e[i].is_voice = !1, a.setData({
                new_list: e
            });
        });
    },
    stop: function(t) {
        innerAudioContext.stop();
        var a = t.currentTarget.dataset.key, e = this.data.new_list;
        e[a].is_voice = !1, this.setData({
            new_list: e
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
        }), this.get_index_list(), $Toast.hide();
    },
    rotate3d: function(a) {
        var e = this, t = e.data.new_list, s = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (e.animation_zan = s).rotate3d(0, 1, 0, 180).step(), t[a].animationData_zan = s.export(), 
        e.setData({
            new_list: t
        }), setTimeout(function() {
            var t = e.data.new_list;
            s.rotate3d(0, 1, 0, 0).step(), t[a].animationData_zan = s.export(), e.setData({
                new_list: t
            });
        }, 100);
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