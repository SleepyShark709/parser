const {isIdentifier, isStringLiteral} = require("../../../../util");
const {wrapValue, wrapCreate} = require("../../../js2c_container");
const visitBinaryExpression = function (node) {
    let {left, right, operator} = node
    let l = []
    let s1 = this.visit(left)
    let s2 = operator.value
    let s3 = this.visit(right)
    let list = [s1, s3]
    // 如果是字符串的比较，要包一层 GuaString
    // todo，可能是字面量，也可能是一个字符串变量
    // 这里先只考虑字面量的情况
    // if (s1.startsWith('"') && s1.endsWith('"')) {
    // log('s1', s1)
    if (s1.startsWith('GuaString_create')) {
        let mapper = {
            '==': 'GuaString_equals',
            '!=': '!GuaString_equals',
            '+': 'GuaString_concat',
        }
        let s = `${mapper[s2]}(${s1}, ${s3})`
        return s
    } else if (isIdentifier(s1) || isIdentifier(s3)) {
        // 是变量
        // log('s1 is', s1)
        // log('s3 is', s3)
        if (isIdentifier(s1)) {
            // let v = this.scope.valueOf(s1)
            // s1 = wrapGuaNumberValue(s1, v)
            s1 = wrapValue(s1, this.scope)
        }
        if (isIdentifier(s3)) {
            // let v = this.scope.valueOf(s3)
            // s3 = wrapGuaNumberValue(s3, v)
            s3 = wrapValue(s3, this.scope)
        }
    } else if (isStringLiteral(s1) || isStringLiteral(s2)) {
        // 字符串包一层
        if (isStringLiteral(s1)) {
            s1 = wrapCreate(s1, 'string')
        }
        if (isStringLiteral(s3)) {
            s3 = wrapCreate(s3, 'string')
        }
        // 操作符替换成 api
        if (['==', '==='].includes(s2)) {
            s2 = 'GuaString_equals'
        } else if (['!=', '!=='].includes(s2)) {
            s2 = '!GuaString_equals'
        } else if (s2 === '+') {
            s2 = 'GuaString_concat'
        }
        let s = `${s2}(${s1}, ${s3})`
        return s
    }

    let s = this.concatWithSpace(s1, s2, s3)
    return s
}

module.exports = {
    visitBinaryExpression,
}