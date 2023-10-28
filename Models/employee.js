const { Double } = require("mongodb");
const mongoose = require("mongoose");

const employeeScheema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    salary:{
        type: Number,
        required:true
    },
    role:{
        type: String,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeScheema);

module.exports = Employee;