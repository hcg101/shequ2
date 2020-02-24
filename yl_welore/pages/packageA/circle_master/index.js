var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        user_list: []
    },
    onLoad: function(t) {
        var a = app.getCache("userinfo");
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            uid: a.uid,
            design: app.globalData.design
        }), this.user_mastert();
    },
    onShow: function() {},
    user_mastert: function() {
        var t = app.api_root + "User/user_mastert", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_list: t.data.info,
                    user_info: t.data.user_info
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
    get_qq_info: function() {
        var t = app.api_root + "User/get_qq_info", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.much_id = app.siteInfo.uniacid, n.id = this.data.id, 
        http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    info: t.data.info,
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
        var e = this, n = app.getCache("userinfo"), o = app.api_root + "User/img_upload";
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
                    url: o,
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