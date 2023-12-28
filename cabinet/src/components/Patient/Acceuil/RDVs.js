import React, { useEffect, useState } from 'react';
import RDVCard from './RDVCard';
import axios from 'axios';

function RDVs() {
  const token = localStorage.getItem('accessToken');
  const patient = JSON.parse(localStorage.getItem('patient'));
  const [appointments, setAppointments] = useState([]);
console.log(patient)
  useEffect(() => {
    axios.get(`http://localhost:3001/api/rdv/patient/${patient._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
        .then(response => {
          const appointmentsWithDoctorIds = response.data;
          console.log(response.data)

          // const doctorIds = Array.from(new Set(appointmentsWithDoctorIds.map(appointment => appointment.id_medecin)));

          // Promise.all(doctorIds.map(doctorId =>
          //     axios.get(`http://localhost:3001/api/doctors/getNameDoctorById/${doctorId}`, {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     })
          //         .then(doctorResponse => ({ doctorId, doctorName: doctorResponse.data.name }))
          //         // .catch(doctorError => {
          //         //   console.error(`Error getting doctor's name for ID ${doctorId}:`, doctorError);
          //         //   return { doctorId, doctorName: 'Unknown' };
          //         // })
          // ))
              // .then(doctorNames => {
              //   const doctorMap = Object.fromEntries(doctorNames.map(({ doctorId, doctorName }) => [doctorId, doctorName]));
              //
              //   const appointmentsWithNames = appointmentsWithDoctorIds.map(appointment => ({
              //     ...appointment,
              //     doctorName: doctorMap[appointment.id_medecin],
              //   }));
              //
              //   localStorage.setItem("appointments", JSON.stringify(appointmentsWithNames));
              //
              //   setAppointments(appointmentsWithNames);
              // })
              // .catch(doctorNamesError => {
              //   console.error('Error getting doctor names:', doctorNamesError);
              // });
        })
        .catch(appointmentsError => {
          console.error('Error getting appointments:', appointmentsError);
        });
  }, [token, patient]);

  return (
      <>
        <div className="flex items-center justify-center w-full text-white bg-24b6e1">
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
