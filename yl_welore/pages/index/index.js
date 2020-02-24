function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), http = require("../../util/http.js"), index_page = 1, index_my_page = 1, _require = require("../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        tabbar: {},
        copyright: {},
        isIpx: app.globalData.isIpx,
        user_info: {},
        home_current: "home",
        http_root: app.http_root,
        visible: !1,
        actions_name: "按发帖时间",
        actions: [ {
            name: "按发帖时间",
            type: "fatie"
        }, {
            name: "按最后回帖时间",
            type: "huifu"
        } ],
        new_list: [],
        show: !0,
        inputShowed: !1,
        inputVal: "",
        current: "tab1",
        nvabarData: {
            showCapsule: 0,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        di_msg: !1,
        ad_info: {},
        diy: {},
        version: 0,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: "",
        order_time: "fatie",
        images: [],
        swiperCurrent: 0,
        purchase_paper_mod: !1,
        money: 0,
        money_id: 0,
        money_index: 0,
        home_list: [],
        currentData: 0,
        admin: 0,
      url1:"https://bbs.yijinshe.cn",
        url2:'https://www.zhinizh.com',
        url3:"https://juejin.im"
    },
    bindchange: function(t) {
        this.setData({
            currentData: t.detail.current
        });
    },
    checkCurrent: function(t) {
        if (this.data.currentData === t.target.dataset.current) return !1;
        this.setData({
            currentData: t.target.dataset.current
        });
    },
    onParentEvent: function(t) {
        wx.pageScrollTo ? (wx.pageScrollTo({
            scrollTop: 0
        }), this.onLoad()) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    purchase_paper: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.money, n = t.currentTarget.dataset.index;
        this.setData({
            money: a,
            money_id: e,
            purchase_paper_mod: !0,
            money_index: n
        });
    },
    do_paper_money: function() {
         var new_cache=app.getCache("userinfo");
       if(!(new_cache && new_cache.token)){
         wx.navigateTo({
                url: "/yl_welore/pages/author/index?type=0"
            })
            return;
       }
        var t = app.api_root + "User/do_paper_money", n = this, e = app.getCache("userinfo"), a = new Object();
        a.token = e.token, a.openid = e.openid, a.much_id = app.siteInfo.uniacid, a.money_id = this.data.money_id, 
        a.money = this.data.money, http.POST(t, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    var e;
                    $Toast({
                        content: t.data.msg
                    });
                    var a = "new_list[" + n.data.money_index + "].purchase";
                    n.setData((_defineProperty(e = {}, a, "1"), _defineProperty(e, "purchase_paper_mod", !1), 
                    e));
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
    imageLoad: function(t) {
        var e = t.detail.width / t.detail.height;
        if (console.log(e), 1 < e) var a = 345, n = 345 / e; else a = 150, n = 150 / e;
        var i = this.data.images;
        i[t.target.dataset.index] = {
            width: a,
            height: 300 < n ? 300 : n
        }, console.log(n), this.setData({
            images: i
        });
    },
    handleCancel: function(t) {
        t.currentTarget.dataset.user_id, this.data.actions1, this.data.info;
        this.setData({
            visible: !0
        });
    },
    handleCancel1: function() {
        this.setData({
            visible: !1
        });
    },
    handleClickItem1: function(t) {
        var e = t.detail.index, a = this.data.actions[e];
        console.log(a), this.setData({
            visible: !1,
            order_time: a.type,
            actions_name: a.name
        });
        var n = new Object();
        n.type = a.type, n.name = a.name, app.setCache("order_actions", n);
        app.getCache("order_actions");
        index_page = 1, this.get_index_list_one();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key
        });
    },
    hideModal: function() {
        this.setData({
            home_pl_check: !1,
            purchase_paper_mod: !1
        });
    },
    init:function(){
        this.setData({
            flag:0
        })

        app.removeCache("userinfo");
    },
    get_user_info: function() {
        var that=this
         var new_cache=app.getCache("userinfo");
       if(!(new_cache && new_cache.token)){
        
            return;
       }
        var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, http.POST(t, {
            params: n,
            success: function(t) {
                // console.log(t), "success" == t.data.status ? e.setData({
                //     user_info: t.data.info
                // }) : $Toast({
                //     content: t.data.msg
                // });
                 if("success" == t.data.status ){
                    that.setData({
                    user_info: t.data.info,
                    flag: 1 == t.data.info.is_sign
                }) 
                }else{
                    that.init();
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
    home_pl_cai: function(t) {
        this.setData({
            home_pl_text: t.detail.value
        });
    },
    do_user_pl: function() {
       var new_cache=app.getCache("userinfo");
        if(!(new_cache && new_cache.token)){
             wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=0"
                })
                return;
           }
        if ("" != this.data.home_pl_text) {
            
           
            wx.showLoading({
                title: "评论中...",
                mask: !0
            });
            var a = this, t = app.getCache("userinfo"), e = new Object();
            e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
            e.text = this.data.home_pl_text, e.id = this.data.pl_id, e.reply_type = 0;
            var n = app.api_root + "User/add_paper_reply";
            http.POST(n, {
                params: e,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), a.hideModal();
                        var e = a.data.new_list;
                        e[a.data.pl_key].study_repount = parseInt(e[a.data.pl_key].study_repount) + 1, a.setData({
                            new_list: e
                        }), wx.hideLoading();
                    } else {
                        if(t.data.msg=="账户未授权!"){
                           that.init();
                        }else{
                             $Toast({
                                content: t.data.msg
                            });
                        }
                    };
                    wx.hideLoading();
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
            content: "内容不能为空！"
        });
    },
    goNav:function(e){
      
      var url=e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
      })
    },
    preventTouchMove: function() {},
    get_ad: function() {
        var that=this;
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid;
        var n = app.api_root + "User/get_ad";
        http.POST(n, {
            params: a,
            success: function(t) {
               
               if("账户未授权!" == t.data.msg){
                  that.init();
                  return
               }

                console.log(t), "账户未授权!" == t.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=0"
                }), "success" == t.data.status ? e.setData({
                    ad_info: t.data.info,
                    sw_info: t.data.info_sw
                }) : console.log(t.data.msg);
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
    rotate3d: function(e) {
        var a = this, t = a.data.new_list, n = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (a.animation_zan = n).rotate3d(0, 1, 0, 180).step(), t[e].animationData_zan = n.export(), 
        a.setData({
            new_list: t
        }), setTimeout(function() {
            var t = a.data.new_list;
            n.rotate3d(0, 1, 0, 0).step(), t[e].animationData_zan = n.export(), a.setData({
                new_list: t
            });
        }, 100);
    },
    handleChange: function(t) {
        var e = t.currentTarget.dataset.key;
        if(e=="tab2"){
            // 检测是否登录
            var t = app.getCache("userinfo")
            if(!(t && t.token)){
                wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=0"
                })
                return;
            }
           
        }
        console.log(e), $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            new_list: []
        }), index_my_page = index_page = 1, "tab2" == e && this.get_my_index_list(), "tab1" == e && this.get_index_list_one(), 
        this.setData({
            current: e,
            di_msg: !1
        });
    },
    onLoad: function(t) {
        var e;
        (this.setData({
            height: app.globalData.height,
            design: app.globalData.design
        }), e = app.getCache("order_actions")) ? this.setData({
            actions_name: e.name
        }) : ((e = new Object()).type = "fatie", e.name = "按发帖时间", app.setCache("order_actions", e));
        index_page = 1, "tab1" == this.data.current && this.get_index_list_one(), "tab2" == this.data.current && this.get_my_index_list();
    },
    onShow: function() {
        wx.hideTabBar(), this.authority(), app.check_user_status();
        var t = app.getCache("userinfo");
        this.setData({
            design: app.globalData.design,
           uid: t && t.token?t.uid:0
        }), 0 != this.data.show && ($Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }),this.get_diy(),$Toast.hide());

        // 在分享进入页面 调用get_user_info

        if(t && t.token){
            this.get_user_info()
            this.get_ad()
        }

        

    },
    authority: function() {
        var t = app.api_root + "User/get_authority", e = this, a = app.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, n.much_id = app.siteInfo.uniacid, http.POST(t, {
            params: n,
            success: function(t) {
                e.setData({
                    copyright: t.data
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
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), n = new Object();
        n.uid = a.uid, n.token = a.token, n.openid = a.openid, n.much_id = app.siteInfo.uniacid, 
        n.version = app.version, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), e.setData({
                    version: t.data.version,
                    title: t.data.home_title,
                    admin: t.data.admin
                }), wx.setStorageSync("is_diy", t.data), console.log(app.getCache("is_diy")), app.editTabbar();
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
        var new_cache=app.getCache("userinfo");
       if(!(new_cache && new_cache.token)){
         wx.navigateTo({
                url: "/yl_welore/pages/author/index?type=0"
            })
            return;
       }
        
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.key, n = app.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.id = e, i.uid = n.uid, i.much_id = app.siteInfo.uniacid, 
        i.applaud_type = 0, i.zan_type = 1 == this.data.new_list[a].is_info_zan ? 1 : 0;
        var o = this.data.new_list;
        console.log(o[a].info_zan_count_this - 1), wx.vibrateShort();
        var s, c, r = "new_list[" + a + "].is_info_zan", d = "new_list[" + a + "].info_zan_count_this";
        0 == o[a].is_info_zan ? this.setData((_defineProperty(s = {}, r, !0), _defineProperty(s, d, o[a].info_zan_count_this + 1), 
        s)) : this.setData((_defineProperty(c = {}, r, !1), _defineProperty(c, d, o[a].info_zan_count_this - 1), 
        c));
        this.rotate3d(a);
        var p = app.api_root + "User/add_user_zan";
        http.POST(p, {
            params: i,
            success: function(t) {

                if(t.data.msg=="账户未授权!"){
                    that.init();
                    return
                }
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
    get_index_list_one: function() {
       var that=this;
        var t = app.api_root + "User/get_index_list", e = this, a = app.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, n.uid = a.uid, n.much_id = app.siteInfo.uniacid, 
        n.version = app.version;
        var i = app.getCache("order_actions");
        n.order_time = i ? i.type : this.data.order_time, n.index_page = 1, http.POST(t, {
            params: n,
            success: function(t) {

                if(t.data.msg=="账户未授权!"){
                    that.init();
                    return
                }
                console.log(t), "success" == t.data.status ? (e.setData({
                    new_list: t.data.info,
                    home_list: t.data.home_list
                }), $Toast.hide()) : $Toast({
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
    get_my_index_list: function() {
         var new_cache=app.getCache("userinfo");
       if(!(new_cache && new_cache.token)){
         wx.navigateTo({
                url: "/yl_welore/pages/author/index?type=0"
            })
            return;
       }
        var t = app.api_root + "User/get_my_index_list", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.index_page = index_my_page, n.much_id = app.siteInfo.uniacid, 
        n.version = app.version, n.uid = e.uid;
        var i = a.data.new_list;
        http.POST(t, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) i.push(t.data.info[e]);
                    a.setData({
                        new_list: i
                    }), 0 == t.data.info.length && a.setData({
                        di_msg: !0
                    }), $Toast.hide();
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
    get_index_list: function() {
        var t = app.api_root + "User/get_index_list", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.index_page = index_page, n.much_id = app.siteInfo.uniacid, 
        n.version = app.version;
        var i = app.getCache("order_actions");
        n.order_time = i ? i.type : this.data.order_time;
        var o = a.data.new_list;
        http.POST(t, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) o.push(t.data.info[e]);
                    a.setData({
                        new_list: o
                    }), 0 == t.data.info.length && a.setData({
                        di_msg: !0
                    }), $Toast.hide();
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
        var e = t.target.dataset.src, a = t.target.dataset.id;
        wx.previewImage({
            current: e,
            urls: this.data.new_list[a].image_part
        });
    },
    play: function(t) {
        for (var e = this, a = this.data.new_list, n = 0; n < a.length; n++) a[n].is_voice = !1;
        this.setData({
            new_list: a
        });
        var i = t.currentTarget.dataset.key;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), a[i].is_voice = !0, 
        this.setData({
            new_list: a,
            new_list_index: i
        }), innerAudioContext.onEnded(function(t) {
            a[i].is_voice = !1, e.setData({
                new_list: a
            });
        });
    },
    stop: function(t) {
        innerAudioContext.stop();
        var e = t.currentTarget.dataset.key, a = this.data.new_list;
        a[e].is_voice = !1, this.setData({
            new_list: a
        });
    },
    onPullDownRefresh: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), "tab1" == this.data.current && this.get_index_list_one(), "tab2" == this.data.current && (index_my_page = 1, 
        this.get_my_index_list()); 

       
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (index_page++, this.get_index_list()), "tab2" == this.data.current && (index_my_page++, 
        this.get_my_index_list()), $Toast.hide();
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