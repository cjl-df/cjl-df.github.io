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
                while(i<objList.length){
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

- ## generator
