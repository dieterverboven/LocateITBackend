const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Afdeling = require('../models/Afdeling');

//get all afdeling
router.get('/', (req, res, next)=> {
    Afdeling.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// add afdeling
router.post('/', (req, res, next)=> {
    const afdeling = new Afdeling({
        _id: new mongoose.Types.ObjectId(),
        naam: req.body.score
    });
    afdeling
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Klaar',
        aangemaakteAfdeling: afdeling
    })
});

module.exports = router;