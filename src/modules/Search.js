import React from 'react'
import * as helper from './Helper'

export default React.createClass({
  getInitialState() {
    return {
      data: [],
      context: [],
      filter: [],
      keyword: ''
    }
  },
  updateData() {
    var filterData = "";
    var filterContext = "";
    var filterKeyword = "{"
      +"SELECT DISTINCT ?node WHERE {"
      +"	  {"
      +"      ?node dc:description ?description ; dc:title ?title ; a ?context."
      +"      ?context a skos:Concept ; skos:prefLabel ?label."
      +"      FILTER regex(?description, \"" + this.state.keyword + "\", \"i\")"
      +"    }"
      +"  	UNION"
      +"    {"
      +"      ?node dc:description ?description ; dc:title ?title ; a ?context."
      +"      ?context a skos:Concept ; skos:prefLabel ?label."
      +"      FILTER regex(?title, \"" + this.state.keyword + "\", \"i\")"
      +"    }"
      +"  	UNION"
      +"    {"
      +"      ?node dc:description ?description ; dc:title ?title ; a ?context."
      +"      ?context a skos:Concept ; skos:prefLabel ?label."
      +"      FILTER regex(?label, \"" + this.state.keyword + "\", \"i\")"
      +"    }"
    	+"}}";

    this.state.filter.forEach(function(item){
      filterData += " FILTER EXISTS { ?node a <" + item.context + "> } ";
      filterContext += " FILTER ( ?context != <" + item.context + "> ) "
    });

    var queryData = "PREFIX dc: <http://purl.org/dc/elements/1.1/> "
      +" PREFIX owl: <http://www.w3.org/2002/07/owl#> "
      +" PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
      +" SELECT * WHERE { "
      +"  ?node a owl:NamedIndividual ; "
      +"   dc:title ?title; "
      +"   dc:description ?description . "
      + filterData
      + filterKeyword
      +" }";

    helper.sparqlSelect(queryData).then((result)=>{
      this.setState({
        data: helper.transformSparqlResults(result)
      });
    });

    var queryContext = ""
      +"PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
      +"PREFIX dc: <http://purl.org/dc/elements/1.1/> "
      +"PREFIX owl: <http://www.w3.org/2002/07/owl#>"
      +"SELECT DISTINCT ?context ?label WHERE {"
      +"  ?node a owl:NamedIndividual ; a ?context."
      +"  ?context a skos:Concept ; skos:prefLabel ?label."
      + filterData
      + filterContext
      + filterKeyword
      +"}";

    helper.sparqlSelect(queryContext).then((result)=>{
      this.setState({
        context: helper.transformSparqlResults(result)
      });
    });
  },
  setFilter(item) {
    var filter = this.state.filter;
    filter.push(item);

    var context = this.state.context;
    var index = context.indexOf(item);
    context.splice(index, 1);

    this.setState({
      filter: filter,
      context: context
    });

    this.updateData();
  },
  removeFilter(item) {
    var context = this.state.context;
    context.push(item);

    var filter = this.state.filter;
    var index = filter.indexOf(item);
    filter.splice(index, 1);

    this.setState({
      filter: filter,
      context: context
    });

    this.updateData();
  },
  handleInputChange(field, event) {
    var nextState = {};
    nextState[field] = event.target.value;
    this.setState(nextState);
    console.log(this.state);
  },
  handleSubmit(event){
    event.preventDefault();
    this.updateData();
  },
  render() {
    var dataRows = [];
    this.state.data.forEach(function(item){
      dataRows.push(
        <div className="list-group" key={item.node}>
          <div className="list-group-item">
            <h4 className="list-group-item-heading">{item.title}</h4>
            <p className="list-group-item-text"><a href={item.node} target="_blank">{item.node}</a></p>
          </div>
        </div>
      );
    });

    var contextRows = [];
    var self = this;
    this.state.context.forEach(function(item){
      contextRows.push(
        <a className="list-group-item" key={item.context} onClick={self.setFilter.bind(this, item)}>
          {item.label}
        </a>
      );
    });

    var filterRows = [];
    this.state.filter.forEach(function(item){
      filterRows.push(
        <a className="list-group-item" key={item.context} onClick={self.removeFilter.bind(this, item)}>
          {item.label} <i className="fa fa-trash-o fa-lg pull-right"></i>
        </a>
      );
    });

    return <div>
      <div className="page-header">
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input required type="text" className="form-control" placeholder="Search" value={this.state.keyword} onChange={this.handleInputChange.bind(this, 'keyword')}/>
          </div>
        </form>
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <h3>Filter</h3>
              {filterRows}
            </div>
            <div className="list-group">
              <h3>Contex</h3>
              {contextRows}
            </div>
          </div>
          <div className="col-md-9">
            <h3>Document</h3>
            {dataRows}
          </div>
        </div>
      </div>
    </div>
  }
})
