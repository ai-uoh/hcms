var express = require('express');
var router = express.Router();
var MedicinesModel = require('../../models/pharmacy/medicines')

/* GET medicines listing. */
router.get('/medicines/', function (req, res, next) {
    MedicinesModel.find().then(medicines => {
        res.send(medicines)
    }).catch(err => {
        res.status(err.status).send(errorResponse(err.status, err.message))
    })
})

/* GET medicine from id. */
router.get('/medicines/:id', function (req, res, next) {
    MedicinesModel.find({
        id: req.params.id
    }).then(medicine => {
        res.send(medicine)
    }).catch(err => {
        res.status(err.status).send(errorResponse(err.status, err.message))
    })
})

/* POST medicines listing. */
router.post('/medicines/', function (req, res, next) {

    let medicine = new MedicinesModel(validateMedicine(req))
    medicine.save()
        .then(med => {
            res.send(med)
        })
        .catch(err => {
            res.status(400).send(errorResponse(400, err.message))
        })
})

/* UPDATE a medicine. */
router.put('/medicines/:id', (req, res) => {
    MedicinesModel.findOneAndUpdate({
        id: req.params.id
    }, validateMedicine(req), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }).then(medicine => {
        if (!medicine) return res.status(404).send(errorResponse(404, `Medicine with id ${req.params.id} is not present in the collection`))
        res.send(medicine)
    }).catch(err => {
        res.status(400).send(errorResponse(400, err.message))
    })
});

/* DELETE a medicine */
router.delete('/medicines/:id', (req, res) => {
    MedicinesModel
        .findOneAndDelete({
            id: req.params.id
        })
        .then(medicine => {
            if (!medicine) return res.status(404).send(errorResponse(404, `Medicine with id ${req.params.id} is not present in the collection`))
            res.send(medicine)
        })
        .catch(err => {
            res.status(400).send(errorResponse(400, err.message))
        })
});

function validateMedicine(req) {
    let medicine = {
        id: req.params.id || "MED".concat(Math.floor((Math.random() * 10000) + 9999).toString(10)),
        name: req.body.name,
        mfgBy: req.body.mfgBy,
        description: req.body.description,
        ingredients: req.body.ingredients,
        cost: req.body.cost,
        uses: req.body.uses,
        side_effects: req.body.side_effects,
        safety_instructions: req.body.safety_instructions
    }
    return medicine;
}

function errorResponse(status, message) {
    return {
        error: {
            status: status,
            message: message
        }
    }
}

module.exports = router