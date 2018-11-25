-- mysql --user=admin --password -s < create_tables.sql > output.txt
use timesheet;

DROP TABLE IF EXISTS timesheet;
create table timesheet
(   
    date DATE,
    employee_id INT,
    employee_name TEXT,
    project_id INT,
    project_name TEXT,
    task_id INT,
    task_name TEXT,
    time_spent INT
);

DROP TABLE IF EXISTS times;
create table times 
(   
    date DATE,
    employee_id INT,
    project_id INT,
    task_id INT,
    time_spent FLOAT
);

DROP TABLE IF EXISTS tasks;
create table tasks
(
    task_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    task_description TEXT
);

DROP TABLE IF EXISTS projects;
create table projects
(
    project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_name TEXT
);

DROP TABLE IF EXISTS employees;
create table employees
(
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_name TEXT,
    employee_email TEXT,
    employee_password TEXT,
    employee_role TEXT
);