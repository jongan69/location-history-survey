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
    minWidth: 30,
  },
});

const to = new Date();
const from = moment().subtract(13, 'days').calendar();

function createData( id, answer, google, result) {
  return { id, answer, google, result };
}

const rows = [
  createData('id','Answer date & Address Address', 'Google TL date & Google TL address', 'correct/incorrect'),
  createData('id','Answer date & Address Address', 'Google TL date & Google TL address', 'correct/incorrect'),
  createData('id','Answer date & Address Address', 'Google TL date & Google TL address', 'correct/incorrect')
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell align="right">Google  Timeline</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="right">{row.google}</TableCell>
              <TableCell align="right">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}