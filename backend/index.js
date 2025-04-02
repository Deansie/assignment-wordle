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

app.get("/api/highscores", (req, res) => {

})
*/

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


