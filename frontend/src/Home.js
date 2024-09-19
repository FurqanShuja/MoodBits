import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Import your CSS file
import splashBackground from './images/mainpage.png'; // Replace with the correct path to your image

const Home = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-center"
      style={{ backgroundImage: `url(${splashBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="p-16 w-full max-w-4xl"> {/* Increased padding and container width */}
        <h1 className="text-4xl font-bold mb-10 text-black" style={{ marginTop: '-50px' }}> {/* Made the text bigger and moved up */}
          Welcome to <span className="text-6xl text-pink-500">MoodBits</span>
        </h1>
        <p className="mb-12 text-lg text-gray-800 px-10"> {/* Increased padding on left/right and font size */}
          MoodBits makes mental well-being easier and more affordable. Our service
          quickly identifies the root of your emotional challenges and provides
          personalized daily mantras to help you improve. Medically tested and effective—
          experience better mental health on the go with MoodBits.
        </p>
        <div className="space-y-4 flex flex-col w-full max-w-md mx-auto">
          <Link to="/register" className="w-full">
            <button className="w-full py-4 bg-pink-500 text-white rounded-full border-2 border-black hover:bg-pink-600 transition duration-300 text-xl">
              Register
            </button>
          </Link>
          <Link to="/login" className="w-full">
            <button className="w-full py-4 bg-pink-500 text-white rounded-full border-2 border-black hover:bg-pink-600 transition duration-300 text-xl">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
