import { FormEvent, use, useEffect, useState } from "react";
import { ReactNode } from 'react';
import { algorithmA } from "../../pages/Home/algorithms";
import HighscoreSubmit from "../HighscoreSubmit/HighscoreSubmit";
import CryptoJS from 'crypto-js';
import './GameUI.css';


interface GameUIProps {
    letterCount: number;
    allowRepeatingLetters: boolean;
    onReturn: () => void;
}

interface Guess {
    word: string;
    feedback: (
        'green' |
        'yellow' |
        'red'
    )[];
}

interface HighscoreProps {
    onSubmitHighscore: (
        highscoreData: { 
            name: string; 
            guesses: number; 
            wordLength: string; 
            uniqueLetter: string;
            time: string
        }) => void;
}

const SECRET_KEY = 'wordle-secret-key-12345678901234'; // Needs to be moved in real production

// Filter words based on difficulty selection
async function getRandomWord(letterCount: number, allowRepeatingLetters: boolean): Promise<string> {
    try {
        const response = await fetch(
            `/api/random-word?length=${letterCount}&allowRepeatingLetters=${allowRepeatingLetters}`,
            { cache: 'no-store' }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch word');
        }
        const data = await response.json();
        const [ivHex, encrypted] = data.encryptedWord.split(':');
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
        const encryptedBase64 = CryptoJS.enc.Hex.parse(encrypted).toString(CryptoJS.enc.Base64);
        const decrypted = CryptoJS.AES.decrypt(
            encryptedBase64,
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        const decryptedWord = decrypted.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedWord) {
            throw new Error('Decryption failed: empty result');
        }
        return decryptedWord.toUpperCase();
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}

export default function GameUI({ letterCount, allowRepeatingLetters, onReturn, onSubmitHighscore }: GameUIProps & HighscoreProps): ReactNode {
    const [targetWord, setTargetWord] = useState<string>('');
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [showHighscoreForm, setShowHighscoreForm] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        let timer: number;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} min ${secs} sec`;
    }

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const word = await getRandomWord(letterCount, allowRepeatingLetters);
                setTargetWord(word);
                setElapsedTime(0);
            } catch (error) {
                console.error ('Error fetching word:', error)
            }
        }
        fetchWord();
    }, [letterCount, allowRepeatingLetters]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (gameState !== 'playing' || currentGuess.length !== letterCount) return;

        const algoResult = algorithmA(currentGuess, targetWord);
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

        const gameRestart = async () => {
            try {
                const word = await getRandomWord(letterCount, allowRepeatingLetters);
                setTargetWord(word);
                setGuesses([]);
                setCurrentGuess('');
                setGameState('playing');
                setElapsedTime(0);
                setShowHighscoreForm(false);
            } catch (error) {
                console.error('Error restarting game:', error)
            }
        }

        const handleShowHighscoreForm = () => {
            setShowHighscoreForm(true);
        }

        const handleCancelHighscore = () => {
            setShowHighscoreForm(false);
        } 

        const handleSubmitHighscore = (highscoreData: { name: string; guesses: number; wordLength: string; uniqueLetter: string; time: string}) => {
            onSubmitHighscore( {...highscoreData, time: formatTime(elapsedTime)});
            setShowHighscoreForm(false);
        }

        let gameMessage
        let secondMessage 
        let scoreSubmit
        if (gameState === 'playing') {
            gameMessage = 'Game started';
        } else if (gameState === 'won') {
            gameMessage = (
                <>
                Congratulations, you won!
                </>
            )
            scoreSubmit = (
                <>
                <button className="scoreSubmitButton" onClick={handleShowHighscoreForm}>Submit your score</button>
                </>
            )
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
        
        if (showHighscoreForm) {
            return (
                <HighscoreSubmit
                guesses={guesses.length} 
                wordLength={letterCount} 
                uniqueLetter={allowRepeatingLetters} 
                time={formatTime(elapsedTime)}
                onSubmit={handleSubmitHighscore} 
                onCancel={handleCancelHighscore}
                />
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
                            <button className="guessButton" type="submit" disabled={currentGuess.length !== letterCount}>
                                Guess
                            </button>
                        </form>
                    ) : (
                        <button className="restartButton" onClick={gameRestart}>
                            Play again
                        </button>
                    )}
                </span>
                <h2>{secondMessage}</h2>
                <span>{scoreSubmit}</span>
                <button className="returnButton" onClick={onReturn}>Return to main menu</button>
        </div>
    );
}
            
