import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactNode } from 'react';
import './Navbar.css';

export default function Navbar(): ReactNode {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const getLiClass = (path: string) => {
        const isHovered = hoveredLink === path ? 'nav-item--hovered' : '';
        const isActive = location.pathname === path ? 'nav-item--active' : '';
        return `${isHovered}, ${isActive}`.trim();
    }

    return (
        <header>
            <div className="mainDivNavbar">
                <div className="titleContainer">
                    <h1 aria-label="Wordle">
                        <span>W</span>
                        <span>O</span>
                        <span>R</span>
                        <span>D</span>
                        <span>L</span>
                        <span>E</span>
                    </h1>
                </div>
                <nav>
                    <ul>
                        <li
                            className={getLiClass('/')}
                            onMouseEnter={() => setHoveredLink('/')}
                            onFocus={() => setHoveredLink('/')}>
                            <Link to="/" onClick={() => setHoveredLink(null)}>Home</Link>
                        </li>

                        <li
                            className={getLiClass('/highscores')}
                            onMouseEnter={() => setHoveredLink("/highscores")}
                            onFocus={() => setHoveredLink('/highscores')}>
                            <Link to="/highscores" onClick={() => setHoveredLink(null)}>Highscores</Link>
                        </li>

                        <li
                            className={getLiClass('/about')}
                            onMouseEnter={() => setHoveredLink("/about")}
                            onFocus={() => setHoveredLink('/about')}>
                            <Link to="/about" onClick={() => setHoveredLink(null)}>About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

