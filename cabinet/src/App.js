import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Patients from './pages/Patient/Patients';
import Medecins from './pages/Patient/Medecins';
import Appointment from "./pages/Patient/Appointment";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Patients />} />
          <Route path="/appointment" element={<Appointment />} />
          {/*<Route path="/patients/:id" element={<Medecins />} />*/}
          <Route path="/patients/:name" element={<Medecins />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
