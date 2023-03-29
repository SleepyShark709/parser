const {WhileStatement} = require("../../../../type");
const whileStatement = function () {
    // whileStatement
    // While '(' expressionSequence ')' statement
    this.eat('while')
    this.eat('(')
    let test = this.expressionSequence() // 拿到 while 循环中的 单一表达式
    this.eat(')')
    let body = this.statement() // 拿到循环中的 表达式
    let w = new WhileStatement(test, body) // 组成 while 语句的 ast
    return w
}

module.exports = {
    whileStatement,
}