const {log} = require('./util')
const {TokenType} = require('./type')
const {isDigit, isLetter, isLetterNum} = require('./util')

/* 
    词法分析器
    词法分析器的功能是，通过拿到字符串形式代码，来将其转换为 token 形式
    如 var a = 10
    转换为
    [
        {
            value: 'var',
            type: TokenType.var,
        },
        {
            value: 'a',
            type: TokenType.identifier,
        },
        {
            value: '=',
            type: TokenType.assign,
        },
        {
            type: TokenType.number,
            value: 10,
            raw: '10',
        },
    ]
*/

class Lexer {
    // 词法分析的构造器
    // 接收一个参数，为代码的字符串形式 如： 'var a:number = 10'
    constructor(code) {
        // 初始化词法分析器的全局变量
        // 当前的运行的 code
        this.code = code
        // 当前运行到第几个字符
        this.index = 0
        // 存入的 token 的数组
        this.tokens = []
        // 消费字符
        this.eat()
    }

    // 往后看一个字符
    peek() {
        return this.code[this.index + 1]
    }

    // 往后读一个字符
    read1() {
        this.index += 1
        return this.code[this.index]
    }

    // 单行注释，遇到回车结束
    commentEnd() {
        let s = ''
        let t = this.code[this.index]
        while (t && t !== '\n') {
            s += t
            this.index += 1
            t = this.code[this.index]
        }
        // 返回注释，为了生成代码时有注释
        let o = {
            type: TokenType.comment,
            value: s,
        }
        return o
    }

    // 消费 token
    eat() {
        // 拿到当前的字符，如 code 是 'const a:number = 10'，index 是 0，那么 s 就是 'c'
        let s = this.code[this.index]
        let t = null
        // 遍历的条件，当前的 index 小于当前 code 的长度
        // 因为在代码运行时会一直更新 code 为未解析的部分，且 index 会一直增长去寻找没有处理的字符
        // 所以 index 一直增长，code 的长度一直减少
        while (this.index < this.code.length) {
            s = this.code[this.index]
            // 这里是判断，当前的字符是否为数字
            // 以及当前的字符是否表示一个负数，如当前字符是 负号，则判断下一个字符是否为数字，如果是那么当前字符表示为一个负数
            if (isDigit(s) || (s === '-' && isDigit(this.peek()))) {
                // 当前的字符表示的是一个数字
                t = this.intEnd()
            } else if ('(),{}[].:;'.includes(s)) {
                // 长度为 1 的操作符
                t = this.operatorEnd()
            } else if (s === ' ' || s === '\n') {
                // 略过空格
                this.index += 1
                continue
            } else if (s === '"' || s === "'" || s === '`') {
                this.stringEnd()
                // 在 stringEnd 里处理好了，这里提前中断
                continue
            } else if (isLetter(s)) {
                // 当前为字符
                t = this.identifierEnd()
            } else if (s + this.peek() === '//') {
                // 是注释
                t = this.commentEnd()
            } else if ('+-*/%=!><&|'.includes(s)) {
                // 长度为 1 或 2 的操作符，如 ==，!，!=
                t = this.operator2End()
            } else {
                throw(`其他类型 ${s}`)
            }
            // log('t', t)
            this.tokens.push(t)
        }
    }

    // 查看是否是关键词
    identifierEnd() {
        let r = ''
        // 拿到当前字符
        let s = this.code[this.index]
        // 当前字符是字母，且存在
        while (isLetterNum(s) && s !== undefined) {
            r += s
            s = this.read1()
        }
        let t = {
            value: r,
            type: TokenType.identifier,
        }
        // log('id t', t, this.index)
        // 检查一下是不是关键词，是就返回关键词
        // 不是关键词就返回 identifier
        let keywords = {
            'static': {
                value: 'static',
                type: TokenType.keyword,
            },
            'import': {
                value: 'import',
                type: TokenType.keyword,
            },
            'from': {
                value: 'from',
                type: TokenType.keyword,
            },
            'any': {
                value: 'any',
                type: TokenType.keyword,
            },
            'con': {
                value: 'con',
                type: TokenType.con,
            },
            'let': {
                value: 'let',
                type: TokenType.keyword,
            },
            'const': {
                value: 'const',
                type: TokenType.const,
            },
            'var': {
                value: 'var',
                type: TokenType.var,
            },
            'function': {
                value: 'function',
                type: TokenType.function,
            },
            'if': {
                value: 'if',
                type: TokenType.if,
            },
            'else': {
                value: 'else',
                type: TokenType.else,
            },
            'for': {
                value: 'for',
                type: TokenType.for,
            },
            'break': {
                value: 'break',
                type: TokenType.break,
            },
            'continue': {
                value: 'continue',
                type: TokenType.continue,
            },
            'return': {
                value: 'return',
                type: TokenType.return,
            },
            'while': {
                value: 'while',
                type: TokenType.while,
            },
            'class': {
                value: 'class',
                type: TokenType.class,
            },
            'this': {
                value: 'this',
                type: TokenType.this,
            },
            'new': {
                value: 'new',
                type: TokenType.new,
            },
            'constructor': {
                value: 'constructor',
                type: TokenType.keyword,
            },
            'true': {
                value: true,
                type: TokenType.bool,
                raw: 'true'
            },
            'false': {
                value: false,
                type: TokenType.bool,
                raw: 'true',
            },
            'and': {
                value: 'and',
                type: TokenType.operator,
            },
            'or': {
                value: 'or',
                type: TokenType.operator,
            },
            'not': {
                value: 'not',
                type: TokenType.operator,
            }
        }
        if (keywords[r] !== undefined) {
            let tmp = keywords[r]
            return tmp
        } else {
            return t
        }
    }

