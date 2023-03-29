const { Lexer } = require("./lexer");
const { Parser } = require("./parser");
const test1 = () => {
    let text = `
    class TestClass {
    constructor() {
        this.a = 3
    }
}
    `
    let l1 = new Lexer(text)
    let p1 = new Parser(l1.tokens)
    console.log('p1 is', JSON.stringify(p1.ast, null, 4))

}

const __main = () => {
    test1()
}
__main()