import React from 'react';

const AppointmentTable = ({ data }) => {
    return (
            <div className='w-2/3 p-4'>
                <h2 className='text-white text-lg font-bold mb-4 font-pacifico text-center bg-cyan-700 rounded-t border-white border-1'>Prochain rendez-vous:</h2>
                {data.length > 0 ? (
                    <table className="table-auto w-full text-white">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Medecin</th>
                            <th>Service</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(appointment => (
                            <tr key={appointment._id}>
                                <td className='text-center text-blue-950 font-comicSans'>{appointment.date}</td>
                                <td className='text-center text-blue-950 font-comicSans'>{appointment.time}</td>
                                <td className='text-center text-blue-950 font-comicSans'>{appointment.id_medecin.name}</td>
                                <td className='text-center text-blue-950 font-comicSans'>{appointment.id_medecin.spe}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun rendez-vous à venir.</p>
                )}
            </div>

    );
};

export default AppointmentTable;