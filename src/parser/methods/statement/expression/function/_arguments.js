const {TokenType} = require("../../../../../type");
const _arguments = function () {
    // arguments
    // '(' argumentList? ')'
    this.eat('(') // 吃掉 (
    let t = this.current() // 那么 t 就是 ( 后面的一个元素
    let l = []
    // 如果 t 的 type 是 )，说明没有参数（copilot 真 nb，怎么知道我想说什么的）
    if (t.type === TokenType.kohkRight) {
        //
    } else {
        // l 就是一个数组，里面的元素是 () 表达式里面的内容的 ast 对象
        l = this.argumentList()
    }
    // 把右括号吃掉
    this.eat(')')
    return l
}

module.exports = {
    _arguments,
}