const {TokenType, FunctionDeclaration} = require("../../../../type");
const functionDeclaration = function () {
    // functionDeclaration:
    // Function Identifier? '(' formalParameterList? ')' (typeModification)?  statement
    this.eat('function') // 先把函数声明的关键字吃了
    let id = null
    if (this.current().type === TokenType.identifier) {
        // 如果当前的 token 的类型是一个字母
        id = this.identifier() // 那么当前就不是一个匿名函数，而是一个具名函数，id 就是当前的函数名
    }
    this.eat('(') // 函数声明后面必须是一个 (，这里吃掉
    let params = []
    // 如果当前的 token 是一个字母，那么就是一个参数列表
    if (this.current().type === TokenType.identifier) {
        // 定义参数列表
        params = this.formalParameterList()
    }
    this.eat(')')
    // 如果有 :，说明有类型标注
    let type = undefined
    if (this.current().value === ':') {
        // 定义类型参数
        type = this.typeModification()
    }

    // 定义函数体
    let body = this.statement()
    let f = new FunctionDeclaration(body, params, id, type) // 组成 函数的 ast
    return f
}
module.exports = {
    functionDeclaration,
}