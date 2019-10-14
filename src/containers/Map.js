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

const googleMapsKey = process.env.REACT_APP_GOOGLE_API_KEY || '';
/**
 * Create a Map using react-google-maps. 
 * At this point: The map url below does not include a key, to prevent unauthorized use
 */
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMapsKey}`,
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
        <MarkersList
          markers={props.markers}
          setSelectedMarkerUid={props.setSelectedMarkerUid}
          selectedMarkerUid={props.selectedMarkerUid}
          deleteMarker={props.deleteMarker}
        />
        :
        null
    }

  </GoogleMap>
));

export default Map;
