CREATE DATABASE dr-todo;

CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(40), email TEXT);
INSERT INTO users(name, email) VALUES ( 'damian', 'damian@gmail.com');

create type status_t as enum('pending', 'progress', 'finished');
CREATE TABLE tasks( id SERIAL PRIMARY KEY, title VARCHAR(40), completed BOOLEAN, status status_t, userId: number, FOREIGN KEY (userId) REFERENCES users (id));

INSERT INTO tasks (userId, title, completed, status) VALUES (1,'Create API', false, 'progress');
