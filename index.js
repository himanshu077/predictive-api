// server.js
const express = require("express");
// const bodyParser = require("body-parser");
const { findBestMatch, addTrainingData } = require("./model");

const app = express();
app.use(express.json());
// app.use(bodyParser.json());

app.post("/train", (req, res) => {
  const newEntry = req.body;
  if (Object.keys(newEntry).length === 0) {
    return res.status(400).send({
      status: "failed",
      statusCode: 400,
      message: "data cannot be empty",
      data: [],
    });
  }
  addTrainingData(newEntry);
  res.send("Model training data updated.");
});

app.post("/ask", (req, res) => {
  const question = req.body.question;
  const answer = findBestMatch(question);
  res.send({ answer: answer || "No suitable answer found." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
