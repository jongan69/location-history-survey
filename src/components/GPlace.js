import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  let count = 0; 

  useEffect(() => {
    savedAddress = JSON.parse(localStorage.getItem('savedAddress')) || [];
    console.log('Current savedAddress is: ' , savedAddress );        
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


  // const addAddress = () => {
  //     }
      // if(localStorage.getItem(('saveAddress') == null)&&(place)!=null){
      //   var savedAddress = [];
      //   alert(saveAddress);
      //   alert(place);
      //   alert(savedAddress);  // Should be something like [Object array
      //   }
      // } 
      
//       else {
//        console.log('Place is null');
//        var count = 0;
//        console.log('count is ' + count);
//       }
// };


function SaveDataToLocalStorage() {

  count++;
  const day = startDate.getDay();
  const month = startDate.getMonth();
  
  // Parse the serialized data back into an aray of objects
  var savedAddress = JSON.parse(localStorage.getItem('savedAddress')) || [];
    if(place!=null){
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

        


    if(saveAddress!=null) {
      
      // Push the new data (whether it be an object or anything else) onto the array
      savedAddress.push(saveAddress);
          
      // Alert the array value
      alert(savedAddress);  // Should be something like [Object array]
          
      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('savedAddress', JSON.stringify(saveAddress));
      console.log('Address Successfully Saved: ', saveAddress)
      console.log('Saved: ', savedAddress)
      return saveAddress,savedAddress;
    }
}
          
   
  // useEffect(() => {
  //   const json = JSON.stringify(saveAddress);
  //   localStorage.setItem("savedAddress", json);
  // }, [saveAddress]);

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

      <button onClick={SaveDataToLocalStorage()} style={{ marginTop: 10 }}> Add Location </button>

      <button onClick={() => {
        chrome.storage.local.clear(function() {
          var error = chrome.runtime.lastError;
          if (error) {
              console.error(error);
          }
      });
      }
      } style={{ marginTop: 10 }}> Clear  Data </button>

      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div><b>Selected Place</b> {place.address}</div>
      <b style={{ marginTop: 10, lineHeight: '25px' }}> Past Locations: </b>
      <ul>
      {saveAddress.map(item => (
      <li key={item.id}>You went to {item.value} on {item.day} of {item.month}</li>
        ))}
      </ul> 
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