var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        navLeftItems: [],
        navRightItems: [],
        curNav: -1,
        di_msg: !0,
        page: 1
    },
    lower: function() {
        this.setData({
            page: this.data.page + 1
        }), 0 < this.data.curNav && this.get_right_item();
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            title: "全部" + app.globalData.design.landgrave,
            design: app.globalData.design
        }), this.get_left_needle(), this.get_right_item();
    },
    onShow: function() {},
    add_trailing: function(t) {
        var e = this, n = t.currentTarget.dataset.index, a = t.currentTarget.dataset.id, i = app.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.uid = i.uid, s.much_id = app.siteInfo.uniacid, 
        s.tory_id = a, s.is_trailing = 0;
        var o = app.api_root + "User/set_user_trailing";
        http.POST(o, {
            params: s,
            success: function(t) {
                if ("success" == t.data.status) {
                    var a = e.data.navRightItems;
                    a[n].is_trailing = !0, e.setData({
                        navRightItems: a
                    }), $Toast({
                        content: t.data.msg
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
    get_left_type: function(t) {
        this.setData({
            curNav: t.currentTarget.dataset.id,
            page: 1,
            navRightItems: []
        }), this.get_right_item();
    },
    get_left_needle: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid;
        var n = app.api_root + "User/get_left_needle";
        http.POST(n, {
            params: e,
            success: function(t) {
                "success" == t.data.status ? a.setData({
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
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.uid = t.uid, a.much_id = app.siteInfo.uniacid, 
        a.get_id = e.data.curNav, a.page = e.data.page;
        var n = app.api_root + "User/get_right_needle", i = e.data.navRightItems;
        http.POST(n, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var a = 0; a < t.data.info.length; a++) i.push(t.data.info[a]);
                    e.setData({
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
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/square/index",
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
            path: "/yl_welore/pages/square/index",
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