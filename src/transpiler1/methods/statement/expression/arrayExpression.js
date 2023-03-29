const {wrapCreate} = require("../../../js2c_container");
const visitArrayExpression = function (node) {
    let l = []
    for (let e of node.elements) {
        let t = this.visit(e)
        // ['abc' , 100] 要包成 [GuaString_new("abc") ,GuaNumber_newFloat(100)]
        if (e.type === 'Literal') {
            t = wrapCreate(e)
        }
        l.push(t)
    }
    // 这里就不拼成字符串了，交给 visitVariableDeclarator 去做
    // log('l is', l)
    return l
    // let s = '[' + l.join(', ') + ']'
    // return s
}
module.exports = {
    visitArrayExpression,
}