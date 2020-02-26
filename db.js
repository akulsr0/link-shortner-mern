const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(
  config.get('db_url'),
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Database Connected');
  }
);
