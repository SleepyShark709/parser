const {TokenType, ImportDeclaration} = require("../../../../type");
const importDeclaration = function () {
    // importDeclaration:
    // import { importSpecifier  (, (importSpecifier))* } from string
    // 看来这里只支持 import { xxx } from './xxx' 这种
    // 不支持 import xxx from './xxx' 这种
    this.eat('import')
    this.eat('{') // 这里应该加一个判断 判断引入的是否为静态方法
    let l = []
    // 当前的 token 是字母变量 也就是 { xxx } 中的 xxx
    while (this.current().type === TokenType.identifier) {
        let i = this.importSpecifier() // 生成 import 的 ast
        l.push(i)
        if (this.current().value === ',') {
            // 如果有 ，就吃掉，如 { xxx, yyy }
            this.eat(',')
        }
    }
    this.eat('}')
    this.eat('from')
    let str = this.literal() // from 后的路径字符串
    let r = new ImportDeclaration(l, str) // 组成 import 的 ast
    return r
}

module.exports = {
    importDeclaration,
}