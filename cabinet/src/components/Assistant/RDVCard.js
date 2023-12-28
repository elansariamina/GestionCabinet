import React , {useState} from 'react';
import axios from 'axios';
import Alerts from '../Patient/RDV/Alerts';
function RDVCard({ appointment }) {
    const accessToken = localStorage.getItem('accessToken');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

      const handleCancelAppointment = async () => {
        try {
          await axios.delete(`http://localhost:3001/api/rdv/deleteAppointmentById/${appointment._id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }

            }); 
            setSuccessMessage('Appointment canceled successfully');
            setErrorMessage(''); 
        }catch (error) {
          setErrorMessage('Failed to cancel appointment. Please try again.');
          setSuccessMessage('');
              } }
    
    

  return (
    <div className="border m-4 p-4 rounded shadow-md">
        <div key={appointment._id} className="mb-2">
          <p>Patient: {appointment.patient.name}</p>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <button
            onClick={handleCancelAppointment}
            className='bg-red-600 hover:bg-red-800 text-white font-bold m-3 py-1 px-4 rounded'>
                Annuler</button>
      {errorMessage !== '' && <Alerts type={'error'} message={errorMessage} onClose={() =>  { setErrorMessage(''); window.location.reload(); }} />}
      {successMessage !== '' && <Alerts type={'success'} message={successMessage} onClose={() =>  { setSuccessMessage(''); window.location.reload(); }} />}
        </div>
    </div>
  );
}

export default RDVCard;
