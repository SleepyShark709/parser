const {ClassProperty} = require("../../../../../type");
const classProperty = function () {
    // classProperty:
    // (static)? identifier (= singleExpression)?
    let isstatic = false // 是否为静态方法
    // 当前的 token 是静态方法关键字时
    if (this.current().value === 'static') {
        isstatic = true
        this.eat('static') // 吃掉 static
    }
    let i = this.identifier() // i 是变量名
    let v = null
    // 当前的值是 = 时
    // 如 static a = 1
    if (this.current().value === '=') {
        this.eat('=')
        v = this.singleExpression() // 单一表达式
    }
    let c = new ClassProperty(i, v, isstatic)
    return c
}

module.exports = {
    classProperty,
}