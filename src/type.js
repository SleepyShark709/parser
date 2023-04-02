let TokenType = {
    'number': 'number',
    'plus': 'plus',
    'minus': 'minus',
    'mul': 'multiply',
    'div': 'division',
    'mod': 'mod',
    'operator': 'operator',
    'kohkLeft': 'parenthesisLeft',
    'kohkRight': 'parenthesisRight',
    'comma': 'comma',
    'string': 'string',
    // {
    'curlyLeft': 'curlyLeft',
    // }
    'curlyRight': 'curlyRight',
    // [
    'bracketLeft': 'bracketLeft',
    // ]
    'bracketRight': 'bracketRight',
    'identifier': 'identifier',
    'var': 'var',
    'const': 'const',
    'con': 'con',
    'let': 'keyword',
    'while': 'while',
    'for': 'for',
    'break': 'break',
    'continue': 'continue',
    'return': 'return',
    'class': 'class',
    'this': 'this',
    'new': 'new',
    // =
    'assign': 'assign',
    'function': 'function',
    'if': 'if',
    'else': 'else',
    'bool': 'bool',
    // .
    'dot': 'dot',
    // "
    'quote': 'quote',
    // '
    'singlequote': 'singlequote',
    // `
    'grave': 'grave',
    // :
    'colon': 'colon',
    'comment': 'comment',
    'semicolon': 'semicolon',
    'keyword': 'keyword',
}

class ASTNode {
    constructor() {
        // this.type = `${this.constructor.name}`
    }
}

class ProgramNode extends ASTNode {
    constructor(body) {
        super()
        this.body = body
        this.type = 'ProgramNode'
    }
}

class ExpressionStatement extends ASTNode {
    constructor(expression) {
        super()
        this.expression = expression
        this.type = 'ExpressionStatement'
    }
}

// 关于 varType 这个字段
// 是用来表示一个变量的类型
// 所以是 Identifier 的一个属性
// 但是其他节点可能也需要这个属性
// 比如 const f = (a, b) => {return 'a'}
// 右边的函数表达式需要存一下类型，然后把这个类型赋给 f
class Identifier extends ASTNode {
    constructor(name, varType) {
        super()
        this.name = name
        this.varType = varType
        this.type = 'Identifier'
    }
}

class Literal extends ASTNode {
    constructor(token) {
        super()
        this.value = token.value
        this.raw = token.raw
        this.type = 'Literal'
    }
}

class BinaryExpression extends ASTNode {
    constructor(operator, left, right) {
        super()
        this.left = left
        this.right = right
        this.operator = operator
        this.type = 'BinaryExpression'
    }
}

class UpdateExpression extends ASTNode {
    constructor(argument, operator, prefix = true) {
        // prefix 为 true 时表示 ++a
        super();
        this.operator = operator
        this.argument = argument
        this.prefix = prefix
        this.type = 'UpdateExpression'
    }
}

class UnaryExpression extends ASTNode {
    constructor(operator, _argument, prefix = true) {
        super()
        this.prefix = prefix
        this._argument = _argument
        this.operator = operator
        this.type = 'UnaryExpression'
    }
}

class IfStatement extends ASTNode {
    constructor(test, consequent, alternate = null) {
        super()
        this.test = test
        this.consequent = consequent
        this.alternate = alternate
        this.type = 'IfStatement'
    }
}


class BlockStatement extends ASTNode {
    constructor(body) {
        super()
        this.body = body
        this.type = 'BlockStatement'
    }
}

class CallExpression extends ASTNode {
    constructor(callee, args = []) {
        super()
        this.callee = callee
        this._arguments = args
        this.type = 'CallExpression'
    }
}


class VariableDeclaration extends ASTNode {
    constructor(kind, declarations, varType) {
        super()
        this.kind = kind
        this.declarations = declarations
        this.type = 'VariableDeclaration'
        // this.varType = varType
    }
}


class VariableDeclarator extends ASTNode {
    constructor(id, init, varType) {
        super()
        this.id = id
        this.init = init
        this.type = 'VariableDeclarator'
        // this.varType = varType
    }
}

class ArrayExpression extends ASTNode {
    constructor(elements) {
        super()
        this.elements = elements
        this.type = 'ArrayExpression'
    }
}

class Property extends ASTNode {
    constructor(key, value, kind = 'init') {
        super()
        this.key = key
        this.value = value
        // "init" | "get" | "set"
        this.kind = kind
        this.method = false
        this.computed = false
        this.type = 'Property'
    }
}

class ObjectExpression extends ASTNode {
    constructor(properties) {
        super()
        this.properties = properties
        this.type = 'ObjectExpression'
    }
}

class MemberExpression extends ASTNode {
    constructor(object, property, computed = false) {
        super()
        this.object = object
        this.property = property
        this.computed = computed
        this.type = 'MemberExpression'
    }
}


class AssignmentExpression extends ASTNode {
    constructor(left, right, operator) {
        super()
        this.operator = operator
        this.left = left
        this.right = right
        this.type = 'AssignmentExpression'
    }
}


