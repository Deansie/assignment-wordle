import fs from 'fs/promises';
import express from "express";
import { renderToString } from 'react-dom/server';
import Highscores from './ssr-dist/Highscores.js';


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

app.get("/api/highscores", (req, res) => {

})
*/

// SSR route for /highscores
app.get('/highscores', async (req, res) => {
    try {
      // Fetch highscores data (mocked for now)
      const highscoresData = [
        { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
      ];
  
      // Load the server bundle
      const { render } = await import('../frontend/dist/server/entry-server.js');
  
      // Render the app to HTML
      const { html, initialProps } = await render(req.url, { highscoresData });
  
      // Send the rendered HTML
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Wordle - Highscores</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>
              window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)};
            </script>
            <script type="module" src="/client/entry-client.js"></script>
          </body>
        </html>
      `);
    } catch (err) {
      console.error('SSR Error:', err);
      res.status(500).send('Error rendering the page');
    }
  });
  
  // API endpoint for highscores (mocked for now)
  app.get('/api/highscores', (req, res) => {
    const highscoresData = [
      { name: 'Deansie', time: '5 min 04 sec', guesses: 4, wordLength: '5 letters', uniqueLetter: 'Yes' },
    ];
    res.json(highscoresData);
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


