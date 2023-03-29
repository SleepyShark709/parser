const {CommentStatement} = require("../../../type");
const commentStatement = function () {
    // CommentStatement
    let t = this.current()
    this.index += 1
    let c = new CommentStatement(t.value)
    return c
}

module.exports = {
    commentStatement,
}