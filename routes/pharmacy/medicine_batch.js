var express = require('express');
var router = express.Router();
var RelationModel = require('../../models/pharmacy/medicine_batch')

/* GET relations listing. */
router.get('/relations/', function (req, res, next) {
    RelationModel.find().then(relations => {
        res.send(relations)
    })
        .catch(err => {
            console.error(err)
        })
})

/* POST relation listing. */
router.post('/relations/', function (req, res, next) {

    var relations = []
    for (var key in req.body) {
        let relation = new RelationModel({
            med_id: req.body[key].med_id,
            batch_id: req.body[key].batch_id,
            mfgDate: req.body[key].mfgDate,
            expiryDate: req.body[key].expiryDate,
            instock: req.body[key].instock,
            qty: req.body[key].qty
        })
        relation.save().catch(err => {
            console.error(err)
        })
        relations.push(relation)
    }
    res.send(relations)
})

/* UPDATE a medicine. */
router.put('/relations/:med_id/:batch_id', (req, res) => {

    RelationModel.findOneAndUpdate({
        med_id: req.params.med_id,
        batch_id: req.params.batch_id
    }, {
        mfgDate: req.body.mfgDate,
        expiryDate: req.body.expiryDate,
        instock: req.body.instock,
        qty: req.body.qty
    }, {
        new: true,
        runValidators: true
    }, function (err) {
        if (err) res.status(400).send(err.errors.id.name + ", " + err.errors.id)
    })
        .then(doc => {
            if (!doc) return res.status('404').send("Search parameters didn't match in the collection.")
            res.send(doc)
        }).catch(err => {
            console.error(err)

        })
});

/* DELETE a relation */
router.delete('/relations/:med_id/:batch_id', (req, res) => {

    RelationModel
        .findOneAndRemove({
            med_id: req.params.med_id,
            batch_id: req.params.batch_id,
        })
        .then(doc => {
            if (!doc) return res.status('404').send("Search parameters didn't match in the collection.")
            res.send(doc)
        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router