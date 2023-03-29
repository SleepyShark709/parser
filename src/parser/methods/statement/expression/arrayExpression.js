const {singleExpressionTypes} = require("../../../../config");
const {ArrayExpression} = require("../../../../type");
const arrayExpression = function () {
    // arrayLiteral
    //     : '[' elementList? ']'
    this.eat('[') // 先吃掉 [
    let t = this.current() // 拿到当前的 token
    let elements = []
    if (singleExpressionTypes.includes(t.type)) {
        // 如果当前的 token 可能是 singleExpression（变量、字符串、数字、布尔值、this 以及 [）
        // elements 就是 [] 中所有元素的 ast 格式
        elements = this.elementList()
    }
    // 吃掉 ]
    this.eat(']')
    // 通过 elements 构建数组的 ast 对象
    let a = new ArrayExpression(elements)
    return a
}

module.exports = {
    arrayExpression,
}