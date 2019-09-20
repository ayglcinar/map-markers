import { get, update } from '@reshuffle/db';

/**
 * Expose a database interface for CRUD operations on map markers.
 * 
 * Functions annotated with @expose are available for use in React components.
 * 
 */

const markersKey = 'markers';
/** 
 * Retrieve all markers from database. 
*/
/* @expose */
export async function getMarkers() {
  return (await get(markersKey)) || {};
}

/** 
 * Save a new marker or update an existing one.
 * 
 * The function receives a marker object to persist,
 * containing a uid, and lat/lng attributes.
 * 
 * @param {marker} - A marker object to persist.
 * 
 */
/* @expose */
export async function saveMarker(marker) {
  const { lat, lng, uid } = marker;
  try {
    // Validate the uid for an existing marker, or create a new one
    // if the marker is brand new (denoted by a 0 uid)
    const validUid = await validateOrCreateUID(uid);

    // Updatet the markers in the db, adding the new one to the list
    const markers = await update(markersKey, (markers = {}) => {
      const allMarkers = { ...markers };
      allMarkers[validUid] = {
        uid: validUid,
        lat,
        lng,
      };
      return allMarkers;
    });
    return { markers: markers };
  } catch (error) {
    return { error: error.message };
  }
}

/** 
 * Validates the uid, or creates a new one if the uid passed in is undefined.
 *
 * @param uid {number} - the uid to validate. Undefined if 
*/
async function validateOrCreateUID(uid) {
  if (uid) {
    return uid;
  }
  return await update('lastAllocatedUid', (v = 0) => v + 1);
}
