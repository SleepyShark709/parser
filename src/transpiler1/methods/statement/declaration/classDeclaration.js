const {InstanceType} = require("../../../../type");

const sortClassbody = function (body) {
    let properties = {
        // 静态变量
        _static: [],
        // 非静态变量
        normal: [],
    }
    let methods = {
        _static: [],
        normal: [],
    }
    body.forEach(b => {
        // log('b is', b)
        if (b.type === 'ClassProperty') {
            if (b._static) {
                properties._static.push(b)
            } else {
                properties.normal.push(b)
            }
        } else if (b.type === 'ClassMethod') {
            if (b._static) {
                methods._static.push(b)
            } else {
                methods.normal.push(b)
            }
        }
    })
    return [properties, methods]
}

const visitClassDeclaration = function (node) {
    let {varType, type, body} = node
    // log('vartype', varType)
    // let {properties, methods} = varType
    let [properties, methods] = this.sortClassbody(body)
    // log('visitClassDeclaration', node)
    let id = this.visit(node.id)
    // log('var', id, node.varType)
    // 类声明
    this.scope.define(id, varType)

    // 类的实例变量转换成结构体成员
    // 如果是静态变量，现在的方案是把变量提到作用域外，当作全局变量
    let s = ''
    s += this.gen_static_properties(properties._static, id)


    // log('visitClassDeclaration', id, varType)
    // js 的类转化成 c 的结构体
    // 类的实例变量转换成结构体成员
    // 类的实例方法转换成函数，函数名以类名_开头
    // 第一个参数是结构体指针，后面的参数和js一样
    // log('varType', varType)
    s += `\ntypedef struct {\n`
    // log('sf', s)
    this.scope.enterBlock(type)
    s += this.gen_normal_properties(properties.normal)
    // log('s', s)
    s += `\n} ${id};\n`
    // log('s', s)
    // log('clas', varType)
    s += this.gen_normal_methods(methods.normal, new InstanceType(varType))
    // log(s)
    this.scope.leaveBlock()
    return s
}

module.exports = {
    visitClassDeclaration,
    sortClassbody,
}