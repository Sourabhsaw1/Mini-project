async function saveScore(username, score) {
    await fetch('http://localhost:3000/submit-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, score }),
    });
  }
  
  async function getLeaderboard() {
    const response = await fetch('http://localhost:3000/leaderboard');
    const data = await response.json();
    console.log(data);
  }
  