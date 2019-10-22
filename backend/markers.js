import { update, remove, find, Q } from '@reshuffle/db';
import nanoid from 'nanoid';
/**
 * Expose a database interface for CRUD operations on map markers.
 * 
 * Functions annotated with @expose are available for use in React components.
 * 
 * A Map Marker (Marker) in this context comprises of:
 * uid: number - Used as a unique key in the database.
 * lat: number - Latitude on the map where the marker is positioned.
 * lng: number - Longitude on the map where the marker is positioned. 
 */

/**
 * Key used to store the map markers details in the database.
 */
const keyRoot = 'marker';
const prefix = (k) => `${keyRoot}:${k}`;

/** 
 * Retrieve all markers from database. 
*/
/* @expose */
export async function getMarkers() {
  return await find(Q.filter(Q.key.startsWith(keyRoot)));
}

/** 
 * Save a new marker or update an existing one.
 * 
 * The function receives a marker object to persist,
 * containing a uid, and lat/lng attributes as described below.
 */
/* @expose */
export async function saveMarker({ lat, lng, uid }) {
  try {
    // Validate the uid for an existing marker, or create a new one
    const validUid = validateOrCreateUID(uid);

    // Update the markers in the db, adding the new one to the list
    return await update(prefix(validUid), (marker) => ({
      uid: validUid,
      lat,
      lng,
    }));
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Delete a single marker from the database.
 */
/* @expose */
export async function removeSingleMarker(uid) {
  return await remove(prefix(uid));
}

/** 
 * Validates that a uid exists. 
 * Creates a new one if the `undefined` was received.
*/
function validateOrCreateUID(uid) {
  return uid || nanoid();
}
