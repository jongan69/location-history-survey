import React from 'react';
import moment from 'moment';
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import Table from './Table';


const to = new Date();
const from = moment().subtract(13, 'days').calendar();
var GoogledataLocal = []
let unparsedAns = localStorage.getItem('savedAddress')
var Answers = unparsedAns ? JSON.parse(unparsedAns ): [];

let items = [ "address", "endTime"];
let tbodyData = []
// function BuildTable (){
//     return  
// }
function ifData(){
    console.log('ifData hit ', tbodyData);
    console.log('test ', Answers);
    if(tbodyData!=undefined){
        console.log('Dank ', GoogledataLocal.items);
        return   <div > <Table theadData={items} tbodyData={tbodyData} /> </div>
    }   
}



function Foreground() {  
    
    
    return (
        <div style={styles.main}>
           View your results here:
            
            <div style={styles.buttons}>
            <button 
                style={{ marginTop: 5 }} 
                onClick={ () => {
                    fetchGoogleTimelineData(from, to)
                    .then(data => {
                        console.log('Checking Google Timeline Data', data)
                        let GoogledataLocal = data;
                        let tbodyData = GoogledataLocal.items
                        console.log('Checking Table', tbodyData, items);
                            
                        if(GoogledataLocal !== data ){
                                console.log('Checking Survey', Answers);
                                chrome.storage.sync.get('savedAddress', function(items) {
                                    console.log('Answers retrieved', items);
                                   });
                                console.log('Checking Table', GoogledataLocal, tbodyData);
                                return tbodyData;                                
                        } 
                        else {
                                alert('Got your data!')
                                console.log('Checking Table again', GoogledataLocal,tbodyData);
                                return tbodyData; 
                            }
                        })
                    .catch(error => {
                        alert(`Failed to fetch data: ${error}`)
                    })
                }
            }> 
                Load Data and  Build Table
            </button>
            </div>

            {!tbodyData ? <div>Waiting..</div> : ifData() }
        </div>
    )
}

const styles = {
    main: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row',
        padding: '10px',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    table: {
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default Foreground;