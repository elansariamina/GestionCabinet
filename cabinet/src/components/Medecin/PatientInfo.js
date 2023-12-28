import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentTable from "./DocumentTable";

const PatientInfo = ({ patientId, medecinId, accessToken }) => {
  const [patient, setPatient] = useState(null);
  const [analyse, setAnalyse] = useState([]);
  const [scan, setScan] = useState([]);
  const [rapport, setRapport] = useState([]);

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

  const downloadFile = (data, fileName, fileType) => {
    const blob = new Blob([new Uint8Array(data.data)], { type: fileType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const fetchPatientRapports = async () => {
    try {
      
      const currentDate = new Date();
      const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      const response = await axios.get(`http://localhost:3001/api/rapports?id_patient=${patientId}&id_medecin=${medecinId}&date=${date}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 200) {
        const responseData = response.data;

        const analyseData = responseData.filter(item => item.type === 'Analyse');
        const scanData = responseData.filter(item => item.type === 'Scan');
  
        setAnalyse(analyseData);
        setScan(scanData);
        
      } else {
        console.error('Failed to fetch rapports');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const fetchPatientArchive = async () => {
    try {
      
      const currentDate = new Date();
      const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      const response = await axios.get(`http://localhost:3001/api/rapports/archive?id_patient=${patientId}&id_medecin=${medecinId}&date=${date}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 200) {
        const responseData = response.data;
        
        setRapport(responseData);
        
      } else {
        console.error('Failed to fetch rapports');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientInfo();
      fetchPatientRapports();
      fetchPatientArchive();
    }
  }, [patientId]);

  return (
    <div>
      {patient && (
        <div className='m-8 p-4 rounded-lg' style={{ boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.3)' }}>
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
          <div className="flex">
            <DocumentTable
              documents={analyse}
              title='Analyse'
              downloadHandler={(doc) => downloadFile(doc.content, 'analyse.pdf', 'application/pdf')}
            />
            <DocumentTable
              documents={scan}
              title='Scan'
              downloadHandler={(doc) => downloadFile(doc.content, 'scan.pdf', 'application/pdf')}
            />
          </div>
          <DocumentTable
                    documents={rapport}
                    title='Archive'
                    downloadHandler={(doc) => downloadFile(doc.content, 'rapport.pdf', 'application/pdf')}
                />
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
