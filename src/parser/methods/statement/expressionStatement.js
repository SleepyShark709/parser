const {ExpressionStatement} = require("../../../type");
const expressionStatement = function () {
    // ExpressionStatement: expressionSequence
    let e = this.expressionSequence()
    // 组成一个 ExpressionStatement 对象
    let es = new ExpressionStatement(e)
    return es
}

module.exports = {
    expressionStatement,
}