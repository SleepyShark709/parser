const {TokenType, Property} = require("../../../../../type");
const propertyAssignment = function () {
    // propertyAssignment
    //     : propertyName ':' singleExpression

    // propertyName :
    // identifier
    // | StringLiteral
    let t = this.current() // 拿到当前的 token
    let key = null
    if (t.type === TokenType.string) { // 当前的 token 是字符串时
        key = this.literal() // 当前的 key 是原始类型
    } else if (t.type === TokenType.identifier) { // 当前的token是变量时
        key = this.identifier() // 当前的 key 是变量类型
    } else {
        throw (`错误类型 ${t.value}`)
    }
    this.eat(':') // 吃掉冒号
    let value = this.singleExpression() // 拿到对象右面的value，如： { k: 'hello' }，拿到这个 hello
    let p = new Property(key, value) // 将 key 和 value 组合成一个对象
    return p
}
module.exports = {
    propertyAssignment,
}