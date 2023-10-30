const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/EmployeeController");

const { addEmployeeValidation } = require("../Validation/employeeValidation");
const authenticate = require("../Middleware/authenticate");


router.post("/", authenticate, addEmployeeValidation, employeeController.createEmployee);
router.get("/",authenticate, employeeController.getAllEmployee);
router.get('/:id',authenticate, employeeController.getEmployee);
router.patch('/:id',authenticate, employeeController.updateEmployee);
router.delete('/:id',authenticate, employeeController.deleteEmployee);


module.exports = router;