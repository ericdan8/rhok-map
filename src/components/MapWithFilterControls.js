import React from 'react';
import MapComponent from './MapComponent';
import { Navbar, NavItem, Row, Col, Container, Input, Icon } from 'react-materialize'
import { Marker } from "react-google-maps"
import FilterGroup from './FilterGroup';

class MapWithFilterControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNodes: props.nodes,
      filters: {},
      value: 'on'
    };
    this.updateFilters = this.updateFilters.bind(this);
  }
  buildMarker(item) {
    return <Marker 
      key={item.geometry.coordinates[1]}
      position={{
        lat: Number(item.geometry.coordinates[1]),
        lng: Number(item.geometry.coordinates[0])
      }}
    />
  }
  updateFilters(newFilterState) {
    console.log(newFilterState);
  }
  render() {
    var nodes = this.state.fullNodes;
    return (
      <Row>
        <Col style={{ background: '#2c3e50', color: '#FFF' }} s={3} >
          <FilterGroup controls={['fade', 'lineup']} onChange={this.updateFilters}/>
        </Col>
        <Col s={7} >
          <MapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          >
            {nodes.map(this.buildMarker)}
          </MapComponent>
        </Col>
      </Row>
    )
  }
}

export default MapWithFilterControls;