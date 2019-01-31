const mongoose = require('mongoose');

const gebruikerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naam: String,
    niveau: Number,
    email: String,
    passwoord: String,
})

module.exports = mongoose.model('Gebruiker', gebruikerSchema);