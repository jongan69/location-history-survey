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

let tbodyData, saveAddress;
const useStyles = makeStyles({
  table: {
    minWidth: 25,
  },
});

const to = new Date();
const from = moment().subtract(13, 'days').calendar();

function createData( tbodyData, saveAddress) {
  if(tbodyData||saveAddress==undefined){
    let tbodyData = { 
      'name': String,
      'address': String,
      'date': String 
    }
    let saveAddress = { 
      'name': String,
      'address': String,
      'date': String 
    }
    // let saveAddress = { name, address, date}
    return tbodyData, saveAddress;
  }

  if (tbodyData!=null){
    alert('dank')
    return [{ 
      'name': tbodyData.name,
      'address': tbodyData.address,
      'date': tbodyData.date 
    }]

  }

  console.log(tbodyData, saveAddress)
  return [{ 
    'name': tbodyData.name,
    'address': tbodyData.address,
    'date': tbodyData.date 
  }];
}


const rows = [
  createData(tbodyData, saveAddress),
];

export default function BasicTable(tbodyData, saveAddress) {

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