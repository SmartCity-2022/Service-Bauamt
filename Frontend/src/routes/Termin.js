import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { useState } from "react"

const Termin = () => {

  const [state, setState] = useState({
    datum: "",
    vorname: "",
    nachname: "",
    ort: "",
    plz: Number,
    straße: "",
    hausnummer: "",
  })

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setState({
      ...state,
      [name]: value
    });
  }

  const submit = async () => {
    await axios.post(process.env.REACT_APP_API_URL + '/appointment/new', {
      "vorname": state.vorname,
      "nachname": state.nachname,
      "ort": state.ort,
      "plz": state.plz,
      "straße": state.straße,
      "hausnummer": state.hausnummer,
    },
      {withCredentials: true})
  }

  const divStyle = {
    color: "white",
    background: '#dfc217',
    heigh: "100%",
    padding: "1rem",
  }

  const allStyle = {
    margin: "0",
    padding: "0"
  }


  return (
  <Container maxWidth="" style={allStyle}>

  <div class="row m-2" style={divStyle}>
    <div class="container">
      <div class="row header_text_wrapper v-align">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div className='col-md-8 offset-md-2'>
            <h1 className=''>Erstellen sie kostenlos Ihren Bauantrag</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row p-4">
    <div className='col-md-8 offset-md-2'>
    <div>
        <h3>Termin vereinbaren</h3>
        <hr/>
    </div>
    <div className="col-md-3 p-4">
    <Stack component="form" noValidate spacing={3}>
      <TextField
        name="datum"
        id="datetime-local"
        label="Termin Datum/Uhrzeit"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={handleChange}
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
    </div>
    <div className="col-md-9">
      <div className="p-4">
        <div>
            <form>
              <form>
                <div className="row pt-2">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Vorname" name='vorname' value={state.vorname} onChange={handleChange}></input>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Nachname" name='nachname' value={state.nachname} onChange={handleChange}></input>
                  </div>
                </div>
              </form>
              <form>
                <div className="row pt-2">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Ort" name='ort' value={state.ort} onChange={handleChange}></input>
                  </div>
                  <div className="col">
                    <input type="number" className="form-control" placeholder="PLZ" name='plz' value={state.plz} onChange={handleChange}></input>
                  </div>
                </div>
              </form>
              <form>
                <div className="row pt-2">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Straße" name='straße' value={state.straße} onChange={handleChange}></input>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Hausnummer" name='hausnummer' value={state.hausnummer} onChange={handleChange}></input>
                  </div>
                </div>
              </form>
            </form>
        </div>
      </div>
    </div>

    <div className='row p-4'>
      <div className='col-md-4'>
        <div className="d-grid gap-2">
          <button type="submit" className="btn-dark" onClick={submit}>Termin vereinbaren</button>
        </div>
      </div>
    </div>  


    </div>
</div>


  
      </Container>
  );
};

export default Termin;
