const {wrapCreate} = require("../../../js2c_container");
const visitCallExpression = function (node) {
    let s1 = this.visit(node.callee)
    let l = []
    for (let arg of node._arguments) {
        let a = this.visit(arg)
        if (arg.type === 'Literal') {
            // 如果是 'a' 这种类型，要包一层
            a = wrapCreate(arg)
        }
        l.push(a)
    }
    let s2 = l.join(',')
    // log('call node', node.callee)
    // 如果是特殊的函数调用，替换成自己的内置 api
    if (s1 === 'log') {
        s1 = 'GuaLog'
    }
    let s = s1 + '(' + s2 + ')'
    return s
}

module.exports = {
    visitCallExpression,
}