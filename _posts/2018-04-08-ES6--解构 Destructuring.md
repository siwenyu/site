---
title: ES6--解构 Destructuring
date: 2018-04-09 00:31:30
tags: [api,js]
categories: [tool]
---

报错了：'Expected to reduce `highW, highH` by destructuring `highIcon`.	(fecs-prefer-destructure)'，很难受。主要内容学习来自Firefox开发者工具工程师Nick Fitzgerald----<a href="http://fitzgeraldnick.com/2013/08/02/testing-source-maps.html">Testing Source Maps</a>。解构赋值允许你使用类似数组或对象字面量的语法将数组和对象的属性赋给各种变量。这种赋值语法极度简洁，同时还比传统的属性访问方法更为清晰。

## 什么是解构赋值？

eg：
```
	let arr = ['张三', '李四', '赵五'];
	let a = arr[0];
	let b = arr[1];
	let c = arr[2];

	console.log(a);   //张三


```

通常来说我们会这样访问一个数组的元素。如果使用解构赋值的特性，将会使等效的代码变得更加简洁并且可读性更高：

```
	let [a, b, c] = arr;
```
这样我们就声明了三个变量，并分别赋值了数组的三个元素。

一般语法：
```
	[val1, val2, ..., valN] = arr;
	或者
	let [val1, val2, ..., valN] = arr;
	//备注：如果使用了var,let,const等关键字，同时声明了变量。
```

事实上，用变量来描述并不恰当，因为你可以对任意深度的嵌套数组进行解构：

```
	var [foo, [[bar], baz]] = [1, [[2], 3]];
    console.log(foo);
    // 1
    console.log(bar);
    // 2
    console.log(baz);
    // 3
```
此外，你可以在对应位留空来跳过被解构数组中的某些元素：
```
	var [,,third] = ["foo", "bar", "baz"];
    console.log(third);
    // "baz"
```
而且你还可以通过“不定参数”模式捕获数组中的所有尾随元素：

```
    var [head, ...tail] = [1, 2, 3, 4];
    console.log(tail);
    // [2, 3, 4]
```

当访问空数组或越界访问数组时，对其解构与对其索引的行为一致，最终得到的结果都是：undefined。
```
    console.log([][0]);
    // undefined
    var [missing] = [];
    console.log(missing);
    // undefined
```
请注意，数组解构赋值的模式同样适用于任意迭代器：(语法问题请补课)
```
    function* fibs() {
      var a = 0;
      var b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
    var [first, second, third, fourth, fifth, sixth] = fibs();
    console.log(sixth);
    // 5
```

## 对象的解构

通过解构对象，你可以把它的每个属性与不同的变量绑定，'首先指定被绑定的属性，然后紧跟一个要解构的变量'。

```
	let person = {name : 'A'};
	let {name: manA} = person;
	console.log(manA);
```
使用'属性名：属性变量名'结构对象的属性。

如果属性名与属性变量名一样的话，可以简写：

```
	var { foo, bar } = { foo: "lorem", bar: "ipsum" };
    console.log(foo);
    // "lorem"
    console.log(bar);
    // "ipsum"
```
与数组解构一样，你可以随意嵌套并进一步组合对象解构：

```
    var complicatedObj = {
      arrayProp: [
        "Zapp",
        { second: "Brannigan" }
      ]
    };
    var { arrayProp: [first, { second }] } = complicatedObj;
    console.log(first);
    // "Zapp"
    console.log(second);
    // "Brannigan"
```

当你解构一个未定义的属性时，得到的值为undefined：

```
	var { missing } = {};
    console.log(missing);
    // undefined
```

与数组结构不同的是，对象解构必须是正常声明的变量，如果是已经声明的变量或者你还没有声明但是在这里使用（亦即赋值语句前没有let、const或var关键字），会报语法错误：

```
重复声明manA错误:
	let manA;

	let person = {name : 'A'};
	let {name: manA} = person;
	console.log(manA);   //Uncaught SyntaxError: Identifier 'manA' has already been declared

未声明：
	let person = {name : 'A'};
	{name: manA} = person;
	console.log(manA);//Uncaught SyntaxError: Unexpected token =


正确：
	let person = {name : 'A'};
	let {name: manA} = person;
	console.log(manA);
```

