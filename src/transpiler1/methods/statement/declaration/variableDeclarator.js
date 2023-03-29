const {wrapCreate} = require("../../../js2c_container");

const visitVariableDeclarator = function (node) {
    // log('visitVariableDeclarator', node, node.id, node.init)
    // log('visitVariableDeclarator', node.varType)

    let s = ''
    let varType = node.id.varType

    let id = this.visit(node.id)
    let init = this.visit(node.init)

    // 定义过的变量类型加入到作用域中
    // log('init is', node.init, varType)
    this.scope.define(id, varType)

    if (typeof varType === 'string') {
        // 是基本类型
        if (node.init.type === 'Literal') {
            s = `${id} = ${wrapCreate(node.init)}`
        } else {
            s = `${id} = ${init}`
        }
    } else if (varType.type === 'Generics') {
        // 范型
        let {name, parameters} = varType
        // log('pa', parameters)
        if (name === 'Array') {
            // 数组 [1, 2, 3] -> add(l, 1);add(l, 2);add(l, 3);
            // log('init', init, typeof init)
            s = init.map(n => {
                let r = `GuaArray_add(${id}, ${n});`
                return r
            }).join('\n')
        } else if (name === 'Record') {
            // 是字典
            // log('id is', id, init)
            // {'k': v} -> GuaMap_put('k', v)
            s = init.map(n => {
                let [k, v] = n
                // log('n is', k, v)
                let r = `GuaMap_put(${id}, ${k}, ${v});`
                return r
            }).join('\n')
        } else {
            throw `范型${varType.name}`
        }
    } else if (varType.type === 'FunctionType') {
        // 函数
        s = `${this.visit(node.id)} ${this.visit(node.init)}`
    } else if (varType.type === 'InstanceType') {
        // new Student()
        s = `${id} = ${init}`
    } else {
        throw `${varType.type}`
    }
    return s
}

module.exports = {
    visitVariableDeclarator,
}