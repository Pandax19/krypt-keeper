DROP DATABASE IF EXISTS event_db;
CREATE DATABASE event_db;

DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (

    id INT,
    name VARCHAR(10)

)

