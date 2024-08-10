const express = require('express');
const app = express();
const serverless = require('serverless-http');

app.use(express.json());

let votes = {
    Song1: 0,
    Song2: 0,
    Song3: 0,
    Song4: 0,
    Song5: 0,    
  
};

app.post('/vote', (req, res) => {
    const { song } = req.body;
    if (votes[song] !== undefined) {
        votes[song]++;
    }

    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    let results = {};

    for (let [key, value] of Object.entries(votes)) {
        results[key] = {
            votes: value,
            percentage: ((value / totalVotes) * 100).toFixed(2)
        };
    }

    res.json(results);
});

module.exports = app;
module.exports.handler = serverless(app);
