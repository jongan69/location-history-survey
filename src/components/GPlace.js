import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  var $pull = localStorage.getItem('savedAddress');
  var savedAddress = typeof $pull!='undefined' ? $pull : [];
  let count = 0; 
  const dayset = !setStartDate ? startDate.getDay() : null;
  const monthset = startDate.toLocaleString('default', { month: 'long' });

  useEffect(() => {

    console.log('useEffect is running');  
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
  
  console.log('Month: ', monthset);
  console.log('Day: ', dayset);
  if(place!=null){
    setAddress([
      ...saveAddress,
        {
        id: count,
        day: dayset,
        month: monthset,
        value: place.address,
        }
        ]);

        if(savedAddress==null){
        localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
        savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
        }

        console.log('savedAddress was not null so we push to local: ', saveAddress); 
        savedAddress.push(saveAddress);
        localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
        savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
        return savedAddress;
    } 

  if(place==null) {
      console.log('savedAddress was null so we alert: ', savedAddress); 
      alert('You have to enter an address')
      console.log('Sate of saveAddress: ', saveAddress);
      console.log('Local Storage: ', savedAddress);  
    }


    console.log('Local Storage: ', savedAddress);
    // localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
    // savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
    return savedAddress;
}
  

  return (
    <>
      <div style={{ padding: "16px", marginTop: '10px' }} >
      <p style={{ alignItems: 'center' }}> What day ... </p>

      <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      calendarContainer={MyContainer}
      />
      </div>

      <div>
      <p style={{ alignItems: 'center' }}> were you at ... </p>
      <input style={{ width: '100%' }} type="text" ref={placeInputRef} placeholder="were  you at..." />
      </div>

      <button onClick={() => {SaveDataToLocalStorage()}} style={{ marginTop: 10 }}> Add Location </button>

      <button onClick={ localStorage.clear() } style={{ marginTop: 10 }}> Clear Addreeses </button>

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
      <ul>
      {saveAddress.map(item => (
      <li key={item.id}>You went to {item.value} on {item.day} of {item.month}</li>
        ))}
      </ul> 
      }
      
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
  text: {
    alignItems: 'center'
  },
  bar: {
    with: '100%'
  },
  nav_bar: {
      position: 'relative',
      left: '50%',
      transform: 'translate(-50%, 0%)',
      width: 'fit-content',
      marginBottom: '50px'
  }
}
 
export default GPlace;