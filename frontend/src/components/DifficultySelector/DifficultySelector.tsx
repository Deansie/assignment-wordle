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
        setIsGameStarted(false);

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
        onSubmitHighscore={handleHighscoreSubmit}
        /> 
    ):(
        difficultyUI
    )
    
}