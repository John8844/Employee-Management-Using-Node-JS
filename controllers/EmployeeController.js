const express = require("express");
const Employee = require("../Models/employee");
const { error } = require("@hapi/joi/lib/base");


const createEmployee = async(req,res) => {
    try{
        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary,
            role: req.body.role
        });

        const oldEmployee = await Employee.findOne({email: req.body.email});
        if(employee.role == "Java Developer" || employee.role == "Js Developer"){
            if(!oldEmployee){
                const newEmployee = await employee.save();
                res.json(newEmployee);
            }else{
                res.send("Employee already Exist!")
            }
        }else{
            res.send("Only Java Developer and Js Developer role is Acceptable...")
        }
    }catch(err){
        res.send("Error : " + err);
    }
};

const getAllEmployee = async(req,res) => {
    if(req.query.page && req.query.limit){
        Employee.paginate({},{page: req.query.page, limit: req.query.limit})
        .then(data => {
            res.status(200).json({
                data
            })
        }).catch(error => {
            res.status(400).json({
                error
            })
        })
    }else{
        Employee.find()
        .then(data => {
            res.status(200).json({
                data
            })
        }).catch(error => {
            res.status(400).json({
                error
            })
        })
    }

    /* try{
        const employees = await Employee.find();
        res.json(employees);
    }catch(err){
        res.send('Error :' + err);
    } */
};

const getEmployee = async(req,res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    }catch(err){
        res.send('Error :' + err);
    }
};

const updateEmployee = async(req,res) => {
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
};

const deleteEmployee = async(req,res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        employee.deleteOne();
        res.send("Employee deleted successfully...");
    }catch(err){
        res.send('Error :' + err);
    }
};


module.exports = {
    createEmployee,
    getEmployee,
    getAllEmployee,
    updateEmployee,
    deleteEmployee
};