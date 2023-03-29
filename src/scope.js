// 这个文件是用来实现作用域的
const {
    log,
    json,
} = require('./util')
class Scope {
    constructor() {
        // 用来标记现在处于什么类型里
        this.stack = [{

        }]
        // 表示现在在第几层，用来算缩进
        this.depth = 0
        this.spacePerDepth = '    '
        // 缩进
        this.tab = ''
    }

    length() {
        return this.stack.length
    }
    top() {
        let l = this.stack.length
        return this.stack[l - 1]
    }

    // 在当前作用域里定义一个变量
    define(name, value) {
        let scope = this.stack[this.stack.length - 1]
        scope[name] = value
    }

    // 在作用域栈里查找一个变量
    valueOf(name) {
        let s = null
        // 从内往外查找
        for (let i = this.stack.length - 1; i >= 0; i--) {
            let scope = this.stack[i]
            if (scope[name] !== undefined) {
                s = scope[name]
                break
            }
        }
        return s
    }

    enterBlock(type) {
        // 进入花括号，增加缩进
        this.depth += 1
        let s = ''
        for (let i = 0; i < this.depth; i++) {
            s += this.spacePerDepth
        }
        this.tab = s
        // 标记当前作用域类型
        this.stack.push({type})
    }

    leaveBlock() {
        // 离开花括号，减少缩进
        this.depth -= 1
        let s = ''
        for (let i = 0; i < this.depth; i++) {
            s += this.spacePerDepth
        }
        this.tab = s

        this.stack.pop()
    }

    log() {
        log('this.stack is')
        json(this.stack)
    }

}

module.exports = {
    Scope,
}