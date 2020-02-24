var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "申请列表",
            height: 2 * app.globalData.height + 20
        },
        page: 1,
        user_list: [],
        envite: !1,
        ins_id: ""
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            page: 1,
            id: t.id
        }), this.get_my_rec();
    },
    onShow: function() {},
    get_my_rec: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
        a.id = this.data.id, a.page = this.data.page;
        var i = app.api_root + "User/get_user_territory_interest";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_list: t.data.info
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
    envite_sulord: function(t) {
        this.setData({
            envite: !0,
            ins_id: t.currentTarget.dataset.id,
            data_key: t.currentTarget.dataset.key
        });
    },
    hideModal: function() {
        this.setData({
            envite: !1
        });
    },
    add_envite_sulord: function() {
        this.hideModal(), wx.showLoading({
            title: "操作中...",
            mask: !0
        });
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
        a.id = this.data.ins_id, a.status = this.data.data_key;
        var i = app.api_root + "User/add_territory_interest";
        http.POST(i, {
            params: a,
            success: function(t) {
                "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), e.get_my_rec()) : $Toast({
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
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_rec(), $Toast.hide();
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