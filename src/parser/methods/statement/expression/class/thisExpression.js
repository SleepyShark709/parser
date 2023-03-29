const {ThisExpression} = require("../../../../../type");
const thisExpression = function () {
    this.index += 1
    let t = new ThisExpression()
    return t
}
module.exports = {
    thisExpression,
}