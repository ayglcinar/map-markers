import React from 'react'
import {
  Marker,
  InfoWindow
} from 'react-google-maps'

export default function MapMarker(props) {
  return (
    <Marker
      key={props.uid}
      position={props.position}
      onClick={() => props.setSelectedMarkerUid(props.uid)}
    >
      {
        props.selected &&
        <InfoWindow>
          <div>
            <button>
              Delete
            </button>
          </div>
        </InfoWindow>
      }
    </Marker>
  )
}