class WhileStatement extends ASTNode {
    constructor(test, body) {
        super()
        this.test = test
        this.body = body
        this.type = 'WhileStatement'
    }
}

class ForStatement extends ASTNode {
    constructor(init, test, update, body) {
        super()
        this.init = init
        this.test = test
        this.update = update
        this.body = body
        this.type = 'ForStatement'
    }
}

class BreakStatement extends ASTNode {
    constructor() {
        super()
        this.type = 'BreakStatement'
    }
}

class ContinueStatement extends ASTNode {
    constructor() {
        super()
        this.type = 'ContinueStatement'
    }
}

class ThisExpression extends ASTNode {
    constructor() {
        super()
        this.type = 'ThisExpression'
    }
}


class FunctionExpression extends ASTNode {
    constructor(body, params, id = null, varType) {
        super()
        this.id = id
        this.params = params
        this.body = body
        this.varType = varType
        this.type = 'FunctionExpression'
    }
}

// 类属性
class ClassProperty extends ASTNode {
    constructor(key,value, _static = false) {
        super()
        this.key = key
        this.value = value
        this._static = _static
        this.type = 'ClassProperty'
    }
}

// 类函数
class ClassMethod extends ASTNode {
    constructor(key, value, _static = false, kind, computed = false) {
        super()
        this.key = key
        this.value = value
        this._static = _static
        this.computed = computed
        this.kind = kind
        this.type = 'ClassMethod'
    }
}

class ClassBody extends ASTNode {
    constructor(body) {
        super()
        this.body = body
        this.type = 'ClassBody'
    }
}

class ClassExpression extends ASTNode {
    constructor(body, superClass = null, id = null) {
        super()
        this.id = id
        this.superClass = superClass
        this.body = body
        this.type = 'ClassExpression'
    }
}

class ClassDeclaration extends ASTNode {
    constructor(body, superClass = null, id = null, varType) {
        super()
        this.id = id
        this.superClass = superClass
        this.body = body
        this.varType = varType
        this.type = 'ClassDeclaration'
    }
}

class NewExpression extends ASTNode {
    constructor(callee, _arguments=[]) {
        super()
        this.callee = callee
        this._arguments = _arguments
        this.type = 'NewExpression'

    }
}

class FunctionDeclaration extends ASTNode {
    constructor(body, params, id = null, returnVarType) {
        super()
        this.id = id
        this.params = params
        this.body = body
        this.returnVarType = returnVarType
        this.type = 'FunctionDeclaration'
    }
}

class ReturnStatement extends ASTNode {
    constructor(arg) {
        super()
        this._argument = arg
        this.type = 'ReturnStatement'
    }
}

// 给默认参数用
class AssignmentPattern extends ASTNode {
    constructor(left, right) {
        super()
        this.left = left
        this.right = right
        this.type = 'AssignmentPattern'
    }
}

class CommentStatement extends ASTNode {
    constructor(value) {
        super()
        this.value = value
        this.type = 'CommentStatement'
    }
}

class Generics extends ASTNode {
    constructor(name, parameters) {
        super()
        this.name = name
        this.parameters = parameters
        this.type = 'Generics'
    }
}


class FunctionType extends ASTNode {
    constructor(paramsType, returnVarType) {
        super()
        this.paramsType = paramsType
        this.returnVarType = returnVarType
        this.type = 'FunctionType'
    }
}

class ClassType extends ASTNode {
    constructor(name, properties, methods) {
        super()
        this.name = name
        this.properties = properties
        this.methods = methods
        this.type = 'ClassType'
    }
}

class InstanceType extends ASTNode {
    constructor(classType) {
        super()
        this.classType = classType
        this.type = 'InstanceType'
    }
}


class ImportSpecifier extends ASTNode {
    constructor(local) {
        super()
        this.local = local
        this.type = 'ImportSpecifier'
    }
}

class ImportDeclaration extends ASTNode {
    constructor(specifiers, source) {
        super()
        this.specifiers = specifiers
        this.source = source
        this.type = 'ImportDeclaration'
    }
}

module.exports = {
    TokenType,
    ProgramNode,
    ExpressionStatement,
    Identifier,
    Literal,
    BinaryExpression,
    UnaryExpression,
    IfStatement,
    BlockStatement,
    CallExpression,
    VariableDeclaration,
    VariableDeclarator,
    ArrayExpression,
    Property,
    ObjectExpression,
    MemberExpression,
    AssignmentExpression,
    WhileStatement,
    ForStatement,
    BreakStatement,
    ContinueStatement,
    FunctionDeclaration,
    FunctionExpression,
    ReturnStatement,
    AssignmentPattern,
    ClassBody,
    ClassExpression,
    ClassProperty,
    ClassMethod,
    ThisExpression,
    CommentStatement,
    Generics,
    FunctionType,
    ClassType,
    ClassDeclaration,
    ImportDeclaration,
    ImportSpecifier,
    InstanceType,
    NewExpression,
    UpdateExpression,
}