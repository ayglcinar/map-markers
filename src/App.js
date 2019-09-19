import React from 'react';
import Map from './containers/Map'
import './styles/App.css';


// Use these co-ordinates to centre the map
const sanFranciscoCoordinates = {
      lat: 37.774929,
      lng: -122.419416
}

export default function App() {

  // Render the UI
  return (
    <React.Fragment>
      <div className="reshuffle-map-container">
        <Map 
          center={sanFranciscoCoordinates}
        />
      </div>
    </React.Fragment>
  );
}