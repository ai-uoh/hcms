let mongoose = require('mongoose')
let validator = require('validator')

let med_batch = new mongoose.Schema({
    med_id: {
        type: String,
        required: true
    },
    batch_id: {
        type: String,
        required: true
    },
    mfgDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    instock: {
        type: Boolean,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('MedBatch', med_batch, 'medicine_batch')