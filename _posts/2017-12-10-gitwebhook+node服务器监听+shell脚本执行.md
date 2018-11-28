---
title: gitwebhook+node服务器监听+shell脚本执行
date: 2017-12-10 00:31:30
tags: [git, node，shell]
categories: [tool]
---

git上的项目仓库，设置webhook，在push等的时候，可以自动更新服务器仓库内容，着实方便，网上有很多方法可以实现，这只是其中一种。

### 设置webhook

你的仓库 > Settings > webhooks 填写监听地址：

```
http://XXXXX:8010/
```
监听8010端口，或者可以加参数或者后缀。

### 服务器端node服务监听

#### http模块使用
创建一个入口文件gitHook.js，使用http模块的createServer方法开启一个进程，监听相应端口。

```
var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("监听git push已经开启");
   
    pull();  //执行回调的脚本
    
    response.end();
    
}).listen(8010);
执行：

>node gitHook.js (&)

```

#### 使用pm管理node进程

pm2使用<a href="/tool/2017/12/10/使用pm2管理node服务进程/">使用pm2管理node服务进程</a>


### shell脚本执行

监听之后，应该有子进程处理回调，shell脚本，pull()；

新建文件：update.js

```
module.exports = function(){
var s = require('shelljs');
console.log('执行update！');

s.cd('/home/work/aladoc2018/');
    var cmd =  s.exec('git pull', {async:true});
    cmd.stdout.on('end', function(){
        s.exec('pm2 restart 0');
        console.log('start restart!');
    });
}
```

修改gitHook.js：
```
var http = require("http");
var exec = require('child_process').exec;
var pull = require('./pull');
var s = require('shelljs');  //shelljs 见下文

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("监听git提交已经开启");
    var cmdStr = 'curl www.baidu.com';

    pull();
    response.end();
}).listen(8010);

console.log('监听update:' + 'http://xxxx.com:8010/');

```

#### shell语法库使用

其中shelljs是shell脚本的库，使用方法：<a href="/tool/2017/11/30/shelljs语法和使用/">shelljs语法和使用</a>