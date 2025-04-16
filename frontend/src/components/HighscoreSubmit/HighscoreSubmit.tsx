import { useState } from "react";
import { ReactNode } from 'react';
import './HighscoreSubmit.css';

interface HighscoreSubmitProps {
    guesses: number;
    wordLength: number;
    uniqueLetter: boolean;
    time: string;
    onSubmit: (highscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string; time: string }) => void;
    onCancel: () => void;
}

async function submitHighscore(highscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string; time: string }) {
    try {
      const response = await fetch('/api/highscores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(highscoreData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit highscore');
      }
      return await response.json();
    } catch (error) {
      console.error('Error submitting highscore:', error);
      throw error;
    }
  }

export default function HighscoreSubmit({ guesses, wordLength, uniqueLetter, time, onSubmit, onCancel }: HighscoreSubmitProps): ReactNode {
    const [playerName, setPlayerName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (s: React.FormEvent) => {
        s.preventDefault();
        const trimmedName = playerName.trim();
        if (!trimmedName) {
            setError('Please enter your name');
            return;
        }
        // Client-side XSS validation to match backend
        if (trimmedName.match(/[<>&"']/)) {
            setError('Name cannot contain special characters (<, >, &, ", \')');
            return;
        }

        const highscoreData = {
            name: trimmedName,
            guesses: guesses,
            wordLength: `${wordLength}`,
            uniqueLetter: uniqueLetter ? 'Yes' : 'No',
            time: time,
        };

        try {
            await submitHighscore(highscoreData);
            setError('');
            alert('Highscore submitted successfully!');
            onSubmit(highscoreData);
            setPlayerName('');
        } catch (error: any) {
            setError(error.message || 'Failed to submit highscore');
        }
    };
    
    return (
        <div className="highscoreSubmitDiv">
            <h2>Submit your results</h2>
            <form onSubmit={handleSubmit}>
                <div className="scoreDetails">
                    <p>Number of Guesses: <span className="guessSpan">{guesses}</span></p>
                    <p>Word Length: <span className="wordLengthSpan">{wordLength} letters</span></p>
                    <p>Unique Letters: <span className="uniqueLetterSpan">{uniqueLetter ? 'Yes' : 'No'}</span></p>
                    <p>Time: <span className="timeSpan">{time}</span></p>
                </div>
                <div className="formWrapper">
                    <div className="submitForm">
                        <input
                            className="nameInput"
                            type="text"
                            id="playerName"
                            value={playerName}
                            onChange={(s) => setPlayerName(s.target.value)}
                            placeholder="Enter your name here"
                            maxLength={60}
                            required
                        />
                    </div>
                    <div className="highscoreSubmitButtonsDiv">
                        <button type="submit" className="submitButton">Submit</button>
                        <button type="button" className="cancelButton" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
           
        </div>
    )

}
    