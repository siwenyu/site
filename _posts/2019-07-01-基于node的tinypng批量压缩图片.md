---
title: 基于node的tinypng批量压缩图片
date: 2019-07-01 00:31:30
tags: [js]
categories: [tool]
---

UE拿来的图片尺寸太大怎么办 ？手动压缩？重命名？导入到设计工具(PS)中保存？tinypng为你提供更快速便捷的解决方法.

## tinypng简介

[tinypng](https://tinypng.com/)提供离线的api服务，第三方开发者可以使用这些api压缩自己的图片。目前支持的服务端语言有：Ruby, PHP, Node.js, Python, Java and .NET. 

普通用户注册申请API key有500次/张的免费额度，之后是10000张一下$0.009一次/张,大概6分钱一张/次；10000张以后是$0.002一张/次，大概1.3分钱一张。合理使用的话，收费还可以。


## 使用步骤

#### 申请API key 

[地址](https://tinypng.com/developers)。

如图：

<img src="{{ site.imgurl }}/api/tiny1.png">

之后会在邮箱收到API key 链接，进入站：

<img src="{{ site.imgurl }}/api/tiny2.png">

#### 转换

1. 新建根目录文件夹work；在根目录下新建目录source，里面有待转换的图片(可递归文件夹)；在根目录下新建tinied文件夹，放置转换后的文件。

2. 在根目录下新建tini.js：

tini.js内容:

```
var fs = require("fs")   
var paths = require("path")  // 根目录
console.log(__dirname);
var root = paths.join(__dirname + '/source') // 压缩前的文件

const tinify = require("tinify"); // 加载tinify压缩模块
tinify.key = "hc9D1H1gDOoHggDFjzisqRxPK60AwMK1"; //设置你的api_key，每个邮箱可免费500张图片转换，申请地址：https://tinypng.com/developers


readDirSync(root);

function readDirSync(path) {
    var allFile = fs.readdirSync(path);
    allFile.forEach(function (ele, index) {    // 遍历文件
        var fileInfo = fs.statSync(path + "/" + ele)
        if (fileInfo.isDirectory()) {
            console.log("dir: " + ele)  
            readDirSync(path + "/" + ele);  // 递归
            if (!fs.existsSync("./tinied/" + ele)) {  // 创建放置转换后图片的文件夹
                fs.mkdirSync("./tinied/" + ele);
            }
        } else {
            var io = paths.resolve(path + "/" + ele, '..')
            console.log(io.replace("source", "tinied") + "/" + ele)
            console.log("file: " + ele)
            console.log(path + "/" + ele)

            const source = tinify.fromFile(path + "/" + ele);     // 请求压缩服务，获取压缩后的的文件
            source.toFile(io.replace("source", "tinied") + "/" + ele); 

        }
    })
}

```

3. 初始化node环境

```
npm init 
npm install --save tinify

```

4. node tiny.js

查看tinied文件夹。

如图：

<img src="{{ site.imgurl }}/api/tiny3.png">




