(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

const isArray = o => Array.isArray(o)

const isSymbool = (e) => {
    let symbool = '{},:\'\"[]'
    if (symbool.includes(e)) {
        return true
    } else {
        return false
    }
}

const isString = (e) => {
    let word = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (word.includes(e)) {
        return true
    } else {
        return false
    }
}

const isNumber = (e) => {
    let num = '0123456789'
    for (let i = 0; i < e.length ; i ++) {
        let cell = e[i]
        if (!num.includes(cell)) {
            return false
        }
    }
    return true
}

const log1 = (...args) => {
    let t = createLog(...args)
    let c = `<div class="log-container">${t}</div><div class="divider"></div>`
    let container = document.querySelector("#log")
    container.innerHTML += c
    onFoldFunc(...args)
}

const createLog = (...args) => {
    let t = ''
    for (let i = 0; i < args.length; i ++) {
        let e = args[i]
        if (isObject(e) || isArray(e)) {
            let value = ''
            let len = 0
            let prefix = '['
            let suffix = ']'
            let xiala = ''
            let count = 0
            let classType = ''
            // 判断元素是否为数组或对象
            if (isArray(e)) {
                // 元素是数组
                for (let i = 0; i < e.length; i ++) {
                    let item = e[i]
                    if (isArray(item)) {
                        // 数组内的元素还是数组
                        len = item.length
                        value += `<span>Array(${len})</span>`
                    } else if (isObject(item)) {
                        // 数组内的元素是对象
                        value += `<span>{...}</span>`
                    } else {
                        // 数组内的元素是字符串或数字
                        if (isNumber(item)) {
                            classType = 'number'
                        } else if (isString(item)) {
                            classType = 'string'
                        }
                        if (i !== e.length - 1) {
                            // item = item + ',' + '&nbsp'
                            value += `<span class="${classType}">${item}</span>, `
                        } else {
                            value += `<span class="${classType}">${item}</span>`
                        }
                    }
                    xiala += `<div><span class="index">${i}</span>: ${createLog(item)}</div>`
                    count += 1
                }
                value = `<span>${e.length > 1 ? `(${e.length}) ` : ''}${prefix + value + suffix}</span>` // 展示 [1, Array(1)] 这样的东西
                let xialaLen = `<div class="tail">length: ${e.length}</div>`
                let proto = `<div class="tail proto" data-type="array"><span class="arrow"></span>__proto__: Array(0)</div>`
                let protoXiala = `<div class="xiala hide">${e.__proto__}</div>`
                let xialaContainer = `<div class="xiala hide padding-border" style="text-indent: 1px">${xiala}${xialaLen}${proto}${protoXiala}</div>`
                t += `<span style="width: 100%"><span class="arrow"></span>${value}${xialaContainer}</span>` // 展示 👉🏻[1, Array(1)] 这样的东西
                // t +=  // 增加下拉框
            } else if (isObject(e)) {
                // 元素是对象
                let keys = Object.keys(e)
                for (let i = 0; i < keys.length; i ++) {
                    let key = keys[i]
                    let v = e[key]
                    if (isObject(v)) {
                        // 对象一个键值对的值还是对象
                        value += `<span>${key}: {...}</span>`
                    } else if (isArray(v)) {
                        // 对象一个键值对的值是数组
                        let len = v.length
                        value += `<span>${key}: Array(${len})</span>`
                    } else {
                        // 该键值对的值是数字或者字符
                        value = `<span class="key">${key}</span>: <span>${v}</span>`
                    }
                    xiala += `<div><span class="index">${key}</span>: ${createLog(v)}</div>`
                }
                value = `<span>${'{' + value + '}'}</span>` // 展示 [1, Array(1)] 这样的东西
                let proto = `<div class="tail">__proto__: Object</div>`
                let xialaContainer = `<div class="padding-border"><div class="xiala hide" style="text-indent: 1px">${xiala}${proto}</div></div>`
                t += `<span style="width: 100%"><span class="arrow"></span>${value}${xialaContainer}</span>` // 展示 👉🏻[1, Array(1)] 这样的东西
            } else if (typeof e === "function") {
                // 是函数
            }

        } else {
            let v = ''
            // 元素为 number 或 object
            let classType = ''
            if (typeof e === "number") {
                // 元素为数字
                classType = 'number'
            } else {
                // 元素为字符串
                classType = 'string'
            }
            if (i < args.length - 1) {
                e = e + ','
            }
            v = `<span class="${classType}">${e}</span>`
            t += v
        }
    }
    return t
}

// 添加小三角的点击事件
const onFoldFunc = () => {
    let container = document.querySelectorAll('.log-container')
    for (let i = 0; i < container.length; i ++) {
        let item = container[i]
        item.addEventListener('click', (event) => {
            let self = event.target
            if (self.classList.contains('arrow')) {
                let father = self.parentElement
                let xiala = father.querySelector('.xiala')
                if (xiala.classList.contains('hide')) { // 实现 toggle 功能
                    xiala.classList.remove('hide')
                } else {
                    xiala.classList.add('hide')
                }
            }
        })
    }
}

// 添加 proto 点击事件
const protoClick = () => {
    let container = document.querySelectorAll('.log-container')
    for (let i = 0; i < container.length; i ++) {
        let item = container[i]
        item.addEventListener('click', (event) => {
            let self = event.target
            if (self.classList.contains('proto')) {
                let type = self.datset.type
                if (type === 'array') {
                    let o = createLog(Array.__proto__)
                }
            }
        })
    }
}

module.exports = {
    log1
}
},{}],2:[function(require,module,exports){
const {Parser} = require('./src/parser/index.js')
const {Lexer} = require('./src/lexer.js')
const {log1} = require('./log.js')
const list = [
    '3024-day',
    '3024-night',
    'abbott',
    'abcdef',
    'ambiance-mobile',
    'ambiance',
    'ayu-dark',
    'ayu-mirage',
    'base16-dark',
    'base16-light',
    'bespin',
    'blackboard',
    'cobalt',
    'colorforth',
    'darcula',
    'dracula',
    'duotone-dark',
    'duotone-light',
    'eclipse',
    'elegant',
    'erlang-dark',
    'gruvbox-dark',
    'hopscotch',
    'icecoder',
    'idea',
    'isotope',
    'juejin',
    'lesser-dark',
    'liquibyte',
    'lucario',
    'material-darker',
    'material-ocean',
    'material-palenight',
    'material',
    'mbo',
    'mdn-like',
    'midnight',
    'monokai',
    'moxer',
    'neat',
    'neo',
    'night',
    'nord',
    'oceanic-next',
    'panda-syntax',
    'paraiso-dark',
    'paraiso-light',
    'pastel-on-dark',
    'railscasts',
    'rubyblue',
    'seti',
    'shadowfox',
    'solarized',
    'ssms',
    'the-matrix',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'ttcn',
    'twilight',
    'vibrant-ink',
    'xq-dark',
    'xq-light',
    'yeti',
    'yonce',
    'zenburn'
]

const e = (selector) => document.querySelector(selector)
const bindEventLayout = () => {
    let dragged = false
    let container = e('.container')
    container.addEventListener('mousedown', (event) => {
        let self = event.target
        if (self.classList.contains('splitLine')) {
            dragged = true
        }
    })
    container.addEventListener('mousemove', (event) => {
        if (dragged) {
            // 根据分割线的 x 算左边盒子占容器的比例
            let x = event.pageX
            let width = e('.container').offsetWidth
            let percent = Math.min((x / width).toFixed(2) * 100, 99)
            let left = e('.left-editor')
            left.style['min-width'] = `${percent}%`
            left.style['max-width'] = `${percent}%`
        }
    })
    container.addEventListener('mouseup', () => {
        dragged = false
    })
}

const logInsertEvent = (text) => {
    let l1 = new Lexer(text)
    let p1 = new Parser(l1.tokens)
    // 每次重新更新 log 区域
    let container = document.querySelector("#log")
    container.innerHTML = ''
    log1(p1.ast)
}

const bindEventEditor = (editor) => {
    editor.on('change', (instance, changeObj) => {
        let text = instance.getValue()
        logInsertEvent(text)
        // log('te', `[${text}]`)
        // 拿到代码，给 parser
        // 拿到 ast，渲染
    })
}

const bindEventTree = () => {
    e('.tree').addEventListener('click', (event) => {
        let self = event.target
        let parent = self.parentElement
        if (parent.classList.contains('toggleable')) {
            parent.classList.toggle('open')
        } else if (self.classList.contains('entryType')) {
            let p = self.closest('.toggleable')
            p.classList.toggle('open')
        }
    })
}

const bindEvents = (editor) => {
    bindEventLayout()
    bindEventEditor(editor)
    bindEventTree()
}


const initEditor = () => {
    let myTextarea = e('#id-text-editor')
    let editor = CodeMirror(myTextarea, {
        lineNumbers: true,
        mode: 'javascript',
        theme: "darcula",
        // 缩进
        indentUnit: 4,
        // 光标高度
        cursorHeight: 0.85,
    })
    // 设置代码框的长宽
    editor.setSize('100%', '100%')
    editor.setSize(null, '500px', 'min-height')
    // 初始化代码内容
    let code = `const a = 1
for (let i = 0; i < 3; i ++) {
    let c = 2
}
if (a = 3) {
    let b = 3
    console.log('测试', b)
}
const testFunction = function() {
    let test = 3
}
class TestClass {
    constructor() {
        this.a = 3
    }
}
testFunction()
`
    editor.setValue(code)
    logInsertEvent(code)
    return editor
}

const initSelect = (list) => {
    let functionBar = e('.function-bar')
    let t = `<select class="model-styles" id="model-styles">`
    for (const listElement of list) {
        if (listElement === 'darcula') {
            t += `<option value="${listElement}" selected="selected">${listElement}</option>`
        } else {
            t += `<option value="${listElement}">${listElement}</option>`
        }
    }
    t += `</select>`
    functionBar.insertAdjacentHTML('beforeend', t)
}

const selectEvent = (editor) => {
    let selectContainer = e('#model-styles')
    selectContainer.addEventListener('change', (event) => {
        let self = event.target
        // 更新编辑器的主题选项
        for (const editorElement of editor) {
            editorElement.setOption("theme", self.value);
        }
    })
}

const __main = () => {
    let editor = initEditor()
    initSelect(list)
    selectEvent([editor])
    bindEvents(editor)
}

__main()
},{"./log.js":1,"./src/lexer.js":4,"./src/parser/index.js":5}],3:[function(require,module,exports){
const {
    TokenType,
} = require('./type')

let op2 = ['==', '!=', '<', '>', '<=', '>=', 'and', 'or',
    '+', '-', '*', '/', '%',
]

let literalType = [
    TokenType.string, TokenType.bool,
    TokenType.number, TokenType.this,
]

let statementTypes = [
    TokenType.string, TokenType.bool,
    TokenType.identifier, TokenType.number,
    TokenType.con, TokenType.var, TokenType.const, TokenType.let,
    TokenType.operator,
    TokenType.if, TokenType.curlyLeft,
    TokenType.break,
    TokenType.continue,
    TokenType.return,
    TokenType.this,
    TokenType.comment,
    TokenType.for,
    TokenType.while,
    TokenType.class,
]

let singleExpressionTypes = [
    TokenType.identifier,
    ...literalType,
    TokenType.bracketLeft,
]

module.exports = {
    op2,
    literalType,
    statementTypes,
    singleExpressionTypes,
}
},{"./type":52}],4:[function(require,module,exports){
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

},{"./type":52,"./util":53}],5:[function(require,module,exports){
const {
    log,
} = require('../util')

const {
    singleExpressionTypes,
} = require('../config')
const { program } = require('./methods/program')

// methods 文件夹下的 index.js 文件导出的 fetchExports(__dirname) 函数
// const parseMethods = require('./methods')
const {blockStatement} = require("./methods/statement/blockStatement");
const {commentStatement} = require("./methods/statement/commentStatement");
const {breakStatement} = require("./methods/statement/control_flow/breakStatement");
const {continueStatement} = require("./methods/statement/control_flow/continueStatement");
const {ifStatement} = require("./methods/statement/control_flow/ifStatement");
const {returnStatement} = require("./methods/statement/control_flow/returnStatement");
const {classDeclaration} = require("./methods/statement/declaration/classDeclaration");
const {functionDeclaration} = require("./methods/statement/declaration/functionDeclaration");
const {importDeclaration} = require("./methods/statement/declaration/importDeclaration");
const {importSpecifier} = require("./methods/statement/declaration/importSpecifier");
const {variableDeclaration} = require("./methods/statement/declaration/variableDeclaration");
const {variableStatement} = require("./methods/statement/declaration/variableStatement");
const {arrayExpression} = require("./methods/statement/expression/arrayExpression");
const {assignmentExpression} = require("./methods/statement/expression/assignmentExpression");
const {binaryExpression} = require("./methods/statement/expression/binaryExpression");
const {callExpression} = require("./methods/statement/expression/callExpression");
const {classbody} = require("./methods/statement/expression/class/classbody");
const {classExpression} = require("./methods/statement/expression/class/classExpression");
const {classMethod} = require("./methods/statement/expression/class/classMethod");
const {classProperty} = require("./methods/statement/expression/class/classProperty");
const {newExpression} = require("./methods/statement/expression/class/newExpression");
const {objectExpression} = require("./methods/statement/expression/dict/objectExpression");
const {propertyAssignment} = require("./methods/statement/expression/dict/propertyAssignment");
const {propertyNameAndValueList} = require("./methods/statement/expression/dict/propertyNameAndValueList");
const {elementList} = require("./methods/statement/expression/elementList");
const {expressionSequence} = require("./methods/statement/expression/expressionSequence");
const {argumentList} = require("./methods/statement/expression/function/argumentList");
const {assignmentPattern} = require("./methods/statement/expression/function/assignmentPattern");
const {formalParameterList} = require("./methods/statement/expression/function/formalParameterList");
const {functionExpression} = require("./methods/statement/expression/function/functionExpression");
const {_arguments} = require("./methods/statement/expression/function/_arguments");
const {identifier} = require("./methods/statement/expression/identifier");
const {literal} = require("./methods/statement/expression/literal");
const {memberExpression} = require("./methods/statement/expression/memberExpression");
const {singleExpression, is_current_singleExpression} = require("./methods/statement/expression/singleExpression");
const {unaryExpression} = require("./methods/statement/expression/unaryExpression");
const {expressionStatement} = require("./methods/statement/expressionStatement");
const {forStatement} = require("./methods/statement/loops/forStatement");
const {whileStatement} = require("./methods/statement/loops/whileStatement");
const {statement} = require("./methods/statement/statement");
const {statementList} = require("./methods/statement/statementList");
const {generics} = require("./methods/type/generics");
const {typeModification} = require("./methods/type/typeModification");
const {updateExpression} = require("./methods/statement/expression/updateExpression");
const {thisExpression} = require("./methods/statement/expression/class/thisExpression");

class Parser {
    constructor(tokens) {
        this.tokens = tokens
        this.index = 0
        this.ast = null
        // // 把解析节点的方法从子文件中加进来
        // Object.entries(parseMethods).forEach(([name, func]) => {
        //     // name 是当前文件名
        //     // func 是对应导出的函数
        //     this[name] = func
        //     console.log(name, func)
        // })
        this.program = program
        this.blockStatement = blockStatement
        this.commentStatement = commentStatement
        this.breakStatement = breakStatement
        this.continueStatement = continueStatement
        this.ifStatement = ifStatement
        this.returnStatement = returnStatement
        this.classDeclaration = classDeclaration
        this.functionDeclaration = functionDeclaration
        this.importDeclaration = importDeclaration
        this.importSpecifier = importSpecifier
        this.variableDeclaration = variableDeclaration
        this.variableStatement = variableStatement
        this.arrayExpression = arrayExpression
        this.assignmentExpression = assignmentExpression
        this.binaryExpression = binaryExpression
        this.callExpression = callExpression
        this.classbody = classbody
        this.classExpression = classExpression
        this.classMethod = classMethod
        this.classProperty = classProperty
        this.newExpression = newExpression
        this.thisExpression = thisExpression
        this.objectExpression = objectExpression
        this.propertyAssignment = propertyAssignment
        this.propertyNameAndValueList = propertyNameAndValueList
        this.elementList = elementList
        this.expressionSequence = expressionSequence
        this.argumentList = argumentList
        this.assignmentPattern = assignmentPattern
        this.formalParameterList = formalParameterList
        this.functionExpression = functionExpression
        this._arguments = _arguments
        this.identifier = identifier
        this.literal = literal
        this.memberExpression = memberExpression
        this.singleExpression = singleExpression
        this.is_current_singleExpression = is_current_singleExpression
        this.unaryExpression = unaryExpression
        this.expressionStatement = expressionStatement
        this.forStatement = forStatement
        this.whileStatement = whileStatement
        this.statement = statement
        this.statementList = statementList
        this.generics = generics
        this.typeModification = typeModification
        this.updateExpression = updateExpression
        this.parse()
    }

    // 吃掉当前字符
    eat(token) {
        // 拿到当前字符
        let t = this.current()
        // index += 1
        this.index += 1
        if (t.value !== token) {
            throw (`错误 token「${token}」 「${t.type}」「${t.value}」${this.index}`)
        }
        // 返回当前字符
        return t
    }

    current() {
        return this.tokens[this.index]
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

    parse() {
        let ast = this.program()
        // log('ast', ast)
        this.ast = ast

    }
}

module.exports = {
    Parser,
}
},{"../config":3,"../util":53,"./methods/program":6,"./methods/statement/blockStatement":7,"./methods/statement/commentStatement":8,"./methods/statement/control_flow/breakStatement":9,"./methods/statement/control_flow/continueStatement":10,"./methods/statement/control_flow/ifStatement":11,"./methods/statement/control_flow/returnStatement":12,"./methods/statement/declaration/classDeclaration":13,"./methods/statement/declaration/functionDeclaration":14,"./methods/statement/declaration/importDeclaration":15,"./methods/statement/declaration/importSpecifier":16,"./methods/statement/declaration/variableDeclaration":17,"./methods/statement/declaration/variableStatement":18,"./methods/statement/expression/arrayExpression":20,"./methods/statement/expression/assignmentExpression":21,"./methods/statement/expression/binaryExpression":22,"./methods/statement/expression/callExpression":23,"./methods/statement/expression/class/classExpression":24,"./methods/statement/expression/class/classMethod":25,"./methods/statement/expression/class/classProperty":26,"./methods/statement/expression/class/classbody":27,"./methods/statement/expression/class/newExpression":28,"./methods/statement/expression/class/thisExpression":29,"./methods/statement/expression/dict/objectExpression":30,"./methods/statement/expression/dict/propertyAssignment":31,"./methods/statement/expression/dict/propertyNameAndValueList":32,"./methods/statement/expression/elementList":33,"./methods/statement/expression/expressionSequence":34,"./methods/statement/expression/function/_arguments":35,"./methods/statement/expression/function/argumentList":36,"./methods/statement/expression/function/assignmentPattern":37,"./methods/statement/expression/function/formalParameterList":38,"./methods/statement/expression/function/functionExpression":39,"./methods/statement/expression/identifier":40,"./methods/statement/expression/literal":41,"./methods/statement/expression/memberExpression":42,"./methods/statement/expression/singleExpression":43,"./methods/statement/expression/unaryExpression":44,"./methods/statement/expression/updateExpression":45,"./methods/statement/expressionStatement":19,"./methods/statement/loops/forStatement":46,"./methods/statement/loops/whileStatement":47,"./methods/statement/statement":48,"./methods/statement/statementList":49,"./methods/type/generics":50,"./methods/type/typeModification":51}],6:[function(require,module,exports){
const {ProgramNode} = require("../../type");
const program = function () {
    // Program: Statement*
    // Statement :
    //     BlockStatement
    //     VariableStatement
    //     EmptyStatement
    //     ExpressionStatement
    //     IfStatement
    //     Loops
    //          ForStatement
    //          ForInStatement
    //          WhileStatement
    //     Control flow
    //          ContinueStatement
    //          BreakStatement
    //          ReturnStatement
    // Declarations
    //          FunctionDeclaration
    //          VariableDeclaration
    //              VariableDeclarator
    // commentStatement
    let body = []
    while (this.index < this.tokens.length) {
        // 对 token 进行 parser 处理，然后 push 进 body 这个数组中
        let s = this.statement()
        body.push(s)
    }
    // 返回最外层的 program 对象
    let p = new ProgramNode(body)
    return p
}

module.exports = {
    program,
}
},{"../../type":52}],7:[function(require,module,exports){
const {BlockStatement} = require("../../../type");
const blockStatement = function () {
    // blockStatement:
    // { statementList? }
    let e1 = this.eat('{') // 吃掉 { 这里可以不用赋值，直接调用
    let t = this.current() // 拿到当前 token
    let b = null
    if (t.value === '}') {
        // 如果当前 token 是 }，那么就是空的 blockStatement，如 if (a === 2) {}
        let e2 = this.eat('}')
        b = new BlockStatement([])
    } else {
        let l = this.statementList() // 拿到 {} 内所有内容的 ast 组成的数组
        let e2 = this.eat('}') // 吃掉 }
        b = new BlockStatement(l) // 组成 blockStatement
    }
    return b
}

module.exports = {
    blockStatement,
}
},{"../../../type":52}],8:[function(require,module,exports){
const {CommentStatement} = require("../../../type");
const commentStatement = function () {
    // CommentStatement
    let t = this.current()
    this.index += 1
    let c = new CommentStatement(t.value)
    return c
}

module.exports = {
    commentStatement,
}
},{"../../../type":52}],9:[function(require,module,exports){
const {BreakStatement} = require("../../../../type");

const breakStatement = function () {
    // 直接生成 break 的 ast node 这没啥说的
    this.index += 1
    let b = new BreakStatement()
    return b
}

module.exports = {
    breakStatement,
}
},{"../../../../type":52}],10:[function(require,module,exports){
const {ContinueStatement} = require("../../../../type");
const continueStatement = function () {
    this.index += 1
    let b = new ContinueStatement()
    return b
}
module.exports = {
    continueStatement,
}
},{"../../../../type":52}],11:[function(require,module,exports){
const {TokenType, IfStatement} = require("../../../../type");
const ifStatement = function () {
    // ifStatement:
    // If '(' expressionSequence ')' statement ( Else statement )?
    // 吃掉 if 和 （
    this.eat('if')
    this.eat('(')
    // if 内的表达式
    let test = this.expressionSequence()
    // 吃掉 ）
    this.eat(')')
    // if 中括号内的语句
    let consequent = this.statement()
    let alternate = null
    let t = this.current() // 拿到当前的 token
    // 如果当前的 token 是 else
    if (t && t.value === TokenType.else) {
        // 吃掉 else
        this.eat('else')
        // 继续走 else 后面的语句 可以是 if（也就是 else if 语句），也可以是 else 后面的 {} 语句
        alternate = this.statement()
    }
    let i = new IfStatement(test, consequent, alternate)
    return i
}

module.exports = {
    ifStatement,
}
},{"../../../../type":52}],12:[function(require,module,exports){
const {ReturnStatement} = require("../../../../type");
const returnStatement = function () {
    // returnStatement:
    // return singleExpression?
    this.eat('return')
    let arg = []
    // 判断当前 token 有没有可能是 singleExpression
    if (this.is_current_singleExpression()) {
        // 如果是的话就是单一表达式
        arg = this.singleExpression()
    }
    let r = new ReturnStatement(arg)
    return r
}

module.exports = {
    returnStatement,
}
},{"../../../../type":52}],13:[function(require,module,exports){
const {ClassType, ClassDeclaration} = require("../../../../type");
const classDeclaration = function () {
    // classDeclaration:
    // Class Indentifier classbody
    /**
     * class 的例子
     * class Demo {
     *     static a = 1
     * }
     * */
    this.eat('class')
    let id = this.identifier() // class 的名字
    let body = this.classbody() // class 的 body

    let properties = []
    let methods = []
    body.forEach(b => {
        // 如果当前的 token 的类型是类的参数
        if (b.type === 'ClassProperty') {
            // log('pro', b)
            properties.push({
                ...b.key,
                _static: b._static,
            })
            // log('properties', properties)
        } else {
            // log('b is', b)
            methods.push({
                ...b.key,
                varType: b.value.varType,
                // 注意，本来 type 里是不需要有函数的具体代码的
                // 只要函数的类型就行
                // 但是为了方便代码生成，这里把函数具体代码 ast 也加进来
                value: b.value,
            })
        }
    })

    let type = new ClassType(id.name, properties, methods) // 生成类的类型
    // log('tye', type.methods)
    let f = new ClassDeclaration(body, null, id, type) // 生成类
    return f
}

module.exports = {
    classDeclaration,
}
},{"../../../../type":52}],14:[function(require,module,exports){
const {TokenType, FunctionDeclaration} = require("../../../../type");
const functionDeclaration = function () {
    // functionDeclaration:
    // Function Identifier? '(' formalParameterList? ')' (typeModification)?  statement
    this.eat('function') // 先把函数声明的关键字吃了
    let id = null
    if (this.current().type === TokenType.identifier) {
        // 如果当前的 token 的类型是一个字母
        id = this.identifier() // 那么当前就不是一个匿名函数，而是一个具名函数，id 就是当前的函数名
    }
    this.eat('(') // 函数声明后面必须是一个 (，这里吃掉
    let params = []
    // 如果当前的 token 是一个字母，那么就是一个参数列表
    if (this.current().type === TokenType.identifier) {
        // 定义参数列表
        params = this.formalParameterList()
    }
    this.eat(')')
    // 如果有 :，说明有类型标注
    let type = undefined
    if (this.current().value === ':') {
        // 定义类型参数
        type = this.typeModification()
    }

    // 定义函数体
    let body = this.statement()
    let f = new FunctionDeclaration(body, params, id, type) // 组成 函数的 ast
    return f
}
module.exports = {
    functionDeclaration,
}
},{"../../../../type":52}],15:[function(require,module,exports){
const {TokenType, ImportDeclaration} = require("../../../../type");
const importDeclaration = function () {
    // importDeclaration:
    // import { importSpecifier  (, (importSpecifier))* } from string
    // 看来这里只支持 import { xxx } from './xxx' 这种
    // 不支持 import xxx from './xxx' 这种
    this.eat('import')
    this.eat('{') // 这里应该加一个判断 判断引入的是否为静态方法
    let l = []
    // 当前的 token 是字母变量 也就是 { xxx } 中的 xxx
    while (this.current().type === TokenType.identifier) {
        let i = this.importSpecifier() // 生成 import 的 ast
        l.push(i)
        if (this.current().value === ',') {
            // 如果有 ，就吃掉，如 { xxx, yyy }
            this.eat(',')
        }
    }
    this.eat('}')
    this.eat('from')
    let str = this.literal() // from 后的路径字符串
    let r = new ImportDeclaration(l, str) // 组成 import 的 ast
    return r
}

module.exports = {
    importDeclaration,
}
},{"../../../../type":52}],16:[function(require,module,exports){
const {ImportSpecifier} = require("../../../../type");
const importSpecifier = function () {
    // ImportSpecifier:
    //     identifier
    let i = this.identifier()
    let r = new ImportSpecifier(i)
    return r
}

module.exports = {
    importSpecifier,
}
},{"../../../../type":52}],17:[function(require,module,exports){
const {TokenType, ThisExpression, MemberExpression, VariableDeclarator} = require("../../../../type");
const variableDeclaration = function () {
    // variableDeclaration:
    // (this .)? Identifier typeModification? Initialiser?

    let id = null
    if (this.current().type === TokenType.this) {
        // 如果当前定义的变量是 this 开头的
        // 要先吃掉 this 和 .
        this.eat('this')
        this.eat('.')
        let property = this.identifier() // 拿到定义的变量的 ast
        let object = new ThisExpression()
        id = new MemberExpression(object, property)
    } else {
        id = this.identifier()
    }

    // let varType = undefined
    // if (this.current().value === ':') {
    //     // 标注了类型
    //     varType = this.typeModification()
    // }

    let init = null
    let t = this.current()
    if (t.type === TokenType.assign) {
        // initialiser:
        // '=' singleExpression
        this.eat('=')
        init = this.singleExpression()
    }
    // let v = new VariableDeclarator(id, init, varType)
    let v = new VariableDeclarator(id, init)

    return [v]
}

module.exports = {
    variableDeclaration,
}
},{"../../../../type":52}],18:[function(require,module,exports){
const {TokenType, VariableDeclaration} = require("../../../../type");
const variableStatement = function () {
    // variableStatement:
    // (con | const | var) variableDeclaration:

    let t = this.current() // 拿到当前的 token
    // 变量类型支持 con var const let 四种
    if (t.type === TokenType.con) {
        this.eat('con')
    } else if (t.type === TokenType.var) {
        this.eat('var')
    } else if (t.type === TokenType.const) {
        this.eat('const')
    } else if (t.type === TokenType.let) {
        this.eat('let')
    } else {
        throw ('错误类型')
    }
    // 如果有 : 则是类型声明
    // let type = undefined
    // if (this.current().value === ':') {
    //     type = this.typeModification()
    // }
    let declarations = this.variableDeclaration() // 组成变量声明 ast
    // let v = new VariableDeclaration(t, declarations, type)
    let v = new VariableDeclaration(t, declarations)
    return v
}
module.exports = {
    variableStatement,
}
},{"../../../../type":52}],19:[function(require,module,exports){
const {ExpressionStatement} = require("../../../type");
const expressionStatement = function () {
    // ExpressionStatement: expressionSequence
    let e = this.expressionSequence()
    // 组成一个 ExpressionStatement 对象
    let es = new ExpressionStatement(e)
    return es
}

module.exports = {
    expressionStatement,
}
},{"../../../type":52}],20:[function(require,module,exports){
const {singleExpressionTypes} = require("../../../../config");
const {ArrayExpression} = require("../../../../type");
const arrayExpression = function () {
    // arrayLiteral
    //     : '[' elementList? ']'
    this.eat('[') // 先吃掉 [
    let t = this.current() // 拿到当前的 token
    let elements = []
    if (singleExpressionTypes.includes(t.type)) {
        // 如果当前的 token 可能是 singleExpression（变量、字符串、数字、布尔值、this 以及 [）
        // elements 就是 [] 中所有元素的 ast 格式
        elements = this.elementList()
    }
    // 吃掉 ]
    this.eat(']')
    // 通过 elements 构建数组的 ast 对象
    let a = new ArrayExpression(elements)
    return a
}

module.exports = {
    arrayExpression,
}
},{"../../../../config":3,"../../../../type":52}],21:[function(require,module,exports){
// 如果传了 member，说明是 memberExpression = singleExpression
const {TokenType, ThisExpression, MemberExpression, AssignmentExpression} = require("../../../../type");
const assignmentExpression = function (member) {
    // assignmentExpression:
    // ( MemberExpression | (this .)? identifier)
    // '=' singleExpression
    let left = null
    if (member !== undefined) {
        left = member
    } else if (this.current().type === TokenType.this) {
        // 当前的 type 是 this 时，吃掉 this 和 .
        this.eat('this')
        this.eat('.')
        // 构建 this 的 ast 结构
        let object = new ThisExpression()
        // 拿到 this 后面的变量
        let property = this.identifier()
        // 合成 MemberExpression 结构
        left = new MemberExpression(object, property)
    } else {
        left = this.identifier()
    }
    let op = null
    let t = this.current()
    if (['=', '+=', '*=', '/=', '%/'].includes(t.value)) {
        // 当前是 a+= 这种情况，吃掉 a
        op = this.eat(t.value)
    } else {
        throw ('其他')
    }
    let right = this.singleExpression()
    let a = new AssignmentExpression(left, right, op)
    return a
}

module.exports = {
    assignmentExpression,
}
},{"../../../../type":52}],22:[function(require,module,exports){
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
},{"../../../../config":3,"../../../../type":52}],23:[function(require,module,exports){
const {
    CallExpression,
    TokenType
} = require("../../../../type")

// 这里是表达式内的 ()，if 不走这里的逻辑
// 例如 console.log('gua')，log 的括号就走这里
const callExpression = function () {
    // callExpression:
    // identifier _arguments |
    // memberExpression
    let t = this.current() // 这行不需要
    let p = this.peek() // 拿到下一个字符
    if (p.type === TokenType.kohkLeft) { // 下一个字符如果是 (
        let callee = this.identifier() // callee 是一个变量，也是 ( 前的一个字符，也就是现在的字符 this.current 要输出的 ast 格式
        let args = this._arguments() // 输出括号内的 ast
        let c = new CallExpression(callee, args) // 这里拿到调用括号函数（变量）的ast，以及括号中参数的 ast，通过这个类进行组装然后返回
        return c
    } else if ([TokenType.bracketLeft, TokenType.colon, TokenType.dot].includes(p.type)) {
        // [或者:或者. 即左方括号，冒号，点
        // o['k'] 或者 o['k'] = 1 或 this.k = 1
        let m = this.memberExpression()
        let t = this.current()
        if (t && t.type === TokenType.assign) {
            // 是 o['k'] = 1 这种情况
            m = this.assignmentExpression(m)
        }
        return m
    } else {
        throw ('其他')
    }
}

module.exports = {
    callExpression,
}
},{"../../../../type":52}],24:[function(require,module,exports){
// 只有 gl 里才是 classExpression
// con Student = Class() {}
// js 里没有
const {TokenType, ClassExpression} = require("../../../../../type");
const classExpression = function () {
    // classExpression:
    // Class Indentifier classbody
    this.eat('class')
    let id = null
    let superClass = null
    // this.eat('(')
    if (this.current().type === TokenType.identifier) {
        superClass = this.identifier()
    }
    // this.eat(')')
    let body = this.classbody()
    let f = new ClassExpression(body, superClass, id)
    return f
}
module.exports = {
    classExpression,
}
},{"../../../../../type":52}],25:[function(require,module,exports){
const {TokenType, FunctionType, FunctionExpression, ClassMethod} = require("../../../../../type");

// js版
const classMethod = function () {
    // classMethod:
    // static? identifier ( formalParameterList? ) (typeModification)?  statement
    let isstatic = false // 是否为静态方法
    if (this.current().type === TokenType.static) {
        isstatic = true // 是静态方法
        this.eat('static') // 吃掉 static 关键字
    }
    let key = this.identifier() // 当前方法的名字
    // log('key', key)
    this.eat('(') // 吃掉函数的 (
    // 函数参数
    let params = []
    if (this.current().type === TokenType.identifier) {
        // 生产函数体
        params = this.formalParameterList()
    }
    this.eat(')')
    let returnType = 'void' // 当前函数的返回值类型
    if (this.current().value === ':') {
        // 如果存在类型定义，那么就是类型定义(copilot生成的废话 哈哈）
        returnType = this.typeModification()
    }
    let type = new FunctionType(params, returnType) // 函数类型 ast

    // 函数体
    let body = this.statement()
    // log('b', body)
    // forEach 是直接修改原数组的
    body.body.forEach(b => {
        // 有返回且没有类型标注，那就是 any
        if (b.type === 'ReturnStatement' || returnType === 'void') {
            returnType = 'any'
        }
    })
    let value = new FunctionExpression(body, params, null, type)
    let p = new ClassMethod(key, value, isstatic)
    // log('p is', p)
    return p
}

module.exports = {
    classMethod,
}


// gl版
// classMethod() {
//     // classMethod:
//     // (var | con) (class .)? identifier = singleExpression
//     let t = this.current()
//     let kind = null
//     if (t.type === TokenType.var) {
//         kind = this.eat('var')
//     } else if (t.type === TokenType.con) {
//         kind = this.eat('con')
//     } else {
//         throw ('其他')
//     }
//     let _static = false
//     if (this.current().type === TokenType.class) {
//         this.eat('class')
//         this.eat('.')
//         _static = true
//     }
//     let key = this.identifier()
//     this.eat('=')
//     let value = this.singleExpression()
//     let p = new ClassMethod(key, value, _static, kind)
//     return p
// }
},{"../../../../../type":52}],26:[function(require,module,exports){
const {ClassProperty} = require("../../../../../type");
const classProperty = function () {
    // classProperty:
    // (static)? identifier (= singleExpression)?
    let isstatic = false // 是否为静态方法
    // 当前的 token 是静态方法关键字时
    if (this.current().value === 'static') {
        isstatic = true
        this.eat('static') // 吃掉 static
    }
    let i = this.identifier() // i 是变量名
    let v = null
    // 当前的值是 = 时
    // 如 static a = 1
    if (this.current().value === '=') {
        this.eat('=')
        v = this.singleExpression() // 单一表达式
    }
    let c = new ClassProperty(i, v, isstatic)
    return c
}

module.exports = {
    classProperty,
}
},{"../../../../../type":52}],27:[function(require,module,exports){
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
},{"../../../../../type":52}],28:[function(require,module,exports){
const {NewExpression} = require("../../../../../type");
const newExpression = function () {
    // 这里也没什么说的 处理 new 表达式
    // newExpression:
    // new identifier _arguments
    this.eat('new')
    let callee = this.identifier()
    let _arguments = this._arguments() // 构建 class 表达式是里的 constructor 的参数
    let n = new NewExpression(callee, _arguments)
    return n
}
module.exports = {
    newExpression,
}
},{"../../../../../type":52}],29:[function(require,module,exports){
const {ThisExpression} = require("../../../../../type");
const thisExpression = function () {
    this.index += 1
    let t = new ThisExpression()
    return t
}
module.exports = {
    thisExpression,
}
},{"../../../../../type":52}],30:[function(require,module,exports){
const {TokenType, ObjectExpression} = require("../../../../../type");
const objectExpression = function () {
    // objectLiteral
    //     : '{' '}'
    // | '{' propertyNameAndValueList ',' '}'
    this.eat('{') // 先吃掉 {
    let properties = []
    let t = this.current() // 拿到当前的 token
    if ([TokenType.identifier, TokenType.string].includes(t.type)) {
        // 当前的 token 是 字母或者字符串时
        properties = this.propertyNameAndValueList()
    }
    // this.eat(',') // 吃掉逗号（我感觉这里不严谨，如果最后一个元素没有逗号，这里就会报错），如：{ gua: '169' } 我直接改了
    if (t.type === TokenType.comma) {
        this.eat(',')
    }
    /**
     * 我认为13行应该这么改
     *     let t = this.current()
     *     if (t.type === TokenType.comma) {
     *         this.eat(',')
     *     }
     * */
    this.eat('}') // 吃掉右括号
    let o = new ObjectExpression(properties) // 根据对象里面的内容的 ast 组成对象的 ast
    return o
}
module.exports = {
    objectExpression,
}
},{"../../../../../type":52}],31:[function(require,module,exports){
const {TokenType, Property} = require("../../../../../type");
const propertyAssignment = function () {
    // propertyAssignment
    //     : propertyName ':' singleExpression

    // propertyName :
    // identifier
    // | StringLiteral
    let t = this.current() // 拿到当前的 token
    let key = null
    if (t.type === TokenType.string) { // 当前的 token 是字符串时
        key = this.literal() // 当前的 key 是原始类型
    } else if (t.type === TokenType.identifier) { // 当前的token是变量时
        key = this.identifier() // 当前的 key 是变量类型
    } else {
        throw (`错误类型 ${t.value}`)
    }
    this.eat(':') // 吃掉冒号
    let value = this.singleExpression() // 拿到对象右面的value，如： { k: 'hello' }，拿到这个 hello
    let p = new Property(key, value) // 将 key 和 value 组合成一个对象
    return p
}
module.exports = {
    propertyAssignment,
}
},{"../../../../../type":52}],32:[function(require,module,exports){
const {TokenType} = require("../../../../../type");
const propertyNameAndValueList = function () {
    // propertyNameAndValueList
    //     : propertyAssignment ( ',' propertyAssignment )*


    /**
     * {
     *     name: 'gua',
     *     height: '169',
     * }
     * */

    let l = []
    let p = this.propertyAssignment() // 拿到 key 和 value 组成的 ast 对象
    // 这里的 p 是 name: 'gua' 的数据
    l.push(p) // 推到数组里
    let t = this.current() // 拿到当前的 token
    let next = this.peek() // 拿到下一个
    // 要 peek 一下，排除 ,} 的情况
    // {a : 1,}
    // 如果当前的 token 是逗号，且下一个 token 不是 } 时
    while (t.type === TokenType.comma && next.type !== TokenType.curlyRight) {
        this.eat(',') // 吃掉逗号
        let p1 = this.propertyAssignment() // 组成当前的 key 和 value，这里的逻辑和第六行一样
        // 这里的 p1 是 height: '169' 的数据
        l.push(p1)
        t = this.current() // 重复循环外层的操作
        next = this.peek()
    }
    // 这里拿到的就是整个对象的 key 和 value 组成的数组
    // 这里是 name: 'gua' 和 height: '169' 的 ast 对象组成的数组
    return l
}

module.exports = {
    propertyNameAndValueList,
}
},{"../../../../../type":52}],33:[function(require,module,exports){
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
},{"../../../../type":52}],34:[function(require,module,exports){
const expressionSequence = function () {
    // expressionSequence:
    // singleExpression ( ',' singleExpression )*
    // 这里不考虑逗号语法
    return this.singleExpression()
}
module.exports = {
    expressionSequence,
}
},{}],35:[function(require,module,exports){
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
},{"../../../../../type":52}],36:[function(require,module,exports){
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
},{"../../../../../config":3,"../../../../../type":52}],37:[function(require,module,exports){
const {AssignmentPattern} = require("../../../../../type");
// 处理赋值表达式
const assignmentPattern = function () {
    // assignmentPattern:
    // Identifier = singleExpression
    let left = this.identifier() // 当前的 token 是变量名，转换成变量名的 ast
    this.eat('=') // 吃掉赋值的 =
    let right = this.singleExpression() // 右侧是被赋予的值
    let a = new AssignmentPattern(left, right) // 组装赋值表达式的 ast
    return a
}

module.exports = {
    assignmentPattern,
}
},{"../../../../../type":52}],38:[function(require,module,exports){
const {TokenType} = require("../../../../../type");
const formalParameterList = function () {
    // formalParameterList:
    // Identifier typeModification? (= singleExpression)?   ( ',' Identifier typeModification?  (= singleExpression)? )*
    let l = []
    let i = null
    if (this.peek().type === TokenType.assign) {
        // 下一个 token 是 =，说明是赋值表达式
        i = this.assignmentPattern()
    } else {
        i = this.identifier() // 否则就是变量名
    }
    l.push(i)

    // 如果有 :，说明还有类型标注
    let varTypes = []
    if (this.current().value === ':') {
        let t = this.typeModification()
        varTypes.push(t)
    }

    // 处理过第一个参数之后，就是处理后面的参数
    while (this.current().type === TokenType.comma) {
        // 逻辑和上面的一样
        this.eat(',')
        let i = null
        if (this.peek().type === TokenType.assign) {
            i = this.assignmentPattern()
        } else {
            i = this.identifier()
        }
        // 如果有 :，说明还有类型标注
        if (this.current().value === ':') {
            let t = this.typeModification()
            varTypes.push(t)
        }
        l.push(i)
    }
    // 给 identifier 加上类型
    varTypes.forEach((v, index) => l[index].varType = v)
    // log('l is', l)
    return l
}
module.exports = {
    formalParameterList,
}
},{"../../../../../type":52}],39:[function(require,module,exports){
const {TokenType, FunctionType, FunctionExpression} = require("../../../../../type");
const functionExpression = function () {
    // functionDeclaration:
    // Function '(' formalParameterList? ')' (typeModification)?  statement
    this.eat('function') // 先把 function 吃掉
    let id = null
    this.eat('(') // 再把 ( 吃掉
    let params = []
    if (this.current().type === TokenType.identifier) {
        // 如果当前的 token 是变量名，说明有参数
        params = this.formalParameterList()
    }
    this.eat(')') // 结束函数参数
    // 如果有 :，说明有类型标注
    let returnType = undefined
    if (this.current().value === ':') {
        returnType = this.typeModification() // 类型处理
    }
    let type = new FunctionType(params, returnType) // 构建 ast 参数
    let body = this.statement() // 处理函数体
    let f = new FunctionExpression(body, params, id, type) // 构建函数表达式的 ast
    return f
}
module.exports = {
    functionExpression,
}
},{"../../../../../type":52}],40:[function(require,module,exports){
const {Identifier} = require("../../../../type")

const identifier = function () {
    // a typeModification?
    let t = this.current()
    this.index += 1
    let varType = undefined
    // 这里因为 index 已经 += 1了，所以取得就是下一个字符，判断他是不是 :
    if (this.current() && this.current().value === ':') {
        varType = this.typeModification()
    }
    let i = new Identifier(t.value, varType)
    return i
}

module.exports = {
    identifier,
}

},{"../../../../type":52}],41:[function(require,module,exports){
const {Literal} = require("../../../../type");
const literal = function () {
    let t = this.current()
    let l = new Literal(t)
    this.index += 1
    return l
}

module.exports = {
    literal,
}
},{"../../../../type":52}],42:[function(require,module,exports){
const {
    AssignmentExpression,
    MemberExpression,
    TokenType
} = require("../../../../type")

const memberExpression = function () {
    // memberExpression:
    // identifier '[' singleExpression ']' |
    // identifier ':' singleExpression |
    // this '.' singleExpression |
    // class '.' singleExpression
    let object = null
    let t = this.current() // 拿到当前 token
    if (t.type === TokenType.identifier) { // 当前token是变量
        object = this.identifier() // object 是变量的 ast，并且 index += 1
    } else if (t.type === TokenType.this) { // 当前 token 是 this
        object = this.thisExpression() // 返回 this 的 ast，并且 index += 1
    } else if (t.type === TokenType.class) {
        object = t // object 是 token，也就是 class
        this.index += 1
    } else {
        // 没有匹配到
        throw `${t.type}`
    }
    let property = null
    let computed = false
    // 当前的 token 的 type 是 [ 时
    if (this.current().type === TokenType.bracketLeft) {
        // 把左括号吃掉
        this.eat('[')
        // 方括号中的内容
        property = this.singleExpression() // 拿到方括号中的内容
        // 吃掉右括号
        this.eat(']')
        computed = true
    } else if (this.current().type === TokenType.colon) {
        // 吃掉冒号
        /** 例子：
         * {
              a: 123
           }
         * */
        this.eat(':')
        property = this.singleExpression()
    } else if (this.current().type === TokenType.dot) {
        // 吃掉 .
        this.eat('.')
        // 例子：this.a
        property = this.singleExpression()
        // log('prop', property)
        if (property.type === 'AssignmentExpression') {
            // this.a = 1
            // 现在切成了 this   a=1，类型是 MemberExpression
            // 应该切成 this.a  = 1，类型是 AssignmentPattern
            // 对 AssignmentExpression 类型做单独的处理
            let {left, right} = property // 拿到左右两边的 ast
            left = new MemberExpression(object, left) // 把左边的 ast 包装成 MemberExpression
            let a = new AssignmentExpression(left, right, property.operator) // 把左右两边的 ast 包装成 AssignmentExpression
            return a
        }
    } else {
        throw ('其他')
    }
    // 返回 MemberExpression 的 ast
    let m = new MemberExpression(object, property, computed)
    return m
}
module.exports = {
    memberExpression,
}
},{"../../../../type":52}],43:[function(require,module,exports){
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
},{"../../../../config":3,"../../../../type":52}],44:[function(require,module,exports){
const {UnaryExpression} = require("../../../../type");
const unaryExpression = function () {
    // 这里没什么说的 直接构建一元表达式的 ast
    // unaryExpression:
    // (not | - ) identifier
    let op = this.current() // 拿到当前的 token
    // log('op', op)
    this.index += 1
    let i = this.identifier()
    let u = new UnaryExpression(op, i)
    return u
}

module.exports = {
    unaryExpression,
}
},{"../../../../type":52}],45:[function(require,module,exports){
const {TokenType, UpdateExpression, BinaryExpression} = require("../../../../type");
const updateExpression = function () {
   // ++ a
    let t = this.current().value
    let next = this.eat('+')
    if (!next) {
        throw (`其他类型 ${t.value} ${this.index}`)
    }
    let operator = t + next.value
    let n1 = null
    let token = this.current()
    if (token.type === TokenType.identifier) {
        n1 = this.identifier()
    }
    return new UpdateExpression(n1, operator, true)
}

module.exports = {
    updateExpression,
}
},{"../../../../type":52}],46:[function(require,module,exports){
const {ForStatement} = require("../../../../type");
const forStatement = function () {
    // forStatement
    // '(' expressionSequence? ';' expressionSequence? ';' expressionSequence? ')' statement
    /**
     * 下面是一个简单的 for 循环例子
     * for (let i = 0; i < 10; i++) {
     * }
     * */
    this.eat('for')
    this.eat('(')
    let init = this.variableStatement() // for 循环中的 let i = 0
    this.eat(';')
    let test = this.singleExpression() // for 循环中的循环终止条件 i < 10
    this.eat(';')
    let update = this.singleExpression() // 单一表达式 i ++
    this.eat(')')
    let body = this.statement() // for 循环体中的内容
    let w = new ForStatement(init, test, update, body) // 组成 for 循环的内容
    return w
}
module.exports = {
    forStatement,
}
},{"../../../../type":52}],47:[function(require,module,exports){
const {WhileStatement} = require("../../../../type");
const whileStatement = function () {
    // whileStatement
    // While '(' expressionSequence ')' statement
    this.eat('while')
    this.eat('(')
    let test = this.expressionSequence() // 拿到 while 循环中的 单一表达式
    this.eat(')')
    let body = this.statement() // 拿到循环中的 表达式
    let w = new WhileStatement(test, body) // 组成 while 语句的 ast
    return w
}

module.exports = {
    whileStatement,
}
},{"../../../../type":52}],48:[function(require,module,exports){
const {TokenType} = require("../../../type");
const {op2} = require("../../../config");
const statement = function () {
    // Statement :
    //     BlockStatement |
    //     EmptyStatement |
    //     ExpressionStatement |
    //     IfStatement |
    //     ForStatement |
    //     ForInStatement |
    //     WhileStatement |
    //     ContinueStatement |
    //     BreakStatement |
    //     ReturnStatement |
    //     FunctionDeclaration |
    //     VariableDeclaration |
    //     ClassDeclaration
    //     commentStatement
    // this.current() 在 parser 的 index.js 35行 中定义，拿到当前的 token
    let t = this.current()
    // 拿到下一个 token
    let p = this.peek()
    // log('t', t, p, this.index)
    let node = null
    if (
        [
            TokenType.string, TokenType.bool,
            TokenType.identifier, TokenType.number,
            TokenType.this, TokenType.minus,
            TokenType.plus
        ].includes(t.type)
    ) {
        // 字符串，数字，字母 都算 ExpressionStatement
        // 字符串，布尔值，字母，数字，this，减号
        node = this.expressionStatement()
    } else if ([TokenType.con, TokenType.var, TokenType.const, TokenType.let].includes(t.type)) {
        // 以 con 开头的就是变量声明
        // 所有的变量定义声明 走这个
        node = this.variableStatement()
    } else if (t.type === TokenType.if) {
        // 如果是 if 语句，组成 if node
        node = this.ifStatement()
    } else if (t.type === TokenType.curlyLeft) {
        // 当前是 { 这里要处理语句了
        node = this.blockStatement()
    } else if (t.type === TokenType.while) {
        // 当前是 while ，处理循环语句
        node = this.whileStatement()
    } else if (t.type === TokenType.for) {
        // 处理 for 循环
        node = this.forStatement()
    } else if (t.value === 'break') {
        // 处理 break 语句
        node = this.breakStatement()
    } else if (t.value === 'continue') {
        // 处理 continue 语句，与 break 语句类似，没啥说的
        node = this.continueStatement()
    } else if (t.type === TokenType.function) {
        // 处理函数语句，这里是函数声明，如 function a () {}
        node = this.functionDeclaration()
    } else if (t.type === TokenType.return) {
        // log('return')
        node = this.returnStatement()
    } else if (t.type === TokenType.comment) {
        // 当前的 token 是注释
        node = this.commentStatement()
    } else if (t.value + p.value === 'class.') {
        // class.xx 类属性
        // 这个我没想到例子，js有这样使用的语法么
        node = this.memberExpression()
    } else if (t.value === 'class') {
        // 实现 class 定义
        node = this.classDeclaration()
    } else if (t.value === 'import') {
        // 实现 import 引入
        node = this.importDeclaration()
    } else {
        throw (`其他类型${t.type} ${t.value} ${this.index}`)
    }
    // 拿到当前 token
    let current = this.current()

    if (current && op2.includes(current.value)) {
        // 是 expr + expr 这种类型
        // 单一表达式
        node = this.singleExpression(node.expression)
    }
    return node
}

module.exports = {
    statement,
}
},{"../../../config":3,"../../../type":52}],49:[function(require,module,exports){
const {statementTypes} = require("../../../config");
const statementList = function () {
    // statementList:
    // statement+
    let t = this.current() // 拿到当前 token
    let l = []
    while (statementTypes.includes(t.type)) {
        let s = this.statement() // 拿到 {} 内所有内容的 ast
        l.push(s) // 推进数组
        t = this.current() // 重新更新当前 token
    }
    return l
}

module.exports = {
    statementList,
}
},{"../../../config":3}],50:[function(require,module,exports){
const {indexOf} = require("../../../util");
const {Generics} = require("../../../type");
const generics = function () {
    // 泛型
    // 先切出 <>
    let list = this.tokens.slice(this.index)
    let right = indexOf(list, 'value', '>')
    // 拿到 <> 里的内容，并过滤掉「,」
    let inner = list.slice(2, right).map(e => e.value).filter(e => e !== ',')
    let g = new Generics(this.current().value, inner)
    this.index += (right + 1)
    return g
}

module.exports = {
    generics,
}
},{"../../../type":52,"../../../util":53}],51:[function(require,module,exports){
const typeModification = function () {
    // type modification:
    // : (基本类型 | 泛型 | 函数类型)
    let varType = undefined
    let basicType = ['number', 'boolean', 'string', 'undefined']

    this.eat(':')
    // 看一下是什么类型
    let p = this.current()
    if (basicType.includes(p.value)) {
        // 基本类型
        varType = p.value
        this.index += 1
    } else if (this.peek().value === '<') {
        // 泛型，如 Array<number>
        varType = this.generics()
    } else {
        throw '错误类型'
    }
    return varType
}

module.exports = {
    typeModification,
}
},{}],52:[function(require,module,exports){
let TokenType = {
    'number': 'number',
    'plus': 'plus',
    'minus': 'minus',
    'mul': 'multiply',
    'div': 'division',
    'mod': 'mod',
    'operator': 'operator',
    'kohkLeft': 'parenthesisLeft',
    'kohkRight': 'parenthesisRight',
    'comma': 'comma',
    'string': 'string',
    // {
    'curlyLeft': 'curlyLeft',
    // }
    'curlyRight': 'curlyRight',
    // [
    'bracketLeft': 'bracketLeft',
    // ]
    'bracketRight': 'bracketRight',
    'identifier': 'identifier',
    'var': 'var',
    'const': 'const',
    'con': 'con',
    'let': 'keyword',
    'while': 'while',
    'for': 'for',
    'break': 'break',
    'continue': 'continue',
    'return': 'return',
    'class': 'class',
    'this': 'this',
    'new': 'new',
    // =
    'assign': 'assign',
    'function': 'function',
    'if': 'if',
    'else': 'else',
    'bool': 'bool',
    // .
    'dot': 'dot',
    // "
    'quote': 'quote',
    // '
    'singlequote': 'singlequote',
    // `
    'grave': 'grave',
    // :
    'colon': 'colon',
    'comment': 'comment',
    'semicolon': 'semicolon',
    'keyword': 'keyword',
}

class ASTNode {
    constructor() {
        // this.type = `${this.constructor.name}`
    }
}

class ProgramNode extends ASTNode {
    constructor(body) {
        super()
        this.body = body
        this.type = 'ProgramNode'
    }
}

class ExpressionStatement extends ASTNode {
    constructor(expression) {
        super()
        this.expression = expression
        this.type = 'ExpressionStatement'
    }
}

// 关于 varType 这个字段
// 是用来表示一个变量的类型
// 所以是 Identifier 的一个属性
// 但是其他节点可能也需要这个属性
// 比如 const f = (a, b) => {return 'a'}
// 右边的函数表达式需要存一下类型，然后把这个类型赋给 f
class Identifier extends ASTNode {
    constructor(name, varType) {
        super()
        this.name = name
        this.varType = varType
        this.type = 'Identifier'
    }
}

class Literal extends ASTNode {
    constructor(token) {
        super()
        this.value = token.value
        this.raw = token.raw
        this.type = 'Literal'
    }
}

class BinaryExpression extends ASTNode {
    constructor(operator, left, right) {
        super()
        this.left = left
        this.right = right
        this.operator = operator
        this.type = 'BinaryExpression'
    }
}

class UpdateExpression extends ASTNode {
    constructor(argument, operator, prefix = true) {
        // prefix 为 true 时表示 ++a
        super();
        this.operator = operator
        this.argument = argument
        this.prefix = prefix
        this.type = 'UpdateExpression'
    }
}

class UnaryExpression extends ASTNode {
    constructor(operator, _argument, prefix = true) {
        super()
        this.prefix = prefix
        this._argument = _argument
        this.operator = operator
        this.type = 'UnaryExpression'
    }
}

class IfStatement extends ASTNode {
    constructor(test, consequent, alternate = null) {
        super()
        this.test = test
        this.consequent = consequent
        this.alternate = alternate
        this.type = 'IfStatement'
    }
}


class BlockStatement extends ASTNode {
    constructor(body) {
        super()
        this.body = body
        this.type = 'BlockStatement'
    }
}

class CallExpression extends ASTNode {
    constructor(callee, args = []) {
        super()
        this.callee = callee
        this._arguments = args
        this.type = 'CallExpression'
    }
}


class VariableDeclaration extends ASTNode {
    constructor(kind, declarations, varType) {
        super()
        this.kind = kind
        this.declarations = declarations
        this.type = 'VariableDeclaration'
        // this.varType = varType
    }
}


class VariableDeclarator extends ASTNode {
    constructor(id, init, varType) {
        super()
        this.id = id
        this.init = init
        this.type = 'VariableDeclarator'
        // this.varType = varType
    }
}

class ArrayExpression extends ASTNode {
    constructor(elements) {
        super()
        this.elements = elements
        this.type = 'ArrayExpression'
    }
}

class Property extends ASTNode {
    constructor(key, value, kind = 'init') {
        super()
        this.key = key
        this.value = value
        // "init" | "get" | "set"
        this.kind = kind
        this.method = false
        this.computed = false
        this.type = 'Property'
    }
}

class ObjectExpression extends ASTNode {
    constructor(properties) {
        super()
        this.properties = properties
        this.type = 'ObjectExpression'
    }
}

class MemberExpression extends ASTNode {
    constructor(object, property, computed = false) {
        super()
        this.object = object
        this.property = property
        this.computed = computed
        this.type = 'MemberExpression'
    }
}


class AssignmentExpression extends ASTNode {
    constructor(left, right, operator) {
        super()
        this.operator = operator
        this.left = left
        this.right = right
        this.type = 'AssignmentExpression'
    }
}


class WhileStatement extends ASTNode {
    constructor(test, body) {
        super()
        this.test = test
        this.body = body
        this.type = 'WhileStatement'
    }
}

class ForStatement extends ASTNode {
    constructor(init, test, update, body) {
        super()
        this.init = init
        this.test = test
        this.update = update
        this.body = body
        this.type = 'ForStatement'
    }
}

class BreakStatement extends ASTNode {
    constructor() {
        super()
        this.type = 'BreakStatement'
    }
}

class ContinueStatement extends ASTNode {
    constructor() {
        super()
        this.type = 'ContinueStatement'
    }
}

class ThisExpression extends ASTNode {
    constructor() {
        super()
        this.type = 'ThisExpression'
    }
}


class FunctionExpression extends ASTNode {
    constructor(body, params, id = null, varType) {
        super()
        this.id = id
        this.params = params
        this.body = body
        this.varType = varType
        this.type = 'FunctionExpression'
    }
}

// 类属性
class ClassProperty extends ASTNode {
    constructor(key,value, _static = false) {
        super()
        this.key = key
        this.value = value
        this._static = _static
        this.type = 'ClassProperty'
    }
}

// 类函数
class ClassMethod extends ASTNode {
    constructor(key, value, _static = false, kind, computed = false) {
        super()
        this.key = key
        this.value = value
        this._static = _static
        this.computed = computed
        this.kind = kind
        this.type = 'ClassMethod'
    }
}

class ClassBody extends ASTNode {
    constructor(body) {
        super()
        this.body = body
        this.type = 'ClassBody'
    }
}

class ClassExpression extends ASTNode {
    constructor(body, superClass = null, id = null) {
        super()
        this.id = id
        this.superClass = superClass
        this.body = body
        this.type = 'ClassExpression'
    }
}

class ClassDeclaration extends ASTNode {
    constructor(body, superClass = null, id = null, varType) {
        super()
        this.id = id
        this.superClass = superClass
        this.body = body
        this.varType = varType
        this.type = 'ClassDeclaration'
    }
}

class NewExpression extends ASTNode {
    constructor(callee, _arguments=[]) {
        super()
        this.callee = callee
        this._arguments = _arguments
        this.type = 'NewExpression'

    }
}

class FunctionDeclaration extends ASTNode {
    constructor(body, params, id = null, returnVarType) {
        super()
        this.id = id
        this.params = params
        this.body = body
        this.returnVarType = returnVarType
        this.type = 'FunctionDeclaration'
    }
}

class ReturnStatement extends ASTNode {
    constructor(arg) {
        super()
        this._argument = arg
        this.type = 'ReturnStatement'
    }
}

// 给默认参数用
class AssignmentPattern extends ASTNode {
    constructor(left, right) {
        super()
        this.left = left
        this.right = right
        this.type = 'AssignmentPattern'
    }
}

class CommentStatement extends ASTNode {
    constructor(value) {
        super()
        this.value = value
        this.type = 'CommentStatement'
    }
}

class Generics extends ASTNode {
    constructor(name, parameters) {
        super()
        this.name = name
        this.parameters = parameters
        this.type = 'Generics'
    }
}


class FunctionType extends ASTNode {
    constructor(paramsType, returnVarType) {
        super()
        this.paramsType = paramsType
        this.returnVarType = returnVarType
        this.type = 'FunctionType'
    }
}

class ClassType extends ASTNode {
    constructor(name, properties, methods) {
        super()
        this.name = name
        this.properties = properties
        this.methods = methods
        this.type = 'ClassType'
    }
}

class InstanceType extends ASTNode {
    constructor(classType) {
        super()
        this.classType = classType
        this.type = 'InstanceType'
    }
}


class ImportSpecifier extends ASTNode {
    constructor(local) {
        super()
        this.local = local
        this.type = 'ImportSpecifier'
    }
}

class ImportDeclaration extends ASTNode {
    constructor(specifiers, source) {
        super()
        this.specifiers = specifiers
        this.source = source
        this.type = 'ImportDeclaration'
    }
}

module.exports = {
    TokenType,
    ProgramNode,
    ExpressionStatement,
    Identifier,
    Literal,
    BinaryExpression,
    UnaryExpression,
    IfStatement,
    BlockStatement,
    CallExpression,
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
    ClassExpression,
    ClassProperty,
    ClassMethod,
    ThisExpression,
    CommentStatement,
    Generics,
    FunctionType,
    ClassType,
    ClassDeclaration,
    ImportDeclaration,
    ImportSpecifier,
    InstanceType,
    NewExpression,
    UpdateExpression,
}
},{}],53:[function(require,module,exports){
const log = console.log.bind(console)

const json = function (o) {
    const circularReplacer = () => {
        const seen = new WeakSet()
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return `$ref`
                }
                seen.add(value)
            }
            return value
        }
    }
    let s = JSON.stringify(o, circularReplacer(), 2)
    log(s)
}

