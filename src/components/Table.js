import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';


const useStyles = makeStyles({
  table: {
    minWidth: 25,
  },
});



var dates = []
const to = new Date();
const from = moment().subtract(13, 'days').calendar()
const fromDate = new Date(from)
const toDate = new Date(to)

function createDates() {
  console.log(from);
  for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
    console.log(JSON.stringify(dates));
    console.log(toDate);
    console.log(fromDate);
  }
  return dates
}

let saveAddress, tbodyData;
var result = []

const rows = [
  createData(dates, tbodyData, saveAddress ),
];

// let table = { 
//   'date': dates,
//   'google': tbodyData,
//   'answer': saveAddress 
// }

function createData( dates, tbodyData, saveAddress ) {
    return [ 
      row = { 
        dates,
        tbodyData,
        saveAddress,
      }
    ];
  console.log('tbody: ' + tbodyData )
  // return [{ 
  //   'name': 'name of place',
  //   'address': 'address of place',
  //   'date': 'date' 
  // }];
}


export default function BasicTable(tbodyData, saveAddress) {

  const classes = useStyles();
  
  return (
    <>
      {
      !tbodyData||!saveAddress||!dates
      ? 
      <div> 
        Missing Data 
        {console.log('dates: ' + JSON.stringify(dates))}
        {console.log('google: ' + JSON.stringify(tbodyData))}
        {console.log('ans: ' + JSON.stringify(saveAddress))}
        {console.log('rows: ' + rows)}
        {createDates}
      </div> 
      :
     <TableContainer component={Paper}>
       {console.log('dates: ' + JSON.stringify(dates))}
       {console.log('google: ' + JSON.stringify(tbodyData))}
       {console.log('ans: ' + JSON.stringify(saveAddress))}
       {console.log('rows: ' + rows)}
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
           <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell align="right">Google  Timeline</TableCell>
              <TableCell align="right">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </>
  );
}