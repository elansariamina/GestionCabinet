import React from 'react';

const InfoPerso = () => {
    const patient = JSON.parse(localStorage.getItem('patient'));

    return (
        <div className="ml-10 mr-10 grid grid-cols-4 gap-4 p-8 bg-24b6e1 rounded-2xl text-white text-center ">
            <div className="flex flex-col items-center justify-center  bg-cyan-700 rounded h-24">
                <p className="font-bold">Name:</p>
                <p>{patient.name}</p>
            </div>
            <div className="flex flex-col items-center justify-center  bg-cyan-700 rounded h-24">
                <p className="font-bold">Telephone:</p>
                <p>{patient.tel}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-cyan-700 rounded h-24">
                <p className="font-bold">CIN:</p>
                <p>{patient.cin}</p>
            </div>
            <div className="flex flex-col items-center justify-center  bg-cyan-700 rounded h-24">
                <p className="font-bold">Email:</p>
                <p>{patient.email}</p>
            </div>
        </div>
    );
};

export default InfoPerso;
