var express = require('express')
var router = express.Router()
var BatchesModel = require('../../models/pharmacy/batches')

/* GET batches listing. */
router.get('/batches/', function (req, res, next) {
    BatchesModel.find().then(medicines => {
        res.send(medicines)
    })
        .catch(err => {
            console.error(err)
        })
})

/* GET batch from id. */
router.get('/batches/:id', function (req, res, next) {
    BatchesModel.find({
        id: req.params.id
    }).then(batch => {
        res.send(batch)
    })
        .catch(err => {
            console.error(err)
        })
});

/* POST batches listing. */
router.post('/batches/', function (req, res, next) {

    var batches = []
    for (var key in req.body) {
        let batch = new BatchesModel({
            id: "BATCH".concat(Math.floor((Math.random() * 10000) + 9999).toString(10)),
            qty: req.body[key].qty
        })
        batch.save().catch(err => {
            console.error(err)
        })
        batches.push(batch)
    }
    res.send(batches)
});

/* UPDATE a batch. */
router.put('/batches/:id', (req, res) => {

    BatchesModel.findOneAndUpdate({
        id: req.params.id
    }, {
        id: req.params.id,
        qty: req.body.qty
    }, {
        new: true,
        runValidators: true
    }, function (err) {
        if (err) res.status(400).send(err.errors.id.name + ", " + err.errors.id);
    })
        .then(doc => {
            if (!doc) return res.status('404').send(`Batch with id ${req.params.id} is not present in the collection`)
            res.send(doc)
        }).catch(err => {
            console.error(err)
        })
})

/* DELETE a batch */
router.delete('/batches/:id', (req, res) => {

    BatchesModel
        .findOneAndRemove({
            id: req.params.id
        })
        .then(doc => {
            if (!doc) return res.status('404').send(`Batch with id ${req.params.id} is not present in the collection`);
            res.send(doc)
        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router