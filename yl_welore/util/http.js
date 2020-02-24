var requestHandler = {
    params: {},
    success: function(e) {},
    fail: function() {}
};

function GET(e, s) {
    request(e, "GET", s);
}

function POST(e, s) {
    request(e, "POST", s);
}

function request(e, s, t) {
    var u = t.params;
    wx.request({
        url: e,
        data: u,
        method: s,
        success: function(e) {
            t.success(e);
        },
        fail: function() {
            t.fail();
        },
        complete: function() {}
    });
}

module.exports = {
    GET: GET,
    POST: POST
};