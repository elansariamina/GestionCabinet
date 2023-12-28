import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Alerts from "../RDV/Alerts";

const InfoPopUp = ({onclose}) => {
    const patient = JSON.parse(localStorage.getItem('patient'));
    const [email, setEmail] = useState(patient.email);
    const [password, setPassword] = useState(patient.password);
    const [name, setName] = useState(patient.name);
    const [tel, setTel] = useState(patient.tel);
    const [cin, setCin] = useState(patient.cin);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('accessToken');

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
           const newPatient = await axios.put(`http://localhost:3001/api/patients/${patient._id}`, {
                email,
                password,
                name,
                tel,
                cin,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            localStorage.setItem('patient', JSON.stringify(newPatient.data));
            setMessage("Vos informations sont modifiés")



        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.response.data.error);
        }
    };
    return (
        <div>

            <div>
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col items-center">
                        <button
                            type="button"
                            onClick={onclose}
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-pacifico mb-7 text-blue-900 text-center">Modifiez vos informations personnelles: </h2>
                        <form onSubmit={handleUpdate} className="w-full max-w-md">
                            <div className="justify-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 font-chalkduster"
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 font-chalkduster"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name:
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 font-chalkduster"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
                                    Phone:
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 font-chalkduster"
                                    type="text"
                                    id="tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cin">
                                    CIN:
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 font-chalkduster"
                                    type="text"
                                    id="cin"
                                    value={cin}
                                    onChange={(e) => setCin(e.target.value)}
                                />
                            </div>
                            <p className=" text-564c5d font-pacifico">{error}</p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-5ab1d0 "
                                    type="submit"
                                >
                                    Modifier
                                </button>
                                {message !== '' && <Alerts type={'success'} message={message} onClose={() => {
                                    setMessage('')
                                    onclose();
                                }} />}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPopUp;