import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Submit from './Submit';

const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

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


  const addAddress = () => {
      setAddress([
        ...saveAddress,
          {
            id: startDate,
            value: place.address,
          }
      ]);
   
  };
   
  useEffect(() => {
    const json = JSON.stringify(saveAddress);
    localStorage.setItem("savedAddress", json);
  }, [saveAddress]);

  return (
    <>
      <p> What day ... </p>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <p> were you at ... </p>
      <input style={{ width: '100%' }} type="text" ref={placeInputRef} placeholder="were  you at..." />
      <button onClick={addAddress} style={{ marginTop: 10 }}> Add Location </button>
    
     
      

      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
      <div><b>Address:</b> {place.address}</div>
      <b style={{ marginTop: 10, lineHeight: '25px' }}> Past Locations: </b>
      <ul>

        {saveAddress.map(item => (
        <li key={item.id}>You went to {item.value}  on {item.id} </li>
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