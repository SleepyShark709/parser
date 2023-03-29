// transpiler1 是把 js 转成 guacontainer 的

const methods = require('./methods')
const {Scope} = require("../scope");
const {log} = require("../util");

class Transpiler {
    constructor(ast) {
        this.ast = ast
        this.code = ''
        this.scope = new Scope()
        // 把解析节点的方法从子文件中加进来
        Object.entries(methods).forEach(([name, func]) => {
            this[name] = func
        })
        this.codegen()
    }

    // 通用的访问节点
    visit(node) {
        if (node === null) {
            return ''
        }
        let name = node.type
        let method = 'visit' + name
        // PSleep(4)
        // log(chalk.cyan(`method ${method}`))
        if (name === 'operator') {
            // operator 不是 AST 节点类型
            // 所以这里写死
            return this.visitOperator(node)
        } else if (this[method] === undefined) {
            log('node is', node, name)
            throw (`method ${method} `)
        }
        let s = this[method](node)
        return s
    }

    concatWithSpace(...args) {
        let s = args.join(' ')
        return s
    }

    codegen() {
        let r = this.visit(this.ast)
        this.code = r
    }
}

module.exports = {
    Transpiler,
}