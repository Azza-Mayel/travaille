const mongoose = require('mongoose');

var Mission = mongoose.model('Mission',{
    IdMission: { type: Number},
    objectif: { type: String},
    delai: { type: String}
});

module.exports = { Mission };