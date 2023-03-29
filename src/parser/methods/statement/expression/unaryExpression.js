const {UnaryExpression} = require("../../../../type");
const unaryExpression = function () {
    // 这里没什么说的 直接构建一元表达式的 ast
    // unaryExpression:
    // (not | - ) identifier
    let op = this.current() // 拿到当前的 token
    // log('op', op)
    this.index += 1
    let i = this.identifier()
    let u = new UnaryExpression(op, i)
    return u
}

module.exports = {
    unaryExpression,
}