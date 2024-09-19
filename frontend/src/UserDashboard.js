import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import splashBackground from './images/mainpage.png'; // Import the background image

function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};  // Extract userEmail from state

  const handleTrainModel = () => {
    if (userEmail) {
      navigate('/train-model', { state: { userEmail } });  // Pass userEmail through state
      alert(`Logged in as: ${userEmail}`);
    } else {
      alert('No email found.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${splashBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="p-12 w-full max-w-4xl text-center">
        <h2 className="text-5xl font-bold mb-10 text-black">Welcome to your Dashboard</h2>
        <p className="mb-8 text-2xl text-gray-800">Logged in as: {userEmail || 'Guest'}</p>

        <div className="space-y-4 flex flex-col w-full max-w-md mx-auto">
          <button
            onClick={handleTrainModel}
            className="w-full py-4 bg-pink-500 text-white rounded-full border-2 border-black hover:bg-pink-600 transition duration-300 text-xl"
          >
            Train Model
          </button>
          <button
            onClick={() => navigate('/generate-mantra')}
            className="w-full py-4 bg-pink-500 text-white rounded-full border-2 border-black hover:bg-pink-600 transition duration-300 text-xl"
          >
            Generate Mantra
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
