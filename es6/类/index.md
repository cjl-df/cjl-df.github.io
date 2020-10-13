### js class 理解

**实例属性定义及区别**

```
class People {
  name = ""; //People的每个示例都会有一个name属性，相当于在构造函数中this.name=""
}
```

等价于：

```
class People {
  constructor() {
    this.name = "";
  }
}
```

**原型属性**

```
class People {}
People.prototype.name = "zhangsan"; //原型属性必须在面定义
```

**静态属性**

```
class People {
  static userName = "sss";  //可以在内部定义
}

People.age = 23; //也可以在外部定义
console.log("---");
```

##### js class 模式是严格模式

```
"use strict";
class Person {
  name = "sdfdsdf";
  say() {}  //原型中的函数不会被枚举
}
Person.prototype.nation = "han";

class Man extends Person {
  age = 23;
}

let man = new Man();

for (const key in man) {
  console.log(man[key]);
}
```
