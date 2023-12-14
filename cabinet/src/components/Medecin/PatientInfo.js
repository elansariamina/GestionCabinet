import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientInfo = ({ patientId, accessToken }) => {
  const [patient, setPatient] = useState(null);

  const fetchPatientInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setPatient(response.data);
      } else {
        console.error('Failed to fetch patient information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientInfo();
    }
  }, [patientId]);

  return (
    <div>
      {patient && (
        <div className="bg-white p-6 rounded shadow-md mb-4">
          <h2 className="text-xl font-bold mb-4">Patient en cours</h2>
          <p>
            <span className="font-bold">Name:</span> {patient.name}
          </p>
          <p>
            <span className="font-bold">Tel:</span> {patient.tel}
          </p>
          <p>
            <span className="font-bold">CIN:</span> {patient.cin}
          </p>
          <p>
            <span className="font-bold">Email:</span> {patient.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
