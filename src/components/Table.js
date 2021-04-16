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

// let table = { 
//   'date': dates,
//   'google': tbodyData,
//   'answer': saveAddress 
// }

const useStyles = makeStyles({
  table: {
    minWidth: 25,
  },
});




// var dates, tbodyData, saveAddress = []

// const rows = [
//   createData(tbodyData, saveAddress ),
// ];






export default function BasicTable(rows) {
  var one = 1;
  const classes = useStyles();
  console.log('rows: ' + JSON.stringify(rows))
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
          {rows.map((row) => (
              <TableRow key={row.date.dates}>
                <TableCell component="th" scope="row">
                  {row.date.dates}
                </TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Result</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </>
  );
}