CREATE DATABASE dr-todo;

CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(40), email TEXT);
INSERT INTO users(name, email) VALUES ( 'damian', 'damian@gmail.com');

create type status_t as enum('pending', 'progress', 'finished');
# create table for relationshup with users
CREATE TABLE tasks( id SERIAL PRIMARY KEY, title VARCHAR(40), completed BOOLEAN, status status_t, userid: number, FOREIGN KEY (userid) REFERENCES users (id));
INSERT INTO tasks (userid, title, completed, status) VALUES (1,'Create API', false, 'progress');

#create table no relationshup
CREATE TABLE tasks( id SERIAL PRIMARY KEY, title VARCHAR(40), status status_t);


// isert data

{"ok":true,
"data":[
    {"id":41,"title":"ekmasfasf","status":"pending","userid":1},{"id":40,"title":"asdfsadf","status":"pending","userid":1},{"id":30,"title":"Conquer the world","completed":false,"status":"progress","userid":1},{"id":29,"title":"Another one!","completed":false,"status":"progress","userid":1},{"id":8,"title":"ab voluptatum amet voluptas","completed":false,"status":"progress","userid":1}],"totalRows":"11"}1