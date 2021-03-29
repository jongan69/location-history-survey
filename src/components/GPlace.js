import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


// Initilize function
const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  var count = 0;
  


  // On run all
  useEffect(() => {
    initPlaceAPI();
  }, []);
 

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



    // For side effect calculations
    useEffect(async () => {
       await place.address!=null;
       console.log('Use Effect running');
       const day = startDate.getDay();
       const month = startDate.getMonth();
       const id = count;
       const SavedAddresses = {
        items: []
      }
  },[]);




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



// Function for Creating Local Storage Array of Objects if one doesnt exist
  const addAddress = () => {
    
    console.log('Button Clicked');
    // Create Variables to save to local storage
    const day = startDate.getDay();
       const month = startDate.getMonth();
       const id = count;
       const SavedAddresses = {
        items: []
      }
      SavedAddresses.items.set({
        id: id,
        day: day,
        month: month,
        address: place.address
      })
      console.log('So far', SavedAddresses);

    chrome.storage.sync.set({'SavedAddresses': SavedAddresses}, function(){
    console.log('Address last saved', place.address);
    });

    chrome.storage.sync.get({'SavedAddresses': SavedAddresses}, function(){
      console.log('Address last updated', items);
      });

  };
   


    


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


      <button onClick={() => addAddress()} style={{ marginTop: 10 }}> Add Location </button>
      <button onClick={localStorage.clear()} style={{ marginTop: 10 }}> Clear  Data </button>

      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div><b>Selected Place</b> {place.address}</div>

      <b style={{ marginTop: 10, lineHeight: '25px' }}> Past Locations: </b>
      

      { !saveAddress.address ? <div> Please enter an address </div> : 
          <ul>
            {SavedAddresses.map(item => (
              <li key={item.id}>You went to {item.address} on {item.day} of {item.month}</li>
            ))}
          </ul>}
      </div>
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