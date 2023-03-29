// 如果传了 member，说明是 memberExpression = singleExpression
const {TokenType, ThisExpression, MemberExpression, AssignmentExpression} = require("../../../../type");
const assignmentExpression = function (member) {
    // assignmentExpression:
    // ( MemberExpression | (this .)? identifier)
    // '=' singleExpression
    let left = null
    if (member !== undefined) {
        left = member
    } else if (this.current().type === TokenType.this) {
        // 当前的 type 是 this 时，吃掉 this 和 .
        this.eat('this')
        this.eat('.')
        // 构建 this 的 ast 结构
        let object = new ThisExpression()
        // 拿到 this 后面的变量
        let property = this.identifier()
        // 合成 MemberExpression 结构
        left = new MemberExpression(object, property)
    } else {
        left = this.identifier()
    }
    let op = null
    let t = this.current()
    if (['=', '+=', '*=', '/=', '%/'].includes(t.value)) {
        // 当前是 a+= 这种情况，吃掉 a
        op = this.eat(t.value)
    } else {
        throw ('其他')
    }
    let right = this.singleExpression()
    let a = new AssignmentExpression(left, right, op)
    return a
}

module.exports = {
    assignmentExpression,
}