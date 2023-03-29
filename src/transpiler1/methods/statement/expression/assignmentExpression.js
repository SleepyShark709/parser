const {wrapCreate} = require("../../../js2c_container");
const {isInt} = require("../../../../util");
const visitAssignmentExpression = function (node) {
    let op = node.operator.value
    let left = this.visit(node.left)
    let right = this.visit(node.right)
    let v = this.scope.valueOf(left)
    // log('left is', left, right, node.right)
    // 如果是数组的下标赋值
    // 如 GuaArray_get(x, 3) 100，要改成 GuaArray_set(x, 3, GuaNumber(100))
    if (left.startsWith('GuaArray_get')) {
        left = left.replace('GuaArray_get', 'GuaArray_set').slice(0, -1)
        let s = `${left}, ${wrapCreate(node.right)})`
        return s
    } else if (op === '+=') {
        // 如果是数字 n += 1
        // n += 1 -> n.value = n.value + 1
        // log('v is', v, node.left)
        if (v === 'number') {
            // n += 1 -> n.value += 1
            let unionType = isInt(node.left.value) ? 'valueFloat' : 'valueFloat'
            let s = `${left}->value.${unionType} += ${right}`
            return s
        }
    } else if (op === '=') {
        // 如果是数字 n = 1
        // n = 1 -> n.value = 1
        if (v === 'number') {
            let unionType = isInt(v.value) ? 'valueInt' : 'valueFloat'
            let s = `${left}->value.${unionType} = ${right}`
            return s
        }
    } else {
        throw `op ${op}`
    }
    // log('assign', left, right)
    let s = this.concatWithSpace(left, op, right)
    return s
}

module.exports = {
    visitAssignmentExpression,
}