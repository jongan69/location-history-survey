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
for(const from = moment().subtract(13, 'days').calendar(); from <= to; from.setDate(from.getDate() + 1)){
  dates.push(new Date(from));
}

let saveAddress, tbodyData;

var result = []


function createData( dates, tbodyData, saveAddress, result) {
  if(tbodyData==undefined){
    let tbodyData = { 
      'name': String,
      'address': String,
      'date': String 
    }
    // let saveAddress = { name, address, date}
    return tbodyData, saveAddress;
  }

  if (dates&&saveAddress&&tbodyData&&result!=null){
    alert('dank')
    return [{ 
      'name': tbodyData.name,
      'address': tbodyData.address,
      'date': tbodyData.date 
    }]

  }

  console.log('tbody: ' + tbodyData + 'saveAddress: ' + saveAddress + 'dates: ' + dates + 'results: ' + results)
  return [{ 
    'name': tbodyData.name,
    'address': tbodyData.address,
    'date': tbodyData.date 
  }];
}


const rows = [
  createData(dates, tbodyData, saveAddress, result ),
];

export default function BasicTable() {

  const classes = useStyles();
  

  return (
    <>
      {
      !tbodyData||!saveAddress
      ? 
      <div> Missing Data </div> 
      :
     <TableContainer component={Paper}>
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