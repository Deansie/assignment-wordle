import './About.css'
import { ReactNode } from 'react';

export default function About(): ReactNode {
    return (
        <main>
            <div className='mainDivAbout'>
                <h2>About the project</h2>
                    <div className='articleDivs'>
                    <hr />
                        <section>
                            <strong>Deansie's Wordle</strong> is a modern, interactive clone of the popular Wordle game, 
                            built as a full-stack web application. Players guess words of varying lengths, 
                            receiving color-coded feedback to hone their skills, with options to customize 
                            difficulty and submit high scores to a global leaderboard.
                        </section>
                        <section>
                            The frontend, crafted with React and TypeScript, delivers a responsive, dynamic user interface. 
                            The backend, powered by Node.js, Express, and a self-hosted MongoDB, manages game logic, high score persistence, 
                            and secure data. Hosted on self-managed Debian servers with Nginx, Cloudflare SSL, and Jenkins for CI/CD, 
                            this project showcases a robust MERN-like stack, ensuring a seamless and secure gaming experience.
                        </section>
                        
                    </div>
                    <div className='techStackDiv'>
                        <h2>Tech Stack</h2>
                        <div>
                            <ul>
                                <h3>Frontend</h3>
                                    <li>
                                        <strong>React:</strong> Component-based UI for the game and leaderboard
                                    </li>
                                    <li>
                                        <strong>React Router:</strong> Client-side routing for seamless navigation
                                    </li>
                                    <li>
                                    <strong>TypeScript:</strong>  Static typing for robust code
                                    </li>
                                    <li>
                                    <strong>Vite:</strong>  Fast Build tool and dev server
                                    </li>
                                </ul>
                        </div>
                        <div>
                             <ul>
                                <h3>Backend</h3>
                                    <li>
                                    <strong>Node.js:</strong>  JavaScript runtime for server logic
                                    </li>
                                    <li>
                                    <strong>Express:</strong>  Web framework for APIs and server-side rendering, managed by PM2
                                    </li>
                                    <li>
                                    <strong>MongoDB:</strong>  Self-hosted NoSQL database for high scores and word list
                                    </li>
                                </ul>
                         </div>
                         <div>
                             <ul>
                                <h3>Development Tools</h3>
                                    <li>
                                    <strong>ESLint:</strong>  Code quality and consistency
                                    </li>
                                    <li>
                                    <strong>Concurrently:</strong>  Runs frontend and backend dev servers simultaneous
                                    </li>
                                    <li>
                                        <strong>Nodemon:</strong>  Auto-restarts backend during development
                                    </li>
                                </ul>
                         </div>
                         <div>
                             <ul>
                                <h3>Infrastructure</h3>
                                    <li>
                                    <strong>Debian 12:</strong>  Operating system hosting self-managed servers
                                    </li>
                                    <li>
                                    <strong>Nginx:</strong>  Reverse proxy foor routing requests and DNS management
                                    </li>
                                    <li>
                                        <strong>Cloudflare SSL:</strong>  Provides HTTPS encryption and security
                                    </li>
                                    <li>
                                        <strong>Jenkins:</strong>  CI/CD tool for automated build, test and deployment
                                    </li>
                                    <li>
                                        <strong>PM2:</strong>  Process manager for running Express.js on Debian servers
                                    </li>
                                </ul>
                         </div>
                         <div>
                             <ul>
                                <h3>Resources</h3>
                                    <li>
                                    <strong>Repository:</strong>  <a href='https://github.com/Deansie/assignment-wordle/tree/assignment-B7'>Source code</a> on Github
                                    </li>
                                    <li>
                                    <strong>Flowchart:</strong>  <a href='https://www.figma.com/board/N97HCWe22IE2uKNxoexWfe/Assignment---Wordle-game?node-id=0-1&p=f&t=OwtfKA1q7Nk1FkZ9-0'>Application architecture</a> diagram
                                    </li>
                                </ul>
                         </div>
                    </div>
            </div>
        </main>
    );
  }
  
  