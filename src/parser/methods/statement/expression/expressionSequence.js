const expressionSequence = function () {
    // expressionSequence:
    // singleExpression ( ',' singleExpression )*
    // 这里不考虑逗号语法
    return this.singleExpression()
}
module.exports = {
    expressionSequence,
}