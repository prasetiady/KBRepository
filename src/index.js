import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Add from './modules/Add'
import Search from './modules/Search'
import 'bootstrap_css'
import 'font_awesome_css'
import 'style_css'

render((
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search}/>
        <Route path="/add" component={Add}/>
      </Route>
    </Router>
), document.getElementById('app'))
