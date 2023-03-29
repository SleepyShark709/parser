const {TokenType, BinaryExpression, UpdateExpression} = require("../../../../type");
const {op2} = require("../../../../config");
const binaryExpression = function (left) {
    // binaryExpression:
    //     ( number | identifier)
    //     ( '==' | '!=' | '<' | '>' | '<=' | '>=' | 'and' | 'or' |
    //        '+' | '-' | '*' | '/' | '%'
    //     )
    //     singleExpression

    let n1 = null
    let operator = ''
    if (left !== undefined) {
        // 说明是 singleExpression + singleExpression 这种类型
        n1 = left
    } else {
        // 如 a < b
        // 当前的 token
        let t = this.current()
        // 当前的 token 是字母
        if (t.type === TokenType.identifier) {
            // 在这里会对 this.index += 1
            n1 = this.identifier()
        } else {
            n1 = this.literal()
        }
    }
    // 如果当前的 token 是操作符
    if (op2.includes(this.current().value)) {
        operator += this.current().value
        // 是操作符，吃掉
        // op 是下一个符号
        this.index ++
        let op = this.tokens[this.index]
        if (op2.includes(op.value)) {
            operator += op.value
            // 如果下一个符号也是操作符，这里是 a++ 这种类型
            let b = new UpdateExpression(n1, operator, false)
            this.index ++
            return b
        }
        // n2 是下一个 singleExpression
        let n2 = this.singleExpression()
        let b = new BinaryExpression(op, n1, n2)
        return b
    } else {
        throw (`error ${this.current().value} ${this.index}`)
    }
}

module.exports = {
    binaryExpression,
}