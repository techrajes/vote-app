const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  host: 'YOUR_RDS_ENDPOINT',
  user: 'postgres',
  password: 'YOUR_PASSWORD',
  database: 'votes',
  port: 5432,
});

app.get('/results', async (req, res) => {
  const result = {};
  for (let i = 1; i <= 4; i++) {
    const yes = await pool.query("SELECT COUNT(*) FROM votes WHERE question=$1 AND answer='yes'", [i]);
    const no = await pool.query("SELECT COUNT(*) FROM votes WHERE question=$1 AND answer='no'", [i]);
    result['question' + i] = {
      yes: parseInt(yes.rows[0].count),
      no: parseInt(no.rows[0].count)
    };
  }
  res.json(result);
});

app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});