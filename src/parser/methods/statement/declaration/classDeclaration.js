const {ClassType, ClassDeclaration} = require("../../../../type");
const classDeclaration = function () {
    // classDeclaration:
    // Class Indentifier classbody
    /**
     * class 的例子
     * class Demo {
     *     static a = 1
     * }
     * */
    this.eat('class')
    let id = this.identifier() // class 的名字
    let body = this.classbody() // class 的 body

    let properties = []
    let methods = []
    body.forEach(b => {
        // 如果当前的 token 的类型是类的参数
        if (b.type === 'ClassProperty') {
            // log('pro', b)
            properties.push({
                ...b.key,
                _static: b._static,
            })
            // log('properties', properties)
        } else {
            // log('b is', b)
            methods.push({
                ...b.key,
                varType: b.value.varType,
                // 注意，本来 type 里是不需要有函数的具体代码的
                // 只要函数的类型就行
                // 但是为了方便代码生成，这里把函数具体代码 ast 也加进来
                value: b.value,
            })
        }
    })

    let type = new ClassType(id.name, properties, methods) // 生成类的类型
    // log('tye', type.methods)
    let f = new ClassDeclaration(body, null, id, type) // 生成类
    return f
}

module.exports = {
    classDeclaration,
}