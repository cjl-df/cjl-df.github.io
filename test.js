let name = "test";
this.name = "haha";
let test = {
  name: "cjl",
  sayHello: () => {
    console.log(this);
  },
  sayWelcome: function() {
    console.log(this.name);
  },
  sayReject: function() {
    console.log(name);
  }
};

test.sayHello();
test.sayWelcome();
const temp = test.sayWelcome;
temp.call(this);
test.sayReject();

function testFunc() {
  var name = "dd";
  dd = "dsfsdf";
  function sayHello() {
    console.log(name);
  }
  sayHello();
}

testFunc();
console.log(dd);
