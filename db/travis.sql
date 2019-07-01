-- sql script file run before starting travis
-- CREATE USER 'recBookerUser'@'localhost' IDENTIFIED BY 'recBookerUser';
CREATE USER 'recBookerUser'@'localhost' IDENTIFIED BY "12345678";

GRANT ALL ON *.* TO 'recBookerUser'@'localhost';

IF NOT EXISTS CREATE DATABASE recbooker_db;
