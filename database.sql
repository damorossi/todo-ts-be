CREATE DATABASE <tale-name>;

create type status_t as enum('pending', 'progress', 'finished');

#create table no relationship
CREATE TABLE tasks( id SERIAL PRIMARY KEY, title VARCHAR(40), status status_t);

// isert data
INSERT INTO tasks ( title, status) VALUES ('Create API', 'progress'), ('ekmasfasf', 'pending'),('asdfsadf', 'pending'),('Conquer the world', 'progress'),('Another one!', 'progress'),('ab voluptatum amet voluptas', 'progress'),('ipsa repellendus fugit nisi', 'pending'),('vero rerum temporibus dolor', 'progress'),('quo adipisci enim quam ut ab', 'finished'),('et porro tempora', 'pending'),('my updated task', 'finished'),('my updated task', 'pending');
