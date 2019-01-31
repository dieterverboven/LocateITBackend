const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Gebruiker = require('../models/Gebruiker');
const Config = require('../../config');

// add gebruiker
router.post('/', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        Gebruiker.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1)
            {
                return res.status(409).json({
                    message: "Mail is al gebruikt!"
                });
            }
            else
            {
                const gebruiker = new Gebruiker({
                    _id: new mongoose.Types.ObjectId(),
                    naam: req.body.naam,
                    niveau: Number,
                    email: String,
                    passwoord: String,
                });
                gebruiker
                .save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
                res.status(201).json({
                    message: 'Klaar',
                    aangemaakteGebruiker: gebruiker
                });
            }
        })     
    } else {
        res.status(401).json({
            'reason':'unauthorized'
        });
    }
});

router.post('/login', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        console.log(req.body);
        Gebruiker.findOne({email: req.body.email, passwoord: req.body.passwoord})
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

module.exports = router;
