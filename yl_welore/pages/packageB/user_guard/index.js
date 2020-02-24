function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page(_defineProperty({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "我的守护榜",
            height: 2 * app.globalData.height + 20
        },
        page: 1,
        info: []
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            id: t.id
        }), this.get_user_guard();
    },
    onShow: function() {},
    get_user_guard: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.uid = this.data.id, a.much_id = app.siteInfo.uniacid;
        var n = app.api_root + "User/get_user_guard";
        http.POST(n, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    info: t.data.info
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
    onShareAppMessage: function() {},
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
}, "onShareAppMessage", function() {
    var t = app.globalData.forward;
    return this.setData({
        show: !1
    }), t ? {
        title: t.title,
        path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
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
        path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
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
}));