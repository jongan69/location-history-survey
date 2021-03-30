import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  let savedAddresses = JSON.parse(localStorage.getItem('savedAddress')) || [];
  let count = 0; 

  useEffect(() => {
    console.log('useEffect is running');  
    initPlaceAPI();  
    console.log('Current saveAddress is: ' , saveAddress );        
  }, [saveAddress]);
 

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


// Sleep
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }



// Function for setting current state of address and then pushing that array to the savedAddress Object
function SaveDataToLocalStorage() {
  console.log('Button Clicked');
  console.log('Sate of saveAddress: ', saveAddress);
  console.log('Local Storage: ', savedAddress);
  
  count++;
  const day = startDate.getDay();
  // const month = startDate.getMonth();
  const month = startDate.toLocaleString('default', { month: 'long' });
  console.log(month);

 
  // Parse the serialized data back into an aray of objects
  let savedAddress = JSON.parse(localStorage.getItem('savedAddress')) || [];
  
  // If place  isnt  null, set the saveAddress Array
  if(place!=null){
    console.log('Place is not null');
      // Set the saveAddress objecct to saveAddress
      setAddress([
        ...saveAddress,
          {
          id: count,
          day: day,
          month: month,
          value: place.address,
          }
      ]);
    }
    // Push the new data (whether it be an object or anything else) onto the array
    savedAddress.push(saveAddress);
          
    // Alert the array value
     // Should be something like [Object array]
        
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('savedAddress', JSON.stringify(saveAddress));


    savedAddress = JSON.parse(localStorage.getItem('savedAddress'))
    console.log('Address Successfully Saved: ', savedAddress);
    console.log('Local Storage: ', savedAddress);


     // Check if saveAddress is empty
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


  let savedAddresses = savedAddress;
  return savedAddresses;
}
  

  return (
    <>
      <div style={{ padding: "16px" }} >
      <p> What day ... </p>

      <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      calendarContainer={MyContainer}
      />
      </div>

      <div>
      <p> were you at ... </p>
      <input style={{ width: '100%' }} type="text" ref={placeInputRef} placeholder="were  you at..." />
      </div>

      <button onClick={() => {SaveDataToLocalStorage()}} style={{ marginTop: 10 }}> Add Location </button>

      <button onClick={ () => {
          let savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
          savedAddress.length = savedAddress.length - 1
          localStorage.setItem('savedAddress', JSON.stringify(savedAddress));
          alert('Updated Survey answers to: ' + [savedAddress]); 
      }
       } style={{ marginTop: 10 }}> Clear Last Entered</button>

      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div><b>Last Selected Place</b> {place.address} </div>
      <b style={{ marginTop: 10, lineHeight: '25px' }}> Past Locations: </b>
      </div>
      }

      { (!savedAddresses) 
      ? 
      <div>No savedAddress</div> 
      :
      <ul>
      {savedAddresses.map(item => (
      <li key={item.id}>You went to {item.value} on {item.day} of {item.month}</li>
        ))}
      </ul> }
      
      
    </>
  );
};

const styles = {
  container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  bar: {
    with: '100%'
  },
  nav_bar: {
      // position: 'relative',
      // left: '50%',
      // transform: 'translate(-50%, 0%)',
      // width: 'fit-content',
      marginBottom: '50px'
  }
}
 
export default GPlace;