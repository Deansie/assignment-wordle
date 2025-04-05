import './Highscores.css'
import { ReactNode, useEffect, useState } from 'react';

export default function Highscores(): ReactNode {
    
    const [highScoresHtml, setHighScoresHtml] = useState<string>('');

    useEffect(() => {
        fetch('/api/highscores')
            .then((response) => response.text())
            .then((html) => {
                setHighScoresHtml(html);
            })
            .catch((error) => {
                console.error('Error fetching high scores:', error);
                setHighScoresHtml ('<div>Error loading high scores</div>');
            })
        }, []);
    
        return (
            <main>
                <div dangerouslySetInnerHTML={{ __html: highScoresHtml }} />
            </main>
        );
    }


  