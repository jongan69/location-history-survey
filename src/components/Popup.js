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
 
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);
 
  return (
    <div className="App">
      Location History Survey<br /><br />
      {!loadMap ? <div>Loading...</div> : <GPlace />}
    </div>
  );
}
 
export default Popup;