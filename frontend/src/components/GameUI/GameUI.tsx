import { useState } from "react";
import { ReactNode } from 'react';
import './GameUI.css';

// Mocked wordlist initially
const wordLists: { [key: number]: string[] } = {
    4: ['CAKE', 'BITE', 'FUSE', 'GLOW'],
    5: ['APPLE', 'HOUSE', 'CANDY', 'BREAD', 'FLAME'],
    6: ['CANDLE', 'BRIDGE', 'FROZEN'],
  };

interface GameUIProps {
    letterCount: number;
    allowRepeatingLetters: boolean;
}

export default function GameUI({ letterCount, allowRepeatingLetters }: GameUIProps): ReactNode {

    return (
    <div className='gameUiDiv'>
        <h2>Game started</h2>
        <table className="gameBoard">
            <tbody>

            </tbody>
        </table>
        <span>
            <p>{letterCount} {allowRepeatingLetters ? 'yes' : 'no'} </p>
        </span>
    </div>
    )
}