const {BreakStatement} = require("../../../../type");

const breakStatement = function () {
    // 直接生成 break 的 ast node 这没啥说的
    this.index += 1
    let b = new BreakStatement()
    return b
}

module.exports = {
    breakStatement,
}