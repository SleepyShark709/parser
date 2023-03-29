const visitForStatement = function (node) {
    //
    // log('visitForStatement', node)
    this.scope.enterBlock(node.type)
    let init = this.visit(node.init)
    let test = this.visit(node.test)
    let update = this.visit(node.update)
    let body = this.visit(node.body)
    this.scope.leaveBlock()
    // let s = 'for(' + test + ')' + body
    let s = `for (${init}${test};${update}) ${body}`
    return s
}

module.exports = {
    visitForStatement,
}