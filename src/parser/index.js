const {
    log,
} = require('../util')

const {
    singleExpressionTypes,
} = require('../config')
const { program } = require('./methods/program')

// methods 文件夹下的 index.js 文件导出的 fetchExports(__dirname) 函数
// const parseMethods = require('./methods')
const {blockStatement} = require("./methods/statement/blockStatement");
const {commentStatement} = require("./methods/statement/commentStatement");
const {breakStatement} = require("./methods/statement/control_flow/breakStatement");
const {continueStatement} = require("./methods/statement/control_flow/continueStatement");
const {ifStatement} = require("./methods/statement/control_flow/ifStatement");
const {returnStatement} = require("./methods/statement/control_flow/returnStatement");
const {classDeclaration} = require("./methods/statement/declaration/classDeclaration");
const {functionDeclaration} = require("./methods/statement/declaration/functionDeclaration");
const {importDeclaration} = require("./methods/statement/declaration/importDeclaration");
const {importSpecifier} = require("./methods/statement/declaration/importSpecifier");
const {variableDeclaration} = require("./methods/statement/declaration/variableDeclaration");
const {variableStatement} = require("./methods/statement/declaration/variableStatement");
const {arrayExpression} = require("./methods/statement/expression/arrayExpression");
const {assignmentExpression} = require("./methods/statement/expression/assignmentExpression");
const {binaryExpression} = require("./methods/statement/expression/binaryExpression");
const {callExpression} = require("./methods/statement/expression/callExpression");
const {classbody} = require("./methods/statement/expression/class/classbody");
const {classExpression} = require("./methods/statement/expression/class/classExpression");
const {classMethod} = require("./methods/statement/expression/class/classMethod");
const {classProperty} = require("./methods/statement/expression/class/classProperty");
const {newExpression} = require("./methods/statement/expression/class/newExpression");
const {objectExpression} = require("./methods/statement/expression/dict/objectExpression");
const {propertyAssignment} = require("./methods/statement/expression/dict/propertyAssignment");
const {propertyNameAndValueList} = require("./methods/statement/expression/dict/propertyNameAndValueList");
const {elementList} = require("./methods/statement/expression/elementList");
const {expressionSequence} = require("./methods/statement/expression/expressionSequence");
const {argumentList} = require("./methods/statement/expression/function/argumentList");
const {assignmentPattern} = require("./methods/statement/expression/function/assignmentPattern");
const {formalParameterList} = require("./methods/statement/expression/function/formalParameterList");
const {functionExpression} = require("./methods/statement/expression/function/functionExpression");
const {_arguments} = require("./methods/statement/expression/function/_arguments");
const {identifier} = require("./methods/statement/expression/identifier");
const {literal} = require("./methods/statement/expression/literal");
const {memberExpression} = require("./methods/statement/expression/memberExpression");
const {singleExpression, is_current_singleExpression} = require("./methods/statement/expression/singleExpression");
const {unaryExpression} = require("./methods/statement/expression/unaryExpression");
const {expressionStatement} = require("./methods/statement/expressionStatement");
const {forStatement} = require("./methods/statement/loops/forStatement");
const {whileStatement} = require("./methods/statement/loops/whileStatement");
const {statement} = require("./methods/statement/statement");
const {statementList} = require("./methods/statement/statementList");
const {generics} = require("./methods/type/generics");
const {typeModification} = require("./methods/type/typeModification");
const {updateExpression} = require("./methods/statement/expression/updateExpression");
const {thisExpression} = require("./methods/statement/expression/class/thisExpression");

class Parser {
    constructor(tokens) {
        this.tokens = tokens
        this.index = 0
        this.ast = null
        // // 把解析节点的方法从子文件中加进来
        // Object.entries(parseMethods).forEach(([name, func]) => {
        //     // name 是当前文件名
        //     // func 是对应导出的函数
        //     this[name] = func
        //     console.log(name, func)
        // })
        this.program = program
        this.blockStatement = blockStatement
        this.commentStatement = commentStatement
        this.breakStatement = breakStatement
        this.continueStatement = continueStatement
        this.ifStatement = ifStatement
        this.returnStatement = returnStatement
        this.classDeclaration = classDeclaration
        this.functionDeclaration = functionDeclaration
        this.importDeclaration = importDeclaration
        this.importSpecifier = importSpecifier
        this.variableDeclaration = variableDeclaration
        this.variableStatement = variableStatement
        this.arrayExpression = arrayExpression
        this.assignmentExpression = assignmentExpression
        this.binaryExpression = binaryExpression
        this.callExpression = callExpression
        this.classbody = classbody
        this.classExpression = classExpression
        this.classMethod = classMethod
        this.classProperty = classProperty
        this.newExpression = newExpression
        this.thisExpression = thisExpression
        this.objectExpression = objectExpression
        this.propertyAssignment = propertyAssignment
        this.propertyNameAndValueList = propertyNameAndValueList
        this.elementList = elementList
        this.expressionSequence = expressionSequence
        this.argumentList = argumentList
        this.assignmentPattern = assignmentPattern
        this.formalParameterList = formalParameterList
        this.functionExpression = functionExpression
        this._arguments = _arguments
        this.identifier = identifier
        this.literal = literal
        this.memberExpression = memberExpression
        this.singleExpression = singleExpression
        this.is_current_singleExpression = is_current_singleExpression
        this.unaryExpression = unaryExpression
        this.expressionStatement = expressionStatement
        this.forStatement = forStatement
        this.whileStatement = whileStatement
        this.statement = statement
        this.statementList = statementList
        this.generics = generics
        this.typeModification = typeModification
        this.updateExpression = updateExpression
        this.parse()
    }

    // 吃掉当前字符
    eat(token) {
        // 拿到当前字符
        let t = this.current()
        // index += 1
        this.index += 1
        if (t.value !== token) {
            throw (`错误 token「${token}」 「${t.type}」「${t.value}」${this.index}`)
        }
        // 返回当前字符
        return t
    }

    current() {
        return this.tokens[this.index]
    }

    peek() {
        let i = this.index + 1
        let t = this.tokens[i]
        if (t === undefined) {
            return {}
        } else {
            return t
        }
    }

    parse() {
        let ast = this.program()
        // log('ast', ast)
        this.ast = ast

    }
}

module.exports = {
    Parser,
}