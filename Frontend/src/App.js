import React from 'react';
import Termin from './routes/Termin'
import Nav from './components/Nav'
import Bauantrag from './routes/Bauantrag'
import Startseite from './routes/Startseite'
import Infos from './routes/Infos'
import Account from './routes/Account'
import AntragEdit from './routes/AntragEdit'
import TerminEdit from './routes/TerminEdit'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Startseite/>}></Route>
        <Route path="/Termin" element={<Termin/>}></Route>
        <Route path="/TerminEdit/:id" element={<TerminEdit/>}></Route>
        <Route path="/AntragEdit/:id" element={<AntragEdit/>}></Route>
        <Route path="/Bauantrag" element={<Bauantrag/>}></Route>
        <Route path="/Infos" element={<Infos/>}></Route>
        <Route path="/Account" element={<Account/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
