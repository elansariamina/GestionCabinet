import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const DossierPopUp = ({ onclose }) => {
    const token = localStorage.getItem('accessToken');
    const patient = JSON.parse(localStorage.getItem('patient'));
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/rapports/nullContent/${patient._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDocuments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error getting docs:', error);
                setLoading(false);
            });
    }, [patient._id, token]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCompleterClick = async (documentId) => {
        if (!selectedFile) {
            alert('Please select a PDF file.');
            return;
        }

        setLoading(true);

        try {

            const formData = new FormData();
            formData.append('file', selectedFile);


            const response = await axios.put(
                `http://localhost:3001/api/rapports/${documentId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                    },
                }
            );

            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setSelectedFile(null)
            setLoading(false);
            window.location="/home"
        }
    };



    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
                <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col items-start">
                    <button
                        type="button"
                        onClick={onclose}
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
                    <h2 className="text-2xl font-pacifico mb-7 text-blue-900 text-center">Vos Dossiers Incomplets: </h2>

                    {loading ? (
                        <p className="font-pacifico">En cours de traitement ...</p>
                    ) : documents.length > 0 ? (
                        <table className="table-auto w-full text-white">
                            <thead>
                            <tr>
                                <th className="text-#26a7cc font-pacifico p-3">Date</th>
                                <th className="text-#26a7cc font-pacifico p-3">Heure</th>
                                <th className="text-#26a7cc font-pacifico p-3">Médecin</th>
                                <th className="text-#26a7cc font-pacifico p-3">Type</th>
                                <th className="text-#26a7cc font-pacifico p-3"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {documents.map((document) => (
                                <tr key={document._id}>
                                    <td className="text-center text-blue-950 font-comicSans p-3">
                                        {new Date(document.date).toLocaleDateString()}
                                    </td>
                                    <td className="text-center text-blue-950 font-comicSans p-3">
                                        {document.time}
                                    </td>
                                    <td className="text-center text-blue-950 font-comicSans p-3">
                                        {document.id_medecin.name}
                                    </td>
                                    <td className="text-center text-blue-950 font-comicSans p-3">
                                        {document.type}
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(event) => {
                                                handleFileChange(event); // Manually trigger handleFileChange
                                            }}
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                        />
                                        <button
                                            onClick={() => {
                                                if (!loading) {
                                                    fileInputRef.current.click();
                                                }
                                            }}
                                            className="hover:bg-cyan-100 text-blue-900 font-comicSans py-1 px-2 rounded"
                                            disabled={loading}
                                        >
                                            Choose PDF
                                        </button>

                                        {selectedFile &&
                                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                                                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
                                                <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col items-start">
                                        <button className='text-blue-950 font-comicSans ' onClick={()=>handleCompleterClick(document._id)}>
                                            Continuer
                                        </button></div></div>
                                        }

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Aucun dossier incomplet trouvé.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DossierPopUp;
