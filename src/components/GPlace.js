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
function viewResults() {
  if(!GoogledataLocal||!saveAddress) {
    alert('No data to display found!');
  } else {
    setClick(true);
      /*!
      * Find the differences between two objects and push to a new object
      * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
      * @param  {Object} obj1 The original object
      * @param  {Object} obj2 The object to compare against it
      * @return {Object}      An object of differences between the two
      */
      var diff = function (obj1, obj2) {
    // Make sure an object to compare is provided
      if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
        return obj1;
      }
      //
      // Variables
      //
      var diffs = {};
      var key;
      //
      // Methods
      //
      /*
      *
      * Check if two arrays are equal
      * @param  {Array}   arr1 The first array
      * @param  {Array}   arr2 The second array
      * @return {Boolean}      If true, both arrays are equal
      */
      var arraysMatch = function (arr1, arr2) {
      // Check if the arrays are the same length
      if (arr1.length !== arr2.length) return false;

      // Check if all items exist and are in the same order
      for (var i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false;
      }

      // Otherwise, return true
      return true;

    };
      /*
      *
      * Compare two items and push non-matches to object
      * @param  {*}      item1 The first item
      * @param  {*}      item2 The second item
      * @param  {String} key   The key in our object
      */
      var compare = function (item1, item2, key) {

      // Get the object type
      var type1 = Object.prototype.toString.call(item1);
      var type2 = Object.prototype.toString.call(item2);

      // If type2 is undefined it has been removed
      if (type2 === '[object Undefined]') {
          diffs[key] = null;
          return;
      }

      // If items are different types
      if (type1 !== type2) {
          diffs[key] = item2;
          return;
      }

      // If an object, compare recursively
      if (type1 === '[object Object]') {
          var objDiff = diff(item1, item2);
          if (Object.keys(objDiff).length > 0) {
              diffs[key] = objDiff;
          }
          return;
      }

      // If an array, compare
      if (type1 === '[object Array]') {
          if (!arraysMatch(item1, item2)) {
              diffs[key] = item2;
          }
          return;
      }

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (type1 === '[object Function]') {
          if (item1.toString() !== item2.toString()) {
              diffs[key] = item2;
          }
      } else {
          if (item1 !== item2 ) {
              diffs[key] = item2;
          }
      }
    };


      //
      // Compare our objects
      //

      // Loop through the first object
      for (key in obj1) {
          if (obj1.hasOwnProperty(key)) {
            compare(obj1[key], obj2[key], key);
      }
    }

      // Loop through the second object and find missing items
      for (key in obj2) {
          if (obj2.hasOwnProperty(key)) {
            if (!obj1[key] && obj1[key] !== obj2[key] ) {
              diffs[key] = obj2[key];
          }
      }
    }

      // Return the object of differences
      return diffs;
    };
      var order1 = {
      sandwich: 'tuna',
      chips: true,
      drink: 'soda',
      order: 1,
      toppings: ['pickles', 'mayo', 'lettuce'],
      details: {
      name: 'Chris',
      phone: '555-555-5555',
      email: 'no@thankyou.com'
      },
      otherVal1: '1'
    };

      var order2 = {
        sandwich: 'turkey',
        chips: true,
        drink: 'soda',
        order: 2,
        toppings: ['pickles', 'lettuce'],
        details: {
          name: 'Jon',
          phone: '(555) 555-5555',
          email: 'yes@please.com'
        },
        otherVal2: '2'
      };
      console.log(diff(order1, order2));
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