const gen_classMemberExpression = function (node) {
    // Student.name => Student_name
    // log('n', node)
    let {object, property} = node
    let className = this.visit(object)
    let t = this.visit(property)
    let s = `${className}_${t}`
    return s
}

module.exports = {
    gen_classMemberExpression,
}