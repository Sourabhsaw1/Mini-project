const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://localhost:27017/puzzleGame', { useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

// API endpoints
app.post('/submit-score', async (req, res) => {
  const { username, score } = req.body;
  const newScore = new Score({ username, score });
  await newScore.save();
  res.json({ message: 'Score saved!' });
});

app.get('/leaderboard', async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

