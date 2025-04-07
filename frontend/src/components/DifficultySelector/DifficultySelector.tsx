// import { useState } from "react";

import { ReactNode } from 'react';
import './DifficultySelector.css';

export default function DifficultySelector(): ReactNode {

    
       
    return (
    <div className='difficultyDiv'>
        <span>
            <label>Number of letters:</label>
                <select aria-label='Number of letters' className='selectLetters'>
                    <option value="threeLetters">3</option>
                    <option value="fourLetters">4</option>
                    <option value="fiveLetters">5</option>
                    <option value="sixLetters">6</option>
                    <option value="sevenLetters">7</option>
                    <option value="eightLetters">8</option>
                    <option value="nineLetters">9</option>
                </select>
        </span>
        <span>
            <label>Allow repeating letters:</label>
            <select aria-label='Allow repeating letters' className='selectRepeatingLetters'>
                <option value="yes">Yes</option>
                <option value="no">No</option> 
            </select>
        </span>
        <span className='startButtonSpan'>
            <button aria-label='Play-button'>Play!</button>
        </span>
    </div>
    )
}