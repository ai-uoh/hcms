let mongoose = require('mongoose')
let validator = require('validator')

const ingr = {
    name: String,
    conc: String
}

let medSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mfgBy: {
        type: String,
        required: true
    },
    description: String,
    ingredients: [ingr],
    cost: Number,
    uses: [String],
    side_effects: [String],
    safety_instructions: String
})


module.exports = mongoose.model('Medicine', medSchema, 'medicines')