const express = require('express');
const cors = require('cors');
// const path = require('path');
const route = require('./src/routes/index.route');

const app = express();
app.use(cors());

const port = 3000;

// Connecting DB
const db = require('./src/config/db/index');
db.connect();

app.use(express.json());

//routes init
route(app);

// app.get('/', (req, res) => {
//   res.render('home');
// });
app.listen(port, () => console.log(`App listen at http://localhost:${port}`));
