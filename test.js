const PENDING='PENDING';
const FULFILLED='FULFILED';
const REJECTED='REJECTED';

function Promies(excutor){
    this.status = PENDING;
    this.value=undefined;
    this.reason=undefined;
    this.onFulfiledCallbacks = [];  // +
    this.onRejectedCallbacks = [];  // +
    let that = this;   //reslve,reject要修改promise实例对象的状态，要缓存下来

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
}

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

Promise.race = function(promises){
    return new Promise((resovle,reject)=>{
        promises.forEach((promise)=>{
            promise.then(resovle,reject)
        })
    })
}   

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