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
  console.log('table stuff: ' + rows.date + ' ' + rows.google + ' ' +  rows.answer)
  
  function createData(date, google, answer) {
    return { date, google, answer };
  }

  
    const rows1 = [
      createData(rows.date, rows.google, rows.answer),
    ]

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
              <TableCell>Answer</TableCell>
              <TableCell align="right">Google  Timeline</TableCell>
              <TableCell align="right">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows1.map((row) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
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