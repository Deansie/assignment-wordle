import fs from 'fs/promises'
import express from "express";
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { algorithmA } from './algorithms.js';
import escapeHtml from 'escape-html';

const app = express();
const port = process.env.PORT || 5081;
const uri = 'mongodb://192.168.0.82:27017/wordleGame';
const client = new MongoClient(uri);

const gameSessions = new Map();

app.use(cors({ origin: ['https://deansie-wordle.ekedala-services.se', 'http://deansie-wordle.ekedala-services.se', 'http://localhost:8080'] }));
app.use(express.json());

app.use(express.static("../frontend/dist"));

async function getRandomWord(length, allowRepeatingLetters) {
  try {
    await client.connect();
    const db = client.db('wordleGame');
    const doc = await db.collection('wordLists').findOne({ length });
    if (!doc?.words?.length) throw new Error(`No ${length}-letter words found`);

    let words = doc.words;
    if (!allowRepeatingLetters) {
      words = words.filter(word => new Set(word.toLowerCase().split('')).size === word.length);
    }
    if (!words.length) throw new Error(`Ǹo ${length}-letter words without repeating letters found`);
    
      return words[Math.floor(Math.random() * words.length)];
  } finally {
    await client.close();
  }
}

app.post('/api/start-game', async (req, res) => {
  const { length, allowRepeatingLetters } = req.body;
  const lengthNum = parseInt(length);
  if (![4, 5, 6, 7, 8, 9].includes(lengthNum)) {
    return res.status(400).json({ error: 'Invalid word length. Must be 4–9.' });
  }
  try {
    const word = await getRandomWord(lengthNum, allowRepeatingLetters === 'true');
    const gameId = uuidv4();
    gameSessions.set(gameId, {word: word.toUpperCase(), letterCount: lengthNum });
    res.json({ gameId })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/guess', async (req, res) => {
  const { guess, gameId, letterCount } = req.body;
  if (!guess || !gameId || ! letterCount ) {
    return res.status(400).json({ error: 'Missing guess, game id or letter count'})
  }
  if (guess.length !== parseInt(letterCount)) {
    return res.status(400).json ({error: `Guess must be ${letterCount} letters`})
  } 

  const session = gameSessions.get(gameId);
  if (!session) {
    return res.status(400).json ({error: 'Game session not found'})
  }

  const targetWord = session.word;
  const algoResult = algorithmA(guess, targetWord);
  const labels = algoResult.labelLetters(guess.toUpperCase().split(''), targetWord.toUpperCase().split(''));

  const feedback = labels.map(label => {
    if (label.includes('incorrect')) return 'red';
    if (label.includes('correct')) return 'green';
    if (label.includes('misplaced')) return 'yellow';
    return 'red'; 
  });

  const isCorrect = guess.toUpperCase() === targetWord;
  res.json({ feedback, isCorrect })
})

async function getHighscoresData() {
  try {
    await client.connect();
    console.log('Connectod to MongoDB:', uri)
    const db = client.db('wordleGame');
    const highScores = await db.collection('highscores')
      .find()
      .sort({guesses: 1, timeSeconds: 1})
      .limit(10)
      .toArray();

    return highScores.map(score => ({
      name: score.name,
      guesses: score.guesses,
      wordLength: `${score.wordLength} letters`,
      uniqueLetter: score.uniqueLetter ? 'Yes' : 'No',
      time: formatSecondsToTime(score.timeSeconds)
    }));
  } catch (error) {
    console.error('Error fetching highscores:', error);
    return [];
  } finally {
    await client.close();
  }
}

function formatSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes} min ${secs} sec`;
}

// Endpoint to POST player scores to highscores db
app.post("/api/highscores", async (req, res) => {
  const { name, guesses, wordLength, uniqueLetter, time } = req.body;
  
  if (!name || typeof guesses !== 'number' || !wordLength || uniqueLetter === undefined || !time) {
    return res.status(400).json({error: 'Missing or invalid highscore data'});
  }
  if (name.length > 60) {
    return res.status(400).json({error: 'Name must be 60 characters or less'});
  }
  if (guesses < 1) {
    return res.status(400).json({error: 'Guesses are needed to process the submission'})
  }

  // XSS prevention
  if (name.match(/[<>&"']/)) {
    return res.status(400).json({ error: 'Name contains invalid characters' });
  }

  const wordLengthNum = parseInt(wordLength);
  if (isNaN(wordLengthNum) || ![4, 5, 6, 7, 8, 9].includes(wordLengthNum)) {
    return res.status(400).json({error: 'Invalid word length'});
  }

  const timeMatch = time.match (/(\d+)\s*min\s*(\d+)\s*sec/);
  if (!timeMatch) {
    return res.status(400).json({error: 'Invalid time format'})
  }

  const timeSeconds = parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);

  try {
    await client.connect();
    const db = client.db('wordleGame');
    const result = await db.collection('highscores').insertOne({
      name,
      guesses,
      wordLength: wordLengthNum,
      uniqueLetter: uniqueLetter === 'Yes',
      timeSeconds,
      createdAt: new Date()
    })
    res.status(201).json({ message: 'Highscore submitted', id: result.insertedId});
  } catch (error) {
    console.error('Error submitting highscore', error);
    res.status(500).json({error: 'Failed to submit highscore'});
  } finally {
    await client.close();
  }
})

const getCssFilename = async () => {
  try {
    const indexHtmlContent = await fs.readFile('../frontend/dist/index.html', 'utf-8');
       
    const cssMatch = indexHtmlContent.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/);
    if (cssMatch && cssMatch[1]) {
      return cssMatch[1]; 
    }
    throw new Error('CSS file not found in index.html');
  } catch (error) {
    console.error('Error reading CSS filename:', error);
    return '/assets/index.css'; 
  }
};


app.get('/highscores', async (req, res) => {
  try {
  
    const highscoresData = await getHighscoresData();

    const safeHighscoresData = Array.isArray(highscoresData)
      ? highscoresData.filter(item => item && typeof item === 'object' && 'name' in item)
      : [];

    console.log('safeHighscoresData:', safeHighscoresData);

    const cssFilename = await getCssFilename();
    const showSubmissionMessage = req.query.submitted === 'true';
    const submissionMessage = showSubmissionMessage ? 'Your score has been added to the scoreboard!' : '';
  

    const highscoresHtml = `
      <main>
        <div class="mainDivHighScores">
          <h2>${submissionMessage}</h2>
          <h2>Highest scores</h2>
          <div>
          
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Guesses</th>
                  <th>Wordlength</th>
                  <th>Unique letter</th>
                </tr>
              </thead>
              <tbody>
                ${
                  safeHighscoresData.length > 0
                    ? safeHighscoresData
                        .map(
                          (score, index) => `
                          <tr key="${index}">
                            <td>${escapeHtml(score.name || 'N/A')}</td>
                            <td>${escapeHtml(score.time || 'N/A')}</td>
                            <td>${escapeHtml(score.guesses !== undefined ? score.guesses : 'N/A')}</td>
                            <td>${escapeHtml(score.wordLength || 'N/A')}</td>
                            <td>${escapeHtml(score.uniqueLetter || 'N/A')}</td>
                          </tr>
                        `
                        )
                        .join('')
                    : `
                      <tr>
                        <td colspan="5">No high scores available</td>
                      </tr>
                    `
                }
              </tbody>
            </table>
          </div>
          
        </div>
      </main>
    `;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="A Wordle game">
          <title>Wordle Clone</title>
          <link rel="stylesheet" href="${cssFilename}" />
        </head>
        
        <body>
        <div id="root">
        <div class="app-wrapper">
          <header>
            <div class="mainDivNavbar">
              <div class="titleContainer">
                <h1>
                  <span>W</span>
                  <span>O</span>
                  <span>R</span>
                  <span>D</span>
                  <span>L</span>
                  <span>E</span>
                </h1>
              </div>
              <nav role="navigation">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/highscores">Highscores</a></li>
                  <li><a href="/about">About</a></li>
                </ul>
              </nav>
            </div>
          </header>

          <div id="root">${highscoresHtml}</div>

          <script>
            window.__INITIAL_HIGHSCORES__ = ${JSON.stringify(safeHighscoresData)};
          </script>

          <footer>
            <div class="mainDivFooter">
              <p>
                Inspired by <a href="https://www.nytimes.com/games/wordle">Wordle</a> by Josh Wardle. © 2025 The New York Times. All rights reserved.
              </p>
              <p>
                Built with <a href="https://react.dev">React</a> | Version 1.0.0 | Last Updated: April 2, 2025 | <a href="mailto:feedback@yourdomain.com">Share your thoughts</a>
              </p>
            </div>
          </footer>
          </div>
          </div>
        </body>
       
      </html>
      
    `);
  } catch (err) {
    console.error('SSR Error:', err);
    res.status(500).send('Error rendering the page');
  }
});

app.get('/api/highscores', async (req, res) => {
  try {
    const highScores = await getHighscoresData();
    res.json(highScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    res.status(500).json({ error: 'Internal server error: Could not fetch high scores' });
  }
});

// Endpoint to reveal the target word in the current session when the player has lost
app.post('/api/get-target-word', (req, res) => {
  const {gameId} = req.body;
  if (!gameId) {
    return res.status(400).json({ error: 'Missing game ID'});
  }

  const session = gameSessions.get(gameId);
  if (!session) {
    return res.status(400).json({ error: 'Game session not found'});
  }

  const targetWord = session.word;
  gameSessions.delete(gameId);
  res.json({targetWord});
})

app.get("*", async (req, res) => {
    try {
        const htmlText = await fs.readFile("../frontend/dist/index.html");
        res.send(htmlText.toString());
    } catch (err) {
        res.status(500).send("Error loading the page");
    }
});
  
const serverStart= () => {
    console.log("Server running on port", 5081)
}

app.listen(5081, serverStart);


