const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exp = require('constants');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middleware/SortMiddleware');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('combined'));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: require('./helpers/handlebars'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});