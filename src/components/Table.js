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

const to = new Date();
const from = moment().subtract(13, 'days').calendar();
let GoogledataLocal;
let saveAddress;

function createData( GoogledataLocal, saveAddress) {
  if(GoogledataLocal||saveAddress==null){
    let GoogledataLocal = { 
      'name': name,
      'address': address,
      'date': date 
    }

    let saveAddress = { 
      'name': name,
      'address': address,
      'date': date 
    }
    // let saveAddress = { name, address, date}
    return GoogledataLocal, saveAddress;
  }

  if (GoogledataLocal!=null){
    alert('dank')
    return { 
      'name': GoogledataLocal.name,
      'address': GoogledataLocal.address,
      'date': GoogledataLocal.date 
    }

  }

  const rows = [
    createData(GoogledataLocal, saveAddress),
  ];

  console.log(GoogledataLocal, saveAddress)
  return GoogledataLocal;
}


export default function BasicTable (GoogledataLocal, saveAddress) {
  const classes = useStyles();
 
  return (
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
  );
}