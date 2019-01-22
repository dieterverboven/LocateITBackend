var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    score: Number,
    beschrijving: String,
    timestamp: Number
})

module.exports = mongoose.model('Feedback', feedbackSchema);