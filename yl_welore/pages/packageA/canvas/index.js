var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, isButtonDown = !1, canvasw = 0, canvash = 0;

wx.getSystemInfo({
    success: function(t) {
        canvasw = t.windowWidth, canvash = t.windowHeight;
    }
}), Page({
    startX: 0,
    startY: 0,
    context: null,
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
            color: "#2ae0c8 "
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
            title_arbor: app.globalData.copyright.title_arbor,
            nvabarData: {
                showCapsule: !0,
                height: 2 * app.globalData.height + 20
            },
            title: "发布到" + t.name
        }), 0 == t.fa_class && this.setData({
            check_fa_class: !0
        }), this.cleardraw(), this.get_user_info(), this.get_user_vip(), this.get_left_needle(), 
        this.get_right_item(), this.get_diy();
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
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), s = new Object();
        s.token = a.token, s.openid = a.openid, http.POST(t, {
            params: s,
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
    get_diy: function() {
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), s = new Object();
        s.token = a.token, s.openid = a.openid, s.uid = a.uid, s.much_id = app.siteInfo.uniacid, 
        s.version = app.version, http.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), e.setData({
                    version: t.data.version
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
    onChange_red_paper: function(t) {
        var e = t.detail;
        this.setData({
            red_paper: e.value,
            is_submit: e.value
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
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g, s = ((e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00") * this.data.zong_red_count).toFixed(2);
            this.setData({
                xian_red_money: e,
                zong_red_money: s
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
    onChange_money_paper: function(t) {
        var e = t.detail;
        this.setData({
            money_paper: e.value,
            red_paper: !1,
            is_submit: e.value
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
            var s = this.data.zong_red_count;
            if ("" != s) {
                if (e / s < .01) return $Toast({
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
                    zong_red_money: a
                });
            }
        } else this.setData({
            zong_red_count: 1
        });
    },
    select_qq_id: function(t) {
        console.log(t), this.setData({
            title: "发布到" + t.currentTarget.dataset.name,
            showLeft: !this.data.showLeft,
            fa_class: t.currentTarget.dataset.id,
            get_hidden: !this.data.get_hidden
        });
    },
    toggleLeft: function() {
        this.setData({
            showLeft: !this.data.showLeft,
            get_hidden: !this.data.get_hidden
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
        var s = app.api_root + "User/get_left_needle";
        http.POST(s, {
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
        e.get_id = a.data.curNav, e.page = a.data.page;
        var s = app.api_root + "User/get_right_needle", i = a.data.navRightItems;
        http.POST(s, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) i.push(t.data.info[e]);
                    a.setData({
                        navRightItems: i
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
    color_ssss: function(t) {
        this.setData({
            cccc: t.currentTarget.dataset.color
        });
    },
    canvasIdErrorCallback: function(t) {},
    canvasStart: function(t) {
        this.startX = t.changedTouches[0].x, this.startY = t.changedTouches[0].y, this.context.setStrokeStyle(this.data.cccc), 
        this.context.setLineWidth(7), this.context.setLineCap("round"), this.context.beginPath();
    },
    canvasMove: function(t) {
        var e = t.changedTouches[0].x, a = t.changedTouches[0].y;
        this.context.moveTo(this.startX, this.startY), this.context.lineTo(e, a), this.context.stroke(), 
        this.startX = e, this.startY = a, wx.drawCanvas({
            canvasId: "canvas",
            reserve: !0,
            actions: this.context.getActions()
        });
    },
    canvasEnd: function(t) {
        isButtonDown = !1;
    },
    cleardraw: function() {
        this.startX = 0, this.startY = 0, this.context = wx.createCanvasContext("canvas"), 
        this.context.clearRect(0, 0, canvasw, canvash), this.context.draw();
    },
    get_user_vip: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid;
        var s = app.api_root + "User/check_user_vip";
        http.POST(s, {
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
        if (0 == this.data.fa_class) return $Toast({
            content: "请选择发布的" + this.data.design.landgrave
        }), void this.setData({
            showLeft: !0,
            get_hidden: !1
        });
        var s = app.getCache("userinfo"), e = app.api_root + "User/img_upload", i = this;
        if (console.log(parseFloat(this.data.zong_red_money)), console.log(parseFloat(this.data.user_info.fraction)), 
        !(parseFloat(this.data.zong_red_money) > parseFloat(this.data.user_info.fraction))) return 0 == this.startX ? (wx.showModal({
            title: "提示",
            content: "画布内容不能为空！",
            showCancel: !1
        }), !1) : "" == i.data.title_value && 1 == this.data.title_arbor ? ($Toast({
            content: "标题不能为空"
        }), void i.setData({
            is_submit: !1
        })) : void wx.canvasToTempFilePath({
            canvasId: "canvas",
            success: function(t) {
                wx.uploadFile({
                    url: e,
                    filePath: t.tempFilePath,
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
                        if (console.log(e), "error" == e.status) $Toast({
                            content: e.msg
                        }); else {
                            i.setData({
                                img_arr: i.data.img_arr.concat(e.url)
                            }), $Toast({
                                content: "正在发布....",
                                icon: "prompt",
                                duration: 0,
                                mask: !1
                            }), i.setData({
                                is_submit: !0
                            });
                            var a = new Object();
                            if (2 != i.data.fa_type && "" == i.data.text && 0 == i.startX) return $Toast({
                                content: "内容不能为空"
                            }), void i.setData({
                                is_submit: !1
                            });
                            a.title = i.data.title_value, a.color = i.data.title_color, a.content = i.data.text, 
                            a.img_arr = i.data.img_arr, a.uid = s.uid, a.token = s.token, a.openid = s.openid, 
                            a.is_open = 0 == i.data.is_open ? 1 : 0, a.type = i.data.fa_type, a.fa_class = i.data.fa_class, 
                            a.mch_id = app.siteInfo.uniacid, a.file_ss = i.data.file_ss, a.user_file = "", a.position_name = i.data.position_name, 
                            a.position = i.data.position, a.address_latitude = i.data.address_latitude, a.address_longitude = i.data.address_longitude, 
                            i.data.red_paper && (a.red_paper = 1 == i.data.red_paper ? 1 : 0, a.red_type = i.data.red_type, 
                            a.zong_red_count = i.data.zong_red_count, a.zong_red_money = i.data.zong_red_money), 
                            i.data.money_paper && (a.money_paper = 1 == i.data.money_paper ? 1 : 0, a.zong_paper_money = i.data.money), 
                            i.add_submit(a), $Toast.hide();
                        }
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
        $Toast({
            content: "所需余额不足"
        });
    },
    add_submit: function(t) {
        var e = this, a = app.api_root + "User/add_circle";
        http.POST(a, {
            params: t,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg,
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 2e3)) : (e.setData({
                    is_submit: !1
                }), $Toast({
                    content: t.data.msg,
                    duration: 0
                })), setTimeout(function() {
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
    get_text_len: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
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