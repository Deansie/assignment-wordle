import { FormEvent, useEffect, useState } from "react";
import { ReactNode } from 'react';
import HighscoreSubmit from "../HighscoreSubmit/HighscoreSubmit";
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

async function startGame(letterCount: number, allowRepeatingLetters: boolean): Promise<string> {
    try {
        const response = await fetch('/api/start-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ length: letterCount, allowRepeatingLetters }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to start game');
        }
        const data = await response.json();
        return data.gameId;
    } catch (error) {
        console.error('Error starting game:', error);
        throw error;
    }
}

async function submitGuess(guess: string, gameId: string, letterCount: number): Promise<{ feedback: ('green' | 'yellow' | 'red')[], isCorrect: boolean }> {
    try {
        const response = await fetch('/api/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess, gameId, letterCount }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to process guess');
        }
        return await response.json();
    } catch (error) {
        console.error('Error submitting guess:', error);
        throw error;
    }
}

// Functio to fetch the target word from the backend when player has lost
async function getTargetWord(gameId: string): Promise<string> {
    try {
        const response = await fetch('/api/get-target-word', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({gameId}),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get the target word');
        }

    const data = await response.json();
    return data.targetWord;
    } catch (error) {
        console.error('Error fetching target word', error);
        throw error;
    }
}

export default function GameUI({ letterCount, allowRepeatingLetters, onReturn, onSubmitHighscore }: GameUIProps & HighscoreProps): ReactNode {
    const [gameId, setGameId] = useState<string>('');
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [showHighscoreForm, setShowHighscoreForm] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [targetWord, setTargetWord] = useState<string>('');
    
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
        const initGame = async () => {
            try {
                const id = await startGame(letterCount, allowRepeatingLetters);
                setGameId(id);
                setElapsedTime(0);
            } catch (error) {
                console.error ('Error fetching word:', error)
            }
        }
        initGame();
    }, [letterCount, allowRepeatingLetters]);

    useEffect(() => {
        if (gameState === 'lost' && gameId) {
            const fetchWord = async () => {
                try {
                    const word = await getTargetWord(gameId);
                    setTargetWord(word)
                } catch (error) {
                    console.error('Error fetching target word:', error);
                }
            };
            fetchWord();
        }
    }, [gameState, gameId]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (gameState !== 'playing' || currentGuess.length !== letterCount || isSubmitting ) return;

        // Cheatword for testing in production env
        if (currentGuess.toUpperCase() === "CHEAT") {
            setGameState('won');
            setGuesses((prev) => [...prev, { word: "CHEAT", feedback: Array(letterCount).fill('green') }]);
            setCurrentGuess('');
            setElapsedTime(5); 
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);

        try {
            const { feedback, isCorrect } = await submitGuess(currentGuess, gameId, letterCount);
            if (isCorrect) {
                setGameState('won');
                setGuesses((prev) => [...prev, { word: currentGuess.toUpperCase(), feedback }]);
            } else {
                setGuesses((prev) => [...prev, { word: currentGuess.toUpperCase(), feedback }]);
                if (guesses.length + 1 >= 6) {
                    setGameState('lost');
                } 
            }
            setCurrentGuess('');
        } catch (error) {
            console.error('Error handling guess:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Focuses the input-field when game is started and when non-winning guess has been entered
    useEffect(() => {
        if (gameState === 'playing' && !isSubmitting) {
            const input = document.querySelector('.guessInput') as HTMLInputElement 
            input?.focus()
        }
    }, [gameState, isSubmitting, guesses])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (gameState !== 'playing' || isSubmitting) return;
            if (event.key === 'Enter') {
                const formEvent = new Event('submit', {bubbles: true, cancelable: true });
                document.querySelector('form')?.dispatchEvent(formEvent);
            }
        };
       
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [gameState, isSubmitting]);

        const gameRestart = async () => {
            try {
                const id = await startGame(letterCount, allowRepeatingLetters);
                setGameId(id);
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
            onSubmitHighscore( {...highscoreData});
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
            secondMessage = targetWord ? (
                <>
                The correct word was: <strong>{targetWord}</strong>
                </>
            ) : (
                <>
                Loading the correct word...
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
                <span><h2>{secondMessage}</h2></span>
                <span>{scoreSubmit}</span>
                <span>
                    {gameState === 'playing' ? (
                        <span>
                            <form onSubmit={handleSubmit} className="guessForm">
                                <span>
                                    <input
                                        type="text" 
                                        value={currentGuess} 
                                        onChange={(s) => setCurrentGuess(s.target.value.toUpperCase().slice(0, letterCount))}
                                        placeholder={`Enter a ${letterCount}-letter word`}
                                        maxLength={letterCount}
                                        disabled={gameState !== 'playing' || isSubmitting}
                                        className="guessInput"
                                    />
                                    <button className="guessButton" type="submit" disabled={currentGuess.length !== letterCount || isSubmitting}>
                                        Guess
                                    </button>
                                </span>
                                <div>
                                    <button className="returnButton" onClick={onReturn}>
                                        Return to main menu
                                    </button>
                                </div>
                            </form>
                        </span>
                    ) : (
                        <span>
                            <button className="restartButton" onClick={gameRestart}>
                                Play again
                            </button>
                            <button className="changeDifficultyButton" onClick={onReturn}>
                                Change difficulty
                            </button>
                        </span>
                        
                    )}
                </span>
                
                
        </div>
    );
}
            
