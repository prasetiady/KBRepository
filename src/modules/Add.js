import React from 'react'
import Typeahead from 'react-bootstrap-typeahead'

export default React.createClass({
  getInitialState() {
    return {
      url: '',
      title: '',
      context: [],
      selectedContext : [],
      description: ''
    }
  },
  componentDidMount() {
    this.setState({
      context : [
        {id: 1, name: 'John'},
        {id: 2, name: 'Miles'},
        {id: 3, name: 'Charles'},
        {id: 4, name: 'Herbie'},
      ]
    })
  },
  _handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  },
  _handleChange(field, event) {
    var nextState = {};
    nextState[field] = event.target.value;
    this.setState(nextState);
  },
  _handleTypeaheadChange(selected) {
    var nextState = {};
    nextState['selectedContext'] = selected;
    this.setState(nextState);
  },
  render() {
    return <div>
      <div className="page-header">
        <h1>Add</h1>
      </div>
      <form onSubmit={this._handleSubmit}>
        <div className="form-group">
          <label>URL</label>
          <input type="text" className="form-control" placeholder="URL" value={this.state.url} onChange={this._handleChange.bind(this, 'url')}/>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this._handleChange.bind(this, 'title')}/>
        </div>
        <div id="bloodhound" className="form-group">
          <label>Fields of Science and Technology</label>
          <Typeahead
            labelKey="name"
            multiple
            onChange={(selected) => this._handleTypeaheadChange(selected)}
            options={this.state.context}
            placeholder="Fields of Science and Technology"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" rows="5" value={this.state.description} onChange={this._handleChange.bind(this, 'description')}></textarea>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  }
})
