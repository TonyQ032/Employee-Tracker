# Employee-Tracker
![License](https://img.shields.io/static/v1?label=License&message="MIT&color=BLUE)

A command line application that stores user info and creates a functioning database powered by Node.js and MySQL.

## Description
The purpose of this application was to create a command-line application that primarily utilizes MySQL and Node.js. The user is able to access a database of employees, their roles, departments, salaries, etc, and is able to add to, as well as update this database through the application.

This application utilizes the `schema.sql` and `seeds.sql` files within the `/db` folder for the initial creation and seeding of the database and its various tables and data. After the initial creation and seeding, the user is able to edit this database entirely through the application. This is done through a combination of the npm packages `Inquirer` and `MySQL2`. 

`Inquirer` is used for the User Interface while `MySQL2` is used to execute MySQL queries to the database depending on the information input by the user.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Licenses](#licenses)
* [Demonstration](#demonstration)
* [Questions](#questions)

## Installation
This application utilizes the following npm packages:
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Console.table](https://www.npmjs.com/package/console.table)

Be sure to carefully follow the installation instructions for proper usage of this application.

1. This app is run on Node.js and MySQL, as a result, make sure those are properly installed and configured before continuing on.
2. Navigate to the root of this repo and run `npm install` to download all the necessary npm packages.
3. Within `index.js` within the object `db` on `line 15`, enter your MySQL user (by default it is root) and password (if you have one).
4. Save these changes.
5. `cd` into `/db` and execute `mysql -u root -p`.
6. Once succesfully logged in, execute `source schema.sql` to create database and tables.
7. Execute `source seeds.sql` to seed tables with data.
8. Run `exit` to exit out of MySQL.
9. `cd` back into the root of the repo.
10. You are now ready to begin the application by running `node index.js`.

## Usage
Upon proper installation, simply running `node index.js` from the root of this repo will begin the application. From there the user will be given a number of options they can choose from by navigating with the arrow keys. The application can be exited at any time by executing `ctrl + c` or selecting `exit` from the main menu.

## Licenses
This project falls under the following license(s): 

* MIT

## Demonstration
Screenshot of the application running in a MacOS terminal:

![Screenshot of application running in MacOS Terminal](./Assets/tracker-terminal.png)

A video demonstration of this application can be found by clicking [here.](https://drive.google.com/file/d/1gbRlVaBy9R8gLGKAwRWPgJhHZEp9wJ_H/view)
## Questions
If you have any questions, please contact me below: 


Github: [TonyQ032](https://github.com/TonyQ032) 

Email: AnthonyQ032@gmail.com


Copyright (c) 2022 Anthony Quinones