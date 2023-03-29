const chalk = require('chalk')
const {
    log,
    PSleep,
} = require('./util')
const {TokenType} = require('./type')

// 表示现在遍历到了类，结合 this.current 一起用
const inClass = 'class'

class Interpreter {
    constructor(ast) {
        this.ast = ast
        this.code = ''
        // 用来标记现在处于什么类型里
        this.current = []
        // 表示现在在第几层，用来算缩进
        this.depth = 0
        this.spacePerDepth = '    '
        // 缩进
        this.tab = ''
        this.eval()

    }

    enterBlock() {
        this.depth += 1
        let s = ''
        for (let i = 0; i < this.depth; i++) {
             s += this.spacePerDepth
        }
        this.tab = s
    }

    leaveBlock() {
        this.depth -= 1
        let s = ''
        for (let i = 0; i < this.depth; i++) {
            s += this.spacePerDepth
        }
        this.tab = s
    }

    // 通用的访问节点
    visit(node) {
        if (node === null) {
            return ''
        }
        let name = node.type
        let method = 'visit' + name
        // PSleep(4)
        // log(chalk.cyan(`method ${method}`))
        if (name === 'operator') {
            // operator 不是 AST 节点类型
            // 所以这里写死
            return this.visitOperator(node)
        } else if (this[method] === undefined) {
            log(node, name)
            throw (`method ${method} `)
        }
        // 统一加高亮
        let s = this[method](node)
        s = this.highLight(s, name)
        return s
    }

    highLight(string, type) {
        // 不能是 new，否则 'new('.startwith('new') 是 false
        if (type === 'Identifier' && string !== 'new') {
            string = chalk.blue(string)
        } else if (type === 'CommentStatement') {
            string = chalk.gray(string)
        } else if (type === 'Literal') {
            let pink = chalk.hex('#FF5792')
            string = pink(string)
        }
        let keywords = [
            'let',
            "con",
            "const",
            "var",
            "function",
            "if",
            "else",
            "for",
            "break",
            "continue",
            "return",
            "while",
            "class",
            "this",
            "true",
            "false",
            "and",
            "or",
            "not",
            'new',
        ]

        if (keywords.includes(string)) {

        }
        return string
    }

    visitBlockStatement(node) {
        this.enterBlock()
        let l = ['{']
        for (let b of node.body) {
            let s = this.tab + this.visit(b)
            l.push(s)
        }
        // } 的缩进要少 4
        let s1 = this.tab.slice(0, -4) + '}'
        l.push(s1)
        let s = l.join('\n')
        this.leaveBlock()
        return s
    }

    visitWhileStatement(node) {
        let test = this.visit(node.test)
        let body = this.visit(node.body)
        let s = 'while(' + test + ')' + body
        return s
    }

    visitForStatement(node) {
        let test = this.visit(node.test)
        let init = this.visit(node.init)
        let update = this.visit(node.update)
        let body = this.visit(node.body)
        // let s = 'for(' + test + ')' + body
        let s = `for (${init};${test};${update}) ${body}`
        return s
    }

    visitIfStatement(node) {
        let test = this.visit(node.test)
        let consequent = this.visit(node.consequent)
        let alternate = this.visit(node.alternate)
        let s = `if (${test}) ${consequent}`
        if (alternate !== '') {
            // 有 else
            s += ` else ${alternate}`
        }
        return s
    }

    visitProperty(node) {
        let s = ''
        if (node.kind === 'init') {
            let k = this.visit(node.key)
            let v = this.visit(node.value)
            s = `${k}: ${v}`
        } else {
            throw ('error')
        }
        return s
    }

    visitAssignmentExpression(node) {
        let op = node.operator.value
        let left = this.visit(node.left)
        let right = this.visit(node.right)
        let s = this.concatWithSpace(left, op, right)
        return s
    }


    visitMemberExpression(node) {
        let s = ''
        let o = null
        if (node.object.type === TokenType.class) {
            // 特殊语法，写死
            // class.xx
            o = node.object.value
        } else {
            o = this.visit(node.object)
        }
        let p = this.visit(node.property)
        let isClassNew = false
        if (p.startsWith('new')) {
            // 特殊语法，写死
            // Men.new()
            p = p.replace('new', '')
            isClassNew = true
        }
        log('is', isClassNew, p)
        if (node.computed) {
            // 是 a[k] 这种类型
            s = `${o}[${p}]`
        } else if (isClassNew) {
            s = `new ${o}${p}`
        }
        else {
            // 是 a.k 这种类型
            s = `${o}.${p}`
        }
        return s
    }

    visitObjectExpression(node) {
        let l = []
        for (let property of node.properties) {
            let p = this.visit(property)
            l.push(p)
        }
        let s = '{' + l.join(' ') + '}'
        return s
    }

