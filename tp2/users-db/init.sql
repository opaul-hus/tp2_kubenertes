CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Insert sample data
INSERT INTO users (username, email) VALUES
    ('Alan', 'alan@users.com'),
    ('Bob', 'bob@users.com'),
    ('Carl', 'carl@users.com');