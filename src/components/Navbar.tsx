import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    return (
        <nav>
            <ul>
                <li
                    onMouseEnter={() => setHoveredLink('/')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    <Link to="/">Home</Link>
                </li>

                <li
                    onMouseEnter={() => setHoveredLink("/highscores")}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    <Link to="/highscores">Highscores</Link>
                </li>

                <li
                    onMouseEnter={() => setHoveredLink("/about")}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

