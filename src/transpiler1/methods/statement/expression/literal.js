const visitLiteral = function (node) {
    let s = node.raw
    // log('s is', s, typeof s, isFloat(s))
    if (s[0] === "'" && s[s.length - 1] === "'") {
        // 把单引号改成双引号
        s = `"${s.slice(1, -1)}"`
    }
    // 为了方便 wrapCreate
    // ast 也要改一下 raw
    node.raw = s

    return s
}

module.exports = {
    visitLiteral,
}