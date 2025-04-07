import { useState } from "react";
import { ReactNode } from 'react';
import './GameUI.css';

interface GameUIProps {
    letterCount: number;
    allowRepeatingLetters: boolean;
}

export default function GameUI({ letterCount, allowRepeatingLetters }: GameUIProps): ReactNode {

    return (
    <div className='gameUiDiv'>
        <h2>Game started</h2>
        <span>
            <p>{letterCount} {allowRepeatingLetters ? 'yes' : 'no'} </p>
        </span>
    </div>
    )
}