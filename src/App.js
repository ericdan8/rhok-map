import React, { Component } from 'react';
import logo from './logo.svg';
import MapComponent from './MapComponent';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={style} className='leafletContainer'>
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
          {jsonData.features.map((item) => <Marker position={{ lat: item.geometry.coordinates[1], lng: item.geometry.coordinates[0] }} />)}
        </MapComponent>
        </div>
      </div>
    );
  }
}

export default App;
