const { Lexer } = require('./lexer')
const { Parser } = require('./parser')
const { Interpreter } = require('./interpreter')

const gl2js = (source) => {
    let l = new Lexer(source)
    let p = new Parser(l.tokens)
    let i = new Interpreter(p.ast)
    return i.code
}

module.exports = {
    gl2js,
}