// import HorizontalCarousel from './HorizontalCarousel.js';
import React, { useState, useEffect } from 'react';
import GPlace from './GPlace';
 
// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyBFAMWOu-6ZKxWkZwC9Q7n0ekfJ8Szc85A';
 
// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}
 
const Popup = () => {
  const [loadMap, setLoadMap] = useState(false);
  const [pendingItem] = useState(false);
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);
 
  return (
    <div style={styles.container}>
      Location History Survey<br /><br />
      {!loadMap ? <div>Loading...</div> : <GPlace />}
    </div>
  );
}

const styles = {
  App: {
      height: '400px',
      width: '600px',
      boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '400px',
},
  image: {
      width: '100%',
      height: 'auto',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
  }
}
 
export default Popup;