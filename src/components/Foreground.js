import React from 'react';
import moment from 'moment'
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import Bar from "./Bar";

const to = new Date();
const from = moment().subtract(29, 'days').calendar();
var GoogledataLocal = {}


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
            Switch out the cases when not testing
            {!(ifObjectIsEmpty(GoogledataLocal))  ? <div> Display Data Here... </div> : <div> <Bar /> </div>  }
            <div style={styles.buttons}>
            <button 
                style={{ marginTop: 5 }} 
                onClick={ () =>
                {
                    fetchGoogleTimelineData(from, to)
                    .then(data => {
                        console.log('Checking Data', data)
                            if(GoogledataLocal !== data ){
                                let GoogledataLocal = data

                                console.log('Checking Survey', Answers)
                                let Answers = chrome.storage.sync.get(['SavedAddresses'], function(items) {
                                   console.log('Answers retrieved', items);
                                  });

                                if(Answers==0){
                                    alert('You didnt do the survey!')
                                    alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 30 days')

                                } else {
                                    alert('Got your data!')
                                    alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 30 days')
                                    alert('You had ' + JSON.stringify(Answers.length) + ' Answers')
                                    alert(JSON.stringify('You got ' + (JSON.stringify(GoogledataLocal.items.length)-JSON.stringify(Answers.length)) + ' wrong'))
                                    return <p style={{ marginTop: 5 }}>{JSON.stringify(GoogledataLocal.items.address)}</p>;
                                }
                                
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
            </div>
        </div>
    )
}

const styles = {
    main: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }
}

export default Foreground;