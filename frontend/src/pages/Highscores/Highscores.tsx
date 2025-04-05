import './Highscores.css'
import { ReactNode, useEffect, useState } from 'react';

interface HighScore {
    name: string;
    time: string;
    guesses: number;
    wordLength: string;
    uniqueLetter: string;
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
                    <h2>Highest scores</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Guesses</th>
                                    <th>Wordlength</th>
                                    <th>Unique letter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highScores.length > 0 ? (
                                    highScores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{score.name}</td>
                                        <td>{score.time}</td>
                                        <td>{score.guesses}</td>
                                        <td>{score.wordLength}</td>
                                        <td>{score.uniqueLetter}</td>
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


  