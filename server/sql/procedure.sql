DELIMITER //

CREATE PROCEDURE DeleteStudent(IN studentId CHAR(12))
BEGIN
    -- 删除相关的report记录
    DELETE FROM Report WHERE student_no = studentId;
    
    -- 删除学生记录
    DELETE FROM Student WHERE student_no = studentId;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE DeleteCourse(IN courseId CHAR(12))
BEGIN
    -- 删除相关的report记录
    DELETE FROM Report WHERE course_no = courseId;
    
    -- 删除课程记录
    DELETE FROM Course WHERE course_no = courseId;
END //

DELIMITER ;

