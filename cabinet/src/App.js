import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './pages/Patient/Patients';
import Medecins from './pages/Patient/Medecins';
import Appointment from "./pages/Patient/Appointment";
import AssociatedRapports from './pages/Patient/AssociatedRapports';
import Rapports from './pages/Patient/Rapports';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Patients />} />
          {/*<Route path="/patients/:id" element={<Medecins />} />*/}
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/patients/:name" element={<Medecins />} />
          <Route path='/rapports/' element={<AssociatedRapports/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
