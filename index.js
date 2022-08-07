const fs = require("inquirer");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Departments and roles used for questions, etc. These will have to be replaced by SQL tables. These are all temporary.
let departments = ["Engineering", "Finance", "Legal", "Sales", "Service"];
let roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"];
let managers = ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"];
let employees = ["Tony", "Steven", "Chai", "Manny", "Bhrayan", "Ivan"];

// Main menu for this application, allows user to navigate through it
const mainMenu = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Roles", "View Department", "Add Department", "Quit"],
    name: "whatToDo"
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
    message: "What is this employee's role?",
    choices: roles,
    name: "newEmployeeRole"
  },

  {
    type: "list",
    message: "Who is this employee's manager?",
    choices: managers,
    name: "newEmployeeManager"
  }
]

const updateEmployeeQ = [
  {
    type: "input",
    message: "Which employee's role do you want to update?",
    choices: employees,
    name: "updateEmployeeName"
  },

  {
    type: "input",
    message: "Which role do you want to assign the selected employee?",
    choices: roles,
    name: "updateEmployeeRole"
  }
]

// Question asked if user decides to add a new role
const addRoleQ = [
  {
    type: "input",
    message: "What is the name of this new role?",
    name: "newRoleName"
  },

  {
    type: "input",
    message: "What is the salary of this new role?",
    name: "newRoleSalary"
  }, 

  {
    type: "list",
    message: "What department does this role belong to?",
    choices: departments,
    name: "newRoleDepartment"
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

// Function that executes the program upon launch
async function askQuestions() {

  let keepRunning = true;

  while (keepRunning) {
    const questionInfo = await inquirer.prompt(mainMenu);
    //console.log(questionInfo.whatToDo)

    if (questionInfo.whatToDo === "Quit") {
      keepRunning = false;

    } else if (questionInfo.whatToDo === "View All Employees") {
      console.log(`Managers: ${managers}\nEmployees: ${employees}\n`);

    } else if (questionInfo.whatToDo === "Add Employee") {
      const employeeInfo = await inquirer.prompt(addEmployeeQ);
      const employeeName = employeeInfo.newEmployeeFirstName + " " + employeeInfo.newEmployeeLastName;

      employees.push(employeeName);

    } else if (questionInfo.whatToDo === "Update Employee Role") {
      const updateEmployeeRoleInfo = await inquirer.prompt(updateEmployeeQ);
      console.log("This does nothing at the moment")

    } else if (questionInfo.whatToDo === "View All Roles") {
      console.log(roles);

    } else if (questionInfo.whatToDo === "Add Roles") {
      const roleInfo = await inquirer.prompt(addRoleQ);

      roles.push(roleInfo.newRoleName);

    } else if (questionInfo.whatToDo === "View Department") {
      console.log(departments);

    } else if (questionInfo.whatToDo === "Add Department") {
      const departmentInfo = await inquirer.prompt(addDepartmentQ);

      departments.push(departmentInfo.newDepartmentName);

    } else keepRunning = false;
    
  }
}

askQuestions();