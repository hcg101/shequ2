var _slicedToArray = function(t, a) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, a) {
        var e = [], i = !0, n = !1, s = void 0;
        try {
            for (var o, d = t[Symbol.iterator](); !(i = (o = d.next()).done) && (e.push(o.value), 
            !a || e.length !== a); i = !0) ;
        } catch (t) {
            n = !0, s = t;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (n) throw s;
            }
        }
        return e;
    }(t, a);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
};

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, recorderManager_hf = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), options_hf = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 96e3,
    format: "mp3",
    frameSize: 50
}, fsm = wx.getFileSystemManager(), recordTimeInterval_a = "", page = 1, show_type = "all";

Page({
    data: {
        check_img: "",
        set_img_quan: !1,
        visible: !1,
        visible1: !1,
        visible2: !1,
        zhuanfa: !1,
        actions_index: [],
        actions: [],
        actions1: [],
        actions2: [],
        del_msg: !1,
        tz_jin_msg: !1,
        isIpx: app.globalData.isIpx,
        current: "tab1",
        current_h: "h1",
        nvabarData: {
            showCapsule: 1,
            title: "贴子详情",
            height: 2 * app.globalData.height + 20
        },
        huifu: !1,
        jubao: !1,
        huifu_zan: !1,
        huifu_list: [],
        animationData: {},
        img_arr: [],
        img_botton: !0,
        file: "",
        file_ss: 0,
        text: "",
        jubao_text: "",
        di_msg: !1,
        del_mod: !1,
        info_zan: !1,
        info_zan_count: 0,
        info_sc: !1,
        info_sc_count: 0,
        animationData_zan: {},
        animationData_sc: {},
        animationJbData: {},
        select: !0,
        is_qq_text: "",
        li_number: 1,
        li_list: [],
        sex: 1,
        qrCode: "",
        show: !0,
        reply_and_hui: !1,
        get_reply_and_info: [],
        get_reply_and_list: [],
        get_reply_and_text: "",
        placeholder_reply: "写评论",
        get_reply_and_page: 1,
        di_get_reply: !1,
        get_reply_and_user_id: 0,
        focus: !1,
        version: 0,
        admin: 0
    },
    get_reply_user: function(t) {
        var a = t.currentTarget.dataset.user_id, e = t.currentTarget.dataset.user_name;
        this.setData({
            placeholder_reply: "回复 " + e + ":",
            get_reply_and_user_id: a,
            focus: !0
        });
    },
    page_get_reply: function() {
        this.setData({
            get_reply_and_page: this.data.get_reply_and_page + 1
        }), this.get_reply_and_hui();
    },
    reply_and: function(t) {
        this.setData({
            get_reply_and_hui_id: t.currentTarget.dataset.hui_id,
            get_reply_and_list: [],
            get_reply_and_page: 1
        });
        var a = this, e = wx.createAnimation({
            duration: 150,
            timingFunction: "ease"
        });
        (a.animation = e).translateY(550).step(), a.setData({
            animationData: e.export(),
            reply_and_hui: !0,
            select: !1
        }), a.get_reply_and_hui(), setTimeout(function() {
            e.translateY(0).step(), a.setData({
                animationData: e.export()
            });
        }, 100);
    },
    get_reply_and_text: function(t) {
        this.setData({
            get_reply_and_text: t.detail.value
        });
    },
    add_reply_and_hui: function() {
        if (console.log(1), "" != this.data.get_reply_and_text) {
            wx.showLoading({
                title: "正在回复...",
                mask: !0
            });
            var a = this, t = app.getCache("userinfo"), e = new Object();
            e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
            e.id = this.data.get_reply_and_hui_id, e.user_id = this.data.get_reply_and_user_id, 
            e.duplex_content = this.data.get_reply_and_text;
            var i = app.api_root + "User/add_paper_reply_duplex";
            http.POST(i, {
                params: e,
                success: function(t) {
                    console.log(t), $Toast({
                        content: t.data.msg
                    }), a.setData({
                        get_reply_and_text: "",
                        get_reply_and_list: [],
                        placeholder_reply: "写评论",
                        get_reply_and_page: 1
                    }), a.get_reply_and_hui(), wx.hideLoading();
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
    get_reply_and_hui: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.id = e.data.get_reply_and_hui_id, 
        a.page = this.data.get_reply_and_page;
        var i = app.api_root + "User/get_paper_reply_info", n = e.data.get_reply_and_list;
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), 0 == t.data.list.length && e.setData({
                    di_get_reply: !0
                });
                for (var a = 0; a < t.data.list.length; a++) n.push(t.data.list[a]);
                e.setData({
                    get_reply_and_info: t.data.info,
                    get_reply_and_list: n
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
    add_liwu: function() {
        this.setData({
            huifu: !0,
            select: !1,
            current: "tab3"
        });
    },
    zhuanfa: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.setData({
            select: !1,
            zhuanfa: !0,
            this_user_info: t.detail.userInfo
        });
        var u = this, a = (t = app.getCache("userinfo"), new Object());
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, this.data.info.image_part ? 0 < this.data.info.image_part.length && (a.img = this.data.info.image_part[0]) : 1 == this.data.info_zf.whether_open && (a.img = this.data.info_zf.reis_img), 
        2 == this.data.info_type && (this.data.info.image_part[0] ? a.img = this.data.info.image_part[0] : a.img = app.http_root + "/addons/yl_welore/web/static/wechat/shipin.png"), 
        1 == this.data.info_type && (a.img = app.http_root + "/addons/yl_welore/web/static/wechat/yuyin.png");
        var e = app.api_root + "User/base64EncodeImage";
        http.POST(e, {
            params: a,
            success: function(t) {
                u.setData({
                    base_data: t.data
                });
                var a = t.data.split(","), e = wx.base64ToArrayBuffer(a[1]), i = wx.env.USER_DATA_PATH + "/share_img" + u.data.id + ".png";
                (u.data.info.image_part || 0 != u.data.info_type) && fsm.writeFileSync(i, e, "binary"), 
                u.setData({
                    fileName: i,
                    check_img: u.data.info.image_part ? u.data.info.image_part[0] : ""
                }), wx.getImageInfo({
                    src: i,
                    success: function(c) {
                        wx.getSystemInfo({
                            success: function(t) {
                                var a = c.width / c.height, e = .72 * t.windowWidth / a + 230, i = u.data.info.study_content.replace(/<[^>]*>/g, ""), n = u.textByteLength(i, 35), s = _slicedToArray(n, 3), o = (s[0], 
                                s[1]), d = (s[2], 15 < o.length ? 15 : o.length), r = parseFloat(e + 22 * d);
                                console.log(e), u.setData({
                                    imgheght: r,
                                    imgHeight_z: e
                                });
                            }
                        });
                    },
                    fail: function() {
                        var t = u.data.info.study_content.replace(/<[^>]*>/g, ""), a = u.textByteLength(t, 35), e = _slicedToArray(a, 3), i = (e[0], 
                        e[1]), n = (e[2], 15 < i.length ? 15 : i.length), s = parseFloat(230 + 22 * n);
                        u.setData({
                            imgheght: s
                        });
                    }
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
    },
    no_zhuanfa: function() {
        this.setData({
            select: !0,
            zhuanfa: !1
        });
    },
    set_img_quan: function() {
        this.setData({
            select: !1,
            set_img_quan: !0,
            zhuanfa: !1
        }), wx.pageScrollTo({
            scrollTop: 0
        }), this.getAvaterInfo();
    },
    no_set_img_quan: function() {
        this.setData({
            select: !0,
            set_img_quan: !1,
            zhuanfa: !1
        });
    },
    getAvaterInfo: function() {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.img = a.data.this_user_info.avatarUrl;
        var i = app.api_root + "User/base64EncodeImage";
        http.POST(i, {
            params: e,
            success: function(t) {
                a.getQrCode(t.data);
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
    getQrCode: function(e) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var i = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.id = i.data.id;
        var n = app.api_root + "User/qrcode";
        wx.request({
            url: n,
            method: "POST",
            data: a,
            responseType: "arraybuffer",
            header: {
                "content-type": "application/json,charset=utf-8"
            },
            success: function(t) {
                var a = wx.arrayBufferToBase64(t.data);
                i.sharePosteCanvas(e, a);
            }
        });
    },
    sharePosteCanvas: function(g, m) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var y = this, w = y.data.this_user_info, v = wx.createCanvasContext("myCanvas", y), x = "";
        wx.createSelectorQuery().select("#canvas-container").boundingClientRect(function(t) {
            var a = t.height;
            t.right;
            x = t.width;
            t.left;
            if (v.save(), v.setFillStyle("#ffffff"), v.fillRect(0, 0, x, a), g) {
                v.beginPath(), v.fill();
                var e = 10, i = 10, n = g.split(","), s = wx.base64ToArrayBuffer(n[1]), o = wx.env.USER_DATA_PATH + "/head_img" + y.data.id + ".png";
                fsm.writeFileSync(o, s, "binary"), v.arc(25 + e, 25 + i, 25, 0, 2 * Math.PI, !1), 
                v.clip(), v.drawImage(o, e, i, 50, 50);
            }
            v.restore(), v.setFontSize(12), v.setFillStyle("#999"), v.setTextAlign("left"), 
            v.fillText(w.nickName, e + 60, i + 20), v.setFontSize(14), v.setFillStyle("#000"), 
            y.data.info.study_title ? v.fillText(y.substr(y.data.info.study_title), e + 60, i + 45) : v.fillText("找到一个好东西😍😍", e + 60, i + 45);
            var d = y.data.info.study_content.replace(/<[^>]*>/g, "").replace(/\n/g, ""), r = y.textByteLength(d, 35), c = _slicedToArray(r, 3), u = (c[0], 
            c[1]);
            c[2];
            v.setTextAlign("left"), v.setFillStyle("#000");
            for (var l = 0; l < u.length && !(15 < l); l++) v.setFontSize(14), 270 < x ? v.fillText(u[l], x - 270, 85 + 22 * l) : v.fillText(u[l], x - 255, 85 + 22 * l);
            var _ = wx.base64ToArrayBuffer(m), h = wx.env.USER_DATA_PATH + "/code_img" + y.data.id + ".png";
            fsm.writeFileSync(h, _, "binary"), v.drawImage(h, x / 2 - 50, a - 140, 110, 110), 
            v.setFontSize(10), v.setFillStyle("#000"), v.fillText("👆微信扫码或长按识别👆", x / 2 - 50, a - 20);
            var p = 15 < u.length ? 15 : u.length;
            if (y.data.info.study_content) if (y.data.check_img && 2 == y.data.info_type) {
                var f = "../../../style/icon/home_bf.png";
                v.drawImage(y.data.fileName, 10, 70 + 22 * p, x - 20, y.data.imgheght - 250 - 22 * p), 
                v.drawImage(f, x / 2 - 25, y.data.imgHeight_z / 2 - 60, 50, 50);
            } else v.drawImage(y.data.fileName, 0, 70 + 22 * p, x, y.data.imgheght - 230 - 22 * p); else if (y.data.check_img && 2 == y.data.info_type) {
                f = "../../../style/icon/home_bf.png";
                v.drawImage(y.data.fileName, 10, 50 + 22 * p, x - 20, y.data.imgheght - 250), v.drawImage(f, x / 2 - 25, y.data.imgHeight_z / 2 - 60, 50, 50);
            } else v.drawImage(y.data.fileName, 0, 70 + 22 * p, x, y.data.imgheght - 230);
            1 == y.data.info_type && (v.setFontSize(20), v.setFillStyle("#fff"), v.fillText(y.data.info.study_voice_time + "''", x - 50, 117 + 22 * p), 
            v.fillText(" ♬ ", 20, 117 + 22 * p), v.setFontSize(18), v.fillText("一段神秘语音", 50, 117 + 22 * p));
        }).exec(), setTimeout(function() {
            v.draw(), wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    var a = t.tempFilePath;
                    y.setData({
                        imagePath_c: a
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            }), wx.hideLoading();
        }, 1e3);
    },
    saveShareImg: function() {
        var t = this;
        wx.showLoading({
            title: "正在保存",
            mask: !0
        }), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    wx.hideLoading();
                    var a = t.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: a,
                        success: function(t) {
                            wx.showModal({
                                content: "图片已保存到相册，赶紧晒一下吧~",
                                showCancel: !1,
                                confirmText: "好的",
                                confirmColor: "#333",
                                success: function(t) {
                                    t.confirm;
                                },
                                fail: function(t) {}
                            });
                        },
                        fail: function(t) {
                            console.log(t), "saveImageToPhotosAlbum:fail auth deny" == t.errMsg && wx.showModal({
                                content: "检测到您未打开微信保存图片到相册，开启后即可保存图片",
                                confirmText: "去开启",
                                success: function(t) {
                                    t.confirm ? wx.openSetting({
                                        success: function(t) {}
                                    }) : t.cancel;
                                }
                            });
                        }
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            }, t);
        }, 1e3);
    },
    substr: function(t) {
        return 0 != t.length && null != t && (13 < t.length ? t.substring(0, 13) + "..." : t);
    },
    textByteLength: function(t, a) {
        for (var e = 0, i = 1, n = 0, s = [], o = 0; o < t.length; o++) 255 < t.charCodeAt(o) ? i * a < (e += 2) && (e++, 
        s.push(t.slice(n, o)), n = o, i++) : i * a < ++e && (s.push(t.slice(n, o)), n = o, 
        i++);
        return s.push(t.slice(n, t.length)), [ e, s, i ];
    },
    get_liwu_ph: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = this.data.info.user_id;
        var i = app.api_root + "User/get_user_guard";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    liwu_ph: t.data.info,
                    liwu_count: t.data.count
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
    handleCancel1: function() {
        this.setData({
            visible: !1,
            select: !0,
            visible1: !1,
            visible2: !1
        });
    },
    handleCancel2: function() {
        this.setData({
            actions: [],
            actions2: []
        });
        var t = this.data.info, a = this.data.actions;
        t.user_id != this.data.uid && "da" != t.is_qq && "xiao" != t.is_qq && 1 != this.data.admin || a.push({
            name: "删除",
            type: "sc",
            is_qq: t.is_qq,
            icon: "trash"
        }), "da" != t.is_qq && "xiao" != t.is_qq && 1 != this.data.admin || (a.push({
            name: "置顶",
            type: "zd",
            icon: "packup"
        }), t.user_id != this.data.uid && a.push({
            name: "禁言",
            type: "jy",
            icon: "close"
        }), 0 != t.topping_time && a.push({
            name: "取消置顶",
            type: "qxzd",
            icon: "unfold"
        })), t.user_id != this.data.uid && "no" == t.is_qq && 0 == this.data.admin && a.push({
            name: "举报",
            type: "jb",
            icon: "warning"
        }), this.setData({
            visible: !0,
            select: !1,
            actions: a
        });
    },
    handleCancel3: function(t) {
        console.log(t), this.setData({
            actions1: []
        });
        var a = t.currentTarget.dataset.user_id, e = this.data.actions1, i = this.data.info;
        if (i.user_id != this.data.uid && "da" != i.is_qq && "xiao" != i.is_qq && 1 != this.data.admin || e.push({
            name: "删除",
            type: "sc",
            id: t.currentTarget.dataset.id,
            is_qq: i.is_qq,
            user_id: a,
            icon: "trash",
            key: t.currentTarget.dataset.key
        }), a == this.data.uid && "no" == i.is_qq && i.user_id != this.data.uid && e.push({
            name: "删除",
            type: "sc",
            id: t.currentTarget.dataset.id,
            is_qq: i.is_qq,
            user_id: a,
            icon: "trash",
            key: t.currentTarget.dataset.key
        }), a != this.data.uid && "no" == i.is_qq && 0 == this.data.admin && e.push({
            name: "举报",
            type: "jb",
            id: t.currentTarget.dataset.id,
            user_id: a,
            icon: "warning"
        }), a != this.data.uid && ("da" == i.is_qq || "xiao" == i.is_qq || 1 == this.data.admin)) {
            e.push({
                name: "禁言",
                type: "jy",
                user_id: a,
                icon: "close"
            });
            var n = this.data.actions2;
            n.push({
                name: "1天",
                day: 1,
                user_id: a
            }, {
                name: "3天",
                day: 3,
                user_id: a
            }, {
                name: "7天",
                day: 7,
                user_id: a
            }, {
                name: "15天",
                day: 15,
                user_id: a
            }, {
                name: "30天",
                day: 30,
                user_id: a
            }), this.setData({
                actions2: n
            });
        }
        this.setData({
            visible1: !0,
            select: !1,
            actions1: e
        });
    },
    handleClickItem2: function(t) {
        var a = t.detail.index, e = this.data.actions1[a];
        if (console.log(e), "jy" == e.type) {
            this.setData({
                actions2: []
            });
            var i = this.data.actions2;
            i.push({
                name: "1天",
                day: 1,
                user_id: e.user_id
            }, {
                name: "3天",
                day: 3,
                user_id: e.user_id
            }, {
                name: "7天",
                day: 7,
                user_id: e.user_id
            }, {
                name: "15天",
                day: 15,
                user_id: e.user_id
            }, {
                name: "30天",
                day: 30,
                user_id: e.user_id
            }), this.setData({
                visible: !1,
                visible1: !1,
                visible2: !0,
                actions2: i
            });
        }
        "jb" == e.type && (this.setData({
            visible1: !1
        }), this.jubao({
            kkk: 1,
            id: e.id
        })), "sc" == e.type && (("da" == e.is_qq || "xiao" == e.is_qq) && e.user_id != this.data.uid ? this.setData({
            visible1: !1,
            del_msg: !0,
            huifu_id: e.id
        }) : this.del_huifu({
            id: e.id,
            key: e.key
        }), this.setData({
            visible1: !1
        }));
    },
    handleClickItem1: function(t) {
        var a = t.detail.index, e = this.data.actions[a], i = this.data.info;
        console.log(e);
        var n = this.data.actions2;
        "jy" == e.type && (n.push({
            name: "1天",
            day: 1,
            user_id: i.user_id
        }, {
            name: "3天",
            day: 3,
            user_id: i.user_id
        }, {
            name: "7天",
            day: 7,
            user_id: i.user_id
        }, {
            name: "15天",
            day: 15,
            user_id: i.user_id
        }, {
            name: "30天",
            day: 30,
            user_id: i.user_id
        }), this.setData({
            visible: !1,
            visible2: !0,
            actions2: n
        })), "jb" == e.type && (this.setData({
            visible: !1
        }), this.jubao({
            kkk: 0,
            id: 0
        })), "zd" == e.type && (this.setData({
            visible: !1,
            select: !0
        }), this.placement()), "qxzd" == e.type && (this.setData({
            visible: !1,
            select: !0
        }), this.placement()), "sc" == e.type && ("da" != e.is_qq && "xiao" != e.is_qq || i.user_id != this.data.uid && this.setData({
            visible1: !1,
            tz_del_msg: !0
        }), i.user_id == this.data.uid && this.del_tz_do(), this.setData({
            visible: !1
        }));
    },
    banned_user: function(t) {
        var a = t.detail.index, e = this.data.actions2[a];
        this.setData({
            actions_index: e,
            visible2: !1,
            tz_jin_msg: !0
        });
    },
    do_banned_user: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
        e.user_id = this.data.actions_index.user_id, e.day = this.data.actions_index.day, 
        e.refer_type = this.data.info.is_qq, e.tory_id = this.data.info.tory_id, e.beget = this.data.is_qq_text;
        var i = app.api_root + "User/do_banned_user";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), t.data.status, a.hideModal(), $Toast({
                    content: t.data.msg,
                    duration: 0
                }), setTimeout(function() {
                    $Toast.hide();
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
    placement: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.id = this.data.id;
        var i = app.api_root + "User/placement";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_article_info()) : $Toast({
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
    get_ad: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_ad";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "账户未授权!" == t.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=1&id=" + a.data.id + "&info_type=" + a.data.info_type
                }), "success" == t.data.status ? a.setData({
                    ad_info: t.data.info,
                    info_zf: t.data.info_zf
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
    rotate3d: function() {
        var t = this, a = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (t.animation_zan = a).rotate3d(0, 1, 0, 180).step(), this.setData({
            animationData_zan: a.export()
        }), setTimeout(function() {
            a.rotate3d(0, 1, 0, 0).step(), t.setData({
                animationData_zan: a.export()
            });
        }, 100);
    },
    rotate3d_sc: function() {
        var t = this, a = wx.createAnimation({
            duration: 350,
            timingFunction: "linear"
        });
        (t.animation_sc = a).rotate(360).step(), this.setData({
            animationData_sc: a.export()
        }), setTimeout(function() {
            t.setData({
                animationData_sc: a.export()
            });
        }, 350);
    },
    handleChange: function(t) {
        var a = t.detail;
        this.setData({
            current: a.key
        });
    },
    handleOpen5: function() {
        this.setData({
            del_mod: !0
        });
    },
    handleChange_h: function(t) {
        var a = t.detail;
        this.setData({
            current_h: a.key
        }), "h1" == a.key && (show_type = "all"), "h2" == a.key && (show_type = "main"), 
        "h3" == a.key && (show_type = "my"), this.hui_fu_page(1);
    },
    onLoad: function(t) {
        var a = decodeURIComponent(t.scene);
        if ("undefined" == a) this.setData({
            id: t.id,
            info_type: t.type
        }); else {
            var e = a.split("-");
            this.setData({
                id: e[0],
                info_type: e[1]
            });
        }
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    platform: t.platform
                });
            }
        });
    },
    onShow: function() {
        if (0 != this.data.show) {
            page = 1, show_type = "all";
            var t = app.getCache("userinfo");
            this.setData({
                uid: t.uid,
                design: app.globalData.design,
                height: app.globalData.height,
                huifu_list: []
            }), this.get_ad(), this.get_liwu_all(), this.get_article_info(), this.get_diy(), 
            $Toast.hide();
        }
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), a.setData({
                    version: t.data.version,
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
    handleChange1: function(t) {
        var a = t.detail.value, e = this.data.li_list[this.data.li_index];
        this.setData({
            li_number: a,
            li_sum: (e.tr_conch * a).toFixed(2)
        });
    },
    reward: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.num = this.data.li_number, e.uid = t.uid, 
        e.user_id = this.data.info.user_id, e.much_id = app.siteInfo.uniacid, e.li_id = this.data.li_list[this.data.li_index].id;
        var i = app.api_root + "User/user_reward";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_liwu_all()) : $Toast({
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
    liwu_index: function(t) {
        var a = t.currentTarget.dataset.k, e = (t.currentTarget.dataset.id, this.data.li_list[a]);
        this.setData({
            li_index: a,
            li_number: 1,
            li_sum: e.tr_conch
        });
    },
    get_liwu_all: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid;
        var i = app.api_root + "User/get_liwu";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    li_list: t.data.info,
                    user_liwu: t.data.user_info
                }) : a.setData({
                    li_if: !0,
                    li_msg: t.data.msg
                }), setTimeout(function() {
                    a.setData({
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
    get_huifu_zan: function(t) {
        var a = t.currentTarget.dataset.kkk, e = t.currentTarget.dataset.index, i = this, n = app.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.id = this.data.id, s.uid = n.uid, s.hui_id = a, 
        s.much_id = app.siteInfo.uniacid;
        var o = app.api_root + "User/add_paper_prely";
        http.POST(o, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    wx.vibrateShort();
                    var a = i.data.huifu_list;
                    a[e].is_huifu_zan = 0 == a[e].is_huifu_zan, a[e].is_huifu_zan_count = 0 == a[e].is_huifu_zan ? a[e].is_huifu_zan_count - 1 : a[e].is_huifu_zan_count + 1, 
                    i.setData({
                        huifu_list: a
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
    jubao: function(t) {
        var a = t.kkk, e = t.id, i = this, n = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        (i.animation = n).translateY(230).step(), i.setData({
            animationJbData: n.export(),
            jubao: !0,
            kkk: a,
            type_id: e,
            select: !1
        }), setTimeout(function() {
            n.translateY(0).step(), i.setData({
                animationJbData: n.export()
            });
        }, 100);
    },
    no_jubao: function() {
        this.setData({
            jubao: !1,
            select: !0
        });
    },
    get_jubao_text: function(t) {
        var a = t.detail.value;
        this.setData({
            jubao_text: a
        });
    },
    jubao_submit: function(t) {
        var a = this.data.kkk, e = this, i = (t = app.getCache("userinfo"), new Object());
        i.token = t.token, i.openid = t.openid, i.id = 0 == this.data.type_id ? this.data.id : this.data.type_id, 
        i.uid = t.uid, i.tale_type = a, i.much_id = app.siteInfo.uniacid, i.content = e.data.jubao_text;
        var n = app.api_root + "User/add_paper_complaint";
        http.POST(n, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), e.setData({
                    jubao: !1
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
        var a = t.currentTarget.dataset.kkk, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.id = this.data.id, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.zan_type = 1 == this.data.info.is_info_zan ? 1 : 0, i.applaud_type = a;
        var n = app.api_root + "User/add_user_zan";
        wx.vibrateShort();
        var s = this.data.info;
        wx.vibrateShort();
        var o, d, r = "info.is_info_zan", c = "info.info_zan_count_this";
        (console.log(s.is_info_zan), 0 == s.is_info_zan) ? this.setData((_defineProperty(o = {}, r, !0), 
        _defineProperty(o, c, s.info_zan_count_this + 1), o)) : this.setData((_defineProperty(d = {}, r, !1), 
        _defineProperty(d, c, s.info_zan_count_this - 1), d));
        this.rotate3d(), http.POST(n, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status || $Toast({
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
    add_sc: function() {
        var t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.id = this.data.id, a.uid = t.uid, a.much_id = app.siteInfo.uniacid, 
        a.sc_type = 1 == this.data.info.is_info_sc ? 1 : 0, wx.vibrateShort();
        var e, i, n = this.data.info, s = "info.is_info_sc", o = "info.info_sc_count_this";
        (console.log(n.is_info_sc), 0 == n.is_info_sc) ? this.setData((_defineProperty(e = {}, s, !0), 
        _defineProperty(e, o, n.info_sc_count_this + 1), e)) : this.setData((_defineProperty(i = {}, s, !1), 
        _defineProperty(i, o, n.info_sc_count_this - 1), i));
        this.rotate3d_sc();
        var d = app.api_root + "User/add_user_collect";
        http.POST(d, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status || $Toast({
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
    submit: function() {
        var e = this, t = app.getCache("userinfo");
        if ("tab1" != this.data.current || "" != this.data.text || 0 != this.data.img_arr.length) if ("tab2" != this.data.current || "" != this.data.file) {
            wx.showLoading({
                title: "回复中...",
                mask: !0
            });
            var i = new Object();
            i.token = t.token, i.openid = t.openid, i.id = this.data.id, i.uid = t.uid, i.much_id = app.siteInfo.uniacid, 
            i.reply_type = "tab1" == this.data.current ? 0 : 1, i.text = this.data.text, i.file_ss = this.data.file_ss, 
            i.img_arr = this.data.img_arr, "" != this.data.file ? wx.uploadFile({
                url: app.api_root + "User/img_upload",
                filePath: e.data.file,
                name: "sngpic",
                formData: {
                    token: t.token,
                    openid: t.openid,
                    much_id: app.siteInfo.uniacid
                },
                header: {
                    "Content-Type": "multipart/form-data"
                },
                success: function(t) {
                    var a = JSON.parse(t.data);
                    i.file = a.url, e.post(i);
                },
                fail: function(t) {
                    $Toast({
                        content: "上传错误！",
                        type: "error"
                    });
                }
            }) : (i.file = this.data.file, e.post(i));
        } else $Toast({
            content: "语音内容不能为空"
        }); else $Toast({
            content: "回复内容不能为空"
        });
    },
    post: function(t) {
        var a = app.api_root + "User/add_paper_reply", e = this;
        http.POST(a, {
            params: t,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), e.setData({
                    huifu: !1,
                    file: "",
                    img_arr: [],
                    di_msg: !1,
                    select: !0,
                    img_botton: !0
                }), e.get_article_info(1)) : $Toast({
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
    },
    ting_play: function(t) {
        for (var a = this, e = this.data.huifu_list, i = 0; i < e.length; i++) e[i].is_voice = !1;
        this.setData({
            huifu_list: e
        });
        var n = t.currentTarget.dataset.key;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), e[n].is_voice = !0, 
        this.setData({
            huifu_list: e,
            huifu_list_index: n
        }), innerAudioContext.onEnded(function(t) {
            e[n].is_voice = !1, a.setData({
                huifu_list: e
            });
        });
    },
    ting_stop: function(t) {
        innerAudioContext.stop();
        var a = t.currentTarget.dataset.key, e = this.data.huifu_list;
        e[a].is_voice = !1, this.setData({
            huifu_list: e
        });
    },
    get_article_info: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, t = app.api_root + "User/get_article_info", e = this, i = app.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.id = this.data.id, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
        n.version = app.version, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (e.setData({
                    info: t.data.info
                }), 0 != t.data.info.is_open && 1 != t.data.info.is_buy || wx.hideShareMenu(), e.hui_fu_page(a), 
                e.get_liwu_ph()) : ($Toast({
                    content: t.data.msg,
                    duration: 0
                }), setTimeout(function() {
                    $Toast.hide(), "该信息已被删除" == t.data.msg && e._navback(), "请购买后再查看详情！" == t.data.msg && e._navback();
                }, 1500));
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
    hui_fu_page: function(t) {
        var e = this;
        1 == t && (page = 1, e.setData({
            huifu_list: []
        }));
        var a = app.api_root + "User/get_article_huifu", i = app.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.id = this.data.id, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
        n.page = page, n.show_type = show_type;
        var s = e.data.huifu_list;
        http.POST(a, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) if (0 == t.data.huifu.length) e.setData({
                    di_msg: !0
                }); else {
                    for (var a = 0; a < t.data.huifu.length; a++) s.push(t.data.huifu[a]);
                    e.setData({
                        huifu_list: s
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
    previewOneImage: function() {
        var e = this, i = app.getCache("userinfo"), n = app.api_root + "User/img_upload";
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
                    url: n,
                    filePath: a[0],
                    name: "sngpic",
                    formData: {
                        token: i.token,
                        openid: i.openid
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
                            img_arr: e.data.img_arr.concat(a.url),
                            img_botton: !1
                        }), $Toast.hide()), console.log(e.data.img_botton);
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
    del_huifu: function(t) {
        console.log(t);
        var a = t.id;
        this.setData({
            huifu_id: a,
            huifu_key: t.key,
            del_mod: !0
        });
    },
    clearOneImage: function(t) {
        var a = t.target.dataset.index, e = this.data.img_arr;
        e.splice(a, 1), this.setData({
            img_arr: e
        }), this.setData({
            img_botton: !0
        });
    },
    get_text: function(t) {
        var a = t.detail.value;
        this.setData({
            text: a
        });
    },
    huifu: function(t) {
        var a = this, e = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        (a.animation = e).translateY(400).step(), a.setData({
            animationData: e.export(),
            huifu: !0,
            select: !1,
            current: "tab1"
        }), setTimeout(function() {
            e.translateY(0).step(), a.setData({
                animationData: e.export()
            });
        }, 100);
    },
    no_huifu: function() {
        var t = wx.createAnimation({
            duration: 5,
            timingFunction: "linear"
        });
        t.translateY(0).step(), this.setData({
            animationData: t.export(),
            huifu: !1,
            select: !0,
            reply_and_hui: !1
        });
    },
    previewImage: function(t) {
        this.setData({
            show: !1
        });
        var a = t.target.dataset.src;
        wx.previewImage({
            current: a,
            urls: this.data.info.image_part
        });
    },
    previewHuiImage: function(t) {
        this.setData({
            show: !1
        });
        var a = t.target.dataset.src, e = t.target.dataset.index;
        wx.previewImage({
            current: a,
            urls: this.data.huifu_list[e].image_part
        });
    },
    previewHuiAndImage: function(t) {
        this.setData({
            show: !1
        });
        var a = t.target.dataset.src;
        wx.previewImage({
            current: a,
            urls: this.data.get_reply_and_info.image_part
        });
    },
    onReachBottom: function() {
        console.log(page), $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), page += 1, this.hui_fu_page(), $Toast.hide();
    },
    play: function(t) {
        var a = this, e = this.data.info;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), e.is_voice = !0, 
        this.setData({
            info: e
        }), innerAudioContext.onEnded(function(t) {
            e.is_voice = !1, a.setData({
                info: e
            });
        });
    },
    stop: function(t) {
        innerAudioContext.stop();
        t.currentTarget.dataset.key;
        var a = this.data.info;
        a.is_voice = !1, this.setData({
            info: a
        });
    },
    touchStart: function() {
        $Toast({
            duration: 0,
            content: "正在录音",
            image: app.http_root + "/addons/yl_welore/web/static/wechat/yuyin.gif",
            mask: !1
        }), this.start();
    },
    touchEnd: function() {
        $Toast.hide(), this.stop_hf();
    },
    start: function() {
        var a = this;
        a.setData({
            file_ss: 0
        }), recorderManager_hf.start(options_hf), recorderManager_hf.onStart(function() {
            recordTimeInterval_a = setInterval(function() {
                var t = a.data.file_ss + 1;
                60 <= t && a.touchEnd(), a.setData({
                    file_ss: t
                });
            }, 1e3);
        }), recorderManager_hf.onError(function(t) {
            console.log(t);
        });
    },
    stop_hf: function() {
        var a = this, e = this;
        recorderManager_hf.stop(), recorderManager_hf.onStop(function(t) {
            a.tempFilePath = t.tempFilePath, e.setData({
                file: t.tempFilePath
            }), clearInterval(recordTimeInterval_a), recordTimeInterval_a = "";
        });
    },
    play_hf: function() {
        innerAudioContext.autoplay = !0, innerAudioContext.src = this.data.file, innerAudioContext.play(), 
        innerAudioContext.onPlay(function() {});
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            del_msg: !1,
            tz_del_msg: !1,
            select: !0,
            tz_jin_msg: !1
        });
    },
    is_qq_text: function(t) {
        this.setData({
            is_qq_text: t.detail.value
        });
    },
    del_do: function() {
        var a = this, t = app.api_root + "User/del_article_huifu", e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.paper_id = this.data.info.id, i.id = this.data.huifu_id, i.is_qq_text = this.data.is_qq_text;
        var n = a.data.huifu_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                "success" == t.data.status ? (n.splice(a.data.huifu_key, 1), a.setData({
                    del_mod: !1,
                    visible1: !1,
                    del_msg: !1,
                    is_qq_text: "",
                    select: !0,
                    huifu_list: n
                })) : a.setData({
                    del_mod: !1
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
    del_tz_do: function() {
        var a = this, t = app.api_root + "User/del_article", e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.paper_id = this.data.info.id, i.is_qq_text = this.data.is_qq_text, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a.setData({
                    del_mod: !1,
                    visible1: !1,
                    tz_del_msg: !1,
                    is_qq_text: ""
                }), $Toast({
                    content: t.data.msg,
                    duration: 0
                }), setTimeout(function() {
                    $Toast.hide(), a._navback();
                }, 1500)) : (a.setData({
                    del_mod: !1
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
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log("/yl_welore/pages/packageA/article/index?id=" + this.data.id + "&type=" + this.data.info_type), 
        t ? {
            title: t.title,
            path: "/yl_welore/pages/packageA/article/index?id=" + this.data.id + "&type=" + this.data.info_type,
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
            title: this.data.info.study_title,
            path: "/yl_welore/pages/packageA/article/index?id=" + this.data.id + "&type=" + this.data.info_type,
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
    _navback: function() {
        var t = getCurrentPages(), a = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (a.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.switchTab({
            url: "/yl_welore/pages/index/index"
        });
    }
});