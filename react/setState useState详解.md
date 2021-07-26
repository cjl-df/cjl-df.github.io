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
