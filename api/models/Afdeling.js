var mongoose = require('mongoose');

var afdelingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naam: String,
})

module.exports = mongoose.model('Afdeling', afdelingSchema);