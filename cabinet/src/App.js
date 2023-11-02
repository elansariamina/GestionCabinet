import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './pages/Patients';
import Medecins from './pages/Medecins';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/patients/:id" element={<Medecins />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
