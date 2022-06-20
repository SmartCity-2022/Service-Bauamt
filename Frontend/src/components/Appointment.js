import * as React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'


export default function Appointment(props) {

async function deleteRow(id){
  await axios.delete(process.env.REACT_APP_API_URL+'appointment/'+id+'/delete',
    {withCredentials: true})
    .then(()=>{
      window.location.reload()
  })
}

  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="large">
        <TableHead>
          <TableRow size="20">
            <TableCell>Id</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Vorname</TableCell>
            <TableCell align="right">Nachname</TableCell>
            <TableCell align="right">Adresse</TableCell>
            <TableCell align="right">PLZ</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(props.data) && props.data.map((row) => (
            <TableRow key={row.appointmentID}>

              <TableCell> {row.appointmentID} </TableCell>
              <TableCell align="right"> {row.email} </TableCell>
              <TableCell align="right"> {row.firstname} </TableCell>
              <TableCell align="right"> {row.lastname} </TableCell>
              <TableCell align="right"> {row.address} {row.houseNr} </TableCell>
              <TableCell align="right"> {row.plz} </TableCell>
              <TableCell align="right"> <Button size="small" variant="contained" onClick={() => deleteRow(row.appointmentID)}>Löschen</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}