import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RDVPopup = ({ onClose, appointments }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setPatients(response.data);
        } else {
          console.error('Failed to fetch patients');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPatients();

    const uniqueDoctors = Array.from(new Set(appointments.map((appt) => appt.doctor)));
    setDoctors(uniqueDoctors);
  }, [appointments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedPatient || !selectedDoctor) {
        setError('Veuillez choisir un patient et un médecin.');
        return;
      }

      const patientId = selectedPatient._id;
      const doctorId = selectedDoctor._id;

       localStorage.setItem('patient', JSON.stringify(selectedPatient));

       navigate(`/appointment/${doctorId}`);
    } catch (error) {
      setError('Failed to create an appointment. Please try again.');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col items-center w-96">
        <button
          type="button"
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-#26a7cc grounded-lg focus:ring-2 focus:ring-cyan-500.5 hover:bg-cyan-50 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#alert-3"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-pacifico mb-7 text-blue-900 text-center">Créer un rendez-vous</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="patient" className="block text-gray-700 text-sm font-bold mb-2">
              Patient:
            </label>
            <select
              id="patient"
              value={selectedPatient ? selectedPatient._id : ''}
              onChange={(e) => setSelectedPatient(patients.find((p) => p._id === e.target.value))}
              className="border rounded w-full py-2 px-3 font-chalkduster"
            >
              <option value="" disabled>
                Sélectionner un patient
              </option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="doctor" className="block text-gray-700 text-sm font-bold mb-2">
              Médecin:
            </label>
            <select
              id="doctor"
              value={selectedDoctor ? selectedDoctor._id : ''}
              onChange={(e) => setSelectedDoctor(doctors.find((d) => d._id === e.target.value))}
              className="border rounded w-full py-2 px-3 font-chalkduster"
            >
              <option value="" disabled>
                Sélectionner un médecin
              </option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-5ab1d0 w-full"
            >
              Soumettre
            </button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default RDVPopup;
