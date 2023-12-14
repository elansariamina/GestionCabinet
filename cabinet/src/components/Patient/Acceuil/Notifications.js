import React, { useState, useEffect, useRef, useMemo } from 'react';

function Notifications() {
  const storedAppointments = localStorage.getItem('appointments');
  const parsedAppointments = useMemo(() => JSON.parse(storedAppointments) || [], [storedAppointments]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const isInitialRender = useRef(true);

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
        message: `Veuillez compléter votre dossier avec le ${appointment.doctorName} le ${appointment.date} à ${appointment.time} si vous avez des analyses à ajouter.`,
      }));

      return newNotifications;
    } catch (error) {
      console.error('Error generating notifications:', error);
      return [];
    }
  };

  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');

    if (storedNotifications && !isInitialRender.current) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      const newNotifications = generateNotifications(parsedAppointments);
      setNotifications(newNotifications);
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
    }
  }, [parsedAppointments]);

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

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleRemoveNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };
  return (
    <div className="fixed bottom-6 right-6">
      <div className="relative inline-flex w-fit">
        <div
          className="group transition-all duration-300 ease-in-out cursor-pointer"
          onClick={handleToggleNotifications}
        >
          {showNotifications ? null : (
            <div className="absolute bottom-auto left-0 right-auto top-0 z-10 inline-block -translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2.5 text-xs">
              <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 bg-pink-700 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                { JSON.parse(localStorage.getItem("notifications")).length > 99 ? '99+' : JSON.parse(localStorage.getItem("notifications")).length}
              </div>
            </div>
          )}
          <div className="flex items-center justify-center rounded-lg bg-indigo-400 px-8 py-6 text-center text-white shadow-lg dark:text-gray-200 transition-all duration-300 ease-in-out transform group-hover:translate-y-1 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {showNotifications && (
          <div className="absolute bottom-12 right-0 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="py-2 px-4">
              {notifications.length === 0 ? (
                <div className="italic text-center text-gray-500">
                  Pas de notification à ce moment, veuillez revenir plus tard.
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={index} className="flex justify-between items-center py-2 px-4">
                    <div className='italic'>{notification.message}</div>
                    <div className="cursor-pointer" onClick={() => handleRemoveNotification(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-red-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.85 6.35a.5.5 0 01.7.7L11.71 12l4.84 4.85a.5.5 0 01-.7.7L11 12.71 6.15 17.56a.5.5 0 11-.7-.7L10.29 12 5.15 7.15a.5.5 0 01.7-.7L11 11.29l4.85-4.84z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
