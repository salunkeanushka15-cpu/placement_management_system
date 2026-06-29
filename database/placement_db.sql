CREATE DATABASE placement_db;

USE placement_db;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100), 
email VARCHAR(100) Unique NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM ('student','tpo') NOT NULL
);

INSERT INTO users(name, email, password, role)
VALUES
('Anushka Salunke','salunke.15@gamil.com','anushka@123','student'),
('TPO','tpo@gmail.com','tpo123','tpo');

SELECT*FROM users;
