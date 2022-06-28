import * as React from 'react';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react"
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Bauantrag = () => {

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    vorname: "",
    nachname: "",
    ort: "",
    plz: Number,
    straße: "",
    hausnummer: "",
    baukosten: Number,
    geschosse: Number,
    wohneinheiten: Number,
    grundflaeche: Number,
    bauvorhaben: "",
    fertighaus: "",
    heizungsanlage: "",
    nutzung: "",
    bauweise:""
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
    await axios.post(process.env.REACT_APP_API_URL+'application/new', {
      "firstname": state.vorname,
      "lastname": state.nachname,
      "address": state.straße,
      "houseNr": state.hausnummer,
      "plz": Number(state.plz),
      "location": state.ort,
      "construction_project": state.bauvorhaben,
      "prefabricated_house": state.fertighaus,
      "house_use":state.nutzung,
      "footprint":Number(state.grundflaeche),
      "floor":Number(state.geschosse),
      "residential_units":Number(state.wohneinheiten),
      "building_costs":Number(state.baukosten),
      "construction":state.bauweise,
      "heating_system":state.heizungsanlage,
    },
      {withCredentials: true})
      .then(response =>{
        setOpen(true);
      });
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
      <form onSubmit={submit}>

        <div className="row m-2" style={divStyle}>
          <div className="container">
            <div className="row header_text_wrapper v-align">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className='col-md-8 offset-md-2'>
                  <h1 className=''>Erstellen sie kostenlos Ihren Bauantrag</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      

        <div className='row'>
          <div className='col-md-8 offset-md-2'>

            <div className='mt-5 mb-5'>
              <h4><strong>
                Baugenehmigung beantragen – ganz einfach online
              </strong></h4>
              <p>
                Nach Erhalt Ihrer Anfrage prüfen wir Ihr Bauvorhaben. Ist Ihre Projektbeschreibung vollständig, erhalten Sie von uns ein kostenloses Angebot für Ihren Bauantrag oder Ihre Nutzungsänderung. Sollten wir noch weitere Informationen benötigen werden wir uns umgehend mit Ihnen in Verbindung setzen.
              </p>
              <p><strong>
                Damit wir Ihr Bauvorhaben bewerten können, machen Sie bitte möglichst genaue und vollständige Angaben.
              </strong></p>
              <p>
              Wir melden uns in der Regel 48 Stunden nach Erhalt der Anfrage. Sollten Sie noch Fragen haben oder ein individuelles Angebot zu Architektenleistungen wünschen, können Sie uns auch eine E-Mail senden oder uns telefonisch unter (+49) 0000 0000000 kontaktieren.
              </p>
              <p>
                Beantragen Sie jetzt Ihre Baugenehmigung schnell, sicher und komplett Digital!
              </p>
            </div>




            <div className='row mt-4'>
              <FormControl>
                <h4>Bauvorhaben</h4>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel control={<Radio />} label="Neubau" value="Neubau" name='bauvorhaben' onChange={handleChange}/>
                  <FormControlLabel control={<Radio />} label="Anbau" value="Anbau" name='bauvorhaben' onChange={handleChange}/>
                  <FormControlLabel control={<Radio />} label="Umbau" value="Umbau" name='bauvorhaben' onChange={handleChange}/>
                  <FormControlLabel control={<Radio />} label="Garage/Carport" value="Garage/Carport" name='bauvorhaben' onChange={handleChange}/>
                  <FormControlLabel control={<Radio />} label="Nutzungsänderung" value="Nutzungsänderung" name='bauvorhaben' onChange={handleChange}/>
                </RadioGroup>
              </FormControl>
            </div>

            <div className='row mt-4'>
              <FormControl>
                <h4>Fertighaus</h4>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Ja" control={<Radio />} label="Ja" name='fertighaus' onChange={handleChange}/>
                  <FormControlLabel value="Nein" control={<Radio />} label="Nein" name='fertighaus' onChange={handleChange}/>
                </RadioGroup>
              </FormControl>
            </div>

            <div className='row mt-4'>
            <FormControl>
                <h4>Nutzung</h4>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Wohnbebauung" control={<Radio />} label="Wohnbebauung" name='nutzung' onChange={handleChange}/>
                  <FormControlLabel value="Gewerbliche Nutzung" control={<Radio />} label="Gewerbliche Nutzung" name='nutzung' onChange={handleChange}/>
                </RadioGroup>
              </FormControl>
            </div>

            <div className='row mt-4'>
              <FormControl>
                <h4>Projektumfang</h4>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '45%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField required type="number" label="Grundfläche in m²" id="outlined-size-normal" name='grundflaeche' onChange={handleChange}/>
                    <TextField required type="number" label="Anzahl der Geschosse" id="outlined-size-normal" name='geschosse' onChange={handleChange}/>
                  </div>
                  <div>
                    <TextField required type="number" label="Anzahl der Wohneinheiten" id="outlined-size-normal" name='wohneinheiten' onChange={handleChange}/>
                    <TextField required type="number" label="Baukosten" id="outlined-size-normal" name='baukosten' onChange={handleChange}/>
                  </div>
                </Box>
              </FormControl>
            </div>

            <div className='row mt-4'>
            <FormControl>
                <h4>Keller oder Bodenplatte</h4>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Keller" control={<Radio />} label="Keller" />
                  <FormControlLabel value="Bodenplatte" control={<Radio />} label="Bodenplatte" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className='row mt-4'>
            <FormControl>
                <h4>Bauweise</h4>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Holz" control={<Radio />} label="Holz" name='bauweise' onChange={handleChange}/>
                  <FormControlLabel value="Stein" control={<Radio />} label="Stein" name='bauweise' onChange={handleChange}/>
                  <FormControlLabel value="Stahl" control={<Radio />} label="Stahl" name='bauweise' onChange={handleChange}/>
                  <FormControlLabel value="Beton" control={<Radio />} label="Beton" name='bauweise' onChange={handleChange}/>
                </RadioGroup>
              </FormControl>
            </div>

            <div className='row mt-4'>
            <FormControl>
                <h4>Heizungsanlage</h4>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Gas" control={<Radio />} label="Gas" name='heizungsanlage' onChange={handleChange}/>
                  <FormControlLabel value="Öl" control={<Radio />} label="Öl" name='heizungsanlage' onChange={handleChange}/>
                  <FormControlLabel value="Solar" control={<Radio />} label="Solar" name='heizungsanlage' onChange={handleChange}/>
                  <FormControlLabel value="Strom" control={<Radio />} label="Strom" name='heizungsanlage' onChange={handleChange}/>
                  <FormControlLabel value="Holz" control={<Radio />} label="Holz" name='heizungsanlage' onChange={handleChange} />
                </RadioGroup>
              </FormControl>
            </div>

            <div className='row mt-4'>
              <FormControl>
                <h4>Persönliche Daten</h4>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '45%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField label="Vorname" id="outlined-size-normal" name='vorname' onChange={handleChange}/>
                    <TextField label="Nachname" id="outlined-size-normal" name='nachname' onChange={handleChange}/>
                  </div>
                  <div>
                    <TextField required label="Ort" id="outlined-size-normal" name='ort' onChange={handleChange}/>
                    <TextField required type="number" label="PLZ" id="outlined-size-normal" name='plz' onChange={handleChange}/>
                  </div>
                  <div>
                    <TextField label="Straße" id="outlined-size-normal" name='straße' onChange={handleChange}/>
                    <TextField label="Hausnummer" id="outlined-size-normal" name='hausnummer' onChange={handleChange}/>
                  </div>
                </Box>
              </FormControl>
            </div>

            <div className='row'>
              <div className=''>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Diese Aktion wurde erfolgreich durchgeführt!
                    </Alert>
                  </Snackbar>
                  <button type="submit" className="btn-dark col-md-11 p-2" onClick={submit}>Bauantrag stellen</button>
              </div>
            </div>  

          </div>
        </div>

      </form>
    </Container>
  );
};

export default Bauantrag;
