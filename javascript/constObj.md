
## javascript 中如何实现常量和不可变对象那

- const 常量介绍

  - const 声明的变量，不能改变其值或者其引用的地址

    ```javascript
    const test = 'test';
    // test = 'name'; //报错
    // test = 2;//报错
    console.log(test);
    ```

  - const 声明的变量可以改变其引用对象的值

    ```javascript
    const test = {};
    test.name = 'cjl';
    console.log(test);
    ```

- 使用 es6 （Object.defineProperty()） 修改对象属性的属性描述符

  - 修改 writable 属性描述符

    ```javascript
    let obj = {
      name: 'test',
    };

    Object.defineProperty(obj, 'name', {
      writable: false,
      enumerable: true,
      configurable: true,
    });

    obj.name = 'xxx';

    console.log(obj.name);
    ```

  - 对象属性的有下列属性描述符

    - configurable
      当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。

    - enumerable
      当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
      数据描述符同时具有以下可选键值：

    - value
      该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

    - writable
      当且仅当该属性的 writable 为 true 时，value 才能被赋值运算符改变。默认为 false。
      存取描述符同时具有以下可选键值：

    - get
      一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。
      默认为 undefined。

    - set
      一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
      默认为 undefined。

- 使用 闭包 模拟对象属性描述符

  - 类似于声明了私有变量，比较通用

    ```javascript
    // 闭包模拟不可变变量;
    let config = (function() {
      let private = {
        name: 1,
      };

      return {
        get: function(name) {
          return private[name];
        },
      };
    })();
    // config.private.name = 3;

    console.log(config.get('name'));
    ```

- 使用属性代理 proxy

  - 代理对象的一些操作，如下代理 get,set 方法，实现不可变

    ```javascript
    //使用属性代理
    const handler = {
      get: function(target, key) {
        return target[key];
      },
      set: function(target, key, value) {
        if (key === 'name') return;
        target[key] = value;
      },
    };

    let p = {
      name: 'test',
    };

    p = new Proxy(p, handler);

    p.age = 29;
    p.name = 'cjl';
    console.log(p.age);
    console.log(p.name);
    ```

  - 创建可撤销的代理对象

    ```javascript
    let test = Proxy.revocable(
      {},
      {
        get(target, name) {
          return '[[' + name + ']]';
        },
      },
    );

    var proxy = test.proxy;
    console.log(proxy.foo);

    test.revoke();

    proxy.name = 'cjl';
    ```

  - 对象能代理的 handler 如下：

    一共有 13 种可代理操作，每种操作的代号（属性名/方法名）和触发这种操作的方式列举如下。注意，如果没有定义某种操作，那么这种操作会被转发到目标对象身上。
    具体参考[handler](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)

    - handler.getPrototypeOf()
      在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。
    - handler.setPrototypeOf()
      在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。
    - handler.isExtensible()
      在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
    - handler.preventExtensions()
      在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。
    - handler.getOwnPropertyDescriptor()
      在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。
    - handler.defineProperty()
      在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。
    - handler.has()
      在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。
    - handler.get()
      在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。
    - handler.set()
      在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。
    - handler.deleteProperty()
      在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。
    - handler.ownKeys()
      在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。
    - handler.apply()
      当目标对象为函数，且被调用时触发。
    - handler.construct()
      在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行 new proxy() 时。
