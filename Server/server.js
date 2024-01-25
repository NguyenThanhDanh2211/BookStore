const express = require('express');
const handlebars = require('express-handlebars');
const path = require("path");
const route = require('./src/routes/index.route');
const app = express();
const port = 3000;

// Connecting DB
const db = require('./src/config/db/index');
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// Template engine, HandleBars
const hbs = handlebars.create({ extname: '.hbs' });
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, './src/resourses/views'));


app.use(express.json());

//routes init
route(app);


// app.get('/', (req, res) => {
//   res.render("home");
// });
app.listen(port, () => console.log(`App listen at http://localhost:${port}`));
