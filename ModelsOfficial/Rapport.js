const mongoose = require('mongoose');

var Rapport = mongoose.model('Rapport',{
    date : { type : string},
    description : { type : String},
    titre : { type : String },
    idresp : { type : Number}
});

module.exports = { Rapport };