    // 匹配字符串 并将 index 移到末尾
    // 这里处理引号以及模板字符串的 ` 符号
    stringEnd() {
        let r = ''
        let quote = this.code[this.index]
        // this.tokens.push({
        //     value: quote,
        //     type: quote === '"' ? TokenType.quote : TokenType.singlequote,
        // })
        // 吃掉引号
        this.index += 1
        // 现在的算法是，只找这个引号和下一个引号中间的东西
        // 这里的this.code[this.index]其实是下一个字符
        // 比如 'a'，进入 stringEnd 时，index 是 0，但是由于 this.index += 1 
        // 所以到 this.code[this.index] 已经是 a 了
        while (this.code[this.index] !== quote) {
            // 把引号当中的内容全部加进去
            r += this.code[this.index]
            this.index += 1
        }
        // 生成 token
        let t = {
            type: TokenType.string,
            value: r,
            raw: quote + r + quote
        }
        this.tokens.push(t)
        // 吃掉引号
        this.index += 1
        // this.tokens.push({
        //     value: quote,
        //     type: quote === '"' ? TokenType.quote : TokenType.singlequote,
        // })
    }

    // 匹配数字 并将 index 移到末尾
    // 这个函数的作用是，拿到当前字符所代表的数字，然后将其组装成 token 形式并返回出去
    intEnd() {
        // 拿到当前的字符
        let s = this.code[this.index]
        let r = ''
        // 是否是正数，默认为正数
        let isPositive = true
        // 如果当前的 s 是负号，则当前要表示的数是负数
        // 因为已经在 this.eat() 中进行过判断了，所以这里不用确认负号后面的字符是否为数字
        if (s === '-') {
            // 修改正负数标识为负数
            isPositive = false
            // 往后读了一个字符，返回了当前字符
            // 比如 当前的 code 是 var a:number = -2
            // 当前的 this.index 是 15，当前的 s 是 '-'
            // 那么经过 this.read1() 之后，this.index 是 16，s 是 2
            s = this.read1()
        }
        // 判断当前的字符是否为数字
        // 或者当前的字符后面的字符是否为 '.'，并且 '.' 后面的字符是数字
        // 这里用循环就可以判断小数点后无限位数字
        while (isDigit(s) || (s === '.' && isDigit(this.peek()))) {
            // r 用来保存当前的数字结果，如 '2' 或 '2.123323' 这种形式
            r += s
            // 存过一个字符之后，将当前的 this.index 向后加一个
            // 比如存 '2.1' 时是
            // s = '2', r = '2'
            // s = '.', r = '2.'
            // s = '1', r = '2.1'
            s = this.read1()
        }
        // 组装要返回的 token 格式了
        let t = {
            // 当前的 type 是数字            
            type: TokenType.number,
            // 当前的 value，用 isPositive 正负数标识来判断要保存正数还是负数
            value: isPositive ? Number(r) : -Number(r),
            // 字符串格式
            raw: isPositive ? r : `-${r}`
        }
        return t
    }

    // 匹配符号(1位符号) 并将 index 移到末尾
    // 这里就是拿到当前的字符，然后转化为 token 形式返回
    // 再把 index += 1 进行下一个字符的读取
    operatorEnd() {
        let s = this.code[this.index]
        this.index += 1
        let o = {
            '(': {
                type: TokenType.kohkLeft,
                value: '(',
            },
            ')': {
                type: TokenType.kohkRight,
                value: ')',
            },
            '[': {
                type: TokenType.bracketLeft,
                value: '[',
            },
            ']': {
                type: TokenType.bracketRight,
                value: ']',
            },
            '{': {
                type: TokenType.curlyLeft,
                value: '{',
            },
            '}': {
                type: TokenType.curlyRight,
                value: '}',
            },
            ',': {
                value: ',',
                type: TokenType.comma,
            },
            '.': {
                value: '.',
                type: TokenType.dot,
            },
            ':': {
                value: ':',
                type: TokenType.colon,
            },
            ';': {
                value: ';',
                type: TokenType.semicolon,
            }
        }
        return o[s]
    }

    // 匹配符号(2位符号) 并将 index 移到末尾
    operator2End() {
        // 拿两个字符
        let s1 = this.code[this.index]
        let s2 = this.read1()
        let s = s1 + s2
        let l1 = ['==', '!=', '<=', '>=', '&&', '||', '+=', '-=', '*=', '/=', '%=']
        if (l1.includes(s)) {
            // 一次读两个字符，更新下标
            this.read1()
            return {
                value: s,
                type: TokenType.operator,
            }
        }
        // 单目运算符
        if ('!><'.includes(s1)) {
            return {
                value: s1,
                type: TokenType.operator,
            }
        } else if (s1 === '=') {
            return {
                value: s1,
                type: TokenType.assign,
            }
        } else if ('+-*/%'.includes(s1)) {
            let o = {
                '+': {
                    type: TokenType.plus,
                    value: '+',
                },
                '-': {
                    type: TokenType.minus,
                    value: '-',
                },
                '*': {
                    type: TokenType.mul,
                    value: '*',
                },
                '/': {
                    type: TokenType.div,
                    value: '/',
                },
                '%': {
                    type: TokenType.mod,
                    value: '%',
                },
            }
            return o[s1]
        } else {
            throw '没找到 op2'
        }
    }
}

module.exports = {
    Lexer
}
