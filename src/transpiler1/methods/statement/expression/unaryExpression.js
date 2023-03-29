const {wrapValue} = require("../../../js2c_container");
const visitUnaryExpression = function (node) {
    if (node.prefix) {
        // 操作符在前
        let op = node.operator.value
        let arg = this.visit(node._argument)
        let s = this.concatWithSpace(op, arg)
        if (op === '-') {
            // -1 这种类型
            // log('arg ', arg)
            s = op + wrapValue(arg, this.scope)
        }
        return s
    } else {
        throw ('error')
    }
}

module.exports = {
    visitUnaryExpression,
}