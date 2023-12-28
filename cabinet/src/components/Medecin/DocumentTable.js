import React from 'react';

const DocumentTable = ({ documents, title, downloadHandler }) => {
  return (
    <div className="w-1/2 p-4">
      <h2 className="text-xl font-bold mb-4 font-pacifico">{title}:</h2>
      {documents.length > 0 ? (
        <table className="table-auto w-full text-#26a7cc">
          <tbody>
            {documents.map((document, index) => (
              <tr key={index}>
                <td className="text-center text-blue-950 font-comicSans">
                  {new Date(document.date).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => downloadHandler(document)}
                    className="bg-#26a7cc hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full"
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
