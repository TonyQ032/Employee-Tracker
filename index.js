const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Departments and roles used for questions, etc. These will have to be replaced by SQL tables. These are all temporary.
let departments = ["Engineering", "Finance", "Legal", "Sales", "Service"];
let roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"];
let managers = ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"];
let employees = ["Tony", "Steven", "Chai", "Manny", "Bhrayan", "Ivan"];

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Main menu for this application, allows user to navigate through it
const mainMenu = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"],
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

  // Welcomes the user on their first boot-up
  console.log("Welcome to Employee Tracker! 💼")

  let keepRunning = true;

  while (keepRunning) {
    const questionInfo = await inquirer.prompt(mainMenu);
    //console.log(questionInfo.whatToDo)

    switch (questionInfo.whatToDo) {
      case "Exit":
        keepRunning = false;
        console.log("Goodbye! 👋");
        db.end();
        break;

      // Displays all employees in database in table form
      case "View All Employees":
        db.query('SELECT * FROM employees', function (err, results) {
          console.log("");
          console.table(results);
        });
        break;

      // Displays all roles in database in table form
      case "View All Roles":
        db.query('SELECT * FROM roles', function (err, results) {
          console.log("");
          console.table(results);
        });
        break;

      // Displays all departments in database in table form
      case "View All Departments":
        db.query('SELECT * FROM departments', function (err, results) {
          console.log("");
          console.table(results);
        });
        break;

      case "Add Employee":
        const employeeInfo = await inquirer.prompt(addEmployeeQ);
        const employeeName = employeeInfo.newEmployeeFirstName + " " + employeeInfo.newEmployeeLastName;

        employees.push(employeeName);
        break;

      case "Add Role":
        const roleInfo = await inquirer.prompt(addRoleQ);
        roles.push(roleInfo.newRoleName);
        break;

      case "Add Department":
        const departmentInfo = await inquirer.prompt(addDepartmentQ);
        departments.push(departmentInfo.newDepartmentName);
        break;

      case "Update Employee Role":
        const updateEmployeeRoleInfo = await inquirer.prompt(updateEmployeeQ);
        console.log("This does nothing at the moment")
        break;
    }
  }
}

askQuestions();