const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Afdeling = require('../models/Stock');

//get lastest stock
router.get('/', (req, res, next)=> {
    Stock.findOne({}, 
        {}, 
        { 
            sort: { 'created_at' : -1 } 
        }, 
        function(err, post) {
            console.log( post );
        })
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
    const stock = new Stock({
        _id: new mongoose.Types.ObjectId(),
        inStock: req.body.inStock,
        timestamp: req.body.timestamp
    });
    stock
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Klaar',
        aangemaakteStock: stock
    })
});

module.exports = router;