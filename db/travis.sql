-- sql script file run before starting travis
-- creates a user for travis and creates recbooker_db
CREATE USER 'recBookerUser'@'localhost' IDENTIFIED BY "12345678";
GRANT ALL ON *.* TO 'recBookerUser'@'localhost';
DROP DATABASE IF EXISTS recbooker_db;
CREATE DATABASE recbooker_db;
