const {TokenType} = require("../../../../../type");
const classbody = function () {
    // classbody:
    // '{' ( 注释 | classMethod* | classProperty) '}'
    this.eat('{') // 先吃掉 {
    let l = []

    // 当前 token 是 变量名、注释、关键字
    while ([TokenType.identifier, TokenType.comment, TokenType.keyword].includes(this.current().type)) {
        let p = null
        // 当前的 token 是注释的时候
        if (this.current().type === TokenType.comment) {
            // p 是 注释 ast
            p = this.commentStatement()
        }
        // 当前的 token 静态方法时
        else if (this.current().value === 'static') {
            // 拿到下下个 token
            let p2 = this.tokens[this.index + 2]
            if (p2.value === ':') {
                // 是变量类型
                // static name: string
                p = this.classProperty()
            } else if (p2.value === '(') {
                // 函数
                // static a () {}
                p = this.classMethod()
            }
        } else {
            // 下一个 token 是 :
            /**
             * class Demo {
             *     name: string = '123'
             * }
             * */
            if (this.peek().value === ':') {
                // 是变量类型
                // name: string
                p = this.classProperty()
            }
            // 下一个 token 是 (
            /**
             * class Demo {
             *     constructor () {}
             * }
             * */
            else if (this.peek().value === '(') {
                // 函数
                p = this.classMethod()
            }
        }
        l.push(p)
    }
    this.eat('}')

    return l
}

module.exports = {
    classbody,
}