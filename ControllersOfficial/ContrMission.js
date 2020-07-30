const express = require('express');
const Mission = require('../ModelsOfficial/Mission');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Mission } = require('../ModelsOfficial/Mission');


router.get('/', (req, res) => {
    Mission.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Missions :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Mission.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Mission :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Mission({
        IdMission: req.body.IdMission,
        objectif: req.body.objectif,
        delai: req.body.delai,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Mission Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        IdMission: req.body.IdMission,
        objectif: req.body.objectif,
        delai: req.body.delai,
    };
    Mission.findByIdAndUpdate(req.params.id, { $set: mission }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Mission Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Mission.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Mission Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;