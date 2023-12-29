import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/style/logo.png';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('patient');
        localStorage.removeItem('doctor');
        localStorage.removeItem('acceuilComponentDisplayed');


        navigate('/');
    };

    const isAuthenticated = localStorage.getItem('accessToken');

    return (
        <div>
            <header className="relative bg-24b6e1 p-3 font-pacifico mb-0">
                <div className="container flex items-center justify-between">
                    <a href="/home">
                        <img
                            src={logo}
                            className="w-14 h-14 absolute top-0 left-0 ml-5 mt-2"
                            alt="Hospital Logo"
                        />
                    </a>
                    <div className="flex space-x-4">
                        {!isAuthenticated && (
                            <>
                                <a href="/">
                                    <button className="text-white bg-24b6e1 px-4 py-2 hover:text-white hover:border-b-2 hover:border-b-white hover:transition hover:duration-300">
                                        Se connecter
                                    </button>
                                </a>
                                <a href="/register">
                                    <button className="text-white bg-24b6e1 px-4 py-2 hover:text-white hover:border-b-2 hover:border-b-white hover:transition hover:duration-300">
                                        S'inscrire
                                    </button>
                                </a>
                            </>
                        )}
                        {isAuthenticated && (
                            <button
                                onClick={handleLogout}
                                className="text-white bg-24b6e1 px-4 py-2 hover:text-white hover:border-b-2 hover:border-b-white hover:transition hover:duration-300"
                            >
                                Déconnecter
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
