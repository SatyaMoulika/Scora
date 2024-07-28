import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <label>
        Select Difficulty:
        <select value={difficulty} onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;