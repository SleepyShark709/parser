const {statementTypes} = require("../../../config");
const statementList = function () {
    // statementList:
    // statement+
    let t = this.current() // 拿到当前 token
    let l = []
    while (statementTypes.includes(t.type)) {
        let s = this.statement() // 拿到 {} 内所有内容的 ast
        l.push(s) // 推进数组
        t = this.current() // 重新更新当前 token
    }
    return l
}

module.exports = {
    statementList,
}