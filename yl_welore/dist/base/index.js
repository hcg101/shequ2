function getCtx(e) {
    var t = getCurrentPages(), o = t[t.length - 1].selectComponent(e);
    return o || (console.error("无法找到对应的组件，请按文档说明使用组件"), null);
}

function Toast(e) {
    var t = e.selector;
    getCtx(void 0 === t ? "#toast" : t).handleShow(e);
}

function Message(e) {
    var t = e.selector;
    getCtx(void 0 === t ? "#message" : t).handleShow(e);
}

Toast.hide = function() {
    getCtx(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#toast").handleHide();
}, module.exports = {
    $Toast: Toast,
    $Message: Message
};