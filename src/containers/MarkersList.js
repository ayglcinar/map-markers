import React from 'react';
import MapMarker from '../components/MapMarker';

export default function MarkersList(props) {

  const markersOnMap = Object.entries(props.markers).map(([key, marker]) =>
    <MapMarker
      key={key}
      uid={marker.value.uid}
      position={{
        lat: marker.value.lat,
        lng: marker.value.lng,
      }}
      selected={marker.value.uid === props.selectedMarkerUid}
      setSelectedMarkerUid={props.setSelectedMarkerUid}
      deleteMarker={props.deleteMarker}
    />
  );

  return (
    <React.Fragment>
      {markersOnMap}
    </React.Fragment>
  );
}
