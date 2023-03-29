// 只有 gl 里才是 classExpression
// con Student = Class() {}
// js 里没有
const {TokenType, ClassExpression} = require("../../../../../type");
const classExpression = function () {
    // classExpression:
    // Class Indentifier classbody
    this.eat('class')
    let id = null
    let superClass = null
    // this.eat('(')
    if (this.current().type === TokenType.identifier) {
        superClass = this.identifier()
    }
    // this.eat(')')
    let body = this.classbody()
    let f = new ClassExpression(body, superClass, id)
    return f
}
module.exports = {
    classExpression,
}