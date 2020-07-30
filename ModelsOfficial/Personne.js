const mongoose = require('mongoose');

var Personne = mongoose.model('Personne', {
    name: { type: String },
    Email: { type: String },
    mdp: { type: String },
    salary: { type: Number },
    Tel: { type: Number},
    Grade: { type: String}
});

module.exports = { Personne };