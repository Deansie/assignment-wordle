import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const getLiClass = (path: string) => {
        return hoveredLink === path ? 'nav-item--hovered' : '';
    }

    return (
        <header>
            <div className="mainDivNavbar">
                <div className="titleContainer">
                <h1>W</h1>
                <h1>O</h1>
                <h1>R</h1>
                <h1>D</h1>
                <h1>L</h1>
                <h1>E</h1>
                </div>
                <nav>
                    <ul>
                        <li
                            className={getLiClass('/')}
                            onMouseEnter={() => setHoveredLink('/')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link to="/">Home</Link>
                        </li>

                        <li
                            className={getLiClass('/highscores')}
                            onMouseEnter={() => setHoveredLink("/highscores")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link to="/highscores">Highscores</Link>
                        </li>

                        <li
                            className={getLiClass('/about')}
                            onMouseEnter={() => setHoveredLink("/about")}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

