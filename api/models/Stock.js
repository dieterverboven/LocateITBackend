var mongoose = require('mongoose');

var stockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    inStock: Boolean,
    timestamp: String
})

module.exports = mongoose.model('Stock', stockSchema);