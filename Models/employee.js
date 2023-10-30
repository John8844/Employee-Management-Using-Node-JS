const { Double } = require("mongodb");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

employeeScheema.plugin(mongoosePaginate);

const Employee = mongoose.model("Employee", employeeScheema);

module.exports = Employee;