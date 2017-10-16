import React from 'react';
import MapComponent from './MapComponent';
import { Navbar, NavItem, Row, Col, Container, Input, Icon } from 'react-materialize'
import { Marker } from "react-google-maps"
import logo from '../logo.png';
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
      label={item.label}
      controls={item.filters}
      onFiltersUpdated={this.updateFilters}
    />
  }

  setContent(newContent) {
    this.setState({
      content: { __html: newContent }
    })
  }
  getContent() {
    return <div dangerouslySetInnerHTML={this.state.content} />
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

  calculateHeight() {
    var windowsHeight = window.innerHeight;
    return windowsHeight;
  }

  buildFilterGroup(item) {
    return <FilterGroup
      label={item.label}
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

  renderSidebar() {
    return (<div className='Sidebar'>


      <Row style={{ borderBottom: 'solid thick #f4e842', margin: 0 }}>
        <Container><img className='App-logo' src={logo} alt='logo' /></Container>
      </Row>
      <Row style={{ background: '#CCCCCC', margin: 0, 'text': 'center' }}>
        <Container><Row style={{margin: 0, 'padding-top':10, 'padding-bottom':10}}>Find a recreational activity near you</Row></Container>
      </Row>
      <Container>


        <Row style={{ margin: 0 }}>
          <Input label="Search by keyword"></Input>
        </Row>
        <Row style={{ margin: 0 }}>
          <Input label="Search by city, address" />
        </Row>
        {/* <Row>
          AGE
      </Row>
        <Row>
          <Input type='checkbox' label='0-5' />
          <Input type='checkbox' label='6-13' />
          <Input type='checkbox' label='14-18' />
        </Row>
        <Row>
          TIME RANGE
      </Row>
        <Row>
          <Input type='checkbox' label='Weekday' />
          <Input type='checkbox' label='Evening' />
          <Input type='checkbox' label='Weekend' />

        </Row>

        <Row>
          LANGUAGE
      </Row>
        <Row>
          <Input type='checkbox' label='English' />
          <Input type='checkbox' label='French' />

        </Row> */}
        {this.props.filterGroups.map(this.buildFilterGroup)}
      </Container>
    </div>
    );
  }

  render() {
    var filterGroups = this.props.filterGroups;
    var nodes = this.state.fullNodes;
    return (
      <Row>
        {/* {filterGroups.map(this.buildFilterGroup)} */}

        <Col s={3} style={{ height: this.calculateHeight(), overflow: `auto`, padding: 0 }}>
          {this.renderSidebar()}
        </Col>

        <Col s={9} style={{ height: this.calculateHeight(), padding: 0 }}>
          <MapComponent
            {...this.props}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCfbJdnshDlPY52dXVvwlYP_yMEOaFHKLM"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
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