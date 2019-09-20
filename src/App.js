import React, {
  useState,
  useEffect
} from 'react';
import Map from './containers/Map';
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';

import '@reshuffle/code-transform/macro';
import {
  getMarkers,
  saveMarker
} from '../backend/markers';

import './styles/App.css';


// Use these co-ordinates to center the map on San Francisco
const homeLatLng = {
  coords: {
    latitude: 37.774929,
    longitude: -122.419416,
  }
}

export default function App() {

  // State: Maps center. This can be set, or loaded from the users' Navigator.
  // TODO: (duckranger) Perhaps calculate optimal center based on current Markers
  // TODO: (duckranger) When multi-users, perhaps change the center when a new marker is added by another user
  const [center, setCenter] = useState({});

  // State: These are the markers stored in our db
  const [markers, setMarkers] = useState(undefined);

  // Load the initial data required
  useEffect(() => {

    // Sets the center of the map based on a position object
    function initMapPosition(position) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    // Center the map at the user's location. Default to SF if location 
    // is unavailable
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(

        // Success callback, when the Navigator reports the user location
        initMapPosition,
        // Failure callback, will set the map center to 'home'
        () => initMapPosition(homeLatLng)
      );
    } else {
      initMapPosition(homeLatLng);
    }

    // Retrieves the markers stored in the database
    async function getMarkersFromDB() {
      try {
        const data = await getMarkers();
        setMarkers(data);
      } catch (error) {
        console.log(error);
      }
    }

    // Upon page-load, the useEffect will load the markers
    getMarkersFromDB();
  }, []);

  // DB call: Place a new marker when the user clicks the map.
  // @param { latLng } the latLng property of the click event from the map
  async function placeMarker({ latLng }) {
    try {
      const result = await saveMarker({
        lat: latLng.lat(),
        lng: latLng.lng(),
        uid: 0,
      });
      if (result.error) {
        throw new Error(result.error);
      }
      setMarkers(result.markers);
    } catch (error) {
      console.log(error);
    }
  }

  // Render the UI
  return (
    <React.Fragment>
      <Header text='Reshuffle Map Markers' />
      <div className='reshuffle-map-container'>
        {
          // Render map if location retrieved. Otherwise - display the loading message
          center.lat ?
            <Map
              center={center}
              markers={markers}
              onClick={placeMarker}
            />
            :
            <LoadingIndicator />
        }
      </div>
    </React.Fragment>
  );
}
