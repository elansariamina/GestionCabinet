import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../../assets/style/login.gif';
import Header from "../../components/allAppComp/Header";
import Footer from "../../components/allAppComp/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      const { role } = response.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('role', role);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      if (role === 'patient') {
        const { patient } = response.data;
        localStorage.setItem('patient', JSON.stringify(patient));
        navigate('/home');
      } else if (role === 'doctor') {
        const { doctor } = response.data;
        localStorage.setItem('doctor', JSON.stringify(doctor));
        navigate('/doctorAppointments');
      } else if (role === 'assistant') {
        const { assistant } = response.data;
        localStorage.setItem('assistant', JSON.stringify(assistant));
        navigate('/assistant');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response.data.error);
    }
  };

  return (
      <div>
        <Header />
      <div
          className="flex h-screen font-chalkduster"
          style={{
            background: 'linear-gradient(to bottom right, #ffffff 0.65px, #24b6e1 0.65px)',
          }}
      >
        {/* GIF Container */}
        <div className="flex items-center justify-center flex-1 ">
          <img src={image} alt="Your GIF" className="max-w-full max-h-full" />
        </div>

        {/* Form Container */}
        <div className="flex items-center justify-center flex-1">
          <div className="bg-gray-100 p-8 rounded-3xl shadow-md w-96 text-564c5d">
            <h2 className="text-2xl font-pacifico mb-4 text-blue-950 text-center">Se connecter</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                    className="border rounded w-full py-2 px-3"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Mot de passe:
                </label>
                <input
                    className="border rounded w-full py-2 px-3"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-f58b61">{error}</p>

              <div className="flex justify-center">
                <button
                    className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-5ab1d0"
                    type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        <Footer />
      </div>
  );
};

export default Login;

