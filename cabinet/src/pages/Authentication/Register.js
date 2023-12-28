import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundGif from '../../assets/style/doc.png';
import Header from "../../components/allAppComp/Header";
import Footer from "../../components/allAppComp/Footer";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [cin, setCin] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        email,
        password,
        name,
        tel,
        cin,
      });

      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response.data.error);
    }
  };

  return (
      <div className="flex flex-col h-screen bg-24b6e1">
        <Header />
        <div className="flex flex-grow bg-24b6e1 p-5 text-564c5d">
          <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundGif})` }}>
            {/* Background Image */}
          </div>

          {/* Form Container */}
          <div className="bg-gray-100 p-8 rounded-3xl shadow-md text-564c5d w-1/2">
            <h2 className="text-2xl font-pacifico mb-4 text-blue-950 text-center">Register</h2>
            <form onSubmit={handleRegistration}>
              <div className="mb-4">
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
                  S'enregistrer
                </button>

              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
  );
};

export default Register;