    visitArrayExpression(node) {
        let l = []
        for (let e of node.elements) {
            let t = this.visit(e)
            l.push(t)
        }
        let s = '[' + l.join(', ') + ']'
        return s
    }

    visitVariableDeclarator(node) {
        let id = this.visit(node.id)
        let init = this.visit(node.init)
        let s = `${id} = ${init}`
        return s
    }

    visitVariableDeclaration(node) {
        let left = node.kind.value
        // gl 改成 js
        if (left === 'con') {
            left = 'const'
        } else if (left === 'var') {
            left = 'let'
        }
        // 这里写死，declarations 只有一个元素
        let right = this.visit(node.declarations[0])
        let s = `${left} ${right}`
        if (this.current.slice(-1)[0] === inClass && right.startsWith('this')) {
            // 如果是在 class 里，并且是 var this.a = 1 这种类型
            // 要特殊处理，把 var 删掉
            s = right
        }
        return s
    }

    visitCallExpression(node) {
        let s1 = this.visit(node.callee)
        let l = []
        for (let arg of node._arguments) {
            l.push(this.visit(arg))
        }
        let s2 = l.join(',')
        let s = s1 + '(' + s2 + ')'
        return s
    }



    visitUnaryExpression(node) {
        if (node.prefix) {
            // 操作符在前
            let op = node.operator.value
            let arg = this.visit(node._argument)
            let s = this.concatWithSpace(op, arg)
            if (op === '-') {
                // -1 这种类型
                s = op + arg
            }
            return s
        } else {
            throw ('error')
        }
    }

    visitOperator(node) {
        return node.value
    }

    concatWithSpace(...args) {
        let s = args.join(' ')
        return s
    }

    visitBinaryExpression(node) {
        let {left, right, operator} = node
        let l = []
        let s1 = this.visit(left)
        let s2 = operator.value
        let s3 = this.visit(right)
        let s = this.concatWithSpace(s1, s2, s3)
        return s
    }



    visitIdentifier(node) {
        let s = node.name
        return s
    }

    visitLiteral(node) {
        return node.raw
    }

    visitBreakStatement(node) {
        return 'break'
    }

    visitContinueStatement(node) {
        return 'continue'
    }

    visitThisExpression(node) {
        return 'this'
    }

    visitReturnStatement(node) {
        // 'return'
        let s1 = this.visit(node._argument)
        let s = `return ${s1}`
        return s
    }

    visitFunctionExpression(node) {
        let p = []
        for (let param of node.params) {
            p.push(this.visit(param))
        }
        let s1 = p.join(', ')
        let body = this.visit(node.body)
        let s = `function(${s1}) ${body}`
        return s
    }

    visitExpressionStatement(node) {
        let expression = node.expression
        let s = this.visit(expression)
        return s
    }

    visitProgramNode(node) {
        let l = []
        let body = node.body
        for (let b of body) {
            let t = this.visit(b)
            l.push(t)
        }
        // log('l', l)
        let s = l.join('\n')
        return s
    }

    visitAssignmentPattern(node) {
        let left = this.visit(node.left)
        let right = this.visit(node.right)
        let s = this.concatWithSpace(left, '=', right)
        return s
    }

    visitPropertyDefinition(node) {
        // fixme, 这里写的很凑
        // let kind = this.kind.value
        let key = this.visit(node.key)
        let type = node.value.type
        if (type === 'Literal') {
            // 是 var class.id = 100 这种类型
            key = `${key} =`
        } else {
            // 是 var class.show = function(){} 这种类型
        }
        let value = this.visit(node.value)
        if (type === 'Literal') {
        } else {
            value = value.replace('function', '')
        }
        let s = ''
        if (node._static) {
            // 类属性
            s = this.concatWithSpace('static', key, value)
        } else {
            s = this.concatWithSpace(key, value)
        }
        return s
    }

    visitClassExpression(node) {
        this.current.push(inClass)
        let superClass = this.visit(node.superClass)
        this.enterBlock()
        let l = ['{']
        for (let b of node.body) {
            let s = this.tab + this.visit(b)
            l.push(s)
        }
        // } 的缩进要少 4
        let s1 = this.tab.slice(0, -4) + '}'
        l.push(s1)
        let body = l.join('\n')
        let s = ''
        if (superClass === '') {
            s = `class ${body}`
        } else {
            s = `class extends ${superClass} ${body}`
        }
        this.leaveBlock()
        this.current.pop()
        return s
    }

    eval() {
        let r = this.visit(this.ast)
        this.code = r

    }

    visitCommentStatement(node) {
        let s = node.value
        return s
    }
}

module.exports = {
    Interpreter,
}