// 这个文件放一些 js2c 中，和 c 容器库相关的转换逻辑

const {
    isStringLiteral,
    isInt,
    isFloat,
    log,
} = require("../util");
const wrapStringCreate = (s) => {
    let r = `GuaString_new(${s})`
    return r
}

const wrapIntCreate = (s) => {
    let r = `GuaNumber_newInt(${s})`
    return r
}

const wrapFloatCreate = (s) => {
    let r = `GuaNumber_newFloat(${s})`
    return r
}


// 替换 api，如
// list.push(1) -> GuaArray_add(list, GuaNumber(1));
// str.find(',') -> GuaString_find(str, ',')
// str.split(',') -> GuaString_split(str, ',')
const replaceApi = (p, o, source, target) => {
    let p1 = p.replace(source, target)

    // 找到 GuaString_find 的末端坐标，插入 str
    let index = p1.indexOf('(') + 1
    // 分成 GuaString_find( 和 ,')
    let s1 = p1.slice(0, index)
    let s2 = p1.slice(index)
    // log('s1', s1, s2)
    // 插入 str
    let s = `${s1}${o}, ${s2}`
    return s
}

// 参数可能是 1 'abc' 这样的字面量
// 也可能是变量 x y
// 所以参数是节点类型
// 这里的节点只能是 Literal Identifier 这种简单的
// 复杂的包起来麻烦，不做
const wrapCreate = (node, scope) => {
    // log('wrapCreate', node)
    let {type} = node
    if (type === 'Literal') {
        // 根据字面量的值包相应的函数
        let {raw} = node
        if (isStringLiteral(raw)) {
            return wrapStringCreate(raw)
        } else if (isInt(raw)) {
            return wrapFloatCreate(raw)
        } else if (isFloat(raw)) {
            return wrapFloatCreate(raw)
        }
        else {
            throw `raw ${raw}`
        }
    } else if (type === 'Identifier') {
        // 变量
        // 找到变量的类型，根据类型包相应函数
        let {name} = node
        let varType = scope.valueOf(name)
        if (varType === 'number') {
            return wrapFloatCreate(name)
        } else if (varType === 'string') {
            return wrapStringCreate(name)
        }
    } else {
        log('node is', node)
        throw `type ${type}`
    }
}

const wrapValue = (varName, scope) => {
    let v = scope.valueOf(varName)
    if (v === 'number') {
        return `GuaNumber_floatValue(${varName})`
    } else if (v === 'string') {
        return `GuaString_value(${varName})`
    } else if (v === 'any') {
        // 原样返回
        return varName
    } else {
        throw `未知类型 ${v}`
    }
}

module.exports = {
    wrapStringCreate,
    wrapIntCreate,
    wrapFloatCreate,
    replaceApi,
    wrapCreate,
    wrapValue,
}