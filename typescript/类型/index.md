### TS 中类型注意的地方

```
const obj = {
  name: "xxx",
  age: 5222,
};

let { name: userName, age: userAge } = obj;

console.log(userName);
console.log(userAge);
```

**这个地方：是属性重命名，不是指示类型**
