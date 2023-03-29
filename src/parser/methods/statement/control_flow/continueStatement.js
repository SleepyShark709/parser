const {ContinueStatement} = require("../../../../type");
const continueStatement = function () {
    this.index += 1
    let b = new ContinueStatement()
    return b
}
module.exports = {
    continueStatement,
}