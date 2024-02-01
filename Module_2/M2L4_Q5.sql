SELECT * FROM students LEFT OUTER JOIN enrollments
ON (students.student_id = enrollments.student_id);
