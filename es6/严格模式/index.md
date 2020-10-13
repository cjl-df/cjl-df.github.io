### 严格模式与非严格模式区别

**方法调用，this 默认 undefined**

```
"use strict";
function test() {
  console.log(this);
}
test();

//严格模式 this为undefined,test.call(undefined)
//非严格模式为 全局对象
```

**变量提升**

```
"use strict";
function test() {
  name = "sdfs";
  console.log(this);
}
test();
console.log(name);//报错，严格模式不存在变量提升
```
