import React from 'react';
import moment from 'moment'
import fetchGoogleTimelineData from '../fetch-google-timeline-data';

const to = new Date();
const from = moment().subtract(29, 'days').calendar();
var dataLocal = {}

function Foreground() {   
    
    function ifObjectIsEmpty(object){
        var isEmpty=true;
        if(JSON.stringify(object)==JSON.stringify({})){
          // Object is Empty
          isEmpty = true;
        }
        else{
          //Object is Not Empty
          isEmpty = false;
        }
        return isEmpty;
     }           

    return (
        <div style={styles.main}>
            <button 
                style={{ marginTop: 5 }} 
                onClick={ () =>
                {
                    fetchGoogleTimelineData(from, to)
                    .then(data => {
                        console.log('Checking Data', data)
                            if(dataLocal !== data ){
                                let dataLocal = data
                                alert('Got your data!')
                                alert('Youve been to ' + JSON.stringify(dataLocal.items.length) + ' locations in the past 30 days')
                                return <p style={{ marginTop: 5 }}>{JSON.stringify(dataLocal.items.address)}</p>;
                            } else {
                                alert('Already got your data!')
                            }
                        })
                    .catch(error => {
                        alert(`Failed to fetch timeline data: ${error}`)
                    })
                }
            }> 
                Get Location Data
            </button>

            <button style={{ marginTop: 5 }} onClick={() => {alert("This feature is in development!")}}> 
                Submit Results 
            </button>
            {/* {!(ifObjectIsEmpty(dataLocal))  ? <div>{JSON.stringify(dataLocal.items.address)}</div> : <div>Loading your data...</div>  } */}
        </div>
    )
}

const styles = {
    main: {
        justifyContent: 'cneter',
        alignItems: 'center',
        backgroundColor: 'red',
    }
}

export default Foreground;