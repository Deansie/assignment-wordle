import './Footer.css'
import { ReactNode } from 'react';

export default function Footer(): ReactNode {
    return (
        <footer>
            <div className="mainDivFooter">
                <div>
                    <p>
                        Inspired by{' '}
                        <a href="https://www.nytimes.com/games/wordle" target="_blank" rel="noopener noreferrer">
                        Wordle
                    </a>{' '}
                        by Josh Wardle. &copy; {new Date().getFullYear()} The New York Times. All rights reserved.
                    </p>
                    <p>
                        Built with{' '}
                        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                        React
                        </a>{' '}
                        | Version 1.2.1 | Last Updated: August 6, 2025
                    </p>
                    <p>
                        We’d love your feedback!{' '}
                        <a href="mailto:feedback@ekedala-services.se" target="_blank" rel="noopener noreferrer">
                        Share your thoughts
                    </a>
                    .
                    </p>
                </div>
            </div>
        </footer>
    )
}