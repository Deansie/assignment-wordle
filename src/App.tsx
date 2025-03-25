import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Highscores from './pages/Highscores';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;