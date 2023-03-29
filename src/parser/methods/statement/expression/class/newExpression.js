const {NewExpression} = require("../../../../../type");
const newExpression = function () {
    // 这里也没什么说的 处理 new 表达式
    // newExpression:
    // new identifier _arguments
    this.eat('new')
    let callee = this.identifier()
    let _arguments = this._arguments() // 构建 class 表达式是里的 constructor 的参数
    let n = new NewExpression(callee, _arguments)
    return n
}
module.exports = {
    newExpression,
}