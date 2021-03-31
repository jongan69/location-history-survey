import React from 'react';
import moment from 'moment';
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import Table from './Table';


const to = new Date();
const from = moment().subtract(13, 'days').calendar();
<<<<<<< HEAD
var GoogledataLocal = {}
var Answers = {}
=======
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
    if(tbodyData!=undefined){
        console.log('Dank ', GoogledataLocal.items);
        return   <div > <Table theadData={items} tbodyData={tbodyData} /> </div>
    }   
}
>>>>>>> dev2



function Foreground() {  
    
    
    return (
        <div style={styles.main}>
           View your results here:
<<<<<<< HEAD
            {!Answers || !GoogledataLocal 
            ? 
            <div> Display Data Here... </div>
            : 
            <div> 
            <p style={{ marginTop: 5 }}>{JSON.stringify(GoogledataLocal.items)} </p>
            </div> 
            }
=======
>>>>>>> dev2
            
            <div style={styles.buttons}>
            <button 
                style={{ marginTop: 5 }} 
                onClick={ () => {
                    fetchGoogleTimelineData(from, to)
                    .then(data => {
                        console.log('Checking Google Timeline Data', data)
<<<<<<< HEAD
                            if(GoogledataLocal !== data ){
                                let GoogledataLocal = data;

                                let answersUnparsed = localStorage.getItem('savedAddress')
                                let Answers = JSON.parse(answersUnparsed)
                                console.log('Checking Survey', Answers);


                                var url = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
                                
                                chrome.downloads.download({
                                    url: url,
                                    filename: 'Your_Google_Data.json'
                                });

                                if(Answers==0){
                                    alert('You didnt do the survey!')
                                    alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 30 days')

                                } else {
                                    alert('Got your data!')
                                    alert('Youve been to ' + JSON.stringify(GoogledataLocal.items.length) + ' locations in the past 14 days')
                                    alert('You had ' + JSON.stringify(Answers.length) + ' Answers')
                                    alert(JSON.stringify('You got ' + (JSON.stringify(GoogledataLocal.items.length)-JSON.stringify(Answers.length)) + ' wrong'))
                                }
                                
                            } else {
                                alert('Already got your data!')
=======
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
>>>>>>> dev2
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