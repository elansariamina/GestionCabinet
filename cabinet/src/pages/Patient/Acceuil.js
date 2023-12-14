import React from 'react';
import Services from './Services';
import RDVs from '../../components/Patient/Acceuil/RDVs';
import Notifications from '../../components/Patient/Acceuil/Notifications';

function Acceuil() {
  return (
    <div>
      <Services />
      <RDVs />
      <Notifications />
    </div>
  );
}

export default Acceuil;
