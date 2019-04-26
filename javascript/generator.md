- ## for of

  >1.MDN 规范：
  
  for of statement creates a loop iterating over iterable objects, including: built-in String, Array, Array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables. It invokes a custom iteration hook with statements to be executed for the value of each distinct property of the object.

  翻译：for 0f 可以用来创建一个可遍历对象的循环遍历器,这些可遍历对象包括一些内置的对象如：,字符串,数组,和类数组(e.g., arguments or NodeList)，类型数组和用户自定义的可遍历对象。他会调用一个 iteration 迭代勾子函数，并且执行这个勾子函数，来获取对象的不同属性的值.
  
  >2.那么什么是可遍历对象那?
  
  **这个就是下面的iterator要说的东西.**
  
  >3.for of 和 for in的却别?
  
  **for of 依赖于对象是否可迭代（也就是是否实现了可迭代规范，见iterator）,并且对象是否实现了可迭代协议,也就是对象有Symbol.iterator属性；for in 以来对象的属性是否可以枚举，详见[for in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)和[属性的可枚举行](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)**

- ## iterator
    >1.[可迭代协议和迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

    可迭代协议就是为了让javascrip可以统一的用**for of**来访问遍历对象的属性;迭代器协议则定义了是那么是迭代器,也就是iterator.

    >2.我们对Object粗略的实现可迭代协议(也就是给Object[Symbol.iterator]实现迭代器)
    
    代码如下:
    ```
    Object.prototype[Symbol.iterator] = function(){
        const objList = Object.entries(this)
        let i = 0
        return {
            next:function(){
                if(i<objList.length){
                    const [key,value] = objList[i++]
                    return  {value:{key,value},done:false} 
                }
                return {value:undefined,done:true}
            }    
        } 
    }
    ```
    或者按照生成器的方式:
    ```
    Object.prototype[Symbol.iterator] = function * (){
        for (const [key,value] of Object.entries(this)) {
            yield {key,value}
        }
    }
    ```

    这样我们就可以按照for of方式遍历对象:
    ```
    let obj = {
        test:1,
        tt:2,
        sdfs:'dsfsd'
    }

    for (const {key,value} of obj) {
        console.log(key,value)
    }
    ```

- ## generator
    >1. 定义

    **生成器对象是由一个 generator function 返回的,并且它符合*可迭代协议和迭代器协议*。**
    所以生成器对象也可以用for of遍历

    >2. 判断generator 对象类型

    ```
    function isGenerator(obj){
        return obj && typeof obj.next === 'function' && obj[Sysbol.iterator]
    }
    ```

    >3. 案例
    
    3.1. 生成id
    ```
    function *idMaker (){
    let id = 0;
    while(true)
        yield id++
    }

    const nextId = idMaker()

    console.log(nextId.next())
    console.log(nextId.next())
    console.log(nextId.next())
    ```

    这儿用for of循环要注意加限制条件
    ```
    for (const iterator of nextId) {
        if(iterator<10)
            console.log(iterator)
        else return 
    }
    ```

    3.2 菲纳波切数列
    ```

    function * fnbq(){
        let x=0, y=1
        while(true){
            yield y;
            [x,y] = [y,x+y];
        }
    }
    const fnbqValue = fnbq()

    console.log(fnbqValue.next())
    console.log(fnbqValue.next())
    console.log(fnbqValue.next())
    ```
- ## 总结
    这儿只需明白下面几个定义即可
    1.可枚举属性定义
    2.可迭代协议
    3.迭代器协议
    4.生成器定义