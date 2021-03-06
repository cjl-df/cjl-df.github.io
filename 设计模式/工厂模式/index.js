let factory = function (role) {
  if (this instanceof factory) {
    var s = new this[role]();
    return s;
  } else {
    return new factory(role);
  }
};

factory.prototype = {
  admin: function () {
    this.name = "平台用户";
    this.role = ["登录页", "主页"];
  },
  common: function () {
    this.name = "游客";
    this.role = ["登录页"];
  },
  test: function () {
    this.name = "测试";
    this.role = ["登录页", "主页", "测试页"];
    this.test = "我还有一个测试属性哦";
  },
};

let admin = new factory("admin");
let common = new factory("common");
let test = new factory("test");
