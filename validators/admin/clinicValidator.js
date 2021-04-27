const Joi = require('joi');

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(4)
        .max(255)
        .required()
})
