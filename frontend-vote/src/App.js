import React, { useState } from 'react';
import './App.css';

const questions = [
  "Did you enjoy this past Fun Friday event?",
  "Was the activity engaging and fun for you?",
  "Do you think the event was well-organized?",
  "Would you like to participate in similar events in the future?"
];

function App() {
  const [answers, setAnswers] = useState(Array(4).fill(null));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    alert('Thank you for your feedback!');
  };

  return (
    <div className="container">
      <h1>Fun Friday Feedback</h1>
      <div className="branding">Workmates</div>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
          <button onClick={() => handleChange(i, 'yes')}>Yes</button>
          <button onClick={() => handleChange(i, 'no')}>No</button>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;