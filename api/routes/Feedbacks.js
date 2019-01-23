const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Feedback = require('../models/Feedback');


//get all feedback
router.get('/', (req, res, next)=> {
    Feedback.find()
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

// get feedback by id
router.get('/:feedbackId', (req, res, next)=> {
    const id = req.params.feedbackId;
    Feedback.findById(id)
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

// add feedback
router.post('/', (req, res, next)=> {
    const feedback = new Feedback({
        _id: new mongoose.Types.ObjectId(),
        score: req.body.score,
        beschrijving: req.body.beschrijving,
        timestamp: req.body.timestamp
    });
    feedback
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Klaar',
        aangemaakteFeedback: feedback
    })
});

// delete feedback by id
router.delete('/:feedbackId', (req, res, next)=> {
    const id = req.params.feedbackId;
    Feedback.remove({_id: id})
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

//delete all feedback
router.delete('/', (req, res, next)=> {
    Feedback.remove({})
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

//update feedback
router.patch('/:feedbackId', (req, res, next)=>{
    const id = req.params.feedbackId;
    const updateOps = {};

    console.log(req.body);


    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    console.log(updateOps);    

    Feedback.update({_id: id}, { $set: updateOps})
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
