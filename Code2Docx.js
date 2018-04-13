var fs = require("fs");
var async = require('async');
var docx = require("docx");//path模块，可以生产相对和绝对路径
var path = require("path");

const ignoreKey = [
    '.git',
    'node_modules',
    '.idea',
    '.DS_Store',
    '.npmignore',
    'public',
    'project.config',
    'libs',
    'images'
]  //需要忽略的文件或者文件夹名称


// let filePath = '/Users/shiyuanchen/项目/WeToolBox';
const filePath = 'xx';   //需要遍历的项目跟路径
const fileName = 'xxx'  //生成的Docs文件名称
const creator = '';
const title = '';
const description ='';


const doc = new docx.Document({
    creator: creator,
    title: title,
    description: description,
});


initStyle(doc)  //初始化
let bool = csReadFile(0, filePath, '', doc);

//获取文件数组，进行递归
function csReadFile(level, readurl, name, doc) {

    console.log(name);
    var name = name;
    let files = fs.readdirSync(readurl);


    files.forEach(function (filename) {

        let stats = fs.statSync(path.join(readurl, filename))

        //是文件
        if (stats.isFile()) {

            if (ignoreKey.indexOf(filename) === -1) {

                let title
                if (name === '') {
                    title = '/' + filename;
                } else {
                    title = name + '/' + filename;
                }

                let data = fs.readFileSync(filePath + title, { flag: 'r+', encoding: 'utf8' });
                write2Docx(level, filename, data, doc);
            }
            //是子目录
        } else if (stats.isDirectory()) {

            //不存在需要忽略的文件夹中
            if (ignoreKey.indexOf(filename) === -1) {
                var dirName = filename;
                //递归
                write2Docx(level, '/' + filename, '', doc)
                return csReadFile(level + 1, path.join(readurl, filename), name + '/' + dirName, doc);
            }
        }
    });
    if (level === 0) {  //跑完

        console.log('done!')

        generateDocx(doc);
    }

}

//写入到Docx中
function write2Docx(level, filename, code) {


    if (level === 0) {
        doc.createParagraph(filename).heading2();
    }
    if (level === 1) {
        doc.createParagraph(filename).heading3();
    }
    if (level === 2) {
        doc.createParagraph(filename).heading4();
    }

    let codeArray = code.split("\n");
    codeArray.forEach(item => {
        if (item !== '') {
            doc.createParagraph(item).style('Code');
        }
    });
}

//生成Docx
function generateDocx(doc) {

    const exporter = new docx.LocalPacker(doc);
    exporter.pack(fileName);
    console.log('Document created successfully at project root!');
}

//初始化一些主题样式
function initStyle(doc) {
    doc.Styles.createParagraphStyle('Heading2', 'Heading 2')
        .basedOn("DengXian")
        // .next("Normal")
        .quickFormat()
        .size(32)
        .bold()
        // .italics()
        .spacing({ before: 300, after: 300 });

    doc.Styles.createParagraphStyle('Heading3', 'Heading 3')
        .basedOn("DengXian")
        // .next("Normal")
        .quickFormat()
        .size(32)
        .bold()
        // .underline('double', 'FF0000')
        .spacing({ before: 300, after: 300 });


    doc.Styles.createParagraphStyle('Heading4', 'Heading 4')
        .basedOn("DengXian")
        // .next("Normal")
        .quickFormat()
        .size(32)
        .bold()
        // .underline('double', 'FF0000')
        .spacing({ before: 300, after: 300 });

    doc.Styles.createParagraphStyle('Code', 'Code')
        .basedOn("DengXian")
        .next("Normal")
        .quickFormat()
        .size(21)
        // .bold()
        // .underline('double', 'FF0000')
        .spacing({ before: 60, after: 60 });
}


