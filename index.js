const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Departments and roles used for questions, etc. These will have to be replaced by SQL tables. These are all temporary.
let departments = [];
let roles = [];
let managers = [];
let employees = [];

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
  //console.log("Welcome to Employee Tracker! 💼")
  console.log(`
  _______  _______  _______  __   __                                                
  |       ||       ||   _   ||  |_|  |                                               
  |_     _||    ___||  |_|  ||       |                                               
    |   |  |   |___ |       ||       |                                               
    |   |  |    ___||       ||       |                                               
    |   |  |   |___ |   _   || ||_|| |                                               
    |___|  |_______||__| |__||_|   |_|                                               
   _______  _______  __    _  _______  ______    _______  _______  _______  ______   
  |       ||       ||  |  | ||       ||    _ |  |   _   ||       ||       ||    _ |  
  |    ___||    ___||   |_| ||    ___||   | ||  |  |_|  ||_     _||   _   ||   | ||  
  |   | __ |   |___ |       ||   |___ |   |_||_ |       |  |   |  |  | |  ||   |_||_ 
  |   ||  ||    ___||  _    ||    ___||    __  ||       |  |   |  |  |_|  ||    __  |
  |   |_| ||   |___ | | |   ||   |___ |   |  | ||   _   |  |   |  |       ||   |  | |
  |_______||_______||_|  |__||_______||___|  |_||__| |__|  |___|  |_______||___|  |_|
  `)

  // Used in while loop. Loop will continue until keepRunning is set to false
  let keepRunning = true;

  while (keepRunning) {

    // Utilizes user selection from mainMenu to delegate next action
    const questionInfo = await inquirer.prompt(mainMenu);
    switch (questionInfo.whatToDo) {

      // Ends while loop, ends connection to database, and closes program
      case "Exit":
        keepRunning = false;
        console.log("Goodbye! 👋");
        db.end();
        break;

      // Displays all employees in database in table form
      case "View All Employees":
        db.query("SELECT e1.id, e1.first_name, e1.last_name, roles.title AS role, departments.dep_name AS department, roles.salary, Concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e2 ON e2.id = e1.manager_id", function (err, results) {
          console.log("");
          console.table(results);
          console.log("Press arrow keys to continue");
        });
        break;

      // Displays all roles in database in table form
      case "View All Roles":
        db.query('SELECT roles.id, roles.title, roles.salary, departments.dep_name AS department FROM roles JOIN departments ON roles.department_id = departments.id ORDER BY id', function (err, results) {
          console.log("");
          console.table(results);
          console.log("Press arrow keys to continue");
        });
        break;

      // Displays all departments in database in table form
      case "View All Departments":
        db.query('SELECT * FROM departments', function (err, results) {
          console.log("");
          console.table(results);
          console.log("Press arrow keys to continue");
        });
        break;

      case "Add Employee":

        // // Used to get an updated array of roles and managers
        // db.query('SELECT * FROM roles', function (err, results) {
        //   //Obtains all roles from results
        //   let allRoles = results.map((a) => a.title);
        //   //console.log(allRoles)
        //   //Clears roles value for display so that it can pull the latest from the db
        //   roles = [];
        //   roles = allRoles[0].split(",").concat(roles);
        //   console.log(typeof(roles));
        // });

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
        //departments.push(departmentInfo.newDepartmentName);

        db.query(`INSERT INTO departments (dep_name) VALUES ("${departmentInfo.newDepartmentName}");`, function (err, results) {
          console.log(`\n${departmentInfo.newDepartmentName} has been added to departments! ✅`);
        });

        break;

      case "Update Employee Role":
        const updateEmployeeRoleInfo = await inquirer.prompt(updateEmployeeQ);
        console.log("This does nothing at the moment")
        break;
    }
  }
}

askQuestions();