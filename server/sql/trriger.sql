
DELIMITER //
CREATE TRIGGER update_student_credit 
AFTER INSERT ON Report
FOR EACH ROW
BEGIN
    DECLARE total_credits INT;
    # 计算新的credit总和
    SELECT SUM(c.c_credits)
    INTO total_credits
    FROM Report r
    JOIN Course c ON r.course_no = c.course_no
    WHERE r.student_no = NEW.student_no;

	# 更新student表中的credit总和
    UPDATE Student
    SET s_credit = total_credits
    WHERE student_no = NEW.student_no;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_student_credits_on_update
AFTER UPDATE ON Report
FOR EACH ROW
BEGIN
    DECLARE total_credits INT;
    # 计算该学生所有已完成课程的总学分
    SELECT SUM(c.c_credits)
    INTO total_credits
    FROM Report r
    JOIN Course c ON r.course_no = c.course_no
    WHERE r.student_no = NEW.student_no;
    # 更新学生的总学分
    UPDATE Student
    SET s_credit = total_credits
    WHERE student_no = NEW.student_no;
END//
DELIMITER ;
