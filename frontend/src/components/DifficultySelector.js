import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <label>
        Cognitive Level:
        <select value={difficulty} onChange={handleChange}>
          <option value="Knowledge">Knowledge</option>
          <option value="Comprehension">Comprehension</option>
          <option value="Application">Application</option>
          <option value="Analysis">Analysis</option>
          <option value="Synthesis">Synthesis</option>
          <option value="Evaluation">Evaluation</option>

        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;