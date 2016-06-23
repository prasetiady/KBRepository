import React from 'react'

export default React.createClass({
  componentDidMount() {
    
  },
  render() {
    return <div>
      <div className="page-header">
        <h1>Add</h1>
      </div>
      <form>
        <div className="form-group">
          <label>URL</label>
          <input type="text" className="form-control" placeholder="URL"/>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" placeholder="Title"/>
        </div>
        <div id="bloodhound" className="form-group">
          <label>Fields of Science and Technology</label>
          <input type="text" className="typeahead form-control" placeholder="Fields of Science and Technology"/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" rows="5"></textarea>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  }
})
