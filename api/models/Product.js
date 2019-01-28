var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naam: String,
    beschrijving: String,
    afdeling: String,
    afbeelding: String,
    prijs: Number
})

module.exports = mongoose.model('Product', productSchema);