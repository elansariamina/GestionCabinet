import React, { useEffect, useState } from 'react';
import RDVCard from './RDVCard';
import axios from 'axios';

function RDVs() {
  const token = localStorage.getItem('accessToken');
  const email = localStorage.getItem('email');

  const [patientId, setPatientId] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/auth/findIdByEmail/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const { patientId } = response.data;
      setPatientId(patientId);
      console.log("Patient id : ", patientId);
  
      axios.get(`http://localhost:3001/api/rdv/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const appointmentsWithDoctorIds = response.data;
  
        const doctorIds = Array.from(new Set(appointmentsWithDoctorIds.map(appointment => appointment.id_medecin)));
  
        Promise.all(doctorIds.map(doctorId =>
          axios.get(`http://localhost:3001/api/doctors/getNameDoctorById/${doctorId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(doctorResponse => ({ doctorId, doctorName: doctorResponse.data.name }))
          .catch(doctorError => {
            console.error(`Error getting doctor's name for ID ${doctorId}:`, doctorError);
            return { doctorId, doctorName: 'Unknown' }; 
          })
        ))
        .then(doctorNames => {
          const doctorMap = Object.fromEntries(doctorNames.map(({ doctorId, doctorName }) => [doctorId, doctorName]));
  
          const appointmentsWithNames = appointmentsWithDoctorIds.map(appointment => ({
            ...appointment,
            doctorName: doctorMap[appointment.id_medecin],
          }));

          localStorage.setItem("appointments", JSON.stringify(appointmentsWithNames));
  
          setAppointments(appointmentsWithNames);
        })
        .catch(doctorNamesError => {
          console.error('Error getting doctor names:', doctorNamesError);
        });
      })
      .catch(appointmentsError => {
        console.error('Error getting appointments:', appointmentsError);
      });
    })
    .catch(error => {
      console.error('Error getting patient ID:', error);
    });
  }, [token, email]);
  

  return (
    <>
    <h2 className="italic text-2xl font-bold mt-8 ml-20 mb-4">Votre Prochain Rendez-vous :</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {appointments.map((appointment, index) => (
        <RDVCard
          key={index}
          doctorName={appointment.doctorName}
          date={appointment.date}
          time={appointment.time}
        />
      ))}
    </div>
    </>
  );
}

export default RDVs;
