import { useState } from "react";
import { ReactNode } from 'react';
import './GameUI.css';

interface GameUIProps {
    letterCount: number;
    allowRepeatingLetters: boolean;
}

export default function GameUI({ letterCount, allowRepeatingLetters }: GameUIProps): ReactNode {

    return (
    <div className='difficultyDiv'>
        <span>
            <p>{letterCount} {allowRepeatingLetters ? 'yes' : 'no'} </p>
        </span>
    </div>
    )
}