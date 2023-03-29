const visitBlockStatement = function (node) {
    // console.log('node', node.body)
    this.scope.enterBlock(node.type)
    let l = ['{']
    for (let b of node.body) {
        let s = this.scope.tab + this.visit(b)
        l.push(s)
    }
    // } 的缩进要少 4
    let s1 = this.scope.tab.slice(0, -4) + '}'
    l.push(s1)
    let s = l.join('\n')
    this.scope.leaveBlock()
    // log('visitBlockStatement')
    return s
}

module.exports = {
    visitBlockStatement,
}