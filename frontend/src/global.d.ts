import { Highscore } from './types/highscore';

interface Window {
  __INITIAL_PROPS__?: {
    highscoresData?: Highscore[];
  };
}