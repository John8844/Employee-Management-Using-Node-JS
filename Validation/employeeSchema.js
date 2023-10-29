const joi = require("@hapi/joi");

const schema = {
    employee: joi.object({
        name: joi.string().max(100).required(),
        email: joi.string().email().required(),
        salary: joi.number().integer().min(5000).message("Salary must between 5000 - 50000").max(50000).message("Salary must between 5000 - 50000").required(),
        role: joi.string().max(100).required()
    })
};

module.exports = schema;