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
      filters: {}
    };
    props.filterGroups.forEach((item) => {
      this.state.filters[item.name] = {};
      item.filters.forEach((filter) => {
        this.state.filters[item.name][filter] = true;
      });
    });
    this.updateFilters = this.updateFilters.bind(this);
    this.buildFilterGroup = this.buildFilterGroup.bind(this);
    this.buildMarker = this.buildMarker.bind(this);
    this.getDisplayedNodes = this.getDisplayedNodes.bind(this);
    this.passesFilterGroup = this.passesFilterGroup.bind(this);
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
      onFiltersUpdated={this.updateFilters}
    />
  }
  updateFilters(event) {
    var newFilterState = Object.assign({}, this.state.filters);
    newFilterState[event.filterGroup][event.toggled] = !this.state.filters[event.filterGroup][event.toggled]

    this.setState({
      filters: newFilterState
    }, () => console.log(this.state.filters));
  }
  setContent(newContent) {
    this.setState({
      content: {__html: newContent}
    })
  }
  getContent() {
    return <div dangerouslySetInnerHTML={this.state.content}/>
  }
  passesFilterGroup(node, filterGroup) {
    const filterGroupToCheck = this.state.filters[filterGroup];
    const keysToCheck = 
    Object.keys(filterGroupToCheck)
      .filter(key => filterGroupToCheck[key]);
    return node.properties[filterGroup].some(item => keysToCheck.indexOf(item) >= 0);
  }
  getDisplayedNodes() {
    var allNodes = this.props.nodes;
    var filterGroups = Object.keys(this.state.filters);
    
    var displayedNodes = allNodes.filter((node) => filterGroups.every(this.passesFilterGroup.bind(this, node)));

    return displayedNodes.map(this.buildMarker);
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
            {this.getDisplayedNodes()}
          </MapComponent>
        </Col>
        {this.getContent()}
      </Row>
    )
  }
}

export default MapWithFilterControls;