const log = console.log.bind(console)
const fs = require('fs')
const path = require('path')


const fetchExports = (dir) => {
    // 筛选出目录下所有解析ast函数的 js
    // 导入到 index.js 并导出
    // 过滤 dir 文件夹下的 index.js 文件
    const files = fs.readdirSync(dir).filter(name => name !== 'index.js')
    let r = {}
    files.forEach(file => {
        let m = {}
        if (file.endsWith('.js')) {
            // 是 js 文件
            // 拿到文件的导出
            let p = path.join(dir, file)
            m = require(p)
        } else {
            // 是目录，递归导出
            let p = path.join(dir, file)
            m = fetchExports(p)
        }
        r = {
            ...r,
            ...m,
        }
    })
    return r
}


// log('m is', m)
module.exports = fetchExports(__dirname)