import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <Router>
    <Main />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
