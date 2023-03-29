const {Literal} = require("../../../../type");
const literal = function () {
    let t = this.current()
    let l = new Literal(t)
    this.index += 1
    return l
}

module.exports = {
    literal,
}