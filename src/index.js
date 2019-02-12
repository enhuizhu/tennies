import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/loginPage/Login';
import Game from './pages/gamePage/Game';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, HashRouter} from 'react-router-dom';

ReactDOM.render(<HashRouter hashType='slash'>
<Switch>
  <Route exact path='/' component={Login}/>
  <Route path='/game' component={Game}/>
</Switch>
</HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
