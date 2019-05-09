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

    ```
    if(that.status === PENDING){
        return newPromise = new Promies((resovle,reject)=>{
            that.onFulfiledCallbacks.push((value)=>{       //这儿部直接push onFulfiled 1.不清楚onFulfiled执行情况和返回的是不是promise
                try {
                    let x = onFulfiled(value)
                    //x 为promise情况先不考虑
                } catch (error) {
                    reject(error)
                }
            })
            that.onRejectedCallbacks.push((reason)=>{
                try{
                    let x = onRejected(reason);
                    //x 为promise情况先不考虑
                }catch(error){
                    reject(error)
                }
            })
        })
    }
    ```

* #### *promise 整体算完了，但是还有遗留问题，下面我们看下遗留问题*

    * **遗留问题1** promise resolve中的value如果为promise对象，这个我们只需要，调用value.then方法,并将resolve,reject传给then方法。

    ```
    function resovle(value){
        //value为promise
        if(value instanceof Promies){
            return value.then(resovle,reject)   //这儿要return,因为要将该promise对象状态，交给value来维护
        }

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
    ```

    * **遗留问题2** then中onFulfiled或者onRejected执行结果为promise,这儿我们交给一个函数来处理。

    ```
    function resovlePromise(promise2,x, resovle,reject){
        if(promise2 === x )
            return reject(new TypeError('循环引用'))

        let called= false

        if( x instanceof Promies){
            if(x.status === PENDING){
                x.then(y=>{
                    resovlePromise(promise2,y,resovle,reject)
                })
            }else{
                x.then(resovle,reject)
            }
        }else if(x != null && ((typeof x === 'object') || (typeof x === 'function'))){
            //是否具有then函数
            try {
                let then = x.then;
                if(typeof then === 'function'){
                    then.call(x,y=>{
                        if(called) return;
                        called = true;
                        resovlePromise(promise2,y,resovle,reject)
                    },reason=>{
                        if(called) return
                        called = true;
                        reject(reason)
                    })
                }else{
                    resovle(x)
                }
            } catch (error) {
                if(called) return;
                called = true
                resovle(x)
            }
        }else{
            resovle(x)
        }
    }
    ```

* #### *promise 整体算完了，但是还有遗留问题，下面我们看下遗留问题*
    * promise all方法

    ```
    promise.all = function(promises){
        return new Promies((resovle,reject)=>{
            let done = gen(promises.length,resovle)
            promises.forEach((promise,index)=>{
                promise.then((value)=>{
                    done(index,value)
                },reject)
            })
        })
    }

    function gen(length,resovle){
        let count = 0;
        let values = [];
        return function(i,value){
            values[i] = value
            if(++count === length)
                resovle(values)
        }
    }
    ```

    * promise race方法
    ```
    Promies.race = function(promises){
        return new Promies((resovle,reject)=>{
            promises.forEach((promise)=>{
                promise.then(resovle,reject)
            })
        })
    }   
    ```

<<<<<<< HEAD:javascript/async.md
    ```
    Promise.prototype.catch = function(onRejected){
        return this.then(null,onRejected)
    }

    Promise.resovle =function(value){
        return new Promise(resolve=>resolve(value))
    }

    Promise.reject = function(reason){
        return new Promise(reject=>reject(reason))
    }

    Promise.deferred = function(){
        let defer = {}
        defer.promise = new Promise((resovle,reject)=>{
            defer.resolve = resovle;
            defer.reject = reject
        })
        return defer;
    }

    try{
        module.exports = Promise
    }catch(e){
        console.log(e)
    }
    ```

按照掘金上的一篇文章写的
=======
    
>>>>>>> 8217db4ad6c201681dbb5b7c1f205937275d9384:javascript/Promise.md
