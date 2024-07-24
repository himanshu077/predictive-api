const fs = require('fs');
const data = require('./data');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const similarityThreshold = 0.5;

const normalizationRules = require('./normalizationRules');

function customNormalizeText(text) {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    const normalizedTokens = tokens.map(token => {
        return normalizationRules[token] || stemmer.stem(token);
    });
    return normalizedTokens.join(' ');
}

function cosineSimilarity(text1, text2) {
  console.log({text1,text2});

    const normalizedText1 = customNormalizeText(text1);
    const normalizedText2 = customNormalizeText(text2);
    const tokens1 = normalizedText1.split(' ');
    const tokens2 = normalizedText2.split(' ');
    const allTokens = Array.from(new Set([...tokens1, ...tokens2]));
    const vector1 = allTokens.map(token => tokens1.includes(token) ? 1 : 0);
    const vector2 = allTokens.map(token => tokens2.includes(token) ? 1 : 0);
    const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));

    return dotProduct / (magnitude1 * magnitude2);
}

function findBestMatch(question) {
    let bestMatch = "No suitable answer found.";
    let bestScore = 0;

    data.forEach(item => {
        const score = cosineSimilarity(question, item.question);
        if (score > bestScore) {
            bestScore = score;
            bestMatch = item.answer;
        }
    });

    if (bestScore < similarityThreshold) {
        bestMatch = "No suitable answer found.";
    }

    return bestMatch;
}

function addTrainingData(newEntry) {
    data.push(newEntry);
    fs.writeFileSync('./data.js', `module.exports = ${JSON.stringify(data, null, 2)};\n`);
}

module.exports = { findBestMatch, addTrainingData };
