## 原型链原理和 function

#### 函数 function 概述

- function 首先是个对象，我们可以直接给它定义属性;对应与 class，class 定义的也是一个对象，他的属性也就是 class 的静态属性

```javascript
function test() {}
test.name = 'test'; //1

class Test {
  static name = 'test'; //2
}
Test.name = 'test'; //3
```

上面三种方式都是一样的，都是在这个对象上定义一个 name 属性

- function 是一个代码快，里面是语句和变量

```javascript
function test() {
  function sayName() {
    //声明的一个函数对象
    console.log('我是sayName变量');
  }

  const name = 'test'; //声明的一个普通变量

  // 声明一个普通对象
  const obj = {
    name: name,
    sayName: sayName,
  };

  sayName();
}
```

有两点要注意(下面分开细说)，上面都是 test 对象里面的内容语句
**和 test 的原型对象，都没有任何关系，这个是函数里的语句**
**和 test 的对象的属性没任何关系，他们只是 test 执行的语句**

#### 函数 function 作为对象和其他对象的不同之处

- 函数 function 中的内容，是一个代码块，声明的变量和执行的语句

**函数，即是一个对象，又是一个代码块；对象可以声明自己的属性，代码块要调用的时候执行的语句**

- 函数 function 对象有自己的原型对象，也就是 prototype 属性

**但是函数的原型对象，也就是 prototype 属性有什么用；这个原型对象在函数作为构造函数的时候才起作用，通过构造函数返回的对象，他的原型链，**proto**属性就是属性就是指向 prototype**,当然了这个函数的 prototype 属性，我们是可以随便定义的，但是他的 constructor 属性我们一般要默认指向该函数对象


