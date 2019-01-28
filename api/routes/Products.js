const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/Product');


//get all products
router.get('/', (req, res, next)=> {
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
});

// get product by id
router.get('/:productId', (req, res, next)=> {
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
});

// get products by afdeling
router.get('/afdeling/:afdeling', (req, res, next)=> {
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
});

// add product
router.post('/', (req, res, next)=> {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        naam: req.body.naam,
        beschrijving: req.body.beschrijving,
        afdeling: req.body.afdeling,
        prijs: req.body.prijs
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
    })
});

// delete product by id
router.delete('/:productId', (req, res, next)=> {
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
});

//delete all product
router.delete('/', (req, res, next)=> {
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
});

//update product
router.patch('/:productId', (req, res, next)=>{
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


});

module.exports = router;
