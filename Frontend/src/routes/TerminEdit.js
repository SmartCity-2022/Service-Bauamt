import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/system"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { MenuItem  } from "@mui/material"
import Stack from '@mui/material/Stack';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const TerminEdit = () => {

const [open, setOpen] = React.useState(false);
const [state, setState] = useState({
    vorname: "",
    nachname: "",
    ort: "",
    plz: Number,
    straße: "",
    hausnummer: "",
    datum: Date,
    zeit: "",
})

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
};

const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setState({
        ...state,
        [name]: value
    });
}

const submit = async () => {
    await axios.put(process.env.REACT_APP_API_URL+'appointment/edit/'+id, {
      "firstname": state.vorname,
      "lastname": state.nachname,
      "address": state.straße,
      "houseNr": state.hausnummer,
      "plz": Number(state.plz),
      "location": state.ort,
      "reason": state.grund,
      "date": state.datum,
      "time": state.zeit
    },
      {withCredentials: true})
      .then(response =>{
      setOpen(true);
    });
}

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
        `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
        }`,
);

let {id} = useParams();

const auswahl = [
    "Begutachtung",
    "Vermessung",
    "Beratung",
    "Normaler Termin [Gespräch]"
];

  return (
    <Container maxWidth="xl">
    <form onSubmit={submit}>
        <div className="row my-5">
            <div className='col-md-8 offset-md-2'>
        
            <Box textAlign={"center"}>
            <div className='row mt-4'>
                <h4>Änderung eines Termins mit der ID: {id}</h4>
                <hr/>
                <Box
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '45%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                    <TextField label="Vorname" name='vorname' onChange={handleChange}/>
                    <TextField label="Nachname" name='nachname' onChange={handleChange}/>
                    </div>
                    <div>
                    <TextField required label="Ort" name='ort' onChange={handleChange}/>
                    <TextField required type="number" label="PLZ" name='plz' onChange={handleChange}/>
                    </div>
                    <div>
                    <TextField label="Straße" name='straße' onChange={handleChange}/>
                    <TextField label="Hausnummer" name='hausnummer' onChange={handleChange}/>
                    </div>
                </Box>
            </div>
            </Box>
    
            <div className='row mt-4'>
            <Box textAlign={"center"}>
                <Stack direction="row" spacing={3}>
                <TextField select
                    required
                    size="small"
                    value={state.grund}
                    label="Grund des Termins"
                    onChange={handleChange}
                    name="grund"
                    variant="standard"
                    InputProps={{ style: { fontSize: 14 } }}
                    sx={{width: "60%"}}
                >
                    <MenuItem key={0} value={""}>-</MenuItem>
                    {Array.isArray(auswahl) && auswahl.map(field => (
                    <MenuItem key={field} value={field}>{field}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    label="Datum des Termins"
                    type="date"
                    name="datum"
                    defaultValue="2022-01-01"
                    onChange={handleChange}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField select
                    required
                    size="small"
                    value={state.zeit}
                    label="Zeitslot"
                    onChange={handleChange}
                    name="zeit"
                    variant="standard"
                    InputProps={{ style: { fontSize: 14 } }}
                    sx={{width: "60%"}}
                >
                    {Array.isArray(timeSlots) && timeSlots.map(field => (
                    <MenuItem key={field} value={field}>{field}</MenuItem>
                    ))}
                </TextField>
                </Stack>
            </Box>
            </div>
            <Box textAlign={"center"}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Diese Aktion wurde erfolgreich durchgeführt!
                  </Alert>
                </Snackbar>
                <button type="submit" className="btn-dark col-md-6 m-3 p-2" onClick={submit}>Termin ändern</button>
            </Box>
            </div>
        </div>
    </form>
    </Container>
  );
};

export default TerminEdit;