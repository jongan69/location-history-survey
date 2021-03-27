import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  const [saveAddress, setAddress] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  var count = 0;
  var id = {}
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


  function createItems() {
    // Set item in local storage. 
        setAddress([
        ...saveAddress,
          {
            day: day,
            month: month,
            address: place.address,
          },
      ]);
      chrome.storage.sync.set({
        id: {
        saveAddress,
      }} , function() {
        console.log('Address saved',id);
      });
      const json = JSON.stringify(id);
      localStorage.setItem("id", json);
  }



// Function for clearing the local storage
  function deleteItems() {
    // Clear localStorage items 
    localStorage.clear();
  }


  const addAddress = () => {
    // Set variables equal to state from the components
    const day = startDate.getDay();
    const month = startDate.getMonth();
    console.log(count)
    if(localStorage.getItem('addresses',[]) == null){
      localStorage.setItem(count)




      chrome.storage.sync.get([id],
        function ifObjectIsEmpty(object){
          var isEmpty=true;



          if(JSON.stringify(object)==JSON.stringify({items:[]})){
            // Object is Empty
            isEmpty = true;
            console.log('The local storage has no data, proceeding to add')
            createItems(id,day,month,);



          } else{
            //Object is Not Empty
            isEmpty = false;
            console.log('The local storage has data')
            var count = 0;
          }
          return isEmpty;
       }) 
    }

       
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

      <button onClick={addAddress} style={{ marginTop: 10 }}> Add Location </button>
      <button onClick={deleteItems} style={{ marginTop: 10 }}> Clear Old </button>


      {
      place && 
      <div style={{ marginTop: 20, lineHeight: '25px' }}>
      <div><b>Selected Place</b> {place.address}</div>

      <b style={{ marginTop: 10, lineHeight: '25px' }}> Past Locations: </b>
      <ul>
        {id.map(item => (
        <li key={item.id}>You went to {item.address} on {item.day} of {item.month}</li>
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