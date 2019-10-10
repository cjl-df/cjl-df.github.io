
#### javascript 堆栈调用，及变量作用域； this ；剪头函数

- javascript 堆栈调用及变量作用域

  javascript 单线程运行，遇见执行语句，则一条一条命令执行(执行语句也是入栈，再出栈)；遇见对象和函数（也是对象），则入堆；

  执行函数的时候，则是使用栈；**因此函数中的声明的变量（不包括隐式声明的全局变量）都是栈内存，栈调用完后也就销毁了（不包括闭包）**

    ```
    let name = 'test';   //全局变量，（js单线程）
    this.name = 'haha';   //全局对象的属性
    let test = {
    name: 'cjl',
    sayReject: function() {
        console.log(name);
    },
    };
    //结果
    //test
    function testFunc() {
    var name = 'dd';
    dd="sdfsd" //隐式声明全局变量
    function sayHello() {
        console.log(name);
    }
    sayHello();
    }
    testFunc();
    console.log(dd); //要放在testFunc后面执行
    ```

- javascript this特指对象
    
    javascript中，this要来制定对象，默认有一个全局对象，全局对象和全局变量不一样，对象是放在堆中，而全局变量则是直接存放在栈内存中的。
    而箭头函数中的this,则是一个常量，只想函数定义时的this指向

    ```
    let name = "test";
    this.name = "haha";
    let test = {
    name: "cjl",
    sayHello: () => {
        console.log(this);
    },
    sayWelcome: function() {
        console.log(this.name);
    },
    };

    test.sayHello();
    test.sayWelcome();
    const temp = test.sayWelcome;
    temp.call(this);
    //结果
    //全局对象
    //cjl
    //haha
    ``

- javascript 概览
  
  因为javascript是单线程的，是一条一条执行的，很多时候我们思考一下，就能晓得其中原理。
