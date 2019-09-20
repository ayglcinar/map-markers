import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap
} from 'react-google-maps';
import {
  compose,
  withProps
} from 'recompose';

import MarkersList from './MarkersList';

// Create a Map using react-google-maps
// At this point: The map url below does not include a key, to prevent unauthorised use
const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <LoadingIndicator />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />

  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap {...props}>
    {
      props.markers ?
        <MarkersList markers={props.markers} />
        :
        null
    }

  </GoogleMap>
));

export default Map;
