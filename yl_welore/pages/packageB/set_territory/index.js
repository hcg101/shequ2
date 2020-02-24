var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            height: 2 * app.globalData.height + 20
        },
        needle: [],
        needle_index: 0,
        img_arr: [],
        img_botton: !0,
        this_qz: !0,
        this_qx: !1,
        is_submit: !1,
        title: ""
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            design: app.globalData.design,
            title: "创建" + app.globalData.design.landgrave
        });
    },
    onShow: function() {
        this.get_needle();
    },
    onChange: function(t) {
        var e = t.detail;
        this.setData({
            this_qz: e.value
        });
    },
    onChange_qx: function(t) {
        var e = t.detail;
        this.setData({
            this_qx: e.value
        });
    },
    formSubmit: function(t) {
        var e = this;
        e.setData({
            is_submit: !0
        });
        var a = new Object(), n = app.getCache("userinfo");
        a.needle_id = this.data.needle[this.data.needle_index].id, a.realm_icon = this.data.img_arr[0], 
        a.is_gnaw_qulord = 0 == this.data.this_qz ? 0 : 1, a.attention = 0 == this.data.this_qx ? 0 : 1, 
        a.realm_name = t.detail.value.qq_name, a.realm_synopsis = t.detail.value.qq_content, 
        a.solicit_origin = t.detail.value.qq_apply, a.token = n.token, a.openid = n.openid, 
        a.uid = n.uid, a.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/add_territory_petition";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 2e3)) : (e.setData({
                    is_submit: !1
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
    },
    needleChange: function(t) {
        this.setData({
            needle_index: t.detail.value
        });
    },
    get_needle: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.uid = t.uid, a.much_id = app.siteInfo.uniacid;
        var n = app.api_root + "User/get_left_needle";
        http.POST(n, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    needle: t.data.info
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
        var a = this, n = app.getCache("userinfo"), i = app.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                $Toast({
                    content: "上传中...",
                    type: "loading"
                });
                var e = t.tempFilePaths;
                wx.uploadFile({
                    url: i,
                    filePath: e[0],
                    name: "sngpic",
                    formData: {
                        token: n.token,
                        openid: n.openid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var e = JSON.parse(t.data);
                        console.log(e), "error" == e.status ? $Toast({
                            content: e.msg
                        }) : (a.setData({
                            img_arr: a.data.img_arr.concat(e.url),
                            img_botton: !1
                        }), $Toast.hide()), console.log(a.data.img_botton);
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
    clearOneImage: function(t) {
        var e = this, a = t.target.dataset.index, n = e.data.img_arr;
        n.splice(a, 1), e.setData({
            img_arr: n
        }), e.setData({
            img_botton: !0
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