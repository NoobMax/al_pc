const fs = require('fs')
const path = require('path')
const list = require('./config/classify')

fs.readFile(path.resolve(__dirname, 'template/temp.sty'), 'utf8', (err, data) => {
  list.forEach(item => {
    const files = data.replace('__{{fontColor}}__', item.fontColor).replace('__{{bgColor}}__', item.bgColor).replace('__{{title}}__', item.title)
    fs.writeFile(path.resolve(__dirname, `src/assets/styles/ct/${item.name}.scss`), files, 'utf8', err => {
      console.log(err)
    })
  })
  console.log(data)
})