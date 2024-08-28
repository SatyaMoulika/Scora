import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';
import QuestionDisplay from './components/QuestionDisplay';
import FileUploader from './components/FileUploader';
import DifficultySelector from './components/DifficultySelector';
import NumberOfQuestionsInput from './components/NumberOfQuestionsInput';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('Knowledge');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('number_of_questions', numberOfQuestions);
  
    // Log each formData entry to ensure they are correct
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    try {
      const response = await axios.post('http://localhost:8000/api/questions/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setGeneratedQuestions(response.data.questions);
      navigate('/questions');
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <h1>Question Bank Generator</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex-container">
                <div className="flex-item">
                  <NumberOfQuestionsInput numberOfQuestions={numberOfQuestions} setNumberOfQuestions={setNumberOfQuestions} />
                </div>
                <div className="flex-item">
                  <div className="difficulty-container">
                    <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
                    <button onClick={openModal} className="show-description-button">i</button>
                  </div>
                </div>
              </div>
              <div className="file-uploader">
                <FileUploader onFileUpload={handleFileUpload} />
              </div>
            </>
          }
        />
        <Route path="/questions" element={<QuestionDisplay generatedQuestions={generatedQuestions} />} />
      </Routes>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;