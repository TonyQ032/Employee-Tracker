INSERT INTO departments (dep_name)
VALUES 
("Engineering"),
("Financing"),
("Legal"),
("Sales"),
("Service");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Lead", 55000.00, 4),
("Salesperson", 43000.00, 4),
("Lead Engineer", 10000.00, 1),
("Software Engineer", 80000.00, 1),
("Account Manager", 72000.00, 2),
("Accountant", 54000.00, 2),
("Legal Team Lead", 232000.00, 3),
("Lawyer", 160000.00, 3),
("Customer Service", 40000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Chai", "Suksanguan", 4, NULL),
("Ivan", "Furlong", 4, NULL),
("Luis", "Escobar", 2, NULL),
("Manuel", "Gavino", 1, 4),
("Hideo", "Kojima", 3, 5),
("Cesar", "Infante", 5, 6),
("Gilberto", "Escobedo", 6, NULL),
("Nate", "McIlvenny", 8, NULL),
("Skyler", "Ferreira", 9, NULL),
("Diana", "Contreras", 2, NULL),
("Thomas", "Long", 2, NULL),
("Daniel", "Cooper", 9, NULL),
("Kimberly", "Wexler", 8, NULL),
("James", "McGill", 7, 14);