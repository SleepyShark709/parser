const visitIfStatement = function (node) {
    let test = this.visit(node.test)
    let consequent = this.visit(node.consequent)
    let alternate = this.visit(node.alternate)
    let s = `if (${test}) ${consequent}`
    if (alternate !== '') {
        // 有 else
        s += ` else ${alternate}`
    }
    return s
}

module.exports = {
    visitIfStatement,
}