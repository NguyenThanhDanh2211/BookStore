const express = require('express');

const app = express();
const port = 3000;

const db = require('./src/config/db/index');
db.connect();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to BookStore App!');
});
app.listen(port, () => console.log(`App listen at http://localhost:${port}`));
