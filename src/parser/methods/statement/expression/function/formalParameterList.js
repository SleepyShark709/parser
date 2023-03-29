const {TokenType} = require("../../../../../type");
const formalParameterList = function () {
    // formalParameterList:
    // Identifier typeModification? (= singleExpression)?   ( ',' Identifier typeModification?  (= singleExpression)? )*
    let l = []
    let i = null
    if (this.peek().type === TokenType.assign) {
        // 下一个 token 是 =，说明是赋值表达式
        i = this.assignmentPattern()
    } else {
        i = this.identifier() // 否则就是变量名
    }
    l.push(i)

    // 如果有 :，说明还有类型标注
    let varTypes = []
    if (this.current().value === ':') {
        let t = this.typeModification()
        varTypes.push(t)
    }

    // 处理过第一个参数之后，就是处理后面的参数
    while (this.current().type === TokenType.comma) {
        // 逻辑和上面的一样
        this.eat(',')
        let i = null
        if (this.peek().type === TokenType.assign) {
            i = this.assignmentPattern()
        } else {
            i = this.identifier()
        }
        // 如果有 :，说明还有类型标注
        if (this.current().value === ':') {
            let t = this.typeModification()
            varTypes.push(t)
        }
        l.push(i)
    }
    // 给 identifier 加上类型
    varTypes.forEach((v, index) => l[index].varType = v)
    // log('l is', l)
    return l
}
module.exports = {
    formalParameterList,
}