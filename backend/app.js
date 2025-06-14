require('dotenv').config();
const express = require('express');
const app = express();

// Get config from .env
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// Simple route to show env is working
app.get('/', (req, res) => {
    res.send(`
      <h1>Notes App Backend</h1>
      <p>Server is running!</p>
      <p>Database User: ${DB_USER}</p>
      <p>Port: ${PORT}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});