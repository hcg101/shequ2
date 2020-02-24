var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        show: !0,
        nvabarData: {
            showCapsule: 1,
            title: "我的收藏",
            height: 2 * app.globalData.height + 20
        },
        delBtnWidth: 180,
        list: [],
        page: 1,
        di_msg: !1
    },
    onLoad: function(t) {
        var a = app.getCache("userinfo");
        this.setData({
            height: app.globalData.height,
            uid: a.uid,
            page: 1
        }), this.get_user_collection();
    },
    onShow: function() {},
    cancel: function(t) {
        var e = t.currentTarget.dataset.key, a = app.api_root + "User/get_user_cancel", s = this, i = app.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.much_id = app.siteInfo.uniacid, n.uid = this.data.list[e].user_id, 
        n.this_uid = this.data.uid, n.is_user = this.data.list[e].is_user, http.POST(a, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    $Toast({
                        content: t.data.msg
                    });
                    var a = s.data.list;
                    a[e].is_user = 1 == a[e].is_user ? 0 : 1, s.setData({
                        list: a
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
    get_user_collection: function() {
        var t = app.api_root + "User/get_user_collection", e = this, a = app.getCache("userinfo"), s = new Object();
        s.token = a.token, s.openid = a.openid, s.much_id = app.siteInfo.uniacid, s.uid = a.uid, 
        s.page = this.data.page;
        var i = e.data.list;
        http.POST(t, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && e.setData({
                        di_msg: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) i.push(t.data.info[a]);
                    e.setData({
                        list: i
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
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_user_collection(), $Toast.hide();
    },
    delItem: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.list;
        e.splice(a, 1), this.setData({
            list: e
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