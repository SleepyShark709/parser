const {Identifier} = require("../../../../type")

const identifier = function () {
    // a typeModification?
    let t = this.current()
    this.index += 1
    let varType = undefined
    // 这里因为 index 已经 += 1了，所以取得就是下一个字符，判断他是不是 :
    if (this.current() && this.current().value === ':') {
        varType = this.typeModification()
    }
    let i = new Identifier(t.value, varType)
    return i
}

module.exports = {
    identifier,
}
