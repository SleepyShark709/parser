const {wrapFloatCreate, wrapStringCreate} = require("../../../js2c_container");
const visitReturnStatement = function (node) {
    // 'return'
    // log('return', node)
    let s1 = this.visit(node._argument)
    // 查看作用域中保存的函数返回值类型
    // 根据类型包一层再返回
    // 函数返回值类型保存在倒数第二个栈里
    let l = this.scope.length() - 2
    let returnVarType = this.scope.stack[l].returnVarType
    if (returnVarType === 'any') {
        // 如果返回类型是 any，直接返回
        return `return ${s1};`
    } else {
        if (['Identifier', 'MemberExpression'].includes(node._argument.type)) {
            // 如果返回的是单个变量，那么理论上变量类型已经转成 c 了
            // 直接返回
            return `return ${s1};`
        } else if (node._argument.type === 'BinaryExpression') {
            // 如果返回的 a + b 这种，并且返回要求是 number string 类型
            // 就得包一层了
            // 别的类型没法管了
            // 比如要求返回一个 Student 类型，我也不知道构造函数是啥
            // 这种情况就直接返回
            // log('node _ar', node._argument, returnVarType)
            let o = {
                'number': wrapFloatCreate,
                'string': wrapStringCreate,
            }
            if (Object.keys(o).includes(returnVarType)) {
                s1 = o[returnVarType](s1)
            }
            return `return ${s1};`
        } else {
            throw `return ${node._argument.type}`
        }
    }
}

module.exports = {
    visitReturnStatement,
}