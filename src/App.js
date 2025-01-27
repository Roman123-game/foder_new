import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 1000) + 1); // Range: 1–1000
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 1000');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const [timeLeft, setTimeLeft] = useState(5); // Timer for hint (5 seconds)
  const [gameOver, setGameOver] = useState(false);

  // Timer for hint
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer
    } else if (timeLeft === 0 && !gameOver) {
      setHint(`Hint: The number is ${targetNumber % 2 === 0 ? 'even' : 'odd'}.`);
    }
  }, [timeLeft, gameOver]);

  // Reset game
  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 1000) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 1000');
    setAttempts(0);
    setHint('');
    setTimeLeft(5);
    setGameOver(false);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else if (userGuess > targetNumber) {
      setMessage('Too high! Try again.');
    } else {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
      setGameOver(true);
    }

    setGuess('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess the Number (Hard Mode)</h1>
        <p>{message}</p>
        <form onSubmit={handleGuess}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            disabled={gameOver}
          />
          <button type="submit" disabled={gameOver}>
            Submit
          </button>
        </form>
        {hint && <p className="hint">{hint}</p>}
        {!gameOver && <p className="timer">Hint in: {timeLeft} seconds</p>}
        {gameOver && (
          <button className="reset-button" onClick={resetGame}>
            Play Again
          </button>
        )}
      </header>
    </div>
  );
}

export default App;