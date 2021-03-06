import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Add from './modules/Add'
import Edit from './modules/Edit'
import Manage from './modules/Manage'
import Search from './modules/Search'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/react-bootstrap-typeahead/css/Token.css'
import '../node_modules/react-bootstrap-typeahead/css/Typeahead.css'
import './style.css'

render((
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search}/>
        <Route path="/add" component={Add}/>
        <Route path="/manage" component={Manage}/>
        <Route path="/edit" component={Edit}/>
      </Route>
    </Router>
), document.getElementById('app'))
