var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        tabbar: {},
        user_info: {},
        goods_current: "goods",
        current_scroll: "0",
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        page: 1,
        type_list: [],
        type_id: "",
        shop_list: [],
        di_msg: !1,
        show: !0,
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 0,
        flag:1
    },
    get_user_info: function() {
        var that=this;
        var t = app.api_root + "User/get_user_info", a = this, e = app.getCache("userinfo"), s = new Object();
        s.token = e.token, s.openid = e.openid, http.POST(t, {
            params: s,
            success: function(t) {
                  var new_cache=app.getCache("userinfo");
               if(!(new_cache && new_cache.token)){
                
                    return;
               }
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info
                }) : that.init() ;
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
        var t = app.api_root + "User/get_diy", a = this, e = app.getCache("userinfo"), s = new Object();
        s.token = e.token, s.uid = e.uid, s.openid = e.openid, s.uid = e.uid, s.much_id = app.siteInfo.uniacid, 
        s.version = app.version, http.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), a.setData({
                    version: t.data.version,
                    diy: t.data
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
     gonav:function(){
         wx.navigateTo({
                url: "/yl_welore/pages/author/index?type=0"
            })
    },
    onLoad: function(t) {

         var new_cache=app.getCache("userinfo");
       if(!(new_cache && new_cache.token)){
         this.setData({
             flag:0,
          })
       }
        this.setData({
            height: app.globalData.height,
            title:app.globalData.design.currency? app.globalData.design.currency + "商城":"商城"
        }), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_type();
    },
    handleChangeScroll: function(t) {
        var a = t.detail;
        this.setData({
            current_scroll: a.key,
            type_id: this.data.type_list[a.key].id
        }), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_list();
    },
    onShow: function() {
        wx.hideTabBar(), app.editTabbar(), this.get_diy(), this.setData({
            isPopping: !1,
            copyright: app.globalData.copyright
        }), this.data.show;
    },
    init:function(){
        this.setData({
            flag:0
        })

        app.removeCache("userinfo");
    },
    get_shop_type: function() {
        var that=this;
        var t = app.api_root + "User/get_shop_type", a = this, e = app.getCache("userinfo"), s = new Object();
        s.token = e.token, s.openid = e.openid, s.uid = e.uid, s.much_id = app.siteInfo.uniacid, 
        http.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (0 < t.data.info.length && (a.setData({
                    type_id: t.data.info[0].id
                }), a.get_shop_list()), a.setData({
                    type_list: t.data.info,
                    user: t.data.user
                })) : t.data.msg== '账户未授权!'?
                  that.init()
                : $Toast({
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
    get_shop_list: function() {
        var that=this;
        var t = app.api_root + "User/get_shop_list", e = this, a = app.getCache("userinfo"), s = new Object();
        s.token = a.token, s.openid = a.openid, s.much_id = app.siteInfo.uniacid, s.type_id = this.data.type_id, 
        s.page = this.data.page;
        var i = e.data.shop_list;
        http.POST(t, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && e.setData({
                        di_msg: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) i.push(t.data.info[a]);
                    e.setData({
                        shop_list: i
                    });
                } else{

                    if(t.data.msg=="账户未授权!"){
                       that.init();
                    }else{
                         $Toast({
                            content: t.data.msg
                        });
                    }
                    
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
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_shop_list(), $Toast.hide();
    },
    onPullDownRefresh: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_list(), $Toast.hide();
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