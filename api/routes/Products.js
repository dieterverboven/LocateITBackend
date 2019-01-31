const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/Product');
const Config = require('../../config');

//get all products
router.get('/', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        Product.find()
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

// get product by id
router.get('/:productId', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        const id = req.params.productId;
        Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
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

// get products by afdeling
router.get('/afdeling/:afdeling', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        const afdeling = req.params.afdeling;
        Product.find({afdeling : afdeling})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
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

// add product
router.post('/', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            naam: req.body.naam,
            beschrijving: req.body.beschrijving,
            afdeling: req.body.afdeling,
            prijs: req.body.prijs,
            afbeelding: req.body.afbeelding
        });
        product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
            message: 'Klaar',
            aangemaaktProduct: product
        });
    } else {
        res.status(401).json({
            'reason':'unauthorized'
        });
    }
});

// delete product by id
router.delete('/:productId', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
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

//delete all product
router.delete('/', (req, res, next)=> {
    if(req.headers.token == Config.secret){
        Product.remove({})
    .exec()
    .then(result => {
        res.status(200).json(result);
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

//update product
router.patch('/:productId', (req, res, next)=>{
    if(req.headers.token == Config.secret){
        const id = req.params.productId;
        const updateOps = {};

        console.log(req.body);


        for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
        }
        console.log(updateOps);    

        Product.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    } else {
        res.status(401).json({
            'reason':'unauthorized'
        });
    }
});

module.exports = router;
