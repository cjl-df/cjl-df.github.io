class Test {
    constructor(){
        this.name='cjl'
    }
}


class Child extends Test{

    constructor(){
        //super类似let this = {},Test.call(this) return this
        // 所以如果不掉用super，不能调用this
        super()  
        this.usernmae= 'hello'
    }
}

const child = new Child()

console.log(child.name)
console.log(child.usernmae)