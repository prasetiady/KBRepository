import React from 'react'
import { browserHistory } from 'react-router'
import * as helper from './Helper'
import * as request from './Request'

export default React.createClass({
  getInitialState() {
    return {
      data: [],
      context: [],
      filter: []
    }
  },
  componentDidMount() {
    this.updateData();
  },
  updateData() {
    var filterData = "";
    var filterContext = "";

    this.state.filter.forEach(function(item){
      filterData += " FILTER EXISTS { ?node a <" + item.context + "> } ";
      filterContext += " FILTER ( ?context != <" + item.context + "> ) "
    });

    var queryData = "PREFIX dc: <http://purl.org/dc/elements/1.1/> "
      +" PREFIX owl: <http://www.w3.org/2002/07/owl#> "
      +" SELECT * WHERE { "
      +"  ?node a owl:NamedIndividual ; "
      +"   dc:title ?title; "
      +"   dc:description ?description . "
      + filterData
      +" }";

    request.sparqlSelect(queryData).then((result)=>{
      this.setState({
        data: helper.transformSparqlResults(result)
      });
    });

    var queryContext = ""
      +"PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
      +"PREFIX owl: <http://www.w3.org/2002/07/owl#>"
      +"SELECT DISTINCT ?context ?label WHERE {"
      +"  ?node a owl:NamedIndividual ; a ?context."
      +"  ?context a skos:Concept ; skos:prefLabel ?label."
      + filterData
      + filterContext
      +"}";

    request.sparqlSelect(queryContext).then((result)=>{
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
  deleteData(item) {
    var r = confirm("are you sure want to delete this document ? \n "
                    + " title: " + item.title +  "\n "
                    + " url: " + item.node );
    if (r != true ) return false;

    var query = ""
      +"PREFIX owl: <http://www.w3.org/2002/07/owl#>"
      +"DELETE {<" + item.node + "> ?p ?o} WHERE {"
      + "<" + item.node + ">  a owl:NamedIndividual; ?p ?o.}";

    request.sparqlUpdate(query).then((result)=>{
      this.updateData();
    });
  },
  editData(item) {
    browserHistory.push('/edit?url='+item.node);
  },
  render() {
    var self = this;
    var dataRows = [];
    this.state.data.forEach(function(item){
      dataRows.push(
        <div className="list-group" key={item.node}>
          <div className="list-group-item">
            <h4 className="list-group-item-heading">{item.title}</h4>
            <p className="list-group-item-text">
              <a href={item.node} target="_blank">{item.node}</a>
              <i className="fa fa-trash-o fa-lg pull-right cursor-pointer" onClick={self.deleteData.bind(this, item)}></i>
              <i className="fa fa-pencil fa-lg pull-right cursor-pointer" onClick={self.editData.bind(this, item)}></i>
            </p>
          </div>
        </div>
      );
    });

    var contextRows = [];
    this.state.context.forEach(function(item){
      contextRows.push(
        <a className="list-group-item cursor-pointer" key={item.context} onClick={self.setFilter.bind(this, item)}>
          {item.label}
        </a>
      );
    });

    var filterRows = [];
    this.state.filter.forEach(function(item){
      filterRows.push(
        <a className="list-group-item cursor-pointer" key={item.context} onClick={self.removeFilter.bind(this, item)}>
          {item.label} <i className="fa fa-trash-o fa-lg pull-right"></i>
        </a>
      );
    });

    return <div>
      <div className="page-header">
        <h1>Manage</h1>
      </div>
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
  }
})
