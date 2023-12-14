import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Authentication/login';
import Patients from './pages/Patient/Patients';
import Medecins from './pages/Patient/Medecins';
import Appointment from "./pages/Patient/Appointment";
import AssociatedRapports from './pages/Patient/AssociatedRapports';
import Rapports from './pages/Patient/Rapports';
import Register from './pages/Authentication/Register';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/appointment/:id_med" element={<Appointment />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/home" element={<Patients />} />
          <Route path="/patients/:name" element={<Medecins />} />
          <Route path='/rapports/' element={<AssociatedRapports/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
