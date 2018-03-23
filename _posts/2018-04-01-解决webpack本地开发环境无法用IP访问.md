---
title: 解决webpack本地开发环境无法用IP访问
date: 2018-04-01 00:31:30
tags: [tool]
categories: [tool]
---

原装的webpack提供了完整的本地预览环境，但是坑爹的是只能用http://localhost:8080访问项目,不能用http://本机IP:8080访问，从网上查了很多相关的问题，回答的方法都是设置host:’0.0.0.0’ ，不知道哪里姿势不对，总是无法成功，现总结如下方法：

## 手动

获取本机ip：
<a href="https://github.com/siwenyu/site/blob/master/_posts/2017-11-16-mac%E6%9F%A5%E7%9C%8B%E6%9C%AC%E6%9C%BAIP.md">

在config中配置dev.port: 为上面找到的IP地址

## 自动脚本

```

function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
} 
const ipadd = getIPAdress();

```

添加在

在config中配置dev.port:

```

dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: ipadd, // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
	''''''''
```
