import React, { useEffect, useRef, useState } from "react";
 
const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);

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
            id: saveAddress.length,
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
      <input type="text" ref={placeInputRef} placeholder="Where have you been in the last 30 days?" />
      <button onClick={addAddress}> Add Address</button>

     
      <button> Submit Results </button>
      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
      <div><b>Address:</b> {place.address}</div>
      <b> Past Locations: </b>
      <ul>
        {saveAddress.map(item => (
        <li key={item.id}>{item.value}</li>
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