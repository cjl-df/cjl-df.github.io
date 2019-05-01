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