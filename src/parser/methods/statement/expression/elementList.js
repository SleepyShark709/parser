const {TokenType} = require("../../../../type");
const elementList = function () {
    // elementList :
    // singleExpression ( ',' singleExpression )*
    let l = []
    let s = this.singleExpression() // 第一个元素的 ast
    l.push(s)
    let t = this.current() // 拿到当前 token
    while (t.type === TokenType.comma) {
        // 当前 token 是逗号时
        // 吃掉逗号
        this.eat(',')
        // 拿到逗号后面的 ast
        let n = this.singleExpression()
        // 推到数组 l 中
        l.push(n)
        // 更新当前的 token
        t = this.current()
    }
    return l
}

module.exports = {
    elementList,
}