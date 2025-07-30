import './Highscores.css'
import { ReactNode, useEffect, useState } from 'react';

interface HighScore {
    name: string;
    guesses: number;
    wordLength: string;
    uniqueLetter: string;
    time: string;    
}

export default function Highscores(): ReactNode {
    
    const [highScores, setHighScores] = useState<HighScore[]>([]);

    useEffect(() => {
        fetch('/api/highscores')
            .then((response) => response.json())
            .then((data: HighScore[]) => {
                setHighScores(data);
            })
            .catch((error) => {
                console.error('Error fetching high scores:', error);
                setHighScores([]);
            })
        }, []);
    
        return (
            <main>
                <div className="mainDivHighScores">
                    <h2>Leaderboard</h2>
                    <div>
                        <table>
                            <tbody>
                                {highScores.length > 0 ? (
                                    highScores.map((score, index) => (
                                    <tr key={index}>
                                            <td><h3>{index + 1}: {score.name}</h3>
                                                <p>
                                                    <i><b>Time: </b>{score.time} | <b>Guesses: </b>{score.guesses}
                                                    <br />
                                                    </i>
                                                </p>
                                                <p> 
                                                    <i><b>Length: </b>{score.wordLength} | <b>Unique letters:</b> {score.uniqueLetter}
                                                    </i>
                                                </p>
                                                
                                            </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan={5}>No high scores available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }


  