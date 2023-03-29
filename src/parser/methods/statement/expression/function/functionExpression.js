const {TokenType, FunctionType, FunctionExpression} = require("../../../../../type");
const functionExpression = function () {
    // functionDeclaration:
    // Function '(' formalParameterList? ')' (typeModification)?  statement
    this.eat('function') // 先把 function 吃掉
    let id = null
    this.eat('(') // 再把 ( 吃掉
    let params = []
    if (this.current().type === TokenType.identifier) {
        // 如果当前的 token 是变量名，说明有参数
        params = this.formalParameterList()
    }
    this.eat(')') // 结束函数参数
    // 如果有 :，说明有类型标注
    let returnType = undefined
    if (this.current().value === ':') {
        returnType = this.typeModification() // 类型处理
    }
    let type = new FunctionType(params, returnType) // 构建 ast 参数
    let body = this.statement() // 处理函数体
    let f = new FunctionExpression(body, params, id, type) // 构建函数表达式的 ast
    return f
}
module.exports = {
    functionExpression,
}