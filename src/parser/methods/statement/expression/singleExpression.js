const {TokenType} = require("../../../../type");
const {op2, literalType, singleExpressionTypes} = require("../../../../config");

// 判断当前 token 有没有可能是 singleExpression
// 比如 token 是 1
// 就有可能是 singleExpression
const is_current_singleExpression = function () {
    let t = this.current()
    return singleExpressionTypes.includes(t.type)
}

const singleExpression = function (left) {
    // singleExpression:
    // singleExpression ( '+' | '-' ) singleExpression |
    // This |
    // Identifier|
    // literal |
    // arrayLiteral |
    // objectLiteral |
    // '(' expressionSequence ')' |
    // binaryExpression |
    // UnaryExpression |
    // CallExpression |
    // ArrayExpression |
    // ObjectExpression |
    // MemberExpression |
    // AssignmentExpression |
    // FunctionExpression |
    // ClassExpression |
    // NewExpression
    // 拿到当前token以及下一个 token
    let t = this.current()
    let p = this.peek()
    let node = null
    // 当前 token 为字母
    if (t.type === TokenType.identifier) {
        // 字母下一个字符是 '==', '!=', '<', '>', '<=', '>=', 'and', 'or',
        //     '+', '-', '*', '/', '%',
        if (op2.includes(p.value)) {
            // a+
            node = this.binaryExpression()
        } else if ([TokenType.kohkLeft, TokenType.bracketLeft, TokenType.colon, TokenType.dot].includes(p.type)) {
            // f( 或者 l[ 或者 l: 或者 l.
            node = this.callExpression()
        } else if (['=', '+=', '-=', '*=', '/=', '%='].includes(p.value)) {
            // a=  a+=  a-=
            node = this.assignmentExpression()
        } else {
            // 只有一个字母
            node = this.identifier()
        }
    }
    else if (literalType.includes(t.type)) {
        // 当前的 token 是字符串、数字、布尔值、this
        if (t.type === TokenType.number && (op2.includes(p.value))) {
            // 当前的 token 是数字，且下一个字符是运算符时
            node = this.binaryExpression()
        } else if (t.type === TokenType.this) {
            // 当前的 token 是 this 时
            if (p.type === TokenType.dot) {
                // 下一个 token 是 点
                // this.
                node = this.memberExpression()
            } else {
                // 一行代码只有一个 this
                node = this.thisExpression()
            }
        } else {
            // 字面意义
            node = this.literal()
        }
    }
    else if (t.type === TokenType.bracketLeft) {
        //  ArrayExpression
        // 当前 token 为 [ 时，进行数组的处理
        node = this.arrayExpression()
    }
    else if (t.type === TokenType.curlyLeft) {
        // 当前 token 为大括号时，进行对象的处理
        node = this.objectExpression()
    }
    else if (t.type === TokenType.function) {
        // 当前 token 是 function 时，进行对象的处理
        node = this.functionExpression()
    }
    else if (t.value + p.value === 'class.') {
        // class.xx，类属性
        node = this.memberExpression()
    }
    else if (t.type === TokenType.class) {
        throw 'err'
        node = this.classExpression()
    }
    else if (t.value === 'not' || t.value === '-') {
        // 处理一元表达式
        node = this.unaryExpression()
    }
    else if (t.value === 'new') {
        // 处理 new 表达式
        // new MyClass() 这种的
        node = this.newExpression()
    }
    else if (t.value === '+') {
        // 处理 ++a 这种情况
        node = this.updateExpression()
    }
    else {
        throw (`其他类型 ${t.value} ${this.index}`)
    }

    let current = this.current()
    // fixme，这里很乱
     /**
      * ['==', '!=', '<', '>', '<=', '>=', 'and', 'or',
      *         '+', '-', '*', '/', '%',]
      *         如果当前的 token 是以上符号的
      *         那么是 表达式 + 表达式这种类型？
      *   比如在 binaryExpression 中又调用了 singleExpression 方法来获取 node 节点
      * */
    if (current && op2.includes(current.value)) {
        // 是 expr + expr 这种类型
        if (left !== undefined) {
            node = this.binaryExpression(left)
        } else {
            node = this.binaryExpression(node)
        }
    }

    return node
}
module.exports = {
    singleExpression,
    is_current_singleExpression,
}