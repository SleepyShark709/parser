const {singleExpressionTypes} = require("../../../../../config");
const {TokenType} = require("../../../../../type");
const argumentList = function () {

    // argumentList
    // singleExpression ( ',' singleExpression )*
    let l = []
    // 拿到括号里面第一个元素的内容
    let s = this.singleExpression()
    // 推到数组里面
    l.push(s)
    // t 是括号后的元素
    let t = this.current()
    // 如果 t 的 type 是：字符、布尔值、数字、this、逗号、变量进入循环
    while (singleExpressionTypes.includes(t.type) || t.type === TokenType.comma) {
        // 当前的 token 是逗号，吃掉
        if (t.type === TokenType.comma) {
            this.eat(',')
        }
        // 拿到当前循环遍历对应的内容，其实这里和第九行的逻辑是一样的
        let s = this.singleExpression()
        l.push(s)
        t = this.current() // 更新 t
    }
    // l 就是一个数组，里面的元素是 () 表达式里面的内容的 ast 对象
    return l
}
module.exports = {
    argumentList,
}