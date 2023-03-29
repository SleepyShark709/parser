const visitClassExpression = function (node) {
    let superClass = this.visit(node.superClass)
    // log('node', node)
    this.scope.enterBlock()
    let l = ['{']
    for (let b of node.body) {
        let s = this.scope.tab + this.visit(b)
        l.push(s)
    }
    // } 的缩进要少 4
    let s1 = this.scope.tab.slice(0, -4) + '}'
    l.push(s1)
    let body = l.join('\n')
    let s = ''
    if (superClass === '') {
        s = `class ${body}`
    } else {
        s = `class extends ${superClass} ${body}`
    }
    this.scope.leaveBlock()
    this.current.pop()
    return s
}

module.exports = {
    visitClassExpression,
}