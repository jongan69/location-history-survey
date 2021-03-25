import React from 'react';
import axios from 'axios'
import fetchGoogleTimelineData from './../fetch-google-timeline-data'


function Foreground() {

    chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
        fetchGoogleTimelineData(request.from, request.to)
          .then(data => {
            console.log('Received data', data)
            sendResponse(data)
          })
          .catch(error => {
            alert(`Failed to fetch timeline data: ${error}`)
          })
        // return true to indicate we wish to send a response asynchronously
        return true
      })

    return (
        <div style={styles.main}>
            <button style={{ marginTop: 5 }} onClick={fetchGoogleTimelineData(request.from, request.to)}> 
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