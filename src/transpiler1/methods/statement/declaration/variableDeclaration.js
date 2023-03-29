const visitVariableDeclaration = function (node) {
    // 变量声明
    // 这里写死，declarations 只有一个元素
    let d = node.declarations[0]
    // log('visitVariableDeclaration ', d)
    let varType = d.id.varType
    if (varType === undefined) {
        // 如果没有类型标注，只能从 = 右边推导类型
        let {init} = d
        varType = this.inferType(init)
        // 然后把推导出来的类型给 id
        d.id.varType = varType
    }
    // log('visitVariableDeclaration type', varType)
    // 范型特殊处理
    if (varType.type === 'Generics') {
        if (varType.name === 'Array') {
            // 数组
            let s =
                `GuaArray *${this.visit(d.id)} = GuaArray_new();
${this.visit(d)}
`
            return s
        } else if (varType.name === 'Record') {
            // 字典
            let s =
                `GuaMap *${this.visit(d.id)} = GuaMap_new();
${this.visit(d)}
`
            return s
        }
    } else if (varType.type === 'FunctionType') {
        // 函数
        // log('var', varType)
        let s = `${this.typeTranspile(varType.returnVarType)}
${this.visit(d)}`
        // log('s is', s)
        return s
    } else {
        // 基本类型的变量声明
        // log('vartype', varType)
        let left = this.typeTranspile(varType)
        let right = this.visit(d)
        let s = `${left}${right};`
        // log('s', s)
        return s
    }
}

module.exports = {
    visitVariableDeclaration,
}