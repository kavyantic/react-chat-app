const ejs = require('ejs')
const fs = require('fs')
function emailTemplate(locals){
    return ejs.render(fs.readFileSync('./views/email.ejs','utf8',(err,content)=>{return content}),locals)
}


module.exports = {emailTemplate}