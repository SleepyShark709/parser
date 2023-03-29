const log = console.log.bind(console)

const e = sel => document.querySelector(sel)

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    return elements
}


const ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败', message)
    } else {
        log('+++ 测试成功')
    }
}


const isArray = o => Array.isArray(o)
const isObject = o => Object.prototype.toString.call(o) === '[object Object]'
const isNumber = o => Object.prototype.toString.call(o) === '[object Number]'
const isString = o => Object.prototype.toString.call(o) === '[object String]'