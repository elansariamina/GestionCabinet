import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import RDVCard from './RDVCard';
import ConfirmRDV from './ConfirmRDV';

import Header from '../allAppComp/Header';
import Footer from '../allAppComp/Footer';

const Assistant = () => {
  const assistantString = localStorage.getItem('assistant');
  const assistant = JSON.parse(assistantString);
  const spe = assistant ? assistant.spe : '';
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsToBeConfirmed, setAppointmentsToBeConfirmed] = useState([]);
  const [distinctPatientsCount, setDistinctPatientsCount] = useState(0);
  const accessToken = localStorage.getItem('accessToken');

  const fetchDoctorsBySpe = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/doctors/findDoctorsBySpe/${spe}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setDoctors(response.data);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAppointmentsByDoctorsIds = async (doctorIds) => {
    try {
      const response = await axios.post('http://localhost:3001/api/rdv/doctor/findAppointmentsByDoctorsIds', { doctorIds }, {
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

  const fetchAppointmentsToBeConfirmed = async (doctorIds) => {
    try {
      const response = await axios.post('http://localhost:3001/api/rdv/doctor/findAppointmentsToBeConfirmed', { doctorIds }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setAppointmentsToBeConfirmed(response.data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDistinctPatientsCountForDoctor = async (id_medecin) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/rdv/distinctCount/${id_medecin}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 200) {
        setDistinctPatientsCount(response.data.count);
      } else {
        console.error('Failed to fetch distinct patients count for a doctor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDoctorsBySpe();
  }, []);

  useEffect(() => {
    const doctorIds = doctors.map((doctor) => doctor._id);
    fetchAppointmentsByDoctorsIds(doctorIds);
    fetchAppointmentsToBeConfirmed(doctorIds);
    fetchDistinctPatientsCountForDoctor(doctorIds);
  }, [doctors]);

  return (
    <>
      <Header />
      <div>
        <div className="m-10 p-8 border rounded shadow-md">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold mb-4">Liste RDVs d'aujourd'hui</h1>
          </div>
          <div>
            {appointments.map((entry) => {
              const { doctor, appointments: doctorAppointments } = entry;
              const hasAppointments = doctorAppointments && doctorAppointments.length > 0;

              if (hasAppointments) {
                return (
                  <div key={doctor._id} className="border p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-2">{doctor.name}</h2>
                    <div className="flex">
                      {doctorAppointments.map((appt) => (
                        <RDVCard key={appt._id} appointment={appt} />
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="m-10 p-8 border rounded shadow-md">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold mb-4">Liste RDVs à confirmer</h1>
          </div>
          <div>
            {appointmentsToBeConfirmed.map((entry) => {
              const { doctor, appointments: doctorAppointments } = entry;
              const hasAppointments = doctorAppointments && doctorAppointments.length > 0;

              if (hasAppointments) {
                return (
                  <div key={doctor._id} className="border p-4 rounded shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">{doctor.name}</h2>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-1 text-blue-500" />
                        <p className="text-lg font-semibold">{distinctPatientsCount} Patients</p>
                      </div>
                    </div>
                    <div className="flex">
                      {doctorAppointments.map((appt) => (
                        <ConfirmRDV key={appt._id} appointment={appt} />
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Assistant;
