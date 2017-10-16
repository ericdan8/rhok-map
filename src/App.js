import React, { Component } from 'react';

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

    return (
      <div className="App">
        <Row style={{ height: `100%`, }}>

          
            <MapWithFilterControls
              defaultZoom={12}
              defaultCenter={{ lat: 45.402687, lng: -75.710524 }}
              filterGroups={[
                { name: 'services',label:'Activities', filters: ['Arts', 'Education', 'Sports'] },
                { name: 'ageGroups',label:'Age', filters: ['5-9', '10-14', '15-17'] },
                { name: 'timeRange',label:'Time Range', filters: ['Morning', 'Afternoon', 'Evening'] },
                { name: 'language',label:'Language', filters: ['English', 'French'] }
              ]}
              nodes={jsonData.features}
            />

        </Row>
      </div>
    );
  }
}

export default App;
