const {TokenType} = require("../../../type");
const {op2} = require("../../../config");
const statement = function () {
    // Statement :
    //     BlockStatement |
    //     EmptyStatement |
    //     ExpressionStatement |
    //     IfStatement |
    //     ForStatement |
    //     ForInStatement |
    //     WhileStatement |
    //     ContinueStatement |
    //     BreakStatement |
    //     ReturnStatement |
    //     FunctionDeclaration |
    //     VariableDeclaration |
    //     ClassDeclaration
    //     commentStatement
    // this.current() 在 parser 的 index.js 35行 中定义，拿到当前的 token
    let t = this.current()
    // 拿到下一个 token
    let p = this.peek()
    // log('t', t, p, this.index)
    let node = null
    if (
        [
            TokenType.string, TokenType.bool,
            TokenType.identifier, TokenType.number,
            TokenType.this, TokenType.minus,
            TokenType.plus
        ].includes(t.type)
    ) {
        // 字符串，数字，字母 都算 ExpressionStatement
        // 字符串，布尔值，字母，数字，this，减号
        node = this.expressionStatement()
    } else if ([TokenType.con, TokenType.var, TokenType.const, TokenType.let].includes(t.type)) {
        // 以 con 开头的就是变量声明
        // 所有的变量定义声明 走这个
        node = this.variableStatement()
    } else if (t.type === TokenType.if) {
        // 如果是 if 语句，组成 if node
        node = this.ifStatement()
    } else if (t.type === TokenType.curlyLeft) {
        // 当前是 { 这里要处理语句了
        node = this.blockStatement()
    } else if (t.type === TokenType.while) {
        // 当前是 while ，处理循环语句
        node = this.whileStatement()
    } else if (t.type === TokenType.for) {
        // 处理 for 循环
        node = this.forStatement()
    } else if (t.value === 'break') {
        // 处理 break 语句
        node = this.breakStatement()
    } else if (t.value === 'continue') {
        // 处理 continue 语句，与 break 语句类似，没啥说的
        node = this.continueStatement()
    } else if (t.type === TokenType.function) {
        // 处理函数语句，这里是函数声明，如 function a () {}
        node = this.functionDeclaration()
    } else if (t.type === TokenType.return) {
        // log('return')
        node = this.returnStatement()
    } else if (t.type === TokenType.comment) {
        // 当前的 token 是注释
        node = this.commentStatement()
    } else if (t.value + p.value === 'class.') {
        // class.xx 类属性
        // 这个我没想到例子，js有这样使用的语法么
        node = this.memberExpression()
    } else if (t.value === 'class') {
        // 实现 class 定义
        node = this.classDeclaration()
    } else if (t.value === 'import') {
        // 实现 import 引入
        node = this.importDeclaration()
    } else {
        throw (`其他类型${t.type} ${t.value} ${this.index}`)
    }
    // 拿到当前 token
    let current = this.current()

    if (current && op2.includes(current.value)) {
        // 是 expr + expr 这种类型
        // 单一表达式
        node = this.singleExpression(node.expression)
    }
    return node
}

module.exports = {
    statement,
}