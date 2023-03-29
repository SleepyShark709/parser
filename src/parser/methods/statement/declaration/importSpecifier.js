const {ImportSpecifier} = require("../../../../type");
const importSpecifier = function () {
    // ImportSpecifier:
    //     identifier
    let i = this.identifier()
    let r = new ImportSpecifier(i)
    return r
}

module.exports = {
    importSpecifier,
}