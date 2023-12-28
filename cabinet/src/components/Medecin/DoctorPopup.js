import React from 'react'


function DoctorPopup({ onClose, message }) {
    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur z-[1000]">
            <div className="relative bg-white rounded-lg p-8">
                <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto -mx-1.5 -my-1.5 bg-white text-#26a7cc rounded-full absolute top-2 right-6 focus:ring-2 focus:ring-cyan-500.5 hover:bg-cyan-50 inline-flex items-center justify-center h-8 w-8"
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
                <h2 className="text-xl font-dancingScript text-red-400 text-center font-semibold mb-4">Attention!</h2>
                <p className="text-sm font-pacifico text-gray-700">{message}</p>
                
            </div>
        </div>
    )
}

export default DoctorPopup