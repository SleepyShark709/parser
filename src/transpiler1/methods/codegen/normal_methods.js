const gen_normal_methods = function (methods, instanceType) {
    // log('methods', methods)
    let structName = instanceType.classType.name

    // let l = methods.filter(m => m.name !== 'constructor')
    // log('l is', l)
    let r = methods.map(v => {
        // log('v is',v)
        let func = v.value
        let {params, type, body, varType} = func
        if (v.key.name === 'constructor') {
            let t1 = `${structName} *_this = malloc(sizeof(${structName}));\n`
            // 参数的作用域是函数体
            // 这里为了方便，直接在外再加一层作用域
            this.scope.enterBlock(type)
            // 后面的处理和普通函数一样
            let p = []
            for (let param of params) {
                // 代码生成包含参数的类型和参数值
                let s1 = this.typeTranspile(param.varType)
                let s2 = this.visit(param)
                p.push(s1 + s2)
                this.scope.define(param.name, param.varType)
            }
            let s1 = p.join(', ')
            // 直接把 this 关键词替换成自己new的变量名_this
            let b = this.visit(body).replaceAll('this.', '_this->')
            this.scope.leaveBlock()

            let r = `${structName} *
${structName}_new(${s1}) {
${this.scope.tab}${t1}
${b.slice(1, -1)}return _this;
}`
            return r
        } else {
            // log('varType', varType)
            // 参数的作用域是函数体
            // 这里为了方便，直接在外再加一层作用域
            this.scope.enterBlock(type)
            // 第一个参数是结构体指针，名字默认取 _this
            let p = []
            p.push(`${structName} *_this`)
            this.scope.define('this', instanceType)
            // log('classId', this.scope.valueOf('this'))
            // 后面的处理和普通函数一样
            for (let param of params) {
                // 代码生成包含参数的类型和参数值
                let s1 = this.typeTranspile(param.varType)
                let s2 = this.visit(param)
                p.push(s1 + s2)
                this.scope.define(param.name, param.varType)
            }
            let s1 = p.join(', ')
            // 给当前作用域加上返回值类型
            this.scope.top()['returnVarType'] = varType.returnVarType
            // log('body is', body)
            let b = this.visit(body)
            // log('varType is===', varType, v)

            this.scope.leaveBlock()

            let s = `${this.typeTranspile(varType.returnVarType)}
${structName}_${v.key.name}(${s1}) ${b}`
            // log('s is', s)
            return s
        }
    }).join('\n')

    return r
}

module.exports = {
    gen_normal_methods,
}