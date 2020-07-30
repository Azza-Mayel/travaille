const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Personne } = require('../ModelsOfficial/Personne');

router.get('/', (req, res) => {
    Personne.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in retrieving Personne :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Personne.findById(req.params.id, (err,doc) => {
            if (!err) {res.send(doc); }
            else { console.log(`Error in Retriving Personne :`+ JSON.stringify(err, undefined, 2))
            };
        });
})  

router.post('/', (req, res) => {
    var emp = new Personne({
        name: req.body.name,
        Email: req.body.Email,
        mdp: req.body.mdp,
        salary: req.body.salary,
        Tel: req.body.Tel,
        Grade: req.body.Grade,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Person Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        Email: req.body.Email,
        mdp: req.body.mdp,
        salary: req.body.salary,
        Tel: req.body.Tel,
        Grade: req.body.Grade,
    };
    Personne.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Person Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Personne.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Person Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;