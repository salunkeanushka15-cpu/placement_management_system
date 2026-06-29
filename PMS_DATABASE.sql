CREATE DATABASE PMS2_db;

USE PMS2_db;

CREATE TABLE users( 
id INT AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(100) NOT NULL, 
email VARCHAR(100) UNIQUE NOT NULL, 
password VARCHAR(255) NOT NULL,
role ENUM('student','tpo') NOT NULL
);

CREATE TABLE students( 
student_id INT AUTO_INCREMENT PRIMARY KEY, 
user_id INT NOT NULL, branch VARCHAR(100), 
cgpa DECIMAL(3,2), 
backlogs INT DEFAULT 0, 
skills TEXT, 
phone VARCHAR(15), 
resume VARCHAR(255), 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 

FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE 
);

CREATE TABLE companies( 
company_id INT AUTO_INCREMENT PRIMARY KEY, 
company_name VARCHAR(150) NOT NULL, 
role_offered VARCHAR(150), 
package_offered DECIMAL(10,2), 
eligibility_cgpa DECIMAL(3,2), 
max_backlog INT DEFAULT 0, 
location VARCHAR(100), 
deadline DATETIME, 
description TEXT, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE applications( 
application_id INT AUTO_INCREMENT PRIMARY KEY, 
student_id INT NOT NULL, 
company_id INT NOT NULL, 
status ENUM( 
	'applied', 
    'shortlisted', 
    'rejected', 
    'selected', 
    'waitlisted'
    ) DEFAULT 'applied', 
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    UNIQUE(student_id, company_id), 
    
    FOREIGN KEY (student_id) 
    REFERENCES students(student_id) 
    ON DELETE CASCADE, 
    
    FOREIGN KEY (company_id) 
    REFERENCES companies(company_id) 
    ON DELETE CASCADE 
    );	
    
    SHOW TABLES;