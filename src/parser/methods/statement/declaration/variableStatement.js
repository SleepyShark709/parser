const {TokenType, VariableDeclaration} = require("../../../../type");
const variableStatement = function () {
    // variableStatement:
    // (con | const | var) variableDeclaration:

    let t = this.current() // 拿到当前的 token
    // 变量类型支持 con var const let 四种
    if (t.type === TokenType.con) {
        this.eat('con')
    } else if (t.type === TokenType.var) {
        this.eat('var')
    } else if (t.type === TokenType.const) {
        this.eat('const')
    } else if (t.type === TokenType.let) {
        this.eat('let')
    } else {
        throw ('错误类型')
    }
    // 如果有 : 则是类型声明
    // let type = undefined
    // if (this.current().value === ':') {
    //     type = this.typeModification()
    // }
    let declarations = this.variableDeclaration() // 组成变量声明 ast
    // let v = new VariableDeclaration(t, declarations, type)
    let v = new VariableDeclaration(t, declarations)
    return v
}
module.exports = {
    variableStatement,
}