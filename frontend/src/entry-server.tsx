import { renderToString } from 'react-dom/server';
import App from './App';

interface Highscore {
  name: string;
  time: string;
  guesses: number;
  wordLength: string;
  uniqueLetter: string;
}

export async function render(url: string, initialProps: { highscoresData?: Highscore[] } = {}) {
  const html = renderToString(
    <App url={url} isSSR={true} highscoresData={initialProps.highscoresData} />
  );
  return { html, initialProps };
}