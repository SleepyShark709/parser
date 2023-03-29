const visitAssignmentPattern = function (node) {
    let left = this.visit(node.left)
    let right = this.visit(node.right)
    let s = this.concatWithSpace(left, '=', right)
    return s
}

module.exports = {
    visitAssignmentPattern,
}