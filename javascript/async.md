## Promise 原理及实现

* #### *pormise对象内部需要维护 三种状态，异步执行结果的值和失败的原因*
    
    * 所以我们县定义三种常量

    ```
    const PENDING='PENDING';
    const FULFILLED='FULFILED';
    const REJECTED='REJECTED';
    ```

    * prmise对象要维护三种状态,异步执行结果的值和失败的原因，首先要定义promise构造函数

    ```
    function Promies(){
        this.status = PENDING;
        this.value=undefined;
        this.reason=undefined;
    }
    ```

    * 通过resolve,reject来维护status,并且resolve获取值，reject获取失败原因，修改后的promise,(**遗留问题1：value为promise,后面解答**)
    ```
    function Promies(){
        this.status = PENDING;
        this.value=undefined;
        this.reason=undefined;
        let that = this;   //reslve,reject要修改promise实例对象的状态，要缓存下来

        function resovle(value){
            //先不考虑value为promise
            setTimeout(()=>{
                if(that.status === PENDING){
                    that.status = FULFILLED;
                    that.value = value
                }
            })
        }

        function reject(reason){
            setTimeout(()=>{
                if(that.status === PENDING){
                    that.status = REJECTED;
                    that.reason = reason;
                }
            })
        }
    }
    ```

    * 什么时候调用resolve,reject那，当然是异步操作执行完毕后，异步代码在那儿，在我们传给promise构造函数的参数中，所以promise构造函数改成如下

    ```
    function Promies(excutor){ ... }
    ```

    * excutor 要调用resolve和reject，所以promise内部调用excutor，要将两个函数传给excotor,promise新增如下
    ```
    try {
        excutor(resovle,reject)
    } catch (error) {
        reject(error)
    }
    ```

* #### *promise对象我们按照规范，大体写出来了，但是我们怎么调用promise的值那，也就是怎么解决以前的回调地狱*

    * 按照规范当然是调用then,因为then是Promise所有对象公用的，所以放在Promise原型连上,then的参数就是我们的回调函数(onFulfilled,onRejected),也就是ajax中的onsuccess,onerror.(**遗留问题2：value为promise,后面解答**)
    ```
    Promies.prototype.then = function(onFulfiled,onRejected){
        let that = this; //缓存当前调用then的promise对象实例
        let newPromise;  //then返回新的promise
        onFulfiled = typeof onFulfiled ==='function'?onFulfiled :value=>value;
        onRejected = typeof onRejected === 'function'?onRejected:reason=>{throw reason}

        if(that.status === FULFILLED){  //异步操作已完成
            return newPromise = new Promies((resovle,reject)=>{
                setTimeout(()=>{
                    try {
                        let x = onFulfiled(that.value)
                        //x 为promise情况先不考虑
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        }

        if(that.status === REJECTED){
            return newPromise = new Promies((resovle,reject)=>{
                setTimeout(()=>{
                    try {
                        let x = onRejected(that.reason)
                        //x 为promise情况先不考虑
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        }
    }
    ```

    * 但是大多数常规情况下我们都是在还处于pending的时候就调用then，这个时候我们的回调函数不能立即执行，要等待pengding状态结束后才执行；所以我们就需要Promise对象中维护一个回调函数的数组，来维护该promise多次调用then，传入的回调函数，并等待pending状态结束后执行。
    **修改后的promise**
    ```
    function Promies(excutor){
        this.status = PENDING;
        this.value=undefined;
        this.reason=undefined;
        this.onFulfiledCallbacks = [];  // +
        this.onRejectedCallbacks = [];  // +
        let that = this;   //reslve,reject要修改promise实例对象的状态，要缓存下来

        function resovle(value){
            //先不考虑value为promise
            setTimeout(()=>{
                if(that.status === PENDING){
                    that.status = FULFILLED;
                    that.value = value
                    that.onFulfiledCallbacks.forEach(callback => {
                        callback(that.value)
                    });   // +
                }
            })
        }

        function reject(reason){
            setTimeout(()=>{
                if(that.status === PENDING){
                    that.status = REJECTED;
                    that.reason = reason;
                    that.onRejectedCallbacks.forEach(callback=>{
                        callback(that.reason)
                    })  // +
                }
            })
        }

        try {
            excutor(resovle,reject)
        } catch (error) {
            reject(error)
        }
    }
    ```

    **Promise原型连中的then新增pengding判断**
    
