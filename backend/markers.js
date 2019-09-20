import { get, update } from '@reshuffle/db';

/**
 * Expose a database interface for CRUD operations on map markers.
 * 
 * Functions annotated with @expose are available for use in React components.
 * 
 */


/** Retrieve all markers from database */
/* @expose */
export async function getMarkers() {
  return (await get('markers')) || {};
}


/** Save a new marker or update an existing one */
/* @expose */
export async function saveMarker(marker) {
  const { lat, lng, uid } = marker;
  try {
    const validUid = await validateOrCreateUID(uid);
    const markers = await update('markers', (markers = {}) => {
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

/** Validate or creates new unique id 
*   A non-zero uid denotes an existing marker record.
*/
async function validateOrCreateUID(uid) {
  if (0 < uid) {
    return uid;
  }
  return await update('lastAllocatedUid', (v = 0) => v + 1);
}
