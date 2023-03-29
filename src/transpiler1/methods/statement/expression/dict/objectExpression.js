const {wrapCreate} = require("../../../../js2c_container");
const visitObjectExpression = function (node) {

    let l = []
    for (let property of node.properties) {
        // log('property', property)
        let {key, value} = property
        let k = this.visit(key)
        // 'abc' 要包成 GuaString_new("abc")
        if (key.type === 'Literal') {
            k = wrapCreate(key)
        }
        let v = this.visit(value)
        if (value.type === 'Literal') {
            v = wrapCreate(value)
        }
        let p = [k, v]
        l.push(p)
    }
    // 这里就不拼成字符串了，交给 visitVariableDeclarator 去做
    // log('l', l)
    return l
}

module.exports = {
    visitObjectExpression,
}