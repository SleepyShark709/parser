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