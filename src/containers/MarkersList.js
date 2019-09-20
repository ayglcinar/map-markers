import React from 'react';
import { Marker } from 'react-google-maps';

export default function MarkersList({ markers }) {
    const markersOnMap = Object.keys(markers).map(key =>
        <Marker
            key={key}
            position={{
                lat: markers[key].lat,
                lng: markers[key].lng,
            }}
        />
    );

    return (
        <React.Fragment>
            {markersOnMap}
        </React.Fragment>
    );
}
