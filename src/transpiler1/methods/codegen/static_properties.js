const {wrapCreate} = require("../../js2c_container");
const gen_static_properties = function (properties, className) {
    // 如果是静态变量，现在的方案是把变量提到作用域外
    let r = properties.map(p => {
        // log('p is', p)
        let s1 = `${this.typeTranspile(p.key.varType)}${className}_${this.visit(p.key)}`
        let v = this.visit(p.value)
        if (p.value !== null && p.value.type === 'Literal') {
            v = wrapCreate(p.value, this.scope)
        }
        let s
        if (v === '') {
            s = `${s1};`
        } else {
            s = `${s1} = ${v};`
        }
        this.scope.define(this.visit(p.key), p.key.varType)
        return s
    }).join('\n')
    // log('r is', r)
    return r
}

module.exports = {
    gen_static_properties,
}