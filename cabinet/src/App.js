import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './pages/Patient/Patients';
import Medecins from './pages/Patient/Medecins';
import Appointment from "./pages/Patient/Appointment";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Patients />} />
          {/*<Route path="/patients/:id" element={<Medecins />} />*/}
          <Route path="/appointment/:id_med" element={<Appointment />} />
          <Route path="/patients/:name" element={<Medecins />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
