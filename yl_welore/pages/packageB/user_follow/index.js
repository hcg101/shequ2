var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "关注的人",
            height: 2 * app.globalData.height + 20
        },
        page: 1,
        info: []
    },
    onLoad: function(t) {
        var a = app.getCache("userinfo");
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            id: t.id,
            uid: a.uid,
            type: t.type
        }), 1 == t.type && this.setData({
            nvabarData: {
                showCapsule: 0,
                title: "关注的人",
                height: 2 * app.globalData.height + 20
            },
            msg: "没有关注任何人"
        }), 2 == t.type && this.setData({
            nvabarData: {
                showCapsule: 0,
                title: "粉丝",
                height: 2 * app.globalData.height + 20
            },
            msg: "一个粉丝也没有"
        });
    },
    onShow: function() {
        this.setData({
            page: 1,
            info: []
        }), this.get_follow_fansi();
    },
    get_follow_fansi: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.uid = this.data.id, a.much_id = app.siteInfo.uniacid, 
        a.page = e.data.page, a.type = e.data.type;
        var i = app.api_root + "User/get_follow_fansi", o = e.data.info;
        http.POST(i, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var a = 0; a < t.data.info.length; a++) o.push(t.data.info[a]);
                    e.setData({
                        info: o,
                        num: t.data.num
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
        }), this.get_follow_fansi(), $Toast.hide();
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