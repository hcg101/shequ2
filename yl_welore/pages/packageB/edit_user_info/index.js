var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        user_info: {},
        current: "男",
        img: "",
        nick_name: "",
        autograph: ""
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx
        }), this.get_user_info();
    },
    onShow: function() {},
    get_input: function(t) {
        this.setData({
            nick_name: t.detail.detail.value
        });
    },
    get_text: function(t) {
        this.setData({
            autograph: t.detail.value
        });
    },
    edit_submit: function() {
        var t = app.api_root + "User/edit_user_info", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.uid = e.uid, 
        n.img = this.data.img, n.nick_name = this.data.nick_name, n.autograph = this.data.autograph, 
        n.gender = "男" == this.data.current ? 1 : 2, http.POST(t, {
            params: n,
            success: function(t) {
                "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_user_info()) : $Toast({
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
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    info: t.data.info,
                    autograph: t.data.info.autograph,
                    nick_name: t.data.info.user_nick_name,
                    img: t.data.info.user_head_sculpture,
                    current: 1 == t.data.info.gender || 0 == t.data.info.gender ? "男" : "女"
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
    _navback: function() {
        var t = getCurrentPages();
        t[t.length - 1];
        t[t.length - 2].setData({
            show: !1
        }), wx.navigateBack();
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