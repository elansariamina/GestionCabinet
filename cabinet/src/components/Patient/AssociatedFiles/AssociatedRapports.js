import React, {useEffect, useState} from 'react';
import { ReactComponent as UploadSvg } from '../../../assets/svg/upload.svg';
import { ReactComponent as UploadSvgV } from '../../../assets/svg/uploadV.svg';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Alerts from "../RDV/Alerts";
import * as pdfjs from "react";

function AssociatedRapports() {
  const [selectedAnalyseFile, setSelectedAnalyseFile] = useState(null);
  const [selectedScanFile, setSelectedScanFile] = useState(null);
  const [uploadedAnalyseFiles, setUploadedAnalyseFiles] = useState([]);
  const [uploadedScanFiles, setUploadedScanFiles] = useState([]);
  const [pdfFileAnalyse, setPdfFileAnalyse] = useState(null);
  const [pdfFileScan, setPdfFileScan] = useState(null);
    const location = useLocation();
    const [requestData,setRD]=useState({})
    const token = localStorage.getItem('accessToken');
    const patient = JSON.parse(localStorage.getItem('patient'));
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const requestDataString = searchParams.get('requestData');

        if (requestDataString) {
            setRD(JSON.parse(requestDataString));

        }
    }, [location.search]);

  const handleFileChange = (type, file) => {
    if(type === 'analyse') setSelectedAnalyseFile(file);
    if(type === 'scan') 
    setSelectedScanFile(file);
  };

  const handleFileUpload = (type) => {
    const selectedFile = type === 'analyse' ? selectedAnalyseFile : selectedScanFile;
    if (selectedFile) {
      if(type === 'analyse')(() => {
          const uploadedFiles = [...uploadedAnalyseFiles, selectedFile];
          setUploadedAnalyseFiles(uploadedFiles);
          setSelectedAnalyseFile(null);
        })()
      if(type === 'scan')(() => {
          const uploadedFiles = [...uploadedScanFiles, selectedFile];
          setUploadedScanFiles(uploadedFiles);
          setSelectedScanFile(null);
        })();
    }
  };
  const handlePdfAnalyse = (file) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      setPdfFileAnalyse(e.target.result)
    }
  }
  const handlePdfScan = (file) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      setPdfFileScan(e.target.result)
    }
  }
  const removeFile = (type, index) => {
    if (type === 'analyse') {
      const updatedFiles = [...uploadedAnalyseFiles];
      updatedFiles.splice(index, 1);
      setUploadedAnalyseFiles(updatedFiles);
      setSelectedAnalyseFile(null);
      setPdfFileAnalyse(null)
    }
    if (type === 'scan') {
      const updatedFiles = [...uploadedScanFiles];
      updatedFiles.splice(index, 1);
      setUploadedScanFiles(updatedFiles);
      setSelectedScanFile(null);
      setPdfFileScan(null);
    }
  };

    const saveData = async () => {
        try {
            const reportAnalyse = {
                id_patient: patient._id,
                id_medecin: requestData.id_med,
                date: requestData.date,
                time: requestData.time,
                content: pdfFileAnalyse,
                type: 'Analyse',
            };

            const reportScan = {
                id_patient: patient._id,
                id_medecin: requestData.id_med,
                date: requestData.date,
                time: requestData.time,
                content: pdfFileScan,
                type: 'Scan',
            };
            const [responseAnalyse, responseScan] = await Promise.all([
                axios.post('http://localhost:3001/api/rapports', reportAnalyse, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.post('http://localhost:3001/api/rapports', reportScan, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            if (responseAnalyse.status === 200 && responseScan.status === 200) {
                setMessage("Vos Rapport sont enregistrés!")
            } else {
                setError("Une Erreur est survenue!")
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    const saveDataWithNoDoc = async () => {
        try {
            const reportAnalyse = {
                id_patient: requestData.id_patient,
                id_medecin: requestData.id_med,
                date: requestData.date,
                time: requestData.time,
                content: pdfFileAnalyse,
                type: 'Analyse',
            };


            const reportScan = {
                id_patient: requestData.id_patient,
                id_medecin: requestData.id_med,
                date: requestData.date,
                time: requestData.time,
                content: pdfFileScan,
                type: 'Scan',
            };
            const [responseAnalyse, responseScan] = await Promise.all([
                axios.post('http://localhost:3001/api/rapports', reportAnalyse, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.post('http://localhost:3001/api/rapports', reportScan, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            if (responseAnalyse.status === 200 && responseScan.status === 200) {
                setMessage("N'oubliez pas de revenir pour déposer vos rapports!")
            } else {
                setError("Une Erreur est survenue!")
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
 const closeConfirm = ()=>{
     setError('');
     window.location="/home";
 }

    const closeConfirmAfter = ()=>{
     setMessage('');
        window.location="/home";
    };


    const newplugin = defaultLayoutPlugin()
  return (
    <div className="min-h-screen bg-24b6e1">
        <div className='w-1/3 ml-12 bg-24b6e1 font-pacifico border-2 rounded-2xl p-4 border border-white m-4'>
            <p className='text-xl text-white mb-2'>
                Medecin: <span className='font-normal'>{requestData.doctorName}</span>
            </p>
            <p className='text-xl text-white'>
                Service: <span className='font-normal'>{requestData.service}</span>
            </p>
            <p className='text-xl text-white'>
                Date: <span className='font-normal'>{requestData.date}</span>
            </p>
            <p className='text-xl text-white'>
                Heure: <span className='font-normal'>{requestData.time}</span>
            </p>
        </div>

      <div className="flex text-center p-8 mx-40 font-chalkduster">
        <div className="w-1/2 mr-8 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl  mb-4 text-#26a7cc">Importer vos Analyses</h2>
            <FileInput
                label='analyse'
                onChange={(file) => handleFileChange('analyse', file)}
                selectedFile={selectedAnalyseFile}
                onUpload={() => handleFileUpload('analyse')}
                handle={(file) => handlePdfAnalyse(file)}
            />


        </div>

        <div className="w-1/2 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl text-#26a7cc mb-4">Importer vos Scans</h2>
            <FileInput
                label='scan'
                onChange={(file) => handleFileChange('scan', file)}
                selectedFile={selectedScanFile}
                onUpload={() => handleFileUpload('scan')}
                handle={(file) => handlePdfScan(file)}
            />
        </div>
      </div>
      <div className='mx-12 bg-white p-4 rounded-lg shadow-md'>
        <h3 className='text-lg text-#26a7cc font-pacifico  text-center'>Votre dossier</h3>
        <div className='text-center'>
          
            <FileList title="Vos analyses:" color="blue" />
            {pdfFileAnalyse && (
                <div>
                    <div className='w-3/4 mx-auto my-8 h-60 flex justify-center'>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdfFileAnalyse} plugins={[newplugin]} />
                        </Worker>
                    </div>
                    <button onClick={(index) => removeFile('analyse', index)} className='text-blue-900 border-b-2 border-b-blue-950 font-chalkduster mx-6 p-1 hover:shadow-lg'>Supprimer le fichier</button>
                </div>
            )}
          
            <FileList title="Vos scans:" color="blue" />
            {pdfFileScan && (
              <div>
                <div className='w-3/4 mx-auto my-8 h-60 flex justify-center'>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                <Viewer fileUrl={pdfFileScan} plugins={[newplugin]} />
              </Worker>
              </div>
              <button onClick={(index)=> removeFile('scan', index)} className='text-blue-900 border-b-2 border-b-blue-950 font-chalkduster mx-6 p-1 hover:shadow-lg'>Supprimer le fichier</button>
          </div>
            )}
        </div>
          <div className='justify-center text-center'>
      <button className='bg-#26a7cc hover:bg-cyan-700 text-white p-1 px-2 rounded-full m-1 p-2 rounded-xl  text-center font-comicSans'
       onClick={saveDataWithNoDoc}>Remplir le document plus tard</button>
       <button className='bg-#26a7cc hover:bg-cyan-700 text-white p-1 px-2 rounded-full m-1 p-2 rounded-xl text-center font-comicSans '
       onClick={saveData}>Confirmer</button>
          </div>
          {error && <Alerts type={'error'} message={error} onClose={() => closeConfirm()} />}

          {message && <Alerts type={'success'} message={message} onClose={() => closeConfirmAfter()} />}

      </div>
    </div>
  );
}

const FileList = ({ title, color }) => (
  <div className="mb-2">
    <div className={`flex items-center mx-auto mt-2 mb-2 text-xl font-pacifico text-${color}-500`}>
      <div className={`bg-${color}-500 rounded-full w-2.5 h-2.5 block mr-2`}></div>
      {title}
    </div>
  </div>
);

const FileInput = ({ label, onChange, selectedFile, onUpload, handle }) => (
    <>
        <label htmlFor={label}>
      <span
          className='inline-block p-6 rounded-full hover:shadow-lg transition-transform ease duration-300'
          style={{ display: 'inline-block' }}>
        {label === "analyse" ? <UploadSvg width="120" height="120" className="cursor-pointer text-center" /> : <UploadSvgV width="120" height="120" className="cursor-pointer text-center" />}
      </span>
        </label>

        <input
            type="file"
            id={label}
            className="hidden"
            accept=".pdf"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    handle(file);
                    onChange(file);  // Moved onChange inside the if block
                }
            }}
        />
        {selectedFile && onUpload()} {/* Moved onUpload() inside the conditional rendering */}
    </>
);



    
export default AssociatedRapports;
