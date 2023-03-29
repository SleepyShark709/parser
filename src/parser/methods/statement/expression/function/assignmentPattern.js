const {AssignmentPattern} = require("../../../../../type");
// 处理赋值表达式
const assignmentPattern = function () {
    // assignmentPattern:
    // Identifier = singleExpression
    let left = this.identifier() // 当前的 token 是变量名，转换成变量名的 ast
    this.eat('=') // 吃掉赋值的 =
    let right = this.singleExpression() // 右侧是被赋予的值
    let a = new AssignmentPattern(left, right) // 组装赋值表达式的 ast
    return a
}

module.exports = {
    assignmentPattern,
}