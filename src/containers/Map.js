import React from 'react';

import {
    GoogleMap,
    withScriptjs,
    withGoogleMap
} from 'react-google-maps';
import { 
    compose, 
    withProps 
} from 'recompose';

// Create a Map using react-google-maps
// At this point: The map url below does not include a key, to prevent unauthorised use
const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%' }} />,
        mapElement: <div style={{ height: '100%' }} />

    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap 
        defaultZoom={10} 
        defaultCenter={props.center} 
   />
));

export default Map;