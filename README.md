[![CircleCI](https://circleci.com/gh/reshufflehq/map-markers.svg?style=svg)](https://circleci.com/gh/reshufflehq/map-markers)

Keywords: javascript, react, hooks, fullstack, google-maps, backend, map, promise, async, reshuffle

This is a [Reshuffle](https://reshuffle.com/) template.

Map-markers is a template to demonstrate working with map data in Reshuffle.
It displays a map on the screen and attempts to set the map's center to the user's browser location.
It also lets the user click the map to add markers. These markers are persisted.

## Configuring a Google API Key
This template does not include a Google API key. Without a key, Google's map display is  darkened, and the map is intended for development purposes only.

To get and include your own Google API key:
1. Obtain a key following [these instructions](https://developers.google.com/maps/documentation/embed/get-api-key) (Skip this step if you already have a key)
2. Create a .env file in the root directory of the template
3. Insert the following line inside the .env file, replacing ```<Your API KEY>``` with your API key:
   
```
REACT_APP_GOOGLE_API_KEY=<YOUR API KEY>
``` 

## Screenshots:

- A map displaying markers
  
<img src="./readme-images/map-with-markers.png" width="80%" height="80%">
