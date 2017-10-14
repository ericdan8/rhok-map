import React, { Component } from 'react';
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './App.css';

class App extends Component {
  LeafletMap() {
    const position = [51.505, -0.09];
    const style = {
      width: 500,
      height: 500
    }
    return (
      <Map style={style} center={position} zoom={13}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {this.LeafletMap()}
        </div>
      </div>
    );
  }
}

export default App;
