const visitPropertyDefinition = function (node) {
    // fixme, 这里写的很凑
    // let kind = this.kind.value
    let key = this.visit(node.key)
    let type = node.value.type
    if (type === 'Literal') {
        // 是 var class.id = 100 这种类型
        key = `${key} =`
    } else {
        // 是 var class.show = function(){} 这种类型
    }
    let value = this.visit(node.value)
    if (type === 'Literal') {
    } else {
        value = value.replace('FunctionType', '')
    }
    let s = ''
    if (node._static) {
        // 类属性
        s = this.concatWithSpace('static', key, value)
    } else {
        s = this.concatWithSpace(key, value)
    }
    return s
}

module.exports = {
    visitPropertyDefinition,
}