const {TokenType, UpdateExpression, BinaryExpression} = require("../../../../type");
const updateExpression = function () {
   // ++ a
    let t = this.current().value
    let next = this.eat('+')
    if (!next) {
        throw (`其他类型 ${t.value} ${this.index}`)
    }
    let operator = t + next.value
    let n1 = null
    let token = this.current()
    if (token.type === TokenType.identifier) {
        n1 = this.identifier()
    }
    return new UpdateExpression(n1, operator, true)
}

module.exports = {
    updateExpression,
}