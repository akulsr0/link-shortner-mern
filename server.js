const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to Link Shortner API');
});

app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
