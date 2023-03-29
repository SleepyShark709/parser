const {
    TokenType,
} = require('./type')

let op2 = ['==', '!=', '<', '>', '<=', '>=', 'and', 'or',
    '+', '-', '*', '/', '%',
]

let literalType = [
    TokenType.string, TokenType.bool,
    TokenType.number, TokenType.this,
]

let statementTypes = [
    TokenType.string, TokenType.bool,
    TokenType.identifier, TokenType.number,
    TokenType.con, TokenType.var, TokenType.const, TokenType.let,
    TokenType.operator,
    TokenType.if, TokenType.curlyLeft,
    TokenType.break,
    TokenType.continue,
    TokenType.return,
    TokenType.this,
    TokenType.comment,
    TokenType.for,
    TokenType.while,
    TokenType.class,
]

let singleExpressionTypes = [
    TokenType.identifier,
    ...literalType,
    TokenType.bracketLeft,
]

module.exports = {
    op2,
    literalType,
    statementTypes,
    singleExpressionTypes,
}