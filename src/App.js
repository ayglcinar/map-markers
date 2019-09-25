import React, {
  useState,
  useEffect
} from 'react';
import '@reshuffle/code-transform/macro';

import Map from './containers/Map';
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';

import {
  getMarkers,
  saveMarker,
  removeSingleMarker
} from '../backend/markers';

import './styles/App.css';


// Use these co-ordinates to center the map on San Francisco
const homeLatLng = {
  coords: {
    latitude: 37.774929,
    longitude: -122.419416,
  }
}

// The iniital zoom setting for the map.
const defaultZoom = 14;

export default function App() {

  // State: Maps center. This can be set, or loaded from the users' Navigator.
  // TODO: (duckranger) Perhaps calculate optimal center based on current Markers
  // TODO: (duckranger) When multi-users, perhaps change the center when a new marker is added by another user
  const [center, setCenter] = useState({});

  // State: These are the markers stored in our db
  const [markers, setMarkers] = useState(undefined);

  // State: the selected marker.
  // This is used to denote which of the markers displayed is the active one, 
  // for purposes of actions (e.g. delete)
  const [selectedMarkerUid, setSelectedMarkerUid] = useState(null);

  // Retrieves the markers stored in the database
  async function getMarkersFromDB() {
    try {
      const data = await getMarkers();
      setMarkers(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Sets the center of the map based on a position object
  function initMapPosition(position) {
    const { coords } = position;
    setCenter({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  }

  // Determine the map's default center.
  useEffect(() => {

    // Try centering the map at the user's location.
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

  }, []);

  // Load the markers from the database.
  useEffect(() => {
    getMarkersFromDB();
  }, []);

  /**
   * Delete a marker from the db
   * @param {string} uid of the marker to delete
   */
  async function deleteMarker(uid) {
    try {
      const result = await removeSingleMarker(uid);
      if (result.error) {
        throw new Error(result.error);
      }
      setMarkers(result.markers);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Place a new marker when the user clicks the map.
   * @param { number } latLng - location coordinates received from the click event
  */
  async function placeMarker({ latLng }) {
    try {
      const result = await saveMarker({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
      if (result.error) {
        throw new Error(result.error);
      }
      setMarkers(result.markers);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Render the UI
   */
  return (
    <React.Fragment>
      <Header text='Reshuffle Map Markers' />
      <div className='reshuffle-map-container'>
        {
          // Render map if location retrieved. Otherwise - display the loading message
          center.lat ?
            <Map
              defaultCenter={center}
              markers={markers}
              defaultZoom={defaultZoom}
              selectedMarkerUid={selectedMarkerUid}
              setSelectedMarkerUid={setSelectedMarkerUid}
              onClick={placeMarker}
              deleteMarker={deleteMarker}
            />
            :
            <LoadingIndicator />
        }
      </div>
    </React.Fragment>
  );
}