为什么会出错？这是因为JavaScript语法通知解析引擎将任何以{开始的语句解析为一个块语句（例如，{console}是一个合法块语句）。解决方案是将整个表达式用一对小括号包裹：
```
	({ safe } = {});
    // No errors 没有语法错误
```

## 其他数据类型的解构

当你尝试解构null或undefined时，你会得到一个类型错误：

```
	var {blowUp} = null;
    // Uncaught TypeError: Cannot destructure property `blowUp1` of 'undefined' or 'null'.
	// undefined呵null是没有属性的。
```

然而，你可以解构其它原始类型，例如：布尔值、数值、字符串，但是你将得到undefined:

```
	var {wtf} = NaN;
    console.log(wtf);
    // undefined
	//其他基本数据类型都是undefined
```
你可能对此感到意外，但经过进一步审查你就会发现，原因其实非常简单。当使用对象赋值模式时，被解构的值需要被强制转换为对象。大多数类型都可以被转换为对象，但null和undefined却无法进行转换。当使用数组赋值模式时，被解构的值一定要包含一个迭代器。

## 默认值
当你要解构的属性未定义时你可以提供一个默认值：
```
	var [missing = true] = [];
    console.log(missing);
    // true
    var { message: msg = "Something went wrong" } = {};
    console.log(msg);
    // "Something went wrong"
    var { x = 3 } = {};
    console.log(x);
    // 3    
```

## 解构的实际应用

#### 函数参数定义 

作 为开发者，我们需要实现设计良好的API，通常的做法是为函数为函数设计一个对象作为参数，然后将不同的实际参数作为对象属性，以避免让API使用者记住 多个参数的使用顺序。我们可以使用解构特性来避免这种问题，当我们想要引用它的其中一个属性时，大可不必反复使用这种单一参数对象。
```
	function removeBreakpoint({ url, line, column }) {
      // ...
    }
```

#### 配置对象参数
延伸一下之前的示例，我们同样可以给需要解构的对象属性赋予默认值。当我们构造一个提供配置的对象，并且需要这个对象的属性携带默认值时，解构特性就派上用场了。举个例子，jQuery的ajax函数使用一个配置对象作为它的第二参数，我们可以这样重写函数定义：
```
	jQuery.ajax = function (url, {
      async = true,
      beforeSend = noop,
      cache = true,
      complete = noop,
      crossDomain = false,
      global = true,
      // ... 更多配置
    }) {
      // ... do stuff
    };
```

如此一来，我们可以避免对配置对象的每个属性都重复var foo = config.foo || theDefaultFoo;这样的操作。

#### 与ES6迭代器协议协同使用
ECMAScript 6中定义了一个迭代器协议，当你迭代Maps（ES6标准库中新加入的一种对象）后，你可以得到一系列形如[key, value]的键值对，我们可将这些键值对解构，更轻松地访问键和值：
```
	var map = new Map();
    map.set(window, "the global");
    map.set(document, "the document");
    for (var [key, value] of map) {
      console.log(key + " is " + value);
    }
    // "[object Window] is the global"
    // "[object HTMLDocument] is the document"
```

只遍历键或只遍历值：
```
	for (var [key] of map) {
      // ...
    }
	
    for (var [,value] of map) {
      // ...
    }
```

#### 多重返回值处理

可以返回一个数组并将结果解构，或者用一个对象作为容器并为返回值命名：

```
 	function returnMultipleValues() {
      return [1, 2];
    }
    var [foo, bar] = returnMultipleValues();

	function returnMultipleValues() {
      return {
        foo: 1,
        bar: 2
      };
    }
    var { foo, bar } = returnMultipleValues();
```

都比额外保存一个临时变量要好得多:

```
bad：
    function returnMultipleValues() {
      return {
        foo: 1,
        bar: 2
      };
    }
    var temp = returnMultipleValues();
    var foo = temp.foo;
    var bar = temp.bar;
```

#### 使用解构导入部分CommonJS模块

当我们导入CommonJS模块X时，很可能在模块X中导出了许多你根本没打算用的函数。通过解构，你可以显式定义模块的一部分来拆分使用，同时还不会污染你的命名空间：
```
	const { SourceMapConsumer, SourceNode } = require("source-map");
```
ES6模块，在import声明中有一个相似的语法。

## 总结

ES6会改变写代码的习惯，解构正是提现最明显的特点之一。不是js代码，在每天使用的语言中加入解构这个新特性，它可以让你的代码变得更加精简整洁。