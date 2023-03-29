const {wrapCreate} = require("../../../js2c_container");
const visitNewExpression = function (node) {
    // new Student('hui')
    // Student_new('hui')
    // log('noe', node)
    let {callee, _arguments} = node
    let s1 = this.visit(callee) + '_new'
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
    let s = `${s1}(${s2})`
    // log('s is', s)
    return s
}

module.exports = {
    visitNewExpression,
}