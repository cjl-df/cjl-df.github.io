
## Object and Reflect

## 简介

#### Object

Object 构造函数为给定值创建一个对象包装器。如果给定值是 null 或 undefined，将会创建并返回一个空对象，否则，将返回一个与给定值对应类型的对象。
当以非构造函数形式被调用时，Object 等同于 new Object()。**也就是 Object 是对象的构造函数，因此他有原型对象的,也就是说 Object 是一个函数（函数对象），它有 prototype 属性**

- Object 函数对象的属性

  ##### `Object.length 值为 1`

  ##### `Object 函数对象的 API,大多也是 Reflect 对象的方法`

  - Object.assign()
    通过复制一个或多个对象来创建一个新的对象。
  - Object.create()
    使用指定的原型对象和属性创建一个新对象。
  - Object.defineProperty()
    给对象添加一个属性并指定该属性的配置。
  - Object.defineProperties()
    给对象添加多个属性并分别指定它们的配置。
  - Object.entries()
    返回给定对象自身可枚举属性的 [key, value] 数组。
  - Object.freeze()
    冻结对象：其他代码不能删除或更改任何属性。
  - Object.getOwnPropertyDescriptor()
    返回对象指定的属性配置。
  - Object.getOwnPropertyNames()
    返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。
  - Object.getOwnPropertySymbols()
    返回一个数组，它包含了指定对象自身所有的符号属性。
  - Object.getPrototypeOf()
    返回指定对象的原型对象。
  - Object.is()
    比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。
  - Object.isExtensible()
    判断对象是否可扩展。
  - Object.isFrozen()
    判断对象是否已经冻结。
  - Object.isSealed()
    判断对象是否已经密封。
  - Object.keys()
    返回一个包含所有给定对象自身可枚举属性名称的数组。
  - Object.preventExtensions()
    防止对象的任何扩展。
  - Object.seal()
    防止其他代码删除对象的属性。
  - Object.setPrototypeOf()
    设置对象的原型（即内部 [[Prototype]] 属性）。
  - Object.values()
    返回给定对象自身可枚举值的数组。
    <br />

  ##### `Object.__proto__`

  Object 是个函数，他的原型链自然是 Function 对象的原型；和其他函数一样，从 Function 的原型中继承到原型链的属性自然包括 apply,call,bind,arguments,toString 等属性；**这儿我们要注意函数作为构造函数时的原型对象也就是函数的 prototype ，则默认是一个包含 constructor 属性的对象,而这个对象的原型链则是 Object 函数的原型对象**
 区分如下图：
 
  ![函数对象的原型对象和函数对象的原型链](../assets/image/javascript/class/objectPrototypeAndProto.png)
  <br />

  ##### `Object.prototype`

  **一般函数的原型对象默认是一个包含 constructor 属性的对象，这个对象的原型链就是 Object 函数的原型对象是。所以我们创建的对象，都会有一些公用的属性和 API**
  下面是原型中的一些 API

  - Object.prototype.hasOwnProperty()
    返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。
    <br />
  - Object.prototype.isPrototypeOf()
    返回一个布尔值，表示指定的对象是否在本对象的原型链中。
    <br />
  - Object.prototype.propertyIsEnumerable()
    判断指定属性是否可枚举，内部属性设置参见 ECMAScript [[Enumerable]] attribute 。
    <br />
  - Object.prototype.toLocaleString()
    直接调用 toString()方法。
    <br />
  - Object.prototype.toString()
    返回对象的字符串表示。
    <br />
  - Object.prototype.valueOf()
    返回指定对象的原始值。
    <br />

#### Reflect

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与处理器对象的方法相同。Reflect 不是一个函数对象，因此它是不可构造的。
**Reflect 是一个内置的对象，但不是函数，自然也不是构造函数，他只是一个代理对象，代理对象的一些默认操作**，自然代理的都是一些 Object 函数的属性 API(也就是 `Object 函数对象的属性`中的第二个条目`Object 函数对象的API,大多也是Reflect对象的方法`)
