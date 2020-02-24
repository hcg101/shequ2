var http = require("/yl_welore/util/http.js");

App({
    globalData: {
        appid: "qtz",
        userInfo: null,
        share: !1,
        height: 0,
        isIpx: !1,
        copyright: {},
        forward: {},
        design: {},
        tabBar: {
            backgroundColor: "#ffffff",
            color: "#979795",
            selectedColor: "#1c1c1b",
            version: 1,
            list: [ {
                pagePath: "/yl_welore/pages/index/index",
                iconPath: "",
                selectedIconPath: "",
                text: "",
                isSpecial: !1
            }, {
                pagePath: "/yl_welore/pages/circle/index",
                iconPath: "",
                selectedIconPath: "",
                text: "",
                isSpecial: !1
            }, {
                pagePath: "",
                iconPath: "",
                isSpecial: !0,
                text: ""
            }, {
                pagePath: "/yl_welore/pages/shell_mall/index",
                iconPath: "",
                selectedIconPath: "",
                text: "",
                isSpecial: !1
            }, {
                pagePath: "/yl_welore/pages/user/index",
                iconPath: "",
                selectedIconPath: "",
                text: "",
                isSpecial: !1
            } ]
        }
    },
    version: "1.0.39",
    api_root: "",
    http_root: "",
    siteInfo: require("siteinfo.js"),
    onLaunch: function(t) {
        var e = this;
        wx.hideTabBar(), this.setApiRoot(), this.check_user_login(), this.get_book(), wx.getSystemInfo({
            success: function(t) {
                -1 < t.model.indexOf("iPhone X") && (e.globalData.isIpx = !0), e.globalData.height = t.statusBarHeight;
            }
        });
    },
    editTabbar: function() {
        var t = this.globalData.tabBar, e = getCurrentPages(), i = e[e.length - 1], o = i.route, a = wx.getStorageSync("is_diy").pattern_data;
        for (var n in t.version = wx.getStorageSync("is_diy").version, t.backgroundColor = a.style.backcolor, 
        t.color = a.style.font_color, t.selectedColor = a.style.font_color_active, t.list[0].iconPath = a.home.images.img, 
        t.list[0].selectedIconPath = a.home.images.img_active, t.list[0].text = a.home.title, 
        t.list[1].iconPath = a.plaza.images.img, t.list[1].selectedIconPath = a.plaza.images.img_active, 
        t.list[1].text = a.plaza.title, t.list[2].iconPath = a.release.images.img, t.list[2].selectedIconPath = a.release.images.img_active, 
        t.list[2].text = a.release.title, t.list[3].iconPath = a.goods.images.img, t.list[3].selectedIconPath = a.goods.images.img_active, 
        t.list[3].text = a.goods.title, t.list[4].iconPath = a.user.images.img, t.list[4].selectedIconPath = a.user.images.img_active, 
        t.list[4].text = a.user.title, 0 != o.indexOf("/") && (o = "/" + o), t.list) t.list[n].selected = !1, 
        t.list[n].pagePath == o && (t.list[n].selected = !0);
        i.setData({
            tabbar: t
        });
    },
    check_user_status: function() {
        var t = this.api_root + "User/get_user_status", e = this.getCache("userinfo");
        if (!e) return !1;
        var i = new Object();
        i.token = e.token, i.openid = e.openid, i.much_id = this.siteInfo.uniacid, i.uid = e.uid, 
        http.POST(t, {
            params: i,
            success: function(t) {
                0 == t.data && wx.navigateTo({
                    url: "/yl_welore/pages/black_house/index"
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
    get_forward: function() {
        var t = this.api_root + "User/get_forward", e = this, i = this.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = this.siteInfo.uniacid, http.POST(t, {
            params: o,
            success: function(t) {
                1 == t.data.whether_open ? e.globalData.forward = t.data : e.globalData.forward = "";
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
    authority: function() {
        var t = this.api_root + "User/get_authority", e = this, i = this.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = this.siteInfo.uniacid, http.POST(t, {
            params: o,
            success: function(t) {
                console.log(t), e.globalData.copyright = t.data;
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
    check_user_login: function() {
        this.getCache("userinfo") && (this.authority(), this.get_forward(), this.check_user_status(), 
        this.get_design());
    },
    get_design: function() {
        var t = this.api_root + "User/get_diy", e = this, i = e.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = this.siteInfo.uniacid, http.POST(t, {
            params: o,
            success: function(t) {
                console.log(t), e.globalData.design = t.data;
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
    get_book: function() {
        var t = this.api_root + "User/book", e = new Object();
        http.POST(t, {
            params: e,
            success: function(t) {
                "error" == t.data && wx.navigateTo({
                    url: "/yl_welore/pages/inspect/index"
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
    setApiRoot: function() {
        var t = this.siteInfo.siteroot.split("app/index.php");
        this.api_root = t[0] + "addons/yl_welore/web/index.php?s=/api/", this.http_root = t[0];
    },
    setCache: function(t, e, i) {
        var o = +new Date() / 1e3, a = !0, n = {
            expire: i ? o + parseInt(i) : 0,
            value: e
        };
        try {
            wx.setStorageSync(t + this.globalData.appid, n);
        } catch (t) {
            a = !1;
        }
        return a;
    },
    getCache: function(t, e) {
        var i = +new Date() / 1e3, o = "";
        i = parseInt(i);
        try {
            (o = wx.getStorageSync(t + this.globalData.appid)).expire > i || 0 == o.expire ? o = o.value : (o = "", 
            this.removeCache(t));
        } catch (t) {
            o = void 0 === e ? "" : e;
        }
        return o || "";
    },
    removeCache: function(t) {
        var e = !0;
        try {
            wx.removeStorageSync(t + this.globalData.appid);
        } catch (t) {
            e = !1;
        }
        return e;
    },
    getUserInfo: function(a, n) {
        var s = this, c = "", r = "", t = s.getCache("userinfo");
        t ? n && "function" == typeof n && n(t) : wx.login({
            success: function(t) {
                if (t.code) {
                    var i = s.api_root + "Login/index", o = new Object();
                    o.code = t.code, o.much_id = s.siteInfo.uniacid, http.POST(i, {
                        params: o,
                        success: function(t) {
                            if (console.log(t), 0 != t.data.code) return wx.showModal({
                                title: "授权提示",
                                content: "授权失败，请稍候重试！",
                                showCancel: !1,
                                confirmText: "确定",
                                confirmColor: "skyblue",
                                success: function(t) {
                                    t.cancel;
                                },
                                fail: function(t) {}
                            }), "function" == typeof n && n(1e3), !1;
                            if (t.data.info.errcode) return wx.showModal({
                                title: "提示",
                                content: "errcode:" + t.data.info.errcode + ";errmsg:" + t.data.info.errmsg,
                                showCancel: !1,
                                confirmText: "确定",
                                confirmColor: "skyblue",
                                success: function(t) {
                                    t.cancel;
                                },
                                fail: function(t) {}
                            }), !1;
                            c = t.data.info.openid, r = t.data.info.session_key;
                            var e = new Object();
                            e.wx_openid = c, e.userInfo = a, e.uniacid = s.siteInfo.uniacid, http.POST(s.api_root + "Login/do_login", {
                                params: e,
                                success: function(t) {
                                    console.log(t), a.openid = c, a.token = t.data.token, a.uid = t.data.id, a.sessionKey = r, 
                                    s.setCache("userinfo", a), s.check_user_login(), n && "function" == typeof n && n(s.getCache("userinfo"));
                                },
                                fail: function() {}
                            });
                        },
                        fail: function() {}
                    });
                } else e.alert("获取用户登录态失败2");
            },
            fail: function() {
                "function" == typeof n && n(1e3), this.alert("获取用户信息失败");
            }
        });
    },
    alert: function(e, i) {
        "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            success: function(t) {
                t.confirm && "function" == typeof i && i();
            }
        });
    }
});