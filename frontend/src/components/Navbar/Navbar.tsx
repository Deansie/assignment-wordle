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

