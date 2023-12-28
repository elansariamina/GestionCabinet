import React from 'react';


    const Alerts = ({ type, message, onClose }) => {
        const closeAlert = () => {
            onClose();
        };
    return (
        <div>
            {type === "error" &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="relative p-50 rounded-md shadow-md z-10 bg-transparent cursor-pointer">
            <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 " role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-comicSans">
                    {message}
                </div>
                <button type="button"
                        onClick={closeAlert}
                        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8  " data-dismiss-target="#alert-2" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div></div></div>}
            {type=== "success" &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="relative p-50 rounded-md shadow-md z-10 bg-transparent cursor-pointer">
            <div id="alert-3" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-comicSans">
                    {message}
                </div>
                <button type="button"
                        onClick={closeAlert}
                        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-3" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div></div></div>}

        </div>
    );
};

export default Alerts;