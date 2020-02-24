var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        user_info: {},
        current: "男",
        anhao: "tab1",
        img: "",
        nick_name: "",
        autograph: "",
        shenqing: !1,
        animationSqData: {},
        shenqing_text: "",
        da_mod: !1,
        get_tc_text: "",
        anhao_mode: !1
    },
    onLoad: function(t) {
        var a = app.getCache("userinfo");
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            id: t.id,
            uid: a.uid,
            design: app.globalData.design
        });
    },
    onShow: function() {
        this.get_qq_info();
    },
    set_anhao: function() {
        this.setData({
            anhao_mode: !0
        });
    },
    get_ah_text: function(t) {
        this.setData({
            this_atcipher: t.detail.value
        });
    },
    set_get_new_ah: function() {},
    update_ah: function() {
        if (this.data.info.atcipher == this.data.this_atcipher) return this.hideModal(), 
        void $Toast({
            content: "没有做任何更改!"
        });
        var t = app.api_root + "User/update_atcipher", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.id = this.data.id, 
        n.this_atcipher = this.data.this_atcipher, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), a.hideModal(), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_qq_info()) : $Toast({
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
    open_atence: function() {
        var t = app.api_root + "User/open_atence", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.id = this.data.id, 
        n.atcipher_type = this.data.info.atence, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_qq_info()) : $Toast({
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
    get_ah_random: function() {
        var t = app.api_root + "User/get_ah_random", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), a.setData({
                    this_atcipher: t.data
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
    ts_admin: function(t) {
        this.setData({
            user_id: t.currentTarget.dataset.id,
            user_type: t.currentTarget.dataset.type,
            user_qq: t.currentTarget.dataset.qq,
            tousu: !0
        });
    },
    tc_submit: function() {
        var t = app.api_root + "User/add_tc_submit", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.uid = e.uid, 
        n.id = this.data.id, n.user_id = this.data.user_id, n.user_type = this.data.user_type, 
        n.labor = this.data.user_qq, n.get_tc_text = this.data.get_tc_text, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), t.data.status, a.setData({
                    get_tc_text: "",
                    tousu: !1
                }), $Toast({
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
    get_tc_text: function(t) {
        this.setData({
            get_tc_text: t.detail.value
        });
    },
    get_shenqing_text: function(t) {
        this.setData({
            shenqing_text: t.detail.value
        });
    },
    da_mod: function() {
        this.setData({
            da_mod: !0
        });
    },
    xiao_mod: function() {
        this.setData({
            xiao_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            da_mod: !1,
            xiao_mod: !1,
            anhao_mode: !1
        });
    },
    shenqing_da_qq: function(t) {
        var a = this, e = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        (a.animation = e).translateY(230).step(), a.setData({
            animationSqData: e.export(),
            shenqing: !0,
            shenqing_type: t.currentTarget.dataset.key
        }), setTimeout(function() {
            e.translateY(0).step(), a.setData({
                animationSqData: e.export()
            });
        }, 100);
    },
    no_shenqing_da_qq: function() {
        this.setData({
            shenqing: !1,
            tousu: !1
        });
    },
    shenqing_submit: function() {
        var t = app.api_root + "User/add_territory_learned", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.id = this.data.id, 
        n.upshot = this.data.shenqing_text, n.shenqing_type = this.data.shenqing_type, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.no_shenqing_da_qq()) : $Toast({
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
    get_qq_info: function() {
        var t = app.api_root + "User/get_qq_info", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.id = this.data.id, 
        http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    info: t.data.info,
                    this_atcipher: t.data.info.atcipher,
                    da_qq: t.data.info.da_qq,
                    xiao_qq: t.data.info.xiao_qq
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
    previewOneImage: function() {
        var e = this, n = app.getCache("userinfo"), i = app.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                $Toast({
                    content: "上传中...",
                    type: "loading"
                });
                var a = t.tempFilePaths;
                wx.uploadFile({
                    url: i,
                    filePath: a[0],
                    name: "sngpic",
                    formData: {
                        token: n.token,
                        openid: n.openid,
                        much_id: app.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var a = JSON.parse(t.data);
                        console.log(a), "error" == a.status ? $Toast({
                            content: a.msg
                        }) : (e.setData({
                            img: a.url
                        }), $Toast.hide());
                    },
                    fail: function(t) {
                        $Toast({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    handleFruitChange: function(t) {
        var a = t.detail, e = void 0 === a ? {} : a;
        this.setData({
            current: e.value
        });
    },
    copyBtn: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.no,
            success: function(t) {}
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