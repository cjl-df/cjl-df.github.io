## App.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Theme,ThemeContext} from './ThemeContext'
import Toolbar,{ThemeOutButton} from './Toolbar'
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {

  toggleTheme = ()=>{
    this.setState({
      toggleTheme:this.toggleTheme,
      theme:this.state.theme === 'yellow'?Theme.dark:Theme.light
    })
  }

  state={
    theme:Theme.dark,
    toggleTheme:this.toggleTheme
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <ThemeContext.Provider value={this.state}>
            <Toolbar />
          </ThemeContext.Provider>
        </header>
        <ThemeOutButton></ThemeOutButton>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## ThemeContext.js

```javascript
import React from 'react';

const Theme ={
    light:'yellow',
    dark:'black'
}

const ThemeContext = React.createContext({
    theme:Theme.light,
    toggleTheme:()=>{}
});

export  { Theme, ThemeContext }

```

## Toolbar.js

```javascript
import React from 'react';
import { ThemeContext } from './ThemeContext'

function Toolbar() {
    return (
      <div>
          <ThemeInButton></ThemeInButton>
      </div>
    );
}

function ThemeInButton(props){
    return (
        <ThemeContext.Consumer>
            {(context)=>(<button style={{color:context.theme}} onClick={()=>{context.toggleTheme()
            }}>点击我改变按钮颜色</button>)}
        </ThemeContext.Consumer>     
    )
}

export class ThemeOutButton extends React.Component{
    static contextType = ThemeContext
    render(){
        return (
            <button style={{color:this.context.theme}} onClick={()=>{this.context.toggleTheme()
            }}>点击我改变按钮颜色</button>
        )
    }
}
// ThemeOutButton.contextType = ThemeContext

export default Toolbar;
```
