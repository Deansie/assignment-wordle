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
                            and secure data. Hosted on self-managed High-Availabe Kubernetes Cluster with Nginx for reverse proxying, Cloudflare SSL, Jenkins for CI/CD, 
                            Prometheus and Grafana for monitoring. This project showcases a robust MERN-like stack, ensuring a seamless and secure gaming experience.
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
                                    <strong>Node.js:</strong>  Containerized in Docker
                                    </li>
                                    <li>
                                    <strong>Express:</strong>  Runs in Docker containers, managed by Kubernetes
                                    </li>
                                    <li>
                                    <strong>MongoDB:</strong>  Self-hosted as Deployment in Kubernetes with persistent storage
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
                                    <strong>Proxmox VE:</strong>  Hosts Kubernetes nodes as virtual machines
                                    </li>
                                    <li>
                                    <strong>HA Kubernetes:</strong>  Orchestrates backend and frontend containers
                                    </li>
                                    <li>
                                    <strong>Nginx:</strong>  Reverse proxy for routing requests and DNS management
                                    </li>
                                    <li>
                                    <strong>Cloudflare SSL:</strong>  Provides HTTPS encryption and security
                                    </li>
                                    <li>
                                    <strong>Jenkins:</strong>  CI/CD deploys to Kubernetes via Docker images and manifests
                                    </li>
                                    <li>
                                    <strong>Prometheus and Grafana:</strong>  Monitoring for Kubernetes cluster and application metrics
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
                                    <li>
                                    <strong>Datasources:</strong> <a href='https://github.com/dwyl/english-words/blob/master/words_dictionary.json'>Wordlist</a> from English-Words
                                    </li>
                                </ul>
                         </div>
                    </div>
            </div>
        </main>
    );
  }
  
  