SELECT e.start_date, c.course_full_name
FROM enrollments AS e, students AS s, courses AS c
WHERE e.student_id = s.student_id
AND e.course_code = c.course_code
AND s.first_name = "Justin"
AND s.last_name = "Case"
ORDER BY e.start_date;