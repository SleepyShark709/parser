const {ReturnStatement} = require("../../../../type");
const returnStatement = function () {
    // returnStatement:
    // return singleExpression?
    this.eat('return')
    let arg = []
    // 判断当前 token 有没有可能是 singleExpression
    if (this.is_current_singleExpression()) {
        // 如果是的话就是单一表达式
        arg = this.singleExpression()
    }
    let r = new ReturnStatement(arg)
    return r
}

module.exports = {
    returnStatement,
}