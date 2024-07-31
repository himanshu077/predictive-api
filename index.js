const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
app.use(bodyParser.json());

let storyText = '';
let sentences = [];

const tokenizer = new natural.SentenceTokenizer();         

app.post('/submit-story', (req, res) => {
  storyText = req.body.story;
  sentences = tokenizer.tokenize(storyText);
  res.send({ message: 'Story received.' });
});

app.post('/ask-question', (req, res) => {
  const question = req.body.question;
console.log({storyText,sentences});
  // Tokenize and normalize the question
  const questionTokens = new natural.WordTokenizer().tokenize(question.toLowerCase());
  
  // Find the sentence with the highest keyword match
  let bestMatch = { sentence: '', score: 0 };
  sentences.forEach(sentence => {
    const sentenceTokens = new natural.WordTokenizer().tokenize(sentence.toLowerCase());
    const commonTokens = questionTokens.filter(token => sentenceTokens.includes(token));
    const score = commonTokens.length;
    
    if (score > bestMatch.score) {
      bestMatch = { sentence, score };
    }
  });

  if (bestMatch.score > 0) {
    res.send({ answer: bestMatch.sentence });
  } else {
    res.send({ answer: 'Sorry, I could not find an answer in the story.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
