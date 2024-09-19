import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import splashBackground from './images/mainpage.png'; // Replace with the correct path to your image

function GenerateMantra() {
  const [mantra, setMantra] = useState('');  // Store the generated mantra
  const [loading, setLoading] = useState(false);  // Loading state for button
  const [error, setError] = useState(null);  // Error state

  // Function to handle mantra generation
  const handleGenerateMantra = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate_mantra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'user@example.com' }),  // Replace with actual user email
      });

      const data = await response.json();
      if (response.ok) {
        setMantra(data.mantra);  // Set the generated mantra
      } else {
        setError(data.error || 'Error generating mantra');
      }
    } catch (err) {
      setError('An error occurred while fetching the mantra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-center"
      style={{ backgroundImage: `url(${splashBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="p-16 w-full max-w-4xl"> {/* Increased padding and container width */}
        <h2 className="text-3xl font-bold mb-8 text-black">
          Generate a Mantra
        </h2>
        <button 
          onClick={handleGenerateMantra} 
          disabled={loading} 
          className="w-full py-4 bg-pink-500 text-white rounded-full border-2 border-black hover:bg-pink-600 transition duration-300 text-xl"
        >
          {loading ? 'Generating...' : 'Generate Mantra'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {mantra && (
          <div className="border-2 border-black rounded-lg p-8 mt-6 bg-white text-black">
            <p className="text-xl">{mantra}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateMantra;
