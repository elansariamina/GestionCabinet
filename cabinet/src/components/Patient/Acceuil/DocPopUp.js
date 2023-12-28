import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocPopUp = ({ onclose,type }) => {
    const token = localStorage.getItem('accessToken');
    const patient = JSON.parse(localStorage.getItem('patient'));
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/doctors/medDoc/${patient._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const doc = response.data;
                const newestDocument = doc
                    .filter(item => item.type === type);
                setDocuments(newestDocument);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error getting docs:', error);
                setLoading(false);
            });
    }, [patient._id, documents]);

    const downloadFile = (document) => {
        const { content, date } = document;
        const fileName = `${type}_${new Date(date).toLocaleDateString()}.pdf`;
        const blob = new Blob([new Uint8Array(content.data)], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
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
                    <h2 className="text-2xl font-pacifico mb-7 text-blue-900 text-center">Vos {type}s: </h2>

                    {loading ? (
                        <p className="font-pacifico">En cours de traitement ...</p>
                    ) : documents.length > 0 ? (
                        <table className="table-auto w-full text-white">
                            <thead>
                            <tr>
                                <th className="text-#26a7cc font-pacifico p-3">Date</th>
                                <th className="text-#26a7cc font-pacifico p-3">Heure</th>
                                <th className="text-#26a7cc font-pacifico p-3">Médecin</th>
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
                                        {new Date(document.date).toLocaleTimeString()}
                                    </td>
                                    <td className="text-center text-blue-950 font-comicSans p-3">
                                        {document.doctorId.name}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => downloadFile(document)}
                                            className="hover:bg-cyan-100 text-blue-900 font-comicSans py-1 px-2 rounded"
                                        >
                                            Télécharger
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No {type}s found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocPopUp;
