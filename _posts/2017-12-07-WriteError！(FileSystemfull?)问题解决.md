---
title: Write Error!(File System full?)问题解决。
date: 2017-12-06 00:31:30
tags: [linux, linux]
categories: [linux]
---
磁盘已满：Write Error!(File System full?)，无法进行文件创建、修改等操作。如何解决呢 ？


* 查看状态：df -h
	
```
	Filesystem            Size  Used Avail Use% 	Mounted on
	/dev/vda1              20G  4.7G   15G  25% /
	/dev/vdb               78G   24G   51G  32% /home
	
```

* 查看根目录下文佳夹大小：

```
➜  ~  du -sh ~/*
64M	/home/work/aladoc
45M	/home/work/aladoc2018
24M	/home/work/domain.psql
171M	/home/work/dump_site_detail.sql
2.4G	/home/work/hhvm
961M	/home/work/https_nginx
65M	/home/work/https_nginx.tar
80K	/home/work/log
2.3G	/home/work/nginx
38M	/home/work/node-docx
39M	/home/work/node_modules
3.7G	/home/work/odp
2.8G	/home/work/odp.bak
932K	/home/work/orp
20K	/home/work/out
32K	/home/work/psop
8.0K	/home/work/psop.tar.gz
8.0K	/home/work/psop.tar.gz.1
8.0K	/home/work/psop.tar.gz.2
2.1G	/home/work/search
455M	/home/work/sitedata
36K	/home/work/taglist.psql
5.4M	/home/work/tags.psql
164K	/home/work/webserver
8.0M	/home/work/wise_env

```

* 删除缓存、log、无用备份等文件，并查看/dev/vdb是不是释放，如果释放，结束。
* 如果没有释放，说明你删掉的文件可能正在被其他进程直接或者间接占用，并没有删掉。

* 使用lsof命令查看哪些进程

```
lost不是有可能不是linux内置命令，需要手动安装。
yum install lsof  

安装之后如果还是没有命令，使用绝对路径使用：
/usr/sbin/lsof

```
* 查看所有进程

```

lsof -i
```

* 查看所有进程，选择性的杀掉进城，可彻底删除刚才删除的文件，解决磁盘已满无法写入的问题Write Error!(File System full?)。
