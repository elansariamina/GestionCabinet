import React from 'react';


const Greetings = () => {
    // Retrieve patient data from local storage and parse it
    const patient = JSON.parse(localStorage.getItem('patient'));

    if (!patient) {
        return (
            <div className='bg-24b6e1 font-pacifico'>
                <p>No patient data found.</p>
            </div>
        );
    }

    return (
        <div className='bg-24b6e1 font-pacifico text-white text-2xl flex items-center pl-20 pt-5 pb-5'>
            <p className="mr-2">Bonjour </p>
            <p className='text-blue-950'>{patient.name} </p>!

        </div>
    );
};

export default Greetings;
