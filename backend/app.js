const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});