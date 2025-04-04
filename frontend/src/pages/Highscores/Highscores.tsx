import './Highscores.css'
import { ReactNode } from 'react';

interface Highscore {
    name: string;
    time: string;
    guesses: number;
    wordLength: string;
    uniqueLetter: string;
}

interface HighscoresProps {
    initialHighscores?: Highscore[]; 
}

export default function Highscores({initialHighscores = [] }: HighscoresProps): ReactNode {
    
    if (!initialHighscores || initialHighscores.length === 0)  {
    
        return (
            <main>
                <div className='mainDivHighScores'>
                    <h2>Highest scores</h2>
                    <p>No highscores available</p>             
                </div>
            </main>
    )};

    return (
        <main>
            <div className='mainDivHighScores'>
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
                        {initialHighscores.map((score, index) => (
                        <tr key={index}>
                            <td>{score.name}</td>
                            <td>{score.time}</td>
                            <td>{score.guesses}</td>
                            <td>{score.wordLength}</td>
                            <td>{score.uniqueLetter}</td>
                        </tr>
                        ))};
                    </tbody>
                </table>
                
                </div>
            </div>
            
        </main>
    );
}

  