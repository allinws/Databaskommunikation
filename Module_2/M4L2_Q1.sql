SELECT e.start_date, e.course_code
FROM enrollments AS e, students AS s
WHERE e.student_id = s.student_id
AND s.first_name = "Justin"
AND s.last_name = "Case";
