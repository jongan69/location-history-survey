import React from 'react';
import moment from 'moment';
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import Table from './Table';


const to = new Date();
const from = moment().subtract(13, 'days').calendar();
var GoogledataLocal = []
let unparsedAns = localStorage.getItem('savedAddress')
var Answers = unparsedAns ? JSON.parse(unparsedAns ): [];
let items = [ "address", "endTime", "Status"];

let tbodyData = []
// function BuildTable (){
//     return  
// }
function ifData(){
    console.log('ifData hit ', tbodyData);
    console.log('test ', Answers);
    if(tbodyData!=undefined){
        console.log('Google Timeline Items ', tbodyData);
        return   <div > <Table theadData={items} tbodyData={tbodyData} /> </div>
    } 
}



function Foreground() {  
    
    
    return (
        <div style={styles.main}>
            <b  style={{ marginTop: '10px' }}> View your results here:</b>
          

           <div style={{ padding: '10px' }}>
           {tbodyData ? <div>You haven't answered...</div> : <div>Got your survey!</div> }
            {GoogledataLocal ? <div>Waiting  Google Timeline Data...</div> :  <div>Got your Timeline data!</div> }
            {(GoogledataLocal!=undefined) ? <div> Waiting for table data</div> : ifData()}
            </div>


            <div style={styles.buttons}>
            <button 
                style={{ marginTop: 5 }} 
                onClick={ () => {
                    fetchGoogleTimelineData(from, to)
                    .then(data => {
                        console.log('Checking Google Timeline Data', data)
                        let GoogledataLocal = data;
                        let tbodyData = GoogledataLocal.items;

                        // let Answers = chrome.storage.sync.get('savedAddress', function(items) {
                        //     console.log('Answers retrieved', items);
                        //    });
                        // chrome.storage.sync.get('savedAddress', function(items) {
                        //     console.log('Answers retrieved', items);
                        //    });

                           let Answers = localStorage.getItem('savedAddress')
                           console.log('Answers retrieved', savedAddress);

                        console.log('Checking Table', tbodyData, items);
                        console.log('Checking Survey', Answers);
                       
                        if(GoogledataLocal !== data ){
                            console.log('If no google data ', GoogledataLocal, tbodyData);
                            return tbodyData;                                
                        } 
                        else {
                                alert('Got your data!')
                                alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 14 days')
                                console.log('Checking Table again', GoogledataLocal, tbodyData);
                                return GoogledataLocal, tbodyData, Answers;
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
        </div>
    )
}

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
    },
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '10px',
        alignItems: 'center',
    },
    table: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default Foreground;