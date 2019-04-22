function isGenerator(obj){
    return obj && typeof obj.next === 'function'
}

Object.prototype[Symbol.iterator] = function * (){
    for (const [key,value] of Object.entries(this)) {
        yield {key,value}
    }
}

let obj = {
    test:1,
    tt:2
}


for (const {key,value} of obj) {
    console.log(key,value)
}