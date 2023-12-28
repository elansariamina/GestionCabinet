import React, { useState } from 'react';
import axios from 'axios';
import Alerts from '../Patient/RDV/Alerts';

function ConfirmRDV({ appointment }) {
  const accessToken = localStorage.getItem('accessToken');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRejectAppointment = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/rdv/rejectAppointment/${appointment._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSuccessMessage('Appointment rejected successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to cancel appointment. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleConfirmAppointment = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/rdv/confirmAppointment/${appointment._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSuccessMessage('Appointment confirmed successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to confirm appointment. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="border m-4 p-4 rounded shadow-md bg-white">
      <div key={appointment._id} className="mb-2">
        <p className="text-lg font-semibold">Patient: {appointment.patient.name}</p>
        <p>Date: {appointment.date}</p>
        <p>Time: {appointment.time}</p>
        <div className="flex space-x-4">
          <button
            onClick={handleRejectAppointment}
            className="bg-red-600 hover:bg-red-800 text-white font-bold m-3 py-1 px-4 rounded"
          >
            Rejeter
          </button>
          <button
            onClick={handleConfirmAppointment}
            className="bg-green-500 hover:bg-green-700 text-white font-bold m-3 py-1 px-4 rounded"
          >
            Confirmer
          </button>
        </div>
        {errorMessage !== '' && (
          <Alerts type={'error'} message={errorMessage} onClose={() => { setErrorMessage(''); window.location.reload(); }} />
        )}
        {successMessage !== '' && (
          <Alerts type={'success'} message={successMessage} onClose={() => { setSuccessMessage(''); window.location.reload(); }} />
        )}
      </div>
    </div>
  );
}

export default ConfirmRDV;
