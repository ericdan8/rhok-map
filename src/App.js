import React, { Component } from 'react';
import logo from './logo.svg';
import MapComponent from './components/MapComponent';
import MapWithFilterControls from './components/MapWithFilterControls';
import { Navbar, NavItem, Row, Col, Container, Input, Icon } from 'react-materialize'
import { Marker } from "react-google-maps"

import jsonData from './geoJSON';
import './App.css';

class App extends Component {
  buildMarker(item) {
    return <Marker 
      key={item.geometry.coordinates[1]}
      position={{
        lat: Number(item.geometry.coordinates[1]),
        lng: Number(item.geometry.coordinates[0])
      }}
    />
  }
  render() {
    console.log(jsonData);
    const style = {
      width: 500,
      height: 500
    }
    return (
      <div className="App">
        <Navbar right>
          <NavItem>Getting started</NavItem>
          <NavItem>Components</NavItem>
        </Navbar>
        <MapWithFilterControls 
          defaultZoom={12}
          defaultCenter={{ lat: 45.402687, lng: -75.710524}}
          filterGroups={[
            {name: 'services', filters: ['fade', 'lineup']},
            {name: 'ageGroups', filters: ['5-9', '10-14', '15-17']}
          ]}
          nodes={jsonData.features}
        />
      </div>
    );
  }
}

export default App;
