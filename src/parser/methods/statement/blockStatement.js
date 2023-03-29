const {BlockStatement} = require("../../../type");
const blockStatement = function () {
    // blockStatement:
    // { statementList? }
    let e1 = this.eat('{') // 吃掉 { 这里可以不用赋值，直接调用
    let t = this.current() // 拿到当前 token
    let b = null
    if (t.value === '}') {
        // 如果当前 token 是 }，那么就是空的 blockStatement，如 if (a === 2) {}
        let e2 = this.eat('}')
        b = new BlockStatement([])
    } else {
        let l = this.statementList() // 拿到 {} 内所有内容的 ast 组成的数组
        let e2 = this.eat('}') // 吃掉 }
        b = new BlockStatement(l) // 组成 blockStatement
    }
    return b
}

module.exports = {
    blockStatement,
}