import React, { Component } from 'react';
import MapComponent from './MapComponent';
import { Navbar, NavItem, Row, Col, Container, Input, Icon, Card } from 'react-materialize'
import { Marker } from "react-google-maps"

import jsonData from './geoJSON';
import './App.css';

class App extends Component {
  calculateHeight(){
    var windowsHeight = window.innerHeight;
    return windowsHeight;
  }

  render() {
    console.log(jsonData);
    return (
      <div className="App">

        <Row style={{ height: `100%` }}>
          <Col s={3}  style={{ height:this.calculateHeight()  , overflow: `scroll` }}>

            <Card>
            <Row>
                LOGO
              </Row>

              <Row>
                <Input label="Keyword search"></Input>
              </Row>
              <Row>
                <Input label="Postal Code/Address" />
              </Row>
              <Row>
                Acticity type
                </Row>
              <Row>
                <Input type='checkbox' label='1' />
                <Input type='checkbox' label='2' />
                <Input type='checkbox' label='3' />
                <Input type='checkbox' label='4' />
              </Row>
              <Row>
                Age group
                </Row>
              <Row>
                <Input type='checkbox' label='1' />
                <Input type='checkbox' label='2' />
                <Input type='checkbox' label='3' />
                <Input type='checkbox' label='4' />
              </Row>

              <Row>
                Time Range
                </Row>
              <Row>
                <Input type='checkbox' label='1' />
                <Input type='checkbox' label='2' />
                <Input type='checkbox' label='3' />
                <Input type='checkbox' label='4' />
              </Row>

              <Row>
                Language
                </Row>
              <Row>
                <Input type='checkbox' label='1' />
                <Input type='checkbox' label='2' />
                <Input type='checkbox' label='3' />
                <Input type='checkbox' label='4' />
              </Row>

            </Card>

          </Col>
          <Col s={9} style={{ height: `100%` }}>

            <MapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: this.calculateHeight() }} />}
              mapElement={<div style={{ height: `100%` }} />}
            >
              {jsonData.features.map((item) => <Marker position={{ lat: item.geometry.coordinates[1], lng: item.geometry.coordinates[0] }} />)}
            </MapComponent>
          </Col>
        </Row>

      </div>
    );
  }
}

export default App;
