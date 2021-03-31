import React from 'react';
import moment from 'moment';
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
// import Table from './Table';


const to = new Date();
const from = moment().subtract(13, 'days').calendar();
var GoogledataLocal = {}
let unparsedAns = localStorage.getItem('savedAddress')
var Answers = unparsedAns ? JSON.parse(unparsedAns ): [];


function Foreground() {   
    
    // function ifObjectIsEmpty(object){
    //     var isEmpty=true;
    //     if(JSON.stringify(object)==JSON.stringify({})){
    //       // Object is Empty
    //       isEmpty = true;
    //     }
    //     else{
    //       //Object is Not Empty
    //       isEmpty = false;
    //     }
    //     return isEmpty;
    //  }           

    return (
        <div style={styles.main}>
           View your results here:
            {!GoogledataLocal 
            ? 
            <div> Display Data Here... </div>
            : 
            <div> 
            <p style={{ marginTop: 5 }}>{JSON.stringify(GoogledataLocal.items)}</p>
            </div> 
            }
            
            <div style={styles.buttons}>
            <button 
                style={{ marginTop: 5 }} 
                onClick={ () =>
                {
                    fetchGoogleTimelineData(from, to)
                    .then(data => {
                        console.log('Checking Google Timeline Data', data)
                        let GoogledataLocal = data;
                            if(GoogledataLocal !== data ){
                                console.log('Checking Survey', Answers);
                                chrome.storage.sync.get('savedAddress', function(items) {
                                    console.log('Answers retrieved', items);
                                   });
                                return GoogledataLocal;                                
                            } else {
                                alert('Already got your data!')
                            }
                        })
                    .catch(error => {
                        alert(`Failed to fetch data: ${error}`)
                    })
                }
            }> 
                Get Location Data
            </button>

            <button style={{ marginTop: 5 }} onClick={() => {alert("This feature is in development!")}}> 
                Submit Results 
            </button>
            </div>
        </div>
    )
}

const styles = {
    main: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
    },
    buttons: {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    }
}

export default Foreground;