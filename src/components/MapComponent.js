import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

var MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap {...props}
  >
    {props.children}
  </GoogleMap>
));

export default MapComponent;