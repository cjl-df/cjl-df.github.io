function isGenerator(obj){
    return obj && typeof obj.next === 'function'
}

Object.prototype[Symbol.iterator] = function * (){
    for (const [key,value] of Object.entries(this)) {
        yield {key,value}
    }
}

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


let obj = {
    test:1,
    tt:2,
    sdfs:'dsfsd'
}

for (const {key,value} of obj) {
    console.log(key,value)
}