const {
    AssignmentExpression,
    MemberExpression,
    TokenType
} = require("../../../../type")

const memberExpression = function () {
    // memberExpression:
    // identifier '[' singleExpression ']' |
    // identifier ':' singleExpression |
    // this '.' singleExpression |
    // class '.' singleExpression
    let object = null
    let t = this.current() // 拿到当前 token
    if (t.type === TokenType.identifier) { // 当前token是变量
        object = this.identifier() // object 是变量的 ast，并且 index += 1
    } else if (t.type === TokenType.this) { // 当前 token 是 this
        object = this.thisExpression() // 返回 this 的 ast，并且 index += 1
    } else if (t.type === TokenType.class) {
        object = t // object 是 token，也就是 class
        this.index += 1
    } else {
        // 没有匹配到
        throw `${t.type}`
    }
    let property = null
    let computed = false
    // 当前的 token 的 type 是 [ 时
    if (this.current().type === TokenType.bracketLeft) {
        // 把左括号吃掉
        this.eat('[')
        // 方括号中的内容
        property = this.singleExpression() // 拿到方括号中的内容
        // 吃掉右括号
        this.eat(']')
        computed = true
    } else if (this.current().type === TokenType.colon) {
        // 吃掉冒号
        /** 例子：
         * {
              a: 123
           }
         * */
        this.eat(':')
        property = this.singleExpression()
    } else if (this.current().type === TokenType.dot) {
        // 吃掉 .
        this.eat('.')
        // 例子：this.a
        property = this.singleExpression()
        // log('prop', property)
        if (property.type === 'AssignmentExpression') {
            // this.a = 1
            // 现在切成了 this   a=1，类型是 MemberExpression
            // 应该切成 this.a  = 1，类型是 AssignmentPattern
            // 对 AssignmentExpression 类型做单独的处理
            let {left, right} = property // 拿到左右两边的 ast
            left = new MemberExpression(object, left) // 把左边的 ast 包装成 MemberExpression
            let a = new AssignmentExpression(left, right, property.operator) // 把左右两边的 ast 包装成 AssignmentExpression
            return a
        }
    } else {
        throw ('其他')
    }
    // 返回 MemberExpression 的 ast
    let m = new MemberExpression(object, property, computed)
    return m
}
module.exports = {
    memberExpression,
}