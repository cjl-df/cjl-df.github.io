## 类组件 setState

### setState 表现为异步操作

```javascript
export default class TestClass extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    this.setState({ count: this.state.count + 2 });
    this.setState({ count: this.state.count + 3 });
    this.setState({ count: this.state.count + 4 });
    this.setState({ count: this.state.count + 5 }); //每次setState都表现为，count值却都是0;并不会立即取到上一次的setState后的值
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        {count}
        <TestSub />
        <TestSubClass />
      </div>
    );
  }
}
```

### setState 合并渲染

```javascript
  componentDidMount() {
    //多次非异步setState,会进行合并，然后走一次渲染render;回调函数中也是取多次合并的state;并且setState会在render后执行
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count);
    });
    Promise.resolve(2).then(res => this.setState({ count: 0 }));
    this.setState({ count: this.state.count + 2 });
    this.setState({ count: this.state.count + 3 });
    this.setState({ count: this.state.count + 4 });
    this.setState({ count: this.state.count + 5 });
  }
```

### setState 在原生事件和异步操作中表现为同步

```javascript
  componentDidMount() {
    //在异步操作或者原生事件中，setState表现为同步；并且没一次都会重新渲染走一遍render
    Promise.resolve(2).then(res => {
      console.log(this.state.count);
      this.setState({ count: 0 });
    });
    setTimeout(() => {
      this.setState({ count: 0 });
    }, 0);
    this.setState({ count: this.state.count + 2 });
    this.setState({ count: this.state.count + 3 });
    this.setState({ count: this.state.count + 4 });
    this.setState({ count: this.state.count + 5 });
  }
```

### setState 中想要获取最新的 state 可以通过函数参数的形式 setState

```javascript
  componentDidMount() {
    //仍然会合并渲染
    this.setState({ count: this.state.count + 2 });
    this.setState(state => ({ count: state.count + 3 }));
    this.setState(state => ({ count: state.count + 4 }));
  }
```

## 函数组件 useState

### 与类中的 setState 表现为异步一样，函数组件每一次 render 都会有自己的一份 props,state,hook 快照,因此取得也是当前快照的值

```javascript
export default function () {
  const [state, setstate] = useState(0);

  useEffect(() => {
    setstate(state + 1);
    setstate(state + 2);
    setstate(state + 3);
    setTimeout(() => {
      setstate(state + 4); //这儿取得也是当前快照的state:0
    }, 0);
    setstate(state + 4); //state的取得值始终是当前快照的state:0
  });
  return (
    <div>
      {data.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
```

### useState 也会合并多次同步 setState，然后渲染；异步操作不会进行合并；不管异步和同步都是 state 都是取得当前快照的值

### useState 每次 setState 如果想去到最新的值，同类组件一样，传入函数

```javascript
useEffect(() => {
  setstate((state) => state + 1);
  setstate((state) => state + 2);
  setstate((state) => state + 3);
});
```

**_类组件会通过 new 来创建一个类组件实例;而函数组件不会创建实例，因此每次 render 重新执行一遍函数组件，也就是每次 render 都会有一份当前 render 的 props,state 和 hook;这也是为什么在异步操作中，类组件取得是当前组件实例的 state,函数组件取得仍是当前快照的值的区别_**

参考：
[useState 实现原理](https://zhuanlan.zhihu.com/p/66923924)
