const express = require("express");
const router = express.Router();
const Employee = require("../Models/employee");


router.post('/', async(req,res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary,
        role: req.body.role
    });

    try{
        const newEmployee = await employee.save();
        res.json(newEmployee);
    }catch(err){
        res.send("Error : " + err);
    }
});

router.get('/', async(req,res) => {
    try{
        const employees = await Employee.find();
        res.json(employees);
    }catch(err){
        res.send('Error :' + err);
    }
});

router.get('/:id', async(req,res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    }catch(err){
        res.send('Error :' + err);
    }
});

router.patch('/:id', async(req,res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.salary = req.body.salary;
        employee.role = req.body.role;
        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    }catch(err){
        res.send('Error :' + err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        employee.deleteOne();
        res.send("Employee deleted successfully...");
    }catch(err){
        res.send('Error :' + err);
    }
});


module.exports = router;