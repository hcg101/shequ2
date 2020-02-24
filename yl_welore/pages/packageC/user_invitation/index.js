var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, fsm = wx.getFileSystemManager();

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "推荐有奖",
            height: 2 * app.globalData.height + 20
        },
        page: 1,
        set_img_quan: !1,
        this_user_info: {},
        code: "",
        yzm_text: ""
    },
    onLoad: function(e) {
        app.authority();
        var t = decodeURIComponent(e.scene);
        console.log(t);
        var a = app.getCache("userinfo");
        "undefined" != t && a && (this.ger_cor_user_code(t), this.setData({
            scene: t
        })), this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            copyright: app.globalData.copyright,
            design: app.globalData.design
        });
    },
    onShow: function(e) {
        console.log(e), app.getCache("userinfo") && (this.ger_user_code(), this.data.scene && this.ger_cor_user_code(this.data.scene)), 
        this.get_ad();
    },
    get_ad: function() {
        var e = app.getCache("userinfo"), t = new Object();
        t.token = e.token, t.openid = e.openid, t.much_id = app.siteInfo.uniacid;
        var a = app.api_root + "User/get_ad";
        http.POST(a, {
            params: t,
            success: function(e) {
                console.log(e), "账户未授权!" == e.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index"
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    get_yzm_text: function(e) {
        this.setData({
            yzm_text: e.detail.value
        });
    },
    ger_cor_user_code: function(e) {
        var t = this, a = app.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, n.much_id = app.siteInfo.uniacid, n.uid = e;
        var i = app.api_root + "User/ger_user_code";
        http.POST(i, {
            params: n,
            success: function(e) {
                console.log(e), t.setData({
                    yzm_text: e.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    ger_user_code: function() {
        var t = this, e = app.getCache("userinfo"), a = new Object();
        a.token = e.token, a.openid = e.openid, a.much_id = app.siteInfo.uniacid, a.uid = e.uid;
        var n = app.api_root + "User/ger_user_code";
        http.POST(n, {
            params: a,
            success: function(e) {
                console.log(e), t.setData({
                    code: e.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    add_user_invitation: function() {
        var e = app.getCache("userinfo"), t = new Object();
        if (t.token = e.token, t.openid = e.openid, t.much_id = app.siteInfo.uniacid, t.uid = e.uid, 
        t.yzm_text = this.data.yzm_text, "" == this.data.yzm_text) return $Toast({
            content: "内容不能为空"
        }), !1;
        var a = app.api_root + "User/add_user_invitation";
        http.POST(a, {
            params: t,
            success: function(e) {
                e.data.status, $Toast({
                    content: e.data.msg
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    img_quan: function(e) {
        console.log(e), this.setData({
            set_img_quan: !0,
            this_user_info: e.detail.userInfo
        }), this.getAvaterInfo();
    },
    no_set_img_quan: function() {
        this.setData({
            set_img_quan: !1
        });
    },
    getAvaterInfo: function() {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var t = this, e = app.getCache("userinfo"), a = new Object();
        a.token = e.token, a.openid = e.openid, a.much_id = app.siteInfo.uniacid, a.img = t.data.this_user_info.avatarUrl;
        var n = app.api_root + "User/base64EncodeImage";
        http.POST(n, {
            params: a,
            success: function(e) {
                t.getQrCode(e.data);
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    getQrCode: function(a) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var n = this, e = app.getCache("userinfo"), t = new Object();
        t.token = e.token, t.openid = e.openid, t.much_id = app.siteInfo.uniacid, t.uid = e.uid;
        var i = app.api_root + "User/qrcode_code";
        wx.request({
            url: i,
            method: "POST",
            data: t,
            responseType: "arraybuffer",
            header: {
                "content-type": "application/json,charset=utf-8"
            },
            success: function(e) {
                var t = wx.arrayBufferToBase64(e.data);
                n.sharePosteCanvas(a, t);
            }
        });
    },
    sharePosteCanvas: function(u, l) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var d = this, p = d.data.this_user_info, h = wx.createCanvasContext("myCanvas", d), f = "";
        wx.createSelectorQuery().select("#canvas-container").boundingClientRect(function(e) {
            var t = e.height;
            e.right;
            f = e.width;
            e.left;
            h.save(), h.setFillStyle("#FFE200"), h.fillRect(0, 0, f, t);
            h.drawImage("../../../style/icon/1033914-20180419150322109-1754886203.png", 0, 0, f, 150), 
            h.beginPath(), h.fill();
            var a = f / 2 - 25, n = 160, i = u.split(","), o = wx.base64ToArrayBuffer(i[1]), s = wx.env.USER_DATA_PATH + "/head_img.png";
            fsm.writeFileSync(s, o, "binary"), h.arc(25 + a, 185, 25, 0, 2 * Math.PI, !1), h.clip(), 
            h.drawImage(s, a, n, 50, 50), h.restore(), h.setFontSize(20), h.setFillStyle("#000"), 
            h.fillText(p.nickName, (f - h.measureText(p.nickName).width) / 2, 235), h.setFontSize(11), 
            h.setFillStyle("#000"), h.fillText("邀你一起赚赏金", (f - h.measureText("邀你一起赚赏金").width) / 2, 260);
            h.drawImage("../../../style/icon/1033914-20180419150331561-740454292.png", f / 2 - 115, 290, 230, 60), 
            h.setFontSize(35), h.setFillStyle("#FFE200"), h.fillText(d.data.code, (f - h.measureText(d.data.code).width) / 2, 325);
            h.drawImage("../../../style/icon/1033914-20180419150338090-1432865429.png", f / 2 - 125, 390, 130, 70), 
            h.setFontSize(10), h.setFillStyle("#000000"), h.fillText("进入小程序输入朋友的邀", f / 2 - 120, 410), 
            h.fillText("请码，各自都会获得赏金", f / 2 - 120, 425), h.fillText("哦~", f / 2 - 120, 440);
            var c = wx.base64ToArrayBuffer(l), r = wx.env.USER_DATA_PATH + "/code_img.png";
            fsm.writeFileSync(r, c, "binary"), h.drawImage(r, f - 120, 360, 80, 80);
            h.drawImage("../../../style/icon/1033914-20180419150342935-1154229474.png", f - 120, 440, 80, 22);
        }).exec(), setTimeout(function() {
            h.draw(), wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(e) {
                    var t = e.tempFilePath;
                    d.setData({
                        imagePath_c: t
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            }), wx.hideLoading();
        }, 1e3);
    },
    saveShareImg: function() {
        var e = this;
        wx.showLoading({
            title: "正在保存",
            mask: !0
        }), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(e) {
                    wx.hideLoading();
                    var t = e.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: t,
                        success: function(e) {
                            wx.showModal({
                                content: "图片已保存到相册，赶紧晒一下吧~",
                                showCancel: !1,
                                confirmText: "好的",
                                confirmColor: "#333",
                                success: function(e) {
                                    e.confirm;
                                },
                                fail: function(e) {}
                            });
                        },
                        fail: function(e) {
                            console.log(e), "saveImageToPhotosAlbum:fail auth deny" == e.errMsg && wx.showModal({
                                content: "检测到您未打开微信保存图片到相册，开启后即可保存图片",
                                confirmText: "去开启",
                                success: function(e) {
                                    e.confirm ? wx.openSetting({
                                        success: function(e) {}
                                    }) : e.cancel;
                                }
                            });
                        }
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            }, e);
        }, 1e3);
    },
    _navback: function() {
        var e = getCurrentPages(), t = (e[e.length - 1], e[e.length - 2]);
        1 != e.length ? (t.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});