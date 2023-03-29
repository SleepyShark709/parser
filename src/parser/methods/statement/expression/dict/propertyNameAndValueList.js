const {TokenType} = require("../../../../../type");
const propertyNameAndValueList = function () {
    // propertyNameAndValueList
    //     : propertyAssignment ( ',' propertyAssignment )*


    /**
     * {
     *     name: 'gua',
     *     height: '169',
     * }
     * */

    let l = []
    let p = this.propertyAssignment() // 拿到 key 和 value 组成的 ast 对象
    // 这里的 p 是 name: 'gua' 的数据
    l.push(p) // 推到数组里
    let t = this.current() // 拿到当前的 token
    let next = this.peek() // 拿到下一个
    // 要 peek 一下，排除 ,} 的情况
    // {a : 1,}
    // 如果当前的 token 是逗号，且下一个 token 不是 } 时
    while (t.type === TokenType.comma && next.type !== TokenType.curlyRight) {
        this.eat(',') // 吃掉逗号
        let p1 = this.propertyAssignment() // 组成当前的 key 和 value，这里的逻辑和第六行一样
        // 这里的 p1 是 height: '169' 的数据
        l.push(p1)
        t = this.current() // 重复循环外层的操作
        next = this.peek()
    }
    // 这里拿到的就是整个对象的 key 和 value 组成的数组
    // 这里是 name: 'gua' 和 height: '169' 的 ast 对象组成的数组
    return l
}

module.exports = {
    propertyNameAndValueList,
}