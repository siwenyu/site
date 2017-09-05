---
title: linux+ centos配置nginx
date: 2017-09-03
tags: [tool]
---

linux+ centos配置nginx静态服务器。本文提供两种安装配置的方法yum一键安装和手动下载依赖包安装，仅供参考~~~

## yum安装

### 修改 yum 仓库配置

执行命令：

```
vi /etc/yum.repos.d/nginx.repo
```

输入内容：

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```
保存。

### 安装：

```
yum install nginx
```
### 启动等操作

```
service nginx start # 启动Nginx服务
service nginx stop # 停止Nginx服务
service nginx.conf # Nginx配置文件位置
```

## 手动编译安装

### 安装G++ openssl

```
yum -y install openssl openssl-devel

yum install gcc gcc-c++

```

### zlib pcre nginx

```

http://nginx.org/download/nginx-1.12.1.tar.gz

https://ftp.pcre.org/pub/pcre/pcre-8.39.tar.gz

http://www.zlib.net/zlib-1.2.11.tar.gz

分别解压：
tar -xvzf ..
```
### 编译nginx

```
cd nginx-1.12.1

./configure --prefix=/usr/local/nginx --sbin-path=/usr/local/nginx/nginx --conf-path=/usr/local/nginx/nginx.conf --pid-path=/usr/local/nginx/nginx.pid --with-http_ssl_module --with-pcre=../pcre-8.39 --with-zlib=../zlib-1.2.8

make

make install

注意：
--prefix=/usr/local/nginx   指定nginx目录
--sbin-path=/usr/local/nginx/nginx  nginx启动目录
--with-pcre=../pcre-8.39 pcre安装目录(相对绝对)，上面安装的
--with-zlib=../zlib-1.2.8  zlib安装目录(相对绝对)，上面安装的

如果没有error，就安装成功了。
```

### 启动等操作

```
	检查nginx.conf配置文件的正确性： /usr/local/nginx/nginx -t 

　	重启nginx： /usr/local/nginx/nginx -s reopen 

　　停止nginx： /usr/local/nginx/nginx -s stop 

　　重新载入配置文件： /usr/local/nginx/nginx -s reload
　　
提示：可设置快捷键等，提升效率。　
```

### 测试

```
公网ip
```
若提示Welcome to nginx! 安装成功。

若提示403，可能有一下几种情况：
1. 服务器默认开放端口没有80等你需要的端口，可在阿里云后台配置。
2. 目录权限。

其他详情，查看链接：http://www.nginx.cn/511.html



