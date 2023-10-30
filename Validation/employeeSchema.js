const joi = require("@hapi/joi");

const schema = {
    employee: joi.object({
        name: joi.string().max(100).required(),
        email: joi.string().email().required(),
        salary: joi.number().integer().min(5000).message("Salary must between 5000 - 50000").max(50000).message("Salary must between 5000 - 50000").required(),
        role: joi.string().max(100).required()
    })
    /* 
    ,
    user: joi.object({
        name:joi.string().max(100).required(),
        email: joi.string().email().required(),
        phone: joi.number().integer().min(1000000000).message("Invalid Mobile Number!").max(9999999999).message("Invalid Mobile Number!").required(),
        password: joi.string().max(12).min(8).required()
    })
     */
};

module.exports = schema;