import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import moment from 'moment';
import BasicTable from './Table';

const GPlace = () => {

  const placeInputRef = useRef(null);
  let items = [ "address", "endTime", "Status"];
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  var $pull = localStorage.getItem('savedAddress');
  var savedAddress = typeof $pull!='null' ? $pull : [];
  const [click, setClick] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  let GoogledataLocal = [];
  let tbodyData = [];
  const to = new Date();
  const from = moment().subtract(13, 'days').calendar();
  var count = !saveAddress.id ? 0 : savedAddress.id; 

  

  useEffect(() => {
    console.log('useEffect is has run: ', count, ' times');  
    console.log('Pull is: ', $pull);
    console.log('savedAddress is: ', savedAddress);
   
    for(var key in savedAddress){
      var isEmpty = true
      if(savedAddress.hasOwnProperty(key)){
          console.log('savedAddress is not empty');
          let isEmpty = false;
          return isEmpty;
      } else {
          console.log('savedAddress is empty');
          return isEmpty;
      }
    }

    initPlaceAPI();  
    console.log('Current saveAddress is: ' , saveAddress );
    console.log('Current savedAddress is: ' , savedAddress );
  }, [saveAddress]);

   // Sleep
   const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

 
  // initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();
      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  };


// Calender Component
  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>
            (Day at location)
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };



  function SaveDataToLocalStorage() {
    let dayset = startDate.getDate();
    let monthset = startDate.toLocaleString('default', { month: 'long' });
    alert('Adding Address: '  + dayset + ' of ' + monthset)
    console.log('Adding Address: ' + dayset + ' of ' + monthset);
    try{
      if(place!=null){
        count++;
        alert('Place is: ', JSON.stringify(place))
        setAddress([
          ...saveAddress,
            {
            id: count,
            day: dayset,
            month: monthset,
            value: place.address,
            }
            ]);
  
        if(savedAddress.length<0){
          alert('savedAddress was null, setting savedAdress to local storage')
          localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
          savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
          return savedAddress, count;
        }
  
        savedAddress.push(saveAddress);
        localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
        savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
        return savedAddress, count;
      } 
  
      console.log('Local Storage is: ', savedAddress);
      return savedAddress, count;
    }
    
    catch {
      if(place==null) {
        console.log('savedAddress was null so we alert: ', savedAddress); 
        alert('You have to enter an address first')
        console.log('Sate of saveAddress: ', saveAddress);
        console.log('Local Storage: ', savedAddress); 
      }
    }
    return savedAddress, count;
  }


  const TableBuilder = () => {
    // First Grab Google Data
    fetchGoogleTimelineData(from, to)
    .then(data => {
        console.log('Checking Google Timeline Data', data)
        let GoogledataLocal = data;
        // localStorage.setItem(GoogledataLocal);
        let tbodyData = GoogledataLocal.items;

        let Answers = localStorage.getItem('savedAddress')
        console.log('Answers retrieved', savedAddress);

        console.log('Checking Table', tbodyData);
        console.log('Checking Survey', Answers);
       
        if(GoogledataLocal == data && savedAddress != null){
          console.log('Checking Table again', GoogledataLocal, savedAddress);
          alert('Current Table info: ', GoogledataLocal, savedAddress);
          return GoogledataLocal, tbodyData, savedAddress;                            
        } 
        else {
          alert('Make sure youve  logged into timeline and have answered at least one address!')
          console.log('no google data ', GoogledataLocal, tbodyData); 
            }

        if(!GoogledataLocal){
          console.log('Google data local doesnt exist')
          }
            
          if(!saveAddress){
            console.log('Saved Address doesnt exist')
          }
            
          if(GoogledataLocal&&saveAddress){
              alert('Got both pieces of data: ', GoogledataLocal, savedAddress)
          }
          return GoogledataLocal, savedAddress, tbodyData;  
        }
        )
    .catch(error => {
        alert(`Failed to fetch data: ${error}`)
    })
}

function viewResults() {
  if(!GoogledataLocal||!saveAddress) {
    alert('No Results found!');
  } else {
    setClick(true);
  }
}



  // Compare Data
//   let compare = (arr1,arr2) => {
//     //If not array then return false
//     if(!arr1  || !arr2) return false;
     
//     if(arr1.length !== arr2.length) return false;
   
//     let result;
   
//      arr1.forEach(e1 => arr2.forEach( e2 => {  
//             if(e1.length > 1 && e2.length){
//                //If nested array then recursively compare it
//                result = compare(e1,  e2);
//             }else if(e1 !== e2 ){
//                result = false
//             }else{
//                result = true
//             }
//        })
//      );
   
//     return result 
//  }

// Function for setting current state of address and then pushing that array to the savedAddress Object

  

  return (
    <>

      <div style={styles.main} >
      <p style={styles.text}> What day ... </p>

      <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      calendarContainer={MyContainer}
      />
      </div>

      <div style={styles.text}>
      <p> were you at ... </p>
      <input style={{ width: '80%' }} type="text" ref={placeInputRef} placeholder="were  you at..." />
      </div>

      <div style={styles.text}>
      <button onClick={SaveDataToLocalStorage} style={{ marginTop: 10 }}> Add Location </button>
      {/* <button onClick={ localStorage.clear() } style={{ marginTop: 10 }}> Clear All Addreeses </button> */}
      </div>


      
      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div><b>Last Selected Place</b> {place.address} </div>
      <b style={{ marginTop: 10, lineHeight: '25px' }}> Past Locations: </b>
      </div>
      }

      {saveAddress==null
      ? 
      <div>No saveAddress</div> 
      :
      <div>
      <ul>
      {saveAddress.map(item => (
      <li key={item.id}>You went to {item.value} on {item.day} of {item.month}</li>
        ))}
      </ul> 
      <button style={{ padding: "10px" }} onClick={viewResults}> 
        View Results!
       </button>
      </div>
      }

      {!click
      ? 
      <div style={styles.table}> Results will display here </div> 
      : 
      <div  style={styles.table}>  <BasicTable/> </div>
      }

    </>
  );
};

const styles = {
  main: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  container: {

      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  table :{
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '100%'
  },
}
 
export default GPlace;