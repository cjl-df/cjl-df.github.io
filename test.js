const test = [1,23,454,56,23]

const temp = test[Symbol.iterator]
// console.log(test.next())
console.log(temp.next())
console.log(temp.next())
console.log(temp.next())

