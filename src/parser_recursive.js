const {
    log,
    isLetterNum,
} = require('./util')
const {
    CallExpression,
    TokenType,
    ProgramNode,
    ExpressionStatement,
    Identifier,
    Literal,
    BinaryExpression,
    UnaryExpression,
    IfStatement,
    BlockStatement,
    VariableDeclaration,
    VariableDeclarator,
    ArrayExpression,
    Property,
    ObjectExpression,
    MemberExpression,
    AssignmentExpression,
    WhileStatement,
    ForStatement,
    BreakStatement,
    ContinueStatement,
    FunctionDeclaration,
    FunctionExpression,
    ReturnStatement,
    AssignmentPattern,
    ClassBody,
    PropertyDefinition,
    ClassExpression,
    ThisExpression,
    CommentStatement,
} = require('./type')

const {
    op2,
    literalType,
    statementTypes,
    singleExpressionTypes,
} = require('./config')

class Parser {
    constructor(tokens) {
        this.tokens = tokens
        this.index = 0
        this.ast = null
        this.current = this.tokens[this.index]
        this.parse()
    }

    eat(token) {
        let t = this.current
        if (this.current.value !== token) {
            throw (`错误 token「${token}」 「${t.type}」「${t.value}」${this.index}`)
        }
        this.index += 1
        this.current = this.tokens[this.index]
        return t
    }

    peek() {
        let i = this.index + 1
        let t = this.tokens[i]
        if (t === undefined) {
            return {}
        } else {
            return t
        }
    }

    int() {
        let l = new Literal(this.current)
        this.index += 1
        this.current = this.tokens[this.index]
        return l
    }

    binaryExpression(left) {
        // BinaryExpression:
        // expression + expression
        // 左边的 expression 是传进来的
        // 所以处理操作符和右边就好
        let op = this.eat('+')
        let right = this.expression()
        let b = new BinaryExpression(op, left, right)
        return b
    }

    expression() {
        // Expression :
        // int |
        // BinaryExpression
        let node = null
        if (this.current.type === TokenType.number) {
            node = this.int()
            // 如果现在是 +，说明是 BinaryExpression
            if (this.current && this.current.type === TokenType.plus) {
                node = this.binaryExpression(node)
            }
        }
        else {
            throw('error type')
        }
        return node
    }


    program() {
        // Program: Expression*
        //
        // Expression :int | BinaryExpression
        //
        // BinaryExpression: expression + expression
        let body = []
        while (this.index < this.tokens.length) {
            let s = this.expression()
            body.push(s)
        }
        let p = new ProgramNode(body)
        return p
    }

    parse() {
        // Program: Expression*
        // Expression :
        // int |
        // BinaryExpression
        let ast = this.program()
        // log('ast', ast)
        this.ast = ast
    }
}

module.exports = {
    Parser,
}