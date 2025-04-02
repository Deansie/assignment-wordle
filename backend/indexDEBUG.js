import express from "express";

const app = express();
const port = process.env.PORT || 5081;

app.use(express.json());

app.use(express.static("../frontend/dist"));

import fs from 'fs/promises';
app.get("*", async (req, res) => {
    try {
        const htmlText = await fs.readFile("../frontend/dist/index.html");
        res.send(htmlText.toString());
    } catch (err) {
        res.status(500).send("Error loading the page");
    }
});

const serverStart = () => {
    console.log(`Server running on port ${port}`);
};

app.listen(port, serverStart);