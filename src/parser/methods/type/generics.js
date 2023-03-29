const {indexOf} = require("../../../util");
const {Generics} = require("../../../type");
const generics = function () {
    // 泛型
    // 先切出 <>
    let list = this.tokens.slice(this.index)
    let right = indexOf(list, 'value', '>')
    // 拿到 <> 里的内容，并过滤掉「,」
    let inner = list.slice(2, right).map(e => e.value).filter(e => e !== ',')
    let g = new Generics(this.current().value, inner)
    this.index += (right + 1)
    return g
}

module.exports = {
    generics,
}