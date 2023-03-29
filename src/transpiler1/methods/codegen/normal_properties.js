const gen_normal_properties = function (properties) {
    // 类的实例变量转换成结构体成员
    let r = properties.map(p => {
        // log('p', p)
        if (p.key.type === 'Identifier') {
            let s = `${this.scope.tab}${this.typeTranspile(p.key.varType)}${this.visit(p.key)};`
            return s
        }

    }).join('\n')
    return r
}

module.exports = {
    gen_normal_properties,
}
