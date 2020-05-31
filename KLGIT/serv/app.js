const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.connect(
  'mongodb+srv://memo:' +
    process.env.ATLAS_PASS +
    '@mbo1997-3vvyd.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);


app.use(morgan('combined'));


app.use(bodyParser.json());


const memRoutes = require('./api/routes/mems');



app.use('/mems', memRoutes);



app.use((req, res, next) => {
  const error = new Error('Nie znaleziono');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    błąd: {
      wiadomosc: error.message,
    },
  });
});


module.exports = app;
