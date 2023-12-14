import React from 'react';
import appointmentImage from './../../../assets/images/rdv.png';

function RDVCard({ doctorName, date, time }) {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-4 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-center">
          <div className="flex-shrink-0">
            <img className="mb-4 rounded-lg w-40 h-40" src={appointmentImage} alt="Appointment" />
            <h5 className="italic mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{doctorName}</h5>
            <p className="italic mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">Date: {date}</p>
            <p className="italic mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">Time: {time}</p>
            <a
              href="#"
              className="italic inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform duration-300 transform hover:translate-y-1"
            >
              Compléter votre dossier
              <svg className="rtl:rotate-180 w-3 h-3 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RDVCard;
