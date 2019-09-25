import React from 'react';
import MapMarker from '../components/MapMarker';

export default function MarkersList(props) {
  const markersOnMap = Object.entries(props.markers).map(([key, marker]) =>
    <MapMarker
      key={key}
      uid={key}
      position={{
        lat: marker.lat,
        lng: marker.lng,
      }}
      selected={key === props.selectedMarkerUid}
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
