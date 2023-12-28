import React from 'react';
import axios from 'axios';

function RDVCard({ appointment }) {
    const accessToken = localStorage.getItem('accessToken');

      const handleCancelAppointment = async () => {
        try {
          await axios.delete(`http://localhost:3001/api/rdv/deleteAppointmentById/${appointment._id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }

            }); 
            window.location.reload();
        }catch (error) {
                console.error('Error:', error);
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
        </div>
    </div>
  );
}

export default RDVCard;
