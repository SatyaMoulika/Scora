// import React, { useState } from 'react';
// import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
// import QuestionDisplay from './components/QuestionDisplay';
// import FileUploader from './components/FileUploader';
// import DifficultySelector from './components/DifficultySelector';
// import NumberOfQuestionsInput from './components/NumberOfQuestionsInput';
// import './App.css';

// function App() {
//   const [generatedQuestions, setGeneratedQuestions] = useState([]);
//   const [difficulty, setDifficulty] = useState('easy');
//   const [numberOfQuestions, setNumberOfQuestions] = useState(1);
//   const navigate = useNavigate();

//   const handleFileUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('difficulty', difficulty);
//     formData.append('numberOfQuestions', numberOfQuestions);

//     try {
//       const response = await axios.post('http://localhost:8000/api/questions/generate', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setGeneratedQuestions(response.data.questions);
//       navigate('/questions');
//     } catch (error) {
//       console.error('Error generating questions:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Question Bank Generator</h1>
//       <div className="flex-container">
//         <div className="flex-item">
//           <NumberOfQuestionsInput numberOfQuestions={numberOfQuestions} setNumberOfQuestions={setNumberOfQuestions} />
//         </div>
//         <div className="flex-item">
//           <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
//         </div>
//       </div>
//       <div className="file-uploader">
//         <FileUploader onFileUpload={handleFileUpload} />
//       </div>
//       <QuestionDisplay generatedQuestions={generatedQuestions} />
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QuestionDisplay from './components/QuestionDisplay';
import FileUploader from './components/FileUploader';
import DifficultySelector from './components/DifficultySelector';
import NumberOfQuestionsInput from './components/NumberOfQuestionsInput';
import './App.css';

function App() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('number_of_questions', numberOfQuestions); // Ensure consistent naming with the backend

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
                  <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
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
    </div>
  );
}

export default App;