const isDigit = (s) => {
    return '1234567890'.includes(s)
}

const isArray = l => Array.isArray(l)

const isObject = o => {
    return Object.prototype.toString.call(o) === '[object Object]'
}

const isLetter = (s) => {
    const letter = 'qwertyuiopasdfghjjklzxcvbnmQWERTYUIOPASDFGHJJKLZXCVBNM'
    return letter.includes(s)
}

const isLetterNum = (s) => {
    return isLetter(s) || isDigit(s)
}

const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('测试成功')
    }
}

const equals = (a, b) => {
    if (isArray(a) && isArray(b)) {
        if (a.length !== b.length) {
            log("长度不相等", a.length, b.length)
            return false
        }
        for (let i = 0; i < a.length; i++) {
            let a1 = a[i]
            let b1 = b[i]
            if (!equals(a1, b1)) {
                log('不相等', a1, b1)
                return false
            }
        }
        return true
    } else if (isObject(a) && isObject(b)) {
        let keys1 = Object.keys(a)
        let keys2 = Object.keys(b)
        if (keys1.length !== keys2.length) {
            return false
        }
        for (let i = 0; i < keys1.length; i++) {
            let k1 = keys1[i]

            if (!equals(a[k1], b[k1])) {
                log("对象 key 是", k1)
                log('对象 value 不相等', a[k1], b[k1])
                return false
            }
        }
        return true
    } else {
        if (a !== b) {
            log("a b 不等", a, b)
        }
        return a === b
    }
}

