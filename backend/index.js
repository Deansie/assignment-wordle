import fs from 'fs/promises'
import express from "express";

const app = express();
const port = process.env.PORT || 5081;

app.use(express.json());

app.use(express.static("../frontend/dist"));

/* API-ENDPOINTS - Work in progress!

app.post("/api/difficulty", (req, res) => {
    req.body()
    res.json()
})

app.get("/api/game", (req, res) => {
    res.json(data)
})

app.post("/api/guesses", (req, res) => {
    const userGuess = req.body.guess()
    res.json({ result: "success" })
})

app.get("/api/guesses", (req, res) => {

})

app.post("/api/highscores", (req, res) => {

})
*/

const getHighscoresData = () => {
  try {
    const highScores = [
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'No' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
    ];
    return highScores;
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return [];
  }
};

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
  
    const highscoresData = getHighscoresData();

    const safeHighscoresData = Array.isArray(highscoresData)
      ? highscoresData.filter(item => item && typeof item === 'object' && 'name' in item)
      : [];

    console.log('safeHighscoresData:', safeHighscoresData);

    const cssFilename = await getCssFilename();

    const highscoresHtml = `
      <main>
        <div class="mainDivHighScores">
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
                            <td>${score.name || 'N/A'}</td>
                            <td>${score.time || 'N/A'}</td>
                            <td>${score.guesses !== undefined ? score.guesses : 'N/A'}</td>
                            <td>${score.wordLength || 'N/A'}</td>
                            <td>${score.uniqueLetter || 'N/A'}</td>
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

app.get('/api/highscores', (req, res) => {
  try {
    const highScores = getHighscoresData();
    res.json(highScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    res.status(500).json({ error: 'Internal server error: Could not fetch high scores' });
  }
});

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


