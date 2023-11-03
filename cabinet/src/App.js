import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './pages/Patients';
import Medecins from './pages/Medecins';
import Appointment from "./pages/Appointment";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/patients/:id" element={<Medecins />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
