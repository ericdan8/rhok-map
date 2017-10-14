import React from 'react';
import MapComponent from './MapComponent';
import { Navbar, NavItem, Row, Col, Container, Input, Icon } from 'react-materialize'
import { Marker } from "react-google-maps"
import FilterGroup from './FilterGroup';

class MapWithFilterControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      fullNodes: props.nodes,
      filters: {}
    };
    this.updateFilters = this.updateFilters.bind(this);
    this.buildFilterGroup = this.buildFilterGroup.bind(this);
    this.buildMarker = this.buildMarker.bind(this);
  }
  buildMarker(item) {
    return <Marker 
      key={item.geometry.coordinates[1]}
      position={{
        lat: Number(item.geometry.coordinates[1]),
        lng: Number(item.geometry.coordinates[0])
      }}
      onClick={this.setContent.bind(this, item.properties.popupContent)}
    />
  }
  buildFilterGroup(item) {
    return <FilterGroup 
      style={{ background: '#2c3e50', color: '#FFF' }}
      s={2}
      name={item.name}
      controls={item.filters}
      onChange={this.updateFilters}
    />
  }
  updateFilters(newFilterState) {
    console.log(newFilterState);
  }
  setContent(newContent) {
    this.setState({
      content: {__html: newContent}
    })
  }
  getContent() {
    return <div dangerouslySetInnerHTML={this.state.content}/>
  }
  render() {
    var filterGroups = this.props.filterGroups;
    var nodes = this.state.fullNodes;
    return (
      <Row>
        {filterGroups.map(this.buildFilterGroup)}
        <Col s={5} >
          <MapComponent
            {...this.props}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          >
            {nodes.map(this.buildMarker)}
          </MapComponent>
        </Col>
        {this.getContent()}
      </Row>
    )
  }
}

export default MapWithFilterControls;