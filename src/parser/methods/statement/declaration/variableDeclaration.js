const {TokenType, ThisExpression, MemberExpression, VariableDeclarator} = require("../../../../type");
const variableDeclaration = function () {
    // variableDeclaration:
    // (this .)? Identifier typeModification? Initialiser?

    let id = null
    if (this.current().type === TokenType.this) {
        // 如果当前定义的变量是 this 开头的
        // 要先吃掉 this 和 .
        this.eat('this')
        this.eat('.')
        let property = this.identifier() // 拿到定义的变量的 ast
        let object = new ThisExpression()
        id = new MemberExpression(object, property)
    } else {
        id = this.identifier()
    }

    // let varType = undefined
    // if (this.current().value === ':') {
    //     // 标注了类型
    //     varType = this.typeModification()
    // }

    let init = null
    let t = this.current()
    if (t.type === TokenType.assign) {
        // initialiser:
        // '=' singleExpression
        this.eat('=')
        init = this.singleExpression()
    }
    // let v = new VariableDeclarator(id, init, varType)
    let v = new VariableDeclarator(id, init)

    return [v]
}

module.exports = {
    variableDeclaration,
}