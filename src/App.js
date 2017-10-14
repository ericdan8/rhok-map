import React, { Component } from 'react';
import MapComponent from './MapComponent';
import { Navbar, NavItem, Row, Col, Container, Input, Icon, Card } from 'react-materialize'
import { Marker } from "react-google-maps"

import jsonData from './geoJSON';
import './App.css';

class App extends Component {
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

        <Row>
          <Col s={2} >

            <Card>
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
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
              </Row>
              <Row>
                Age group
                </Row>
              <Row>
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
              </Row>

              <Row>
                Time Range
                </Row>
              <Row>
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
              </Row>

              <Row>
                Language
                </Row>
              <Row>
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
                <Input type='checkbox' label='Red' />
              </Row>

            </Card>

          </Col>
          <Col s={7} >

            <MapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
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
