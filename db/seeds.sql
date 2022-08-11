INSERT INTO departments (dep_name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Sales"),
("Service");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Lead", 55000.00, 4),
("Salesperson", 43000.00, 4),
("Lead Engineer", 250000.00, 1),
("Software Engineer", 80000.00, 1),
("Account Manager", 72000.00, 2),
("Accountant", 54000.00, 2),
("Legal Team Lead", 232000.00, 3),
("Lawyer", 160000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Hideo", "Kojima", 3, NULL),
("Chai", "Suksanguan", 4, 1),
("Ivan", "Furlong", 4, 1),
("Manuel", "Gavino", 1, NULL),
("Michael", "Scott", 2, 4),
("Kevin", "Malone", 5, NULL),
("Gilberto", "Escobedo", 6, 6),
("Diana", "Contreras", 2, 4),
("Thomas", "Long", 2, 4),
("James", "McGill", 7, NULL),
("Nate", "McIlvenny", 8, 10),
("Kimberly", "Wexler", 8, 10);