const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Rapport } = require('../ModelsOfficial/Rapport');

// => localhost:3000/Messages/
router.get('/', (req, res) => {
    Message.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Rapports :' + JSON.stringify(err, undefined, 2)); }
    });
})
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Rapport.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Rapport :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) => {
    var emp = new Rapport ({
        titre: req.body.titre,
        date : req.body.date,
        description: req.body.description,
        idresp: req.body.idresp,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Rapport Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        titre: req.body.titre,
        date : req.body.date,
        description: req.body.description,
        idresp: req.body.idresp,
    };
    Rapport.findByIdAndUpdate(req.params.id, { $set: rapport }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Rapport Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Rapport.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Rapport Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;

