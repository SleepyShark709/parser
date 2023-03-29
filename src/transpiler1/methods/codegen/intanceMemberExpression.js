const {wrapCreate} = require("../../js2c_container");
const gen_instanceMemberExpression = function (node) {
    // 可能是下面的几种情况
    // 1，this.name
    // 2，let r = new Student('hui', 169)
    //    r.logInfo()
    // 3，this.logInfo()
    // log('node is', node)
    let {object, property} = node
    let structName = object.varType.classType.name
    let o = this.visit(object)
    if (o === 'this') {
        // 把 this 替换成增加的函数参数，参数名写死是 _this
        o = '_this'
    }
    if (property.type === 'CallExpression') {
        // r.logInfo() => Student_logInfo(r)
        // 访问类的实例方法
        let {callee, _arguments} = property
        let s1 = `${structName}_` + this.visit(callee)
        let l = [o]
        for (let arg of _arguments) {
            let a = this.visit(arg)
            if (arg.type === 'Literal') {
                // 如果是 'a' 这种类型，要包一层
                a = wrapCreate(arg)
            }
            l.push(a)
        }
        let s2 = l.join(',')
        let s = `${s1}(${s2})`
        return s
    } else if (property.type === 'Identifier') {
        // this.name => _this.name
        // 访问类的实例属性
        let p = this.visit(property)
        let s = `${o}->${p}`
        // log('s is', s)
        return s
    } else {
        throw `${property.type}`
    }
}

module.exports = {
    gen_instanceMemberExpression,
}
