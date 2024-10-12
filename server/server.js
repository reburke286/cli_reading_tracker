const cors = require('cors')
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const init = require('../client/javascript/index')
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

//for reasons no one understands, putting this in an object and passing it in doens't work. Precious baby. Do not touch.
app.use(cors({
    origin: 'http://localhost:5173', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    init()
  });
});

