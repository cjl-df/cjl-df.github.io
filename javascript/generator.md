- ## for of

  >MDN 规范：

  The for...of statement creates a loop iterating over iterable objects, including: built-in String, Array, Array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables. It invokes a custom iteration hook with statements to be executed for the value of each distinct property of the object.

  翻译：for 0f 可以用来创建一个可遍历对象的循环遍历器,这些可遍历对象包括一些内置的对象如：,字符串,数组,和类数组(e.g., arguments or NodeList)，类型数组和用户自定义的可遍历对象。他会调用一个 iteration 迭代勾子函数，并且执行这个勾子函数，来获取对象的不同属性的值.
  
  >那么什么是可遍历对象那?
  
  **这个就是下面的iterator要说的东西.**
  
  >for of 和 for in的却别?
  
  **for of 依赖于对象是否可迭代（也就是是否实现了可迭代规范，见iterator）；for in 以来对象的属性是否可以枚举，详见[for in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)和[属性的可枚举行](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)**

- ## iterator

- ## generator
