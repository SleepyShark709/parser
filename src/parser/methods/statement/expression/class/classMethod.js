const {TokenType, FunctionType, FunctionExpression, ClassMethod} = require("../../../../../type");

// js版
const classMethod = function () {
    // classMethod:
    // static? identifier ( formalParameterList? ) (typeModification)?  statement
    let isstatic = false // 是否为静态方法
    if (this.current().type === TokenType.static) {
        isstatic = true // 是静态方法
        this.eat('static') // 吃掉 static 关键字
    }
    let key = this.identifier() // 当前方法的名字
    // log('key', key)
    this.eat('(') // 吃掉函数的 (
    // 函数参数
    let params = []
    if (this.current().type === TokenType.identifier) {
        // 生产函数体
        params = this.formalParameterList()
    }
    this.eat(')')
    let returnType = 'void' // 当前函数的返回值类型
    if (this.current().value === ':') {
        // 如果存在类型定义，那么就是类型定义(copilot生成的废话 哈哈）
        returnType = this.typeModification()
    }
    let type = new FunctionType(params, returnType) // 函数类型 ast

    // 函数体
    let body = this.statement()
    // log('b', body)
    // forEach 是直接修改原数组的
    body.body.forEach(b => {
        // 有返回且没有类型标注，那就是 any
        if (b.type === 'ReturnStatement' || returnType === 'void') {
            returnType = 'any'
        }
    })
    let value = new FunctionExpression(body, params, null, type)
    let p = new ClassMethod(key, value, isstatic)
    // log('p is', p)
    return p
}

module.exports = {
    classMethod,
}


// gl版
// classMethod() {
//     // classMethod:
//     // (var | con) (class .)? identifier = singleExpression
//     let t = this.current()
//     let kind = null
//     if (t.type === TokenType.var) {
//         kind = this.eat('var')
//     } else if (t.type === TokenType.con) {
//         kind = this.eat('con')
//     } else {
//         throw ('其他')
//     }
//     let _static = false
//     if (this.current().type === TokenType.class) {
//         this.eat('class')
//         this.eat('.')
//         _static = true
//     }
//     let key = this.identifier()
//     this.eat('=')
//     let value = this.singleExpression()
//     let p = new ClassMethod(key, value, _static, kind)
//     return p
// }