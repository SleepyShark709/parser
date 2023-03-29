const visitFunctionExpression = function (node) {
    let p = []
    // function(a:number, b:number) {}
    // log('visitFunctionExpression', node)
    // 参数的作用域是函数体
    // 这里为了方便，直接在外再加一层作用域
    this.scope.enterBlock(node.type)
    for (let param of node.params) {
        // 代码生成包含参数的类型和参数值
        let s1 = this.typeTranspile(param.varType)
        let s2 = this.visit(param)
        p.push(s1 + s2)
        // 函数参数定义
        // log('par', param)
        this.scope.define(param.name, param.varType)
    }
    let s1 = p.join(', ')
    // 给当前作用域加上返回值类型
    // 目的是在 returnStatement 里用
    this.scope.top()['returnVarType'] = node.varType.returnVarType
    let body = this.visit(node.body)
    let s = `(${s1}) ${body}`
    // log('s is', s)
    this.scope.leaveBlock()
    return s
}


module.exports = {
    visitFunctionExpression,
}