import fs from 'fs/promises'
import express from "express";

const app = express();
const port = process.env.PORT || 5081;

app.use(express.json());

app.use(express.static("../frontend/dist"));

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


app.get("/api/highscores", (req, res) => {

    const tableRows = highScores

    .map((score) =>
    `
    <tr>
        <td>${score.name}</td>
        <td>${score.time}</td>
        <td>${score.guesses}</td>
        <td>${score.wordLength}</td>
        <td>${score.uniqueLetter}</td>
    </tr>
    `
    ).join('');

    const html = `
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
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);

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


