import React from 'react';
// import fetchGoogleTimelineData from './../fetch-google-timeline-data'
// var request = require('request');

function Foreground() {
 
    return (
        <div style={styles.main}>
            <button style={{ marginTop: 5 }} onClick={() => {alert("This feature is in development!")}}> 
          Submit Results 
          </button>
        </div>
    )
}

const styles = {
    main: {
        backgroundColor: 'red',
    }
}

export default Foreground;