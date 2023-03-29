const {ForStatement} = require("../../../../type");
const forStatement = function () {
    // forStatement
    // '(' expressionSequence? ';' expressionSequence? ';' expressionSequence? ')' statement
    /**
     * 下面是一个简单的 for 循环例子
     * for (let i = 0; i < 10; i++) {
     * }
     * */
    this.eat('for')
    this.eat('(')
    let init = this.variableStatement() // for 循环中的 let i = 0
    this.eat(';')
    let test = this.singleExpression() // for 循环中的循环终止条件 i < 10
    this.eat(';')
    let update = this.singleExpression() // 单一表达式 i ++
    this.eat(')')
    let body = this.statement() // for 循环体中的内容
    let w = new ForStatement(init, test, update, body) // 组成 for 循环的内容
    return w
}
module.exports = {
    forStatement,
}