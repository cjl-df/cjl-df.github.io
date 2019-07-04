- ## 组件生命周期componentWillUnmout中常进行的操作

  >1.取消监听函数
    
    ```
    import React, { Component } from 'react';

    export default class SideMenu extends Component {

      constructor(props) {
          super(props);
          this.state = {
                };
          this.openMenu = this.openMenu.bind(this);
          this.closeMenu = this.closeMenu.bind(this);
      }

      componentDidMount() {
          document.addEventListener("click", this.closeMenu);
      }

      componentWillUnmount() {
          document.removeEventListener("click", this.closeMenu);
      }

      openMenu() {
      }

      closeMenu() {
      }

      render() {
          return (
              <div>
                      <a
                          href      = "javascript:void(0)"
                          className = "closebtn"
                          onClick   = {this.closeMenu}
                      >
                          ×
                      </a>
                    <div>
                       Some other structure
                    </div>
                  </div>
          );
      }
    }    
  ```
  
  >2.取消计时器
  
  ```
  import React, { Component } from 'react';

  export default class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timeId: null,
      };
    }

    componentDidMount() {
      const timeId = this.state.timeId;
      if (!timeId) {
        this.setState({
          timeId: setInterval(() => {
            console.log('你好');
          }, 2000),
        });
      }
    }

    componentWillUnmount() {
      clearInterval(this.state.timeId);
    }

    render() {
      return 'counting' + this.props.count;
    }
  }
  ```
  
  >3.清除对象
  
    ```
    import React from 'react';
    import { Component } from 'react';
    import ReactDom from 'react-dom';
    import d3Chart from './d3charts';


    export default class Chart extends Component {

        static propTypes = {
                data: React.PropTypes.array,
                domain: React.PropTypes.object
        };

        constructor(props){
            super(props);

        }

        componentDidMount(){
            let el = ReactDom.findDOMNode(this);
            d3Chart.create(el, {
                width: '100%',
                height: '300px'
            }, this.getChartState());
        }

        componentDidUpdate() {
            let el = ReactDom.findDOMNode(this);
            d3Chart.update(el, this.getChartState());
        }

        getChartState() {
            return {
                data: this.props.data,
                domain: this.props.domain
            }
        }

        componentWillUnmount() {
            let el = ReactDom.findDOMNode(this);
            d3Chart.destroy(el);
        }

        render() {
            return (
                <div className="Chart">
                </div>
            );
        }
    }    
    ```
