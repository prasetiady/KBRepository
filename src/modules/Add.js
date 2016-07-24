import React from 'react'
import Typeahead from 'react-bootstrap-typeahead'
import * as helper from './Helper'
import * as request from './Request'

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
    var query = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> SELECT * WHERE { ?node a skos:Concept; skos:prefLabel ?label. }";
    request.sparqlSelect(query)
      .then((results)=>{
        this.setState({
          context: helper.transformSparqlResults(results)
        });
      });
  },
  handleSubmit(event) {
    event.preventDefault();

    if(this.state.selectedContext.length == 0){
      alert('Please select at least one Fields of Science and Technology')
      return false;
    }

    // Check If Document Exist
    var queryCheckIfDocumentExist = ""
      +"PREFIX owl: <http://www.w3.org/2002/07/owl#>"
      +"SELECT * WHERE { <" + this.state.url + ">  a owl:NamedIndividual; ?p ?o. }";

    request.sparqlSelect(queryCheckIfDocumentExist).then((result)=>{
      if (result.results.bindings.length > 0) { // Document Exist
        var r = confirm("Document with same uri exist update document ?");
        if (r != true ) return false;
        console.log('document exist');
        updateDocument();
      } else { // Document Not-Exist
        console.log('document not exist');
        addDocument();
      }
    });

    var self = this;

    function updateDocument(){
      var query = ""
        +"PREFIX owl: <http://www.w3.org/2002/07/owl#>"
        +"DELETE {<" + self.state.url + "> ?p ?o} WHERE {"
        + "<" + self.state.url + ">  a owl:NamedIndividual; ?p ?o.}";

      request.sparqlUpdate(query).then((result)=>{
        addDocument();
      });
    }

    function addDocument(){
      var selectedContext = "";
      for(var i=0;i<self.state.selectedContext.length;i++){
        selectedContext += " a <" + self.state.selectedContext[i].node + ">; "
      }

      var query = "PREFIX dc: <http://purl.org/dc/elements/1.1/> "
          +" PREFIX owl: <http://www.w3.org/2002/07/owl#> "
          +" PREFIX :<http://localhost:8080/marmotta/resource/> "
          +" INSERT DATA { "
          + "<" + self.state.url + ">  a owl:NamedIndividual;"
          + selectedContext
          +"                  dc:title        \"" + self.state.title + "\";"
          +"                  dc:description  \"" + self.state.description.replace(/\W+/g, " ") + "\". }"

      request.sparqlUpdate(query).then((results)=>{
        alert("success");
      }).catch((response)=>{
        alert(response.statusText);
        console.log(response);
      })

      self.setState({
        url: '',
        title: '',
        description: ''
      })
    }
  },
  handleInputChange(field, event) {
    var nextState = {};
    nextState[field] = event.target.value;
    this.setState(nextState);
  },
  handleTypeaheadChange(selected) {
    var nextState = {};
    nextState['selectedContext'] = selected;
    this.setState(nextState);
  },
  render() {
    return <div>
      <div className="page-header">
        <h1>Add</h1>
      </div>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>URL</label>
          <input required type="text" className="form-control" placeholder="URL" value={this.state.url} onChange={this.handleInputChange.bind(this, 'url')}/>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input required type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleInputChange.bind(this, 'title')}/>
        </div>
        <div id="bloodhound" className="form-group">
          <label>Fields of Science and Technology</label>
          <Typeahead
            multiple
            required
            onChange={(selected) => this.handleTypeaheadChange(selected)}
            options={this.state.context}
            placeholder="Fields of Science and Technology"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea required className="form-control" rows="5" value={this.state.description} onChange={this.handleInputChange.bind(this, 'description')}></textarea>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  }
})
