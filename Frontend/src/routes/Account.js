import * as React from 'react';
import Container from '@mui/material/Container';
import axios from 'axios'
import { useEffect,useState } from "react"
import Appointment from "../components/Appointment"
import Application from "../components/Application"

const Account = () => {

  const [totalAppointments, setTotalAppointments] = useState([]);
  useEffect(() => { getAppointments() }, []);

  const [totalApplications, setTotalApplications] = useState([]);
  useEffect(() => { getApplications() }, []);
    
  const getAppointments = async () => {
    await axios.get(process.env.REACT_APP_API_URL+"appointment/", []).then(response => {
      setTotalAppointments(response.data);
    });
  }

  const getApplications = async () => {
    await axios.get(process.env.REACT_APP_API_URL+"application/", []).then(response => {
      setTotalApplications(response.data);
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
        <div className='col-md-10 offset-md-1'>
          
          <div className='row mt-4'>
            <div>
              <h3>Bauanträge</h3>
              <hr/>
            </div>
            <Application data={totalApplications}/>
          </div>

          <div className='row mt-5'>
            <div>
              <h3>Termine</h3>
              <hr/>
            </div>
            <Appointment data={totalAppointments}/>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default Account;
