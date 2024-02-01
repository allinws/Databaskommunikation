DROP DATABASE university;

CREATE DATABASE university;
USE university;

CREATE TABLE IF NOT EXISTS students
(
student_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(40),
last_name VARCHAR(40),
email VARCHAR(99)
);
CREATE TABLE IF NOT EXISTS courses
(
course_code CHAR(5) PRIMARY KEY,
course_full_name VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS offerings
(
course_code CHAR(5) NOT NULL,
start_date DATE NOT NULL,
PRIMARY KEY (course_code, start_date),
FOREIGN KEY (course_code) REFERENCES courses(course_code)
);

CREATE TABLE IF NOT EXISTS enrollments
(
student_id INT NOT NULL,
course_code CHAR(5) NOT NULL,
start_date DATE NOT NULL,
final_mark INT,
PRIMARY KEY (student_id, course_code, start_date),
FOREIGN KEY (student_id) REFERENCES students(student_id),
FOREIGN KEY (course_code, start_date) REFERENCES offerings(course_code, start_date)
);

INSERT INTO students (first_name, last_name, email) VALUES
("Justin","Case","why@stu.dy"),
("Notso","Bright","bo@r.ed"),
("An","Other","i@me.you"),
("Teri","Fic","lazy@this.uni"),
("John", "Doe", "who@i.am");

INSERT INTO courses (course_code, course_full_name) VALUES
("SQL1","Databases and SQL 1"),
("NIX1","Unix technologies 1"),
("NET2","Computer Networking 2");

INSERT INTO offerings (course_code, start_date) VALUES
("SQL1",'20200216'),
("SQL1",'20200608'),
("NIX1",'20200113'),
("NIX1",'20200504'),
("NET2",'20200309'),
("NET2",'20200629');

INSERT INTO enrollments (student_id, course_code, start_date) VALUES
("1","SQL1",'20200216'),
("2","SQL1",'20200216'),
("3","SQL1",'20200216'),
("4","SQL1",'20200608'),
("1","NIX1",'20200113'),
("2","NIX1",'20200113'),
("3","NIX1",'20200504'),
("4","NIX1",'20200504'),
("1","NET2",'20200629'),
("2","NET2",'20200629'),
("3","NET2",'20200629'),
("4","NET2",'20200629');
