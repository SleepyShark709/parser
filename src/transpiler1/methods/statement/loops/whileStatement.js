const visitWhileStatement = function (node) {
    let test = this.visit(node.test)
    let body = this.visit(node.body)
    let s = 'while(' + test + ')' + body
    return s
}

module.exports = {
    visitWhileStatement,
}