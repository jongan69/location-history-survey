import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import BasicTable from './Table';


const GPlace = (tbodyData) => {

  // State Variables
  let [saveAddress, setAddress] = useState([]);
  let [rows, setRows] = useState([]);

  const [click, setClick] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  let dates = []
 

  // Variables 
  const placeInputRef = useRef(null);
  var $pull = localStorage.getItem('savedAddress');
  var savedAddress = typeof $pull!='null' ? $pull : [];
  const to = moment().format('MM/DD/YYYY')
    const from = moment().subtract(13, 'days').calendar()
    const fromDate = new Date(from)
    const toDate = new Date(to)
  // Creates dates Array

  for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    let pushDate = moment(date).format('MM/DD/YYYY')
    dates.push(pushDate);
  }
  
  

// UseEffect runs periodically over component lifecycle
  useEffect(() => {
    console.log('saveAddress is: ', saveAddress);
    console.log('tbodyData is : ', tbodyData);  
   
    if(saveAddress!=null){
      for(var key in saveAddress){
        var isEmpty = true
        if(saveAddress.hasOwnProperty(key)){
          console.log('saveAddress is: ', saveAddress);
            let isEmpty = false;
            return isEmpty, rows;
        } else {
            console.log('saveAddress is empty');
            return isEmpty;
        }
      }
    }
    

    initPlaceAPI();  
  }, [saveAddress]);


  // Sleep
  //  const sleep = (milliseconds) => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }

 
// initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();
      setPlace({
        name: place.name,
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
    let dayanswer = moment(startDate).format('MM/DD/YYYY');
    alert('Adding Address: '  + dayset + ' of ' + monthset)
    console.log('Adding Address: ' + dayset + ' of ' + monthset);
    try{
      if(place!=null){
        setAddress([
          ...saveAddress,
            {
                name: place.name,
                date: dayanswer,
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
    return savedAddress, saveAddress;
  }


  




  function createData( dates, tbodyData, saveAddress ) {
    let locationCount = tbodyData.tbodyData.length
    alert('You answered: ' + saveAddress.length + ' locations, google reprted: '+  locationCount + ' locations')
    let answerAddresses = saveAddress.address;
    let googleAddresses = tbodyData.address;
    let googleDates = {}
    let answerDates = {}
    console.log('Dates.length is: ' + dates.length);
    console.log('tbody.length is: ' + tbodyData.tbodyData.length);
  //   var Obj = {            
  //     dayOne: [],
  //     dayTwo: [],
  //     dayThree: [],
  //     dayFour: [],
  //     dayFive: [],
  //     daySix: [],
  //     daySeven: [],
  //     dayEight: [],
  //     dayNine: [],
  //     dayTen: [],
  // };

    // try{

    //   dates.forEach( function built( item, index){
    //     let add1 = []
    //     let date = item
    //     let dateNum = index
    //     let answerDate = saveAddress[index].date
    //     tbodyData.tbodyData.forEach( function sort(item,index){
    //       let google = item
    //       let googleDay = google["date"]
    //       let googleAddress = google["address"]

    //       switch (date) {
    //         case 0: 
    //         date === googleDates 

    //         case 1: 
    //         date != googleDates 
    //         case 2:
    //         case 3:
    //       }
    //     })
    //   })
      
    // } 
    // catch {
    //   alert('There was an error generating the table')
    // }


    
    // Passed in 
    console.log('Input');
    console.log('The tbody array is ' + JSON.stringify(tbodyData.tbodyData));
    console.log('The saveAddress array is ' + JSON.stringify(saveAddress));
    console.log('The dates array is ' + JSON.stringify(dates));

    // Output
    console.log('Output');
    console.log('The Answer dates array is ' + JSON.stringify(answerDates));
    console.log('The google dates array is ' + JSON.stringify(googleDates));
    console.log('rows is ' + JSON.stringify(rows));

    return { dates, tbodyData, saveAddress };
  }











  // })








// Checks for required data, if data present, begin sorting algorithm

  












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

      <button style={{ padding: "10px" }} onClick={() => {
          
        try{
          if( (JSON.stringify(tbodyData)!=JSON.stringify([])) && (JSON.stringify(saveAddress)!=JSON.stringify([])) ) {
            
            let result = createData(dates, tbodyData, saveAddress);
            
            console.log('The result is ' + JSON.stringify(result));
            // setRows(result)

            console.log('The rows is ' + JSON.stringify(rows));
            console.log('result is ' + JSON.stringify(result));
            setClick(true);
            return result;
          }














          
          if((JSON.stringify(tbodyData)===JSON.stringify([]))) {
            alert('Missing google data, try again in a little while');
            console.log('saveAddress: ' + JSON.stringify(saveAddress));
            console.log('tbodyData: ' + JSON.stringify(tbodyData));
          } 

          if((JSON.stringify(saveAddress)===JSON.stringify([]))) {
            alert('Missing answer data, try answering some locations');
          }

        } catch(err) {
          alert(err)
        }
      }}> 
        Grab data and compare
       </button>

    {!click||!tbodyData||!saveAddress||JSON.stringify(rows)==JSON.stringify([])
      ? 
      <div style={styles.table}> Results will display here </div> 
      : 
      <div  style={styles.table}>  <BasicTable {...result} /> </div>
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