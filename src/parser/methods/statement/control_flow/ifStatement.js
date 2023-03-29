const {TokenType, IfStatement} = require("../../../../type");
const ifStatement = function () {
    // ifStatement:
    // If '(' expressionSequence ')' statement ( Else statement )?
    // 吃掉 if 和 （
    this.eat('if')
    this.eat('(')
    // if 内的表达式
    let test = this.expressionSequence()
    // 吃掉 ）
    this.eat(')')
    // if 中括号内的语句
    let consequent = this.statement()
    let alternate = null
    let t = this.current() // 拿到当前的 token
    // 如果当前的 token 是 else
    if (t && t.value === TokenType.else) {
        // 吃掉 else
        this.eat('else')
        // 继续走 else 后面的语句 可以是 if（也就是 else if 语句），也可以是 else 后面的 {} 语句
        alternate = this.statement()
    }
    let i = new IfStatement(test, consequent, alternate)
    return i
}

module.exports = {
    ifStatement,
}