import * as React from 'react';
import Container from '@mui/material/Container';

const Infos = () => {

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
                <h1 className=''>Vom Bauantrag zur Baugenehmigung</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </Container>
  );
};

export default Infos;
