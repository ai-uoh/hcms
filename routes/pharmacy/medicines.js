var express = require('express');
var router = express.Router();
var mongo_connect = require('./../../utilities/mongo_connector');
var MedicinesModel = require('../../models/pharmacy/medicines')

/* GET medicines listing. */
router.get('/medicines/', function (req, res, next) {
    MedicinesModel.find().then(medicines => {
        res.send(medicines)
    })
        .catch(err => {
            console.error(err)
        })
})

/* GET medicine from name. */
router.get('/medicines/:id', function (req, res, next) {
    MedicinesModel.find({
        id: req.params.id
    }).then(medicine => {
        res.send(medicine)
    })
        .catch(err => {
            console.error(err)
        })
});

/* GET medicines listing. */
router.post('/medicines/', function (req, res, next) {

    var medicines = []
    for (var key in req.body) {
        let medicine = new MedicinesModel({
            id: "MED".concat(Math.floor((Math.random() * 10000) + 9999).toString(10)),
            name: req.body[key].name,
            mfgBy: req.body[key].mfgBy,
            description: req.body[key].description,
            ingredients: req.body[key].ingredients,
            cost: req.body[key].cost,
            uses: req.body[key].uses,
            side_effects: req.body[key].side_effects,
            safety_instructions: req.body[key].safety_instructions
        })
        medicine.save().catch(err => {
            console.error(err)
        })
        medicines.push(medicine)
    }
    res.send(medicines);
});

/* UPDATE a medicine. */
router.put('/medicines/:id', (req, res) => {

    MedicinesModel.findOneAndUpdate({
        id: req.params.id
    }, {
        id: req.params.id,
        name: req.body.name,
        mfgBy: req.body.mfgBy,
        description: req.body.description,
        ingredients: req.body.ingredients,
        cost: req.body.cost,
        uses: req.body.uses,
        side_effects: req.body.side_effects,
        safety_instructions: req.body.safety_instructions
    }, {
        new: true,
        runValidators: true
    }, function (err) {
        if (err) res.status(400).send(err.errors.id.name + ", " + err.errors.id);
    })
        .then(doc => {
            if (!doc) return res.status('404').send(`Medicine with id ${req.params.id} is not present in the collection`);
            res.send(doc)
        }).catch(err => {
            console.error(err)

        })
});

// DELETE a medicine
router.delete('/medicines/:id', (req, res) => {

    MedicinesModel
        .findOneAndRemove({
            id: req.params.id
        })
        .then(doc => {
            if (!doc) return res.status('404').send(`Medicine with id ${req.params.id} is not present in the collection`);
            res.send(doc)
        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;