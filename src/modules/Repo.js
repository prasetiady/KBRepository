import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h4>User Name : {this.props.params.userName}</h4>
        <h4>Repo Name : {this.props.params.repoName}</h4>
      </div>
    )
  }
})
