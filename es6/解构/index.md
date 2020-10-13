### 解构

**函数中参数解构注意的地方**

```
 function dx(...x) {
    console.log(x);
}

dx("sdfds", "2324", 2324);
//["sdfds", "2324", 2324]
//这儿解构是对x解构，应该是将x解构进argument,也就是将arguments解构成数组
//argument->("sdfds", "2324", 2324)->...x

//等同于
const [...t] = "hello";
```

```
function tx([x, d]) {
  console.log(x);
}

tx("ewrwr", 345);
//e,w
//这儿是对一个参数进行解构，也就是将字符串结构成数组
//"sdfds"->[x,d]
```

**总的来书第一种是将 arguments 结构成数组，第二种是将字符串解构成数组**
