var express = require('express');
var router = express.Router();
var RelationModel = require('../../models/pharmacy/medicine_batch')

/* GET relations listing. */
router.get('/relations/', function (req, res, next) {
    RelationModel.find().then(relations => {
        res.send(relations)
    }).catch(err => {
        res.status(err.status).send(errorResponse(err.status, err.message))
    })
})

/* POST relation listing. */
router.post('/relations/', function (req, res, next) {
    let relation = new RelationModel(validateRelation(req))
    relation.save()
        .then(rel => {
            res.send(rel)
        })
        .catch(err => {
            res.status(400).send(errorResponse(400, err.message))
        })
})

/* UPDATE a medicine. */
router.put('/relations/:med_id/:batch_id', (req, res) => {
    RelationModel.findOneAndUpdate({
        med_id: req.params.med_id,
        batch_id: req.params.batch_id
    }, validateRelation(req), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }).then(relation => {
        if (!relation) return res.status(404).send(errorResponse(404, "Search parameters didn't match in the collection"))
        res.send(relation)
    }).catch(err => {
        res.status(400).send(errorResponse(400, err.message))
    })
});

/* DELETE a relation */
router.delete('/relations/:med_id/:batch_id', (req, res) => {

    RelationModel
        .findOneAndDelete({
            med_id: req.params.med_id,
            batch_id: req.params.batch_id
        })
        .then(relation => {
            if (!relation) return res.status(404).send(errorResponse(404, "Search parameters didn't match in the collection"))
            res.send(relation)
        })
        .catch(err => {
            res.status(400).send(errorResponse(400, err.message))
        })
});

function validateRelation(req) {
    let relation = {
        med_id: req.body.med_id || req.params.med_id,
        batch_id: req.body.batch_id || req.params.batch_id,
        mfgDate: req.body.mfgDate,
        expiryDate: req.body.expiryDate,
        instock: req.body.instock,
        qty: req.body.qty
    }
    return relation;
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