const {
    CallExpression,
    TokenType
} = require("../../../../type")

// 这里是表达式内的 ()，if 不走这里的逻辑
// 例如 console.log('gua')，log 的括号就走这里
const callExpression = function () {
    // callExpression:
    // identifier _arguments |
    // memberExpression
    let t = this.current() // 这行不需要
    let p = this.peek() // 拿到下一个字符
    if (p.type === TokenType.kohkLeft) { // 下一个字符如果是 (
        let callee = this.identifier() // callee 是一个变量，也是 ( 前的一个字符，也就是现在的字符 this.current 要输出的 ast 格式
        let args = this._arguments() // 输出括号内的 ast
        let c = new CallExpression(callee, args) // 这里拿到调用括号函数（变量）的ast，以及括号中参数的 ast，通过这个类进行组装然后返回
        return c
    } else if ([TokenType.bracketLeft, TokenType.colon, TokenType.dot].includes(p.type)) {
        // [或者:或者. 即左方括号，冒号，点
        // o['k'] 或者 o['k'] = 1 或 this.k = 1
        let m = this.memberExpression()
        let t = this.current()
        if (t && t.type === TokenType.assign) {
            // 是 o['k'] = 1 这种情况
            m = this.assignmentExpression(m)
        }
        return m
    } else {
        throw ('其他')
    }
}

module.exports = {
    callExpression,
}