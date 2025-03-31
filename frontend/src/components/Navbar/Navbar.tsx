import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../../assets/logo.webp';

export default function Navbar() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const getLiClass = (path: string) => {
        return hoveredLink === path ? 'nav-item--hovered' : '';
    }

    return (
        <header>
            <figure>
                <img src={logo} alt="Site logo" />
            </figure>
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
        </header>
    )
}

