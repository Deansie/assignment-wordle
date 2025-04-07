// import { useState } from "react";

import { ReactNode } from 'react';
import './DifficultySelector.css';

export default function DifficultySelector(): ReactNode {

    
       
    return (
    <div className='difficultyDiv'>
        <span>
            <span className='letterChooserSpan'>
                <select>
                    <option value="fourLetters">4 letters</option>
                    <option value="fiveLetters">5 letters</option>
                    <option value="sixLetters">6 letters</option>
                    <option value="sevenLetters">7 letters</option>
                    <option value="eightLetters">8 letters</option>
                    <option value="nineLetters">9 letters</option>
                </select>
            </span>
            <span className='repeatingLettersSpan'>
                <input type= "checkbox"/>
                <label>Allow repeating letters</label>
                
            </span>
        </span>
        <span className='startButtonSpan'>
            <input type= "button"/>
        </span>
    </div>
    )
}