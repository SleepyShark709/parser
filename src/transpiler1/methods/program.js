const visitProgramNode = function (node) {
    let l = []
    let body = node.body
    for (let b of body) {
        let t = this.visit(b)
        l.push(t)
    }
    // log('l', l)
    let s = l.join('\n')
    return s
}

module.exports = {
    visitProgramNode,
}