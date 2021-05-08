import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 25,
  },
});


// var dates, tbodyData, saveAddress = []

// const rows = [
//   createData(tbodyData, saveAddress ),
// ];


// const rows1 = [
//   createData('Date 1', 159, 6.0, 24, 4.0),
//   createData('Date 2', 237, 9.0, 37, 4.3),
//   createData('Date 3', 262, 16.0, 24, 6.0),
//   createData('Date 4', 305, 3.7, 67, 4.3),
//   createData('Date 5', 356, 16.0, 49, 3.9),
// ];


export default function BasicTable(rows) {
  // var one = 1;
  console.log('table stuff: ' + rows.dates + ' ' + rows.tbodydata )
  
  // const rows1 = [
  //   createData(rows.dates, rows.tbodydata.tbodydata, rows.saveAddresss),
  // ]


  // function createData(date, google, answer) {
  //   return { date, google, answer };
  // }

  
    
  const classes = useStyles();


  return (
    <>
      {
      !rows
      ? 
      <div> 
        Missing Data 
      </div> 
      :
     <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
           <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Google Timeline Answers</TableCell>
              <TableCell align="right">Your Answers</TableCell>
              {/* <TableCell align="right">Matches</TableCell>
                <TableCell align="right">Inncorrect </TableCell>
              <TableCell align="right">Close (Proximity)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">
                  {row}
                </TableCell>
                <TableCell align="right">{row.google}</TableCell>
                <TableCell align="right">{row.answer}</TableCell>

                <TableCell align="right">Test Result</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </>
  );
}