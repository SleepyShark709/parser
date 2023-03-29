const typeTranspile = function (varType) {
    // log('varType', varType)
    let mapper = {
        'number': 'GuaNumber *',
        'string': 'GuaString *',
        // 没有类型标注，但是返回了东西，就是 any
        'any': 'void *',
        // 没有类型标注，且不返回东西，就是 void
        'void': 'void',
    }
    // let r = 'void'
    let r = null
    if (typeof varType === 'string') {
        r = mapper[varType]
    } else if (varType.type === 'Generics') {
        // 泛型
        let {name, parameters} = varType
        // log('n', name, parameters)
        if (name === 'Array') {
            // 范型数组，这里默认数组元素只有一种类型
            let type = parameters[0]
            return mapper[type]
        }
    } else if (varType.type === 'FunctionType') {
        // 函数类型
        let {paramsType, returnVarType} = varType
        return returnVarType
    } else if (varType.type === 'InstanceType') {
        // 实例类型，就是类名的指针
        let s = varType.classType.name + ' *'
        return s
    } else {
        throw `type ${varType.type}`
    }

    return r
}

module.exports = {
    typeTranspile,
}