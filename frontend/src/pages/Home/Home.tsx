import DifficultySelector from '../../components/DifficultySelector/DifficultySelector';
import './Home.css'
import { ReactNode } from 'react';

export default function Home(): ReactNode {
    return (
        <main>
            <div className='mainDivHome'>
            <h2>Select difficulty</h2>
            <DifficultySelector />
            </div>
       </main>
    )
  }
  