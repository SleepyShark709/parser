const {Parser} = require('./src/parser/index.js')
const {Lexer} = require('./src/lexer.js')
const {log1} = require('./log.js')
const list = [
    '3024-day',
    '3024-night',
    'abbott',
    'abcdef',
    'ambiance-mobile',
    'ambiance',
    'ayu-dark',
    'ayu-mirage',
    'base16-dark',
    'base16-light',
    'bespin',
    'blackboard',
    'cobalt',
    'colorforth',
    'darcula',
    'dracula',
    'duotone-dark',
    'duotone-light',
    'eclipse',
    'elegant',
    'erlang-dark',
    'gruvbox-dark',
    'hopscotch',
    'icecoder',
    'idea',
    'isotope',
    'juejin',
    'lesser-dark',
    'liquibyte',
    'lucario',
    'material-darker',
    'material-ocean',
    'material-palenight',
    'material',
    'mbo',
    'mdn-like',
    'midnight',
    'monokai',
    'moxer',
    'neat',
    'neo',
    'night',
    'nord',
    'oceanic-next',
    'panda-syntax',
    'paraiso-dark',
    'paraiso-light',
    'pastel-on-dark',
    'railscasts',
    'rubyblue',
    'seti',
    'shadowfox',
    'solarized',
    'ssms',
    'the-matrix',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'ttcn',
    'twilight',
    'vibrant-ink',
    'xq-dark',
    'xq-light',
    'yeti',
    'yonce',
    'zenburn'
]

const e = (selector) => document.querySelector(selector)
const bindEventLayout = () => {
    let dragged = false
    let container = e('.container')
    container.addEventListener('mousedown', (event) => {
        let self = event.target
        if (self.classList.contains('splitLine')) {
            dragged = true
        }
    })
    container.addEventListener('mousemove', (event) => {
        if (dragged) {
            // 根据分割线的 x 算左边盒子占容器的比例
            let x = event.pageX
            let width = e('.container').offsetWidth
            let percent = Math.min((x / width).toFixed(2) * 100, 99)
            let left = e('.left-editor')
            left.style['min-width'] = `${percent}%`
            left.style['max-width'] = `${percent}%`
        }
    })
    container.addEventListener('mouseup', () => {
        dragged = false
    })
}

const logInsertEvent = (text) => {
    let l1 = new Lexer(text)
    let p1 = new Parser(l1.tokens)
    // 每次重新更新 log 区域
    let container = document.querySelector("#log")
    container.innerHTML = ''
    log1(p1.ast)
}

const bindEventEditor = (editor) => {
    editor.on('change', (instance, changeObj) => {
        let text = instance.getValue()
        logInsertEvent(text)
        // log('te', `[${text}]`)
        // 拿到代码，给 parser
        // 拿到 ast，渲染
    })
}

const bindEventTree = () => {
    e('.tree').addEventListener('click', (event) => {
        let self = event.target
        let parent = self.parentElement
        if (parent.classList.contains('toggleable')) {
            parent.classList.toggle('open')
        } else if (self.classList.contains('entryType')) {
            let p = self.closest('.toggleable')
            p.classList.toggle('open')
        }
    })
}

const bindEvents = (editor) => {
    bindEventLayout()
    bindEventEditor(editor)
    bindEventTree()
}


const initEditor = () => {
    let myTextarea = e('#id-text-editor')
    let editor = CodeMirror(myTextarea, {
        lineNumbers: true,
        mode: 'javascript',
        theme: "darcula",
        // 缩进
        indentUnit: 4,
        // 光标高度
        cursorHeight: 0.85,
    })
    // 设置代码框的长宽
    editor.setSize('100%', '100%')
    editor.setSize(null, '500px', 'min-height')
    // 初始化代码内容
    let code = `const a = 1
for (let i = 0; i < 3; i ++) {
    let c = 2
}
if (a = 3) {
    let b = 3
    console.log('测试', b)
}
const testFunction = function() {
    let test = 3
}
class TestClass {
    constructor() {
        this.a = 3
    }
}
testFunction()
`
    editor.setValue(code)
    logInsertEvent(code)
    return editor
}

const initSelect = (list) => {
    let functionBar = e('.function-bar')
    let t = `<select class="model-styles" id="model-styles">`
    for (const listElement of list) {
        if (listElement === 'darcula') {
            t += `<option value="${listElement}" selected="selected">${listElement}</option>`
        } else {
            t += `<option value="${listElement}">${listElement}</option>`
        }
    }
    t += `</select>`
    functionBar.insertAdjacentHTML('beforeend', t)
}

const selectEvent = (editor) => {
    let selectContainer = e('#model-styles')
    selectContainer.addEventListener('change', (event) => {
        let self = event.target
        // 更新编辑器的主题选项
        for (const editorElement of editor) {
            editorElement.setOption("theme", self.value);
        }
    })
}

const __main = () => {
    let editor = initEditor()
    initSelect(list)
    selectEvent([editor])
    bindEvents(editor)
}

__main()