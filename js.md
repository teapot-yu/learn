## js基础原理
1. JavaScirpt深入之从原型到原型链
什么是原型呢？每个javascript对象（null除外）被创建的时候，都会被关联到另外一个对象上，并从这个对象上“继承”它的属性，而这个对象就是我们所说的原型。在js中最顶层的两个对象是Object.prototype和Function.prototype,并且Function.prototype通过__proto__指向Object.prototype，并且因为Object、Function、Foo都是函数，所以这三者解释Function的实例，故三者皆通过__proto__指向Function.prototype,而Foo.prototype通过__proto__指向了Object.prototype。
而我理解，js原型链的逻辑就在于理解在js中谁是谁的实例，比如说Object、Function、Foo都是函数他们三个作为Function实例，可通过__proto__指向Function。
![原型图](https://user-gold-cdn.xitu.io/2019/9/6/16d04ccc5d03fbc7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
2. JavaScript深入之词法作用域和动态作用域
作用域是程序源代码中变量的定义区域，规定了程序如何对变量进行查找。作用域可分为静态作用域和动态作用域。
词法作用域即静态作用域，是指函数作用域在函数定义时就决定了，而动态作用域是在函数执行时才能决定。显而易见JS是词法作用域即静态作用域。
2. JavaScript深入之执行上下文栈
3. JavaScript深入之变量对象
4. JavaScript深入之作用域链
当js执行一段可执行代码时，会生成一个对应的可执行上下文，在上下文里存储了执行需要的所有内容，包括AO、VO、作用域链和this
5. JavaScript深入之从ECMAScript规范解读this
6. JavaScript深入之执行上下文
7. JavaScript深入之闭包
8. JavaScript深入之参数按值传递
9. JavaScript深入之类数组对象与arguments
10. JavaScript深入之创建对象的多种方式以及优缺点
11. JavaScript深入之继承的多种方式以及优缺点
最后是关于继承，前面我们讲到“每一个对象都会从原型‘继承’属性”，实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的JavaScript》中的话，就是：
继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。
12. JavaScript深入之浮点数精度
13. JavaScript深入之头疼的类型转换(上)
14. js代码的运行原理和执行原理？


## js原生函数实现
1. JavaScript深入之call和apply的模拟实现
2. JavaScript深入之bind的模拟实现
3. JavaScript深入之new的模拟实现

## 手写功能函数

## 典型问题
1. null和undefined的区别