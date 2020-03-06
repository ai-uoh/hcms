var Joi = require('joi');

var med_schema = function validateMedicine(medicine) {

    const ingr = {
        name: Joi.string(),
        conc: Joi.string()
    }

    const med_details = [
        {
            id: Joi.string().min(3).max(10),
            name: Joi.string().required(),
            mfgBy: Joi.string().required(),
            description: Joi.string(),
            ingredients: Joi.array().items(ingr),
            cost: Joi.number(),
            uses: Joi.array(),
            side_effects: Joi.array(),
            safety_instructions: Joi.string()
        }
    ];
    return Joi.validate(medicine, med_details);
}

module.exports.med_schema = med_schema