import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Patients from './pages/Patients';
import Medecins from './pages/Medecins';

function App() {
  return (
    <Router>
      <div>
          <Route path="/patients" exact component={Patients} />
          <Route path='/patients/:id_service' exact component={Medecins}/>
      </div>
    </Router>
  );
}

export default App;
