const visitExpressionStatement = function (node) {
    let expression = node.expression
    let s = this.visit(expression)
    // c 语言的结尾要加分号
    s += ';'
    return s
}

module.exports = {
    visitExpressionStatement,
}