const {FunctionType, Generics, InstanceType} = require("../../../type");
const {isInt, isFloat} = require("../../../util");

const inferFromMemberExpression = function (node) {
    // log('inferFromMemberExpression', node)
    // a.b
    let {object, property} = node
    let key = this.visit(object)
    let value = this.visit(property)
    // 拿到 a 的类型
    let v = this.scope.valueOf(key)
    // 补充一下
    node.object.varType = v
    let {type} = v
    if (type === 'ClassType') {
        // 是类的静态属性
        for (let i = 0; i < v.properties.length; i++) {
            let p = v.properties[i]
            if (p._static && p.name === value) {
                return p.varType
            }
        }
    }
    throw 'err'
}

const inferType = function (node) {
    let {type, raw} = node
    // log('node', node)
    if (type === 'FunctionExpression') {
        // 函数类型, 包含如参类型和返回值类型
        let paramsType = node.params.map(p => {
            if (p.varType !== undefined) {
                return p.varType
            } else {
                // 参数没标注类型的话就是 any
                p.varType = 'any'
                return 'any'
            }
        })
        if (node.varType.returnVarType === undefined) {
            // 返回类型没标注的话就是 any
            node.varType.returnVarType = 'any'
        }
        let o = new FunctionType(paramsType, node.varType.returnVarType)
        // log('o is', o)
        return o
    } else if (type === 'Literal') {
        if (isInt(raw) || isFloat(raw)) {
            return 'number'
        } else if (raw.startsWith('"') || raw.startsWith("'")) {
            return 'string'
        } else if (raw === 'true' || raw === 'false') {
            return 'boolean'
        } else {
            throw `raw is ${raw}`
        }
    } else if (type === 'ArrayExpression') {
        let {elements} = node
        let e = elements[0]
        // todo，这里搞简单点
        // 以第一个元素的类型作为判断依据
        let t = this.inferType(e)
        let o = new Generics('Array', [t])
        return o
    } else if (type === 'ObjectExpression') {
        // log('node', node)
        let {properties} = node
        // todo，这里搞简单点
        // 以第一个 property 的类型作为判断依据
        let property = properties[0]
        let {key, value} = property
        let keyType = this.inferType(key)
        let valueType = this.inferType(value)
        // todo, 算了，还是搞 any 吧
        valueType = 'any'
        let o = new Generics('Record', [keyType, valueType])
        return o
    } else if (type === 'NewExpression') {
        // new Student
        // 拿到类名 Student
        // 返回类型是 类的实例
        let {callee} = node
        if (callee.varType === undefined) {
            callee.varType = this.inferType(callee)
            // log('callee type', callee)
        }
        let i = new InstanceType(callee.varType)
        return i
    } else if (type === 'Identifier') {
        // 变量 a
        // 肯定之前定义过了，从作用域中拿
        let v = this.scope.valueOf(node.name)
        // log('infer Identifier', node.name, v)
        // this.scope.log()
        return v
    } else if (type === 'MemberExpression') {
        // a.b
        // log('node', node)
        return this.inferFromMemberExpression(node)
    }
    else {
        throw `node ${type}`
    }
}

module.exports = {
    inferType,
    inferFromMemberExpression,
}