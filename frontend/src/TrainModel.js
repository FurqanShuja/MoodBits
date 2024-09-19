import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Import images from the src/images directory
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import image6 from './images/image6.jpg';
import image7 from './images/image7.jpg';
import image8 from './images/image8.jpg';
import image9 from './images/image9.jpg';
import image10 from './images/image10.jpg';
import splashBackground from './images/mainpage.png'; // Import the splash background image

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Fearful'];

const emotionsMapping = {
  Happy: 1,
  Sad: 2,
  Angry: 3,
  Surprised: 4,
  Fearful: 5,
};

function TrainModel() {
  const location = useLocation(); // Access location to get state
  const userEmail = location.state?.userEmail || 'No email provided'; // Fallback if email is undefined
  const [step, setStep] = useState(1); // Step 1: Select issue, Step 2: Show images
  const [selectedIssue, setSelectedIssue] = useState(''); // Selected issue
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image
  const [selectedEmotions, setSelectedEmotions] = useState([]); // Track user selections
  const [isComplete, setIsComplete] = useState(false); // Track if all images are done

  // Handle issue selection
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
  };

  // Handle "Next" button click after selecting an issue
  const handleNext = () => {
    if (selectedIssue) {
      setStep(2); // Move to the image display step
    } else {
      alert('Please select an issue to proceed.');
    }
  };

  // Handle emotion selection for each image
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotions((prev) => {
      const newEmotions = [...prev];
      newEmotions[currentImageIndex] = emotion; // Save selected emotion
      return newEmotions;
    });

    // If the current image is the last one, mark the process as complete
    if (currentImageIndex === images.length - 1) {
      setIsComplete(true); // Mark the end of the training process
    } else {
      setCurrentImageIndex(currentImageIndex + 1); // Move to the next image
    }
  };

  const handleSubmit = async () => {
    try {
      // Ensure selectedEmotions has exactly 10 entries and is properly formatted
      if (selectedEmotions.length !== 10) {
        alert('Please select an emotion for each image.');
        return;
      }

      // Convert emotion names to their numeric equivalents
      const numericEmotions = selectedEmotions.map((emotion) => emotionsMapping[emotion] || 0);

      const response = await axios.post('http://localhost:5000/api/train_model', {
        email: userEmail,
        emotions: numericEmotions,
      });

      alert('Training data submitted successfully!');
    } catch (error) {
      console.error('Error submitting training data:', error);
      alert('Failed to submit training data.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-center"
      style={{ backgroundImage: `url(${splashBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="p-12 w-full max-w-4xl">
        {step === 1 ? (
          // Step 1: Issue Selection
          <div>
            <h2 className="text-4xl font-bold mb-8 text-black">Select an Issue</h2>
            <ul className="space-y-4">
              {['Depression', 'Anxiety', 'Procrastination', 'Stress', 'Burnout'].map((issue) => (
                <li
                  key={issue}
                  onClick={() => handleIssueSelect(issue)}
                  className={`cursor-pointer py-4 text-2xl font-semibold rounded-full border-2 transition duration-300 ${
                    selectedIssue === issue ? 'bg-pink-500 text-white border-pink-500' : 'bg-transparent text-black border-black'
                  }`}
                >
                  {issue}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNext}
              className="mt-8 py-3 px-10 bg-pink-500 text-white text-xl rounded-full border-2 border-black hover:bg-pink-600 transition duration-300"
            >
              Next
            </button>
          </div>
        ) : (
          // Step 2: Image Display with Emotions Selection
          <div>
            <h2 className="text-4xl font-bold mb-8 text-black">Train Model - {selectedIssue}</h2>
            {isComplete ? (
              <button
                onClick={handleSubmit}
                className="mt-8 py-3 px-10 bg-pink-500 text-white text-xl rounded-full border-2 border-black hover:bg-pink-600 transition duration-300"
              >
                Submit
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <img
                    src={images[currentImageIndex]}
                    alt={`image-${currentImageIndex + 1}`}
                    className="mb-6"
                    style={{ width: '400px', height: 'auto', borderRadius: '20px' }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-black">Select the top emotion:</h3>
                <div className="flex justify-center items-center mb-8">
                  <div className="py-4 px-6 rounded-full">
                    {emotions.map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => handleEmotionSelect(emotion)}
                        className="mx-2 text-black text-xl px-6 py-2 rounded-full border-2 border-black bg-light-pink hover:bg-pink-200 transition duration-300"
                        style={{ backgroundColor: '#F8BBD0' }} // Light pink background
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainModel;
