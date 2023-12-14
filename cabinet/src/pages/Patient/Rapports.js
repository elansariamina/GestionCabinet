import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

const FileUpload = ({ onFileChange, label, file }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileChange(selectedFile);
  };

  return (
    <div>
      <h3>{label}</h3>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <div>
          {label}: {file.name}
          <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

// const FileViewer = ({ file }) => {
//   return (
//     <div>
//       <h3>PDF Viewer</h3>
//       {file && (
//         <PDFViewer workerUrl={`https://unpkg.com/pdfjs-dist@${process.env.PDFJS_VERSION}/build/pdf.worker.min.js`}>
//           fileUrl={URL.createObjectURL(file)}
//         </PDFViewer>
//       )}
//     </div>
//   );
// };

const FileUploader = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (selectedFile) => {
    setFile1(selectedFile);
  };

  const handleFile2Change = (selectedFile) => {
    setFile2(selectedFile);
  };

  return (
    <div>
      <FileUpload
        label="Upload File 1"
        onFileChange={handleFile1Change}
        file={file1}
      />

      <FileUpload
        label="Upload File 2"
        onFileChange={handleFile2Change}
        file={file2}
      />
{/* 
      <FileViewer file={file1} />
      <FileViewer file={file2} /> */}
    </div>
  );
};

export default FileUploader;
