import { useState } from "react";
import GameUI from "../GameUI/GameUI";
import { ReactNode } from 'react';
import './DifficultySelector.css';
import { useNavigate } from "react-router-dom";

export default function DifficultySelector(): ReactNode {

    interface GameStartProps {
        letterCount: number;
        allowRepeatingLetters: boolean;
        onReturn: () => void;
        onSubmitHighscore: (highscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string; time: string }) => void;
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

    const handleHighscoreSubmit = async (highscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string; time: string}) => {
        console.log('Highscore submitted:', highscoreData);
        
    }

    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
    const letterOptions = isSmallScreen ? [4, 5, 6, 7] : [4, 5, 6, 7, 8, 9];

    const difficultyUI = (
        
    <div className='difficultyDiv'>
        <h2>Select difficulty</h2>
        <span>
            <label>Number of letters:</label>
                <select 
                    aria-label='Number of letters' 
                    className='selectLetters'
                    value={letterCount.toString()}
                    onChange={(s) => {
                       const newValue = parseInt(s.target.value);
                       setLetterCount(isSmallScreen && newValue > 7 ? 7 : newValue);
                    }}
                >
                    {letterOptions.map((num) => (
                       <option key={num} value={num}>
                           {num}
                      </option>
                    ))}
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
        onSubmitHighscore={handleHighscoreSubmit}
        /> 
    ):(
        difficultyUI
    )
    
}