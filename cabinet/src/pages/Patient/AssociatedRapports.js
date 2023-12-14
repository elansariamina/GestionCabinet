import React, { useState } from 'react';
import { ReactComponent as UploadSvg } from './../../assets/svg/upload.svg';
import { ReactComponent as UploadSvgV } from './../../assets/svg/uploadV.svg';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function AssociatedRapports() {
  const [selectedAnalyseFile, setSelectedAnalyseFile] = useState(null);
  const [selectedScanFile, setSelectedScanFile] = useState(null);
  const [uploadedAnalyseFiles, setUploadedAnalyseFiles] = useState([]);
  const [uploadedScanFiles, setUploadedScanFiles] = useState([]);
  const [pdfFileAnalyse, setPdfFileAnalyse] = useState(null);
  const [pdfFileScan, setPdfFileScan] = useState(null);

  const handleFileChange = (type, file) => {
    console.log(type);
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
  
const newplugin = defaultLayoutPlugin()
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-owngreen text-white p-4">
        <p className="text-xl text-black font-semibold">Service: Service choisi</p>
        <p className="text-lg text-black">Medecin: Dr.Doctor choisi</p>
        <p className="text-lg text-black">Rendez-vous: 07/08/2024 15h30</p>
      </div>

      <div className="flex text-center p-8 mx-40">
        <div className="w-1/2 mr-8 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Importer vos Analyses</h2>
          <FileInput
            label='analyse'
            onChange={(file) => handleFileChange('analyse', file)}
            selectedFile={selectedAnalyseFile}
            onUpload={() => handleFileUpload('analyse')}
            handle = {(file) => handlePdfAnalyse(file)}
          />
        </div>

        <div className="w-1/2 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Importer vos Scans</h2>
          <FileInput
            label='scan'
            onChange={(file) => handleFileChange('scan', file)}
            selectedFile={selectedScanFile}
            onUpload={() => handleFileUpload('scan')}
            handle = {(file) => handlePdfScan(file)}
          />
        </div>
      </div>
      <div className='mx-12 bg-white p-4 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold text-center'>Votre dossier</h3>
        <div className='text-center'>
          
            <FileList title="Vos analyses:" color="green" />
          {pdfFileAnalyse && (
            <div>
          <div className='w-3/4 mx-auto my-8 h-60 flex justify-center'>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                <Viewer fileUrl={pdfFileAnalyse} plugins={[newplugin]} />
              </Worker>
              </div>
              <button onClick={(index) => removeFile('analyse', index)} className='text-black border-b-2 border-red-500 font-bold mx-6 p-1 hover:shadow-lg'>Supprimer le fichier</button>
            </div>
            )}
          
            <FileList title="Vos scans:" color="purple" />
            {pdfFileScan && (
              <div>
                <div className='w-3/4 mx-auto my-8 h-60 flex justify-center'>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                <Viewer fileUrl={pdfFileScan} plugins={[newplugin]} />
              </Worker>
              </div>
              <button onClick={(index)=> removeFile('scan', index)} className='text-black border-b-2 border-red-500 font-bold mx-6 p-1 hover:shadow-lg'>Supprimer le fichier</button>
          </div>
            )}
        </div>
       <a href='/'><button className='bg-black text-white p-1 px-2 rounded-full m-1'>Remplir le document plus tard</button></a>
       <button className='bg-black text-white p-1 px-2 rounded-full m-1'>Confirmer</button>
      </div>
    </div>
  );
}

const FileList = ({ title, color }) => (
  <div className="mb-2">
    <div className={`flex items-center mx-auto mt-2 mb-2 text-xl font-bold text-${color}-500`}>
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
        if(file){
          handle(file);
        }
        if (!selectedFile) {
          onChange(file);
        } else {
          alert(`You have already selected a file for ${label}. Please upload it first.`);
        }
      }}
    />
    {onUpload()}
  </>
);


    
export default AssociatedRapports;
