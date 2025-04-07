import DifficultySelector from '../../components/DifficultySelector/DifficultySelector';
import './Home.css'
import { ReactNode } from 'react';

export default function Home(): ReactNode {
    return (
        <main>
            <div className='mainDivHome'>
            <DifficultySelector />
            </div>
       </main>
    )
  }
  