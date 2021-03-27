import React from 'react';
import moment from 'moment'
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import Bar from "./Bar";

const to = new Date();
const from = moment().subtract(29, 'days').calendar();
var GoogledataLocal = {};
const Answers = {
    items: []
};

function Foreground() {   
    
    function ifObjectIsEmpty(object){
        var isEmpty=true;
        if(JSON.stringify(object)==JSON.stringify({items:[]})){
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
                        console.log('Checking Google Data', data)
                            if(GoogledataLocal !== data ){
                                let GoogledataLocal = data;
                                // let Answers = chrome.storage.sync.get(['SavedAddresses'], 
                                chrome.storage.sync.get(['id'], 
                                function ifObjectIsEmpty(Answers) {
                                    console.log('Checking Survey Data', id)
                                    const id = id.object
                                    Answers.items.push({
                                        items: id,
                                        day:  id.day,
                                        month: id.month,
                                        address: id.address,
                                      })
                                      console.log('Display answers', Answers)
                                    return Answers;
                                  });

                                  
                                if(ifObjectIsEmpty(id)==true){
                                    alert('You didnt do the survey!')
                                    alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 30 days')

                                } else {
                                    alert('Got your data!')
                                    alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 30 days')
                                    alert('You had ' + JSON.stringify(items.length) + ' Answers')
                                    alert(JSON.stringify('You got ' + (JSON.stringify(GoogledataLocal.items.length)-JSON.stringify(items.length)) + ' wrong'))
                                    return <p style={{ marginTop: 5 }}>{JSON.stringify(GoogledataLocal.items.address)}</p>;
                                }
                                
                            } else {
                                alert('Already got your data!')
                            }
                        })
                    .catch(error => {
                        alert(`Error fetching Timeline/Answer data: ${error}`)
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
        flexDirection: 'row',
        alignHorizontal: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    }
}

export default Foreground;