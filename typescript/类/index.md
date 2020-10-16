### 类

**es6 中，类的原型属性怎么定义**

```
class People {
  name = "";
  say() {}
  [x: string]: string | Function;  //这儿就是定义原型中的字段
}

People.prototype.age = "sdfsdd";
```
