const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Function that executes the program upon launch
async function askQuestions() {

  // Departments and roles used for questions, etc. These will have to be replaced by SQL tables. These are all temporary.
  let departments;
  let roles;
  let managers;
  let employees;

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

  // Welcomes the user on their first boot-up
  //console.log("Welcome to Employee Tracker! 💼")
  console.log(`                   
   _______  __   __  _______  ___      _______  __   __  _______  _______ 
  |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
  |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
  |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
  |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
  |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
  |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
      _______  ______    _______  _______  ___   _  _______  ______       
     |       ||    _ |  |   _   ||       ||   | | ||       ||    _ |      
     |_     _||   | ||  |  |_|  ||       ||   |_| ||    ___||   | ||      
       |   |  |   |_||_ |       ||      _||      _||   |___ |   |_||_     
       |   |  |    __  ||       ||     |_ |     |_ |    ___||    __  |    
       |   |  |   |  | ||   _   ||       ||    _  ||   |___ |   |  | |    
       |___|  |___|  |_||__| |__||_______||___| |_||_______||___|  |_|    
                                     
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

        // Retrieves all roles and creates an array of them
        let roleData = await db.promise().query("SELECT * FROM roles")

        let roleArray = roleData[0].map(role => role.title)

        roles;
        roles = roleArray;

        // Retrieves all managers and creates an array of them
        let managerData = await db.promise().query("SELECT * FROM employees WHERE manager_id IS NULL")

        let managerArray = managerData[0].map(manager => manager.first_name + " " + manager.last_name)

        managers;
        managers = managerArray;

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
        // Used to get an updated array of roles and managers which is then used for the 'choices' array in the inquirer questions
        const employeeInfo = await inquirer.prompt(addEmployeeQ);

        const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager} = employeeInfo;

        // Finds Role ID which is used in creating a new employee
        const roleIdData = await db.promise().query(`SELECT * FROM roles WHERE title = '${newEmployeeRole}'`);

        const roleId = roleIdData[0][0].id;
      
        // Finds Manager ID which is used in creating a new employee. Needs to be split back into a first and last name for parameters
        const manNameArray = newEmployeeManager.split(" ");
        const manFirstName = manNameArray[0];
        const manLastName = manNameArray[1];

        // Takes user input for manager and retrieves their corresponding id number
        const managerIdData = await db.promise().query(`SELECT * FROM employees WHERE first_name = '${manFirstName}' AND last_name = '${manLastName}'`);

        const managerId = managerIdData[0][0].id;

        // Finally creates new employee and adds it into employees table
        await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${newEmployeeFirstName}', '${newEmployeeLastName}', ${roleId}, ${managerId})`);

        console.log(`${manFirstName} ${manLastName} has been added to employees! ✅`)

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