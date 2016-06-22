import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    this.context.router.push(path)
  },

  render() {
    return (
      <div>
        <h2>Nested Routes Example</h2>
          <nav>
            <div className="nav-wrapper">
              <ul className="right hide-on-med-and-down">
                <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                <li><NavLink to="/repos/facebook/react">React</NavLink></li>
              </ul>
            </div>
          </nav>

        <h2>Go To Specific Route</h2>  
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="userName"/>
          <input type="text" placeholder="repo"/>
          <button type="submit">Go</button>
        </form>

        <h2>Result</h2>
        {this.props.children}
      </div>
    )
  }
})
