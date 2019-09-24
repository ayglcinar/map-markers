import React from 'react'
import {
  Marker,
  InfoWindow
} from 'react-google-maps'
import FancyButton from '../components/FancyButton';

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
          <FancyButton text='Delete' />
        </InfoWindow>
      }
    </Marker>
  )
}
