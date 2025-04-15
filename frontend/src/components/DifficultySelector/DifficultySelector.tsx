import { useState } from "react";
import GameUI from "../GameUI/GameUI";
import { ReactNode } from 'react';
import './DifficultySelector.css';

export default function DifficultySelector(): ReactNode {

    interface GameStartProps {
        letterCount: number;
        allowRepeatingLetters: boolean;
        onReturn: () => void;
        onSubmitHighscore: (HighscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string }) => void;
    }
    
    const GameStart = ({letterCount, allowRepeatingLetters, onReturn, onSubmitHighscore}: GameStartProps): ReactNode => {
        return (
            <GameUI 
            letterCount={letterCount} 
            allowRepeatingLetters={allowRepeatingLetters} 
            onReturn={onReturn} 
            onSubmitHighscore={onSubmitHighscore}
            />
        )
    }

    const [letterCount, setLetterCount] = useState<number>(4);
    const [allowRepeatingLetters, setAllowRepeatingLetters] = useState<boolean>(true);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    const returnToDifficulty = () => {
        console.log('Return to difficulty selection')
        setIsGameStarted(false);
        setLetterCount(prev => prev)
    }

    const submitHighscore = async (highscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string }) => {
        try {
            const response = await fetch ('/api/highscores', {
                method: 'POST',
                headers: { ' Content-type': 'application/json' },
                body: JSON.stringify({
                    name: highscoreData.name,
                    time: '0 min 0 sec',
                    guesses: highscoreData.guesses,
                    wordLength: highscoreData.wordLength,
                    uniqueLetters: highscoreData.uniqueLetter,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit highscore');
            }
            console.log('Highscore submittet successfully');
            } catch (error) {
                 console.error('Error submitting highscore:', error);
            }
        }
    

    const difficultyUI = (
        
    <div className='difficultyDiv'>
        <h2>Select difficulty</h2>
        <span>
            <label>Number of letters:</label>
                <select aria-label='Number of letters' className='selectLetters'
                value={letterCount.toString()} onChange={(s) => setLetterCount(parseInt(s.target.value))}>
                    
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
        </span>
        <span>
            <label>Allow repeating letters:</label>
            <select aria-label='Allow repeating letters' className='selectRepeatingLetters'
            value={allowRepeatingLetters ? 'yes' : 'no'} onChange={(s) => setAllowRepeatingLetters(s.target.value === 'yes')}>
                <option value="yes">Yes</option>
                <option value="no">No</option> 
            </select>
        </span>
        <span className='startButtonSpan'>
            <button onClick={() => setIsGameStarted(true)} aria-label='Play-button'>Start game</button>
        </span>
    </div>
    );

    return isGameStarted ? (
        <GameStart 
        letterCount={letterCount} 
        allowRepeatingLetters={allowRepeatingLetters} 
        onReturn={returnToDifficulty}
        onSubmitHighscore={submitHighscore}
        /> 
    ):(
        difficultyUI
    )
    
}