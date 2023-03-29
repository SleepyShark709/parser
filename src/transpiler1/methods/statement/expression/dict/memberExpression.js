const {isInt} = require("../../../../../util");
const {replaceApi} = require("../../../../js2c_container");
const visitMemberExpression = function (node) {
    // log('visitMemberExpression node', node)
    let s = ''
    let o = this.visit(node.object)
    let p = this.visit(node.property)

    // log('member', o, p, node.property)
    let v = node.object.varType ? node.object.varType :this.scope.valueOf(o)
    // log('v is', v)
    if (v !== null) {
        // 如果是js内置api，要换成自己的内置 api
        // log('va', varType)
        if (v === 'string') {
            if (p === 'length') {
                // str.length -> GuaString_length(str)
                return `GuaString_length(${o})`
            } else if (isInt(p)) {
                // str[0] -> GuaString_charAt(str, 0)
                return `GuaString_charAt(${o}, ${p})`
            } else if (p.startsWith('slice')) {
                // str.slice(0, 3) -> GuaString_cut(str, 0, 3)
                let p1 = p.replace('slice', 'GuaString_cut')
                let l = p1.split('(')
                l.splice(1, 0, `(${o}, `)
                let s = l.join('')
                return s
            } else if (p.startsWith('split')) {
                // str.split(',') -> GuaString_split(str, ',')
                // 替换 api，变成 GuaString_split(',')
                let p1 = p.replace('split', 'GuaString_split')

                // 找到 GuaString_split 的末端坐标，插入 str
                let index = p1.indexOf('(') + 1
                // 分成 GuaString_split( 和 ,')
                let s1 = p1.slice(0, index)
                let s2 = p1.slice(index)
                // log('s1', s1, s2)
                // 插入 str
                let s = `${s1}${o}, ${s2}`
                return s
            } else if (p.startsWith('find')) {
                // str.find(',') -> GuaString_find(str, ',')
                // 替换 api，变成 GuaString_split(',')
                let p1 = p.replace('find', 'GuaString_find')

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
        } else if (v.type === 'Generics') {
            // 范型
            let name = v.name
            if (name === 'Array') {
                // 替换数组 api
                let s = ''
                // log(`p is ${p}`)
                if (p === 'length') {
                    // list.length -> GuaArray_length(list)
                    s = `GuaArray_length(${o})`
                } else if (isInt(p) && node.computed) {
                    // list[0] -> GuaArray_get(list, 0)
                    s = `GuaArray_get(${o}, ${p})`
                } else if (p.startsWith('push')) {
                    // list.push(1) -> GuaArray_add(list, GuaNumber(1));
                    // 替换 api，变成 GuaString_split(',')
                    s = replaceApi(p, o, 'push', 'GuaArray_add')
                } else if (p.startsWith('pop')) {
                    s = `GuaArray_pop(${o})`
                } else if (p.startsWith('slice')) {
                    s = replaceApi(p, o, 'slice', 'GuaArray_cut')
                } else {
                    throw `p is${p}`
                }
                return s
            }
        } else if (v.type === 'InstanceType') {
            node.object.varType = v
            let r = this.gen_instanceMemberExpression(node)
            // log('r', r)
            return r
        } else if (v.type === 'ClassType') {
            let r = this.gen_classMemberExpression(node)
            return r
        }
        else {
            throw `err ${v.type}`
        }
    }

    // log('is', isClassNew, p)
    // log('v', v, o)
    if (node.computed) {
        // 是 a[k] 这种类型
        s = `${o}[${p}]`
    } else {
        // 是 a.k 这种类型
        s = `${o}.${p}`
    }
    return s
}

module.exports = {
    visitMemberExpression,
}
