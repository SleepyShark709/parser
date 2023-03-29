const {TokenType, ObjectExpression} = require("../../../../../type");
const objectExpression = function () {
    // objectLiteral
    //     : '{' '}'
    // | '{' propertyNameAndValueList ',' '}'
    this.eat('{') // 先吃掉 {
    let properties = []
    let t = this.current() // 拿到当前的 token
    if ([TokenType.identifier, TokenType.string].includes(t.type)) {
        // 当前的 token 是 字母或者字符串时
        properties = this.propertyNameAndValueList()
    }
    // this.eat(',') // 吃掉逗号（我感觉这里不严谨，如果最后一个元素没有逗号，这里就会报错），如：{ gua: '169' } 我直接改了
    if (t.type === TokenType.comma) {
        this.eat(',')
    }
    /**
     * 我认为13行应该这么改
     *     let t = this.current()
     *     if (t.type === TokenType.comma) {
     *         this.eat(',')
     *     }
     * */
    this.eat('}') // 吃掉右括号
    let o = new ObjectExpression(properties) // 根据对象里面的内容的 ast 组成对象的 ast
    return o
}
module.exports = {
    objectExpression,
}