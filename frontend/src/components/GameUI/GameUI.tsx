import { FormEvent, useEffect, useState } from "react";
import { ReactNode } from 'react';
import { algorithmA } from "../../pages/Home/algorithms";
import './GameUI.css';

interface GameUIProps {
    letterCount: number;
    allowRepeatingLetters: boolean;
}

interface Guess {
    word: string;
    feedback: (
        'green' |
        'yellow' |
        'red'
    )[];
}

// Mocked wordlist initially
const wordLists: { [key: number]: string[] } = {
    4: ['CAKE', 'BITE', 'FUSE', 'GLOW'],
    5: ['APPLE', 'HOUSE', 'CANDY', 'BREAD', 'FLAME'],
    6: ['CANDLE', 'BRIDGE', 'FROZEN'],
  };

// Filter words based on difficulty selection
const getRandomWord = (letterCount: number, allowRepeatingLetters: boolean): string => {
    const words = wordLists[letterCount] || [];
    const filteredWords = allowRepeatingLetters 
    ? words 
    : words.filter(word => new Set(word.split('')).size === word.length);
    if (filteredWords.length === 0) throw new Error(`No ${letterCount}-letter words available`);
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    
}

export default function GameUI({ letterCount, allowRepeatingLetters }: GameUIProps): ReactNode {
    const [targetWord, setTargetWord] = useState(() => getRandomWord(letterCount, allowRepeatingLetters));
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (gameState !== 'playing' || currentGuess.length !== letterCount) return;

        const algoResult = algorithmA(currentGuess,targetWord);
        const labels = algoResult.labelLetters(currentGuess.toUpperCase(), targetWord);

        const feedback = labels.map((label) => {
            if (label.includes('incorrect')) return 'red';
            if (label.includes('correct')) return 'green';
            if (label.includes('misplaced')) return 'yellow';
            return 'red';
        }) as ('green' | 'yellow' | 'red')[];
        
        setGuesses((prev) => [...prev, { word: currentGuess.toUpperCase(), feedback}]);
        setCurrentGuess('');

        if (currentGuess.toUpperCase() === targetWord) {
            setGameState('won'); 
        } else if (guesses.length +1 >= 6) {
            setGameState('lost');
        }

    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (gameState !== 'playing') return;
            if (event.key === 'Enter') {
                const formEvent = new Event('submit', {bubbles: true, cancelable: true });
                document.querySelector('form')?.dispatchEvent(formEvent);
            }
        };
       
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [gameState]);

        const gameRestart = () => {
            setTargetWord(getRandomWord(letterCount, allowRepeatingLetters));
            setGuesses([]);
            setCurrentGuess('');
            setGameState('playing');
        }

        let gameMessage
        let secondMessage 
        if (gameState === 'playing') {
            gameMessage = 'Game started';
        } else if (gameState === 'won') {
            gameMessage = 'Congratulations, you won!';
        } else {
            gameMessage = (
                <>
                Game over!
                </>
            )          
            secondMessage = (
                <>
                The correct word was: {targetWord}
                </>
            )
        }           

    return  (
        <div className='gameUiDiv'>
            <h2>{gameMessage}</h2>
                <table className="gameBoard">
                    <tbody>
                        {Array(6).fill(null).map((_, rowIndex) => (
                            <tr key ={rowIndex}>
                                {Array(letterCount).fill(null).map((_, colIndex) => {
                                    const guess = rowIndex < guesses.length ? guesses[rowIndex] : undefined;
                                    const letter =
                                        guess ? 
                                        guess.word[colIndex] : 
                                        rowIndex === guesses.length ? 
                                        currentGuess.toUpperCase()[colIndex] || '' :
                                        '';
                                    const feedback = guess ? guess.feedback[colIndex] : '';
                                    return (
                                        <td key={colIndex} className={`cell ${feedback}`}>
                                            {letter}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span>
                    {gameState === 'playing' ? (
                        <form onSubmit={handleSubmit} className="guessForm">
                            <input
                                type="text" 
                                value={currentGuess} 
                                onChange={(s) => setCurrentGuess(s.target.value.toUpperCase().slice(0, letterCount))}
                                placeholder={`Enter a ${letterCount}-letter word`}
                                maxLength={letterCount}
                                disabled={gameState !== 'playing'}
                                className="guessInput"
                            />
                            <button type="submit" disabled={currentGuess.length !== letterCount}>
                                Guess!
                            </button>
                        </form>
                    ) : (
                        <button className="restartButton" onClick={gameRestart}>
                            Play again!
                        </button>
                    )}
                </span>
                <h2>{secondMessage}</h2>
        </div>
    );
}
            
