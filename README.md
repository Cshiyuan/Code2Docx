# Code2Docx
将一个项目的代码全部写入一个Word文件，并且根据项目目录结构生成Word的目录。
先将整个库下载下来，之后在目录里运行npm install.（如果没有Node环境请自行百度）
之后打开Code2Docx.js，将以下相关信息修改为你需要的信息。

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


// let filePath = 'xx';
const filePath = 'xx';   //需要遍历的项目跟路径
const fileName = 'xxx'  //生成的Docs文件名称
const creator = '';
const title = '';
const description ='';

修改完毕后，在项目命令行中 npm start 或者 node Code2Docx.js 都可以。
之后就会在项目目录中看到docx文件了。打开之后，还没有目录。可以点击生成自定义目录。就会根据文档中的样式设置出现目录了哦。
