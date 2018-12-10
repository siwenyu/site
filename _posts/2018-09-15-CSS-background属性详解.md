---
title: CSS-background属性详解
date: 2018-09-15 00:31:30
tags: [api,js]
categories: [tool]
---


css中背景background属性大概十多种，日常使用中比较多。
## background-color

背景颜色。值可以是：
```
background-color:'red'；  // 颜色单词
background-color: #fff;   // 十六进制
background-color: rgba(0,0,255,0.8);   // rgba 颜色空间
background-color: transparent;   // 透明  默认值。


```

## background-image

```
背景图。
background-image: url(img/a.jpg),url(img/b.jpg);  // uri
none；没有背景图。
```

## background-repeat
背景图重复

```
1. repeat: 水平和垂直都重复。
2. repeat-x：水平方向重复图像
3. repeat-y：垂直方向重复图像
4. no-repeat：图像不重复

```

## background-position

背景位置
特点：如果只有一个值，另一个默认50%。

```
1. 位置名称：right bottom left top；组合，如果只有一个词，则另外一个默认居中。
2. 百分比：background-position: 20% 20%; 原理：比如div高300，背景图100，那么1%是多少呢？是div的高减去背景图的高之后，这个差值分成100份，每份1%。如果只有一个，另一个默认50%。如果只有一个，另一个默认50
3. 具体像素位置: background-position: 20px 20px;
```

## background-attachment 

设置固定的背景

```
background-attachment: fixed;  // 相对于浏览器窗口fixed定位，定位位置是background-position的值。与元素本身的位置无关。
scroll;  //默认值，相对于元素本身定位。
inherit; 继承父属性
```

## background-size

背景的大小

```
1. background-size: 200px 200px; // 直接写死大小。如果只有一个值，另一个默认auto，一般等比例压缩放大。
2. 百分比大小，如：background-size: 60% 60%;  // 百分比，是div元素的百分比。如果只有一个值，另一个默认auto，一般等比例压缩放大。
3. cover：背景图像覆盖当前元素的所有背景区域，如：background-size: cover; 以长的一边全部覆盖
4. contain: 以长的一边全部覆盖
```

## background-clip
以盒模型原理的背景的绘制区域，哪里可以显示。

```
1. border-box：背景覆盖到边框区域，如：background-clip: border-box;
2. padding-box：背景覆盖到padding区域
3. content-box：背景只覆盖到content部分
```

## background-origin
以盒模型原理的背景开始位置，哪里开始绘制，注意和clip的区别。

```
1. border-box：背景图像的起始位置在边框处，如：background-origin: border-box;
2. padding-box：背景图像的起始位置从padding处开始   默认值
3. content-box：背景图像的起始位置从content处开始

```

## 缩写
background简写并无特定顺序，但是为了可读性，建议一个公司可以统一顺序。

```
background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];


.div11 {
  background: red 
              url(https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2108208159,2289394747&fm=58&bpow=1480&bpoh=2200) 
              no-repeat 
              fixed 
              center center / 50% 
              content-box content-box;
}

```

## DEMO

```
<div class="div1">
    <div class="div11">
        namenamenamenamenamenamenamenamename
    </div>
</div>

<style>
.div11 {
    height: 200px;
    display: flex;
    padding: 20px;
    border: 10px dotted blue;
    background: red 
              url(https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2108208159,2289394747&fm=58&bpow=1480&bpoh=2200) 
              center center / 100% 100%
              no-repeat
              content-box content-box
              fixed;

    /* background-color: rgb(255, 0, 0); */
    /* background-position: 20px 20px;
    background-repeat: no-repeat;
    background-image: url(https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2108208159,2289394747&fm=58&bpow=1480&bpoh=2200); */
}
.div1 {
    width: 500px;
    height: 500px;
    padding: 20px;
    border: 1px solid red;
}
.container {
    height: 3000px;
}
</style>

```