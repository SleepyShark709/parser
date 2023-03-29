const {ProgramNode} = require("../../type");
const program = function () {
    // Program: Statement*
    // Statement :
    //     BlockStatement
    //     VariableStatement
    //     EmptyStatement
    //     ExpressionStatement
    //     IfStatement
    //     Loops
    //          ForStatement
    //          ForInStatement
    //          WhileStatement
    //     Control flow
    //          ContinueStatement
    //          BreakStatement
    //          ReturnStatement
    // Declarations
    //          FunctionDeclaration
    //          VariableDeclaration
    //              VariableDeclarator
    // commentStatement
    let body = []
    while (this.index < this.tokens.length) {
        // 对 token 进行 parser 处理，然后 push 进 body 这个数组中
        let s = this.statement()
        body.push(s)
    }
    // 返回最外层的 program 对象
    let p = new ProgramNode(body)
    return p
}

module.exports = {
    program,
}