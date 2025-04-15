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
export default function HighscoreSubmit({ guesses, wordLength, uniqueLetter, time, onSubmit, onCancel }: HighscoreSubmitProps): ReactNode {

    const [playerName, setPlayerName] = useState<string>('');

    const handleSubmit = (s: React.FormEvent) => {
        s.preventDefault();
        if (!playerName.trim()) {
            alert('Please enter your name');
            return;
        }
        const highscoreData = {
            name: playerName.trim(),
            guesses: guesses,
            wordLength: `${wordLength} letters`,
            uniqueLetter: uniqueLetter ? 'Yes' : 'No',
            time: time,
        };
        console.log('Highscore data submitted:', highscoreData);
        onSubmit(highscoreData);

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
    