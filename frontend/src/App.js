// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; 
import Login from './Login';
import Register from './Register';
import UserDashboard from './UserDashboard'; // Import UserDashboard
import TrainModel from './TrainModel'; // Import TrainModel component
import GenerateMantra from './GenerateMantra'; // Import GenerateMantra component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} /> {/* Route to dashboard */}
          <Route path="/train-model" element={<TrainModel />} /> {/* Route for Train Model */}
          <Route path="/generate-mantra" element={<GenerateMantra />} /> {/* Route for Generate Mantra */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
