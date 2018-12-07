---
title: js中的call和apply
date: 2018-04-01 00:31:30
tags: [js]
categories: [js]
---

破js为啥要有这两个东西啊？

## 定义

### aplly

```
function.apply(obj, args);
obj: 这个参数将取代function中的this对象。
args：传给function的参数。
```

### call

```
function.call(obj, [param1,param2...])
obj:这个参数将代替function中的this对象
aparams：传递给function的参数列表。
```


## 异同点

### 相同点

方法作用相同，都是改变调用函数的内部this指向，使传入的第一个参数这个对象拥有执行function的能力，继承了function的属性和方法。

```
let obj = {};
function name(name) {
	console.log(name);
}

name.call(obj, '这是name');

name.call(null, '这是name');

```

### 不同点

接受的参数形式不一样。call的第二个参数起将以此当做实参传递给function；apply只有两个参数，第二个参数是个数组，依次将元素当做实参传递给function。

## 使用实例

```
function add(n, m) {
	return n + m;
}

console.log(add.call(null, 1,2))

console.log(add.apply(null, [1,2]))

console.log(add.apply(this, [1,2]))

console.log(add.apply(10, [1,2]))
console.log(add.apply('a', [1,2]))
```

请一个数组的最大值：
```

Math.max();

// 我们想用这个方法

let arr = [312,3,4,5,7,9,9,1212];

Math.max.apply(null, arr);


```

对象继承

```
function P(name) {
	this.name = name;
}

function T(subject, name) {
	P.call(this, name);
	this.subject = subject;
}
let t1 = new T('数学', 't1')

console.log(t1);
```