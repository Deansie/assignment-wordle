import { hydrateRoot } from 'react-dom/client';
import App from './App';

interface CustomWindow extends Window {
    __INITIAL_PROPS__?: {
      highscoresData?: Array<{
        name: string;
        time: string;
        guesses: number;
        wordLength: string;
        uniqueLetter: string;
      }>;
    };
  }
  
  // Cast window to CustomWindow
  const initialProps = (window as CustomWindow).__INITIAL_PROPS__ || {};

hydrateRoot(
  document.getElementById('root')!,
  <App {...initialProps} />
);