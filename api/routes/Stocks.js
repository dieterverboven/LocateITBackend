const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stock = require('../models/Stock');
const Config = require('../../config');

//get lastest stock

router.get('/', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        Stock.findOne({}, 
            {}, 
            { 
                sort: { 'timestamp' : -1 } 
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
    } else {
        res.status(401).json({
            'reason':'unauthorized'
        });
    }
});

// add afdeling
router.post('/', (req, res, next)=> {
    if(req.headers.token == Config.secret){

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

    } else {
        res.status(401).json({
            'reason':'unauthorized'
        });
    }
    
});

module.exports = router;