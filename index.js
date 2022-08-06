const fs = require("inquirer");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Departments and roles used for questions
let departments = ["Engineering", "Finance", "Legal", "Sales", "Service"];
let roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"];

// Main menu for this application, allows user to navigate through it
const mainMenu = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Roles", "View Department", "Add Department", "Quit"],
    name: "whatToDo",
  }
]

// Questions to be asked if the user wants to create a new employee
const addEmployeeQ = [
  {
    type: "input",
    message: "What is the FIRST name of this new employee?",
    name: "newEmployeeFirstName"
  },

  {
    type: "input",
    message: "What is the LAST name of this new employee?",
    name: "newEmployeeLastName"
  },

  {
    type: "list",
    message: "What department does this role belong to?",
    choices: roles,
    name: "newEmployeeRole",
  }
]

// Question asked if user decides to add a new role
const addRoleQ = [
  {
    type: "input",
    message: "What is the name of this new employee?",
    name: "newRoleQ"
  },

  {
    type: "input",
    message: "What is the salary of this new employee?",
    name: "newRoleSalary"
  }, 

  {
    type: "list",
    message: "What department does this role belong to?",
    choices: departments,
    name: "newRoleDepartment",
  }
]

// Question asked if user decides to add a department
const addDepartmentQ = [
  {
    type: "input",
    message: "What is the name of this new department?",
    name: "newDepartmentName"
  },
]
