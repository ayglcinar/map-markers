import React from 'react';
import '../styles/ApiKeyNav.css';
import Alert from 'react-bootstrap/Alert';

const ApiKeyNav = props => {
  return (
    <Alert variant='warning' className='justify-content-center d-flex'>
      This template requires a developer key from a 3rd party service, press
      Remix and download the code, then read the
      <Alert.Link
        className='pr-1 pl-1 nav-warning'
        href='https://github.com/reshufflehq/map-markers'
        target='_blank'
      >
        README file
      </Alert.Link>
      for more instructions.
    </Alert>
  );
};

export default ApiKeyNav;
