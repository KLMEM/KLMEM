const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Mem = require('../models/mem');

router.get('/', (req, res, next) => {
  Mem.find()
    .exec()
    .then((mems) => {
      res.status(200).json({
        wiadomosc: 'Lista wszystkich memow',
        lista: mems,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/', (req, res, next) => {
  const mem = new Mem({
    _id: new mongoose.Types.ObjectId(),
    topText: req.body.topText,
    bottomText: req.body.bottomText,
  });
  mem
    .save()
    .then((result) => {
      res.status(201).json({
        wiadomosc: 'Dodano now',
        info: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
