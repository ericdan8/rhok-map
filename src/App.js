import React, { Component } from 'react';
import logo from './logo.svg';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import './App.css';

let 
MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45, lng: -75}}
  >
    {props.isMarkerShown && <Marker position={{ lat: 45, lng: -75 }} />}
  </GoogleMap>
));


class App extends Component {
  // LeafletMap() {
  //   const position = [43, -75];
  //   return (
  //     <Map center={position} zoom={13}>
  //       <TileLayer
  //         url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //       />
  //       <Marker position={position}>
  //         <Popup>
  //           <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
  //         </Popup>
  //       </Marker>
  //     </Map>
  //   );
  // }
  render() {
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
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        </div>
      </div>
    );
  }
}

export default App;
