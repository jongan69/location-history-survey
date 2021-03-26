// import HorizontalCarousel from './HorizontalCarousel.js';
import React, { useState, useEffect, setState } from 'react';
import GPlace from './GPlace';
import image from  './plane.gif';

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


  



// const {referrer} = this.state;
  return (
    <div style={styles.container}>
      Location History Survey<br /><br />

      <img src={image} style={styles.image} alt="loading..." />

      <p> Can  you remember your last 30 days?</p>
      <button onClick={ () => {chrome.tabs.create( { url: chrome.extension.getURL('/foreground.html') })} }> 
        View Results!
      </button>
      {!loadMap ? <div>Loading...</div> : <GPlace />}
     

 
    
    </div>
  );
}

const styles = {
  container: {
    width: '350px',
    height: '500px',
  },
  image: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75px',
    width: '150px',
    boxSizing: 'border-box',
    marginTop: '10px',
    marginBottom: '10px',
}
}
 
export default Popup;