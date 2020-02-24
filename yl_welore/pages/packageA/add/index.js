var app = getApp(), recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), WxParse = require("../../../util/wxParse/wxParse.js"), http = require("../../../util/http.js"), options = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 96e3,
    format: "mp3",
    frameSize: 50
}, recordTimeInterval = "", _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        address_latitude: "",
        address_longitude: "",
        is_position: !1,
        position: "",
        position_name: "",
        is_open: !1,
        fa_type: 0,
        is_submit: !1,
        visible2: !1,
        text_color: !1,
        get_hidden: !0,
        actions4: [ {
            color: "#2ae0c8"
        }, {
            color: "#a2e1d4"
        }, {
            color: "#acf6ef"
        }, {
            color: "#cbf5fb"
        }, {
            color: "#bdf3d4"
        }, {
            color: "#e6e2c3"
        }, {
            color: "#e3c887"
        }, {
            color: "#fad8be"
        }, {
            color: "#fbb8ac"
        }, {
            color: "#fe6673"
        }, {
            color: "#D24D57"
        }, {
            color: "#EB7347"
        }, {
            color: "#FC9D99"
        }, {
            color: "#26A65B"
        }, {
            color: "#AEDD81"
        }, {
            color: "#84AF9B"
        }, {
            color: "#00CCFF"
        }, {
            color: "#D0D0D0"
        }, {
            color: "#2C3E50"
        }, {
            color: "#000000"
        } ],
        isIpx: app.globalData.isIpx,
        nvabarData: {},
        file: "",
        file_ss: 0,
        scope_record: !0,
        text: "",
        is_title: !1,
        title_value: "",
        title_color: "#000000",
        img_arr: [],
        img_length: 9,
        img_botton: !0,
        is_vip: 0,
        check_fa_class: !1,
        showLeft: !1,
        navLeftItems: [],
        navRightItems: [],
        curNav: -1,
        di_msg: !0,
        page: 1,
        red_type: 1,
        zong_red_money: "0.00",
        xian_red_money: "",
        zong_red_count: "",
        version: 1,
        title_arbor: 1,
        red_paper: !1,
        money_paper: !1,
        money: "",
        xian_money: "0.00"
    },
    onLoad: function(t) {
        this.setData({
            copyright: app.globalData.copyright,
            design: app.globalData.design,
            height: app.globalData.height,
            fa_type: t.type,
            fa_class: t.fa_class,
            title: "发布到" + t.name,
            title_arbor: app.globalData.copyright.title_arbor,
            nvabarData: {
                showCapsule: !0,
                height: 2 * app.globalData.height + 20
            }
        }), console.log(this.data.copyright), this.get_user_info(), 2 == t.type && this.setData({
            is_title: !0
        }), 0 == t.fa_class && this.setData({
            check_fa_class: !0
        }), this.get_user_vip(), this.get_left_needle(), this.get_right_item(), this.get_diy();
    },
    onChangePosition: function(t) {
        var e = this, a = t.detail;
        this.setData({
            is_position: a.value
        }), 1 == a.value && wx.chooseLocation({
            success: function(t) {
                console.log(t), e.setData({
                    position: t.address,
                    position_name: t.name,
                    address_latitude: t.latitude,
                    address_longitude: t.longitude,
                    ppooss: t.name + "-" + t.address
                });
            },
            fail: function(t) {
                console.log(t), "chooseLocation:fail cancel" != t.errMsg ? e.setData({
                    visible_pos: !0,
                    is_position: !1
                }) : e.setData({
                    is_position: !1
                });
            }
        });
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.uid = a.uid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), e.setData({
                    version: t.data.version,
                    open_file: t.data.open_file
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
    set_red_type: function() {
        this.setData({
            red_type: 1 == this.data.red_type ? 0 : 1,
            zong_red_money: "0.00",
            xian_red_money: ""
        });
    },
    get_red_money_d: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g, i = ((e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00") * this.data.zong_red_count).toFixed(2);
            this.setData({
                xian_red_money: e,
                zong_red_money: i
            });
        }
    },
    get_paper_money: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00", this.setData({
                money: e,
                xian_money: parseFloat(e).toFixed(2),
                is_submit: !1
            });
        } else this.setData({
            is_submit: !0
        });
    },
    get_red_money: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00", this.setData({
                zong_red_money: parseFloat(e).toFixed(2),
                xian_red_money: e
            });
            var i = this.data.zong_red_count;
            if ("" != i) {
                if (e / i < .01) return $Toast({
                    content: "单个红包不可低于0.01"
                }), void this.setData({
                    is_submit: !0
                });
                this.setData({
                    is_submit: !1
                });
            }
        }
    },
    get_red_count: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) if (0 != e) {
            if (/^[0-9]*$/g.test(e) || (e = "1"), this.setData({
                zong_red_count: e
            }), 1 == this.data.red_type) {
                if ("" != this.data.xian_red_money) {
                    if (this.data.xian_red_money / e < .01) return $Toast({
                        content: "单个红包不可低于0.01"
                    }), void this.setData({
                        is_submit: !0
                    });
                    this.setData({
                        is_submit: !1
                    });
                }
            } else {
                var a = (this.data.xian_red_money * e).toFixed(2);
                this.setData({
                    zong_red_money: a,
                    is_submit: !1
                });
            }
        } else this.setData({
            zong_red_count: 1
        });
    },
    select_qq_id: function(t) {
        this.setData({
            title: "发布到" + t.currentTarget.dataset.name,
            showLeft: !this.data.showLeft,
            fa_class: t.currentTarget.dataset.id,
            get_hidden: !this.data.get_hidden
        });
    },
    toggleLeft: function() {
        this.setData({
            showLeft: !this.data.showLeft,
            get_hidden: 1 != this.data.get_hidden
        });
    },
    lower: function() {
        this.setData({
            page: this.data.page + 1
        }), 0 < this.data.curNav && this.get_right_item();
    },
    get_left_needle: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_left_needle";
        http.POST(i, {
            params: a,
            success: function(t) {
                "success" == t.data.status ? e.setData({
                    navLeftItems: t.data.info
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
    get_right_item: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.get_id = a.data.curNav, e.cat_add = 1, e.page = a.data.page;
        var i = app.api_root + "User/get_right_needle", o = a.data.navRightItems;
        http.POST(i, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) o.push(t.data.info[e]);
                    a.setData({
                        navRightItems: o
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
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
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
    get_user_vip: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid;
        var i = app.api_root + "User/check_user_vip";
        http.POST(i, {
            params: a,
            success: function(t) {
                e.setData({
                    is_vip: t.data
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

         var new_cache=app.getCache("userinfo");
       if(!(new_cache && new_cache.token)){
         wx.navigateTo({
                url: "/yl_welore/pages/author/index?type=0"
            })
            return;
       }
        if (0 == this.data.fa_class) return $Toast({
            content: "请选择发布的" + this.data.design.landgrave
        }), void this.setData({
            showLeft: !0,
            get_hidden: !1
        });
        if (console.log(this.data.zong_red_money), console.log(this.data.user_info.fraction), 
        parseFloat(this.data.zong_red_money) > parseFloat(this.data.user_info.fraction)) $Toast({
            content: "所需余额不足"
        }); else {
            wx.showLoading({
                title: "正在发布...",
                mask: !0
            });
            var a = this;
            a.setData({
                is_submit: !0
            });
            var t = app.getCache("userinfo"), i = new Object();
            if ("" == this.data.title_value && 1 == this.data.title_arbor) return $Toast({
                content: "标题不能为空"
            }), a.setData({
                is_submit: !1
            }), void wx.hideLoading();
            if (2 != this.data.fa_type && "" == this.data.text && 0 == this.data.img_arr.length) return $Toast({
                content: "内容不能为空"
            }), wx.hideLoading(), void a.setData({
                is_submit: !1
            });
            if (i.title = this.data.title_value, i.color = this.data.title_color, i.content = this.data.text, 
            i.img_arr = this.data.img_arr, i.uid = t.uid, i.token = t.token, i.openid = t.openid, 
            i.is_open = 0 == this.data.is_open ? 1 : 0, i.type = this.data.fa_type, i.fa_class = this.data.fa_class, 
            i.mch_id = app.siteInfo.uniacid, i.file_ss = this.data.file_ss, i.version = app.version, 
            i.position_name = this.data.position_name, i.position = this.data.position, i.address_latitude = this.data.address_latitude, 
            i.address_longitude = this.data.address_longitude, this.data.red_paper && (i.red_paper = 1 == this.data.red_paper ? 1 : 0, 
            i.red_type = this.data.red_type, i.zong_red_count = this.data.zong_red_count, i.zong_red_money = this.data.zong_red_money), 
            this.data.money_paper && (i.money_paper = 1 == this.data.money_paper ? 1 : 0, i.zong_paper_money = this.data.money), 
            2 == this.data.fa_type && "" == this.data.file) return $Toast({
                content: "请添加视频"
            }), wx.hideLoading(), void a.setData({
                is_submit: !1
            });
            1 == this.data.fa_type || 2 == this.data.fa_type ? wx.uploadFile({
                url: app.api_root + "User/img_upload",
                filePath: a.data.file,
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
                    console.log(t);
                    var e = JSON.parse(t.data);
                    console.log(e), i.user_file = e.url, a.add_submit(i);
                },
                fail: function(t) {
                    $Toast({
                        content: "上传错误！",
                        type: "error"
                    }), wx.hideLoading(), a.setData({
                        is_submit: !1
                    });
                }
            }) : (i.user_file = "", a.add_submit(i), $Toast.hide(), wx.hideLoading());
        }
    },
    add_submit: function(t) {
        var e = this, a = app.api_root + "User/add_circle";
        http.POST(a, {
            params: t,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (wx.hideLoading(), $Toast({
                    content: t.data.msg,
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 2e3)) : (e.setData({
                    is_submit: !1
                }), $Toast({
                    content: t.data.msg,
                    duration: 0
                }), wx.hideLoading()), setTimeout(function() {
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
    onChange: function(t) {
        var e = t.detail;
        this.setData({
            is_open: e.value
        });
    },
    onChange_red_paper: function(t) {
        var e = t.detail;
        this.setData({
            red_paper: e.value,
            is_submit: e.value,
            money_paper: !1
        });
    },
    onChange_money_paper: function(t) {
        var e = t.detail;
        this.setData({
            money_paper: e.value,
            red_paper: !1,
            is_submit: e.value
        });
    },
    hideModal: function() {
        this.setData({
            text_color: !1,
            get_hidden: !0
        });
    },
    color_select: function() {
        this.setData({
            text_color: !0,
            get_hidden: !1
        });
    },
    handleClick4: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.index;
        this.setData({
            text_color: !1,
            get_hidden: !0,
            title_color: this.data.actions4[e].color
        });
    },
    set_title_value: function(t) {
        var e = t.detail.value;
        this.setData({
            title_value: e
        });
    },
    set_title: function() {
        this.data.is_title ? this.setData({
            is_title: !1
        }) : this.setData({
            is_title: !0
        });
    },
    add_video: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: e.data.copyright.video_setting,
            compressed: !0,
            success: function(t) {
                console.log(t), wx.hideLoading(), e.data.copyright.video_setting < t.duration ? $Toast({
                    content: "视频最长为" + e.data.copyright.video_setting + "秒！请重新上传"
                }) : e.setData({
                    file: t.tempFilePath
                });
            }
        });
    },
    start: function() {
        var e = this;
        e.setData({
            file_ss: 0
        }), recorderManager.start(options), recorderManager.onStart(function() {
            recordTimeInterval = setInterval(function() {
                var t = e.data.file_ss + 1;
                60 <= t && e.touchEnd(), e.setData({
                    file_ss: t
                });
            }, 1e3);
        }), recorderManager.onError(function(t) {
            console.log(t);
        });
    },
    get_text_len: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
        });
    },
    stop: function() {
        var e = this, a = this;
        recorderManager.stop(), recorderManager.onStop(function(t) {
            e.tempFilePath = t.tempFilePath, console.log("停止录音", t.tempFilePath), a.setData({
                file: t.tempFilePath
            }), clearInterval(recordTimeInterval), recordTimeInterval = "";
        });
    },
    play: function() {
        innerAudioContext.autoplay = !0, innerAudioContext.src = this.data.file, innerAudioContext.play(), 
        innerAudioContext.onPlay(function() {
            console.log("开始播放");
        }), innerAudioContext.onError(function(t) {
            console.log(t.errMsg), console.log(t.errCode);
        });
    },
    handleClose: function() {
        this.setData({
            visible2: !1,
            visible_pos: !1
        });
    },
    handleOk: function() {
        wx.openSetting(), this.setData({
            visible2: !1,
            visible_pos: !1
        });
    },
    touchStart: function() {
        var e = this;
        if (wx.getSetting({
            success: function(t) {
                0 == t.authSetting["scope.record"] ? wx.authorize({
                    scope: "scope.record",
                    fail: function() {
                        e.setData({
                            visible2: !0,
                            scope_record: !1
                        });
                    }
                }) : e.setData({
                    scope_record: !0
                });
            }
        }), 0 == e.data.scope_record) return !1;
        $Toast({
            duration: 0,
            content: "正在录音",
            image: "https://wq.inotnpc.com/addons/yl_welore/web/static/wechat/yuyin.gif",
            mask: !1
        }), this.start();
    },
    touchEnd: function() {
        $Toast.hide(), this.stop();
    },
    chooseImage: function() {
        var o = this, s = app.getCache("userinfo"), n = app.api_root + "User/img_upload";
        wx.chooseImage({
            count: o.data.img_length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showLoading({
                    title: "上传中...",
                    mask: !0
                });
                var e = t.tempFilePaths;
                o.setData({
                    img_length: o.data.img_length - e.length
                }), o.data.img_length <= 0 && o.setData({
                    img_botton: !1
                });
                for (var a = 0, i = e.length; a < i; a++) wx.uploadFile({
                    url: n,
                    filePath: e[a],
                    name: "sngpic",
                    formData: {
                        token: s.token,
                        openid: s.openid,
                        much_id: app.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var e = JSON.parse(t.data);
                        console.log(e), "error" == e.status ? $Toast({
                            content: e.msg
                        }) : (o.setData({
                            img_arr: o.data.img_arr.concat(e.url)
                        }), wx.hideLoading());
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
    previewOneImage: function() {
        var a = this, i = app.getCache("userinfo"), o = app.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showLoading({
                    title: "上传中...",
                    mask: !0
                });
                var e = t.tempFilePaths;
                wx.uploadFile({
                    url: o,
                    filePath: e[0],
                    name: "sngpic",
                    formData: {
                        token: i.token,
                        openid: i.openid,
                        much_id: app.siteInfo.uniacid
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
                        }), wx.hideLoading()), console.log(a.data.img_botton);
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
        var e = t.target.dataset.index, a = this.data.img_arr;
        a.splice(e, 1), this.setData({
            img_arr: a
        }), this.setData({
            img_botton: !0
        });
    },
    clearImage: function(t) {
        var e = this, a = t.target.dataset.index, i = e.data.img_arr;
        i.splice(a, 1), e.setData({
            img_arr: i,
            img_length: e.data.img_length + 1
        }), 0 < e.data.img_length && e.setData({
            img_botton: !0
        });
    },
    previewImage: function(t) {
        console.log(t);
        for (var e = this.data.img_arr, a = [], i = 0; i < e.length; i++) a.push(e[i]);
        wx.previewImage({
            current: t.target.dataset.src,
            urls: a
        });
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
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});