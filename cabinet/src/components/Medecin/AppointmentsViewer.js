import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import AnalyseAndTraitement from './AnalyseAndTraitement';
import Header from '../allAppComp/Header';
import Footer from '../allAppComp/Footer';

const AppointmentsViewer = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);
  const [keyForRerender, setKeyForRerender] = useState(0);
  const doctor = JSON.parse(localStorage.getItem('doctor'));
  const accessToken = localStorage.getItem('accessToken');

  const fetchDoctorAppointments = async () => {
    try {      
      const response = await axios.get(`http://localhost:3001/api/doctors/getDoctorAppointments/${doctor._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setAppointments(response.data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const handleNextAppointment = () => {
    if (currentAppointmentIndex < appointments.length - 1) {
      setCurrentAppointmentIndex(currentAppointmentIndex + 1);
      setKeyForRerender((prevKey) => prevKey + 1); 
    }
  };

  const handlePreviousAppointment = () => {
    if (currentAppointmentIndex > 0) {
      setCurrentAppointmentIndex(currentAppointmentIndex - 1);
      setKeyForRerender((prevKey) => prevKey + 1); 
    }
  };

  const appointment = appointments[currentAppointmentIndex];

  return (
    <>
    <Header/>
      <div className="container mx-auto my-8 p-8 border rounded shadow-md">
        <div className="flex justify-between mb-4">
          <button className="bg-24b6e1 font-pacifico text-white font-bold py-2 px-4 rounded">
            Nombre total de consultations {appointments.length}
          </button>
          <button className="bg-24b6e1 font-pacifico text-white font-bold py-2 px-4 rounded">
            Numéro de consultation courante {currentAppointmentIndex + 1}
          </button>
        </div>

        {appointments.length > 0 && (
          <>
            <PatientInfo patientId={appointment?.id_patient} medecinId={doctor._id} accessToken={accessToken} />
            <AnalyseAndTraitement key={keyForRerender} patientId={appointment?.id_patient} accessToken={accessToken} doctorId={appointment?.id_medecin} />
          </>
        )}

        <div className="flex justify-between">
          <button className="bg-24b6e1 text-white font-bold py-2 px-4 rounded" onClick={handlePreviousAppointment}>
            Précédente
          </button>
          <button className="bg-24b6e1 text-white font-bold py-2 px-4 rounded" onClick={handleNextAppointment}>
            Suivante
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AppointmentsViewer;
