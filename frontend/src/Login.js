import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './App.css'; // Import your CSS file
import splashBackground from './images/mainpage.png'; // Replace with the correct path to your image

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        // Pass the email to UserDashboard using state
        navigate('/dashboard', { state: { userEmail: email } });
        alert(`Logged in as: ${email}`);
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-center"
      style={{ backgroundImage: `url(${splashBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="p-16 w-full max-w-lg bg-white bg-opacity-90 rounded-lg">
        <h1 className="text-5xl font-bold mb-10 text-black" style={{ marginTop: '-30px' }}>
          Login to <span className="text-pink-500">MoodBits</span>
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full py-3 px-4 text-lg border-2 border-black rounded-full focus:outline-none focus:border-pink-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full py-3 px-4 text-lg border-2 border-black rounded-full focus:outline-none focus:border-pink-500"
            required
          />
          <button type="submit" className="w-full py-4 bg-pink-500 text-white rounded-full border-2 border-black hover:bg-pink-600 transition duration-300 text-xl">
            Login
          </button>
        </form>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
