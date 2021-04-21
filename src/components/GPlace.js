import React, { useEffect, useRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import fetchGoogleTimelineData from '../fetch-google-timeline-data';
import moment from 'moment';
import BasicTable from './Table';
// import diffs from './sort';


const GPlace = (tbodyData) => {

  // State Variables
  let [saveAddress, setAddress] = useState([]);
  let [rows, setRows] = useState([]);
  const [click, setClick] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  let dates = []
  let googleDates = []
  let answerDates = []

  // Variables 
  const placeInputRef = useRef(null);
  var $pull = localStorage.getItem('savedAddress');
  var savedAddress = typeof $pull!='null' ? $pull : [];
  // let dates = [];
  var count = !saveAddress.id ? 0 : savedAddress.id++; 
  // const rows = [
  //   createData( dates, tbodyData, saveAddress ),
  // ];
  const to = moment().format('MM/DD/YYYY')
    const from = moment().subtract(13, 'days').calendar()
    const fromDate = new Date(from)
    const toDate = new Date(to)
  // Creates dates Array
  let id = 0

  for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    let pushDate = moment(date).format('MM/DD/YYYY')
    dates.push(pushDate);
    id++;
  }
  
  

// UseEffect runs periodically over component lifecycle
  useEffect(() => {
    console.log('useEffect is has run: ', count++, ' times');  
    console.log('Pull is: ', $pull);
    console.log('saveAddress is: ', saveAddress);
    console.log('tbodyData is : ', tbodyData);  
   
    if(saveAddress!=null){
      for(var key in saveAddress){
        var isEmpty = true
        if(saveAddress.hasOwnProperty(key)){
            console.log('saveAddress is not empty');
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
    alert('Adding Address: '  + dayset + ' of ' + monthset)
    console.log('Adding Address: ' + dayset + ' of ' + monthset);
    try{
      if(place!=null){
        setAddress([
          ...saveAddress,
            {
                name: place.name,
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
    return savedAddress, saveAddress;
  }


  




  function createData( dates, tbodyData, saveAddress ) {
    let locationCount = tbodyData.tbodyData.length
    alert('You had: ' + saveAddress.length + ' answers, google reprted: '+  locationCount + ' locations')
    let answerAddresses = saveAddress.address;
    let googleAddresses = tbodyData.address;
    console.log('Dates.length is: ' + dates.length);


        // creates date array of google data
        for(let i = 0; i <= dates.length; i++){
          console.log('for googleDates');
          console.log('i is ' + i);
          console.log('dates is ' + dates.length);
          console.log('tbodyData is ' + tbodyData.tbodyData.length);
         
          tbodyData.tbodyData.forEach( function sort(item,index){
          let add1 = []
          let googleDay = JSON.stringify(item)
          console.log('item is ' + googleDay);
          console.log('index is ' + index);

              console.log('date is ' + googleDay);
              let dateDay = dates[i]
              let googleAddress = googleDay.address
              
              console.log('gd is ' + googleDay);
              console.log('ga is ' + googleAddress);
              console.log('dd is ' + dateDay);
              console.log( 'googleDay.date is '+ JSON.stringify(googleDay.date) );
              console.log( 'dayDay.date is '+ JSON.stringify(dateDay) );
              console.log('Preloop');

                if(JSON.stringify(googleDay)==JSON.stringify(dateDay)){
                  console.log( 'googleDay.date is '+ JSON.stringify(googleDay.date) );
                  console.log( 'dayDay.date is '+ JSON.stringify(dateDay) );
                  add1.push(googleDay.address)
                } else {
                  googleDates.push(dates[i], add1)
                }
            })
            console.log('The google dates array is now: ' + googleDates);
            return googleDates;      
      }


       // creates date array of answer data
       for(let n = 0; n <= dates.length; n++){
        console.log('for answerDates');
        console.log('n is ' + n);
        console.log('dates is ' + dates.length);
        console.log('saveAddress is ' + saveAddress.length);
       
        saveAddress.forEach( function sort(item,index){
        let add2 = []
        let answerDay = JSON.stringify(item)
        console.log('item is ' + answerDay);
        console.log('index is ' + index);

            console.log('date is ' + JSON.stringify(answerDay.date));
            let dateDay = dates[n]
            let answerAddress = answerDay.address
            
            console.log('gd is ' + answerDay);
            console.log('ga is ' + answerAddress);
            console.log('dd is ' + dateDay);
            console.log( 'googleDay.date is '+ JSON.stringify(answerDay.date) );
            console.log( 'dayDay.date is '+ JSON.stringify(dateDay) );
            console.log('Preloop');

              if(JSON.stringify(answerDay)==JSON.stringify(dateDay)){
                console.log( 'googleDay.date is '+ JSON.stringify(answerDay.date) );
                console.log( 'dayDay.date is '+ JSON.stringify(dateDay) );
                add2.push(answerDay.address)
              } else {
                googleDates.push(dates[n], {add2})
              }
          })
          console.log('The answer dates array is now: ' + answerDates);
          return answerDates;      
    }

    // Creates date array of answer data
  //   for(let n = 0; n <= dates.length; n++){
  //     console.log('for answerDates');
  //     console.log('n is ' + n);
  //     console.log('dates is ' + dates.length);

  //     saveAddress.forEach( function sort(item, n){
  //         let add1 = []
  //         let answersDay = item[n]
  //         let dateDay = dates[n]
  //         let answersAddress = answerDay
          
  //         console.log('ad is ' + answerDay);
  //         console.log('aa is ' + answersAddress);
  //         console.log('dd is ' + dateDay);

  //           if(JSON.stringify(answersDay.date)==JSON.stringify(dateDay.date)){
  //             add1.push(answersAddress)
  //           } else {
  //             answerDates.push(date[n],add1);
  //           }

  //       })
  //       console.log('The Answer dates array is now: ' + answerDates);
  //       return answerDates;
  // }




  function createRows(dates , googleDates, answerDates) {
      return dates , googleDates, answerDates;
  }

  const data = createRows(dates, googleDates, answerDates)

//   var keys = dates;
//   for(var i = 0; i < keys.length; i++){ 
    
// } 

// for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
//   let pushDate = moment(date).format('MM/DD/YYYY')
//   dates.push(pushDate);
// }
      // console.log('Current dates: ' + JSON.stringify(dates) + ' Current Data: ' + JSON.stringify(tbodyData) + ' Current Data: ' + JSON.stringify(saveAddress))
    // Passed in 
    console.log('Input');
    console.log('The tbody array is ' + JSON.stringify(tbodyData));
    console.log('The saveAddress array is ' + JSON.stringify(saveAddress));
    console.log('The dates array is ' + JSON.stringify(dates));

    // Output
    console.log('Output');
    console.log('The Answer dates array is ' + JSON.stringify(answerDates));
    console.log('The google dates array is ' + JSON.stringify(googleDates));
    console.log('data is ' + JSON.stringify(data));
    return data;
  }












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
            
            let data = createData(dates, tbodyData, saveAddress);

            data.forEach( function TableBuilder (dates) {
              setRows({'date' : dates, 'google': googleDates, 'answer' : answerDates })
            })

            console.log('The rows is ' + JSON.stringify(rows));
            console.log('data is ' + JSON.stringify(data));


            alert('Displaying Table', JSON.stringify(data));
            setClick(true);
            return data;
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
      <div  style={styles.table}>  <BasicTable {...rows} /> </div>
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