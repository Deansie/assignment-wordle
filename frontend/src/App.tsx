import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, StaticRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Highscores from './pages/Highscores/Highscores';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

interface CustomWindow extends Window {
  __INITIAL_PROPS__?: {
    highscoresData?: Highscore[];
  };
}
interface AppProps {
  highscoresData?: Highscore[];
  url?: string;
  isSSR?: boolean;
}

function App({ highscoresData, url, isSSR = false}: AppProps = {}): ReactNode {

  const initialProps = highscoresData || (typeof window !== 'undefined' ? window.__INITIAL_PROPS__ : {});

  const RouterComponent = isSSR ? StaticRouter : BrowserRouter;
  const routerProps = isSSR ? { location: url } : {};

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/highscores" element={<Highscores initialHighscores={initialProps?.highscoresData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;