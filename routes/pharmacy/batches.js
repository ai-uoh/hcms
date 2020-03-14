var express = require('express')
var router = express.Router()
var BatchesModel = require('../../models/pharmacy/batches')

/* GET batches listing. */
router.get('/batches/', function (req, res, next) {
    BatchesModel.find().then(medicines => {
        res.send(medicines)
    }).catch(err => {
        res.status(err.status).send(errorResponse(err.status, err.message))
    })
})

/* GET batch from id. */
router.get('/batches/:id', function (req, res, next) {
    BatchesModel.find({
        id: req.params.id
    }).then(batch => {
        res.send(batch)
    }).catch(err => {
        res.status(err.status).send(errorResponse(err.status, err.message))
    })
});

/* POST batches listing. */
router.post('/batches/', function (req, res, next) {
    let batch = new BatchesModel(validateBatch(req))
    batch.save()
        .then(bat => {
            res.send(bat)
        })
        .catch(err => {
            res.status(400).send(errorResponse(400, err.message))
        })
});

/* UPDATE a batch. */
router.put('/batches/:id', (req, res) => {
    BatchesModel.findOneAndUpdate({
        id: req.params.id
    }, validateBatch(req), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }).then(batch => {
        if (!batch) return res.status(404).send(errorResponse(404, `Batch with id ${req.params.id} is not present in the collection`))
        res.send(batch)
    }).catch(err => {
        res.status(400).send(errorResponse(400, err.message))
    })
})

/* DELETE a batch */
router.delete('/batches/:id', (req, res) => {
    BatchesModel
        .findOneAndDelete({
            id: req.params.id
        })
        .then(batch => {
            if (!batch) return res.status(404).send(errorResponse(404, `Medicine with id ${req.params.id} is not present in the collection`))
            res.send(batch)
        })
        .catch(err => {
            res.status(400).send(errorResponse(400, err.message))
        })
})

function validateBatch(req) {
    let batch = {
        id: req.params.id || "BATCH".concat(Math.floor((Math.random() * 10000) + 9999).toString(10)),
        qty: req.body.qty
    }
    return batch;
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