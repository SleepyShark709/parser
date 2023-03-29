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