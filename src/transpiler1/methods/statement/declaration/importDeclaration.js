const visitImportDeclaration = function (node) {
    // import {a, b} from 'c'
    let path = this.visit(node.source)
    // 加上 .h
    path = path.slice(0, -1).concat('.h"')
    let s = `#include ${path}`
    return s
}

module.exports = {
    visitImportDeclaration,
}