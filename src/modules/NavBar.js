import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <span className="navbar-brand">KBRepository</span>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><NavLink to="/" onlyActiveOnIndex={true}>Search</NavLink></li>
            <li><NavLink to="/add">Add</NavLink></li>
            <li><NavLink to="/manage">Manage</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  }
})
