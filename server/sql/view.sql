#课程平均成绩,合格率视图
CREATE OR REPLACE VIEW all_course_avg_pass AS 
SELECT 
	co.c_name AS '课程名',
    ROUND(AVG(r.r_grade),2) AS '平均分',
    CONCAT(ROUND((SUM(CASE WHEN r.r_grade > 60 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS '及格率'
FROM Report r
JOIN Course co ON r.course_no = co.course_no
GROUP BY r.course_no;


    
#学生成绩及排名视图(至今所有课程的GPA)
CREATE OR REPLACE VIEW Weighted_Grades_View 
AS
SELECT 
    Student.s_name AS '学生名',
    SUM(Report.r_grade * Course.c_credits / Total_Credits.total_credits) AS '加权成绩',
    RANK() OVER (ORDER BY SUM(Report.r_grade * Course.c_credits / Total_Credits.total_credits) DESC) AS '加权成绩排名'
FROM 
    Report
JOIN
	Student ON Student.student_no=Report.student_no
JOIN 
    Course ON Report.course_no = Course.course_no
JOIN 
    (SELECT Report.student_no, SUM(Course.c_credits) AS total_credits 
     FROM Report 
     JOIN Course ON Report.course_no = Course.course_no 
     GROUP BY Report.student_no) AS Total_Credits 
ON Report.student_no = Total_Credits.student_no
GROUP BY 
    Report.student_no;

