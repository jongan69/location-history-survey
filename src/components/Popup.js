// import HorizontalCarousel from './HorizontalCarousel.js';
import React, { useState, useEffect, setState } from 'react';
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import GPlace from './GPlace';
import image from  './plane.gif';
import moment from 'moment';
// import Table from './Table';

let GoogledataLocal = [];
let tbodyData = [];
const to = new Date();
const from = moment().subtract(13, 'days').calendar();
// var GoogledataLocal = []

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


const checkGoogleData = (checkData, setData) => {

    if(checkData==false){
      fetchGoogleTimelineData(from, to)
        .then(data => {
          console.log('Checking Google Timeline Data', data);
          let GoogledataLocal = data;
            if(GoogledataLocal == data ){
              alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 14 days');
              console.log('Checking Table again', GoogledataLocal);
              setData(true);
              return GoogledataLocal, checkData;                            
            } 
        })

        .catch(error => {
          alert(`Failed to fetch data: ${error}`, 'Make sure youve  logged into timeline!')
          console.log('no google data ', GoogledataLocal);
          return GoogledataLocal;     
        })
      }

      else {
        alert('There was a problem with your google time line data, checkdata was: ', checkData)
      }
}





 

const Popup = () => {

  const [checkData, setData] = useState(false);
  const [loadMap, setLoadMap] = useState(false);
  
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);


  

  return (
    <div style={styles.container}>
      <b style={{ padding: "10px" }}>Location History Survey</b><br /><br />
      <p style={styles.text}> Can  you remember your last 14 days?</p>
      <img src={image} style={styles.image} alt="loading..." />
      
      <button style={{ marginTop: 5 }} onClick={ () => {
        if(checkData==false){
          checkGoogleData(checkData, setData);
        }
        else {
          alert('There was a problem with your google time line data, checkdata was: ', checkData)
        }
      }
        }> 
          Check for Timeline Data
      </button>

     
     
      {(!loadMap||!checkData)
      ? 
      <div> 
        <p style={styles.text}> 
          First Check for Google Timeline data using the button above, if you have data take the quiz to see if you remember where you've been in the past 14 days!
        </p>
    </div> 
      : 
      <div style={{ alignItems: 'center', justifyContent: 'center' }}>
        {alert('checkData was true! You have Timeline data so you may take the survey to see what you remember' )}
        {console.log('check data is ', checkData, ' set data is ', setData)}
       <GPlace />
       <p>
        This is a React Chrome Extension being built by Blockspaces under grant by USF for proof of concept on contact tracing.
       </p>
      </div>
    }
     

 
    
    </div>
  );
}

const styles = {
  main: {

  },
  container: {
    flexDirection: 'column',
    display: 'flex',
    width: '350px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '75px',
    width: '150px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '5px'
},
text: {
  alignItems: 'center',
  padding: '5px',
}
}
 
export default Popup;