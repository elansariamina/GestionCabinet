import React from 'react';

const AlertPatient = ({ onClose, message }) => {
    const generateNotifications = (appointments) => {
        try {
            const currentDate = new Date();
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(currentDate.getDate() + 7);

            const upcomingAppointments = appointments.filter(appointment => {
                const appointmentDate = new Date(appointment.date);
                return appointmentDate >= currentDate && appointmentDate <= sevenDaysFromNow;
            });

            const newNotifications = upcomingAppointments.map(appointment => ({
                message: `Rappel: Votre rendez-vous avec ${appointment.doctorName} est  le ${appointment.date} à ${appointment.time},assurez-vous que votre dossier medical est complet!`,
            }));

            return newNotifications;
        } catch (error) {
            console.error('Error generating notifications:', error);
            return [];
        }
    };
    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-4 flex items-center">
                <p className="flex-grow text-sm font-pacifico text-gray-700">chi haja</p>
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-4 bg-white text-#26a7cc grounded-lg focus:ring-2 focus:ring-cyan-500.5 hover:bg-cyan-50 inline-flex items-center justify-center h-8 w-8"
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
};

export default AlertPatient;
