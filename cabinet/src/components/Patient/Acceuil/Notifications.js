import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Notifications({ onClose }) {
  const token = localStorage.getItem('accessToken');
  const patient = JSON.parse(localStorage.getItem('patient'));
  const [notifications, setNotifications] = useState([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rdv/patient/${patient._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        // Handle other errors, such as network issues
      }
    };

    fetchAppointments();
  }, [patient._id, token, notifications]);
  console.log(notifications);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [notifications]);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  // Filter appointments for the next 7 days
  const filteredAppointments = notifications.filter((notification) => {
    const appointmentDate = new Date(notification.date);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return appointmentDate <= sevenDaysFromNow;
  });

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-4 flex items-center">
        <div className="flex-grow">
          {filteredAppointments.map((notification) => (
            <div
              key={notification._id}
              className="flex justify-between items-center py-2 px-4 bg-cyan-100 m-1"
            >
              <div className="font-pacifico text-blue-900 rounded-2xl">
                Rappel: Votre rendez-vous avec {notification.id_medecin.name} de
                la spécialité {notification.id_medecin.spe} est le{' '}
                {notification.date} à {notification.time}, assurez-vous que
                votre dossier médical est complet!
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Notifications;
