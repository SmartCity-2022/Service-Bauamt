import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography, Divider } from "@mui/material";
import Stack from '@mui/material/Stack';

const Startseite = () => {

  const textalign = {
    textalign: "left",
    color: "#294353"
  }

  const background = {
    background: "#f4f5f7",
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", my: 20 }}>
        <Typography variant="h2" align="center" gutterBottom>
            Microservice Bauamt
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
            Willkommen beim Bauamt!
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
            Der Microservice Bauamt stellt die Bauangelegenheiten des lokalen Bauamtes von der Stadt digital zur Verfügung.
            <br></br>
            Bürger haben die Möglichkeit einen Termin zu vereinbaren oder direkt online einen Bauantrag zu stellen. 
        </Typography>
        <Divider sx={{ mx: 10, my: 5 }} />
      
        <div className='row my-5'>
          <Box textAlign={"center"}>
          <h4>So Funktioniert es!</h4>
          </Box>
          <div className='p-3'  style={background}>
          <Stack direction="row" spacing={3}>
            <div><h3 style={textalign}>1. Anfrage</h3>
              <div>
                <p>Füllen Sie das Anfrageformular aus. Um so detaillierter die Informationen, welche wir von Ihnen erhalten, desto genauer können wir den Projektumfang einschätzen.</p>
              </div>
            </div><div><h3 style={textalign}>2. Angebot</h3>
              <div>
                <p>Wir prüfen Ihre Daten und sagen Ihnen, was noch zu tun ist. Sie erhalten von uns ein Angebot zur Erstellung der erforderlichen Unterlagen.</p>
              </div>
            </div><div><h3 style={textalign}>3. Bauantrag</h3>
              <div>
                <p>Jetzt ist es soweit, wir erstellen Ihren Bauantrag. Dank unseres Online-Verfahrens besonders schnell und kostengünstig.</p>
              </div>
            </div><div><h3 style={textalign}>4. Baugenehmigung</h3>
                <div>
                  <p>Alle Unterlagen sind erstellt. Einige Bauvorlagen müssen Sie noch unterzeichnen und dann kann die Baugenehmigung beantragt werden. Fertig.</p>
                </div>
            </div>
            </Stack>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Startseite;
