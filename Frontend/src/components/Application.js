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

export default function Application(props) {


async function deleteRow(id){
    await axios.delete(process.env.REACT_APP_API_URL+'application/'+id+'/delete',
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
            <TableCell align="right">Bauvorhaben</TableCell>
            <TableCell align="right">Fertighaus</TableCell>
            <TableCell align="right">Nutzung</TableCell>
            <TableCell align="right">Fläche</TableCell>
            <TableCell align="right">Geschosse</TableCell>
            <TableCell align="right">Einheiten</TableCell>
            <TableCell align="right">Kosten</TableCell>
            <TableCell align="right">Bauweise</TableCell>
            <TableCell align="right">Heizung</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {Array.isArray(props.data) && props.data.map((row) => (
                <TableRow key={row.applicationID}>

                <TableCell> {row.applicationID} </TableCell>
                <TableCell align="right"> {row.email} </TableCell>
                <TableCell align="right"> {row.firstname} </TableCell>
                <TableCell align="right"> {row.lastname} </TableCell>
                <TableCell align="right"> {row.address} {row.houseNr} </TableCell>
                <TableCell align="right"> {row.construction_project} </TableCell>
                <TableCell align="right"> {row.prefabricated_house} </TableCell>
                <TableCell align="right"> {row.house_use} </TableCell>
                <TableCell align="right"> {row.footprint} </TableCell>
                <TableCell align="right"> {row.floor} </TableCell>
                <TableCell align="right"> {row.residential_units} </TableCell>
                <TableCell align="right"> {row.building_costs} </TableCell>
                <TableCell align="right"> {row.construction} </TableCell>
                <TableCell align="right"> {row.heating_system} </TableCell>
                <TableCell align="right"> <Button size="small" href={"AntragEdit/" + row.applicationID} variant="contained">Edit</Button></TableCell>
                <TableCell align="right"> <Button size="small" variant="contained" onClick={() => deleteRow(row.applicationID)}>Löschen</Button></TableCell>
                
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}