const PSleep = function (time) {
    let timeStamp = new Date().getTime()
    let endTime = timeStamp + time
    while (true) {
        if (new Date().getTime() > endTime) {
            return
        }
    }
}

// 寻找一个对象数组的下标
const indexOf = function (array, key, item) {
    for (let i = 0; i < array.length; i++) {
        let e = array[i]
        if (e[key] === item) {
            return i
        }
    }
    return -1
}

// 网上抄的，判断一个数是否是整数
const isInt = (n) => {
    // log('n', n, Number(n), 10 === 10, Number(n) == n)
    return Number(n) == n && n % 1 === 0;
}
// 网上抄的，判断一个数是否是浮点数
const isFloat = (n) => {
    return Number(n) == n && n % 1 !== 0;
}

const isStringLiteral = (s) => {
    return (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))
}

// 判断是否是变量名
const isIdentifier = (s) => {
    // 这里判断的比较粗暴，以字母开头就是
    if (s.length <= 0) {
        return false
    } else {
        return isLetter(s[0])
    }
}

module.exports = {
    isDigit,
    log,
    ensure,
    json,
    equals,
    isLetter,
    isLetterNum,
    PSleep,
    indexOf,
    isInt,
    isFloat,
    isStringLiteral,
    isIdentifier,
}
},{}]},{},[2]);
