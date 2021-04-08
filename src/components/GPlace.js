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

  const GoogledataLocal = [];
  const to = new Date();
  const from = moment().subtract(13, 'days').calendar();
  var count = !saveAddress.id ? 0 : savedAddress.id; 

// UseEffect runs periodically over component lifecycle
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


// This function is responsible for adding the user input to local storage
  function SaveDataToLocalStorage() {
    let dayset = startDate.getDate();
    let monthset = startDate.toLocaleString('default', { month: 'long' });
    alert('Adding Address: '  + dayset + ' of ' + monthset)
    console.log('Adding Address: ' + dayset + ' of ' + monthset);
    try{
      if(place!=null){
        setAddress([
          ...saveAddress,
            {
                date: JSON.stringify(startDate),
                address: place.address,
              }
          ]);
  
        if(saveAddress.items.length<0){
          alert('savedAddress was null, setting savedAdress to local storage')
          localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
          savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
          return savedAddress;
        }
  
        savedAddress.push(saveAddress.items);
        localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
        savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
        return savedAddress;
      } 
  
      console.log('Local Storage is : ', savedAddress);
      return savedAddress;
    }
    catch {
      if(place==null) {
        console.log('savedAddress was null so we alert: ', savedAddress); 
        alert('You have to enter an address first')
        console.log('Sate of saveAddress: ', saveAddress);
        console.log('Local Storage: ', savedAddress); 
      }
    }
    return savedAddress;
  }

//  Unsure if will delete this yet
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







// Checks for required data, if data present, begin sorting algorithm
function viewResults(obj1,obj2) {
  try{
    if(obj1||obj2===null||undefined) {
      alert('No data to display found!');
    } 
  
    else {
      console.log(JSON.stringify(obj1));
      console.log(JSON.stringify(obj2));
      setClick(true);
    }
  }
  catch{
    alert('There was an error')
  }
}












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
      <div>No savedAddress</div> 
      :
      <div style={{ justifyContent: 'center' }}>
      <ul>
      {saveAddress.map(item => (
      <li key={item.id}> You went to {item.address} on {item.date} </li>
        ))}
      </ul> 
      </div>
      }
      <button style={{ padding: "10px" }} onClick={viewResults(GoogledataLocal,saveAddress)}> 
        View Results!
       </button>

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