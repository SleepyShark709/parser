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