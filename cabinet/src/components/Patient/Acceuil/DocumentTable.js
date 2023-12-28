import React from 'react';

const DocumentTable = ({ documents, title, downloadHandler, medecin }) => {
    return (
        <div className='w-1/2 p-4'>
            <h2 className='text-white text-lg font-bold mb-4 font-pacifico text-center bg-cyan-700 rounded-t border-white border-1'>Dernière {title}:</h2>
            {documents.length > 0 ? (
                <table className="table-auto w-full text-white">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Médecin</th>

                    </tr>
                    </thead>
                    <tbody>
                    {documents.map((document, index) => (
                        <tr key={index}>
                            <td className='text-center text-blue-950 font-comicSans'>{new Date(document.date).toLocaleDateString()}</td>
                            <td className='text-center text-blue-950 font-comicSans'>{new Date(document.date).toLocaleTimeString()}</td>
                            <td className='text-center text-blue-950 font-comicSans'>{medecin}</td>
                            <td className='text-center'>
                                <button
                                    onClick={() => downloadHandler(document)}
                                    className='bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
                                >
                                    Télécharger
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune {title.toLowerCase()} disponible.</p>
            )}
        </div>
    );
};

export default DocumentTable;
