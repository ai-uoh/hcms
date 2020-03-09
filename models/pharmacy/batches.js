let mongoose = require('mongoose')
let validator = require('validator')

let batch = {
    id: {
        type: String,
        required: true,
        unique: true
    },
    qty: {
        type: Number,
        required: true
    }
}

let batchSchema = new mongoose.Schema([batch])

module.exports = mongoose.model('Batch', batchSchema, 'batches')