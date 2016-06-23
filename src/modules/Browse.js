import React from 'react'
import * as helper from './Helper'

export default React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },
  componentDidMount() {
    var query = "PREFIX dc: <http://purl.org/dc/elements/1.1/> "
      +" PREFIX owl: <http://www.w3.org/2002/07/owl#> "
      +" SELECT * WHERE { "
      +"  ?node   a               owl:NamedIndividual ; "
      +"          dc:title        ?title; "
      +"          dc:source       ?url; "
      +"          dc:description  ?description . }";
    helper.sparqlSelect(query).then((result)=>{
      this.setState({
        data: helper.transformSparqlResults(result)
      });
      console.log(this.state.data);
    });
  },
  render() {
    var rows = [];
    this.state.data.forEach(function(item){
      rows.push(
        <div className="list-group" key={item.node}>
          <div className="list-group-item">
            <h4 className="list-group-item-heading">{item.title}</h4>
            <p className="list-group-item-text"><a href={item.url} target="_blank">{item.url}</a></p>
          </div>
        </div>
      );
    });
    return <div>
      <div className="page-header">
        <h1>Browse</h1>
      </div>
      {rows}
    </div>
  }
})
