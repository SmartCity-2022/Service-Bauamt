import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Termin = () => {

  const submit = async () => {
    /*await axios.post('/register', {
      username: this.username,
      email: this.email,
      password: this.password
    });*/
    console.log()
  };

  return (
<Container maxWidth="xl">
  <div className="row p-4">
    <div>
        <h3>Termin vereinbaren</h3>
        <hr/>
    </div>
    <div className="col-md-3 p-4">
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="datetime-local"
        label="Termin Datum/Uhrzeit"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
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
                <div class="row pt-2">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="First name"></input>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Last name"></input>
                  </div>
                </div>
              </form>
              <form>
                <div class="row pt-2">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Ort"></input>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Plz"></input>
                  </div>
                </div>
              </form>
              <form>
                <div class="row pt-2">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Straße"></input>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" placeholder="HausNr"></input>
                  </div>
                </div>
              </form>
            </form>
        </div>
      </div>
    </div>
</div>

<div className='row'>
  <div className='col-md-4 offset-md-4'>
    <div class="d-grid gap-2">
      <button type="submit" className="btn-dark" onClick={submit}>Termin vereinbaren</button>
    </div>
  </div>
</div>

  
      </Container>
  );
};

export default Termin;
